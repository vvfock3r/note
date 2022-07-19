# Python实用模块

## 参考资料

* **Awesome Python**

  Github：[https://github.com/vinta/awesome-python](https://github.com/vinta/awesome-python)
  
* **HelloGitHub**

  Github：[https://github.com/HelloGitHub-Team/Article](https://github.com/HelloGitHub-Team/Article)

<br />

## 分组目录

### 默认


<br />

### 命令行

参考：[https://github.com/vinta/awesome-python#command-line-interface-development](https://github.com/vinta/awesome-python#command-line-interface-development)

<table>
    <thead>
    <tr>
        <th style="width: 20%;">分类说明</th>
        <th style="width: 20%;">模块名称</th>
        <th style="width: 20%;">测试版本</th>
        <th style="width: 20%;">应用举例</th>
        <th style="width: 20%;">备注</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>命令行界面</td>
        <td><a href="#argparse" style="text-decoration:none;">argparse</a></td>
        <td><li><code>Python 3.10.5</code></li></td>        
        <td><code>yum</code>/<code>dnf</code></td>
        <td>标准库</td>
    </tr>
    <tr>
        <td></td>
        <td><a href="#click" style="text-decoration:none;">click</a></td>
        <td><li><code>Python 3.10.5</code></li><li><code>Click 8.1.3</code></li></td>
        <td><code>flask</code></td>
        <td>推荐使用</td>
    </tr>        
    <tr>
        <td>进度条</td>
        <td>tqdm</td>
        <td></td>
        <td>第三方库</td>
        <td></td>
    </tr>
    <tr>
        <td>彩色终端</td>
        <td>colorama</td>
        <td></td>
        <td>第三方库</td>
        <td>ipython</td>
    </tr>
    <tr>
        <td>字符图形</td>
        <td>asciimatics</td>
        <td></td>
        <td>第三方库</td>
        <td>ipython</td>
    </tr>
    <tr>
        <td>字符表格</td>
        <td>prettytable</td>
        <td></td>
        <td>第三方库</td>
        <td></td>
    </tr>
    <tr>
        <td>交互式命令行</td>
        <td>prompt_toolkit</td>
        <td></td>
        <td>第三方库</td>
        <td>ipython</td>
    </tr>
    </tbody>
</table>

<br />

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

#### （12）Action

内置的Action类：[https://docs.python.org/zh-cn/3/library/argparse.html#action](https://docs.python.org/zh-cn/3/library/argparse.html#action)

自定义Action类：[https://docs.python.org/zh-cn/3/library/argparse.html#action-classes](https://docs.python.org/zh-cn/3/library/argparse.html#action-classes)

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import argparse


class UpperAction(argparse.Action):
    # __init__功能：在这里是限制不能使用nargs参数
    # __init__解释：(1) 这里并没有写全所有参数，而是就仅仅写了用到的参数，其他参数用**kwargs代替
    #              (2) 因为参数又有默认值，所以前面的参数(option_strings和dest)也就必须写上
    #              (3) 更新改了required属性
    def __init__(self, option_strings, dest, nargs=None, **kwargs):
        if nargs is not None:
            raise ValueError("nargs not allowed")
        kwargs.update({"required": True})
        super().__init__(option_strings, dest, **kwargs)

    # 这里是重头戏
    def __call__(self, parser, namespace, values, option_string=None):
        setattr(namespace, self.dest, values.upper())


# 实例化对象
parser = argparse.ArgumentParser()

# 添加选项
parser.add_argument("-l", "--list", help="list something", action=UpperAction, required=False)

# 解析
args = parser.parse_args()

# 获取参数的值
print(args)
```

输出结果

```bash
# 查看帮助
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -h
usage: main.py [-h] -l LIST                            
                                                       
optional arguments:                                    
  -h, --help            show this help message and exit
  -l LIST, --list LIST  list something                 

# 不带参数执行,提示-l/--list是必选参数
# 虽然在代码中设置了required=False，但是在UpperAction中强制改为required=True
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py
usage: main.py [-h] -l LIST
main.py: error: the following arguments are required: -l/--list

# Action效果，对输入进行大写转换
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -l abcdef
Namespace(list='ABCDEF')
```

> 在Action中也可以获取其他参数和值，但是有一个前提是：该参数在Action所在参数之前调用，即
>
> `python main.py -f a.txt -l abc`，-l所在的Action能获取`a.txt`
>
> `python main.py -l abc -f a.txt`，-l所在的Action不能获取`a.txt`，此时可以通过sys.argv来获取

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

####   （4）调整参数顺序（黑科技）

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

####   （5）修改默认的分组名称（黑科技）

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

#### （6）总结："终极大法"（黑科技）

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import argparse


def format_group_order(parser: argparse.ArgumentParser, items: list):
    """调整组顺序，items数据结构为: [ (组名1,放到哪个索引上), (组名2,放到哪个索引上) ]
    索引从1开始
    """

    for group_name, index in items:
        for _index, group in enumerate(parser._action_groups.copy()):
            if group.title == group_name:
                # 删除组并重新添加
                del parser._action_groups[_index]
                parser._action_groups.insert(index, group)


def format_param_order(parser: argparse.ArgumentParser, items: list):
    """调整参数顺序，items数据结构为: [ (组名1, 参数1, 放到哪个索引上), (组名2, 参数2, 放到哪个索引上) ]"""

    for group_name, option_name, index in items:
        # 先找到组
        for group in parser._action_groups.copy():
            if group.title == group_name:
                # 在组内找到参数
                for _index, action in enumerate(group._group_actions.copy()):
                    if option_name in action.option_strings:
                        # 删除参数,并重新添加
                        del group._group_actions[_index]
                        group._group_actions.insert(index, action)


def format_help_string(parser: argparse.ArgumentParser, items: list):
    '''使用字符串替换的方式调整输出内容'''

    # 将原始的format_help函数备份一下,后面会用到
    parser._original_format_help = parser.format_help

    def wrapper():
        ret = parser._original_format_help()
        for old, new in items:
            ret = ret.replace(old, new)
        return ret

    parser.format_help = wrapper


def my_format():
    # 调整组顺序
    format_group_order(parser, [("Required Options", 1)])

    # 调整参数顺序
    format_param_order(parser, [("optional arguments", "--help", 2)])

    # 字符串替换
    format_help_string(parser, [
        ("optional arguments", "Optional Options"),
        ("{add,rm,ls}\n", "\r"),
        ("  add  ", "add    "),
        ("  rm  ", "rm    "),
        ("  ls  ", "ls    "),
    ])  # 替换帮助文档字符串

    # 子命令替换
    format_param_order(parser_add, [("optional arguments", "--help", 2)])
    format_help_string(parser_add, [
        ("optional arguments", "Optional Options"),
    ])


# 实例化对象
parser = argparse.ArgumentParser()

# 添加子命令和分组
subprocess = parser.add_subparsers(title="Subcommands")
parser_add = subprocess.add_parser("add", help="add something")  # 添加子命令
parser_rm = subprocess.add_parser("rm", help="rm something")  # 添加子命令
parser_ls = subprocess.add_parser("ls", help="ls something")  # 添加子命令
parser_required = parser.add_argument_group("Required Options")  # 添加分组

# 添加参数,短选项或长选项至少有一个，help参数可选
parser.add_argument("-v", "--version", help="display the version of %(prog)s and exit", action="store_true")
parser.add_argument("-q", "--quit", help="quiet (no output)", action="store_true")

parser_add.add_argument("-p", "--port", help="port info")
parser_required.add_argument("-H", "--host", help="host info")

# 调整显示内容
my_format()

# 解析参数
args = parser.parse_args()

# 获取参数的值
print(args)

```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -h
usage: main.py [-h] [-v] [-q] [-H HOST] {add,rm,ls} ...        

Required Options:
  -H HOST, --host HOST  host info

Optional Options:
  -v, --version         display the version of main.py and exit
  -q, --quit            quiet (no output)
  -h, --help            show this help message and exit        

Subcommands:
  add                   add something
  rm                    rm something
  ls                    ls something

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py add -h 
usage: main.py add [-h] [-p PORT]

Optional Options:
  -p PORT, --port PORT  port info
  -h, --help            show this help message and exit
```

:::



<br />

### 子命令

文档：[https://docs.python.org/zh-cn/3/library/argparse.html#sub-commands](https://docs.python.org/zh-cn/3/library/argparse.html#sub-commands)

#### （1）基础示例

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import argparse

# 实例化对象
parser = argparse.ArgumentParser()

# 添加子解析器
# (1) title会影响分组, 如果不写会放到【位置参数】分组下
# (2) parser.add_subparsers不能调用2次，会报错
subparsers = parser.add_subparsers(title="Management Commands")

# 添加2个子命令
parser_add = subparsers.add_parser("add", help="add something")
parser_remove = subparsers.add_parser("remove", help="remove something")

# add子命令添加选项
parser_add.add_argument("--name", help="container name")

# 解析参数
args = parser.parse_args()

# 获取参数的值
print(args)
```

输出结果

```bash
# 总帮助文档
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -h
usage: main.py [-h] {add,remove} ...

optional arguments:
  -h, --help    show this help message and exit

Management Commands:                # 这一行是上面的title属性的值
  {add,remove}                      # 这一行是argparse给我们自动添加的, {add,remove}对应的属性为metavar
    add         add something
    remove      remove something

# 子命令帮助文档
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py add -h
usage: main.py add [-h] [--name NAME]

optional arguments:
  -h, --help   show this help message and exit
  --name NAME  container name
```

:::

#### （2）添加help和description

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import argparse

# 实例化对象
parser = argparse.ArgumentParser()

# 添加子解析器
# (1) title会影响分组, 如果不写会放到【位置参数】分组下
# (2) parser.add_subparsers不能调用2次，会报错
subparsers = parser.add_subparsers(
    title="Management Commands",
    help="这里是help信息",
    description="这里是description信息"
)

# 添加2个子命令
parser_add = subparsers.add_parser("add", help="add something")
parser_remove = subparsers.add_parser("remove", help="remove something")

# add子命令添加选项
parser_add.add_argument("--name", help="container name")

# 解析参数
args = parser.parse_args()

# 获取参数的值
print(args)
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -h
usage: main.py [-h] {add,remove} ...

optional arguments:
  -h, --help    show this help message and exit

Management Commands:
  这里是description信息

  {add,remove}  这里是help信息
    add         add something
    remove      remove something
```

:::

#### （3）删除 {add,remove} 那一整行（黑科技）

官方貌似没有提供相关的参数，所以这里需要使用一点黑科技

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import argparse

# 实例化对象
parser = argparse.ArgumentParser()

subparsers = parser.add_subparsers(
    title="Management Commands",
)

# 添加2个子命令
parser_add = subparsers.add_parser("add", help="add something")
parser_remove = subparsers.add_parser("remove", help="remove something")

# add子命令添加选项
parser_add.add_argument("--name", help="container name")


# print(parser._action_groups[2])  # 这个分组就是我们要修改的分组
# print(parser._get_formatter())   # 默认的格式化类 argparse.HelpFormatter

# 定义一个新的format_help函数
def format_help():
    return parser._format_help() \
        .replace('''{add,remove}\n''', "\r") \
        .replace("  add  ", "add    ") \
        .replace("  remove  ", "remove    ")


parser._format_help = parser.format_help  # 将旧的format_help函数备份一下
parser.format_help = format_help  # 使用新的函数代替format_help

# 解析参数
args = parser.parse_args()

# 获取参数的值
print(args)
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -h
usage: main.py [-h] {add,remove} ...           
                                               
optional arguments:                            
  -h, --help    show this help message and exit
                                               
Management Commands:                           
  add           add something                  
  remove        remove something
  
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py add -h 
usage: main.py add [-h] [--name NAME]         
                                              
optional arguments:                           
  -h, --help   show this help message and exit
  --name NAME  container name
  
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py add --name demo
Namespace(name='demo')
```

:::

#### （4）子命令别名

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import argparse

# 实例化对象
parser = argparse.ArgumentParser()

subparsers = parser.add_subparsers(
    title="Management Commands",
)

# 添加2个子命令
parser_add = subparsers.add_parser("add", help="add something", aliases=['a, create'])
parser_remove = subparsers.add_parser("remove", help="remove something")

# add子命令添加选项
parser_add.add_argument("--name", help="container name")

# 解析参数
args = parser.parse_args()

# 获取参数的值
print(args)
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -h    
usage: main.py [-h] {add,a, create,remove} ...         
                                                       
optional arguments:                                    
  -h, --help            show this help message and exit
                                                       
Management Commands:
  {add,a, create,remove}
    add (a, create)     add something
  remove                remove something
```

:::

### 实战

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# --*--coding:utf-8--*--

"""
添加或删除防火墙规则，适用于腾讯云轻量应用服务器
SDK文档：https://cloud.tencent.com/document/product/1207/47578
"""

import sys
import json
import argparse
from typing import Optional, Tuple, Union, Dict

import httpx
from tencentcloud.common.credential import Credential
from tencentcloud.common.exception.tencent_cloud_sdk_exception import (
    TencentCloudSDKException,
)
from tencentcloud.lighthouse.v20200324 import lighthouse_client, models

__version__ = "v0.0.1"


def get_internet_ip() -> Union[str, None]:
    """获取当前外网出口IP"""

    urls = ["https://api-ipv4.ip.sb/ip"]
    headers = {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36"
    }
    for url in urls:
        r = httpx.get(url, headers=headers, timeout=30)
        if r.status_code == 200:
            return r.text.strip("\n")

    return None


def add_firewall_rule(
    cred: Credential,
    instanceId: str,
    protocol: str,
    port: Optional[str] = None,
    source: Optional[str] = None,
    action: Optional[str] = None,
    description: Optional[str] = None,
) -> Tuple[bool, Dict]:
    # 先执行查询,description不计数
    ok, resp = ls_firewall_rule(cred, instanceId, protocol, port, source, action, None)

    # 查询失败直接返回
    if not ok:
        return ok, resp

    # 如果规则已经存在直接返回
    rules_matched = resp["FirewallRuleSet"]
    if len(rules_matched) >= 1:
        return True, {
            "code": "ok",
            "message": "防火墙规则 `[('{protocol}', '{port}', '{source}', '{action}')]` 已经存在。".format(
                protocol=protocol, port=port, source=source, action=action
            ),
            "requestId": resp["RequestId"],
        }

    # 添加规则
    try:
        # 实例化客户端
        client = lighthouse_client.LighthouseClient(cred, "ap-hongkong")

        # 生成请求
        req = models.CreateFirewallRulesRequest()

        # 填充请求参数
        params = {
            "InstanceId": instanceId,
            "FirewallRules": [
                {
                    "Protocol": protocol,
                    "Port": port,
                    "CidrBlock": source,
                    "Action": action,
                    "FirewallRuleDescription": description,
                }
            ],
        }
        req.from_json_string(json.dumps(params))

        # 发送请求
        resp = client.CreateFirewallRules(req)

        return True, {
            "code": "ok",
            "message": "Add 1 rules",
            "requestId": resp.RequestId,
        }
    except TencentCloudSDKException as err:
        return False, {
            "code": err.code,
            "message": err.message,
            "requestId": err.requestId,
        }


def ls_firewall_rule(
    cred: Credential,
    instanceId: str,
    protocol: str,
    port: Optional[str] = None,
    source: Optional[str] = None,
    action: Optional[str] = None,
    description: Optional[str] = None,
) -> Tuple[bool, Dict]:
    try:
        # 实例化客户端
        client = lighthouse_client.LighthouseClient(cred, "ap-hongkong")

        # 生成请求
        req = models.DescribeFirewallRulesRequest()

        # 填充请求参数
        params = {"InstanceId": instanceId, "Limit": 100}
        req.from_json_string(json.dumps(params))

        # 发送请求
        resp = client.DescribeFirewallRules(req)
        resp = json.loads(resp.to_json_string())

        # 筛选
        if protocol is not None:
            resp["FirewallRuleSet"] = list(
                filter(lambda x: x.get("Protocol") == protocol, resp["FirewallRuleSet"])
            )
        if port is not None:
            resp["FirewallRuleSet"] = list(
                filter(lambda x: x.get("Port") == port, resp["FirewallRuleSet"])
            )
        if source is not None:
            resp["FirewallRuleSet"] = list(
                filter(lambda x: x.get("CidrBlock") == source, resp["FirewallRuleSet"])
            )
        if action is not None:
            resp["FirewallRuleSet"] = list(
                filter(lambda x: x.get("Action") == action, resp["FirewallRuleSet"])
            )
        if description is not None:
            resp["FirewallRuleSet"] = list(
                filter(
                    lambda x: x.get("FirewallRuleDescription") == description,
                    resp["FirewallRuleSet"],
                )
            )

        return True, resp
    except TencentCloudSDKException as err:
        return False, {
            "code": err.code,
            "message": err.message,
            "requestId": err.requestId,
        }


# 删除接口和查询接口参数一致
def del_firewall_rule(
    cred: Credential,
    instanceId: str,
    protocol: str,
    port: Optional[str] = None,
    source: Optional[str] = None,
    action: Optional[str] = None,
    description: Optional[str] = None,
) -> Tuple[bool, Dict]:
    # 先执行查询
    ok, resp = ls_firewall_rule(
        cred, instanceId, protocol, port, source, action, description
    )

    # 查询失败直接返回
    if not ok:
        return ok, resp

    # 若没有匹配到规则
    rules_matched = resp["FirewallRuleSet"]
    if len(rules_matched) == 0:
        return ok, {
            "code": "ok",
            "message": "No rules matched",
            "requestId": resp["RequestId"],
        }

    # 再执行删除
    try:
        # 实例化客户端
        client = lighthouse_client.LighthouseClient(cred, "ap-hongkong")

        # 生成请求
        req = models.DeleteFirewallRulesRequest()

        # 填充请求参数
        params = {"InstanceId": instanceId, "FirewallRules": resp["FirewallRuleSet"]}
        req.from_json_string(json.dumps(params))

        # 发送请求
        resp = client.DeleteFirewallRules(req)

        return True, {
            "code": "ok",
            "message": "Deleted {} rules".format(len(rules_matched)),
            "requestId": resp.RequestId,
        }
    except TencentCloudSDKException as err:
        return False, {
            "code": err.code,
            "message": err.message,
            "requestId": err.requestId,
        }


class DynamicIpv4Action(argparse.Action):
    def __call__(self, parser, namespace, values, option_string=None):
        if values.strip() == "dynamic":  # 是否需要动态解析IPv4地址?
            values = get_internet_ip()
        setattr(namespace, self.dest, values)


class Cli:
    def make_command(self):
        self.root_command = argparse.ArgumentParser(
            usage="%(prog)s Command [options]",
            formatter_class=argparse.RawDescriptionHelpFormatter,
            description="""
                add or remove firewall rules for tencent cloud lighthouse
                source: https://github.com/vvfock3r/note/blob/main/scripts/firewall.py
            """,
        )  # 根解析器
        self.subparsers = self.root_command.add_subparsers(
            title="management commands"
        )  # 子命令解析器
        self.add_command = self.subparsers.add_parser("add", help="add firewall rule")
        self.del_command = self.subparsers.add_parser(
            "del", help="delete firewall rule"
        )
        self.ls_command = self.subparsers.add_parser("ls", help="ls firewall rule")

    def root_command_options(self):
        self.root_command.add_argument(
            "-v",
            "--version",
            help="show the version of %(prog)s and exit",
            action="version",
            version=__version__,
        )

    def add_command_options(self):
        # 格式化帮助信息/绑定运行函数
        self.add_command.description = "Add firewall rule"
        self.add_command.usage = "{} add [options]".format(
            self.root_command.format_usage().split()[1]
        )
        self.add_command.set_defaults(func=add_firewall_rule)

        # 必须参数的分组
        required_group = self.add_command.add_argument_group("required arguments")
        required_group.add_argument(
            "--secretId",
            required=True,
            metavar="Id",
            help="secret id for tencent cloud lighthouse",
        )
        required_group.add_argument(
            "--secretKey",
            required=True,
            metavar="Key",
            help="secret key for tencent cloud lighthouse",
        )
        required_group.add_argument(
            "--instanceId",
            required=True,
            metavar="Id",
            help="instance id for tencent cloud lighthouse",
        )
        required_group.add_argument(
            "--port",
            required=True,
            metavar="Port",
            help="port, port1,port2, port1-port3, ALL",
        )
        # 可选参数的分组
        self.add_command.add_argument(
            "--protocol",
            default="TCP",
            metavar="Protocol",
            choices=["TCP", "UDP", "ICMP", "ALL"],
            help="TCP, UDP, ICMP, ALL (default: %(default)s)",
        )
        self.add_command.add_argument(
            "--source",
            default="dynamic",
            metavar="Source",
            action=DynamicIpv4Action,
            help="subnet or ip (default: %(default)s)",
        )
        self.add_command.add_argument(
            "--action",
            default="ACCEPT",
            metavar="Action",
            help="ACCEPT, DROP (default: %(default)s)",
        )
        self.add_command.add_argument(
            "--description",
            default="[Created by Tencent SDK]",
            metavar="TXT",
            help="description (default: %(default)s)",
        )
        self.add_command.add_argument(
            "-q", "--quiet", help="do not print response messages", action="store_true"
        )

    def del_command_options(self):
        # 格式化帮助信息/绑定运行函数
        self.del_command.description = "Delete firewall rule"
        self.del_command.usage = "{} del [options]".format(
            self.root_command.format_usage().split()[1]
        )
        self.del_command.set_defaults(func=del_firewall_rule)

        # 必须参数的分组
        required_group = self.del_command.add_argument_group("required arguments")
        required_group.add_argument(
            "--secretId",
            required=True,
            metavar="Id",
            help="secret id for tencent cloud lighthouse",
        )
        required_group.add_argument(
            "--secretKey",
            required=True,
            metavar="Key",
            help="secret key for tencent cloud lighthouse",
        )
        required_group.add_argument(
            "--instanceId",
            required=True,
            metavar="Id",
            help="instance id for tencent cloud lighthouse",
        )

        # 可选参数的分组
        self.del_command.add_argument(
            "--port", metavar="Port", help="port, port1,port2, port1-port3, ALL"
        )
        self.del_command.add_argument(
            "--protocol",
            choices=["TCP", "UDP", "ICMP", "ALL"],
            metavar="Protocol",
            help="TCP, UDP, ICMP, ALL",
        )
        self.del_command.add_argument("--source", metavar="Source", help="subnet or ip")
        self.del_command.add_argument("--action", metavar="Action", help="ACCEPT, DROP")
        self.del_command.add_argument(
            "--description", metavar="TXT", help="description"
        )
        self.del_command.add_argument(
            "-q", "--quiet", action="store_true", help="do not print response messages"
        )

    def ls_command_options(self):
        # 格式化帮助信息/绑定运行函数
        self.ls_command.description = "Query firewall rule"
        self.ls_command.usage = "{} add [options]".format(
            self.root_command.format_usage().split()[1]
        )
        self.ls_command.set_defaults(func=ls_firewall_rule)

        # 必须参数的分组
        required_group = self.ls_command.add_argument_group("required arguments")
        required_group.add_argument(
            "--secretId",
            required=True,
            metavar="Id",
            help="secret id for tencent cloud lighthouse",
        )
        required_group.add_argument(
            "--secretKey",
            required=True,
            metavar="Key",
            help="secret key for tencent cloud lighthouse",
        )
        required_group.add_argument(
            "--instanceId",
            required=True,
            metavar="Id",
            help="instance id for tencent cloud lighthouse",
        )

        # 可选参数的分组
        self.ls_command.add_argument(
            "--port", metavar="Port", help="port, port1,port2, port1-port3, ALL"
        )
        self.ls_command.add_argument(
            "--protocol",
            choices=["TCP", "UDP", "ICMP", "ALL"],
            metavar="Protocol",
            help="TCP, UDP, ICMP, ALL",
        )
        self.ls_command.add_argument("--source", metavar="Source", help="subnet or ip")
        self.ls_command.add_argument("--action", metavar="Action", help="ACCEPT, DROP")
        self.ls_command.add_argument("--description", metavar="TXT", help="description")
        self.ls_command.add_argument(
            "-q", "--quiet", action="store_true", help="do not print response messages"
        )

    def _format_group_order(self, parser: argparse.ArgumentParser, items: list):
        """调整组顺序，items数据结构为: [ (组名1,放到哪个索引上), (组名2,放到哪个索引上) ],索引从1开始"""

        for group_name, index in items:
            for _index, group in enumerate(parser._action_groups.copy()):
                if group.title == group_name:
                    # 删除组并重新添加
                    del parser._action_groups[_index]
                    parser._action_groups.insert(index, group)

    def _format_param_order(self, parser: argparse.ArgumentParser, items: list):
        """调整参数顺序，items数据结构为: [ (组名1, 参数1, 放到哪个索引上), (组名2, 参数2, 放到哪个索引上) ]"""

        for group_name, option_name, index in items:
            # 先找到组
            for group in parser._action_groups.copy():
                if group.title == group_name:
                    # 在组内找到参数
                    for _index, action in enumerate(group._group_actions.copy()):
                        if option_name in action.option_strings:
                            # 删除参数,并重新添加
                            del group._group_actions[_index]
                            group._group_actions.insert(index, action)

    def _format_help_string(self, parser: argparse.ArgumentParser, items: list):
        """使用字符串替换的方式调整输出内容"""

        # 将原始的format_help函数备份一下,后面会用到
        parser._original_format_help = parser.format_help

        def wrapper():
            ret = parser._original_format_help()
            for old, new in items:
                ret = ret.replace(old, new)
            return ret

        parser.format_help = wrapper

    def format_help(self):
        """自定义帮助信息,如果有问题可以在parse函数中注释此函数调用，不影响代码执行"""

        # 根命令
        self._format_help_string(
            self.root_command,
            [
                ("{add,del,ls}\n", "\r"),
                ("  add  ", "add    "),
                ("  del  ", "del    "),
                ("  ls  ", "ls    "),
            ],
        )
        self._format_param_order(
            self.root_command, [("optional arguments", "--help", 1)]
        )
        self._format_group_order(self.root_command, [("optional arguments", 2)])

        description = list(
            map(
                lambda s: s.replace(" ", "", 16),
                self.root_command.description.split("\n"),
            )
        )
        self.root_command.description = "\n".join(description)

        # 子命令-分组顺序调整
        self._format_group_order(self.add_command, [("required arguments", 1)])
        self._format_group_order(self.del_command, [("required arguments", 1)])
        self._format_group_order(self.ls_command, [("required arguments", 1)])

        # 子命令-选项顺序调整
        self._format_param_order(
            self.add_command, [("optional arguments", "--help", 9)]
        )
        self._format_param_order(
            self.del_command, [("optional arguments", "--help", 9)]
        )
        self._format_param_order(self.ls_command, [("optional arguments", "--help", 9)])

    def parse(self):
        # 生成根命令和子命令 / 添加选项或分组现象 / 格式化信息(黑科技)/解析参数
        self.make_command()
        self.root_command_options()
        self.add_command_options()
        self.del_command_options()
        self.ls_command_options()
        self.format_help()
        args = self.root_command.parse_args()

        # 取出并删除 函数执行所用不到的参数
        quiet = args.__dict__.pop("quiet", False)  # 静默输出
        func = args.__dict__.pop("func", None)  # 使用self.<command>.set_defaults设置的额外属性

        # 未输入任何参数时输出帮助信息
        if len(args.__dict__) <= 0:
            self.root_command.print_help(file=sys.stdout)
            sys.exit(1)

        # 业务逻辑
        cred = Credential(
            args.__dict__.pop("secretId"), args.__dict__.pop("secretKey")
        )  # 创建认证对象
        ok, msg = func(cred=cred, **args.__dict__)  # 执行函数

        # 是否静默输出?
        if not quiet:
            print(json.dumps(msg, ensure_ascii=False, indent=4))

        # 退出程序
        sys.exit(0 if ok else 1)


if __name__ == "__main__":
    Cli().parse()
```

:::

<br />

## click

文档：[https://click.palletsprojects.com/en/8.1.x/](https://click.palletsprojects.com/en/8.1.x/)

### 安装

```bash
pip install click==8.1.3
```

### 选项

#### （1）基础示例

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import click


@click.command()
@click.option("-m", "--memory", help="This is a test message")
# 如果有长选项，函数参数需要和长选项名称保持一致，否则需要和短选项保持一致
# 如果是--memory-request这种带-的长选项选项，那么函数参数需要将-改为_，即memory_request
def hello(memory):
    click.echo(memory)


if __name__ == '__main__':
    hello()

```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --help
Usage: main.py [OPTIONS]

Options:
  -m, --memory TEXT  This is a test message
  --help             Show this message and exit.


(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -m 2g 
2g
```

:::

#### （2）必选参数 (required=True)

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import click


@click.command()
@click.option("-m", "--memory", required=True, help="This is a test message")
def hello(memory):
    click.echo(memory)


if __name__ == '__main__':
    hello()
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --help
Usage: main.py [OPTIONS]

Options:
  -m, --memory TEXT  This is a test message  [required]
  --help             Show this message and exit.

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py
Usage: main.py [OPTIONS]
Try 'main.py --help' for help.

Error: Missing option '-m' / '--memory'.

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -m 1g
1g
```

:::

#### （3）多选项(multiple=True)

文档：[https://click.palletsprojects.com/en/8.1.x/options/#multiple-options](https://click.palletsprojects.com/en/8.1.x/options/#multiple-options)

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import click


@click.command()
@click.option("-m", "--memory", multiple=True, help="This is a test message")
def hello(memory):
    click.echo(memory)


if __name__ == '__main__':
    hello()
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --help
Usage: main.py [OPTIONS]                        
                                                
Options:                                        
  -m, --memory TEXT  This is a test message     
  --help             Show this message and exit.

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -m 1g -m 2g
('1g', '2g')
```

:::

#### （4）多值选项(nargs=2)

文档：[https://click.palletsprojects.com/en/8.1.x/options/#multi-value-options](https://click.palletsprojects.com/en/8.1.x/options/#multi-value-options)

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import click


@click.command()
@click.option("-m", "--memory", nargs=2, help="This is a test message")
def hello(memory):
    click.echo(memory)


if __name__ == '__main__':
    hello()
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --help
Usage: main.py [OPTIONS]                           
                                                   
Options:                                           
  -m, --memory TEXT...  This is a test message     
  --help                Show this message and exit.
  
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -m 1g   
Error: Option '-m' requires 2 arguments.

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -m 1g 2g
('1g', '2g')
```

:::

#### （5）默认值(default)

注意事项：

* 当选项设置了`multiple=True`后，`default`值必须设置成列表结构

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import click


@click.command()
@click.option("-m", "--memory", default="1g", show_default=True, help="This is a test message")
def hello(memory):
    click.echo(memory)


if __name__ == '__main__':
    hello()
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --help
Usage: main.py [OPTIONS]                                  
                                                          
Options:                                                  
  -m, --memory TEXT  This is a test message  [default: 1g]
  --help             Show this message and exit. 
  
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py       
1g  
```

:::

#### （6）类型转换(type)

文档：[https://click.palletsprojects.com/en/8.1.x/options/#tuples-as-multi-value-options](https://click.palletsprojects.com/en/8.1.x/options/#tuples-as-multi-value-options)

注意事项：

* 当设置成类似这样：`type=(str, int)`，这就相当于自动开启了`nargs`，并为每个值进行类型转换

::: details 基础示例

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import click


@click.command()
@click.option("-m", "--memory", type=int, help="This is a test message")
def hello(memory):
    print(type(memory))
    click.echo(memory)


if __name__ == '__main__':
    hello()
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --help
Usage: main.py [OPTIONS]                           
                                                   
Options:                                           
  -m, --memory INTEGER  This is a test message     
  --help                Show this message and exit.

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -m 1000
<class 'int'>
1000
```

:::

::: details 自定义转换函数

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import click


def double(x: str):
    return x * 2


@click.command()
@click.option("-m", "--memory", type=double, help="This is a test message")
def hello(memory):
    print(type(memory))
    click.echo(memory)


if __name__ == '__main__':
    hello()
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --help
Usage: main.py [OPTIONS]                          
                                                  
Options:                                          
  -m, --memory DOUBLE  This is a test message     
  --help               Show this message and exit.

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -m abc 
<class 'str'>
abcabc
```

:::

#### （7）限制参数可选值/范围

文档：

* [https://click.palletsprojects.com/en/8.1.x/options/#choice-options](https://click.palletsprojects.com/en/8.1.x/options/#choice-options)
* [https://click.palletsprojects.com/en/8.1.x/options/#range-options](https://click.palletsprojects.com/en/8.1.x/options/#range-options)

::: details 限制可选值 type=click.Choice(["DEBUG", "INFO", "WARNING"])

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-


import sys
import click


@click.command()
@click.option('--debug-level', type=click.Choice(["DEBUG", "INFO", "WARNING"]), help="This is a test message")
def log(debug_level):
    click.echo(f"Debug Level: {debug_level}")


if __name__ == '__main__':
    log()
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --help            
Usage: main.py [OPTIONS]                                     
                                                             
Options:                                                     
  --debug-level [DEBUG|INFO|WARNING]                         
                                  This is a test message     
  --help                          Show this message and exit.
  
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --debug-level DEBUG
Debug Level: DEBUG

# 故意输错
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --debug-level INFO1
Usage: main.py [OPTIONS]
Try 'main.py --help' for help.

Error: Invalid value for '--debug-level': 'INFO1' is not one of 'DEBUG', 'INFO', 'WARNING'.  
```

:::

::: details 限制可选范围：click.IntRange和click.FloatRange

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import click


@click.command()
# clamp=True,若超过边界则将值设置为边界
@click.option('-m', type=click.IntRange(1, 100), help="This is a test message")
@click.option('-n', type=click.IntRange(1, 100, clamp=True), help="This is a test message")
def echo(m, n):
    click.echo(f"M:{m}\nN:{n}")


if __name__ == '__main__':
    echo()
```

输出结果

```bash
# 查看帮助
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --help
Usage: main.py [OPTIONS]                               
                                                       
Options:                                               
  -m INTEGER RANGE  This is a test message  [1<=x<=100]
  -n INTEGER RANGE  This is a test message  [1<=x<=100]
  --help            Show this message and exit.
  
# 正常传递值，没问题
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -m 10 -n 20 
M:10
N:20

# 传递错误的类型
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -m 20.1
Usage: main.py [OPTIONS]      
Try 'main.py --help' for help.

Error: Invalid value for '-m': '20.1' is not a valid integer range.

# 超过范围时，m参数会报错,n参数会设置为最临近边界
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -m 200       
Usage: main.py [OPTIONS]      
Try 'main.py --help' for help.

Error: Invalid value for '-m': 200 is not in the range 1<=x<=100.

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -n 200 
M:None
N:100
```

:::

#### （8）布尔类型参数(is_flag=True)

文档：

* [https://click.palletsprojects.com/en/8.1.x/options/#boolean-flags](https://click.palletsprojects.com/en/8.1.x/options/#boolean-flags)
* [https://click.palletsprojects.com/en/8.1.x/options/#optional-value](https://click.palletsprojects.com/en/8.1.x/options/#optional-value)

::: details is_flag 基础示例

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import click


@click.command()
@click.option('-d', '--debug', is_flag=True, help="This is a test message")
def log(debug):
    click.echo(f"Debug: {debug}")


if __name__ == '__main__':
    log()
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --help
Usage: main.py [OPTIONS]                  
                                          
Options:                                  
  -d, --debug  This is a test message     
  --help       Show this message and exit.

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py       
Debug: False

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -d
Debug: True
```

:::

::: details is_flag 使用【自定义值/None】而不是 【True/False】

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import click


@click.command()
@click.option('-d', '--debug', flag_value="自定义的值", help="This is a test message")
def log(debug):
    click.echo(f"Debug: {debug}")


if __name__ == '__main__':
    log()
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --help
Usage: main.py [OPTIONS]                  
                                          
Options:                                  
  -d, --debug  This is a test message     
  --help       Show this message and exit.

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py       
Debug: None

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -d
Debug: 自定义的值
```

:::

::: details 使用 / 隐式开启布尔类型参数

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-


import sys
import click

@click.command()
@click.option('--color/--no-color', default=False, show_default=True, help="This is a test message")
def info(color):
    click.echo(color)


if __name__ == '__main__':
    info()
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --help    
Usage: main.py [OPTIONS]                                           
                                                                   
Options:                                                           
  --color / --no-color  This is a test message  [default: no-color]
  --help                Show this message and exit. 
  
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --color
True

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --no-color
False
```

:::

::: details 同时支持布尔类型和非布尔类型

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import click


@click.command()
@click.option('-d', '--debug', is_flag=False, flag_value="ABC", default="DEF", help="This is a test message")
def log(debug):
    click.echo(f"Debug: {debug}")


if __name__ == '__main__':
    log()
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --help
Usage: main.py [OPTIONS]                  
                                          
Options:                                  
  -d, --debug TEXT  This is a test message
  --help            Show this message and exit.

# 不带参数时使用default
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py
Debug: DEF

# 带参数时使用flag_value
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -d
Debug: ABC

# 带值时直接使用
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -d 100
Debug: 100
```

:::



#### （9）支持类似-vvv这种重复计数

文档：[https://click.palletsprojects.com/en/8.1.x/options/#counting](https://click.palletsprojects.com/en/8.1.x/options/#counting)

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-


import sys
import click


@click.command()
@click.option('-v', '--verbose', count=True, help="This is a test message")
def log(verbose):
    click.echo(f"Verbosity: {verbose}")


if __name__ == '__main__':
    log()
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --help
Usage: main.py [OPTIONS]                    
                                            
Options:                                    
  -v, --verbose  This is a test message     
  --help         Show this message and exit.

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -v    
Verbosity: 1

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -vvvvvvvvvvvvv
Verbosity: 13
```

:::

#### （10）交互式命令行

文档：

* [https://click.palletsprojects.com/en/8.1.x/options/#prompting](https://click.palletsprojects.com/en/8.1.x/options/#prompting)
* [https://click.palletsprojects.com/en/8.1.x/options/#password-prompts](https://click.palletsprojects.com/en/8.1.x/options/#password-prompts)



::: details 使用prompt=True 或 prompt=“提示信息”

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import click


@click.command()
@click.option("--username", prompt=True, help="This is a test message")
def hello(username):
    click.echo(f"Hello, {username}!")


if __name__ == '__main__':
    hello()
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --help
Usage: main.py [OPTIONS]                      

Options:
  --username TEXT  This is a test message     
  --help           Show this message and exit.

# 带参数执行没问题
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --username bob
Hello, bob!

# 不带参数时执行，这其中有几个特性需要注意：
#   (1) 这是一个必须的参数，所以总是会弹出交互式界面，除非设置prompt_required=False(设置required=False不起作用)
#   (2) 支持退格键
#   (3) 未输入任何内容按下回车，则会继续让输入
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py               
Username: jack
Hello, jack!
```

:::

::: details 密码输入流程

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import click


@click.command()
@click.option("--password", prompt=True, hide_input=True, confirmation_prompt=True, help="This is a test message")
def setup(password):
    click.echo(f"You password: {password}!")


if __name__ == '__main__':
    setup()
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py
Password: 
Repeat for confirmation:
Error: The two entered values do not match.
Password:
Repeat for confirmation:
You password: def!
```

:::

::: details 是否确认操作？- 方式1：需要在函数内判断yes的值

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import click


@click.command()
@click.option("--yes", is_flag=True, prompt="Are you sure you want to drop the db?", help="This is a test message")
def drop(yes):
    click.echo(f"You answer: {yes}!")


if __name__ == '__main__':
    drop()
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --yes
You answer: True!

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py      
Are you sure you want to drop the db? [y/N]:   # 回车
You answer: False!

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py
Are you sure you want to drop the db? [y/N]:  # 空格
You answer: False!                              

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py
Are you sure you want to drop the db? [y/N]: f
Error: invalid input
Are you sure you want to drop the db? [y/N]: y
You answer: True!
```

:::

::: details 是否确认操作？- 方式2：通过回调函数判断yes的值

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import click


def abort_if_false(ctx, param, value):
    if not value:
        ctx.abort()


@click.command()
@click.option(
    "--yes",
    is_flag=True,
    expose_value=False,  # 这个意思是不传递yes变量到下面的函数中去
    callback=abort_if_false,  # 所以需要有一个回调函数来确认用户输入的是 继续 还是 退出
    prompt="Are you sure you want to drop the db?",
    help="This is a test message",
)
def drop():
    click.echo(f"Hello!")


if __name__ == "__main__":
    drop()
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py
Are you sure you want to drop the db? [y/N]:  # 回车
Aborted!

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py
Are you sure you want to drop the db? [y/N]:  # 空格
Aborted!

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py
Are you sure you want to drop the db? [y/N]: 1
Error: invalid input
Are you sure you want to drop the db? [y/N]: n
Aborted!

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py
Are you sure you want to drop the db? [y/N]: Y
Hello!
```

:::

::: details 是否确认操作？- 方式3：使用内置的装饰器（效果与上面的等同）

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import click


@click.command()
@click.confirmation_option(prompt='Are you sure you want to drop the db?')
def drop():
    click.echo(f"Hello!")


if __name__ == "__main__":
    drop()
```

:::

#### （11）从环境变量中取值

文档：

* [https://click.palletsprojects.com/en/8.1.x/options/#values-from-environment-variables](https://click.palletsprojects.com/en/8.1.x/options/#values-from-environment-variables)
* [https://click.palletsprojects.com/en/8.1.x/options/#multiple-values-from-environment-values](https://click.palletsprojects.com/en/8.1.x/options/#multiple-values-from-environment-values)

注意事项：

* 环境变量不区分大小写
* 优先级比较：命令行参数 >  环境变量

::: details 方式1：使用envvar选项指定环境变量名字

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import click


@click.command()
@click.option('-m', '--memory', envvar="DefaultMemory", required=True, help="This is a test message")
def log(memory):
    click.echo(f"Memory: {memory}")


if __name__ == '__main__':
    log()
```

输出结果

```bash
# 查看帮助
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --help
Usage: main.py [OPTIONS]                               
                                                       
Options:                                               
  -m, --memory TEXT  This is a test message  [required]
  --help             Show this message and exit.       

# 不带任何参数执行会报错，因为设置了required
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py       
Usage: main.py [OPTIONS]      
Try 'main.py --help' for help.

Error: Missing option '-m' / '--memory'.        

# 设置环境变量（若在Linux环境下则使用export DefaultMemory=1g）
(venv) C:\Users\Administrator\Desktop\tutorials>set DefaultMemory=1g

# 再次执行，没问题
# 设置了required说明是必选参数，在本例子中，命令行参数和环境变量中必须设置其中之一才能符合required的要求
# 在这一点上比内置的argparse要强
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py
Memory: 1g

# 手动传参，优先级比环境变量高，很符合常理
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -m 2g
Memory: 2g
```

:::

::: details 方式2：使用auto_envvar_prefix添加前缀，自动开启环境变量解析

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import click


@click.command()
@click.option('-m', '--memory', required=True, help="This is a test message")
def log(memory):
    click.echo(f"Memory: {memory}")


if __name__ == '__main__':
    log(auto_envvar_prefix="DEFAULT")
```

输出结果

```bash
# 查看帮助
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --help
Usage: main.py [OPTIONS]

Options:
  -m, --memory TEXT  This is a test message  [required]
  --help             Show this message and exit.


# 不带任何参数执行会报错，因为设置了required
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py       
Usage: main.py [OPTIONS]      
Try 'main.py --help' for help.

Error: Missing option '-m' / '--memory'.

# 设置环境变量，规则是：前缀_大写的选项名
(venv) C:\Users\Administrator\Desktop\tutorials>set DEFAULT_MEMORY=3g    

# 再次执行，没问题
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py           
Memory: 3g

# 手动传参
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -m 4g
Memory: 4g
```

:::

#### （11）从配置文件中取值

参考：[https://jwodder.github.io/kbits/posts/click-config/](https://jwodder.github.io/kbits/posts/click-config/)

注意事项：

* 优先级比较：命令行参数 >  配置文件

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import json
import configparser
import click

DEFAULT_CFG = "dev.ini"


def configure(ctx, param, filename):
    cfg = configparser.ConfigParser()
    cfg.read(filename)
    try:
        options = dict(cfg["options"])
    except KeyError:
        options = {}
    ctx.default_map = options


@click.command()
@click.option(
    "-c",
    "--config",
    type=click.Path(dir_okay=False),  # 指定类型为 路径类型，返回文件名；dir_okay是否允许目录作为值
    default=DEFAULT_CFG,  # 默认配置文件
    callback=configure,  # 回调函数
    is_eager=True,  # 该选项比其他选项优先解析
    expose_value=False,  # 不传递值到函数中
    help="Read option defaults from the specified INI file",
    show_default=True,
)
@click.option("--host", required=True)
@click.option("--port")
@click.option("--debug")
def main(**kwargs):
    print(json.dumps(kwargs, indent=4, ensure_ascii=False))


if __name__ == "__main__":
    main()
```

创建配置文件 `dev.ini`

```ini
[options]
HOST = 0.0.0.0
PORT = 3000
DEBUG = INFO
```

创建配置文件 `prod.ini`

```ini
[options]
HOST = 127.0.0.1
PORT = 80
DEBUG = WARNING
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --help
Usage: main.py [OPTIONS]                                             
                                                                     
Options:                                                             
  -c, --config FILE  Read option defaults from the specified INI file
                     [default: example.ini]                          
  --host TEXT        [required]                                      
  --port TEXT
  --debug TEXT
  --help             Show this message and exit.

# 直接运行不会报错，虽然host参数设置了required，但是通过读取默认的配置文件，找到了这个属性，所以不会报错
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py   
{                     
    "host": "0.0.0.0",
    "port": "3000",   
    "debug": "INFO"   
}                 

# 若默认的配置文件不存在，那么并不会报错说配置文件未找到


# 手动传参
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --host 0.0.0.0
{
    "host": "0.0.0.0",
    "port": "3000",
    "debug": "INFO"
}



# 指定其他配置文件
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -c prod.ini
{
    "host": "127.0.0.1",
    "port": "80",
    "debug": "WARNING"
}


# 同时指定，这里故意将--host放在最前面，看会不会有问题
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --host 0.0.0.0 -c prod.ini
{
    "host": "0.0.0.0",
    "port": "80",
    "debug": "WARNING"
}
```

:::

#### （12）同时使用命令行、环境变量和配置文件

注意事项：

* 优先级比较：命令行参数 > 环境变量 > 配置文件

::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import json
import configparser
import click

DEFAULT_CFG = "dev.ini"


def configure(ctx, param, filename):
    cfg = configparser.ConfigParser()
    cfg.read(filename)
    try:
        options = dict(cfg["options"])
    except KeyError:
        options = {}
    ctx.default_map = options


@click.command()
@click.option(
    "-c",
    "--config",
    type=click.Path(dir_okay=False),  # 指定类型为 路径类型，返回文件名；dir_okay是否允许目录作为值
    default=DEFAULT_CFG,  # 默认配置文件
    callback=configure,  # 回调函数
    is_eager=True,  # 该选项比其他选项优先解析
    expose_value=False,  # 不传递值到函数中
    help="Read option defaults from the specified INI file",
    show_default=True,
)
@click.option("--host", required=True, envvar="HOST") # 这里指定环境变量
@click.option("--port")
@click.option("--debug")
def main(**kwargs):
    print(json.dumps(kwargs, indent=4, ensure_ascii=False))


if __name__ == "__main__":
    main()
```

创建配置文件`dev.ini`

```ini
[options]
HOST = 0.0.0.0
PORT = 3000
DEBUG = INFO
```

创建配置文件 `prod.ini`

```ini
[options]
HOST = 127.0.0.1
PORT = 80
DEBUG = WARNING
```

输出结果

```bash
# 默认情况下，使用了默认的配置文件
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py
{
    "host": "0.0.0.0",
    "port": "3000",   
    "debug": "INFO"   
}

# 设置环境变量后，环境变量优先级高于配置文件
(venv) C:\Users\Administrator\Desktop\tutorials>set HOST=0.0.0.0
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py   
{
    "host": "0.0.0.0",
    "port": "3000",
    "debug": "INFO"
}

# 同时使用配置文件、环境变量、命令行参数，那么命令行参数优先级最高
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -c prod.ini --host 1.1.1.1
{
    "host": "1.1.1.1",
    "port": "80",
    "debug": "WARNING"
}
```

:::



### 子命令和组

文档：[https://click.palletsprojects.com/en/8.1.x/commands/](https://click.palletsprojects.com/en/8.1.x/commands/)

#### （1）基础示例

::: details 方式一

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import click


@click.group()
def main():
    click.echo("main")


@main.command(help="ls something")
@click.option("-m", "--memory", help="This is a test message")
def ls(memory):
    click.echo(f"ls {memory}")


@main.command(help="add something")
def add():
    click.echo("add")


@main.command(help="remove something")
def remove():
    click.echo("remove")


if __name__ == "__main__":
    main()
```

输出结果

```bash
# 根命令
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --help
Usage: main.py [OPTIONS] COMMAND [ARGS]...
                                          
Options:
  --help  Show this message and exit.
                                          
Commands:                                 
  add     add something                   
  ls      ls something                    
  remove  remove something                

# 子命令
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py ls --help 
main
Usage: main.py ls [OPTIONS]                     
                                                
  ls something                                  
                                                
Options:                                        
  -m, --memory TEXT  This is a test message     
  --help             Show this message and exit.

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py ls -m 1g 
main
ls 1g
```

:::

::: details 方式二

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import click


@click.group()
def main():
    click.echo("main")


@click.command(help="ls something")
@click.option("-m", "--memory", help="This is a test message")
def ls(memory):
    click.echo(f"ls {memory}")


@click.command(help="add something")
def add():
    click.echo("add")


@click.command(help="remove something")
def remove():
    click.echo("remove")


main.add_command(ls)
main.add_command(add)
main.add_command(remove)

if __name__ == "__main__":
    main()
```

:::

