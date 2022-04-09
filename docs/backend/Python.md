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

# 还可以在代码中设置 warnings.filterwarnings("ignore")来关闭警告

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

## 二、变量和数据结构

### 查看变量

| 内置函数  | 说明                                                         |
| --------- | ------------------------------------------------------------ |
| globals() | 返回全局变量组成的字典                                       |
| locals()  | 返回当前作用域内变量组成的字典，如果当前在全局则返回全局变量组成的字典 |
| vars(obj) | 返回obj对象作用域内变量组成的字典，<br />（1）如果不传参数，vars和locals作用一样<br />（2）如果传1个参数，等同于`obj.__dict__` |

代码示例

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*- coding:utf-8 -*-

import logging

# 初始化日志
FORMAT = '%(asctime)-15s\t [%(threadName)s, %(thread)d] %(message)s'
logging.basicConfig(format=FORMAT)

# 定义全局变量
x = 1

# 测试1 - 全局作用域
logging.warning("测试1: 在全局使用3个函数, 效果是一样的")
logging.warning(globals() == locals() == vars())


# 测试2 - 局部作用域(函数)
def test2():
    logging.warning("测试2: 在函数内部, locals()和vars()效果是一样的, 他俩和global()是不一样的")
    y = 2
    logging.warning(locals() == vars())
    logging.warning(locals() == globals())


# 测试3 - 局部作用域(对象)
def test3():
    class MyObj: pass

    logging.warning("测试3: var(obj) == obj.__dict__")
    logging.warning(vars(MyObj) == MyObj.__dict__)


test2()
test3()
```

:::

输出结果

```bash
2022-04-05 10:53:24,984	 [MainThread, 291696] 测试1: 在全局使用3个函数, 效果是一样的
2022-04-05 10:53:24,984	 [MainThread, 291696] True
2022-04-05 10:53:24,984	 [MainThread, 291696] 测试2: 在函数内部, locals()和vars()效果是一样的, 他俩和global()是不一样的
2022-04-05 10:53:24,984	 [MainThread, 291696] True
2022-04-05 10:53:24,984	 [MainThread, 291696] False
2022-04-05 10:53:24,984	 [MainThread, 291696] 测试3: var(obj) == obj.__dict__
2022-04-05 10:53:24,984	 [MainThread, 291696] True
```

### 列表(list)

文档：[https://docs.python.org/zh-cn/3/library/stdtypes.html#list](https://docs.python.org/zh-cn/3/library/stdtypes.html#list)

**列表推导式**

```python
x = [x for x in range(100)]
x = [{chr(x):x} for x in range(97, 123)]
x = [{x:y} for x in range(1,3) for y in range(3)]
```

**列表方法**

| 分类     | 方法                                                       | 说明                                                         |
| -------- | ---------------------------------------------------------- | ------------------------------------------------------------ |
| 插入元素 | **`append(self, object, /)`**                              | 在尾部插入一个元素，时间复杂度 O(1)                          |
|          | `insert(self, index, object, /)`                           | 在指定索引处插入一个元素，时间复杂度 O(n)                    |
|          | `extend(self, list)`                                       | 列表合并（会改变原列表内容）                                 |
| 删除元素 | **`pop(self, index=-1, /)`**                               | 默认从索引为-1的位置弹出该值（弹出后列表删除该元素），<br />尾部弹出时间复杂度为 O(1)，其他位置弹出时间复杂度为 O(n)；<br />如果元素不存在，则引发 `IndexError` |
|          | `remove(self, value, /)`                                   | 删除第一个值为value的元素，时间复杂度 O(n) ；<br />如果元素不存在，则引发 ValueError |
|          | `clear(self, /)`                                           | 清空列表所有元素， 时间复杂度 O(1)                           |
| 列表反转 | `reverse(self, /)`                                         | 列表反转（会改变原列表内容）                                 |
|          | `reversed(list)`                                           | 列表反转，返回一个迭代器（不会改变原列表内容）               |
| 列表排序 | `sort(self, /, *, key=None, reverse=False)`                | 根据key指定的函数进行排序，返回值为None（会改变原列表内容）  |
|          | `sorted(iterable, /, *, key=None, reverse=False)`          | 根据key指定的函数进行排序，返回一个迭代器（不会改变原列表内容） |
| 列表复制 | `copy(self, /)`                                            | 返回一个新列表，浅拷贝（shadow copy），<br />根据被拷贝对象不同而操作不同：<br />（1）如果是不可变类型，则分配一块新内存地址；<br />（2）如果是可变类型，则直接引用 |
|          | `[::]`                                                     | 同`copy()`                                                   |
|          | `copy.deepcopy(x, memo=None, _nil=[])`                     | 返回一个新列表，深拷贝(deep copy)                            |
| 列表查找 | `index(self, value, start=0, stop=9223372036854775807, /)` | 返回value在列表中的索引号，找不到抛出ValueError异常          |
|          | `count(self, value, /)`                                    | 返回value在列表中出现的次数                                  |

**列表常见操作效率对比**

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*- coding:utf-8 -*-

import timeit
import logging

# 初始化日志
FORMAT = '%(asctime)-15s\t [%(threadName)s, %(thread)d] %(message)s'
logging.basicConfig(format=FORMAT)


def test1():
    logging.warning("[]和list()效率对比(运行100万次时间总和)")
    logging.warning("         []: {}秒".format(timeit.timeit(stmt="[]")))
    logging.warning("     list(): {}秒".format(timeit.timeit(stmt="list()")))


def test2():
    def t1():
        x = []
        for i in range(100000):
            x.append(i)

    def t2():
        x = []
        for i in range(100000):
            x.insert(5, i)

    logging.warning("append与insert效率对比(列表插入10万个数据,运行10次的时间总和)")
    logging.warning("     append: {}秒".format(timeit.timeit(stmt=t1, number=10)))
    logging.warning("     insert: {}秒".format(timeit.timeit(stmt=t2, number=10)))


test1()
test2()
```

:::

输出结果

```bash
2022-04-05 11:34:28,170	 [MainThread, 295460] []和list()效率对比(运行100万次时间总和)
2022-04-05 11:34:28,185	 [MainThread, 295460]          []: 0.0168023秒
2022-04-05 11:34:28,248	 [MainThread, 295460]      list(): 0.0661798秒
2022-04-05 11:34:28,248	 [MainThread, 295460] append与insert效率对比(列表插入10万个数据,运行10次的时间总和)
2022-04-05 11:34:28,310	 [MainThread, 295460]      append: 0.06255819999999998秒
2022-04-05 11:34:47,223	 [MainThread, 295460]      insert: 18.904270200000003秒
```



### 元组(tuple)

