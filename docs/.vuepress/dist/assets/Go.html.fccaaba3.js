import{_ as o,r as c,o as e,c as u,d as n,a as t,e as s,b as p}from"./app.8347a01d.js";const l={},k=n("h2",{id:"\u6587\u6863",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u6587\u6863","aria-hidden":"true"},"#"),s(" \u6587\u6863")],-1),i=s("\u5B98\u7F51\uFF1A"),r={href:"https://golang.google.cn/",target:"_blank",rel:"noopener noreferrer"},d=s("https://golang.google.cn/"),m=s("\u5B89\u88C5\u6587\u6863\uFF1A"),g={href:"https://golang.google.cn/doc/install",target:"_blank",rel:"noopener noreferrer"},f=s("https://golang.google.cn/doc/install"),b=s("Go\u547D\u4EE4\u6587\u6863\uFF1A"),y={href:"https://golang.google.cn/cmd/go/",target:"_blank",rel:"noopener noreferrer"},h=s("https://golang.google.cn/cmd/go/"),q=p(`<h2 id="\u9879\u76EE\u7BA1\u7406" tabindex="-1"><a class="header-anchor" href="#\u9879\u76EE\u7BA1\u7406" aria-hidden="true">#</a> \u9879\u76EE\u7BA1\u7406</h2><h3 id="\u73AF\u5883\u53D8\u91CF" tabindex="-1"><a class="header-anchor" href="#\u73AF\u5883\u53D8\u91CF" aria-hidden="true">#</a> \u73AF\u5883\u53D8\u91CF</h3><p><strong>\u67E5\u770B/\u8BBE\u7F6E\u73AF\u5883\u53D8\u91CF</strong></p><div class="language-bash ext-sh"><pre class="language-bash"><code>go <span class="token function">env</span> 						<span class="token comment"># \u67E5\u770B\u6240\u6709\u73AF\u5883\u53D8\u91CF</span>
go <span class="token function">env</span> -json				<span class="token comment"># \u67E5\u770B\u6240\u6709\u73AF\u5883\u53D8\u91CF\uFF0Cjson\u683C\u5F0F</span>
go <span class="token function">env</span> <span class="token punctuation">[</span>environment<span class="token punctuation">]</span>		<span class="token comment"># \u67E5\u770B\u67D0\u4E2A\u5177\u4F53\u7684\u73AF\u5883\u53D8\u91CF</span>
go <span class="token function">env</span> -w <span class="token assign-left variable">GO111MODULE</span><span class="token operator">=</span>on	<span class="token comment"># \u8BBE\u7F6E\u73AF\u5883\u53D8\u91CF\uFF0C\u6C38\u4E45\u751F\u6548</span>
go <span class="token builtin class-name">help</span> <span class="token function">env</span>					<span class="token comment"># \u67E5\u770Benv\u547D\u4EE4\u5E2E\u52A9</span>
</code></pre></div><p><strong>\u91CD\u8981\u73AF\u5883\u53D8\u91CF</strong></p><table><thead><tr><th>\u73AF\u5883\u53D8\u91CF</th><th>\u8BF4\u660E</th><th>\u8BBE\u7F6E\u547D\u4EE4</th></tr></thead><tbody><tr><td><code>GOROOT</code></td><td>Go\u7684\u5B89\u88C5\u76EE\u5F55</td><td>\u4E00\u822C\u4E0D\u7528\u81EA\u5DF1\u8BBE\u7F6E</td></tr><tr><td><code>GOPATH</code></td><td>\u4EE3\u8868Go\u7684\u5DE5\u4F5C\u533A\uFF0C\u53EF\u4EE5\u662F\u4E00\u4E2A\u76EE\u5F55\uFF0C\u4E5F\u53EF\u4EE5\u662F\u591A\u4E2A\u76EE\u5F55\uFF0C\u4F7F\u7528\u9017\u53F7\u5206\u9694?<br>\u5B98\u65B9\u8BF4\u660E\u6587\u6863\uFF1Ahttps://github.com/golang/go/wiki/GOPATH</td><td><code>go env -w GOPATH=/usr/local/gopath</code></td></tr><tr><td><code>GO111MODULE</code></td><td>Go 1.11\u7248\u672C\u589E\u52A0\u7684\u6A21\u5757\u7BA1\u7406\u673A\u5236\uFF0C\u5F3A\u70C8\u5EFA\u8BAE\u5F00\u542F</td><td><code>go env -w GO111MODULE=on</code></td></tr><tr><td><code>GOPROXY</code></td><td>\u4EE3\u7406\u5730\u5740\uFF0C\u7531\u4E8E\u5899\u7684\u56E0\u7D20\u5EFA\u8BAE\u4FEE\u6539<br>\u9ED8\u8BA4\u503C\uFF1Ahttps://proxy.golang.org,direct<br>\u4E03\u725B\u4E91\uFF1Ahttps://goproxy.cn,direct</td><td><code>go env -w GOPROXY=https://goproxy.cn,direct</code></td></tr><tr><td><code>GOSUMDB</code></td><td>\u7528\u6765\u6821\u9A8C\u4E0B\u8F7D\u7684\u5305\u7684\u5B89\u5168\u6027\uFF0C\u4E00\u822C\u60C5\u51B5\u4E0B\u4E0D\u9700\u8981\u4FEE\u6539<br>\u9ED8\u8BA4\u503C\uFF1A<code>sum.golang.org</code><br>\u5173\u95ED\uFF1A<code>off</code></td><td><code>go env -w GOSUMDB=off</code></td></tr></tbody></table><p>\u66F4\u591A\u73AF\u5883\u53D8\u91CF\uFF1Ahttps://golang.google.cn/cmd/go/#hdr-Environment_variables \u6216<code>go help environment</code></p><h3 id="\u5355\u6587\u4EF6\u5E94\u7528" tabindex="-1"><a class="header-anchor" href="#\u5355\u6587\u4EF6\u5E94\u7528" aria-hidden="true">#</a> \u5355\u6587\u4EF6\u5E94\u7528</h3><p><code>main.go</code></p><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main
 
<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>
 
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World!&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>\u8BF4\u660E\uFF1A</p><ul><li><p><code>package</code>\u58F0\u660E\u6211\u81EA\u5DF1\u7684\u5305\u540D</p></li><li><p><code>import</code> \u5BFC\u5165\u5176\u4ED6\u5305\uFF0C\u8FD9\u91CC<code>fmt</code>\u662F\u5185\u7F6E\u7684\u4E00\u4E2A\u5305</p></li><li><p><code>func </code>\u58F0\u660E\u51FD\u6570</p></li><li><p>\u7A0B\u5E8F\u6267\u884C\u7684\u5165\u53E3\u5FC5\u987B\u662F<code>main</code>\u5305\u548C<code>main</code>\u65B9\u6CD5\uFF0C\u6587\u4EF6\u540D\u4EFB\u610F</p></li><li><p>\u4E24\u79CD\u8FD0\u884C\u65B9\u5F0F</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># (1) \u7F16\u8BD1\u548C\u8FD0\u884C</span>
go build main.go        <span class="token comment"># \u7F16\u8BD1</span>
./main.exe              <span class="token comment"># \u8FD0\u884C</span>

<span class="token comment"># (2) \u7F16\u8BD1\u5E76\u8FD0\u884C</span>
go run main.go
</code></pre></div></li></ul><p>\u95EE\u9898\uFF1A\u6211\u8981\u5BFC\u5165\u4E00\u4E2A\u7B2C\u4E09\u65B9\u5305\u4F1A\u62A5\u9519\uFF0C\u6BD4\u5982\u4F7F\u7528gin\u6765\u542F\u52A8\u4E00\u4E2AHTTP Server\uFF0C\u8FD9\u662F\u600E\u4E48\u56DE\u4E8B\u5462\uFF1F</p><p><code>main.go</code></p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat main.go </span>
package main

<span class="token function">import</span> <span class="token punctuation">(</span>
        <span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
        <span class="token string">&quot;log&quot;</span>
        <span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

func <span class="token function-name function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        // \u76D1\u542C\u5730\u5740
        addr :<span class="token operator">=</span> <span class="token string">&quot;127.0.0.1:80&quot;</span>

        // \u5B9E\u4F8B\u5316Gin\u8DEF\u7531\u5F15\u64CE
        r :<span class="token operator">=</span> gin.Default<span class="token punctuation">(</span><span class="token punctuation">)</span>

        // \u6CE8\u518C\u8DEF\u7531
        r.GET<span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span>, func<span class="token punctuation">(</span>c *gin.Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                c.String<span class="token punctuation">(</span>http.StatusOK, <span class="token string">&quot;Hello Gin!<span class="token entity" title="\\n">\\n</span>&quot;</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>

        // \u542F\u52A8Gin Server
        log.Fatalln<span class="token punctuation">(</span>r.Run<span class="token punctuation">(</span>addr<span class="token punctuation">))</span>
<span class="token punctuation">}</span>

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># go run main.go   # \u5728\u5F53\u524D\u76EE\u5F55\u53CA\u7236\u76EE\u5F55\u6CA1\u6709\u627E\u5230go.mod\u6587\u4EF6</span>
main.go:4:2: no required module provides package github.com/gin-gonic/gin: go.mod <span class="token function">file</span> not found <span class="token keyword">in</span> current directory or any parent directory<span class="token punctuation">;</span> see <span class="token string">&#39;go help modules&#39;</span>
</code></pre></div><p>\u6211\u4EEC\u5C06\u5728<code>Go Modules</code>\u6765\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898</p><h3 id="go-modules" tabindex="-1"><a class="header-anchor" href="#go-modules" aria-hidden="true">#</a> Go Modules</h3>`,17),w=s("\u6587\u6863\uFF1A"),v={href:"https://go.dev/ref/mod",target:"_blank",rel:"noopener noreferrer"},x=s("https://go.dev/ref/mod"),P=p(`<p>\u4ECE<code>Go1.11</code>\u5F00\u59CB\uFF0C\u5B98\u65B9\u63A8\u51FAGo module\u4F5C\u4E3A\u5305\u7BA1\u7406\u5DE5\u5177</p><h4 id="_1-\u5F00\u542Fgo-module" tabindex="-1"><a class="header-anchor" href="#_1-\u5F00\u542Fgo-module" aria-hidden="true">#</a> \uFF081\uFF09\u5F00\u542FGo Module</h4><p><code>GO111MODULE</code>\u53D8\u91CF\u63A7\u5236\u662F\u5426\u542F\u7528go modules\uFF0C\u4ED6\u67093\u4E2A\u503C\uFF1A</p><ul><li><code>on</code>\uFF1A\u5F00\u542Fgo module</li><li><code>off</code>\uFF1A\u5173\u95EDgo module</li><li><code>auto</code>\uFF1A\u6839\u636E\u9879\u76EE\u914D\u7F6E\u81EA\u52A8\u9009\u62E9\u4F7F\u7528<code>go module</code>\u8FD8\u662F<code>go path</code></li></ul><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u4E0D\u7BA1\u5F00\u542F\u6CA1\u5F00\u542F\uFF0C\u90FD\u91CD\u65B0\u5F00\u542F\u4E00\u904D</span>
C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token punctuation">\\</span>Desktop<span class="token punctuation">\\</span>Notes<span class="token operator">&gt;</span>go <span class="token function">env</span> -w <span class="token assign-left variable">GO111MODULE</span><span class="token operator">=</span>on
C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token punctuation">\\</span>Desktop<span class="token punctuation">\\</span>Notes<span class="token operator">&gt;</span>go <span class="token function">env</span> GO111MODULE
on
</code></pre></div><h4 id="_2-\u521D\u59CB\u5316\u9879\u76EE-go-mod-init" tabindex="-1"><a class="header-anchor" href="#_2-\u521D\u59CB\u5316\u9879\u76EE-go-mod-init" aria-hidden="true">#</a> \uFF082\uFF09\u521D\u59CB\u5316\u9879\u76EE\uFF1A<code>go mod init</code></h4>`,6),S=s("\u6587\u6863\uFF1A"),_={href:"https://go.dev/ref/mod#go-mod-init",target:"_blank",rel:"noopener noreferrer"},R=s("https://go.dev/ref/mod#go-mod-init"),A=p(`<p><strong>\u57FA\u7840\u4F7F\u7528</strong></p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u5148\u521B\u5EFA\u6211\u4EEC\u7684\u9879\u76EE\u76EE\u5F55demo</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># mkdir demo</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cd demo/</span>

<span class="token comment"># \u7136\u540E\u521D\u59CB\u5316\u9879\u76EE</span>
<span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># go mod init demo</span>
go: creating new go.mod: module demo

<span class="token comment"># \u770B\u4E00\u4E0B\u90FD\u505A\u4E86\u4EC0\u4E48\u4E8B\uFF1A\u751F\u6210\u4E86\u4E00\u4E2A\u6587\u4EF6go.mod</span>
<span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># ll</span>
total <span class="token number">4</span>
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">21</span> May <span class="token number">30</span> <span class="token number">19</span>:27 go.mod

<span class="token comment"># \u770B\u770B\u8FD9\u4E2A\u6587\u4EF6\u5185\u5BB9</span>
<span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># cat go.mod </span>
module demo		<span class="token comment"># \u6A21\u5757\u540D</span>

go <span class="token number">1.18</span>			<span class="token comment"># go\u7248\u672C</span>
</code></pre></div><p><strong>\u6211\u4EEC\u6765\u770B\u51E0\u4E2Ago\u660E\u661F\u9879\u76EE\u7684module\u540D\u662F\u5982\u4F55\u5199\u7684</strong></p><table><thead><tr><th>Github\u5730\u5740</th><th>Module Name</th></tr></thead><tbody><tr><td>https://github.com/containerd/containerd</td><td><code>module github.com/containerd/containerd</code></td></tr><tr><td>https://github.com/gin-gonic/gin</td><td><code>module github.com/gin-gonic/gin</code></td></tr><tr><td>https://github.com/pingcap/tidb</td><td><code>module github.com/pingcap/tidb</code></td></tr></tbody></table><p>\u4ED4\u7EC6\u7814\u7A76\u53D1\u73B0\u4ED6\u4EEC\u7684\u683C\u5F0F\u90FD\u662F<code>github.com/\u7528\u6237\u540D/\u9879\u76EE\u540D</code>\uFF0C\u8FD9\u662F\u4E3A\u5565\uFF1F\uFF0C\u5148\u4E0D\u7BA1\u4ED6\uFF0C\u540E\u9762\u518D\u8BF4</p><p><strong>\u7EE7\u7EED\u4F7F\u7528gin</strong></p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># ls -l</span>
total <span class="token number">8</span>
-rw-r--r-- <span class="token number">1</span> root root  <span class="token number">21</span> May <span class="token number">30</span> <span class="token number">19</span>:49 go.mod
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">327</span> May <span class="token number">30</span> <span class="token number">19</span>:17 main.go
<span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># cat main.go</span>
package main

<span class="token function">import</span> <span class="token punctuation">(</span>
        <span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
        <span class="token string">&quot;log&quot;</span>
        <span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

func <span class="token function-name function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        // \u76D1\u542C\u5730\u5740
        addr :<span class="token operator">=</span> <span class="token string">&quot;127.0.0.1:80&quot;</span>

        // \u5B9E\u4F8B\u5316Gin\u8DEF\u7531\u5F15\u64CE
        r :<span class="token operator">=</span> gin.Default<span class="token punctuation">(</span><span class="token punctuation">)</span>

        // \u6CE8\u518C\u8DEF\u7531
        r.GET<span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span>, func<span class="token punctuation">(</span>c *gin.Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                c.String<span class="token punctuation">(</span>http.StatusOK, <span class="token string">&quot;Hello Gin!<span class="token entity" title="\\n">\\n</span>&quot;</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>

        // \u542F\u52A8Gin Server
        log.Fatalln<span class="token punctuation">(</span>r.Run<span class="token punctuation">(</span>addr<span class="token punctuation">))</span>
<span class="token punctuation">}</span>
<span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># go run main.go		# \u8FD9\u6B21\u62A5\u9519\u4E0D\u4E00\u6837\u4E86\uFF0C\u8BA9\u6211\u4EEC\u4F7F\u7528go get\u4E0B\u8F7Dgin</span>
main.go:4:2: no required module provides package github.com/gin-gonic/gin<span class="token punctuation">;</span> to <span class="token function">add</span> it:
        go get github.com/gin-gonic/gin
</code></pre></div><h4 id="_3-\u4E0B\u8F7D\u7B2C\u4E09\u65B9\u5305-go-get" tabindex="-1"><a class="header-anchor" href="#_3-\u4E0B\u8F7D\u7B2C\u4E09\u65B9\u5305-go-get" aria-hidden="true">#</a> \uFF083\uFF09\u4E0B\u8F7D\u7B2C\u4E09\u65B9\u5305\uFF1A<code>go get</code></h4>`,8),C=s("\u6587\u6863\uFF1A"),F={href:"https://go.dev/ref/mod#go-get",target:"_blank",rel:"noopener noreferrer"},N=s("https://go.dev/ref/mod#go-get"),W=p(`<p>\u7279\u70B9\uFF1A</p><ul><li>\u5FC5\u987B\u5728\u9879\u76EE\u76EE\u5F55(\u542B\u6709go.mod\u7684\u76EE\u5F55)\u4F7F\u7528<code>go get</code>\uFF0C\u65E0\u6CD5\u5728\u5168\u5C40\u76EE\u5F55\u4F7F\u7528</li><li><code>go get</code>\u7528\u6765\u7BA1\u7406\u7B2C\u4E09\u65B9\u5305\u7248\u672C\u95EE\u9898\uFF0C\u4F1A\u81EA\u52A8\u7EF4\u62A4go.mod\u548Cgo.sum\u6587\u4EF6</li><li><code>go get</code>\u4E0B\u8F7D\u7684\u5305\u653E\u5728GOPATH/pkg\u76EE\u5F55\u5185</li><li>\u82E5\u4E0D\u6307\u5B9A\u7248\u672C\u53F7\u53EA\u80FD\u66F4\u65B0\u5230<code>v1.x.x</code>\u6700\u65B0\u7248\uFF0C\u82E5\u7B2C\u4E09\u65B9\u5305\u6CA1\u6709\u7248\u672C\u53F7\uFF08Tag\uFF09\u5219\u4F1A\u66F4\u65B0\u5230\u6700\u540E\u4E00\u6B21\u63D0\u4EA4\u7684\u4EE3\u7801</li></ul><details class="custom-container details"><summary>\u57FA\u7840\u7528\u6CD5</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u4E0B\u8F7D</span>
<span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># go get github.com/gin-gonic/gin</span>
go: added github.com/gin-contrib/sse v0.1.0
go: added github.com/gin-gonic/gin v1.8.0
go: added github.com/go-playground/locales v0.14.0
go: added github.com/go-playground/universal-translator v0.18.0
go: added github.com/go-playground/validator/v10 v10.10.0
go: added github.com/goccy/go-json v0.9.7
go: added github.com/json-iterator/go v1.1.12
go: added github.com/leodido/go-urn v1.2.1
go: added github.com/mattn/go-isatty v0.0.14
go: added github.com/modern-go/concurrent v0.0.0-20180228061459-e0a39a4cb421
go: added github.com/modern-go/reflect2 v1.0.2
go: added github.com/pelletier/go-toml/v2 v2.0.1
go: added github.com/ugorji/go/codec v1.2.7
go: added golang.org/x/crypto v0.0.0-20210711020723-a769d52b0f97
go: added golang.org/x/net v0.0.0-20210226172049-e18ecbb05110
go: added golang.org/x/sys v0.0.0-20210806184541-e5e7981a1069
go: added golang.org/x/text v0.3.6
go: added google.golang.org/protobuf v1.28.0
go: added gopkg.in/yaml.v2 v2.4.0

<span class="token comment"># \u67E5\u770Bgo.mod, \u5C06gin\u53CA\u5176\u4F9D\u8D56\u7684\u5305\u90FD\u5199\u5165\u5230go.mod\u6587\u4EF6\u4E2D\u4E86</span>
<span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># cat go.mod</span>
module demo

go <span class="token number">1.18</span>

<span class="token comment"># require\u91CC\u9762\u4EE3\u8868\u4F9D\u8D56\u7684\u5305</span>
require <span class="token punctuation">(</span>
        github.com/gin-contrib/sse v0.1.0 // indirect
        github.com/gin-gonic/gin v1.8.0 // indirect
        github.com/go-playground/locales v0.14.0 // indirect
        github.com/go-playground/universal-translator v0.18.0 // indirect
        github.com/go-playground/validator/v10 v10.10.0 // indirect
        github.com/goccy/go-json v0.9.7 // indirect
        github.com/json-iterator/go v1.1.12 // indirect
        github.com/leodido/go-urn v1.2.1 // indirect
        github.com/mattn/go-isatty v0.0.14 // indirect
        github.com/modern-go/concurrent v0.0.0-20180228061459-e0a39a4cb421 // indirect
        github.com/modern-go/reflect2 v1.0.2 // indirect
        github.com/pelletier/go-toml/v2 v2.0.1 // indirect
        github.com/ugorji/go/codec v1.2.7 // indirect
        golang.org/x/crypto v0.0.0-20210711020723-a769d52b0f97 // indirect
        golang.org/x/net v0.0.0-20210226172049-e18ecbb05110 // indirect
        golang.org/x/sys v0.0.0-20210806184541-e5e7981a1069 // indirect
        golang.org/x/text v0.3.6 // indirect
        google.golang.org/protobuf v1.28.0 // indirect
        gopkg.in/yaml.v2 v2.4.0 // indirect
<span class="token punctuation">)</span>

<span class="token comment"># \u6211\u4EEC\u4E0B\u8F7D\u7684\u5305\u5728GOPATH\u76EE\u5F55\u4E0B</span>
<span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># go env GOPATH</span>
/usr/local/gopath
<span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># ls -l /usr/local/gopath/pkg/mod/</span>
total <span class="token number">20</span>
drwxr-xr-x <span class="token number">3</span> root root <span class="token number">4096</span> May <span class="token number">30</span> <span class="token number">20</span>:26 cache
drwxr-xr-x <span class="token number">9</span> root root <span class="token number">4096</span> May <span class="token number">30</span> <span class="token number">20</span>:26 github.com
drwxr-xr-x <span class="token number">3</span> root root <span class="token number">4096</span> May <span class="token number">30</span> <span class="token number">20</span>:26 golang.org
drwxr-xr-x <span class="token number">3</span> root root <span class="token number">4096</span> May <span class="token number">30</span> <span class="token number">20</span>:26 google.golang.org
drwxr-xr-x <span class="token number">3</span> root root <span class="token number">4096</span> May <span class="token number">30</span> <span class="token number">20</span>:26 gopkg.in

<span class="token comment"># \u8FD8\u4F1A\u751F\u6210\u4E00\u4E2Ago.sum\u6587\u4EF6\uFF0C\u6B64\u6587\u4EF6\u4E0D\u9700\u8981\u6211\u4EEC\u7BA1\u7406\uFF0C\u5148\u4E0D\u505A\u6DF1\u5165\u7814\u7A76</span>
<span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># ls -lh go.sum </span>
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">9</span>.1K May <span class="token number">30</span> <span class="token number">20</span>:32 go.sum
</code></pre></div></details><details class="custom-container details"><summary>\u5B89\u88C5\u6700\u65B0\u7248\u3001\u5B89\u88C5\u6307\u5B9A\u7248\u3001\u79FB\u9664\u7248\u672C\u3001\u5347\u7EA7\u4F9D\u8D56</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u5B89\u88C5\u6700\u65B0\u7248\u672C\uFF0C\u4EE5\u4E0B\u4E24\u79CD\u65B9\u6CD5\u90FD\u53EF\u4EE5\uFF0C\u8FD9\u4F1A\u4E0B\u8F7D\u6700\u65B0\u7684tag\u7248\u672C</span>
<span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># go get github.com/gin-gonic/gin</span>
<span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># go get github.com/gin-gonic/gin@latest</span>

<span class="token comment"># \u5B89\u88C5\u6307\u5B9A\u7248\u672C</span>
<span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># go get github.com/gin-gonic/gin@v1.7.0</span>
go: downgraded github.com/gin-gonic/gin v1.8.0 <span class="token operator">=</span><span class="token operator">&gt;</span> v1.7.0

<span class="token comment"># \u5C06\u5305\u4ECEgo.mod\u4E2D\u79FB\u9664\uFF08\u672C\u5730\u5E76\u4E0D\u4F1A\u5220\u9664\uFF09</span>
<span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># go get github.com/gin-gonic/gin@none</span>
go: removed github.com/gin-gonic/gin v1.7.0

<span class="token comment"># \u67E5\u770B\u672C\u5730\u5305</span>
<span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># ll /usr/local/gopath/pkg/mod/github.com/gin-gonic/</span>
total <span class="token number">8</span>
dr-xr-xr-x <span class="token number">9</span> root root <span class="token number">4096</span> May <span class="token number">30</span> <span class="token number">20</span>:32 gin@v1.7.0
dr-xr-xr-x <span class="token number">9</span> root root <span class="token number">4096</span> May <span class="token number">30</span> <span class="token number">20</span>:26 gin@v1.8.0

<span class="token comment"># \u5347\u7EA7\u4F9D\u8D56\uFF08\u8FD9\u4F1A\u5347\u7EA7\u6240\u6709\u4F9D\u8D56\uFF09</span>
<span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># go get -u</span>
go: downloading golang.org/x/net v0.0.0-20220526153639-5463443f8c37
go: downloading github.com/go-playground/validator/v10 v10.11.0
go: downloading github.com/go-playground/validator v9.31.0+incompatible
go: downloading github.com/pelletier/go-toml v1.9.5
go: downloading github.com/ugorji/go v1.2.7
go: downloading golang.org/x/sys v0.0.0-20220520151302-bc2c85ada10a
go: downloading golang.org/x/crypto v0.0.0-20220525230936-793ad666bf5e
go: downloading golang.org/x/text v0.3.7
go: downloading github.com/modern-go/concurrent v0.0.0-20180306012644-bacd9c7ef1dd
go: upgraded github.com/go-playground/validator/v10 v10.10.0 <span class="token operator">=</span><span class="token operator">&gt;</span> v10.11.0
go: upgraded github.com/modern-go/concurrent v0.0.0-20180228061459-e0a39a4cb421 <span class="token operator">=</span><span class="token operator">&gt;</span> v0.0.0-20180306012644-bacd9c7ef1dd
go: upgraded golang.org/x/crypto v0.0.0-20210711020723-a769d52b0f97 <span class="token operator">=</span><span class="token operator">&gt;</span> v0.0.0-20220525230936-793ad666bf5e
go: upgraded golang.org/x/net v0.0.0-20210226172049-e18ecbb05110 <span class="token operator">=</span><span class="token operator">&gt;</span> v0.0.0-20220526153639-5463443f8c37
go: upgraded golang.org/x/sys v0.0.0-20210806184541-e5e7981a1069 <span class="token operator">=</span><span class="token operator">&gt;</span> v0.0.0-20220520151302-bc2c85ada10a
go: upgraded golang.org/x/text v0.3.6 <span class="token operator">=</span><span class="token operator">&gt;</span> v0.3.7

<span class="token comment"># \u5347\u7EA7\u4F9D\u8D56go.mod\u53D8\u5316</span>
<span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># cat go.mod </span>
module demo

go <span class="token number">1.18</span>

require github.com/gin-gonic/gin v1.8.0		// \u8FD9\u4E2A\u539F\u6765\u5728\u4E0B\u9762\uFF0C\u5E76\u4E14\u6709// indirect\uFF0C\u73B0\u5728\u6CA1\u6709\u4E86

require <span class="token punctuation">(</span>
        github.com/gin-contrib/sse v0.1.0 // indirect
        github.com/go-playground/locales v0.14.0 // indirect
        github.com/go-playground/universal-translator v0.18.0 // indirect
        github.com/go-playground/validator/v10 v10.11.0 // indirect
        github.com/goccy/go-json v0.9.7 // indirect
        github.com/golang/protobuf v1.5.2 // indirect
        github.com/json-iterator/go v1.1.12 // indirect
        github.com/leodido/go-urn v1.2.1 // indirect
        github.com/mattn/go-isatty v0.0.14 // indirect
        github.com/modern-go/concurrent v0.0.0-20180306012644-bacd9c7ef1dd // indirect
        github.com/modern-go/reflect2 v1.0.2 // indirect
        github.com/pelletier/go-toml/v2 v2.0.1 // indirect
        github.com/ugorji/go/codec v1.2.7 // indirect
        golang.org/x/crypto v0.0.0-20220525230936-793ad666bf5e // indirect
        golang.org/x/net v0.0.0-20220526153639-5463443f8c37 // indirect
        golang.org/x/sys v0.0.0-20220520151302-bc2c85ada10a // indirect
        golang.org/x/text v0.3.7 // indirect
        google.golang.org/protobuf v1.28.0 // indirect
        gopkg.in/yaml.v2 v2.4.0 // indirect
<span class="token punctuation">)</span>
</code></pre></div></details><h4 id="_4-\u5B89\u88C5\u53EF\u6267\u884C\u6587\u4EF6-go-install" tabindex="-1"><a class="header-anchor" href="#_4-\u5B89\u88C5\u53EF\u6267\u884C\u6587\u4EF6-go-install" aria-hidden="true">#</a> \uFF084\uFF09\u5B89\u88C5\u53EF\u6267\u884C\u6587\u4EF6\uFF1A<code>go install</code></h4>`,5),T=s("\u6587\u6863\uFF1A"),G={href:"https://go.dev/ref/mod#go-install",target:"_blank",rel:"noopener noreferrer"},O=s("https://go.dev/ref/mod#go-install"),U=p(`<p>\u7279\u70B9\uFF1A</p><ul><li>\u53EF\u4EE5\u5728\u5168\u5C40\u4F7F\u7528<code>go install</code>\uFF0C\u4E0D\u4F1A\u7EF4\u62A4go.mod\u548Cgo.sum\u6587\u4EF6</li><li>\u4F7F\u7528<code>go install github.com/xxx/@\u7248\u672C</code>,\u5FC5\u987B\u52A0\u4E0A\u7248\u672C\uFF0C\u5982\u679C\u662F\u6700\u65B0\u7248\u5219\u662F<code>latest</code></li><li>\u5176\u539F\u7406\u662F\uFF1A <ul><li>\u4E0B\u8F7D\u7B2C\u4E09\u65B9\u5305\u5230<code>GOPATH/pkg</code></li><li>\u7136\u540E\u7F16\u8BD1\uFF08\u5165\u53E3\u662F<code>main</code>\u5305\u7684<code>main</code>\u65B9\u6CD5\uFF09</li><li>\u5C06\u53EF\u6267\u884C\u6587\u4EF6\u653E\u5728<code>GOPATH/bin</code>\u76EE\u5F55\u4E0B</li></ul></li><li>\u53EF\u4EE5\u4F7F\u7528<code>go install</code>\u7684\u7B2C\u4E09\u65B9\u5305\uFF0C\u4E00\u822C\u90FD\u6709\u4E00\u4E2A<code>main</code>\u5305\u548C<code>main</code>\u65B9\u6CD5</li></ul><p>\u4E3E\u51E0\u4E2A\u4F8B\u5B50</p><table><thead><tr><th>Github</th><th>main</th></tr></thead><tbody><tr><td>https://github.com/davecheney/httpstat</td><td><code>main.go</code></td></tr><tr><td>https://github.com/Code-Hex/pget</td><td><code>cmd/pget/main.go</code></td></tr></tbody></table><h4 id="_5-\u4F9D\u8D56\u6574\u7406-go-mod-tidy" tabindex="-1"><a class="header-anchor" href="#_5-\u4F9D\u8D56\u6574\u7406-go-mod-tidy" aria-hidden="true">#</a> \uFF085\uFF09\u4F9D\u8D56\u6574\u7406\uFF1Ago mod tidy</h4><p>\u5F88\u5E38\u7528\u7684\u4E00\u4E2A\u547D\u4EE4\uFF0C\u53EF\u591A\u6B21\u6267\u884C</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># go help mod</span>
Go mod provides access to operations on modules.

Note that support <span class="token keyword">for</span> modules is built into all the go commands,
not just <span class="token string">&#39;go mod&#39;</span><span class="token builtin class-name">.</span> For example, day-to-day adding, removing, upgrading,
and downgrading of dependencies should be <span class="token keyword">done</span> using <span class="token string">&#39;go get&#39;</span><span class="token builtin class-name">.</span>
See <span class="token string">&#39;go help modules&#39;</span> <span class="token keyword">for</span> an overview of module functionality.

Usage:

        go mod <span class="token operator">&lt;</span>command<span class="token operator">&gt;</span> <span class="token punctuation">[</span>arguments<span class="token punctuation">]</span>

The commands are:

        download    download modules to <span class="token builtin class-name">local</span> cache
        edit        edit go.mod from tools or scripts
        graph       print module requirement graph
        init        initialize new module <span class="token keyword">in</span> current directory
        tidy        <span class="token function">add</span> missing and remove unused modules			<span class="token comment"># \u6DFB\u52A0\u7F3A\u5C11\u7684\u5305\uFF0C\u5E76\u79FB\u9664\u672A\u4F7F\u7528\u7684\u5305</span>
        vendor      <span class="token function">make</span> vendored copy of dependencies
        verify      verify dependencies have expected content
        why         explain why packages or modules are needed

Use <span class="token string">&quot;go help mod &lt;command&gt;&quot;</span> <span class="token keyword">for</span> <span class="token function">more</span> information about a command.
</code></pre></div><h4 id="_6-\u53D1\u5E03\u516C\u5171\u6A21\u5757\u5230github\u{1F389}" tabindex="-1"><a class="header-anchor" href="#_6-\u53D1\u5E03\u516C\u5171\u6A21\u5757\u5230github\u{1F389}" aria-hidden="true">#</a> \uFF086\uFF09\u53D1\u5E03\u516C\u5171\u6A21\u5757\u5230GitHub\u{1F389}</h4><details class="custom-container details"><summary>\uFF081\uFF09\u5148\u8DD1\u901A\u4E00\u4E2A\u6700\u7B80\u5355\u7684\u53D1\u5E03\u6D41\u7A0B</summary><p>\u2460 \u9996\u5148\u5728Github\u4E0A\u65B0\u5EFA\u4E00\u4E2A\u4ED3\u5E93test</p><p>\u2461 \u5176\u6B21\u514B\u9686\u4EE3\u7801\uFF0C\u4F7F\u7528go mod\u521D\u59CB\u5316\uFF0C\u8981\u6C42module name\u5FC5\u987B\u662F\u7EDD\u5BF9\u8DEF\u5F84\uFF08<code>github.com/\u7528\u6237\u540D/\u9879\u76EE\u540D</code>\uFF09</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u514B\u9686</span>
<span class="token function">git</span> clone https://github.com/vvfock3r/test.git

<span class="token comment"># \u521D\u59CB\u5316Go\u6A21\u5757</span>
go mod init github.com/vvfock3r/test
</code></pre></div><p>\u2462 \u63D0\u4EA4\u4EE3\u7801\u5230test\u4ED3\u5E93</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u65B0\u5EFA\u4E00\u4E2A\u6587\u4EF6utils.go</span>
package <span class="token builtin class-name">test</span>

func Add<span class="token punctuation">(</span>x, y int<span class="token punctuation">)</span> int <span class="token punctuation">{</span>
	<span class="token builtin class-name">return</span> x + y
<span class="token punctuation">}</span>

<span class="token comment"># \u63D0\u4EA4</span>
<span class="token function">git</span> <span class="token function">add</span> *
<span class="token function">git</span> commit -m <span class="token string">&quot;test&quot;</span>
<span class="token function">git</span> push -u origin main
</code></pre></div><p>\u2463 \u4F7F\u7528GoLand\u65B0\u5EFA\u4E00\u4E2AGo\u9879\u76EEdemo\uFF0C\u8FDB\u884C\u6D4B\u8BD5</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u6DFB\u52A0\u4F9D\u8D56\u5305</span>
C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token punctuation">\\</span>GolandProjects<span class="token punctuation">\\</span>demo<span class="token operator">&gt;</span>go get github.com/vvfock3r/test 
go: downloading github.com/vvfock3r/test v0.0.0-20220601023617-b9d901edce34

<span class="token comment"># \u7F16\u5199main.go</span>
package main

<span class="token function">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;github.com/vvfock3r/test&quot;</span>
<span class="token punctuation">)</span>

func <span class="token function-name function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt.Println<span class="token punctuation">(</span>test.Add<span class="token punctuation">(</span><span class="token number">1</span>, <span class="token number">2</span><span class="token punctuation">))</span>
<span class="token punctuation">}</span>

<span class="token comment"># \u6D4B\u8BD5\u6267\u884C</span>
C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token punctuation">\\</span>GolandProjects<span class="token punctuation">\\</span>demo<span class="token operator">&gt;</span>go run <span class="token builtin class-name">.</span>      
<span class="token number">3</span>

<span class="token comment"># \u67E5\u770Bgo.mod</span>
module demo

go <span class="token number">1.18</span>

require github.com/vvfock3r/test v0.0.0-20220601023617-b9d901edce34 // indirect
</code></pre></div><p>\u603B\u7ED3\u51E0\u4E2A\u5173\u952E\u70B9\uFF1A</p><p>\uFF081\uFF09\u7B2C\u4E09\u65B9\u6A21\u5757\u7684\u6A21\u5757\u540D\uFF1A\u5E94\u4F7F\u7528<code>github.com/\u7528\u6237\u540D/\u9879\u76EE\u540D</code></p><p>\uFF082\uFF09\u7B2C\u4E09\u65B9\u6A21\u5757\u7684\u7248\u672C\uFF1A\u82E5\u65E0\u7248\u672C\uFF0CGo\u81EA\u52A8\u6DFB\u52A0\u4E00\u4E2A\u7248\u672C<code>v0.0.0-\u65F6\u95F4-\u63D0\u4EA4ID</code></p><ul><li><code>v0.0.0</code>\u662F\u56FA\u5B9A\u7684</li><li>\u65F6\u95F4\u683C\u5F0F<code>\u5E74\u6708\u65E5\u65F6\u5206\u79D2</code></li><li>\u63D0\u4EA4ID\u957F\u5EA6<code>12</code>\u4F4D</li></ul><p>\u4ECE\u4E0A\u9762\u53EF\u4EE5\u770B\u51FA\uFF0C\u4E00\u6B21\u63D0\u4EA4\u53EF\u4EE5\u8BA4\u4E3A\u662F\u4E00\u4E2A\u7248\u672C</p></details><details class="custom-container details"><summary>\uFF082\uFF09\u66F4\u65B0\u7B2C\u4E09\u65B9\u5305\u5EF6\u8FDF\u95EE\u9898</summary><p>\u63CF\u8FF0\uFF1A\u6211\u4EEC\u5BF9\u7B2C\u4E09\u65B9\u6A21\u5757<code>test</code>\u968F\u4FBF\u505A\u4E00\u70B9\u4FEE\u6539\u5E76\u63D0\u4EA4\u5230GitHub\uFF0C\u5728<code>demo</code>\u9879\u76EE\u4E2D\u6D4B\u8BD5\u66F4\u65B0<code>test</code>\u6A21\u5757\u662F\u5426\u6B63\u5E38</p><p>\u7ED3\u679C\uFF1A\u7B2C\u4E09\u65B9\u5305\u521A\u521A\u66F4\u65B0\u7684\u4EE3\u7801\uFF0C\u6211\u4EEC\u65E0\u6CD5\u7ACB\u9A6C\u62C9\u53D6\u5230\u65B0\u4EE3\u7801\uFF0C\u6D4B\u8BD5\u8FC7\u7684\u65B9\u6CD5\u6709\uFF1A</p><ul><li>\u4F7F\u7528<code>go get -u github.com/vvfock3r/test</code>\u66F4\u65B0\uFF0C\u65E0\u6548</li><li>\u5220\u9664<code>go.mod</code>\u548C\u672C\u5730<code>GOPATH</code>\u4E0B\u7684<code>test</code>\u6A21\u5757\u76F8\u5173\u7684\u4EFB\u4F55\u4E1C\u897F\uFF0C\u7136\u540E\u4F7F\u7528<code>go get</code>\u91CD\u65B0\u4E0B\u8F7D\uFF0C\u65E0\u6548</li></ul><p>\u539F\u56E0\u662F\uFF1A\u6211\u4EEC<code>go get</code>\u4E0B\u8F7D\u5305\u5E76\u4E0D\u662F\u76F4\u63A5\u4ECE<code>github.com</code>\u4E0B\u8F7D\u7684\uFF0C\u800C\u662F\u901A\u8FC7<code>GOPROXY</code>\u6307\u5B9A\u7684\u955C\u50CF\u7AD9\u4E0B\u8F7D\u7684\uFF08\u901A\u8FC7<code>go get -x</code>\u53EF\u4EE5\u770B\u5230\uFF09\uFF0C\u800C\u955C\u50CF\u7AD9\u5B58\u5728\u4E00\u5B9A\u5EF6\u8FDF\u4ECE\u800C\u5BFC\u81F4\u4E0D\u80FD\u9A6C\u4E0A\u4E0B\u8F7D\u6700\u65B0\u5305</p><p>\u89E3\u51B3\u529E\u6CD5\uFF1A\u4F7F\u7528<code>go get github.com/vvfock3r/test@\u63D0\u4EA4ID</code>\u6765\u8FDB\u884C\u66F4\u65B0\uFF08\u63D0\u4EA4ID\u5E76\u4E0D\u4E00\u5B9A\u662F\u5B8C\u6574\u7684ID\uFF09\uFF0C\u53EF\u4EE5\u5728\u4E0B\u56FE\u4E2D\u8FD9\u4E2A\u4F4D\u7F6E\u627E\u5230\u6700\u65B0\u63D0\u4EA4ID</p><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220601140958608.png" alt="image-20220601140958608"></p></details><details class="custom-container details"><summary>\uFF083\uFF09\u6307\u5B9A\u7B2C\u4E09\u65B9\u5305\u7684\u7248\u672C</summary><p>\u5982\u679C\u6211\u60F3\u8BA9\u7528\u6237\u4F7F\u7528<code>go get github.com/vvfock3r/test@v1.0.0</code>\u8FD9\u6837\u7684\u65B9\u5F0F\u6765\u5B89\u88C5\u6307\u5B9A\u7248\u672C\uFF0C\u8BE5\u5982\u4F55\u505A\u5462\uFF1F</p><p>\u8FD9\u91CC\u7684<code>v1.0.0</code>\uFF0C\u5C31\u662F\u4ED3\u5E93\u7684<code>Tag</code>\u540D\u79F0\uFF0C\u4F46\u662F\u6709\u51E0\u70B9\u6CE8\u610F\u4E8B\u9879\uFF1A</p><ul><li><p>Tag\u540D\u79F0\u5FC5\u987B\u662F\u7C7B\u4F3C<code>v1.0.0</code>\u8FD9\u79CD\u89C4\u5219\uFF0C\u5982\u679C\u662F<code>v1.0</code>\u8FD9\u6837\u662F\u62C9\u53D6\u4E0D\u5230\u5BF9\u5E94\u7248\u672C\u7684</p><div class="language-bash ext-sh"><pre class="language-bash"><code>C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token punctuation">\\</span>GolandProjects<span class="token punctuation">\\</span>demo<span class="token operator">&gt;</span>go get github.com/vvfock3r/test@v1.0
go: github.com/vvfock3r/test@v1.0: no matching versions <span class="token keyword">for</span> query <span class="token string">&quot;v1.0&quot;</span>
</code></pre></div></li><li><p>\u5BF9\u4E8E<code>v2.0.0</code>\u53CA\u4EE5\u4E0A\u7248\u672C\uFF0C\u6211\u4EEC\u5982\u679C\u76F4\u63A5\u4F7F\u7528<code>go get github.com/vvfock3r/test@v2.0.0</code>\u4F1A\u62A5\u9519</p><div class="language-bash ext-sh"><pre class="language-bash"><code>C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token punctuation">\\</span>GolandProjects<span class="token punctuation">\\</span>demo<span class="token operator">&gt;</span>go get github.com/vvfock3r/test@v2.0.0
go: github.com/vvfock3r/test@v2.0.0: invalid version: module contains a go.mod file, so module path must match major version <span class="token punctuation">(</span><span class="token string">&quot;github.com/vvfock3r/test/v2&quot;</span><span class="token punctuation">)</span>

<span class="token comment"># \u539F\u56E0\u4E5F\u7ED9\u51FA\u6765\u4E86\uFF1A\u6A21\u5757\u8DEF\u5F84\u5FC5\u987B\u5305\u542B\u4E3B\u7248\u672C\u53F7</span>
</code></pre></div><p>\u8FD9\u4E2A\u65F6\u5019\u6211\u4EEC\u6709\u4E24\u79CD\u89E3\u51B3\u65B9\u6848\uFF1A</p><ul><li>\u6C38\u8FDC\u4E0D\u5347\u7EA7\u5230<code>v2.x.x</code>\uFF0C\u4E00\u76F4\u4F7F\u7528v1\u7684\u7248\u672C\u6BD4\u5982<code>v1.0.0</code>\u3001<code>v1.0.1</code>\u3001<code>@v1.999.999</code></li><li>\u5347\u7EA7\u5230<code>v2.x.x</code>\uFF0C\u9700\u8981\u5728\u9879\u76EE\u6839\u76EE\u5F55\u4E0B\u521B\u5EFA\u4E00\u4E2A<code>v2</code>\u7684\u76EE\u5F55\uFF0C\u4EE3\u8868\u8FD9\u662F\u4E00\u4E2A\u5168\u65B0\u7684\u7248\u672C</li></ul></li><li><p>\u5176\u4ED6\uFF1AGithub\u4E0A\u65B0\u6253\u7684Tag\u53EF\u4EE5\u76F4\u63A5\u5728\u547D\u4EE4\u884C\u4F7F\u7528<code>go get </code>\u4E0B\u8F7D\uFF0C\u6CA1\u6709GOPROXY\u7F13\u5B58\u7684\u95EE\u9898\uFF08\u6307\u5B9A\u7248\u672C\u4E3A<code>latest</code>\u9664\u5916\uFF09</p></li></ul></details><details class="custom-container details"><summary>\uFF084\uFF09replace\u7B80\u4ECB</summary><p>replace\u53EF\u4EE5\u8BA9\u6211\u4EEC\u5BF9\u5305\u8FDB\u884C\u66FF\u6362\uFF0C\u53EF\u4EE5\u8FBE\u5230\u8FD9\u6837\u7684\u6548\u679C\uFF1A\u5BFC\u5165\u7684\u662F<code>a</code>\u5305\uFF0C\u4F46\u5B9E\u9645\u4F7F\u7528\u7684\u662F<code>b</code>\u5305</p><p>\u4F7F\u7528replace\u53EF\u4EE5\u76F4\u63A5\u4FEE\u6539go.mod\u6587\u4EF6\uFF0C\u4E5F\u53EF\u4EE5\u4F7F\u7528<code>go mod edit -replace</code>\u547D\u4EE4\uFF08\u63A8\u8350\uFF09</p><p>\u8BED\u6CD5</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u8BED\u6CD5</span>
<span class="token comment"># go mod edit -replace \u65E7\u5730\u5740=\u65B0\u5730\u5740</span>

<span class="token comment"># \u793A\u4F8B\uFF1A\u5C06v1.1.2\u66FF\u6362\u4E3Av1.1.1\u7248\u672C\uFF0C\u4E5F\u5C31\u662F\u964D\u4F4E\u4E86\u4E00\u4E2A\u7248\u672C</span>
go mod edit -replace github.com/vvfock3r/test@v1.1.2<span class="token operator">=</span>github.com/vvfock3r/test@v1.1.1

<span class="token comment"># \u67E5\u770B\u4E00\u4E0Bgo.mod\u6587\u4EF6</span>
module demo
go <span class="token number">1.18</span>
require github.com/vvfock3r/test v1.1.2
replace github.com/vvfock3r/test v1.1.2 <span class="token operator">=</span><span class="token operator">&gt;</span> github.com/vvfock3r/test v1.1.1		<span class="token comment"># replace</span>

<span class="token comment"># \u8BF4\u660E</span>
\u867D\u7136go.mod\u4E2Drequire\u662Fv1.1.2\u7248\u672C\uFF0C\u4F46\u5B9E\u9645\u4E0A\u5728\u4F7F\u7528v1.1.1\u7248\u672C
</code></pre></div></details><h2 id="\u524D\u7F6E\u77E5\u8BC6" tabindex="-1"><a class="header-anchor" href="#\u524D\u7F6E\u77E5\u8BC6" aria-hidden="true">#</a> \u524D\u7F6E\u77E5\u8BC6</h2><h3 id="\u58F0\u660E\u5173\u952E\u5B57" tabindex="-1"><a class="header-anchor" href="#\u58F0\u660E\u5173\u952E\u5B57" aria-hidden="true">#</a> \u58F0\u660E\u5173\u952E\u5B57</h3><table><thead><tr><th>\u5173\u952E\u5B57</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td><code>var</code></td><td>\u58F0\u660E\u53D8\u91CF</td></tr><tr><td><code>const</code></td><td>\u58F0\u660E\u5E38\u91CF</td></tr><tr><td><code>func</code></td><td>\u58F0\u660E\u51FD\u6570</td></tr><tr><td><code>type</code></td><td>\u58F0\u660E\u7C7B\u578B</td></tr></tbody></table><h3 id="\u53D8\u91CF\u548C\u5E38\u91CF" tabindex="-1"><a class="header-anchor" href="#\u53D8\u91CF\u548C\u5E38\u91CF" aria-hidden="true">#</a> \u53D8\u91CF\u548C\u5E38\u91CF</h3><p><strong>\u58F0\u660E\u53D8\u91CF\u5E76\u8D4B\u503C</strong></p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u58F0\u660E\u5355\u4E2A\u53D8\u91CF</span>
	<span class="token comment">//	\u8BED\u6CD51\uFF1Avar \u53D8\u91CF\u540D \u53D8\u91CF\u7C7B\u578B = \u53D8\u91CF\u503C	-- \u63A8\u8350\u4F7F\u7528</span>
	<span class="token comment">//	\u8BED\u6CD52\uFF1A\u53D8\u91CF\u540D := \u53D8\u91CF\u503C			-- \u63A8\u8350\u4F7F\u7528,\u4F46\u4EC5\u652F\u6301\u5728\u51FD\u6570\u5185\u90E8\u4F7F\u7528</span>
	<span class="token keyword">var</span> Monday <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">1</span>
	Tuesday <span class="token operator">:=</span> <span class="token number">2</span>

	<span class="token comment">// \u58F0\u660E\u591A\u4E2A\u53D8\u91CF</span>
	<span class="token comment">// \u8BED\u6CD51:</span>
	<span class="token comment">//		var (                                   -- \u63A8\u8350\u4F7F\u7528</span>
	<span class="token comment">//			\u53D8\u91CF\u540D1 \u53D8\u91CF\u7C7B\u578B = \u53D8\u91CF\u503C</span>
	<span class="token comment">//			\u53D8\u91CF\u540D2 \u53D8\u91CF\u7C7B\u578B = \u53D8\u91CF\u503C</span>
	<span class="token comment">//		)</span>
	<span class="token comment">// \u8BED\u6CD52: var \u53D8\u91CF\u540D1,\u53D8\u91CF\u540D2 \u53D8\u91CF\u7C7B\u578B = \u53D8\u91CF\u503C1, \u53D8\u91CF\u503C2</span>
	<span class="token keyword">var</span> <span class="token punctuation">(</span>
		Wednesday <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">3</span>
		Thursday  <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">4</span>
	<span class="token punctuation">)</span>

	<span class="token keyword">var</span> Friday<span class="token punctuation">,</span> Saturday<span class="token punctuation">,</span> Sunday <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span>

	<span class="token comment">// \u51FD\u6570\u5185\u58F0\u660E\u7684\u53D8\u91CF\u5FC5\u987B\u8981\u4F7F\u7528\uFF0C\u5426\u5219\u7F16\u8BD1\u4F1A\u62A5\u9519\uFF1B\u51FD\u6570\u5916\u7684\u53D8\u91CF\u53EF\u4EE5\u58F0\u660E\u4F46\u4E0D\u4F7F\u7528</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u5468\u4E00: &quot;</span><span class="token punctuation">,</span> Monday<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u5468\u4E8C: &quot;</span><span class="token punctuation">,</span> Tuesday<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u5468\u4E09: &quot;</span><span class="token punctuation">,</span> Wednesday<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u5468\u56DB: &quot;</span><span class="token punctuation">,</span> Thursday<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u5468\u4E94: &quot;</span><span class="token punctuation">,</span> Friday<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u5468\u516D: &quot;</span><span class="token punctuation">,</span> Saturday<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u5468\u65E5: &quot;</span><span class="token punctuation">,</span> Sunday<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code>\u5468\u4E00:  <span class="token number">1</span>
\u5468\u4E8C:  <span class="token number">2</span>
\u5468\u4E09:  <span class="token number">3</span>
\u5468\u56DB:  <span class="token number">4</span>
\u5468\u4E94:  <span class="token number">5</span>
\u5468\u516D:  <span class="token number">6</span>
\u5468\u65E5:  <span class="token number">7</span>
</code></pre></div><br><p><strong>\u58F0\u660E\u53D8\u91CF\u4E0D\u8D4B\u503C</strong></p><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u58F0\u660E\u4E0D\u8D4B\u503C,\u9ED8\u8BA4\u4F1A\u4F7F\u7528\u8BE5\u7C7B\u578B\u7684\u96F6\u503C</span>
	<span class="token keyword">var</span> Monday <span class="token builtin">int</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>Monday<span class="token punctuation">)</span> <span class="token comment">// 0</span>
<span class="token punctuation">}</span>
</code></pre></div><br><p><strong>\u58F0\u660E\u5E38\u91CF</strong></p><p>\u5E38\u91CF\u4F7F\u7528<code>const</code>\u5173\u952E\u5B57\u58F0\u660E\uFF0C\u4E0E<code>var</code>\u7528\u6CD5\u5F88\u7C7B\u4F3C\uFF0C\u8FD9\u91CC\u4E3B\u8981\u6F14\u793A\u4E00\u4E0B\u7279\u6B8A\u7684\u5730\u65B9</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>        
	<span class="token comment">// \u65B9\u5F0F1</span>
	<span class="token keyword">const</span> <span class="token punctuation">(</span>
		Monday  <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">4</span>
		Tuesday     <span class="token comment">// \u5728\u540C\u4E00\u4E2A\u62EC\u53F7\u5185\uFF0C\u82E5\u53D8\u91CF\u503C\u4E0D\u5199\uFF0C\u5219\u4FDD\u6301\u8DDF\u8DDD\u79BB\u6700\u8FD1\u7684\u4E00\u4E2A\u53D8\u91CF \u7C7B\u578B\u548C\u503C\u4E00\u6837</span>
	<span class="token punctuation">)</span>

	<span class="token comment">// \u65B9\u5F0F2</span>
	<span class="token keyword">const</span> <span class="token punctuation">(</span>
		Wednesday <span class="token operator">=</span> <span class="token boolean">iota</span> <span class="token operator">+</span> <span class="token number">3</span> <span class="token comment">// iota\u521D\u59CB\u4E3A0,  0 + 3 = 3</span>
		Thursday             <span class="token comment">// \u6BCF\u65B0\u589E\u4E00\u884Ciota\u81EA\u589E\u957F\uFF11, 1 + 3 = 4</span>
		Friday               <span class="token comment">//  \u540C\u7406, 2 + 3 =5</span>
		Saturday
		Sunday
	<span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u5468\u4E00: &quot;</span><span class="token punctuation">,</span> Monday<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u5468\u4E8C: &quot;</span><span class="token punctuation">,</span> Tuesday<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u5468\u4E09: &quot;</span><span class="token punctuation">,</span> Wednesday<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u5468\u56DB: &quot;</span><span class="token punctuation">,</span> Thursday<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u5468\u4E94: &quot;</span><span class="token punctuation">,</span> Friday<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u5468\u516D: &quot;</span><span class="token punctuation">,</span> Saturday<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u5468\u65E5: &quot;</span><span class="token punctuation">,</span> Sunday<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code>\u5468\u4E00:  <span class="token number">4</span>
\u5468\u4E8C:  <span class="token number">4</span>
\u5468\u4E09:  <span class="token number">3</span>
\u5468\u56DB:  <span class="token number">4</span>
\u5468\u4E94:  <span class="token number">5</span>
\u5468\u516D:  <span class="token number">6</span>
\u5468\u65E5:  <span class="token number">7</span>
</code></pre></div><h3 id="\u6307\u9488" tabindex="-1"><a class="header-anchor" href="#\u6307\u9488" aria-hidden="true">#</a> \u6307\u9488</h3><p>\u6307\u9488\u7684\u503C\u662F\u53D8\u91CF\u7684\u5185\u5B58\u5730\u5740\uFF0C\u4F7F\u7528\u6307\u9488\u53EF\u4EE5\u5728\u65E0\u9700\u77E5\u9053\u53D8\u91CF\u540D\u5B57\u7684\u60C5\u51B5\u4E0B\uFF0C\u95F4\u63A5\u8BFB\u53D6\u6216\u66F4\u65B0\u53D8\u91CF\u7684\u503C</p><p>\u6307\u9488\u7C7B\u578B\u7684\u96F6\u503C\u662Fnil</p><p>\u6307\u9488\u662F\u53EF\u4EE5\u6BD4\u8F83\u7684\uFF0C\u5F53\u4E24\u4E2A\u6307\u9488\u6307\u5411\u540C\u4E00\u4E2A\u53D8\u91CF\u6216\u4E24\u4E2A\u6307\u9488\u90FD\u4E3Anil\u7684\u65F6\u4ED6\u4EEC\u624D\u76F8\u7B49</p><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// (1) \u901A\u8FC7\u53D8\u91CF\u83B7\u53D6\u6307\u9488</span>
	name <span class="token operator">:=</span> <span class="token string">&quot;Bob&quot;</span>     <span class="token comment">// \u58F0\u660E\u53D8\u91CF</span>
	namePtr <span class="token operator">:=</span> <span class="token operator">&amp;</span>name  <span class="token comment">// \u83B7\u53D6\u8FD9\u4E2A\u53D8\u91CF\u7684\u6307\u9488\u8D4B\u503C\u7ED9 namePtr</span>
	<span class="token operator">*</span>namePtr <span class="token operator">=</span> <span class="token string">&quot;Jack&quot;</span> <span class="token comment">// \u901A\u8FC7\u6307\u9488\u83B7\u53D6\u53D8\u91CF\uFF0C\u5E76\u7ED9\u8FD9\u4E2A\u53D8\u91CF\u8D4B\u503C</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>     <span class="token comment">// Jack</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">*</span>namePtr<span class="token punctuation">)</span> <span class="token comment">// Jack</span>

	<span class="token comment">// (2) \u76F4\u63A5\u58F0\u660E\u6307\u9488\u5E76\u8D4B\u503C</span>
	<span class="token keyword">var</span> a <span class="token operator">*</span><span class="token builtin">string</span> <span class="token operator">=</span> namePtr
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">*</span>a<span class="token punctuation">)</span> <span class="token comment">// Jack</span>

	<span class="token comment">// (3) \u76F4\u63A5\u58F0\u660E\u7A7A\u6307\u9488,\u540E\u7EED\u8D4B\u503C\u4F1A\u5F15\u53D1panic, \u539F\u56E0\u662F\u5E76\u6CA1\u6709\u8FDB\u884C\u5185\u5B58\u5206\u914D,\u5BFC\u81F4\u65E0\u6CD5\u8D4B\u503C</span>
	<span class="token keyword">var</span> b <span class="token operator">*</span><span class="token builtin">int</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span> <span class="token comment">// &lt;nil&gt;, \u6307\u9488\u7C7B\u578B\u7684\u96F6\u503C\u4E3Anil, \u8FD9\u662F\u4E00\u4E2A\u7A7A\u6307\u9488</span>
	<span class="token comment">//fmt.Println(*b) // \u8FD9\u4F1A\u62A5\u9519, \u56E0\u4E3A\u6211\u4EEC\u81EA\u5DF1\u624B\u52A8\u8FD9\u6837\u521B\u5EFA\u7684\u6307\u9488\u7C7B\u578B,\u8FD8\u6CA1\u6709\u8FDB\u884C\u5185\u5B58\u5206\u914D,\u89E3\u51B3\u529E\u6CD5\u53EF\u4EE5\u4F7F\u7528new\u548Cmake</span>

	<span class="token comment">// (4) \u5BF9\u4E8E\u503C\u7C7B\u578B\u6570\u636E\u7ED3\u6784,\u4F7F\u7528new\u58F0\u660E\u548C\u5206\u914D\u5185\u5B58\u5E76\u8FD4\u56DE\u6307\u9488\u53D8\u91CF</span>
	c <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">)</span>
	<span class="token operator">*</span>c <span class="token operator">=</span> <span class="token number">200</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">*</span>c<span class="token punctuation">)</span>

	<span class="token comment">// (5) \u5BF9\u4E0E\u5F15\u7528\u6570\u636E\u7ED3\u6784,\u4F7F\u7528make\u58F0\u660E\u548C\u5206\u914D\u5185\u5B58\u5E76\u8FD4\u56DE\u53D8\u91CF(\u6CE8\u610F\u8FD4\u56DE\u7684\u4E0D\u662F\u6307\u9488,\u56E0\u4E3A\u5F15\u7528\u7C7B\u578B\u5C31\u6CA1\u6709\u5FC5\u8981\u7528\u6307\u9488\u4E86)</span>
	s1 <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
	s1<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">300</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span>        <span class="token comment">// [300]</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%T\\n&quot;</span><span class="token punctuation">,</span> s1<span class="token punctuation">)</span> <span class="token comment">// []int</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="print\u7CFB\u5217\u51FD\u6570" tabindex="-1"><a class="header-anchor" href="#print\u7CFB\u5217\u51FD\u6570" aria-hidden="true">#</a> print\u7CFB\u5217\u51FD\u6570</h3>`,35),B=s("\u6587\u6863\uFF1A"),D={href:"https://pkg.go.dev/fmt",target:"_blank",rel:"noopener noreferrer"},L=s("https://pkg.go.dev/fmt"),E=p(`<table><thead><tr><th>\u5206\u7C7B</th><th>\u51FD\u6570</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td>\u8F93\u51FA\u5230\u63A7\u5236\u53F0</td><td><code>fmt.Print(string)</code></td><td>\u4E0D\u6362\u884C</td></tr><tr><td></td><td><code>fmt.Println(string)</code></td><td>\u81EA\u52A8\u6362\u884C\uFF0C<code>ln</code>\u610F\u4E3A<code>line</code></td></tr><tr><td></td><td><code>fmt.Printf(\u683C\u5F0F\u5316\u5B57\u7B26, \u5B57\u7B26\u4E32)</code></td><td>\u683C\u5F0F\u5316\u8F93\u51FA</td></tr><tr><td>\u4F5C\u4E3A\u8FD4\u56DE\u503C\u8FD4\u56DE</td><td><code>fmt.Sprint()</code></td><td></td></tr><tr><td></td><td><code>fmt.Sprintln()</code></td><td></td></tr><tr><td></td><td><code>fmt.Sprintf(\u683C\u5F0F\u5316\u5B57\u7B26, \u5B57\u7B26\u4E32\u5BF9\u8C61)</code></td><td></td></tr><tr><td>\u63A5\u6536\u7528\u6237\u8F93\u5165</td><td><code>fmt.Scan(\u6307\u9488\u5BF9\u8C61)</code></td><td>\u5C06\u63A7\u5236\u53F0\u63A5\u6536\u7684\u503C \u8D4B\u503C\u7ED9\u6307\u9488\u5BF9\u8C61</td></tr></tbody></table><p><code>printf</code>\u683C\u5F0F\u5316\u5B57\u7B26\u4E32</p><table><thead><tr><th>\u5206\u7C7B</th><th>\u4FEE\u9970\u7B26</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td>\u5E38\u7528</td><td><code>%T</code></td><td>\u6570\u636E\u7C7B\u578B</td></tr><tr><td></td><td><code>%v</code></td><td>\u83B7\u53D6\u6570\u636E\u7684\u503C\uFF0C\u5982\u679C\u5B9E\u73B0\u4E86 <code>error </code>\u63A5\u53E3\uFF0C\u4EC5\u8868\u793A\u9519\u8BEF\u6D88\u606F</td></tr><tr><td></td><td><code>%+v</code></td><td>\u83B7\u53D6\u6570\u636E\u7684\u503C\uFF0C\u5982\u679C\u662F\u7ED3\u6784\u4F53\u4F1A\u643A\u5E26\u5B57\u6BB5\u540D</td></tr><tr><td></td><td><code>%#v</code></td><td>\u83B7\u53D6\u6570\u636E\u7684\u503C\uFF0C\u5982\u679C\u662F\u7ED3\u6784\u4F53\u4F1A\u643A\u5E26\u7ED3\u6784\u4F53\u540D\u548C\u5B57\u6BB5\u540D</td></tr><tr><td>\u6307\u9488</td><td><code>%p</code></td><td>\u6307\u9488\u5730\u5740\uFF08\u5E26 <code>0x</code>\uFF09</td></tr><tr><td></td><td><code>%#p</code></td><td>\u6307\u9488\u5730\u5740\uFF08\u4E0D\u5E26 <code>0x</code>\uFF09</td></tr><tr><td>\u5B57\u7B26\u4E32</td><td><code>%s</code></td><td>\u5B57\u7B26\u4E32\u6216\u5B57\u8282\u5207\u7247</td></tr><tr><td></td><td><code>%c</code></td><td>Unicode\u7801\u70B9\u5BF9\u5E94\u7684\u5B57\u7B26</td></tr><tr><td></td><td><code>%q</code></td><td>\u5BF9\u4E8E\u5B57\u7B26\u4E32\u6216\u5B57\u8282\u5207\u7247\uFF0C\u7ED3\u679C\u4F1A\u52A0\u4E0A\u53CC\u5F15\u53F7\uFF1B<br>\u5BF9\u4E8E<code>byte</code>\u6216<code>rune\uFF0C</code>\u7ED3\u679C\u4F1A\u52A0\u4E0A\u5355\u5F15\u53F7</td></tr><tr><td>\u5B57\u7B26\u4E32\u5BBD\u5EA6</td><td><code>%5s</code></td><td>\u6700\u5C0F\u5BBD\u5EA6\u4E3A5\uFF08\u9ED8\u8BA4\u53F3\u5BF9\u9F50\uFF09</td></tr><tr><td></td><td><code>%-5s</code></td><td>\u6700\u5C0F\u5BBD\u5EA6\u4E3A5\uFF08\u5DE6\u5BF9\u9F50\uFF09</td></tr><tr><td></td><td><code>%.5s</code></td><td>\u6700\u5927\u5BBD\u5EA6\u4E3A5\uFF0C\u591A\u51FA\u90E8\u5206\u4F1A\u622A\u65AD</td></tr><tr><td></td><td><code>%5.7s</code></td><td>\u6700\u5C0F\u5BBD\u5EA6\u4E3A5\uFF0C\u6700\u5927\u5BBD\u5EA6\u4E3A7</td></tr><tr><td></td><td><code>%-5.7s</code></td><td>\u6700\u5C0F\u5BBD\u5EA6\u4E3A5\uFF0C\u6700\u5927\u5BBD\u5EA6\u4E3A7\uFF08\u5DE6\u5BF9\u9F50\uFF09</td></tr><tr><td></td><td><code>%5.3s</code></td><td>\u5982\u679C\u5BBD\u5EA6\u5927\u4E8E3\uFF0C\u5219\u622A\u65AD</td></tr><tr><td></td><td><code>%05s</code></td><td>\u5982\u679C\u5BBD\u5EA6\u5C0F\u4E8E5\uFF0C\u5C31\u4F1A\u5728\u5B57\u7B26\u4E32\u524D\u9762\u8865\u96F6</td></tr><tr><td>\u6574\u578B</td><td><code>%b</code></td><td>\u4E8C\u8FDB\u5236\u6570</td></tr><tr><td></td><td><code>%o</code></td><td>\u516B\u8FDB\u5236\u6570</td></tr><tr><td></td><td><code>%#o</code></td><td>\u516B\u8FDB\u5236\u6570</td></tr><tr><td></td><td><code>%d</code></td><td>\u5341\u8FDB\u5236\u6570</td></tr><tr><td></td><td><code>%x</code></td><td>\u6253\u537016\u8FDB\u5236\u6570\uFF0Ca-f</td></tr><tr><td></td><td><code>%X</code></td><td>\u6253\u537016\u8FDB\u5236\u6570\uFF0CA-F</td></tr><tr><td></td><td><code>%#x</code>\u3001<code>%#X</code></td><td>\u6253\u537016\u8FDB\u5236\u6570\uFF0C\u5E26<code>0x</code>\u3001<code>0X</code></td></tr><tr><td></td><td><code>% x</code>\u3001<code>% X</code></td><td>\u6253\u537016\u8FDB\u5236\u6570\uFF0C\u524D\u9762\u5E26\u4E00\u4E2A\u7A7A\u683C</td></tr><tr><td>\u6D6E\u70B9\u6570</td><td><code>%f</code></td><td>\u6D6E\u70B9\u6570, \u9ED8\u8BA4\u4FDD\u75596\u4F4D\u5C0F\u6570\uFF0C\u5373<code>%.6</code></td></tr><tr><td></td><td><code>%e</code></td><td>\u79D1\u5B66\u8BA1\u6570\u6CD5\uFF0C\u9ED8\u8BA4\u4FDD\u75596\u4F4D\u5C0F\u6570\uFF0C\u5373<code>%.6e</code></td></tr><tr><td>\u6307\u9488</td><td><code>%p</code></td><td>\u6307\u9488\uFF0C\u5341\u516D\u8FDB\u5236\u8868\u793A\uFF0C\u5E26\u524D\u7F00<code>0x</code></td></tr><tr><td></td><td><code>%#p</code></td><td>\u6307\u9488\uFF0C\u5341\u516D\u8FDB\u5236\u8868\u793A\uFF0C\u4E0D\u5E26\u524D\u7F00<code>0x</code></td></tr><tr><td>\u5E03\u5C14\u503C</td><td><code>%t</code></td><td>\u6253\u5370<code>true</code>\u6216<code>false</code></td></tr></tbody></table><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name <span class="token builtin">string</span>
	Age  <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	person <span class="token operator">:=</span> Person<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">&quot;Bob&quot;</span><span class="token punctuation">,</span> Age<span class="token punctuation">:</span> <span class="token number">20</span><span class="token punctuation">}</span>
	numbers <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">}</span>

	<span class="token comment">// \u5E38\u7528\u7C7B\u578B</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%T\\n&quot;</span><span class="token punctuation">,</span> person<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%v\\n&quot;</span><span class="token punctuation">,</span> person<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%+v\\n&quot;</span><span class="token punctuation">,</span> person<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%#v\\n&quot;</span><span class="token punctuation">,</span> person<span class="token punctuation">)</span>
	<span class="token comment">//main.Person</span>
	<span class="token comment">//{Bob 20}</span>
	<span class="token comment">//{Name:Bob Age:20}</span>
	<span class="token comment">//main.Person{Name:&quot;Bob&quot;, Age:20}</span>

	<span class="token comment">// \u6307\u9488\u7C7B\u578B\uFF0C\u503C\u7C7B\u578B\u9700\u8981\u4F7F\u7528&amp;\u83B7\u53D6\u6307\u9488\u5730\u5740\uFF0C\u5F15\u7528\u7C7B\u578B\u52A0\u4E0D\u52A0&amp;\u90FD\u53EF\u4EE5</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%p, %p\\n&quot;</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>person<span class="token punctuation">,</span> numbers<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%#p, %#p\\n&quot;</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>person<span class="token punctuation">,</span> <span class="token operator">&amp;</span>numbers<span class="token punctuation">)</span>
	<span class="token comment">//0xc000004078, 0xc0000161e0</span>
	<span class="token comment">//c000004078, c0000161e0</span>

	<span class="token comment">// \u5B57\u7B26\u4E32</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%s, %s\\n&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\u5317\u4EAC&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">&quot;\u5317\u4EAC&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%#x\\n&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">rune</span><span class="token punctuation">(</span><span class="token string">&quot;\u5317\u4EAC&quot;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// 0x5317, \u5B57\u7B26\u4E32 -&gt; unicode -&gt; 16\u8FDB\u5236</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%c\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">0x5317</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%q, %q, %q\\n&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\u5317\u4EAC&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">&quot;\u5317\u4EAC&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0x5317</span><span class="token punctuation">)</span>
	<span class="token comment">//\u5317\u4EAC, \u5317\u4EAC</span>
	<span class="token comment">//0x5317</span>
	<span class="token comment">//\u5317</span>
	<span class="token comment">//&quot;\u5317\u4EAC&quot;, &quot;\u5317\u4EAC&quot;, &#39;\u5317&#39;</span>

	<span class="token comment">// \u5B57\u7B26\u4E32\u5BBD\u5EA6</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%5s\\n&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;ABC&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%-5s\\n&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;ABC&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%.5s\\n&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;ABCDEF&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%5.3s\\n&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;ABCDEF&quot;</span><span class="token punctuation">)</span>
	<span class="token comment">//ABC</span>
	<span class="token comment">//ABC</span>
	<span class="token comment">//ABCDE</span>
	<span class="token comment">//ABC</span>

	<span class="token comment">// \u6574\u578B</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%b\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%o\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%#o\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%x\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%X\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%X\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%#x\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%#X\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;% X\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">)</span>
	<span class="token comment">//11</span>
	<span class="token comment">//11</span>
	<span class="token comment">//011</span>
	<span class="token comment">//f</span>
	<span class="token comment">//F</span>
	<span class="token comment">//F</span>
	<span class="token comment">//0xf</span>
	<span class="token comment">//0XF</span>
	<span class="token comment">// F</span>

	<span class="token comment">// 	\u6D6E\u70B9\u6570</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%.2f\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">2.985</span><span class="token punctuation">)</span>                     <span class="token comment">// \u5E76\u975E\u56DB\u820D\u4E94\u5165</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%.2f\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">2.986</span><span class="token punctuation">)</span>                     <span class="token comment">// \u4E5F\u4E0D\u662F\u5B8C\u5168\u820D\u53BB\u5C0F\u6570</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%f\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">3.3333333333333333333333333</span><span class="token punctuation">)</span> <span class="token comment">// \u9ED8\u8BA4\u4FDD\u7559\u516D\u4F4D\u5C0F\u6570</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%f\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">3.0</span><span class="token punctuation">)</span>                         <span class="token comment">// \u9ED8\u8BA4\u4FDD\u7559\u516D\u4F4D\u5C0F\u6570\uFF0C\u5373%.06</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%e\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">123456.789</span><span class="token punctuation">)</span>                  <span class="token comment">// \u79D1\u5B66\u8BA1\u6570\u6CD5\uFF0C \u9ED8\u8BA4\u4E3A%.6e\uFF1B\u8BA1\u7B97\u65B9\u6CD5\u4E3A\uFF1A123456.789 = 1.23456789 * 10^5 = 1.23456789e5\uFF0C\u53C8\u56E0\u4E3A\u662F\u4FDD\u75596\u4F4D\u5C0F\u6570\uFF0C\u6240\u4EE51.234568</span>

	<span class="token comment">// \u6307\u9488</span>
	a <span class="token operator">:=</span> <span class="token number">1</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%p\\n&quot;</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>a<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%#p\\n&quot;</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>a<span class="token punctuation">)</span>
	<span class="token comment">//0xc0000181c0</span>
	<span class="token comment">//c0000181c0</span>

	<span class="token comment">// \u5E03\u5C14\u503C</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%t\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token operator">&gt;</span> <span class="token number">2</span><span class="token punctuation">)</span>
	<span class="token comment">// false</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h3 id="\u7B97\u672F\u8FD0\u7B97\u7B26" tabindex="-1"><a class="header-anchor" href="#\u7B97\u672F\u8FD0\u7B97\u7B26" aria-hidden="true">#</a> \u7B97\u672F\u8FD0\u7B97\u7B26</h3><table><thead><tr><th>\u8FD0\u7B97\u7B26</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td>+</td><td>\u52A0</td></tr><tr><td>-</td><td>\u51CF</td></tr><tr><td>*</td><td>\u4E58</td></tr><tr><td>/</td><td>\u9664\uFF0C<br>\u6574\u6570\u76F8\u9664\u4F1A\u820D\u5F03\u5C0F\u6570\u90E8\u5206\uFF0C\u6BD4\u5982<code>10 /3 = 3</code>, <br>\u6709\u4EFB\u610F\u4E00\u4E2A\u662F\u6D6E\u70B9\u6570\u7ED3\u679C\u5C31\u662F\u6D6E\u70B9\u6570\uFF0C\u6BD4\u5982<code>10 / 3.0 = 3.3333333333333335</code></td></tr><tr><td>%</td><td>\u53D6\u4F59\uFF0C\u503C\u7684\u7B26\u53F7\u548C\u9664\u6570\u7B26\u53F7\u4FDD\u6301\u4E00\u81F4<br><code>10 % 3 = 1</code><br><code>10 % -3 = 1</code><br><code>-10 % 3 = -1</code></td></tr><tr><td>++</td><td>\u652F\u6301i++\uFF0C\u4F46\u4E0D\u652F\u6301++i</td></tr><tr><td>--</td><td>\u540C++</td></tr></tbody></table><p>\u793A\u4F8B\u4EE3\u7801</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>           <span class="token comment">// 2</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span>           <span class="token comment">// 0</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span>           <span class="token comment">// 4</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token number">3</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span>           <span class="token comment">// 1, \u6574\u6570\u76F8\u9664\u4F1A\u820D\u5F03\u5C0F\u6570\u90E8\u5206</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token number">10</span> <span class="token operator">/</span> <span class="token number">3.0</span><span class="token punctuation">)</span>        <span class="token comment">// 3.3333333333333335</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token number">10</span> <span class="token operator">/</span> <span class="token function">float32</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 3.3333333</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token number">10</span> <span class="token operator">/</span> <span class="token function">float64</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 3.3333333333333335, \u9ED8\u8BA4\u7684\u6D6E\u70B9\u6570\u662Ffloat64</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token number">10</span> <span class="token operator">%</span> <span class="token number">3</span><span class="token punctuation">)</span>          <span class="token comment">// 1</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">10</span> <span class="token operator">%</span> <span class="token number">3</span><span class="token punctuation">)</span>         <span class="token comment">// -1</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token number">10</span> <span class="token operator">%</span> <span class="token operator">-</span><span class="token number">3</span><span class="token punctuation">)</span>         <span class="token comment">// 1</span>

	i <span class="token operator">:=</span> <span class="token number">1</span>
	<span class="token comment">// \u4E0B\u9762\u4F7F\u7528\u90FD\u4F1A\u62A5\u8BED\u6CD5\u9519\u8BEF\uFF0C i++\u662F\u4E00\u6761\u8BED\u53E5\uFF0C\u4E0D\u662F\u8868\u8FBE\u5F0F\uFF0C\u6CA1\u6709\u8FD4\u56DE\u503C</span>
	<span class="token comment">//j := i++</span>
	<span class="token comment">//fmt.Println(i++)</span>
	i<span class="token operator">++</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token comment">// 2</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h3 id="\u4F4D\u8FD0\u7B97\u7B26" tabindex="-1"><a class="header-anchor" href="#\u4F4D\u8FD0\u7B97\u7B26" aria-hidden="true">#</a> \u4F4D\u8FD0\u7B97\u7B26</h3><p><strong>\u539F\u7801\u53CD\u7801\u8865\u7801</strong></p><ul><li>\u539F\u7801\uFF1A\u6700\u9AD8\u4F4D\u8868\u793A\u7B26\u53F7\u4F4D\uFF0C0\u8868\u793A\u6B63\uFF0C1\u8868\u793A\u8D1F\uFF0C\u6240\u4EE5 -&gt; 0000 0001</li><li>\u53CD\u7801 <ul><li>\u6B63\u6570\u7684\u53CD\u7801\u7B49\u4E8E\u539F\u7801</li><li>\u8D1F\u6570\u7684\u53CD\u7801\u7B49\u4E8E\u539F\u7801\u6309\u4F4D\u53D6\u53CD\uFF08\u7B26\u53F7\u4F4D\u9664\u5916\uFF09</li></ul></li><li>\u8865\u7801 <ul><li>\u6B63\u6570\u7684\u8865\u7801\u7B49\u4E8E\u539F\u7801</li><li>\u8D1F\u6570\u7684\u8865\u7801\u7B49\u4E8E\u53CD\u7801+1</li></ul></li></ul><p><strong>\u793A\u4F8B\u4EE3\u7801</strong></p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;strconv&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">BitReverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;^\u6309\u4F4D\u53D6\u53CD:\\n&quot;</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6709\u7B26\u53F7\u6570\u5B57\u6309\u4F4D\u53D6\u53CD</span>
	<span class="token comment">// \u8BA1\u7B97\u516C\u5F0F\uFF1A^n = (n + 1) * -1 (n\u662F\u6709\u7B26\u53F7\u6570\u5B57\uFF0C\u53EF\u80FD\u662F\u6B63\u6570\u4E5F\u53EF\u80FD\u662F\u8D1F\u6570)</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int32</span><span class="token punctuation">{</span><span class="token operator">-</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;^int32(%-5s = %d\\n&quot;</span><span class="token punctuation">,</span> strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span><span class="token function">int</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">&quot;)&quot;</span><span class="token punctuation">,</span> <span class="token operator">^</span>v<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u65E0\u7B26\u53F7\u6570\u5B57\u6309\u4F4D\u53D6\u53CD</span>
	<span class="token comment">// \u8BA1\u7B97\u516C\u5F0F\uFF1A^n = \u8BE5\u7C7B\u578B\u6700\u5927\u503C - (n+1) \uFF08n\u662F\u65E0\u7B26\u53F7\u6570\u5B57\uFF0C&gt;=0\uFF09</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">uint8</span><span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;^uint8(%-5s = %d\\n&quot;</span><span class="token punctuation">,</span> strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span><span class="token function">int</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">&quot;)&quot;</span><span class="token punctuation">,</span> <span class="token operator">^</span>v<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
    <span class="token comment">// \u5907\u6CE8: \u8FD9\u91CC\u6211\u4EEC\u5C06^\u4F5C\u4E3A\u4E00\u5143\u8FD0\u7B97\u7B26\u4F7F\u7528\uFF0C\u5B83\u8FD8\u53EF\u4EE5\u4F5C\u4E3A\u4E8C\u5143\u8FD0\u7B97\u7B26\u4F7F\u7528\u3002</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">LeftShift</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\\n&lt;&lt;\u5DE6\u79FB\u4F4D:\\n&quot;</span><span class="token punctuation">)</span>

	<span class="token comment">// \u8BA1\u7B97\u516C\u5F0F\uFF1An&lt;&lt;m = n*(2\u7684m\u6B21\u65B9) \uFF08n\u4E3A10\u8FDB\u5236\u6570\uFF09</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d&lt;&lt;1=%d     %d&lt;&lt;2=%d     %d&lt;&lt;3=%d\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> i<span class="token operator">&lt;&lt;</span><span class="token number">1</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> i<span class="token operator">&lt;&lt;</span><span class="token number">2</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> i<span class="token operator">&lt;&lt;</span><span class="token number">3</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">RightShift</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\\n&gt;&gt;\u53F3\u79FB\u4F4D:\\n&quot;</span><span class="token punctuation">)</span>

	<span class="token comment">// \u8BA1\u7B97\u516C\u5F0F\uFF1An&gt;&gt;m = int(n/(2\u7684m\u6B21\u65B9)) \uFF08n\u4E3A10\u8FDB\u5236\u6570\uFF09</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">10</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">30</span><span class="token punctuation">;</span> i <span class="token operator">+=</span> <span class="token number">10</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d&gt;&gt;1=%d     %d&gt;&gt;2=%d     %d&gt;&gt;3=%d\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> i<span class="token operator">&gt;&gt;</span><span class="token number">1</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> i<span class="token operator">&gt;&gt;</span><span class="token number">2</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> i<span class="token operator">&gt;&gt;</span><span class="token number">3</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u6309\u4F4D\u53D6\u53CD</span>
	<span class="token function">BitReverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u5DE6\u79FB\u4F4D</span>
	<span class="token function">LeftShift</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u53F3\u79FB\u4F4D</span>
	<span class="token function">RightShift</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code>^\u6309\u4F4D\u53D6\u53CD:
^int32<span class="token punctuation">(</span>-200<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">199</span>              
^int32<span class="token punctuation">(</span>-100<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">99</span>               
^int32<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>    <span class="token operator">=</span> -1               
^int32<span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span>  <span class="token operator">=</span> -101             
^int32<span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span>  <span class="token operator">=</span> -201             
^uint8<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>    <span class="token operator">=</span> <span class="token number">255</span>              
^uint8<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>    <span class="token operator">=</span> <span class="token number">254</span>              
^uint8<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>    <span class="token operator">=</span> <span class="token number">253</span>              
                                
<span class="token operator">&lt;&lt;</span>\u5DE6\u79FB\u4F4D:                       
<span class="token operator"><span class="token file-descriptor important">0</span>&lt;</span><span class="token operator">&lt;</span><span class="token number">1</span><span class="token operator">=</span><span class="token number">0</span>     <span class="token operator"><span class="token file-descriptor important">0</span>&lt;</span><span class="token operator">&lt;</span><span class="token number">2</span><span class="token operator">=</span><span class="token number">0</span>     <span class="token operator"><span class="token file-descriptor important">0</span>&lt;</span><span class="token operator">&lt;</span><span class="token number">3</span><span class="token operator">=</span><span class="token number">0</span>    
<span class="token operator"><span class="token file-descriptor important">1</span>&lt;</span><span class="token operator">&lt;</span><span class="token number">1</span><span class="token operator">=</span><span class="token number">2</span>     <span class="token operator"><span class="token file-descriptor important">1</span>&lt;</span><span class="token operator">&lt;</span><span class="token number">2</span><span class="token operator">=</span><span class="token number">4</span>     <span class="token operator"><span class="token file-descriptor important">1</span>&lt;</span><span class="token operator">&lt;</span><span class="token number">3</span><span class="token operator">=</span><span class="token number">8</span>    
<span class="token operator"><span class="token file-descriptor important">2</span>&lt;</span><span class="token operator">&lt;</span><span class="token number">1</span><span class="token operator">=</span><span class="token number">4</span>     <span class="token operator"><span class="token file-descriptor important">2</span>&lt;</span><span class="token operator">&lt;</span><span class="token number">2</span><span class="token operator">=</span><span class="token number">8</span>     <span class="token operator"><span class="token file-descriptor important">2</span>&lt;</span><span class="token operator">&lt;</span><span class="token number">3</span><span class="token operator">=</span><span class="token number">16</span>   
<span class="token operator"><span class="token file-descriptor important">3</span>&lt;</span><span class="token operator">&lt;</span><span class="token number">1</span><span class="token operator">=</span><span class="token number">6</span>     <span class="token operator"><span class="token file-descriptor important">3</span>&lt;</span><span class="token operator">&lt;</span><span class="token number">2</span><span class="token operator">=</span><span class="token number">12</span>     <span class="token operator"><span class="token file-descriptor important">3</span>&lt;</span><span class="token operator">&lt;</span><span class="token number">3</span><span class="token operator">=</span><span class="token number">24</span>  
                                
<span class="token operator">&gt;&gt;</span>\u53F3\u79FB\u4F4D:                       
<span class="token number">1</span><span class="token operator"><span class="token file-descriptor important">0</span>&gt;&gt;</span><span class="token number">1</span><span class="token operator">=</span><span class="token number">5</span>     <span class="token number">1</span><span class="token operator"><span class="token file-descriptor important">0</span>&gt;&gt;</span><span class="token number">2</span><span class="token operator">=</span><span class="token number">2</span>     <span class="token number">1</span><span class="token operator"><span class="token file-descriptor important">0</span>&gt;&gt;</span><span class="token number">3</span><span class="token operator">=</span><span class="token number">1</span> 
<span class="token number">2</span><span class="token operator"><span class="token file-descriptor important">0</span>&gt;&gt;</span><span class="token number">1</span><span class="token operator">=</span><span class="token number">10</span>     <span class="token number">2</span><span class="token operator"><span class="token file-descriptor important">0</span>&gt;&gt;</span><span class="token number">2</span><span class="token operator">=</span><span class="token number">5</span>     <span class="token number">2</span><span class="token operator"><span class="token file-descriptor important">0</span>&gt;&gt;</span><span class="token number">3</span><span class="token operator">=</span><span class="token number">2</span>
<span class="token number">3</span><span class="token operator"><span class="token file-descriptor important">0</span>&gt;&gt;</span><span class="token number">1</span><span class="token operator">=</span><span class="token number">15</span>     <span class="token number">3</span><span class="token operator"><span class="token file-descriptor important">0</span>&gt;&gt;</span><span class="token number">2</span><span class="token operator">=</span><span class="token number">7</span>     <span class="token number">3</span><span class="token operator"><span class="token file-descriptor important">0</span>&gt;&gt;</span><span class="token number">3</span><span class="token operator">=</span><span class="token number">3</span>
</code></pre></div><h3 id="\u5FAA\u73AF\u8BED\u53E5" tabindex="-1"><a class="header-anchor" href="#\u5FAA\u73AF\u8BED\u53E5" aria-hidden="true">#</a> \u5FAA\u73AF\u8BED\u53E5</h3><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// ------------------------- \u57FA\u7840\u8BED\u6CD5 --------------------------------</span>
	<span class="token comment">// C\u8BED\u8A00\u98CE\u683C\u5FAA\u73AF</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// range\u5FAA\u73AF</span>
	list <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">}</span>
	<span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> list <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%#v[%d]=%d\\n&quot;</span><span class="token punctuation">,</span> list<span class="token punctuation">,</span> k<span class="token punctuation">,</span> v<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u7C7B\u4F3Cwhile</span>
	n <span class="token operator">:=</span> <span class="token number">6</span>
	<span class="token keyword">for</span> n <span class="token operator">&lt;=</span> <span class="token number">8</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
		n<span class="token operator">++</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u6B7B\u5FAA\u73AF</span>
	<span class="token comment">//for {</span>
	<span class="token comment">//	fmt.Println(time.Now())</span>
	<span class="token comment">//}</span>

	<span class="token comment">// ------------------------- \u9677\u9631 --------------------------------</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\u9677\u9631\u4EE3\u7801\uFF1A&quot;</span><span class="token punctuation">)</span>
	data1 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">,</span> <span class="token number">300</span><span class="token punctuation">}</span>
	data2 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> data1 <span class="token punctuation">{</span>
		data2 <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>data2<span class="token punctuation">,</span> <span class="token operator">&amp;</span>v<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> data2 <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">*</span>v<span class="token punctuation">)</span> <span class="token comment">// \u8F93\u51FA3\u4E2A300</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// \u539F\u56E0</span>
	<span class="token comment">// v\u662F\u4E00\u4E2A\u4E34\u65F6\u53D8\u91CF\uFF0C\u6BCF\u6B21\u5FAA\u73AF\u5E76\u4E0D\u91CD\u65B0\u5206\u914D\u5185\u5B58\u5730\u5740\uFF0C\u800C\u662F\u4EC5\u6539\u503C\u800C\u5DF2\uFF0C</span>
	<span class="token comment">// \u8FD9\u5C31\u5BFC\u81F4\u5F53\u6700\u540E\u4E00\u6B21\u5FAA\u73AF\u5B8C\u6210\u540E\uFF0Cv\u7684\u503C\u88AB\u91CD\u7F6E\u4E3A300</span>

	<span class="token comment">// ------------------------- \u89E3\u51B3 --------------------------------</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\u4FEE\u6B63\u4EE3\u7801-\u65B9\u5F0F1\uFF1A&quot;</span><span class="token punctuation">)</span>
	data3 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token keyword">for</span> k<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> <span class="token keyword">range</span> data1 <span class="token punctuation">{</span>
		data3 <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>data3<span class="token punctuation">,</span> <span class="token operator">&amp;</span>data1<span class="token punctuation">[</span>k<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// \u901A\u8FC7key\u6765\u83B7\u53D6\u539F\u59CB\u6570\u636Edata1\u4E2D\u7684\u5730\u5740</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> data3 <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">*</span>v<span class="token punctuation">)</span> <span class="token comment">// \u8F93\u51FA100 200 300</span>
	<span class="token punctuation">}</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\u4FEE\u6B63\u4EE3\u7801-\u65B9\u5F0F2\uFF1A&quot;</span><span class="token punctuation">)</span>
	data4 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> data1 <span class="token punctuation">{</span>
		temp <span class="token operator">:=</span> v <span class="token comment">//\u4F7F\u7528\u65B0\u53D8\u91CF\uFF0C\u6BCF\u6B21\u5FAA\u73AF\u90FD\u4F1A\u91CD\u65B0\u5F00\u8F9F\u5185\u5B58\u7A7A\u95F4</span>
		data4 <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>data4<span class="token punctuation">,</span> <span class="token operator">&amp;</span>temp<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> data4 <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">*</span>v<span class="token punctuation">)</span> <span class="token comment">// \u8F93\u51FA100 200 300</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token number">0</span>
<span class="token number">1</span>                  
<span class="token number">2</span>                  
<span class="token punctuation">[</span><span class="token punctuation">]</span>int<span class="token punctuation">{</span><span class="token number">3</span>, <span class="token number">4</span>, <span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token number">3</span>
<span class="token punctuation">[</span><span class="token punctuation">]</span>int<span class="token punctuation">{</span><span class="token number">3</span>, <span class="token number">4</span>, <span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token number">4</span>
<span class="token punctuation">[</span><span class="token punctuation">]</span>int<span class="token punctuation">{</span><span class="token number">3</span>, <span class="token number">4</span>, <span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token number">5</span>
<span class="token number">6</span>                  
<span class="token number">7</span>                  
<span class="token number">8</span>                  
                   
\u9677\u9631\u4EE3\u7801\uFF1A         
<span class="token number">300</span>                
<span class="token number">300</span>                
<span class="token number">300</span>                
                   
\u4FEE\u6B63\u4EE3\u7801-\u65B9\u5F0F1\uFF1A   
<span class="token number">100</span>                
<span class="token number">200</span>                
<span class="token number">300</span>                
                   
\u4FEE\u6B63\u4EE3\u7801-\u65B9\u5F0F2\uFF1A   
<span class="token number">100</span>                
<span class="token number">200</span>                
<span class="token number">300</span>      
</code></pre></div><h3 id="\u5224\u65AD\u8BED\u53E5" tabindex="-1"><a class="header-anchor" href="#\u5224\u65AD\u8BED\u53E5" aria-hidden="true">#</a> \u5224\u65AD\u8BED\u53E5</h3><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// if\u5224\u65AD</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;if\u5224\u65AD&quot;</span><span class="token punctuation">)</span>
	a <span class="token operator">:=</span> <span class="token number">100</span>
	b <span class="token operator">:=</span> <span class="token number">200</span>
	<span class="token keyword">if</span> x<span class="token punctuation">,</span> y <span class="token operator">:=</span> a<span class="token punctuation">,</span> b<span class="token punctuation">;</span> x <span class="token operator">&lt;</span> y <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d &lt; %d\\n&quot;</span><span class="token punctuation">,</span> x<span class="token punctuation">,</span> y<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// switch</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\\nswitch\u5224\u65AD&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">switch</span> i <span class="token punctuation">{</span>
		<span class="token keyword">case</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">:</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> <span class="token string">&quot;0-2&quot;</span><span class="token punctuation">)</span>
		<span class="token keyword">case</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">:</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> <span class="token string">&quot;1-3&quot;</span><span class="token punctuation">)</span>
		<span class="token keyword">default</span><span class="token punctuation">:</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> <span class="token string">&quot;Default&quot;</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\\nswitch-fallthrough\u5224\u65AD&quot;</span><span class="token punctuation">)</span>
	c <span class="token operator">:=</span> <span class="token number">100</span>
	<span class="token keyword">switch</span> c <span class="token punctuation">{</span>
	<span class="token keyword">case</span> <span class="token number">50</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;50&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">case</span> <span class="token number">100</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;100&quot;</span><span class="token punctuation">)</span>
		<span class="token keyword">fallthrough</span> <span class="token comment">// \u9047\u5230fallthrough\uFF0C\u4F1A\u7EE7\u7EED\u6267\u884C\u4EE3\u7801\u540E\u9762\u7684case\uFF0C default\u4E0D\u6267\u884C</span>
	<span class="token keyword">case</span> <span class="token number">200</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;200&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">case</span> <span class="token number">300</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;300&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">default</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Default&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code>if\u5224\u65AD
<span class="token number">100</span> <span class="token operator">&lt;</span> <span class="token number">200</span>             
                      
switch\u5224\u65AD            
<span class="token number">0</span> <span class="token number">0</span>-2                 
<span class="token number">1</span> <span class="token number">1</span>-3                 
<span class="token number">2</span> <span class="token number">0</span>-2                 
<span class="token number">3</span> <span class="token number">1</span>-3                 
<span class="token number">4</span> Default             
                      
switch-fallthrough\u5224\u65AD
<span class="token number">100</span>                   
<span class="token number">200</span>
</code></pre></div><h3 id="\u6D4B\u8BD5\u57FA\u7840" tabindex="-1"><a class="header-anchor" href="#\u6D4B\u8BD5\u57FA\u7840" aria-hidden="true">#</a> \u6D4B\u8BD5\u57FA\u7840</h3><table><thead><tr><th>\u529F\u80FD\\\u5C5E\u6027</th><th>\u6587\u4EF6\u540D\u8981\u6C42</th><th>\u51FD\u6570\u7B7E\u540D\u8981\u6C42</th><th>\u6267\u884C\u547D\u4EE4</th></tr></thead><tbody><tr><td>\u5355\u5143\u6D4B\u8BD5</td><td>\u6587\u4EF6\u540D\u8981\u4EE5<code>_test.go</code>\u7ED3\u5C3E</td><td><code>TestXX(t *testing.T)</code></td><td>\u6D4B\u8BD5\u5F53\u524D\u76EE\u5F55\u4E0B\u6240\u6709\u6587\u4EF6\uFF1A<code>go test .</code></td></tr><tr><td>\u6027\u80FD\u6D4B\u8BD5</td><td>\u6587\u4EF6\u540D\u8981\u4EE5<code>_test.go</code>\u7ED3\u5C3E</td><td><code>BenchmarkXX(b *testing.B)</code></td><td>\u6D4B\u8BD5\u5F53\u524D\u76EE\u5F55\u4E0B\u6240\u6709\u6587\u4EF6\uFF1A<code>go test -bench . </code></td></tr></tbody></table><p><strong>\u5355\u5143\u6D4B\u8BD5\u4E3E\u4F8B</strong></p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;testing&quot;</span>

<span class="token keyword">func</span> <span class="token function">Add</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n2 <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> n1 <span class="token operator">+</span> n2
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">TestAdd</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	tests <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">struct</span><span class="token punctuation">{</span> a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c <span class="token builtin">int</span> <span class="token punctuation">}</span><span class="token punctuation">{</span>
		<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">{</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">{</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">{</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// \u8FD9\u91CC\u6545\u610F\u5199\u9519</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> tests <span class="token punctuation">{</span>
		<span class="token keyword">if</span> ret <span class="token operator">:=</span> <span class="token function">Add</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span>a<span class="token punctuation">,</span> v<span class="token punctuation">.</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span> ret <span class="token operator">!=</span> v<span class="token punctuation">.</span>c <span class="token punctuation">{</span>
			t<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">&quot;Add(%d, %d) got %d, expectd %d\\n&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span>a<span class="token punctuation">,</span> v<span class="token punctuation">.</span>b<span class="token punctuation">,</span> ret<span class="token punctuation">,</span> v<span class="token punctuation">.</span>c<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token operator">==</span><span class="token operator">=</span> RUN   TestAdd
    a_test.go:19: Add<span class="token punctuation">(</span><span class="token number">6</span>, <span class="token number">7</span><span class="token punctuation">)</span> got <span class="token number">13</span>, expectd <span class="token number">14</span>
--- FAIL: TestAdd <span class="token punctuation">(</span><span class="token number">0</span>.00s<span class="token punctuation">)</span>

FAIL
</code></pre></div><p><strong>\u6027\u80FD\u6D4B\u8BD5\u4E3E\u4F8B</strong></p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;testing&quot;</span>

<span class="token keyword">func</span> <span class="token function">Add</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n2 <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> n1 <span class="token operator">+</span> n2
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">BenchmarkAdd</span><span class="token punctuation">(</span>b <span class="token operator">*</span>testing<span class="token punctuation">.</span>B<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	x <span class="token operator">:=</span> <span class="token number">10000</span>
	y <span class="token operator">:=</span> <span class="token operator">-</span><span class="token number">25000</span>
	z <span class="token operator">:=</span> <span class="token operator">-</span><span class="token number">15000</span>

	<span class="token comment">// \u8FD9\u91CC\u662F\u91CD\u7F6E\u65F6\u95F4\uFF0C\u5982\u679C\u4E0A\u9762\u6709\u8017\u65F6\u521D\u59CB\u5316\u7684\u8BDD\u53EF\u4EE5\u6DFB\u52A0\u8FD9\u4E00\u53E5</span>
	b<span class="token punctuation">.</span><span class="token function">ResetTimer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// b.N\u662F\u6027\u80FD\u6D4B\u8BD5\u4E3A\u6211\u4EEC\u63D0\u4F9B\u7684\u8BA1\u6570\u5668</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> b<span class="token punctuation">.</span>N<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> v <span class="token operator">:=</span> <span class="token function">Add</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span> v <span class="token operator">!=</span> z <span class="token punctuation">{</span>
			b<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">&quot;Add(%d, %d) got %d, expectd %d\\n&quot;</span><span class="token punctuation">,</span> x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> v<span class="token punctuation">,</span> z<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code>BenchmarkAdd-8          <span class="token number">1000000000</span>               <span class="token number">0.2460</span> ns/op
PASS
ok      learn   <span class="token number">0</span>.956s
</code></pre></div><h3 id="\u4EA4\u53C9\u7F16\u8BD1" tabindex="-1"><a class="header-anchor" href="#\u4EA4\u53C9\u7F16\u8BD1" aria-hidden="true">#</a> \u4EA4\u53C9\u7F16\u8BD1</h3><p>\u4EA4\u53C9\u7F16\u8BD1\u7B80\u5355\u6765\u8BF4\u6307\u7684\u662F\u5728\u5F53\u524D\u5E73\u53F0\u4E0A\u53EF\u4EE5\u7F16\u8BD1\u51FA\u5176\u4ED6\u5E73\u53F0\u7684\u53EF\u6267\u884C\u7A0B\u5E8F\uFF0C\u6BD4\u5982\u5728Windows\u4E0B\u7F16\u8BD1Linux\u4E8C\u8FDB\u5236\u7A0B\u5E8F</p><p>\u5BF9\u4E8E<code>go</code>\u6765\u8BF4\u4E3B\u8981\u63A7\u52363\u4E2A\u53D8\u91CF\uFF1A</p><ul><li><code>CGO_ENABLED=0</code>\uFF1AGo\u5728\u7F16\u8BD1\u65F6\u53EF\u4EE5\u9009\u62E9\u4F7F\u7528C\u94FE\u63A5\u5E93(C\u94FE\u63A5\u5E93\u4E0D\u6253\u5305\u8FDB\u7A0B\u5E8F)\u6216\u7EAFGo\u7F16\u8BD1(\u6253\u5305\u6240\u6709\u5185\u5BB9)\uFF0C<code>CGO_ENABLED</code>\u53C2\u6570\u63A7\u5236\u662F\u5426\u542F\u7528<code>CGO</code></li><li><code>GOOS=&lt;\u76EE\u6807\u5E73\u53F0\u7684\u64CD\u4F5C\u7CFB\u7EDF&gt;</code>\uFF0C\u6BD4\u5982<code>windows</code>\u3001<code>linux</code>\u3001<code>darwin</code>\u3001<code>freebsd</code></li><li><code>GOARCH=&lt;\u76EE\u6807\u5E73\u53F0\u7684\u4F53\u7CFB\u67B6\u6784&gt;</code>\uFF0C\u6BD4\u5982<code>amd64</code>,<code>386</code>\u3001<code>arm</code></li></ul><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># Windows\u4E0B\u7F16\u8BD1Linux\u548CMac64\u4F4D\u53EF\u6267\u884C\u7A0B\u5E8F</span>
SET <span class="token assign-left variable">CGO_ENABLED</span><span class="token operator">=</span><span class="token number">0</span>
SET <span class="token assign-left variable">GOOS</span><span class="token operator">=</span>linux
SET <span class="token assign-left variable">GOARCH</span><span class="token operator">=</span>amd64
go build <span class="token builtin class-name">.</span>

SET <span class="token assign-left variable">CGO_ENABLED</span><span class="token operator">=</span><span class="token number">0</span>
SET <span class="token assign-left variable">GOOS</span><span class="token operator">=</span>darwin
SET <span class="token assign-left variable">GOARCH</span><span class="token operator">=</span>amd64
go build <span class="token builtin class-name">.</span>

<span class="token comment"># Mac\u4E0B\u7F16\u8BD1Linux\u548CWindows64\u4F4D\u53EF\u6267\u884C\u7A0B\u5E8F</span>
<span class="token assign-left variable">CGO_ENABLED</span><span class="token operator">=</span><span class="token number">0</span> <span class="token assign-left variable">GOOS</span><span class="token operator">=</span>linux   <span class="token assign-left variable">GOARCH</span><span class="token operator">=</span>amd64 go build <span class="token builtin class-name">.</span>
<span class="token assign-left variable">CGO_ENABLED</span><span class="token operator">=</span><span class="token number">0</span> <span class="token assign-left variable">GOOS</span><span class="token operator">=</span>windows <span class="token assign-left variable">GOARCH</span><span class="token operator">=</span>amd64 go build <span class="token builtin class-name">.</span>

<span class="token comment"># Linux\u4E0B\u7F16\u8BD1Mac\u548CWindows 64\u4F4D\u53EF\u6267\u884C\u7A0B\u5E8F</span>
<span class="token assign-left variable">CGO_ENABLED</span><span class="token operator">=</span><span class="token number">0</span> <span class="token assign-left variable">GOOS</span><span class="token operator">=</span>darwin  <span class="token assign-left variable">GOARCH</span><span class="token operator">=</span>amd64 go build <span class="token builtin class-name">.</span>
<span class="token assign-left variable">CGO_ENABLED</span><span class="token operator">=</span><span class="token number">0</span> <span class="token assign-left variable">GOOS</span><span class="token operator">=</span>windows <span class="token assign-left variable">GOARCH</span><span class="token operator">=</span>amd64 go build <span class="token builtin class-name">.</span>
</code></pre></div><h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h2><h2 id="\u6570\u636E\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#\u6570\u636E\u7C7B\u578B" aria-hidden="true">#</a> \u6570\u636E\u7C7B\u578B</h2><h3 id="\u6570\u5B57" tabindex="-1"><a class="header-anchor" href="#\u6570\u5B57" aria-hidden="true">#</a> \u6570\u5B57</h3><h4 id="\u6570\u5B57\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#\u6570\u5B57\u7C7B\u578B" aria-hidden="true">#</a> \u6570\u5B57\u7C7B\u578B</h4><table><thead><tr><th>\u5206\u7C7B</th><th>\u5173\u952E\u5B57</th></tr></thead><tbody><tr><td>\u6709\u7B26\u53F7\u6574\u6570</td><td><code>int8</code></td></tr><tr><td></td><td><code>int16</code></td></tr><tr><td></td><td><code>int32</code></td></tr><tr><td></td><td><code>int64</code></td></tr><tr><td>\u65E0\u7B26\u53F7\u6574\u6570</td><td><code>uint8</code></td></tr><tr><td></td><td><code>uint16</code></td></tr><tr><td></td><td><code>uint32</code></td></tr><tr><td></td><td><code>uint64</code></td></tr><tr><td>\u6D6E\u70B9\u6570</td><td><code>float32</code></td></tr><tr><td></td><td><code>float64</code></td></tr></tbody></table><h4 id="\u5404\u7C7B\u578B\u53D6\u503C\u8303\u56F4" tabindex="-1"><a class="header-anchor" href="#\u5404\u7C7B\u578B\u53D6\u503C\u8303\u56F4" aria-hidden="true">#</a> \u5404\u7C7B\u578B\u53D6\u503C\u8303\u56F4</h4><p>\u53D6\u503C\u8303\u56F4\u8BA1\u7B97\uFF1A</p><p>\uFF081\uFF09\u6709\u7B26\u53F7\u6574\u6570: -2\u7684(n-1)\u6B21\u65B9 ~ (2\u7684(n-1)\u6B21\u65B9 -1)\uFF0C\u56E0\u4E3A\u7B2C\u4E00\u4F4D\u8868\u793A\u7B26\u53F7\u4F4D\uFF0C\u5B9E\u9645\u4F4D\u6570\u4E3An-1\uFF0C\u540C\u65F6\u6B63\u6570\u4E2D0\u4EE3\u8868\u4E00\u4E2A\u6570\u5B57\uFF0C\u6240\u4EE5\u6B63\u6570\u53D6\u503C\u8303\u56F4\u8981-1</p><p>\uFF082\uFF09\u65E0\u7B26\u53F7\u6574\u6570: 0 ~ (2\u7684n\u6B21\u65B9-1)</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;math&quot;</span>
	<span class="token string">&quot;strconv&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u8BA1\u7B97\u7CFB\u7EDF\u4F4D\u6570(32 or 64)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u5F53\u524D\u64CD\u4F5C\u7CFB\u7EDF\u4F4D\u6570: %d\\n&quot;</span><span class="token punctuation">,</span> strconv<span class="token punctuation">.</span>IntSize<span class="token punctuation">)</span>

	<span class="token comment">// \u6709\u7B26\u53F7\u6574\u6570</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\u6709\u7B26\u53F7\u6574\u6570&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;int8 \u53D6\u503C\u8303\u56F4: %20d ~ %-d\\n&quot;</span><span class="token punctuation">,</span> math<span class="token punctuation">.</span>MinInt8<span class="token punctuation">,</span> math<span class="token punctuation">.</span>MaxInt8<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;int16\u53D6\u503C\u8303\u56F4: %20d ~ %-d\\n&quot;</span><span class="token punctuation">,</span> math<span class="token punctuation">.</span>MinInt16<span class="token punctuation">,</span> math<span class="token punctuation">.</span>MaxInt16<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;int32\u53D6\u503C\u8303\u56F4: %20d ~ %-d\\n&quot;</span><span class="token punctuation">,</span> math<span class="token punctuation">.</span>MinInt32<span class="token punctuation">,</span> math<span class="token punctuation">.</span>MaxInt32<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;int64\u53D6\u503C\u8303\u56F4: %20d ~ %-d\\n&quot;</span><span class="token punctuation">,</span> math<span class="token punctuation">.</span>MinInt64<span class="token punctuation">,</span> math<span class="token punctuation">.</span>MaxInt64<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;int  \u53D6\u503C\u8303\u56F4: %20d ~ %-d\\n&quot;</span><span class="token punctuation">,</span> math<span class="token punctuation">.</span>MinInt<span class="token punctuation">,</span> math<span class="token punctuation">.</span>MaxInt<span class="token punctuation">)</span>

	<span class="token comment">// \u65E0\u7B26\u53F7\u6574\u6570</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\u65E0\u7B26\u53F7\u6574\u6570&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;uint8  \u53D6\u503C\u8303\u56F4: %d ~ %-d\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> math<span class="token punctuation">.</span>MaxUint8<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;uint16 \u53D6\u503C\u8303\u56F4: %d ~ %-d\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> math<span class="token punctuation">.</span>MaxUint16<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;uint32 \u53D6\u503C\u8303\u56F4: %d ~ %-d\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> math<span class="token punctuation">.</span>MaxUint32<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;uint64 \u53D6\u503C\u8303\u56F4: %d ~ %-d\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">uint64</span><span class="token punctuation">(</span>math<span class="token punctuation">.</span>MaxUint64<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// \u8FD9\u91CC\u9700\u8981\u8F6C\u4E3Auint64</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;uint   \u53D6\u503C\u8303\u56F4: %d ~ %-d\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">uint64</span><span class="token punctuation">(</span>math<span class="token punctuation">.</span>MaxUint<span class="token punctuation">)</span><span class="token punctuation">)</span>   <span class="token comment">// \u8FD9\u91CC\u9700\u8981\u8F6C\u4E3Auint64</span>

	<span class="token comment">// \u6D6E\u70B9\u6570</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\u6D6E\u70B9\u6570&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;float32 \u53D6\u503C\u8303\u56F4: %10.1e ~ %-10.1e\\n&quot;</span><span class="token punctuation">,</span> math<span class="token punctuation">.</span>SmallestNonzeroFloat32<span class="token punctuation">,</span> math<span class="token punctuation">.</span>MaxFloat32<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;float64 \u53D6\u503C\u8303\u56F4: %10.1e ~ %-10.1e\\n&quot;</span><span class="token punctuation">,</span> math<span class="token punctuation">.</span>SmallestNonzeroFloat64<span class="token punctuation">,</span> math<span class="token punctuation">.</span>MaxFloat64<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code>\u5F53\u524D\u64CD\u4F5C\u7CFB\u7EDF\u4F4D\u6570: <span class="token number">64</span>

\u6709\u7B26\u53F7\u6574\u6570                                               
int8 \u53D6\u503C\u8303\u56F4:                 -128 ~ <span class="token number">127</span>                
int16\u53D6\u503C\u8303\u56F4:               -32768 ~ <span class="token number">32767</span>              
int32\u53D6\u503C\u8303\u56F4:          -2147483648 ~ <span class="token number">2147483647</span>         
int64\u53D6\u503C\u8303\u56F4: -9223372036854775808 ~ <span class="token number">9223372036854775807</span>
int  \u53D6\u503C\u8303\u56F4: -9223372036854775808 ~ <span class="token number">9223372036854775807</span>
                                                         
\u65E0\u7B26\u53F7\u6574\u6570                                               
uint8  \u53D6\u503C\u8303\u56F4: <span class="token number">0</span> ~ <span class="token number">255</span>                                 
uint16 \u53D6\u503C\u8303\u56F4: <span class="token number">0</span> ~ <span class="token number">65535</span>                               
uint32 \u53D6\u503C\u8303\u56F4: <span class="token number">0</span> ~ <span class="token number">4294967295</span>                          
uint64 \u53D6\u503C\u8303\u56F4: <span class="token number">0</span> ~ <span class="token number">18446744073709551615</span>                
uint   \u53D6\u503C\u8303\u56F4: <span class="token number">0</span> ~ <span class="token number">18446744073709551615</span>                
                                                         
\u6D6E\u70B9\u6570                                                   
float32 \u53D6\u503C\u8303\u56F4:    <span class="token number">1</span>.4e-45 ~ <span class="token number">3</span>.4e+38                   
float64 \u53D6\u503C\u8303\u56F4:   <span class="token number">4</span>.9e-324 ~ <span class="token number">1</span>.8e+308
</code></pre></div><h4 id="\u8F6C\u6362\u6CE8\u610F\u4E8B\u9879" tabindex="-1"><a class="header-anchor" href="#\u8F6C\u6362\u6CE8\u610F\u4E8B\u9879" aria-hidden="true">#</a> \u8F6C\u6362\u6CE8\u610F\u4E8B\u9879</h4><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u6267\u884C\u6B63\u5E38,\u8FD9\u4E2A\u5BB9\u6613\u7406\u89E3,\u5C0F\u8303\u56F4\u8F6C\u5927\u8303\u56F4</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">int16</span><span class="token punctuation">(</span><span class="token function">int8</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 123</span>

	<span class="token comment">// \u6267\u884C\u62A5\u9519,\u8FD9\u4E2A\u4E5F\u5BB9\u6613\u7406\u89E3,\u5927\u8303\u56F4\u8F6C\u5C0F\u8303\u56F4,\u76F4\u63A5\u62A5\u9519</span>
	<span class="token comment">//fmt.Println(int8(int16(0x1234))) // cannot convert int16(0x1234) (constant 4660 of type int16) to type int8</span>

	<span class="token comment">// \u6267\u884C\u6B63\u5E38, \u4F46\u662F\u7ED3\u679C\u4E0D\u5BF9</span>
	i <span class="token operator">:=</span> <span class="token number">0x1234</span>
	x <span class="token operator">:=</span> <span class="token function">int16</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	y <span class="token operator">:=</span> <span class="token function">int8</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%#x&quot;</span><span class="token punctuation">,</span> y<span class="token punctuation">)</span> <span class="token comment">// 0x34,\u7ED3\u679C\u660E\u663E\u6709\u9519\u8BEF,\u4E22\u5931\u4E86\u4E00\u4E2A\u5B57\u8282\u7684\u6570\u636E</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="\u5B57\u7B26\u4E32\u76F8\u5173" tabindex="-1"><a class="header-anchor" href="#\u5B57\u7B26\u4E32\u76F8\u5173" aria-hidden="true">#</a> \u5B57\u7B26\u4E32\u76F8\u5173</h3><h4 id="\u4E09\u79CD\u7C7B\u578B\u58F0\u660E" tabindex="-1"><a class="header-anchor" href="#\u4E09\u79CD\u7C7B\u578B\u58F0\u660E" aria-hidden="true">#</a> <strong>\u4E09\u79CD\u7C7B\u578B\u58F0\u660E</strong></h4><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u5B57\u7B26\u4E32\u58F0\u660E</span>
	<span class="token keyword">var</span> s1 <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">&quot;\\&quot;hello\\&quot; world!&quot;</span> <span class="token comment">// (1) \u65B9\u6CD51\uFF1A\u4F7F\u7528\u53CC\u5F15\u53F7\uFF0C\u5982\u679C\u5B57\u7B26\u4E32\u4E5F\u5305\u542B\u53CC\u5F15\u53F7\u5219\u9700\u8981\u8F6C\u4E49</span>
	<span class="token keyword">var</span> s2 <span class="token builtin">string</span> <span class="token operator">=</span> \`<span class="token string">&quot;hello&quot;</span> world<span class="token operator">!</span>\`   <span class="token comment">// (2) \u65B9\u6CD52\uFF1A\u4F7F\u7528\u53CD\u5F15\u53F7\uFF0C\u4E0D\u9700\u8981\u8F6C\u4E49\uFF0C\u652F\u6301\u591A\u884C\u5B57\u7B26\u4E32</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%s\\n&quot;</span><span class="token punctuation">,</span> s1<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%s\\n&quot;</span><span class="token punctuation">,</span> s2<span class="token punctuation">)</span>

	<span class="token comment">// \u5B57\u8282\u58F0\u660E</span>
	<span class="token keyword">var</span> b1 <span class="token builtin">byte</span> <span class="token operator">=</span> <span class="token char">&#39;a&#39;</span>      <span class="token comment">// \u4F7F\u7528\u5355\u5F15\u53F7\u58F0\u660E</span>
	<span class="token keyword">var</span> b2 <span class="token builtin">uint8</span> <span class="token operator">=</span> <span class="token char">&#39;b&#39;</span>     <span class="token comment">// byte\u7684\u672C\u8D28\u5C31\u662Fuint8, \u4EE3\u8868\u4E00\u4E2AASCII\u5B57\u7B26\uFF0C\u65E0\u6CD5\u8868\u793A\u4E2D\u6587</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%c\\n&quot;</span><span class="token punctuation">,</span> b1<span class="token punctuation">)</span> <span class="token comment">// \u53EF\u4EE5\u4F7F\u7528%c\u6216%q\uFF0C\u4E0D\u80FD\u4F7F\u7528%s</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%q\\n&quot;</span><span class="token punctuation">,</span> b2<span class="token punctuation">)</span>

	<span class="token comment">// \u5B57\u7B26\u58F0\u660E</span>
	<span class="token keyword">var</span> r1 <span class="token builtin">rune</span> <span class="token operator">=</span> <span class="token char">&#39;\u4E2D&#39;</span>  <span class="token comment">// \u4F7F\u7528\u5355\u5F15\u53F7\u58F0\u660E</span>
	<span class="token keyword">var</span> r2 <span class="token builtin">int32</span> <span class="token operator">=</span> <span class="token char">&#39;\u56FD&#39;</span> <span class="token comment">// rune\u7684\u672C\u8D28\u5C31\u662Fint32, \u4EE3\u8868\u4E00\u4E2AUnicode\u5B57\u7B26\uFF0C\u9664\u4E86\u80FD\u8868\u793AASCII\u8FD8\u80FD\u8868\u793A\u4E2D\u6587</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%c\\n&quot;</span><span class="token punctuation">,</span> r1<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%q\\n&quot;</span><span class="token punctuation">,</span> r2<span class="token punctuation">)</span> <span class="token comment">// \u53EF\u4EE5\u4F7F\u7528%c\u6216%q\uFF0C\u4E0D\u80FD\u4F7F\u7528%s</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token string">&quot;hello&quot;</span> world<span class="token operator">!</span>
<span class="token string">&quot;hello&quot;</span> world<span class="token operator">!</span>
a             
<span class="token string">&#39;b&#39;</span>           
\u4E2D            
<span class="token string">&#39;\u56FD&#39;</span>
</code></pre></div><h4 id="\u5B57\u7B26\u4E32\u7684\u672C\u8D28" tabindex="-1"><a class="header-anchor" href="#\u5B57\u7B26\u4E32\u7684\u672C\u8D28" aria-hidden="true">#</a> \u5B57\u7B26\u4E32\u7684\u672C\u8D28</h4><p>\u5B57\u7B26\u4E32\u7684\u672C\u8D28\u5C31\u662F\u5B57\u8282\u6570\u7EC4</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;unicode/utf8&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u5B57\u7B26\u4E32\u5B9A\u4E49</span>
	s1 <span class="token operator">:=</span> <span class="token string">&quot;\u5317\u4EAC\u6B22\u8FCE\u4F60&quot;</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;        \u5B57\u7B26\u4E32: %-s\\n&quot;</span><span class="token punctuation">,</span> s1<span class="token punctuation">)</span>

	<span class="token comment">// ------------------------------------------------------------------</span>

	<span class="token comment">// \u8BA1\u7B97\u5B57\u7B26\u4E32\u957F\u5EA6</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u8BA1\u7B97\u5B57\u7B26\u4E32\u957F\u5EA6: %d\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">)</span>            <span class="token comment">// 15</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;  \u8BA1\u7B97\u5B57\u8282\u957F\u5EA6: %d\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>   <span class="token comment">// 15</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;  \u8BA1\u7B97rune\u957F\u5EA6: %d\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">rune</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 5</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;  \u8BA1\u7B97rune\u957F\u5EA6: %d\\n&quot;</span><span class="token punctuation">,</span> utf8<span class="token punctuation">.</span><span class="token function">RuneCountInString</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 5</span>
    
	<span class="token comment">// ------------------------------------------------------------------</span>

	<span class="token comment">// \u6309\u7167\u5B57\u8282\u904D\u5386 - \u904D\u5386\u51FA\u6765\u662F\u4E71\u7801</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;string[%d]=%c\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> s1<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u6309\u7167\u5B57\u8282\u6570\u7EC4\u904D\u5386 - \u904D\u5386\u51FA\u6765\u662F\u4E71\u7801\uFF0C\u548C\u4E0A\u9762\u7684\u7ED3\u679C\u662F\u4E00\u6837\u7684</span>
	s2 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>s2<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;string[%d]=%c\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> s2<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// \u4F7F\u7528range\u904D\u5386 - \u4E0B\u6807\u5177\u6709\u4E0D\u786E\u5B9A\u6027</span>
	<span class="token keyword">for</span> index<span class="token punctuation">,</span> value <span class="token operator">:=</span> <span class="token keyword">range</span> s1 <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;string[%d]=%c\\n&quot;</span><span class="token punctuation">,</span> index<span class="token punctuation">,</span> value<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u4F7F\u7528rune\u904D\u5386 - \u5B8C\u7F8E</span>
	s3 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">rune</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>s3<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;string[%d]=%c\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> s3<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code>        \u5B57\u7B26\u4E32: \u5317\u4EAC\u6B22\u8FCE\u4F60
\u8BA1\u7B97\u5B57\u7B26\u4E32\u957F\u5EA6: <span class="token number">15</span>
  \u8BA1\u7B97\u5B57\u8282\u957F\u5EA6: <span class="token number">15</span>
  \u8BA1\u7B97rune\u957F\u5EA6: <span class="token number">5</span> 
  \u8BA1\u7B97rune\u957F\u5EA6: <span class="token number">5</span> 

\u4E2D\u95F4\u4E71\u7801\u7701\u7565<span class="token punctuation">..</span>.

string<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">=</span>\u5317
string<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token operator">=</span>\u4EAC
string<span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">]</span><span class="token operator">=</span>\u6B22
string<span class="token punctuation">[</span><span class="token number">9</span><span class="token punctuation">]</span><span class="token operator">=</span>\u8FCE
string<span class="token punctuation">[</span><span class="token number">12</span><span class="token punctuation">]</span><span class="token operator">=</span>\u4F60
string<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">=</span>\u5317
string<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token operator">=</span>\u4EAC
string<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token operator">=</span>\u6B22
string<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token operator">=</span>\u8FCE
string<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token operator">=</span>\u4F60
</code></pre></div><h4 id="strings\u5305" tabindex="-1"><a class="header-anchor" href="#strings\u5305" aria-hidden="true">#</a> strings\u5305</h4>`,63),I=s("\u5B98\u65B9\u6587\u6863\uFF1A"),M={href:"https://pkg.go.dev/strings",target:"_blank",rel:"noopener noreferrer"},z=s("https://pkg.go.dev/strings"),H=s("\u4E2D\u6587\u6587\u6863\uFF1A"),j={href:"https://studygolang.com/static/pkgdoc/pkg/strings.htm",target:"_blank",rel:"noopener noreferrer"},V=s("https://studygolang.com/static/pkgdoc/pkg/strings.htm"),X=p(`<p>\u5E38\u7528\u51FD\u6570</p><table><thead><tr><th>\u5206\u7C7B</th><th>\u51FD\u6570</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td>\u5B57\u7B26\u4E32\u76F8\u7B49</td><td><code>func EqualFold(s, t string) bool</code></td><td>\u5224\u65AD\u4E24\u4E2A<code>UTF-8</code>\u5B57\u7B26\u4E32\u662F\u5426\u76F8\u7B49\uFF0C\u4E0D\u533A\u5206\u5927\u5C0F\u5199</td></tr><tr><td>\u524D\u540E\u7F00\u5224\u65AD</td><td><code>func HasPrefix(s, prefix string) bool</code></td><td>\u5224\u65AD<code>s</code>\u662F\u5426\u6709\u524D\u7F00\u5B57\u7B26\u4E32<code>prefix</code></td></tr><tr><td></td><td><code>func HasSuffix(s, suffix string) bool</code></td><td>\u5224\u65AD<code>s</code>\u662F\u5426\u6709\u540E\u7F00\u5B57\u7B26\u4E32<code>suffix </code></td></tr><tr><td>\u5B57\u7B26\u4E32\u5305\u542B</td><td><code>func Contains(s, substr string) bool</code></td><td>\u5224\u65AD\u5B57\u7B26\u4E32<code>s</code>\u662F\u5426\u5305\u542B\u5B50\u4E32<code>substr</code></td></tr><tr><td></td><td><code>func ContainsRune(s string, r rune) bool</code></td><td>\u5224\u65AD\u5B57\u7B26\u4E32s\u662F\u5426\u5305\u542B<code>utf-8</code>\u7801\u503C<code>r</code></td></tr><tr><td></td><td><code>func ContainsAny(s, chars string) bool</code></td><td>\u5224\u65AD\u5B57\u7B26\u4E32s\u662F\u5426\u5305\u542B\u5B57\u7B26\u4E32<code>chars</code>\u4E2D\u7684\u4EFB\u4E00\u5B57\u7B26</td></tr><tr><td>\u5927\u5C0F\u5199</td><td><code>func ToLower(s string) string</code></td><td>\u8FD4\u56DE\u5C06\u6240\u6709\u5B57\u6BCD\u90FD\u8F6C\u4E3A\u5BF9\u5E94\u7684\u5C0F\u5199\u7248\u672C\u7684\u62F7\u8D1D</td></tr><tr><td></td><td><code>func ToUpper(s string) string</code></td><td>\u8FD4\u56DE\u5C06\u6240\u6709\u5B57\u6BCD\u90FD\u8F6C\u4E3A\u5BF9\u5E94\u7684\u5927\u5199\u7248\u672C\u7684\u62F7\u8D1D</td></tr><tr><td>\u6E05\u9664</td><td><code>func Trim(s string, cutset string) string</code></td><td>\u8FD4\u56DE\u5C06s\u524D\u540E\u7AEF\u6240\u6709<code>cutset</code>\u5305\u542B\u7684<code>utf-8</code>\u7801\u503C\u90FD\u53BB\u6389\u7684\u5B57\u7B26\u4E32</td></tr><tr><td></td><td><code>func TrimSpace(s string) string</code></td><td>\u8FD4\u56DE\u5C06s\u524D\u540E\u7AEF\u6240\u6709\u7A7A\u767D\u90FD\u53BB\u6389\u7684\u5B57\u7B26\u4E32</td></tr><tr><td></td><td><code>func TrimFunc(s string, f func(rune) bool) string</code></td><td>\u8FD4\u56DE\u5C06s\u524D\u540E\u7AEF\u6240\u6709\u6EE1\u8DB3<code>f</code>\u7684<code>unicode</code>\u7801\u503C\u90FD\u53BB\u6389\u7684\u5B57\u7B26\u4E32</td></tr><tr><td>\u5206\u5272</td><td><code>func Split(s, sep string) []string</code></td><td>\u4EE5<code>sep</code>\u4F5C\u4E3A\u5206\u5272\u7B26\u5206\u5272\u5B57\u7B26\u4E32\u76F4\u63A5\u672B\u5C3E\uFF0C<br>\u5982\u679C<code>sep</code>\u4E3A\u7A7A\u5219\u8FD4\u56DE\u6BCF\u4E2A<code>Unicode</code>\u7801\u70B9</td></tr><tr><td></td><td><code>func SplitN(s, sep string, n int) []string</code></td><td>\u540C<code>Split</code>\uFF0C\u53C2\u6570<code>n</code>\u51B3\u5B9A\u8FD4\u56DE\u7684\u5207\u7247\u7684\u6570\u76EE<br><code>n</code> == 0\uFF0C\u8FD4\u56DE<code>nil</code>\uFF08\u7A7A\u5207\u7247\u96F6\u503C\uFF09<br><code>n</code> &gt; 0 \u8FD4\u56DE\u7684\u5207\u7247\u6700\u591An\u4E2A\u5B50\u5B57\u7B26\u4E32\uFF1B\u6700\u540E\u4E00\u4E2A\u5B50\u5B57\u7B26\u4E32\u5305\u542B\u672A\u8FDB\u884C\u5207\u5272\u7684\u90E8\u5206<br><code>n</code> &lt; 0 : \u8FD4\u56DE\u6240\u6709\u7684\u5B50\u5B57\u7B26\u4E32\u7EC4\u6210\u7684\u5207\u7247</td></tr><tr><td></td><td><code>func SplitAfter(s, sep string) []string</code></td><td>\u540C<code>Split</code>\uFF0C\u53EA\u662F\u4F1A\u4FDD\u7559\u5206\u9694\u7B26</td></tr><tr><td></td><td></td><td></td></tr><tr><td>\u8FDE\u63A5</td><td><code>func Join(a []string, sep string) string</code></td><td>\u5C06\u4E00\u7CFB\u5217\u5B57\u7B26\u4E32\u8FDE\u63A5\u4E3A\u4E00\u4E2A\u5B57\u7B26\u4E32\uFF0C\u4E4B\u95F4\u7528sep\u6765\u5206\u9694</td></tr></tbody></table><p>\u793A\u4F8B\u4EE3\u7801</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;strings&quot;</span>
	<span class="token string">&quot;unicode&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u5B57\u7B26\u4E32\u76F8\u7B49\u5224\u65AD</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u5B57\u7B26\u4E32\u76F8\u7B49\u5224\u65AD&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">EqualFold</span><span class="token punctuation">(</span><span class="token string">&quot;go&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;GO&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// true, \u4E0D\u533A\u5206\u5927\u5C0F\u5199</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;go&quot;</span> <span class="token operator">==</span> <span class="token string">&quot;GO&quot;</span><span class="token punctuation">)</span>                  <span class="token comment">// false, \u533A\u5206\u5927\u5C0F\u5199</span>

	<span class="token comment">// \u5B57\u7B26\u4E32\u524D\u540E\u7F00\u5339\u914D</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\u5B57\u7B26\u4E32\u524D\u540E\u7F00\u5339\u914D&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">HasPrefix</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;he&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">HasPrefix</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot; he&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// \u5B57\u7B26\u4E32\u5305\u542B\u5339\u914D</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\u5B57\u7B26\u4E32\u5305\u542B\u5339\u914D&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">Contains</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;ell&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">ContainsRune</span><span class="token punctuation">(</span><span class="token string">&quot;\u4E2D\u534E\u4EBA\u6C11\u5171\u548C\u56FD&quot;</span><span class="token punctuation">,</span> <span class="token char">&#39;\u4EBA&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">ContainsAny</span><span class="token punctuation">(</span><span class="token string">&quot;\u4E2D\u534E\u4EBA\u6C11\u5171\u548C\u56FD&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\u4F60\u662F\u54EA\u91CC\u7684\u4EBA\u554A\uFF1F&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// \u5927\u5C0F\u5199\u8F6C\u6362</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\u5927\u5C0F\u5199\u8F6C\u6362&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">ToLower</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// hello</span>

	<span class="token comment">// \u6E05\u9664</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\u6E05\u9664&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">Trim</span><span class="token punctuation">(</span><span class="token string">&quot;hello world!&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;l!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>                       <span class="token comment">// hello world, !\u88AB\u6E05\u9664\u4E86\uFF0C\u8BF4\u660E\u5E76\u6CA1\u6709\u5C06l!\u4F5C\u4E3A\u4E00\u4E2A\u6574\u4F53</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">Trim</span><span class="token punctuation">(</span><span class="token string">&quot;@!hello world!&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;!@&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>                     <span class="token comment">// hello world, \u518D\u6B21\u6D4B\u8BD5\u4E00\u4E0B\uFF0C\u9A8C\u8BC1\u6210\u529F</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">TrimSpace</span><span class="token punctuation">(</span><span class="token string">&quot; 	hello world &quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>                      <span class="token comment">// \u6E05\u9664\u4E24\u4FA7\u7684\u7A7A\u767D</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">TrimFunc</span><span class="token punctuation">(</span><span class="token string">&quot; hello world HAHA&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>r <span class="token builtin">rune</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span> <span class="token comment">// \u6E05\u9664\u4E24\u4FA7\u7684\u7A7A\u767D\u548C\u5927\u5199\u5B57\u6BCD</span>
		<span class="token keyword">return</span> unicode<span class="token punctuation">.</span><span class="token function">IsSpace</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span> <span class="token operator">||</span> unicode<span class="token punctuation">.</span><span class="token function">IsUpper</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// \u5206\u5272</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\u5206\u5272&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%q\\n&quot;</span><span class="token punctuation">,</span> strings<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span><span class="token string">&quot;a,b,c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;,&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>     <span class="token comment">// [&quot;a&quot; &quot;b&quot; &quot;c&quot;]</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%q\\n&quot;</span><span class="token punctuation">,</span> strings<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span><span class="token string">&quot;aab&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>       <span class="token comment">// [&quot;&quot; &quot;&quot; &quot;b&quot;]</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%q\\n&quot;</span><span class="token punctuation">,</span> strings<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span><span class="token string">&quot;a b c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>      <span class="token comment">// [&quot;a&quot; &quot; &quot; &quot;b&quot; &quot; &quot; &quot;c&quot;]</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%q\\n&quot;</span><span class="token punctuation">,</span> strings<span class="token punctuation">.</span><span class="token function">SplitN</span><span class="token punctuation">(</span><span class="token string">&quot;a b c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// \u53C2\u6570n\u51B3\u5B9A\u8FD4\u56DE\u7684\u5207\u7247\u7684\u6570\u76EE</span>

	<span class="token comment">// \u8FDE\u63A5</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\u8FDE\u63A5&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;world&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;!&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code>\u5B57\u7B26\u4E32\u76F8\u7B49\u5224\u65AD
<span class="token boolean">true</span>            
<span class="token boolean">false</span>           
                
\u5B57\u7B26\u4E32\u524D\u540E\u7F00\u5339\u914D
<span class="token boolean">true</span>            
<span class="token boolean">false</span>           
                
\u5B57\u7B26\u4E32\u5305\u542B\u5339\u914D  
<span class="token boolean">true</span>            
<span class="token boolean">true</span>            
<span class="token boolean">true</span>            
                
\u5927\u5C0F\u5199\u8F6C\u6362      
hello           
                
\u6E05\u9664            
hello world     
hello world     
hello world     
hello world     
                
\u5206\u5272            
<span class="token punctuation">[</span><span class="token string">&quot;a&quot;</span> <span class="token string">&quot;b&quot;</span> <span class="token string">&quot;c&quot;</span><span class="token punctuation">]</span>   
<span class="token punctuation">[</span><span class="token string">&quot;&quot;</span> <span class="token string">&quot;&quot;</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">]</span>     
<span class="token punctuation">[</span><span class="token string">&quot;a&quot;</span> <span class="token string">&quot; &quot;</span> <span class="token string">&quot;b&quot;</span> <span class="token string">&quot; &quot;</span> <span class="token string">&quot;c&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token string">&quot;a b c&quot;</span><span class="token punctuation">]</span>

\u8FDE\u63A5
hello world <span class="token operator">!</span>
</code></pre></div><h4 id="bytes\u5305" tabindex="-1"><a class="header-anchor" href="#bytes\u5305" aria-hidden="true">#</a> bytes\u5305</h4>`,7),J=s("\u5B98\u65B9\u6587\u6863\uFF1A"),K={href:"https://pkg.go.dev/bytes",target:"_blank",rel:"noopener noreferrer"},Y=s("https://pkg.go.dev/bytes"),Q=s("\u4E2D\u6587\u6587\u6863\uFF1A"),Z={href:"https://studygolang.com/static/pkgdoc/pkg/bytes.htm",target:"_blank",rel:"noopener noreferrer"},$=s("https://studygolang.com/static/pkgdoc/pkg/bytes.htm"),nn=p(`<p>bytes\u5305\u5B9E\u73B0\u4E86\u64CD\u4F5C<code>[]byte</code>\u7684\u5E38\u7528\u51FD\u6570\uFF0C\u4E0E<code>string</code>\u5305\u51FD\u6570\u7C7B\u4F3C\uFF0C\u7B80\u5355\u4ECB\u7ECD\u51E0\u4E2A\u65B9\u6CD5</p><table><thead><tr><th>\u5206\u7C7B</th><th>\u51FD\u6570</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td>\u76F8\u7B49\u5224\u65AD</td><td><code>func Equal(a, b []byte) bool</code></td><td>\u5224\u65AD\u4E24\u4E2A\u5207\u7247\u7684\u5185\u5BB9\u662F\u5426\u5B8C\u5168\u76F8\u540C</td></tr><tr><td></td><td><code>func EqualFold(s, t []byte) bool</code></td><td>\u5224\u65AD\u4E24\u4E2A<code>utf-8</code>\u7F16\u7801\u5207\u7247\uFF08\u5C06unicode\u5927\u5199\u3001\u5C0F\u5199\u3001\u6807\u9898\u4E09\u79CD\u683C\u5F0F\u5B57\u7B26\u89C6\u4E3A\u76F8\u540C\uFF09\u662F\u5426\u76F8\u540C</td></tr><tr><td>\u8F6C\u6362</td><td><code>func Runes(s []byte) []rune</code></td><td>\u8FD4\u56DE\u548Cs\u7B49\u4EF7\u7684[]rune\u5207\u7247</td></tr></tbody></table><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;bytes&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u5B57\u8282\u5207\u7247\u76F8\u7B49\u5224\u65AD</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u5B57\u8282\u5207\u7247\u76F8\u7B49\u5224\u65AD&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>bytes<span class="token punctuation">.</span><span class="token function">Equal</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">&quot;ABC&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">&quot;ABC&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>     <span class="token comment">// \u5B8C\u5168\u76F8\u7B49</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>bytes<span class="token punctuation">.</span><span class="token function">EqualFold</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">&quot;ABC&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">&quot;abc&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// \u4E0D\u533A\u5206\u5927\u5C0F\u5199</span>

	<span class="token comment">// \u8F6C\u6362</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\u8F6C\u6362&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%q\\n&quot;</span><span class="token punctuation">,</span> bytes<span class="token punctuation">.</span><span class="token function">Runes</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">&quot;\u4F60\u597D&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u8F93\u51FA\u7ED3\u679C</span>
<span class="token comment">// true</span>
<span class="token comment">// true       </span>
<span class="token comment">// [&#39;\u4F60&#39; &#39;\u597D&#39;]</span>
</code></pre></div><h4 id="unicode\u7CFB\u5217" tabindex="-1"><a class="header-anchor" href="#unicode\u7CFB\u5217" aria-hidden="true">#</a> unicode\u7CFB\u5217</h4><p><code>unicode</code>\u5305\u5305\u542B\u57FA\u672C\u7684\u5B57\u7B26\u5224\u65AD\u51FD\u6570\u3002</p><p><code>utf8</code>\u5305\u4E3B\u8981\u8D1F\u8D23<code>rune</code>\u548C<code>byte</code>\u4E4B\u95F4\u7684\u8F6C\u6362\u3002</p><p><code>utf16</code>\u5305\u8D1F\u8D23<code>rune</code>\u548C<code>uint16</code>\u6570\u7EC4\u4E4B\u95F4\u7684\u8F6C\u6362</p><p>\u5B98\u65B9\u6587\u6863\uFF1A</p>`,8),sn=n("code",null,"unicode",-1),an=s("\uFF1A"),tn={href:"https://pkg.go.dev/unicode",target:"_blank",rel:"noopener noreferrer"},pn=s("https://pkg.go.dev/unicode"),on=n("code",null,"unicode/utf8",-1),cn=s("\uFF1A"),en={href:"https://pkg.go.dev/unicode/utf8",target:"_blank",rel:"noopener noreferrer"},un=s("https://pkg.go.dev/unicode/utf8"),ln=n("code",null,"unicode/utf16",-1),kn=s("\uFF1A"),rn={href:"https://pkg.go.dev/unicode/utf16",target:"_blank",rel:"noopener noreferrer"},dn=s("https://pkg.go.dev/unicode/utf16"),mn=p(`<table><thead><tr><th>\u5305\u540D</th><th>\u5206\u7C7B</th><th>\u51FD\u6570</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td><code>unicode</code></td><td>\u5B57\u7B26\u5224\u65AD</td><td><code>func Is(rangeTab *RangeTable, r rune) bool</code></td><td>\u5224\u65AD<code>r</code>\u662F\u5426\u5728<code>RangeTable</code>\u5185</td></tr><tr><td></td><td></td><td><code>func IsSpace(r rune) bool</code></td><td>\u662F\u5426\u662F\u7A7A\u767D\u5B57\u7B26\uFF08\u7A7A\u5B57\u7B26\u4E32\u4F1A\u62A5\u9519\uFF09</td></tr><tr><td></td><td></td><td><code>func IsDigit(r rune) bool</code></td><td>\u662F\u5426\u662F\u5341\u8FDB\u5236\u6570\u5B57</td></tr><tr><td></td><td></td><td><code>func IsNumber(r rune) bool</code></td><td>\u662F\u5426\u662F\u6570\u5B57</td></tr><tr><td></td><td></td><td><code>func IsLetter(r rune) bool</code></td><td>\u662F\u5426\u662F\u5B57\u6BCD</td></tr><tr><td></td><td></td><td><code>func IsLower(r rune) bool</code></td><td>\u662F\u5426\u662F\u5C0F\u5199\u5B57\u6BCD</td></tr><tr><td></td><td></td><td><code>func IsUpper(r rune) bool</code></td><td>\u662F\u5426\u662F\u5927\u5199\u5B57\u6BCD</td></tr><tr><td></td><td>\u8F6C\u6362</td><td><code>func ToLower(r rune) rune</code></td><td>\u8FD4\u56DE\u5BF9\u5E94\u7684\u5C0F\u5199\u5B57\u7B26</td></tr><tr><td></td><td></td><td><code>func ToUpper(r rune) rune</code></td><td>\u8FD4\u56DE\u5BF9\u5E94\u7684\u5C0F\u5199\u5B57\u7B26</td></tr><tr><td><code>unicode/utf8</code></td><td>bytes\u8F6Crune</td><td><code>func DecodeRune(p []byte) (r rune, size int)</code></td><td>\u89E3\u7801 []byte\u4E2D<strong>\u7B2C\u4E00\u4E2A</strong><code>UTF-8</code> \u7F16\u7801\u5E8F\u5217\uFF0C\u8FD4\u56DE\u8BE5\u7801\u503C\u548C\u957F\u5EA6</td></tr><tr><td></td><td></td><td><code>func DecodeLastRune(p []byte) (r rune, size int)</code></td><td>\u540C<code>DecodeRune</code>\uFF0C\u662F\u6700\u540E\u4E00\u4E2A<code>UTF-8</code> \u7F16\u7801\u5E8F\u5217</td></tr><tr><td></td><td></td><td><code>func DecodeRuneInString(s string) (r rune, size int)</code></td><td>\u540C<code>DecodeRune</code>\uFF0C\u4F20\u5165\u7684\u662F\u5B57\u7B26\u4E32</td></tr><tr><td></td><td></td><td><code>func DecodeLastRuneInString(s string) (r rune, size int)</code></td><td>\u540C<code>DecodeRune</code>\uFF0C\u4F20\u5165\u7684\u662F\u5B57\u7B26\u4E32\uFF0C\u662F\u6700\u540E\u4E00\u4E2A<code>UTF-8</code> \u7F16\u7801\u5E8F\u5217</td></tr><tr><td></td><td>rune\u8F6Cbytes</td><td><code>func EncodeRune(p []byte, r rune) int</code></td><td>\u5C06 rune\u7684<code>UTF-8 </code>\u7F16\u7801\u5E8F\u5217\u5199\u5165<code>[]byte</code>\uFF0C\u5E76\u8FD4\u56DE\u5199\u5165\u7684\u5B57\u8282\u6570\u3002p\u9700\u8981\u6EE1\u8DB3\u8DB3\u591F\u7684\u957F\u5EA6</td></tr><tr><td></td><td>\u68C0\u6D4B</td><td><code>func FullRune(p []byte) bool</code></td><td>\u68C0\u6D4B<code>[]byte</code>\u662F\u5426\u5305\u542B\u4E00\u4E2A\u5B8C\u6574 <code>UTF-8</code>\u7F16\u7801\uFF08\u53EA\u8981\u5305\u542B\u4E00\u4E2A\u5C31\u8FD4\u56DEtrue\uFF09</td></tr><tr><td></td><td></td><td><code>func FullRuneInString(s string) bool</code></td><td>\u540C\u4E0A\uFF0C\u8F93\u5165\u662F\u4E00\u4E2A\u5B57\u7B26\u4E32</td></tr><tr><td></td><td></td><td><code>func RuneStart(b byte) bool</code></td><td>\u68C0\u6D4B\u5B57\u8282 byte b \u662F\u5426\u53EF\u4EE5\u4F5C\u4E3A\u67D0\u4E2A rune \u7F16\u7801\u7684\u7B2C\u4E00\u4E2A\u5B57\u8282</td></tr><tr><td></td><td></td><td><code>func Valid(p []byte) bool</code></td><td>\u68C0\u6D4B\u5207\u7247<code>[]byte</code>\u662F\u5426\u5305\u542B\u5B8C\u6574\u4E14\u5408\u6CD5\u7684<code>UTF-8</code>\u7F16\u7801\u5E8F\u5217\uFF08\u4E0D\u80FD\u6709\u4E71\u7801\uFF09</td></tr><tr><td></td><td></td><td><code>func ValidRune(r rune) bool</code></td><td>\u68C0\u6D4B\u5B57\u7B26<code>rune</code>\u662F\u5426\u5305\u542B\u5B8C\u6574\u4E14\u5408\u6CD5\u7684<code>UTF-8</code>\u7F16\u7801\u5E8F\u5217</td></tr><tr><td></td><td></td><td><code>func ValidString(s string) bool</code></td><td>\u68C0\u6D4B\u5B57\u7B26\u4E32<code>string</code>\u662F\u5426\u5305\u542B\u5B8C\u6574\u4E14\u5408\u6CD5\u7684<code>UTF-8</code>\u7F16\u7801\u5E8F\u5217</td></tr><tr><td></td><td>\u7EDF\u8BA1</td><td><code>func RuneCount(p []byte) int</code></td><td>\u7EDF\u8BA1<code>[]byte</code>\u4E2D<code>rune</code>\u7684\u4E2A\u6570</td></tr><tr><td></td><td></td><td><code>func RuneCountInString(s string) (n int)</code></td><td>\u540C\u4E0A\uFF0C\u8F93\u5165\u662F\u5B57\u7B26\u4E32</td></tr><tr><td></td><td></td><td><code>func RuneLen(r rune) int</code></td><td>\u7EDF\u8BA1<code>rune</code>\u7F16\u7801\u540E\u7684\u5B57\u8282\u6570</td></tr><tr><td><code>unicode/utf16</code></td><td>\u8F6C\u6362</td><td><code>func Encode(s []rune) []uint16</code></td><td>\u7F16\u7801<code>rune</code>\u6570\u7EC4\u4E3A<code>uint16</code>\u6570\u7EC4</td></tr><tr><td></td><td></td><td><code>func Decode(s []uint16) []rune</code></td><td>\u89E3\u7801<code>uint16</code>\u6570\u7EC4\u4E3A<code>rune</code>\u6570\u7EC4</td></tr></tbody></table><blockquote><p>\u7F16\u7801\uFF1A\u5B57\u7B26\u4E32 -&gt; bytes\uFF0C rune -&gt; bytes</p><p>\u89E3\u7801\uFF1Abytes -&gt; rune\uFF0C bytes -&gt; \u5B57\u7B26\u4E32</p></blockquote><p>\u793A\u4F8B\u4EE3\u7801</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;unicode&quot;</span>
	<span class="token string">&quot;unicode/utf16&quot;</span>
	<span class="token string">&quot;unicode/utf8&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// unicode\u5305 - \u5224\u65AD</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;unicode\u5305 - \u5224\u65AD&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>unicode<span class="token punctuation">.</span><span class="token function">Is</span><span class="token punctuation">(</span>unicode<span class="token punctuation">.</span>Scripts<span class="token punctuation">[</span><span class="token string">&quot;Han&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token char">&#39;a&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// \u5224\u65AD\u662F\u5426\u662F\u6C49\u5B57</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>unicode<span class="token punctuation">.</span><span class="token function">Is</span><span class="token punctuation">(</span>unicode<span class="token punctuation">.</span>Scripts<span class="token punctuation">[</span><span class="token string">&quot;Han&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token char">&#39;\u4E2D&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>unicode<span class="token punctuation">.</span><span class="token function">IsSpace</span><span class="token punctuation">(</span><span class="token char">&#39; &#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// true</span>

	<span class="token comment">// unicode\u5305 - \u8F6C\u6362</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\\nunicode\u5305 - \u8F6C\u6362&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%c\\n&quot;</span><span class="token punctuation">,</span> unicode<span class="token punctuation">.</span><span class="token function">ToLower</span><span class="token punctuation">(</span><span class="token char">&#39;A&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%c\\n&quot;</span><span class="token punctuation">,</span> unicode<span class="token punctuation">.</span><span class="token function">ToLower</span><span class="token punctuation">(</span><span class="token char">&#39;\u4E2D&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// unicode/utf8 - bytes\u8F6Crune</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\\nunicode/utf8 -bytes\u8F6Crune&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>utf8<span class="token punctuation">.</span><span class="token function">DecodeRune</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">&quot;\u4F60\u597D&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>     <span class="token comment">// \u89E3\u7801\u7B2C\u4E00\u4E2A\uFF0C20320 3</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%c\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">20320</span><span class="token punctuation">)</span>                      <span class="token comment">// \u4F60</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>utf8<span class="token punctuation">.</span><span class="token function">DecodeLastRune</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">&quot;\u4F60\u597D&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// \u89E3\u7801\u6700\u540E\u4E00\u4E2A\uFF0C22909 3</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%c\\n&quot;</span><span class="token punctuation">,</span> <span class="token number">22909</span><span class="token punctuation">)</span>                      <span class="token comment">// \u597D</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>utf8<span class="token punctuation">.</span><span class="token function">DecodeRuneInString</span><span class="token punctuation">(</span><span class="token string">&quot;\u4F60\u597D&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>utf8<span class="token punctuation">.</span><span class="token function">DecodeLastRuneInString</span><span class="token punctuation">(</span><span class="token string">&quot;\u4F60\u597D&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// unicode/utf8 - rune\u8F6Cbytes</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\\nunicode/utf8 - rune\u8F6Cbytes&quot;</span><span class="token punctuation">)</span>
	buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>utf8<span class="token punctuation">.</span><span class="token function">EncodeRune</span><span class="token punctuation">(</span>buf<span class="token punctuation">,</span> <span class="token char">&#39;\u4E16&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%#v\\n&quot;</span><span class="token punctuation">,</span> buf<span class="token punctuation">)</span> <span class="token comment">// []byte{0xe4, 0xb8, 0x96}</span>

	<span class="token comment">// unicode/utf8 - \u68C0\u6D4B</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\\nunicode/utf8 - \u68C0\u6D4B&quot;</span><span class="token punctuation">)</span>
	buf2 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">{</span><span class="token number">228</span><span class="token punctuation">,</span> <span class="token number">184</span><span class="token punctuation">,</span> <span class="token number">150</span><span class="token punctuation">}</span>           <span class="token comment">// \u4E16</span>
	buf3 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">{</span><span class="token number">228</span><span class="token punctuation">,</span> <span class="token number">184</span><span class="token punctuation">,</span> <span class="token number">150</span><span class="token punctuation">,</span> <span class="token number">228</span><span class="token punctuation">,</span> <span class="token number">184</span><span class="token punctuation">}</span> <span class="token comment">// \u5728buf2\u7684\u57FA\u7840\u4E0A\u518D\u52A0\u4E0A\u4E24\u4E2A\u5B57\u8282, \u4E16\\xe4\\xb8</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>utf8<span class="token punctuation">.</span><span class="token function">FullRune</span><span class="token punctuation">(</span>buf2<span class="token punctuation">)</span><span class="token punctuation">)</span>     <span class="token comment">// true</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>utf8<span class="token punctuation">.</span><span class="token function">FullRune</span><span class="token punctuation">(</span>buf3<span class="token punctuation">)</span><span class="token punctuation">)</span>     <span class="token comment">// true</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>utf8<span class="token punctuation">.</span><span class="token function">FullRune</span><span class="token punctuation">(</span>buf2<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// false</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>utf8<span class="token punctuation">.</span><span class="token function">Valid</span><span class="token punctuation">(</span>buf2<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>utf8<span class="token punctuation">.</span><span class="token function">Valid</span><span class="token punctuation">(</span>buf3<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// false</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%q\\n&quot;</span><span class="token punctuation">,</span> buf3<span class="token punctuation">)</span>

	<span class="token comment">// unicode/utf16 - rune\u4E0Euint16\u8F6C\u6362</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%#v\\n&quot;</span><span class="token punctuation">,</span> utf16<span class="token punctuation">.</span><span class="token function">Encode</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">rune</span><span class="token punctuation">(</span><span class="token string">&quot;\u4F60\u597D&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>            <span class="token comment">// []uint16{0x4f60, 0x597d}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%q\\n&quot;</span><span class="token punctuation">,</span> utf16<span class="token punctuation">.</span><span class="token function">Decode</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">uint16</span><span class="token punctuation">{</span><span class="token number">0x4f60</span><span class="token punctuation">,</span> <span class="token number">0x597d</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// [&#39;\u4F60&#39; &#39;\u597D&#39;]</span>
<span class="token punctuation">}</span>
</code></pre></div></details><blockquote><p>utf8\u7F16\u7801\u4E0B\uFF0C\u82F1\u6587\u53601\u4E2A\u5B57\u8282\uFF0C\u6C49\u5B57\u53603\u4E2A\u5B57\u8282\uFF1B</p><p>utf16\u7F16\u7801\u4E0B\uFF0C\u82F1\u6587\u53601\u4E2A\u5B57\u8282\uFF0C\u6C49\u5B57\u53601\u4E2A\u5B57\u8282</p></blockquote><h3 id="\u5E03\u5C14\u503C" tabindex="-1"><a class="header-anchor" href="#\u5E03\u5C14\u503C" aria-hidden="true">#</a> \u5E03\u5C14\u503C</h3><p>\u5E03\u5C14\u503C\u7684\u96F6\u503C\u662F<code>false</code>\uFF0C\u5E03\u5C14\u503C\u65E0\u6CD5\u9690\u5F0F\u8F6C\u6362\u4E3A\u6570\u503C(1\u62160)</p><h3 id="\u6570\u7EC4" tabindex="-1"><a class="header-anchor" href="#\u6570\u7EC4" aria-hidden="true">#</a> \u6570\u7EC4</h3><p>\u6570\u7EC4\u7684\u7279\u70B9</p><ul><li>\u6570\u7EC4\u4E00\u65E6\u5B9A\u4E49\uFF0C\u5143\u7D20\u4E2A\u6570\u4E0D\u53EF\u6539\u53D8\uFF0C\u5373\u4E0D\u80FD\u589E\u52A0\u6216\u5220\u9664\u5143\u7D20\uFF1B\u53EF\u4EE5\u6539\u5143\u7D20\u7684\u503C</li><li>\u5143\u7D20\u6570\u636E\u7C7B\u578B\u5FC5\u987B\u4E00\u81F4</li><li>\u76F8\u540C\u6570\u636E\u7C7B\u578B\u3001\u957F\u5EA6\u56FA\u5B9A\u7684\u5E8F\u5217\u624D\u662F\u4E00\u6837\u7684\uFF0C\u5373<code>[2]int</code>\u548C<code>[3]int</code>\u662F\u4E0D\u540C</li><li>\u6570\u7EC4\u7684\u96F6\u503C\u662F\u5143\u7D20\u6570\u636E\u7C7B\u578B\u7684\u96F6\u503C</li><li>\u6CA1\u6709&quot;\u7A7A\u6570\u7EC4&quot;\u7684\u8BF4\u6CD5</li><li>\u6570\u7EC4\u662F\u503C\u7C7B\u578B</li></ul><h4 id="\u58F0\u660E" tabindex="-1"><a class="header-anchor" href="#\u58F0\u660E" aria-hidden="true">#</a> \u58F0\u660E</h4><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> a1 <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token builtin">int</span>                   <span class="token comment">// \u58F0\u660E\u6570\u7EC4\uFF1B3\u4EE3\u8868\u6570\u7EC4\u5143\u7D20\u4E2A\u6570\uFF08\u5FC5\u987B\u6307\u5B9A\uFF09\uFF1B\u672A\u8D4B\u503C\u5219\u9ED8\u8BA4\u4F7F\u7528\u96F6\u503C\uFF0C\u8FD9\u91CC\u662F0</span>
	<span class="token keyword">var</span> a2 <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token builtin">int</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">}</span> <span class="token comment">// \u58F0\u660E\u5E76\u8D4B\u503C</span>
	a3 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">}</span>           <span class="token comment">// \u77ED\u53D8\u91CF\u58F0\u660E</span>
	a4 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">}</span>      <span class="token comment">//\u4F7F\u7528...\u540E\u6570\u7EC4\u957F\u5EA6\u4F1A\u81EA\u52A8\u5224\u65AD\uFF1B...\u53EA\u80FD\u7528\u5728\u503C\u7684\u4F4D\u7F6E\u4E0A\u4E0D\u53EF\u4EE5\u7528\u5728\u7C7B\u578B\u7684\u4F4D\u7F6E\u4E0A</span>
	a5 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">:</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">}</span>           <span class="token comment">// \u7D22\u5F151\u7684\u4F4D\u7F6E\u6570\u636E\u662F-1\uFF0C\u5176\u4ED6\u4F4D\u7F6E\u662F\u96F6\u503C</span>

	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%#v\\n&quot;</span><span class="token punctuation">,</span> a1<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%#v\\n&quot;</span><span class="token punctuation">,</span> a2<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%#v\\n&quot;</span><span class="token punctuation">,</span> a3<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%#v\\n&quot;</span><span class="token punctuation">,</span> a4<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%#v\\n&quot;</span><span class="token punctuation">,</span> a5<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span>int<span class="token punctuation">{</span><span class="token number">0</span>, <span class="token number">0</span>, <span class="token number">0</span><span class="token punctuation">}</span>
<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span>int<span class="token punctuation">{</span><span class="token number">4</span>, <span class="token number">5</span>, <span class="token number">6</span><span class="token punctuation">}</span>   
<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span>int<span class="token punctuation">{</span><span class="token number">7</span>, <span class="token number">8</span>, <span class="token number">9</span><span class="token punctuation">}</span>   
<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span>int<span class="token punctuation">{</span><span class="token number">10</span>, <span class="token number">11</span>, <span class="token number">12</span><span class="token punctuation">}</span>
<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span>int<span class="token punctuation">{</span><span class="token number">0</span>, -1<span class="token punctuation">}</span>   
</code></pre></div><h4 id="\u57FA\u672C\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#\u57FA\u672C\u64CD\u4F5C" aria-hidden="true">#</a> \u57FA\u672C\u64CD\u4F5C</h4><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	a <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">}</span>

	<span class="token comment">// \u904D\u5386</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> a <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u622A\u53D6</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// \u7D22\u5F150-2\uFF0C\u6CE8\u610F\u4E0D\u652F\u6301[:-2]\u8FD9\u79CD\u8D1F\u6570\u8868\u793A\u65B9\u6CD5</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token number">10</span>
<span class="token number">11</span>        
<span class="token number">12</span>        
<span class="token number">13</span>        
<span class="token number">14</span>        
<span class="token number">15</span>        
<span class="token number">10</span>        
<span class="token number">11</span>        
<span class="token number">12</span>        
<span class="token number">13</span>        
<span class="token number">14</span>        
<span class="token number">15</span>        
<span class="token punctuation">[</span><span class="token number">10</span> <span class="token number">11</span> <span class="token number">12</span><span class="token punctuation">]</span>
</code></pre></div><h4 id="\u591A\u7EF4\u6570\u7EC4" tabindex="-1"><a class="header-anchor" href="#\u591A\u7EF4\u6570\u7EC4" aria-hidden="true">#</a> \u591A\u7EF4\u6570\u7EC4</h4><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u4E8C\u7EF4\u6570\u7EC4</span>
	a2 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a2<span class="token punctuation">)</span> <span class="token comment">// [[0 0 0] [0 0 0]]</span>

	<span class="token comment">// \u4E09\u7EF4\u6570\u7EC4</span>
	a3 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a3<span class="token punctuation">)</span>
	<span class="token comment">/*
	   [                            \u7B2C\u4E00\u4E2A\u6570\u7EC4\u4E3A\u957F\u5EA6\u4E3A1\u7684\u6570\u7EC4
	      [                         \u7B2C\u4E00\u4E2A\u6570\u7EC4\u7684\u7B2C1\u4E2A\u5143\u7D20\u4E3A\u53E6\u4E00\u4E2A\u957F\u5EA6\u4E3A2\u7684\u6570\u7EC4
	         [0 0 0] [0 0 0]        \u6BCF\u4E2A\u6570\u7EC4\u6709\u4E24\u4E2A\u5143\u7D20\uFF0C\u6BCF\u4E2A\u5143\u7D20\u662F\u4E00\u4E2A\u957F\u5EA6\u4E3A3\u7684\u6570\u7EC4
	      ]
	   ]

	*/</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="\u5207\u7247" tabindex="-1"><a class="header-anchor" href="#\u5207\u7247" aria-hidden="true">#</a> \u5207\u7247</h3><p>\u5207\u7247\u662F\u957F\u5EA6\u53EF\u53D8\u7684\u6570\u7EC4\uFF0C\u5207\u7247\u7684\u7279\u70B9</p><ul><li><p>\u53EF\u4EE5\u52A8\u6001\u6DFB\u52A0\u5220\u9664\u5143\u7D20</p></li><li><p>\u6240\u6709\u5143\u7D20\u6570\u636E\u7C7B\u578B\u4E5F\u5FC5\u987B\u662F\u4E00\u6837</p></li><li><p>\u5207\u7247\u7684\u96F6\u503C\u662F<code>nil</code></p></li><li><p>\u5207\u7247\u662F\u5F15\u7528\u7C7B\u578B</p></li></ul><p>\u5207\u7247\u7531\u4E09\u90E8\u5206\u7EC4\u6210</p><ul><li>\u6307\u9488\uFF1A\u5B58\u653E\u5E95\u5C42\u6570\u7EC4\u7684\u5185\u5B58\u5730\u5740</li><li>\u957F\u5EA6\uFF1A\u6307\u7684\u662F\u5207\u7247\u7684\u5143\u7D20\u4E2A\u6570\uFF0C\u4F7F\u7528<code>len(\u5207\u7247)</code>\u8F93\u51FA\u957F\u5EA6</li><li>\u5BB9\u91CF\uFF1A\u5E95\u5C42\u6570\u7EC4\u7684\u957F\u5EA6\uFF0C\u4F7F\u7528<code>cap(\u5207\u7247)</code>\u8F93\u51FA\u5BB9\u91CF\u5927\u5C0F</li></ul><h4 id="\u58F0\u660E-1" tabindex="-1"><a class="header-anchor" href="#\u58F0\u660E-1" aria-hidden="true">#</a> \u58F0\u660E</h4><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u58F0\u660E\u65B9\u5F0F1\uFF1A\u4E0E\u6570\u7EC4\u7C7B\u4F3C\uFF0C\u4E0D\u540C\u7684\u662F\u4E0D\u9700\u8981\u6307\u5B9A\u5143\u7D20\u4E2A\u6570</span>
	<span class="token keyword">var</span> s1 <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span>  <span class="token comment">// \u53EA\u58F0\u660E\uFF0C\u9ED8\u8BA4\u4E3A\u96F6\u503C\uFF0C\u5373nil</span>
	s2 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// \u7A7A\u5207\u7247</span>

	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%#v\\n&quot;</span><span class="token punctuation">,</span> s1<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%#v\\n&quot;</span><span class="token punctuation">,</span> s2<span class="token punctuation">)</span>

	<span class="token comment">// \u58F0\u660E\u65B9\u5F0F2\uFF1A\u4F7F\u7528make</span>
	s3 <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token comment">//\u58F0\u660E\u4E00\u4E2Aint\u7C7B\u578B\u7684\u5207\u7247,\u957F\u5EA6\u4E3A1\uFF0C\u5BB9\u91CF\u4E3A2\uFF1B\u5982\u679C\u5BB9\u91CF\u4E0D\u6307\u5B9A\uFF0C\u90A3\u4E48\u5BB9\u91CF\u7B49\u540C\u4E8E\u957F\u5EA6</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%#v\\n&quot;</span><span class="token punctuation">,</span> s3<span class="token punctuation">)</span>

	<span class="token comment">// \u67E5\u770B\u957F\u5EA6\u548C\u5BB9\u91CF</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">len</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>s2<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>s3<span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">cap</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>s2<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>s3<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token punctuation">[</span><span class="token punctuation">]</span>int<span class="token punctuation">(</span>nil<span class="token punctuation">)</span>
<span class="token punctuation">[</span><span class="token punctuation">]</span>int<span class="token punctuation">{</span><span class="token punctuation">}</span> 
<span class="token punctuation">[</span><span class="token punctuation">]</span>int<span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span>
<span class="token number">0</span> <span class="token number">0</span> <span class="token number">1</span>   
<span class="token number">0</span> <span class="token number">0</span> <span class="token number">2</span>   
</code></pre></div><h4 id="\u57FA\u672C\u64CD\u4F5C-1" tabindex="-1"><a class="header-anchor" href="#\u57FA\u672C\u64CD\u4F5C-1" aria-hidden="true">#</a> \u57FA\u672C\u64CD\u4F5C</h4><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;bytes&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">EqualStringSlice</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
	length <span class="token operator">:=</span> <span class="token function">len</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
	<span class="token keyword">if</span> length <span class="token operator">!=</span> <span class="token function">len</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">false</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> length<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> a<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">!=</span> b<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">false</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	s1 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u539F\u59CB\u6570\u636E\uFF1A%#v\\n&quot;</span><span class="token punctuation">,</span> s1<span class="token punctuation">)</span>

	<span class="token comment">// \u6DFB\u52A0\u5143\u7D20</span>
	s1 <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>s1<span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token char">&#39;8&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;\u4E2D&#39;</span><span class="token punctuation">)</span> <span class="token comment">// \u53EF\u4EE5\u4E00\u6B21\u6DFB\u52A0\u591A\u4E2A\uFF0C &#39;8&#39;\u548C&#39;\u4E2D&#39;\u867D\u7136\u4E3Arune\uFF0C\u672C\u8D28\u4E0A\u8FD8\u662Fint\u7C7B\u578B</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u6DFB\u52A0\u5143\u7D20\uFF1A%#v\\n&quot;</span><span class="token punctuation">,</span> s1<span class="token punctuation">)</span>    <span class="token comment">// []int{1, 2, 3, 4, 5, 6, 7, 56, 20013}</span>

	<span class="token comment">// \u5220\u9664\u5143\u7D20</span>
	s1 <span class="token operator">=</span> s1<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token function">len</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">]</span>                 <span class="token comment">// \u5220\u9664\u7B2C\u4E00\u4E2A\u5143\u7D20</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u5220\u9664\u5143\u7D20(\u7B2C\u4E00\u4E2A)\uFF1A%#v\\n&quot;</span><span class="token punctuation">,</span> s1<span class="token punctuation">)</span>  <span class="token comment">//</span>
	s1 <span class="token operator">=</span> s1<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token function">len</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>                <span class="token comment">// \u5220\u9664\u6700\u540E\u4E00\u4E2A\u5143\u7D20</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u5220\u9664\u5143\u7D20(\u6700\u540E\u4E00\u4E2A)\uFF1A%#v\\n&quot;</span><span class="token punctuation">,</span> s1<span class="token punctuation">)</span> <span class="token comment">//</span>

	<span class="token comment">// \u5207\u7247\u6D45\u62F7\u8D1D</span>
	s2 <span class="token operator">:=</span> s1<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">]</span>   <span class="token comment">// \u6D45\u62F7\u8D1D</span>
	s3 <span class="token operator">:=</span> s1<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token comment">// \u6D45\u62F7\u8D1D</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u4F7F\u7528[:]\u6D45\u62F7\u8D1D\uFF1A%p &lt;---&gt; %p\\n&quot;</span><span class="token punctuation">,</span> s1<span class="token punctuation">,</span> s2<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u4F7F\u7528[:]\u6D45\u62F7\u8D1D\uFF1A%p &lt;---&gt; %p\\n&quot;</span><span class="token punctuation">,</span> s1<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> s3<span class="token punctuation">)</span>

	<span class="token comment">// \u5207\u7247\u6DF1\u62F7\u8D1D</span>
	s4 <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token function">copy</span><span class="token punctuation">(</span>s4<span class="token punctuation">,</span> s1<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u4F7F\u7528copy\u6DF1\u62F7\u8D1D\uFF1A%p &lt;---&gt; %p\\n&quot;</span><span class="token punctuation">,</span> s1<span class="token punctuation">,</span> s4<span class="token punctuation">)</span> <span class="token comment">// \u6DF1\u62F7\u8D1D\u65B9\u5F0F1</span>
	s5 <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> s1 <span class="token punctuation">{</span>
		s5 <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>s5<span class="token punctuation">,</span> v<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u904D\u5386\u65B9\u5F0F\uFF1A%p &lt;---&gt; %p\\n&quot;</span><span class="token punctuation">,</span> s1<span class="token punctuation">,</span> s5<span class="token punctuation">)</span> <span class="token comment">// \u6DF1\u62F7\u8D1D\u65B9\u5F0F2</span>

	<span class="token comment">// \u89E3\u5305\uFF1A\u5207\u7247...</span>
	s6 <span class="token operator">:=</span> <span class="token function">append</span><span class="token punctuation">(</span>s1<span class="token punctuation">,</span> s1<span class="token operator">...</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u89E3\u5305\u7528\u6CD5\u793A\u4F8B\uFF1A%#v\\n&quot;</span><span class="token punctuation">,</span> s6<span class="token punctuation">)</span> <span class="token comment">//</span>

	<span class="token comment">// \u5207\u7247\u6BD4\u8F83 - byte\u5207\u7247\u4F7F\u7528\u63D0\u4F9B\u7684\u51FD\u6570\u6BD4\u8F83</span>
	a1 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">uint8</span><span class="token punctuation">{</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">40</span><span class="token punctuation">,</span> <span class="token number">78</span><span class="token punctuation">,</span> <span class="token number">115</span><span class="token punctuation">,</span> <span class="token number">253</span><span class="token punctuation">}</span>
	a2 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">uint8</span><span class="token punctuation">{</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">40</span><span class="token punctuation">,</span> <span class="token number">78</span><span class="token punctuation">,</span> <span class="token number">115</span><span class="token punctuation">,</span> <span class="token number">253</span><span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;[]byte\u5207\u7247\u6BD4\u8F83: %t\\n&quot;</span><span class="token punctuation">,</span> bytes<span class="token punctuation">.</span><span class="token function">Equal</span><span class="token punctuation">(</span>a1<span class="token punctuation">,</span> a2<span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// \u5207\u7247\u6BD4\u8F83 - \u975Ebyte\u7C7B\u578B</span>
	a3 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;world&quot;</span><span class="token punctuation">}</span>
	a4 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;world&quot;</span><span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;[]string\u5207\u7247\u6BD4\u8F83: %t\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">EqualStringSlice</span><span class="token punctuation">(</span>a3<span class="token punctuation">,</span> a4<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code>\u539F\u59CB\u6570\u636E\uFF1A<span class="token punctuation">[</span><span class="token punctuation">]</span>int<span class="token punctuation">{</span><span class="token number">1</span>, <span class="token number">2</span>, <span class="token number">3</span>, <span class="token number">4</span>, <span class="token number">5</span><span class="token punctuation">}</span>
\u6DFB\u52A0\u5143\u7D20\uFF1A<span class="token punctuation">[</span><span class="token punctuation">]</span>int<span class="token punctuation">{</span><span class="token number">1</span>, <span class="token number">2</span>, <span class="token number">3</span>, <span class="token number">4</span>, <span class="token number">5</span>, <span class="token number">6</span>, <span class="token number">7</span>, <span class="token number">56</span>, <span class="token number">20013</span><span class="token punctuation">}</span>        
\u5220\u9664\u5143\u7D20<span class="token punctuation">(</span>\u7B2C\u4E00\u4E2A<span class="token punctuation">)</span>\uFF1A<span class="token punctuation">[</span><span class="token punctuation">]</span>int<span class="token punctuation">{</span><span class="token number">2</span>, <span class="token number">3</span>, <span class="token number">4</span>, <span class="token number">5</span>, <span class="token number">6</span>, <span class="token number">7</span>, <span class="token number">56</span>, <span class="token number">20013</span><span class="token punctuation">}</span>   
\u5220\u9664\u5143\u7D20<span class="token punctuation">(</span>\u6700\u540E\u4E00\u4E2A<span class="token punctuation">)</span>\uFF1A<span class="token punctuation">[</span><span class="token punctuation">]</span>int<span class="token punctuation">{</span><span class="token number">2</span>, <span class="token number">3</span>, <span class="token number">4</span>, <span class="token number">5</span>, <span class="token number">6</span>, <span class="token number">7</span>, <span class="token number">56</span><span class="token punctuation">}</span>        
\u4F7F\u7528<span class="token punctuation">[</span>:<span class="token punctuation">]</span>\u6D45\u62F7\u8D1D\uFF1A0xc00012e0f8 <span class="token operator">&lt;</span>---<span class="token operator">&gt;</span> 0xc00012e0f8         
\u4F7F\u7528<span class="token punctuation">[</span>:<span class="token punctuation">]</span>\u6D45\u62F7\u8D1D\uFF1A0xc00012e100 <span class="token operator">&lt;</span>---<span class="token operator">&gt;</span> 0xc00012e100         
\u4F7F\u7528copy\u6DF1\u62F7\u8D1D\uFF1A0xc00012e0f8 <span class="token operator">&lt;</span>---<span class="token operator">&gt;</span> 0xc00012e190        
\u904D\u5386\u65B9\u5F0F\uFF1A0xc00012e0f8 <span class="token operator">&lt;</span>---<span class="token operator">&gt;</span> 0xc000156000              
\u89E3\u5305\u7528\u6CD5\u793A\u4F8B\uFF1A<span class="token punctuation">[</span><span class="token punctuation">]</span>int<span class="token punctuation">{</span><span class="token number">2</span>, <span class="token number">3</span>, <span class="token number">4</span>, <span class="token number">5</span>, <span class="token number">6</span>, <span class="token number">7</span>, <span class="token number">56</span>, <span class="token number">2</span>, <span class="token number">3</span>, <span class="token number">4</span>, <span class="token number">5</span>, <span class="token number">6</span>, <span class="token number">7</span>, <span class="token number">56</span><span class="token punctuation">}</span>
<span class="token punctuation">[</span><span class="token punctuation">]</span>byte\u5207\u7247\u6BD4\u8F83: <span class="token boolean">true</span>                                   
<span class="token punctuation">[</span><span class="token punctuation">]</span>string\u5207\u7247\u6BD4\u8F83: <span class="token boolean">true</span>
</code></pre></div><h4 id="\u5BB9\u91CF\u6269\u5BB9\u673A\u5236" tabindex="-1"><a class="header-anchor" href="#\u5BB9\u91CF\u6269\u5BB9\u673A\u5236" aria-hidden="true">#</a> \u5BB9\u91CF\u6269\u5BB9\u673A\u5236</h4><p>\u5F53<strong>\u957F\u5EA6==\u5BB9\u91CF</strong>\u65F6\uFF0C\u518D<code>append()</code>\u63D2\u5165\u5143\u7D20\uFF0Cgo\u4F1A\u91CD\u65B0\u7533\u8BF7\u4E00\u4E2A\u5E95\u5C42\u6570\u7EC4\uFF0C\u5C06\u539F\u6570\u636E\u6570\u636E\u62F7\u8D1D\u8FC7\u53BB\uFF0C\u4FEE\u6539\u5207\u7247\u6307\u9488\uFF0C\u518D\u7528\u6765\u5B58\u653E\u6211\u4EEC\u63D2\u5165\u7684\u6570\u636E</p><p>\u4E24\u4E2A\u5E76\u4E0D\u51C6\u786E\u7684\u7ED3\u8BBA\uFF1A</p><ul><li>\u5F53\u539F\u5207\u7247\u957F\u5EA6\u5C0F\u4E8E1024\u65F6\uFF0C\u65B0\u5207\u7247\u7684\u5BB9\u91CF\u4F1A\u76F4\u63A5\u7FFB\u500D</li><li>\u5F53\u539F\u5207\u7247\u7684\u5BB9\u91CF\u5927\u4E8E\u7B49\u4E8E1024\u65F6\uFF0C\u4F1A\u53CD\u590D\u5730\u589E\u52A025%\uFF0C\u76F4\u5230\u65B0\u5BB9\u91CF\u8D85\u8FC7\u6240\u9700\u8981\u7684\u5BB9\u91CF</li></ul><p><strong>\u6D4B\u8BD51\uFF1A\u53EF\u4EE5\u770B\u5230\u662F\u7FFB\u500D\u7684</strong></p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u5B9A\u4E49\u5207\u7247</span>
	s <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u5F53\u524D\u957F\u5EA6: %2d | \u5F53\u524D\u5BB9\u91CF: %2d\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// \u5FAA\u73AF\u6DFB\u52A0\u5143\u7D20</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">18</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		s <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u5F53\u524D\u957F\u5EA6: %2d | \u5F53\u524D\u5BB9\u91CF: %2d\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u8F93\u51FA\u7ED3\u679C</span>
	<span class="token comment">//\u5F53\u524D\u957F\u5EA6:  0 | \u5F53\u524D\u5BB9\u91CF:  0</span>
	<span class="token comment">//\u5F53\u524D\u957F\u5EA6:  1 | \u5F53\u524D\u5BB9\u91CF:  1</span>
	<span class="token comment">//\u5F53\u524D\u957F\u5EA6:  2 | \u5F53\u524D\u5BB9\u91CF:  2</span>
	<span class="token comment">//\u5F53\u524D\u957F\u5EA6:  3 | \u5F53\u524D\u5BB9\u91CF:  4</span>
	<span class="token comment">//\u5F53\u524D\u957F\u5EA6:  4 | \u5F53\u524D\u5BB9\u91CF:  4</span>
	<span class="token comment">//\u5F53\u524D\u957F\u5EA6:  5 | \u5F53\u524D\u5BB9\u91CF:  8</span>
	<span class="token comment">//\u5F53\u524D\u957F\u5EA6:  6 | \u5F53\u524D\u5BB9\u91CF:  8</span>
	<span class="token comment">//\u5F53\u524D\u957F\u5EA6:  7 | \u5F53\u524D\u5BB9\u91CF:  8</span>
	<span class="token comment">//\u5F53\u524D\u957F\u5EA6:  8 | \u5F53\u524D\u5BB9\u91CF:  8</span>
	<span class="token comment">//\u5F53\u524D\u957F\u5EA6:  9 | \u5F53\u524D\u5BB9\u91CF: 16</span>
	<span class="token comment">//\u5F53\u524D\u957F\u5EA6: 10 | \u5F53\u524D\u5BB9\u91CF: 16</span>
	<span class="token comment">//\u5F53\u524D\u957F\u5EA6: 11 | \u5F53\u524D\u5BB9\u91CF: 16</span>
	<span class="token comment">//\u5F53\u524D\u957F\u5EA6: 12 | \u5F53\u524D\u5BB9\u91CF: 16</span>
	<span class="token comment">//\u5F53\u524D\u957F\u5EA6: 13 | \u5F53\u524D\u5BB9\u91CF: 16</span>
	<span class="token comment">//\u5F53\u524D\u957F\u5EA6: 14 | \u5F53\u524D\u5BB9\u91CF: 16</span>
	<span class="token comment">//\u5F53\u524D\u957F\u5EA6: 15 | \u5F53\u524D\u5BB9\u91CF: 16</span>
	<span class="token comment">//\u5F53\u524D\u957F\u5EA6: 16 | \u5F53\u524D\u5BB9\u91CF: 16</span>
	<span class="token comment">//\u5F53\u524D\u957F\u5EA6: 17 | \u5F53\u524D\u5BB9\u91CF: 32</span>
	<span class="token comment">//\u5F53\u524D\u957F\u5EA6: 18 | \u5F53\u524D\u5BB9\u91CF: 32</span>
	<span class="token comment">//\u5F53\u524D\u957F\u5EA6: 19 | \u5F53\u524D\u5BB9\u91CF: 32</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p><strong>\u6D4B\u8BD52\uFF1A\u53EF\u4EE5\u770B\u5230\u5E76\u4E0D\u662F25%</strong></p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u5B9A\u4E49\u5207\u7247</span>
	s <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">2000</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u5F53\u524D\u957F\u5EA6: %2d | \u5F53\u524D\u5BB9\u91CF: %2d\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// \u5FAA\u73AF\u6DFB\u52A0\u5143\u7D20</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		s <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u5F53\u524D\u957F\u5EA6: %2d | \u5F53\u524D\u5BB9\u91CF: %2d\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u8F93\u51FA\u7ED3\u679C</span>
	<span class="token comment">//\u5F53\u524D\u957F\u5EA6: 2000 | \u5F53\u524D\u5BB9\u91CF: 2000</span>
	<span class="token comment">//\u5F53\u524D\u957F\u5EA6: 2001 | \u5F53\u524D\u5BB9\u91CF: 2720</span>
	<span class="token comment">//\u5F53\u524D\u957F\u5EA6: 2002 | \u5F53\u524D\u5BB9\u91CF: 2720</span>
	<span class="token comment">//\u5F53\u524D\u957F\u5EA6: 2003 | \u5F53\u524D\u5BB9\u91CF: 2720</span>
	<span class="token comment">//\u5F53\u524D\u957F\u5EA6: 2004 | \u5F53\u524D\u5BB9\u91CF: 2720</span>
	<span class="token comment">//\u5F53\u524D\u957F\u5EA6: 2005 | \u5F53\u524D\u5BB9\u91CF: 2720</span>
	<span class="token comment">//\u5F53\u524D\u957F\u5EA6: 2006 | \u5F53\u524D\u5BB9\u91CF: 2720</span>
	<span class="token comment">//\u5F53\u524D\u957F\u5EA6: 2007 | \u5F53\u524D\u5BB9\u91CF: 2720</span>
	<span class="token comment">//\u5F53\u524D\u957F\u5EA6: 2008 | \u5F53\u524D\u5BB9\u91CF: 2720</span>
	<span class="token comment">//\u5F53\u524D\u957F\u5EA6: 2009 | \u5F53\u524D\u5BB9\u91CF: 2720</span>
	<span class="token comment">//\u5F53\u524D\u957F\u5EA6: 2010 | \u5F53\u524D\u5BB9\u91CF: 2720</span>
	<span class="token comment">//\u5F53\u524D\u957F\u5EA6: 2011 | \u5F53\u524D\u5BB9\u91CF: 2720</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u4E0D\u540C\u7248\u672C\u7684<code>go</code>\u6269\u5BB9\u673A\u5236\u4E5F\u5E76\u4E0D\u4E00\u6837\uFF0C\u5177\u4F53\u8FD8\u9700\u8981\u53BB\u770B\u6E90\u4EE3\u7801<code>src/runtime/slice.go</code>\u4E2D\u7684<code>growslice</code>\u51FD\u6570</p><h4 id="\u5BB9\u91CF\u6269\u5BB9\u9762\u8BD5\u9898" tabindex="-1"><a class="header-anchor" href="#\u5BB9\u91CF\u6269\u5BB9\u9762\u8BD5\u9898" aria-hidden="true">#</a> \u5BB9\u91CF\u6269\u5BB9\u9762\u8BD5\u9898</h4><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	s1 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">40</span><span class="token punctuation">}</span>
	s2 <span class="token operator">:=</span> s1

	s1 <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>s1<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
	s1<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">11</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s1<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s2<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u8F93\u51FA\u7ED3\u679C\u548C\u89E3\u91CA</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token number">11</span>
<span class="token number">10</span>

\u7B2C\u4E00\u4E2A\u4E3A11
\u7B2C\u4E8C\u4E2A\u4E3A10\uFF0C\u662F\u56E0\u4E3As1\u6DFB\u52A0\u5143\u7D20\u540E\u4F1A\u6709\u5BB9\u91CF\u6269\u5BB9\u64CD\u4F5C\uFF0C\u5C06s1\u7684\u6570\u636E\u8D4B\u503C\u7ED9\u65B0\u7684\u5185\u5B58\u7A7A\u95F4\uFF0Cs1\u6307\u5411\u65B0\u7684\u5730\u5740\uFF0Cs1\u7684\u4FEE\u6539\u81EA\u7136\u5F71\u54CD\u4E0D\u5230s2\uFF0Cs2\u7684\u6570\u636E\u8FD8\u662F\u65E7\u7684\uFF0C\u5C31\u662F10
</code></pre></div></details><h3 id="\u6620\u5C04" tabindex="-1"><a class="header-anchor" href="#\u6620\u5C04" aria-hidden="true">#</a> \u6620\u5C04</h3><p>\u6620\u5C04\u662F\u5B58\u50A8\u4E00\u7CFB\u5217\u65E0\u5E8F\u7684key/value\u952E\u503C\u5BF9</p><p>key\u53EA\u80FD\u4E3A\u53EF\u4F7F\u7528==\u8FD0\u7B97\u7684\u503C\u7C7B\u578B\uFF08\u5B57\u7B26\u4E32\u3001\u6570\u5B57\u3001\u5E03\u5C14\u3001\u6570\u7EC4\uFF09\uFF0Cvalue\u53EF\u4EE5\u4E3A\u4EFB\u610F\u7C7B\u578B</p><p>\u96F6\u503C\u4E3Anil</p><h4 id="\u58F0\u660E-2" tabindex="-1"><a class="header-anchor" href="#\u58F0\u660E-2" aria-hidden="true">#</a> \u58F0\u660E</h4><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u76F4\u63A5\u58F0\u660E</span>
	<span class="token keyword">var</span> names1 <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span>     <span class="token comment">//\u4F7F\u7528var\u58F0\u660E\u4F46\u662F\u4E0D\u521D\u59CB\u5316(\u6CA1\u6709\u5206\u914D\u5185\u5B58\u7A7A\u95F4)\u540E\u9762\u8D4B\u503C\u4F1A\u62A5\u9519\uFF1B\u4E0D\u5E26\u5927\u62EC\u53F7\u7684\u662F\u7C7B\u578B</span>
	<span class="token keyword">var</span> names2 <span class="token operator">=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// \u58F0\u660E\u5E76\u521D\u59CB\u5316\uFF1B\u5E26\u5927\u62EC\u53F7\u7684\u662F\u503C</span>

	<span class="token comment">// \u4F7F\u7528make\u58F0\u660E</span>
	<span class="token keyword">var</span> names3 <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span>      <span class="token comment">// \u4F7F\u7528make\u58F0\u660E\u5E76\u521D\u59CB\u5316</span>
	<span class="token keyword">var</span> names4 <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token comment">// \u4F7F\u7528make\u58F0\u660E\u5E76\u521D\u59CB\u5316\uFF0C\u5E76\u6307\u5B9A\u5BB9\u91CF\uFF08\u6CE8\u610F\uFF1Amap\u7684\u5BB9\u91CF\u4E0D\u53EF\u4EE5\u4F7F\u7528cap\u51FD\u6570\u83B7\u53D6\uFF0C\u4F1A\u62A5\u9519\uFF09</span>

	<span class="token comment">// \u5C1D\u8BD5\u8D4B\u503C</span>
	<span class="token comment">//names1[&quot;a&quot;] = &quot;b&quot; // \u8FD9\u4E2A\u4F1A\u62A5\u9519\uFF0Cpanic: assignment to entry in nil map</span>
	names2<span class="token punctuation">[</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;b&quot;</span>
	names3<span class="token punctuation">[</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;b&quot;</span>
	names4<span class="token punctuation">[</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;b&quot;</span>

	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u7C7B\u578B: %T | \u503C: %#v | \u5143\u7D20\u4E2A\u6570: %d\\n&quot;</span><span class="token punctuation">,</span> names1<span class="token punctuation">,</span> names1<span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>names1<span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u7C7B\u578B: %T | \u503C: %#v | \u5143\u7D20\u4E2A\u6570: %d\\n&quot;</span><span class="token punctuation">,</span> names2<span class="token punctuation">,</span> names2<span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>names2<span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u7C7B\u578B: %T | \u503C: %#v | \u5143\u7D20\u4E2A\u6570: %d\\n&quot;</span><span class="token punctuation">,</span> names3<span class="token punctuation">,</span> names3<span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>names3<span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u7C7B\u578B: %T | \u503C: %#v | \u5143\u7D20\u4E2A\u6570: %d\\n&quot;</span><span class="token punctuation">,</span> names4<span class="token punctuation">,</span> names4<span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>names4<span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">//\u7C7B\u578B: map[string]string | \u503C: map[string]string(nil) | \u5143\u7D20\u4E2A\u6570: 0</span>
	<span class="token comment">//\u7C7B\u578B: map[string]string | \u503C: map[string]string{&quot;a&quot;:&quot;b&quot;} | \u5143\u7D20\u4E2A\u6570: 1</span>
	<span class="token comment">//\u7C7B\u578B: map[string]string | \u503C: map[string]string{&quot;a&quot;:&quot;b&quot;} | \u5143\u7D20\u4E2A\u6570: 1</span>
	<span class="token comment">//\u7C7B\u578B: map[string]string | \u503C: map[string]string{&quot;a&quot;:&quot;b&quot;} | \u5143\u7D20\u4E2A\u6570: 1</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="\u57FA\u672C\u64CD\u4F5C-2" tabindex="-1"><a class="header-anchor" href="#\u57FA\u672C\u64CD\u4F5C-2" aria-hidden="true">#</a> \u57FA\u672C\u64CD\u4F5C</h4><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u58F0\u660E\u6570\u7EC4</span>
	names <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6DFB\u52A0\u5143\u7D20\uFF0C\u82E5\u5DF2\u5B58\u5728\u4F1A\u8986\u76D6</span>
	names<span class="token punctuation">[</span><span class="token string">&quot;Top1&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;Go&quot;</span>
	names<span class="token punctuation">[</span><span class="token string">&quot;Top2&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;Python&quot;</span>
	names<span class="token punctuation">[</span><span class="token string">&quot;Top3&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;JavaScript&quot;</span>
	names<span class="token punctuation">[</span><span class="token string">&quot;Top4&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;&quot;</span>

	<span class="token comment">// \u5220\u9664\u5143\u7D20, delete\u51FD\u6570\u53EA\u7528\u4E8Emap\uFF0C\u51FD\u6570\u65E0\u8FD4\u56DE\u503C</span>
	<span class="token function">delete</span><span class="token punctuation">(</span>names<span class="token punctuation">,</span> <span class="token string">&quot;Top3&quot;</span><span class="token punctuation">)</span>

	<span class="token comment">// \u904D\u5386map\uFF0C\u904D\u5386\u51FA\u6765\u662F\u65E0\u5E8F\u7684</span>
	<span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> names <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;names[%s]=%s\\n&quot;</span><span class="token punctuation">,</span> k<span class="token punctuation">,</span> v<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">//names[Top2]=Python</span>
	<span class="token comment">//names[Top4]=</span>
	<span class="token comment">//names[Top1]=Go</span>

	<span class="token comment">// \u5224\u65AD\u5143\u7D20\u662F\u5426\u5B58\u5728,\u82E5\u4E0D\u5B58\u5728\u9ED8\u8BA4\u4F1A\u8FD4\u56DE\u5BF9\u5E94\u57FA\u672C\u6570\u636E\u7C7B\u578B\u7684\u96F6\u503C,\u6240\u4EE5\u6211\u4EEC\u4E00\u5B9A\u8981\u901A\u8FC7\u8FD4\u56DE\u7684\u5E03\u5C14\u503C\u6765\u5224\u65AD\u5143\u7D20\u662F\u5426\u5B58\u5728</span>
	key <span class="token operator">:=</span> <span class="token string">&quot;Top4&quot;</span>
	<span class="token keyword">if</span> v<span class="token punctuation">,</span> ok <span class="token operator">:=</span> names<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Key %s exists and value is %q\\n&quot;</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> v<span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Key %s does not exist\\n&quot;</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// Key Top4 exists and value is &quot;&quot;</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="value\u53EF\u4EE5\u662F\u4E00\u4E2A\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#value\u53EF\u4EE5\u662F\u4E00\u4E2A\u65B9\u6CD5" aria-hidden="true">#</a> value\u53EF\u4EE5\u662F\u4E00\u4E2A\u65B9\u6CD5</h4><p>map\u7684value\u53EF\u4EE5\u662F\u4E00\u4E2A\u65B9\u6CD5</p><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	m1 <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token keyword">func</span><span class="token punctuation">(</span>op <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

	m1<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">func</span><span class="token punctuation">(</span>op <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> op <span class="token punctuation">}</span>
	m1<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">func</span><span class="token punctuation">(</span>op <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> op <span class="token operator">*</span> op <span class="token punctuation">}</span>
	m1<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">func</span><span class="token punctuation">(</span>op <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> op <span class="token operator">*</span> op <span class="token operator">*</span> op <span class="token punctuation">}</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>m1<span class="token punctuation">)</span> <span class="token comment">// map[1:0x47b920 2:0x47b940 3:0x47b960]</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>m1<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> m1<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> m1<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 2 4 8</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="\u5B9E\u73B0set\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#\u5B9E\u73B0set\u7C7B\u578B" aria-hidden="true">#</a> \u5B9E\u73B0set\u7C7B\u578B</h4><p>go\u8BED\u8A00\u4E2D\u6CA1\u6709<code>set</code>\u7C7B\u578B\uFF0C\u53EF\u4EE5\u4F7F\u7528map\u6765\u81EA\u5B9A\u4E49<code>set</code></p><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u521D\u59CB\u5316set</span>
	intSet <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token builtin">bool</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6DFB\u52A0\u5143\u7D20</span>
	intSet<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span>
	intSet<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">false</span>

	<span class="token comment">// \u5220\u9664\u5143\u7D20</span>
	<span class="token function">delete</span><span class="token punctuation">(</span>intSet<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>

	<span class="token comment">// \u68C0\u67E5\u5143\u7D20\u662F\u5426\u5B58\u5728</span>
	n <span class="token operator">:=</span> <span class="token number">1</span>
	<span class="token keyword">if</span> intSet<span class="token punctuation">[</span>n<span class="token punctuation">]</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d is in set&quot;</span><span class="token punctuation">,</span> n<span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d is not in set&quot;</span><span class="token punctuation">,</span> n<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 1 is in set</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>\u66F4\u597D\u7684\u5B9E\u73B0set\u7684\u65B9\u6CD5\u662F\u4F7F\u7528\u7ED3\u6784\u4F53\uFF0C\u53C2\u8003\u300A\u7A7A\u7ED3\u6784\u4F53\u300B\u7AE0\u8282</p></blockquote><h3 id="\u57FA\u672C\u6570\u636E\u7C7B\u578B\u8F6C\u6362" tabindex="-1"><a class="header-anchor" href="#\u57FA\u672C\u6570\u636E\u7C7B\u578B\u8F6C\u6362" aria-hidden="true">#</a> \u57FA\u672C\u6570\u636E\u7C7B\u578B\u8F6C\u6362</h3><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;math&quot;</span>
	<span class="token string">&quot;strconv&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">Int2Float</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Int\u8F6CFloat:\\n&quot;</span><span class="token punctuation">)</span>
	x <span class="token operator">:=</span> <span class="token number">99</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%T\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">float32</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">Float2Int</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\\nFloat\u8F6CInt:\\n&quot;</span><span class="token punctuation">)</span>

	<span class="token comment">// \u5C0F\u6570\u90E8\u5206\u4F1A\u88AB\u622A\u65AD</span>
	x <span class="token operator">:=</span> <span class="token number">100.7</span>
	y <span class="token operator">:=</span> <span class="token operator">-</span><span class="token number">3.9</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%T %d\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">int64</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">int64</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 100</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%T %d\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">int64</span><span class="token punctuation">(</span>y<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">int64</span><span class="token punctuation">(</span>y<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// -3</span>

	<span class="token comment">// \u6CE8\u610F\uFF1A</span>
	<span class="token comment">//fmt.Printf(&quot;%T\\n&quot;, int64(3.0)) // \u4E0D\u4F1A\u62A5\u9519</span>
	<span class="token comment">//fmt.Printf(&quot;%T\\n&quot;, int64(3.1)) // \u4F1A\u62A5\u9519,\u5C0F\u6570\u90E8\u5206\u4E0D\u4E3A0\u76F4\u63A5\u8F6C\u5C31\u4F1A\u62A5\u9519</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">CeilAndFloorAndRound</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\u5411\u4E0A\u53D6\u6574/\u5411\u4E0B\u53D6\u6574/\u56DB\u820D\u4E94\u5165:\\n&quot;</span><span class="token punctuation">)</span>
	<span class="token comment">// \u5411\u4E0A\u53D6\u6574\uFF0C\u51FD\u6570\u7B7E\u540D\uFF1ACeil(x float64) float64</span>
	x <span class="token operator">:=</span> <span class="token number">1.11</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%T %f\\n&quot;</span><span class="token punctuation">,</span> math<span class="token punctuation">.</span><span class="token function">Ceil</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">,</span> math<span class="token punctuation">.</span><span class="token function">Ceil</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// float64 2.000000</span>

	<span class="token comment">// \u5411\u4E0B\u53D6\u6574\uFF0C\u51FD\u6570\u7B7E\u540D\uFF1AFloor(x float64) float64</span>
	y <span class="token operator">:=</span> <span class="token number">1.99</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%T %f\\n&quot;</span><span class="token punctuation">,</span> math<span class="token punctuation">.</span><span class="token function">Floor</span><span class="token punctuation">(</span>y<span class="token punctuation">)</span><span class="token punctuation">,</span> math<span class="token punctuation">.</span><span class="token function">Floor</span><span class="token punctuation">(</span>y<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// float64 1.000000</span>

	<span class="token comment">// \u56DB\u820D\u4E94\u5165\uFF0C\u51FD\u6570\u7B7E\u540D\uFF1A</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%T %f\\n&quot;</span><span class="token punctuation">,</span> math<span class="token punctuation">.</span><span class="token function">Round</span><span class="token punctuation">(</span><span class="token number">1.49</span><span class="token punctuation">)</span><span class="token punctuation">,</span> math<span class="token punctuation">.</span><span class="token function">Round</span><span class="token punctuation">(</span><span class="token number">1.49</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// float64 1.000000</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">AddQuote</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\u8F93\u51FA\u6DFB\u52A0\u53CC\u5F15\u53F7/\u5355\u5F15\u53F7:\\n&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strconv<span class="token punctuation">.</span><span class="token function">Quote</span><span class="token punctuation">(</span><span class="token string">&quot;\u5B57\u7B26\u4E32&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strconv<span class="token punctuation">.</span><span class="token function">QuoteRune</span><span class="token punctuation">(</span><span class="token char">&#39;\u5B57&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">String2Int</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\u5B57\u7B26\u4E32\u8F6C\u6570\u5B57:\\n&quot;</span><span class="token punctuation">)</span>

	<span class="token comment">// \u51FD\u6570\u7B7E\u540D\uFF1AAtoi(s string) (int, error)\uFF0C\u7B49\u540C\u4E8E ParseInt(s, 10, 0)</span>
	<span class="token keyword">if</span> i<span class="token punctuation">,</span> err <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">Atoi</span><span class="token punctuation">(</span><span class="token string">&quot;10&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u51FD\u6570\u7B7E\u540D\uFF1AParseInt(s string, base int, bitSize int) (i int64, err error)</span>
	<span class="token comment">// \u6307\u5B9A\u5B57\u7B26\u4E32\u4E3A10\u8FDB\u5236\u6570\u5B57\uFF0C\u8F6C\u6362\u5230int8\u7C7B\u578B (0:int\u30018:int8\u300116:int16\u300132:int32\u300164:int64)</span>
	<span class="token comment">// \u7528\u6CD5\u4E00\u6837\u7684\u8FD8\u6709\uFF1AParseUint(s string, base int, bitSize int) (uint64, error)</span>
	<span class="token keyword">if</span> i<span class="token punctuation">,</span> err <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">ParseInt</span><span class="token punctuation">(</span><span class="token string">&quot;b&quot;</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u51FD\u6570\u7B7E\u540D\uFF1AParseFloat(s string, bitSize int) (float64, error)</span>
	<span class="token keyword">if</span> i<span class="token punctuation">,</span> err <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">ParseFloat</span><span class="token punctuation">(</span><span class="token string">&quot;1.20&quot;</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">String2Bool</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\u5B57\u7B26\u4E32\u8F6C\u5E03\u5C14:\\n&quot;</span><span class="token punctuation">)</span>
	<span class="token comment">// \u8F6C\u6362\u89C4\u5219\u4EE3\u7801\uFF1A</span>
	<span class="token comment">//switch str {</span>
	<span class="token comment">//case &quot;1&quot;, &quot;t&quot;, &quot;T&quot;, &quot;true&quot;, &quot;TRUE&quot;, &quot;True&quot;:</span>
	<span class="token comment">//	return true, nil</span>
	<span class="token comment">//case &quot;0&quot;, &quot;f&quot;, &quot;F&quot;, &quot;false&quot;, &quot;FALSE&quot;, &quot;False&quot;:</span>
	<span class="token comment">//	return false, nil</span>
	<span class="token comment">//}</span>
	<span class="token comment">// \u5982\u679C\u662FTRue\uFF0C\u8FD9\u79CD\u5B57\u7B26\u4E32\u5C31\u65E0\u6CD5\u8F6C\u6362\u4E86\uFF0C\u53EF\u4EE5\u5148\u4F7F\u7528strings.ToLower\u6216strings.ToUpper\u8F6C\u6362\u540E\u518D\u8F6C\u4E3A\u5E03\u5C14\u503C</span>
	<span class="token keyword">if</span> b<span class="token punctuation">,</span> err <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">ParseBool</span><span class="token punctuation">(</span><span class="token string">&quot;true&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%T %v\\n&quot;</span><span class="token punctuation">,</span> b<span class="token punctuation">,</span> b<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">Int2String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\u6570\u5B57\u8F6C\u5B57\u7B26\u4E32:\\n&quot;</span><span class="token punctuation">)</span>

	<span class="token comment">// int -&gt; \u5B57\u7B26\u4E32</span>
	x <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%T %s\\n&quot;</span><span class="token punctuation">,</span> x<span class="token punctuation">,</span> x<span class="token punctuation">)</span>

	<span class="token comment">// \u51FD\u6570\u7B7E\u540D\uFF1AFormatInt(i int64, base int) string\uFF0Cbase\u4EE3\u8868\u662F\u591A\u5C11\u8FDB\u5236\u7684\u6570\u5B57</span>
	<span class="token comment">// \u5148\u8F6C\u621010\u8FDB\u5236\u6570\u5B57\uFF0C\u7136\u540E\u8F6C\u4E3A\u6570\u5B57</span>
	<span class="token comment">// \u7528\u6CD5\u4E00\u6837\u7684\u51FD\u6570\u8FD8\u6709strconv.FormatUint</span>
	y <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">FormatInt</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%T %s\\n&quot;</span><span class="token punctuation">,</span> y<span class="token punctuation">,</span> y<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">Bool2String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\u5E03\u5C14\u8F6C\u5B57\u7B26\u4E32:\\n&quot;</span><span class="token punctuation">)</span>

	<span class="token comment">// \u51FD\u6570\u7B7E\u540D\uFF1AFormatBool(b bool) string</span>
	<span class="token comment">// \u8FD4\u56DE &quot;true&quot; or &quot;false&quot;</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%s\\n&quot;</span><span class="token punctuation">,</span> strconv<span class="token punctuation">.</span><span class="token function">FormatBool</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">Any2String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\u4EFB\u610F\u6570\u636E\u7C7B\u578B\u8F6C\u5B57\u7B26\u4E32:\\n&quot;</span><span class="token punctuation">)</span>

	<span class="token comment">// \u8FD9\u91CC\u4EE5float\u4E3E\u4F8B</span>

	<span class="token comment">// float -&gt; \u5B57\u7B26\u4E32</span>
	y <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;%.2f&quot;</span><span class="token punctuation">,</span> <span class="token number">3.1415926</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%T %s\\n&quot;</span><span class="token punctuation">,</span> y<span class="token punctuation">,</span> y<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// ----------------------- \u6570\u5B57\u4E4B\u95F4\u8F6C\u6362 ------------------</span>
	<span class="token comment">// \u6570\u5B57\u4E4B\u95F4\u8F6C\u6362</span>
	<span class="token function">Int2Float</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">Float2Int</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6570\u5B57\u5411\u4E0A\u53D6\u6574/\u5411\u4E0B\u53D6\u6574/\u56DB\u820D\u4E94\u5165</span>
	<span class="token function">CeilAndFloorAndRound</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// ----------------------- \u5B57\u7B26\u4E32\u4E4B\u95F4\u8F6C\u6362 ------------------</span>
	<span class="token comment">// \u5B57\u8282/Rune/\u5B57\u7B26\u4E32\u4E4B\u95F4\u7684\u8F6C\u6362\u53C2\u8003strings/bytes/unicode\u5305</span>
	<span class="token function">AddQuote</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// \u8F93\u51FA\u6DFB\u52A0\u53CC\u5F15\u53F7/\u5355\u5F15\u53F7</span>

	<span class="token comment">// ----------------------- \u5B57\u7B26\u4E32\u8F6C\u5230\u5176\u4ED6\u7C7B\u578B Parse\u7CFB\u5217\u51FD\u6570------------------</span>
	<span class="token function">String2Int</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">String2Bool</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// ----------------------- \u5176\u4ED6\u7C7B\u578B\u8F6C\u5230\u5B57\u7B26\u4E32 Format\u7CFB\u5217\u51FD\u6570------------------</span>
	<span class="token function">Int2String</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">Bool2String</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">Any2String</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code>Int\u8F6CFloat:
float32                    
                           
Float\u8F6CInt:                
int64 <span class="token number">100</span>                  
int64 -3                   
                           
\u5411\u4E0A\u53D6\u6574/\u5411\u4E0B\u53D6\u6574/\u56DB\u820D\u4E94\u5165:
float64 <span class="token number">2.000000</span>           
float64 <span class="token number">1.000000</span>           
float64 <span class="token number">1.000000</span>           
                           
\u8F93\u51FA\u6DFB\u52A0\u53CC\u5F15\u53F7/\u5355\u5F15\u53F7:     
<span class="token string">&quot;\u5B57\u7B26\u4E32&quot;</span>                   
<span class="token string">&#39;\u5B57&#39;</span>                       
                           
\u5B57\u7B26\u4E32\u8F6C\u6570\u5B57:              
<span class="token number">10</span>                         
<span class="token number">11</span>                         
<span class="token number">1.2</span>                        
                           
\u5B57\u7B26\u4E32\u8F6C\u5E03\u5C14:              
bool <span class="token boolean">true</span>                  
                           
\u6570\u5B57\u8F6C\u5B57\u7B26\u4E32:              
string <span class="token number">100</span>
string <span class="token number">13</span>

\u5E03\u5C14\u8F6C\u5B57\u7B26\u4E32:
<span class="token boolean">false</span>

\u4EFB\u610F\u6570\u636E\u7C7B\u578B\u8F6C\u5B57\u7B26\u4E32:
string <span class="token number">3.14</span>
</code></pre></div><h3 id="\u57FA\u672C\u6570\u636E\u7C7B\u578B\u603B\u7ED3\u{1F389}" tabindex="-1"><a class="header-anchor" href="#\u57FA\u672C\u6570\u636E\u7C7B\u578B\u603B\u7ED3\u{1F389}" aria-hidden="true">#</a> \u57FA\u672C\u6570\u636E\u7C7B\u578B\u603B\u7ED3\u{1F389}</h3><table><thead><tr><th>\u6570\u636E\u7C7B\u578B</th><th>\u5143\u7D20\u662F\u5426\u6709\u5E8F</th><th>\u503C\u7C7B\u578B/\u5F15\u7528\u7C7B\u578B</th><th>\u6307\u9488\u7C7B\u578B\u521D\u59CB\u5316\u5173\u952E\u5B57</th><th>\u96F6\u503C</th></tr></thead><tbody><tr><td>\u6570\u5B57</td><td>\u2714</td><td>\u503C\u7C7B\u578B</td><td><code>new</code></td><td><code>0</code></td></tr><tr><td>\u5B57\u7B26\u4E32</td><td>\u2714</td><td>\u503C\u7C7B\u578B</td><td><code>new</code></td><td>\u7A7A\u5B57\u7B26\u4E32</td></tr><tr><td>\u5E03\u5C14\u503C</td><td>\u2714</td><td>\u503C\u7C7B\u578B</td><td><code>new</code></td><td><code>false</code></td></tr><tr><td>\u6570\u7EC4</td><td>\u2714</td><td>\u503C\u7C7B\u578B</td><td><code>new</code></td><td>\u5143\u7D20\u6570\u636E\u7C7B\u578B\u7684\u96F6\u503C</td></tr><tr><td>\u5207\u7247</td><td>\u2714</td><td>\u5F15\u7528\u7C7B\u578B</td><td><code>make</code></td><td><code>nil</code></td></tr><tr><td>\u6620\u5C04</td><td>\u274C</td><td>\u5F15\u7528\u7C7B\u578B</td><td><code>make</code></td><td><code>nil</code></td></tr></tbody></table><h2 id="-1" tabindex="-1"><a class="header-anchor" href="#-1" aria-hidden="true">#</a></h2><h2 id="\u51FD\u6570" tabindex="-1"><a class="header-anchor" href="#\u51FD\u6570" aria-hidden="true">#</a> \u51FD\u6570</h2><h3 id="\u51FD\u6570\u5B9A\u4E49" tabindex="-1"><a class="header-anchor" href="#\u51FD\u6570\u5B9A\u4E49" aria-hidden="true">#</a> \u51FD\u6570\u5B9A\u4E49</h3><ul><li>\u51FD\u6570\u53EF\u4EE5\u6CA1\u6709\u8FD4\u56DE\u503C\uFF0C\u4E5F\u53EF\u4EE5\u6709\u591A\u4E2A\u8FD4\u56DE\u503C</li></ul><h4 id="\u57FA\u672C\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u57FA\u672C\u793A\u4F8B" aria-hidden="true">#</a> \u57FA\u672C\u793A\u4F8B</h4><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token comment">// \u53C2\u6570x\u548Cy\u90FD\u662Fint\u7C7B\u578B\uFF0C\u51FD\u6570\u8FD4\u56DE\u503C\u4E5F\u662Fint\u7C7B\u578B</span>
<span class="token keyword">func</span> <span class="token function">add</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> x <span class="token operator">+</span> y
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="\u53EF\u7701\u7565\u53C2\u6570" tabindex="-1"><a class="header-anchor" href="#\u53EF\u7701\u7565\u53C2\u6570" aria-hidden="true">#</a> \u53EF\u7701\u7565\u53C2\u6570</h4><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token comment">// options ...\u6570\u636E\u7C7B\u578B\uFF0C\u8FD9\u6837\u5B9A\u4E49\u7684\u53C2\u6570\u53EF\u4EE5\u4E0D\u4F20\u503C</span>
<span class="token keyword">func</span> <span class="token function">Login</span><span class="token punctuation">(</span>host<span class="token punctuation">,</span> port<span class="token punctuation">,</span> username<span class="token punctuation">,</span> password <span class="token builtin">string</span><span class="token punctuation">,</span> options <span class="token operator">...</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>host<span class="token punctuation">,</span> port<span class="token punctuation">,</span> username<span class="token punctuation">,</span> password<span class="token punctuation">,</span> options<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">Login</span><span class="token punctuation">(</span><span class="token string">&quot;0.0.0.0&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;3306&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;root&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;123456&quot;</span><span class="token punctuation">)</span>
	<span class="token function">Login</span><span class="token punctuation">(</span><span class="token string">&quot;0.0.0.0&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;3306&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;root&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;123456&quot;</span><span class="token punctuation">,</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;ssl&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">//0.0.0.0 3306 root 123456 []</span>
<span class="token comment">//0.0.0.0 3306 root 123456 [map[ssl:true]]</span>
</code></pre></div><h4 id="\u5B9E\u53C2\u4E3Anil" tabindex="-1"><a class="header-anchor" href="#\u5B9E\u53C2\u4E3Anil" aria-hidden="true">#</a> \u5B9E\u53C2\u4E3Anil</h4><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token comment">// \u5B9A\u4E49\u51FD\u6570</span>
<span class="token keyword">func</span> <span class="token function">MyFunc</span><span class="token punctuation">(</span>s <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span> <span class="token punctuation">{</span>
	s <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token string">&quot;hello world!&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> s
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u51FD\u6570\u8981\u6C42\u4F20\u5165\u4E00\u4E2A\u5B57\u7B26\u4E32\u5207\u7247\uFF0C\u800C\u4ED6\u7684\u96F6\u503C\u4E3Anil\uFF0C\u6240\u4EE5\u6211\u4EEC\u53EF\u4EE5\u4F20\u5165nil\uFF0C\u5728\u51FD\u6570\u5185\u90E8\u76F8\u5F53\u4E8E\u662F: s := make([]string, 0)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">MyFunc</span><span class="token punctuation">(</span><span class="token boolean">nil</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// [hello world!]</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="\u63A5\u53D7\u4EFB\u610F\u7C7B\u578B\u53C2\u6570" tabindex="-1"><a class="header-anchor" href="#\u63A5\u53D7\u4EFB\u610F\u7C7B\u578B\u53C2\u6570" aria-hidden="true">#</a> \u63A5\u53D7\u4EFB\u610F\u7C7B\u578B\u53C2\u6570</h4><p>\u5E76\u4E0D\u63A8\u8350\u8FD9\u6837\u5199\u51FD\u6570\uFF0C\u4EC5\u4F5C\u5B66\u4E60\u4F7F\u7528</p><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token comment">// \u4F7F\u7528\u53EF\u7701\u7565\u53C2\u6570 + interface\uFF0C\u53EF\u63A5\u53D7\u4EFB\u4F55\u7C7B\u578B\u7684\u53C2\u6570\uFF08\u5305\u62EC\u4E0D\u4F20\uFF09\uFF0C\u51FD\u6570\u5185\u90E8\u4F7F\u7528\u65AD\u8A00\u518D\u53BB\u5224\u65AD\u53C2\u6570\u7C7B\u578B</span>
<span class="token keyword">func</span> <span class="token function">test</span><span class="token punctuation">(</span>i <span class="token operator">...</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token operator">&gt;=</span> <span class="token number">1</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> m<span class="token punctuation">,</span> ok <span class="token operator">:=</span> i<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>m<span class="token punctuation">[</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;anomoy&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">test</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span>
		<span class="token string">&quot;name&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;bob&quot;</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="\u5185\u7F6E\u51FD\u6570" tabindex="-1"><a class="header-anchor" href="#\u5185\u7F6E\u51FD\u6570" aria-hidden="true">#</a> \u5185\u7F6E\u51FD\u6570</h3><h4 id="copy" tabindex="-1"><a class="header-anchor" href="#copy" aria-hidden="true">#</a> copy</h4><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u4F4D\u6570\u76F8\u540C\u7684\u60C5\u51B5\u4E0B\uFF0C\u5168\u90E8\u8986\u76D6</span>
	<span class="token keyword">var</span> s <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">}</span>
	<span class="token function">copy</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span> <span class="token comment">// [3, 2, 1]</span>

	<span class="token comment">// dst\u4F4D\u6570\u5C11\u7684\u60C5\u51B5\u4E0B\uFF0C\u53EA\u8986\u76D6\u90E8\u5206</span>
	<span class="token keyword">var</span> s1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">}</span>
	<span class="token function">copy</span><span class="token punctuation">(</span>s1<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span> <span class="token comment">// [3, 2]</span>

	<span class="token comment">// dst\u4E3A\u7A7A\u7684\u60C5\u51B5\u4E0B\uFF0Ccopy\u4E4B\u540E\u8FD8\u662F\u7A7A</span>
	<span class="token keyword">var</span> s2 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token function">copy</span><span class="token punctuation">(</span>s2<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s2<span class="token punctuation">)</span> <span class="token comment">// []</span>

	<span class="token comment">// src\u4F4D\u6570\u5C11\u7684\u60C5\u51B5\u4E0B\uFF0C\u53EA\u8986\u76D6\u90E8\u5206</span>
	<span class="token keyword">var</span> s3 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">}</span>
	<span class="token function">copy</span><span class="token punctuation">(</span>s3<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s3<span class="token punctuation">)</span> <span class="token comment">// [3 2 4]</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="defer\u5EF6\u8FDF\u8C03\u7528" tabindex="-1"><a class="header-anchor" href="#defer\u5EF6\u8FDF\u8C03\u7528" aria-hidden="true">#</a> defer\u5EF6\u8FDF\u8C03\u7528</h3><p>defer\u662F\u5EF6\u8FDF\u8C03\u7528\uFF0C\u6BD4\u5982\u6709<code>A</code>\u3001<code>B</code>\u4E24\u4E2A\u51FD\u6570\uFF0C\u5728<code>A</code>\u51FD\u6570\u4E2D<code>defer B()</code>\uFF0C\u90A3\u4E48\u5C31\u610F\u5473\u7740\u5728<code>A</code>\u51FD\u6570<code>return</code>\u6216<code>panic</code>\u4E4B\u540E\u8C03\u7528<code>B</code>\u51FD\u6570</p><h4 id="defer\u5E94\u7528\u573A\u666F" tabindex="-1"><a class="header-anchor" href="#defer\u5E94\u7528\u573A\u666F" aria-hidden="true">#</a> defer\u5E94\u7528\u573A\u666F</h4><ul><li><p>\u91CA\u653E\u8D44\u6E90</p><div class="language-go ext-go"><pre class="language-go"><code>m<span class="token punctuation">.</span>mutex<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">defer</span> m<span class="token punctuation">.</span>mutex<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div></li><li><p>\u5F02\u5E38\u5904\u7406</p></li><li><p>\u4FEE\u6539\u51FD\u6570\u8FD4\u56DE\u503C</p></li></ul><h4 id="defer\u673A\u5236" tabindex="-1"><a class="header-anchor" href="#defer\u673A\u5236" aria-hidden="true">#</a> defer\u673A\u5236</h4><ul><li><p>defer\u540E\u9762\u7684\u8868\u8FBE\u5F0F\u4E0D\u80FD\u52A0\u5706\u62EC\u53F7</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> <span class="token punctuation">(</span>fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>	<span class="token comment">// defer\u540E\u9762\u7684\u51FD\u6570\u8C03\u7528\uFF0C\u4E0D\u80FD\u52A0\u62EC\u53F7\uFF0C\u4F1A\u62A5\u8BED\u6CD5\u9519\u8BEF</span>
<span class="token punctuation">}</span>

</code></pre></div></details></li><li><p>\u82E5\u6267\u884C\u591A\u6B21<code>defer\u8BED\u53E5</code>\uFF0C\u5219\u6EE1\u8DB3<code>LIFO</code>\uFF08\u540E\u8FDB\u5148\u51FA\uFF09\uFF0C\u5373<span style="color:red;font-weight:bold;">\u540Edefer\u7684\u5148\u6267\u884C</span></p></li><li><p><span style="color:red;font-weight:bold;">\u88ABdefer\u7684\u51FD\u6570\u7684\u53C2\u6570\u5728\u6267\u884C\u5230defer\u8BED\u53E5\u7684\u65F6\u5019\u5C31\u88AB\u786E\u5B9A\u4E0B\u6765\u4E86</span></p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">test1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u6D4B\u8BD51&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">defer</span> fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d %p \\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> <span class="token operator">&amp;</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">test2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\u6D4B\u8BD52&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d %p \\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> <span class="token operator">&amp;</span>i<span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">test3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\u6D4B\u8BD53&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d %p \\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> <span class="token operator">&amp;</span>i<span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">test1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">test2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">test3</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u8F93\u51FA\u7ED3\u679C</summary><div class="language-bash ext-sh"><pre class="language-bash"><code>\u6D4B\u8BD51
<span class="token number">5</span> 0xc0000180b8 
<span class="token number">4</span> 0xc0000180b8 
<span class="token number">3</span> 0xc0000180b8 
<span class="token number">2</span> 0xc0000180b8 
<span class="token number">1</span> 0xc0000180b8 
<span class="token number">0</span> 0xc0000180b8 
               
\u6D4B\u8BD52          
<span class="token number">6</span> 0xc0000180f0 
<span class="token number">6</span> 0xc0000180f0 
<span class="token number">6</span> 0xc0000180f0 
<span class="token number">6</span> 0xc0000180f0 
<span class="token number">6</span> 0xc0000180f0 
<span class="token number">6</span> 0xc0000180f0 
               
\u6D4B\u8BD53          
<span class="token number">5</span> 0xc0000180f8 
<span class="token number">4</span> 0xc000018110 
<span class="token number">3</span> 0xc000018118 
<span class="token number">2</span> 0xc000018120 
<span class="token number">1</span> 0xc000018128 
<span class="token number">0</span> 0xc000018130 
</code></pre></div></details></li><li><p><span style="color:red;font-weight:bold;">defer\u548Creturn\u6267\u884C\u987A\u5E8F\u7684\u95EE\u9898</span></p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token comment">// \u5728defer\u4E2D\u4FEE\u6539\u8FD4\u56DE\u503C\u6210\u529F\uFF0C\u524D\u63D0\u662F\u5FC5\u987B\u63D0\u524D\u58F0\u660E\u8FD4\u56DE\u503C</span>
<span class="token keyword">func</span> <span class="token function">add1</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>result <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		result <span class="token operator">+=</span> <span class="token number">10</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> x <span class="token operator">+</span> y
<span class="token punctuation">}</span>

<span class="token comment">// \u5728defer\u4E2D\u4FEE\u6539\u8FD4\u56DE\u503C\u5931\u8D25\uFF0C\u5E76\u672A\u63D0\u524D\u58F0\u660E\u8FD4\u56DE\u503C</span>
<span class="token comment">// \u539F\u56E0\u662F\uFF1A</span>
<span class="token comment">// 		return\u5E76\u975E\u539F\u5B50\u64CD\u4F5C\uFF0C\u5171\u5206\u4E3A\u4E24\u6B65\uFF0C\u8D4B\u503C\u548C\u51FD\u6570\u8FD4\u56DE</span>
<span class="token comment">//		\u8D4B\u503C\uFF1A\u5C06\u7ED3\u679C\u5199\u5165\u5230\u8FD4\u56DE\u503C\u4E2D\uFF0C\u5982\u679C\u672A\u63D0\u524D\u58F0\u660E\uFF0C\u5C31\u5199\u5165\u5230\u4E00\u4E2A\u4E34\u65F6\u53D8\u91CF\u4E2D</span>
<span class="token comment">//		\u51FD\u6570\u8FD4\u56DE\uFF1A\u51FD\u6570\u5E26\u7740\u5F53\u524D\u8FD4\u56DE\u503C\u9000\u51FA</span>
<span class="token comment">// \u6267\u884C\u987A\u5E8F\uFF1Areturn\u8D4B\u503C --&gt; defer --&gt; return\u51FD\u6570\u8FD4\u56DE</span>

<span class="token keyword">func</span> <span class="token function">add2</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	result <span class="token operator">:=</span> x <span class="token operator">+</span> y <span class="token comment">// result\u5FC5\u987B\u5B9A\u4E49\u5728\u524D\u9762</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%p\\n&quot;</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>result<span class="token punctuation">)</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		result <span class="token operator">+=</span> <span class="token number">10</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%p\\n&quot;</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>result<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> result
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">add1</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 13</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">add2</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 9</span>
<span class="token punctuation">}</span>
</code></pre></div></details></li><li><p>defer\u53EF\u4EE5\u6355\u6349<code>panic</code></p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// recover\u51FD\u6570\u53EA\u80FD\u7528\u5728defer\u4E2D</span>
	<span class="token keyword">if</span> err <span class="token operator">:=</span> <span class="token function">recover</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;panic: &quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Close success!&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">WithPanic</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> <span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">panic</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NonPanic</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> <span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">WithPanic</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">NonPanic</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u8F93\u51FA\u7ED3\u679C</span>
<span class="token comment">// panic:  1</span>
<span class="token comment">// Close success!</span>
</code></pre></div></details></li><li><p>derfer\u4E00\u5B9A\u4F1A\u6267\u884C\u5417\uFF1F</p><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;os&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;defer called&quot;</span><span class="token punctuation">)</span>
	os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u8FD0\u884C\u4E4B\u540E\uFF0C\u53D1\u73B0\u4EC0\u4E48\u90FD\u6CA1\u6709\u8F93\u51FA\uFF0C\u8BF4\u660Edefer\u6CA1\u6709\u6B63\u5E38\u6267\u884C</span>
</code></pre></div></li></ul><h2 id="-2" tabindex="-1"><a class="header-anchor" href="#-2" aria-hidden="true">#</a></h2><h2 id="\u522B\u540D\u548C\u81EA\u5B9A\u4E49\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#\u522B\u540D\u548C\u81EA\u5B9A\u4E49\u7C7B\u578B" aria-hidden="true">#</a> \u522B\u540D\u548C\u81EA\u5B9A\u4E49\u7C7B\u578B</h2><h3 id="\u522B\u540D\u548C\u81EA\u5B9A\u4E49\u7C7B\u578B-1" tabindex="-1"><a class="header-anchor" href="#\u522B\u540D\u548C\u81EA\u5B9A\u4E49\u7C7B\u578B-1" aria-hidden="true">#</a> \u522B\u540D\u548C\u81EA\u5B9A\u4E49\u7C7B\u578B</h3><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">add</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> x <span class="token operator">+</span> y
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u5B9A\u4E49\u522B\u540D\uFF0C \u4F7F\u7528=\uFF0C \u4E0D\u80FD\u7ED9Counter\u6DFB\u52A0\u65B9\u6CD5\u7B49</span>
	<span class="token keyword">type</span> Counter <span class="token operator">=</span> <span class="token builtin">int</span>

	<span class="token comment">// \u4F7F\u7528\u522B\u540D\uFF0C\u53EF\u4EE5\u7EE7\u7EED\u50CF\u4F7F\u7528int\u4E00\u6837\u4F7F\u7528\uFF0C\u672C\u8D28\u4E0A\u5B83\u5C31\u662Fint</span>
	<span class="token keyword">var</span> a Counter <span class="token operator">=</span> <span class="token number">20</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 21</span>

	<span class="token comment">// ------------------------------------------------------</span>
	<span class="token comment">// \u81EA\u5B9A\u4E49\u7C7B\u578B, \u8FD9\u662F\u4E00\u4E2A\u5168\u65B0\u7684\u7C7B\u578B</span>
	<span class="token keyword">type</span> Number <span class="token builtin">int</span>

	<span class="token comment">// \u9519\u8BEF\u4F7F\u7528\u81EA\u5B9A\u4E49\u7C7B\u578B</span>
	<span class="token keyword">var</span> b Number <span class="token operator">=</span> <span class="token number">100</span>
	<span class="token comment">//fmt.Println(add(1, b)) // \u8FD9\u91CC\u4F1A\u62A5\u9519\uFF0C\u56E0\u4E3ANumber\u5DF2\u7ECF\u662F\u5168\u65B0\u7684\u7C7B\u578B\u4E86</span>

	<span class="token comment">// \u7C7B\u578B\u8F6C\u6362</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%T %#v\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">int8</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">int8</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">)</span>     <span class="token comment">// int8 100</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%T %#v\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">Number</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">Number</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// main.Number 20</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="\u4EFFhttp-handler\u5BF9\u8C61\u8F6C\u6362" tabindex="-1"><a class="header-anchor" href="#\u4EFFhttp-handler\u5BF9\u8C61\u8F6C\u6362" aria-hidden="true">#</a> \u4EFF<code>http handler</code>\u5BF9\u8C61\u8F6C\u6362</h3><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main
 
<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>
 
<span class="token comment">// \u81EA\u5B9A\u4E49\u7C7B\u578B</span>
<span class="token comment">// \u53EF\u4EE5\u4F7F\u7528HandFunc(\u51FD\u6570\u540D) \u5C06\u51FD\u6570\u8F6C\u4E3AHandFunc\u5BF9\u8C61\uFF0C\u51FD\u6570\u9700\u8981\u548CHandFunc\u4FDD\u6301\u7B7E\u540D\u4E00\u81F4</span>
<span class="token keyword">type</span> HandFunc <span class="token keyword">func</span><span class="token punctuation">(</span>x <span class="token builtin">int</span><span class="token punctuation">,</span> y <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span>
 
<span class="token comment">// \u81EA\u5B9A\u4E49\u7C7B\u578B-\u6269\u5C55\u65B9\u6CD5</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>f HandFunc<span class="token punctuation">)</span> <span class="token function">ServeHTTP</span><span class="token punctuation">(</span>x <span class="token builtin">int</span><span class="token punctuation">,</span> y <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
   <span class="token comment">// \u8FD9\u91CC\u7684f\u662FHandFunc\u5BF9\u8C61\uFF0C\u4E5F\u662F\u4E0A\u9762\u6240\u8BF4\u7684\u51FD\u6570\u5BF9\u8C61</span>
   <span class="token comment">// \u6240\u4EE5\u8FD9\u91CC\u8C03\u7528f(x, y)\u5C31\u76F8\u5F53\u4E8E\u8C03\u7528 \u51FD\u6570(x, y)</span>
   <span class="token keyword">return</span> <span class="token function">f</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
 
<span class="token comment">// \u81EA\u5B9A\u4E49\u51FD\u6570</span>
<span class="token keyword">func</span> <span class="token function">add</span><span class="token punctuation">(</span>x <span class="token builtin">int</span><span class="token punctuation">,</span> y <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> x <span class="token operator">+</span> y
<span class="token punctuation">}</span>
 
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token comment">// \u5C06\u81EA\u5B9A\u4E49\u51FD\u6570\u8F6C\u4E3A\u81EA\u5B9A\u4E49\u7C7B\u578B</span>
   add2 <span class="token operator">:=</span> <span class="token function">HandFunc</span><span class="token punctuation">(</span>add<span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%T\\n&quot;</span><span class="token punctuation">,</span> add<span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%T\\n&quot;</span><span class="token punctuation">,</span> add2<span class="token punctuation">)</span>
 
   <span class="token comment">// \u6B63\u5E38\u8C03\u7528</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">add2</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
 
   <span class="token comment">// \u81EA\u5B9A\u4E49\u7C7B\u578B\u53EF\u4EE5\u8C03\u7528\u66F4\u591A\u7684\u65B9\u6CD5</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>add2<span class="token punctuation">.</span><span class="token function">ServeHTTP</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code>func<span class="token punctuation">(</span>int, int<span class="token punctuation">)</span> int
main.HandFunc
<span class="token number">3</span>            
<span class="token number">3</span>            
<span class="token number">3</span>        
</code></pre></div><h2 id="-3" tabindex="-1"><a class="header-anchor" href="#-3" aria-hidden="true">#</a></h2><h2 id="\u7ED3\u6784\u4F53" tabindex="-1"><a class="header-anchor" href="#\u7ED3\u6784\u4F53" aria-hidden="true">#</a> \u7ED3\u6784\u4F53</h2><p>Go\u8BED\u8A00\u7684\u7ED3\u6784\u4F53\u5176\u5B9E\u5C31\u76F8\u5F53\u4E8E\u5176\u4ED6\u7F16\u7A0B\u8BED\u8A00\u7684\u7C7B</p><h3 id="\u57FA\u7840" tabindex="-1"><a class="header-anchor" href="#\u57FA\u7840" aria-hidden="true">#</a> \u57FA\u7840</h3><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// \u7ED3\u6784\u4F53\u5B9A\u4E49\u8BED\u6CD5</span>
<span class="token comment">//     \u8BED\u6CD51\uFF1A type \u7ED3\u6784\u4F53\u540D\u79F0 struct {}</span>
<span class="token comment">//     \u8BED\u6CD52\uFF1A \u8FD8\u53EF\u4EE5\u5B9A\u4E49\u533F\u540D\u7ED3\u6784\u4F53\uFF0C\u53C2\u8003\u4E0B\u65B9\u4EE3\u7801</span>
<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	id      <span class="token builtin">int</span>
	name    <span class="token builtin">string</span>
	address <span class="token builtin">string</span>
	phone   <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u521D\u59CB\u5316\u7A7A\u7ED3\u6784\u4F53</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>User<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// {0   }</span>

	<span class="token comment">//\u4F7F\u7528\u5B57\u9762\u91CF\u521D\u59CB\u5316</span>
	user1 <span class="token operator">:=</span> User<span class="token punctuation">{</span>
		id<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token string">&quot;Serry&quot;</span><span class="token punctuation">,</span> address<span class="token punctuation">:</span> <span class="token string">&quot;\u5E7F\u4E1C\u7701&quot;</span><span class="token punctuation">,</span> phone<span class="token punctuation">:</span> <span class="token string">&quot;19111111111&quot;</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>user1<span class="token punctuation">)</span> <span class="token comment">// {1 Serry \u5E7F\u4E1C\u7701 19111111111}</span>

	<span class="token comment">// \u4F7F\u7528\u5C5E\u6027\u521D\u59CB\u5316</span>
	<span class="token keyword">var</span> user2 User
	user2<span class="token punctuation">.</span>id <span class="token operator">=</span> <span class="token number">1</span>
	user2<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&quot;Bob&quot;</span>
	user2<span class="token punctuation">.</span>address <span class="token operator">=</span> <span class="token string">&quot;\u6CB3\u5317\u7701\u4FDD\u5B9A\u5E02&quot;</span>
	user2<span class="token punctuation">.</span>phone <span class="token operator">=</span> <span class="token string">&quot;13788888888&quot;</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>user2<span class="token punctuation">)</span> <span class="token comment">// {1 Bob \u6CB3\u5317\u7701\u4FDD\u5B9A\u5E02 13788888888}</span>

	<span class="token comment">// \u4F7F\u7528new\u51FD\u6570\u521D\u59CB\u5316\u3010\u6307\u9488\u7C7B\u578B\u7ED3\u6784\u4F53\u3011</span>
	<span class="token keyword">var</span> user3 <span class="token operator">*</span>User <span class="token operator">=</span> <span class="token function">new</span><span class="token punctuation">(</span>User<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>user3<span class="token punctuation">)</span> <span class="token comment">// &amp;{0   }</span>

	<span class="token comment">// \u5B9A\u4E49\u533F\u540D\u7ED3\u6784\u4F53\u5E76\u521D\u59CB\u5316</span>
	user4 <span class="token operator">:=</span> <span class="token keyword">struct</span> <span class="token punctuation">{</span>
		id    <span class="token builtin">int</span>
		phone <span class="token builtin">string</span>
	<span class="token punctuation">}</span><span class="token punctuation">{</span>
		id<span class="token punctuation">:</span>    <span class="token number">1</span><span class="token punctuation">,</span>
		phone<span class="token punctuation">:</span> <span class="token string">&quot;12345678910&quot;</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>user4<span class="token punctuation">)</span> <span class="token comment">// {1 12345678910}</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h3 id="\u81EA\u5B9A\u4E49tag" tabindex="-1"><a class="header-anchor" href="#\u81EA\u5B9A\u4E49tag" aria-hidden="true">#</a> \u81EA\u5B9A\u4E49Tag</h3>`,102),gn=s("\u5DF2\u77E5\u4F7F\u7528\u4E86\u7ED3\u6784\u4F53"),fn=n("code",null,"Tag",-1),bn=s("\u7684\u5E93\uFF1A"),yn={href:"https://github.com/golang/go/wiki/Well-known-struct-tags",target:"_blank",rel:"noopener noreferrer"},hn=s("https://github.com/golang/go/wiki/Well-known-struct-tags"),qn=p(`<p><code>Tag</code>\u4F7F\u7528\u8BED\u6CD5</p><div class="language-go ext-go"><pre class="language-go"><code><span class="token string">\`key1:&quot;value1&quot; key2:&quot;value2&quot; key3:&quot;value3&quot;...\`</span> <span class="token comment">// \u952E\u503C\u5BF9\u7528\u7A7A\u683C\u5206\u9694</span>
</code></pre></div><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;reflect&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name     <span class="token builtin">string</span> <span class="token string">\`my:&quot;username&quot;\`</span>
	Age      <span class="token builtin">uint8</span>
	Password <span class="token builtin">string</span> <span class="token string">\`my:&quot;min=6,max=10&quot;\`</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">GetTag</span><span class="token punctuation">(</span>u User<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u901A\u8FC7\u53CD\u5C04\u83B7\u53D6\u7C7B\u578B</span>
	t <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>u<span class="token punctuation">)</span>

	<span class="token comment">// \u4EE3\u7801						\u7C7B\u578B							\u8BF4\u660E</span>
	<span class="token comment">// t.NumField()											\u7ED3\u6784\u4F53\u5B57\u6BB5\u6570\u91CF</span>
	<span class="token comment">// t.Field(0)											\u7B2C1\u4E2A\u5B57\u6BB5</span>
	<span class="token comment">//	t.Field(1).Name 		\u5B57\u7B26\u4E32						\u5B57\u6BB5\u540D\uFF0C\u8FD9\u91CC\u662F Name</span>
	<span class="token comment">// 	t.Field(1).Tag  		StructTag(\u81EA\u5B9A\u4E49\u5B57\u7B26\u4E32\u7C7B\u578B)	Tag\uFF0C\u8FD9\u91CC\u662F my:&quot;username&quot;</span>
	<span class="token comment">//  t.Field(1).Tag.Get()	\u65B9\u6CD5							\u6839\u636Ekey\u83B7\u53D6value, key\u4E0D\u5B58\u5728\u8FD4\u56DE\u7A7A\u5B57\u7B26\u4E32</span>

	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%-10s   %-s\\n&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Struct Key&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Tag Value&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> t<span class="token punctuation">.</span><span class="token function">NumField</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		field <span class="token operator">:=</span> t<span class="token punctuation">.</span><span class="token function">Field</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
		key <span class="token operator">:=</span> field<span class="token punctuation">.</span>Name
		value <span class="token operator">:=</span> field<span class="token punctuation">.</span>Tag<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;my&quot;</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%-10s   %-s\\n&quot;</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	user <span class="token operator">:=</span> User<span class="token punctuation">{</span>
		Name<span class="token punctuation">:</span>     <span class="token string">&quot;Jack&quot;</span><span class="token punctuation">,</span>
		Age<span class="token punctuation">:</span>      <span class="token number">5</span><span class="token punctuation">,</span>
		Password<span class="token punctuation">:</span> <span class="token string">&quot;123456&quot;</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	<span class="token function">GetTag</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code>Struct Key   Tag Value
Name         username    
Age                      
Password     <span class="token assign-left variable">min</span><span class="token operator">=</span><span class="token number">6</span>,max<span class="token operator">=</span><span class="token number">10</span>
</code></pre></div><h3 id="\u7A7A\u7ED3\u6784\u4F53" tabindex="-1"><a class="header-anchor" href="#\u7A7A\u7ED3\u6784\u4F53" aria-hidden="true">#</a> \u7A7A\u7ED3\u6784\u4F53</h3><p><strong>\u7A7A\u7ED3\u6784\u4F53\u5360\u7528\u5185\u5B58\u4E3A0</strong></p><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;unsafe&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Empty <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u4F7F\u7528unsafe.Sizeof\u53EF\u4EE5\u67E5\u770B\u5360\u7528\u5185\u5B58\u5927\u5C0F,\u5355\u4F4D\u5B57\u8282</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d\\n&quot;</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span><span class="token function">int8</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment">// 1</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d\\n&quot;</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span><span class="token function">int16</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 2</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d\\n&quot;</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span>Empty<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>    <span class="token comment">// 0</span>
<span class="token punctuation">}</span>
</code></pre></div><p><strong>\u7A7A\u7ED3\u6784\u4F53\u7684\u5E94\u7528\u573A\u666F</strong></p><ul><li><p>\u65B9\u6CD5\u5206\u7EC4</p><p>\u5C06\u76F8\u540C\u7C7B\u578B\u7684\u65B9\u6CD5\u7EC4\u5408\u5728\u4E00\u8D77\uFF0C\u4FBF\u4E8E\u540E\u7EED\u6269\u5C55\u548C\u7EF4\u62A4</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;runtime&quot;</span>
	<span class="token string">&quot;strconv&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Platform <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>e <span class="token operator">*</span>Platform<span class="token punctuation">)</span> <span class="token function">GetOS</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> runtime<span class="token punctuation">.</span>GOOS
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>e <span class="token operator">*</span>Platform<span class="token punctuation">)</span> <span class="token function">GetOSBit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> strconv<span class="token punctuation">.</span>IntSize
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> platform Platform
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%s %dbits\\n&quot;</span><span class="token punctuation">,</span> platform<span class="token punctuation">.</span><span class="token function">GetOS</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> platform<span class="token punctuation">.</span><span class="token function">GetOSBit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>	<span class="token comment">// windows 64bits</span>
<span class="token punctuation">}</span>
</code></pre></div></details></li><li><p>\u5B9E\u73B0<code>set</code>\u7C7B\u578B</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> Set <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>s Set<span class="token punctuation">)</span> <span class="token function">Add</span><span class="token punctuation">(</span>item <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	s<span class="token punctuation">[</span>item<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>s Set<span class="token punctuation">)</span> <span class="token function">Remove</span><span class="token punctuation">(</span>item <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">delete</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> item<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>s Set<span class="token punctuation">)</span> <span class="token function">Exist</span><span class="token punctuation">(</span>item <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
	<span class="token boolean">_</span><span class="token punctuation">,</span> ok <span class="token operator">:=</span> s<span class="token punctuation">[</span>item<span class="token punctuation">]</span>
	<span class="token keyword">return</span> ok
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	set <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span>Set<span class="token punctuation">)</span>
	set<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;123&quot;</span><span class="token punctuation">)</span>
	set<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;456&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>set<span class="token punctuation">.</span><span class="token function">Exist</span><span class="token punctuation">(</span><span class="token string">&quot;123&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
	set<span class="token punctuation">.</span><span class="token function">Remove</span><span class="token punctuation">(</span><span class="token string">&quot;123&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>set<span class="token punctuation">.</span><span class="token function">Exist</span><span class="token punctuation">(</span><span class="token string">&quot;123&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// false</span>
<span class="token punctuation">}</span>
</code></pre></div></details></li><li><p>\u7A7A\u901A\u9053</p><p>\u5B9E\u73B0\u901A\u77E5\u578B<code>channel</code>\uFF0C\u5176\u4E0D\u9700\u8981\u53D1\u9001\u4EFB\u4F55\u6570\u636E\uFF0C\u53EA\u662F\u7528\u4E8E\u534F\u8C03<code>Goroutine</code>\u8FD0\u884C</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">3</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
		<span class="token function">close</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">)</span>
	<span class="token operator">&lt;-</span>ch
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;b&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details></li></ul><h3 id="\u7ED3\u6784\u4F53\u7EC4\u5408" tabindex="-1"><a class="header-anchor" href="#\u7ED3\u6784\u4F53\u7EC4\u5408" aria-hidden="true">#</a> \u7ED3\u6784\u4F53\u7EC4\u5408</h3><p>\u7C7B\u4F3C\u4E8E\u7C7B\u7684\u7EE7\u627F</p><p><strong>\u57FA\u7840\u7528\u6CD5</strong></p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> Addr <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	province <span class="token builtin">string</span>
	street   <span class="token builtin">string</span>
	number   <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	id    <span class="token builtin">int</span>
	name  <span class="token builtin">string</span>
	addr  Addr
	phone <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> addr <span class="token operator">=</span> Addr<span class="token punctuation">{</span>
		province<span class="token punctuation">:</span> <span class="token string">&quot;Hebei&quot;</span><span class="token punctuation">,</span>
		street<span class="token punctuation">:</span>   <span class="token string">&quot;\u5929\u5A01\u8DEF&quot;</span><span class="token punctuation">,</span>
		number<span class="token punctuation">:</span>   <span class="token string">&quot;10&quot;</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">var</span> user <span class="token operator">=</span> User<span class="token punctuation">{</span>
		id<span class="token punctuation">:</span>    <span class="token number">1</span><span class="token punctuation">,</span>
		name<span class="token punctuation">:</span>  <span class="token string">&quot;bob&quot;</span><span class="token punctuation">,</span>
		addr<span class="token punctuation">:</span>  addr<span class="token punctuation">,</span>
		phone<span class="token punctuation">:</span> <span class="token string">&quot;137111111111&quot;</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p><strong>K-V\u540C\u540D\u7B80\u5199</strong></p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Basic <span class="token comment">// Basic Basic\u7684\u7B80\u5199\u5F62\u5F0F,\u4F46\u4E0E\u76F4\u63A5\u5199Basic Basic\u6709\u533A\u522B</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Basic <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name <span class="token builtin">string</span>
	Age  <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>b <span class="token operator">*</span>Basic<span class="token punctuation">)</span> <span class="token function">GetName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> b<span class="token punctuation">.</span>Name
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	u <span class="token operator">:=</span> User<span class="token punctuation">{</span>
		Basic<span class="token punctuation">{</span>
			Name<span class="token punctuation">:</span> <span class="token string">&quot;July&quot;</span><span class="token punctuation">,</span>
			Age<span class="token punctuation">:</span>  <span class="token number">18</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%#v\\n&quot;</span><span class="token punctuation">,</span> u<span class="token punctuation">)</span>   <span class="token comment">// main.User{Basic:main.Basic{Name:&quot;July&quot;, Age:18}}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>u<span class="token punctuation">.</span><span class="token function">GetName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// July, User\u7ED3\u6784\u4F53\u5B9E\u4F8B\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528Basic\u7ED3\u6784\u4F53\u7684\u65B9\u6CD5,\u5982\u679C\u662F\u975E\u7B80\u5199\u5F62\u5F0F\u5219\u4E0D\u53EF\u4EE5\u76F4\u63A5\u8C03\u7528</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h3 id="\u7ED3\u6784\u4F53\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u7ED3\u6784\u4F53\u65B9\u6CD5" aria-hidden="true">#</a> \u7ED3\u6784\u4F53\u65B9\u6CD5</h3><p><strong>\u8BED\u6CD5</strong></p><div class="language-go ext-go"><pre class="language-go"><code><span class="token comment">// \u5B9A\u4E49\u7ED3\u6784\u4F53</span>
<span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	name <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u4E00\u822C\u6211\u4EEC\u4F1A\u4E3A\u7ED3\u6784\u4F53\u5B9A\u4E49\u4E00\u4E2A\u6784\u9020\u65B9\u6CD5\uFF08\u8FD9\u4E0D\u662F\u5FC5\u987B\u7684\uFF09</span>
<span class="token keyword">func</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">*</span>Person <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>Person<span class="token punctuation">{</span>name<span class="token punctuation">:</span> name<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u5B9A\u4E49\u7ED3\u6784\u4F53\u65B9\u6CD5</span>
<span class="token comment">// \u8BED\u6CD5\uFF1Afunc (\u63A5\u6536\u8005\u53D8\u91CF \u63A5\u6536\u8005\u7C7B\u578B) \u65B9\u6CD5\u540D(\u53C2\u6570\u5217\u8868) (\u8FD4\u56DE\u53C2\u6570)</span>
<span class="token comment">//      \u63A5\u6536\u8005\u53D8\u91CF: \u5EFA\u8BAE\u4F7F\u7528\u63A5\u6536\u8005\u7C7B\u578B\u540D\u79F0\u9996\u5B57\u6BCD\u7684\u5C0F\u5199\uFF0C\u800C\u4E0D\u662Fself\u3001this\u4E4B\u7C7B\u7684\u547D\u540D</span>
<span class="token comment">//      \u63A5\u6536\u8005\u7C7B\u578B\uFF1A\u503C\u7C7B\u578B\u548C\u6307\u9488\u7C7B\u578B</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>Person<span class="token punctuation">)</span> <span class="token function">GetName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> p<span class="token punctuation">.</span>name
<span class="token punctuation">}</span>
</code></pre></div><p><strong>\u503C\u63A5\u6536\u8005\u4F1A\u8FDB\u884C\u7ED3\u6784\u4F53\u62F7\u8D1D</strong></p><p>\u6D4B\u8BD51\uFF1A\u503C\u63A5\u6536\u8005\u4F1A\u5C06\u7ED3\u6784\u4F53\u62F7\u8D1D\u4E00\u4EFD\u5230\u65B9\u6CD5\u5185</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	name <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> Person <span class="token punctuation">{</span>
	<span class="token keyword">return</span> Person<span class="token punctuation">{</span>name<span class="token punctuation">:</span> name<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p Person<span class="token punctuation">)</span> <span class="token function">GetName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> p<span class="token punctuation">.</span>name
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>p Person<span class="token punctuation">)</span> <span class="token function">SetName</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;SetName: %p\\n&quot;</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>p<span class="token punctuation">)</span>
	p<span class="token punctuation">.</span>name <span class="token operator">=</span> name
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	bob <span class="token operator">:=</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span><span class="token string">&quot;bob&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;main: %p\\n&quot;</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>bob<span class="token punctuation">)</span>

	bob<span class="token punctuation">.</span><span class="token function">SetName</span><span class="token punctuation">(</span><span class="token string">&quot;jack&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>bob<span class="token punctuation">.</span><span class="token function">GetName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// \u8F93\u51FA\u7ED3\u679C</span>
	<span class="token comment">// main: 0xc00004a250</span>
	<span class="token comment">// SetName: 0xc00004a260</span>
	<span class="token comment">// bob</span>
    <span class="token comment">// \u603B\u7ED3\uFF1A\u503C\u63A5\u6536\u8005\u4F1A\u5C06\u7ED3\u6784\u4F53\u62F7\u8D1D\u4E00\u4EFD\u5230\u65B9\u6CD5\u5185\uFF0C\u6240\u4EE5\u5BFC\u81F4\u5E76\u6CA1\u6709\u5BF9\u7ED3\u6784\u4F53\u4FEE\u6539\u6210\u529F</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u6D4B\u8BD52\uFF1A\u6307\u9488\u63A5\u6536\u8005\u4E0D\u4F1A\u62F7\u8D1D\u7ED3\u6784\u4F53</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	name <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">*</span>Person <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>Person<span class="token punctuation">{</span>name<span class="token punctuation">:</span> name<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>Person<span class="token punctuation">)</span> <span class="token function">GetName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u8FD9\u91CC\u662F\u4E00\u4E2A\u8BED\u6CD5\u7CD6\uFF0C\u672C\u8D28\u4E0A\u4E3A return (*p).name</span>
	<span class="token keyword">return</span> p<span class="token punctuation">.</span>name
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>Person<span class="token punctuation">)</span> <span class="token function">SetName</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;SetName: %p\\n&quot;</span><span class="token punctuation">,</span> p<span class="token punctuation">)</span>
	p<span class="token punctuation">.</span>name <span class="token operator">=</span> name
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	bob <span class="token operator">:=</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span><span class="token string">&quot;bob&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;main: %p\\n&quot;</span><span class="token punctuation">,</span> bob<span class="token punctuation">)</span>

	bob<span class="token punctuation">.</span><span class="token function">SetName</span><span class="token punctuation">(</span><span class="token string">&quot;jack&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>bob<span class="token punctuation">.</span><span class="token function">GetName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// \u8F93\u51FA\u7ED3\u679C</span>
	<span class="token comment">// main: 0xc00010e110</span>
	<span class="token comment">// SetName: 0xc00010e110</span>
	<span class="token comment">// jack</span>
    <span class="token comment">// \u603B\u7ED3\uFF1A\u6307\u9488\u63A5\u6536\u8005\u4E0D\u4F1A\u62F7\u8D1D\u7ED3\u6784\u4F53\uFF0C\u6240\u4EE5\u5BF9\u7ED3\u6784\u4F53\u4FEE\u6539\u6210\u529F</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p><strong>\u7ED3\u6784\u4F53\u662Fmap-v\u7684\u602A\u5F02\u884C\u4E3A</strong></p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name <span class="token builtin">string</span>
	Sex  <span class="token builtin">string</span>
	Age  <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	m <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">uint</span><span class="token punctuation">]</span>Person<span class="token punctuation">{</span>
		<span class="token number">0</span><span class="token punctuation">:</span> Person<span class="token punctuation">{</span><span class="token string">&quot;\u5F20\u65E0\u5FCC&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\u7537&quot;</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token number">1</span><span class="token punctuation">:</span> Person<span class="token punctuation">{</span><span class="token string">&quot;\u8D75\u654F&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\u5973&quot;</span><span class="token punctuation">,</span> <span class="token number">21</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u6D4B\u8BD51\uFF1A\u8FD9\u4F1A\u62A5\u9519 cannot assign to struct field m[0].Age in map</span>
	m<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Age <span class="token operator">+=</span> <span class="token number">1</span>

	<span class="token comment">// \u6D4B\u8BD52\uFF1A\u8FC2\u56DE\u89E3\u51B3</span>
	<span class="token comment">//tmp := m[0]</span>
	<span class="token comment">//tmp.Age += 1</span>
	<span class="token comment">//m[0] = tmp</span>
	<span class="token comment">//fmt.Println(m[0].Age)</span>

	<span class="token comment">// \u6D4B\u8BD53\uFF1A\u5B9A\u4E49map\u4E3A\u6307\u9488\u7C7B\u578B\u540E\u89E3\u51B3</span>
	<span class="token comment">//m2 := map[uint]*Person{</span>
	<span class="token comment">//	0: &amp;Person{&quot;\u5F20\u65E0\u5FCC&quot;, &quot;\u7537&quot;, 20},</span>
	<span class="token comment">//	1: &amp;Person{&quot;\u8D75\u654F&quot;, &quot;\u5973&quot;, 21},</span>
	<span class="token comment">//}</span>
	<span class="token comment">//</span>
	<span class="token comment">//m2[0].Age += 1</span>
	<span class="token comment">//fmt.Println(m2[0].Age)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h3 id="\u51FD\u6570\u5F0F\u9009\u9879\u6A21\u5F0F\u2728" tabindex="-1"><a class="header-anchor" href="#\u51FD\u6570\u5F0F\u9009\u9879\u6A21\u5F0F\u2728" aria-hidden="true">#</a> \u51FD\u6570\u5F0F\u9009\u9879\u6A21\u5F0F\u2728</h3><p>\u8BE5\u6A21\u5F0F\u89E3\u51B3\u7684\u95EE\u9898\u662F\u5982\u4F55\u66F4\u52A8\u6001\u7075\u6D3B\u5730\u4E3A\u5BF9\u8C61\u914D\u7F6E\u53C2\u6570</p><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token comment">// \u5B9A\u4E49\u7ED3\u6784\u4F53</span>
<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name <span class="token builtin">string</span> <span class="token comment">// \u5FC5\u987B\u5B57\u6BB5</span>
	Age  <span class="token builtin">uint8</span>  <span class="token comment">// \u975E\u5FC5\u987B</span>
	Sex  <span class="token builtin">string</span> <span class="token comment">// \u975E\u5FC5\u987B</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u5B9A\u4E49\u5404\u79CD\u9009\u9879</span>
<span class="token keyword">type</span> Option <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token operator">*</span>User<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">WithAge</span><span class="token punctuation">(</span>age <span class="token builtin">uint8</span><span class="token punctuation">)</span> Option <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>user <span class="token operator">*</span>User<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		user<span class="token punctuation">.</span>Age <span class="token operator">=</span> age
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">WithSex</span><span class="token punctuation">(</span>sex <span class="token builtin">string</span><span class="token punctuation">)</span> Option <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>user <span class="token operator">*</span>User<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		user<span class="token punctuation">.</span>Sex <span class="token operator">=</span> sex
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">DefaultOptions</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>Option <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>Option<span class="token punctuation">{</span><span class="token function">WithAge</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">WithSex</span><span class="token punctuation">(</span><span class="token string">&quot;superman&quot;</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u6784\u9020\u65B9\u6CD5</span>
<span class="token keyword">func</span> <span class="token function">NewUser</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">,</span> options <span class="token operator">...</span>Option<span class="token punctuation">)</span> <span class="token operator">*</span>User <span class="token punctuation">{</span>
	<span class="token comment">// (1) \u5FC5\u987B\u6709\u7684\u5B57\u6BB5\u76F4\u63A5\u5199\u5230\u51FD\u6570\u7B7E\u540D\u4E2D\uFF0C\u8FD9\u91CC\u53EA\u6709\u4E00\u4E2Aname</span>
	<span class="token comment">// (2) \u53EF\u6709\u53EF\u65E0\u7684\u901A\u8FC7options\u52A8\u6001\u4F20\u9012</span>
	<span class="token comment">// (3) \u4EE5\u540E\u82E5\u589E\u52A0\u65B0\u7684\u9009\u9879\uFF0C\u4E5F\u4E0D\u9700\u8981\u6539\u6784\u9020\u51FD\u6570</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316\u7ED3\u6784\u4F53</span>
	user <span class="token operator">:=</span> <span class="token operator">&amp;</span>User<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> name<span class="token punctuation">}</span>

	<span class="token comment">// \u8BBE\u7F6E\u9ED8\u8BA4\u53C2\u6570</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> option <span class="token operator">:=</span> <span class="token keyword">range</span> <span class="token function">DefaultOptions</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">option</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u81EA\u5B9A\u4E49\u53C2\u6570</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> option <span class="token operator">:=</span> <span class="token keyword">range</span> options <span class="token punctuation">{</span>
		<span class="token function">option</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> user
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	bob <span class="token operator">:=</span> <span class="token function">NewUser</span><span class="token punctuation">(</span><span class="token string">&quot;bob&quot;</span><span class="token punctuation">)</span>
	jack <span class="token operator">:=</span> <span class="token function">NewUser</span><span class="token punctuation">(</span><span class="token string">&quot;jack&quot;</span><span class="token punctuation">,</span> <span class="token function">WithAge</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">WithSex</span><span class="token punctuation">(</span><span class="token string">&quot;man&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	julie <span class="token operator">:=</span> <span class="token function">NewUser</span><span class="token punctuation">(</span><span class="token string">&quot;julie&quot;</span><span class="token punctuation">,</span> <span class="token function">WithSex</span><span class="token punctuation">(</span><span class="token string">&quot;woman&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%#v\\n&quot;</span><span class="token punctuation">,</span> bob<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%#v\\n&quot;</span><span class="token punctuation">,</span> jack<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%#v\\n&quot;</span><span class="token punctuation">,</span> julie<span class="token punctuation">)</span>

	<span class="token comment">//&amp;main.User{Name:&quot;bob&quot;, Age:0xa, Sex:&quot;superman&quot;}</span>
	<span class="token comment">//&amp;main.User{Name:&quot;jack&quot;, Age:0x14, Sex:&quot;man&quot;}  </span>
	<span class="token comment">//&amp;main.User{Name:&quot;julie&quot;, Age:0xa, Sex:&quot;woman&quot;}</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="\u7ED3\u6784\u4F53\u5185\u5B58\u5927\u5C0F\u8BA1\u7B97" tabindex="-1"><a class="header-anchor" href="#\u7ED3\u6784\u4F53\u5185\u5B58\u5927\u5C0F\u8BA1\u7B97" aria-hidden="true">#</a> \u7ED3\u6784\u4F53\u5185\u5B58\u5927\u5C0F\u8BA1\u7B97</h3><p><strong>\u7ED3\u8BBA\u5148\u884C</strong></p><p>\u7ED3\u6784\u4F53\u5185\u5B58\u5360\u7528\u5927\u5C0F\u662F<span style="color:red;font-weight:bold;">\u6BCF\u4E2A\u5B57\u6BB5\u5185\u5B58\u5BF9\u9F50\u4E4B\u540E\u5360\u7528\u4E4B\u548C</span>\uFF0C\u5E76\u4E0D\u662F\u6BCF\u4E2A\u5B57\u6BB5\u5360\u7528\u4E4B\u548C</p><p><strong>\uFF081\uFF09\u7ED3\u6784\u4F53\u5185\u5B58\u5BF9\u9F50\u89C4\u5219</strong></p><ul><li>\u7B2C\u4E00\u4E2A\u5B57\u6BB5\u5728\u4E0E\u7ED3\u6784\u4F53\u504F\u79FB\u91CF\u4E3A0\u7684\u5730\u5740\u5904</li><li>\u5176\u4ED6\u5B57\u6BB5\u8981\u5BF9\u9F50\u5230\u5BF9\u9F50\u6570\u7684\u6574\u6570\u500D\u7684\u5730\u5740\u5904</li></ul><p><strong>\uFF082\uFF09\u67E5\u770B\u6BCF\u79CD\u6570\u636E\u7C7B\u578B\u5360\u7528\u5927\u5C0F\u548C\u5BF9\u9F50\u6570</strong></p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;unsafe&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;bool  : Size %2d, Alignment %d\\n&quot;</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span><span class="token function">bool</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Alignof</span><span class="token punctuation">(</span><span class="token function">bool</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;int8  : Size %2d, Alignment %d\\n&quot;</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span><span class="token function">int8</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Alignof</span><span class="token punctuation">(</span><span class="token function">int8</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;int16 : Size %2d, Alignment %d\\n&quot;</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span><span class="token function">int16</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Alignof</span><span class="token punctuation">(</span><span class="token function">int16</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;int32 : Size %2d, Alignment %d\\n&quot;</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span><span class="token function">int32</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Alignof</span><span class="token punctuation">(</span><span class="token function">int32</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;int64 : Size %2d, Alignment %d\\n&quot;</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span><span class="token function">int64</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Alignof</span><span class="token punctuation">(</span><span class="token function">int64</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;byte  : Size %2d, Alignment %d\\n&quot;</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Alignof</span><span class="token punctuation">(</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;rune  : Size %2d, Alignment %d\\n&quot;</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span><span class="token function">rune</span><span class="token punctuation">(</span><span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Alignof</span><span class="token punctuation">(</span><span class="token function">rune</span><span class="token punctuation">(</span><span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;string: Size %2d, Alignment %d\\n&quot;</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Alignof</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;struct: Size %2d, Alignment %d\\n&quot;</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span><span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Alignof</span><span class="token punctuation">(</span><span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-go ext-go"><pre class="language-go"><code><span class="token builtin">bool</span>  <span class="token punctuation">:</span> Size  <span class="token number">1</span><span class="token punctuation">,</span> Alignment <span class="token number">1</span>
<span class="token builtin">int8</span>  <span class="token punctuation">:</span> Size  <span class="token number">1</span><span class="token punctuation">,</span> Alignment <span class="token number">1</span>
<span class="token builtin">int16</span> <span class="token punctuation">:</span> Size  <span class="token number">2</span><span class="token punctuation">,</span> Alignment <span class="token number">2</span>
<span class="token builtin">int32</span> <span class="token punctuation">:</span> Size  <span class="token number">4</span><span class="token punctuation">,</span> Alignment <span class="token number">4</span>
<span class="token builtin">int64</span> <span class="token punctuation">:</span> Size  <span class="token number">8</span><span class="token punctuation">,</span> Alignment <span class="token number">8</span>
<span class="token builtin">byte</span>  <span class="token punctuation">:</span> Size  <span class="token number">1</span><span class="token punctuation">,</span> Alignment <span class="token number">1</span>
<span class="token builtin">rune</span>  <span class="token punctuation">:</span> Size  <span class="token number">4</span><span class="token punctuation">,</span> Alignment <span class="token number">4</span>
<span class="token builtin">string</span><span class="token punctuation">:</span> Size <span class="token number">16</span><span class="token punctuation">,</span> Alignment <span class="token number">8</span>
<span class="token keyword">struct</span><span class="token punctuation">:</span> Size  <span class="token number">0</span><span class="token punctuation">,</span> Alignment <span class="token number">1</span>

<span class="token comment">// Size\u4EE3\u8868\u5360\u7528\u5185\u5B58\u5927\u5C0F\uFF08\u5355\u4F4D\u5B57\u8282\uFF09</span>
<span class="token comment">// Alignment\u4EE3\u8868\u5185\u5B58\u5BF9\u9F50\u6570\u5B57\uFF08\u5355\u4F4D\u5B57\u8282\uFF09</span>
</code></pre></div><p><strong>\uFF083\uFF09\u5BF9\u9F50\u89C4\u5219\u9A8C\u8BC1</strong></p><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;unsafe&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> P1 <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	a <span class="token builtin">bool</span>   <span class="token comment">// \u504F\u79FB\u91CF\u4E3A0, \u81EA\u8EAB\u5360\u75281\u4E2A\u5B57\u8282</span>
	b <span class="token builtin">int32</span>  <span class="token comment">// \u4E0Ea\u505A\u5185\u5B58\u5BF9\u9F50,int32\u7C7B\u578B\u7684\u5BF9\u9F50\u500D\u6570\u4E3A4,\u5BFC\u81F4\u504F\u79FB\u91CF\u4E3A4,\u81EA\u8EAB\u53C8\u5360\u75284\u4E2A\u5B57\u8282,\u6240\u4EE5\u672C\u5B57\u6BB5\u7ED3\u675F\u4F4D\u7F6E\u5728\u504F\u79FB\u91CF\u4E3A8\u7684\u4F4D\u7F6E</span>
	c <span class="token builtin">byte</span>   <span class="token comment">// \u4E0Eb\u505A\u5185\u5B58\u5BF9\u9F50,\u504F\u79FB\u91CF\u4E3A9\u7684\u4F4D\u7F6E</span>
	d <span class="token builtin">string</span> <span class="token comment">// \u4E0Ec\u505A\u5185\u5B58\u5BF9\u9F50,\u504F\u79FB\u91CF\u5F00\u59CB\u4F4D\u7F6E\u572816,\u81EA\u8EAB\u5360\u752816,\u6700\u7EC8\u4F4D\u7F6E\u572832</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> P2 <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	a <span class="token builtin">bool</span>   <span class="token comment">// \u504F\u79FB\u91CF\u4E3A0,\u6700\u7EC8\u4F4D\u7F6E1</span>
	c <span class="token builtin">byte</span>   <span class="token comment">// \u504F\u79FB\u91CF\u4E3A1,\u6700\u7EC8\u4F4D\u7F6E2</span>
	b <span class="token builtin">int32</span>  <span class="token comment">// \u504F\u79FB\u91CF\u5F00\u59CB\u4E3A4,\u7ED3\u675F\u4E3A8</span>
	d <span class="token builtin">string</span> <span class="token comment">// \u504F\u79FB\u91CF\u5F00\u59CB\u4E3A8,\u7ED3\u675F\u4E3A 8 + 16 = 24</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span>P1<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 32</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span>P2<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 24</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="-4" tabindex="-1"><a class="header-anchor" href="#-4" aria-hidden="true">#</a></h2><h2 id="\u63A5\u53E3" tabindex="-1"><a class="header-anchor" href="#\u63A5\u53E3" aria-hidden="true">#</a> \u63A5\u53E3</h2><h3 id="\u6982\u5FF5" tabindex="-1"><a class="header-anchor" href="#\u6982\u5FF5" aria-hidden="true">#</a> \u6982\u5FF5</h3><p>\u63A5\u53E3\u662F\u4E00\u4E2A\u7C7B\u578B\uFF0C\u5C31\u548C<code>int</code>\u3001<code>string</code>\u3001<code>map</code>\u7B49\u4E00\u6837\uFF0C\u662F\u7C7B\u578B\uFF0C\u4E0D\u662F\u503C</p><p>\u63A5\u53E3\u662F\u4E00\u7CFB\u5217\u65B9\u6CD5\u7684\u96C6\u5408\uFF0C\u6BD4\u5982<code>io.Writer</code>\u5C31\u662F\u4E00\u4E2A\u63A5\u53E3</p><p>\u67D0\u4E2A\u503C\u5B9E\u73B0\u4E86\u67D0\u4E2A\u63A5\u53E3\u7684\u6240\u6709\u65B9\u6CD5\uFF0C\u6211\u4EEC\u79F0\u5B83\u5B9E\u73B0\u4E86\u67D0\u4E2A\u63A5\u53E3\uFF0C\u6BD4\u5982<code>os.Stdout</code>\u5B9E\u73B0\u4E86<code>io.Writer</code>\u63A5\u53E3</p><p>\u4E0B\u9762\u7528\u4EE3\u7801\u6F14\u793A\u4E00\u4E0B</p><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;os&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u58F0\u660E\u53D8\u91CFw,\u7C7B\u578B\u4E3A io.Writer, \u8FD9\u662F\u4E00\u4E2A\u63A5\u53E3\u7C7B\u578B\u7684\u53D8\u91CF</span>
	<span class="token keyword">var</span> w io<span class="token punctuation">.</span>Writer

	<span class="token comment">// \u7ED9\u63A5\u53E3\u7C7B\u578B\u53D8\u91CF\u8D4B\u503C</span>
	w <span class="token operator">=</span> os<span class="token punctuation">.</span>Stdout

	<span class="token comment">// \u8C03\u7528</span>
	<span class="token boolean">_</span><span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">=</span> w<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>	<span class="token comment">// hello</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="\u63A5\u53E3\u7C7B\u578B\u90FD\u53EF\u4EE5\u7528\u5728\u54EA" tabindex="-1"><a class="header-anchor" href="#\u63A5\u53E3\u7C7B\u578B\u90FD\u53EF\u4EE5\u7528\u5728\u54EA" aria-hidden="true">#</a> \u63A5\u53E3\u7C7B\u578B\u90FD\u53EF\u4EE5\u7528\u5728\u54EA</h3><p>\u63A5\u53E3\u662F\u4E00\u79CD\u7C7B\u578B\uFF0C\u90A3\u4E48\u90FD\u53EF\u4EE5\u7528\u5728\u54EA\u5462\uFF1F</p><p>\uFF081\uFF09\u58F0\u660E\u53D8\u91CF\u4E3A\u63A5\u53E3\u7C7B\u578B</p><p>\uFF082\uFF09\u51FD\u6570\u5F62\u53C2\u6307\u5B9A\u4E3A\u63A5\u53E3\u7C7B\u578B</p><p>\uFF083\uFF09\u7ED3\u6784\u4F53\u5B57\u6BB5\u6307\u5B9A\u4E3A\u63A5\u53E3\u7C7B\u578B</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;os&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">WriteString</span><span class="token punctuation">(</span>w io<span class="token punctuation">.</span>Writer<span class="token punctuation">,</span> msg <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> w<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	io<span class="token punctuation">.</span>Writer
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u5E94\u75281: \u58F0\u660E\u4E3A\u63A5\u53E3\u53D8\u91CF</span>
	<span class="token keyword">var</span> w io<span class="token punctuation">.</span>Writer
	w <span class="token operator">=</span> os<span class="token punctuation">.</span>Stdout
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> w<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">&quot;hello &quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u5E94\u75282: \u51FD\u6570\u5F62\u53C2\u4E3A\u63A5\u53E3\u7C7B\u578B</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">WriteString</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> <span class="token string">&quot;world&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u5E94\u75283: \u7ED3\u6784\u4F53\u5B57\u6BB5\u4E3A\u63A5\u53E3\u7C7B\u578B</span>
	user <span class="token operator">:=</span> User<span class="token punctuation">{</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">}</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> user<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">&quot;!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u8F93\u51FA\u7ED3\u679C\uFF1A</span>
<span class="token comment">// hello world!</span>
</code></pre></div></details><h3 id="\u63A5\u53E3\u7C7B\u578B\u503C\u90FD\u53EF\u4EE5\u662F\u4EC0\u4E48" tabindex="-1"><a class="header-anchor" href="#\u63A5\u53E3\u7C7B\u578B\u503C\u90FD\u53EF\u4EE5\u662F\u4EC0\u4E48" aria-hidden="true">#</a> \u63A5\u53E3\u7C7B\u578B\u503C\u90FD\u53EF\u4EE5\u662F\u4EC0\u4E48</h3><p>\u51E1\u662F\u5B9E\u73B0\u4E86\u63A5\u53E3\u4E2D\u5B9A\u4E49\u7684\u65B9\u6CD5\u7684\u5BF9\u8C61\u90FD\u53EF\u4EE5\u662F\u63A5\u53E3\u503C\uFF0C\u90FD\u6709\u54EA\u4E9B\u5462\uFF1F</p><p>\uFF081\uFF09\u7ED3\u6784\u4F53\uFF08\u8FD9\u4E2A\u662F\u6700\u5E38\u7528\u7684\uFF09</p><p>\uFF082\uFF09\u81EA\u5B9A\u4E49\u7C7B\u578B\uFF08\u4E00\u4E2A\u81EA\u5B9A\u4E49\u7C7B\u578B\u4F5C\u4E3A\u63A5\u53E3\u7C7B\u578B\u7684\u503C\uFF0C\u611F\u89C9\u6709\u70B9\u5947\u602A\u54C8~\uFF09</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;os&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// \u5B9A\u4E49\u63A5\u53E3</span>
<span class="token keyword">type</span> Writer <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u81EA\u5B9A\u4E49\u7C7B\u578B</span>
<span class="token keyword">type</span> Stdout <span class="token builtin">string</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>m Stdout<span class="token punctuation">)</span> <span class="token function">Write</span><span class="token punctuation">(</span>w <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> os<span class="token punctuation">.</span>Stdout<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>w<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> a Stdout <span class="token comment">// \u58F0\u660E\u53D8\u91CFa\u4E3A\u81EA\u5B9A\u4E49\u7C7B\u578B</span>
	<span class="token keyword">var</span> b Writer <span class="token comment">// \u58F0\u660E\u53D8\u91CFb\u4E3A\u63A5\u53E3\u7C7B\u578B</span>
	b <span class="token operator">=</span> a        <span class="token comment">// \u81EA\u5B9A\u4E49\u7C7B\u578B\u5B9E\u73B0\u4E86Reader\u63A5\u53E3,\u6240\u4EE5\u53EF\u4EE5\u5C06a\u8D4B\u503C\u7ED9b</span>

	<span class="token comment">// \u8C03\u7528\u65B9\u6CD5</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> b<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u8F93\u51FA\u7ED3\u679C</span>
<span class="token comment">// hello</span>
</code></pre></div></details><h3 id="\u503C\u63A5\u6536\u8005\u548C\u6307\u9488\u63A5\u6536\u8005" tabindex="-1"><a class="header-anchor" href="#\u503C\u63A5\u6536\u8005\u548C\u6307\u9488\u63A5\u6536\u8005" aria-hidden="true">#</a> \u503C\u63A5\u6536\u8005\u548C\u6307\u9488\u63A5\u6536\u8005</h3><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token comment">// \u5B9A\u4E49Sender\u63A5\u53E3</span>
<span class="token keyword">type</span> Sender <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Send</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u5B9A\u4E49\u5FAE\u4FE1\u5A92\u4ECB</span>
<span class="token keyword">type</span> Weixin <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	User     <span class="token builtin">string</span>
	Password <span class="token builtin">string</span>
	Phone    <span class="token builtin">string</span>
	To       <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>Weixin<span class="token punctuation">)</span> <span class="token function">Send</span><span class="token punctuation">(</span>msg <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span> <span class="token comment">// \u6307\u9488\u65B9\u6CD5</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Weixin Send: %s\\n&quot;</span><span class="token punctuation">,</span> msg<span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u5B9A\u4E49\u90AE\u7BB1\u5A92\u4ECB</span>
<span class="token keyword">type</span> Email <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Addr     <span class="token builtin">string</span>
	Port     <span class="token builtin">string</span>
	User     <span class="token builtin">string</span>
	Password <span class="token builtin">string</span>
	to       <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>e Email<span class="token punctuation">)</span> <span class="token function">Send</span><span class="token punctuation">(</span>msg <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span> <span class="token comment">// \u503C\u65B9\u6CD5</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Email Send: %s\\n&quot;</span><span class="token punctuation">,</span> msg<span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u6D4B\u8BD51</span>
	<span class="token keyword">var</span> x Sender    <span class="token comment">// \u58F0\u660Ex\u4E3ASender\u63A5\u53E3\u7C7B\u578B</span>
	x <span class="token operator">=</span> <span class="token operator">&amp;</span>Weixin<span class="token punctuation">{</span><span class="token punctuation">}</span>   <span class="token comment">// \u7ED9x\u8D4B\u503C, \u63A5\u6536\u8005\u662F\u6307\u9488\u7C7B\u578B\u7684,\u6240\u4EE5\u8FD9\u91CC\u5FC5\u987B\u4F7F\u7528\u6307\u9488\u7C7B\u578B</span>
	x<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span> <span class="token comment">// \u8C03\u7528\u65B9\u6CD5</span>

	<span class="token comment">// \u6D4B\u8BD52</span>
	<span class="token keyword">var</span> y<span class="token punctuation">,</span> z Sender <span class="token comment">// \u58F0\u660ESender\u63A5\u53E3\u7C7B\u578B</span>
	y <span class="token operator">=</span> Email<span class="token punctuation">{</span><span class="token punctuation">}</span>     <span class="token comment">// \u8D4B\u503C</span>
	z <span class="token operator">=</span> <span class="token operator">&amp;</span>Email<span class="token punctuation">{</span><span class="token punctuation">}</span>    <span class="token comment">// \u8D4B\u503C</span>
	y<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span> <span class="token comment">// \u8C03\u7528\u65B9\u6CD5</span>
	z<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span> <span class="token comment">// \u8C03\u7528\u65B9\u6CD5,\u6307\u9488\u5BF9\u8C61\u8C03\u7528\u7684\u672C\u8D28\u8FD8\u662F\u503C\u5BF9\u8C61\u8C03\u7528,\u53EA\u662F\u8BED\u6CD5\u7CD6</span>

	<span class="token comment">// \u8F93\u51FA\u7ED3\u679C</span>
	<span class="token comment">// Weixin Send: hello</span>
	<span class="token comment">// Email Send: hello</span>
	<span class="token comment">// Email Send: hello</span>
	<span class="token comment">// \u603B\u7ED3:</span>
	<span class="token comment">// (1) \u6307\u9488\u7C7B\u578B\u63A5\u6536\u8005\u7684\u65B9\u6CD5\u5FC5\u987B\u4F7F\u7528\u6307\u9488\u5BF9\u8C61\u6765\u8C03\u7528</span>
	<span class="token comment">// (2) \u503C\u7C7B\u578B\u63A5\u6536\u8005\u7684\u65B9\u6CD5\u65E2\u53EF\u4EE5\u7528\u503C\u5BF9\u8C61\u8C03\u7528,\u4E5F\u53EF\u4EE5\u7528\u6307\u9488\u5BF9\u8C61\u8C03\u7528</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h3 id="\u7A7A\u63A5\u53E3" tabindex="-1"><a class="header-anchor" href="#\u7A7A\u63A5\u53E3" aria-hidden="true">#</a> \u7A7A\u63A5\u53E3</h3><p><span style="color:red;font-weight:bold;">\u7A7A\u63A5\u53E3\u610F\u4E3A\u7740\u53EF\u4EE5\u63A5\u53D7\u4EFB\u610F\u7C7B\u578B\u7684\u503C</span>\uFF0C</p><p><span style="color:blue;font-weight:bold;">\u4E5F\u610F\u5473\u7740\u6211\u4EEC\u4E0D\u80FD\u786E\u5B9A\u503C\u662F\u4EC0\u4E48\u7C7B\u578B</span></p><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token comment">// \u5B9A\u4E49\u7A7A\u63A5\u53E3</span>
<span class="token keyword">type</span> Empty <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> a Empty
	a <span class="token operator">=</span> <span class="token number">1</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>	<span class="token comment">// 1</span>
	a <span class="token operator">=</span> <span class="token string">&quot;Hello&quot;</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>	<span class="token comment">// Hello</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="\u65AD\u8A00\u548C\u67E5\u8BE2" tabindex="-1"><a class="header-anchor" href="#\u65AD\u8A00\u548C\u67E5\u8BE2" aria-hidden="true">#</a> \u65AD\u8A00\u548C\u67E5\u8BE2</h3><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">//\u5B9A\u4E49\u4E00\u4E2A\u7ED3\u6784\u4F53</span>
<span class="token keyword">type</span> EmailSender <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Addr     <span class="token builtin">string</span>
	Port     <span class="token builtin">string</span>
	User     <span class="token builtin">string</span>
	Password <span class="token builtin">string</span>
	to       <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>EmailSender<span class="token punctuation">)</span> <span class="token function">Send</span><span class="token punctuation">(</span>msg <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello &quot;</span> <span class="token operator">+</span> msg<span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token comment">//\u5B9A\u4E49\u4E00\u4E2A\u7ED3\u6784\u4F53</span>
<span class="token keyword">type</span> WeiChartSender <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	User     <span class="token builtin">string</span>
	Password <span class="token builtin">string</span>
	to       <span class="token builtin">string</span>
	Phone    <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>WeiChartSender<span class="token punctuation">)</span> <span class="token function">Send</span><span class="token punctuation">(</span>msg <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello &quot;</span> <span class="token operator">+</span> msg<span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token comment">//\u5B9A\u4E49\u4E00\u4E2A\u63A5\u53E3</span>
<span class="token keyword">type</span> Sender <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Send</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u521D\u59CB\u5316</span>
	<span class="token keyword">var</span> a Sender <span class="token operator">=</span> <span class="token operator">&amp;</span>WeiChartSender<span class="token punctuation">{</span>User<span class="token punctuation">:</span> <span class="token string">&quot;\u6211\u662F\u5C0Fa&quot;</span><span class="token punctuation">}</span> <span class="token comment">// \u5B9A\u4E49sender\u4E3ASender\u63A5\u53E3\u7C7B\u578B; \u5982\u679C\u7528new\u521D\u59CB\u5316,\u76F4\u63A5\u8D4B\u503C\u5C31\u4F1A\u62A5\u9519\u4E86</span>
	b <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>WeiChartSender<span class="token punctuation">)</span>                     <span class="token comment">// \u5B9A\u4E49b\u4E3AWeiChartSender\u7ED3\u6784\u4F53\u6307\u9488\u7C7B\u578B</span>
	b<span class="token punctuation">.</span>User <span class="token operator">=</span> <span class="token string">&quot;\u6211\u662F\u5C0Fb&quot;</span>

	<span class="token comment">// \u6B63\u5E38\u8C03\u7528\u65B9\u6CD5</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u6B63\u5E38\u65B9\u6CD5\u8C03\u7528:&quot;</span><span class="token punctuation">)</span>
	<span class="token boolean">_</span> <span class="token operator">=</span> a<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span><span class="token string">&quot;world!&quot;</span><span class="token punctuation">)</span> <span class="token comment">// Hello world!</span>
	<span class="token boolean">_</span> <span class="token operator">=</span> b<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span><span class="token string">&quot;world!&quot;</span><span class="token punctuation">)</span> <span class="token comment">// Hello world!</span>

	<span class="token comment">// \u67E5\u770B\u5404\u4E2A\u7C7B\u578B,\u770B\u8D77\u6765\u4E24\u4E2A\u7C7B\u578B\u90FD\u4E00\u6837</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\u67E5\u770B\u7C7B\u578B:&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%T\\n&quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span> <span class="token comment">// *main.WeiChartSender</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%T\\n&quot;</span><span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token comment">// *main.WeiChartSender</span>

	<span class="token comment">// \u8C03\u7528\u5C5E\u6027, \u63A5\u53E3\u7C7B\u578B\u7684\u4E0D\u80FD\u8C03\u7528,\u56E0\u4E3A\u63A5\u53E3\u53EA\u80FD\u8981\u6C42\u51FD\u6570, \u5B9A\u4E49\u4E0D\u4E86\u5C5E\u6027,\u5F53\u7136\u4E5F\u6CA1\u6709\u5B9E\u73B0</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\u67E5\u770B\u5C5E\u6027:&quot;</span><span class="token punctuation">)</span>
	<span class="token comment">//fmt.Println(a.User) // \u8FD9\u4E2A\u4F1A\u62A5\u9519 a.User undefined (type Sender has no field or method User)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;b.User=%s\\n&quot;</span><span class="token punctuation">,</span> b<span class="token punctuation">.</span>User<span class="token punctuation">)</span>

	<span class="token comment">// \u63A5\u53E3\u7C7B\u578B\u8F6C\u6362\u4E3A\u7ED3\u6784\u4F53 -- \u65AD\u8A00\u65B9\u5F0F</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\u65AD\u8A00\u65B9\u5F0F:&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> obj<span class="token punctuation">,</span> ok <span class="token operator">:=</span> a<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>WeiChartSender<span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u65AD\u8A00\u6210\u529F: %#v\\n&quot;</span><span class="token punctuation">,</span> obj<span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;a.User=%s\\n&quot;</span><span class="token punctuation">,</span> obj<span class="token punctuation">.</span>User<span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u65AD\u8A00\u5931\u8D25&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u63A5\u53E3\u7C7B\u578B\u8F6C\u6362\u4E3A\u7ED3\u6784\u4F53 -- \u67E5\u8BE2\u65B9\u5F0F</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\u67E5\u8BE2\u65B9\u5F0F:&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">switch</span> obj <span class="token operator">:=</span> a<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">case</span> <span class="token operator">*</span>WeiChartSender<span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u67E5\u8BE2\u6210\u529F: %#v\\n&quot;</span><span class="token punctuation">,</span> obj<span class="token punctuation">)</span>
        fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;a.User=%s\\n&quot;</span><span class="token punctuation">,</span> obj<span class="token punctuation">.</span>User<span class="token punctuation">)</span>
	<span class="token keyword">default</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u67E5\u8BE2\u5931\u8D25\\n&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code>\u6B63\u5E38\u65B9\u6CD5\u8C03\u7528:
Hello world<span class="token operator">!</span>                                                                
Hello world<span class="token operator">!</span>                                                                
                                                                            
\u67E5\u770B\u7C7B\u578B:                                                                   
*main.WeiChartSender                                                        
*main.WeiChartSender                                                        
                                                                            
\u67E5\u770B\u5C5E\u6027:                                                                   
b.User<span class="token operator">=</span>\u6211\u662F\u5C0Fb                                                              
                                                                            
\u65AD\u8A00\u65B9\u5F0F:                                                                   
\u65AD\u8A00\u6210\u529F: <span class="token operator">&amp;</span>main.WeiChartSender<span class="token punctuation">{</span>User:<span class="token string">&quot;\u6211\u662F\u5C0Fa&quot;</span>, Password:<span class="token string">&quot;&quot;</span>, to:<span class="token string">&quot;&quot;</span>, Phone:<span class="token string">&quot;&quot;</span><span class="token punctuation">}</span>
a.User<span class="token operator">=</span>\u6211\u662F\u5C0Fa                                                              
                                                                            
\u67E5\u8BE2\u65B9\u5F0F:                                                                   
\u67E5\u8BE2\u6210\u529F: <span class="token operator">&amp;</span>main.WeiChartSender<span class="token punctuation">{</span>User:<span class="token string">&quot;\u6211\u662F\u5C0Fa&quot;</span>, Password:<span class="token string">&quot;&quot;</span>, to:<span class="token string">&quot;&quot;</span>, Phone:<span class="token string">&quot;&quot;</span><span class="token punctuation">}</span>
a.User<span class="token operator">=</span>\u6211\u662F\u5C0Fa
</code></pre></div><h3 id="\u5E38\u7528\u63A5\u53E3" tabindex="-1"><a class="header-anchor" href="#\u5E38\u7528\u63A5\u53E3" aria-hidden="true">#</a> \u5E38\u7528\u63A5\u53E3</h3><h4 id="stringer" tabindex="-1"><a class="header-anchor" href="#stringer" aria-hidden="true">#</a> Stringer</h4><p>\u5B57\u7B26\u4E32\u529F\u80FD\u63A5\u53E3</p><p>\u5B9A\u4E49\u5982\u4E0B</p><div class="language-go ext-go"><pre class="language-go"><code><span class="token comment">// fmt.print.go</span>
<span class="token keyword">type</span> Stringer <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>
</code></pre></div><p>\u6D4B\u8BD5\u4EE3\u7801</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> A <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name <span class="token builtin">string</span>
	Age  <span class="token builtin">uint</span>
	Sex  <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>a A<span class="token punctuation">)</span> <span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;String: \u5927\u5BB6\u597D, \u6211\u662F%s, \u6027\u522B%s, \u5E74\u9F84%d&quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">.</span>Name<span class="token punctuation">,</span> a<span class="token punctuation">.</span>Sex<span class="token punctuation">,</span> a<span class="token punctuation">.</span>Age<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>a A<span class="token punctuation">)</span> <span class="token function">GoString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;GoString: \u5927\u5BB6\u597D, \u6211\u662F%s, \u6027\u522B%s, \u5E74\u9F84%d&quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">.</span>Name<span class="token punctuation">,</span> a<span class="token punctuation">.</span>Sex<span class="token punctuation">,</span> a<span class="token punctuation">.</span>Age<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	a <span class="token operator">:=</span> <span class="token operator">&amp;</span>A<span class="token punctuation">{</span>
		Name<span class="token punctuation">:</span> <span class="token string">&quot;\u5F20\u4E09&quot;</span><span class="token punctuation">,</span>
		Age<span class="token punctuation">:</span>  <span class="token number">18</span><span class="token punctuation">,</span>
		Sex<span class="token punctuation">:</span>  <span class="token string">&quot;\u7537&quot;</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%v\\n&quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%+v\\n&quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%#v\\n&quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span> <span class="token comment">// GoString</span>

	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%s\\n&quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%q\\n&quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code>String: \u5927\u5BB6\u597D, \u6211\u662F\u5F20\u4E09, \u6027\u522B\u7537, \u5E74\u9F8418
String: \u5927\u5BB6\u597D, \u6211\u662F\u5F20\u4E09, \u6027\u522B\u7537, \u5E74\u9F8418  
String: \u5927\u5BB6\u597D, \u6211\u662F\u5F20\u4E09, \u6027\u522B\u7537, \u5E74\u9F8418  
GoString: \u5927\u5BB6\u597D, \u6211\u662F\u5F20\u4E09, \u6027\u522B\u7537, \u5E74\u9F8418
String: \u5927\u5BB6\u597D, \u6211\u662F\u5F20\u4E09, \u6027\u522B\u7537, \u5E74\u9F8418  
<span class="token string">&quot;String: \u5927\u5BB6\u597D, \u6211\u662F\u5F20\u4E09, \u6027\u522B\u7537, \u5E74\u9F8418&quot;</span>
</code></pre></div><h2 id="-5" tabindex="-1"><a class="header-anchor" href="#-5" aria-hidden="true">#</a></h2><h2 id="\u5E76\u53D1\u7F16\u7A0B" tabindex="-1"><a class="header-anchor" href="#\u5E76\u53D1\u7F16\u7A0B" aria-hidden="true">#</a> \u5E76\u53D1\u7F16\u7A0B</h2><h3 id="goroutine" tabindex="-1"><a class="header-anchor" href="#goroutine" aria-hidden="true">#</a> <code>Goroutine</code></h3><h4 id="\u57FA\u7840-1" tabindex="-1"><a class="header-anchor" href="#\u57FA\u7840-1" aria-hidden="true">#</a> \u57FA\u7840</h4><p>Go\u8BED\u8A00\u4E2D\u6BCF\u4E2A\u5E76\u53D1\u6267\u884C\u7684\u5355\u5143\u53EB<code>Goroutine</code>\uFF08\u534F\u7A0B\uFF09\uFF0C\u4F7F\u7528<code>go</code>\u5173\u952E\u5B57\u540E\u63A5\u51FD\u6570\u8C03\u7528\u6765\u521B\u5EFA\u4E00\u4E2A<code>Goroutine</code></p><p><code>Goroutine</code>\u662F\u5E76\u53D1\u5B89\u5168\u7684</p><details class="custom-container details"><summary>\u6D4B\u8BD5\u534F\u7A0B\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;runtime&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">taskA</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">taskB</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token char">&#39;A&#39;</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token char">&#39;Z&#39;</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%c\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;start&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">taskA</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// \u542F\u52A8\u4E00\u4E2A\u534F\u7A0B</span>
	<span class="token keyword">go</span> <span class="token function">taskB</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// \u542F\u52A8\u53E6\u4E00\u4E2A\u534F\u7A0B</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;end&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u8F93\u51FA\u7ED3\u679C</span>
<span class="token comment">// start</span>
<span class="token comment">// end</span>

<span class="token comment">// \u95EE\uFF1A\u534F\u7A0B\u51FD\u6570\u6CA1\u6709\u6267\u884C\u5417\uFF1F</span>
<span class="token comment">// \u7B54\uFF1A\u539F\u56E0\u662Fmain()\u51FD\u6570\u5E76\u4E0D\u4F1A\u7B49\u5F85\u6240\u6709\u534F\u7A0B\u6267\u884C\u5B8C\u540E\u518D\u9000\u51FA,\u8FD9\u91CCmain\u51FD\u6570\u5DF2\u7ECF\u6267\u884C\u5B8C\u4E86\uFF0C\u534F\u7A0B\u8FD8\u6CA1\u6267\u884C\u5230for\u5FAA\u73AF\uFF0C\u6240\u4EE5\u9020\u6210\u534F\u7A0B\u6CA1\u6709\u6267\u884C\u7684\u5047\u8C61</span>
</code></pre></div></details><h4 id="\u7B49\u5F85goroutine\u6267\u884C\u5B8C\u6210" tabindex="-1"><a class="header-anchor" href="#\u7B49\u5F85goroutine\u6267\u884C\u5B8C\u6210" aria-hidden="true">#</a> \u7B49\u5F85Goroutine\u6267\u884C\u5B8C\u6210</h4><details class="custom-container details"><summary>\u7B49\u5F85\u6240\u6709\u534F\u7A0B\u6267\u884C\u5B8C\u518D\u9000\u51FA-\u4F7F\u7528WaitGroup-\u65B9\u5F0F1</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// \u58F0\u660EWaitGroup</span>
<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup

<span class="token keyword">func</span> <span class="token function">taskA</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">taskB</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token char">&#39;A&#39;</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token char">&#39;Z&#39;</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%c\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;start&quot;</span><span class="token punctuation">)</span>
	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">taskA</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// \u542F\u52A8\u4E00\u4E2A\u534F\u7A0B</span>
	<span class="token keyword">go</span> <span class="token function">taskB</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// \u542F\u52A8\u53E6\u4E00\u4E2A\u534F\u7A0B</span>

	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;end&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u8F93\u51FA\u7ED3\u679C</span>
<span class="token comment">// start</span>
<span class="token comment">// A</span>
<span class="token comment">// \u5185\u5BB9\u592A\u591A\u7701\u7565...	</span>
<span class="token comment">// 10</span>
<span class="token comment">// end</span>
</code></pre></div></details><details class="custom-container details"><summary>\u7B49\u5F85\u6240\u6709\u534F\u7A0B\u6267\u884C\u5B8C\u518D\u9000\u51FA-\u4F7F\u7528WaitGroup-\u65B9\u5F0F2\uFF08\u63A8\u8350\uFF09</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">taskA</span><span class="token punctuation">(</span>wg <span class="token operator">*</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">taskB</span><span class="token punctuation">(</span>wg <span class="token operator">*</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token char">&#39;A&#39;</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token char">&#39;Z&#39;</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%c\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;start&quot;</span><span class="token punctuation">)</span>

	<span class="token comment">// \u5982\u679C\u9700\u8981\u4F5C\u4E3A\u51FD\u6570\u53C2\u6570\u4F20\u9012wg\uFF0C\u5219wg\u5FC5\u987B\u662F\u5F15\u7528\u7C7B\u578B</span>
	wg <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">)</span>

	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">taskA</span><span class="token punctuation">(</span>wg<span class="token punctuation">)</span> <span class="token comment">// \u542F\u52A8\u4E00\u4E2A\u534F\u7A0B</span>
	<span class="token keyword">go</span> <span class="token function">taskB</span><span class="token punctuation">(</span>wg<span class="token punctuation">)</span> <span class="token comment">// \u542F\u52A8\u53E6\u4E00\u4E2A\u534F\u7A0B</span>

	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;end&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u8F93\u51FA\u7ED3\u679C</span>
<span class="token comment">// start</span>
<span class="token comment">// A</span>
<span class="token comment">// \u5185\u5BB9\u592A\u591A\u7701\u7565...	</span>
<span class="token comment">// 10</span>
<span class="token comment">// end</span>
</code></pre></div></details><details class="custom-container details"><summary>\u7B49\u5F85\u6240\u6709\u534F\u7A0B\u6267\u884C\u5B8C\u518D\u9000\u51FA-\u4F7F\u7528 Channel</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">taskA</span><span class="token punctuation">(</span>ch <span class="token keyword">chan</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	ch <span class="token operator">&lt;-</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">taskB</span><span class="token punctuation">(</span>ch <span class="token keyword">chan</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token char">&#39;A&#39;</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token char">&#39;Z&#39;</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%c\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	ch <span class="token operator">&lt;-</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;start&quot;</span><span class="token punctuation">)</span>

	<span class="token comment">// \u521D\u59CB\u5316channel</span>
	n <span class="token operator">:=</span> <span class="token number">2</span> <span class="token comment">// \u4EE3\u8868\u542F\u52A8\u51E0\u4E2Agroutine</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> n<span class="token punctuation">)</span>

	<span class="token keyword">go</span> <span class="token function">taskA</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span> <span class="token comment">// \u542F\u52A8\u4E00\u4E2A\u534F\u7A0B</span>
	<span class="token keyword">go</span> <span class="token function">taskB</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span> <span class="token comment">// \u542F\u52A8\u53E6\u4E00\u4E2A\u534F\u7A0B</span>

	<span class="token comment">// \u963B\u585E</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token operator">&lt;-</span>ch
	<span class="token punctuation">}</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;end&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u8F93\u51FA\u7ED3\u679C</span>
<span class="token comment">// start</span>
<span class="token comment">// A</span>
<span class="token comment">// \u5185\u5BB9\u592A\u591A\u7701\u7565...	</span>
<span class="token comment">// 10</span>
<span class="token comment">// end</span>
</code></pre></div></details><h4 id="goroutine\u76F8\u5173\u51FD\u6570" tabindex="-1"><a class="header-anchor" href="#goroutine\u76F8\u5173\u51FD\u6570" aria-hidden="true">#</a> Goroutine\u76F8\u5173\u51FD\u6570</h4><table><thead><tr><th>\u51FD\u6570</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td><code>runtime.NumGoroutine()</code></td><td>\u8FD4\u56DE\u5F53\u524D\u5B58\u5728\u7684<code>Goroutine</code>\u6570\u91CF</td></tr><tr><td><code>runtime.Gosched()</code></td><td>\u6682\u505C\u5F53\u524D<code>Goroutine</code>\uFF0C\u7531Go\u81EA\u52A8\u8C03\u5EA6\u5176\u4ED6<code>Goroutine</code>\u6267\u884C</td></tr><tr><td><code>runtime.Goexit()</code></td><td>\u9000\u51FA\u5F53\u524D<code>Goroutine</code></td></tr><tr><td><code>runtime.GOMAXPROCS(n)</code></td><td>\u8BBE\u7F6E\u53EF\u4EE5\u4F7F\u7528\u7684\u6700\u5927CPU\u6570\u91CF\uFF0C\u9ED8\u8BA4\u503C\u4E3A<code>runtime.NumCPU()</code>\uFF1B\u8FD4\u56DE\u4E0A\u4E00\u6B21\u8BBE\u7F6E\u7684\u503C</td></tr></tbody></table><h3 id="channel" tabindex="-1"><a class="header-anchor" href="#channel" aria-hidden="true">#</a> Channel</h3><h4 id="\u57FA\u7840-2" tabindex="-1"><a class="header-anchor" href="#\u57FA\u7840-2" aria-hidden="true">#</a> \u57FA\u7840</h4><p><code>Channel</code>\u7528\u4E8E<code>Goroutine</code>\u4E4B\u95F4\u7684\u901A\u4FE1\uFF0C\u4E2D\u6587\u53EF\u4EE5\u79F0\u4E3A\u201D\u7BA1\u9053&quot;\u6216&quot;\u901A\u9053&quot;</p><p><strong>\u6839\u636E\u72B6\u6001\u53EF\u4EE5\u5206\u4E3A</strong></p><ul><li><code>nil</code>\uFF0C\u53EA\u58F0\u660E\u672A\u521D\u59CB\u5316\u7684<code>Channel</code></li><li>\u6B63\u5E38\uFF0C\u58F0\u660E\u5E76\u521D\u59CB\u5316\u7684<code>Channel</code></li><li>\u5173\u95ED\uFF0C\u4F7F\u7528<code>close(Channel)</code></li></ul><p><strong>\u6839\u636E\u7F13\u51B2\u65B9\u5F0F\u53EF\u4EE5\u5206\u4E3A</strong></p><ul><li>\u65E0\u7F13\u51B2\u533A<code>Channel</code></li><li>\u5E26\u7F13\u51B2\u533A<code>Channel</code></li></ul><p><strong>\u6839\u636E\u8BFB\u5199\u65B9\u5F0F\u53EF\u4EE5\u5206\u4E3A</strong></p><ul><li><p>\u8BFB\u5199<code>Channel</code></p></li><li><p>\u53EA\u8BFB<code>Channel</code></p></li><li><p>\u53EA\u5199<code>Channel</code></p></li></ul><p><strong>\u5B9A\u4E49</strong></p><div class="language-go ext-go"><pre class="language-go"><code><span class="token comment">// \u58F0\u660E\u4E00\u4E2Aint\u7C7B\u578B\u7684channel</span>
<span class="token keyword">var</span> channel <span class="token keyword">chan</span> <span class="token builtin">int</span>
fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%T\\n&quot;</span><span class="token punctuation">,</span> channel<span class="token punctuation">)</span> <span class="token comment">// chan int</span>

<span class="token comment">// ch\u8D4B\u503C</span>
channel <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%#v\\n&quot;</span><span class="token punctuation">,</span> channel<span class="token punctuation">)</span> <span class="token comment">// (chan int)(0xc00005a060)</span>

<span class="token comment">// \u4EE5\u4E0A\u4E24\u53E5\u53EF\u4EE5\u7B80\u5199\u6210\u5982\u4E0B\u5F62\u5F0F\uFF08\u63A8\u8350\u8FD9\u79CD\u5199\u6CD5\uFF09</span>
ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
</code></pre></div><p><strong>\u8BFB\u548C\u5199</strong></p><div class="language-go ext-go"><pre class="language-go"><code><span class="token comment">// \u5199\u6570\u636E\uFF1A\u5C06100\u5199\u5165\u5230channel\u4E2D</span>
ch <span class="token operator">&lt;-</span> <span class="token number">100</span>

<span class="token comment">// \u8BFB\u6570\u636E-\u65B9\u5F0F1\uFF0C v\u4EE3\u8868\u8BFB\u5230\u7684\u503C</span>
v <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch

<span class="token comment">// \u8BFB\u6570\u636E-\u65B9\u5F0F2\uFF0C v\u4EE3\u8868\u8BFB\u5230\u7684\u503C, ok\u4EE3\u8868channel\u7684\u72B6\u6001\uFF0Ctrue\u4E3Achannel\u6B63\u5E38\uFF0Cfalse\u4E3Achannel\u5DF2\u7ECF\u5173\u95ED</span>
v<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch

<span class="token comment">// \u8BFB\u53D6\u7BA1\u9053-\u65B9\u5F0F3, \u4F7F\u7528range\u904D\u5386\uFF0C\u8FD9\u91CC\u53EA\u6709\u4E00\u4E2A\u8FD4\u56DE\u503C\uFF0C\u82E5Channel\u5173\u95ED\u5219for\u5FAA\u73AF\u4E5F\u968F\u4E4B\u7ED3\u675F</span>
<span class="token keyword">for</span> v<span class="token operator">:=</span> <span class="token keyword">range</span> ch <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u5173\u95EDchannel</span>
<span class="token function">close</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span>

<span class="token comment">// \u8BB0\u5FC6\u6280\u5DE7\uFF1A\u7BAD\u5934\u4EE3\u8868\u6570\u636E\u6D41\u5411</span>
</code></pre></div><h4 id="\u65E0\u7F13\u51B2\u533Achannel" tabindex="-1"><a class="header-anchor" href="#\u65E0\u7F13\u51B2\u533Achannel" aria-hidden="true">#</a> \u65E0\u7F13\u51B2\u533A<code>Channel</code></h4><p><strong>\u5B9A\u4E49</strong></p><div class="language-go ext-go"><pre class="language-go"><code>ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>	<span class="token comment">// \u65E0\u7F13\u51B2\u533Achannel, \u7B49\u540C\u4E8Emake(chan int, 0)\uFF0C\u7B2C\u4E8C\u4E2A\u53C2\u6570\u4EE3\u8868\u53EF\u7F13\u51B2\u6570\u636E\u4E2A\u6570</span>
</code></pre></div><p><strong>\u7279\u6027</strong></p><ul><li>\u8BFB\u548C\u5199\u4E0D\u80FD\u5728\u540C\u4E00\u4E2A\u534F\u7A0B\u4E2D</li><li>\u8BFB\u5199\u6B21\u6570\u4E0D\u4E00\u81F4\u4F1A\u53D1\u751F\u6B7B\u9501\uFF1A<code>fatal error: all goroutines are asleep - deadlock!</code></li><li>\u7BA1\u9053\u5173\u95ED\u540E\uFF1A <ul><li>\u5047\u5982\u7EE7\u7EED\u8BFB\uFF0C\u4E0D\u4F1A\u963B\u585E\uFF0C\u800C\u662F\u4F1A\u8BFB\u53D6\u5230\u96F6\u503C</li><li>\u5047\u5982\u7EE7\u7EED\u5199\uFF0C\u4F1A\u62A5\u9519\uFF1A<code>panic: send on closed channel</code></li></ul></li><li>\u5982\u679C\u7BA1\u9053\u4E00\u5207\u90FD\u6B63\u5E38\uFF0C\u672A\u8BFB\u53D6\u4E4B\u524D\u5199\u5165\u4F1A\u963B\u585E\uFF0C\u672A\u5199\u5165\u4E4B\u524D\u8BFB\u53D6\u4E5F\u4F1A\u963B\u585E</li></ul><details class="custom-container details"><summary>\u6D4B\u8BD51: \u57FA\u7840\u4F7F\u7528</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u58F0\u660E\u5E76\u521D\u59CB\u5316channel</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>

	<span class="token comment">// \u5199\u6570\u636E</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">for</span> curTime <span class="token operator">:=</span> <span class="token keyword">range</span> time<span class="token punctuation">.</span><span class="token function">Tick</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			second <span class="token operator">:=</span> curTime<span class="token punctuation">.</span><span class="token function">Second</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			ch <span class="token operator">&lt;-</span> second
			log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Write to Channel  %d\\n&quot;</span><span class="token punctuation">,</span> second<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u8BFB\u6570\u636E</span>
	<span class="token keyword">for</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> ch <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Read from Channel %d\\n\\n&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token number">2022</span>/04/17 <span class="token number">11</span>:51:32 Write to Channel  <span class="token number">32</span>
<span class="token number">2022</span>/04/17 <span class="token number">11</span>:51:32 Read from Channel <span class="token number">32</span>

<span class="token number">2022</span>/04/17 <span class="token number">11</span>:51:33 Write to Channel  <span class="token number">33</span>
<span class="token number">2022</span>/04/17 <span class="token number">11</span>:51:33 Read from Channel <span class="token number">33</span>

<span class="token number">2022</span>/04/17 <span class="token number">11</span>:51:34 Write to Channel  <span class="token number">34</span>
<span class="token number">2022</span>/04/17 <span class="token number">11</span>:51:34 Read from Channel <span class="token number">34</span>
</code></pre></div><h4 id="\u5E26\u7F13\u51B2\u533Achannel" tabindex="-1"><a class="header-anchor" href="#\u5E26\u7F13\u51B2\u533Achannel" aria-hidden="true">#</a> \u5E26\u7F13\u51B2\u533A<code>Channel</code></h4><div class="language-go ext-go"><pre class="language-go"><code>ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>	<span class="token comment">// \u4EE3\u8868\u7F13\u51B2\u533A\u957F\u5EA6\u4E3A3\uFF0C\u53EF\u4EE5\u653E3\u4E2A\u6570\u636E</span>
</code></pre></div><p><strong>\u7279\u6027</strong></p><ul><li><p>\u8BFB\u548C\u5199\u53EF\u4EE5\u5728\u540C\u4E00\u4E2A\u534F\u7A0B\u4E2D</p></li><li><p>\u8BFB\u5199\u6B21\u6570\u53EF\u4EE5\u4E0D\u4E00\u81F4\uFF0C\u6700\u5927\u5DEE\u4E0D\u80FD\u8D85\u8FC7\u7F13\u51B2\u533A\u957F\u5EA6\uFF0C\u5426\u5219\u540C\u6837\u4F1A\u5F15\u53D1\u6B7B\u9501\uFF1A<code>fatal error: all goroutines are asleep - deadlock!</code></p><p>\u4E3E\u4E2A\u4F8B\u5B50\uFF0C\u7F13\u51B2\u533A\u5927\u5C0F\u4E3A1\uFF0C\u5219\u5199\u51651\u6B21\u8BFB\u53D60\u6B21\u6CA1\u6709\u95EE\u9898\uFF0C\u5199\u51652\u6B21\u8BFB\u53D60\u6B21\u5C31\u4F1A\u5F15\u53D1\u6B7B\u9501</p></li><li><p>\u7BA1\u9053\u5173\u95ED\u540E\uFF1A</p><ul><li>\u5047\u5982\u7EE7\u7EED\u8BFB\uFF0C\u4E0D\u4F1A\u963B\u585E\uFF0C\u800C\u662F\u4F1A\u5148\u8BFB\u53D6\u7F13\u51B2\u533A\uFF0C\u82E5\u7F13\u51B2\u533A\u8BFB\u5B8C\u4F1A\u8BFB\u5230\u96F6\u503C</li><li>\u5047\u5982\u7EE7\u7EED\u5199\uFF0C\u4F1A\u62A5\u9519\uFF1A<code>panic: send on closed channel</code></li></ul></li><li><p>\u5982\u679C\u7BA1\u9053\u4E00\u5207\u90FD\u6B63\u5E38\uFF0C</p><ul><li>\u53EA\u67091\u4E2A\u534F\u7A0B\u60C5\u51B5\u4E0B\uFF08<code>main\u51FD\u6570</code>\uFF09\uFF0C\u5199\u6EE1\u7F13\u51B2\u533A\u518D\u5199\u5165\u4F1A\u62A5\u9519\uFF0C\u8BFB\u5B8C\u7F13\u51B2\u533A\u518D\u8BFB\u53D6\u4E5F\u4F1A\u62A5\u9519</li><li>\u81F3\u5C112\u4E2A\u534F\u7A0B\u60C5\u51B5\u4E0B\uFF08<code>go</code>\u5173\u952E\u5B57\u81F3\u5C11\u542F\u52A81\u4E2A\uFF09\uFF0C\u5199\u6EE1\u7F13\u51B2\u533A\u518D\u5199\u5165\u4F1A\u963B\u585E\uFF0C\u8BFB\u5B8C\u7F13\u51B2\u533A\u518D\u8BFB\u53D6\u4E5F\u4F1A\u963B\u585E</li></ul></li></ul><details class="custom-container details"><summary>\u6D4B\u8BD51: \u8BFB\u548C\u5199\u53EF\u4EE5\u5728\u540C\u4E00\u4E2A\u534F\u7A0B\u4E2D</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;math/rand&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u521D\u59CB\u5316\u968F\u673A\u6570\u79CD\u5B50</span>
	rand<span class="token punctuation">.</span><span class="token function">Seed</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Unix</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// \u58F0\u660E\u5E76\u521D\u59CB\u5316channel</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>

	<span class="token comment">// \u5199\u5165\u6570\u636E\uFF080-99\u4E4B\u95F4\u7684\u968F\u673A\u6570\uFF09</span>
	ch <span class="token operator">&lt;-</span> rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token number">99</span><span class="token punctuation">)</span>

	<span class="token comment">// \u8BFB\u53D6\u6570\u636E</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u8BFB\u53D6\u6570\u636E: &quot;</span><span class="token punctuation">,</span> <span class="token operator">&lt;-</span>ch<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><details class="custom-container details"><summary>\u6D4B\u8BD52: \u8BFB\u5199\u6B21\u6570\u53EF\u4EE5\u4E0D\u4E00\u81F4</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;math/rand&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u521D\u59CB\u5316\u968F\u673A\u6570\u79CD\u5B50</span>
	rand<span class="token punctuation">.</span><span class="token function">Seed</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Unix</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// \u58F0\u660E\u5E76\u521D\u59CB\u5316channel\uFF0C\u7F13\u51B2\u533A\u5927\u5C0F\u4E3A10</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>

	<span class="token comment">// \u5199\u5165\u6570\u636E\u6B21\u6570, \u5199\u516510\u6B21\u8BFB\u53D60\u6B21\u6CA1\u95EE\u9898\uFF0C\u5199\u516511\u6B21\u8BFB\u53D60\u6B21\u5C31\u4F1A\u53D1\u751F\u6B7B\u9501\uFF0C\u56E0\u4E3A\u7F13\u51B2\u533A\u5199\u6EE1\u4E86</span>
	n <span class="token operator">:=</span> <span class="token number">10</span>

	<span class="token comment">// \u5199\u5165\u6570\u636E\uFF080-99\u4E4B\u95F4\u7684\u968F\u673A\u6570\uFF09</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		ch <span class="token operator">&lt;-</span> rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token number">99</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details><details class="custom-container details"><summary>\u6D4B\u8BD53: Channel\u5173\u95ED\u540E\u518D\u8BFB\u53D6\uFF0C\u4F1A\u8BFB\u5B8C\u7F13\u51B2\u533A\u540E\u8BFB\u53D6\u5230\u96F6\u503C</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u58F0\u660E\u5E76\u521D\u59CB\u5316channel\uFF0C\u7F13\u51B2\u533A\u5927\u5C0F\u4E3A3</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>

	<span class="token comment">// \u5199\u7F13\u51B2\u533A</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">100</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">200</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">300</span>

	<span class="token comment">// \u5173\u95EDchannel</span>
	<span class="token function">close</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span>

	<span class="token comment">// \u8BFB\u53D6\u6570\u636E</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">&lt;-</span>ch<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u8F93\u51FA\u7ED3\u679C</span>
<span class="token comment">// 100</span>
<span class="token comment">// 200</span>
<span class="token comment">// 300</span>
<span class="token comment">// 0</span>
<span class="token comment">// 0</span>
</code></pre></div></details><details class="custom-container details"><summary>\u6D4B\u8BD54: Channel\u5173\u95ED\u540E\u518D\u5199\u5165\u4F1A\u76F4\u63A5\u62A5\u9519\uFF0C\u800C\u4E0D\u662F\u5199\u5165\u5230\u7F13\u51B2\u533A</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u58F0\u660E\u5E76\u521D\u59CB\u5316channel\uFF0C\u7F13\u51B2\u533A\u5927\u5C0F\u4E3A3</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>

	<span class="token comment">// \u5173\u95EDchannel</span>
	<span class="token function">close</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span>

	<span class="token comment">// \u5199\u6570\u636E\uFF0Cchannel\u5DF2\u7ECF\u5173\u95ED\u4E86\uFF0C\u4E0D\u80FD\u5199\u5165\u5230\u7F13\u51B2\u533A\uFF0C\u4F1A\u76F4\u63A5\u62A5\u9519\uFF0C\u8FD9\u548C\u65E0\u7F13\u51B2channel\u8868\u73B0\u4E00\u81F4</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">100</span>
<span class="token punctuation">}</span>
</code></pre></div></details><details class="custom-container details"><summary>\u6D4B\u8BD55: 1\u4E2A\u534F\u7A0B\u60C5\u51B5\u4E0B\uFF08\`main\u51FD\u6570\`\uFF09\uFF0C\u5199\u6EE1\u7F13\u51B2\u533A\u518D\u5199\u5165\u4F1A\u62A5\u9519</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u58F0\u660E\u5E76\u521D\u59CB\u5316channel\uFF0C\u7F13\u51B2\u533A\u5927\u5C0F\u4E3A3</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>

	<span class="token comment">// \u5199\u6570\u636E</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">100</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">100</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">100</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">100</span> <span class="token comment">// \u8FD9\u91CC\u76F4\u63A5\u62A5\u9519</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">&lt;-</span>ch<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><details class="custom-container details"><summary>\u6D4B\u8BD56: 1\u4E2A\u534F\u7A0B\u60C5\u51B5\u4E0B\uFF08\`main\u51FD\u6570\`\uFF09\uFF0C\u8BFB\u5B8C\u7F13\u51B2\u533A\u518D\u8BFB\u53D6\u4E5F\u4F1A\u62A5\u9519</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u58F0\u660E\u5E76\u521D\u59CB\u5316channel\uFF0C\u7F13\u51B2\u533A\u5927\u5C0F\u4E3A3</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>

	<span class="token comment">// \u5199\u5165</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">100</span>

	<span class="token comment">// \u8BFB\u53D6</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">&lt;-</span>ch<span class="token punctuation">)</span> <span class="token comment">// \u6B63\u5E38\u8BFB\u53D6</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">&lt;-</span>ch<span class="token punctuation">)</span> <span class="token comment">// \u62A5\u9519</span>
<span class="token punctuation">}</span>
</code></pre></div></details><details class="custom-container details"><summary>\u6D4B\u8BD57: \u81F3\u5C112\u4E2A\u534F\u7A0B\u60C5\u51B5\u4E0B\uFF08go\u5173\u952E\u5B57\u81F3\u5C11\u542F\u52A81\u4E2A\uFF09\uFF0C\u5199\u6EE1\u7F13\u51B2\u533A\u518D\u5199\u5165\u4F1A\u963B\u585E</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;runtime&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u58F0\u660E\u5E76\u521D\u59CB\u5316channel\uFF0C\u7F13\u51B2\u533A\u5927\u5C0F\u4E3A3</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>

	<span class="token comment">// \u5F00\u542F\u4E00\u4E2A\u534F\u7A0B</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">60</span><span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u534F\u7A0B\u8FD0\u884C\u7ED3\u675F&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u5199\u5165</span>
	<span class="token comment">// 		\u5FAA\u73AF\u6B21\u6570\uFF1A\u7F13\u51B2\u533A+1\u6B21</span>
	<span class="token comment">//		\u534F\u7A0B\u672A\u8FD0\u884C\u5B8C\u4E4B\u524D\uFF0C\u7B2C4\u6B21\u5199\u5165\u4F1A\u5361\u4F4F\uFF0C\u7B49\u534F\u7A0B\u8FD0\u884C\u5B8C\uFF0C\u7B2C4\u6B21\u5199\u5165\u5C31\u4F1A\u62A5\u9519</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token function">cap</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u3010\u5F00\u59CB\u3011\u7B2C%d\u6B21\u5199\u5165\u6570\u636E | \u5F53\u524D\u534F\u7A0B\u6570\u91CF: %d\\n&quot;</span><span class="token punctuation">,</span> i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">,</span> runtime<span class="token punctuation">.</span><span class="token function">NumGoroutine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		ch <span class="token operator">&lt;-</span> <span class="token number">100</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u3010\u7ED3\u675F\u3011\u7B2C%d\u6B21\u5199\u5165\u6570\u636E | \u5F53\u524D\u534F\u7A0B\u6570\u91CF: %d\\n\\n&quot;</span><span class="token punctuation">,</span> i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">,</span> runtime<span class="token punctuation">.</span><span class="token function">NumGoroutine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token number">2022</span>/04/17 <span class="token number">13</span>:28:40 \u3010\u5F00\u59CB\u3011\u7B2C1\u6B21\u5199\u5165\u6570\u636E <span class="token operator">|</span> \u5F53\u524D\u534F\u7A0B\u6570\u91CF: <span class="token number">2</span>
<span class="token number">2022</span>/04/17 <span class="token number">13</span>:28:40 \u3010\u7ED3\u675F\u3011\u7B2C1\u6B21\u5199\u5165\u6570\u636E <span class="token operator">|</span> \u5F53\u524D\u534F\u7A0B\u6570\u91CF: <span class="token number">2</span>

<span class="token number">2022</span>/04/17 <span class="token number">13</span>:28:40 \u3010\u5F00\u59CB\u3011\u7B2C2\u6B21\u5199\u5165\u6570\u636E <span class="token operator">|</span> \u5F53\u524D\u534F\u7A0B\u6570\u91CF: <span class="token number">2</span>
<span class="token number">2022</span>/04/17 <span class="token number">13</span>:28:40 \u3010\u7ED3\u675F\u3011\u7B2C2\u6B21\u5199\u5165\u6570\u636E <span class="token operator">|</span> \u5F53\u524D\u534F\u7A0B\u6570\u91CF: <span class="token number">2</span>

<span class="token number">2022</span>/04/17 <span class="token number">13</span>:28:40 \u3010\u5F00\u59CB\u3011\u7B2C3\u6B21\u5199\u5165\u6570\u636E <span class="token operator">|</span> \u5F53\u524D\u534F\u7A0B\u6570\u91CF: <span class="token number">2</span>
<span class="token number">2022</span>/04/17 <span class="token number">13</span>:28:40 \u3010\u7ED3\u675F\u3011\u7B2C3\u6B21\u5199\u5165\u6570\u636E <span class="token operator">|</span> \u5F53\u524D\u534F\u7A0B\u6570\u91CF: <span class="token number">2</span>

<span class="token number">2022</span>/04/17 <span class="token number">13</span>:28:40 \u3010\u5F00\u59CB\u3011\u7B2C4\u6B21\u5199\u5165\u6570\u636E <span class="token operator">|</span> \u5F53\u524D\u534F\u7A0B\u6570\u91CF: <span class="token number">2</span>
<span class="token number">2022</span>/04/17 <span class="token number">13</span>:29:40 \u534F\u7A0B\u8FD0\u884C\u7ED3\u675F
fatal error: all goroutines are asleep - deadlock<span class="token operator">!</span>

goroutine <span class="token number">1</span> <span class="token punctuation">[</span>chan send<span class="token punctuation">]</span>:
main.main<span class="token punctuation">(</span><span class="token punctuation">)</span>
        C:/Users/Administrator/GolandProjects/learn/main.go:24 +0x18d

Process finished with the <span class="token builtin class-name">exit</span> code <span class="token number">2</span>
</code></pre></div></details><details class="custom-container details"><summary>\u6D4B\u8BD58: \u81F3\u5C112\u4E2A\u534F\u7A0B\u60C5\u51B5\u4E0B\uFF08go\u5173\u952E\u5B57\u81F3\u5C11\u542F\u52A81\u4E2A\uFF09\uFF0C\u8BFB\u5B8C\u7F13\u51B2\u533A\u518D\u8BFB\u53D6\u4E5F\u4F1A\u963B\u585E</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u58F0\u660E\u5E76\u521D\u59CB\u5316channel\uFF0C\u7F13\u51B2\u533A\u5927\u5C0F\u4E3A3</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>

	<span class="token comment">// \u5F00\u542F\u4E00\u4E2A\u534F\u7A0B</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">60</span><span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u534F\u7A0B\u8FD0\u884C\u7ED3\u675F&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u8BFB\u53D6</span>
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u5F00\u59CB\u8BFB\u53D6&quot;</span><span class="token punctuation">)</span>
	v<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u8BFB\u53D6\u7ED3\u675F&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">,</span> ok<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token number">2022</span>/04/17 <span class="token number">13</span>:36:51 \u5F00\u59CB\u8BFB\u53D6
<span class="token number">2022</span>/04/17 <span class="token number">13</span>:37:51 \u534F\u7A0B\u8FD0\u884C\u7ED3\u675F
fatal error: all goroutines are asleep - deadlock<span class="token operator">!</span>

goroutine <span class="token number">1</span> <span class="token punctuation">[</span>chan receive<span class="token punctuation">]</span>:
main.main<span class="token punctuation">(</span><span class="token punctuation">)</span>
        C:/Users/Administrator/GolandProjects/learn/main.go:20 +0x79
</code></pre></div></details><h4 id="\u53EA\u8BFB\u548C\u53EA\u5199\u9650\u5236" tabindex="-1"><a class="header-anchor" href="#\u53EA\u8BFB\u548C\u53EA\u5199\u9650\u5236" aria-hidden="true">#</a> \u53EA\u8BFB\u548C\u53EA\u5199\u9650\u5236</h4><p>\u53EA\u662F\u5728\u539F\u6709\u7684<code>Channel</code>\u4E0A\u52A0\u4E86\u4E00\u5C42\u9650\u5236\uFF0C\u53EA\u80FD\u8BFB\u6216\u53EA\u80FD\u5199\uFF0C\u9ED8\u8BA4\u7684<code>Channel</code>\u662F\u8BFB\u5199\u90FD\u652F\u6301\u7684</p><p><strong>\u793A\u4F8B\u4EE3\u7801</strong></p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">chanReadOnly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u58F0\u660E\u5E26\u7F13\u51B2\u533A\u7684channel\uFF0C\u9ED8\u8BA4\u662F\u652F\u6301\u8BFB\u5199\u7684</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">100</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">200</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">300</span>

	<span class="token comment">// \u58F0\u660E\u4E3A\u53EA\u8BFBchannel</span>
	<span class="token keyword">var</span> chReadOnly <span class="token operator">&lt;-</span><span class="token keyword">chan</span> <span class="token builtin">int</span>
	chReadOnly <span class="token operator">=</span> ch

	<span class="token comment">// \u8BFB\u6570\u636E</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">&lt;-</span>chReadOnly<span class="token punctuation">)</span>

	<span class="token comment">// \u5199\u6570\u636E\u4F1A\u62A5\u9519</span>
	<span class="token comment">//chReadOnly &lt;- 400</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">chanWriteOnly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u58F0\u660E\u53EA\u5199channel</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span><span class="token operator">&lt;-</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>

	<span class="token comment">// \u5199\u6570\u636E</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">100</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">200</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">300</span>

	<span class="token comment">// \u8BFB\u6570\u636E\u4F1A\u62A5\u9519</span>
	<span class="token comment">//fmt.Println(&lt;-ch)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">chanReadOnly</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">chanWriteOnly</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h4 id="\u591A\u8DEF\u590D\u7528select" tabindex="-1"><a class="header-anchor" href="#\u591A\u8DEF\u590D\u7528select" aria-hidden="true">#</a> \u591A\u8DEF\u590D\u7528select</h4><p><strong>\u8BF4\u660E</strong></p><p><code>select</code>\u662F\u4E13\u95E8\u4E3A<code>Goroutine</code>\u8BBE\u8BA1\u7684\uFF0C\u7C7B\u4F3C\u4E8E<code>switch..case</code>\u8BED\u6CD5</p><ul><li>\u6BCF\u4E2A<code>case </code>\u8868\u8FBE\u5F0F\u4E2D\u90FD\u53EA\u80FD\u5305\u542B\u64CD\u4F5C<code>Channel</code>\u7684\u8868\u8FBE\u5F0F\uFF0C\u6BD4\u5982\u8BFB\u6216\u5199</li><li>\u5982\u679C\u6709\u591A\u4E2A<code>case </code>\u90FD\u53EF\u4EE5\u8FD0\u884C\uFF0C<code>select</code>\u4F1A\u968F\u673A\u516C\u5E73\u5730\u9009\u51FA\u4E00\u4E2A\u6267\u884C\uFF0C\u5176\u4ED6\u4E0D\u4F1A\u6267\u884C</li><li>\u5982\u679C\u591A\u4E2A<code>case </code>\u90FD\u4E0D\u80FD\u8FD0\u884C\uFF0C\u82E5\u6709<code>default </code>\u5B50\u53E5\uFF0C\u5219\u6267\u884C\u8BE5\u8BED\u53E5\uFF0C\u53CD\u4E4B\uFF0C<code>select </code>\u5C06\u963B\u585E\uFF0C\u76F4\u5230\u67D0\u4E2A<code>case </code>\u53EF\u4EE5\u8FD0\u884C</li><li>\u7A7A<code>select</code>\u4F1A\u4E00\u76F4\u963B\u585E</li></ul><p><strong>\u793A\u4F8B\u4EE3\u7801</strong></p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	c1 <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
	c2 <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6D4B\u8BD51\uFF1A\u76F4\u63A5\u6267\u884C\u4F1A\u6267\u884Cdefault\u8BED\u53E5</span>

	<span class="token comment">// \u6D4B\u8BD52: \u7ED9C1\u7BA1\u9053\u5199\u5165\u6570\u636E\uFF1B\u7ED3\u679C\uFF1A\u5728C1\u7BA1\u9053\u4E2D\u8BFB\u53D6\u5230\u503C\uFF1A 1</span>
	<span class="token comment">//c1 &lt;- 1</span>

	<span class="token comment">// \u6D4B\u8BD53\uFF0C\u76F4\u63A5\u5173\u95ED\u7BA1\u9053\uFF1B\u7ED3\u679C\uFF1AC1\u7BA1\u9053\u4E2D\u7684\u6570\u636E\u4E3A\u96F6\u503C:  0</span>
	<span class="token comment">//close(c1)</span>

	<span class="token comment">// \u6D4B\u8BD54\uFF0C\u4E24\u4E2A\u7BA1\u9053\u90FD\u5173\u95ED\uFF0C\u90A3\u4E48select\u4F1A\u968F\u673A\u53D6\u4E00\u4E2A\uFF0C\u7136\u540E\u6267\u884Cselect\u540E\u9762\u7684\u903B\u8F91</span>
	<span class="token comment">//close(c1)</span>
	<span class="token comment">//close(c2)</span>

	<span class="token comment">// \u5728\u591A\u4E2A\u7BA1\u9053\u4E2D\uFF0C\u53EA\u8981\u6709\u4E00\u4E2A\u64CD\u4F5C\u6210\u529F\u5C31\u6267\u884C\u76F8\u5E94\u903B\u8F91</span>
	<span class="token keyword">select</span> <span class="token punctuation">{</span>
	<span class="token keyword">case</span> v<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>c1<span class="token punctuation">:</span>
		<span class="token keyword">if</span> ok <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u5728C1\u7BA1\u9053\u4E2D\u8BFB\u53D6\u5230\u503C\uFF1A&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">)</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;C1\u7BA1\u9053\u4E2D\u7684\u6570\u636E\u4E3A\u96F6\u503C: &quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

	<span class="token keyword">case</span> v<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>c2<span class="token punctuation">:</span>
		<span class="token keyword">if</span> ok <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u5728C2\u7BA1\u9053\u4E2D\u8BFB\u53D6\u5230\u503C\uFF1A&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">)</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;C2\u7BA1\u9053\u4E2D\u7684\u6570\u636E\u4E3A\u96F6\u503C: &quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token keyword">default</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;select default\u8FD0\u884C&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p><strong>for{ select }\u95EE\u9898</strong></p><p>\u5F53\u9700\u8981\u5FAA\u73AF\u64CD\u4F5C\u65F6\u9700\u8981\u4E0E<code>for</code>\u8FDE\u7528\uFF0C\u8FD9\u65F6\u5019\u5982\u679C<code>select</code>\u4E2D\u542B\u6709<code>break</code>\uFF0C\u90A3\u4E48\u53EA\u80FD\u8DF3\u51FA<code>select</code>\u5C42\u800C\u4E0D\u80FD\u8DF3\u51FA<code>for</code>\u5FAA\u73AF\uFF0C\u4E0B\u9762\u6F14\u793A\u4E00\u4E0B</p><details class="custom-container details"><summary>\u95EE\u9898\u4EE3\u7801\uFF1Afor{ select }\u4E2D\u53EA\u80FD\u8DF3\u51FAselect\u4E0D\u80FD\u8DF3\u51FAfor\u5FAA\u73AF</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;math/rand&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u521D\u59CB\u5316channel</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>

	<span class="token comment">// \u62BD\u5956\uFF0C\u83B7\u5956\u7684ID\u653E\u5165channel\u4E2D</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		rand<span class="token punctuation">.</span><span class="token function">Seed</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">UnixNano</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token keyword">for</span> <span class="token keyword">range</span> time<span class="token punctuation">.</span><span class="token function">Tick</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			ch <span class="token operator">&lt;-</span> rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u5F00\u5956\uFF0C\u4ECEchannel\u4E2D\u8BFB\u6570\u636E</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		<span class="token keyword">select</span> <span class="token punctuation">{</span>
		<span class="token keyword">case</span> v <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch<span class="token punctuation">:</span>
			<span class="token keyword">if</span> v <span class="token operator">&gt;=</span> <span class="token number">100</span> <span class="token operator">&amp;&amp;</span> v <span class="token operator">&lt;=</span> <span class="token number">400</span> <span class="token punctuation">{</span> <span class="token comment">// \u4E3A\u4E86\u63D0\u9AD8\u4E2D\u5956\u51E0\u7387..</span>
				fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u606D\u559C\u4F60\u4E2D\u5956\u4E86\uFF0C\u8BF7\u53BB\u9886\u5956&quot;</span><span class="token punctuation">)</span>
				<span class="token keyword">break</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u9886\u5956</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u611F\u8C22CCTV, \u611F\u8C22MTV, \u611F\u8C22\u515A\u548C\u4EBA\u6C11\u7684\u683D\u57F9...&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><details class="custom-container details"><summary>\u4FEE\u6B63-\u65B9\u5F0F1\uFF1A\u4F7F\u7528break \u6807\u7B7E</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;math/rand&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u521D\u59CB\u5316channel</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>

	<span class="token comment">// \u62BD\u5956\uFF0C\u83B7\u5956\u7684ID\u653E\u5165channel\u4E2D</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		rand<span class="token punctuation">.</span><span class="token function">Seed</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">UnixNano</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token keyword">for</span> <span class="token keyword">range</span> time<span class="token punctuation">.</span><span class="token function">Tick</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			ch <span class="token operator">&lt;-</span> rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u5F00\u5956\uFF0C\u4ECEchannel\u4E2D\u8BFB\u6570\u636E</span>
ForEnd<span class="token punctuation">:</span>		<span class="token comment">// \u6DFB\u52A0\u4E00\u4E2A\u6807\u7B7E</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		<span class="token keyword">select</span> <span class="token punctuation">{</span>
		<span class="token keyword">case</span> v <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch<span class="token punctuation">:</span>
			<span class="token keyword">if</span> v <span class="token operator">&gt;=</span> <span class="token number">100</span> <span class="token operator">&amp;&amp;</span> v <span class="token operator">&lt;=</span> <span class="token number">400</span> <span class="token punctuation">{</span> <span class="token comment">// \u4E3A\u4E86\u63D0\u9AD8\u4E2D\u5956\u51E0\u7387..</span>
				fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u606D\u559C\u4F60\u4E2D\u5956\u4E86\uFF0C\u8BF7\u53BB\u9886\u5956&quot;</span><span class="token punctuation">)</span>
				<span class="token keyword">break</span> ForEnd	<span class="token comment">// \u8DF3\u51FA\u6B64\u6807\u7B7E</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u9886\u5956</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u611F\u8C22CCTV, \u611F\u8C22MTV, \u611F\u8C22\u515A\u548C\u4EBA\u6C11\u7684\u683D\u57F9...&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><details class="custom-container details"><summary>\u4FEE\u6B63-\u65B9\u5F0F2\uFF1A\u4F7F\u7528goto \u6807\u7B7E</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;math/rand&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u521D\u59CB\u5316channel</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>

	<span class="token comment">// \u62BD\u5956\uFF0C\u83B7\u5956\u7684ID\u653E\u5165channel\u4E2D</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		rand<span class="token punctuation">.</span><span class="token function">Seed</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">UnixNano</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token keyword">for</span> <span class="token keyword">range</span> time<span class="token punctuation">.</span><span class="token function">Tick</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			ch <span class="token operator">&lt;-</span> rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u5F00\u5956\uFF0C\u4ECEchannel\u4E2D\u8BFB\u6570\u636E</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		<span class="token keyword">select</span> <span class="token punctuation">{</span>
		<span class="token keyword">case</span> v <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch<span class="token punctuation">:</span>
			<span class="token keyword">if</span> v <span class="token operator">&gt;=</span> <span class="token number">100</span> <span class="token operator">&amp;&amp;</span> v <span class="token operator">&lt;=</span> <span class="token number">400</span> <span class="token punctuation">{</span> <span class="token comment">// \u4E3A\u4E86\u63D0\u9AD8\u4E2D\u5956\u51E0\u7387..</span>
				fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u606D\u559C\u4F60\u4E2D\u5956\u4E86\uFF0C\u8BF7\u53BB\u9886\u5956&quot;</span><span class="token punctuation">)</span>
				<span class="token keyword">goto</span> ForEnd	<span class="token comment">// \u8DF3\u5230\u6307\u5B9A\u6807\u7B7E</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
ForEnd<span class="token punctuation">:</span> <span class="token comment">// \u5B9A\u4E49\u6807\u7B7E</span>

	<span class="token comment">// \u9886\u5956</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u611F\u8C22CCTV, \u611F\u8C22MTV, \u611F\u8C22\u515A\u548C\u4EBA\u6C11\u7684\u683D\u57F9...&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h4 id="\u7EC3\u4E60-select-\u8BBE\u7F6E\u51FD\u6570\u6267\u884C\u8D85\u65F6\u65F6\u95F4" tabindex="-1"><a class="header-anchor" href="#\u7EC3\u4E60-select-\u8BBE\u7F6E\u51FD\u6570\u6267\u884C\u8D85\u65F6\u65F6\u95F4" aria-hidden="true">#</a> \u7EC3\u4E60:select:\u8BBE\u7F6E\u51FD\u6570\u6267\u884C\u8D85\u65F6\u65F6\u95F4</h4><details class="custom-container details"><summary>\u8BBE\u7F6E\u51FD\u6570\u6267\u884C\u8D85\u65F6\u65F6\u95F4\uFF08\u6709\u95EE\u9898\u7248\u672C\uFF0C\u4E3B\u8981\u662F\u5B66\u4E60\u8D85\u65F6\u6838\u5FC3\u903B\u8F91\uFF09</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">Add</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token comment">// \u6A21\u62DF\u51FD\u6570\u8017\u65F6\u64CD\u4F5C</span>
	<span class="token keyword">return</span> x <span class="token operator">+</span> y
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u58F0\u660E\u5E76\u521D\u59CB\u5316channel</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6267\u884C\u534F\u7A0B</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		ret <span class="token operator">:=</span> <span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">111</span><span class="token punctuation">,</span> <span class="token number">222</span><span class="token punctuation">)</span> <span class="token comment">// \u8FD9\u4E2A\u662F\u6211\u4EEC\u539F\u6709\u7684\u51FD\u6570,\u5E76\u4E0D\u505A\u4EFB\u4F55\u4FEE\u6539\uFF0C\u975E\u4FB5\u5165\u5F0F\u505A\u8D85\u65F6\u63A7\u5236</span>
		ch <span class="token operator">&lt;-</span> ret
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u8D85\u65F6\u63A7\u5236</span>
	<span class="token keyword">select</span> <span class="token punctuation">{</span>
	<span class="token keyword">case</span> <span class="token operator">&lt;-</span>time<span class="token punctuation">.</span><span class="token function">After</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u6267\u884C\u8D85\u65F6&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">case</span> v<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch<span class="token punctuation">:</span>
		<span class="token keyword">if</span> ok <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u6267\u884C\u6210\u529F: &quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">)</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u6267\u884C\u62A5\u9519: &quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u90FD\u6709\u54EA\u4E9B\u95EE\u9898\uFF1F</span>
<span class="token comment">// (1) main\u5185\u4EE3\u7801\u592A\u591A\u4E86\uFF0C\u5C06\u8D85\u65F6\u63A7\u5236\u7684\u4EE3\u7801\u5355\u72EC\u5C01\u88C5\u5230\u4E00\u4E2A\u51FD\u6570\u4E2D</span>
<span class="token comment">// (2) Goroutine\u6CC4\u6F0F\uFF1A\u5047\u8BBE\u8D85\u65F6\u4EE5\u540E\uFF0C\u534F\u7A0B\u4E2D\u8FD8\u4F1A\u5199\u6570\u636E\u5230channel\u4E2D\uFF0C\u800C\u5916\u8FB9\u5DF2\u7ECF\u6CA1\u6709\u8BFB\u7684\u4E86\uFF0C\u4F1A\u4E00\u76F4\u963B\u585E\uFF0C\u9020\u6210Goroutine\u6CC4\u6F0F</span>
<span class="token comment">// (3) \u8BE5\u51FD\u6570Add\u8FD4\u56DE\u503C\u6CA1\u6709\u5305\u542B\u9519\u8BEF\uFF0C\u5728\u5B9E\u9645\u573A\u666F\u4E2D\u6709\u4E9B\u51FD\u6570\u4F1A\u6709\u9519\u8BEF\uFF0C\u9519\u8BEF\u5982\u4F55\u4F20\u9012\uFF1F</span>
</code></pre></div></details>`,141),wn={class:"custom-container details"},vn=n("summary",null,"\u8BBE\u7F6E\u51FD\u6570\u6267\u884C\u8D85\u65F6\u65F6\u95F4\uFF08\u4F18\u5316\u540E\u7248\u672C\uFF0C\u8FD8\u7B97\u5B8C\u7F8E\uFF09",-1),xn=n("li",null,[n("p",null,"\u5355\u72EC\u5C01\u88C5\u4E86\u4E00\u4E2A\u51FD\u6570")],-1),Pn=n("p",null,[n("code",null,"Goroutine"),s("\u6CC4\u6F0F\u95EE\u9898\u5C06\u65E0\u7F13\u51B2\u7684"),n("code",null,"channel"),s("\u6539\u4E3A\u5E26\u7F13\u51B2\u533A\u7684"),n("code",null,"channel"),s("\uFF0C\u4F46\u4ECD\u9700\u8981\u539F\u672C\u7684"),n("code",null,"Add"),s("\u51FD\u6570\u6267\u884C\u5B8C\u6210\u540E\u624D\u4F1A\u9000\u51FA"),n("code",null,"AddWithTimeout"),s("\u5185\u90E8\u542F\u52A8\u7684\u534F\u7A0B\u3002")],-1),Sn=s("Go\u4E0D\u652F\u6301\u5916\u90E8\u6740\u6B7B\u4E00\u4E2A\u6B63\u5728\u8FD0\u884C\u7684\u534F\u7A0B\uFF0C\u53C2\u8003\uFF1A"),_n={href:"https://github.com/golang/go/issues/32610",target:"_blank",rel:"noopener noreferrer"},Rn=s("https://github.com/golang/go/issues/32610"),An=n("li",null,[n("p",null,[s("\u6DFB\u52A0\u4F20\u9012\u9519\u8BEF\uFF0C"),n("code",null,"channel"),s("\u4FEE\u6539\u4E3A\u901A\u77E5\u578B")])],-1),Cn=p(`<div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;errors&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;runtime&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">Add</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token comment">// \u6A21\u62DF\u51FD\u6570\u8017\u65F6\u64CD\u4F5C</span>
	<span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">AddWithTimeout</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> timeout <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>ret <span class="token builtin">int</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u58F0\u660E\u5E76\u521D\u59CB\u5316channel</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6267\u884C\u534F\u7A0B</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		ret<span class="token punctuation">,</span> err <span class="token operator">=</span> <span class="token function">Add</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span> <span class="token comment">// \u8FD9\u4E2A\u662F\u6211\u4EEC\u539F\u6709\u7684\u51FD\u6570,\u5E76\u4E0D\u505A\u4EFB\u4F55\u4FEE\u6539</span>
		ch <span class="token operator">&lt;-</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u8D85\u65F6\u63A7\u5236</span>
	<span class="token keyword">select</span> <span class="token punctuation">{</span>
	<span class="token keyword">case</span> <span class="token operator">&lt;-</span>time<span class="token punctuation">.</span><span class="token function">After</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond <span class="token operator">*</span> time<span class="token punctuation">.</span><span class="token function">Duration</span><span class="token punctuation">(</span>timeout<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
		err <span class="token operator">=</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span>fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;Function executed for more than %d seconds: AddWithTimeout(%d, %d)&quot;</span><span class="token punctuation">,</span> timeout<span class="token punctuation">,</span> x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">case</span> <span class="token operator">&lt;-</span>ch<span class="token punctuation">:</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u5F00\u542F\u591A\u4E2A\u534F\u7A0B</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">100000</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			ret<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">AddWithTimeout</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">5000</span><span class="token punctuation">)</span>
			ret <span class="token operator">=</span> ret
			err <span class="token operator">=</span> err
			<span class="token comment">//fmt.Printf(&quot;\u6267\u884C\u7ED3\u679C: %d, %v\\n&quot;, ret, err)</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

    <span class="token comment">// \u6BCF\u96941\u79D2\u8F93\u51FA\u5F53\u524DGoroutine\u6570\u91CF</span>
	<span class="token keyword">for</span> <span class="token keyword">range</span> time<span class="token punctuation">.</span><span class="token function">Tick</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		g <span class="token operator">:=</span> runtime<span class="token punctuation">.</span><span class="token function">NumGoroutine</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u5F53\u524DGoroutine\u6570\u91CF: %d\\n&quot;</span><span class="token punctuation">,</span> g<span class="token punctuation">)</span>
		<span class="token keyword">if</span> g <span class="token operator">&lt;=</span> <span class="token number">1</span> <span class="token punctuation">{</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,1),Fn=p(`<h4 id="\u7EC3\u4E60-channel-\u591A\u4E2A\u534F\u7A0B\u987A\u5E8F\u6253\u5370\u6570\u5B57" tabindex="-1"><a class="header-anchor" href="#\u7EC3\u4E60-channel-\u591A\u4E2A\u534F\u7A0B\u987A\u5E8F\u6253\u5370\u6570\u5B57" aria-hidden="true">#</a> \u7EC3\u4E60:channel:\u591A\u4E2A\u534F\u7A0B\u987A\u5E8F\u6253\u5370\u6570\u5B57</h4><p>\u67094\u4E2A<code>goroutine</code>\uFF0C\u6BCF\u4E2A<code>goroutine</code>\u6253\u5370\u4E00\u4E2A\u6570\u5B57\uFF0C\u8981\u6C42\u6309\u71671<code>/2/3/4</code>\u8FD9\u6837\u7684\u987A\u5E8F\u6253\u5370\u8F93\u51FA</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Token <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">newWorker</span><span class="token punctuation">(</span>id <span class="token builtin">int</span><span class="token punctuation">,</span> ch <span class="token keyword">chan</span> Token<span class="token punctuation">,</span> nextCh <span class="token keyword">chan</span> Token<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		token <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>id <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
		nextCh <span class="token operator">&lt;-</span> token
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	chs <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">chan</span> Token<span class="token punctuation">{</span>
		<span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> Token<span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> Token<span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> Token<span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> Token<span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u542F\u52A84\u4E2A\u534F\u7A0B</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">4</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">go</span> <span class="token function">newWorker</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> chs<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> chs<span class="token punctuation">[</span><span class="token punctuation">(</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token operator">%</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u7ED9\u7B2C\u4E00\u4E2Achan\u53D1\u9001\u6570\u636E</span>
	chs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">&lt;-</span> Token<span class="token punctuation">{</span><span class="token punctuation">}</span>

	<span class="token comment">// \u4F1A\u4E00\u76F4\u963B\u585E</span>
	<span class="token keyword">select</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h3 id="context" tabindex="-1"><a class="header-anchor" href="#context" aria-hidden="true">#</a> Context</h3>`,4),Nn=s("\u5B98\u65B9\u6587\u6863\uFF1A"),Wn={href:"https://pkg.go.dev/context",target:"_blank",rel:"noopener noreferrer"},Tn=s("https://pkg.go.dev/context"),Gn=p(`<p><code>context</code>\u662FGo\u7684\u6807\u51C6\u5E93\uFF0C\u7528\u6765\u7BA1\u7406<code>Goroutine</code>\u7684\u4E0A\u4E0B\u6587\uFF0C<code>context</code>\u662F\u5E76\u53D1\u5B89\u5168\u7684</p><p>\u4F7F\u7528\u4E0A\u4E0B\u6587\u7684\u7A0B\u5E8F\u5E94\u9075\u5FAA\u4EE5\u4E0B\u89C4\u5219</p><ul><li>\u4E0D\u8981\u5728\u7ED3\u6784\u7C7B\u578B\u4E2D\u5B58\u50A8\u4E0A\u4E0B\u6587\uFF1B\u76F8\u53CD\uFF0C\u5C06\u4E0A\u4E0B\u6587\u663E\u5F0F\u5730\u4F20\u9012\u7ED9\u6BCF\u4E2A\u9700\u8981\u5B83\u7684\u51FD\u6570</li><li>\u4E0A\u4E0B\u6587\u5E94\u8BE5\u662F\u7B2C\u4E00\u4E2A\u53C2\u6570\uFF0C\u901A\u5E38\u547D\u540D\u4E3A<code>ctx</code></li><li>\u5373\u4F7F\u51FD\u6570\u5141\u8BB8\uFF0C\u4E5F\u4E0D\u8981\u4F20\u9012nil\u4E0A\u4E0B\u6587\u3002\u5982\u679C\u60A8\u4E0D\u786E\u5B9A\u8981\u4F7F\u7528\u54EA\u4E2A\u4E0A\u4E0B\u6587\uFF0C\u8BF7\u4F7F\u7528<code>context.TODO()</code></li></ul><br><h4 id="withcancel" tabindex="-1"><a class="header-anchor" href="#withcancel" aria-hidden="true">#</a> <code>WithCancel</code></h4><p>\u7528\u6765\u53D6\u6D88\u5B50\u534F\u7A0B\uFF0C\u4EE5\u53CA\u5B59\u5B50\u534F\u7A0B\uFF0C\u4EE5\u53CA\u5B59\u5B50\u7684\u5B59\u5B50\u534F\u7A0B\u7B49</p><p>\u51FD\u6570\u7B7E\u540D</p><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">WithCancel</span><span class="token punctuation">(</span>parent Context<span class="token punctuation">)</span> <span class="token punctuation">(</span>ctx Context<span class="token punctuation">,</span> cancel CancelFunc<span class="token punctuation">)</span>
</code></pre></div><p>\u793A\u4F8B\u4EE3\u7801</p><details class="custom-container details"><summary>\u5148\u770B\u4E00\u6BB5\u6B63\u5E38\u7684\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">worker</span><span class="token punctuation">(</span>wg <span class="token operator">*</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>	
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	wg <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">)</span>
	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

	<span class="token keyword">go</span> <span class="token function">worker</span><span class="token punctuation">(</span>wg<span class="token punctuation">)</span>

	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><details class="custom-container details"><summary>\u5BF9\u534F\u7A0B\u53D1\u9001\u9000\u51FA\u4FE1\u53F7</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;context&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">worker</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> wg <span class="token operator">*</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
LOOP<span class="token punctuation">:</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>

		<span class="token comment">// \u9000\u51FA\u4FE1\u53F7</span>
		<span class="token keyword">select</span> <span class="token punctuation">{</span>
		<span class="token keyword">case</span> <span class="token operator">&lt;-</span>ctx<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
			<span class="token keyword">break</span> LOOP
		<span class="token keyword">default</span><span class="token punctuation">:</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// \u4E1A\u52A1\u4EE3\u7801</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u521D\u59CB\u5316</span>
    <span class="token comment">// Background\u8FD4\u56DE\u4E00\u4E2A\u7A7AContext\u3002\u5B83\u6C38\u8FDC\u4E0D\u4F1A\u88AB\u53D6\u6D88\uFF0C\u6CA1\u6709\u622A\u6B62\u65E5\u671F\uFF0C\u4E5F\u6CA1\u6709\u503C\u3002</span>
	<span class="token comment">// Background\u662F\u6240\u6709Context\u6811\u7684\u6839\u3002</span>
	ctx<span class="token punctuation">,</span> cancel <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">WithCancel</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	wg <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">)</span>

	<span class="token comment">// \u5F00\u59CB\u5DE5\u4F5C\u4E86</span>
	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">worker</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> wg<span class="token punctuation">)</span>

	<span class="token comment">// 5\u79D2\u540E\u9000\u51FA</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">)</span>
	<span class="token function">cancel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><br><h4 id="withdeadline\u548Cwithtimeout" tabindex="-1"><a class="header-anchor" href="#withdeadline\u548Cwithtimeout" aria-hidden="true">#</a> <code>WithDeadline</code>\u548C<code>WithTimeout</code></h4><p><code>WithDeadline</code>\u548C<code>WithTimeout</code>\u662F\u5728<code>WithCancel</code>\u7684\u57FA\u7840\u4E0A\uFF0C\u589E\u52A0\u4E86\u4E00\u4E2A\u8FC7\u671F\u65F6\u95F4</p><p>\u51FD\u6570\u7B7E\u540D</p><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">WithDeadline</span><span class="token punctuation">(</span>parent Context<span class="token punctuation">,</span> d time<span class="token punctuation">.</span>Time<span class="token punctuation">)</span> <span class="token punctuation">(</span>Context<span class="token punctuation">,</span> CancelFunc<span class="token punctuation">)</span>			<span class="token comment">// \u589E\u52A0\u4E00\u4E2A\u5177\u4F53\u7684\u8FC7\u671F\u65F6\u95F4\u70B9</span>
<span class="token keyword">func</span> <span class="token function">WithTimeout</span><span class="token punctuation">(</span>parent Context<span class="token punctuation">,</span> timeout time<span class="token punctuation">.</span>Duration<span class="token punctuation">)</span> <span class="token punctuation">(</span>Context<span class="token punctuation">,</span> CancelFunc<span class="token punctuation">)</span>	<span class="token comment">// \u589E\u52A0\u4E00\u4E2A\u76F8\u5BF9\u7684\u8FC7\u671F\u65F6\u95F4\u6BB5</span>
</code></pre></div><p>\u793A\u4F8B\u4EE3\u7801</p><details class="custom-container details"><summary>\u51FD\u6570\u8D85\u65F6\u63A7\u5236</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;context&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">worker</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> wg <span class="token operator">*</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
LOOP<span class="token punctuation">:</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>

		<span class="token comment">// \u9000\u51FA\u4FE1\u53F7</span>
		<span class="token keyword">select</span> <span class="token punctuation">{</span>
		<span class="token keyword">case</span> <span class="token operator">&lt;-</span>ctx<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
			<span class="token keyword">break</span> LOOP
		<span class="token keyword">default</span><span class="token punctuation">:</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// \u4E1A\u52A1\u4EE3\u7801</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u521D\u59CB\u5316</span>
	ctx<span class="token punctuation">,</span> cancel <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">WithTimeout</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span>Second<span class="token operator">*</span><span class="token number">5</span><span class="token punctuation">)</span>
    <span class="token keyword">defer</span> <span class="token function">cancel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>	<span class="token comment">// \u8FD9\u662F\u4E00\u4E2A\u597D\u4E60\u60EF</span>
	wg <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">)</span>

	<span class="token comment">// \u5F00\u59CB\u5DE5\u4F5C\u4E86</span>
	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">worker</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> wg<span class="token punctuation">)</span>

	<span class="token comment">// \u7B49\u5F85\u4EFB\u52A1\u5B8C\u6210\u6216\u8D85\u65F6</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h4 id="withvalue" tabindex="-1"><a class="header-anchor" href="#withvalue" aria-hidden="true">#</a> WithValue</h4><p>\u53EF\u4EE5\u643A\u5E26\u4E00\u4E2A\u503C</p><p>\u51FD\u6570\u7B7E\u540D</p><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">WithValue</span><span class="token punctuation">(</span>parent Context<span class="token punctuation">,</span> key<span class="token punctuation">,</span> val any<span class="token punctuation">)</span> Context
</code></pre></div><p>\u793A\u4F8B\u4EE3\u7801</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;context&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">Work</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> wg <span class="token operator">*</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span><span class="token function">Value</span><span class="token punctuation">(</span><span class="token string">&quot;key&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u521D\u59CB\u5316</span>
	ctx <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">WithValue</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;key&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value&quot;</span><span class="token punctuation">)</span>
	wg <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">)</span>

	<span class="token comment">// \u5DE5\u4F5C</span>
	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">Work</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> wg<span class="token punctuation">)</span>

	<span class="token comment">// \u7B49\u5F85\u5DE5\u4F5C\u5B8C\u6210</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h3 id="\u6570\u636E\u7ADE\u4E89" tabindex="-1"><a class="header-anchor" href="#\u6570\u636E\u7ADE\u4E89" aria-hidden="true">#</a> \u6570\u636E\u7ADE\u4E89</h3><p>\u5E76\u53D1\u8BFB\u5199\u5171\u4EAB\u8D44\u6E90\u7684\u65F6\u5019\u4F1A\u51FA\u73B0\u6570\u636E\u7ADE\u4E89<code>\uFF08data race\uFF09</code>\uFF0C\u6240\u4EE5\u9700\u8981\u50CF\u9501\u7B49\u673A\u5236\u6765\u8FDB\u884C\u4FDD\u62A4</p><br><p>\u5728\u7F16\u8BD1<code>(cmpile)</code>\u3001\u6D4B\u8BD5<code>\uFF08test\uFF09</code>\u3001\u8FD0\u884C<code>\uFF08run\uFF09</code>\u524D\u4F7F\u7528<code>-race</code>\u9009\u9879\u80FD\u68C0\u6D4B\u6570\u636E\u7ADE\u4E89\u95EE\u9898\uFF0C</p><p>\u4ED6\u7684\u539F\u7406\u662F\uFF1A\u5728\u7A0B\u5E8F\u8FD0\u884C\u4EE5\u540E\uFF0C\u4F1A\u76D1\u63A7\u7A0B\u5E8F\u5BF9\u5185\u5B58\u5730\u5740\u8BBF\u95EE\uFF0C\u5E76\u6253\u5370\u51FA\u63D0\u793A</p><p>\u6CE8\u610F\u4E8B\u9879\uFF1A</p><ul><li>\u5982\u679C\u7A0B\u5E8F\u5728\u4EE5\u540E\u4F1A\u8BBF\u95EE\u67D0\u4E2A\u8D44\u6E90\uFF0C\u6B64\u65F6\u4F7F\u7528<code>-race</code>\u662F\u68C0\u6D4B\u4E0D\u5230\u7684</li><li>\u5F00\u542F\u4E86<code>-race</code>\u4E0D\u8981\u90E8\u7F72\u5230\u7EBF\u4E0A\uFF0C\u56E0\u4E3A\u4F1A\u6709\u6027\u80FD\u95EE\u9898\uFF0C\u6D4B\u8BD5\u671F\u95F4\u53EF\u4EE5\u5F00\u542F<code>-race</code></li></ul><p>\u5148\u51C6\u5907\u4E00\u6BB5\u4EE3\u7801</p><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> data <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">0</span>
	<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup

	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10000</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
		<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			data<span class="token operator">++</span>
			wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u6BCF\u6B21\u8FD0\u884C\u7ED3\u679C\u90FD\u4E0D\u4E00\u6837\uFF0C\u5927\u6982\u5728\u4E3A9600\u5DE6\u53F3\uFF0C\u539F\u7406\u662F\u4EA7\u751F\u4E86\u6570\u636E\u7ADE\u4E89\uFF0Cdata++\u4E0D\u662F\u4E00\u4E2A\u539F\u5B50\u64CD\u4F5C\uFF0C\u64CD\u4F5C\u662F\u53EF\u4EE5\u88AB\u6253\u65AD\u7684</span>
<span class="token comment">// \u6BD4\u5982\u8BF4 \u67092\u4E2A\u534F\u7A0B\u540C\u65F6\u62FF\u5230\u4E86data\u4E3A100\uFF0C\u90A3\u4E48\u534F\u7A0B1\u7ED9data+1=101\uFF0C\u534F\u7A0B2\u4E5F\u7ED9data+1=101\uFF0C\u7ECF\u8FC7\u8FD9\u4FE9\u534F\u7A0B\u4E00\u756A\u64CD\u4F5C\uFF0Cdata\u53EA\u589E\u957F\u4E861\uFF0C</span>
<span class="token comment">// \u6240\u4EE5\u6211\u4EEC\u867D\u7136\u5FAA\u73AF\u4E86\u4E00\u4E07\u6B21\uFF0C\u5176\u5B9E\u7ED3\u679C\u8981&lt;=10000\uFF0C\u5982\u679C\u5C06\u4E0A\u9762\u7684\u5FAA\u73AF\u6B21\u6570\u4FEE\u6539\u4E3A100\u6B21\uFF0C\u90A3\u4E48\u7ED3\u679C\u662F\u6B63\u786E\u7684\uFF0C\u4F46\u5176\u5B9E\u662F\u8FD8\u662F\u6709\u95EE\u9898\u7684</span>
</code></pre></div><p>\u4E0B\u9762\u5F00\u542F<code>--race</code>\u68C0\u6D4B\u6570\u636E\u7ADE\u4E89</p><div class="language-bash ext-sh"><pre class="language-bash"><code>Goroutine <span class="token number">8</span> <span class="token punctuation">(</span>running<span class="token punctuation">)</span> created at:
  main.main<span class="token punctuation">(</span><span class="token punctuation">)</span>
      C:/Users/Administrator/GolandProjects/learn/main.go:14 +0x84

Goroutine <span class="token number">7</span> <span class="token punctuation">(</span>finished<span class="token punctuation">)</span> created at:
  main.main<span class="token punctuation">(</span><span class="token punctuation">)</span>
      C:/Users/Administrator/GolandProjects/learn/main.go:14 +0x84
<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span>
<span class="token number">10000</span>
Found <span class="token number">1</span> data race<span class="token punctuation">(</span>s<span class="token punctuation">)</span>	<span class="token comment"># \u53D1\u73B01\u4E2A\u6570\u636E\u7ADE\u4E89</span>
<span class="token builtin class-name">exit</span> status <span class="token number">66</span>
</code></pre></div><p>\u6700\u5E38\u7528\u7684\u529E\u6CD5\u5C31\u662F\u4F7F\u7528\u9501\uFF0C\u6765\u770B\u4E00\u4E0B\u4EE3\u7801</p><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> data <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">0</span>
	<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup
	<span class="token keyword">var</span> mu sync<span class="token punctuation">.</span>Mutex

	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10000</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
		<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			data<span class="token operator">++</span>
			mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u8FD0\u884C\u5E76\u5F00\u542F--race\u68C0\u6D4B</span>
<span class="token comment">// go run -race main.go  </span>
<span class="token comment">// 10000</span>
</code></pre></div><h3 id="sync" tabindex="-1"><a class="header-anchor" href="#sync" aria-hidden="true">#</a> Sync</h3>`,38),On=s("\u5B98\u65B9\u6587\u6863\uFF1A"),Un={href:"https://pkg.go.dev/sync",target:"_blank",rel:"noopener noreferrer"},Bn=s("https://pkg.go.dev/sync"),Dn=p(`<p><code>sync</code>\u662FGo\u7684\u6807\u51C6\u5E93\uFF0C\u63D0\u4F9B\u4E86\u6700\u57FA\u672C\u7684\u540C\u6B65\u539F\u8BED\uFF0C\u4F7F\u7528\u65F6\u9700\u8981\u6CE8\u610F\uFF1A\u5BF9\u8C61\u4E00\u65E6\u88AB\u4F7F\u7528\u5C31\u4E0D\u5E94\u8BE5\u88AB\u590D\u5236\u3002</p><h4 id="\u4E92\u65A5\u9501\u548C\u8BFB\u5199\u9501" tabindex="-1"><a class="header-anchor" href="#\u4E92\u65A5\u9501\u548C\u8BFB\u5199\u9501" aria-hidden="true">#</a> \u4E92\u65A5\u9501\u548C\u8BFB\u5199\u9501</h4><p>\u9501\u63A5\u53E3</p><div class="language-go ext-go"><pre class="language-go"><code><span class="token comment">// A Locker represents an object that can be locked and unlocked.</span>
<span class="token keyword">type</span> Locker <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>\u4E92\u65A5\u9501</p><p><code>sync.Mutex</code> \u4E92\u65A5\u9501\uFF0C\u5728\u67D0\u4E00\u65F6\u523B\u53EA\u80FD\u6709\u4E00\u4E2A\u534F\u7A0B\u53EF\u4EE5\u62FF\u5230\u9501\uFF0C\u62FF\u4E0D\u5230\u7684\u4F1A\u4E00\u76F4\u963B\u585E\uFF0C\u9002\u5408\u8BFB\u5C11\u5199\u591A\u7684\u573A\u666F</p><div class="language-go ext-go"><pre class="language-go"><code><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">/</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>		<span class="token comment">// \u52A0\u9501/\u89E3\u9501</span>
<span class="token function">TryLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>			<span class="token comment">// \u5C1D\u8BD5\u83B7\u53D6\u9501\uFF0C\u8FD4\u56DE\u5E03\u5C14\u503C\uFF0C\u6B64\u51FD\u6570\u4E0D\u4F1A\u963B\u585E</span>
</code></pre></div><p>\u8BFB\u5199\u9501</p><p><code>sync.RWMutex</code> \u8BFB\u5199\u9501\uFF0C\u5728\u67D0\u4E00\u65F6\u523B\u53EA\u80FD\u7531\u4EFB\u610F\u7684<code>reader</code>\u6301\u6709\uFF0C\u6216\u8005\u662F\u53EA\u80FD\u88AB\u5355\u4E2A\u7684<code>writer</code>\u6301\u6709\uFF0C\u9002\u5408\u8BFB\u591A\u5199\u5C11\u7684\u573A\u666F</p><div class="language-go ext-go"><pre class="language-go"><code><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">/</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>     	<span class="token comment">// \u5199\u64CD\u4F5C\u8C03\u7528\u7684\u65B9\u6CD5</span>
<span class="token function">RLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">/</span><span class="token function">RUnlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>   	<span class="token comment">// \u8BFB\u64CD\u4F5C\u8C03\u7528\u7684\u65B9\u6CD5</span>
<span class="token function">TryLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">/</span><span class="token function">TryRLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>	<span class="token comment">// \u5C1D\u8BD5\u83B7\u53D6\u9501,\u4E0D\u4F1A\u963B\u585E</span>
<span class="token function">RLocker</span><span class="token punctuation">(</span><span class="token punctuation">)</span>           	<span class="token comment">// \u4E3A\u8BFB\u64CD\u4F5C\u8FD4\u56DE\u4E00\u4E2ALocker\u63A5\u53E3\u7684\u5BF9\u8C61\uFF0C\u4ED6\u7684Lock\u65B9\u6CD5\u4F1A\u8C03\u7528RLock\uFF0C\u4ED6\u7684Unlock\u4F1A\u8C03\u7528RUnlock</span>
</code></pre></div><p><strong>\u{1F4A1} \u6CE8\u610F\uFF1A\u672A\u6301\u6709\u9501\u7684\u534F\u7A0B\u4E5F\u53EF\u4EE5\u91CA\u653E\u9501</strong></p><details class="custom-container details"><summary>\u6D4B\u8BD5\u4EE3\u7801-1</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> mu sync<span class="token punctuation">.</span>Mutex
	<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup

	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>

	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u83B7\u53D6\u9501&quot;</span><span class="token punctuation">)</span>
		wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
		mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u91CA\u653E\u9501&quot;</span><span class="token punctuation">)</span>
		wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// \u672A\u6301\u6709\u9501\u7684\u534F\u7A0B\u4E5F\u53EF\u4EE5\u91CA\u653E\u9501\uFF0C\u4F46\u662F\u975E\u5E38\u4E0D\u63A8\u8350\u8FD9\u4E48\u4F7F\u7528</span>
</code></pre></div></details><details class="custom-container details"><summary>\u6D4B\u8BD5\u4EE3\u7801-2</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup
	<span class="token keyword">var</span> mu sync<span class="token punctuation">.</span>Mutex

	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">1</span><span class="token punctuation">)</span>
		mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;f1 lock&quot;</span><span class="token punctuation">)</span>

		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">10</span><span class="token punctuation">)</span>
		mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;f1 unlock&quot;</span><span class="token punctuation">)</span>

		wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span>
		mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;f2 unlock&quot;</span><span class="token punctuation">)</span>

		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">)</span>
		mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;f2 lock&quot;</span><span class="token punctuation">)</span>
		wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;End&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h4 id="\u6848\u4F8B-\u5E76\u53D1\u5B89\u5168\u7684map\u76843\u79CD\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#\u6848\u4F8B-\u5E76\u53D1\u5B89\u5168\u7684map\u76843\u79CD\u5B9E\u73B0" aria-hidden="true">#</a> \u6848\u4F8B\uFF1A\u5E76\u53D1\u5B89\u5168\u7684Map\u76843\u79CD\u5B9E\u73B0</h4><h5 id="_1-\u539F\u751Fmap-\u8BFB\u5199\u9501" tabindex="-1"><a class="header-anchor" href="#_1-\u539F\u751Fmap-\u8BFB\u5199\u9501" aria-hidden="true">#</a> \uFF081\uFF09\u539F\u751FMap+\u8BFB\u5199\u9501</h5><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> RWMap <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	sync<span class="token punctuation">.</span>RWMutex
	m <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u6784\u9020\u51FD\u6570</span>
<span class="token keyword">func</span> <span class="token function">NewRWMap</span><span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">*</span>RWMap <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>RWMap<span class="token punctuation">{</span>
		m<span class="token punctuation">:</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> n<span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u8BFB\u64CD\u4F5C</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>RWMap<span class="token punctuation">)</span> <span class="token function">Load</span><span class="token punctuation">(</span>k <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	m<span class="token punctuation">.</span><span class="token function">RLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> m<span class="token punctuation">.</span><span class="token function">RUnlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	v<span class="token punctuation">,</span> ok <span class="token operator">:=</span> m<span class="token punctuation">.</span>m<span class="token punctuation">[</span>k<span class="token punctuation">]</span>
	<span class="token keyword">return</span> v<span class="token punctuation">,</span> ok
<span class="token punctuation">}</span>

<span class="token comment">// \u5199\u64CD\u4F5C</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>RWMap<span class="token punctuation">)</span> <span class="token function">Store</span><span class="token punctuation">(</span>k <span class="token builtin">int</span><span class="token punctuation">,</span> v <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	m<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> m<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	m<span class="token punctuation">.</span>m<span class="token punctuation">[</span>k<span class="token punctuation">]</span> <span class="token operator">=</span> v
<span class="token punctuation">}</span>

<span class="token comment">// \u5220\u64CD\u4F5C</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>RWMap<span class="token punctuation">)</span> <span class="token function">Delete</span><span class="token punctuation">(</span>k <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	m<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> m<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">delete</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span>m<span class="token punctuation">,</span> k<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u904D\u5386\u64CD\u4F5C</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>RWMap<span class="token punctuation">)</span> <span class="token function">Range</span><span class="token punctuation">(</span>f <span class="token keyword">func</span><span class="token punctuation">(</span>k<span class="token punctuation">,</span> v <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	m<span class="token punctuation">.</span><span class="token function">RLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> m<span class="token punctuation">.</span><span class="token function">RUnlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> m<span class="token punctuation">.</span>m <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token operator">!</span><span class="token function">f</span><span class="token punctuation">(</span>k<span class="token punctuation">,</span> v<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u590D\u5408\u64CD\u4F5C</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>RWMap<span class="token punctuation">)</span> <span class="token function">LoadAndDelete</span><span class="token punctuation">(</span>k <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	m<span class="token punctuation">.</span><span class="token function">RLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> m<span class="token punctuation">.</span><span class="token function">RUnlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	v<span class="token punctuation">,</span> ok <span class="token operator">:=</span> m<span class="token punctuation">.</span>m<span class="token punctuation">[</span>k<span class="token punctuation">]</span>
	<span class="token function">delete</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span>m<span class="token punctuation">,</span> k<span class="token punctuation">)</span>
	<span class="token keyword">return</span> v<span class="token punctuation">,</span> ok
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>RWMap<span class="token punctuation">)</span> <span class="token function">LoadAndStore</span><span class="token punctuation">(</span>k <span class="token builtin">int</span><span class="token punctuation">,</span> v <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	m<span class="token punctuation">.</span><span class="token function">RLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> m<span class="token punctuation">.</span><span class="token function">RUnlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	v<span class="token punctuation">,</span> ok <span class="token operator">:=</span> m<span class="token punctuation">.</span>m<span class="token punctuation">[</span>k<span class="token punctuation">]</span>
	<span class="token keyword">if</span> ok <span class="token punctuation">{</span>
		<span class="token keyword">return</span> v<span class="token punctuation">,</span> <span class="token boolean">true</span>
	<span class="token punctuation">}</span>
	m<span class="token punctuation">.</span>m<span class="token punctuation">[</span>k<span class="token punctuation">]</span> <span class="token operator">=</span> v
	<span class="token keyword">return</span> v<span class="token punctuation">,</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u83B7\u53D6\u5927\u5C0F</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>RWMap<span class="token punctuation">)</span> <span class="token function">Len</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	m<span class="token punctuation">.</span><span class="token function">RLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> m<span class="token punctuation">.</span><span class="token function">RUnlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token function">len</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span>m<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u521D\u59CB\u5316</span>
	<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup
	m <span class="token operator">:=</span> <span class="token function">NewRWMap</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

	<span class="token comment">// \u5199\u6570\u636E</span>
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u5F00\u59CB\u5199\u5165\u6570\u636E&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10000000</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
		<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			m<span class="token punctuation">.</span><span class="token function">Store</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> i<span class="token punctuation">)</span>
			wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token comment">// \u6CE8\u610F\u8FD9\u91CC\u8981\u5C06i\u4F20\u5165</span>
	<span class="token punctuation">}</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u5199\u5165\u6570\u636E\u5B8C\u6210&quot;</span><span class="token punctuation">)</span>

	<span class="token comment">// \u904D\u5386</span>
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u5F00\u59CB\u904D\u5386\u6570\u636E&quot;</span><span class="token punctuation">)</span>
	m<span class="token punctuation">.</span><span class="token function">Range</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>k<span class="token punctuation">,</span> v <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> k <span class="token operator">!=</span> v <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;key is error: %d&quot;</span><span class="token punctuation">,</span> k<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">return</span> <span class="token boolean">true</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u904D\u5386\u6570\u636E\u5B8C\u6210&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h5 id="_2-\u6807\u51C6\u5E93-sync-map" tabindex="-1"><a class="header-anchor" href="#_2-\u6807\u51C6\u5E93-sync-map" aria-hidden="true">#</a> \uFF082\uFF09\u6807\u51C6\u5E93 sync.Map</h5><p><code>sync.Map</code>\u662FGo\u4E3A\u6211\u4EEC\u63D0\u4F9B\u7684\u5E76\u53D1\u5B89\u5168\u7684<code>Map</code>\uFF0C\u9002\u7528\u4E8E\u8BFB\u591A\u5199\u5C11\u7684\u573A\u666F</p><p>\uFF08\u9002\u7528\u573A\u666F\u4E0E\u539F\u751F<code>map</code> + <code>sync.RWMutex</code>\u7C7B\u4F3C\uFF0C\u76F8\u6BD4\u800C\u8A00<code>sync.Map</code>\u8BFB\u7684\u6027\u80FD\u66F4\u597D\u5199\u7684\u6027\u80FD\u66F4\u5DEE\uFF09</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> m sync<span class="token punctuation">.</span>Map
	<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup

	<span class="token comment">// \u5199\u6570\u636E\uFF0C\u5E76\u53D1\u5199</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">20</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
		<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			m<span class="token punctuation">.</span><span class="token function">Store</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> i<span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// \u5199\u6570\u636E\uFF0C\u652F\u6301\u4E0D\u540C\u7684\u6570\u636E\u7C7B\u578B</span>
	m<span class="token punctuation">.</span><span class="token function">Store</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	m<span class="token punctuation">.</span><span class="token function">Store</span><span class="token punctuation">(</span><span class="token char">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token string">&quot;\u4E2D\u56FD&quot;</span><span class="token punctuation">)</span>

	<span class="token comment">// \u8BFB\u6570\u636E</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span><span class="token function">Load</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span>            <span class="token comment">// \u8BFB\u53D6</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span><span class="token function">LoadAndDelete</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span>   <span class="token comment">// \u8BFB\u53D6\u5E76\u5220\u9664</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span><span class="token function">LoadOrStore</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// \u8BFB\u53D6,\u7B2C\u4E8C\u4E2A\u8FD4\u56DE\u503C\u4EE3\u8868\u662F\u5426\u8BFB\u53D6\u5230\uFF0C\u82E5\u8BFB\u4E0D\u5230\u5219\u8BBE\u7F6Evalue\u4E3A\u8BE5\u503C\u5E76\u8FD4\u56DE</span>

	<span class="token comment">// \u5220\u9664\u6570\u636E</span>
	m<span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">)</span> <span class="token comment">// \u65E0\u8FD4\u56DE\u503C</span>
	m<span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">)</span>

	<span class="token comment">// \u904D\u5386</span>
	m<span class="token punctuation">.</span><span class="token function">Range</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value any<span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">true</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h5 id="_3-\u7B2C\u4E09\u65B9\u5E93-map\u5206\u7247" tabindex="-1"><a class="header-anchor" href="#_3-\u7B2C\u4E09\u65B9\u5E93-map\u5206\u7247" aria-hidden="true">#</a> \uFF083\uFF09\u7B2C\u4E09\u65B9\u5E93\uFF1A<code>map</code>\u5206\u7247</h5>`,21),Ln=n("code",null,"Github",-1),En=s("\u5730\u5740\uFF1A"),In={href:"https://github.com/orcaman/concurrent-map",target:"_blank",rel:"noopener noreferrer"},Mn=s("https://github.com/orcaman/concurrent-map"),zn=p(`<p><code>concurrent-map</code>\u63D0\u4F9B\u4E86\u4E00\u79CD\u9AD8\u6027\u80FD\u7684\u89E3\u51B3\u65B9\u6848:\u901A\u8FC7\u5BF9\u5185\u90E8<code>map</code>\u8FDB\u884C\u5206\u7247\uFF0C\u964D\u4F4E\u9501\u7C92\u5EA6\uFF0C\u4ECE\u800C\u8FBE\u5230\u6700\u5C11\u7684\u9501\u7B49\u5F85\u65F6\u95F4(\u9501\u51B2\u7A81)</p><p><strong>\u5B9E\u73B0\u903B\u8F91</strong></p><ul><li>\u9ED8\u8BA4\u5BF9<code>map</code>\u5206\u4E8632\u7247\uFF08\u6BCF\u4E00\u7247\u662F\u4E00\u4E2A\u7ED3\u6784\u4F53\uFF0C\u6BCF\u4E2A\u7ED3\u6784\u4F53\u5305\u542B\u539F\u751FMap\u548C\u8BFB\u5199\u9501\uFF09\uFF0C\u6240\u6709\u5206\u7247\u5B58\u50A8\u5728\u4E00\u4E2A\u5207\u7247\u4E2D<code>[]*ConcurrentMapShared</code></li><li>\u6BCF\u6B21\u64CD\u4F5C\u65F6(\u589E\u5220\u6539\u67E5)\uFF0C\u5148\u901A\u8FC7<code>GetShard(key)</code>\u83B7\u53D6<code>key</code>\u6240\u5728\u7684\u5206\u7247\uFF0C\u7136\u540E\u5BF9\u5206\u7247\u52A0\u9501\u540E\u518D\u64CD\u4F5C</li></ul><p>\u793A\u4F8B\u4EE3\u7801</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;github.com/orcaman/concurrent-map&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;strconv&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u521D\u59CB\u5316</span>
	<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup
	m <span class="token operator">:=</span> cmap<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// \u521D\u59CB\u5316Map</span>
	loop <span class="token operator">:=</span> <span class="token number">1000000</span> <span class="token comment">// \u5FAA\u73AF\u6B21\u6570</span>

	<span class="token comment">// \u5199\u6570\u636E\uFF0C\u503C\u5FC5\u987B\u4E3Astring\uFF0C\u8FD9\u662F\u4EE3\u7801\u91CC\u5199\u6B7B\u7684</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> loop<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
		<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			m<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span>strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">,</span> i<span class="token operator">*</span>i<span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u83B7\u53D6\u6570\u636E\u5E76\u6821\u9A8C</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> loop<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
		<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token keyword">if</span> v<span class="token punctuation">,</span> ok <span class="token operator">:=</span> m<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span>strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span>
				<span class="token keyword">if</span> v <span class="token operator">!=</span> i<span class="token operator">*</span>i <span class="token punctuation">{</span>
					log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;key err: %d\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h4 id="\u53EA\u6267\u884C\u4E00\u6B21" tabindex="-1"><a class="header-anchor" href="#\u53EA\u6267\u884C\u4E00\u6B21" aria-hidden="true">#</a> \u53EA\u6267\u884C\u4E00\u6B21</h4><p><code>sync.Once</code>\u53EA\u66B4\u9732\u4E86\u4E00\u4E2A\u65B9\u6CD5<code>Do</code>,\u591A\u6B21\u8C03\u7528<code>Do</code>\u65B9\u6CD5\uFF0C\u4F46\u662F\u53EA\u6709\u7B2C\u4E00\u6B21\u8C03\u7528<code>Do</code>\u65B9\u6CD5\u65F6\u53C2\u6570<code>f</code>\u51FD\u6570\u624D\u4F1A\u6267\u884C\uFF0C<code>f</code>\u51FD\u6570\u662F\u65E0\u53C2\u6570\u65E0\u8FD4\u56DE\u503C\u7684\u51FD\u6570</p><p><strong>\u5355\u4F8B\u6A21\u5F0F\u4E0E\u91CD\u7F6E</strong></p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	name <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> <span class="token punctuation">(</span>
	once   sync<span class="token punctuation">.</span>Once
	person <span class="token operator">*</span>Person
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">*</span>Person <span class="token punctuation">{</span>
	once<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		person <span class="token operator">=</span> <span class="token operator">&amp;</span>Person<span class="token punctuation">{</span>name<span class="token punctuation">:</span> name<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> person
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">RestPerson</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	once <span class="token operator">=</span> sync<span class="token punctuation">.</span>Once<span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u5355\u4F8B\u6A21\u5F0F</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%p\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%p\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span><span class="token string">&quot;b&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// \u91CD\u7F6E</span>
	<span class="token function">RestPerson</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    <span class="token comment">// \u7EE7\u7EED\u5355\u4F8B\u6A21\u5F0F</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%p\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span><span class="token string">&quot;c&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%p\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span><span class="token string">&quot;d&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u8F93\u51FA\u7ED3\u679C</span>
<span class="token comment">// 0xc00004a250</span>
<span class="token comment">// 0xc00004a250</span>
<span class="token comment">// 0xc00004a260</span>
<span class="token comment">// 0xc00004a260</span>
</code></pre></div></details><blockquote><p>\u{1F440} \u5176\u4ED6\u5355\u4F8B\u6A21\u5F0F\u6269\u5C55</p><p>\u65B9\u6CD51\uFF1A\u5B9A\u4E49\u5305\u7EA7\u522B\u7684\u53D8\u91CF<br> \u65B9\u6CD52\uFF1A\u5305\u7EA7\u522B<code>init</code>\u51FD\u6570\u521D\u59CB\u5316<br> \u65B9\u6CD53\uFF1A\u5728<code>main</code>\u51FD\u6570\u4E2D\uFF0C\u6267\u884C\u4E00\u4E2A\u521D\u59CB\u5316\u51FD\u6570</p></blockquote><h4 id="\u4E34\u65F6\u7F13\u5B58\u6C60pool" tabindex="-1"><a class="header-anchor" href="#\u4E34\u65F6\u7F13\u5B58\u6C60pool" aria-hidden="true">#</a> \u4E34\u65F6\u7F13\u5B58\u6C60Pool</h4><p><code>sync.Pool</code>\u662F\u4E00\u4E2A\u4E34\u65F6\u7F13\u5B58\u6C60\uFF0C\u5E76\u53D1\u5B89\u5168</p><p><strong>\u6CE8\u610F\u4E8B\u9879</strong></p><ul><li>\u6C60\u5BF9\u8C61\u53EF\u4EE5\u968F\u65F6\u88AB\u5783\u573E\u56DE\u6536\u6389\uFF0C\u6240\u4EE5HTTP\u957F\u8FDE\u63A5\u3001\u6570\u636E\u5E93\u957F\u8FDE\u63A5\u7B49\u4E0D\u9002\u5408\u4F7F\u7528\u5B83</li><li>\u6C60\u4E2D\u8981\u653E\u5165\u5F15\u7528\u7C7B\u578B\u7684\u5BF9\u8C61\uFF0C\u4E0D\u7136\u662F\u5BF9\u8C61\u7684\u62F7\u8D1D\u5219\u8D77\u4E0D\u5230\u7F13\u5B58\u6C60\u7684\u4F5C\u7528</li><li>\u5728\u5BF9\u8C61\u7528\u5B8C\u4EE5\u540E\uFF0C\u653E\u5165\u6C60\u4E2D\u4E4B\u524D\uFF0C\u6700\u597D\u505A\u4E00\u4E0B\u6E05\u7406\u5DE5\u4F5C\uFF0C\u4E0D\u7136\u4E0B\u6B21\u4ECE\u6C60\u4E2D\u4F1A\u62FF\u5230\u4E00\u4E2A\u6709\u4F7F\u7528\u75D5\u8FF9\u7684\u5BF9\u8C61</li><li><code>Get()</code>\u548C<code>Put(x)</code>\u662F\u5E76\u53D1\u5B89\u5168\u7684\uFF0C\u4F46\u662F<code>New()</code>\u4E0D\u662F\u5E76\u53D1\u5B89\u5168\u7684\uFF0C\u4F46\u662F\u5E76\u4E0D\u5F71\u54CD\u6211\u4EEC\u4F7F\u7528</li></ul><p><strong>\u5B9A\u4E49\u548C\u65B9\u6CD5</strong></p><div class="language-go ext-go"><pre class="language-go"><code><span class="token comment">// sync.Pool\u7ED3\u6784\u4F53\u5B9A\u4E49</span>
<span class="token keyword">type</span> Pool <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token operator">...</span> 			<span class="token comment">// \u5FFD\u7565</span>
	New <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> any	<span class="token comment">// \u5F53\u6C60\u4E3A\u7A7A\u65F6\u4F1A\u8C03\u7528\u6B64\u65B9\u6CD5\u6765\u521B\u5EFA\u5BF9\u8C61\u5E76\u653E\u5165\u6C60\u4E2D</span>
<span class="token punctuation">}</span>

<span class="token comment">// sync.Pool\u7ED3\u6784\u4F53\u65B9\u6CD5</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>Pool<span class="token punctuation">)</span> <span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> any <span class="token punctuation">{</span><span class="token punctuation">}</span>		<span class="token comment">// \u4ECE\u6C60\u4E2D\u53D6\u8D70\u4E00\u4E2A\u5143\u7D20\uFF0C\u540C\u65F6\u4F1A\u5728\u6C60\u4E2D\u5220\u9664\u8FD9\u4E2A\u5143\u7D20</span>
								<span class="token comment">// \u5982\u679CPool\u4E2D\u6CA1\u6709\u5143\u7D20\u4E86\uFF0C\u4F1A\u4F7F\u7528\u7ED3\u6784\u4F53\u7684New\u65B9\u6CD5\u521B\u5EFA\u4E00\u4E2A\u5143\u7D20</span>
        						<span class="token comment">// \u5982\u679C\u7ED3\u6784\u4F53\u6CA1\u6709\u5B9A\u4E49New\u65B9\u6CD5\uFF0C\u90A3\u4E48Get\u65B9\u6CD5\u4F1A\u8FD4\u56DEnil\uFF0C\u6240\u4EE5\u5728\u4F7F\u7528Get\u65F6\u8981\u5224\u65ADnil\u7684\u60C5\u51B5</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>Pool<span class="token punctuation">)</span> <span class="token function">Put</span><span class="token punctuation">(</span>x any<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>	<span class="token comment">// \u5C06\u5143\u7D20\u653E\u5230Pool\uFF0C\u5982\u679C\u5143\u7D20\u4E3Anil\uFF0C\u90A3\u4E48Pool\u4F1A\u5FFD\u7565\u8FD9\u4E2A\u503C</span>
</code></pre></div><p><strong>\u57FA\u672C\u4F7F\u7528</strong></p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>u <span class="token operator">*</span>User<span class="token punctuation">)</span> <span class="token function">Clean</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	u<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;&quot;</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u521D\u59CB\u5316\u6C60</span>
	pool <span class="token operator">:=</span> <span class="token operator">&amp;</span>sync<span class="token punctuation">.</span>Pool<span class="token punctuation">{</span>
		New<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token function">new</span><span class="token punctuation">(</span>User<span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">}</span>

	<span class="token comment">// \u4ECE\u6C60\u4E2D\u83B7\u53D6\u5BF9\u8C61</span>
	user <span class="token operator">:=</span> pool<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>User<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%#v %p\\n&quot;</span><span class="token punctuation">,</span> user<span class="token punctuation">,</span> user<span class="token punctuation">)</span>

	<span class="token comment">// \u4F7F\u7528\u5BF9\u8C61</span>
	user<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">&quot;bob&quot;</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%#v %p\\n&quot;</span><span class="token punctuation">,</span> user<span class="token punctuation">,</span> user<span class="token punctuation">)</span>

	<span class="token comment">// \u7528\u5B8C\u4E86\uFF0C\u653E\u56DE\u6C60\u4E2D</span>
	user<span class="token punctuation">.</span><span class="token function">Clean</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// \u653E\u56DE\u6C60\u4E4B\u524D\u6267\u884C\u6E05\u7406\u5DE5\u4F5C\uFF0C\u4E0D\u7136\u4E0B\u6B21\u4ECE\u6C60\u4E2D\u4F1A\u62FF\u5230\u4E00\u4E2A\u6709\u4F7F\u7528\u75D5\u8FF9\u7684\u5BF9\u8C61</span>
	pool<span class="token punctuation">.</span><span class="token function">Put</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span>

	<span class="token comment">// \u518D\u6B21\u7533\u8BF7\u4E00\u4E2A</span>
	user2 <span class="token operator">:=</span> pool<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>User<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%#v %p\\n&quot;</span><span class="token punctuation">,</span> user2<span class="token punctuation">,</span> user2<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u8F93\u51FA\u7ED3\u679C</span>
<span class="token comment">// &amp;main.User{Name:&quot;&quot;} 0xc00004a250</span>
<span class="token comment">// &amp;main.User{Name:&quot;bob&quot;} 0xc00004a250</span>
<span class="token comment">// &amp;main.User{Name:&quot;&quot;} 0xc00004a250</span>
</code></pre></div></details><h4 id="\u6848\u4F8B-\u5E76\u53D1\u5B89\u5168\u7684\u5B57\u8282\u6C60\u76842\u79CD\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#\u6848\u4F8B-\u5E76\u53D1\u5B89\u5168\u7684\u5B57\u8282\u6C60\u76842\u79CD\u5B9E\u73B0" aria-hidden="true">#</a> \u6848\u4F8B\uFF1A\u5E76\u53D1\u5B89\u5168\u7684\u5B57\u8282\u6C60\u76842\u79CD\u5B9E\u73B0</h4><h5 id="_1-sync-pool\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#_1-sync-pool\u5B9E\u73B0" aria-hidden="true">#</a> \uFF081\uFF09<code>sync.Pool</code>\u5B9E\u73B0</h5>`,20),Hn=s("\u4EE3\u7801\u6765\u81EA"),jn=n("code",null,"Hugo",-1),Vn=s("\uFF1A"),Xn={href:"https://github.com/gohugoio/hugo",target:"_blank",rel:"noopener noreferrer"},Jn=s("https://github.com/gohugoio/hugo"),Kn=p(`<details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;bytes&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> bufferPool <span class="token operator">=</span> <span class="token operator">&amp;</span>sync<span class="token punctuation">.</span>Pool<span class="token punctuation">{</span>
	New<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> any <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token operator">&amp;</span>bytes<span class="token punctuation">.</span>Buffer<span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// GetBuffer returns a buffer from the pool.</span>
<span class="token keyword">func</span> <span class="token function">GetBuffer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>buf <span class="token operator">*</span>bytes<span class="token punctuation">.</span>Buffer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> bufferPool<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>bytes<span class="token punctuation">.</span>Buffer<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// PutBuffer returns a buffer to the pool.</span>
<span class="token comment">// The buffer is reset before it is put back into circulation.</span>
<span class="token keyword">func</span> <span class="token function">PutBuffer</span><span class="token punctuation">(</span>buf <span class="token operator">*</span>bytes<span class="token punctuation">.</span>Buffer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	buf<span class="token punctuation">.</span><span class="token function">Reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	bufferPool<span class="token punctuation">.</span><span class="token function">Put</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u4ECE\u6C60\u5B50\u53D6\u51FA\u5BF9\u8C61</span>
	buf <span class="token operator">:=</span> <span class="token function">GetBuffer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u957F\u5EA6: %d | \u5BB9\u91CF: %d\\n&quot;</span><span class="token punctuation">,</span> buf<span class="token punctuation">.</span><span class="token function">Len</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> buf<span class="token punctuation">.</span><span class="token function">Cap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// \u4F7F\u7528</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10000</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		buf<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u957F\u5EA6: %d | \u5BB9\u91CF: %d\\n&quot;</span><span class="token punctuation">,</span> buf<span class="token punctuation">.</span><span class="token function">Len</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> buf<span class="token punctuation">.</span><span class="token function">Cap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// \u653E\u5165\u6C60\u5B50</span>
	<span class="token function">PutBuffer</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span>

	<span class="token comment">// \u518D\u6B21\u4ECE\u6C60\u5B50\u53D6\u51FA</span>
	buf2 <span class="token operator">:=</span> <span class="token function">GetBuffer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u957F\u5EA6: %d | \u5BB9\u91CF: %d\\n&quot;</span><span class="token punctuation">,</span> buf2<span class="token punctuation">.</span><span class="token function">Len</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> buf2<span class="token punctuation">.</span><span class="token function">Cap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h5 id="_2-\u4F7F\u7528channel\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#_2-\u4F7F\u7528channel\u5B9E\u73B0" aria-hidden="true">#</a> \uFF082\uFF09\u4F7F\u7528channel\u5B9E\u73B0</h5>`,2),Yn=s("\u4EE3\u7801\u6765\u81EAminio\uFF1A"),Qn={href:"https://github.com/minio/minio",target:"_blank",rel:"noopener noreferrer"},Zn=s("https://github.com/minio/minio"),$n=p(`<details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token comment">// BytePoolCap implements a leaky pool of []byte in the form of a bounded channel.</span>
<span class="token keyword">type</span> BytePoolCap <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	c    <span class="token keyword">chan</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span>
	w    <span class="token builtin">int</span>
	wcap <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token comment">// NewBytePoolCap creates a new BytePool bounded to the given maxSize, with new</span>
<span class="token comment">// byte arrays sized based on width.</span>
<span class="token keyword">func</span> <span class="token function">NewBytePoolCap</span><span class="token punctuation">(</span>maxSize <span class="token builtin">int</span><span class="token punctuation">,</span> width <span class="token builtin">int</span><span class="token punctuation">,</span> capwidth <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>bp <span class="token operator">*</span>BytePoolCap<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>BytePoolCap<span class="token punctuation">{</span>
		c<span class="token punctuation">:</span>    <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> maxSize<span class="token punctuation">)</span><span class="token punctuation">,</span>
		w<span class="token punctuation">:</span>    width<span class="token punctuation">,</span>
		wcap<span class="token punctuation">:</span> capwidth<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Get gets a []byte from the BytePool, or creates a new one if none are</span>
<span class="token comment">// available in the pool.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>bp <span class="token operator">*</span>BytePoolCap<span class="token punctuation">)</span> <span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>b <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">select</span> <span class="token punctuation">{</span>
	<span class="token keyword">case</span> b <span class="token operator">=</span> <span class="token operator">&lt;-</span>bp<span class="token punctuation">.</span>c<span class="token punctuation">:</span>
	<span class="token comment">// reuse existing buffer</span>
	<span class="token keyword">default</span><span class="token punctuation">:</span>
		<span class="token comment">// create new buffer</span>
		<span class="token keyword">if</span> bp<span class="token punctuation">.</span>wcap <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token punctuation">{</span>
			b <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> bp<span class="token punctuation">.</span>w<span class="token punctuation">,</span> bp<span class="token punctuation">.</span>wcap<span class="token punctuation">)</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			b <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> bp<span class="token punctuation">.</span>w<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span>
<span class="token punctuation">}</span>

<span class="token comment">// Put returns the given Buffer to the BytePool.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>bp <span class="token operator">*</span>BytePoolCap<span class="token punctuation">)</span> <span class="token function">Put</span><span class="token punctuation">(</span>b <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">select</span> <span class="token punctuation">{</span>
	<span class="token keyword">case</span> bp<span class="token punctuation">.</span>c <span class="token operator">&lt;-</span> b<span class="token punctuation">:</span>
		<span class="token comment">// buffer went back into pool</span>
	<span class="token keyword">default</span><span class="token punctuation">:</span>
		<span class="token comment">// buffer didn&#39;t go back into pool, just discard</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Width returns the width of the byte arrays in this pool.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>bp <span class="token operator">*</span>BytePoolCap<span class="token punctuation">)</span> <span class="token function">Width</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> bp<span class="token punctuation">.</span>w
<span class="token punctuation">}</span>

<span class="token comment">// WidthCap returns the cap width of the byte arrays in this pool.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>bp <span class="token operator">*</span>BytePoolCap<span class="token punctuation">)</span> <span class="token function">WidthCap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> bp<span class="token punctuation">.</span>wcap
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u521D\u59CB\u5316\u6C60\u5B50</span>
	pool <span class="token operator">:=</span> <span class="token function">NewBytePoolCap</span><span class="token punctuation">(</span><span class="token number">10000</span><span class="token punctuation">,</span> <span class="token number">512</span><span class="token punctuation">,</span> <span class="token number">512</span><span class="token punctuation">)</span>

	<span class="token comment">// \u4ECE\u6C60\u5B50\u53D6\u51FA\u5BF9\u8C61</span>
	buf <span class="token operator">:=</span> pool<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u957F\u5EA6: %d | \u5BB9\u91CF: %d\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// \u4F7F\u7528</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10000</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		buf <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>buf<span class="token punctuation">,</span> <span class="token char">&#39;h&#39;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u957F\u5EA6: %d | \u5BB9\u91CF: %d\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// \u653E\u5165\u6C60\u5B50</span>
	pool<span class="token punctuation">.</span><span class="token function">Put</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span>

	<span class="token comment">// \u518D\u6B21\u4ECE\u6C60\u5B50\u53D6\u51FA</span>
	buf2 <span class="token operator">:=</span> pool<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u957F\u5EA6: %d | \u5BB9\u91CF: %d\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>buf2<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>buf2<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h5 id="_3-\u53EF\u80FD\u9700\u8981\u7684\u6CE8\u610F\u4E8B\u9879" tabindex="-1"><a class="header-anchor" href="#_3-\u53EF\u80FD\u9700\u8981\u7684\u6CE8\u610F\u4E8B\u9879" aria-hidden="true">#</a> \uFF083\uFF09\u53EF\u80FD\u9700\u8981\u7684\u6CE8\u610F\u4E8B\u9879</h5><ul><li><p>\u5185\u5B58\u6CC4\u6F0F\u95EE\u9898\uFF1A</p><ul><li><p>\u63CF\u8FF0\uFF1A\u5F53<code>byte</code>\u5F88\u5927\u7684\u65F6\u5019\uFF0C\u518D\u653E\u5165\u6C60\u5B50\uFF0C\u5C31\u4F1A\u5F15\u8D77\u5185\u5B58\u6CC4\u6F0F</p></li><li><p>\u89E3\u51B3\uFF1A\u653E\u56DE\u6C60\u5B50\u65F6\u5224\u65AD<code>Byte</code>\u5927\u5C0F\uFF0C\u5982\u679C\u5F88\u5927\u5C31\u76F4\u63A5\u4E22\u5F03</p></li><li><p>\u53C2\u8003\u5B9E\u73B0</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u53C2\u8003\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token comment">// fmt\u5305print.go\u6587\u4EF6</span>

<span class="token comment">// \u5B9A\u4E49\u6C60\u5B50</span>
<span class="token keyword">var</span> ppFree <span class="token operator">=</span> sync<span class="token punctuation">.</span>Pool<span class="token punctuation">{</span>
	New<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> any <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token function">new</span><span class="token punctuation">(</span>pp<span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u653E\u56DE\u6C60\u5B50\u64CD\u4F5C</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>pp<span class="token punctuation">)</span> <span class="token function">free</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// Proper usage of a sync.Pool requires each entry to have approximately</span>
	<span class="token comment">// the same memory cost. To obtain this property when the stored type</span>
	<span class="token comment">// contains a variably-sized buffer, we add a hard limit on the maximum buffer</span>
	<span class="token comment">// to place back in the pool.</span>
	<span class="token comment">//</span>
	<span class="token comment">// See https://golang.org/issue/23199</span>
	<span class="token keyword">if</span> <span class="token function">cap</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>buf<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">64</span><span class="token operator">&lt;&lt;</span><span class="token number">10</span> <span class="token punctuation">{</span>	<span class="token comment">// \u5BB9\u91CF\u8FC7\u5927\u5219\u4E22\u5F03</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	p<span class="token punctuation">.</span>buf <span class="token operator">=</span> p<span class="token punctuation">.</span>buf<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">0</span><span class="token punctuation">]</span>
	p<span class="token punctuation">.</span>arg <span class="token operator">=</span> <span class="token boolean">nil</span>
	p<span class="token punctuation">.</span>value <span class="token operator">=</span> reflect<span class="token punctuation">.</span>Value<span class="token punctuation">{</span><span class="token punctuation">}</span>
	p<span class="token punctuation">.</span>wrappedErr <span class="token operator">=</span> <span class="token boolean">nil</span>
	ppFree<span class="token punctuation">.</span><span class="token function">Put</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details></li></ul></li><li><p>\u5185\u5B58\u6D6A\u8D39\u95EE\u9898\uFF1A</p><ul><li><p>\u63CF\u8FF0\uFF1A\u5982\u679C\u6C60\u5B50\u5185\u7684<code>buffer</code>\u6BD4\u8F83\u5927\uFF0C\u4F46\u662F\u5B9E\u9645\u7528\u7684\u8BDD\u6BD4\u8F83\u5C0F\uFF0C\u5C31\u5B58\u5728\u6D6A\u8D39\u95EE\u9898\u4E86</p></li><li><p>\u89E3\u51B3\uFF1A\u5B9A\u4E49\u591A\u79CD\u89C4\u683C\u7684\u6C60\u5B50\uFF0C\u6309\u9700\u4F7F\u7528</p></li><li><p>\u53C2\u8003\u5B9E\u73B0</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u53C2\u8003\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token comment">// net/http\u5305server.go</span>

<span class="token keyword">var</span> <span class="token punctuation">(</span>
	bufioReaderPool   sync<span class="token punctuation">.</span>Pool
	bufioWriter2kPool sync<span class="token punctuation">.</span>Pool
	bufioWriter4kPool sync<span class="token punctuation">.</span>Pool
<span class="token punctuation">)</span>
</code></pre></div></details></li></ul></li></ul><h4 id="\u6761\u4EF6\u53D8\u91CF-\u4E0D\u63A8\u8350" tabindex="-1"><a class="header-anchor" href="#\u6761\u4EF6\u53D8\u91CF-\u4E0D\u63A8\u8350" aria-hidden="true">#</a> \u6761\u4EF6\u53D8\u91CF(\u4E0D\u63A8\u8350)</h4><p><code>sync.Cond</code>\u5E76\u4E0D\u88AB\u63A8\u8350\u4F7F\u7528\uFF0C\u8FD9\u91CC\u6743\u5F53\u4E86\u89E3\u4E00\u4E0B</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> done <span class="token operator">=</span> <span class="token boolean">false</span>

<span class="token keyword">func</span> <span class="token function">read</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">,</span> c <span class="token operator">*</span>sync<span class="token punctuation">.</span>Cond<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	c<span class="token punctuation">.</span>L<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token operator">!</span>done <span class="token punctuation">{</span>
		c<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// \u4F1A\u91CA\u653E\u9501\uFF0C\u88AB\u5524\u9192\u65F6\u53C8\u4F1A\u91CD\u65B0\u83B7\u5F97\u9501</span>
	<span class="token punctuation">}</span>
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> <span class="token string">&quot;starts reading&quot;</span><span class="token punctuation">)</span>
	c<span class="token punctuation">.</span>L<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">write</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">,</span> c <span class="token operator">*</span>sync<span class="token punctuation">.</span>Cond<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> <span class="token string">&quot;starts writing&quot;</span><span class="token punctuation">)</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
	c<span class="token punctuation">.</span>L<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	done <span class="token operator">=</span> <span class="token boolean">true</span>
	c<span class="token punctuation">.</span>L<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> <span class="token string">&quot;wakes all&quot;</span><span class="token punctuation">)</span>
	c<span class="token punctuation">.</span><span class="token function">Broadcast</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	cond <span class="token operator">:=</span> sync<span class="token punctuation">.</span><span class="token function">NewCond</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>sync<span class="token punctuation">.</span>Mutex<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token keyword">go</span> <span class="token function">read</span><span class="token punctuation">(</span><span class="token string">&quot;reader1&quot;</span><span class="token punctuation">,</span> cond<span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">read</span><span class="token punctuation">(</span><span class="token string">&quot;reader2&quot;</span><span class="token punctuation">,</span> cond<span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">read</span><span class="token punctuation">(</span><span class="token string">&quot;reader3&quot;</span><span class="token punctuation">,</span> cond<span class="token punctuation">)</span>
	<span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&quot;writer&quot;</span><span class="token punctuation">,</span> cond<span class="token punctuation">)</span>

	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">3</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h3 id="sync-atomic" tabindex="-1"><a class="header-anchor" href="#sync-atomic" aria-hidden="true">#</a> sync/atomic</h3>`,7),ns=s("\u5B98\u65B9\u6587\u6863\uFF1A"),ss={href:"https://pkg.go.dev/sync/atomic",target:"_blank",rel:"noopener noreferrer"},as=s("https://pkg.go.dev/sync/atomic"),ts=p(`<p><code>sync/atomic</code>\u5305\u63D0\u4F9B\u4E86\u4E00\u7CFB\u5217\u539F\u5B50\u76F8\u5173\u64CD\u4F5C</p><p><strong>\u7279\u70B9</strong></p><ul><li>\u539F\u5B50\u64CD\u4F5C\u662F\u4E0D\u5141\u8BB8\u4E2D\u65AD\u7684\uFF08<code>interrupt</code>\uFF09\uFF0C\u6240\u4EE5\u53EF\u4EE5\u5B9E\u73B0\u65E0\u9501\u5E76\u53D1\uFF08<code>lock-free</code>\uFF09</li><li>\u539F\u5B50\u64CD\u4F5C\u662F\u4E0D\u5141\u8BB8\u4E2D\u65AD\u7684\uFF08<code>interrupt</code>\uFF09\uFF0C\u6240\u4EE5\u5B83\u5FC5\u987B\u5F88\u5FEB\uFF0C\u6240\u4EE5\u63D0\u4F9B\u7684\u539F\u5B50\u65B9\u6CD5\u6570\u91CF\u5F88\u5C11</li><li>\u539F\u5B50\u64CD\u4F5C\u7531\u5E95\u5C42\u786C\u4EF6\u5B9E\u73B0\uFF0C<code>Mutex</code>\u662F\u7531\u64CD\u4F5C\u7CFB\u7EDF\u5B9E\u73B0\u7684\uFF0C\u6240\u4EE5\u539F\u5B50\u64CD\u4F5C\u6027\u80FD\u66F4\u597D</li></ul><h4 id="\u57FA\u672C\u6570\u636E\u7C7B\u578B-\u539F\u5B50\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#\u57FA\u672C\u6570\u636E\u7C7B\u578B-\u539F\u5B50\u64CD\u4F5C" aria-hidden="true">#</a> <strong>\u57FA\u672C\u6570\u636E\u7C7B\u578B-\u539F\u5B50\u64CD\u4F5C</strong></h4><table><thead><tr><th>\u5206\u7C7B</th><th>\u65B9\u6CD5</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td>\u52A0\u51CF\u6CD5</td><td>(1)<code>AddInt32(addr *int32, delta int32) (new int32)</code><br>(2)<code>AddInt64(addr *int64, delta int64) (new int64)</code><br>(3)<code>AddUint32(addr *uint32, delta uint32) (new uint32)</code><br>(4)<code>AddUint64(addr *uint64, delta uint64) (new uint64)</code><br>(5)<code>AddUintptr(addr *uintptr, delta uintptr) (new uintptr)</code></td><td>\uFF081\uFF09\u51CF\u6CD5\u9700\u8981\u6CE8\u610F\uFF1A<br>\u5BF9\u4E8E<code>Int</code>\u7C7B\u578B\uFF0C\u52A0\u4E00\u4E2A\u8D1F\u6570\u5373\u53EF<br>\u5BF9\u4E8E<code>Uint</code>\u7C7B\u578B\uFF0C\u4F7F\u7528\u4F4D\u8FD0\u7B97\u6765\u5F97\u5230\u8D1F\u6570<br>\uFF082\uFF09\u8FD9\u4E2A\u53EA\u652F\u63015\u79CD\u6570\u636E\u7C7B\u578B</td></tr><tr><td>\u4EA4\u6362</td><td>(1)<code>SwapInt32(addr *int32, new int32) (old int32)</code><br>(2)<code>SwapInt64(addr *int64, new int64) (old int64)</code><br>(3)<code>SwapUint32(addr *uint32, new uint32) (old uint32)</code><br>(4)<code>SwapUint64(addr *uint64, new uint64) (old uint64)</code><br>(5)<code>SwapUintptr(addr *uintptr, new uintptr) (old uintptr)</code><br>(6)<code>SwapPointer(addr *unsafe.Pointer, new unsafe.Pointer) (old unsafe.Pointer)</code></td><td>&quot;\u8D4B\u503C&quot;\u5E76\u8FD4\u56DE\u65E7\u503C</td></tr><tr><td>\u6BD4\u8F83\u5E76\u4EA4\u6362</td><td>(1)<code>CompareAndSwapInt32(addr *int32, old, new int32) (swapped bool)</code><br>(2)<code>CompareAndSwapInt64(addr *int64, old, new int64) (swapped bool)</code><br>(3)<code>CompareAndSwapUint32(addr *uint32, old, new uint32) (swapped bool)</code><br>(4)<code>CompareAndSwapUint64(addr *uint64, old, new uint64) (swapped bool)</code><br>(5)<code>CompareAndSwapUintptr(addr *uintptr, old, new uintptr) (swapped bool)</code><br>(6)<code>CompareAndSwapPointer(addr *unsafe.Pointer, old, new unsafe.Pointer) (swapped bool)</code></td><td>&quot;\u6BD4\u8F83\u5E76\u8D4B\u503C&quot;\u5E76\u8FD4\u56DE\u65E7\u503C</td></tr><tr><td>\u52A0\u8F7D</td><td>(1)<code>LoadInt32(addr *int32) (val int32)</code><br>(2)<code>LoadInt64(addr *int64) (val int64)</code><br>(3)<code>LoadUint32(addr *uint32) (val uint32)</code><br>(4)<code>LoadUint64(addr *uint64) (val uint64)</code><br>(5)<code>LoadUintptr(addr *uintptr) (val uintptr)</code><br>(6)<code>LoadPointer(addr *unsafe.Pointer) (val unsafe.Pointer)</code></td><td>&quot;\u8BFB\u53D6&quot;\u53D8\u91CF\u7684\u503C</td></tr><tr><td>\u5B58\u50A8</td><td>(1)<code>StoreInt32(addr *int32, val int32)</code><br>(2)<code>StoreInt64(addr *int64, val int64)</code><br>(3)<code>StoreUint32(addr *uint32, val uint32)</code><br>(4)<code>StoreUint64(addr *uint64, val uint64)</code><br>(5)<code>StoreUintptr(addr *uintptr, val uintptr)</code><br>(6)<code>StorePointer(addr *unsafe.Pointer, val unsafe.Pointer)</code></td><td>&quot;\u8D4B\u503C&quot;\u4E0D\u4F1A\u8FD4\u56DE\u65E7\u503C<br>\u8FD9\u4E2A\u548C<code>Swap</code>\u7CFB\u5217\u51FD\u6570\u5F88\u50CF</td></tr></tbody></table><p>\u793A\u4F8B\u4EE3\u7801</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;sync/atomic&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">Add</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u52A0\u6CD5</span>
	<span class="token keyword">var</span> x <span class="token builtin">int32</span> <span class="token operator">=</span> <span class="token number">100</span>
	<span class="token keyword">var</span> y <span class="token builtin">uint32</span> <span class="token operator">=</span> <span class="token number">1000</span>

	<span class="token comment">// \u56E0\u4E3Ax\u662F\u6709\u7B26\u53F7\u6574\u6570\uFF0C\u53EF\u4EE5\u51CF\u6CD5\u53EF\u4EE5\u5199\u6210\u52A0\u6CD5\uFF0C-1 -&gt; + -1</span>
	atomic<span class="token punctuation">.</span><span class="token function">AddInt32</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>x<span class="token punctuation">,</span> <span class="token function">int32</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// \u56E0\u4E3Ay\u662F\u65E0\u7B26\u53F7\u6574\u6570\uFF0C\u6240\u4EE5\u4E0D\u80FD\u4F7F\u7528uint32(-1)</span>
	<span class="token comment">// \u8FD9\u65F6\u5019\u53EF\u4EE5\u4F7F\u7528^\u4F5C\u4E3A\u4E00\u5143\u8FD0\u7B97\u7B26\u4F7F\u7528\uFF0C\u6309\u4F4D\u53D6\u53CD\uFF0C\u5F97\u5230\u7C7B\u4F3C-1\u7684\u6548\u679C</span>
	atomic<span class="token punctuation">.</span><span class="token function">AddUint32</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>y<span class="token punctuation">,</span> <span class="token operator">^</span><span class="token function">uint32</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u52A0\u51CF\u6CD5:\\n&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;x = %d\\n&quot;</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;y = %d\\n&quot;</span><span class="token punctuation">,</span> y<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">Swap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\u4EA4\u6362:\\n&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">var</span> x <span class="token builtin">int32</span> <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">100</span>
	<span class="token keyword">var</span> y <span class="token builtin">int32</span> <span class="token operator">=</span> <span class="token number">200</span>
	old <span class="token operator">:=</span> atomic<span class="token punctuation">.</span><span class="token function">SwapInt32</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span> <span class="token comment">// y\u503C\u4FDD\u6301\u4E0D\u53D8\uFF0Cx\u503C\u66F4\u65B0\u4E3Ay\u503C\uFF0Cold\u4E3Ax\u7684\u65E7\u503C</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;x = %d\\n&quot;</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;y = %d\\n&quot;</span><span class="token punctuation">,</span> y<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;old = %d\\n&quot;</span><span class="token punctuation">,</span> old<span class="token punctuation">)</span>	
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">CompareAndSwap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u5148\u6BD4\u8F83\uFF0C\u518D\u51B3\u5B9A\u662F\u5426\u8986\u76D6</span>
	<span class="token comment">// \u5982\u679Cx == y\uFF0C\u90A3\u4E48\u7528z\u8986\u76D6x\uFF0C\u5E76\u8FD4\u56DEtrue</span>
	<span class="token comment">// \u5982\u679Cx != y\uFF0C\u90A3\u4E48\u4EC0\u4E48\u90FD\u4E0D\u505A\uFF0C\u5E76\u8FD4\u56DEfalse</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\u6BD4\u8F83\u5E76\u4EA4\u6362:\\n&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">var</span> x <span class="token builtin">int32</span> <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">300</span>
	<span class="token keyword">var</span> y <span class="token builtin">int32</span> <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">300</span>
	<span class="token keyword">var</span> z <span class="token builtin">int32</span> <span class="token operator">=</span> <span class="token number">400</span>
	<span class="token keyword">if</span> atomic<span class="token punctuation">.</span><span class="token function">CompareAndSwapInt32</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> z<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u6BD4\u8F83\u5E76\u4EA4\u6362\u6210\u529F: %d %d %d\\n&quot;</span><span class="token punctuation">,</span> x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> z<span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u6BD4\u8F83\u5E76\u4EA4\u6362\u5931\u8D25: %d %d %d\\n&quot;</span><span class="token punctuation">,</span> x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> z<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">Load</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\u52A0\u8F7D:\\n&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">var</span> x <span class="token builtin">int32</span> <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">999</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;x = %d\\n&quot;</span><span class="token punctuation">,</span> atomic<span class="token punctuation">.</span><span class="token function">LoadInt32</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>x<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// -999</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">Store</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\\n\u5B58\u50A8:\\n&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">var</span> x <span class="token builtin">int32</span> <span class="token operator">=</span> <span class="token number">888</span>
	atomic<span class="token punctuation">.</span><span class="token function">StoreInt32</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>x<span class="token punctuation">,</span> <span class="token function">int32</span><span class="token punctuation">(</span><span class="token number">222</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;x = %d\\n&quot;</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span> <span class="token comment">// 222</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">Add</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">Swap</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">CompareAndSwap</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">Load</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">Store</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code>\u52A0\u51CF\u6CD5:
x <span class="token operator">=</span> <span class="token number">99</span>                      
y <span class="token operator">=</span> <span class="token number">999</span>                     
                            
\u4EA4\u6362:                       
x <span class="token operator">=</span> <span class="token number">200</span>                     
y <span class="token operator">=</span> <span class="token number">200</span>                     
old <span class="token operator">=</span> -100                  
                            
\u6BD4\u8F83\u5E76\u4EA4\u6362:                 
\u6BD4\u8F83\u5E76\u4EA4\u6362\u6210\u529F: <span class="token number">400</span> -300 <span class="token number">400</span>
                            
\u8F7D\u5165:                       
x <span class="token operator">=</span> -999                    
                            
\u5B58\u50A8:                       
x <span class="token operator">=</span> <span class="token number">222</span>
</code></pre></div><h4 id="\u4EFB\u610F\u6570\u636E\u7C7B\u578B-\u539F\u5B50\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#\u4EFB\u610F\u6570\u636E\u7C7B\u578B-\u539F\u5B50\u64CD\u4F5C" aria-hidden="true">#</a> \u4EFB\u610F\u6570\u636E\u7C7B\u578B-\u539F\u5B50\u64CD\u4F5C</h4><p>\u5982\u679C\u662F\u5176\u4ED6\u7C7B\u578B\u7684\u6570\u636E\uFF0C<code>atomic</code>\u4E3A\u6211\u4EEC\u63D0\u4F9B\u4E86<code>Value</code>\u7ED3\u6784\u4F53\u6765\u539F\u5B50\u64CD\u4F5C</p><p>\u6CE8\u610F\u4E8B\u9879</p><ul><li>\u9ED8\u8BA4\u4E3A<code>nil</code>\u503C</li><li>\u539F\u5B50\u503C\u5B58\u50A8\u7684\u7B2C\u4E00\u4E2A\u503C\uFF0C\u51B3\u5B9A\u4E86\u5B83\u4ECA\u540E\u80FD\u4E14\u53EA\u80FD\u5B58\u50A8\u54EA\u4E00\u4E2A\u7C7B\u578B\u7684\u503C</li><li>\u5207\u7247\u3001\u6620\u5C04\u7B49\u4E0D\u652F\u6301&quot;\u6BD4\u8F83\u5E76\u4EA4\u6362&quot;</li></ul><p>\u793A\u4F8B\u4EE3\u7801</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;sync/atomic&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u521D\u59CB\u5316</span>
	<span class="token keyword">var</span> v atomic<span class="token punctuation">.</span>Value

	<span class="token comment">// \u5B58\u50A8\u4EFB\u610F\u6570\u636E\u7C7B\u578B</span>
	v<span class="token punctuation">.</span><span class="token function">Store</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span>

	<span class="token comment">// \u52A0\u8F7D\u4EFB\u610F\u6570\u636E\u7C7B\u578B</span>
	x <span class="token operator">:=</span> v<span class="token punctuation">.</span><span class="token function">Load</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;x\u7684\u6570\u636E\u7C7B\u578B: %T | x\u7684\u503C: %#v\\n&quot;</span><span class="token punctuation">,</span> x<span class="token punctuation">,</span> x<span class="token punctuation">)</span>

	<span class="token comment">// \u4EA4\u6362</span>
	v<span class="token punctuation">.</span><span class="token function">Swap</span><span class="token punctuation">(</span><span class="token string">&quot;world!&quot;</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6BD4\u8F83\u5E76\u4EA4\u6362</span>
	<span class="token keyword">if</span> v<span class="token punctuation">.</span><span class="token function">CompareAndSwap</span><span class="token punctuation">(</span><span class="token string">&quot;world!&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;hello world!&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u6BD4\u8F83\u5E76\u4EA4\u6362\u6210\u529F: %s\\n&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">Load</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u6BD4\u8F83\u5E76\u4EA4\u6362\u5931\u8D25: %s\\n&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">Load</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h4 id="\u539F\u5B50\u64CD\u4F5C\u4E3E\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u539F\u5B50\u64CD\u4F5C\u4E3E\u4F8B" aria-hidden="true">#</a> \u539F\u5B50\u64CD\u4F5C\u4E3E\u4F8B</h4><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
	<span class="token string">&quot;sync/atomic&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> data <span class="token builtin">int64</span> <span class="token operator">=</span> <span class="token number">0</span>
	<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup

	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10000</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
		<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">//data++ // \u975E\u539F\u5B50\u64CD\u4F5C\uFF0C\u8FD9\u4F1A\u5F15\u8D77\u6570\u636E\u7ADE\u4E89</span>
			atomic<span class="token punctuation">.</span><span class="token function">AddInt64</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>data<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// \u539F\u5B50\u64CD\u4F5C</span>
			wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="io" tabindex="-1"><a class="header-anchor" href="#io" aria-hidden="true">#</a> IO</h2><h3 id="os\u5305-\u57FA\u7840\u6587\u4EF6\u8BFB\u5199" tabindex="-1"><a class="header-anchor" href="#os\u5305-\u57FA\u7840\u6587\u4EF6\u8BFB\u5199" aria-hidden="true">#</a> <code>os</code>\u5305\uFF1A\u57FA\u7840\u6587\u4EF6\u8BFB\u5199</h3>`,19),ps=s("\u5B98\u65B9\u6587\u6863\uFF1A"),os={href:"https://pkg.go.dev/os",target:"_blank",rel:"noopener noreferrer"},cs=s("https://pkg.go.dev/os"),es=p(`<h4 id="\u6253\u5F00\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u6253\u5F00\u6587\u4EF6" aria-hidden="true">#</a> \u6253\u5F00\u6587\u4EF6</h4><p>\u65B9\u5F0F\u4E00\uFF1A<code>OpenFile</code></p><div class="language-go ext-go"><pre class="language-go"><code><span class="token function">OpenFile</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">,</span> flag <span class="token builtin">int</span><span class="token punctuation">,</span> perm FileMode<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>File<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
</code></pre></div><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u8BE6\u7EC6\u4ECB\u7ECD</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token comment">// flag\u9009\u9879</span>
<span class="token comment">//	(1)\u6253\u5F00\u6A21\u5F0F\uFF08\u5FC5\u987B\u6307\u5B9A\u5176\u4E00\uFF09</span>
<span class="token comment">//		os.O_RDONLY         \u4EE5\u53EA\u8BFB\u65B9\u5F0F\u6253\u5F00\u6587\u4EF6       \u5982\u679C\u6587\u4EF6\u4E0D\u5B58\u5728\u5219\u62A5\u9519</span>
<span class="token comment">//		os.O_WRONLY         \u4EE5\u53EA\u5199\u65B9\u5F0F\u6253\u5F00          \u5982\u679C\u6587\u4EF6\u4E0D\u5B58\u5728\u5219\u62A5\u9519</span>
<span class="token comment">//		os.O_RDWR           \u4EE5\u8BFB\u5199\u65B9\u5F0F\u6253\u5F00\u6587\u4EF6       \u5982\u679C\u6587\u4EF6\u4E0D\u5B58\u5728\u5219\u62A5\u9519</span>
<span class="token comment">//	(2)\u8F85\u52A9\u63A7\u5236\u884C\u4E3A</span>
<span class="token comment">//		os.O_APPEND         \u8FFD\u52A0\u65B9\u5F0F\u5199\u5165</span>
<span class="token comment">//		os.O_CREATE         \u6587\u4EF6\u4E0D\u5B58\u5728\u5219\u521B\u5EFA\u6587\u4EF6\uFF1BWindows\u7CFB\u7EDF\u8BE5\u5C5E\u6027\u4F1A\u81EA\u5E26\u5199\u5C5E\u6027                                          </span>
<span class="token comment">//		os.O_EXCL           \u6587\u4EF6\u5FC5\u987B\u4E0D\u5B58\u5728\uFF1B\u4F7F\u7528\u573A\u666F\u6BD4\u5982\uFF1A\u53EA\u5141\u8BB8\u8FDB\u7A0B\u6253\u5F00\u81EA\u5DF1\u7684\u6587\u4EF6 \u6216 \u591A\u8FDB\u7A0B\u8FD0\u884C\u65F6\u9000\u51FA\uFF0C\u53EA\u5141\u8BB8\u5355\u8FDB\u7A0B\u8FD0\u884C</span>
<span class="token comment">//		os.O_TRUNC          \u6587\u4EF6\u5B58\u5728\u5219\u622A\u65AD\uFF08\u6E05\u7A7A\u5185\u5BB9\uFF09</span>

<span class="token comment">// \u5E38\u7528flag\u7EC4\u5408\u9009\u9879</span>
<span class="token comment">//	\u8BFB\u6587\u4EF6</span>
<span class="token comment">//		os.O_RDONLY                             \u8BFB\u6587\u4EF6\uFF0C\u6587\u4EF6\u4E0D\u5B58\u5728\u5219\u62A5\u9519</span>
<span class="token comment">//	\u5199\u6587\u4EF6</span>
<span class="token comment">//		os.O_RDWR | os.O_CREATE                 \u5199\u6587\u4EF6\uFF0C\u5F53\u6587\u4EF6\u4E0D\u5B58\u5728\u65F6\u81EA\u52A8\u521B\u5EFA\u6587\u4EF6</span>
<span class="token comment">//		os.O_RDWR | os.O_CREATE | os.O_APPEND   \u5199\u6587\u4EF6\uFF0C\u5F53\u6587\u4EF6\u4E0D\u5B58\u5728\u65F6\u81EA\u52A8\u521B\u5EFA\u6587\u4EF6\uFF0C\u5F53\u6587\u4EF6\u5B58\u5728\u65F6\u8FFD\u52A0\u5185\u5BB9</span>
<span class="token comment">//		os.O_RDWR | os.O_CREATE | os.O_TRUNC    \u5199\u6587\u4EF6\uFF0C\u5F53\u6587\u4EF6\u4E0D\u5B58\u5728\u65F6\u81EA\u52A8\u521B\u5EFA\u6587\u4EF6\uFF0C\u5F53\u6587\u4EF6\u5B58\u5728\u65F6\u6E05\u7A7A\u6587\u4EF6\u5185\u5BB9</span>

<span class="token comment">// perm\u9009\u9879</span>
<span class="token comment">// 	\u6587\u4EF6\u6743\u9650</span>
<span class="token comment">//	(1)\u53EA\u6709\u5728\u521B\u5EFA\u6587\u4EF6\u65F6\u624D\u6709\u7528\uFF0C\u5F53\u4E0D\u9700\u8981\u521B\u5EFA\u6587\u4EF6\u65F6\u53EF\u4EE5\u8BBE\u7F6E\u4E3A0</span>
<span class="token comment">//	(2)\u5185\u7F6E\u5E38\u91CFos.ModePerm = 0777</span>
</code></pre></div></details><p>\u65B9\u5F0F\u4E8C\uFF1A<code>Open</code></p><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Open</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>File<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token function">OpenFile</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> O_RDONLY<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u6838\u5FC3\u4E3AOpenFile\uFF0C\u4EE5\u53EA\u8BFB\u6A21\u5F0F\u6253\u5F00\u6587\u4EF6\uFF0C\u5F53\u6587\u4EF6\u4E0D\u5B58\u5728\u65F6\u4F1A\u62A5\u9519</span>
</code></pre></div><p>\u65B9\u5F0F\u4E09\uFF1A<code>Create</code></p><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Create</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>File<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token function">OpenFile</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> O_RDWR<span class="token operator">|</span>O_CREATE<span class="token operator">|</span>O_TRUNC<span class="token punctuation">,</span> <span class="token number">0666</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u6838\u5FC3\u4E3AOpenFile\uFF0C\u5F53\u6587\u4EF6\u4E0D\u5B58\u5728\u65F6\u4F1A\u521B\u5EFA\uFF0C\u5F53\u6587\u4EF6\u5B58\u5728\u65F6\u4F1A\u6E05\u7A7A\u6587\u4EF6\u5185\u5BB9</span>
<span class="token comment">// \u4F7F\u7528\u65F6\u591A\u52A0\u6CE8\u610F\uFF0C\u4E0D\u8981\u8BEF\u6E05\u7A7A\u4E86\u6587\u4EF6\u5185\u5BB9!!!</span>
</code></pre></div><h4 id="\u5E38\u89C4\u64CD\u4F5C\u51FD\u6570" tabindex="-1"><a class="header-anchor" href="#\u5E38\u89C4\u64CD\u4F5C\u51FD\u6570" aria-hidden="true">#</a> \u5E38\u89C4\u64CD\u4F5C\u51FD\u6570</h4><table><thead><tr><th>\u5206\u7C7B</th><th>\u51FD\u6570</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td>\u521B\u5EFA\u4E34\u65F6\u6587\u4EF6\u6216\u76EE\u5F55</td><td><code>CreateTemp(dir, pattern string) (*File, error)</code></td><td>\u521B\u5EFA\u4E34\u65F6\u6587\u4EF6\uFF0C\u8FD4\u56DE\u4E34\u65F6\u6587\u4EF6\u7684\u8DEF\u5F84<br>\uFF081\uFF09<code>dir</code>\u6307\u5B9A\u5728\u54EA\u4E2A\u76EE\u5F55\u4E0B\u521B\u5EFA\u4E34\u65F6\u76EE\u5F55\uFF0C\u4E3A\u7A7A\u4F1A\u4F7F\u7528\u7528\u6237\u9ED8\u8BA4\u4E34\u65F6\u76EE\u5F55<br>\uFF082\uFF09<code>pattern </code>\u6307\u5B9A\u6587\u4EF6\u540D\u524D\u7F00\uFF0C\u5982\u679C\u5305\u542B<code>*</code>\uFF0C\u90A3\u4E48\u4EE3\u6307\u6574\u4E2A\u6587\u4EF6\u540D\uFF0C<br><code>*</code>\u88AB\u66FF\u6362\u4E3A\u968F\u673A\u5B57\u7B26\u4E32</td></tr><tr><td></td><td><code>MkdirTemp(dir, pattern string) (string, error)</code></td><td>\u540C\u4E0A\uFF0C\u53EA\u4E0D\u8FC7\u521B\u5EFA\u7684\u662F\u4E34\u65F6\u76EE\u5F55</td></tr><tr><td>\u521B\u5EFA\u76EE\u5F55</td><td><code>Mkdir(name string, perm FileMode) error</code></td><td>\u521B\u5EFA\u76EE\u5F55\uFF1B<br>\uFF081\uFF09\u4E0D\u652F\u6301\u521B\u5EFA\u591A\u7EA7\u76EE\u5F55<br>\uFF082\uFF09\u76EE\u5F55\u5B58\u5728\u65F6\u4F1A\u62A5\u9519</td></tr><tr><td></td><td><code>MkdirAll(path string, perm FileMode) error</code></td><td>\u521B\u5EFA\u76EE\u5F55<br>\uFF081\uFF09\u652F\u6301\u521B\u5EFA\u591A\u7EA7\u76EE\u5F55<br>\uFF082\uFF09\u76EE\u5F55\u5B58\u5728\u65F6\u4F1A\u62A5\u9519</td></tr><tr><td>\u5220\u9664\u6587\u4EF6\u6216\u76EE\u5F55</td><td><code>Remove(name string) error</code></td><td>\u5220\u9664\u6587\u4EF6\u6216\u7A7A\u76EE\u5F55\uFF0C\u4E0D\u5B58\u5728\u65F6\u4F1A\u62A5\u9519</td></tr><tr><td></td><td><code>RemoveAll(path string) error</code></td><td>\u5220\u9664\u6587\u4EF6\u6216\u76EE\u5F55\uFF0C\u652F\u6301\u975E\u7A7A\u76EE\u5F55\uFF0C\u4E0D\u5B58\u5728\u65F6\u4F1A\u62A5\u9519</td></tr><tr><td>\u91CD\u547D\u540D</td><td><code>Rename(oldpath, newpath string) error</code></td><td>\u6587\u4EF6\u6216\u76EE\u5F55\u91CD\u547D\u540D</td></tr><tr><td>\u6587\u4EF6\u8BE6\u60C5</td><td><code>Stat(name string) (FileInfo, error)</code></td><td>\u83B7\u53D6\u6587\u4EF6\u8BE6\u60C5</td></tr><tr><td></td><td><code>Lstat(name string) (FileInfo, error)</code></td><td>\u540C\u4E0A\uFF0C\u533A\u522B\u662F\u5BF9\u4E8E\u94FE\u63A5\u6587\u4EF6\uFF0C<code>Stat</code>\u5177\u6709\u7A7F\u900F\u80FD\u529B\u800C<code>Lstat</code>\u6CA1\u6709</td></tr><tr><td>\u5224\u65AD\u662F\u54EA\u79CD\u9519\u8BEF</td><td><code>IsExist(err error) bool</code></td><td>\u662F\u5426\u662F\u6587\u4EF6\u5B58\u5728\u9519\u8BEF</td></tr><tr><td></td><td><code>IsNotExist(err error) bool</code></td><td>\u662F\u5426\u662F\u6587\u4EF6\u4E0D\u5B58\u5728\u9519\u8BEF</td></tr><tr><td></td><td><code>IsPermission(err error) bool</code></td><td>\u662F\u5426\u662F\u6743\u9650\u9519\u8BEF</td></tr><tr><td></td><td><code>IsTimeout(err error) bool</code></td><td>\u662F\u5426\u662F\u8D85\u65F6\u9519\u8BEF</td></tr></tbody></table><p>\u5224\u65AD\u6587\u4EF6\u6216\u76EE\u5F55\u662F\u5426\u5B58\u5728</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;os&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// \u5224\u65AD\u6587\u4EF6\u6216\u76EE\u5F55\u662F\u5426\u5B58\u5728</span>
<span class="token keyword">func</span> <span class="token function">PathExists</span><span class="token punctuation">(</span>path <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">bool</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Stat</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> os<span class="token punctuation">.</span><span class="token function">IsNotExist</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">,</span> err
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> path <span class="token operator">:=</span> <span class="token keyword">range</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;main.go&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;go.mod&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;test.log&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;C:\\\\Windows&quot;</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> exists<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">PathExists</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%s exist: %t\\n&quot;</span><span class="token punctuation">,</span> path<span class="token punctuation">,</span> exists<span class="token punctuation">)</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%s exist: %t\\n&quot;</span><span class="token punctuation">,</span> path<span class="token punctuation">,</span> <span class="token string">&quot;unknown&quot;</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code>main.go exist: <span class="token boolean">true</span>
go.mod exist: <span class="token boolean">true</span>    
test.log exist: <span class="token boolean">false</span> 
C:<span class="token punctuation">\\</span>Windows exist: <span class="token boolean">true</span>
</code></pre></div><h4 id="\u5199\u5165\u6570\u636E" tabindex="-1"><a class="header-anchor" href="#\u5199\u5165\u6570\u636E" aria-hidden="true">#</a> \u5199\u5165\u6570\u636E</h4><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;os&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u6253\u5F00\u6587\u4EF6\uFF0C\u6587\u4EF6\u5B58\u5728\u5219\u6E05\u7A7A\u5185\u5BB9\uFF0C\u4E0D\u5B58\u5728\u5219\u521B\u5EFA</span>
	f<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">OpenFile</span><span class="token punctuation">(</span><span class="token string">&quot;test.log&quot;</span><span class="token punctuation">,</span> os<span class="token punctuation">.</span>O_RDWR<span class="token operator">|</span>os<span class="token punctuation">.</span>O_CREATE<span class="token operator">|</span>os<span class="token punctuation">.</span>O_TRUNC<span class="token punctuation">,</span> <span class="token number">0777</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;Open file error: %s\\n&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> f<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u5199\u5165\u5185\u5BB9 - \u5B57\u8282</span>
	byteLine <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">&quot;\u4EBA\u4E4B\u521D\uFF0C\u6027\u672C\u5584\u3002\u6027\u76F8\u8FD1\uFF0C\u4E60\u76F8\u8FDC\u3002&quot;</span><span class="token punctuation">)</span>
	byteLine <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>byteLine<span class="token punctuation">,</span> <span class="token char">&#39;\\n&#39;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> f<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>byteLine<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;Write error: %s&quot;</span><span class="token punctuation">,</span> byteLine<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u5199\u5165\u5185\u5BB9 - \u5B57\u7B26\u4E32</span>
	stringLine <span class="token operator">:=</span> <span class="token string">&quot;\u82DF\u4E0D\u6559\uFF0C\u6027\u4E43\u8FC1\u3002\u6559\u4E4B\u9053\uFF0C\u8D35\u4EE5\u4E13\u3002&quot;</span>
	stringLine <span class="token operator">=</span> stringLine <span class="token operator">+</span> <span class="token string">&quot;\\n&quot;</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> f<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>stringLine<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;Write error: %s&quot;</span><span class="token punctuation">,</span> stringLine<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u83B7\u53D6\u6587\u4EF6\u6307\u9488\u4F4D\u7F6E (\u4ECE\u5F53\u524D\u4F4D\u7F6E\u5F00\u59CB\uFF0C\u504F\u79FB\u4E3A0\u7684\u4F4D\u7F6E)</span>
	currentSeek<span class="token punctuation">,</span> err <span class="token operator">:=</span> f<span class="token punctuation">.</span><span class="token function">Seek</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> io<span class="token punctuation">.</span>SeekCurrent<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;Get file current seek error: %s\\n&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u4F7F\u7528\u6307\u9488\u5199\u5165\uFF08\u5199\u5165\u7684\u957F\u5EA6\u4F1A\u5C06\u6307\u9488\u540E\u9762\u7684\u5185\u5BB9\u8986\u76D6\uFF09</span>
	<span class="token comment">// \u8FD9\u91CC\u6211\u4EEC\u4F7F\u7528\u201D\u65B0\u201C\u66FF\u6362\u6389\u201D\u8D35\u4EE5\u4E13\u3002\u201C\u4E2D\u7684\u201D\u8D35\u201C,\u601D\u8DEF\u5C31\u662F\u6587\u4EF6\u6307\u9488\u79FB\u52A8\u5230\u201D\u8D35\u201C\u5B57\u4E0A\uFF0C\u7136\u540E\u66FF\u6362\u5373\u53EF</span>
	<span class="token comment">// \u504F\u79FB\u91CF\u8BA1\u7B97\uFF1A1(&#39;\\n&#39;) + 12(&quot;\u8D35\u65B0\u4E13\u3002&quot;\uFF0C\u4E00\u4E2A\u6C49\u5B573\u4E2A\u5B57\u8282\uFF0C\u6CE8\u610F\u8FD9\u91CC\u7684\u53E5\u53F7\u662F\u4E2D\u6587\u7684\uFF0C\u4E5F\u8BA1\u7B97\u5728\u6C49\u5B57\u91CC\u9762) = 13</span>
	seekRune <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">&quot;\u65B0&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> f<span class="token punctuation">.</span><span class="token function">WriteAt</span><span class="token punctuation">(</span>seekRune<span class="token punctuation">,</span> currentSeek<span class="token operator">-</span><span class="token number">13</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;Write error: %s&quot;</span><span class="token punctuation">,</span> byteLine<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h4 id="\u8BFB\u53D6\u6570\u636E" tabindex="-1"><a class="header-anchor" href="#\u8BFB\u53D6\u6570\u636E" aria-hidden="true">#</a> \u8BFB\u53D6\u6570\u636E</h4><p><strong>\u6309\u5B57\u8282\u4ECE\u6587\u4EF6\u5F00\u59CB\u8BFB\u53D6\u6570\u636E</strong><code>Read(b []byte) (n int, err error)</code></p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;os&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">Read</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u6253\u5F00\u6587\u4EF6</span>
	fileName <span class="token operator">:=</span> <span class="token string">&quot;test.log&quot;</span>
	f<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;\u6587\u4EF6\u4E0D\u5B58\u5728: %s\\n&quot;</span><span class="token punctuation">,</span> fileName<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> f<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u5FAA\u73AF\u8BFB\u53D6\u6587\u4EF6</span>
	buffer <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">1024</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		n<span class="token punctuation">,</span> err <span class="token operator">:=</span> f<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span>

		<span class="token comment">// \u5904\u7406\u6570\u636E</span>
		<span class="token keyword">if</span> n <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token punctuation">{</span>
            fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%s&quot;</span><span class="token punctuation">,</span> buffer<span class="token punctuation">[</span><span class="token punctuation">:</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span>	<span class="token comment">// \u6CE8\u610F\u8FD9\u91CC[:n]</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// \u5224\u65AD\u662F\u5426\u53EF\u4EE5\u8BFB\u53D6\u4E0B\u4E00\u884C</span>
		<span class="token keyword">if</span> err <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">continue</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// \u6587\u4EF6\u8BFB\u53D6\u5B8C\u6210</span>
		<span class="token keyword">if</span> err <span class="token operator">==</span> io<span class="token punctuation">.</span>EOF <span class="token punctuation">{</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// \u6587\u4EF6\u8BFB\u53D6\u5931\u8D25</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25: %s:%s\\n&quot;</span><span class="token punctuation">,</span> fileName<span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">Read</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p><strong>\u6309\u5B57\u8282\u4ECE\u6587\u4EF6\u4EFB\u610F\u4F4D\u7F6E\u8BFB\u53D6\u6570\u636E</strong></p><p><code>ReadAt(b []byte, off int64) (n int, err error)</code></p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;os&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">ReadAt</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u6253\u5F00\u6587\u4EF6</span>
	fileName <span class="token operator">:=</span> <span class="token string">&quot;test.log&quot;</span>
	f<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;\u6587\u4EF6\u4E0D\u5B58\u5728: %s\\n&quot;</span><span class="token punctuation">,</span> fileName<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> f<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u83B7\u53D6\u6587\u4EF6\u6307\u9488(\u672B\u5C3E)</span>
	seekEnd<span class="token punctuation">,</span> err <span class="token operator">:=</span> f<span class="token punctuation">.</span><span class="token function">Seek</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> io<span class="token punctuation">.</span>SeekEnd<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;File seek error: %s\\n&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// ReadAt\u8BFB\u53D6</span>
	buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span>
	n<span class="token punctuation">,</span> err <span class="token operator">:=</span> f<span class="token punctuation">.</span><span class="token function">ReadAt</span><span class="token punctuation">(</span>buf<span class="token punctuation">,</span> seekEnd<span class="token operator">-</span><span class="token number">4</span><span class="token punctuation">)</span> <span class="token comment">// \u8BFB\u53D6\u6587\u4EF6\u672B\u5C3E\u76844\u4E2A\u5B57\u8282\uFF0C\u6362\u884C\u7B261\u4E2A\u5B57\u8282\uFF0C\u4E2D\u65871\u4E2A\u5B57\u8282</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;File readat error: %s\\n&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span>buf<span class="token punctuation">[</span><span class="token punctuation">:</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">ReadAt</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h4 id="\u8BFB\u53D6\u4E2D\u6587\u4E71\u7801\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#\u8BFB\u53D6\u4E2D\u6587\u4E71\u7801\u95EE\u9898" aria-hidden="true">#</a> \u8BFB\u53D6\u4E2D\u6587\u4E71\u7801\u95EE\u9898</h4><p>\u4E00\u4E2A\u4E2D\u6587\u53603\u4E2A\u5B57\u8282\uFF0C\u5982\u679C\u53EA\u662F\u7B80\u5355\u7684\u4F7F\u7528<code>Read</code>\u6309\u5B57\u8282\u8BFB\u53D6\u6587\u4EF6\u7684\u8BDD\uFF0C\u6709\u53EF\u80FD\u4F1A\u9047\u5230\u4E2D\u6587\u4E71\u7801\u95EE\u9898</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;bufio&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;os&quot;</span>
	<span class="token string">&quot;unicode/utf8&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">WriteFile</span><span class="token punctuation">(</span>fileName <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u751F\u6210\u6570\u636E</span>
	data <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">170</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		data <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">&quot;\u4E2D&quot;</span><span class="token punctuation">)</span><span class="token operator">...</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	data <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">&quot;\u56FD&quot;</span><span class="token punctuation">)</span><span class="token operator">...</span><span class="token punctuation">)</span>

	<span class="token comment">// \u5199\u5165\u6587\u4EF6</span>
	err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">WriteFile</span><span class="token punctuation">(</span>fileName<span class="token punctuation">,</span> data<span class="token punctuation">,</span> os<span class="token punctuation">.</span>ModePerm<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;\u5199\u5165\u6587\u4EF6\u5931\u8D25: %s\\n&quot;</span><span class="token punctuation">,</span> fileName<span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u5199\u5165\u6587\u4EF6\u6210\u529F: %s: %d bytes\\n&quot;</span><span class="token punctuation">,</span> fileName<span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">ReadByte</span><span class="token punctuation">(</span>fileName <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u6253\u5F00\u6587\u4EF6</span>
	f<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;\u6253\u5F00\u6587\u4EF6\u5931\u8D25: %s\\n&quot;</span><span class="token punctuation">,</span> fileName<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> f<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u8BFB\u53D6\u6570\u636E</span>
	buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">512</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		n<span class="token punctuation">,</span> err <span class="token operator">:=</span> f<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> err <span class="token operator">==</span> io<span class="token punctuation">.</span>EOF <span class="token punctuation">{</span>
				<span class="token keyword">break</span>
			<span class="token punctuation">}</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;\u8BFB\u53D6\u6587\u4EF6\u5931\u8D25: %s: %s \\n&quot;</span><span class="token punctuation">,</span> fileName<span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u8BFB\u53D6\u6587\u4EF6\u6210\u529F: %s: %d bytes\\n&quot;</span><span class="token punctuation">,</span> fileName<span class="token punctuation">,</span> n<span class="token punctuation">)</span>

		<span class="token comment">// \u663E\u793A\u6570\u636E,\u6700\u540E\u4E00\u4E2A\u4E2D\u6587\u663E\u793A\u4E71\u7801</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u663E\u793A\u6587\u4EF6\u5185\u5BB9: %s\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>buf<span class="token punctuation">[</span><span class="token punctuation">:</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

		<span class="token comment">// \u68C0\u6D4B\u5207\u7247[]byte\u662F\u5426\u5305\u542B\u5B8C\u6574\u4E14\u5408\u6CD5\u7684UTF-8\u7F16\u7801\u5E8F\u5217\uFF08\u4E0D\u80FD\u6709\u4E71\u7801\uFF09</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u68C0\u6D4B\u5B57\u8282\u5207\u7247\u662F\u5426\u662F\u5B8C\u6574\u4E14\u5408\u6CD5\u7684UTF-8\u7F16\u7801\u5E8F\u5217: %t\\n&quot;</span><span class="token punctuation">,</span> utf8<span class="token punctuation">.</span><span class="token function">Valid</span><span class="token punctuation">(</span>buf<span class="token punctuation">[</span><span class="token punctuation">:</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">ReadAllByte</span><span class="token punctuation">(</span>fileName <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	data<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">ReadFile</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;\u8BFB\u53D6\u6587\u4EF6\u5931\u8D25: %s: %s \\n&quot;</span><span class="token punctuation">,</span> fileName<span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u8BFB\u53D6\u6587\u4EF6\u6210\u529F: %s: %d bytes\\n&quot;</span><span class="token punctuation">,</span> fileName<span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u663E\u793A\u6587\u4EF6\u5185\u5BB9: %s\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">ReadByRune</span><span class="token punctuation">(</span>fileName <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u6253\u5F00\u6587\u4EF6</span>
	f<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;\u6253\u5F00\u6587\u4EF6\u5931\u8D25: %s\\n&quot;</span><span class="token punctuation">,</span> fileName<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> f<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u8BFB\u53D6\u6570\u636E</span>
	reader <span class="token operator">:=</span> bufio<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span>
	data <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">rune</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		r<span class="token punctuation">,</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> reader<span class="token punctuation">.</span><span class="token function">ReadRune</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> err <span class="token operator">==</span> io<span class="token punctuation">.</span>EOF <span class="token punctuation">{</span>
				<span class="token keyword">break</span>
			<span class="token punctuation">}</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;\u8BFB\u53D6\u6587\u4EF6\u5931\u8D25: %s: %s \\n&quot;</span><span class="token punctuation">,</span> fileName<span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token comment">//log.Printf(&quot;\u8BFB\u53D6\u6587\u4EF6\u6210\u529F: %s: %d bytes\\n&quot;, fileName, size)</span>
		data <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> r<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// \u663E\u793A\u6570\u636E</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u663E\u793A\u6587\u4EF6\u5185\u5BB9: %s\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">ReadByteBySeek</span><span class="token punctuation">(</span>fileName <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u6253\u5F00\u6587\u4EF6</span>
	f<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;\u6253\u5F00\u6587\u4EF6\u5931\u8D25: %s\\n&quot;</span><span class="token punctuation">,</span> fileName<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> f<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u8BFB\u53D6\u6570\u636E</span>
	<span class="token keyword">var</span> bufsize <span class="token builtin">int64</span> <span class="token operator">=</span> <span class="token number">512</span>
	oldSize <span class="token operator">:=</span> bufsize
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		<span class="token comment">// \u8BFB\u53D6\u6570\u636E</span>
		buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> bufsize<span class="token punctuation">)</span>
		n<span class="token punctuation">,</span> err <span class="token operator">:=</span> f<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> err <span class="token operator">==</span> io<span class="token punctuation">.</span>EOF <span class="token punctuation">{</span>
				<span class="token keyword">break</span>
			<span class="token punctuation">}</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;\u8BFB\u53D6\u6587\u4EF6\u5931\u8D25: %s: %s \\n&quot;</span><span class="token punctuation">,</span> fileName<span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// \u975E\u5B8C\u6574\u7684UTF8\u5E8F\u5217\u5904\u7406</span>
		<span class="token keyword">if</span> <span class="token operator">!</span>utf8<span class="token punctuation">.</span><span class="token function">Valid</span><span class="token punctuation">(</span>buf<span class="token punctuation">[</span><span class="token punctuation">:</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">// \u6307\u9488\u56DE\u9000</span>
			<span class="token keyword">if</span> ret<span class="token punctuation">,</span> err <span class="token operator">:=</span> f<span class="token punctuation">.</span><span class="token function">Seek</span><span class="token punctuation">(</span><span class="token function">int64</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token operator">*</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> io<span class="token punctuation">.</span>SeekCurrent<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;\u8BFB\u53D6\u6587\u4EF6\u5931\u8D25: %s: %s %s \\n&quot;</span><span class="token punctuation">,</span> fileName<span class="token punctuation">,</span> err<span class="token punctuation">,</span> ret<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			<span class="token comment">// buf\u5B57\u8282\u6570+1</span>
			bufsize<span class="token operator">++</span>

			<span class="token keyword">continue</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// \u5B8C\u6574\u7684UTF8\u5E8F\u5217\u5904\u7406</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u8BFB\u53D6\u6587\u4EF6\u6210\u529F: %s: %d bytes\\n&quot;</span><span class="token punctuation">,</span> fileName<span class="token punctuation">,</span> n<span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u663E\u793A\u6587\u4EF6\u5185\u5BB9: %s\\n&quot;</span><span class="token punctuation">,</span> buf<span class="token punctuation">[</span><span class="token punctuation">:</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span>
		bufsize <span class="token operator">=</span> oldSize
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">ReadByteNoSeek</span><span class="token punctuation">(</span>fileName <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u6253\u5F00\u6587\u4EF6</span>
	f<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;\u6253\u5F00\u6587\u4EF6\u5931\u8D25: %s\\n&quot;</span><span class="token punctuation">,</span> fileName<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> f<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u8BFB\u53D6\u6570\u636E</span>
	lastLeft <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token comment">// \u4E0A\u6B21\u8BFB\u53D6\u7559\u4E0B\u6765\u7684\u4E0D\u5B8C\u6574\u7684\u5B57\u8282\u5207\u7247</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		<span class="token comment">// \u8BFB\u53D6\u6570\u636E</span>
		buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">300</span><span class="token punctuation">)</span>
		n<span class="token punctuation">,</span> err <span class="token operator">:=</span> f<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> err <span class="token operator">==</span> io<span class="token punctuation">.</span>EOF <span class="token punctuation">{</span>
				<span class="token keyword">break</span>
			<span class="token punctuation">}</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;\u8BFB\u53D6\u6587\u4EF6\u5931\u8D25: %s: %s \\n&quot;</span><span class="token punctuation">,</span> fileName<span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// \u4E0E\u4E0A\u6B21\u8BFB\u53D6\u9057\u7559\u5B57\u8282\u5408\u5E76</span>
		buf <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>lastLeft<span class="token punctuation">,</span> buf<span class="token operator">...</span><span class="token punctuation">)</span>
		n <span class="token operator">+=</span> <span class="token function">len</span><span class="token punctuation">(</span>lastLeft<span class="token punctuation">)</span>
		lastLeft <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token comment">// \u91CD\u65B0\u521D\u59CB\u5316</span>

		<span class="token comment">// \u68C0\u67E5\u5E8F\u5217\u5B8C\u6574\u6027</span>
		<span class="token keyword">for</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> utf8<span class="token punctuation">.</span><span class="token function">Valid</span><span class="token punctuation">(</span>buf<span class="token punctuation">[</span><span class="token punctuation">:</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token keyword">break</span>
			<span class="token punctuation">}</span>
			lastByte <span class="token operator">:=</span> buf<span class="token punctuation">[</span>n<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
			lastLeft <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">{</span>lastByte<span class="token punctuation">}</span><span class="token punctuation">,</span> lastLeft<span class="token operator">...</span><span class="token punctuation">)</span>
			n<span class="token operator">--</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// \u5B8C\u6574\u7684UTF8\u5E8F\u5217\u5904\u7406</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u8BFB\u53D6\u6587\u4EF6\u6210\u529F: %s: %d bytes\\n&quot;</span><span class="token punctuation">,</span> fileName<span class="token punctuation">,</span> n<span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u663E\u793A\u6587\u4EF6\u5185\u5BB9: %s\\n&quot;</span><span class="token punctuation">,</span> buf<span class="token punctuation">[</span><span class="token punctuation">:</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fileName <span class="token operator">:=</span> <span class="token string">&quot;test.log&quot;</span>

	<span class="token comment">// \u5199\u6570\u636E</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;------------------ \u5199\u5165\u6570\u636E ---------------------&quot;</span><span class="token punctuation">)</span>
	<span class="token function">WriteFile</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span>

	<span class="token comment">// \u6309\u5B57\u8282\u8BFB\u6570\u636E(\u4F1A\u8BFB\u5230\u4E71\u7801)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\\n------------------ \u6309\u5B57\u8282\u8BFB\u6570\u636E(\u4F1A\u8BFB\u5230\u4E71\u7801) ---------------------&quot;</span><span class="token punctuation">)</span>
	<span class="token function">ReadByte</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span>

	<span class="token comment">// \u89E3\u51B3\u65B9\u68481\uFF1A\u4E00\u6B21\u6027\u5168\u90E8\u8BFB\u53D6\u5230\u5185\u5B58\u4E2D</span>
	<span class="token comment">// \u7F3A\u70B9\uFF1A\u5185\u5B58\u5360\u7528\u8FC7\u5927\uFF0C\u4E0D\u9002\u7528\u5927\u6587\u4EF6</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\\n------------------ \u89E3\u51B3\u65B9\u68481\uFF1A\u4E00\u6B21\u6027\u5168\u90E8\u8BFB\u53D6\u5230\u5185\u5B58\u4E2D ---------------------&quot;</span><span class="token punctuation">)</span>
	<span class="token function">ReadAllByte</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span>

	<span class="token comment">// \u89E3\u51B3\u65B9\u68482\uFF1A\u6309Rune\u8BFB\u53D6\u6587\u4EF6</span>
	<span class="token comment">// \u7F3A\u70B9\uFF1A\u4E00\u4E2A\u5B57\u7B26\u4E00\u4E2A\u5B57\u7B26\u7684\u8BFB\uFF0C\u6548\u7387\u592A\u4F4E</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\\n------------------ \u89E3\u51B3\u65B9\u68482\uFF1A\u6309Rune\u65B9\u5F0F\u8BFB\u53D6 ---------------------&quot;</span><span class="token punctuation">)</span>
	<span class="token function">ReadByRune</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span>

	<span class="token comment">// \u89E3\u51B3\u65B9\u68483\uFF1A\u6309\u5B57\u8282\u8BFB\u53D6\uFF0C\u5982\u679C\u4E0D\u662F\u5B8C\u6574UTF8\u5E8F\u5217\u5219\u56DE\u9000\u6587\u4EF6\u6307\u9488\uFF0C\u52A8\u6001\u5FAE\u8C03buf\u5927\u5C0F</span>
	<span class="token comment">// \u7F3A\u70B9\uFF1A\u9700\u8981\u901A\u8FC7Seek\u6307\u9488\u64CD\u4F5C</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\\n- \u89E3\u51B3\u65B9\u68483\uFF1A\u6309\u5B57\u8282\u8BFB\u6570\u636E\uFF0C\u5982\u679C\u4E0D\u662F\u5B8C\u6574UTF8\u5E8F\u5217\u5219\u56DE\u9000\u6587\u4EF6\u6307\u9488\uFF0C\u52A8\u6001\u5FAE\u8C03buf\u5927\u5C0F -&quot;</span><span class="token punctuation">)</span>
	<span class="token function">ReadByteBySeek</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span>

	<span class="token comment">// \u89E3\u51B3\u65B9\u68484\uFF1A\u6309\u5B57\u8282\u8BFB\u53D6\uFF0C\u5982\u679C\u4E0D\u662F\u5B8C\u6574UTF8\u5E8F\u5217\uFF0C\u90A3\u4E48\u5C06\u5B57\u8282\u5207\u7247\u5206\u5272\uFF0C\u53EA\u662F\u7528\u5B8C\u6574\u7684UTF8\u5E8F\u5217\uFF0C\u4E71\u7801\u90E8\u5206\u4E0E\u4E0B\u4E00\u6B21\u8BFB\u53D6\u8FDE\u63A5\u8D77\u6765</span>
	<span class="token comment">// \u7F3A\u70B9\uFF1A\u4EE3\u7801\u6BD4\u8F83\u590D\u6742</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\\n------- \u89E3\u51B3\u65B9\u68484\uFF1A\u5B57\u8282\u5206\u5272\u4E0E\u91CD\u7EC4\u8BFB\u6CD5\uFF08\u4E0ERead\u8868\u73B0\u4E00\u81F4\uFF09 ----------&quot;</span><span class="token punctuation">)</span>
	<span class="token function">ReadByteNoSeek</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code>------------------ \u5199\u5165\u6570\u636E ---------------------
<span class="token number">2022</span>/04/25 <span class="token number">15</span>:56:39 \u5199\u5165\u6587\u4EF6\u6210\u529F: test.log: <span class="token number">513</span> bytes

------------------ \u6309\u5B57\u8282\u8BFB\u6570\u636E<span class="token punctuation">(</span>\u4F1A\u8BFB\u5230\u4E71\u7801<span class="token punctuation">)</span> ---------------------
<span class="token number">2022</span>/04/25 <span class="token number">15</span>:56:39 \u8BFB\u53D6\u6587\u4EF6\u6210\u529F: test.log: <span class="token number">512</span> bytes
<span class="token number">2022</span>/04/25 <span class="token number">15</span>:56:39 \u663E\u793A\u6587\u4EF6\u5185\u5BB9: \u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D
\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D
\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D
\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D
\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\uFFFD\uFFFD
<span class="token number">2022</span>/04/25 <span class="token number">15</span>:56:39 \u68C0\u6D4B\u5B57\u8282\u5207\u7247\u662F\u5426\u662F\u5B8C\u6574\u4E14\u5408\u6CD5\u7684UTF-8\u7F16\u7801\u5E8F\u5217: <span class="token boolean">false</span>
<span class="token number">2022</span>/04/25 <span class="token number">15</span>:56:39 \u8BFB\u53D6\u6587\u4EF6\u6210\u529F: test.log: <span class="token number">1</span> bytes
<span class="token number">2022</span>/04/25 <span class="token number">15</span>:56:39 \u663E\u793A\u6587\u4EF6\u5185\u5BB9: \uFFFD
<span class="token number">2022</span>/04/25 <span class="token number">15</span>:56:39 \u68C0\u6D4B\u5B57\u8282\u5207\u7247\u662F\u5426\u662F\u5B8C\u6574\u4E14\u5408\u6CD5\u7684UTF-8\u7F16\u7801\u5E8F\u5217: <span class="token boolean">false</span>

------------------ \u89E3\u51B3\u65B9\u68481\uFF1A\u4E00\u6B21\u6027\u5168\u90E8\u8BFB\u53D6\u5230\u5185\u5B58\u4E2D ---------------------      
<span class="token number">2022</span>/04/25 <span class="token number">15</span>:56:39 \u8BFB\u53D6\u6587\u4EF6\u6210\u529F: test.log: <span class="token number">513</span> bytes
<span class="token number">2022</span>/04/25 <span class="token number">15</span>:56:39 \u663E\u793A\u6587\u4EF6\u5185\u5BB9: \u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D
\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D
\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D
\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D
\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u56FD

------------------ \u89E3\u51B3\u65B9\u68482\uFF1A\u6309Rune\u65B9\u5F0F\u8BFB\u53D6 ---------------------
<span class="token number">2022</span>/04/25 <span class="token number">15</span>:56:39 \u663E\u793A\u6587\u4EF6\u5185\u5BB9: \u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D
\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D
\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D
\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D
\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u56FD

- \u89E3\u51B3\u65B9\u68483\uFF1A\u6309\u5B57\u8282\u8BFB\u6570\u636E\uFF0C\u5982\u679C\u4E0D\u662F\u5B8C\u6574UTF8\u5E8F\u5217\u5219\u56DE\u9000\u6587\u4EF6\u6307\u9488\uFF0C\u52A8\u6001\u5FAE\u8C03buf\u5927\u5C0F -
<span class="token number">2022</span>/04/25 <span class="token number">15</span>:56:39 \u8BFB\u53D6\u6587\u4EF6\u6210\u529F: test.log: <span class="token number">513</span> bytes
<span class="token number">2022</span>/04/25 <span class="token number">15</span>:56:39 \u663E\u793A\u6587\u4EF6\u5185\u5BB9: \u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D
\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D
\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D
\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D
\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u56FD

------- \u89E3\u51B3\u65B9\u68484\uFF1A\u5B57\u8282\u5206\u5272\u4E0E\u91CD\u7EC4\u8BFB\u6CD5\uFF08\u4E0ERead\u8868\u73B0\u4E00\u81F4\uFF09 ----------
<span class="token number">2022</span>/04/25 <span class="token number">15</span>:56:39 \u8BFB\u53D6\u6587\u4EF6\u6210\u529F: test.log: <span class="token number">510</span> bytes
<span class="token number">2022</span>/04/25 <span class="token number">15</span>:56:39 \u663E\u793A\u6587\u4EF6\u5185\u5BB9: \u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D
\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D
\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D
\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D
\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D\u4E2D
<span class="token number">2022</span>/04/25 <span class="token number">15</span>:56:39 \u8BFB\u53D6\u6587\u4EF6\u6210\u529F: test.log: <span class="token number">3</span> bytes
<span class="token number">2022</span>/04/25 <span class="token number">15</span>:56:39 \u663E\u793A\u6587\u4EF6\u5185\u5BB9: \u56FD
</code></pre></div><h4 id="\u8BFB\u5199\u5FEB\u6377\u51FD\u6570" tabindex="-1"><a class="header-anchor" href="#\u8BFB\u5199\u5FEB\u6377\u51FD\u6570" aria-hidden="true">#</a> \u8BFB\u5199\u5FEB\u6377\u51FD\u6570</h4><p><code>os.WriteFile</code>\u548C<code>os.ReadFile</code>\u5E95\u5C42\u8C03\u7528\u7684\u662F<code>OpenFile</code>\uFF0C\u4E00\u6B21\u6027\u52A0\u8F7D\u6570\u636E\u5230\u5185\u5B58\u4E2D\uFF0C\u9002\u5408\u8BFB\u53D6\u5C0F\u6587\u4EF6\uFF0C\u5927\u6587\u4EF6\u6709\u6491\u7206\u5185\u5B58\u7684\u98CE\u9669</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;os&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u5199\u5165\u6587\u4EF6</span>
	writeFileName <span class="token operator">:=</span> <span class="token string">&quot;test.log&quot;</span>
	err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">WriteFile</span><span class="token punctuation">(</span>writeFileName<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, \u8FD9\u91CC\u662F\u6D4B\u8BD5\u65E5\u5FD7&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> os<span class="token punctuation">.</span>ModePerm<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;\u5199\u5165\u6587\u4EF6\u5931\u8D25: %s\\n&quot;</span><span class="token punctuation">,</span> writeFileName<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u5199\u5165\u6587\u4EF6\u6210\u529F: %s\\n&quot;</span><span class="token punctuation">,</span> writeFileName<span class="token punctuation">)</span>

	<span class="token comment">// \u51FD\u6570\u6E90\u7801\u5982\u4E0B\uFF1A</span>
	<span class="token comment">//func WriteFile(name string, data []byte, perm FileMode) error {</span>
	<span class="token comment">//	f, err := OpenFile(name, O_WRONLY|O_CREATE|O_TRUNC, perm)</span>
	<span class="token comment">//	if err != nil {</span>
	<span class="token comment">//	return err</span>
	<span class="token comment">//}</span>
	<span class="token comment">//	_, err = f.Write(data)</span>
	<span class="token comment">//	if err1 := f.Close(); err1 != nil &amp;&amp; err == nil {</span>
	<span class="token comment">//	err = err1</span>
	<span class="token comment">//}</span>
	<span class="token comment">//	return err</span>
	<span class="token comment">//}</span>
	<span class="token comment">// \u53EF\u4EE5\u770B\u5230\uFF0C(1)\u8BFB\u5199\u6A21\u5F0F\u6253\u5F00\u6587\u4EF6 (2)\u6587\u4EF6\u82E5\u4E0D\u5B58\u5728\u4F1A\u81EA\u52A8\u521B\u5EFA (3)\u6587\u4EF6\u82E5\u5B58\u5728\u5219\u4F1A\u622A\u65AD(\u6E05\u7A7A\u5185\u5BB9)\uFF0C\u6240\u4EE5\u4F7F\u7528\u8FD9\u4E2A\u51FD\u6570\u524D\u9700\u8981\u5C0F\u5FC3\u4E00\u4E9B</span>

	<span class="token comment">// \u8BFB\u53D6\u6587\u4EF6</span>
	readFileName <span class="token operator">:=</span> <span class="token string">&quot;D:\\\\iso\\\\CentOS-7-x86_64-DVD-1708.iso&quot;</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u5F00\u59CB\u8BFB\u53D6\u6587\u4EF6: %s\\n&quot;</span><span class="token punctuation">,</span> readFileName<span class="token punctuation">)</span>
	buf<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">ReadFile</span><span class="token punctuation">(</span>readFileName<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;\u8BFB\u53D6\u6587\u4EF6\u5931\u8D25: %s: %s\\n&quot;</span><span class="token punctuation">,</span> readFileName<span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u8BFB\u53D6\u6587\u4EF6\u6210\u529F: %s: %d bytes\\n&quot;</span><span class="token punctuation">,</span> readFileName<span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token comment">// \u67E5\u770B\u6E90\u7801\u53EF\u4EE5\u770B\u5230\uFF0C</span>
	<span class="token comment">//		(1)\u4F7F\u7528Open\u6253\u5F00\u6587\u4EF6</span>
	<span class="token comment">//		(2)\u5F53\u6587\u4EF6\u5927\u5C0F(int64\u7C7B\u578B)\u80FD\u6B63\u5E38\u8F6C\u4E3Aint\u7C7B\u578B\u65F6\uFF0Cbuf\u5C31\u53D6\u8FD9\u4E2A\u503C\uFF1B\u5426\u5219buf\u8BBE\u7F6E\u4E3A512</span>
	<span class="token comment">//		   int\u6700\u5927\u503C\u8F6C\u4E3AGB\u662F\u591A\u5C11\u5462\uFF1F math.MaxInt / 1024 / 1024 / 1024 = 8589934591</span>
	<span class="token comment">//		   \u5F53\u6587\u4EF6\u5C0F\u4E8E8589934591GB\u65F6\uFF0C\u90FD\u662F\u4E00\u6B21\u6027\u8BFB\u5165\u5185\u5B58\u4E2D</span>
	<span class="token comment">// 		   \u6240\u4EE5\u4F7F\u7528\u8FD9\u4E2A\u51FD\u6570\uFF0C\u5C31\u7B49\u540C\u4E8E\u5C06\u6587\u4EF6\u4E00\u6B21\u6027\u8BFB\u5165\u5185\u5B58\uFF0C\u8BF7\u786E\u4FDD\u5185\u5B58\u5145\u8DB3..</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token number">2022</span>/04/24 <span class="token number">14</span>:30:58 \u5199\u5165\u6587\u4EF6\u6210\u529F: test.log
<span class="token number">2022</span>/04/24 <span class="token number">14</span>:30:58 \u5F00\u59CB\u8BFB\u53D6\u6587\u4EF6: D:<span class="token punctuation">\\</span>iso<span class="token punctuation">\\</span>CentOS-7-x86_64-DVD-1708.iso
<span class="token number">2022</span>/04/24 <span class="token number">14</span>:31:00 \u8BFB\u53D6\u6587\u4EF6\u6210\u529F: D:<span class="token punctuation">\\</span>iso<span class="token punctuation">\\</span>CentOS-7-x86_64-DVD-1708.iso: <span class="token number">4521459712</span> bytes

<span class="token comment"># \u53EF\u4EE5\u770B\u5230\uFF0C4\u4E2A\u591AG\u7684\u6587\u4EF62\u79D2\u949F\u8BFB\u5B8C\u4E86</span>
</code></pre></div><h3 id="io\u5305-io\u57FA\u672C\u63A5\u53E3\u5B9A\u4E49" tabindex="-1"><a class="header-anchor" href="#io\u5305-io\u57FA\u672C\u63A5\u53E3\u5B9A\u4E49" aria-hidden="true">#</a> <code>io</code>\u5305\uFF1AIO\u57FA\u672C\u63A5\u53E3\u5B9A\u4E49</h3>`,33),us=s("\u5B98\u65B9\u6587\u6863\uFF1A"),ls={href:"https://pkg.go.dev/io",target:"_blank",rel:"noopener noreferrer"},ks=s("https://pkg.go.dev/io"),is=p(`<h4 id="reader\u57FA\u672C\u63A5\u53E3" tabindex="-1"><a class="header-anchor" href="#reader\u57FA\u672C\u63A5\u53E3" aria-hidden="true">#</a> Reader\u57FA\u672C\u63A5\u53E3</h4><p><strong>Reader\u5B9A\u4E49</strong></p><div class="language-go ext-go"><pre class="language-go"><code><span class="token comment">// io.Reader</span>
<span class="token keyword">type</span> Reader <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Read</span><span class="token punctuation">(</span>p <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>\u6839\u636E\u63A5\u53E3\u5B9A\u4E49\u5F97\u5230\u7684\u4FE1\u606F\uFF1A\u8BFB\u53D6\u6570\u636E\u5E76\u586B\u5145\u5230<code>p</code>\u4E2D\uFF0C\u6700\u591A\u586B\u5145<code>len(p)</code>\u4E2A\u5B57\u8282\uFF1B\u8FD4\u56DE\u5B9E\u9645\u8BFB\u53D6\u5230\u7684\u5B57\u8282\u6570<code>n</code>\u548C<code>error</code></p></blockquote><p><strong>Reader\u8BFB\u53D6\u89C4\u5219</strong></p><p>\uFF081\uFF09\u8BFB\u53D6\u6210\u529F\uFF0C\u6570\u636E\u5168\u90E8\u586B\u5145\u81F3<code>p</code>\uFF0C\u6B64\u65F6\u6709<code> n == len(p)</code>\u3001<code>err == nil</code></p><p>\uFF082\uFF09\u8BFB\u53D6\u5931\u8D25\uFF0C\u6B64\u65F6\u6709<code>err != nil</code>\uFF0C<code>err</code>\u4EE3\u8868\u5177\u4F53\u7684\u9519\u8BEF</p><p>\uFF083\uFF09\u8BFB\u5230<code>EOF</code>\uFF0C\u6B64\u65F6\u652F\u6301\u4EE5\u4E0B\u4E24\u79CD\u5904\u7406\u60C5\u51B5\uFF1A</p><p>\u200B \u2460 \u8FD4\u56DE\u5B9E\u9645\u8BFB\u53D6\u7684\u5B57\u8282\u6570n\uFF0C\u5C06<code>err</code>\u8BBE\u7F6E\u4E3A<code>EOF</code>\uFF08\u63A8\u8350\uFF09</p><p>\u200B \u2461 \u8FD4\u56DE\u5B9E\u9645\u8BFB\u53D6\u7684\u5B57\u8282\u6570n\uFF0C\u5C06<code>err</code>\u8BBE\u7F6E\u4E3A<code>nil</code>\uFF0C\u5BF9\u4E8E\u8FD9\u79CD\u60C5\u51B5\uFF0C\u5728\u4E0B\u4E00\u6B21\u8BFB\u53D6\u65F6\u9700\u8981\u8FD4\u56DE<code>n == 0, err == nil</code>\uFF08\u4E0D\u63A8\u8350\uFF09</p><p>\uFF084\uFF09<span style="color:blue;font-weight:bold;">\u5141\u8BB8\u6570\u636E\u6CA1\u5168\u90E8\u51C6\u5907\u597D\u65F6\uFF0C\u8FD4\u56DE\u90E8\u5206\u6570\u636E\uFF0C\u6B64\u65F6\u6709<code>p</code>\u5C1A\u672A\u586B\u5145\u6EE1\uFF0C\u540C\u65F6<code>err == nil</code></span>\uFF08\u8FD9\u79CD\u60C5\u51B5\u8981\u5C0F\u5FC3\uFF0C\u53EF\u80FD\u5199\u4EE3\u7801\u4F1A\u51FA\u73B0\u4E00\u4E9B\u5751\uFF09</p><p><strong>Reader\u63A5\u53E3\u7684\u51E0\u79CD\u5B9E\u73B0</strong></p><table><thead><tr><th>\u7ED3\u6784\u4F53/\u63A5\u53E3</th><th>\u5177\u4F53\u5B9E\u73B0</th><th>\u5907\u6CE8</th></tr></thead><tbody><tr><td>\u4ECE\u6587\u4EF6\u4E2D\u8BFB\uFF1A<br><code>os.File</code>\u7ED3\u6784\u4F53</td><td><code>os.OpenFile()</code></td><td>\u6587\u4EF6\u8BFB\u53D6</td></tr><tr><td></td><td><code>os.Stdin</code>/<code>os.Stdout</code>/<code>os.Stderr</code></td><td>\u4E3B\u8981\u4E3A\u6807\u51C6\u8F93\u5165\u8BFB\u53D6<code>Stdin</code></td></tr><tr><td>\u4ECE\u5B57\u7B26\u4E32\u4E2D\u8BFB\uFF1A<br><code>strings.Reader</code>\u7ED3\u6784\u4F53</td><td><code>strings.NewReader()</code></td><td><code>Reader</code>\u63A5\u53E3\uFF1A\u672C\u8D28\u662F\u8C03\u7528\u5185\u7F6E\u51FD\u6570<code>copy</code>\uFF0C\u65E0\u6CD5\u8BFB\u53D6\u4E2D\u6587<br><code>RuneReader</code>\u63A5\u53E3\uFF1A\u672C\u8D28\u662F\u6309\u5B57\u8282\u904D\u5386\uFF0C\u5982\u679C\u5B57\u8282\u5728ASCII\u7801\u8303\u56F4\u5185<br>\u5219\u4F7F\u7528<code>rune</code>\u5305\u88C5\u4E00\u4E0B\u8FD4\u56DE\uFF0C\u5426\u5219\u8C03\u7528<code>utf8.DecodeRuneInString</code>\u89E3\u7801\u51FA\u7B2C\u4E00\u4E2A<code>Rune</code>\u5E76\u8FD4\u56DE</td></tr><tr><td>\u4ECE\u5B57\u8282\u4E2D\u8BFB\uFF1A<br><code>bytes.Reader</code>\u7ED3\u6784\u4F53</td><td><code>bytes.NewReader()</code></td><td>\u7C7B\u4F3C\u4E8E<code>strings.Reader</code>\u7ED3\u6784\u4F53</td></tr><tr><td>\u4ECE\u7F13\u51B2\u4E2D\u8BFB\uFF1A<br><code>bytes.Buffer</code>\u7ED3\u6784\u4F53<br><code>bufio.Reader</code>\u7ED3\u6784\u4F53</td><td>\u8BE6\u7EC6\u4ECB\u7ECD\u89C1\u540E\u9762\u7AE0\u8282</td><td>\u8BE6\u7EC6\u4ECB\u7ECD\u89C1\u540E\u9762\u7AE0\u8282</td></tr><tr><td>\u4ECE\u7F51\u7EDC\u8FDE\u63A5\u4E2D\u8BFB\uFF1A<br><code>net.Conn</code>\u63A5\u53E3</td><td>\u4EE5\u540E\u8865\u5145</td><td>\u4EE5\u540E\u8865\u5145</td></tr></tbody></table><p>\u793A\u4F8B\u4EE3\u7801</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;os&quot;</span>
	<span class="token string">&quot;strings&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">ReadFromStdin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">1024</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		<span class="token comment">// \u8BFB\u53D6\u8F93\u5165</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%s \u8BF7\u8F93\u5165\u540D\u5B57\uFF1A&quot;</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Format</span><span class="token punctuation">(</span><span class="token string">&quot;2006/01/02 15:04:05&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		n<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span>Stdin<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// \u89E3\u6790\u8F93\u5165</span>
		name <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">TrimSpace</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span>buf<span class="token punctuation">[</span><span class="token punctuation">:</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

		<span class="token comment">// \u5224\u65AD\u8F93\u5165\u662F\u5426\u5408\u6CD5</span>
		<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u60A8\u7684\u540D\u5B57\u4E3A: %s&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">ReadFromStringReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	reader <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span><span class="token string">&quot;hello world!&quot;</span><span class="token punctuation">)</span>
	buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">1024</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		n<span class="token punctuation">,</span> err <span class="token operator">:=</span> reader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span>
		<span class="token keyword">if</span> n <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%s\\n&quot;</span><span class="token punctuation">,</span> buf<span class="token punctuation">[</span><span class="token punctuation">:</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span> err <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">continue</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span> err <span class="token operator">==</span> io<span class="token punctuation">.</span>EOF <span class="token punctuation">{</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;read error&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">ReadRuneFromStringReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	reader <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span><span class="token string">&quot;a\u4F60\u597D&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		r<span class="token punctuation">,</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> reader<span class="token punctuation">.</span><span class="token function">ReadRune</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> err <span class="token operator">==</span> io<span class="token punctuation">.</span>EOF <span class="token punctuation">{</span>
				<span class="token keyword">break</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%s&quot;</span><span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">ReadFromStdin</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">ReadFromStringReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">ReadRuneFromStringReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token number">2022</span>/04/24 <span class="token number">16</span>:52:13 \u8BF7\u8F93\u5165\u540D\u5B57\uFF1A\u6124\u6012\u7684\u897F\u74DC
<span class="token number">2022</span>/04/24 <span class="token number">16</span>:52:32 \u60A8\u7684\u540D\u5B57\u4E3A: \u6124\u6012\u7684\u897F\u74DC
<span class="token number">2022</span>/04/24 <span class="token number">16</span>:52:32 hello world<span class="token operator">!</span>
<span class="token number">2022</span>/04/24 <span class="token number">16</span>:52:32 a
<span class="token number">2022</span>/04/24 <span class="token number">16</span>:52:32 \u4F60
<span class="token number">2022</span>/04/24 <span class="token number">16</span>:52:32 \u597D
</code></pre></div><h4 id="reader\u5176\u4ED6\u63A5\u53E3" tabindex="-1"><a class="header-anchor" href="#reader\u5176\u4ED6\u63A5\u53E3" aria-hidden="true">#</a> Reader\u5176\u4ED6\u63A5\u53E3</h4><div class="language-go ext-go"><pre class="language-go"><code><span class="token comment">// \u8BFB\u53D6\u4E00\u6B21\u8FD4\u56DE\u4E00\u4E2A\u5B57\u8282</span>
<span class="token keyword">type</span> ByteReader <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">ReadByte</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u8BFB\u53D6\u4E00\u6B21\u8FD4\u56DE\u4E00\u4E2ARune</span>
<span class="token keyword">type</span> RuneReader <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">ReadRune</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>r <span class="token builtin">rune</span><span class="token punctuation">,</span> size <span class="token builtin">int</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u53EF\u4EE5\u4ECE\u6307\u5B9A\u4F4D\u7F6E(\u5B57\u8282)\u5904\u8BFB\u53D6</span>
<span class="token keyword">type</span> ReaderAt <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">ReadAt</span><span class="token punctuation">(</span>p <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> off <span class="token builtin">int64</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="reader\u5C01\u88C5\u51FD\u6570" tabindex="-1"><a class="header-anchor" href="#reader\u5C01\u88C5\u51FD\u6570" aria-hidden="true">#</a> Reader\u5C01\u88C5\u51FD\u6570</h4><table><thead><tr><th>\u51FD\u6570</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td><code>func ReadAll(r Reader) ([]byte, error)</code></td><td>\u4ECE<code>Reader</code>\u4E2D\u8BFB\u5B8C\u6240\u6709\u6570\u636E\u518D\u8FD4\u56DE\uFF0C\u5F53\u6587\u4EF6\u8FC7\u5927\u65F6\u6709\u6491\u7206\u5185\u5B58\u7684\u98CE\u9669</td></tr><tr><td><code>func ReadFull(r Reader, buf []byte) (n int, err error)</code></td><td>\u8BFB\u6EE1\u7F13\u51B2\u533A\u518D\u8FD4\u56DE\uFF0C\u672A\u8BFB\u6EE1\u7F13\u51B2\u533A\uFF08\u5373\u4F7F\u8BFB\u5230<code>EOF</code>\uFF09\u4E5F\u4F1A\u8FD4\u56DE\u9519\u8BEF</td></tr><tr><td><code>func ReadAtLeast(r Reader, buf []byte, min int) (n int, err error)</code></td><td>\u6700\u5C11\u8981\u8BFB<code>min</code>\u4E2A\u5B57\u8282\uFF0C\u5373\u4F7F\u8BFB\u5230<code>EOF</code>\u4E5F\u4F1A\u8FD4\u56DE\u9519\u8BEF</td></tr><tr><td><code>func LimitReader(r Reader, n int64) Reader</code></td><td>\u8FD4\u56DE\u4E00\u4E2A\u65B0<code>Reader</code>\uFF0C\u8BE5<code>Reader</code>\u6700\u591A\u53EA\u80FD\u8BFB\u53D6<code>n</code>\u4E2A\u5B57\u8282\uFF08\u504F\u79FB\u4E3A0\uFF09</td></tr><tr><td><code>func NewSectionReader(r ReaderAt, off int64, n int64) *SectionReader</code></td><td>\u8FD4\u56DE\u4E00\u4E2A\u65B0<code>Reader</code>\uFF0C\u8BE5<code>Reader</code>\u6700\u591A\u53EA\u80FD\u8BFB\u53D6<code>n</code>\u4E2A\u5B57\u8282\uFF08\u504F\u79FB\u4E3A<code>off</code>\uFF09</td></tr></tbody></table><h4 id="writer\u548Ccloser\u63A5\u53E3" tabindex="-1"><a class="header-anchor" href="#writer\u548Ccloser\u63A5\u53E3" aria-hidden="true">#</a> Writer\u548CCloser\u63A5\u53E3</h4><p><strong>\u63A5\u53E3\u5B9A\u4E49</strong></p><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">type</span> Writer <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Write</span><span class="token punctuation">(</span>p <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Closer <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="reader\u548Cwriter\u590D\u5408\u51FD\u6570" tabindex="-1"><a class="header-anchor" href="#reader\u548Cwriter\u590D\u5408\u51FD\u6570" aria-hidden="true">#</a> Reader\u548CWriter\u590D\u5408\u51FD\u6570</h4><p><strong>io.Copy\u7CFB\u5217</strong></p><p>\uFF081\uFF09<code>func Copy(dst Writer, src Reader) (written int64, err error)</code></p><p>\u4E3B\u8981\u529F\u80FD\u4E3A\uFF1A\u4ECE<code>Reader</code>\u4E2D\u8BFB\u53D6\uFF0C\u5E76\u5199\u5165\u5230<code>Writer</code>\u4E2D\uFF0C\u8FD4\u56DE\u5199\u5165\u7684\u5B57\u8282\u6570\u548C\u9519\u8BEF</p><blockquote><p>\u5B9E\u73B0\u7684\u7EC6\u8282\uFF1A</p><ol><li>\u5982\u679C<code>src</code>\u5B9E\u73B0\u4E86<code>WriteTo</code>\u63A5\u53E3\uFF0C\u90A3\u4E48\u5C31\u8C03\u7528<code>src.WriteTo(dst)</code>\u65B9\u6CD5</li><li>\u5982\u679C<code>dst</code>\u5B9E\u73B0\u4E86<code>ReaderFrom</code>\u63A5\u53E3\uFF0C\u90A3\u4E48\u5C31\u8C03\u7528<code>dst.ReadFrom(src)</code>\u65B9\u6CD5</li><li>\u5982\u679C\u4EE5\u4E0A\u4E24\u4E2A\u63A5\u53E3\u90FD\u6CA1\u5B9E\u73B0\uFF0C\u90A3\u4E48\u5C31\u4ECE<code>src</code>\u8BFB\u53D6\u6570\u636E\u5230\u7F13\u51B2\u533A\u518D\u5199\u5165<code>Writer</code></li><li>\u5982\u679C<code>src</code>\u662F<code>*LimitedReader</code>\u7ED3\u6784\u4F53\uFF0C\u90A3\u4E48<code>buffer</code>\u5927\u5C0F\u8BBE\u5B9A\u4E3A\u89C4\u5B9A\u7684\u5927\u5C0F\uFF0C\u5426\u5219\u8BBE\u7F6E\u4E3A<code>32KB</code></li></ol></blockquote><p>\uFF082\uFF09<code>func CopyBuffer(dst Writer, src Reader, buf []byte) (written int64, err error)</code></p><p>\u4E0E<code>io.Copy</code>\u4E0D\u540C\u7684\u5730\u65B9\u5728\u4E8E\u53EF\u4EE5\u81EA\u5B9A\u4E49<code>buffer</code>\u5927\u5C0F\u7684<code>Copy</code>\uFF0C\u4F46\u662F\u8BF7\u6CE8\u610F\u53EA\u6709\u5728<code>src.WriteTo</code>\u548C<code>dst.ReadFrom</code>\u90FD\u6CA1\u6709\u5B9E\u73B0\u7684\u60C5\u51B5\u4E0B\u751F\u6548</p><p>\uFF083\uFF09<code>func CopyN(dst Writer, src Reader, n int64) (written int64, err error)</code></p><p>\u53EA\u62F7\u8D1DN\u4E2A\u5B57\u8282\uFF0C\u672C\u8D28\u4E0A\u662F\u901A\u8FC7<code>LimitReader</code>\u6765\u9650\u5236<code>Reader</code>\u6240\u80FD\u8BFB\u53D6\u7684\u5B57\u8282\u6570</p><p><strong>io.Pipe</strong></p><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Pipe</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>PipeReader<span class="token punctuation">,</span> <span class="token operator">*</span>PipeWriter<span class="token punctuation">)</span>
</code></pre></div><ul><li><p>\u4ECEw\u4E2D\u5199\u5165\uFF0C\u4ECEr\u4E2D\u8BFB\u51FA</p></li><li><p>\u7EBF\u7A0B\u5B89\u5168</p></li><li><p>\u672C\u8D28\u4E0A\u662F\u65E0\u7F13\u51B2\u7684<code>channel</code>\uFF0C\u6240\u4EE5\u4E0D\u80FD\u5728\u540C\u4E00\u4E2A\u534F\u7A0B\u4E2D\u8BFB\u548C\u5199</p></li></ul><h3 id="bufio\u5305-\u5E26\u7F13\u51B2\u7684io\u5305" tabindex="-1"><a class="header-anchor" href="#bufio\u5305-\u5E26\u7F13\u51B2\u7684io\u5305" aria-hidden="true">#</a> bufio\u5305\uFF1A\u5E26\u7F13\u51B2\u7684IO\u5305</h3>`,37),rs=s("\u5B98\u65B9\u6587\u6863\uFF1A"),ds={href:"https://pkg.go.dev/bufio",target:"_blank",rel:"noopener noreferrer"},ms=s("https://pkg.go.dev/bufio"),gs=p(`<h4 id="\u7F13\u51B2\u539F\u7406" tabindex="-1"><a class="header-anchor" href="#\u7F13\u51B2\u539F\u7406" aria-hidden="true">#</a> \u7F13\u51B2\u539F\u7406</h4><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/bufio.png" alt="bufio"></p><p>\u672C\u8D28\u4E0A\u6765\u8BB2\uFF0C\u5C31\u662F\u901A\u8FC7\u51CF\u5C11\u7CFB\u7EDF\u8C03\u7528\u6765\u63D0\u9AD8\u6548\u7387\uFF0C\u4ED8\u51FA\u7684\u4EE3\u4EF7\u5C31\u662F\u5185\u5B58\u5360\u7528\u53D8\u591A</p><h4 id="\u6784\u9020\u51FD\u6570" tabindex="-1"><a class="header-anchor" href="#\u6784\u9020\u51FD\u6570" aria-hidden="true">#</a> \u6784\u9020\u51FD\u6570</h4><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">NewReader</span><span class="token punctuation">(</span>rd io<span class="token punctuation">.</span>Reader<span class="token punctuation">)</span> <span class="token operator">*</span>Reader <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token function">NewReaderSize</span><span class="token punctuation">(</span>rd<span class="token punctuation">,</span> defaultBufSize<span class="token punctuation">)</span>	
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewWriter</span><span class="token punctuation">(</span>w io<span class="token punctuation">.</span>Writer<span class="token punctuation">)</span> <span class="token operator">*</span>Writer <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token function">NewWriterSize</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> defaultBufSize<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u9ED8\u8BA4\u7684\u7F13\u51B2\u533A\u5927\u5C0FdefaultBufSize = 4096</span>
</code></pre></div><h4 id="\u4F7F\u7528\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528\u793A\u4F8B" aria-hidden="true">#</a> \u4F7F\u7528\u793A\u4F8B</h4><details class="custom-container details"><summary>Reader\u4F7F\u7528\u793A\u4F8B</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;bufio&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;strings&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u751F\u6210\u539F\u59CBReader</span>
	<span class="token keyword">var</span> str <span class="token builtin">string</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">170</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		str <span class="token operator">+=</span> <span class="token string">&quot;\u4E2D&quot;</span>
	<span class="token punctuation">}</span>
	r <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u539F\u59CBReader\u53EF\u8BFB\u53D6\u6570\u636E\u5927\u5C0F: %d\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// \u5E26\u7F13\u51B2\u7684Reader</span>
	<span class="token comment">//reader := bufio.NewReader(f)	// \u4F7F\u7528\u9ED8\u8BA4\u7F13\u51B2\u5927\u5C0F</span>
	reader <span class="token operator">:=</span> bufio<span class="token punctuation">.</span><span class="token function">NewReaderSize</span><span class="token punctuation">(</span>r<span class="token punctuation">,</span> <span class="token number">1024</span><span class="token punctuation">)</span> <span class="token comment">// \u81EA\u5B9A\u4E49\u7F13\u51B2\u5927\u5C0F</span>

	<span class="token comment">// \u8BFB\u53D6\u6570\u636E</span>
	buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
	n<span class="token punctuation">,</span> err <span class="token operator">:=</span> reader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;Read error: %s\\n&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Read %d bytes\\n&quot;</span><span class="token punctuation">,</span> n<span class="token punctuation">)</span>

	<span class="token comment">// \u67E5\u770B\u7F13\u51B2\u533A\u4FE1\u606F</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u7F13\u51B2\u533A\u5927\u5C0F: %d bytes\\n&quot;</span><span class="token punctuation">,</span> reader<span class="token punctuation">.</span><span class="token function">Size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u5F53\u524D\u7F13\u51B2\u533A\u5269\u4F59\u7684\u53EF\u8BFB\u5B57\u8282\u6570: %d bytes\\n&quot;</span><span class="token punctuation">,</span> reader<span class="token punctuation">.</span><span class="token function">Buffered</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><details class="custom-container details"><summary>Writer\u4F7F\u7528\u793A\u4F8B</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;bufio&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;os&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u5E26\u7F13\u51B2\u7684Writer</span>
	<span class="token comment">//writer := bufio.NewWriter(os.Stdout)</span>
	writer <span class="token operator">:=</span> bufio<span class="token punctuation">.</span><span class="token function">NewWriterSize</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">)</span>

	<span class="token comment">// \u5199\u5165\u6570\u636E\uFF0C\u672C\u6B21\u603B\u5171\u5199\u516513\u4E2A\u5B57\u8282\u6570\u636E</span>
	<span class="token comment">// \u82E5\u7F13\u51B2\u533A\u5927\u4E8E\u7B49\u4E8E13\u5219\u5199\u5165\u5230\u7F13\u51B2\u533A\uFF0C\u5C4F\u5E55\u4E0A\u4E5F\u4E0D\u4F1A\u8F93\u51FA\u4EFB\u4F55\u4FE1\u606F\uFF0C\u56E0\u4E3A\u7F13\u51B2\u533A\u8FD8\u5E76\u6CA1\u6709\u5411\u771F\u6B63\u7684io.Writer\u4E2D\u5199\u5165</span>
	<span class="token comment">// \u82E5\u7F13\u51B2\u533A\u5C0F\u4E8E13\u5219\u4E0D\u5199\u7F13\u51B2\u533A\u76F4\u63A5\u5199\u5230\u539F\u59CB\u7684io.Writer\u4E2D\u53BB</span>
	n<span class="token punctuation">,</span> err <span class="token operator">:=</span> writer<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">&quot;hello world!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;Write error: %s\\n&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Write ok: %d bytes\\n&quot;</span><span class="token punctuation">,</span> n<span class="token punctuation">)</span>

	<span class="token comment">// \u7F13\u51B2\u533A\u4FE1\u606F</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u7F13\u51B2\u533A\u5927\u5C0F: %d\\n&quot;</span><span class="token punctuation">,</span> writer<span class="token punctuation">.</span><span class="token function">Size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token comment">//_ = writer.Flush()   // \u5C06\u7F13\u51B2\u533A\u6570\u636E\u5199\u5165\u5230io.Writer\u4E2D</span>
	<span class="token comment">//writer.Reset(writer) // \u6E05\u7A7A\u7F13\u51B2\u533A, \u672A\u5199\u5165\u7684\u5219\u4E22\u5F03</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u5F53\u524D\u7F13\u51B2\u533A\u5DF2\u5199\u5165\u7684\u5B57\u8282\u6570: %d\\n&quot;</span><span class="token punctuation">,</span> writer<span class="token punctuation">.</span><span class="token function">Buffered</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u5F53\u524D\u7F13\u51B2\u533A\u672A\u4F7F\u7528\u7684\u5B57\u8282\u6570: %d\\n&quot;</span><span class="token punctuation">,</span> writer<span class="token punctuation">.</span><span class="token function">Available</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token comment">//b := writer.AvailableBuffer() // \u8FD4\u56DE\u672A\u4F7F\u7528\u5B57\u8282\u7EC4\u6210\u7684\u5207\u7247, \u7B49\u540C\u4E8Eb := make([]byte, writer.Available())</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h4 id="\u8BFB\u5199\u6D4B\u8BD5" tabindex="-1"><a class="header-anchor" href="#\u8BFB\u5199\u6D4B\u8BD5" aria-hidden="true">#</a> \u8BFB\u5199\u6D4B\u8BD5</h4><p><strong>\u5199\u6D4B\u8BD5</strong></p><details class="custom-container details"><summary>\u5199\u7F13\u51B2\u6027\u80FD\u6D4B\u8BD5</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;bufio&quot;</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;os&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">WriteBufTest</span><span class="token punctuation">(</span>srcFileName<span class="token punctuation">,</span> dstFileName <span class="token builtin">string</span><span class="token punctuation">,</span> buffer <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u5B9A\u4E49\u53D8\u91CF</span>
	<span class="token keyword">var</span> <span class="token punctuation">(</span>
		total <span class="token builtin">int64</span>
		err   <span class="token builtin">error</span>
	<span class="token punctuation">)</span>
	start <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Unix</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6253\u5F00src\u6587\u4EF6</span>
	reader<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>srcFileName<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;\u6253\u5F00\u6587\u4EF6\u5931\u8D25: %s: %s\\n&quot;</span><span class="token punctuation">,</span> srcFileName<span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> reader<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6253\u5F00dst\u6587\u4EF6</span>
	writer<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">OpenFile</span><span class="token punctuation">(</span>dstFileName<span class="token punctuation">,</span> os<span class="token punctuation">.</span>O_RDWR<span class="token operator">|</span>os<span class="token punctuation">.</span>O_CREATE<span class="token operator">|</span>os<span class="token punctuation">.</span>O_TRUNC<span class="token punctuation">,</span> os<span class="token punctuation">.</span>ModePerm<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;\u6253\u5F00\u6587\u4EF6\u5931\u8D25: %s: %s\\n&quot;</span><span class="token punctuation">,</span> dstFileName<span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> writer<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u662F\u5426\u4F7F\u7528buffer</span>
	<span class="token keyword">if</span> buffer <span class="token punctuation">{</span>
		<span class="token comment">// \u751F\u6210buffer\u5E76\u5199\u5165</span>
		w <span class="token operator">:=</span> bufio<span class="token punctuation">.</span><span class="token function">NewWriterSize</span><span class="token punctuation">(</span>writer<span class="token punctuation">,</span> <span class="token number">1024</span><span class="token operator">*</span><span class="token number">32</span><span class="token punctuation">)</span>

		<span class="token comment">// \u4F7F\u7528io.Copy\u5199\u5165</span>
		<span class="token comment">//total, err = io.Copy(w, reader)</span>

		<span class="token comment">// \u624B\u52A8\u8BFB\u53D6\u5199\u5165</span>
		buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">1024</span><span class="token punctuation">)</span>
		<span class="token keyword">for</span> <span class="token punctuation">{</span>
			n<span class="token punctuation">,</span> err <span class="token operator">:=</span> reader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				<span class="token keyword">if</span> err <span class="token operator">==</span> io<span class="token punctuation">.</span>EOF <span class="token punctuation">{</span>
					<span class="token keyword">break</span>
				<span class="token punctuation">}</span>
				log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;read error: %s\\n&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>

			<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> w<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>buf<span class="token punctuation">[</span><span class="token punctuation">:</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;write error: %s\\n&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			total <span class="token operator">+=</span> <span class="token function">int64</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		<span class="token comment">// \u4F7F\u7528io.Copy\u5199\u5165</span>
		<span class="token comment">//total, err = io.Copy(writer, reader)</span>

		<span class="token comment">// \u624B\u52A8\u8BFB\u53D6\u5199\u5165</span>
		buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">1024</span><span class="token punctuation">)</span>
		<span class="token keyword">for</span> <span class="token punctuation">{</span>
			n<span class="token punctuation">,</span> err <span class="token operator">:=</span> reader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				<span class="token keyword">if</span> err <span class="token operator">==</span> io<span class="token punctuation">.</span>EOF <span class="token punctuation">{</span>
					<span class="token keyword">break</span>
				<span class="token punctuation">}</span>
				log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;read error: %s\\n&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> writer<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>buf<span class="token punctuation">[</span><span class="token punctuation">:</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;write error: %s\\n&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			total <span class="token operator">+=</span> <span class="token function">int64</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;\u62F7\u8D1D\u6587\u4EF6\u5931\u8D25: %s\\n&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	delta <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Unix</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> start
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;It takes %d seconds to copy %d bytes for %s\\n&quot;</span><span class="token punctuation">,</span> delta<span class="token punctuation">,</span> total<span class="token punctuation">,</span> dstFileName<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup
	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">WriteBufTest</span><span class="token punctuation">(</span><span class="token string">&quot;D:\\\\iso\\\\CentOS-7-x86_64-DVD-1708.iso&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;D:\\\\iso\\\\write_without_buffer.iso&quot;</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
		wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">WriteBufTest</span><span class="token punctuation">(</span><span class="token string">&quot;D:\\\\iso\\\\CentOS-7-x86_64-DVD-1708.iso&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;D:\\\\iso\\\\write_with_buffer.iso&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
		wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token number">2022</span>/04/27 <span class="token number">12</span>:56:39 It takes <span class="token number">23</span> seconds to copy <span class="token number">4521459712</span> bytes <span class="token keyword">for</span> D:<span class="token punctuation">\\</span>iso<span class="token punctuation">\\</span>write_with_buffer.iso
<span class="token number">2022</span>/04/27 <span class="token number">12</span>:56:50 It takes <span class="token number">34</span> seconds to copy <span class="token number">4521459712</span> bytes <span class="token keyword">for</span> D:<span class="token punctuation">\\</span>iso<span class="token punctuation">\\</span>write_without_buffer.iso
</code></pre></div><blockquote><p>\u{1F4A1} \u8BF4\u660E\uFF1A</p><p>\u4EE3\u7801\u4E2D\u7ED9\u51FA\u4E862\u79CD\u8BFB\u5199\u65B9\u5F0F\uFF0C<code>Read</code>/<code>Write</code>\u8BFB\u5199\u65B9\u5F0F \u548C <code>io.Copy</code>\u8BFB\u5199\u65B9\u5F0F</p><p>\u4ECE\u8F93\u51FA\u7ED3\u679C\u6765\u770B</p><p>\uFF081\uFF09\u4F7F\u7528<code>Read</code>/<code>Write</code>\u8BFB\u5199\u65B9\u5F0F\u6027\u80FD\u6709\u660E\u663E\u63D0\u5347\uFF081.5\u500D\u5DE6\u53F3\uFF09\uFF0C\u5199\u7F13\u5B58\u8D77\u5230\u4E86\u5F88\u5927\u7684\u4F5C\u7528</p><p>\uFF082\uFF09\u4F46\u5982\u679C\u4F7F\u7528<code>io.Copy</code>\u65B9\u5F0F\u8BFB\u5199\u6587\u4EF6\uFF0C\u4F1A\u4F7F\u7528<code>dst.ReadFrom(src)</code>\u65B9\u5F0F\u8BFB\u5199\uFF0C\u5BF9\u6211\u4EEC\u8FD9\u6B21\u6D4B\u8BD5\u6765\u8BF4\u5E76\u4E0D\u51C6\uFF0C\u7528\u4E0D\u7528<code>bufio</code>\uFF0C\u4E24\u8005\u82B1\u8D39\u7684\u65F6\u95F4\u51E0\u4E4E\u4E00\u81F4</p></blockquote><p><strong>\u8BFB\u6D4B\u8BD5</strong></p><details class="custom-container details"><summary>\u8BFB\u7F13\u51B2\u6027\u80FD\u6D4B\u8BD5</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;bufio&quot;</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;os&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">ReadBufTest</span><span class="token punctuation">(</span>srcFileName <span class="token builtin">string</span><span class="token punctuation">,</span> buffer <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u5B9A\u4E49\u53D8\u91CF</span>
	<span class="token keyword">var</span> <span class="token punctuation">(</span>
		total <span class="token builtin">int64</span>
		err   <span class="token builtin">error</span>
	<span class="token punctuation">)</span>
	start <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">UnixMilli</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6253\u5F00src\u6587\u4EF6</span>
	reader<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>srcFileName<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;\u6253\u5F00\u6587\u4EF6\u5931\u8D25: %s: %s\\n&quot;</span><span class="token punctuation">,</span> srcFileName<span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> reader<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u662F\u5426\u4F7F\u7528buffer</span>
	<span class="token keyword">if</span> buffer <span class="token punctuation">{</span>
		<span class="token comment">// \u751F\u6210buffer\u5E76\u5199\u5165</span>
		reader <span class="token operator">:=</span> bufio<span class="token punctuation">.</span><span class="token function">NewReaderSize</span><span class="token punctuation">(</span>reader<span class="token punctuation">,</span> <span class="token number">1024</span><span class="token operator">*</span><span class="token number">32</span><span class="token punctuation">)</span>

		<span class="token comment">// \u624B\u52A8\u8BFB\u53D6</span>
		buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">1024</span><span class="token punctuation">)</span>
		<span class="token keyword">for</span> <span class="token punctuation">{</span>
			n<span class="token punctuation">,</span> err <span class="token operator">:=</span> reader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				<span class="token keyword">if</span> err <span class="token operator">==</span> io<span class="token punctuation">.</span>EOF <span class="token punctuation">{</span>
					<span class="token keyword">break</span>
				<span class="token punctuation">}</span>
				log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;read error: %s\\n&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			total <span class="token operator">+=</span> <span class="token function">int64</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		<span class="token comment">// \u624B\u52A8\u8BFB\u53D6</span>
		buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">1024</span><span class="token punctuation">)</span>
		<span class="token keyword">for</span> <span class="token punctuation">{</span>
			n<span class="token punctuation">,</span> err <span class="token operator">:=</span> reader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				<span class="token keyword">if</span> err <span class="token operator">==</span> io<span class="token punctuation">.</span>EOF <span class="token punctuation">{</span>
					<span class="token keyword">break</span>
				<span class="token punctuation">}</span>
				log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;read error: %s\\n&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			total <span class="token operator">+=</span> <span class="token function">int64</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	delta <span class="token operator">:=</span> <span class="token function">float64</span><span class="token punctuation">(</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">UnixMilli</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> start<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">1000</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Read %d bytes in %.2f second: %s\\n&quot;</span><span class="token punctuation">,</span> total<span class="token punctuation">,</span> delta<span class="token punctuation">,</span> srcFileName<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup
	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">ReadBufTest</span><span class="token punctuation">(</span><span class="token string">&quot;D:\\\\iso\\\\CentOS-7-x86_64-DVD-1708.iso&quot;</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
		wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">ReadBufTest</span><span class="token punctuation">(</span><span class="token string">&quot;D:\\\\iso\\\\CentOS-7-x86_64-DVD-1708.iso&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
		wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token number">2022</span>/04/27 <span class="token number">13</span>:20:28 Read <span class="token number">4521459712</span> bytes <span class="token keyword">in</span> <span class="token number">1.15</span> second: D:<span class="token punctuation">\\</span>iso<span class="token punctuation">\\</span>CentOS-7-x86_64-DVD-1708.iso
<span class="token number">2022</span>/04/27 <span class="token number">13</span>:20:34 Read <span class="token number">4521459712</span> bytes <span class="token keyword">in</span> <span class="token number">7.15</span> second: D:<span class="token punctuation">\\</span>iso<span class="token punctuation">\\</span>CentOS-7-x86_64-DVD-1708.iso
</code></pre></div><blockquote><p>\u53EF\u4EE5\u770B\u5230\uFF0C\u8BFB\u7684\u6027\u80FD\u63D0\u5347\u662F\u5DE8\u5927\u7684\uFF0C6\u500D\u5DE6\u53F3\uFF0C\u5982\u679C\u820D\u5F97\u7528\u5185\u5B58\uFF0C\u6027\u80FD\u8FD8\u53EF\u4EE5\u7EE7\u7EED\u63D0\u5347</p></blockquote><h3 id="ioutils\u5305-\u5DF2\u88ABos-io\u5305\u4EE3\u66FF" tabindex="-1"><a class="header-anchor" href="#ioutils\u5305-\u5DF2\u88ABos-io\u5305\u4EE3\u66FF" aria-hidden="true">#</a> ioutils\u5305\uFF1A\u5DF2\u88ABos/io\u5305\u4EE3\u66FF</h3>`,20),fs=s("\u5B98\u65B9\u6587\u6863\uFF1A"),bs={href:"https://pkg.go.dev/io/ioutil",target:"_blank",rel:"noopener noreferrer"},ys=s("https://pkg.go.dev/io/ioutil"),hs=n("p",null,[s("\u4ECEGo 1.16\u5F00\u59CB\uFF0C\u540C\u6837\u7684\u529F\u80FD\u73B0\u5728\u7531\u5305"),n("code",null,"io"),s("\u5305\u6216"),n("code",null,"os"),s("\u5305\u63D0\u4F9B\uFF0C\u5728\u65B0\u4EE3\u7801\u4E2D\u5E94\u8BE5\u4F18\u5148\u4F7F\u7528\u8FD9\u4E9B\u5B9E\u73B0\u3002\u6709\u5173\u8BE6\u7EC6\u4FE1\u606F\uFF0C\u8BF7\u53C2\u9605\u7279\u5B9A\u529F\u80FD\u6587\u6863\u3002")],-1);function qs(ws,vs){const a=c("ExternalLinkIcon");return e(),u("div",null,[k,n("p",null,[i,n("a",r,[d,t(a)])]),n("p",null,[m,n("a",g,[f,t(a)])]),n("p",null,[b,n("a",y,[h,t(a)])]),q,n("p",null,[w,n("a",v,[x,t(a)])]),P,n("p",null,[S,n("a",_,[R,t(a)])]),A,n("p",null,[C,n("a",F,[N,t(a)])]),W,n("p",null,[T,n("a",G,[O,t(a)])]),U,n("p",null,[B,n("a",D,[L,t(a)])]),E,n("p",null,[I,n("a",M,[z,t(a)])]),n("p",null,[H,n("a",j,[V,t(a)])]),X,n("p",null,[J,n("a",K,[Y,t(a)])]),n("p",null,[Q,n("a",Z,[$,t(a)])]),nn,n("p",null,[sn,an,n("a",tn,[pn,t(a)])]),n("p",null,[on,cn,n("a",en,[un,t(a)])]),n("p",null,[ln,kn,n("a",rn,[dn,t(a)])]),mn,n("p",null,[gn,fn,bn,n("a",yn,[hn,t(a)])]),qn,n("details",wn,[vn,n("ul",null,[xn,n("li",null,[Pn,n("p",null,[Sn,n("a",_n,[Rn,t(a)])])]),An]),Cn]),Fn,n("p",null,[Nn,n("a",Wn,[Tn,t(a)])]),Gn,n("p",null,[On,n("a",Un,[Bn,t(a)])]),Dn,n("p",null,[Ln,En,n("a",In,[Mn,t(a)])]),zn,n("p",null,[Hn,jn,Vn,n("a",Xn,[Jn,t(a)])]),Kn,n("p",null,[Yn,n("a",Qn,[Zn,t(a)])]),$n,n("p",null,[ns,n("a",ss,[as,t(a)])]),ts,n("p",null,[ps,n("a",os,[cs,t(a)])]),es,n("p",null,[us,n("a",ls,[ks,t(a)])]),is,n("p",null,[rs,n("a",ds,[ms,t(a)])]),gs,n("p",null,[fs,n("a",bs,[ys,t(a)])]),hs])}var Ps=o(l,[["render",qs],["__file","Go.html.vue"]]);export{Ps as default};
