# Pillow

## 安装

```bash
# 安装
pip install pillow

# 备注
# 导入时使用 import PIL 或者 from PIL import xxx
```

<br />

## 核心对象：Image

### 打开、关闭、保存

::: details 点击查看详情

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

from PIL import Image

# 打开图像
# 参数：
#   fp      一般是文件名（字符串），必选
#   mode    目前只接受 "r"（只读）。传其它值会抛 ValueError
#   formats 可以传 list 或 tuple 限制要尝试识别的格式（比如 ("JPEG","PNG"), 用于加速或在多格式文件中强制某些解析方式
# 返回值：
#   如果打开的是PNG图片, 那么返回PIL.PngImagePlugin.PngImageFile
# 异常
#   如果文件不存在会报错 FileNotFoundError
# 说明
#   Pillow 打开图像是 惰性加载 的，也就是说：
#   Image.open() 只读取文件头，识别格式；
#   实际的像素数据只有在第一次访问（如 .load()、.show()、.getpixel()、.resize() 等）时才真正读取。
# 	打开后不能在Windows系统中直接删除文件会报错, 需要使用close或者save等方法关闭后才能删除
image = Image.open("tmp/test.png")

# Image对象属性
print(image.fp)  # 如果来自文件，会保存打开的文件对象引用
print(image.format)  # 例如 "PNG"，注意：如果图像来自 Image.new() 或 fromarray()，.format 可能为 None
print(image.mode)  # 图像颜色模式
print(image.size)  # 图像大小，宽和高, 等同于 (image.width, image.height)
print(image.info)  # 字典，包含元数据，如 PNG 的文本块、JPEG EXIF（需要额外处理）
print()

# 关闭文件
# image.close()

# 保存文件/另存为
# 参数:
#   quality         int     压缩质量（通常用于 JPEG, WebP, HEIC 等）0–100，默认 75
#   optimize        bool    是否优化压缩（True 可减少文件体积）
#   dpi             (x, y)  保存的 DPI 信息（打印时有用）
#   compress_level  int     压缩级别（PNG 专用，0–9，默认 6），设置为0时不压缩
#   save_all        bool    是否保存多帧图像（例如多帧 GIF）
# 说明：
#   Pillow（PIL）默认保存确实会“压缩”图像，分为
#       有损压缩    比如 JPEG，用算法丢失部分信息来减小体积，会降低画质
#       无损压缩    比如 PNG、TIFF 的 deflate/lzw 压缩，仅优化存储方式，不影响画质
image.save("tmp/test2.png")
```

:::

<br />

### 读取所有像素

::: details 点击查看详情

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

import numpy as np
from PIL import Image

# 打开图像
image = Image.open("tmp/test.png")
width, height = image.size

# 方法1：单点读取所有像素，速度慢，适合读取单像素、小图、调试等
# for y in range(height):
#     for x in range(width):
#         pixel = image.getpixel((x, y))
#         print(x, y, pixel)

# 方法2：load()读取图像, 也可以写入到 pixels
# pixels = image.load()
# for y in range(height):
#     for x in range(width):
#         r, g, b, *a = pixels[x, y]  # 直接访问
#         print(x, y, r, g, b)

# 方法3：getdata() —— 一次性取出所有像素, 一个列表，顺序为: 按行排序，从左到右排序
# data = list(image.getdata())  # 返回 [(R,G,B), (R,G,B), ...]
# print(len(data))  # 像素总数
# print(data[0])  # 第一个像素

# 方法4：转换为 NumPy 数组（最快、最方便批量处理）
# 修改后可直接回写到 Pillow：
#   new_img = Image.fromarray(arr)
#   new_img.save("new.png")
# arr = np.array(image)
# print(arr.shape)  # (height, width, 4)
# print(arr[0, 0])  # 第一个像素 [R, G, B, A]

# 遍历
arr = np.array(image)
for row in arr:
    for col in row:
        # 颜色, 一般是 RGB 或者 RGBA
        # col.tolist() 可以转为列表
        print(col)
```

:::

<br />

### 转换颜色模式

::: details 点击查看详情

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

from PIL import Image

# 打开图像
image = Image.open("tmp/test.png")

# 转换颜色模式
# 颜色模式
# 	1		黑白				   1 通道	备注: 字符串格式的数字1
#   L       灰度               1 通道
#   RGB     真彩色             3 通道
#   RGBA    带透明度的真彩色     4 通道
# 返回值
#   .convert 返回一个新的 Image 对象，而不是在原图上修改
#   如果要重新赋值，可以直接修改原对象：image = image.convert("L")
# image = image.convert("L")

