# 线性代数

## Latex

Latex：[https://www.latex-project.org/](https://www.latex-project.org/)

### Typora说明

**1.默认情况下Typora不启用内联公式，可以将功能打开**

文件 ---> 偏好设置 ---> Markdown ---> 启用内联公式，测试语句：这是一个行内公式： $E = mc^2$

**2.Latex语法格式**

* **行内公式**: 用 `$...$` 包裹
* **行间公式**：用 `$$...$$` 包裹

**3.```latex说明**

在 **Typora** 中，使用 ````latex` 并不会渲染成 LaTeX 公式，因为这个语法并不是为公式渲染设计的，而是用于 **代码块**

````latex` 是 Markdown 中用于显示 **代码块** 的语法，尤其是当你想显示 LaTeX 代码的原始文本时（例如写数学公式的源代码），而不是渲染它们

**4.渲染说明**

Typora 使用 **MathJax** 或 **KaTeX** 渲染 LaTeX 数学公式，但它并不渲染 LaTeX 的其他文档结构元素（如列表、定理等）

<br />

### 换行和注释

* 换行：`\\` 用来强制换行（个人习惯，推荐空一格再写`\\`）
* 注释：`%` 后面的会被注释

```latex
a \\ b%c
```


$$
a\\b%c
$$
<br />

### 文本格式化

* **加粗**: `\textbf{加粗文本}`
* **斜体**: `\textit{斜体文本}`
* **下划线**: `\underline{下划线文本}`
* **小号字体**: `\small{小字体}`
* **大号字体**: `\Large{大字体}`
* **打字机字体**: `\texttt{打字机字体}`

```latex
\textbf{加粗} \\
\textit{斜体} \\
\underline{下划线} \\
\small{小字体} \\
\Large{大字体} \\
\texttt{打字机字体}
```


$$
\textbf{加粗} \\
\textit{斜体} \\
\underline{下划线} \\
\small{小字体} \\
\Large{大字体} \\
\texttt{打字机字体}
$$

<br />

### 颜色设置

$$
\text{1.字体颜色} \\
\textcolor{red}{E = mc^2} \\ 			% 设置字体颜色, 使用标准颜色名称
\textcolor[RGB]{255,0,0}{E = mc^2} \\   % 设置字体颜色, 使用RGB
\color{blue} {a^2 + b^2 = c^2} \\       % 另一种设置颜色的方法
\\
\\
\cellcolor{red}\text{2.背景颜色} \\
\begin{bmatrix}
\cellcolor{yellow} 1 & 2 \\
3 & 4 
\end{bmatrix}
$$



<br />

### 数学符号

* **加法与减法**: `+`, `-`
* **乘法与除法**: `\times`, `\div`
* **分数**: `\frac{a}{b}`
* **平方根**: `\sqrt{a}`
* **指数**: `a^b`
* **上下标**: `a_{i}`, `a^{i}`

```latex
a + b \\       % 加法
a - b \\       % 减法
a \times b \\  % 乘法
a \div b  \\   % 除法
\frac{1}{2} \\ % 分数
\sqrt{25}  \\  % 平方根
x^3  \\        % 指数
a^{2} \\       % 上标
a_{2} \\       % 下标
```


$$
a + b \\       % 加法
a - b \\       % 减法
a \times b \\  % 乘法
a \div b  \\   % 除法
\frac{1}{2} \\ % 分数
\sqrt{25}  \\  % 平方根
x^3  \\        % 指数
a^{2} \\       % 上标
a_{2} \\       % 下标
$$

<br />

### 方程组

```latex
\text{二元一次方程组} \\
\begin{cases}
2x + 3y = 5 \\
x - y = 1
\end{cases}
```

$$
\text{二元一次方程组} \\
\begin{cases}
2x + 3y = 5 \\
x - y = 1
\end{cases}
$$



<br />

### 向量

$$
\vec{v} = [v_1, v_2]\\

\\

\vec{v} = \begin{pmatrix} v_1 \\ v_2 \end{pmatrix}\\
$$



### 矩阵

* **无括号矩阵 matrix**

$$
\begin{matrix}
1 & 2 & 3 \\
4 & 5 & 6
\end{matrix}

% & 是用来分隔 列 的符号
$$

* **带括号矩阵 pmatrix**

$$
\begin{pmatrix}
1 & 2 & 3 \\
4 & 5 & 6
\end{pmatrix}
$$

* **对称矩阵 bmatrix**

$$
\begin{bmatrix}
1 & 2 \\
2 & 3
\end{bmatrix}
$$

* **行列式（单竖线）vmatrix**

$$
\begin{vmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9
\end{vmatrix}
$$

* **行列式（双竖线）Vmatrix**

$$
\begin{Vmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9
\end{Vmatrix}
$$

* **小型矩阵，适用于紧凑型排版 smallmatrix**

$$
\begin{smallmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9
\end{smallmatrix}
$$

* **通用表格和矩阵环境 array**

$$
\begin{array}{clr}  
1 & 20 & 30 \\
4 & 5 & 6 \\
7 & 8 & 9
\end{array}

% {clr}代表每一列的对齐
% c 代表 centered（居中对齐）
% l 代表 left-aligned（左对齐）
% r 代表 right-aligned（右对齐）
$$

<br />

### 表格

* **`|`** 用于添加竖线
* **`\hline`** 用于添加水平线

$$
\begin{array}{|c|c|}
\hline
1 & 2 \\
\hline
& 3 \\ & 4 \\   % 模拟合并单元格的情况
\hline
\end{array}
$$



<br />

## 三角形（Triangle）

### 简介

**1.三角形的分类**

按边分类：

- **一般三角形**：三边长度不同。
- **等腰三角形**：两条边相等。
- **等边三角形**：三条边相等（也是等腰三角形的一种特殊情况）,三个角都是 60度

按角分类：

- **锐角三角形**：三个角均小于 90°。
- **直角三角形**：其中一个角是 90°。
- **钝角三角形**：其中一个角大于 90°。

**2.三角形的基本性质**

* 三角形的三个内角之和总是 180°
* 三角形的任意一个外角等于与它不相邻的两个内角之和
* 任意两边之和大于第三边，任意两边之差小于第三边

**3.三角形的面积计算**
$$
已知底和高: S = \frac{1}{2} \times \text{底} \times \text{高}\\\\
已知三边边长: S = \sqrt{s(s-a)(s-b)(s-c)}\\
其中，s = \frac{a+b+c}{2}
$$


<br />

### 直角三角形：基础概念

**基本定义**

* 除直角（90°）外的另外两个角**一定都是锐角**（即小于90°的角），θ 可表示一个锐角
* 直角三角形中，给三条边起个名字，分别称为斜边、临边和对边，如何区分见下图（注意只适用于直角三角形）

**图形说明**

![image-20250331134832886](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20250331134832886.png)

<br />

### 直接三角形：勾股定理

**说明：勾股定理（Pythagorean Theorem）只适用于直角三角形**

**1.判断一个三角形是否为直角三角形**
$$
\text{如果三边 } a, b, c \text{ 满足 } a^2 + b^2 = c^2 \text{，则是直角三角形。}
$$
**2.求解直角三角形的边长**
$$
c = \sqrt{a^2 + b^2} \\
$$
**3.计算斜边上的中线**
$$
m = \frac{c}{2}\\
其中：c 是斜边的长度,m 是斜边上的中线长度。
$$


<br />

### 直角三角形：长度比例

如果我们想知道任意两条边的长度比例关系，用θ 表示任意一个锐角，则有 sinθ 、cosθ 和tanθ 这些数据表示其边长比例

反过来，知道锐角角度和部分边长，就可以求出另一条边边长

![image-20250331145122956](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20250331145122956.png)

<br />

### 任意三角形：计算角度

正弦、余弦、正切等函数注重的长度比例，而无法计算角度，余弦定义则引入了角度计算

**公式**
$$
余弦定理的公式：\\
a^2 = b^2 + c^2 - 2bc \cdot \cos(A)\\
b^2 = a^2 + c^2 - 2ac \cdot \cos(B)\\
c^2 = a^2 + b^2 - 2ab \cdot \cos(C)\\\\

用于计算角度的公式：\\
\cos(A) = \frac{b^2 + c^2 - a^2}{2bc}\\
\cos(B) = \frac{a^2 + c^2 - b^2}{2ac}\\
\cos(C) = \frac{a^2 + b^2 - c^2}{2ab}\\\\

余弦定理求解边长的公式:\\
c^2 = a^2 + b^2 - 2ab \cdot \cos(C)
$$
**图解**

![image-20250331152302057](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20250331152302057.png)
$$
计算角 𝐶（与边 𝑐=5对应）\\
\cos(C) = \frac{a^2 + b^2 - c^2}{2ab} = \frac{3^2 + 4^2 - 5^2}{2 \times 3 \times 4} = \frac{9 + 16 - 25}{24} = 0\\
C = \cos^{-1}(0) = 90^\circ
\\\\

计算角 𝐴（与边 a=3 对应）：\\
\cos(A) = \frac{b^2 + c^2 - a^2}{2bc} = \frac{4^2 + 5^2 - 3^2}{2 \times 4 \times 5} = \frac{16 + 25 - 9}{40} = 0.8\\
A = \cos^{-1}(0.8) \approx 36.87^\circ
\\\\

计算角 𝐵（与边 b=4 对应）：\\
\cos(B) = \frac{a^2 + c^2 - b^2}{2ac} = \frac{3^2 + 5^2 - 4^2}{2 \times 3 \times 5} = \frac{9 + 25 - 16}{30} = 0.6\\
B = \cos^{-1}(0.6) \approx 53.13^\circ
$$


**代码演示**

```python
import math

# 已知三边
a = 3
b = 4
c = 5

# 使用余弦定理计算角C（与边c对应）
cos_C = (a ** 2 + b ** 2 - c ** 2) / (2 * a * b)
C = math.acos(cos_C) * (180 / math.pi)  # 转换为角度制

# 使用余弦定理计算角A（与边a对应）
cos_A = (b ** 2 + c ** 2 - a ** 2) / (2 * b * c)
A = math.acos(cos_A) * (180 / math.pi)  # 转换为角度制

# 使用余弦定理计算角B（与边b对应）
cos_B = (a ** 2 + c ** 2 - b ** 2) / (2 * a * c)
B = math.acos(cos_B) * (180 / math.pi)  # 转换为角度制

# 输出角度
print("角C:", C, "°")
print("角A:", A, "°")
print("角B:", B, "°")

# 输出结果
# 角C: 90.0 °
# 角A: 36.86989764584401 °
# 角B: 53.13010235415599 °
```

<br />

## 向量（Vector）

<br />

### 基本概念

**标量（Scalar）**

标量指的是一个单一的数值，例如 10。它的概念简单，通常用于表示大小或量度。

**向量（Vector）**

向量是由一组数值组成的，例如（10, 20）。它表示具有大小和方向的量。向量的主要特征包括：

- **向量的含义：** 向量的具体意义由使用者定义，可以表示位置、速度、力等。
- **向量的长度：** 向量的长度（或称模）是它的数值大小，通常表示为向量的“大小”。例如，向量（10, 20）有两个数字，长度为 2（即它在二维空间中的分量数量）。
- **向量的维数：** 向量的维数是它包含的元素个数。例如，向量（10, 20）有两个元素，因此它是二维向量，也可以理解为向量的“深度”或“阶数”。
- **向量的方向：** 向量不仅仅表示大小，它还表示方向，这也是“向”字的来源。在二维空间中，向量的方向由其各个分量（如 x 和 y 分量）决定。
- **向量的起点：** 向量的起点通常默认为原点（0, 0），除非另有说明。在许多情况下，向量是从原点指向某一坐标点的。

![image-20250330144904096](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20250330144904096.png)

**向量的符号表示方法**

一个二维向量可以表示为：
$$
以下两种方法均表示一个向量，代表的意义一样，只是写法不一样\\ \\
行向量表示方法：\vec{v} = [v_1, v_2]\\
列向量表示方法：\vec{v} = \begin{pmatrix} v_1 \\ v_2 \end{pmatrix}\\
$$


<br />

**Python创建向量**

::: details （1）基础用法

```python
import numpy as np

# 创建向量
vector1 = np.array([1, 2, 3])
vector2 = np.array([
    [1, 2],
    [2, 3],
    [3, 4]
], dtype=float)
vector3 = np.array([
    [[1, 2, 3, 4], [5, 6, 7, 8]],
    [[1, 2, 3, 4], [5, 6, 7, 8]],
    [[1, 2, 3, 4], [5, 6, 7, 8]],
])

# 查看向量的信息
print("向量: ", vector1)
print("维度: ", vector1.ndim)  # 1 表示一维向量
print("形状: ", vector1.shape)  # 形状
print("大小: ", vector1.size)  # 大小，代表总的个数
print("类型: ", vector1.dtype)  # 数据类型
print()

# 查看向量的信息
print("向量: ", vector2)
print("维度: ", vector2.ndim)
print("形状: ", vector2.shape)
print("大小: ", vector2.size)
print("类型: ", vector2.dtype)
print()

# 查看向量的信息
print("向量: ", vector3)
print("维度: ", vector3.ndim)
print("形状: ", vector3.shape)
print("大小: ", vector3.size)
print("类型: ", vector3.dtype)

# 总结:
# 1.形状可以理解成: 先看最外层有多少个元素, 记作 a, 然后看每个元素包含多少个元素, 记作 b, 以此类推
# 2.形状的返回值不是固定的, 具体要看深度有多深
# 3.len(vector.shape) 就等于它的维度数，也可以写作 vector.ndim
```

输出结果

```bash
向量:  [1 2 3]
维度:  1
形状:  (3,)
大小:  3
类型:  int64

向量:  [[1. 2.]
 [2. 3.]
 [3. 4.]]
维度:  2
形状:  (3, 2)
大小:  6
类型:  float64

向量:  [[[1 2 3 4]
  [5 6 7 8]]

 [[1 2 3 4]
  [5 6 7 8]]

 [[1 2 3 4]
  [5 6 7 8]]]
维度:  3
形状:  (3, 2, 4)
大小:  24
类型:  int64
```

:::

::: details （2）列向量

```python
import numpy as np

# 假设有一个向量
vector = np.arange(1, 4)
print(f"原始向量: {vector}")

# 以列向量方式输出: 这种方法需要知道向量有多少元素, 不推荐
print(f"\n改变形状:\n {vector.reshape(3, 1)}")

# 以列向量方式输出: 推荐方法
print(f"\n维度扩展:\n {vector[:, np.newaxis]}")

# 备注: 在 NumPy 中，向量默认是一维，没有明确“行向量”或“列向量”的区别
```

输出结果

```bash
原始向量: [1 2 3]

改变形状:
 [[1]
 [2]
 [3]]

维度扩展:
 [[1]
 [2]
 [3]]
```

:::

<br />

### 向量加减

::: details 点击查看详情

```python
import numpy as np

# 创建向量
vector1 = np.array([1, 2, 3])
vector2 = np.array([3, 6, 9])
vector3 = np.array([
    [1, 2],
    [3, 4],
    [5, 6]
])

# 加一个标量，相当于向量中每个元素加这个标量
# 公式: n + (a, b) = (n+a, n+b)
print(vector1 + 1)
print(vector2 + 1)
print(vector3 + 1)
print()

# 加一个向量
# 公式: (x, y) + (a, b) = (x+a, y+b)
print(vector1 + vector2)
print(vector3 + vector3)
# print(vector1 + vector3) # 因为两个向量形状不一样，不能这样使用加法

# 总结
# 1.减法也是一样的规则
# 2.两个向量相加或相减, 必须具有相同的形状才可以, 否则不能这样计算
```

输出结果

```bash
[2 3 4]
[ 4  7 10]
[[2 3]
 [4 5]
 [6 7]]
[ 4  8 12]
[[ 2  4]
 [ 6  8]
 [10 12]]
```

:::

<br />

### 向量乘除

::: details （1）与标量的乘除，对应乘除即可，很简单

```python
import numpy as np

# 创建向量
vector1 = np.array([1, 2, 3])
vector2 = np.array([3, 6, 9])
vector3 = np.array([[1, 2], [3, 4]])

# 乘一个标量: n * (a, b) = (n*a, n*b)
print(vector1 * 2)
print(3 * vector2)
print()

# 除一个标量, 也一样
print(vector1 / 2)
print(3 / vector2)
```

输出结果

```bash
[2 4 6]
[ 9 18 27]

[0.5 1.  1.5]
[1.         0.5        0.33333333]
```

:::

::: details （2）与向量的乘除

```python
import numpy as np

# 创建向量
vector1 = np.array([1, 2, 3])
vector2 = np.array([3, 6, 9])
vector3 = np.array([[1, 2], [3, 4]])

# 乘一个向量: (a, b) * (c, d) = (a*b, c*d)
# 与加减一样，形状不同也不能乘除
print(vector1 * vector2)
print(vector1 / vector2)
```

输出结果

```bash
[ 3 12 27]
[0.33333333 0.33333333 0.33333333]
```

:::

::: details （3）向量点积

向量的点乘（也叫**点积**或**内积**或**标量积**）是一种重要的数学运算，它不仅在纯数学中有着广泛的应用，而且在物理学、计算机科学、工程学等领域也有着重要作用。

需要注意的是，向量的点乘运算结果不是一个向量，而是一个**数字**

一些基本理论：

* 通过两个向量点乘，可以得到两个向量之间的夹角余弦值
* 通过两个向量点乘，可以用来计算一个向量在另一个向量上的**投影**

**计算公式**

如果你有两个 n 维向量：
$$
\vec{a} = [a_1, a_2, \dots, a_n]\\
\vec{b} = [b_1, b_2, \dots, b_n]
$$


那么它们的点乘（dot product）是：
$$
\vec{a} \cdot \vec{b} = a_1 b_1 + a_2 b_2 + \dots + a_n b_n
$$
举个例子
$$
\vec{a} = [3, 4] \\
\vec{b} = [2, 1] \\
\vec{a} \cdot \vec{b} = 3 \cdot 2 + 4 \cdot 1 = 6 + 4 = 10
$$
**代码演示**

```python
import numpy as np

# 定义两个二维向量
a = np.array([3, 4])
b = np.array([2, 1])

# 方法 1：使用 np.dot
dot1 = np.dot(a, b)

# 方法 2：使用 @ 运算符
dot2 = a @ b

# 方法 3：手动写出分量乘积
dot3 = a[0] * b[0] + a[1] * b[1]

print(f"点乘结果（方法1 - np.dot） : {dot1}")
print(f"点乘结果（方法2 - @ 运算符）: {dot2}")
print(f"点乘结果（方法3 - 手动计算） : {dot3}")

# 注意: 要求两个向量的元素个数必须相同, 即维度相同, 而形状可以不一样
```

输出结果

```bash
点乘结果（方法1 - np.dot） : 10
点乘结果（方法2 - @ 运算符）: 10
点乘结果（方法3 - 手动计算） : 10
```

:::

::: details （4）向量叉积（只适用于三维空间）

叉积（cross product），是一个**只适用于三维空间（或二维延伸成三维）\**的运算，结果是一个新的\**向量**，并且这个向量：

* **方向**：**垂直**于原来的两个向量构成的平面，遵循“右手法则”确定方向"
* **大小**：等于两个向量构成的平行四边形的面积


$$
\vec{a} \times \vec{b} =
\begin{vmatrix}
\mathbf{i} & \mathbf{j} & \mathbf{k} \\
a_1 & a_2 & a_3 \\
b_1 & b_2 & b_3
\end{vmatrix}
=
\left( a_2b_3 - a_3b_2,\ a_3b_1 - a_1b_3,\ a_1b_2 - a_2b_1 \right)
$$
<br />二维向量没有“正宗”的叉积，但可以看作是三维向量 z 分量为 0 的特例

* 这个值的**绝对值**代表向量 a 和 b 所构成的平行四边形的面积

* 若叉积为 0，说明两个向量平行（如：在一条直线上)

叉积计算示例：

```python
import numpy as np

# 2D 向量（结果是标量）
a = np.array([1, 2])
b = np.array([3, 4])
print(np.cross(a, b))

# 3D 向量（结果是向量）
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
print(np.cross(a, b))
```

二维向量叉积画图示例：

```python
import numpy as np
import matplotlib.pyplot as plt

# 定义两个向量并计算叉积
a = np.array([3, 1])
b = np.array([1, 2])
cross = np.cross(a, b)

# 创建一个绘图窗口（figure）和一个坐标轴（axes）对象
fig, ax = plt.subplots(figsize=(6, 6))

# 设置坐标轴的纵横比为“相等”，也就是说 x 轴和 y 轴单位长度相同，不会让图形变形
ax.set_aspect('equal')

# 显示坐标轴上的网格线，方便观察坐标位置
ax.grid(True)

# 限定 x和y 轴的显示范围是从 -1 到 5
ax.set_xlim(-1, 5)
ax.set_ylim(-1, 5)

# 画向量 a 和 b
# 1.quiver用来绘制箭头（向量）, 0,0 代表箭头的起点坐标, a[0], a[1]箭头指向的终点
# 2.angles='xy' 指定箭头方向角度的解释方式, 'xy' 表示箭头的方向角度是基于数据坐标系（x, y 坐标轴）计算的
# 3.scale_units='xy' 指定箭头的缩放单位参照, 'xy' 表示箭头的长度单位与坐标轴的 x,y 单位一致
# 4.scale=1 缩放因子，用来控制箭头的长度, scale=1 表示箭头长度和向量大小一一对应，不做额外缩放
# 3.color设置颜色, label设置了用 LaTeX 语法显示向量符号
ax.quiver(0, 0, a[0], a[1], angles='xy', scale_units='xy', scale=1, color='blue', label=r'$\vec{a}$')
ax.quiver(0, 0, b[0], b[1], angles='xy', scale_units='xy', scale=1, color='green', label=r'$\vec{b}$')

# 画平行四边形的另外两条边并填充
# 语法: .fill(x坐标数组, y坐标数组, ...)
# parallelogram[:, 0] 其中 : 表示“所有行”，即取数组的每一行, 0 表示“第 0 列”，即取每一行的第一个元素
# orange 设置填充颜色
# alpha 设置透明度为 0.3，使得填充颜色半透明，不会遮挡后面的图形
# label 设置图例标签
parallelogram = np.array([[0, 0], a, a + b, b])
ax.fill(parallelogram[:, 0], parallelogram[:, 1], 'orange', alpha=0.3, label=f'Area = |a × b| = {abs(cross)}')

# 设置标题
ax.set_title(r'2D: np.cross($\vec{a}, \vec{b}$)')

# 设置图例
ax.legend(loc='upper left')

# 显示图形
plt.show()
```

![image-20250723220215613](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20250723220215613.png)

三维向量叉积画图示例：

```python
import numpy as np
import matplotlib.pyplot as plt

# 定义三个三维向量：a, b, a×b
a = np.array([1, 2, 0])
b = np.array([2, 1, 0])
cross = np.cross(a, b)

# 创建三维图
fig = plt.figure(figsize=(8, 6))
ax = fig.add_subplot(111, projection='3d')
ax.set_xlim([-1, 3])
ax.set_ylim([-1, 3])
ax.set_zlim([-1, 3])
ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Z')
ax.set_title('3D Cross Product Visualization')

# 绘制向量 a、b 和 a×b
origin = np.array([0, 0, 0])
ax.quiver(*origin, *a, color='blue', label=r'$\vec{a}$')
ax.quiver(*origin, *b, color='green', label=r'$\vec{b}$')
ax.quiver(*origin, *cross, color='red', label=r'$\vec{a} \times \vec{b}$')

# 添加图例并展示
ax.legend(loc='upper left')
plt.show()
```

![image-20250723221137145](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20250723221137145.png)



:::

<br />

### 向量范数

**向量的范数**（也称为向量的“长度”或“模”）是表示向量“有多大”的一个标量值

不同的范数对“长度”的定义不同，最常见的是 **L1 范数、L2 范数、Lp范数、无穷范数（L∞）**



对于向量
$$
\vec{v} = [x_1, x_2, \dots, x_n]
$$
**L1范数**：向量各个元素绝对值的**总和**，也叫 **曼哈顿距离**
$$
\|\vec{v}\|_1 = |x_1| + |x_2| + \dots + |x_n|
$$


**L2范数**：向量的“直线”长度，也叫 **欧几里得范数**
$$
\text{L2范数计算规则} \\
\|\vec{v}\| = \sqrt{x_1^2 + x_2^2 + \dots + x_n^2}
$$


举个例子，比如在直角坐标系中，向量为（1, 2），那么我们画一个直角三角形，也就是求斜边的长度，根据勾股定理得到 $\sqrt{1^2 + 2^2} = 3$

![image-20250330231706765](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20250330231706765.png)

**L∞范数**（最大范数）：向量中**绝对值最大的元素**



::: details 代码演示

```python
import numpy as np

# 定义向量
x = np.array([3, -4, 1])

# L1 范数：绝对值之和
l1_norm = np.linalg.norm(x, ord=1)

# L2 范数：平方和开根号
l2_norm = np.linalg.norm(x, ord=2)

# L∞ 范数：最大绝对值
linf_norm = np.linalg.norm(x, ord=np.inf)

# 打印结果
print("L1 范数:", l1_norm)
print("L2 范数:", l2_norm)
print("L∞ 范数:", linf_norm)
```

输出结果

```bash
L1 范数: 8.0
L2 范数: 5.0990195135927845
L∞ 范数: 4.0
```

:::

<br />

### 零向量

::: details 点击查看详情

对于任意一个向量U，都存在一个向量O，满足 U + O = U，这个向量O就称为零向量

```python
import numpy as np

# 创建向量
vector1 = np.array([1, 2, 3])
vector2 = np.array([
    [1, 2],
    [3, 4],
    [5, 6]
])

# 根据已有向量生成零向量
z1 = np.zeros_like(vector1)
z2 = np.zeros_like(vector2)
print(z1)
print(z2)

# 单独生成零向量
zero_vector1 = np.zeros(3)  # 默认为float类型
zero_vector2 = np.zeros(3, dtype=int)  # 可以使用dtype=int 指定类型
print(zero_vector1)
print(zero_vector2)
```

输出结果

```bash
[0 0 0]
[[0 0]
 [0 0]
 [0 0]]
[0. 0. 0.]
[0 0 0]
```

:::

<br />

### 正交向量

**正交向量**指的是两个向量之间的夹角是90度，也就是说它们相互垂直。在数学上，两个向量 $\mathbf{a}$ 和 $\mathbf{b}$ 如果满足它们的点积（内积）为零，就称它们是正交的

::: details 点击查看详情

```python
import numpy as np

# 示例向量
v1 = np.array([1, 0])
v2 = np.array([0, 1])

# 计算点积, 然后判断点积是否为零（或者非常接近零，考虑浮点误差）
if abs(np.dot(v1, v2)) < 1e-10:
    print(f"向量 {v1} 和 {v2} 是正交的")
else:
    print(f"向量 {v1} 和 {v2} 不是正交的")
```

输出结果

```bash
向量 [1 0] 和 [0 1] 是正交的
```

:::

<br />

### 单位向量

**单位向量（Unit Vector）\**是指\**模（长度）为 1 的向量**。

它描述的是一个**方向**，而不是“有多长”，就像**指南针**告诉你“往哪儿走”，而不告诉你“走多远”。

单位向量的主要功能是**表示方向**，因为它的长度标准化为 1，就不会影响其他与长度相关的计算。

求向量的单位向量的过程，我们就称为向量的归一化

**计算公式：单位向量 = 向量除  /  向量的模**

![image-20250330233723189](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20250330233723189.png)

用代码演示一下

```python
import numpy as np

# 定义向量
v1 = np.array([3, 4])

# 取向量的模, 注意零向量的模也为0
norm = np.linalg.norm(v1)
if norm == 0:
    print(v1)
    sys.exit(0)

# 计算单位向量
v2 = v1 / norm
print(v2)       # [0.6 0.8]
```

<br />

## 矩阵（Matrix）

### 说明

向量是对数的拓展，一个向量表示一组数，**矩阵是对向量的拓展，一个矩阵表示一组向量**

<span style="color: red;">一般用大写字母表示一个矩阵，用小写字母表示向量</span>

<br />

### 定义矩阵

::: details 点击查看详情

```python
import numpy as np

# 1.定义一个 2x3 的矩阵
matrix = np.array([
    [1, 2, 3],
    [4, 5, 6]
])
print(matrix)
print()

# 2.定义一个全零矩阵
zeros_matrix = np.zeros((2, 3))  # 2行3列的全零矩阵
print(zeros_matrix)
print()

# 3.自定义填充数据
full_matrix = np.full((2, 3), 5)
print(full_matrix)
print()

# 4.定义一个全1矩阵
ones_matrix = np.ones((3, 2))  # 3行2列的全1矩阵
print(ones_matrix)
print()

# 5.定义一个单位矩阵
identity_matrix = np.eye(3)  # 3x3 单位矩阵
print(identity_matrix)
print()

# 6.定义一个随机矩阵
random_matrix = np.random.rand(2, 3)  # 2x3 的随机矩阵（值在 [0, 1) 之间）
print(random_matrix)
print()

# 7.从数值范围创建矩阵
range_matrix = np.arange(10, 22, 2).reshape(2, 3)  # 10-22 的数字，步长为2，重塑为 2x3 矩阵
print(range_matrix)
```

输出结果

```bash
[[1 2 3]
 [4 5 6]]

[[0. 0. 0.]
 [0. 0. 0.]]

[[5 5 5]
 [5 5 5]]

[[1. 1.]
 [1. 1.]
 [1. 1.]]

[[1. 0. 0.]
 [0. 1. 0.]
 [0. 0. 1.]]

[[0.10465852 0.15287938 0.7182737 ]
 [0.83620031 0.79969089 0.41890958]]

[[10 12 14]
 [16 18 20]]
```

:::

<br />

### 基本运算

::: details （1）矩阵加减法

```python
import numpy as np

m1 = np.array([
    [1, 2, 3],
    [4, 5, 6],
])

m2 = np.array([
    [1, 2, 3],
    [7, 8, 9],
])

# 矩阵+标量: 每个位置都加该标量
print(m1 + 1)
print(m1 - 1)

print("\n" + "*" * 80)

# 矩阵+矩阵: 对应位置相加或相减
# 注意: 不同形状的矩阵不能相加减
print(m1 + m2)
print(m1 - m2)
```

输出结果

```bash
[[2 3 4]
 [5 6 7]]
[[0 1 2]
 [3 4 5]]

********************************************************************************

[[ 2  4  6]
 [11 13 15]]
[[ 0  0  0]
 [-3 -3 -3]]
```

:::

::: details （2）矩阵哈达玛积 和 除法

```python
import numpy as np

m1 = np.array([
    [1, 2, 3],
    [4, 5, 6],
])

m2 = np.array([
    [1, 2, 3],
    [7, 8, 9],
])

# 矩阵*标量: 每个位置都乘该标量
print(m1 * 3)
print(m1 / 3)

print("\n" + "*" * 80)

# 矩阵*矩阵: 对应位置相乘或相除
# 注意: 
#   1.不同形状的矩阵不能使用*进行相乘除
#   2.这不是矩阵乘法（矩阵乘法是用@来计算）, 这叫做 哈达玛积，一定要注意!!!
print(m1 * m2)
print(m1 / m2)
```

输出结果

```bash
[[ 3  6  9]
 [12 15 18]]
[[0.33333333 0.66666667 1.        ]
 [1.33333333 1.66666667 2.        ]]

********************************************************************************

[[ 1  4  9]
 [28 40 54]]
[[1.         1.         1.        ]
 [0.57142857 0.625      0.66666667]]
```

:::

<br />

### 矩阵乘法

::: details （1）矩阵-向量乘法

```python
import numpy as np

# 要求: 如果矩阵A是 m x n, 那么矩阵和向量的乘法, 就要求向量必须是n维向量, 也就是 (n, 1)
# 也就是 矩阵的列数 要等于 向量的行数
# 得到的结果是: 一个m维的向量

# 定义矩阵, shape=(3, 4)
# [
#   [ 1  2  3  4]
#   [ 5  6  7  8]
#   [ 9 10 11 12]
#  ]
A = np.arange(1, 13).reshape(3, 4)

# 定义向量, shape=(4, 1), 注意这要看作是一个列向量
vector = np.array([-1, -2, -3, -4])

# 计算规则: 每一行与向量做 点积（逐项相乘后求和）
#  1.矩阵第一行计算
#    1x-1 + 2x-2 + 3x-3 + 4x-4 = -1 + -4 + -9 + -16 = -30
#  2.矩阵第二行计算
#    5x-1 + 6x-2 + 7x-3 + 8x-4 = -5 + -12 + -21 + -32 = -70
#  3.矩阵第三行计算
#    9x-1 + 10x-2 + 11x-3 + 12x-4 = -9 + -20 + -33 + -48 = -110
#  4.最终得到一个向量 [-30, -70, -110]
print(A @ vector)
```

输出结果

```bash

```

:::

::: details （2）矩阵乘法：矩阵 @ 矩阵

```python
import numpy as np

a = np.array([
    [1, 2, 3],
    [4, 5, 6],
])

b = np.array([
    [1, 2],
    [3, 4],
    [5, 6],
])

# 矩阵a的形状是 (2, 3)
# 矩阵b的形状是 (3, 2)

# 矩阵A 点乘 矩阵B, 要求: 矩阵A的列数 = 矩阵B的行数
# 矩阵B 点乘 矩阵A, 要求: 矩阵B的列数 = 矩阵A的行数
# 需要注意, 上面两者是不同的, 也就是矩阵相乘, 不满足乘法的交换律

# 我们来看一下是如何计算的
# 1.a的列数 = b得行数, 所以可以进行点乘操作
# 2.输出的是一个矩阵, 形状为(a的行数, b的列数)
# 3.计算规则是:
#   1) 拿a的第一行向量 点成 b的第一列向量
#      [1, 2, 3] dot [1, 3, 5] = 1×1 + 2×3 + 3×5 = 1 + 6 + 15 = 22
#   2) 拿a的第一行向量 点成 b的第二列向量
#      [1, 2, 3] dot [2, 4, 6] = 1×2 + 2×4 + 3×6 = 2 + 8 + 18 = 28
#   3) b没有第三列了, 所以a的第一行计算完毕, 所以就得到一个向量 [22, 28]
#   4) 拿a的第二行向量 点成 b的第一列向量
#      [4, 5, 6] dot [1, 3, 5] = 4×1 + 5×3 + 6×5 = 4 + 15 + 30 = 49
#   5) 拿a的第二行向量 点成 b的第二列向量
#      [4, 5, 6] dot [2, 4, 6] = 4×2 + 5×4 + 6×6 = 8 + 20 + 36 = 64
#   6) a的第二行计算完毕, 所以就得到一个向量 [49, 64]
#   7) 所以最终结果是
#      [
#        [22, 28],
#        [49, 64]
#      ]

c = np.dot(a, b)
print(c)

print("_" * 30)

# 现在计算 b * a
# 最终得到的是 (b的行数, a的列数) = (3, 3), 也就是3行3列的矩阵
c = np.dot(b, a)
print(c)

# 总结
# 矩阵A是 (a, b), 矩阵B是 (c, d), 那么必须满足 b == c才能进行点乘， （相同的抵消掉了）得到的是 (a, d)矩阵
```

输出结果

```bash
[[22 28]
 [49 64]]
______________________________
[[ 9 12 15]
 [19 26 33]
 [29 40 51]]
```

:::

::: details （3）矩阵的点积示例：在三维空间中进行二维平面内的旋转

```python
import numpy as np
import matplotlib.pyplot as plt

# 设置支持中文字体
plt.rcParams['font.sans-serif'] = ['SimHei']  # 设置中文字体为黑体
plt.rcParams['axes.unicode_minus'] = False  # 正常显示负号

def rotate_z(vectors, theta_deg):
    """
    绕Z轴旋转向量集合
    :param vectors: numpy数组，形状 (n, 3)，n个三维点
    :param theta_deg: 旋转角度，单位度
    :return: 旋转后的点，numpy数组，形状 (n, 3)
    """
    theta = np.radians(theta_deg)  # 角度转弧度

    # 绕Z轴的旋转矩阵
    Rz = np.array([
        [np.cos(theta), -np.sin(theta), 0],
        [np.sin(theta),  np.cos(theta), 0],
        [0,              0,             1]
    ])

    # 注意：这里 vectors 是 n×3 的行向量集合，矩阵乘法用转置矩阵
    rotated_vectors = vectors @ Rz.T
    return rotated_vectors

# 准备几个三维点，方便观察旋转效果（只用XY平面，Z都为0）
points = np.array([
    [1, 0, 0],   # X轴正方向点
    [0, 1, 0],   # Y轴正方向点
    [-1, 0, 0],  # X轴负方向点
    [0, -1, 0]   # Y轴负方向点
])

# 旋转角度（单位：度）
angle = 45

# 计算旋转后的点
rotated_points = rotate_z(points, angle)

# 打印旋转前后的点
print("旋转前的点：")
print(points)
print(f"\n绕Z轴旋转{angle}度后的点：")
print(rotated_points)

# 可视化：画原始点和旋转后的点（XY平面）
plt.figure(figsize=(6,6))
plt.axhline(0, color='gray', lw=1)
plt.axvline(0, color='gray', lw=1)

# 原始点
plt.scatter(points[:,0], points[:,1], color='blue', label='原始点')
for i, (x, y) in enumerate(points[:, :2]):
    plt.text(x+0.05, y+0.05, f"P{i+1}", color='blue')

# 旋转后点
plt.scatter(rotated_points[:,0], rotated_points[:,1], color='red', label='旋转后点')
for i, (x, y) in enumerate(rotated_points[:, :2]):
    plt.text(x+0.05, y+0.05, f"P{i+1}\'", color='red')

plt.title(f'绕Z轴旋转{angle}度示意图')
plt.xlabel('X轴')
plt.ylabel('Y轴')
plt.axis('equal')
plt.legend()
plt.grid(True)
plt.show()

# 备注:
# X轴：左右方向（水平），正方向通常向右
# Y轴：前后方向（水平），正方向通常向前
# Z轴：上下方向（垂直），正方向通常向上
#
# 绕 Z 轴旋转就像你把一个圆盘放在桌面上，Z 轴垂直桌面，旋转时盘子绕垂直轴转动。
# 因为 Z 轴垂直向上，绕它转动时，X、Y 坐标会变化，但 Z 坐标保持不变
#
# 代码中这些点的 Z 坐标都是 0，说明它们都平放在水平的 XY 平面上，没有上下移动
```

![image-20250726213153179](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20250726213153179.png)

:::

<br />

### 变换举例

::: details （1）将向量 `[2, 2]` 逆时针旋转 90 度，求新坐标

```python
import numpy as np

# 原始向量
v = np.array([2, 2])

# 旋转角度（单位：度）
theta_deg = 90
theta_rad = np.radians(theta_deg)  # 转换为弧度

# 构造旋转矩阵（逆时针）
# 第一列是旋转后 x 轴的位置，第二列是旋转后 y 轴
R = np.array([
    [np.cos(theta_rad), -np.sin(theta_rad)],
    [np.sin(theta_rad), np.cos(theta_rad)]
])

# 线性变换（旋转）
v_rotated = R @ v

print("旋转前向量:", v)
print(f"旋转{theta_deg}度后:", v_rotated)
```

输出结果

```bash
旋转前向量: [2 2]
旋转90度后: [-2.  2.]
```

<br />

**思考：构造旋转矩阵是如何构造出来的？**

比如一个点（1，0），逆时针旋转90度，它变成了（0，1）

比如一个点（0，1），逆时针旋转90度，它变成了（-1，0）

所以，逆时针旋转90度我们就得到了一个矩阵（第一列代表x轴的旋转，第二列代表y轴的旋转）
$$
\begin{bmatrix}
0 & -1 \\
1 & 0
\end{bmatrix}
$$
**现在我们如何将它扩展到旋转任意角度？**

先看x轴，比如我们逆时针旋转一下，那么可以得到下面的图形

![image-20250804232038316](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20250804232038316.png)

针对y轴，我们也获取到另一个变换后的坐标（图形待补充）

:::

<br />

### dot方法

**np.dot 是多义的：**

- 对于一维向量是点积；
- 对于二维矩阵是矩阵乘法；
- 对于混合维度时自动广播；
- **更推荐使用 `@` 或 `np.matmul` 来明确表示矩阵乘法**，避免歧义

```python
import numpy as np

# 定义矩阵
A = np.ones((2, 3, 4))
B = np.ones((2, 4, 5))

# 计算
print(np.dot(A, B).shape)
print((A @ B).shape)
print(np.matmul(A, B).shape)
```

更详细的等待补充

<br />

### 矩阵类型

::: details （1）零矩阵

```python
import numpy as np

# 创建向量
m1 = np.array([1, 2, 3])
m2 = np.array([
    [1, 2],
    [3, 4],
    [5, 6]
])

# 根据已有向量生成零向量
z1 = np.zeros_like(m1)
z2 = np.zeros_like(m2)
print(z1)
print(z2)

# 单独生成零矩阵
zero_vector1 = np.zeros(3)  # 默认为float类型
zero_vector2 = np.zeros((2, 3), dtype=int)  # 可以使用dtype=int 指定类型
print(zero_vector1)
print(zero_vector2)

# 使用 np.full() 填 0，和 zeros() 一样效果，但更通用，可以填任意值
z = np.full((2, 3), 10)  # 创建 2x3 的零矩阵
print(z)
```

:::

::: details （2）方阵：行和列数量相同的矩阵

```python
import numpy as np

n = 2

# 零方阵
print(np.zeros((n, n)))

# 全一方阵
print(np.ones((n, n)))

# 指定数字, 最后一个n代表方阵中每个元素都是n
print(np.full((n, n), n))
```

输出结果

```bash
[[0. 0.]
 [0. 0.]]
[[1. 1.]
 [1. 1.]]
[[2 2]
 [2 2]]
```

:::

::: details （3）对角矩阵：只有主对角线上的元素可能非零，其他位置全是零（对角矩阵不一定是方阵）

```python
import numpy as np

# 从一维数组生成对角矩阵
a = np.array([1, 2, 3])
D = np.diag(a)
print(D)

# 生成非主对角线的对角矩阵：正对角线偏移（上）
print(np.diag([1, 2, 3], k=1))

# 生成非主对角线的对角矩阵：负对角线偏移（下）
print(np.diag([1, 2, 3], k=-1))

# 如果传入一个矩阵, 那么返回矩阵对角上的向量
print(np.diag(D))
```

输出结果

```bash
[[1 0 0]
 [0 2 0]
 [0 0 3]]
 
[[0 1 0 0]
 [0 0 2 0]
 [0 0 0 3]
 [0 0 0 0]]
 
[[0 0 0 0]
 [1 0 0 0]
 [0 2 0 0]
 [0 0 3 0]]

[1 2 3]
```

:::

::: details （4）单位矩阵：它是一个对角方阵，主对角线全为 1，其它全为 0

```python
import numpy as np

# 对角方阵
print(np.identity(3))
print(np.identity(4))
```

输出结果

```bash
[[1. 0. 0.]
 [0. 1. 0.]
 [0. 0. 1.]]
[[1. 0. 0. 0.]
 [0. 1. 0. 0.]
 [0. 0. 1. 0.]
 [0. 0. 0. 1.]]
```

:::

::: details （5）标量矩阵：它是一个对角方阵，主对角线全为相同的常数 $\lambda$，其它全为 0

```python
import numpy as np

# 对角方阵
print(np.identity(3) * 7)
print(np.identity(4) * 2)
```

输出结果

```bash
[[7. 0. 0.]
 [0. 7. 0.]
 [0. 0. 7.]]
[[2. 0. 0. 0.]
 [0. 2. 0. 0.]
 [0. 0. 2. 0.]
 [0. 0. 0. 2.]]
```

:::

::: details （6）三角矩阵

```python
import numpy as np

# 从已有矩阵生成三角矩阵
A = np.array([[1, 2, 3],
              [4, 5, 6],
              [7, 8, 9]])
upper = np.triu(A)  # 上三角矩阵
lower = np.tril(A)  # 下三角矩阵
print(upper)
print(lower)

# 创建特定大小的三角矩阵（全为 1 或其他值）
print(np.triu(np.ones((3, 3))))  # 上三角全为1
print(np.tril(np.full((4, 4), 5)))  # 下三角全为5

# 带偏移参数 k
# k=0: 主对角线
# k>0: 主对角线上第 k 条对角线
# k<0: 主对角线下第 k 条对角线
print(np.triu(np.ones((4, 4)), k=1))  # 严格上三角（不含主对角线）
print(np.tril(np.ones((4, 4)), k=-1))  # 严格下三角（不含主对角线）
```

输出结果

```bash
[[1 2 3]
 [0 5 6]
 [0 0 9]]
 
[[1 0 0]
 [4 5 0]
 [7 8 9]]
 
[[1. 1. 1.]
 [0. 1. 1.]
 [0. 0. 1.]]
 
[[5 0 0 0]
 [5 5 0 0]
 [5 5 5 0]
 [5 5 5 5]]
 
[[0. 1. 1. 1.]
 [0. 0. 1. 1.]
 [0. 0. 0. 1.]
 [0. 0. 0. 0.]]

[[0. 0. 0. 0.]
 [1. 0. 0. 0.]
 [1. 1. 0. 0.]
 [1. 1. 1. 0.]]
```

:::

::: details （7）对称矩阵：主对角线**左右镜像完全相同**

```python
import numpy as np

A = np.random.randint(0, 10, (4, 4))  # 随机整数矩阵
symmetric_A = (A + A.T) // 2          # 构造对称矩阵（整数版）

print(symmetric_A)
```

输出结果

```bash
# 观察下面的数据
# 第一行和第一列
# 第二行和第二列
# 第三行和第三列
# 第四行和第四列
[[5 5 4 6]
 [5 0 0 6]
 [4 0 7 6]
 [6 6 6 4]]
```

:::

::: details （8）正交矩阵：特殊的方阵，满足转置矩阵等于它的逆矩阵

```python
import numpy as np

# 2D 旋转矩阵是一个典型的正交矩阵
theta = np.pi / 4  # 45度
R = np.array([
    [np.cos(theta), -np.sin(theta)],
    [np.sin(theta),  np.cos(theta)]
])

# 验证正交性
print(np.allclose(R.T @ R, np.eye(2)))
```

:::

<br />

### 特征分解

计算公式：$A\mathbf{v} = \lambda \mathbf{v}$

* $A$ ：表示一个方阵，代表线性变换或矩阵运算
* $\mathbf{v}$：表示一个非零向量，称为**特征向量**
* λ ：表示一个标量，称为**特征值**

矩阵 $A$ 代表一种线性变换（如旋转、拉伸、压缩、剪切）：

* 特征向量告诉我们：哪些方向是不变的方向（方向不变但长度可能变化）
* 特征值告诉我们：在这些方向上被放大或缩小了多少倍

你可以把特征分解想成是在**寻找一个更“适合描述矩阵”的坐标系**

* 原始矩阵 $A$ 是“复杂的”，它在普通坐标系下可能很难看出规律
* 特征向量提供了一组**新坐标轴**（一组基），在这组基下，变换会变得更简单

<br />

**通缩的解释**

特征分解就是：找出一组不会被矩阵扭曲方向的向量（特征向量）， 然后把矩阵 $A$ 表达成“这些向量 × 缩放系数（特征值）”的方式

<br />

**特征分解的性质**

* 当且仅当一个矩阵的所有特征值都是零的时候，矩阵是奇异的
* 矩阵A的行列式等于其特征值的乘积
* 矩阵A的迹等于其特征值之和
* 如果A的特征值是 $λ_{i}$，且A是非奇异的，那么 $A^{-1}$ 的特征值就是  $1/A_{i}$
* $A^{-1}$ 的特征向量与A的特征向量相同



::: details （1）手工求解并用Numpy验证

手工求解步骤待补充

```python
import numpy as np

A = np.array([
    [5, 2],
    [2, 3],
])

values, vector = np.linalg.eig(A)
print(values)
print(vector)
```

输出结果

```bash
[6.23606798 1.76393202]
[[ 0.85065081 -0.52573111]
 [ 0.52573111  0.85065081]]
```

:::

::: details （2）基础用法

```python
import numpy as np

# 定义矩阵
# A = np.array([
#     [2, 0],
#     [0, 3]])
A = np.arange(1, 10).reshape(3, 3)
print(f"原始矩阵如下:\n {A}\n")

# 计算 特征值 和 特征向量, 第一个特征值 对应 特征向量的第一列, 依次类推
# 一个n * n的矩阵，最多有n个特征向量
values, vector = np.linalg.eig(A)
print(f"特征值为:\n {values}\n")
print(f"特征向量为:\n {vector}\n")

# 验证
print(f"验证特征值和特征向量（数值上理论应该是相等的）:")
B = A @ vector[:, 0]  # 原始矩阵 点乘 特征向量第一列
C = vector[:, 0] * values[0]  # 特征向量 * 特征值
print(B)
print(C)

# 推导原始矩阵: 只适用于可对角化（diagonalizable）矩阵
print(f"\n推导原始矩阵:")
Q = vector
L = np.diag(values)  # 构造对角矩阵，对角线是特征值
R = np.linalg.inv(Q)  # Q 的逆矩阵
D = Q.dot(L).dot(R)  # 还原原始矩阵
print(D)
```

输出结果

```bash
原始矩阵如下:
 [[1 2 3]
 [4 5 6]
 [7 8 9]]

特征值为:
 [ 1.61168440e+01 -1.11684397e+00 -1.30367773e-15]

特征向量为:
 [[-0.23197069 -0.78583024  0.40824829]
 [-0.52532209 -0.08675134 -0.81649658]
 [-0.8186735   0.61232756  0.40824829]]

验证特征值和特征向量（数值上理论应该是相等的）:
[ -3.73863537  -8.46653421 -13.19443305]
[ -3.73863537  -8.46653421 -13.19443305]

推导原始矩阵:
[[1. 2. 3.]
 [4. 5. 6.]
 [7. 8. 9.]]
```

:::

<br />

### 奇异值分解

**公式**
$$
A = U \Sigma V^T
$$


其中：

- $A$ 是原始矩阵，维度是 $m\times n$
- $U$ 是一个 $m \times m$ 的正交矩阵（列向量是左奇异向量）
- $Σ$ 是一个 $m \times n$ 的**对角矩阵**（对角线上的元素称为“奇异值”）
- $V^{T}$ 是 $n \times n$ 的正交矩阵的转置（行向量是右奇异向量）

奇异值分解（**Singular Value Decomposition**，简称 **SVD**）大致可以理解为：

把一个任意矩阵 $A$，看成是对一个单位正方体先进行旋转（$V^{T}$），再进行拉伸（$Σ$），最后再进行旋转（$U$）。



::: details （1）用法示例

```python
import numpy as np

# 定义矩阵
A = np.array([[3, 2], [2, 3]])

# 奇异值分解
U, S, VT = np.linalg.svd(A)

print("U:\n", U)
print("\nS:\n", S)
print("\nV^T:\n", VT)

# -------------------------------------------------
# 还原奇异值矩阵 Sigma（对角矩阵）
Sigma = np.zeros((U.shape[0], VT.shape[0]))
np.fill_diagonal(Sigma, S)

# 矩阵乘法还原 A
B = U @ Sigma @ VT
print("\n还原矩阵:\n ", B)
```

输出结果

```bash
U:
 [[-0.70710678 -0.70710678]
 [-0.70710678  0.70710678]]

S:
 [5. 1.]

V^T:
 [[-0.70710678 -0.70710678]
 [-0.70710678  0.70710678]]

还原矩阵:
  [[3. 2.]
 [2. 3.]]
```

:::

::: details （2）举例：图像压缩：有损压缩：（灰度）

```python
import ssl
import skimage
import numpy as np
import matplotlib.pyplot as plt

# 忽略 SSL 验证
ssl._create_default_https_context = ssl._create_unverified_context

# 设置Matplotlib支持中文字体
plt.rcParams['font.sans-serif'] = ['SimHei']  # 设置中文字体为黑体
plt.rcParams['axes.unicode_minus'] = False  # 正常显示负号

# -------------------------------加载图像，并转为灰度 ---------------------------------------------

# 定义图像地址
url = "https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-2025-08-06.png"

# 从本地或者URL中读取图像, 返回Numpy数组
# 彩色图像：(高度, 宽度, 3) （RGB 通道）
# 灰度图像：(高度, 宽度)
image = skimage.io.imread(url)

# 会将彩色图像按人眼感知加权公式转换成灰度图像，值在 0~1
# 0.0 完全黑色
# 0.1 非常深的暗灰色
# 0.5 中灰色
# 0.9 非常浅的浅灰色
# 1.0 完全白色
gray = skimage.color.rgb2gray(image)

# ------------------------------- 奇异值分解(SVD) ---------------------------------------------

U, S, VT = np.linalg.svd(gray, full_matrices=False)


# ------------------------------- 重建图像 ---------------------------------------------
def recover_from_svd(U, S, VT, k):
    """ 重建图像，从而实现压缩和简化，只保留图像的主要信息，舍弃细节和噪声
    k: 仅保留前k个奇异值的重建图像
    """

    # 取矩阵U的前k列, 返回值还是矩阵, 行数不变, 列数变为k
    Uk = U[:, :k]

    # 用 S 中的前 k 个奇异值构造对角矩阵 Sk
    Sk = np.diag(S[:k])

    # 取矩阵 VT 的前 k 行（右奇异向量对应的前 k 个方向）
    VTk = VT[:k, :]

    # 最后重建一个近似的图像矩阵
    return np.dot(Uk, np.dot(Sk, VTk))


if __name__ == "__main__":
    # 设置多个奇异值数（保留信息比例）
    ks = [5, 20, 50, 100, 200, 400, 512]

    # 初始化
    plt.figure(figsize=(12, 8))
    plt.subplot(2, 4, 1)
    plt.imshow(gray, cmap='gray')
    plt.title("原图")
    plt.axis("off")

    # 展示不同压缩比下的图像
    for i, k in enumerate(ks):
        image = recover_from_svd(U, S, VT, k)
        plt.subplot(2, 4, i + 2)
        plt.imshow(image, cmap='gray')
        plt.title(f"k = {k}")
        plt.axis("off")

    # 展示
    plt.tight_layout()
    plt.show()
```

![image-20250806230231308](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20250806230231308.png)

:::

::: details （3）举例：图像压缩：有损压缩：（彩色）

```python

```

:::

<br />

### 伪逆

<br />

## 行列式

### 定义

**行列式（Determinant）** 是一个**由方阵计算出来的实数**，用于描述该矩阵的某些性质，比如：

- 是否可逆（满秩）
- 是否线性相关
- 变换后的体积或面积变化

<span style="color:red;">**它不是矩阵，而是从矩阵导出的一个数**</span>

假设A 是一个方阵（比如 $n \times n$ 的矩阵），那么**det(A)** 就是指矩阵 **A** 的**行列式的值**

<br />

### 计算方式（低阶行列式）

**一阶行列式计算规则**
$$
\left| a \right| = a
\\ \\
举例: \left| 5 \right| = 5
$$
**二阶行列式计算规则**
$$
主对角线乘积 − 副对角线乘积 \\
\begin{vmatrix}
a & b \\
c & d
\end{vmatrix}
= ad - bc
$$

$$
举例: \\
\begin{vmatrix}
2 & 3 \\
4 & 5
\end{vmatrix}
= 2 \times 5 - 3 \times 4 = 10 - 12 = -2
$$

**三阶行列式计算规则**
$$
简单记忆：加加加, 减减减 \\
\begin{vmatrix}
a & b & c \\
d & e & f \\
g & h & i
\end{vmatrix}
= aei + bfg + cdh - ceg - bdi - afh

\\ \\

也可以写成按第一行展开的形式 \\
= a \begin{vmatrix} e & f \\ h & i \end{vmatrix}
- b \begin{vmatrix} d & f \\ g & i \end{vmatrix}
+ c \begin{vmatrix} d & e \\ g & h \end{vmatrix}
$$

$$
举例: \\

= 1(4 \times 6 - 0 \times 5) - 2(0 \times 6 - 1 \times 5) + 3(0 \times 0 - 1 \times 4)
= 1(24) - 2(-5) + 3(-4) \\
= 24 + 10 - 12 \\
= 22

\\ \\
\begin{vmatrix}
1 & 2 & 3 \\
0 & 4 & 5 \\
1 & 0 & 6
\end{vmatrix}
= 1 \begin{vmatrix} 4 & 5 \\ 0 & 6 \end{vmatrix}
- 2 \begin{vmatrix} 0 & 5 \\ 1 & 6 \end{vmatrix}
+ 3 \begin{vmatrix} 0 & 4 \\ 1 & 0 \end{vmatrix} \\
= 1\times(4\times6-5\times0) - 2\times(0\times6-5\times1) + 3\times(0\times0-4\times1) \\
= 24 - (-10) + (-12) \\
= 34 - 12 \\
= 22
$$





<br />

## 线性方程组

### 定义

**定义**

线性方程组，也可以称为N 元一次方程组，是由若干个**一次方程**组成的方程组，每个方程都满足：

* 未知数个数为 N
* 每个未知数的次数为 1（即幂为 1）

**举例说明**
$$
\text{二元一次方程组} \\
\text{解释：未知数有x和y一共2个, 每个未知数的幂都是1, 满足N元一次方程组定义,未知数为2, 所以称为二元一次方程组} \\
\begin{cases}
2x + 3y = 5 \\
x - y = 1 
\end{cases}
\\ \\
\text{三元一次方程组} \\
\begin{cases}
x + y + z = 6 \\
2x - y + z = 3 \\
-x + 4y - 2z = 0
\end{cases}
$$

$$

$$



**反例说明**
$$
\text{含有平方项（不是一次）}  \\
\begin{cases}
x^2 + y = 5 \\
x + y = 3
\end{cases} \\
说明: 第一个方程中x^2是二次项，因此整个系统不是一次方程组 \\

\\ \\

\text{含有变量乘积（不是线性）} \\
\begin{cases}
xy + z = 1 \\
x + y + z = 2
\end{cases} \\
说明: 包含 xy，是两个未知数相乘，不符合线性（一次）要求 \\

\\ \\

\text{含有三角函数（不是线性）} \\
\begin{cases}
\sin x + y = 1 \\
x + y = 3
\end{cases} \\
说明：含有 \sin x，这是非线性函数，也不属于一次方程 \\

\\ \\

\text{含有开方或指数（不是一次）} \\
\begin{cases}
\sqrt{x} + y = 4 \\
x + y = 3
\end{cases} \\
说明: \sqrt{x}是根号，幂次不是 1；不属于一次方程

\\ \\

\text{未知数出现在分母上（不是一次））} \\
\begin{cases}
\frac{1}{x} + y = 3 \\
x + y = 2
\end{cases} \\
说明: \frac{1}{x} = x^{-1}, 幂次不是 1，破坏了一次方程的条件 \\
\color{green} {注意：如果是\frac{x}{2}, 那么等价于 \frac{1}{2}x, 所以单纯看这个条件是一次方程组}
$$
**总结一下**

*  **线性方程组（Linear System）**，也可以称为N元一次方程组
* 不属于 N元一次方程组的，一般统称为 **非线性方程组（Nonlinear System）**

<br />

### 带入法求解

$$
问：带入法如何求解下面的三元一次方程组 \\
\begin{cases}
x + y + z = 6 \\\\
2x - y + 3z = 14 \\\\
x + 2y - z = 2
\end{cases}
$$

```bash
1.根据第一个式子求出x的值
  x = 6 - y - z
  
2.将x的值带入第二个式子
  2*(6-y-z) - y + 3z = 14
  12 - 2y - 2z - y + 3z = 14
  12 - 3y + z = 14
  -3y + z = 2
  z - 3y = 2

3.将x的值带入第三个式子
  (6-y-z) + 2y - z = 2
  6 + y - 2z = 2
  y - 2z = -4
  2z -y = 4
  
4.所以这时候得到两个式子
  z - 3y = 2
  2z - y = 4

5.求出z的值
 z = 3y + 2

6.将z的值带入步骤4得出的式子
  2*(3y+2) - y = 4
  6y + 4 - y = 4
  5y + 4 = 4
  y = 0

7.根据步骤5的式子, 根据y求出z的值
  z = 3 * 0 + 2 = 2

8.最后求出x的值
  x = 6 - 0 - 2 = 4

9.所以最终得到
  x = 4
  y = 0
  z = 2
```

::: details Python标准库实现，仅供学习使用

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-


def solve_3x3_by_substitution(equations):
    """代入法解三元一次方程组
    方程组原型为:
        a1x + b1y + c1z = d1
        a2x + b2y + c2z = d2
        a3x + b3y + c3z = d3

    equations:
        是一个 3x4 的列表，代表增广矩阵, 每一行代表一个方程
        [a1, b1, c1, d1],
        [a2, b2, c2, d2],
        [a3, b3, c3, d3],
    """
    # 拆分系数
    a1, b1, c1, d1 = equations[0]
    a2, b2, c2, d2 = equations[1]
    a3, b3, c3, d3 = equations[2]

    # 第一步：从第一个方程中解出 x
    def x_func(y, z):
        return (d1 - b1 * y - c1 * z) / a1

    # 第二步：将 x = f(y,z) 代入第二个方程
    def eq2(y, z):
        return a2 * x_func(y, z) + b2 * y + c2 * z - d2

    # 第三步：将 x = f(y,z) 代入第三个方程
    def eq3(y, z):
        return a3 * x_func(y, z) + b3 * y + c3 * z - d3

    # 解这个非线性方程组（2元1次）用穷举（仅标准库）
    for y in range(-1000, 1000):
        for z in range(-1000, 1000):
            if abs(eq2(y, z)) < 1e-6 and abs(eq3(y, z)) < 1e-6:
                x = x_func(y, z)
                return round(x, 6), round(y, 6), round(z, 6)

    return None


# 示例输入
# x + y + z = 6
# 2x - y + 3z = 14
# x + 2y + z = 2
eqs = [
    [1, 1, 1, 6],
    [2, -1, 3, 14],
    [1, 2, -1, 2]
]

result = solve_3x3_by_substitution(eqs)

if result:
    x, y, z = result
    print(f"解为: x = {x}, y = {y}, z = {z}")
else:
    print("无解")

```

输出结果

```bash
解为: x = 4.0, y = 0, z = 2
```

:::

<br />

### 高斯消元法求解

**核心点：高斯消元要变成上三角矩阵（上三角矩阵是一个方阵，其主对角线以下的元素（即左下角）全是 0，不包含主对角线）**
$$
问：高斯消元法如何求解下面的三元一次方程组 \\
\begin{cases}
x + y + z = 6 \\\\
2x - y + 3z = 14 \\\\
x + 2y - z = 2
\end{cases}
$$

$$
\hline

答: \\

1.先写出增广矩阵 \\
\left[
\begin{array}{ccc|c}
1 & 1 & 1 & 6 \\\\
2 & -1 & 3 & 14 \\\\
1 & 2 & -1 & 2
\end{array}
\right]

\\ \\

2.将第一列第二个元素变为0, 计算方法: 第二行 - (第一行 * 2), 所以能得到下面的矩阵 \\
\left[
\begin{array}{ccc|c}
1 & 1 & 1 & 6 \\\\
0 & -3 & 1 & 2 \\\\
1 & 2 & -1 & 2
\end{array}
\right]

\\ \\

3.将第一列第三个元素变为0, 计算方法: 第三行 - 第一行, 所以能得到下面的矩阵 \\
\left[
\begin{array}{ccc|c}
1 & 1 & 1 & 6 \\\\
0 & -3 & 1 & 2 \\\\
0 & 1 & -2 & -4
\end{array}
\right]

\\ \\

4.将第二列第三个元素变为0, 计算方法: 第三行 = 第三行 + 第二行 ×\frac{1}{3}, 所以得到 \\
\left[
\begin{array}{ccc|c}
1 & 1 & 1 & 6 \\\\
0 & -3 & 1 & 2 \\\\
0 & 0 & -\frac{5}{3} & -\frac{10}{3}
\end{array}
\right]

\\ \\

5.接下来我们要进行 回代（Back Substitution），从最后一行开始，逐步解出变量 z,y,x \\
1) 根据最后一行求z的值 \\
-\frac{5}{3}z = -\frac{10}{3} \\
z = -\frac{10}{3} 除 -\frac{5}{3} \\
z = 2

