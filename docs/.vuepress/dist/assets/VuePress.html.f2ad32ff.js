import{_ as n,o as s,c as a,b as p}from"./app.8347a01d.js";const t={},e=p(`<h2 id="\u4ECB\u7ECD" tabindex="-1"><a class="header-anchor" href="#\u4ECB\u7ECD" aria-hidden="true">#</a> \u4ECB\u7ECD</h2><p>\u5B98\u65B9\u6587\u6863\uFF1Ahttps://v2.vuepress.vuejs.org/zh/</p><p>\u4E09\u65B9\u6587\u6863\uFF1Ahttps://segmentfault.com/a/1190000017055963</p><h2 id="\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5" aria-hidden="true">#</a> \u5B89\u88C5</h2><p>1\u3001\u521B\u5EFAblog\u76EE\u5F55</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token function">mkdir</span> blog <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> blog
</code></pre></div><p>2\u3001\u521D\u59CB\u5316\u9879\u76EE</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token function">yarn</span> init
</code></pre></div><p>3\u3001\u5B89\u88C5vuepress</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> -D vuepress
</code></pre></div><p>4\u3001\u521B\u5EFA\u7B2C\u4E00\u7BC7\u6587\u6863</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token function">mkdir</span> docs <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&#39;# Hello VuePress&#39;</span> <span class="token operator">&gt;</span> docs/README.md
</code></pre></div><p>5\u3001\u4FEE\u6539package.json</p><div class="language-json ext-json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;docs:dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress dev docs&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;docs:build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress build docs&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>6\u3001\u542F\u52A8\u670D\u52A1</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token function">yarn</span> docs:dev
</code></pre></div><h2 id="\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E" aria-hidden="true">#</a> \u914D\u7F6E</h2><p>\u5B98\u65B9\u7AD9\u70B9\u6E90\u7801\uFF1Ahttps://github.com/vuepress/vuepress-next/tree/main/docs</p><h3 id="\u65B0\u5EFAconfig-js" tabindex="-1"><a class="header-anchor" href="#\u65B0\u5EFAconfig-js" aria-hidden="true">#</a> \u65B0\u5EFAconfig.js</h3><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token builtin class-name">.</span>
\u251C\u2500 docs
\u2502  \u251C\u2500 README.md
\u2502  \u2514\u2500 .vuepress
\u2502     \u2514\u2500 config.js
\u2514\u2500 package.json
</code></pre></div><h3 id="\u57FA\u672C\u914D\u7F6Econfig-js" tabindex="-1"><a class="header-anchor" href="#\u57FA\u672C\u914D\u7F6Econfig-js" aria-hidden="true">#</a> \u57FA\u672C\u914D\u7F6Econfig.js</h3><p><code>config.js</code></p><div class="language-json ext-json"><pre class="language-json"><code>module.exports = <span class="token punctuation">{</span>
    <span class="token comment">// \u7AD9\u70B9\u6807\u9898\uFF0C\u663E\u793A\u5728\u505A\u5DE6\u4E0A\u89D2</span>
    title<span class="token operator">:</span> &#39;Hello VuePress1&#39;<span class="token punctuation">,</span>
    <span class="token comment">// \u7AD9\u70B9\u63CF\u8FF0</span>
    description<span class="token operator">:</span> &#39;Just playing around&#39;<span class="token punctuation">,</span>
    <span class="token comment">// \u4E3B\u9898\u914D\u7F6E</span>
    themeConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u8BBE\u7F6E\u54EA\u4E9B\u9875\u9762\u5F00\u542F\u5DE6\u4FA7\u4FA7\u8FB9\u680F</span>
        sidebar<span class="token operator">:</span> <span class="token punctuation">[</span>
            &#39;/&#39;<span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token comment">// \u4FA7\u8FB9\u680F\u663E\u793A\u6240\u6709\u6807\u9898,\u9ED8\u8BA4\u4E3Afalse</span>
        displayAllHeaders<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token comment">// \u4FA7\u8FB9\u680F\u663E\u793A\u6240\u6709\u6807\u9898\u7684\u6DF1\u5EA6\uFF0C\u9ED8\u8BA4\u4E3A1\uFF0C\u5373\u53EA\u663E\u793A1\u7EA7\u6807\u9898h1</span>
        sidebarDepth<span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="\u914D\u7F6E\u53F3\u4E0A\u89D2\u5BFC\u822A" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u53F3\u4E0A\u89D2\u5BFC\u822A" aria-hidden="true">#</a> \u914D\u7F6E\u53F3\u4E0A\u89D2\u5BFC\u822A</h3><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u4EE3\u7801</summary><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token literal-property property">themeConfig</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">nav</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token comment">// Linux</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;Linux&#39;</span><span class="token punctuation">,</span>
                <span class="token literal-property property">items</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                    <span class="token punctuation">{</span>
                        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;Shell&#39;</span><span class="token punctuation">,</span>
                        <span class="token literal-property property">items</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                            <span class="token punctuation">{</span><span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;Bash\u8BED\u6CD5&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/css/chinese&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                            <span class="token punctuation">{</span><span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;\u5E38\u7528\u547D\u4EE4&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/css/chinese&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                        <span class="token punctuation">]</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">]</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>

            <span class="token comment">// \u524D\u7AEF</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;\u524D\u7AEF&#39;</span><span class="token punctuation">,</span>
                <span class="token literal-property property">items</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                    <span class="token comment">// CSS</span>
                    <span class="token punctuation">{</span>
                        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;CSS&#39;</span><span class="token punctuation">,</span>
                        <span class="token literal-property property">items</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                            <span class="token punctuation">{</span><span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;CSS\u5E03\u5C40&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/css/chinese&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                            <span class="token punctuation">{</span><span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;CSS\u5C5E\u6027&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/css/japanese&#39;</span><span class="token punctuation">}</span>
                        <span class="token punctuation">]</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>

                    <span class="token comment">// JavaScript</span>
                    <span class="token punctuation">{</span>
                        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;JavaScript&#39;</span><span class="token punctuation">,</span>
                        <span class="token literal-property property">items</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                            <span class="token punctuation">{</span><span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;JavaScript\u5165\u95E8&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/language/chinese&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                            <span class="token punctuation">{</span><span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;TypeScript\u5165\u95E8&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/language/chinese&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                        <span class="token punctuation">]</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>

                    <span class="token comment">// Vue</span>
                    <span class="token punctuation">{</span>
                        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;Vue\u751F\u6001\u5708&#39;</span><span class="token punctuation">,</span>
                        <span class="token literal-property property">items</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                            <span class="token punctuation">{</span><span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;Vue3&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/language/chinese&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                            <span class="token punctuation">{</span><span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;Vite2&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/language/chinese&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                        <span class="token punctuation">]</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">]</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>

            <span class="token comment">// \u53EF\u89C6\u5316</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;\u53EF\u89C6\u5316(2D)&#39;</span><span class="token punctuation">,</span>
                <span class="token literal-property property">items</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                    <span class="token comment">// Canvas</span>
                    <span class="token punctuation">{</span>
                        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;Canvas&#39;</span><span class="token punctuation">,</span>
                        <span class="token literal-property property">items</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                            <span class="token punctuation">{</span><span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;canvas\u5165\u95E8&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/css/chinese&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                        <span class="token punctuation">]</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                    <span class="token comment">// SVG</span>
                    <span class="token punctuation">{</span>
                        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;SVG&#39;</span><span class="token punctuation">,</span>
                        <span class="token literal-property property">items</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                            <span class="token punctuation">{</span><span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;SVG\u5165\u95E8&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/css/chinese&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                        <span class="token punctuation">]</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                    <span class="token comment">// Echarts</span>
                    <span class="token punctuation">{</span>
                        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;Echarts&#39;</span><span class="token punctuation">,</span>
                        <span class="token literal-property property">items</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                            <span class="token punctuation">{</span><span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;Echarts\u5165\u95E8&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;/css/chinese&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                        <span class="token punctuation">]</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">]</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token comment">// Github</span>
            <span class="token punctuation">{</span><span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;Github&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&#39;https://google.com&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h3 id="\u914D\u7F6E\u4EE3\u7801\u6298\u53E0" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u4EE3\u7801\u6298\u53E0" aria-hidden="true">#</a> \u914D\u7F6E\u4EE3\u7801\u6298\u53E0</h3><p>\u8BED\u6CD5</p><div class="language-markdown ext-md"><pre class="language-markdown"><code>::: details \u70B9\u51FB\u67E5\u770B\u4EE3\u7801
<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">js</span>
<span class="token code-block language-js">\u8FD9\u91CC\u5199\u4EE3\u7801</span>
<span class="token punctuation">\`\`\`</span></span>
:::
</code></pre></div><h3 id="\u6700\u540E\u66F4\u65B0\u65F6\u95F4" tabindex="-1"><a class="header-anchor" href="#\u6700\u540E\u66F4\u65B0\u65F6\u95F4" aria-hidden="true">#</a> \u6700\u540E\u66F4\u65B0\u65F6\u95F4</h3><p>https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E6%9C%80%E5%90%8E%E6%9B%B4%E6%96%B0%E6%97%B6%E9%97%B4</p><h3 id="git-\u4ED3\u5E93\u548C\u7F16\u8F91\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#git-\u4ED3\u5E93\u548C\u7F16\u8F91\u94FE\u63A5" aria-hidden="true">#</a> Git \u4ED3\u5E93\u548C\u7F16\u8F91\u94FE\u63A5</h3><p>https://vuepress.vuejs.org/zh/theme/default-theme-config.html#git-%E4%BB%93%E5%BA%93%E5%92%8C%E7%BC%96%E8%BE%91%E9%93%BE%E6%8E%A5</p>`,32),o=[e];function c(r,l){return s(),a("div",null,o)}var u=n(t,[["render",c],["__file","VuePress.html.vue"]]);export{u as default};
