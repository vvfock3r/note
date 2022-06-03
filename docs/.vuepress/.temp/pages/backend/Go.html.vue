<template><div><h2 id="文档" tabindex="-1"><a class="header-anchor" href="#文档" aria-hidden="true">#</a> 文档</h2>
<p>官网：<a href="https://golang.google.cn/" target="_blank" rel="noopener noreferrer">https://golang.google.cn/<ExternalLinkIcon/></a></p>
<p>安装文档：<a href="https://golang.google.cn/doc/install" target="_blank" rel="noopener noreferrer">https://golang.google.cn/doc/install<ExternalLinkIcon/></a></p>
<p>Go命令文档：<a href="https://golang.google.cn/cmd/go/" target="_blank" rel="noopener noreferrer">https://golang.google.cn/cmd/go/<ExternalLinkIcon/></a></p>
<h2 id="项目管理" tabindex="-1"><a class="header-anchor" href="#项目管理" aria-hidden="true">#</a> 项目管理</h2>
<h3 id="环境变量" tabindex="-1"><a class="header-anchor" href="#环境变量" aria-hidden="true">#</a> 环境变量</h3>
<p><strong>查看/设置环境变量</strong></p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>go <span class="token function">env</span> 						<span class="token comment"># 查看所有环境变量</span>
go <span class="token function">env</span> -json				<span class="token comment"># 查看所有环境变量，json格式</span>
go <span class="token function">env</span> <span class="token punctuation">[</span>environment<span class="token punctuation">]</span>		<span class="token comment"># 查看某个具体的环境变量</span>
go <span class="token function">env</span> -w <span class="token assign-left variable">GO111MODULE</span><span class="token operator">=</span>on	<span class="token comment"># 设置环境变量，永久生效</span>
go <span class="token builtin class-name">help</span> <span class="token function">env</span>					<span class="token comment"># 查看env命令帮助</span>
</code></pre></div><p><strong>重要环境变量</strong></p>
<table>
<thead>
<tr>
<th>环境变量</th>
<th>说明</th>
<th>设置命令</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>GOROOT</code></td>
<td>Go的安装目录</td>
<td>一般不用自己设置</td>
</tr>
<tr>
<td><code v-pre>GOPATH</code></td>
<td>代表Go的工作区，可以是一个目录，也可以是多个目录，使用逗号分隔?<br />官方说明文档：https://github.com/golang/go/wiki/GOPATH</td>
<td><code v-pre>go env -w GOPATH=/usr/local/gopath</code></td>
</tr>
<tr>
<td><code v-pre>GO111MODULE</code></td>
<td>Go 1.11版本增加的模块管理机制，强烈建议开启</td>
<td><code v-pre>go env -w GO111MODULE=on</code></td>
</tr>
<tr>
<td><code v-pre>GOPROXY</code></td>
<td>代理地址，由于墙的因素建议修改<br />默认值：https://proxy.golang.org,direct<br />七牛云：https://goproxy.cn,direct</td>
<td><code v-pre>go env -w GOPROXY=https://goproxy.cn,direct</code></td>
</tr>
<tr>
<td><code v-pre>GOSUMDB</code></td>
<td>用来校验下载的包的安全性，一般情况下不需要修改<br />默认值：<code v-pre>sum.golang.org</code><br />关闭：<code v-pre>off</code></td>
<td><code v-pre>go env -w GOSUMDB=off</code></td>
</tr>
</tbody>
</table>
<p>更多环境变量：https://golang.google.cn/cmd/go/#hdr-Environment_variables 或<code v-pre>go help environment</code></p>
<h3 id="单文件应用" tabindex="-1"><a class="header-anchor" href="#单文件应用" aria-hidden="true">#</a> 单文件应用</h3>
<p><code v-pre>main.go</code></p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main
 
<span class="token keyword">import</span> <span class="token string">"fmt"</span>
 
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Hello World!"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>说明：</p>
<ul>
<li>
<p><code v-pre>package</code>声明我自己的包名</p>
</li>
<li>
<p><code v-pre>import</code> 导入其他包，这里<code v-pre>fmt</code>是内置的一个包</p>
</li>
<li>
<p><code v-pre>func </code>声明函数</p>
</li>
<li>
<p>程序执行的入口必须是<code v-pre>main</code>包和<code v-pre>main</code>方法，文件名任意</p>
</li>
<li>
<p>两种运行方式</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># (1) 编译和运行</span>
go build main.go        <span class="token comment"># 编译</span>
./main.exe              <span class="token comment"># 运行</span>

<span class="token comment"># (2) 编译并运行</span>
go run main.go
</code></pre></div></li>
</ul>
<p>问题：我要导入一个第三方包会报错，比如使用gin来启动一个HTTP Server，这是怎么回事呢？</p>
<p><code v-pre>main.go</code></p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat main.go </span>
package main

<span class="token function">import</span> <span class="token punctuation">(</span>
        <span class="token string">"github.com/gin-gonic/gin"</span>
        <span class="token string">"log"</span>
        <span class="token string">"net/http"</span>
<span class="token punctuation">)</span>

func <span class="token function-name function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        // 监听地址
        addr :<span class="token operator">=</span> <span class="token string">"127.0.0.1:80"</span>

        // 实例化Gin路由引擎
        r :<span class="token operator">=</span> gin.Default<span class="token punctuation">(</span><span class="token punctuation">)</span>

        // 注册路由
        r.GET<span class="token punctuation">(</span><span class="token string">"/"</span>, func<span class="token punctuation">(</span>c *gin.Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                c.String<span class="token punctuation">(</span>http.StatusOK, <span class="token string">"Hello Gin!<span class="token entity" title="\n">\n</span>"</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>

        // 启动Gin Server
        log.Fatalln<span class="token punctuation">(</span>r.Run<span class="token punctuation">(</span>addr<span class="token punctuation">))</span>
<span class="token punctuation">}</span>

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># go run main.go   # 在当前目录及父目录没有找到go.mod文件</span>
main.go:4:2: no required module provides package github.com/gin-gonic/gin: go.mod <span class="token function">file</span> not found <span class="token keyword">in</span> current directory or any parent directory<span class="token punctuation">;</span> see <span class="token string">'go help modules'</span>
</code></pre></div><p>我们将在<code v-pre>Go Modules</code>来解决这个问题</p>
<h3 id="go-modules" tabindex="-1"><a class="header-anchor" href="#go-modules" aria-hidden="true">#</a> Go Modules</h3>
<p>文档：<a href="https://go.dev/ref/mod" target="_blank" rel="noopener noreferrer">https://go.dev/ref/mod<ExternalLinkIcon/></a></p>
<p>从<code v-pre>Go1.11</code>开始，官方推出Go module作为包管理工具</p>
<h4 id="_1-开启go-module" tabindex="-1"><a class="header-anchor" href="#_1-开启go-module" aria-hidden="true">#</a> （1）开启Go Module</h4>
<p><code v-pre>GO111MODULE</code>变量控制是否启用go modules，他有3个值：</p>
<ul>
<li><code v-pre>on</code>：开启go module</li>
<li><code v-pre>off</code>：关闭go module</li>
<li><code v-pre>auto</code>：根据项目配置自动选择使用<code v-pre>go module</code>还是<code v-pre>go path</code></li>
</ul>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 不管开启没开启，都重新开启一遍</span>
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token punctuation">\</span>Desktop<span class="token punctuation">\</span>Notes<span class="token operator">></span>go <span class="token function">env</span> -w <span class="token assign-left variable">GO111MODULE</span><span class="token operator">=</span>on
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token punctuation">\</span>Desktop<span class="token punctuation">\</span>Notes<span class="token operator">></span>go <span class="token function">env</span> GO111MODULE
on
</code></pre></div><h4 id="_2-初始化项目-go-mod-init" tabindex="-1"><a class="header-anchor" href="#_2-初始化项目-go-mod-init" aria-hidden="true">#</a> （2）初始化项目：<code v-pre>go mod init</code></h4>
<p>文档：<a href="https://go.dev/ref/mod#go-mod-init" target="_blank" rel="noopener noreferrer">https://go.dev/ref/mod#go-mod-init<ExternalLinkIcon/></a></p>
<p><strong>基础使用</strong></p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 先创建我们的项目目录demo</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># mkdir demo</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cd demo/</span>

<span class="token comment"># 然后初始化项目</span>
<span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># go mod init demo</span>
go: creating new go.mod: module demo

<span class="token comment"># 看一下都做了什么事：生成了一个文件go.mod</span>
<span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># ll</span>
total <span class="token number">4</span>
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">21</span> May <span class="token number">30</span> <span class="token number">19</span>:27 go.mod

<span class="token comment"># 看看这个文件内容</span>
<span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># cat go.mod </span>
module demo		<span class="token comment"># 模块名</span>

go <span class="token number">1.18</span>			<span class="token comment"># go版本</span>
</code></pre></div><p><strong>我们来看几个go明星项目的module名是如何写的</strong></p>
<table>
<thead>
<tr>
<th>Github地址</th>
<th>Module Name</th>
</tr>
</thead>
<tbody>
<tr>
<td>https://github.com/containerd/containerd</td>
<td><code v-pre>module github.com/containerd/containerd</code></td>
</tr>
<tr>
<td>https://github.com/gin-gonic/gin</td>
<td><code v-pre>module github.com/gin-gonic/gin</code></td>
</tr>
<tr>
<td>https://github.com/pingcap/tidb</td>
<td><code v-pre>module github.com/pingcap/tidb</code></td>
</tr>
</tbody>
</table>
<p>仔细研究发现他们的格式都是<code v-pre>github.com/用户名/项目名</code>，这是为啥？，先不管他，后面再说</p>
<p><strong>继续使用gin</strong></p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># ls -l</span>
total <span class="token number">8</span>
-rw-r--r-- <span class="token number">1</span> root root  <span class="token number">21</span> May <span class="token number">30</span> <span class="token number">19</span>:49 go.mod
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">327</span> May <span class="token number">30</span> <span class="token number">19</span>:17 main.go
<span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># cat main.go</span>
package main

<span class="token function">import</span> <span class="token punctuation">(</span>
        <span class="token string">"github.com/gin-gonic/gin"</span>
        <span class="token string">"log"</span>
        <span class="token string">"net/http"</span>
<span class="token punctuation">)</span>

func <span class="token function-name function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        // 监听地址
        addr :<span class="token operator">=</span> <span class="token string">"127.0.0.1:80"</span>

        // 实例化Gin路由引擎
        r :<span class="token operator">=</span> gin.Default<span class="token punctuation">(</span><span class="token punctuation">)</span>

        // 注册路由
        r.GET<span class="token punctuation">(</span><span class="token string">"/"</span>, func<span class="token punctuation">(</span>c *gin.Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                c.String<span class="token punctuation">(</span>http.StatusOK, <span class="token string">"Hello Gin!<span class="token entity" title="\n">\n</span>"</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>

        // 启动Gin Server
        log.Fatalln<span class="token punctuation">(</span>r.Run<span class="token punctuation">(</span>addr<span class="token punctuation">))</span>
<span class="token punctuation">}</span>
<span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># go run main.go		# 这次报错不一样了，让我们使用go get下载gin</span>
main.go:4:2: no required module provides package github.com/gin-gonic/gin<span class="token punctuation">;</span> to <span class="token function">add</span> it:
        go get github.com/gin-gonic/gin
</code></pre></div><h4 id="_3-下载第三方包-go-get" tabindex="-1"><a class="header-anchor" href="#_3-下载第三方包-go-get" aria-hidden="true">#</a> （3）下载第三方包：<code v-pre>go get</code></h4>
<p>文档：<a href="https://go.dev/ref/mod#go-get" target="_blank" rel="noopener noreferrer">https://go.dev/ref/mod#go-get<ExternalLinkIcon/></a></p>
<p>特点：</p>
<ul>
<li>必须在项目目录(含有go.mod的目录)使用<code v-pre>go get</code>，无法在全局目录使用</li>
<li><code v-pre>go get</code>用来管理第三方包版本问题，会自动维护go.mod和go.sum文件</li>
<li><code v-pre>go get</code>下载的包放在GOPATH/pkg目录内</li>
<li>若不指定版本号只能更新到<code v-pre>v1.x.x</code>最新版，若第三方包没有版本号（Tag）则会更新到最后一次提交的代码</li>
</ul>
<details class="custom-container details"><summary>基础用法</summary>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 下载</span>
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

<span class="token comment"># 查看go.mod, 将gin及其依赖的包都写入到go.mod文件中了</span>
<span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># cat go.mod</span>
module demo

go <span class="token number">1.18</span>

<span class="token comment"># require里面代表依赖的包</span>
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

<span class="token comment"># 我们下载的包在GOPATH目录下</span>
<span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># go env GOPATH</span>
/usr/local/gopath
<span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># ls -l /usr/local/gopath/pkg/mod/</span>
total <span class="token number">20</span>
drwxr-xr-x <span class="token number">3</span> root root <span class="token number">4096</span> May <span class="token number">30</span> <span class="token number">20</span>:26 cache
drwxr-xr-x <span class="token number">9</span> root root <span class="token number">4096</span> May <span class="token number">30</span> <span class="token number">20</span>:26 github.com
drwxr-xr-x <span class="token number">3</span> root root <span class="token number">4096</span> May <span class="token number">30</span> <span class="token number">20</span>:26 golang.org
drwxr-xr-x <span class="token number">3</span> root root <span class="token number">4096</span> May <span class="token number">30</span> <span class="token number">20</span>:26 google.golang.org
drwxr-xr-x <span class="token number">3</span> root root <span class="token number">4096</span> May <span class="token number">30</span> <span class="token number">20</span>:26 gopkg.in

<span class="token comment"># 还会生成一个go.sum文件，此文件不需要我们管理，先不做深入研究</span>
<span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># ls -lh go.sum </span>
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">9</span>.1K May <span class="token number">30</span> <span class="token number">20</span>:32 go.sum
</code></pre></div></details>
<details class="custom-container details"><summary>安装最新版、安装指定版、移除版本、升级依赖</summary>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 安装最新版本，以下两种方法都可以，这会下载最新的tag版本</span>
<span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># go get github.com/gin-gonic/gin</span>
<span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># go get github.com/gin-gonic/gin@latest</span>

<span class="token comment"># 安装指定版本</span>
<span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># go get github.com/gin-gonic/gin@v1.7.0</span>
go: downgraded github.com/gin-gonic/gin v1.8.0 <span class="token operator">=</span><span class="token operator">></span> v1.7.0

<span class="token comment"># 将包从go.mod中移除（本地并不会删除）</span>
<span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># go get github.com/gin-gonic/gin@none</span>
go: removed github.com/gin-gonic/gin v1.7.0

<span class="token comment"># 查看本地包</span>
<span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># ll /usr/local/gopath/pkg/mod/github.com/gin-gonic/</span>
total <span class="token number">8</span>
dr-xr-xr-x <span class="token number">9</span> root root <span class="token number">4096</span> May <span class="token number">30</span> <span class="token number">20</span>:32 gin@v1.7.0
dr-xr-xr-x <span class="token number">9</span> root root <span class="token number">4096</span> May <span class="token number">30</span> <span class="token number">20</span>:26 gin@v1.8.0

<span class="token comment"># 升级依赖（这会升级所有依赖）</span>
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
go: upgraded github.com/go-playground/validator/v10 v10.10.0 <span class="token operator">=</span><span class="token operator">></span> v10.11.0
go: upgraded github.com/modern-go/concurrent v0.0.0-20180228061459-e0a39a4cb421 <span class="token operator">=</span><span class="token operator">></span> v0.0.0-20180306012644-bacd9c7ef1dd
go: upgraded golang.org/x/crypto v0.0.0-20210711020723-a769d52b0f97 <span class="token operator">=</span><span class="token operator">></span> v0.0.0-20220525230936-793ad666bf5e
go: upgraded golang.org/x/net v0.0.0-20210226172049-e18ecbb05110 <span class="token operator">=</span><span class="token operator">></span> v0.0.0-20220526153639-5463443f8c37
go: upgraded golang.org/x/sys v0.0.0-20210806184541-e5e7981a1069 <span class="token operator">=</span><span class="token operator">></span> v0.0.0-20220520151302-bc2c85ada10a
go: upgraded golang.org/x/text v0.3.6 <span class="token operator">=</span><span class="token operator">></span> v0.3.7

<span class="token comment"># 升级依赖go.mod变化</span>
<span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># cat go.mod </span>
module demo

go <span class="token number">1.18</span>

require github.com/gin-gonic/gin v1.8.0		// 这个原来在下面，并且有// indirect，现在没有了

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
</code></pre></div></details>
<h4 id="_4-安装可执行文件-go-install" tabindex="-1"><a class="header-anchor" href="#_4-安装可执行文件-go-install" aria-hidden="true">#</a> （4）安装可执行文件：<code v-pre>go install</code></h4>
<p>文档：<a href="https://go.dev/ref/mod#go-install" target="_blank" rel="noopener noreferrer">https://go.dev/ref/mod#go-install<ExternalLinkIcon/></a></p>
<p>特点：</p>
<ul>
<li>可以在全局使用<code v-pre>go install</code>，不会维护go.mod和go.sum文件</li>
<li>使用<code v-pre>go install github.com/xxx/@版本</code>,必须加上版本，如果是最新版则是<code v-pre>latest</code></li>
<li>其原理是：
<ul>
<li>下载第三方包到<code v-pre>GOPATH/pkg</code></li>
<li>然后编译（入口是<code v-pre>main</code>包的<code v-pre>main</code>方法）</li>
<li>将可执行文件放在<code v-pre>GOPATH/bin</code>目录下</li>
</ul>
</li>
<li>可以使用<code v-pre>go install</code>的第三方包，一般都有一个<code v-pre>main</code>包和<code v-pre>main</code>方法</li>
</ul>
<p>举几个例子</p>
<table>
<thead>
<tr>
<th>Github</th>
<th>main</th>
</tr>
</thead>
<tbody>
<tr>
<td>https://github.com/davecheney/httpstat</td>
<td><code v-pre>main.go</code></td>
</tr>
<tr>
<td>https://github.com/Code-Hex/pget</td>
<td><code v-pre>cmd/pget/main.go</code></td>
</tr>
</tbody>
</table>
<h4 id="_5-依赖整理-go-mod-tidy" tabindex="-1"><a class="header-anchor" href="#_5-依赖整理-go-mod-tidy" aria-hidden="true">#</a> （5）依赖整理：go mod tidy</h4>
<p>很常用的一个命令，可多次执行</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost demo<span class="token punctuation">]</span><span class="token comment"># go help mod</span>
Go mod provides access to operations on modules.

Note that support <span class="token keyword">for</span> modules is built into all the go commands,
not just <span class="token string">'go mod'</span><span class="token builtin class-name">.</span> For example, day-to-day adding, removing, upgrading,
and downgrading of dependencies should be <span class="token keyword">done</span> using <span class="token string">'go get'</span><span class="token builtin class-name">.</span>
See <span class="token string">'go help modules'</span> <span class="token keyword">for</span> an overview of module functionality.

Usage:

        go mod <span class="token operator">&lt;</span>command<span class="token operator">></span> <span class="token punctuation">[</span>arguments<span class="token punctuation">]</span>

The commands are:

        download    download modules to <span class="token builtin class-name">local</span> cache
        edit        edit go.mod from tools or scripts
        graph       print module requirement graph
        init        initialize new module <span class="token keyword">in</span> current directory
        tidy        <span class="token function">add</span> missing and remove unused modules			<span class="token comment"># 添加缺少的包，并移除未使用的包</span>
        vendor      <span class="token function">make</span> vendored copy of dependencies
        verify      verify dependencies have expected content
        why         explain why packages or modules are needed

Use <span class="token string">"go help mod &lt;command>"</span> <span class="token keyword">for</span> <span class="token function">more</span> information about a command.
</code></pre></div><h4 id="_6-发布公共模块到github🎉" tabindex="-1"><a class="header-anchor" href="#_6-发布公共模块到github🎉" aria-hidden="true">#</a> （6）发布公共模块到GitHub🎉</h4>
<details class="custom-container details"><summary>（1）先跑通一个最简单的发布流程</summary>
<p>① 首先在Github上新建一个仓库test</p>
<p>② 其次克隆代码，使用go mod初始化，要求module name必须是绝对路径（<code v-pre>github.com/用户名/项目名</code>）</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 克隆</span>
<span class="token function">git</span> clone https://github.com/vvfock3r/test.git

<span class="token comment"># 初始化Go模块</span>
go mod init github.com/vvfock3r/test
</code></pre></div><p>③ 提交代码到test仓库</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 新建一个文件utils.go</span>
package <span class="token builtin class-name">test</span>

func Add<span class="token punctuation">(</span>x, y int<span class="token punctuation">)</span> int <span class="token punctuation">{</span>
	<span class="token builtin class-name">return</span> x + y
<span class="token punctuation">}</span>

<span class="token comment"># 提交</span>
<span class="token function">git</span> <span class="token function">add</span> *
<span class="token function">git</span> commit -m <span class="token string">"test"</span>
<span class="token function">git</span> push -u origin main
</code></pre></div><p>④ 使用GoLand新建一个Go项目demo，进行测试</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 添加依赖包</span>
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token punctuation">\</span>GolandProjects<span class="token punctuation">\</span>demo<span class="token operator">></span>go get github.com/vvfock3r/test 
go: downloading github.com/vvfock3r/test v0.0.0-20220601023617-b9d901edce34

<span class="token comment"># 编写main.go</span>
package main

<span class="token function">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"github.com/vvfock3r/test"</span>
<span class="token punctuation">)</span>

func <span class="token function-name function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt.Println<span class="token punctuation">(</span>test.Add<span class="token punctuation">(</span><span class="token number">1</span>, <span class="token number">2</span><span class="token punctuation">))</span>
<span class="token punctuation">}</span>

<span class="token comment"># 测试执行</span>
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token punctuation">\</span>GolandProjects<span class="token punctuation">\</span>demo<span class="token operator">></span>go run <span class="token builtin class-name">.</span>      
<span class="token number">3</span>

<span class="token comment"># 查看go.mod</span>
module demo

go <span class="token number">1.18</span>

require github.com/vvfock3r/test v0.0.0-20220601023617-b9d901edce34 // indirect
</code></pre></div><p>总结几个关键点：</p>
<p>（1）第三方模块的模块名：应使用<code v-pre>github.com/用户名/项目名</code></p>
<p>（2）第三方模块的版本：若无版本，Go自动添加一个版本<code v-pre>v0.0.0-时间-提交ID</code></p>
<ul>
<li><code v-pre>v0.0.0</code>是固定的</li>
<li>时间格式<code v-pre>年月日时分秒</code></li>
<li>提交ID长度<code v-pre>12</code>位</li>
</ul>
<p>从上面可以看出，一次提交可以认为是一个版本</p>
</details>
<details class="custom-container details"><summary>（2）更新第三方包延迟问题</summary>
<p>描述：我们对第三方模块<code v-pre>test</code>随便做一点修改并提交到GitHub，在<code v-pre>demo</code>项目中测试更新<code v-pre>test</code>模块是否正常</p>
<p>结果：第三方包刚刚更新的代码，我们无法立马拉取到新代码，测试过的方法有：</p>
<ul>
<li>使用<code v-pre>go get -u github.com/vvfock3r/test</code>更新，无效</li>
<li>删除<code v-pre>go.mod</code>和本地<code v-pre>GOPATH</code>下的<code v-pre>test</code>模块相关的任何东西，然后使用<code v-pre>go get</code>重新下载，无效</li>
</ul>
<p>原因是：我们<code v-pre>go get</code>下载包并不是直接从<code v-pre>github.com</code>下载的，而是通过<code v-pre>GOPROXY</code>指定的镜像站下载的（通过<code v-pre>go get -x</code>可以看到），而镜像站存在一定延迟从而导致不能马上下载最新包</p>
<p>解决办法：使用<code v-pre>go get github.com/vvfock3r/test@提交ID</code>来进行更新（提交ID并不一定是完整的ID），可以在下图中这个位置找到最新提交ID</p>
<p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220601140958608.png" alt="image-20220601140958608"></p>
</details>
<details class="custom-container details"><summary>（3）指定第三方包的版本</summary>
<p>如果我想让用户使用<code v-pre>go get github.com/vvfock3r/test@v1.0.0</code>这样的方式来安装指定版本，该如何做呢？</p>
<p>这里的<code v-pre>v1.0.0</code>，就是仓库的<code v-pre>Tag</code>名称，但是有几点注意事项：</p>
<ul>
<li>
<p>Tag名称必须是类似<code v-pre>v1.0.0</code>这种规则，如果是<code v-pre>v1.0</code>这样是拉取不到对应版本的</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token punctuation">\</span>GolandProjects<span class="token punctuation">\</span>demo<span class="token operator">></span>go get github.com/vvfock3r/test@v1.0
go: github.com/vvfock3r/test@v1.0: no matching versions <span class="token keyword">for</span> query <span class="token string">"v1.0"</span>
</code></pre></div></li>
<li>
<p>对于<code v-pre>v2.0.0</code>及以上版本，我们如果直接使用<code v-pre>go get github.com/vvfock3r/test@v2.0.0</code>会报错</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token punctuation">\</span>GolandProjects<span class="token punctuation">\</span>demo<span class="token operator">></span>go get github.com/vvfock3r/test@v2.0.0
go: github.com/vvfock3r/test@v2.0.0: invalid version: module contains a go.mod file, so module path must match major version <span class="token punctuation">(</span><span class="token string">"github.com/vvfock3r/test/v2"</span><span class="token punctuation">)</span>

<span class="token comment"># 原因也给出来了：模块路径必须包含主版本号</span>
</code></pre></div><p>这个时候我们有两种解决方案：</p>
<ul>
<li>永远不升级到<code v-pre>v2.x.x</code>，一直使用v1的版本比如<code v-pre>v1.0.0</code>、<code v-pre>v1.0.1</code>、<code v-pre>@v1.999.999</code></li>
<li>升级到<code v-pre>v2.x.x</code>，需要在项目根目录下创建一个<code v-pre>v2</code>的目录，代表这是一个全新的版本</li>
</ul>
</li>
<li>
<p>其他：Github上新打的Tag可以直接在命令行使用<code v-pre>go get </code>下载，没有GOPROXY缓存的问题（指定版本为<code v-pre>latest</code>除外）</p>
</li>
</ul>
</details>
<details class="custom-container details"><summary>（4）replace简介</summary>
<p>replace可以让我们对包进行替换，可以达到这样的效果：导入的是<code v-pre>a</code>包，但实际使用的是<code v-pre>b</code>包</p>
<p>使用replace可以直接修改go.mod文件，也可以使用<code v-pre>go mod edit -replace</code>命令（推荐）</p>
<p>语法</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 语法</span>
<span class="token comment"># go mod edit -replace 旧地址=新地址</span>

<span class="token comment"># 示例：将v1.1.2替换为v1.1.1版本，也就是降低了一个版本</span>
go mod edit -replace github.com/vvfock3r/test@v1.1.2<span class="token operator">=</span>github.com/vvfock3r/test@v1.1.1

<span class="token comment"># 查看一下go.mod文件</span>
module demo
go <span class="token number">1.18</span>
require github.com/vvfock3r/test v1.1.2
replace github.com/vvfock3r/test v1.1.2 <span class="token operator">=</span><span class="token operator">></span> github.com/vvfock3r/test v1.1.1		<span class="token comment"># replace</span>

<span class="token comment"># 说明</span>
虽然go.mod中require是v1.1.2版本，但实际上在使用v1.1.1版本
</code></pre></div></details>
<h2 id="前置知识" tabindex="-1"><a class="header-anchor" href="#前置知识" aria-hidden="true">#</a> 前置知识</h2>
<h3 id="声明关键字" tabindex="-1"><a class="header-anchor" href="#声明关键字" aria-hidden="true">#</a> 声明关键字</h3>
<table>
<thead>
<tr>
<th>关键字</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>var</code></td>
<td>声明变量</td>
</tr>
<tr>
<td><code v-pre>const</code></td>
<td>声明常量</td>
</tr>
<tr>
<td><code v-pre>func</code></td>
<td>声明函数</td>
</tr>
<tr>
<td><code v-pre>type</code></td>
<td>声明类型</td>
</tr>
</tbody>
</table>
<h3 id="变量和常量" tabindex="-1"><a class="header-anchor" href="#变量和常量" aria-hidden="true">#</a> 变量和常量</h3>
<p><strong>声明变量并赋值</strong></p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 声明单个变量</span>
	<span class="token comment">//	语法1：var 变量名 变量类型 = 变量值	-- 推荐使用</span>
	<span class="token comment">//	语法2：变量名 := 变量值			-- 推荐使用,但仅支持在函数内部使用</span>
	<span class="token keyword">var</span> Monday <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">1</span>
	Tuesday <span class="token operator">:=</span> <span class="token number">2</span>

	<span class="token comment">// 声明多个变量</span>
	<span class="token comment">// 语法1:</span>
	<span class="token comment">//		var (                                   -- 推荐使用</span>
	<span class="token comment">//			变量名1 变量类型 = 变量值</span>
	<span class="token comment">//			变量名2 变量类型 = 变量值</span>
	<span class="token comment">//		)</span>
	<span class="token comment">// 语法2: var 变量名1,变量名2 变量类型 = 变量值1, 变量值2</span>
	<span class="token keyword">var</span> <span class="token punctuation">(</span>
		Wednesday <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">3</span>
		Thursday  <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">4</span>
	<span class="token punctuation">)</span>

	<span class="token keyword">var</span> Friday<span class="token punctuation">,</span> Saturday<span class="token punctuation">,</span> Sunday <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span>

	<span class="token comment">// 函数内声明的变量必须要使用，否则编译会报错；函数外的变量可以声明但不使用</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"周一: "</span><span class="token punctuation">,</span> Monday<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"周二: "</span><span class="token punctuation">,</span> Tuesday<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"周三: "</span><span class="token punctuation">,</span> Wednesday<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"周四: "</span><span class="token punctuation">,</span> Thursday<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"周五: "</span><span class="token punctuation">,</span> Friday<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"周六: "</span><span class="token punctuation">,</span> Saturday<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"周日: "</span><span class="token punctuation">,</span> Sunday<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>周一:  <span class="token number">1</span>
周二:  <span class="token number">2</span>
周三:  <span class="token number">3</span>
周四:  <span class="token number">4</span>
周五:  <span class="token number">5</span>
周六:  <span class="token number">6</span>
周日:  <span class="token number">7</span>
</code></pre></div><br />
<p><strong>声明变量不赋值</strong></p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 声明不赋值,默认会使用该类型的零值</span>
	<span class="token keyword">var</span> Monday <span class="token builtin">int</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>Monday<span class="token punctuation">)</span> <span class="token comment">// 0</span>
<span class="token punctuation">}</span>
</code></pre></div><br />
<p><strong>声明常量</strong></p>
<p>常量使用<code v-pre>const</code>关键字声明，与<code v-pre>var</code>用法很类似，这里主要演示一下特殊的地方</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>        
	<span class="token comment">// 方式1</span>
	<span class="token keyword">const</span> <span class="token punctuation">(</span>
		Monday  <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">4</span>
		Tuesday     <span class="token comment">// 在同一个括号内，若变量值不写，则保持跟距离最近的一个变量 类型和值一样</span>
	<span class="token punctuation">)</span>

	<span class="token comment">// 方式2</span>
	<span class="token keyword">const</span> <span class="token punctuation">(</span>
		Wednesday <span class="token operator">=</span> <span class="token boolean">iota</span> <span class="token operator">+</span> <span class="token number">3</span> <span class="token comment">// iota初始为0,  0 + 3 = 3</span>
		Thursday             <span class="token comment">// 每新增一行iota自增长１, 1 + 3 = 4</span>
		Friday               <span class="token comment">//  同理, 2 + 3 =5</span>
		Saturday
		Sunday
	<span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"周一: "</span><span class="token punctuation">,</span> Monday<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"周二: "</span><span class="token punctuation">,</span> Tuesday<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"周三: "</span><span class="token punctuation">,</span> Wednesday<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"周四: "</span><span class="token punctuation">,</span> Thursday<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"周五: "</span><span class="token punctuation">,</span> Friday<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"周六: "</span><span class="token punctuation">,</span> Saturday<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"周日: "</span><span class="token punctuation">,</span> Sunday<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>周一:  <span class="token number">4</span>
周二:  <span class="token number">4</span>
周三:  <span class="token number">3</span>
周四:  <span class="token number">4</span>
周五:  <span class="token number">5</span>
周六:  <span class="token number">6</span>
周日:  <span class="token number">7</span>
</code></pre></div><h3 id="指针" tabindex="-1"><a class="header-anchor" href="#指针" aria-hidden="true">#</a> 指针</h3>
<p>指针的值是变量的内存地址，使用指针可以在无需知道变量名字的情况下，间接读取或更新变量的值</p>
<p>指针类型的零值是nil</p>
<p>指针是可以比较的，当两个指针指向同一个变量或两个指针都为nil的时他们才相等</p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// (1) 通过变量获取指针</span>
	name <span class="token operator">:=</span> <span class="token string">"Bob"</span>     <span class="token comment">// 声明变量</span>
	namePtr <span class="token operator">:=</span> <span class="token operator">&amp;</span>name  <span class="token comment">// 获取这个变量的指针赋值给 namePtr</span>
	<span class="token operator">*</span>namePtr <span class="token operator">=</span> <span class="token string">"Jack"</span> <span class="token comment">// 通过指针获取变量，并给这个变量赋值</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>     <span class="token comment">// Jack</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">*</span>namePtr<span class="token punctuation">)</span> <span class="token comment">// Jack</span>

	<span class="token comment">// (2) 直接声明指针并赋值</span>
	<span class="token keyword">var</span> a <span class="token operator">*</span><span class="token builtin">string</span> <span class="token operator">=</span> namePtr
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">*</span>a<span class="token punctuation">)</span> <span class="token comment">// Jack</span>

	<span class="token comment">// (3) 直接声明空指针,后续赋值会引发panic, 原因是并没有进行内存分配,导致无法赋值</span>
	<span class="token keyword">var</span> b <span class="token operator">*</span><span class="token builtin">int</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span> <span class="token comment">// &lt;nil>, 指针类型的零值为nil, 这是一个空指针</span>
	<span class="token comment">//fmt.Println(*b) // 这会报错, 因为我们自己手动这样创建的指针类型,还没有进行内存分配,解决办法可以使用new和make</span>

	<span class="token comment">// (4) 对于值类型数据结构,使用new声明和分配内存并返回指针变量</span>
	c <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">)</span>
	<span class="token operator">*</span>c <span class="token operator">=</span> <span class="token number">200</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">*</span>c<span class="token punctuation">)</span>

	<span class="token comment">// (5) 对与引用数据结构,使用make声明和分配内存并返回变量(注意返回的不是指针,因为引用类型就没有必要用指针了)</span>
	s1 <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
	s1<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">300</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span>        <span class="token comment">// [300]</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%T\n"</span><span class="token punctuation">,</span> s1<span class="token punctuation">)</span> <span class="token comment">// []int</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="print系列函数" tabindex="-1"><a class="header-anchor" href="#print系列函数" aria-hidden="true">#</a> print系列函数</h3>
<p>文档：<a href="https://pkg.go.dev/fmt" target="_blank" rel="noopener noreferrer">https://pkg.go.dev/fmt<ExternalLinkIcon/></a></p>
<table>
<thead>
<tr>
<th>分类</th>
<th>函数</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>输出到控制台</td>
<td><code v-pre>fmt.Print(string)</code></td>
<td>不换行</td>
</tr>
<tr>
<td></td>
<td><code v-pre>fmt.Println(string)</code></td>
<td>自动换行，<code v-pre>ln</code>意为<code v-pre>line</code></td>
</tr>
<tr>
<td></td>
<td><code v-pre>fmt.Printf(格式化字符, 字符串)</code></td>
<td>格式化输出</td>
</tr>
<tr>
<td>作为返回值返回</td>
<td><code v-pre>fmt.Sprint()</code></td>
<td></td>
</tr>
<tr>
<td></td>
<td><code v-pre>fmt.Sprintln()</code></td>
<td></td>
</tr>
<tr>
<td></td>
<td><code v-pre>fmt.Sprintf(格式化字符, 字符串对象)</code></td>
<td></td>
</tr>
<tr>
<td>接收用户输入</td>
<td><code v-pre>fmt.Scan(指针对象)</code></td>
<td>将控制台接收的值 赋值给指针对象</td>
</tr>
</tbody>
</table>
<p><code v-pre>printf</code>格式化字符串</p>
<table>
<thead>
<tr>
<th>分类</th>
<th>修饰符</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>常用</td>
<td><code v-pre>%T</code></td>
<td>数据类型</td>
</tr>
<tr>
<td></td>
<td><code v-pre>%v</code></td>
<td>获取数据的值，如果实现了 <code v-pre>error </code>接口，仅表示错误消息</td>
</tr>
<tr>
<td></td>
<td><code v-pre>%+v</code></td>
<td>获取数据的值，如果是结构体会携带字段名</td>
</tr>
<tr>
<td></td>
<td><code v-pre>%#v</code></td>
<td>获取数据的值，如果是结构体会携带结构体名和字段名</td>
</tr>
<tr>
<td>指针</td>
<td><code v-pre>%p</code></td>
<td>指针地址（带 <code v-pre>0x</code>）</td>
</tr>
<tr>
<td></td>
<td><code v-pre>%#p</code></td>
<td>指针地址（不带 <code v-pre>0x</code>）</td>
</tr>
<tr>
<td>字符串</td>
<td><code v-pre>%s</code></td>
<td>字符串或字节切片</td>
</tr>
<tr>
<td></td>
<td><code v-pre>%c</code></td>
<td>Unicode码点对应的字符</td>
</tr>
<tr>
<td></td>
<td><code v-pre>%q</code></td>
<td>对于字符串或字节切片，结果会加上双引号；<br />对于<code v-pre>byte</code>或<code v-pre>rune，</code>结果会加上单引号</td>
</tr>
<tr>
<td>字符串宽度</td>
<td><code v-pre>%5s</code></td>
<td>最小宽度为5（默认右对齐）</td>
</tr>
<tr>
<td></td>
<td><code v-pre>%-5s</code></td>
<td>最小宽度为5（左对齐）</td>
</tr>
<tr>
<td></td>
<td><code v-pre>%.5s</code></td>
<td>最大宽度为5，多出部分会截断</td>
</tr>
<tr>
<td></td>
<td><code v-pre>%5.7s</code></td>
<td>最小宽度为5，最大宽度为7</td>
</tr>
<tr>
<td></td>
<td><code v-pre>%-5.7s</code></td>
<td>最小宽度为5，最大宽度为7（左对齐）</td>
</tr>
<tr>
<td></td>
<td><code v-pre>%5.3s</code></td>
<td>如果宽度大于3，则截断</td>
</tr>
<tr>
<td></td>
<td><code v-pre>%05s</code></td>
<td>如果宽度小于5，就会在字符串前面补零</td>
</tr>
<tr>
<td>整型</td>
<td><code v-pre>%b</code></td>
<td>二进制数</td>
</tr>
<tr>
<td></td>
<td><code v-pre>%o</code></td>
<td>八进制数</td>
</tr>
<tr>
<td></td>
<td><code v-pre>%#o</code></td>
<td>八进制数</td>
</tr>
<tr>
<td></td>
<td><code v-pre>%d</code></td>
<td>十进制数</td>
</tr>
<tr>
<td></td>
<td><code v-pre>%x</code></td>
<td>打印16进制数，a-f</td>
</tr>
<tr>
<td></td>
<td><code v-pre>%X</code></td>
<td>打印16进制数，A-F</td>
</tr>
<tr>
<td></td>
<td><code v-pre>%#x</code>、<code v-pre>%#X</code></td>
<td>打印16进制数，带<code v-pre>0x</code>、<code v-pre>0X</code></td>
</tr>
<tr>
<td></td>
<td><code v-pre>% x</code>、<code v-pre>% X</code></td>
<td>打印16进制数，前面带一个空格</td>
</tr>
<tr>
<td>浮点数</td>
<td><code v-pre>%f</code></td>
<td>浮点数, 默认保留6位小数，即<code v-pre>%.6</code></td>
</tr>
<tr>
<td></td>
<td><code v-pre>%e</code></td>
<td>科学计数法，默认保留6位小数，即<code v-pre>%.6e</code></td>
</tr>
<tr>
<td>指针</td>
<td><code v-pre>%p</code></td>
<td>指针，十六进制表示，带前缀<code v-pre>0x</code></td>
</tr>
<tr>
<td></td>
<td><code v-pre>%#p</code></td>
<td>指针，十六进制表示，不带前缀<code v-pre>0x</code></td>
</tr>
<tr>
<td>布尔值</td>
<td><code v-pre>%t</code></td>
<td>打印<code v-pre>true</code>或<code v-pre>false</code></td>
</tr>
</tbody>
</table>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name <span class="token builtin">string</span>
	Age  <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	person <span class="token operator">:=</span> Person<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">"Bob"</span><span class="token punctuation">,</span> Age<span class="token punctuation">:</span> <span class="token number">20</span><span class="token punctuation">}</span>
	numbers <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">}</span>

	<span class="token comment">// 常用类型</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%T\n"</span><span class="token punctuation">,</span> person<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%v\n"</span><span class="token punctuation">,</span> person<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%+v\n"</span><span class="token punctuation">,</span> person<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%#v\n"</span><span class="token punctuation">,</span> person<span class="token punctuation">)</span>
	<span class="token comment">//main.Person</span>
	<span class="token comment">//{Bob 20}</span>
	<span class="token comment">//{Name:Bob Age:20}</span>
	<span class="token comment">//main.Person{Name:"Bob", Age:20}</span>

	<span class="token comment">// 指针类型，值类型需要使用&amp;获取指针地址，引用类型加不加&amp;都可以</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%p, %p\n"</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>person<span class="token punctuation">,</span> numbers<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%#p, %#p\n"</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>person<span class="token punctuation">,</span> <span class="token operator">&amp;</span>numbers<span class="token punctuation">)</span>
	<span class="token comment">//0xc000004078, 0xc0000161e0</span>
	<span class="token comment">//c000004078, c0000161e0</span>

	<span class="token comment">// 字符串</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%s, %s\n"</span><span class="token punctuation">,</span> <span class="token string">"北京"</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">"北京"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%#x\n"</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">rune</span><span class="token punctuation">(</span><span class="token string">"北京"</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// 0x5317, 字符串 -> unicode -> 16进制</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%c\n"</span><span class="token punctuation">,</span> <span class="token number">0x5317</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%q, %q, %q\n"</span><span class="token punctuation">,</span> <span class="token string">"北京"</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">"北京"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0x5317</span><span class="token punctuation">)</span>
	<span class="token comment">//北京, 北京</span>
	<span class="token comment">//0x5317</span>
	<span class="token comment">//北</span>
	<span class="token comment">//"北京", "北京", '北'</span>

	<span class="token comment">// 字符串宽度</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%5s\n"</span><span class="token punctuation">,</span> <span class="token string">"ABC"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%-5s\n"</span><span class="token punctuation">,</span> <span class="token string">"ABC"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%.5s\n"</span><span class="token punctuation">,</span> <span class="token string">"ABCDEF"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%5.3s\n"</span><span class="token punctuation">,</span> <span class="token string">"ABCDEF"</span><span class="token punctuation">)</span>
	<span class="token comment">//ABC</span>
	<span class="token comment">//ABC</span>
	<span class="token comment">//ABCDE</span>
	<span class="token comment">//ABC</span>

	<span class="token comment">// 整型</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%b\n"</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%o\n"</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%#o\n"</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%x\n"</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%X\n"</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%X\n"</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%#x\n"</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%#X\n"</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"% X\n"</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">)</span>
	<span class="token comment">//11</span>
	<span class="token comment">//11</span>
	<span class="token comment">//011</span>
	<span class="token comment">//f</span>
	<span class="token comment">//F</span>
	<span class="token comment">//F</span>
	<span class="token comment">//0xf</span>
	<span class="token comment">//0XF</span>
	<span class="token comment">// F</span>

	<span class="token comment">// 	浮点数</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%.2f\n"</span><span class="token punctuation">,</span> <span class="token number">2.985</span><span class="token punctuation">)</span>                     <span class="token comment">// 并非四舍五入</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%.2f\n"</span><span class="token punctuation">,</span> <span class="token number">2.986</span><span class="token punctuation">)</span>                     <span class="token comment">// 也不是完全舍去小数</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%f\n"</span><span class="token punctuation">,</span> <span class="token number">3.3333333333333333333333333</span><span class="token punctuation">)</span> <span class="token comment">// 默认保留六位小数</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%f\n"</span><span class="token punctuation">,</span> <span class="token number">3.0</span><span class="token punctuation">)</span>                         <span class="token comment">// 默认保留六位小数，即%.06</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%e\n"</span><span class="token punctuation">,</span> <span class="token number">123456.789</span><span class="token punctuation">)</span>                  <span class="token comment">// 科学计数法， 默认为%.6e；计算方法为：123456.789 = 1.23456789 * 10^5 = 1.23456789e5，又因为是保留6位小数，所以1.234568</span>

	<span class="token comment">// 指针</span>
	a <span class="token operator">:=</span> <span class="token number">1</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%p\n"</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>a<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%#p\n"</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>a<span class="token punctuation">)</span>
	<span class="token comment">//0xc0000181c0</span>
	<span class="token comment">//c0000181c0</span>

	<span class="token comment">// 布尔值</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%t\n"</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token operator">></span> <span class="token number">2</span><span class="token punctuation">)</span>
	<span class="token comment">// false</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h3 id="算术运算符" tabindex="-1"><a class="header-anchor" href="#算术运算符" aria-hidden="true">#</a> 算术运算符</h3>
<table>
<thead>
<tr>
<th>运算符</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>+</td>
<td>加</td>
</tr>
<tr>
<td>-</td>
<td>减</td>
</tr>
<tr>
<td>*</td>
<td>乘</td>
</tr>
<tr>
<td>/</td>
<td>除，<br />整数相除会舍弃小数部分，比如<code v-pre>10 /3 = 3</code>,  <br />有任意一个是浮点数结果就是浮点数，比如<code v-pre>10 / 3.0 = 3.3333333333333335</code></td>
</tr>
<tr>
<td>%</td>
<td>取余，值的符号和除数符号保持一致<br /><code v-pre>10 % 3 = 1</code><br /><code v-pre>10 % -3 = 1</code><br /><code v-pre>-10 % 3 = -1</code></td>
</tr>
<tr>
<td>++</td>
<td>支持i++，但不支持++i</td>
</tr>
<tr>
<td>--</td>
<td>同++</td>
</tr>
</tbody>
</table>
<p>示例代码</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>           <span class="token comment">// 2</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span>           <span class="token comment">// 0</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span>           <span class="token comment">// 4</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token number">3</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span>           <span class="token comment">// 1, 整数相除会舍弃小数部分</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token number">10</span> <span class="token operator">/</span> <span class="token number">3.0</span><span class="token punctuation">)</span>        <span class="token comment">// 3.3333333333333335</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token number">10</span> <span class="token operator">/</span> <span class="token function">float32</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 3.3333333</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token number">10</span> <span class="token operator">/</span> <span class="token function">float64</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 3.3333333333333335, 默认的浮点数是float64</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token number">10</span> <span class="token operator">%</span> <span class="token number">3</span><span class="token punctuation">)</span>          <span class="token comment">// 1</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">10</span> <span class="token operator">%</span> <span class="token number">3</span><span class="token punctuation">)</span>         <span class="token comment">// -1</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token number">10</span> <span class="token operator">%</span> <span class="token operator">-</span><span class="token number">3</span><span class="token punctuation">)</span>         <span class="token comment">// 1</span>

	i <span class="token operator">:=</span> <span class="token number">1</span>
	<span class="token comment">// 下面使用都会报语法错误， i++是一条语句，不是表达式，没有返回值</span>
	<span class="token comment">//j := i++</span>
	<span class="token comment">//fmt.Println(i++)</span>
	i<span class="token operator">++</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token comment">// 2</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h3 id="位运算符" tabindex="-1"><a class="header-anchor" href="#位运算符" aria-hidden="true">#</a> 位运算符</h3>
<p><strong>原码反码补码</strong></p>
<ul>
<li>原码：最高位表示符号位，0表示正，1表示负，所以 -&gt; 0000 0001</li>
<li>反码
<ul>
<li>正数的反码等于原码</li>
<li>负数的反码等于原码按位取反（符号位除外）</li>
</ul>
</li>
<li>补码
<ul>
<li>正数的补码等于原码</li>
<li>负数的补码等于反码+1</li>
</ul>
</li>
</ul>
<p><strong>示例代码</strong></p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"strconv"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">BitReverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"^按位取反:\n"</span><span class="token punctuation">)</span>

	<span class="token comment">// 有符号数字按位取反</span>
	<span class="token comment">// 计算公式：^n = (n + 1) * -1 (n是有符号数字，可能是正数也可能是负数)</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int32</span><span class="token punctuation">{</span><span class="token operator">-</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"^int32(%-5s = %d\n"</span><span class="token punctuation">,</span> strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span><span class="token function">int</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">")"</span><span class="token punctuation">,</span> <span class="token operator">^</span>v<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 无符号数字按位取反</span>
	<span class="token comment">// 计算公式：^n = 该类型最大值 - (n+1) （n是无符号数字，>=0）</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">uint8</span><span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"^uint8(%-5s = %d\n"</span><span class="token punctuation">,</span> strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span><span class="token function">int</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">")"</span><span class="token punctuation">,</span> <span class="token operator">^</span>v<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
    <span class="token comment">// 备注: 这里我们将^作为一元运算符使用，它还可以作为二元运算符使用。</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">LeftShift</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"\n&lt;&lt;左移位:\n"</span><span class="token punctuation">)</span>

	<span class="token comment">// 计算公式：n&lt;&lt;m = n*(2的m次方) （n为10进制数）</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%d&lt;&lt;1=%d     %d&lt;&lt;2=%d     %d&lt;&lt;3=%d\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> i<span class="token operator">&lt;&lt;</span><span class="token number">1</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> i<span class="token operator">&lt;&lt;</span><span class="token number">2</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> i<span class="token operator">&lt;&lt;</span><span class="token number">3</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">RightShift</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"\n>>右移位:\n"</span><span class="token punctuation">)</span>

	<span class="token comment">// 计算公式：n>>m = int(n/(2的m次方)) （n为10进制数）</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">10</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">30</span><span class="token punctuation">;</span> i <span class="token operator">+=</span> <span class="token number">10</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%d>>1=%d     %d>>2=%d     %d>>3=%d\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> i<span class="token operator">>></span><span class="token number">1</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> i<span class="token operator">>></span><span class="token number">2</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> i<span class="token operator">>></span><span class="token number">3</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 按位取反</span>
	<span class="token function">BitReverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 左移位</span>
	<span class="token function">LeftShift</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 右移位</span>
	<span class="token function">RightShift</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>^按位取反:
^int32<span class="token punctuation">(</span>-200<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">199</span>              
^int32<span class="token punctuation">(</span>-100<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">99</span>               
^int32<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>    <span class="token operator">=</span> -1               
^int32<span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span>  <span class="token operator">=</span> -101             
^int32<span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span>  <span class="token operator">=</span> -201             
^uint8<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>    <span class="token operator">=</span> <span class="token number">255</span>              
^uint8<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>    <span class="token operator">=</span> <span class="token number">254</span>              
^uint8<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>    <span class="token operator">=</span> <span class="token number">253</span>              
                                
<span class="token operator">&lt;&lt;</span>左移位:                       
<span class="token operator"><span class="token file-descriptor important">0</span>&lt;</span><span class="token operator">&lt;</span><span class="token number">1</span><span class="token operator">=</span><span class="token number">0</span>     <span class="token operator"><span class="token file-descriptor important">0</span>&lt;</span><span class="token operator">&lt;</span><span class="token number">2</span><span class="token operator">=</span><span class="token number">0</span>     <span class="token operator"><span class="token file-descriptor important">0</span>&lt;</span><span class="token operator">&lt;</span><span class="token number">3</span><span class="token operator">=</span><span class="token number">0</span>    
<span class="token operator"><span class="token file-descriptor important">1</span>&lt;</span><span class="token operator">&lt;</span><span class="token number">1</span><span class="token operator">=</span><span class="token number">2</span>     <span class="token operator"><span class="token file-descriptor important">1</span>&lt;</span><span class="token operator">&lt;</span><span class="token number">2</span><span class="token operator">=</span><span class="token number">4</span>     <span class="token operator"><span class="token file-descriptor important">1</span>&lt;</span><span class="token operator">&lt;</span><span class="token number">3</span><span class="token operator">=</span><span class="token number">8</span>    
<span class="token operator"><span class="token file-descriptor important">2</span>&lt;</span><span class="token operator">&lt;</span><span class="token number">1</span><span class="token operator">=</span><span class="token number">4</span>     <span class="token operator"><span class="token file-descriptor important">2</span>&lt;</span><span class="token operator">&lt;</span><span class="token number">2</span><span class="token operator">=</span><span class="token number">8</span>     <span class="token operator"><span class="token file-descriptor important">2</span>&lt;</span><span class="token operator">&lt;</span><span class="token number">3</span><span class="token operator">=</span><span class="token number">16</span>   
<span class="token operator"><span class="token file-descriptor important">3</span>&lt;</span><span class="token operator">&lt;</span><span class="token number">1</span><span class="token operator">=</span><span class="token number">6</span>     <span class="token operator"><span class="token file-descriptor important">3</span>&lt;</span><span class="token operator">&lt;</span><span class="token number">2</span><span class="token operator">=</span><span class="token number">12</span>     <span class="token operator"><span class="token file-descriptor important">3</span>&lt;</span><span class="token operator">&lt;</span><span class="token number">3</span><span class="token operator">=</span><span class="token number">24</span>  
                                
<span class="token operator">>></span>右移位:                       
<span class="token number">1</span><span class="token operator"><span class="token file-descriptor important">0</span>>></span><span class="token number">1</span><span class="token operator">=</span><span class="token number">5</span>     <span class="token number">1</span><span class="token operator"><span class="token file-descriptor important">0</span>>></span><span class="token number">2</span><span class="token operator">=</span><span class="token number">2</span>     <span class="token number">1</span><span class="token operator"><span class="token file-descriptor important">0</span>>></span><span class="token number">3</span><span class="token operator">=</span><span class="token number">1</span> 
<span class="token number">2</span><span class="token operator"><span class="token file-descriptor important">0</span>>></span><span class="token number">1</span><span class="token operator">=</span><span class="token number">10</span>     <span class="token number">2</span><span class="token operator"><span class="token file-descriptor important">0</span>>></span><span class="token number">2</span><span class="token operator">=</span><span class="token number">5</span>     <span class="token number">2</span><span class="token operator"><span class="token file-descriptor important">0</span>>></span><span class="token number">3</span><span class="token operator">=</span><span class="token number">2</span>
<span class="token number">3</span><span class="token operator"><span class="token file-descriptor important">0</span>>></span><span class="token number">1</span><span class="token operator">=</span><span class="token number">15</span>     <span class="token number">3</span><span class="token operator"><span class="token file-descriptor important">0</span>>></span><span class="token number">2</span><span class="token operator">=</span><span class="token number">7</span>     <span class="token number">3</span><span class="token operator"><span class="token file-descriptor important">0</span>>></span><span class="token number">3</span><span class="token operator">=</span><span class="token number">3</span>
</code></pre></div><h3 id="循环语句" tabindex="-1"><a class="header-anchor" href="#循环语句" aria-hidden="true">#</a> 循环语句</h3>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// ------------------------- 基础语法 --------------------------------</span>
	<span class="token comment">// C语言风格循环</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// range循环</span>
	list <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">}</span>
	<span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> list <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%#v[%d]=%d\n"</span><span class="token punctuation">,</span> list<span class="token punctuation">,</span> k<span class="token punctuation">,</span> v<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 类似while</span>
	n <span class="token operator">:=</span> <span class="token number">6</span>
	<span class="token keyword">for</span> n <span class="token operator">&lt;=</span> <span class="token number">8</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
		n<span class="token operator">++</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 死循环</span>
	<span class="token comment">//for {</span>
	<span class="token comment">//	fmt.Println(time.Now())</span>
	<span class="token comment">//}</span>

	<span class="token comment">// ------------------------- 陷阱 --------------------------------</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"\n陷阱代码："</span><span class="token punctuation">)</span>
	data1 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">,</span> <span class="token number">300</span><span class="token punctuation">}</span>
	data2 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> data1 <span class="token punctuation">{</span>
		data2 <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>data2<span class="token punctuation">,</span> <span class="token operator">&amp;</span>v<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> data2 <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">*</span>v<span class="token punctuation">)</span> <span class="token comment">// 输出3个300</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 原因</span>
	<span class="token comment">// v是一个临时变量，每次循环并不重新分配内存地址，而是仅改值而已，</span>
	<span class="token comment">// 这就导致当最后一次循环完成后，v的值被重置为300</span>

	<span class="token comment">// ------------------------- 解决 --------------------------------</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"\n修正代码-方式1："</span><span class="token punctuation">)</span>
	data3 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token keyword">for</span> k<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> <span class="token keyword">range</span> data1 <span class="token punctuation">{</span>
		data3 <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>data3<span class="token punctuation">,</span> <span class="token operator">&amp;</span>data1<span class="token punctuation">[</span>k<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// 通过key来获取原始数据data1中的地址</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> data3 <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">*</span>v<span class="token punctuation">)</span> <span class="token comment">// 输出100 200 300</span>
	<span class="token punctuation">}</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"\n修正代码-方式2："</span><span class="token punctuation">)</span>
	data4 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> data1 <span class="token punctuation">{</span>
		temp <span class="token operator">:=</span> v <span class="token comment">//使用新变量，每次循环都会重新开辟内存空间</span>
		data4 <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>data4<span class="token punctuation">,</span> <span class="token operator">&amp;</span>temp<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> data4 <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">*</span>v<span class="token punctuation">)</span> <span class="token comment">// 输出100 200 300</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token number">0</span>
<span class="token number">1</span>                  
<span class="token number">2</span>                  
<span class="token punctuation">[</span><span class="token punctuation">]</span>int<span class="token punctuation">{</span><span class="token number">3</span>, <span class="token number">4</span>, <span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token number">3</span>
<span class="token punctuation">[</span><span class="token punctuation">]</span>int<span class="token punctuation">{</span><span class="token number">3</span>, <span class="token number">4</span>, <span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token number">4</span>
<span class="token punctuation">[</span><span class="token punctuation">]</span>int<span class="token punctuation">{</span><span class="token number">3</span>, <span class="token number">4</span>, <span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token number">5</span>
<span class="token number">6</span>                  
<span class="token number">7</span>                  
<span class="token number">8</span>                  
                   
陷阱代码：         
<span class="token number">300</span>                
<span class="token number">300</span>                
<span class="token number">300</span>                
                   
修正代码-方式1：   
<span class="token number">100</span>                
<span class="token number">200</span>                
<span class="token number">300</span>                
                   
修正代码-方式2：   
<span class="token number">100</span>                
<span class="token number">200</span>                
<span class="token number">300</span>      
</code></pre></div><h3 id="判断语句" tabindex="-1"><a class="header-anchor" href="#判断语句" aria-hidden="true">#</a> 判断语句</h3>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// if判断</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"if判断"</span><span class="token punctuation">)</span>
	a <span class="token operator">:=</span> <span class="token number">100</span>
	b <span class="token operator">:=</span> <span class="token number">200</span>
	<span class="token keyword">if</span> x<span class="token punctuation">,</span> y <span class="token operator">:=</span> a<span class="token punctuation">,</span> b<span class="token punctuation">;</span> x <span class="token operator">&lt;</span> y <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%d &lt; %d\n"</span><span class="token punctuation">,</span> x<span class="token punctuation">,</span> y<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// switch</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"\nswitch判断"</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">switch</span> i <span class="token punctuation">{</span>
		<span class="token keyword">case</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">:</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> <span class="token string">"0-2"</span><span class="token punctuation">)</span>
		<span class="token keyword">case</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">:</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> <span class="token string">"1-3"</span><span class="token punctuation">)</span>
		<span class="token keyword">default</span><span class="token punctuation">:</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> <span class="token string">"Default"</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"\nswitch-fallthrough判断"</span><span class="token punctuation">)</span>
	c <span class="token operator">:=</span> <span class="token number">100</span>
	<span class="token keyword">switch</span> c <span class="token punctuation">{</span>
	<span class="token keyword">case</span> <span class="token number">50</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"50"</span><span class="token punctuation">)</span>
	<span class="token keyword">case</span> <span class="token number">100</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"100"</span><span class="token punctuation">)</span>
		<span class="token keyword">fallthrough</span> <span class="token comment">// 遇到fallthrough，会继续执行代码后面的case， default不执行</span>
	<span class="token keyword">case</span> <span class="token number">200</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"200"</span><span class="token punctuation">)</span>
	<span class="token keyword">case</span> <span class="token number">300</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"300"</span><span class="token punctuation">)</span>
	<span class="token keyword">default</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Default"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>if判断
<span class="token number">100</span> <span class="token operator">&lt;</span> <span class="token number">200</span>             
                      
switch判断            
<span class="token number">0</span> <span class="token number">0</span>-2                 
<span class="token number">1</span> <span class="token number">1</span>-3                 
<span class="token number">2</span> <span class="token number">0</span>-2                 
<span class="token number">3</span> <span class="token number">1</span>-3                 
<span class="token number">4</span> Default             
                      
switch-fallthrough判断
<span class="token number">100</span>                   
<span class="token number">200</span>
</code></pre></div><h3 id="测试基础" tabindex="-1"><a class="header-anchor" href="#测试基础" aria-hidden="true">#</a> 测试基础</h3>
<table>
<thead>
<tr>
<th>功能\属性</th>
<th>文件名要求</th>
<th>函数签名要求</th>
<th>执行命令</th>
</tr>
</thead>
<tbody>
<tr>
<td>单元测试</td>
<td>文件名要以<code v-pre>_test.go</code>结尾</td>
<td><code v-pre>TestXX(t *testing.T)</code></td>
<td>测试当前目录下所有文件：<code v-pre>go test .</code></td>
</tr>
<tr>
<td>性能测试</td>
<td>文件名要以<code v-pre>_test.go</code>结尾</td>
<td><code v-pre>BenchmarkXX(b *testing.B)</code></td>
<td>测试当前目录下所有文件：<code v-pre>go test -bench . </code></td>
</tr>
</tbody>
</table>
<p><strong>单元测试举例</strong></p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"testing"</span>

<span class="token keyword">func</span> <span class="token function">Add</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n2 <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> n1 <span class="token operator">+</span> n2
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">TestAdd</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	tests <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">struct</span><span class="token punctuation">{</span> a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c <span class="token builtin">int</span> <span class="token punctuation">}</span><span class="token punctuation">{</span>
		<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">{</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">{</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">{</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 这里故意写错</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> tests <span class="token punctuation">{</span>
		<span class="token keyword">if</span> ret <span class="token operator">:=</span> <span class="token function">Add</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span>a<span class="token punctuation">,</span> v<span class="token punctuation">.</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span> ret <span class="token operator">!=</span> v<span class="token punctuation">.</span>c <span class="token punctuation">{</span>
			t<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"Add(%d, %d) got %d, expectd %d\n"</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span>a<span class="token punctuation">,</span> v<span class="token punctuation">.</span>b<span class="token punctuation">,</span> ret<span class="token punctuation">,</span> v<span class="token punctuation">.</span>c<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token operator">==</span><span class="token operator">=</span> RUN   TestAdd
    a_test.go:19: Add<span class="token punctuation">(</span><span class="token number">6</span>, <span class="token number">7</span><span class="token punctuation">)</span> got <span class="token number">13</span>, expectd <span class="token number">14</span>
--- FAIL: TestAdd <span class="token punctuation">(</span><span class="token number">0</span>.00s<span class="token punctuation">)</span>

FAIL
</code></pre></div><p><strong>性能测试举例</strong></p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"testing"</span>

<span class="token keyword">func</span> <span class="token function">Add</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n2 <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> n1 <span class="token operator">+</span> n2
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">BenchmarkAdd</span><span class="token punctuation">(</span>b <span class="token operator">*</span>testing<span class="token punctuation">.</span>B<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	x <span class="token operator">:=</span> <span class="token number">10000</span>
	y <span class="token operator">:=</span> <span class="token operator">-</span><span class="token number">25000</span>
	z <span class="token operator">:=</span> <span class="token operator">-</span><span class="token number">15000</span>

	<span class="token comment">// 这里是重置时间，如果上面有耗时初始化的话可以添加这一句</span>
	b<span class="token punctuation">.</span><span class="token function">ResetTimer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// b.N是性能测试为我们提供的计数器</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> b<span class="token punctuation">.</span>N<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> v <span class="token operator">:=</span> <span class="token function">Add</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span> v <span class="token operator">!=</span> z <span class="token punctuation">{</span>
			b<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"Add(%d, %d) got %d, expectd %d\n"</span><span class="token punctuation">,</span> x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> v<span class="token punctuation">,</span> z<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>BenchmarkAdd-8          <span class="token number">1000000000</span>               <span class="token number">0.2460</span> ns/op
PASS
ok      learn   <span class="token number">0</span>.956s
</code></pre></div><h3 id="交叉编译" tabindex="-1"><a class="header-anchor" href="#交叉编译" aria-hidden="true">#</a> 交叉编译</h3>
<p>交叉编译简单来说指的是在当前平台上可以编译出其他平台的可执行程序，比如在Windows下编译Linux二进制程序</p>
<p>对于<code v-pre>go</code>来说主要控制3个变量：</p>
<ul>
<li><code v-pre>CGO_ENABLED=0</code>：Go在编译时可以选择使用C链接库(C链接库不打包进程序)或纯Go编译(打包所有内容)，<code v-pre>CGO_ENABLED</code>参数控制是否启用<code v-pre>CGO</code></li>
<li><code v-pre>GOOS=&lt;目标平台的操作系统&gt;</code>，比如<code v-pre>windows</code>、<code v-pre>linux</code>、<code v-pre>darwin</code>、<code v-pre>freebsd</code></li>
<li><code v-pre>GOARCH=&lt;目标平台的体系架构&gt;</code>，比如<code v-pre>amd64</code>,<code v-pre>386</code>、<code v-pre>arm</code></li>
</ul>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># Windows下编译Linux和Mac64位可执行程序</span>
SET <span class="token assign-left variable">CGO_ENABLED</span><span class="token operator">=</span><span class="token number">0</span>
SET <span class="token assign-left variable">GOOS</span><span class="token operator">=</span>linux
SET <span class="token assign-left variable">GOARCH</span><span class="token operator">=</span>amd64
go build <span class="token builtin class-name">.</span>

SET <span class="token assign-left variable">CGO_ENABLED</span><span class="token operator">=</span><span class="token number">0</span>
SET <span class="token assign-left variable">GOOS</span><span class="token operator">=</span>darwin
SET <span class="token assign-left variable">GOARCH</span><span class="token operator">=</span>amd64
go build <span class="token builtin class-name">.</span>

<span class="token comment"># Mac下编译Linux和Windows64位可执行程序</span>
<span class="token assign-left variable">CGO_ENABLED</span><span class="token operator">=</span><span class="token number">0</span> <span class="token assign-left variable">GOOS</span><span class="token operator">=</span>linux   <span class="token assign-left variable">GOARCH</span><span class="token operator">=</span>amd64 go build <span class="token builtin class-name">.</span>
<span class="token assign-left variable">CGO_ENABLED</span><span class="token operator">=</span><span class="token number">0</span> <span class="token assign-left variable">GOOS</span><span class="token operator">=</span>windows <span class="token assign-left variable">GOARCH</span><span class="token operator">=</span>amd64 go build <span class="token builtin class-name">.</span>

<span class="token comment"># Linux下编译Mac和Windows 64位可执行程序</span>
<span class="token assign-left variable">CGO_ENABLED</span><span class="token operator">=</span><span class="token number">0</span> <span class="token assign-left variable">GOOS</span><span class="token operator">=</span>darwin  <span class="token assign-left variable">GOARCH</span><span class="token operator">=</span>amd64 go build <span class="token builtin class-name">.</span>
<span class="token assign-left variable">CGO_ENABLED</span><span class="token operator">=</span><span class="token number">0</span> <span class="token assign-left variable">GOOS</span><span class="token operator">=</span>windows <span class="token assign-left variable">GOARCH</span><span class="token operator">=</span>amd64 go build <span class="token builtin class-name">.</span>
</code></pre></div><h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> </h2>
<h2 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型" aria-hidden="true">#</a> 数据类型</h2>
<h3 id="数字" tabindex="-1"><a class="header-anchor" href="#数字" aria-hidden="true">#</a> 数字</h3>
<h4 id="数字类型" tabindex="-1"><a class="header-anchor" href="#数字类型" aria-hidden="true">#</a> 数字类型</h4>
<table>
<thead>
<tr>
<th>分类</th>
<th>关键字</th>
</tr>
</thead>
<tbody>
<tr>
<td>有符号整数</td>
<td><code v-pre>int8</code></td>
</tr>
<tr>
<td></td>
<td><code v-pre>int16</code></td>
</tr>
<tr>
<td></td>
<td><code v-pre>int32</code></td>
</tr>
<tr>
<td></td>
<td><code v-pre>int64</code></td>
</tr>
<tr>
<td>无符号整数</td>
<td><code v-pre>uint8</code></td>
</tr>
<tr>
<td></td>
<td><code v-pre>uint16</code></td>
</tr>
<tr>
<td></td>
<td><code v-pre>uint32</code></td>
</tr>
<tr>
<td></td>
<td><code v-pre>uint64</code></td>
</tr>
<tr>
<td>浮点数</td>
<td><code v-pre>float32</code></td>
</tr>
<tr>
<td></td>
<td><code v-pre>float64</code></td>
</tr>
</tbody>
</table>
<h4 id="各类型取值范围" tabindex="-1"><a class="header-anchor" href="#各类型取值范围" aria-hidden="true">#</a> 各类型取值范围</h4>
<p>取值范围计算：</p>
<p>（1）有符号整数: -2的(n-1)次方 ~ (2的(n-1)次方 -1)，因为第一位表示符号位，实际位数为n-1，同时正数中0代表一个数字，所以正数取值范围要-1</p>
<p>（2）无符号整数: 0 ~ (2的n次方-1)</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"math"</span>
	<span class="token string">"strconv"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 计算系统位数(32 or 64)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"当前操作系统位数: %d\n"</span><span class="token punctuation">,</span> strconv<span class="token punctuation">.</span>IntSize<span class="token punctuation">)</span>

	<span class="token comment">// 有符号整数</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"\n有符号整数"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"int8 取值范围: %20d ~ %-d\n"</span><span class="token punctuation">,</span> math<span class="token punctuation">.</span>MinInt8<span class="token punctuation">,</span> math<span class="token punctuation">.</span>MaxInt8<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"int16取值范围: %20d ~ %-d\n"</span><span class="token punctuation">,</span> math<span class="token punctuation">.</span>MinInt16<span class="token punctuation">,</span> math<span class="token punctuation">.</span>MaxInt16<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"int32取值范围: %20d ~ %-d\n"</span><span class="token punctuation">,</span> math<span class="token punctuation">.</span>MinInt32<span class="token punctuation">,</span> math<span class="token punctuation">.</span>MaxInt32<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"int64取值范围: %20d ~ %-d\n"</span><span class="token punctuation">,</span> math<span class="token punctuation">.</span>MinInt64<span class="token punctuation">,</span> math<span class="token punctuation">.</span>MaxInt64<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"int  取值范围: %20d ~ %-d\n"</span><span class="token punctuation">,</span> math<span class="token punctuation">.</span>MinInt<span class="token punctuation">,</span> math<span class="token punctuation">.</span>MaxInt<span class="token punctuation">)</span>

	<span class="token comment">// 无符号整数</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"\n无符号整数"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"uint8  取值范围: %d ~ %-d\n"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> math<span class="token punctuation">.</span>MaxUint8<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"uint16 取值范围: %d ~ %-d\n"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> math<span class="token punctuation">.</span>MaxUint16<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"uint32 取值范围: %d ~ %-d\n"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> math<span class="token punctuation">.</span>MaxUint32<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"uint64 取值范围: %d ~ %-d\n"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">uint64</span><span class="token punctuation">(</span>math<span class="token punctuation">.</span>MaxUint64<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 这里需要转为uint64</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"uint   取值范围: %d ~ %-d\n"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">uint64</span><span class="token punctuation">(</span>math<span class="token punctuation">.</span>MaxUint<span class="token punctuation">)</span><span class="token punctuation">)</span>   <span class="token comment">// 这里需要转为uint64</span>

	<span class="token comment">// 浮点数</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"\n浮点数"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"float32 取值范围: %10.1e ~ %-10.1e\n"</span><span class="token punctuation">,</span> math<span class="token punctuation">.</span>SmallestNonzeroFloat32<span class="token punctuation">,</span> math<span class="token punctuation">.</span>MaxFloat32<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"float64 取值范围: %10.1e ~ %-10.1e\n"</span><span class="token punctuation">,</span> math<span class="token punctuation">.</span>SmallestNonzeroFloat64<span class="token punctuation">,</span> math<span class="token punctuation">.</span>MaxFloat64<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>当前操作系统位数: <span class="token number">64</span>

有符号整数                                               
int8 取值范围:                 -128 ~ <span class="token number">127</span>                
int16取值范围:               -32768 ~ <span class="token number">32767</span>              
int32取值范围:          -2147483648 ~ <span class="token number">2147483647</span>         
int64取值范围: -9223372036854775808 ~ <span class="token number">9223372036854775807</span>
int  取值范围: -9223372036854775808 ~ <span class="token number">9223372036854775807</span>
                                                         
无符号整数                                               
uint8  取值范围: <span class="token number">0</span> ~ <span class="token number">255</span>                                 
uint16 取值范围: <span class="token number">0</span> ~ <span class="token number">65535</span>                               
uint32 取值范围: <span class="token number">0</span> ~ <span class="token number">4294967295</span>                          
uint64 取值范围: <span class="token number">0</span> ~ <span class="token number">18446744073709551615</span>                
uint   取值范围: <span class="token number">0</span> ~ <span class="token number">18446744073709551615</span>                
                                                         
浮点数                                                   
float32 取值范围:    <span class="token number">1</span>.4e-45 ~ <span class="token number">3</span>.4e+38                   
float64 取值范围:   <span class="token number">4</span>.9e-324 ~ <span class="token number">1</span>.8e+308
</code></pre></div><h4 id="转换注意事项" tabindex="-1"><a class="header-anchor" href="#转换注意事项" aria-hidden="true">#</a> 转换注意事项</h4>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 执行正常,这个容易理解,小范围转大范围</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">int16</span><span class="token punctuation">(</span><span class="token function">int8</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 123</span>

	<span class="token comment">// 执行报错,这个也容易理解,大范围转小范围,直接报错</span>
	<span class="token comment">//fmt.Println(int8(int16(0x1234))) // cannot convert int16(0x1234) (constant 4660 of type int16) to type int8</span>

	<span class="token comment">// 执行正常, 但是结果不对</span>
	i <span class="token operator">:=</span> <span class="token number">0x1234</span>
	x <span class="token operator">:=</span> <span class="token function">int16</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	y <span class="token operator">:=</span> <span class="token function">int8</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%#x"</span><span class="token punctuation">,</span> y<span class="token punctuation">)</span> <span class="token comment">// 0x34,结果明显有错误,丢失了一个字节的数据</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="字符串相关" tabindex="-1"><a class="header-anchor" href="#字符串相关" aria-hidden="true">#</a> 字符串相关</h3>
<h4 id="三种类型声明" tabindex="-1"><a class="header-anchor" href="#三种类型声明" aria-hidden="true">#</a> <strong>三种类型声明</strong></h4>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 字符串声明</span>
	<span class="token keyword">var</span> s1 <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">"\"hello\" world!"</span> <span class="token comment">// (1) 方法1：使用双引号，如果字符串也包含双引号则需要转义</span>
	<span class="token keyword">var</span> s2 <span class="token builtin">string</span> <span class="token operator">=</span> `<span class="token string">"hello"</span> world<span class="token operator">!</span>`   <span class="token comment">// (2) 方法2：使用反引号，不需要转义，支持多行字符串</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%s\n"</span><span class="token punctuation">,</span> s1<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%s\n"</span><span class="token punctuation">,</span> s2<span class="token punctuation">)</span>

	<span class="token comment">// 字节声明</span>
	<span class="token keyword">var</span> b1 <span class="token builtin">byte</span> <span class="token operator">=</span> <span class="token char">'a'</span>      <span class="token comment">// 使用单引号声明</span>
	<span class="token keyword">var</span> b2 <span class="token builtin">uint8</span> <span class="token operator">=</span> <span class="token char">'b'</span>     <span class="token comment">// byte的本质就是uint8, 代表一个ASCII字符，无法表示中文</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%c\n"</span><span class="token punctuation">,</span> b1<span class="token punctuation">)</span> <span class="token comment">// 可以使用%c或%q，不能使用%s</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%q\n"</span><span class="token punctuation">,</span> b2<span class="token punctuation">)</span>

	<span class="token comment">// 字符声明</span>
	<span class="token keyword">var</span> r1 <span class="token builtin">rune</span> <span class="token operator">=</span> <span class="token char">'中'</span>  <span class="token comment">// 使用单引号声明</span>
	<span class="token keyword">var</span> r2 <span class="token builtin">int32</span> <span class="token operator">=</span> <span class="token char">'国'</span> <span class="token comment">// rune的本质就是int32, 代表一个Unicode字符，除了能表示ASCII还能表示中文</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%c\n"</span><span class="token punctuation">,</span> r1<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%q\n"</span><span class="token punctuation">,</span> r2<span class="token punctuation">)</span> <span class="token comment">// 可以使用%c或%q，不能使用%s</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token string">"hello"</span> world<span class="token operator">!</span>
<span class="token string">"hello"</span> world<span class="token operator">!</span>
a             
<span class="token string">'b'</span>           
中            
<span class="token string">'国'</span>
</code></pre></div><h4 id="字符串的本质" tabindex="-1"><a class="header-anchor" href="#字符串的本质" aria-hidden="true">#</a> 字符串的本质</h4>
<p>字符串的本质就是字节数组</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"unicode/utf8"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 字符串定义</span>
	s1 <span class="token operator">:=</span> <span class="token string">"北京欢迎你"</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"        字符串: %-s\n"</span><span class="token punctuation">,</span> s1<span class="token punctuation">)</span>

	<span class="token comment">// ------------------------------------------------------------------</span>

	<span class="token comment">// 计算字符串长度</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"计算字符串长度: %d\n"</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">)</span>            <span class="token comment">// 15</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"  计算字节长度: %d\n"</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>   <span class="token comment">// 15</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"  计算rune长度: %d\n"</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">rune</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 5</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"  计算rune长度: %d\n"</span><span class="token punctuation">,</span> utf8<span class="token punctuation">.</span><span class="token function">RuneCountInString</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 5</span>
    
	<span class="token comment">// ------------------------------------------------------------------</span>

	<span class="token comment">// 按照字节遍历 - 遍历出来是乱码</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"string[%d]=%c\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> s1<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 按照字节数组遍历 - 遍历出来是乱码，和上面的结果是一样的</span>
	s2 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>s2<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"string[%d]=%c\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> s2<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 使用range遍历 - 下标具有不确定性</span>
	<span class="token keyword">for</span> index<span class="token punctuation">,</span> value <span class="token operator">:=</span> <span class="token keyword">range</span> s1 <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"string[%d]=%c\n"</span><span class="token punctuation">,</span> index<span class="token punctuation">,</span> value<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 使用rune遍历 - 完美</span>
	s3 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">rune</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>s3<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"string[%d]=%c\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> s3<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>        字符串: 北京欢迎你
计算字符串长度: <span class="token number">15</span>
  计算字节长度: <span class="token number">15</span>
  计算rune长度: <span class="token number">5</span> 
  计算rune长度: <span class="token number">5</span> 

中间乱码省略<span class="token punctuation">..</span>.

string<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">=</span>北
string<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token operator">=</span>京
string<span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">]</span><span class="token operator">=</span>欢
string<span class="token punctuation">[</span><span class="token number">9</span><span class="token punctuation">]</span><span class="token operator">=</span>迎
string<span class="token punctuation">[</span><span class="token number">12</span><span class="token punctuation">]</span><span class="token operator">=</span>你
string<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">=</span>北
string<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token operator">=</span>京
string<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token operator">=</span>欢
string<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token operator">=</span>迎
string<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token operator">=</span>你
</code></pre></div><h4 id="strings包" tabindex="-1"><a class="header-anchor" href="#strings包" aria-hidden="true">#</a> strings包</h4>
<p>官方文档：<a href="https://pkg.go.dev/strings" target="_blank" rel="noopener noreferrer">https://pkg.go.dev/strings<ExternalLinkIcon/></a></p>
<p>中文文档：<a href="https://studygolang.com/static/pkgdoc/pkg/strings.htm" target="_blank" rel="noopener noreferrer">https://studygolang.com/static/pkgdoc/pkg/strings.htm<ExternalLinkIcon/></a></p>
<p>常用函数</p>
<table>
<thead>
<tr>
<th>分类</th>
<th>函数</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>字符串相等</td>
<td><code v-pre>func EqualFold(s, t string) bool</code></td>
<td>判断两个<code v-pre>UTF-8</code>字符串是否相等，不区分大小写</td>
</tr>
<tr>
<td>前后缀判断</td>
<td><code v-pre>func HasPrefix(s, prefix string) bool</code></td>
<td>判断<code v-pre>s</code>是否有前缀字符串<code v-pre>prefix</code></td>
</tr>
<tr>
<td></td>
<td><code v-pre>func HasSuffix(s, suffix string) bool</code></td>
<td>判断<code v-pre>s</code>是否有后缀字符串<code v-pre>suffix </code></td>
</tr>
<tr>
<td>字符串包含</td>
<td><code v-pre>func Contains(s, substr string) bool</code></td>
<td>判断字符串<code v-pre>s</code>是否包含子串<code v-pre>substr</code></td>
</tr>
<tr>
<td></td>
<td><code v-pre>func ContainsRune(s string, r rune) bool</code></td>
<td>判断字符串s是否包含<code v-pre>utf-8</code>码值<code v-pre>r</code></td>
</tr>
<tr>
<td></td>
<td><code v-pre>func ContainsAny(s, chars string) bool</code></td>
<td>判断字符串s是否包含字符串<code v-pre>chars</code>中的任一字符</td>
</tr>
<tr>
<td>大小写</td>
<td><code v-pre>func ToLower(s string) string</code></td>
<td>返回将所有字母都转为对应的小写版本的拷贝</td>
</tr>
<tr>
<td></td>
<td><code v-pre>func ToUpper(s string) string</code></td>
<td>返回将所有字母都转为对应的大写版本的拷贝</td>
</tr>
<tr>
<td>清除</td>
<td><code v-pre>func Trim(s string, cutset string) string</code></td>
<td>返回将s前后端所有<code v-pre>cutset</code>包含的<code v-pre>utf-8</code>码值都去掉的字符串</td>
</tr>
<tr>
<td></td>
<td><code v-pre>func TrimSpace(s string) string</code></td>
<td>返回将s前后端所有空白都去掉的字符串</td>
</tr>
<tr>
<td></td>
<td><code v-pre>func TrimFunc(s string, f func(rune) bool) string</code></td>
<td>返回将s前后端所有满足<code v-pre>f</code>的<code v-pre>unicode</code>码值都去掉的字符串</td>
</tr>
<tr>
<td>分割</td>
<td><code v-pre>func Split(s, sep string) []string</code></td>
<td>以<code v-pre>sep</code>作为分割符分割字符串直接末尾，<br />如果<code v-pre>sep</code>为空则返回每个<code v-pre>Unicode</code>码点</td>
</tr>
<tr>
<td></td>
<td><code v-pre>func SplitN(s, sep string, n int) []string</code></td>
<td>同<code v-pre>Split</code>，参数<code v-pre>n</code>决定返回的切片的数目<br /><code v-pre>n</code> == 0，返回<code v-pre>nil</code>（空切片零值）<br /><code v-pre>n</code> &gt; 0 返回的切片最多n个子字符串；最后一个子字符串包含未进行切割的部分<br /><code v-pre>n</code> &lt; 0 : 返回所有的子字符串组成的切片</td>
</tr>
<tr>
<td></td>
<td><code v-pre>func SplitAfter(s, sep string) []string</code></td>
<td>同<code v-pre>Split</code>，只是会保留分隔符</td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td>连接</td>
<td><code v-pre>func Join(a []string, sep string) string</code></td>
<td>将一系列字符串连接为一个字符串，之间用sep来分隔</td>
</tr>
</tbody>
</table>
<p>示例代码</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"strings"</span>
	<span class="token string">"unicode"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 字符串相等判断</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"字符串相等判断"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">EqualFold</span><span class="token punctuation">(</span><span class="token string">"go"</span><span class="token punctuation">,</span> <span class="token string">"GO"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// true, 不区分大小写</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"go"</span> <span class="token operator">==</span> <span class="token string">"GO"</span><span class="token punctuation">)</span>                  <span class="token comment">// false, 区分大小写</span>

	<span class="token comment">// 字符串前后缀匹配</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"\n字符串前后缀匹配"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">HasPrefix</span><span class="token punctuation">(</span><span class="token string">"hello"</span><span class="token punctuation">,</span> <span class="token string">"he"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">HasPrefix</span><span class="token punctuation">(</span><span class="token string">"hello"</span><span class="token punctuation">,</span> <span class="token string">" he"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// 字符串包含匹配</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"\n字符串包含匹配"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">Contains</span><span class="token punctuation">(</span><span class="token string">"hello"</span><span class="token punctuation">,</span> <span class="token string">"ell"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">ContainsRune</span><span class="token punctuation">(</span><span class="token string">"中华人民共和国"</span><span class="token punctuation">,</span> <span class="token char">'人'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">ContainsAny</span><span class="token punctuation">(</span><span class="token string">"中华人民共和国"</span><span class="token punctuation">,</span> <span class="token string">"你是哪里的人啊？"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// 大小写转换</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"\n大小写转换"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">ToLower</span><span class="token punctuation">(</span><span class="token string">"Hello"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// hello</span>

	<span class="token comment">// 清除</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"\n清除"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">Trim</span><span class="token punctuation">(</span><span class="token string">"hello world!"</span><span class="token punctuation">,</span> <span class="token string">"l!"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>                       <span class="token comment">// hello world, !被清除了，说明并没有将l!作为一个整体</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">Trim</span><span class="token punctuation">(</span><span class="token string">"@!hello world!"</span><span class="token punctuation">,</span> <span class="token string">"!@"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>                     <span class="token comment">// hello world, 再次测试一下，验证成功</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">TrimSpace</span><span class="token punctuation">(</span><span class="token string">" 	hello world "</span><span class="token punctuation">)</span><span class="token punctuation">)</span>                      <span class="token comment">// 清除两侧的空白</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">TrimFunc</span><span class="token punctuation">(</span><span class="token string">" hello world HAHA"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>r <span class="token builtin">rune</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span> <span class="token comment">// 清除两侧的空白和大写字母</span>
		<span class="token keyword">return</span> unicode<span class="token punctuation">.</span><span class="token function">IsSpace</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span> <span class="token operator">||</span> unicode<span class="token punctuation">.</span><span class="token function">IsUpper</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// 分割</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"\n分割"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%q\n"</span><span class="token punctuation">,</span> strings<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span><span class="token string">"a,b,c"</span><span class="token punctuation">,</span> <span class="token string">","</span><span class="token punctuation">)</span><span class="token punctuation">)</span>     <span class="token comment">// ["a" "b" "c"]</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%q\n"</span><span class="token punctuation">,</span> strings<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span><span class="token string">"aab"</span><span class="token punctuation">,</span> <span class="token string">"a"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>       <span class="token comment">// ["" "" "b"]</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%q\n"</span><span class="token punctuation">,</span> strings<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span><span class="token string">"a b c"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">)</span>      <span class="token comment">// ["a" " " "b" " " "c"]</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%q\n"</span><span class="token punctuation">,</span> strings<span class="token punctuation">.</span><span class="token function">SplitN</span><span class="token punctuation">(</span><span class="token string">"a b c"</span><span class="token punctuation">,</span> <span class="token string">"1"</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 参数n决定返回的切片的数目</span>

	<span class="token comment">// 连接</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"\n连接"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"hello"</span><span class="token punctuation">,</span> <span class="token string">"world"</span><span class="token punctuation">,</span> <span class="token string">"!"</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">" "</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>字符串相等判断
<span class="token boolean">true</span>            
<span class="token boolean">false</span>           
                
字符串前后缀匹配
<span class="token boolean">true</span>            
<span class="token boolean">false</span>           
                
字符串包含匹配  
<span class="token boolean">true</span>            
<span class="token boolean">true</span>            
<span class="token boolean">true</span>            
                
大小写转换      
hello           
                
清除            
hello world     
hello world     
hello world     
hello world     
                
分割            
<span class="token punctuation">[</span><span class="token string">"a"</span> <span class="token string">"b"</span> <span class="token string">"c"</span><span class="token punctuation">]</span>   
<span class="token punctuation">[</span><span class="token string">""</span> <span class="token string">""</span> <span class="token string">"b"</span><span class="token punctuation">]</span>     
<span class="token punctuation">[</span><span class="token string">"a"</span> <span class="token string">" "</span> <span class="token string">"b"</span> <span class="token string">" "</span> <span class="token string">"c"</span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token string">"a b c"</span><span class="token punctuation">]</span>

连接
hello world <span class="token operator">!</span>
</code></pre></div><h4 id="bytes包" tabindex="-1"><a class="header-anchor" href="#bytes包" aria-hidden="true">#</a> bytes包</h4>
<p>官方文档：<a href="https://pkg.go.dev/bytes" target="_blank" rel="noopener noreferrer">https://pkg.go.dev/bytes<ExternalLinkIcon/></a></p>
<p>中文文档：<a href="https://studygolang.com/static/pkgdoc/pkg/bytes.htm" target="_blank" rel="noopener noreferrer">https://studygolang.com/static/pkgdoc/pkg/bytes.htm<ExternalLinkIcon/></a></p>
<p>bytes包实现了操作<code v-pre>[]byte</code>的常用函数，与<code v-pre>string</code>包函数类似，简单介绍几个方法</p>
<table>
<thead>
<tr>
<th>分类</th>
<th>函数</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>相等判断</td>
<td><code v-pre>func Equal(a, b []byte) bool</code></td>
<td>判断两个切片的内容是否完全相同</td>
</tr>
<tr>
<td></td>
<td><code v-pre>func EqualFold(s, t []byte) bool</code></td>
<td>判断两个<code v-pre>utf-8</code>编码切片（将unicode大写、小写、标题三种格式字符视为相同）是否相同</td>
</tr>
<tr>
<td>转换</td>
<td><code v-pre>func Runes(s []byte) []rune</code></td>
<td>返回和s等价的[]rune切片</td>
</tr>
</tbody>
</table>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"bytes"</span>
	<span class="token string">"fmt"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 字节切片相等判断</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"字节切片相等判断"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>bytes<span class="token punctuation">.</span><span class="token function">Equal</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">"ABC"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">"ABC"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>     <span class="token comment">// 完全相等</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>bytes<span class="token punctuation">.</span><span class="token function">EqualFold</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">"ABC"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">"abc"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 不区分大小写</span>

	<span class="token comment">// 转换</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"\n转换"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%q\n"</span><span class="token punctuation">,</span> bytes<span class="token punctuation">.</span><span class="token function">Runes</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">"你好"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 输出结果</span>
<span class="token comment">// true</span>
<span class="token comment">// true       </span>
<span class="token comment">// ['你' '好']</span>
</code></pre></div><h4 id="unicode系列" tabindex="-1"><a class="header-anchor" href="#unicode系列" aria-hidden="true">#</a> unicode系列</h4>
<p><code v-pre>unicode</code>包包含基本的字符判断函数。</p>
<p><code v-pre>utf8</code>包主要负责<code v-pre>rune</code>和<code v-pre>byte</code>之间的转换。</p>
<p><code v-pre>utf16</code>包负责<code v-pre>rune</code>和<code v-pre>uint16</code>数组之间的转换</p>
<p>官方文档：</p>
<p><code v-pre>unicode</code>：<a href="https://pkg.go.dev/unicode" target="_blank" rel="noopener noreferrer">https://pkg.go.dev/unicode<ExternalLinkIcon/></a></p>
<p><code v-pre>unicode/utf8</code>：<a href="https://pkg.go.dev/unicode/utf8" target="_blank" rel="noopener noreferrer">https://pkg.go.dev/unicode/utf8<ExternalLinkIcon/></a></p>
<p><code v-pre>unicode/utf16</code>：<a href="https://pkg.go.dev/unicode/utf16" target="_blank" rel="noopener noreferrer">https://pkg.go.dev/unicode/utf16<ExternalLinkIcon/></a></p>
<table>
<thead>
<tr>
<th>包名</th>
<th>分类</th>
<th>函数</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>unicode</code></td>
<td>字符判断</td>
<td><code v-pre>func Is(rangeTab *RangeTable, r rune) bool</code></td>
<td>判断<code v-pre>r</code>是否在<code v-pre>RangeTable</code>内</td>
</tr>
<tr>
<td></td>
<td></td>
<td><code v-pre>func IsSpace(r rune) bool</code></td>
<td>是否是空白字符（空字符串会报错）</td>
</tr>
<tr>
<td></td>
<td></td>
<td><code v-pre>func IsDigit(r rune) bool</code></td>
<td>是否是十进制数字</td>
</tr>
<tr>
<td></td>
<td></td>
<td><code v-pre>func IsNumber(r rune) bool</code></td>
<td>是否是数字</td>
</tr>
<tr>
<td></td>
<td></td>
<td><code v-pre>func IsLetter(r rune) bool</code></td>
<td>是否是字母</td>
</tr>
<tr>
<td></td>
<td></td>
<td><code v-pre>func IsLower(r rune) bool</code></td>
<td>是否是小写字母</td>
</tr>
<tr>
<td></td>
<td></td>
<td><code v-pre>func IsUpper(r rune) bool</code></td>
<td>是否是大写字母</td>
</tr>
<tr>
<td></td>
<td>转换</td>
<td><code v-pre>func ToLower(r rune) rune</code></td>
<td>返回对应的小写字符</td>
</tr>
<tr>
<td></td>
<td></td>
<td><code v-pre>func ToUpper(r rune) rune</code></td>
<td>返回对应的小写字符</td>
</tr>
<tr>
<td><code v-pre>unicode/utf8</code></td>
<td>bytes转rune</td>
<td><code v-pre>func DecodeRune(p []byte) (r rune, size int)</code></td>
<td>解码 []byte中<strong>第一个</strong><code v-pre>UTF-8</code> 编码序列，返回该码值和长度</td>
</tr>
<tr>
<td></td>
<td></td>
<td><code v-pre>func DecodeLastRune(p []byte) (r rune, size int)</code></td>
<td>同<code v-pre>DecodeRune</code>，是最后一个<code v-pre>UTF-8</code> 编码序列</td>
</tr>
<tr>
<td></td>
<td></td>
<td><code v-pre>func DecodeRuneInString(s string) (r rune, size int)</code></td>
<td>同<code v-pre>DecodeRune</code>，传入的是字符串</td>
</tr>
<tr>
<td></td>
<td></td>
<td><code v-pre>func DecodeLastRuneInString(s string) (r rune, size int)</code></td>
<td>同<code v-pre>DecodeRune</code>，传入的是字符串，是最后一个<code v-pre>UTF-8</code> 编码序列</td>
</tr>
<tr>
<td></td>
<td>rune转bytes</td>
<td><code v-pre>func EncodeRune(p []byte, r rune) int</code></td>
<td>将 rune的<code v-pre>UTF-8 </code>编码序列写入<code v-pre>[]byte</code>，并返回写入的字节数。p需要满足足够的长度</td>
</tr>
<tr>
<td></td>
<td>检测</td>
<td><code v-pre>func FullRune(p []byte) bool</code></td>
<td>检测<code v-pre>[]byte</code>是否包含一个完整 <code v-pre>UTF-8</code>编码（只要包含一个就返回true）</td>
</tr>
<tr>
<td></td>
<td></td>
<td><code v-pre>func FullRuneInString(s string) bool</code></td>
<td>同上，输入是一个字符串</td>
</tr>
<tr>
<td></td>
<td></td>
<td><code v-pre>func RuneStart(b byte) bool</code></td>
<td>检测字节 byte b 是否可以作为某个 rune 编码的第一个字节</td>
</tr>
<tr>
<td></td>
<td></td>
<td><code v-pre>func Valid(p []byte) bool</code></td>
<td>检测切片<code v-pre>[]byte</code>是否包含完整且合法的<code v-pre>UTF-8</code>编码序列（不能有乱码）</td>
</tr>
<tr>
<td></td>
<td></td>
<td><code v-pre>func ValidRune(r rune) bool</code></td>
<td>检测字符<code v-pre>rune</code>是否包含完整且合法的<code v-pre>UTF-8</code>编码序列</td>
</tr>
<tr>
<td></td>
<td></td>
<td><code v-pre>func ValidString(s string) bool</code></td>
<td>检测字符串<code v-pre>string</code>是否包含完整且合法的<code v-pre>UTF-8</code>编码序列</td>
</tr>
<tr>
<td></td>
<td>统计</td>
<td><code v-pre>func RuneCount(p []byte) int</code></td>
<td>统计<code v-pre>[]byte</code>中<code v-pre>rune</code>的个数</td>
</tr>
<tr>
<td></td>
<td></td>
<td><code v-pre>func RuneCountInString(s string) (n int)</code></td>
<td>同上，输入是字符串</td>
</tr>
<tr>
<td></td>
<td></td>
<td><code v-pre>func RuneLen(r rune) int</code></td>
<td>统计<code v-pre>rune</code>编码后的字节数</td>
</tr>
<tr>
<td><code v-pre>unicode/utf16</code></td>
<td>转换</td>
<td><code v-pre>func Encode(s []rune) []uint16</code></td>
<td>编码<code v-pre>rune</code>数组为<code v-pre>uint16</code>数组</td>
</tr>
<tr>
<td></td>
<td></td>
<td><code v-pre>func Decode(s []uint16) []rune</code></td>
<td>解码<code v-pre>uint16</code>数组为<code v-pre>rune</code>数组</td>
</tr>
</tbody>
</table>
<blockquote>
<p>编码：字符串 -&gt; bytes， rune -&gt; bytes</p>
<p>解码：bytes -&gt; rune， bytes -&gt; 字符串</p>
</blockquote>
<p>示例代码</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"unicode"</span>
	<span class="token string">"unicode/utf16"</span>
	<span class="token string">"unicode/utf8"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// unicode包 - 判断</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"unicode包 - 判断"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>unicode<span class="token punctuation">.</span><span class="token function">Is</span><span class="token punctuation">(</span>unicode<span class="token punctuation">.</span>Scripts<span class="token punctuation">[</span><span class="token string">"Han"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token char">'a'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 判断是否是汉字</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>unicode<span class="token punctuation">.</span><span class="token function">Is</span><span class="token punctuation">(</span>unicode<span class="token punctuation">.</span>Scripts<span class="token punctuation">[</span><span class="token string">"Han"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token char">'中'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>unicode<span class="token punctuation">.</span><span class="token function">IsSpace</span><span class="token punctuation">(</span><span class="token char">' '</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// true</span>

	<span class="token comment">// unicode包 - 转换</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"\nunicode包 - 转换"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%c\n"</span><span class="token punctuation">,</span> unicode<span class="token punctuation">.</span><span class="token function">ToLower</span><span class="token punctuation">(</span><span class="token char">'A'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%c\n"</span><span class="token punctuation">,</span> unicode<span class="token punctuation">.</span><span class="token function">ToLower</span><span class="token punctuation">(</span><span class="token char">'中'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// unicode/utf8 - bytes转rune</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"\nunicode/utf8 -bytes转rune"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>utf8<span class="token punctuation">.</span><span class="token function">DecodeRune</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">"你好"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>     <span class="token comment">// 解码第一个，20320 3</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%c\n"</span><span class="token punctuation">,</span> <span class="token number">20320</span><span class="token punctuation">)</span>                      <span class="token comment">// 你</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>utf8<span class="token punctuation">.</span><span class="token function">DecodeLastRune</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">"你好"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 解码最后一个，22909 3</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%c\n"</span><span class="token punctuation">,</span> <span class="token number">22909</span><span class="token punctuation">)</span>                      <span class="token comment">// 好</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>utf8<span class="token punctuation">.</span><span class="token function">DecodeRuneInString</span><span class="token punctuation">(</span><span class="token string">"你好"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>utf8<span class="token punctuation">.</span><span class="token function">DecodeLastRuneInString</span><span class="token punctuation">(</span><span class="token string">"你好"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// unicode/utf8 - rune转bytes</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"\nunicode/utf8 - rune转bytes"</span><span class="token punctuation">)</span>
	buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>utf8<span class="token punctuation">.</span><span class="token function">EncodeRune</span><span class="token punctuation">(</span>buf<span class="token punctuation">,</span> <span class="token char">'世'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%#v\n"</span><span class="token punctuation">,</span> buf<span class="token punctuation">)</span> <span class="token comment">// []byte{0xe4, 0xb8, 0x96}</span>

	<span class="token comment">// unicode/utf8 - 检测</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"\nunicode/utf8 - 检测"</span><span class="token punctuation">)</span>
	buf2 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">{</span><span class="token number">228</span><span class="token punctuation">,</span> <span class="token number">184</span><span class="token punctuation">,</span> <span class="token number">150</span><span class="token punctuation">}</span>           <span class="token comment">// 世</span>
	buf3 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">{</span><span class="token number">228</span><span class="token punctuation">,</span> <span class="token number">184</span><span class="token punctuation">,</span> <span class="token number">150</span><span class="token punctuation">,</span> <span class="token number">228</span><span class="token punctuation">,</span> <span class="token number">184</span><span class="token punctuation">}</span> <span class="token comment">// 在buf2的基础上再加上两个字节, 世\xe4\xb8</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>utf8<span class="token punctuation">.</span><span class="token function">FullRune</span><span class="token punctuation">(</span>buf2<span class="token punctuation">)</span><span class="token punctuation">)</span>     <span class="token comment">// true</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>utf8<span class="token punctuation">.</span><span class="token function">FullRune</span><span class="token punctuation">(</span>buf3<span class="token punctuation">)</span><span class="token punctuation">)</span>     <span class="token comment">// true</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>utf8<span class="token punctuation">.</span><span class="token function">FullRune</span><span class="token punctuation">(</span>buf2<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// false</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>utf8<span class="token punctuation">.</span><span class="token function">Valid</span><span class="token punctuation">(</span>buf2<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>utf8<span class="token punctuation">.</span><span class="token function">Valid</span><span class="token punctuation">(</span>buf3<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// false</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%q\n"</span><span class="token punctuation">,</span> buf3<span class="token punctuation">)</span>

	<span class="token comment">// unicode/utf16 - rune与uint16转换</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%#v\n"</span><span class="token punctuation">,</span> utf16<span class="token punctuation">.</span><span class="token function">Encode</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">rune</span><span class="token punctuation">(</span><span class="token string">"你好"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>            <span class="token comment">// []uint16{0x4f60, 0x597d}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%q\n"</span><span class="token punctuation">,</span> utf16<span class="token punctuation">.</span><span class="token function">Decode</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">uint16</span><span class="token punctuation">{</span><span class="token number">0x4f60</span><span class="token punctuation">,</span> <span class="token number">0x597d</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// ['你' '好']</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<blockquote>
<p>utf8编码下，英文占1个字节，汉字占3个字节；</p>
<p>utf16编码下，英文占1个字节，汉字占1个字节</p>
</blockquote>
<h3 id="布尔值" tabindex="-1"><a class="header-anchor" href="#布尔值" aria-hidden="true">#</a> 布尔值</h3>
<p>布尔值的零值是<code v-pre>false</code>，布尔值无法隐式转换为数值(1或0)</p>
<h3 id="数组" tabindex="-1"><a class="header-anchor" href="#数组" aria-hidden="true">#</a> 数组</h3>
<p>数组的特点</p>
<ul>
<li>数组一旦定义，元素个数不可改变，即不能增加或删除元素；可以改元素的值</li>
<li>元素数据类型必须一致</li>
<li>相同数据类型、长度固定的序列才是一样的，即<code v-pre>[2]int</code>和<code v-pre>[3]int</code>是不同</li>
<li>数组的零值是元素数据类型的零值</li>
<li>没有&quot;空数组&quot;的说法</li>
<li>数组是值类型</li>
</ul>
<h4 id="声明" tabindex="-1"><a class="header-anchor" href="#声明" aria-hidden="true">#</a> 声明</h4>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> a1 <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token builtin">int</span>                   <span class="token comment">// 声明数组；3代表数组元素个数（必须指定）；未赋值则默认使用零值，这里是0</span>
	<span class="token keyword">var</span> a2 <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token builtin">int</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">}</span> <span class="token comment">// 声明并赋值</span>
	a3 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">}</span>           <span class="token comment">// 短变量声明</span>
	a4 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">}</span>      <span class="token comment">//使用...后数组长度会自动判断；...只能用在值的位置上不可以用在类型的位置上</span>
	a5 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">:</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">}</span>           <span class="token comment">// 索引1的位置数据是-1，其他位置是零值</span>

	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%#v\n"</span><span class="token punctuation">,</span> a1<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%#v\n"</span><span class="token punctuation">,</span> a2<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%#v\n"</span><span class="token punctuation">,</span> a3<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%#v\n"</span><span class="token punctuation">,</span> a4<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%#v\n"</span><span class="token punctuation">,</span> a5<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span>int<span class="token punctuation">{</span><span class="token number">0</span>, <span class="token number">0</span>, <span class="token number">0</span><span class="token punctuation">}</span>
<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span>int<span class="token punctuation">{</span><span class="token number">4</span>, <span class="token number">5</span>, <span class="token number">6</span><span class="token punctuation">}</span>   
<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span>int<span class="token punctuation">{</span><span class="token number">7</span>, <span class="token number">8</span>, <span class="token number">9</span><span class="token punctuation">}</span>   
<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span>int<span class="token punctuation">{</span><span class="token number">10</span>, <span class="token number">11</span>, <span class="token number">12</span><span class="token punctuation">}</span>
<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span>int<span class="token punctuation">{</span><span class="token number">0</span>, -1<span class="token punctuation">}</span>   
</code></pre></div><h4 id="基本操作" tabindex="-1"><a class="header-anchor" href="#基本操作" aria-hidden="true">#</a> 基本操作</h4>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	a <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">}</span>

	<span class="token comment">// 遍历</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> a <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 截取</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// 索引0-2，注意不支持[:-2]这种负数表示方法</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token number">10</span>
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
</code></pre></div><h4 id="多维数组" tabindex="-1"><a class="header-anchor" href="#多维数组" aria-hidden="true">#</a> 多维数组</h4>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 二维数组</span>
	a2 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a2<span class="token punctuation">)</span> <span class="token comment">// [[0 0 0] [0 0 0]]</span>

	<span class="token comment">// 三维数组</span>
	a3 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a3<span class="token punctuation">)</span>
	<span class="token comment">/*
	   [                            第一个数组为长度为1的数组
	      [                         第一个数组的第1个元素为另一个长度为2的数组
	         [0 0 0] [0 0 0]        每个数组有两个元素，每个元素是一个长度为3的数组
	      ]
	   ]

	*/</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="切片" tabindex="-1"><a class="header-anchor" href="#切片" aria-hidden="true">#</a> 切片</h3>
<p>切片是长度可变的数组，切片的特点</p>
<ul>
<li>
<p>可以动态添加删除元素</p>
</li>
<li>
<p>所有元素数据类型也必须是一样</p>
</li>
<li>
<p>切片的零值是<code v-pre>nil</code></p>
</li>
<li>
<p>切片是引用类型</p>
</li>
</ul>
<p>切片由三部分组成</p>
<ul>
<li>指针：存放底层数组的内存地址</li>
<li>长度：指的是切片的元素个数，使用<code v-pre>len(切片)</code>输出长度</li>
<li>容量：底层数组的长度，使用<code v-pre>cap(切片)</code>输出容量大小</li>
</ul>
<h4 id="声明-1" tabindex="-1"><a class="header-anchor" href="#声明-1" aria-hidden="true">#</a> 声明</h4>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 声明方式1：与数组类似，不同的是不需要指定元素个数</span>
	<span class="token keyword">var</span> s1 <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span>  <span class="token comment">// 只声明，默认为零值，即nil</span>
	s2 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// 空切片</span>

	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%#v\n"</span><span class="token punctuation">,</span> s1<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%#v\n"</span><span class="token punctuation">,</span> s2<span class="token punctuation">)</span>

	<span class="token comment">// 声明方式2：使用make</span>
	s3 <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token comment">//声明一个int类型的切片,长度为1，容量为2；如果容量不指定，那么容量等同于长度</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%#v\n"</span><span class="token punctuation">,</span> s3<span class="token punctuation">)</span>

	<span class="token comment">// 查看长度和容量</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">len</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>s2<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>s3<span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">cap</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>s2<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>s3<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span><span class="token punctuation">]</span>int<span class="token punctuation">(</span>nil<span class="token punctuation">)</span>
<span class="token punctuation">[</span><span class="token punctuation">]</span>int<span class="token punctuation">{</span><span class="token punctuation">}</span> 
<span class="token punctuation">[</span><span class="token punctuation">]</span>int<span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span>
<span class="token number">0</span> <span class="token number">0</span> <span class="token number">1</span>   
<span class="token number">0</span> <span class="token number">0</span> <span class="token number">2</span>   
</code></pre></div><h4 id="基本操作-1" tabindex="-1"><a class="header-anchor" href="#基本操作-1" aria-hidden="true">#</a> 基本操作</h4>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"bytes"</span>
	<span class="token string">"fmt"</span>
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
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"原始数据：%#v\n"</span><span class="token punctuation">,</span> s1<span class="token punctuation">)</span>

	<span class="token comment">// 添加元素</span>
	s1 <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>s1<span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token char">'8'</span><span class="token punctuation">,</span> <span class="token char">'中'</span><span class="token punctuation">)</span> <span class="token comment">// 可以一次添加多个， '8'和'中'虽然为rune，本质上还是int类型</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"添加元素：%#v\n"</span><span class="token punctuation">,</span> s1<span class="token punctuation">)</span>    <span class="token comment">// []int{1, 2, 3, 4, 5, 6, 7, 56, 20013}</span>

	<span class="token comment">// 删除元素</span>
	s1 <span class="token operator">=</span> s1<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token function">len</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">]</span>                 <span class="token comment">// 删除第一个元素</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"删除元素(第一个)：%#v\n"</span><span class="token punctuation">,</span> s1<span class="token punctuation">)</span>  <span class="token comment">//</span>
	s1 <span class="token operator">=</span> s1<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token function">len</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>                <span class="token comment">// 删除最后一个元素</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"删除元素(最后一个)：%#v\n"</span><span class="token punctuation">,</span> s1<span class="token punctuation">)</span> <span class="token comment">//</span>

	<span class="token comment">// 切片浅拷贝</span>
	s2 <span class="token operator">:=</span> s1<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">]</span>   <span class="token comment">// 浅拷贝</span>
	s3 <span class="token operator">:=</span> s1<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token comment">// 浅拷贝</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"使用[:]浅拷贝：%p &lt;---> %p\n"</span><span class="token punctuation">,</span> s1<span class="token punctuation">,</span> s2<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"使用[:]浅拷贝：%p &lt;---> %p\n"</span><span class="token punctuation">,</span> s1<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> s3<span class="token punctuation">)</span>

	<span class="token comment">// 切片深拷贝</span>
	s4 <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token function">copy</span><span class="token punctuation">(</span>s4<span class="token punctuation">,</span> s1<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"使用copy深拷贝：%p &lt;---> %p\n"</span><span class="token punctuation">,</span> s1<span class="token punctuation">,</span> s4<span class="token punctuation">)</span> <span class="token comment">// 深拷贝方式1</span>
	s5 <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> s1 <span class="token punctuation">{</span>
		s5 <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>s5<span class="token punctuation">,</span> v<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"遍历方式：%p &lt;---> %p\n"</span><span class="token punctuation">,</span> s1<span class="token punctuation">,</span> s5<span class="token punctuation">)</span> <span class="token comment">// 深拷贝方式2</span>

	<span class="token comment">// 解包：切片...</span>
	s6 <span class="token operator">:=</span> <span class="token function">append</span><span class="token punctuation">(</span>s1<span class="token punctuation">,</span> s1<span class="token operator">...</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"解包用法示例：%#v\n"</span><span class="token punctuation">,</span> s6<span class="token punctuation">)</span> <span class="token comment">//</span>

	<span class="token comment">// 切片比较 - byte切片使用提供的函数比较</span>
	a1 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">uint8</span><span class="token punctuation">{</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">40</span><span class="token punctuation">,</span> <span class="token number">78</span><span class="token punctuation">,</span> <span class="token number">115</span><span class="token punctuation">,</span> <span class="token number">253</span><span class="token punctuation">}</span>
	a2 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">uint8</span><span class="token punctuation">{</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">40</span><span class="token punctuation">,</span> <span class="token number">78</span><span class="token punctuation">,</span> <span class="token number">115</span><span class="token punctuation">,</span> <span class="token number">253</span><span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"[]byte切片比较: %t\n"</span><span class="token punctuation">,</span> bytes<span class="token punctuation">.</span><span class="token function">Equal</span><span class="token punctuation">(</span>a1<span class="token punctuation">,</span> a2<span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// 切片比较 - 非byte类型</span>
	a3 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"hello"</span><span class="token punctuation">,</span> <span class="token string">"world"</span><span class="token punctuation">}</span>
	a4 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"hello"</span><span class="token punctuation">,</span> <span class="token string">"world"</span><span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"[]string切片比较: %t\n"</span><span class="token punctuation">,</span> <span class="token function">EqualStringSlice</span><span class="token punctuation">(</span>a3<span class="token punctuation">,</span> a4<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>原始数据：<span class="token punctuation">[</span><span class="token punctuation">]</span>int<span class="token punctuation">{</span><span class="token number">1</span>, <span class="token number">2</span>, <span class="token number">3</span>, <span class="token number">4</span>, <span class="token number">5</span><span class="token punctuation">}</span>
添加元素：<span class="token punctuation">[</span><span class="token punctuation">]</span>int<span class="token punctuation">{</span><span class="token number">1</span>, <span class="token number">2</span>, <span class="token number">3</span>, <span class="token number">4</span>, <span class="token number">5</span>, <span class="token number">6</span>, <span class="token number">7</span>, <span class="token number">56</span>, <span class="token number">20013</span><span class="token punctuation">}</span>        
删除元素<span class="token punctuation">(</span>第一个<span class="token punctuation">)</span>：<span class="token punctuation">[</span><span class="token punctuation">]</span>int<span class="token punctuation">{</span><span class="token number">2</span>, <span class="token number">3</span>, <span class="token number">4</span>, <span class="token number">5</span>, <span class="token number">6</span>, <span class="token number">7</span>, <span class="token number">56</span>, <span class="token number">20013</span><span class="token punctuation">}</span>   
删除元素<span class="token punctuation">(</span>最后一个<span class="token punctuation">)</span>：<span class="token punctuation">[</span><span class="token punctuation">]</span>int<span class="token punctuation">{</span><span class="token number">2</span>, <span class="token number">3</span>, <span class="token number">4</span>, <span class="token number">5</span>, <span class="token number">6</span>, <span class="token number">7</span>, <span class="token number">56</span><span class="token punctuation">}</span>        
使用<span class="token punctuation">[</span>:<span class="token punctuation">]</span>浅拷贝：0xc00012e0f8 <span class="token operator">&lt;</span>---<span class="token operator">></span> 0xc00012e0f8         
使用<span class="token punctuation">[</span>:<span class="token punctuation">]</span>浅拷贝：0xc00012e100 <span class="token operator">&lt;</span>---<span class="token operator">></span> 0xc00012e100         
使用copy深拷贝：0xc00012e0f8 <span class="token operator">&lt;</span>---<span class="token operator">></span> 0xc00012e190        
遍历方式：0xc00012e0f8 <span class="token operator">&lt;</span>---<span class="token operator">></span> 0xc000156000              
解包用法示例：<span class="token punctuation">[</span><span class="token punctuation">]</span>int<span class="token punctuation">{</span><span class="token number">2</span>, <span class="token number">3</span>, <span class="token number">4</span>, <span class="token number">5</span>, <span class="token number">6</span>, <span class="token number">7</span>, <span class="token number">56</span>, <span class="token number">2</span>, <span class="token number">3</span>, <span class="token number">4</span>, <span class="token number">5</span>, <span class="token number">6</span>, <span class="token number">7</span>, <span class="token number">56</span><span class="token punctuation">}</span>
<span class="token punctuation">[</span><span class="token punctuation">]</span>byte切片比较: <span class="token boolean">true</span>                                   
<span class="token punctuation">[</span><span class="token punctuation">]</span>string切片比较: <span class="token boolean">true</span>
</code></pre></div><h4 id="容量扩容机制" tabindex="-1"><a class="header-anchor" href="#容量扩容机制" aria-hidden="true">#</a> 容量扩容机制</h4>
<p>当<strong>长度==容量</strong>时，再<code v-pre>append()</code>插入元素，go会重新申请一个底层数组，将原数据数据拷贝过去，修改切片指针，再用来存放我们插入的数据</p>
<p>两个并不准确的结论：</p>
<ul>
<li>当原切片长度小于1024时，新切片的容量会直接翻倍</li>
<li>当原切片的容量大于等于1024时，会反复地增加25%，直到新容量超过所需要的容量</li>
</ul>
<p><strong>测试1：可以看到是翻倍的</strong></p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 定义切片</span>
	s <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"当前长度: %2d | 当前容量: %2d\n"</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// 循环添加元素</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">18</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		s <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"当前长度: %2d | 当前容量: %2d\n"</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 输出结果</span>
	<span class="token comment">//当前长度:  0 | 当前容量:  0</span>
	<span class="token comment">//当前长度:  1 | 当前容量:  1</span>
	<span class="token comment">//当前长度:  2 | 当前容量:  2</span>
	<span class="token comment">//当前长度:  3 | 当前容量:  4</span>
	<span class="token comment">//当前长度:  4 | 当前容量:  4</span>
	<span class="token comment">//当前长度:  5 | 当前容量:  8</span>
	<span class="token comment">//当前长度:  6 | 当前容量:  8</span>
	<span class="token comment">//当前长度:  7 | 当前容量:  8</span>
	<span class="token comment">//当前长度:  8 | 当前容量:  8</span>
	<span class="token comment">//当前长度:  9 | 当前容量: 16</span>
	<span class="token comment">//当前长度: 10 | 当前容量: 16</span>
	<span class="token comment">//当前长度: 11 | 当前容量: 16</span>
	<span class="token comment">//当前长度: 12 | 当前容量: 16</span>
	<span class="token comment">//当前长度: 13 | 当前容量: 16</span>
	<span class="token comment">//当前长度: 14 | 当前容量: 16</span>
	<span class="token comment">//当前长度: 15 | 当前容量: 16</span>
	<span class="token comment">//当前长度: 16 | 当前容量: 16</span>
	<span class="token comment">//当前长度: 17 | 当前容量: 32</span>
	<span class="token comment">//当前长度: 18 | 当前容量: 32</span>
	<span class="token comment">//当前长度: 19 | 当前容量: 32</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p><strong>测试2：可以看到并不是25%</strong></p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 定义切片</span>
	s <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">2000</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"当前长度: %2d | 当前容量: %2d\n"</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// 循环添加元素</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		s <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"当前长度: %2d | 当前容量: %2d\n"</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 输出结果</span>
	<span class="token comment">//当前长度: 2000 | 当前容量: 2000</span>
	<span class="token comment">//当前长度: 2001 | 当前容量: 2720</span>
	<span class="token comment">//当前长度: 2002 | 当前容量: 2720</span>
	<span class="token comment">//当前长度: 2003 | 当前容量: 2720</span>
	<span class="token comment">//当前长度: 2004 | 当前容量: 2720</span>
	<span class="token comment">//当前长度: 2005 | 当前容量: 2720</span>
	<span class="token comment">//当前长度: 2006 | 当前容量: 2720</span>
	<span class="token comment">//当前长度: 2007 | 当前容量: 2720</span>
	<span class="token comment">//当前长度: 2008 | 当前容量: 2720</span>
	<span class="token comment">//当前长度: 2009 | 当前容量: 2720</span>
	<span class="token comment">//当前长度: 2010 | 当前容量: 2720</span>
	<span class="token comment">//当前长度: 2011 | 当前容量: 2720</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>不同版本的<code v-pre>go</code>扩容机制也并不一样，具体还需要去看源代码<code v-pre>src/runtime/slice.go</code>中的<code v-pre>growslice</code>函数</p>
<h4 id="容量扩容面试题" tabindex="-1"><a class="header-anchor" href="#容量扩容面试题" aria-hidden="true">#</a> 容量扩容面试题</h4>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	s1 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">40</span><span class="token punctuation">}</span>
	s2 <span class="token operator">:=</span> s1

	s1 <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>s1<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
	s1<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">11</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s1<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s2<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><details class="custom-container details"><summary>点击查看输出结果和解释</summary>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token number">11</span>
<span class="token number">10</span>

第一个为11
第二个为10，是因为s1添加元素后会有容量扩容操作，将s1的数据赋值给新的内存空间，s1指向新的地址，s1的修改自然影响不到s2，s2的数据还是旧的，就是10
</code></pre></div></details>
<h3 id="映射" tabindex="-1"><a class="header-anchor" href="#映射" aria-hidden="true">#</a> 映射</h3>
<p>映射是存储一系列无序的key/value键值对</p>
<p>key只能为可使用==运算的值类型（字符串、数字、布尔、数组），value可以为任意类型</p>
<p>零值为nil</p>
<h4 id="声明-2" tabindex="-1"><a class="header-anchor" href="#声明-2" aria-hidden="true">#</a> 声明</h4>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 直接声明</span>
	<span class="token keyword">var</span> names1 <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span>     <span class="token comment">//使用var声明但是不初始化(没有分配内存空间)后面赋值会报错；不带大括号的是类型</span>
	<span class="token keyword">var</span> names2 <span class="token operator">=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// 声明并初始化；带大括号的是值</span>

	<span class="token comment">// 使用make声明</span>
	<span class="token keyword">var</span> names3 <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span>      <span class="token comment">// 使用make声明并初始化</span>
	<span class="token keyword">var</span> names4 <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token comment">// 使用make声明并初始化，并指定容量（注意：map的容量不可以使用cap函数获取，会报错）</span>

	<span class="token comment">// 尝试赋值</span>
	<span class="token comment">//names1["a"] = "b" // 这个会报错，panic: assignment to entry in nil map</span>
	names2<span class="token punctuation">[</span><span class="token string">"a"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"b"</span>
	names3<span class="token punctuation">[</span><span class="token string">"a"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"b"</span>
	names4<span class="token punctuation">[</span><span class="token string">"a"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"b"</span>

	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"类型: %T | 值: %#v | 元素个数: %d\n"</span><span class="token punctuation">,</span> names1<span class="token punctuation">,</span> names1<span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>names1<span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"类型: %T | 值: %#v | 元素个数: %d\n"</span><span class="token punctuation">,</span> names2<span class="token punctuation">,</span> names2<span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>names2<span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"类型: %T | 值: %#v | 元素个数: %d\n"</span><span class="token punctuation">,</span> names3<span class="token punctuation">,</span> names3<span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>names3<span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"类型: %T | 值: %#v | 元素个数: %d\n"</span><span class="token punctuation">,</span> names4<span class="token punctuation">,</span> names4<span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>names4<span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">//类型: map[string]string | 值: map[string]string(nil) | 元素个数: 0</span>
	<span class="token comment">//类型: map[string]string | 值: map[string]string{"a":"b"} | 元素个数: 1</span>
	<span class="token comment">//类型: map[string]string | 值: map[string]string{"a":"b"} | 元素个数: 1</span>
	<span class="token comment">//类型: map[string]string | 值: map[string]string{"a":"b"} | 元素个数: 1</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="基本操作-2" tabindex="-1"><a class="header-anchor" href="#基本操作-2" aria-hidden="true">#</a> 基本操作</h4>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 声明数组</span>
	names <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span>

	<span class="token comment">// 添加元素，若已存在会覆盖</span>
	names<span class="token punctuation">[</span><span class="token string">"Top1"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"Go"</span>
	names<span class="token punctuation">[</span><span class="token string">"Top2"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"Python"</span>
	names<span class="token punctuation">[</span><span class="token string">"Top3"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"JavaScript"</span>
	names<span class="token punctuation">[</span><span class="token string">"Top4"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">""</span>

	<span class="token comment">// 删除元素, delete函数只用于map，函数无返回值</span>
	<span class="token function">delete</span><span class="token punctuation">(</span>names<span class="token punctuation">,</span> <span class="token string">"Top3"</span><span class="token punctuation">)</span>

	<span class="token comment">// 遍历map，遍历出来是无序的</span>
	<span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> names <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"names[%s]=%s\n"</span><span class="token punctuation">,</span> k<span class="token punctuation">,</span> v<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">//names[Top2]=Python</span>
	<span class="token comment">//names[Top4]=</span>
	<span class="token comment">//names[Top1]=Go</span>

	<span class="token comment">// 判断元素是否存在,若不存在默认会返回对应基本数据类型的零值,所以我们一定要通过返回的布尔值来判断元素是否存在</span>
	key <span class="token operator">:=</span> <span class="token string">"Top4"</span>
	<span class="token keyword">if</span> v<span class="token punctuation">,</span> ok <span class="token operator">:=</span> names<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Key %s exists and value is %q\n"</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> v<span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Key %s does not exist\n"</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// Key Top4 exists and value is ""</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="value可以是一个方法" tabindex="-1"><a class="header-anchor" href="#value可以是一个方法" aria-hidden="true">#</a> value可以是一个方法</h4>
<p>map的value可以是一个方法</p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	m1 <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token keyword">func</span><span class="token punctuation">(</span>op <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

	m1<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">func</span><span class="token punctuation">(</span>op <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> op <span class="token punctuation">}</span>
	m1<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">func</span><span class="token punctuation">(</span>op <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> op <span class="token operator">*</span> op <span class="token punctuation">}</span>
	m1<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">func</span><span class="token punctuation">(</span>op <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> op <span class="token operator">*</span> op <span class="token operator">*</span> op <span class="token punctuation">}</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>m1<span class="token punctuation">)</span> <span class="token comment">// map[1:0x47b920 2:0x47b940 3:0x47b960]</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>m1<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> m1<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> m1<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 2 4 8</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="实现set类型" tabindex="-1"><a class="header-anchor" href="#实现set类型" aria-hidden="true">#</a> 实现set类型</h4>
<p>go语言中没有<code v-pre>set</code>类型，可以使用map来自定义<code v-pre>set</code></p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 初始化set</span>
	intSet <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token builtin">bool</span><span class="token punctuation">)</span>

	<span class="token comment">// 添加元素</span>
	intSet<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span>
	intSet<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">false</span>

	<span class="token comment">// 删除元素</span>
	<span class="token function">delete</span><span class="token punctuation">(</span>intSet<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>

	<span class="token comment">// 检查元素是否存在</span>
	n <span class="token operator">:=</span> <span class="token number">1</span>
	<span class="token keyword">if</span> intSet<span class="token punctuation">[</span>n<span class="token punctuation">]</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%d is in set"</span><span class="token punctuation">,</span> n<span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%d is not in set"</span><span class="token punctuation">,</span> n<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 1 is in set</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote>
<p>更好的实现set的方法是使用结构体，参考《空结构体》章节</p>
</blockquote>
<h3 id="基本数据类型转换" tabindex="-1"><a class="header-anchor" href="#基本数据类型转换" aria-hidden="true">#</a> 基本数据类型转换</h3>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"math"</span>
	<span class="token string">"strconv"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">Int2Float</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Int转Float:\n"</span><span class="token punctuation">)</span>
	x <span class="token operator">:=</span> <span class="token number">99</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%T\n"</span><span class="token punctuation">,</span> <span class="token function">float32</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">Float2Int</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"\nFloat转Int:\n"</span><span class="token punctuation">)</span>

	<span class="token comment">// 小数部分会被截断</span>
	x <span class="token operator">:=</span> <span class="token number">100.7</span>
	y <span class="token operator">:=</span> <span class="token operator">-</span><span class="token number">3.9</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%T %d\n"</span><span class="token punctuation">,</span> <span class="token function">int64</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">int64</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 100</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%T %d\n"</span><span class="token punctuation">,</span> <span class="token function">int64</span><span class="token punctuation">(</span>y<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">int64</span><span class="token punctuation">(</span>y<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// -3</span>

	<span class="token comment">// 注意：</span>
	<span class="token comment">//fmt.Printf("%T\n", int64(3.0)) // 不会报错</span>
	<span class="token comment">//fmt.Printf("%T\n", int64(3.1)) // 会报错,小数部分不为0直接转就会报错</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">CeilAndFloorAndRound</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"\n向上取整/向下取整/四舍五入:\n"</span><span class="token punctuation">)</span>
	<span class="token comment">// 向上取整，函数签名：Ceil(x float64) float64</span>
	x <span class="token operator">:=</span> <span class="token number">1.11</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%T %f\n"</span><span class="token punctuation">,</span> math<span class="token punctuation">.</span><span class="token function">Ceil</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">,</span> math<span class="token punctuation">.</span><span class="token function">Ceil</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// float64 2.000000</span>

	<span class="token comment">// 向下取整，函数签名：Floor(x float64) float64</span>
	y <span class="token operator">:=</span> <span class="token number">1.99</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%T %f\n"</span><span class="token punctuation">,</span> math<span class="token punctuation">.</span><span class="token function">Floor</span><span class="token punctuation">(</span>y<span class="token punctuation">)</span><span class="token punctuation">,</span> math<span class="token punctuation">.</span><span class="token function">Floor</span><span class="token punctuation">(</span>y<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// float64 1.000000</span>

	<span class="token comment">// 四舍五入，函数签名：</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%T %f\n"</span><span class="token punctuation">,</span> math<span class="token punctuation">.</span><span class="token function">Round</span><span class="token punctuation">(</span><span class="token number">1.49</span><span class="token punctuation">)</span><span class="token punctuation">,</span> math<span class="token punctuation">.</span><span class="token function">Round</span><span class="token punctuation">(</span><span class="token number">1.49</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// float64 1.000000</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">AddQuote</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"\n输出添加双引号/单引号:\n"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strconv<span class="token punctuation">.</span><span class="token function">Quote</span><span class="token punctuation">(</span><span class="token string">"字符串"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strconv<span class="token punctuation">.</span><span class="token function">QuoteRune</span><span class="token punctuation">(</span><span class="token char">'字'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">String2Int</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"\n字符串转数字:\n"</span><span class="token punctuation">)</span>

	<span class="token comment">// 函数签名：Atoi(s string) (int, error)，等同于 ParseInt(s, 10, 0)</span>
	<span class="token keyword">if</span> i<span class="token punctuation">,</span> err <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">Atoi</span><span class="token punctuation">(</span><span class="token string">"10"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 函数签名：ParseInt(s string, base int, bitSize int) (i int64, err error)</span>
	<span class="token comment">// 指定字符串为10进制数字，转换到int8类型 (0:int、8:int8、16:int16、32:int32、64:int64)</span>
	<span class="token comment">// 用法一样的还有：ParseUint(s string, base int, bitSize int) (uint64, error)</span>
	<span class="token keyword">if</span> i<span class="token punctuation">,</span> err <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">ParseInt</span><span class="token punctuation">(</span><span class="token string">"b"</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 函数签名：ParseFloat(s string, bitSize int) (float64, error)</span>
	<span class="token keyword">if</span> i<span class="token punctuation">,</span> err <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">ParseFloat</span><span class="token punctuation">(</span><span class="token string">"1.20"</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">String2Bool</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"\n字符串转布尔:\n"</span><span class="token punctuation">)</span>
	<span class="token comment">// 转换规则代码：</span>
	<span class="token comment">//switch str {</span>
	<span class="token comment">//case "1", "t", "T", "true", "TRUE", "True":</span>
	<span class="token comment">//	return true, nil</span>
	<span class="token comment">//case "0", "f", "F", "false", "FALSE", "False":</span>
	<span class="token comment">//	return false, nil</span>
	<span class="token comment">//}</span>
	<span class="token comment">// 如果是TRue，这种字符串就无法转换了，可以先使用strings.ToLower或strings.ToUpper转换后再转为布尔值</span>
	<span class="token keyword">if</span> b<span class="token punctuation">,</span> err <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">ParseBool</span><span class="token punctuation">(</span><span class="token string">"true"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%T %v\n"</span><span class="token punctuation">,</span> b<span class="token punctuation">,</span> b<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">Int2String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"\n数字转字符串:\n"</span><span class="token punctuation">)</span>

	<span class="token comment">// int -> 字符串</span>
	x <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%T %s\n"</span><span class="token punctuation">,</span> x<span class="token punctuation">,</span> x<span class="token punctuation">)</span>

	<span class="token comment">// 函数签名：FormatInt(i int64, base int) string，base代表是多少进制的数字</span>
	<span class="token comment">// 先转成10进制数字，然后转为数字</span>
	<span class="token comment">// 用法一样的函数还有strconv.FormatUint</span>
	y <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">FormatInt</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%T %s\n"</span><span class="token punctuation">,</span> y<span class="token punctuation">,</span> y<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">Bool2String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"\n布尔转字符串:\n"</span><span class="token punctuation">)</span>

	<span class="token comment">// 函数签名：FormatBool(b bool) string</span>
	<span class="token comment">// 返回 "true" or "false"</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%s\n"</span><span class="token punctuation">,</span> strconv<span class="token punctuation">.</span><span class="token function">FormatBool</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">Any2String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"\n任意数据类型转字符串:\n"</span><span class="token punctuation">)</span>

	<span class="token comment">// 这里以float举例</span>

	<span class="token comment">// float -> 字符串</span>
	y <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"%.2f"</span><span class="token punctuation">,</span> <span class="token number">3.1415926</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%T %s\n"</span><span class="token punctuation">,</span> y<span class="token punctuation">,</span> y<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// ----------------------- 数字之间转换 ------------------</span>
	<span class="token comment">// 数字之间转换</span>
	<span class="token function">Int2Float</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">Float2Int</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 数字向上取整/向下取整/四舍五入</span>
	<span class="token function">CeilAndFloorAndRound</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// ----------------------- 字符串之间转换 ------------------</span>
	<span class="token comment">// 字节/Rune/字符串之间的转换参考strings/bytes/unicode包</span>
	<span class="token function">AddQuote</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 输出添加双引号/单引号</span>

	<span class="token comment">// ----------------------- 字符串转到其他类型 Parse系列函数------------------</span>
	<span class="token function">String2Int</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">String2Bool</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// ----------------------- 其他类型转到字符串 Format系列函数------------------</span>
	<span class="token function">Int2String</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">Bool2String</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">Any2String</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>Int转Float:
float32                    
                           
Float转Int:                
int64 <span class="token number">100</span>                  
int64 -3                   
                           
向上取整/向下取整/四舍五入:
float64 <span class="token number">2.000000</span>           
float64 <span class="token number">1.000000</span>           
float64 <span class="token number">1.000000</span>           
                           
输出添加双引号/单引号:     
<span class="token string">"字符串"</span>                   
<span class="token string">'字'</span>                       
                           
字符串转数字:              
<span class="token number">10</span>                         
<span class="token number">11</span>                         
<span class="token number">1.2</span>                        
                           
字符串转布尔:              
bool <span class="token boolean">true</span>                  
                           
数字转字符串:              
string <span class="token number">100</span>
string <span class="token number">13</span>

布尔转字符串:
<span class="token boolean">false</span>

任意数据类型转字符串:
string <span class="token number">3.14</span>
</code></pre></div><h3 id="基本数据类型总结🎉" tabindex="-1"><a class="header-anchor" href="#基本数据类型总结🎉" aria-hidden="true">#</a> 基本数据类型总结🎉</h3>
<table>
<thead>
<tr>
<th>数据类型</th>
<th>元素是否有序</th>
<th>值类型/引用类型</th>
<th>指针类型初始化关键字</th>
<th>零值</th>
</tr>
</thead>
<tbody>
<tr>
<td>数字</td>
<td>✔</td>
<td>值类型</td>
<td><code v-pre>new</code></td>
<td><code v-pre>0</code></td>
</tr>
<tr>
<td>字符串</td>
<td>✔</td>
<td>值类型</td>
<td><code v-pre>new</code></td>
<td>空字符串</td>
</tr>
<tr>
<td>布尔值</td>
<td>✔</td>
<td>值类型</td>
<td><code v-pre>new</code></td>
<td><code v-pre>false</code></td>
</tr>
<tr>
<td>数组</td>
<td>✔</td>
<td>值类型</td>
<td><code v-pre>new</code></td>
<td>元素数据类型的零值</td>
</tr>
<tr>
<td>切片</td>
<td>✔</td>
<td>引用类型</td>
<td><code v-pre>make</code></td>
<td><code v-pre>nil</code></td>
</tr>
<tr>
<td>映射</td>
<td>❌</td>
<td>引用类型</td>
<td><code v-pre>make</code></td>
<td><code v-pre>nil</code></td>
</tr>
</tbody>
</table>
<h2 id="-1" tabindex="-1"><a class="header-anchor" href="#-1" aria-hidden="true">#</a> </h2>
<h2 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h2>
<h3 id="函数定义" tabindex="-1"><a class="header-anchor" href="#函数定义" aria-hidden="true">#</a> 函数定义</h3>
<ul>
<li>函数可以没有返回值，也可以有多个返回值</li>
</ul>
<h4 id="基本示例" tabindex="-1"><a class="header-anchor" href="#基本示例" aria-hidden="true">#</a> 基本示例</h4>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token comment">// 参数x和y都是int类型，函数返回值也是int类型</span>
<span class="token keyword">func</span> <span class="token function">add</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> x <span class="token operator">+</span> y
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="可省略参数" tabindex="-1"><a class="header-anchor" href="#可省略参数" aria-hidden="true">#</a> 可省略参数</h4>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token comment">// options ...数据类型，这样定义的参数可以不传值</span>
<span class="token keyword">func</span> <span class="token function">Login</span><span class="token punctuation">(</span>host<span class="token punctuation">,</span> port<span class="token punctuation">,</span> username<span class="token punctuation">,</span> password <span class="token builtin">string</span><span class="token punctuation">,</span> options <span class="token operator">...</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>host<span class="token punctuation">,</span> port<span class="token punctuation">,</span> username<span class="token punctuation">,</span> password<span class="token punctuation">,</span> options<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">Login</span><span class="token punctuation">(</span><span class="token string">"0.0.0.0"</span><span class="token punctuation">,</span> <span class="token string">"3306"</span><span class="token punctuation">,</span> <span class="token string">"root"</span><span class="token punctuation">,</span> <span class="token string">"123456"</span><span class="token punctuation">)</span>
	<span class="token function">Login</span><span class="token punctuation">(</span><span class="token string">"0.0.0.0"</span><span class="token punctuation">,</span> <span class="token string">"3306"</span><span class="token punctuation">,</span> <span class="token string">"root"</span><span class="token punctuation">,</span> <span class="token string">"123456"</span><span class="token punctuation">,</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"ssl"</span><span class="token punctuation">:</span> <span class="token string">"true"</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">//0.0.0.0 3306 root 123456 []</span>
<span class="token comment">//0.0.0.0 3306 root 123456 [map[ssl:true]]</span>
</code></pre></div><h4 id="实参为nil" tabindex="-1"><a class="header-anchor" href="#实参为nil" aria-hidden="true">#</a> 实参为nil</h4>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token comment">// 定义函数</span>
<span class="token keyword">func</span> <span class="token function">MyFunc</span><span class="token punctuation">(</span>s <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span> <span class="token punctuation">{</span>
	s <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token string">"hello world!"</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> s
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 函数要求传入一个字符串切片，而他的零值为nil，所以我们可以传入nil，在函数内部相当于是: s := make([]string, 0)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">MyFunc</span><span class="token punctuation">(</span><span class="token boolean">nil</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// [hello world!]</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="接受任意类型参数" tabindex="-1"><a class="header-anchor" href="#接受任意类型参数" aria-hidden="true">#</a> 接受任意类型参数</h4>
<p>并不推荐这样写函数，仅作学习使用</p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token comment">// 使用可省略参数 + interface，可接受任何类型的参数（包括不传），函数内部使用断言再去判断参数类型</span>
<span class="token keyword">func</span> <span class="token function">test</span><span class="token punctuation">(</span>i <span class="token operator">...</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token operator">>=</span> <span class="token number">1</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> m<span class="token punctuation">,</span> ok <span class="token operator">:=</span> i<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>m<span class="token punctuation">[</span><span class="token string">"name"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"anomoy"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">test</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span>
		<span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"bob"</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="内置函数" tabindex="-1"><a class="header-anchor" href="#内置函数" aria-hidden="true">#</a> 内置函数</h3>
<h4 id="copy" tabindex="-1"><a class="header-anchor" href="#copy" aria-hidden="true">#</a> copy</h4>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 位数相同的情况下，全部覆盖</span>
	<span class="token keyword">var</span> s <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">}</span>
	<span class="token function">copy</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span> <span class="token comment">// [3, 2, 1]</span>

	<span class="token comment">// dst位数少的情况下，只覆盖部分</span>
	<span class="token keyword">var</span> s1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">}</span>
	<span class="token function">copy</span><span class="token punctuation">(</span>s1<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span> <span class="token comment">// [3, 2]</span>

	<span class="token comment">// dst为空的情况下，copy之后还是空</span>
	<span class="token keyword">var</span> s2 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token function">copy</span><span class="token punctuation">(</span>s2<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s2<span class="token punctuation">)</span> <span class="token comment">// []</span>

	<span class="token comment">// src位数少的情况下，只覆盖部分</span>
	<span class="token keyword">var</span> s3 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">}</span>
	<span class="token function">copy</span><span class="token punctuation">(</span>s3<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s3<span class="token punctuation">)</span> <span class="token comment">// [3 2 4]</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="defer延迟调用" tabindex="-1"><a class="header-anchor" href="#defer延迟调用" aria-hidden="true">#</a> defer延迟调用</h3>
<p>defer是延迟调用，比如有<code v-pre>A</code>、<code v-pre>B</code>两个函数，在<code v-pre>A</code>函数中<code v-pre>defer B()</code>，那么就意味着在<code v-pre>A</code>函数<code v-pre>return</code>或<code v-pre>panic</code>之后调用<code v-pre>B</code>函数</p>
<h4 id="defer应用场景" tabindex="-1"><a class="header-anchor" href="#defer应用场景" aria-hidden="true">#</a> defer应用场景</h4>
<ul>
<li>
<p>释放资源</p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code>m<span class="token punctuation">.</span>mutex<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">defer</span> m<span class="token punctuation">.</span>mutex<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div></li>
<li>
<p>异常处理</p>
</li>
<li>
<p>修改函数返回值</p>
</li>
</ul>
<h4 id="defer机制" tabindex="-1"><a class="header-anchor" href="#defer机制" aria-hidden="true">#</a> defer机制</h4>
<ul>
<li>
<p>defer后面的表达式不能加圆括号</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> <span class="token punctuation">(</span>fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>	<span class="token comment">// defer后面的函数调用，不能加括号，会报语法错误</span>
<span class="token punctuation">}</span>

</code></pre></div></details>
</li>
<li>
<p>若执行多次<code v-pre>defer语句</code>，则满足<code v-pre>LIFO</code>（后进先出），即<span style="color: red;font-weight: bold;">后defer的先执行</span></p>
</li>
<li>
<p><span style="color: red;font-weight: bold;">被defer的函数的参数在执行到defer语句的时候就被确定下来了</span></p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> <span class="token function">test1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"测试1"</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">defer</span> fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%d %p \n"</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> <span class="token operator">&amp;</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">test2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"\n测试2"</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%d %p \n"</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> <span class="token operator">&amp;</span>i<span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">test3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"\n测试3"</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%d %p \n"</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> <span class="token operator">&amp;</span>i<span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">test1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">test2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">test3</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<details class="custom-container details"><summary>点击查看输出结果</summary>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>测试1
<span class="token number">5</span> 0xc0000180b8 
<span class="token number">4</span> 0xc0000180b8 
<span class="token number">3</span> 0xc0000180b8 
<span class="token number">2</span> 0xc0000180b8 
<span class="token number">1</span> 0xc0000180b8 
<span class="token number">0</span> 0xc0000180b8 
               
测试2          
<span class="token number">6</span> 0xc0000180f0 
<span class="token number">6</span> 0xc0000180f0 
<span class="token number">6</span> 0xc0000180f0 
<span class="token number">6</span> 0xc0000180f0 
<span class="token number">6</span> 0xc0000180f0 
<span class="token number">6</span> 0xc0000180f0 
               
测试3          
<span class="token number">5</span> 0xc0000180f8 
<span class="token number">4</span> 0xc000018110 
<span class="token number">3</span> 0xc000018118 
<span class="token number">2</span> 0xc000018120 
<span class="token number">1</span> 0xc000018128 
<span class="token number">0</span> 0xc000018130 
</code></pre></div></details>
</li>
<li>
<p><span style="color: red;font-weight: bold;">defer和return执行顺序的问题</span></p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token comment">// 在defer中修改返回值成功，前提是必须提前声明返回值</span>
<span class="token keyword">func</span> <span class="token function">add1</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>result <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		result <span class="token operator">+=</span> <span class="token number">10</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> x <span class="token operator">+</span> y
<span class="token punctuation">}</span>

<span class="token comment">// 在defer中修改返回值失败，并未提前声明返回值</span>
<span class="token comment">// 原因是：</span>
<span class="token comment">// 		return并非原子操作，共分为两步，赋值和函数返回</span>
<span class="token comment">//		赋值：将结果写入到返回值中，如果未提前声明，就写入到一个临时变量中</span>
<span class="token comment">//		函数返回：函数带着当前返回值退出</span>
<span class="token comment">// 执行顺序：return赋值 --> defer --> return函数返回</span>

<span class="token keyword">func</span> <span class="token function">add2</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	result <span class="token operator">:=</span> x <span class="token operator">+</span> y <span class="token comment">// result必须定义在前面</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%p\n"</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>result<span class="token punctuation">)</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		result <span class="token operator">+=</span> <span class="token number">10</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%p\n"</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>result<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> result
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">add1</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 13</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">add2</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 9</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
</li>
<li>
<p>defer可以捕捉<code v-pre>panic</code></p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> <span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// recover函数只能用在defer中</span>
	<span class="token keyword">if</span> err <span class="token operator">:=</span> <span class="token function">recover</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"panic: "</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Close success!"</span><span class="token punctuation">)</span>
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

<span class="token comment">// 输出结果</span>
<span class="token comment">// panic:  1</span>
<span class="token comment">// Close success!</span>
</code></pre></div></details>
</li>
<li>
<p>derfer一定会执行吗？</p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"os"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"defer called"</span><span class="token punctuation">)</span>
	os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 运行之后，发现什么都没有输出，说明defer没有正常执行</span>
</code></pre></div></li>
</ul>
<h2 id="-2" tabindex="-1"><a class="header-anchor" href="#-2" aria-hidden="true">#</a> </h2>
<h2 id="别名和自定义类型" tabindex="-1"><a class="header-anchor" href="#别名和自定义类型" aria-hidden="true">#</a> 别名和自定义类型</h2>
<h3 id="别名和自定义类型-1" tabindex="-1"><a class="header-anchor" href="#别名和自定义类型-1" aria-hidden="true">#</a> 别名和自定义类型</h3>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> <span class="token function">add</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> x <span class="token operator">+</span> y
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 定义别名， 使用=， 不能给Counter添加方法等</span>
	<span class="token keyword">type</span> Counter <span class="token operator">=</span> <span class="token builtin">int</span>

	<span class="token comment">// 使用别名，可以继续像使用int一样使用，本质上它就是int</span>
	<span class="token keyword">var</span> a Counter <span class="token operator">=</span> <span class="token number">20</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 21</span>

	<span class="token comment">// ------------------------------------------------------</span>
	<span class="token comment">// 自定义类型, 这是一个全新的类型</span>
	<span class="token keyword">type</span> Number <span class="token builtin">int</span>

	<span class="token comment">// 错误使用自定义类型</span>
	<span class="token keyword">var</span> b Number <span class="token operator">=</span> <span class="token number">100</span>
	<span class="token comment">//fmt.Println(add(1, b)) // 这里会报错，因为Number已经是全新的类型了</span>

	<span class="token comment">// 类型转换</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%T %#v\n"</span><span class="token punctuation">,</span> <span class="token function">int8</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">int8</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">)</span>     <span class="token comment">// int8 100</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%T %#v\n"</span><span class="token punctuation">,</span> <span class="token function">Number</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">Number</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// main.Number 20</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="仿http-handler对象转换" tabindex="-1"><a class="header-anchor" href="#仿http-handler对象转换" aria-hidden="true">#</a> 仿<code v-pre>http handler</code>对象转换</h3>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main
 
<span class="token keyword">import</span> <span class="token string">"fmt"</span>
 
<span class="token comment">// 自定义类型</span>
<span class="token comment">// 可以使用HandFunc(函数名) 将函数转为HandFunc对象，函数需要和HandFunc保持签名一致</span>
<span class="token keyword">type</span> HandFunc <span class="token keyword">func</span><span class="token punctuation">(</span>x <span class="token builtin">int</span><span class="token punctuation">,</span> y <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span>
 
<span class="token comment">// 自定义类型-扩展方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>f HandFunc<span class="token punctuation">)</span> <span class="token function">ServeHTTP</span><span class="token punctuation">(</span>x <span class="token builtin">int</span><span class="token punctuation">,</span> y <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
   <span class="token comment">// 这里的f是HandFunc对象，也是上面所说的函数对象</span>
   <span class="token comment">// 所以这里调用f(x, y)就相当于调用 函数(x, y)</span>
   <span class="token keyword">return</span> <span class="token function">f</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
 
<span class="token comment">// 自定义函数</span>
<span class="token keyword">func</span> <span class="token function">add</span><span class="token punctuation">(</span>x <span class="token builtin">int</span><span class="token punctuation">,</span> y <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> x <span class="token operator">+</span> y
<span class="token punctuation">}</span>
 
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token comment">// 将自定义函数转为自定义类型</span>
   add2 <span class="token operator">:=</span> <span class="token function">HandFunc</span><span class="token punctuation">(</span>add<span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%T\n"</span><span class="token punctuation">,</span> add<span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%T\n"</span><span class="token punctuation">,</span> add2<span class="token punctuation">)</span>
 
   <span class="token comment">// 正常调用</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">add2</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
 
   <span class="token comment">// 自定义类型可以调用更多的方法</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>add2<span class="token punctuation">.</span><span class="token function">ServeHTTP</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>func<span class="token punctuation">(</span>int, int<span class="token punctuation">)</span> int
main.HandFunc
<span class="token number">3</span>            
<span class="token number">3</span>            
<span class="token number">3</span>        
</code></pre></div><h2 id="-3" tabindex="-1"><a class="header-anchor" href="#-3" aria-hidden="true">#</a> </h2>
<h2 id="结构体" tabindex="-1"><a class="header-anchor" href="#结构体" aria-hidden="true">#</a> 结构体</h2>
<p>Go语言的结构体其实就相当于其他编程语言的类</p>
<h3 id="基础" tabindex="-1"><a class="header-anchor" href="#基础" aria-hidden="true">#</a> 基础</h3>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
<span class="token punctuation">)</span>

<span class="token comment">// 结构体定义语法</span>
<span class="token comment">//     语法1： type 结构体名称 struct {}</span>
<span class="token comment">//     语法2： 还可以定义匿名结构体，参考下方代码</span>
<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	id      <span class="token builtin">int</span>
	name    <span class="token builtin">string</span>
	address <span class="token builtin">string</span>
	phone   <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 初始化空结构体</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>User<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// {0   }</span>

	<span class="token comment">//使用字面量初始化</span>
	user1 <span class="token operator">:=</span> User<span class="token punctuation">{</span>
		id<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token string">"Serry"</span><span class="token punctuation">,</span> address<span class="token punctuation">:</span> <span class="token string">"广东省"</span><span class="token punctuation">,</span> phone<span class="token punctuation">:</span> <span class="token string">"19111111111"</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>user1<span class="token punctuation">)</span> <span class="token comment">// {1 Serry 广东省 19111111111}</span>

	<span class="token comment">// 使用属性初始化</span>
	<span class="token keyword">var</span> user2 User
	user2<span class="token punctuation">.</span>id <span class="token operator">=</span> <span class="token number">1</span>
	user2<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">"Bob"</span>
	user2<span class="token punctuation">.</span>address <span class="token operator">=</span> <span class="token string">"河北省保定市"</span>
	user2<span class="token punctuation">.</span>phone <span class="token operator">=</span> <span class="token string">"13788888888"</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>user2<span class="token punctuation">)</span> <span class="token comment">// {1 Bob 河北省保定市 13788888888}</span>

	<span class="token comment">// 使用new函数初始化【指针类型结构体】</span>
	<span class="token keyword">var</span> user3 <span class="token operator">*</span>User <span class="token operator">=</span> <span class="token function">new</span><span class="token punctuation">(</span>User<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>user3<span class="token punctuation">)</span> <span class="token comment">// &amp;{0   }</span>

	<span class="token comment">// 定义匿名结构体并初始化</span>
	user4 <span class="token operator">:=</span> <span class="token keyword">struct</span> <span class="token punctuation">{</span>
		id    <span class="token builtin">int</span>
		phone <span class="token builtin">string</span>
	<span class="token punctuation">}</span><span class="token punctuation">{</span>
		id<span class="token punctuation">:</span>    <span class="token number">1</span><span class="token punctuation">,</span>
		phone<span class="token punctuation">:</span> <span class="token string">"12345678910"</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>user4<span class="token punctuation">)</span> <span class="token comment">// {1 12345678910}</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h3 id="自定义tag" tabindex="-1"><a class="header-anchor" href="#自定义tag" aria-hidden="true">#</a> 自定义Tag</h3>
<p>已知使用了结构体<code v-pre>Tag</code>的库：<a href="https://github.com/golang/go/wiki/Well-known-struct-tags" target="_blank" rel="noopener noreferrer">https://github.com/golang/go/wiki/Well-known-struct-tags<ExternalLinkIcon/></a></p>
<p><code v-pre>Tag</code>使用语法</p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token string">`key1:"value1" key2:"value2" key3:"value3"...`</span> <span class="token comment">// 键值对用空格分隔</span>
</code></pre></div><details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"reflect"</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name     <span class="token builtin">string</span> <span class="token string">`my:"username"`</span>
	Age      <span class="token builtin">uint8</span>
	Password <span class="token builtin">string</span> <span class="token string">`my:"min=6,max=10"`</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">GetTag</span><span class="token punctuation">(</span>u User<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 通过反射获取类型</span>
	t <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>u<span class="token punctuation">)</span>

	<span class="token comment">// 代码						类型							说明</span>
	<span class="token comment">// t.NumField()											结构体字段数量</span>
	<span class="token comment">// t.Field(0)											第1个字段</span>
	<span class="token comment">//	t.Field(1).Name 		字符串						字段名，这里是 Name</span>
	<span class="token comment">// 	t.Field(1).Tag  		StructTag(自定义字符串类型)	Tag，这里是 my:"username"</span>
	<span class="token comment">//  t.Field(1).Tag.Get()	方法							根据key获取value, key不存在返回空字符串</span>

	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%-10s   %-s\n"</span><span class="token punctuation">,</span> <span class="token string">"Struct Key"</span><span class="token punctuation">,</span> <span class="token string">"Tag Value"</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> t<span class="token punctuation">.</span><span class="token function">NumField</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		field <span class="token operator">:=</span> t<span class="token punctuation">.</span><span class="token function">Field</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
		key <span class="token operator">:=</span> field<span class="token punctuation">.</span>Name
		value <span class="token operator">:=</span> field<span class="token punctuation">.</span>Tag<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">"my"</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%-10s   %-s\n"</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	user <span class="token operator">:=</span> User<span class="token punctuation">{</span>
		Name<span class="token punctuation">:</span>     <span class="token string">"Jack"</span><span class="token punctuation">,</span>
		Age<span class="token punctuation">:</span>      <span class="token number">5</span><span class="token punctuation">,</span>
		Password<span class="token punctuation">:</span> <span class="token string">"123456"</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	<span class="token function">GetTag</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>Struct Key   Tag Value
Name         username    
Age                      
Password     <span class="token assign-left variable">min</span><span class="token operator">=</span><span class="token number">6</span>,max<span class="token operator">=</span><span class="token number">10</span>
</code></pre></div><h3 id="空结构体" tabindex="-1"><a class="header-anchor" href="#空结构体" aria-hidden="true">#</a> 空结构体</h3>
<p><strong>空结构体占用内存为0</strong></p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"unsafe"</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Empty <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 使用unsafe.Sizeof可以查看占用内存大小,单位字节</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%d\n"</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span><span class="token function">int8</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment">// 1</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%d\n"</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span><span class="token function">int16</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 2</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%d\n"</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span>Empty<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>    <span class="token comment">// 0</span>
<span class="token punctuation">}</span>
</code></pre></div><p><strong>空结构体的应用场景</strong></p>
<ul>
<li>
<p>方法分组</p>
<p>将相同类型的方法组合在一起，便于后续扩展和维护</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"runtime"</span>
	<span class="token string">"strconv"</span>
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
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%s %dbits\n"</span><span class="token punctuation">,</span> platform<span class="token punctuation">.</span><span class="token function">GetOS</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> platform<span class="token punctuation">.</span><span class="token function">GetOSBit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>	<span class="token comment">// windows 64bits</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
</li>
<li>
<p>实现<code v-pre>set</code>类型</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

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
	set<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">"123"</span><span class="token punctuation">)</span>
	set<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">"456"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>set<span class="token punctuation">.</span><span class="token function">Exist</span><span class="token punctuation">(</span><span class="token string">"123"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
	set<span class="token punctuation">.</span><span class="token function">Remove</span><span class="token punctuation">(</span><span class="token string">"123"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>set<span class="token punctuation">.</span><span class="token function">Exist</span><span class="token punctuation">(</span><span class="token string">"123"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// false</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
</li>
<li>
<p>空通道</p>
<p>实现通知型<code v-pre>channel</code>，其不需要发送任何数据，只是用于协调<code v-pre>Goroutine</code>运行</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">3</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
		<span class="token function">close</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"a"</span><span class="token punctuation">)</span>
	<span class="token operator">&lt;-</span>ch
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"b"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
</li>
</ul>
<h3 id="结构体组合" tabindex="-1"><a class="header-anchor" href="#结构体组合" aria-hidden="true">#</a> 结构体组合</h3>
<p>类似于类的继承</p>
<p><strong>基础用法</strong></p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

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
		province<span class="token punctuation">:</span> <span class="token string">"Hebei"</span><span class="token punctuation">,</span>
		street<span class="token punctuation">:</span>   <span class="token string">"天威路"</span><span class="token punctuation">,</span>
		number<span class="token punctuation">:</span>   <span class="token string">"10"</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">var</span> user <span class="token operator">=</span> User<span class="token punctuation">{</span>
		id<span class="token punctuation">:</span>    <span class="token number">1</span><span class="token punctuation">,</span>
		name<span class="token punctuation">:</span>  <span class="token string">"bob"</span><span class="token punctuation">,</span>
		addr<span class="token punctuation">:</span>  addr<span class="token punctuation">,</span>
		phone<span class="token punctuation">:</span> <span class="token string">"137111111111"</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p><strong>K-V同名简写</strong></p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Basic <span class="token comment">// Basic Basic的简写形式,但与直接写Basic Basic有区别</span>
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
			Name<span class="token punctuation">:</span> <span class="token string">"July"</span><span class="token punctuation">,</span>
			Age<span class="token punctuation">:</span>  <span class="token number">18</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%#v\n"</span><span class="token punctuation">,</span> u<span class="token punctuation">)</span>   <span class="token comment">// main.User{Basic:main.Basic{Name:"July", Age:18}}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>u<span class="token punctuation">.</span><span class="token function">GetName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// July, User结构体实例可以直接使用Basic结构体的方法,如果是非简写形式则不可以直接调用</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h3 id="结构体方法" tabindex="-1"><a class="header-anchor" href="#结构体方法" aria-hidden="true">#</a> 结构体方法</h3>
<p><strong>语法</strong></p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token comment">// 定义结构体</span>
<span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	name <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token comment">// 一般我们会为结构体定义一个构造方法（这不是必须的）</span>
<span class="token keyword">func</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">*</span>Person <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>Person<span class="token punctuation">{</span>name<span class="token punctuation">:</span> name<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义结构体方法</span>
<span class="token comment">// 语法：func (接收者变量 接收者类型) 方法名(参数列表) (返回参数)</span>
<span class="token comment">//      接收者变量: 建议使用接收者类型名称首字母的小写，而不是self、this之类的命名</span>
<span class="token comment">//      接收者类型：值类型和指针类型</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>Person<span class="token punctuation">)</span> <span class="token function">GetName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> p<span class="token punctuation">.</span>name
<span class="token punctuation">}</span>
</code></pre></div><p><strong>值接收者会进行结构体拷贝</strong></p>
<p>测试1：值接收者会将结构体拷贝一份到方法内</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

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
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"SetName: %p\n"</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>p<span class="token punctuation">)</span>
	p<span class="token punctuation">.</span>name <span class="token operator">=</span> name
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	bob <span class="token operator">:=</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span><span class="token string">"bob"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"main: %p\n"</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>bob<span class="token punctuation">)</span>

	bob<span class="token punctuation">.</span><span class="token function">SetName</span><span class="token punctuation">(</span><span class="token string">"jack"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>bob<span class="token punctuation">.</span><span class="token function">GetName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// 输出结果</span>
	<span class="token comment">// main: 0xc00004a250</span>
	<span class="token comment">// SetName: 0xc00004a260</span>
	<span class="token comment">// bob</span>
    <span class="token comment">// 总结：值接收者会将结构体拷贝一份到方法内，所以导致并没有对结构体修改成功</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>测试2：指针接收者不会拷贝结构体</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	name <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">*</span>Person <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>Person<span class="token punctuation">{</span>name<span class="token punctuation">:</span> name<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>Person<span class="token punctuation">)</span> <span class="token function">GetName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
    <span class="token comment">// 这里是一个语法糖，本质上为 return (*p).name</span>
	<span class="token keyword">return</span> p<span class="token punctuation">.</span>name
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>Person<span class="token punctuation">)</span> <span class="token function">SetName</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"SetName: %p\n"</span><span class="token punctuation">,</span> p<span class="token punctuation">)</span>
	p<span class="token punctuation">.</span>name <span class="token operator">=</span> name
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	bob <span class="token operator">:=</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span><span class="token string">"bob"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"main: %p\n"</span><span class="token punctuation">,</span> bob<span class="token punctuation">)</span>

	bob<span class="token punctuation">.</span><span class="token function">SetName</span><span class="token punctuation">(</span><span class="token string">"jack"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>bob<span class="token punctuation">.</span><span class="token function">GetName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// 输出结果</span>
	<span class="token comment">// main: 0xc00010e110</span>
	<span class="token comment">// SetName: 0xc00010e110</span>
	<span class="token comment">// jack</span>
    <span class="token comment">// 总结：指针接收者不会拷贝结构体，所以对结构体修改成功</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p><strong>结构体是map-v的怪异行为</strong></p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name <span class="token builtin">string</span>
	Sex  <span class="token builtin">string</span>
	Age  <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	m <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">uint</span><span class="token punctuation">]</span>Person<span class="token punctuation">{</span>
		<span class="token number">0</span><span class="token punctuation">:</span> Person<span class="token punctuation">{</span><span class="token string">"张无忌"</span><span class="token punctuation">,</span> <span class="token string">"男"</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token number">1</span><span class="token punctuation">:</span> Person<span class="token punctuation">{</span><span class="token string">"赵敏"</span><span class="token punctuation">,</span> <span class="token string">"女"</span><span class="token punctuation">,</span> <span class="token number">21</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 测试1：这会报错 cannot assign to struct field m[0].Age in map</span>
	m<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Age <span class="token operator">+=</span> <span class="token number">1</span>

	<span class="token comment">// 测试2：迂回解决</span>
	<span class="token comment">//tmp := m[0]</span>
	<span class="token comment">//tmp.Age += 1</span>
	<span class="token comment">//m[0] = tmp</span>
	<span class="token comment">//fmt.Println(m[0].Age)</span>

	<span class="token comment">// 测试3：定义map为指针类型后解决</span>
	<span class="token comment">//m2 := map[uint]*Person{</span>
	<span class="token comment">//	0: &amp;Person{"张无忌", "男", 20},</span>
	<span class="token comment">//	1: &amp;Person{"赵敏", "女", 21},</span>
	<span class="token comment">//}</span>
	<span class="token comment">//</span>
	<span class="token comment">//m2[0].Age += 1</span>
	<span class="token comment">//fmt.Println(m2[0].Age)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h3 id="函数式选项模式✨" tabindex="-1"><a class="header-anchor" href="#函数式选项模式✨" aria-hidden="true">#</a> 函数式选项模式✨</h3>
<p>该模式解决的问题是如何更动态灵活地为对象配置参数</p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token comment">// 定义结构体</span>
<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name <span class="token builtin">string</span> <span class="token comment">// 必须字段</span>
	Age  <span class="token builtin">uint8</span>  <span class="token comment">// 非必须</span>
	Sex  <span class="token builtin">string</span> <span class="token comment">// 非必须</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义各种选项</span>
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
	<span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>Option<span class="token punctuation">{</span><span class="token function">WithAge</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">WithSex</span><span class="token punctuation">(</span><span class="token string">"superman"</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 构造方法</span>
<span class="token keyword">func</span> <span class="token function">NewUser</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">,</span> options <span class="token operator">...</span>Option<span class="token punctuation">)</span> <span class="token operator">*</span>User <span class="token punctuation">{</span>
	<span class="token comment">// (1) 必须有的字段直接写到函数签名中，这里只有一个name</span>
	<span class="token comment">// (2) 可有可无的通过options动态传递</span>
	<span class="token comment">// (3) 以后若增加新的选项，也不需要改构造函数</span>

	<span class="token comment">// 实例化结构体</span>
	user <span class="token operator">:=</span> <span class="token operator">&amp;</span>User<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> name<span class="token punctuation">}</span>

	<span class="token comment">// 设置默认参数</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> option <span class="token operator">:=</span> <span class="token keyword">range</span> <span class="token function">DefaultOptions</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">option</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 自定义参数</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> option <span class="token operator">:=</span> <span class="token keyword">range</span> options <span class="token punctuation">{</span>
		<span class="token function">option</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> user
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	bob <span class="token operator">:=</span> <span class="token function">NewUser</span><span class="token punctuation">(</span><span class="token string">"bob"</span><span class="token punctuation">)</span>
	jack <span class="token operator">:=</span> <span class="token function">NewUser</span><span class="token punctuation">(</span><span class="token string">"jack"</span><span class="token punctuation">,</span> <span class="token function">WithAge</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">WithSex</span><span class="token punctuation">(</span><span class="token string">"man"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	julie <span class="token operator">:=</span> <span class="token function">NewUser</span><span class="token punctuation">(</span><span class="token string">"julie"</span><span class="token punctuation">,</span> <span class="token function">WithSex</span><span class="token punctuation">(</span><span class="token string">"woman"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%#v\n"</span><span class="token punctuation">,</span> bob<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%#v\n"</span><span class="token punctuation">,</span> jack<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%#v\n"</span><span class="token punctuation">,</span> julie<span class="token punctuation">)</span>

	<span class="token comment">//&amp;main.User{Name:"bob", Age:0xa, Sex:"superman"}</span>
	<span class="token comment">//&amp;main.User{Name:"jack", Age:0x14, Sex:"man"}  </span>
	<span class="token comment">//&amp;main.User{Name:"julie", Age:0xa, Sex:"woman"}</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="结构体内存大小计算" tabindex="-1"><a class="header-anchor" href="#结构体内存大小计算" aria-hidden="true">#</a> 结构体内存大小计算</h3>
<p><strong>结论先行</strong></p>
<p>结构体内存占用大小是<span style="color: red; font-weight: bold;">每个字段内存对齐之后占用之和</span>，并不是每个字段占用之和</p>
<p><strong>（1）结构体内存对齐规则</strong></p>
<ul>
<li>第一个字段在与结构体偏移量为0的地址处</li>
<li>其他字段要对齐到对齐数的整数倍的地址处</li>
</ul>
<p><strong>（2）查看每种数据类型占用大小和对齐数</strong></p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"unsafe"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"bool  : Size %2d, Alignment %d\n"</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span><span class="token function">bool</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Alignof</span><span class="token punctuation">(</span><span class="token function">bool</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"int8  : Size %2d, Alignment %d\n"</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span><span class="token function">int8</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Alignof</span><span class="token punctuation">(</span><span class="token function">int8</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"int16 : Size %2d, Alignment %d\n"</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span><span class="token function">int16</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Alignof</span><span class="token punctuation">(</span><span class="token function">int16</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"int32 : Size %2d, Alignment %d\n"</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span><span class="token function">int32</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Alignof</span><span class="token punctuation">(</span><span class="token function">int32</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"int64 : Size %2d, Alignment %d\n"</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span><span class="token function">int64</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Alignof</span><span class="token punctuation">(</span><span class="token function">int64</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"byte  : Size %2d, Alignment %d\n"</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Alignof</span><span class="token punctuation">(</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"rune  : Size %2d, Alignment %d\n"</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span><span class="token function">rune</span><span class="token punctuation">(</span><span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Alignof</span><span class="token punctuation">(</span><span class="token function">rune</span><span class="token punctuation">(</span><span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"string: Size %2d, Alignment %d\n"</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span><span class="token string">"1"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Alignof</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span><span class="token string">"1"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"struct: Size %2d, Alignment %d\n"</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span><span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> unsafe<span class="token punctuation">.</span><span class="token function">Alignof</span><span class="token punctuation">(</span><span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token builtin">bool</span>  <span class="token punctuation">:</span> Size  <span class="token number">1</span><span class="token punctuation">,</span> Alignment <span class="token number">1</span>
<span class="token builtin">int8</span>  <span class="token punctuation">:</span> Size  <span class="token number">1</span><span class="token punctuation">,</span> Alignment <span class="token number">1</span>
<span class="token builtin">int16</span> <span class="token punctuation">:</span> Size  <span class="token number">2</span><span class="token punctuation">,</span> Alignment <span class="token number">2</span>
<span class="token builtin">int32</span> <span class="token punctuation">:</span> Size  <span class="token number">4</span><span class="token punctuation">,</span> Alignment <span class="token number">4</span>
<span class="token builtin">int64</span> <span class="token punctuation">:</span> Size  <span class="token number">8</span><span class="token punctuation">,</span> Alignment <span class="token number">8</span>
<span class="token builtin">byte</span>  <span class="token punctuation">:</span> Size  <span class="token number">1</span><span class="token punctuation">,</span> Alignment <span class="token number">1</span>
<span class="token builtin">rune</span>  <span class="token punctuation">:</span> Size  <span class="token number">4</span><span class="token punctuation">,</span> Alignment <span class="token number">4</span>
<span class="token builtin">string</span><span class="token punctuation">:</span> Size <span class="token number">16</span><span class="token punctuation">,</span> Alignment <span class="token number">8</span>
<span class="token keyword">struct</span><span class="token punctuation">:</span> Size  <span class="token number">0</span><span class="token punctuation">,</span> Alignment <span class="token number">1</span>

<span class="token comment">// Size代表占用内存大小（单位字节）</span>
<span class="token comment">// Alignment代表内存对齐数字（单位字节）</span>
</code></pre></div><p><strong>（3）对齐规则验证</strong></p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"unsafe"</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> P1 <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	a <span class="token builtin">bool</span>   <span class="token comment">// 偏移量为0, 自身占用1个字节</span>
	b <span class="token builtin">int32</span>  <span class="token comment">// 与a做内存对齐,int32类型的对齐倍数为4,导致偏移量为4,自身又占用4个字节,所以本字段结束位置在偏移量为8的位置</span>
	c <span class="token builtin">byte</span>   <span class="token comment">// 与b做内存对齐,偏移量为9的位置</span>
	d <span class="token builtin">string</span> <span class="token comment">// 与c做内存对齐,偏移量开始位置在16,自身占用16,最终位置在32</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> P2 <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	a <span class="token builtin">bool</span>   <span class="token comment">// 偏移量为0,最终位置1</span>
	c <span class="token builtin">byte</span>   <span class="token comment">// 偏移量为1,最终位置2</span>
	b <span class="token builtin">int32</span>  <span class="token comment">// 偏移量开始为4,结束为8</span>
	d <span class="token builtin">string</span> <span class="token comment">// 偏移量开始为8,结束为 8 + 16 = 24</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span>P1<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 32</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span>P2<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 24</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="-4" tabindex="-1"><a class="header-anchor" href="#-4" aria-hidden="true">#</a> </h2>
<h2 id="接口" tabindex="-1"><a class="header-anchor" href="#接口" aria-hidden="true">#</a> 接口</h2>
<h3 id="概念" tabindex="-1"><a class="header-anchor" href="#概念" aria-hidden="true">#</a> 概念</h3>
<p>接口是一个类型，就和<code v-pre>int</code>、<code v-pre>string</code>、<code v-pre>map</code>等一样，是类型，不是值</p>
<p>接口是一系列方法的集合，比如<code v-pre>io.Writer</code>就是一个接口</p>
<p>某个值实现了某个接口的所有方法，我们称它实现了某个接口，比如<code v-pre>os.Stdout</code>实现了<code v-pre>io.Writer</code>接口</p>
<p>下面用代码演示一下</p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"io"</span>
	<span class="token string">"os"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 声明变量w,类型为 io.Writer, 这是一个接口类型的变量</span>
	<span class="token keyword">var</span> w io<span class="token punctuation">.</span>Writer

	<span class="token comment">// 给接口类型变量赋值</span>
	w <span class="token operator">=</span> os<span class="token punctuation">.</span>Stdout

	<span class="token comment">// 调用</span>
	<span class="token boolean">_</span><span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">=</span> w<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">"hello"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>	<span class="token comment">// hello</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="接口类型都可以用在哪" tabindex="-1"><a class="header-anchor" href="#接口类型都可以用在哪" aria-hidden="true">#</a> 接口类型都可以用在哪</h3>
<p>接口是一种类型，那么都可以用在哪呢？</p>
<p>（1）声明变量为接口类型</p>
<p>（2）函数形参指定为接口类型</p>
<p>（3）结构体字段指定为接口类型</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"os"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">WriteString</span><span class="token punctuation">(</span>w io<span class="token punctuation">.</span>Writer<span class="token punctuation">,</span> msg <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> w<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	io<span class="token punctuation">.</span>Writer
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 应用1: 声明为接口变量</span>
	<span class="token keyword">var</span> w io<span class="token punctuation">.</span>Writer
	w <span class="token operator">=</span> os<span class="token punctuation">.</span>Stdout
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> w<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">"hello "</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 应用2: 函数形参为接口类型</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">WriteString</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> <span class="token string">"world"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 应用3: 结构体字段为接口类型</span>
	user <span class="token operator">:=</span> User<span class="token punctuation">{</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">}</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> user<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">"!\n"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 输出结果：</span>
<span class="token comment">// hello world!</span>
</code></pre></div></details>
<h3 id="接口类型值都可以是什么" tabindex="-1"><a class="header-anchor" href="#接口类型值都可以是什么" aria-hidden="true">#</a> 接口类型值都可以是什么</h3>
<p>凡是实现了接口中定义的方法的对象都可以是接口值，都有哪些呢？</p>
<p>（1）结构体（这个是最常用的）</p>
<p>（2）自定义类型（一个自定义类型作为接口类型的值，感觉有点奇怪哈~）</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"log"</span>
	<span class="token string">"os"</span>
<span class="token punctuation">)</span>

<span class="token comment">// 定义接口</span>
<span class="token keyword">type</span> Writer <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 自定义类型</span>
<span class="token keyword">type</span> Stdout <span class="token builtin">string</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>m Stdout<span class="token punctuation">)</span> <span class="token function">Write</span><span class="token punctuation">(</span>w <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> os<span class="token punctuation">.</span>Stdout<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>w<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> a Stdout <span class="token comment">// 声明变量a为自定义类型</span>
	<span class="token keyword">var</span> b Writer <span class="token comment">// 声明变量b为接口类型</span>
	b <span class="token operator">=</span> a        <span class="token comment">// 自定义类型实现了Reader接口,所以可以将a赋值给b</span>

	<span class="token comment">// 调用方法</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> b<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">"hello"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 输出结果</span>
<span class="token comment">// hello</span>
</code></pre></div></details>
<h3 id="值接收者和指针接收者" tabindex="-1"><a class="header-anchor" href="#值接收者和指针接收者" aria-hidden="true">#</a> 值接收者和指针接收者</h3>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token comment">// 定义Sender接口</span>
<span class="token keyword">type</span> Sender <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Send</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义微信媒介</span>
<span class="token keyword">type</span> Weixin <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	User     <span class="token builtin">string</span>
	Password <span class="token builtin">string</span>
	Phone    <span class="token builtin">string</span>
	To       <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>Weixin<span class="token punctuation">)</span> <span class="token function">Send</span><span class="token punctuation">(</span>msg <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span> <span class="token comment">// 指针方法</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Weixin Send: %s\n"</span><span class="token punctuation">,</span> msg<span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义邮箱媒介</span>
<span class="token keyword">type</span> Email <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Addr     <span class="token builtin">string</span>
	Port     <span class="token builtin">string</span>
	User     <span class="token builtin">string</span>
	Password <span class="token builtin">string</span>
	to       <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>e Email<span class="token punctuation">)</span> <span class="token function">Send</span><span class="token punctuation">(</span>msg <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span> <span class="token comment">// 值方法</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Email Send: %s\n"</span><span class="token punctuation">,</span> msg<span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 测试1</span>
	<span class="token keyword">var</span> x Sender    <span class="token comment">// 声明x为Sender接口类型</span>
	x <span class="token operator">=</span> <span class="token operator">&amp;</span>Weixin<span class="token punctuation">{</span><span class="token punctuation">}</span>   <span class="token comment">// 给x赋值, 接收者是指针类型的,所以这里必须使用指针类型</span>
	x<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span><span class="token string">"hello"</span><span class="token punctuation">)</span> <span class="token comment">// 调用方法</span>

	<span class="token comment">// 测试2</span>
	<span class="token keyword">var</span> y<span class="token punctuation">,</span> z Sender <span class="token comment">// 声明Sender接口类型</span>
	y <span class="token operator">=</span> Email<span class="token punctuation">{</span><span class="token punctuation">}</span>     <span class="token comment">// 赋值</span>
	z <span class="token operator">=</span> <span class="token operator">&amp;</span>Email<span class="token punctuation">{</span><span class="token punctuation">}</span>    <span class="token comment">// 赋值</span>
	y<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span><span class="token string">"hello"</span><span class="token punctuation">)</span> <span class="token comment">// 调用方法</span>
	z<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span><span class="token string">"hello"</span><span class="token punctuation">)</span> <span class="token comment">// 调用方法,指针对象调用的本质还是值对象调用,只是语法糖</span>

	<span class="token comment">// 输出结果</span>
	<span class="token comment">// Weixin Send: hello</span>
	<span class="token comment">// Email Send: hello</span>
	<span class="token comment">// Email Send: hello</span>
	<span class="token comment">// 总结:</span>
	<span class="token comment">// (1) 指针类型接收者的方法必须使用指针对象来调用</span>
	<span class="token comment">// (2) 值类型接收者的方法既可以用值对象调用,也可以用指针对象调用</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h3 id="空接口" tabindex="-1"><a class="header-anchor" href="#空接口" aria-hidden="true">#</a> 空接口</h3>
<p><span style="color: red; font-weight: bold;">空接口意为着可以接受任意类型的值</span>，</p>
<p><span style="color: blue; font-weight: bold;">也意味着我们不能确定值是什么类型</span></p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token comment">// 定义空接口</span>
<span class="token keyword">type</span> Empty <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> a Empty
	a <span class="token operator">=</span> <span class="token number">1</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>	<span class="token comment">// 1</span>
	a <span class="token operator">=</span> <span class="token string">"Hello"</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>	<span class="token comment">// Hello</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="断言和查询" tabindex="-1"><a class="header-anchor" href="#断言和查询" aria-hidden="true">#</a> 断言和查询</h3>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
<span class="token punctuation">)</span>

<span class="token comment">//定义一个结构体</span>
<span class="token keyword">type</span> EmailSender <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Addr     <span class="token builtin">string</span>
	Port     <span class="token builtin">string</span>
	User     <span class="token builtin">string</span>
	Password <span class="token builtin">string</span>
	to       <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>EmailSender<span class="token punctuation">)</span> <span class="token function">Send</span><span class="token punctuation">(</span>msg <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Hello "</span> <span class="token operator">+</span> msg<span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token comment">//定义一个结构体</span>
<span class="token keyword">type</span> WeiChartSender <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	User     <span class="token builtin">string</span>
	Password <span class="token builtin">string</span>
	to       <span class="token builtin">string</span>
	Phone    <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>WeiChartSender<span class="token punctuation">)</span> <span class="token function">Send</span><span class="token punctuation">(</span>msg <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Hello "</span> <span class="token operator">+</span> msg<span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token comment">//定义一个接口</span>
<span class="token keyword">type</span> Sender <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Send</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 初始化</span>
	<span class="token keyword">var</span> a Sender <span class="token operator">=</span> <span class="token operator">&amp;</span>WeiChartSender<span class="token punctuation">{</span>User<span class="token punctuation">:</span> <span class="token string">"我是小a"</span><span class="token punctuation">}</span> <span class="token comment">// 定义sender为Sender接口类型; 如果用new初始化,直接赋值就会报错了</span>
	b <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>WeiChartSender<span class="token punctuation">)</span>                     <span class="token comment">// 定义b为WeiChartSender结构体指针类型</span>
	b<span class="token punctuation">.</span>User <span class="token operator">=</span> <span class="token string">"我是小b"</span>

	<span class="token comment">// 正常调用方法</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"正常方法调用:"</span><span class="token punctuation">)</span>
	<span class="token boolean">_</span> <span class="token operator">=</span> a<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span><span class="token string">"world!"</span><span class="token punctuation">)</span> <span class="token comment">// Hello world!</span>
	<span class="token boolean">_</span> <span class="token operator">=</span> b<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span><span class="token string">"world!"</span><span class="token punctuation">)</span> <span class="token comment">// Hello world!</span>

	<span class="token comment">// 查看各个类型,看起来两个类型都一样</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"\n查看类型:"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%T\n"</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span> <span class="token comment">// *main.WeiChartSender</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%T\n"</span><span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token comment">// *main.WeiChartSender</span>

	<span class="token comment">// 调用属性, 接口类型的不能调用,因为接口只能要求函数, 定义不了属性,当然也没有实现</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"\n查看属性:"</span><span class="token punctuation">)</span>
	<span class="token comment">//fmt.Println(a.User) // 这个会报错 a.User undefined (type Sender has no field or method User)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"b.User=%s\n"</span><span class="token punctuation">,</span> b<span class="token punctuation">.</span>User<span class="token punctuation">)</span>

	<span class="token comment">// 接口类型转换为结构体 -- 断言方式</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"\n断言方式:"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> obj<span class="token punctuation">,</span> ok <span class="token operator">:=</span> a<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>WeiChartSender<span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"断言成功: %#v\n"</span><span class="token punctuation">,</span> obj<span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"a.User=%s\n"</span><span class="token punctuation">,</span> obj<span class="token punctuation">.</span>User<span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"断言失败"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 接口类型转换为结构体 -- 查询方式</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"\n查询方式:"</span><span class="token punctuation">)</span>
	<span class="token keyword">switch</span> obj <span class="token operator">:=</span> a<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">case</span> <span class="token operator">*</span>WeiChartSender<span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"查询成功: %#v\n"</span><span class="token punctuation">,</span> obj<span class="token punctuation">)</span>
        fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"a.User=%s\n"</span><span class="token punctuation">,</span> obj<span class="token punctuation">.</span>User<span class="token punctuation">)</span>
	<span class="token keyword">default</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"查询失败\n"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>正常方法调用:
Hello world<span class="token operator">!</span>                                                                
Hello world<span class="token operator">!</span>                                                                
                                                                            
查看类型:                                                                   
*main.WeiChartSender                                                        
*main.WeiChartSender                                                        
                                                                            
查看属性:                                                                   
b.User<span class="token operator">=</span>我是小b                                                              
                                                                            
断言方式:                                                                   
断言成功: <span class="token operator">&amp;</span>main.WeiChartSender<span class="token punctuation">{</span>User:<span class="token string">"我是小a"</span>, Password:<span class="token string">""</span>, to:<span class="token string">""</span>, Phone:<span class="token string">""</span><span class="token punctuation">}</span>
a.User<span class="token operator">=</span>我是小a                                                              
                                                                            
查询方式:                                                                   
查询成功: <span class="token operator">&amp;</span>main.WeiChartSender<span class="token punctuation">{</span>User:<span class="token string">"我是小a"</span>, Password:<span class="token string">""</span>, to:<span class="token string">""</span>, Phone:<span class="token string">""</span><span class="token punctuation">}</span>
a.User<span class="token operator">=</span>我是小a
</code></pre></div><h3 id="常用接口" tabindex="-1"><a class="header-anchor" href="#常用接口" aria-hidden="true">#</a> 常用接口</h3>
<h4 id="stringer" tabindex="-1"><a class="header-anchor" href="#stringer" aria-hidden="true">#</a> Stringer</h4>
<p>字符串功能接口</p>
<p>定义如下</p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token comment">// fmt.print.go</span>
<span class="token keyword">type</span> Stringer <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>
</code></pre></div><p>测试代码</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">type</span> A <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name <span class="token builtin">string</span>
	Age  <span class="token builtin">uint</span>
	Sex  <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>a A<span class="token punctuation">)</span> <span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"String: 大家好, 我是%s, 性别%s, 年龄%d"</span><span class="token punctuation">,</span> a<span class="token punctuation">.</span>Name<span class="token punctuation">,</span> a<span class="token punctuation">.</span>Sex<span class="token punctuation">,</span> a<span class="token punctuation">.</span>Age<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>a A<span class="token punctuation">)</span> <span class="token function">GoString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"GoString: 大家好, 我是%s, 性别%s, 年龄%d"</span><span class="token punctuation">,</span> a<span class="token punctuation">.</span>Name<span class="token punctuation">,</span> a<span class="token punctuation">.</span>Sex<span class="token punctuation">,</span> a<span class="token punctuation">.</span>Age<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	a <span class="token operator">:=</span> <span class="token operator">&amp;</span>A<span class="token punctuation">{</span>
		Name<span class="token punctuation">:</span> <span class="token string">"张三"</span><span class="token punctuation">,</span>
		Age<span class="token punctuation">:</span>  <span class="token number">18</span><span class="token punctuation">,</span>
		Sex<span class="token punctuation">:</span>  <span class="token string">"男"</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%v\n"</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%+v\n"</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%#v\n"</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span> <span class="token comment">// GoString</span>

	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%s\n"</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%q\n"</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>String: 大家好, 我是张三, 性别男, 年龄18
String: 大家好, 我是张三, 性别男, 年龄18  
String: 大家好, 我是张三, 性别男, 年龄18  
GoString: 大家好, 我是张三, 性别男, 年龄18
String: 大家好, 我是张三, 性别男, 年龄18  
<span class="token string">"String: 大家好, 我是张三, 性别男, 年龄18"</span>
</code></pre></div><h2 id="-5" tabindex="-1"><a class="header-anchor" href="#-5" aria-hidden="true">#</a> </h2>
<h2 id="并发编程" tabindex="-1"><a class="header-anchor" href="#并发编程" aria-hidden="true">#</a> 并发编程</h2>
<h3 id="goroutine" tabindex="-1"><a class="header-anchor" href="#goroutine" aria-hidden="true">#</a> <code v-pre>Goroutine</code></h3>
<h4 id="基础-1" tabindex="-1"><a class="header-anchor" href="#基础-1" aria-hidden="true">#</a> 基础</h4>
<p>Go语言中每个并发执行的单元叫<code v-pre>Goroutine</code>（协程），使用<code v-pre>go</code>关键字后接函数调用来创建一个<code v-pre>Goroutine</code></p>
<p><code v-pre>Goroutine</code>是并发安全的</p>
<details class="custom-container details"><summary>测试协程代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"runtime"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">taskA</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">taskB</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token char">'A'</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token char">'Z'</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%c\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"start"</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">taskA</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 启动一个协程</span>
	<span class="token keyword">go</span> <span class="token function">taskB</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 启动另一个协程</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"end"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 输出结果</span>
<span class="token comment">// start</span>
<span class="token comment">// end</span>

<span class="token comment">// 问：协程函数没有执行吗？</span>
<span class="token comment">// 答：原因是main()函数并不会等待所有协程执行完后再退出,这里main函数已经执行完了，协程还没执行到for循环，所以造成协程没有执行的假象</span>
</code></pre></div></details>
<h4 id="等待goroutine执行完成" tabindex="-1"><a class="header-anchor" href="#等待goroutine执行完成" aria-hidden="true">#</a> 等待Goroutine执行完成</h4>
<details class="custom-container details"><summary>等待所有协程执行完再退出-使用WaitGroup-方式1</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"sync"</span>
<span class="token punctuation">)</span>

<span class="token comment">// 声明WaitGroup</span>
<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup

<span class="token keyword">func</span> <span class="token function">taskA</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">taskB</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token char">'A'</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token char">'Z'</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%c\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"start"</span><span class="token punctuation">)</span>
	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">taskA</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 启动一个协程</span>
	<span class="token keyword">go</span> <span class="token function">taskB</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 启动另一个协程</span>

	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"end"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 输出结果</span>
<span class="token comment">// start</span>
<span class="token comment">// A</span>
<span class="token comment">// 内容太多省略...	</span>
<span class="token comment">// 10</span>
<span class="token comment">// end</span>
</code></pre></div></details>
<details class="custom-container details"><summary>等待所有协程执行完再退出-使用WaitGroup-方式2（推荐）</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"sync"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">taskA</span><span class="token punctuation">(</span>wg <span class="token operator">*</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">taskB</span><span class="token punctuation">(</span>wg <span class="token operator">*</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token char">'A'</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token char">'Z'</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%c\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"start"</span><span class="token punctuation">)</span>

	<span class="token comment">// 如果需要作为函数参数传递wg，则wg必须是引用类型</span>
	wg <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">)</span>

	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">taskA</span><span class="token punctuation">(</span>wg<span class="token punctuation">)</span> <span class="token comment">// 启动一个协程</span>
	<span class="token keyword">go</span> <span class="token function">taskB</span><span class="token punctuation">(</span>wg<span class="token punctuation">)</span> <span class="token comment">// 启动另一个协程</span>

	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"end"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 输出结果</span>
<span class="token comment">// start</span>
<span class="token comment">// A</span>
<span class="token comment">// 内容太多省略...	</span>
<span class="token comment">// 10</span>
<span class="token comment">// end</span>
</code></pre></div></details>
<details class="custom-container details"><summary>等待所有协程执行完再退出-使用 Channel</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">taskA</span><span class="token punctuation">(</span>ch <span class="token keyword">chan</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	ch <span class="token operator">&lt;-</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">taskB</span><span class="token punctuation">(</span>ch <span class="token keyword">chan</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token char">'A'</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token char">'Z'</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%c\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	ch <span class="token operator">&lt;-</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"start"</span><span class="token punctuation">)</span>

	<span class="token comment">// 初始化channel</span>
	n <span class="token operator">:=</span> <span class="token number">2</span> <span class="token comment">// 代表启动几个groutine</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> n<span class="token punctuation">)</span>

	<span class="token keyword">go</span> <span class="token function">taskA</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span> <span class="token comment">// 启动一个协程</span>
	<span class="token keyword">go</span> <span class="token function">taskB</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span> <span class="token comment">// 启动另一个协程</span>

	<span class="token comment">// 阻塞</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token operator">&lt;-</span>ch
	<span class="token punctuation">}</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"end"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 输出结果</span>
<span class="token comment">// start</span>
<span class="token comment">// A</span>
<span class="token comment">// 内容太多省略...	</span>
<span class="token comment">// 10</span>
<span class="token comment">// end</span>
</code></pre></div></details>
<h4 id="goroutine相关函数" tabindex="-1"><a class="header-anchor" href="#goroutine相关函数" aria-hidden="true">#</a> Goroutine相关函数</h4>
<table>
<thead>
<tr>
<th>函数</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>runtime.NumGoroutine()</code></td>
<td>返回当前存在的<code v-pre>Goroutine</code>数量</td>
</tr>
<tr>
<td><code v-pre>runtime.Gosched()</code></td>
<td>暂停当前<code v-pre>Goroutine</code>，由Go自动调度其他<code v-pre>Goroutine</code>执行</td>
</tr>
<tr>
<td><code v-pre>runtime.Goexit()</code></td>
<td>退出当前<code v-pre>Goroutine</code></td>
</tr>
<tr>
<td><code v-pre>runtime.GOMAXPROCS(n)</code></td>
<td>设置可以使用的最大CPU数量，默认值为<code v-pre>runtime.NumCPU()</code>；返回上一次设置的值</td>
</tr>
</tbody>
</table>
<h3 id="channel" tabindex="-1"><a class="header-anchor" href="#channel" aria-hidden="true">#</a> Channel</h3>
<h4 id="基础-2" tabindex="-1"><a class="header-anchor" href="#基础-2" aria-hidden="true">#</a> 基础</h4>
<p><code v-pre>Channel</code>用于<code v-pre>Goroutine</code>之间的通信，中文可以称为”管道&quot;或&quot;通道&quot;</p>
<p><strong>根据状态可以分为</strong></p>
<ul>
<li><code v-pre>nil</code>，只声明未初始化的<code v-pre>Channel</code></li>
<li>正常，声明并初始化的<code v-pre>Channel</code></li>
<li>关闭，使用<code v-pre>close(Channel)</code></li>
</ul>
<p><strong>根据缓冲方式可以分为</strong></p>
<ul>
<li>无缓冲区<code v-pre>Channel</code></li>
<li>带缓冲区<code v-pre>Channel</code></li>
</ul>
<p><strong>根据读写方式可以分为</strong></p>
<ul>
<li>
<p>读写<code v-pre>Channel</code></p>
</li>
<li>
<p>只读<code v-pre>Channel</code></p>
</li>
<li>
<p>只写<code v-pre>Channel</code></p>
</li>
</ul>
<p><strong>定义</strong></p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token comment">// 声明一个int类型的channel</span>
<span class="token keyword">var</span> channel <span class="token keyword">chan</span> <span class="token builtin">int</span>
fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%T\n"</span><span class="token punctuation">,</span> channel<span class="token punctuation">)</span> <span class="token comment">// chan int</span>

<span class="token comment">// ch赋值</span>
channel <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%#v\n"</span><span class="token punctuation">,</span> channel<span class="token punctuation">)</span> <span class="token comment">// (chan int)(0xc00005a060)</span>

<span class="token comment">// 以上两句可以简写成如下形式（推荐这种写法）</span>
ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
</code></pre></div><p><strong>读和写</strong></p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token comment">// 写数据：将100写入到channel中</span>
ch <span class="token operator">&lt;-</span> <span class="token number">100</span>

<span class="token comment">// 读数据-方式1， v代表读到的值</span>
v <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch

<span class="token comment">// 读数据-方式2， v代表读到的值, ok代表channel的状态，true为channel正常，false为channel已经关闭</span>
v<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch

<span class="token comment">// 读取管道-方式3, 使用range遍历，这里只有一个返回值，若Channel关闭则for循环也随之结束</span>
<span class="token keyword">for</span> v<span class="token operator">:=</span> <span class="token keyword">range</span> ch <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 关闭channel</span>
<span class="token function">close</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span>

<span class="token comment">// 记忆技巧：箭头代表数据流向</span>
</code></pre></div><h4 id="无缓冲区channel" tabindex="-1"><a class="header-anchor" href="#无缓冲区channel" aria-hidden="true">#</a> 无缓冲区<code v-pre>Channel</code></h4>
<p><strong>定义</strong></p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code>ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>	<span class="token comment">// 无缓冲区channel, 等同于make(chan int, 0)，第二个参数代表可缓冲数据个数</span>
</code></pre></div><p><strong>特性</strong></p>
<ul>
<li>读和写不能在同一个协程中</li>
<li>读写次数不一致会发生死锁：<code v-pre>fatal error: all goroutines are asleep - deadlock!</code></li>
<li>管道关闭后：
<ul>
<li>假如继续读，不会阻塞，而是会读取到零值</li>
<li>假如继续写，会报错：<code v-pre>panic: send on closed channel</code></li>
</ul>
</li>
<li>如果管道一切都正常，未读取之前写入会阻塞，未写入之前读取也会阻塞</li>
</ul>
<details class="custom-container details"><summary>测试1: 基础使用</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"log"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 声明并初始化channel</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>

	<span class="token comment">// 写数据</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">for</span> curTime <span class="token operator">:=</span> <span class="token keyword">range</span> time<span class="token punctuation">.</span><span class="token function">Tick</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			second <span class="token operator">:=</span> curTime<span class="token punctuation">.</span><span class="token function">Second</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			ch <span class="token operator">&lt;-</span> second
			log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Write to Channel  %d\n"</span><span class="token punctuation">,</span> second<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 读数据</span>
	<span class="token keyword">for</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> ch <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Read from Channel %d\n\n"</span><span class="token punctuation">,</span> v<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token number">2022</span>/04/17 <span class="token number">11</span>:51:32 Write to Channel  <span class="token number">32</span>
<span class="token number">2022</span>/04/17 <span class="token number">11</span>:51:32 Read from Channel <span class="token number">32</span>

<span class="token number">2022</span>/04/17 <span class="token number">11</span>:51:33 Write to Channel  <span class="token number">33</span>
<span class="token number">2022</span>/04/17 <span class="token number">11</span>:51:33 Read from Channel <span class="token number">33</span>

<span class="token number">2022</span>/04/17 <span class="token number">11</span>:51:34 Write to Channel  <span class="token number">34</span>
<span class="token number">2022</span>/04/17 <span class="token number">11</span>:51:34 Read from Channel <span class="token number">34</span>
</code></pre></div><h4 id="带缓冲区channel" tabindex="-1"><a class="header-anchor" href="#带缓冲区channel" aria-hidden="true">#</a> 带缓冲区<code v-pre>Channel</code></h4>
<div class="language-go ext-go"><pre v-pre class="language-go"><code>ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>	<span class="token comment">// 代表缓冲区长度为3，可以放3个数据</span>
</code></pre></div><p><strong>特性</strong></p>
<ul>
<li>
<p>读和写可以在同一个协程中</p>
</li>
<li>
<p>读写次数可以不一致，最大差不能超过缓冲区长度，否则同样会引发死锁：<code v-pre>fatal error: all goroutines are asleep - deadlock!</code></p>
<p>举个例子，缓冲区大小为1，则写入1次读取0次没有问题，写入2次读取0次就会引发死锁</p>
</li>
<li>
<p>管道关闭后：</p>
<ul>
<li>假如继续读，不会阻塞，而是会先读取缓冲区，若缓冲区读完会读到零值</li>
<li>假如继续写，会报错：<code v-pre>panic: send on closed channel</code></li>
</ul>
</li>
<li>
<p>如果管道一切都正常，</p>
<ul>
<li>只有1个协程情况下（<code v-pre>main函数</code>），写满缓冲区再写入会报错，读完缓冲区再读取也会报错</li>
<li>至少2个协程情况下（<code v-pre>go</code>关键字至少启动1个），写满缓冲区再写入会阻塞，读完缓冲区再读取也会阻塞</li>
</ul>
</li>
</ul>
<details class="custom-container details"><summary>测试1: 读和写可以在同一个协程中</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"math/rand"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 初始化随机数种子</span>
	rand<span class="token punctuation">.</span><span class="token function">Seed</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Unix</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// 声明并初始化channel</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>

	<span class="token comment">// 写入数据（0-99之间的随机数）</span>
	ch <span class="token operator">&lt;-</span> rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token number">99</span><span class="token punctuation">)</span>

	<span class="token comment">// 读取数据</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"读取数据: "</span><span class="token punctuation">,</span> <span class="token operator">&lt;-</span>ch<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<details class="custom-container details"><summary>测试2: 读写次数可以不一致</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"math/rand"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 初始化随机数种子</span>
	rand<span class="token punctuation">.</span><span class="token function">Seed</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Unix</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// 声明并初始化channel，缓冲区大小为10</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>

	<span class="token comment">// 写入数据次数, 写入10次读取0次没问题，写入11次读取0次就会发生死锁，因为缓冲区写满了</span>
	n <span class="token operator">:=</span> <span class="token number">10</span>

	<span class="token comment">// 写入数据（0-99之间的随机数）</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		ch <span class="token operator">&lt;-</span> rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token number">99</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<details class="custom-container details"><summary>测试3: Channel关闭后再读取，会读完缓冲区后读取到零值</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 声明并初始化channel，缓冲区大小为3</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>

	<span class="token comment">// 写缓冲区</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">100</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">200</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">300</span>

	<span class="token comment">// 关闭channel</span>
	<span class="token function">close</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span>

	<span class="token comment">// 读取数据</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">&lt;-</span>ch<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 输出结果</span>
<span class="token comment">// 100</span>
<span class="token comment">// 200</span>
<span class="token comment">// 300</span>
<span class="token comment">// 0</span>
<span class="token comment">// 0</span>
</code></pre></div></details>
<details class="custom-container details"><summary>测试4: Channel关闭后再写入会直接报错，而不是写入到缓冲区</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 声明并初始化channel，缓冲区大小为3</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>

	<span class="token comment">// 关闭channel</span>
	<span class="token function">close</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span>

	<span class="token comment">// 写数据，channel已经关闭了，不能写入到缓冲区，会直接报错，这和无缓冲channel表现一致</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">100</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<details class="custom-container details"><summary>测试5: 1个协程情况下（`main函数`），写满缓冲区再写入会报错</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 声明并初始化channel，缓冲区大小为3</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>

	<span class="token comment">// 写数据</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">100</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">100</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">100</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">100</span> <span class="token comment">// 这里直接报错</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">&lt;-</span>ch<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<details class="custom-container details"><summary>测试6: 1个协程情况下（`main函数`），读完缓冲区再读取也会报错</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 声明并初始化channel，缓冲区大小为3</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>

	<span class="token comment">// 写入</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">100</span>

	<span class="token comment">// 读取</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">&lt;-</span>ch<span class="token punctuation">)</span> <span class="token comment">// 正常读取</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">&lt;-</span>ch<span class="token punctuation">)</span> <span class="token comment">// 报错</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<details class="custom-container details"><summary>测试7: 至少2个协程情况下（go关键字至少启动1个），写满缓冲区再写入会阻塞</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"log"</span>
	<span class="token string">"runtime"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 声明并初始化channel，缓冲区大小为3</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>

	<span class="token comment">// 开启一个协程</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">60</span><span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"协程运行结束"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 写入</span>
	<span class="token comment">// 		循环次数：缓冲区+1次</span>
	<span class="token comment">//		协程未运行完之前，第4次写入会卡住，等协程运行完，第4次写入就会报错</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token function">cap</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"【开始】第%d次写入数据 | 当前协程数量: %d\n"</span><span class="token punctuation">,</span> i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">,</span> runtime<span class="token punctuation">.</span><span class="token function">NumGoroutine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		ch <span class="token operator">&lt;-</span> <span class="token number">100</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"【结束】第%d次写入数据 | 当前协程数量: %d\n\n"</span><span class="token punctuation">,</span> i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">,</span> runtime<span class="token punctuation">.</span><span class="token function">NumGoroutine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token number">2022</span>/04/17 <span class="token number">13</span>:28:40 【开始】第1次写入数据 <span class="token operator">|</span> 当前协程数量: <span class="token number">2</span>
<span class="token number">2022</span>/04/17 <span class="token number">13</span>:28:40 【结束】第1次写入数据 <span class="token operator">|</span> 当前协程数量: <span class="token number">2</span>

<span class="token number">2022</span>/04/17 <span class="token number">13</span>:28:40 【开始】第2次写入数据 <span class="token operator">|</span> 当前协程数量: <span class="token number">2</span>
<span class="token number">2022</span>/04/17 <span class="token number">13</span>:28:40 【结束】第2次写入数据 <span class="token operator">|</span> 当前协程数量: <span class="token number">2</span>

<span class="token number">2022</span>/04/17 <span class="token number">13</span>:28:40 【开始】第3次写入数据 <span class="token operator">|</span> 当前协程数量: <span class="token number">2</span>
<span class="token number">2022</span>/04/17 <span class="token number">13</span>:28:40 【结束】第3次写入数据 <span class="token operator">|</span> 当前协程数量: <span class="token number">2</span>

<span class="token number">2022</span>/04/17 <span class="token number">13</span>:28:40 【开始】第4次写入数据 <span class="token operator">|</span> 当前协程数量: <span class="token number">2</span>
<span class="token number">2022</span>/04/17 <span class="token number">13</span>:29:40 协程运行结束
fatal error: all goroutines are asleep - deadlock<span class="token operator">!</span>

goroutine <span class="token number">1</span> <span class="token punctuation">[</span>chan send<span class="token punctuation">]</span>:
main.main<span class="token punctuation">(</span><span class="token punctuation">)</span>
        C:/Users/Administrator/GolandProjects/learn/main.go:24 +0x18d

Process finished with the <span class="token builtin class-name">exit</span> code <span class="token number">2</span>
</code></pre></div></details>
<details class="custom-container details"><summary>测试8: 至少2个协程情况下（go关键字至少启动1个），读完缓冲区再读取也会阻塞</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"log"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 声明并初始化channel，缓冲区大小为3</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>

	<span class="token comment">// 开启一个协程</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">60</span><span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"协程运行结束"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 读取</span>
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"开始读取"</span><span class="token punctuation">)</span>
	v<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"读取结束"</span><span class="token punctuation">,</span> v<span class="token punctuation">,</span> ok<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token number">2022</span>/04/17 <span class="token number">13</span>:36:51 开始读取
<span class="token number">2022</span>/04/17 <span class="token number">13</span>:37:51 协程运行结束
fatal error: all goroutines are asleep - deadlock<span class="token operator">!</span>

goroutine <span class="token number">1</span> <span class="token punctuation">[</span>chan receive<span class="token punctuation">]</span>:
main.main<span class="token punctuation">(</span><span class="token punctuation">)</span>
        C:/Users/Administrator/GolandProjects/learn/main.go:20 +0x79
</code></pre></div></details>
<h4 id="只读和只写限制" tabindex="-1"><a class="header-anchor" href="#只读和只写限制" aria-hidden="true">#</a> 只读和只写限制</h4>
<p>只是在原有的<code v-pre>Channel</code>上加了一层限制，只能读或只能写，默认的<code v-pre>Channel</code>是读写都支持的</p>
<p><strong>示例代码</strong></p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> <span class="token function">chanReadOnly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 声明带缓冲区的channel，默认是支持读写的</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">100</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">200</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">300</span>

	<span class="token comment">// 声明为只读channel</span>
	<span class="token keyword">var</span> chReadOnly <span class="token operator">&lt;-</span><span class="token keyword">chan</span> <span class="token builtin">int</span>
	chReadOnly <span class="token operator">=</span> ch

	<span class="token comment">// 读数据</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">&lt;-</span>chReadOnly<span class="token punctuation">)</span>

	<span class="token comment">// 写数据会报错</span>
	<span class="token comment">//chReadOnly &lt;- 400</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">chanWriteOnly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 声明只写channel</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span><span class="token operator">&lt;-</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>

	<span class="token comment">// 写数据</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">100</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">200</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">300</span>

	<span class="token comment">// 读数据会报错</span>
	<span class="token comment">//fmt.Println(&lt;-ch)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">chanReadOnly</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">chanWriteOnly</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h4 id="多路复用select" tabindex="-1"><a class="header-anchor" href="#多路复用select" aria-hidden="true">#</a> 多路复用select</h4>
<p><strong>说明</strong></p>
<p><code v-pre>select</code>是专门为<code v-pre>Goroutine</code>设计的，类似于<code v-pre>switch..case</code>语法</p>
<ul>
<li>每个<code v-pre>case </code>表达式中都只能包含操作<code v-pre>Channel</code>的表达式，比如读或写</li>
<li>如果有多个<code v-pre>case </code>都可以运行，<code v-pre>select</code>会随机公平地选出一个执行，其他不会执行</li>
<li>如果多个<code v-pre>case </code>都不能运行，若有<code v-pre>default </code>子句，则执行该语句，反之，<code v-pre>select </code>将阻塞，直到某个<code v-pre>case </code>可以运行</li>
<li>空<code v-pre>select</code>会一直阻塞</li>
</ul>
<p><strong>示例代码</strong></p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	c1 <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
	c2 <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>

	<span class="token comment">// 测试1：直接执行会执行default语句</span>

	<span class="token comment">// 测试2: 给C1管道写入数据；结果：在C1管道中读取到值： 1</span>
	<span class="token comment">//c1 &lt;- 1</span>

	<span class="token comment">// 测试3，直接关闭管道；结果：C1管道中的数据为零值:  0</span>
	<span class="token comment">//close(c1)</span>

	<span class="token comment">// 测试4，两个管道都关闭，那么select会随机取一个，然后执行select后面的逻辑</span>
	<span class="token comment">//close(c1)</span>
	<span class="token comment">//close(c2)</span>

	<span class="token comment">// 在多个管道中，只要有一个操作成功就执行相应逻辑</span>
	<span class="token keyword">select</span> <span class="token punctuation">{</span>
	<span class="token keyword">case</span> v<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>c1<span class="token punctuation">:</span>
		<span class="token keyword">if</span> ok <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"在C1管道中读取到值："</span><span class="token punctuation">,</span> v<span class="token punctuation">)</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"C1管道中的数据为零值: "</span><span class="token punctuation">,</span> v<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

	<span class="token keyword">case</span> v<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>c2<span class="token punctuation">:</span>
		<span class="token keyword">if</span> ok <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"在C2管道中读取到值："</span><span class="token punctuation">,</span> v<span class="token punctuation">)</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"C2管道中的数据为零值: "</span><span class="token punctuation">,</span> v<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token keyword">default</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"select default运行"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p><strong>for{ select }问题</strong></p>
<p>当需要循环操作时需要与<code v-pre>for</code>连用，这时候如果<code v-pre>select</code>中含有<code v-pre>break</code>，那么只能跳出<code v-pre>select</code>层而不能跳出<code v-pre>for</code>循环，下面演示一下</p>
<details class="custom-container details"><summary>问题代码：for{ select }中只能跳出select不能跳出for循环</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"math/rand"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 初始化channel</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>

	<span class="token comment">// 抽奖，获奖的ID放入channel中</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		rand<span class="token punctuation">.</span><span class="token function">Seed</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">UnixNano</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token keyword">for</span> <span class="token keyword">range</span> time<span class="token punctuation">.</span><span class="token function">Tick</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			ch <span class="token operator">&lt;-</span> rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 开奖，从channel中读数据</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		<span class="token keyword">select</span> <span class="token punctuation">{</span>
		<span class="token keyword">case</span> v <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch<span class="token punctuation">:</span>
			<span class="token keyword">if</span> v <span class="token operator">>=</span> <span class="token number">100</span> <span class="token operator">&amp;&amp;</span> v <span class="token operator">&lt;=</span> <span class="token number">400</span> <span class="token punctuation">{</span> <span class="token comment">// 为了提高中奖几率..</span>
				fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"恭喜你中奖了，请去领奖"</span><span class="token punctuation">)</span>
				<span class="token keyword">break</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 领奖</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"感谢CCTV, 感谢MTV, 感谢党和人民的栽培..."</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<details class="custom-container details"><summary>修正-方式1：使用break 标签</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"math/rand"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 初始化channel</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>

	<span class="token comment">// 抽奖，获奖的ID放入channel中</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		rand<span class="token punctuation">.</span><span class="token function">Seed</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">UnixNano</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token keyword">for</span> <span class="token keyword">range</span> time<span class="token punctuation">.</span><span class="token function">Tick</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			ch <span class="token operator">&lt;-</span> rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 开奖，从channel中读数据</span>
ForEnd<span class="token punctuation">:</span>		<span class="token comment">// 添加一个标签</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		<span class="token keyword">select</span> <span class="token punctuation">{</span>
		<span class="token keyword">case</span> v <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch<span class="token punctuation">:</span>
			<span class="token keyword">if</span> v <span class="token operator">>=</span> <span class="token number">100</span> <span class="token operator">&amp;&amp;</span> v <span class="token operator">&lt;=</span> <span class="token number">400</span> <span class="token punctuation">{</span> <span class="token comment">// 为了提高中奖几率..</span>
				fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"恭喜你中奖了，请去领奖"</span><span class="token punctuation">)</span>
				<span class="token keyword">break</span> ForEnd	<span class="token comment">// 跳出此标签</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 领奖</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"感谢CCTV, 感谢MTV, 感谢党和人民的栽培..."</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<details class="custom-container details"><summary>修正-方式2：使用goto 标签</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"math/rand"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 初始化channel</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>

	<span class="token comment">// 抽奖，获奖的ID放入channel中</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		rand<span class="token punctuation">.</span><span class="token function">Seed</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">UnixNano</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token keyword">for</span> <span class="token keyword">range</span> time<span class="token punctuation">.</span><span class="token function">Tick</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			ch <span class="token operator">&lt;-</span> rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 开奖，从channel中读数据</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		<span class="token keyword">select</span> <span class="token punctuation">{</span>
		<span class="token keyword">case</span> v <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch<span class="token punctuation">:</span>
			<span class="token keyword">if</span> v <span class="token operator">>=</span> <span class="token number">100</span> <span class="token operator">&amp;&amp;</span> v <span class="token operator">&lt;=</span> <span class="token number">400</span> <span class="token punctuation">{</span> <span class="token comment">// 为了提高中奖几率..</span>
				fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"恭喜你中奖了，请去领奖"</span><span class="token punctuation">)</span>
				<span class="token keyword">goto</span> ForEnd	<span class="token comment">// 跳到指定标签</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
ForEnd<span class="token punctuation">:</span> <span class="token comment">// 定义标签</span>

	<span class="token comment">// 领奖</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"感谢CCTV, 感谢MTV, 感谢党和人民的栽培..."</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h4 id="练习-select-设置函数执行超时时间" tabindex="-1"><a class="header-anchor" href="#练习-select-设置函数执行超时时间" aria-hidden="true">#</a> 练习:select:设置函数执行超时时间</h4>
<details class="custom-container details"><summary>设置函数执行超时时间（有问题版本，主要是学习超时核心逻辑）</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">Add</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token comment">// 模拟函数耗时操作</span>
	<span class="token keyword">return</span> x <span class="token operator">+</span> y
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 声明并初始化channel</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>

	<span class="token comment">// 执行协程</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		ret <span class="token operator">:=</span> <span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">111</span><span class="token punctuation">,</span> <span class="token number">222</span><span class="token punctuation">)</span> <span class="token comment">// 这个是我们原有的函数,并不做任何修改，非侵入式做超时控制</span>
		ch <span class="token operator">&lt;-</span> ret
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 超时控制</span>
	<span class="token keyword">select</span> <span class="token punctuation">{</span>
	<span class="token keyword">case</span> <span class="token operator">&lt;-</span>time<span class="token punctuation">.</span><span class="token function">After</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"执行超时"</span><span class="token punctuation">)</span>
	<span class="token keyword">case</span> v<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch<span class="token punctuation">:</span>
		<span class="token keyword">if</span> ok <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"执行成功: "</span><span class="token punctuation">,</span> v<span class="token punctuation">)</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"执行报错: "</span><span class="token punctuation">,</span> v<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 都有哪些问题？</span>
<span class="token comment">// (1) main内代码太多了，将超时控制的代码单独封装到一个函数中</span>
<span class="token comment">// (2) Goroutine泄漏：假设超时以后，协程中还会写数据到channel中，而外边已经没有读的了，会一直阻塞，造成Goroutine泄漏</span>
<span class="token comment">// (3) 该函数Add返回值没有包含错误，在实际场景中有些函数会有错误，错误如何传递？</span>
</code></pre></div></details>
<details class="custom-container details"><summary>设置函数执行超时时间（优化后版本，还算完美）</summary>
<ul>
<li>
<p>单独封装了一个函数</p>
</li>
<li>
<p><code v-pre>Goroutine</code>泄漏问题将无缓冲的<code v-pre>channel</code>改为带缓冲区的<code v-pre>channel</code>，但仍需要原本的<code v-pre>Add</code>函数执行完成后才会退出<code v-pre>AddWithTimeout</code>内部启动的协程。</p>
<p>Go不支持外部杀死一个正在运行的协程，参考：<a href="https://github.com/golang/go/issues/32610" target="_blank" rel="noopener noreferrer">https://github.com/golang/go/issues/32610<ExternalLinkIcon/></a></p>
</li>
<li>
<p>添加传递错误，<code v-pre>channel</code>修改为通知型</p>
</li>
</ul>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"errors"</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"log"</span>
	<span class="token string">"runtime"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">Add</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token comment">// 模拟函数耗时操作</span>
	<span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">AddWithTimeout</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> timeout <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>ret <span class="token builtin">int</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 声明并初始化channel</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>

	<span class="token comment">// 执行协程</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		ret<span class="token punctuation">,</span> err <span class="token operator">=</span> <span class="token function">Add</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span> <span class="token comment">// 这个是我们原有的函数,并不做任何修改</span>
		ch <span class="token operator">&lt;-</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 超时控制</span>
	<span class="token keyword">select</span> <span class="token punctuation">{</span>
	<span class="token keyword">case</span> <span class="token operator">&lt;-</span>time<span class="token punctuation">.</span><span class="token function">After</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond <span class="token operator">*</span> time<span class="token punctuation">.</span><span class="token function">Duration</span><span class="token punctuation">(</span>timeout<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
		err <span class="token operator">=</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span>fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"Function executed for more than %d seconds: AddWithTimeout(%d, %d)"</span><span class="token punctuation">,</span> timeout<span class="token punctuation">,</span> x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">case</span> <span class="token operator">&lt;-</span>ch<span class="token punctuation">:</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 开启多个协程</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">100000</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			ret<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">AddWithTimeout</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">5000</span><span class="token punctuation">)</span>
			ret <span class="token operator">=</span> ret
			err <span class="token operator">=</span> err
			<span class="token comment">//fmt.Printf("执行结果: %d, %v\n", ret, err)</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

    <span class="token comment">// 每隔1秒输出当前Goroutine数量</span>
	<span class="token keyword">for</span> <span class="token keyword">range</span> time<span class="token punctuation">.</span><span class="token function">Tick</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		g <span class="token operator">:=</span> runtime<span class="token punctuation">.</span><span class="token function">NumGoroutine</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"当前Goroutine数量: %d\n"</span><span class="token punctuation">,</span> g<span class="token punctuation">)</span>
		<span class="token keyword">if</span> g <span class="token operator">&lt;=</span> <span class="token number">1</span> <span class="token punctuation">{</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h4 id="练习-channel-多个协程顺序打印数字" tabindex="-1"><a class="header-anchor" href="#练习-channel-多个协程顺序打印数字" aria-hidden="true">#</a> 练习:channel:多个协程顺序打印数字</h4>
<p>有4个<code v-pre>goroutine</code>，每个<code v-pre>goroutine</code>打印一个数字，要求按照1<code v-pre>/2/3/4</code>这样的顺序打印输出</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"log"</span>
	<span class="token string">"time"</span>
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

	<span class="token comment">// 启动4个协程</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">4</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">go</span> <span class="token function">newWorker</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> chs<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> chs<span class="token punctuation">[</span><span class="token punctuation">(</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token operator">%</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 给第一个chan发送数据</span>
	chs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">&lt;-</span> Token<span class="token punctuation">{</span><span class="token punctuation">}</span>

	<span class="token comment">// 会一直阻塞</span>
	<span class="token keyword">select</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h3 id="context" tabindex="-1"><a class="header-anchor" href="#context" aria-hidden="true">#</a> Context</h3>
<p>官方文档：<a href="https://pkg.go.dev/context" target="_blank" rel="noopener noreferrer">https://pkg.go.dev/context<ExternalLinkIcon/></a></p>
<p><code v-pre>context</code>是Go的标准库，用来管理<code v-pre>Goroutine</code>的上下文，<code v-pre>context</code>是并发安全的</p>
<p>使用上下文的程序应遵循以下规则</p>
<ul>
<li>不要在结构类型中存储上下文；相反，将上下文显式地传递给每个需要它的函数</li>
<li>上下文应该是第一个参数，通常命名为<code v-pre>ctx</code></li>
<li>即使函数允许，也不要传递nil上下文。如果您不确定要使用哪个上下文，请使用<code v-pre>context.TODO()</code></li>
</ul>
<br />
<h4 id="withcancel" tabindex="-1"><a class="header-anchor" href="#withcancel" aria-hidden="true">#</a> <code v-pre>WithCancel</code></h4>
<p>用来取消子协程，以及孙子协程，以及孙子的孙子协程等</p>
<p>函数签名</p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">WithCancel</span><span class="token punctuation">(</span>parent Context<span class="token punctuation">)</span> <span class="token punctuation">(</span>ctx Context<span class="token punctuation">,</span> cancel CancelFunc<span class="token punctuation">)</span>
</code></pre></div><p>示例代码</p>
<details class="custom-container details"><summary>先看一段正常的代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"log"</span>
	<span class="token string">"sync"</span>
	<span class="token string">"time"</span>
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
</code></pre></div></details>
<details class="custom-container details"><summary>对协程发送退出信号</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"context"</span>
	<span class="token string">"log"</span>
	<span class="token string">"sync"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">worker</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> wg <span class="token operator">*</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
LOOP<span class="token punctuation">:</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>

		<span class="token comment">// 退出信号</span>
		<span class="token keyword">select</span> <span class="token punctuation">{</span>
		<span class="token keyword">case</span> <span class="token operator">&lt;-</span>ctx<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
			<span class="token keyword">break</span> LOOP
		<span class="token keyword">default</span><span class="token punctuation">:</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 业务代码</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 初始化</span>
    <span class="token comment">// Background返回一个空Context。它永远不会被取消，没有截止日期，也没有值。</span>
	<span class="token comment">// Background是所有Context树的根。</span>
	ctx<span class="token punctuation">,</span> cancel <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">WithCancel</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	wg <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">)</span>

	<span class="token comment">// 开始工作了</span>
	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">worker</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> wg<span class="token punctuation">)</span>

	<span class="token comment">// 5秒后退出</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">)</span>
	<span class="token function">cancel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<br />
<h4 id="withdeadline和withtimeout" tabindex="-1"><a class="header-anchor" href="#withdeadline和withtimeout" aria-hidden="true">#</a> <code v-pre>WithDeadline</code>和<code v-pre>WithTimeout</code></h4>
<p><code v-pre>WithDeadline</code>和<code v-pre>WithTimeout</code>是在<code v-pre>WithCancel</code>的基础上，增加了一个过期时间</p>
<p>函数签名</p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">WithDeadline</span><span class="token punctuation">(</span>parent Context<span class="token punctuation">,</span> d time<span class="token punctuation">.</span>Time<span class="token punctuation">)</span> <span class="token punctuation">(</span>Context<span class="token punctuation">,</span> CancelFunc<span class="token punctuation">)</span>			<span class="token comment">// 增加一个具体的过期时间点</span>
<span class="token keyword">func</span> <span class="token function">WithTimeout</span><span class="token punctuation">(</span>parent Context<span class="token punctuation">,</span> timeout time<span class="token punctuation">.</span>Duration<span class="token punctuation">)</span> <span class="token punctuation">(</span>Context<span class="token punctuation">,</span> CancelFunc<span class="token punctuation">)</span>	<span class="token comment">// 增加一个相对的过期时间段</span>
</code></pre></div><p>示例代码</p>
<details class="custom-container details"><summary>函数超时控制</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"context"</span>
	<span class="token string">"log"</span>
	<span class="token string">"sync"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">worker</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> wg <span class="token operator">*</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
LOOP<span class="token punctuation">:</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>

		<span class="token comment">// 退出信号</span>
		<span class="token keyword">select</span> <span class="token punctuation">{</span>
		<span class="token keyword">case</span> <span class="token operator">&lt;-</span>ctx<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
			<span class="token keyword">break</span> LOOP
		<span class="token keyword">default</span><span class="token punctuation">:</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 业务代码</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 初始化</span>
	ctx<span class="token punctuation">,</span> cancel <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">WithTimeout</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span>Second<span class="token operator">*</span><span class="token number">5</span><span class="token punctuation">)</span>
    <span class="token keyword">defer</span> <span class="token function">cancel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>	<span class="token comment">// 这是一个好习惯</span>
	wg <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">)</span>

	<span class="token comment">// 开始工作了</span>
	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">worker</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> wg<span class="token punctuation">)</span>

	<span class="token comment">// 等待任务完成或超时</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h4 id="withvalue" tabindex="-1"><a class="header-anchor" href="#withvalue" aria-hidden="true">#</a> WithValue</h4>
<p>可以携带一个值</p>
<p>函数签名</p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">WithValue</span><span class="token punctuation">(</span>parent Context<span class="token punctuation">,</span> key<span class="token punctuation">,</span> val any<span class="token punctuation">)</span> Context
</code></pre></div><p>示例代码</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"context"</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"log"</span>
	<span class="token string">"sync"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">Work</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> wg <span class="token operator">*</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span><span class="token function">Value</span><span class="token punctuation">(</span><span class="token string">"key"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 初始化</span>
	ctx <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">WithValue</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"key"</span><span class="token punctuation">,</span> <span class="token string">"value"</span><span class="token punctuation">)</span>
	wg <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">)</span>

	<span class="token comment">// 工作</span>
	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">Work</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> wg<span class="token punctuation">)</span>

	<span class="token comment">// 等待工作完成</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h3 id="数据竞争" tabindex="-1"><a class="header-anchor" href="#数据竞争" aria-hidden="true">#</a> 数据竞争</h3>
<p>并发读写共享资源的时候会出现数据竞争<code v-pre>（data race）</code>，所以需要像锁等机制来进行保护</p>
<br />
<p>在编译<code v-pre>(cmpile)</code>、测试<code v-pre>（test）</code>、运行<code v-pre>（run）</code>前使用<code v-pre>-race</code>选项能检测数据竞争问题，</p>
<p>他的原理是：在程序运行以后，会监控程序对内存地址访问，并打印出提示</p>
<p>注意事项：</p>
<ul>
<li>如果程序在以后会访问某个资源，此时使用<code v-pre>-race</code>是检测不到的</li>
<li>开启了<code v-pre>-race</code>不要部署到线上，因为会有性能问题，测试期间可以开启<code v-pre>-race</code></li>
</ul>
<p>先准备一段代码</p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"sync"</span>
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

<span class="token comment">// 每次运行结果都不一样，大概在为9600左右，原理是产生了数据竞争，data++不是一个原子操作，操作是可以被打断的</span>
<span class="token comment">// 比如说 有2个协程同时拿到了data为100，那么协程1给data+1=101，协程2也给data+1=101，经过这俩协程一番操作，data只增长了1，</span>
<span class="token comment">// 所以我们虽然循环了一万次，其实结果要&lt;=10000，如果将上面的循环次数修改为100次，那么结果是正确的，但其实是还是有问题的</span>
</code></pre></div><p>下面开启<code v-pre>--race</code>检测数据竞争</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>Goroutine <span class="token number">8</span> <span class="token punctuation">(</span>running<span class="token punctuation">)</span> created at:
  main.main<span class="token punctuation">(</span><span class="token punctuation">)</span>
      C:/Users/Administrator/GolandProjects/learn/main.go:14 +0x84

Goroutine <span class="token number">7</span> <span class="token punctuation">(</span>finished<span class="token punctuation">)</span> created at:
  main.main<span class="token punctuation">(</span><span class="token punctuation">)</span>
      C:/Users/Administrator/GolandProjects/learn/main.go:14 +0x84
<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span>
<span class="token number">10000</span>
Found <span class="token number">1</span> data race<span class="token punctuation">(</span>s<span class="token punctuation">)</span>	<span class="token comment"># 发现1个数据竞争</span>
<span class="token builtin class-name">exit</span> status <span class="token number">66</span>
</code></pre></div><p>最常用的办法就是使用锁，来看一下代码</p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"sync"</span>
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

<span class="token comment">// 运行并开启--race检测</span>
<span class="token comment">// go run -race main.go  </span>
<span class="token comment">// 10000</span>
</code></pre></div><h3 id="sync" tabindex="-1"><a class="header-anchor" href="#sync" aria-hidden="true">#</a> Sync</h3>
<p>官方文档：<a href="https://pkg.go.dev/sync" target="_blank" rel="noopener noreferrer">https://pkg.go.dev/sync<ExternalLinkIcon/></a></p>
<p><code v-pre>sync</code>是Go的标准库，提供了最基本的同步原语，使用时需要注意：对象一旦被使用就不应该被复制。</p>
<h4 id="互斥锁和读写锁" tabindex="-1"><a class="header-anchor" href="#互斥锁和读写锁" aria-hidden="true">#</a> 互斥锁和读写锁</h4>
<p>锁接口</p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token comment">// A Locker represents an object that can be locked and unlocked.</span>
<span class="token keyword">type</span> Locker <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>互斥锁</p>
<p><code v-pre>sync.Mutex</code> 互斥锁，在某一时刻只能有一个协程可以拿到锁，拿不到的会一直阻塞，适合读少写多的场景</p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">/</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>		<span class="token comment">// 加锁/解锁</span>
<span class="token function">TryLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>			<span class="token comment">// 尝试获取锁，返回布尔值，此函数不会阻塞</span>
</code></pre></div><p>读写锁</p>
<p><code v-pre>sync.RWMutex</code> 读写锁，在某一时刻只能由任意的<code v-pre>reader</code>持有，或者是只能被单个的<code v-pre>writer</code>持有，适合读多写少的场景</p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">/</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>     	<span class="token comment">// 写操作调用的方法</span>
<span class="token function">RLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">/</span><span class="token function">RUnlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>   	<span class="token comment">// 读操作调用的方法</span>
<span class="token function">TryLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">/</span><span class="token function">TryRLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>	<span class="token comment">// 尝试获取锁,不会阻塞</span>
<span class="token function">RLocker</span><span class="token punctuation">(</span><span class="token punctuation">)</span>           	<span class="token comment">// 为读操作返回一个Locker接口的对象，他的Lock方法会调用RLock，他的Unlock会调用RUnlock</span>
</code></pre></div><p><strong>💡 注意：未持有锁的协程也可以释放锁</strong></p>
<details class="custom-container details"><summary>测试代码-1</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"log"</span>
	<span class="token string">"sync"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> mu sync<span class="token punctuation">.</span>Mutex
	<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup

	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>

	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"获取锁"</span><span class="token punctuation">)</span>
		wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
		mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"释放锁"</span><span class="token punctuation">)</span>
		wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// 未持有锁的协程也可以释放锁，但是非常不推荐这么使用</span>
</code></pre></div></details>
<details class="custom-container details"><summary>测试代码-2</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"log"</span>
	<span class="token string">"sync"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup
	<span class="token keyword">var</span> mu sync<span class="token punctuation">.</span>Mutex

	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">1</span><span class="token punctuation">)</span>
		mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"f1 lock"</span><span class="token punctuation">)</span>

		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">10</span><span class="token punctuation">)</span>
		mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"f1 unlock"</span><span class="token punctuation">)</span>

		wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span>
		mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"f2 unlock"</span><span class="token punctuation">)</span>

		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">)</span>
		mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"f2 lock"</span><span class="token punctuation">)</span>
		wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"End"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h4 id="案例-并发安全的map的3种实现" tabindex="-1"><a class="header-anchor" href="#案例-并发安全的map的3种实现" aria-hidden="true">#</a> 案例：并发安全的Map的3种实现</h4>
<h5 id="_1-原生map-读写锁" tabindex="-1"><a class="header-anchor" href="#_1-原生map-读写锁" aria-hidden="true">#</a> （1）原生Map+读写锁</h5>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"log"</span>
	<span class="token string">"sync"</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> RWMap <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	sync<span class="token punctuation">.</span>RWMutex
	m <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token comment">// 构造函数</span>
<span class="token keyword">func</span> <span class="token function">NewRWMap</span><span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">*</span>RWMap <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>RWMap<span class="token punctuation">{</span>
		m<span class="token punctuation">:</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> n<span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 读操作</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>RWMap<span class="token punctuation">)</span> <span class="token function">Load</span><span class="token punctuation">(</span>k <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	m<span class="token punctuation">.</span><span class="token function">RLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> m<span class="token punctuation">.</span><span class="token function">RUnlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	v<span class="token punctuation">,</span> ok <span class="token operator">:=</span> m<span class="token punctuation">.</span>m<span class="token punctuation">[</span>k<span class="token punctuation">]</span>
	<span class="token keyword">return</span> v<span class="token punctuation">,</span> ok
<span class="token punctuation">}</span>

<span class="token comment">// 写操作</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>RWMap<span class="token punctuation">)</span> <span class="token function">Store</span><span class="token punctuation">(</span>k <span class="token builtin">int</span><span class="token punctuation">,</span> v <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	m<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> m<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	m<span class="token punctuation">.</span>m<span class="token punctuation">[</span>k<span class="token punctuation">]</span> <span class="token operator">=</span> v
<span class="token punctuation">}</span>

<span class="token comment">// 删操作</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>RWMap<span class="token punctuation">)</span> <span class="token function">Delete</span><span class="token punctuation">(</span>k <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	m<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> m<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">delete</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span>m<span class="token punctuation">,</span> k<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 遍历操作</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>RWMap<span class="token punctuation">)</span> <span class="token function">Range</span><span class="token punctuation">(</span>f <span class="token keyword">func</span><span class="token punctuation">(</span>k<span class="token punctuation">,</span> v <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	m<span class="token punctuation">.</span><span class="token function">RLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> m<span class="token punctuation">.</span><span class="token function">RUnlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> m<span class="token punctuation">.</span>m <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token operator">!</span><span class="token function">f</span><span class="token punctuation">(</span>k<span class="token punctuation">,</span> v<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 复合操作</span>
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

<span class="token comment">// 获取大小</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>RWMap<span class="token punctuation">)</span> <span class="token function">Len</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	m<span class="token punctuation">.</span><span class="token function">RLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> m<span class="token punctuation">.</span><span class="token function">RUnlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token function">len</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span>m<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 初始化</span>
	<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup
	m <span class="token operator">:=</span> <span class="token function">NewRWMap</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

	<span class="token comment">// 写数据</span>
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"开始写入数据"</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10000000</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
		<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			m<span class="token punctuation">.</span><span class="token function">Store</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> i<span class="token punctuation">)</span>
			wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token comment">// 注意这里要将i传入</span>
	<span class="token punctuation">}</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"写入数据完成"</span><span class="token punctuation">)</span>

	<span class="token comment">// 遍历</span>
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"开始遍历数据"</span><span class="token punctuation">)</span>
	m<span class="token punctuation">.</span><span class="token function">Range</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>k<span class="token punctuation">,</span> v <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> k <span class="token operator">!=</span> v <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"key is error: %d"</span><span class="token punctuation">,</span> k<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">return</span> <span class="token boolean">true</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"遍历数据完成"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h5 id="_2-标准库-sync-map" tabindex="-1"><a class="header-anchor" href="#_2-标准库-sync-map" aria-hidden="true">#</a> （2）标准库 sync.Map</h5>
<p><code v-pre>sync.Map</code>是Go为我们提供的并发安全的<code v-pre>Map</code>，适用于读多写少的场景</p>
<p>（适用场景与原生<code v-pre>map</code> + <code v-pre>sync.RWMutex</code>类似，相比而言<code v-pre>sync.Map</code>读的性能更好写的性能更差）</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"sync"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> m sync<span class="token punctuation">.</span>Map
	<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup

	<span class="token comment">// 写数据，并发写</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">20</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
		<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			m<span class="token punctuation">.</span><span class="token function">Store</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> i<span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 写数据，支持不同的数据类型</span>
	m<span class="token punctuation">.</span><span class="token function">Store</span><span class="token punctuation">(</span><span class="token string">"a"</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	m<span class="token punctuation">.</span><span class="token function">Store</span><span class="token punctuation">(</span><span class="token char">'a'</span><span class="token punctuation">,</span> <span class="token string">"中国"</span><span class="token punctuation">)</span>

	<span class="token comment">// 读数据</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span><span class="token function">Load</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span>            <span class="token comment">// 读取</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span><span class="token function">LoadAndDelete</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span>   <span class="token comment">// 读取并删除</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span><span class="token function">LoadOrStore</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 读取,第二个返回值代表是否读取到，若读不到则设置value为该值并返回</span>

	<span class="token comment">// 删除数据</span>
	m<span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span><span class="token string">"a"</span><span class="token punctuation">)</span> <span class="token comment">// 无返回值</span>
	m<span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span><span class="token string">"a"</span><span class="token punctuation">)</span>

	<span class="token comment">// 遍历</span>
	m<span class="token punctuation">.</span><span class="token function">Range</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value any<span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">true</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h5 id="_3-第三方库-map分片" tabindex="-1"><a class="header-anchor" href="#_3-第三方库-map分片" aria-hidden="true">#</a> （3）第三方库：<code v-pre>map</code>分片</h5>
<p><code v-pre>Github</code>地址：<a href="https://github.com/orcaman/concurrent-map" target="_blank" rel="noopener noreferrer">https://github.com/orcaman/concurrent-map<ExternalLinkIcon/></a></p>
<p><code v-pre>concurrent-map</code>提供了一种高性能的解决方案:通过对内部<code v-pre>map</code>进行分片，降低锁粒度，从而达到最少的锁等待时间(锁冲突)</p>
<p><strong>实现逻辑</strong></p>
<ul>
<li>默认对<code v-pre>map</code>分了32片（每一片是一个结构体，每个结构体包含原生Map和读写锁），所有分片存储在一个切片中<code v-pre>[]*ConcurrentMapShared</code></li>
<li>每次操作时(增删改查)，先通过<code v-pre>GetShard(key)</code>获取<code v-pre>key</code>所在的分片，然后对分片加锁后再操作</li>
</ul>
<p>示例代码</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"github.com/orcaman/concurrent-map"</span>
	<span class="token string">"log"</span>
	<span class="token string">"strconv"</span>
	<span class="token string">"sync"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 初始化</span>
	<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup
	m <span class="token operator">:=</span> cmap<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 初始化Map</span>
	loop <span class="token operator">:=</span> <span class="token number">1000000</span> <span class="token comment">// 循环次数</span>

	<span class="token comment">// 写数据，值必须为string，这是代码里写死的</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> loop<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
		<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			m<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span>strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">,</span> i<span class="token operator">*</span>i<span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 获取数据并校验</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> loop<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
		<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token keyword">if</span> v<span class="token punctuation">,</span> ok <span class="token operator">:=</span> m<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span>strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span>
				<span class="token keyword">if</span> v <span class="token operator">!=</span> i<span class="token operator">*</span>i <span class="token punctuation">{</span>
					log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"key err: %d\n"</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h4 id="只执行一次" tabindex="-1"><a class="header-anchor" href="#只执行一次" aria-hidden="true">#</a> 只执行一次</h4>
<p><code v-pre>sync.Once</code>只暴露了一个方法<code v-pre>Do</code>,多次调用<code v-pre>Do</code>方法，但是只有第一次调用<code v-pre>Do</code>方法时参数<code v-pre>f</code>函数才会执行，<code v-pre>f</code>函数是无参数无返回值的函数</p>
<p><strong>单例模式与重置</strong></p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"sync"</span>
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
	<span class="token comment">// 单例模式</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%p\n"</span><span class="token punctuation">,</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span><span class="token string">"a"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%p\n"</span><span class="token punctuation">,</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span><span class="token string">"b"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// 重置</span>
	<span class="token function">RestPerson</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    <span class="token comment">// 继续单例模式</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%p\n"</span><span class="token punctuation">,</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span><span class="token string">"c"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%p\n"</span><span class="token punctuation">,</span> <span class="token function">NewPerson</span><span class="token punctuation">(</span><span class="token string">"d"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 输出结果</span>
<span class="token comment">// 0xc00004a250</span>
<span class="token comment">// 0xc00004a250</span>
<span class="token comment">// 0xc00004a260</span>
<span class="token comment">// 0xc00004a260</span>
</code></pre></div></details>
<blockquote>
<p>👀  其他单例模式扩展</p>
<p>方法1：定义包级别的变量<br>
方法2：包级别<code v-pre>init</code>函数初始化<br>
方法3：在<code v-pre>main</code>函数中，执行一个初始化函数</p>
</blockquote>
<h4 id="临时缓存池pool" tabindex="-1"><a class="header-anchor" href="#临时缓存池pool" aria-hidden="true">#</a> 临时缓存池Pool</h4>
<p><code v-pre>sync.Pool</code>是一个临时缓存池，并发安全</p>
<p><strong>注意事项</strong></p>
<ul>
<li>池对象可以随时被垃圾回收掉，所以HTTP长连接、数据库长连接等不适合使用它</li>
<li>池中要放入引用类型的对象，不然是对象的拷贝则起不到缓存池的作用</li>
<li>在对象用完以后，放入池中之前，最好做一下清理工作，不然下次从池中会拿到一个有使用痕迹的对象</li>
<li><code v-pre>Get()</code>和<code v-pre>Put(x)</code>是并发安全的，但是<code v-pre>New()</code>不是并发安全的，但是并不影响我们使用</li>
</ul>
<p><strong>定义和方法</strong></p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token comment">// sync.Pool结构体定义</span>
<span class="token keyword">type</span> Pool <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token operator">...</span> 			<span class="token comment">// 忽略</span>
	New <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> any	<span class="token comment">// 当池为空时会调用此方法来创建对象并放入池中</span>
<span class="token punctuation">}</span>

<span class="token comment">// sync.Pool结构体方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>Pool<span class="token punctuation">)</span> <span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> any <span class="token punctuation">{</span><span class="token punctuation">}</span>		<span class="token comment">// 从池中取走一个元素，同时会在池中删除这个元素</span>
								<span class="token comment">// 如果Pool中没有元素了，会使用结构体的New方法创建一个元素</span>
        						<span class="token comment">// 如果结构体没有定义New方法，那么Get方法会返回nil，所以在使用Get时要判断nil的情况</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>Pool<span class="token punctuation">)</span> <span class="token function">Put</span><span class="token punctuation">(</span>x any<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>	<span class="token comment">// 将元素放到Pool，如果元素为nil，那么Pool会忽略这个值</span>
</code></pre></div><p><strong>基本使用</strong></p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"sync"</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>u <span class="token operator">*</span>User<span class="token punctuation">)</span> <span class="token function">Clean</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	u<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">""</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 初始化池</span>
	pool <span class="token operator">:=</span> <span class="token operator">&amp;</span>sync<span class="token punctuation">.</span>Pool<span class="token punctuation">{</span>
		New<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token function">new</span><span class="token punctuation">(</span>User<span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">}</span>

	<span class="token comment">// 从池中获取对象</span>
	user <span class="token operator">:=</span> pool<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>User<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%#v %p\n"</span><span class="token punctuation">,</span> user<span class="token punctuation">,</span> user<span class="token punctuation">)</span>

	<span class="token comment">// 使用对象</span>
	user<span class="token punctuation">.</span>Name <span class="token operator">=</span> <span class="token string">"bob"</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%#v %p\n"</span><span class="token punctuation">,</span> user<span class="token punctuation">,</span> user<span class="token punctuation">)</span>

	<span class="token comment">// 用完了，放回池中</span>
	user<span class="token punctuation">.</span><span class="token function">Clean</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 放回池之前执行清理工作，不然下次从池中会拿到一个有使用痕迹的对象</span>
	pool<span class="token punctuation">.</span><span class="token function">Put</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span>

	<span class="token comment">// 再次申请一个</span>
	user2 <span class="token operator">:=</span> pool<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>User<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%#v %p\n"</span><span class="token punctuation">,</span> user2<span class="token punctuation">,</span> user2<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 输出结果</span>
<span class="token comment">// &amp;main.User{Name:""} 0xc00004a250</span>
<span class="token comment">// &amp;main.User{Name:"bob"} 0xc00004a250</span>
<span class="token comment">// &amp;main.User{Name:""} 0xc00004a250</span>
</code></pre></div></details>
<h4 id="案例-并发安全的字节池的2种实现" tabindex="-1"><a class="header-anchor" href="#案例-并发安全的字节池的2种实现" aria-hidden="true">#</a> 案例：并发安全的字节池的2种实现</h4>
<h5 id="_1-sync-pool实现" tabindex="-1"><a class="header-anchor" href="#_1-sync-pool实现" aria-hidden="true">#</a> （1）<code v-pre>sync.Pool</code>实现</h5>
<p>代码来自<code v-pre>Hugo</code>：<a href="https://github.com/gohugoio/hugo" target="_blank" rel="noopener noreferrer">https://github.com/gohugoio/hugo<ExternalLinkIcon/></a></p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"bytes"</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"sync"</span>
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
	<span class="token comment">// 从池子取出对象</span>
	buf <span class="token operator">:=</span> <span class="token function">GetBuffer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"长度: %d | 容量: %d\n"</span><span class="token punctuation">,</span> buf<span class="token punctuation">.</span><span class="token function">Len</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> buf<span class="token punctuation">.</span><span class="token function">Cap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// 使用</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10000</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		buf<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">"Hello"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"长度: %d | 容量: %d\n"</span><span class="token punctuation">,</span> buf<span class="token punctuation">.</span><span class="token function">Len</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> buf<span class="token punctuation">.</span><span class="token function">Cap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// 放入池子</span>
	<span class="token function">PutBuffer</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span>

	<span class="token comment">// 再次从池子取出</span>
	buf2 <span class="token operator">:=</span> <span class="token function">GetBuffer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"长度: %d | 容量: %d\n"</span><span class="token punctuation">,</span> buf2<span class="token punctuation">.</span><span class="token function">Len</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> buf2<span class="token punctuation">.</span><span class="token function">Cap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h5 id="_2-使用channel实现" tabindex="-1"><a class="header-anchor" href="#_2-使用channel实现" aria-hidden="true">#</a> （2）使用channel实现</h5>
<p>代码来自minio：<a href="https://github.com/minio/minio" target="_blank" rel="noopener noreferrer">https://github.com/minio/minio<ExternalLinkIcon/></a></p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

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
		<span class="token keyword">if</span> bp<span class="token punctuation">.</span>wcap <span class="token operator">></span> <span class="token number">0</span> <span class="token punctuation">{</span>
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
		<span class="token comment">// buffer didn't go back into pool, just discard</span>
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
	<span class="token comment">// 初始化池子</span>
	pool <span class="token operator">:=</span> <span class="token function">NewBytePoolCap</span><span class="token punctuation">(</span><span class="token number">10000</span><span class="token punctuation">,</span> <span class="token number">512</span><span class="token punctuation">,</span> <span class="token number">512</span><span class="token punctuation">)</span>

	<span class="token comment">// 从池子取出对象</span>
	buf <span class="token operator">:=</span> pool<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"长度: %d | 容量: %d\n"</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// 使用</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10000</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		buf <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>buf<span class="token punctuation">,</span> <span class="token char">'h'</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"长度: %d | 容量: %d\n"</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// 放入池子</span>
	pool<span class="token punctuation">.</span><span class="token function">Put</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span>

	<span class="token comment">// 再次从池子取出</span>
	buf2 <span class="token operator">:=</span> pool<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"长度: %d | 容量: %d\n"</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>buf2<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>buf2<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h5 id="_3-可能需要的注意事项" tabindex="-1"><a class="header-anchor" href="#_3-可能需要的注意事项" aria-hidden="true">#</a> （3）可能需要的注意事项</h5>
<ul>
<li>
<p>内存泄漏问题：</p>
<ul>
<li>
<p>描述：当<code v-pre>byte</code>很大的时候，再放入池子，就会引起内存泄漏</p>
</li>
<li>
<p>解决：放回池子时判断<code v-pre>Byte</code>大小，如果很大就直接丢弃</p>
</li>
<li>
<p>参考实现</p>
<details class="custom-container details"><summary>点击查看参考代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token comment">// fmt包print.go文件</span>

<span class="token comment">// 定义池子</span>
<span class="token keyword">var</span> ppFree <span class="token operator">=</span> sync<span class="token punctuation">.</span>Pool<span class="token punctuation">{</span>
	New<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> any <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token function">new</span><span class="token punctuation">(</span>pp<span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// 放回池子操作</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>pp<span class="token punctuation">)</span> <span class="token function">free</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// Proper usage of a sync.Pool requires each entry to have approximately</span>
	<span class="token comment">// the same memory cost. To obtain this property when the stored type</span>
	<span class="token comment">// contains a variably-sized buffer, we add a hard limit on the maximum buffer</span>
	<span class="token comment">// to place back in the pool.</span>
	<span class="token comment">//</span>
	<span class="token comment">// See https://golang.org/issue/23199</span>
	<span class="token keyword">if</span> <span class="token function">cap</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>buf<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">64</span><span class="token operator">&lt;&lt;</span><span class="token number">10</span> <span class="token punctuation">{</span>	<span class="token comment">// 容量过大则丢弃</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	p<span class="token punctuation">.</span>buf <span class="token operator">=</span> p<span class="token punctuation">.</span>buf<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">0</span><span class="token punctuation">]</span>
	p<span class="token punctuation">.</span>arg <span class="token operator">=</span> <span class="token boolean">nil</span>
	p<span class="token punctuation">.</span>value <span class="token operator">=</span> reflect<span class="token punctuation">.</span>Value<span class="token punctuation">{</span><span class="token punctuation">}</span>
	p<span class="token punctuation">.</span>wrappedErr <span class="token operator">=</span> <span class="token boolean">nil</span>
	ppFree<span class="token punctuation">.</span><span class="token function">Put</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
</li>
</ul>
</li>
<li>
<p>内存浪费问题：</p>
<ul>
<li>
<p>描述：如果池子内的<code v-pre>buffer</code>比较大，但是实际用的话比较小，就存在浪费问题了</p>
</li>
<li>
<p>解决：定义多种规格的池子，按需使用</p>
</li>
<li>
<p>参考实现</p>
<details class="custom-container details"><summary>点击查看参考代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token comment">// net/http包server.go</span>

<span class="token keyword">var</span> <span class="token punctuation">(</span>
	bufioReaderPool   sync<span class="token punctuation">.</span>Pool
	bufioWriter2kPool sync<span class="token punctuation">.</span>Pool
	bufioWriter4kPool sync<span class="token punctuation">.</span>Pool
<span class="token punctuation">)</span>
</code></pre></div></details>
</li>
</ul>
</li>
</ul>
<h4 id="条件变量-不推荐" tabindex="-1"><a class="header-anchor" href="#条件变量-不推荐" aria-hidden="true">#</a> 条件变量(不推荐)</h4>
<p><code v-pre>sync.Cond</code>并不被推荐使用，这里权当了解一下</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"log"</span>
	<span class="token string">"sync"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> done <span class="token operator">=</span> <span class="token boolean">false</span>

<span class="token keyword">func</span> <span class="token function">read</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">,</span> c <span class="token operator">*</span>sync<span class="token punctuation">.</span>Cond<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	c<span class="token punctuation">.</span>L<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token operator">!</span>done <span class="token punctuation">{</span>
		c<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 会释放锁，被唤醒时又会重新获得锁</span>
	<span class="token punctuation">}</span>
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> <span class="token string">"starts reading"</span><span class="token punctuation">)</span>
	c<span class="token punctuation">.</span>L<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">write</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">,</span> c <span class="token operator">*</span>sync<span class="token punctuation">.</span>Cond<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> <span class="token string">"starts writing"</span><span class="token punctuation">)</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
	c<span class="token punctuation">.</span>L<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	done <span class="token operator">=</span> <span class="token boolean">true</span>
	c<span class="token punctuation">.</span>L<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> <span class="token string">"wakes all"</span><span class="token punctuation">)</span>
	c<span class="token punctuation">.</span><span class="token function">Broadcast</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	cond <span class="token operator">:=</span> sync<span class="token punctuation">.</span><span class="token function">NewCond</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>sync<span class="token punctuation">.</span>Mutex<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token keyword">go</span> <span class="token function">read</span><span class="token punctuation">(</span><span class="token string">"reader1"</span><span class="token punctuation">,</span> cond<span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">read</span><span class="token punctuation">(</span><span class="token string">"reader2"</span><span class="token punctuation">,</span> cond<span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token function">read</span><span class="token punctuation">(</span><span class="token string">"reader3"</span><span class="token punctuation">,</span> cond<span class="token punctuation">)</span>
	<span class="token function">write</span><span class="token punctuation">(</span><span class="token string">"writer"</span><span class="token punctuation">,</span> cond<span class="token punctuation">)</span>

	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">3</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h3 id="sync-atomic" tabindex="-1"><a class="header-anchor" href="#sync-atomic" aria-hidden="true">#</a> sync/atomic</h3>
<p>官方文档：<a href="https://pkg.go.dev/sync/atomic" target="_blank" rel="noopener noreferrer">https://pkg.go.dev/sync/atomic<ExternalLinkIcon/></a></p>
<p><code v-pre>sync/atomic</code>包提供了一系列原子相关操作</p>
<p><strong>特点</strong></p>
<ul>
<li>原子操作是不允许中断的（<code v-pre>interrupt</code>），所以可以实现无锁并发（<code v-pre>lock-free</code>）</li>
<li>原子操作是不允许中断的（<code v-pre>interrupt</code>），所以它必须很快，所以提供的原子方法数量很少</li>
<li>原子操作由底层硬件实现，<code v-pre>Mutex</code>是由操作系统实现的，所以原子操作性能更好</li>
</ul>
<h4 id="基本数据类型-原子操作" tabindex="-1"><a class="header-anchor" href="#基本数据类型-原子操作" aria-hidden="true">#</a> <strong>基本数据类型-原子操作</strong></h4>
<table>
<thead>
<tr>
<th>分类</th>
<th>方法</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>加减法</td>
<td>(1)<code v-pre>AddInt32(addr *int32, delta int32) (new int32)</code><br />(2)<code v-pre>AddInt64(addr *int64, delta int64) (new int64)</code><br />(3)<code v-pre>AddUint32(addr *uint32, delta uint32) (new uint32)</code><br />(4)<code v-pre>AddUint64(addr *uint64, delta uint64) (new uint64)</code><br />(5)<code v-pre>AddUintptr(addr *uintptr, delta uintptr) (new uintptr)</code></td>
<td>（1）减法需要注意：<br />对于<code v-pre>Int</code>类型，加一个负数即可<br />对于<code v-pre>Uint</code>类型，使用位运算来得到负数<br />（2）这个只支持5种数据类型</td>
</tr>
<tr>
<td>交换</td>
<td>(1)<code v-pre>SwapInt32(addr *int32, new int32) (old int32)</code><br />(2)<code v-pre>SwapInt64(addr *int64, new int64) (old int64)</code><br />(3)<code v-pre>SwapUint32(addr *uint32, new uint32) (old uint32)</code><br />(4)<code v-pre>SwapUint64(addr *uint64, new uint64) (old uint64)</code><br />(5)<code v-pre>SwapUintptr(addr *uintptr, new uintptr) (old uintptr)</code><br />(6)<code v-pre>SwapPointer(addr *unsafe.Pointer, new unsafe.Pointer) (old unsafe.Pointer)</code></td>
<td>&quot;赋值&quot;并返回旧值</td>
</tr>
<tr>
<td>比较并交换</td>
<td>(1)<code v-pre>CompareAndSwapInt32(addr *int32, old, new int32) (swapped bool)</code><br />(2)<code v-pre>CompareAndSwapInt64(addr *int64, old, new int64) (swapped bool)</code><br />(3)<code v-pre>CompareAndSwapUint32(addr *uint32, old, new uint32) (swapped bool)</code><br />(4)<code v-pre>CompareAndSwapUint64(addr *uint64, old, new uint64) (swapped bool)</code><br />(5)<code v-pre>CompareAndSwapUintptr(addr *uintptr, old, new uintptr) (swapped bool)</code><br />(6)<code v-pre>CompareAndSwapPointer(addr *unsafe.Pointer, old, new unsafe.Pointer) (swapped bool)</code></td>
<td>&quot;比较并赋值&quot;并返回旧值</td>
</tr>
<tr>
<td>加载</td>
<td>(1)<code v-pre>LoadInt32(addr *int32) (val int32)</code><br />(2)<code v-pre>LoadInt64(addr *int64) (val int64)</code><br />(3)<code v-pre>LoadUint32(addr *uint32) (val uint32)</code><br />(4)<code v-pre>LoadUint64(addr *uint64) (val uint64)</code><br />(5)<code v-pre>LoadUintptr(addr *uintptr) (val uintptr)</code><br />(6)<code v-pre>LoadPointer(addr *unsafe.Pointer) (val unsafe.Pointer)</code></td>
<td>&quot;读取&quot;变量的值</td>
</tr>
<tr>
<td>存储</td>
<td>(1)<code v-pre>StoreInt32(addr *int32, val int32)</code><br />(2)<code v-pre>StoreInt64(addr *int64, val int64)</code><br />(3)<code v-pre>StoreUint32(addr *uint32, val uint32)</code><br />(4)<code v-pre>StoreUint64(addr *uint64, val uint64)</code><br />(5)<code v-pre>StoreUintptr(addr *uintptr, val uintptr)</code><br />(6)<code v-pre>StorePointer(addr *unsafe.Pointer, val unsafe.Pointer)</code></td>
<td>&quot;赋值&quot;不会返回旧值<br />这个和<code v-pre>Swap</code>系列函数很像</td>
</tr>
</tbody>
</table>
<p>示例代码</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"sync/atomic"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">Add</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 加法</span>
	<span class="token keyword">var</span> x <span class="token builtin">int32</span> <span class="token operator">=</span> <span class="token number">100</span>
	<span class="token keyword">var</span> y <span class="token builtin">uint32</span> <span class="token operator">=</span> <span class="token number">1000</span>

	<span class="token comment">// 因为x是有符号整数，可以减法可以写成加法，-1 -> + -1</span>
	atomic<span class="token punctuation">.</span><span class="token function">AddInt32</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>x<span class="token punctuation">,</span> <span class="token function">int32</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// 因为y是无符号整数，所以不能使用uint32(-1)</span>
	<span class="token comment">// 这时候可以使用^作为一元运算符使用，按位取反，得到类似-1的效果</span>
	atomic<span class="token punctuation">.</span><span class="token function">AddUint32</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>y<span class="token punctuation">,</span> <span class="token operator">^</span><span class="token function">uint32</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"加减法:\n"</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"x = %d\n"</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"y = %d\n"</span><span class="token punctuation">,</span> y<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">Swap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"\n交换:\n"</span><span class="token punctuation">)</span>
	<span class="token keyword">var</span> x <span class="token builtin">int32</span> <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">100</span>
	<span class="token keyword">var</span> y <span class="token builtin">int32</span> <span class="token operator">=</span> <span class="token number">200</span>
	old <span class="token operator">:=</span> atomic<span class="token punctuation">.</span><span class="token function">SwapInt32</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span> <span class="token comment">// y值保持不变，x值更新为y值，old为x的旧值</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"x = %d\n"</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"y = %d\n"</span><span class="token punctuation">,</span> y<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"old = %d\n"</span><span class="token punctuation">,</span> old<span class="token punctuation">)</span>	
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">CompareAndSwap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 先比较，再决定是否覆盖</span>
	<span class="token comment">// 如果x == y，那么用z覆盖x，并返回true</span>
	<span class="token comment">// 如果x != y，那么什么都不做，并返回false</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"\n比较并交换:\n"</span><span class="token punctuation">)</span>
	<span class="token keyword">var</span> x <span class="token builtin">int32</span> <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">300</span>
	<span class="token keyword">var</span> y <span class="token builtin">int32</span> <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">300</span>
	<span class="token keyword">var</span> z <span class="token builtin">int32</span> <span class="token operator">=</span> <span class="token number">400</span>
	<span class="token keyword">if</span> atomic<span class="token punctuation">.</span><span class="token function">CompareAndSwapInt32</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> z<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"比较并交换成功: %d %d %d\n"</span><span class="token punctuation">,</span> x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> z<span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"比较并交换失败: %d %d %d\n"</span><span class="token punctuation">,</span> x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> z<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">Load</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"\n加载:\n"</span><span class="token punctuation">)</span>
	<span class="token keyword">var</span> x <span class="token builtin">int32</span> <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">999</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"x = %d\n"</span><span class="token punctuation">,</span> atomic<span class="token punctuation">.</span><span class="token function">LoadInt32</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>x<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// -999</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">Store</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"\n存储:\n"</span><span class="token punctuation">)</span>
	<span class="token keyword">var</span> x <span class="token builtin">int32</span> <span class="token operator">=</span> <span class="token number">888</span>
	atomic<span class="token punctuation">.</span><span class="token function">StoreInt32</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>x<span class="token punctuation">,</span> <span class="token function">int32</span><span class="token punctuation">(</span><span class="token number">222</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"x = %d\n"</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span> <span class="token comment">// 222</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">Add</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">Swap</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">CompareAndSwap</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">Load</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">Store</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>加减法:
x <span class="token operator">=</span> <span class="token number">99</span>                      
y <span class="token operator">=</span> <span class="token number">999</span>                     
                            
交换:                       
x <span class="token operator">=</span> <span class="token number">200</span>                     
y <span class="token operator">=</span> <span class="token number">200</span>                     
old <span class="token operator">=</span> -100                  
                            
比较并交换:                 
比较并交换成功: <span class="token number">400</span> -300 <span class="token number">400</span>
                            
载入:                       
x <span class="token operator">=</span> -999                    
                            
存储:                       
x <span class="token operator">=</span> <span class="token number">222</span>
</code></pre></div><h4 id="任意数据类型-原子操作" tabindex="-1"><a class="header-anchor" href="#任意数据类型-原子操作" aria-hidden="true">#</a> 任意数据类型-原子操作</h4>
<p>如果是其他类型的数据，<code v-pre>atomic</code>为我们提供了<code v-pre>Value</code>结构体来原子操作</p>
<p>注意事项</p>
<ul>
<li>默认为<code v-pre>nil</code>值</li>
<li>原子值存储的第一个值，决定了它今后能且只能存储哪一个类型的值</li>
<li>切片、映射等不支持&quot;比较并交换&quot;</li>
</ul>
<p>示例代码</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"sync/atomic"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 初始化</span>
	<span class="token keyword">var</span> v atomic<span class="token punctuation">.</span>Value

	<span class="token comment">// 存储任意数据类型</span>
	v<span class="token punctuation">.</span><span class="token function">Store</span><span class="token punctuation">(</span><span class="token string">"hello"</span><span class="token punctuation">)</span>

	<span class="token comment">// 加载任意数据类型</span>
	x <span class="token operator">:=</span> v<span class="token punctuation">.</span><span class="token function">Load</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"x的数据类型: %T | x的值: %#v\n"</span><span class="token punctuation">,</span> x<span class="token punctuation">,</span> x<span class="token punctuation">)</span>

	<span class="token comment">// 交换</span>
	v<span class="token punctuation">.</span><span class="token function">Swap</span><span class="token punctuation">(</span><span class="token string">"world!"</span><span class="token punctuation">)</span>

	<span class="token comment">// 比较并交换</span>
	<span class="token keyword">if</span> v<span class="token punctuation">.</span><span class="token function">CompareAndSwap</span><span class="token punctuation">(</span><span class="token string">"world!"</span><span class="token punctuation">,</span> <span class="token string">"hello world!"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"比较并交换成功: %s\n"</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">Load</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"比较并交换失败: %s\n"</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">Load</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h4 id="原子操作举例" tabindex="-1"><a class="header-anchor" href="#原子操作举例" aria-hidden="true">#</a> 原子操作举例</h4>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"sync"</span>
	<span class="token string">"sync/atomic"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> data <span class="token builtin">int64</span> <span class="token operator">=</span> <span class="token number">0</span>
	<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup

	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10000</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
		<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">//data++ // 非原子操作，这会引起数据竞争</span>
			atomic<span class="token punctuation">.</span><span class="token function">AddInt64</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>data<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// 原子操作</span>
			wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="io" tabindex="-1"><a class="header-anchor" href="#io" aria-hidden="true">#</a> IO</h2>
<h3 id="os包-基础文件读写" tabindex="-1"><a class="header-anchor" href="#os包-基础文件读写" aria-hidden="true">#</a> <code v-pre>os</code>包：基础文件读写</h3>
<p>官方文档：<a href="https://pkg.go.dev/os" target="_blank" rel="noopener noreferrer">https://pkg.go.dev/os<ExternalLinkIcon/></a></p>
<h4 id="打开文件" tabindex="-1"><a class="header-anchor" href="#打开文件" aria-hidden="true">#</a> 打开文件</h4>
<p>方式一：<code v-pre>OpenFile</code></p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token function">OpenFile</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">,</span> flag <span class="token builtin">int</span><span class="token punctuation">,</span> perm FileMode<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>File<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
</code></pre></div><details class="custom-container details"><summary>点击查看详细介绍</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token comment">// flag选项</span>
<span class="token comment">//	(1)打开模式（必须指定其一）</span>
<span class="token comment">//		os.O_RDONLY         以只读方式打开文件       如果文件不存在则报错</span>
<span class="token comment">//		os.O_WRONLY         以只写方式打开          如果文件不存在则报错</span>
<span class="token comment">//		os.O_RDWR           以读写方式打开文件       如果文件不存在则报错</span>
<span class="token comment">//	(2)辅助控制行为</span>
<span class="token comment">//		os.O_APPEND         追加方式写入</span>
<span class="token comment">//		os.O_CREATE         文件不存在则创建文件；Windows系统该属性会自带写属性                                          </span>
<span class="token comment">//		os.O_EXCL           文件必须不存在；使用场景比如：只允许进程打开自己的文件 或 多进程运行时退出，只允许单进程运行</span>
<span class="token comment">//		os.O_TRUNC          文件存在则截断（清空内容）</span>

<span class="token comment">// 常用flag组合选项</span>
<span class="token comment">//	读文件</span>
<span class="token comment">//		os.O_RDONLY                             读文件，文件不存在则报错</span>
<span class="token comment">//	写文件</span>
<span class="token comment">//		os.O_RDWR | os.O_CREATE                 写文件，当文件不存在时自动创建文件</span>
<span class="token comment">//		os.O_RDWR | os.O_CREATE | os.O_APPEND   写文件，当文件不存在时自动创建文件，当文件存在时追加内容</span>
<span class="token comment">//		os.O_RDWR | os.O_CREATE | os.O_TRUNC    写文件，当文件不存在时自动创建文件，当文件存在时清空文件内容</span>

<span class="token comment">// perm选项</span>
<span class="token comment">// 	文件权限</span>
<span class="token comment">//	(1)只有在创建文件时才有用，当不需要创建文件时可以设置为0</span>
<span class="token comment">//	(2)内置常量os.ModePerm = 0777</span>
</code></pre></div></details>
<p>方式二：<code v-pre>Open</code></p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Open</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>File<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token function">OpenFile</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> O_RDONLY<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 核心为OpenFile，以只读模式打开文件，当文件不存在时会报错</span>
</code></pre></div><p>方式三：<code v-pre>Create</code></p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Create</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>File<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token function">OpenFile</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> O_RDWR<span class="token operator">|</span>O_CREATE<span class="token operator">|</span>O_TRUNC<span class="token punctuation">,</span> <span class="token number">0666</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 核心为OpenFile，当文件不存在时会创建，当文件存在时会清空文件内容</span>
<span class="token comment">// 使用时多加注意，不要误清空了文件内容!!!</span>
</code></pre></div><h4 id="常规操作函数" tabindex="-1"><a class="header-anchor" href="#常规操作函数" aria-hidden="true">#</a> 常规操作函数</h4>
<table>
<thead>
<tr>
<th>分类</th>
<th>函数</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>创建临时文件或目录</td>
<td><code v-pre>CreateTemp(dir, pattern string) (*File, error)</code></td>
<td>创建临时文件，返回临时文件的路径<br />（1）<code v-pre>dir</code>指定在哪个目录下创建临时目录，为空会使用用户默认临时目录<br />（2）<code v-pre>pattern </code>指定文件名前缀，如果包含<code v-pre>*</code>，那么代指整个文件名，<br /><code v-pre>*</code>被替换为随机字符串</td>
</tr>
<tr>
<td></td>
<td><code v-pre>MkdirTemp(dir, pattern string) (string, error)</code></td>
<td>同上，只不过创建的是临时目录</td>
</tr>
<tr>
<td>创建目录</td>
<td><code v-pre>Mkdir(name string, perm FileMode) error</code></td>
<td>创建目录；<br />（1）不支持创建多级目录<br />（2）目录存在时会报错</td>
</tr>
<tr>
<td></td>
<td><code v-pre>MkdirAll(path string, perm FileMode) error</code></td>
<td>创建目录<br />（1）支持创建多级目录<br />（2）目录存在时会报错</td>
</tr>
<tr>
<td>删除文件或目录</td>
<td><code v-pre>Remove(name string) error</code></td>
<td>删除文件或空目录，不存在时会报错</td>
</tr>
<tr>
<td></td>
<td><code v-pre>RemoveAll(path string) error</code></td>
<td>删除文件或目录，支持非空目录，不存在时会报错</td>
</tr>
<tr>
<td>重命名</td>
<td><code v-pre>Rename(oldpath, newpath string) error</code></td>
<td>文件或目录重命名</td>
</tr>
<tr>
<td>文件详情</td>
<td><code v-pre>Stat(name string) (FileInfo, error)</code></td>
<td>获取文件详情</td>
</tr>
<tr>
<td></td>
<td><code v-pre>Lstat(name string) (FileInfo, error)</code></td>
<td>同上，区别是对于链接文件，<code v-pre>Stat</code>具有穿透能力而<code v-pre>Lstat</code>没有</td>
</tr>
<tr>
<td>判断是哪种错误</td>
<td><code v-pre>IsExist(err error) bool</code></td>
<td>是否是文件存在错误</td>
</tr>
<tr>
<td></td>
<td><code v-pre>IsNotExist(err error) bool</code></td>
<td>是否是文件不存在错误</td>
</tr>
<tr>
<td></td>
<td><code v-pre>IsPermission(err error) bool</code></td>
<td>是否是权限错误</td>
</tr>
<tr>
<td></td>
<td><code v-pre>IsTimeout(err error) bool</code></td>
<td>是否是超时错误</td>
</tr>
</tbody>
</table>
<p>判断文件或目录是否存在</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"os"</span>
<span class="token punctuation">)</span>

<span class="token comment">// 判断文件或目录是否存在</span>
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
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> path <span class="token operator">:=</span> <span class="token keyword">range</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"main.go"</span><span class="token punctuation">,</span> <span class="token string">"go.mod"</span><span class="token punctuation">,</span> <span class="token string">"test.log"</span><span class="token punctuation">,</span> <span class="token string">"C:\\Windows"</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> exists<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">PathExists</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%s exist: %t\n"</span><span class="token punctuation">,</span> path<span class="token punctuation">,</span> exists<span class="token punctuation">)</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%s exist: %t\n"</span><span class="token punctuation">,</span> path<span class="token punctuation">,</span> <span class="token string">"unknown"</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>main.go exist: <span class="token boolean">true</span>
go.mod exist: <span class="token boolean">true</span>    
test.log exist: <span class="token boolean">false</span> 
C:<span class="token punctuation">\</span>Windows exist: <span class="token boolean">true</span>
</code></pre></div><h4 id="写入数据" tabindex="-1"><a class="header-anchor" href="#写入数据" aria-hidden="true">#</a> 写入数据</h4>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"os"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 打开文件，文件存在则清空内容，不存在则创建</span>
	f<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">OpenFile</span><span class="token punctuation">(</span><span class="token string">"test.log"</span><span class="token punctuation">,</span> os<span class="token punctuation">.</span>O_RDWR<span class="token operator">|</span>os<span class="token punctuation">.</span>O_CREATE<span class="token operator">|</span>os<span class="token punctuation">.</span>O_TRUNC<span class="token punctuation">,</span> <span class="token number">0777</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"Open file error: %s\n"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> f<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 写入内容 - 字节</span>
	byteLine <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">"人之初，性本善。性相近，习相远。"</span><span class="token punctuation">)</span>
	byteLine <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>byteLine<span class="token punctuation">,</span> <span class="token char">'\n'</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> f<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>byteLine<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"Write error: %s"</span><span class="token punctuation">,</span> byteLine<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 写入内容 - 字符串</span>
	stringLine <span class="token operator">:=</span> <span class="token string">"苟不教，性乃迁。教之道，贵以专。"</span>
	stringLine <span class="token operator">=</span> stringLine <span class="token operator">+</span> <span class="token string">"\n"</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> f<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>stringLine<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"Write error: %s"</span><span class="token punctuation">,</span> stringLine<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 获取文件指针位置 (从当前位置开始，偏移为0的位置)</span>
	currentSeek<span class="token punctuation">,</span> err <span class="token operator">:=</span> f<span class="token punctuation">.</span><span class="token function">Seek</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> io<span class="token punctuation">.</span>SeekCurrent<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"Get file current seek error: %s\n"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 使用指针写入（写入的长度会将指针后面的内容覆盖）</span>
	<span class="token comment">// 这里我们使用”新“替换掉”贵以专。“中的”贵“,思路就是文件指针移动到”贵“字上，然后替换即可</span>
	<span class="token comment">// 偏移量计算：1('\n') + 12("贵新专。"，一个汉字3个字节，注意这里的句号是中文的，也计算在汉字里面) = 13</span>
	seekRune <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">"新"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> f<span class="token punctuation">.</span><span class="token function">WriteAt</span><span class="token punctuation">(</span>seekRune<span class="token punctuation">,</span> currentSeek<span class="token operator">-</span><span class="token number">13</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"Write error: %s"</span><span class="token punctuation">,</span> byteLine<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h4 id="读取数据" tabindex="-1"><a class="header-anchor" href="#读取数据" aria-hidden="true">#</a> 读取数据</h4>
<p><strong>按字节从文件开始读取数据</strong>
<code v-pre>Read(b []byte) (n int, err error)</code></p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"os"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">Read</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 打开文件</span>
	fileName <span class="token operator">:=</span> <span class="token string">"test.log"</span>
	f<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"文件不存在: %s\n"</span><span class="token punctuation">,</span> fileName<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> f<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 循环读取文件</span>
	buffer <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">1024</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		n<span class="token punctuation">,</span> err <span class="token operator">:=</span> f<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span>

		<span class="token comment">// 处理数据</span>
		<span class="token keyword">if</span> n <span class="token operator">></span> <span class="token number">0</span> <span class="token punctuation">{</span>
            fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%s"</span><span class="token punctuation">,</span> buffer<span class="token punctuation">[</span><span class="token punctuation">:</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span>	<span class="token comment">// 注意这里[:n]</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 判断是否可以读取下一行</span>
		<span class="token keyword">if</span> err <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">continue</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 文件读取完成</span>
		<span class="token keyword">if</span> err <span class="token operator">==</span> io<span class="token punctuation">.</span>EOF <span class="token punctuation">{</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 文件读取失败</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"文件读取失败: %s:%s\n"</span><span class="token punctuation">,</span> fileName<span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">Read</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p><strong>按字节从文件任意位置读取数据</strong></p>
<p><code v-pre>ReadAt(b []byte, off int64) (n int, err error)</code></p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"os"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">ReadAt</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 打开文件</span>
	fileName <span class="token operator">:=</span> <span class="token string">"test.log"</span>
	f<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"文件不存在: %s\n"</span><span class="token punctuation">,</span> fileName<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> f<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 获取文件指针(末尾)</span>
	seekEnd<span class="token punctuation">,</span> err <span class="token operator">:=</span> f<span class="token punctuation">.</span><span class="token function">Seek</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> io<span class="token punctuation">.</span>SeekEnd<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"File seek error: %s\n"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// ReadAt读取</span>
	buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span>
	n<span class="token punctuation">,</span> err <span class="token operator">:=</span> f<span class="token punctuation">.</span><span class="token function">ReadAt</span><span class="token punctuation">(</span>buf<span class="token punctuation">,</span> seekEnd<span class="token operator">-</span><span class="token number">4</span><span class="token punctuation">)</span> <span class="token comment">// 读取文件末尾的4个字节，换行符1个字节，中文1个字节</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"File readat error: %s\n"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span>buf<span class="token punctuation">[</span><span class="token punctuation">:</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">ReadAt</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h4 id="读取中文乱码问题" tabindex="-1"><a class="header-anchor" href="#读取中文乱码问题" aria-hidden="true">#</a> 读取中文乱码问题</h4>
<p>一个中文占3个字节，如果只是简单的使用<code v-pre>Read</code>按字节读取文件的话，有可能会遇到中文乱码问题</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"bufio"</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"os"</span>
	<span class="token string">"unicode/utf8"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">WriteFile</span><span class="token punctuation">(</span>fileName <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 生成数据</span>
	data <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">170</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		data <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">"中"</span><span class="token punctuation">)</span><span class="token operator">...</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	data <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">"国"</span><span class="token punctuation">)</span><span class="token operator">...</span><span class="token punctuation">)</span>

	<span class="token comment">// 写入文件</span>
	err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">WriteFile</span><span class="token punctuation">(</span>fileName<span class="token punctuation">,</span> data<span class="token punctuation">,</span> os<span class="token punctuation">.</span>ModePerm<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"写入文件失败: %s\n"</span><span class="token punctuation">,</span> fileName<span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"写入文件成功: %s: %d bytes\n"</span><span class="token punctuation">,</span> fileName<span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">ReadByte</span><span class="token punctuation">(</span>fileName <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 打开文件</span>
	f<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"打开文件失败: %s\n"</span><span class="token punctuation">,</span> fileName<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> f<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 读取数据</span>
	buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">512</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		n<span class="token punctuation">,</span> err <span class="token operator">:=</span> f<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> err <span class="token operator">==</span> io<span class="token punctuation">.</span>EOF <span class="token punctuation">{</span>
				<span class="token keyword">break</span>
			<span class="token punctuation">}</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"读取文件失败: %s: %s \n"</span><span class="token punctuation">,</span> fileName<span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"读取文件成功: %s: %d bytes\n"</span><span class="token punctuation">,</span> fileName<span class="token punctuation">,</span> n<span class="token punctuation">)</span>

		<span class="token comment">// 显示数据,最后一个中文显示乱码</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"显示文件内容: %s\n"</span><span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>buf<span class="token punctuation">[</span><span class="token punctuation">:</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

		<span class="token comment">// 检测切片[]byte是否包含完整且合法的UTF-8编码序列（不能有乱码）</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"检测字节切片是否是完整且合法的UTF-8编码序列: %t\n"</span><span class="token punctuation">,</span> utf8<span class="token punctuation">.</span><span class="token function">Valid</span><span class="token punctuation">(</span>buf<span class="token punctuation">[</span><span class="token punctuation">:</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">ReadAllByte</span><span class="token punctuation">(</span>fileName <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	data<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">ReadFile</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"读取文件失败: %s: %s \n"</span><span class="token punctuation">,</span> fileName<span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"读取文件成功: %s: %d bytes\n"</span><span class="token punctuation">,</span> fileName<span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"显示文件内容: %s\n"</span><span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">ReadByRune</span><span class="token punctuation">(</span>fileName <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 打开文件</span>
	f<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"打开文件失败: %s\n"</span><span class="token punctuation">,</span> fileName<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> f<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 读取数据</span>
	reader <span class="token operator">:=</span> bufio<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span>
	data <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">rune</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		r<span class="token punctuation">,</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> reader<span class="token punctuation">.</span><span class="token function">ReadRune</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> err <span class="token operator">==</span> io<span class="token punctuation">.</span>EOF <span class="token punctuation">{</span>
				<span class="token keyword">break</span>
			<span class="token punctuation">}</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"读取文件失败: %s: %s \n"</span><span class="token punctuation">,</span> fileName<span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token comment">//log.Printf("读取文件成功: %s: %d bytes\n", fileName, size)</span>
		data <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> r<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 显示数据</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"显示文件内容: %s\n"</span><span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">ReadByteBySeek</span><span class="token punctuation">(</span>fileName <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 打开文件</span>
	f<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"打开文件失败: %s\n"</span><span class="token punctuation">,</span> fileName<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> f<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 读取数据</span>
	<span class="token keyword">var</span> bufsize <span class="token builtin">int64</span> <span class="token operator">=</span> <span class="token number">512</span>
	oldSize <span class="token operator">:=</span> bufsize
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		<span class="token comment">// 读取数据</span>
		buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> bufsize<span class="token punctuation">)</span>
		n<span class="token punctuation">,</span> err <span class="token operator">:=</span> f<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> err <span class="token operator">==</span> io<span class="token punctuation">.</span>EOF <span class="token punctuation">{</span>
				<span class="token keyword">break</span>
			<span class="token punctuation">}</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"读取文件失败: %s: %s \n"</span><span class="token punctuation">,</span> fileName<span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 非完整的UTF8序列处理</span>
		<span class="token keyword">if</span> <span class="token operator">!</span>utf8<span class="token punctuation">.</span><span class="token function">Valid</span><span class="token punctuation">(</span>buf<span class="token punctuation">[</span><span class="token punctuation">:</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">// 指针回退</span>
			<span class="token keyword">if</span> ret<span class="token punctuation">,</span> err <span class="token operator">:=</span> f<span class="token punctuation">.</span><span class="token function">Seek</span><span class="token punctuation">(</span><span class="token function">int64</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token operator">*</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> io<span class="token punctuation">.</span>SeekCurrent<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"读取文件失败: %s: %s %s \n"</span><span class="token punctuation">,</span> fileName<span class="token punctuation">,</span> err<span class="token punctuation">,</span> ret<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			<span class="token comment">// buf字节数+1</span>
			bufsize<span class="token operator">++</span>

			<span class="token keyword">continue</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 完整的UTF8序列处理</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"读取文件成功: %s: %d bytes\n"</span><span class="token punctuation">,</span> fileName<span class="token punctuation">,</span> n<span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"显示文件内容: %s\n"</span><span class="token punctuation">,</span> buf<span class="token punctuation">[</span><span class="token punctuation">:</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span>
		bufsize <span class="token operator">=</span> oldSize
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">ReadByteNoSeek</span><span class="token punctuation">(</span>fileName <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 打开文件</span>
	f<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"打开文件失败: %s\n"</span><span class="token punctuation">,</span> fileName<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> f<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 读取数据</span>
	lastLeft <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token comment">// 上次读取留下来的不完整的字节切片</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		<span class="token comment">// 读取数据</span>
		buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">300</span><span class="token punctuation">)</span>
		n<span class="token punctuation">,</span> err <span class="token operator">:=</span> f<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> err <span class="token operator">==</span> io<span class="token punctuation">.</span>EOF <span class="token punctuation">{</span>
				<span class="token keyword">break</span>
			<span class="token punctuation">}</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"读取文件失败: %s: %s \n"</span><span class="token punctuation">,</span> fileName<span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 与上次读取遗留字节合并</span>
		buf <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>lastLeft<span class="token punctuation">,</span> buf<span class="token operator">...</span><span class="token punctuation">)</span>
		n <span class="token operator">+=</span> <span class="token function">len</span><span class="token punctuation">(</span>lastLeft<span class="token punctuation">)</span>
		lastLeft <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token comment">// 重新初始化</span>

		<span class="token comment">// 检查序列完整性</span>
		<span class="token keyword">for</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> utf8<span class="token punctuation">.</span><span class="token function">Valid</span><span class="token punctuation">(</span>buf<span class="token punctuation">[</span><span class="token punctuation">:</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token keyword">break</span>
			<span class="token punctuation">}</span>
			lastByte <span class="token operator">:=</span> buf<span class="token punctuation">[</span>n<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
			lastLeft <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">{</span>lastByte<span class="token punctuation">}</span><span class="token punctuation">,</span> lastLeft<span class="token operator">...</span><span class="token punctuation">)</span>
			n<span class="token operator">--</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 完整的UTF8序列处理</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"读取文件成功: %s: %d bytes\n"</span><span class="token punctuation">,</span> fileName<span class="token punctuation">,</span> n<span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"显示文件内容: %s\n"</span><span class="token punctuation">,</span> buf<span class="token punctuation">[</span><span class="token punctuation">:</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fileName <span class="token operator">:=</span> <span class="token string">"test.log"</span>

	<span class="token comment">// 写数据</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"------------------ 写入数据 ---------------------"</span><span class="token punctuation">)</span>
	<span class="token function">WriteFile</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span>

	<span class="token comment">// 按字节读数据(会读到乱码)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"\n------------------ 按字节读数据(会读到乱码) ---------------------"</span><span class="token punctuation">)</span>
	<span class="token function">ReadByte</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span>

	<span class="token comment">// 解决方案1：一次性全部读取到内存中</span>
	<span class="token comment">// 缺点：内存占用过大，不适用大文件</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"\n------------------ 解决方案1：一次性全部读取到内存中 ---------------------"</span><span class="token punctuation">)</span>
	<span class="token function">ReadAllByte</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span>

	<span class="token comment">// 解决方案2：按Rune读取文件</span>
	<span class="token comment">// 缺点：一个字符一个字符的读，效率太低</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"\n------------------ 解决方案2：按Rune方式读取 ---------------------"</span><span class="token punctuation">)</span>
	<span class="token function">ReadByRune</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span>

	<span class="token comment">// 解决方案3：按字节读取，如果不是完整UTF8序列则回退文件指针，动态微调buf大小</span>
	<span class="token comment">// 缺点：需要通过Seek指针操作</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"\n- 解决方案3：按字节读数据，如果不是完整UTF8序列则回退文件指针，动态微调buf大小 -"</span><span class="token punctuation">)</span>
	<span class="token function">ReadByteBySeek</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span>

	<span class="token comment">// 解决方案4：按字节读取，如果不是完整UTF8序列，那么将字节切片分割，只是用完整的UTF8序列，乱码部分与下一次读取连接起来</span>
	<span class="token comment">// 缺点：代码比较复杂</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"\n------- 解决方案4：字节分割与重组读法（与Read表现一致） ----------"</span><span class="token punctuation">)</span>
	<span class="token function">ReadByteNoSeek</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>------------------ 写入数据 ---------------------
<span class="token number">2022</span>/04/25 <span class="token number">15</span>:56:39 写入文件成功: test.log: <span class="token number">513</span> bytes

------------------ 按字节读数据<span class="token punctuation">(</span>会读到乱码<span class="token punctuation">)</span> ---------------------
<span class="token number">2022</span>/04/25 <span class="token number">15</span>:56:39 读取文件成功: test.log: <span class="token number">512</span> bytes
<span class="token number">2022</span>/04/25 <span class="token number">15</span>:56:39 显示文件内容: 中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中��
<span class="token number">2022</span>/04/25 <span class="token number">15</span>:56:39 检测字节切片是否是完整且合法的UTF-8编码序列: <span class="token boolean">false</span>
<span class="token number">2022</span>/04/25 <span class="token number">15</span>:56:39 读取文件成功: test.log: <span class="token number">1</span> bytes
<span class="token number">2022</span>/04/25 <span class="token number">15</span>:56:39 显示文件内容: �
<span class="token number">2022</span>/04/25 <span class="token number">15</span>:56:39 检测字节切片是否是完整且合法的UTF-8编码序列: <span class="token boolean">false</span>

------------------ 解决方案1：一次性全部读取到内存中 ---------------------      
<span class="token number">2022</span>/04/25 <span class="token number">15</span>:56:39 读取文件成功: test.log: <span class="token number">513</span> bytes
<span class="token number">2022</span>/04/25 <span class="token number">15</span>:56:39 显示文件内容: 中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中国

------------------ 解决方案2：按Rune方式读取 ---------------------
<span class="token number">2022</span>/04/25 <span class="token number">15</span>:56:39 显示文件内容: 中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中国

- 解决方案3：按字节读数据，如果不是完整UTF8序列则回退文件指针，动态微调buf大小 -
<span class="token number">2022</span>/04/25 <span class="token number">15</span>:56:39 读取文件成功: test.log: <span class="token number">513</span> bytes
<span class="token number">2022</span>/04/25 <span class="token number">15</span>:56:39 显示文件内容: 中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中国

------- 解决方案4：字节分割与重组读法（与Read表现一致） ----------
<span class="token number">2022</span>/04/25 <span class="token number">15</span>:56:39 读取文件成功: test.log: <span class="token number">510</span> bytes
<span class="token number">2022</span>/04/25 <span class="token number">15</span>:56:39 显示文件内容: 中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中
<span class="token number">2022</span>/04/25 <span class="token number">15</span>:56:39 读取文件成功: test.log: <span class="token number">3</span> bytes
<span class="token number">2022</span>/04/25 <span class="token number">15</span>:56:39 显示文件内容: 国
</code></pre></div><h4 id="读写快捷函数" tabindex="-1"><a class="header-anchor" href="#读写快捷函数" aria-hidden="true">#</a> 读写快捷函数</h4>
<p><code v-pre>os.WriteFile</code>和<code v-pre>os.ReadFile</code>底层调用的是<code v-pre>OpenFile</code>，一次性加载数据到内存中，适合读取小文件，大文件有撑爆内存的风险</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"log"</span>
	<span class="token string">"os"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 写入文件</span>
	writeFileName <span class="token operator">:=</span> <span class="token string">"test.log"</span>
	err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">WriteFile</span><span class="token punctuation">(</span>writeFileName<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">"Hello, 这里是测试日志"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> os<span class="token punctuation">.</span>ModePerm<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"写入文件失败: %s\n"</span><span class="token punctuation">,</span> writeFileName<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"写入文件成功: %s\n"</span><span class="token punctuation">,</span> writeFileName<span class="token punctuation">)</span>

	<span class="token comment">// 函数源码如下：</span>
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
	<span class="token comment">// 可以看到，(1)读写模式打开文件 (2)文件若不存在会自动创建 (3)文件若存在则会截断(清空内容)，所以使用这个函数前需要小心一些</span>

	<span class="token comment">// 读取文件</span>
	readFileName <span class="token operator">:=</span> <span class="token string">"D:\\iso\\CentOS-7-x86_64-DVD-1708.iso"</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"开始读取文件: %s\n"</span><span class="token punctuation">,</span> readFileName<span class="token punctuation">)</span>
	buf<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">ReadFile</span><span class="token punctuation">(</span>readFileName<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"读取文件失败: %s: %s\n"</span><span class="token punctuation">,</span> readFileName<span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"读取文件成功: %s: %d bytes\n"</span><span class="token punctuation">,</span> readFileName<span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token comment">// 查看源码可以看到，</span>
	<span class="token comment">//		(1)使用Open打开文件</span>
	<span class="token comment">//		(2)当文件大小(int64类型)能正常转为int类型时，buf就取这个值；否则buf设置为512</span>
	<span class="token comment">//		   int最大值转为GB是多少呢？ math.MaxInt / 1024 / 1024 / 1024 = 8589934591</span>
	<span class="token comment">//		   当文件小于8589934591GB时，都是一次性读入内存中</span>
	<span class="token comment">// 		   所以使用这个函数，就等同于将文件一次性读入内存，请确保内存充足..</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token number">2022</span>/04/24 <span class="token number">14</span>:30:58 写入文件成功: test.log
<span class="token number">2022</span>/04/24 <span class="token number">14</span>:30:58 开始读取文件: D:<span class="token punctuation">\</span>iso<span class="token punctuation">\</span>CentOS-7-x86_64-DVD-1708.iso
<span class="token number">2022</span>/04/24 <span class="token number">14</span>:31:00 读取文件成功: D:<span class="token punctuation">\</span>iso<span class="token punctuation">\</span>CentOS-7-x86_64-DVD-1708.iso: <span class="token number">4521459712</span> bytes

<span class="token comment"># 可以看到，4个多G的文件2秒钟读完了</span>
</code></pre></div><h3 id="io包-io基本接口定义" tabindex="-1"><a class="header-anchor" href="#io包-io基本接口定义" aria-hidden="true">#</a> <code v-pre>io</code>包：IO基本接口定义</h3>
<p>官方文档：<a href="https://pkg.go.dev/io" target="_blank" rel="noopener noreferrer">https://pkg.go.dev/io<ExternalLinkIcon/></a></p>
<h4 id="reader基本接口" tabindex="-1"><a class="header-anchor" href="#reader基本接口" aria-hidden="true">#</a> Reader基本接口</h4>
<p><strong>Reader定义</strong></p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token comment">// io.Reader</span>
<span class="token keyword">type</span> Reader <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Read</span><span class="token punctuation">(</span>p <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote>
<p>根据接口定义得到的信息：读取数据并填充到<code v-pre>p</code>中，最多填充<code v-pre>len(p)</code>个字节；返回实际读取到的字节数<code v-pre>n</code>和<code v-pre>error</code></p>
</blockquote>
<p><strong>Reader读取规则</strong></p>
<p>（1）读取成功，数据全部填充至<code v-pre>p</code>，此时有<code v-pre> n == len(p)</code>、<code v-pre>err == nil</code></p>
<p>（2）读取失败，此时有<code v-pre>err != nil</code>，<code v-pre>err</code>代表具体的错误</p>
<p>（3）读到<code v-pre>EOF</code>，此时支持以下两种处理情况：</p>
<p>​		① 返回实际读取的字节数n，将<code v-pre>err</code>设置为<code v-pre>EOF</code>（推荐）</p>
<p>​		② 返回实际读取的字节数n，将<code v-pre>err</code>设置为<code v-pre>nil</code>，对于这种情况，在下一次读取时需要返回<code v-pre>n == 0, err == nil</code>（不推荐）</p>
<p>（4）<span style="color: blue; font-weight: bold;">允许数据没全部准备好时，返回部分数据，此时有<code v-pre>p</code>尚未填充满，同时<code v-pre>err == nil</code></span>（这种情况要小心，可能写代码会出现一些坑）</p>
<p><strong>Reader接口的几种实现</strong></p>
<table>
<thead>
<tr>
<th>结构体/接口</th>
<th>具体实现</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>从文件中读：<br /><code v-pre>os.File</code>结构体</td>
<td><code v-pre>os.OpenFile()</code></td>
<td>文件读取</td>
</tr>
<tr>
<td></td>
<td><code v-pre>os.Stdin</code>/<code v-pre>os.Stdout</code>/<code v-pre>os.Stderr</code></td>
<td>主要为标准输入读取<code v-pre>Stdin</code></td>
</tr>
<tr>
<td>从字符串中读：<br /><code v-pre>strings.Reader</code>结构体</td>
<td><code v-pre>strings.NewReader()</code></td>
<td><code v-pre>Reader</code>接口：本质是调用内置函数<code v-pre>copy</code>，无法读取中文<br /><code v-pre>RuneReader</code>接口：本质是按字节遍历，如果字节在ASCII码范围内<br />则使用<code v-pre>rune</code>包装一下返回，否则调用<code v-pre>utf8.DecodeRuneInString</code>解码出第一个<code v-pre>Rune</code>并返回</td>
</tr>
<tr>
<td>从字节中读：<br /><code v-pre>bytes.Reader</code>结构体</td>
<td><code v-pre>bytes.NewReader()</code></td>
<td>类似于<code v-pre>strings.Reader</code>结构体</td>
</tr>
<tr>
<td>从缓冲中读：<br /><code v-pre>bytes.Buffer</code>结构体<br /><code v-pre>bufio.Reader</code>结构体</td>
<td>详细介绍见后面章节</td>
<td>详细介绍见后面章节</td>
</tr>
<tr>
<td>从网络连接中读：<br /><code v-pre>net.Conn</code>接口</td>
<td>以后补充</td>
<td>以后补充</td>
</tr>
</tbody>
</table>
<p>示例代码</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"os"</span>
	<span class="token string">"strings"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">ReadFromStdin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">1024</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		<span class="token comment">// 读取输入</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%s 请输入名字："</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Format</span><span class="token punctuation">(</span><span class="token string">"2006/01/02 15:04:05"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		n<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span>Stdin<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 解析输入</span>
		name <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">TrimSpace</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span>buf<span class="token punctuation">[</span><span class="token punctuation">:</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

		<span class="token comment">// 判断输入是否合法</span>
		<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"您的名字为: %s"</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">ReadFromStringReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	reader <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span><span class="token string">"hello world!"</span><span class="token punctuation">)</span>
	buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">1024</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		n<span class="token punctuation">,</span> err <span class="token operator">:=</span> reader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span>
		<span class="token keyword">if</span> n <span class="token operator">></span> <span class="token number">0</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%s\n"</span><span class="token punctuation">,</span> buf<span class="token punctuation">[</span><span class="token punctuation">:</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span> err <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">continue</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span> err <span class="token operator">==</span> io<span class="token punctuation">.</span>EOF <span class="token punctuation">{</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"read error"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">ReadRuneFromStringReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	reader <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span><span class="token string">"a你好"</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		r<span class="token punctuation">,</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> reader<span class="token punctuation">.</span><span class="token function">ReadRune</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> err <span class="token operator">==</span> io<span class="token punctuation">.</span>EOF <span class="token punctuation">{</span>
				<span class="token keyword">break</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
		log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%s"</span><span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">ReadFromStdin</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">ReadFromStringReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">ReadRuneFromStringReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token number">2022</span>/04/24 <span class="token number">16</span>:52:13 请输入名字：愤怒的西瓜
<span class="token number">2022</span>/04/24 <span class="token number">16</span>:52:32 您的名字为: 愤怒的西瓜
<span class="token number">2022</span>/04/24 <span class="token number">16</span>:52:32 hello world<span class="token operator">!</span>
<span class="token number">2022</span>/04/24 <span class="token number">16</span>:52:32 a
<span class="token number">2022</span>/04/24 <span class="token number">16</span>:52:32 你
<span class="token number">2022</span>/04/24 <span class="token number">16</span>:52:32 好
</code></pre></div><h4 id="reader其他接口" tabindex="-1"><a class="header-anchor" href="#reader其他接口" aria-hidden="true">#</a> Reader其他接口</h4>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token comment">// 读取一次返回一个字节</span>
<span class="token keyword">type</span> ByteReader <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">ReadByte</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 读取一次返回一个Rune</span>
<span class="token keyword">type</span> RuneReader <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">ReadRune</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>r <span class="token builtin">rune</span><span class="token punctuation">,</span> size <span class="token builtin">int</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 可以从指定位置(字节)处读取</span>
<span class="token keyword">type</span> ReaderAt <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">ReadAt</span><span class="token punctuation">(</span>p <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> off <span class="token builtin">int64</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="reader封装函数" tabindex="-1"><a class="header-anchor" href="#reader封装函数" aria-hidden="true">#</a> Reader封装函数</h4>
<table>
<thead>
<tr>
<th>函数</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>func ReadAll(r Reader) ([]byte, error)</code></td>
<td>从<code v-pre>Reader</code>中读完所有数据再返回，当文件过大时有撑爆内存的风险</td>
</tr>
<tr>
<td><code v-pre>func ReadFull(r Reader, buf []byte) (n int, err error)</code></td>
<td>读满缓冲区再返回，未读满缓冲区（即使读到<code v-pre>EOF</code>）也会返回错误</td>
</tr>
<tr>
<td><code v-pre>func ReadAtLeast(r Reader, buf []byte, min int) (n int, err error)</code></td>
<td>最少要读<code v-pre>min</code>个字节，即使读到<code v-pre>EOF</code>也会返回错误</td>
</tr>
<tr>
<td><code v-pre>func LimitReader(r Reader, n int64) Reader</code></td>
<td>返回一个新<code v-pre>Reader</code>，该<code v-pre>Reader</code>最多只能读取<code v-pre>n</code>个字节（偏移为0）</td>
</tr>
<tr>
<td><code v-pre>func NewSectionReader(r ReaderAt, off int64, n int64) *SectionReader</code></td>
<td>返回一个新<code v-pre>Reader</code>，该<code v-pre>Reader</code>最多只能读取<code v-pre>n</code>个字节（偏移为<code v-pre>off</code>）</td>
</tr>
</tbody>
</table>
<h4 id="writer和closer接口" tabindex="-1"><a class="header-anchor" href="#writer和closer接口" aria-hidden="true">#</a> Writer和Closer接口</h4>
<p><strong>接口定义</strong></p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">type</span> Writer <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Write</span><span class="token punctuation">(</span>p <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Closer <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="reader和writer复合函数" tabindex="-1"><a class="header-anchor" href="#reader和writer复合函数" aria-hidden="true">#</a> Reader和Writer复合函数</h4>
<p><strong>io.Copy系列</strong></p>
<p>（1）<code v-pre>func Copy(dst Writer, src Reader) (written int64, err error)</code></p>
<p>主要功能为：从<code v-pre>Reader</code>中读取，并写入到<code v-pre>Writer</code>中，返回写入的字节数和错误</p>
<blockquote>
<p>实现的细节：</p>
<ol>
<li>如果<code v-pre>src</code>实现了<code v-pre>WriteTo</code>接口，那么就调用<code v-pre>src.WriteTo(dst)</code>方法</li>
<li>如果<code v-pre>dst</code>实现了<code v-pre>ReaderFrom</code>接口，那么就调用<code v-pre>dst.ReadFrom(src)</code>方法</li>
<li>如果以上两个接口都没实现，那么就从<code v-pre>src</code>读取数据到缓冲区再写入<code v-pre>Writer</code></li>
<li>如果<code v-pre>src</code>是<code v-pre>*LimitedReader</code>结构体，那么<code v-pre>buffer</code>大小设定为规定的大小，否则设置为<code v-pre>32KB</code></li>
</ol>
</blockquote>
<p>（2）<code v-pre>func CopyBuffer(dst Writer, src Reader, buf []byte) (written int64, err error)</code></p>
<p>与<code v-pre>io.Copy</code>不同的地方在于可以自定义<code v-pre>buffer</code>大小的<code v-pre>Copy</code>，但是请注意只有在<code v-pre>src.WriteTo</code>和<code v-pre>dst.ReadFrom</code>都没有实现的情况下生效</p>
<p>（3）<code v-pre>func CopyN(dst Writer, src Reader, n int64) (written int64, err error)</code></p>
<p>只拷贝N个字节，本质上是通过<code v-pre>LimitReader</code>来限制<code v-pre>Reader</code>所能读取的字节数</p>
<p><strong>io.Pipe</strong></p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Pipe</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>PipeReader<span class="token punctuation">,</span> <span class="token operator">*</span>PipeWriter<span class="token punctuation">)</span>
</code></pre></div><ul>
<li>
<p>从w中写入，从r中读出</p>
</li>
<li>
<p>线程安全</p>
</li>
<li>
<p>本质上是无缓冲的<code v-pre>channel</code>，所以不能在同一个协程中读和写</p>
</li>
</ul>
<h3 id="bufio包-带缓冲的io包" tabindex="-1"><a class="header-anchor" href="#bufio包-带缓冲的io包" aria-hidden="true">#</a> bufio包：带缓冲的IO包</h3>
<p>官方文档：<a href="https://pkg.go.dev/bufio" target="_blank" rel="noopener noreferrer">https://pkg.go.dev/bufio<ExternalLinkIcon/></a></p>
<h4 id="缓冲原理" tabindex="-1"><a class="header-anchor" href="#缓冲原理" aria-hidden="true">#</a> 缓冲原理</h4>
<p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/bufio.png" alt="bufio"></p>
<p>本质上来讲，就是通过减少系统调用来提高效率，付出的代价就是内存占用变多</p>
<h4 id="构造函数" tabindex="-1"><a class="header-anchor" href="#构造函数" aria-hidden="true">#</a> 构造函数</h4>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">NewReader</span><span class="token punctuation">(</span>rd io<span class="token punctuation">.</span>Reader<span class="token punctuation">)</span> <span class="token operator">*</span>Reader <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token function">NewReaderSize</span><span class="token punctuation">(</span>rd<span class="token punctuation">,</span> defaultBufSize<span class="token punctuation">)</span>	
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewWriter</span><span class="token punctuation">(</span>w io<span class="token punctuation">.</span>Writer<span class="token punctuation">)</span> <span class="token operator">*</span>Writer <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token function">NewWriterSize</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> defaultBufSize<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 默认的缓冲区大小defaultBufSize = 4096</span>
</code></pre></div><h4 id="使用示例" tabindex="-1"><a class="header-anchor" href="#使用示例" aria-hidden="true">#</a> 使用示例</h4>
<details class="custom-container details"><summary>Reader使用示例</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"bufio"</span>
	<span class="token string">"log"</span>
	<span class="token string">"strings"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 生成原始Reader</span>
	<span class="token keyword">var</span> str <span class="token builtin">string</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">170</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		str <span class="token operator">+=</span> <span class="token string">"中"</span>
	<span class="token punctuation">}</span>
	r <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"原始Reader可读取数据大小: %d\n"</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// 带缓冲的Reader</span>
	<span class="token comment">//reader := bufio.NewReader(f)	// 使用默认缓冲大小</span>
	reader <span class="token operator">:=</span> bufio<span class="token punctuation">.</span><span class="token function">NewReaderSize</span><span class="token punctuation">(</span>r<span class="token punctuation">,</span> <span class="token number">1024</span><span class="token punctuation">)</span> <span class="token comment">// 自定义缓冲大小</span>

	<span class="token comment">// 读取数据</span>
	buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
	n<span class="token punctuation">,</span> err <span class="token operator">:=</span> reader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"Read error: %s\n"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Read %d bytes\n"</span><span class="token punctuation">,</span> n<span class="token punctuation">)</span>

	<span class="token comment">// 查看缓冲区信息</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"缓冲区大小: %d bytes\n"</span><span class="token punctuation">,</span> reader<span class="token punctuation">.</span><span class="token function">Size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"当前缓冲区剩余的可读字节数: %d bytes\n"</span><span class="token punctuation">,</span> reader<span class="token punctuation">.</span><span class="token function">Buffered</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<details class="custom-container details"><summary>Writer使用示例</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"bufio"</span>
	<span class="token string">"log"</span>
	<span class="token string">"os"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 带缓冲的Writer</span>
	<span class="token comment">//writer := bufio.NewWriter(os.Stdout)</span>
	writer <span class="token operator">:=</span> bufio<span class="token punctuation">.</span><span class="token function">NewWriterSize</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">)</span>

	<span class="token comment">// 写入数据，本次总共写入13个字节数据</span>
	<span class="token comment">// 若缓冲区大于等于13则写入到缓冲区，屏幕上也不会输出任何信息，因为缓冲区还并没有向真正的io.Writer中写入</span>
	<span class="token comment">// 若缓冲区小于13则不写缓冲区直接写到原始的io.Writer中去</span>
	n<span class="token punctuation">,</span> err <span class="token operator">:=</span> writer<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">"hello world!\n"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"Write error: %s\n"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Write ok: %d bytes\n"</span><span class="token punctuation">,</span> n<span class="token punctuation">)</span>

	<span class="token comment">// 缓冲区信息</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"缓冲区大小: %d\n"</span><span class="token punctuation">,</span> writer<span class="token punctuation">.</span><span class="token function">Size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token comment">//_ = writer.Flush()   // 将缓冲区数据写入到io.Writer中</span>
	<span class="token comment">//writer.Reset(writer) // 清空缓冲区, 未写入的则丢弃</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"当前缓冲区已写入的字节数: %d\n"</span><span class="token punctuation">,</span> writer<span class="token punctuation">.</span><span class="token function">Buffered</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"当前缓冲区未使用的字节数: %d\n"</span><span class="token punctuation">,</span> writer<span class="token punctuation">.</span><span class="token function">Available</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token comment">//b := writer.AvailableBuffer() // 返回未使用字节组成的切片, 等同于b := make([]byte, writer.Available())</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h4 id="读写测试" tabindex="-1"><a class="header-anchor" href="#读写测试" aria-hidden="true">#</a> 读写测试</h4>
<p><strong>写测试</strong></p>
<details class="custom-container details"><summary>写缓冲性能测试</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"bufio"</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"os"</span>
	<span class="token string">"sync"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">WriteBufTest</span><span class="token punctuation">(</span>srcFileName<span class="token punctuation">,</span> dstFileName <span class="token builtin">string</span><span class="token punctuation">,</span> buffer <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 定义变量</span>
	<span class="token keyword">var</span> <span class="token punctuation">(</span>
		total <span class="token builtin">int64</span>
		err   <span class="token builtin">error</span>
	<span class="token punctuation">)</span>
	start <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Unix</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 打开src文件</span>
	reader<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>srcFileName<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"打开文件失败: %s: %s\n"</span><span class="token punctuation">,</span> srcFileName<span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> reader<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 打开dst文件</span>
	writer<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">OpenFile</span><span class="token punctuation">(</span>dstFileName<span class="token punctuation">,</span> os<span class="token punctuation">.</span>O_RDWR<span class="token operator">|</span>os<span class="token punctuation">.</span>O_CREATE<span class="token operator">|</span>os<span class="token punctuation">.</span>O_TRUNC<span class="token punctuation">,</span> os<span class="token punctuation">.</span>ModePerm<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"打开文件失败: %s: %s\n"</span><span class="token punctuation">,</span> dstFileName<span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> writer<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 是否使用buffer</span>
	<span class="token keyword">if</span> buffer <span class="token punctuation">{</span>
		<span class="token comment">// 生成buffer并写入</span>
		w <span class="token operator">:=</span> bufio<span class="token punctuation">.</span><span class="token function">NewWriterSize</span><span class="token punctuation">(</span>writer<span class="token punctuation">,</span> <span class="token number">1024</span><span class="token operator">*</span><span class="token number">32</span><span class="token punctuation">)</span>

		<span class="token comment">// 使用io.Copy写入</span>
		<span class="token comment">//total, err = io.Copy(w, reader)</span>

		<span class="token comment">// 手动读取写入</span>
		buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">1024</span><span class="token punctuation">)</span>
		<span class="token keyword">for</span> <span class="token punctuation">{</span>
			n<span class="token punctuation">,</span> err <span class="token operator">:=</span> reader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				<span class="token keyword">if</span> err <span class="token operator">==</span> io<span class="token punctuation">.</span>EOF <span class="token punctuation">{</span>
					<span class="token keyword">break</span>
				<span class="token punctuation">}</span>
				log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"read error: %s\n"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>

			<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> w<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>buf<span class="token punctuation">[</span><span class="token punctuation">:</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"write error: %s\n"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			total <span class="token operator">+=</span> <span class="token function">int64</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		<span class="token comment">// 使用io.Copy写入</span>
		<span class="token comment">//total, err = io.Copy(writer, reader)</span>

		<span class="token comment">// 手动读取写入</span>
		buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">1024</span><span class="token punctuation">)</span>
		<span class="token keyword">for</span> <span class="token punctuation">{</span>
			n<span class="token punctuation">,</span> err <span class="token operator">:=</span> reader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				<span class="token keyword">if</span> err <span class="token operator">==</span> io<span class="token punctuation">.</span>EOF <span class="token punctuation">{</span>
					<span class="token keyword">break</span>
				<span class="token punctuation">}</span>
				log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"read error: %s\n"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> writer<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>buf<span class="token punctuation">[</span><span class="token punctuation">:</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"write error: %s\n"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			total <span class="token operator">+=</span> <span class="token function">int64</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"拷贝文件失败: %s\n"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	delta <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Unix</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> start
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"It takes %d seconds to copy %d bytes for %s\n"</span><span class="token punctuation">,</span> delta<span class="token punctuation">,</span> total<span class="token punctuation">,</span> dstFileName<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup
	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">WriteBufTest</span><span class="token punctuation">(</span><span class="token string">"D:\\iso\\CentOS-7-x86_64-DVD-1708.iso"</span><span class="token punctuation">,</span> <span class="token string">"D:\\iso\\write_without_buffer.iso"</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
		wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">WriteBufTest</span><span class="token punctuation">(</span><span class="token string">"D:\\iso\\CentOS-7-x86_64-DVD-1708.iso"</span><span class="token punctuation">,</span> <span class="token string">"D:\\iso\\write_with_buffer.iso"</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
		wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token number">2022</span>/04/27 <span class="token number">12</span>:56:39 It takes <span class="token number">23</span> seconds to copy <span class="token number">4521459712</span> bytes <span class="token keyword">for</span> D:<span class="token punctuation">\</span>iso<span class="token punctuation">\</span>write_with_buffer.iso
<span class="token number">2022</span>/04/27 <span class="token number">12</span>:56:50 It takes <span class="token number">34</span> seconds to copy <span class="token number">4521459712</span> bytes <span class="token keyword">for</span> D:<span class="token punctuation">\</span>iso<span class="token punctuation">\</span>write_without_buffer.iso
</code></pre></div><blockquote>
<p>💡 说明：</p>
<p>代码中给出了2种读写方式，<code v-pre>Read</code>/<code v-pre>Write</code>读写方式 和 <code v-pre>io.Copy</code>读写方式</p>
<p>从输出结果来看</p>
<p>（1）使用<code v-pre>Read</code>/<code v-pre>Write</code>读写方式性能有明显提升（1.5倍左右），写缓存起到了很大的作用</p>
<p>（2）但如果使用<code v-pre>io.Copy</code>方式读写文件，会使用<code v-pre>dst.ReadFrom(src)</code>方式读写，对我们这次测试来说并不准，用不用<code v-pre>bufio</code>，两者花费的时间几乎一致</p>
</blockquote>
<p><strong>读测试</strong></p>
<details class="custom-container details"><summary>读缓冲性能测试</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"bufio"</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"os"</span>
	<span class="token string">"sync"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">ReadBufTest</span><span class="token punctuation">(</span>srcFileName <span class="token builtin">string</span><span class="token punctuation">,</span> buffer <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 定义变量</span>
	<span class="token keyword">var</span> <span class="token punctuation">(</span>
		total <span class="token builtin">int64</span>
		err   <span class="token builtin">error</span>
	<span class="token punctuation">)</span>
	start <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">UnixMilli</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 打开src文件</span>
	reader<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>srcFileName<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"打开文件失败: %s: %s\n"</span><span class="token punctuation">,</span> srcFileName<span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> reader<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 是否使用buffer</span>
	<span class="token keyword">if</span> buffer <span class="token punctuation">{</span>
		<span class="token comment">// 生成buffer并写入</span>
		reader <span class="token operator">:=</span> bufio<span class="token punctuation">.</span><span class="token function">NewReaderSize</span><span class="token punctuation">(</span>reader<span class="token punctuation">,</span> <span class="token number">1024</span><span class="token operator">*</span><span class="token number">32</span><span class="token punctuation">)</span>

		<span class="token comment">// 手动读取</span>
		buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">1024</span><span class="token punctuation">)</span>
		<span class="token keyword">for</span> <span class="token punctuation">{</span>
			n<span class="token punctuation">,</span> err <span class="token operator">:=</span> reader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				<span class="token keyword">if</span> err <span class="token operator">==</span> io<span class="token punctuation">.</span>EOF <span class="token punctuation">{</span>
					<span class="token keyword">break</span>
				<span class="token punctuation">}</span>
				log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"read error: %s\n"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			total <span class="token operator">+=</span> <span class="token function">int64</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		<span class="token comment">// 手动读取</span>
		buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">1024</span><span class="token punctuation">)</span>
		<span class="token keyword">for</span> <span class="token punctuation">{</span>
			n<span class="token punctuation">,</span> err <span class="token operator">:=</span> reader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				<span class="token keyword">if</span> err <span class="token operator">==</span> io<span class="token punctuation">.</span>EOF <span class="token punctuation">{</span>
					<span class="token keyword">break</span>
				<span class="token punctuation">}</span>
				log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"read error: %s\n"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			total <span class="token operator">+=</span> <span class="token function">int64</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	delta <span class="token operator">:=</span> <span class="token function">float64</span><span class="token punctuation">(</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">UnixMilli</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> start<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">1000</span>
	log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Read %d bytes in %.2f second: %s\n"</span><span class="token punctuation">,</span> total<span class="token punctuation">,</span> delta<span class="token punctuation">,</span> srcFileName<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup
	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">ReadBufTest</span><span class="token punctuation">(</span><span class="token string">"D:\\iso\\CentOS-7-x86_64-DVD-1708.iso"</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
		wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">ReadBufTest</span><span class="token punctuation">(</span><span class="token string">"D:\\iso\\CentOS-7-x86_64-DVD-1708.iso"</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
		wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token number">2022</span>/04/27 <span class="token number">13</span>:20:28 Read <span class="token number">4521459712</span> bytes <span class="token keyword">in</span> <span class="token number">1.15</span> second: D:<span class="token punctuation">\</span>iso<span class="token punctuation">\</span>CentOS-7-x86_64-DVD-1708.iso
<span class="token number">2022</span>/04/27 <span class="token number">13</span>:20:34 Read <span class="token number">4521459712</span> bytes <span class="token keyword">in</span> <span class="token number">7.15</span> second: D:<span class="token punctuation">\</span>iso<span class="token punctuation">\</span>CentOS-7-x86_64-DVD-1708.iso
</code></pre></div><blockquote>
<p>可以看到，读的性能提升是巨大的，6倍左右，如果舍得用内存，性能还可以继续提升</p>
</blockquote>
<h3 id="ioutils包-已被os-io包代替" tabindex="-1"><a class="header-anchor" href="#ioutils包-已被os-io包代替" aria-hidden="true">#</a> ioutils包：已被os/io包代替</h3>
<p>官方文档：<a href="https://pkg.go.dev/io/ioutil" target="_blank" rel="noopener noreferrer">https://pkg.go.dev/io/ioutil<ExternalLinkIcon/></a></p>
<p>从Go 1.16开始，同样的功能现在由包<code v-pre>io</code>包或<code v-pre>os</code>包提供，在新代码中应该优先使用这些实现。有关详细信息，请参阅特定功能文档。</p>
</div></template>
