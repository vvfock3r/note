# Photoshop

官网：[https://www.adobe.com/products/photoshop.html](https://www.adobe.com/products/photoshop.html)

文档：[https://helpx.adobe.com/photoshop/user-guide.html](https://helpx.adobe.com/photoshop/user-guide.html)



<br />

## JSX（逐步淘汰中）

JSX脚本全称 `ExtendScript`，适用于Photoshop 早期版本（CS ~ CC 2020，v21及之前）

* 文件扩展名：`.jsx` / `.js`
* 基于 Adobe 自家的 ExtendScript 引擎（ECMAScript 3 语法，部分扩展）。
* 跨平台（Windows / macOS 都可用）。
* 入口：`文件 → 脚本 → 浏览` 或 `Scripts` 目录下的脚本

<br />

### 快捷执行

* 1.选择 **窗口-动作**，或者执行`ALT+F9`
* 2.点击+号，新建动作
* 3.名称随便起一个，快捷键选一个，然后点击录制
* 4.选择 **文件-脚本-浏览**，选择`JSX`脚本
* 5.点击 关闭录制

<br />

### 代码整理

可以将相关的函数放在一块，方便代码归类和折叠

::: details 点击查看详情

```jsx
// 工具类
var U = {
    // 退出函数, 若传递了alertMessage则退出前先弹个框
    exit: function (alertMessage) {
        if (alertMessage != undefined) {
            alert(alertMessage);
        }
        throw new Error("程序退出");
    }
}

alert("123");
U.exit("程序退出");
alert("456");
```

:::

<br />

### 弹窗操作

::: details 点击查看详情

```jsx

// 提示框
alert("这是一个提示框！");

// 确认对话框
if (confirm("你确定要执行操作吗？")) {
    // 用户点击确定
    alert("操作执行了");
} else {
    // 用户点击取消
    alert("操作取消了");
}

// 输入框
var input = prompt("请输入你的名字：", "默认值");
if (input !== null) {
    alert("你输入了：" + input);
} else {
    alert("你取消了输入");
}

// 自定义窗口 — ScriptUI
var win = new Window("dialog", "示例窗口");
win.add("statictext", undefined, "这是一个自定义窗口");
var btn = win.add("button", undefined, "确定");
btn.onClick = function() { win.close(); }
win.show();
```

:::

<br />

### 退出程序

JSX中并没有提供函数可以直接退出整个程序

```jsx
// 退出函数, 若传递了alertMessage则退出前先弹个框
function exit(alertMessage) {
    if (alertMessage != undefined) {
        alert(alertMessage);
    }
    throw new Error("程序退出");
}

alert("123");
exit("程序退出");
alert("456");
```

<br />

<br />

### 文件操作

**常用目录**

::: details 获取常用目录

```jsx
// PS安装目录
psInstallPath = app.path;

// 临时目录
temp = Folder.temp;

// 获取桌面路径
var desktopFolder = Folder.desktop;

// 获取本脚本路径（包括文件名）
var scriptFile = new File($.fileName);  // 当前脚本对象
var currentFolder = scriptFile.parent;  // 脚本的父目录对象

// 输出
alert([
  "安装目录：" + psInstallPath,
  "临时目录: " + temp,
  "桌面路径：" + desktopFolder.fsName,
  "当前脚本：" + scriptFile.name ,
  "脚本目录：" + currentFolder.fsName,
].join("\n"));
```

:::

**文件写入**

::: details 文件写入

```jsx
// 写入文件, 如果不传路径默认会写到PS安装目录下
function writeFile(filePath, mode, content) {
    var file = new File(filePath);
    if (!file.open(mode)) {
        return { success: false, message: "打开文件失败：" + filePath };
    }
    try {
        file.write(content);
    } catch (e) {
        return { success: false, message: "写入文件时出错: " + filePath + ": " + e.message };
    } finally {
        file.close();
    }
    return { success: true, message: "写入成功" + ": " + filePath};
}


// 定义文件路径
var desktopFolder = Folder.desktop;
var filePath = desktopFolder.fsName + "/output.txt";

// 写入内容
// w 写入（覆盖）
// a 追加, 文件不存在时会自动创建
// r 读取
var result = writeFile(filePath, "w", "这是写入的内容。");

// 判断结果
if (result.success) {
    alert(result.message);
} else {
    alert("错误：" + result.message);
}
```

:::

<br />

**文件读取**

::: details 文件读取（返回一个数组，每个元素为一行）

```jsx
// 清除字符串两边的空白
function trim(str) {
    // 兼容旧版ExtendScript，没有String.trim函数，自己实现去除两端空白
    return str.replace(/^\s+|\s+$/g, '');
}

// 读取文件
function readFile(filePath) {
    var file = new File(filePath);
    if (!file.exists) {
        return { success: false, lines: [], message: "文件不存在" };
    }
    if (!file.open("r")) {
        return { success: false, lines: [], message: "打开文件失败" };
    }
    var content = "";
    try {
        content = file.read();
    } catch (e) {
        return { success: false, lines: [], message: "读取文件时出错: " + e.message };
    } finally {
        file.close();
    }
    if (!content || /^\s*$/.test(content)) {
        return { success: true, lines: [], message: "文件为空" };
    }

    // 按换行符拆分，兼容 Windows、Unix、Mac 换行
    var lines = content.split(/\r\n|\r|\n/);
    var trimmedLines = [];
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (line == null) continue;
        line = trim(String(line));
        // 去除空行
        if (line.length > 0) {
            trimmedLines.push(line);
        }
    }

    return { success: true, lines: trimmedLines, message: "读取成功" };
}

// 定义文件路径
var desktopFolder = Folder.desktop;
var filePath = desktopFolder.fsName + "/装饰墙_定制/装饰墙_定制/names.txt";

// 读取文件内容
var result = readFile(filePath);

// 判断读取结果
if (!result.success) {
    alert("读取失败，原因：" + result.message);
}

// 遍历每一行
for (var i=0; i<result.lines.length; i++){
    alert(result.lines[i]);
}
```

:::

<br />

### 日期操作

::: details 获取当前日期

```jsx
// 获取当前日期
var now = new Date();

// 获取日期中的年月日时分秒等
var year = now.getFullYear();     // 年份，例如 2025
var month = now.getMonth() + 1;   // 月份，注意返回 0~11，需要 +1
var day = now.getDate();          // 日期，1~31
var hour = now.getHours();        // 小时，0~23
var minute = now.getMinutes();    // 分钟，0~59
var second = now.getSeconds();    // 秒，0~59

// 输出结果
// 返回的值可能是一位数字, 为了美观，所以全部格式化为两位数(除了年)
alert([
    "当前时间: " + now.toString(),
    "当前年份: " + year,
    "当前月份: " + ("0" + month).slice(-2),
    "当前天数: " + ("0" + day).slice(-2),
    "当前日期: " + year + "-" +  ("0" + month).slice(-2) + "-" + ("0" + day).slice(-2),
].join("\n"));
```

:::

<br />

### App对象

`app` 对象是 ExtendScript 脚本操作 Photoshop 的核心入口，代表整个 Photoshop 应用程序，是所有脚本操作的顶级对象

::: details 当前文档和图层

```jsx
// 获取当前文档和图层
try {
    var doc = app.activeDocument;   // 当前文档
    var layer = doc.activeLayer;    // 当前图层
} catch (e) {
    alert("没有打开的文档，请先打开一个文档！");
    throw new Error("程序退出");
}
```

:::

<br />

### 图层对象

**介绍**

* **`LayerSet`** 是 Photoshop DOM 里的一个类，代表一个“图层组”（也叫“图层集”）
* `LayerSet` 对象可以包含若干个子图层（`ArtLayer`）和子图层组（`LayerSet`），构成树状层级结构

简单点说，`LayerSet`类似于目录，而 `ArtLayer` 类似于文件

<br />

**常用方法**

```jsx
// 判断是图层还是图层组
if (layer.typename === "LayerSet") {
    // 图层组
} else if (layer.typename === "ArtLayer") {
    // 普通图层
}
```



**LayerSet（图层组）方法**

| 方法 / 属性                                     | 返回值 / 类型                    | 说明                     |
| ----------------------------------------------- | -------------------------------- | ------------------------ |
| .name                                           | 图层组名称                       | String                   |
| .layers                                         | 该组内所有图层和子组集合         | `Layers` 集合            |
| .layerSets                                      | 该组内所有子图层组集合           | `LayerSets` 集合         |
| .artLayers                                      | 该组内所有子图层集合             | **`ArtLayers **数组对象  |
| .visible                                        | 是否显示该组                     | Boolean                  |
| .locked                                         | 是否锁定该组                     | Boolean                  |
| duplicate([relativeObject], [elementPlacement]) | 复制该组，插入到指定位置（可选） | 新复制的 `LayerSet` 对象 |
| .remove()                                       | 删除该图层组                     | 无                       |
| .move(relativeObject, elementPlacement)         | 移动该组到指定位置               | 无                       |

**ArtLayer（普通图层）**

| 方法 / 属性                                      | 返回值 / 类型                      | 说明                     |
| ------------------------------------------------ | ---------------------------------- | ------------------------ |
| .name                                            | 图层名称                           | String                   |
| .visible                                         | 是否显示该图层                     | Boolean                  |
| .locked                                          | 是否锁定该图层                     | Boolean                  |
| .opacity                                         | 不透明度（0~100）                  | Number                   |
| .kind                                            | 图层类型（如普通、文字、形状等）   | `LayerKind` 枚举         |
| .duplicate([relativeObject], [elementPlacement]) | 复制该图层，插入到指定位置（可选） | 新复制的 `ArtLayer` 对象 |
| .remove()                                        | 删除该图层                         | 无                       |
| .move(relativeObject, elementPlacement)          | 移动该图层到指定位置               | 无                       |
| .resize(horizontalScale, verticalScale, anchor)  | 缩放图层                           | 无                       |
| .applyStyle(styleName)                           | 应用图层样式                       | 无                       |

<br />

**递归遍历**

::: details （1）递归遍历图层组

```jsx
// 遍历所有图层组找到目标图层
function findGroupByName(rootGroup, targetName) {
    for (var i = 0; i < rootGroup.layerSets.length; i++) {
        var currentGroup = rootGroup.layerSets[i];
        if (currentGroup.name === targetName) {
            return currentGroup; // 找到，返回组对象
        }
        // 递归查找子组
        var found = findGroupByName(currentGroup, targetName);
        if (found !== null) {
            return found;
        }
    }
    return null; // 没找到
}

// 用法示例
var doc = app.activeDocument;
var tplGroup = findGroupByName(doc, "tpl");

if (tplGroup !== null) {
    alert("找到了：" + tplGroup.name);
} else {
    alert("未找到");
}

// 复制图层, 并改名
var clonedGroup = tplGroup.duplicate();
clonedGroup.name = "我是新来的"
```

:::

::: details （2）递归遍历图层

```jsx
// 遍历所有图层找到目标图层, 没找到返回null
function findLayerByName(rootGroup, targetName) {
        // 先遍历当前组里的所有普通图层
        for (var i = 0; i < rootGroup.artLayers.length; i++) {
            var layer = rootGroup.artLayers[i];
            if (layer.name === targetName) {
                return layer; // 找到，返回图层对象
            }
        }
        // 再递归遍历所有子图层组
        for (var j = 0; j < rootGroup.layerSets.length; j++) {
            var childGroup = rootGroup.layerSets[j];
            var found = this.findLayerByName(childGroup, targetName);
            if (found !== null) {
                return found;
            }
        }
        return null;
},
```

:::

<br />

### 界面操作

**进度条**

::: details 点击查看详情

```jsx
(function main() {
    // 创建窗口 (此时窗口还不会展示出来)
    // Window 是 ScriptUI 中创建窗口的构造函数
    // "palette" 表示创建一个非模态工具窗口（类似 Photoshop 工具面板），它不会阻塞脚本执行
    // "进度条" 是窗口标题栏显示的文字
    // 第三个参数 undefined 表示使用默认的窗口尺寸和位置
    // {closeButton: false} 参数关闭了窗口右上角的关闭按钮，防止用户误关闭窗口, 注意不是隐藏
    var win = new Window("palette", "进度条", undefined, {closeButton: true});

    // 添加进度条控件
    // 向窗口添加一个进度条控件，最小值是0，最大值是100
    // 第二个参数 undefined 是控件的尺寸区域，这里用默认
    win.progressBar = win.add("progressbar", undefined, 0, 100);

    // 设置进度条宽度为300像素，让它看起来更宽一点
    win.progressBar.preferredSize.width = 300;

    // 定义任务总个数
    var total = 100;

    // 添加显示文本
    // statictext 静态文本
    // 第二个参数是 控件的位置和大小
    // 第三个参数是初始文字
    win.infoText = win.add("statictext", undefined, "已完成： 0% ( 0 / " + total + ")");
    win.infoText.preferredSize.width = 150; // 调整文字宽度

    // 显示窗口（非模态）
    // show(false) 表示非模态显示窗口, 不会阻塞脚本执行, 如果设置为true会阻塞脚本执行
    // 如果没有后续操作, 它显示完成后马上就又会关闭, 可以在后面添加使用 $.sleep(5000); 来查看效果
    win.show(false);

    // 添加进度
    for (var i = 0; i <= total; i++) {
        $.sleep(50);

        // 更新进度条当前值, 前面设置了进度条的数值范围, 注意这里不是百分比, 但是可以当作百分比来处理
        win.progressBar.value = i;

        // 计算当前完成的百分比
        var percent = Math.round((i / total) * 100);

        // 更新文本控件内容
        win.infoText.text = "已完成：" + percent + "% (" + i + " / " + total + ")";

        // 强制刷新窗口UI
        win.update();
    }

})()
```

:::

<br />

## UXP（ 未来主流脚本）

文档地址：[https://developer.adobe.com/photoshop/uxp/2022/guides/](https://developer.adobe.com/photoshop/uxp/2022/guides/)

Photoshop 2021（v22）及之后，Adobe 推出了 **UXP (Unified Extensibility Platform)** 脚本平台

**JavaScript (UXP API)**

- 文件扩展名：`.psjs`
- 基于现代 JS（接近 ES6），运行在 UXP Runtime（Chromium 内核 + V8 引擎）。
- 不依赖旧的 ExtendScript 引擎，速度更快，支持异步 API。
- 旧版 ExtendScript (.jsx) 依然可用，通过 `文件 → 脚本 → 浏览` 运行，保留向后兼容