文档：[https://docs.python.org/zh-cn/3/library/stdtypes.html#tuple](https://docs.python.org/zh-cn/3/library/stdtypes.html#tuple)

**元祖方法**

| 分类 | 方法                                                 | 说明                                                         |
| ---- | ---------------------------------------------------- | ------------------------------------------------------------ |
| 查找 | `index(value, start=0, stop=9223372036854775807, /)` | 返回value在元组中第一次出现的索引号，找不到抛出ValueError异常 |
|      | `count(value, /)`                                    | 返回value在元组中出现的次数                                  |



**高级数据结构：命名元组**

命名元组函数签名

```python
namedtuple(typename, field_names, *, rename=False, defaults=None, module=None)
```

命名元组示例

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*- coding:utf-8 -*-

from collections import namedtuple


def main():
    # 命名元组 - 基本使用
    Person = namedtuple("Person", ["name", "sex", "age"])
    user = Person("小明", "男", 20)
    print(f"{user.name} | {user.sex} | {user.age}")  # 命名元组使用方法
    print(f"{user[0]} | {user[1]} | {user[2]}")  # 也可以像普通元组一样使用
    print(f"{user._fields}")  # 查看所有的属性

    # 命名元组 - 安全模式
    #   如果属性与python关键字时(比如def)重叠时，代码会报错，
    #   使用rename=True可以避免这个错误，会将名字替换为 _索引
    Product = namedtuple("Product", ["name", "def", "color", "price", "class"], rename=True)
    product = Product("冰糖雪梨", "", "黄色", "3元", "")
    print(product._fields)  # ('name', '_1', 'color', 'price', '_4'), 可以看到已经进行了替换

    # 命名元组 - 用的不是很多，其他的内容就一并带过了
    #   默认参数
    #   _replace(**kwargs)替换生成新的命名元组并返回
    #   _make()批量给命名元组赋值


if __name__ == '__main__':
    main()
```

:::

### 字符串(str)

文档：[https://docs.python.org/3/library/stdtypes.html#str](https://docs.python.org/3/library/stdtypes.html#str)



**（1）字符串类签名**

```python
class str(object=b'', encoding='utf-8', errors='strict')
```

根据传入的对象创建一个新字符串

* 如果`encoding`和`errors`都没有指定值，那么会调用`object.__str__()`，如果对象没有`__str__()`方法，那么会调用`repr(object)`

* 如果encoding和errors至少指定一个值，那么该输入对象应该是一个 bytes-like对象，

  此时就相当于`str(bytes, encoding, errors)` == `bytes.decode(encoding, errors)`

* encoding默认值从`sys.getdefaultencoding()`中获取

```python
#!/usr/bin/env python
# -*- coding:utf-8 -*-

import sys

print(str(b'abc'))  # b'abc'，这里是字节类型
print(str(b'abc', encoding="utf-8"))  # abc，这里是字符串类型
print(sys.getdefaultencoding())  # utf-8
print(str(b'abc', encoding="utf-8") == bytes.decode(b'abc', encoding="utf-8"))  # True
```



**（2）格式化输出的几种方法**

① 使用%（已经不推荐使用，仅作了解）

```python
print("I am %d years old, and i has %d friends" % (27, 3))
print('%(language)s has %(number)03d quote types.' % {'language': "Python", "number": 2})  

# I am 27 years old, and i has 3 friends
# Python has 002 quote types.
```

② 使用format（推荐）

```python
print("Hello {name1}, hello {name2}".format(name1="python", name2="world"))  
print("Hello {name1}, hello {name2}".format_map({"name1": "python", "name2": "world"}))

# Hello python, hello world
# Hello python, hello world
```

③ 使用f-string（推荐）

```python
name1 = "python"
name2 = "world"
print(f"Hello {name1}, hello {name2}")

# Hello python, hello world
```

输出方法总结

```python
#!/usr/bin/env python
# -*- coding:utf-8 -*-

# 第1种方法
print("I am %s years old" % "18")

# 第2种方法
print("I am %(year)d years old" % {"year": 18})

# 第3种方法
print("I am {year} years old".format(year=18))

# 第4种方法
print("I am {} years old".format(18))

# 第5种方法
print("I am {year} years old".format_map({"year": 18}))

# 第6种方法
year = 18
print(f"I am {year} years old")
```

**（3）格式化输修饰符**

| 修饰符   | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| `^`      | 剧中                                                         |
| `<`      | 左对齐                                                       |
| `>`      | 右对齐                                                       |
| `,`      | 逗号，可以做千位分隔符                                       |
| `{:n}`   | 用空白补充该变量的长度到n(在两边补充)                        |
| `{:#^n}` | 用#号补充该变量的长度到n(在两边补充)，并设置为剧中对齐；格式为：`补充-对齐-宽度-小数点保留位数` |

格式化修饰符演示

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*- coding:utf-8 -*-

# （1）保留两位小数
print(f'\n(1) 默认情况下: 5/3 = {5 / 3} | 保留两位小数: 5/3 = {5 / 3:.2f}\n')

# (2) 千位分隔符
print('(2) 千位分隔符: {:,}\n'.format(123456789))

# （3）字符串长度为20,将字符串居中，两侧添加_
print("(3) 样式设置: {:_^20}\n".format("Hello World!"))


# (4) 中文对齐问题（命令行有效，Pycharm中汉字和英文宽度比例有问题）
#     一个中文占据2个ASCII码的宽度
#     一个ASCII码占1个字节大小，一个中文占3个字节大小

def is_chinese(uchar):
    '''检测是否是中文'''

    # 针对中文标点符号，根据实际情况继续添加
    symbols = ["、", "。"]
    if len(list(filter(lambda x: x in symbols, uchar))) != 0:
        return True

    # 中文检测
    if uchar >= u'\u4e00' and uchar <= u'\u9fa5':
        return True
    else:
        return False


def chinese_number(ustr):
    '''返回中文字符的数量'''
    c_n = 0
    for i in ustr:
        if is_chinese(i):
            c_n += 1
    return c_n


print("(4) 中文对齐问题(CMD下生效,Pycharm中有问题)")
msg1 = [
    "调用该方法的字符串将作为元素之间的分隔",
    "此静态方法返回一个可供 str.translate() 使用的转换对照表。",
    '即那些具有"Lm"、"Lt"、"Lu"、"Ll" 或 "Lo" 之一的通用类别属性的字符',
]
msg2 = ["占位符", "占位符", "占位符"]
fmt = '[ |{name:{width}}| |{years:<20}| ]'
for name, years in zip(msg1, msg2):
    print(fmt.format(name=name, width=(100 - chinese_number(name)), years=years))
```

:::

输出结果

![image-20220405164801876](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220405164801876.png)

**（4）字符串常用方法**

| 分类           | 方法                                         | 说明                                                         |
| -------------- | -------------------------------------------- | ------------------------------------------------------------ |
| 大小写转换     | str.casefold()                               | 返回一个新字符串，把所有大写字母改为小写（除了英文，对于其他语言同样有效） |
|                | str.lower()                                  | 返回一个新字符串，把所有大写字母改为小写（针对A-Z）          |
|                | str.upper()                                  | 返回一个新字符串，把所有小写字母改为大写（针对A-Z）          |
|                | str.swapcase()                               | 翻转字符串，大写变小写，小写变大写                           |
| 搜索           | str.count(*sub*[, *start*[, *end*]])         | 返回sub在字符串出现的次数，start和end表示起始范围（可选）    |
|                | str.find(*sub*[, *start*[, *end*]])          | 检查字符串sub是否包含在字符串中，如果有则返回索引值，没有则返回-1<br />只有当你明确确定位置或需要得到索引值时，才应该使用find方法，否则应该使用in<br />类似的还有`str.rfind`，从右向左开始查找 |
|                | str.index(*sub*[, *start*[, *end*]])         | 与find类型，当sub找不到的时候会引发`ValueError异常`<br />类似的还有rindex，从右向左开始查找 |
| 分割和合并     | str.split(*sep=None*, *maxsplit=-1*)         | 以\n,\r和\r\n和空白为分隔符分割字符串，返回一个列表，sep指定分隔符，maxsplit指定分割次数<br />类似的有str.rsplit，从右向左开始分割 |
|                | str.splitlines([*keepends*])                 | 以\n,\r和\r\n为分隔符，返回一个列表;如果keepends为True,则分隔符保留，否则丢弃 |
|                | str.join(*iterable*)                         | 字符串连接<br />join里的参数的所有元素必须是字符串类型，否则会报错,解决方法可以这样：<br />`'-'.join([str(x) for x in range(10)])` |
| 替换           | str.replace(*old*, *new*[, *count*])         | 将字符串中的old替换为new，count指定替换次数，可选，默认全部替换 |
| 删除左右空白   | str.strip([*chars*])                         | 删除字符串两侧的字符，默认为空白，<br />类似的还有lstrip（只删除左边的字符）、rstrip（只删除右边的字符） |
| 开头、结尾匹配 | str.startswith(*prefix*[, *start*[, *end*]]) | 检查字符串是否以prefix子字符串开头，start和end表示匹配的起始范围（可选） |
|                | str.endswith(*suffix*[, *start*[, *end*]])   | 同上                                                         |
| 制表符         | str.expandtabs(*tabsize=8*)                  | 返回一个新字符串，把字符串中的制表符(\t)替换成tabsize个空格，tabsize默认是8 |
| 类型判断       | str.isdigit()                                | 如果字符串只包含数字则返回True，否则返回False                |
|                | str.isdecimal()                              | 如果字符串只包含十进制数则返回True，否则返回False            |
|                | str.isnumeric()                              | 如果字符串只包含数字字符则返回True，否则返回False            |
|                | str.isalpha()                                | 如果字符串至少有一个字符并且所有字符都是字母则返回Trule,否则返回False |
|                | str.isalnum()                                | 如果字符串至少有一个字符并且所有字符都是数字或者字母则返回Trule,否则返回False |
|                | str.isascii()                                | 如果字符串为空或者为ASCII码返回True，否则返回False           |
|                | 更多类型判断...                              |                                                              |

**（5）str和byte转换**

```python
#!/usr/bin/env python
# -*- coding:utf-8 -*-

print('中'.encode(encoding="utf-8"))  # b'\xe4\xb8\xad'
print(b'\xe4\xb8\xad'.decode("utf-8"))  # 中
```

### 字典(dict)

文档：[https://docs.python.org/zh-cn/3/library/stdtypes.html#dict](https://docs.python.org/zh-cn/3/library/stdtypes.html#dict)

**字典创建**

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*- coding:utf-8 -*-

# (1) 普通方法创建字典
a = dict(one=1, two=2, three=3)
b = {'one': 1, 'two': 2, 'three': 3}
c = dict(zip(['one', 'two', 'three'], [1, 2, 3]))
d = dict([('two', 2), ('one', 1), ('three', 3)])
e = dict({'three': 3, 'one': 1, 'two': 2})
print(f"(1) 普通方式创建的字典: {a == b == c == d == e}")

# (2) 通过fromkeys创建字典
a = {}
b = a.fromkeys((1, 2), ["a", "b", "c"])
print(f"(2) 通过fromkeys创建字典: {b}")

# (3) 字典推导式
print("(3) 字典推导式")
print("    {}".format({x: chr(x) for x in list(range(65, 68))}))
print("    {}".format({i: chr(i + 65) for i in list(range(3))}))
```

:::

输出结果

```bash
(1) 普通方式创建的字典: True
(2) 通过fromkeys创建字典: {1: ['a', 'b', 'c'], 2: ['a', 'b', 'c']}
(3) 字典推导式
    {65: 'A', 66: 'B', 67: 'C'}
    {0: 'A', 1: 'B', 2: 'C'}
```

**字典方法**

| 分类 | 方法                        | 说明                                                       |
| ---- | --------------------------- | ---------------------------------------------------------- |
| 添加 | dict[key] = value           | 直接赋值，没有即新增，有的话为覆盖                         |
|      | dict.update(dict)           | 字典合并                                                   |
|      | dict.setdefault(k, [value]) | k存在则返回v的值，否则设置dict[k] = value，并返回value的值 |
| 删除 | del dict[key]               | 直接删除                                                   |
|      | dict.pop(key)               | 弹出value值，如果key未找到则抛出KeyError                   |
|      | dict.popitem ()             | 随机弹出键值对                                             |
|      | dict.clear()                | 删除字典所有元素                                           |
| 查找 | dict[key]                   | 返回value值，如果key不存在，则抛出KeyError                 |
|      | dict.get(key, [default])    | 返回value值，如果key不存在，则返回default值或None          |
| 拷贝 | dict.copy()                 | 浅拷贝                                                     |
|      | copy.deepcopy(dict)         | 深拷贝                                                     |
| 遍历 | dict.keys()                 | 返回所有的key                                              |
|      | dict.values()               | 返回所有的value                                            |
|      | dict.items()                | 返回k和v                                                   |



### 可变集合(set)

文档：[https://docs.python.org/zh-cn/3/library/stdtypes.html#set](https://docs.python.org/zh-cn/3/library/stdtypes.html#set)

**创建集合**

```python
#!/usr/bin/env python
# -*- coding:utf-8 -*-


a = {1}
b = {2, "B", (1, 2, 3)}
c = set(range(5))

print(a)
print(b)
print(c)
```

输出结果

```bash
{1}
{2, (1, 2, 3), 'B'}
{0, 1, 2, 3, 4}
```

**集合方法**

| 分类     | 方法                              | 说明                                           |
| -------- | --------------------------------- | ---------------------------------------------- |
| 添加元素 | .add(value)                       | 添加元素                                       |
|          | .update(set)                      | 集合合并                                       |
| 删除元素 | .remove(value)                    | 删除元素，如果元素不存在则抛出KeyError错误     |
|          | .clear()                          | 删除所有元素                                   |
|          | .pop()                            | 从下标0开始弹出元素                            |
| 拷贝     | .copy()                           | 浅拷贝                                         |
| 集合操作 | .union(set)                       | 返回一个新集合，是两个集合的并集               |
|          | .intersection(set)                | 返回一个新集合，是两个集合的交集               |
|          | .intersection_update(set)         | **就地修改原集合，是两个集合的交集**           |
|          | .difference(set)                  | 返回一个新集合，是原集合独有的元素             |
|          | .difference_update(set)           | **就地修改原集合，是原集合独有的元素**         |
|          | .issubset(set)                    | 返回一个布尔值，判断原集合是否是新集合的子集   |
|          | .issuperset(set)                  | 返回一个布尔值，判断原集合是否是新集合的父集   |
|          | .isdisjoint(set)                  | 返回一个布尔值，判断两个集合是否【没有交集】   |
|          | .symmetric_difference(set)        | 返回一个新集合，取两个集合不一样的所有元素     |
|          | .symmetric_difference_update(set) | **就地修改原集合，取两个集合不一样的所有元素** |

### 不可变集合(frozenset)

文档：[https://docs.python.org/zh-cn/3/library/stdtypes.html#frozenset](https://docs.python.org/zh-cn/3/library/stdtypes.html#frozenset)

和``set``类似，只是少了许多方法，用法都是一样的

```python
#!/usr/bin/env python
# -*- coding:utf-8 -*-


a = frozenset([1, 2, 3])
print(a)
print(dir(a))

# frozenset({1, 2, 3})
# ['copy', 'difference', 'intersection', 'isdisjoint', 'issubset', 'issuperset', 'symmetric_difference', 'union']
```



### 可变对象和不可变对象

**引用计数模型**

![698051107556314373](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/698051107556314373.png)

代码示例

::: details 点击查看完整代码和输出结果

```python
#!/usr/bin/env python
# -*- coding:utf-8 -*-

import sys

# 使用sys.getrefcount(obj)可以查看一个对象的引用计数，因为这个API也会使对象增加一个临时引用，所以真实的引用计数应该再减去1


# 初始化变量
a = [1, 2, 3]
print(f"代码: a = {a}")
print(f"说明: 引用计数(a):{sys.getrefcount(a) - 1}, 内存地址:{hex(id(a))}\n")

# b = a
print("代码: b = a")
b = a
print(f"说明: ")
print(f"     引用计数(a): {sys.getrefcount(a) - 1}, 内存地址:{hex(id(a))}")
print(f"     引用计数(b): {sys.getrefcount(b) - 1}, 内存地址:{hex(id(b))}\n")

# 删除变量
del a
print("代码: del a")
print(f"说明: 引用计数(b): {sys.getrefcount(b) - 1}, 内存地址:{hex(id(b))}\n")

c = [1, 2, 3]
print(f"代码: c = {c}")
print(f"     引用计数(b): {sys.getrefcount(b) - 1}, 内存地址:{hex(id(b))}")
print(f"     引用计数(c): {sys.getrefcount(c) - 1}, 内存地址:{hex(id(c))}\n")

print("-------------------------------------------------------------------")

# 初始化变量
a = (1, 2, 3)
print(f"代码: a = {a}")
print(f"说明: 引用计数(a):{sys.getrefcount(a) - 1}, 内存地址:{hex(id(a))}\n")

# b = a
print("代码: b = a")
b = a
print(f"说明: ")
print(f"     引用计数(a): {sys.getrefcount(a) - 1}, 内存地址:{hex(id(a))}")
print(f"     引用计数(b): {sys.getrefcount(b) - 1}, 内存地址:{hex(id(b))}\n")

# 删除变量
del a
print("代码: del a")
print(f"说明: 引用计数(b): {sys.getrefcount(b) - 1}, 内存地址:{hex(id(b))}\n")

c = (1, 2, 3)
print(f"代码: c = {c}")
print(f"     引用计数(b): {sys.getrefcount(b) - 1}, 内存地址:{hex(id(b))}")
print(f"     引用计数(c): {sys.getrefcount(c) - 1}, 内存地址:{hex(id(c))}\n")

print("-" * 100)
```

输出结果

```bash
代码: a = [1, 2, 3]
说明: 引用计数(a):1, 内存地址:0x1e465c15208

代码: b = a
说明: 
     引用计数(a): 2, 内存地址:0x1e465c15208
     引用计数(b): 2, 内存地址:0x1e465c15208

代码: del a
说明: 引用计数(b): 1, 内存地址:0x1e465c15208

代码: c = [1, 2, 3]
     引用计数(b): 1, 内存地址:0x1e465c15208			=> 
     引用计数(c): 1, 内存地址:0x1e465c15408			=> 备注: 引用计数为1，且内存地址不一样

-------------------------------------------------------------------
代码: a = (1, 2, 3)
说明: 引用计数(a):3, 内存地址:0x1e46616cf48

代码: b = a
说明: 
     引用计数(a): 4, 内存地址:0x1e46616cf48
     引用计数(b): 4, 内存地址:0x1e46616cf48

代码: del a
说明: 引用计数(b): 3, 内存地址:0x1e46616cf48

代码: c = (1, 2, 3)
     引用计数(b): 4, 内存地址:0x1e46616cf48			=>
     引用计数(c): 4, 内存地址:0x1e46616cf48			=> 备注: 引用计数为不为1，且内存地址一样
```

:::

💡 不同Python版本对于一些细节处理并不一致，了解即可

```python
#!/usr/bin/env python
# -*- coding:utf-8 -*-

import sys

print("Python version: {}".format('.'.join(str(x) for x in sys.version_info[:3])))  # 这里使用3.7.9测试
print('----------------------------------------------------------------------------------------------------')

# 测试1: -5 ~ 256范文内的数字会提前加载到内存中,进行缓存
a, b = 1000, 1000
print(a is b)  # b创建之前a尚未创建,所以a和b分配到了两块不同的内存地址,所以输出False

a, b = 1, 1
print(a is b)  # b创建之前a尚未创建, 但是-5~256范围内的数字已经提前加载到了内存中, a和b拿到了相同的内存地址,所以输出True
print('----------------------------------------------------------------------------------------------------')
```

关于Python更多“神奇”的操作，可以参考   [https://github.com/robertparley/wtfpython-cn](https://github.com/robertparley/wtfpython-cn)



**嵌套问题**

```python
#!/usr/bin/env python
# -*- coding:utf-8 -*-

# a是一个元组, 不可变对象
a = (1, 2, [3])
print(hex(id(a)))  # 0x2d731accf48

# 但是并不意味着 a的值永远就不能变
a[2].append(4)
print(hex(id(a)))  # 0x2d731accf48
print(a)  # (1, 2, [3, 4])
```



**关于哈希**

* 可哈希 == 不可变对象
* 不可哈希 == 可变对象 

```python
#!/usr/bin/env python
# -*- coding:utf-8 -*-

# 测试
d = {}
d[5] = "Python"
d[5.0] = "Go"
d[5.1] = "Java"
print(d)

# 输出结果: {5: 'Go', 5.1: 'Java'}
# 发现问题: 5.0的key怎么没了?
# 分析原因:
#   (1) 字典的key不允许重复,重复的话会覆盖前面的value
#   (2) 字典如何判断key是否重复呢? 使用hash(key)检查哈希值是否重复来判断(扩展: 可变对象==不可哈希，所以不能用来做字典的key)
# 确认原因(看如下代码)
print(hash(5) == hash(5.0))  # True
print(hash(5) == hash(5.1))  # False

# set和 frozenset也是使用哈希值存的,我们来测试以下
s = set()
s.add(5)
s.add(5.0)
s.add(5.1)
print(s)  # {5.1, 5}
```



**深浅拷贝**

浅拷贝

说明：拷贝后仅仅是最顶层开辟了新的空间，里层的元素内存地址还是一样的

方法：各类对象(list``/dict``)等的copy方法、对象[::]、copy.copy方法

深拷贝

说明：除了顶层拷贝还对子元素也进行了拷贝（本质上递归浅拷贝），两个元素真正意义上的互不影响

方法：copy.deepcopy()



### **基本数据类型对比**

| 数据类型             | (容器内的)元素是否有顺序 | 是否是可变对象 | 值或KEY是否允许重复 |
| -------------------- | ------------------------ | -------------- | ------------------- |
| 数字                 | ✔                        | ❌              | ✔                   |
| 布尔值               | ✔                        | ❌              | ✔                   |
| 列表                 | ✔                        | ✔              | ✔                   |
| 元祖                 | ✔                        | ❌              | ✔                   |
| 字符串               | ✔                        | ❌              | ✔                   |
| 字节序列(bytes)      | ✔                        | ❌              | ✔                   |
| 字节数组(bytesarray) | ✔                        | ✔              | ✔                   |
| 字典                 | ✔                        | ✔              | ❌                   |
| 集合                 | ❌                        | ✔              | ❌                   |
| 不可变集合           | ❌                        | ❌              | ❌                   |

## 

## 三、函数

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

## 四、多线程

### 并发和并行

并发（Concurrent）：在同一时间点，一颗CPU核心交替做两件或多件事

并行（Parallel）：同一时间点，两颗或多颗CPU核心同时做两件或多件事



单单只看这些概念还是让人摸不着头脑，我们深入理解一下：

* 在只有一颗CPU核心的处理器上面是无法实现并行的，但是可以实现并发

* 并行是提高并发的一种手段

* 由于CPython特殊的GIL锁，导致CPython不能实现并行，解决办法可以使用多进程来实现并行，

  也可以使用PyPy等移除掉GIL的第三方解释器来执行（这又是一个比较深的坑）



### 高并发解决方案

上面我们讲的都是在编程语言范围内的并发，而在一个项目中，高并发的本质问题往往在于数据库能够承载的并发是有限的。解决高并发的关键就在于降低单库的连接数。

通常我们可以有以下几种方法：

* 使用缓存，缓存命中便不会再去请求数据库
* 系统拆分，每个业务使用独立的一个数据库实例
* 读写分离，对同一个数据库进一步拆分，读和写分散在不同的数据库实例上
* MQ削峰，服务端限速执行
* 限流操作，比如令牌桶等，超出则丢弃

> 实际情况中要根据项目的特性，是读多写少还是读少写多，综合不同的手段来达到高并发的目的

### 线程说明

* 线程是CPU调度的最小单元
* 每个可执行程序都会有一个主线程，主线程一般我们都用来做协调工作，由主线程来创建其他线程称为工作线程
* 线程之间数据共享
* 线程状态
  * 就绪(Ready)：线程能够运行但是还没有开始运行，等待被调度
  * 运行(Running)：线程一旦调度就处于运行中
  * 阻塞(Blocked)：线程等待外部事件而无法运行，比如I``/O``等待
  * 终止(Teminated)：线程退出
* 工作线程一旦启动，不可暂停和取消，除非代码运行完成或抛出异常而停止；工作线程崩溃不影响主线程正常运行



### CPython线程使用场景

线程是最出名的实现并发和并行的方式之一，但是在CPython中由于GIL的存在，线程只能实现并发，而不能实现并行。

可以说CPython的线程并不是真正的线程，但是它在某些场景下仍旧可以为我们的代码提速，其原理在于：

* 对于CPU密集型的应用，由于线程会一直霸占CPU，除非线程执行完成或主动交出控制权，所以使用多线程一般会导致程序变慢（线程创建和销毁需要开销）
* 对于IO密集型应用，遇到IO阻塞时系统会自动进行线程切换，所以可以极大的提高程序效率



### 基本使用

函数形式

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

from datetime import datetime
from threading import Thread


# 定义一个普通函数
def show_time(msg):
    print('{}{}'.format(msg, datetime.now()))


# 实例化Thread类，创建一个线程，执行我们的函数show_time，函数参数以元组形式使用args传递
for i in range(5):
    t = Thread(target=show_time, args=("当前时间是: ",))
    t.start()
```

类形式

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

from datetime import datetime
from threading import Thread


class ShowTime(Thread):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def run(self) -> None:
        print('当前时间是: {}\n'.format(datetime.now()), end="")


for i in range(5):
    t = ShowTime()
    t.start()
```

### 线程属性

Thread类签名

```python
def __init__(self, group=None, target=None, name=None,
                 args=(), kwargs=None, *, daemon=None)

targe	线程调度的函数
name	线程名字
args	线程函数参数，是一个元祖
daemon	后面有讲解
```

Thread实例属性和方法

| 属性/方法      | 说明                                                         |
| -------------- | ------------------------------------------------------------ |
| start()        | 执行任务（启动新线程）,start会启动新线程然后调用run方法      |
| run()          | 执行任务（在当前线程中），run方法会执行具体的任务            |
| name/getName() | 线程名，默认以Thread-1、Thread-2形式命名                     |
| setName()      | 设置线程名称                                                 |
| ident          | 线程ID，非0整数，线程启动后才会有ID，否则为None。线程退出，此ID依旧可以访问。此ID可以重复使用 |
| is_alive()     | 返回线程是否还活着，等同于.isAlive()                         |

threading模块属性和方法

| 属性/方法        | 说明                                                 |
| ---------------- | ---------------------------------------------------- |
| current_thread() | 返回当前线程对象                                     |
| get_ident()      | 返回当前线程的ID，非0整数                            |
| main_thread()    | 返回主线程对象                                       |
| active_count()   | 当前处于alive状态的线程个数                          |
| enumerate()      | 返回所有的活着的线程列表，不包括未开始和已终止的线程 |

### 线程安全

线程执行一段代码的时候，这段代码要么不执行，要么一定会执行完(执行过程中不会切换到其他线程)，这段代码就称为线程安全



（1）直接使用`print`函数是线程不安全的，但通过修改使用方式，可以达到线程安全；`logging`是线程安全，更推荐使用`logging`来代替`print`

`print`线程安全说明

```python
print("hello world")            # 线程不安全
print("hello world\n", end="")  # 线程安全

# 原理在于：
#   (1)print("hello world")其实是两步操作，先输出hello world，再输出换行符\n，这中间是可以被打断的
#   (2)通过指定end=""，等同于将第二步操作给去掉
```

线程安全演示

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

import logging
from threading import Thread, current_thread


def thread_safe():
    for i in range(100):
        print("{} is running".format(current_thread().name))  # 线程不安全
        # print("{} is running\n".format(current_thread().name), end="")    # 线程安全
        # logging.warning("{} is running".format(current_thread().name))    # 线程安全


for i in range(5):
    t = Thread(target=thread_safe)
    t.start()
```

![image-20220330204518155](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220330204518155.png)

（2）`queue`是线程安全的，但是下面的代码是线程不安全的

`queue`线程不安全原理

```python
if q.qsize() > 0:
	q.get()

# 问题描述：qsize()>0不能保证一定能get()，qsize()<maxsize不能保证一定put()
# 原因在于：qsize()和get()本身是线程安全的,但是这两个组合到一块就不能保证是线程安全，因为这是两步操作了，中间是可能被打断的
# 解决办法：qsize()和get()的组合代码加锁
```

`queue`线程安全演示

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

import logging
import random
import time
from queue import Queue
from threading import Thread, Lock

# 初始化队列
q = Queue()

# 初始化全局锁
lock = Lock()

# 初始化日志
FORMAT = '%(asctime)-15s\t [%(threadName)-10s, %(thread)d] %(message)s'
logging.basicConfig(format=FORMAT)


# 线程不安全代码(未加锁)
def thread_safe():
    if q.qsize() <= 0:
        time.sleep(random.random())
        q.put(random.randint(1, 100))
    logging.warning("队列大小: {}".format(q.qsize()))


# 线程安全代码(已加锁)
def thread_safe2():
    with lock:
        if q.qsize() <= 0:
            time.sleep(random.random())
            q.put(random.randint(1, 100))
        logging.warning("队列大小: {}".format(q.qsize()))

# 开启100个线程
for i in range(100):
    Thread(target=thread_safe).start()
    # Thread(target=thread_safe2).start()
```

### daemon

设置线程daemon为False后，当主线程执行结束后，要等待非daemon线程执行完成

设置daemon为True后，当主线程执行结束后，daemon线程也会立即退出

子线程的daemon的值从父线程中继承来，父线程如果不设置默认为False



daemon相关方法

| 属性                                | 说明                                                  |
| ----------------------------------- | ----------------------------------------------------- |
| threading.Thread(...., daemon=True) | 创建线程时设置daemon属性                              |
| 线程.setDaemon(True)                | 线程创建完成后，也可以设置daemon属性，必须在start之前 |
| 线程.isDaemon()/daemon              | 返回daemon状态                                        |



daemon线程应用场景

* 随时可以被终止的线程

* 后台任务，如发送心跳包、监控；
* 主线程工作才有用的线程，如主线程维护这公共资源，主线程已经清理了，准备退出，而工作线程使用这些资源已经没有意义了，一起退出最合适



daemon示例

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

import time
from threading import Thread, current_thread


def show_msg():
    time.sleep(0.1)
    print("{}\n".format(current_thread().getName()), end="")


# 开启10个线程
for i in range(10):
    Thread(target=show_msg).start()  # 未设置daemon属性，默认继承夫线程，默认为False
    # Thread(target=show_msg, daemon=True).start()  # 设置daemon属性

print("End")

# 未设置daemon时，输出结果：
#     End
#     Thread-3
#     Thread-2
#     Thread-7
#     Thread-5
#     Thread-4
#     Thread-6
#     Thread-9
#     Thread-1
#     Thread-10
#     Thread-8
#
# 设置daemon时，由于主线程很快会执行完成，而子线程会阻塞0.1秒，所以不会输出子线程名，输出结果：
#     End
```



### join阻塞线程

如果想让所有线程工作完毕后，主线程再执行代码，此时可以使用`线程.join()`来等待线程执行完毕

join作用

* 阻塞线程直到执行完毕
* 它还可以设置超时时间，当超过超时时间，不管线程是否执行完毕，都会向下执行
* `join`无视`daemon`的值

将`daemon`代码改造一下，使代码最后再输出`End`

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

import time
from threading import Thread, current_thread


def show_msg():
    time.sleep(0.1)
    print("{}\n".format(current_thread().getName()), end="")


# 开启10个线程
threads = []
for i in range(10):
    t = Thread(target=show_msg, daemon=True)
    t.start()
    threads.append(t)  # 将线程收集起来

# 等待每个线程执行完毕
for thread in threads:
    thread.join()

print("End")
```



### 线程锁

Lock相关类：

* Lock：独占锁或叫做互斥锁，同一时间只有一个线程能获取到锁

* RLock：可重入锁，同一时间只有一个线程能获取到锁，在同一个线程内可多次acquire()，但也需要执行相同次数的release()



lock实例方法

| 方法                       | 说明                                                         |
| -------------------------- | ------------------------------------------------------------ |
| acquire(blocking, timeout) | 尝试获取锁，获取成功返回True，获取失败的话：<br />（1）默认会一直阻塞<br />（2）如果指定blocking为False，直接返回False，表示获取锁失败<br />（3）如果指定了timeout，那么超时以后返回False |
| release()                  | 释放锁                                                       |
| locked()                   | 查看是否上锁，已上锁返回True，否则返回False（注意RLOCK实例没有这个方法） |



死锁和RLOCK

连续两次acquire请求会导致死锁，因为第一次获得锁之后还没有释放时，第二次acquire请求紧接着就到来，

但是acquire会让程序阻塞，无法执行release()，这就导致锁永远无法释放，就像下面这样

```python
Lock.acquire()
Lock.acquire()
Lock.release()
Lock.release()
```

RLock就不存在上面提到的死锁问题，只需要保证有多少次acquire()，就有多少次release()即可



Lock演示

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-


from threading import Thread, current_thread, Lock, RLock

# 初始化锁
lock = Lock()

# 全局变量
data = 0


def add(n):
    global data
    for i in range(1000000):
        # 未加锁
        data += n

        # 加锁（方式一）
        lock.acquire()
        data += n
        lock.release()

        # 加锁（方式二）
        # if lock.acquire():
        #     data += n
        #     lock.release()

        # 加锁（方式三）
        # with lock:
        #     data += n


# 开启2个线程, 一个线程不断+1，另一个线程不断-1
t1 = Thread(target=add, args=(1,))
t2 = Thread(target=add, args=(-1,))
t1.start()
t2.start()
t1.join()
t2.join()

print(data)
print("End")

# 未加锁输出结果：
# 924375
# End
# 加锁输出结果
# 0
# End
```

### 线程局部变量

创建一个全局变量`request = local()`，使用多线程对`request`进行修改时，会先将request拷贝到自身线程中一份，不会影响到全局和其他线程中的`request`

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

import time
import logging
from threading import Thread, local, current_thread, active_count

# 初始化日志
FORMAT = '%(asctime)-15s\t [%(threadName)s, %(thread)d] %(message)s'
logging.basicConfig(format=FORMAT)

# 初始化全局变量
# class Request(object): pass
# request = Request()


# 初始化线程局部变量
request = local()


def thread_local(request):
    request.thread_name = current_thread().getName()
    time.sleep(1)
    logging.warning('request.thread_name: {}'.format(request.thread_name))


for i in range(6):
    Thread(target=thread_local, args=(request,)).start()

while active_count() > 1:
    time.sleep(1)

print("End")
```

### 线程同步 - 事件Event

Event是线程通信间最简单的实现，使用一个变量flag，通过flag的True或False变化来执行不同操作

Event变化会通知到所有线程



Event实例方法

| 方法               | 说明                                                         |
| ------------------ | ------------------------------------------------------------ |
| set()              | 标记为True                                                   |
| clear()            | 标记为False                                                  |
| is_set()           | 新创建的event或使用``clear``()后为False，当设置``set``()后返回True |
| wait(timeout=None) | 等待，满足以下条件后立即执行：<br />（1）当调用``set``()后立即执行，此时wait返回值为True<br />（2）当超时后立即执行，此时wait返回值为False |

Event演示

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

import time
import threading
import logging

FORMAT = '%(asctime)-15s\t [%(threadName)s, %(thread)d] %(message)s'
logging.basicConfig(format=FORMAT)


def test(event):
    # 子线程中每隔3秒循环一次，无限循环，除非主线程主动暂停，这里是一个技巧，以后可以使用
    while not event.wait(3):
        logging.warning("Running")


# 初始化event
event = threading.Event()

# 开启两个子线程
threading.Thread(target=test, args=(event,)).start()
threading.Thread(target=test, args=(event,)).start()

# 模拟主线程运行中
time.sleep(7)

# 通知所有子线程退出
event.set()
```

### Event应用 - 延迟器 Timer

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-


import logging
from threading import Timer

# 初始化日志
FORMAT = '%(asctime)-15s\t [%(threadName)s, %(thread)8d] %(message)s'
logging.basicConfig(format=FORMAT)


def add(x, y):
    ret = x + y
    logging.warning(ret)
    return ret


t = Timer(5, add, args=(4, 5))  # 创建一个定时器，5秒后执行add函数
t.start()  # 启动线程

logging.warning("延迟器已经启动...")
logging.warning("做一些其他的事...")

# 取消线程
#   此时函数还没有执行，程序退出
#   如果函数已经运行，此时cancel依然可以正常执行，但是函数已经无法取消
# t.cancel()
```

### 线程同步 - 条件变量Condition

Condition内部会维护一个锁（默认是RLock），获取到锁的线程使用notify机制来通知（或称为唤醒）其他线程（1个或多个），然后使用wait释放锁并进入等待，当自身被其他线程通知（或唤醒）时，又会重新获取锁，继续向下执行



Condition实例方法

| 方法                              | 说明                                                         |
| --------------------------------- | ------------------------------------------------------------ |
| acquire(blocking, timeout)        | 与RLock实例的acquire方法一致                                 |
| release()                         | 与RLock实例的release方法一致                                 |
| notify(n=1)                       | 唤醒一个或多个线程                                           |
| notify_all()                      | 唤醒所有线程                                                 |
| wait(timeout=None)                | 进入等待状态（这会释放锁），直到被唤醒或超时（又会重新获取锁），被唤醒返回True，超时返回False<br />如果未获得锁就使用wait，则报错`RuntimeError: cannot wait on un-acquired lock` |
| wait_for(predicate, timeout=None) | wait_for是更灵活的一种wait方式，predicate需要指定一个可调用对象，<br />（1）当predicate()返回True，则继续往下执行<br />（2）当predicate()返回False，则和wait行为一致了<br />（3）timeout参数含义不变，若超时以后还会调用predicate一次 |

生产者消费者模型

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

import logging
import random
import time
from threading import Thread, Condition, Lock
from queue import Queue

# 初始化日志
FORMAT = '%(asctime)-15s\t [%(threadName)s, %(thread)d] %(message)s'
logging.basicConfig(format=FORMAT)

# 初始化条件变量
condition = Condition()
# condition = Condition(Lock())

# 初始化全局数据
data = Queue(maxsize=3)


class Producer(Thread):
    def __init__(self):
        super().__init__()

    def run(self) -> None:
        def wrapper():
            # 获取锁
            # 注意：如果直接使用condition.acquire()的话不要忘记release(),
            #      否则当condition = Condition(Lock())时会造成死锁，使用默认的RLock也会造成死锁，只是不容易复现
            with condition:
                # 添加数据至容器满
                while not data.full():
                    item = random.randint(10, 99)
                    data.put(item)
                    logging.warning(f"添加数据项: {item}, 当前队列大小: {data.qsize()}")

                # 通知小伙伴消费
                condition.notify()  # 通知，但还未释放锁
                logging.warning("队列已满, 通知其他线程消费")
                condition.wait()  # 释放锁，并进入等待模式; 被唤醒时又会重新获取锁

        while True:
            wrapper()


class Consumer(Thread):
    def __init__(self):
        super().__init__()

    def run(self) -> None:
        def wrapper():
            with condition:
                while not data.empty():
                    item = data.get()
                    logging.warning(f"消费数据项: {item}, 当前队列大小: {data.qsize()}")
                condition.notify()
                logging.warning("队列已空, 通知其他线程添加\n")
                time.sleep(3)  # 暂停一下，方便控制台看的清楚
                condition.wait()

        while True:
            wrapper()


# 创建多个生产者和消费者
for i in range(9):
    t = Producer()
    t.setName("Producer-{}".format(i + 1))
    t.start()

    t = Consumer()
    t.setName("Consumer-{}".format(i + 1))
    t.start()
```



### 线程同步 - Barrier

### 线程同步 - Semaphore

### 线程池 - ThreadPoolExecutor

ThreadPoolExecutor构造参数

| 参数               | 说明                                       |
| ------------------ | ------------------------------------------ |
| max_workers        | 指定线程池的最大线程数，默认为CPU核数的5倍 |
| thread_name_prefix | 指定线程池中线程的名称前缀                 |

ThreadPoolExecutor实例方法

| 方法                        | 说明                                                         |
| --------------------------- | ------------------------------------------------------------ |
| submit(fn, *args, **kwargs) | 提交任务，线程池会分配一个线程迟总任务，返回一个Future实例，如果池已经满了，还可以继续提交 |
| shutdown(wait=True)         | 清理池，池中的线程/进程全部杀掉，同时不再接受新提交的任务，<br />如果继续提交会报错`RuntimeError: cannot schedule new futures after shutdown` |

Future实例方法

| 方法                    | 说明                                                         |
| ----------------------- | ------------------------------------------------------------ |
| done()                  | 如果调用成功执行或取消成功，那么返回True，否则返回False      |
| cancelled()             | 如果复用被成功的取消，那么返回True                           |
| running()               | 如果正在运行且不能被取消，那么返回True                       |
| cancel()                | 尝试取消调用，如果已经执行且不能取消返回False，否则返回True  |
| result(timeout=None)    | 取返回的结果，timeout为None,一直等待返回，超时抛出concurrent.futures.TimeoutError异常 |
| exception(timeout=None) | 取返回的异常，timeout为None,一直等待返回,超时抛出concurrent.futures.TimeoutError异常 |

线程池简单演示

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

import time
import logging
from concurrent.futures import ThreadPoolExecutor

# 初始化日志
FORMAT = '%(asctime)-15s\t [%(threadName)s, %(thread)d] %(message)s'
logging.basicConfig(format=FORMAT)


def add(x: int, y: int):
    logging.warning("Function add run")

    time.sleep(2)  # 模拟函数龟速运行
    if x == 2:  # 模拟意外报错
        raise Exception("Error: Parameter x in add function is not allowed to be 2")

    ret = x + y  # 正确计算结果

    logging.warning("Function add finished")
    return ret


with ThreadPoolExecutor(max_workers=5, thread_name_prefix="Thread-Add") as executor:
    # 提交多个任务,并将任务收集起来
    # 当任务数 > 工作线程时，还可以继续提交任务，submit函数并不会阻塞，而是会将任务放到队列中
    # 查看源码发现使用的是queue.SimpleQueue()，简单队列，先进先出，队列大小没有限制
    tasks = []
    for i in range(5):
        future = executor.submit(add, i, i)
        tasks.append(future)
    # logging.warning("全部任务已提交")

    # 获取每个任务执行结果，并将结果收集起来
    results = []
    for j in tasks:
        if j.exception() is None:  # 线程未崩溃(报错)
            results.append(j.result())
        else:
            results.append(j.exception())  # 线程崩溃信息

    # 依次输出每个任务的结果
    for result in results:
        logging.warning("add result: {}".format(result))
```

## 

## 五、协程

### 同步和异步

对于一个函数来说，同步指的是函数返回值就是我们想要的最终结果，异步则指不会直接拿到最终结果。

那么异步函数如何拿到最终结果，可以有如下几种方法

* 给异步函数传入一个回调函数，在回调函数中我们可以拿到最终结果
* 异步函数返回给我们一个中间结果，比如说是一个对象，通过对象的xx方法可以拿到结果

<span style="color: red;font-weight: bold;">总结：同步/异步就看是否能直接拿到最终结果，需要注意的是与代码运行时长是没有任何关系的</span>

<br />

### 阻塞和非阻塞

阻塞和非阻塞直接讲并不容易讲清楚，所以这里结合队列做一下说明



阻塞队列

* 入队阻塞：当队列满了之后再入队，则会进行阻塞，直到满足以下情况：
  * 若设置了超时时间，入队超时，阻塞结束
  * 当其他线程消费队列数据后导致队列不满，本线程入队成功，阻塞结束
* 出队阻塞：当队列为空时再出队，则会进行阻塞，直到满足以下情况：
  * 若设置了超时时间，出队超时，阻塞结束
  * 当其他线程入队数据后，本线程出队成功，阻塞结束

非阻塞队列

* 入队不会阻塞，如何保证不会阻塞：
  * 不考虑内存限制的话，最简单的方法就是不设置队列大小，一直可以放入数据
  * 如果考虑内存限制的话，可以使用双端队列，当队列满了之后再放入数据会先把最开始的数据删掉，然后就能正常放入
* 出队不会阻塞，如何保证不会阻塞：
  * 当队列为空时返回`None`或者报错即可



阻塞队列-入队阻塞演示

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

'''阻塞队列-入队阻塞演示'''

import logging
import random
import time
from queue import Queue
from threading import Thread

# 初始化日志
FORMAT = '%(asctime)-15s\t [%(threadName)s, %(thread)d] %(message)s'
logging.basicConfig(format=FORMAT)

# 初始化队列，队列大小为3
q = Queue(maxsize=3)


# 生产者
def producer():
    '''入队阻塞：向队列中放入3个数据时，队列就已经满了，此时再进行put就会进行阻塞
    '''
    for i in range(4):
        item = random.randint(10, 99)
        q.put(item)
        logging.warning(f"队列放入数据: {item} | 当前队列大小: {q.qsize()} | 队列是否已满: {q.full()}")

# 消费者
def consumer():
    '''消费队列中的一个数据'''
    time.sleep(3)  # 为了更好的显示队列阻塞，所以让消费者先暂停3秒钟再消费
    item = q.get()
    logging.warning(f"队列消费数据: {item} | 当前队列大小: {q.qsize()} | 队列是否已满: {q.full()}")


Thread(target=producer, name="Producer").start()
Thread(target=consumer, name="Consumer").start()
```

:::

非阻塞队列-入队非阻塞演示

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

'''非阻塞队列-入队非阻塞演示'''

import logging
import random
import time
from collections import deque
from threading import Thread

# 初始化日志
FORMAT = '%(asctime)-15s\t [%(threadName)s, %(thread)d] %(message)s'
logging.basicConfig(format=FORMAT)

# 初始化双端队列，队列大小为3
q = deque(maxlen=3)


# 生产者
def producer():
    '''入队非阻塞：向队列中放入3个数据时，队列就已经满了，此时再进行put就会删除之前放的数据，给新数据腾位置
    '''
    for i in range(4):
        item = random.randint(10, 99)
        q.append(item)

        msg = f"队列放入数据: {item} | 当前队列大小: {len(q)} | 队列是否已满: {str(len(q) == q.maxlen):<5} | 队列数据: {q}"
        logging.warning(msg)


# 消费者
def consumer():
    '''消费队列中的一个数据'''
    time.sleep(3)  # 为了更好的显示队列非阻塞，所以让消费者先暂停3秒钟再消费
    item = q.pop()

    msg = f"队列消费数据: {item} | 当前队列大小: {len(q)} | 队列是否已满: {str(len(q) == q.maxlen):<5} | 队列数据: {q}"
    logging.warning(msg)


Thread(target=producer, name="Producer").start()
Thread(target=consumer, name="Consumer").start()
```

:::

<span style="color: red;font-weight: bold;">总结：阻塞和非阻塞是指是否能直接能立即返回，需要注意的是与是否能直接拿到最终结果无关</span>

<br />

### IO

上面所说的同步/异步/阻塞/非阻塞都是概念性的，需要与具体的某个东西结合起来才符合我们的实际情况，比如阻塞队列，而与这些概念关系最密切的当属`IO`操作。

IO说简单点就是输入和输出(Input/Output)，往深入说就太太太复杂了，可以参考一下经典的三种IO模型：`select`、`poll`、`epoll`



我们来列举常见的一些IO操作

* 磁盘IO：读写文件
* 网络IO：发送/接收网络请求
* 与USB设备、显示器、键盘、鼠标等交互产生的IO，比如`print("hello")`就会涉及到IO操作



IO操作类型

| 类型         | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| 同步阻塞IO   | 这是我们写代码最常用的方式，这种方式最符合开发者的思考逻辑，但是效率不高<br />比如使用`open`函数读写文件，使用第三方库`requests`发送网络请求等 |
| 同步非阻塞IO | 一般不用，不在讨论范围内                                     |
| 异步阻塞IO   | 一般不用，不在讨论范围内                                     |
| 异步非阻塞IO | 我们将要学习的协程，就是用来实现异步非阻塞IO，相比同步阻塞IO，代码会难写一些，但是效率更高 |



### 协程概念



### 协程基本使用

官方文档：[https://docs.python.org/zh-cn/3.9/library/asyncio.html](https://docs.python.org/zh-cn/3.9/library/asyncio.html)



#### 定义协程函数

使用`async`关键字定义的函数便是一个协程函数



#### 运行协程函数

直接调用协程函数，返回的叫做协程对象

协程对象需要借助外力启动，才能真正执行函数代码，此时有如下几种方法

* 在协程函数外部，使用`asyncio.run(协程对象)`，这个是协程执行最高入口点
* 在协程函数内部，可以使用几下几种方法运行新的协程：
  * 使用`await 协程对象`
  * 使用`await asyncio.create_task(协程对象)`并发运行一个或多个协程

> await是一个关键字，详细内容参考：可等待对象



协程函数举例

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

import logging
import asyncio
import time

# 初始化日志
FORMAT = '%(asctime)-15s\t [%(threadName)s, %(thread)d] %(message)s'
logging.basicConfig(format=FORMAT)

async def main():  # 使用async关键字定义协程函数
    logging.warning("hello")

    # 运行协程函数-方式2, 使用await
    # 挂起当前协程，执行asyncio.sleep(3), 并等待它执行完成, asyncio.sleep与普通的time.sleep不一样，他是协程函数
    # 这里需要执行3秒钟
    await asyncio.sleep(3)

    # 运行协程函数-方式3，并发执行多个协程
    # 这里总共需要执行5秒钟，注意并不是10秒钟
    task1 = asyncio.create_task(asyncio.sleep(5))
    task2 = asyncio.create_task(asyncio.sleep(5))
    await task1
    await task2

    logging.warning("wrold")  # 继续执行当前协程

    # main函数总共需要执行3+5=8秒钟


# 运行协程函数-方式1, 这里是最高入口点
asyncio.run(main())
```



#### 并发运行协程函数

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

import logging
import asyncio


# 初始化日志
FORMAT = '%(asctime)-15s\t [%(threadName)s, %(thread)d] %(message)s'
logging.basicConfig(format=FORMAT)


async def show_message(message: str):
    await asyncio.sleep(1)
    logging.warning(message)


async def show_message2(message: str):
    await asyncio.sleep(1)
    return message


async def main():
    # 并发运行多个协程1 - create_task - 输出结果是无序的
    logging.warning("并发运行多个协程1 - create_task - 输出结果是无序的")
    tasks = [asyncio.create_task(show_message(f"create_task_{i}")) for i in range(5)]
    for task in tasks:
        await task
    logging.warning("")

    # 并发运行多个协程1 - create_task - 改写函数，仅让输出结果有序
    logging.warning("并发运行多个协程1 - create_task - 改写函数，仅让输出结果有序")
    tasks = [asyncio.create_task(show_message2(f"create_task_{i}")) for i in range(5)]
    for task in tasks:
        ret = await task
        logging.warning(ret)
    logging.warning("")

    # 并发运行多个协程2 - gather - 输出结果是有顺序的
    logging.warning("并发运行多个协程2 - gather - 输出结果是有顺序的")
    tasks = [show_message2(f"create_task_{i}") for i in range(5)]
    rets = await asyncio.gather(*tasks)
    for i in rets:
        logging.warning(i)
    logging.warning("")

    # 其他并发运行多个协程方法
    #   * await asyncio.wait()
    #   * asyncio.as_completed()


# 运行协程函数-方式1, 这里是最高入口点
asyncio.run(main())
```

#### 协程函数的威力 - 测试网络IO

协程属于异步但其内部编写的代码可能是同步阻塞的，下面以`requests`和`aiohttp`来做一个演示

安装第三方库

```bash
pip install requests aiohttp
```

代码演示

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

import logging
import asyncio
import time
import aiohttp
import requests

# 初始化日志
FORMAT = '%(asctime)-15s\t [%(threadName)s, %(thread)d] %(message)s'
logging.basicConfig(format=FORMAT)


async def request_sync(url: str, number: int):
    start = time.time()

    # 统计HTTP请求状态码结果
    Counter = {
        "Success": 0,
        "Failed": 0,
    }

    # 发送网络请求
    with requests.session() as session:
        for i in range(number):
            r = session.get(url)
            if r.status_code == 200:
                Counter["Success"] += 1
            else:
                Counter["Failed"] += 1

    logging.warning(f"Function [ request_sync   ] running time: {int(time.time() - start)} seconds | {Counter}")


async def request_async(url: str, number: int):
    start = time.time()

    # 统计HTTP请求状态码结果
    Counter = {
        "Success": 0,
        "Failed": 0,
    }

    async def wrapper(session: aiohttp.ClientSession):
        async with session.get(url) as r:
            if r.status == 200:
                Counter["Success"] += 1
            else:
                Counter["Failed"] += 1

    # 发送网络请求
    async with aiohttp.ClientSession() as session:
        tasks = [wrapper(session) for _ in range(number)]
        await asyncio.gather(*tasks)

    logging.warning(f"Function [ request_async  ] running time: {int(time.time() - start)} seconds | {Counter}")


asyncio.run(request_sync("https://www.qq.com", 1000))
asyncio.run(request_async("https://www.qq.com", 1000))
```

:::

输出结果

```bash
2022-04-04 11:28:37,125	 [MainThread, 247048] Function [ request_sync   ] running time: 53 seconds | {'Success': 1000, 'Failed': 0}
2022-04-04 11:29:01,859	 [MainThread, 247048] Function [ request_async  ] running time: 24 seconds | {'Success': 1000, 'Failed': 0}
```



#### 协程函数并不是万能的 - 测试磁盘IO

这次我们来读写文件测试，使用非阻塞函数`aiofiles`来代替`open`

安装aiofiles

```bash
pip install aiofiles
```

代码演示

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

import logging
import random
import asyncio
import time
import aiofiles

# 初始化日志
FORMAT = '%(asctime)-15s\t [%(threadName)s, %(thread)d] %(message)s'
logging.basicConfig(format=FORMAT)


async def write_sync(file_prefix: str, number: int, lines: int):
    '''
    :param file_prefix: 文件名前缀
    :param number: 文件个数
    :param lines: 每个文件行数
    :return: None
    '''

    start = time.time()

    # 定义文件列表
    file_names = [f"{file_prefix}-{i}.txt" for i in range(number)]

    # 定义文件内容
    content = ""
    for i in range(lines):
        line = "".join(random.sample('zyxwvutsrqponmlkjihgfedcba', 10)) + "\n"
        content += line

    # 生成文件-阻塞
    for file in file_names:
        with open(file, "w+") as f:
            f.write(content)
    logging.warning(f"Function [ write_sync  ] running time: {int(time.time() - start)} seconds")


async def write_async(file_prefix: str, number: int, lines: int):
    '''
    :param file_prefix: 文件名前缀
    :param number: 文件个数
    :param lines: 每个文件行数
    :return: None
    '''

    start = time.time()

    # 定义文件列表
    file_names = [f"{file_prefix}-{i}.txt" for i in range(number)]

    # 定义文件内容
    content = ""
    for i in range(lines):
        line = "".join(random.sample('zyxwvutsrqponmlkjihgfedcba', 10)) + "\n"
        content += line

    # 生成文件函数-非阻塞
    async def wrapper(file):
        async with aiofiles.open(file, mode='w+') as f:
            await f.write(content)

    # 生成文件-非阻塞
    tasks = [wrapper(file) for file in file_names]
    await asyncio.gather(*tasks)

    logging.warning(f"Function [ write_async ] running time: {int(time.time() - start)} seconds")


# 生成30个文件，每个文件包含800万行
asyncio.run(write_sync("sync", 30, 8000000))
asyncio.run(write_async("async", 30, 8000000))
```

:::

输出结果

```bash
2022-04-04 11:30:32,599	 [MainThread, 241668] Function [ write_sync  ] running time: 312 seconds
2022-04-04 11:35:17,728	 [MainThread, 241668] Function [ write_async ] running time: 285 seconds
```

可以看到确实有效果，但是提速并不明显

尤其是当我们减少文件数量、减少文件内容的时候，两种方式运行效果几乎一致，甚至有可能出现协程会更慢的情况

这是为什么呢？可能是因为网络IO和磁盘IO的不同导致的。



#### 协程与同步阻塞混合编程

注入事件循环中的执行器（默认为线程池），后面去讲到

代码演示

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*- coding:utf-8 -*-

import asyncio
import logging
import time

import requests
import urllib3
from functools import partial

# 不验证HTTPS证书后会弹出警告，此代码用于关闭警告
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# 初始化日志
FORMAT = '%(asctime)-15s\t [%(threadName)s, %(thread)d] %(message)s'
logging.basicConfig(format=FORMAT)


async def download_sync(urls: list):
    name = "download_sync"

    start = time.time()
    for url in urls:
        # 发送HTTP请求
        response = requests.get(url, verify=False)

        # 写入磁盘
        file_name = url.rsplit("/")[-1]
        with open(file_name, mode="wb") as f:
            f.write(response.content)

    logging.warning(f"{name:14} 下载完成 | 用时: {time.time() - start}秒")


# 协程和requests库混合编程
async def download_async(urls: list):
    name = "download_async"

    async def wrapper(url):
        # 获取事件循环
        loop = asyncio.get_event_loop()
        
        # run_in_executor中并不能给执行的函数传递字典参数，所以这里用get2来代替requests.get
        get2 = partial(requests.get, verify=False)
        
        # 执行器执行同步阻塞函数
        future = loop.run_in_executor(None, get2, url)
        response = await future

        # 写入磁盘
        file_name = url.rsplit("/")[-1]
        with open(file_name, mode="wb") as f:
            f.write(response.content)

    start = time.time()
    tasks = [wrapper(url) for url in urls]
    await asyncio.wait(tasks)
    logging.warning(f"{name:14} 下载完成 | 用时: {time.time() - start}秒")


if __name__ == "__main__":
    urls = [
        "https://img-pre.ivsky.com/img/tupian/pre/202108/09/fengniao.jpg",
        "https://img-pre.ivsky.com/img/tupian/pre/202108/09/fengniao-003.jpg",
        "https://img-pre.ivsky.com/img/tupian/pre/202108/09/fengniao-004.jpg"
    ]

    asyncio.run(download_sync(urls))
    asyncio.run(download_async(urls))
```

:::

输出结果

```bash
2022-04-04 12:23:50,691	 [MainThread, 252956] download_sync  下载完成 | 用时: 0.9531307220458984秒
2022-04-04 12:23:51,035	 [MainThread, 252956] download_async 下载完成 | 用时: 0.3437678813934326秒
```

可以看到效果提升还是比较明显



### 协程深入理解

#### 早期的协程执行最高入口

```python
#!/usr/bin/env python
# -*- coding:utf-8 -*-

import asyncio


async def main():
    print("hello world")

# 运行协程函数
# asyncio.run(main())

# 也可以使用低级API来运行协程函数
loop = asyncio.get_event_loop()  # 获取事件循环对象
loop.run_until_complete(main())  # 将协程对象放入事件循环
```

#### 事件循环

官方文档：[https://docs.python.org/zh-cn/3.9/library/asyncio-eventloop.html](https://docs.python.org/zh-cn/3.9/library/asyncio-eventloop.html)

看一下官网的描述：

> 事件循环是每个 asyncio 应用的核心。 事件循环会运行异步任务和回调，执行网络 IO 操作，以及运行子进程。

简单来说，事件循环就是一个大循环，用来调度协程对象，可以让我们更精细的控制协程调度



**创建和运行**

事件循环相关方法

| 方法                                      | 说明                                                         |
| ----------------------------------------- | ------------------------------------------------------------ |
| asyncio.new_event_loop()                  | 创建一个事件循环                                             |
| asyncio.set_event_loop(loop)              | 将loop设置为当前OS线程的当前事件循环                         |
| **asyncio.get_event_loop()**              | 获取当前事件循环，如果当前没有运行则创建一个新的事件循环     |
| **asyncio.get_running_loop()**            | 返回当前OS线程中正在运行的事件循环，如果没有运行则引发RuntimeError<br />（1）此函数只能由协程或回调来调用。<br />（2）官方更推荐使用这个而不是`get_event_loop` |
| asyncio.get_event_loop_policy()           | 获取当前事件循环策略                                         |
| **asyncio.set_event_loop_policy(policy)** | 设置当前事件循环策略，比如使用`uvloop`提供的事件循环策略来加快协程执行速度 |

事件循环代码演示

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*- coding:utf-8 -*-

import asyncio
import logging

# 初始化日志
FORMAT = '%(asctime)-15s\t [%(threadName)s, %(thread)d] %(message)s'
logging.basicConfig(format=FORMAT)

# 因为事件循环尚未运行，所以这里会报错 RuntimeError: no running event loop
# loop = asyncio.get_running_loop()
# print(loop)

# 看看事件循环到底是个啥?
loop1 = asyncio.get_event_loop()
logging.warning(f"事件循环1: {loop1} | 内存地址: {id(loop1)}")

# 创建一个新的事件循环对象，并设置为当前事件循环
loop2 = asyncio.new_event_loop()
asyncio.set_event_loop(loop2)
logging.warning(f"事件循环2: {asyncio.get_event_loop()} | 内存地址: {id(asyncio.get_event_loop())}")


async def show_current_loop(message):
    current_loop = asyncio.get_running_loop()
    logging.warning(f"{message}: {current_loop} | 内存地址：{id(current_loop)}")


# 运行事件循环
loop1.run_until_complete(show_current_loop("在事件循环1中运行"))
loop2.run_until_complete(show_current_loop("在事件循环1中运行"))
```

:::

输出结果

```bash
2022-04-04 16:09:19,252	 [MainThread, 261928] 事件循环1: <_WindowsSelectorEventLoop running=False closed=False debug=False> | 内存地址: 1926186899208
2022-04-04 16:09:19,252	 [MainThread, 261928] 事件循环2: <_WindowsSelectorEventLoop running=False closed=False debug=False> | 内存地址: 1926189799880
2022-04-04 16:09:19,252	 [MainThread, 261928] 在事件循环1中运行: <_WindowsSelectorEventLoop running=True closed=False debug=False> | 内存地址：1926186899208
2022-04-04 16:09:19,252	 [MainThread, 261928] 在事件循环1中运行: <_WindowsSelectorEventLoop running=True closed=False debug=False> | 内存地址：1926189799880
```

> （1）第一行输出：running=False 说明虽然创建了事件循环，但并未运行
>
> （2）第二行输出：我们又创建了一个事件循环，两个对比一下，发现内存地址并不相同
>
> （3）第三行输出：我们编写的异步代码在第1个事件循环中运行：
>
> ​								① running已变成了True，说明事件循环运行起来了
>
> ​								② 内存地址与事件循环1相同
>
> （4）第四行输出：我们编写的异步代码在第2个事件循环中运行

<span style="color: red;font-weight: bold;">总结：可以有多个事件循环；协程函数需要在一个具体的事件循环中执行</span>

<br />

**事件循环实例方法**

| 方法                                        | 说明                                                         |
| ------------------------------------------- | ------------------------------------------------------------ |
| loop.run_until_complete(future)             | 运行直到 future ( Future 的实例 )被完成；也可以传入协程对象，会自动处理<br />（1）如果当前事件循环loop处于停止状态(stop)，会自动启动<br />（2）如果当前事件循环loop处于关闭状态(close)，则会抛出异常`RuntimeError: Event loop is closed` |
| loop.run_forever()                          | 运行事件循环直到 stop() 被调用                               |
| loop.stop()                                 | 停止事件循环                                                 |
| loop.is_running()                           | 事件循环是否正在运行                                         |
| loop.close()                                | 关闭事件循环，当这个函数被调用的时候，循环必须处于非运行状态 |
| loop.is_closed()                            | 事件循环是否已经被关闭                                       |
| loop.run_in_executor(executor, func, *args) | 在指定的执行器中调用func,返回Future对象；执行器可以为：<br />（1）None,使用默认执行器，线程池<br />（2）concurrent.futures.ThreadPoolExecutor()对象，线程池<br />（3）concurrent.futures.ProcessPoolExecutor()对象，进程池<br />如果要给函数func传递字典参数，则可以使用标准库`functools.partial`来对函数进行一层包装 |



#### 可等待对象

文档：[https://docs.python.org/zh-cn/3.9/library/asyncio-task.html#awaitables](https://docs.python.org/zh-cn/3.9/library/asyncio-task.html#awaitables)

如果一个对象可以在 [`await`](https://docs.python.org/zh-cn/3.9/reference/expressions.html#await) 语句中使用，那么它就是 **可等待** 对象。许多 asyncio API 都被设计为接受可等待对象。

可等待对象有几下几种类型: 

* 协程
* Task
* Future
* 拥有`__await__`方法的对象



#### Task对象

文档：[https://docs.python.org/zh-cn/3.9/library/asyncio-task.html#task-object](https://docs.python.org/zh-cn/3.9/library/asyncio-task.html#task-object)

Task说明

* Task对象是对协程对象的一层包装，该协程会被**自动调度执行**

  Task创建完后会被**自动调度执行**，所以如果在事件循环运行之前创建Task，会报错`RuntimeError: no running event loop`

* Task对象是线程不安全的
* Task是Future的子类



创建Task实例的方法

* 高级API ：`asyncio.create_task(协程对象, *, name=None)`（推荐使用）
* 低级API ：`loop.create_task(协程对象, *, name=None)`
* 低级API：`asyncio.ensure_future(obj, *, loop=None)`



#### Future对象

文档：[https://docs.python.org/zh-cn/3.9/library/asyncio-future.html#asyncio.Future](https://docs.python.org/zh-cn/3.9/library/asyncio-future.html#asyncio.Future)

Future说明

* Future表示异步操作的 **最终结果**，是一种特殊的**低层级** 可等待对象，通常情况下**没有必要**在应用层级的代码中创建 Future 对象
* Future对象是线程不安全的



Future简单示例

```python
#!/usr/bin/env python
# -*- coding:utf-8 -*-

import asyncio
import logging

# 初始化日志
FORMAT = '%(asctime)-15s\t [%(threadName)s, %(thread)d] %(message)s'
logging.basicConfig(format=FORMAT)


async def display(future: asyncio.Future):
    future.set_result("Hello World")  # 设置future返回值


async def main():
    loop = asyncio.get_running_loop()  # 得到当前事件循环
    future = loop.create_future()  # 在当前事件循环中创建一个Future对象
    await loop.create_task(display(future))  # 创建一个Task对象放入事件循环，绑定display函数，display函数内手动给future赋值
    data = await future  # 等待Future获取结果
    logging.warning(data)  # 输出结果 Hello World


asyncio.run(main())
```



#### 对象检测

| 检测方法                              | 说明                 |
| ------------------------------------- | -------------------- |
| asyncio.iscoroutinefunction(协程函数) | 返回是否是协程函数   |
| asyncio.iscoroutine(协程对象)         | 返回是否是协程对象   |
| asyncio.isfuture(future)              | 返回是否是Future对象 |
| inspect.isawaitable(对象)             | 返回是否是可等待对象 |

> 协程函数、协程对象也可以使用`inspect.iscoroutinefunction(协程函数)`和`inspect.iscoroutine(协程对象)`来检测，
>
> 但是`inspect`只能检测使用`async def`定义的协程，对于使用基于生成器的协程，则无法检测



#### 异步迭代器

文档：[https://docs.python.org/zh-cn/3.9/reference/datamodel.html#asynchronous-iterators](https://docs.python.org/zh-cn/3.9/reference/datamodel.html#asynchronous-iterators)



异步迭代器可以在其 `__anext__` 方法中调用异步代码

异步迭代器可在 [`async for`](https://docs.python.org/zh-cn/3.9/reference/compound_stmts.html#async-for) 语句中使用



异步迭代器需要定义如下方法

（1）`def __aiter__(self)`

必须返回一个可等待对象，一般返回自己

（2）`async def __anext__(self)`

必须返回一个下一次迭代的结果值。 当迭代结束时应该引发 [`StopAsyncIteration`](https://docs.python.org/zh-cn/3.9/library/exceptions.html#StopAsyncIteration) 错误

代码示例

```python
#!/usr/bin/env python
# -*- coding:utf-8 -*-

import asyncio
import random


class Random:
    def __init__(self, n=None):
        self.n = n
        self._count = 0

    def __aiter__(self):
        return self

    async def __anext__(self):
        if self.n is not None:
            if self._count >= self.n:
                raise StopAsyncIteration
            self._count += 1
        return random.randint(1, 100)


async def main():
    async for x in Random(n=10):  # 异步迭代
        print(x)


asyncio.run(main())
```



#### 异步上下文管理器

文档：[https://docs.python.org/zh-cn/3.9/reference/datamodel.html#asynchronous-context-managers](https://docs.python.org/zh-cn/3.9/reference/datamodel.html#asynchronous-context-managers)



异步上下文管理器 是上下文管理器的一种，它能够在其 `__aenter__` 和 `__aexit__` 方法中暂停执行。

异步上下文管理器可在 [`async with`](https://docs.python.org/zh-cn/3.9/reference/compound_stmts.html#async-with) 语句中使用



异步上下文管理器需要实现如下方法

（1）`async def __aenter__(self)`

返回值是`async with xx as xx`语句中as后面的对象，必须返回一个可等待对象

（2）`async def __aexit__(self, exc_type, exc_val, exc_tb)`

当`with`语句执行结束时调用此函数，用于执行一些资源清理的操作

代码示例

```python
#!/usr/bin/env python
# -*- coding:utf-8 -*-

import asyncio
import logging

# 初始化日志
FORMAT = '%(asctime)-15s\t [%(threadName)s, %(thread)d] %(message)s'
logging.basicConfig(format=FORMAT)


class ClientSession:
    async def __aenter__(self):
        '''
        async with xxx as xx
        as后面的对象，就是本函数的返回值
        '''
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        '''with语法运行结束后执行的清理操作'''
        self._close()

    def get(self):
        logging.warning("执行Get方法")

    def _close(self):
        logging.warning("关闭Session")


async def main():
    async with ClientSession() as session:
        session.get()

asyncio.run(main())
```



#### 控制协程并发数量

可以自己手动控制也可以使用`asyncio.Semaphore(并发)`，两个代码都不难，但以下两种代码还是有些区别的，假设总请求数为10，并发为2，那么：

* 手动控制的是等2个请求完全完成后再去请求后2个，`Semaphore`是2个请求中任意一个完成就会再启动一个新请求，

  `Semaphore`效率更高，手动控的制控制台信息更直观

* `Semaphore`代码量更小



自己手动控制并发演示

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*- coding:utf-8 -*-

import asyncio
import logging
import time
import aiohttp

# 初始化日志
FORMAT = '%(asctime)-15s\t [%(threadName)s, %(thread)d] %(message)s'
logging.basicConfig(format=FORMAT)


async def request_async(url: str, request_total: int, concurrent: int = 1000):
    '''
    :param url: URL
    :param request_total: 总共发送多少次请求
    :param concurrent: 并发数量，需要 > 0
    :return: None
    '''
    start = time.time()

    # 统计HTTP请求状态码结果
    Counter = {
        "Success": 0,
        "Failed": 0,
    }

    async def wrapper(session: aiohttp.ClientSession):
        logging.warning("Started a request")
        async with session.get(url) as r:
            if r.status == 200:
                Counter["Success"] += 1
            else:
                Counter["Failed"] += 1
        logging.warning("Completed a request")

    # 发送网络请求
    async with aiohttp.ClientSession() as session:
        while request_total > 0:
            # --------------------------- 并发控制 --------------------------------
            # 剩余请求小于并发数，直接请求即可
            if request_total <= concurrent:
                tasks = [wrapper(session) for _ in range(request_total)]
                request_total = 0
            # 按照一定数量并发执行
            else:
                tasks = [wrapper(session) for _ in range(concurrent)]
                request_total -= concurrent
            # --------------------------- 并发控制 --------------------------------
            await asyncio.gather(*tasks)

    logging.warning(f"Function [ request_async  ] running time: {int(time.time() - start)} seconds | {Counter}")


asyncio.run(request_async("https://www.qq.com", request_total=10 concurrent=2))
```

:::



使用`asyncio.Semaphore`控制并发

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*- coding:utf-8 -*-

import asyncio
import logging
import time
import aiohttp

# 初始化日志
FORMAT = '%(asctime)-15s\t [%(threadName)s, %(thread)d] %(message)s'
logging.basicConfig(format=FORMAT)


async def request_async(url: str, request_total: int, concurrent: int = 1000):
    '''
    :param url: URL
    :param request_total: 总共发送多少次请求
    :param concurrent: 并发数量，需要 > 0
    :return: None
    '''
    start = time.time()

    # (1)并发控制, 不能设置为0，否则会发生死锁
    semphore = asyncio.Semaphore(concurrent)

    # 统计HTTP请求状态码结果
    Counter = {
        "Success": 0,
        "Failed": 0,
    }

    async def wrapper(session: aiohttp.ClientSession):
        async with semphore:  # (2)并发控制
            logging.warning("Started a request")
            async with session.get(url) as r:
                if r.status == 200:
                    Counter["Success"] += 1
                else:
                    Counter["Failed"] += 1
            logging.warning("Completed a request")

    # 发送网络请求
    async with aiohttp.ClientSession() as session:
        tasks = [wrapper(session) for _ in range(request_total)]
        await asyncio.gather(*tasks)

    logging.warning(f"Function [ request_async  ] running time: {int(time.time() - start)} seconds | {Counter}")


asyncio.run(request_async("https://www.qq.com", request_total=10, concurrent=2))
```

:::

#### 协程局部变量

文档：[https://docs.python.org/zh-cn/3.10/library/contextvars.html](https://docs.python.org/zh-cn/3.10/library/contextvars.html)

`contextvars`与`threading.local`类似，用于异步中管理上下文

💡 提醒： `asyncio`并没有提供`local`类

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*- coding:utf-8-*-

import asyncio
import logging
import contextvars

# 初始化日志
FORMAT = '%(asctime)-15s\t [%(threadName)s, %(thread)d] %(message)s'
logging.basicConfig(format=FORMAT)


class MyClass:
    def __init__(self, value=None):
        self.value = value

    def set(self, value):
        self.value = value

    def get(self):
        return self.value


# 全局变量
data1 = MyClass()

# 全局变量(协程局部变量)
data2 = contextvars.ContextVar("")


async def task1(n):
    data1.set(n)
    await asyncio.sleep(0.1)
    logging.warning(f"Task1-{n}: {data1.get()}")
    # assert n == data.get()


async def task2(n):
    data2.set(n)
    await asyncio.sleep(0.1)
    logging.warning(f"Task2-{n}: {data2.get()}")
    # assert n == data.get()


async def main():
    # 测试1
    logging.warning("测试1：协程并发修改全局变量")
    tasks1 = [task1(x) for x in range(10)]
    await asyncio.gather(*tasks1)
    logging.warning("-" * 50)

    # 测试2
    logging.warning("测试2：协程局部变量")
    tasks2 = [task2(x) for x in range(10)]
    await asyncio.gather(*tasks2)


if __name__ == '__main__':
    asyncio.run(main())
```

:::

输出结果

```bash
2022-04-07 11:45:22,185	 [MainThread, 360196] 测试1：协程并发修改全局变量
2022-04-07 11:45:22,294	 [MainThread, 360196] Task1-0: 9
2022-04-07 11:45:22,294	 [MainThread, 360196] Task1-2: 9
2022-04-07 11:45:22,294	 [MainThread, 360196] Task1-6: 9
2022-04-07 11:45:22,294	 [MainThread, 360196] Task1-9: 9
2022-04-07 11:45:22,294	 [MainThread, 360196] Task1-8: 9
2022-04-07 11:45:22,294	 [MainThread, 360196] Task1-5: 9
2022-04-07 11:45:22,294	 [MainThread, 360196] Task1-7: 9
2022-04-07 11:45:22,294	 [MainThread, 360196] Task1-4: 9
2022-04-07 11:45:22,294	 [MainThread, 360196] Task1-1: 9
2022-04-07 11:45:22,294	 [MainThread, 360196] Task1-3: 9
2022-04-07 11:45:22,294	 [MainThread, 360196] --------------------------------------------------
2022-04-07 11:45:22,294	 [MainThread, 360196] 测试2：协程局部变量
2022-04-07 11:45:22,403	 [MainThread, 360196] Task2-0: 0
2022-04-07 11:45:22,403	 [MainThread, 360196] Task2-2: 2
2022-04-07 11:45:22,403	 [MainThread, 360196] Task2-6: 6
2022-04-07 11:45:22,403	 [MainThread, 360196] Task2-9: 9
2022-04-07 11:45:22,403	 [MainThread, 360196] Task2-8: 8
2022-04-07 11:45:22,403	 [MainThread, 360196] Task2-5: 5
2022-04-07 11:45:22,403	 [MainThread, 360196] Task2-7: 7
2022-04-07 11:45:22,403	 [MainThread, 360196] Task2-4: 4
2022-04-07 11:45:22,403	 [MainThread, 360196] Task2-1: 1
2022-04-07 11:45:22,403	 [MainThread, 360196] Task2-3: 3
```



## 

## 六、面向对象

### 装饰器

（1）属性装饰器 `@property`

* 可以将一个方法可以当做属性来访问，访问时不需要加()
* 同时该属性不允许直接修改，如果需要修改和删除功能，需要编写`@函数名.setter`和`@函数名.deleter`装饰的同名函数
* 通过黑魔法【._类名__属性名】可以修改属性值，但是强烈不建议使用这种方法

（2）类方法装饰器 `@classmethod`

被修饰的函数第一个参数不再是实例对象而是 类对象

（3）静态方法装饰器 `@staticmethod`

修饰的函数第一个参数可以不用传，装饰器会自动给我们传进去



代码示例

```python
#!/usr/bin/env python
# -*- coding:utf-8-*-

import logging

# 初始化日志
FORMAT = '%(asctime)-15s\t [%(threadName)s, %(thread)d] %(message)s'
logging.basicConfig(format=FORMAT)


class Person:
    def __init__(self, name):
        self.__name = name

    @property
    def name(self):
        logging.warning("@property")
        return self.__name

    @name.setter
    def name(self, name):
        logging.warning("@name.setter")
        self.__name = name

    @name.deleter
    def name(self):
        logging.warning("@name.deleter")
        del self.__name


logging.warning("属性访问")
bob = Person("bob")
logging.warning(f"{bob.name}\n")

logging.warning("属性设置")
bob.name = "Bob"
logging.warning(f"{bob.name}\n")

logging.warning("黑魔法设置属性")
bob._Person__name = "abc"
logging.warning(f"{bob.name}")
```



### 魔法方法

| 分类               | 魔法方法                                    | 说明                                                         |
| ------------------ | ------------------------------------------- | ------------------------------------------------------------ |
| 实例创建和销毁     | `__new__`                                   | 创建类实例对象并返回                                         |
|                    | `__del__`                                   | 在实例将被销毁时调用                                         |
| 属性字典           | `__dict__`                                  | 对象所有属性组成的字典（这个属性对我们学习/调试阶段可太重要了） |
| self[key]          | `__getitem__`、`__setitem__`、`__delitem__` | 通过`self[key]`访问时调用                                    |
| 可视化             | `__repr__`、`__str__`、`__format__`         | 可视化                                                       |
| 可迭代对象和迭代器 | `__iter__`、`__next__`                      | 可迭代对象和迭代器                                           |
| with上下文管理     | `__enter__`、`__exit__`                     |                                                              |
| 实例属性查找       | `__getattribute__`                          |                                                              |



#### `__new__`

文档：[https://docs.python.org/zh-cn/3.10/reference/datamodel.html#object.__new__](https://docs.python.org/zh-cn/3.10/reference/datamodel.html#object.__new__)

创建类实例对象并返回，它可以让我们定制实例创建过程，比如实现**单例模式**

默认的`__new__`行为

```python
#!/usr/bin/env python
# -*- coding:utf-8-*-

# class Demo:
#    pass

# 将以上代码展开的话，就等同于如下代码
class Demo:
    def __new__(cls, *args, **kwargs):
        # return object.__new__(cls) # 写法1
        return super().__new__(cls)  # 写法2
```

使用`__new__`实现线程安全的单例类

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*- coding:utf-8-*-

import threading

class Single:
    _instance_lock = threading.Lock()

    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, "_instance"):
            with cls._instance_lock:
                if not hasattr(cls, "_instance"):
                    cls._instance = object.__new__(cls)
        return getattr(cls, "_instance")


# 原理说明
#   每次创建【类实例对象】时先检查【类对象】上是否有_instance属性，
#       如果有，说明已经实例化过了，直接返回类实例化对象
#       如果没有，那么才开始创建实例对象
#           获取锁
#               类属性_instance = 类实例化对象
#           返回类属性_instance
#
# 问: 加锁之后为什么还要判断有没有_instance属性?
# 答: 如果不判断，那么线程1获取锁后，还没执行完，这时候线程2已经在尝试获取锁了，等线程1执行完，实际上已经是单例了，
#     线程2又获取了一遍锁，又生成一个新对象，实际就并不是线程安全了。这与线程安全章节的queue陷阱类似。

for i in range(10):
    threading.Thread(target=lambda: print(Single())).start()
```

:::

#### `__del__`

文档：[https://docs.python.org/zh-cn/3.10/reference/datamodel.html#object.__del__](https://docs.python.org/zh-cn/3.10/reference/datamodel.html#object.__del__)

在实例将被销毁时调用，注意：`del x` 并不直接调用 `x.__del__()` --- 前者会将 `x` 的引用计数减一，而后者仅会在 `x` 的引用计数变为零时被调用。

代码示例

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*- coding:utf-8-*-

import sys
import time

class Demo:
    def __del__(self):
        print("__del__ called")


a = Demo()
b = a
c = a

print(a is b is c)  # True
print(sys.getrefcount(a) - 1)  # 引用计数为3， a，b,c

del a  # del会将对象的引用计数-1，只有当对象的引用计数为0时，才会调用__del__，所以这里并不会有任何输出

time.sleep(3)

# 程序在结束时，会将引用计数置为0，并调用一次__del__
# __del__ called


# 输出结果
# True
# 3
# __del__ called
```

:::



#### `__dict__`

文档：[https://docs.python.org/zh-cn/3.10/library/stdtypes.html#object.__dict__](https://docs.python.org/zh-cn/3.10/library/stdtypes.html#object.__dict__)

这个太重要了，后面会经常用到，给一个简单的例子

```python
#!/usr/bin/env python
# -*- coding:utf-8-*-

class Demo:
    '''测试Demo'''

    def __init__(self, name):
        self.name = name
        self.sex = "man"


print(Demo.__dict__)
print(Demo("Bob").__dict__)

# 第一次输出为 类字典
# {'__module__': '__main__', '__doc__': '测试Demo', '__init__': <function Demo.__init__ at 0x00000229047F8C18>, '__dict__': <attribute '__dict__' of 'Demo' objects>, '__weakref__': <attribute '__weakref__' of 'Demo' objects>}

# 第二次输出为 实例字典
# {'name': 'Bob', 'sex': 'man'}
```



#### `self[key]`

[文档：https://docs.python.org/zh-cn/3.10/reference/datamodel.html#object.__getitem__](https://docs.python.org/zh-cn/3.10/reference/datamodel.html#object.__getitem__)

代码示例

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*- coding:utf-8-*-

# 测试1：准备几种不同的数据结构
l = [100, 200, 300]
d = {"name": "bob", "age": 20, 10: 20}

print(l.__getitem__(0))  # 等同于 l[0], 列表没有key，只有索引，所以0代表的是索引
print(d.__getitem__("name"))  # 等同于d["name"]
print(d.__getitem__(10))  # 等同于d[10]，这里虽然是数字，看起来像是通过索引来访问（其实不是），本质上还是通过key


# 测试2：
class Demo:
    def __init__(self, *args, **kwargs):
        self.data = {
            "name": "Demo",
            "version": "v1"
        }

    def __getitem__(self, item):
        print(f"Called: __getitem__({item})")
        return self.data[item]

    def __setitem__(self, key, value):
        print(f"Called: __setitem__({key}, {value})")
        self.data[key] = value

    def __delitem__(self, key):
        print(f"Called: __delitem__({key})")
        del self.data[key]


print("-" * 50)
# (1)
d = Demo()
print(d["name"])

# (2)
d["color"] = "red"

# (3)
del d["version"]
```

:::

输出结果

```bash
100
bob
20
--------------------------------------------------
Called: __getitem__(name)
Demo
Called: __setitem__(color, red)
Called: __delitem__(version)
```



#### 可视化

文档：[https://docs.python.org/zh-cn/3.10/reference/datamodel.html#object.__repr__](https://docs.python.org/zh-cn/3.10/reference/datamodel.html#object.__repr__)

* `__str__`和`__repr__`作用类似，推荐两个定义成一样的，并且优先定义`__repr__`（`__str__`也可以不定义会自动调用`__repr__`）

* `__str__`和`__repr__`不同的例子可以参考`datetime`模块实现

  ```python
  from datetime import date
  print(str(date.today()))   # 2022-04-08
  print(repr(date.today()))  # datetime.date(2022, 4, 8)
  ```

* `__format__`用的并不多，当需要一个对象可以展示多种样式时可以定义这个方法



示例代码

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*- coding:utf-8-*-

class Person:
    def __init__(self, name):
        self.name = name


class Person2(Person):
    def __repr__(self):
        return f'<Person2 {self.name}>'


# 默认情况下的输出
bob = Person("Bob")
print(bob)  # <__main__.Person object at 0x0000017AE21FD548>

# 优化默认输出
jack = Person2("Jack")
print(jack)  # <Person2 Jack>
print("-" * 50)


# __format__可以定制多种输出格式
class Point:
    def __init__(self, x: int, y: int):
        self.x = x
        self.y = y

    def __repr__(self):
        return f"<Point ({self.x}, {self.y})>"

    def __format__(self, format_spec):
        # 显示格式，也可以放到类外边去定义
        FORMAT = {
            "default": "<Point ({}, {})>",  # 默认显示格式
            "parentheses": "({}, {})",  # 小括号显示格式
            "dictionary": "{{'x':{}, 'y':{} }}",  # 字典显示格式
        }

        # 不指定则使用默认显示形式
        if format_spec == "":
            return self.__repr__()

        return FORMAT[format_spec].format(self.x, self.y)


point = Point(100, 200)
print(f"{point}")  # 默认显示格式， <Point (100, 200)>
print(f"{point:parentheses}")  # 小括号显示格式， (100, 200)
print(f"{point:dictionary}")  # 字典显示格式， {'x':100, 'y':200 }
```

:::

输出结果

```bash
<__main__.Person object at 0x00000210C7965908>
<Person2 Jack>
--------------------------------------------------
<Point (100, 200)>
(100, 200)
{'x':100, 'y':200 }
```

#### 可迭代对象和迭代器

文档：[https://docs.python.org/zh-cn/3.10/library/stdtypes.html#container.__iter__](https://docs.python.org/zh-cn/3.10/library/stdtypes.html#container.__iter__)

<hr />

**（1）基础知识**

语法定义：实现了`__iter__`方法的对象称为可迭代对象，实现了`__iter__`方法和`__next__`的对象称为迭代器

包含关系：迭代器是可迭代对象，但是可迭代对象不一定是迭代器

<br />

相同点：都可以使用`for xx in xx`语句

不同点：

* **同一个迭代器对象**只能使用**一次**for语句迭代

* **同一个可迭代对象**可以**多次**使用for语句迭代，原因在于`__iter__`必须要返回一个迭代器对象

<br />

相关内建函数：

* `iter(可迭代对象)` 将可迭代对象转为一个新的迭代器返回，等同于调用`可迭代对象.__iter__()`
* `next(迭代器)`获取下一次迭代的值，迭代完成后会抛出`StopIteration`异常，for语句会自动帮我们捕获，然后退出循环

<br />

数据类型举例

* 迭代器：生成器
* 可迭代对象：字符串、列表、元组、字典等

<br />

**（2）迭代次数不同示例**

::: details 点击查看完整代码

```python
# !/usr/bin/env python
# -*- coding:utf-8-*-

import warnings

warnings.filterwarnings("ignore")  # 关系collections.abc的警告

from collections import Iterable, Iterator

# 定义数据
l1 = [100, 200]  # 列表是可迭代对象，但不是迭代器
l2 = iter(l1)  # 使用iter(可迭代对象)可以将 可迭代对象转为迭代器

print("-" * 25 + " 一个可迭代对象和一个迭代器 " + "-" * 25)
print(f"l1是可迭代对象: {isinstance(l1, Iterable)}, 是迭代器: {isinstance(l1, Iterator)}")
print(f"l2是可迭代对象: {isinstance(l2, Iterable)}, 是迭代器: {isinstance(l2, Iterator)}")

print("-" * 25 + "多次迭代l1" + "-" * 25)
for i in l1:
    print(i)

for i in l1:
    print(i)

print("-" * 25 + "多次迭代l2" + "-" * 25)
for i in l2:
    print(i)

for i in l2:  # 这里再迭代，已经没有数据了
    print(i)

# 需要注意的是：上面我们都是在迭代同一对象，如果是不同对象，不管是迭代器还是可迭代对象，都可以无限使用for语句，比如
# for i in Range(10):   # Range是一个迭代器
#     print(i)
# for i in Range(10):   # 注意这里又是另外一个Range对象了，跟上面的不一样，所以可以继续迭代
#     print(i)
```

:::

输出结果

```bash
------------------------- 一个可迭代对象和一个迭代器 -------------------------
l1是可迭代对象: True, 是迭代器: False
l2是可迭代对象: True, 是迭代器: True
-------------------------多次迭代l1-------------------------
100
200
100
200
-------------------------多次迭代l2-------------------------
100
200
```

<br />

<br />

**（3）`__iter__`和`__next__`方法**

`__iter__`必须返回一个迭代器，此时可以有以下几种返回值：

* 返回实例本身(`self`)，意味着实例本身就是迭代器，所以也需要实现`__next__`方法
* 将可迭代对象转为迭代器并返回，`return iter(可迭代对象)`
* 返回生成器（生成器是迭代器的一种）

`__next__`方法返回下一个值，如果值已经取完，抛出`StopIteration`，`for`语句会自动捕捉这个异常，然后退出循环

示例代码 - 仿`range`

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*- coding:utf-8-*-


class Range:
    def __init__(self, start, stop=None, step=1):
        self.step = step
        # 一个参数, start = stop
        if stop is None:
            self.start = - self.step
            self.stop = start
        else:
            # 两个参数
            self.start = start - self.step
            self.stop = stop

    def __iter__(self):
        return self

    def __next__(self):
        self.start += self.step
        if self.start >= self.stop:
            raise StopIteration
        return self.start


for i in Range(10, 20, 3):
    print(i)
print(list(range(5)) == list(Range(5)))  # True
print(list(range(5, 10)) == list(Range(5, 10)))  # True
print(list(range(5, 10, 2)) == list(Range(5, 10, 2)))  # True
print(list(range(2, 10, 2)) == list(Range(2, 10, 2)))  # True
print(list(range(2, 10, 3)) == list(Range(2, 10, 3)))  # True
```

:::

输出结果

```bash
10
13
16
19
True
True
True
True
True
```



**（4）迭代流程扩展**

一个完整的迭代流程如下：

① 检查对象是否实现了` __iter__ `方法，如果实现了就调用它，获取一个迭代器

② 如果没有实现` __iter__ `方法，**但是实现了` __getitem__` 方法，Python会创建一个迭代器，尝试按顺序（从索引 0 开始）获取元素**

​     如果尝试失败，Python抛出 `TypeError`异常，通常会提示`"x object is not iterable"`

不实现`__iter__`但是实现`__getitem__`示例

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*- coding:utf-8-*-

import warnings

warnings.filterwarnings("ignore")  # 关系collections.abc的警告

from collections import Iterable, Iterator


class Range:
    def __init__(self):
        self.data = [x for x in range(5, 8)]

    def __getitem__(self, item):
        return self.data[item]


data = Range()
print(data[0])
print(data[1])
print(data[2])

for i in data:
    print(i)

for i in data:
    print(i)

print(isinstance(data, Iterable))
print(isinstance(data, Iterator))

# 总结：
# 仅利用__getitem__就可以实现for语句迭代，但是它并不是可迭代对象，更不是迭代器
```

:::

输出结果

```bash
5
6
7
5
6
7
5
6
7
False
False
```



#### with上下文管理

文档

（1）[https://docs.python.org/zh-cn/3.10/reference/compound_stmts.html#the-with-statement](https://docs.python.org/zh-cn/3.10/reference/compound_stmts.html#the-with-statement)

（2）[https://docs.python.org/zh-cn/3.10/reference/datamodel.html#object.__enter__](https://docs.python.org/zh-cn/3.10/reference/datamodel.html#object.__enter__)



**说明**

`__enter__`：

* **使用`with..as`语句时，`__enter__`的返回值就等于`as`后面跟的变量**
* 如果`__enter__`方法发生错误，那么意味着`with`语句尚未开始执行，`__exit__`自然也不会执行
* 如果`__enter__`方法未发生错误，那么`__exit__()` 将总是被调用



`__exit__`:

* `with`语句执行完成后，会自动执行`__exit__`方法，即使在with上下文中遇到异常，`__exit__`也会被执行
* **`__exit__`的返回值决定`with`语句中的异常是否向外抛出（等效于`False`为抛出异常，等效于`True`为压制异常）**



**两种调用方法**

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*- coding:utf-8-*-

class Demo:
    def __enter__(self):
        print('__enter__ called')
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        print('__exit__ called')

    def demo(self):
        return self


# 使用实例的方式调用
with Demo() as f:
    print("Class test")

print('-' * 50)

# 使用实例方法调用
with Demo().demo() as c:
    print("Func test")
```

:::

输出结果

```bash
__enter__ called
Class test
__exit__ called
--------------------------------------------------
__enter__ called
Func test
__exit__ called
```



**异常抛出与压制**

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*- coding:utf-8-*-

class Demo:
    def __enter__(self):
        print('__enter__ called')
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        print('__exit__ called')
        return True  # 压制异常(如果有)
        # return False  # 抛出异常(如果有), 这句也可以不写，默认return None就等效于False


# 使用实例的方式调用
with Demo() as a:
    raise Exception("error")
```

:::

#### 实例属性查找

文档：[https://docs.python.org/zh-cn/3.10/reference/datamodel.html#object.__getattribute__](https://docs.python.org/zh-cn/3.10/reference/datamodel.html#object.__getattribute__)



**实例属性查找顺序如下**

（1）主要顺序

① 调用`__getattribute__(item)` --> 返回（计算后的）正常值

② 调用`__getattribute__(item)` --> 返回（计算后的）异常值`AttributeError` --> 如果定义了`__getattr__`则调用，否则继续抛出原来的`AttributeError`

> 我们可以称`__getattribute__`为属性拦截器

<br />

（2）计算后的值如何获得？
实例字典 --> 类字典 --> ... --> 直到`object`类字典 --> `object`抛出`AttributeError`

<br />

（3）注意事项

① `__getattribute__(item)`方法中不能再使用`self.x`、`self.__dict__`等属性，因为这会造成无限递归

② `__getattr__`中不能再使用`self.不存在的属性`，因为这同样会造成无限递归

③ `object`对象没有`__getattr__`方法，所以我们不能调用父类或object的`__getattr__`方法

<br />

**实例属性查找-正常值示例**

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*- coding:utf-8-*-

class Person:
    
    def __init__(self, name):
        self.name = name

    def getName(self):
        return self.name

    def __getattribute__(self, item):
        print(f"Called __getattribute__({item})")
        return super().__getattribute__(item)


# 实例化对象
person = Person("bob")

# 实例属性查找-1
print(person.name)
print("-" * 30)
# Called __getattribute__(name)
# bob

# 实例属性查找-2
print(person.getName())
# Called __getattribute__(getName)
# Called __getattribute__(name)
# bob
```

:::

**实例属性查找-AttributeError示例**

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*- coding:utf-8-*-

class Person:

    def __init__(self, name):
        self.name = name

    def getName(self):
        return self.name

    def __getattribute__(self, item):
        print(f"Called __getattribute__({item})")
        return super().__getattribute__(item)

    def __getattr__(self, item):
        # object对象没有__getattr__方法, 不能使用super
        return f"实例对象{self.__class__.__name__}不存在{item}属性"


# 实例化对象
person = Person("bob")

# 实例属性查找
print(person.abc)
```

:::

输出结果

```bash
Called __getattribute__(abc)
Called __getattribute__(__class__)
实例对象Person不存在abc属性
```

