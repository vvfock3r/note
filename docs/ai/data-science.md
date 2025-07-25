# Data Science

## NumPy



### 生成数值序列

::: details 折线图（Line Plot），表示数据随时间或其他变量变化的趋势

```python
import numpy as np

# 在线性空间中生成等间隔的数值序列

# 起点为10, 终点为100, 生成1000个浮点数, 默认会自动计算间距, 返回一个数组
# 其他参数:
#   endpoint = True 是否包含终点, 默认为True
#   retstep = False 是否返回间距（返回 tuple）, 默认为False
#   dtype           指定数据类型
#   axis            维度相关
#   device          如果使用 PyTorch，它允许你指定生成的设备（如 CPU 或 GPU）
x = np.linspace(-10, 10, 1000)
x = np.round(x, 2)  # 四舍五入保留两位小数, 方便我们观察
print(x)

print("\n" + "-" * 80)

# 如果你想手动控制间距, 起点为-10, 终点为10, 间距为0.1
# 注意:
#   1.这里生成的个数等于 (stop - start) / step, 在这里是200个, 这个数字是固定的
#   2.数组中最后一个值可能会超过stop, 比如设置 ,dtype = int
y = np.arange(-10, 10, 0.1)
y = np.round(y, 2)  # 四舍五入保留两位小数, 方便我们观察
print(y)
print(len(y))
```

输出结果

```bash
[-10.          -9.97997998  -9.95995996  -9.93993994  -9.91991992
  -9.8998999   -9.87987988  -9.85985986  -9.83983984  -9.81981982
  -9.7997998   -9.77977978  -9.75975976  -9.73973974  -9.71971972
   中间内容省略
   9.81981982   9.83983984   9.85985986   9.87987988   9.8998999
   9.91991992   9.93993994   9.95995996   9.97997998  10.        ]

--------------------------------------------------------------------------------

[-10.   -9.9  -9.8  -9.7  -9.6  -9.5  -9.4  -9.3  -9.2  -9.1  -9.   -8.9
  -8.8  -8.7  -8.6  -8.5  -8.4  -8.3  -8.2  -8.1  -8.   -7.9  -7.8  -7.7
  -7.6  -7.5  -7.4  -7.3  -7.2  -7.1  -7.   -6.9  -6.8  -6.7  -6.6  -6.5
  -6.4  -6.3  -6.2  -6.1  -6.   -5.9  -5.8  -5.7  -5.6  -5.5  -5.4  -5.3
  -5.2  -5.1  -5.   -4.9  -4.8  -4.7  -4.6  -4.5  -4.4  -4.3  -4.2  -4.1
  -4.   -3.9  -3.8  -3.7  -3.6  -3.5  -3.4  -3.3  -3.2  -3.1  -3.   -2.9
  -2.8  -2.7  -2.6  -2.5  -2.4  -2.3  -2.2  -2.1  -2.   -1.9  -1.8  -1.7
  -1.6  -1.5  -1.4  -1.3  -1.2  -1.1  -1.   -0.9  -0.8  -0.7  -0.6  -0.5
  -0.4  -0.3  -0.2  -0.1  -0.    0.1   0.2   0.3   0.4   0.5   0.6   0.7
   0.8   0.9   1.    1.1   1.2   1.3   1.4   1.5   1.6   1.7   1.8   1.9
   2.    2.1   2.2   2.3   2.4   2.5   2.6   2.7   2.8   2.9   3.    3.1
   3.2   3.3   3.4   3.5   3.6   3.7   3.8   3.9   4.    4.1   4.2   4.3
   4.4   4.5   4.6   4.7   4.8   4.9   5.    5.1   5.2   5.3   5.4   5.5
   5.6   5.7   5.8   5.9   6.    6.1   6.2   6.3   6.4   6.5   6.6   6.7
   6.8   6.9   7.    7.1   7.2   7.3   7.4   7.5   7.6   7.7   7.8   7.9
   8.    8.1   8.2   8.3   8.4   8.5   8.6   8.7   8.8   8.9   9.    9.1
   9.2   9.3   9.4   9.5   9.6   9.7   9.8   9.9]
200
```



:::

<br />

## SciPy

<br />

## Pandas

<br />

## Sklearn

<br />

## Matplotlib

