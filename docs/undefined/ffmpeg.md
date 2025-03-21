# ffmpeg

## 官方网站

[https://www.ffmpeg.org/](https://www.ffmpeg.org/)

<br />

## 命令结构

```bash
ffmpeg -f <输入设备> -i <输入源> 输出文件.mp4
```

<br />

## 选项说明

```bash
# 常见选项
-f gdigrab							适用于Windows的屏幕捕获驱动

-i desktop							录制整个屏幕
-i title=<标题>  					   录制特定窗口
-filter:v "crop=640:480:320:240"  	录制指定区域, 只录制屏幕上从 (320, 240) 开始，宽度为640像素，高度为480像素的区域


# 常见参数
-s 1920x1080	指定分辨率
-framerate 30	指定帧率

# 关于时间
-t 600          				录制600秒
timeout /t 30 &&　ffmpeg xxx    30秒后开始录制

# 关于文件
-y              强制覆盖文件
-n              禁止覆盖文件

# 音频和视频
-an				禁用音频流
-vn				禁用视频流
```



## 示例命令

```bash
# 录制整个屏幕, 并禁用音频
ffmpeg -f gdigrab -i desktop -framerate 30 -y -an desktop.mp4

# 录制屏幕指定区域
ffmpeg -f gdigrab -i desktop -filter:v "crop=1036:783:288:103" -framerate 30 -y -an desktop.mp4

# 添加水印文字, 下面的示例是: 添加当前时间到视频左上角 x偏移10, y偏移10 的位置上
-filter:v "drawtext=fontfile=C\\:/Windows/Fonts/arial.ttf: text='%{localtime}': x=10: y=10: fontsize=24: fontcolor=white"

# PS: 多个-filter:v选项, 选项值要写到一起, 并使用逗号分隔
```

