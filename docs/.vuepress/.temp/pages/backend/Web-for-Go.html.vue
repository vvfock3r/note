<template><div><h2 id="版本介绍" tabindex="-1"><a class="header-anchor" href="#版本介绍" aria-hidden="true">#</a> 版本介绍</h2>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># Go版本</span>
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token operator">></span>go version
go version go1.18 windows/amd64
</code></pre></div><h2 id="net-http之client" tabindex="-1"><a class="header-anchor" href="#net-http之client" aria-hidden="true">#</a> net/http之Client</h2>
<p>官方文档：<a href="https://pkg.go.dev/net/http" target="_blank" rel="noopener noreferrer">https://pkg.go.dev/net/http<ExternalLinkIcon/></a></p>
<h3 id="基础示例" tabindex="-1"><a class="header-anchor" href="#基础示例" aria-hidden="true">#</a> 基础示例</h3>
<p>一个最基础的示例</p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
	<span class="token string">"os"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 发送GET请求</span>
	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">"https://www.baidu.com"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 关闭连接</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> err <span class="token operator">=</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 输出到控制台</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token operator">&lt;</span>html<span class="token operator">></span>
<span class="token operator">&lt;</span>head<span class="token operator">></span>
        <span class="token operator">&lt;</span>script<span class="token operator">></span>
                location.replace<span class="token punctuation">(</span>location.href.replace<span class="token punctuation">(</span><span class="token string">"https://"</span>,<span class="token string">"http://"</span><span class="token punctuation">))</span><span class="token punctuation">;</span>
        <span class="token operator">&lt;</span>/script<span class="token operator">></span>
<span class="token operator">&lt;</span>/head<span class="token operator">></span>
<span class="token operator">&lt;</span>body<span class="token operator">></span>
        <span class="token operator">&lt;</span>noscript<span class="token operator">></span><span class="token operator">&lt;</span>meta http-equiv<span class="token operator">=</span><span class="token string">"refresh"</span> <span class="token assign-left variable">content</span><span class="token operator">=</span><span class="token string">"0;url=http://www.baidu.com/"</span><span class="token operator">></span><span class="token operator">&lt;</span>/noscript<span class="token operator">></span>
<span class="token operator">&lt;</span>/body<span class="token operator">></span>
<span class="token operator">&lt;</span>/html<span class="token operator">></span>
</code></pre></div><blockquote>
<p>这里的输出结果好像不太对，而且与curl或者其他语言发送HTTP请求的结果也不一致，这个问题可以通过修改请求头中的<code v-pre>User-Agent</code>来解决</p>
</blockquote>
<details class="custom-container details"><summary>进一步探索</summary>
<p>（1）查看<code v-pre>http.Get</code>源码发现会调用<code v-pre>DefaultClient.Get</code>，其定义如下</p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token comment">// http.Get定义</span>
<span class="token keyword">func</span> <span class="token function">Get</span><span class="token punctuation">(</span>url <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>resp <span class="token operator">*</span>Response<span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> DefaultClient<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// DefaultClient定义</span>
<span class="token keyword">var</span> DefaultClient <span class="token operator">=</span> <span class="token operator">&amp;</span>Client<span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment">// Client结构体定义</span>
<span class="token keyword">type</span> Client <span class="token keyword">struct</span> <span class="token punctuation">{</span>	
	Transport RoundTripper
	CheckRedirect <span class="token keyword">func</span><span class="token punctuation">(</span>req <span class="token operator">*</span>Request<span class="token punctuation">,</span> via <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>Request<span class="token punctuation">)</span> <span class="token builtin">error</span>
	Jar CookieJar
	Timeout time<span class="token punctuation">.</span>Duration
<span class="token punctuation">}</span>
</code></pre></div><p>（2）所以可以改写一下我们的代码</p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
	<span class="token string">"os"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 实例化Client</span>
	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span><span class="token punctuation">}</span>

	<span class="token comment">// 发送GET请求</span>
	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">"https://www.baidu.com"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 关闭连接</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> err <span class="token operator">=</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 输出到控制台</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>（3）查看<code v-pre>Client.Get</code>方法</p>
