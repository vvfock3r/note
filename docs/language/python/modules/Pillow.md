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
        print(col)  # 颜色, 一般是 RGB 或者 RGBA
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

<br />

### 图像裁剪方法



<br />

### 其他方法总结

```python
# .copy()
# .crop() / .resize()
```

<br />