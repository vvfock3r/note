## Node包管理器

### npm

CLI文档：[https://docs.npmjs.com/cli/v8/commands/npm](https://docs.npmjs.com/cli/v8/commands/npm)

`npm`是nodejs内置的包管理器，类似于Python的pip，文档所使用的版本为`8.15.1`

<br />

#### 项目初始化

文档：[https://docs.npmjs.com/cli/v8/commands/npm-init](https://docs.npmjs.com/cli/v8/commands/npm-init)

别名：`create`, `innit`

::: warning

npm init用来项目初始化 ，这会生成一个`package.json`文件。但是通常我们不会使用这种方式初始化项目，

而是使用像`Vue CLI`、`Vite`等封装得更高级的脚手架工具来初始化

:::

```bash
C:\Users\Administrator\Desktop\demo>npm init -y
npm WARN config global `--global`, `--local` are deprecated. Use `--location=global` instead.
Wrote to C:\Users\Administrator\Desktop\demo\package.json:

{
  "name": "demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

<br />

#### 管理配置文件

文档：[https://docs.npmjs.com/cli/v8/commands/npm-config](https://docs.npmjs.com/cli/v8/commands/npm-config)

别名：`c`

子命令：

```bash
npm config set <key>=<value> [<key>=<value> ...]
npm config get [<key> [<key> ...]]
npm config delete <key> [<key> ...]
npm config list [--json]
npm config edit
```

查看默认的NPM源

```bash
C:\Users\Administrator>npm config get registry
npm WARN config global `--global`, `--local` are deprecated. Use `--location=global` instead.
https://registry.npmjs.org/
```

设置为淘宝NPM源

```bash
C:\Users\Administrator>npm config set registry https://registry.npmmirror.com
npm WARN config global `--global`, `--local` are deprecated. Use `--location=global` instead.

C:\Users\Administrator>npm config get registry
npm WARN config global `--global`, `--local` are deprecated. Use `--location=global` instead.
https://registry.npmmirror.com/
```

<br />

#### 安装包

文档：[https://docs.npmjs.com/cli/v8/commands/npm-install](https://docs.npmjs.com/cli/v8/commands/npm-install)

别名：`add`, `i`, `in`, `ins`, `inst`, `insta`, `instal`, `isnt`, `isnta`, `isntal`, `isntall` （PS：为了手残党真是下足了功夫）

常用参数：

| 参数                                   | 说明                                                       |
| -------------------------------------- | ------------------------------------------------------------ |
| `--global`  丨`-g` | 安装到全局（默认会安装到`当前目录/node_modules`） |
| `--save-prod` 丨`-P` 丨`--save` 丨`-S` | 作为项目依赖安装，写入包名到`package.json`中的`dependencies`区域（这是默认选项） |
| `--save-dev` 丨`-D` | 作为开发依赖安装，写入包名到`package.json`中的`devDependencies`区域中 |
| `--no-save`                 | 仅安装，不修改`package.json`                                 |

升级NPM：	

```bash
# 升级npm版本
npm install -g npm

# 安装指定npm版本
npm install -g npm@8.15.0
```

安装第三方包

```bash
npm install eslint --save-dev
npm install husky --save-dev
npm install echarts --save
```

<br />

#### 卸载包

文档：[https://docs.npmjs.com/cli/v8/commands/npm-uninstall](https://docs.npmjs.com/cli/v8/commands/npm-uninstall)

别名：`unlink`, `remove`, `rm`, `r`, `un`

<br />

#### 查看包

查看全局都安装了哪些包

文档：[https://docs.npmjs.com/cli/v8/commands/npm-ls](https://docs.npmjs.com/cli/v8/commands/npm-ls)

别名：`list`

```bash
C:\Users\Administrator>npm ls -g
npm WARN config global `--global`, `--local` are deprecated. Use `--location=global` instead.
C:\Users\Administrator\AppData\Roaming\npm
+-- npm-check-updates@12.5.11
+-- npm@8.15.1
+-- nrm@1.2.5
+-- pnpm@7.7.0
`-- yarn@1.22.17
```

<br />

### yarn

yarn v1文档：[https://classic.yarnpkg.com/en/docs/](https://classic.yarnpkg.com/en/docs/)

<br />

#### 安装

```bash
C:\Users\Administrator\Desktop>npm install yarn -g
npm WARN config global `--global`, `--local` are deprecated. Use `--location=global` instead.

C:\Users\Administrator\Desktop>yarn --version
1.22.19
```

<br />

#### 用法

文档：[https://classic.yarnpkg.com/en/docs/usage](https://classic.yarnpkg.com/en/docs/usage)

<br />

### pnpm（推荐）

官网：[https://pnpm.io/zh/](https://pnpm.io/zh/)

<br />

#### 安装

文档：[https://pnpm.io/zh/installation](https://pnpm.io/zh/installation)

```bash
C:\Users\Administrator\Desktop\demo>npm install pnpm -g
npm WARN config global `--global`, `--local` are deprecated. Use `--location=global` instead.

changed 1 package in 2s

C:\Users\Administrator\Desktop\demo>pnpm --version
7.7.0
```

<br />

#### 安装包

文档：[https://pnpm.io/zh/cli/add](https://pnpm.io/zh/cli/add)

| 命令                       | 说明                                              |
| -------------------------- | ------------------------------------------------- |
| `pnpm add element-plus`    | 保存到 `dependencies`                             |
| `pnpm add -D element-plus` | 保存到 `devDependencies`                          |
| `pnpm add -g element-plus` | 安装到全局（默认会安装到`当前目录/node_modules`） |

<br />

#### 移除包

文档：[https://pnpm.io/zh/cli/remove](https://pnpm.io/zh/cli/remove)

```bash
pnpm remove element-plus
```

<br />

#### 安装项目所有依赖

文档：[https://pnpm.io/zh/cli/install](https://pnpm.io/zh/cli/install)

## 

## Vite脚手架

文档：[https://cn.vitejs.dev/](https://cn.vitejs.dev/)

### 初始化项目

```bash
pnpm create vite
```

<br />

### 修改监听地址

文档：[https://cn.vitejs.dev/config/server-options.html](https://cn.vitejs.dev/config/server-options.html)

```javascript
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: 'localhost',
        port: 8080
    },
    plugins: [vue()]
})
```

### 环境变量和模式

文档：[https://cn.vitejs.dev/guide/env-and-mode.html](https://cn.vitejs.dev/guide/env-and-mode.html)

::: details （1）应用内查看环境变量

`main.js`

```javascript
import {createApp} from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')

console.log(import.meta.env);   // 添加这一行
```

![image-20220928094722169](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220928094722169.png)

:::

::: details （2）自定义环境变量

> 注意：
>
> （1）只有以 `VITE_` 为前缀的变量才会暴露给经过 vite
>
> （2）`vite.config.js`文件中不能使用`import.meta.env`，若要读取配置可以使用`loadEnv`函数，但是只能读取到自定义的配置

开发环境配置文件：`.env.dev`

```ini
VITE_HOST = 0.0.0.0
VITE_PORT = 8887
```

测试环境配置文件：`.env.fat`

```ini
VITE_HOST = 0.0.0.0
VITE_PORT = 8889
```

生产环境配置文件：`.env.pro`

```ini
VITE_HOST = 0.0.0.0
VITE_PORT = 8888
```

修改`vite.config.js`来加载上面的配置文件

```javascript
import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'

export default ({command, mode, ssrBuild}) => {
    const env = loadEnv(mode, process.cwd());
    return defineConfig({
        server: {
            host: env.VITE_HOST,
            port: env.VITE_PORT,
        },
        plugins: [vue()]
    })
}
```

使用vite命令测试

```bash
# 启动开发服务器
vite --mode dev
vite --mode fat
vite --mode pro

# 打包
vite build --mode dev
vite build --mode fat
vite build --mode pro
```

修改`package.json`

```json
  "scripts": {
    "serve:dev": "vite serve --mode dev",
    "serve:fat": "vite serve --mode fat",
    "serve:pro": "vite serve --mode pro",
    "build:dev": "vite build --mode dev",
    "build:fat": "vite build --mode fat",
    "build:pro": "vite build --mode pro",
    "preview": "vite preview"
  },
```

用法示例：`pnpm serve:dev`

:::

## 常用模块

### vue-router

文档：[https://router.vuejs.org/zh/](https://router.vuejs.org/zh/)

#### 安装

```bash
pnpm add vue-router
```

#### 初始化

`src/router/index.js`

```javascript
import {createRouter, createWebHashHistory} from 'vue-router'

const routes = []

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
```

`src/main.js`

```javascript
...
import router from './router'

createApp(App).use(router).mount('#app')
```

#### 添加第一个路由

`src/components/Home.vue`

```vue
<script setup>
</script>

<template>
  <h1>Hello Home</h1>
</template>

<style scoped>
</style>
```

`src/router/index.js`

```javascript
import Home from './../components/Home.vue'

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home,
    }
]
```

<br />

### axios

文档：[https://axios-http.com/docs/intro](https://axios-http.com/docs/intro)

#### 安装

```bash
pnpm add axios
```

<br />

### ElementPlus 

文档：[https://element-plus.org/zh-CN/](https://element-plus.org/zh-CN/)

#### 安装

```bash
pnpm add element-plus
```

#### 自动按需引入

文档：[https://element-plus.org/zh-CN/guide/quickstart.html](https://element-plus.org/zh-CN/guide/quickstart.html)

（1）额外安装两款插件

```bash
pnpm add -D unplugin-vue-components unplugin-auto-import
```

（2）修改`vite.config.js`

```javascript
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

// 修改plugins
        plugins: [
            vue(),
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ]
```

（3）注册到App中，并将默认语言（英文）修改为中文

```javascript
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)
app.use(ElementPlus, {locale: zhCn, size: 'small', zIndex: 3000})
```



## 

## 项目搭建

#### WebStorm配置

::: details 自定义Vue组件模板

![image-20220929180855179](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220929180855179.png)

```vue
<script setup>

</script>

<template>

</template>

<style lang="scss" scoped>

</style>
```

:::

<br />

#### 初始化

（1）`vite`初始化项目

```bash
pnpm create vite
```

（2）安装常用模块

```bash
# 项目依赖
pnpm add vue-router   # 路由
pnpm add pinia        # 状态管理
pnpm add axios        # HTTP客户端

pnpm add element-plus # UI框架
pnpm add reset.css    # CSS重置样式
pnpm add echarts      # 图表组件

# 开发依赖
pnpm add -D eslint
pnpm add -D husky
pnpm add -D scss
```

（3）创建项目目录

```bash
src
  api
  assets
  components
  config
  router
  store
  utils
  views
```

#### 环境配置

::: details 点击查看详情

`src/config/index.js`

```javascript
const mode = import.meta.env.MODE || 'pro';

const modeConfig = {
    dev: {
        realApi: '/',
        mockApi: 'https://www.fastmock.site/mock/c60f00e5eb0cbe6812d8c4750ad2030a/api',
    },
    fat: {
        realApi: '/',
        mockApi: 'https://www.fastmock.site/mock/c60f00e5eb0cbe6812d8c4750ad2030a/api',
    },
    pro: {
        realApi: '/',
        mockApi: 'https://www.fastmock.site/mock/c60f00e5eb0cbe6812d8c4750ad2030a/api',
    },
}

export default {
    mode,
    mock: true,
    ...modeConfig[mode]
}
```

:::

<br />

#### Axios封装

::: details 点击查看详情

`src/utils/http/index.js`

```javascript
import axios from "axios";
import config from "../../config/index.js";

// 创建Axios实例
const instance = axios.create({
    timeout: 3000,
})


// 请求拦截
instance.interceptors.request.use((req) => {
    // todo
    return req;
})

// 响应拦截
instance.interceptors.response.use((res) => {
    // todo
    return res;
})

// 请求核心函数, options参数可以为:
//   (1) axios的配置参数
//   (2) 我们自定义的mock: boolean属性
function request(options) {
    // 设置默认的请求方法
    options.method = options.method || 'get';

    // axios get请求需要将参数传递到params中，而post请求需要将参数传递到data中
    // 这里我们统一request方法，不管是get请求还是post请求都使用data参数传递数据
    if (options.method.toLowerCase() === 'get') {
        options.params = options.data;
        options.data = {};
    }

    // 检查mock是否开启
    let isMock = config.mock;
    if (typeof options.mock !== "undefined") {
        isMock = options.mock;
    }

    // 动态添加baseURL，注意：axios实例的baseURL属性在defaults对象中
    instance.defaults.baseURL = isMock ? config.mockApi : config.realApi;

    // 生产环境即使开启了mock，也强制使用realApi
    if (config.env === 'pro') {
        instance.defaults.baseURL = config.realApi;
    }

    // 发送请求
    return instance(options);
}

// 统一封装
let http = {request};
['get', 'post', 'put', 'delete'].forEach((method) => {
    http[method] = (options) => {
        delete options['method']
        return request({method, ...options});
    }
})

export default http;
```

:::

<br />

#### Storage封装

::: details 点击查看详情

`src/utils/storage/index.js`

```javascript
import config from "../../config/index.js";

class Storage {
    constructor(namespace) {
        this._namespace = namespace;
    }

    getStorage() {
        return JSON.parse(window.localStorage.getItem(this._namespace) || '{}');
    }

    setItem(key, val) {
        let storage = this.getStorage();
        storage[key] = val;
        window.localStorage.setItem(this._namespace, JSON.stringify(storage));
    }

    getItem(key) {
        let storage = this.getStorage();
        return storage[key];
    }

    cleanItem(key) {
        let storage = this.getStorage();
        delete storage[key];
        window.localStorage.setItem(this._namespace, JSON.stringify(storage));
    }

    cleanAll() {
        window.localStorage.clear();
    }
}

function createStorage(namespace) {
    return new Storage(namespace);
}

const defaultStorage = new Storage(config.namespace);

export {defaultStorage, createStorage}
```

:::

