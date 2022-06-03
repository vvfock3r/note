<template><div><h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2>
<p>官方文档：https://v2.vuepress.vuejs.org/zh/</p>
<p>三方文档：https://segmentfault.com/a/1190000017055963</p>
<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2>
<p>1、创建blog目录</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> blog <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> blog
</code></pre></div><p>2、初始化项目</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token function">yarn</span> init
</code></pre></div><p>3、安装vuepress</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> -D vuepress
</code></pre></div><p>4、创建第一篇文档</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> docs <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">'# Hello VuePress'</span> <span class="token operator">></span> docs/README.md
</code></pre></div><p>5、修改package.json</p>
<div class="language-json ext-json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"docs:dev"</span><span class="token operator">:</span> <span class="token string">"vuepress dev docs"</span><span class="token punctuation">,</span>
    <span class="token property">"docs:build"</span><span class="token operator">:</span> <span class="token string">"vuepress build docs"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>6、启动服务</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token function">yarn</span> docs:dev
</code></pre></div><h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h2>
<p>官方站点源码：https://github.com/vuepress/vuepress-next/tree/main/docs</p>
<h3 id="新建config-js" tabindex="-1"><a class="header-anchor" href="#新建config-js" aria-hidden="true">#</a> 新建config.js</h3>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">.</span>
├─ docs
│  ├─ README.md
│  └─ .vuepress
│     └─ config.js
└─ package.json
</code></pre></div><h3 id="基本配置config-js" tabindex="-1"><a class="header-anchor" href="#基本配置config-js" aria-hidden="true">#</a> 基本配置config.js</h3>
<p><code v-pre>config.js</code></p>
<div class="language-json ext-json"><pre v-pre class="language-json"><code>module.exports = <span class="token punctuation">{</span>
    <span class="token comment">// 站点标题，显示在做左上角</span>
    title<span class="token operator">:</span> 'Hello VuePress1'<span class="token punctuation">,</span>
    <span class="token comment">// 站点描述</span>
    description<span class="token operator">:</span> 'Just playing around'<span class="token punctuation">,</span>
    <span class="token comment">// 主题配置</span>
    themeConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// 设置哪些页面开启左侧侧边栏</span>
        sidebar<span class="token operator">:</span> <span class="token punctuation">[</span>
            '/'<span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token comment">// 侧边栏显示所有标题,默认为false</span>
        displayAllHeaders<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token comment">// 侧边栏显示所有标题的深度，默认为1，即只显示1级标题h1</span>
        sidebarDepth<span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="配置右上角导航" tabindex="-1"><a class="header-anchor" href="#配置右上角导航" aria-hidden="true">#</a> 配置右上角导航</h3>
<details class="custom-container details"><summary>点击查看代码</summary>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">themeConfig</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">nav</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token comment">// Linux</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'Linux'</span><span class="token punctuation">,</span>
                <span class="token literal-property property">items</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                    <span class="token punctuation">{</span>
                        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'Shell'</span><span class="token punctuation">,</span>
                        <span class="token literal-property property">items</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                            <span class="token punctuation">{</span><span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'Bash语法'</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">'/css/chinese'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                            <span class="token punctuation">{</span><span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'常用命令'</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">'/css/chinese'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                        <span class="token punctuation">]</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">]</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>

            <span class="token comment">// 前端</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'前端'</span><span class="token punctuation">,</span>
                <span class="token literal-property property">items</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                    <span class="token comment">// CSS</span>
                    <span class="token punctuation">{</span>
                        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'CSS'</span><span class="token punctuation">,</span>
                        <span class="token literal-property property">items</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                            <span class="token punctuation">{</span><span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'CSS布局'</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">'/css/chinese'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                            <span class="token punctuation">{</span><span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'CSS属性'</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">'/css/japanese'</span><span class="token punctuation">}</span>
                        <span class="token punctuation">]</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>

                    <span class="token comment">// JavaScript</span>
                    <span class="token punctuation">{</span>
                        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'JavaScript'</span><span class="token punctuation">,</span>
                        <span class="token literal-property property">items</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                            <span class="token punctuation">{</span><span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'JavaScript入门'</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">'/language/chinese'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                            <span class="token punctuation">{</span><span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'TypeScript入门'</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">'/language/chinese'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                        <span class="token punctuation">]</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>

                    <span class="token comment">// Vue</span>
                    <span class="token punctuation">{</span>
                        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'Vue生态圈'</span><span class="token punctuation">,</span>
                        <span class="token literal-property property">items</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                            <span class="token punctuation">{</span><span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'Vue3'</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">'/language/chinese'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                            <span class="token punctuation">{</span><span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'Vite2'</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">'/language/chinese'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                        <span class="token punctuation">]</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">]</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>

            <span class="token comment">// 可视化</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'可视化(2D)'</span><span class="token punctuation">,</span>
                <span class="token literal-property property">items</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                    <span class="token comment">// Canvas</span>
                    <span class="token punctuation">{</span>
                        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'Canvas'</span><span class="token punctuation">,</span>
                        <span class="token literal-property property">items</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                            <span class="token punctuation">{</span><span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'canvas入门'</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">'/css/chinese'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                        <span class="token punctuation">]</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                    <span class="token comment">// SVG</span>
                    <span class="token punctuation">{</span>
                        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'SVG'</span><span class="token punctuation">,</span>
                        <span class="token literal-property property">items</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                            <span class="token punctuation">{</span><span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'SVG入门'</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">'/css/chinese'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                        <span class="token punctuation">]</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                    <span class="token comment">// Echarts</span>
                    <span class="token punctuation">{</span>
                        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'Echarts'</span><span class="token punctuation">,</span>
                        <span class="token literal-property property">items</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                            <span class="token punctuation">{</span><span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'Echarts入门'</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">'/css/chinese'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                        <span class="token punctuation">]</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">]</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token comment">// Github</span>
            <span class="token punctuation">{</span><span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'Github'</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">'https://google.com'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h3 id="配置代码折叠" tabindex="-1"><a class="header-anchor" href="#配置代码折叠" aria-hidden="true">#</a> 配置代码折叠</h3>
<p>语法</p>
<div class="language-markdown ext-md"><pre v-pre class="language-markdown"><code>::: details 点击查看代码
<span class="token code"><span class="token punctuation">```</span><span class="token code-language">js</span>
<span class="token code-block language-js">这里写代码</span>
<span class="token punctuation">```</span></span>
:::
</code></pre></div><h3 id="最后更新时间" tabindex="-1"><a class="header-anchor" href="#最后更新时间" aria-hidden="true">#</a> 最后更新时间</h3>
<p>https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E6%9C%80%E5%90%8E%E6%9B%B4%E6%96%B0%E6%97%B6%E9%97%B4</p>
<h3 id="git-仓库和编辑链接" tabindex="-1"><a class="header-anchor" href="#git-仓库和编辑链接" aria-hidden="true">#</a> Git 仓库和编辑链接</h3>
<p>https://vuepress.vuejs.org/zh/theme/default-theme-config.html#git-%E4%BB%93%E5%BA%93%E5%92%8C%E7%BC%96%E8%BE%91%E9%93%BE%E6%8E%A5</p>
</div></template>
