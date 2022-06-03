import{_ as o,r as e,o as c,c as l,d as s,a as t,e as n,b as p}from"./app.8347a01d.js";const u={},r=s("h2",{id:"echarts",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#echarts","aria-hidden":"true"},"#"),n(" Echarts")],-1),k=n("\u5B98\u7F51\uFF1A"),i={href:"https://echarts.apache.org/zh/index.html",target:"_blank",rel:"noopener noreferrer"},y=n("https://echarts.apache.org/zh/index.html"),g=n("\u5B98\u7F51\u793A\u4F8B\uFF1A"),m={href:"https://echarts.apache.org/examples/zh/index.html",target:"_blank",rel:"noopener noreferrer"},d=n("https://echarts.apache.org/examples/zh/index.html"),h=n("\u7B2C\u4E09\u65B9\u793A\u4F8B\uFF1A"),q={href:"https://www.makeapie.com/explore.html",target:"_blank",rel:"noopener noreferrer"},b=n("https://www.makeapie.com/explore.html"),v=p(`<h3 id="\u7B2C\u4E00\u4E2A\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u7B2C\u4E00\u4E2A\u793A\u4F8B" aria-hidden="true">#</a> \u7B2C\u4E00\u4E2A\u793A\u4F8B</h3><p><code>demo.html</code></p><div class="language-html ext-html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">doctype</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>en<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X-UA-Compatible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ie=edge<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- (1)\u5F15\u5165echarts --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token comment">&lt;!-- (2)\u521B\u5EFA\u56FE\u8868\u5BB9\u5668\uFF0C\u6CE8\u610F\u5FC5\u987B\u8981\u8BBE\u7F6E\u5BBD\u9AD8 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart<span class="token punctuation">&quot;</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">width</span><span class="token punctuation">:</span> 800px<span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token comment">// \u56FE\u8868\u5BB9\u5668Dom</span>
<span class="token keyword">const</span> chartDom <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u521D\u59CB\u5316echarts\u5BF9\u8C61</span>
<span class="token keyword">const</span> chart <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chartDom<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u8BBE\u7F6E\u56FE\u8868\u53C2\u6570\uFF08\u8FD9\u4F1A\u5C06\u56FE\u8868\u7ED8\u5236\u51FA\u6765\uFF09</span>
chart<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token comment">// \u8BBE\u7F6E\u6807\u9898</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;Echarts\u5165\u95E8&#39;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u8BBE\u7F6Ex\u8F74</span>
    <span class="token literal-property property">xAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;\u98DF\u54C1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\u6570\u7801&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\u670D\u9970&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\u7BB1\u5305&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u8BBE\u7F6Ey\u8F74</span>
    <span class="token literal-property property">yAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u8BBE\u7F6E\u56FE\u8868\u7C7B\u578B\u548C\u56FE\u6807\u6570\u636E</span>
    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">,</span> <span class="token comment">// \u67F1\u72B6\u56FE</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">120</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">150</span><span class="token punctuation">]</span> <span class="token comment">// \u6BCF\u4E2A\u503C\u548Cx\u8F74\u5206\u522B\u5BF9\u5E94</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211127220405848.png" alt="image-20211127220405848"></p><h3 id="\u7EC4\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u7EC4\u4EF6" aria-hidden="true">#</a> \u7EC4\u4EF6</h3><h4 id="\u6982\u5FF5\u8BF4\u660E" tabindex="-1"><a class="header-anchor" href="#\u6982\u5FF5\u8BF4\u660E" aria-hidden="true">#</a> \u6982\u5FF5\u8BF4\u660E</h4><p>\u6240\u6709\u7EC4\u4EF6\u7684\u5B98\u65B9\u6587\u6863\u5730\u5740\uFF1Ahttps://echarts.apache.org/zh/option.html</p><p><code>Echarts</code>\u4E2D\u9664\u4E86\u7ED8\u56FE\u4E4B\u5916\u7684\u5176\u4ED6\u90E8\u5206\uFF0C\u90FD\u53EF\u4EE5\u62BD\u8C61\u4E3A<strong>\u7EC4\u4EF6</strong>\uFF0C\u6BD4\u5982\u8BF4\u6807\u9898\u3001\u76F4\u89D2\u5750\u6807\u7CFBx\u8F74\u3001\u76F4\u89D2\u5750\u6807\u7CFBy\u8F74\u7B49\u7B49\uFF0C\u5982\u4E0B\u56FE</p><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211127222514806.png" alt="image-20211127222514806"></p><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211127222910817.png" alt="image-20211127222910817"></p><p>\u6BCF\u4E2A\u7EC4\u4EF6\u90FD\u6709\u5F88\u591A\u5F88\u591A\u5C5E\u6027\uFF0C\u6211\u4EEC\u6700\u5E38\u7528\u7684\u5927\u6982\u5982\u4E0B\u51E0\u7C7B\uFF1A</p><ul><li><p>\u662F\u5426\u663E\u793A\u7EC4\u4EF6\u5F00\u5173</p></li><li><p>\u4E0E\u7EC4\u4EF6\u672C\u8EAB\u5F3A\u76F8\u5173\u7684\u5C5E\u6027\uFF0C\u6BD4\u5982\u6807\u9898\u7EC4\u4EF6\u7684\u4E3B\u6807\u9898\u3001\u526F\u6807\u9898</p></li><li><p>\u7EC4\u4EF6\u6E32\u67D3\u5230\u54EA\u91CC\u7684\u7684\u4F4D\u7F6E\u5C5E\u6027\uFF0C\u6BD4\u5982top\u3001left\u7B49</p></li><li><p>\u7EC4\u4EF6\u7684\u6837\u5F0F\u5C5E\u6027\uFF0C\u5B57\u4F53\u5927\u5C0F\u3001\u989C\u8272\u3001\u6362\u884C\u7B49</p></li></ul><h4 id="\u7EC4\u4EF6-\u6807\u9898" tabindex="-1"><a class="header-anchor" href="#\u7EC4\u4EF6-\u6807\u9898" aria-hidden="true">#</a> \u7EC4\u4EF6 - \u6807\u9898</h4><p>\u6587\u6863\uFF1Ahttps://echarts.apache.org/zh/option.html#title</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><p><code>demo.html</code></p><div class="language-html ext-html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">doctype</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>en<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X-UA-Compatible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ie=edge<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- (1)\u5F15\u5165echarts --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token comment">&lt;!-- (2)\u521B\u5EFA\u56FE\u8868\u5BB9\u5668 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart<span class="token punctuation">&quot;</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">width</span><span class="token punctuation">:</span> 800px<span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token comment">// \u56FE\u8868\u5BB9\u5668Dom</span>
<span class="token keyword">const</span> chartDom <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u521D\u59CB\u5316echarts\u5BF9\u8C61</span>
<span class="token keyword">const</span> chart <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chartDom<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u8BBE\u7F6E\u56FE\u8868\u53C2\u6570\uFF08\u8FD9\u4F1A\u5C06\u56FE\u8868\u7ED8\u5236\u51FA\u6765\uFF09</span>
chart<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token comment">// \u8BBE\u7F6E\u6807\u9898</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// \u662F\u5426\u663E\u793A\u6807\u9898\uFF0C\u9ED8\u8BA4\u4E3Atrue</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;Echarts\u5165\u95E8&#39;</span><span class="token punctuation">,</span>  <span class="token comment">// \u4E3B\u6807\u9898</span>
        <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;\u8FD9\u91CC\u662F\u526F\u6807\u9898,\\n\u652F\u6301\\\\n\u6362\u884C&#39;</span><span class="token punctuation">,</span> <span class="token comment">// \u526F\u6807\u9898</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span> <span class="token comment">// \u6807\u9898\u7EC4\u4EF6\u6C34\u5E73\u5C45\u4E2D</span>
        <span class="token literal-property property">textAlign</span><span class="token operator">:</span> <span class="token string">&#39;left&#39;</span><span class="token punctuation">,</span>  <span class="token comment">// \u6C34\u5E73\u5BF9\u9F50\u65B9\u5F0F</span>
        <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;rgb(92,123,217)&#39;</span><span class="token punctuation">,</span>   <span class="token comment">// \u4E3B\u6807\u9898\u6587\u5B57\u989C\u8272</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">subtextStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;orange&#39;</span><span class="token punctuation">,</span>    <span class="token comment">// \u526F\u6807\u9898\u6587\u5B57\u989C\u8272</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u8BBE\u7F6Ex\u8F74</span>
    <span class="token literal-property property">xAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;\u98DF\u54C1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\u6570\u7801&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\u670D\u9970&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\u7BB1\u5305&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u8BBE\u7F6Ey\u8F74</span>
    <span class="token literal-property property">yAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u8BBE\u7F6E\u56FE\u8868\u7C7B\u578B\u548C\u56FE\u6807\u6570\u636E</span>
    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">,</span> <span class="token comment">// \u67F1\u72B6\u56FE</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">120</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">150</span><span class="token punctuation">]</span> <span class="token comment">// \u6BCF\u4E2A\u503C\u548Cx\u8F74\u5206\u522B\u5BF9\u5E94</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre></div></details><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211128140752858.png" alt="image-20211128140752858"></p><h4 id="\u7EC4\u4EF6-\u7CFB\u5217\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#\u7EC4\u4EF6-\u7CFB\u5217\u7B80\u4ECB" aria-hidden="true">#</a> \u7EC4\u4EF6 - \u7CFB\u5217\u7B80\u4ECB</h4><p>\u7CFB\u5217\uFF1Ahttps://echarts.apache.org/zh/option.html#series</p><p><strong>\u7CFB\u5217\u7684\u6982\u5FF5</strong></p><p>\u7B80\u5355\u6765\u8BF4\uFF0C\u5C31\u662F\u4F60\u8981\u7ED8\u5236\u54EA\u79CD\u56FE\u5F62\uFF0C\u6BD4\u5982\u4E00\u4E2A\u76F4\u7EBF\u56FE\u5C31\u662F\u4E00\u4E2A\u7CFB\u5217\uFF0C\u4E00\u4E2A\u67F1\u72B6\u56FE\u4E5F\u662F\u4E00\u4E2A\u7CFB\u5217\uFF0C\u540C\u6837\u7684\u8FD8\u6709\u997C\u56FE\u3001K\u7EBF\u56FE\u7B49\u7B49\uFF0C</p><p>\u603B\u7ED3\u4E00\u4E0B\u5C31\u662F<strong>\u4E00\u4E2A\u7CFB\u5217\u5C31\u662F\u4E00\u79CD\u56FE\u5F62</strong></p><p>\u53C2\u8003\u4E0B\u56FE\uFF1A</p><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211128194633870.png" alt="image-20211128194633870"></p><p><strong>\u7CFB\u5217\u7684\u4F7F\u7528</strong></p><p>\u5149\u6709\u7CFB\u5217\u8FD8\u4E0D\u591F\uFF0C\u6BCF\u4E2A\u7CFB\u5217\u8FD8\u9700\u8981\u4E00\u4E9B\u5176\u4ED6\u7EC4\u4EF6\u642D\u914D\u4F7F\u7528\uFF0C\u6BD4\u5982\u6298\u7EBF\u56FE\u3001\u67F1\u72B6\u56FE\u4E00\u822C\u8981\u548C<strong>\u76F4\u89D2\u5750\u6807\u7CFB</strong>\u642D\u914D\u6765\u4F7F\u7528\u7B49</p><p><strong>\u53EF\u5B58\u5728\u591A\u4E2A\u7CFB\u5217</strong></p><p>\u4E00\u4E2A\u56FE\u6807\u4E2D\u53EF\u4EE5\u5B58\u5728\u591A\u4E2A\u7CFB\u5217\uFF0C\u4E0B\u9762\u4EE3\u7801\u4F7F\u7528\u67F1\u72B6\u56FE\u548C\u6298\u7EBF\u56FE\u6765\u8BF4\u660E</p><blockquote><p>\u5F53\u7136\uFF0C\u4E00\u4E2A\u56FE\u8868\u4E2D\u4E5F\u53EF\u4EE5\u5B58\u5728\u591A\u4E2A\u4E0D\u540C\u7C7B\u578B\u7684\u7CFB\u5217\uFF0C\u6BD4\u5982\u67F1\u72B6\u56FE\u548C\u6298\u7EBF\u56FE2\u4E2A\u7CFB\u5217\u7EC4\u6210\u4E00\u4E2A\u56FE\u8868</p></blockquote><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211128201039944.png" alt="image-20211128201039944"></p><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211128201555807.png" alt="image-20211128201555807"></p><p>\u7CFB\u5217\u7684\u5185\u5BB9\u592A\u591A\uFF0C\u540E\u9762\u518D\u8BE6\u7EC6\u89E3\u91CA\u6BCF\u79CD\u56FE\u5F62\u7684\u5C5E\u6027</p><h4 id="\u7EC4\u4EF6-\u76F4\u89D2\u5750\u6807\u7CFB" tabindex="-1"><a class="header-anchor" href="#\u7EC4\u4EF6-\u76F4\u89D2\u5750\u6807\u7CFB" aria-hidden="true">#</a> \u7EC4\u4EF6 - \u76F4\u89D2\u5750\u6807\u7CFB</h4><p>X\u8F74\u548CY\u8F74\u662F\u4E24\u4E2A\u7EC4\u4EF6\uFF0C\u4E00\u822C\u7EC4\u5408\u8D77\u6765\u4F7F\u7528\u6784\u6210\u76F4\u89D2\u5750\u6807\u7CFB</p><p>X\u8F74\uFF1Ahttps://echarts.apache.org/zh/option.html#xAxis</p><p>Y\u8F74\uFF1Ahttps://echarts.apache.org/zh/option.html#yAxis</p><p><strong>X\u8F74</strong></p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><p><code>demo.html</code></p><div class="language-html ext-html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">doctype</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>en<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X-UA-Compatible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ie=edge<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- (1)\u5F15\u5165echarts --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token comment">&lt;!-- (2)\u521B\u5EFA\u56FE\u8868\u5BB9\u5668 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart<span class="token punctuation">&quot;</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">width</span><span class="token punctuation">:</span> 800px<span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span> <span class="token property">border</span><span class="token punctuation">:</span> 1px solid green<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token comment">// \u56FE\u8868\u5BB9\u5668Dom</span>
<span class="token keyword">const</span> chartDom <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u521D\u59CB\u5316echarts\u5BF9\u8C61</span>
<span class="token keyword">const</span> chart <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chartDom<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u8BBE\u7F6E\u56FE\u8868\u53C2\u6570\uFF08\u8FD9\u4F1A\u5C06\u56FE\u8868\u7ED8\u5236\u51FA\u6765\uFF09</span>
chart<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token comment">// \u8BBE\u7F6E\u6807\u9898</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;Echarts\u5165\u95E8&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;\u8FD9\u91CC\u662F\u526F\u6807\u9898&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u8BBE\u7F6Ex\u8F74</span>
    <span class="token literal-property property">xAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u662F\u5426\u663E\u793Ax\u8F74\uFF0C\u9ED8\u8BA4\u4E3Atrue</span>
        <span class="token comment">// show: false,</span>

        <span class="token comment">// x\u8F74\u7C7B\u578B\uFF0C\u9ED8\u8BA4\u503C\u4E3Acategory(\u7C7B\u76EE\u8F74)</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;category&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// \u7C7B\u76EE\u8F74\u4E2D\uFF0C\u6240\u6709\u7C7B\u76EE\u540D\u79F0\u5217\u8868\uFF0C\u6570\u7EC4\u4E2D\u6BCF\u4E2A\u5143\u7D20\u53EF\u4EE5\u662F\u5B57\u7B26\u4E32\uFF0C\u4E5F\u53EF\u4EE5\u662F\u5BF9\u8C61</span>
        <span class="token comment">// data: [&quot;\u98DF\u54C1&quot;, &quot;\u6570\u7801&quot;, &quot;\u670D\u9970&quot;, &quot;\u7BB1\u5305&quot;],</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&quot;\u98DF\u54C1&quot;</span><span class="token punctuation">,</span>
                <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;green&#39;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&quot;\u6570\u7801&quot;</span><span class="token punctuation">,</span>
                <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;black&#39;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&quot;\u670D\u9970&quot;</span><span class="token punctuation">,</span>
                <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;orange&#39;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&quot;\u7BB1\u5305&quot;</span><span class="token punctuation">,</span>
                <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;blue&#39;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token string">&quot;\u5360\u4F4D&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;\u5360\u4F4D&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;\u5360\u4F4D&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;\u5360\u4F4D&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;\u5360\u4F4D&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;\u5360\u4F4D&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;\u5360\u4F4D&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;\u5360\u4F4D&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;\u5360\u4F4D&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;\u5360\u4F4D&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;\u5360\u4F4D&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;\u5360\u4F4D&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;\u5360\u4F4D&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;\u5360\u4F4D&quot;</span><span class="token punctuation">,</span>
            <span class="token string">&quot;\u5360\u4F4D&quot;</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>

        <span class="token comment">// x\u8F74\u7684\u4F4D\u7F6E\uFF0C\u9ED8\u8BA4\u4E3Abottom</span>
        <span class="token literal-property property">position</span><span class="token operator">:</span> <span class="token string">&#39;bottom&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// x\u8F74\u7684\u6A2A\u7EBF</span>
        <span class="token literal-property property">axisLine</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
            <span class="token literal-property property">lineStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;red&#39;</span><span class="token punctuation">,</span>
                <span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>

        <span class="token comment">// x\u8F74\u6A2A\u7EBF\u4E0B\u9762\u7684\u7AD6\u7EBF</span>
        <span class="token literal-property property">axisTick</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
            <span class="token literal-property property">alignWithLabel</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>   <span class="token comment">// \u7AD6\u7EBF\u6307\u5411\u7C7B\u76EE\u8F74\u4E2D\u7684\u6587\u5B57</span>
            <span class="token literal-property property">interval</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>            <span class="token comment">// \u5F53\u7C7B\u76EE\u5F88\u591A\u65F6\uFF0C\u6BCF\u9694\u51E0\u4E2A\u663E\u793A\u7AD6\u7EBF\uFF0C0\u8868\u793A\u663E\u793A\u5168\u90E8\u7AD6\u7EBF</span>
            <span class="token literal-property property">lineStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;green&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>

        <span class="token comment">// x\u8F74\u4E2D\u7684\u7C7B\u76EE\u6587\u5B57</span>
        <span class="token literal-property property">axisLabel</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
            <span class="token literal-property property">interval</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">// \u5F53\u7C7B\u76EE\u5F88\u591A\u65F6\uFF0C\u6BCF\u9694\u51E0\u4E2A\u663E\u793A\u7AD6\u7EBF\uFF0C0\u8868\u793A\u663E\u793A\u5168\u90E8\u7C7B\u76EE\u6587\u5B57</span>
            <span class="token literal-property property">rotate</span><span class="token operator">:</span> <span class="token number">45</span><span class="token punctuation">,</span> <span class="token comment">// \u5F53\u7C7B\u76EE\u8D85\u7EA7\u591A\u65F6\uFF0C\u53C8\u8981\u5168\u90E8\u663E\u793A\u65F6\uFF0C\u5C06\u6587\u5B57\u65CB\u8F6C\u503E\u659C\u6307\u5B9A\u89D2\u5EA6\uFF0C\u66F4\u597D\u7684\u6765\u663E\u793A\u7C7B\u76EE\u6587\u5B57</span>
            <span class="token function-variable function">formatter</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">value<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>    <span class="token comment">// \u7C7B\u76EE\u6587\u5B57\u6837\u5F0F\u683C\u5F0F\u5316</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">===</span> <span class="token string">&#39;\u5360\u4F4D&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">return</span> value <span class="token operator">+</span> index<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">return</span> value<span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token function-variable function">color</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">value<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>    <span class="token comment">// \u7C7B\u76EE\u8F74\u6587\u5B57\u989C\u8272\uFF0C\u5BF9\u4E8E\u6CA1\u6709\u663E\u793A\u8BBE\u7F6E\u989C\u8272\u7684\u7C7B\u76EE\u6587\u5B57\uFF0C\u624D\u4F1A\u8C03\u7528\u8FD9\u4E2A\u51FD\u6570</span>
                <span class="token comment">// console.log(value, index);</span>
                <span class="token keyword">return</span> index <span class="token operator">%</span> <span class="token number">5</span> <span class="token operator">===</span> <span class="token number">0</span> <span class="token operator">?</span> <span class="token string">&#39;green&#39;</span> <span class="token operator">:</span> <span class="token string">&#39;red&#39;</span><span class="token punctuation">;</span>   <span class="token comment">// \u8BBE\u7F6E5\u7684\u500D\u6570\u4E3A\u7EFF\u8272\uFF0C\u5176\u4ED6\u4E3A\u7EA2\u8272</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>

        <span class="token comment">// \u7AD6\u957F\u7EBF</span>
        <span class="token literal-property property">splitLine</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// \u9ED8\u8BA4\u4E3Afalse</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>

        <span class="token comment">// \u53CD\u5411\u5750\u6807\u8F74, \u9ED8\u8BA4\u4E3Afalse</span>
        <span class="token comment">// inverse: true,</span>

        <span class="token comment">// \u5750\u6807\u8F74\u4E24\u8FB9\u7559\u767D\u7B56\u7565\uFF0C\u9ED8\u8BA4\u4E3Atrue</span>
        <span class="token comment">// boundaryGap: false,</span>

        <span class="token comment">// x\u8F74\u540D\u79F0\u3001\u4F4D\u7F6E\u548C\u6837\u5F0F</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u8FD9\u91CC\u662Fx\u8F74\u540D\u79F0,\u4F4D\u7F6E\u53EF\u8C03&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">nameLocation</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">nameTextStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token number">800</span><span class="token punctuation">,</span> <span class="token comment">// \u5BBD\u5EA6\u5C5E\u6027\u4E0D\u751F\u6548\uFF0C\u4E0D\u77E5\u9053\u4E3A\u5565</span>
            <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
            <span class="token literal-property property">padding</span><span class="token operator">:</span> <span class="token number">40</span><span class="token punctuation">,</span>
            <span class="token literal-property property">align</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">verticalAlign</span><span class="token operator">:</span> <span class="token string">&#39;top&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;red&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">backgroundColor</span><span class="token operator">:</span> <span class="token string">&#39;orange&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">borderWidth</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
            <span class="token literal-property property">borderColor</span><span class="token operator">:</span> <span class="token string">&#39;green&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u8BBE\u7F6Ey\u8F74</span>
    <span class="token literal-property property">yAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u8BBE\u7F6E\u56FE\u8868\u7C7B\u578B\u548C\u56FE\u6807\u6570\u636E</span>
    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">,</span> <span class="token comment">// \u67F1\u72B6\u56FE</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">120</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">150</span><span class="token punctuation">]</span> <span class="token comment">// \u6BCF\u4E2A\u503C\u548Cx\u8F74\u5206\u522B\u5BF9\u5E94</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre></div></details><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211128160412701.png" alt="image-20211128160412701"></p><p><strong>Y\u8F74</strong></p><p>Y\u8F74\u548CX\u8F74\u5F88\u7C7B\u4F3C\uFF0C\u6240\u6709\u76F8\u540C\u7684\u6982\u5FF5\u5728\u8FD9\u91CC\u5C31\u4E0D\u91CD\u590D\u8BF4\u660E\u4E86\uFF0CY\u8F74\u5176\u4F59\u6BD4\u8F83\u5173\u5FC3\u7684\u6709\uFF1A</p><ul><li>\u56FA\u5B9A\u6700\u5C0F\u503C\u548C\u6700\u5927\u503C</li><li>Y\u8F74\u5206\u6BB5\u663E\u793A\u8BBE\u7F6E</li></ul><p><code>demo.html</code></p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u4EE3\u7801</summary><div class="language-html ext-html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">doctype</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>en<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X-UA-Compatible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ie=edge<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- (1)\u5F15\u5165echarts --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token comment">&lt;!-- (2)\u521B\u5EFA\u56FE\u8868\u5BB9\u5668 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart<span class="token punctuation">&quot;</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">width</span><span class="token punctuation">:</span> 800px<span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span> <span class="token property">border</span><span class="token punctuation">:</span> 1px solid green<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token comment">// \u56FE\u8868\u5BB9\u5668Dom</span>
<span class="token keyword">const</span> chartDom <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u521D\u59CB\u5316echarts\u5BF9\u8C61</span>
<span class="token keyword">const</span> chart <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chartDom<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u8BBE\u7F6E\u56FE\u8868\u53C2\u6570\uFF08\u8FD9\u4F1A\u5C06\u56FE\u8868\u7ED8\u5236\u51FA\u6765\uFF09</span>
chart<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token comment">// \u8BBE\u7F6E\u6807\u9898</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;Echarts\u5165\u95E8&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;\u8FD9\u91CC\u662F\u526F\u6807\u9898&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u8BBE\u7F6Ex\u8F74</span>
    <span class="token literal-property property">xAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&quot;\u98DF\u54C1&quot;</span><span class="token punctuation">,</span>
                <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;green&#39;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&quot;\u6570\u7801&quot;</span><span class="token punctuation">,</span>
                <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;black&#39;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&quot;\u670D\u9970&quot;</span><span class="token punctuation">,</span>
                <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;orange&#39;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&quot;\u7BB1\u5305&quot;</span><span class="token punctuation">,</span>
                <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;blue&#39;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u8BBE\u7F6Ey\u8F74</span>
    <span class="token literal-property property">yAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u9ED8\u8BA4\u4E3Atrue</span>
        <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>

        <span class="token comment">// \u9ED8\u8BA4\u4E3A\u6570\u503C\u8F74</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;value&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// \u56FA\u5B9A\u6570\u503C\u6700\u5C0F\u503C\u548C\u6700\u5927\u503C</span>
        <span class="token comment">// \u5982\u679C\u4E0D\u8BBE\u7F6E\u7684\u8BDD\uFF0C\u6700\u5C0F\u503C\u548C\u6700\u5927\u503C\u662F\u52A8\u6001\u53D8\u5316\u7684</span>
        <span class="token literal-property property">min</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
        <span class="token literal-property property">max</span><span class="token operator">:</span> <span class="token number">200</span><span class="token punctuation">,</span>

        <span class="token comment">// \u5206\u5272\u6BB5\u6570\uFF0C\u9ED8\u8BA4\u4E3A5</span>
        <span class="token comment">// \u5728\u6211\u4EEC\u7684\u4EE3\u7801\u4E2D\uFF0Cmax(200) / 10 = 20\uFF0C\u5373\u6BCF\u6BB5\u7684\u503C\u4E3A20</span>
        <span class="token literal-property property">splitNumber</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>

        <span class="token comment">// Y\u8F74\u6587\u5B57\u6837\u5F0F</span>
        <span class="token literal-property property">axisLabel</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token function-variable function">formatter</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">value<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> value <span class="token operator">&gt;=</span> <span class="token number">100</span> <span class="token operator">?</span> <span class="token string">&#39;Green &#39;</span> <span class="token operator">+</span> value <span class="token operator">:</span> <span class="token string">&#39;Red &#39;</span> <span class="token operator">+</span> value<span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token function-variable function">color</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">value<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">return</span> value <span class="token operator">&gt;=</span> <span class="token number">100</span> <span class="token operator">?</span> <span class="token string">&#39;green&#39;</span> <span class="token operator">:</span> <span class="token string">&#39;red&#39;</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>

        <span class="token comment">// \u662F\u5426\u7559\u767D\uFF0C\u9ED8\u8BA4\u4E3Atrue, \u8FD9\u4E2A\u8BBE\u7F6E\u4E86\u597D\u50CF\u6CA1\u6709\u751F\u6548\uFF1F</span>
        <span class="token literal-property property">boundaryGap</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u8BBE\u7F6E\u56FE\u8868\u7C7B\u578B\u548C\u56FE\u6807\u6570\u636E</span>
    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">,</span> <span class="token comment">// \u67F1\u72B6\u56FE</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">120</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">150</span><span class="token punctuation">]</span> <span class="token comment">// \u6BCF\u4E2A\u503C\u548Cx\u8F74\u5206\u522B\u5BF9\u5E94</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre></div></details><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211128190227557.png" alt="image-20211128190227557"></p><h4 id="\u7EC4\u4EF6-\u63D0\u793A\u6846" tabindex="-1"><a class="header-anchor" href="#\u7EC4\u4EF6-\u63D0\u793A\u6846" aria-hidden="true">#</a> \u7EC4\u4EF6 - \u63D0\u793A\u6846</h4><p>\u6587\u6863\uFF1Ahttps://echarts.apache.org/zh/option.html#tooltip</p><p>\u63D0\u793A\u6846\u6700\u91CD\u8981\u7684\u662F\u8981\u77E5\u9053\u5982\u4F55\u6539\u5199\u6837\u5F0F\uFF0C\u53C2\u8003\u5982\u4E0B\u4EE3\u7801</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><p><code>demo.html</code></p><div class="language-html ext-html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">doctype</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>en<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X-UA-Compatible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ie=edge<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- (1)\u5F15\u5165echarts --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token comment">&lt;!-- (2)\u521B\u5EFA\u56FE\u8868\u5BB9\u5668 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart<span class="token punctuation">&quot;</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">width</span><span class="token punctuation">:</span> 800px<span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span> <span class="token property">border</span><span class="token punctuation">:</span> 1px solid green<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token comment">// \u56FE\u8868\u5BB9\u5668Dom</span>
<span class="token keyword">const</span> chartDom <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u521D\u59CB\u5316echarts\u5BF9\u8C61</span>
<span class="token keyword">const</span> chart <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chartDom<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u8BBE\u7F6E\u56FE\u8868\u53C2\u6570\uFF08\u8FD9\u4F1A\u5C06\u56FE\u8868\u7ED8\u5236\u51FA\u6765\uFF09</span>
chart<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token comment">// \u8BBE\u7F6E\u6807\u9898</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;\u9500\u552E\u989D&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;\u5305\u542B\u5317\u4EAC\u548C\u4E0A\u6D77\u4E24\u4E2A\u5730\u533A&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u8BBE\u7F6Ex\u8F74</span>
    <span class="token literal-property property">xAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;\u98DF\u54C1&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;\u6570\u7801&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;\u670D\u9970&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;\u7BB1\u5305&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u8BBE\u7F6Ey\u8F74</span>
    <span class="token literal-property property">yAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u63D0\u793A\u6846</span>
    <span class="token literal-property property">tooltip</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token comment">// \u89E6\u53D1\u7C7B\u578B,\u9ED8\u8BA4\u4E3A item, \u5176\u4ED6\u53EF\u9009\uFF1Aaxis\uFF0Cnone</span>
        <span class="token literal-property property">trigger</span><span class="token operator">:</span> <span class="token string">&#39;item&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// \u63D0\u793A\u6846\u5185\u5BB9\uFF0C\u4FE1\u606F\u6BD4\u8F83\u591A\uFF0C\u53C2\u8003\u6587\u6863\uFF1Ahttps://echarts.apache.org/zh/option.html#tooltip.formatter</span>
        <span class="token comment">// \u6211\u4EEC\u6765\u91CD\u5199\u4E00\u4E0B\u6837\u5F0F\uFF08\u5982\u679C\u60F3\u770B\u9ED8\u8BA4\u6837\u5F0F\uFF0C\u628A\u4E0B\u9762\u8FD9\u6BB5\u4EE3\u7801\u6CE8\u91CA\u5373\u53EF\uFF09</span>
        <span class="token function-variable function">formatter</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">params<span class="token punctuation">,</span> ticket<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// seriesName   \u7CFB\u5217\u540D\u79F0</span>
            <span class="token comment">// \u5C0F\u5706\u70B9        params.marker</span>
            <span class="token comment">// name         \u7C7B\u76EE\u8F74\u7684\u7C7B\u76EE\u6587\u5B57</span>
            <span class="token comment">// data/value   \u5BF9\u5E94\u7684Y\u8F74\u6570\u503C</span>
            <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">\u4EE5\u4E0B\u4E3A\u81EA\u5B9A\u4E49\u6837\u5F0F&lt;hr style=&quot;margin: 0;padding: 0;&quot;/&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>seriesName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;br /&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>marker<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u8BBE\u7F6E\u56FE\u8868\u7C7B\u578B\u548C\u56FE\u6807\u6570\u636E</span>
    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;\u5317\u4EAC&quot;</span><span class="token punctuation">,</span>	 <span class="token comment">// \u8FD9\u91CC\u9700\u8981\u7ED9\u7CFB\u5217\u8BBE\u7F6E\u4E00\u4E2A\u540D\u5B57\uFF0C\u63D0\u793A\u6846\u4F1A\u7528\u5230</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">120</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">150</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;\u4E0A\u6D77&quot;</span><span class="token punctuation">,</span> <span class="token comment">// \u8FD9\u91CC\u9700\u8981\u7ED9\u7CFB\u5217\u8BBE\u7F6E\u4E00\u4E2A\u540D\u5B57\uFF0C\u63D0\u793A\u6846\u4F1A\u7528\u5230</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">80</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">130</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre></div></details><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211128212706694.png" alt="image-20211128212706694"></p><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211128212905392.png" alt="image-20211128212905392"></p><h4 id="\u7EC4\u4EF6-\u56FE\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u7EC4\u4EF6-\u56FE\u4F8B" aria-hidden="true">#</a> \u7EC4\u4EF6 - \u56FE\u4F8B</h4><p>\u6587\u6863\uFF1Ahttps://echarts.apache.org/zh/option.html#legend</p><p>\u56FE\u4F8B\u4E00\u822C\u7528\u5728\u591A\u4E2A\u7CFB\u5217\u7684\u56FE\u8868\u4E2D\uFF0C\u7528\u6765\u663E\u793A\u6BCF\u4E2A\u7CFB\u5217\u7684\u8BF4\u660E</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><p><code>demo.html</code></p><div class="language-html ext-html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">doctype</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>en<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X-UA-Compatible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ie=edge<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- (1)\u5F15\u5165echarts --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token comment">&lt;!-- (2)\u521B\u5EFA\u56FE\u8868\u5BB9\u5668 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart<span class="token punctuation">&quot;</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">width</span><span class="token punctuation">:</span> 800px<span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span> <span class="token property">border</span><span class="token punctuation">:</span> 1px solid green<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token comment">// \u56FE\u8868\u5BB9\u5668Dom</span>
<span class="token keyword">const</span> chartDom <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u521D\u59CB\u5316echarts\u5BF9\u8C61</span>
<span class="token keyword">const</span> chart <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chartDom<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u8BBE\u7F6E\u56FE\u8868\u53C2\u6570\uFF08\u8FD9\u4F1A\u5C06\u56FE\u8868\u7ED8\u5236\u51FA\u6765\uFF09</span>
chart<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token comment">// \u8BBE\u7F6E\u6807\u9898</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;\u9500\u552E\u989D&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;\u5305\u542B\u5317\u4EAC\u548C\u4E0A\u6D77\u4E24\u4E2A\u5730\u533A&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u8BBE\u7F6Ex\u8F74</span>
    <span class="token literal-property property">xAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;\u98DF\u54C1&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;\u6570\u7801&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;\u670D\u9970&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;\u7BB1\u5305&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u8BBE\u7F6Ey\u8F74</span>
    <span class="token literal-property property">yAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u63D0\u793A\u6846</span>
    <span class="token literal-property property">tooltip</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u56FE\u4F8B</span>
    <span class="token literal-property property">legend</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>

        <span class="token comment">// \u56FE\u4F8B\u7C7B\u578B</span>
        <span class="token comment">//   * plain(\u666E\u901A\u56FE\u4F8B)</span>
        <span class="token comment">//   * scroll(\u53EF\u6EDA\u52A8\u7FFB\u9875\u7684\u56FE\u4F8B\u3002\u5F53\u56FE\u4F8B\u6570\u91CF\u8F83\u591A\u65F6\u53EF\u4EE5\u4F7F\u7528)</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;scroll&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// \u5E03\u5C40\u671D\u5411</span>
        <span class="token comment">//   * horizontal \u6C34\u5E73\u5E03\u5C40</span>
        <span class="token comment">//   * vertical   \u5782\u76F4\u5E03\u5C40</span>
        <span class="token literal-property property">orient</span><span class="token operator">:</span> <span class="token string">&#39;vertical&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// \u7CFB\u5217\u516C\u5171\u6837\u5F0F</span>
        <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
        <span class="token literal-property property">right</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>

        <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token comment">// \u4E0D\u540C\u7CFB\u5217\u8BBE\u7F6E\u4E0D\u540C\u7684\u6837\u5F0F</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;\u5317\u4EAC&quot;</span><span class="token punctuation">,</span>
                <span class="token literal-property property">icon</span><span class="token operator">:</span> <span class="token string">&#39;circle&#39;</span><span class="token punctuation">,</span>
                <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;rgb(92,123,217)&#39;</span><span class="token punctuation">,</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>

            <span class="token comment">// \u4E0D\u540C\u7CFB\u5217\u8BBE\u7F6E\u4E0D\u540C\u7684\u6837\u5F0F</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;\u4E0A\u6D77&quot;</span><span class="token punctuation">,</span>
                <span class="token literal-property property">icon</span><span class="token operator">:</span> <span class="token string">&#39;roundRect&#39;</span><span class="token punctuation">,</span>
                <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;rgb(145,204,117)&#39;</span><span class="token punctuation">,</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u8BBE\u7F6E\u56FE\u8868\u7C7B\u578B\u548C\u56FE\u6807\u6570\u636E</span>
    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;\u5317\u4EAC&quot;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">,</span> <span class="token comment">// \u67F1\u72B6\u56FE</span>
            <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">120</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">150</span><span class="token punctuation">]</span> <span class="token comment">// \u6BCF\u4E2A\u503C\u548Cx\u8F74\u5206\u522B\u5BF9\u5E94</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;\u4E0A\u6D77&quot;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">,</span> <span class="token comment">// \u67F1\u72B6\u56FE</span>
            <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">80</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">130</span><span class="token punctuation">]</span> <span class="token comment">// \u6BCF\u4E2A\u503C\u548Cx\u8F74\u5206\u522B\u5BF9\u5E94</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre></div></details><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211128215351897.png" alt="image-20211128215351897"><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211128215534945.png" alt="image-20211128215534945"></p><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211128215717266.png" alt="image-20211128215717266"></p><h4 id="\u7EC4\u4EF6-\u5DE5\u5177\u680F" tabindex="-1"><a class="header-anchor" href="#\u7EC4\u4EF6-\u5DE5\u5177\u680F" aria-hidden="true">#</a> \u7EC4\u4EF6 - \u5DE5\u5177\u680F</h4><p>\u6587\u6863\uFF1Ahttps://echarts.apache.org/zh/option.html#toolbox</p>`,58),f=n("\u5DE5\u5177\u680F\u5185\u7F6E\u6709"),x={href:"https://echarts.apache.org/zh/option.html#toolbox.feature.saveAsImage",target:"_blank",rel:"noopener noreferrer"},w=n("\u5BFC\u51FA\u56FE\u7247"),_=n("\uFF0C"),S={href:"https://echarts.apache.org/zh/option.html#toolbox.feature.dataView",target:"_blank",rel:"noopener noreferrer"},A=n("\u6570\u636E\u89C6\u56FE"),j=n("\uFF0C"),D={href:"https://echarts.apache.org/zh/option.html#toolbox.feature.magicType",target:"_blank",rel:"noopener noreferrer"},O=n("\u52A8\u6001\u7C7B\u578B\u5207\u6362"),M=n("\uFF0C"),C={href:"https://echarts.apache.org/zh/option.html#toolbox.feature.dataZoom",target:"_blank",rel:"noopener noreferrer"},E=n("\u6570\u636E\u533A\u57DF\u7F29\u653E"),$=n("\uFF0C"),z={href:"https://echarts.apache.org/zh/option.html#toolbox.feature.reset",target:"_blank",rel:"noopener noreferrer"},L=n("\u91CD\u7F6E"),B=n("\u4E94\u4E2A\u5DE5\u5177"),I=p(`<details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><p><code>demo.html</code></p><div class="language-html ext-html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">doctype</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>en<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X-UA-Compatible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ie=edge<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- (1)\u5F15\u5165echarts --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token comment">&lt;!-- (2)\u521B\u5EFA\u56FE\u8868\u5BB9\u5668 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart<span class="token punctuation">&quot;</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">width</span><span class="token punctuation">:</span> 800px<span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span> <span class="token property">border</span><span class="token punctuation">:</span> 1px solid green<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token comment">// \u56FE\u8868\u5BB9\u5668Dom</span>