# 为了方便处理，建议统一转为RGBA模式（大部分模式可以转为 RGBA）
# image = image.convert("RGBA") if image.mode != "RGBA" else image

# 转换颜色
image1 = image.convert("1")
imageL = image.convert("L")

# 查看图像
image1.show()
imageL.show()
image.show()
```

![image-20251014205002943](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20251014205002943.png)

:::

<br />

### 获取图像颜色

::: details 基础用法

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

from PIL import Image

# 打开图像
image = Image.open("tmp/test.png")
width, height = image.size

# 用于统计图像中每种颜色出现的次数
# maxcolors 能统计的颜色种类上限。如果图片中颜色种类超过这个值，会返回 None
# 返回一个 列表，每个元素是一个元组：[(count1, color1), (count2, color2), ...]
colors = image.getcolors(maxcolors=9999)

# 总共有多少种颜色
print(f"颜色种类数量: {len(colors)}")

# 查看出现次数最多的Top 5颜色
colors.sort(reverse=True)  # 按数量降序
print("Top 5 colors:")
for i in colors[:5]:
    print(i)

# 判断图像是否纯色
if colors and len(colors) == 1:
    print("这是纯色图像，颜色为", colors[0][1])

# 获取背景色（出现最多的颜色）
bg = max(colors, key=lambda x: x[0])[1]
print(f"背景颜色为: {bg}")
```

:::

::: details 纯白图像居然出现多种白色？

**生成一张全白图像，但是有多种白色**

```python
from PIL import Image
import numpy as np

# 创建一个随机接近白色的图像
width, height = 200, 200

# 生成 [240, 255] 之间的随机像素值
arr = np.random.randint(240, 256, (height, width, 3), dtype=np.uint8)

# 转成 Pillow 图像
image = Image.fromarray(arr, "RGB")  # 第二个参数在Pillow 13以后弃用, 会自动推导
image.save("tmp/test.png")
```

**统计颜色**

```bash
颜色种类数量: 4096
Top 5 colors:
(30, (252, 248, 242))
(22, (244, 250, 252))
(21, (253, 248, 252))
(21, (251, 254, 245))
(21, (250, 249, 244))
```

:::

::: details 编写一个函数，用于区分主要颜色，可根据实际情况调整

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-

from math import sqrt
from PIL import Image


def get_color_name(r, g, b):
    # normalized
    r_, g_, b_ = r/255.0, g/255.0, b/255.0
    mx, mn = max(r_, g_, b_), min(r_, g_, b_)
    l = (mx + mn) / 2.0
    d = mx - mn

    # Treat near-white / near-black first (more tolerant thresholds)
    if l >= 0.92 and d <= 0.12:
        return "白"
    if l <= 0.08 and d <= 0.12:
        return "黑"
    # Low saturation -> gray (midtones)
    if d <= 0.08:
        return "灰"

    # compute hue (0-360)
    if mx == r_:
        h = ((g_ - b_) / d) % 6
    elif mx == g_:
        h = ((b_ - r_) / d) + 2
    else:
        h = ((r_ - g_) / d) + 4
    h *= 60

    # map hue to main color buckets
    if h < 15 or h >= 345:
        return "红"
    elif h < 45:
        return "橙"
    elif h < 65:
        return "黄"
    elif h < 170:
        return "绿"
    elif h < 200:
        return "青"
    elif h < 260:
        return "蓝"
    elif h < 320:
        return "紫"
    else:
        return "粉"

# 打开图像
image = Image.open("tmp/test.png")

# 遍历所有像素
data = image.getdata()
for pixel in data:
    name = get_color_name(*pixel[:3])
    if name not in ["白"]:
        print(name, pixel)
```

:::

::: details 减少颜色数量到指定个数：image.quantize(colors=256)

```python
quantize 是 颜色压缩与调色板生成的核心方法，常用于生成 GIF、减少 PNG 文件大小，或进行视觉风格化处理。
	colors → 控制数量
	method → 控制算法
	dither → 控制抖动效果
	palette → 自定义颜色映射

