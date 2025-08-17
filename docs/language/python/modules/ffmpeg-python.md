# ffmpeg-python

Github：[https://github.com/kkroening/ffmpeg-python](https://github.com/kkroening/ffmpeg-python)

<br />

## 安装

```bash
# 安装Python库
pip install ffmpeg-python

# 注意: 将ffmpeg二进制命令放到PATH目录下, ffmpeg-pytho库会调用二进制的ffmpeg
```

<br />

## 录制屏幕

::: details （1）第一个示例

```python
import ffmpeg

# 定义输出文件
output_file = "screen.mp4"

# 录制Windows屏幕
# 函数链式调用如果写在多行，需要用 括号、反斜杠 \、或在字符串里隐式换行来保持语法正确，使用括号就不需要添加反斜杠
# input() → 指定输入源
#   "desktop" → Windows 平台下的 gdigrab 设备名，表示捕获整个桌面
#   format="gdigrab" → 指定输入的格式，gdigrab 是 FFmpeg 的 Windows 屏幕捕获模块
#   framerate=30 → 设置捕获帧率为 30 帧/秒
#   等价于命令行里的 ffmpeg -i desktop -f gdigrab -framerate 30
# output() → 指定输出文件以及编码参数
#   output_file → "screen.mp4"，输出文件路径
#   vcodec="libx264" → 使用 H.264 视频编码器（常见、兼容性好）
#   preset="ultrafast" → 编码速度模式，越快文件越大，
#       常见选项有：ultrafast, superfast, veryfast, faster, fast, medium, slow, slower, veryslow
#   pix_fmt="yuv420p" → 像素格式，保证视频在大多数播放器中能正常播放（兼容性最好）
#   等价于命令行里的：ffmpeg xxx -c:v libx264 -preset ultrafast -pix_fmt yuv420p screen.mp4
# .run() 执行整个 ffmpeg 命令，阻塞直到录制结束
#   overwrite_output=True 如果输出文件存在会覆盖
#   如果想后台运行，可以换成 .run_async()
try:
    (
        ffmpeg
        .input("desktop", format="gdigrab", framerate=30)  # Windows 屏幕捕获
        .output(output_file, vcodec="libx264", preset="ultrafast", pix_fmt="yuv420p")
        .run(overwrite_output=True)
    )
except Exception:
    pass

# 总结:
# 阻塞运行
# 覆盖文件
# 如果ffmpeg进程被杀掉, 那么录制的视频不能正常播放
```

:::

::: details （2）非阻塞运行

```python
import time
import ffmpeg

# 定义输出文件
output_file = "screen.mp4"

# 录制Windows屏幕
# 非阻塞录制, 返回值是 subprocess.Popen 对象
# pipe_stdin=True必须要设置
process = (
    ffmpeg
    .input("desktop", format="gdigrab", framerate=30)  # Windows 屏幕捕获
    .output(output_file, vcodec="libx264", preset="ultrafast", pix_fmt="yuv420p")
    .run_async(pipe_stdin=True, overwrite_output=True)
)

# 模拟执行其他代码
time.sleep(3)

# 发送q准备关闭ffmpeg, 相当于用户手动按 q
process.stdin.write(b'q')
process.stdin.close()

# 等待关闭完成
process.communicate()
process.wait()

# 检查状态, 如果还在运行，返回 None；否则返回退出码
code = process.poll()
print(code)
```

:::

::: details （3）录制指定窗口

```python
import time
import ffmpeg
import pygetwindow

# 获取所有窗口
for w in pygetwindow.getAllWindows():
    print(w.title)

# 定义输出文件
output_file = "screen.mp4"

# 根据窗口标题录制Windows屏幕
# 注意: 
#   如果标题名称含有特殊字符或者中文, 会导致录制不成功
#   窗口名称动态修改应该是没有影响的
title = "test – main.py"
process = (
    ffmpeg
    .input(f"title={title}", format="gdigrab", framerate=30)  # Windows 屏幕捕获
    .output(output_file, vcodec="libx264", preset="ultrafast", pix_fmt="yuv420p")
    .run_async(pipe_stdin=True, overwrite_output=True)
)

# 模拟执行其他代码
time.sleep(10)

# 发送q准备关闭ffmpeg, 相当于用户手动按 q
process.stdin.write(b'q')
process.stdin.close()

# 等待关闭完成
process.communicate()
process.wait()
```

:::

::: details （4）裁剪录制

```python
# .filter 设置裁剪参数
# 800, 600 代表录制的区域是800x600
# 0, 0     代表录制的起点坐标(左上角坐标)是 0,0
process = (
    ffmpeg
    .input(f"desktop", format="gdigrab", framerate=30, draw_mouse=0)  # Windows 屏幕捕获
    .filter('crop', 800, 600, 0, 0)  # crop=out_w, out_h, x, y
    .output(output_file, vcodec="libx264", preset="ultrafast", pix_fmt="yuv420p")
    .run_async(pipe_stdin=True, overwrite_output=True)
)
```

:::

::: details （5）不录制鼠标

```python
# draw_mouse=0 不录制鼠标
.input(f"desktop", format="gdigrab", framerate=30, draw_mouse=0)
```

:::

::: details （6）添加文字

**使用内置变量**

```python
# 录制Windows屏幕, 使用内置变量
#   text='Frame: %{n}'                              当前帧编号
#   text='%{pts}'                                   当前时间戳（秒）
#   text='%{localtime:%Y-%m-%d %H\:%M\:%S}'         当前时间
process = (
    ffmpeg
    .input(f"desktop", format="gdigrab", framerate=30, draw_mouse=0)
    .filter('drawtext', fontfile=font_path, text='%{localtime:%Y-%m-%d %H\:%M\:%S}', 
            x=10, y=10, fontsize=24, fontcolor='white')
    .output(output_file, vcodec="libx264", preset="ultrafast", pix_fmt="yuv420p")
    .run_async(pipe_stdin=True, overwrite_output=True)
)
```

**自定义文字**

```python
import time
import ffmpeg

# 定义输出文件
output_file = "screen.mp4"

# 录制Windows屏幕, 使用文件存储动态文字
# reload=1 每帧刷新,必须添加,他的值只能是0或者1
font_path = "C:/Windows/Fonts/simhei.ttf"
text_file = "text.txt"
process = (
    ffmpeg
    .input(f"desktop", format="gdigrab", framerate=30, draw_mouse=0)
    .filter('drawtext', fontfile=font_path, textfile=text_file,
            x=10, y=10, fontsize=24, fontcolor='white', reload=1)
    .output(output_file, vcodec="libx264", preset="ultrafast", pix_fmt="yuv420p")
    .run_async(pipe_stdin=True, overwrite_output=True)
)

# 休眠一下
for i in range(5):
    with open(text_file, "w", encoding="utf-8") as f:
        f.write(f"你好-{i}")
    time.sleep(1)

# 发送q准备关闭ffmpeg, 相当于用户手动按 q
process.stdin.write(b'q')
process.stdin.close()

# 等待关闭完成
process.communicate()
process.wait()
```

:::