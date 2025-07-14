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





### 常见数学符号

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

**代码演示**

```python
import numpy as np

# 创建向量
vector1 = np.array([1, 2, 3])
vector2 = np.array([
    [1, 2],
    [2, 3],
    [3, 4]
])

# 查看向量的信息
print("向量: ", vector1)
print("维度: ", vector1.ndim)  # 1 表示一维向量
print("形状: ", vector1.shape)  # 代表3个元素, 注意看第二个值是空的
print("大小: ", vector1.size)  # 大小，代表总的个数
print()

# 查看向量的信息
print("向量: ", vector2)
print("维度: ", vector2.ndim)  # 表示二维向量
print("形状: ", vector2.shape)  #
print("大小: ", vector2.size)  # 大小，代表总的个数
```

输出结果

```bash
向量:  [1 2 3]
维度:  1
形状:  (3,)
大小:  3

向量:  [[1 2]
 [2 3]
 [3 4]]
维度:  2
形状:  (3, 2)
大小:  6
```

<br />

### 向量加法

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

# 加一个向量
# 公式: (x, y) + (a, b) = (x+a, y+b)
print(vector1 + vector2)
# print(vector1 + vector3) # 因为两个向量形状不一样，不能这样使用加法
print(vector3 + vector3)

# 减法也一样
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

<br />

### 向量数乘

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

# 乘一个标量
# n * (a, b) = (n*a, n*b)
print(vector1 * 2)
print(3 * vector2)
```

输出结果

```bash
[2 4 6]
[ 9 18 27]
```

<br />

### 零向量

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

<br />

### 向量的模

**向量的模**（也称为向量的“长度”或“范数”）是表示向量“有多大”的一个标量值

对于向量
$$
\vec{v} = [x_1, x_2, \dots, x_n]
$$
其模为：
$$
\|\vec{v}\| = \sqrt{x_1^2 + x_2^2 + \dots + x_n^2}
$$

简单点说，就是向量的长度，比如在直角坐标系中，向量为（1, 2），那么我们画一个直角三角形，也就是求斜边的长度，根据勾股定理得到
$$
\sqrt{1^2 + 2^2} = 3
$$
![image-20250330231706765](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20250330231706765.png)

用代码演示一下

```python
import numpy as np

# 定义向量
v1 = np.array([1, 2])
v2 = np.array([3, 4])
v3 = np.array([5, 6])

# 取向量的模
print(np.linalg.norm(v1))  # 2.23606797749979
print(np.linalg.norm(v2))  # 5.0
print(np.linalg.norm(v3))  # 7.810249675906654
```

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

### 向量点乘

向量的点乘（也叫**内积**或**标量积**）是一种重要的数学运算，它不仅在纯数学中有着广泛的应用，而且在物理学、计算机科学、工程学等领域也有着重要作用。

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

# 方法 2：使用 @ 运算符（Python 3.5+）
dot2 = a @ b

# 方法 3：手动写出分量乘积
dot3 = a[0] * b[0] + a[1] * b[1]

print(f"点乘结果（方法1 - np.dot） : {dot1}")
print(f"点乘结果（方法2 - @ 运算符）: {dot2}")
print(f"点乘结果（方法3 - 手动计算） : {dot3}")
```

输出结果

```bash
点乘结果（方法1 - np.dot） : 10
点乘结果（方法2 - @ 运算符）: 10
点乘结果（方法3 - 手动计算） : 10
```

<br />

### 向量叉乘

<br />



## 矩阵（Matrix）

### 说明

向量是对数的拓展，一个向量表示一组数

**矩阵是对向量的拓展，一个矩阵表示一组向量**
$$
矩阵示例如下\\
\begin{bmatrix}
姓名 & 语文 & 数学 & 英语 & 物理 & 化学 \\
张三 & 85 & 92 & 89 & 75 & 80 \\
李四 & 78 & 88 & 84 & 92 & 85 \\
王五 & 90 & 76 & 94 & 80 & 88
\end{bmatrix}
$$


<br />

### 定义矩阵

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

# 3.定义一个全1矩阵
ones_matrix = np.ones((3, 2))  # 3行2列的全1矩阵
print(ones_matrix)
print()

# 4.定义一个单位矩阵
identity_matrix = np.eye(3)  # 3x3 单位矩阵
print(identity_matrix)
print()

# 5.定义一个随机矩阵
random_matrix = np.random.rand(2, 3)  # 2x3 的随机矩阵（值在 [0, 1) 之间）
print(random_matrix)
print()

# 6.从数值范围创建矩阵
range_matrix = np.arange(10, 22, 2).reshape(2, 3)  # 10-22 的数字，步长为2，重塑为 2x3 矩阵
print(range_matrix)
```

输出结果

```bash
[[1 2 3]
 [4 5 6]]

[[0. 0. 0.]
 [0. 0. 0.]]

[[1. 1.]
 [1. 1.]
 [1. 1.]]

[[1. 0. 0.]
 [0. 1. 0.]
 [0. 0. 1.]]

[[0.01161085 0.75725352 0.31797519]
 [0.59607607 0.60823569 0.73850909]]

[[10 12 14]
 [16 18 20]]
```

<br />

### 基本运算



<br />

## 求解N元一次方程组

```latex
\begin{cases}
x + y + z = 1 \\
x + y + 2z = 2 \\
x + 2y + z = 3
\end{cases}
```

