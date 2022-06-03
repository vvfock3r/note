---
sidebar: auto
---

## 介绍

官方文档：https://v2.vuepress.vuejs.org/zh/

三方文档：https://segmentfault.com/a/1190000017055963



## 安装

1、创建blog目录

```bash
mkdir blog && cd blog
```



2、初始化项目

```bash
yarn init
```

3、安装vuepress

```bash
yarn add -D vuepress
```

4、创建第一篇文档

```bash
mkdir docs && echo '# Hello VuePress' > docs/README.md
```

5、修改package.json

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

6、启动服务

```bash
yarn docs:dev
```



## 配置

官方站点源码：https://github.com/vuepress/vuepress-next/tree/main/docs



### 新建config.js

```bash
.
├─ docs
│  ├─ README.md
│  └─ .vuepress
│     └─ config.js
└─ package.json
```



### 基本配置config.js

`config.js`

```json
module.exports = {
    // 站点标题，显示在做左上角
    title: 'Hello VuePress1',
    // 站点描述
    description: 'Just playing around',
    // 主题配置
    themeConfig: {
        // 设置哪些页面开启左侧侧边栏
        sidebar: [
            '/',
        ],
        // 侧边栏显示所有标题,默认为false
        displayAllHeaders: true,
        // 侧边栏显示所有标题的深度，默认为1，即只显示1级标题h1
        sidebarDepth: 5,
    },
}
```



### 配置右上角导航

::: details 点击查看代码

```javascript
themeConfig: {
            nav: [
            // Linux
            {
                text: 'Linux',
                items: [
                    {
                        text: 'Shell',
                        items: [
                            {text: 'Bash语法', link: '/css/chinese'},
                            {text: '常用命令', link: '/css/chinese'},
                        ]
                    },
                ]
            },

            // 前端
            {
                text: '前端',
                items: [
                    // CSS
                    {
                        text: 'CSS',
                        items: [
                            {text: 'CSS布局', link: '/css/chinese'},
                            {text: 'CSS属性', link: '/css/japanese'}
                        ]
                    },

                    // JavaScript
                    {
                        text: 'JavaScript',
                        items: [
                            {text: 'JavaScript入门', link: '/language/chinese'},
                            {text: 'TypeScript入门', link: '/language/chinese'},
                        ]
                    },

                    // Vue
                    {
                        text: 'Vue生态圈',
                        items: [
                            {text: 'Vue3', link: '/language/chinese'},
                            {text: 'Vite2', link: '/language/chinese'},
                        ]
                    },
                ]
            },

            // 可视化
            {
                text: '可视化(2D)',
                items: [
                    // Canvas
                    {
                        text: 'Canvas',
                        items: [
                            {text: 'canvas入门', link: '/css/chinese'},
                        ]
                    },
                    // SVG
                    {
                        text: 'SVG',
                        items: [
                            {text: 'SVG入门', link: '/css/chinese'},
                        ]
                    },
                    // Echarts
                    {
                        text: 'Echarts',
                        items: [
                            {text: 'Echarts入门', link: '/css/chinese'},
                        ]
                    },
                ]
            },
            // Github
            {text: 'Github', link: 'https://google.com'},
        ]
}
```

:::



### 配置代码折叠

语法

````markdown
::: details 点击查看代码
```js
这里写代码
```
:::
````



### 最后更新时间

https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E6%9C%80%E5%90%8E%E6%9B%B4%E6%96%B0%E6%97%B6%E9%97%B4



### Git 仓库和编辑链接

https://vuepress.vuejs.org/zh/theme/default-theme-config.html#git-%E4%BB%93%E5%BA%93%E5%92%8C%E7%BC%96%E8%BE%91%E9%93%BE%E6%8E%A5

