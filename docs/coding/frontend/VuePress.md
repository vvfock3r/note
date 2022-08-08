# 使用`VuePress`搭建个人静态站点

### 版本介绍

本文档所使用的版本

| 工具/库等名称                          | 版本            |
| -------------------------------------- | --------------- |
| `node`                                 | `v16.13.1`      |
| `yarn`                                 | `1.22.17`       |
| `vuepress`                             | `2.0.0-beta.46` |
| `@vuepress/plugin-register-components` | `2.0.0-beta.46` |
| `echarts`                              | `5.3.2`         |

### 安装VuePress

参考：[https://v2.vuepress.vuejs.org/zh/guide/getting-started.html#依赖环境](https://v2.vuepress.vuejs.org/zh/guide/getting-started.html#%E4%BE%9D%E8%B5%96%E7%8E%AF%E5%A2%83)

```bash
# (1) 创建并进入一个新目录
C:\Users\Administrator\Desktop>mkdir note
C:\Users\Administrator\Desktop>cd note

# (2)初始化项目
C:\Users\Administrator\Desktop\note>git init
Initialized empty Git repository in C:/Users/Administrator/Desktop/note/.git/

C:\Users\Administrator\Desktop\note>yarn init
yarn init v1.22.17
question name (note):
question version (1.0.0):
question description:
question entry point (index.js):
question repository url:
question author (yujinhui <1265921100@qq.com>):
question license (MIT):
question private:
success Saved package.json
Done in 5.04s.

# (3)安装VuePress
yarn add -D vuepress@2.0.0-beta.46

# (4)在package.json中添加一些scripts，完整的package.json如下：
{
  "name": "note",
  "version": "1.0.0",
  "main": "index.js",
  "author": "yujinhui <1265921100@qq.com>",
  "license": "MIT",
  "devDependencies": {
    "vuepress": "2.0.0-beta.46"
  },
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}

# (5)将默认的临时目录和缓存目录添加到 .gitignore 文件中
C:\Users\Administrator\Desktop\note>echo 'node_modules' >> .gitignore
C:\Users\Administrator\Desktop\note>echo '.temp' >> .gitignore
C:\Users\Administrator\Desktop\note>echo '.cache' >> .gitignore
C:\Users\Administrator\Desktop\note>echo 'dist' >> .gitignore  # 打包目录
C:\Users\Administrator\Desktop\note>echo '.idea' >> .gitignore  # webstorm打开项目后自动创建的目录

# (6)创建你的第一篇文档
C:\Users\Administrator\Desktop\note>mkdir docs
C:\Users\Administrator\Desktop\note>echo '# Hello VuePress' > docs/README.md

# (7)在本地启动服务器来开发你的文档网站
C:\Users\Administrator\Desktop\note>yarn docs:dev
yarn run v1.22.17
$ vuepress dev docs
info Initializing VuePress and preparing data...

  vite v2.9.9 dev server running at:

  > Network:  http://192.168.159.1:8080/
  > Network:  http://192.168.48.1:8080/
  > Network:  http://192.168.0.101:8080/
  > Local:    http://localhost:8080/
下午5:07:17 [vite] ✨ optimized dependencies changed. reloading
```

### 配置VuePress

#### 创建配置文件

参考文档：[https://v2.vuepress.vuejs.org/zh/guide/configuration.html#配置文件](https://v2.vuepress.vuejs.org/zh/guide/configuration.html#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)

`docs/.vuepress/config.ts`

```typescript
import {defineUserConfig} from 'vuepress'

export default defineUserConfig({
    lang: 'zh-CN',
    title: 'note',
    description: '打怪升级之旅~',
})
```

#### 继承默认主题

文档：[https://v2.vuepress.vuejs.org/zh/reference/default-theme/extending.html](https://v2.vuepress.vuejs.org/zh/reference/default-theme/extending.html)

**定义新主题（新主题继承自默认主题）**

`docs/.vuepress/theme/index.ts`

```typescript
import type {Theme} from '@vuepress/core'
import {defaultTheme} from '@vuepress/theme-default'
import type {DefaultThemeOptions} from '@vuepress/theme-default'

export const localTheme = (options: DefaultThemeOptions): Theme => {
    return {
        name: 'note',
        extends: defaultTheme(options),
    }
}
```

**使用新主题**

`docs/.vuepress/config.ts`

```typescript
import {defineUserConfig} from 'vuepress'
import {localTheme} from './theme'

export default defineUserConfig({
    theme: localTheme({}),
    lang: 'zh-CN',
    title: 'note',
    description: '打怪升级之旅~',
})
```

#### 定制404页面

**覆盖默认的404页面**

`docs/.vuepress/theme/index.ts`

```typescript
import type {Theme} from '@vuepress/core'
import {defaultTheme} from '@vuepress/theme-default'
import type {DefaultThemeOptions} from '@vuepress/theme-default'
import {path} from '@vuepress/utils'

export const localTheme = (options: DefaultThemeOptions): Theme => {
    return {
        name: 'note',
        extends: defaultTheme(options),
        layouts: {
            404: path.resolve(__dirname, 'layouts/404.vue'),
        }
    }
}
```

**创建自己的404页面**

* 创建目录：`docs\.vuepress\theme\layouts`

* 将`404.png`、`404.vue`、`404_cloud.png`全部拷贝进去



#### 配置导航

`docs/.vuepress/config.ts`

```typescript
import {defineUserConfig} from 'vuepress'
import {localTheme} from './theme'

const navbar = [
    {
        text: '运维',
        children: [
            {
                text: 'Linux基础',
                children: [
                    {text: 'Bash', link: '/ops/Bash'},
                ]
            },
        ]
    },

    {
        text: '前端',
        children: [
            {
                text: '前端基础',
                children: [
                    {text: 'CSS', link: '/frontend/css'},
                    {text: 'JavaScript', link: '/frontend/javascript'},
                ]
            },

            {
                text: '工程化',
                children: [
                    {text: 'Vue', link: '/frontend/vue'},
                ]
            },

            {
                text: '可视化',
                children: [
                    {text: '浏览器原生绘图', link: '/frontend/浏览器原生绘图.html'},
                    {text: 'Apache Echarts', link: '/frontend/echarts'},
                ]
            },
        ]
    },

    {
        text: '后端',
        children: [
            {
                text: 'Python',
                children: [
                    {text: 'Python核心语法', link: '/backend/Python'},
                ]
            },
            {
                text: 'Go',
                children: [
                    {text: 'Go核心语法', link: '/backend/Go'},
                    {text: 'Go Web开发', link: '/backend/Web-for-Go'},
                ]
            },
        ]
    },

    {
        text: '容器',
        children: [
            {
                text: '容器基础',
                children: [
                    {text: '容器核心技术', link: '/container/container'},
                ]
            },
            {
                text: '容器编排工具',
                children: [
                    {text: '使用kubespray部署k8s', link: '/container/kubespray'},
                ]
            },
        ]
    },

    {
        text: '算法',
        children: [
            {
                text: '通用算法',
                children: [
                    {text: '双指针', link: '/algorithm/double-pointer'},
                ]
            },
        ]
    },

    // Github
    {text: 'Github', link: 'https://github.com/vvfock3r/note'},
]

export default defineUserConfig({
    theme: localTheme({
        navbar: navbar,
    }),
    lang: 'zh-CN',
    title: 'note',
    description: '打怪升级之旅~',
})
```

#### 覆盖默认样式

文档：[https://v2.vuepress.vuejs.org/zh/reference/default-theme/styles.html](https://v2.vuepress.vuejs.org/zh/reference/default-theme/styles.html)

`docs/.vuepress/styles/index.scss`

```scss
:root {
  --content-width: 1140px;
}
```

#### 注册自定义组件

文档：[https://v2.vuepress.vuejs.org/zh/reference/plugin/register-components.html](https://v2.vuepress.vuejs.org/zh/reference/plugin/register-components.html)

**（1）安装插件**

```bash
# 版本号最好与VuePress保持一致
C:\Users\Administrator\Desktop\note>yarn add @vuepress/plugin-register-components@2.0.0-beta.46
```

**（2）修改配置**

`docs/.vuepress/config.ts`

```typescript
import {defineUserConfig} from 'vuepress'
import {localTheme} from './theme'

const {path} = require('@vuepress/utils')
const {registerComponentsPlugin} = require('@vuepress/plugin-register-components')

// navbar内容太多省略不写了
const navbar = []
      
export default defineUserConfig({
    theme: localTheme({
        navbar: navbar,
    }),
    lang: 'zh-CN',
    title: 'note',
    description: '打怪升级之旅~',
    // 插件配置
    plugins: [
        registerComponentsPlugin({
            components: {
                Home: path.resolve(__dirname, './components/Home.vue'),
            }
        }),
    ],
})
```

**（3）编写并使用插件（Vue组件）**

* 根据以上配置创建插件目录：`docs/.vuepress/components/`

* 将`Home.vue`拷贝到插件目录中，并安装相关依赖

  ```bash
  C:\Users\Administrator\Desktop\note>yarn add echarts@5.3.2
  ```

* 修改首页`docs/.vuepress/README.md`使用该插件

  ```markdown
  <Home />
  ```



#### 侧边栏配置

`docs/.vuepress/config.ts`

```typescript
export default defineUserConfig({
    theme: localTheme({
        navbar: navbar,
        // 侧边栏配置，默认为auto
        // 文档：https://v2.vuepress.vuejs.org/zh/reference/default-theme/config.html#sidebar        
        sidebar: 'auto',
                
        // 侧边栏显示所有标题的深度，默认为2
        // 最大值取决于你通过 markdown.extractHeaders.level 提取了哪些级别的标题
        // 文档：https://v2.vuepress.vuejs.org/zh/reference/default-theme/config.html#sidebardepth
        sidebarDepth: 3,
    }),
    lang: 'zh-CN',
    title: 'note',
    description: '打怪升级之旅~',
    // 插件配置
    plugins: [
        registerComponentsPlugin({
            components: {
                Home: path.resolve(__dirname, './components/Home.vue'),
            }
        }),
    ],
})
```



#### MarkDown配置

`docs/.vuepress/config.ts`

```typescript
export default defineUserConfig({
    theme: localTheme({
        navbar: navbar,
        // 侧边栏配置，默认为auto
        // 文档：https://v2.vuepress.vuejs.org/zh/reference/default-theme/config.html#sidebar        
        sidebar: 'auto',
                
        // 侧边栏显示所有标题的深度，默认为2
        // 最大值取决于你通过 markdown.extractHeaders.level 提取了哪些级别的标题
        // 文档：https://v2.vuepress.vuejs.org/zh/reference/default-theme/config.html#sidebardepth
        sidebarDepth: 3,
    }),
    lang: 'zh-CN',
    title: 'note',
    description: '打怪升级之旅~',
    // 插件配置
    plugins: [
        registerComponentsPlugin({
            components: {
                Home: path.resolve(__dirname, './components/Home.vue'),
            }
        }),
    ],
    markdown: {
        code: {
            // 不显示行号
            lineNumbers: false,
        },
        extractHeaders: {
            // 提取哪些子标题
            level: [2, 3, 4, 5],
        }
    },
})
```