\\ \\

2) 用 z=2 代入第二行求y的值 \\
-3y + 2 = 2 \\
-3y = 0 \\
y = 0

\\ \\

3) 用 z=2, y=0 带入第一行求x的值
x + 0 + 2 = 6 \\
x = 4 \\

\\ \\

所以最终求得: x =4, y = 0, z = 2
$$

<br />

### 行列式求解

<br />

### Python求解

::: details numpy解法，相对计算快，浮点计算

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

import numpy as np


def linear_system(augmented_matrix, n=None):
    """使用 numpy.linalg.solve 解N元一次方程组, n默认值为None时自动推导是N元一次方程组
    返回:
        解的元组 (x1, x2, ..., xn) 或 None（无解或无唯一解）

    示例: 解3元一次方程组
        1.方程组原型为:
            a1x + b1y + c1z = d1
            a2x + b2y + c2z = d2
            a3x + b3y + c3z = d3

        2.augmented_matrix:
            是一个 3x4 的列表，代表增广矩阵, 每一行代表一个方程
            [a1, b1, c1, d1],
            [a2, b2, c2, d2],
            [a3, b3, c3, d3],
    """

    # 自动推导变量个数 n（除去最后一列是常数项）
    if n is None:
        n = len(augmented_matrix[0]) - 1

    # A 是系数矩阵，从每一行中取前n个元素 [a, b, c, ...]
    A = np.array([row[:n] for row in augmented_matrix], dtype=float)

    # 常数列向量
    b = np.array([row[n] for row in augmented_matrix], dtype=float)

    if A.shape[0] != A.shape[1]:
        print(f"警告：系数矩阵不是方阵，行数={A.shape[0]}, 列数={A.shape[1]}，无法用 numpy.linalg.solve 求唯一解")
        return None

    # 使用 numpy 的线性代数模块 linalg 中的 solve() 函数
    # 基于 LU 分解 实现的高效解法
    # 当矩阵 A 可逆（即有唯一解）时，它才会成功
    # 每个数字保留小数点后 6 位（方便阅读）
    # 报错说明矩阵不可逆，可能无解或有无穷多解
    try:
        solution = np.linalg.solve(A, b)
        return tuple(solution)
    except np.linalg.LinAlgError:
        return None


