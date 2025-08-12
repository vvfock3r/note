# 数据处理与科学计算基础

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

## SymPy

<br />

## Pandas

<br />

## Dask

<br />

## Polars

<br />

# 数据可视化

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
	# 设置Matplotlib支持中文字体
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
axes[0, 0].plot(x, y)  # 画曲线
axes[0, 0].set_title("Sine Wave")  # 设置坐标轴标题
axes[0, 0].set_xlabel("X axis")  # 设置 X 轴标签
axes[0, 0].set_ylabel("Y axis")  # 设置 Y 轴标签

# 第二个图画向量
# 1.quiver用来绘制箭头（向量）, 0,0 代表箭头的起点坐标, a[0]代表终点的x轴, a[1]代表终点的y轴, x和y参数是分开写的
# 2.angles='xy' 指定箭头方向角度的解释方式, 'xy' 表示箭头的方向角度是基于数据坐标系（x, y 坐标轴）计算的
# 3.scale_units='xy' 指定箭头的缩放单位参照, 'xy' 表示箭头的长度单位与坐标轴的 x,y 单位一致
# 4.scale=1 缩放因子，用来控制箭头的长度, scale=1 表示箭头长度和向量大小一一对应，不做额外缩放
# 3.color设置颜色, label设置了用 LaTeX 语法显示向量符号
a = np.array([2, 4])  # 向量a
axes[0, 1].set_xlim(-1, 5)  # 限定x轴的显示范围是从 -1 到 5
axes[0, 1].set_ylim(-1, 5)  # 限定y轴的显示范围是从 -1 到 5
axes[0, 1].grid(True)  # 显示网格
axes[0, 1].quiver(0, 0, a[0], a[1], angles='xy', scale_units='xy', scale=1, color='blue', label=r'$\vec{a}$')  # 画向量
axes[0, 1].legend(loc='upper left')  # 显示图例并设置位置

# 第三个图一次性画多个向量, 看一下写法有什么不同
# 第一个参数是两条线条的起点的x坐标, 第二个参数是起点的y坐标
# 第三个参数是终点的x坐标, 第四个参数是终点的y坐标
# 注意他们是所有的x写到一块, 所有的y写到一块去的
b = np.array([[1, 3], [3, 5]])
axes[1, 0].set_xlim(-1, 5)  # 限定x轴的显示范围是从 -1 到 5
axes[1, 0].set_ylim(-1, 5)  # 限定y轴的显示范围是从 -1 到 5
axes[1, 0].grid(True)  # 显示网格
axes[1, 0].quiver([0, 0], [0, 0], b[:, 0], b[:, 1], angles='xy', scale_units='xy', scale=1,
                  color=['blue', "red"], label=r'$\vec{a}$')  # 画向量
axes[1, 0].legend(loc='upper left')  # 显示图例并设置位置

# 第四张图画任意箭头: annotate方法, 待补充
axes[1, 1].set_xlim(-1, 5)
axes[1, 1].set_ylim(-1, 5)
axes[1, 1].grid(True)
axes[1, 1].annotate('', xy=(2, 3), xytext=(0, 0), arrowprops=dict(arrowstyle='->', color='blue', lw=2))

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

<br />

# 传统机器学习

## Sklearn

### 安装

```bash
pip install -U scikit-learn
```

<br />

# 深度学习框架

## PyTorch

<br />

## FastAI

<br />

#  图像处理与计算机视觉

<br />

## Pillow (PIL)

<br />

## scikit-image

### 安装

```bash
pip install -U scikit-image
```

<br />

### 内置测试图片

::: details （1）查看内置图片所在的目录

```python
import os
import skimage

print(os.path.join(os.path.dirname(skimage.__file__), 'data'))
```

截图如下

![image-20250812180009752](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20250812180009752.png)

**内置图片说明**

