# Python实用模块

## 参考资料

* **Awesome Python**

  Github：[https://github.com/vinta/awesome-python](https://github.com/vinta/awesome-python)

<br />

## 类型分组

### 默认分组

| <div style="width: 25%;">分类</div > | <span style="width: 25%;">库名</span>       | <span style="width: 25%;">类型</span> | <span style="width: 25%;">应用举例</span> |
| ---------- | ---------- | ------ | -------- |
| 日期和时间 | `datetime` | 标准库 |          |
|            | `time`     | 标准库 |          |

<br />

### 命令行接口

参考：[https://github.com/vinta/awesome-python#command-line-interface-development](https://github.com/vinta/awesome-python#command-line-interface-development)

| <div style="width: 25%;">分类</div > | <span style="width: 25%;">库名</span> | <span style="width: 25%;">类型</span> | <span style="width: 25%;">应用举例</span> |
| ------------------------------------ | ------------------------------------- | ------------------------------------- | ----------------------------------------- |
| 命令行选项、参数和子命令解析器       | <a href="#argparse">argparse</a>      | 标准库                                | `yum`/`dnf`                               |
| 进度条                               | `tqdm`                                | 第三方库                              |                                           |
| 彩色终端                             | `colorama`                            | 第三方库                              | `ipython`                                 |
| 字符图形                             | `asciimatics`                         | 第三方库                              |                                           |
| 字符表格                             | `prettytable`                         | 第三方库                              |                                           |
| 交互式命令行                         | `prompt_toolkit`                      | 第三方库                              | `ipython`                                 |

<br />

### HTTP协议

| <div style="width: 25%;">分类</div > | <span style="width: 25%;">库名</span> | <span style="width: 25%;">类型</span> | <span style="width: 25%;">应用举例</span> |
| ------------------------------------ | ------------------------------------- | ------------------------------------- | ----------------------------------------- |
| HTTP客户端                           | `httpx`                               | 第三方库                              |                                           |
| URL编码和解码                        | `urlib.parse`                         | 标准库                                |                                           |
| HTML渲染                             | `jinja2`                              | 第三方库                              |                                           |
| HTML解析                             | `beautifulsoup`                       | 第三方库                              |                                           |

## argparse

文档：[https://docs.python.org/zh-cn/3/library/argparse.html](https://docs.python.org/zh-cn/3/library/argparse.html)

### 基础示例

这是一个最基础的例子，我们没有添加任何选项，但是`argparse`会自动为我们添加`-h`和`--help`选项

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import argparse

# 实例化类，用于将命令行字符串解析为Python对象
parser = argparse.ArgumentParser()

# 解析参数
parser.parse_args()
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -h
usage: main.py [-h]
                                             
optional arguments:                          
  -h, --help  show this help message and exit
```

<br />

### 可选参数

文档：[https://docs.python.org/zh-cn/3/library/argparse.html#the-add-argument-method](https://docs.python.org/zh-cn/3/library/argparse.html#the-add-argument-method)

#### （1）添加参数并获取值

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import argparse

# 实例化对象
parser = argparse.ArgumentParser()

# 添加参数,短选项或长选项至少有一个，help参数可选
parser.add_argument("-l", "--list", help="show something")

# 解析参数
args = parser.parse_args()

# 获取参数的值
print(args)  # args是一个Namespace对象
print(args.__dict__)  # 也可以查看字典属性
print(args.list)  # 这里的list就是上面--list,如果只有一个短选项，那么这里就需要使用args.l
```

输出结果

```bash
# 查看帮助
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -h
usage: main.py [-h] [-l LIST]

optional arguments:
  -h, --help            show this help message and exit
  -l LIST, --list LIST  show something

# 不加参数时执行，看看他的值是什么
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py   
Namespace(list=None)
{'list': None}
None


# 加上参数执行，看看他的值是什么
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -l pro
Namespace(list='pro')
{'list': 'pro'}
pro
```

:::

#### （2）指定参数值显示名称

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import argparse

# 实例化对象
parser = argparse.ArgumentParser()

# 添加参数,短选项或长选项至少有一个，help参数可选
parser.add_argument("-l", "--list", help="show something")
parser.add_argument("-p", "--port", help="show something", metavar="[port]")

# 解析参数
args = parser.parse_args()

# 获取参数的值
print(args)
print(args.list)
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -h
usage: main.py [-h] [-l LIST] [-p [port]]              

optional arguments:
  -h, --help            show this help message and exit
  -l LIST, --list LIST  show something     # 这是默认的metavar
  -p [port], --port [port]                 # 这里的[port]是我们自定义的显示字符串
                        show something
```

:::

####   （3）指定参数变量名称

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import argparse

# 实例化对象
parser = argparse.ArgumentParser()

# 添加参数,短选项或长选项至少有一个，help参数可选
parser.add_argument("-H", "--host", help="show something")
parser.add_argument("-p", "--port", help="show something", dest="ssh_port")

# 解析参数
args = parser.parse_args()

# 获取参数的值
print(args)
print(args.host)
print(args.ssh_port)    # 这里需要使用dest指定的变量明来访问
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -h                  
usage: main.py [-h] [-H HOST] [-p SSH_PORT]            
                                                       
optional arguments:                                    
  -h, --help            show this help message and exit
  -H HOST, --host HOST  show something                 
  -p SSH_PORT, --port SSH_PORT                  # 使用了dest后，可以发现显示名称也变了，可以通过metavar来指定新的显示名称
                        show something
                        
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -H 127.0.0.1 -p 8080
Namespace(host='127.0.0.1', ssh_port='8080')   # 这里可以看到，变量明并不是port了，而是ssh_port
127.0.0.1                                       
8080
```

:::

####   （4）指定参数默认值

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import argparse

# 实例化对象
parser = argparse.ArgumentParser()

# 添加参数,短选项或长选项至少有一个，help参数可选
parser.add_argument("-l", "--list", help="show something", default="pro")

# 如果设置为argparse.SUPPRESS，并且命令行没有提供参数，则不会添加到命名空间中
parser.add_argument("-H", "--host", help="show something", default=argparse.SUPPRESS)

# 解析参数
args = parser.parse_args()

# 获取参数的值
print(args)
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -h
usage: main.py [-h] [-l LIST] [-H HOST]                
                                                       
optional arguments:                                    
  -h, --help            show this help message and exit
  -l LIST, --list LIST  show something                 
  -H HOST, --host HOST  show something

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -l dev 
Namespace(list='dev')

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -l dev -H 127.0.0.1
Namespace(host='127.0.0.1', list='dev')
```

:::

####   （5）对参数值进行类型转换

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import argparse

# 实例化对象
parser = argparse.ArgumentParser()

# 添加参数,短选项或长选项至少有一个，help参数可选
parser.add_argument("-n", help="show something")  # 默认为str类型
parser.add_argument("-m", help="show something", type=int)  # 转为int类型
parser.add_argument("-x", help="show something", type=lambda x: x * 2)  # 自定义类型转换函数

# 解析参数
args = parser.parse_args()

# 获取参数的值
print(args)
print(type(args.n))
print(type(args.m))
print(type(args.x))
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py                     
Namespace(m=None, n=None, x=None)
<class 'NoneType'>
<class 'NoneType'>
<class 'NoneType'>

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -n 100 -m 200 -x abc
Namespace(m=200, n='100', x='abcabc')  # 这里abc变成了双份
<class 'str'>
<class 'int'>
<class 'str'>
```

不建议将 [`bool()`](https://docs.python.org/zh-cn/3/library/functions.html#bool) 函数用作类型转换器，我们会在后面讲解**布尔类型参数**

:::

#### （6）必传类型参数

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import argparse

# 实例化对象
parser = argparse.ArgumentParser()

# 添加参数,短选项或长选项至少有一个，help参数可选
parser.add_argument("-n", "--number", help="show something", required=True)
# 解析参数
args = parser.parse_args()

# 获取参数的值
print(args)
print(type(args.number))
```

输出结果

```bash
# 不传参数会报错
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py       
usage: main.py [-h] -n NUMBER
main.py: error: the following arguments are required: -n/--number

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -n 100
Namespace(number='100')
<class 'str'>                       
```

:::

####   （7）限制参数可选值

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import argparse

# 实例化对象
parser = argparse.ArgumentParser()

# 添加参数,短选项或长选项至少有一个，help参数可选
parser.add_argument("-e", "--env", help="show something", required=True, choices=["dev", "fat", "prod"])
# 解析参数
args = parser.parse_args()

# 获取参数的值
print(args)
print(type(args.env))
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --env abc
usage: main.py [-h] -e {dev,fat,prod}
main.py: error: argument -e/--env: invalid choice: 'abc' (choose from 'dev', 'fat', 'prod')

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --env prod
Namespace(env='prod')
<class 'str'>
```

:::

####   （8）布尔类型参数

在这个例子中我们将仿写`-h, --help  show this help message and exit`这个选项

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import argparse

# 实例化对象
parser = argparse.ArgumentParser()

# 添加参数,核心代码action="store_true"
parser.add_argument("-l", "--list", help="show something", action="store_true")

# 解析参数
args = parser.parse_args()

# 获取参数的值
print(args.list)
```

输出结果

```bash
# 查看帮助
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -h
usage: main.py [-h] [-l]                     
                                             
optional arguments:                          
  -h, --help  show this help message and exit
  -l, --list  show something

# 不写参数，值是False
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py   
False

# 加上参数，值为True
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -l
True
```

> 若不想使用True或False作为值，可以将代码改为如下形式：
>
> ```
> parser.add_argument("-l", "--list", help="show something", action="store_const", const="100")
> ```

:::

####   （9）参数值个数的骚操作

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import argparse

# 实例化对象
parser = argparse.ArgumentParser()

# 添加参数,短选项或长选项至少有一个，help参数可选
parser.add_argument("-m", help="show something", nargs=2)
parser.add_argument("-n", help="show something", nargs="?")
parser.add_argument("-x", help="show something", nargs="*")
parser.add_argument("-y", help="show something", nargs="+")
# 解析参数
args = parser.parse_args()

# 获取参数的值
print(args)
print(type(args.n))
print(type(args.m))
print(type(args.x))
print(type(args.y))
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -h
usage: main.py [-h] [-m M M] [-n [N]] [-x [X [X ...]]] [-y Y [Y ...]]

optional arguments:
  -h, --help      show this help message and exit
  -m M M          show something
  -n [N]          show something
  -x [X [X ...]]  show something
  -y Y [Y ...]    show something

# 若传-m，则必须传递2个值
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -m  
usage: main.py [-h] [-m M M] [-n [N]] [-x [X [X ...]]] [-y Y [Y ...]]
main.py: error: argument -m: expected 2 arguments

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -m 1
usage: main.py [-h] [-m M M] [-n [N]] [-x [X [X ...]]] [-y Y [Y ...]]
main.py: error: argument -m: expected 2 arguments

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -m 1 2
Namespace(m=['1', '2'], n=None, x=None, y=None)
<class 'NoneType'>
<class 'list'>
<class 'NoneType'>
<class 'NoneType'>

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -m 1 2 3
usage: main.py [-h] [-m M M] [-n [N]] [-x [X [X ...]]] [-y Y [Y ...]]
main.py: error: unrecognized arguments: 3

# 若传-n，则必须传递0个值或1个值
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -n      
Namespace(m=None, n=None, x=None, y=None)
<class 'NoneType'>
<class 'NoneType'>
<class 'NoneType'>
<class 'NoneType'>

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -n 1
Namespace(m=None, n='1', x=None, y=None)
<class 'str'>
<class 'NoneType'>
<class 'NoneType'>
<class 'NoneType'>

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -n 1 2
usage: main.py [-h] [-m M M] [-n [N]] [-x [X [X ...]]] [-y Y [Y ...]]
main.py: error: unrecognized arguments: 2

# 若传-x，则可以传递任意个值（包含0个）
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -x
Namespace(m=None, n=None, x=[], y=None)
<class 'NoneType'>
<class 'NoneType'>
<class 'list'>
<class 'NoneType'>                              

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -x 1
Namespace(m=None, n=None, x=['1'], y=None)
<class 'NoneType'>
<class 'NoneType'>
<class 'list'>
<class 'NoneType'>                              

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -x 1 2
Namespace(m=None, n=None, x=['1', '2'], y=None)
<class 'NoneType'>
<class 'NoneType'>
<class 'list'>
<class 'NoneType'>

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -x 1 2 3
Namespace(m=None, n=None, x=['1', '2', '3'], y=None)
<class 'NoneType'>
<class 'NoneType'>
<class 'list'>
<class 'NoneType'>

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -x 1 2 3 
Namespace(m=None, n=None, x=['1', '2', '3'], y=None)
<class 'NoneType'>
<class 'NoneType'>
<class 'list'>
<class 'NoneType'>

# 若传-y，则可以传递任意个值（不包含0个）
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -y
usage: main.py [-h] [-m M M] [-n [N]] [-x [X [X ...]]] [-y Y [Y ...]]
main.py: error: argument -y: expected at least one argument

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -y 1
Namespace(m=None, n=None, x=None, y=['1'])
<class 'NoneType'>
<class 'NoneType'>
<class 'NoneType'>
<class 'list'>

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -y 1 2
Namespace(m=None, n=None, x=None, y=['1', '2'])
<class 'NoneType'>
<class 'NoneType'>
<class 'NoneType'>
<class 'list'>

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -y 1 2 3
Namespace(m=None, n=None, x=None, y=['1', '2', '3'])
<class 'NoneType'>
<class 'NoneType'>
<class 'NoneType'>
<class 'list'>
```

:::

####   （10）参数分组

文档：[https://docs.python.org/zh-cn/3/library/argparse.html#argument-groups](https://docs.python.org/zh-cn/3/library/argparse.html#argument-groups)

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import argparse

# 实例化对象
parser = argparse.ArgumentParser()

group = parser.add_argument_group('secret arguments (required)')
group.add_argument('--secret-id', help='secret id', metavar="ID")
group.add_argument('--secret-key', help='secret key', metavar="KEY")

# 解析参数
args = parser.parse_args()

# 获取参数的值
print(args.list)
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -h
usage: main.py [-h] [--secret-id ID] [--secret-key KEY]

optional arguments:
  -h, --help        show this help message and exit

secret arguments (required):
  --secret-id ID    secret id
  --secret-key KEY  secret key

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --secret-id abc --secret-key def
Namespace(secret_id='abc', secret_key='def')
```

:::

####   （11）互斥参数

文档：[https://docs.python.org/zh-cn/3/library/argparse.html#mutual-exclusion](https://docs.python.org/zh-cn/3/library/argparse.html#mutual-exclusion)

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import argparse

# 实例化对象
parser = argparse.ArgumentParser()

# 互斥参数
group = parser.add_mutually_exclusive_group()  # 添加一个互斥组，组内的参数都是互斥的
group.add_argument('--car', action='store_true')
group.add_argument('--bus', action='store_true')
group.add_argument('--bike', action='store_true')

# 解析参数
args = parser.parse_args()

# 获取参数的值
print(args)
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --car
Namespace(bike=False, bus=False, car=True)

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --bus
Namespace(bike=False, bus=True, car=False)

(venv) C:\Users\Administrator\Desktop\tutorials>
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --bus --car
usage: main.py [-h] [--car | --bus | --bike]
main.py: error: argument --car: not allowed with argument --bus
```

:::

<br />

### 格式化帮助信息

文档：[https://docs.python.org/zh-cn/3/library/argparse.html#argumentparser-objects](https://docs.python.org/zh-cn/3/library/argparse.html#argumentparser-objects)

####   （1）理清帮助信息结构

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import argparse

# 实例化对象
parser = argparse.ArgumentParser()

# 添加参数,短选项或长选项至少有一个，help参数可选
parser.add_argument("-l", "--list", help="show something")

# 解析参数
args = parser.parse_args()

# 获取参数的值
print(args)
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -h
# => 这一部分对应usage属性
# 其中main.py为python文件名，这是一个动态值，对应属性prog，在其他地方可以使用%(prog)s来引用，prog的默认值为 os.path.basename(sys.argv[0])
usage: main.py [-h] [-l LIST]                             

# 这里的空白对应description属性，在后面我们会自定义这一部分

# argparse会自动给我们添加2个分组，存储在parser._action_groups中，list数据结构
#   positional arguments 位置参数分组
#   optional arguments   可选参数分组
# 因为我们在代码中添加了可选参数，所以自动将可选参数分组给显示出来了
# 这里的optional arguments就是可选参数分组的名称
optional arguments:                                    
  -h, --help            show this help message and exit
  -l LIST, --list LIST  show something

# 下面的空白对应epilog属性，默认为空，所以不显示
```

:::

####   （2）自定义`usage`

默认值：`usage: main.py [-h] [-l LIST]   ` 

自定义：`usage: main.py [options]`

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import argparse

# 实例化对象
parser = argparse.ArgumentParser(
    usage='%(prog)s [options]'
)

# 也可以通过下面的方式定义
# parser.usage = '%(prog)s [options]'

# 添加参数,短选项或长选项至少有一个，help参数可选
parser.add_argument("-l", "--list", help="show something")

# 解析参数
args = parser.parse_args()

# 获取参数的值
print(args)
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -h
usage: main.py [options]

optional arguments:
  -h, --help            show this help message and exit
  -l LIST, --list LIST  show something
```

:::

####   （3）自定义`description`和`epilog`

这里以`description`举例，`epilog`使用方法也是一样的

在最后的示例中使用`description`和`epilog`看一下最终效果

::: details （1）自定义单行description

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import argparse

# 实例化对象
parser = argparse.ArgumentParser(
    usage="%(prog)s [options]",
    description="这里是描述信息",
)

# 也可以通过下面的方式定义
# parser.description = "这里是描述信息"

# 添加参数,短选项或长选项至少有一个，help参数可选
parser.add_argument("-l", "--list", help="show something")

# 解析参数
args = parser.parse_args()

# 获取参数的值
print(args)
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -h
usage: main.py [options]

这里是描述信息

optional arguments:
  -h, --help            show this help message and exit
  -l LIST, --list LIST  show something
```

:::

::: details （2）自定义多行description：默认会把空白和换行符删掉

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import argparse

# 实例化对象
parser = argparse.ArgumentParser(
    usage='%(prog)s [options]',
    formatter_class=argparse.RawDescriptionHelpFormatter,
    description='''
        jq is a tool for processing JSON inputs, applying the
        given filter to its JSON text inputs and producing the
        filter's results as JSON on standard output.
        The simplest filter is ., which is the identity filter,
        copying jq's input to its output unmodified (except for
        formatting).
        For more advanced filters see the jq(1) manpage ("man jq")
        and/or https://stedolan.github.io/jq
    '''
)

# 解析参数
args = parser.parse_args()

# 获取参数的值
print(args)
```

输出结果

```bash
# 可以对比一下代码中的第一行结尾单词是the，而输出结果第一行结尾单词是JSON
# 默认情况下会把空白和换行符删掉，然后根据argparse自己的方式换行

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -h
usage: main.py [options]

jq is a tool for processing JSON inputs, applying the given filter to its JSON
text inputs and producing the filter's results as JSON on standard output. The
simplest filter is ., which is the identity filter, copying jq's input to its
output unmodified (except for formatting). For more advanced filters see the
jq(1) manpage ("man jq") and/or https://stedolan.github.io/jq

optional arguments:
  -h, --help  show this help message and exit
```

:::

::: details （3）自定义多行description：指定使用代码中原始格式

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import argparse

# 实例化对象
parser = argparse.ArgumentParser(
    usage='%(prog)s [options]',
    formatter_class=argparse.RawDescriptionHelpFormatter,         # 添加这行
    description='''
        jq is a tool for processing JSON inputs, applying the
        given filter to its JSON text inputs and producing the
        filter's results as JSON on standard output.
        The simplest filter is ., which is the identity filter,
        copying jq's input to its output unmodified (except for
        formatting).
        For more advanced filters see the jq(1) manpage ("man jq")
        and/or https://stedolan.github.io/jq
    '''
)

# 格式化描述信息
# parser.description = '\n'.join(list(map(lambda s: s.replace(" ", "", 8), parser.description.split("\n"))))

# 解析参数
args = parser.parse_args()

# 获取参数的值
print(args)
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -h
usage: main.py [options]

        jq is a tool for processing JSON inputs, applying the  
        given filter to its JSON text inputs and producing the 
        filter's results as JSON on standard output.
        The simplest filter is ., which is the identity filter,
        copying jq's input to its output unmodified (except for
        formatting).
        For more advanced filters see the jq(1) manpage ("man jq")
        and/or https://stedolan.github.io/jq


optional arguments:
  -h, --help  show this help message and exit
```

> 可以看到与代码保持一致了，但是也会有一个新的问题，这看起来貌似不那么美观了，我想让他行前面的空格删掉，该如何做？
>
> 将代码中 `# 格式化描述信息`注释打开，再看一下效果，很完美

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -h
usage: main.py [options]

jq is a tool for processing JSON inputs, applying the
given filter to its JSON text inputs and producing the
filter's results as JSON on standard output.
The simplest filter is ., which is the identity filter,
copying jq's input to its output unmodified (except for
formatting).
For more advanced filters see the jq(1) manpage ("man jq")
and/or https://stedolan.github.io/jq

optional arguments:
  -h, --help  show this help message and exit
```

:::

::: details （4）同时使用description和epilog看一下最终效果

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import argparse

# 实例化对象
parser = argparse.ArgumentParser(
    usage='%(prog)s [options]',
    formatter_class=argparse.RawDescriptionHelpFormatter,
    description='''
        jq is a tool for processing JSON inputs, applying the
        given filter to its JSON text inputs and producing the
        filter's results as JSON on standard output.
        The simplest filter is ., which is the identity filter,
        copying jq's input to its output unmodified (except for
        formatting).
        For more advanced filters see the jq(1) manpage ("man jq")
        and/or https://stedolan.github.io/jq''',
    epilog='''
        ENVIRONMENT:
          HTTP_PROXY    proxy for HTTP requests; complete URL or HOST[:PORT]
                        used for HTTPS requests if HTTPS_PROXY undefined
          HTTPS_PROXY   proxy for HTTPS requests; complete URL or HOST[:PORT]
          NO_PROXY      comma-separated list of hosts to exclude from proxy'''
)

# 格式化描述信息
parser.description = '\n'.join(list(map(lambda s: s.replace(" ", "", 8), parser.description.split("\n"))))
parser.epilog = '\n'.join(list(map(lambda s: s.replace(" ", "", 8), parser.epilog.split("\n"))))

# 解析参数
args = parser.parse_args()

# 获取参数的值
print(args)
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -h
usage: main.py [options]                                             
                                                                     
jq is a tool for processing JSON inputs, applying the                
given filter to its JSON text inputs and producing the               
filter's results as JSON on standard output.                         
The simplest filter is ., which is the identity filter,              
copying jq's input to its output unmodified (except for              
formatting).                                                         
For more advanced filters see the jq(1) manpage ("man jq")           
and/or https://stedolan.github.io/jq                                 
                                                                     
optional arguments:                                                  
  -h, --help  show this help message and exit                        
                                                                     
ENVIRONMENT:                                                         
  HTTP_PROXY    proxy for HTTP requests; complete URL or HOST[:PORT] 
                used for HTTPS requests if HTTPS_PROXY undefined     
  HTTPS_PROXY   proxy for HTTPS requests; complete URL or HOST[:PORT]
  NO_PROXY      comma-separated list of hosts to exclude from proxy 
```

:::

####   （4）修改默认的分组名称

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import argparse

# 实例化对象
parser = argparse.ArgumentParser()

# 查看默认的分组
print("# => 查看默认分组")
print(parser._action_groups)
print(parser._action_groups[0].title)
print(parser._action_groups[1].title)
print()

# 修改默认分组
parser._action_groups[1].title = "General Options"
print()

# 解析参数
args = parser.parse_args()

# 获取参数的值
print(args)
```

输出结果

```bash
# 查看
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py   
# => 查看默认分组
[<argparse._ArgumentGroup object at 0x000002767993D988>, <argparse._ArgumentGroup object at 0x000002767993AEC8>]
positional arguments
optional arguments


Namespace()

# 查看帮助信息
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -h
# => 查看默认分组
[<argparse._ArgumentGroup object at 0x0000024E51F1D988>, <argparse._ArgumentGroup object at 0x0000024E51F1AEC8>]
positional arguments
optional arguments


usage: main.py [-h]

General Options:           # 这里可以看到已经被修改了
  -h, --help  show this help message and exit

```

:::

####   （5）调整参数顺序

默认情况下按照代码中添加参数的顺序排序，这可能不太符合我们的意愿

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import argparse

# 实例化对象
parser = argparse.ArgumentParser()

# 添加参数,短选项或长选项至少有一个，help参数可选
parser.add_argument("-l", "--list", help="show something")
parser.add_argument("-p", "--port", help="show something")


# 方式一:调整选项顺序
# g1 = parser._action_groups[1]._group_actions
# g1[0], g1[1] = g1[1], g1[0]


# 方式二:调整选项顺序函数, index1和index2互换位置
# 这只是一个示例函数,在真正用的时候可以将函数改的更加友好使用
def change_option_position(parser, group_name, index1, index2):
    for group in parser._action_groups:
        if group.title == group_name:
            actions = group._group_actions
            actions[index1], actions[index2] = actions[index2], actions[index1]
            return


change_option_position(parser, "optional arguments", 0, 1)
change_option_position(parser, "optional arguments", 1, 2)

# 解析参数
args = parser.parse_args()

# 获取参数的值
print(args)
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -h
usage: main.py [-h] [-l LIST] [-p PORT]

optional arguments:
  -l LIST, --list LIST  show something
  -p PORT, --port PORT  show something
  -h, --help            show this help message and exit

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -l a -p 80
Namespace(list='a', port='80')
```

:::

<br />

### 子命令
