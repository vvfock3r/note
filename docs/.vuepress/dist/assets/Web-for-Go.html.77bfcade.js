import{_ as o,r as e,o as c,c as u,d as n,a as t,b as p,e as s}from"./app.8347a01d.js";const l={},k=p(`<h2 id="\u7248\u672C\u4ECB\u7ECD" tabindex="-1"><a class="header-anchor" href="#\u7248\u672C\u4ECB\u7ECD" aria-hidden="true">#</a> \u7248\u672C\u4ECB\u7ECD</h2><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># Go\u7248\u672C</span>
C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token operator">&gt;</span>go version
go version go1.18 windows/amd64
</code></pre></div><h2 id="net-http\u4E4Bclient" tabindex="-1"><a class="header-anchor" href="#net-http\u4E4Bclient" aria-hidden="true">#</a> net/http\u4E4BClient</h2>`,3),i=s("\u5B98\u65B9\u6587\u6863\uFF1A"),r={href:"https://pkg.go.dev/net/http",target:"_blank",rel:"noopener noreferrer"},d=s("https://pkg.go.dev/net/http"),m=p(`<h3 id="\u57FA\u7840\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u57FA\u7840\u793A\u4F8B" aria-hidden="true">#</a> \u57FA\u7840\u793A\u4F8B</h3><p>\u4E00\u4E2A\u6700\u57FA\u7840\u7684\u793A\u4F8B</p><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
	<span class="token string">&quot;os&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u53D1\u9001GET\u8BF7\u6C42</span>
	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;https://www.baidu.com&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// \u5173\u95ED\u8FDE\u63A5</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> err <span class="token operator">=</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u8F93\u51FA\u5230\u63A7\u5236\u53F0</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token operator">&lt;</span>html<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>head<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>
                location.replace<span class="token punctuation">(</span>location.href.replace<span class="token punctuation">(</span><span class="token string">&quot;https://&quot;</span>,<span class="token string">&quot;http://&quot;</span><span class="token punctuation">))</span><span class="token punctuation">;</span>
        <span class="token operator">&lt;</span>/script<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>/head<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>body<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>noscript<span class="token operator">&gt;</span><span class="token operator">&lt;</span>meta http-equiv<span class="token operator">=</span><span class="token string">&quot;refresh&quot;</span> <span class="token assign-left variable">content</span><span class="token operator">=</span><span class="token string">&quot;0;url=http://www.baidu.com/&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span>/noscript<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>/body<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>/html<span class="token operator">&gt;</span>
</code></pre></div><blockquote><p>\u8FD9\u91CC\u7684\u8F93\u51FA\u7ED3\u679C\u597D\u50CF\u4E0D\u592A\u5BF9\uFF0C\u800C\u4E14\u4E0Ecurl\u6216\u8005\u5176\u4ED6\u8BED\u8A00\u53D1\u9001HTTP\u8BF7\u6C42\u7684\u7ED3\u679C\u4E5F\u4E0D\u4E00\u81F4\uFF0C\u8FD9\u4E2A\u95EE\u9898\u53EF\u4EE5\u901A\u8FC7\u4FEE\u6539\u8BF7\u6C42\u5934\u4E2D\u7684<code>User-Agent</code>\u6765\u89E3\u51B3</p></blockquote><details class="custom-container details"><summary>\u8FDB\u4E00\u6B65\u63A2\u7D22</summary><p>\uFF081\uFF09\u67E5\u770B<code>http.Get</code>\u6E90\u7801\u53D1\u73B0\u4F1A\u8C03\u7528<code>DefaultClient.Get</code>\uFF0C\u5176\u5B9A\u4E49\u5982\u4E0B</p><div class="language-go ext-go"><pre class="language-go"><code><span class="token comment">// http.Get\u5B9A\u4E49</span>
<span class="token keyword">func</span> <span class="token function">Get</span><span class="token punctuation">(</span>url <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>resp <span class="token operator">*</span>Response<span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> DefaultClient<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// DefaultClient\u5B9A\u4E49</span>
<span class="token keyword">var</span> DefaultClient <span class="token operator">=</span> <span class="token operator">&amp;</span>Client<span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment">// Client\u7ED3\u6784\u4F53\u5B9A\u4E49</span>
<span class="token keyword">type</span> Client <span class="token keyword">struct</span> <span class="token punctuation">{</span>	
	Transport RoundTripper
	CheckRedirect <span class="token keyword">func</span><span class="token punctuation">(</span>req <span class="token operator">*</span>Request<span class="token punctuation">,</span> via <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>Request<span class="token punctuation">)</span> <span class="token builtin">error</span>
	Jar CookieJar
	Timeout time<span class="token punctuation">.</span>Duration
<span class="token punctuation">}</span>
</code></pre></div><p>\uFF082\uFF09\u6240\u4EE5\u53EF\u4EE5\u6539\u5199\u4E00\u4E0B\u6211\u4EEC\u7684\u4EE3\u7801</p><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
	<span class="token string">&quot;os&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u5B9E\u4F8B\u5316Client</span>
	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span><span class="token punctuation">}</span>

	<span class="token comment">// \u53D1\u9001GET\u8BF7\u6C42</span>
	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;https://www.baidu.com&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// \u5173\u95ED\u8FDE\u63A5</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> err <span class="token operator">=</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u8F93\u51FA\u5230\u63A7\u5236\u53F0</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>\uFF083\uFF09\u67E5\u770B<code>Client.Get</code>\u65B9\u6CD5</p><ul><li>\u4F7F\u7528<code>NewRequest</code>\u6765\u751F\u6210<code>Request</code>\u5BF9\u8C61</li><li>\u4F7F\u7528<code>Client.Do(request)</code>\u6765\u53D1\u51FA\u8BF7\u6C42</li></ul><div class="language-go ext-go"><pre class="language-go"><code><span class="token comment">// To make a request with custom headers, use NewRequest and Client.Do.	</span>
<span class="token comment">// To make a request with a specified context.Context, use NewRequestWithContext and Client.Do.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Client<span class="token punctuation">)</span> <span class="token function">Get</span><span class="token punctuation">(</span>url <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>resp <span class="token operator">*</span>Response<span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	req<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">NewRequest</span><span class="token punctuation">(</span><span class="token string">&quot;GET&quot;</span><span class="token punctuation">,</span> url<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> c<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>\uFF084\uFF09\u6240\u4EE5\u53EF\u4EE5\u518D\u6B21\u6539\u5199\u4E00\u4E0B\u6211\u4EEC\u7684\u4EE3\u7801</p><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
	<span class="token string">&quot;os&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u5B9E\u4F8B\u5316Client</span>
	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span><span class="token punctuation">}</span>

	<span class="token comment">// \u53D1\u9001GET\u8BF7\u6C42</span>
	<span class="token comment">//resp, err := client.Get(&quot;https://www.baidu.com&quot;)</span>
	req<span class="token punctuation">,</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewRequest</span><span class="token punctuation">(</span><span class="token string">&quot;GET&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;https://www.baidu.com&quot;</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>

	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u5173\u95ED\u8FDE\u63A5</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> err <span class="token operator">=</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u8F93\u51FA\u5230\u63A7\u5236\u53F0</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>\uFF085\uFF09\u67E5\u770B<code>http.NewRequest</code>\u6E90\u7801\uFF0C\u672C\u8D28\u4E0A\u662F\u8C03\u7528<code>NewRequestWithContext</code></p><div class="language-go ext-go"><pre class="language-go"><code><span class="token comment">// NewRequest wraps NewRequestWithContext using context.Background.</span>
<span class="token keyword">func</span> <span class="token function">NewRequest</span><span class="token punctuation">(</span>method<span class="token punctuation">,</span> url <span class="token builtin">string</span><span class="token punctuation">,</span> body io<span class="token punctuation">.</span>Reader<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>Request<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> <span class="token function">NewRequestWithContext</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> method<span class="token punctuation">,</span> url<span class="token punctuation">,</span> body<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h3 id="\u4FEE\u6539\u8BF7\u6C42\u5934" tabindex="-1"><a class="header-anchor" href="#\u4FEE\u6539\u8BF7\u6C42\u5934" aria-hidden="true">#</a> \u4FEE\u6539\u8BF7\u6C42\u5934</h3><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
	<span class="token string">&quot;os&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">RunServer</span><span class="token punctuation">(</span>addr <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>writer http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> request <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// ----------------- \u67E5\u770B\u8BF7\u6C42\u5934 -----------------</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;\u8BF7\u6C42\u5934: &quot;</span><span class="token punctuation">)</span>
		<span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> request<span class="token punctuation">.</span>Header <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%-15s: %#v\\n&quot;</span><span class="token punctuation">,</span> k<span class="token punctuation">,</span> v<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// ---------------------------------------------</span>
		<span class="token boolean">_</span><span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">=</span> fmt<span class="token punctuation">.</span><span class="token function">Fprintf</span><span class="token punctuation">(</span>writer<span class="token punctuation">,</span> <span class="token string">&quot;hello world!&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span>addr<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">SendRequest</span><span class="token punctuation">(</span>ServerURL <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u5B9E\u4F8B\u5316Client</span>
	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span><span class="token punctuation">}</span>

	<span class="token comment">// \u751F\u6210Request\u5BF9\u8C61</span>
	req<span class="token punctuation">,</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewRequest</span><span class="token punctuation">(</span><span class="token string">&quot;GET&quot;</span><span class="token punctuation">,</span> ServerURL<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u5B9A\u5236Request\u5BF9\u8C61</span>
	<span class="token comment">//(1) \u4E0B\u9762\u662FGo\u9ED8\u8BA4\u5E26\u7684\u8BF7\u6C42\u5934,\u5728\u63A7\u5236\u53F0\u53EF\u4EE5\u770B\u5230\u8986\u76D6\u4E86\u539F\u5148\u7684\u503C\uFF08\u6CE8\u610F\uFF1A\u5206\u522B\u4F7F\u7528Add\u548CSet\u6765\u8FDB\u884C\u6D4B\u8BD5\uFF09</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;Accept-Encoding&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;compress&quot;</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;User-Agent&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Mozilla/5.0 xxx Chrome/96.0.4664.110 Safari/537.36&quot;</span><span class="token punctuation">)</span>
	<span class="token comment">//(2)\u4E0B\u9762\u662F\u4F7F\u7528Add, \u53EF\u4EE5\u770B\u5230\u4F7F\u7528\u7684\u662F\u8FFD\u52A0\u65B9\u5F0F\uFF0C\u5E76\u4E14\u4E0D\u53BB\u91CD</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;Foo&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Bar1&quot;</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;Foo&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Bar1&quot;</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;Foo&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Bar2&quot;</span><span class="token punctuation">)</span>
	<span class="token comment">//(3)\u4E0B\u9762\u662F\u4F7F\u7528Set\uFF0C\u53EF\u4EE5\u770B\u5230\u662F\u8986\u76D6\u6A21\u5F0F</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;Ping&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Pong1&quot;</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;Ping&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Pong2&quot;</span><span class="token punctuation">)</span>

	<span class="token comment">// \u53D1\u9001\u8BF7\u6C42</span>
	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u5173\u95ED\u8FDE\u63A5</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> err <span class="token operator">=</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u8F93\u51FA\u5230\u63A7\u5236\u53F0</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u5B9A\u4E49\u53D8\u91CF</span>
	ServerListenAddr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:5000&quot;</span>      <span class="token comment">//	\u670D\u52A1\u7AEF\u76D1\u542C\u5730\u5740</span>
	ServerURL <span class="token operator">:=</span> <span class="token string">&quot;http://&quot;</span> <span class="token operator">+</span> ServerListenAddr <span class="token comment">// \u5BA2\u6237\u7AEF\u8BBF\u95EE\u5730\u5740</span>

	<span class="token comment">// \u542F\u52A8\u670D\u52A1\u7AEF</span>
	<span class="token keyword">go</span> <span class="token function">RunServer</span><span class="token punctuation">(</span>ServerListenAddr<span class="token punctuation">)</span>

	<span class="token comment">// \u542F\u52A8\u5BA2\u6237\u7AEF</span>
	<span class="token function">SendRequest</span><span class="token punctuation">(</span>ServerURL<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u9ED8\u8BA4\u7684\u8BF7\u6C42\u5934\u8F93\u51FA\u7ED3\u679C</span>
\u8BF7\u6C42\u5934:
User-Agent     <span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>string<span class="token punctuation">{</span><span class="token string">&quot;Go-http-client/1.1&quot;</span><span class="token punctuation">}</span>
Accept-Encoding: <span class="token punctuation">[</span><span class="token punctuation">]</span>string<span class="token punctuation">{</span><span class="token string">&quot;gzip&quot;</span><span class="token punctuation">}</span> 
hello world<span class="token operator">!</span>

<span class="token comment"># \u81EA\u5DF1\u5B9A\u5236\u7684\u8BF7\u6C42\u5934\u8F93\u51FA\u7ED3\u679C</span>
\u8BF7\u6C42\u5934:
Ping           <span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>string<span class="token punctuation">{</span><span class="token string">&quot;Pong2&quot;</span><span class="token punctuation">}</span>
User-Agent     <span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>string<span class="token punctuation">{</span><span class="token string">&quot;Mozilla/5.0 xxx Chrome/96.0.4664.110 Safari/537.36&quot;</span><span class="token punctuation">}</span>
Accept-Encoding: <span class="token punctuation">[</span><span class="token punctuation">]</span>string<span class="token punctuation">{</span><span class="token string">&quot;compress&quot;</span><span class="token punctuation">}</span>
Foo            <span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>string<span class="token punctuation">{</span><span class="token string">&quot;Bar1&quot;</span>, <span class="token string">&quot;Bar1&quot;</span>, <span class="token string">&quot;Bar2&quot;</span><span class="token punctuation">}</span>
hello world<span class="token operator">!</span>
</code></pre></div><h3 id="client" tabindex="-1"><a class="header-anchor" href="#client" aria-hidden="true">#</a> Client</h3><h4 id="\u57FA\u7840\u8D85\u65F6\u63A7\u5236" tabindex="-1"><a class="header-anchor" href="#\u57FA\u7840\u8D85\u65F6\u63A7\u5236" aria-hidden="true">#</a> \u57FA\u7840\u8D85\u65F6\u63A7\u5236</h4><p>\u9ED8\u8BA4\u7684<code>DefaultClient</code>\u662F\u6CA1\u6709\u8BBE\u7F6E\u8D85\u65F6\u65F6\u95F4\u7684\uFF0C\u6211\u4EEC\u53EF\u4EE5\u81EA\u5B9A\u4E49\u8D85\u65F6\u65F6\u95F4\uFF0C\u5305\u542B\u5EFA\u7ACB\u8FDE\u63A5\u3001\u91CD\u5B9A\u5411\u3001\u8BFB\u53D6\u6B63\u6587\u7B49\u6574\u4E2A\u8BF7\u6C42\u6D41\u7A0B\u65F6\u95F4</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
	<span class="token string">&quot;os&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">RunServer</span><span class="token punctuation">(</span>addr <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>writer http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> request <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">3</span><span class="token punctuation">)</span>
		<span class="token boolean">_</span><span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">=</span> fmt<span class="token punctuation">.</span><span class="token function">Fprintf</span><span class="token punctuation">(</span>writer<span class="token punctuation">,</span> <span class="token string">&quot;hello world!&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span>addr<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u5B9A\u4E49\u53D8\u91CF</span>
	ServerListenAddr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:5000&quot;</span>      <span class="token comment">//	\u670D\u52A1\u7AEF\u76D1\u542C\u5730\u5740</span>
	ServerURL <span class="token operator">:=</span> <span class="token string">&quot;http://&quot;</span> <span class="token operator">+</span> ServerListenAddr <span class="token comment">// \u5BA2\u6237\u7AEF\u8BBF\u95EE\u5730\u5740</span>

	<span class="token comment">// \u542F\u52A8\u670D\u52A1\u7AEF</span>
	<span class="token keyword">go</span> <span class="token function">RunServer</span><span class="token punctuation">(</span>ServerListenAddr<span class="token punctuation">)</span>

	<span class="token comment">// \u65B9\u5F0F\u4E00\uFF1A\u4F7F\u7528\u9ED8\u8BA4\u7684DefaultClient\uFF0C\u5B83\u6CA1\u6709\u5B9A\u4E49\u8D85\u65F6\u65F6\u95F4\uFF0C\u4F1A\u65E0\u9650\u7B49\u5F85\u4E0B\u53BB</span>
	<span class="token comment">//client := http.DefaultClient	// \u4E3A\u4E86\u4E0B\u9762\u7684\u4EE3\u7801\u7EDF\u4E00\uFF0C\u8FD9\u91CC\u7ED9DefaultClient\u91CD\u65B0\u8D4B\u503C\u4E00\u4E2A\u53D8\u91CF\uFF0C\u5B83\u662F\u4E00\u4E2A\u6307\u9488\u6240\u4EE5\u53EF\u4EE5\u76F4\u63A5\u8D4B\u503C</span>

	<span class="token comment">// \u65B9\u5F0F\u4E8C\uFF1A\u5B9E\u4F8B\u5316Client\uFF0C\u81EA\u5B9A\u4E49\u8D85\u65F6\u65F6\u95F4</span>
	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span>
		Timeout<span class="token punctuation">:</span> time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">// \u8BBE\u7F6E\u6BCF\u6B21\u53D1\u9001\u8BF7\u6C42\u8D85\u65F6\u65F6\u95F4\uFF0C\u5305\u542B\u5EFA\u7ACB\u8FDE\u63A5\u3001\u91CD\u5B9A\u5411\u3001\u8BFB\u53D6\u6B63\u6587\u7B49\u6574\u4E2A\u8BF7\u6C42\u6D41\u7A0B\u65F6\u95F4</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u53D1\u9001GET\u8BF7\u6C42</span>
	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span>ServerURL<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span><span class="token string">&quot;\u8BF7\u6C42\u8D85\u65F6: &quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// \u5173\u95ED\u8FDE\u63A5</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> err <span class="token operator">=</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u8F93\u51FA\u5230\u63A7\u5236\u53F0</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u8D85\u65F6\u8F93\u51FA\u7ED3\u679C</span>
<span class="token number">2022</span>/04/28 09:12:26 \u8BF7\u6C42\u8D85\u65F6: Get <span class="token string">&quot;http://127.0.0.1:5000&quot;</span><span class="token builtin class-name">:</span> context deadline exceeded <span class="token punctuation">(</span>Client.Timeout exceeded <span class="token keyword">while</span> awaiting headers<span class="token punctuation">)</span>

<span class="token comment"># \u672A\u8D85\u65F6\u8F93\u51FA\u7ED3\u679C</span>
hello world<span class="token operator">!</span>
</code></pre></div><h4 id="\u66F4\u7CBE\u7EC6\u7684\u8D85\u65F6\u63A7\u5236" tabindex="-1"><a class="header-anchor" href="#\u66F4\u7CBE\u7EC6\u7684\u8D85\u65F6\u63A7\u5236" aria-hidden="true">#</a> \u66F4\u7CBE\u7EC6\u7684\u8D85\u65F6\u63A7\u5236</h4><p>DefaultTransport\u4ECB\u7ECD</p><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">type</span> Client <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token comment">// Transport specifies the mechanism by which individual</span>
	<span class="token comment">// HTTP requests are made.</span>
	<span class="token comment">// If nil, DefaultTransport is used.	// \u8FD9\u91CC\u53EF\u4EE5\u770B\u5230\u9ED8\u8BA4\u4F7F\u7528 DefaultTransport</span>
	Transport RoundTripper		
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre></div><p>DefaultTransport\u6E90\u7801</p><div class="language-go ext-go"><pre class="language-go"><code><span class="token comment">// Transport\u7ED3\u6784\u4F53\u63D0\u4F9B\u4E86\u5F88\u591A\u7684\u9009\u9879\uFF0C\u4E0B\u9762\u6BCF\u4E00\u4E2A\u9009\u9879\u90FD\u53EF\u4EE5\u5728\u90A3\u91CC\u627E\u5230\u5E2E\u52A9\u4FE1\u606F</span>
<span class="token keyword">var</span> DefaultTransport RoundTripper <span class="token operator">=</span> <span class="token operator">&amp;</span>Transport<span class="token punctuation">{</span>
	Proxy<span class="token punctuation">:</span> ProxyFromEnvironment<span class="token punctuation">,</span>
	DialContext<span class="token punctuation">:</span> <span class="token function">defaultTransportDialContext</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>net<span class="token punctuation">.</span>Dialer<span class="token punctuation">{</span>
		Timeout<span class="token punctuation">:</span>   <span class="token number">30</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">,</span>			<span class="token comment">// TCP\u63E1\u624B\u8D85\u65F6\u65F6\u95F4\uFF0C\u9ED8\u8BA4\u6C38\u4E0D\u8D85\u65F6</span>
		KeepAlive<span class="token punctuation">:</span> <span class="token number">30</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">,</span>			<span class="token comment">// TCP\u63A2\u6D4B\u8FDE\u63A5\u7684\u5BF9\u7AEF\u662F\u5426\u5B58\u6D3B\u95F4\u9694\u65F6\u95F4\uFF0C\u5982\u679C\u4E3A\u8D1F\u503C\u5219\u7981\u7528\u63A2\u9488</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
	ForceAttemptHTTP2<span class="token punctuation">:</span>     <span class="token boolean">true</span><span class="token punctuation">,</span>				<span class="token comment">// \u5F53\u4F7F\u7528\u81EA\u5B9A\u4E49\u7684Dial, DialTLS, or DialContext func or TLSClientConfig\u65F6\uFF0C\u662F\u5426\u5F00\u542FHTTP/2</span>
    MaxIdleConns<span class="token punctuation">:</span>          <span class="token number">100</span><span class="token punctuation">,</span>					<span class="token comment">// (HTTP\u957F\u8FDE\u63A5)\u6700\u5927\u7A7A\u95F2\u8FDE\u63A5\u6570\uFF0C0\u4EE3\u8868\u4E0D\u9650\u5236</span>
    IdleConnTimeout<span class="token punctuation">:</span>       <span class="token number">90</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">,</span>	<span class="token comment">// (HTTP\u957F\u8FDE\u63A5)\u6BCF\u4E2A\u8FDE\u63A5\u6700\u957F\u7A7A\u95F2\u65F6\u95F4\uFF0C0\u4EE3\u8868\u4E0D\u9650\u5236</span>
	TLSHandshakeTimeout<span class="token punctuation">:</span>   <span class="token number">10</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">,</span>	<span class="token comment">// TLS\u63E1\u624B\u8D85\u65F6\u65F6\u95F4\uFF0C0\u4EE3\u8868\u6C38\u4E0D\u8D85\u65F6</span>
	ExpectContinueTimeout<span class="token punctuation">:</span> <span class="token number">1</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">,</span>		<span class="token comment">// Client\u5728\u53D1\u9001\u5305\u542B&quot;Expect: 100-continue&quot;\u7684Header\u5230\u6536\u5230\u7EE7\u7EED\u53D1\u9001Body\u7684Response\u4E4B\u95F4\u7684\u65F6\u95F4</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Transport\u9ED8\u8BA4\u503C</p><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">type</span> Transport <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    	<span class="token comment">// MaxConnsPerHost optionally limits the total number of</span>
	<span class="token comment">// connections per host, including connections in the dialing,</span>
	<span class="token comment">// active, and idle states. On limit violation, dials will block.</span>
	<span class="token comment">//</span>
	<span class="token comment">// Zero means no limit.</span>
    MaxConnsPerHost <span class="token builtin">int</span>							<span class="token comment">// (\u5BF9\u6BCF\u4E2A\u8FDC\u7A0B\u4E3B\u673A)\u6700\u5927\u8FDE\u63A5\u6570, 0\u4EE3\u8868\u4E0D\u9650\u5236</span>
    
	<span class="token comment">// MaxIdleConnsPerHost, if non-zero, controls the maximum idle</span>
	<span class="token comment">// (keep-alive) connections to keep per-host. If zero,</span>
	<span class="token comment">// DefaultMaxIdleConnsPerHost is used.</span>
	MaxIdleConnsPerHost <span class="token builtin">int</span>						<span class="token comment">// (\u5BF9\u6BCF\u4E2A\u8FDC\u7A0B\u4E3B\u673A)\u7684\u6700\u5927\u7A7A\u95F2\u8FDE\u63A5\u6570\uFF0C\u9ED8\u8BA4\u4F7F\u7528DefaultMaxIdleConnsPerHost\u5B9A\u4E49\u7684\u503C   </span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> DefaultMaxIdleConnsPerHost <span class="token operator">=</span> <span class="token number">2</span>			<span class="token comment">// \u9ED8\u8BA4\u4E3A2\uFF0C\u8FD9\u610F\u5473\u7740\u7A7A\u95F2\u8FDE\u63A5\u4E2D\u7684100\u4E2A\u8FDE\u63A5\u53EA\u6709\u4E24\u4E2A\u8FDE\u63A5\u5206\u914D\u7ED9\u8BE5\u4E3B\u673A\uFF1B\u8FD9\u4E2A\u503C\u6BD4\u8F83\u5C0F\uFF0C\u53EF\u4EE5\u6539\u5927\u4E00\u4E9B</span>
</code></pre></div><h4 id="\u8FDE\u63A5\u590D\u7528\u6D4B\u8BD5" tabindex="-1"><a class="header-anchor" href="#\u8FDE\u63A5\u590D\u7528\u6D4B\u8BD5" aria-hidden="true">#</a> \u8FDE\u63A5\u590D\u7528\u6D4B\u8BD5</h4><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;context&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
	<span class="token string">&quot;net/http/httptrace&quot;</span>
	<span class="token string">&quot;os&quot;</span>
	<span class="token string">&quot;strconv&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">RunServer</span><span class="token punctuation">(</span>addr <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>writer http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> request <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">3</span><span class="token punctuation">)</span>
		msg <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Format</span><span class="token punctuation">(</span><span class="token string">&quot;2006/01/02 15:04:05&quot;</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; HTTP Server Response: hello world!\\n&quot;</span>
		<span class="token boolean">_</span><span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Fprintf</span><span class="token punctuation">(</span>writer<span class="token punctuation">,</span> msg<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span>addr<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>http<span class="token punctuation">.</span>Client <span class="token punctuation">{</span>
	<span class="token comment">// \u5B9E\u4F8B\u5316Transport</span>
	t <span class="token operator">:=</span> http<span class="token punctuation">.</span>DefaultTransport<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>http<span class="token punctuation">.</span>Transport<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	t<span class="token punctuation">.</span>MaxIdleConnsPerHost <span class="token operator">=</span> <span class="token number">3</span> <span class="token comment">// \u8BBE\u7F6E\u6BCF\u4E2A\u4E3B\u673A\u6700\u5927\u7A7A\u95F2\u8FDE\u63A5\u6570</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316\u5BA2\u6237\u7AEF</span>
	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span>
		Timeout<span class="token punctuation">:</span>   time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token comment">// \u8BBE\u7F6E\u6BCF\u6B21\u53D1\u9001\u8BF7\u6C42\u8D85\u65F6\u65F6\u95F4\uFF0C\u5305\u542B\u5EFA\u7ACB\u8FDE\u63A5\u3001\u91CD\u5B9A\u5411\u3001\u8BFB\u53D6\u6B63\u6587\u7B49\u6574\u4E2A\u8BF7\u6C42\u6D41\u7A0B\u65F6\u95F4</span>
		Transport<span class="token punctuation">:</span> t<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> client
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">SendRequest</span><span class="token punctuation">(</span>client <span class="token operator">*</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">,</span> url <span class="token builtin">string</span><span class="token punctuation">,</span> number <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// ------------------- \u8FD9\u91CC\u662F\u6838\u5FC3\u4EE3\u7801 ----------------------</span>
	<span class="token comment">// \u751F\u6210client trace</span>
	clientTrace <span class="token operator">:=</span> <span class="token operator">&amp;</span>httptrace<span class="token punctuation">.</span>ClientTrace<span class="token punctuation">{</span>
		GotConn<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>GotConnInfo httptrace<span class="token punctuation">.</span>GotConnInfo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			reused <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">FormatBool</span><span class="token punctuation">(</span>GotConnInfo<span class="token punctuation">.</span>Reused<span class="token punctuation">)</span>   <span class="token comment">// \u8FDE\u63A5\u590D\u7528</span>
			wasidle <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">FormatBool</span><span class="token punctuation">(</span>GotConnInfo<span class="token punctuation">.</span>WasIdle<span class="token punctuation">)</span> <span class="token comment">// \u8BE5\u8FDE\u63A5\u662F\u5426\u6765\u81EA\u8FDE\u63A5\u6C60</span>
			idleTime <span class="token operator">:=</span> GotConnInfo<span class="token punctuation">.</span>IdleTime
			log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u8FDE\u63A5\u590D\u7528: %-5s | \u6765\u81EA\u8FDE\u63A5\u6C60: %-5s | \u8BE5\u8FDE\u63A5\u5DF2\u7A7A\u95F2\u7684\u65F6\u95F4: %-5s\\n&quot;</span><span class="token punctuation">,</span> reused<span class="token punctuation">,</span> wasidle<span class="token punctuation">,</span> idleTime<span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	traCtx <span class="token operator">:=</span> httptrace<span class="token punctuation">.</span><span class="token function">WithClientTrace</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> clientTrace<span class="token punctuation">)</span>

	<span class="token comment">// \u751F\u6210request</span>
	req<span class="token punctuation">,</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewRequestWithContext</span><span class="token punctuation">(</span>traCtx<span class="token punctuation">,</span> http<span class="token punctuation">.</span>MethodGet<span class="token punctuation">,</span> url<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// --------------------------------------------</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> number<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">// \u53D1\u9001GET\u8BF7\u6C42</span>
			resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span><span class="token string">&quot;\u8BF7\u6C42\u8D85\u65F6: &quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			<span class="token comment">// \u5173\u95ED\u8FDE\u63A5</span>
			<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token keyword">if</span> err <span class="token operator">=</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
					log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token comment">// \u8F93\u51FA\u5230\u63A7\u5236\u53F0</span>
			<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u5B9A\u4E49\u53D8\u91CF</span>
	ServerListenAddr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:5000&quot;</span>      <span class="token comment">//	\u670D\u52A1\u7AEF\u76D1\u542C\u5730\u5740</span>
	ServerURL <span class="token operator">:=</span> <span class="token string">&quot;http://&quot;</span> <span class="token operator">+</span> ServerListenAddr <span class="token comment">// \u5BA2\u6237\u7AEF\u8BBF\u95EE\u5730\u5740</span>

	<span class="token comment">// \u542F\u52A8\u670D\u52A1\u7AEF</span>
	<span class="token keyword">go</span> <span class="token function">RunServer</span><span class="token punctuation">(</span>ServerListenAddr<span class="token punctuation">)</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316Client</span>
	client <span class="token operator">:=</span> <span class="token function">NewClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u542F\u52A8\u5BA2\u6237\u7AEF</span>
	<span class="token keyword">go</span> <span class="token function">SendRequest</span><span class="token punctuation">(</span>client<span class="token punctuation">,</span> ServerURL<span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token comment">// \u53D1\u90013\u6B21\u8BF7\u6C42</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">)</span>          <span class="token comment">// \u7B49\u5F85\u4EE5\u4E0A\u8BF7\u6C42\u5904\u7406\u5B8C\u6BD5\uFF0C\u4E0B\u6B21\u8BF7\u6C42\u4F1A\u590D\u7528\u4E0A\u9762\u7684\u8BF7\u6C42</span>
	<span class="token keyword">go</span> <span class="token function">SendRequest</span><span class="token punctuation">(</span>client<span class="token punctuation">,</span> ServerURL<span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token comment">// \u53D1\u90013\u6B21\u8BF7\u6C42</span>
	<span class="token keyword">select</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>                            <span class="token comment">// \u963B\u585E</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u521A\u5F00\u59CB\u8FDE\u63A5\u6C60\u4E3A\u7A7A\uFF0C\u6240\u4EE5\u90FD\u662F\u65B0\u521B\u5EFA\u7684\u8FDE\u63A5</span>
<span class="token number">2022</span>/04/28 <span class="token number">12</span>:59:53 \u8FDE\u63A5\u590D\u7528: <span class="token boolean">false</span> <span class="token operator">|</span> \u6765\u81EA\u8FDE\u63A5\u6C60: <span class="token boolean">false</span> <span class="token operator">|</span> \u8BE5\u8FDE\u63A5\u5DF2\u7A7A\u95F2\u7684\u65F6\u95F4: 0s
<span class="token number">2022</span>/04/28 <span class="token number">12</span>:59:53 \u8FDE\u63A5\u590D\u7528: <span class="token boolean">false</span> <span class="token operator">|</span> \u6765\u81EA\u8FDE\u63A5\u6C60: <span class="token boolean">false</span> <span class="token operator">|</span> \u8BE5\u8FDE\u63A5\u5DF2\u7A7A\u95F2\u7684\u65F6\u95F4: 0s
<span class="token number">2022</span>/04/28 <span class="token number">12</span>:59:53 \u8FDE\u63A5\u590D\u7528: <span class="token boolean">false</span> <span class="token operator">|</span> \u6765\u81EA\u8FDE\u63A5\u6C60: <span class="token boolean">false</span> <span class="token operator">|</span> \u8BE5\u8FDE\u63A5\u5DF2\u7A7A\u95F2\u7684\u65F6\u95F4: 0s
<span class="token number">2022</span>/04/28 <span class="token number">12</span>:59:53 \u8FDE\u63A5\u590D\u7528: <span class="token boolean">false</span> <span class="token operator">|</span> \u6765\u81EA\u8FDE\u63A5\u6C60: <span class="token boolean">false</span> <span class="token operator">|</span> \u8BE5\u8FDE\u63A5\u5DF2\u7A7A\u95F2\u7684\u65F6\u95F4: 0s
<span class="token number">2022</span>/04/28 <span class="token number">12</span>:59:53 \u8FDE\u63A5\u590D\u7528: <span class="token boolean">false</span> <span class="token operator">|</span> \u6765\u81EA\u8FDE\u63A5\u6C60: <span class="token boolean">false</span> <span class="token operator">|</span> \u8BE5\u8FDE\u63A5\u5DF2\u7A7A\u95F2\u7684\u65F6\u95F4: 0s
<span class="token number">2022</span>/04/28 <span class="token number">12</span>:59:56 HTTP Server Response: hello world<span class="token operator">!</span>
<span class="token number">2022</span>/04/28 <span class="token number">12</span>:59:56 HTTP Server Response: hello world<span class="token operator">!</span>
<span class="token number">2022</span>/04/28 <span class="token number">12</span>:59:56 HTTP Server Response: hello world<span class="token operator">!</span>
<span class="token number">2022</span>/04/28 <span class="token number">12</span>:59:56 HTTP Server Response: hello world<span class="token operator">!</span>
<span class="token number">2022</span>/04/28 <span class="token number">12</span>:59:56 HTTP Server Response: hello world<span class="token operator">!</span>

<span class="token comment"># \u518D\u6B21\u53D1\u9001HTTP\u8BF7\u6C42\uFF0C\u540C\u4E00\u53F0\u4E3B\u673A\u590D\u7528\u5230\u4E863\u4E2A\u8FDE\u63A5\uFF0C\u53EF\u4EE5\u901A\u8FC7\u8C03\u6574NewClient\u4E2DMaxIdleConnsPerHost\u53C2\u6570\u6765\u590D\u7528\u540C\u4E00\u53F0\u4E3B\u673A\u66F4\u591A\u8FDE\u63A5</span>
<span class="token number">2022</span>/04/28 <span class="token number">12</span>:59:58 \u8FDE\u63A5\u590D\u7528: <span class="token boolean">true</span>  <span class="token operator">|</span> \u6765\u81EA\u8FDE\u63A5\u6C60: <span class="token boolean">true</span>  <span class="token operator">|</span> \u8BE5\u8FDE\u63A5\u5DF2\u7A7A\u95F2\u7684\u65F6\u95F4: <span class="token number">1</span>.978283s
<span class="token number">2022</span>/04/28 <span class="token number">12</span>:59:58 \u8FDE\u63A5\u590D\u7528: <span class="token boolean">true</span>  <span class="token operator">|</span> \u6765\u81EA\u8FDE\u63A5\u6C60: <span class="token boolean">true</span>  <span class="token operator">|</span> \u8BE5\u8FDE\u63A5\u5DF2\u7A7A\u95F2\u7684\u65F6\u95F4: <span class="token number">1</span>.978283s
<span class="token number">2022</span>/04/28 <span class="token number">12</span>:59:58 \u8FDE\u63A5\u590D\u7528: <span class="token boolean">true</span>  <span class="token operator">|</span> \u6765\u81EA\u8FDE\u63A5\u6C60: <span class="token boolean">true</span>  <span class="token operator">|</span> \u8BE5\u8FDE\u63A5\u5DF2\u7A7A\u95F2\u7684\u65F6\u95F4: <span class="token number">1</span>.978283s
<span class="token number">2022</span>/04/28 <span class="token number">12</span>:59:58 \u8FDE\u63A5\u590D\u7528: <span class="token boolean">false</span> <span class="token operator">|</span> \u6765\u81EA\u8FDE\u63A5\u6C60: <span class="token boolean">false</span> <span class="token operator">|</span> \u8BE5\u8FDE\u63A5\u5DF2\u7A7A\u95F2\u7684\u65F6\u95F4: 0s       
<span class="token number">2022</span>/04/28 <span class="token number">12</span>:59:58 \u8FDE\u63A5\u590D\u7528: <span class="token boolean">false</span> <span class="token operator">|</span> \u6765\u81EA\u8FDE\u63A5\u6C60: <span class="token boolean">false</span> <span class="token operator">|</span> \u8BE5\u8FDE\u63A5\u5DF2\u7A7A\u95F2\u7684\u65F6\u95F4: 0s       
<span class="token number">2022</span>/04/28 <span class="token number">13</span>:00:01 HTTP Server Response: hello world<span class="token operator">!</span>
<span class="token number">2022</span>/04/28 <span class="token number">13</span>:00:01 HTTP Server Response: hello world<span class="token operator">!</span>
<span class="token number">2022</span>/04/28 <span class="token number">13</span>:00:01 HTTP Server Response: hello world<span class="token operator">!</span>
<span class="token number">2022</span>/04/28 <span class="token number">13</span>:00:01 HTTP Server Response: hello world<span class="token operator">!</span>
<span class="token number">2022</span>/04/28 <span class="token number">13</span>:00:01 HTTP Server Response: hello world<span class="token operator">!</span>
</code></pre></div><h4 id="\u8BBE\u7F6E\u4EE3\u7406" tabindex="-1"><a class="header-anchor" href="#\u8BBE\u7F6E\u4EE3\u7406" aria-hidden="true">#</a> \u8BBE\u7F6E\u4EE3\u7406</h4><p>\u5148\u786E\u4FDD\u4E0D\u52A0\u4EE3\u7406\u7684\u65F6\u5019\u80FD\u6B63\u5E38\u8F93\u51FA\u5F53\u524DIP\uFF0C\u7136\u540E\u518D\u5207\u6362\u5230\u4EE3\u7406\u6A21\u5F0F\uFF0C\u9A8C\u8BC1\u4EE3\u7406\u662F\u5426\u751F\u6548</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
	<span class="token string">&quot;net/url&quot;</span>
	<span class="token string">&quot;os&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u5B9E\u4F8B\u5316Client(\u4E0D\u52A0\u4EE3\u7406)</span>
	<span class="token comment">//client := &amp;http.Client{}</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316Client(\u6DFB\u52A0\u4EE3\u7406)</span>
	ProxyScheme <span class="token operator">:=</span> <span class="token string">&quot;http&quot;</span>                    <span class="token comment">// \u4EE3\u7406\u534F\u8BAE</span>
	ProxyHostAndPort <span class="token operator">:=</span> <span class="token string">&quot;192.168.0.102:7890&quot;</span> <span class="token comment">// \u4EE3\u7406\u670D\u52A1\u5668\u5730\u5740\u548C\u7AEF\u53E3,\u8BF7\u6CE8\u610F\u8FD9\u91CC\u662F\u5426\u9700\u8981\u4FEE\u6539</span>
	t <span class="token operator">:=</span> http<span class="token punctuation">.</span>DefaultTransport<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>http<span class="token punctuation">.</span>Transport<span class="token punctuation">)</span>
	t<span class="token punctuation">.</span>Proxy <span class="token operator">=</span> http<span class="token punctuation">.</span><span class="token function">ProxyURL</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>url<span class="token punctuation">.</span>URL<span class="token punctuation">{</span>Scheme<span class="token punctuation">:</span> ProxyScheme<span class="token punctuation">,</span> Host<span class="token punctuation">:</span> ProxyHostAndPort<span class="token punctuation">}</span><span class="token punctuation">)</span>
	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span>
		Transport<span class="token punctuation">:</span> t<span class="token punctuation">,</span>
		Timeout<span class="token punctuation">:</span>   time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">15</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u751F\u6210request\u5BF9\u8C61, https://api.ip.sb/ip\u80FD\u4EE5\u6587\u672C\u683C\u5F0F\u8F93\u51FA\u6211\u4EEC\u5F53\u524D\u7684IP,\u53EF\u4EE5\u7528\u8FD9\u4E2A\u7F51\u7AD9\u6765\u68C0\u6D4B\u6211\u4EEC\u7684\u4EE3\u7406\u662F\u5426\u751F\u6548</span>
	req<span class="token punctuation">,</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewRequest</span><span class="token punctuation">(</span><span class="token string">&quot;GET&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;https://api.ip.sb/ip&quot;</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u4FEE\u6539User-Agent\uFF0C\u4E0D\u4FEE\u6539\u7684\u8BDD\u4F1A\u62A5403\u9519\u8BEF</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;User-Agent&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36&quot;</span><span class="token punctuation">)</span>

	<span class="token comment">// \u53D1\u9001\u8BF7\u6C42</span>
	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u5173\u95ED\u8FDE\u63A5</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> err <span class="token operator">=</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u8F93\u51FA\u5230\u63A7\u5236\u53F0</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u672A\u8BBE\u7F6E\u4EE3\u7406\u65F6\u8F93\u51FA</span>
<span class="token number">36.143</span>.45.59

<span class="token comment"># \u8BBE\u7F6E\u4EE3\u7406\u540E\u8F93\u51FA</span>
<span class="token number">87.249</span>.128.47
</code></pre></div><h4 id="\u6DFB\u52A0basic-auth\u8BA4\u8BC1" tabindex="-1"><a class="header-anchor" href="#\u6DFB\u52A0basic-auth\u8BA4\u8BC1" aria-hidden="true">#</a> \u6DFB\u52A0Basic Auth\u8BA4\u8BC1</h4><ul><li>\u65B9\u5F0F\u4E00\uFF1A\u76F4\u63A5\u8C03\u7528<code>request.SetBasicAuth(&quot;root&quot;, &quot;123456&quot;)</code></li><li>\u65B9\u5F0F\u4E8C\uFF1A\u5728Transport Proxy\u4E2D\u6CE8\u5165<code>request.SetBasicAuth(&quot;root&quot;, &quot;123456&quot;)</code></li></ul><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;encoding/base64&quot;</span>
	<span class="token string">&quot;errors&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
	<span class="token string">&quot;net/url&quot;</span>
	<span class="token string">&quot;os&quot;</span>
	<span class="token string">&quot;strings&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// \u8BF7\u6C42\u5904\u7406\u51FD\u6570</span>
<span class="token keyword">func</span> <span class="token function">index</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Fprint</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">&quot;hello world!&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// Base64\u89E3\u5BC6</span>
<span class="token keyword">func</span> <span class="token function">BasicAuthDecodeString</span><span class="token punctuation">(</span>auth <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>plaintext <span class="token builtin">string</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	authSlice <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>auth<span class="token punctuation">,</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>authSlice<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">2</span> <span class="token operator">||</span> authSlice<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token string">&quot;Basic&quot;</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;Basic auth format error&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	p<span class="token punctuation">,</span> err <span class="token operator">:=</span> base64<span class="token punctuation">.</span>StdEncoding<span class="token punctuation">.</span><span class="token function">DecodeString</span><span class="token punctuation">(</span>authSlice<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token function">string</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">,</span> err
<span class="token punctuation">}</span>

<span class="token comment">// \u7528\u6237\u9A8C\u8BC1</span>
<span class="token keyword">func</span> <span class="token function">BasicAuthVerifyUser</span><span class="token punctuation">(</span>plaintext <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
	users <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;root:123456&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;admin:654321&quot;</span><span class="token punctuation">}</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> users <span class="token punctuation">{</span>
		<span class="token keyword">if</span> v <span class="token operator">==</span> plaintext <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">true</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>

<span class="token comment">// BasicAuth\u88C5\u9970\u5668</span>
<span class="token keyword">func</span> <span class="token function">BasicAuth</span><span class="token punctuation">(</span>handler http<span class="token punctuation">.</span>Handler<span class="token punctuation">)</span> http<span class="token punctuation">.</span>Handler <span class="token punctuation">{</span>
	<span class="token comment">// \u8FD4\u56DE\u4E00\u4E2A\u65B0\u7684handler</span>
	<span class="token keyword">return</span> http<span class="token punctuation">.</span><span class="token function">HandlerFunc</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// \u83B7\u53D6Basic Auth\u8BA4\u8BC1\u51ED\u8BC1</span>
		auth <span class="token operator">:=</span> r<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;Authorization&quot;</span><span class="token punctuation">)</span> <span class="token comment">//\u83B7\u53D6Basic base64\u52A0\u5BC6\u540E\u7684\u5B57\u6BB5</span>

		<span class="token comment">// \u9A8C\u8BC1\u5931\u8D25</span>
		plaintext<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">BasicAuthDecodeString</span><span class="token punctuation">(</span>auth<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			w<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;WWW-Authenticate&quot;</span><span class="token punctuation">,</span> <span class="token string">\`Basic realm=&quot;\`</span><span class="token operator">+</span>err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">\`&quot;\`</span><span class="token punctuation">)</span>
			w<span class="token punctuation">.</span><span class="token function">WriteHeader</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusUnauthorized<span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// \u7528\u6237\u540D\u5BC6\u7801\u9A8C\u8BC1\u5931\u8D25</span>
		<span class="token keyword">if</span> <span class="token operator">!</span><span class="token function">BasicAuthVerifyUser</span><span class="token punctuation">(</span>plaintext<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			w<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;WWW-Authenticate&quot;</span><span class="token punctuation">,</span> <span class="token string">\`Basic realm=&quot;\u7528\u6237\u540D\u6216\u5BC6\u7801\u9519\u8BEF&quot;\`</span><span class="token punctuation">)</span>
			w<span class="token punctuation">.</span><span class="token function">WriteHeader</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusUnauthorized<span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// \u9A8C\u8BC1\u901A\u8FC7,\u8C03\u7528\u539F\u59CBhandler\u65B9\u6CD5</span>
		handler<span class="token punctuation">.</span><span class="token function">ServeHTTP</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">RunServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:80&quot;</span>
	http<span class="token punctuation">.</span><span class="token function">Handle</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token function">BasicAuth</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span><span class="token function">HandlerFunc</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span>addr<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">SendRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u65B9\u5F0F\u4E8C\uFF1A\u4F7F\u7528Transport Proxy</span>
	t <span class="token operator">:=</span> http<span class="token punctuation">.</span>DefaultTransport<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>http<span class="token punctuation">.</span>Transport<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	t<span class="token punctuation">.</span>Proxy <span class="token operator">=</span> <span class="token keyword">func</span><span class="token punctuation">(</span>request <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>url<span class="token punctuation">.</span>URL<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		request<span class="token punctuation">.</span><span class="token function">SetBasicAuth</span><span class="token punctuation">(</span><span class="token string">&quot;root&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;123456&quot;</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> request<span class="token punctuation">.</span>URL<span class="token punctuation">,</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316\u5BA2\u6237\u7AEF</span>
	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span>
		Timeout<span class="token punctuation">:</span>   time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token comment">// \u8BBE\u7F6E\u6BCF\u6B21\u53D1\u9001\u8BF7\u6C42\u8D85\u65F6\u65F6\u95F4\uFF0C\u5305\u542B\u5EFA\u7ACB\u8FDE\u63A5\u3001\u91CD\u5B9A\u5411\u3001\u8BFB\u53D6\u6B63\u6587\u7B49\u6574\u4E2A\u8BF7\u6C42\u6D41\u7A0B\u65F6\u95F4</span>
		Transport<span class="token punctuation">:</span> t<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u521B\u5EFARequest\u5BF9\u8C61</span>
	req<span class="token punctuation">,</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewRequest</span><span class="token punctuation">(</span><span class="token string">&quot;GET&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;http://127.0.0.1&quot;</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u65B9\u5F0F\u4E00\uFF1A\u6DFB\u52A0Baisc Auth\u8BA4\u8BC1</span>
	<span class="token comment">//req.SetBasicAuth(&quot;root&quot;, &quot;123456&quot;)</span>

	<span class="token comment">// \u53D1\u9001GET\u8BF7\u6C42</span>
	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span><span class="token string">&quot;\u8BF7\u6C42\u8D85\u65F6: &quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u5173\u95ED\u8FDE\u63A5</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> err <span class="token operator">=</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// \u8F93\u51FA\u5230\u63A7\u5236\u53F0</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u542F\u52A8\u670D\u52A1\u7AEF</span>
	<span class="token keyword">go</span> <span class="token function">RunServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u53D1\u9001\u8BF7\u6C42</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
	<span class="token function">SendRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre></div></details><h4 id="\u91CD\u5B9A\u5411\u7B56\u7565" tabindex="-1"><a class="header-anchor" href="#\u91CD\u5B9A\u5411\u7B56\u7565" aria-hidden="true">#</a> \u91CD\u5B9A\u5411\u7B56\u7565</h4><p>\u901A\u8FC7<code>Client.Do</code>\u65B9\u6CD5\u8FFD\u8E2A\u5230\u9ED8\u8BA4\u91CD\u5B9A\u5411\u7B56\u7565\u51FD\u6570\uFF0C\u5373\u6700\u591A\u5141\u8BB810\u6B21\u91CD\u5B9A\u5411</p><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">defaultCheckRedirect</span><span class="token punctuation">(</span>req <span class="token operator">*</span>Request<span class="token punctuation">,</span> via <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>Request<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>via<span class="token punctuation">)</span> <span class="token operator">&gt;=</span> <span class="token number">10</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;stopped after 10 redirects&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre></div><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
	<span class="token string">&quot;os&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">RunServer</span><span class="token punctuation">(</span>addr <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>writer http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> request <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		writer<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;Location&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;/demo&quot;</span><span class="token punctuation">)</span>
		writer<span class="token punctuation">.</span><span class="token function">WriteHeader</span><span class="token punctuation">(</span><span class="token number">301</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/demo&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>writer http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> request <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		writer<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;Location&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;https://www.baidu.com&quot;</span><span class="token punctuation">)</span>
		writer<span class="token punctuation">.</span><span class="token function">WriteHeader</span><span class="token punctuation">(</span><span class="token number">301</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span>addr<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">SendRequest</span><span class="token punctuation">(</span>ServerURL <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u5B9E\u4F8B\u5316Client</span>
	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span>
		CheckRedirect<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">,</span> via <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
			<span class="token comment">//</span>
			log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u5F53\u524D\u8BF7\u6C42\u5730\u5740: %q | \u5F53\u524D\u8BF7\u6C42\u6765\u6E90\u5730\u5740: %q\\n&quot;</span><span class="token punctuation">,</span> req<span class="token punctuation">.</span>URL<span class="token punctuation">,</span> req<span class="token punctuation">.</span><span class="token function">Referer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
			log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u5DF2\u8BBF\u95EE\u8FC7\u7684\u5730\u5740\u96C6\u5408: \\n&quot;</span><span class="token punctuation">)</span>
			<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> via <span class="token punctuation">{</span>
				log<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;   \u5DF2\u8BBF\u95EE\u8FC7\u7684\u5730\u5740: %q | \u5730\u5740\u6765\u6E90: %q\\n&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span>URL<span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">Referer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

			<span class="token keyword">return</span> <span class="token boolean">nil</span> <span class="token comment">// \u53EF\u4EE5\u6B63\u5E38\u91CD\u5B9A\u5411</span>
			<span class="token comment">//return http.ErrUseLastResponse // \u7981\u6B62\u91CD\u5B9A\u5411</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u751F\u6210Request\u5BF9\u8C61</span>
	req<span class="token punctuation">,</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewRequest</span><span class="token punctuation">(</span><span class="token string">&quot;GET&quot;</span><span class="token punctuation">,</span> ServerURL<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u53D1\u9001\u8BF7\u6C42</span>
	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>

	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u5173\u95ED\u8FDE\u63A5</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> err <span class="token operator">=</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u8F93\u51FA\u5230\u63A7\u5236\u53F0</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u5B9A\u4E49\u53D8\u91CF</span>
	ServerListenAddr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:5000&quot;</span>      <span class="token comment">//	\u670D\u52A1\u7AEF\u76D1\u542C\u5730\u5740</span>
	ServerURL <span class="token operator">:=</span> <span class="token string">&quot;http://&quot;</span> <span class="token operator">+</span> ServerListenAddr <span class="token comment">// \u5BA2\u6237\u7AEF\u8BBF\u95EE\u5730\u5740</span>

	<span class="token comment">// \u542F\u52A8\u670D\u52A1\u7AEF</span>
	<span class="token keyword">go</span> <span class="token function">RunServer</span><span class="token punctuation">(</span>ServerListenAddr<span class="token punctuation">)</span>

	<span class="token comment">// \u542F\u52A8\u5BA2\u6237\u7AEF</span>
	<span class="token function">SendRequest</span><span class="token punctuation">(</span>ServerURL<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u5141\u8BB8\u91CD\u5B9A\u5411\u7B56\u7565\u8F93\u51FA\u7ED3\u679C</span>
<span class="token comment"># \u8BBF\u95EE http://127.0.0.1:5000/ --&gt; \u91CD\u5B9A\u5411\u81F3http://127.0.0.1:5000/demo/ --&gt; \u91CD\u5B9A\u5411\u81F3https://www.baidu.com \u8F93\u51FA\u7ED3\u679C</span>
<span class="token number">2022</span>/04/28 <span class="token number">17</span>:07:02 \u5F53\u524D\u8BF7\u6C42\u5730\u5740: <span class="token string">&quot;http://127.0.0.1:5000/demo&quot;</span> <span class="token operator">|</span> \u5F53\u524D\u8BF7\u6C42\u6765\u6E90\u5730\u5740: <span class="token string">&quot;http://127.0.0.1:5000&quot;</span>
<span class="token number">2022</span>/04/28 <span class="token number">17</span>:07:02 \u5DF2\u8BBF\u95EE\u8FC7\u7684\u5730\u5740\u96C6\u5408:
<span class="token number">2022</span>/04/28 <span class="token number">17</span>:07:02    \u5DF2\u8BBF\u95EE\u8FC7\u7684\u5730\u5740: <span class="token string">&quot;http://127.0.0.1:5000&quot;</span> <span class="token operator">|</span> \u5730\u5740\u6765\u6E90: <span class="token string">&quot;&quot;</span>
<span class="token number">2022</span>/04/28 <span class="token number">17</span>:07:02
<span class="token number">2022</span>/04/28 <span class="token number">17</span>:07:02 \u5F53\u524D\u8BF7\u6C42\u5730\u5740: <span class="token string">&quot;https://www.baidu.com&quot;</span> <span class="token operator">|</span> \u5F53\u524D\u8BF7\u6C42\u6765\u6E90\u5730\u5740: <span class="token string">&quot;http://127.0.0.1:5000/demo&quot;</span>
<span class="token number">2022</span>/04/28 <span class="token number">17</span>:07:02 \u5DF2\u8BBF\u95EE\u8FC7\u7684\u5730\u5740\u96C6\u5408:
<span class="token number">2022</span>/04/28 <span class="token number">17</span>:07:02    \u5DF2\u8BBF\u95EE\u8FC7\u7684\u5730\u5740: <span class="token string">&quot;http://127.0.0.1:5000&quot;</span> <span class="token operator">|</span> \u5730\u5740\u6765\u6E90: <span class="token string">&quot;&quot;</span>
<span class="token number">2022</span>/04/28 <span class="token number">17</span>:07:02    \u5DF2\u8BBF\u95EE\u8FC7\u7684\u5730\u5740: <span class="token string">&quot;http://127.0.0.1:5000/demo&quot;</span> <span class="token operator">|</span> \u5730\u5740\u6765\u6E90: <span class="token string">&quot;http://127.0.0.1:5000&quot;</span>
<span class="token number">2022</span>/04/28 <span class="token number">17</span>:07:02
<span class="token operator">&lt;</span>html<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>head<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>
                location.replace<span class="token punctuation">(</span>location.href.replace<span class="token punctuation">(</span><span class="token string">&quot;https://&quot;</span>,<span class="token string">&quot;http://&quot;</span><span class="token punctuation">))</span><span class="token punctuation">;</span>
        <span class="token operator">&lt;</span>/script<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>/head<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>body<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>noscript<span class="token operator">&gt;</span><span class="token operator">&lt;</span>meta http-equiv<span class="token operator">=</span><span class="token string">&quot;refresh&quot;</span> <span class="token assign-left variable">content</span><span class="token operator">=</span><span class="token string">&quot;0;url=http://www.baidu.com/&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span>/noscript<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>/body<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>/html<span class="token operator">&gt;</span>

<span class="token comment"># \u7981\u6B62\u91CD\u5B9A\u5411\u8F93\u51FA\u7ED3\u679C</span>
<span class="token number">2022</span>/04/28 <span class="token number">17</span>:11:12 \u5F53\u524D\u8BF7\u6C42\u5730\u5740: <span class="token string">&quot;http://127.0.0.1:5000/demo&quot;</span> <span class="token operator">|</span> \u5F53\u524D\u8BF7\u6C42\u6765\u6E90\u5730\u5740: <span class="token string">&quot;http://127.0.0.1:5000&quot;</span>
<span class="token number">2022</span>/04/28 <span class="token number">17</span>:11:12 \u5DF2\u8BBF\u95EE\u8FC7\u7684\u5730\u5740\u96C6\u5408:                                      
<span class="token number">2022</span>/04/28 <span class="token number">17</span>:11:12    \u5DF2\u8BBF\u95EE\u8FC7\u7684\u5730\u5740: <span class="token string">&quot;http://127.0.0.1:5000&quot;</span> <span class="token operator">|</span> \u5730\u5740\u6765\u6E90: <span class="token string">&quot;&quot;</span>
<span class="token number">2022</span>/04/28 <span class="token number">17</span>:11:12         
</code></pre></div><h4 id="cookie\u8BBE\u7F6E\u4E0E\u67E5\u770B" tabindex="-1"><a class="header-anchor" href="#cookie\u8BBE\u7F6E\u4E0E\u67E5\u770B" aria-hidden="true">#</a> Cookie\u8BBE\u7F6E\u4E0E\u67E5\u770B</h4><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;math/rand&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
	<span class="token string">&quot;net/http/cookiejar&quot;</span>
	<span class="token string">&quot;net/url&quot;</span>
	<span class="token string">&quot;strconv&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">RunServer</span><span class="token punctuation">(</span>addr <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>writer http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> request <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// \u670D\u52A1\u7AEF\u8BBE\u7F6Ecookie</span>
		rand<span class="token punctuation">.</span><span class="token function">Seed</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">UnixNano</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// \u8BBE\u7F6E\u968F\u673A\u6570\u79CD\u5B50</span>
		cookie1 <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Cookie<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">&quot;uid&quot;</span><span class="token punctuation">,</span> Value<span class="token punctuation">:</span> strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span>rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token number">999</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
		cookie2 <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Cookie<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">&quot;gid&quot;</span><span class="token punctuation">,</span> Value<span class="token punctuation">:</span> strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span>rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token number">999</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
		http<span class="token punctuation">.</span><span class="token function">SetCookie</span><span class="token punctuation">(</span>writer<span class="token punctuation">,</span> cookie1<span class="token punctuation">)</span>
		http<span class="token punctuation">.</span><span class="token function">SetCookie</span><span class="token punctuation">(</span>writer<span class="token punctuation">,</span> cookie2<span class="token punctuation">)</span>

		<span class="token comment">// \u8FD4\u56DE\u54CD\u5E94</span>
		<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Fprintf</span><span class="token punctuation">(</span>writer<span class="token punctuation">,</span> <span class="token string">&quot;hello world!&quot;</span><span class="token punctuation">)</span>
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
	<span class="token comment">// \u5B9E\u4F8B\u5316cookiejar</span>
	jar<span class="token punctuation">,</span> err <span class="token operator">:=</span> cookiejar<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316Client</span>
	<span class="token comment">// Jar\u53C2\u6570\uFF1A\u670D\u52A1\u7AEF\u54CD\u5E94\u8BBE\u7F6E\u7684Cookie\u4F1A\u81EA\u52A8\u4FDD\u5B58\uFF0C\u4E0B\u6B21\u5BA2\u6237\u7AEF\u8BF7\u6C42\u65F6\u4F1A\u81EA\u52A8\u5E26\u4E0A(\u82E5\u8981\u67E5\u770B\u672C\u6B21\u8BF7\u6C42\u7684Cookie\u5FC5\u987B\u5728\u8BF7\u6C42\u53D1\u9001\u5B8C\u6210\u4E4B\u540E\uFF0C\u5373client.Do\u65B9\u6CD5\u4E4B\u540E)</span>
	<span class="token comment">// 		   \u5BA2\u6237\u7AEF\u4E5F\u53EF\u4EE5\u4E0D\u7528\u8BE5\u53C2\u6570\uFF0C\u800C\u662F\u6BCF\u6B21\u8BF7\u6C42\u65F6\u4E3B\u52A8\u6DFB\u52A0Cookie\u3002</span>
	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span>
		Jar<span class="token punctuation">:</span> jar<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> client
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">SendRequest</span><span class="token punctuation">(</span>client <span class="token operator">*</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">,</span> ServerURL <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u751F\u6210Request\u5BF9\u8C61</span>
	req<span class="token punctuation">,</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewRequest</span><span class="token punctuation">(</span><span class="token string">&quot;GET&quot;</span><span class="token punctuation">,</span> ServerURL<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u5BA2\u6237\u7AEF\u4E3B\u52A8\u8BBE\u7F6ECookie</span>
	rand<span class="token punctuation">.</span><span class="token function">Seed</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">UnixNano</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// \u8BBE\u7F6E\u968F\u673A\u6570\u79CD\u5B50</span>
	cookie <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Cookie<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">&quot;client&quot;</span><span class="token punctuation">,</span> Value<span class="token punctuation">:</span> strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span>rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token number">999</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
	req<span class="token punctuation">.</span><span class="token function">AddCookie</span><span class="token punctuation">(</span>cookie<span class="token punctuation">)</span>

	<span class="token comment">// \u53D1\u9001\u8BF7\u6C42</span>
	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u67E5\u770B\u5BA2\u6237\u7AEF\u643A\u5E26\u7684Cookie, \u8981\u5728\u53D1\u9001\u5B8C\u8BF7\u6C42\u4EE5\u540E\u624D\u80FD\u67E5\u770B\u643A\u5E26\u7684Cookie</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u5BA2\u6237\u7AEF\u53D1\u9001\u8BF7\u6C42\u643A\u5E26\u7684Cookie: %q\\n&quot;</span><span class="token punctuation">,</span> req<span class="token punctuation">.</span><span class="token function">Cookies</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// \u5173\u95ED\u8FDE\u63A5</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> err <span class="token operator">=</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u8F93\u51FA\u5230\u63A7\u5236\u53F0</span>
	data<span class="token punctuation">,</span> err <span class="token operator">:=</span> io<span class="token punctuation">.</span><span class="token function">ReadAll</span><span class="token punctuation">(</span>resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u670D\u52A1\u7AEF\u54CD\u5E94\u5185\u5BB9: %s | \u670D\u52A1\u7AEF\u8BBE\u7F6E\u7684Cookie: %q\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">,</span> resp<span class="token punctuation">.</span><span class="token function">Cookies</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u5B9A\u4E49\u53D8\u91CF</span>
	ServerListenAddr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:5000&quot;</span>      <span class="token comment">//	\u670D\u52A1\u7AEF\u76D1\u542C\u5730\u5740</span>
	ServerURL <span class="token operator">:=</span> <span class="token string">&quot;http://&quot;</span> <span class="token operator">+</span> ServerListenAddr <span class="token comment">// \u5BA2\u6237\u7AEF\u8BBF\u95EE\u5730\u5740</span>

	<span class="token comment">// \u542F\u52A8\u670D\u52A1\u7AEF</span>
	<span class="token keyword">go</span> <span class="token function">RunServer</span><span class="token punctuation">(</span>ServerListenAddr<span class="token punctuation">)</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316\u5BA2\u6237\u7AEF</span>
	<span class="token comment">// \u5BA2\u6237\u7AEF\u5B9E\u4F8B\u5316\u65F6\u53EA\u9700\u8981\u6DFB\u52A0Jar\u5C5E\u6027\uFF0C\u4E0B\u6B21</span>
	client <span class="token operator">:=</span> <span class="token function">NewClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u53D1\u9001\u8BF7\u6C42</span>
	<span class="token function">SendRequest</span><span class="token punctuation">(</span>client<span class="token punctuation">,</span> ServerURL<span class="token punctuation">)</span>

	<span class="token comment">// \u67E5\u770Bclient.Jar\u5B58\u50A8\u7684Cookie</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>client<span class="token punctuation">.</span>Jar<span class="token punctuation">.</span><span class="token function">Cookies</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>url<span class="token punctuation">.</span>URL<span class="token punctuation">{</span>
		Scheme<span class="token punctuation">:</span> <span class="token string">&quot;http&quot;</span><span class="token punctuation">,</span>
		Host<span class="token punctuation">:</span>   <span class="token string">&quot;127.0.0.1:5000&quot;</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u518D\u6B21\u53D1\u9001\u8BF7\u6C42\uFF0C\u81EA\u52A8\u643A\u5E26Cookie</span>
	<span class="token function">SendRequest</span><span class="token punctuation">(</span>client<span class="token punctuation">,</span> ServerURL<span class="token punctuation">)</span>

<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u5728\u6211\u4EEC\u8FD9\u4E2A\u4EE3\u7801\u4E2D\uFF0C\u5BA2\u6237\u7AEF\u6BCF\u6B21\u8BF7\u6C42\u65F6\u90FD\u4F1A\u90FD\u4F1A\u751F\u6210\u968F\u673Acookie\uFF08client=xxx\uFF09\uFF0C\u6240\u4EE5\u4E24\u6B21\u8BF7\u6C42\u4E2Dclient\u503C\u4E0D\u4E00\u6837</span>
<span class="token comment"># uid\u548Cgid\u662F\u670D\u52A1\u7AEF\u8BBE\u7F6E\u7684Cookie\uFF0C\u901A\u8FC7client.Jar\u5C5E\u6027\u6765\u81EA\u52A8\u7BA1\u7406\uFF0C\u4E0B\u6B21\u8BF7\u6C42\u7684\u65F6\u5019\u4F1A\u81EA\u52A8\u5E26\u4E0A</span>
\u5BA2\u6237\u7AEF\u53D1\u9001\u8BF7\u6C42\u643A\u5E26\u7684Cookie: <span class="token punctuation">[</span><span class="token string">&quot;client=352&quot;</span><span class="token punctuation">]</span>
\u670D\u52A1\u7AEF\u54CD\u5E94\u5185\u5BB9: hello world<span class="token operator">!</span> <span class="token operator">|</span> \u670D\u52A1\u7AEF\u8BBE\u7F6E\u7684Cookie: <span class="token punctuation">[</span><span class="token string">&quot;uid=94&quot;</span> <span class="token string">&quot;gid=307&quot;</span><span class="token punctuation">]</span> 
                                                                        
<span class="token punctuation">[</span>uid<span class="token operator">=</span><span class="token number">94</span> <span class="token assign-left variable">gid</span><span class="token operator">=</span><span class="token number">307</span><span class="token punctuation">]</span>                                                        
                                                                        
\u5BA2\u6237\u7AEF\u53D1\u9001\u8BF7\u6C42\u643A\u5E26\u7684Cookie: <span class="token punctuation">[</span><span class="token string">&quot;client=489&quot;</span> <span class="token string">&quot;uid=94&quot;</span> <span class="token string">&quot;gid=307&quot;</span><span class="token punctuation">]</span>           
\u670D\u52A1\u7AEF\u54CD\u5E94\u5185\u5BB9: hello world<span class="token operator">!</span> <span class="token operator">|</span> \u670D\u52A1\u7AEF\u8BBE\u7F6E\u7684Cookie: <span class="token punctuation">[</span><span class="token string">&quot;uid=489&quot;</span> <span class="token string">&quot;gid=407&quot;</span><span class="token punctuation">]</span>
</code></pre></div><h3 id="groutine\u6570\u91CF\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#groutine\u6570\u91CF\u95EE\u9898" aria-hidden="true">#</a> Groutine\u6570\u91CF\u95EE\u9898</h3><p>\u53EA\u662F\u7B80\u5355\u53D1\u9001\u4E00\u4E2A<code>GET</code>\u8BF7\u6C42\uFF0C\u5173\u95ED\u8FDE\u63A5\u540E\u53D1\u73B0\uFF1A</p><p>\uFF081\uFF09\u4E3A\u4EC0\u4E48<code>Goroutine</code>\u6570\u91CF\u662F3\uFF1F</p><p>\uFF082\uFF09\u4E3A\u4EC0\u4E48\u4F1A\u591A\u51FA\u67652\u4E2A\uFF1F</p><p>\uFF083\uFF09\u591A\u51FA\u6765\u76842\u4E2A\u662F\u5E72\u561B\u7684\uFF1F</p><p>\uFF084\uFF09\u6362\u4E00\u4E2A\u7F51\u7AD9\u6D4B\u8BD5\uFF0C\u53D1\u4E00\u6B21\u8BF7\u6C42\uFF0C\u53D1\u73B0<code>Goroutine</code>\u53C8\u53D8\u62102\u4E86\uFF0C\u4E3A\u4EC0\u4E48\uFF1F</p><details class="custom-container details"><summary>\u95EE\u98981\u9A8C\u8BC1\uFF1AGoroutine\u6570\u91CF\u662F3</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
	<span class="token string">&quot;runtime&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u5B9E\u4F8B\u5316Client	</span>
	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span><span class="token punctuation">}</span>

	<span class="token comment">// \u53D1\u9001GET\u8BF7\u6C42</span>
	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;https://www.baidu.com&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u8F93\u51FA\u5230\u63A7\u5236\u53F0</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>io<span class="token punctuation">.</span>Discard<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u5173\u95ED\u8FDE\u63A5</span>
	err <span class="token operator">=</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u67E5\u770Bgoroutine\u6570\u91CF</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>runtime<span class="token punctuation">.</span><span class="token function">NumGoroutine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u8F93\u51FA\u7ED3\u679C\uFF1A3</span>
</code></pre></div></details><details class="custom-container details"><summary>\u95EE\u98982\u731C\u60F3\u5E76\u9A8C\u8BC1-\u65B9\u5F0F1\uFF1A\u5173\u95ED\u8FDE\u63A5\u540E\u5E76\u6CA1\u6709\u771F\u6B63\u9500\u6BC1\u800C\u662F\u653E\u5165\u5230\u8FDE\u63A5\u6C60\u4E2D\u4E86\uFF0C\u901A\u8FC7\u8C03\u6574\u6700\u5927\u7A7A\u95F2\u8FDE\u63A5\u6570\u6765\u9A8C\u8BC1</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
	<span class="token string">&quot;runtime&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u5B9E\u4F8B\u5316Client</span>
	t <span class="token operator">:=</span> http<span class="token punctuation">.</span>DefaultTransport<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>http<span class="token punctuation">.</span>Transport<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	t<span class="token punctuation">.</span>MaxIdleConns <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token comment">// (HTTP\u957F\u8FDE\u63A5)\u6700\u5927\u7A7A\u95F2\u8FDE\u63A5\u6570\uFF0C0\u4EE3\u8868\u4E0D\u9650\u5236\uFF0C\u8BBE\u7F6E\u4E3A-1\uFF0C\u5373\u4E0D\u5141\u8BB8\u6709\u7A7A\u95F2\u8FDE\u63A5</span>
	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span>Transport<span class="token punctuation">:</span> t<span class="token punctuation">}</span>

	<span class="token comment">// \u53D1\u9001GET\u8BF7\u6C42</span>
	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;https://www.baidu.com&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u8F93\u51FA\u5230\u63A7\u5236\u53F0</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>io<span class="token punctuation">.</span>Discard<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u5173\u95ED\u8FDE\u63A5</span>
	err <span class="token operator">=</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u67E5\u770Bgoroutine\u6570\u91CF</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>runtime<span class="token punctuation">.</span><span class="token function">NumGoroutine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u8F93\u51FA\u7ED3\u679C\uFF1A1</span>
</code></pre></div></details><details class="custom-container details"><summary>\u95EE\u98982\u731C\u60F3\u5E76\u9A8C\u8BC1-\u65B9\u5F0F2\uFF1A\u901A\u8FC7\u5411\u4E0D\u540C\u4E3B\u673A\u53D1\u8BF7\u6C42\uFF0C\u8BA9\u8FDE\u63A5\u6C60\u4E2D\u7684\u8FDE\u63A5\u5F97\u4E0D\u5230\u590D\u7528\uFF0C\u9A8C\u8BC11\u4E2A\u8BF7\u6C42\u5BF9\u5E942\u4E2AGroutine\u7684\u60F3\u6CD5\u5BF9\u4E0D\u5BF9</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
	<span class="token string">&quot;runtime&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u5B9E\u4F8B\u5316Client</span>
	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span><span class="token punctuation">}</span>

	<span class="token comment">// \u7B80\u5355\u5C01\u88C5\u4E00\u4E0B</span>
	sendRequest <span class="token operator">:=</span> <span class="token keyword">func</span><span class="token punctuation">(</span>url <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// \u53D1\u9001GET\u8BF7\u6C42</span>
		resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// \u8F93\u51FA\u5230\u63A7\u5236\u53F0</span>
		<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>io<span class="token punctuation">.</span>Discard<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// \u5173\u95ED\u8FDE\u63A5</span>
		err <span class="token operator">=</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u53D1\u9001\u8BF7\u6C42</span>
	<span class="token comment">// \u5411\u4E24\u4E2A\u4E0D\u540C\u7684\u4E3B\u673A\u53D1\u9001\u8BF7\u6C42\uFF0C\u8FDE\u63A5\u5F97\u4E0D\u5230\u590D\u7528\uFF0C\u6BCF\u4E2A\u8BF7\u6C42\u521B\u5EFA2\u4E2Agoroutine\uFF0C\u6240\u4EE5\u5F53\u53D1\u90012\u6B21\u8BF7\u6C42\u5E94\u8BE5\u603B\u5171\u67095\u4E2Agoroutine</span>
	<span class="token function">sendRequest</span><span class="token punctuation">(</span><span class="token string">&quot;https://www.baidu.com&quot;</span><span class="token punctuation">)</span>
	<span class="token function">sendRequest</span><span class="token punctuation">(</span><span class="token string">&quot;https://www.qq.com&quot;</span><span class="token punctuation">)</span>
	<span class="token comment">//sendRequest(&quot;https://www.163.com&quot;)</span>

	<span class="token comment">// \u67E5\u770Bgoroutine\u6570\u91CF</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>runtime<span class="token punctuation">.</span><span class="token function">NumGoroutine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u8F93\u51FA\u7ED3\u679C\uFF1A5</span>
</code></pre></div></details><details class="custom-container details"><summary>\u95EE\u98983\u731C\u60F3<span style="color:red;font-weight:bold;">\u672A\u9A8C\u8BC1</span>\uFF1A1\u4E2AGroutine\u7528\u4E8E\u8BFB\uFF0C1\u4E2AGroutine\u7528\u4E8E\u5199\uFF08\u6C42\u5927\u4F6C\u6307\u70B9\u8FF7\u6D25\uFF09</summary></details>`,56),g={class:"custom-container details"},f=n("summary",null,"\u95EE\u98984\u731C\u60F3\u5E76\u9A8C\u8BC1\uFF1A\u8BE5\u7F51\u7AD9\u4F7F\u7528\u7684\u662FHTTP/2\u534F\u8BAE\uFF0CHTTP/1.1\u662F\u534A\u53CC\u5DE5\uFF0CHTTP/2\u548CWebSocket\u4E00\u6837\u662F\u5168\u53CC\u5DE5\u7684\uFF0C\u8BFB\u548C\u5199\u53EF\u4EE5\u5728\u4E00\u4E2AGoroutine\u4E2D\u5B8C\u6210",-1),h=n("p",null,"\u8FD9\u91CC\u4F7F\u7528httpstat\u6765\u67E5\u770Bhttp\u534F\u8BAE\uFF0C\u5F53\u7136\u4E5F\u53EF\u4EE5\u4F7F\u7528\u5176\u4ED6\u5DE5\u5177\uFF0C\u6BD4\u5982\u6D4F\u89C8\u5668",-1),q=n("p",null,[n("img",{src:"https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220430104420307.png",alt:"image-20220430104420307"})],-1),y=n("p",null,"\u6CE8\u610F\u4E8B\u9879\uFF1A",-1),b=n("p",null,"\uFF081\uFF09curl\u9ED8\u8BA4\u662F\u4E0D\u652F\u6301HTTP/2\u534F\u8BAE\u7684\uFF0C\u9664\u975E\u91CD\u65B0\u7F16\u8BD1\uFF0C\u6240\u4EE5\u7528curl\u6D4B\u8BD5\u7684\u8BDD\u4F1A\u964D\u7EA7\u5230HTTP/1.1",-1),w=n("p",null,[n("img",{src:"https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220430104801284.png",alt:"image-20220430104801284"})],-1),v=n("p",null,[s("\uFF082\uFF09HTTP/2\u54CD\u5E94\u5934\u4E2D\u5E76\u6CA1\u6709\u770B\u5230"),n("code",null,"Keep-Alive"),s("\uFF0C\u8FD9\u662F\u56E0\u4E3AHTTP/2\u534F\u8BAE\u89C4\u5B9A\u7684\uFF0C\u5B83\u5220\u9664\u4E86\u5F88\u591A\u5B57\u6BB5\uFF0C\u6BD4\u5982"),n("code",null,"Keep-Alive"),s("\u3001"),n("code",null,"Proxy-Connection"),s("\u7B49")],-1),x=s("\u200B \u53C2\u8003RFC 7540\uFF1A"),S={href:"https://www.rfc-editor.org/rfc/rfc7540.html#section-8.1.2.2",target:"_blank",rel:"noopener noreferrer"},T=s("https://www.rfc-editor.org/rfc/rfc7540.html#section-8.1.2.2"),P=p(`<h3 id="groutine\u6CC4\u6F0F\u4E4Btransport" tabindex="-1"><a class="header-anchor" href="#groutine\u6CC4\u6F0F\u4E4Btransport" aria-hidden="true">#</a> Groutine\u6CC4\u6F0F\u4E4BTransport</h3><p>\u5148\u4E0A\u7ED3\u8BBA</p><div class="language-go ext-go"><pre class="language-go"><code><span class="token comment">// Transports should be reused instead of created as needed.</span>
<span class="token comment">// Transports\u5E94\u8BE5\u88AB\u91CD\u7528\uFF0C\u800C\u4E0D\u662F\u4E00\u65E6\u9700\u8981\u5C31\u521B\u5EFA</span>

<span class="token comment">// Transports are safe for concurrent use by multiple goroutines.</span>
<span class="token comment">// Transports\u7EBF\u7A0B\u5B89\u5168</span>
</code></pre></div><p>\u4EE3\u7801\u6F14\u793A</p><details class="custom-container details"><summary>\u590D\u73B0Transport\u5F15\u8D77\u7684Goroutine\u6CC4\u6F0F</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
	<span class="token string">&quot;runtime&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">sendRequest</span><span class="token punctuation">(</span>wg <span class="token operator">*</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316\u5BA2\u6237\u7AEF</span>
	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span>
		Transport<span class="token punctuation">:</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Transport<span class="token punctuation">{</span>
			Proxy<span class="token punctuation">:</span>                 http<span class="token punctuation">.</span>ProxyFromEnvironment<span class="token punctuation">,</span>
			ForceAttemptHTTP2<span class="token punctuation">:</span>     <span class="token boolean">true</span><span class="token punctuation">,</span>
			MaxIdleConns<span class="token punctuation">:</span>          <span class="token number">100</span><span class="token punctuation">,</span>
			IdleConnTimeout<span class="token punctuation">:</span>       <span class="token number">30</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">,</span>	<span class="token comment">// \u8C03\u6574\u4E3A30,\u65B9\u4FBF\u6D4B\u8BD5</span>
			TLSHandshakeTimeout<span class="token punctuation">:</span>   <span class="token number">10</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">,</span>
			ExpectContinueTimeout<span class="token punctuation">:</span> <span class="token number">1</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u53D1\u9001GET\u8BF7\u6C42</span>
	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;https://www.baidu.com&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u5173\u95ED\u8FDE\u63A5</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		err <span class="token operator">=</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u4E22\u5F03\u54CD\u5E94</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>io<span class="token punctuation">.</span>Discard<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u5B9A\u4E49\u53D8\u91CF</span>
	wg <span class="token operator">:=</span> <span class="token operator">&amp;</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">{</span><span class="token punctuation">}</span>

	<span class="token comment">// \u53D1\u9001\u591A\u4E2A\u8BF7\u6C42</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">300</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
		<span class="token keyword">go</span> <span class="token function">sendRequest</span><span class="token punctuation">(</span>wg<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u7B49\u5F85goroutine\u8FD0\u884C\u7ED3\u675F</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u67E5\u770Bgoroutine\u6570\u91CF</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		n <span class="token operator">:=</span> runtime<span class="token punctuation">.</span><span class="token function">NumGoroutine</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
		<span class="token keyword">if</span> n <span class="token operator">==</span> <span class="token number">1</span> <span class="token punctuation">{</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># (1)\u6700\u540E\u4E00\u4E2AGoroutine\u8FD0\u884C\u5B8C\u6210\u540E\uFF0C\u7ACB\u5373\u67E5\u770BGoroutine\u6570\u91CF\u5F97\u5230601</span>
<span class="token comment"># 300 * 2 +1 = 601</span>
<span class="token comment">#     300\uFF1A300\u4E2A\u8BF7\u6C42</span>
<span class="token comment">#       2: \u5BF9HTTP/1.1\u7F51\u7AD9\u8BF41\u4E2A\u8BF7\u6C42\u5BF9\u5E942\u4E2Agoroutine</span>
<span class="token comment">#       1: \u4E3Bgoroutine</span>
<span class="token comment"># (2) \u540E\u9762Groutine\u4E3A\u4EC0\u4E48\u53C8\u5C11\u4E86\u5462\uFF1F</span>
<span class="token comment">#     \u770B\u4E00\u4E0B\u65F6\u95F4\u5DEE\uFF0C\u5DEE\u4E8630\u79D2\u5DE6\u53F3\uFF0C\u518D\u770B\u4E00\u4E0B\u4EE3\u7801 IdleConnTimeout: 30 * time.Second, \u6B63\u597D\u53EF\u4EE5\u5BF9\u5E94\u4E0A\uFF0C\u539F\u56E0\u662F\u7A7A\u95F2\u8FDE\u63A5\u8D85\u65F6\u88AB\u5E72\u6389\u4E86</span>
<span class="token comment"># (3) \u4E4B\u524D\u4ECB\u7ECD\u8FC7\u6709\u8FD9\u6837\u4E00\u4E2A\u53C2\u6570\uFF0CDefaultMaxIdleConnsPerHost=2\uFF0C\u8FD9\u610F\u5473\u7740\u7A7A\u95F2\u8FDE\u63A5\u4E2D\u7684100\u4E2A\u8FDE\u63A5\u53EA\u6709\u4E24\u4E2A\u8FDE\u63A5\u5206\u914D\u7ED9\u8BE5\u4E3B\u673A\uFF0C300\u4E2A\u8FDE\u63A5\u548C\u8FD9\u4E2A\u53C2\u6570\u4E0D\u662F\u51B2\u7A81\u4E86\u5417\uFF1F</span>
<span class="token comment">#     \u5176\u5B9E\u5E76\u6CA1\u6709\u51B2\u7A81\uFF0C\u56E0\u4E3A\u6BCF\u4E2ATransport\u90FD\u662F\u5168\u65B0\u7684\uFF0C\u5BF9\u4ED6\u6765\u8BF4\u53EA\u67091\u4E2A\u8FDE\u63A5</span>
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
</code></pre></div><details class="custom-container details"><summary>\u4FEE\u590DTransport\u5F15\u8D77\u7684Goroutine\u6CC4\u6F0F</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
	<span class="token string">&quot;runtime&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">sendRequest</span><span class="token punctuation">(</span>wg <span class="token operator">*</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">,</span> client <span class="token operator">*</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// \u53D1\u9001GET\u8BF7\u6C42</span>
	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;https://www.baidu.com&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u5173\u95ED\u8FDE\u63A5</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		err <span class="token operator">=</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u4E22\u5F03\u54CD\u5E94</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>io<span class="token punctuation">.</span>Discard<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u5B9A\u4E49\u53D8\u91CF</span>
	wg <span class="token operator">:=</span> <span class="token operator">&amp;</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">{</span><span class="token punctuation">}</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316\u5BA2\u6237\u7AEF</span>
	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span>
		Transport<span class="token punctuation">:</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Transport<span class="token punctuation">{</span>
			Proxy<span class="token punctuation">:</span>                 http<span class="token punctuation">.</span>ProxyFromEnvironment<span class="token punctuation">,</span>
			ForceAttemptHTTP2<span class="token punctuation">:</span>     <span class="token boolean">true</span><span class="token punctuation">,</span>
			MaxIdleConns<span class="token punctuation">:</span>          <span class="token number">100</span><span class="token punctuation">,</span>
			IdleConnTimeout<span class="token punctuation">:</span>       <span class="token number">30</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">,</span>	<span class="token comment">// \u8C03\u6574\u4E3A30,\u65B9\u4FBF\u6D4B\u8BD5</span>
			TLSHandshakeTimeout<span class="token punctuation">:</span>   <span class="token number">10</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">,</span>
			ExpectContinueTimeout<span class="token punctuation">:</span> <span class="token number">1</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u53D1\u9001\u591A\u4E2A\u8BF7\u6C42</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">300</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
		<span class="token keyword">go</span> <span class="token function">sendRequest</span><span class="token punctuation">(</span>wg<span class="token punctuation">,</span> client<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u7B49\u5F85goroutine\u8FD0\u884C\u7ED3\u675F</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u67E5\u770Bgoroutine\u6570\u91CF</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		n <span class="token operator">:=</span> runtime<span class="token punctuation">.</span><span class="token function">NumGoroutine</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
		<span class="token keyword">if</span> n <span class="token operator">==</span> <span class="token number">1</span> <span class="token punctuation">{</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token number">2022</span>/04/30 <span class="token number">16</span>:00:25 <span class="token number">461</span>
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
<span class="token number">2022</span>/04/30 <span class="token number">16</span>:00:39 <span class="token number">5</span>	<span class="token comment"># \u5B9E\u9645\u4E0A\u5230\u8FD9\u91CC\u5DF2\u7ECF\u7ED3\u675F\uFF0C\u8FDE\u63A5\u6C60\u4E2D\u4FDD\u7559\u4E862\u4E2A\u7A7A\u95F2\u8FDE\u63A5</span>
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
</code></pre></div><h2 id="net-http-httptrace-\u8BF7\u6C42\u8DDF\u8E2A" tabindex="-1"><a class="header-anchor" href="#net-http-httptrace-\u8BF7\u6C42\u8DDF\u8E2A" aria-hidden="true">#</a> net/http/httptrace\uFF1A\u8BF7\u6C42\u8DDF\u8E2A</h2>`,11),C=s("\u5B98\u65B9\u6587\u6863\uFF1A"),R={href:"https://pkg.go.dev/net/http/httptrace",target:"_blank",rel:"noopener noreferrer"},H=s("https://pkg.go.dev/net/http/httptrace"),F=n("h3",{id:"\u7CBE\u7B80\u7248httpstat",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u7CBE\u7B80\u7248httpstat","aria-hidden":"true"},"#"),s(" \u7CBE\u7B80\u7248httpstat")],-1),G=s("\u4E0B\u9762\u7684\u4EE3\u7801\u662F\u4EFF"),A={href:"https://github.com/davecheney/httpstat",target:"_blank",rel:"noopener noreferrer"},M=s("httpstat"),_=s(" \u5199\u7684\u4E00\u4E2A\u7CBE\u7B80\u7248\u672C\uFF0C\u91CD\u5728\u5B66\u4E60"),U=p(`<details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;context&quot;</span>
	<span class="token string">&quot;crypto/tls&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;github.com/fatih/color&quot;</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
	<span class="token string">&quot;net/http/httptrace&quot;</span>
	<span class="token string">&quot;strings&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u5B9A\u4E49\u8BA1\u65F6\u53D8\u91CF</span>
	<span class="token keyword">var</span> <span class="token punctuation">(</span>
		dnsStartTime<span class="token punctuation">,</span> dnsDoneTime           time<span class="token punctuation">.</span>Time
		tcpStartTime<span class="token punctuation">,</span> tcpDoneTime           time<span class="token punctuation">.</span>Time
		tlsStartTime<span class="token punctuation">,</span> tlsDoneTime           time<span class="token punctuation">.</span>Time
		httpConnStartTime<span class="token punctuation">,</span> httpConnDoneTime time<span class="token punctuation">.</span>Time
		httpFirstRespByte                   time<span class="token punctuation">.</span>Time
	<span class="token punctuation">)</span>

	<span class="token comment">// \u5B9A\u4E49\u8F93\u51FA\u6A21\u677F</span>
	<span class="token keyword">const</span> httpsTemplate <span class="token operator">=</span> <span class="token string">\`\`</span> <span class="token operator">+</span>
		<span class="token string">\`  DNS Lookup   TCP Connection   TLS Handshake   Server Processing   Content Transfer\`</span> <span class="token operator">+</span> <span class="token string">&quot;\\n&quot;</span> <span class="token operator">+</span>
		<span class="token string">\`[%s  |     %s  |    %s  |        %s  |       %s  ]\`</span> <span class="token operator">+</span> <span class="token string">&quot;\\n&quot;</span> <span class="token operator">+</span>
		<span class="token string">\`            |                |               |                   |                  |\`</span> <span class="token operator">+</span> <span class="token string">&quot;\\n&quot;</span> <span class="token operator">+</span>
		<span class="token string">\`   namelookup:%s      |               |                   |                  |\`</span> <span class="token operator">+</span> <span class="token string">&quot;\\n&quot;</span> <span class="token operator">+</span>
		<span class="token string">\`                       connect:%s     |                   |                  |\`</span> <span class="token operator">+</span> <span class="token string">&quot;\\n&quot;</span> <span class="token operator">+</span>
		<span class="token string">\`                                   pretransfer:%s         |                  |\`</span> <span class="token operator">+</span> <span class="token string">&quot;\\n&quot;</span> <span class="token operator">+</span>
		<span class="token string">\`                                                     starttransfer:%s        |\`</span> <span class="token operator">+</span> <span class="token string">&quot;\\n&quot;</span> <span class="token operator">+</span>
		<span class="token string">\`                                                                               total:%s\`</span> <span class="token operator">+</span> <span class="token string">&quot;\\n&quot;</span>

	<span class="token comment">// \u521B\u5EFAClient Trace\u5BF9\u8C61</span>
	trace <span class="token operator">:=</span> <span class="token operator">&amp;</span>httptrace<span class="token punctuation">.</span>ClientTrace<span class="token punctuation">{</span>
		<span class="token comment">// DNS\u89E3\u6790\u8BA1\u65F6</span>
		DNSStart<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>info httptrace<span class="token punctuation">.</span>DNSStartInfo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			dnsStartTime <span class="token operator">=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		DNSDone<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>dnsInfo httptrace<span class="token punctuation">.</span>DNSDoneInfo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			dnsDoneTime <span class="token operator">=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token comment">// TCP3\u6B21\u63E1\u624B\u8BA1\u65F6</span>
		ConnectStart<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>network<span class="token punctuation">,</span> addr <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			tcpStartTime <span class="token operator">=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		ConnectDone<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>network<span class="token punctuation">,</span> addr <span class="token builtin">string</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			tcpDoneTime <span class="token operator">=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\\n%s%s\\n&quot;</span><span class="token punctuation">,</span> color<span class="token punctuation">.</span><span class="token function">GreenString</span><span class="token punctuation">(</span><span class="token string">&quot;Connected to &quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> color<span class="token punctuation">.</span><span class="token function">CyanString</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token comment">// TLS\u63E1\u624B\u8BA1\u65F6</span>
		TLSHandshakeStart<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			tlsStartTime <span class="token operator">=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		TLSHandshakeDone<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>state tls<span class="token punctuation">.</span>ConnectionState<span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			tlsDoneTime <span class="token operator">=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token comment">// HTTP/HTTPS\u5EFA\u7ACB\u8FDE\u63A5\u540E\u8C03\u7528</span>
		GotConn<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>info httptrace<span class="token punctuation">.</span>GotConnInfo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			httpConnStartTime <span class="token operator">=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token comment">// \u83B7\u53D6\u670D\u52A1\u7AEF\u54CD\u5E94\u5934\u7B2C\u4E00\u4E2A\u5B57\u8282\u540E\u8C03\u7528</span>
		GotFirstResponseByte<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			httpFirstRespByte <span class="token operator">=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u521B\u5EFAClient Trace Context</span>
	traCtx <span class="token operator">:=</span> httptrace<span class="token punctuation">.</span><span class="token function">WithClientTrace</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> trace<span class="token punctuation">)</span>

	<span class="token comment">// \u751F\u6210Request\u5BF9\u8C61\uFF0C\u4E0A\u9762\u6240\u521B\u5EFA\u7684trace Context\u90FD\u662F\u4E3A\u4E86\u521B\u5EFARequest</span>
	req<span class="token punctuation">,</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewRequestWithContext</span><span class="token punctuation">(</span>traCtx<span class="token punctuation">,</span> <span class="token string">&quot;GET&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;https://jinhui.dev&quot;</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316Client\uFF0C\u5077\u4E2A\u61D2\u76F4\u63A5\u7528\u9ED8\u8BA4\u7684\u5BA2\u6237\u7AEF</span>
	client <span class="token operator">:=</span> http<span class="token punctuation">.</span>DefaultClient
	client<span class="token punctuation">.</span>Timeout <span class="token operator">=</span> time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">5</span> <span class="token comment">// \u8BBE\u7F6E\u8D85\u65F6\u65F6\u95F4</span>
	client<span class="token punctuation">.</span>CheckRedirect <span class="token operator">=</span> <span class="token keyword">func</span><span class="token punctuation">(</span>req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">,</span> via <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> http<span class="token punctuation">.</span>ErrUseLastResponse <span class="token comment">// \u62D2\u7EDD\u91CD\u5B9A\u5411</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u53D1\u9001\u8BF7\u6C42</span>
	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u8BFB\u53D6\u54CD\u5E94\u5934</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\\n%s/%s\\n&quot;</span><span class="token punctuation">,</span> color<span class="token punctuation">.</span><span class="token function">GreenString</span><span class="token punctuation">(</span><span class="token string">&quot;HTTPS&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> color<span class="token punctuation">.</span><span class="token function">CyanString</span><span class="token punctuation">(</span><span class="token string">&quot;%d.%d %s&quot;</span><span class="token punctuation">,</span> resp<span class="token punctuation">.</span>ProtoMajor<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>ProtoMinor<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>Status<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> resp<span class="token punctuation">.</span>Header <span class="token punctuation">{</span>
		s <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span>v<span class="token punctuation">,</span> <span class="token string">&quot;,&quot;</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%s: %s\\n&quot;</span><span class="token punctuation">,</span> k<span class="token punctuation">,</span> color<span class="token punctuation">.</span><span class="token function">CyanString</span><span class="token punctuation">(</span><span class="token string">&quot;%s&quot;</span><span class="token punctuation">,</span> s<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u4E22\u5F03\u54CD\u5E94</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> io<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span>io<span class="token punctuation">.</span>Discard<span class="token punctuation">,</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span>color<span class="token punctuation">.</span><span class="token function">CyanString</span><span class="token punctuation">(</span><span class="token string">&quot;\\n%s\\n&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Body discarded&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// \u5173\u95ED\u8FDE\u63A5(\u653E\u56DE\u8FDE\u63A5\u6C60\u4E2D)</span>
	<span class="token keyword">if</span> err <span class="token operator">:=</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u8FDE\u63A5\u65AD\u5F00\u65F6\u95F4</span>
	httpConnDoneTime <span class="token operator">=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u8F93\u51FA\u5185\u5BB9</span>
	fmta <span class="token operator">:=</span> <span class="token keyword">func</span><span class="token punctuation">(</span>d time<span class="token punctuation">.</span>Duration<span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> color<span class="token punctuation">.</span><span class="token function">CyanString</span><span class="token punctuation">(</span><span class="token string">&quot;%7dms&quot;</span><span class="token punctuation">,</span> <span class="token function">int</span><span class="token punctuation">(</span>d<span class="token operator">/</span>time<span class="token punctuation">.</span>Millisecond<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span>
		httpsTemplate<span class="token punctuation">,</span>
		<span class="token comment">// \u7B2C\u4E00\u884C</span>
		<span class="token function">fmta</span><span class="token punctuation">(</span>dnsDoneTime<span class="token punctuation">.</span><span class="token function">Sub</span><span class="token punctuation">(</span>dnsStartTime<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token function">fmta</span><span class="token punctuation">(</span>tcpDoneTime<span class="token punctuation">.</span><span class="token function">Sub</span><span class="token punctuation">(</span>tcpStartTime<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token function">fmta</span><span class="token punctuation">(</span>tlsDoneTime<span class="token punctuation">.</span><span class="token function">Sub</span><span class="token punctuation">(</span>tlsStartTime<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token function">fmta</span><span class="token punctuation">(</span>httpFirstRespByte<span class="token punctuation">.</span><span class="token function">Sub</span><span class="token punctuation">(</span>httpConnStartTime<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token function">fmta</span><span class="token punctuation">(</span>httpConnDoneTime<span class="token punctuation">.</span><span class="token function">Sub</span><span class="token punctuation">(</span>httpFirstRespByte<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token comment">// \u7B2C\u4E8C\u884C</span>
		<span class="token function">fmta</span><span class="token punctuation">(</span>dnsDoneTime<span class="token punctuation">.</span><span class="token function">Sub</span><span class="token punctuation">(</span>dnsStartTime<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token function">fmta</span><span class="token punctuation">(</span>tcpDoneTime<span class="token punctuation">.</span><span class="token function">Sub</span><span class="token punctuation">(</span>dnsStartTime<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token function">fmta</span><span class="token punctuation">(</span>httpConnStartTime<span class="token punctuation">.</span><span class="token function">Sub</span><span class="token punctuation">(</span>dnsStartTime<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token function">fmta</span><span class="token punctuation">(</span>httpFirstRespByte<span class="token punctuation">.</span><span class="token function">Sub</span><span class="token punctuation">(</span>dnsStartTime<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token function">fmta</span><span class="token punctuation">(</span>httpConnDoneTime<span class="token punctuation">.</span><span class="token function">Sub</span><span class="token punctuation">(</span>dnsStartTime<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220429211410766.png" alt="image-20220429211410766"></p><h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h2><h2 id="net-http\u4E4Bserver" tabindex="-1"><a class="header-anchor" href="#net-http\u4E4Bserver" aria-hidden="true">#</a> net/http\u4E4BServer</h2>`,5),D=s("\u5B98\u65B9\u6587\u6863\uFF1A"),L={href:"https://pkg.go.dev/net/http",target:"_blank",rel:"noopener noreferrer"},E=s("https://pkg.go.dev/net/http"),B=p(`<h3 id="\u57FA\u7840\u793A\u4F8B-1" tabindex="-1"><a class="header-anchor" href="#\u57FA\u7840\u793A\u4F8B-1" aria-hidden="true">#</a> \u57FA\u7840\u793A\u4F8B</h3><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// \u5904\u7406\u5668</span>
<span class="token keyword">func</span> <span class="token function">indexHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">&quot;Hello, world!\\n&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u76D1\u542C\u5730\u5740</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:80&quot;</span>

	<span class="token comment">// \u6CE8\u518C\u8DEF\u7531</span>
	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> indexHandler<span class="token punctuation">)</span>

	<span class="token comment">// \u542F\u52A8\u670D\u52A1</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;* Running on http://&quot;</span> <span class="token operator">+</span> addr<span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span>addr<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>\u5BA2\u6237\u7AEF\u8BBF\u95EE\u6D4B\u8BD5</p><div class="language-bash ext-sh"><pre class="language-bash"><code>C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token punctuation">\\</span>Desktop<span class="token operator">&gt;</span>curl http://127.0.0.1
Hello, world<span class="token operator">!</span>
</code></pre></div><details class="custom-container details"><summary>\u8FDB\u4E00\u6B65\u63A2\u7D22</summary><p>\uFF081\uFF09\u67E5\u770B<code>http.HandleFunc</code>\u6E90\u7801\uFF0C\u53D1\u73B0\u8FD9\u4E0E<code>http.Get</code>\u662F\u4E00\u4E2A\u5957\u8DEF</p><div class="language-go ext-go"><pre class="language-go"><code><span class="token comment">// (1) \u771F\u6B63\u4F7F\u7528\u7684\u662FDefaultServeMux\u7684HandleFunc\u65B9\u6CD5</span>
<span class="token comment">// HandleFunc registers the handler function for the given pattern</span>
<span class="token comment">// in the DefaultServeMux.</span>
<span class="token comment">// The documentation for ServeMux explains how patterns are matched.</span>
<span class="token keyword">func</span> <span class="token function">HandleFunc</span><span class="token punctuation">(</span>pattern <span class="token builtin">string</span><span class="token punctuation">,</span> handler <span class="token keyword">func</span><span class="token punctuation">(</span>ResponseWriter<span class="token punctuation">,</span> <span class="token operator">*</span>Request<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	DefaultServeMux<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span>pattern<span class="token punctuation">,</span> handler<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// -------------------------------------------------------------------------</span>
<span class="token comment">// (2) DefaultServeMux\u662FServeMux\u6307\u9488</span>
<span class="token comment">// DefaultServeMux is the default ServeMux used by Serve.</span>
<span class="token keyword">var</span> DefaultServeMux <span class="token operator">=</span> <span class="token operator">&amp;</span>defaultServeMux

<span class="token keyword">var</span> defaultServeMux ServeMux

<span class="token comment">// -------------------------------------------------------------------------</span>
<span class="token comment">// (3) ServeMux\u662F\u4E00\u4E2A\u7ED3\u6784\u4F53</span>

<span class="token comment">// ServeMux is an HTTP request multiplexer.</span>
<span class="token comment">// It matches the URL of each incoming request against a list of registered</span>
<span class="token comment">// patterns and calls the handler for the pattern that</span>
<span class="token comment">// most closely matches the URL.</span>
<span class="token comment">// ServeMux\u662F\u4E00\u4E2A\u8BF7\u6C42\u591A\u8DEF\u590D\u7528\u5668,\u540E\u9762\u7684\u610F\u601D\u662F\u7EF4\u62A4\u3010\u8BF7\u6C42URL\u3011\u4E0E\u3010\u5904\u7406\u51FD\u6570Handler\u3011\u4E4B\u95F4\u7684\u6620\u5C04</span>
<span class="token keyword">type</span> ServeMux <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	mu    sync<span class="token punctuation">.</span>RWMutex
	m     <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>muxEntry
	es    <span class="token punctuation">[</span><span class="token punctuation">]</span>muxEntry <span class="token comment">// slice of entries sorted from longest to shortest.</span>
	hosts <span class="token builtin">bool</span>       <span class="token comment">// whether any patterns contain hostnames</span>
<span class="token punctuation">}</span>

<span class="token comment">// -------------------------------------------------------------------------</span>
<span class="token comment">// (4) ListenAndServe\u9ED8\u8BA4\u4F1A\u8C03\u7528DefaultServeMux\uFF0C\u82E5\u6211\u4EEC\u60F3\u4F7F\u7528\u81EA\u5B9A\u4E49\u7684ServeMux\uFF0Chandler\u53C2\u6570\u9700\u8981\u6539\u4E00\u4E0B</span>

<span class="token comment">// ListenAndServe listens on the TCP network address addr and then calls</span>
<span class="token comment">// Serve with handler to handle requests on incoming connections.</span>
<span class="token comment">// Accepted connections are configured to enable TCP keep-alives.</span>
<span class="token comment">//</span>
<span class="token comment">// The handler is typically nil, in which case the DefaultServeMux is used.</span>
<span class="token comment">// \u5982\u679Chandler\u4E3Anil\u7684\u8BDD\uFF0C\u4F7F\u7528DefaultServeMux</span>

<span class="token comment">// ListenAndServe always returns a non-nil error.</span>
<span class="token comment">// ListenAndServe\u603B\u662F\u8FD4\u56DE\u975Enil\u7684\u9519\u8BEF</span>
<span class="token keyword">func</span> <span class="token function">ListenAndServe</span><span class="token punctuation">(</span>addr <span class="token builtin">string</span><span class="token punctuation">,</span> handler Handler<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	server <span class="token operator">:=</span> <span class="token operator">&amp;</span>Server<span class="token punctuation">{</span>Addr<span class="token punctuation">:</span> addr<span class="token punctuation">,</span> Handler<span class="token punctuation">:</span> handler<span class="token punctuation">}</span>
	<span class="token keyword">return</span> server<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>\uFF082\uFF09\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528\u81EA\u5B9A\u4E49\u7684<code>ServeMux</code>\u6765\u4EE3\u66FF<code>DefaultServeMux</code></p><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// \u5904\u7406\u5668</span>
<span class="token keyword">func</span> <span class="token function">indexHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">&quot;Hello, world!\\n&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u76D1\u542C\u5730\u5740</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:80&quot;</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316\u8BF7\u6C42\u591A\u8DEF\u590D\u7528\u5668</span>
	mux <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewServeMux</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6CE8\u518C\u8DEF\u7531</span>
	mux<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> indexHandler<span class="token punctuation">)</span>

	<span class="token comment">// \u542F\u52A8\u670D\u52A1</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;* Running on http://&quot;</span> <span class="token operator">+</span> addr<span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span>addr<span class="token punctuation">,</span> mux<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h3 id="\u7406\u89E3handler" tabindex="-1"><a class="header-anchor" href="#\u7406\u89E3handler" aria-hidden="true">#</a> \u7406\u89E3Handler</h3><p><code>net/http</code>\u5305\u4E2D\u5230\u5904\u90FD\u662F<code>Handler</code>\uFF0C\u7406\u89E3<code>Handler</code>\u662F\u975E\u5E38\u91CD\u8981\u7684</p><h4 id="http-handler\u548Chttp-handlerfunc" tabindex="-1"><a class="header-anchor" href="#http-handler\u548Chttp-handlerfunc" aria-hidden="true">#</a> <code>http.Handler</code>\u548C<code>http.HandlerFunc</code></h4><div class="language-go ext-go"><pre class="language-go"><code><span class="token comment">// \u6CE8\u91CA\u90E8\u5206\u6311\u91CD\u8981\u7684\u7FFB\u8BD1\u4E00\u4E0B</span>
<span class="token comment">// (1) http.Handler\u5C31\u662F\u7528\u6765\u5904\u7406Request\u8BF7\u6C42\u7684\u5E76\u8FD4\u56DE\u54CD\u5E94</span>
<span class="token comment">// (2) http.Handler\u4E0D\u5E94\u8BE5\u4FEE\u6539Request\u76F8\u5173\u6570\u636E</span>
<span class="token comment">// \u603B\u7ED3\uFF1AHandler\u5C31\u662F\u5B9A\u4E49\u4E86\u4E00\u4E2AServeHTTP\u65B9\u6CD5\u7684\u63A5\u53E3\uFF0CServeHTTP\u7528\u6765\u5904\u7406Request\u5E76\u8FD4\u56DE\u54CD\u5E94</span>
<span class="token keyword">type</span> Handler <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">ServeHTTP</span><span class="token punctuation">(</span>ResponseWriter<span class="token punctuation">,</span> <span class="token operator">*</span>Request<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// -----------------------------------------------------------</span>
<span class="token comment">// (1) HandlerFunc\u662F\u4E00\u4E2A\u81EA\u5B9A\u4E49\u7C7B\u578B\uFF0C\u662F\u4E00\u4E2A\u51FD\u6570\u7C7B\u578B\uFF0C\u5B83\u7684\u503C\u5C31\u662F\u4E00\u4E2A\u51FD\u6570</span>
<span class="token comment">// (2) HandlerFunc\u51FD\u6570\u5B9E\u73B0\u4E86Handler\u63A5\u53E3</span>
<span class="token comment">// (3) \u50CFHandlerFunc\u8FD9\u6837\u7684\u6211\u4EEC\u4E00\u822C\u79F0\u4E3A\u63A5\u53E3\u578B\u51FD\u6570</span>
<span class="token keyword">type</span> HandlerFunc <span class="token keyword">func</span><span class="token punctuation">(</span>ResponseWriter<span class="token punctuation">,</span> <span class="token operator">*</span>Request<span class="token punctuation">)</span>		<span class="token comment">// \u4E3B\u8981\u7684\u4F5C\u7528\u662F\uFF1A\u7C7B\u578B\u8F6C\u6362\uFF0C\u5C06\u51FD\u6570\u7C7B\u578B\u8F6C\u4E3AHandlerFunc\u7C7B\u578B\uFF08\u6CE8\u610F\u5E76\u4E0D\u4F1A\u6539\u53D8\u503C\uFF09</span>

<span class="token comment">// ServeHTTP calls f(w, r).</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>f HandlerFunc<span class="token punctuation">)</span> <span class="token function">ServeHTTP</span><span class="token punctuation">(</span>w ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>	<span class="token comment">// HandlerFunc\u7C7B\u578B\u5B9E\u73B0\u4E86Handler\u63A5\u53E3\uFF0CServeHTTP\u4F1A\u8C03\u7528\u5305\u88C5\u540E\u7684\u51FD\u6570</span>
	<span class="token function">f</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u8FD9\u91CC\u4E0D\u662F\u592A\u5BB9\u6613\u7406\u89E3</span>
<span class="token comment">// (1) \u5176\u5B9E\u5C31\u662F\u6709\u4E00\u4E2A\u539F\u59CB\u51FD\u6570\uFF0C\u7ECF\u8FC7\u81EA\u5B9A\u4E49\u7C7B\u578B\u5305\u88C5\u4E00\u4E0B\uFF0C\u539F\u59CB\u51FD\u6570\u7C7B\u578B\u53D1\u751F\u6539\u53D8\uFF0C\u65B0\u7C7B\u578B\u7684\u51FD\u6570\u6211\u4EEC\u5C31\u6682\u4E14\u53EB\u4ED6\u5305\u88C5\u51FD\u6570\uFF0C\u7528\u4EE5\u533A\u5206</span>
<span class="token comment">// (2) \u6211\u4EEC\u81EA\u5B9A\u4E49\u7684\u7C7B\u578B\u5B9E\u73B0\u4E86Handler\u63A5\u53E3\uFF0C\u6240\u4EE5\u5305\u88C5\u51FD\u6570\u4E5F\u81EA\u52A8\u5B9E\u73B0\u4E86Handler\u63A5\u53E3</span>
<span class="token comment">// (3) ServeHTTP\u65B9\u6CD5\u4F1A\u8C03\u7528\u6211\u4EEC\u7684\u5305\u88C5\u51FD\u6570</span>
</code></pre></div><p>\u5982\u679C\u8FD8\u662F\u4E0D\u592A\u7406\u89E3\uFF0C\u53EF\u4EE5\u770B\u4E00\u4E0B\u5982\u4E0B\u4EE3\u7801</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// \u5B9A\u4E49\u4E00\u4E2A\u5F88\u666E\u901A\u7684\u51FD\u6570Add</span>
<span class="token keyword">func</span> <span class="token function">Add</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> x <span class="token operator">+</span> y
<span class="token punctuation">}</span>

<span class="token comment">// \u81EA\u5B9A\u4E49\u63A5\u53E3</span>
<span class="token keyword">type</span> Handler <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">ServeHTTP</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u81EA\u5B9A\u4E49\u7C7B\u578B</span>
<span class="token keyword">type</span> HandlerFunc <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span>

<span class="token comment">// \u7ED9\u81EA\u5B9A\u4E49\u7C7B\u578B\u7ED1\u5B9A\u4E00\u4E2A\u65B9\u6CD5</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>h HandlerFunc<span class="token punctuation">)</span> <span class="token function">ServeHTTP</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// (1) \u67E5\u770BAdd\u51FD\u6570\u7684\u7C7B\u578B</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%T\\n&quot;</span><span class="token punctuation">,</span> Add<span class="token punctuation">)</span> <span class="token comment">// func(int, int) int</span>

	<span class="token comment">// (2) \u6539\u53D8Add\u51FD\u6570\u7C7B\u578B</span>
	Add2 <span class="token operator">:=</span> <span class="token function">HandlerFunc</span><span class="token punctuation">(</span>Add<span class="token punctuation">)</span>     <span class="token comment">// \u6CE8\u610F\u8FD9\u91CC\u5E76\u4E0D\u662F\u51FD\u6570\u8C03\u7528\uFF0C\u800C\u662F\u7C7B\u578B\u8F6C\u6362</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%T\\n&quot;</span><span class="token punctuation">,</span> Add2<span class="token punctuation">)</span>    <span class="token comment">// main.HandlerFunc; \u51FD\u6570Add\u8FD8\u662F\u539F\u6765\u7684Add,\u53EA\u4E0D\u8FC7\u5B83\u7684\u7C7B\u578B\u5DF2\u7ECF\u53D8\u6210HandlerFunc\u7C7B\u578B\u4E86</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">Add2</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 300; \u8C03\u7528\u90FD\u662F\u6CA1\u6709\u95EE\u9898\u7684,\u503C\u6CA1\u6709\u53D8,\u53D8\u5F97\u662F\u7C7B\u578B, \u56E0\u4E3AHandlerFunc\u7C7B\u578B\u5B9E\u73B0\u4E86Handler\u63A5\u53E3,\u6240\u4EE5Add2\u81EA\u52A8\u5B9E\u73B0\u4E86Handler\u63A5\u53E3</span>

	<span class="token comment">// (3) \u58F0\u660E\u63A5\u53E3\u7C7B\u578B\u53D8\u91CF,\u5E76\u7ED9\u4ED6\u8D4B\u503C</span>
	<span class="token keyword">var</span> Add3 Handler                          <span class="token comment">// Add3\u4E3A\u63A5\u53E3\u7C7B\u578B</span>
	Add3 <span class="token operator">=</span> Add2                               <span class="token comment">// Add2\u5B9E\u73B0\u4E86\u8BE5\u63A5\u53E3,\u6240\u4EE5\u53EF\u4EE5\u8D4B\u503C</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%T\\n&quot;</span><span class="token punctuation">,</span> Add3<span class="token punctuation">)</span>                  <span class="token comment">// main.HandlerFunc</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>Add3<span class="token punctuation">.</span><span class="token punctuation">(</span>HandlerFunc<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">150</span><span class="token punctuation">,</span> <span class="token number">350</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 500, Add3\u662F\u63A5\u53E3\uFF0C\u65AD\u8A00\u5F97\u5230\u503C\u7C7B\u578B,\u7136\u540E\u5C31\u53EF\u4EE5\u6B63\u5E38\u8C03\u7528</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>Add3<span class="token punctuation">.</span><span class="token function">ServeHTTP</span><span class="token punctuation">(</span><span class="token number">999</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>       <span class="token comment">// \u8C03\u7528ServeHTTP\u65B9\u6CD5\u4E5F\u662F\u53EF\u4EE5\u7684</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h4 id="http-handle\u548Chttp-handlefunc" tabindex="-1"><a class="header-anchor" href="#http-handle\u548Chttp-handlefunc" aria-hidden="true">#</a> <code>http.Handle</code>\u548C<code>http.HandleFunc</code></h4><ul><li>\u8FD9\u4E24\u4E2A\u548C<code>DefaultServeMux</code>\u662F\u6DF1\u5EA6\u7ED1\u5B9A\u7684</li><li>\u6CE8\u610F\u8FD9\u51E0\u4E2A\u51FD\u6570\u5355\u8BCD\u62FC\u5199\uFF0C\u4E00\u4E2A\u662F<code>ler</code>\u4E00\u4E2A\u662F<code>le</code></li></ul><div class="language-go ext-go"><pre class="language-go"><code><span class="token comment">// Handle registers the handler for the given pattern</span>
<span class="token comment">// in the DefaultServeMux.</span>
<span class="token comment">// The documentation for ServeMux explains how patterns are matched.</span>
<span class="token comment">// \u603B\u7ED3\uFF1A\u4F20\u5165Handler\u63A5\u53E3\u7C7B\u578B\uFF0C\u7ED9DefaultServeMux\u589E\u52A0\u8DEF\u7531\u4E0EHandler\u6620\u5C04\uFF08Handle\u6E90\u7801\u542B\u4E49\uFF09</span>
<span class="token keyword">func</span> <span class="token function">Handle</span><span class="token punctuation">(</span>pattern <span class="token builtin">string</span><span class="token punctuation">,</span> handler Handler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    DefaultServeMux<span class="token punctuation">.</span><span class="token function">Handle</span><span class="token punctuation">(</span>pattern<span class="token punctuation">,</span> handler<span class="token punctuation">)</span>
<span class="token punctuation">}</span>


<span class="token comment">// -----------------------------------------------------------------------------</span>
<span class="token comment">// HandleFunc registers the handler function for the given pattern</span>
<span class="token comment">// in the DefaultServeMux.</span>
<span class="token comment">// The documentation for ServeMux explains how patterns are matched.</span>
<span class="token comment">// \u603B\u7ED3\uFF1A\u4F20\u5165\u4E00\u4E2A\u51FD\u6570\uFF0C\u81EA\u52A8\u8F6C\u4E3AHandler\u63A5\u53E3\u7C7B\u578B\uFF0C\u5E76\u7ED9DefaultServeMux\u589E\u52A0\u8DEF\u7531\u4E0EHandler\u6620\u5C04\uFF08Handle\u6E90\u7801\u542B\u4E49\uFF09</span>
<span class="token keyword">func</span> <span class="token function">HandleFunc</span><span class="token punctuation">(</span>pattern <span class="token builtin">string</span><span class="token punctuation">,</span> handler <span class="token keyword">func</span><span class="token punctuation">(</span>ResponseWriter<span class="token punctuation">,</span> <span class="token operator">*</span>Request<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	DefaultServeMux<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span>pattern<span class="token punctuation">,</span> handler<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// HandleFunc registers the handler function for the given pattern.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>mux <span class="token operator">*</span>ServeMux<span class="token punctuation">)</span> <span class="token function">HandleFunc</span><span class="token punctuation">(</span>pattern <span class="token builtin">string</span><span class="token punctuation">,</span> handler <span class="token keyword">func</span><span class="token punctuation">(</span>ResponseWriter<span class="token punctuation">,</span> <span class="token operator">*</span>Request<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// \u81EA\u5B9A\u4E49mux\u65F6\u53EF\u4EE5\u7528\u8FD9\u4E2A\u51FD\u6570</span>
	<span class="token keyword">if</span> handler <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;http: nil handler&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	mux<span class="token punctuation">.</span><span class="token function">Handle</span><span class="token punctuation">(</span>pattern<span class="token punctuation">,</span> <span class="token function">HandlerFunc</span><span class="token punctuation">(</span>handler<span class="token punctuation">)</span><span class="token punctuation">)</span>	<span class="token comment">// \u8FD9\u4E2AHandlerFunc\u662F\u901A\u7528\u7684\uFF0C\u5E76\u6CA1\u6709\u548CDefaultServeMux\u7ED1\u5B9A\uFF0C\u6CE8\u610F\u5355\u8BCD\u62FC\u5199\u662Fler\u4E0D\u662Fle</span>
<span class="token punctuation">}</span>

<span class="token comment">// -----------------------------------------------------------------------------</span>
<span class="token comment">// \u603B\u7ED3\uFF1A</span>
<span class="token comment">// (1) \u4E0A\u9762\u4E24\u4E2A\u51FD\u6570\u90FD\u662F\u5728\u64CD\u4F5CDefaultServeMux\uFF0C\u6211\u4EEC\u5982\u679C\u6211\u4EEC\u4F7F\u7528\u81EA\u5B9A\u4E49\u7684ServeMux\u65F6\u5019\uFF0C\u662F\u4E0D\u9700\u8981\u4F7F\u7528\u8FD9\u4FE9\u65B9\u6CD5\u7684</span>
<span class="token comment">// (2) \u4E0A\u9762\u4E24\u4E2A\u51FD\u6570\u90FD\u662F\u5E72\u540C\u4E00\u4EF6\u4E8B\uFF0C\u5C31\u662F\u7ED9DefaultServeMux\u589E\u52A0\u4E00\u6761\u8DEF\u7531\u4E0EHandler\u7684\u6620\u5C04\u5173\u7CFB\uFF0C\u4E0D\u540C\u7684\u662F\u4F20\u5165\u7684\u53C2\u6570\u4E0D\u540C</span>
</code></pre></div><h4 id="\u6CE8\u518C\u8DEF\u7531\u7684\u4E24\u79CD\u65B9\u5F0F" tabindex="-1"><a class="header-anchor" href="#\u6CE8\u518C\u8DEF\u7531\u7684\u4E24\u79CD\u65B9\u5F0F" aria-hidden="true">#</a> \u6CE8\u518C\u8DEF\u7531\u7684\u4E24\u79CD\u65B9\u5F0F</h4><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// \u5904\u7406\u5668</span>
<span class="token keyword">func</span> <span class="token function">indexHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">&quot;Hello, world!\\n&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u76D1\u542C\u5730\u5740</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:80&quot;</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316\u8BF7\u6C42\u591A\u8DEF\u590D\u7528\u5668</span>
	mux <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewServeMux</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6CE8\u518C\u8DEF\u7531-\u65B9\u5F0F1</span>
	mux<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> indexHandler<span class="token punctuation">)</span>
	<span class="token comment">// \u6211\u4EEC\u53EF\u4EE5\u770B\u4E00\u4E0BHandleFunc\u6E90\u7801,\u5176\u5185\u90E8\u4F1A\u81EA\u52A8\u5C06indexHandler\u7C7B\u578B\u8F6C\u53D8\u4E3AHandlerFunc\u7C7B\u578B\uFF0C\u5E76\u8C03\u7528Handle\u65B9\u6CD5</span>
	<span class="token comment">//func (mux *ServeMux) HandleFunc(pattern string, handler func(ResponseWriter, *Request)) {</span>
	<span class="token comment">//	if handler == nil {</span>
	<span class="token comment">//		panic(&quot;http: nil handler&quot;)</span>
	<span class="token comment">//	}</span>
	<span class="token comment">//	mux.Handle(pattern, HandlerFunc(handler))</span>
	<span class="token comment">//}</span>

	<span class="token comment">// \u6CE8\u518C\u8DEF\u7531-\u65B9\u5F0F2</span>
	<span class="token comment">// \u6211\u4EEC\u4E5F\u53EF\u4EE5\u81EA\u5DF1\u8FDB\u884C\u7C7B\u578B\u8F6C\u6362\uFF0C\u7136\u540E\u76F4\u63A5\u4F20\u9012\u4E00\u4E2AHandler\u7C7B\u578B\u7684\u503C\u8FDB\u53BB</span>
	h <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">HandlerFunc</span><span class="token punctuation">(</span>indexHandler<span class="token punctuation">)</span> <span class="token comment">// indexHandler\u4E0D\u80FD\u4E3Anil\uFF0C\u5426\u5219\u4F1A\u62A5\u9519</span>
	mux<span class="token punctuation">.</span><span class="token function">Handle</span><span class="token punctuation">(</span><span class="token string">&quot;/test&quot;</span><span class="token punctuation">,</span> h<span class="token punctuation">)</span>

	<span class="token comment">// \u542F\u52A8\u670D\u52A1</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;* Running on http://&quot;</span> <span class="token operator">+</span> addr<span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span>addr<span class="token punctuation">,</span> mux<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h4 id="basic-auth\u8BA4\u8BC1\u4E4Bhandlefunc\u88C5\u9970\u5668" tabindex="-1"><a class="header-anchor" href="#basic-auth\u8BA4\u8BC1\u4E4Bhandlefunc\u88C5\u9970\u5668" aria-hidden="true">#</a> Basic Auth\u8BA4\u8BC1\u4E4BHandleFunc\u88C5\u9970\u5668</h4><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;encoding/base64&quot;</span>
	<span class="token string">&quot;errors&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
	<span class="token string">&quot;strings&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// \u5904\u7406\u5668</span>
<span class="token keyword">func</span> <span class="token function">indexHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">&quot;Hello, world!\\n&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// Base64\u89E3\u5BC6</span>
<span class="token keyword">func</span> <span class="token function">BasicAuthDecodeString</span><span class="token punctuation">(</span>auth <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>plaintext <span class="token builtin">string</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	authSlice <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>auth<span class="token punctuation">,</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>authSlice<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">2</span> <span class="token operator">||</span> authSlice<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token string">&quot;Basic&quot;</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;Basic auth format error&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	p<span class="token punctuation">,</span> err <span class="token operator">:=</span> base64<span class="token punctuation">.</span>StdEncoding<span class="token punctuation">.</span><span class="token function">DecodeString</span><span class="token punctuation">(</span>authSlice<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token function">string</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">,</span> err
<span class="token punctuation">}</span>

<span class="token comment">// \u7528\u6237\u9A8C\u8BC1</span>
<span class="token keyword">func</span> <span class="token function">BasicAuthVerifyUser</span><span class="token punctuation">(</span>plaintext <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
	users <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;root:123456&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;admin:654321&quot;</span><span class="token punctuation">}</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> users <span class="token punctuation">{</span>
		<span class="token keyword">if</span> v <span class="token operator">==</span> plaintext <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">true</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>

<span class="token comment">// BasicAuth\u88C5\u9970\u5668</span>
<span class="token keyword">func</span> <span class="token function">BasicAuth</span><span class="token punctuation">(</span>handler <span class="token keyword">func</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">func</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u8FD9\u4E00\u6BB5\u5224\u65AD\u662F\u4ECE\u539F\u59CB\u7684HandleFunc\u4E2D\u63D0\u53D6\u51FA\u6765\u7684\uFF0C\u662F\u4E3A\u4E86\u4E0E\u4E0D\u52A0\u88C5\u9970\u5668\u4E00\u81F4\u7684\u884C\u4E3A</span>
	<span class="token comment">// \u5982\u679C\u4F20\u5165\u4E86nil\uFF0C\u5728\u542F\u52A8\u9636\u6BB5\u5C31\u4F1A\u62A5\u9519\u7684\u884C\u4E3A</span>
	<span class="token keyword">if</span> handler <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;http: nil handler&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// \u83B7\u53D6Basic Auth\u8BA4\u8BC1\u51ED\u8BC1</span>
		auth <span class="token operator">:=</span> r<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;Authorization&quot;</span><span class="token punctuation">)</span> <span class="token comment">//\u83B7\u53D6Basic base64\u52A0\u5BC6\u540E\u7684\u5B57\u6BB5</span>

		<span class="token comment">// \u9A8C\u8BC1\u5931\u8D25</span>
		plaintext<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">BasicAuthDecodeString</span><span class="token punctuation">(</span>auth<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			w<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;WWW-Authenticate&quot;</span><span class="token punctuation">,</span> <span class="token string">\`Basic realm=&quot;\`</span><span class="token operator">+</span>err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">\`&quot;\`</span><span class="token punctuation">)</span>
			w<span class="token punctuation">.</span><span class="token function">WriteHeader</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusUnauthorized<span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// \u7528\u6237\u540D\u5BC6\u7801\u9A8C\u8BC1\u5931\u8D25</span>
		<span class="token keyword">if</span> <span class="token operator">!</span><span class="token function">BasicAuthVerifyUser</span><span class="token punctuation">(</span>plaintext<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			w<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;WWW-Authenticate&quot;</span><span class="token punctuation">,</span> <span class="token string">\`Basic realm=&quot;\u7528\u6237\u540D\u6216\u5BC6\u7801\u9519\u8BEF&quot;\`</span><span class="token punctuation">)</span>
			w<span class="token punctuation">.</span><span class="token function">WriteHeader</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusUnauthorized<span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// \u9A8C\u8BC1\u901A\u8FC7</span>
		<span class="token function">handler</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u76D1\u542C\u5730\u5740</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:80&quot;</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316\u8BF7\u6C42\u591A\u8DEF\u590D\u7528\u5668</span>
	mux <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewServeMux</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6CE8\u518C\u8DEF\u7531</span>
	mux<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token function">BasicAuth</span><span class="token punctuation">(</span>indexHandler<span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// \u542F\u52A8\u670D\u52A1</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;* Running on http://&quot;</span> <span class="token operator">+</span> addr<span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span>addr<span class="token punctuation">,</span> mux<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h4 id="basic-auth\u8BA4\u8BC1\u4E4Bhandle\u88C5\u9970\u5668" tabindex="-1"><a class="header-anchor" href="#basic-auth\u8BA4\u8BC1\u4E4Bhandle\u88C5\u9970\u5668" aria-hidden="true">#</a> Basic Auth\u8BA4\u8BC1\u4E4BHandle\u88C5\u9970\u5668</h4><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;encoding/base64&quot;</span>
	<span class="token string">&quot;errors&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
	<span class="token string">&quot;strings&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// \u5904\u7406\u5668</span>
<span class="token keyword">func</span> <span class="token function">indexHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">&quot;Hello, world!\\n&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// Base64\u89E3\u5BC6</span>
<span class="token keyword">func</span> <span class="token function">BasicAuthDecodeString</span><span class="token punctuation">(</span>auth <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>plaintext <span class="token builtin">string</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	authSlice <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>auth<span class="token punctuation">,</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>authSlice<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">2</span> <span class="token operator">||</span> authSlice<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token string">&quot;Basic&quot;</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">&quot;Basic auth format error&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	p<span class="token punctuation">,</span> err <span class="token operator">:=</span> base64<span class="token punctuation">.</span>StdEncoding<span class="token punctuation">.</span><span class="token function">DecodeString</span><span class="token punctuation">(</span>authSlice<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token function">string</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">,</span> err
<span class="token punctuation">}</span>

<span class="token comment">// \u7528\u6237\u9A8C\u8BC1</span>
<span class="token keyword">func</span> <span class="token function">BasicAuthVerifyUser</span><span class="token punctuation">(</span>plaintext <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
	users <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;root:123456&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;admin:654321&quot;</span><span class="token punctuation">}</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> users <span class="token punctuation">{</span>
		<span class="token keyword">if</span> v <span class="token operator">==</span> plaintext <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">true</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>

<span class="token comment">// BasicAuth\u88C5\u9970\u5668</span>
<span class="token keyword">func</span> <span class="token function">BasicAuth</span><span class="token punctuation">(</span>handler <span class="token keyword">func</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span><span class="token punctuation">)</span> http<span class="token punctuation">.</span>Handler <span class="token punctuation">{</span>
	<span class="token comment">// \u8FD9\u4E00\u6BB5\u5224\u65AD\u662F\u4ECE\u539F\u59CB\u7684HandleFunc\u4E2D\u63D0\u53D6\u51FA\u6765\u7684\uFF0C\u662F\u4E3A\u4E86\u4E0E\u4E0D\u52A0\u88C5\u9970\u5668\u4E00\u81F4\u7684\u884C\u4E3A</span>
	<span class="token comment">// \u5982\u679C\u4F20\u5165\u4E86nil\uFF0C\u5728\u542F\u52A8\u9636\u6BB5\u5C31\u4F1A\u62A5\u9519\u7684\u884C\u4E3A</span>
	<span class="token keyword">if</span> handler <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;http: nil handler&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// \u8FD4\u56DE\u4E00\u4E2Ahandler</span>
	<span class="token keyword">return</span> http<span class="token punctuation">.</span><span class="token function">HandlerFunc</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// \u83B7\u53D6Basic Auth\u8BA4\u8BC1\u51ED\u8BC1</span>
		auth <span class="token operator">:=</span> r<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;Authorization&quot;</span><span class="token punctuation">)</span> <span class="token comment">//\u83B7\u53D6Basic base64\u52A0\u5BC6\u540E\u7684\u5B57\u6BB5</span>

		<span class="token comment">// \u9A8C\u8BC1\u5931\u8D25</span>
		plaintext<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">BasicAuthDecodeString</span><span class="token punctuation">(</span>auth<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			w<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;WWW-Authenticate&quot;</span><span class="token punctuation">,</span> <span class="token string">\`Basic realm=&quot;\`</span><span class="token operator">+</span>err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">\`&quot;\`</span><span class="token punctuation">)</span>
			w<span class="token punctuation">.</span><span class="token function">WriteHeader</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusUnauthorized<span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// \u7528\u6237\u540D\u5BC6\u7801\u9A8C\u8BC1\u5931\u8D25</span>
		<span class="token keyword">if</span> <span class="token operator">!</span><span class="token function">BasicAuthVerifyUser</span><span class="token punctuation">(</span>plaintext<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			w<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;WWW-Authenticate&quot;</span><span class="token punctuation">,</span> <span class="token string">\`Basic realm=&quot;\u7528\u6237\u540D\u6216\u5BC6\u7801\u9519\u8BEF&quot;\`</span><span class="token punctuation">)</span>
			w<span class="token punctuation">.</span><span class="token function">WriteHeader</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusUnauthorized<span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// \u9A8C\u8BC1\u901A\u8FC7,\u8C03\u7528\u539F\u59CBhandler\u65B9\u6CD5</span>
		<span class="token function">handler</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u76D1\u542C\u5730\u5740</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:80&quot;</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316\u8BF7\u6C42\u591A\u8DEF\u590D\u7528\u5668</span>
	mux <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewServeMux</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6CE8\u518C\u8DEF\u7531 - handler\u5C01\u88C5</span>
	mux<span class="token punctuation">.</span><span class="token function">Handle</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token function">BasicAuth</span><span class="token punctuation">(</span>indexHandler<span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// \u542F\u52A8\u670D\u52A1</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;* Running on http://&quot;</span> <span class="token operator">+</span> addr<span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span>addr<span class="token punctuation">,</span> mux<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h3 id="servemux" tabindex="-1"><a class="header-anchor" href="#servemux" aria-hidden="true">#</a> ServeMux</h3><h4 id="\u7ED3\u6784\u4F53\u5B9A\u4E49" tabindex="-1"><a class="header-anchor" href="#\u7ED3\u6784\u4F53\u5B9A\u4E49" aria-hidden="true">#</a> \u7ED3\u6784\u4F53\u5B9A\u4E49</h4><p>ServeMux\u4E3B\u8981\u7528\u6765\u5B58\u50A8\u8DEF\u7531\u4E0EHandler\u4E4B\u95F4\u7684\u6620\u5C04\u5173\u7CFB</p><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">type</span> ServeMux <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	mu    sync<span class="token punctuation">.</span>RWMutex			<span class="token comment">// \u8BFB\u5199\u9501</span>
	m     <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>muxEntry	<span class="token comment">// map\u4E2D\u5B58\u50A8\u8DEF\u7531\u4E0EHandler</span>
	es    <span class="token punctuation">[</span><span class="token punctuation">]</span>muxEntry <span class="token comment">// slice of entries sorted from longest to shortest.</span>
    				 <span class="token comment">// \u8DEF\u7531\u4ECE\u957F\u5230\u77ED\u6392\u5E8F\uFF0C\u8FD9\u4E2A\u5B57\u6BB5\u548C\u8DEF\u7531\u5339\u914D\u6709\u5173\u7CFB\uFF0C\u540E\u9762\u518D\u8BF4</span>
	hosts <span class="token builtin">bool</span>       <span class="token comment">// whether any patterns contain hostnames // \u6A21\u5F0F\u662F\u5426\u5305\u542B\u4E3B\u673A\u540D\uFF0C\u6BD4\u5982/abc\u662F\u4E0D\u5305\u542B\u4E3B\u673A\u540D\u7684\uFF0Ctest.com/abc\u662F\u5305\u542B\u4E3B\u673A\u540D\u7684</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> muxEntry <span class="token keyword">struct</span> <span class="token punctuation">{</span>	<span class="token comment">// \u4E3B\u8981\u5B58\u50A8Handler\uFF0C\u5E76\u4E14\u53C8\u52A0\u4E0A\u4E86\u8DEF\u7531\uFF0C\u7528\u4E8E\u65B9\u4FBF\u540E\u7EED\u64CD\u4F5C</span>
	h       Handler
	pattern <span class="token builtin">string</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="\u8DEF\u7531\u6CE8\u518C\u903B\u8F91" tabindex="-1"><a class="header-anchor" href="#\u8DEF\u7531\u6CE8\u518C\u903B\u8F91" aria-hidden="true">#</a> \u8DEF\u7531\u6CE8\u518C\u903B\u8F91</h4><p>\u5F53\u6211\u4EEC\u8C03\u7528<code>mux.HandleFunc</code>\u6216<code>mux.Handle</code>\u8FDB\u884C\u8DEF\u7531\u6CE8\u518C\u7684\u65F6\u5019\uFF0C\u6700\u7EC8\u8C03\u7528\u7684\u90FD\u662F<code>Handle</code>\u51FD\u6570</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token comment">// Handle registers the handler for the given pattern.</span>
<span class="token comment">// If a handler already exists for pattern, Handle panics.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>mux <span class="token operator">*</span>ServeMux<span class="token punctuation">)</span> <span class="token function">Handle</span><span class="token punctuation">(</span>pattern <span class="token builtin">string</span><span class="token punctuation">,</span> handler Handler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u52A0\u5199\u9501</span>
	mux<span class="token punctuation">.</span>mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> mux<span class="token punctuation">.</span>mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// \u4F20\u5165\u7684\u53C2\u6570\u4E0D\u5141\u8BB8\u4E3A\u7A7A</span>
	<span class="token keyword">if</span> pattern <span class="token operator">==</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;http: invalid pattern&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> handler <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;http: nil handler&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
    
    <span class="token comment">// \u8DEF\u7531\u82E5\u5DF2\u7ECF\u6CE8\u518C\uFF0C\u5219\u4F1A\u62A5\u9519</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> exist <span class="token operator">:=</span> mux<span class="token punctuation">.</span>m<span class="token punctuation">[</span>pattern<span class="token punctuation">]</span><span class="token punctuation">;</span> exist <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;http: multiple registrations for &quot;</span> <span class="token operator">+</span> pattern<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

    <span class="token comment">// \u5B57\u5178\u4E3A\u7A7A\u5219\u521D\u59CB\u5316</span>
	<span class="token keyword">if</span> mux<span class="token punctuation">.</span>m <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		mux<span class="token punctuation">.</span>m <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>muxEntry<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
    
    <span class="token comment">// \u751F\u6210\u6761\u76EE\u5E76\u6DFB\u52A0\u5230\u5B57\u5178\u4E2D</span>
	e <span class="token operator">:=</span> muxEntry<span class="token punctuation">{</span>h<span class="token punctuation">:</span> handler<span class="token punctuation">,</span> pattern<span class="token punctuation">:</span> pattern<span class="token punctuation">}</span>
	mux<span class="token punctuation">.</span>m<span class="token punctuation">[</span>pattern<span class="token punctuation">]</span> <span class="token operator">=</span> e
    
    <span class="token comment">// \u5982\u679C\u6A21\u5F0F\u6700\u540E\u4E00\u4E2A\u5B57\u7B26\u662F/\uFF0C\u5373/login/\u3001/user/\u8FD9\u79CD\u8DEF\u7531\u7684\u60C5\u51B5\u4E0B</span>
    <span class="token comment">// \u5C06\u5143\u7D20\u6709\u5E8F\u7684\u63D2\u5165\u5230\u5207\u7247\u4E2D\uFF0C\u5982\u4F55\u6709\u5E8F\u63D2\u5165\uFF0C\u770BappendSorted\u6E90\u7801</span>
	<span class="token keyword">if</span> pattern<span class="token punctuation">[</span><span class="token function">len</span><span class="token punctuation">(</span>pattern<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token char">&#39;/&#39;</span> <span class="token punctuation">{</span>
		mux<span class="token punctuation">.</span>es <span class="token operator">=</span> <span class="token function">appendSorted</span><span class="token punctuation">(</span>mux<span class="token punctuation">.</span>es<span class="token punctuation">,</span> e<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

    <span class="token comment">// \u5982\u679C\u6A21\u5F0F\u7B2C\u4E00\u4E2A\u5B57\u7B26\u4E0D\u662F/\uFF0C\u90A3\u4E48\u5C31\u4EE3\u8868\u6A21\u5F0F\u5305\u542B\u4E3B\u673A\u540D\uFF0C\u8BBE\u7F6Ehosts\u5C5E\u6027\u4E3Atrue,\u5426\u5219\u4E3Afalse(bool\u7C7B\u578B\u96F6\u503C)</span>
	<span class="token keyword">if</span> pattern<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token char">&#39;/&#39;</span> <span class="token punctuation">{</span>
		mux<span class="token punctuation">.</span>hosts <span class="token operator">=</span> <span class="token boolean">true</span>
	<span class="token punctuation">}</span>
    
    <span class="token comment">// \u5982\u679C\u8DEF\u7531\u4E0D\u662F\u4EE5/\u7ED3\u5C3E\u7684\u8BDD\uFF0C\u662F\u4E0D\u4F1A\u63D2\u5165\u5230es\u5207\u7247\u4E2D\u7684\uFF0C\u8FD9\u5C31\u6BD4\u8F83\u6709\u610F\u601D\u4E86\uFF0C\u5177\u4F53\u6709\u5565\u7528\uFF0C\u540E\u9762\u8DEF\u7531\u5339\u914D\u518D\u8BF4\uFF0C\u8FD9\u91CC\u5148\u4E86\u89E3\u6CE8\u518C\u89C4\u5219</span>
<span class="token punctuation">}</span>

<span class="token comment">// ------------------------------------------------------------------</span>
<span class="token keyword">func</span> <span class="token function">appendSorted</span><span class="token punctuation">(</span>es <span class="token punctuation">[</span><span class="token punctuation">]</span>muxEntry<span class="token punctuation">,</span> e muxEntry<span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>muxEntry <span class="token punctuation">{</span>
    <span class="token comment">// \u8FD4\u56DE\u5207\u7247\u4E2D\u6BD4\u3010\u65B0\u8FFD\u52A0\u5143\u7D20\u7684\u957F\u5EA6\u3011\u5C0F\u7684\u6700\u5C0F\u7684\u7D22\u5F15\uFF0C\u5982\u679C\u8FD9\u4E2A\u770B\u4E0D\u592A\u61C2\uFF0C\u53EF\u4EE5\u770B\u4E00\u4E0B\u4E0B\u9762\u5173\u4E8Esort.Search\u90E8\u5206\u7684\u8BB2\u89E3</span>
	n <span class="token operator">:=</span> <span class="token function">len</span><span class="token punctuation">(</span>es<span class="token punctuation">)</span>
	i <span class="token operator">:=</span> sort<span class="token punctuation">.</span><span class="token function">Search</span><span class="token punctuation">(</span>n<span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token function">len</span><span class="token punctuation">(</span>es<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>pattern<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>pattern<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
    
    <span class="token comment">// \u5982\u679C\u6CA1\u6709\u627E\u5230\uFF0C\u5219\u4F1A\u5207\u7247\u672B\u5C3E\u8FFD\u52A0\u5143\u7D20</span>
	<span class="token keyword">if</span> i <span class="token operator">==</span> n <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token function">append</span><span class="token punctuation">(</span>es<span class="token punctuation">,</span> e<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
    
    <span class="token comment">// \u82E5\u627E\u5230\u4E86\uFF0C\u610F\u5473\u7740\u9700\u8981\u5728\u5207\u7247\u4E2D\u95F4\uFF0C\u51C6\u5907\u6765\u8BF4\u5C31\u662F\u7D22\u5F15\u4E3Ai\u7684\u5730\u65B9\u8FFD\u52A0\u5143\u7D20</span>
	es <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>es<span class="token punctuation">,</span> muxEntry<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// \u5728\u672B\u5C3E\u8FFD\u52A0\u4E00\u4E2A\u7A7A\u5143\u7D20\uFF0C\u5360\u4F4D\u548C\u82E5\u5207\u7247\u9700\u8981\u6269\u5BB9\u5219\u5C3D\u65E9\u6269\u5BB9</span>
	<span class="token function">copy</span><span class="token punctuation">(</span>es<span class="token punctuation">[</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">,</span> es<span class="token punctuation">[</span>i<span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">)</span>      <span class="token comment">// \u628A\u7D22\u5F15i\u53CA\u540E\u9762\u7684\u90FD\u5411\u540E\u79FB\u52A8\u4E00\u4F4D</span>
	es<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> e					<span class="token comment">// \u7D22\u5F15i\u8D4B\u503C</span>
	<span class="token keyword">return</span> es					<span class="token comment">// \u8FD4\u56DE\u5207\u7247</span>
<span class="token punctuation">}</span>

<span class="token comment">// ------------------------------------------------------------------</span>
<span class="token comment">// \u793A\u4F8B1</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>	
	<span class="token comment">// \u4F7F\u7528\u4E8C\u5206\u67E5\u627E\uFF0C\u8F93\u51FA\u5E8F\u5217\u4E2D\u503C\u5C0F\u4E8E300\u7684\u6700\u5C0F\u7684\u7D22\u5F15\u53F7</span>
	a <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">500</span><span class="token punctuation">,</span> <span class="token number">400</span><span class="token punctuation">,</span> <span class="token number">300</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">}</span>
	b <span class="token operator">:=</span> sort<span class="token punctuation">.</span><span class="token function">Search</span><span class="token punctuation">(</span><span class="token function">len</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> a<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&lt;</span> <span class="token number">300</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u793A\u4F8B2</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	a <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span>
		<span class="token string">&quot;/a/b/c/d/e/&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;/a/b/c/d/&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;/a/b/&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;/a/&quot;</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	item <span class="token operator">:=</span> <span class="token string">&quot;/a/b/c/&quot;</span>
	b <span class="token operator">:=</span> sort<span class="token punctuation">.</span><span class="token function">Search</span><span class="token punctuation">(</span><span class="token function">len</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token function">len</span><span class="token punctuation">(</span>a<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p><strong>\u603B\u7ED3</strong></p><p>\u8FDB\u884C\u8DEF\u7531\u6CE8\u518C\u65F6\u5206\u4E3A\u4E24\u79CD\u60C5\u51B5\uFF1A</p><p>\u4E00\u3001\u8DEF\u7531\u4EE5<code>/</code>\u7ED3\u5C3E\u7684\uFF1A</p><p>\uFF081\uFF09\u5C06\u8DEF\u7531\u4E0EHandler\u6620\u5C04\u6DFB\u52A0\u5230<code>ServeMux.m</code>\u5B57\u5178\u4E2D</p><p>\uFF082\uFF09\u5C06<code>Entry</code>\u6709\u5E8F\u63D2\u5165\u5230<code>ServeMux.es</code>\u5207\u7247\u4E2D\uFF0C\u6CE8\u610F\u8FD9\u91CC\u662F\u6709\u5E8F\u63D2\u5165\uFF0C\u6309\u7167\u8DEF\u7531\u5B57\u7B26\u4E32\u7684\u957F\u5EA6\u4ECE\u957F\u81F3\u77ED\u6392\u5E8F</p><p>\u4E8C\u3001\u8DEF\u7531\u4EE5\u4E0D\u4EE5<code>/</code>\u7ED3\u5C3E\u7684\uFF1A</p><p>\uFF081\uFF09\u5C06\u8DEF\u7531\u4E0EHandler\u6620\u5C04\u6DFB\u52A0\u5230<code>ServeMux.m</code>\u5B57\u5178\u4E2D</p><h4 id="\u8DEF\u7531\u5339\u914D1-\u7CBE\u786E\u5339\u914D\u548C\u524D\u7F00\u5339\u914D" tabindex="-1"><a class="header-anchor" href="#\u8DEF\u7531\u5339\u914D1-\u7CBE\u786E\u5339\u914D\u548C\u524D\u7F00\u5339\u914D" aria-hidden="true">#</a> \u8DEF\u7531\u5339\u914D1\uFF1A\u7CBE\u786E\u5339\u914D\u548C\u524D\u7F00\u5339\u914D</h4><div class="language-go ext-go"><pre class="language-go"><code><span class="token comment">// Find a handler on a handler map given a path string.</span>
<span class="token comment">// Most-specific (longest) pattern wins.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>mux <span class="token operator">*</span>ServeMux<span class="token punctuation">)</span> <span class="token function">match</span><span class="token punctuation">(</span>path <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>h Handler<span class="token punctuation">,</span> pattern <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// Check for exact match first.</span>
    <span class="token comment">// \u9996\u5148\u68C0\u67E5\u5B57\u5178\u7684\u662F\u5426\u5339\u914D\uFF0C\u5339\u914D\u5230\u76F4\u63A5\u8FD4\u56DE</span>
    <span class="token comment">// \u8FD9\u91CC\u662F\u7CBE\u786E\u5339\u914D\uFF0C\u5F88\u5BB9\u6613\u7406\u89E3\uFF0C\u6CE8\u518C\u7684\u65F6\u5019\u662F\u4EC0\u4E48\u5C31\u5339\u914D\u4EC0\u4E48</span>
	v<span class="token punctuation">,</span> ok <span class="token operator">:=</span> mux<span class="token punctuation">.</span>m<span class="token punctuation">[</span>path<span class="token punctuation">]</span>
	<span class="token keyword">if</span> ok <span class="token punctuation">{</span>
		<span class="token keyword">return</span> v<span class="token punctuation">.</span>h<span class="token punctuation">,</span> v<span class="token punctuation">.</span>pattern
	<span class="token punctuation">}</span>
    
	<span class="token comment">// Check for longest valid match.  mux.es contains all patterns</span>
	<span class="token comment">// that end in / sorted from longest to shortest.</span>
    <span class="token comment">// \u82E5\u4E0A\u9762\u6CA1\u6709\u5339\u914D\u5230\uFF0C\u5219\u4E0Emux.es\u4E2D\u5B58\u50A8\u7684\u6240\u6709\u4EE5\u5C3E\u659C\u6760\u7684\u8FDB\u884C\u5339\u914D\uFF0C\u5B83\u662F\u4ECE\u957F\u5230\u77ED\u5B58\u50A8\u7684\uFF0C\u6700\u65B0\u5339\u914D\u5230\u5C31\u8FD4\u56DE</span>

    <span class="token comment">// \u82E5\u6CE8\u518C\u7684\u8DEF\u7531\u6709\u4E0B\u9762\u51E0\u6761\uFF1A</span>
    <span class="token comment">// /a/b/c/</span>
    <span class="token comment">// /a/b/</span>
    <span class="token comment">// \u90A3\u4E48\uFF1A</span>
    <span class="token comment">// (1) \u8BBF\u95EE/a/b/d\u7684\u65F6\u5019\uFF0C\u4F1A\u4F18\u5148\u5339\u914D\u5230/a/b/\uFF0C\u6240\u4EE5\u5C31\u4F1A\u8BBF\u95EE/a/b/</span>
    <span class="token comment">// (2) \u8BBF\u95EE/a/b\u7684\u65F6\u5019\uFF0C\u5176\u5B9E\u662F\u4E0D\u80FD\u8BBF\u95EE\u5230\u4E0A\u9762\u4EFB\u610F\u4E00\u6761\u8DEF\u7531\u7684\uFF0C\u56E0\u4E3A\u524D\u7F00\u5E76\u4E0D\u5339\u914D</span>
    <span class="token comment">//     \u5982\u679C\u6211\u60F3\u8BBF\u95EE/a/b\u7684\u65F6\u5019\u4E5F\u80FD\u8BBF\u95EE\u5230/a/b/\uFF0C\u90A3\u8BE5\u600E\u4E48\u5F04\u5462\uFF1F\u522B\u7740\u6025\uFF0C\u4E0B\u9762\u6211\u4EEC\u6765\u6D4B\u8BD5\u4E00\u4E0B</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> e <span class="token operator">:=</span> <span class="token keyword">range</span> mux<span class="token punctuation">.</span>es <span class="token punctuation">{</span>
		<span class="token keyword">if</span> strings<span class="token punctuation">.</span><span class="token function">HasPrefix</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> e<span class="token punctuation">.</span>pattern<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> e<span class="token punctuation">.</span>h<span class="token punctuation">,</span> e<span class="token punctuation">.</span>pattern
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>\u670D\u52A1\u7AEF\u4EE3\u7801</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// \u5904\u7406\u5668</span>
<span class="token keyword">func</span> <span class="token function">abHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">&quot;\u6CE8\u518C\u4E3A/a/b/&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">abcHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">&quot;\u6CE8\u518C\u4E3A/a/b/c/&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u76D1\u542C\u5730\u5740</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:80&quot;</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316\u8BF7\u6C42\u591A\u8DEF\u590D\u7528\u5668</span>
	mux <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewServeMux</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6CE8\u518C\u8DEF\u7531\uFF0C\u6CE8\u518C\u7684\u65F6\u5019\u662F\u4E0D\u7528\u7BA1\u6CE8\u518C\u987A\u5E8F\u95EE\u9898\u7684\uFF0C\u5185\u90E8\u4F1A\u81EA\u52A8\u6392\u5E8F\u5199\u5165</span>
	mux<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/a/b/&quot;</span><span class="token punctuation">,</span> abHandler<span class="token punctuation">)</span>
	mux<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/a/b/c/&quot;</span><span class="token punctuation">,</span> abcHandler<span class="token punctuation">)</span>

	<span class="token comment">// \u542F\u52A8\u670D\u52A1</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;* Running on http://&quot;</span> <span class="token operator">+</span> addr<span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span>addr<span class="token punctuation">,</span> mux<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8DEF\u7531\u5339\u914D\u6D4B\u8BD5</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u6CE8\u518C\u4EC0\u4E48\u5C31\u8BBF\u95EE\u4EC0\u4E48(\u5C3E\u659C\u6760\u4FDD\u6301\u4E00\u81F4)\uFF0C\u7B26\u5408\u9884\u671F</span>
C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token operator">&gt;</span>curl http://127.0.0.1/a/b/
\u6CE8\u518C\u4E3A/a/b/
C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token operator">&gt;</span>curl http://127.0.0.1/a/b/c/
\u6CE8\u518C\u4E3A/a/b/c/

<span class="token comment"># \u8BBF\u95EE/a/b/d/</span>
<span class="token comment"># \u5B83\u53EA\u80FD\u5339\u914D\u5230\u524D\u7F00\u4E3A/a/b/\u7684\u8DEF\u7531\uFF0C\u6240\u4EE5\u4F1A\u8F93\u51FA&quot;\u6CE8\u518C\u4E3A/a/b/&quot;</span>
C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token operator">&gt;</span>curl http://127.0.0.1/a/b/d
\u6CE8\u518C\u4E3A/a/b/
C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token operator">&gt;</span>curl http://127.0.0.1/a/b/d/
\u6CE8\u518C\u4E3A/a/b/

<span class="token comment"># \u8BBF\u95EE/a/b/c/d</span>
<span class="token comment"># ServeMux.es\u662F\u6309\u7167\u4ECE\u957F\u5230\u77ED\u5B58\u50A8\u8DEF\u7531\u7684\uFF0C\u6240\u4EE5\u4F1A\u4F18\u5148\u5339\u914D\u5230/a/b/c/</span>
C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token operator">&gt;</span>curl http://127.0.0.1/a/b/c/d
\u6CE8\u518C\u4E3A/a/b/c/

<span class="token comment"># \u5173\u952E\u7684\u6765\u4E86 -----------------------------------------------------------------</span>
<span class="token comment"># \u8BBF\u95EE/a/b\u4F1A\u6709\u4EC0\u4E48\u7ED3\u679C\u5462\uFF1F\u6309\u9053\u7406\u6765\u8BF4\uFF0C\u7CBE\u786E\u5339\u914D\u662F\u5339\u914D\u4E0D\u5230\u7684\uFF0C\u6309\u524D\u7F00\u5339\u914D\u4E5F\u662F\u5339\u914D\u4E0D\u5230\u7684\uFF0C\u5E94\u8BE5\u8FD4\u56DE404,\u662F\u8FD9\u6837\u5417\uFF1F</span>
C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token operator">&gt;</span>curl http://127.0.0.1/a/b
<span class="token operator">&lt;</span>a <span class="token assign-left variable">href</span><span class="token operator">=</span><span class="token string">&quot;/a/b/&quot;</span><span class="token operator">&gt;</span>Moved Permanently<span class="token operator">&lt;</span>/a<span class="token operator">&gt;</span>.				<span class="token comment"># \u53D1\u751F\u91CD\u5B9A\u5411\u4E86</span>

C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token operator">&gt;</span>curl http://127.0.0.1/a/b -I <span class="token comment"># \u770B\u4E00\u4E0B\u54CD\u5E94\u5934\u8BE6\u60C5</span>
HTTP/1.1 <span class="token number">301</span> Moved Permanently						<span class="token comment"># 301\u6C38\u4E45\u91CD\u5B9A\u5411</span>
Content-Type: text/html<span class="token punctuation">;</span> <span class="token assign-left variable">charset</span><span class="token operator">=</span>utf-8
Location: /a/b/										<span class="token comment"># \u8BA9\u6211\u4EEC\u91CD\u5B9A\u5411\u5230/a/b/,\u91CD\u5B9A\u5411\u540E\u5C31\u5C5E\u4E8E\u7CBE\u786E\u5339\u914D\u4E86</span>
Date: Mon, 02 May <span class="token number">2022</span> 08:14:06 GMT

<span class="token comment"># \u5982\u679C\u662F\u5728\u6D4F\u89C8\u5668\u4E2D\u8BBF\u95EE\uFF0C\u6D4F\u89C8\u5668\u4F1A\u81EA\u52A8\u5904\u7406\u91CD\u5B9A\u5411\uFF0C\u4F7F\u7528curl\u7684\u8BDD\u53EA\u9700\u8981\u6DFB\u52A0-L\u53C2\u6570\uFF0C\u4F1A\u81EA\u52A8\u8BBF\u95EE\u91CD\u5B9A\u5411\u7684\u5730\u5740</span>
<span class="token comment"># \u6240\u4EE5\u53C8\u770B\u89C1\u719F\u6089\u7684/a/b/\u4E86</span>
C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token operator">&gt;</span>curl http://127.0.0.1/a/b -L
\u6CE8\u518C\u4E3A/a/b/
</code></pre></div><h4 id="\u8DEF\u7531\u5339\u914D2-\u91CD\u5B9A\u5411\u89C4\u5219" tabindex="-1"><a class="header-anchor" href="#\u8DEF\u7531\u5339\u914D2-\u91CD\u5B9A\u5411\u89C4\u5219" aria-hidden="true">#</a> \u8DEF\u7531\u5339\u914D2\uFF1A\u91CD\u5B9A\u5411\u89C4\u5219</h4><div class="language-go ext-go"><pre class="language-go"><code><span class="token comment">// redirectToPathSlash determines if the given path needs appending &quot;/&quot; to it.</span>
<span class="token comment">// redirectToPathSlash\u51FD\u6570\u7528\u4E8E\u786E\u8BA4\u662F\u5426\u8981\u7ED9\u8DEF\u7531\u6DFB\u52A0\u5C3E\u659C\u6760/</span>

<span class="token comment">// This occurs when a handler for path + &quot;/&quot; was already registered, but</span>
<span class="token comment">// not for path itself. If the path needs appending to, it creates a new</span>
<span class="token comment">// URL, setting the path to u.Path + &quot;/&quot; and returning true to indicate so.</span>
<span class="token comment">// \u4EC0\u4E48\u65F6\u5019\u5E94\u8BE5\u53D1\u751F\u91CD\u5B9A\u5411\u5462\uFF1F</span>
<span class="token comment">// \u5C31\u662F\u5E26\u5C3E\u659C\u6760\u7684\u8DEF\u7531\u5DF2\u7ECF\u6CE8\u518C\u4E86\uFF0C\u4F46\u662F\u4E0D\u5E26\u5C3E\u659C\u6760\u7684\u8DEF\u7531\u5E76\u6CA1\u6709\u6CE8\u518C\uFF0C\u4E5F\u5C31\u662F\u8BF4/a/b/\u6CE8\u518C\u4E86\uFF0C\u4F46\u662F/a/b\u6CA1\u6709\u6CE8\u518C\u7684\u60C5\u51B5\u4E0B</span>
<span class="token comment">// \u8FD9\u4E2A\u903B\u8F91\u5728\u53E6\u4E00\u4E2A\u51FD\u6570shouldRedirectRLocked\u4E2D</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>mux <span class="token operator">*</span>ServeMux<span class="token punctuation">)</span> <span class="token function">redirectToPathSlash</span><span class="token punctuation">(</span>host<span class="token punctuation">,</span> path <span class="token builtin">string</span><span class="token punctuation">,</span> u <span class="token operator">*</span>url<span class="token punctuation">.</span>URL<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>url<span class="token punctuation">.</span>URL<span class="token punctuation">,</span> <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	mux<span class="token punctuation">.</span>mu<span class="token punctuation">.</span><span class="token function">RLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	shouldRedirect <span class="token operator">:=</span> mux<span class="token punctuation">.</span><span class="token function">shouldRedirectRLocked</span><span class="token punctuation">(</span>host<span class="token punctuation">,</span> path<span class="token punctuation">)</span>
	mux<span class="token punctuation">.</span>mu<span class="token punctuation">.</span><span class="token function">RUnlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token operator">!</span>shouldRedirect <span class="token punctuation">{</span>
		<span class="token keyword">return</span> u<span class="token punctuation">,</span> <span class="token boolean">false</span>
	<span class="token punctuation">}</span>
	path <span class="token operator">=</span> path <span class="token operator">+</span> <span class="token string">&quot;/&quot;</span>
	u <span class="token operator">=</span> <span class="token operator">&amp;</span>url<span class="token punctuation">.</span>URL<span class="token punctuation">{</span>Path<span class="token punctuation">:</span> path<span class="token punctuation">,</span> RawQuery<span class="token punctuation">:</span> u<span class="token punctuation">.</span>RawQuery<span class="token punctuation">}</span>
	<span class="token keyword">return</span> u<span class="token punctuation">,</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>

<span class="token comment">// ---------------------------------------------------------------------------------------</span>
<span class="token comment">// shouldRedirectRLocked reports whether the given path and host should be redirected to</span>
<span class="token comment">// path+&quot;/&quot;. This should happen if a handler is registered for path+&quot;/&quot; but</span>
<span class="token comment">// not path -- see comments at ServeMux.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>mux <span class="token operator">*</span>ServeMux<span class="token punctuation">)</span> <span class="token function">shouldRedirectRLocked</span><span class="token punctuation">(</span>host<span class="token punctuation">,</span> path <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u8DEF\u7531\u5B57\u7B26\u4E32\uFF0C\u5305\u542B\u4E0D\u5E26\u4E3B\u673A\u540D\u7684\u548C\u5E26\u4E3B\u673A\u540D\u7684</span>
    p <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span>path<span class="token punctuation">,</span> host <span class="token operator">+</span> path<span class="token punctuation">}</span>

    <span class="token comment">// \u5982\u679C\u8BE5\u8DEF\u7531\u5DF2\u7ECF\u6CE8\u518C\u4E86\uFF0C\u5219\u8FD4\u56DEfalse\uFF0C\u4EE3\u8868\u4E0D\u5E94\u8BE5\u91CD\u5B9A\u5411</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> c <span class="token operator">:=</span> <span class="token keyword">range</span> p <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> exist <span class="token operator">:=</span> mux<span class="token punctuation">.</span>m<span class="token punctuation">[</span>c<span class="token punctuation">]</span><span class="token punctuation">;</span> exist <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">false</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

    <span class="token comment">// \u8DEF\u7531\u4E3A\u7A7A\u76F4\u63A5\u8FD4\u56DEfalse</span>
	n <span class="token operator">:=</span> <span class="token function">len</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span>
	<span class="token keyword">if</span> n <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">false</span>
	<span class="token punctuation">}</span>
    <span class="token comment">// \u6784\u9020\u51FA\u4E00\u4E2A\u5E26\u5C3E\u659C\u6760\u7684\u8DEF\u7531\uFF0C\u5982\u679C\u5B58\u5728\uFF0C</span>
    <span class="token comment">// \u5982\u679C\u539F\u8DEF\u7531\u6700\u540E\u4E00\u4E2A\u5B57\u7B26\u662F/\uFF0C\u5219\u8FD4\u56DEfalse\uFF0C\u5426\u5219\u8FD4\u56DEtrue</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> c <span class="token operator">:=</span> <span class="token keyword">range</span> p <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> exist <span class="token operator">:=</span> mux<span class="token punctuation">.</span>m<span class="token punctuation">[</span>c<span class="token operator">+</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span> exist <span class="token punctuation">{</span>
			<span class="token keyword">return</span> path<span class="token punctuation">[</span>n<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token char">&#39;/&#39;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

    <span class="token comment">// \u9ED8\u8BA4\u8FD4\u56DEfalse</span>
	<span class="token keyword">return</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>
</code></pre></div><p>\u603B\u7ED3</p><p>\uFF081\uFF09\u5C31\u662F\u8BF4<code>/a/b/</code>\u6CE8\u518C\u4E86\uFF0C\u4F46\u662F<code>/a/b</code>\u6CA1\u6709\u6CE8\u518C\u7684\u60C5\u51B5\u4E0B\u5C31\u4F1A\u53D1\u751F\u91CD\u5B9A\u5411</p><p>\uFF082\uFF09\u5982\u679C\u4E0D\u60F3\u8BA9\u5B83\u91CD\u5B9A\u5411\uFF0C\u4E5F\u6709\u529E\u6CD5\uFF0C\u5C31\u662F\u628A<code>/a/b</code>\u4E5F\u6CE8\u518C\u4E00\u904D</p><h4 id="\u8DEF\u7531\u5339\u914D3-\u5E26\u4E3B\u673A\u540D\u7684\u8DEF\u7531" tabindex="-1"><a class="header-anchor" href="#\u8DEF\u7531\u5339\u914D3-\u5E26\u4E3B\u673A\u540D\u7684\u8DEF\u7531" aria-hidden="true">#</a> \u8DEF\u7531\u5339\u914D3\uFF1A\u5E26\u4E3B\u673A\u540D\u7684\u8DEF\u7531</h4><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// \u5904\u7406\u5668</span>
<span class="token keyword">func</span> <span class="token function">orgLoginHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">&quot;orgLoginHandler&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">comLoginHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">&quot;comLoginHandler&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u76D1\u542C\u5730\u5740</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:80&quot;</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316\u8BF7\u6C42\u591A\u8DEF\u590D\u7528\u5668</span>
	mux <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewServeMux</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6CE8\u518C\u8DEF\u7531\uFF08\u5E26\u4E3B\u673A\u540D\uFF09</span>
	mux<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;test.org/login/&quot;</span><span class="token punctuation">,</span> orgLoginHandler<span class="token punctuation">)</span>
	mux<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;test.com/login/&quot;</span><span class="token punctuation">,</span> comLoginHandler<span class="token punctuation">)</span>

	<span class="token comment">// \u542F\u52A8\u670D\u52A1</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;* Running on http://&quot;</span> <span class="token operator">+</span> addr<span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span>addr<span class="token punctuation">,</span> mux<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u6D4B\u8BD5</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u8BBF\u95EE127.0.0.1,\u62A5\u9519404</span>
C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token operator">&gt;</span>curl http://127.0.0.1/login/
<span class="token number">404</span> page not found

<span class="token comment"># \u8BBF\u95EE\u5E26\u4E3B\u673A\u540D\u7684\u8DEF\u7531</span>
<span class="token comment"># \u63D0\u524D\u4FEE\u6539\u597D\u597Dhosts\u6587\u4EF6</span>
<span class="token comment"># 127.0.0.1       	test.org</span>
<span class="token comment"># 127.0.0.1       	test.com</span>
C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token operator">&gt;</span>curl http://test.org/login/
orgLoginHandler
C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token operator">&gt;</span>curl http://test.com/login/
comLoginHandler

<span class="token comment"># \u8BBF\u95EE\u4E0D\u5E26\u5C3E\u659C\u6760\u7684\u8DEF\u7531\uFF0C\u53D1\u751F\u91CD\u5B9A\u5411</span>
C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token operator">&gt;</span>curl http://test.com/login
<span class="token operator">&lt;</span>a <span class="token assign-left variable">href</span><span class="token operator">=</span><span class="token string">&quot;/login/&quot;</span><span class="token operator">&gt;</span>Moved Permanently<span class="token operator">&lt;</span>/a<span class="token operator">&gt;</span>.
C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token operator">&gt;</span>curl http://test.com/login -L
comLoginHandler
</code></pre></div><h4 id="\u8DEF\u7531\u5339\u914D4-\u603B\u7ED3" tabindex="-1"><a class="header-anchor" href="#\u8DEF\u7531\u5339\u914D4-\u603B\u7ED3" aria-hidden="true">#</a> \u8DEF\u7531\u5339\u914D4\uFF1A\u603B\u7ED3</h4><p>\u6CE8\u518C\u8DEF\u7531\u65F6\u5E94\u8BE5\u5E26\u4E0D\u5E26\u5C3E\u659C\u6760\u5462\uFF1F</p><p>\uFF081\uFF09\u5982\u679C\u4E0D\u5E26\u5C3E\u659C\u6760\u7684\u8BDD\u53EA\u80FD\u7CBE\u786E\u5339\u914D\uFF0C\u5373\u6CE8\u518C<code>/a/b</code>\u8BBF\u95EE<code>/a/b/</code>\u4F1A\u8FD4\u56DE<code>404</code>\uFF0C\u8FD9\u6837\u4E0D\u592A\u53CB\u597D</p><p>\uFF082\uFF09\u5982\u679C\u5E26\u5C3E\u659C\u6760\u7684\u8BDD\uFF0C\u5373\u6CE8\u518C<code>/a/b/</code>\u8BBF\u95EE<code>/a/b</code>\u65F6\uFF1A</p><ul><li><p>\u91CD\u5B9A\u5411\u95EE\u9898</p><ul><li><p>\u9ED8\u8BA4\u4F1A\u89E6\u53D1<code>301</code>\u91CD\u5B9A\u5411\uFF0C\u5982\u679C\u4E0D\u60F3\u91CD\u5B9A\u5411\uFF0C\u53EF\u4EE5\u628A<code>/a/b</code>\u4E5F\u6CE8\u518C\u4E00\u904D</p></li><li><p>\u5199\u4EE3\u7801/\u811A\u672C\u7684\u65F6\u5019\u6CE8\u610F\u5141\u8BB8\u91CD\u5B9A\u5411\u6216\u76F4\u63A5\u5199\u5E26\u5C3E\u659C\u6760\u7684<code>URL</code>\uFF0C\u6BD4\u5982<code>curl -L</code></p></li></ul></li><li><p>\u8BBF\u95EE<code>/a/b/d</code>\u4E5F\u4F1A\u8BBF\u95EE\u5230<code>/a/b/</code>\uFF0C\u8FD9\u4E00\u70B9\u9700\u8981\u7279\u522B\u6CE8\u610F\uFF0C\u5982\u679C\u4E0D\u60F3\u8981\u8FD9\u4E2A\u529F\u80FD\u7684\u8BDD\uFF0C\u7C97\u66B4\u7684\u89E3\u51B3\u529E\u6CD5\u662F\u76F4\u63A5\u5C06\u6807\u51C6\u5E93<code>net/http</code>\u4E2D\u7684\u4EE3\u7801\u6CE8\u91CA\u6389</p><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>mux <span class="token operator">*</span>ServeMux<span class="token punctuation">)</span> <span class="token function">match</span><span class="token punctuation">(</span>path <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>h Handler<span class="token punctuation">,</span> pattern <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span>

	<span class="token comment">// Check for exact match first.</span>
	v<span class="token punctuation">,</span> ok <span class="token operator">:=</span> mux<span class="token punctuation">.</span>m<span class="token punctuation">[</span>path<span class="token punctuation">]</span>
	<span class="token keyword">if</span> ok <span class="token punctuation">{</span>
		<span class="token keyword">return</span> v<span class="token punctuation">.</span>h<span class="token punctuation">,</span> v<span class="token punctuation">.</span>pattern
	<span class="token punctuation">}</span>
    
	<span class="token comment">// Check for longest valid match.  mux.es contains all patterns</span>
	<span class="token comment">// that end in / sorted from longest to shortest.</span>
    <span class="token comment">// \u4E0B\u9762\u8FD9\u4E00\u6BB5\u4EE3\u7801\u6CE8\u91CA\u6389</span>
	<span class="token comment">//for _, e := range mux.es {</span>
	<span class="token comment">//	if strings.HasPrefix(path, e.pattern) {</span>
	<span class="token comment">//		return e.h, e.pattern</span>
	<span class="token comment">//	}</span>
	<span class="token comment">//}</span>

	<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span>
<span class="token punctuation">}</span>
</code></pre></div></li></ul><h3 id="server" tabindex="-1"><a class="header-anchor" href="#server" aria-hidden="true">#</a> Server</h3><h4 id="\u81EA\u5B9A\u4E49server" tabindex="-1"><a class="header-anchor" href="#\u81EA\u5B9A\u4E49server" aria-hidden="true">#</a> \u81EA\u5B9A\u4E49Server</h4><p>\u67E5\u770B<code>http.ListenAndServe</code>\u6E90\u7801</p><div class="language-go ext-go"><pre class="language-go"><code><span class="token comment">// ListenAndServe listens on the TCP network address addr and then calls</span>
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
</code></pre></div><p>\u6240\u4EE5\u6211\u4EEC\u4E5F\u53EF\u4EE5\u4F7F\u7528\u81EA\u5DF1\u7684Server</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// \u5904\u7406\u5668</span>
<span class="token keyword">func</span> <span class="token function">indexHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">&quot;Hello, world!\\n&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u76D1\u542C\u5730\u5740</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:80&quot;</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316\u8BF7\u6C42\u591A\u8DEF\u590D\u7528\u5668</span>
	mux <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewServeMux</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6CE8\u518C\u8DEF\u7531</span>
	mux<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> indexHandler<span class="token punctuation">)</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316Server</span>
	server <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Server<span class="token punctuation">{</span>Addr<span class="token punctuation">:</span> addr<span class="token punctuation">,</span> Handler<span class="token punctuation">:</span> mux<span class="token punctuation">}</span>

	<span class="token comment">// \u542F\u52A8\u670D\u52A1</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;* Running on http://&quot;</span> <span class="token operator">+</span> addr<span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>server<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h4 id="server\u8D85\u65F6\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#server\u8D85\u65F6\u914D\u7F6E" aria-hidden="true">#</a> Server\u8D85\u65F6\u914D\u7F6E</h4><table><thead><tr><th>\u53C2\u6570</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td><code>ReadTimeout</code></td><td>\u670D\u52A1\u7AEF\u8BFB\u53D6\u5BA2\u6237\u7AEF\u8BF7\u6C42\u8D85\u65F6\u65F6\u95F4\uFF0C\u5305\u542B\u8BF7\u6C42\u5934\u548C\u8BF7\u6C42\u4F53\uFF1B0\u4EE3\u8868\u6C38\u4E0D\u8D85\u65F6</td></tr><tr><td><code>ReadHeaderTimeout</code></td><td>\u670D\u52A1\u7AEF\u8BFB\u53D6\u5BA2\u6237\u7AEF\u8BF7\u6C42\u8D85\u65F6\u65F6\u95F4\uFF0C\uFF0C\u5305\u542B\u8BF7\u6C42\u5934\uFF1B0\u4EE3\u8868\u6C38\u4E0D\u8D85\u65F6</td></tr><tr><td><code>WriteTimeout</code></td><td>\u670D\u52A1\u7AEF\u54CD\u5E94\u8D85\u65F6\u65F6\u95F4\uFF0C\u5373<code>Handler</code>\u8D85\u65F6\u65F6\u95F4\uFF0C\u5982\u679C\u53D1\u751F\u8D85\u65F6\uFF0C\u5219\u4EC0\u4E48\u4E5F\u4E0D\u8FD4\u56DE\uFF1B0\u4EE3\u8868\u6C38\u4E0D\u8D85\u65F6</td></tr><tr><td><code>IdleTimeout</code></td><td>\u8FDE\u63A5\u6C60\u4E2D\u7A7A\u95F2\u8FDE\u63A5\u8D85\u65F6\u65F6\u95F4\uFF0C\u5982\u679C\u6CA1\u6709\u8BBE\u7F6E\u4F1A\u4F7F\u7528<code>ReadTimeout</code>\u7684\u503C\uFF0C\u5982\u679C<code>ReadTimeout</code>\u4E5F\u6CA1\u6709\u8BBE\u7F6E\uFF0C\u5219\u4EE3\u8868\u6C38\u4E0D\u8D85\u65F6</td></tr></tbody></table>`,62),N=s("\u5173\u4E8E\u8D85\u65F6\u95EE\u9898\uFF0C\u8FD9\u91CC\u6709\u4E00\u7BC7\u6587\u7AE0\u5F88\u597D\uFF1A"),W={href:"https://segmentfault.com/a/1190000023635278",target:"_blank",rel:"noopener noreferrer"},O=s("https://segmentfault.com/a/1190000023635278"),I=p(`<h4 id="server\u4F18\u96C5\u5173\u95ED" tabindex="-1"><a class="header-anchor" href="#server\u4F18\u96C5\u5173\u95ED" aria-hidden="true">#</a> Server\u4F18\u96C5\u5173\u95ED</h4><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;context&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;io&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
	<span class="token string">&quot;os&quot;</span>
	<span class="token string">&quot;os/signal&quot;</span>
	<span class="token string">&quot;syscall&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// Handler</span>
<span class="token keyword">func</span> <span class="token function">indexHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Received a request&quot;</span><span class="token punctuation">)</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">8</span><span class="token punctuation">)</span> <span class="token comment">// \u6A21\u5F0F\u5904\u7406\u4E00\u4E2A\u957F\u65F6\u95F4\u7684\u8BF7\u6C42</span>
	io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">&quot;Welcome to Go!\\n&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u4FE1\u53F7\u76D1\u542C</span>
<span class="token keyword">func</span> <span class="token function">SignalEvent</span><span class="token punctuation">(</span>server <span class="token operator">*</span>http<span class="token punctuation">.</span>Server<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u6CE8\u518C\u4FE1\u53F7</span>
	interrupt <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> os<span class="token punctuation">.</span>Signal<span class="token punctuation">)</span>
	reload <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> os<span class="token punctuation">.</span>Signal<span class="token punctuation">)</span>

    <span class="token comment">// \u9000\u51FA\u4FE1\u53F7</span>
	signal<span class="token punctuation">.</span><span class="token function">Notify</span><span class="token punctuation">(</span>
		interrupt<span class="token punctuation">,</span>
		syscall<span class="token punctuation">.</span>SIGINT<span class="token punctuation">,</span>  <span class="token comment">// kill -2 || Ctrl+C</span>
		syscall<span class="token punctuation">.</span>SIGQUIT<span class="token punctuation">,</span> <span class="token comment">// kill -3 || Ctrl+\\</span>
		syscall<span class="token punctuation">.</span>SIGTERM<span class="token punctuation">,</span> <span class="token comment">// kill -15</span>
	<span class="token punctuation">)</span>
    
    <span class="token comment">// \u91CD\u8F7D\u914D\u7F6E</span>
	signal<span class="token punctuation">.</span><span class="token function">Notify</span><span class="token punctuation">(</span>reload<span class="token punctuation">,</span> syscall<span class="token punctuation">.</span>SIGHUP<span class="token punctuation">)</span> <span class="token comment">// kill -1</span>

	<span class="token comment">// \u76D1\u542C\u4FE1\u53F7</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		<span class="token keyword">select</span> <span class="token punctuation">{</span>		
		<span class="token keyword">case</span> <span class="token operator">&lt;-</span>interrupt<span class="token punctuation">:</span>
			<span class="token function">Shutdown</span><span class="token punctuation">(</span>server<span class="token punctuation">,</span> time<span class="token punctuation">.</span>Second<span class="token operator">*</span><span class="token number">10</span><span class="token punctuation">)</span>		
		<span class="token keyword">case</span> <span class="token operator">&lt;-</span>reload<span class="token punctuation">:</span>
			<span class="token function">Reload</span><span class="token punctuation">(</span>server<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u4F18\u96C5\u5173\u95ED</span>
<span class="token keyword">func</span> <span class="token function">Shutdown</span><span class="token punctuation">(</span>server <span class="token operator">*</span>http<span class="token punctuation">.</span>Server<span class="token punctuation">,</span> timeout time<span class="token punctuation">.</span>Duration<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Waiting for the remaining connections to finish...&quot;</span><span class="token punctuation">)</span>
	ctx<span class="token punctuation">,</span> cancel <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">WithTimeout</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> timeout<span class="token punctuation">)</span>
	<span class="token keyword">defer</span> <span class="token function">cancel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	err <span class="token operator">:=</span> server<span class="token punctuation">.</span><span class="token function">Shutdown</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;HTTP Server graceful shutdown failed: &quot;</span> <span class="token operator">+</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;HTTP Server forced shutdown successfully&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;HTTP Server gracefully shutdown successfully&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u91CD\u8F7D\u914D\u7F6E</span>
<span class="token keyword">func</span> <span class="token function">Reload</span><span class="token punctuation">(</span>server <span class="token operator">*</span>http<span class="token punctuation">.</span>Server<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Reload&quot;</span><span class="token punctuation">)</span>
	server<span class="token punctuation">.</span>WriteTimeout <span class="token operator">=</span> time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">10</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u521D\u59CB\u5316Server</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:80&quot;</span>
	mux <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewServeMux</span><span class="token punctuation">(</span><span class="token punctuation">)</span>                        <span class="token comment">// \u5B9E\u4F8B\u5316\u8BF7\u6C42\u591A\u8DEF\u590D\u7528\u5668</span>
	mux<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> indexHandler<span class="token punctuation">)</span>                <span class="token comment">// \u6CE8\u518C\u8DEF\u7531</span>
	server <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Server<span class="token punctuation">{</span>Addr<span class="token punctuation">:</span> addr<span class="token punctuation">,</span> Handler<span class="token punctuation">:</span> mux<span class="token punctuation">}</span> <span class="token comment">// \u521B\u5EFAServer</span>

	<span class="token comment">// \u542F\u52A8Server</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;* Running on http://&quot;</span> <span class="token operator">+</span> addr<span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Current PID: &quot;</span><span class="token punctuation">,</span> os<span class="token punctuation">.</span><span class="token function">Getpid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		err <span class="token operator">:=</span> server<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> http<span class="token punctuation">.</span>ErrServerClosed <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u76D1\u542CServer\u4FE1\u53F7</span>
	<span class="token function">SignalEvent</span><span class="token punctuation">(</span>server<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h2 id="-1" tabindex="-1"><a class="header-anchor" href="#-1" aria-hidden="true">#</a></h2><h2 id="gin" tabindex="-1"><a class="header-anchor" href="#gin" aria-hidden="true">#</a> Gin</h2>`,4),K=s("\u5B98\u7F51\uFF1A"),V={href:"https://gin-gonic.com/",target:"_blank",rel:"noopener noreferrer"},J=s("https://gin-gonic.com/"),j=s("Github\uFF1A"),z={href:"https://github.com/gin-gonic/gin",target:"_blank",rel:"noopener noreferrer"},Q=s("https://github.com/gin-gonic/gin"),X=n("p",null,"\u6587\u6863\uFF1A",-1),Y={href:"https://gin-gonic.com/zh-cn/docs/",target:"_blank",rel:"noopener noreferrer"},Z=s("https://gin-gonic.com/zh-cn/docs/"),$={href:"https://pkg.go.dev/github.com/gin-gonic/gin",target:"_blank",rel:"noopener noreferrer"},nn=s("https://pkg.go.dev/github.com/gin-gonic/gin"),sn=p(`<h3 id="\u57FA\u7840\u793A\u4F8B-2" tabindex="-1"><a class="header-anchor" href="#\u57FA\u7840\u793A\u4F8B-2" aria-hidden="true">#</a> \u57FA\u7840\u793A\u4F8B</h3><h4 id="\u5B89\u88C5gin" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5gin" aria-hidden="true">#</a> \u5B89\u88C5Gin</h4><div class="language-bash ext-sh"><pre class="language-bash"><code>go get -u github.com/gin-gonic/gin
</code></pre></div><h4 id="\u57FA\u7840\u793A\u4F8B-3" tabindex="-1"><a class="header-anchor" href="#\u57FA\u7840\u793A\u4F8B-3" aria-hidden="true">#</a> \u57FA\u7840\u793A\u4F8B</h4><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u76D1\u542C\u5730\u5740</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:80&quot;</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316Gin\u8DEF\u7531\u5F15\u64CE</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6CE8\u518C\u8DEF\u7531</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> <span class="token string">&quot;Hello Gin!\\n&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// \u542F\u52A8Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="r-run-addr" tabindex="-1"><a class="header-anchor" href="#r-run-addr" aria-hidden="true">#</a> r.Run(addr)</h4><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>engine <span class="token operator">*</span>Engine<span class="token punctuation">)</span> <span class="token function">Run</span><span class="token punctuation">(</span>addr <span class="token operator">...</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>	<span class="token comment">// addr\u662F\u53EF\u4EE5\u4E0D\u7528\u4F20\u7684</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token function">debugPrintError</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token keyword">if</span> engine<span class="token punctuation">.</span><span class="token function">isUnsafeTrustedProxies</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">debugPrint</span><span class="token punctuation">(</span><span class="token string">&quot;[WARNING] You trusted all proxies, this is NOT safe. We recommend you to set a value.\\n&quot;</span> <span class="token operator">+</span>
			<span class="token string">&quot;Please check https://pkg.go.dev/github.com/gin-gonic/gin#readme-don-t-trust-all-proxies for details.&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	address <span class="token operator">:=</span> <span class="token function">resolveAddress</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span>	<span class="token comment">// \u770B\u4E00\u4E0Baddr\u5904\u7406\u903B\u8F91</span>
	<span class="token function">debugPrint</span><span class="token punctuation">(</span><span class="token string">&quot;Listening and serving HTTP on %s\\n&quot;</span><span class="token punctuation">,</span> address<span class="token punctuation">)</span>
    <span class="token comment">// \u53EF\u4EE5\u770B\u5230\uFF0C\u5185\u90E8\u5176\u5B9E\u662F\u8C03\u7528\u4E86net/http\u7684ListenAndServe</span>
    <span class="token comment">// \u8FD9\u91CC\u7684engine\u5C31\u662F\u6211\u4EEC\u4E0A\u9762gin.Default()\u7684\u503Cr\uFF0C\u5B83\u5B9E\u73B0\u4E86http.Handler\u63A5\u53E3</span>
	err <span class="token operator">=</span> http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span>address<span class="token punctuation">,</span> engine<span class="token punctuation">)</span>
	<span class="token keyword">return</span>
<span class="token punctuation">}</span>

<span class="token comment">// --------------------------------------------------------------------------------------------</span>
<span class="token keyword">func</span> <span class="token function">resolveAddress</span><span class="token punctuation">(</span>addr <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">switch</span> <span class="token function">len</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">case</span> <span class="token number">0</span><span class="token punctuation">:</span> 
		<span class="token comment">// \u5982\u679C\u6CA1\u6709\u4F20addr\u53C2\u6570\u7684\u8BDD\uFF0C\u5C1D\u8BD5\u4F7F\u7528\u73AF\u5883\u53D8\u91CFPORT\u7684\u503C</span>
		<span class="token keyword">if</span> port <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Getenv</span><span class="token punctuation">(</span><span class="token string">&quot;PORT&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> port <span class="token operator">!=</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">{</span>
			<span class="token function">debugPrint</span><span class="token punctuation">(</span><span class="token string">&quot;Environment variable PORT=\\&quot;%s\\&quot;&quot;</span><span class="token punctuation">,</span> port<span class="token punctuation">)</span>
			<span class="token keyword">return</span> <span class="token string">&quot;:&quot;</span> <span class="token operator">+</span> port
		<span class="token punctuation">}</span>
        <span class="token comment">// \u82E5\u6CA1\u6709\u627E\u5230\u73AF\u5883\u53D8\u91CFPORT\uFF0C\u5219\u9ED8\u8BA4\u4F7F\u7528:8080</span>
		<span class="token function">debugPrint</span><span class="token punctuation">(</span><span class="token string">&quot;Environment variable PORT is undefined. Using port :8080 by default&quot;</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token string">&quot;:8080&quot;</span>
	<span class="token keyword">case</span> <span class="token number">1</span><span class="token punctuation">:</span>
        <span class="token comment">// \u5982\u679C\u4F20\u4E86addr\u53C2\u6570\uFF0C\u5219\u9ED8\u8BA4\u8FD4\u56DE</span>
		<span class="token keyword">return</span> addr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
	<span class="token keyword">default</span><span class="token punctuation">:</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;too many parameters&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// --------------------------------------------------------------------------------------------</span>
<span class="token comment">// \u6839\u636E\u4EE5\u4E0A\u4FE1\u606F\uFF0C\u6211\u4EEC\u5728\u542F\u52A8Server\u7684\u65F6\u5019\u4E5F\u53EF\u4EE5\u4F7F\u7528http.ListenAndServe</span>
<span class="token comment">// \u542F\u52A8Gin Server</span>
log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span>addr<span class="token punctuation">,</span> r<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre></div><h4 id="gin-default" tabindex="-1"><a class="header-anchor" href="#gin-default" aria-hidden="true">#</a> gin.Default()</h4><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>Engine <span class="token punctuation">{</span>
	<span class="token function">debugPrintWARNINGDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	engine <span class="token operator">:=</span> <span class="token function">New</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    engine<span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span><span class="token function">Logger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">Recovery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>	<span class="token comment">// \u8FD9\u91CC\u4F7F\u7528\u4E86\u4E24\u4E2A\u4E2D\u95F4\u4EF6\uFF0CLogger()\u548CRecovery(),\u73B0\u5728\u5148\u4E0D\u5173\u5FC3\uFF0C\u5F80\u540E\u770B</span>
	<span class="token keyword">return</span> engine
<span class="token punctuation">}</span>

<span class="token comment">// ---------------------------------------------------------------------------------</span>
<span class="token comment">// ServeHTTP conforms to the http.Handler interface.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>engine <span class="token operator">*</span>Engine<span class="token punctuation">)</span> <span class="token function">ServeHTTP</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u5F80\u6C60\u5B50\u91CC\u53D6\u51FA\u4E00\u4E2AContext</span>
    <span class="token comment">// engine.pool\u5C31\u662Fsync.Pool\uFF0C\u4E34\u65F6\u5185\u5B58\u6C60</span>
	c <span class="token operator">:=</span> engine<span class="token punctuation">.</span>pool<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>Context<span class="token punctuation">)</span>

    <span class="token comment">// Context\u5BF9\u8C61\u521D\u59CB\u5316</span>
	c<span class="token punctuation">.</span>writermem<span class="token punctuation">.</span><span class="token function">reset</span><span class="token punctuation">(</span>w<span class="token punctuation">)</span>			
	c<span class="token punctuation">.</span>Request <span class="token operator">=</span> req
	c<span class="token punctuation">.</span><span class="token function">reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// \u5339\u914DURL\u5E76\u8C03\u7528\u6CE8\u518C\u7684Handler\u8FDB\u884C\u5904\u7406</span>
	engine<span class="token punctuation">.</span><span class="token function">handleHTTPRequest</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>

    <span class="token comment">// \u5904\u7406\u5B8C\u6210\u540E\u653E\u56DE\u6C60\u5B50</span>
	engine<span class="token punctuation">.</span>pool<span class="token punctuation">.</span><span class="token function">Put</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// ---------------------------------------------------------------------------------</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>engine <span class="token operator">*</span>Engine<span class="token punctuation">)</span> <span class="token function">handleHTTPRequest</span><span class="token punctuation">(</span>c <span class="token operator">*</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	httpMethod <span class="token operator">:=</span> c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>Method	<span class="token comment">// \u8BF7\u6C42\u65B9\u6CD5</span>
	rPath <span class="token operator">:=</span> c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>URL<span class="token punctuation">.</span>Path		<span class="token comment">// \u8BF7\u6C42Path</span>
	unescape <span class="token operator">:=</span> <span class="token boolean">false</span>
	<span class="token keyword">if</span> engine<span class="token punctuation">.</span>UseRawPath <span class="token operator">&amp;&amp;</span> <span class="token function">len</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>URL<span class="token punctuation">.</span>RawPath<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		rPath <span class="token operator">=</span> c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>URL<span class="token punctuation">.</span>RawPath
		unescape <span class="token operator">=</span> engine<span class="token punctuation">.</span>UnescapePathValues
	<span class="token punctuation">}</span>

	<span class="token keyword">if</span> engine<span class="token punctuation">.</span>RemoveExtraSlash <span class="token punctuation">{</span>
		rPath <span class="token operator">=</span> <span class="token function">cleanPath</span><span class="token punctuation">(</span>rPath<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// Find root of the tree for the given HTTP method</span>
    <span class="token comment">// \u4ECE\u7ED9\u51FA\u7684HTTP\u65B9\u6CD5\u627E\u5230root\u8282\u70B9</span>
    
    <span class="token comment">// \u8DEF\u7531\u6811\uFF0C\u5177\u4F53\u4FE1\u606F\u540E\u9762\u770B</span>
	t <span class="token operator">:=</span> engine<span class="token punctuation">.</span>trees						
    
    <span class="token comment">// \u4F7F\u7528for\u5FAA\u73AF\u904D\u5386,\u8FD9\u91CC\u7684for\u5FAA\u73AF\u4F7F\u7528\u662F\u4E00\u4E2A\u5C0F\u6280\u5DE7</span>
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
<span class="token comment">// for\u5FAA\u73AF\u8BA8\u5DE7\u6280\u5DE7</span>
        
<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u5F88\u591A\u65F6\u5019\u6211\u4EEC\u4F1A\u8FD9\u6837\u904D\u5386</span>
	nodes <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;world&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;!&quot;</span><span class="token punctuation">}</span>
	n <span class="token operator">:=</span> <span class="token function">len</span><span class="token punctuation">(</span>nodes<span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>nodes<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span> <span class="token comment">// \u904D\u5386\u5B8C\u6210\u540En\u8FD8\u53EF\u4EE5\u6B63\u5E38\u4F7F\u7528\uFF0C\u8BF4\u660E\u5BF9\u8C61\u8FD8\u6CA1\u6709\u88AB\u9500\u6BC1\uFF0C\u8FD8\u5728\u5360\u7528\u5185\u5B58</span>

	<span class="token comment">// \u8BA8\u5DE7\u7684\u6280\u80FD</span>
	<span class="token comment">// (1) \u5C11\u5199\u4E86\u4E00\u884C\u83B7\u53D6\u5207\u7247\u957F\u5EA6</span>
	<span class="token keyword">for</span> i<span class="token punctuation">,</span> n <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>nodes<span class="token punctuation">)</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>nodes<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">//fmt.Println(n)	// \uFF082\uFF09n\u5DF2\u7ECF\u4E0D\u80FD\u4F7F\u7528\u4E86\uFF0C\u5185\u5B58\u5DF2\u91CA\u653E</span>
	<span class="token comment">// \u5F53\u5916\u90E8\u4E0D\u9700\u8981\u5207\u7247\u957F\u5EA6\u7684\u65F6\u5019\uFF0C\u53EF\u4EE5\u4F7F\u7528\u8FD9\u4E2A\u6280\u5DE7</span>
<span class="token punctuation">}</span>   
        
<span class="token comment">// ---------------------------------------------------------------------------------</span>
<span class="token keyword">type</span> Engine <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    pool             sync<span class="token punctuation">.</span>Pool
    trees            methodTrees   <span class="token comment">// \u770B\u4E00\u4E0Btress\u662F\u5565</span>
    <span class="token comment">// ...    </span>
<span class="token punctuation">}</span>
        
<span class="token keyword">var</span> <span class="token boolean">_</span> IRouter <span class="token operator">=</span> <span class="token operator">&amp;</span>Engine<span class="token punctuation">{</span><span class="token punctuation">}</span>	       <span class="token comment">// \u8FD9\u91CC\u53C8\u662F\u53E6\u5916\u4E00\u4E2A\u5C0F\u6280\u5DE7\uFF0C\u5B9E\u4F8B\u5316\u4E00\u4E0B\uFF0C\u4F46\u662F\u53C8\u4EC0\u4E48\u90FD\u4E0D\u505A\uFF0C\u76EE\u7684\u5728\u4E8E</span>
        						   <span class="token comment">// \u5728\u7F16\u8BD1\u9636\u6BB5\u5C31\u786E\u4FDDEngine\u5B9E\u73B0\u4E86IRouter\u63A5\u53E3</span>
        						   <span class="token comment">//	type IRouter interface {</span>
								   <span class="token comment">//		IRoutes</span>
								   <span class="token comment">//		Group(string, ...HandlerFunc) *RouterGroup</span>
								   <span class="token comment">//	}</span>
        
<span class="token keyword">type</span> methodTrees <span class="token punctuation">[</span><span class="token punctuation">]</span>methodTree	<span class="token comment">// tress\u662F\u4E00\u4E2A\u5207\u7247 </span>

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
			basePath<span class="token punctuation">:</span> <span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span>
			root<span class="token punctuation">:</span>     <span class="token boolean">true</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		FuncMap<span class="token punctuation">:</span>                template<span class="token punctuation">.</span>FuncMap<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		RedirectTrailingSlash<span class="token punctuation">:</span>  <span class="token boolean">true</span><span class="token punctuation">,</span>
		RedirectFixedPath<span class="token punctuation">:</span>      <span class="token boolean">false</span><span class="token punctuation">,</span>
		HandleMethodNotAllowed<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
		ForwardedByClientIP<span class="token punctuation">:</span>    <span class="token boolean">true</span><span class="token punctuation">,</span>
		RemoteIPHeaders<span class="token punctuation">:</span>        <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;X-Forwarded-For&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;X-Real-IP&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		TrustedPlatform<span class="token punctuation">:</span>        defaultPlatform<span class="token punctuation">,</span>
		UseRawPath<span class="token punctuation">:</span>             <span class="token boolean">false</span><span class="token punctuation">,</span>
		RemoveExtraSlash<span class="token punctuation">:</span>       <span class="token boolean">false</span><span class="token punctuation">,</span>
		UnescapePathValues<span class="token punctuation">:</span>     <span class="token boolean">true</span><span class="token punctuation">,</span>
		MaxMultipartMemory<span class="token punctuation">:</span>     defaultMultipartMemory<span class="token punctuation">,</span>
        <span class="token comment">// \u5BB9\u91CF\u4E3A9\uFF0C\u4EE3\u88689\u4E2AHTTP\u65B9\u6CD5\uFF0C\u5305\u542BGET, POST, PUT, PATCH, HEAD, OPTIONS, DELETE, CONNECT, TRACE</span>
		trees<span class="token punctuation">:</span>                  <span class="token function">make</span><span class="token punctuation">(</span>methodTrees<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">)</span><span class="token punctuation">,</span>	
		delims<span class="token punctuation">:</span>                 render<span class="token punctuation">.</span>Delims<span class="token punctuation">{</span>Left<span class="token punctuation">:</span> <span class="token string">&quot;{{&quot;</span><span class="token punctuation">,</span> Right<span class="token punctuation">:</span> <span class="token string">&quot;}}&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		secureJSONPrefix<span class="token punctuation">:</span>       <span class="token string">&quot;while(1);&quot;</span><span class="token punctuation">,</span>
		trustedProxies<span class="token punctuation">:</span>         <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;0.0.0.0/0&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		trustedCIDRs<span class="token punctuation">:</span>           defaultTrustedCIDRs<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	engine<span class="token punctuation">.</span>RouterGroup<span class="token punctuation">.</span>engine <span class="token operator">=</span> engine
	engine<span class="token punctuation">.</span>pool<span class="token punctuation">.</span>New <span class="token operator">=</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> engine<span class="token punctuation">.</span><span class="token function">allocateContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> engine
<span class="token punctuation">}</span>

<span class="token comment">// ---------------------------------------------------------------------------------</span>
<span class="token comment">// \u6539\u5199\u4E00\u4E0B\u4EE3\u7801\uFF0C\u4E0D\u4F7F\u7528gin.Default()\uFF0C\u4F7F\u7528\u81EA\u5DF1New()\u7684\u5F15\u64CE</span>
<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u76D1\u542C\u5730\u5740</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:80&quot;</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316Gin\u8DEF\u7531\u5F15\u64CE</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	r<span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span>gin<span class="token punctuation">.</span><span class="token function">Logger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> gin<span class="token punctuation">.</span><span class="token function">Recovery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6CE8\u518C\u8DEF\u7531</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> <span class="token string">&quot;Hello Gin!\\n&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// \u542F\u52A8Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span>addr<span class="token punctuation">,</span> r<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre></div><h3 id="\u8DEF\u7531" tabindex="-1"><a class="header-anchor" href="#\u8DEF\u7531" aria-hidden="true">#</a> \u8DEF\u7531</h3><h4 id="\u8DEF\u7531\u539F\u7406-1-\u57FA\u6570\u6811" tabindex="-1"><a class="header-anchor" href="#\u8DEF\u7531\u539F\u7406-1-\u57FA\u6570\u6811" aria-hidden="true">#</a> \u8DEF\u7531\u539F\u7406(1)\uFF1A\u57FA\u6570\u6811</h4>`,11),an=s("gin\u6846\u67B6\u4F7F\u7528\u7684\u662F\u5B9A\u5236\u7248\u672C\u7684"),tn={href:"https://github.com/julienschmidt/httprouter",target:"_blank",rel:"noopener noreferrer"},pn=s("httprouter"),on=s("\uFF0C\u4F7F\u7528\u57FA\u6570\u6811\uFF08Radix Tree\uFF09\u6765\u5B58\u50A8\u548C\u67E5\u627E\u8DEF\u7531"),en=p(`<p>\u57FA\u6570\u6811\uFF08Radix Tree\uFF09\u662F\u4E00\u79CD\u66F4\u8282\u7701\u7A7A\u95F4\u7684\u524D\u7F00\u6811\uFF08Trie Tree\uFF09\u3002</p><p>\u5BF9\u4E8E\u57FA\u6570\u6811\u7684\u6BCF\u4E2A\u8282\u70B9\uFF0C\u5982\u679C\u8BE5\u8282\u70B9\u662F\u552F\u4E00\u7684\u5B50\u6811\u7684\u8BDD\uFF0C\u5C31\u548C\u7236\u8282\u70B9\u5408\u5E76\u3002</p><p>\u4E0B\u56FE\u4E3A\u4E00\u4E2A\u57FA\u6570\u6811\u793A\u4F8B\uFF1A</p><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/radix_tree.png" alt="radix_tree"></p><p>\u5047\u8BBE\u6709\u4EE5\u4E0B\u8DEF\u7531\u6CE8\u518C\u4FE1\u606F</p><div class="language-go ext-go"><pre class="language-go"><code>r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> func1<span class="token punctuation">)</span>
r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/search/&quot;</span><span class="token punctuation">,</span> func2<span class="token punctuation">)</span>
r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/support/&quot;</span><span class="token punctuation">,</span> func3<span class="token punctuation">)</span>
r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/blog/&quot;</span><span class="token punctuation">,</span> func4<span class="token punctuation">)</span>
r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/blog/:post/&quot;</span><span class="token punctuation">,</span> func5<span class="token punctuation">)</span>
r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/about-us/&quot;</span><span class="token punctuation">,</span> func6<span class="token punctuation">)</span>
r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/about-us/team/&quot;</span><span class="token punctuation">,</span> func7<span class="token punctuation">)</span>
r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/contact/&quot;</span><span class="token punctuation">,</span> func8<span class="token punctuation">)</span>
</code></pre></div><p><code>Gin</code>\u4E3A\u6BCF\u79CD\u8BF7\u6C42\u65B9\u6CD5\u7BA1\u7406\u4E00\u68F5\u5355\u72EC\u7684\u6811\uFF0C\u6240\u4EE5\u6211\u4EEC\u4F1A\u5F97\u5230\u4E00\u4E2A<code>GET</code>\u65B9\u6CD5\u5BF9\u5E94\u7684\u8DEF\u7531\u6811\uFF1A</p><div class="language-bash ext-sh"><pre class="language-bash"><code>Priority   Path             Handle
<span class="token number">9</span>          <span class="token punctuation">\\</span>                *<span class="token operator">&lt;</span><span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span>
<span class="token number">3</span>          \u251Cs               nil
<span class="token number">2</span>          <span class="token operator">|</span>\u251Cearch<span class="token punctuation">\\</span>         *<span class="token operator">&lt;</span><span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>
<span class="token number">1</span>          <span class="token operator">|</span>\u2514upport<span class="token punctuation">\\</span>        *<span class="token operator">&lt;</span><span class="token operator"><span class="token file-descriptor important">3</span>&gt;</span>
<span class="token number">2</span>          \u251Cblog<span class="token punctuation">\\</span>           *<span class="token operator">&lt;</span><span class="token operator"><span class="token file-descriptor important">4</span>&gt;</span>
<span class="token number">1</span>          <span class="token operator">|</span>    \u2514:post      nil
<span class="token number">1</span>          <span class="token operator">|</span>         \u2514<span class="token punctuation">\\</span>     *<span class="token operator">&lt;</span><span class="token operator"><span class="token file-descriptor important">5</span>&gt;</span>
<span class="token number">2</span>          \u251Cabout-us<span class="token punctuation">\\</span>       *<span class="token operator">&lt;</span><span class="token operator"><span class="token file-descriptor important">6</span>&gt;</span>
<span class="token number">1</span>          <span class="token operator">|</span>        \u2514team<span class="token punctuation">\\</span>  *<span class="token operator">&lt;</span><span class="token operator"><span class="token file-descriptor important">7</span>&gt;</span>
<span class="token number">1</span>          \u2514contact<span class="token punctuation">\\</span>        *<span class="token operator">&lt;</span><span class="token operator"><span class="token file-descriptor important">8</span>&gt;</span>
</code></pre></div><ul><li>\u57FA\u6570\u6811\u5141\u8BB8\u6211\u4EEC\u4F7F\u7528\u50CF<code>:post</code>\u53C2\u6570\u8FD9\u79CD\u52A8\u6001\u90E8\u5206</li><li>\u6BCF\u4E2A\u8282\u70B9\u90FD\u6709\u4F18\u5148\u7EA7\u5C5E\u6027\uFF0C\u4F5C\u7528\u662F\u53EF\u4EE5\u4F18\u5148\u5339\u914D\u88AB\u5927\u591A\u6570\u8DEF\u7531\u8DEF\u5F84\u5305\u542B\u7684\u8282\u70B9</li></ul><h4 id="\u8DEF\u7531\u539F\u7406-2-\u76F8\u5173\u7ED3\u6784\u4F53" tabindex="-1"><a class="header-anchor" href="#\u8DEF\u7531\u539F\u7406-2-\u76F8\u5173\u7ED3\u6784\u4F53" aria-hidden="true">#</a> \u8DEF\u7531\u539F\u7406(2)\uFF1A\u76F8\u5173\u7ED3\u6784\u4F53</h4><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token comment">// Engine\u7ED3\u6784\u4F53</span>
<span class="token keyword">type</span> Engine <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	RouterGroup
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token comment">// RouterGroup\u7ED3\u6784\u4F53</span>
<span class="token keyword">type</span> RouterGroup <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Handlers HandlersChain
	basePath <span class="token builtin">string</span>
	engine   <span class="token operator">*</span>Engine
	root     <span class="token builtin">bool</span>
<span class="token punctuation">}</span>
<span class="token comment">// Engine\u548CRouterGroup\u7C7B\u4F3C\u4E8E\u76F8\u4E92\u5D4C\u5957\u7684\u7ED3\u6784</span>

<span class="token comment">// --------------------------------------------------------------------</span>
<span class="token comment">// \u8DEF\u7531\u6811\u8282\u70B9</span>
<span class="token keyword">type</span> node <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u8282\u70B9\u8DEF\u5F84,\u6BD4\u5982\u4E0A\u9762\u7684s\uFF0Cearch\uFF0C\u548Cupport</span>
	path      <span class="token builtin">string</span>
    
    <span class="token comment">// \u4FDD\u5B58\u5206\u88C2\u5206\u652F\u7684\u7B2C\u4E00\u4E2A\u5B57\u7B26\uFF0C</span>
    <span class="token comment">// \u6BD4\u5982search\u548Csupport, \u90A3\u4E48s\u8282\u70B9\u7684indices\u5C5E\u6027\u5C31\u4E3A&quot;eu&quot;\uFF0C\u4EE3\u8868\u6709\u4E24\u4E2A\u5206\u652F, \u5206\u652F\u7684\u9996\u5B57\u6BCD\u5206\u522B\u662Fe\u548Cu</span>
	indices   <span class="token builtin">string</span>
    
    <span class="token comment">// \u8282\u70B9\u662F\u5426\u662F\u53C2\u6570\u8282\u70B9\uFF0C\u6BD4\u5982\u4E0A\u9762\u7684:post</span>
	wildChild <span class="token builtin">bool</span>
    
    <span class="token comment">// \u8282\u70B9\u7C7B\u578B</span>
    <span class="token comment">// static: \u9759\u6001\u8282\u70B9\uFF08\u9ED8\u8BA4\uFF09\uFF0C\u6BD4\u5982\u4E0A\u9762\u7684s\uFF0Cearch\u7B49\u8282\u70B9</span>
	<span class="token comment">// root: \u6811\u7684\u6839\u8282\u70B9</span>
	<span class="token comment">// catchAll: \u6709*\u5339\u914D\u7684\u8282\u70B9</span>
	<span class="token comment">// param: \u53C2\u6570\u8282\u70B9</span>
	nType     nodeType
    
    <span class="token comment">// \u4F18\u5148\u7EA7\uFF0C\u5B50\u8282\u70B9\u8D8A\u591A\uFF0C\u4F18\u5148\u7EA7\u8D8A\u9AD8(\u6570\u5B57\u8D8A\u5927)\uFF0C\u8BE5\u8282\u70B9\u8D8A\u4F18\u5148\u5339\u914D</span>
	priority  <span class="token builtin">uint32</span>
    
    <span class="token comment">// \u5B50\u8282\u70B9(\u53EA\u5305\u542B\u513F\u5B50\u8282\u70B9\uFF0C\u4E0D\u5305\u542B\u5B59\u5B50\u8282\u70B9)</span>
	children  <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>node <span class="token comment">// child nodes, at most 1 :param style node at the end of the array</span>
    
    <span class="token comment">// \u5904\u7406\u51FD\u6570\u94FE\u6761\uFF08\u5207\u7247\uFF09</span>
	handlers  HandlersChain
    
    <span class="token comment">// \u5B8C\u6574\u8DEF\u5F84</span>
	fullPath  <span class="token builtin">string</span>
<span class="token punctuation">}</span>
<span class="token comment">// --------------------------------------------------------------------</span>
<span class="token comment">// \u8BF7\u6C42\u65B9\u6CD5\u6811\uFF0C\u6BCF\u4E2A\u65B9\u6CD5\u5BF9\u5E94\u4E00\u68F5\u6811</span>
<span class="token keyword">type</span> methodTree <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	method <span class="token builtin">string</span>
	root   <span class="token operator">*</span>node
<span class="token punctuation">}</span>

<span class="token keyword">type</span> methodTrees <span class="token punctuation">[</span><span class="token punctuation">]</span>methodTree

<span class="token keyword">func</span> <span class="token punctuation">(</span>trees methodTrees<span class="token punctuation">)</span> <span class="token function">get</span><span class="token punctuation">(</span>method <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">*</span>node <span class="token punctuation">{</span>	<span class="token comment">// \u4ECE\u5207\u7247\u4E2D\u83B7\u53D6\u65B9\u6CD5\u6811\u8282\u70B9</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> tree <span class="token operator">:=</span> <span class="token keyword">range</span> trees <span class="token punctuation">{</span>
		<span class="token keyword">if</span> tree<span class="token punctuation">.</span>method <span class="token operator">==</span> method <span class="token punctuation">{</span>
			<span class="token keyword">return</span> tree<span class="token punctuation">.</span>root
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h4 id="\u8DEF\u7531\u539F\u7406-3-\u8DEF\u7531\u6CE8\u518C\u903B\u8F91" tabindex="-1"><a class="header-anchor" href="#\u8DEF\u7531\u539F\u7406-3-\u8DEF\u7531\u6CE8\u518C\u903B\u8F91" aria-hidden="true">#</a> \u8DEF\u7531\u539F\u7406(3)\uFF1A\u8DEF\u7531\u6CE8\u518C\u903B\u8F91</h4><p>\u6211\u4EEC\u67E5\u770B\u4E00\u4E0B<code>r.GET</code>\u6E90\u7801</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token comment">// GET is a shortcut for router.Handle(&quot;GET&quot;, path, handle).</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>group <span class="token operator">*</span>RouterGroup<span class="token punctuation">)</span> <span class="token function">GET</span><span class="token punctuation">(</span>relativePath <span class="token builtin">string</span><span class="token punctuation">,</span> handlers <span class="token operator">...</span>HandlerFunc<span class="token punctuation">)</span> IRoutes <span class="token punctuation">{</span>
	<span class="token keyword">return</span> group<span class="token punctuation">.</span><span class="token function">handle</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>MethodGet<span class="token punctuation">,</span> relativePath<span class="token punctuation">,</span> handlers<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// ---------------------------------------------------------------------------------</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>group <span class="token operator">*</span>RouterGroup<span class="token punctuation">)</span> <span class="token function">handle</span><span class="token punctuation">(</span>httpMethod<span class="token punctuation">,</span> relativePath <span class="token builtin">string</span><span class="token punctuation">,</span> handlers HandlersChain<span class="token punctuation">)</span> IRoutes <span class="token punctuation">{</span>
	absolutePath <span class="token operator">:=</span> group<span class="token punctuation">.</span><span class="token function">calculateAbsolutePath</span><span class="token punctuation">(</span>relativePath<span class="token punctuation">)</span>	<span class="token comment">// \u83B7\u53D6\u7EDD\u5BF9\u8DEF\u5F84\uFF08\u82E5\u6CA1\u6709\u524D\u7F00/\u5219\u81EA\u52A8\u6DFB\u52A0\u524D\u7F00/\uFF09</span>
	handlers <span class="token operator">=</span> group<span class="token punctuation">.</span><span class="token function">combineHandlers</span><span class="token punctuation">(</span>handlers<span class="token punctuation">)</span>					<span class="token comment">// \u7F16\u8BD1handlers</span>
	group<span class="token punctuation">.</span>engine<span class="token punctuation">.</span><span class="token function">addRoute</span><span class="token punctuation">(</span>httpMethod<span class="token punctuation">,</span> absolutePath<span class="token punctuation">,</span> handlers<span class="token punctuation">)</span>	<span class="token comment">// \u6CE8\u518C\u8DEF\u7531</span>
	<span class="token keyword">return</span> group<span class="token punctuation">.</span><span class="token function">returnObj</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// ---------------------------------------------------------------------------------</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>engine <span class="token operator">*</span>Engine<span class="token punctuation">)</span> <span class="token function">addRoute</span><span class="token punctuation">(</span>method<span class="token punctuation">,</span> path <span class="token builtin">string</span><span class="token punctuation">,</span> handlers HandlersChain<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">assert1</span><span class="token punctuation">(</span>path<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token char">&#39;/&#39;</span><span class="token punctuation">,</span> <span class="token string">&quot;path must begin with &#39;/&#39;&quot;</span><span class="token punctuation">)</span>
	<span class="token function">assert1</span><span class="token punctuation">(</span>method <span class="token operator">!=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;HTTP method can not be empty&quot;</span><span class="token punctuation">)</span>
	<span class="token function">assert1</span><span class="token punctuation">(</span><span class="token function">len</span><span class="token punctuation">(</span>handlers<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">&quot;there must be at least one handler&quot;</span><span class="token punctuation">)</span>

	<span class="token function">debugPrintRoute</span><span class="token punctuation">(</span>method<span class="token punctuation">,</span> path<span class="token punctuation">,</span> handlers<span class="token punctuation">)</span>

    <span class="token comment">// \u83B7\u53D6\u65B9\u6CD5\u5BF9\u5E94\u7684\u6839\u8282\u70B9\uFF0Ctrees\u662F\u4E00\u4E2A\u5207\u7247\uFF0Cget\u662F\u81EA\u5B9A\u4E49\u65B9\u6CD5\uFF0C\u5185\u90E8\u662F\u4E00\u4E2A\u5FAA\u73AF\u904D\u5386</span>
	root <span class="token operator">:=</span> engine<span class="token punctuation">.</span>trees<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>method<span class="token punctuation">)</span>	
	<span class="token keyword">if</span> root <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		root <span class="token operator">=</span> <span class="token function">new</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span>
		root<span class="token punctuation">.</span>fullPath <span class="token operator">=</span> <span class="token string">&quot;/&quot;</span>
		engine<span class="token punctuation">.</span>trees <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>engine<span class="token punctuation">.</span>trees<span class="token punctuation">,</span> methodTree<span class="token punctuation">{</span>method<span class="token punctuation">:</span> method<span class="token punctuation">,</span> root<span class="token punctuation">:</span> root<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
    <span class="token comment">// \u6839\u8282\u70B9\u6CE8\u518C\u8DEF\u7531</span>
	root<span class="token punctuation">.</span><span class="token function">addRoute</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> handlers<span class="token punctuation">)</span>

	<span class="token comment">// Update maxParams</span>
	<span class="token keyword">if</span> paramsCount <span class="token operator">:=</span> <span class="token function">countParams</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span> paramsCount <span class="token operator">&gt;</span> engine<span class="token punctuation">.</span>maxParams <span class="token punctuation">{</span>
		engine<span class="token punctuation">.</span>maxParams <span class="token operator">=</span> paramsCount
	<span class="token punctuation">}</span>

	<span class="token keyword">if</span> sectionsCount <span class="token operator">:=</span> <span class="token function">countSections</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span> sectionsCount <span class="token operator">&gt;</span> engine<span class="token punctuation">.</span>maxSections <span class="token punctuation">{</span>
		engine<span class="token punctuation">.</span>maxSections <span class="token operator">=</span> sectionsCount
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u6CE8\u518C\u903B\u8F91</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token comment">// addRoute \u5C06\u5177\u6709\u7ED9\u5B9A\u53E5\u67C4\u7684\u8282\u70B9\u6DFB\u52A0\u5230\u8DEF\u5F84\u4E2D\u3002</span>
<span class="token comment">// \u4E0D\u662F\u5E76\u53D1\u5B89\u5168\u7684</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>n <span class="token operator">*</span>node<span class="token punctuation">)</span> <span class="token function">addRoute</span><span class="token punctuation">(</span>path <span class="token builtin">string</span><span class="token punctuation">,</span> handlers HandlersChain<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fullPath <span class="token operator">:=</span> path
	n<span class="token punctuation">.</span>priority<span class="token operator">++</span>
	numParams <span class="token operator">:=</span> <span class="token function">countParams</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span>  <span class="token comment">// \u6570\u4E00\u4E0B\u53C2\u6570\u4E2A\u6570</span>

	<span class="token comment">// \u7A7A\u6811\u5C31\u76F4\u63A5\u63D2\u5165\u5F53\u524D\u8282\u70B9</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>path<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>children<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		n<span class="token punctuation">.</span><span class="token function">insertChild</span><span class="token punctuation">(</span>numParams<span class="token punctuation">,</span> path<span class="token punctuation">,</span> fullPath<span class="token punctuation">,</span> handlers<span class="token punctuation">)</span>
		n<span class="token punctuation">.</span>nType <span class="token operator">=</span> root
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	parentFullPathIndex <span class="token operator">:=</span> <span class="token number">0</span>

walk<span class="token punctuation">:</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		<span class="token comment">// \u66F4\u65B0\u5F53\u524D\u8282\u70B9\u7684\u6700\u5927\u53C2\u6570\u4E2A\u6570</span>
		<span class="token keyword">if</span> numParams <span class="token operator">&gt;</span> n<span class="token punctuation">.</span>maxParams <span class="token punctuation">{</span>
			n<span class="token punctuation">.</span>maxParams <span class="token operator">=</span> numParams
		<span class="token punctuation">}</span>

		<span class="token comment">// \u627E\u5230\u6700\u957F\u7684\u901A\u7528\u524D\u7F00</span>
		<span class="token comment">// \u8FD9\u4E5F\u610F\u5473\u7740\u516C\u5171\u524D\u7F00\u4E0D\u5305\u542B\u201C:\u201D&quot;\u6216\u201C*\u201D /</span>
		<span class="token comment">// \u56E0\u4E3A\u73B0\u6709\u952E\u4E0D\u80FD\u5305\u542B\u8FD9\u4E9B\u5B57\u7B26\u3002</span>
		i <span class="token operator">:=</span> <span class="token function">longestCommonPrefix</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> n<span class="token punctuation">.</span>path<span class="token punctuation">)</span>

		<span class="token comment">// \u5206\u88C2\u8FB9\u7F18\uFF08\u6B64\u5904\u5206\u88C2\u7684\u662F\u5F53\u524D\u6811\u8282\u70B9\uFF09</span>
		<span class="token comment">// \u4F8B\u5982\u4E00\u5F00\u59CBpath\u662Fsearch\uFF0C\u65B0\u52A0\u5165support\uFF0Cs\u662F\u4ED6\u4EEC\u901A\u7528\u7684\u6700\u957F\u524D\u7F00\u90E8\u5206</span>
		<span class="token comment">// \u90A3\u4E48\u4F1A\u5C06s\u62FF\u51FA\u6765\u4F5C\u4E3Aparent\u8282\u70B9\uFF0C\u589E\u52A0earch\u548Cupport\u4F5C\u4E3Achild\u8282\u70B9</span>
		<span class="token keyword">if</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>path<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			child <span class="token operator">:=</span> node<span class="token punctuation">{</span>
				path<span class="token punctuation">:</span>      n<span class="token punctuation">.</span>path<span class="token punctuation">[</span>i<span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">,</span>  <span class="token comment">// \u516C\u5171\u524D\u7F00\u540E\u7684\u90E8\u5206\u4F5C\u4E3A\u5B50\u8282\u70B9</span>
				wildChild<span class="token punctuation">:</span> n<span class="token punctuation">.</span>wildChild<span class="token punctuation">,</span>
				indices<span class="token punctuation">:</span>   n<span class="token punctuation">.</span>indices<span class="token punctuation">,</span>
				children<span class="token punctuation">:</span>  n<span class="token punctuation">.</span>children<span class="token punctuation">,</span>
				handlers<span class="token punctuation">:</span>  n<span class="token punctuation">.</span>handlers<span class="token punctuation">,</span>
				priority<span class="token punctuation">:</span>  n<span class="token punctuation">.</span>priority <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token comment">//\u5B50\u8282\u70B9\u4F18\u5148\u7EA7-1</span>
				fullPath<span class="token punctuation">:</span>  n<span class="token punctuation">.</span>fullPath<span class="token punctuation">,</span>
			<span class="token punctuation">}</span>

			<span class="token comment">// Update maxParams (max of all children)</span>
			<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> child<span class="token punctuation">.</span>children <span class="token punctuation">{</span>
				<span class="token keyword">if</span> v<span class="token punctuation">.</span>maxParams <span class="token operator">&gt;</span> child<span class="token punctuation">.</span>maxParams <span class="token punctuation">{</span>
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

		<span class="token comment">// \u5C06\u65B0\u6765\u7684\u8282\u70B9\u63D2\u5165\u65B0\u7684parent\u8282\u70B9\u4F5C\u4E3A\u5B50\u8282\u70B9</span>
		<span class="token keyword">if</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			path <span class="token operator">=</span> path<span class="token punctuation">[</span>i<span class="token punctuation">:</span><span class="token punctuation">]</span>

			<span class="token keyword">if</span> n<span class="token punctuation">.</span>wildChild <span class="token punctuation">{</span>  <span class="token comment">// \u5982\u679C\u662F\u53C2\u6570\u8282\u70B9</span>
				parentFullPathIndex <span class="token operator">+=</span> <span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>path<span class="token punctuation">)</span>
				n <span class="token operator">=</span> n<span class="token punctuation">.</span>children<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
				n<span class="token punctuation">.</span>priority<span class="token operator">++</span>

				<span class="token comment">// Update maxParams of the child node</span>
				<span class="token keyword">if</span> numParams <span class="token operator">&gt;</span> n<span class="token punctuation">.</span>maxParams <span class="token punctuation">{</span>
					n<span class="token punctuation">.</span>maxParams <span class="token operator">=</span> numParams
				<span class="token punctuation">}</span>
				numParams<span class="token operator">--</span>

				<span class="token comment">// \u68C0\u67E5\u901A\u914D\u7B26\u662F\u5426\u5339\u914D</span>
				<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span> <span class="token operator">&gt;=</span> <span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>path<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> n<span class="token punctuation">.</span>path <span class="token operator">==</span> path<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>path<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
					<span class="token comment">// \u68C0\u67E5\u66F4\u957F\u7684\u901A\u914D\u7B26, \u4F8B\u5982 :name and :names</span>
					<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>path<span class="token punctuation">)</span> <span class="token operator">&gt;=</span> <span class="token function">len</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span> <span class="token operator">||</span> path<span class="token punctuation">[</span><span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>path<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token char">&#39;/&#39;</span> <span class="token punctuation">{</span>
						<span class="token keyword">continue</span> walk
					<span class="token punctuation">}</span>
				<span class="token punctuation">}</span>

				pathSeg <span class="token operator">:=</span> path
				<span class="token keyword">if</span> n<span class="token punctuation">.</span>nType <span class="token operator">!=</span> catchAll <span class="token punctuation">{</span>
					pathSeg <span class="token operator">=</span> strings<span class="token punctuation">.</span><span class="token function">SplitN</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> <span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
				<span class="token punctuation">}</span>
				prefix <span class="token operator">:=</span> fullPath<span class="token punctuation">[</span><span class="token punctuation">:</span>strings<span class="token punctuation">.</span><span class="token function">Index</span><span class="token punctuation">(</span>fullPath<span class="token punctuation">,</span> pathSeg<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">+</span> n<span class="token punctuation">.</span>path
				<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;&#39;&quot;</span> <span class="token operator">+</span> pathSeg <span class="token operator">+</span>
					<span class="token string">&quot;&#39; in new path &#39;&quot;</span> <span class="token operator">+</span> fullPath <span class="token operator">+</span>
					<span class="token string">&quot;&#39; conflicts with existing wildcard &#39;&quot;</span> <span class="token operator">+</span> n<span class="token punctuation">.</span>path <span class="token operator">+</span>
					<span class="token string">&quot;&#39; in existing prefix &#39;&quot;</span> <span class="token operator">+</span> prefix <span class="token operator">+</span>
					<span class="token string">&quot;&#39;&quot;</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			<span class="token comment">// \u53D6path\u9996\u5B57\u6BCD\uFF0C\u7528\u6765\u4E0Eindices\u505A\u6BD4\u8F83</span>
			c <span class="token operator">:=</span> path<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>

			<span class="token comment">// \u5904\u7406\u53C2\u6570\u540E\u52A0\u659C\u7EBF\u60C5\u51B5</span>
			<span class="token keyword">if</span> n<span class="token punctuation">.</span>nType <span class="token operator">==</span> param <span class="token operator">&amp;&amp;</span> c <span class="token operator">==</span> <span class="token char">&#39;/&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>children<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span> <span class="token punctuation">{</span>
				parentFullPathIndex <span class="token operator">+=</span> <span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>path<span class="token punctuation">)</span>
				n <span class="token operator">=</span> n<span class="token punctuation">.</span>children<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
				n<span class="token punctuation">.</span>priority<span class="token operator">++</span>
				<span class="token keyword">continue</span> walk
			<span class="token punctuation">}</span>

			<span class="token comment">// \u68C0\u67E5\u8DEFpath\u4E0B\u4E00\u4E2A\u5B57\u8282\u7684\u5B50\u8282\u70B9\u662F\u5426\u5B58\u5728</span>
			<span class="token comment">// \u6BD4\u5982s\u7684\u5B50\u8282\u70B9\u73B0\u5728\u662Fearch\u548Cupport\uFF0Cindices\u4E3Aeu</span>
			<span class="token comment">// \u5982\u679C\u65B0\u52A0\u4E00\u4E2A\u8DEF\u7531\u4E3Asuper\uFF0C\u90A3\u4E48\u5C31\u662F\u548Cupport\u6709\u5339\u914D\u7684\u90E8\u5206u\uFF0C\u5C06\u7EE7\u7EED\u5206\u5217\u73B0\u5728\u7684upport\u8282\u70B9</span>
			<span class="token keyword">for</span> i<span class="token punctuation">,</span> max <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>indices<span class="token punctuation">)</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> max<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
				<span class="token keyword">if</span> c <span class="token operator">==</span> n<span class="token punctuation">.</span>indices<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token punctuation">{</span>
					parentFullPathIndex <span class="token operator">+=</span> <span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>path<span class="token punctuation">)</span>
					i <span class="token operator">=</span> n<span class="token punctuation">.</span><span class="token function">incrementChildPrio</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
					n <span class="token operator">=</span> n<span class="token punctuation">.</span>children<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
					<span class="token keyword">continue</span> walk
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>

			<span class="token comment">// \u5426\u5219\u5C31\u63D2\u5165</span>
			<span class="token keyword">if</span> c <span class="token operator">!=</span> <span class="token char">&#39;:&#39;</span> <span class="token operator">&amp;&amp;</span> c <span class="token operator">!=</span> <span class="token char">&#39;*&#39;</span> <span class="token punctuation">{</span>
				<span class="token comment">// []byte for proper unicode char conversion, see #65</span>
				<span class="token comment">// \u6CE8\u610F\u8FD9\u91CC\u662F\u76F4\u63A5\u62FC\u63A5\u7B2C\u4E00\u4E2A\u5B57\u7B26\u5230n.indices</span>
				n<span class="token punctuation">.</span>indices <span class="token operator">+=</span> <span class="token function">string</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">{</span>c<span class="token punctuation">}</span><span class="token punctuation">)</span>
				child <span class="token operator">:=</span> <span class="token operator">&amp;</span>node<span class="token punctuation">{</span>
					maxParams<span class="token punctuation">:</span> numParams<span class="token punctuation">,</span>
					fullPath<span class="token punctuation">:</span>  fullPath<span class="token punctuation">,</span>
				<span class="token punctuation">}</span>
				<span class="token comment">// \u8FFD\u52A0\u5B50\u8282\u70B9</span>
				n<span class="token punctuation">.</span>children <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>children<span class="token punctuation">,</span> child<span class="token punctuation">)</span>
				n<span class="token punctuation">.</span><span class="token function">incrementChildPrio</span><span class="token punctuation">(</span><span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>indices<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span>
				n <span class="token operator">=</span> child
			<span class="token punctuation">}</span>
			n<span class="token punctuation">.</span><span class="token function">insertChild</span><span class="token punctuation">(</span>numParams<span class="token punctuation">,</span> path<span class="token punctuation">,</span> fullPath<span class="token punctuation">,</span> handlers<span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// \u5DF2\u7ECF\u6CE8\u518C\u8FC7\u7684\u8282\u70B9</span>
		<span class="token keyword">if</span> n<span class="token punctuation">.</span>handlers <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;handlers are already registered for path &#39;&quot;</span> <span class="token operator">+</span> fullPath <span class="token operator">+</span> <span class="token string">&quot;&#39;&quot;</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		n<span class="token punctuation">.</span>handlers <span class="token operator">=</span> handlers
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u7FFB\u8BD1\u6210\u52A8\u753B\u5927\u6982\u662F\u8FD9\u6837\u7684\u6D41\u7A0B\uFF1A</p><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/addroute.gif" alt="addroute"></p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token comment">// tree.go</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>n <span class="token operator">*</span>node<span class="token punctuation">)</span> <span class="token function">insertChild</span><span class="token punctuation">(</span>numParams <span class="token builtin">uint8</span><span class="token punctuation">,</span> path <span class="token builtin">string</span><span class="token punctuation">,</span> fullPath <span class="token builtin">string</span><span class="token punctuation">,</span> handlers HandlersChain<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// \u627E\u5230\u6240\u6709\u7684\u53C2\u6570</span>
	<span class="token keyword">for</span> numParams <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		<span class="token comment">// \u67E5\u627E\u524D\u7F00\u76F4\u5230\u7B2C\u4E00\u4E2A\u901A\u914D\u7B26</span>
		wildcard<span class="token punctuation">,</span> i<span class="token punctuation">,</span> valid <span class="token operator">:=</span> <span class="token function">findWildcard</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span>
		<span class="token keyword">if</span> i <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token punctuation">{</span> <span class="token comment">// \u6CA1\u6709\u53D1\u73B0\u901A\u914D\u7B26</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// \u901A\u914D\u7B26\u7684\u540D\u79F0\u5FC5\u987B\u5305\u542B&#39;:&#39; \u548C &#39;*&#39;</span>
		<span class="token keyword">if</span> <span class="token operator">!</span>valid <span class="token punctuation">{</span>
			<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;only one wildcard per path segment is allowed, has: &#39;&quot;</span> <span class="token operator">+</span>
				wildcard <span class="token operator">+</span> <span class="token string">&quot;&#39; in path &#39;&quot;</span> <span class="token operator">+</span> fullPath <span class="token operator">+</span> <span class="token string">&quot;&#39;&quot;</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// \u68C0\u67E5\u901A\u914D\u7B26\u662F\u5426\u6709\u540D\u79F0</span>
		<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>wildcard<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">2</span> <span class="token punctuation">{</span>
			<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;wildcards must be named with a non-empty name in path &#39;&quot;</span> <span class="token operator">+</span> fullPath <span class="token operator">+</span> <span class="token string">&quot;&#39;&quot;</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// \u68C0\u67E5\u8FD9\u4E2A\u8282\u70B9\u662F\u5426\u6709\u5DF2\u7ECF\u5B58\u5728\u7684\u5B50\u8282\u70B9</span>
		<span class="token comment">// \u5982\u679C\u6211\u4EEC\u5728\u8FD9\u91CC\u63D2\u5165\u901A\u914D\u7B26\uFF0C\u8FD9\u4E9B\u5B50\u8282\u70B9\u5C06\u65E0\u6CD5\u8BBF\u95EE</span>
		<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>children<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token punctuation">{</span>
			<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;wildcard segment &#39;&quot;</span> <span class="token operator">+</span> wildcard <span class="token operator">+</span>
				<span class="token string">&quot;&#39; conflicts with existing children in path &#39;&quot;</span> <span class="token operator">+</span> fullPath <span class="token operator">+</span> <span class="token string">&quot;&#39;&quot;</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		<span class="token keyword">if</span> wildcard<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token char">&#39;:&#39;</span> <span class="token punctuation">{</span> <span class="token comment">// param</span>
			<span class="token keyword">if</span> i <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token punctuation">{</span>
				<span class="token comment">// \u5728\u5F53\u524D\u901A\u914D\u7B26\u4E4B\u524D\u63D2\u5165\u524D\u7F00</span>
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

			<span class="token comment">// \u5982\u679C\u8DEF\u5F84\u6CA1\u6709\u4EE5\u901A\u914D\u7B26\u7ED3\u675F</span>
			<span class="token comment">// \u90A3\u4E48\u5C06\u6709\u53E6\u4E00\u4E2A\u4EE5&#39;/&#39;\u5F00\u59CB\u7684\u975E\u901A\u914D\u7B26\u5B50\u8DEF\u5F84\u3002</span>
			<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>wildcard<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span> <span class="token punctuation">{</span>
				path <span class="token operator">=</span> path<span class="token punctuation">[</span><span class="token function">len</span><span class="token punctuation">(</span>wildcard<span class="token punctuation">)</span><span class="token punctuation">:</span><span class="token punctuation">]</span>

				child <span class="token operator">:=</span> <span class="token operator">&amp;</span>node<span class="token punctuation">{</span>
					maxParams<span class="token punctuation">:</span> numParams<span class="token punctuation">,</span>
					priority<span class="token punctuation">:</span>  <span class="token number">1</span><span class="token punctuation">,</span>
					fullPath<span class="token punctuation">:</span>  fullPath<span class="token punctuation">,</span>
				<span class="token punctuation">}</span>
				n<span class="token punctuation">.</span>children <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>node<span class="token punctuation">{</span>child<span class="token punctuation">}</span>
				n <span class="token operator">=</span> child  <span class="token comment">// \u7EE7\u7EED\u4E0B\u4E00\u8F6E\u5FAA\u73AF</span>
				<span class="token keyword">continue</span>
			<span class="token punctuation">}</span>

			<span class="token comment">// \u5426\u5219\u6211\u4EEC\u5C31\u5B8C\u6210\u4E86\u3002\u5C06\u5904\u7406\u51FD\u6570\u63D2\u5165\u65B0\u53F6\u5B50\u4E2D</span>
			n<span class="token punctuation">.</span>handlers <span class="token operator">=</span> handlers
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// catchAll</span>
		<span class="token keyword">if</span> i<span class="token operator">+</span><span class="token function">len</span><span class="token punctuation">(</span>wildcard<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token function">len</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span> <span class="token operator">||</span> numParams <span class="token operator">&gt;</span> <span class="token number">1</span> <span class="token punctuation">{</span>
			<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;catch-all routes are only allowed at the end of the path in path &#39;&quot;</span> <span class="token operator">+</span> fullPath <span class="token operator">+</span> <span class="token string">&quot;&#39;&quot;</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>path<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> n<span class="token punctuation">.</span>path<span class="token punctuation">[</span><span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>path<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token char">&#39;/&#39;</span> <span class="token punctuation">{</span>
			<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;catch-all conflicts with existing handle for the path segment root in path &#39;&quot;</span> <span class="token operator">+</span> fullPath <span class="token operator">+</span> <span class="token string">&quot;&#39;&quot;</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// currently fixed width 1 for &#39;/&#39;</span>
		i<span class="token operator">--</span>
		<span class="token keyword">if</span> path<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token char">&#39;/&#39;</span> <span class="token punctuation">{</span>
			<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;no / before catch-all in path &#39;&quot;</span> <span class="token operator">+</span> fullPath <span class="token operator">+</span> <span class="token string">&quot;&#39;&quot;</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		n<span class="token punctuation">.</span>path <span class="token operator">=</span> path<span class="token punctuation">[</span><span class="token punctuation">:</span>i<span class="token punctuation">]</span>
		
		<span class="token comment">// \u7B2C\u4E00\u4E2A\u8282\u70B9:\u8DEF\u5F84\u4E3A\u7A7A\u7684catchAll\u8282\u70B9</span>
		child <span class="token operator">:=</span> <span class="token operator">&amp;</span>node<span class="token punctuation">{</span>
			wildChild<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
			nType<span class="token punctuation">:</span>     catchAll<span class="token punctuation">,</span>
			maxParams<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
			fullPath<span class="token punctuation">:</span>  fullPath<span class="token punctuation">,</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// \u66F4\u65B0\u7236\u8282\u70B9\u7684maxParams</span>
		<span class="token keyword">if</span> n<span class="token punctuation">.</span>maxParams <span class="token operator">&lt;</span> <span class="token number">1</span> <span class="token punctuation">{</span>
			n<span class="token punctuation">.</span>maxParams <span class="token operator">=</span> <span class="token number">1</span>
		<span class="token punctuation">}</span>
		n<span class="token punctuation">.</span>children <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>node<span class="token punctuation">{</span>child<span class="token punctuation">}</span>
		n<span class="token punctuation">.</span>indices <span class="token operator">=</span> <span class="token function">string</span><span class="token punctuation">(</span><span class="token char">&#39;/&#39;</span><span class="token punctuation">)</span>
		n <span class="token operator">=</span> child
		n<span class="token punctuation">.</span>priority<span class="token operator">++</span>

		<span class="token comment">// \u7B2C\u4E8C\u4E2A\u8282\u70B9:\u4FDD\u5B58\u53D8\u91CF\u7684\u8282\u70B9</span>
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

	<span class="token comment">// \u5982\u679C\u6CA1\u6709\u627E\u5230\u901A\u914D\u7B26\uFF0C\u53EA\u9700\u63D2\u5165\u8DEF\u5F84\u548C\u53E5\u67C4</span>
	n<span class="token punctuation">.</span>path <span class="token operator">=</span> path
	n<span class="token punctuation">.</span>handlers <span class="token operator">=</span> handlers
	n<span class="token punctuation">.</span>fullPath <span class="token operator">=</span> fullPath
<span class="token punctuation">}</span>
</code></pre></div></details><h4 id="\u8DEF\u7531\u539F\u7406-4-\u8DEF\u7531\u5339\u914D\u903B\u8F91" tabindex="-1"><a class="header-anchor" href="#\u8DEF\u7531\u539F\u7406-4-\u8DEF\u7531\u5339\u914D\u903B\u8F91" aria-hidden="true">#</a> \u8DEF\u7531\u539F\u7406(4)\uFF1A\u8DEF\u7531\u5339\u914D\u903B\u8F91</h4><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code>Engine <span class="token operator">-</span><span class="token operator">&gt;</span> ServeHTTP\u65B9\u6CD5 <span class="token operator">-</span><span class="token operator">&gt;</span> engine<span class="token punctuation">.</span><span class="token function">handleHTTPRequest</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> 
<span class="token comment">// ---------------------------------------------------------------------</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>engine <span class="token operator">*</span>Engine<span class="token punctuation">)</span> <span class="token function">handleHTTPRequest</span><span class="token punctuation">(</span>c <span class="token operator">*</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	httpMethod <span class="token operator">:=</span> c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>Method	<span class="token comment">// \u8BF7\u6C42\u65B9\u6CD5</span>
	rPath <span class="token operator">:=</span> c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>URL<span class="token punctuation">.</span>Path		<span class="token comment">// \u8BF7\u6C42Path</span>
	unescape <span class="token operator">:=</span> <span class="token boolean">false</span>
	<span class="token keyword">if</span> engine<span class="token punctuation">.</span>UseRawPath <span class="token operator">&amp;&amp;</span> <span class="token function">len</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>URL<span class="token punctuation">.</span>RawPath<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token punctuation">{</span>
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
		root <span class="token operator">:=</span> t<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>root		<span class="token comment">// \u627E\u5230\u8BF7\u6C42\u65B9\u6CD5\u5BF9\u5E94\u7684\u57FA\u6570\u6811</span>
		<span class="token comment">// Find route in tree</span>
		value <span class="token operator">:=</span> root<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span>rPath<span class="token punctuation">,</span> c<span class="token punctuation">.</span>params<span class="token punctuation">,</span> c<span class="token punctuation">.</span>skippedNodes<span class="token punctuation">,</span> unescape<span class="token punctuation">)</span>	<span class="token comment">// \u6839\u636Epath\u83B7\u53D6\u5230\u8DEF\u7531\u8282\u70B9node</span>
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
			<span class="token comment">// \u6211\u4EEC\u5E94\u8BE5\u5DF2\u7ECF\u5230\u8FBE\u5305\u542B\u5904\u7406\u51FD\u6570\u7684\u8282\u70B9\u3002</span>
			<span class="token comment">// \u68C0\u67E5\u8BE5\u8282\u70B9\u662F\u5426\u6CE8\u518C\u6709\u5904\u7406\u51FD\u6570</span>
			<span class="token keyword">if</span> value<span class="token punctuation">.</span>handlers <span class="token operator">=</span> n<span class="token punctuation">.</span>handlers<span class="token punctuation">;</span> value<span class="token punctuation">.</span>handlers <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				value<span class="token punctuation">.</span>fullPath <span class="token operator">=</span> n<span class="token punctuation">.</span>fullPath
				<span class="token keyword">return</span>
			<span class="token punctuation">}</span>

			<span class="token keyword">if</span> path <span class="token operator">==</span> <span class="token string">&quot;/&quot;</span> <span class="token operator">&amp;&amp;</span> n<span class="token punctuation">.</span>wildChild <span class="token operator">&amp;&amp;</span> n<span class="token punctuation">.</span>nType <span class="token operator">!=</span> root <span class="token punctuation">{</span>
				value<span class="token punctuation">.</span>tsr <span class="token operator">=</span> <span class="token boolean">true</span>
				<span class="token keyword">return</span>
			<span class="token punctuation">}</span>

			<span class="token comment">// \u6CA1\u6709\u627E\u5230\u5904\u7406\u51FD\u6570 \u68C0\u67E5\u8FD9\u4E2A\u8DEF\u5F84\u672B\u5C3E+/ \u662F\u5426\u5B58\u5728\u6CE8\u518C\u51FD\u6570</span>
			indices <span class="token operator">:=</span> n<span class="token punctuation">.</span>indices
			<span class="token keyword">for</span> i<span class="token punctuation">,</span> max <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>indices<span class="token punctuation">)</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> max<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
				<span class="token keyword">if</span> indices<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token char">&#39;/&#39;</span> <span class="token punctuation">{</span>
					n <span class="token operator">=</span> n<span class="token punctuation">.</span>children<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
					value<span class="token punctuation">.</span>tsr <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>path<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span> <span class="token operator">&amp;&amp;</span> n<span class="token punctuation">.</span>handlers <span class="token operator">!=</span> <span class="token boolean">nil</span><span class="token punctuation">)</span> <span class="token operator">||</span>
						<span class="token punctuation">(</span>n<span class="token punctuation">.</span>nType <span class="token operator">==</span> catchAll <span class="token operator">&amp;&amp;</span> n<span class="token punctuation">.</span>children<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>handlers <span class="token operator">!=</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
					<span class="token keyword">return</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>

			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>

		<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token function">len</span><span class="token punctuation">(</span>prefix<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> path<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token function">len</span><span class="token punctuation">(</span>prefix<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">==</span> prefix <span class="token punctuation">{</span>
			path <span class="token operator">=</span> path<span class="token punctuation">[</span><span class="token function">len</span><span class="token punctuation">(</span>prefix<span class="token punctuation">)</span><span class="token punctuation">:</span><span class="token punctuation">]</span>
			<span class="token comment">// \u5982\u679C\u8BE5\u8282\u70B9\u6CA1\u6709\u901A\u914D\u7B26(param\u6216catchAll)\u5B50\u8282\u70B9</span>
			<span class="token comment">// \u6211\u4EEC\u53EF\u4EE5\u7EE7\u7EED\u67E5\u627E\u4E0B\u4E00\u4E2A\u5B50\u8282\u70B9</span>
			<span class="token keyword">if</span> <span class="token operator">!</span>n<span class="token punctuation">.</span>wildChild <span class="token punctuation">{</span>
				c <span class="token operator">:=</span> path<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
				indices <span class="token operator">:=</span> n<span class="token punctuation">.</span>indices
				<span class="token keyword">for</span> i<span class="token punctuation">,</span> max <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>indices<span class="token punctuation">)</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> max<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
					<span class="token keyword">if</span> c <span class="token operator">==</span> indices<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token punctuation">{</span>
						n <span class="token operator">=</span> n<span class="token punctuation">.</span>children<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token comment">// \u904D\u5386\u6811</span>
						<span class="token keyword">continue</span> walk
					<span class="token punctuation">}</span>
				<span class="token punctuation">}</span>

				<span class="token comment">// \u6CA1\u627E\u5230</span>
				<span class="token comment">// \u5982\u679C\u5B58\u5728\u4E00\u4E2A\u76F8\u540C\u7684URL\u4F46\u6CA1\u6709\u672B\u5C3E/\u7684\u53F6\u5B50\u8282\u70B9</span>
				<span class="token comment">// \u6211\u4EEC\u53EF\u4EE5\u5EFA\u8BAE\u91CD\u5B9A\u5411\u5230\u90A3\u91CC</span>
				value<span class="token punctuation">.</span>tsr <span class="token operator">=</span> path <span class="token operator">==</span> <span class="token string">&quot;/&quot;</span> <span class="token operator">&amp;&amp;</span> n<span class="token punctuation">.</span>handlers <span class="token operator">!=</span> <span class="token boolean">nil</span>
				<span class="token keyword">return</span>
			<span class="token punctuation">}</span>

			<span class="token comment">// \u6839\u636E\u8282\u70B9\u7C7B\u578B\u5904\u7406\u901A\u914D\u7B26\u5B50\u8282\u70B9</span>
			n <span class="token operator">=</span> n<span class="token punctuation">.</span>children<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
			<span class="token keyword">switch</span> n<span class="token punctuation">.</span>nType <span class="token punctuation">{</span>
			<span class="token keyword">case</span> param<span class="token punctuation">:</span>
				<span class="token comment">// find param end (either &#39;/&#39; or path end)</span>
				end <span class="token operator">:=</span> <span class="token number">0</span>
				<span class="token keyword">for</span> end <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> path<span class="token punctuation">[</span>end<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token char">&#39;/&#39;</span> <span class="token punctuation">{</span>
					end<span class="token operator">++</span>
				<span class="token punctuation">}</span>

				<span class="token comment">// \u4FDD\u5B58\u901A\u914D\u7B26\u7684\u503C</span>
				<span class="token keyword">if</span> <span class="token function">cap</span><span class="token punctuation">(</span>value<span class="token punctuation">.</span>params<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token function">int</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>maxParams<span class="token punctuation">)</span> <span class="token punctuation">{</span>
					value<span class="token punctuation">.</span>params <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span>Params<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> n<span class="token punctuation">.</span>maxParams<span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
				i <span class="token operator">:=</span> <span class="token function">len</span><span class="token punctuation">(</span>value<span class="token punctuation">.</span>params<span class="token punctuation">)</span>
				value<span class="token punctuation">.</span>params <span class="token operator">=</span> value<span class="token punctuation">.</span>params<span class="token punctuation">[</span><span class="token punctuation">:</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token comment">// \u5728\u9884\u5148\u5206\u914D\u7684\u5BB9\u91CF\u5185\u6269\u5C55slice</span>
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

				<span class="token comment">// \u7EE7\u7EED\u5411\u4E0B\u67E5\u8BE2</span>
				<span class="token keyword">if</span> end <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span> <span class="token punctuation">{</span>
					<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>children<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token punctuation">{</span>
						path <span class="token operator">=</span> path<span class="token punctuation">[</span>end<span class="token punctuation">:</span><span class="token punctuation">]</span>
						n <span class="token operator">=</span> n<span class="token punctuation">.</span>children<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
						<span class="token keyword">continue</span> walk
					<span class="token punctuation">}</span>

					<span class="token comment">// ... but we can&#39;t</span>
					value<span class="token punctuation">.</span>tsr <span class="token operator">=</span> <span class="token function">len</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span> <span class="token operator">==</span> end<span class="token operator">+</span><span class="token number">1</span>
					<span class="token keyword">return</span>
				<span class="token punctuation">}</span>

				<span class="token keyword">if</span> value<span class="token punctuation">.</span>handlers <span class="token operator">=</span> n<span class="token punctuation">.</span>handlers<span class="token punctuation">;</span> value<span class="token punctuation">.</span>handlers <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
					value<span class="token punctuation">.</span>fullPath <span class="token operator">=</span> n<span class="token punctuation">.</span>fullPath
					<span class="token keyword">return</span>
				<span class="token punctuation">}</span>
				<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>children<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span> <span class="token punctuation">{</span>
					<span class="token comment">// \u6CA1\u6709\u627E\u5230\u5904\u7406\u51FD\u6570. \u68C0\u67E5\u6B64\u8DEF\u5F84\u672B\u5C3E\u52A0/\u7684\u8DEF\u7531\u662F\u5426\u5B58\u5728\u6CE8\u518C\u51FD\u6570</span>
					<span class="token comment">// \u7528\u4E8E TSR \u63A8\u8350</span>
					n <span class="token operator">=</span> n<span class="token punctuation">.</span>children<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
					value<span class="token punctuation">.</span>tsr <span class="token operator">=</span> n<span class="token punctuation">.</span>path <span class="token operator">==</span> <span class="token string">&quot;/&quot;</span> <span class="token operator">&amp;&amp;</span> n<span class="token punctuation">.</span>handlers <span class="token operator">!=</span> <span class="token boolean">nil</span>
				<span class="token punctuation">}</span>
				<span class="token keyword">return</span>

			<span class="token keyword">case</span> catchAll<span class="token punctuation">:</span>
				<span class="token comment">// \u4FDD\u5B58\u901A\u914D\u7B26\u7684\u503C</span>
				<span class="token keyword">if</span> <span class="token function">cap</span><span class="token punctuation">(</span>value<span class="token punctuation">.</span>params<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token function">int</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>maxParams<span class="token punctuation">)</span> <span class="token punctuation">{</span>
					value<span class="token punctuation">.</span>params <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span>Params<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> n<span class="token punctuation">.</span>maxParams<span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
				i <span class="token operator">:=</span> <span class="token function">len</span><span class="token punctuation">(</span>value<span class="token punctuation">.</span>params<span class="token punctuation">)</span>
				value<span class="token punctuation">.</span>params <span class="token operator">=</span> value<span class="token punctuation">.</span>params<span class="token punctuation">[</span><span class="token punctuation">:</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token comment">// \u5728\u9884\u5148\u5206\u914D\u7684\u5BB9\u91CF\u5185\u6269\u5C55slice</span>
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
				<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;invalid node type&quot;</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// \u627E\u4E0D\u5230\uFF0C\u5982\u679C\u5B58\u5728\u4E00\u4E2A\u5728\u5F53\u524D\u8DEF\u5F84\u6700\u540E\u6DFB\u52A0/\u7684\u8DEF\u7531</span>
		<span class="token comment">// \u6211\u4EEC\u4F1A\u5EFA\u8BAE\u91CD\u5B9A\u5411\u5230\u90A3\u91CC</span>
		value<span class="token punctuation">.</span>tsr <span class="token operator">=</span> <span class="token punctuation">(</span>path <span class="token operator">==</span> <span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span> <span class="token operator">||</span>
			<span class="token punctuation">(</span><span class="token function">len</span><span class="token punctuation">(</span>prefix<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token function">len</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token operator">+</span><span class="token number">1</span> <span class="token operator">&amp;&amp;</span> prefix<span class="token punctuation">[</span><span class="token function">len</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token char">&#39;/&#39;</span> <span class="token operator">&amp;&amp;</span>
				path <span class="token operator">==</span> prefix<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token function">len</span><span class="token punctuation">(</span>prefix<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> n<span class="token punctuation">.</span>handlers <span class="token operator">!=</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>       
</code></pre></div></details><h4 id="\u666E\u901A\u8DEF\u7531" tabindex="-1"><a class="header-anchor" href="#\u666E\u901A\u8DEF\u7531" aria-hidden="true">#</a> \u666E\u901A\u8DEF\u7531</h4><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u76D1\u542C\u5730\u5740</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:80&quot;</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316Gin\u8DEF\u7531\u5F15\u64CE</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6CE8\u518C\u8DEF\u7531</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/index&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> <span class="token string">&quot;Index\\n&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	r<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">&quot;/login&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> <span class="token string">&quot;Login\\n&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// Any\u53EF\u4EE5\u652F\u6301\u591A\u79CD\u65B9\u6CD5\uFF0C\u5177\u4F53\u5305\u542B\uFF1AGET, POST, PUT, PATCH, HEAD, OPTIONS, DELETE, CONNECT, TRACE.</span>
	r<span class="token punctuation">.</span><span class="token function">Any</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;\u4F60\u7684\u8BF7\u6C42\u65B9\u6CD5\u662F: %s\\n&quot;</span><span class="token punctuation">,</span> c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>Method<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// \u542F\u52A8Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code>C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token punctuation">\\</span>Desktop<span class="token operator">&gt;</span>curl http://127.0.0.1/index
Index

C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token punctuation">\\</span>Desktop<span class="token operator">&gt;</span>curl -XPOST http://127.0.0.1/login
Login

C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token punctuation">\\</span>Desktop<span class="token operator">&gt;</span>curl  http://127.0.0.1/
\u4F60\u7684\u8BF7\u6C42\u65B9\u6CD5\u662F: GET

C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token punctuation">\\</span>Desktop<span class="token operator">&gt;</span>curl -XPUT http://127.0.0.1/
\u4F60\u7684\u8BF7\u6C42\u65B9\u6CD5\u662F: PUT

C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token punctuation">\\</span>Desktop<span class="token operator">&gt;</span>curl -XPOST http://127.0.0.1/
\u4F60\u7684\u8BF7\u6C42\u65B9\u6CD5\u662F: POST
</code></pre></div><h4 id="\u5206\u7EC4\u8DEF\u7531" tabindex="-1"><a class="header-anchor" href="#\u5206\u7EC4\u8DEF\u7531" aria-hidden="true">#</a> \u5206\u7EC4\u8DEF\u7531</h4><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u76D1\u542C\u5730\u5740</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:80&quot;</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316Gin\u8DEF\u7531\u5F15\u64CE</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6CE8\u518C\u8DEF\u7531</span>
	apiV1 <span class="token operator">:=</span> r<span class="token punctuation">.</span><span class="token function">Group</span><span class="token punctuation">(</span><span class="token string">&quot;/api/v1&quot;</span><span class="token punctuation">)</span>
	apiV1<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> <span class="token string">&quot;Hello Gin!&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	apiV1<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/login&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> <span class="token string">&quot;Login&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// \u542F\u52A8Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code>C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token punctuation">\\</span>Desktop<span class="token operator">&gt;</span>curl   http://127.0.0.1/api/v1/
Hello Gin<span class="token operator">!</span>
C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token punctuation">\\</span>Desktop<span class="token operator">&gt;</span>curl   http://127.0.0.1/api/v1/login
</code></pre></div><h4 id="\u5C3E\u659C\u6760\u548C\u91CD\u5B9A\u5411" tabindex="-1"><a class="header-anchor" href="#\u5C3E\u659C\u6760\u548C\u91CD\u5B9A\u5411" aria-hidden="true">#</a> \u5C3E\u659C\u6760\u548C\u91CD\u5B9A\u5411</h4><details class="custom-container details"><summary>RedirectTrailingSlash\u548CRedirectFixedPath</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u76D1\u542C\u5730\u5740</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:80&quot;</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316Gin\u8DEF\u7531\u5F15\u64CE</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u9ED8\u8BA4\u4E3Ature,\u8BBE\u7F6E\u4E3AFalse\u53EF\u4EE5\u5173\u95ED\u81EA\u52A8\u91CD\u5B9A\u5411\uFF08\u5168\u5C40\u8BBE\u7F6E\uFF09</span>
	<span class="token comment">//r.RedirectTrailingSlash = false</span>

	<span class="token comment">// \u9ED8\u8BA4\u4E3Afalse, \u8BBE\u7F6E\u4E3Atrue\u5982\u679C\u5339\u914D\u4E0D\u5230\u5C06\u4F1A\u5C1D\u8BD5\u4FEE\u590Dpath\uFF0C\u6BD4\u5982/FOO\u548C/..//Foo\u5C06\u4F1A\u88AB\u91CD\u5B9A\u5411\u5230/foo(/foo\u5B58\u5728\u7684\u60C5\u51B5\u4E0B)</span>
	<span class="token comment">//r.RedirectFixedPath = true</span>

	<span class="token comment">// \u6CE8\u518C\u8DEF\u7531</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/index&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> <span class="token string">&quot;Index\\n&quot;</span><span class="token punctuation">)</span>		
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/login/&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> <span class="token string">&quot;Login\\n&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// \u542F\u52A8Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u6CE8\u518C\u4EC0\u4E48\u5C31\u8BBF\u95EE\u4EC0\u4E48\uFF0C\u6CA1\u6709\u95EE\u9898</span>
C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token operator">&gt;</span>curl http://127.0.0.1/index
Index
C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token operator">&gt;</span>curl http://127.0.0.1/login/
Login

<span class="token comment"># \u65E0\u8BBA\u6CE8\u518C\u65F6\u5E26\u4E0D\u5E26\u5C3E\u659C\u6760\uFF0C\u8BBF\u95EE\u65F6\u90FD\u53EF\u4EE5\u81EA\u52A8\u91CD\u5B9A\u5411</span>
C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token operator">&gt;</span>curl http://127.0.0.1/index/
<span class="token operator">&lt;</span>a <span class="token assign-left variable">href</span><span class="token operator">=</span><span class="token string">&quot;/index&quot;</span><span class="token operator">&gt;</span>Moved Permanently<span class="token operator">&lt;</span>/a<span class="token operator">&gt;</span>.
C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token operator">&gt;</span>curl http://127.0.0.1/index/ -L
Index
C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token operator">&gt;</span>curl http://127.0.0.1/login -L
Login

<span class="token comment"># \u67E5\u770B\u54CD\u5E94\u5934</span>
C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token operator">&gt;</span>curl http://127.0.0.1/login -i <span class="token comment"># windows\u4E0B\u4F7F\u7528-i</span>
HTTP/1.1 <span class="token number">301</span> Moved Permanently
Content-Type: text/html<span class="token punctuation">;</span> <span class="token assign-left variable">charset</span><span class="token operator">=</span>utf-8
Location: /login/
Date: Sun, 08 May <span class="token number">2022</span> <span class="token number">10</span>:31:39 GMT
Content-Length: <span class="token number">42</span>

<span class="token operator">&lt;</span>a <span class="token assign-left variable">href</span><span class="token operator">=</span><span class="token string">&quot;/login/&quot;</span><span class="token operator">&gt;</span>Moved Permanently<span class="token operator">&lt;</span>/a<span class="token operator">&gt;</span>.

<span class="token comment"># \u5E76\u4E0D\u4F1A\u50CFnet/http\u90A3\u6837\uFF0C\u4F1A\u8FDB\u884C\u524D\u7F00\u5339\u914D</span>
C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token operator">&gt;</span>curl http://127.0.0.1/login/a/b/c
<span class="token number">404</span> page not found
</code></pre></div><details class="custom-container details"><summary>HTTP\u91CD\u5B9A\u5411</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u76D1\u542C\u5730\u5740</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:80&quot;</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316Gin\u8DEF\u7531\u5F15\u64CE</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6CE8\u518C\u8DEF\u7531</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/index&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// HTTP\u91CD\u5B9A\u5411\uFF08\u5982\u679C\u5728Chrome\u7B49\u6D4F\u89C8\u5668\u4E0B\u8BBF\u95EE\u5730\u5740\u680F\u4F1A\u53D8\u4E3A/login/\uFF09</span>
		c<span class="token punctuation">.</span><span class="token function">Redirect</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusMovedPermanently<span class="token punctuation">,</span> <span class="token string">&quot;/login/&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/login/&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> <span class="token string">&quot;Login\\n&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// \u542F\u52A8Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><details class="custom-container details"><summary>\u8DEF\u7531\u5185\u91CD\u5B9A\u5411</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u76D1\u542C\u5730\u5740</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:80&quot;</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316Gin\u8DEF\u7531\u5F15\u64CE</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6CE8\u518C\u8DEF\u7531</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/index&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// \u8DEF\u7531\u5185\u91CD\u5B9A\u5411\uFF08\u5982\u679C\u5728Chrome\u7B49\u6D4F\u89C8\u5668\u4E0B\u8BBF\u95EE\u5730\u5740\u680F\u4E0D\u4F1A\u53D1\u751F\u53D8\u5316\uFF09</span>
		c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>URL<span class="token punctuation">.</span>Path <span class="token operator">=</span> <span class="token string">&quot;/login/&quot;</span>
		r<span class="token punctuation">.</span><span class="token function">HandleContext</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/login/&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> <span class="token string">&quot;Login\\n&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// \u542F\u52A8Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220508183700833.png" alt="image-20220508183700833"></p><h3 id="\u53C2\u6570\u89E3\u6790" tabindex="-1"><a class="header-anchor" href="#\u53C2\u6570\u89E3\u6790" aria-hidden="true">#</a> \u53C2\u6570\u89E3\u6790</h3><h4 id="content-type" tabindex="-1"><a class="header-anchor" href="#content-type" aria-hidden="true">#</a> Content-Type</h4><p><strong>\u8BF4\u660E</strong></p><p><code>Content-Type</code>\u5199\u5165\u5728HTTP\u8BF7\u6C42\u5934\u6216\u54CD\u5E94\u5934\u4E2D\uFF0C\u7528\u4E8E\u544A\u77E5\u63A5\u6536\u65B9\u8D44\u6E90\u7C7B\u578B</p><ul><li><p>\u63A5\u6536\u65B9\u53EF\u4EE5\u662F\u670D\u52A1\u7AEF\uFF08\u5BA2\u6237\u7AEF\u53D1\u9001HTTP\u8BF7\u6C42\u8BBE\u7F6E<code>Content-Type</code>\uFF09\uFF0C\u4E5F\u53EF\u4EE5\u662F\u5BA2\u6237\u7AEF\uFF08\u670D\u52A1\u7AEF\u8FD4\u56DEHTTP\u54CD\u5E94\u8BBE\u7F6E<code>Content-Type</code>\uFF09</p></li><li><p><code>Content-Type</code>\u53C2\u6570\u5E76\u4E0D\u662F\u5FC5\u987B\u8981\u8BBE\u7F6E\u7684</p></li></ul><p>\u8BED\u6CD5\u683C\u5F0F\u5982\u4E0B\uFF1A</p><div class="language-html ext-html"><pre class="language-html"><code>Content-Type: type/subtype [; charset] [; boundary]
</code></pre></div><ul><li>type/subtype\uFF1A\u7531\u7C7B\u578B\u4E0E\u5B50\u7C7B\u578B\u4E24\u4E2A\u5B57\u7B26\u4E32\u4E2D\u95F4\u7528<code>&#39;/&#39;</code>\u5206\u9694\u800C\u7EC4\u6210\u3002\u4E0D\u5141\u8BB8\u7A7A\u683C\u5B58\u5728\u3002</li><li>charset\uFF1A\u5B57\u7B26\u7F16\u7801\u6807\u51C6</li><li>\u5BF9\u4E8E\u591A\u90E8\u5206\u5B9E\u4F53\uFF0Cboundary \u662F\u5FC5\u9700\u7684\uFF0C\u5176\u5305\u62EC\u6765\u81EA\u4E00\u7EC4\u5B57\u7B26\u76841\u523070\u4E2A\u5B57\u7B26\uFF0C\u5DF2\u77E5\u901A\u8FC7\u7535\u5B50\u90AE\u4EF6\u7F51\u5173\u662F\u975E\u5E38\u5065\u58EE\u7684\uFF0C\u800C\u4E0D\u662F\u4EE5\u7A7A\u767D\u7ED3\u5C3E\u3002\u5B83\u7528\u4E8E\u5C01\u88C5\u6D88\u606F\u7684\u591A\u4E2A\u90E8\u5206\u7684\u8FB9\u754C</li></ul><p><strong>Content-Type\u7C7B\u578B\u4E3E\u4F8B</strong></p><table><thead><tr><th>\u7C7B\u578B</th><th>\u8BF4\u660E</th><th>Content-Type\u5178\u578B\u793A\u4F8B</th></tr></thead><tbody><tr><td><code>text</code><br>\uFF08\u6587\u672C\u7C7B\u578B\uFF09</td><td>\u8868\u660E\u6587\u4EF6\u662F\u666E\u901A\u6587\u672C\uFF0C\u7406\u8BBA\u4E0A\u662F\u4EBA\u7C7B\u53EF\u8BFB</td><td><code>text/plain</code><br><code>text/html</code><br><code>text/css</code><br><code>text/javascript</code></td></tr><tr><td><code>image</code><br>\uFF08\u56FE\u7247\u7C7B\u578B\uFF09</td><td>\u8868\u660E\u662F\u67D0\u79CD\u56FE\u50CF\u3002\u4E0D\u5305\u62EC\u89C6\u9891\uFF0C<br>\u4F46\u662F\u52A8\u6001\u56FE\uFF08\u6BD4\u5982\u52A8\u6001gif\uFF09\u4E5F\u4F7F\u7528image\u7C7B\u578B</td><td><code>image/gif</code><br><code>image/png</code><br><code>image/jpeg</code><br><code>image/bmp</code><br><code>image/webp</code><br><code>image/x-icon</code><br><code>image/vnd.microsoft.icon</code></td></tr><tr><td><code>audio</code><br>\uFF08\u97F3\u9891\u7C7B\u578B\uFF09</td><td>\u8868\u660E\u662F\u67D0\u79CD\u97F3\u9891\u6587\u4EF6</td><td><code>audio/midi</code> <br><code>audio/mpeg</code><br><code>audio/webm</code><br><code>audio/ogg</code><br><code>audio/wav</code></td></tr><tr><td><code>video</code><br>\uFF08\u89C6\u9891\u7C7B\u578B\uFF09</td><td>\u8868\u660E\u662F\u67D0\u79CD\u89C6\u9891\u6587\u4EF6</td><td><code>video/webm</code><br><code>video/ogg</code></td></tr><tr><td><code>application</code><br>\uFF08\u4E8C\u8FDB\u5236\u7C7B\u578B\uFF09</td><td>\u8868\u660E\u662F\u67D0\u79CD\u4E8C\u8FDB\u5236\u6570\u636E</td><td><code> applicationx-www-form-urlencoded</code><br><code>application/json</code><br><code>application/octet-stream</code><br><code>application/pdf</code></td></tr><tr><td><code>Multipart</code><br>\uFF08\u6587\u4EF6\u7C7B\u578B\uFF09</td><td>\u8868\u793A\u7EC6\u5206\u9886\u57DF\u7684\u6587\u4EF6\u7C7B\u578B\u7684\u79CD\u7C7B\uFF0C\u7ECF\u5E38\u5BF9\u5E94\u4E0D\u540C\u7684 MIME \u7C7B\u578B\u3002<br>\u8FD9\u662F\u590D\u5408\u6587\u4EF6\u7684\u4E00\u79CD\u8868\u73B0\u65B9\u5F0F</td><td><code>multipart/form-data</code><br><code>multipart/byteranges</code></td></tr></tbody></table>`,46),cn=s("\u53C2\u8003\u81EA\uFF1A"),un={href:"https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types",target:"_blank",rel:"noopener noreferrer"},ln=s("https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types"),kn=p(`<h4 id="\u8DEF\u5F84\u53C2\u6570" tabindex="-1"><a class="header-anchor" href="#\u8DEF\u5F84\u53C2\u6570" aria-hidden="true">#</a> \u8DEF\u5F84\u53C2\u6570</h4><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u76D1\u542C\u5730\u5740</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:80&quot;</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316Gin\u8DEF\u7531\u5F15\u64CE</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6CE8\u518C\u8DEF\u7531 - \u8DEF\u5F84\u53C2\u6570</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/user/:id&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		url <span class="token operator">:=</span> c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>URL
		id <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">Param</span><span class="token punctuation">(</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">)</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;URL: %s, userId: %s\\n&quot;</span><span class="token punctuation">,</span> url<span class="token punctuation">,</span> id<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/article/*id&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		url <span class="token operator">:=</span> c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>URL
		id <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">Param</span><span class="token punctuation">(</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">)</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;URL: %s, articleId: %s\\n&quot;</span><span class="token punctuation">,</span> url<span class="token punctuation">,</span> id<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// \u542F\u52A8Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># :\u6D4B\u8BD5</span>
C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token punctuation">\\</span>Desktop<span class="token operator">&gt;</span>curl http://127.0.0.1/user		<span class="token comment"># \u5FC5\u987B\u4F20\u9012\u53C2\u6570</span>
<span class="token number">404</span> page not found
C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token punctuation">\\</span>Desktop<span class="token operator">&gt;</span>curl http://127.0.0.1/user/		<span class="token comment"># \u5FC5\u987B\u4F20\u9012\u53C2\u6570</span>
<span class="token number">404</span> page not found
C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token punctuation">\\</span>Desktop<span class="token operator">&gt;</span>curl http://127.0.0.1/user/1		<span class="token comment"># \u6570\u636E\u7C7B\u578B\u53EF\u4EE5\u662F\u591A\u79CD\u7C7B\u578B</span>
URL: /user/1, userId: <span class="token number">1</span>
C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token punctuation">\\</span>Desktop<span class="token operator">&gt;</span>curl http://127.0.0.1/user/abc	<span class="token comment"># \u6570\u636E\u7C7B\u578B\u53EF\u4EE5\u662F\u591A\u79CD\u7C7B\u578B</span>
URL: /user/abc, userId: abc
C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token operator">&gt;</span>curl http://127.0.0.1/user/1/2			<span class="token comment"># \u4E0D\u652F\u6301\u591A\u7EA7</span>
<span class="token number">404</span> page not found

<span class="token comment"># *\u6D4B\u8BD5</span>
C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token operator">&gt;</span>curl http://127.0.0.1/article			<span class="token comment"># \u91CD\u5B9A\u5411</span>
<span class="token operator">&lt;</span>a <span class="token assign-left variable">href</span><span class="token operator">=</span><span class="token string">&quot;/article/&quot;</span><span class="token operator">&gt;</span>Moved Permanently<span class="token operator">&lt;</span>/a<span class="token operator">&gt;</span>.
C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token operator">&gt;</span>curl http://127.0.0.1/article/			<span class="token comment"># \u53EF\u4EE5\u4E0D\u4F20\u53C2\u6570</span>
URL: /article/, articleId: /
C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token operator">&gt;</span>curl http://127.0.0.1/article/1			<span class="token comment"># \u4F20\u4E00\u4E2A\u53C2\u6570</span>
URL: /article/1, articleId: /1
C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token operator">&gt;</span>curl http://127.0.0.1/article/abc/def	<span class="token comment"># \u591A\u7EA7\u53C2\u6570</span>
URL: /article/abc/def, articleId: /abc/def
</code></pre></div><h4 id="\u67E5\u8BE2\u5B57\u7B26\u4E32" tabindex="-1"><a class="header-anchor" href="#\u67E5\u8BE2\u5B57\u7B26\u4E32" aria-hidden="true">#</a> \u67E5\u8BE2\u5B57\u7B26\u4E32</h4><table><thead><tr><th>\u65B9\u6CD5</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td><code>Query(key string) string</code></td><td>\u83B7\u53D6key\u7684\u503C\uFF0C\u82E5\u83B7\u53D6\u4E0D\u5230\u8FD4\u56DE\u7A7A\u5B57\u7B26\u4E32\uFF0C\u82E5\u4F20\u9012\u591A\u4E2A\u5219\u53EA\u83B7\u53D6\u7B2C\u4E00\u4E2A</td></tr><tr><td><code>QueryArray(key string) []string</code></td><td>\u7C7B\u4F3C<code>Query</code>\uFF0C\u53EF\u4EE5\u83B7\u53D6\u591A\u4E2A\u503C</td></tr><tr><td><code>DefaultQuery(key, defaultValue string) string</code></td><td>\u7C7B\u4F3C<code>Query</code>\uFF0C\u53EF\u4EE5\u81EA\u5B9A\u4E49\u9ED8\u8BA4\u503C</td></tr><tr><td><code>QueryMap(key string) map[string]string</code></td><td>\u83B7\u53D6key\u7684\u503C\uFF0C\u8F93\u5165\u4E3A<code>map</code>\uFF0C\u8FD4\u56DE\u4E3A<code>map</code></td></tr><tr><td><code>GetQuery(key string) (string, bool)</code></td><td>\u7C7B\u4F3C<code>Query</code>\uFF0C\u8FD4\u56DE\u4E24\u4E2A\u503C\uFF0Cok\u4EE3\u8868\u662F\u5426\u83B7\u53D6\u5230\u503C</td></tr><tr><td><code>GetQueryArray(key string) ([]string, bool)</code></td><td>\u7C7B\u4F3C<code>QueryArray</code>\uFF0C\u8FD4\u56DE\u4E24\u4E2A\u503C\uFF0Cok\u4EE3\u8868\u662F\u5426\u83B7\u53D6\u5230\u503C</td></tr><tr><td><code>GetQueryMap(key string) (map[string]string, bool)</code></td><td>\u7C7B\u4F3C<code>QueryMap</code>\uFF0C\u8FD4\u56DE\u4E24\u4E2A\u503C\uFF0Cok\u4EE3\u8868\u662F\u5426\u83B7\u53D6\u5230\u503C</td></tr></tbody></table><p>\u793A\u4F8B\u4EE3\u7801</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u76D1\u542C\u5730\u5740</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:80&quot;</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316Gin\u8DEF\u7531\u5F15\u64CE</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6CE8\u518C\u8DEF\u7531 - \u8DEF\u5F84\u53C2\u6570</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		msg <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;%#v\\n&quot;</span><span class="token punctuation">,</span> c<span class="token punctuation">.</span><span class="token function">QueryMap</span><span class="token punctuation">(</span><span class="token string">&quot;map&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> msg<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// \u542F\u52A8Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code>C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>Administrator<span class="token operator">&gt;</span>curl <span class="token string">&quot;http://127.0.0.1/?map\\[id\\]=abc&amp;map\\[name\\]=bob&quot;</span>
map<span class="token punctuation">[</span>string<span class="token punctuation">]</span>string<span class="token punctuation">{</span><span class="token string">&quot;id&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;abc&quot;</span>, <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;bob&quot;</span><span class="token punctuation">}</span>
</code></pre></div><h4 id="\u8868\u5355\u89E3\u6790" tabindex="-1"><a class="header-anchor" href="#\u8868\u5355\u89E3\u6790" aria-hidden="true">#</a> \u8868\u5355\u89E3\u6790</h4><table><thead><tr><th>\u65B9\u6CD5</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td><code>PostForm(key string) string</code></td><td>\u89E3\u6790\u8868\u5355\uFF0C\u82E5\u83B7\u53D6\u4E0D\u5230\u8FD4\u56DE\u7A7A\u5B57\u7B26\u4E32\uFF0C\u82E5\u83B7\u53D6\u5230\u591A\u4E2A\u5219\u53EA\u8FD4\u56DE\u7B2C\u4E00\u4E2A</td></tr><tr><td><code>PostFormArray(key string) []string</code></td><td>\u7C7B\u4F3C<code>PostForm</code>\uFF0C\u53EF\u4EE5\u83B7\u53D6\u591A\u4E2A\u503C</td></tr><tr><td><code>PostFormMap(key string) map[string]string</code></td><td>\u7C7B\u4F3C<code>PostForm</code>\uFF0C\u8F93\u5165\u4E3A<code>map</code>\uFF0C\u8FD4\u56DE\u4E3A<code>map</code></td></tr><tr><td><code>GetPostForm(key string) (string, bool)</code></td><td>\u7C7B\u4F3C<code>PostForm</code>\uFF0C\u8FD4\u56DE\u4E24\u4E2A\u503C\uFF0Cok\u4EE3\u8868\u662F\u5426\u83B7\u53D6\u5230\u503C</td></tr><tr><td><code>GetPostFormArray(key string) ([]string, bool)</code></td><td>\u7C7B\u4F3C<code>PostFormArray</code>\uFF0C\u8FD4\u56DE\u4E24\u4E2A\u503C\uFF0Cok\u4EE3\u8868\u662F\u5426\u83B7\u53D6\u5230\u503C</td></tr><tr><td><code>GetPostFormMap(key string) (map[string]string, bool)</code></td><td>\u7C7B\u4F3C<code>PostFormMap</code>\uFF0C\u8FD4\u56DE\u4E24\u4E2A\u503C\uFF0Cok\u4EE3\u8868\u662F\u5426\u83B7\u53D6\u5230\u503C</td></tr><tr><td><code>DefaultPostForm(key, defaultValue string) string</code></td><td>\u7C7B\u4F3C<code>PostForm</code>\uFF0C\u53EF\u4EE5\u8BBE\u7F6E\u9ED8\u8BA4\u503C</td></tr></tbody></table><details class="custom-container details"><summary>\u63D0\u4EA4\u8868\u5355\u793A\u4F8B</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u76D1\u542C\u5730\u5740</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;192.168.0.105:80&quot;</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316Gin\u8DEF\u7531\u5F15\u64CE</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6CE8\u518C\u8DEF\u7531</span>
	r<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// \u83B7\u53D6Content-Type</span>
		contentType <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">GetHeader</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">)</span>

		<span class="token comment">// \u89E3\u6790\u8868\u5355\u6570\u636E</span>
		username <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">PostForm</span><span class="token punctuation">(</span><span class="token string">&quot;username&quot;</span><span class="token punctuation">)</span>
		password <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">PostForm</span><span class="token punctuation">(</span><span class="token string">&quot;password&quot;</span><span class="token punctuation">)</span>

		<span class="token comment">// \u8FD4\u56DE\u54CD\u5E94</span>
		msg <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type: %q\\nPostForm: username: %q, password: %q\\n&quot;</span><span class="token punctuation">,</span> contentType<span class="token punctuation">,</span> username<span class="token punctuation">,</span> password<span class="token punctuation">)</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> msg<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// \u83B7\u53D6Content-Type</span>
		contentType <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">GetHeader</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">)</span>

		<span class="token comment">// \u89E3\u6790\u8868\u5355\u6570\u636E</span>
		username <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">PostForm</span><span class="token punctuation">(</span><span class="token string">&quot;username&quot;</span><span class="token punctuation">)</span>
		password <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">PostForm</span><span class="token punctuation">(</span><span class="token string">&quot;password&quot;</span><span class="token punctuation">)</span>

		<span class="token comment">// \u8FD4\u56DE\u54CD\u5E94</span>
		msg <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type: %q\\nPostForm: username: %q, password: %q\\n&quot;</span><span class="token punctuation">,</span> contentType<span class="token punctuation">,</span> username<span class="token punctuation">,</span> password<span class="token punctuation">)</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> msg<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// \u542F\u52A8Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># -------------\u5148\u4F7F\u7528POST\u65B9\u6CD5\u6D4B\u8BD5------------------------------------------------------</span>
<span class="token comment"># \u4EC0\u4E48\u90FD\u4E0D\u4F20\uFF0C\u670D\u52A1\u7AEF\u63A5\u6536\u5230\u7A7A\u5B57\u7B26\u4E32</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># curl http://192.168.0.105/ -XPOST</span>
Content-Type: <span class="token string">&quot;&quot;</span>
PostForm: username: <span class="token string">&quot;&quot;</span>, password: <span class="token string">&quot;&quot;</span>

<span class="token comment"># \u670D\u52A1\u7AEF\u54CD\u5E94\u5934\u7684Content-Type\u4E3A\u3010text/plain; charset=utf-8\u3011</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># curl http://192.168.0.105/ -XPOST -I</span>
HTTP/1.1 <span class="token number">200</span> OK
Content-Type: text/plain<span class="token punctuation">;</span> <span class="token assign-left variable">charset</span><span class="token operator">=</span>utf-8
Date: Fri, 06 May <span class="token number">2022</span> 05:52:49 GMT
Content-Length: <span class="token number">54</span>

<span class="token comment"># \u2B50\u4F7F\u7528-d\u53C2\u6570\u63D0\u4EA4\u6570\u636E\uFF0Ccurl\u4F1A\u81EA\u52A8\u8BBE\u7F6EContent-Type\u4E3Aapplication/x-www-form-urlencoded</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># curl http://192.168.0.105/ -XPOST -d &quot;username=root&amp;password=123456\u4E2D\u56FD&quot;</span>
Content-Type: <span class="token string">&quot;application/x-www-form-urlencoded&quot;</span>
PostForm: username: <span class="token string">&quot;root&quot;</span>, password: <span class="token string">&quot;123456\u4E2D\u56FD&quot;</span>

<span class="token comment"># \u7ED9curl\u8BBE\u7F6E\u4E00\u4E2A\u9519\u8BEF\u7684Content-Type,\u53EF\u4EE5\u770B\u5230\u670D\u52A1\u7AEF\u83B7\u53D6\u4E0D\u5230\u6211\u4EEC\u63D0\u4EA4\u7684\u6570\u636E\u4E86</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># curl http://192.168.0.105/ -XPOST -d &quot;username=root&amp;password=123456\u4E2D\u56FD&quot; -H &quot;Content-Type:abc&quot;</span>
Content-Type: <span class="token string">&quot;abc&quot;</span>
PostForm: username: <span class="token string">&quot;&quot;</span>, password: <span class="token string">&quot;&quot;</span>

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># curl http://192.168.0.105/ -XPOST -d &quot;username=root&amp;password=123456\u4E2D\u56FD&quot; -H &quot;Content-Type:application/json&quot;</span>
Content-Type: <span class="token string">&quot;application/json&quot;</span>
PostForm: username: <span class="token string">&quot;&quot;</span>, password: <span class="token string">&quot;&quot;</span>

<span class="token comment"># \u2B50\u4F7F\u7528-f\u53C2\u6570\u63D0\u4EA4\u8868\u5355\uFF0Ccurl\u4F1A\u81EA\u52A8\u8BBE\u7F6EContent-Type\u4E3Amultipart/form-data</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># curl http://192.168.0.105/ -XPOST --form username=root --form password=\u4E2D\u56FD\u4F60\u597D</span>
Content-Type: <span class="token string">&quot;multipart/form-data; boundary=----------------------------cb1776d3bb87&quot;</span>
PostForm: username: <span class="token string">&quot;root&quot;</span>, password: <span class="token string">&quot;\u4E2D\u56FD\u4F60\u597D&quot;</span>

<span class="token comment"># -------------\u518D\u4F7F\u7528GET\u65B9\u6CD5\u6D4B\u8BD5------------------------------------------------------</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># curl http://192.168.0.105/ -XGET -d &quot;username=root&amp;password=123456\u4E2D\u56FD&quot;</span>
Content-Type: <span class="token string">&quot;application/x-www-form-urlencoded&quot;</span>
PostForm: username: <span class="token string">&quot;&quot;</span>, password: <span class="token string">&quot;&quot;</span>

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># curl http://192.168.0.105/ -XGET --form username=root --form password=\u4E2D\u56FD\u4F60\u597D</span>
Content-Type: <span class="token string">&quot;multipart/form-data; boundary=----------------------------cd010eead867&quot;</span>
PostForm: username: <span class="token string">&quot;root&quot;</span>, password: <span class="token string">&quot;\u4E2D\u56FD\u4F60\u597D&quot;</span>
</code></pre></div></details><details class="custom-container details"><summary>HTML\u4E2D\u7684form\u6807\u7B7E\u9ED8\u8BA4\u4F7F\u7528application/x-www-form-urlencoded</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token operator">&lt;</span><span class="token operator">!</span>DOCTYPE html<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>html lang<span class="token operator">=</span><span class="token string">&quot;en&quot;</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>head<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>meta charset<span class="token operator">=</span><span class="token string">&quot;UTF-8&quot;</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>title<span class="token operator">&gt;</span>Title<span class="token operator">&lt;</span><span class="token operator">/</span>title<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>head<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>body<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>form action<span class="token operator">=</span><span class="token string">&quot;http://192.168.0.105/&quot;</span> method<span class="token operator">=</span><span class="token string">&quot;post&quot;</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> \u9ED8\u8BA4enctype\u7684\u503C\u4E3Aapplication<span class="token operator">/</span>x<span class="token operator">-</span>www<span class="token operator">-</span>form<span class="token operator">-</span>urlencoded <span class="token operator">--</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span><span class="token operator">&lt;</span>form action<span class="token operator">=</span><span class="token string">&quot;http://192.168.0.105/&quot;</span> method<span class="token operator">=</span><span class="token string">&quot;post&quot;</span> enctype<span class="token operator">=</span><span class="token string">&quot;application/x-www-form-urlencoded&quot;</span><span class="token operator">&gt;</span><span class="token operator">--</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>label<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>span<span class="token operator">&gt;</span>\u7528\u6237\u540D<span class="token operator">&lt;</span><span class="token operator">/</span>span<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>input <span class="token keyword">type</span><span class="token operator">=</span><span class="token string">&quot;text&quot;</span> name<span class="token operator">=</span><span class="token string">&quot;username&quot;</span> placeholder<span class="token operator">=</span><span class="token string">&quot;\u8BF7\u8F93\u5165\u60A8\u7684\u7528\u6237\u540D&quot;</span> autocomplete<span class="token operator">=</span><span class="token string">&quot;off&quot;</span> autofocus<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>label<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>label<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>span<span class="token operator">&gt;</span>\u5BC6\u7801<span class="token operator">&lt;</span><span class="token operator">/</span>span<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>input <span class="token keyword">type</span><span class="token operator">=</span><span class="token string">&quot;password&quot;</span> name<span class="token operator">=</span><span class="token string">&quot;password&quot;</span> placeholder<span class="token operator">=</span><span class="token string">&quot;\u8BF7\u8F93\u5165\u60A8\u7684\u5BC6\u7801&quot;</span> autocomplete<span class="token operator">=</span><span class="token string">&quot;off&quot;</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>label<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>input <span class="token keyword">type</span><span class="token operator">=</span><span class="token string">&quot;submit&quot;</span> value<span class="token operator">=</span><span class="token string">&quot;\u767B\u5F55&quot;</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>form<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>body<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>html<span class="token operator">&gt;</span>
</code></pre></div></details><h4 id="\u53C2\u6570\u7ED1\u5B9A" tabindex="-1"><a class="header-anchor" href="#\u53C2\u6570\u7ED1\u5B9A" aria-hidden="true">#</a> \u53C2\u6570\u7ED1\u5B9A</h4><details class="custom-container details"><summary>GET\u67E5\u8BE2\u5B57\u7B26\u4E32\u53C2\u6570\u7ED1\u5B9A\u548C\u3010\u7B2C\u4E00\u6B21\u4F7F\u7528\u53C2\u6570\u7ED1\u5B9A\u6CE8\u610F\u4E8B\u9879\u3011</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// \u7B2C\u4E00\u6B21\u4F7F\u7528\u53C2\u6570\u7ED1\u5B9A\u6CE8\u610F\u4E8B\u9879\uFF1A</span>
<span class="token comment">// (1) \u7ED3\u6784\u4F53\u5B57\u6BB5\u5FC5\u987B\u53EF\u5BFC\u51FA(\u9996\u5B57\u6BCD\u5927\u5199)</span>
<span class="token comment">// (2) \u7ED1\u5B9A\u65F6\u5FC5\u987B\u7528\u7ED3\u6784\u4F53\u6307\u9488(\u56E0\u4E3A\u8981\u7ED9\u5916\u90E8\u53D8\u91CF\u8D4B\u503C\u561B)</span>

<span class="token comment">// \u67E5\u8BE2\u5B57\u7B26\u4E32\u53C2\u6570\u7ED1\u5B9A</span>
<span class="token comment">// (3) form\u53EF\u9009\uFF0C\u5982\u679C\u4E0D\u5199\uFF0C\u4F20\u9012\u53C2\u6570\u65F6\u5FC5\u987B\u4E0E\u7ED3\u6784\u4F53\u540D\u5B57\u4E00\u81F4</span>
<span class="token comment">// (4) Content-Type\u6709\u6CA1\u6709\u90FD\u65E0\u6240\u8C13</span>

<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Username <span class="token builtin">string</span> <span class="token string">\`form:&quot;username&quot;\`</span>
	Password <span class="token builtin">string</span> <span class="token string">\`form:&quot;password&quot;\`</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u76D1\u542C\u5730\u5740</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:80&quot;</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316Gin\u8DEF\u7531\u5F15\u64CE</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6CE8\u518C\u8DEF\u7531</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// \u83B7\u53D6Content-Type</span>
		contentType <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">GetHeader</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">)</span>

		<span class="token comment">// \u53C2\u6570\u7ED1\u5B9A</span>
		<span class="token keyword">var</span> user User
		err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">ShouldBind</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusBadRequest<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
				<span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">:</span> contentType<span class="token punctuation">,</span>
				<span class="token string">&quot;Message&quot;</span><span class="token punctuation">:</span>      <span class="token string">&quot;\u8BF7\u6C42\u53C2\u6570\u9519\u8BEF&quot;</span> <span class="token operator">+</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// \u8FD4\u56DE\u54CD\u5E94</span>
		c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">:</span> contentType<span class="token punctuation">,</span>
			<span class="token string">&quot;Username&quot;</span><span class="token punctuation">:</span>     user<span class="token punctuation">.</span>Username<span class="token punctuation">,</span>
			<span class="token string">&quot;Password&quot;</span><span class="token punctuation">:</span>     user<span class="token punctuation">.</span>Password<span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// \u542F\u52A8Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220507134109116.png" alt="image-20220507134109116"></p></details><details class="custom-container details"><summary>POST\u8868\u5355\u53C2\u6570\u7ED1\u5B9A</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// Post\u8868\u5355\u53C2\u6570\u7ED1\u5B9A\u6CE8\u610F\u4E8B\u9879</span>
<span class="token comment">// (1) form\u53EF\u9009\uFF0C\u5982\u679C\u4E0D\u5199\uFF0C\u4F20\u9012\u53C2\u6570\u65F6\u5FC5\u987B\u4E0E\u7ED3\u6784\u4F53\u540D\u5B57\u4E00\u81F4</span>
<span class="token comment">// (2) Content-Type\u4E3A\u3010application/x-www-form-urlencoded\u3011\u6216\u3010multipart/form-data;boundary=xx\u3011\u90FD\u53EF\u4EE5</span>

<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Username <span class="token builtin">string</span> <span class="token string">\`form:&quot;username&quot;\`</span>
	Password <span class="token builtin">string</span> <span class="token string">\`form:&quot;password&quot;\`</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u76D1\u542C\u5730\u5740</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:80&quot;</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316Gin\u8DEF\u7531\u5F15\u64CE</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6CE8\u518C\u8DEF\u7531</span>
	r<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// \u83B7\u53D6Content-Type</span>
		contentType <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">GetHeader</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">)</span>

		<span class="token comment">// \u53C2\u6570\u7ED1\u5B9A</span>
		<span class="token keyword">var</span> user User
		err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">ShouldBind</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusBadRequest<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
				<span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">:</span> contentType<span class="token punctuation">,</span>
				<span class="token string">&quot;Message&quot;</span><span class="token punctuation">:</span>      <span class="token string">&quot;\u8BF7\u6C42\u53C2\u6570\u9519\u8BEF&quot;</span> <span class="token operator">+</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// \u8FD4\u56DE\u54CD\u5E94</span>
		c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">:</span> contentType<span class="token punctuation">,</span>
			<span class="token string">&quot;Username&quot;</span><span class="token punctuation">:</span>     user<span class="token punctuation">.</span>Username<span class="token punctuation">,</span>
			<span class="token string">&quot;Password&quot;</span><span class="token punctuation">:</span>     user<span class="token punctuation">.</span>Password<span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// \u542F\u52A8Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220507133521628.png" alt="image-20220507133521628"></p><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220507133540059.png" alt="image-20220507133540059"></p></details><details class="custom-container details"><summary>POST JSON\u53C2\u6570\u7ED1\u5B9A</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// POST JSON\u53C2\u6570\u7ED1\u5B9A\u6CE8\u610F\u4E8B\u9879\uFF1A</span>
<span class="token comment">// (1) \u7ED3\u6784\u4F53Tag\u4E2Djson\u53EF\u9009\uFF0C\u5982\u679C\u4E0D\u5199\uFF0C\u4F20\u9012\u53C2\u6570\u65F6\u5FC5\u987B\u4E0E\u7ED3\u6784\u4F53\u540D\u5B57\u4E00\u81F4</span>
<span class="token comment">// (2) Content-Type\u5FC5\u987B\u8BBE\u7F6E\u6210application/json</span>

<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Username <span class="token builtin">string</span> <span class="token string">\`json:&quot;username&quot;\`</span>
	Password <span class="token builtin">string</span> <span class="token string">\`json:&quot;password&quot;\`</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u76D1\u542C\u5730\u5740</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:80&quot;</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316Gin\u8DEF\u7531\u5F15\u64CE</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6CE8\u518C\u8DEF\u7531</span>
	r<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// \u83B7\u53D6Content-Type</span>
		contentType <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">GetHeader</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">)</span>

		<span class="token comment">// \u53C2\u6570\u7ED1\u5B9A</span>
		<span class="token keyword">var</span> user User
		err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">ShouldBind</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusBadRequest<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
				<span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">:</span> contentType<span class="token punctuation">,</span>
				<span class="token string">&quot;Message&quot;</span><span class="token punctuation">:</span>      <span class="token string">&quot;\u8BF7\u6C42\u53C2\u6570\u9519\u8BEF&quot;</span> <span class="token operator">+</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// \u8FD4\u56DE\u54CD\u5E94</span>
		c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">:</span> contentType<span class="token punctuation">,</span>
			<span class="token string">&quot;Username&quot;</span><span class="token punctuation">:</span>     user<span class="token punctuation">.</span>Username<span class="token punctuation">,</span>
			<span class="token string">&quot;Password&quot;</span><span class="token punctuation">:</span>     user<span class="token punctuation">.</span>Password<span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// \u542F\u52A8Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220507134825424.png" alt="image-20220507134825424"></p></details><details class="custom-container details"><summary>\u591A\u6B21\u53C2\u6570\u7ED1\u5B9A\u95EE\u9898</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
	<span class="token string">&quot;github.com/gin-gonic/gin/binding&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// \u591A\u6B21\u53C2\u6570\u7ED1\u5B9A\u6CE8\u610F\u4E8B\u9879\uFF1A</span>
<span class="token comment">// \u95EE\u9898\u63CF\u8FF0\uFF1A</span>
<span class="token comment">// 		\u5BF9\u4E8E\u90E8\u5206\u683C\u5F0F\u6570\u636E(JSON, XML, MsgPack, ProtoBuf)\uFF0C\u4F7F\u7528ShouldBind\u591A\u6B21\u7ED1\u5B9A\u4F1A\u51FA\u9519,\u539F\u56E0\u662Fc.Request.Body\u4E0D\u53EF\u4EE5\u91CD\u7528\uFF0C\u7B2C\u4E8C\u6B21\u8BFB\u53D6\u5C31\u4F1A\u51FA\u73B0EOF</span>
<span class="token comment">//      \u5BF9\u4E8E\u5176\u4ED6\u683C\u5F0F\uFF08Query, Form, FormPost, FormMultipart\uFF09\u5219\u53EF\u4EE5\u591A\u6B21\u8C03\u7528c.ShouldBind()</span>
<span class="token comment">// \u89E3\u51B3\u529E\u6CD5\uFF1A</span>
<span class="token comment">// 		\u4F7F\u7528ShouldBindBodyWith\u7ED1\u5B9A</span>

<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Username <span class="token builtin">string</span> <span class="token string">\`json:&quot;username&quot; form:&quot;username&quot;\`</span>
	Password <span class="token builtin">string</span> <span class="token string">\`json:&quot;password&quot; form:&quot;password&quot;\`</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u76D1\u542C\u5730\u5740</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:80&quot;</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316Gin\u8DEF\u7531\u5F15\u64CE</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6CE8\u518C\u8DEF\u7531</span>
	r<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// \u83B7\u53D6Content-Type</span>
		contentType <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">GetHeader</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">)</span>

		<span class="token comment">// \u53C2\u6570\u7ED1\u5B9A</span>
		<span class="token keyword">var</span> user User
		<span class="token keyword">var</span> user1 User
		<span class="token comment">//if err := c.ShouldBind(&amp;user); err != nil {</span>
		<span class="token keyword">if</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">ShouldBindBodyWith</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">,</span> binding<span class="token punctuation">.</span>JSON<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusBadRequest<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
				<span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">:</span> contentType<span class="token punctuation">,</span>
				<span class="token string">&quot;Message&quot;</span><span class="token punctuation">:</span>      <span class="token string">&quot;\u8BF7\u6C42\u53C2\u6570\u9519\u8BEF&quot;</span> <span class="token operator">+</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>
		<span class="token comment">//if err := c.ShouldBind(&amp;user1); err != nil {</span>
		<span class="token keyword">if</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">ShouldBindBodyWith</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user1<span class="token punctuation">,</span> binding<span class="token punctuation">.</span>JSON<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusBadRequest<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
				<span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">:</span> contentType<span class="token punctuation">,</span>
				<span class="token string">&quot;Message&quot;</span><span class="token punctuation">:</span>      <span class="token string">&quot;\u8BF7\u6C42\u53C2\u6570\u9519\u8BEF&quot;</span> <span class="token operator">+</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// \u8FD4\u56DE\u54CD\u5E94</span>
		c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">:</span> contentType<span class="token punctuation">,</span>
			<span class="token string">&quot;Username&quot;</span><span class="token punctuation">:</span>     user<span class="token punctuation">.</span>Username<span class="token punctuation">,</span>
			<span class="token string">&quot;Password&quot;</span><span class="token punctuation">:</span>     user<span class="token punctuation">.</span>Password<span class="token punctuation">,</span>
			<span class="token string">&quot;Username1&quot;</span><span class="token punctuation">:</span>    user1<span class="token punctuation">.</span>Username<span class="token punctuation">,</span>
			<span class="token string">&quot;Password1&quot;</span><span class="token punctuation">:</span>    user1<span class="token punctuation">.</span>Password<span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// \u542F\u52A8Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h4 id="\u53C2\u6570\u7ED1\u5B9A\u540E\u6821\u9A8C" tabindex="-1"><a class="header-anchor" href="#\u53C2\u6570\u7ED1\u5B9A\u540E\u6821\u9A8C" aria-hidden="true">#</a> \u53C2\u6570\u7ED1\u5B9A\u540E\u6821\u9A8C</h4><p><code>gin</code>\u53C2\u6570\u6821\u9A8C\u4F7F\u7528\u7684\u662F<code>validator</code>\u5E93\uFF0C\u56E0\u6B64\u5177\u4F53\u7684\u6821\u9A8C\u89C4\u5219\u53EF\u4EE5\u53BB\u4E0B\u9762\u7684\u6587\u6863\u4E2D\u67E5\u627E</p>`,21),rn=s("Github\uFF1A"),dn={href:"https://github.com/go-playground/validator",target:"_blank",rel:"noopener noreferrer"},mn=s("https://github.com/go-playground/validator"),gn=s("\u6587\u6863\uFF1A"),fn={href:"https://pkg.go.dev/github.com/go-playground/validator",target:"_blank",rel:"noopener noreferrer"},hn=s("https://pkg.go.dev/github.com/go-playground/validator"),qn=p(`<details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// \u53C2\u6570\u6821\u9A8C\u90FD\u5378\u8F7Dbinding\u540E\u9762\uFF0C\u5E38\u89C1\u7684\u89C4\u5219\u6709\uFF1A</span>
<span class="token comment">// 		required  \u5FC5\u9009\u53C2\u6570</span>
<span class="token comment">//		omitempty \u53EF\u9009\u53C2\u6570</span>
<span class="token comment">//		max/min/le/lt/ge/gt/eq/ne</span>

<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Id       <span class="token builtin">int</span>    <span class="token string">\`json:&quot;id&quot; binding:&quot;omitempty&quot;\`</span>
	Username <span class="token builtin">string</span> <span class="token string">\`json:&quot;username&quot; binding:&quot;required,min=1,max=20&quot;\`</span>
	Password <span class="token builtin">string</span> <span class="token string">\`json:&quot;password&quot; binding:&quot;required,min=8,max=20&quot;\`</span> <span class="token comment">// \u8BBE\u7F6E\u5B57\u7B26\u4E32\u957F\u5EA6\u6700\u4F4E\u662F8</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u76D1\u542C\u5730\u5740</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:80&quot;</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316Gin\u8DEF\u7531\u5F15\u64CE</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6CE8\u518C\u8DEF\u7531</span>
	r<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// \u83B7\u53D6Content-Type</span>
		contentType <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">GetHeader</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">)</span>

		<span class="token comment">// \u53C2\u6570\u7ED1\u5B9A</span>
		<span class="token keyword">var</span> user User
		err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">ShouldBind</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusBadRequest<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
				<span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">:</span> contentType<span class="token punctuation">,</span>
				<span class="token string">&quot;Message&quot;</span><span class="token punctuation">:</span>      <span class="token string">&quot;\u8BF7\u6C42\u53C2\u6570\u9519\u8BEF&quot;</span> <span class="token operator">+</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// \u8FD4\u56DE\u54CD\u5E94</span>
		c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">:</span> contentType<span class="token punctuation">,</span>
			<span class="token string">&quot;Id&quot;</span><span class="token punctuation">:</span>           user<span class="token punctuation">.</span>Id<span class="token punctuation">,</span>
			<span class="token string">&quot;Username&quot;</span><span class="token punctuation">:</span>     user<span class="token punctuation">.</span>Username<span class="token punctuation">,</span>
			<span class="token string">&quot;Password&quot;</span><span class="token punctuation">:</span>     user<span class="token punctuation">.</span>Password<span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// \u542F\u52A8Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220507144553806.png" alt="image-20220507144553806"></p><h3 id="\u6587\u4EF6\u4E0A\u4F20\u4E0B\u8F7D" tabindex="-1"><a class="header-anchor" href="#\u6587\u4EF6\u4E0A\u4F20\u4E0B\u8F7D" aria-hidden="true">#</a> \u6587\u4EF6\u4E0A\u4F20\u4E0B\u8F7D</h3><h4 id="\u5355\u6587\u4EF6\u4E0A\u4F20" tabindex="-1"><a class="header-anchor" href="#\u5355\u6587\u4EF6\u4E0A\u4F20" aria-hidden="true">#</a> \u5355\u6587\u4EF6\u4E0A\u4F20</h4><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u76D1\u542C\u5730\u5740</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;192.168.0.105:80&quot;</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316Gin\u8DEF\u7531\u5F15\u64CE</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u53C2\u6570\u8C03\u6574</span>
	<span class="token comment">//r.MaxMultipartMemory\u9ED8\u8BA4\u5185\u5B58\u9650\u5236\u4E3A32MB\uFF0C\u610F\u601D\u662F\u5F53\u8BFB\u53D6\u7684\u6587\u4EF6\u5927\u5C0F\u8D85\u8FC7\u8FD9\u4E2A\u503C\u5C31\u4F1A\u8FDB\u884C\u5237\u76D8</span>
	<span class="token comment">//\u53EF\u4EE5\u901A\u8FC7\u4EE5\u4E0B\u65B9\u6CD5\u6765\u8BBE\u7F6E</span>
	<span class="token comment">//r.MaxMultipartMemory = 64 &lt;&lt; 20 // 64 MB</span>

	<span class="token comment">// \u6CE8\u518C\u8DEF\u7531</span>
	r<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">&quot;/upload/&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// \u83B7\u53D6Content-Type</span>
		contentType <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">GetHeader</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type: &quot;</span><span class="token punctuation">,</span> contentType<span class="token punctuation">)</span>

		<span class="token comment">// \u8BFB\u53D6\u6587\u4EF6</span>
		f<span class="token punctuation">,</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">FormFile</span><span class="token punctuation">(</span><span class="token string">&quot;logo&quot;</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusBadRequest<span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;\u8BF7\u6C42\u9519\u8BEF: %s\\n&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// \u4FDD\u5B58\u6587\u4EF6,\u5982\u679C\u6587\u4EF6\u5DF2\u7ECF\u5B58\u5728\u5219\u4F1A\u8986\u76D6</span>
		err <span class="token operator">=</span> c<span class="token punctuation">.</span><span class="token function">SaveUploadedFile</span><span class="token punctuation">(</span>f<span class="token punctuation">,</span> f<span class="token punctuation">.</span>Filename<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusBadRequest<span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;\u670D\u52A1\u5668\u4FDD\u5B58\u6587\u4EF6\u5931\u8D25: %s\\n&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// \u8FD4\u56DE\u54CD\u5E94</span>
		msg <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type: %s\\n\u6587\u4EF6\u4E0A\u4F20\u6210\u529F\\n&quot;</span><span class="token punctuation">,</span> contentType<span class="token punctuation">)</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> msg<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// \u542F\u52A8Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># curl http://192.168.0.105/upload/ -F &quot;logo=@anaconda-ks.cfg&quot; -XPOST</span>
Content-Type: multipart/form-data<span class="token punctuation">;</span> <span class="token assign-left variable">boundary</span><span class="token operator">=</span>----------------------------0338377c72ec
\u6587\u4EF6\u4E0A\u4F20\u6210\u529F
</code></pre></div><h4 id="\u591A\u4E2A\u6587\u4EF6\u4E0A\u4F20" tabindex="-1"><a class="header-anchor" href="#\u591A\u4E2A\u6587\u4EF6\u4E0A\u4F20" aria-hidden="true">#</a> \u591A\u4E2A\u6587\u4EF6\u4E0A\u4F20</h4><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u76D1\u542C\u5730\u5740</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;192.168.0.105:80&quot;</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316Gin\u8DEF\u7531\u5F15\u64CE</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u53C2\u6570\u8C03\u6574</span>
	<span class="token comment">//r.MaxMultipartMemory\u9ED8\u8BA4\u5185\u5B58\u9650\u5236\u4E3A32MB\uFF0C\u610F\u601D\u662F\u5F53\u8BFB\u53D6\u7684\u6587\u4EF6\u5927\u5C0F\u8D85\u8FC7\u8FD9\u4E2A\u503C\u5C31\u4F1A\u8FDB\u884C\u5237\u76D8</span>
	<span class="token comment">//\u53EF\u4EE5\u901A\u8FC7\u4EE5\u4E0B\u65B9\u6CD5\u6765\u8BBE\u7F6E</span>
	<span class="token comment">//r.MaxMultipartMemory = 64 &lt;&lt; 20 // 64 MB</span>

	<span class="token comment">// \u6CE8\u518C\u8DEF\u7531</span>
	r<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">&quot;/upload/&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// \u83B7\u53D6Content-Type</span>
		contentType <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">GetHeader</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">)</span>

		<span class="token comment">// \u8BFB\u53D6\u6587\u4EF6\u5217\u8868</span>
		form<span class="token punctuation">,</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">MultipartForm</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusBadRequest<span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;\u8BF7\u6C42\u9519\u8BEF: %s\\n&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>
		files <span class="token operator">:=</span> form<span class="token punctuation">.</span>File<span class="token punctuation">[</span><span class="token string">&quot;files&quot;</span><span class="token punctuation">]</span> <span class="token comment">// \u8FD4\u56DE\u4E00\u4E2A\u5207\u7247 []*FileHeader</span>
		<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>files<span class="token punctuation">)</span> <span class="token operator">&lt;=</span> <span class="token number">0</span> <span class="token punctuation">{</span>
			c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusBadRequest<span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;\u672A\u4E0A\u4F20\u4EFB\u4F55\u6587\u4EF6\u6216\u672A\u6307\u5B9A\u6807\u8BC6\u7B26files\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// \u4FDD\u5B58\u6587\u4EF6,\u5982\u679C\u6587\u4EF6\u5DF2\u7ECF\u5B58\u5728\u5219\u4F1A\u8986\u76D6</span>
		<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> file <span class="token operator">:=</span> <span class="token keyword">range</span> files <span class="token punctuation">{</span>
			err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">SaveUploadedFile</span><span class="token punctuation">(</span>file<span class="token punctuation">,</span> file<span class="token punctuation">.</span>Filename<span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusBadRequest<span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;\u670D\u52A1\u5668\u4FDD\u5B58\u6587\u4EF6\u5931\u8D25: %s\\n&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
				<span class="token keyword">return</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// \u8FD4\u56DE\u54CD\u5E94</span>
		msg <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Type: %s\\n\u6587\u4EF6\u4E0A\u4F20\u6210\u529F\\n&quot;</span><span class="token punctuation">,</span> contentType<span class="token punctuation">)</span>
		c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> msg<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// \u542F\u52A8Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># curl http://192.168.0.105/upload/ -F &quot;files=@anaconda-ks.cfg&quot; --form &quot;files=@1.txt&quot;  -XPOST</span>
Content-Type: multipart/form-data<span class="token punctuation">;</span> <span class="token assign-left variable">boundary</span><span class="token operator">=</span>----------------------------a3bb45431558
\u6587\u4EF6\u4E0A\u4F20\u6210\u529F
</code></pre></div><h4 id="\u6587\u4EF6\u4E0B\u8F7D" tabindex="-1"><a class="header-anchor" href="#\u6587\u4EF6\u4E0B\u8F7D" aria-hidden="true">#</a> \u6587\u4EF6\u4E0B\u8F7D</h4><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u76D1\u542C\u5730\u5740</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:80&quot;</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316Gin\u8DEF\u7531\u5F15\u64CE</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6CE8\u518C\u8DEF\u7531</span>
	
	<span class="token comment">// \u6307\u5B9A\u5355\u4E2A\u6587\u4EF6\u4E0B\u8F7D</span>
	<span class="token comment">// \u8BBF\u95EE http://127.0.0.1/go.mod/ \u4F1A\u4E0B\u8F7D\u5F53\u524D\u76EE\u5F55\u4E0B\u7684 go.mod\u6587\u4EF6</span>
	r<span class="token punctuation">.</span><span class="token function">StaticFile</span><span class="token punctuation">(</span><span class="token string">&quot;/go.mod&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;./go.mod&quot;</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6307\u5B9A\u591A\u4E2A\u6587\u4EF6\u4E0B\u8F7D</span>
	<span class="token comment">// \u8BBF\u95EE http://127.0.0.1/download/go.mod\u4F1A\u4E0B\u8F7D\u5F53\u524D\u76EE\u5F55\u4E0B\u7684go.mod\u6587\u4EF6</span>
	<span class="token comment">// \u8BBF\u95EE http://127.0.0.1/download/\u4F1A\u62A5404\u9519\u8BEF</span>
	r<span class="token punctuation">.</span><span class="token function">Static</span><span class="token punctuation">(</span><span class="token string">&quot;/download/&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;./&quot;</span><span class="token punctuation">)</span>

	<span class="token comment">// \u9759\u6001\u6587\u4EF6\u670D\u52A1\u5668</span>
	<span class="token comment">// \u8BBF\u95EE http://127.0.0.1/download2/go.mod\u4F1A\u4E0B\u8F7Dgo.mod\u6587\u4EF6</span>
	<span class="token comment">// \u8BBF\u95EE http://127.0.0.1/download2/\u4F1A\u5C55\u793A\u51FA\u5F53\u524D\u76EE\u5F55\u4E0B\u6709\u54EA\u4E9B\u6587\u4EF6\uFF0C\u70B9\u51FB\u53EF\u4EE5\u4E0B\u8F7D\uFF08\u540C\u6837\u4E5F\u53EF\u4EE5\u6253\u5F00\u5B50\u76EE\u5F55\uFF09</span>
	r<span class="token punctuation">.</span><span class="token function">StaticFS</span><span class="token punctuation">(</span><span class="token string">&quot;/download2&quot;</span><span class="token punctuation">,</span> http<span class="token punctuation">.</span><span class="token function">Dir</span><span class="token punctuation">(</span><span class="token string">&quot;./&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// \u542F\u52A8Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h3 id="\u4E2D\u95F4\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u4E2D\u95F4\u4EF6" aria-hidden="true">#</a> \u4E2D\u95F4\u4EF6</h3><h4 id="\u4E2D\u95F4\u4EF6\u683C\u5F0F\u8981\u6C42" tabindex="-1"><a class="header-anchor" href="#\u4E2D\u95F4\u4EF6\u683C\u5F0F\u8981\u6C42" aria-hidden="true">#</a> \u4E2D\u95F4\u4EF6\u683C\u5F0F\u8981\u6C42</h4><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>Engine <span class="token punctuation">{</span>
	<span class="token function">debugPrintWARNINGDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	engine <span class="token operator">:=</span> <span class="token function">New</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	engine<span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span><span class="token function">Logger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">Recovery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>	<span class="token comment">// \u9ED8\u8BA4\u4F7F\u7528\u4E86\u4E24\u4E2A\u4E2D\u95F4\u4EF6</span>
	<span class="token keyword">return</span> engine
<span class="token punctuation">}</span>

<span class="token comment">// \u770B\u4E00\u4E0BUse\u53C2\u6570\u8981\u6C42</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>engine <span class="token operator">*</span>Engine<span class="token punctuation">)</span> <span class="token function">Use</span><span class="token punctuation">(</span>middleware <span class="token operator">...</span>HandlerFunc<span class="token punctuation">)</span> IRoutes <span class="token punctuation">{</span>
	engine<span class="token punctuation">.</span>RouterGroup<span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span>middleware<span class="token operator">...</span><span class="token punctuation">)</span>
	engine<span class="token punctuation">.</span><span class="token function">rebuild404Handlers</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	engine<span class="token punctuation">.</span><span class="token function">rebuild405Handlers</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> engine
<span class="token punctuation">}</span>

<span class="token keyword">type</span> HandlerFunc <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token operator">*</span>Context<span class="token punctuation">)</span>
</code></pre></div><p>\u8BF4\u660E</p><ul><li>\u53EA\u8981\u7B26\u5408<code>func(*Context)</code>\u51FD\u6570\u5B9A\u4E49\uFF0C\u5C31\u53EF\u4EE5\u662F\u4E00\u4E2A\u4E2D\u95F4\u4EF6</li><li>\u5728\u4E2D\u95F4\u4EF6\u4E2D\u8C03\u7528<code>c.Next()</code>\uFF0C\u53EF\u4EE5\u7A7F\u900F\u4E2D\u95F4\u4EF6\uFF0C\u6267\u884C\u540E\u9762\u7684\u903B\u8F91\uFF0C\u540E\u9762\u903B\u8F91\u7684\u6267\u884C\u5B8C\u6210\u540E<code>c.Next()</code>\u51FD\u6570\u6267\u884C\u7ED3\u675F\uFF0C\u7EE7\u7EED\u6267\u884C\u4E2D\u95F4\u4EF6\u5185\u5BB9</li><li>\u5728\u4E2D\u95F4\u4EF6\u4E2D\u8C03\u7528<code>c.Abort()</code>\uFF0C\u53EF\u4EE5\u963B\u6B62\u7A7F\u900F\u4E2D\u95F4\u4EF6</li></ul><h4 id="\u4E2D\u95F4\u4EF6\u4F7F\u7528\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u4E2D\u95F4\u4EF6\u4F7F\u7528\u793A\u4F8B" aria-hidden="true">#</a> \u4E2D\u95F4\u4EF6\u4F7F\u7528\u793A\u4F8B</h4><details class="custom-container details"><summary>\u6CE8\u518C\u5168\u5C40\u4E2D\u95F4\u4EF6</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// \u8BA1\u7B97\u6BCF\u6B21\u8BF7\u6C42\u82B1\u8D39\u65F6\u95F4\u4E2D\u95F4\u4EF6</span>
<span class="token keyword">func</span> <span class="token function">RequestCostMiddleware</span><span class="token punctuation">(</span><span class="token punctuation">)</span> gin<span class="token punctuation">.</span>HandlerFunc <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// \u5F00\u59CB\u8BA1\u65F6</span>
		start <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>start<span class="token punctuation">)</span>
		<span class="token comment">// \u8C03\u7528\u540E\u7EED\u7684\u5904\u7406\u903B\u8F91\uFF0C\u5728\u672C\u4EE3\u7801\u4E2D\u4F1A\u6267\u884C\u540E\u9762\u7684Handler\u903B\u8F91</span>
		c<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

		<span class="token comment">// \u7ED3\u675F\u8BA1\u65F6(\u5355\u4F4D\u6BEB\u79D2)</span>
		timedelta <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Since</span><span class="token punctuation">(</span>start<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Milliseconds</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

		<span class="token comment">// \u8F93\u51FA\u7ED3\u679C</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%-4s %-s: Used %d milliseconds\\n&quot;</span><span class="token punctuation">,</span> c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>Method<span class="token punctuation">,</span> c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>URL<span class="token punctuation">,</span> timedelta<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u76D1\u542C\u5730\u5740</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:80&quot;</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316Gin\u8DEF\u7531\u5F15\u64CE</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u4E2D\u95F4\u4EF6\u4F7F\u7528\u65B9\u5F0F\u4E00: \u6CE8\u518C\u5168\u5C40\u4E2D\u95F4\u4EF6,\u5BF9\u6240\u6709\u8DEF\u7531\u6709\u6548</span>
	r<span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span><span class="token function">RequestCostMiddleware</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6CE8\u518C\u8DEF\u7531</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond <span class="token operator">*</span> <span class="token number">30</span><span class="token punctuation">)</span> <span class="token comment">// \u4F11\u772030\u6BEB\u79D2</span>
		c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">&quot;Message&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;Hello Gin!&quot;</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// \u542F\u52A8Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><details class="custom-container details"><summary>\u6CE8\u518C\u5355\u4E2A\u8DEF\u7531\u4E2D\u95F4\u4EF6</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// \u8BA1\u7B97\u6BCF\u6B21\u8BF7\u6C42\u82B1\u8D39\u65F6\u95F4\u4E2D\u95F4\u4EF6</span>
<span class="token keyword">func</span> <span class="token function">RequestCostMiddleware</span><span class="token punctuation">(</span><span class="token punctuation">)</span> gin<span class="token punctuation">.</span>HandlerFunc <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// \u5F00\u59CB\u8BA1\u65F6</span>
		start <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>start<span class="token punctuation">)</span>
		<span class="token comment">// \u8C03\u7528\u540E\u7EED\u7684\u5904\u7406\u903B\u8F91\uFF0C\u5728\u672C\u4EE3\u7801\u4E2D\u4F1A\u6267\u884C\u540E\u9762\u7684Handler\u903B\u8F91</span>
		c<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

		<span class="token comment">// \u7ED3\u675F\u8BA1\u65F6(\u5355\u4F4D\u6BEB\u79D2)</span>
		timedelta <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Since</span><span class="token punctuation">(</span>start<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Milliseconds</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

		<span class="token comment">// \u8F93\u51FA\u7ED3\u679C</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%-4s %-s: Used %d milliseconds\\n&quot;</span><span class="token punctuation">,</span> c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>Method<span class="token punctuation">,</span> c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>URL<span class="token punctuation">,</span> timedelta<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u76D1\u542C\u5730\u5740</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:80&quot;</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316Gin\u8DEF\u7531\u5F15\u64CE</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6CE8\u518C\u8DEF\u7531</span>
	<span class="token comment">// \u6CE8\u518C\u5355\u4E2A\u8DEF\u7531\u4E2D\u95F4\u4EF6</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token function">RequestCostMiddleware</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond <span class="token operator">*</span> <span class="token number">30</span><span class="token punctuation">)</span> <span class="token comment">// \u4F11\u772030\u6BEB\u79D2</span>
		c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">&quot;Message&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;Hello Gin!&quot;</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// \u542F\u52A8Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><details class="custom-container details"><summary>\u6CE8\u518C\u8DEF\u7531\u7EC4\u5185\u5168\u5C40\u4E2D\u95F4\u4EF6</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// \u8BA1\u7B97\u6BCF\u6B21\u8BF7\u6C42\u82B1\u8D39\u65F6\u95F4\u4E2D\u95F4\u4EF6</span>
<span class="token keyword">func</span> <span class="token function">RequestCostMiddleware</span><span class="token punctuation">(</span><span class="token punctuation">)</span> gin<span class="token punctuation">.</span>HandlerFunc <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// \u5F00\u59CB\u8BA1\u65F6</span>
		start <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>start<span class="token punctuation">)</span>
		<span class="token comment">// \u8C03\u7528\u540E\u7EED\u7684\u5904\u7406\u903B\u8F91\uFF0C\u5728\u672C\u4EE3\u7801\u4E2D\u4F1A\u6267\u884C\u540E\u9762\u7684Handler\u903B\u8F91</span>
		c<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

		<span class="token comment">// \u7ED3\u675F\u8BA1\u65F6(\u5355\u4F4D\u6BEB\u79D2)</span>
		timedelta <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Since</span><span class="token punctuation">(</span>start<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Milliseconds</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

		<span class="token comment">// \u8F93\u51FA\u7ED3\u679C</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%-4s %-s: Used %d milliseconds\\n&quot;</span><span class="token punctuation">,</span> c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>Method<span class="token punctuation">,</span> c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>URL<span class="token punctuation">,</span> timedelta<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u76D1\u542C\u5730\u5740</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:80&quot;</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316Gin\u8DEF\u7531\u5F15\u64CE</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6CE8\u518C\u8DEF\u7531\u7EC4</span>
	apiV1 <span class="token operator">:=</span> r<span class="token punctuation">.</span><span class="token function">Group</span><span class="token punctuation">(</span><span class="token string">&quot;/api/v1&quot;</span><span class="token punctuation">)</span>

	<span class="token comment">// \u8DEF\u7531\u7EC4\u5185\u6CE8\u518C\u5168\u5C40\u4E2D\u95F4\u4EF6,\u4EC5\u5BF9\u8DEF\u7531\u5185\u7684\u6240\u6709\u8DEF\u7531\u751F\u6548</span>
	apiV1<span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span><span class="token function">RequestCostMiddleware</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	apiV1<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token function">RequestCostMiddleware</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond <span class="token operator">*</span> <span class="token number">30</span><span class="token punctuation">)</span> <span class="token comment">// \u4F11\u772030\u6BEB\u79D2</span>
		c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">&quot;Message&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;Hello Gin!&quot;</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// \u542F\u52A8Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h4 id="\u591A\u4E2A\u4E2D\u95F4\u4EF6\u6267\u884C\u987A\u5E8F\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#\u591A\u4E2A\u4E2D\u95F4\u4EF6\u6267\u884C\u987A\u5E8F\u95EE\u9898" aria-hidden="true">#</a> \u591A\u4E2A\u4E2D\u95F4\u4EF6\u6267\u884C\u987A\u5E8F\u95EE\u9898</h4><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">MyMiddleware</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> gin<span class="token punctuation">.</span>HandlerFunc <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u4E2D\u95F4\u4EF6%s\u5F00\u59CB\u6267\u884C\\n&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span>
		c<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// \u8C03\u7528\u540E\u7EED\u7684\u5904\u7406\u903B\u8F91\uFF0C\u5728\u672C\u4EE3\u7801\u4E2D\u4F1A\u6267\u884C\u540E\u9762\u7684Handler\u903B\u8F91</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u4E2D\u95F4\u4EF6%s\u7ED3\u675F\u6267\u884C\\n&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u76D1\u542C\u5730\u5740</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:80&quot;</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316Gin\u8DEF\u7531\u5F15\u64CE</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6CE8\u518C\u5168\u5C40\u4E2D\u95F4\u4EF6</span>
	r<span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span>
		<span class="token function">MyMiddleware</span><span class="token punctuation">(</span><span class="token string">&quot;m1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token function">MyMiddleware</span><span class="token punctuation">(</span><span class="token string">&quot;m2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token function">MyMiddleware</span><span class="token punctuation">(</span><span class="token string">&quot;m3&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">)</span>

	<span class="token comment">// \u6CE8\u518C\u8DEF\u7531\u7EC4</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token function">MyMiddleware</span><span class="token punctuation">(</span><span class="token string">&quot;m4&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Handler\u5F00\u59CB\u6267\u884C&quot;</span><span class="token punctuation">)</span>
		c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">&quot;Message&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;Hello Gin!&quot;</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Handler\u7ED3\u675F\u6267\u884C&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// \u542F\u52A8Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u53EF\u4EE5\u770B\u5230\uFF0C\u4E0E\u6211\u4EEC\u6CE8\u518C\u7684\u987A\u5E8F\u4FDD\u6301\u4E00\u81F4</span>
<span class="token comment"># \u6CE8\u610F\uFF1A\u5168\u5C40\u4E2D\u95F4\u4EF6\u6CE8\u518C\u8981\u5728\u8DEF\u7531\u6CE8\u518C\u4E4B\u524D\uFF0C\u5426\u5219\u4E0D\u4F1A\u6267\u884C\u5230</span>
\u4E2D\u95F4\u4EF6m1\u5F00\u59CB\u6267\u884C
\u4E2D\u95F4\u4EF6m2\u5F00\u59CB\u6267\u884C
\u4E2D\u95F4\u4EF6m3\u5F00\u59CB\u6267\u884C
\u4E2D\u95F4\u4EF6m4\u5F00\u59CB\u6267\u884C
Handler\u5F00\u59CB\u6267\u884C
Handler\u7ED3\u675F\u6267\u884C
\u4E2D\u95F4\u4EF6m4\u7ED3\u675F\u6267\u884C
\u4E2D\u95F4\u4EF6m3\u7ED3\u675F\u6267\u884C
\u4E2D\u95F4\u4EF6m2\u7ED3\u675F\u6267\u884C
\u4E2D\u95F4\u4EF6m1\u7ED3\u675F\u6267\u884C
</code></pre></div><h4 id="\u8DE8\u4E2D\u95F4\u4EF6\u4F20\u503C" tabindex="-1"><a class="header-anchor" href="#\u8DE8\u4E2D\u95F4\u4EF6\u4F20\u503C" aria-hidden="true">#</a> \u8DE8\u4E2D\u95F4\u4EF6\u4F20\u503C</h4><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">M1Middleware</span><span class="token punctuation">(</span><span class="token punctuation">)</span> gin<span class="token punctuation">.</span>HandlerFunc <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// \u8BBE\u7F6E\u503C</span>
		c<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;m1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;m1 value&quot;</span><span class="token punctuation">)</span>

		<span class="token comment">// \u8C03\u7528\u540E\u7EED\u7684\u5904\u7406\u903B\u8F91\uFF0C\u5728\u672C\u4EE3\u7801\u4E2D\u4F1A\u6267\u884C\u540E\u9762\u7684Handler\u903B\u8F91</span>
		c<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">M2Middleware</span><span class="token punctuation">(</span><span class="token punctuation">)</span> gin<span class="token punctuation">.</span>HandlerFunc <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// \u8BBE\u7F6E\u503C</span>
		c<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;m2&quot;</span><span class="token punctuation">,</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

		<span class="token comment">// \u8C03\u7528\u540E\u7EED\u7684\u5904\u7406\u903B\u8F91\uFF0C\u5728\u672C\u4EE3\u7801\u4E2D\u4F1A\u6267\u884C\u540E\u9762\u7684Handler\u903B\u8F91</span>
		c<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u76D1\u542C\u5730\u5740</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:80&quot;</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316Gin\u8DEF\u7531\u5F15\u64CE</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6CE8\u518C\u5168\u5C40\u4E2D\u95F4\u4EF6</span>
	r<span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span>
		<span class="token function">M1Middleware</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token function">M2Middleware</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">)</span>

	<span class="token comment">// \u6CE8\u518C\u8DEF\u7531\u7EC4</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		m1<span class="token punctuation">,</span> ok <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;m1&quot;</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> ok <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u62FF\u5230M1\u4E2D\u95F4\u4EF6\u7684\u503C: %#v\\n&quot;</span><span class="token punctuation">,</span> m1<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		m2<span class="token punctuation">,</span> ok <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;m2&quot;</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> ok <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;\u62FF\u5230M2\u4E2D\u95F4\u4EF6\u7684\u503C: %#v\\n&quot;</span><span class="token punctuation">,</span> m2<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">&quot;Message&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;Hello Gin!&quot;</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// \u542F\u52A8Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\u8F93\u51FA\u7ED3\u679C</p><div class="language-bash ext-sh"><pre class="language-bash"><code>\u62FF\u5230M1\u4E2D\u95F4\u4EF6\u7684\u503C: <span class="token string">&quot;m1 value&quot;</span>
\u62FF\u5230M2\u4E2D\u95F4\u4EF6\u7684\u503C: <span class="token punctuation">[</span><span class="token punctuation">]</span>int<span class="token punctuation">{</span><span class="token number">0</span>, <span class="token number">0</span>, <span class="token number">0</span><span class="token punctuation">}</span>
</code></pre></div><h4 id="\u4E2D\u95F4\u4EF6\u6216handler\u5F00\u542Fgoroutine\u60C5\u51B5\u4E0B" tabindex="-1"><a class="header-anchor" href="#\u4E2D\u95F4\u4EF6\u6216handler\u5F00\u542Fgoroutine\u60C5\u51B5\u4E0B" aria-hidden="true">#</a> \u4E2D\u95F4\u4EF6\u6216Handler\u5F00\u542FGoroutine\u60C5\u51B5\u4E0B</h4><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u5B8C\u6574\u4EE3\u7801</summary><div class="language-go ext-go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">Change</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> wg <span class="token operator">*</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>Method <span class="token operator">=</span> http<span class="token punctuation">.</span>MethodPost
	wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">M1Middleware</span><span class="token punctuation">(</span><span class="token punctuation">)</span> gin<span class="token punctuation">.</span>HandlerFunc <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// \u5F53\u9700\u8981\u5F00\u542F\u4E00\u4E2AGoroutine\u65F6\u5E94\u8BE5\u4F7F\u7528c.Copy()\uFF0C\u800C\u4E0D\u662F\u76F4\u63A5\u4FEE\u6539\u539F\u59CB\u5BF9\u8C61</span>
		wg <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">)</span>
		wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
		<span class="token comment">//go Change(c, wg)</span>
		<span class="token keyword">go</span> <span class="token function">Change</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span><span class="token function">Copy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> wg<span class="token punctuation">)</span> <span class="token comment">// \u5E94\u8BE5\u4F7F\u7528c.Copy</span>
		wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

		<span class="token comment">// \u8C03\u7528\u540E\u7EED\u7684\u5904\u7406\u903B\u8F91\uFF0C\u5728\u672C\u4EE3\u7801\u4E2D\u4F1A\u6267\u884C\u540E\u9762\u7684Handler\u903B\u8F91</span>
		c<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u76D1\u542C\u5730\u5740</span>
	addr <span class="token operator">:=</span> <span class="token string">&quot;127.0.0.1:80&quot;</span>

	<span class="token comment">// \u5B9E\u4F8B\u5316Gin\u8DEF\u7531\u5F15\u64CE</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6CE8\u518C\u5168\u5C40\u4E2D\u95F4\u4EF6</span>
	r<span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span><span class="token function">M1Middleware</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// \u6CE8\u518C\u8DEF\u7531\u7EC4</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">&quot;Method&quot;</span><span class="token punctuation">:</span>  c<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>Method<span class="token punctuation">,</span>
			<span class="token string">&quot;Message&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;Hello Gin!&quot;</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// \u542F\u52A8Gin Server</span>
	log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></details><h4 id="\u4E2D\u95F4\u4EF6\u6536\u96C6\u5217\u8868" tabindex="-1"><a class="header-anchor" href="#\u4E2D\u95F4\u4EF6\u6536\u96C6\u5217\u8868" aria-hidden="true">#</a> \u4E2D\u95F4\u4EF6\u6536\u96C6\u5217\u8868</h4><p>\u5185\u7F6E\u4E2D\u95F4\u4EF6\uFF1A</p><ul><li><code>gin.BasicAuth()</code>\u3001<code>gin.BasicAuthForRealm()</code></li></ul><p>\u7B2C\u4E09\u65B9\u4E2D\u95F4\u4EF6\uFF1A</p>`,37),yn=s("\u5B98\u65B9\u6536\u96C6\uFF1A"),bn={href:"https://github.com/gin-gonic/contrib",target:"_blank",rel:"noopener noreferrer"},wn=s("https://github.com/gin-gonic/contrib");function vn(xn,Sn){const a=e("ExternalLinkIcon");return c(),u("div",null,[k,n("p",null,[i,n("a",r,[d,t(a)])]),m,n("details",g,[f,h,q,n("blockquote",null,[y,b,w,v,n("p",null,[x,n("a",S,[T,t(a)])])])]),P,n("p",null,[C,n("a",R,[H,t(a)])]),F,n("p",null,[G,n("a",A,[M,t(a)]),_]),U,n("p",null,[D,n("a",L,[E,t(a)])]),B,n("p",null,[N,n("a",W,[O,t(a)])]),I,n("p",null,[K,n("a",V,[J,t(a)])]),n("p",null,[j,n("a",z,[Q,t(a)])]),X,n("ul",null,[n("li",null,[n("a",Y,[Z,t(a)])]),n("li",null,[n("a",$,[nn,t(a)])])]),sn,n("p",null,[an,n("a",tn,[pn,t(a)]),on]),en,n("p",null,[cn,n("a",un,[ln,t(a)])]),kn,n("p",null,[rn,n("a",dn,[mn,t(a)])]),n("p",null,[gn,n("a",fn,[hn,t(a)])]),qn,n("ul",null,[n("li",null,[yn,n("a",bn,[wn,t(a)])])])])}var Pn=o(l,[["render",vn],["__file","Web-for-Go.html.vue"]]);export{Pn as default};