暂时用不到
```

:::

<br />

### 图像缩放方法

::: details 点击查看详情

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-


from PIL import Image

# 打开图像
image = Image.open("tmp/qq.png")
width, height = image.size

# 图像缩放，返回一个 新的 Image 对象
# 参数
#   size        (width, height) 元组          目标图像的尺寸（像素为单位）
#   resample    整数（常量）                   重采样算法（控制缩放质量）
#   box         (left, upper, right, lower)   仅从原图指定区域中缩放（类似裁剪后再缩放）
#   reducing_gap float                        用于优化性能和质量
#                                             如果设置 reducing_gap=2.0，Pillow 会先临时缩小到 1/2 再精确缩放。
#                                             通常建议设置为 1.0～2.0 之间，质量与性能平衡

# resample参数
# Image.Resampling.NEAREST	    最近邻	最快，但锯齿明显（像素化）
# Image.Resampling.BOX	        盒采样	比 NEAREST 稍好一点，速度也快
# Image.Resampling.BILINEAR	双线性插值	常用于放大，效果较柔和
# Image.Resampling.HAMMING	    Hamming 滤波	略优于双线性
# Image.Resampling.BICUBIC	    双三次插值	更平滑的缩放，放大质量好
# Image.Resampling.LANCZOS	    高质量重采样（推荐）	最清晰，但速度最慢，尤其缩小时效果最佳

# 总结
# resize() 不会保持宽高比，除非你手动计算
# 图像缩放后RGB一般会发生变化，NEAREST除外（待测试）

# 按比例缩放：缩小1倍
scale = 0.5
resized = image.resize((int(width * scale), int(height * scale)), Image.Resampling.LANCZOS)
resized.show()

# 缩小1倍：也可以使用 reduce，它只能整数倍缩小, 不能放大
image.reduce(2).show()
```

:::

<br />

### 其他方法总结

```python
.copy()		# 图像复制，返回一个新的Image对象
.readonly   # 图像是否是只读，只是 Pillow 内部的内存状态标志，它与操作系统层面的文件读写权限没有关系
```

<br />

## 图像绘制：ImageDraw

说明：用于Pillow 中在图像上绘制各种形状、文字的核心模块

<br />

### 绘制形状

::: details 基本用法

```python

from PIL import Image, ImageDraw

# 创建画布，参数分别为：颜色模式、画布大小、背景颜色
image = Image.new("RGB", (500, 400), (255, 255, 255))
draw = ImageDraw.Draw(image)

# xy参数在不同形状中的含义，xy = (left, top, right, bottom)

# 矩形 rectangle:
#   left, top → 左上角坐标，right, bottom → 右下角坐标
# 	矩形形状由这两个点决定：
# 	(left, top) --------
#   |                  |
#   |                  |
#   -------- (right,bottom)

# 圆形 ellipse:
#   和矩形类似，圆会完全贴合这个矩形
#   宽>高 → 横向椭圆
#   宽=高 → 正圆

# 多边形 polygon:
# 	xy = 顶点列表 [(x1,y1), (x2,y2), ...]
# 	Pillow 会按顺序连接这些顶点，并自动闭合最后一条边
# 	顶点顺序决定多边形方向（顺时针或逆时针）

# 线 line:
# 	xy = 点列表 [(x1,y1), (x2,y2), ...]
# 	Pillow 会依次连接这些点形成折线
# 	可以绘制单条直线（两个点）或多段折线

# 点 point:
# 	xy = 单个坐标 (x,y) 或列表 [(x1,y1), (x2,y2), ...]
# 	绘制单个像素点或一组单个的点


# 1️⃣ 正方形， 左上角 (50,50), 右下角 (150,150)
draw.rectangle((50, 50, 150, 150), fill=(255, 0, 0), outline=(0, 0, 0), width=3)

# 2️⃣ 长方形
draw.rectangle((200, 50, 350, 150), fill=(0, 255, 0), outline=(0, 0, 0), width=3)

# 3️⃣ 三角形
triangle_points = [(100, 250), (50, 350), (150, 350)]
draw.polygon(triangle_points, fill=(0, 0, 255), outline=(0, 0, 0))

# 4️⃣ 圆形
draw.ellipse((225, 250, 325, 350), fill=(255, 255, 0), outline=(0, 0, 0), width=3)

# 显示图像
image.show()
```

:::

::: details 绘制一个十字形，将画布分为四个均匀大小的空格