<span class="token keyword">const</span> chartDom <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u521D\u59CB\u5316echarts\u5BF9\u8C61</span>
<span class="token keyword">const</span> chart <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chartDom<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u8BBE\u7F6E\u56FE\u8868\u53C2\u6570\uFF08\u8FD9\u4F1A\u5C06\u56FE\u8868\u7ED8\u5236\u51FA\u6765\uFF09</span>
chart<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token comment">// \u8BBE\u7F6E\u6807\u9898</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;\u9500\u552E\u989D&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;\u5305\u542B\u5317\u4EAC\u548C\u4E0A\u6D77\u4E24\u4E2A\u5730\u533A&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u8BBE\u7F6Ex\u8F74</span>
    <span class="token literal-property property">xAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">v<span class="token punctuation">,</span> k</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> k <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>   <span class="token comment">// \u751F\u62101-30\u53F7\u6570\u636E</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u8BBE\u7F6Ey\u8F74</span>
    <span class="token literal-property property">yAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u5DE5\u5177\u680F</span>
    <span class="token literal-property property">toolbox</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">feature</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token comment">// \u4FDD\u5B58\u4E3A\u56FE\u7247</span>
            <span class="token literal-property property">saveAsImage</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;\u4FDD\u5B58\u4E3A\u56FE\u7247&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>

            <span class="token comment">// \u533A\u57DF\u7F29\u653E\uFF0C\u8FD9\u4E2A\u6709\u4E24\u4E2A\u56FE\u6807\uFF0C\u4E00\u4E2A\u662F\u7F29\u653E\uFF0C\u4E00\u4E2A\u662F\u8FD8\u539F</span>
            <span class="token comment">// \u533A\u57DF\u7F29\u653E\u4F7F\u7528\u65B9\u6CD5\uFF1A\u70B9\u51FB\u7F29\u653E\u56FE\u6807\uFF0C\u7136\u540E\u9009\u4E2D\u56FE\u6807\u67D0\u4E00\u5757\u533A\u57DF\uFF0C\u4FBF\u80FD\u5B9E\u73B0\u653E\u5927</span>
            <span class="token comment">// \u533A\u57DF\u8FD8\u539F\u4F7F\u7528\u65B9\u6CD5\uFF1A\u76F4\u63A5\u70B9\u51FB\u56FE\u6807\u5373\u53EF</span>
            <span class="token literal-property property">dataZoom</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>

            <span class="token comment">// \u91CD\u7F6E\uFF0C\u8FD8\u539F\u914D\u7F6E\u9879</span>
            <span class="token literal-property property">restore</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>

            <span class="token comment">// \u663E\u793A\u6570\u636E\uFF0C\u800C\u4E0D\u662F\u56FE\u5F62</span>
            <span class="token literal-property property">dataView</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u8BBE\u7F6E\u56FE\u8868\u7C7B\u578B\u548C\u56FE\u6807\u6570\u636E</span>
    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;\u5317\u4EAC&quot;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;line&#39;</span><span class="token punctuation">,</span>
            <span class="token comment">// \u968F\u673A\u751F\u621010 - 300\u4E4B\u95F4\u7684\u6B63\u6574\u6570</span>
            <span class="token literal-property property">data</span><span class="token operator">:</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token number">10</span> <span class="token operator">+</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">290</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre></div></details><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211129225254096.png" alt="image-20211129225254096"></p><h4 id="\u7EC4\u4EF6-grid" tabindex="-1"><a class="header-anchor" href="#\u7EC4\u4EF6-grid" aria-hidden="true">#</a> \u7EC4\u4EF6 - Grid</h4><p>\u6587\u6863\uFF1Ahttps://echarts.apache.org/zh/option.html#grid</p><p><code>grid</code>\u7528\u6765\u8C03\u6574\u56FE\u8868\u7684\u4F4D\u7F6E</p><p><strong>\u57FA\u672C\u793A\u4F8B</strong></p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><p><code>demo.html</code></p><div class="language-html ext-html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">doctype</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>en<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X-UA-Compatible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ie=edge<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- (1)\u5F15\u5165echarts --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token comment">&lt;!-- (2)\u521B\u5EFA\u56FE\u8868\u5BB9\u5668 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart<span class="token punctuation">&quot;</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">width</span><span class="token punctuation">:</span> 800px<span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span> <span class="token property">border</span><span class="token punctuation">:</span> 1px solid green<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token comment">// \u56FE\u8868\u5BB9\u5668Dom</span>
<span class="token keyword">const</span> chartDom <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u521D\u59CB\u5316echarts\u5BF9\u8C61</span>
<span class="token keyword">const</span> chart <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chartDom<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u8BBE\u7F6E\u56FE\u8868\u53C2\u6570\uFF08\u8FD9\u4F1A\u5C06\u56FE\u8868\u7ED8\u5236\u51FA\u6765\uFF09</span>
chart<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token comment">// \u8BBE\u7F6E\u6807\u9898</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;\u9500\u552E\u989D&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;\u5305\u542B\u5317\u4EAC\u548C\u4E0A\u6D77\u4E24\u4E2A\u5730\u533A&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u8BBE\u7F6Ex\u8F74</span>
    <span class="token literal-property property">xAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;\u98DF\u54C1&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;\u6570\u7801&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;\u670D\u9970&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;\u7BB1\u5305&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u8BBE\u7F6Ey\u8F74</span>
    <span class="token literal-property property">yAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u8C03\u6574\u56FE\u8868\u4F4D\u7F6E(\u4E0D\u5305\u542B\u5176\u4ED6\u7EC4\u4EF6\uFF0C\u6BD4\u5982\u56FE\u4F8B\u7B49)</span>
    <span class="token literal-property property">grid</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u4EE5\u4E3A\u4E0B\u9ED8\u8BA4\u503C</span>
        <span class="token comment">// top: 60,</span>
        <span class="token comment">// bottom: 60,</span>
        <span class="token comment">// left: &#39;10%&#39;,</span>
        <span class="token comment">// right: &#39;10%&#39;,</span>

        <span class="token comment">// \u5982\u679C\u6211\u4EEC\u60F3\u8BA9\u56FE\u8868\u518D\u9760\u4E0B\u4E00\u70B9\u7684\u8BDD\uFF0C\u53EF\u4EE5\u8C03\u6574top\u548Cbottom\u7684\u503C</span>
        <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token number">40</span><span class="token punctuation">,</span>
        <span class="token literal-property property">bottom</span><span class="token operator">:</span> <span class="token number">40</span><span class="token punctuation">,</span>

        <span class="token comment">// \u5982\u679C\u6211\u4EEC\u60F3\u8BA9\u56FE\u8868\u518D\u5411\u5DE6\u53F3\u90FD\u9760\u4E00\u70B9\u7684\u8BDD</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;5%&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">right</span><span class="token operator">:</span> <span class="token string">&#39;5%&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u8BBE\u7F6E\u56FE\u8868\u7C7B\u578B\u548C\u56FE\u6807\u6570\u636E</span>
    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;\u5317\u4EAC&quot;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">,</span> <span class="token comment">// \u67F1\u72B6\u56FE</span>
            <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">120</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">150</span><span class="token punctuation">]</span> <span class="token comment">// \u6BCF\u4E2A\u503C\u548Cx\u8F74\u5206\u522B\u5BF9\u5E94</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre></div></details><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211129215801320.png" alt="image-20211129215801320"></p><p><strong>\u80CC\u666F\u989C\u8272\u8C03\u6574\u793A\u4F8B</strong></p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><p><code>demo.html</code></p><div class="language-html ext-html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">doctype</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>en<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X-UA-Compatible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ie=edge<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- (1)\u5F15\u5165echarts --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token comment">&lt;!-- (2)\u521B\u5EFA\u56FE\u8868\u5BB9\u5668 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart<span class="token punctuation">&quot;</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">width</span><span class="token punctuation">:</span> 800px<span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span> <span class="token property">border</span><span class="token punctuation">:</span> 1px solid green<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token comment">// \u56FE\u8868\u5BB9\u5668Dom</span>