<ul>
<li>使用<code v-pre>NewRequest</code>来生成<code v-pre>Request</code>对象</li>
<li>使用<code v-pre>Client.Do(request)</code>来发出请求</li>
</ul>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token comment">// To make a request with custom headers, use NewRequest and Client.Do.	</span>
<span class="token comment">// To make a request with a specified context.Context, use NewRequestWithContext and Client.Do.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Client<span class="token punctuation">)</span> <span class="token function">Get</span><span class="token punctuation">(</span>url <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>resp <span class="token operator">*</span>Response<span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	req<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">NewRequest</span><span class="token punctuation">(</span><span class="token string">"GET"</span><span class="token punctuation">,</span> url<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> c<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>（4）所以可以再次改写一下我们的代码</p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
	<span class="token string">"os"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 实例化Client</span>
	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span><span class="token punctuation">}</span>

	<span class="token comment">// 发送GET请求</span>
	<span class="token comment">//resp, err := client.Get("https://www.baidu.com")</span>
	req<span class="token punctuation">,</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewRequest</span><span class="token punctuation">(</span><span class="token string">"GET"</span><span class="token punctuation">,</span> <span class="token string">"https://www.baidu.com"</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>

	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 关闭连接</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> err <span class="token operator">=</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 输出到控制台</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>（5）查看<code v-pre>http.NewRequest</code>源码，本质上是调用<code v-pre>NewRequestWithContext</code></p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token comment">// NewRequest wraps NewRequestWithContext using context.Background.</span>
<span class="token keyword">func</span> <span class="token function">NewRequest</span><span class="token punctuation">(</span>method<span class="token punctuation">,</span> url <span class="token builtin">string</span><span class="token punctuation">,</span> body io<span class="token punctuation">.</span>Reader<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>Request<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> <span class="token function">NewRequestWithContext</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> method<span class="token punctuation">,</span> url<span class="token punctuation">,</span> body<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h3 id="修改请求头" tabindex="-1"><a class="header-anchor" href="#修改请求头" aria-hidden="true">#</a> 修改请求头</h3>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
	<span class="token string">"os"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">RunServer</span><span class="token punctuation">(</span>addr <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>writer http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> request <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// ----------------- 查看请求头 -----------------</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"请求头: "</span><span class="token punctuation">)</span>
		<span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> request<span class="token punctuation">.</span>Header <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%-15s: %#v\n"</span><span class="token punctuation">,</span> k<span class="token punctuation">,</span> v<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// ---------------------------------------------</span>
		<span class="token boolean">_</span><span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">=</span> fmt<span class="token punctuation">.</span><span class="token function">Fprintf</span><span class="token punctuation">(</span>writer<span class="token punctuation">,</span> <span class="token string">"hello world!"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span>addr<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">SendRequest</span><span class="token punctuation">(</span>ServerURL <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 实例化Client</span>
	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span><span class="token punctuation">}</span>

	<span class="token comment">// 生成Request对象</span>
	req<span class="token punctuation">,</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewRequest</span><span class="token punctuation">(</span><span class="token string">"GET"</span><span class="token punctuation">,</span> ServerURL<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 定制Request对象</span>
	<span class="token comment">//(1) 下面是Go默认带的请求头,在控制台可以看到覆盖了原先的值（注意：分别使用Add和Set来进行测试）</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">"Accept-Encoding"</span><span class="token punctuation">,</span> <span class="token string">"compress"</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"User-Agent"</span><span class="token punctuation">,</span> <span class="token string">"Mozilla/5.0 xxx Chrome/96.0.4664.110 Safari/537.36"</span><span class="token punctuation">)</span>
	<span class="token comment">//(2)下面是使用Add, 可以看到使用的是追加方式，并且不去重</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">"Foo"</span><span class="token punctuation">,</span> <span class="token string">"Bar1"</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">"Foo"</span><span class="token punctuation">,</span> <span class="token string">"Bar1"</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">"Foo"</span><span class="token punctuation">,</span> <span class="token string">"Bar2"</span><span class="token punctuation">)</span>
	<span class="token comment">//(3)下面是使用Set，可以看到是覆盖模式</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"Ping"</span><span class="token punctuation">,</span> <span class="token string">"Pong1"</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"Ping"</span><span class="token punctuation">,</span> <span class="token string">"Pong2"</span><span class="token punctuation">)</span>

	<span class="token comment">// 发送请求</span>
	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 关闭连接</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> err <span class="token operator">=</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 输出到控制台</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 定义变量</span>
	ServerListenAddr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:5000"</span>      <span class="token comment">//	服务端监听地址</span>
	ServerURL <span class="token operator">:=</span> <span class="token string">"http://"</span> <span class="token operator">+</span> ServerListenAddr <span class="token comment">// 客户端访问地址</span>

	<span class="token comment">// 启动服务端</span>
	<span class="token keyword">go</span> <span class="token function">RunServer</span><span class="token punctuation">(</span>ServerListenAddr<span class="token punctuation">)</span>

	<span class="token comment">// 启动客户端</span>
	<span class="token function">SendRequest</span><span class="token punctuation">(</span>ServerURL<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 默认的请求头输出结果</span>
请求头:
User-Agent     <span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>string<span class="token punctuation">{</span><span class="token string">"Go-http-client/1.1"</span><span class="token punctuation">}</span>
Accept-Encoding: <span class="token punctuation">[</span><span class="token punctuation">]</span>string<span class="token punctuation">{</span><span class="token string">"gzip"</span><span class="token punctuation">}</span> 
hello world<span class="token operator">!</span>

<span class="token comment"># 自己定制的请求头输出结果</span>
请求头:
Ping           <span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>string<span class="token punctuation">{</span><span class="token string">"Pong2"</span><span class="token punctuation">}</span>
User-Agent     <span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>string<span class="token punctuation">{</span><span class="token string">"Mozilla/5.0 xxx Chrome/96.0.4664.110 Safari/537.36"</span><span class="token punctuation">}</span>
Accept-Encoding: <span class="token punctuation">[</span><span class="token punctuation">]</span>string<span class="token punctuation">{</span><span class="token string">"compress"</span><span class="token punctuation">}</span>
Foo            <span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>string<span class="token punctuation">{</span><span class="token string">"Bar1"</span>, <span class="token string">"Bar1"</span>, <span class="token string">"Bar2"</span><span class="token punctuation">}</span>
hello world<span class="token operator">!</span>
</code></pre></div><h3 id="client" tabindex="-1"><a class="header-anchor" href="#client" aria-hidden="true">#</a> Client</h3>
<h4 id="基础超时控制" tabindex="-1"><a class="header-anchor" href="#基础超时控制" aria-hidden="true">#</a> 基础超时控制</h4>
<p>默认的<code v-pre>DefaultClient</code>是没有设置超时时间的，我们可以自定义超时时间，包含建立连接、重定向、读取正文等整个请求流程时间</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
	<span class="token string">"os"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">RunServer</span><span class="token punctuation">(</span>addr <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>writer http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> request <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">3</span><span class="token punctuation">)</span>
		<span class="token boolean">_</span><span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">=</span> fmt<span class="token punctuation">.</span><span class="token function">Fprintf</span><span class="token punctuation">(</span>writer<span class="token punctuation">,</span> <span class="token string">"hello world!"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span>addr<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 定义变量</span>
	ServerListenAddr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:5000"</span>      <span class="token comment">//	服务端监听地址</span>
	ServerURL <span class="token operator">:=</span> <span class="token string">"http://"</span> <span class="token operator">+</span> ServerListenAddr <span class="token comment">// 客户端访问地址</span>

	<span class="token comment">// 启动服务端</span>
	<span class="token keyword">go</span> <span class="token function">RunServer</span><span class="token punctuation">(</span>ServerListenAddr<span class="token punctuation">)</span>

	<span class="token comment">// 方式一：使用默认的DefaultClient，它没有定义超时时间，会无限等待下去</span>
	<span class="token comment">//client := http.DefaultClient	// 为了下面的代码统一，这里给DefaultClient重新赋值一个变量，它是一个指针所以可以直接赋值</span>

	<span class="token comment">// 方式二：实例化Client，自定义超时时间</span>
	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span>
		Timeout<span class="token punctuation">:</span> time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">// 设置每次发送请求超时时间，包含建立连接、重定向、读取正文等整个请求流程时间</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 发送GET请求</span>
	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span>ServerURL<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span><span class="token string">"请求超时: "</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 关闭连接</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> err <span class="token operator">=</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 输出到控制台</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 超时输出结果</span>
<span class="token number">2022</span>/04/28 09:12:26 请求超时: Get <span class="token string">"http://127.0.0.1:5000"</span><span class="token builtin class-name">:</span> context deadline exceeded <span class="token punctuation">(</span>Client.Timeout exceeded <span class="token keyword">while</span> awaiting headers<span class="token punctuation">)</span>

<span class="token comment"># 未超时输出结果</span>
hello world<span class="token operator">!</span>
</code></pre></div><h4 id="更精细的超时控制" tabindex="-1"><a class="header-anchor" href="#更精细的超时控制" aria-hidden="true">#</a> 更精细的超时控制</h4>
<p>DefaultTransport介绍</p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">type</span> Client <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token comment">// Transport specifies the mechanism by which individual</span>
	<span class="token comment">// HTTP requests are made.</span>
	<span class="token comment">// If nil, DefaultTransport is used.	// 这里可以看到默认使用 DefaultTransport</span>
	Transport RoundTripper		
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre></div><p>DefaultTransport源码</p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token comment">// Transport结构体提供了很多的选项，下面每一个选项都可以在那里找到帮助信息</span>
<span class="token keyword">var</span> DefaultTransport RoundTripper <span class="token operator">=</span> <span class="token operator">&amp;</span>Transport<span class="token punctuation">{</span>
	Proxy<span class="token punctuation">:</span> ProxyFromEnvironment<span class="token punctuation">,</span>
	DialContext<span class="token punctuation">:</span> <span class="token function">defaultTransportDialContext</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>net<span class="token punctuation">.</span>Dialer<span class="token punctuation">{</span>
		Timeout<span class="token punctuation">:</span>   <span class="token number">30</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">,</span>			<span class="token comment">// TCP握手超时时间，默认永不超时</span>
		KeepAlive<span class="token punctuation">:</span> <span class="token number">30</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">,</span>			<span class="token comment">// TCP探测连接的对端是否存活间隔时间，如果为负值则禁用探针</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
	ForceAttemptHTTP2<span class="token punctuation">:</span>     <span class="token boolean">true</span><span class="token punctuation">,</span>				<span class="token comment">// 当使用自定义的Dial, DialTLS, or DialContext func or TLSClientConfig时，是否开启HTTP/2</span>
    MaxIdleConns<span class="token punctuation">:</span>          <span class="token number">100</span><span class="token punctuation">,</span>					<span class="token comment">// (HTTP长连接)最大空闲连接数，0代表不限制</span>
    IdleConnTimeout<span class="token punctuation">:</span>       <span class="token number">90</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">,</span>	<span class="token comment">// (HTTP长连接)每个连接最长空闲时间，0代表不限制</span>
	TLSHandshakeTimeout<span class="token punctuation">:</span>   <span class="token number">10</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">,</span>	<span class="token comment">// TLS握手超时时间，0代表永不超时</span>
	ExpectContinueTimeout<span class="token punctuation">:</span> <span class="token number">1</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">,</span>		<span class="token comment">// Client在发送包含"Expect: 100-continue"的Header到收到继续发送Body的Response之间的时间</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Transport默认值</p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">type</span> Transport <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    	<span class="token comment">// MaxConnsPerHost optionally limits the total number of</span>
	<span class="token comment">// connections per host, including connections in the dialing,</span>
	<span class="token comment">// active, and idle states. On limit violation, dials will block.</span>
	<span class="token comment">//</span>
	<span class="token comment">// Zero means no limit.</span>
    MaxConnsPerHost <span class="token builtin">int</span>							<span class="token comment">// (对每个远程主机)最大连接数, 0代表不限制</span>
    
	<span class="token comment">// MaxIdleConnsPerHost, if non-zero, controls the maximum idle</span>
	<span class="token comment">// (keep-alive) connections to keep per-host. If zero,</span>
	<span class="token comment">// DefaultMaxIdleConnsPerHost is used.</span>
	MaxIdleConnsPerHost <span class="token builtin">int</span>						<span class="token comment">// (对每个远程主机)的最大空闲连接数，默认使用DefaultMaxIdleConnsPerHost定义的值   </span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> DefaultMaxIdleConnsPerHost <span class="token operator">=</span> <span class="token number">2</span>			<span class="token comment">// 默认为2，这意味着空闲连接中的100个连接只有两个连接分配给该主机；这个值比较小，可以改大一些</span>
</code></pre></div><h4 id="连接复用测试" tabindex="-1"><a class="header-anchor" href="#连接复用测试" aria-hidden="true">#</a> 连接复用测试</h4>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"context"</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
	<span class="token string">"net/http/httptrace"</span>
	<span class="token string">"os"</span>
	<span class="token string">"strconv"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">RunServer</span><span class="token punctuation">(</span>addr <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>writer http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> request <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">3</span><span class="token punctuation">)</span>
		msg <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Format</span><span class="token punctuation">(</span><span class="token string">"2006/01/02 15:04:05"</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">" HTTP Server Response: hello world!\n"</span>
		<span class="token boolean">_</span><span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Fprintf</span><span class="token punctuation">(</span>writer<span class="token punctuation">,</span> msg<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span>addr<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>http<span class="token punctuation">.</span>Client <span class="token punctuation">{</span>
	<span class="token comment">// 实例化Transport</span>
	t <span class="token operator">:=</span> http<span class="token punctuation">.</span>DefaultTransport<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>http<span class="token punctuation">.</span>Transport<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	t<span class="token punctuation">.</span>MaxIdleConnsPerHost <span class="token operator">=</span> <span class="token number">3</span> <span class="token comment">// 设置每个主机最大空闲连接数</span>

	<span class="token comment">// 实例化客户端</span>
	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span>
		Timeout<span class="token punctuation">:</span>   time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token comment">// 设置每次发送请求超时时间，包含建立连接、重定向、读取正文等整个请求流程时间</span>
		Transport<span class="token punctuation">:</span> t<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> client
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">SendRequest</span><span class="token punctuation">(</span>client <span class="token operator">*</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">,</span> url <span class="token builtin">string</span><span class="token punctuation">,</span> number <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// ------------------- 这里是核心代码 ----------------------</span>
	<span class="token comment">// 生成client trace</span>
	clientTrace <span class="token operator">:=</span> <span class="token operator">&amp;</span>httptrace<span class="token punctuation">.</span>ClientTrace<span class="token punctuation">{</span>
		GotConn<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>GotConnInfo httptrace<span class="token punctuation">.</span>GotConnInfo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			reused <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">FormatBool</span><span class="token punctuation">(</span>GotConnInfo<span class="token punctuation">.</span>Reused<span class="token punctuation">)</span>   <span class="token comment">// 连接复用</span>
			wasidle <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">FormatBool</span><span class="token punctuation">(</span>GotConnInfo<span class="token punctuation">.</span>WasIdle<span class="token punctuation">)</span> <span class="token comment">// 该连接是否来自连接池</span>
			idleTime <span class="token operator">:=</span> GotConnInfo<span class="token punctuation">.</span>IdleTime
			log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"连接复用: %-5s | 来自连接池: %-5s | 该连接已空闲的时间: %-5s\n"</span><span class="token punctuation">,</span> reused<span class="token punctuation">,</span> wasidle<span class="token punctuation">,</span> idleTime<span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	traCtx <span class="token operator">:=</span> httptrace<span class="token punctuation">.</span><span class="token function">WithClientTrace</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> clientTrace<span class="token punctuation">)</span>

	<span class="token comment">// 生成request</span>
	req<span class="token punctuation">,</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewRequestWithContext</span><span class="token punctuation">(</span>traCtx<span class="token punctuation">,</span> http<span class="token punctuation">.</span>MethodGet<span class="token punctuation">,</span> url<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// --------------------------------------------</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> number<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">// 发送GET请求</span>
			resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span><span class="token string">"请求超时: "</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			<span class="token comment">// 关闭连接</span>
			<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token keyword">if</span> err <span class="token operator">=</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
					log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token comment">// 输出到控制台</span>
			<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 定义变量</span>
	ServerListenAddr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:5000"</span>      <span class="token comment">//	服务端监听地址</span>
	ServerURL <span class="token operator">:=</span> <span class="token string">"http://"</span> <span class="token operator">+</span> ServerListenAddr <span class="token comment">// 客户端访问地址</span>

	<span class="token comment">// 启动服务端</span>
	<span class="token keyword">go</span> <span class="token function">RunServer</span><span class="token punctuation">(</span>ServerListenAddr<span class="token punctuation">)</span>

	<span class="token comment">// 实例化Client</span>
	client <span class="token operator">:=</span> <span class="token function">NewClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 启动客户端</span>
	<span class="token keyword">go</span> <span class="token function">SendRequest</span><span class="token punctuation">(</span>client<span class="token punctuation">,</span> ServerURL<span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token comment">// 发送3次请求</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">)</span>          <span class="token comment">// 等待以上请求处理完毕，下次请求会复用上面的请求</span>
	<span class="token keyword">go</span> <span class="token function">SendRequest</span><span class="token punctuation">(</span>client<span class="token punctuation">,</span> ServerURL<span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token comment">// 发送3次请求</span>
	<span class="token keyword">select</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>                            <span class="token comment">// 阻塞</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 刚开始连接池为空，所以都是新创建的连接</span>
<span class="token number">2022</span>/04/28 <span class="token number">12</span>:59:53 连接复用: <span class="token boolean">false</span> <span class="token operator">|</span> 来自连接池: <span class="token boolean">false</span> <span class="token operator">|</span> 该连接已空闲的时间: 0s
<span class="token number">2022</span>/04/28 <span class="token number">12</span>:59:53 连接复用: <span class="token boolean">false</span> <span class="token operator">|</span> 来自连接池: <span class="token boolean">false</span> <span class="token operator">|</span> 该连接已空闲的时间: 0s
<span class="token number">2022</span>/04/28 <span class="token number">12</span>:59:53 连接复用: <span class="token boolean">false</span> <span class="token operator">|</span> 来自连接池: <span class="token boolean">false</span> <span class="token operator">|</span> 该连接已空闲的时间: 0s
<span class="token number">2022</span>/04/28 <span class="token number">12</span>:59:53 连接复用: <span class="token boolean">false</span> <span class="token operator">|</span> 来自连接池: <span class="token boolean">false</span> <span class="token operator">|</span> 该连接已空闲的时间: 0s
<span class="token number">2022</span>/04/28 <span class="token number">12</span>:59:53 连接复用: <span class="token boolean">false</span> <span class="token operator">|</span> 来自连接池: <span class="token boolean">false</span> <span class="token operator">|</span> 该连接已空闲的时间: 0s
<span class="token number">2022</span>/04/28 <span class="token number">12</span>:59:56 HTTP Server Response: hello world<span class="token operator">!</span>
<span class="token number">2022</span>/04/28 <span class="token number">12</span>:59:56 HTTP Server Response: hello world<span class="token operator">!</span>
<span class="token number">2022</span>/04/28 <span class="token number">12</span>:59:56 HTTP Server Response: hello world<span class="token operator">!</span>
<span class="token number">2022</span>/04/28 <span class="token number">12</span>:59:56 HTTP Server Response: hello world<span class="token operator">!</span>
<span class="token number">2022</span>/04/28 <span class="token number">12</span>:59:56 HTTP Server Response: hello world<span class="token operator">!</span>

<span class="token comment"># 再次发送HTTP请求，同一台主机复用到了3个连接，可以通过调整NewClient中MaxIdleConnsPerHost参数来复用同一台主机更多连接</span>
<span class="token number">2022</span>/04/28 <span class="token number">12</span>:59:58 连接复用: <span class="token boolean">true</span>  <span class="token operator">|</span> 来自连接池: <span class="token boolean">true</span>  <span class="token operator">|</span> 该连接已空闲的时间: <span class="token number">1</span>.978283s
<span class="token number">2022</span>/04/28 <span class="token number">12</span>:59:58 连接复用: <span class="token boolean">true</span>  <span class="token operator">|</span> 来自连接池: <span class="token boolean">true</span>  <span class="token operator">|</span> 该连接已空闲的时间: <span class="token number">1</span>.978283s
<span class="token number">2022</span>/04/28 <span class="token number">12</span>:59:58 连接复用: <span class="token boolean">true</span>  <span class="token operator">|</span> 来自连接池: <span class="token boolean">true</span>  <span class="token operator">|</span> 该连接已空闲的时间: <span class="token number">1</span>.978283s
<span class="token number">2022</span>/04/28 <span class="token number">12</span>:59:58 连接复用: <span class="token boolean">false</span> <span class="token operator">|</span> 来自连接池: <span class="token boolean">false</span> <span class="token operator">|</span> 该连接已空闲的时间: 0s       
<span class="token number">2022</span>/04/28 <span class="token number">12</span>:59:58 连接复用: <span class="token boolean">false</span> <span class="token operator">|</span> 来自连接池: <span class="token boolean">false</span> <span class="token operator">|</span> 该连接已空闲的时间: 0s       
<span class="token number">2022</span>/04/28 <span class="token number">13</span>:00:01 HTTP Server Response: hello world<span class="token operator">!</span>
<span class="token number">2022</span>/04/28 <span class="token number">13</span>:00:01 HTTP Server Response: hello world<span class="token operator">!</span>
<span class="token number">2022</span>/04/28 <span class="token number">13</span>:00:01 HTTP Server Response: hello world<span class="token operator">!</span>
<span class="token number">2022</span>/04/28 <span class="token number">13</span>:00:01 HTTP Server Response: hello world<span class="token operator">!</span>
<span class="token number">2022</span>/04/28 <span class="token number">13</span>:00:01 HTTP Server Response: hello world<span class="token operator">!</span>
</code></pre></div><h4 id="设置代理" tabindex="-1"><a class="header-anchor" href="#设置代理" aria-hidden="true">#</a> 设置代理</h4>
<p>先确保不加代理的时候能正常输出当前IP，然后再切换到代理模式，验证代理是否生效</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
	<span class="token string">"net/url"</span>
	<span class="token string">"os"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 实例化Client(不加代理)</span>
	<span class="token comment">//client := &amp;http.Client{}</span>

	<span class="token comment">// 实例化Client(添加代理)</span>
	ProxyScheme <span class="token operator">:=</span> <span class="token string">"http"</span>                    <span class="token comment">// 代理协议</span>
	ProxyHostAndPort <span class="token operator">:=</span> <span class="token string">"192.168.0.102:7890"</span> <span class="token comment">// 代理服务器地址和端口,请注意这里是否需要修改</span>
	t <span class="token operator">:=</span> http<span class="token punctuation">.</span>DefaultTransport<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>http<span class="token punctuation">.</span>Transport<span class="token punctuation">)</span>
	t<span class="token punctuation">.</span>Proxy <span class="token operator">=</span> http<span class="token punctuation">.</span><span class="token function">ProxyURL</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>url<span class="token punctuation">.</span>URL<span class="token punctuation">{</span>Scheme<span class="token punctuation">:</span> ProxyScheme<span class="token punctuation">,</span> Host<span class="token punctuation">:</span> ProxyHostAndPort<span class="token punctuation">}</span><span class="token punctuation">)</span>
	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span>
		Transport<span class="token punctuation">:</span> t<span class="token punctuation">,</span>
		Timeout<span class="token punctuation">:</span>   time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">15</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 生成request对象, https://api.ip.sb/ip能以文本格式输出我们当前的IP,可以用这个网站来检测我们的代理是否生效</span>
	req<span class="token punctuation">,</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewRequest</span><span class="token punctuation">(</span><span class="token string">"GET"</span><span class="token punctuation">,</span> <span class="token string">"https://api.ip.sb/ip"</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 修改User-Agent，不修改的话会报403错误</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"User-Agent"</span><span class="token punctuation">,</span> <span class="token string">"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"</span><span class="token punctuation">)</span>

	<span class="token comment">// 发送请求</span>
	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 关闭连接</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> err <span class="token operator">=</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 输出到控制台</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 未设置代理时输出</span>
<span class="token number">36.143</span>.45.59

<span class="token comment"># 设置代理后输出</span>
<span class="token number">87.249</span>.128.47
</code></pre></div><h4 id="添加basic-auth认证" tabindex="-1"><a class="header-anchor" href="#添加basic-auth认证" aria-hidden="true">#</a> 添加Basic Auth认证</h4>
<ul>
<li>方式一：直接调用<code v-pre>request.SetBasicAuth(&quot;root&quot;, &quot;123456&quot;)</code></li>
<li>方式二：在Transport Proxy中注入<code v-pre>request.SetBasicAuth(&quot;root&quot;, &quot;123456&quot;)</code></li>
</ul>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"encoding/base64"</span>
	<span class="token string">"errors"</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
	<span class="token string">"net/url"</span>
	<span class="token string">"os"</span>
	<span class="token string">"strings"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token comment">// 请求处理函数</span>
<span class="token keyword">func</span> <span class="token function">index</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Fprint</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">"hello world!"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// Base64解密</span>
<span class="token keyword">func</span> <span class="token function">BasicAuthDecodeString</span><span class="token punctuation">(</span>auth <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>plaintext <span class="token builtin">string</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	authSlice <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>auth<span class="token punctuation">,</span> <span class="token string">" "</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>authSlice<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">2</span> <span class="token operator">||</span> authSlice<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token string">"Basic"</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token string">""</span><span class="token punctuation">,</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"Basic auth format error"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	p<span class="token punctuation">,</span> err <span class="token operator">:=</span> base64<span class="token punctuation">.</span>StdEncoding<span class="token punctuation">.</span><span class="token function">DecodeString</span><span class="token punctuation">(</span>authSlice<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token function">string</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">,</span> err
<span class="token punctuation">}</span>

<span class="token comment">// 用户验证</span>
<span class="token keyword">func</span> <span class="token function">BasicAuthVerifyUser</span><span class="token punctuation">(</span>plaintext <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
	users <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"root:123456"</span><span class="token punctuation">,</span> <span class="token string">"admin:654321"</span><span class="token punctuation">}</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> users <span class="token punctuation">{</span>
		<span class="token keyword">if</span> v <span class="token operator">==</span> plaintext <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">true</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>

<span class="token comment">// BasicAuth装饰器</span>
<span class="token keyword">func</span> <span class="token function">BasicAuth</span><span class="token punctuation">(</span>handler http<span class="token punctuation">.</span>Handler<span class="token punctuation">)</span> http<span class="token punctuation">.</span>Handler <span class="token punctuation">{</span>
	<span class="token comment">// 返回一个新的handler</span>
	<span class="token keyword">return</span> http<span class="token punctuation">.</span><span class="token function">HandlerFunc</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 获取Basic Auth认证凭证</span>
		auth <span class="token operator">:=</span> r<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">"Authorization"</span><span class="token punctuation">)</span> <span class="token comment">//获取Basic base64加密后的字段</span>

		<span class="token comment">// 验证失败</span>
		plaintext<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">BasicAuthDecodeString</span><span class="token punctuation">(</span>auth<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			w<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"WWW-Authenticate"</span><span class="token punctuation">,</span> <span class="token string">`Basic realm="`</span><span class="token operator">+</span>err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">`"`</span><span class="token punctuation">)</span>
			w<span class="token punctuation">.</span><span class="token function">WriteHeader</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusUnauthorized<span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 用户名密码验证失败</span>
		<span class="token keyword">if</span> <span class="token operator">!</span><span class="token function">BasicAuthVerifyUser</span><span class="token punctuation">(</span>plaintext<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			w<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"WWW-Authenticate"</span><span class="token punctuation">,</span> <span class="token string">`Basic realm="用户名或密码错误"`</span><span class="token punctuation">)</span>
			w<span class="token punctuation">.</span><span class="token function">WriteHeader</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusUnauthorized<span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 验证通过,调用原始handler方法</span>
		handler<span class="token punctuation">.</span><span class="token function">ServeHTTP</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">RunServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	addr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:80"</span>
	http<span class="token punctuation">.</span><span class="token function">Handle</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token function">BasicAuth</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span><span class="token function">HandlerFunc</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span>addr<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">SendRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 方式二：使用Transport Proxy</span>
	t <span class="token operator">:=</span> http<span class="token punctuation">.</span>DefaultTransport<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>http<span class="token punctuation">.</span>Transport<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	t<span class="token punctuation">.</span>Proxy <span class="token operator">=</span> <span class="token keyword">func</span><span class="token punctuation">(</span>request <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>url<span class="token punctuation">.</span>URL<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		request<span class="token punctuation">.</span><span class="token function">SetBasicAuth</span><span class="token punctuation">(</span><span class="token string">"root"</span><span class="token punctuation">,</span> <span class="token string">"123456"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> request<span class="token punctuation">.</span>URL<span class="token punctuation">,</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 实例化客户端</span>
	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span>
		Timeout<span class="token punctuation">:</span>   time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token comment">// 设置每次发送请求超时时间，包含建立连接、重定向、读取正文等整个请求流程时间</span>
		Transport<span class="token punctuation">:</span> t<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 创建Request对象</span>
	req<span class="token punctuation">,</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewRequest</span><span class="token punctuation">(</span><span class="token string">"GET"</span><span class="token punctuation">,</span> <span class="token string">"http://127.0.0.1"</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 方式一：添加Baisc Auth认证</span>
	<span class="token comment">//req.SetBasicAuth("root", "123456")</span>

	<span class="token comment">// 发送GET请求</span>
	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span><span class="token string">"请求超时: "</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 关闭连接</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> err <span class="token operator">=</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 输出到控制台</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 启动服务端</span>
	<span class="token keyword">go</span> <span class="token function">RunServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 发送请求</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
	<span class="token function">SendRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre></div></details>
<h4 id="重定向策略" tabindex="-1"><a class="header-anchor" href="#重定向策略" aria-hidden="true">#</a> 重定向策略</h4>
<p>通过<code v-pre>Client.Do</code>方法追踪到默认重定向策略函数，即最多允许10次重定向</p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">defaultCheckRedirect</span><span class="token punctuation">(</span>req <span class="token operator">*</span>Request<span class="token punctuation">,</span> via <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>Request<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>via<span class="token punctuation">)</span> <span class="token operator">>=</span> <span class="token number">10</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"stopped after 10 redirects"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre></div><details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
	<span class="token string">"os"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">RunServer</span><span class="token punctuation">(</span>addr <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>writer http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> request <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		writer<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"Location"</span><span class="token punctuation">,</span> <span class="token string">"/demo"</span><span class="token punctuation">)</span>
		writer<span class="token punctuation">.</span><span class="token function">WriteHeader</span><span class="token punctuation">(</span><span class="token number">301</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/demo"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>writer http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> request <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		writer<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"Location"</span><span class="token punctuation">,</span> <span class="token string">"https://www.baidu.com"</span><span class="token punctuation">)</span>
		writer<span class="token punctuation">.</span><span class="token function">WriteHeader</span><span class="token punctuation">(</span><span class="token number">301</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span>addr<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">SendRequest</span><span class="token punctuation">(</span>ServerURL <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 实例化Client</span>
	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span>
		CheckRedirect<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">,</span> via <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
			<span class="token comment">//</span>
			log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"当前请求地址: %q | 当前请求来源地址: %q\n"</span><span class="token punctuation">,</span> req<span class="token punctuation">.</span>URL<span class="token punctuation">,</span> req<span class="token punctuation">.</span><span class="token function">Referer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
			log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"已访问过的地址集合: \n"</span><span class="token punctuation">)</span>
			<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> via <span class="token punctuation">{</span>
				log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"   已访问过的地址: %q | 地址来源: %q\n"</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span>URL<span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">Referer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

			<span class="token keyword">return</span> <span class="token boolean">nil</span> <span class="token comment">// 可以正常重定向</span>
			<span class="token comment">//return http.ErrUseLastResponse // 禁止重定向</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 生成Request对象</span>
	req<span class="token punctuation">,</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewRequest</span><span class="token punctuation">(</span><span class="token string">"GET"</span><span class="token punctuation">,</span> ServerURL<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 发送请求</span>
	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>

	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 关闭连接</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> err <span class="token operator">=</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 输出到控制台</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 定义变量</span>
	ServerListenAddr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:5000"</span>      <span class="token comment">//	服务端监听地址</span>
	ServerURL <span class="token operator">:=</span> <span class="token string">"http://"</span> <span class="token operator">+</span> ServerListenAddr <span class="token comment">// 客户端访问地址</span>

	<span class="token comment">// 启动服务端</span>
	<span class="token keyword">go</span> <span class="token function">RunServer</span><span class="token punctuation">(</span>ServerListenAddr<span class="token punctuation">)</span>

	<span class="token comment">// 启动客户端</span>
	<span class="token function">SendRequest</span><span class="token punctuation">(</span>ServerURL<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 允许重定向策略输出结果</span>
<span class="token comment"># 访问 http://127.0.0.1:5000/ --> 重定向至http://127.0.0.1:5000/demo/ --> 重定向至https://www.baidu.com 输出结果</span>
<span class="token number">2022</span>/04/28 <span class="token number">17</span>:07:02 当前请求地址: <span class="token string">"http://127.0.0.1:5000/demo"</span> <span class="token operator">|</span> 当前请求来源地址: <span class="token string">"http://127.0.0.1:5000"</span>
<span class="token number">2022</span>/04/28 <span class="token number">17</span>:07:02 已访问过的地址集合:
<span class="token number">2022</span>/04/28 <span class="token number">17</span>:07:02    已访问过的地址: <span class="token string">"http://127.0.0.1:5000"</span> <span class="token operator">|</span> 地址来源: <span class="token string">""</span>
<span class="token number">2022</span>/04/28 <span class="token number">17</span>:07:02
<span class="token number">2022</span>/04/28 <span class="token number">17</span>:07:02 当前请求地址: <span class="token string">"https://www.baidu.com"</span> <span class="token operator">|</span> 当前请求来源地址: <span class="token string">"http://127.0.0.1:5000/demo"</span>
<span class="token number">2022</span>/04/28 <span class="token number">17</span>:07:02 已访问过的地址集合:
<span class="token number">2022</span>/04/28 <span class="token number">17</span>:07:02    已访问过的地址: <span class="token string">"http://127.0.0.1:5000"</span> <span class="token operator">|</span> 地址来源: <span class="token string">""</span>
<span class="token number">2022</span>/04/28 <span class="token number">17</span>:07:02    已访问过的地址: <span class="token string">"http://127.0.0.1:5000/demo"</span> <span class="token operator">|</span> 地址来源: <span class="token string">"http://127.0.0.1:5000"</span>
<span class="token number">2022</span>/04/28 <span class="token number">17</span>:07:02
<span class="token operator">&lt;</span>html<span class="token operator">></span>
<span class="token operator">&lt;</span>head<span class="token operator">></span>
        <span class="token operator">&lt;</span>script<span class="token operator">></span>
                location.replace<span class="token punctuation">(</span>location.href.replace<span class="token punctuation">(</span><span class="token string">"https://"</span>,<span class="token string">"http://"</span><span class="token punctuation">))</span><span class="token punctuation">;</span>
        <span class="token operator">&lt;</span>/script<span class="token operator">></span>
<span class="token operator">&lt;</span>/head<span class="token operator">></span>
<span class="token operator">&lt;</span>body<span class="token operator">></span>
        <span class="token operator">&lt;</span>noscript<span class="token operator">></span><span class="token operator">&lt;</span>meta http-equiv<span class="token operator">=</span><span class="token string">"refresh"</span> <span class="token assign-left variable">content</span><span class="token operator">=</span><span class="token string">"0;url=http://www.baidu.com/"</span><span class="token operator">></span><span class="token operator">&lt;</span>/noscript<span class="token operator">></span>
<span class="token operator">&lt;</span>/body<span class="token operator">></span>
<span class="token operator">&lt;</span>/html<span class="token operator">></span>

<span class="token comment"># 禁止重定向输出结果</span>
<span class="token number">2022</span>/04/28 <span class="token number">17</span>:11:12 当前请求地址: <span class="token string">"http://127.0.0.1:5000/demo"</span> <span class="token operator">|</span> 当前请求来源地址: <span class="token string">"http://127.0.0.1:5000"</span>
<span class="token number">2022</span>/04/28 <span class="token number">17</span>:11:12 已访问过的地址集合:                                      
<span class="token number">2022</span>/04/28 <span class="token number">17</span>:11:12    已访问过的地址: <span class="token string">"http://127.0.0.1:5000"</span> <span class="token operator">|</span> 地址来源: <span class="token string">""</span>
<span class="token number">2022</span>/04/28 <span class="token number">17</span>:11:12         
</code></pre></div><h4 id="cookie设置与查看" tabindex="-1"><a class="header-anchor" href="#cookie设置与查看" aria-hidden="true">#</a> Cookie设置与查看</h4>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"math/rand"</span>
	<span class="token string">"net/http"</span>
	<span class="token string">"net/http/cookiejar"</span>
	<span class="token string">"net/url"</span>
	<span class="token string">"strconv"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">RunServer</span><span class="token punctuation">(</span>addr <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>writer http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> request <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 服务端设置cookie</span>
		rand<span class="token punctuation">.</span><span class="token function">Seed</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">UnixNano</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 设置随机数种子</span>
		cookie1 <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Cookie<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">"uid"</span><span class="token punctuation">,</span> Value<span class="token punctuation">:</span> strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span>rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token number">999</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
		cookie2 <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Cookie<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">"gid"</span><span class="token punctuation">,</span> Value<span class="token punctuation">:</span> strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span>rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token number">999</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
		http<span class="token punctuation">.</span><span class="token function">SetCookie</span><span class="token punctuation">(</span>writer<span class="token punctuation">,</span> cookie1<span class="token punctuation">)</span>
		http<span class="token punctuation">.</span><span class="token function">SetCookie</span><span class="token punctuation">(</span>writer<span class="token punctuation">,</span> cookie2<span class="token punctuation">)</span>

		<span class="token comment">// 返回响应</span>
		<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Fprintf</span><span class="token punctuation">(</span>writer<span class="token punctuation">,</span> <span class="token string">"hello world!"</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span>addr<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>http<span class="token punctuation">.</span>Client <span class="token punctuation">{</span>
	<span class="token comment">// 实例化cookiejar</span>
	jar<span class="token punctuation">,</span> err <span class="token operator">:=</span> cookiejar<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 实例化Client</span>
	<span class="token comment">// Jar参数：服务端响应设置的Cookie会自动保存，下次客户端请求时会自动带上(若要查看本次请求的Cookie必须在请求发送完成之后，即client.Do方法之后)</span>
	<span class="token comment">// 		   客户端也可以不用该参数，而是每次请求时主动添加Cookie。</span>
	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span>
		Jar<span class="token punctuation">:</span> jar<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> client
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">SendRequest</span><span class="token punctuation">(</span>client <span class="token operator">*</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">,</span> ServerURL <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 生成Request对象</span>
	req<span class="token punctuation">,</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewRequest</span><span class="token punctuation">(</span><span class="token string">"GET"</span><span class="token punctuation">,</span> ServerURL<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 客户端主动设置Cookie</span>
	rand<span class="token punctuation">.</span><span class="token function">Seed</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">UnixNano</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 设置随机数种子</span>
	cookie <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Cookie<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">"client"</span><span class="token punctuation">,</span> Value<span class="token punctuation">:</span> strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span>rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token number">999</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
	req<span class="token punctuation">.</span><span class="token function">AddCookie</span><span class="token punctuation">(</span>cookie<span class="token punctuation">)</span>

	<span class="token comment">// 发送请求</span>
	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 查看客户端携带的Cookie, 要在发送完请求以后才能查看携带的Cookie</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"客户端发送请求携带的Cookie: %q\n"</span><span class="token punctuation">,</span> req<span class="token punctuation">.</span><span class="token function">Cookies</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// 关闭连接</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> err <span class="token operator">=</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 输出到控制台</span>
	data<span class="token punctuation">,</span> err <span class="token operator">:=</span> io<span class="token punctuation">.</span><span class="token function">ReadAll</span><span class="token punctuation">(</span>resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"服务端响应内容: %s | 服务端设置的Cookie: %q\n"</span><span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">,</span> resp<span class="token punctuation">.</span><span class="token function">Cookies</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 定义变量</span>
	ServerListenAddr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:5000"</span>      <span class="token comment">//	服务端监听地址</span>
	ServerURL <span class="token operator">:=</span> <span class="token string">"http://"</span> <span class="token operator">+</span> ServerListenAddr <span class="token comment">// 客户端访问地址</span>

	<span class="token comment">// 启动服务端</span>
	<span class="token keyword">go</span> <span class="token function">RunServer</span><span class="token punctuation">(</span>ServerListenAddr<span class="token punctuation">)</span>

	<span class="token comment">// 实例化客户端</span>
	<span class="token comment">// 客户端实例化时只需要添加Jar属性，下次</span>
	client <span class="token operator">:=</span> <span class="token function">NewClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 发送请求</span>
	<span class="token function">SendRequest</span><span class="token punctuation">(</span>client<span class="token punctuation">,</span> ServerURL<span class="token punctuation">)</span>

	<span class="token comment">// 查看client.Jar存储的Cookie</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>client<span class="token punctuation">.</span>Jar<span class="token punctuation">.</span><span class="token function">Cookies</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>url<span class="token punctuation">.</span>URL<span class="token punctuation">{</span>
		Scheme<span class="token punctuation">:</span> <span class="token string">"http"</span><span class="token punctuation">,</span>
		Host<span class="token punctuation">:</span>   <span class="token string">"127.0.0.1:5000"</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 再次发送请求，自动携带Cookie</span>
	<span class="token function">SendRequest</span><span class="token punctuation">(</span>client<span class="token punctuation">,</span> ServerURL<span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 在我们这个代码中，客户端每次请求时都会都会生成随机cookie（client=xxx），所以两次请求中client值不一样</span>
<span class="token comment"># uid和gid是服务端设置的Cookie，通过client.Jar属性来自动管理，下次请求的时候会自动带上</span>
客户端发送请求携带的Cookie: <span class="token punctuation">[</span><span class="token string">"client=352"</span><span class="token punctuation">]</span>
服务端响应内容: hello world<span class="token operator">!</span> <span class="token operator">|</span> 服务端设置的Cookie: <span class="token punctuation">[</span><span class="token string">"uid=94"</span> <span class="token string">"gid=307"</span><span class="token punctuation">]</span> 
                                                                        
<span class="token punctuation">[</span>uid<span class="token operator">=</span><span class="token number">94</span> <span class="token assign-left variable">gid</span><span class="token operator">=</span><span class="token number">307</span><span class="token punctuation">]</span>                                                        
                                                                        
客户端发送请求携带的Cookie: <span class="token punctuation">[</span><span class="token string">"client=489"</span> <span class="token string">"uid=94"</span> <span class="token string">"gid=307"</span><span class="token punctuation">]</span>           
服务端响应内容: hello world<span class="token operator">!</span> <span class="token operator">|</span> 服务端设置的Cookie: <span class="token punctuation">[</span><span class="token string">"uid=489"</span> <span class="token string">"gid=407"</span><span class="token punctuation">]</span>
</code></pre></div><h3 id="groutine数量问题" tabindex="-1"><a class="header-anchor" href="#groutine数量问题" aria-hidden="true">#</a> Groutine数量问题</h3>
<p>只是简单发送一个<code v-pre>GET</code>请求，关闭连接后发现：</p>
<p>（1）为什么<code v-pre>Goroutine</code>数量是3？</p>
<p>（2）为什么会多出来2个？</p>
<p>（3）多出来的2个是干嘛的？</p>
<p>（4）换一个网站测试，发一次请求，发现<code v-pre>Goroutine</code>又变成2了，为什么？</p>
<details class="custom-container details"><summary>问题1验证：Goroutine数量是3</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
	<span class="token string">"runtime"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 实例化Client	</span>
	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span><span class="token punctuation">}</span>

	<span class="token comment">// 发送GET请求</span>
	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">"https://www.baidu.com"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 输出到控制台</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>io<span class="token punctuation">.</span>Discard<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 关闭连接</span>
	err <span class="token operator">=</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 查看goroutine数量</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>runtime<span class="token punctuation">.</span><span class="token function">NumGoroutine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 输出结果：3</span>
</code></pre></div></details>
<details class="custom-container details"><summary>问题2猜想并验证-方式1：关闭连接后并没有真正销毁而是放入到连接池中了，通过调整最大空闲连接数来验证</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
	<span class="token string">"runtime"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 实例化Client</span>
	t <span class="token operator">:=</span> http<span class="token punctuation">.</span>DefaultTransport<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>http<span class="token punctuation">.</span>Transport<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	t<span class="token punctuation">.</span>MaxIdleConns <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token comment">// (HTTP长连接)最大空闲连接数，0代表不限制，设置为-1，即不允许有空闲连接</span>
	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span>Transport<span class="token punctuation">:</span> t<span class="token punctuation">}</span>

	<span class="token comment">// 发送GET请求</span>
	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">"https://www.baidu.com"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 输出到控制台</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>io<span class="token punctuation">.</span>Discard<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 关闭连接</span>
	err <span class="token operator">=</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 查看goroutine数量</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>runtime<span class="token punctuation">.</span><span class="token function">NumGoroutine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 输出结果：1</span>
</code></pre></div></details>
<details class="custom-container details"><summary>问题2猜想并验证-方式2：通过向不同主机发请求，让连接池中的连接得不到复用，验证1个请求对应2个Groutine的想法对不对</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
	<span class="token string">"runtime"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 实例化Client</span>
	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span><span class="token punctuation">}</span>

	<span class="token comment">// 简单封装一下</span>
	sendRequest <span class="token operator">:=</span> <span class="token keyword">func</span><span class="token punctuation">(</span>url <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 发送GET请求</span>
		resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 输出到控制台</span>
		<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>io<span class="token punctuation">.</span>Discard<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 关闭连接</span>
		err <span class="token operator">=</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 发送请求</span>
	<span class="token comment">// 向两个不同的主机发送请求，连接得不到复用，每个请求创建2个goroutine，所以当发送2次请求应该总共有5个goroutine</span>
	<span class="token function">sendRequest</span><span class="token punctuation">(</span><span class="token string">"https://www.baidu.com"</span><span class="token punctuation">)</span>
	<span class="token function">sendRequest</span><span class="token punctuation">(</span><span class="token string">"https://www.qq.com"</span><span class="token punctuation">)</span>
	<span class="token comment">//sendRequest("https://www.163.com")</span>

	<span class="token comment">// 查看goroutine数量</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>runtime<span class="token punctuation">.</span><span class="token function">NumGoroutine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 输出结果：5</span>
</code></pre></div></details>
<details class="custom-container details"><summary>问题3猜想<span style="color: red; font-weight: bold;">未验证</span>：1个Groutine用于读，1个Groutine用于写（求大佬指点迷津）</summary>
</details>
<details class="custom-container details"><summary>问题4猜想并验证：该网站使用的是HTTP/2协议，HTTP/1.1是半双工，HTTP/2和WebSocket一样是全双工的，读和写可以在一个Goroutine中完成</summary>
<p>这里使用httpstat来查看http协议，当然也可以使用其他工具，比如浏览器</p>
<p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220430104420307.png" alt="image-20220430104420307"></p>
<blockquote>
<p>注意事项：</p>
<p>（1）curl默认是不支持HTTP/2协议的，除非重新编译，所以用curl测试的话会降级到HTTP/1.1</p>
<p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220430104801284.png" alt="image-20220430104801284"></p>
<p>（2）HTTP/2响应头中并没有看到<code v-pre>Keep-Alive</code>，这是因为HTTP/2协议规定的，它删除了很多字段，比如<code v-pre>Keep-Alive</code>、<code v-pre>Proxy-Connection</code>等</p>
<p>​          参考RFC 7540：<a href="https://www.rfc-editor.org/rfc/rfc7540.html#section-8.1.2.2" target="_blank" rel="noopener noreferrer">https://www.rfc-editor.org/rfc/rfc7540.html#section-8.1.2.2<ExternalLinkIcon/></a></p>
</blockquote>
</details>
<h3 id="groutine泄漏之transport" tabindex="-1"><a class="header-anchor" href="#groutine泄漏之transport" aria-hidden="true">#</a> Groutine泄漏之Transport</h3>
<p>先上结论</p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token comment">// Transports should be reused instead of created as needed.</span>
<span class="token comment">// Transports应该被重用，而不是一旦需要就创建</span>

<span class="token comment">// Transports are safe for concurrent use by multiple goroutines.</span>
<span class="token comment">// Transports线程安全</span>
</code></pre></div><p>代码演示</p>
<details class="custom-container details"><summary>复现Transport引起的Goroutine泄漏</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
	<span class="token string">"runtime"</span>
	<span class="token string">"sync"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">sendRequest</span><span class="token punctuation">(</span>wg <span class="token operator">*</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 实例化客户端</span>
	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span>
		Transport<span class="token punctuation">:</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Transport<span class="token punctuation">{</span>
			Proxy<span class="token punctuation">:</span>                 http<span class="token punctuation">.</span>ProxyFromEnvironment<span class="token punctuation">,</span>
			ForceAttemptHTTP2<span class="token punctuation">:</span>     <span class="token boolean">true</span><span class="token punctuation">,</span>
			MaxIdleConns<span class="token punctuation">:</span>          <span class="token number">100</span><span class="token punctuation">,</span>
			IdleConnTimeout<span class="token punctuation">:</span>       <span class="token number">30</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">,</span>	<span class="token comment">// 调整为30,方便测试</span>
			TLSHandshakeTimeout<span class="token punctuation">:</span>   <span class="token number">10</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">,</span>
			ExpectContinueTimeout<span class="token punctuation">:</span> <span class="token number">1</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 发送GET请求</span>
	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">"https://www.baidu.com"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 关闭连接</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		err <span class="token operator">=</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 丢弃响应</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>io<span class="token punctuation">.</span>Discard<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 定义变量</span>
	wg <span class="token operator">:=</span> <span class="token operator">&amp;</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">{</span><span class="token punctuation">}</span>

	<span class="token comment">// 发送多个请求</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">300</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
		<span class="token keyword">go</span> <span class="token function">sendRequest</span><span class="token punctuation">(</span>wg<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 等待goroutine运行结束</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 查看goroutine数量</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		n <span class="token operator">:=</span> runtime<span class="token punctuation">.</span><span class="token function">NumGoroutine</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
		<span class="token keyword">if</span> n <span class="token operator">==</span> <span class="token number">1</span> <span class="token punctuation">{</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># (1)最后一个Goroutine运行完成后，立即查看Goroutine数量得到601</span>
<span class="token comment"># 300 * 2 +1 = 601</span>
<span class="token comment">#     300：300个请求</span>
<span class="token comment">#       2: 对HTTP/1.1网站说1个请求对应2个goroutine</span>
<span class="token comment">#       1: 主goroutine</span>
<span class="token comment"># (2) 后面Groutine为什么又少了呢？</span>
<span class="token comment">#     看一下时间差，差了30秒左右，再看一下代码 IdleConnTimeout: 30 * time.Second, 正好可以对应上，原因是空闲连接超时被干掉了</span>
<span class="token comment"># (3) 之前介绍过有这样一个参数，DefaultMaxIdleConnsPerHost=2，这意味着空闲连接中的100个连接只有两个连接分配给该主机，300个连接和这个参数不是冲突了吗？</span>
<span class="token comment">#     其实并没有冲突，因为每个Transport都是全新的，对他来说只有1个连接</span>
<span class="token number">2022</span>/04/30 <span class="token number">15</span>:43:31 <span class="token number">601</span>
<span class="token number">2022</span>/04/30 <span class="token number">15</span>:43:32 <span class="token number">601</span>
<span class="token number">2022</span>/04/30 <span class="token number">15</span>:43:33 <span class="token number">601</span>
<span class="token number">2022</span>/04/30 <span class="token number">15</span>:43:34 <span class="token number">601</span>
<span class="token number">2022</span>/04/30 <span class="token number">15</span>:43:35 <span class="token number">601</span>
<span class="token number">2022</span>/04/30 <span class="token number">15</span>:43:36 <span class="token number">601</span>
<span class="token number">2022</span>/04/30 <span class="token number">15</span>:43:37 <span class="token number">601</span>
<span class="token number">2022</span>/04/30 <span class="token number">15</span>:43:38 <span class="token number">601</span>
<span class="token number">2022</span>/04/30 <span class="token number">15</span>:43:39 <span class="token number">601</span>
<span class="token number">2022</span>/04/30 <span class="token number">15</span>:43:40 <span class="token number">601</span>
<span class="token number">2022</span>/04/30 <span class="token number">15</span>:43:41 <span class="token number">601</span>
<span class="token number">2022</span>/04/30 <span class="token number">15</span>:43:43 <span class="token number">601</span>
<span class="token number">2022</span>/04/30 <span class="token number">15</span>:43:44 <span class="token number">601</span>
<span class="token number">2022</span>/04/30 <span class="token number">15</span>:43:45 <span class="token number">601</span>
<span class="token number">2022</span>/04/30 <span class="token number">15</span>:43:46 <span class="token number">601</span>
<span class="token number">2022</span>/04/30 <span class="token number">15</span>:43:47 <span class="token number">601</span>
<span class="token number">2022</span>/04/30 <span class="token number">15</span>:43:48 <span class="token number">601</span>
<span class="token number">2022</span>/04/30 <span class="token number">15</span>:43:49 <span class="token number">385</span>
<span class="token number">2022</span>/04/30 <span class="token number">15</span>:43:50 <span class="token number">292</span>
<span class="token number">2022</span>/04/30 <span class="token number">15</span>:43:51 <span class="token number">209</span>
<span class="token number">2022</span>/04/30 <span class="token number">15</span>:43:52 <span class="token number">209</span>
<span class="token number">2022</span>/04/30 <span class="token number">15</span>:43:53 <span class="token number">209</span>
<span class="token number">2022</span>/04/30 <span class="token number">15</span>:43:54 <span class="token number">170</span>
<span class="token number">2022</span>/04/30 <span class="token number">15</span>:43:55 <span class="token number">59</span>
<span class="token number">2022</span>/04/30 <span class="token number">15</span>:43:56 <span class="token number">59</span>
<span class="token number">2022</span>/04/30 <span class="token number">15</span>:43:57 <span class="token number">59</span>
<span class="token number">2022</span>/04/30 <span class="token number">15</span>:43:58 <span class="token number">59</span>
<span class="token number">2022</span>/04/30 <span class="token number">15</span>:43:59 <span class="token number">59</span>
<span class="token number">2022</span>/04/30 <span class="token number">15</span>:44:00 <span class="token number">59</span>
<span class="token number">2022</span>/04/30 <span class="token number">15</span>:44:01 <span class="token number">59</span>
<span class="token number">2022</span>/04/30 <span class="token number">15</span>:44:02 <span class="token number">1</span>
</code></pre></div><details class="custom-container details"><summary>修复Transport引起的Goroutine泄漏</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
	<span class="token string">"runtime"</span>
	<span class="token string">"sync"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">sendRequest</span><span class="token punctuation">(</span>wg <span class="token operator">*</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">,</span> client <span class="token operator">*</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 发送GET请求</span>
	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">"https://www.baidu.com"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 关闭连接</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		err <span class="token operator">=</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 丢弃响应</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>io<span class="token punctuation">.</span>Discard<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 定义变量</span>
	wg <span class="token operator">:=</span> <span class="token operator">&amp;</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">{</span><span class="token punctuation">}</span>

	<span class="token comment">// 实例化客户端</span>
	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span>
		Transport<span class="token punctuation">:</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Transport<span class="token punctuation">{</span>
			Proxy<span class="token punctuation">:</span>                 http<span class="token punctuation">.</span>ProxyFromEnvironment<span class="token punctuation">,</span>
			ForceAttemptHTTP2<span class="token punctuation">:</span>     <span class="token boolean">true</span><span class="token punctuation">,</span>
			MaxIdleConns<span class="token punctuation">:</span>          <span class="token number">100</span><span class="token punctuation">,</span>
			IdleConnTimeout<span class="token punctuation">:</span>       <span class="token number">30</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">,</span>	<span class="token comment">// 调整为30,方便测试</span>
			TLSHandshakeTimeout<span class="token punctuation">:</span>   <span class="token number">10</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">,</span>
			ExpectContinueTimeout<span class="token punctuation">:</span> <span class="token number">1</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 发送多个请求</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">300</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
		<span class="token keyword">go</span> <span class="token function">sendRequest</span><span class="token punctuation">(</span>wg<span class="token punctuation">,</span> client<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 等待goroutine运行结束</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 查看goroutine数量</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		n <span class="token operator">:=</span> runtime<span class="token punctuation">.</span><span class="token function">NumGoroutine</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
		<span class="token keyword">if</span> n <span class="token operator">==</span> <span class="token number">1</span> <span class="token punctuation">{</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token number">2022</span>/04/30 <span class="token number">16</span>:00:25 <span class="token number">461</span>
<span class="token number">2022</span>/04/30 <span class="token number">16</span>:00:28 <span class="token number">353</span>
<span class="token number">2022</span>/04/30 <span class="token number">16</span>:00:29 <span class="token number">227</span>
<span class="token number">2022</span>/04/30 <span class="token number">16</span>:00:30 <span class="token number">223</span>
<span class="token number">2022</span>/04/30 <span class="token number">16</span>:00:31 <span class="token number">73</span>
<span class="token number">2022</span>/04/30 <span class="token number">16</span>:00:32 <span class="token number">57</span>
<span class="token number">2022</span>/04/30 <span class="token number">16</span>:00:33 <span class="token number">57</span>
<span class="token number">2022</span>/04/30 <span class="token number">16</span>:00:34 <span class="token number">57</span>
<span class="token number">2022</span>/04/30 <span class="token number">16</span>:00:35 <span class="token number">47</span>
<span class="token number">2022</span>/04/30 <span class="token number">16</span>:00:36 <span class="token number">9</span>
<span class="token number">2022</span>/04/30 <span class="token number">16</span>:00:37 <span class="token number">7</span>
<span class="token number">2022</span>/04/30 <span class="token number">16</span>:00:38 <span class="token number">7</span>
<span class="token number">2022</span>/04/30 <span class="token number">16</span>:00:39 <span class="token number">5</span>	<span class="token comment"># 实际上到这里已经结束，连接池中保留了2个空闲连接</span>
<span class="token number">2022</span>/04/30 <span class="token number">16</span>:00:40 <span class="token number">5</span>
<span class="token number">2022</span>/04/30 <span class="token number">16</span>:00:41 <span class="token number">5</span>
<span class="token number">2022</span>/04/30 <span class="token number">16</span>:00:42 <span class="token number">5</span>
<span class="token number">2022</span>/04/30 <span class="token number">16</span>:00:43 <span class="token number">5</span>
<span class="token number">2022</span>/04/30 <span class="token number">16</span>:00:44 <span class="token number">5</span>
<span class="token number">2022</span>/04/30 <span class="token number">16</span>:00:45 <span class="token number">5</span>
<span class="token number">2022</span>/04/30 <span class="token number">16</span>:00:46 <span class="token number">5</span>
<span class="token number">2022</span>/04/30 <span class="token number">16</span>:00:47 <span class="token number">5</span>
<span class="token number">2022</span>/04/30 <span class="token number">16</span>:00:48 <span class="token number">5</span>
<span class="token number">2022</span>/04/30 <span class="token number">16</span>:00:49 <span class="token number">5</span>
<span class="token number">2022</span>/04/30 <span class="token number">16</span>:00:50 <span class="token number">5</span>
<span class="token number">2022</span>/04/30 <span class="token number">16</span>:00:51 <span class="token number">5</span>
<span class="token number">2022</span>/04/30 <span class="token number">16</span>:00:52 <span class="token number">5</span>
<span class="token number">2022</span>/04/30 <span class="token number">16</span>:00:53 <span class="token number">5</span>
<span class="token number">2022</span>/04/30 <span class="token number">16</span>:00:54 <span class="token number">5</span>
<span class="token number">2022</span>/04/30 <span class="token number">16</span>:00:56 <span class="token number">1</span>
</code></pre></div><h2 id="net-http-httptrace-请求跟踪" tabindex="-1"><a class="header-anchor" href="#net-http-httptrace-请求跟踪" aria-hidden="true">#</a> net/http/httptrace：请求跟踪</h2>
<p>官方文档：<a href="https://pkg.go.dev/net/http/httptrace" target="_blank" rel="noopener noreferrer">https://pkg.go.dev/net/http/httptrace<ExternalLinkIcon/></a></p>
<h3 id="精简版httpstat" tabindex="-1"><a class="header-anchor" href="#精简版httpstat" aria-hidden="true">#</a> 精简版httpstat</h3>
<p>下面的代码是仿<a href="https://github.com/davecheney/httpstat" target="_blank" rel="noopener noreferrer">httpstat<ExternalLinkIcon/></a> 写的一个精简版本，重在学习</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"context"</span>
	<span class="token string">"crypto/tls"</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"github.com/fatih/color"</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
	<span class="token string">"net/http/httptrace"</span>
	<span class="token string">"strings"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 定义计时变量</span>
	<span class="token keyword">var</span> <span class="token punctuation">(</span>
		dnsStartTime<span class="token punctuation">,</span> dnsDoneTime           time<span class="token punctuation">.</span>Time
		tcpStartTime<span class="token punctuation">,</span> tcpDoneTime           time<span class="token punctuation">.</span>Time
		tlsStartTime<span class="token punctuation">,</span> tlsDoneTime           time<span class="token punctuation">.</span>Time
		httpConnStartTime<span class="token punctuation">,</span> httpConnDoneTime time<span class="token punctuation">.</span>Time
		httpFirstRespByte                   time<span class="token punctuation">.</span>Time
	<span class="token punctuation">)</span>

	<span class="token comment">// 定义输出模板</span>
	<span class="token keyword">const</span> httpsTemplate <span class="token operator">=</span> <span class="token string">``</span> <span class="token operator">+</span>
		<span class="token string">`  DNS Lookup   TCP Connection   TLS Handshake   Server Processing   Content Transfer`</span> <span class="token operator">+</span> <span class="token string">"\n"</span> <span class="token operator">+</span>
		<span class="token string">`[%s  |     %s  |    %s  |        %s  |       %s  ]`</span> <span class="token operator">+</span> <span class="token string">"\n"</span> <span class="token operator">+</span>
		<span class="token string">`            |                |               |                   |                  |`</span> <span class="token operator">+</span> <span class="token string">"\n"</span> <span class="token operator">+</span>
		<span class="token string">`   namelookup:%s      |               |                   |                  |`</span> <span class="token operator">+</span> <span class="token string">"\n"</span> <span class="token operator">+</span>
		<span class="token string">`                       connect:%s     |                   |                  |`</span> <span class="token operator">+</span> <span class="token string">"\n"</span> <span class="token operator">+</span>
		<span class="token string">`                                   pretransfer:%s         |                  |`</span> <span class="token operator">+</span> <span class="token string">"\n"</span> <span class="token operator">+</span>
		<span class="token string">`                                                     starttransfer:%s        |`</span> <span class="token operator">+</span> <span class="token string">"\n"</span> <span class="token operator">+</span>
		<span class="token string">`                                                                               total:%s`</span> <span class="token operator">+</span> <span class="token string">"\n"</span>

	<span class="token comment">// 创建Client Trace对象</span>
	trace <span class="token operator">:=</span> <span class="token operator">&amp;</span>httptrace<span class="token punctuation">.</span>ClientTrace<span class="token punctuation">{</span>
		<span class="token comment">// DNS解析计时</span>
		DNSStart<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>info httptrace<span class="token punctuation">.</span>DNSStartInfo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			dnsStartTime <span class="token operator">=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		DNSDone<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>dnsInfo httptrace<span class="token punctuation">.</span>DNSDoneInfo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			dnsDoneTime <span class="token operator">=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token comment">// TCP3次握手计时</span>
		ConnectStart<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>network<span class="token punctuation">,</span> addr <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			tcpStartTime <span class="token operator">=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		ConnectDone<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>network<span class="token punctuation">,</span> addr <span class="token builtin">string</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			tcpDoneTime <span class="token operator">=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"\n%s%s\n"</span><span class="token punctuation">,</span> color<span class="token punctuation">.</span><span class="token function">GreenString</span><span class="token punctuation">(</span><span class="token string">"Connected to "</span><span class="token punctuation">)</span><span class="token punctuation">,</span> color<span class="token punctuation">.</span><span class="token function">CyanString</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token comment">// TLS握手计时</span>
		TLSHandshakeStart<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			tlsStartTime <span class="token operator">=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		TLSHandshakeDone<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>state tls<span class="token punctuation">.</span>ConnectionState<span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			tlsDoneTime <span class="token operator">=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token comment">// HTTP/HTTPS建立连接后调用</span>
		GotConn<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>info httptrace<span class="token punctuation">.</span>GotConnInfo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			httpConnStartTime <span class="token operator">=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token comment">// 获取服务端响应头第一个字节后调用</span>
		GotFirstResponseByte<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			httpFirstRespByte <span class="token operator">=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 创建Client Trace Context</span>
	traCtx <span class="token operator">:=</span> httptrace<span class="token punctuation">.</span><span class="token function">WithClientTrace</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> trace<span class="token punctuation">)</span>

	<span class="token comment">// 生成Request对象，上面所创建的trace Context都是为了创建Request</span>
	req<span class="token punctuation">,</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewRequestWithContext</span><span class="token punctuation">(</span>traCtx<span class="token punctuation">,</span> <span class="token string">"GET"</span><span class="token punctuation">,</span> <span class="token string">"https://jinhui.dev"</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 实例化Client，偷个懒直接用默认的客户端</span>
	client <span class="token operator">:=</span> http<span class="token punctuation">.</span>DefaultClient
	client<span class="token punctuation">.</span>Timeout <span class="token operator">=</span> time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">5</span> <span class="token comment">// 设置超时时间</span>
	client<span class="token punctuation">.</span>CheckRedirect <span class="token operator">=</span> <span class="token keyword">func</span><span class="token punctuation">(</span>req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">,</span> via <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> http<span class="token punctuation">.</span>ErrUseLastResponse <span class="token comment">// 拒绝重定向</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 发送请求</span>
	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 读取响应头</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"\n%s/%s\n"</span><span class="token punctuation">,</span> color<span class="token punctuation">.</span><span class="token function">GreenString</span><span class="token punctuation">(</span><span class="token string">"HTTPS"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> color<span class="token punctuation">.</span><span class="token function">CyanString</span><span class="token punctuation">(</span><span class="token string">"%d.%d %s"</span><span class="token punctuation">,</span> resp<span class="token punctuation">.</span>ProtoMajor<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>ProtoMinor<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>Status<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> resp<span class="token punctuation">.</span>Header <span class="token punctuation">{</span>
		s <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span>v<span class="token punctuation">,</span> <span class="token string">","</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%s: %s\n"</span><span class="token punctuation">,</span> k<span class="token punctuation">,</span> color<span class="token punctuation">.</span><span class="token function">CyanString</span><span class="token punctuation">(</span><span class="token string">"%s"</span><span class="token punctuation">,</span> s<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 丢弃响应</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>io<span class="token punctuation">.</span>Discard<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span>color<span class="token punctuation">.</span><span class="token function">CyanString</span><span class="token punctuation">(</span><span class="token string">"\n%s\n"</span><span class="token punctuation">,</span> <span class="token string">"Body discarded"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// 关闭连接(放回连接池中)</span>
	<span class="token keyword">if</span> err <span class="token operator">:=</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 连接断开时间</span>
	httpConnDoneTime <span class="token operator">=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 输出内容</span>
	fmta <span class="token operator">:=</span> <span class="token keyword">func</span><span class="token punctuation">(</span>d time<span class="token punctuation">.</span>Duration<span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> color<span class="token punctuation">.</span><span class="token function">CyanString</span><span class="token punctuation">(</span><span class="token string">"%7dms"</span><span class="token punctuation">,</span> <span class="token function">int</span><span class="token punctuation">(</span>d<span class="token operator">/</span>time<span class="token punctuation">.</span>Millisecond<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span>
		httpsTemplate<span class="token punctuation">,</span>
		<span class="token comment">// 第一行</span>
		<span class="token function">fmta</span><span class="token punctuation">(</span>dnsDoneTime<span class="token punctuation">.</span><span class="token function">Sub</span><span class="token punctuation">(</span>dnsStartTime<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token function">fmta</span><span class="token punctuation">(</span>tcpDoneTime<span class="token punctuation">.</span><span class="token function">Sub</span><span class="token punctuation">(</span>tcpStartTime<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token function">fmta</span><span class="token punctuation">(</span>tlsDoneTime<span class="token punctuation">.</span><span class="token function">Sub</span><span class="token punctuation">(</span>tlsStartTime<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token function">fmta</span><span class="token punctuation">(</span>httpFirstRespByte<span class="token punctuation">.</span><span class="token function">Sub</span><span class="token punctuation">(</span>httpConnStartTime<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token function">fmta</span><span class="token punctuation">(</span>httpConnDoneTime<span class="token punctuation">.</span><span class="token function">Sub</span><span class="token punctuation">(</span>httpFirstRespByte<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token comment">// 第二行</span>
		<span class="token function">fmta</span><span class="token punctuation">(</span>dnsDoneTime<span class="token punctuation">.</span><span class="token function">Sub</span><span class="token punctuation">(</span>dnsStartTime<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token function">fmta</span><span class="token punctuation">(</span>tcpDoneTime<span class="token punctuation">.</span><span class="token function">Sub</span><span class="token punctuation">(</span>dnsStartTime<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token function">fmta</span><span class="token punctuation">(</span>httpConnStartTime<span class="token punctuation">.</span><span class="token function">Sub</span><span class="token punctuation">(</span>dnsStartTime<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token function">fmta</span><span class="token punctuation">(</span>httpFirstRespByte<span class="token punctuation">.</span><span class="token function">Sub</span><span class="token punctuation">(</span>dnsStartTime<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token function">fmta</span><span class="token punctuation">(</span>httpConnDoneTime<span class="token punctuation">.</span><span class="token function">Sub</span><span class="token punctuation">(</span>dnsStartTime<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220429211410766.png" alt="image-20220429211410766"></p>
<h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> </h2>
<h2 id="net-http之server" tabindex="-1"><a class="header-anchor" href="#net-http之server" aria-hidden="true">#</a> net/http之Server</h2>
<p>官方文档：<a href="https://pkg.go.dev/net/http" target="_blank" rel="noopener noreferrer">https://pkg.go.dev/net/http<ExternalLinkIcon/></a></p>
<h3 id="基础示例-1" tabindex="-1"><a class="header-anchor" href="#基础示例-1" aria-hidden="true">#</a> 基础示例</h3>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
<span class="token punctuation">)</span>

<span class="token comment">// 处理器</span>
<span class="token keyword">func</span> <span class="token function">indexHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">"Hello, world!\n"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 监听地址</span>
	addr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:80"</span>

	<span class="token comment">// 注册路由</span>
	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> indexHandler<span class="token punctuation">)</span>

	<span class="token comment">// 启动服务</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"* Running on http://"</span> <span class="token operator">+</span> addr<span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span>addr<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>客户端访问测试</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token punctuation">\</span>Desktop<span class="token operator">></span>curl http://127.0.0.1
Hello, world<span class="token operator">!</span>
</code></pre></div><details class="custom-container details"><summary>进一步探索</summary>
<p>（1）查看<code v-pre>http.HandleFunc</code>源码，发现这与<code v-pre>http.Get</code>是一个套路</p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token comment">// (1) 真正使用的是DefaultServeMux的HandleFunc方法</span>
<span class="token comment">// HandleFunc registers the handler function for the given pattern</span>
<span class="token comment">// in the DefaultServeMux.</span>
<span class="token comment">// The documentation for ServeMux explains how patterns are matched.</span>
<span class="token keyword">func</span> <span class="token function">HandleFunc</span><span class="token punctuation">(</span>pattern <span class="token builtin">string</span><span class="token punctuation">,</span> handler <span class="token keyword">func</span><span class="token punctuation">(</span>ResponseWriter<span class="token punctuation">,</span> <span class="token operator">*</span>Request<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	DefaultServeMux<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span>pattern<span class="token punctuation">,</span> handler<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// -------------------------------------------------------------------------</span>
<span class="token comment">// (2) DefaultServeMux是ServeMux指针</span>
<span class="token comment">// DefaultServeMux is the default ServeMux used by Serve.</span>
<span class="token keyword">var</span> DefaultServeMux <span class="token operator">=</span> <span class="token operator">&amp;</span>defaultServeMux

<span class="token keyword">var</span> defaultServeMux ServeMux

<span class="token comment">// -------------------------------------------------------------------------</span>
<span class="token comment">// (3) ServeMux是一个结构体</span>

<span class="token comment">// ServeMux is an HTTP request multiplexer.</span>
<span class="token comment">// It matches the URL of each incoming request against a list of registered</span>
<span class="token comment">// patterns and calls the handler for the pattern that</span>
<span class="token comment">// most closely matches the URL.</span>
<span class="token comment">// ServeMux是一个请求多路复用器,后面的意思是维护【请求URL】与【处理函数Handler】之间的映射</span>
<span class="token keyword">type</span> ServeMux <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	mu    sync<span class="token punctuation">.</span>RWMutex
	m     <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>muxEntry
	es    <span class="token punctuation">[</span><span class="token punctuation">]</span>muxEntry <span class="token comment">// slice of entries sorted from longest to shortest.</span>
	hosts <span class="token builtin">bool</span>       <span class="token comment">// whether any patterns contain hostnames</span>
<span class="token punctuation">}</span>

<span class="token comment">// -------------------------------------------------------------------------</span>
<span class="token comment">// (4) ListenAndServe默认会调用DefaultServeMux，若我们想使用自定义的ServeMux，handler参数需要改一下</span>

<span class="token comment">// ListenAndServe listens on the TCP network address addr and then calls</span>
<span class="token comment">// Serve with handler to handle requests on incoming connections.</span>
<span class="token comment">// Accepted connections are configured to enable TCP keep-alives.</span>
<span class="token comment">//</span>
<span class="token comment">// The handler is typically nil, in which case the DefaultServeMux is used.</span>
<span class="token comment">// 如果handler为nil的话，使用DefaultServeMux</span>

<span class="token comment">// ListenAndServe always returns a non-nil error.</span>
<span class="token comment">// ListenAndServe总是返回非nil的错误</span>
<span class="token keyword">func</span> <span class="token function">ListenAndServe</span><span class="token punctuation">(</span>addr <span class="token builtin">string</span><span class="token punctuation">,</span> handler Handler<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	server <span class="token operator">:=</span> <span class="token operator">&amp;</span>Server<span class="token punctuation">{</span>Addr<span class="token punctuation">:</span> addr<span class="token punctuation">,</span> Handler<span class="token punctuation">:</span> handler<span class="token punctuation">}</span>
	<span class="token keyword">return</span> server<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>（2）我们可以使用自定义的<code v-pre>ServeMux</code>来代替<code v-pre>DefaultServeMux</code></p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
<span class="token punctuation">)</span>

<span class="token comment">// 处理器</span>
<span class="token keyword">func</span> <span class="token function">indexHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">"Hello, world!\n"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 监听地址</span>
	addr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:80"</span>

	<span class="token comment">// 实例化请求多路复用器</span>
	mux <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewServeMux</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 注册路由</span>
	mux<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> indexHandler<span class="token punctuation">)</span>

	<span class="token comment">// 启动服务</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"* Running on http://"</span> <span class="token operator">+</span> addr<span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span>addr<span class="token punctuation">,</span> mux<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h3 id="理解handler" tabindex="-1"><a class="header-anchor" href="#理解handler" aria-hidden="true">#</a> 理解Handler</h3>
<p><code v-pre>net/http</code>包中到处都是<code v-pre>Handler</code>，理解<code v-pre>Handler</code>是非常重要的</p>
<h4 id="http-handler和http-handlerfunc" tabindex="-1"><a class="header-anchor" href="#http-handler和http-handlerfunc" aria-hidden="true">#</a> <code v-pre>http.Handler</code>和<code v-pre>http.HandlerFunc</code></h4>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token comment">// 注释部分挑重要的翻译一下</span>
<span class="token comment">// (1) http.Handler就是用来处理Request请求的并返回响应</span>
<span class="token comment">// (2) http.Handler不应该修改Request相关数据</span>
<span class="token comment">// 总结：Handler就是定义了一个ServeHTTP方法的接口，ServeHTTP用来处理Request并返回响应</span>
<span class="token keyword">type</span> Handler <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">ServeHTTP</span><span class="token punctuation">(</span>ResponseWriter<span class="token punctuation">,</span> <span class="token operator">*</span>Request<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// -----------------------------------------------------------</span>
<span class="token comment">// (1) HandlerFunc是一个自定义类型，是一个函数类型，它的值就是一个函数</span>
<span class="token comment">// (2) HandlerFunc函数实现了Handler接口</span>
<span class="token comment">// (3) 像HandlerFunc这样的我们一般称为接口型函数</span>
<span class="token keyword">type</span> HandlerFunc <span class="token keyword">func</span><span class="token punctuation">(</span>ResponseWriter<span class="token punctuation">,</span> <span class="token operator">*</span>Request<span class="token punctuation">)</span>		<span class="token comment">// 主要的作用是：类型转换，将函数类型转为HandlerFunc类型（注意并不会改变值）</span>

<span class="token comment">// ServeHTTP calls f(w, r).</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>f HandlerFunc<span class="token punctuation">)</span> <span class="token function">ServeHTTP</span><span class="token punctuation">(</span>w ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>	<span class="token comment">// HandlerFunc类型实现了Handler接口，ServeHTTP会调用包装后的函数</span>
	<span class="token function">f</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 这里不是太容易理解</span>
<span class="token comment">// (1) 其实就是有一个原始函数，经过自定义类型包装一下，原始函数类型发生改变，新类型的函数我们就暂且叫他包装函数，用以区分</span>
<span class="token comment">// (2) 我们自定义的类型实现了Handler接口，所以包装函数也自动实现了Handler接口</span>
<span class="token comment">// (3) ServeHTTP方法会调用我们的包装函数</span>
</code></pre></div><p>如果还是不太理解，可以看一下如下代码</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
<span class="token punctuation">)</span>

<span class="token comment">// 定义一个很普通的函数Add</span>
<span class="token keyword">func</span> <span class="token function">Add</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> x <span class="token operator">+</span> y
<span class="token punctuation">}</span>

<span class="token comment">// 自定义接口</span>
<span class="token keyword">type</span> Handler <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">ServeHTTP</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token comment">// 自定义类型</span>
<span class="token keyword">type</span> HandlerFunc <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span>

<span class="token comment">// 给自定义类型绑定一个方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>h HandlerFunc<span class="token punctuation">)</span> <span class="token function">ServeHTTP</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// (1) 查看Add函数的类型</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%T\n"</span><span class="token punctuation">,</span> Add<span class="token punctuation">)</span> <span class="token comment">// func(int, int) int</span>

	<span class="token comment">// (2) 改变Add函数类型</span>
	Add2 <span class="token operator">:=</span> <span class="token function">HandlerFunc</span><span class="token punctuation">(</span>Add<span class="token punctuation">)</span>     <span class="token comment">// 注意这里并不是函数调用，而是类型转换</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%T\n"</span><span class="token punctuation">,</span> Add2<span class="token punctuation">)</span>    <span class="token comment">// main.HandlerFunc; 函数Add还是原来的Add,只不过它的类型已经变成HandlerFunc类型了</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">Add2</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 300; 调用都是没有问题的,值没有变,变得是类型, 因为HandlerFunc类型实现了Handler接口,所以Add2自动实现了Handler接口</span>

	<span class="token comment">// (3) 声明接口类型变量,并给他赋值</span>
	<span class="token keyword">var</span> Add3 Handler                          <span class="token comment">// Add3为接口类型</span>
	Add3 <span class="token operator">=</span> Add2                               <span class="token comment">// Add2实现了该接口,所以可以赋值</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%T\n"</span><span class="token punctuation">,</span> Add3<span class="token punctuation">)</span>                  <span class="token comment">// main.HandlerFunc</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>Add3<span class="token punctuation">.</span><span class="token punctuation">(</span>HandlerFunc<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">150</span><span class="token punctuation">,</span> <span class="token number">350</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 500, Add3是接口，断言得到值类型,然后就可以正常调用</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>Add3<span class="token punctuation">.</span><span class="token function">ServeHTTP</span><span class="token punctuation">(</span><span class="token number">999</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>       <span class="token comment">// 调用ServeHTTP方法也是可以的</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h4 id="http-handle和http-handlefunc" tabindex="-1"><a class="header-anchor" href="#http-handle和http-handlefunc" aria-hidden="true">#</a> <code v-pre>http.Handle</code>和<code v-pre>http.HandleFunc</code></h4>
<ul>
<li>这两个和<code v-pre>DefaultServeMux</code>是深度绑定的</li>
<li>注意这几个函数单词拼写，一个是<code v-pre>ler</code>一个是<code v-pre>le</code></li>
</ul>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token comment">// Handle registers the handler for the given pattern</span>
<span class="token comment">// in the DefaultServeMux.</span>
<span class="token comment">// The documentation for ServeMux explains how patterns are matched.</span>
<span class="token comment">// 总结：传入Handler接口类型，给DefaultServeMux增加路由与Handler映射（Handle源码含义）</span>
<span class="token keyword">func</span> <span class="token function">Handle</span><span class="token punctuation">(</span>pattern <span class="token builtin">string</span><span class="token punctuation">,</span> handler Handler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    DefaultServeMux<span class="token punctuation">.</span><span class="token function">Handle</span><span class="token punctuation">(</span>pattern<span class="token punctuation">,</span> handler<span class="token punctuation">)</span>
<span class="token punctuation">}</span>


<span class="token comment">// -----------------------------------------------------------------------------</span>
<span class="token comment">// HandleFunc registers the handler function for the given pattern</span>
<span class="token comment">// in the DefaultServeMux.</span>
<span class="token comment">// The documentation for ServeMux explains how patterns are matched.</span>
<span class="token comment">// 总结：传入一个函数，自动转为Handler接口类型，并给DefaultServeMux增加路由与Handler映射（Handle源码含义）</span>
<span class="token keyword">func</span> <span class="token function">HandleFunc</span><span class="token punctuation">(</span>pattern <span class="token builtin">string</span><span class="token punctuation">,</span> handler <span class="token keyword">func</span><span class="token punctuation">(</span>ResponseWriter<span class="token punctuation">,</span> <span class="token operator">*</span>Request<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	DefaultServeMux<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span>pattern<span class="token punctuation">,</span> handler<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// HandleFunc registers the handler function for the given pattern.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>mux <span class="token operator">*</span>ServeMux<span class="token punctuation">)</span> <span class="token function">HandleFunc</span><span class="token punctuation">(</span>pattern <span class="token builtin">string</span><span class="token punctuation">,</span> handler <span class="token keyword">func</span><span class="token punctuation">(</span>ResponseWriter<span class="token punctuation">,</span> <span class="token operator">*</span>Request<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 自定义mux时可以用这个函数</span>
	<span class="token keyword">if</span> handler <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"http: nil handler"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	mux<span class="token punctuation">.</span><span class="token function">Handle</span><span class="token punctuation">(</span>pattern<span class="token punctuation">,</span> <span class="token function">HandlerFunc</span><span class="token punctuation">(</span>handler<span class="token punctuation">)</span><span class="token punctuation">)</span>	<span class="token comment">// 这个HandlerFunc是通用的，并没有和DefaultServeMux绑定，注意单词拼写是ler不是le</span>
<span class="token punctuation">}</span>

<span class="token comment">// -----------------------------------------------------------------------------</span>
<span class="token comment">// 总结：</span>
<span class="token comment">// (1) 上面两个函数都是在操作DefaultServeMux，我们如果我们使用自定义的ServeMux时候，是不需要使用这俩方法的</span>
<span class="token comment">// (2) 上面两个函数都是干同一件事，就是给DefaultServeMux增加一条路由与Handler的映射关系，不同的是传入的参数不同</span>
</code></pre></div><h4 id="注册路由的两种方式" tabindex="-1"><a class="header-anchor" href="#注册路由的两种方式" aria-hidden="true">#</a> 注册路由的两种方式</h4>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
<span class="token punctuation">)</span>

<span class="token comment">// 处理器</span>
<span class="token keyword">func</span> <span class="token function">indexHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">"Hello, world!\n"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 监听地址</span>
	addr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:80"</span>

	<span class="token comment">// 实例化请求多路复用器</span>
	mux <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewServeMux</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 注册路由-方式1</span>
	mux<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> indexHandler<span class="token punctuation">)</span>
	<span class="token comment">// 我们可以看一下HandleFunc源码,其内部会自动将indexHandler类型转变为HandlerFunc类型，并调用Handle方法</span>
	<span class="token comment">//func (mux *ServeMux) HandleFunc(pattern string, handler func(ResponseWriter, *Request)) {</span>
	<span class="token comment">//	if handler == nil {</span>
	<span class="token comment">//		panic("http: nil handler")</span>
	<span class="token comment">//	}</span>
	<span class="token comment">//	mux.Handle(pattern, HandlerFunc(handler))</span>
	<span class="token comment">//}</span>

	<span class="token comment">// 注册路由-方式2</span>
	<span class="token comment">// 我们也可以自己进行类型转换，然后直接传递一个Handler类型的值进去</span>
	h <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">HandlerFunc</span><span class="token punctuation">(</span>indexHandler<span class="token punctuation">)</span> <span class="token comment">// indexHandler不能为nil，否则会报错</span>
	mux<span class="token punctuation">.</span><span class="token function">Handle</span><span class="token punctuation">(</span><span class="token string">"/test"</span><span class="token punctuation">,</span> h<span class="token punctuation">)</span>

	<span class="token comment">// 启动服务</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"* Running on http://"</span> <span class="token operator">+</span> addr<span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span>addr<span class="token punctuation">,</span> mux<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h4 id="basic-auth认证之handlefunc装饰器" tabindex="-1"><a class="header-anchor" href="#basic-auth认证之handlefunc装饰器" aria-hidden="true">#</a> Basic Auth认证之HandleFunc装饰器</h4>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"encoding/base64"</span>
	<span class="token string">"errors"</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
	<span class="token string">"strings"</span>
<span class="token punctuation">)</span>

<span class="token comment">// 处理器</span>
<span class="token keyword">func</span> <span class="token function">indexHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">"Hello, world!\n"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// Base64解密</span>
<span class="token keyword">func</span> <span class="token function">BasicAuthDecodeString</span><span class="token punctuation">(</span>auth <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>plaintext <span class="token builtin">string</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	authSlice <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>auth<span class="token punctuation">,</span> <span class="token string">" "</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>authSlice<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">2</span> <span class="token operator">||</span> authSlice<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token string">"Basic"</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token string">""</span><span class="token punctuation">,</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"Basic auth format error"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	p<span class="token punctuation">,</span> err <span class="token operator">:=</span> base64<span class="token punctuation">.</span>StdEncoding<span class="token punctuation">.</span><span class="token function">DecodeString</span><span class="token punctuation">(</span>authSlice<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token function">string</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">,</span> err
<span class="token punctuation">}</span>

<span class="token comment">// 用户验证</span>
<span class="token keyword">func</span> <span class="token function">BasicAuthVerifyUser</span><span class="token punctuation">(</span>plaintext <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
	users <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"root:123456"</span><span class="token punctuation">,</span> <span class="token string">"admin:654321"</span><span class="token punctuation">}</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> users <span class="token punctuation">{</span>
		<span class="token keyword">if</span> v <span class="token operator">==</span> plaintext <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">true</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>

<span class="token comment">// BasicAuth装饰器</span>
<span class="token keyword">func</span> <span class="token function">BasicAuth</span><span class="token punctuation">(</span>handler <span class="token keyword">func</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">func</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 这一段判断是从原始的HandleFunc中提取出来的，是为了与不加装饰器一致的行为</span>
	<span class="token comment">// 如果传入了nil，在启动阶段就会报错的行为</span>
	<span class="token keyword">if</span> handler <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"http: nil handler"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 获取Basic Auth认证凭证</span>
		auth <span class="token operator">:=</span> r<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">"Authorization"</span><span class="token punctuation">)</span> <span class="token comment">//获取Basic base64加密后的字段</span>

		<span class="token comment">// 验证失败</span>
		plaintext<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">BasicAuthDecodeString</span><span class="token punctuation">(</span>auth<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			w<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"WWW-Authenticate"</span><span class="token punctuation">,</span> <span class="token string">`Basic realm="`</span><span class="token operator">+</span>err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">`"`</span><span class="token punctuation">)</span>
			w<span class="token punctuation">.</span><span class="token function">WriteHeader</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusUnauthorized<span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 用户名密码验证失败</span>
		<span class="token keyword">if</span> <span class="token operator">!</span><span class="token function">BasicAuthVerifyUser</span><span class="token punctuation">(</span>plaintext<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			w<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"WWW-Authenticate"</span><span class="token punctuation">,</span> <span class="token string">`Basic realm="用户名或密码错误"`</span><span class="token punctuation">)</span>
			w<span class="token punctuation">.</span><span class="token function">WriteHeader</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusUnauthorized<span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// 验证通过</span>
		<span class="token function">handler</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 监听地址</span>
	addr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:80"</span>

	<span class="token comment">// 实例化请求多路复用器</span>
	mux <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewServeMux</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 注册路由</span>
	mux<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token function">BasicAuth</span><span class="token punctuation">(</span>indexHandler<span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// 启动服务</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"* Running on http://"</span> <span class="token operator">+</span> addr<span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span>addr<span class="token punctuation">,</span> mux<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h4 id="basic-auth认证之handle装饰器" tabindex="-1"><a class="header-anchor" href="#basic-auth认证之handle装饰器" aria-hidden="true">#</a> Basic Auth认证之Handle装饰器</h4>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"encoding/base64"</span>
	<span class="token string">"errors"</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
	<span class="token string">"strings"</span>
<span class="token punctuation">)</span>

<span class="token comment">// 处理器</span>
<span class="token keyword">func</span> <span class="token function">indexHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">"Hello, world!\n"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// Base64解密</span>
<span class="token keyword">func</span> <span class="token function">BasicAuthDecodeString</span><span class="token punctuation">(</span>auth <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>plaintext <span class="token builtin">string</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	authSlice <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>auth<span class="token punctuation">,</span> <span class="token string">" "</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>authSlice<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">2</span> <span class="token operator">||</span> authSlice<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token string">"Basic"</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token string">""</span><span class="token punctuation">,</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"Basic auth format error"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	p<span class="token punctuation">,</span> err <span class="token operator">:=</span> base64<span class="token punctuation">.</span>StdEncoding<span class="token punctuation">.</span><span class="token function">DecodeString</span><span class="token punctuation">(</span>authSlice<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token function">string</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">,</span> err
<span class="token punctuation">}</span>

<span class="token comment">// 用户验证</span>
<span class="token keyword">func</span> <span class="token function">BasicAuthVerifyUser</span><span class="token punctuation">(</span>plaintext <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
	users <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"root:123456"</span><span class="token punctuation">,</span> <span class="token string">"admin:654321"</span><span class="token punctuation">}</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> users <span class="token punctuation">{</span>
		<span class="token keyword">if</span> v <span class="token operator">==</span> plaintext <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">true</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>

<span class="token comment">// BasicAuth装饰器</span>
<span class="token keyword">func</span> <span class="token function">BasicAuth</span><span class="token punctuation">(</span>handler <span class="token keyword">func</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span><span class="token punctuation">)</span> http<span class="token punctuation">.</span>Handler <span class="token punctuation">{</span>
	<span class="token comment">// 这一段判断是从原始的HandleFunc中提取出来的，是为了与不加装饰器一致的行为</span>
	<span class="token comment">// 如果传入了nil，在启动阶段就会报错的行为</span>
	<span class="token keyword">if</span> handler <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"http: nil handler"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 返回一个handler</span>
	<span class="token keyword">return</span> http<span class="token punctuation">.</span><span class="token function">HandlerFunc</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 获取Basic Auth认证凭证</span>
		auth <span class="token operator">:=</span> r<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">"Authorization"</span><span class="token punctuation">)</span> <span class="token comment">//获取Basic base64加密后的字段</span>

		<span class="token comment">// 验证失败</span>
		plaintext<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">BasicAuthDecodeString</span><span class="token punctuation">(</span>auth<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			w<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"WWW-Authenticate"</span><span class="token punctuation">,</span> <span class="token string">`Basic realm="`</span><span class="token operator">+</span>err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">`"`</span><span class="token punctuation">)</span>
			w<span class="token punctuation">.</span><span class="token function">WriteHeader</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusUnauthorized<span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 用户名密码验证失败</span>
		<span class="token keyword">if</span> <span class="token operator">!</span><span class="token function">BasicAuthVerifyUser</span><span class="token punctuation">(</span>plaintext<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			w<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"WWW-Authenticate"</span><span class="token punctuation">,</span> <span class="token string">`Basic realm="用户名或密码错误"`</span><span class="token punctuation">)</span>
			w<span class="token punctuation">.</span><span class="token function">WriteHeader</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusUnauthorized<span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 验证通过,调用原始handler方法</span>
		<span class="token function">handler</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 监听地址</span>
	addr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:80"</span>

	<span class="token comment">// 实例化请求多路复用器</span>
	mux <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewServeMux</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 注册路由 - handler封装</span>
	mux<span class="token punctuation">.</span><span class="token function">Handle</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token function">BasicAuth</span><span class="token punctuation">(</span>indexHandler<span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// 启动服务</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"* Running on http://"</span> <span class="token operator">+</span> addr<span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span>addr<span class="token punctuation">,</span> mux<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h3 id="servemux" tabindex="-1"><a class="header-anchor" href="#servemux" aria-hidden="true">#</a> ServeMux</h3>
<h4 id="结构体定义" tabindex="-1"><a class="header-anchor" href="#结构体定义" aria-hidden="true">#</a> 结构体定义</h4>
<p>ServeMux主要用来存储路由与Handler之间的映射关系</p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">type</span> ServeMux <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	mu    sync<span class="token punctuation">.</span>RWMutex			<span class="token comment">// 读写锁</span>
	m     <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>muxEntry	<span class="token comment">// map中存储路由与Handler</span>
	es    <span class="token punctuation">[</span><span class="token punctuation">]</span>muxEntry <span class="token comment">// slice of entries sorted from longest to shortest.</span>
    				 <span class="token comment">// 路由从长到短排序，这个字段和路由匹配有关系，后面再说</span>
	hosts <span class="token builtin">bool</span>       <span class="token comment">// whether any patterns contain hostnames // 模式是否包含主机名，比如/abc是不包含主机名的，test.com/abc是包含主机名的</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> muxEntry <span class="token keyword">struct</span> <span class="token punctuation">{</span>	<span class="token comment">// 主要存储Handler，并且又加上了路由，用于方便后续操作</span>
	h       Handler
	pattern <span class="token builtin">string</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="路由注册逻辑" tabindex="-1"><a class="header-anchor" href="#路由注册逻辑" aria-hidden="true">#</a> 路由注册逻辑</h4>
<p>当我们调用<code v-pre>mux.HandleFunc</code>或<code v-pre>mux.Handle</code>进行路由注册的时候，最终调用的都是<code v-pre>Handle</code>函数</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token comment">// Handle registers the handler for the given pattern.</span>
<span class="token comment">// If a handler already exists for pattern, Handle panics.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>mux <span class="token operator">*</span>ServeMux<span class="token punctuation">)</span> <span class="token function">Handle</span><span class="token punctuation">(</span>pattern <span class="token builtin">string</span><span class="token punctuation">,</span> handler Handler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 加写锁</span>
	mux<span class="token punctuation">.</span>mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> mux<span class="token punctuation">.</span>mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// 传入的参数不允许为空</span>
	<span class="token keyword">if</span> pattern <span class="token operator">==</span> <span class="token string">""</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"http: invalid pattern"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> handler <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"http: nil handler"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
    
    <span class="token comment">// 路由若已经注册，则会报错</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> exist <span class="token operator">:=</span> mux<span class="token punctuation">.</span>m<span class="token punctuation">[</span>pattern<span class="token punctuation">]</span><span class="token punctuation">;</span> exist <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"http: multiple registrations for "</span> <span class="token operator">+</span> pattern<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

    <span class="token comment">// 字典为空则初始化</span>
	<span class="token keyword">if</span> mux<span class="token punctuation">.</span>m <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		mux<span class="token punctuation">.</span>m <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>muxEntry<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
    
    <span class="token comment">// 生成条目并添加到字典中</span>
	e <span class="token operator">:=</span> muxEntry<span class="token punctuation">{</span>h<span class="token punctuation">:</span> handler<span class="token punctuation">,</span> pattern<span class="token punctuation">:</span> pattern<span class="token punctuation">}</span>
	mux<span class="token punctuation">.</span>m<span class="token punctuation">[</span>pattern<span class="token punctuation">]</span> <span class="token operator">=</span> e
    
    <span class="token comment">// 如果模式最后一个字符是/，即/login/、/user/这种路由的情况下</span>
    <span class="token comment">// 将元素有序的插入到切片中，如何有序插入，看appendSorted源码</span>
	<span class="token keyword">if</span> pattern<span class="token punctuation">[</span><span class="token function">len</span><span class="token punctuation">(</span>pattern<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token char">'/'</span> <span class="token punctuation">{</span>
		mux<span class="token punctuation">.</span>es <span class="token operator">=</span> <span class="token function">appendSorted</span><span class="token punctuation">(</span>mux<span class="token punctuation">.</span>es<span class="token punctuation">,</span> e<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

    <span class="token comment">// 如果模式第一个字符不是/，那么就代表模式包含主机名，设置hosts属性为true,否则为false(bool类型零值)</span>
	<span class="token keyword">if</span> pattern<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token char">'/'</span> <span class="token punctuation">{</span>
		mux<span class="token punctuation">.</span>hosts <span class="token operator">=</span> <span class="token boolean">true</span>
	<span class="token punctuation">}</span>
    
    <span class="token comment">// 如果路由不是以/结尾的话，是不会插入到es切片中的，这就比较有意思了，具体有啥用，后面路由匹配再说，这里先了解注册规则</span>
<span class="token punctuation">}</span>

<span class="token comment">// ------------------------------------------------------------------</span>
<span class="token keyword">func</span> <span class="token function">appendSorted</span><span class="token punctuation">(</span>es <span class="token punctuation">[</span><span class="token punctuation">]</span>muxEntry<span class="token punctuation">,</span> e muxEntry<span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>muxEntry <span class="token punctuation">{</span>
    <span class="token comment">// 返回切片中比【新追加元素的长度】小的最小的索引，如果这个看不太懂，可以看一下下面关于sort.Search部分的讲解</span>
	n <span class="token operator">:=</span> <span class="token function">len</span><span class="token punctuation">(</span>es<span class="token punctuation">)</span>
	i <span class="token operator">:=</span> sort<span class="token punctuation">.</span><span class="token function">Search</span><span class="token punctuation">(</span>n<span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token function">len</span><span class="token punctuation">(</span>es<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>pattern<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>pattern<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
    
    <span class="token comment">// 如果没有找到，则会切片末尾追加元素</span>
	<span class="token keyword">if</span> i <span class="token operator">==</span> n <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token function">append</span><span class="token punctuation">(</span>es<span class="token punctuation">,</span> e<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
    
    <span class="token comment">// 若找到了，意味着需要在切片中间，准备来说就是索引为i的地方追加元素</span>
	es <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>es<span class="token punctuation">,</span> muxEntry<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// 在末尾追加一个空元素，占位和若切片需要扩容则尽早扩容</span>
	<span class="token function">copy</span><span class="token punctuation">(</span>es<span class="token punctuation">[</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">,</span> es<span class="token punctuation">[</span>i<span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">)</span>      <span class="token comment">// 把索引i及后面的都向后移动一位</span>
	es<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> e					<span class="token comment">// 索引i赋值</span>
	<span class="token keyword">return</span> es					<span class="token comment">// 返回切片</span>
<span class="token punctuation">}</span>

<span class="token comment">// ------------------------------------------------------------------</span>
<span class="token comment">// 示例1</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>	
	<span class="token comment">// 使用二分查找，输出序列中值小于300的最小的索引号</span>
	a <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">500</span><span class="token punctuation">,</span> <span class="token number">400</span><span class="token punctuation">,</span> <span class="token number">300</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">}</span>
	b <span class="token operator">:=</span> sort<span class="token punctuation">.</span><span class="token function">Search</span><span class="token punctuation">(</span><span class="token function">len</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> a<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&lt;</span> <span class="token number">300</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 示例2</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	a <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span>
		<span class="token string">"/a/b/c/d/e/"</span><span class="token punctuation">,</span>
		<span class="token string">"/a/b/c/d/"</span><span class="token punctuation">,</span>
		<span class="token string">"/a/b/"</span><span class="token punctuation">,</span>
		<span class="token string">"/a/"</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	item <span class="token operator">:=</span> <span class="token string">"/a/b/c/"</span>
	b <span class="token operator">:=</span> sort<span class="token punctuation">.</span><span class="token function">Search</span><span class="token punctuation">(</span><span class="token function">len</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token function">len</span><span class="token punctuation">(</span>a<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p><strong>总结</strong></p>
<p>进行路由注册时分为两种情况：</p>
<p>一、路由以<code v-pre>/</code>结尾的：</p>
<p>（1）将路由与Handler映射添加到<code v-pre>ServeMux.m</code>字典中</p>
<p>（2）将<code v-pre>Entry</code>有序插入到<code v-pre>ServeMux.es</code>切片中，注意这里是有序插入，按照路由字符串的长度从长至短排序</p>
<p>二、路由以不以<code v-pre>/</code>结尾的：</p>
<p>（1）将路由与Handler映射添加到<code v-pre>ServeMux.m</code>字典中</p>
<h4 id="路由匹配1-精确匹配和前缀匹配" tabindex="-1"><a class="header-anchor" href="#路由匹配1-精确匹配和前缀匹配" aria-hidden="true">#</a> 路由匹配1：精确匹配和前缀匹配</h4>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token comment">// Find a handler on a handler map given a path string.</span>
<span class="token comment">// Most-specific (longest) pattern wins.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>mux <span class="token operator">*</span>ServeMux<span class="token punctuation">)</span> <span class="token function">match</span><span class="token punctuation">(</span>path <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>h Handler<span class="token punctuation">,</span> pattern <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// Check for exact match first.</span>
    <span class="token comment">// 首先检查字典的是否匹配，匹配到直接返回</span>
    <span class="token comment">// 这里是精确匹配，很容易理解，注册的时候是什么就匹配什么</span>
	v<span class="token punctuation">,</span> ok <span class="token operator">:=</span> mux<span class="token punctuation">.</span>m<span class="token punctuation">[</span>path<span class="token punctuation">]</span>
	<span class="token keyword">if</span> ok <span class="token punctuation">{</span>
		<span class="token keyword">return</span> v<span class="token punctuation">.</span>h<span class="token punctuation">,</span> v<span class="token punctuation">.</span>pattern
	<span class="token punctuation">}</span>
    
	<span class="token comment">// Check for longest valid match.  mux.es contains all patterns</span>
	<span class="token comment">// that end in / sorted from longest to shortest.</span>
    <span class="token comment">// 若上面没有匹配到，则与mux.es中存储的所有以尾斜杠的进行匹配，它是从长到短存储的，最新匹配到就返回</span>

    <span class="token comment">// 若注册的路由有下面几条：</span>
    <span class="token comment">// /a/b/c/</span>
    <span class="token comment">// /a/b/</span>
    <span class="token comment">// 那么：</span>
    <span class="token comment">// (1) 访问/a/b/d的时候，会优先匹配到/a/b/，所以就会访问/a/b/</span>
    <span class="token comment">// (2) 访问/a/b的时候，其实是不能访问到上面任意一条路由的，因为前缀并不匹配</span>
    <span class="token comment">//     如果我想访问/a/b的时候也能访问到/a/b/，那该怎么弄呢？别着急，下面我们来测试一下</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> e <span class="token operator">:=</span> <span class="token keyword">range</span> mux<span class="token punctuation">.</span>es <span class="token punctuation">{</span>
		<span class="token keyword">if</span> strings<span class="token punctuation">.</span><span class="token function">HasPrefix</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> e<span class="token punctuation">.</span>pattern<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> e<span class="token punctuation">.</span>h<span class="token punctuation">,</span> e<span class="token punctuation">.</span>pattern
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> <span class="token string">""</span>
<span class="token punctuation">}</span>
</code></pre></div><p>服务端代码</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
<span class="token punctuation">)</span>

<span class="token comment">// 处理器</span>
<span class="token keyword">func</span> <span class="token function">abHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">"注册为/a/b/"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">abcHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">"注册为/a/b/c/"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 监听地址</span>
	addr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:80"</span>

	<span class="token comment">// 实例化请求多路复用器</span>
	mux <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewServeMux</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 注册路由，注册的时候是不用管注册顺序问题的，内部会自动排序写入</span>
	mux<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/a/b/"</span><span class="token punctuation">,</span> abHandler<span class="token punctuation">)</span>
	mux<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/a/b/c/"</span><span class="token punctuation">,</span> abcHandler<span class="token punctuation">)</span>

	<span class="token comment">// 启动服务</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"* Running on http://"</span> <span class="token operator">+</span> addr<span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span>addr<span class="token punctuation">,</span> mux<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>路由匹配测试</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 注册什么就访问什么(尾斜杠保持一致)，符合预期</span>
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token operator">></span>curl http://127.0.0.1/a/b/
注册为/a/b/
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token operator">></span>curl http://127.0.0.1/a/b/c/
注册为/a/b/c/

<span class="token comment"># 访问/a/b/d/</span>
<span class="token comment"># 它只能匹配到前缀为/a/b/的路由，所以会输出"注册为/a/b/"</span>
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token operator">></span>curl http://127.0.0.1/a/b/d
注册为/a/b/
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token operator">></span>curl http://127.0.0.1/a/b/d/
注册为/a/b/

<span class="token comment"># 访问/a/b/c/d</span>
<span class="token comment"># ServeMux.es是按照从长到短存储路由的，所以会优先匹配到/a/b/c/</span>
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token operator">></span>curl http://127.0.0.1/a/b/c/d
注册为/a/b/c/

<span class="token comment"># 关键的来了 -----------------------------------------------------------------</span>
<span class="token comment"># 访问/a/b会有什么结果呢？按道理来说，精确匹配是匹配不到的，按前缀匹配也是匹配不到的，应该返回404,是这样吗？</span>
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token operator">></span>curl http://127.0.0.1/a/b
<span class="token operator">&lt;</span>a <span class="token assign-left variable">href</span><span class="token operator">=</span><span class="token string">"/a/b/"</span><span class="token operator">></span>Moved Permanently<span class="token operator">&lt;</span>/a<span class="token operator">></span>.				<span class="token comment"># 发生重定向了</span>

C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token operator">></span>curl http://127.0.0.1/a/b -I <span class="token comment"># 看一下响应头详情</span>
HTTP/1.1 <span class="token number">301</span> Moved Permanently						<span class="token comment"># 301永久重定向</span>
Content-Type: text/html<span class="token punctuation">;</span> <span class="token assign-left variable">charset</span><span class="token operator">=</span>utf-8
Location: /a/b/										<span class="token comment"># 让我们重定向到/a/b/,重定向后就属于精确匹配了</span>
Date: Mon, 02 May <span class="token number">2022</span> 08:14:06 GMT

<span class="token comment"># 如果是在浏览器中访问，浏览器会自动处理重定向，使用curl的话只需要添加-L参数，会自动访问重定向的地址</span>
<span class="token comment"># 所以又看见熟悉的/a/b/了</span>
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token operator">></span>curl http://127.0.0.1/a/b -L
注册为/a/b/
</code></pre></div><h4 id="路由匹配2-重定向规则" tabindex="-1"><a class="header-anchor" href="#路由匹配2-重定向规则" aria-hidden="true">#</a> 路由匹配2：重定向规则</h4>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token comment">// redirectToPathSlash determines if the given path needs appending "/" to it.</span>
<span class="token comment">// redirectToPathSlash函数用于确认是否要给路由添加尾斜杠/</span>

<span class="token comment">// This occurs when a handler for path + "/" was already registered, but</span>
<span class="token comment">// not for path itself. If the path needs appending to, it creates a new</span>
<span class="token comment">// URL, setting the path to u.Path + "/" and returning true to indicate so.</span>
<span class="token comment">// 什么时候应该发生重定向呢？</span>
<span class="token comment">// 就是带尾斜杠的路由已经注册了，但是不带尾斜杠的路由并没有注册，也就是说/a/b/注册了，但是/a/b没有注册的情况下</span>
<span class="token comment">// 这个逻辑在另一个函数shouldRedirectRLocked中</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>mux <span class="token operator">*</span>ServeMux<span class="token punctuation">)</span> <span class="token function">redirectToPathSlash</span><span class="token punctuation">(</span>host<span class="token punctuation">,</span> path <span class="token builtin">string</span><span class="token punctuation">,</span> u <span class="token operator">*</span>url<span class="token punctuation">.</span>URL<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>url<span class="token punctuation">.</span>URL<span class="token punctuation">,</span> <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	mux<span class="token punctuation">.</span>mu<span class="token punctuation">.</span><span class="token function">RLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	shouldRedirect <span class="token operator">:=</span> mux<span class="token punctuation">.</span><span class="token function">shouldRedirectRLocked</span><span class="token punctuation">(</span>host<span class="token punctuation">,</span> path<span class="token punctuation">)</span>
	mux<span class="token punctuation">.</span>mu<span class="token punctuation">.</span><span class="token function">RUnlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token operator">!</span>shouldRedirect <span class="token punctuation">{</span>
		<span class="token keyword">return</span> u<span class="token punctuation">,</span> <span class="token boolean">false</span>
	<span class="token punctuation">}</span>
	path <span class="token operator">=</span> path <span class="token operator">+</span> <span class="token string">"/"</span>
	u <span class="token operator">=</span> <span class="token operator">&amp;</span>url<span class="token punctuation">.</span>URL<span class="token punctuation">{</span>Path<span class="token punctuation">:</span> path<span class="token punctuation">,</span> RawQuery<span class="token punctuation">:</span> u<span class="token punctuation">.</span>RawQuery<span class="token punctuation">}</span>
	<span class="token keyword">return</span> u<span class="token punctuation">,</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>

<span class="token comment">// ---------------------------------------------------------------------------------------</span>
<span class="token comment">// shouldRedirectRLocked reports whether the given path and host should be redirected to</span>
<span class="token comment">// path+"/". This should happen if a handler is registered for path+"/" but</span>
<span class="token comment">// not path -- see comments at ServeMux.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>mux <span class="token operator">*</span>ServeMux<span class="token punctuation">)</span> <span class="token function">shouldRedirectRLocked</span><span class="token punctuation">(</span>host<span class="token punctuation">,</span> path <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
	<span class="token comment">// 路由字符串，包含不带主机名的和带主机名的</span>
    p <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span>path<span class="token punctuation">,</span> host <span class="token operator">+</span> path<span class="token punctuation">}</span>

    <span class="token comment">// 如果该路由已经注册了，则返回false，代表不应该重定向</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> c <span class="token operator">:=</span> <span class="token keyword">range</span> p <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> exist <span class="token operator">:=</span> mux<span class="token punctuation">.</span>m<span class="token punctuation">[</span>c<span class="token punctuation">]</span><span class="token punctuation">;</span> exist <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">false</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

    <span class="token comment">// 路由为空直接返回false</span>
	n <span class="token operator">:=</span> <span class="token function">len</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span>
	<span class="token keyword">if</span> n <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">false</span>
	<span class="token punctuation">}</span>
    <span class="token comment">// 构造出一个带尾斜杠的路由，如果存在，</span>
    <span class="token comment">// 如果原路由最后一个字符是/，则返回false，否则返回true</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> c <span class="token operator">:=</span> <span class="token keyword">range</span> p <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> exist <span class="token operator">:=</span> mux<span class="token punctuation">.</span>m<span class="token punctuation">[</span>c<span class="token operator">+</span><span class="token string">"/"</span><span class="token punctuation">]</span><span class="token punctuation">;</span> exist <span class="token punctuation">{</span>
			<span class="token keyword">return</span> path<span class="token punctuation">[</span>n<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token char">'/'</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

    <span class="token comment">// 默认返回false</span>
	<span class="token keyword">return</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>
</code></pre></div><p>总结</p>
<p>（1）就是说<code v-pre>/a/b/</code>注册了，但是<code v-pre>/a/b</code>没有注册的情况下就会发生重定向</p>
<p>（2）如果不想让它重定向，也有办法，就是把<code v-pre>/a/b</code>也注册一遍</p>
<h4 id="路由匹配3-带主机名的路由" tabindex="-1"><a class="header-anchor" href="#路由匹配3-带主机名的路由" aria-hidden="true">#</a> 路由匹配3：带主机名的路由</h4>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
<span class="token punctuation">)</span>

<span class="token comment">// 处理器</span>
<span class="token keyword">func</span> <span class="token function">orgLoginHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">"orgLoginHandler"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">comLoginHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">"comLoginHandler"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 监听地址</span>
	addr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:80"</span>

	<span class="token comment">// 实例化请求多路复用器</span>
	mux <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewServeMux</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 注册路由（带主机名）</span>
	mux<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"test.org/login/"</span><span class="token punctuation">,</span> orgLoginHandler<span class="token punctuation">)</span>
	mux<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"test.com/login/"</span><span class="token punctuation">,</span> comLoginHandler<span class="token punctuation">)</span>

	<span class="token comment">// 启动服务</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"* Running on http://"</span> <span class="token operator">+</span> addr<span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span>addr<span class="token punctuation">,</span> mux<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>测试</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 访问127.0.0.1,报错404</span>
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token operator">></span>curl http://127.0.0.1/login/
<span class="token number">404</span> page not found

<span class="token comment"># 访问带主机名的路由</span>
<span class="token comment"># 提前修改好好hosts文件</span>
<span class="token comment"># 127.0.0.1       	test.org</span>
<span class="token comment"># 127.0.0.1       	test.com</span>
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token operator">></span>curl http://test.org/login/
orgLoginHandler
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token operator">></span>curl http://test.com/login/
comLoginHandler

<span class="token comment"># 访问不带尾斜杠的路由，发生重定向</span>
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token operator">></span>curl http://test.com/login
<span class="token operator">&lt;</span>a <span class="token assign-left variable">href</span><span class="token operator">=</span><span class="token string">"/login/"</span><span class="token operator">></span>Moved Permanently<span class="token operator">&lt;</span>/a<span class="token operator">></span>.
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token operator">></span>curl http://test.com/login -L
comLoginHandler
</code></pre></div><h4 id="路由匹配4-总结" tabindex="-1"><a class="header-anchor" href="#路由匹配4-总结" aria-hidden="true">#</a> 路由匹配4：总结</h4>
<p>注册路由时应该带不带尾斜杠呢？</p>
<p>（1）如果不带尾斜杠的话只能精确匹配，即注册<code v-pre>/a/b</code>访问<code v-pre>/a/b/</code>会返回<code v-pre>404</code>，这样不太友好</p>
<p>（2）如果带尾斜杠的话，即注册<code v-pre>/a/b/</code>访问<code v-pre>/a/b</code>时：</p>
<ul>
<li>
<p>重定向问题</p>
<ul>
<li>
<p>默认会触发<code v-pre>301</code>重定向，如果不想重定向，可以把<code v-pre>/a/b</code>也注册一遍</p>
</li>
<li>
<p>写代码/脚本的时候注意允许重定向或直接写带尾斜杠的<code v-pre>URL</code>，比如<code v-pre>curl -L</code></p>
</li>
</ul>
</li>
<li>
<p>访问<code v-pre>/a/b/d</code>也会访问到<code v-pre>/a/b/</code>，这一点需要特别注意，如果不想要这个功能的话，粗暴的解决办法是直接将标准库<code v-pre>net/http</code>中的代码注释掉</p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>mux <span class="token operator">*</span>ServeMux<span class="token punctuation">)</span> <span class="token function">match</span><span class="token punctuation">(</span>path <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>h Handler<span class="token punctuation">,</span> pattern <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span>

	<span class="token comment">// Check for exact match first.</span>
	v<span class="token punctuation">,</span> ok <span class="token operator">:=</span> mux<span class="token punctuation">.</span>m<span class="token punctuation">[</span>path<span class="token punctuation">]</span>
	<span class="token keyword">if</span> ok <span class="token punctuation">{</span>
		<span class="token keyword">return</span> v<span class="token punctuation">.</span>h<span class="token punctuation">,</span> v<span class="token punctuation">.</span>pattern
	<span class="token punctuation">}</span>
    
	<span class="token comment">// Check for longest valid match.  mux.es contains all patterns</span>
	<span class="token comment">// that end in / sorted from longest to shortest.</span>
    <span class="token comment">// 下面这一段代码注释掉</span>
	<span class="token comment">//for _, e := range mux.es {</span>
	<span class="token comment">//	if strings.HasPrefix(path, e.pattern) {</span>
	<span class="token comment">//		return e.h, e.pattern</span>
	<span class="token comment">//	}</span>
	<span class="token comment">//}</span>

	<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> <span class="token string">""</span>
<span class="token punctuation">}</span>
</code></pre></div></li>
</ul>
<h3 id="server" tabindex="-1"><a class="header-anchor" href="#server" aria-hidden="true">#</a> Server</h3>
<h4 id="自定义server" tabindex="-1"><a class="header-anchor" href="#自定义server" aria-hidden="true">#</a> 自定义Server</h4>
<p>查看<code v-pre>http.ListenAndServe</code>源码</p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token comment">// ListenAndServe listens on the TCP network address addr and then calls</span>
<span class="token comment">// Serve with handler to handle requests on incoming connections.</span>
<span class="token comment">// Accepted connections are configured to enable TCP keep-alives.</span>
<span class="token comment">//</span>
<span class="token comment">// The handler is typically nil, in which case the DefaultServeMux is used.</span>
<span class="token comment">//</span>
<span class="token comment">// ListenAndServe always returns a non-nil error.</span>
<span class="token keyword">func</span> <span class="token function">ListenAndServe</span><span class="token punctuation">(</span>addr <span class="token builtin">string</span><span class="token punctuation">,</span> handler Handler<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	server <span class="token operator">:=</span> <span class="token operator">&amp;</span>Server<span class="token punctuation">{</span>Addr<span class="token punctuation">:</span> addr<span class="token punctuation">,</span> Handler<span class="token punctuation">:</span> handler<span class="token punctuation">}</span>
	<span class="token keyword">return</span> server<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>所以我们也可以使用自己的Server</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
<span class="token punctuation">)</span>

<span class="token comment">// 处理器</span>
<span class="token keyword">func</span> <span class="token function">indexHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">"Hello, world!\n"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 监听地址</span>
	addr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:80"</span>

	<span class="token comment">// 实例化请求多路复用器</span>
	mux <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewServeMux</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 注册路由</span>
	mux<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> indexHandler<span class="token punctuation">)</span>

	<span class="token comment">// 实例化Server</span>
	server <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Server<span class="token punctuation">{</span>Addr<span class="token punctuation">:</span> addr<span class="token punctuation">,</span> Handler<span class="token punctuation">:</span> mux<span class="token punctuation">}</span>

	<span class="token comment">// 启动服务</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"* Running on http://"</span> <span class="token operator">+</span> addr<span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>server<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h4 id="server超时配置" tabindex="-1"><a class="header-anchor" href="#server超时配置" aria-hidden="true">#</a> Server超时配置</h4>
<table>
<thead>
<tr>
<th>参数</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>ReadTimeout</code></td>
<td>服务端读取客户端请求超时时间，包含请求头和请求体；0代表永不超时</td>
</tr>
<tr>
<td><code v-pre>ReadHeaderTimeout</code></td>
<td>服务端读取客户端请求超时时间，，包含请求头；0代表永不超时</td>
</tr>
<tr>
<td><code v-pre>WriteTimeout</code></td>
<td>服务端响应超时时间，即<code v-pre>Handler</code>超时时间，如果发生超时，则什么也不返回；0代表永不超时</td>
</tr>
<tr>
<td><code v-pre>IdleTimeout</code></td>
<td>连接池中空闲连接超时时间，如果没有设置会使用<code v-pre>ReadTimeout</code>的值，如果<code v-pre>ReadTimeout</code>也没有设置，则代表永不超时</td>
</tr>
</tbody>
</table>
<p>关于超时问题，这里有一篇文章很好：<a href="https://segmentfault.com/a/1190000023635278" target="_blank" rel="noopener noreferrer">https://segmentfault.com/a/1190000023635278<ExternalLinkIcon/></a></p>
<h4 id="server优雅关闭" tabindex="-1"><a class="header-anchor" href="#server优雅关闭" aria-hidden="true">#</a> Server优雅关闭</h4>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"context"</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"io"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
	<span class="token string">"os"</span>
	<span class="token string">"os/signal"</span>
	<span class="token string">"syscall"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token comment">// Handler</span>
<span class="token keyword">func</span> <span class="token function">indexHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Received a request"</span><span class="token punctuation">)</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">8</span><span class="token punctuation">)</span> <span class="token comment">// 模式处理一个长时间的请求</span>
	io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">"Welcome to Go!\n"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 信号监听</span>
<span class="token keyword">func</span> <span class="token function">SignalEvent</span><span class="token punctuation">(</span>server <span class="token operator">*</span>http<span class="token punctuation">.</span>Server<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 注册信号</span>
	interrupt <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> os<span class="token punctuation">.</span>Signal<span class="token punctuation">)</span>
	reload <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> os<span class="token punctuation">.</span>Signal<span class="token punctuation">)</span>

    <span class="token comment">// 退出信号</span>
	signal<span class="token punctuation">.</span><span class="token function">Notify</span><span class="token punctuation">(</span>
		interrupt<span class="token punctuation">,</span>
		syscall<span class="token punctuation">.</span>SIGINT<span class="token punctuation">,</span>  <span class="token comment">// kill -2 || Ctrl+C</span>
		syscall<span class="token punctuation">.</span>SIGQUIT<span class="token punctuation">,</span> <span class="token comment">// kill -3 || Ctrl+\</span>
		syscall<span class="token punctuation">.</span>SIGTERM<span class="token punctuation">,</span> <span class="token comment">// kill -15</span>
	<span class="token punctuation">)</span>
    
    <span class="token comment">// 重载配置</span>
	signal<span class="token punctuation">.</span><span class="token function">Notify</span><span class="token punctuation">(</span>reload<span class="token punctuation">,</span> syscall<span class="token punctuation">.</span>SIGHUP<span class="token punctuation">)</span> <span class="token comment">// kill -1</span>

	<span class="token comment">// 监听信号</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		<span class="token keyword">select</span> <span class="token punctuation">{</span>		
		<span class="token keyword">case</span> <span class="token operator">&lt;-</span>interrupt<span class="token punctuation">:</span>
			<span class="token function">Shutdown</span><span class="token punctuation">(</span>server<span class="token punctuation">,</span> time<span class="token punctuation">.</span>Second<span class="token operator">*</span><span class="token number">10</span><span class="token punctuation">)</span>		
		<span class="token keyword">case</span> <span class="token operator">&lt;-</span>reload<span class="token punctuation">:</span>
			<span class="token function">Reload</span><span class="token punctuation">(</span>server<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 优雅关闭</span>
<span class="token keyword">func</span> <span class="token function">Shutdown</span><span class="token punctuation">(</span>server <span class="token operator">*</span>http<span class="token punctuation">.</span>Server<span class="token punctuation">,</span> timeout time<span class="token punctuation">.</span>Duration<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Waiting for the remaining connections to finish..."</span><span class="token punctuation">)</span>
	ctx<span class="token punctuation">,</span> cancel <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">WithTimeout</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> timeout<span class="token punctuation">)</span>
	<span class="token keyword">defer</span> <span class="token function">cancel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	err <span class="token operator">:=</span> server<span class="token punctuation">.</span><span class="token function">Shutdown</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"HTTP Server graceful shutdown failed: "</span> <span class="token operator">+</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"HTTP Server forced shutdown successfully"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"HTTP Server gracefully shutdown successfully"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 重载配置</span>
<span class="token keyword">func</span> <span class="token function">Reload</span><span class="token punctuation">(</span>server <span class="token operator">*</span>http<span class="token punctuation">.</span>Server<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Reload"</span><span class="token punctuation">)</span>
	server<span class="token punctuation">.</span>WriteTimeout <span class="token operator">=</span> time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">10</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 初始化Server</span>
	addr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:80"</span>
	mux <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewServeMux</span><span class="token punctuation">(</span><span class="token punctuation">)</span>                        <span class="token comment">// 实例化请求多路复用器</span>
	mux<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> indexHandler<span class="token punctuation">)</span>                <span class="token comment">// 注册路由</span>
	server <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Server<span class="token punctuation">{</span>Addr<span class="token punctuation">:</span> addr<span class="token punctuation">,</span> Handler<span class="token punctuation">:</span> mux<span class="token punctuation">}</span> <span class="token comment">// 创建Server</span>

	<span class="token comment">// 启动Server</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"* Running on http://"</span> <span class="token operator">+</span> addr<span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Current PID: "</span><span class="token punctuation">,</span> os<span class="token punctuation">.</span><span class="token function">Getpid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		err <span class="token operator">:=</span> server<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> http<span class="token punctuation">.</span>ErrServerClosed <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 监听Server信号</span>
	<span class="token function">SignalEvent</span><span class="token punctuation">(</span>server<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h2 id="-1" tabindex="-1"><a class="header-anchor" href="#-1" aria-hidden="true">#</a> </h2>
<h2 id="gin" tabindex="-1"><a class="header-anchor" href="#gin" aria-hidden="true">#</a> Gin</h2>
<p>官网：<a href="https://gin-gonic.com/" target="_blank" rel="noopener noreferrer">https://gin-gonic.com/<ExternalLinkIcon/></a></p>
<p>Github：<a href="https://github.com/gin-gonic/gin" target="_blank" rel="noopener noreferrer">https://github.com/gin-gonic/gin<ExternalLinkIcon/></a></p>
<p>文档：</p>
<ul>
<li><a href="https://gin-gonic.com/zh-cn/docs/" target="_blank" rel="noopener noreferrer">https://gin-gonic.com/zh-cn/docs/<ExternalLinkIcon/></a></li>
<li><a href="https://pkg.go.dev/github.com/gin-gonic/gin" target="_blank" rel="noopener noreferrer">https://pkg.go.dev/github.com/gin-gonic/gin<ExternalLinkIcon/></a></li>
</ul>
<h3 id="基础示例-2" tabindex="-1"><a class="header-anchor" href="#基础示例-2" aria-hidden="true">#</a> 基础示例</h3>
<h4 id="安装gin" tabindex="-1"><a class="header-anchor" href="#安装gin" aria-hidden="true">#</a> 安装Gin</h4>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>go get -u github.com/gin-gonic/gin
</code></pre></div><h4 id="基础示例-3" tabindex="-1"><a class="header-anchor" href="#基础示例-3" aria-hidden="true">#</a> 基础示例</h4>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"github.com/gin-gonic/gin"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 监听地址</span>
	addr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:80"</span>

	<span class="token comment">// 实例化Gin路由引擎</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 注册路由</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> <span class="token string">"Hello Gin!\n"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// 启动Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="r-run-addr" tabindex="-1"><a class="header-anchor" href="#r-run-addr" aria-hidden="true">#</a> r.Run(addr)</h4>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>engine <span class="token operator">*</span>Engine<span class="token punctuation">)</span> <span class="token function">Run</span><span class="token punctuation">(</span>addr <span class="token operator">...</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>	<span class="token comment">// addr是可以不用传的</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token function">debugPrintError</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token keyword">if</span> engine<span class="token punctuation">.</span><span class="token function">isUnsafeTrustedProxies</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">debugPrint</span><span class="token punctuation">(</span><span class="token string">"[WARNING] You trusted all proxies, this is NOT safe. We recommend you to set a value.\n"</span> <span class="token operator">+</span>
			<span class="token string">"Please check https://pkg.go.dev/github.com/gin-gonic/gin#readme-don-t-trust-all-proxies for details."</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	address <span class="token operator">:=</span> <span class="token function">resolveAddress</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span>	<span class="token comment">// 看一下addr处理逻辑</span>
	<span class="token function">debugPrint</span><span class="token punctuation">(</span><span class="token string">"Listening and serving HTTP on %s\n"</span><span class="token punctuation">,</span> address<span class="token punctuation">)</span>
    <span class="token comment">// 可以看到，内部其实是调用了net/http的ListenAndServe</span>
    <span class="token comment">// 这里的engine就是我们上面gin.Default()的值r，它实现了http.Handler接口</span>
	err <span class="token operator">=</span> http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span>address<span class="token punctuation">,</span> engine<span class="token punctuation">)</span>
	<span class="token keyword">return</span>
<span class="token punctuation">}</span>

<span class="token comment">// --------------------------------------------------------------------------------------------</span>
<span class="token keyword">func</span> <span class="token function">resolveAddress</span><span class="token punctuation">(</span>addr <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">switch</span> <span class="token function">len</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">case</span> <span class="token number">0</span><span class="token punctuation">:</span> 
		<span class="token comment">// 如果没有传addr参数的话，尝试使用环境变量PORT的值</span>
		<span class="token keyword">if</span> port <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Getenv</span><span class="token punctuation">(</span><span class="token string">"PORT"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> port <span class="token operator">!=</span> <span class="token string">""</span> <span class="token punctuation">{</span>
			<span class="token function">debugPrint</span><span class="token punctuation">(</span><span class="token string">"Environment variable PORT=\"%s\""</span><span class="token punctuation">,</span> port<span class="token punctuation">)</span>
			<span class="token keyword">return</span> <span class="token string">":"</span> <span class="token operator">+</span> port
		<span class="token punctuation">}</span>
        <span class="token comment">// 若没有找到环境变量PORT，则默认使用:8080</span>
		<span class="token function">debugPrint</span><span class="token punctuation">(</span><span class="token string">"Environment variable PORT is undefined. Using port :8080 by default"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token string">":8080"</span>
	<span class="token keyword">case</span> <span class="token number">1</span><span class="token punctuation">:</span>
        <span class="token comment">// 如果传了addr参数，则默认返回</span>
		<span class="token keyword">return</span> addr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
	<span class="token keyword">default</span><span class="token punctuation">:</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"too many parameters"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// --------------------------------------------------------------------------------------------</span>
<span class="token comment">// 根据以上信息，我们在启动Server的时候也可以使用http.ListenAndServe</span>
<span class="token comment">// 启动Gin Server</span>
log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span>addr<span class="token punctuation">,</span> r<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre></div><h4 id="gin-default" tabindex="-1"><a class="header-anchor" href="#gin-default" aria-hidden="true">#</a> gin.Default()</h4>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>Engine <span class="token punctuation">{</span>
	<span class="token function">debugPrintWARNINGDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	engine <span class="token operator">:=</span> <span class="token function">New</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    engine<span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span><span class="token function">Logger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">Recovery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>	<span class="token comment">// 这里使用了两个中间件，Logger()和Recovery(),现在先不关心，往后看</span>
	<span class="token keyword">return</span> engine
<span class="token punctuation">}</span>

<span class="token comment">// ---------------------------------------------------------------------------------</span>
<span class="token comment">// ServeHTTP conforms to the http.Handler interface.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>engine <span class="token operator">*</span>Engine<span class="token punctuation">)</span> <span class="token function">ServeHTTP</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 往池子里取出一个Context</span>
    <span class="token comment">// engine.pool就是sync.Pool，临时内存池</span>
	c <span class="token operator">:=</span> engine<span class="token punctuation">.</span>pool<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>Context<span class="token punctuation">)</span>

    <span class="token comment">// Context对象初始化</span>
	c<span class="token punctuation">.</span>writermem<span class="token punctuation">.</span><span class="token function">reset</span><span class="token punctuation">(</span>w<span class="token punctuation">)</span>			
	c<span class="token punctuation">.</span>Request <span class="token operator">=</span> req
	c<span class="token punctuation">.</span><span class="token function">reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// 匹配URL并调用注册的Handler进行处理</span>
	engine<span class="token punctuation">.</span><span class="token function">handleHTTPRequest</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>

    <span class="token comment">// 处理完成后放回池子</span>
	engine<span class="token punctuation">.</span>pool<span class="token punctuation">.</span><span class="token function">Put</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// ---------------------------------------------------------------------------------</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>engine <span class="token operator">*</span>Engine<span class="token punctuation">)</span> <span class="token function">handleHTTPRequest</span><span class="token punctuation">(</span>c <span class="token operator">*</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	httpMethod <span class="token operator">:=</span> c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>Method	<span class="token comment">// 请求方法</span>
	rPath <span class="token operator">:=</span> c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>URL<span class="token punctuation">.</span>Path		<span class="token comment">// 请求Path</span>
	unescape <span class="token operator">:=</span> <span class="token boolean">false</span>
	<span class="token keyword">if</span> engine<span class="token punctuation">.</span>UseRawPath <span class="token operator">&amp;&amp;</span> <span class="token function">len</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>URL<span class="token punctuation">.</span>RawPath<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span> <span class="token punctuation">{</span>
		rPath <span class="token operator">=</span> c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>URL<span class="token punctuation">.</span>RawPath
		unescape <span class="token operator">=</span> engine<span class="token punctuation">.</span>UnescapePathValues
	<span class="token punctuation">}</span>

	<span class="token keyword">if</span> engine<span class="token punctuation">.</span>RemoveExtraSlash <span class="token punctuation">{</span>
		rPath <span class="token operator">=</span> <span class="token function">cleanPath</span><span class="token punctuation">(</span>rPath<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// Find root of the tree for the given HTTP method</span>
    <span class="token comment">// 从给出的HTTP方法找到root节点</span>
    
    <span class="token comment">// 路由树，具体信息后面看</span>
	t <span class="token operator">:=</span> engine<span class="token punctuation">.</span>trees						
    
    <span class="token comment">// 使用for循环遍历,这里的for循环使用是一个小技巧</span>
	<span class="token keyword">for</span> i<span class="token punctuation">,</span> tl <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> tl<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>	
		<span class="token keyword">if</span> t<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>method <span class="token operator">!=</span> httpMethod <span class="token punctuation">{</span>
			<span class="token keyword">continue</span>
		<span class="token punctuation">}</span>
		root <span class="token operator">:=</span> t<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>root
		<span class="token comment">// Find route in tree</span>
		value <span class="token operator">:=</span> root<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span>rPath<span class="token punctuation">,</span> c<span class="token punctuation">.</span>params<span class="token punctuation">,</span> c<span class="token punctuation">.</span>skippedNodes<span class="token punctuation">,</span> unescape<span class="token punctuation">)</span>
		<span class="token keyword">if</span> value<span class="token punctuation">.</span>params <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			c<span class="token punctuation">.</span>Params <span class="token operator">=</span> <span class="token operator">*</span>value<span class="token punctuation">.</span>params
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span> value<span class="token punctuation">.</span>handlers <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			c<span class="token punctuation">.</span>handlers <span class="token operator">=</span> value<span class="token punctuation">.</span>handlers
			c<span class="token punctuation">.</span>fullPath <span class="token operator">=</span> value<span class="token punctuation">.</span>fullPath
			c<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			c<span class="token punctuation">.</span>writermem<span class="token punctuation">.</span><span class="token function">WriteHeaderNow</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>
        <span class="token comment">// ...</span>
        
        
<span class="token comment">// ---------------------------------------------------------------------------------</span>
<span class="token comment">// for循环讨巧技巧</span>
        
<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 很多时候我们会这样遍历</span>
	nodes <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"hello"</span><span class="token punctuation">,</span> <span class="token string">"world"</span><span class="token punctuation">,</span> <span class="token string">"!"</span><span class="token punctuation">}</span>
	n <span class="token operator">:=</span> <span class="token function">len</span><span class="token punctuation">(</span>nodes<span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>nodes<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span> <span class="token comment">// 遍历完成后n还可以正常使用，说明对象还没有被销毁，还在占用内存</span>

	<span class="token comment">// 讨巧的技能</span>
	<span class="token comment">// (1) 少写了一行获取切片长度</span>
	<span class="token keyword">for</span> i<span class="token punctuation">,</span> n <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>nodes<span class="token punctuation">)</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>nodes<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">//fmt.Println(n)	// （2）n已经不能使用了，内存已释放</span>
	<span class="token comment">// 当外部不需要切片长度的时候，可以使用这个技巧</span>
<span class="token punctuation">}</span>   
        
<span class="token comment">// ---------------------------------------------------------------------------------</span>
<span class="token keyword">type</span> Engine <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    pool             sync<span class="token punctuation">.</span>Pool
    trees            methodTrees   <span class="token comment">// 看一下tress是啥</span>
    <span class="token comment">// ...    </span>
<span class="token punctuation">}</span>
        
<span class="token keyword">var</span> <span class="token boolean">_</span> IRouter <span class="token operator">=</span> <span class="token operator">&amp;</span>Engine<span class="token punctuation">{</span><span class="token punctuation">}</span>	       <span class="token comment">// 这里又是另外一个小技巧，实例化一下，但是又什么都不做，目的在于</span>
        						   <span class="token comment">// 在编译阶段就确保Engine实现了IRouter接口</span>
        						   <span class="token comment">//	type IRouter interface {</span>
								   <span class="token comment">//		IRoutes</span>
								   <span class="token comment">//		Group(string, ...HandlerFunc) *RouterGroup</span>
								   <span class="token comment">//	}</span>
        
<span class="token keyword">type</span> methodTrees <span class="token punctuation">[</span><span class="token punctuation">]</span>methodTree	<span class="token comment">// tress是一个切片 </span>

<span class="token keyword">type</span> methodTree <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	method <span class="token builtin">string</span>
	root   <span class="token operator">*</span>node
<span class="token punctuation">}</span>

<span class="token keyword">type</span> node <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	path      <span class="token builtin">string</span>
	indices   <span class="token builtin">string</span>
	wildChild <span class="token builtin">bool</span>
	nType     nodeType
	priority  <span class="token builtin">uint32</span>
	children  <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>node <span class="token comment">// child nodes, at most 1 :param style node at the end of the array</span>
	handlers  HandlersChain
	fullPath  <span class="token builtin">string</span>
<span class="token punctuation">}</span>
        
<span class="token keyword">func</span> <span class="token function">New</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>Engine <span class="token punctuation">{</span>
	<span class="token function">debugPrintWARNINGNew</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	engine <span class="token operator">:=</span> <span class="token operator">&amp;</span>Engine<span class="token punctuation">{</span>
		RouterGroup<span class="token punctuation">:</span> RouterGroup<span class="token punctuation">{</span>
			Handlers<span class="token punctuation">:</span> <span class="token boolean">nil</span><span class="token punctuation">,</span>
			basePath<span class="token punctuation">:</span> <span class="token string">"/"</span><span class="token punctuation">,</span>
			root<span class="token punctuation">:</span>     <span class="token boolean">true</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		FuncMap<span class="token punctuation">:</span>                template<span class="token punctuation">.</span>FuncMap<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		RedirectTrailingSlash<span class="token punctuation">:</span>  <span class="token boolean">true</span><span class="token punctuation">,</span>
		RedirectFixedPath<span class="token punctuation">:</span>      <span class="token boolean">false</span><span class="token punctuation">,</span>
		HandleMethodNotAllowed<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
		ForwardedByClientIP<span class="token punctuation">:</span>    <span class="token boolean">true</span><span class="token punctuation">,</span>
		RemoteIPHeaders<span class="token punctuation">:</span>        <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"X-Forwarded-For"</span><span class="token punctuation">,</span> <span class="token string">"X-Real-IP"</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		TrustedPlatform<span class="token punctuation">:</span>        defaultPlatform<span class="token punctuation">,</span>
		UseRawPath<span class="token punctuation">:</span>             <span class="token boolean">false</span><span class="token punctuation">,</span>
		RemoveExtraSlash<span class="token punctuation">:</span>       <span class="token boolean">false</span><span class="token punctuation">,</span>
		UnescapePathValues<span class="token punctuation">:</span>     <span class="token boolean">true</span><span class="token punctuation">,</span>
		MaxMultipartMemory<span class="token punctuation">:</span>     defaultMultipartMemory<span class="token punctuation">,</span>
        <span class="token comment">// 容量为9，代表9个HTTP方法，包含GET, POST, PUT, PATCH, HEAD, OPTIONS, DELETE, CONNECT, TRACE</span>
		trees<span class="token punctuation">:</span>                  <span class="token function">make</span><span class="token punctuation">(</span>methodTrees<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">)</span><span class="token punctuation">,</span>	
		delims<span class="token punctuation">:</span>                 render<span class="token punctuation">.</span>Delims<span class="token punctuation">{</span>Left<span class="token punctuation">:</span> <span class="token string">"{{"</span><span class="token punctuation">,</span> Right<span class="token punctuation">:</span> <span class="token string">"}}"</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		secureJSONPrefix<span class="token punctuation">:</span>       <span class="token string">"while(1);"</span><span class="token punctuation">,</span>
		trustedProxies<span class="token punctuation">:</span>         <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"0.0.0.0/0"</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		trustedCIDRs<span class="token punctuation">:</span>           defaultTrustedCIDRs<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	engine<span class="token punctuation">.</span>RouterGroup<span class="token punctuation">.</span>engine <span class="token operator">=</span> engine
	engine<span class="token punctuation">.</span>pool<span class="token punctuation">.</span>New <span class="token operator">=</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> engine<span class="token punctuation">.</span><span class="token function">allocateContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> engine
<span class="token punctuation">}</span>

<span class="token comment">// ---------------------------------------------------------------------------------</span>
<span class="token comment">// 改写一下代码，不使用gin.Default()，使用自己New()的引擎</span>
<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"github.com/gin-gonic/gin"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 监听地址</span>
	addr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:80"</span>

	<span class="token comment">// 实例化Gin路由引擎</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	r<span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span>gin<span class="token punctuation">.</span><span class="token function">Logger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> gin<span class="token punctuation">.</span><span class="token function">Recovery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// 注册路由</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> <span class="token string">"Hello Gin!\n"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// 启动Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span>addr<span class="token punctuation">,</span> r<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre></div><h3 id="路由" tabindex="-1"><a class="header-anchor" href="#路由" aria-hidden="true">#</a> 路由</h3>
<h4 id="路由原理-1-基数树" tabindex="-1"><a class="header-anchor" href="#路由原理-1-基数树" aria-hidden="true">#</a> 路由原理(1)：基数树</h4>
<p>gin框架使用的是定制版本的<a href="https://github.com/julienschmidt/httprouter" target="_blank" rel="noopener noreferrer">httprouter<ExternalLinkIcon/></a>，使用基数树（Radix Tree）来存储和查找路由</p>
<p>基数树（Radix Tree）是一种更节省空间的前缀树（Trie Tree）。</p>
<p>对于基数树的每个节点，如果该节点是唯一的子树的话，就和父节点合并。</p>
<p>下图为一个基数树示例：</p>
<p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/radix_tree.png" alt="radix_tree"></p>
<p>假设有以下路由注册信息</p>
<div class="language-go ext-go"><pre v-pre class="language-go"><code>r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> func1<span class="token punctuation">)</span>
r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/search/"</span><span class="token punctuation">,</span> func2<span class="token punctuation">)</span>
r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/support/"</span><span class="token punctuation">,</span> func3<span class="token punctuation">)</span>
r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/blog/"</span><span class="token punctuation">,</span> func4<span class="token punctuation">)</span>
r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/blog/:post/"</span><span class="token punctuation">,</span> func5<span class="token punctuation">)</span>
r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/about-us/"</span><span class="token punctuation">,</span> func6<span class="token punctuation">)</span>
r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/about-us/team/"</span><span class="token punctuation">,</span> func7<span class="token punctuation">)</span>
r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/contact/"</span><span class="token punctuation">,</span> func8<span class="token punctuation">)</span>
</code></pre></div><p><code v-pre>Gin</code>为每种请求方法管理一棵单独的树，所以我们会得到一个<code v-pre>GET</code>方法对应的路由树：</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>Priority   Path             Handle
<span class="token number">9</span>          <span class="token punctuation">\</span>                *<span class="token operator">&lt;</span><span class="token operator"><span class="token file-descriptor important">1</span>></span>
<span class="token number">3</span>          ├s               nil
<span class="token number">2</span>          <span class="token operator">|</span>├earch<span class="token punctuation">\</span>         *<span class="token operator">&lt;</span><span class="token operator"><span class="token file-descriptor important">2</span>></span>
<span class="token number">1</span>          <span class="token operator">|</span>└upport<span class="token punctuation">\</span>        *<span class="token operator">&lt;</span><span class="token operator"><span class="token file-descriptor important">3</span>></span>
<span class="token number">2</span>          ├blog<span class="token punctuation">\</span>           *<span class="token operator">&lt;</span><span class="token operator"><span class="token file-descriptor important">4</span>></span>
<span class="token number">1</span>          <span class="token operator">|</span>    └:post      nil
<span class="token number">1</span>          <span class="token operator">|</span>         └<span class="token punctuation">\</span>     *<span class="token operator">&lt;</span><span class="token operator"><span class="token file-descriptor important">5</span>></span>
<span class="token number">2</span>          ├about-us<span class="token punctuation">\</span>       *<span class="token operator">&lt;</span><span class="token operator"><span class="token file-descriptor important">6</span>></span>
<span class="token number">1</span>          <span class="token operator">|</span>        └team<span class="token punctuation">\</span>  *<span class="token operator">&lt;</span><span class="token operator"><span class="token file-descriptor important">7</span>></span>
<span class="token number">1</span>          └contact<span class="token punctuation">\</span>        *<span class="token operator">&lt;</span><span class="token operator"><span class="token file-descriptor important">8</span>></span>
</code></pre></div><ul>
<li>基数树允许我们使用像<code v-pre>:post</code>参数这种动态部分</li>
<li>每个节点都有优先级属性，作用是可以优先匹配被大多数路由路径包含的节点</li>
</ul>
<h4 id="路由原理-2-相关结构体" tabindex="-1"><a class="header-anchor" href="#路由原理-2-相关结构体" aria-hidden="true">#</a> 路由原理(2)：相关结构体</h4>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token comment">// Engine结构体</span>
<span class="token keyword">type</span> Engine <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	RouterGroup
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token comment">// RouterGroup结构体</span>
<span class="token keyword">type</span> RouterGroup <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Handlers HandlersChain
	basePath <span class="token builtin">string</span>
	engine   <span class="token operator">*</span>Engine
	root     <span class="token builtin">bool</span>
<span class="token punctuation">}</span>
<span class="token comment">// Engine和RouterGroup类似于相互嵌套的结构</span>

<span class="token comment">// --------------------------------------------------------------------</span>
<span class="token comment">// 路由树节点</span>
<span class="token keyword">type</span> node <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    <span class="token comment">// 节点路径,比如上面的s，earch，和upport</span>
	path      <span class="token builtin">string</span>
    
    <span class="token comment">// 保存分裂分支的第一个字符，</span>
    <span class="token comment">// 比如search和support, 那么s节点的indices属性就为"eu"，代表有两个分支, 分支的首字母分别是e和u</span>
	indices   <span class="token builtin">string</span>
    
    <span class="token comment">// 节点是否是参数节点，比如上面的:post</span>
	wildChild <span class="token builtin">bool</span>
    
    <span class="token comment">// 节点类型</span>
    <span class="token comment">// static: 静态节点（默认），比如上面的s，earch等节点</span>
	<span class="token comment">// root: 树的根节点</span>
	<span class="token comment">// catchAll: 有*匹配的节点</span>
	<span class="token comment">// param: 参数节点</span>
	nType     nodeType
    
    <span class="token comment">// 优先级，子节点越多，优先级越高(数字越大)，该节点越优先匹配</span>
	priority  <span class="token builtin">uint32</span>
    
    <span class="token comment">// 子节点(只包含儿子节点，不包含孙子节点)</span>
	children  <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>node <span class="token comment">// child nodes, at most 1 :param style node at the end of the array</span>
    
    <span class="token comment">// 处理函数链条（切片）</span>
	handlers  HandlersChain
    
    <span class="token comment">// 完整路径</span>
	fullPath  <span class="token builtin">string</span>
<span class="token punctuation">}</span>
<span class="token comment">// --------------------------------------------------------------------</span>
<span class="token comment">// 请求方法树，每个方法对应一棵树</span>
<span class="token keyword">type</span> methodTree <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	method <span class="token builtin">string</span>
	root   <span class="token operator">*</span>node
<span class="token punctuation">}</span>

<span class="token keyword">type</span> methodTrees <span class="token punctuation">[</span><span class="token punctuation">]</span>methodTree

<span class="token keyword">func</span> <span class="token punctuation">(</span>trees methodTrees<span class="token punctuation">)</span> <span class="token function">get</span><span class="token punctuation">(</span>method <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">*</span>node <span class="token punctuation">{</span>	<span class="token comment">// 从切片中获取方法树节点</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> tree <span class="token operator">:=</span> <span class="token keyword">range</span> trees <span class="token punctuation">{</span>
		<span class="token keyword">if</span> tree<span class="token punctuation">.</span>method <span class="token operator">==</span> method <span class="token punctuation">{</span>
			<span class="token keyword">return</span> tree<span class="token punctuation">.</span>root
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h4 id="路由原理-3-路由注册逻辑" tabindex="-1"><a class="header-anchor" href="#路由原理-3-路由注册逻辑" aria-hidden="true">#</a> 路由原理(3)：路由注册逻辑</h4>
<p>我们查看一下<code v-pre>r.GET</code>源码</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token comment">// GET is a shortcut for router.Handle("GET", path, handle).</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>group <span class="token operator">*</span>RouterGroup<span class="token punctuation">)</span> <span class="token function">GET</span><span class="token punctuation">(</span>relativePath <span class="token builtin">string</span><span class="token punctuation">,</span> handlers <span class="token operator">...</span>HandlerFunc<span class="token punctuation">)</span> IRoutes <span class="token punctuation">{</span>
	<span class="token keyword">return</span> group<span class="token punctuation">.</span><span class="token function">handle</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>MethodGet<span class="token punctuation">,</span> relativePath<span class="token punctuation">,</span> handlers<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// ---------------------------------------------------------------------------------</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>group <span class="token operator">*</span>RouterGroup<span class="token punctuation">)</span> <span class="token function">handle</span><span class="token punctuation">(</span>httpMethod<span class="token punctuation">,</span> relativePath <span class="token builtin">string</span><span class="token punctuation">,</span> handlers HandlersChain<span class="token punctuation">)</span> IRoutes <span class="token punctuation">{</span>
	absolutePath <span class="token operator">:=</span> group<span class="token punctuation">.</span><span class="token function">calculateAbsolutePath</span><span class="token punctuation">(</span>relativePath<span class="token punctuation">)</span>	<span class="token comment">// 获取绝对路径（若没有前缀/则自动添加前缀/）</span>
	handlers <span class="token operator">=</span> group<span class="token punctuation">.</span><span class="token function">combineHandlers</span><span class="token punctuation">(</span>handlers<span class="token punctuation">)</span>					<span class="token comment">// 编译handlers</span>
	group<span class="token punctuation">.</span>engine<span class="token punctuation">.</span><span class="token function">addRoute</span><span class="token punctuation">(</span>httpMethod<span class="token punctuation">,</span> absolutePath<span class="token punctuation">,</span> handlers<span class="token punctuation">)</span>	<span class="token comment">// 注册路由</span>
	<span class="token keyword">return</span> group<span class="token punctuation">.</span><span class="token function">returnObj</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// ---------------------------------------------------------------------------------</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>engine <span class="token operator">*</span>Engine<span class="token punctuation">)</span> <span class="token function">addRoute</span><span class="token punctuation">(</span>method<span class="token punctuation">,</span> path <span class="token builtin">string</span><span class="token punctuation">,</span> handlers HandlersChain<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">assert1</span><span class="token punctuation">(</span>path<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token char">'/'</span><span class="token punctuation">,</span> <span class="token string">"path must begin with '/'"</span><span class="token punctuation">)</span>
	<span class="token function">assert1</span><span class="token punctuation">(</span>method <span class="token operator">!=</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"HTTP method can not be empty"</span><span class="token punctuation">)</span>
	<span class="token function">assert1</span><span class="token punctuation">(</span><span class="token function">len</span><span class="token punctuation">(</span>handlers<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">"there must be at least one handler"</span><span class="token punctuation">)</span>

	<span class="token function">debugPrintRoute</span><span class="token punctuation">(</span>method<span class="token punctuation">,</span> path<span class="token punctuation">,</span> handlers<span class="token punctuation">)</span>

    <span class="token comment">// 获取方法对应的根节点，trees是一个切片，get是自定义方法，内部是一个循环遍历</span>
	root <span class="token operator">:=</span> engine<span class="token punctuation">.</span>trees<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>method<span class="token punctuation">)</span>	
	<span class="token keyword">if</span> root <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		root <span class="token operator">=</span> <span class="token function">new</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span>
		root<span class="token punctuation">.</span>fullPath <span class="token operator">=</span> <span class="token string">"/"</span>
		engine<span class="token punctuation">.</span>trees <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>engine<span class="token punctuation">.</span>trees<span class="token punctuation">,</span> methodTree<span class="token punctuation">{</span>method<span class="token punctuation">:</span> method<span class="token punctuation">,</span> root<span class="token punctuation">:</span> root<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
    <span class="token comment">// 根节点注册路由</span>
	root<span class="token punctuation">.</span><span class="token function">addRoute</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> handlers<span class="token punctuation">)</span>

	<span class="token comment">// Update maxParams</span>
	<span class="token keyword">if</span> paramsCount <span class="token operator">:=</span> <span class="token function">countParams</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span> paramsCount <span class="token operator">></span> engine<span class="token punctuation">.</span>maxParams <span class="token punctuation">{</span>
		engine<span class="token punctuation">.</span>maxParams <span class="token operator">=</span> paramsCount
	<span class="token punctuation">}</span>

	<span class="token keyword">if</span> sectionsCount <span class="token operator">:=</span> <span class="token function">countSections</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span> sectionsCount <span class="token operator">></span> engine<span class="token punctuation">.</span>maxSections <span class="token punctuation">{</span>
		engine<span class="token punctuation">.</span>maxSections <span class="token operator">=</span> sectionsCount
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>注册逻辑</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token comment">// addRoute 将具有给定句柄的节点添加到路径中。</span>
<span class="token comment">// 不是并发安全的</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>n <span class="token operator">*</span>node<span class="token punctuation">)</span> <span class="token function">addRoute</span><span class="token punctuation">(</span>path <span class="token builtin">string</span><span class="token punctuation">,</span> handlers HandlersChain<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fullPath <span class="token operator">:=</span> path
	n<span class="token punctuation">.</span>priority<span class="token operator">++</span>
	numParams <span class="token operator">:=</span> <span class="token function">countParams</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span>  <span class="token comment">// 数一下参数个数</span>

	<span class="token comment">// 空树就直接插入当前节点</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>path<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>children<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		n<span class="token punctuation">.</span><span class="token function">insertChild</span><span class="token punctuation">(</span>numParams<span class="token punctuation">,</span> path<span class="token punctuation">,</span> fullPath<span class="token punctuation">,</span> handlers<span class="token punctuation">)</span>
		n<span class="token punctuation">.</span>nType <span class="token operator">=</span> root
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	parentFullPathIndex <span class="token operator">:=</span> <span class="token number">0</span>

walk<span class="token punctuation">:</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		<span class="token comment">// 更新当前节点的最大参数个数</span>
		<span class="token keyword">if</span> numParams <span class="token operator">></span> n<span class="token punctuation">.</span>maxParams <span class="token punctuation">{</span>
			n<span class="token punctuation">.</span>maxParams <span class="token operator">=</span> numParams
		<span class="token punctuation">}</span>

		<span class="token comment">// 找到最长的通用前缀</span>
		<span class="token comment">// 这也意味着公共前缀不包含“:”"或“*” /</span>
		<span class="token comment">// 因为现有键不能包含这些字符。</span>
		i <span class="token operator">:=</span> <span class="token function">longestCommonPrefix</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> n<span class="token punctuation">.</span>path<span class="token punctuation">)</span>

		<span class="token comment">// 分裂边缘（此处分裂的是当前树节点）</span>
		<span class="token comment">// 例如一开始path是search，新加入support，s是他们通用的最长前缀部分</span>
		<span class="token comment">// 那么会将s拿出来作为parent节点，增加earch和upport作为child节点</span>
		<span class="token keyword">if</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>path<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			child <span class="token operator">:=</span> node<span class="token punctuation">{</span>
				path<span class="token punctuation">:</span>      n<span class="token punctuation">.</span>path<span class="token punctuation">[</span>i<span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">,</span>  <span class="token comment">// 公共前缀后的部分作为子节点</span>
				wildChild<span class="token punctuation">:</span> n<span class="token punctuation">.</span>wildChild<span class="token punctuation">,</span>
				indices<span class="token punctuation">:</span>   n<span class="token punctuation">.</span>indices<span class="token punctuation">,</span>
				children<span class="token punctuation">:</span>  n<span class="token punctuation">.</span>children<span class="token punctuation">,</span>
				handlers<span class="token punctuation">:</span>  n<span class="token punctuation">.</span>handlers<span class="token punctuation">,</span>
				priority<span class="token punctuation">:</span>  n<span class="token punctuation">.</span>priority <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token comment">//子节点优先级-1</span>
				fullPath<span class="token punctuation">:</span>  n<span class="token punctuation">.</span>fullPath<span class="token punctuation">,</span>
			<span class="token punctuation">}</span>

			<span class="token comment">// Update maxParams (max of all children)</span>
			<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> child<span class="token punctuation">.</span>children <span class="token punctuation">{</span>
				<span class="token keyword">if</span> v<span class="token punctuation">.</span>maxParams <span class="token operator">></span> child<span class="token punctuation">.</span>maxParams <span class="token punctuation">{</span>
					child<span class="token punctuation">.</span>maxParams <span class="token operator">=</span> v<span class="token punctuation">.</span>maxParams
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>

			n<span class="token punctuation">.</span>children <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>node<span class="token punctuation">{</span><span class="token operator">&amp;</span>child<span class="token punctuation">}</span>
			<span class="token comment">// []byte for proper unicode char conversion, see #65</span>
			n<span class="token punctuation">.</span>indices <span class="token operator">=</span> <span class="token function">string</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">{</span>n<span class="token punctuation">.</span>path<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
			n<span class="token punctuation">.</span>path <span class="token operator">=</span> path<span class="token punctuation">[</span><span class="token punctuation">:</span>i<span class="token punctuation">]</span>
			n<span class="token punctuation">.</span>handlers <span class="token operator">=</span> <span class="token boolean">nil</span>
			n<span class="token punctuation">.</span>wildChild <span class="token operator">=</span> <span class="token boolean">false</span>
			n<span class="token punctuation">.</span>fullPath <span class="token operator">=</span> fullPath<span class="token punctuation">[</span><span class="token punctuation">:</span>parentFullPathIndex<span class="token operator">+</span>i<span class="token punctuation">]</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 将新来的节点插入新的parent节点作为子节点</span>
		<span class="token keyword">if</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			path <span class="token operator">=</span> path<span class="token punctuation">[</span>i<span class="token punctuation">:</span><span class="token punctuation">]</span>

			<span class="token keyword">if</span> n<span class="token punctuation">.</span>wildChild <span class="token punctuation">{</span>  <span class="token comment">// 如果是参数节点</span>
				parentFullPathIndex <span class="token operator">+=</span> <span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>path<span class="token punctuation">)</span>
				n <span class="token operator">=</span> n<span class="token punctuation">.</span>children<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
				n<span class="token punctuation">.</span>priority<span class="token operator">++</span>

				<span class="token comment">// Update maxParams of the child node</span>
				<span class="token keyword">if</span> numParams <span class="token operator">></span> n<span class="token punctuation">.</span>maxParams <span class="token punctuation">{</span>
					n<span class="token punctuation">.</span>maxParams <span class="token operator">=</span> numParams
				<span class="token punctuation">}</span>
				numParams<span class="token operator">--</span>

				<span class="token comment">// 检查通配符是否匹配</span>
				<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span> <span class="token operator">>=</span> <span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>path<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> n<span class="token punctuation">.</span>path <span class="token operator">==</span> path<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>path<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
					<span class="token comment">// 检查更长的通配符, 例如 :name and :names</span>
					<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>path<span class="token punctuation">)</span> <span class="token operator">>=</span> <span class="token function">len</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span> <span class="token operator">||</span> path<span class="token punctuation">[</span><span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>path<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token char">'/'</span> <span class="token punctuation">{</span>
						<span class="token keyword">continue</span> walk
					<span class="token punctuation">}</span>
				<span class="token punctuation">}</span>

				pathSeg <span class="token operator">:=</span> path
				<span class="token keyword">if</span> n<span class="token punctuation">.</span>nType <span class="token operator">!=</span> catchAll <span class="token punctuation">{</span>
					pathSeg <span class="token operator">=</span> strings<span class="token punctuation">.</span><span class="token function">SplitN</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> <span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
				<span class="token punctuation">}</span>
				prefix <span class="token operator">:=</span> fullPath<span class="token punctuation">[</span><span class="token punctuation">:</span>strings<span class="token punctuation">.</span><span class="token function">Index</span><span class="token punctuation">(</span>fullPath<span class="token punctuation">,</span> pathSeg<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">+</span> n<span class="token punctuation">.</span>path
				<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"'"</span> <span class="token operator">+</span> pathSeg <span class="token operator">+</span>
					<span class="token string">"' in new path '"</span> <span class="token operator">+</span> fullPath <span class="token operator">+</span>
					<span class="token string">"' conflicts with existing wildcard '"</span> <span class="token operator">+</span> n<span class="token punctuation">.</span>path <span class="token operator">+</span>
					<span class="token string">"' in existing prefix '"</span> <span class="token operator">+</span> prefix <span class="token operator">+</span>
					<span class="token string">"'"</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			<span class="token comment">// 取path首字母，用来与indices做比较</span>
			c <span class="token operator">:=</span> path<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>

			<span class="token comment">// 处理参数后加斜线情况</span>
			<span class="token keyword">if</span> n<span class="token punctuation">.</span>nType <span class="token operator">==</span> param <span class="token operator">&amp;&amp;</span> c <span class="token operator">==</span> <span class="token char">'/'</span> <span class="token operator">&amp;&amp;</span> <span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>children<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span> <span class="token punctuation">{</span>
				parentFullPathIndex <span class="token operator">+=</span> <span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>path<span class="token punctuation">)</span>
				n <span class="token operator">=</span> n<span class="token punctuation">.</span>children<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
				n<span class="token punctuation">.</span>priority<span class="token operator">++</span>
				<span class="token keyword">continue</span> walk
			<span class="token punctuation">}</span>

			<span class="token comment">// 检查路path下一个字节的子节点是否存在</span>
			<span class="token comment">// 比如s的子节点现在是earch和upport，indices为eu</span>
			<span class="token comment">// 如果新加一个路由为super，那么就是和upport有匹配的部分u，将继续分列现在的upport节点</span>
			<span class="token keyword">for</span> i<span class="token punctuation">,</span> max <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>indices<span class="token punctuation">)</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> max<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
				<span class="token keyword">if</span> c <span class="token operator">==</span> n<span class="token punctuation">.</span>indices<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token punctuation">{</span>
					parentFullPathIndex <span class="token operator">+=</span> <span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>path<span class="token punctuation">)</span>
					i <span class="token operator">=</span> n<span class="token punctuation">.</span><span class="token function">incrementChildPrio</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
					n <span class="token operator">=</span> n<span class="token punctuation">.</span>children<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
					<span class="token keyword">continue</span> walk
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>

			<span class="token comment">// 否则就插入</span>
			<span class="token keyword">if</span> c <span class="token operator">!=</span> <span class="token char">':'</span> <span class="token operator">&amp;&amp;</span> c <span class="token operator">!=</span> <span class="token char">'*'</span> <span class="token punctuation">{</span>
				<span class="token comment">// []byte for proper unicode char conversion, see #65</span>
				<span class="token comment">// 注意这里是直接拼接第一个字符到n.indices</span>
				n<span class="token punctuation">.</span>indices <span class="token operator">+=</span> <span class="token function">string</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">{</span>c<span class="token punctuation">}</span><span class="token punctuation">)</span>
				child <span class="token operator">:=</span> <span class="token operator">&amp;</span>node<span class="token punctuation">{</span>
					maxParams<span class="token punctuation">:</span> numParams<span class="token punctuation">,</span>
					fullPath<span class="token punctuation">:</span>  fullPath<span class="token punctuation">,</span>
				<span class="token punctuation">}</span>
				<span class="token comment">// 追加子节点</span>
				n<span class="token punctuation">.</span>children <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>children<span class="token punctuation">,</span> child<span class="token punctuation">)</span>
				n<span class="token punctuation">.</span><span class="token function">incrementChildPrio</span><span class="token punctuation">(</span><span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>indices<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span>
				n <span class="token operator">=</span> child
			<span class="token punctuation">}</span>
			n<span class="token punctuation">.</span><span class="token function">insertChild</span><span class="token punctuation">(</span>numParams<span class="token punctuation">,</span> path<span class="token punctuation">,</span> fullPath<span class="token punctuation">,</span> handlers<span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 已经注册过的节点</span>
		<span class="token keyword">if</span> n<span class="token punctuation">.</span>handlers <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"handlers are already registered for path '"</span> <span class="token operator">+</span> fullPath <span class="token operator">+</span> <span class="token string">"'"</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		n<span class="token punctuation">.</span>handlers <span class="token operator">=</span> handlers
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>翻译成动画大概是这样的流程：</p>
<p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/addroute.gif" alt="addroute"></p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token comment">// tree.go</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>n <span class="token operator">*</span>node<span class="token punctuation">)</span> <span class="token function">insertChild</span><span class="token punctuation">(</span>numParams <span class="token builtin">uint8</span><span class="token punctuation">,</span> path <span class="token builtin">string</span><span class="token punctuation">,</span> fullPath <span class="token builtin">string</span><span class="token punctuation">,</span> handlers HandlersChain<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 找到所有的参数</span>
	<span class="token keyword">for</span> numParams <span class="token operator">></span> <span class="token number">0</span> <span class="token punctuation">{</span>
		<span class="token comment">// 查找前缀直到第一个通配符</span>
		wildcard<span class="token punctuation">,</span> i<span class="token punctuation">,</span> valid <span class="token operator">:=</span> <span class="token function">findWildcard</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span>
		<span class="token keyword">if</span> i <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token punctuation">{</span> <span class="token comment">// 没有发现通配符</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 通配符的名称必须包含':' 和 '*'</span>
		<span class="token keyword">if</span> <span class="token operator">!</span>valid <span class="token punctuation">{</span>
			<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"only one wildcard per path segment is allowed, has: '"</span> <span class="token operator">+</span>
				wildcard <span class="token operator">+</span> <span class="token string">"' in path '"</span> <span class="token operator">+</span> fullPath <span class="token operator">+</span> <span class="token string">"'"</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 检查通配符是否有名称</span>
		<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>wildcard<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">2</span> <span class="token punctuation">{</span>
			<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"wildcards must be named with a non-empty name in path '"</span> <span class="token operator">+</span> fullPath <span class="token operator">+</span> <span class="token string">"'"</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 检查这个节点是否有已经存在的子节点</span>
		<span class="token comment">// 如果我们在这里插入通配符，这些子节点将无法访问</span>
		<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>children<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span> <span class="token punctuation">{</span>
			<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"wildcard segment '"</span> <span class="token operator">+</span> wildcard <span class="token operator">+</span>
				<span class="token string">"' conflicts with existing children in path '"</span> <span class="token operator">+</span> fullPath <span class="token operator">+</span> <span class="token string">"'"</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		<span class="token keyword">if</span> wildcard<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token char">':'</span> <span class="token punctuation">{</span> <span class="token comment">// param</span>
			<span class="token keyword">if</span> i <span class="token operator">></span> <span class="token number">0</span> <span class="token punctuation">{</span>
				<span class="token comment">// 在当前通配符之前插入前缀</span>
				n<span class="token punctuation">.</span>path <span class="token operator">=</span> path<span class="token punctuation">[</span><span class="token punctuation">:</span>i<span class="token punctuation">]</span>
				path <span class="token operator">=</span> path<span class="token punctuation">[</span>i<span class="token punctuation">:</span><span class="token punctuation">]</span>
			<span class="token punctuation">}</span>

			n<span class="token punctuation">.</span>wildChild <span class="token operator">=</span> <span class="token boolean">true</span>
			child <span class="token operator">:=</span> <span class="token operator">&amp;</span>node<span class="token punctuation">{</span>
				nType<span class="token punctuation">:</span>     param<span class="token punctuation">,</span>
				path<span class="token punctuation">:</span>      wildcard<span class="token punctuation">,</span>
				maxParams<span class="token punctuation">:</span> numParams<span class="token punctuation">,</span>
				fullPath<span class="token punctuation">:</span>  fullPath<span class="token punctuation">,</span>
			<span class="token punctuation">}</span>
			n<span class="token punctuation">.</span>children <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>node<span class="token punctuation">{</span>child<span class="token punctuation">}</span>
			n <span class="token operator">=</span> child
			n<span class="token punctuation">.</span>priority<span class="token operator">++</span>
			numParams<span class="token operator">--</span>

			<span class="token comment">// 如果路径没有以通配符结束</span>
			<span class="token comment">// 那么将有另一个以'/'开始的非通配符子路径。</span>
			<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>wildcard<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span> <span class="token punctuation">{</span>
				path <span class="token operator">=</span> path<span class="token punctuation">[</span><span class="token function">len</span><span class="token punctuation">(</span>wildcard<span class="token punctuation">)</span><span class="token punctuation">:</span><span class="token punctuation">]</span>

				child <span class="token operator">:=</span> <span class="token operator">&amp;</span>node<span class="token punctuation">{</span>
					maxParams<span class="token punctuation">:</span> numParams<span class="token punctuation">,</span>
					priority<span class="token punctuation">:</span>  <span class="token number">1</span><span class="token punctuation">,</span>
					fullPath<span class="token punctuation">:</span>  fullPath<span class="token punctuation">,</span>
				<span class="token punctuation">}</span>
				n<span class="token punctuation">.</span>children <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>node<span class="token punctuation">{</span>child<span class="token punctuation">}</span>
				n <span class="token operator">=</span> child  <span class="token comment">// 继续下一轮循环</span>
				<span class="token keyword">continue</span>
			<span class="token punctuation">}</span>

			<span class="token comment">// 否则我们就完成了。将处理函数插入新叶子中</span>
			n<span class="token punctuation">.</span>handlers <span class="token operator">=</span> handlers
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// catchAll</span>
		<span class="token keyword">if</span> i<span class="token operator">+</span><span class="token function">len</span><span class="token punctuation">(</span>wildcard<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token function">len</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span> <span class="token operator">||</span> numParams <span class="token operator">></span> <span class="token number">1</span> <span class="token punctuation">{</span>
			<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"catch-all routes are only allowed at the end of the path in path '"</span> <span class="token operator">+</span> fullPath <span class="token operator">+</span> <span class="token string">"'"</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>path<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> n<span class="token punctuation">.</span>path<span class="token punctuation">[</span><span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>path<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token char">'/'</span> <span class="token punctuation">{</span>
			<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"catch-all conflicts with existing handle for the path segment root in path '"</span> <span class="token operator">+</span> fullPath <span class="token operator">+</span> <span class="token string">"'"</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// currently fixed width 1 for '/'</span>
		i<span class="token operator">--</span>
		<span class="token keyword">if</span> path<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token char">'/'</span> <span class="token punctuation">{</span>
			<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"no / before catch-all in path '"</span> <span class="token operator">+</span> fullPath <span class="token operator">+</span> <span class="token string">"'"</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		n<span class="token punctuation">.</span>path <span class="token operator">=</span> path<span class="token punctuation">[</span><span class="token punctuation">:</span>i<span class="token punctuation">]</span>
		
		<span class="token comment">// 第一个节点:路径为空的catchAll节点</span>
		child <span class="token operator">:=</span> <span class="token operator">&amp;</span>node<span class="token punctuation">{</span>
			wildChild<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
			nType<span class="token punctuation">:</span>     catchAll<span class="token punctuation">,</span>
			maxParams<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
			fullPath<span class="token punctuation">:</span>  fullPath<span class="token punctuation">,</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// 更新父节点的maxParams</span>
		<span class="token keyword">if</span> n<span class="token punctuation">.</span>maxParams <span class="token operator">&lt;</span> <span class="token number">1</span> <span class="token punctuation">{</span>
			n<span class="token punctuation">.</span>maxParams <span class="token operator">=</span> <span class="token number">1</span>
		<span class="token punctuation">}</span>
		n<span class="token punctuation">.</span>children <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>node<span class="token punctuation">{</span>child<span class="token punctuation">}</span>
		n<span class="token punctuation">.</span>indices <span class="token operator">=</span> <span class="token function">string</span><span class="token punctuation">(</span><span class="token char">'/'</span><span class="token punctuation">)</span>
		n <span class="token operator">=</span> child
		n<span class="token punctuation">.</span>priority<span class="token operator">++</span>

		<span class="token comment">// 第二个节点:保存变量的节点</span>
		child <span class="token operator">=</span> <span class="token operator">&amp;</span>node<span class="token punctuation">{</span>
			path<span class="token punctuation">:</span>      path<span class="token punctuation">[</span>i<span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
			nType<span class="token punctuation">:</span>     catchAll<span class="token punctuation">,</span>
			maxParams<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
			handlers<span class="token punctuation">:</span>  handlers<span class="token punctuation">,</span>
			priority<span class="token punctuation">:</span>  <span class="token number">1</span><span class="token punctuation">,</span>
			fullPath<span class="token punctuation">:</span>  fullPath<span class="token punctuation">,</span>
		<span class="token punctuation">}</span>
		n<span class="token punctuation">.</span>children <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>node<span class="token punctuation">{</span>child<span class="token punctuation">}</span>

		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 如果没有找到通配符，只需插入路径和句柄</span>
	n<span class="token punctuation">.</span>path <span class="token operator">=</span> path
	n<span class="token punctuation">.</span>handlers <span class="token operator">=</span> handlers
	n<span class="token punctuation">.</span>fullPath <span class="token operator">=</span> fullPath
<span class="token punctuation">}</span>
</code></pre></div></details>
<h4 id="路由原理-4-路由匹配逻辑" tabindex="-1"><a class="header-anchor" href="#路由原理-4-路由匹配逻辑" aria-hidden="true">#</a> 路由原理(4)：路由匹配逻辑</h4>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code>Engine <span class="token operator">-</span><span class="token operator">></span> ServeHTTP方法 <span class="token operator">-</span><span class="token operator">></span> engine<span class="token punctuation">.</span><span class="token function">handleHTTPRequest</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> 
<span class="token comment">// ---------------------------------------------------------------------</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>engine <span class="token operator">*</span>Engine<span class="token punctuation">)</span> <span class="token function">handleHTTPRequest</span><span class="token punctuation">(</span>c <span class="token operator">*</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	httpMethod <span class="token operator">:=</span> c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>Method	<span class="token comment">// 请求方法</span>
	rPath <span class="token operator">:=</span> c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>URL<span class="token punctuation">.</span>Path		<span class="token comment">// 请求Path</span>
	unescape <span class="token operator">:=</span> <span class="token boolean">false</span>
	<span class="token keyword">if</span> engine<span class="token punctuation">.</span>UseRawPath <span class="token operator">&amp;&amp;</span> <span class="token function">len</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>URL<span class="token punctuation">.</span>RawPath<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span> <span class="token punctuation">{</span>
		rPath <span class="token operator">=</span> c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>URL<span class="token punctuation">.</span>RawPath
		unescape <span class="token operator">=</span> engine<span class="token punctuation">.</span>UnescapePathValues
	<span class="token punctuation">}</span>

	<span class="token keyword">if</span> engine<span class="token punctuation">.</span>RemoveExtraSlash <span class="token punctuation">{</span>
		rPath <span class="token operator">=</span> <span class="token function">cleanPath</span><span class="token punctuation">(</span>rPath<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// Find root of the tree for the given HTTP method</span>
	t <span class="token operator">:=</span> engine<span class="token punctuation">.</span>trees						
	<span class="token keyword">for</span> i<span class="token punctuation">,</span> tl <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> tl<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> t<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>method <span class="token operator">!=</span> httpMethod <span class="token punctuation">{</span>
			<span class="token keyword">continue</span>
		<span class="token punctuation">}</span>
		root <span class="token operator">:=</span> t<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>root		<span class="token comment">// 找到请求方法对应的基数树</span>
		<span class="token comment">// Find route in tree</span>
		value <span class="token operator">:=</span> root<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span>rPath<span class="token punctuation">,</span> c<span class="token punctuation">.</span>params<span class="token punctuation">,</span> c<span class="token punctuation">.</span>skippedNodes<span class="token punctuation">,</span> unescape<span class="token punctuation">)</span>	<span class="token comment">// 根据path获取到路由节点node</span>
		<span class="token keyword">if</span> value<span class="token punctuation">.</span>params <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			c<span class="token punctuation">.</span>Params <span class="token operator">=</span> <span class="token operator">*</span>value<span class="token punctuation">.</span>params
		<span class="token punctuation">}</span>
<span class="token comment">// ---------------------------------------------------------------------        </span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>n <span class="token operator">*</span>node<span class="token punctuation">)</span> <span class="token function">getValue</span><span class="token punctuation">(</span>path <span class="token builtin">string</span><span class="token punctuation">,</span> po Params<span class="token punctuation">,</span> unescape <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>value nodeValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	value<span class="token punctuation">.</span>params <span class="token operator">=</span> po
walk<span class="token punctuation">:</span> <span class="token comment">// Outer loop for walking the tree</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		prefix <span class="token operator">:=</span> n<span class="token punctuation">.</span>path
		<span class="token keyword">if</span> path <span class="token operator">==</span> prefix <span class="token punctuation">{</span>
			<span class="token comment">// 我们应该已经到达包含处理函数的节点。</span>
			<span class="token comment">// 检查该节点是否注册有处理函数</span>
			<span class="token keyword">if</span> value<span class="token punctuation">.</span>handlers <span class="token operator">=</span> n<span class="token punctuation">.</span>handlers<span class="token punctuation">;</span> value<span class="token punctuation">.</span>handlers <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				value<span class="token punctuation">.</span>fullPath <span class="token operator">=</span> n<span class="token punctuation">.</span>fullPath
				<span class="token keyword">return</span>
			<span class="token punctuation">}</span>

			<span class="token keyword">if</span> path <span class="token operator">==</span> <span class="token string">"/"</span> <span class="token operator">&amp;&amp;</span> n<span class="token punctuation">.</span>wildChild <span class="token operator">&amp;&amp;</span> n<span class="token punctuation">.</span>nType <span class="token operator">!=</span> root <span class="token punctuation">{</span>
				value<span class="token punctuation">.</span>tsr <span class="token operator">=</span> <span class="token boolean">true</span>
				<span class="token keyword">return</span>
			<span class="token punctuation">}</span>

			<span class="token comment">// 没有找到处理函数 检查这个路径末尾+/ 是否存在注册函数</span>
			indices <span class="token operator">:=</span> n<span class="token punctuation">.</span>indices
			<span class="token keyword">for</span> i<span class="token punctuation">,</span> max <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>indices<span class="token punctuation">)</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> max<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
				<span class="token keyword">if</span> indices<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token char">'/'</span> <span class="token punctuation">{</span>
					n <span class="token operator">=</span> n<span class="token punctuation">.</span>children<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
					value<span class="token punctuation">.</span>tsr <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>path<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span> <span class="token operator">&amp;&amp;</span> n<span class="token punctuation">.</span>handlers <span class="token operator">!=</span> <span class="token boolean">nil</span><span class="token punctuation">)</span> <span class="token operator">||</span>
						<span class="token punctuation">(</span>n<span class="token punctuation">.</span>nType <span class="token operator">==</span> catchAll <span class="token operator">&amp;&amp;</span> n<span class="token punctuation">.</span>children<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>handlers <span class="token operator">!=</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
					<span class="token keyword">return</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>

			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>

		<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token function">len</span><span class="token punctuation">(</span>prefix<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> path<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token function">len</span><span class="token punctuation">(</span>prefix<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">==</span> prefix <span class="token punctuation">{</span>
			path <span class="token operator">=</span> path<span class="token punctuation">[</span><span class="token function">len</span><span class="token punctuation">(</span>prefix<span class="token punctuation">)</span><span class="token punctuation">:</span><span class="token punctuation">]</span>
			<span class="token comment">// 如果该节点没有通配符(param或catchAll)子节点</span>
			<span class="token comment">// 我们可以继续查找下一个子节点</span>
			<span class="token keyword">if</span> <span class="token operator">!</span>n<span class="token punctuation">.</span>wildChild <span class="token punctuation">{</span>
				c <span class="token operator">:=</span> path<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
				indices <span class="token operator">:=</span> n<span class="token punctuation">.</span>indices
				<span class="token keyword">for</span> i<span class="token punctuation">,</span> max <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>indices<span class="token punctuation">)</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> max<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
					<span class="token keyword">if</span> c <span class="token operator">==</span> indices<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token punctuation">{</span>
						n <span class="token operator">=</span> n<span class="token punctuation">.</span>children<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token comment">// 遍历树</span>
						<span class="token keyword">continue</span> walk
					<span class="token punctuation">}</span>
				<span class="token punctuation">}</span>

				<span class="token comment">// 没找到</span>
				<span class="token comment">// 如果存在一个相同的URL但没有末尾/的叶子节点</span>
				<span class="token comment">// 我们可以建议重定向到那里</span>
				value<span class="token punctuation">.</span>tsr <span class="token operator">=</span> path <span class="token operator">==</span> <span class="token string">"/"</span> <span class="token operator">&amp;&amp;</span> n<span class="token punctuation">.</span>handlers <span class="token operator">!=</span> <span class="token boolean">nil</span>
				<span class="token keyword">return</span>
			<span class="token punctuation">}</span>

			<span class="token comment">// 根据节点类型处理通配符子节点</span>
			n <span class="token operator">=</span> n<span class="token punctuation">.</span>children<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
			<span class="token keyword">switch</span> n<span class="token punctuation">.</span>nType <span class="token punctuation">{</span>
			<span class="token keyword">case</span> param<span class="token punctuation">:</span>
				<span class="token comment">// find param end (either '/' or path end)</span>
				end <span class="token operator">:=</span> <span class="token number">0</span>
				<span class="token keyword">for</span> end <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> path<span class="token punctuation">[</span>end<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token char">'/'</span> <span class="token punctuation">{</span>
					end<span class="token operator">++</span>
				<span class="token punctuation">}</span>

				<span class="token comment">// 保存通配符的值</span>
				<span class="token keyword">if</span> <span class="token function">cap</span><span class="token punctuation">(</span>value<span class="token punctuation">.</span>params<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token function">int</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>maxParams<span class="token punctuation">)</span> <span class="token punctuation">{</span>
					value<span class="token punctuation">.</span>params <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span>Params<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> n<span class="token punctuation">.</span>maxParams<span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
				i <span class="token operator">:=</span> <span class="token function">len</span><span class="token punctuation">(</span>value<span class="token punctuation">.</span>params<span class="token punctuation">)</span>
				value<span class="token punctuation">.</span>params <span class="token operator">=</span> value<span class="token punctuation">.</span>params<span class="token punctuation">[</span><span class="token punctuation">:</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token comment">// 在预先分配的容量内扩展slice</span>
				value<span class="token punctuation">.</span>params<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>Key <span class="token operator">=</span> n<span class="token punctuation">.</span>path<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span>
				val <span class="token operator">:=</span> path<span class="token punctuation">[</span><span class="token punctuation">:</span>end<span class="token punctuation">]</span>
				<span class="token keyword">if</span> unescape <span class="token punctuation">{</span>
					<span class="token keyword">var</span> err <span class="token builtin">error</span>
					<span class="token keyword">if</span> value<span class="token punctuation">.</span>params<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>Value<span class="token punctuation">,</span> err <span class="token operator">=</span> url<span class="token punctuation">.</span><span class="token function">QueryUnescape</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
						value<span class="token punctuation">.</span>params<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>Value <span class="token operator">=</span> val <span class="token comment">// fallback, in case of error</span>
					<span class="token punctuation">}</span>
				<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
					value<span class="token punctuation">.</span>params<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>Value <span class="token operator">=</span> val
				<span class="token punctuation">}</span>

				<span class="token comment">// 继续向下查询</span>
				<span class="token keyword">if</span> end <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span> <span class="token punctuation">{</span>
					<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>children<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span> <span class="token punctuation">{</span>
						path <span class="token operator">=</span> path<span class="token punctuation">[</span>end<span class="token punctuation">:</span><span class="token punctuation">]</span>
						n <span class="token operator">=</span> n<span class="token punctuation">.</span>children<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
						<span class="token keyword">continue</span> walk
					<span class="token punctuation">}</span>

					<span class="token comment">// ... but we can't</span>
					value<span class="token punctuation">.</span>tsr <span class="token operator">=</span> <span class="token function">len</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span> <span class="token operator">==</span> end<span class="token operator">+</span><span class="token number">1</span>
					<span class="token keyword">return</span>
				<span class="token punctuation">}</span>

				<span class="token keyword">if</span> value<span class="token punctuation">.</span>handlers <span class="token operator">=</span> n<span class="token punctuation">.</span>handlers<span class="token punctuation">;</span> value<span class="token punctuation">.</span>handlers <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
					value<span class="token punctuation">.</span>fullPath <span class="token operator">=</span> n<span class="token punctuation">.</span>fullPath
					<span class="token keyword">return</span>
				<span class="token punctuation">}</span>
				<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>children<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span> <span class="token punctuation">{</span>
					<span class="token comment">// 没有找到处理函数. 检查此路径末尾加/的路由是否存在注册函数</span>
					<span class="token comment">// 用于 TSR 推荐</span>
					n <span class="token operator">=</span> n<span class="token punctuation">.</span>children<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
					value<span class="token punctuation">.</span>tsr <span class="token operator">=</span> n<span class="token punctuation">.</span>path <span class="token operator">==</span> <span class="token string">"/"</span> <span class="token operator">&amp;&amp;</span> n<span class="token punctuation">.</span>handlers <span class="token operator">!=</span> <span class="token boolean">nil</span>
				<span class="token punctuation">}</span>
				<span class="token keyword">return</span>

			<span class="token keyword">case</span> catchAll<span class="token punctuation">:</span>
				<span class="token comment">// 保存通配符的值</span>
				<span class="token keyword">if</span> <span class="token function">cap</span><span class="token punctuation">(</span>value<span class="token punctuation">.</span>params<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token function">int</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>maxParams<span class="token punctuation">)</span> <span class="token punctuation">{</span>
					value<span class="token punctuation">.</span>params <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span>Params<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> n<span class="token punctuation">.</span>maxParams<span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
				i <span class="token operator">:=</span> <span class="token function">len</span><span class="token punctuation">(</span>value<span class="token punctuation">.</span>params<span class="token punctuation">)</span>
				value<span class="token punctuation">.</span>params <span class="token operator">=</span> value<span class="token punctuation">.</span>params<span class="token punctuation">[</span><span class="token punctuation">:</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token comment">// 在预先分配的容量内扩展slice</span>
				value<span class="token punctuation">.</span>params<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>Key <span class="token operator">=</span> n<span class="token punctuation">.</span>path<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">:</span><span class="token punctuation">]</span>
				<span class="token keyword">if</span> unescape <span class="token punctuation">{</span>
					<span class="token keyword">var</span> err <span class="token builtin">error</span>
					<span class="token keyword">if</span> value<span class="token punctuation">.</span>params<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>Value<span class="token punctuation">,</span> err <span class="token operator">=</span> url<span class="token punctuation">.</span><span class="token function">QueryUnescape</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
						value<span class="token punctuation">.</span>params<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>Value <span class="token operator">=</span> path <span class="token comment">// fallback, in case of error</span>
					<span class="token punctuation">}</span>
				<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
					value<span class="token punctuation">.</span>params<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>Value <span class="token operator">=</span> path
				<span class="token punctuation">}</span>

				value<span class="token punctuation">.</span>handlers <span class="token operator">=</span> n<span class="token punctuation">.</span>handlers
				value<span class="token punctuation">.</span>fullPath <span class="token operator">=</span> n<span class="token punctuation">.</span>fullPath
				<span class="token keyword">return</span>

			<span class="token keyword">default</span><span class="token punctuation">:</span>
				<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"invalid node type"</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 找不到，如果存在一个在当前路径最后添加/的路由</span>
		<span class="token comment">// 我们会建议重定向到那里</span>
		value<span class="token punctuation">.</span>tsr <span class="token operator">=</span> <span class="token punctuation">(</span>path <span class="token operator">==</span> <span class="token string">"/"</span><span class="token punctuation">)</span> <span class="token operator">||</span>
			<span class="token punctuation">(</span><span class="token function">len</span><span class="token punctuation">(</span>prefix<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token function">len</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token operator">+</span><span class="token number">1</span> <span class="token operator">&amp;&amp;</span> prefix<span class="token punctuation">[</span><span class="token function">len</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token char">'/'</span> <span class="token operator">&amp;&amp;</span>
				path <span class="token operator">==</span> prefix<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token function">len</span><span class="token punctuation">(</span>prefix<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> n<span class="token punctuation">.</span>handlers <span class="token operator">!=</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>       
</code></pre></div></details>
<h4 id="普通路由" tabindex="-1"><a class="header-anchor" href="#普通路由" aria-hidden="true">#</a> 普通路由</h4>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"github.com/gin-gonic/gin"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 监听地址</span>
	addr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:80"</span>

	<span class="token comment">// 实例化Gin路由引擎</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 注册路由</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/index"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> <span class="token string">"Index\n"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	r<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">"/login"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> <span class="token string">"Login\n"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// Any可以支持多种方法，具体包含：GET, POST, PUT, PATCH, HEAD, OPTIONS, DELETE, CONNECT, TRACE.</span>
	r<span class="token punctuation">.</span><span class="token function">Any</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"你的请求方法是: %s\n"</span><span class="token punctuation">,</span> c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>Method<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// 启动Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token punctuation">\</span>Desktop<span class="token operator">></span>curl http://127.0.0.1/index
Index

C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token punctuation">\</span>Desktop<span class="token operator">></span>curl -XPOST http://127.0.0.1/login
Login

C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token punctuation">\</span>Desktop<span class="token operator">></span>curl  http://127.0.0.1/
你的请求方法是: GET

C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token punctuation">\</span>Desktop<span class="token operator">></span>curl -XPUT http://127.0.0.1/
你的请求方法是: PUT

C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token punctuation">\</span>Desktop<span class="token operator">></span>curl -XPOST http://127.0.0.1/
你的请求方法是: POST
</code></pre></div><h4 id="分组路由" tabindex="-1"><a class="header-anchor" href="#分组路由" aria-hidden="true">#</a> 分组路由</h4>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"github.com/gin-gonic/gin"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 监听地址</span>
	addr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:80"</span>

	<span class="token comment">// 实例化Gin路由引擎</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 注册路由</span>
	apiV1 <span class="token operator">:=</span> r<span class="token punctuation">.</span><span class="token function">Group</span><span class="token punctuation">(</span><span class="token string">"/api/v1"</span><span class="token punctuation">)</span>
	apiV1<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> <span class="token string">"Hello Gin!"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	apiV1<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/login"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> <span class="token string">"Login"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// 启动Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token punctuation">\</span>Desktop<span class="token operator">></span>curl   http://127.0.0.1/api/v1/
Hello Gin<span class="token operator">!</span>
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token punctuation">\</span>Desktop<span class="token operator">></span>curl   http://127.0.0.1/api/v1/login
</code></pre></div><h4 id="尾斜杠和重定向" tabindex="-1"><a class="header-anchor" href="#尾斜杠和重定向" aria-hidden="true">#</a> 尾斜杠和重定向</h4>
<details class="custom-container details"><summary>RedirectTrailingSlash和RedirectFixedPath</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"github.com/gin-gonic/gin"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 监听地址</span>
	addr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:80"</span>

	<span class="token comment">// 实例化Gin路由引擎</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 默认为ture,设置为False可以关闭自动重定向（全局设置）</span>
	<span class="token comment">//r.RedirectTrailingSlash = false</span>

	<span class="token comment">// 默认为false, 设置为true如果匹配不到将会尝试修复path，比如/FOO和/..//Foo将会被重定向到/foo(/foo存在的情况下)</span>
	<span class="token comment">//r.RedirectFixedPath = true</span>

	<span class="token comment">// 注册路由</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/index"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> <span class="token string">"Index\n"</span><span class="token punctuation">)</span>		
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/login/"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> <span class="token string">"Login\n"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// 启动Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 注册什么就访问什么，没有问题</span>
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token operator">></span>curl http://127.0.0.1/index
Index
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token operator">></span>curl http://127.0.0.1/login/
Login

<span class="token comment"># 无论注册时带不带尾斜杠，访问时都可以自动重定向</span>
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token operator">></span>curl http://127.0.0.1/index/
<span class="token operator">&lt;</span>a <span class="token assign-left variable">href</span><span class="token operator">=</span><span class="token string">"/index"</span><span class="token operator">></span>Moved Permanently<span class="token operator">&lt;</span>/a<span class="token operator">></span>.
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token operator">></span>curl http://127.0.0.1/index/ -L
Index
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token operator">></span>curl http://127.0.0.1/login -L
Login

<span class="token comment"># 查看响应头</span>
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token operator">></span>curl http://127.0.0.1/login -i <span class="token comment"># windows下使用-i</span>
HTTP/1.1 <span class="token number">301</span> Moved Permanently
Content-Type: text/html<span class="token punctuation">;</span> <span class="token assign-left variable">charset</span><span class="token operator">=</span>utf-8
Location: /login/
Date: Sun, 08 May <span class="token number">2022</span> <span class="token number">10</span>:31:39 GMT
Content-Length: <span class="token number">42</span>

<span class="token operator">&lt;</span>a <span class="token assign-left variable">href</span><span class="token operator">=</span><span class="token string">"/login/"</span><span class="token operator">></span>Moved Permanently<span class="token operator">&lt;</span>/a<span class="token operator">></span>.

<span class="token comment"># 并不会像net/http那样，会进行前缀匹配</span>
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token operator">></span>curl http://127.0.0.1/login/a/b/c
<span class="token number">404</span> page not found
</code></pre></div><details class="custom-container details"><summary>HTTP重定向</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"github.com/gin-gonic/gin"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 监听地址</span>
	addr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:80"</span>

	<span class="token comment">// 实例化Gin路由引擎</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 注册路由</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/index"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// HTTP重定向（如果在Chrome等浏览器下访问地址栏会变为/login/）</span>
		c<span class="token punctuation">.</span><span class="token function">Redirect</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusMovedPermanently<span class="token punctuation">,</span> <span class="token string">"/login/"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/login/"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> <span class="token string">"Login\n"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// 启动Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<details class="custom-container details"><summary>路由内重定向</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"github.com/gin-gonic/gin"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 监听地址</span>
	addr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:80"</span>

	<span class="token comment">// 实例化Gin路由引擎</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 注册路由</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/index"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 路由内重定向（如果在Chrome等浏览器下访问地址栏不会发生变化）</span>
		c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>URL<span class="token punctuation">.</span>Path <span class="token operator">=</span> <span class="token string">"/login/"</span>
		r<span class="token punctuation">.</span><span class="token function">HandleContext</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/login/"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> <span class="token string">"Login\n"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// 启动Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220508183700833.png" alt="image-20220508183700833"></p>
<h3 id="参数解析" tabindex="-1"><a class="header-anchor" href="#参数解析" aria-hidden="true">#</a> 参数解析</h3>
<h4 id="content-type" tabindex="-1"><a class="header-anchor" href="#content-type" aria-hidden="true">#</a> Content-Type</h4>
<p><strong>说明</strong></p>
<p><code v-pre>Content-Type</code>写入在HTTP请求头或响应头中，用于告知接收方资源类型</p>
<ul>
<li>
<p>接收方可以是服务端（客户端发送HTTP请求设置<code v-pre>Content-Type</code>），也可以是客户端（服务端返回HTTP响应设置<code v-pre>Content-Type</code>）</p>
</li>
<li>
<p><code v-pre>Content-Type</code>参数并不是必须要设置的</p>
</li>
</ul>
<p>语法格式如下：</p>
<div class="language-html ext-html"><pre v-pre class="language-html"><code>Content-Type: type/subtype [; charset] [; boundary]
</code></pre></div><ul>
<li>type/subtype：由类型与子类型两个字符串中间用<code v-pre>'/'</code>分隔而组成。不允许空格存在。</li>
<li>charset：字符编码标准</li>
<li>对于多部分实体，boundary 是必需的，其包括来自一组字符的1到70个字符，已知通过电子邮件网关是非常健壮的，而不是以空白结尾。它用于封装消息的多个部分的边界</li>
</ul>
<p><strong>Content-Type类型举例</strong></p>
<table>
<thead>
<tr>
<th>类型</th>
<th>说明</th>
<th>Content-Type典型示例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>text</code><br />（文本类型）</td>
<td>表明文件是普通文本，理论上是人类可读</td>
<td><code v-pre>text/plain</code><br /><code v-pre>text/html</code><br /><code v-pre>text/css</code><br /><code v-pre>text/javascript</code></td>
</tr>
<tr>
<td><code v-pre>image</code><br />（图片类型）</td>
<td>表明是某种图像。不包括视频，<br />但是动态图（比如动态gif）也使用image类型</td>
<td><code v-pre>image/gif</code><br /><code v-pre>image/png</code><br /><code v-pre>image/jpeg</code><br /><code v-pre>image/bmp</code><br /><code v-pre>image/webp</code><br /><code v-pre>image/x-icon</code><br /><code v-pre>image/vnd.microsoft.icon</code></td>
</tr>
<tr>
<td><code v-pre>audio</code><br />（音频类型）</td>
<td>表明是某种音频文件</td>
<td><code v-pre>audio/midi</code> <br /><code v-pre>audio/mpeg</code><br /><code v-pre>audio/webm</code><br /><code v-pre>audio/ogg</code><br /><code v-pre>audio/wav</code></td>
</tr>
<tr>
<td><code v-pre>video</code><br />（视频类型）</td>
<td>表明是某种视频文件</td>
<td><code v-pre>video/webm</code><br /><code v-pre>video/ogg</code></td>
</tr>
<tr>
<td><code v-pre>application</code><br />（二进制类型）</td>
<td>表明是某种二进制数据</td>
<td><code v-pre>  applicationx-www-form-urlencoded</code><br /><code v-pre>application/json</code><br /><code v-pre>application/octet-stream</code><br /><code v-pre>application/pdf</code></td>
</tr>
<tr>
<td><code v-pre>Multipart</code><br />（文件类型）</td>
<td>表示细分领域的文件类型的种类，经常对应不同的 MIME 类型。<br />这是复合文件的一种表现方式</td>
<td><code v-pre>multipart/form-data</code><br /><code v-pre>multipart/byteranges</code></td>
</tr>
</tbody>
</table>
<p>参考自：<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types" target="_blank" rel="noopener noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types<ExternalLinkIcon/></a></p>
<h4 id="路径参数" tabindex="-1"><a class="header-anchor" href="#路径参数" aria-hidden="true">#</a> 路径参数</h4>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"github.com/gin-gonic/gin"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 监听地址</span>
	addr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:80"</span>

	<span class="token comment">// 实例化Gin路由引擎</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 注册路由 - 路径参数</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/user/:id"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		url <span class="token operator">:=</span> c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>URL
		id <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">Param</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"URL: %s, userId: %s\n"</span><span class="token punctuation">,</span> url<span class="token punctuation">,</span> id<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/article/*id"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		url <span class="token operator">:=</span> c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>URL
		id <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">Param</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"URL: %s, articleId: %s\n"</span><span class="token punctuation">,</span> url<span class="token punctuation">,</span> id<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// 启动Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># :测试</span>
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token punctuation">\</span>Desktop<span class="token operator">></span>curl http://127.0.0.1/user		<span class="token comment"># 必须传递参数</span>
<span class="token number">404</span> page not found
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token punctuation">\</span>Desktop<span class="token operator">></span>curl http://127.0.0.1/user/		<span class="token comment"># 必须传递参数</span>
<span class="token number">404</span> page not found
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token punctuation">\</span>Desktop<span class="token operator">></span>curl http://127.0.0.1/user/1		<span class="token comment"># 数据类型可以是多种类型</span>
URL: /user/1, userId: <span class="token number">1</span>
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token punctuation">\</span>Desktop<span class="token operator">></span>curl http://127.0.0.1/user/abc	<span class="token comment"># 数据类型可以是多种类型</span>
URL: /user/abc, userId: abc
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token operator">></span>curl http://127.0.0.1/user/1/2			<span class="token comment"># 不支持多级</span>
<span class="token number">404</span> page not found

<span class="token comment"># *测试</span>
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token operator">></span>curl http://127.0.0.1/article			<span class="token comment"># 重定向</span>
<span class="token operator">&lt;</span>a <span class="token assign-left variable">href</span><span class="token operator">=</span><span class="token string">"/article/"</span><span class="token operator">></span>Moved Permanently<span class="token operator">&lt;</span>/a<span class="token operator">></span>.
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token operator">></span>curl http://127.0.0.1/article/			<span class="token comment"># 可以不传参数</span>
URL: /article/, articleId: /
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token operator">></span>curl http://127.0.0.1/article/1			<span class="token comment"># 传一个参数</span>
URL: /article/1, articleId: /1
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token operator">></span>curl http://127.0.0.1/article/abc/def	<span class="token comment"># 多级参数</span>
URL: /article/abc/def, articleId: /abc/def
</code></pre></div><h4 id="查询字符串" tabindex="-1"><a class="header-anchor" href="#查询字符串" aria-hidden="true">#</a> 查询字符串</h4>
<table>
<thead>
<tr>
<th>方法</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>Query(key string) string</code></td>
<td>获取key的值，若获取不到返回空字符串，若传递多个则只获取第一个</td>
</tr>
<tr>
<td><code v-pre>QueryArray(key string) []string</code></td>
<td>类似<code v-pre>Query</code>，可以获取多个值</td>
</tr>
<tr>
<td><code v-pre>DefaultQuery(key, defaultValue string) string</code></td>
<td>类似<code v-pre>Query</code>，可以自定义默认值</td>
</tr>
<tr>
<td><code v-pre>QueryMap(key string) map[string]string</code></td>
<td>获取key的值，输入为<code v-pre>map</code>，返回为<code v-pre>map</code></td>
</tr>
<tr>
<td><code v-pre>GetQuery(key string) (string, bool)</code></td>
<td>类似<code v-pre>Query</code>，返回两个值，ok代表是否获取到值</td>
</tr>
<tr>
<td><code v-pre>GetQueryArray(key string) ([]string, bool)</code></td>
<td>类似<code v-pre>QueryArray</code>，返回两个值，ok代表是否获取到值</td>
</tr>
<tr>
<td><code v-pre>GetQueryMap(key string) (map[string]string, bool)</code></td>
<td>类似<code v-pre>QueryMap</code>，返回两个值，ok代表是否获取到值</td>
</tr>
</tbody>
</table>
<p>示例代码</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"github.com/gin-gonic/gin"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 监听地址</span>
	addr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:80"</span>

	<span class="token comment">// 实例化Gin路由引擎</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 注册路由 - 路径参数</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		msg <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"%#v\n"</span><span class="token punctuation">,</span> c<span class="token punctuation">.</span><span class="token function">QueryMap</span><span class="token punctuation">(</span><span class="token string">"map"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> msg<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// 启动Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Administrator<span class="token operator">></span>curl <span class="token string">"http://127.0.0.1/?map\[id\]=abc&amp;map\[name\]=bob"</span>
map<span class="token punctuation">[</span>string<span class="token punctuation">]</span>string<span class="token punctuation">{</span><span class="token string">"id"</span><span class="token builtin class-name">:</span><span class="token string">"abc"</span>, <span class="token string">"name"</span><span class="token builtin class-name">:</span><span class="token string">"bob"</span><span class="token punctuation">}</span>
</code></pre></div><h4 id="表单解析" tabindex="-1"><a class="header-anchor" href="#表单解析" aria-hidden="true">#</a> 表单解析</h4>
<table>
<thead>
<tr>
<th>方法</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>PostForm(key string) string</code></td>
<td>解析表单，若获取不到返回空字符串，若获取到多个则只返回第一个</td>
</tr>
<tr>
<td><code v-pre>PostFormArray(key string) []string</code></td>
<td>类似<code v-pre>PostForm</code>，可以获取多个值</td>
</tr>
<tr>
<td><code v-pre>PostFormMap(key string) map[string]string</code></td>
<td>类似<code v-pre>PostForm</code>，输入为<code v-pre>map</code>，返回为<code v-pre>map</code></td>
</tr>
<tr>
<td><code v-pre>GetPostForm(key string) (string, bool)</code></td>
<td>类似<code v-pre>PostForm</code>，返回两个值，ok代表是否获取到值</td>
</tr>
<tr>
<td><code v-pre>GetPostFormArray(key string) ([]string, bool)</code></td>
<td>类似<code v-pre>PostFormArray</code>，返回两个值，ok代表是否获取到值</td>
</tr>
<tr>
<td><code v-pre>GetPostFormMap(key string) (map[string]string, bool)</code></td>
<td>类似<code v-pre>PostFormMap</code>，返回两个值，ok代表是否获取到值</td>
</tr>
<tr>
<td><code v-pre>DefaultPostForm(key, defaultValue string) string</code></td>
<td>类似<code v-pre>PostForm</code>，可以设置默认值</td>
</tr>
</tbody>
</table>
<details class="custom-container details"><summary>提交表单示例</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"github.com/gin-gonic/gin"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 监听地址</span>
	addr <span class="token operator">:=</span> <span class="token string">"192.168.0.105:80"</span>

	<span class="token comment">// 实例化Gin路由引擎</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 注册路由</span>
	r<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 获取Content-Type</span>
		contentType <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">GetHeader</span><span class="token punctuation">(</span><span class="token string">"Content-Type"</span><span class="token punctuation">)</span>

		<span class="token comment">// 解析表单数据</span>
		username <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">PostForm</span><span class="token punctuation">(</span><span class="token string">"username"</span><span class="token punctuation">)</span>
		password <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">PostForm</span><span class="token punctuation">(</span><span class="token string">"password"</span><span class="token punctuation">)</span>

		<span class="token comment">// 返回响应</span>
		msg <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"Content-Type: %q\nPostForm: username: %q, password: %q\n"</span><span class="token punctuation">,</span> contentType<span class="token punctuation">,</span> username<span class="token punctuation">,</span> password<span class="token punctuation">)</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> msg<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 获取Content-Type</span>
		contentType <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">GetHeader</span><span class="token punctuation">(</span><span class="token string">"Content-Type"</span><span class="token punctuation">)</span>

		<span class="token comment">// 解析表单数据</span>
		username <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">PostForm</span><span class="token punctuation">(</span><span class="token string">"username"</span><span class="token punctuation">)</span>
		password <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">PostForm</span><span class="token punctuation">(</span><span class="token string">"password"</span><span class="token punctuation">)</span>

		<span class="token comment">// 返回响应</span>
		msg <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"Content-Type: %q\nPostForm: username: %q, password: %q\n"</span><span class="token punctuation">,</span> contentType<span class="token punctuation">,</span> username<span class="token punctuation">,</span> password<span class="token punctuation">)</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> msg<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// 启动Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># -------------先使用POST方法测试------------------------------------------------------</span>
<span class="token comment"># 什么都不传，服务端接收到空字符串</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># curl http://192.168.0.105/ -XPOST</span>
Content-Type: <span class="token string">""</span>
PostForm: username: <span class="token string">""</span>, password: <span class="token string">""</span>

<span class="token comment"># 服务端响应头的Content-Type为【text/plain; charset=utf-8】</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># curl http://192.168.0.105/ -XPOST -I</span>
HTTP/1.1 <span class="token number">200</span> OK
Content-Type: text/plain<span class="token punctuation">;</span> <span class="token assign-left variable">charset</span><span class="token operator">=</span>utf-8
Date: Fri, 06 May <span class="token number">2022</span> 05:52:49 GMT
Content-Length: <span class="token number">54</span>

<span class="token comment"># ⭐使用-d参数提交数据，curl会自动设置Content-Type为application/x-www-form-urlencoded</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># curl http://192.168.0.105/ -XPOST -d "username=root&amp;password=123456中国"</span>
Content-Type: <span class="token string">"application/x-www-form-urlencoded"</span>
PostForm: username: <span class="token string">"root"</span>, password: <span class="token string">"123456中国"</span>

<span class="token comment"># 给curl设置一个错误的Content-Type,可以看到服务端获取不到我们提交的数据了</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># curl http://192.168.0.105/ -XPOST -d "username=root&amp;password=123456中国" -H "Content-Type:abc"</span>
Content-Type: <span class="token string">"abc"</span>
PostForm: username: <span class="token string">""</span>, password: <span class="token string">""</span>

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># curl http://192.168.0.105/ -XPOST -d "username=root&amp;password=123456中国" -H "Content-Type:application/json"</span>
Content-Type: <span class="token string">"application/json"</span>
PostForm: username: <span class="token string">""</span>, password: <span class="token string">""</span>

<span class="token comment"># ⭐使用-f参数提交表单，curl会自动设置Content-Type为multipart/form-data</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># curl http://192.168.0.105/ -XPOST --form username=root --form password=中国你好</span>
Content-Type: <span class="token string">"multipart/form-data; boundary=----------------------------cb1776d3bb87"</span>
PostForm: username: <span class="token string">"root"</span>, password: <span class="token string">"中国你好"</span>

<span class="token comment"># -------------再使用GET方法测试------------------------------------------------------</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># curl http://192.168.0.105/ -XGET -d "username=root&amp;password=123456中国"</span>
Content-Type: <span class="token string">"application/x-www-form-urlencoded"</span>
PostForm: username: <span class="token string">""</span>, password: <span class="token string">""</span>

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># curl http://192.168.0.105/ -XGET --form username=root --form password=中国你好</span>
Content-Type: <span class="token string">"multipart/form-data; boundary=----------------------------cd010eead867"</span>
PostForm: username: <span class="token string">"root"</span>, password: <span class="token string">"中国你好"</span>
</code></pre></div></details>
<details class="custom-container details"><summary>HTML中的form标签默认使用application/x-www-form-urlencoded</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token operator">&lt;</span><span class="token operator">!</span>DOCTYPE html<span class="token operator">></span>
<span class="token operator">&lt;</span>html lang<span class="token operator">=</span><span class="token string">"en"</span><span class="token operator">></span>
<span class="token operator">&lt;</span>head<span class="token operator">></span>
    <span class="token operator">&lt;</span>meta charset<span class="token operator">=</span><span class="token string">"UTF-8"</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>title<span class="token operator">></span>Title<span class="token operator">&lt;</span><span class="token operator">/</span>title<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>head<span class="token operator">></span>
<span class="token operator">&lt;</span>body<span class="token operator">></span>
<span class="token operator">&lt;</span>form action<span class="token operator">=</span><span class="token string">"http://192.168.0.105/"</span> method<span class="token operator">=</span><span class="token string">"post"</span><span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 默认enctype的值为application<span class="token operator">/</span>x<span class="token operator">-</span>www<span class="token operator">-</span>form<span class="token operator">-</span>urlencoded <span class="token operator">--</span><span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span><span class="token operator">&lt;</span>form action<span class="token operator">=</span><span class="token string">"http://192.168.0.105/"</span> method<span class="token operator">=</span><span class="token string">"post"</span> enctype<span class="token operator">=</span><span class="token string">"application/x-www-form-urlencoded"</span><span class="token operator">></span><span class="token operator">--</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>label<span class="token operator">></span>
        <span class="token operator">&lt;</span>span<span class="token operator">></span>用户名<span class="token operator">&lt;</span><span class="token operator">/</span>span<span class="token operator">></span>
        <span class="token operator">&lt;</span>input <span class="token keyword">type</span><span class="token operator">=</span><span class="token string">"text"</span> name<span class="token operator">=</span><span class="token string">"username"</span> placeholder<span class="token operator">=</span><span class="token string">"请输入您的用户名"</span> autocomplete<span class="token operator">=</span><span class="token string">"off"</span> autofocus<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>label<span class="token operator">></span>
    <span class="token operator">&lt;</span>label<span class="token operator">></span>
        <span class="token operator">&lt;</span>span<span class="token operator">></span>密码<span class="token operator">&lt;</span><span class="token operator">/</span>span<span class="token operator">></span>
        <span class="token operator">&lt;</span>input <span class="token keyword">type</span><span class="token operator">=</span><span class="token string">"password"</span> name<span class="token operator">=</span><span class="token string">"password"</span> placeholder<span class="token operator">=</span><span class="token string">"请输入您的密码"</span> autocomplete<span class="token operator">=</span><span class="token string">"off"</span><span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>label<span class="token operator">></span>
    <span class="token operator">&lt;</span>input <span class="token keyword">type</span><span class="token operator">=</span><span class="token string">"submit"</span> value<span class="token operator">=</span><span class="token string">"登录"</span><span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>form<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>body<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>html<span class="token operator">></span>
</code></pre></div></details>
<h4 id="参数绑定" tabindex="-1"><a class="header-anchor" href="#参数绑定" aria-hidden="true">#</a> 参数绑定</h4>
<details class="custom-container details"><summary>GET查询字符串参数绑定和【第一次使用参数绑定注意事项】</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"github.com/gin-gonic/gin"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
<span class="token punctuation">)</span>

<span class="token comment">// 第一次使用参数绑定注意事项：</span>
<span class="token comment">// (1) 结构体字段必须可导出(首字母大写)</span>
<span class="token comment">// (2) 绑定时必须用结构体指针(因为要给外部变量赋值嘛)</span>

<span class="token comment">// 查询字符串参数绑定</span>
<span class="token comment">// (3) form可选，如果不写，传递参数时必须与结构体名字一致</span>
<span class="token comment">// (4) Content-Type有没有都无所谓</span>

<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Username <span class="token builtin">string</span> <span class="token string">`form:"username"`</span>
	Password <span class="token builtin">string</span> <span class="token string">`form:"password"`</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 监听地址</span>
	addr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:80"</span>

	<span class="token comment">// 实例化Gin路由引擎</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 注册路由</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 获取Content-Type</span>
		contentType <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">GetHeader</span><span class="token punctuation">(</span><span class="token string">"Content-Type"</span><span class="token punctuation">)</span>

		<span class="token comment">// 参数绑定</span>
		<span class="token keyword">var</span> user User
		err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">ShouldBind</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusBadRequest<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
				<span class="token string">"Content-Type"</span><span class="token punctuation">:</span> contentType<span class="token punctuation">,</span>
				<span class="token string">"Message"</span><span class="token punctuation">:</span>      <span class="token string">"请求参数错误"</span> <span class="token operator">+</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 返回响应</span>
		c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">"Content-Type"</span><span class="token punctuation">:</span> contentType<span class="token punctuation">,</span>
			<span class="token string">"Username"</span><span class="token punctuation">:</span>     user<span class="token punctuation">.</span>Username<span class="token punctuation">,</span>
			<span class="token string">"Password"</span><span class="token punctuation">:</span>     user<span class="token punctuation">.</span>Password<span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// 启动Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220507134109116.png" alt="image-20220507134109116"></p>
</details>
<details class="custom-container details"><summary>POST表单参数绑定</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"github.com/gin-gonic/gin"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
<span class="token punctuation">)</span>

<span class="token comment">// Post表单参数绑定注意事项</span>
<span class="token comment">// (1) form可选，如果不写，传递参数时必须与结构体名字一致</span>
<span class="token comment">// (2) Content-Type为【application/x-www-form-urlencoded】或【multipart/form-data;boundary=xx】都可以</span>

<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Username <span class="token builtin">string</span> <span class="token string">`form:"username"`</span>
	Password <span class="token builtin">string</span> <span class="token string">`form:"password"`</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 监听地址</span>
	addr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:80"</span>

	<span class="token comment">// 实例化Gin路由引擎</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 注册路由</span>
	r<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 获取Content-Type</span>
		contentType <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">GetHeader</span><span class="token punctuation">(</span><span class="token string">"Content-Type"</span><span class="token punctuation">)</span>

		<span class="token comment">// 参数绑定</span>
		<span class="token keyword">var</span> user User
		err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">ShouldBind</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusBadRequest<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
				<span class="token string">"Content-Type"</span><span class="token punctuation">:</span> contentType<span class="token punctuation">,</span>
				<span class="token string">"Message"</span><span class="token punctuation">:</span>      <span class="token string">"请求参数错误"</span> <span class="token operator">+</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 返回响应</span>
		c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">"Content-Type"</span><span class="token punctuation">:</span> contentType<span class="token punctuation">,</span>
			<span class="token string">"Username"</span><span class="token punctuation">:</span>     user<span class="token punctuation">.</span>Username<span class="token punctuation">,</span>
			<span class="token string">"Password"</span><span class="token punctuation">:</span>     user<span class="token punctuation">.</span>Password<span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// 启动Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220507133521628.png" alt="image-20220507133521628"></p>
<p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220507133540059.png" alt="image-20220507133540059"></p>
</details>
<details class="custom-container details"><summary>POST JSON参数绑定</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"github.com/gin-gonic/gin"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
<span class="token punctuation">)</span>

<span class="token comment">// POST JSON参数绑定注意事项：</span>
<span class="token comment">// (1) 结构体Tag中json可选，如果不写，传递参数时必须与结构体名字一致</span>
<span class="token comment">// (2) Content-Type必须设置成application/json</span>

<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Username <span class="token builtin">string</span> <span class="token string">`json:"username"`</span>
	Password <span class="token builtin">string</span> <span class="token string">`json:"password"`</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 监听地址</span>
	addr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:80"</span>

	<span class="token comment">// 实例化Gin路由引擎</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 注册路由</span>
	r<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 获取Content-Type</span>
		contentType <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">GetHeader</span><span class="token punctuation">(</span><span class="token string">"Content-Type"</span><span class="token punctuation">)</span>

		<span class="token comment">// 参数绑定</span>
		<span class="token keyword">var</span> user User
		err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">ShouldBind</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusBadRequest<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
				<span class="token string">"Content-Type"</span><span class="token punctuation">:</span> contentType<span class="token punctuation">,</span>
				<span class="token string">"Message"</span><span class="token punctuation">:</span>      <span class="token string">"请求参数错误"</span> <span class="token operator">+</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 返回响应</span>
		c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">"Content-Type"</span><span class="token punctuation">:</span> contentType<span class="token punctuation">,</span>
			<span class="token string">"Username"</span><span class="token punctuation">:</span>     user<span class="token punctuation">.</span>Username<span class="token punctuation">,</span>
			<span class="token string">"Password"</span><span class="token punctuation">:</span>     user<span class="token punctuation">.</span>Password<span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// 启动Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220507134825424.png" alt="image-20220507134825424"></p>
</details>
<details class="custom-container details"><summary>多次参数绑定问题</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"github.com/gin-gonic/gin"</span>
	<span class="token string">"github.com/gin-gonic/gin/binding"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
<span class="token punctuation">)</span>

<span class="token comment">// 多次参数绑定注意事项：</span>
<span class="token comment">// 问题描述：</span>
<span class="token comment">// 		对于部分格式数据(JSON, XML, MsgPack, ProtoBuf)，使用ShouldBind多次绑定会出错,原因是c.Request.Body不可以重用，第二次读取就会出现EOF</span>
<span class="token comment">//      对于其他格式（Query, Form, FormPost, FormMultipart）则可以多次调用c.ShouldBind()</span>
<span class="token comment">// 解决办法：</span>
<span class="token comment">// 		使用ShouldBindBodyWith绑定</span>

<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Username <span class="token builtin">string</span> <span class="token string">`json:"username" form:"username"`</span>
	Password <span class="token builtin">string</span> <span class="token string">`json:"password" form:"password"`</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 监听地址</span>
	addr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:80"</span>

	<span class="token comment">// 实例化Gin路由引擎</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 注册路由</span>
	r<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 获取Content-Type</span>
		contentType <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">GetHeader</span><span class="token punctuation">(</span><span class="token string">"Content-Type"</span><span class="token punctuation">)</span>

		<span class="token comment">// 参数绑定</span>
		<span class="token keyword">var</span> user User
		<span class="token keyword">var</span> user1 User
		<span class="token comment">//if err := c.ShouldBind(&amp;user); err != nil {</span>
		<span class="token keyword">if</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">ShouldBindBodyWith</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">,</span> binding<span class="token punctuation">.</span>JSON<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusBadRequest<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
				<span class="token string">"Content-Type"</span><span class="token punctuation">:</span> contentType<span class="token punctuation">,</span>
				<span class="token string">"Message"</span><span class="token punctuation">:</span>      <span class="token string">"请求参数错误"</span> <span class="token operator">+</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>
		<span class="token comment">//if err := c.ShouldBind(&amp;user1); err != nil {</span>
		<span class="token keyword">if</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">ShouldBindBodyWith</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user1<span class="token punctuation">,</span> binding<span class="token punctuation">.</span>JSON<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusBadRequest<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
				<span class="token string">"Content-Type"</span><span class="token punctuation">:</span> contentType<span class="token punctuation">,</span>
				<span class="token string">"Message"</span><span class="token punctuation">:</span>      <span class="token string">"请求参数错误"</span> <span class="token operator">+</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 返回响应</span>
		c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">"Content-Type"</span><span class="token punctuation">:</span> contentType<span class="token punctuation">,</span>
			<span class="token string">"Username"</span><span class="token punctuation">:</span>     user<span class="token punctuation">.</span>Username<span class="token punctuation">,</span>
			<span class="token string">"Password"</span><span class="token punctuation">:</span>     user<span class="token punctuation">.</span>Password<span class="token punctuation">,</span>
			<span class="token string">"Username1"</span><span class="token punctuation">:</span>    user1<span class="token punctuation">.</span>Username<span class="token punctuation">,</span>
			<span class="token string">"Password1"</span><span class="token punctuation">:</span>    user1<span class="token punctuation">.</span>Password<span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// 启动Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h4 id="参数绑定后校验" tabindex="-1"><a class="header-anchor" href="#参数绑定后校验" aria-hidden="true">#</a> 参数绑定后校验</h4>
<p><code v-pre>gin</code>参数校验使用的是<code v-pre>validator</code>库，因此具体的校验规则可以去下面的文档中查找</p>
<p>Github：<a href="https://github.com/go-playground/validator" target="_blank" rel="noopener noreferrer">https://github.com/go-playground/validator<ExternalLinkIcon/></a></p>
<p>文档：<a href="https://pkg.go.dev/github.com/go-playground/validator" target="_blank" rel="noopener noreferrer">https://pkg.go.dev/github.com/go-playground/validator<ExternalLinkIcon/></a></p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"github.com/gin-gonic/gin"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
<span class="token punctuation">)</span>

<span class="token comment">// 参数校验都卸载binding后面，常见的规则有：</span>
<span class="token comment">// 		required  必选参数</span>
<span class="token comment">//		omitempty 可选参数</span>
<span class="token comment">//		max/min/le/lt/ge/gt/eq/ne</span>

<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Id       <span class="token builtin">int</span>    <span class="token string">`json:"id" binding:"omitempty"`</span>
	Username <span class="token builtin">string</span> <span class="token string">`json:"username" binding:"required,min=1,max=20"`</span>
	Password <span class="token builtin">string</span> <span class="token string">`json:"password" binding:"required,min=8,max=20"`</span> <span class="token comment">// 设置字符串长度最低是8</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 监听地址</span>
	addr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:80"</span>

	<span class="token comment">// 实例化Gin路由引擎</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 注册路由</span>
	r<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 获取Content-Type</span>
		contentType <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">GetHeader</span><span class="token punctuation">(</span><span class="token string">"Content-Type"</span><span class="token punctuation">)</span>

		<span class="token comment">// 参数绑定</span>
		<span class="token keyword">var</span> user User
		err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">ShouldBind</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusBadRequest<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
				<span class="token string">"Content-Type"</span><span class="token punctuation">:</span> contentType<span class="token punctuation">,</span>
				<span class="token string">"Message"</span><span class="token punctuation">:</span>      <span class="token string">"请求参数错误"</span> <span class="token operator">+</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 返回响应</span>
		c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">"Content-Type"</span><span class="token punctuation">:</span> contentType<span class="token punctuation">,</span>
			<span class="token string">"Id"</span><span class="token punctuation">:</span>           user<span class="token punctuation">.</span>Id<span class="token punctuation">,</span>
			<span class="token string">"Username"</span><span class="token punctuation">:</span>     user<span class="token punctuation">.</span>Username<span class="token punctuation">,</span>
			<span class="token string">"Password"</span><span class="token punctuation">:</span>     user<span class="token punctuation">.</span>Password<span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// 启动Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220507144553806.png" alt="image-20220507144553806"></p>
<h3 id="文件上传下载" tabindex="-1"><a class="header-anchor" href="#文件上传下载" aria-hidden="true">#</a> 文件上传下载</h3>
<h4 id="单文件上传" tabindex="-1"><a class="header-anchor" href="#单文件上传" aria-hidden="true">#</a> 单文件上传</h4>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"github.com/gin-gonic/gin"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 监听地址</span>
	addr <span class="token operator">:=</span> <span class="token string">"192.168.0.105:80"</span>

	<span class="token comment">// 实例化Gin路由引擎</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 参数调整</span>
	<span class="token comment">//r.MaxMultipartMemory默认内存限制为32MB，意思是当读取的文件大小超过这个值就会进行刷盘</span>
	<span class="token comment">//可以通过以下方法来设置</span>
	<span class="token comment">//r.MaxMultipartMemory = 64 &lt;&lt; 20 // 64 MB</span>

	<span class="token comment">// 注册路由</span>
	r<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">"/upload/"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 获取Content-Type</span>
		contentType <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">GetHeader</span><span class="token punctuation">(</span><span class="token string">"Content-Type"</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Content-Type: "</span><span class="token punctuation">,</span> contentType<span class="token punctuation">)</span>

		<span class="token comment">// 读取文件</span>
		f<span class="token punctuation">,</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">FormFile</span><span class="token punctuation">(</span><span class="token string">"logo"</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusBadRequest<span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"请求错误: %s\n"</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 保存文件,如果文件已经存在则会覆盖</span>
		err <span class="token operator">=</span> c<span class="token punctuation">.</span><span class="token function">SaveUploadedFile</span><span class="token punctuation">(</span>f<span class="token punctuation">,</span> f<span class="token punctuation">.</span>Filename<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusBadRequest<span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"服务器保存文件失败: %s\n"</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 返回响应</span>
		msg <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"Content-Type: %s\n文件上传成功\n"</span><span class="token punctuation">,</span> contentType<span class="token punctuation">)</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> msg<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// 启动Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># curl http://192.168.0.105/upload/ -F "logo=@anaconda-ks.cfg" -XPOST</span>
Content-Type: multipart/form-data<span class="token punctuation">;</span> <span class="token assign-left variable">boundary</span><span class="token operator">=</span>----------------------------0338377c72ec
文件上传成功
</code></pre></div><h4 id="多个文件上传" tabindex="-1"><a class="header-anchor" href="#多个文件上传" aria-hidden="true">#</a> 多个文件上传</h4>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"github.com/gin-gonic/gin"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 监听地址</span>
	addr <span class="token operator">:=</span> <span class="token string">"192.168.0.105:80"</span>

	<span class="token comment">// 实例化Gin路由引擎</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 参数调整</span>
	<span class="token comment">//r.MaxMultipartMemory默认内存限制为32MB，意思是当读取的文件大小超过这个值就会进行刷盘</span>
	<span class="token comment">//可以通过以下方法来设置</span>
	<span class="token comment">//r.MaxMultipartMemory = 64 &lt;&lt; 20 // 64 MB</span>

	<span class="token comment">// 注册路由</span>
	r<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">"/upload/"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 获取Content-Type</span>
		contentType <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">GetHeader</span><span class="token punctuation">(</span><span class="token string">"Content-Type"</span><span class="token punctuation">)</span>

		<span class="token comment">// 读取文件列表</span>
		form<span class="token punctuation">,</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">MultipartForm</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusBadRequest<span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"请求错误: %s\n"</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>
		files <span class="token operator">:=</span> form<span class="token punctuation">.</span>File<span class="token punctuation">[</span><span class="token string">"files"</span><span class="token punctuation">]</span> <span class="token comment">// 返回一个切片 []*FileHeader</span>
		<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>files<span class="token punctuation">)</span> <span class="token operator">&lt;=</span> <span class="token number">0</span> <span class="token punctuation">{</span>
			c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusBadRequest<span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"未上传任何文件或未指定标识符files\n"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 保存文件,如果文件已经存在则会覆盖</span>
		<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> file <span class="token operator">:=</span> <span class="token keyword">range</span> files <span class="token punctuation">{</span>
			err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">SaveUploadedFile</span><span class="token punctuation">(</span>file<span class="token punctuation">,</span> file<span class="token punctuation">.</span>Filename<span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusBadRequest<span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"服务器保存文件失败: %s\n"</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
				<span class="token keyword">return</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// 返回响应</span>
		msg <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"Content-Type: %s\n文件上传成功\n"</span><span class="token punctuation">,</span> contentType<span class="token punctuation">)</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> msg<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// 启动Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># curl http://192.168.0.105/upload/ -F "files=@anaconda-ks.cfg" --form "files=@1.txt"  -XPOST</span>
Content-Type: multipart/form-data<span class="token punctuation">;</span> <span class="token assign-left variable">boundary</span><span class="token operator">=</span>----------------------------a3bb45431558
文件上传成功
</code></pre></div><h4 id="文件下载" tabindex="-1"><a class="header-anchor" href="#文件下载" aria-hidden="true">#</a> 文件下载</h4>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"github.com/gin-gonic/gin"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 监听地址</span>
	addr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:80"</span>

	<span class="token comment">// 实例化Gin路由引擎</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 注册路由</span>
	
	<span class="token comment">// 指定单个文件下载</span>
	<span class="token comment">// 访问 http://127.0.0.1/go.mod/ 会下载当前目录下的 go.mod文件</span>
	r<span class="token punctuation">.</span><span class="token function">StaticFile</span><span class="token punctuation">(</span><span class="token string">"/go.mod"</span><span class="token punctuation">,</span> <span class="token string">"./go.mod"</span><span class="token punctuation">)</span>

	<span class="token comment">// 指定多个文件下载</span>
	<span class="token comment">// 访问 http://127.0.0.1/download/go.mod会下载当前目录下的go.mod文件</span>
	<span class="token comment">// 访问 http://127.0.0.1/download/会报404错误</span>
	r<span class="token punctuation">.</span><span class="token function">Static</span><span class="token punctuation">(</span><span class="token string">"/download/"</span><span class="token punctuation">,</span> <span class="token string">"./"</span><span class="token punctuation">)</span>

	<span class="token comment">// 静态文件服务器</span>
	<span class="token comment">// 访问 http://127.0.0.1/download2/go.mod会下载go.mod文件</span>
	<span class="token comment">// 访问 http://127.0.0.1/download2/会展示出当前目录下有哪些文件，点击可以下载（同样也可以打开子目录）</span>
	r<span class="token punctuation">.</span><span class="token function">StaticFS</span><span class="token punctuation">(</span><span class="token string">"/download2"</span><span class="token punctuation">,</span> http<span class="token punctuation">.</span><span class="token function">Dir</span><span class="token punctuation">(</span><span class="token string">"./"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// 启动Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h3 id="中间件" tabindex="-1"><a class="header-anchor" href="#中间件" aria-hidden="true">#</a> 中间件</h3>
<h4 id="中间件格式要求" tabindex="-1"><a class="header-anchor" href="#中间件格式要求" aria-hidden="true">#</a> 中间件格式要求</h4>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>Engine <span class="token punctuation">{</span>
	<span class="token function">debugPrintWARNINGDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	engine <span class="token operator">:=</span> <span class="token function">New</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	engine<span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span><span class="token function">Logger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">Recovery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>	<span class="token comment">// 默认使用了两个中间件</span>
	<span class="token keyword">return</span> engine
<span class="token punctuation">}</span>

<span class="token comment">// 看一下Use参数要求</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>engine <span class="token operator">*</span>Engine<span class="token punctuation">)</span> <span class="token function">Use</span><span class="token punctuation">(</span>middleware <span class="token operator">...</span>HandlerFunc<span class="token punctuation">)</span> IRoutes <span class="token punctuation">{</span>
	engine<span class="token punctuation">.</span>RouterGroup<span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span>middleware<span class="token operator">...</span><span class="token punctuation">)</span>
	engine<span class="token punctuation">.</span><span class="token function">rebuild404Handlers</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	engine<span class="token punctuation">.</span><span class="token function">rebuild405Handlers</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> engine
<span class="token punctuation">}</span>

<span class="token keyword">type</span> HandlerFunc <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token operator">*</span>Context<span class="token punctuation">)</span>
</code></pre></div><p>说明</p>
<ul>
<li>只要符合<code v-pre>func(*Context)</code>函数定义，就可以是一个中间件</li>
<li>在中间件中调用<code v-pre>c.Next()</code>，可以穿透中间件，执行后面的逻辑，后面逻辑的执行完成后<code v-pre>c.Next()</code>函数执行结束，继续执行中间件内容</li>
<li>在中间件中调用<code v-pre>c.Abort()</code>，可以阻止穿透中间件</li>
</ul>
<h4 id="中间件使用示例" tabindex="-1"><a class="header-anchor" href="#中间件使用示例" aria-hidden="true">#</a> 中间件使用示例</h4>
<details class="custom-container details"><summary>注册全局中间件</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"github.com/gin-gonic/gin"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token comment">// 计算每次请求花费时间中间件</span>
<span class="token keyword">func</span> <span class="token function">RequestCostMiddleware</span><span class="token punctuation">(</span><span class="token punctuation">)</span> gin<span class="token punctuation">.</span>HandlerFunc <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 开始计时</span>
		start <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>start<span class="token punctuation">)</span>
		<span class="token comment">// 调用后续的处理逻辑，在本代码中会执行后面的Handler逻辑</span>
		c<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

		<span class="token comment">// 结束计时(单位毫秒)</span>
		timedelta <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Since</span><span class="token punctuation">(</span>start<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Milliseconds</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

		<span class="token comment">// 输出结果</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%-4s %-s: Used %d milliseconds\n"</span><span class="token punctuation">,</span> c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>Method<span class="token punctuation">,</span> c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>URL<span class="token punctuation">,</span> timedelta<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 监听地址</span>
	addr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:80"</span>

	<span class="token comment">// 实例化Gin路由引擎</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 中间件使用方式一: 注册全局中间件,对所有路由有效</span>
	r<span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span><span class="token function">RequestCostMiddleware</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// 注册路由</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond <span class="token operator">*</span> <span class="token number">30</span><span class="token punctuation">)</span> <span class="token comment">// 休眠30毫秒</span>
		c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">"Message"</span><span class="token punctuation">:</span> <span class="token string">"Hello Gin!"</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// 启动Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<details class="custom-container details"><summary>注册单个路由中间件</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"github.com/gin-gonic/gin"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token comment">// 计算每次请求花费时间中间件</span>
<span class="token keyword">func</span> <span class="token function">RequestCostMiddleware</span><span class="token punctuation">(</span><span class="token punctuation">)</span> gin<span class="token punctuation">.</span>HandlerFunc <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 开始计时</span>
		start <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>start<span class="token punctuation">)</span>
		<span class="token comment">// 调用后续的处理逻辑，在本代码中会执行后面的Handler逻辑</span>
		c<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

		<span class="token comment">// 结束计时(单位毫秒)</span>
		timedelta <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Since</span><span class="token punctuation">(</span>start<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Milliseconds</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

		<span class="token comment">// 输出结果</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%-4s %-s: Used %d milliseconds\n"</span><span class="token punctuation">,</span> c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>Method<span class="token punctuation">,</span> c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>URL<span class="token punctuation">,</span> timedelta<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 监听地址</span>
	addr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:80"</span>

	<span class="token comment">// 实例化Gin路由引擎</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 注册路由</span>
	<span class="token comment">// 注册单个路由中间件</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token function">RequestCostMiddleware</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond <span class="token operator">*</span> <span class="token number">30</span><span class="token punctuation">)</span> <span class="token comment">// 休眠30毫秒</span>
		c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">"Message"</span><span class="token punctuation">:</span> <span class="token string">"Hello Gin!"</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// 启动Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<details class="custom-container details"><summary>注册路由组内全局中间件</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"github.com/gin-gonic/gin"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token comment">// 计算每次请求花费时间中间件</span>
<span class="token keyword">func</span> <span class="token function">RequestCostMiddleware</span><span class="token punctuation">(</span><span class="token punctuation">)</span> gin<span class="token punctuation">.</span>HandlerFunc <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 开始计时</span>
		start <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>start<span class="token punctuation">)</span>
		<span class="token comment">// 调用后续的处理逻辑，在本代码中会执行后面的Handler逻辑</span>
		c<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

		<span class="token comment">// 结束计时(单位毫秒)</span>
		timedelta <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Since</span><span class="token punctuation">(</span>start<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Milliseconds</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

		<span class="token comment">// 输出结果</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%-4s %-s: Used %d milliseconds\n"</span><span class="token punctuation">,</span> c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>Method<span class="token punctuation">,</span> c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>URL<span class="token punctuation">,</span> timedelta<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 监听地址</span>
	addr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:80"</span>

	<span class="token comment">// 实例化Gin路由引擎</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 注册路由组</span>
	apiV1 <span class="token operator">:=</span> r<span class="token punctuation">.</span><span class="token function">Group</span><span class="token punctuation">(</span><span class="token string">"/api/v1"</span><span class="token punctuation">)</span>

	<span class="token comment">// 路由组内注册全局中间件,仅对路由内的所有路由生效</span>
	apiV1<span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span><span class="token function">RequestCostMiddleware</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	apiV1<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token function">RequestCostMiddleware</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond <span class="token operator">*</span> <span class="token number">30</span><span class="token punctuation">)</span> <span class="token comment">// 休眠30毫秒</span>
		c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">"Message"</span><span class="token punctuation">:</span> <span class="token string">"Hello Gin!"</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// 启动Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h4 id="多个中间件执行顺序问题" tabindex="-1"><a class="header-anchor" href="#多个中间件执行顺序问题" aria-hidden="true">#</a> 多个中间件执行顺序问题</h4>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"github.com/gin-gonic/gin"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">MyMiddleware</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> gin<span class="token punctuation">.</span>HandlerFunc <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"中间件%s开始执行\n"</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span>
		c<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 调用后续的处理逻辑，在本代码中会执行后面的Handler逻辑</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"中间件%s结束执行\n"</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 监听地址</span>
	addr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:80"</span>

	<span class="token comment">// 实例化Gin路由引擎</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 注册全局中间件</span>
	r<span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span>
		<span class="token function">MyMiddleware</span><span class="token punctuation">(</span><span class="token string">"m1"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token function">MyMiddleware</span><span class="token punctuation">(</span><span class="token string">"m2"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token function">MyMiddleware</span><span class="token punctuation">(</span><span class="token string">"m3"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">)</span>

	<span class="token comment">// 注册路由组</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token function">MyMiddleware</span><span class="token punctuation">(</span><span class="token string">"m4"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Handler开始执行"</span><span class="token punctuation">)</span>
		c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">"Message"</span><span class="token punctuation">:</span> <span class="token string">"Hello Gin!"</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Handler结束执行"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// 启动Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 可以看到，与我们注册的顺序保持一致</span>
<span class="token comment"># 注意：全局中间件注册要在路由注册之前，否则不会执行到</span>
中间件m1开始执行
中间件m2开始执行
中间件m3开始执行
中间件m4开始执行
Handler开始执行
Handler结束执行
中间件m4结束执行
中间件m3结束执行
中间件m2结束执行
中间件m1结束执行
</code></pre></div><h4 id="跨中间件传值" tabindex="-1"><a class="header-anchor" href="#跨中间件传值" aria-hidden="true">#</a> 跨中间件传值</h4>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"github.com/gin-gonic/gin"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">M1Middleware</span><span class="token punctuation">(</span><span class="token punctuation">)</span> gin<span class="token punctuation">.</span>HandlerFunc <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 设置值</span>
		c<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"m1"</span><span class="token punctuation">,</span> <span class="token string">"m1 value"</span><span class="token punctuation">)</span>

		<span class="token comment">// 调用后续的处理逻辑，在本代码中会执行后面的Handler逻辑</span>
		c<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">M2Middleware</span><span class="token punctuation">(</span><span class="token punctuation">)</span> gin<span class="token punctuation">.</span>HandlerFunc <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 设置值</span>
		c<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"m2"</span><span class="token punctuation">,</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

		<span class="token comment">// 调用后续的处理逻辑，在本代码中会执行后面的Handler逻辑</span>
		c<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 监听地址</span>
	addr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:80"</span>

	<span class="token comment">// 实例化Gin路由引擎</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 注册全局中间件</span>
	r<span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span>
		<span class="token function">M1Middleware</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token function">M2Middleware</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">)</span>

	<span class="token comment">// 注册路由组</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		m1<span class="token punctuation">,</span> ok <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">"m1"</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> ok <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"拿到M1中间件的值: %#v\n"</span><span class="token punctuation">,</span> m1<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		m2<span class="token punctuation">,</span> ok <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">"m2"</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> ok <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"拿到M2中间件的值: %#v\n"</span><span class="token punctuation">,</span> m2<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">"Message"</span><span class="token punctuation">:</span> <span class="token string">"Hello Gin!"</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// 启动Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<p>输出结果</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>拿到M1中间件的值: <span class="token string">"m1 value"</span>
拿到M2中间件的值: <span class="token punctuation">[</span><span class="token punctuation">]</span>int<span class="token punctuation">{</span><span class="token number">0</span>, <span class="token number">0</span>, <span class="token number">0</span><span class="token punctuation">}</span>
</code></pre></div><h4 id="中间件或handler开启goroutine情况下" tabindex="-1"><a class="header-anchor" href="#中间件或handler开启goroutine情况下" aria-hidden="true">#</a> 中间件或Handler开启Goroutine情况下</h4>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<div class="language-go ext-go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"github.com/gin-gonic/gin"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
	<span class="token string">"sync"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">Change</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> wg <span class="token operator">*</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>Method <span class="token operator">=</span> http<span class="token punctuation">.</span>MethodPost
	wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">M1Middleware</span><span class="token punctuation">(</span><span class="token punctuation">)</span> gin<span class="token punctuation">.</span>HandlerFunc <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 当需要开启一个Goroutine时应该使用c.Copy()，而不是直接修改原始对象</span>
		wg <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">)</span>
		wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
		<span class="token comment">//go Change(c, wg)</span>
		<span class="token keyword">go</span> <span class="token function">Change</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> wg<span class="token punctuation">)</span> <span class="token comment">// 应该使用c.Copy</span>
		wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

		<span class="token comment">// 调用后续的处理逻辑，在本代码中会执行后面的Handler逻辑</span>
		c<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 监听地址</span>
	addr <span class="token operator">:=</span> <span class="token string">"127.0.0.1:80"</span>

	<span class="token comment">// 实例化Gin路由引擎</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 注册全局中间件</span>
	r<span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span><span class="token function">M1Middleware</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// 注册路由组</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">"Method"</span><span class="token punctuation">:</span>  c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>Method<span class="token punctuation">,</span>
			<span class="token string">"Message"</span><span class="token punctuation">:</span> <span class="token string">"Hello Gin!"</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// 启动Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details>
<h4 id="中间件收集列表" tabindex="-1"><a class="header-anchor" href="#中间件收集列表" aria-hidden="true">#</a> 中间件收集列表</h4>
<p>内置中间件：</p>
<ul>
<li><code v-pre>gin.BasicAuth()</code>、<code v-pre>gin.BasicAuthForRealm()</code></li>
</ul>
<p>第三方中间件：</p>
<ul>
<li>官方收集：<a href="https://github.com/gin-gonic/contrib" target="_blank" rel="noopener noreferrer">https://github.com/gin-gonic/contrib<ExternalLinkIcon/></a></li>
</ul>
</div></template>
