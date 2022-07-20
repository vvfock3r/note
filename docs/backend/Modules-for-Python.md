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

**命令行界面** 

<table>
    <thead>
    <tr>
        <th style="width: 15%;">分类说明</th>
        <th style="width: 15%;">模块名称</th>
        <th style="width: 15%;">测试版本</th>
        <th style="width: 15%;">应用举例</th>
        <th style="width: 40%;">备注</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>命令行界面</td>
        <td><a href="#click" style="text-decoration:none;">click</a></td>
        <td><li><code>Python 3.10.5</code></li><li><code>Click 8.1.3</code></li></td>
        <td><code>Flask</code></td>
        <td>推荐使用</td>
    </tr>            
    <tr>
        <td></td>
        <td><a href="https://jinhui.dev/backend/learned/Python-argparse.html" style="text-decoration:none;">argparse</a></td>
        <td><li><code>Python 3.10.5</code></li></td>
        <td><code>yum</code>/<code>dnf</code></td>
        <td>原生不支持从环境变量、配置文件取值</td>
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
        <td>Ipython</td>
    </tr>
    <tr>
        <td>字符图形</td>
        <td>asciimatics</td>
        <td></td>
        <td>第三方库</td>
        <td>Ipython</td>
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
        <td>Ipython</td>
    </tr>
    </tbody>
</table>

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

#### （12）从多方面综合取值 ✨

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

### 实用函数举例



### 定制帮助信息

文档：[https://click.palletsprojects.com/en/8.1.x/documentation/#preventing-rewrapping](https://click.palletsprojects.com/en/8.1.x/documentation/#preventing-rewrapping)

* 在文档字符串中，`\b`后面的字符串可以按原样显示，`\f`可以截断后面的信息（即不显示）

* 可以通过如下代码添加`-h, --help`支持

  ```python
  CONTEXT_SETTINGS = dict(help_option_names=['-h', '--help'])
  
  @click.command(context_settings=CONTEXT_SETTINGS)
  def cli():
      pass
  ```

  输出结果

  ```bash
  $ cli -h
  Usage: cli [OPTIONS]
  
  Options:
    -h, --help  Show this message and exit.
  ```



