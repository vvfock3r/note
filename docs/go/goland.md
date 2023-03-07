# GoLand

## 官网下载

官网：[https://www.jetbrains.com/go/](https://www.jetbrains.com/go/)

<br />

## 快捷操作

| 快捷键              | 说明                                            |
| ------------------- | ----------------------------------------------- |
| Ctrl + Alt + S      | 设置，注意这与Windows下的QQ屏幕录制快捷键有冲突 |
| Shift（快速按两次） | 全局搜索                                        |
| Ctrl + Alt + L      | 代码格式化                                      |
| Shift + F6          | 文件/变量重命名                                 |

<br />

## 配色方案

::: details 方式1

![image-20220806130018188](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220806130018188.png)

:::

::: details 方式2

![image-20220806123433863](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220806123433863.png)

:::

<br />

## 终端类型

![image-20220806132738315](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220806132738315.png)

<br />

## 字体设置

::: details 设置菜单字体和字号

![image-20230225133713144](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230225133713144.png)

:::

::: details 设置代码字体和字号

![image-20230225133619062](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230225133619062.png)

:::

<br />

## 文件监控

![image-20220925090503431](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220925090503431.png)

<br />

## 行分隔符

![image-20230228163013728](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230228163013728.png)

<br />

## 远程同步

<br />

## 设置DLV

最新版的GoLand有时候不能调试最新版Go SDK，原因是GoLand中的调试工具DLV太旧了，如下图

![image-20230307103943104](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230307103943104.png)

安装最新版DLV并修改GoLand中的路径：`Help ---> Edit Custom Properties...`

```bash
# 设置DLV路径, 任选一种正确的写法即可, 然后重启GoLand
dlv.path=D:/application/GoPath/bin/dlv.exe         # 写法1: 正确写法
dlv.path=D:\\application\\GoPath\\bin\\dlv.exe     # 写法2: 正确写法
dlv.path=D:\application\GoPath\bin\dlv.exe         # 写法3: 错误写法
```

<br />

## 配置内存

`Help ---> Change Memory Settings`

![image-20230307104122350](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230307104122350.png)
