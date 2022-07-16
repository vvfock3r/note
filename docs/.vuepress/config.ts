import { defineUserConfig } from 'vuepress'
import { localTheme } from './theme'

const { path } = require('@vuepress/utils')
const { registerComponentsPlugin } = require('@vuepress/plugin-register-components')

import { viteBundler } from '@vuepress/bundler-vite'

const navbar = [
    {
        text: '运维',
        children: [
            {
                text: 'Linux基础',
                children: [
                    { text: 'Bash', link: '/ops/Bash' },
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
                    { text: 'CSS', link: '/frontend/css' },
                    { text: 'JavaScript', link: '/frontend/javascript' },
                ]
            },

            {
                text: '工程化',
                children: [
                    { text: 'Vue', link: '/frontend/vue' },
                ]
            },

            {
                text: '可视化',
                children: [
                    { text: '浏览器原生绘图', link: '/frontend/浏览器原生绘图.html' },
                    { text: 'Apache Echarts', link: '/frontend/echarts' },
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
                    { text: 'Python核心语法', link: '/backend/Python' },
                    { text: 'Python实用模块', link: '/backend/Modules-for-Python' },
                ]
            },
            {
                text: 'Go',
                children: [
                    { text: 'Go核心语法', link: '/backend/Go' },
                    { text: 'Go Web开发', link: '/backend/Web-for-Go' },
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
                    { text: '容器核心技术', link: '/container/container' },
                ]
            },
            {
                text: '容器仓库',
                children: [
                    { text: 'Harbor', link: '/container/harbor' },
                ]
            },
            {
                text: '容器编排工具',
                children: [
                    { text: 'Docker Compose', link: '/container/docker-compose' },
                    { text: 'Kubernetes：使用kubespray部署', link: '/container/kubespray' },
                    { text: 'Kubernetes：从入门到放弃', link: '/container/kubernetes' },
                ]
            },
        ]
    },

    {
        text: '安全',
        children: [
            { text: 'Web安全入门', link: '/safe/web' },
        ]
    },

    {
        text: '算法',
        children: [
            {
                text: '通用算法',
                children: [
                    { text: '双指针', link: '/algorithm/double-pointer' },
                ]
            },
        ]
    },

    // Github
    { text: 'Github', link: 'https://github.com/VVFock3r/Notes' },
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
    // Vite配置
    bundler: viteBundler({
        viteOptions: {
            build: {
                chunkSizeWarningLimit: 1500,
            }
        },
        vuePluginOptions: {},
    }),
})