<span class="token keyword">const</span> chartDom <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u521D\u59CB\u5316echarts\u5BF9\u8C61</span>
<span class="token keyword">const</span> chart <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chartDom<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u8BBE\u7F6E\u56FE\u8868\u53C2\u6570\uFF08\u8FD9\u4F1A\u5C06\u56FE\u8868\u7ED8\u5236\u51FA\u6765\uFF09</span>
chart<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token comment">// \u8BBE\u7F6E\u6807\u9898</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;\u9500\u552E\u989D&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;\u5305\u542B\u5317\u4EAC\u548C\u4E0A\u6D77\u4E24\u4E2A\u5730\u533A&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u8BBE\u7F6Ex\u8F74</span>
    <span class="token literal-property property">xAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;\u98DF\u54C1&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;\u6570\u7801&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;\u670D\u9970&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;\u7BB1\u5305&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u8BBE\u7F6Ey\u8F74</span>
    <span class="token literal-property property">yAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">splitLine</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
            <span class="token literal-property property">lineStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token comment">// \u4F7F\u7528\u6DF1\u6D45\u7684\u95F4\u9694\u8272</span>
                <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;rgba(0,0,0,.1)&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u8C03\u6574\u56FE\u8868\u4F4D\u7F6E(\u4E0D\u5305\u542B\u5176\u4ED6\u7EC4\u4EF6\uFF0C\u6BD4\u5982\u56FE\u4F8B\u7B49)</span>
    <span class="token literal-property property">grid</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u663E\u793A\u7F51\u683C\u7EBF</span>
        <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>

        <span class="token comment">// \u8BBE\u7F6E\u80CC\u666F\u989C\u8272</span>
        <span class="token literal-property property">backgroundColor</span><span class="token operator">:</span> <span class="token string">&#39;#ccc&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u8BBE\u7F6E\u56FE\u8868\u7C7B\u578B\u548C\u56FE\u6807\u6570\u636E</span>
    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;\u5317\u4EAC&quot;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">,</span> <span class="token comment">// \u67F1\u72B6\u56FE</span>
            <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">120</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">150</span><span class="token punctuation">]</span> <span class="token comment">// \u6BCF\u4E2A\u503C\u548Cx\u8F74\u5206\u522B\u5BF9\u5E94</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre></div></details><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211129221217335.png" alt="image-20211129221217335"></p><h4 id="\u7EC4\u4EF6-\u5750\u6807\u8F74\u6307\u793A\u5668" tabindex="-1"><a class="header-anchor" href="#\u7EC4\u4EF6-\u5750\u6807\u8F74\u6307\u793A\u5668" aria-hidden="true">#</a> \u7EC4\u4EF6 - \u5750\u6807\u8F74\u6307\u793A\u5668</h4><p>\u6587\u6863\uFF1Ahttps://echarts.apache.org/zh/option.html#axisPointer</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><p><code>demo.html</code></p><div class="language-html ext-html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">doctype</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>en<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X-UA-Compatible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ie=edge<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- (1)\u5F15\u5165echarts --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token comment">&lt;!-- (2)\u521B\u5EFA\u56FE\u8868\u5BB9\u5668 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart<span class="token punctuation">&quot;</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">width</span><span class="token punctuation">:</span> 800px<span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span> <span class="token property">border</span><span class="token punctuation">:</span> 1px solid green<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token comment">// \u56FE\u8868\u5BB9\u5668Dom</span>
<span class="token keyword">const</span> chartDom <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u521D\u59CB\u5316echarts\u5BF9\u8C61</span>
<span class="token keyword">const</span> chart <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chartDom<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u8BBE\u7F6E\u56FE\u8868\u53C2\u6570\uFF08\u8FD9\u4F1A\u5C06\u56FE\u8868\u7ED8\u5236\u51FA\u6765\uFF09</span>
chart<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token comment">// \u8BBE\u7F6E\u6807\u9898</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;\u9500\u552E\u989D&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;\u5305\u542B\u5317\u4EAC\u548C\u4E0A\u6D77\u4E24\u4E2A\u5730\u533A&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u8BBE\u7F6Ex\u8F74</span>
    <span class="token literal-property property">xAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">v<span class="token punctuation">,</span> k</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> k <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>   <span class="token comment">// \u751F\u62101-30\u53F7\u6570\u636E</span>
        <span class="token literal-property property">axisPointer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u8BBE\u7F6Ey\u8F74</span>
    <span class="token literal-property property">yAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">axisPointer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    
    <span class="token comment">// \u8BBE\u7F6E\u56FE\u8868\u7C7B\u578B\u548C\u56FE\u6807\u6570\u636E</span>
    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;\u5317\u4EAC&quot;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;line&#39;</span><span class="token punctuation">,</span> <span class="token comment">// \u67F1\u72B6\u56FE</span>
            <span class="token comment">// \u968F\u673A\u751F\u621010 - 300\u4E4B\u95F4\u7684\u6B63\u6574\u6570</span>
            <span class="token literal-property property">data</span><span class="token operator">:</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token number">10</span> <span class="token operator">+</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">290</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre></div></details><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211129222757068.png" alt="image-20211129222757068"></p><blockquote><p>X\u8F74\u548CY\u8F74\u4E2D\u7684\u865A\u7EBF\u5C31\u662F\u5750\u6807\u8F74\u6307\u793A\u5668</p></blockquote><h3 id="\u5E38\u89C1\u56FE\u5F62" tabindex="-1"><a class="header-anchor" href="#\u5E38\u89C1\u56FE\u5F62" aria-hidden="true">#</a> \u5E38\u89C1\u56FE\u5F62</h3><h4 id="\u6298\u7EBF\u56FE" tabindex="-1"><a class="header-anchor" href="#\u6298\u7EBF\u56FE" aria-hidden="true">#</a> \u6298\u7EBF\u56FE</h4><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><p><code>demo.html</code></p><div class="language-html ext-html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">doctype</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>zh-CN<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X-UA-Compatible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ie=edge<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
        <span class="token selector">*</span> <span class="token punctuation">{</span>
            <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
            <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
            <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">html, body</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box</span> <span class="token punctuation">{</span>
            <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
            <span class="token property">flex-wrap</span><span class="token punctuation">:</span> wrap<span class="token punctuation">;</span>
            <span class="token property">justify-content</span><span class="token punctuation">:</span> space-around<span class="token punctuation">;</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box .chart</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 48%<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 450px<span class="token punctuation">;</span>
            <span class="token property">margin</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
            <span class="token property">border</span><span class="token punctuation">:</span> 1px solid green<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>box<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart1<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart2<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- \u56FE\u88681 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> chart1DOM <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chart1 <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chart1DOM<span class="token punctuation">)</span><span class="token punctuation">;</span>
chart1<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;2021\u5E7411\u6708\u4EFD\u697C\u76D8\u552E\u5356\u60C5\u51B5&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;\u4E00\u4EFD\u4E2D\u89C4\u4E2D\u77E9\u7684\u6298\u7EBF\u56FE&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token number">13</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">xAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">v<span class="token punctuation">,</span> k</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> k <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>   <span class="token comment">// \u751F\u62101-30\u53F7\u6570\u636E</span>
        <span class="token literal-property property">axisTick</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">alignWithLabel</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>   <span class="token comment">// \u7AD6\u7EBF\u6307\u5411\u7C7B\u76EE\u8F74\u4E2D\u7684\u6587\u5B57</span>
            <span class="token literal-property property">interval</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>    <span class="token comment">// \u663E\u793AX\u8F74\u4E0B\u9762\u7684\u5168\u90E8\u7AD6\u7EBF</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">axisLabel</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">interval</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">// \u663E\u793A\u5168\u90E8\u7C7B\u76EE\u6587\u5B57</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">axisPointer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">yAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">min</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
        <span class="token literal-property property">max</span><span class="token operator">:</span> <span class="token number">300</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">tooltip</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token function-variable function">formatter</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">params<span class="token punctuation">,</span> ticket<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> categoryName <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">2021\u5E7411\u6708</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">\u53F7</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
            <span class="token keyword">let</span> itemList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span>series <span class="token keyword">of</span> params<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">const</span> line <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>series<span class="token punctuation">.</span>marker<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>series<span class="token punctuation">.</span>seriesName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>series<span class="token punctuation">.</span>data<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
                itemList<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>line<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>categoryName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;br /&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>itemList<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&#39;&lt;br /&gt;&#39;</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">legend</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">right</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
        <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u6210\u4EA4&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;line&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">data</span><span class="token operator">:</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token number">10</span> <span class="token operator">+</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">90</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u9884\u8D2D&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;line&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">data</span><span class="token operator">:</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token number">10</span> <span class="token operator">+</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">190</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u610F\u5411&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;line&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">data</span><span class="token operator">:</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token number">10</span> <span class="token operator">+</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">290</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- \u56FE\u88682 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> chart2DOM <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chart2 <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chart2DOM<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u81EA\u5B9A\u4E49\u6807\u8BB0\u6240\u7528\u7684\u503C</span>
<span class="token keyword">const</span> customMarkList <span class="token operator">=</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token number">50</span> <span class="token operator">+</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> customMarkLast <span class="token operator">=</span> customMarkList<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>

chart2<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;\u7EBF\u6761\u6837\u5F0F\u5B9A\u5236&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;\u63D0\u793A: \u8BF7\u70B9\u51FB\u6700\u4E0B\u65B9\u56FE\u4F8B\u6765\u6FC0\u6D3B\u7CFB\u5217&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token number">13</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">xAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;x\u8F74\u540D\u79F0&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token number">150</span> <span class="token operator">+</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">yAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;y\u8F74\u540D\u79F0&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">axisLine</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">legend</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">bottom</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span>
        <span class="token literal-property property">selected</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token string-property property">&#39;\u9ED8\u8BA4\u7EBF\u6761&#39;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
            <span class="token string-property property">&#39;\u6570\u503C\u663E\u793A&#39;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token string-property property">&#39;\u62B9\u53BB\u5C0F\u5706\u70B9&#39;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token string-property property">&#39;\u62B9\u53BB\u5C16\u89D2&#39;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token string-property property">&#39;\u6570\u503C\u6807\u8BB0&#39;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token string-property property">&#39;\u9762\u79EF\u56FE&#39;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u9ED8\u8BA4\u7EBF\u6761&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;line&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">data</span><span class="token operator">:</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token number">250</span> <span class="token operator">+</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u6570\u503C\u663E\u793A&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;line&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">data</span><span class="token operator">:</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token number">200</span> <span class="token operator">+</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token comment">// \u5B9A\u4E49\u56FE\u8868\u4E0A\u7684\u6587\u672C\u6807\u7B7E</span>
            <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>  <span class="token comment">// \u5F00\u542F\u540E\u53EF\u4EE5\u663E\u793A\u5177\u4F53\u6570\u503C, \u9ED8\u8BA4\u4E3Afalse</span>
                <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;green&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u62B9\u53BB\u5C0F\u5706\u70B9&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;line&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">data</span><span class="token operator">:</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token number">150</span> <span class="token operator">+</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token literal-property property">symbol</span><span class="token operator">:</span> <span class="token string">&#39;none&#39;</span><span class="token punctuation">,</span>     <span class="token comment">// \u53BB\u6389\u5C0F\u5706\u70B9</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u62B9\u53BB\u5C16\u89D2&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;line&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">data</span><span class="token operator">:</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token number">100</span> <span class="token operator">+</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token literal-property property">symbol</span><span class="token operator">:</span> <span class="token string">&#39;none&#39;</span><span class="token punctuation">,</span>     <span class="token comment">// \u53BB\u6389\u5C0F\u5706\u70B9</span>
            <span class="token literal-property property">smooth</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>       <span class="token comment">// \u62B9\u53BB\u5C16\u89D2\uFF0C\u53D8\u5F97\u5E73\u6ED1</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u6570\u503C\u6807\u8BB0&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;line&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">data</span><span class="token operator">:</span> customMarkList<span class="token punctuation">,</span>
            <span class="token literal-property property">markPoint</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                    <span class="token comment">// \u8FD9\u4E2A\u4F1A\u628A\u6298\u7EBF\u4E2D\u6570\u503C\u6700\u5927\u7684\u6807\u8BB0\u51FA\u6765\uFF0C\u540C\u7406\u4E5F\u53EF\u4EE5\u6807\u8BB0\u6700\u5C0F\u503C\u3001\u5E73\u5747\u503C</span>
                    <span class="token punctuation">{</span>
                        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u6700\u5927\u503C&#39;</span><span class="token punctuation">,</span>
                        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;max&#39;</span><span class="token punctuation">,</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                    <span class="token comment">// \u81EA\u5B9A\u4E49\u6807\u8BB0\uFF0C\u6BD4\u5982\u6211\u5C31\u6807\u8BB0\u7B2C\u4E00\u4E2A</span>
                    <span class="token punctuation">{</span>
                        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u81EA\u5B9A\u4E49\u6807\u8BB0&#39;</span><span class="token punctuation">,</span>
                        <span class="token literal-property property">xAxis</span><span class="token operator">:</span> customMarkLast<span class="token punctuation">,</span>                  <span class="token comment">// x\u8F74\u7D22\u5F15</span>
                        <span class="token literal-property property">yAxis</span><span class="token operator">:</span> customMarkList<span class="token punctuation">[</span>customMarkLast<span class="token punctuation">]</span><span class="token punctuation">,</span>  <span class="token comment">// y\u8F74\u7D22\u5F15</span>
                        <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;Mark&#39;</span><span class="token punctuation">,</span>           <span class="token comment">// \u6807\u8BB0\u540E\u663E\u793A\u7684\u503C\u662F\u4EC0\u4E48</span>
                        <span class="token literal-property property">symbol</span><span class="token operator">:</span> <span class="token string">&#39;pin&#39;</span><span class="token punctuation">,</span>           <span class="token comment">// \u6807\u8BB0\u6837\u5F0F\uFF0C\u9ED8\u8BA4\u4E3Apin\uFF0C\u6CA1\u6709\u66F4\u597D\u770B\u7684\u4E86..</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u9762\u79EF\u56FE&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;line&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">data</span><span class="token operator">:</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token number">0</span> <span class="token operator">+</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token literal-property property">areaStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre></div></details><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/echarts-line1.gif" alt=""></p><h4 id="\u67F1\u72B6\u56FE" tabindex="-1"><a class="header-anchor" href="#\u67F1\u72B6\u56FE" aria-hidden="true">#</a> \u67F1\u72B6\u56FE</h4><blockquote><p>\u5F88\u591A\u5C5E\u6027\u4E0E\u6298\u7EBF\u56FE\u53EF\u4EE5\u5171\u7528\uFF0C\u53EA\u5199\u51E0\u4E2A\u4E0D\u4E00\u6837\u7684</p></blockquote><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><p><code>demo.html</code></p><div class="language-html ext-html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">doctype</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>zh-CN<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X-UA-Compatible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ie=edge<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
        <span class="token selector">*</span> <span class="token punctuation">{</span>
            <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
            <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
            <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">html, body</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box</span> <span class="token punctuation">{</span>
            <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
            <span class="token property">flex-wrap</span><span class="token punctuation">:</span> wrap<span class="token punctuation">;</span>
            <span class="token property">justify-content</span><span class="token punctuation">:</span> space-around<span class="token punctuation">;</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box .chart</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 48%<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 450px<span class="token punctuation">;</span>
            <span class="token property">margin</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
            <span class="token property">border</span><span class="token punctuation">:</span> 1px solid green<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>box<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart1<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart2<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- \u56FE\u88681 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> chart1DOM <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chart1 <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chart1DOM<span class="token punctuation">)</span><span class="token punctuation">;</span>
chart1<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;\u663E\u793A\u6570\u503C\u7684\u67F1\u72B6\u56FE&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token number">13</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">xAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">v<span class="token punctuation">,</span> k</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> k <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>   <span class="token comment">// \u751F\u62101-30\u53F7\u6570\u636E</span>
        <span class="token literal-property property">axisTick</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">alignWithLabel</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>   <span class="token comment">// \u7AD6\u7EBF\u6307\u5411\u7C7B\u76EE\u8F74\u4E2D\u7684\u6587\u5B57</span>
            <span class="token literal-property property">interval</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>    <span class="token comment">// \u663E\u793AX\u8F74\u4E0B\u9762\u7684\u5168\u90E8\u7AD6\u7EBF</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">axisLabel</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">interval</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">// \u663E\u793A\u5168\u90E8\u7C7B\u76EE\u6587\u5B57</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">yAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token number">10</span> <span class="token operator">+</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">90</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>  <span class="token comment">// \u5F00\u542F\u540E\u53EF\u4EE5\u663E\u793A\u5177\u4F53\u6570\u503C, \u9ED8\u8BA4\u4E3Afalse</span>
            <span class="token literal-property property">position</span><span class="token operator">:</span> <span class="token string">&#39;top&#39;</span><span class="token punctuation">,</span> <span class="token comment">// \u5728\u9876\u90E8\u663E\u793A\u6570\u503C</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- \u56FE\u88682 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> chart2DOM <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chart2 <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chart2DOM<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u81EA\u5B9A\u4E49\u6807\u8BB0\u6240\u7528\u7684\u503C</span>
<span class="token keyword">const</span> customMarkList <span class="token operator">=</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token number">50</span> <span class="token operator">+</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> customMarkLast <span class="token operator">=</span> customMarkList<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>

chart2<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;\u5806\u53E0\u67F1\u72B6\u56FE&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token number">13</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">xAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token number">150</span> <span class="token operator">+</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">yAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">data</span><span class="token operator">:</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token number">10</span> <span class="token operator">+</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">90</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token literal-property property">stack</span><span class="token operator">:</span> <span class="token string">&#39;\u5E02\u503C&#39;</span><span class="token punctuation">,</span>     <span class="token comment">// \u6570\u636E\u5806\u53E0\uFF0C\u4E24\u4E2A\u67F1\u72B6\u56FE\u8BBE\u7F6E\u6210\u76F8\u540C\u540D\u79F0\u5373\u53EF\u5B9E\u73B0\u5806\u53E0</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">data</span><span class="token operator">:</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token number">10</span> <span class="token operator">+</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token literal-property property">stack</span><span class="token operator">:</span> <span class="token string">&#39;\u5E02\u503C&#39;</span><span class="token punctuation">,</span>     <span class="token comment">// \u6570\u636E\u5806\u53E0\uFF0C\u4E24\u4E2A\u67F1\u72B6\u56FE\u8BBE\u7F6E\u6210\u76F8\u540C\u540D\u79F0\u5373\u53EF\u5B9E\u73B0\u5806\u53E0</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre></div></details><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211203222328425.png" alt="image-20211203222328425"></p><h4 id="\u997C\u56FE" tabindex="-1"><a class="header-anchor" href="#\u997C\u56FE" aria-hidden="true">#</a> \u997C\u56FE</h4><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><p><code>demo.html</code></p><div class="language-html ext-html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">doctype</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>zh-CN<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X-UA-Compatible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ie=edge<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
        <span class="token selector">*</span> <span class="token punctuation">{</span>
            <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
            <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
            <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">html, body</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box</span> <span class="token punctuation">{</span>
            <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
            <span class="token property">flex-wrap</span><span class="token punctuation">:</span> wrap<span class="token punctuation">;</span>
            <span class="token property">justify-content</span><span class="token punctuation">:</span> space-around<span class="token punctuation">;</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box .chart</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 30%<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 450px<span class="token punctuation">;</span>
            <span class="token property">margin</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
            <span class="token property">border</span><span class="token punctuation">:</span> 1px solid green<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>box<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart1<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart2<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart3<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart4<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart5<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart6<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- \u56FE\u88681 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> chart1DOM <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chart1 <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chart1DOM<span class="token punctuation">)</span><span class="token punctuation">;</span>
chart1<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;\u9ED8\u8BA4\u997C\u56FE&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token number">13</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">tooltip</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u6587\u7AE0\u5206\u7C7B&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;pie&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Python&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Go&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Java&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Shell&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u5BB9\u5668&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- \u56FE\u88682 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> chart2DOM <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chart2 <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chart2DOM<span class="token punctuation">)</span><span class="token punctuation">;</span>
chart2<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;\u8C03\u6574\u56FE\u5F62\u4F4D\u7F6E\u548C\u5927\u5C0F(1)&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;\u8BED\u6CD5: \u5706\u5FC3\u5750\u6807center\u548C\u5185\u5916\u534A\u5F84radius&#39;</span><span class="token punctuation">,</span> <span class="token comment">// \u8FD9\u65F6\u5019\u9700\u8981\u8C03\u6574\u663E\u793A\u6587\u5B57\u6216\u8C03\u6574\u997C\u56FE\u5927\u5C0F\u6216\u4F4D\u7F6E\u7B49</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">tooltip</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u6587\u7AE0\u5206\u7C7B&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;pie&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Python&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Go&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Java&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Shell&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u5BB9\u5668&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>

        <span class="token comment">// \u8C03\u6574\u5706\u7684\u4F4D\u7F6E</span>
        <span class="token comment">// center\u6307\u7684\u662F\u5706\u5FC3\u7684x\u5750\u6807\u548Cy\u5750\u6807\uFF0C\u9ED8\u8BA4\u4E3A [&#39;50%&#39;, &#39;50%&#39;]</span>
        <span class="token comment">// \u6BD4\u5982\u5982\u679C\u60F3\u9760\u5DE6\u4E00\u70B9\uFF0C\u90A3\u4E48\u5C06x\u8F74\u5750\u6807(\u7B2C\u4E00\u4E2A\u53C2\u6570)\u8C03\u5C0F\u5373\u53EF</span>
        <span class="token literal-property property">center</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;50%&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;50%&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

        <span class="token comment">// \u8C03\u6574\u5706\u7684\u5927\u5C0F</span>
        <span class="token comment">// radius\u8BBE\u7F6E\u5706\u7684\u534A\u5F84\uFF0C\u8BED\u6CD5\u662F: [\u5185\u534A\u5F84, \u5916\u534A\u5F84]\uFF0C\u9ED8\u8BA4\u503C\u662F\uFF1A[0, &#39;75%&#39;]</span>
        <span class="token comment">// \u5916\u534A\u5F84\u6700\u5BB9\u6613\u7406\u89E3\uFF0C\u5C31\u662F\u6211\u4EEC\u5E73\u5E38\u7406\u89E3\u7684\u5706\u534A\u5F84</span>
        <span class="token comment">// \u5185\u534A\u5F84\u9ED8\u8BA4\u662F0\uFF0C\u5982\u679C\u8BBE\u7F6E\u4E86\u8FD9\u4E2A\u503C\uFF0C\u4F1A\u53D8\u6210\u7A7A\u5FC3\u5706\uFF0C\u5185\u534A\u5F84\u5C31\u662F\u7A7A\u5FC3\u7684\u534A\u5F84</span>
        <span class="token literal-property property">radius</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">&#39;60%&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- \u56FE\u88683 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> chart3DOM <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart3&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chart3 <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chart3DOM<span class="token punctuation">)</span><span class="token punctuation">;</span>
chart3<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token comment">// \u6807\u98981</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;\u8C03\u6574\u56FE\u5F62\u4F4D\u7F6E\u548C\u5927\u5C0F\u548C\u53CC\u6807\u9898(2)&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;\u6CE8\u610F: \u8BBE\u7F6E\u5185\u5706\u534A\u5F84radius&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token comment">// \u6807\u98982</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&quot;\u6807\u98982&quot;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;\u526F\u6807\u9898&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token string">&#39;48%&#39;</span><span class="token punctuation">,</span>     <span class="token comment">// \u79FB\u52A8\u4F4D\u7F6E</span>
            <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token string">&#39;48%&#39;</span><span class="token punctuation">,</span>     <span class="token comment">// \u79FB\u52A8\u4F4D\u7F6E</span>
            <span class="token literal-property property">textAlign</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
            <span class="token comment">// \u4FEE\u6539\u5B57\u4F53\u5927\u5C0F\u3001\u989C\u8272</span>
            <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">fontSize</span><span class="token operator">:</span> <span class="token number">14</span><span class="token punctuation">,</span>
                <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;#999&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token literal-property property">subtextStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">fontSize</span><span class="token operator">:</span> <span class="token number">28</span><span class="token punctuation">,</span>
                <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;#333&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">tooltip</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u6587\u7AE0\u5206\u7C7B&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;pie&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Python&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Go&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Java&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Shell&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u5BB9\u5668&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>

        <span class="token comment">// \u8C03\u6574\u4E00\u4E0B\u5706\u7684\u4F4D\u7F6E\uFF0C\u4E0D\u7136\u4F1A\u548C\u526F\u6807\u9898\u91CD\u53E0</span>
        <span class="token literal-property property">center</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;50%&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;55%&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

        <span class="token comment">// \u8C03\u6574\u4E00\u4E0B\u5927\u5C0F\uFF0C\u4E0D\u7136label\u6587\u5B57\u663E\u793A\u4E0D\u5168</span>
        <span class="token literal-property property">radius</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;50%&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;70%&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

        <span class="token comment">// \u63D0\u793A\u6846</span>
        <span class="token literal-property property">tooltip</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- \u56FE\u88684 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> chart4DOM <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart4&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chart4 <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chart4DOM<span class="token punctuation">)</span><span class="token punctuation">;</span>
