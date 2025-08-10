# Tkinter

文档：[https://docs.python.org/3.11/library/tkinter.html](https://docs.python.org/3.11/library/tkinter.html)

<br />

## 基础操作

### 开始运行

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

import tkinter as tk


class App(tk.Tk):
    def __init__(self):
        super().__init__()


app = App()
app.mainloop()
```

<br />

### 设置窗口大小和位置

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

import tkinter as tk


class App(tk.Tk):
    def __init__(self):
        super().__init__()

        # 获取屏幕最大长宽
        width, height = self.maxsize()

        # 计算
        w = int((width - 480) / 2)
        h = int((height - 240) / 2)

        # 设置窗口大小为480x240
        # 第三个参数代表窗口左上角距离屏幕左侧的距离
        # 第四个参数代表窗口左上角距离屏幕顶部的距离
        self.geometry(f'480x240+{w}+{h}')


app = App()
app.mainloop()
```

<br />

### 设置窗口标题

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

import tkinter as tk


class App(tk.Tk):
    def __init__(self):
        super().__init__()

        self.title("Hello")


app = App()
app.mainloop()
```

<br />

### 设置窗口图标

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

import tkinter as tk


class App(tk.Tk):
    def __init__(self):
        super().__init__()

        # 方式一: 使用ico格式的文件
        self.iconbitmap("icon.ico")

        # 方式二: 使用PNG格式的文件, 第一个参数代表上层窗口是否也会使用此图标
        self.iconphoto(False, tk.PhotoImage(file="a.png"))

app = App()
app.mainloop()
```

<br />

### 设置窗口缩放

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

import tkinter as tk


class App(tk.Tk):
    def __init__(self):
        super().__init__()

        # 设置窗口大小不可缩放
        self.resizable(width=False, height=False)


app = App()
app.mainloop()
```

<br />

### 设置窗口置顶

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

import tkinter as tk


class App(tk.Tk):
    def __init__(self):
        super().__init__()

        # 锁定窗口置顶
        self.wm_attributes('-topmost', 1)

        # 释放窗口置顶
        # self.wm_attributes('-topmost', 0)


app = App()
app.mainloop()
```

<br />

### 隐藏窗口边框

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-
import time
import tkinter as tk


class App(tk.Tk):
    def __init__(self):
        super().__init__()

        # 隐藏窗口标题栏、边框、最大化、最小化、关闭按钮等
        # 使得窗口失去一些常规的窗口行为，包括移动、关闭、最大化、最小化等
        # 这可能会影响用户体验，因此请谨慎使用
        # 注: 在任务栏中也看不到应用
        self.overrideredirect(True)


app = App()
app.mainloop()
```