```python
from PIL import Image, ImageDraw

# 1️⃣ 创建画布
width, height = 600, 400
image = Image.new("RGB", (width, height), (255, 255, 255))
draw = ImageDraw.Draw(image)

# 画布边框
draw.rectangle(xy=(0, 0, image.width - 1, image.height - 1), outline=(0, 0, 0), width=1)

# 2️⃣ 计算中心坐标
center_x = width // 2
center_y = height // 2

# 3️⃣ 绘制垂直线（从顶部到底部）
draw.line((center_x, 0, center_x, height), fill=(128, 128, 128), width=1)

# 4️⃣ 绘制水平线（从左到右）
draw.line((0, center_y, width, center_y), fill=(128, 128, 128), width=1)

# 5️⃣ 显示图片
image.show()
```

:::

<br />

### 边框问题

::: details 点击查看详情

```python
from PIL import Image, ImageDraw, ImageOps

# 创建画布，参数分别为：颜色模式、画布大小、背景颜色, 255为全白
image = Image.new("RGB", (500, 400), (255, 255, 255))
draw = ImageDraw.Draw(image)

# 外边框，将边框放在画布外（画布尺寸变大，更直观可靠）, 返回一个 新的Image对象
# 粗边框和细边框都显示正常
# image2 = ImageOps.expand(image, border=50, fill=(0, 0, 0))
# image2.show()

# --------------------------------------------------------------------------

# 内边框, 将边框放在画布内（画布尺寸不变），直接修改原图

# 粗边框显示正常
# draw.rectangle(xy=(0, 0, image.width, image.height), outline=(0, 0, 0), width=50)

# 细边框右边和下边显示不全
# draw.rectangle(xy=(0, 0, image.width, image.height), outline=(0, 0, 0), width=1)

# 所以需要右下坐标减去一点, 或者-0.5也行，这里的细节还没深入研究
draw.rectangle(xy=(0, 0, image.width - 1, image.height - 1), outline=(0, 0, 0), width=1)
draw.rectangle(xy=(0.5, 0.5, image.width - 0.5, image.height - 0.5), outline=(0, 0, 0), width=1)

# 显示图像
image.show()
```

:::

<br />

### 加载字体

::: details 点击查看详情

**查找字体安装位置**

```bash
# 字体存放位置
为所有用户安装: C:\Windows\Fonts
仅当前用户安装: C:\Users\<用户名>\AppData\Local\Microsoft\Windows\Fonts

# 在命令行中使用如下代码可快速查看用户字体安装位置
# python -c "import os; print(os.path.join(os.environ['LOCALAPPDATA'], 'Microsoft', 'Windows', 'Fonts'))"

# 注意
# Pillow 默认只扫描系统目录，用户字体可能找不到, 所以推荐在安装时选择右键->为所有用户安装
```

**查看字体详情**

```python
from PIL import ImageFont

# 字体文件名并不等于字体名称
# 如果本地有字体文件, 安装到系统中后需要使用 字体名称 到指定目录中去查赵
# 可以通过如下代码查看字体名称

font_path = r"font/华康墨字体 STD W9.OTF"  # 替换为你的字体文件路径
font = ImageFont.truetype(font_path, 40)
print(font.getname())  # 输出字体家族名和样式
```

**加载指定字体**

```python
from PIL import ImageFont

# 参数1: 字体文件路径或文件对象。可以是 .ttf, .otf 等字体文件路径
# 参数2: 字号大小（以像素为单位），即字体的高度

# 需要为所有用户安装字体
font1 = ImageFont.truetype(r"华康墨字体 STD W9.OTF", 40)

# 直接加载字体文件
font2 = ImageFont.truetype(r"font/华康墨字体 STD W9.OTF", 40)
```

:::

<br />

### 绘制文字

::: details 绘制文字

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

from PIL import Image, ImageDraw, ImageFont

# 创建一个空白画布
image = Image.new("RGBA", (600, 400), (255, 255, 255))
draw = ImageDraw.Draw(image)

# 给画布添加边框
draw.rectangle(xy=(0, 0, image.width - 1, image.height - 1), outline=(0, 0, 0), width=1)

# 加载字体文件
font = ImageFont.truetype(r"font/华康墨字体 STD W9.OTF", 200)