chart4<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;\u5B9A\u5236\u663E\u793A\u6587\u5B57\u548C\u63D0\u793A\u6846&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;\u6CE8\u610F: \u6587\u5B57\u8FC7\u957F\u4F1A\u5F15\u8D77\u663E\u793A\u4E0D\u5B8C\u5168\u7684\u60C5\u51B5&#39;</span><span class="token punctuation">,</span> <span class="token comment">// \u8FD9\u65F6\u5019\u9700\u8981\u8C03\u6574\u663E\u793A\u6587\u5B57\u6216\u8C03\u6574\u997C\u56FE\u5927\u5C0F\u6216\u4F4D\u7F6E\u7B49</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">tooltip</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u6587\u7AE0\u5206\u7C7B&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;pie&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Python&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Go&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Java&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Shell&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u5BB9\u5668&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token comment">// label \u6807\u7B7E\u6587\u5B57</span>
        <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// \u9ED8\u8BA4\u663E\u793A\u6807\u7B7E\u6587\u5B57</span>

            <span class="token comment">// \u9ED8\u8BA4\u6587\u5B57\u5728\u5706\u5916\u8FB9\uFF0C\u5176\u4ED6\u53EF\u9009\u503C: inside/inner(\u8FD9\u4FE9\u4E00\u6A21\u4E00\u6837\uFF0C\u6CA1\u6709\u533A\u522B)\u3001center</span>
            <span class="token comment">// \u9009\u62E9inside\u6216inner\u7684\u8BDD\uFF0C\u5C31\u6CA1\u6709\u6307\u793A\u7EBF\u6761\u4E86</span>
            <span class="token literal-property property">position</span><span class="token operator">:</span> <span class="token string">&#39;outside&#39;</span><span class="token punctuation">,</span>

            <span class="token comment">// \u81EA\u5B9A\u4E49\u663E\u793A\u6587\u672C</span>
            <span class="token function-variable function">formatter</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">params</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// params.value</span>
                <span class="token comment">// params.percent \u8BE5\u6570\u636E\u6240\u5360\u7684\u767E\u5206\u6BD4, \u8FD9\u91CC\u7684\u767E\u5206\u6BD4\u662Fecharts\u5E2E\u6211\u4EEC\u8BA1\u7B97\u51FA\u6765\u7684\uFF0C</span>
                <span class="token comment">//                \u5982\u679C\u60F3\u5728\u5176\u4ED6\u5730\u65B9(\u6BD4\u5982\u56FE\u4F8B)\u83B7\u53D6\u767E\u5206\u6BD4\uFF0C\u597D\u50CF\u53EA\u80FD\u81EA\u5DF1\u8BA1\u7B97</span>
                <span class="token keyword">let</span> percent <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>params<span class="token punctuation">.</span>percent<span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> (</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>percent<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">%)</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>

        <span class="token comment">// \u8C03\u6574\u4E00\u4E0B\u5706\u7684\u4F4D\u7F6E\uFF0C\u4E0D\u7136\u4F1A\u548C\u526F\u6807\u9898\u91CD\u53E0</span>
        <span class="token literal-property property">center</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;50%&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;55%&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

        <span class="token comment">// \u8C03\u6574\u4E00\u4E0B\u5927\u5C0F\uFF0C\u4E0D\u7136label\u6587\u5B57\u663E\u793A\u4E0D\u5168</span>
        <span class="token literal-property property">radius</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">&#39;70%&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

        <span class="token comment">// \u5B9A\u5236\u63D0\u793A\u6846</span>
        <span class="token literal-property property">tooltip</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token function-variable function">formatter</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">params<span class="token punctuation">,</span> ticket<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// seriesName   \u7CFB\u5217\u540D\u79F0</span>
                <span class="token comment">// \u5C0F\u5706\u70B9        params.marker</span>
                <span class="token comment">// name         \u540D\u79F0</span>
                <span class="token comment">// data/value   \u6570\u503C</span>
                <span class="token comment">// percent      \u767E\u5206\u6BD4</span>
                <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
                    </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>seriesName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;br /&gt;
                    &lt;span&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>marker<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span&gt;
                    &lt;span style=&quot;display:inline-block; width: 50px;&quot;&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span&gt;
                    &lt;span style=&quot;display: inline-block; width: 20px;&quot;&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span&gt;
                    &lt;span&gt;(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>percent<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">%)&lt;/span&gt;
                </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- \u56FE\u88685 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> chart5DOM <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart5&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chart5 <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chart5DOM<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chart5_data <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Python&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">11</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Go&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">35</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Java&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">17</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Shell&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u5BB9\u5668&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">17</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>
chart5<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;\u5176\u4ED6\u8C03\u6574&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;\u2460\u7EBF\u6761\u2461\u6570\u636E\u5E93\u7559\u767D\u2462\u5B9A\u5236\u56FE\u4F8B(\u4E0D\u652F\u6301HTML)&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u63D0\u793A\u6846</span>
    <span class="token literal-property property">tooltip</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u56FE\u4F8B</span>
    <span class="token literal-property property">legend</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u6392\u5217\u89C4\u5219</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;scroll&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">orient</span><span class="token operator">:</span> <span class="token string">&#39;vertical&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// \u4F4D\u7F6E\u8C03\u6574</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;70%&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token string">&#39;middle&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// \u6CE8\u610F\uFF1A\u8FD9\u91CC\u4E0D\u652F\u6301HTML\u4EE3\u7801,\u53EF\u4EE5\u4F7F\u7528\\n\u6362\u884C</span>
        <span class="token function-variable function">formatter</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> item <span class="token operator">=</span> chart5_data<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> item<span class="token punctuation">.</span>name <span class="token operator">===</span> name<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> (</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>item<span class="token punctuation">.</span>percent<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">%)</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>

        <span class="token comment">// \u6587\u672C\u6837\u5F0F</span>
        <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;#8c8c8c&#39;</span><span class="token punctuation">,</span>

        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u6587\u7AE0\u5206\u7C7B&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;pie&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> chart5_data<span class="token punctuation">,</span>

        <span class="token comment">// \u5B9A\u5236\u7EBF\u6761</span>
        <span class="token literal-property property">labelLine</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">length</span><span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token comment">// \u7EBF\u6BB51\u957F\u5EA6</span>
            <span class="token literal-property property">length2</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token comment">// \u7EBF\u6BB52\u957F\u5EA6</span>
            <span class="token literal-property property">smooth</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>   <span class="token comment">// \u4F7F\u7EBF\u6BB5\u66F4\u5E73\u6ED1(\u6CA1\u6709\u5C16\u53EB)\uFF0C\u548C\u6298\u7EBF\u56FE\u4E2D\u7684smooth\u4E00\u4E2A\u610F\u601D</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>

        <span class="token comment">// \u6570\u636E\u6392\u5217\u987A\u5E8F\uFF0C\u9ED8\u8BA4\u4E3Atrue\uFF0C\u4EE3\u8868\u987A\u65F6\u9488\u6392\u5E8F</span>
        <span class="token literal-property property">clockwise</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>

        <span class="token comment">// \u5B9A\u5236\u5404\u4E2A\u6570\u636E\u5757\u4E4B\u95F4\u7684\u7559\u767D</span>
        <span class="token literal-property property">itemStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">borderWidth</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
            <span class="token literal-property property">borderColor</span><span class="token operator">:</span> <span class="token string">&#39;#fff&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>

        <span class="token comment">// \u8C03\u6574\u4E00\u4E0B\u5706\u7684\u4F4D\u7F6E</span>
        <span class="token literal-property property">center</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;35%&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;55%&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

        <span class="token comment">// \u8C03\u6574\u4E00\u4E0B\u5927\u5C0F</span>
        <span class="token literal-property property">radius</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">&#39;40%&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- \u56FE\u88686 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> chart6DOM <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart6&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chart6 <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chart6DOM<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Python&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">11</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Go&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">35</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Java&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">17</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Shell&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u5BB9\u5668&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">17</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>
chart6<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token comment">// \u6807\u98981</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;\u6700\u7EC8\u6210\u54C1&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;PS: \u56FE\u4F8B\u4E0D\u652F\u6301HTML, \u6570\u503C\u5982\u4F55\u5BF9\u9F50?&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token comment">// \u6807\u98982</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&quot;\u7D2F\u8BA1\u6587\u7AE0\u6570\u91CF&quot;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;85&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token string">&#39;39%&#39;</span><span class="token punctuation">,</span>     <span class="token comment">// \u79FB\u52A8\u4F4D\u7F6E</span>
            <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token string">&#39;48%&#39;</span><span class="token punctuation">,</span>     <span class="token comment">// \u79FB\u52A8\u4F4D\u7F6E</span>
            <span class="token literal-property property">textAlign</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
            <span class="token comment">// \u4FEE\u6539\u5B57\u4F53\u5927\u5C0F\u3001\u989C\u8272</span>
            <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">fontSize</span><span class="token operator">:</span> <span class="token number">14</span><span class="token punctuation">,</span>
                <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;#999&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token literal-property property">subtextStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">fontSize</span><span class="token operator">:</span> <span class="token number">28</span><span class="token punctuation">,</span>
                <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;#333&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>

    <span class="token comment">// \u5B9A\u5236\u63D0\u793A\u6846</span>
    <span class="token literal-property property">tooltip</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token function-variable function">formatter</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">params<span class="token punctuation">,</span> ticket<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
                    </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>seriesName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;br /&gt;
                    &lt;span&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>marker<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span&gt;
                    &lt;span style=&quot;display:inline-block; width: 50px;&quot;&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span&gt;
                    &lt;span style=&quot;display: inline-block; width: 20px;&quot;&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span&gt;
                    &lt;span&gt;(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>percent<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">%)&lt;/span&gt;
                </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u56FE\u4F8B</span>
    <span class="token literal-property property">legend</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u6392\u5217\u89C4\u5219</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;scroll&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">orient</span><span class="token operator">:</span> <span class="token string">&#39;vertical&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// \u4F4D\u7F6E\u8C03\u6574</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;77%&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token string">&#39;middle&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// \u6CE8\u610F\uFF1A\u8FD9\u91CC\u4E0D\u652F\u6301HTML\u4EE3\u7801,\u53EF\u4EE5\u4F7F\u7528\\n\u6362\u884C</span>
        <span class="token function-variable function">formatter</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> item <span class="token operator">=</span> data<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> item<span class="token punctuation">.</span>name <span class="token operator">===</span> name<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> (</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>item<span class="token punctuation">.</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>

        <span class="token comment">// \u6587\u672C\u6837\u5F0F</span>
        <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;#8c8c8c&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// label \u6807\u7B7E\u6587\u5B57</span>
    <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">position</span><span class="token operator">:</span> <span class="token string">&#39;outside&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// \u81EA\u5B9A\u4E49\u663E\u793A\u6587\u672C</span>
        <span class="token function-variable function">formatter</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">params</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> percent <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>params<span class="token punctuation">.</span>percent<span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> (</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>percent<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">%)</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u6587\u7AE0\u5206\u7C7B&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;pie&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> data<span class="token punctuation">,</span>

        <span class="token comment">// \u6570\u636E\u6392\u5217\u987A\u5E8F\uFF0C\u9ED8\u8BA4\u4E3Atrue\uFF0C\u4EE3\u8868\u987A\u65F6\u9488\u6392\u5E8F</span>
        <span class="token literal-property property">clockwise</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>

        <span class="token comment">// \u5B9A\u5236\u5404\u4E2A\u6570\u636E\u5757\u4E4B\u95F4\u7684\u7559\u767D</span>
        <span class="token literal-property property">itemStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">borderWidth</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
            <span class="token literal-property property">borderColor</span><span class="token operator">:</span> <span class="token string">&#39;#fff&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>

        <span class="token comment">// \u8C03\u6574\u4E00\u4E0B\u5706\u7684\u4F4D\u7F6E</span>
        <span class="token literal-property property">center</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;40%&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;55%&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

        <span class="token comment">// \u8C03\u6574\u4E00\u4E0B\u5927\u5C0F</span>
        <span class="token literal-property property">radius</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;42%&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;52%&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre></div></details><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211204180301819.png" alt="image-20211204180301819"></p><h4 id="\u5730\u56FE" tabindex="-1"><a class="header-anchor" href="#\u5730\u56FE" aria-hidden="true">#</a> \u5730\u56FE</h4><p>\u5730\u56FE\u4E0E\u5E38\u89C1\u7684\u6298\u7EBF\u56FE/\u67F1\u72B6\u56FE/\u997C\u56FE\u4E0D\u592A\u4E00\u6837\uFF0C\u9996\u5148\u4E86\u89E3\u4E00\u4E0B<code>GeoJSON</code></p><p><strong>GeoJSON\u6982\u5FF5</strong></p><blockquote><p>GeoJSON\u662F\u4E00\u79CD\u5BF9\u5404\u79CD\u5730\u7406\u6570\u636E\u7ED3\u6784\u8FDB\u884C\u7F16\u7801\u7684\u683C\u5F0F\uFF0C\u57FA\u4E8EJavascript\u5BF9\u8C61\u8868\u793A\u6CD5(JavaScript Object Notation, \u7B80\u79F0JSON)\u7684\u5730\u7406\u7A7A\u95F4\u4FE1\u606F\u6570\u636E\u4EA4\u6362\u683C\u5F0F\u3002GeoJSON\u5BF9\u8C61\u53EF\u4EE5\u8868\u793A\u51E0\u4F55\u3001\u7279\u5F81\u6216\u8005\u7279\u5F81\u96C6\u5408\u3002GeoJSON\u652F\u6301\u4E0B\u9762\u51E0\u4F55\u7C7B\u578B\uFF1A\u70B9\u3001\u7EBF\u3001\u9762\u3001\u591A\u70B9\u3001\u591A\u7EBF\u3001\u591A\u9762\u548C\u51E0\u4F55\u96C6\u5408\u3002GeoJSON\u91CC\u7684\u7279\u5F81\u5305\u542B\u4E00\u4E2A\u51E0\u4F55\u5BF9\u8C61\u548C\u5176\u4ED6\u5C5E\u6027\uFF0C\u7279\u5F81\u96C6\u5408\u8868\u793A\u4E00\u7CFB\u5217\u7279\u5F81\u3002 --- \u767E\u5EA6\u767E\u79D1</p></blockquote><p><strong>Echarts\u548CGeoJSON</strong></p>`,32),T=n("ECharts \u53EF\u4EE5\u4F7F\u7528 "),N={href:"http://geojson.org/",target:"_blank",rel:"noopener noreferrer"},U=n("GeoJSON"),F=n(" \u683C\u5F0F\u7684\u6570\u636E\u4F5C\u4E3A\u5730\u56FE\u7684\u8F6E\u5ED3\uFF0C\u4F60\u53EF\u4EE5\u83B7\u53D6\u7B2C\u4E09\u65B9\u7684 "),W={href:"http://geojson.org/",target:"_blank",rel:"noopener noreferrer"},J=n("GeoJSON"),P=n(" \u6570\u636E\u6CE8\u518C\u5230 ECharts \u4E2D\u3002\u4F8B\u5982\u7B2C\u4E09\u65B9\u8D44\u6E90 "),G={href:"https://github.com/echarts-maps",target:"_blank",rel:"noopener noreferrer"},X=n("maps"),H=n(" --- Echarts"),R=s("p",null,[s("strong",null,[n("\u5982\u4F55\u83B7\u53D6"),s("code",null,"\u4E2D\u56FD\u5730\u56FE"),n("\u7684GeoJSON\uFF1F")])],-1),Y=s("p",null,"echarts\u6700\u65B0\u7248\u672C\u5E76\u4E0D\u63D0\u4F9B\u4EFB\u4F55\u5730\u56FE\u6570\u636E\uFF0C\u4F46\u662F\u8001\u7248\u672C\u91CC\u63D0\u4F9B\u4E86\uFF0C\u6211\u4EEC\u53EF\u4EE5\u5148\u62FF\u8FC7\u6765\u5B66\u4E60\u4F7F\u7528",-1),V=n("JS\u7248\u672C\uFF1A"),Z={href:"https://raw.githubusercontent.com/apache/echarts/5.0.0-beta.2/map/js/china.js",target:"_blank",rel:"noopener noreferrer"},K=n("https://raw.githubusercontent.com/apache/echarts/5.0.0-beta.2/map/js/china.js"),Q=p(`<p><strong>\u4EE3\u7801\u793A\u4F8B</strong></p><blockquote><p>\u4EE3\u7801\u6709\u4E00\u4E9B\u95EE\u9898\u8FD8\u6CA1\u641E\u660E\u767D\uFF0C\u540E\u9762\u60F3\u529E\u6CD5\u89E3\u51B3</p></blockquote><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><p><code>demo.html</code></p><div class="language-html ext-html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">doctype</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>zh-CN<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X-UA-Compatible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ie=edge<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>./china.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
        <span class="token selector">*</span> <span class="token punctuation">{</span>
            <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
            <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
            <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">html, body</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
            <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
            <span class="token property">flex-wrap</span><span class="token punctuation">:</span> wrap<span class="token punctuation">;</span>
            <span class="token property">justify-content</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
            <span class="token property">padding</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box [id*=chart]</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 32%<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span>
            <span class="token property">margin-right</span><span class="token punctuation">:</span> 1%<span class="token punctuation">;</span>
            <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #333<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>box<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart1<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart2<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart3<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart4<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- \u56FE\u88681 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> chart1DOM <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chart1 <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chart1DOM<span class="token punctuation">)</span><span class="token punctuation">;</span>
chart1<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;\u9ED8\u8BA4\u7684\u5730\u56FE\u8F6E\u5ED3&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;\u6CA1\u6709\u4EFB\u4F55\u6570\u636E&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;map&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">map</span><span class="token operator">:</span> <span class="token string">&#39;china&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- \u56FE\u88682 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> chart2DOM <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chart2 <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chart2DOM<span class="token punctuation">)</span><span class="token punctuation">;</span>
chart2<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;\u586B\u5145\u6570\u636E&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u5F00\u542F\u63D0\u793A\u6846</span>
    <span class="token literal-property property">tooltip</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;xxx&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;map&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">map</span><span class="token operator">:</span> <span class="token string">&#39;china&#39;</span><span class="token punctuation">,</span>

            <span class="token comment">// \u9009\u4E2D\u6A21\u5F0F(data\u4E2D\u7684selected)\uFF0C\u9ED8\u8BA4\u4E3A\u5355\u9009(single)</span>
            <span class="token literal-property property">selectedMode</span><span class="token operator">:</span> <span class="token string">&#39;multiple&#39;</span><span class="token punctuation">,</span>

            <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u6CB3\u5317&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token literal-property property">selected</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u6E56\u5317&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">selected</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u9ED1\u9F99\u6C5F&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token literal-property property">selected</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- \u56FE\u88683 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> chart3DOM <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart3&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chart3 <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chart3DOM<span class="token punctuation">)</span><span class="token punctuation">;</span>
chart3<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;\u989C\u8272\u4E3B\u9898&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;\u8FD8\u6CA1\u627E\u5230\u5408\u9002\u7684\u914D\u8272&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u5F00\u542F\u63D0\u793A\u6846</span>
    <span class="token literal-property property">tooltip</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u5C0F\u4E8E2s&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;map&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">map</span><span class="token operator">:</span> <span class="token string">&#39;china&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// \u7F29\u653E\u6BD4\u4F8B, \u9ED8\u8BA4\u4E3A1</span>
        <span class="token literal-property property">zoom</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>

        <span class="token comment">// \u5728\u5730\u56FE\u533A\u57DF\u663E\u793A\u56FE\u4F8B\u7684\u989C\u8272</span>
        <span class="token literal-property property">showLegendSymbol</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>

        <span class="token comment">// \u9009\u4E2D\u6A21\u5F0F(data\u4E2D\u7684selected)\uFF0C\u9ED8\u8BA4\u4E3A\u5355\u9009(single)</span>
        <span class="token literal-property property">selectedMode</span><span class="token operator">:</span> <span class="token string">&#39;multiple&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u6CB3\u5357&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token literal-property property">selected</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u5185\u8499\u53E4&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">selected</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u9752\u6D77&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token literal-property property">selected</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>

        <span class="token comment">// \u9ED8\u8BA4\u60C5\u51B5\u4E0B\u7684\u5730\u56FE\u533A\u57DF\u6837\u5F0F</span>
        <span class="token literal-property property">itemStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">areaColor</span><span class="token operator">:</span> <span class="token string">&quot;#EEEEEE&quot;</span><span class="token punctuation">,</span>   <span class="token comment">// \u9ED8\u8BA4\u7684\u80CC\u666F\u989C\u8272</span>
            <span class="token literal-property property">borderColor</span><span class="token operator">:</span> <span class="token string">&#39;#FFFFFF&#39;</span><span class="token punctuation">,</span>     <span class="token comment">// \u9ED8\u8BA4\u7684\u63CF\u8FB9\u989C\u8272</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>

        <span class="token comment">// \u9AD8\u4EAE\u65F6(\u9F20\u6807\u653E\u4E0A\u53BB\u540E)\u7684\u5730\u56FE\u533A\u57DF\u6837\u5F0F</span>
        <span class="token literal-property property">emphasis</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">itemStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">areaColor</span><span class="token operator">:</span> <span class="token string">&#39;skyblue&#39;</span><span class="token punctuation">,</span>  <span class="token comment">// \u80CC\u666F\u989C\u8272</span>
                <span class="token literal-property property">borderColor</span><span class="token operator">:</span> <span class="token string">&#39;skyblue&#39;</span><span class="token punctuation">,</span>           <span class="token comment">// \u63CF\u8FB9\u989C\u8272</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>

        <span class="token comment">// \u9009\u4E2D\u65F6\u7684\u5730\u56FE\u533A\u57DF\u6837\u5F0F</span>
        <span class="token literal-property property">select</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">itemStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">areaColor</span><span class="token operator">:</span> <span class="token string">&#39;rgb(145,204,117)&#39;</span><span class="token punctuation">,</span>          <span class="token comment">// \u80CC\u666F\u989C\u8272</span>
                <span class="token literal-property property">borderColor</span><span class="token operator">:</span> <span class="token string">&#39;rgb(145,204,117)&#39;</span><span class="token punctuation">,</span>        <span class="token comment">// \u63CF\u8FB9\u989C\u8272</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- \u56FE\u88684 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> chart4DOM <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart4&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chart4 <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chart4DOM<span class="token punctuation">)</span><span class="token punctuation">;</span>
chart4<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;\u56FE\u4F8B\u914D\u7F6E&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u5F00\u542F\u63D0\u793A\u6846</span>
    <span class="token literal-property property">tooltip</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    
    <span class="token comment">// \u5F00\u542F\u56FE\u4F8B</span>
    <span class="token literal-property property">legend</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// type: &#39;scroll&#39;,</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;plain&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">orient</span><span class="token operator">:</span> <span class="token string">&#39;vertical&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
        <span class="token literal-property property">bottom</span><span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">,</span>
        <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token comment">// \u5BF9\u5730\u56FE\u4E0D\u751F\u6548?</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u6CB3\u5317&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u6CB3\u5357&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u5E7F\u4E1C&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u5E7F\u897F&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u65B0\u7586&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u897F\u85CF&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token comment">// \u591A\u4E2A\u5730\u56FE\u7C7B\u578B\u76F8\u540C\u7684\u7CFB\u5217\u4F1A\u5728\u540C\u4E00\u5730\u56FE\u4E0A\u663E\u793A\uFF0C\u8FD9\u65F6\u5019\u4F7F\u7528\u7B2C\u4E00\u4E2A\u7CFB\u5217\u7684\u914D\u7F6E\u9879\u4F5C\u4E3A\u5730\u56FE\u7ED8\u5236\u7684\u914D\u7F6E</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u5C0F\u4E8E1s&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;map&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">map</span><span class="token operator">:</span> <span class="token string">&#39;china&#39;</span><span class="token punctuation">,</span>
            <span class="token comment">// \u9009\u4E2D\u6A21\u5F0F(data\u4E2D\u7684selected)\uFF0C\u9ED8\u8BA4\u4E3A\u5355\u9009(single)</span>
            <span class="token literal-property property">selectedMode</span><span class="token operator">:</span> <span class="token string">&#39;multiple&#39;</span><span class="token punctuation">,</span>
            <span class="token comment">// \u5728\u5730\u56FE\u533A\u57DF\u663E\u793A\u56FE\u4F8B\u7684\u989C\u8272</span>
            <span class="token literal-property property">showLegendSymbol</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>

            <span class="token comment">// \u5C5E\u6027\u597D\u50CF\u6CA1\u6548\u679C</span>
            <span class="token comment">// colorBy: &#39;data&#39;,</span>

            <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span>
                    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u6CB3\u5317&#39;</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">selected</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">select</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token literal-property property">itemStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                            <span class="token literal-property property">areaColor</span><span class="token operator">:</span> <span class="token string">&#39;red&#39;</span><span class="token punctuation">,</span>
                        <span class="token punctuation">}</span><span class="token punctuation">,</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span>
                    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u6CB3\u5357&#39;</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">selected</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">select</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token literal-property property">itemStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                            <span class="token literal-property property">areaColor</span><span class="token operator">:</span> <span class="token string">&#39;green&#39;</span><span class="token punctuation">,</span>
                        <span class="token punctuation">}</span><span class="token punctuation">,</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span>
                    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u5E7F\u4E1C&#39;</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">selected</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">select</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token literal-property property">itemStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                            <span class="token literal-property property">areaColor</span><span class="token operator">:</span> <span class="token string">&#39;blue&#39;</span><span class="token punctuation">,</span>
                        <span class="token punctuation">}</span><span class="token punctuation">,</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span>
                    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u5E7F\u897F&#39;</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">selected</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">select</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token literal-property property">itemStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                            <span class="token literal-property property">areaColor</span><span class="token operator">:</span> <span class="token string">&#39;white&#39;</span><span class="token punctuation">,</span>
                        <span class="token punctuation">}</span><span class="token punctuation">,</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span>
                    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u65B0\u7586&#39;</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">selected</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">select</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token literal-property property">itemStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                            <span class="token literal-property property">areaColor</span><span class="token operator">:</span> <span class="token string">&#39;rgb(145,204,117)&#39;</span><span class="token punctuation">,</span>
                        <span class="token punctuation">}</span><span class="token punctuation">,</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span>
                    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u897F\u85CF&#39;</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">selected</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                    <span class="token literal-property property">select</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token literal-property property">itemStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                            <span class="token literal-property property">areaColor</span><span class="token operator">:</span> <span class="token string">&#39;orange&#39;</span><span class="token punctuation">,</span>
                        <span class="token punctuation">}</span><span class="token punctuation">,</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>

        <span class="token comment">// {</span>
        <span class="token comment">//     name: &#39;\u5C0F\u4E8E2s&#39;,</span>
        <span class="token comment">//     type: &#39;map&#39;,</span>
        <span class="token comment">//     map: &#39;china&#39;,</span>
        <span class="token comment">//     // \u9009\u4E2D\u6A21\u5F0F(data\u4E2D\u7684selected)\uFF0C\u9ED8\u8BA4\u4E3A\u5355\u9009(single)</span>
        <span class="token comment">//     selectedMode: &#39;multiple&#39;,</span>
        <span class="token comment">//     // \u5728\u5730\u56FE\u533A\u57DF\u663E\u793A\u56FE\u4F8B\u7684\u989C\u8272</span>
        <span class="token comment">//     showLegendSymbol: false,</span>
        <span class="token comment">//     data: [</span>
        <span class="token comment">//         {name: &#39;\u5E7F\u4E1C&#39;, value: 2, selected: true},</span>
        <span class="token comment">//         {name: &#39;\u5E7F\u897F&#39;, value: 2, selected: true},</span>
        <span class="token comment">//     ],</span>
        <span class="token comment">// },</span>
        <span class="token comment">// {</span>
        <span class="token comment">//     name: &#39;\u5C0F\u4E8E3s&#39;,</span>
        <span class="token comment">//     type: &#39;map&#39;,</span>
        <span class="token comment">//     map: &#39;china&#39;,</span>
        <span class="token comment">//     // \u9009\u4E2D\u6A21\u5F0F(data\u4E2D\u7684selected)\uFF0C\u9ED8\u8BA4\u4E3A\u5355\u9009(single)</span>
        <span class="token comment">//     selectedMode: &#39;multiple&#39;,</span>
        <span class="token comment">//     // \u5728\u5730\u56FE\u533A\u57DF\u663E\u793A\u56FE\u4F8B\u7684\u989C\u8272</span>
        <span class="token comment">//     showLegendSymbol: false,</span>
        <span class="token comment">//     data: [</span>
        <span class="token comment">//         {name: &#39;\u65B0\u7586&#39;, value: 3, selected: true},</span>
        <span class="token comment">//         {name: &#39;\u897F\u85CF&#39;, value: 3, selected: true},</span>
        <span class="token comment">//     ],</span>
        <span class="token comment">// },</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre></div></details><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211211013327301.png" alt="image-20211211013327301"></p><h3 id="\u989C\u8272\u4E3B\u9898\u548C\u56FE\u5F62\u6E32\u67D3" tabindex="-1"><a class="header-anchor" href="#\u989C\u8272\u4E3B\u9898\u548C\u56FE\u5F62\u6E32\u67D3" aria-hidden="true">#</a> \u989C\u8272\u4E3B\u9898\u548C\u56FE\u5F62\u6E32\u67D3</h3><h4 id="\u5207\u6362\u5185\u7F6E\u4E3B\u9898" tabindex="-1"><a class="header-anchor" href="#\u5207\u6362\u5185\u7F6E\u4E3B\u9898" aria-hidden="true">#</a> \u5207\u6362\u5185\u7F6E\u4E3B\u9898</h4>`,6),nn=n("\u6587\u6863\uFF1A"),sn={href:"https://echarts.apache.org/handbook/zh/concepts/style/#%E9%A2%9C%E8%89%B2%E4%B8%BB%E9%A2%98%EF%BC%88theme%EF%BC%89",target:"_blank",rel:"noopener noreferrer"},an=n("https://echarts.apache.org/handbook/zh/concepts/style/#\u989C\u8272\u4E3B\u9898\uFF08theme\uFF09"),tn=p(`<p>\u5185\u7F6E\u7684\u4E3B\u9898\uFF1A</p><ul><li>\u9ED8\u8BA4\u4E3B\u9898</li><li>\u660E\u4EAE\u6A21\u5F0F <code>light</code></li><li>\u6697\u9ED1\u6A21\u5F0F <code>dark</code></li></ul><blockquote><p>\u5728\u6587\u6863\u4E2D\u53EA\u63D0\u5230\u4E86<code>dark</code>\u4E3B\u9898\uFF0C\u5728\u522B\u7684\u8D44\u6599\u4E2D\u770B\u5230\u4E86<code>litght</code>\u4E3B\u9898\uFF0C\u5B9E\u9A8C\u4E86\u4E5F\u786E\u5B9E\u6709\u6548\u679C\uFF0C</p><p>\u9ED8\u8BA4\u4E3B\u9898\u53EF\u4EE5\u5199\u4EFB\u4F55\u5B57\u7B26\u4E32\uFF0C\u53EA\u8981\u4E0D\u4E0E\u5DF2\u7ECF\u5B58\u5728\u7684\u4E3B\u9898\u51B2\u7A81\uFF0C\u5C31\u4F1A\u81EA\u52A8\u5E94\u7528\u9ED8\u8BA4\u4E3B\u9898\uFF0C\u6BD4\u5982<code>default</code></p></blockquote><p>\u5982\u679C\u8981\u4FEE\u6539\u4E3B\u9898\uFF0C\u53EA\u9700\u8981\u5728\u521D\u59CB\u5316\u65F6\u8BBE\u7F6E\u7B2C\u4E8C\u4E2A\u53C2\u6570\u5373\u53EF\uFF0C\u6BD4\u5982</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">const</span> chart <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chartDom2<span class="token punctuation">,</span> <span class="token string">&quot;dark&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><p><code>demo.html</code></p><div class="language-html ext-html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">doctype</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>zh-CN<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X-UA-Compatible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ie=edge<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
        <span class="token selector">*</span> <span class="token punctuation">{</span>
            <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
            <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
            <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">html, body</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box</span> <span class="token punctuation">{</span>
            <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
            <span class="token property">flex-wrap</span><span class="token punctuation">:</span> wrap<span class="token punctuation">;</span>
            <span class="token property">justify-content</span><span class="token punctuation">:</span> space-around<span class="token punctuation">;</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box .chart</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 30%<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 450px<span class="token punctuation">;</span>
            <span class="token property">margin</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
            <span class="token property">border</span><span class="token punctuation">:</span> 1px solid green<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>box<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart1<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart2<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart3<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- \u56FE\u88681 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> chart1DOM <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chart1 <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chart1DOM<span class="token punctuation">,</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chart1_data <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Python&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">11</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Go&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">35</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Java&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">17</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Shell&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u5BB9\u5668&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">17</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>
chart1<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token comment">// \u6807\u98981</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;\u9ED8\u8BA4\u4E3B\u9898&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;echarts\u5185\u7F6E\u4E3B\u9898&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token comment">// \u6807\u98982</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&quot;\u7D2F\u8BA1\u6587\u7AE0\u6570\u91CF&quot;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;85&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token string">&#39;39%&#39;</span><span class="token punctuation">,</span>     <span class="token comment">// \u79FB\u52A8\u4F4D\u7F6E</span>
            <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token string">&#39;48%&#39;</span><span class="token punctuation">,</span>     <span class="token comment">// \u79FB\u52A8\u4F4D\u7F6E</span>
            <span class="token literal-property property">textAlign</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
            <span class="token comment">// \u4FEE\u6539\u5B57\u4F53\u5927\u5C0F\u3001\u989C\u8272</span>
            <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">fontSize</span><span class="token operator">:</span> <span class="token number">14</span><span class="token punctuation">,</span>
                <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;#999&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token literal-property property">subtextStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">fontSize</span><span class="token operator">:</span> <span class="token number">28</span><span class="token punctuation">,</span>
                <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;#333&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>

    <span class="token comment">// \u5B9A\u5236\u63D0\u793A\u6846</span>
    <span class="token literal-property property">tooltip</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token function-variable function">formatter</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">params<span class="token punctuation">,</span> ticket<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
                    </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>seriesName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;br /&gt;
                    &lt;span&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>marker<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span&gt;
                    &lt;span style=&quot;display:inline-block; width: 50px;&quot;&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span&gt;
                    &lt;span style=&quot;display: inline-block; width: 20px;&quot;&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span&gt;
                    &lt;span&gt;(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>percent<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">%)&lt;/span&gt;
                </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u56FE\u4F8B</span>
    <span class="token literal-property property">legend</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u6392\u5217\u89C4\u5219</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;scroll&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">orient</span><span class="token operator">:</span> <span class="token string">&#39;vertical&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// \u4F4D\u7F6E\u8C03\u6574</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;77%&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token string">&#39;middle&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// \u6CE8\u610F\uFF1A\u8FD9\u91CC\u4E0D\u652F\u6301HTML\u4EE3\u7801,\u53EF\u4EE5\u4F7F\u7528\\n\u6362\u884C</span>
        <span class="token function-variable function">formatter</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> item <span class="token operator">=</span> chart1_data<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> item<span class="token punctuation">.</span>name <span class="token operator">===</span> name<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> (</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>item<span class="token punctuation">.</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>

        <span class="token comment">// \u6587\u672C\u6837\u5F0F</span>
        <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;#8c8c8c&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// label \u6807\u7B7E\u6587\u5B57</span>
    <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">position</span><span class="token operator">:</span> <span class="token string">&#39;outside&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// \u81EA\u5B9A\u4E49\u663E\u793A\u6587\u672C</span>
        <span class="token function-variable function">formatter</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">params</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> percent <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>params<span class="token punctuation">.</span>percent<span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> (</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>percent<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">%)</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u6587\u7AE0\u5206\u7C7B&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;pie&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> chart1_data<span class="token punctuation">,</span>

        <span class="token comment">// \u6570\u636E\u6392\u5217\u987A\u5E8F\uFF0C\u9ED8\u8BA4\u4E3Atrue\uFF0C\u4EE3\u8868\u987A\u65F6\u9488\u6392\u5E8F</span>
        <span class="token literal-property property">clockwise</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>

        <span class="token comment">// \u5B9A\u5236\u5404\u4E2A\u6570\u636E\u5757\u4E4B\u95F4\u7684\u7559\u767D</span>
        <span class="token literal-property property">itemStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">borderWidth</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
            <span class="token literal-property property">borderColor</span><span class="token operator">:</span> <span class="token string">&#39;#fff&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>

        <span class="token comment">// \u8C03\u6574\u4E00\u4E0B\u5706\u7684\u4F4D\u7F6E</span>
        <span class="token literal-property property">center</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;40%&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;55%&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

        <span class="token comment">// \u8C03\u6574\u4E00\u4E0B\u5927\u5C0F</span>
        <span class="token literal-property property">radius</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;42%&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;52%&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- \u56FE\u88682 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> chart2DOM <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chart2 <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chart2DOM<span class="token punctuation">,</span> <span class="token string">&#39;light&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chart2_data <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Python&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">11</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Go&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">35</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Java&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">17</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Shell&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u5BB9\u5668&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">17</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>
chart2<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token comment">// \u6807\u98981</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;light\u4E3B\u9898&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;echarts\u5185\u7F6E\u4E3B\u9898&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token comment">// \u6807\u98982</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&quot;\u7D2F\u8BA1\u6587\u7AE0\u6570\u91CF&quot;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;85&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token string">&#39;39%&#39;</span><span class="token punctuation">,</span>     <span class="token comment">// \u79FB\u52A8\u4F4D\u7F6E</span>
            <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token string">&#39;48%&#39;</span><span class="token punctuation">,</span>     <span class="token comment">// \u79FB\u52A8\u4F4D\u7F6E</span>
            <span class="token literal-property property">textAlign</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
            <span class="token comment">// \u4FEE\u6539\u5B57\u4F53\u5927\u5C0F\u3001\u989C\u8272</span>
            <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">fontSize</span><span class="token operator">:</span> <span class="token number">14</span><span class="token punctuation">,</span>
                <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;#999&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token literal-property property">subtextStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">fontSize</span><span class="token operator">:</span> <span class="token number">28</span><span class="token punctuation">,</span>
                <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;#333&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>

    <span class="token comment">// \u5B9A\u5236\u63D0\u793A\u6846</span>
    <span class="token literal-property property">tooltip</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token function-variable function">formatter</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">params<span class="token punctuation">,</span> ticket<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
                    </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>seriesName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;br /&gt;
                    &lt;span&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>marker<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span&gt;
                    &lt;span style=&quot;display:inline-block; width: 50px;&quot;&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span&gt;
                    &lt;span style=&quot;display: inline-block; width: 20px;&quot;&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span&gt;
                    &lt;span&gt;(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>percent<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">%)&lt;/span&gt;
                </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u56FE\u4F8B</span>
    <span class="token literal-property property">legend</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u6392\u5217\u89C4\u5219</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;scroll&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">orient</span><span class="token operator">:</span> <span class="token string">&#39;vertical&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// \u4F4D\u7F6E\u8C03\u6574</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;77%&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token string">&#39;middle&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// \u6CE8\u610F\uFF1A\u8FD9\u91CC\u4E0D\u652F\u6301HTML\u4EE3\u7801,\u53EF\u4EE5\u4F7F\u7528\\n\u6362\u884C</span>
        <span class="token function-variable function">formatter</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> item <span class="token operator">=</span> chart2_data<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> item<span class="token punctuation">.</span>name <span class="token operator">===</span> name<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> (</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>item<span class="token punctuation">.</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>

        <span class="token comment">// \u6587\u672C\u6837\u5F0F</span>
        <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;#8c8c8c&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// label \u6807\u7B7E\u6587\u5B57</span>
    <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">position</span><span class="token operator">:</span> <span class="token string">&#39;outside&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// \u81EA\u5B9A\u4E49\u663E\u793A\u6587\u672C</span>
        <span class="token function-variable function">formatter</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">params</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> percent <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>params<span class="token punctuation">.</span>percent<span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> (</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>percent<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">%)</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u6587\u7AE0\u5206\u7C7B&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;pie&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> chart2_data<span class="token punctuation">,</span>

        <span class="token comment">// \u6570\u636E\u6392\u5217\u987A\u5E8F\uFF0C\u9ED8\u8BA4\u4E3Atrue\uFF0C\u4EE3\u8868\u987A\u65F6\u9488\u6392\u5E8F</span>
        <span class="token literal-property property">clockwise</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>

        <span class="token comment">// \u5B9A\u5236\u5404\u4E2A\u6570\u636E\u5757\u4E4B\u95F4\u7684\u7559\u767D</span>
        <span class="token literal-property property">itemStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">borderWidth</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
            <span class="token literal-property property">borderColor</span><span class="token operator">:</span> <span class="token string">&#39;#fff&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>

        <span class="token comment">// \u8C03\u6574\u4E00\u4E0B\u5706\u7684\u4F4D\u7F6E</span>
        <span class="token literal-property property">center</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;40%&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;55%&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

        <span class="token comment">// \u8C03\u6574\u4E00\u4E0B\u5927\u5C0F</span>
        <span class="token literal-property property">radius</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;42%&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;52%&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- \u56FE\u88683 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> chart3DOM <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart3&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chart3 <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chart3DOM<span class="token punctuation">,</span> <span class="token string">&#39;dark&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chart3_data <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Python&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">11</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Go&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">35</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Java&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">17</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Shell&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u5BB9\u5668&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">17</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>
chart3<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token comment">// \u6807\u98981</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;dark\u4E3B\u9898&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;echarts\u5185\u7F6E\u4E3B\u9898&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token comment">// \u6807\u98982</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&quot;\u7D2F\u8BA1\u6587\u7AE0\u6570\u91CF&quot;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;85&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token string">&#39;39%&#39;</span><span class="token punctuation">,</span>     <span class="token comment">// \u79FB\u52A8\u4F4D\u7F6E</span>
            <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token string">&#39;48%&#39;</span><span class="token punctuation">,</span>     <span class="token comment">// \u79FB\u52A8\u4F4D\u7F6E</span>
            <span class="token literal-property property">textAlign</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
            <span class="token comment">// \u4FEE\u6539\u5B57\u4F53\u5927\u5C0F\u3001\u989C\u8272</span>
            <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">fontSize</span><span class="token operator">:</span> <span class="token number">14</span><span class="token punctuation">,</span>
                <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;#999&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token literal-property property">subtextStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">fontSize</span><span class="token operator">:</span> <span class="token number">28</span><span class="token punctuation">,</span>
                <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;#333&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>

    <span class="token comment">// \u5B9A\u5236\u63D0\u793A\u6846</span>
    <span class="token literal-property property">tooltip</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token function-variable function">formatter</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">params<span class="token punctuation">,</span> ticket<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
                    </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>seriesName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;br /&gt;
                    &lt;span&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>marker<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span&gt;
                    &lt;span style=&quot;display:inline-block; width: 50px;&quot;&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span&gt;
                    &lt;span style=&quot;display: inline-block; width: 20px;&quot;&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span&gt;
                    &lt;span&gt;(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>percent<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">%)&lt;/span&gt;
                </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u56FE\u4F8B</span>
    <span class="token literal-property property">legend</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u6392\u5217\u89C4\u5219</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;scroll&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">orient</span><span class="token operator">:</span> <span class="token string">&#39;vertical&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// \u4F4D\u7F6E\u8C03\u6574</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;77%&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token string">&#39;middle&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// \u6CE8\u610F\uFF1A\u8FD9\u91CC\u4E0D\u652F\u6301HTML\u4EE3\u7801,\u53EF\u4EE5\u4F7F\u7528\\n\u6362\u884C</span>
        <span class="token function-variable function">formatter</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> item <span class="token operator">=</span> chart3_data<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> item<span class="token punctuation">.</span>name <span class="token operator">===</span> name<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> (</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>item<span class="token punctuation">.</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>

        <span class="token comment">// \u6587\u672C\u6837\u5F0F</span>
        <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;#8c8c8c&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// label \u6807\u7B7E\u6587\u5B57</span>
    <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">position</span><span class="token operator">:</span> <span class="token string">&#39;outside&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// \u81EA\u5B9A\u4E49\u663E\u793A\u6587\u672C</span>
        <span class="token function-variable function">formatter</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">params</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> percent <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>params<span class="token punctuation">.</span>percent<span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> (</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>percent<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">%)</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u6587\u7AE0\u5206\u7C7B&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;pie&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> chart3_data<span class="token punctuation">,</span>

        <span class="token comment">// \u6570\u636E\u6392\u5217\u987A\u5E8F\uFF0C\u9ED8\u8BA4\u4E3Atrue\uFF0C\u4EE3\u8868\u987A\u65F6\u9488\u6392\u5E8F</span>
        <span class="token literal-property property">clockwise</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>

        <span class="token comment">// \u5B9A\u5236\u5404\u4E2A\u6570\u636E\u5757\u4E4B\u95F4\u7684\u7559\u767D</span>
        <span class="token literal-property property">itemStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">borderWidth</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
            <span class="token literal-property property">borderColor</span><span class="token operator">:</span> <span class="token string">&#39;#fff&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>

        <span class="token comment">// \u8C03\u6574\u4E00\u4E0B\u5706\u7684\u4F4D\u7F6E</span>
        <span class="token literal-property property">center</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;40%&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;55%&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

        <span class="token comment">// \u8C03\u6574\u4E00\u4E0B\u5927\u5C0F</span>
        <span class="token literal-property property">radius</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;42%&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;52%&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre></div></details><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211204184203145.png" alt="image-20211204184203145"></p><h4 id="\u4F7F\u7528\u81EA\u5B9A\u4E49\u4E3B\u9898" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528\u81EA\u5B9A\u4E49\u4E3B\u9898" aria-hidden="true">#</a> \u4F7F\u7528\u81EA\u5B9A\u4E49\u4E3B\u9898</h4>`,8),pn=n("\u6587\u6863\uFF1A"),on={href:"https://echarts.apache.org/zh/theme-builder.html",target:"_blank",rel:"noopener noreferrer"},en=n("https://echarts.apache.org/zh/theme-builder.html"),cn=p(`<p><strong>\u7B2C\u4E00\u6B65\uFF1A\u5148\u9009\u62E9\u4E00\u4E2A\u5408\u9002\u7684\u4E3B\u9898\uFF0C\u5E76\u62F7\u8D1D\u5230\u526A\u8D34\u677F</strong></p><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211204184625176.png" alt="image-20211204184625176"></p><p><strong>\u7B2C\u4E8C\u6B65\uFF1A\u5C06JS\u4EE3\u7801\u7C98\u8D34\u5230HTML\u6587\u4EF6\u4E2D</strong></p><p>js\u4EE3\u7801\u4E2D\u4F1A\u7ED9\u4E3B\u9898\u8D77\u4E00\u4E2A\u540D\u5B57\uFF0C\u5728\u4EE3\u7801\u4E2D\u53EF\u4EE5\u627E\u5230\uFF0C\u6BD4\u5982</p><div class="language-javascript ext-js"><pre class="language-javascript"><code>echarts<span class="token punctuation">.</span><span class="token function">registerTheme</span><span class="token punctuation">(</span><span class="token string">&#39;westeros&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
</code></pre></div><blockquote><p>\u8FD9\u91CC\u4E3A\u4E86\u65B9\u4FBF\u76F4\u63A5\u5C06\u4E3B\u9898\u4EE3\u7801\u653E\u5165head &gt; script\u6807\u7B7E\u4E2D</p></blockquote><p><strong>\u7B2C\u4E09\u6B65\uFF1A\u5C06\u4E3B\u9898\u4FEE\u6539\u4E3AJavaScript\u4EE3\u7801\u4E2D\u6CE8\u518C\u7684\u4E3B\u9898</strong></p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">const</span> chart <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chartDom<span class="token punctuation">,</span> <span class="token string">&#39;westeros&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><p><code>demo.html</code></p><div class="language-html ext-html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">doctype</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>zh-CN<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X-UA-Compatible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ie=edge<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
        <span class="token selector">*</span> <span class="token punctuation">{</span>
            <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
            <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
            <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">html, body</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box</span> <span class="token punctuation">{</span>
            <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
            <span class="token property">flex-wrap</span><span class="token punctuation">:</span> wrap<span class="token punctuation">;</span>
            <span class="token property">justify-content</span><span class="token punctuation">:</span> space-around<span class="token punctuation">;</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box .chart</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 30%<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 450px<span class="token punctuation">;</span>
            <span class="token property">margin</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
            <span class="token property">border</span><span class="token punctuation">:</span> 1px solid green<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- echarts\u5B9A\u5236\u4E3B\u9898westeros --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
    <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">root<span class="token punctuation">,</span> factory</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> define <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span> <span class="token operator">&amp;&amp;</span> define<span class="token punctuation">.</span>amd<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// AMD. Register as an anonymous module.</span>
            <span class="token function">define</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;exports&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;echarts&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> factory<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> exports <span class="token operator">===</span> <span class="token string">&#39;object&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> exports<span class="token punctuation">.</span>nodeName <span class="token operator">!==</span> <span class="token string">&#39;string&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// CommonJS</span>
            <span class="token function">factory</span><span class="token punctuation">(</span>exports<span class="token punctuation">,</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;echarts&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">// Browser globals</span>
            <span class="token function">factory</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> root<span class="token punctuation">.</span>echarts<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">exports<span class="token punctuation">,</span> echarts</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> <span class="token function-variable function">log</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">msg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> console <span class="token operator">!==</span> <span class="token string">&#39;undefined&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                console <span class="token operator">&amp;&amp;</span> console<span class="token punctuation">.</span>error <span class="token operator">&amp;&amp;</span> console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>echarts<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;ECharts is not Loaded&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        echarts<span class="token punctuation">.</span><span class="token function">registerTheme</span><span class="token punctuation">(</span><span class="token string">&#39;westeros&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
            <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token string">&quot;#516b91&quot;</span><span class="token punctuation">,</span>
                <span class="token string">&quot;#59c4e6&quot;</span><span class="token punctuation">,</span>
                <span class="token string">&quot;#edafda&quot;</span><span class="token punctuation">,</span>
                <span class="token string">&quot;#93b7e3&quot;</span><span class="token punctuation">,</span>
                <span class="token string">&quot;#a5e7f0&quot;</span><span class="token punctuation">,</span>
                <span class="token string">&quot;#cbb0e3&quot;</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token string-property property">&quot;backgroundColor&quot;</span><span class="token operator">:</span> <span class="token string">&quot;rgba(0,0,0,0)&quot;</span><span class="token punctuation">,</span>
            <span class="token string-property property">&quot;textStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token string-property property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token string-property property">&quot;textStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#516b91&quot;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;subtextStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#93b7e3&quot;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token string-property property">&quot;line&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token string-property property">&quot;itemStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;borderWidth&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2&quot;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;lineStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;width&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2&quot;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;symbolSize&quot;</span><span class="token operator">:</span> <span class="token string">&quot;6&quot;</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;symbol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;emptyCircle&quot;</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;smooth&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token string-property property">&quot;radar&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token string-property property">&quot;itemStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;borderWidth&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2&quot;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;lineStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;width&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2&quot;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;symbolSize&quot;</span><span class="token operator">:</span> <span class="token string">&quot;6&quot;</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;symbol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;emptyCircle&quot;</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;smooth&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token string-property property">&quot;bar&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token string-property property">&quot;itemStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;barBorderWidth&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;barBorderColor&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#ccc&quot;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token string-property property">&quot;pie&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token string-property property">&quot;itemStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;borderWidth&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;borderColor&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#ccc&quot;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token string-property property">&quot;scatter&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token string-property property">&quot;itemStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;borderWidth&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;borderColor&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#ccc&quot;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token string-property property">&quot;boxplot&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token string-property property">&quot;itemStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;borderWidth&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;borderColor&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#ccc&quot;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token string-property property">&quot;parallel&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token string-property property">&quot;itemStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;borderWidth&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;borderColor&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#ccc&quot;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token string-property property">&quot;sankey&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token string-property property">&quot;itemStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;borderWidth&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;borderColor&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#ccc&quot;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token string-property property">&quot;funnel&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token string-property property">&quot;itemStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;borderWidth&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;borderColor&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#ccc&quot;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token string-property property">&quot;gauge&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token string-property property">&quot;itemStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;borderWidth&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;borderColor&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#ccc&quot;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token string-property property">&quot;candlestick&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token string-property property">&quot;itemStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#edafda&quot;</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;color0&quot;</span><span class="token operator">:</span> <span class="token string">&quot;transparent&quot;</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;borderColor&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#d680bc&quot;</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;borderColor0&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#8fd3e8&quot;</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;borderWidth&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2&quot;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token string-property property">&quot;graph&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token string-property property">&quot;itemStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;borderWidth&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;borderColor&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#ccc&quot;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;lineStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;width&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#aaa&quot;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;symbolSize&quot;</span><span class="token operator">:</span> <span class="token string">&quot;6&quot;</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;symbol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;emptyCircle&quot;</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;smooth&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                    <span class="token string">&quot;#516b91&quot;</span><span class="token punctuation">,</span>
                    <span class="token string">&quot;#59c4e6&quot;</span><span class="token punctuation">,</span>
                    <span class="token string">&quot;#edafda&quot;</span><span class="token punctuation">,</span>
                    <span class="token string">&quot;#93b7e3&quot;</span><span class="token punctuation">,</span>
                    <span class="token string">&quot;#a5e7f0&quot;</span><span class="token punctuation">,</span>
                    <span class="token string">&quot;#cbb0e3&quot;</span>
                <span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;label&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#eee&quot;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token string-property property">&quot;map&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token string-property property">&quot;itemStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;areaColor&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#f3f3f3&quot;</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;borderColor&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#516b91&quot;</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;borderWidth&quot;</span><span class="token operator">:</span> <span class="token number">0.5</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;label&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#000&quot;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;emphasis&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;itemStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token string-property property">&quot;areaColor&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#a5e7f0&quot;</span><span class="token punctuation">,</span>
                        <span class="token string-property property">&quot;borderColor&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#516b91&quot;</span><span class="token punctuation">,</span>
                        <span class="token string-property property">&quot;borderWidth&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;label&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#516b91&quot;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token string-property property">&quot;geo&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token string-property property">&quot;itemStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;areaColor&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#f3f3f3&quot;</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;borderColor&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#516b91&quot;</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;borderWidth&quot;</span><span class="token operator">:</span> <span class="token number">0.5</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;label&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#000&quot;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;emphasis&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;itemStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token string-property property">&quot;areaColor&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#a5e7f0&quot;</span><span class="token punctuation">,</span>
                        <span class="token string-property property">&quot;borderColor&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#516b91&quot;</span><span class="token punctuation">,</span>
                        <span class="token string-property property">&quot;borderWidth&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;label&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#516b91&quot;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token string-property property">&quot;categoryAxis&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token string-property property">&quot;axisLine&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;show&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;lineStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#cccccc&quot;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;axisTick&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;show&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;lineStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#333&quot;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;axisLabel&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;show&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#999999&quot;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;splitLine&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;show&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;lineStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                            <span class="token string">&quot;#eeeeee&quot;</span>
                        <span class="token punctuation">]</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;splitArea&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;show&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;areaStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                            <span class="token string">&quot;rgba(250,250,250,0.05)&quot;</span><span class="token punctuation">,</span>
                            <span class="token string">&quot;rgba(200,200,200,0.02)&quot;</span>
                        <span class="token punctuation">]</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token string-property property">&quot;valueAxis&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token string-property property">&quot;axisLine&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;show&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;lineStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#cccccc&quot;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;axisTick&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;show&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;lineStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#333&quot;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;axisLabel&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;show&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#999999&quot;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;splitLine&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;show&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;lineStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                            <span class="token string">&quot;#eeeeee&quot;</span>
                        <span class="token punctuation">]</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;splitArea&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;show&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;areaStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                            <span class="token string">&quot;rgba(250,250,250,0.05)&quot;</span><span class="token punctuation">,</span>
                            <span class="token string">&quot;rgba(200,200,200,0.02)&quot;</span>
                        <span class="token punctuation">]</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token string-property property">&quot;logAxis&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token string-property property">&quot;axisLine&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;show&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;lineStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#cccccc&quot;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;axisTick&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;show&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;lineStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#333&quot;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;axisLabel&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;show&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#999999&quot;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;splitLine&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;show&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;lineStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                            <span class="token string">&quot;#eeeeee&quot;</span>
                        <span class="token punctuation">]</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;splitArea&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;show&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;areaStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                            <span class="token string">&quot;rgba(250,250,250,0.05)&quot;</span><span class="token punctuation">,</span>
                            <span class="token string">&quot;rgba(200,200,200,0.02)&quot;</span>
                        <span class="token punctuation">]</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token string-property property">&quot;timeAxis&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token string-property property">&quot;axisLine&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;show&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;lineStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#cccccc&quot;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;axisTick&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;show&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;lineStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#333&quot;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;axisLabel&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;show&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#999999&quot;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;splitLine&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;show&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;lineStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                            <span class="token string">&quot;#eeeeee&quot;</span>
                        <span class="token punctuation">]</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;splitArea&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;show&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;areaStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                            <span class="token string">&quot;rgba(250,250,250,0.05)&quot;</span><span class="token punctuation">,</span>
                            <span class="token string">&quot;rgba(200,200,200,0.02)&quot;</span>
                        <span class="token punctuation">]</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token string-property property">&quot;toolbox&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token string-property property">&quot;iconStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;borderColor&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#999&quot;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;emphasis&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;iconStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token string-property property">&quot;borderColor&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#666&quot;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token string-property property">&quot;legend&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token string-property property">&quot;textStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#999999&quot;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token string-property property">&quot;tooltip&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token string-property property">&quot;axisPointer&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;lineStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#ccc&quot;</span><span class="token punctuation">,</span>
                        <span class="token string-property property">&quot;width&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;crossStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#ccc&quot;</span><span class="token punctuation">,</span>
                        <span class="token string-property property">&quot;width&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token string-property property">&quot;timeline&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token string-property property">&quot;lineStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#8fd3e8&quot;</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;width&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;itemStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#8fd3e8&quot;</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;borderWidth&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;controlStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#8fd3e8&quot;</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;borderColor&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#8fd3e8&quot;</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;borderWidth&quot;</span><span class="token operator">:</span> <span class="token number">0.5</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;checkpointStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#8fd3e8&quot;</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;borderColor&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#8a7ca8&quot;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;label&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#8fd3e8&quot;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;emphasis&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;itemStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#8fd3e8&quot;</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;controlStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#8fd3e8&quot;</span><span class="token punctuation">,</span>
                        <span class="token string-property property">&quot;borderColor&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#8fd3e8&quot;</span><span class="token punctuation">,</span>
                        <span class="token string-property property">&quot;borderWidth&quot;</span><span class="token operator">:</span> <span class="token number">0.5</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                    <span class="token string-property property">&quot;label&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#8fd3e8&quot;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token string-property property">&quot;visualMap&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                    <span class="token string">&quot;#516b91&quot;</span><span class="token punctuation">,</span>
                    <span class="token string">&quot;#59c4e6&quot;</span><span class="token punctuation">,</span>
                    <span class="token string">&quot;#a5e7f0&quot;</span>
                <span class="token punctuation">]</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token string-property property">&quot;dataZoom&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token string-property property">&quot;backgroundColor&quot;</span><span class="token operator">:</span> <span class="token string">&quot;rgba(0,0,0,0)&quot;</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;dataBackgroundColor&quot;</span><span class="token operator">:</span> <span class="token string">&quot;rgba(255,255,255,0.3)&quot;</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;fillerColor&quot;</span><span class="token operator">:</span> <span class="token string">&quot;rgba(167,183,204,0.4)&quot;</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;handleColor&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#a7b7cc&quot;</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;handleSize&quot;</span><span class="token operator">:</span> <span class="token string">&quot;100%&quot;</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;textStyle&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#333&quot;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token string-property property">&quot;markPoint&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token string-property property">&quot;label&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#eee&quot;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">&quot;emphasis&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token string-property property">&quot;label&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token string-property property">&quot;color&quot;</span><span class="token operator">:</span> <span class="token string">&quot;#eee&quot;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>box<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart1<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart2<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart3<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart4<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- \u56FE\u88681 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> chart1DOM <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chart1 <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chart1DOM<span class="token punctuation">,</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chart1_data <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Python&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">11</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Go&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">35</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Java&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">17</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Shell&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u5BB9\u5668&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">17</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>