| 图片名                | 类型 | 特点简介                       | 典型应用场景                           |
| --------------------- | ---- | ------------------------------ | -------------------------------------- |
| **camera**            | 灰度 | 经典人像图，512x512，细节丰富  | 图像滤波、边缘检测、压缩、复原测试     |
| **coins**             | 灰度 | 多个硬币散落，带明显边缘       | 图像分割（阈值分割、边缘检测）、形态学 |
| **astronaut**         | 彩色 | 彩色人像，色彩丰富             | 颜色空间转换、色彩增强、纹理分析       |
| **chelsea**           | 彩色 | 彩色猫咪图片                   | 图像分割、颜色空间实验                 |
| **coffee**            | 彩色 | 咖啡杯和桌面细节丰富           | 纹理分析、图像增强                     |
| **text**              | 灰度 | 黑白文字，清晰对比             | 二值化、OCR预处理、边缘检测            |
| **page**              | 灰度 | 文本文档扫描图                 | 噪声去除、二值化、图像复原             |
| **brick**             | 灰度 | 砖块纹理图                     | 纹理分析、周期图案检测                 |
| **grass**             | 灰度 | 草地纹理                       | 纹理分割、纹理特征提取                 |
| **gravel**            | 灰度 | 石子路面随机纹理               | 纹理识别、聚类实验                     |
| **clock**             | 彩色 | 彩色时钟图片                   | 形状检测（圆形）、边缘提取             |
| **hubble_deep_field** | 彩色 | 天文深空图（需联网下载）       | 天文图像分析、目标检测                 |
| **human_mitosis**     | 彩色 | 显微镜下细胞分裂过程（需联网） | 医学图像分割、细胞计数                 |
| **retina**            | 彩色 | 视网膜图像                     | 医学图像分析、血管分割                 |

**展示内置图片**

```python
import skimage
import matplotlib.pyplot as plt

# 加载内置图片chelsea(一张小猫咪图片), 返回值是Numpy数组类型
image = skimage.data.cat()

# 显示图片
plt.imshow(image)
plt.axis("off")  # 不显示坐标轴
plt.title("Cat")
plt.show()
```

![image-20250812183045042](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20250812183045042.png)

:::

::: details （2）下载完整数据集（数据集很少）

```bash
# 安装pooch库
pip install -U pooch

# 交互式界面输入 或者 写入到Python脚本执行也可以
>>> from skimage.data import download_all
>>> download_all()
```

使用示例

```python
import pooch
import numpy as np
import matplotlib.pyplot as plt
from pathlib import Path

# 获取scikit-image缓存的根目录
cache_dir = pooch.os_cache("scikit-image")

# 你要找的相对路径（根据你的文件层级）
relative_path = Path("0.25.2/color/tests/data/lab_array_a_2.npy")

# 拼接成绝对路径
file_path = cache_dir / relative_path

print("缓存目录: ", cache_dir)
print("示例文件:", file_path)

# 展示文件
img = np.load(file_path)
plt.imshow(img)
plt.axis('off')
plt.show()
```

![image-20250812183343523](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20250812183343523.png)

:::

<br />

### 颜色空间转换

`scikit-image` 本身并不“识别”图像文件的颜色空间信息，它提供了`RGB` 颜色空间转为其他颜色空间的方法，适用于整张图片颜色空间转换。

如果只是做简单的像素点颜色空间转换，使用Python标准库`colorsys`就够了

**颜色空间对比**

| 颜色空间             | 是否给人看（适合直接显示） | 主要用途/应用领域                  | 备注                                     |
| -------------------- | -------------------------- | ---------------------------------- | ---------------------------------------- |
| **RGB**              | 是                         | 显示设备（显示器、手机屏幕、相机） | 最常用的“屏幕色彩”空间，直接显示友好     |
| **CMYK**             | 否                         | 印刷领域                           | 用于印刷油墨调配，不适合屏幕直接显示     |
| **HSV/HSL**          | 否（不完全适合）           | 颜色分析、调色、图像处理           | 方便色调分离和调节，但数值不适合直接显示 |
| **Lab**              | 否                         | 颜色校正、色差计算、色彩管理       | 感知均匀空间，计算颜色差异，人眼感知近似 |
| **LUV**              | 否                         | 色彩科学、颜色转换                 | 与Lab类似，主要用于计算                  |
| **XYZ**              | 否                         | 颜色科学标准空间                   | 设备无关的颜色标准，不适合直接显示       |
| **YUV/YCbCr**        | 否                         | 视频编码、传输                     | 分离亮度和色度，适合压缩编码             |
| **Grayscale (灰度)** | 是                         | 黑白显示、图像分析                 | 单通道，直接显示黑白图像                 |
| **RGBA**             | 是                         | 含透明通道的显示                   | RGB基础上加透明度，适合直接显示          |

