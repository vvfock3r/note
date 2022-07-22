# Python实用模块

## 参考资料

* **Awesome Python**

  Github：[https://github.com/vinta/awesome-python](https://github.com/vinta/awesome-python)
  
* **HelloGitHub**

  Github：[https://github.com/HelloGitHub-Team/Article](https://github.com/HelloGitHub-Team/Article)

<br />

## 分组目录

### 默认

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
        <td>日志记录</td>
        <td><a href="#loguru" style="text-decoration:none;">loguru</a></td>
        <td><li><code>Python 3.10.5</code></li><li><code>Loguru 0.6.0</code></li></td>
        <td></td>
        <td>懒人神器</td>
    </tr>
    </tbody>
</table>

<br />

### 命令行

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
        <td>不推荐使用，原因是原生不支持从环境变量、配置文件取值</td>
    </tr>
    <tr>
        <td>命令行富文本</td>
        <td><a href="#rich" style="text-decoration:none;">rich</a></td>
        <td><li><code>Python 3.10.5</code></li><li><code>Rich 12.5.1</code></li></td>
        <td></td>
        <td></td>
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

# 指定配置文件
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -c prod.ini
{
    "host": "127.0.0.1",
    "port": "80",
    "debug": "WARNING"
}

# 设置环境变量后，环境变量优先级高于配置文件
(venv) C:\Users\Administrator\Desktop\tutorials>set HOST=1.1.1.1
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -c prod.ini  
{
    "host": "127.0.0.1",
    "port": "80",
    "debug": "WARNING"
}

# 同时使用配置文件、环境变量、命令行参数，那么命令行参数优先级最高
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py -c prod.ini --host 2.2.2.2
{
    "host": "2.2.2.2",
    "port": "80",
    "debug": "WARNING"
}
```

:::



### 子命令和组

文档：[https://click.palletsprojects.com/en/8.1.x/commands/](https://click.palletsprojects.com/en/8.1.x/commands/)

#### （1）基础示例

::: details 方式一：全部使用装饰器来写，心智负担比较大，尤其是一个复杂的命令行程序

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import click


@click.group()
def main():
    click.echo("main")


@main.command(help="ls something")        # 注意这里使用main.command 而不是cilck.command
@click.option("-m", "--memory", help="This is a test message")
def ls(memory):
    click.echo(f"ls {memory}")


@main.command(help="add something")       # 注意这里使用main.command 而不是cilck.command
def add():
    click.echo("add")

 
@main.command(help="remove something")    # 注意这里使用main.command 而不是cilck.command
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

::: details 方式二：装饰器全部以click开头，并手动添加子命令到组中

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

#### （2）子命令嵌套的各种写法 ✨

文档：[https://click.palletsprojects.com/en/8.1.x/commands/#merging-multi-commands](https://click.palletsprojects.com/en/8.1.x/commands/#merging-multi-commands)

::: details 方式一：全部使用装饰器来写，心智负担比较大，尤其是一个复杂的命令行程序

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import click


@click.group()
def main():
    '''main group'''
    click.echo("main")


@main.group()
def ls():
    '''ls group'''
    click.echo("ls")


@ls.command()
@click.option("-m", "--memory", help="This is a test message")
def cvm(memory):
    '''cvm command'''
    click.echo(f"ls cvm {memory}")


if __name__ == "__main__":
    main()
```

输出结果

```bash
# 帮助文档
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --help    
Usage: main.py [OPTIONS] COMMAND [ARGS]...
                                          
  main group                              
                                          
Options:                                  
  --help  Show this message and exit.     
                                          
Commands:                                 
  ls  ls group                            

# 子命令帮助文档
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py ls --help 
main
Usage: main.py ls [OPTIONS] COMMAND [ARGS]...
                                             
  ls group                                   
                                             
Options:                                     
  --help  Show this message and exit.        

Commands:
  cvm  cvm command

# 执行命令
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py ls cvm   
main
ls
ls cvm None
```

:::

::: details 方式二：装饰器全部以click开头，并手动添加子命令到组中

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import click


@click.group()
def main():
    '''main group'''
    click.echo("main")


@click.group()
def ls():
    '''ls group'''
    click.echo("ls")


@click.command()
@click.option("-m", "--memory", help="This is a test message")
def cvm(memory):
    '''cvm command'''
    click.echo(f"ls cvm {memory}")


main.add_command(ls)
ls.add_command(cvm)

if __name__ == "__main__":
    main()
```

:::

::: details 方式三：使用非装饰器定义组

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import click


@click.command(help="index1 help")
def index1(): pass


@click.command(help="index2 help")
def index2(): pass


# 定义两个组
cli1 = click.Group()
cli2 = click.Group()

# 组内添加子命令
cli1.add_command(index1)
cli2.add_command(index2)

# 合并两个组内的子命令
cli = click.CommandCollection(sources=[cli1, cli2])

if __name__ == "__main__":
    cli()
```

输出结果

```bash
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --help
Usage: main.py [OPTIONS] COMMAND [ARGS]...

Options:
  --help  Show this message and exit.

Commands:
  index1  index1 help
  index2  index2 help
```

:::

::: details 方式四：灵活定义嵌套关系 ✨

> 如果有复杂的需求，可以将组定义改成装饰器形式

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import click


@click.command(help="index1 help")
def index1(): pass


@click.command(help="index2 help")
def index2(): pass


def example1():
    '''
    1级子命令，子命令平级关系
    Commands:
        index1  index1 help
        index2  index2 help
    '''
    # 定义两个组
    cli1 = click.Group()
    cli2 = click.Group()

    # 组内添加子命令
    cli1.add_command(index1)
    cli2.add_command(index2)

    # 合并两个组内的子命令
    cli = click.CommandCollection(sources=[cli1, cli2])

    cli()


def example2():
    '''
    2级子命令，平级关系
    Commands:
        cli1  cli1 help
        cli2  cli2 help

    cli1下面有index1子命令，cli2下面有index2子命令
    '''
    # 定义一个主组
    cli = click.Group()

    # 定义两个组, 这里需要定义名字属性，也可以在下面的cli.add_command中定义名字
    cli1 = click.Group(name="cli1", help="cli1 help")
    cli2 = click.Group(name="cli2", help="cli2 help")

    # 组内添加子命令
    cli1.add_command(index1)
    cli2.add_command(index2)

    # 组嵌套
    cli.add_command(cli1)
    cli.add_command(cli2)
    cli()


def example3():
    '''
    2级子命令，嵌套关系

    根命令:
        Commands:
            cli1  cli1 help

    cli1下面：
        Commands:
          cli2    cli2 help
          index1  index1 help
    '''
    # 定义一个主组
    cli = click.Group()

    # 定义两个组, 这里需要定义名字属性，也可以在下面的cli.add_command中定义名字
    cli1 = click.Group(name="cli1", help="cli1 help")
    cli2 = click.Group(name="cli2", help="cli2 help")

    # 组内添加子命令
    cli1.add_command(index1)
    cli2.add_command(index2)

    # 组嵌套
    cli.add_command(cli1)  # cli1子命令
    cli1.add_command(cli2)  # cli1 cli2 顺子命令
    cli()


if __name__ == "__main__":
    # example1()
    # example2()
    example3()
```



:::



#### （3）子命令共享选项 ✨

假如我们有多个子命令：

* 每个子命令都有一些相同的选项 和 各自独有的选项
* 每个子命令相同的选项可能有一些细微的区别，比如说帮助信息并不一样

如果每个子命令都定义一遍，略显繁琐且容易出错

<br />

第一种解决方案：写一个装饰器，里面定义好所有的公共选项，通过给装饰器传参以区分差别

第二种解决方案：写一个装饰器，作用是加载装饰器参数中的所有选项，这需要我们提前定义好所有的选项，而选项是一个函数，以区分细微差异

第二种方式更加灵活，推荐使用

<br />

::: details 方案一

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import click


def common_options(secret_id_help, secret_key_help):
    def wrapper(func):
        # 注意在帮助文档中显示的顺序，与这里加载顺序是相反的
        func = click.option("--secret-key", required=True, help=secret_key_help)(func)
        func = click.option("--secret-id", required=True, help=secret_id_help)(func)
        return func

    return wrapper


@click.group()
def main(): pass


@main.command()
@common_options("secret id from add", "secret key from add")
@click.option("--add-only", help="add only")
def add(secret_id, secret_key, add_only):
    '''add something'''
    click.echo(f"add {secret_id}:{secret_key}:{add_only}")


@main.command()
@common_options("secret id from remove", "secret key from remove")
@click.option("--remove-only", help="remove only")
def remove(secret_id, secret_key, remove_only):
    '''remove something'''
    click.echo(f"remove {secret_id}:{secret_key}:{remove_only}")


if __name__ == "__main__":
    main()
```

输出结果

```bash
# 查看帮助
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py --help
Usage: main.py [OPTIONS] COMMAND [ARGS]...

Options:
  --help  Show this message and exit.

Commands:
  add     add something
  remove  remove something

# add子命令
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py add --help 
Usage: main.py add [OPTIONS]
                            
  add something             
                            
Options:                    
  --secret-id TEXT   secret id from add  [required]
  --secret-key TEXT  secret key from add  [required]
  --add-only TEXT    add only
  --help             Show this message and exit.
  
# remove子命令
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py remove --help 
Usage: main.py remove [OPTIONS]

  remove something

Options:
  --secret-id TEXT    secret id from remove  [required]
  --secret-key TEXT   secret key from remove  [required]
  --remove-only TEXT  remove only
  --help              Show this message and exit.

# 正常使用
(venv) C:\Users\Administrator\Desktop\tutorials>python main.py add --secret-id 1 --secret-key 2 --add-only 3       
add 1:2:3

(venv) C:\Users\Administrator\Desktop\tutorials>python main.py remove --secret-id 1 --secret-key 2 --remove-only 3
remove 1:2:3
```

:::

::: details 方案二（推荐使用，更加灵活且自动调整了选项顺序）

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import click


def load_options(*options):
    def wrapper(func):
        for option in reversed(options):
            func = option(func)
        return func

    return wrapper


# 公共选项
secret_id_option = lambda x: click.option("--secret-id", required=True, help="secret id from {}".format(x))
secret_key_option = lambda x: click.option("--secret-key", required=True, help="secret key from {}".format(x))


@click.group()
def main(): pass


@main.command()
@load_options(secret_id_option("add"), secret_key_option("key"))
@click.option("--add-only", help="add only")
def add(secret_id, secret_key, add_only):
    '''add something'''
    click.echo(f"add {secret_id}:{secret_key}:{add_only}")


@main.command()
@load_options(secret_id_option("remove"), secret_key_option("remove"))
@click.option("--remove-only", help="remove only")
def remove(secret_id, secret_key, remove_only):
    '''remove something'''
    click.echo(f"remove {secret_id}:{secret_key}:{remove_only}")


if __name__ == "__main__":
    main()
```

:::

### 实用函数举例

文档：[https://click.palletsprojects.com/en/8.1.x/utils/#utilities](https://click.palletsprojects.com/en/8.1.x/utils/#utilities)

#### click.echo：代替print函数

文档：[https://click.palletsprojects.com/en/8.1.x/utils/#printing-to-stdout](https://click.palletsprojects.com/en/8.1.x/utils/#printing-to-stdout)

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import click

# echo的各种选项
click.echo("hello world 1")
click.echo("hello world 2", nl=False)  # 是否输出换行符，类似于print("", end="\n")
click.echo()
click.echo("hello world 3", err=True)  # 输出到stderr而不是默认的stdout
click.echo(click.style("hello world 4", fg="red"), color=True)  # 强制显示或不显示颜色

# 处理二进制数据
print(b'\xe4\xbd\xa0\xe5\xa5\xbd')  # print原样输出
click.echo(b'\xe4\xbd\xa0\xe5\xa5\xbd')  # 自动解码，输出 你好
```

输出结果

![image-20220721091121806](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220721091121806.png)

#### click.secho：输出ANSI颜色

文档：[https://click.palletsprojects.com/en/8.1.x/utils/#ansi-colors](https://click.palletsprojects.com/en/8.1.x/utils/#ansi-colors)

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import click

# 输出带有ANSI颜色的字符串，可以使用click.echo，但使用略显繁琐
click.echo(click.style("Hello World!", fg="green"))

# 此时可以直接使用secho, 可以理解成style echo
# 颜色支持rgb模式和字符串模式等
click.secho("普通模式             : This is a test message")
click.secho("背景色               : This is a test message", bg="green")  # background color
click.secho("前景色               : This is a test message", fg="red")  # foreground color
click.secho("加粗模式             : This is a test message", bold=True)  # bold mode
click.secho("暗淡模式             : This is a test message", dim=True)  # dim mode
click.secho("下划线               : This is a test message", underline=True)  # underline
click.secho("闪烁                 : This is a test message", blink=True)  # blink
click.secho("颠倒                 : This is a test message", reverse=True)  # reverse
click.secho("末尾重置样式         : This is a test message", reset=False)  # 默认为True,改为False，样式将继续影响后面的输出
click.secho()
click.secho("以下样式在Linux下测试并没有达到预期的效果,不知道为啥")
click.secho("倾斜                 : This is a test message", italic=True)
click.secho("上划线               : This is a test message", overline=True)
click.secho("删除线               : This is a test message", strikethrough=True)
```

输出结果

> Linux上并没有完全支持所有属性，而Windows上就更差了

![image-20220721102933855](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220721102933855.png)

![image-20220721103057768](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220721103057768.png)

#### click.echo_via_pager：分页支持

文档：[https://click.palletsprojects.com/en/8.1.x/utils/#pager-support](https://click.palletsprojects.com/en/8.1.x/utils/#pager-support)

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import click

click.echo_via_pager("\n".join(f"Line {idx}" for idx in range(200)))
```

输出结果

> 回车：读取下一行
>
> 空格：翻一下页面
>
> q：退出
>
> 往上翻页好像是不支持，不知道咋做

![image-20220721105235439](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220721105235439.png)

#### click.clear()：清屏

文档：[https://click.palletsprojects.com/en/8.1.x/utils/#screen-clearing](https://click.palletsprojects.com/en/8.1.x/utils/#screen-clearing)

```
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import click

click.clear()
```

#### click.getchar()：读取终端单字符

文档：[https://click.palletsprojects.com/en/8.1.x/utils/#getting-characters-from-terminal](https://click.palletsprojects.com/en/8.1.x/utils/#getting-characters-from-terminal)

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import click

click.echo('Continue? [y/n] ', nl=False)
c = click.getchar()  # 键盘输入任意字符即触发下一步操作，不需要按回车
click.echo()
if c == 'y':
    click.echo('We will go on')
elif c == 'n':
    click.echo('Abort!')
else:
    click.echo('Invalid input :(')
```

#### click.pause()：按任意键继续

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import click

click.pause()  # 默认会输出Press any key to continue...，并暂停，可自定义文本信息
print("Hello World!")
```

#### click.edit()：使用编辑器打开文件

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

import click

click.edit(
    filename=r'C:\Users\Administrator\Desktop\dev.ini',  # 指定要打开的文件，用默认的编辑器打开
    editor=r'D:\software\Notepad++\notepad++.exe',  # 指定弄notepad++打开，
)
```

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

<br />

## rich

文档：[https://rich.readthedocs.io/en/latest/introduction.html](https://rich.readthedocs.io/en/latest/introduction.html)

Github：[https://github.com/Textualize/rich](https://github.com/Textualize/rich)

> 💡  如果在Pycharm中调试的话，需要在 `Terminal` 中执行代码

### 安装

```bash
pip install rich==12.5.1
```

### Console

文档：[https://rich.readthedocs.io/en/latest/console.html](https://rich.readthedocs.io/en/latest/console.html)

#### 高亮显示

::: details 默认会高亮显示

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

from rich.console import Console

console = Console()
console.print(locals())

# 上面的代码等同于
# from rich import print
# print(locals())
```

![image-20220721184521622](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220721184521622.png)

:::

::: details 关闭高亮显示

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

from rich.console import Console

# highlight默认为None，即具体值从Console类继承,如果想统一设置，可以改为 Console(highlight=False)
console = Console()
console.print(locals(), highlight=False)

# 请注意下面的代码print中设置highlight值不管用，不知道是不是bug
# console = Console(highlight=False)
# console.print(locals(), highlight=True)
```

![image-20220722131419242](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220722131419242.png)

:::



**Console实例基本属性**

| 属性           | 默认值 | 说明                                                         |
| -------------- | ------ | ------------------------------------------------------------ |
| `size`         | ---    | 当前终端的尺寸（如果调整窗口大小可能会改变）                 |
| `encoding`     | ---    | 通常是`utf-8`                                                |
| `is_terminal`  | ---    | `Console`实例是否正在写入终端<br />（1）在REPL环境中执行会显示为`True`<br />（2）在Pycharm非`Terminal`执行代码代码会显示为`False`<br />（3）在`Ansible`等中执行会显示为False |
| `color_system` | `auto` | 颜色系统，默认会自动检测，设置为`None`可以禁用颜色系统       |

#### 输出方法

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

from rich.console import Console

console = Console()

console.print([1, 2, 3])  # 添加当前时间和文件信息
console.print_json('[false, true, null, "foo"]')  # 输出JSON信息
console.log([1, 2, 3])  # 添加当前时间和文件信息
console.out(locals())  # 只是上色
console.rule("第一章")  # 输出带有可选标题的水平线
```

![image-20220721191729939](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220721191729939.png)

#### 文本样式 ✨

文档：[https://rich.readthedocs.io/en/latest/style.html](https://rich.readthedocs.io/en/latest/style.html)

##### 一 、基础使用

文档：[https://rich.readthedocs.io/en/latest/style.html#defining-styles](https://rich.readthedocs.io/en/latest/style.html#defining-styles)

::: details （1）前景色（字体颜色）和背景色

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

from rich.console import Console

console = Console()

# 定义前景色(字体颜色)
print("[1] ", end="")
console.print("Hello World!", style="magenta")  # 使用单词定义颜色, default使用默认的颜色
print("[2] ", end="")
console.print("Hello World!", style="color(5)")  # 使用颜色数字定义颜色
print("[3] ", end="")
console.print("Hello World!", style="#af00ff")  # 使用CSS 16进制定义颜色
print("[4] ", end="")
console.print("Hello World!", style="rgb(175,0,255)")  # 使用CSS rgb定义颜色，注意不支持rgba

# 定义背景色，语法：<前景色 on 背景色>
# 背景色与前景色用法一致
print("[5] ", end="")
console.print("Hello World!", style="default on rgb(255,0,0)")  # 单独把背景色设置为大红色
print("[6] ", end="")
console.print("Hello World!", style="default on default")  # 前景色和背景色都使用默认颜色

# 单独对某一部分设置颜色
print("[7] ", end="")
console.print("[magenta]Hello[/magenta] World!")  # 使用[颜色]字符串[/颜色],可以单独对某一部分设置颜色
print("[8] ", end="")
console.print("[default]Hello[/default] World!", style="magenta")  # 这种类似于排除哪些不设置样式
```

![image-20220722093146701](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220722093146701.png)

:::

::: details （2）样式属性

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

from rich.console import Console

console = Console()

# 样式
print("[1] 加粗: ", end="")
console.print("Hello World!", style="bold")  # 或者写做 b
# console.print("[bold]Hello World![/bold]") # 也可以使用这样写法

print("[2] 闪烁: ", end="")
console.print("Hello World!", style="blink")  # Win10 CMD不支持

print("[3] 前景色和背景色颠倒: ", end="")
console.print("Hello World!", style="reverse")  # 或者写做 r

print("[4] 下划线: ", end="")
console.print("Hello World!", style="underline")  # 或者写做 u

# 样式可以通过在属性前面加上单词"not"来否定。如果样式重叠，这可用于关闭样式，注意：颜色并不支持加not
print("[5] not用法: ", end="")
console.print("[not bold]Hello [/not bold] World!", style="bold")
```

![image-20220722095403473](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220722095403473.png)

:::

::: details （3）完全禁用颜色和样式

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

from rich.console import Console

console1 = Console(color_system="auto") # auto为默认值，也可以不写
console2 = Console(color_system=None)  # 禁用颜色和样式

console1.print("Hello World!", style="red underline")
console2.print("Hello World!", style="red underline")
```

![image-20220722101030430](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220722101030430.png)

:::

::: details （4）颜色和样式用法的一点区别：default和not的区别

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

from rich.console import Console

console = Console()

# 部分字符串不使用颜色的话，应该使用 default，不能使用 not
print("[1] 正确设置部分字符串不使用颜色: ", end="")
console.print("[default]Hello[/default] World!", style="red")

print("[2] 错误设置部分字符串不使用颜色: ", end="")
console.print("[not red]Hello[/not red] World!", style="red")

console.rule("我是分割线")

# 部分字符串不使用样式的话，应该使用 not，不能使用 default
print("[1] 正确设置部分字符串不使用样式: ", end="")
console.print("[not underline]Hello [/not underline]World!", style="underline")

print("[2] 错误设置部分字符串不使用样式: ", end="")
console.print("[default]Hello [/default]World!", style="underline")
```

![image-20220722102415263](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220722102415263.png)

:::

::: details （5）将带样式的字符串转为普通字符串

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

from io import StringIO
from rich.console import Console

# 这是带样式的字符串
str_with_style = ""
for i in range(1, 1000):
    str_with_style += f"[{i}] [bold red]Hello[/] 世界!\n"

# 写入到内存型文件中
console = Console(file=StringIO())  # 实例化Console对象, 指定输出到 内存型文件中，而不是默认的sys.stdout
console.print(str_with_style)  # 输出到文件中

# 全部读取，大文本请注意内存消耗
# console.file.seek(0, 0)
# print(console.file.read())

# 按行读取
# console.file.seek(0, 0)  # 若要读取，必须先将文件指针移动到文件开头
# for line in console.file:  # 按行读取字符串
#     print(line, end="")

# 按字符读取
console.file.seek(0, 0)  # 若要读取，必须先将文件指针移动到文件开头
buffer = 1024
while True:
    str_data = console.file.read(buffer)  # 按字符读取，注意不是字节,若要按字节读使用 BytesIO
    if len(str_data) <= 0:
        break
    print(str_data, end="")
```

![image-20220722123739676](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220722123739676.png)

:::

##### 二 、使用样式类

文档：[https://rich.readthedocs.io/en/latest/style.html#style-class](https://rich.readthedocs.io/en/latest/style.html#style-class)

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

from rich.console import Console
from rich.style import Style

# 统一定义样式
DEFAULT_STYLE = Style()
HIGHTLIGHT_STYLE = Style(color="yellow", bold=True)

# 实例化控制台实例
console = Console()

# 输出
console.print("默认输出       : ", "Started Session 8125 of user root.", style=DEFAULT_STYLE, highlight=False)
console.print("自定义样式+高亮: ", "Started Session 8125 of user root.", style=HIGHTLIGHT_STYLE)
console.print("覆盖自定义样式 : ", "Started Session 8125 of user root.", style=HIGHTLIGHT_STYLE + Style(color="magenta", underline=True))
```

![image-20220722133201943](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220722133201943.png)

##### 三、使用主题类

文档：[https://rich.readthedocs.io/en/latest/style.html#style-themes](https://rich.readthedocs.io/en/latest/style.html#style-themes)

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

from rich.console import Console
from rich.style import Style
from rich.theme import Theme

custom_theme = Theme({
    "warning": Style(color="yellow"),
    "error": Style(color="red", bold=True)
})

# 实例化控制台实例
console = Console(theme=custom_theme)

# 输出
console.print("Invalid configuration value: failovermethod=priority in /etc/yum.repos.d/CentOS-Epel.repo", style="error")
console.print("Invalid configuration value: failovermethod=priority in /etc/yum.repos.d/CentOS-Epel.repo", style="error", highlight=False)

console.print("[warning]Started Session 8125 of user root.[/warning]")
console.print("[warning]Started Session 8125 of user root.[/warning]", highlight=False)
```

![image-20220722134404058](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220722134404058.png)



#### 状态动画



::: details 点击查看完整代码

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-


from time import sleep
from rich.console import Console

console = Console()
with console.status("[magenta]Covid detector booting up") as status:
    sleep(1)
    console.log("Importing advanced AI")
    sleep(1)
    console.log("Advanced Covid AI Ready")
    sleep(1)
    status.update(status="[bold blue] Scanning for Covid", spinner="earth")
    sleep(1)
    console.log("Found 10,000,000,000 copies of Covid32.exe")
    sleep(1)
    status.update(
        status="[bold red]Moving Covid32.exe to Trash",
        spinner="bouncingBall",
        spinner_style="yellow",
    )
    sleep(1)
console.print("[bold green]Covid deleted successfully")
```

:::

![pscpskebxvgi](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//pscpskebxvgi.gif)

#### Console Protocol

文档：[https://rich.readthedocs.io/en/latest/protocol.html](https://rich.readthedocs.io/en/latest/protocol.html)

::: details （1）__rich__类似于python内置的__repr__或__str__，适用于返回单个对象

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

from rich.console import Console
from dataclasses import dataclass


@dataclass
class Student1:
    id: int
    name: str
    age: int


@dataclass
class Student2:
    id: int
    name: str
    age: int

    def __rich__(self) -> str:
        return f"[magenta]{self.__class__.__name__}[/magenta]" \
               f"([cyan]id={self.id}, name=\'{self.name}\', age={self.age}[/cyan])"


user1 = Student1(100, "bob1", 20)
user2 = Student2(200, "bob2", 21)

console = Console(highlight=False)
console.print(user1)
console.print(user2)
```

![image-20220722161700672](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220722161700672.png)

:::

::: details （2）__rich_console__：适用于返回多个对象（返回生成器）

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-


from dataclasses import dataclass
from rich.console import Console, ConsoleOptions, RenderResult
from rich.table import Table


@dataclass
class Student:
    id: int
    name: str
    age: int


class Team:
    def __init__(self):
        self.students = []

    def add(self, student: Student):
        '''添加成员'''
        self.students.append(student)
        return self

    def __rich_console__(self, console: Console, options: ConsoleOptions) -> RenderResult:
        # Table实例化
        student_table = Table(title="班级表")

        # 添加列
        student_table.add_column("ID")
        student_table.add_column("Name")
        student_table.add_column("Age")

        # 遍历所有学生，添加行
        for student in self.students:
            # ID标蓝
            id = f"[#87ceeb]{student.id}[/#87ceeb]"

            # 若年龄大于等于19岁，则输出标红
            if student.age >= 19:
                age = f"[red]{student.age}[/red]"
            else:
                age = str(student.age)

            student_table.add_row(id, student.name, age)

        # 返回生成器
        yield student_table


user1 = Student(1, "bob", 19)
user2 = Student(2, "jack", 20)
user3 = Student(3, "alien", 18)

team = Team().add(user1).add(user2).add(user3)

console = Console()

console.print(team)  # 这将返回一张可以任意自定义的表格
```

![image-20220722174954347](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220722174954347.png)

:::



### 表格对象

文档：[https://rich.readthedocs.io/en/latest/tables.html](https://rich.readthedocs.io/en/latest/tables.html)
