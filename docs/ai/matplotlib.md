# Matplotlib

官网：[https://matplotlib.org/](https://matplotlib.org/)

## 安装

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

## 快速绘图（pyplot）

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