# 绘制文字
# 第一个参数:    设置文字左上角位置（默认以该点为文字的起点）。如果用了 anchor 参数，意义会变化。
# 第二个参数:    要绘制的文字内容。支持换行符 \n
# fill          字体颜色，例如 (255, 0, 0) 或 "red"
# align         多行文字的水平对齐方式 "left" / "center" / "right"
# anchor        控制文字锚点对齐方式。常用值：
#                   "lt"：左上角（默认）
#                   "mm"：中心点
#                   "rb"：右下角
#                   "ma"：水平中点、基线对齐
# spacing       行间距（仅当 text 含换行符时生效）
# direction     文字方向：
#                   "ltr"：从左到右（默认）
#                   "rtl"：从右到左（阿拉伯语等）
#                   "ttb"：从上到下（竖排）
# stroke_width  描边宽度（像素）
# stroke_fill   描边颜色
# embedded_color 是否使用字体自带的颜色（主要用于彩色字体，如 emoji 字体）。
draw.text((0, 0), "你好", fill=(0, 0, 0), font=font)

# 显示图片
image.show()
```

:::

::: details 获取字体绘制后的占用位置

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

from PIL import Image, ImageDraw, ImageFont

# 创建一个空白画布
image = Image.new("RGBA", (600, 400), (255, 255, 255))
draw = ImageDraw.Draw(image)

# 给画布添加边框
draw.rectangle(xy=(0, 0, image.width - 1, image.height - 1), outline=(0, 0, 0), width=1)

# 加载字体文件
font = ImageFont.truetype(r"font/华康墨字体 STD W9.OTF", 200)

# 绘制文字
draw.text((0, 0), "你好", font=font, fill=(255, 0, 0))

# 计算文字所占用的宽和高
bbox = draw.textbbox((0, 0), "你好", font=font)
width = bbox[2] - bbox[0]
height = bbox[3] - bbox[1]
print(bbox)  # (0, 30, 400, 172)
print(width, height)

# 如果只需要获取宽度的话:
width = draw.textlength("你好", font=font)
print(width)

# 显示图片
image.show()
```

:::

::: details 让文字在画布中居中（不是太精确那种）

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

from PIL import Image, ImageDraw, ImageFont

# 创建一个空白画布, 黑色背景
image = Image.new("RGBA", (600, 400), (0, 0, 0))
draw = ImageDraw.Draw(image)

# 加载字体文件
font = ImageFont.truetype(r"font/华康墨字体 STD W9.OTF", 200)
text = "你好"

# 给画布添加边框
draw.rectangle(xy=(0, 0, image.width - 1, image.height - 1), outline=(0, 0, 0), width=1)

# 测量文字尺寸
bbox = draw.textbbox((0, 0), text, font=font)
width = bbox[2] - bbox[0]
height = bbox[3] - bbox[1]

# 计算文字起点
x = (image.width - width) // 2
y = (image.height - height) // 2 * 0.78  # 视觉上偏下, 所以这里往上偏一些

# 绘制文字
draw.text((x, y), text, font=font, fill=(255, 0, 0))

# 显示图片
image.show()
```

:::

::: details 给文字添加描边

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

from PIL import Image, ImageDraw, ImageFont

# 创建一个空白画布
# image = Image.new("RGBA", (600, 400), (0, 0, 0, 255))  # 黑色背景, 255=完全不透明
image = Image.new("RGBA", (600, 400), (255, 255, 255, 0))  # 白色背景, 0=完全透明
draw = ImageDraw.Draw(image)

# 备注: 如果背景设置的是完全透明，那么背景颜色是什么也就无所谓了, 显示效果都一样


# 加载字体文件
font = ImageFont.truetype(r"font/华康墨字体 STD W9.OTF", 350)
text = "好"

# 给画布添加边框
draw.rectangle(xy=(0, 0, image.width - 1, image.height - 1), outline=(0, 0, 0), width=1)

# 测量文字尺寸
bbox = draw.textbbox((0, 0), text, font=font)
width = bbox[2] - bbox[0]
height = bbox[3] - bbox[1]

# 计算文字起点
x = (image.width - width) // 2
y = (image.height - height) // 2 * 0.3  # 视觉上偏下, 所以这里往上偏一些

# 绘制文字
draw.text((x, y), text, font=font, fill="#B21F24", stroke_width=33, stroke_fill="#F5F8F4")

# 显示图片
image.show()
```

:::

::: details 字体不支持该文字的情况下