官网：[https://matplotlib.org/](https://matplotlib.org/)

### 安装

```bash
pip install matplotlib
```

`matplotlib` 库可以分为以下几个主要模块：

1. **pyplot**：用于快速绘制图形，适合大部分用户。
2. **Artist**：管理绘图元素（如线条、矩形等）。
3. **Axes 和 Figure**：管理图表布局和坐标轴。
4. **Colormap**：处理颜色映射和色标。
5. **Statistical Plots**：绘制统计图表。
6. **Animation**：用于创建动画和动态图形。
7. **3D Plots**：支持三维图形绘制。
8. **Backends**：负责图形渲染和输出。
9. **Text and Annotations**：用于添加文本和注释。
10. **Utility Functions**：图形调整和辅助函数。

每个模块的功能协作，使得 `matplotlib` 成为一个强大的数据可视化工具

<br />

### 显示中文问题

默认情况下显示中文会有问题, 添加如下代码解决

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

import matplotlib.pyplot as plt

if __name__ == "__main__":
	# 设置支持中文字体
    plt.rcParams['font.sans-serif'] = ['SimHei']  # 设置中文字体为黑体
    plt.rcParams['axes.unicode_minus'] = False    # 正常显示负号
```

<br />

### 绘制常见图形

::: details 折线图（Line Plot），表示数据随时间或其他变量变化的趋势

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

import matplotlib.pyplot as plt

if __name__ == "__main__":
    # 定义数据, 分别代表X轴和Y轴的数值
    x = [1, 2, 3, 4, 5]
    y = [2, 3, 5, 7, 11]

    # 设置支持中文字体
    plt.rcParams['font.sans-serif'] = ['SimHei']  # 设置中文字体为黑体
    plt.rcParams['axes.unicode_minus'] = False  # 正常显示负号

    # 功能：plot方法将一组数据点连接成一条线，并根据指定的样式绘制出来
    # 返回：一个或多个 Line2D 对象。每个 Line2D 对象代表绘制的图形中的一条线
    # 参数：
    #   x                横坐标数据（必选）
    #   y                纵坐标数据（必选）
    #   label            图例中显示的标签
    #   color 或 c       设置线条或标记的颜色
    #   linewidth 或 lw  设置线条的宽度
    #   linestyle 或 ls  设置线条的样式
    #   marker           设置每个数据点的标记类型
    #   format_string    用于指定图形的颜色、线型、标记等
    #                       r- 表示红色实线
    #                       b--表示蓝色虚线
    #                       g.表示绿色点标记
    #                       k:表示黑色点线
    plt.plot(x, y, label="Line Plot")

    # 设置X轴和Y轴的标签（即横坐标的描述文字）
    plt.xlabel("X坐标")
    plt.ylabel("Y坐标")

    # 设置图表的标题
    plt.title("Line Plot Example")

    # 显示图例
    plt.legend()

    # 显示图表, 这会弹出一个窗口，显示我们画的图
    plt.show()

```

:::

::: details 柱状图（Bar Chart），表示不同类别的数据对比

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

import matplotlib.pyplot as plt

if __name__ == "__main__":
    categories = ['A', 'B', 'C', 'D']
    values = [3, 7, 5, 2]

    plt.bar(categories, values, color='blue', label="Bar Chart")
    plt.xlabel("Categories")
    plt.ylabel("Values")
    plt.title("Bar Chart Example")
    plt.legend()
    plt.show()
```

:::

::: details 散点图 (Scatter Plot)，用于显示两个变量之间的关系，适合显示离散的点

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

import matplotlib.pyplot as plt

if __name__ == "__main__":
    x = [1, 2, 3, 4, 5]
    y = [2, 4, 6, 8, 10]

    plt.scatter(x, y, color='red', label="Scatter Plot")
    plt.xlabel("X")
    plt.ylabel("Y")
    plt.title("Scatter Plot Example")
    plt.legend()
    plt.show()

```

:::

::: details 直方图 （Histogram），用于展示数据的分布，显示数据的频率

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

import numpy as np
import matplotlib.pyplot as plt

if __name__ == "__main__":
    # 生成 1000 个标准正态分布的随机数据
    data = np.random.randn(1000)

    plt.hist(data, bins=30, color='green', edgecolor='black', label="Histogram")
    plt.xlabel("Value")
    plt.ylabel("Frequency")
    plt.title("Histogram Example")
    plt.legend()
    plt.show()
```

:::

::: details 饼图 （Pie Chart），用于显示各部分占整体的比例

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

import matplotlib.pyplot as plt

if __name__ == "__main__":
    labels = ['A', 'B', 'C', 'D']
    sizes = [20, 30, 40, 10]

    plt.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=90, colors=['yellow', 'orange', 'red', 'green'])
    plt.title("Pie Chart Example")
    plt.show()

```

:::

::: details 箱线图（Box Plot），用于展示数据的分布情况，包括最小值、最大值、中位数等

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

import numpy as np
import matplotlib.pyplot as plt

if __name__ == "__main__":
    # 生成 10 组数据，每组包含 5 个数据
    data = np.random.rand(10, 5)

    plt.boxplot(data, patch_artist=True, boxprops=dict(facecolor='skyblue', color='black'))
    plt.title("Box Plot Example")
    plt.show()

```

:::

::: details 热力图 （Heatmap），用于显示二维数据的热度，常用于展示矩阵数据

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

import numpy as np
import matplotlib.pyplot as plt

if __name__ == "__main__":
    # 生成 10x10 的随机数据矩阵
    data = np.random.rand(10, 10)

    plt.imshow(data, cmap='hot', interpolation='nearest')
    plt.colorbar(label="Value")
    plt.title("Heatmap Example")
    plt.show()

```

:::

::: details 密度图（KDE Plot），用于估计并显示数据的概率密度

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

if __name__ == "__main__":
    data = np.random.randn(1000)

    sns.kdeplot(data, shade=True, color='red')
    plt.title("KDE Plot Example")
    plt.show()

```

:::

::: details 极坐标图（Polar Plot），用于显示极坐标系统中的数据，适合展示周期性数据

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

import numpy as np
import matplotlib.pyplot as plt

if __name__ == "__main__":
    theta = np.linspace(0, 2 * np.pi, 100)
    r = np.sin(theta)  # 生成极坐标数据

    plt.polar(theta, r, label="Polar Plot")
    plt.title("Polar Plot Example")
    plt.legend()
    plt.show()

```

:::

::: details 堆叠图（Stacked Plot），用于展示多个数据系列的累积值

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

import numpy as np
import matplotlib.pyplot as plt

if __name__ == "__main__":
    x = np.linspace(0, 10, 100)
    y1 = np.sin(x)
    y2 = np.cos(x)

    plt.stackplot(x, y1, y2, labels=['sin(x)', 'cos(x)'], alpha=0.6)
    plt.title("Stacked Plot Example")
    plt.legend(loc='upper left')
    plt.show()

```

:::

<br />

### 布局和坐标轴

::: details （1）布局示例

```python
import matplotlib.pyplot as plt
import numpy as np

# 创建一个图像窗口
# matplotlib.figure.Figure 对象是 Matplotlib 中的图像窗口或画布，是所有图表的“容器”，你看到的图表最终都画在一个 Figure 上
# figsize=(width, height), 单位为英寸, 因为 matplotlib 的设计初衷是高质量排版输出（如 PDF）
fig = plt.figure(figsize=(10, 8))

# 设置左上角标题, 默认值一般是 Figure 1
fig.canvas.manager.set_window_title("这里是标题")

# add_subplot 用来添加子图, 在这里我们一个窗口中包含4个图像, 分为2行和2列
# add_subplot 第一个参数代表整个窗口分为2行
# add_subplot 第二个参数代表整个窗口分为2列
# add_subplot 第三个参数代表当前正在添加第几个子图
# 备注: 
#   1.add_subplot() 添加的一定是坐标轴（Axes）对象
#   2.也可以写成 fig.add_subplot(221) 这种形式
row, col = 2, 2
ax1 = fig.add_subplot(row, col, 1)  # 第1行第1列
ax2 = fig.add_subplot(row, col, 2)  # 第1行第2列
ax3 = fig.add_subplot(row, col, 3)  # 第2行第1列
ax4 = fig.add_subplot(row, col, 4)  # 第2行第2列

# 绘制不同内容
x = np.linspace(0, 10, 100)
ax1.plot(x, np.sin(x))
ax1.set_title("sin(x)")

ax2.plot(x, np.cos(x))
ax2.set_title("cos(x)")

ax3.plot(x, np.tan(x))
ax3.set_ylim(-5, 5)
ax3.set_title("tan(x)")

ax4.plot(x, np.exp(-x))
ax4.set_title("exp(-x)")

# 自动调整子图间距并显示
plt.tight_layout()
plt.show()
```

![image-20250723223620209](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20250723223620209.png)

:::

::: details （2）坐标常用参数

```python
import matplotlib.pyplot as plt
import numpy as np

# 创建图像窗口, 并添加一个坐标轴（1行1列的第1个）
# fig = plt.figure(figsize=(宽度, 高度))
# ax = fig.add_subplot(111)

# 可以简写成如下代码, 这里是2行2列, axes[0, 1] 访问第1行第2列的子图
fig, axes = plt.subplots(nrows=2, ncols=2, figsize=(12, 8))


# 第一个图画线条
x = np.linspace(0, 10, 100)
y = np.sin(x)
axes[0, 0].plot(x, y)             # 画曲线
axes[0, 0].set_title("Sine Wave") # 设置坐标轴标题
axes[0, 0].set_xlabel("X axis")   # 设置 X 轴标签
axes[0, 0].set_ylabel("Y axis")   # 设置 Y 轴标签

# 第二个图画向量
# 1.quiver用来绘制箭头（向量）, 0,0 代表箭头的起点坐标, a[0], a[1]箭头指向的终点
# 2.angles='xy' 指定箭头方向角度的解释方式, 'xy' 表示箭头的方向角度是基于数据坐标系（x, y 坐标轴）计算的
# 3.scale_units='xy' 指定箭头的缩放单位参照, 'xy' 表示箭头的长度单位与坐标轴的 x,y 单位一致
# 4.scale=1 缩放因子，用来控制箭头的长度, scale=1 表示箭头长度和向量大小一一对应，不做额外缩放
# 3.color设置颜色, label设置了用 LaTeX 语法显示向量符号
a = np.array([2, 4])              # 向量a
axes[0, 1].set_xlim(-1, 5)        # 限定x轴的显示范围是从 -1 到 5
axes[0, 1].set_ylim(-1, 5)        # 限定y轴的显示范围是从 -1 到 5
axes[0, 1].grid(True)             # 显示网格
axes[0, 1].quiver(0, 0, a[0], a[1], angles='xy', scale_units='xy', scale=1, color='blue', label=r'$\vec{a}$') # 画向量
axes[0, 1].legend(loc='upper left')  # 显示图例并设置位置

# 第三个图画矩形，等待补充


# 自动调整子图间距并显示
plt.tight_layout()
plt.show()
```

:::

<br />

### 任意函数曲线

::: details （1）基本用法

```python
import numpy as np
import matplotlib.pyplot as plt


# 定义任意函数，比如 f(x) = sin(x) + 0.5x
def f(x):
    return np.sin(x) + 0.5 * x


# 生成自变量的值，比如从 -10 到 10，共 1000 个点
x = np.linspace(-10, 10, 1000)

# 计算函数值
y = f(x)

# 画图
plt.plot(x, y, label='f(x) = sin(x) + 0.5x', color='blue')  # 可以修改颜色和标签
plt.xlabel('x')  # x 轴标签
plt.ylabel('f(x)')  # y 轴标签
plt.title('Plot of f(x)')  # 图标题
plt.grid(True)  # 添加网格线
plt.legend()  # 显示图例
plt.show()
```

:::

::: details （2）抛物线：开口向上

```python
import numpy as np
import matplotlib.pyplot as plt


# 定义任意函数，比如 f(x) = sin(x) + 0.5x
def f(x):
    return x ** 2


# 生成自变量的值，比如从 -10 到 10，共 1000 个点
x = np.linspace(-10, 10, 1000)

# 计算函数值
y = f(x)

# 画图
plt.plot(x, y, label='f(x) = sin(x) + 0.5x', color='blue')  # 可以修改颜色和标签
plt.xlabel('x')  # x 轴标签
plt.ylabel('f(x)')  # y 轴标签
plt.title('Plot of f(x)')  # 图标题
plt.grid(True)  # 添加网格线
plt.legend()  # 显示图例
plt.show()
```

:::

::: details （3）抛物线：开口向下

```python
import numpy as np
import matplotlib.pyplot as plt


# 定义任意函数，比如 f(x) = sin(x) + 0.5x
def f(x):
    return -x ** 2


# 生成自变量的值，比如从 -10 到 10，共 1000 个点
x = np.linspace(-10, 10, 1000)

# 计算函数值
y = f(x)

# 画图
plt.plot(x, y, label='f(x) = sin(x) + 0.5x', color='blue')  # 可以修改颜色和标签
plt.xlabel('x')  # x 轴标签
plt.ylabel('f(x)')  # y 轴标签
plt.title('Plot of f(x)')  # 图标题
plt.grid(True)  # 添加网格线
plt.legend()  # 显示图例
plt.show()
```

:::

::: details （4）抛物线：开口向左或者右

```python
import numpy as np
import matplotlib.pyplot as plt

# 定义 y 范围
y = np.linspace(-10, 10, 500)

# 横向抛物线, ×0.2 的作用是为了缩放抛物线的开口宽度
# 如果需要改变开口方向, 将下面的任意一个值修改为负数即可
x = y ** 2 * 0.2

plt.plot(x, y, label='Right: x = y^2')
plt.axhline(0, color='black', linewidth=0.5)
plt.axvline(0, color='black', linewidth=0.5)
plt.xlabel('x')
plt.ylabel('y')
plt.title('Right')
plt.grid(True)
plt.legend()
plt.gca().set_aspect('equal', adjustable='box')  # 保持比例
plt.show()
```

:::