chart1<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token comment">// \u6807\u98981</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;\u9ED8\u8BA4\u4E3B\u9898&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;echarts\u5185\u7F6E\u4E3B\u9898&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token comment">// \u6807\u98982</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&quot;\u7D2F\u8BA1\u6587\u7AE0\u6570\u91CF&quot;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;85&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token string">&#39;39%&#39;</span><span class="token punctuation">,</span>     <span class="token comment">// \u79FB\u52A8\u4F4D\u7F6E</span>
            <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token string">&#39;48%&#39;</span><span class="token punctuation">,</span>     <span class="token comment">// \u79FB\u52A8\u4F4D\u7F6E</span>
            <span class="token literal-property property">textAlign</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
            <span class="token comment">// \u4FEE\u6539\u5B57\u4F53\u5927\u5C0F\u3001\u989C\u8272</span>
            <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">fontSize</span><span class="token operator">:</span> <span class="token number">14</span><span class="token punctuation">,</span>
                <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;#999&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token literal-property property">subtextStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">fontSize</span><span class="token operator">:</span> <span class="token number">28</span><span class="token punctuation">,</span>
                <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;#333&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>

    <span class="token comment">// \u5B9A\u5236\u63D0\u793A\u6846</span>
    <span class="token literal-property property">tooltip</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token function-variable function">formatter</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">params<span class="token punctuation">,</span> ticket<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
                    </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>seriesName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;br /&gt;
                    &lt;span&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>marker<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span&gt;
                    &lt;span style=&quot;display:inline-block; width: 50px;&quot;&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span&gt;
                    &lt;span style=&quot;display: inline-block; width: 20px;&quot;&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span&gt;
                    &lt;span&gt;(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>percent<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">%)&lt;/span&gt;
                </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u56FE\u4F8B</span>
    <span class="token literal-property property">legend</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u6392\u5217\u89C4\u5219</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;scroll&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">orient</span><span class="token operator">:</span> <span class="token string">&#39;vertical&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// \u4F4D\u7F6E\u8C03\u6574</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;77%&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token string">&#39;middle&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// \u6CE8\u610F\uFF1A\u8FD9\u91CC\u4E0D\u652F\u6301HTML\u4EE3\u7801,\u53EF\u4EE5\u4F7F\u7528\\n\u6362\u884C</span>
        <span class="token function-variable function">formatter</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> item <span class="token operator">=</span> chart1_data<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> item<span class="token punctuation">.</span>name <span class="token operator">===</span> name<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> (</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>item<span class="token punctuation">.</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>

        <span class="token comment">// \u6587\u672C\u6837\u5F0F</span>
        <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;#8c8c8c&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// label \u6807\u7B7E\u6587\u5B57</span>
    <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">position</span><span class="token operator">:</span> <span class="token string">&#39;outside&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// \u81EA\u5B9A\u4E49\u663E\u793A\u6587\u672C</span>
        <span class="token function-variable function">formatter</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">params</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> percent <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>params<span class="token punctuation">.</span>percent<span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> (</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>percent<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">%)</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u6587\u7AE0\u5206\u7C7B&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;pie&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> chart1_data<span class="token punctuation">,</span>

        <span class="token comment">// \u6570\u636E\u6392\u5217\u987A\u5E8F\uFF0C\u9ED8\u8BA4\u4E3Atrue\uFF0C\u4EE3\u8868\u987A\u65F6\u9488\u6392\u5E8F</span>
        <span class="token literal-property property">clockwise</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>

        <span class="token comment">// \u5B9A\u5236\u5404\u4E2A\u6570\u636E\u5757\u4E4B\u95F4\u7684\u7559\u767D</span>
        <span class="token literal-property property">itemStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">borderWidth</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
            <span class="token literal-property property">borderColor</span><span class="token operator">:</span> <span class="token string">&#39;#fff&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>

        <span class="token comment">// \u8C03\u6574\u4E00\u4E0B\u5706\u7684\u4F4D\u7F6E</span>
        <span class="token literal-property property">center</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;40%&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;55%&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

        <span class="token comment">// \u8C03\u6574\u4E00\u4E0B\u5927\u5C0F</span>
        <span class="token literal-property property">radius</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;42%&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;52%&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- \u56FE\u88682 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> chart2DOM <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chart2 <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chart2DOM<span class="token punctuation">,</span> <span class="token string">&#39;light&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chart2_data <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Python&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">11</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Go&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">35</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Java&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">17</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Shell&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u5BB9\u5668&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">17</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>
chart2<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token comment">// \u6807\u98981</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;light\u4E3B\u9898&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;echarts\u5185\u7F6E\u4E3B\u9898&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token comment">// \u6807\u98982</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&quot;\u7D2F\u8BA1\u6587\u7AE0\u6570\u91CF&quot;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;85&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token string">&#39;39%&#39;</span><span class="token punctuation">,</span>     <span class="token comment">// \u79FB\u52A8\u4F4D\u7F6E</span>
            <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token string">&#39;48%&#39;</span><span class="token punctuation">,</span>     <span class="token comment">// \u79FB\u52A8\u4F4D\u7F6E</span>
            <span class="token literal-property property">textAlign</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
            <span class="token comment">// \u4FEE\u6539\u5B57\u4F53\u5927\u5C0F\u3001\u989C\u8272</span>
            <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">fontSize</span><span class="token operator">:</span> <span class="token number">14</span><span class="token punctuation">,</span>
                <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;#999&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token literal-property property">subtextStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">fontSize</span><span class="token operator">:</span> <span class="token number">28</span><span class="token punctuation">,</span>
                <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;#333&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>

    <span class="token comment">// \u5B9A\u5236\u63D0\u793A\u6846</span>
    <span class="token literal-property property">tooltip</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token function-variable function">formatter</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">params<span class="token punctuation">,</span> ticket<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
                    </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>seriesName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;br /&gt;
                    &lt;span&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>marker<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span&gt;
                    &lt;span style=&quot;display:inline-block; width: 50px;&quot;&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span&gt;
                    &lt;span style=&quot;display: inline-block; width: 20px;&quot;&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span&gt;
                    &lt;span&gt;(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>percent<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">%)&lt;/span&gt;
                </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u56FE\u4F8B</span>
    <span class="token literal-property property">legend</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u6392\u5217\u89C4\u5219</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;scroll&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">orient</span><span class="token operator">:</span> <span class="token string">&#39;vertical&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// \u4F4D\u7F6E\u8C03\u6574</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;77%&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token string">&#39;middle&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// \u6CE8\u610F\uFF1A\u8FD9\u91CC\u4E0D\u652F\u6301HTML\u4EE3\u7801,\u53EF\u4EE5\u4F7F\u7528\\n\u6362\u884C</span>
        <span class="token function-variable function">formatter</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> item <span class="token operator">=</span> chart2_data<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> item<span class="token punctuation">.</span>name <span class="token operator">===</span> name<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> (</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>item<span class="token punctuation">.</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>

        <span class="token comment">// \u6587\u672C\u6837\u5F0F</span>
        <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;#8c8c8c&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// label \u6807\u7B7E\u6587\u5B57</span>
    <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">position</span><span class="token operator">:</span> <span class="token string">&#39;outside&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// \u81EA\u5B9A\u4E49\u663E\u793A\u6587\u672C</span>
        <span class="token function-variable function">formatter</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">params</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> percent <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>params<span class="token punctuation">.</span>percent<span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> (</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>percent<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">%)</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u6587\u7AE0\u5206\u7C7B&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;pie&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> chart2_data<span class="token punctuation">,</span>

        <span class="token comment">// \u6570\u636E\u6392\u5217\u987A\u5E8F\uFF0C\u9ED8\u8BA4\u4E3Atrue\uFF0C\u4EE3\u8868\u987A\u65F6\u9488\u6392\u5E8F</span>
        <span class="token literal-property property">clockwise</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>

        <span class="token comment">// \u5B9A\u5236\u5404\u4E2A\u6570\u636E\u5757\u4E4B\u95F4\u7684\u7559\u767D</span>
        <span class="token literal-property property">itemStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">borderWidth</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
            <span class="token literal-property property">borderColor</span><span class="token operator">:</span> <span class="token string">&#39;#fff&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>

        <span class="token comment">// \u8C03\u6574\u4E00\u4E0B\u5706\u7684\u4F4D\u7F6E</span>
        <span class="token literal-property property">center</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;40%&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;55%&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

        <span class="token comment">// \u8C03\u6574\u4E00\u4E0B\u5927\u5C0F</span>
        <span class="token literal-property property">radius</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;42%&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;52%&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- \u56FE\u88683 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> chart3DOM <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart3&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chart3 <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chart3DOM<span class="token punctuation">,</span> <span class="token string">&#39;dark&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chart3_data <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Python&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">11</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Go&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">35</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Java&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">17</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Shell&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u5BB9\u5668&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">17</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>
chart3<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token comment">// \u6807\u98981</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;dark\u4E3B\u9898&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;echarts\u5185\u7F6E\u4E3B\u9898&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token comment">// \u6807\u98982</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&quot;\u7D2F\u8BA1\u6587\u7AE0\u6570\u91CF&quot;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;85&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token string">&#39;39%&#39;</span><span class="token punctuation">,</span>     <span class="token comment">// \u79FB\u52A8\u4F4D\u7F6E</span>
            <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token string">&#39;48%&#39;</span><span class="token punctuation">,</span>     <span class="token comment">// \u79FB\u52A8\u4F4D\u7F6E</span>
            <span class="token literal-property property">textAlign</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
            <span class="token comment">// \u4FEE\u6539\u5B57\u4F53\u5927\u5C0F\u3001\u989C\u8272</span>
            <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">fontSize</span><span class="token operator">:</span> <span class="token number">14</span><span class="token punctuation">,</span>
                <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;#999&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token literal-property property">subtextStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">fontSize</span><span class="token operator">:</span> <span class="token number">28</span><span class="token punctuation">,</span>
                <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;#333&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>

    <span class="token comment">// \u5B9A\u5236\u63D0\u793A\u6846</span>
    <span class="token literal-property property">tooltip</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token function-variable function">formatter</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">params<span class="token punctuation">,</span> ticket<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
                    </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>seriesName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;br /&gt;
                    &lt;span&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>marker<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span&gt;
                    &lt;span style=&quot;display:inline-block; width: 50px;&quot;&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span&gt;
                    &lt;span style=&quot;display: inline-block; width: 20px;&quot;&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span&gt;
                    &lt;span&gt;(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>percent<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">%)&lt;/span&gt;
                </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u56FE\u4F8B</span>
    <span class="token literal-property property">legend</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u6392\u5217\u89C4\u5219</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;scroll&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">orient</span><span class="token operator">:</span> <span class="token string">&#39;vertical&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// \u4F4D\u7F6E\u8C03\u6574</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;77%&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token string">&#39;middle&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// \u6CE8\u610F\uFF1A\u8FD9\u91CC\u4E0D\u652F\u6301HTML\u4EE3\u7801,\u53EF\u4EE5\u4F7F\u7528\\n\u6362\u884C</span>
        <span class="token function-variable function">formatter</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> item <span class="token operator">=</span> chart3_data<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> item<span class="token punctuation">.</span>name <span class="token operator">===</span> name<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> (</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>item<span class="token punctuation">.</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>

        <span class="token comment">// \u6587\u672C\u6837\u5F0F</span>
        <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;#8c8c8c&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// label \u6807\u7B7E\u6587\u5B57</span>
    <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">position</span><span class="token operator">:</span> <span class="token string">&#39;outside&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// \u81EA\u5B9A\u4E49\u663E\u793A\u6587\u672C</span>
        <span class="token function-variable function">formatter</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">params</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> percent <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>params<span class="token punctuation">.</span>percent<span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> (</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>percent<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">%)</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u6587\u7AE0\u5206\u7C7B&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;pie&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> chart3_data<span class="token punctuation">,</span>

        <span class="token comment">// \u6570\u636E\u6392\u5217\u987A\u5E8F\uFF0C\u9ED8\u8BA4\u4E3Atrue\uFF0C\u4EE3\u8868\u987A\u65F6\u9488\u6392\u5E8F</span>
        <span class="token literal-property property">clockwise</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>

        <span class="token comment">// \u5B9A\u5236\u5404\u4E2A\u6570\u636E\u5757\u4E4B\u95F4\u7684\u7559\u767D</span>
        <span class="token literal-property property">itemStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">borderWidth</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
            <span class="token literal-property property">borderColor</span><span class="token operator">:</span> <span class="token string">&#39;#fff&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>

        <span class="token comment">// \u8C03\u6574\u4E00\u4E0B\u5706\u7684\u4F4D\u7F6E</span>
        <span class="token literal-property property">center</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;40%&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;55%&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

        <span class="token comment">// \u8C03\u6574\u4E00\u4E0B\u5927\u5C0F</span>
        <span class="token literal-property property">radius</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;42%&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;52%&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- \u56FE\u88684 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> chart4DOM <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart4&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chart4 <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chart4DOM<span class="token punctuation">,</span> <span class="token string">&#39;westeros&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chart4_data <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Python&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">11</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Go&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">35</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Java&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">17</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Shell&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u5BB9\u5668&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token literal-property property">percent</span><span class="token operator">:</span> <span class="token number">17</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>
chart4<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token comment">// \u6807\u98981</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;westeros&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;\u975E\u5185\u7F6E\u4E3B\u9898&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token comment">// \u6807\u98982</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&quot;\u7D2F\u8BA1\u6587\u7AE0\u6570\u91CF&quot;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;85&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token string">&#39;39%&#39;</span><span class="token punctuation">,</span>     <span class="token comment">// \u79FB\u52A8\u4F4D\u7F6E</span>
            <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token string">&#39;48%&#39;</span><span class="token punctuation">,</span>     <span class="token comment">// \u79FB\u52A8\u4F4D\u7F6E</span>
            <span class="token literal-property property">textAlign</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
            <span class="token comment">// \u4FEE\u6539\u5B57\u4F53\u5927\u5C0F\u3001\u989C\u8272</span>
            <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">fontSize</span><span class="token operator">:</span> <span class="token number">14</span><span class="token punctuation">,</span>
                <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;#999&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token literal-property property">subtextStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">fontSize</span><span class="token operator">:</span> <span class="token number">28</span><span class="token punctuation">,</span>
                <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;#333&#39;</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>

    <span class="token comment">// \u5B9A\u5236\u63D0\u793A\u6846</span>
    <span class="token literal-property property">tooltip</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token function-variable function">formatter</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">params<span class="token punctuation">,</span> ticket<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
                    </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>seriesName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;br /&gt;
                    &lt;span&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>marker<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span&gt;
                    &lt;span style=&quot;display:inline-block; width: 50px;&quot;&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span&gt;
                    &lt;span style=&quot;display: inline-block; width: 20px;&quot;&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span&gt;
                    &lt;span&gt;(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>percent<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">%)&lt;/span&gt;
                </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u56FE\u4F8B</span>
    <span class="token literal-property property">legend</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u6392\u5217\u89C4\u5219</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;scroll&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">orient</span><span class="token operator">:</span> <span class="token string">&#39;vertical&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// \u4F4D\u7F6E\u8C03\u6574</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;77%&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token string">&#39;middle&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// \u6CE8\u610F\uFF1A\u8FD9\u91CC\u4E0D\u652F\u6301HTML\u4EE3\u7801,\u53EF\u4EE5\u4F7F\u7528\\n\u6362\u884C</span>
        <span class="token function-variable function">formatter</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> item <span class="token operator">=</span> chart4_data<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> item<span class="token punctuation">.</span>name <span class="token operator">===</span> name<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> (</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>item<span class="token punctuation">.</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>

        <span class="token comment">// \u6587\u672C\u6837\u5F0F</span>
        <span class="token literal-property property">textStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;#8c8c8c&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// label \u6807\u7B7E\u6587\u5B57</span>
    <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">position</span><span class="token operator">:</span> <span class="token string">&#39;outside&#39;</span><span class="token punctuation">,</span>

        <span class="token comment">// \u81EA\u5B9A\u4E49\u663E\u793A\u6587\u672C</span>
        <span class="token function-variable function">formatter</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">params</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> percent <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>params<span class="token punctuation">.</span>percent<span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>params<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> (</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>percent<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">%)</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u6587\u7AE0\u5206\u7C7B&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;pie&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> chart4_data<span class="token punctuation">,</span>

        <span class="token comment">// \u6570\u636E\u6392\u5217\u987A\u5E8F\uFF0C\u9ED8\u8BA4\u4E3Atrue\uFF0C\u4EE3\u8868\u987A\u65F6\u9488\u6392\u5E8F</span>
        <span class="token literal-property property">clockwise</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>

        <span class="token comment">// \u5B9A\u5236\u5404\u4E2A\u6570\u636E\u5757\u4E4B\u95F4\u7684\u7559\u767D</span>
        <span class="token literal-property property">itemStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">borderWidth</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
            <span class="token literal-property property">borderColor</span><span class="token operator">:</span> <span class="token string">&#39;#fff&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>

        <span class="token comment">// \u8C03\u6574\u4E00\u4E0B\u5706\u7684\u4F4D\u7F6E</span>
        <span class="token literal-property property">center</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;40%&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;55%&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

        <span class="token comment">// \u8C03\u6574\u4E00\u4E0B\u5927\u5C0F</span>
        <span class="token literal-property property">radius</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;42%&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;52%&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre></div></details><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211204185432778.png" alt="image-20211204185432778"></p><h4 id="\u5207\u6362\u6E32\u67D3\u65B9\u5F0F" tabindex="-1"><a class="header-anchor" href="#\u5207\u6362\u6E32\u67D3\u65B9\u5F0F" aria-hidden="true">#</a> \u5207\u6362\u6E32\u67D3\u65B9\u5F0F</h4>`,11),ln=n("\u6587\u6863\uFF1A"),un={href:"https://echarts.apache.org/handbook/zh/best-practices/canvas-vs-svg",target:"_blank",rel:"noopener noreferrer"},rn=n("https://echarts.apache.org/handbook/zh/best-practices/canvas-vs-svg"),kn=p(`<p>\u9ED8\u8BA4\u4F7F\u7528<code>Canvas</code>\u8FDB\u884C\u6E32\u67D3\uFF0C\u5982\u679C\u8981\u66F4\u6362\u4E3A<code>SVG</code>\u6E32\u67D3\u65B9\u5F0F\uFF0C\u53EF\u4EE5\u8FD9\u6837\u505A</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">const</span> chart4 <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chart4DOM<span class="token punctuation">,</span> <span class="token string">&#39;default&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">renderer</span><span class="token operator">:</span> <span class="token string">&#39;svg&#39;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>	<span class="token comment">// \u6CE8\u610F\u662F\u5728\u7B2C\u4E09\u4E2A\u53C2\u6570\u4E0A</span>
</code></pre></div><h3 id="\u56FE\u8868\u6570\u636E\u96C6" tabindex="-1"><a class="header-anchor" href="#\u56FE\u8868\u6570\u636E\u96C6" aria-hidden="true">#</a> \u56FE\u8868\u6570\u636E\u96C6</h3>`,3),yn=n("\u6587\u6863\uFF1A"),gn={href:"https://echarts.apache.org/handbook/zh/concepts/dataset/",target:"_blank",rel:"noopener noreferrer"},mn=n("https://echarts.apache.org/handbook/zh/concepts/dataset/"),dn=p(`<p>\u6570\u636E\u96C6\uFF08<code>dataset</code>\uFF09\u662F\u4E13\u95E8\u7528\u6765\u7BA1\u7406\u6570\u636E\u7684\u7EC4\u4EF6\uFF0C\u4ECE ECharts4\u5F00\u59CB\u652F\u6301\u3002</p><blockquote><p>\u867D\u7136\u5B98\u65B9\u63A8\u8350\u4F7F\u7528 <code>\u6570\u636E\u96C6</code> \u6765\u7BA1\u7406\u6570\u636E\uFF0C\u4F46\u662F\u4E2A\u4EBA\u89C9\u5F97\u8FD8\u4E0D\u662F\u592A\u5B8C\u5584\uFF08\u67D0\u4E9B\u573A\u666F\u4E0B\u4E0D\u652F\u6301\u6570\u636E\u96C6\uFF09\uFF0C\u4E0D\u591F\u901A\u7528\uFF0C</p><p>\u6240\u4EE5\u8FD9\u91CC\u4E5F\u5C31\u7B80\u5355\u8BB0\u5F55\u4E00\u4E0B\u7528\u6CD5</p></blockquote><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><p><code>demo.html</code></p><div class="language-html ext-html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">doctype</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>zh-CN<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X-UA-Compatible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ie=edge<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
        <span class="token selector">*</span> <span class="token punctuation">{</span>
            <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
            <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
            <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">html, body</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box</span> <span class="token punctuation">{</span>
            <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
            <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
            <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box [id*=chart]</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 600px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>box<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart1<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart2<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- \u56FE\u88681 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> chart1DOM <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chart1 <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chart1DOM<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u6CE8\u610F\u89C2\u5BDF\u6570\u636E\u7ED3\u6784\uFF0Cx\u8F74\u6570\u636E\u548Cy\u8F74\u6570\u636E\u662F\u5206\u79BB\u7684</span>
<span class="token keyword">let</span> chart1_x <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;\u7B2C\u4E00\u5B63\u5EA6&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;\u7B2C\u4E8C\u5B63\u5EA6&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;\u7B2C\u4E09\u5B63\u5EA6&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;\u7B2C\u56DB\u5B63\u5EA6&#39;</span><span class="token punctuation">]</span>
<span class="token keyword">let</span> chart1_y <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">110</span><span class="token punctuation">,</span> <span class="token number">95</span><span class="token punctuation">,</span> <span class="token number">130</span><span class="token punctuation">]</span>

chart1<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;2021\u5E74\u516D\u70B9\u534A\u516C\u53F8\u9500\u552E\u989D&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token literal-property property">xAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> chart1_x<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">yAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;line&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> chart1_y<span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- \u56FE\u88682 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> chart2DOM <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chart2 <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chart2DOM<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u4F7F\u7528dataset\u4EE3\u66FF\u4E0A\u9762\u7684\u6570\u636E\u7ED3\u6784</span>
<span class="token keyword">let</span> chart2_dataset <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">source</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">[</span><span class="token string">&quot;\u7B2C\u4E00\u5B63\u5EA6&quot;</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">[</span><span class="token string">&quot;\u7B2C\u4E8C\u5B63\u5EA6&quot;</span><span class="token punctuation">,</span> <span class="token number">110</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">[</span><span class="token string">&quot;\u7B2C\u4E09\u5B63\u5EA6&quot;</span><span class="token punctuation">,</span> <span class="token number">95</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">[</span><span class="token string">&quot;\u7B2C\u56DB\u5B63\u5EA6&quot;</span><span class="token punctuation">,</span> <span class="token number">130</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>


chart2<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;2021\u5E74\u516D\u70B9\u534A\u516C\u53F8\u9500\u552E\u989D&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// x\u8F74\u91CC\u4E0D\u5199\u5177\u4F53\u7684\u6570\u636E\u4E86(\u5373\u4E0D\u5199data\u5C5E\u6027\u4E86)</span>
    <span class="token comment">// x\u8F74\u9ED8\u8BA4type\u5C31\u662Fcategory\uFF0C\u4F46\u662F\u4E0D\u77E5\u9053\u4E3A\u4EC0\u4E48\uFF0C\u8FD9\u91CC\u5FC5\u987B\u663E\u793A\u58F0\u660Ex\u8F74\u4E3A\u7C7B\u76EE\u8F74\u624D\u80FD\u6B63\u5E38\u7ED8\u56FE\uFF0C\u53EF\u80FD\u662F\u4E2Abug?</span>
    <span class="token literal-property property">xAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;category&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// \u9ED8\u8BA4\u60C5\u51B5\u4E0B\u4E3A\u6570\u503C\u8F74\uFF0C\u4E0D\u7528\u663E\u793A\u58F0\u660E</span>
    <span class="token literal-property property">yAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// \u6307\u5B9Adataset\u6570\u636E\u6E90</span>
    <span class="token literal-property property">dataset</span><span class="token operator">:</span> chart2_dataset<span class="token punctuation">,</span>

    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;line&#39;</span><span class="token punctuation">,</span>
        <span class="token comment">// \u539F\u6765\u7684data\u4E0D\u7528\u5199\u4E86\uFF0C\u53EA\u9700\u8981\u4F7F\u7528encode\u544A\u8BC9x\u8F74\u548Cy\u8F74\u4F7F\u7528\u6570\u636E\u6E90\u4E2D\u54EA\u5217\u6570\u636E\u5C31\u597D\u4E86</span>
        <span class="token comment">// x\u8F74\u4F7F\u7528\u7B2C1\u5217\u6570\u636E(\u7D22\u5F15\u4E3A0)\uFF0Cy\u8F74\u4F7F\u7528\u7B2C2\u5217\u6570\u636E(\u7D22\u5F15\u4E3A1)</span>
        <span class="token literal-property property">encode</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token comment">// \u5982\u679C\u662F\u997C\u56FE\u7684\u8BDD\uFF0C\u5C31\u4E0D\u80FD\u518D\u7528x\u548Cy\u4E86\uFF0C\u9700\u8981\u4F7F\u7528itemName\u548Cvalue</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre></div></details><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211204221413843.png" alt="image-20211204221413843"></p><h3 id="\u56FE\u8868\u5927\u5C0F\u52A8\u6001\u8C03\u6574" tabindex="-1"><a class="header-anchor" href="#\u56FE\u8868\u5927\u5C0F\u52A8\u6001\u8C03\u6574" aria-hidden="true">#</a> \u56FE\u8868\u5927\u5C0F\u52A8\u6001\u8C03\u6574</h3>`,5),hn=n("\u6587\u6863\uFF1A"),qn={href:"https://echarts.apache.org/handbook/zh/concepts/chart-size/#%E5%93%8D%E5%BA%94%E5%AE%B9%E5%99%A8%E5%A4%A7%E5%B0%8F%E7%9A%84%E5%8F%98%E5%8C%96",target:"_blank",rel:"noopener noreferrer"},bn=n("https://echarts.apache.org/handbook/zh/concepts/chart-size/#\u54CD\u5E94\u5BB9\u5668\u5927\u5C0F\u7684\u53D8\u5316"),vn=p(`<details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><p><code>demo.html</code></p><div class="language-html ext-html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">doctype</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>zh-CN<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X-UA-Compatible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ie=edge<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
        <span class="token selector">*</span> <span class="token punctuation">{</span>
            <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
            <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
            <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">html, body</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box</span> <span class="token punctuation">{</span>
            <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
            <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
            <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box [id*=chart]</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 600px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>box<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart1<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart2<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- \u56FE\u88681 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> chart1DOM <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chart1 <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chart1DOM<span class="token punctuation">)</span><span class="token punctuation">;</span>

chart1<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;2021\u5E74\u516D\u70B9\u534A\u516C\u53F8\u9500\u552E\u989D&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;\u672A\u52A8\u6001\u8C03\u6574\u5927\u5C0F&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token literal-property property">xAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;\u7B2C\u4E00\u5B63\u5EA6&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;\u7B2C\u4E8C\u5B63\u5EA6&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;\u7B2C\u4E09\u5B63\u5EA6&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;\u7B2C\u56DB\u5B63\u5EA6&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">yAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;line&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">110</span><span class="token punctuation">,</span> <span class="token number">95</span><span class="token punctuation">,</span> <span class="token number">130</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- \u56FE\u88682 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> chart2DOM <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chart2 <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chart2DOM<span class="token punctuation">)</span><span class="token punctuation">;</span>

chart2<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;2021\u5E74\u516D\u70B9\u534A\u516C\u53F8\u9500\u552E\u989D&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;\u52A8\u6001\u8C03\u6574\u5927\u5C0F&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token literal-property property">xAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;\u7B2C\u4E00\u5B63\u5EA6&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;\u7B2C\u4E8C\u5B63\u5EA6&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;\u7B2C\u4E09\u5B63\u5EA6&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;\u7B2C\u56DB\u5B63\u5EA6&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">yAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;line&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">110</span><span class="token punctuation">,</span> <span class="token number">95</span><span class="token punctuation">,</span> <span class="token number">130</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- \u8FD9\u91CC\u52A8\u6001\u8C03\u6574\u56FE\u88682\u7684\u5927\u5C0F\uFF0C\u89C2\u5BDF\u4E24\u4E2A\u56FE\u6709\u4EC0\u4E48\u533A\u522B --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
window<span class="token punctuation">.</span><span class="token function-variable function">onresize</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    chart2<span class="token punctuation">.</span><span class="token function">resize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre></div></details><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/8gxLWjbc.gif" alt=""></p><h3 id="\u56FE\u8868\u9500\u6BC1\u548C\u91CD\u5EFA" tabindex="-1"><a class="header-anchor" href="#\u56FE\u8868\u9500\u6BC1\u548C\u91CD\u5EFA" aria-hidden="true">#</a> \u56FE\u8868\u9500\u6BC1\u548C\u91CD\u5EFA</h3>`,3),fn=n("\u6587\u6863\uFF1A"),xn={href:"https://echarts.apache.org/handbook/zh/concepts/chart-size/#%E5%AE%B9%E5%99%A8%E8%8A%82%E7%82%B9%E8%A2%AB%E9%94%80%E6%AF%81%E4%BB%A5%E5%8F%8A%E8%A2%AB%E9%87%8D%E5%BB%BA%E6%97%B6",target:"_blank",rel:"noopener noreferrer"},wn=n("https://echarts.apache.org/handbook/zh/concepts/chart-size/#\u5BB9\u5668\u8282\u70B9\u88AB\u9500\u6BC1\u4EE5\u53CA\u88AB\u91CD\u5EFA\u65F6"),_n=p(`<details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><p><code>demo.html</code></p><div class="language-html ext-html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">doctype</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>zh-CN<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X-UA-Compatible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ie=edge<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
        <span class="token selector">*</span> <span class="token punctuation">{</span>
            <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
            <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
            <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">html, body</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box</span> <span class="token punctuation">{</span>
            <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
            <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
            <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box [id*=chart]</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 600px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>box<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart1<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- \u56FE\u8868 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> chart1DOM <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">showLineChart</span><span class="token punctuation">(</span><span class="token parameter">dom</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> chart1 <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>dom<span class="token punctuation">)</span><span class="token punctuation">;</span>

    chart1<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;2021\u5E74\u516D\u70B9\u534A\u516C\u53F8\u9500\u552E\u989D&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;\u9500\u6BC1\u548C\u91CD\u5EFA: \u663E\u793A\u56FE\u8868-&gt;3\u79D2\u540E\u9500\u6BC1-&gt;2\u79D2\u540E\u91CD\u5EFA&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>

        <span class="token literal-property property">xAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;\u7B2C\u4E00\u5B63\u5EA6&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;\u7B2C\u4E8C\u5B63\u5EA6&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;\u7B2C\u4E09\u5B63\u5EA6&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;\u7B2C\u56DB\u5B63\u5EA6&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">yAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;line&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">110</span><span class="token punctuation">,</span> <span class="token number">95</span><span class="token punctuation">,</span> <span class="token number">130</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> chart1<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u663E\u793A\u56FE\u8868</span>
<span class="token keyword">let</span> chart1 <span class="token operator">=</span> <span class="token function">showLineChart</span><span class="token punctuation">(</span>chart1DOM<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 3\u79D2\u6536\u9500\u6BC1echarts\u5B9E\u4F8B</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    chart1<span class="token punctuation">.</span><span class="token function">dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">3000</span><span class="token punctuation">)</span>

<span class="token comment">// 2\u79D2\u540E\u518D\u91CD\u5EFA</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">showLineChart</span><span class="token punctuation">(</span>chart1DOM<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">5000</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre></div></details><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/8gxLWjbd.gif" alt=""></p><h3 id="\u56FE\u8868\u6570\u636E\u52A8\u6001\u66F4\u65B0" tabindex="-1"><a class="header-anchor" href="#\u56FE\u8868\u6570\u636E\u52A8\u6001\u66F4\u65B0" aria-hidden="true">#</a> \u56FE\u8868\u6570\u636E\u52A8\u6001\u66F4\u65B0</h3><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><p><code>demo.html</code></p><div class="language-html ext-html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">doctype</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>zh-CN<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span>
          <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X-UA-Compatible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ie=edge<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
        <span class="token selector">*</span> <span class="token punctuation">{</span>
            <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
            <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
            <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">html, body</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box</span> <span class="token punctuation">{</span>
            <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
            <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
            <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box [id*=chart]</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 800px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>box<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>chart1<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- \u56FE\u8868 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> chartDOM <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;chart1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> chart <span class="token operator">=</span> echarts<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>chartDOM<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> options <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&#39;\u5B9E\u65F6\u603B\u8D44\u4EA7&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">subtext</span><span class="token operator">:</span> <span class="token string">&#39;\u52A8\u6001\u6570\u636E\u66F4\u65B0&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token literal-property property">xAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">yAxis</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;\u8D44\u4EA7\u989D(\u4E07\u5143)&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">series</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;line&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token literal-property property">symbol</span><span class="token operator">:</span> <span class="token string">&#39;none&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">smooth</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">areaStyle</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u8F85\u52A9\u51FD\u6570\uFF1A\u83B7\u53D6\u524Dn\u79D2\u7684\u65F6\u95F4</span>
<span class="token keyword">function</span> <span class="token function">getLastSeconds</span><span class="token punctuation">(</span><span class="token parameter">n<span class="token punctuation">,</span> step <span class="token operator">=</span> <span class="token number">1</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> end <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> start <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span>end <span class="token operator">-</span> n <span class="token operator">*</span> <span class="token number">1000</span> <span class="token operator">+</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> ret <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> start<span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> end<span class="token punctuation">;</span> i <span class="token operator">=</span> i <span class="token operator">+</span> step <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> t <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        ret<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">[</span>t<span class="token punctuation">.</span><span class="token function">getHours</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> t<span class="token punctuation">.</span><span class="token function">getMinutes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> t<span class="token punctuation">.</span><span class="token function">getSeconds</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&#39;:&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u8F85\u52A9\u51FD\u6570\uFF1A\u751F\u6210\u4E00\u4E2A\u957F\u5EA6\u4E3Anumber\u7684\u6570\u7EC4\uFF0C\u6BCF\u4E2A\u5143\u7D20\u4E3A\u968F\u673A\u6570\uFF0C\u8303\u56F4\u4E3Astart\u5230end</span>
<span class="token keyword">function</span> <span class="token function">getRandom</span><span class="token punctuation">(</span><span class="token parameter">number<span class="token punctuation">,</span> start<span class="token punctuation">,</span> end</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> ret <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> number<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> data <span class="token operator">=</span> start <span class="token operator">+</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token punctuation">(</span>end <span class="token operator">-</span> start<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        ret<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> y <span class="token operator">=</span> <span class="token function">getRandom</span><span class="token punctuation">(</span><span class="token number">60</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">110</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u5F00\u542Floading</span>
    chart<span class="token punctuation">.</span><span class="token function">showLoading</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// \u66F4\u65B0x\u8F74\u6570\u636E</span>
    options<span class="token punctuation">.</span>xAxis<span class="token punctuation">.</span>data <span class="token operator">=</span> <span class="token function">getLastSeconds</span><span class="token punctuation">(</span><span class="token number">60</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    options<span class="token punctuation">.</span>xAxis<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getFullYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getMonth</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&#39;/&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// \u66F4\u65B0y\u8F74\u6570\u636E</span>
    options<span class="token punctuation">.</span>series<span class="token punctuation">.</span>data <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        y <span class="token operator">=</span> y<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
        y<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token function">getRandom</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">110</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> y<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// \u66F4\u65B0\u56FE\u8868</span>
    chart<span class="token punctuation">.</span><span class="token function">setOption</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// \u5173\u95EDloading</span>
    chart<span class="token punctuation">.</span><span class="token function">hideLoading</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre></div></details><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/8gcLWjbf.gif" alt=""></p><h3 id="\u56FE\u8868\u670D\u52A1\u7AEF\u6E32\u67D3" tabindex="-1"><a class="header-anchor" href="#\u56FE\u8868\u670D\u52A1\u7AEF\u6E32\u67D3" aria-hidden="true">#</a> \u56FE\u8868\u670D\u52A1\u7AEF\u6E32\u67D3</h3><h4 id="python\u7248\u672C" tabindex="-1"><a class="header-anchor" href="#python\u7248\u672C" aria-hidden="true">#</a> Python\u7248\u672C</h4><p>\u4E3B\u8981\u5206\u4E3A\u4E24\u4E2A\u6B65\u9AA4\uFF1A</p>`,8),Sn=n("\u4F7F\u7528"),An=s("code",null,"pyecharts",-1),jn=n("\u7ED8\u56FE\uFF0C\u751F\u6210"),Dn=s("code",null,"HTML",-1),On=n("\u6587\u4EF6\uFF0C\u53C2\u8003\u5B98\u7F51\uFF1A"),Mn={href:"https://pyecharts.org/",target:"_blank",rel:"noopener noreferrer"},Cn=n("https://pyecharts.org/"),En=s("p",null,[n("\u5C06"),s("code",null,"HTML"),n("\u6E32\u67D3\u6210\u56FE\u7247\uFF0C\u6709\u5F88\u591A\u79CD\u65B9\u5F0F\uFF0C\u5728\u672C\u6587\u6863\u4E2D\u6211\u4EEC\u4F7F\u7528"),s("code",null,"snapshot-phantomjs"),n("\uFF0C")],-1),$n=n("\u53C2\u8003\u6587\u6863\uFF1A"),zn={href:"https://pyecharts.org/#/zh-cn/render_images?id=snapshot-phantomjs",target:"_blank",rel:"noopener noreferrer"},Ln=n("https://pyecharts.org/#/zh-cn/render_images?id=snapshot-phantomjs"),Bn=p(`<p><strong>\u5B89\u88C5\u4F9D\u8D56\u5305</strong></p><ul><li>\u5B89\u88C5<code>pyecharts</code></li></ul><div class="language-bash ext-sh"><pre class="language-bash"><code>pip <span class="token function">install</span> -r pyecharts -i https://mirrors.aliyun.com/pypi/simple/
</code></pre></div><ul><li>\u5B89\u88C5<code>PhantomJS</code></li></ul><p><code>PhantomJS</code>\u662F\u4E00\u6B3E\u65E0\u754C\u9762\u6D4F\u89C8\u5668\uFF0C\u53EF\u4EE5\u89E3\u6790<code>JavaScript</code></p><blockquote><p>\u6CE8\uFF1A<code>PhantomJS</code>\u5F00\u53D1\u5DF2\u7ECF\u6682\u505C\uFF0C\u4F46\u672A\u6765\u4E5F\u6709\u53EF\u80FD\u4F1A\u91CD\u542F\u8FD9\u4E2A\u9879\u76EE\uFF0C\u6240\u4EE5\u5982\u679C\u6709\u66F4\u597D\u7684\u9009\u62E9\uFF0C\u5C31\u5C3D\u91CF\u4E0D\u8981\u4F7F\u7528\u5B83\u4E86</p></blockquote><p>\u5B98\u65B9\u6587\u6863\uFF1Ahttps://phantomjs.org/download.html</p><p>\u5B98\u7F51Github\uFF1Ahttps://github.com/ariya/phantomjs</p><p>\u4E0B\u8F7D\u6307\u5B9A\u7CFB\u7EDF\u7684\u5305\uFF0C\u89E3\u538B\uFF0C\u6DFB\u52A0\u5230\u73AF\u5883\u53D8\u91CF\u5373\u53EF</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span>:/root/phantomjs-2.1.1-linux-x86_64/bin/

<span class="token comment"># phantomjs --version</span>
<span class="token number">2.1</span>.1
</code></pre></div><ul><li>\u5B89\u88C5<code>PhantomJS</code>Python\u4F9D\u8D56\u5305</li></ul><div class="language-bash ext-sh"><pre class="language-bash"><code>pip <span class="token function">install</span> -r snapshot-phantomjs -i https://mirrors.aliyun.com/pypi/simple/
</code></pre></div><p><strong>\u7F16\u5199\u6D4B\u8BD5\u4EE3\u7801</strong></p><p><code>demo.py</code></p><div class="language-python ext-py"><pre class="language-python"><code><span class="token comment">#!/usr/bin/env python</span>
<span class="token comment"># --*--coding:utf-8--*--</span>

<span class="token keyword">from</span> pyecharts <span class="token keyword">import</span> options <span class="token keyword">as</span> opts
<span class="token keyword">from</span> pyecharts<span class="token punctuation">.</span>charts <span class="token keyword">import</span> Bar
<span class="token keyword">from</span> pyecharts<span class="token punctuation">.</span>render <span class="token keyword">import</span> make_snapshot

<span class="token keyword">from</span> snapshot_phantomjs <span class="token keyword">import</span> snapshot


<span class="token keyword">def</span> <span class="token function">bar_chart</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> Bar<span class="token punctuation">:</span>
    c <span class="token operator">=</span> <span class="token punctuation">(</span>
        Bar<span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span>add_xaxis<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&quot;\u886C\u886B&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\u6BDB\u8863&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\u9886\u5E26&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\u88E4\u5B50&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\u98CE\u8863&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\u9AD8\u8DDF\u978B&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\u889C\u5B50&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span>add_yaxis<span class="token punctuation">(</span><span class="token string">&quot;\u5546\u5BB6A&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">114</span><span class="token punctuation">,</span> <span class="token number">55</span><span class="token punctuation">,</span> <span class="token number">27</span><span class="token punctuation">,</span> <span class="token number">101</span><span class="token punctuation">,</span> <span class="token number">125</span><span class="token punctuation">,</span> <span class="token number">27</span><span class="token punctuation">,</span> <span class="token number">105</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span>add_yaxis<span class="token punctuation">(</span><span class="token string">&quot;\u5546\u5BB6B&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">57</span><span class="token punctuation">,</span> <span class="token number">134</span><span class="token punctuation">,</span> <span class="token number">137</span><span class="token punctuation">,</span> <span class="token number">129</span><span class="token punctuation">,</span> <span class="token number">145</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">,</span> <span class="token number">49</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span>set_series_opts<span class="token punctuation">(</span>label_opts<span class="token operator">=</span>opts<span class="token punctuation">.</span>LabelOpts<span class="token punctuation">(</span>position<span class="token operator">=</span><span class="token string">&quot;right&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span>set_global_opts<span class="token punctuation">(</span>title_opts<span class="token operator">=</span>opts<span class="token punctuation">.</span>TitleOpts<span class="token punctuation">(</span>title<span class="token operator">=</span><span class="token string">&quot;Bar-\u6D4B\u8BD5\u6E32\u67D3\u56FE\u7247&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span>
    <span class="token keyword">return</span> c


make_snapshot<span class="token punctuation">(</span>snapshot<span class="token punctuation">,</span> bar_chart<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>render<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;bar.png&quot;</span><span class="token punctuation">,</span> is_remove_html<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
</code></pre></div><p>\u6267\u884C\u5B8C\u6210\uFF0C\u5C06\u5F97\u5230\u4E0B\u9762\u4E00\u5F20\u56FE\u7247</p><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/bar.png" alt=""></p><p><strong>\u5E38\u89C1\u95EE\u9898</strong></p><ul><li><p>\u56FE\u7247\u4E2D\u6587\u4E71\u7801\u95EE\u9898</p><p><code>CentOS 7.x</code>\u4E0B\uFF0C\u4F7F\u7528<code>PhantomJS</code>\u751F\u6210\u7684\u56FE\u7247\u4E2D\u5982\u679C\u5E26\u4E2D\u6587\u5B57\u7B26\uFF0C\u90A3\u4E48\u53EF\u80FD\u4F1A\u663E\u793A\u4E71\u7801\uFF0C</p><p><code>windows</code>\u4E0B\u663E\u793A\u6B63\u5E38\uFF0C\u90A3\u4E48\u5F88\u5927\u53EF\u80FD\u5C31\u662FLinux\u7F3A\u76F8\u5173\u5B57\u4F53\u5BFC\u81F4\u7684</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u67E5\u770B\u5F53\u524D\u5B89\u88C5\u7684\u5B57\u4F53\uFF0C\u5982\u679C\u4E0B\u9762\u547D\u4EE4\u627E\u4E0D\u5230\uFF0Cyum -y install fontconfig</span>
fc-list

<span class="token comment"># \u5C06Windows\u4E0B\u7684\u5B57\u4F53\u6253\u5305\uFF0C\u4E0A\u4F20\u5230Linux\u4E2D</span>
\u5C06Windows\u5B57\u4F53\u76EE\u5F55 C:<span class="token punctuation">\\</span>Windows<span class="token punctuation">\\</span>Fonts\u4E0B\u7684\u6240\u6709\u5B57\u4F53\u6253\u5305\uFF0C\u4E0A\u4F20\u5230Linux\u5B57\u4F53\u76EE\u5F55\u4E2D

<span class="token comment"># \u521B\u5EFA\u4E00\u4E2A\u540D\u4E3Achinese\u7684\u5B57\u4F53\u76EE\u5F55\uFF0C\u76EE\u5F55\u540D\u53EB\u4EC0\u4E48\u65E0\u6240\u8C13</span>
<span class="token comment"># \u5177\u4F53\u4F60\u7684linux\u76EE\u5F55\u662F\u4E0D\u662F\u8FD9\u4E2A\uFF0C\u53EF\u4EE5\u53C2\u8003fc-list\u7684\u8F93\u51FA\uFF0C\u770B\u770B\u5F53\u524D\u7684\u5B57\u4F53\u90FD\u5728\u54EA\u4E2A\u76EE\u5F55\u4E0B</span>
<span class="token function">mkdir</span> /usr/share/fonts/chinese/
<span class="token function">chmod</span> -R <span class="token number">755</span> /usr/share/fonts/chinese/

<span class="token comment"># \u751F\u6210\u7F13\u5B58</span>
fc-cache
fc-list		<span class="token comment"># \u518D\u6B21\u67E5\u770B\u5B57\u4F53\uFF0C\u53EF\u4EE5\u770B\u5230\u6211\u4EEC\u4E0A\u4F20\u7684Windows\u5B57\u4F53\u4E86\uFF0C\u518D\u6267\u884C\u811A\u672C\u5E94\u8BE5\u5C31\u6CA1\u95EE\u9898\u4E86</span>
</code></pre></div><p>\u53C2\u8003\uFF1Ahttps://blog.csdn.net/wlwlwlwl015/article/details/51482065</p></li><li><p><code>ReferenceError: Can&#39;t find variable: echarts</code></p><p>\u62A5\u9519\u4FE1\u606F</p><div class="language-bash ext-sh"><pre class="language-bash"><code>Taceback <span class="token punctuation">(</span>most recent call last<span class="token punctuation">)</span>:
  <span class="token punctuation">..</span>.
  File <span class="token string">&quot;/data/venv/lib/python3.7/site-packages/pyecharts/render/snapshot.py&quot;</span>, line <span class="token number">45</span>, <span class="token keyword">in</span> make_snapshot
    raise OSError<span class="token punctuation">(</span>content_array<span class="token punctuation">)</span>
OSError: <span class="token punctuation">[</span><span class="token string">&quot;ReferenceError: Can&#39;t find variable: echarts<span class="token entity" title="\\n">\\n</span><span class="token entity" title="\\n">\\n</span>  file:////opt/app/daily_report/render.html:12 in global code<span class="token entity" title="\\n">\\n</span>ReferenceError: Can&#39;t find variable: echarts<span class="token entity" title="\\n">\\n</span><span class="token entity" title="\\n">\\n</span>  undefined:1<span class="token entity" title="\\n">\\n</span>null<span class="token entity" title="\\n">\\n</span>&quot;</span><span class="token punctuation">]</span>
</code></pre></div><p>\u5C1D\u8BD5\u624B\u52A8\u5728\u6D4F\u89C8\u5668\u6253\u5F00<code>render.html</code>\u53EF\u4EE5\u6B63\u5E38\u663E\u793A\u56FE\u5F62\uFF08\u9700\u8981\u5C06<code>make_snapshot</code>\u4E2D\u7684\u53C2\u6570<code>is_remove_html=False</code>\u8BBE\u7F6E\u4E3A<code>False</code>\uFF09\uFF0C\u4F46\u662F\u5374\u65E0\u6CD5\u7ED8\u5236\u51FA\u56FE\u7247</p><p>\u8FD9\u662F\u56E0\u4E3A\u6CA1\u6709\u6B63\u5E38\u52A0\u8F7D<code>echarts.min.js</code>\u6587\u4EF6\uFF0C\u5BFC\u81F4\u6267\u884CJS\u4EE3\u7801\u65F6\u62A5\u9519\uFF1A<code>ReferenceError</code>\uFF0C\u7C7B\u4F3C\u4E8E\u4E0B\u9762\u8FD9\u79CD\u62A5\u9519</p><p><img src="" alt=""><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/ReferenceError.png" alt="ReferenceError"></p><p>\u89E3\u51B3\u529E\u6CD5\u539F\u7406\uFF1A\u5C06<code>pyecharts</code>\u5305\u4E2D<code>glob.py</code>\u6587\u4EF6\u4E2D<code>echarts.min.js</code>\u7684\u5730\u5740\u66FF\u6362\u4E3A\u672C\u5730\u5730\u5740</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>\u4FEE\u6539echarts.min.js\u7684\u8BBF\u95EE\u5730\u5740
<span class="token function">vim</span> /data/venv/lib/python3.7/site-packages/pyecharts/globals.py			<span class="token comment"># \u6587\u4EF6\u8DEF\u5F84\u6839\u636E\u5B9E\u9645\u60C5\u51B5\u66FF\u6362</span>

<span class="token number">125</span> class _OnlineHost:                 
<span class="token number">126</span>     <span class="token comment">#DEFAULT_HOST = &quot;https://assets.pyecharts.org/assets/&quot;			# \u6CE8\u91CA\u6389\u8FD9\u884C</span>
<span class="token number">127</span>     DEFAULT_HOST <span class="token operator">=</span> <span class="token string">&quot;file:///data/js/&quot;</span>								<span class="token comment"># \u66FF\u6362\u4E3A\u672C\u5730\u8DEF\u5F84\uFF0C\u8BE5\u8DEF\u5F84\u4E0B\u5FC5\u987B\u6709\u4E00\u4E2A\u540D\u4E3Aecharts.min.js\u7684\u6587\u4EF6</span>
<span class="token number">128</span>     NOTEBOOK_HOST <span class="token operator">=</span> <span class="token string">&quot;http://localhost:8888/nbextensions/assets/&quot;</span>

<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>\u4E0B\u8F7Decharts.min.js
	<span class="token builtin class-name">cd</span> /data/js/ <span class="token operator">&amp;&amp;</span> <span class="token function">wget</span> https://assets.pyecharts.org/assets/echarts.min.js  --no-check-certificate

<span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>\u518D\u6B21\u6267\u884C\u811A\u672C\uFF0C\u5E94\u8BE5\u5C31\u6CA1\u95EE\u9898\u4E86
</code></pre></div></li></ul>`,19);function In(Tn,Nn){const a=e("ExternalLinkIcon");return c(),l("div",null,[r,s("p",null,[k,s("a",i,[y,t(a)])]),s("p",null,[g,s("a",m,[d,t(a)])]),s("p",null,[h,s("a",q,[b,t(a)])]),v,s("p",null,[f,s("a",x,[w,t(a)]),_,s("a",S,[A,t(a)]),j,s("a",D,[O,t(a)]),M,s("a",C,[E,t(a)]),$,s("a",z,[L,t(a)]),B]),I,s("blockquote",null,[s("p",null,[T,s("a",N,[U,t(a)]),F,s("a",W,[J,t(a)]),P,s("a",G,[X,t(a)]),H])]),R,Y,s("p",null,[V,s("a",Z,[K,t(a)])]),Q,s("p",null,[nn,s("a",sn,[an,t(a)])]),tn,s("p",null,[pn,s("a",on,[en,t(a)])]),cn,s("p",null,[ln,s("a",un,[rn,t(a)])]),kn,s("p",null,[yn,s("a",gn,[mn,t(a)])]),dn,s("p",null,[hn,s("a",qn,[bn,t(a)])]),vn,s("p",null,[fn,s("a",xn,[wn,t(a)])]),_n,s("ul",null,[s("li",null,[s("p",null,[Sn,An,jn,Dn,On,s("a",Mn,[Cn,t(a)])])]),s("li",null,[En,s("p",null,[$n,s("a",zn,[Ln,t(a)])])])]),Bn])}var Fn=o(u,[["render",In],["__file","Echarts.html.vue"]]);export{Fn as default};
