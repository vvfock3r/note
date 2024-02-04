# YOLOv8

官网：[https://docs.ultralytics.com/zh/](https://docs.ultralytics.com/zh/)

Github：[https://github.com/ultralytics/ultralytics](https://github.com/ultralytics/ultralytics)

参考资料：

* 基础入门教程：[https://juejin.cn/post/7265968581841682492](https://juejin.cn/post/7265968581841682492)
* 屏幕实时检测：[https://www.bilibili.com/video/BV1js4y1Y77w](https://www.bilibili.com/video/BV1js4y1Y77w)

<br />

## 准备环境

### 开发环境

::: details （1）测试清单

| 组件   | 版本            |
| ------ | --------------- |
| 系统   | Windows 10 64位 |
| Python | 3.9.13 64位     |
| YOLO   | 8.0.198         |

:::

::: details （2）安装YOLOv8

```bash
# 安装
python -m pip install -U pip
python -m pip install ultralytics

# -------------------------------------------------------------

# 安装报错说明
# 一般情况下报错通常是在安装scipy, 有两种解决办法:
# 1、直接下载编译好的包: https://pypi.org/simple/scipy/ (注意没有Python 32位的包)
# 2、安装MinGW, 然后再利用它安装GCC等编译工具

# -------------------------------------------------------------

# 检查1: 安装完ultralytics库后, 命令行中可以使用yolo命令
(venv) C:\Users\Administrator\Desktop\demo> yolo version   
8.0.198

# -------------------------------------------------------------

# 检查2: 调用yolo模块自带的检查函数
import ultralytics

ultralytics.checks()

# 输出结果如下, 因为我们并没有单独设置GPU参数, 所以这里torch使用的CPU
# Ultralytics YOLOv8.0.198  Python-3.9.13 torch-2.1.0+cpu CPU (Intel Core(TM) i7-4790K 4.00GHz)
# Setup complete  (8 CPUs, 23.9 GB RAM, 85.1/99.2 GB disk)
```

:::

<br />

### 概念讲解

- Train：使用数据进行训练，训练完成后会得到一个模型
- Val：使用模型验证数据，对我们的模型进行验证，在训练时会自动触发验证
- Predict：使用模型预测数据，拿一张模型不认识的图片让他预测，看能否得到我们想要的结果
- Export：导出模型
- Track：未知
- Benchmark：性能测试，未知

<br />

### 官方示例

::: details （1）推理示例

```bash
# 使用官方已经训练好的模型对图片进行预测
yolo predict model=yolov8n.pt source='https://ultralytics.com/images/bus.jpg'

# 上面的命令解析
# 1、predict 是推理、预测操作
# 2、model=yolov8n.pt 指定模型文件, 本地不存在的话会从官网下载, 后续我们会使用自己训练的模型
# 3、source 这里指定了对什么数据预测, 这里是对一张图片预测, 也会下载到本地中

# 输出结果
# 图片预测结果: 4 persons, 1 bus, 1 stop sign
# 结果保存路径: c:\users\administrator\desktop\demo\runs\detect\predict
Ultralytics YOLOv8.0.198  Python-3.9.13 torch-2.1.0+cpu CPU (Intel Core(TM) i7-4790K 4.00GHz)
YOLOv8n summary (fused): 168 layers, 3151904 parameters, 0 gradients, 8.7 GFLOPs

Found https://ultralytics.com/images/bus.jpg locally at bus.jpg
image 1/1 C:\Users\Administrator\Desktop\demo\bus.jpg: 640x480 4 persons, 1 bus, 1 stop sign, 164.8ms
Speed: 6.9ms preprocess, 164.8ms inference, 4.0ms postprocess per image at shape (1, 3, 640, 480)
Results saved to c:\users\administrator\desktop\demo\runs\detect\predict
 Learn more at https://docs.ultralytics.com/modes/predict
```

![image-20231015170003139](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20231015170003139.png)

:::

<br />

### 模型文件

文档：[https://docs.ultralytics.com/zh/models/yolov8/#supported-tasks-and-modes](https://docs.ultralytics.com/zh/models/yolov8/#supported-tasks-and-modes)

说明：从 `8n` 到 `8x`，模型的准确度会提高，但是随之效率也会降低

<br />

## 训练模型

### 1、准备数据

::: details 点击查看详情

新建一个目录，目录名任意，用于存放我们的模型，这里叫做 model，目录结构如下

```bash
C:\Users\Administrator\Desktop\model>tree
文件夹 PATH 列表
卷序列号为 AEF4-A929
C:.
├─images        # 这里是原始的数据目录
│  ├─train      # 这里存要训练的图片
│  └─val        # 这里存要验证的图片
└─labels        # 这里是数据标注完成后的目录, 现在目录下应该没有任何文件
    ├─train     # 对应上面的标注信息
    └─val       # 对应上面的标注信息
    
# 要求
# 1、所有的图片大小都要一致
# 2、图片不能太少，最少也得三五十张吧
# 3、用来【训练】和【推演】的图片大小要完全一致，不然推演会识别失败
```

:::

### 2、数据标注

::: details 点击查看详情

```bash
# 安装数据标注工具
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple labelimg

# 打开工具, 注意这里是大写的I
labelImg
```

**1、设置生成的数据格式**

![image-20231015170816302](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20231015170816302.png)

**2、设置自动保存模式**

![image-20231015170920685](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20231015170920685.png)

**3、打开目录**

![image-20231015171136266](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20231015171136266.png)

**4、设置保存目录**

![image-20231015171446800](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20231015171446800.png)

**5、开始标注**

点击 Create RectBox，然后将目标圈出来即可，然后点击Next Image继续处理下一张图片

快捷键：

W：等同于点击 Create RectBox

D：等同于点击 Next Image

:::

### 3、训练数据

::: details 点击查看详情

```bash
# 创建一个配置文件, 名字叫什么无所谓, 这里是 config.yaml
train: C:\Users\Administrator\Desktop\model\images\train  # 要训练的图片
val: C:\Users\Administrator\Desktop\model\images\val      # 要验证的图片
nc: 1
names:        # 这里是数据标注中的分类, 要训练哪个分类
  0: nan_ren

# 执行训练
yolo task=detect mode=train model=yolov8n.pt data=config.yaml batch=8 epochs=100
```

:::

### 4、预测验证

::: details 点击查看详情

```bash
# 使用CLI推理
yolo predict source=1.jpg model=C:\Users\Administrator\Desktop\demo\runs\detect\train\weights\best.pt

# 使用Python推理
from PIL import Image
from ultralytics import YOLO

model = YOLO(r"C:\Users\Administrator\Desktop\demo\runs\detect\train\weights\best.pt")
img = Image.open("1.png")
result = model.predict(source=img, save=True, conf=0.15)
print(result)
```

:::

### 5、结果分析

文档：[https://docs.ultralytics.com/zh/modes/predict/#working-with-results](https://docs.ultralytics.com/zh/modes/predict/#working-with-results)

::: details 点击查看详情

```bash
# 待补充
1.返回的是一个列表, 包含所有匹配的结果, 每个元素是 ultralytics.engine.results.Results 类型
2. .names 是一个字典, 包含分类信息
3. float(result[0].boxes.conf) 是可信度
4. result[0].boxes.data) 目标框左上角的坐标和右下角的坐标
5. result[0].boxes.xywh) 目标框中心点的坐标和宽度、高度
```

:::





