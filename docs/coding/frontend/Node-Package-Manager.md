## NodeJS包管理器

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

<br />

## 脚手架工具

<br />

### Vite

文档：[https://cn.vitejs.dev/](https://cn.vitejs.dev/)

#### 初始化项目

```bash
pnpm create vite
```

#### 安装常用模块

```bash
pnpm add vue-router
pnpm add pinia
pnpm add element-plus
pnpm add axios
```

