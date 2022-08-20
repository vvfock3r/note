import {defineUserConfig} from 'vuepress'
import {localTheme} from './theme'

const {path} = require('@vuepress/utils')
const {registerComponentsPlugin} = require('@vuepress/plugin-register-components')

import {viteBundler} from '@vuepress/bundler-vite'

const navbar = [
    {
        text: 'Linux',
        children: [
            {text: 'Bash脚本', link: '/linux/Bash'},
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
                text: '容器仓库',
                children: [
                    {text: 'Harbor', link: '/container/harbor'},
                ]
            },
            {
                text: '容器编排工具',
                children: [
                    {text: 'Docker Compose', link: '/container/docker-compose'},
                    {text: 'Kubernetes：部署方式', link: '/container/kubernetes-deploy'},
                    {text: 'Kubernetes：使用文档', link: '/container/kubernetes-document'},
                ]
            },
        ]
    },
    {
        text: '开发',
        children: [
            {
                text: '前端基础',
                children: [
                    {text: 'CSS', link: '/coding/frontend/css'},
                    {text: 'JavaScript', link: '/coding/frontend/javascript'},
                ]
            },
            {
                text: '工程化',
                children: [
                    {text: 'Vue', link: '/coding/frontend/vue'},
                    {text: 'Node包管理器', link: '/coding/frontend/node-package-manager'},
                    {text: 'TypeScript核心语法', link: '/coding/frontend/typeScript'},
                ]
            },
            {
                text: '可视化',
                children: [
                    {text: '浏览器原生绘图', link: '/coding/frontend/浏览器原生绘图.html'},
                    {text: 'Apache Echarts', link: '/coding/frontend/echarts'},
                ]
            },
            {
                text: 'Python',
                children: [
                    {text: 'Python核心语法', link: '/coding/backend/Python'},
                    {text: 'Python实用模块', link: '/coding/backend/Modules-for-Python'},
                ]
            },
            {
                text: 'Go',
                children: [
                    {text: 'Go核心语法', link: '/coding/backend/Go'},
                    {text: 'Go Web开发', link: '/coding/backend/Web-for-Go'},
                ]
            },

            {
                text: '其他',
                children: [
                    {text: 'Web安全入门', link: '/coding/other/web-security'},
                    {text: '通用算法入门', link: '/coding/other/algorithm'},
                ]
            },
        ]
    },
    {text: 'Github', link: 'https://github.com/VVFock3r/Notes'},
]

export default defineUserConfig({
    // 自定义主题(继承自默认主题)
    theme: localTheme({
        // 导航
        navbar: navbar,
        // 侧边栏配置，默认为auto
        sidebar: 'auto',
        // 侧边栏显示所有标题的深度，默认为2，即只显示1级标题和2级标题
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

    // markdown
    markdown: {
        code: {
            // 不显示行号
            lineNumbers: false,
        },
        extractHeaders: {
            // 提取哪些子标题
            level: [2, 3, 4, 5],
        },
    },

    // markdown对数学公式支持插件
    extendsMarkdown: md => {
        md.use(require('markdown-it-mathjax3'))
    },

    // Vite配置
    bundler: viteBundler({
        viteOptions: {
            build: {
                chunkSizeWarningLimit: 1500,
            }
        },
        vuePluginOptions: {
            template: {
                compilerOptions: {
                    // 在使用markdown-it-mathjax3插件添加数学公式支持后,
                    // 启动开发服务器没有问题，但是打包后会报错 TypeError: Invalid value used as weak map key,
                    // 原因是该插件使用了自定义的标签 mjx-container，我们需要在这里配置一下该标签
                    isCustomElement: (tag) => tag === 'mjx-container',
                },
            },
        },
    }),

    // 关闭页面预拉取, 文档: https://v2.vuepress.vuejs.org/zh/reference/config.html#shouldpreload
    shouldPrefetch: false,
})