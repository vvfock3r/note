const {path} = require('@vuepress/utils');

module.exports = {
    // 使用自定义主题
    theme: path.resolve(__dirname, './theme'),

    // 语言设置
    lang: 'zh-CN',

    // 站点标题，显示在做左上角
    title: "NoteBook",

    // 站点描述
    description: '打怪升级之旅oh~',

    // 主题配置
    themeConfig: {
        // 设置哪些页面开启左侧侧边栏
        sidebar: 'auto',

        // 侧边栏显示所有标题,默认为false
        displayAllHeaders: true,

        // 侧边栏显示所有标题的深度，默认为2，即只显示1级标题和2级标题
        sidebarDepth: 3,

        // 右上角导航
        navbar: [
            {
                text: '运维',
                children: [
                    {
                        text: 'Linux基础',
                        children: [
                            {text: 'Bash', link: '/ops/Bash'},
                            // {text: 'Linux原理', link: '/ops/Linux'},
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
                            // {text: 'HTML', link: '/frontend/html'},
                            {text: 'CSS', link: '/frontend/css'},
                            {text: 'JavaScript', link: '/frontend/javascript'},
                        ]
                    },

                    {
                        text: '工程化',
                        children: [
                            {text: 'Vue', link: '/frontend/vue'},
                            // {text: 'Vite', link: '/frontend/vite'},
                            // {text: 'NPM Plugins', link: '/frontend/plugins'},
                            // {text: 'VuePress', link: '/frontend/vuepress'},
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
            {text: 'Github', link: 'https://github.com/VVFock3r/Notes'},
        ],

        // 最后更新时间
        lastUpdated: 'Last Updated', // string | boolean
    },

    // 插件配置
    plugins: [
        // 手动注册组件
        [
            '@vuepress/register-components',
            {
                components: {
                    Home: path.resolve(__dirname, './components/Home/Home.vue'),
                },
            },
        ],
    ],

    // markdown配置
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
}