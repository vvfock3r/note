import {defineUserConfig} from 'vuepress'
import {localTheme} from './theme'

const {path} = require('@vuepress/utils')
const {registerComponentsPlugin} = require('@vuepress/plugin-register-components')

import {viteBundler} from '@vuepress/bundler-vite'

const navbar = [
    {
        text: 'Linux',
        children: [
            {
			    text: 'Distribution ',
                children: [
                    {text: 'Arch ', link: '/linux/arch'},
                ]
		    },
            {
			    text: 'Document',
                children: [
                    {text: 'Shell', link: '/linux/shell'},
                ]
		    },
            {
			    text: 'Performance',
                children: [
                    {text: 'Linux性能优化', link: '/linux/performance'},
                ]
		    },
        ]
    },
    {
        text: '容器',
        children: [
            {
                text: '容器引擎',
                children: [                    
                    {text: 'Docker', link: '/container/docker'},
					{text: 'Containerd', link: '/container/containerd'},
                ]
            },
            {
                text: '镜像仓库',
                children: [
                    {text: 'Harbor', link: '/container/harbor'},
                ]
            },
            {
                text: '容器编排',
                children: [
                    {text: 'Kubernetes: 部署', link: '/kubernetes/deploy.html'},
                    {text: 'Kubernetes: 使用', link: '/kubernetes/document.html'},
					{text: 'Kubernetes: 扩展', link: '/kubernetes/extend.html'},
					{text: 'Kubernetes: 源码', link: '/kubernetes/source.html'},
                    {text: 'Kubernetes: Etcd', link: '/kubernetes/etcd.html'},
                ]
            },
            {
                text: '容器监控',
                children: [                    
                    {text: 'Grafana', link: '/container/grafana'},                    
					{text: 'Prometheus', link: '/container/prometheus'},
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
                    {text: 'CSS', link: '/frontend/css'},
                    {text: 'JavaScript', link: '/frontend/javascript'},
                ]
            },
            {
                text: '工程化',
                children: [
				    {text: 'Tools', link: '/frontend/node-package-manager'},
                    {text: 'Vue', link: '/frontend/vue'},                    
                    {text: 'TypeScript', link: '/frontend/typescript'},
                ]
            },
            {
                text: '可视化',
                children: [
                    {text: '浏览器原生绘图', link: '/frontend/Browser-Native-Drawing.html'},
                    {text: 'Apache Echarts', link: '/frontend/echarts'},
                ]
            },
            {
                text: 'Go',
                children: [
				    {text: 'Go开发工具', link: '/go/tools/goland.html'},
                    {text: 'Go核心语法', link: '/go/document.html'},
					{text: 'Go实用模块', link: '/go/modules.html'},
					{text: 'Go源码分析', link: '/go/sourcecode.html'},
                ]
            },
            {
                text: 'Python',
                children: [
                    {text: 'Python核心语法', link: '/python/document.html'},
                    {text: 'Python实用模块', link: '/python/modules.html'},
                ]
            },
        ]
    },
	{
        text: '散文',
        children: [
            {text: 'Web安全入门', link: '/undefined/web-security'},
            {text: '通用算法入门', link: '/undefined/algorithm'},
			{text: 'Hyper-V', link: '/undefined/hyper-v'},
			{text: 'MeiliSearch', link: '/undefined/meilisearch'},
        ]
    },
    {text: 'Github', link: 'https://github.com/VVFock3r'},
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
		// 设置Logo
		logo: '/logo.png',
    }),
	title: "",
    lang: 'zh-CN',
    description: '打怪升级之旅~',
    head: [['link', {rel: 'icon', href: 'favicon.png'}]],

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
            },
            // 说明：防止被ssr外部化依赖项，这里主要解决的问题是echarts按需引入后报错: SyntaxError: Unexpected token 'export'
            // 文档：https://v2.vuepress.vuejs.org/zh/reference/bundler/vite.html#ssr-externals-%E9%97%AE%E9%A2%98
            // 备注：还没有给ssr配置项提供类型,所以在编辑器中下面会标红
            ssr: {
                noExternal: ['echarts'],
            },
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