::: details 同一张图片在不同颜色空间下展示

```python
import matplotlib.pyplot as plt
from skimage import data, color

if __name__ == "__main__":
	# 设置Matplotlib支持中文字体
    plt.rcParams['font.sans-serif'] = ['SimHei']  # 设置中文字体为黑体
    plt.rcParams['axes.unicode_minus'] = False    # 正常显示负号

    # 加载内置猫图片（RGB）
    img_rgb = data.cat()

    # 转换为灰度图
    img_gray = color.rgb2gray(img_rgb)

    # 转换为 HSV
    img_hsv = color.rgb2hsv(img_rgb)

    # 转换为 Lab
    img_lab = color.rgb2lab(img_rgb)

    # 显示图片
    fig, axes = plt.subplots(2, 2, figsize=(10, 8))

    axes[0][0].imshow(img_rgb)
    axes[0][0].set_title('RGB 原图')
    axes[0][0].axis('off')

    axes[0][1].imshow(img_gray, cmap='gray')
    axes[0][1].set_title('灰度图')
    axes[0][1].axis('off')

    axes[1][0].imshow(img_hsv)
    axes[1][0].set_title('HSV 图')
    axes[1][0].axis('off')

    # Lab 图数值范围较大，归一化显示
    axes[1][1].imshow((img_lab - img_lab.min()) / (img_lab.max() - img_lab.min()))
    axes[1][1].set_title('Lab 图（归一化显示）')
    axes[1][1].axis('off')

    plt.tight_layout()
    plt.show()
```

![image-20250812185356403](C:\Users\VVFock3r\AppData\Roaming\Typora\typora-user-images\image-20250812185356403.png)

:::

::: details 检测鼠标当前位置是什么颜色（粗粒度判断）

```python
import time
import colorsys
import logging
import pyautogui

logging.basicConfig(level=logging.INFO,format='%(asctime)s [%(levelname)s] %(message)s',datefmt='%H:%M:%S')

def rgb_to_hsv(r, g, b):
    r, g, b = r / 255.0, g / 255.0, b / 255.0
    return colorsys.rgb_to_hsv(r, g, b)

# 不是很准, 可以根据实际情况调整
def hsv_to_color_name(h, s, v):
    if s < 0.1:
        return "灰色"
    if v < 0.2:
        return "黑色"
    if v > 0.9 and s < 0.2:
        return "白色"
    if (h >= 0 and h < 0.05) or (h > 0.95 and h <= 1):
        return "红色"
    elif h >= 0.05 and h < 0.15:
        return "橙色"
    elif h >= 0.15 and h < 0.4:
        return "黄色"
    elif h >= 0.4 and h < 0.6:
        return "绿色"
    elif h >= 0.6 and h < 0.75:
        return "青色"
    elif h >= 0.75 and h < 0.9:
        return "蓝色"
    else:
        return "紫色"

def get_mouse_color():
    start_time = time.time()

    x, y = pyautogui.position()
    img = pyautogui.screenshot(region=(x, y, 1, 1))
    r, g, b = img.getpixel((0, 0))
    h, s, v = rgb_to_hsv(r, g, b)
    color_name = hsv_to_color_name(h, s, v)

    end_time = time.time()
    elapsed_ms = (end_time - start_time) * 1000

    # 格式化输出，字段宽度固定，左对齐或右对齐根据情况
    log_msg = (f"位置: ({x:4d},{y:4d}) | "
               f"RGB: ({r:3d},{g:3d},{b:3d}) | "
               f"HSV: ({h:5.2f},{s:5.2f},{v:5.2f}) | "
               f"颜色: {color_name:<5} | "
               f"耗时: {elapsed_ms:7.2f} ms")

    logging.info(log_msg)

if __name__ == "__main__":
    logging.info("开始鼠标颜色检测，按 Ctrl+C 停止")
    try:
        while True:
            get_mouse_color()
            time.sleep(1)
    except KeyboardInterrupt:
        logging.info("程序已停止")
```

:::

<br />

## OpenCV

<br />