# 示例输入, 对应方程组
# 2x + 3y - z = 1
# 4x - y + 5z = 7
# -x + 2y + 3z = 4
eqs = [
    [2, 3, -1, 1],
    [4, -1, 5, 7],
    [-1, 2, 3, 4]
]

result = linear_system(eqs)

if result:
    x, y, z = result
    print(f"解为: x = {x}, y = {y}, z = {z}")
else:
    print("无解或无唯一解")

```

输出结果

```bash
解为: x = 0.40476190476190466, y = 0.45238095238095255, z = 1.1666666666666667
```

:::

::: details sympy解，相对计算慢，分数计算

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

from sympy import Matrix, Rational


def linear_system_sympy(augmented_matrix):
    """用 sympy 解线性方程组，支持分数"""

    # 把输入转成 sympy.Rational 对象
    mtx = []
    for row in augmented_matrix:
        mtx.append([Rational(x) for x in row])

    # 转成矩阵
    M = Matrix(mtx)

    # 系数矩阵 A 和常数向量 b
    A = M[:, :-1]
    b = M[:, -1]

    # 解方程 Ax = b
    try:
        sol = A.LUsolve(b)
        return tuple(sol)
    except Exception:
        return None


# 示例
# 2x + 3y - z = 1
# 4x - y + 5z = 7
# -x + 2y + 3z = 4
eqs = [
    [2, 3, -1, 1],
    [4, -1, 5, 7],
    [-1, 2, 3, 4]
]

res = linear_system_sympy(eqs)
if res:
    for i, val in enumerate(res, 1):
        print(f"x{i} = {str(val):8} (约等于 {float(val):.6f})")
else:
    print("无解或无唯一解")
```

输出结果

```bash
x1 = 17/42    (约等于 0.404762)
x2 = 19/42    (约等于 0.452381)
x3 = 7/6      (约等于 1.166667)
```

:::