```python
#!/usr/bin/env python
# -*-coding:utf-8 -*-

from PIL import Image, ImageDraw, ImageFont

# 创建一个空白画布, 黑色背景
image = Image.new("RGBA", (600, 400), (0, 0, 0))
draw = ImageDraw.Draw(image)

# 加载字体文件
font = ImageFont.truetype(r"font/华康墨字体 STD W9.OTF", 200)
text = "髾𤫩"

# 给画布添加边框
draw.rectangle(xy=(0, 0, image.width - 1, image.height - 1), outline=(0, 0, 0), width=1)

# 测量文字尺寸
bbox = draw.textbbox((0, 0), text, font=font)
width = bbox[2] - bbox[0]
height = bbox[3] - bbox[1]
print(width)

# 计算文字起点
x = (image.width - width) // 2
y = (image.height - height) // 2 * 0.78  # 视觉上偏下, 所以这里往上偏一些

# 绘制文字
draw.text((x, y), text, font=font, fill=(255, 0, 0), stroke_width=50, stroke_fill=(255, 255, 255))

# 显示图片
image.show()

# 分析
# 第一种情况是: 字体直接不显示, 但是依旧占据大小
# 第二种情况是: 字体使用方框代替
```

:::

<br />

## 图像裁剪

### 基础用法

::: details 点击查看详情

```python
#!/usr/bin/env python
# -*-coding:utf-8-*-


from PIL import Image

# 打开图像
image = Image.open("tmp/test.png").convert("RGB")
width, height = image.size

# 设置裁剪区域
#   格式为 (left, upper, right, lower), 也就是 (左, 上, 右, 下)的坐标
#   但是需要注意：裁剪区域 包含【左，上】坐标，不包含【右，下】坐标
#   如果裁剪区域大于图像大小，超出图像边界的部分会进行填充, RGB模式用黑色填充, RGBA模式用透明填充

# box = (50, 50, width-50, height-50)  # 四个边都裁剪50像素
box = (-50, -50, width+50, height+50)  # 四个边都加上50像素, 会自动填充

# 裁剪图像, 会返回一个新的 Image 对象
image2 = image.crop(box)
image2.show()
```

:::

### 案例：裁剪描边以外的像素

::: details 裁剪掉描边以外的像素

```python
#!/usr/bin/env python
# -*- coding:utf-8 -*-
import numpy as np
from PIL import Image, ImageDraw, ImageFont


def make_image(text):
    # 创建空白画布
    image = Image.new("RGBA", (600, 400), (255, 255, 255, 0))  # 透明背景
    draw = ImageDraw.Draw(image)

    # 加载字体
    font = ImageFont.truetype(r"font/华康墨字体 STD W9.OTF", 350)

    # 绘制文字（红色主体 + 白描边）
    draw.text((100, 20), text, font=font, fill="#B21F24", stroke_width=33, stroke_fill="#F5F8F4")

    return image


def crop_non_transparent(image: Image):
    arr = np.array(image)

    # 找出所有非透明像素
    alpha = arr[:, :, 3]
    non_transparent = np.where(alpha > 0)
    if non_transparent[0].size == 0:
        print("图像中没有可见内容")
        return

    # 计算非透明区域的边界框
    top = np.min(non_transparent[0])
    bottom = np.max(non_transparent[0])
    left = np.min(non_transparent[1])
    right = np.max(non_transparent[1])

    # 裁剪出含描边和主体的区域
    cropped_arr = arr[top:bottom + 1, left:right + 1, :]

    # 转回 Pillow 图像
    result = Image.fromarray(cropped_arr)

    return result


if __name__ == "__main__":
    # 绘制文字
    image = make_image("好")

    # 裁剪掉描边以外的部分
    image = crop_non_transparent(image)

    # 保存
    image.save("test.png")
```

:::

<br />

## 图像合成

```bash
# 方法			是否修改原图	是否支持透明			特点						灵活性评价
paste()				✅			✅			基础贴图/覆盖					高：可局部覆盖，支持 mask 和透明图像
alpha_composite()	❌			✅			RGBA 层叠，自动透明处理		  中：自动处理透明，但只支持RGBA
composite()			❌			✅			mask 控制选择性合成			高：局部透明控制精确，mask 可自由绘制
blend()				❌			❌			全图按比例混合					低：只能做全图混合，不能局部控制
ImageChops			❌			❌			通道运算，可做加减乘除等效果		高：可做任意像素运算，适合高级效果，但需要手动处理透明和位置
ImageOps			❌			视具体方法	  图像风格化与颜色调整			中：偏向图像风格处理，不是精确合成工具
```

