# MSS

Github：[https://github.com/BoboTiG/python-mss](https://github.com/BoboTiG/python-mss)

文档：[https://python-mss.readthedocs.io/installation.html](https://python-mss.readthedocs.io/installation.html)

<br />

## 安装

```bash
python -m pip install -U  mss
```

<br />

## 截屏

::: details 截屏示例

```python
from mss import mss

# mss() 根据操作系统返回不同的MSS类实例化对象
# sct 一般被理解为 "screen capture tool"
# 截取主显示器并保存, mon=1 代表截取第一个显示器
with mss() as sct:
    filename = sct.shot(mon=1, output="screen_{mon}.png")
    print("截图已保存:", filename)
```

:::

::: details 不使用with语法

```python
from mss import mss

# 实例化对象
sct = mss()

# 截屏
filename = sct.shot(mon=1, output="screen_{mon}.png")
print("截图已保存:", filename)

# 释放资源
sct.close()
```

:::

<br />

## 截屏部分区域

::: details 截取指定区域

```python
from mss import mss
import mss.tools

with mss.mss() as sct:
    # 定义截取区域
    monitor = {"top": 160, "left": 160, "width": 160, "height": 135}
    output = "sct-{top}x{left}_{width}x{height}.png".format(**monitor)

    # 返回一个 ScreenShot 对象
    # sct_img 里包含像素数据，可以用 sct_img.rgb 或 sct_img.pixel(x, y) 访问
    sct_img = sct.grab(monitor)

    # 保存为图片
    mss.tools.to_png(sct_img.rgb, sct_img.size, output=output)
```

:::

<br />

## 设置压缩比例

::: details 截取指定区域

```python
from datetime import datetime
from mss import mss
import mss.tools

start = datetime.now()

with mss.mss() as sct:
    # 值越小 → 保存越快，文件大
    # 值越大 → 保存慢，但文件小

    # 数值含义
    # 0     不压缩（速度最快，文件最大）
    # 1     最小压缩（速度快，文件稍大）
    # 2~8   压缩程度逐渐加大，速度稍慢，文件更小
    # 9     最大压缩（速度慢，文件最小）

    # 所以对于 频繁截图或录屏，通常建议：
    #   使用 低压缩等级（1~2） → CPU 快，文件稍大
    #   如果只截一张图，想文件小 → 可以用高压缩
    sct.compression_level = 2
    filename = sct.shot(mon=1, output="screen_{mon}.png")

print(datetime.now() - start)
```

:::

<br />

## 转为其他对象

::: details 点击查看详情

```python
from datetime import datetime
from mss import mss
import mss.tools
from PIL import Image
import numpy as np

start = datetime.now()

with mss.mss() as sct:
    # 抓屏
    sct.compression_level = 1
    monitor = sct.monitors[1]
    screenshot = sct.grab(monitor)

    # 转为 Pillow 图像
    # img = Image.frombytes("RGB", screenshot.size, screenshot.rgb)
    # img.show()

    # 转为 NumPy 数组（方便 OpenCV）
    # img_array = np.array(screenshot)  # 包含透明通道 alpha
    img_array = np.array(screenshot)[:, :, :3]  # 去掉透明通道 alpha

print(datetime.now() - start)
```

:::

<br />

## 获取像素颜色

::: details 点击查看详情

```python
from datetime import datetime

import pyautogui
from mss import mss
import mss.tools
from PIL import Image
import numpy as np

start = datetime.now()

with mss.mss() as sct:
    # 抓屏
    sct.compression_level = 1
    monitor = sct.monitors[1]
    screenshot = sct.grab(monitor)

    # 指定像素坐标
    x, y = 100, 200

    # 获取像素颜色: 方式1
    # color = screenshot.pixel(x, y)  # 返回 (R, G, B)
    # print(f"像素 ({x},{y}) 的颜色: {color}")

    # 方式2: 计算像素在 rgb bytes 中的位置
    # width, height = screenshot.size
    # index = (y * width + x) * 3
    # r = screenshot.rgb[index]
    # g = screenshot.rgb[index + 1]
    # b = screenshot.rgb[index + 2]
    # print(f"像素 ({x},{y}) 的颜色: ({r}, {g}, {b})")

    # 方式3: 这种方式最快
    img = np.array(screenshot)  # shape=(height, width, 4)，BGRA
    color = img[200, 100, :3]  # BGR 或 RGBA，根据系统
    print(f"像素 ({x},{y}) 的颜色: {color}")

print(datetime.now() - start)
```

:::

<br />

## 录制MP4视频

::: details 录制视频

```python
import cv2
from mss import mss
import numpy as np
import time

# 定义录制参数
duration = 30  # 计划录制的秒数
fps = 20  # 帧率, 每秒多少帧(多少张图)
frames = fps * duration  # 计算总共多少张图片
output = "screen.mp4"

with mss() as sct:
    # 获取主显示器全屏尺寸
    monitor = sct.monitors[0]

    # 定义视频编码器和输出文件
    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    out = cv2.VideoWriter(output, fourcc, fps, (monitor["width"], monitor["height"]))

    # 开始录制
    for _ in range(frames):
        img = sct.grab(monitor)
        frame = np.array(img)[:, :, :3]  # BGRA -> BGR
        out.write(frame)
        time.sleep(1 / fps)  # 控制帧率

    out.release()
```

:::

::: details 添加文字

```python
import cv2
from mss import mss
import numpy as np
import time

# 定义录制参数
duration = 30  # 计划录制的秒数
fps = 20  # 帧率, 每秒多少帧(多少张图)
frames = fps * duration  # 计算总共多少张图片
output = "screen.mp4"

with mss() as sct:
    # 获取主显示器全屏尺寸
    monitor = sct.monitors[0]

    # 定义视频编码器和输出文件
    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    out = cv2.VideoWriter(output, fourcc, fps, (monitor["width"], monitor["height"]))

    # 开始录制
    for i in range(frames):
        img = sct.grab(monitor)
        frame = np.array(img)[:, :, :3].copy()

        # 添加文字
        text = f"Frame: {i + 1}"
        cv2.putText(frame, text, (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2, cv2.LINE_AA)

        out.write(frame)
        time.sleep(1 / fps)  # 控制帧率

    out.release()
```

:::

<br />

::: details 绘制鼠标（非系统鼠标样式，那么会太卡）

```python
import time
import ctypes

import cv2
import numpy as np
from mss import mss

# 定义录制参数
duration = 5  # 计划录制的秒数
fps = 20  # 帧率, 每秒多少帧(多少张图)
frames = fps * duration  # 计算总共多少张图片
output = "screen.mp4"


class POINT(ctypes.Structure):
    _fields_ = [("x", ctypes.c_long), ("y", ctypes.c_long)]


def point():
    pt = POINT()
    ctypes.windll.user32.GetCursorPos(ctypes.byref(pt))
    return pt.x, pt.y


with mss() as sct:
    # 获取主显示器全屏尺寸
    monitor = sct.monitors[0]

    # 定义视频编码器和输出文件
    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    out = cv2.VideoWriter(output, fourcc, fps, (monitor["width"], monitor["height"]))

    # 开始录制
    for i in range(frames):
        img = sct.grab(monitor)
        frame = np.array(img)[:, :, :3].copy()

        # 绘制鼠标
        mx, my = point()
        cv2.circle(frame, (mx, my), 8, (0, 0, 255), -1, lineType=cv2.LINE_AA)

        # 添加文字
        text = f"Frame: {i + 1}"
        cv2.putText(frame, text, (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2, cv2.LINE_AA)

        out.write(frame)
        time.sleep(1 / fps)  # 控制帧率

    out.release()
```

:::

::: details 多进程模型：截屏和写入文件分离

```python
import ctypes
from multiprocessing import Process, Queue

import cv2
import numpy as np
from mss import mss

# 录制参数
duration = 5  # 秒
fps = 20
frames = fps * duration
output_file = "screen.mp4"


# 鼠标获取
class POINT(ctypes.Structure):
    _fields_ = [("x", ctypes.c_long), ("y", ctypes.c_long)]


def get_cursor():
    pt = POINT()
    ctypes.windll.user32.GetCursorPos(ctypes.byref(pt))
    return pt.x, pt.y


# 截屏进程
def grab_frame(queue: Queue):
    with mss() as sct:
        monitor = sct.monitors[0]
        for _ in range(frames):
            img = sct.grab(monitor)
            queue.put(np.array(img)[:, :, :3].copy())
        queue.put(None)  # 结束标记


# 视频写入进程
def save_video(queue: Queue, output_file, width, height):
    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    out = cv2.VideoWriter(output_file, fourcc, fps, (width, height))

    i = 0
    while True:
        frame = queue.get()
        if frame is None:
            break

        # 绘制鼠标
        mx, my = get_cursor()
        cv2.circle(frame, (mx, my), 8, (0, 0, 255), -1, lineType=cv2.LINE_AA)

        # 添加文字
        text = f"Frame: {i + 1}"
        cv2.putText(frame, text, (50, 50), cv2.FONT_HERSHEY_SIMPLEX,
                    1, (0, 0, 255), 2, cv2.LINE_AA)

        out.write(frame)
        i += 1

    out.release()


if __name__ == "__main__":
    # 创建队列
    queue = Queue(maxsize=100)  # 限制队列长度防止内存过大

    # 获取屏幕尺寸
    with mss() as sct:
        monitor = sct.monitors[0]
        width, height = monitor["width"], monitor["height"]

    # 启动两个进程
    p1 = Process(target=grab_frame, args=(queue,))
    p2 = Process(target=save_video, args=(queue, output_file, width, height))

    p1.start()
    p2.start()

    p1.join()
    p2.join()
```

:::