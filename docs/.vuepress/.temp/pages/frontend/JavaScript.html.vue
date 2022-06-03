<template><div><p>基本数据类型</p>
<h3 id="变量作用域" tabindex="-1"><a class="header-anchor" href="#变量作用域" aria-hidden="true">#</a> 变量作用域</h3>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">/*
    全局作用域
        在函数外定义的变量
    局部作用域
        在函数内定义的变量
    块级作用域
        在代码块{}内的变量

    定义变量的几种方式
        var
            定义的变量只有全局作用域和局部作用域
            可以重复声明和赋值
        let
            定义的变量支持所有作用域
            不可以重复声明或赋值
        直接定义
            强烈不推荐
        const
            用来定义常量
            定义的变量支持所有作用域
            不可以重复声明或赋值
     */</span>

    <span class="token comment">// 在以下几个地方推荐使用let</span>
    <span class="token comment">// ① for循环内</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">9</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// console.log(i);</span>
    <span class="token comment">// Uncaught ReferenceError: i is not defined</span>

    <span class="token comment">// ②单独的代码块</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// console.log(i);</span>
    <span class="token comment">// Uncaught ReferenceError: i is not defined</span>

	<span class="token comment">// ③单独的代码块 const</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">const</span> c <span class="token operator">=</span> <span class="token number">200</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="变量声明提升" tabindex="-1"><a class="header-anchor" href="#变量声明提升" aria-hidden="true">#</a> 变量声明提升</h3>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// 直接使用未定义的变量会报错，后面的代码将不会执行</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Uncaught ReferenceError: a is not defined</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>

<span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// 假若先使用再定义，先看输出结果</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>
    <span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

    <span class="token comment">// 解释原因</span>
    <span class="token comment">// 在执行所有代码之前，JavaScript有预解析阶段，这会导致【变量声明提升】，意思是等同于下面的代码</span>
    <span class="token comment">// var b;</span>
    <span class="token comment">// console.log(b);</span>
    <span class="token comment">// b = 1;</span>
    <span class="token comment">// 所以上面会输出undefined，而不是报错</span>
    <span class="token comment">// 【变量声明提升】的前提是需要使用var声明全局变量，如果使用let声明，那么会报错 Uncaught ReferenceError: Cannot access 'b' before initialization</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="严格模式" tabindex="-1"><a class="header-anchor" href="#严格模式" aria-hidden="true">#</a> 严格模式</h3>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">/*
        使用 "use strict"; 来指定为严格模式
        一般放在文件行首，这不是必须的，还可以单独放到函数内，只对某个函数启用严格模式
     */</span>
    <span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token string">"use strict"</span><span class="token punctuation">;</span>
        <span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    x <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="数据类型检测" tabindex="-1"><a class="header-anchor" href="#数据类型检测" aria-hidden="true">#</a> 数据类型检测</h3>
<p><code v-pre>JavaScript</code>的数据类型和<code v-pre>typeof</code>的检测结果并不是一一对应的，所以对于部分数据类型来说会有专有的检测方法</p>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token string">'b'</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token string">"c"</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> d <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> e <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token keyword">var</span> x<span class="token punctuation">;</span>
    <span class="token keyword">var</span> y <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> z <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> a<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// number</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// string</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> c<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// string</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> d<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// object</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// object</span>

    <span class="token comment">// 数组比较特殊，需要使用Array.isArray来检测</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// true</span>

	<span class="token comment">// NaN比较特殊，需要使用isNaN或Number.isNaN来检测</span>
    <span class="token comment">// 全局函数isNaN本质是通过Number将对象转为数字类型，若能转换返回true，不能则返回false，也就是说他本质是【检测是不是数字类型】</span>
    <span class="token comment">// Number.isNaN本质是：检测是不是Number类型 &amp; 检测值是不是NaN，也就是说他的检测更加严格一些</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">isNaN</span><span class="token punctuation">(</span><span class="token number">NaN</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token comment">// true</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Number<span class="token punctuation">.</span><span class="token function">isNaN</span><span class="token punctuation">(</span><span class="token number">NaN</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">isNaN</span><span class="token punctuation">(</span><span class="token string">"中国"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Number<span class="token punctuation">.</span><span class="token function">isNaN</span><span class="token punctuation">(</span><span class="token string">"中国"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false	</span>

    <span class="token comment">// 没有值得变量(只声明没赋值 或 显示赋值为undefined)的类型为undefined</span>
    <span class="token comment">// 注意：null类型为object</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// undefined</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// undefined</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> z<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// object</span>

	<span class="token comment">// 还有一些没有补充，比如布尔值，比如小数是什么类型，等等后面再说</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><p>判断能不能转为数字</p>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token keyword">function</span> <span class="token function">isBecomeNumber</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 类型判断</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> item <span class="token operator">===</span> <span class="token string">"number"</span> <span class="token operator">||</span> <span class="token keyword">typeof</span> item <span class="token operator">===</span> <span class="token string">"string"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 判断是不是NaN</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isNaN</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">isBecomeNumber</span><span class="token punctuation">(</span><span class="token string">"123"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>	<span class="token comment">// true</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">isBecomeNumber</span><span class="token punctuation">(</span><span class="token string">"0.0"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>	<span class="token comment">// true</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">isBecomeNumber</span><span class="token punctuation">(</span><span class="token string">"0.1"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>	<span class="token comment">// true</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">isBecomeNumber</span><span class="token punctuation">(</span><span class="token string">"2e3"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>	<span class="token comment">// true</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">isBecomeNumber</span><span class="token punctuation">(</span><span class="token string">"abc"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">isBecomeNumber</span><span class="token punctuation">(</span><span class="token number">NaN</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">isBecomeNumber</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">isBecomeNumber</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">isBecomeNumber</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><p>判断输入的是不是数字</p>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// 输入的肯定是字符串，所以可以不用管 数字类型的NaN这个值了</span>
    <span class="token comment">// 然后只需要判断一下能不能转成数字就行了</span>
    <span class="token keyword">var</span> n <span class="token operator">=</span> <span class="token function">prompt</span><span class="token punctuation">(</span><span class="token string">'请输入一个数字'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isNaN</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 这里还要转一下，将字符串类型转为数字类型</span>
        n <span class="token operator">=</span> <span class="token function">Number</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"数字: "</span><span class="token punctuation">,</span> n<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"不是数字，"</span><span class="token punctuation">,</span> n<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="_1数字类型" tabindex="-1"><a class="header-anchor" href="#_1数字类型" aria-hidden="true">#</a> ①数字类型</h3>
<ul>
<li>所有数字不分大小、不分浮整、不分正负都是数字类型</li>
<li>小数比如0.5中，0可以省略，可以简写成.5,比如<code v-pre>1 + .2;</code>、 <code v-pre>typeof .6;</code>等</li>
<li>较大的数字 或 较小的数字<code v-pre>（0.xxxxxxx）</code>可以写成科学计数法的形式；比如<code v-pre>3e8</code>就等于 <code v-pre>3 * 10的8次方</code>；<code v-pre>3e-4</code>等于<code v-pre>3 * 10的-4次方</code>，0.0003</li>
<li>二进制以<code v-pre>0b</code>开头；八进制以<code v-pre>0</code>开头；十六进制以<code v-pre>0x</code>开头</li>
</ul>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 进制转换 <span class="token operator">--</span><span class="token operator">></span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">017</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 8进制17转为10进制，就是15</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">0xa</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 16进制a转为10进制，就是10</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">0xA</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 16进制A转为10进制，就是10</span>

    <span class="token comment">// 小数计算精度问题</span>
    <span class="token comment">// 解决的话，可以使用NumberObject.toFixed(小数位数)来解决</span>
    <span class="token comment">// toFixed是四舍五入的</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">0.1</span> <span class="token operator">+</span> <span class="token number">0.2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0.30000000000000004</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">0.1</span> <span class="token operator">+</span> <span class="token number">0.2</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toFixed</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0.30</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">0.50</span> <span class="token operator">+</span> <span class="token number">0.06</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toFixed</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0.56，四舍五入0.6</span>

    <span class="token comment">// 特殊数字值NaN</span>
    <span class="token comment">// NaN意思是 not a number，不是一个数字，但是他是数字类型，</span>
    <span class="token comment">// 所有不能转为数字类型的都用NaN表示，比如0/0, 3 * undefined</span>
    <span class="token comment">// 数值NaN的类型为number，检测数据类型时需要使用isNaN</span>
    <span class="token comment">// 数值NaN还有一个特性，不自等</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">0</span> <span class="token operator">/</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// NaN</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">3</span> <span class="token operator">*</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// NaN</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">NaN</span> <span class="token operator">==</span> <span class="token number">NaN</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> <span class="token number">NaN</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// number</span>

    <span class="token comment">// 无穷大Infinity和无穷小-Infinity，类型是number    </span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">/</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>             <span class="token comment">// Infinity    </span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span> <span class="token operator">/</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>            <span class="token comment">// -Infinity</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> <span class="token number">Infinity</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 	<span class="token comment">// number</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> <span class="token operator">-</span><span class="token number">Infinity</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 	<span class="token comment">// number</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="_2字符串" tabindex="-1"><a class="header-anchor" href="#_2字符串" aria-hidden="true">#</a> ②字符串</h3>
<ul>
<li>使用单引号或双引号都可以</li>
<li>使用+可以拼接字符串</li>
<li>模板字符串使用反引号，里面可以解析变量，比如<code v-pre>${name}</code></li>
</ul>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// 模板字符串</span>
    <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token string">"hello world!"</span>
    <span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token string">"   Hello "</span>

    <span class="token comment">// length返回字符串长度</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"字符串长度"</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 大小写转换</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"字符串大小写转换"</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// HELLO WORLD!</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//  hello</span>

    <span class="token comment">// 检索字符串</span>
    <span class="token comment">// indexOf和lastIndexOf</span>
    <span class="token comment">//      返回索引下标，未找到字符串则返回-1</span>
    <span class="token comment">//      如果字符串出现多次，只返回第一次出现的下标</span>
    <span class="token comment">// includes</span>
    <span class="token comment">//      判断是否包含子字符串</span>
    <span class="token comment">//      返回true或false</span>
    <span class="token comment">//</span>
    <span class="token comment">// 第二个参数表示从下标N开始，默认为0</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"字符串检索"</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">"o"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>            <span class="token comment">// 4</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span><span class="token function">lastIndexOf</span><span class="token punctuation">(</span><span class="token string">"o"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token comment">// 7</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span><span class="token string">"hello"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>       <span class="token comment">// true</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span><span class="token string">"hello"</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// false</span>

    <span class="token comment">// 清除字符串首尾空白</span>
    <span class="token comment">//  trim()</span>
    <span class="token comment">//  trimStart（等同于trimLeft）</span>
    <span class="token comment">//  trimEnd（等同于trimRight）</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"字符串清除首尾空白"</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// hello</span>


    <span class="token comment">// 字符串替换</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"字符串替换"</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token string">"o"</span><span class="token punctuation">,</span> <span class="token string">"O"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>       <span class="token comment">// 只替换一次</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">"o"</span><span class="token punctuation">,</span> <span class="token string">"O"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 全部替换</span>

    <span class="token comment">// 字符串分割</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"字符串分割"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// 如果省略分割符，那么返回 ["hello world!"]</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">" "</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 指定为空格，   那么返回 ["hello", "world!"]</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 指定为空字符串，那么返回 ["h", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d", "!"]</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="_3布尔值" tabindex="-1"><a class="header-anchor" href="#_3布尔值" aria-hidden="true">#</a> ③布尔值</h3>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true "boolean"</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false "boolean"</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="_4undefined" tabindex="-1"><a class="header-anchor" href="#_4undefined" aria-hidden="true">#</a> ④undefined</h3>
<ul>
<li>undefined既是类型，也是值，这种类型的值也只有它自己一个</li>
<li>undefined是值得时候，比如 一个变量已声明未赋值的情况下，变量声明提升情况下</li>
</ul>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 变量只声明未赋值 <span class="token operator">--</span><span class="token operator">></span>
    <span class="token keyword">var</span> a<span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>         <span class="token comment">// 值为undefined</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> a<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 类型为undefined</span>

    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 变量声明提升 <span class="token operator">--</span><span class="token operator">></span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="_5null" tabindex="-1"><a class="header-anchor" href="#_5null" aria-hidden="true">#</a> ⑤null</h3>
<ul>
<li><code v-pre>null</code>是一个值，类型为<code v-pre>object</code>，代表空对象</li>
<li>当我们需要将对象销毁、数组销毁、或者删除监听事件时，通常将它们设置为<code v-pre>null</code></li>
</ul>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// [1, 1, 1]</span>
    a <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// null</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="基本数据类型显式转换" tabindex="-1"><a class="header-anchor" href="#基本数据类型显式转换" aria-hidden="true">#</a> 基本数据类型显式转换</h3>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// 转数字</span>
    <span class="token comment">//①通用转数字</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"基本数据类型转数字：Number"</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Number</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span> <span class="token function">Number</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>               <span class="token comment">// 123 "number"</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Number</span><span class="token punctuation">(</span><span class="token string">'abc'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span> <span class="token function">Number</span><span class="token punctuation">(</span><span class="token string">'abc'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>           <span class="token comment">// NaN "number"</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Number</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span> <span class="token function">Number</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>             <span class="token comment">// 1 "number"</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Number</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span> <span class="token function">Number</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// NaN "number"</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Number</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span> <span class="token function">Number</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>             <span class="token comment">// 0 "number"，这个需要注意一下，null会转为0</span>

    <span class="token comment">//②parseInt() 将字符串转为整数，直接截断，不是四舍五入的</span>
    <span class="token comment">//  字符串必须以数字开头，否则会转为NaN</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"字符串转数字：parseInt"</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token string">"3.14"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>             <span class="token comment">// 3</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token string">"3.14是圆周率"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// 3</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token string">"圆周率是3.14"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// NaN</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token string">"3.999"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>           <span class="token comment">// 3，不是四舍五入的</span>

    <span class="token comment">// ③parseFloat() 将字符串转为小数</span>
    <span class="token comment">// 规则同parseInt()</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"字符串转浮点数：parseFloat"</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">parseFloat</span><span class="token punctuation">(</span><span class="token string">"3.1415926"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>              <span class="token comment">// 3.1415926</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">parseFloat</span><span class="token punctuation">(</span><span class="token string">"3.1415926是圆周率"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>       <span class="token comment">// 3.1415926</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">parseFloat</span><span class="token punctuation">(</span><span class="token string">"圆周率3.1415926"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token comment">// NaN</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">parseFloat</span><span class="token punctuation">(</span><span class="token string">"3.999"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                 <span class="token comment">// 3.999</span>
    <span class="token comment">// 如果想指定保留几位小数，使用toFixed()，前面代码已经提到过了</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">parseFloat</span><span class="token punctuation">(</span><span class="token string">"3.1415926"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toFixed</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 3.142</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">parseFloat</span><span class="token punctuation">(</span><span class="token string">"3.14"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toFixed</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>       <span class="token comment">// 3.140</span>

    <span class="token comment">// 转字符串</span>
    <span class="token comment">//①通用转字符串</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"基本数据类型转字符串：String"</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span> <span class="token function">String</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>               <span class="token comment">// 123 string</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span> <span class="token function">String</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>           <span class="token comment">// false string</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span> <span class="token function">String</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// undefined string</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span> <span class="token function">String</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>             <span class="token comment">// null string</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token number">NaN</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span> <span class="token function">String</span><span class="token punctuation">(</span><span class="token number">NaN</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>               <span class="token comment">// NaN string</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token number">2e3</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span> <span class="token function">String</span><span class="token punctuation">(</span><span class="token number">2e3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>               <span class="token comment">// 2000 string，这里是2000，注意一下</span>

    <span class="token comment">// ②使用.toString()方法</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"对象.toString()方法转为字符串"</span><span class="token punctuation">)</span>
    <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">123</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span> a<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>             <span class="token comment">// 变量值是数字的话，直接转 123 string</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span> <span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// 直接写的数字的话，需要使用小括号括起来 123 string</span>

    <span class="token comment">// 转布尔值</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"基本数据类型转布尔值：Boolean"</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token string">"false"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// true</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token string">" "</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// true</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>       <span class="token comment">// true，注意：空列表为true</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token comment">// false</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token number">NaN</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// false</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>       <span class="token comment">// false</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// false</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="基本数据类型隐式转换" tabindex="-1"><a class="header-anchor" href="#基本数据类型隐式转换" aria-hidden="true">#</a> 基本数据类型隐式转换</h3>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// +</span>
    <span class="token comment">// 如果一边有字符串，那么转换另外一边为字符串；</span>
    <span class="token comment">// 如果一边有数字，那么转换另外一边为数字；</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"+ 运算符转换规则"</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"a"</span> <span class="token operator">+</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>       <span class="token comment">// afalse</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"a"</span> <span class="token operator">+</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// aundefined</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"a"</span> <span class="token operator">+</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token comment">// anull</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"a"</span> <span class="token operator">+</span> <span class="token number">123</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token comment">// a123</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"a"</span> <span class="token operator">+</span> <span class="token number">Infinity</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// aInfinity</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">123</span> <span class="token operator">+</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>       <span class="token comment">// 123</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">123</span> <span class="token operator">+</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token comment">// 124</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">123</span> <span class="token operator">+</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token comment">// 123, null会转为0</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">123</span> <span class="token operator">+</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// NaN, undefined会转为NaN</span>

    <span class="token comment">// - * / %</span>
    <span class="token comment">// 会将两边不是数字类型的都转为数字类型</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"- * / % 运算符转换规则"</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"123"</span> <span class="token operator">-</span> <span class="token string">"100"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// 23</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"123"</span> <span class="token operator">*</span> <span class="token string">"100"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// 12300</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"123"</span> <span class="token operator">/</span> <span class="token string">"100"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// 1.23</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"123"</span> <span class="token operator">%</span> <span class="token string">"100"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// 23</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"123"</span> <span class="token operator">-</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// 123, null会转为0</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"123"</span> <span class="token operator">-</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// NaN, undefined会转为NaN</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"123"</span> <span class="token operator">-</span> <span class="token number">Infinity</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// -Infinity</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="赋值运算符" tabindex="-1"><a class="header-anchor" href="#赋值运算符" aria-hidden="true">#</a> 赋值运算符</h3>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a <span class="token operator">=</span> a <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2，这个操作输出a+1的值，同时再把a+1的值赋值给a</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>         <span class="token comment">// 2</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="判断表达式" tabindex="-1"><a class="header-anchor" href="#判断表达式" aria-hidden="true">#</a> 判断表达式</h3>
<div class="language-java ext-java"><pre v-pre class="language-java"><code><span class="token generics"><span class="token punctuation">&lt;</span>script<span class="token punctuation">></span></span>
    <span class="token comment">// ==  用来判断值是否相等</span>
    <span class="token comment">// === 用来判断值和类型是否都相等</span>
    <span class="token keyword">var</span> a <span class="token operator">=</span> undefined<span class="token punctuation">;</span>
    <span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a <span class="token operator">==</span><span class="token operator">=</span> undefined<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b <span class="token operator">==</span><span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// true</span>


    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a <span class="token operator">==</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// true</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a <span class="token operator">==</span><span class="token operator">=</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// false</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="逻辑表达式" tabindex="-1"><a class="header-anchor" href="#逻辑表达式" aria-hidden="true">#</a> 逻辑表达式</h3>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code>非   <span class="token operator">!</span>
与   <span class="token operator">&amp;</span>
或   <span class="token operator">||</span>
 
小技巧：可以用 <span class="token operator">!</span><span class="token operator">!</span>值 来求得值的布尔属性<span class="token punctuation">,</span>和Boolean函数效果相同
</code></pre></div><h3 id="空值合并操作符" tabindex="-1"><a class="header-anchor" href="#空值合并操作符" aria-hidden="true">#</a> 空值合并操作符??</h3>
<p><code v-pre>??</code>和<code v-pre>||</code>很像，下面对比来说一下</p>
<p><code v-pre>||</code>：当左侧为假时返回右侧的值，否则返回左侧的值</p>
<p><code v-pre>??</code>：当左侧的值为null 或者 undefined 时返回右侧的值，否则返回左侧的值</p>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token comment">// 当我们取值的时候很多时候会给一个默认值，这时候他们的差异就很明显了</span>
<span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token literal-property property">retry</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> retry1 <span class="token operator">=</span> config<span class="token punctuation">.</span>retry <span class="token operator">||</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> retry2 <span class="token operator">=</span> config<span class="token punctuation">.</span>retry <span class="token operator">??</span> <span class="token number">3</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>retry1<span class="token punctuation">)</span><span class="token punctuation">;</span>	<span class="token comment">// 3</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>retry2<span class="token punctuation">)</span><span class="token punctuation">;</span>	<span class="token comment">// 0</span>
</code></pre></div><h3 id="可选链操作符" tabindex="-1"><a class="header-anchor" href="#可选链操作符" aria-hidden="true">#</a> 可选链操作符?.</h3>
<p>如果一个对象层次很深，并且属性值是否存在不固定，那么获取起来就很麻烦</p>
<p>使用<code v-pre>?.</code>可以方便的获取，并且不会报错</p>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> user <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// console.log(user.address.city);</span>
<span class="token comment">// 这会报错,因为user.address的值为undefined，此时再取.city属性就会报错，报错信息如下:</span>
<span class="token comment">// VM128:1 Uncaught TypeError: Cannot read property 'city' of undefined</span>
<span class="token comment">//    at &lt;anonymous>:1:26</span>

<span class="token comment">// 使用?.就可以很高效的解决报错的问题</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>user<span class="token operator">?.</span>address<span class="token operator">?.</span>city<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// undefined</span>
<span class="token keyword">let</span> city <span class="token operator">=</span> user<span class="token operator">?.</span>address<span class="token operator">?.</span>city <span class="token operator">??</span> <span class="token string">'未知'</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>city<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 未知</span>
</code></pre></div><h3 id="void运算符" tabindex="-1"><a class="header-anchor" href="#void运算符" aria-hidden="true">#</a> void运算符</h3>
<p><code v-pre>void </code>是运算符，语法：<code v-pre>void expression</code>，但是一般表达式都写上小括号</p>
<p><code v-pre>void</code>对任何值都返回<code v-pre>undefined</code></p>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// void 对任何值都返回undefined</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token punctuation">(</span><span class="token string">"123"</span> <span class="token operator">+</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">function</span> <span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"点击函数"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token punctuation">(</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 为了防止html中的a标签跳转，一般都会使用void让a标签成为死链接</span>
    <span class="token keyword">var</span> eleA <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">"a"</span><span class="token punctuation">)</span>
    eleA<span class="token punctuation">.</span>innerText <span class="token operator">=</span> <span class="token string">"百度"</span><span class="token punctuation">;</span>
    eleA<span class="token punctuation">.</span>href <span class="token operator">=</span> <span class="token string">"javascript:void(0);"</span>
    document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>eleA<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h2 id="复杂数据类型" tabindex="-1"><a class="header-anchor" href="#复杂数据类型" aria-hidden="true">#</a> 复杂数据类型</h2>
<p>复杂的数据类型都是引用类型</p>
<p>引用类型使用相等判断的时候，是判断地址是否相同，比如 <code v-pre>alert([] == []); // false</code></p>
<p>引用类型：<code v-pre>Array</code>、<code v-pre>Object</code>、<code v-pre>Function</code>、<code v-pre>Regexp</code></p>
<p><strong>数据类型简单对比</strong></p>
<table>
<thead>
<tr>
<th>数据类型</th>
<th>举例</th>
<th>当var a = b变量赋值时</th>
<th>当用==比较时</th>
</tr>
</thead>
<tbody>
<tr>
<td>基本数据类型</td>
<td>数字、字符串、布尔、undefined</td>
<td>内存中产生新的副本，新老副本彼此互不干扰</td>
<td>比较值是否相等</td>
</tr>
<tr>
<td>引用数据类型</td>
<td>数组、对象</td>
<td>内存中不产生新的副本，而是让新老变量指向同一个对象</td>
<td>比较内存地址是否相等</td>
</tr>
</tbody>
</table>
<h3 id="数组" tabindex="-1"><a class="header-anchor" href="#数组" aria-hidden="true">#</a> 数组</h3>
<p>文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from</p>
<h3 id="数组定义" tabindex="-1"><a class="header-anchor" href="#数组定义" aria-hidden="true">#</a> 数组定义</h3>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// 数组定义</span>
    <span class="token keyword">var</span> arr1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token comment">// [1, 2, 3, 4, 5]</span>

    <span class="token keyword">var</span> arr2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// [1, 2, 3, 4, 5]</span>

    <span class="token keyword">var</span> arr3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 数组长度为5</span>
    <span class="token comment">// [empty × 5]，实际上是5个undefined，可以通过.fill(null)来填充数据，null可以换成任意数据</span>

    <span class="token comment">// Array.from()，数组来自其他数据，浅拷贝</span>
    <span class="token comment">// 如果指定了第二个参数，新数组中的每个元素会执行该回调函数</span>
    <span class="token keyword">var</span> arr4 <span class="token operator">=</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// ['f', 'o', 'o']</span>
    <span class="token keyword">var</span> arr5 <span class="token operator">=</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">,</span> <span class="token parameter">x</span> <span class="token operator">=></span> x<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// ['f', 'o', 'o']</span>

    <span class="token comment">// 有趣的例子-序列生成器</span>
    <span class="token comment">// const range = (start, stop, step) => Array.from({length: (stop - start) / step + 1}, (_, i) => start + (i * step));</span>
    <span class="token comment">// console.log(range(-5, 2, 1));</span>
    <span class="token comment">// [-5, -4, -3, -2, -1, 0, 1, 2]</span>
    <span class="token comment">// 上面例子不太好维护，改写一下</span>
    <span class="token keyword">function</span> <span class="token function">range</span><span class="token punctuation">(</span><span class="token parameter">start<span class="token punctuation">,</span> stop<span class="token punctuation">,</span> step</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        arrayLike <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">length</span><span class="token operator">:</span> <span class="token punctuation">(</span>stop <span class="token operator">-</span> start<span class="token punctuation">)</span> <span class="token operator">/</span> step <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">}</span>
        <span class="token function-variable function">mapFn</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">_<span class="token punctuation">,</span> v</span><span class="token punctuation">)</span> <span class="token operator">=></span> start <span class="token operator">+</span> <span class="token punctuation">(</span>v <span class="token operator">*</span> step<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>arrayLike<span class="token punctuation">,</span> mapFn<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">range</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// [-5, -4, -3, -2, -1, 0, 1, 2]</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">range</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// [-5, -3, -1, 1]</span>

    <span class="token comment">// 创建数组副本，浅拷贝</span>
    <span class="token keyword">var</span> arr6 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
    <span class="token keyword">var</span> arr7 <span class="token operator">=</span> arr6<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    arr6<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr6<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr7<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="数组使用" tabindex="-1"><a class="header-anchor" href="#数组使用" aria-hidden="true">#</a> 数组使用</h3>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// 数组定义</span>
    <span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">9</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        arr<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 访问 &amp; 查询</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"数组访问"</span><span class="token punctuation">)</span>
    <span class="token comment">// ① 通过下标访问</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 1</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span><span class="token number">8</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 9</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// undefined，不支持负索引</span>
    <span class="token comment">// ②截取数组</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// [1, 2], 0代表开始下标，2代表结束下标</span>
                                    <span class="token comment">// 如果两个参数都不写，那么就会截取整个数组</span>

    <span class="token comment">// ③indexOf() 返回元素在数组中的位置（下标）</span>
    <span class="token comment">//      如果未找到返回-1；如果找到多个，返回第一个</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>                 <span class="token comment">// [1, 2, 3, 4, 5, 6, 7, 8, 9]</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// 0</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token number">88</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// -1</span>

    <span class="token comment">// ④ includes判断数组是否包含某个成员,  第二个参数表示起始位置</span>
    <span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">NaN</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span><span class="token string">"3"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// false</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>       <span class="token comment">// true</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span><span class="token number">NaN</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// true</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// false，第二个参数表示起始位置</span>

    <span class="token comment">// 增加数据</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"数组增加数据"</span><span class="token punctuation">)</span>
    <span class="token comment">// ①在尾部插入数据</span>
    arr<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>           <span class="token comment">// 就地修改</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>       <span class="token comment">// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]</span>
    <span class="token comment">// ②在头部插入数据</span>
    arr<span class="token punctuation">.</span><span class="token function">unshift</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>         <span class="token comment">// 就地修改</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>       <span class="token comment">// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]</span>
    <span class="token comment">//</span>

    <span class="token comment">// 删除数据</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"数组删除数据"</span><span class="token punctuation">)</span>
    <span class="token comment">// ①在尾部删除数据</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// 10，这个10是被删除的元素</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// 9，这个9是被删除的元素</span>
    <span class="token comment">// ②在头部删除数据</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 0,这个0是被删除的元素</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 1,这个1是被删除的元素</span>

    <span class="token comment">// 修改数据</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"数组修改数据"</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// [2, 3, 4, 5, 6, 7, 8]</span>
    arr<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"100"</span>
    arr<span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">9</span><span class="token punctuation">;</span>        <span class="token comment">// 数组本来没有索引为10的</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// [2, "100", 4, 5, 6, 7, 8, empty × 3, 9], 3个empty，实际上是3个undefined</span>

    <span class="token comment">// 其他</span>
    <span class="token comment">// ① 数组和字符串转换</span>
    <span class="token keyword">var</span> s <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>         <span class="token comment">// 1,2,3,4,5；转为字符串，如果第一个参数为空，默认为逗号</span>
    <span class="token keyword">var</span> a <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">','</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 如果参数为空则没有分隔符；如果分隔符为''，那么每个字符都会被单独分割</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>         <span class="token comment">// ["1", "2", "3", "4", "5"]</span>

    <span class="token comment">// ② 数组反转</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [5, 4, 3, 2, 1]，反转数组，就地修改</span>

    <span class="token comment">// ③ 数组排序</span>
    <span class="token comment">// sort需要接受一个函数作为参数，函数返回正数代表需要交换两个数的位置；返回负数表示不需要交换位置</span>
    <span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">33</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">,</span> <span class="token number">55</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    arr<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>a <span class="token operator">></span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// [11, 22, 33, 55]</span>
    <span class="token comment">// sort优化</span>
    arr<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> a <span class="token operator">-</span> b<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// ④ 合并数组</span>
    <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span>
    <span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">]</span>
    <span class="token keyword">var</span> c <span class="token operator">=</span> a<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// [1, 2, 3, 4, 5]</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]</span>

    <span class="token comment">// ⑤筛选和映射(1) - 返回第一个匹配的值</span>
    <span class="token comment">// find()      找到满足条件的一个立即返回其值，不改变原数组，未找到返回undefined</span>
    <span class="token comment">// findIndex() 找到满足条件的一个立即返回其索引，未找到返回undefined</span>
    <span class="token keyword">var</span> arr1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token string">"Hello"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> arr2 <span class="token operator">=</span> arr1<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">value<span class="token punctuation">,</span> index<span class="token punctuation">,</span> array</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> value <span class="token operator">></span> <span class="token number">3</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr2<span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// 4</span>

    <span class="token comment">// ⑤筛选和映射(2) - 利用会遍历每个元素，可以达到筛选的目的</span>
    <span class="token keyword">var</span> arr1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token string">"Hello"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> arr2 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    arr1<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">value<span class="token punctuation">,</span> index<span class="token punctuation">,</span> array</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">>=</span> <span class="token number">4</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            arr2<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr2<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// ⑤筛选和映射(3) - 实现其他语言map的功能</span>
    <span class="token keyword">var</span> arr1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> arr2 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    arr1<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        arr2<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>value <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr1<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// [1, 2, 3]</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr2<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// [2, 4, 6]</span>

<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="数组遍历" tabindex="-1"><a class="header-anchor" href="#数组遍历" aria-hidden="true">#</a> 数组遍历</h3>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"a"</span><span class="token punctuation">,</span> <span class="token string">"b"</span><span class="token punctuation">,</span> <span class="token string">"c"</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token comment">// ① for循环遍历</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// ② forEach，可以代替上面讲的find</span>
    arr<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">value<span class="token punctuation">,</span> index<span class="token punctuation">,</span> arr</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// ③ for..of遍历,内部使用了Iterator机制</span>
    <span class="token comment">// 默认遍历值</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> value <span class="token keyword">of</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 等同于下面代码，.values也可以不写，默认也是值</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> value <span class="token keyword">of</span> arr<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 遍历索引的话，使用arr.keys()</span>
    <span class="token comment">// 遍历索引和值得话，使用arr.entries()</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> <span class="token punctuation">[</span>key<span class="token punctuation">,</span> value<span class="token punctuation">]</span> <span class="token keyword">of</span> arr<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>   <span class="token comment">// 这里也可以用一个值来接受，这个值就是[key, value]</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// ④for..in遍历，遍历索引</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>index <span class="token keyword">in</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="数组浅拷贝和深拷贝" tabindex="-1"><a class="header-anchor" href="#数组浅拷贝和深拷贝" aria-hidden="true">#</a> 数组浅拷贝和深拷贝</h3>
<p>浅拷贝：只拷贝数组的第一层，如果是多维数组，或者数组中的值为引用类型，则不拷贝其他层</p>
<p>深拷贝：拷贝数组所有层，使用递归遍历数组</p>
<p>克隆代码不适用于对象</p>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token keyword">var</span> a1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token comment">// 直接将引用类型赋值一个新变量，不会产生克隆</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"直接赋值，不产生克隆"</span><span class="token punctuation">)</span>
    <span class="token keyword">var</span> a2 <span class="token operator">=</span> a1<span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a2<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 浅克隆</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"遍历数组，浅拷贝"</span><span class="token punctuation">)</span>
    <span class="token keyword">var</span> ret <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> a1<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ret<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>a1<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    ret<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token number">888</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ret<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 深克隆</span>
    <span class="token keyword">function</span> <span class="token function">clone</span><span class="token punctuation">(</span><span class="token parameter">src</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> dst <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> src<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>src<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                dst<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token function">clone</span><span class="token punctuation">(</span>src<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                dst<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>src<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> dst
    <span class="token punctuation">}</span>

    <span class="token comment">// src</span>
    <span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"abc"</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token number">9</span><span class="token punctuation">,</span>
        <span class="token number">100</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span>

    <span class="token comment">// 深克隆</span>
    ret <span class="token operator">=</span> <span class="token function">clone</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span>
    arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">"def"</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ret<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="类数组对象" tabindex="-1"><a class="header-anchor" href="#类数组对象" aria-hidden="true">#</a> 类数组对象</h3>
<p>所有键名为自然序列（从0开始），且有<code v-pre>length</code>属性的对象</p>
<p><code v-pre>arguments</code></p>
<p><code v-pre>NodeList</code>和<code v-pre>HTMLCollection</code></p>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>body<span class="token operator">></span>
<span class="token operator">&lt;</span>div<span class="token operator">></span>
    <span class="token operator">&lt;</span>p name<span class="token operator">=</span><span class="token string">"p1"</span><span class="token operator">></span><span class="token number">1</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>
    <span class="token operator">&lt;</span>p name<span class="token operator">=</span><span class="token string">"p2"</span> id<span class="token operator">=</span><span class="token string">"p2"</span><span class="token operator">></span><span class="token number">2</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>
    <span class="token operator">&lt;</span>p name<span class="token operator">=</span><span class="token string">"p3"</span><span class="token operator">></span><span class="token number">3</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
<span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// NodeList，类数组对象，是文档节点的集合</span>
    <span class="token keyword">var</span> p1 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">'p'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p1<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// NodeList(3) [p, p, p]</span>

    <span class="token comment">// HTMLCollection,类数组对象，是HTML元素的集合</span>
    <span class="token keyword">var</span> p2 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token string">"p"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p2<span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// HTMLCollection(3) [p, p, p]</span>


    <span class="token comment">// ①说他们是类数组对象，是因为没有push()、pop()等方法</span>
    <span class="token comment">// console.log(p1.pop());  // p1.pop is not a function</span>
    <span class="token comment">// console.log(p2.pop());  // p2.pop is not a function</span>

    <span class="token comment">// ②说他们是类数组对象，是因为(1)都可以通过下标访问 (2)都有length方法</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p1<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span> p1<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p2<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span> p2<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p1<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">===</span> p2<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>       <span class="token comment">// true</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p1<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// 3</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p2<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// 3</span>

    <span class="token comment">// 那么他们有什么不同？</span>
    <span class="token comment">// ① 方法上的不同</span>
    <span class="token comment">//  NodeList只能通过索引获取,</span>
    <span class="token comment">//  HTMLCollection可以通过name、id、索引来获取子元素</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p2<span class="token punctuation">.</span><span class="token function">namedItem</span><span class="token punctuation">(</span><span class="token string">"p2"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 通过name获取，获取不到返回null</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p2<span class="token punctuation">.</span>p2<span class="token punctuation">)</span><span class="token punctuation">;</span>                 <span class="token comment">// 通过Id获取，获取不到返回undefined</span>

    <span class="token comment">// ② 可包含的节点类型不同</span>
    <span class="token comment">// 节点类型   说明</span>
    <span class="token comment">//  1        元素节点</span>
    <span class="token comment">//  2        属性节点</span>
    <span class="token comment">//  3        文本节点</span>
    <span class="token comment">// NodeList可以包含任何节点类型，</span>
    <span class="token comment">// HTMLCollection只包含元素节点（ElementNode）</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p1<span class="token punctuation">.</span>childNodes<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 这个不知道咋测试.</span>

    <span class="token comment">// ③都是动态的（例外：querySelectorAll）</span>
    <span class="token comment">// 这个需要补充</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>body<span class="token operator">></span>
</code></pre></div><h3 id="集合" tabindex="-1"><a class="header-anchor" href="#集合" aria-hidden="true">#</a> 集合</h3>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// 定义一个set：无序、成员不能重复的集合</span>
    <span class="token keyword">var</span> set <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>set<span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// Set(0) {}</span>
 
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// Set(2) {1, 2},还支持 arguments、NodeList、字符串、Set作为参数传入</span>
 
    <span class="token comment">// 添加成员</span>
    set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"Hello"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>              <span class="token comment">// 重复添加不会报错</span>
    set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"Hello"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 可以写成这种链式添加</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>set<span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token comment">// Set(2) {1, "Hello"}</span>
 
    <span class="token comment">// 删除成员</span>
    set<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string">"Hello"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 删除成员</span>
    set<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token number">99999</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// 删除不存在的成员，也不会报错</span>
    <span class="token comment">// set.clear()             // 全部清空</span>
 
    <span class="token comment">// 判断是否含有某个成员</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>set<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// true</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>set<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span><span class="token number">111</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// false</span>
 
    <span class="token comment">/* 遍历 - forEach
             函数原型：forEach(回调函数(value, key), 回调中的this指向)
             注意事项：forEach是按照成员添加进集合的顺序遍历的
     */</span>
    set<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">value<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// set中，key == value</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
 
    <span class="token comment">// 成员个数(这个是属性，不是方法)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>set<span class="token punctuation">.</span>size<span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// 2</span>
 
    <span class="token comment">// 应用 - 转为数组</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token operator">...</span>set<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// [1, 2]</span>
     
    <span class="token comment">/*
        重复值判断依据
            Set对重复值的判断遵循严格相等(===)，但是NaN比较特殊，在Set中NaN等于NaN
        什么时候使用Set
            1.数组去重
            2.不需要通过下标访问，只需要遍历
     */</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="map" tabindex="-1"><a class="header-anchor" href="#map" aria-hidden="true">#</a> Map</h3>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// 定义一个Map</span>
    <span class="token keyword">const</span> m <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> m1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"Serry"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">"age"</span><span class="token punctuation">,</span> <span class="token number">21</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 必须传二维数组,二维Set等</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>m1<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
    <span class="token comment">// 添加数据</span>
    m<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"bob"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"age"</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>m<span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// {"name" => "bob", "age" => 20}，如果有重复键，会覆盖值</span>
 
 
    <span class="token comment">// 获取成员</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">//  bob</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"name1"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">//  undefined，该键不存在</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span><span class="token string">"abc"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>       <span class="token comment">//  false, 判断键是否存在于Map中</span>
 
 
    <span class="token comment">// 删除数据</span>
    m<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string">"age"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                <span class="token comment">// 删除k-v</span>
    m<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string">"age"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                <span class="token comment">// 删除不存在的k-v，也不会报错</span>
    <span class="token comment">// m.clear()                       // 全部删除</span>
 
    <span class="token comment">/* 遍历 - forEach
             函数原型：forEach(回调函数(value, key), 回调中的this指向)
             注意事项：forEach是按照成员添加进映射的顺序遍历的
     */</span>
    m<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"bob"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"age"</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    m<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">value<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
 
    <span class="token comment">// 映射长度（这个是属性，不是方法）</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span>size<span class="token punctuation">)</span><span class="token punctuation">;</span>
     
    <span class="token comment">/*
        判断成员是否重复原理
            和Set类似，遵循key严格相等（===），但是NaN例外
 
     */</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="iterator" tabindex="-1"><a class="header-anchor" href="#iterator" aria-hidden="true">#</a> Iterator</h3>
<h3 id="iterator概念" tabindex="-1"><a class="header-anchor" href="#iterator概念" aria-hidden="true">#</a> Iterator概念</h3>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token comment">// 定义Iterator</span>
<span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>                 <span class="token comment">// 定义数组</span>
<span class="token keyword">const</span> it <span class="token operator">=</span> arr<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 定义数组的Iterator</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>it<span class="token punctuation">)</span><span class="token punctuation">;</span>                    <span class="token comment">// Array Iterator {}</span>
 
<span class="token comment">// 使用Iterator</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>             <span class="token comment">// {value: 1, done: false}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>             <span class="token comment">// {value: 2, done: false}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>             <span class="token comment">// {value: undefined, done: true}</span>
 
<span class="token comment">/*
    解惑
        （1）为什么需要Iterator?
            提供统一的遍历方式
        （2）如何更方便使用Iterator?
            自己使用：Symbol.iterator -> it -> next()
            一般我们不直接使用上面方式，而是使用由Iterator封装好的方式，比如for..of遍历方式
 */</span>
</code></pre></div><h3 id="iterator-for-of遍历" tabindex="-1"><a class="header-anchor" href="#iterator-for-of遍历" aria-hidden="true">#</a> Iterator for..of遍历</h3>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>                 <span class="token comment">// 定义数组</span>
 
    <span class="token comment">// for...of循环 - 内部使用了Iterator机制</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> item <span class="token keyword">of</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// 1 2</span>
    <span class="token punctuation">}</span>
 
    <span class="token comment">// for..of遍历数组索引</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> index <span class="token keyword">of</span> arr<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
 
    <span class="token comment">// for..of遍历数组值</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> v <span class="token keyword">of</span> arr<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>   <span class="token comment">// .values也可以不写，默认也是值</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
 
    <span class="token comment">// for..of遍历数组索引和值</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> item <span class="token keyword">of</span> arr<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>          <span class="token comment">// 返回一个数组[index, value]</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 优化</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> <span class="token punctuation">[</span>key<span class="token punctuation">,</span> value<span class="token punctuation">]</span> <span class="token keyword">of</span> arr<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">/*
        什么是可遍历?
            只要有Symbol.iterator方法，并且这个方法可以生成可遍历对象，就是可遍历的，比如数组
            只要可遍历，就可以使用for..of来遍历
 
        什么是可遍历对象？
            待补充
            有next()方法，返回 {value: xx, done: boolean}
 
        原生可遍历对象？
            数组
            字符串
            Set
            Map
            arguments
            NodeList
 
        非原生可遍历对象？
            一般的对象
            有length属性和索引属性的对象
 
     */</span>
 
    <span class="token comment">// 给一般对象增加可遍历方法</span>
    <span class="token comment">// 需要自己手写Symbol.iterator方法</span>
 
    <span class="token comment">// 给有length属性和索引属性的对象增加可遍历方法</span>
    obj <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token number">0</span><span class="token operator">:</span> <span class="token string">"Bob"</span><span class="token punctuation">,</span>
        <span class="token number">1</span><span class="token operator">:</span> <span class="token string">"男"</span><span class="token punctuation">,</span>
        <span class="token literal-property property">length</span><span class="token operator">:</span> <span class="token number">2</span>
    <span class="token punctuation">}</span>
    obj<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">;</span>    <span class="token comment">// 给普通对象添加Symbol.iterator，这是一种偷懒的做法</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>item <span class="token keyword">of</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
 
 
    <span class="token comment">// 将对象转为数组形式遍历</span>
    <span class="token keyword">var</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"Bob"</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">22</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> item <span class="token keyword">of</span> Object<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span>obj1<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">/*
        ["name", "Bob"]
        ["age", 22]
     */</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h2 id="流程控制" tabindex="-1"><a class="header-anchor" href="#流程控制" aria-hidden="true">#</a> 流程控制</h2>
<h3 id="if" tabindex="-1"><a class="header-anchor" href="#if" aria-hidden="true">#</a> if</h3>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token keyword">var</span> n <span class="token operator">=</span> <span class="token function">Number</span><span class="token punctuation">(</span><span class="token function">prompt</span><span class="token punctuation">(</span><span class="token string">'请输入一个数字'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isNaN</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"请输入一个数字!"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"偶数"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"奇数"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
 
扩展：
    单行<span class="token keyword">if</span>语句
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token number">2</span><span class="token operator">></span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"2>1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="switch" tabindex="-1"><a class="header-anchor" href="#switch" aria-hidden="true">#</a> switch</h3>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token keyword">var</span> n <span class="token operator">=</span> <span class="token function">Number</span><span class="token punctuation">(</span><span class="token function">prompt</span><span class="token punctuation">(</span><span class="token string">"请输入一个数字"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
 
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span>
        <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span>
        <span class="token keyword">case</span> <span class="token number">3</span><span class="token operator">:</span>
        <span class="token keyword">case</span> <span class="token number">4</span><span class="token operator">:</span>
        <span class="token keyword">case</span> <span class="token number">5</span><span class="token operator">:</span>
        <span class="token keyword">case</span> <span class="token number">6</span><span class="token operator">:</span>
        <span class="token keyword">case</span> <span class="token number">7</span><span class="token operator">:</span>
        <span class="token keyword">case</span> <span class="token number">8</span><span class="token operator">:</span>
        <span class="token keyword">case</span> <span class="token number">9</span><span class="token operator">:</span>
        <span class="token keyword">case</span> <span class="token number">10</span><span class="token operator">:</span>
            <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"小于等于10"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span>
        <span class="token keyword">case</span> <span class="token number">11</span><span class="token operator">:</span>
            <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"等于11"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span>
        <span class="token keyword">default</span><span class="token operator">:</span>
            <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"未知数字"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="三元运算符" tabindex="-1"><a class="header-anchor" href="#三元运算符" aria-hidden="true">#</a> 三元运算符</h3>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token keyword">var</span> age <span class="token operator">=</span> <span class="token number">24</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> type <span class="token operator">=</span> age <span class="token operator">></span> <span class="token number">18</span> <span class="token operator">?</span> <span class="token string">"成年人"</span> <span class="token operator">:</span> <span class="token string">"未成年人"</span>
    <span class="token function">alert</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="for循环" tabindex="-1"><a class="header-anchor" href="#for循环" aria-hidden="true">#</a> for循环</h3>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token keyword">var</span> n <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>n <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
        n<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="while" tabindex="-1"><a class="header-anchor" href="#while" aria-hidden="true">#</a> while</h3>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token keyword">var</span> n <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>n <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
        n<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="do-while" tabindex="-1"><a class="header-anchor" href="#do-while" aria-hidden="true">#</a> do-while</h3>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// 先执行循环体，然后测试条件是否满足；至少会执行一次循环体</span>
 
    <span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">do</span> <span class="token punctuation">{</span>
        i<span class="token operator">++</span>
    <span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
    <span class="token function">alert</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 10</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="辅助语句" tabindex="-1"><a class="header-anchor" href="#辅助语句" aria-hidden="true">#</a> <strong>辅助语句</strong></h3>
<p>continue</p>
<p>break</p>
<h2 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h2>
<h3 id="定义和调用" tabindex="-1"><a class="header-anchor" href="#定义和调用" aria-hidden="true">#</a> 定义和调用</h3>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// 普通定义</span>
    <span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
 
    <span class="token comment">// 匿名函数</span>
    <span class="token keyword">var</span> <span class="token function-variable function">fun</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
 
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">fun</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="函数变量声明提升" tabindex="-1"><a class="header-anchor" href="#函数变量声明提升" aria-hidden="true">#</a> 函数变量声明提升</h3>
<ul>
<li>使用普通定义的函数可以声明提升，函数可以正常调用；使用匿名定义的函数不能函数提升，会引发错误；</li>
<li>函数变量声明提升，优先于变量声明提升</li>
</ul>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token function">fun</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 输出B，函数声明提升优先于变量声明提升</span>

    <span class="token comment">// 定义匿名函数 fun</span>
    <span class="token keyword">var</span> <span class="token function-variable function">fun</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"A"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 定义普通函数 fun</span>
    <span class="token keyword">function</span> <span class="token function">fun</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"B"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">fun</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 输出A，函数fun提升上去以后，又被匿名函数覆盖，所以输出A</span>

<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="函数参数" tabindex="-1"><a class="header-anchor" href="#函数参数" aria-hidden="true">#</a> 函数参数</h3>
<h4 id="默认参数" tabindex="-1"><a class="header-anchor" href="#默认参数" aria-hidden="true">#</a> 默认参数</h4>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">/*
        函数参数默认值
        只有不传参数或明确传undefined的时候，默认值才会生效
     */</span>
    <span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y <span class="token operator">=</span> <span class="token number">100</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>y<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 101</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 101</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 数据类型隐式转换，null会转为0，所以结果是1</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h4 id="形参和实参" tabindex="-1"><a class="header-anchor" href="#形参和实参" aria-hidden="true">#</a> 形参和实参</h4>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
 
    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>       <span class="token comment">// 3</span>
    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 3, 第三个参数将丢弃</span>
    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>          <span class="token comment">// NaN，第二个参数内部为undefined</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h4 id="剩余参数" tabindex="-1"><a class="header-anchor" href="#剩余参数" aria-hidden="true">#</a> 剩余参数</h4>
<p>https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Rest_parameters</p>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">/*
        ...变量 表示剩余参数，变量在函数内部为数组
     */</span>

    <span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>items</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> items<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// object</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>items<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
        <span class="token keyword">let</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> items<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            sum <span class="token operator">+=</span> items<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> sum<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 6</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">,</span> <span class="token number">315</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 615</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h4 id="arguments参数" tabindex="-1"><a class="header-anchor" href="#arguments参数" aria-hidden="true">#</a> arguments参数</h4>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">/*
        arguments
            函数内arguments代表函数接收到的实参列表，是一个类数组对象
        类数组对象
            可以使用下标访问对象的某个属性，有length属性，但是没有数组的方法
     */</span>

    <span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arguments<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            sum <span class="token operator">+=</span> arguments<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> sum<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>	<span class="token comment">// 6</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 45</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="iife-立即调用函数表达式" tabindex="-1"><a class="header-anchor" href="#iife-立即调用函数表达式" aria-hidden="true">#</a> <code v-pre>IIFE</code>（立即调用函数表达式）</h3>
<p>文档：https://developer.mozilla.org/zh-CN/docs/Glossary/IIFE</p>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">/*
        IIFE
            IIFE是一种特殊的JavaScript函数写法，函数一旦定义，立即执行
        IIFE的作用总结
            见代码示例
     */</span>

    <span class="token comment">// 先定义一个普通函数，执行函数需要调用hello1()</span>
    <span class="token keyword">function</span> <span class="token function">hello1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> test <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Hello JavaScript!"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 将它改为IIFE立即执行写法(函数外边包一层括号，然后再函数调用)</span>
    <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">hello2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Hello python!"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>


    <span class="token comment">/* 作用1：为变量赋值 */</span>
    <span class="token keyword">var</span> age <span class="token operator">=</span> <span class="token number">12</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> sex <span class="token operator">=</span> <span class="token string">"男"</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> tag <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>age <span class="token operator">&lt;</span> <span class="token number">18</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token string">'小朋友'</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>sex <span class="token operator">===</span> <span class="token string">"男"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token string">'先生'</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>sex <span class="token operator">===</span> <span class="token string">"女"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token string">'女士'</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>tag<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 除了这种方式 利用函数直接为变量赋值，我想不到其他方式了</span>
    <span class="token comment">// 和Python的property装饰器作用有些类似</span>

    <span class="token comment">/* 作用2：将全局变量改为局部变量 */</span>
    <span class="token comment">// 先来看一个题目</span>
    <span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        arr<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">alert</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    arr<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 应该输出多少?</span>

    <span class="token comment">// 解决办法1：将for循环中的var改为let，原理是：将i由全局变量修改为块级作用域变量</span>
    <span class="token comment">// 解决办法2：使用IIFE</span>
    <span class="token keyword">var</span> arr2 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">j</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            arr2<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">alert</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    arr2<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 3</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="箭头函数" tabindex="-1"><a class="header-anchor" href="#箭头函数" aria-hidden="true">#</a> 箭头函数</h3>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// 定义箭头函数</span>
    <span class="token keyword">const</span> <span class="token function-variable function">add</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
 
    <span class="token comment">// 注意事项</span>
    <span class="token comment">// (1) 单个参数【可以】省略圆括号；无参数或多个参数【不可以】省略圆括号</span>
    <span class="token keyword">const</span> <span class="token function-variable function">add2</span> <span class="token operator">=</span> <span class="token parameter">x</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> x <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">add2</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
    <span class="token comment">// (2) 单行函数体可以省略{}和return语句，注意{}和return要么不去，要么同时去掉；多行函数体不可以省略{}和return</span>
    <span class="token keyword">const</span> <span class="token function-variable function">add3</span> <span class="token operator">=</span> <span class="token parameter">x</span> <span class="token operator">=></span> x <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">add3</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
    <span class="token comment">// (3) 如果箭头函数返回单行对象，可以在{}外边加上()，让浏览器不再认为那是函数的{}</span>
    <span class="token keyword">const</span> <span class="token function-variable function">add4</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">value</span><span class="token operator">:</span> x <span class="token operator">+</span> y
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">add4</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 优化一下</span>
    <span class="token keyword">const</span> <span class="token function-variable function">add5</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">value</span><span class="token operator">:</span> x <span class="token operator">+</span> y
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">add5</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
 
    <span class="token comment">// (4)箭头函数没有arguments，可以使用剩余参数代替</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="箭头函数this指向" tabindex="-1"><a class="header-anchor" href="#箭头函数this指向" aria-hidden="true">#</a> 箭头函数this指向</h3>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// "use strict";</span>
 
    <span class="token comment">// 箭头函数没有自己的this</span>
    <span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token function-variable function">add</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    obj<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
    <span class="token comment">/*
        分析：
            (1) add是一个箭头函数，所以add本身没有this
            (2) 本身没有，会向外找，obj是一个对象，没有自己的作用域，所以会找到全局的this
            (3) 全局this是window，所以最后输出是window对象
     */</span>
 
 
    <span class="token keyword">const</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token function-variable function">add</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> <span class="token function-variable function">addr</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">;</span>
            <span class="token function">addr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
 
    obj1<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">/*
        分析：
            add是个函数，定义了一个箭头函数addr,然后在调用addr函数
            addr是箭头函数，没有自己的this，会向外找，找到function中的this，
            function也就是add,add通过obj1调用，所以这个this就是obj1
     */</span> 
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h2 id="面向对象基础" tabindex="-1"><a class="header-anchor" href="#面向对象基础" aria-hidden="true">#</a> 面向对象基础</h2>
<h3 id="对象定义" tabindex="-1"><a class="header-anchor" href="#对象定义" aria-hidden="true">#</a> 对象定义</h3>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">/*
        1、person是一个对象，对象使用{}来表示
        2、name对象的属性, "bob"是他的值，age也一样
        3、每个键值对之间使用逗号分割，最后一个键值对可以不写逗号
        4、属性可以加引号，也可以不加引号，区别是：
            如果属性符合JS标识符命名规范可以不加引号，反之要加引号

        5、属性值可以是一个函数，这成为对象的方法，通过 对象.方法() 来调用
        6、属性名和值一样的情况下，可以只写一个
     */</span>
    <span class="token keyword">var</span> person <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"bob"</span><span class="token punctuation">,</span>
        <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span>
        <span class="token string-property property">"favorite-books"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"西游记"</span><span class="token punctuation">,</span> <span class="token string">"红楼梦"</span><span class="token punctuation">,</span> <span class="token string">"三国演义"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token function-variable function">say</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token string">"hello"</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span><span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token string">"1"</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token punctuation">{</span>a<span class="token punctuation">}</span><span class="token punctuation">;</span>  <span class="token comment">// 等同于 const b = {a: a}，这是一种简写形式</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// {a: "1"}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="对象访问和删除" tabindex="-1"><a class="header-anchor" href="#对象访问和删除" aria-hidden="true">#</a> 对象访问和删除</h3>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">/*
        属性访问
            1、可以使用 对象.属性 访问属性值
            2、也可以使用 对象['属性'] 来访问，注意[]内是一个字符串
            3、还可以使用 对象[属性变量] 来访问，换句话说，当要使用属性变量去访问对象属性时，必须使用[]

        属性删除
            属性删除使用 delete 对象属性值

     */</span>
    <span class="token keyword">var</span> person <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"bob"</span><span class="token punctuation">,</span>
        <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span>
        <span class="token string-property property">"favorite-books"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"西游记"</span><span class="token punctuation">,</span> <span class="token string">"红楼梦"</span><span class="token punctuation">,</span> <span class="token string">"三国演义"</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'我的名字是'</span><span class="token punctuation">,</span> person<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'我今年'</span><span class="token punctuation">,</span> person<span class="token punctuation">[</span><span class="token string">'age'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">'岁了'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> v <span class="token operator">=</span> <span class="token string">"favorite-books"</span><span class="token punctuation">;</span> <span class="token comment">// 定义一个变量</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'我喜欢看的书包括：'</span><span class="token punctuation">,</span> person<span class="token punctuation">[</span>v<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">delete</span> person<span class="token punctuation">.</span>name<span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 属性不存在不会报错，返回undefined</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="对象遍历" tabindex="-1"><a class="header-anchor" href="#对象遍历" aria-hidden="true">#</a> 对象遍历</h3>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// for..in遍历, item为属性</span>
    <span class="token keyword">var</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"Bob"</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">22</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> item <span class="token keyword">in</span> obj1<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">,</span> obj1<span class="token punctuation">[</span>item<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">/*
        name Bob
        age 22
     */</span>

    <span class="token comment">// for..of遍历-1， item为键值对</span>
    <span class="token keyword">var</span> obj2 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"Bob"</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">22</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> item <span class="token keyword">of</span> Object<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span>obj2<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">/*
        ["name", "Bob"]
        ["age", 22]
     */</span>

    <span class="token comment">// for..of遍历-2，解构item</span>
    <span class="token keyword">var</span> obj3 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"Bob"</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">22</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token punctuation">[</span>k<span class="token punctuation">,</span> v<span class="token punctuation">]</span> <span class="token keyword">of</span> Object<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span>obj2<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>k<span class="token punctuation">,</span> v<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">/*
        name Bob
        age 22
     */</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="对象深克隆" tabindex="-1"><a class="header-anchor" href="#对象深克隆" aria-hidden="true">#</a> 对象深克隆</h3>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token keyword">var</span> user <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"bob"</span><span class="token punctuation">,</span>
        <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">22</span><span class="token punctuation">,</span>
        <span class="token literal-property property">addr</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token string-property property">"provinces"</span><span class="token operator">:</span> <span class="token string">"河北"</span><span class="token punctuation">,</span>
            <span class="token string-property property">"city"</span><span class="token operator">:</span> <span class="token string">"保定"</span><span class="token punctuation">,</span>
            <span class="token string-property property">"county"</span><span class="token operator">:</span> <span class="token string">"XX县"</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// obj1指向user对象，没有克隆</span>
    obj1 <span class="token operator">=</span> user

    <span class="token comment">// 浅克隆：仅克隆第一层结构</span>
    <span class="token keyword">var</span> obj2 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> k <span class="token keyword">in</span> user<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        obj2<span class="token punctuation">[</span>k<span class="token punctuation">]</span> <span class="token operator">=</span> user<span class="token punctuation">[</span>k<span class="token punctuation">]</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 深克隆</span>
    <span class="token keyword">function</span> <span class="token function">deepclone</span><span class="token punctuation">(</span><span class="token parameter">o</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 数组</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">var</span> ret <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> o<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                ret<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token function">deepclone</span><span class="token punctuation">(</span>o<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 对象</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> o <span class="token operator">==</span> <span class="token string">"object"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">var</span> ret <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token keyword">in</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                ret<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">deepclone</span><span class="token punctuation">(</span>o<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 基本类型值</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">var</span> ret <span class="token operator">=</span> o<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    obj3 <span class="token operator">=</span> <span class="token function">deepclone</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
    user<span class="token punctuation">.</span>addr<span class="token punctuation">.</span>city <span class="token operator">=</span> <span class="token string">"石家庄"</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj3<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><blockquote>
<p>当然，还有一种简单的方式</p>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token keyword">var</span> user <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"bob"</span><span class="token punctuation">,</span>
        <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">22</span><span class="token punctuation">,</span>
        <span class="token literal-property property">addr</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token string-property property">"provinces"</span><span class="token operator">:</span> <span class="token string">"河北"</span><span class="token punctuation">,</span>
            <span class="token string-property property">"city"</span><span class="token operator">:</span> <span class="token string">"保定"</span><span class="token punctuation">,</span>
            <span class="token string-property property">"county"</span><span class="token operator">:</span> <span class="token string">"XX县"</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 先转为json，在解析为对象，从而实现深克隆</span>
    obj4 <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    user<span class="token punctuation">.</span>addr<span class="token punctuation">.</span>city <span class="token operator">=</span> <span class="token string">"石家庄"</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj4<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div></blockquote>
<h3 id="常用方法" tabindex="-1"><a class="header-anchor" href="#常用方法" aria-hidden="true">#</a> 常用方法</h3>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// Object.assign() 合并对象</span>
    <span class="token keyword">var</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"Bob"</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">21</span><span class="token punctuation">,</span> <span class="token literal-property property">sex</span><span class="token operator">:</span> <span class="token string">"男"</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> obj2 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"Serry"</span><span class="token punctuation">,</span> <span class="token literal-property property">nickname</span><span class="token operator">:</span> <span class="token string">"se"</span><span class="token punctuation">,</span> <span class="token literal-property property">sex</span><span class="token operator">:</span> <span class="token string">"女"</span><span class="token punctuation">}</span><span class="token punctuation">;</span>


    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> obj1<span class="token punctuation">,</span> obj2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 将obj1和obj2合并到新对象中{}，并返回</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token operator">...</span>obj1<span class="token punctuation">,</span> <span class="token operator">...</span>obj2<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>             <span class="token comment">// 使用展开运算符合并，返回新对象，结果：{name: "Serry", age: 21, sex: "女", nickname: "se"}</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj2<span class="token punctuation">)</span><span class="token punctuation">;</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span>obj1<span class="token punctuation">,</span> obj2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// 这会修改obj1的值，结果：{name: "Serry", age: 21, sex: "女", nickname: "se"}</span>


    <span class="token comment">// Objects.keys()、Objects.values()、Objects.entries() - k、v、k和v，以数组返回</span>
    <span class="token keyword">var</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"Bob"</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">21</span><span class="token punctuation">,</span> <span class="token literal-property property">sex</span><span class="token operator">:</span> <span class="token string">"男"</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>obj1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">//  ["name", "age", "sex"]</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Object<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span>obj1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">//  ["Bob", 21, "男"]</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Object<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span>obj1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">//  [Array(2), Array(2), Array(2)]</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="构造函数-重要★★★" tabindex="-1"><a class="header-anchor" href="#构造函数-重要★★★" aria-hidden="true">#</a> 构造函数（重要★★★）</h3>
<ul>
<li>用<code v-pre>new</code>调用一个函数，这个函数就被称为构造函数，一个函数是不是构造函数，要看这个函数是不是使用<code v-pre>new</code>来调用</li>
<li>构造函数必须使用<code v-pre>new</code>来调用，正因为如此，<span style="color: red;">开发者约定构造函数首字母使用大写</span></li>
</ul>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token keyword">function</span> <span class="token function">People</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> sex</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>sex <span class="token operator">=</span> sex<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    zhagnsan <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">People</span><span class="token punctuation">(</span><span class="token string">"张三"</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token string">"男"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>zhagnsan<span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// People {name: "张三", age: 20, sex: "男"}</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>zhagnsan<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 张三</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> zhagnsan<span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// object</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><blockquote>
<p>但从上面来说，构造函数具体有啥用还看不出来，没关系，看下面函数原型</p>
</blockquote>
<h3 id="函数原型-重要★★★" tabindex="-1"><a class="header-anchor" href="#函数原型-重要★★★" aria-hidden="true">#</a> 函数原型（重要★★★）</h3>
<p>课外资料：https://blog.csdn.net/m0_37846579/article/details/80278092</p>
<h4 id="普通函数原型" tabindex="-1"><a class="header-anchor" href="#普通函数原型" aria-hidden="true">#</a> <strong>普通函数原型</strong></h4>
<ul>
<li>任何函数都有<code v-pre>prototype</code>属性，<code v-pre>prototype</code>翻译过来是【原型】的意思</li>
<li><code v-pre>prototype</code>属性值是个对象，它默认拥有<code v-pre>constructor</code>属性，<code v-pre>constructor</code>属性指向函数本身</li>
</ul>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>add<span class="token punctuation">.</span>prototype<span class="token punctuation">)</span><span class="token punctuation">;</span>         <span class="token comment">// {constructor: ƒ}</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>add<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor <span class="token operator">===</span> add<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>add<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">constructor</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 10</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><p>总结一下就是：<span style="color: red;"><code v-pre>function.prototype.constructor</code>   === <code v-pre>function</code></span></p>
<h4 id="构造函数原型" tabindex="-1"><a class="header-anchor" href="#构造函数原型" aria-hidden="true">#</a> <strong>构造函数原型</strong></h4>
<ul>
<li>普通函数的<code v-pre>prototype</code>属性没有啥作用，而构造函数的<code v-pre>prototype</code>属性非常有用</li>
<li><span style="color: red;">构造函数的<code v-pre>prototype</code>就等于其实例的<code v-pre>__proto__</code>属性，就是其实例的原型</span></li>
</ul>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token keyword">function</span> <span class="token function">People</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> sex</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>sex <span class="token operator">=</span> sex<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 构造函数的prototype就等于其实例的__proto__属性，就是其实例的原型</span>
    <span class="token keyword">const</span> ming <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">People</span><span class="token punctuation">(</span><span class="token string">"小明"</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">,</span> <span class="token string">"男"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">People</span><span class="token punctuation">.</span>prototype <span class="token operator">===</span> ming<span class="token punctuation">.</span>__proto__<span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// true    </span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><p>总结：<span style="color: red;"><code v-pre>function.prototype</code> === <code v-pre>(new function).__proto__</code> === <code v-pre>instance.__proto__</code></span></p>
<h4 id="原型链查找" tabindex="-1"><a class="header-anchor" href="#原型链查找" aria-hidden="true">#</a> <strong>原型链查找</strong></h4>
<ul>
<li><span style="color: red;">实例可以通过打点访问他的原型的属性和方法，这成为原型链查找</span></li>
</ul>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token keyword">function</span> <span class="token function">People</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> sex</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>sex <span class="token operator">=</span> sex<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">say</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"hello world!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 实例化</span>
    <span class="token keyword">const</span> ming <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">People</span><span class="token punctuation">(</span><span class="token string">"小明"</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">,</span> <span class="token string">"男"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 构造函数添加方法</span>
    <span class="token class-name">People</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">eat</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"eat apple"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/* 实例执行其原型方法 */</span>
    ming<span class="token punctuation">.</span>__proto__<span class="token punctuation">.</span><span class="token function">eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// eat apple</span>

    <span class="token comment">/*
        hasOwnProperty 检查对象自己是否"真正"拥有某个属性或方法, 不包含继承来的属性（不检查原型上的属性或方法）
        重点：
            （1）检查的是对象，比如{"a":1}这种，如果检查一个函数，函数内部定义的变量是不会被检查到的
            （2）不包含继承来的属性（不检查原型上的属性或方法）
    */</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'hasOwnProperty检查对象: '</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string-property property">'host'</span><span class="token operator">:</span> <span class="token string">'0.0.0.0'</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    obj<span class="token punctuation">.</span>port <span class="token operator">=</span> <span class="token number">8080</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span><span class="token string">'host'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token comment">// true</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span><span class="token string">'port'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token comment">// true</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span><span class="token string">'toString'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// false, toString是继承自Object的</span>


    <span class="token comment">/*
        hasOwnProperty 检查构造函数和实例
     */</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'hasOwnProperty 构造函数和实例: '</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>People<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span><span class="token string">"sex"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>                           <span class="token comment">// false，这是函数内部的变量，是检查不到的</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">People</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span><span class="token string">'sex'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>                 <span class="token comment">// false，这是函数内部的变量，是检查不到的</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">People</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span><span class="token string">'sex'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>     <span class="token comment">// false，这是函数内部的变量，是检查不到的</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>People<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span><span class="token string">"prototype"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>                     <span class="token comment">// true</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">People</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span><span class="token string">'constructor'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>         <span class="token comment">// true</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ming<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span><span class="token string">"age"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>                             <span class="token comment">// true，函数内部的变量(this.xx)，可以在实例上检查到</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ming<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span><span class="token string">"sex"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>                             <span class="token comment">// true，函数内部的变量(this.xx)，可以在实例上检查到</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ming<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span><span class="token string">"say"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>                             <span class="token comment">// true，函数内部的变量(this.xx)，可以在实例上检查到</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ming<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span><span class="token string">"__proto__"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>                       <span class="token comment">// false,继承来的</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ming<span class="token punctuation">.</span>__proto__<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span><span class="token string">"constructor"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>           <span class="token comment">// true, constructor是原型自己的属性</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h4 id="定义原型方法" tabindex="-1"><a class="header-anchor" href="#定义原型方法" aria-hidden="true">#</a> <strong>定义原型方法</strong></h4>
<p>方法若直接定义在<code v-pre>构造函数</code>上，会造成每个实例的方法都是内存中的不同的函数，造成内存浪费，解决办法就是：</p>
<p><span style="color: red;">将方法定义在构造函数的prototype属性上</span></p>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// 定义构造函数</span>
    <span class="token keyword">function</span> <span class="token function">People</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> sex</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>sex <span class="token operator">=</span> sex<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 方法要写在prototype属性上，节省内存</span>
    <span class="token class-name">People</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">say</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"hello world!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><p><strong>原型链的终点</strong></p>
<p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20210909085736088.png" alt="image-20210909085736088" style="zoom:50%;" /><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20210909090127954.png" alt="image-20210909090127954" style="zoom:50%;" /></p>
<h4 id="通过原型链实现继承" tabindex="-1"><a class="header-anchor" href="#通过原型链实现继承" aria-hidden="true">#</a> <strong>通过原型链实现继承</strong></h4>
<img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20210909090717358.png" alt="image-20210909090717358" style="zoom:50%;" />
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// 父类</span>
    <span class="token keyword">function</span> <span class="token function">People</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> sex</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>sex <span class="token operator">=</span> sex<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token class-name">People</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">sayhello</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"你好，我是"</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">", 我今年"</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">+</span> <span class="token string">"岁了, 我是"</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>sex <span class="token operator">+</span> <span class="token string">"生"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token class-name">People</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">sleep</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"你好，我是"</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">", 我正在睡觉zzzzzzzzzz...."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>


    <span class="token comment">// 子类</span>
    <span class="token keyword">function</span> <span class="token function">Student</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> sex<span class="token punctuation">,</span> school<span class="token punctuation">,</span> studentNumber</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>sex <span class="token operator">=</span> sex<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>school <span class="token operator">=</span> school<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>studentNumber <span class="token operator">=</span> studentNumber<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 子类继承自父类（放到子类方法之前）</span>
    <span class="token class-name">Student</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">People</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token class-name">Student</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">study</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">"正在学习..."</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token class-name">Student</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">exam</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">"正在考试..."</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">var</span> xiaoming <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token string">"小明"</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token string">"男"</span><span class="token punctuation">,</span> <span class="token string">"第一中学"</span><span class="token punctuation">,</span> <span class="token number">01</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    xiaoming<span class="token punctuation">.</span><span class="token function">study</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    xiaoming<span class="token punctuation">.</span><span class="token function">sayhello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 正确输出，说明继承已经实现了（Student类可以调用People类的方法）</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><blockquote>
<p><code v-pre>Student.prototype = People.prototype</code>也可以啊，有什么区别吗？</p>
<p>xxx</p>
</blockquote>
<h4 id="包装类" tabindex="-1"><a class="header-anchor" href="#包装类" aria-hidden="true">#</a> 包装类</h4>
<ul>
<li>Number()、String()和Boolean()分别是数字、字符串、布尔值的&quot;包装类&quot;</li>
<li>包装类的目的是为了让<span style="color: red;">基本类型值</span>可以从它的<span style="color: red;">构造函数的<code v-pre>prototype</code>属性</span>上获取方法</li>
</ul>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">/* 包装类的目的是为了让基本类型值可以从它的构造函数的`prototype`属性上获取方法 */</span>
    <span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">123456789</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">Number</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// true</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span>toString <span class="token operator">===</span> a<span class="token punctuation">.</span>__proto__<span class="token punctuation">.</span>toString<span class="token punctuation">)</span> <span class="token comment">// true</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span>toString <span class="token operator">===</span> <span class="token class-name">Number</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>toString<span class="token punctuation">)</span> <span class="token comment">// true</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span>__proto__<span class="token punctuation">.</span>toString <span class="token operator">===</span> <span class="token class-name">Number</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>toString<span class="token punctuation">)</span> <span class="token comment">// true</span>


    <span class="token comment">// 下面这个为什么是false呢?</span>
    <span class="token comment">// 因为a的toString方法是从a.__proto__继承来的，是从Number.prototype继承来的</span>
    <span class="token comment">// 而Number的toString方法是从Number.__proto__继承来的，Number的原型暂时还不知道是谁</span>
    <span class="token comment">// 两个虽然都是toString方法，但是内存地址不一样，所以会是false</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span>toString <span class="token operator">===</span> Number<span class="token punctuation">.</span>toString<span class="token punctuation">)</span><span class="token punctuation">;</span>                    <span class="token comment">// false</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Number<span class="token punctuation">.</span>toString <span class="token operator">===</span> Number<span class="token punctuation">.</span>__proto__<span class="token punctuation">.</span>toString<span class="token punctuation">)</span>      <span class="token comment">// true</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Number<span class="token punctuation">.</span>__proto__<span class="token punctuation">.</span>toString <span class="token operator">===</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>toString<span class="token punctuation">)</span>   <span class="token comment">// false，说明Number的原型不是Object?</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="常用对象" tabindex="-1"><a class="header-anchor" href="#常用对象" aria-hidden="true">#</a> 常用对象</h3>
<h4 id="math" tabindex="-1"><a class="header-anchor" href="#math" aria-hidden="true">#</a> Math</h4>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">/* Math对象 */</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 2的3次方，8</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">sqrt</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token comment">// 开方，4</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">ceil</span><span class="token punctuation">(</span><span class="token number">5.0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token comment">// 向上取整, 5</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">ceil</span><span class="token punctuation">(</span><span class="token number">5.2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token comment">// 向上取整, 6</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">ceil</span><span class="token punctuation">(</span><span class="token number">5.9</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token comment">// 向上取整, 6</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span><span class="token number">7.2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>       <span class="token comment">// 向下取整，7</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span><span class="token number">7.9</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>       <span class="token comment">// 向下取整，7</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">round</span><span class="token punctuation">(</span><span class="token number">8.4999999</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 四舍五入，8</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">round</span><span class="token punctuation">(</span><span class="token number">8.5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>       <span class="token comment">// 四舍五入，9</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">round</span><span class="token punctuation">(</span><span class="token number">9.12456</span> <span class="token operator">*</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 四舍五入到指定小数位，1位系数为10，2位系数为100,3位系数为1000，以此类推</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">10.2</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 获取参数中最大的值。 10.2</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">10.2</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 获取参数中最小的值。 3</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// 获取0-1之间的随机数，0.13571048972199007</span>
    <span class="token comment">// 为了求得[a, b]之间的随机数(包含a和b)，可以使用这个公式：a + parseInt(Math.random() * (b - a + 1))</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">90</span> <span class="token operator">+</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token number">100</span> <span class="token operator">-</span> <span class="token number">90</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h4 id="date" tabindex="-1"><a class="header-anchor" href="#date" aria-hidden="true">#</a> Date</h4>
<p><strong>获取指定时间</strong></p>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// 不加参数，默认获取当前时间</span>
    <span class="token keyword">const</span> now <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>now<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> now<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// object</span>

    <span class="token comment">// (1) 获取指定时间，月份默认从0开始算，所以下面这个是11月</span>
    <span class="token keyword">const</span> d1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token number">2021</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>d1<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// Mon Nov 01 2021 00:00:00 GMT+0800 (中国标准时间) => 11月1号0点</span>

    <span class="token comment">// (2) 获取指定时间，下面两种输出结果是不一样的</span>
    <span class="token keyword">const</span> d2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token string">'2021-10-1'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> d3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token string">'2021-10-01'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>d2<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// Fri Oct 01 2021 00:00:00 GMT+0800 (中国标准时间) => 10月1号0点</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>d3<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// Fri Oct 01 2021 08:00:00 GMT+0800 (中国标准时间) => 10月1号8点</span>

    <span class="token comment">// 下面这个也一样</span>
    <span class="token keyword">const</span> d4 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token string">'2021-9-01'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> d5 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token string">'2021-09-01'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>d4<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// Wed Sep 01 2021 00:00:00 GMT+0800 (中国标准时间) =>  9月1号0点</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>d5<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// Wed Sep 01 2021 08:00:00 GMT+0800 (中国标准时间) =>  9月1号8点</span>

    <span class="token comment">// (3) 获取指定时间，加上时间，行为保持统一</span>
    <span class="token keyword">const</span> d6 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token string">'2021-10-1  00:00:00'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// Fri Oct 01 2021 00:00:00 GMT+0800 (中国标准时间) => 10月1号0点</span>
    <span class="token keyword">const</span> d7 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token string">'2021-10-01 00:00:00'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// Fri Oct 01 2021 00:00:00 GMT+0800 (中国标准时间) => 10月1号0点</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>d6<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// Fri Oct 01 2021 00:00:00 GMT+0800 (中国标准时间) => 10月1号0点</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>d7<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// Fri Oct 01 2021 08:00:00 GMT+0800 (中国标准时间) => 10月1号8点</span>

    <span class="token comment">// (4) 获取指定时间，如果字符串中携带了时区信息，会自动转为本地时区</span>
    <span class="token keyword">const</span> d8 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token string">'2021-10-1  00:00:00 UTC'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>d8<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// Fri Oct 01 2021 08:00:00 GMT+0800 (中国标准时间) => UTC/GMT(0时区)转为东八区(+0800) == 10月1号8点</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><p><strong>时间对象常见方法</strong></p>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// 不加参数，默认获取当前时间</span>
    <span class="token keyword">const</span> now <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>now<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> now<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// object</span>

    <span class="token comment">// 获取本地时间</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>now<span class="token punctuation">.</span><span class="token function">getFullYear</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">'年'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 得到四位数年份</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>now<span class="token punctuation">.</span><span class="token function">getMonth</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">'月'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 得到月份0-11</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>now<span class="token punctuation">.</span><span class="token function">getDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">'号'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// 得到日期，1-31</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>now<span class="token punctuation">.</span><span class="token function">getDay</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// 得到星期 0-6</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>now<span class="token punctuation">.</span><span class="token function">getHours</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">'点'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 得到小时0-23</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>now<span class="token punctuation">.</span><span class="token function">getMinutes</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">'分'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 得到分钟0-59</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>now<span class="token punctuation">.</span><span class="token function">getSeconds</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">'秒'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 得到秒数0-59</span>

    <span class="token comment">// 获取0时区时间-UTC时间，年月日时分秒方法都有，就不一一写了</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>now<span class="token punctuation">.</span><span class="token function">getUTCHours</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><p><strong>时间戳</strong></p>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">/*
        时间戳表示1970年1月1日零点距离某时刻的毫秒数，他只是一个数字，在不同的国家（有不同的时区）展示的时间是不一样的，
        所以说时间戳是跟时区无关的
     */</span>

    <span class="token comment">// 获取指定时间</span>
    <span class="token keyword">const</span> d <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token string">"2021-10-01 00:00:00"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Fri Oct 01 2021 00:00:00 GMT+0800 (中国标准时间)</span>

    <span class="token comment">// （1）时间对象 => 时间戳，返回毫秒级时间戳</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>d<span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>          <span class="token comment">// 1633017600000</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> d<span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// number</span>

    <span class="token comment">// （2）字符串时间对象 => 时间戳，返回毫秒级时间戳，但是精度只有到秒，毫秒固定为000，拿当前时间试一下即可试出来</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Date<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>d<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 时间戳 => 时间对象</span>
    <span class="token keyword">const</span> d2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token number">1633017600000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>           <span class="token comment">// 数字类型时间戳</span>
    <span class="token keyword">const</span> d3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token string">'1633017600000'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 不支持传字符串类型的时间戳</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>d2<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// Fri Oct 01 2021 00:00:00 GMT+0800 (中国标准时间)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>d3<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// Fri Oct 01 2021 00:00:00 GMT+0800 (中国标准时间)</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><p><strong>示例</strong></p>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span><span class="token operator">!</span><span class="token constant">DOCTYPE</span> html<span class="token operator">></span>
<span class="token operator">&lt;</span>html lang<span class="token operator">=</span><span class="token string">"en"</span><span class="token operator">></span>
<span class="token operator">&lt;</span>head<span class="token operator">></span>
    <span class="token operator">&lt;</span>meta charset<span class="token operator">=</span><span class="token string">"UTF-8"</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>title<span class="token operator">></span>Title<span class="token operator">&lt;</span><span class="token operator">/</span>title<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>head<span class="token operator">></span>
<span class="token operator">&lt;</span>body<span class="token operator">></span>
<span class="token operator">&lt;</span>h1<span class="token operator">></span><span class="token number">2021</span>年高考倒计时<span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span>
<span class="token operator">&lt;</span>h2 id<span class="token operator">=</span><span class="token string">"info"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>h2<span class="token operator">></span>

<span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> now <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">const</span> target <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token number">2021</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 毫秒差</span>
        <span class="token keyword">const</span> diff <span class="token operator">=</span> target <span class="token operator">-</span> now<span class="token punctuation">;</span>

        <span class="token comment">// 换算为多少天，毫秒差 / 一天总计毫秒</span>
        <span class="token keyword">const</span> days <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>diff <span class="token operator">/</span> <span class="token punctuation">(</span><span class="token number">1000</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">24</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 不足一天的时间间隔，换算为多少小时；不足一天毫秒差 / 1小时毫秒总计</span>
        <span class="token keyword">const</span> hours <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>diff <span class="token operator">%</span> <span class="token punctuation">(</span><span class="token number">1000</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">24</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token punctuation">(</span><span class="token number">1000</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">60</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 不足一小时的时间间隔，换算为多少分钟</span>
        <span class="token keyword">const</span> minutes <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>diff <span class="token operator">%</span> <span class="token punctuation">(</span><span class="token number">1000</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">60</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token punctuation">(</span><span class="token number">1000</span> <span class="token operator">*</span> <span class="token number">60</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 不足一分钟的时间间隔，换算为多少秒</span>
        <span class="token keyword">const</span> seconds <span class="token operator">=</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>diff <span class="token operator">%</span> <span class="token punctuation">(</span><span class="token number">1000</span> <span class="token operator">*</span> <span class="token number">60</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">const</span> info <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"info"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        info<span class="token punctuation">.</span>innerText <span class="token operator">=</span> days <span class="token operator">+</span> <span class="token string">"天"</span> <span class="token operator">+</span> hours <span class="token operator">+</span> <span class="token string">"小时"</span> <span class="token operator">+</span> minutes <span class="token operator">+</span> <span class="token string">"分钟"</span> <span class="token operator">+</span> seconds <span class="token operator">+</span> <span class="token string">"秒"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>

<span class="token operator">&lt;</span><span class="token operator">/</span>body<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>html<span class="token operator">></span>
</code></pre></div><h4 id="json" tabindex="-1"><a class="header-anchor" href="#json" aria-hidden="true">#</a> JSON</h4>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// 将JSON格式字符串解析为JS的对象;如果是不合法字符串会报错</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">'{"abc":"def"}'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>           <span class="token comment">// {abc: "def"}</span>

    <span class="token comment">// 将JS的对象解析为JSON字符串</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token punctuation">{</span>                        <span class="token comment">// {"name":"Bob","age":20}</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"Bob"</span><span class="token punctuation">,</span>
        <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">20</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><blockquote>
<p>这里有一个很实用的小技巧，将对象转为JSON，再解析为对象，可以实现对象深拷贝的效果</p>
</blockquote>
<h3 id="上下文this指向" tabindex="-1"><a class="header-anchor" href="#上下文this指向" aria-hidden="true">#</a> 上下文this指向</h3>
<h4 id="规则1-对象打点调用他的方法-则这个方法的上下文是这个打点的对象" tabindex="-1"><a class="header-anchor" href="#规则1-对象打点调用他的方法-则这个方法的上下文是这个打点的对象" aria-hidden="true">#</a> 规则1：对象打点调用他的方法，则这个方法的上下文是这个打点的对象</h4>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">/* 练习一 */</span>
    <span class="token keyword">const</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
        <span class="token function-variable function">getTotal</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> obj2 <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
        <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
        <span class="token literal-property property">getTotal</span><span class="token operator">:</span> obj1<span class="token punctuation">.</span>getTotal
    <span class="token punctuation">}</span>

    <span class="token comment">// 对象打点调用，输出3</span>
    obj1<span class="token punctuation">.</span><span class="token function">getTotal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 对象打点调用，输出7，注意不是输出3</span>
    obj2<span class="token punctuation">.</span><span class="token function">getTotal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/* 练习二 */</span>
    <span class="token keyword">function</span> <span class="token function">outer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">11</span><span class="token punctuation">;</span>
        <span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token number">22</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">33</span><span class="token punctuation">,</span>
            <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">44</span><span class="token punctuation">,</span>
            <span class="token function-variable function">getTotal</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 77</span>
    <span class="token function">outer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTotal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token comment">/* 练习三 */</span>
    <span class="token keyword">function</span> <span class="token function">fun</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">var</span> obj3 <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
        <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
        <span class="token literal-property property">c</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
            <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span>
            <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">40</span><span class="token punctuation">,</span>
            <span class="token literal-property property">c</span><span class="token operator">:</span> fun
        <span class="token punctuation">}</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 70</span>
    <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
    obj3<span class="token punctuation">.</span>c<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">c</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h4 id="规则2-数组-类数组对象-枚举出函数进行调用-上下文是这个数组-类数组-对象" tabindex="-1"><a class="header-anchor" href="#规则2-数组-类数组对象-枚举出函数进行调用-上下文是这个数组-类数组-对象" aria-hidden="true">#</a> 规则2：数组（类数组对象）枚举出函数进行调用，上下文是这个数组（类数组）对象</h4>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// 开启严格模式</span>
    <span class="token string">"use strict"</span><span class="token punctuation">;</span>

    <span class="token keyword">function</span> <span class="token function">fun</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        arguments<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 输出 2</span>
    <span class="token function">fun</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">/*
        解释：
            arguments是一个类数组对象，代表是意思的 函数中所有的实参"数组"
            this指向的其实是arguments对象，所以会输出2
    */</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h4 id="规则3-函数直接调用-则函数的上下文是window对象" tabindex="-1"><a class="header-anchor" href="#规则3-函数直接调用-则函数的上下文是window对象" aria-hidden="true">#</a> 规则3：函数直接调用，则函数的上下文是window对象</h4>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// 开启严格模式</span>
    <span class="token string">"use strict"</span><span class="token punctuation">;</span>

    <span class="token keyword">function</span> <span class="token function">fun</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>b<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
        <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token function">fun</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token literal-property property">fun</span><span class="token operator">:</span> fun<span class="token punctuation">,</span>
    <span class="token punctuation">}</span>


    <span class="token comment">// 开启严格模式情况下，直接调用函数，eg: 函数()，函数中的this指向undefined，关闭严格后，this指向window</span>
    <span class="token comment">// 所以：</span>
    <span class="token comment">//      未开启严格模式下，此代码运行正常，返回结果是：3 + (1+2) = 6</span>
    <span class="token comment">//      开启严格模式下，由于直接调用函数 fun()，函数中this指向undefined，所以代码会报错</span>
    <span class="token keyword">var</span> result <span class="token operator">=</span> obj<span class="token punctuation">.</span><span class="token function">fun</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token comment">/* 优化1：
        问：如何让以上代码在严格模式下也能运行呢？
        答：将严格模式下的this指向window就好了呀，将fun函数替换为以下这个就能解决
    */</span>

    <span class="token comment">// function fun() {</span>
    <span class="token comment">//     try {</span>
    <span class="token comment">//         return this.a + this.b;</span>
    <span class="token comment">//     } catch (e) {</span>
    <span class="token comment">//         return window.a + window.b;</span>
    <span class="token comment">//     }</span>
    <span class="token comment">// }</span>

    <span class="token comment">/* 优化2：
        问：上面的解决方法可以实现，但是还有没有更优雅的解决方案呢？
        答：使用 函数.call指定上下文，在不侵入函数代码的情况下修改this指向,关于call后面会讲到

        将代码恢复成最初始的模样, 重写obj对象：
        var obj = {
            a: 3,
            b: fun.call(window),
            fun: fun,
        }
    */</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h4 id="规则4-iife-立即调用函数表达式-中的函数-上下文是window" tabindex="-1"><a class="header-anchor" href="#规则4-iife-立即调用函数表达式-中的函数-上下文是window" aria-hidden="true">#</a> 规则4：IIFE（立即调用函数表达式）中的函数，上下文是window</h4>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// 开启严格模式</span>
    <span class="token string">"use strict"</span><span class="token punctuation">;</span>

    <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
        <span class="token literal-property property">fun</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    obj<span class="token punctuation">.</span><span class="token function">fun</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/*
         首先，这段代码运行是会报错的，原因是开启了严格模式后，全局的this会指向undefined，而不是window对象，
         而代码中IIFE中需要用到指向window对象的this=
         var a = this.a; 在严格模式下，this为undefined，所以会报错

        解决报错的方法也很简单，使用call指定上下文即可：
        fun: (function () {
            var a = this.a;
            return function () {
                console.log(a + this.a);
            }
        }).call(window)


        结果解析:
            obj.fun = function () {
                    console.log(a + this.a);    ---> a的值是1，this.a的值是2
                }
    */</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h4 id="规则5-定时器、延迟器调用函数-上下文是window对象" tabindex="-1"><a class="header-anchor" href="#规则5-定时器、延迟器调用函数-上下文是window对象" aria-hidden="true">#</a> 规则5：定时器、延迟器调用函数，上下文是window对象</h4>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// 开启严格模式</span>
    <span class="token string">"use strict"</span><span class="token punctuation">;</span>

    <span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
        <span class="token function-variable function">fun</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>fun<span class="token punctuation">,</span> <span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/*
        输出结果7

        注意看这里 obj.fun，这里有打点，但是没有调用，和之前讲的对象打点调用规则并不冲突
    */</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h4 id="规则6-事件处理函数的上下文是绑定事件的dom元素" tabindex="-1"><a class="header-anchor" href="#规则6-事件处理函数的上下文是绑定事件的dom元素" aria-hidden="true">#</a> 规则6：事件处理函数的上下文是绑定事件的DOM元素</h4>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>body<span class="token operator">></span>
<span class="token operator">&lt;</span>button id<span class="token operator">=</span><span class="token string">"btn"</span><span class="token operator">></span>点击<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>
<span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// 开启严格模式</span>
    <span class="token string">"use strict"</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> btn <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"btn"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    btn<span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// &lt;button id="btn">点击&lt;/button></span>
    <span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>body<span class="token operator">></span>
</code></pre></div><h4 id="call和apply都可以指定函数上下文" tabindex="-1"><a class="header-anchor" href="#call和apply都可以指定函数上下文" aria-hidden="true">#</a> call和apply都可以指定函数上下文</h4>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token keyword">function</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>chinese <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>math <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>english<span class="token punctuation">)</span><span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">var</span> xiaoming <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">chinese</span><span class="token operator">:</span> <span class="token number">80</span><span class="token punctuation">,</span>
        <span class="token literal-property property">math</span><span class="token operator">:</span> <span class="token number">90</span><span class="token punctuation">,</span>
        <span class="token literal-property property">english</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// call和apply都可以指定上下文</span>
    <span class="token function">sum</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>xiaoming<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">sum</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>xiaoming<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 如果函数本身需要传递参数，那么写在call或apply的第二个参数</span>
    <span class="token comment">// call或apply区别在于，传递参数的方式不同：</span>
    <span class="token function">sum</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>xiaoming<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token comment">// call要用逗号罗列参数</span>
    <span class="token function">sum</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>xiaoming<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// apply要把参数写在数组中</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h4 id="new操作符中的上下文规则" tabindex="-1"><a class="header-anchor" href="#new操作符中的上下文规则" aria-hidden="true">#</a> new操作符中的上下文规则</h4>
<p>在构造函数中，我们已经学过了<code v-pre>new</code>操作符，这里详细说一下<code v-pre>new</code>操作符和<code v-pre>this</code>的关联</p>
<p><strong>使用<code v-pre>new</code>操作符调用函数会进行&quot;四步走&quot;</strong></p>
<ol>
<li>函数体内会自动创建出一个空白对象</li>
<li>函数的上下文this会指向这个对象</li>
<li>函数体内的语句执行</li>
<li>函数会自动返回上下文对象，即使函数没有<code v-pre>return</code>语句</li>
</ol>
<p><strong>&quot;四步走&quot;演示</strong></p>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token keyword">function</span> <span class="token function">Fun</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Fun</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>           <span class="token comment">// {a: 3, b: 5}</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> obj<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// object</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="类-class" tabindex="-1"><a class="header-anchor" href="#类-class" aria-hidden="true">#</a> 类（class）</h3>
<p>类和构造函数很像，但是更加面向对象，使用更加友好</p>
<h4 id="基本用法" tabindex="-1"><a class="header-anchor" href="#基本用法" aria-hidden="true">#</a> 基本用法</h4>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
<span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>      <span class="token comment">// (1) 类名后面没有()</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>    <span class="token comment">// (3) 实例化类时会调用此方法</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 定义类方法，各实例拥有的该方法相等，占用同一份内存</span>
    <span class="token function">speak</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">hello, i'm </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>   <span class="token comment">// (2) }后面也不需要加;</span>


<span class="token keyword">const</span> zs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">"张三"</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> ls <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">"李四"</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>zs<span class="token punctuation">.</span>speak <span class="token operator">===</span> ls<span class="token punctuation">.</span>speak<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
zs<span class="token punctuation">.</span><span class="token function">speak</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// hello, i'm 张三</span>
ls<span class="token punctuation">.</span><span class="token function">speak</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// hello, i'm 李四</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><blockquote>
<p>也可以使用另一种写法，<code v-pre>const Person = class {};</code>，但是并不推荐</p>
</blockquote>
<h4 id="实例属性" tabindex="-1"><a class="header-anchor" href="#实例属性" aria-hidden="true">#</a> 实例属性</h4>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
<span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token comment">// 这种写法就等同于 constructor中写this.name = "1";</span>
    <span class="token comment">// 注意这里没有使用let、const，也没有使用this</span>
    name <span class="token operator">=</span> <span class="token string">'1'</span><span class="token punctuation">;</span>
    age <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token comment">// constructor(name, age) {</span>
    <span class="token comment">//     this.name = name;</span>
    <span class="token comment">//     this.age = age;</span>
    <span class="token comment">// }</span>

	<span class="token comment">// 这个方法并没有在实例上，而是在类的原型上</span>
    <span class="token function-variable function">getName</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> zs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">"张三"</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>zs<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 1</span>

<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h4 id="静态属性和静态方法" tabindex="-1"><a class="header-anchor" href="#静态属性和静态方法" aria-hidden="true">#</a> 静态属性和静态方法</h4>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
<span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token comment">// 使用static关键字定义的方法就是静态方法</span>
    <span class="token comment">// 静态方法中的this指向类本身，而不是实例</span>
    <span class="token keyword">static</span> <span class="token function-variable function">getName</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"Bob"</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 静态属性如果下面这样写的话，会有兼容性问题，解决办法是：</span>
    <span class="token comment">// 可以改成方法的形式，或在类外面Person.version = "1.0"</span>
    <span class="token comment">// static name = "Bob";</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> zs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">"张三"</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>zs<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// Bob</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h4 id="私有属性和方法" tabindex="-1"><a class="header-anchor" href="#私有属性和方法" aria-hidden="true">#</a> 私有属性和方法</h4>
<p>一般情况下定义的属性和方法都是公开的</p>
<p>私有属性和方法，就是说只能在类里面使用，在类外面不能使用；</p>
<p><code v-pre>JavaScript</code>目前并没有私有属性和方法的语法，但是根据公共的规范，</p>
<p>一般以_开头的属性或方法，我们称为私有属性或方法</p>
<h4 id="类的继承" tabindex="-1"><a class="header-anchor" href="#类的继承" aria-hidden="true">#</a> 类的继承</h4>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
<span class="token comment">// 定义一个父类</span>
<span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> sex<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>sex <span class="token operator">=</span> sex<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">speak</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Hello, i'm </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义一个子类，继承自Person</span>
<span class="token keyword">class</span> <span class="token class-name">Programmer</span> <span class="token keyword">extends</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> sex<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// super作为函数调用，代表父类的构造方法，只能用在子类的constructor方法中</span>
        <span class="token comment">// 调用父类的constructor； super前面不能有this操作，语法限制</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> sex<span class="token punctuation">,</span> age<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// super作为对象使用，代表父类的原型，也就是Person.prototype</span>
    <span class="token comment">// 所以定义在父类实例上的方法或属性，是无法通过super调用的</span>
    <span class="token comment">// 通过super调用父类方法时，方法内部的this指向当前子类实例    </span>
    <span class="token function">speak</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"i'm child class"</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">speak</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">// super用在静态方法中，指向的父类，而不是父类的原型</span>
    <span class="token comment">// 使用super的时候必须显示指定super作为何种类型使用，所以console.log(super); 这样会报错</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> zs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Programmer</span><span class="token punctuation">(</span><span class="token string">"张三"</span><span class="token punctuation">,</span> <span class="token string">"男"</span><span class="token punctuation">,</span> <span class="token string">"32"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>zs<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 张三</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>zs<span class="token punctuation">.</span>sex<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 男</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>zs<span class="token punctuation">.</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 32</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>zs<span class="token punctuation">.</span><span class="token function">speak</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// Hello, i'm 张三</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="模块-module" tabindex="-1"><a class="header-anchor" href="#模块-module" aria-hidden="true">#</a> 模块（<code v-pre>Module</code>）</h3>
<p>每个模块有自己的独立作用域，避免命名冲突</p>
<ul>
<li>只要在<code v-pre>JS</code>文件中使用了<code v-pre>import</code>或<code v-pre>export</code>，就需要在HTML中的script标签上加<code v-pre>type=module</code></li>
<li>被导入的模块都会执行一遍，也仅执行一遍</li>
<li>没有导出也可以被导入</li>
</ul>
<blockquote>
<p>模块学习时需要有一个服务器环境</p>
</blockquote>
<p><strong>导入和导出</strong></p>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script type<span class="token operator">=</span><span class="token string">"module"</span><span class="token operator">></span>
    <span class="token comment">/*
        说明
            模块没有导出，也可以导入，且多次导入同一文件仅执行一次
        注意
            script标签需添加 type="module"
 
        t1.js内容：
            console.log("t1.js被执行了");
            var   t1JSTest = "test";
     */</span>
 
    <span class="token comment">// 测试</span>
    <span class="token keyword">import</span> <span class="token string">"./js/t1.js"</span><span class="token punctuation">;</span>    <span class="token comment">// 导入成功，执行里面所有的代码，输出 t1.js被执行了</span>
    <span class="token comment">// console.log(t1JSTest);  // 报错了，t1JSTest is not defined</span>
 
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
 
<span class="token operator">&lt;</span>script type<span class="token operator">=</span><span class="token string">"module"</span><span class="token operator">></span>
    <span class="token comment">/*
        注意
            script标签需添加 type="module"
 
        方式1：
            导出：export default 对象
            导入：import 别名 from 模块;
            说明：
                一个模块只能有一个export default
                可以导出变量、数组、对象、(匿名)函数、(匿名)类等
 
            t2.js内容：
                const cm = 9.857;
                export default age;
 
        方式2：
            基本用法
                导出语法 ：export 声明或语句
                导出示例1：export const age = 18;
                导出示例2：
                        const age = 18;
                        export {age};
 
                导入语法：import {导出对象} from 模块;
                导入示例：import {age} from './js/t3.js'
 
                t3.js内容：
                    const age = 18;
                    export {age};
 
            批量导出导入
                导出
                    const age = 18;
                    const name = "Bob";
                    export {age, name};
                导入
                    import {age, name} from 模块;
 
            导出导入起别名
                导出
                    ...代码省略
                    export {age as Age, name as Name};
                导入
                    import {Age as age, Name as name} from 模块;
 
            整体导出导入
                导出（不变）
                    ...代码省略
                    export {age as Age, name as Name};
                导入
                    import * as obj from 模块;
 
            同时导入
                在一条语句中，即导入export default的东西，又导入export {x1,x2}的东西
                语法：
                    import name,{age, sex} from 模块
                注意事项：
                    导入时，一定是export default导出东西在前面，比如上面的import name
    */</span>
 
    <span class="token comment">// 方式一测试</span>
    <span class="token keyword">import</span> myCM <span class="token keyword">from</span> <span class="token string">'./js/t2.js'</span><span class="token punctuation">;</span>     <span class="token comment">// 成功导入，导入时的名字无所谓</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myCM<span class="token punctuation">)</span><span class="token punctuation">;</span>                  <span class="token comment">// 9.857</span>
 
    <span class="token comment">// 方式二测试 - 基本用法</span>
    <span class="token keyword">import</span> <span class="token punctuation">{</span>age<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./js/t3.js'</span><span class="token punctuation">;</span>
 
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
    <span class="token comment">// 整体导入</span>
    <span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> obj <span class="token keyword">from</span> <span class="token string">'./js/t4.js'</span><span class="token punctuation">;</span>
 
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><p><strong>注意事项</strong></p>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script type<span class="token operator">=</span><span class="token string">"module"</span><span class="token operator">></span>
    <span class="token comment">/*
        模块顶层的this指向
            使用普通的script src引入，this指向window对象，比如 &lt;script src="./js/t4.js">，闭合标签这里不写了，知道就行
            使用模块导入的方式，顶层this指向undefined
 
        import关键字 和 import()函数
            （1）这俩不是一个东西
            （2）import关键字具有提升效果，会提升到整个代码的头部，率先执行；export也一样
            （3）import()函数可以支持让我们按需导入，没有提升效果
 
        导入导出复合写法
            t5.js
                const t5 = "t5 moudle";
                export {t5};
            t6.js
                export {t5} from "./t5.js";     // 复合写法
 
            复合写法等同于
                import {t5} from './t5.js';
                export {t5};
            总结：
                复合写法中无法使用t5这个对象
                不推荐使用复合写法，理解起来比较复杂
                复合写法的场景：
                    多个文件合并，给使用者提供统一接口
     */</span>
    <span class="token comment">// 导入导出复合写法测试</span>
    <span class="token keyword">import</span> <span class="token punctuation">{</span>t5<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"./js/t6.js"</span><span class="token punctuation">;</span>
 
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>t5<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// t5 moudle</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h2 id="正则表达式" tabindex="-1"><a class="header-anchor" href="#正则表达式" aria-hidden="true">#</a> 正则表达式</h2>
<h3 id="第一个例子" tabindex="-1"><a class="header-anchor" href="#第一个例子" aria-hidden="true">#</a> 第一个例子</h3>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// 创建正则表达式</span>
    <span class="token keyword">var</span> re1 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^\d{6}$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">;</span>                  <span class="token comment">// 方法1（推荐使用这种）</span>
    <span class="token keyword">var</span> re2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RegExp</span><span class="token punctuation">(</span><span class="token string">"^\\d{6}$"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// 方法2（斜杠需要转义）</span>
 
    <span class="token comment">// 检测正则表达式的类型是object</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> re1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> re2<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
    <span class="token comment">// 测试正则表达式</span>
    <span class="token keyword">var</span> d <span class="token operator">=</span> <span class="token string">"123456"</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>re1<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// true</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>re2<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// true</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="元字符" tabindex="-1"><a class="header-anchor" href="#元字符" aria-hidden="true">#</a> 元字符</h3>
<table>
<thead>
<tr>
<th>元字符</th>
<th>含义</th>
</tr>
</thead>
<tbody>
<tr>
<td>\d</td>
<td>匹配一个数字</td>
</tr>
<tr>
<td>\D</td>
<td>匹配一个非数字字符</td>
</tr>
<tr>
<td>\w</td>
<td>匹配一个单字字符（字母、数字、下划线）</td>
</tr>
<tr>
<td>\W</td>
<td>匹配一个非单字字符</td>
</tr>
<tr>
<td>\s</td>
<td>匹配一个空白字符（空格、TAB、换行符）</td>
</tr>
<tr>
<td>.</td>
<td>任意一个字符</td>
</tr>
<tr>
<td>^</td>
<td>匹配开头</td>
</tr>
<tr>
<td>$</td>
<td>匹配结尾</td>
</tr>
</tbody>
</table>
<blockquote>
<p>如果使用<code v-pre>new RegExp</code>写法，反斜杠需要多写一个，即</p>
<p><code v-pre>/^\d$/</code>和<code v-pre>new RegExp('^\\d$')</code>是一样的意思</p>
</blockquote>
<h3 id="方括号表示法" tabindex="-1"><a class="header-anchor" href="#方括号表示法" aria-hidden="true">#</a> 方括号表示法</h3>
<p>使用方括号，比如<code v-pre>[xyz]</code>，可以 创建一个字符集合，表示匹配方括号中的任意字符</p>
<p>可以使用短横线-来指定一个范围，还可以使用^表示否定</p>
<table>
<thead>
<tr>
<th>元字符</th>
<th>等价的方括号表示法</th>
</tr>
</thead>
<tbody>
<tr>
<td>\d</td>
<td>[0-9]</td>
</tr>
<tr>
<td>\D</td>
<td>[^0-9]</td>
</tr>
<tr>
<td>\w</td>
<td>[a-zA-Z0-9]</td>
</tr>
<tr>
<td>\w</td>
<td>[^a-zA-Z0-9]</td>
</tr>
</tbody>
</table>
<h3 id="量词" tabindex="-1"><a class="header-anchor" href="#量词" aria-hidden="true">#</a> 量词</h3>
<table>
<thead>
<tr>
<th>量词</th>
<th>含义</th>
</tr>
</thead>
<tbody>
<tr>
<td>*</td>
<td>匹配前一个表达式0次或多次，等价于{0,}</td>
</tr>
<tr>
<td>+</td>
<td>匹配前一个表达式1次或多次，等价于{1,}</td>
</tr>
<tr>
<td>{n}</td>
<td>匹配前一个表达式n次（n为正整数）</td>
</tr>
<tr>
<td>{n,}</td>
<td>匹配前一个表达式至少n次（n为正整数）</td>
</tr>
<tr>
<td>{n,m}</td>
<td>匹配前一个表达式至少n次，至多m次（n、m为正整数）</td>
</tr>
</tbody>
</table>
<h3 id="修饰符" tabindex="-1"><a class="header-anchor" href="#修饰符" aria-hidden="true">#</a> 修饰符</h3>
<table>
<thead>
<tr>
<th>修饰符</th>
<th>含义</th>
</tr>
</thead>
<tbody>
<tr>
<td>i</td>
<td>不区分大小写</td>
</tr>
<tr>
<td>g</td>
<td>全局搜索</td>
</tr>
</tbody>
</table>
<blockquote>
<p>修饰符使用方法：</p>
<p><code v-pre>var re = /\w/gi;</code></p>
<p><code v-pre>var re = new RegExp('\\w', 'gi')</code></p>
</blockquote>
<h3 id="正则表达式对象方法" tabindex="-1"><a class="header-anchor" href="#正则表达式对象方法" aria-hidden="true">#</a> 正则表达式对象方法</h3>
<table>
<thead>
<tr>
<th>方法</th>
<th>含义</th>
</tr>
</thead>
<tbody>
<tr>
<td>test()</td>
<td>测试字符串是否匹配正则表达式，返回布尔值</td>
</tr>
<tr>
<td>exec()</td>
<td>根据正则表达式，在字符串中查找，返回结果数组或null</td>
</tr>
</tbody>
</table>
<p>举例</p>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token keyword">const</span> str <span class="token operator">=</span> <span class="token string">'abc123def456'</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> regexp <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\d+</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span>

    <span class="token keyword">var</span> ret<span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>ret <span class="token operator">=</span> regexp<span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ret<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// ['123', index: 3, input: 'abc123def456', groups: undefined]</span>
    <span class="token comment">// ['456', index: 9, input: 'abc123def456', groups: undefined]</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h3 id="字符串对象方法" tabindex="-1"><a class="header-anchor" href="#字符串对象方法" aria-hidden="true">#</a> 字符串对象方法</h3>
<table>
<thead>
<tr>
<th>方法</th>
<th>含义</th>
</tr>
</thead>
<tbody>
<tr>
<td>search()</td>
<td>返回首次匹配到的位置索引，匹配不到返回-1</td>
</tr>
<tr>
<td>match()</td>
<td>返回一个数组，匹配不到返回null</td>
</tr>
<tr>
<td>replace()</td>
<td>使用一个新的字符串替换匹配到的字符串，可以使用正则表达式</td>
</tr>
<tr>
<td>split()</td>
<td>分割字符串为数组，可以使用正则表达式</td>
</tr>
</tbody>
</table>
<h2 id="dom" tabindex="-1"><a class="header-anchor" href="#dom" aria-hidden="true">#</a> DOM</h2>
<h3 id="dom概念" tabindex="-1"><a class="header-anchor" href="#dom概念" aria-hidden="true">#</a> Dom概念</h3>
<p>Dom（Document Object Model，文档对象模型）是JavaScript操作HTML文档的接口</p>
<p>Dom会将HTML文档表现为节点树</p>
<p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211009163551954.png" alt="image-20211009163551954"></p>
<h3 id="节点类型" tabindex="-1"><a class="header-anchor" href="#节点类型" aria-hidden="true">#</a> 节点类型</h3>
<table>
<thead>
<tr>
<th>nodeType值</th>
<th>节点类型说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>元素节点，比如<code v-pre>&lt;div&gt;</code>、<code v-pre>&lt;p&gt;</code>等</td>
</tr>
<tr>
<td>3</td>
<td>文字节点</td>
</tr>
<tr>
<td>8</td>
<td>注释节点</td>
</tr>
<tr>
<td>9</td>
<td>document节点</td>
</tr>
<tr>
<td>10</td>
<td>DTD节点</td>
</tr>
</tbody>
</table>
<h3 id="document对象" tabindex="-1"><a class="header-anchor" href="#document对象" aria-hidden="true">#</a> document对象</h3>
<p>document对象表示整个HTML文档，它是DOM节点树的根</p>
<p>document对象访问元素节点常用方法</p>
<table>
<thead>
<tr>
<th>方法</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>document.getElementById()</code></td>
<td>通过ID得到元素</td>
</tr>
<tr>
<td><code v-pre>document.getElementsByTagName()</code></td>
<td>通过标签得到元素</td>
</tr>
<tr>
<td><code v-pre>document.getElementsByClassName()</code></td>
<td>通过类名得到元素</td>
</tr>
<tr>
<td><code v-pre>document.querySelector()</code></td>
<td>通过选择器得到元素。如果有多个元素符合条件，只能得到第一个</td>
</tr>
<tr>
<td><code v-pre>document.querySelectorAll()</code></td>
<td>通过选择器得到元素数组</td>
</tr>
</tbody>
</table>
<blockquote>
<p>注意：</p>
<p>（1）操作DOM时，通常JS代码写到HTML节点后面，否则JS无法找到响应的HTML节点</p>
<p>（2）如果非要先写JS，在写HTML，那么通常将JS代码写到<code v-pre>window.onload</code>中，表示HTML节点渲染完成后，再执行onload函数</p>
</blockquote>
<p><strong>示例1</strong></p>
<div class="language-html ext-html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">doctype</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Document测试<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
        <span class="token comment">// 给window添加onload事件监听，onload表示页面已经加载完毕</span>
        window<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> box <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'box'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>box<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>牛奶<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>咖啡<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>果汁<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre></div><p><strong>示例2</strong></p>
<div class="language-html ext-html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Title<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ul<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>li<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>li<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>li<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>li<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token comment">// 通过ID获取：元素节点</span>
    <span class="token keyword">const</span> li1 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"li"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>li1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &lt;li class="li" id="li">&lt;/li></span>

    <span class="token comment">// 通过标签名获取：HTML集合</span>
    <span class="token keyword">const</span> li2 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token string">"li"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>li2<span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// HTMLCollection(3) [li#li.li, li.li, li.li, li: li#li.li]</span>

    <span class="token comment">// 通过类名获取：HTML集合</span>
    <span class="token keyword">const</span> li3 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementsByClassName</span><span class="token punctuation">(</span><span class="token string">"li"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>li3<span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// HTMLCollection(3) [li#li.li, li.li, li.li, li: li#li.li]</span>

    <span class="token comment">// 通过选择器获取：NodeList</span>
    <span class="token keyword">const</span> li4 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">".li"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>li4<span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// NodeList(3) [li#li.li, li.li, li.li]</span>

    <span class="token comment">/*
        扩展：
            (1)NodeList并不是数组，而是类数组
            (2)可以使用Array.from(NodeList/HTMLCollection)转为数组
     */</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre></div><h3 id="节点关系" tabindex="-1"><a class="header-anchor" href="#节点关系" aria-hidden="true">#</a> 节点关系</h3>
<p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211009180225277.png" alt="image-20211009180225277"></p>
<table>
<thead>
<tr>
<th>关系</th>
<th>考虑所有节点</th>
<th>只考虑元素节点</th>
</tr>
</thead>
<tbody>
<tr>
<td>子节点</td>
<td><code v-pre>cihldNodes</code></td>
<td><code v-pre>children</code></td>
</tr>
<tr>
<td>父节点</td>
<td><code v-pre>parentNode</code></td>
<td>同</td>
</tr>
<tr>
<td>第一个子节点</td>
<td><code v-pre>firstChild</code></td>
<td><code v-pre>firstElementChild</code></td>
</tr>
<tr>
<td>最后一个子节点</td>
<td><code v-pre>lastChild</code></td>
<td><code v-pre>lastElementChild</code></td>
</tr>
<tr>
<td>前一个兄弟节点</td>
<td><code v-pre>previousSibling</code></td>
<td><code v-pre>previousElementSibling</code></td>
</tr>
<tr>
<td>后一个兄弟节点</td>
<td><code v-pre>nextSibling</code></td>
<td><code v-pre>nextElementSibling</code></td>
</tr>
</tbody>
</table>
<h3 id="改变节点中的内容" tabindex="-1"><a class="header-anchor" href="#改变节点中的内容" aria-hidden="true">#</a> 改变节点中的内容</h3>
<ul>
<li><code v-pre>innerHTML</code>属性能以HTML语法设置节点中的内容</li>
<li><code v-pre>innerText</code>属性只能以纯文本方式设置节点中的内容</li>
</ul>
<div class="language-html ext-html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">doctype</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Document测试<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
        <span class="token comment">// 给window添加onload事件监听，onload表示页面已经加载完毕</span>
        window<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">var</span> box <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'box1'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// box.innerHTML = '河北省';</span>
            box<span class="token punctuation">.</span>children<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>innerText <span class="token operator">=</span> <span class="token string">"奶茶"</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>牛奶<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>咖啡<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>果汁<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre></div><h3 id="改变节点样式" tabindex="-1"><a class="header-anchor" href="#改变节点样式" aria-hidden="true">#</a> 改变节点样式</h3>
<p>改变元素节点的CSS样式需要使用这样的语句：</p>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code>oBox<span class="token punctuation">.</span>style<span class="token punctuation">.</span>backgroundColor <span class="token operator">=</span> <span class="token string">'red'</span><span class="token punctuation">;</span>			      <span class="token comment">// css属性要写成"驼峰"形式</span>
oBox<span class="token punctuation">.</span>style<span class="token punctuation">.</span>backgroundImage <span class="token operator">=</span> <span class="token string">'url(mages/1.jpg)'</span><span class="token punctuation">;</span> <span class="token comment">// css属性值要设置成完整形式</span>
oBox<span class="token punctuation">.</span>style<span class="token punctuation">.</span>fontSize <span class="token operator">=</span> <span class="token string">'32px'</span><span class="token punctuation">;</span>                    <span class="token comment">// 注意单位</span>
</code></pre></div><h3 id="改变html属性" tabindex="-1"><a class="header-anchor" href="#改变html属性" aria-hidden="true">#</a> 改变HTML属性</h3>
<ul>
<li>
<p>标准W3C属性，如src、href等，只需要直接打点进行更改即可</p>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code>oImg<span class="token punctuation">.</span>src <span class="token operator">=</span> <span class="token string">'images/2.jpg'</span>
</code></pre></div></li>
<li>
<p>不符合W3C标准的属性，要使用<code v-pre>setAttribute()</code>和<code v-pre>getAttribute()</code>来设置和读取</p>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code>oBox<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'data-n'</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>	 <span class="token comment">// 设置</span>
<span class="token keyword">var</span> n <span class="token operator">=</span> oBox<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">'data-n'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 读取</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div></li>
</ul>
<p>看一个示例</p>
<div class="language-html ext-html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span> innerHTML <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
        <span class="token selector">.box1</span> <span class="token punctuation">{</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> orange<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box2</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box3</span> <span class="token punctuation">{</span>
            <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #abc<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box4</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> #666666<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
        <span class="token comment">// 给节点追加className</span>
        <span class="token keyword">function</span> <span class="token function">addClassName</span><span class="token punctuation">(</span><span class="token parameter">element<span class="token punctuation">,</span> value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>element<span class="token punctuation">.</span>className<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                element<span class="token punctuation">.</span>className <span class="token operator">=</span> value<span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                element<span class="token punctuation">.</span>className <span class="token operator">=</span> element<span class="token punctuation">.</span>className <span class="token operator">+</span> <span class="token string">" "</span> <span class="token operator">+</span> value<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        window<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">/* 通过className批量设置属性，需要先定义好CSS属性，然后修改元素className即可 */</span>
            <span class="token keyword">var</span> box <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"box"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            box<span class="token punctuation">.</span>className <span class="token operator">=</span> <span class="token string">"box4"</span>

            <span class="token comment">/* 但是有一个缺点，这会覆盖对象的所有className，如果想要追加，可以自己实现函数*/</span>
            <span class="token function">addClassName</span><span class="token punctuation">(</span>box<span class="token punctuation">,</span> <span class="token string">"box4"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box1 box2 box3<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre></div><h3 id="节点创建和挂载" tabindex="-1"><a class="header-anchor" href="#节点创建和挂载" aria-hidden="true">#</a> 节点创建和挂载</h3>
<div class="language-html ext-html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Title<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>main1<span class="token punctuation">"</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">display</span><span class="token punctuation">:</span> flex</span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token comment">// 获取父节点</span>
    <span class="token keyword">const</span> main <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"main1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/*
        创建节点

        1.document.createElement用于创建一个指定tag name的HTML元素
        2.新创建出来的节点是孤儿节点，这意味着它还没有挂载到DOM上，所以我们在页面上无法找到它
    */</span>

    <span class="token keyword">const</span> divNode1 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'div'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    divNode1<span class="token punctuation">.</span>style<span class="token punctuation">.</span>width <span class="token operator">=</span> <span class="token string">'200px'</span><span class="token punctuation">;</span>
    divNode1<span class="token punctuation">.</span>style<span class="token punctuation">.</span>height <span class="token operator">=</span> <span class="token string">'200px'</span><span class="token punctuation">;</span>
    divNode1<span class="token punctuation">.</span>style<span class="token punctuation">.</span>backgroundColor <span class="token operator">=</span> <span class="token string">'red'</span><span class="token punctuation">;</span>

    <span class="token comment">/*
        挂载节点

        1.任何已经在DOM树上的节点，都可以调用 document.appendChild(孤儿节点)方法，
          让指定的故而节点挂载到自己内部，成为自己内部的最后一个子节点，从而在页面上可以找到它

        2.同理，还有 document.insertBefore(孤儿节点，标杆节点);  // 将孤儿节点插入在标杆节点之前
    */</span>

    <span class="token comment">// 挂载在DOM上，这时候应该出现一个 红色的正方形</span>
    main<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>divNode1<span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token comment">// 新创建一个节点，并挂载上去</span>
    <span class="token keyword">const</span> divNode2 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'div'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    divNode2<span class="token punctuation">.</span>style<span class="token punctuation">.</span>width <span class="token operator">=</span> <span class="token string">'200px'</span><span class="token punctuation">;</span>
    divNode2<span class="token punctuation">.</span>style<span class="token punctuation">.</span>height <span class="token operator">=</span> <span class="token string">'200px'</span><span class="token punctuation">;</span>
    divNode2<span class="token punctuation">.</span>style<span class="token punctuation">.</span>backgroundColor <span class="token operator">=</span> <span class="token string">'green'</span><span class="token punctuation">;</span>
    main<span class="token punctuation">.</span><span class="token function">insertBefore</span><span class="token punctuation">(</span>divNode2<span class="token punctuation">,</span> divNode1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// DOM结构：divNode2在divNode1之前</span>

    <span class="token comment">/*
    挂载节点-优化

    虽然提供了document.insertBefore(孤儿节点，标杆节点)，
    但是没有提供insertAfter（Webstorm有语法提示，有.d.ts文件定义，但是并没有实现），
    这时候可以自己手写一个，利用insertBefore
    */</span>
    <span class="token keyword">function</span> <span class="token function">insertAfter</span><span class="token punctuation">(</span><span class="token parameter">newElement<span class="token punctuation">,</span> targetElement</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> parent <span class="token operator">=</span> targetElement<span class="token punctuation">.</span>parentNode<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>targetElement <span class="token operator">===</span> parent<span class="token punctuation">.</span>lastChild<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//如果最后节点是目标元素，则直接添加，因为默认是在最后添加。</span>
            parent<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>newElement<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">//否则就插入到目标元素下一个兄弟节点的前面。</span>
            parent<span class="token punctuation">.</span><span class="token function">insertBefore</span><span class="token punctuation">(</span>newElement<span class="token punctuation">,</span> targetElement<span class="token punctuation">.</span>nextSibling<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>


    <span class="token comment">// 新创建一个节点</span>
    <span class="token keyword">const</span> divNode3 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'div'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    divNode3<span class="token punctuation">.</span>style<span class="token punctuation">.</span>width <span class="token operator">=</span> <span class="token string">'200px'</span><span class="token punctuation">;</span>
    divNode3<span class="token punctuation">.</span>style<span class="token punctuation">.</span>height <span class="token operator">=</span> <span class="token string">'200px'</span><span class="token punctuation">;</span>
    divNode3<span class="token punctuation">.</span>style<span class="token punctuation">.</span>backgroundColor <span class="token operator">=</span> <span class="token string">'orange'</span><span class="token punctuation">;</span>
    <span class="token function">insertAfter</span><span class="token punctuation">(</span>divNode3<span class="token punctuation">,</span> divNode1<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 将divNode3挂载在divNode1后面</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre></div><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211012111427036.png" alt="image-20211012111427036"></p>
<h3 id="节点移动" tabindex="-1"><a class="header-anchor" href="#节点移动" aria-hidden="true">#</a> 节点移动</h3>
<div class="language-html ext-html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Title<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
        <span class="token selector">.circle</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
            <span class="token property">border-radius</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
            <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
            <span class="token property">line-height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.red</span> <span class="token punctuation">{</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.green</span> <span class="token punctuation">{</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> yellowgreen<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.blue</span> <span class="token punctuation">{</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> deepskyblue<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>main<span class="token punctuation">"</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">display</span><span class="token punctuation">:</span> flex</span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>red<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>circle red<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>green<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>circle green<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>blue<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>circle blue<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token comment">// 获取父节点</span>
    <span class="token keyword">const</span> main <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"main"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/*
        移动节点

        移动节点和挂载节点用的是一样的函数，都是这两个：
            父节点.appendChild(已挂载的节点(这个会移动))
            父节点.insertBefore(已挂载的节点(这个会移动)，已挂载的节点)，
        不同的是：

        1、挂载的时候要求这里是一个孤儿节点，而移动时要求是一个已经挂载的节点，会移动这个节点到新的父节点下

        移动的本质：一个节点不能同时挂载在DOM树上的两个位置，将一个已存在的节点挂载到别的地方去，就实现了移动

        下面就移动来看一下，移动之前，上面3个圆依次按：红、绿、蓝排序，我们将按照蓝、红、绿排序，试一下
    */</span>

    <span class="token comment">// 获取3个节点</span>
    <span class="token keyword">const</span> nodeRed <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'red'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> nodeGreen <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'green'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> nodeBlue <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'blue'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 将绿移动到最后，这时候应该是红、蓝、绿</span>
    main<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>nodeGreen<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 将红、蓝 改为 蓝、红</span>
    main<span class="token punctuation">.</span><span class="token function">insertBefore</span><span class="token punctuation">(</span>nodeBlue<span class="token punctuation">,</span> nodeRed<span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre></div><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211012113816953.png" alt="image-20211012113816953"></p>
<h3 id="节点删除和克隆" tabindex="-1"><a class="header-anchor" href="#节点删除和克隆" aria-hidden="true">#</a> 节点删除和克隆</h3>
<div class="language-html ext-html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Title<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
        <span class="token selector">.circle</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
            <span class="token property">border-radius</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
            <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
            <span class="token property">line-height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.red</span> <span class="token punctuation">{</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.green</span> <span class="token punctuation">{</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> yellowgreen<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.blue</span> <span class="token punctuation">{</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> deepskyblue<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>main<span class="token punctuation">"</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">display</span><span class="token punctuation">:</span> flex</span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>red<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>circle red<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>green<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>circle green<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>blue<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>circle blue<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token comment">// 获取父节点</span>
    <span class="token keyword">const</span> main <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"main"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/*
        删除节点
            节点不能主动自我删除，必须由父节点来删除，语法：父节点.removeChild(子节点)
        克隆节点
            节点.cloneNode()可以克隆节点，克隆出来的节点是孤儿节点
            节点.cloneNode(true) 深度克隆节点，克隆出来的节点是孤儿节点
    */</span>

    <span class="token comment">// 获取3个节点</span>
    <span class="token keyword">const</span> nodeRed <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'red'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> nodeGreen <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'green'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> nodeBlue <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'blue'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 克隆第二个节点，并修改内容</span>
    <span class="token keyword">const</span> nodeGreen2 <span class="token operator">=</span> nodeGreen<span class="token punctuation">.</span><span class="token function">cloneNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    nodeGreen2<span class="token punctuation">.</span>innerText <span class="token operator">=</span> <span class="token string">"我是从2克隆来的"</span>

    <span class="token comment">// 删除第二个节点</span>
    main<span class="token punctuation">.</span><span class="token function">removeChild</span><span class="token punctuation">(</span>nodeGreen<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 挂载克隆节点</span>
    main<span class="token punctuation">.</span><span class="token function">insertBefore</span><span class="token punctuation">(</span>nodeGreen2<span class="token punctuation">,</span> nodeBlue<span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre></div><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211012114547365.png" alt="image-20211012114547365"></p>
<h3 id="事件监听" tabindex="-1"><a class="header-anchor" href="#事件监听" aria-hidden="true">#</a> 事件监听</h3>
<ul>
<li>什么是事件?</li>
</ul>
<p>事件我们可以理解为，用户与网页的交互动作，比如鼠标点击某个元素、鼠标移动到某个元素上、按下键盘某个按键等</p>
<ul>
<li>什么是事件监听?</li>
</ul>
<p>让计算机监听某个事件，然后执行我们的代码，设置事件监听主要有两种方法</p>
<p><code v-pre>onxxx</code>和<code v-pre>.addEventListener()</code>，二者的区别在 <strong>事件传播</strong> 中介绍</p>
<h4 id="常见的鼠标事件监听" tabindex="-1"><a class="header-anchor" href="#常见的鼠标事件监听" aria-hidden="true">#</a> 常见的鼠标事件监听</h4>
<table>
<thead>
<tr>
<th>事件名</th>
<th>事件描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>onclick</code></td>
<td>当鼠标单击某个对象</td>
</tr>
<tr>
<td><code v-pre>ondblclick</code></td>
<td>当鼠标双击某个对象</td>
</tr>
<tr>
<td><code v-pre>onmousedown</code></td>
<td>当某个鼠标按键在某个对象上被按下</td>
</tr>
<tr>
<td><code v-pre>onmouseup</code></td>
<td>当某个鼠标按键在某个对象上被松开</td>
</tr>
<tr>
<td><code v-pre>onmousemove</code></td>
<td>当某个鼠标按键在某个对象上被移动</td>
</tr>
<tr>
<td><code v-pre>onmouseenter</code></td>
<td>当鼠标进入某个对象（相似事件：<code v-pre>onmouseover</code>，二者的区别在 <strong>事件传播</strong> 中介绍）</td>
</tr>
<tr>
<td><code v-pre>onmouseleave</code></td>
<td>当鼠标离开某个对象（相似事件：<code v-pre>onmouseout</code>，二者的区别在 <strong>事件传播</strong> 中介绍）</td>
</tr>
<tr>
<td><code v-pre>onmousewheel</code></td>
<td>鼠标滚轮事件</td>
</tr>
</tbody>
</table>
<p>回调函数接收一个<code v-pre>MouseEvent </code>对象，参考文档：https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent</p>
<p>示例代码-1</p>
<div class="language-html ext-html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Title<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
        <span class="token selector">.circle</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
            <span class="token property">border-radius</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
            <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
            <span class="token property">line-height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.red</span> <span class="token punctuation">{</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.green</span> <span class="token punctuation">{</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> yellowgreen<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.blue</span> <span class="token punctuation">{</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> deepskyblue<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>main<span class="token punctuation">"</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">display</span><span class="token punctuation">:</span> flex</span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>red<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>circle red<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token comment">// 获取红色节点</span>
    <span class="token keyword">const</span> nodeRed <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'red'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 某个按键被按下事件</span>
    nodeRed<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'mousedown'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'被按下'</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// 某个按键被松开事件</span>
    <span class="token comment">// 注意如果在别的地方按下了按键但是没松开，放到这个元素上松开，事件也是会触发的</span>
    nodeRed<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'mouseup'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'被松开'</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// 左键点击事件：先触发按下事件，再触发松开事件，然后再触发点击事件</span>
    nodeRed<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'被点击'</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// 左键双击事件: 先触发两次点击事件，然后触发双击事件</span>
    nodeRed<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'dblclick'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'被双击'</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// 鼠标进入事件</span>
    nodeRed<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'mouseenter'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'鼠标进入事件'</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// 鼠标离开事件</span>
    nodeRed<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'mouseleave'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'鼠标离开事件'</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre></div><p>示例代码-2</p>
<div class="language-html ext-html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>鼠标滚轮事件<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
        <span class="token selector">#box</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> lightgreen<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">body</span> <span class="token punctuation">{</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 2000px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>info<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token comment">/*
        鼠标滚轮事件：当鼠标在盒子中向下滚动时，数字+1，反之-1
        鼠标滚轮事件是onmousewheel, 它的事件对象e提供deltaY属性表示鼠标滚动方向，向下滚动返回正值，反之返回负值
     */</span>
    window<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> box <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"box"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">const</span> info <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"info"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

        box<span class="token punctuation">.</span><span class="token function-variable function">onmousewheel</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// 阻止默认事件</span>
            <span class="token comment">// if (e.deltaY > 0) { // 向下滚动</span>
            <span class="token comment">//     a++;</span>
            <span class="token comment">// } else {</span>
            <span class="token comment">//     a--;            // 向下滚动</span>
            <span class="token comment">// }</span>
            e<span class="token punctuation">.</span>deltaY <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">?</span> a<span class="token operator">++</span> <span class="token operator">:</span> a<span class="token operator">--</span>
            info<span class="token punctuation">.</span>innerText <span class="token operator">=</span> a<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre></div><h4 id="常见的键盘事件监听" tabindex="-1"><a class="header-anchor" href="#常见的键盘事件监听" aria-hidden="true">#</a> 常见的键盘事件监听</h4>
<table>
<thead>
<tr>
<th>事件名</th>
<th>事件描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>onkeypress</code></td>
<td>当某个按键被按下（系统按键如箭头键和功能键等无法识别）</td>
</tr>
<tr>
<td><code v-pre>onkeydown</code></td>
<td>当某个按键被按下（系统按键可以识别，并且优先于<code v-pre>onkeypress</code>）</td>
</tr>
<tr>
<td><code v-pre>onkeyup</code></td>
<td>当某个按键被松开</td>
</tr>
</tbody>
</table>
<p>回调函数接收一个<code v-pre>KeyboardEvent </code>对象，参考文档：https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent</p>
<p>示例代码</p>
<div class="language-html ext-html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Title<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
        <span class="token selector">.circle</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
            <span class="token property">border-radius</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
            <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
            <span class="token property">line-height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.red</span> <span class="token punctuation">{</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.green</span> <span class="token punctuation">{</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> yellowgreen<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.blue</span> <span class="token punctuation">{</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> deepskyblue<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>main<span class="token punctuation">"</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">display</span><span class="token punctuation">:</span> flex</span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>red<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>circle red<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token comment">// 获取红色节点</span>
    <span class="token keyword">const</span> nodeRed <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'red'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 不推荐使用的API</span>
    <span class="token comment">/*
        很多在还在用 KeyboardEvent.keycode属性，但是已经不推荐使用了，应该使用KeyboardEvent.key来代替
        参考文档：https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/keyCode
    */</span>


    <span class="token comment">// KeyboardEvent.code介绍</span>
    <span class="token comment">/*
        文档：https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/code

        以下是一些测试结果：
            Code: 键盘按键被按下:  KeyA        --> 字母a
            Code: 键盘按键被按下:  Digit1      --> 大键盘1
            Code: 键盘按键被按下:  Numpad1     --> 小键盘1
            Code: 键盘按键被按下:  Minus       --> 大键盘-键（+键旁边）
            Code: 键盘按键被按下:  Equal       --> 大键盘+键
        结果分析：
            可以识别键盘布局，即 大键盘中的数字1和小键盘中的数字1被识别为不同的对象
     */</span>
    <span class="token comment">// document.addEventListener('keydown', function (e) {</span>
    <span class="token comment">//     console.log('Code: 键盘按键被按下: ', e.code);</span>
    <span class="token comment">// })</span>

    <span class="token comment">// KeyboardEvent.key介绍</span>
    <span class="token comment">/*
    文档：https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/key

    以下是一些测试结果：
        Key: 键盘按键被按下:  a        --> 字母a
        Key: 键盘按键被按下:  1        --> 大键盘1
        Key: 键盘按键被按下:  2        --> 小键盘2
        Key: 键盘按键被按下:  Alt
        Key: 键盘按键被按下:  Shift
        Key: 键盘按键被按下:  CapsLock
    结果分析：
        无法识别键盘布局，即 大键盘中的数字1和小键盘中的数字1被识别为相同的对象
    */</span>
    document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'keydown'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Key: 键盘按键被按下: '</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre></div><h4 id="常见的页面事件监听" tabindex="-1"><a class="header-anchor" href="#常见的页面事件监听" aria-hidden="true">#</a> 常见的页面事件监听</h4>
<table>
<thead>
<tr>
<th>事件名</th>
<th>事件描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>onload</code></td>
<td>当页面或图像被完全加载完后执行</td>
</tr>
<tr>
<td><code v-pre>onunload</code></td>
<td>当用户退出页面时执行（经测试不好用）</td>
</tr>
</tbody>
</table>
<p>回调函数接收一个<code v-pre>Event </code>对象，参考文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Event</p>
<p>示例代码</p>
<div class="language-html ext-html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Title<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
        <span class="token selector">.circle</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
            <span class="token property">border-radius</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
            <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
            <span class="token property">line-height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.red</span> <span class="token punctuation">{</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.green</span> <span class="token punctuation">{</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> yellowgreen<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.blue</span> <span class="token punctuation">{</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> deepskyblue<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span> <span class="token special-attr"><span class="token attr-name">onunload</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value javascript language-javascript"><span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'The onunload event was triggered'</span><span class="token punctuation">)</span></span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token comment">// 先执行js代码，后加载HTML页面时，获取不到DOM节点</span>
    <span class="token keyword">const</span> main <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"main"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>main<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// null</span>

    <span class="token comment">// 解决方法使用 onload</span>
    window<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> main <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"main"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>main<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>main<span class="token punctuation">"</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">display</span><span class="token punctuation">:</span> flex</span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>red<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>circle red<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre></div><h4 id="常见的表单事件监听" tabindex="-1"><a class="header-anchor" href="#常见的表单事件监听" aria-hidden="true">#</a> 常见的表单事件监听</h4>
<table>
<thead>
<tr>
<th>事件名</th>
<th>事件描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>onfocus</code></td>
<td>当元素获得焦点时（比如tab键或鼠标点击）</td>
</tr>
<tr>
<td><code v-pre>onblur</code></td>
<td>当元素失去焦点时</td>
</tr>
<tr>
<td><code v-pre>onsubmit</code></td>
<td>当表单提交时</td>
</tr>
<tr>
<td><code v-pre>onreset</code></td>
<td>当表单重置时</td>
</tr>
<tr>
<td><code v-pre>onchange</code></td>
<td>当用户改变域内容时（比如改变input框内容）</td>
</tr>
<tr>
<td><code v-pre>oninput</code></td>
<td></td>
</tr>
</tbody>
</table>
<p><code v-pre>input</code>输入框事件示例</p>
<div class="language-html ext-html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Title<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>login-form<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>用户名<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>username<span class="token punctuation">"</span></span> <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>请输入用户名<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>密码<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>password<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>password<span class="token punctuation">"</span></span> <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>请输入密码<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">></span></span>登录<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">></span></span>重置<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">const</span> form <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'login-form'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 用户名输入框，获得焦点触发</span>
    form<span class="token punctuation">.</span>username<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'focus'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"【focus】 用户名输入框已经获得焦点，请放心输入"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// 用户名输入框，输入内容时触发</span>
    form<span class="token punctuation">.</span>username<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'input'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">【input】 您输入的总内容是：</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">，本次输入内容为：</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>e<span class="token punctuation">.</span>data<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// 用户名输入框</span>
    form<span class="token punctuation">.</span>username<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'change'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"【change】输入完成，准备撤退了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// 用户名输入框失去焦点</span>
    form<span class="token punctuation">.</span>username<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'blur'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"【blur】 失去焦点，大哥下次再来啊~~"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre></div><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211012161843590.png" alt="image-20211012161843590"></p>
<p><code v-pre>form</code>重置与提交示例</p>
<div class="language-html ext-html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Title<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>login-form<span class="token punctuation">"</span></span> <span class="token attr-name">action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/login<span class="token punctuation">"</span></span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>post<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>用户名<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>username<span class="token punctuation">"</span></span> <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>请输入用户名<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>密码<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>password<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>password<span class="token punctuation">"</span></span> <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>请输入密码<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>button<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>重置1<span class="token punctuation">"</span></span> <span class="token special-attr"><span class="token attr-name">onclick</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value javascript language-javascript"><span class="token function">formReset</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>reset<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>重置2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>button<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>登录1<span class="token punctuation">"</span></span> <span class="token special-attr"><span class="token attr-name">onclick</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value javascript language-javascript"><span class="token function">formSubmit</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>submit<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>登录2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">const</span> form <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'login-form'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 重置表单-方法1</span>
    <span class="token keyword">function</span> <span class="token function">formReset</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"重置表单方式1..."</span><span class="token punctuation">)</span>
        form<span class="token punctuation">.</span><span class="token function">reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 重置表单-方法2</span>
    <span class="token comment">// 修改HTML代码中input的type="reset"即可</span>

    <span class="token comment">// 表单被重置的事件监听</span>
    form<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'reset'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"【reset】 表单被重置了!朕的大清亡了？"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">/* ------------------------------------------------------- */</span>

    <span class="token comment">/*
        下面两种方法都可以提交表单，但是有区别
            方法1：使用form.submit()不会触发onsubmit事件
            方法2：使用type="submit"会触发onsubmit事件
    */</span>

    <span class="token comment">// 表单提交-方法1</span>
    <span class="token keyword">function</span> <span class="token function">formSubmit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        form<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 表单提交-方法2</span>
    <span class="token comment">// 修改HTML代码中input的type="submit"即可</span>

    <span class="token comment">// 表单被提交的事件监听</span>
    form<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'submit'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'【submit】 表单被提交了！'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre></div><h3 id="事件传播" tabindex="-1"><a class="header-anchor" href="#事件传播" aria-hidden="true">#</a> 事件传播</h3>
<p>事件传播研究的是：当有多个盒子（诸如div等盒模型）嵌套时，事件监听执行的顺序问题</p>
<p>先上结论：</p>
<ul>
<li>
<p>事件传播<strong>先由外向内</strong>，这称为捕获阶段，然后<strong>再由内向外</strong>，这称为冒泡阶段</p>
</li>
<li>
<p><code v-pre>onxxx</code>只能监听冒泡阶段事件；</p>
<p><code v-pre>.addEventListener(xxx, function, true)</code>监听捕获阶段事件，</p>
<p><code v-pre>.addEventListener(xxx, function)</code>监听冒泡阶段事件，</p>
<p>区别在于第三个参数是否为true</p>
</li>
<li>
<p>如果给元素设置两个或多个同名事件，则<code v-pre>onxxx</code>会进行覆盖，<code v-pre>.addEventListene</code>会执行多次</p>
</li>
</ul>
<h4 id="测试1-事件传播顺序-捕获阶段-冒泡阶段" tabindex="-1"><a class="header-anchor" href="#测试1-事件传播顺序-捕获阶段-冒泡阶段" aria-hidden="true">#</a> 测试1：事件传播顺序(捕获阶段/冒泡阶段)</h4>
<div class="language-html ext-html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Title<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
        <span class="token comment">/* 公共样式 */</span>
        <span class="token selector">*</span> <span class="token punctuation">{</span>
            <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
            <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
            <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">html, body</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">/* 盒子样式 */</span>
        <span class="token selector">.box</span> <span class="token punctuation">{</span>
            <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #000<span class="token punctuation">;</span>
            <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
            <span class="token comment">/*必须指定高度*/</span>
            <span class="token comment">/*height: 100%;*/</span>
            <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span> <span class="token comment">/* 水平居中 */</span>
            <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span> <span class="token comment">/* 垂直居中 */</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box1</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 600px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 600px<span class="token punctuation">;</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> #8c939d<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box2</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> #8cc5ff<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box3</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> #a4da89<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box-wrapper</span> <span class="token punctuation">{</span>
            <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
            <span class="token comment">/*必须指定高度*/</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
            <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span> <span class="token comment">/* 水平居中 */</span>
            <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span> <span class="token comment">/* 垂直居中 */</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box .title</span> <span class="token punctuation">{</span>
            <span class="token property">flex</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
            <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box-wrapper<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box1<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box box1 <span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box2<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box box2 <span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box3<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box box3 <span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token comment">// 获取3个盒子</span>
    <span class="token keyword">const</span> box1 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"box1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> box2 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"box2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> box3 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"box3"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 封装的通用回调函数</span>
    <span class="token keyword">function</span> <span class="token function">test1</span><span class="token punctuation">(</span><span class="token parameter">message</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>   
        <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>message<span class="token punctuation">,</span> e<span class="token punctuation">.</span>currentTarget<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    
	<span class="token comment">// 测试1：验证捕获阶段和冒泡阶段执行顺序</span>
    box1<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token function">test1</span><span class="token punctuation">(</span><span class="token string">"box1 捕获阶段"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    box1<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token function">test1</span><span class="token punctuation">(</span><span class="token string">"box1 冒泡阶段"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    box3<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token function">test1</span><span class="token punctuation">(</span><span class="token string">"box3 捕获阶段"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    box3<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token function">test1</span><span class="token punctuation">(</span><span class="token string">"box3 冒泡阶段"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    box2<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token function">test1</span><span class="token punctuation">(</span><span class="token string">"box2 捕获阶段"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    box2<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token function">test1</span><span class="token punctuation">(</span><span class="token string">"box2 冒泡阶段"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre></div><p>点击<code v-pre>box3</code>盒子，然后查看输出</p>
<p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211013104423422.png" alt="image-20211013104423422"></p>
<h4 id="测试2-onxxx和-addeventlistener监听区别" tabindex="-1"><a class="header-anchor" href="#测试2-onxxx和-addeventlistener监听区别" aria-hidden="true">#</a> 测试2：<code v-pre>onxxx</code>和<code v-pre>.addEventListener</code>监听区别</h4>
<div class="language-html ext-html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Title<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
        <span class="token comment">/* 公共样式 */</span>
        <span class="token selector">*</span> <span class="token punctuation">{</span>
            <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
            <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
            <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">html, body</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">/* 盒子样式 */</span>
        <span class="token selector">.box</span> <span class="token punctuation">{</span>
            <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #000<span class="token punctuation">;</span>
            <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
            <span class="token comment">/*必须指定高度*/</span>
            <span class="token comment">/*height: 100%;*/</span>
            <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span> <span class="token comment">/* 水平居中 */</span>
            <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span> <span class="token comment">/* 垂直居中 */</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box1</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 600px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 600px<span class="token punctuation">;</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> #8c939d<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box2</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> #8cc5ff<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box3</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> #a4da89<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box-wrapper</span> <span class="token punctuation">{</span>
            <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
            <span class="token comment">/*必须指定高度*/</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
            <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span> <span class="token comment">/* 水平居中 */</span>
            <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span> <span class="token comment">/* 垂直居中 */</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box .title</span> <span class="token punctuation">{</span>
            <span class="token property">flex</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
            <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box-wrapper<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box1<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box box1 <span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box2<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box box2 <span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box3<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box box3 <span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token comment">// 获取3个盒子</span>
    <span class="token keyword">const</span> box1 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"box1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> box2 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"box2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> box3 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"box3"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 封装的通用回调函数</span>
    <span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token parameter">message</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>message<span class="token punctuation">,</span> e<span class="token punctuation">.</span>currentTarget<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 测试2：验证捕获阶段和冒泡阶段执行顺序</span>
    box1<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">"box1 捕获阶段"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    box1<span class="token punctuation">.</span>onclick <span class="token operator">=</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">"box1 冒泡阶段"</span><span class="token punctuation">)</span>
    box2<span class="token punctuation">.</span>onclick <span class="token operator">=</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">"box2 冒泡阶段"</span><span class="token punctuation">)</span>
    box3<span class="token punctuation">.</span>onclick <span class="token operator">=</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">"box3 冒泡阶段"</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre></div><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211013164054123.png" alt="image-20211013164054123"></p>
<h4 id="测试3-设置两个或多个同名事件" tabindex="-1"><a class="header-anchor" href="#测试3-设置两个或多个同名事件" aria-hidden="true">#</a> 测试3：设置两个或多个同名事件</h4>
<div class="language-html ext-html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Title<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
        <span class="token comment">/* 公共样式 */</span>
        <span class="token selector">*</span> <span class="token punctuation">{</span>
            <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
            <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
            <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">html, body</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">/* 盒子样式 */</span>
        <span class="token selector">.box</span> <span class="token punctuation">{</span>
            <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #000<span class="token punctuation">;</span>
            <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
            <span class="token comment">/*必须指定高度*/</span>
            <span class="token comment">/*height: 100%;*/</span>
            <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span> <span class="token comment">/* 水平居中 */</span>
            <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span> <span class="token comment">/* 垂直居中 */</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box1</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 600px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 600px<span class="token punctuation">;</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> #8c939d<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box2</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> #8cc5ff<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box3</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> #a4da89<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box-wrapper</span> <span class="token punctuation">{</span>
            <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
            <span class="token comment">/*必须指定高度*/</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
            <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span> <span class="token comment">/* 水平居中 */</span>
            <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span> <span class="token comment">/* 垂直居中 */</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box .title</span> <span class="token punctuation">{</span>
            <span class="token property">flex</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
            <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box-wrapper<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box1<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box box1 <span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box2<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box box2 <span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box3<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box box3 <span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token comment">// 获取3个盒子</span>
    <span class="token keyword">const</span> box1 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"box1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> box2 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"box2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> box3 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"box3"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 封装的通用回调函数</span>
    <span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token parameter">message</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>message<span class="token punctuation">,</span> e<span class="token punctuation">.</span>currentTarget<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 测试3：设置两个或多个同名事件</span>
    box1<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">"box1 捕获阶段-1"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    box1<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">"box1 捕获阶段-2"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    box1<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">"box1 冒泡阶段-1"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    box1<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">"box1 冒泡阶段-2"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    box2<span class="token punctuation">.</span>onclick <span class="token operator">=</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">"box2 冒泡阶段-1"</span><span class="token punctuation">)</span>
    box2<span class="token punctuation">.</span>onclick <span class="token operator">=</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">"box2 冒泡阶段-2"</span><span class="token punctuation">)</span>

    box3<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">"box3 冒泡阶段-1"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    box3<span class="token punctuation">.</span>onclick <span class="token operator">=</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">"box3 冒泡阶段-2"</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre></div><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211013164556150.png" alt="image-20211013164556150"></p>
<h4 id="测试4-mouseenter和mouseenter的区别" tabindex="-1"><a class="header-anchor" href="#测试4-mouseenter和mouseenter的区别" aria-hidden="true">#</a> 测试4：<code v-pre>mouseenter</code>和<code v-pre>mouseenter</code>的区别</h4>
<div class="language-html ext-html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Title<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
        <span class="token comment">/* 公共样式 */</span>
        <span class="token selector">*</span> <span class="token punctuation">{</span>
            <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
            <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
            <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">html, body</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">/* 盒子样式 */</span>
        <span class="token selector">.box</span> <span class="token punctuation">{</span>
            <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #000<span class="token punctuation">;</span>
            <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
            <span class="token comment">/*必须指定高度*/</span>
            <span class="token comment">/*height: 100%;*/</span>
            <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span> <span class="token comment">/* 水平居中 */</span>
            <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span> <span class="token comment">/* 垂直居中 */</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box1</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 600px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 600px<span class="token punctuation">;</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> #8c939d<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box2</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> #8cc5ff<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box3</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> #a4da89<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box-wrapper</span> <span class="token punctuation">{</span>
            <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
            <span class="token comment">/*必须指定高度*/</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
            <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span> <span class="token comment">/* 水平居中 */</span>
            <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span> <span class="token comment">/* 垂直居中 */</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box .title</span> <span class="token punctuation">{</span>
            <span class="token property">flex</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
            <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box-wrapper<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box1<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box box1 <span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box2<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box box2 <span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box3<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box box3 <span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token comment">// 获取3个盒子</span>
    <span class="token keyword">const</span> box1 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"box1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> box2 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"box2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> box3 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"box3"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 封装的通用回调函数</span>
    <span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token parameter">message</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>message<span class="token punctuation">,</span> e<span class="token punctuation">.</span>currentTarget<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 测试4：mouseenter和mouseenter的区别</span>
    box1<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'mouseenter'</span><span class="token punctuation">,</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">"box1 mouseenter 捕获阶段"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    box1<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'mouseenter'</span><span class="token punctuation">,</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">"box1 mouseenter 冒泡阶段"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    box1<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'mouseover'</span><span class="token punctuation">,</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">"box1 mouseover 捕获阶段"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    box1<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'mouseover'</span><span class="token punctuation">,</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token string">"box1 mouseover 冒泡阶段"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// box2.addEventListener('mouseenter', test("box2 mouseenter 捕获阶段"), true);</span>
    <span class="token comment">// box2.addEventListener('mouseenter', test("box2 mouseenter 冒泡阶段"), false);</span>
    <span class="token comment">//</span>
    <span class="token comment">// box2.addEventListener('mouseover', test("box2 mouseover 捕获阶段"), true);</span>
    <span class="token comment">// box2.addEventListener('mouseover', test("box2 mouseover 冒泡阶段"), false);</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre></div><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211014085209144.png" alt="image-20211014085209144"></p>
<p><strong>分析</strong></p>
<ul>
<li>当绑定两个事件的元素里面没有子元素的时候，这两个事件的触发效果是一致的</li>
<li>当绑定事件的元素里面有子元素并且鼠标经过(进入)时，mouseover两个阶段会触发，mouseenter只触发捕获，不会冒泡</li>
<li>当绑定事件的元素里面有子元素并且鼠标经过(移出)时，mouseover两个阶段会触发，mouseenter不会触发</li>
</ul>
<h3 id="事件对象" tabindex="-1"><a class="header-anchor" href="#事件对象" aria-hidden="true">#</a> 事件对象</h3>
<p>我们在上面事件监听中用到的e对象，就是事件对象</p>
<h4 id="鼠标位置" tabindex="-1"><a class="header-anchor" href="#鼠标位置" aria-hidden="true">#</a> 鼠标位置</h4>
<table>
<thead>
<tr>
<th>属性</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>clientX</code></td>
<td>鼠标指针相对于浏览器的水平坐标</td>
</tr>
<tr>
<td><code v-pre>clientY</code></td>
<td>鼠标指针相对于浏览器的垂直坐标</td>
</tr>
<tr>
<td><code v-pre>pageX</code></td>
<td>鼠标指针相对于整张网页的水平坐标</td>
</tr>
<tr>
<td><code v-pre>pageY</code></td>
<td>鼠标指针相对于整张网页的垂直坐标</td>
</tr>
<tr>
<td><code v-pre>offsetX</code></td>
<td>鼠标指针相对于事件源元素的水平坐标</td>
</tr>
<tr>
<td><code v-pre>offsetY</code></td>
<td>鼠标指针相对于事件源元素的垂直坐标</td>
</tr>
</tbody>
</table>
<h4 id="常用属性" tabindex="-1"><a class="header-anchor" href="#常用属性" aria-hidden="true">#</a> 常用属性</h4>
<table>
<thead>
<tr>
<th>属性</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>target</code></td>
<td>触发事件的对象 (某个DOM元素)，在冒泡阶段表示的是源元素；举例参考：事件委托</td>
</tr>
<tr>
<td><code v-pre>currentTarget</code></td>
<td>触发事件的对象 (某个DOM元素)，在冒泡阶段表示的是附加元素；举例参考：事件委托</td>
</tr>
</tbody>
</table>
<h4 id="常用方法-stoppropagation" tabindex="-1"><a class="header-anchor" href="#常用方法-stoppropagation" aria-hidden="true">#</a> 常用方法：<code v-pre>stopPropagation</code></h4>
<div class="language-html ext-html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>stopPropagation测试<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
        <span class="token selector">.box</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> #8cc5ff<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    window<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> box <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementsByClassName</span><span class="token punctuation">(</span><span class="token string">"box"</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">const</span> btn <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementsByClassName</span><span class="token punctuation">(</span><span class="token string">"btn"</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

        box<span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"我是盒子"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        btn<span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 在冒泡阶段阻止事件传播，所以box的onclick将不会触发</span>
            e<span class="token punctuation">.</span><span class="token function">stopPropagation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"我是按钮"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btn<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>点我<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre></div><h4 id="常用方法-preventdefault" tabindex="-1"><a class="header-anchor" href="#常用方法-preventdefault" aria-hidden="true">#</a> 常用方法：<code v-pre>preventdefault</code></h4>
<div class="language-html ext-html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>preventDefault测试<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>bd<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://www.baidu.com<span class="token punctuation">"</span></span> <span class="token attr-name">target</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>_blank<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>百度<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">const</span> bd <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'bd'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 阻止默认事件</span>
    bd<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"点击"</span><span class="token punctuation">)</span>

        <span class="token comment">// 阻止a标签默认的跳转</span>
        e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre></div><h3 id="事件委托" tabindex="-1"><a class="header-anchor" href="#事件委托" aria-hidden="true">#</a> 事件委托</h3>
<h4 id="原理" tabindex="-1"><a class="header-anchor" href="#原理" aria-hidden="true">#</a> 原理</h4>
<img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211018115458802.png" alt="image-20211018115458802" style="zoom:50%;" />
<p>元素本身(上面例子中是li元素)并没有监听事件，而是通过事件冒泡机制，在父元素上(上面例子是ul)添加事件监听，</p>
<p>父元素通过<code v-pre>event.target</code>来定位到具体是哪个元素，然后再进行相应操作</p>
<h4 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景" aria-hidden="true">#</a> 应用场景</h4>
<ul>
<li>当有大量类似元素需要批量添加事件时，使用事件委托可以减少内存开销</li>
<li>当有动态元素添加时，使用事件委托可以让新加的元素具有监听事件</li>
</ul>
<h4 id="使用限制" tabindex="-1"><a class="header-anchor" href="#使用限制" aria-hidden="true">#</a> 使用限制</h4>
<ul>
<li>不能委托不冒泡的事件</li>
<li>最内层元素(下面例子中是li)不能再有额外的内层元素</li>
</ul>
<h4 id="示例代码" tabindex="-1"><a class="header-anchor" href="#示例代码" aria-hidden="true">#</a> 示例代码</h4>
<div class="language-html ext-html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btn<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>按我创建一个新列表项<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>list<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span>列表项<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span>列表项<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span>列表项<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">var</span> oList <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'list'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> oBtn <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'btn'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    oBtn<span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 创建新的li元素</span>
        <span class="token keyword">var</span> oLi <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'li'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 写内容</span>
        oLi<span class="token punctuation">.</span>innerText <span class="token operator">=</span> <span class="token string">'我是新来的'</span><span class="token punctuation">;</span>
        <span class="token comment">// 上树</span>
        oList<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>oLi<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token comment">// 就是哪个DOM节点自己触发的事件,没有冒泡过程</span>
    oList<span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 清空已经存在的样式，类似于单选的效果，如果不需要刻意将这段代码注释</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> ele <span class="token keyword">of</span> oList<span class="token punctuation">.</span>children<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            ele<span class="token punctuation">.</span>style<span class="token punctuation">.</span>color <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// e.target表示用户真正点击的那个元素</span>
        e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>style<span class="token punctuation">.</span>color <span class="token operator">=</span> <span class="token string">'red'</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre></div><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211018164035140.png" alt="image-20211018164035140"></p>
<h3 id="定时器和延时器" tabindex="-1"><a class="header-anchor" href="#定时器和延时器" aria-hidden="true">#</a> 定时器和延时器</h3>
<h4 id="基本使用" tabindex="-1"><a class="header-anchor" href="#基本使用" aria-hidden="true">#</a> 基本使用</h4>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// setInterval接收一个函数和一个时间间隔(毫秒)，每隔一个时间间隔就会调用一下这个函数，如下面每隔1秒会将interVar+1，并输出</span>
    <span class="token keyword">var</span> interVar <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"定时器执行结果: "</span><span class="token punctuation">,</span> interVar<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// setTimeout接收一个函数和一个时间间隔(毫秒)，等待一个时间间隔后就会调用这个函数，只会调用一次</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"我是延迟器，我执行了"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">3000</span><span class="token punctuation">)</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211018194617382.png" alt="image-20211018194617382"></p>
<h4 id="取消定时器和延时器" tabindex="-1"><a class="header-anchor" href="#取消定时器和延时器" aria-hidden="true">#</a> 取消定时器和延时器</h4>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// setInterval接收一个函数和一个时间间隔(毫秒)，每隔一个时间间隔就会调用一下这个函数，如下面每隔1秒会将interVar+1，并输出</span>
    <span class="token keyword">var</span> interVar <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> intervalFun <span class="token operator">=</span> <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"定时器执行结果: "</span><span class="token punctuation">,</span> interVar<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 取消定时器</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>interVar <span class="token operator">===</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">clearInterval</span><span class="token punctuation">(</span>intervalFun<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// setTimeout接收一个函数和一个时间间隔(毫秒)，等待一个时间间隔后就会调用这个函数，只会调用一次</span>
    <span class="token keyword">var</span> timeoutFun <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"我是延迟器，我执行了"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">3000</span><span class="token punctuation">)</span>
    <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timeoutFun<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 取消延迟器，此时上面的代码还未执行，所以什么也不会输出</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211018195042454.png" alt="image-20211018195042454"></p>
<h4 id="异步特性" tabindex="-1"><a class="header-anchor" href="#异步特性" aria-hidden="true">#</a> 异步特性</h4>
<p><code v-pre>setInterval</code>和<code v-pre>setTimeout</code>都是异步函数，意味着不会阻塞CPU继续向下执行代码，</p>
<p>所以在上面代码基础上我们再加一句代码<code v-pre>console.log(&quot;End&quot;)</code>，那么在浏览器中是<code v-pre>End</code>先输出到屏幕上</p>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// setInterval接收一个函数和一个时间间隔(毫秒)，每隔一个时间间隔就会调用一下这个函数，如下面每隔1秒会将interVar+1，并输出</span>
    <span class="token keyword">var</span> interVar <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> intervalFun <span class="token operator">=</span> <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"定时器执行结果: "</span><span class="token punctuation">,</span> interVar<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 取消定时器</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>interVar <span class="token operator">===</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">clearInterval</span><span class="token punctuation">(</span>intervalFun<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// setTimeout接收一个函数和一个时间间隔(毫秒)，等待一个时间间隔后就会调用这个函数，只会调用一次</span>
    <span class="token keyword">var</span> timeoutFun <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"我是延迟器，我执行了"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">3000</span><span class="token punctuation">)</span>
    <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timeoutFun<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 取消延迟器，此时上面的代码还未执行，所以什么也不会输出</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"End"</span><span class="token punctuation">)</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211018195345536.png" alt="image-20211018195345536"></p>
<h3 id="防抖" tabindex="-1"><a class="header-anchor" href="#防抖" aria-hidden="true">#</a> 防抖</h3>
<p>当持续触发事件时，事件不会执行，只有在用户停止触发事件一段时间之后再执行这个事件一次</p>
<p><strong>举个例子</strong></p>
<p>在没有做防抖的情况下，当我们快速输入<code v-pre>abcdef</code>的时，前端监听的<code v-pre>input</code>事件会执行多次</p>
<p><code v-pre>demo.html</code></p>
<div class="language-html ext-html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">doctype</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span>
          <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>X-UA-Compatible<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ie=edge<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
        <span class="token selector">*</span> <span class="token punctuation">{</span>
            <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
            <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
            <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
            <span class="token property">top</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
            <span class="token property">left</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
            <span class="token property">margin-top</span><span class="token punctuation">:</span> -100px<span class="token punctuation">;</span>
            <span class="token property">margin-left</span><span class="token punctuation">:</span> -100px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box input</span> <span class="token punctuation">{</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
            <span class="token property">padding</span><span class="token punctuation">:</span> 0 20px<span class="token punctuation">;</span>
            <span class="token property">outline</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
            <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #999999<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box input:focus</span> <span class="token punctuation">{</span>
            <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #79bbff<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">#display p</span> <span class="token punctuation">{</span>
            <span class="token property">line-height</span><span class="token punctuation">:</span> 2<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>search<span class="token punctuation">"</span></span> <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>请输入关键字搜索<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>display<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'input'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> value <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"search"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>
        <span class="token keyword">const</span> p <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'p'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        p<span class="token punctuation">.</span>innerText <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">你输入的内容: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
        document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"display"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre></div><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/未防抖动画.gif" alt=""></p>
<p>防抖的原理：</p>
<p>用户每次输入都会延迟执行<code v-pre>input</code>事件（设置延迟器），</p>
<p>当第二次输入&quot;b&quot;时，会把上一次的延迟器清除，然后再执行同样的延迟器，</p>
<p>当我们快速输入的间隔（如果小于延迟器），那么会将多次输入合并为一次<code v-pre>input</code>事件，就达到了防抖的效果，</p>
<p>防抖的本质就是将多次事件合并，当用户停止触发事件，将事件执行一次；</p>
<p><strong>修改代码如下</strong></p>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
<span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token parameter">waitTime</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> timer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span><span class="token punctuation">;</span>
        timer <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> value <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"search"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>
            <span class="token keyword">const</span> p <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'p'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            p<span class="token punctuation">.</span>innerText <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">你输入的内容: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
            document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"display"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> waitTime<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'input'</span><span class="token punctuation">,</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token number">240</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/防抖动画.gif" alt=""></p>
<blockquote>
<p>延迟器的毫秒数根据实际情况调整</p>
</blockquote>
<h3 id="节流" tabindex="-1"><a class="header-anchor" href="#节流" aria-hidden="true">#</a> 节流</h3>
<p>当持续触发事件时，保证一定时间段内只调用一次事件处理函数</p>
<p><strong>未节流时</strong></p>
<p><code v-pre>demo.html</code></p>
<div class="language-html ext-html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">doctype</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span>
          <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>X-UA-Compatible<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ie=edge<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> <span class="token function-variable function">test</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> n <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token operator">++</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'mousemove'</span><span class="token punctuation">,</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre></div><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/未节流动画.gif" alt=""></p>
<p>节流的原理：</p>
<p>在节流函数外设置一个变量flag，默认为true，代表当前允许节流函数执行（事件执行），</p>
<p>节流函数一旦执行，就会设置<code v-pre>flag</code>为<code v-pre>false</code>，此时如果高频操作，其他节流函数碰到<code v-pre>flag</code>为<code v-pre>false</code>就直接返回</p>
<p>这就跟互斥锁很类似，拿不到锁的直接就结束了</p>
<p><strong>节流时</strong></p>
<p>修改代码</p>
<div class="language-html ext-html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> <span class="token function-variable function">test</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">waitTime</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> n <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> flag <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>flag<span class="token punctuation">)</span> <span class="token keyword">return</span>
        flag <span class="token operator">=</span> <span class="token boolean">false</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token operator">++</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
            flag <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> waitTime<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'mousemove'</span><span class="token punctuation">,</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre></div><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/节流动画.gif" alt=""></p>
<h2 id="bom" tabindex="-1"><a class="header-anchor" href="#bom" aria-hidden="true">#</a> BOM</h2>
<p>A区（浏览器的标签页，地址栏，搜索栏，书签栏，窗口放大还原关闭按钮，菜单栏等等）</p>
<p>B区（浏览器的右键菜单）：oncontextmenu事件</p>
<p>C区（document加载时的状态栏，显示http状态码等）</p>
<p>D区（滚动条scroll bar）</p>
<p>Bom（Browser Object Model，浏览器对象模型）是JavaScript与浏览器窗口交互的接口</p>
<p>一些与浏览器修改尺寸、滚动条滚动相关的特效，都要借助BOM技术</p>
<h3 id="浏览器窗口-window对象" tabindex="-1"><a class="header-anchor" href="#浏览器窗口-window对象" aria-hidden="true">#</a> 浏览器窗口：Window对象</h3>
<h4 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h4>
<p>window对象是当前JS脚本运行所处的窗口，而这个窗口包含DOM结构，<code v-pre>window.document</code>就是<code v-pre>document</code>对象</p>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// body标签等同于document.body</span>
    <span class="token keyword">const</span> bodyBox <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token string">"body"</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>bodyBox<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span>body<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>bodyBox <span class="token operator">===</span> document<span class="token punctuation">.</span>body<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><blockquote>
<p>所以可以得出结论：DOM是BOM的一部分</p>
</blockquote>
<p>在有标签页功能的浏览器中，每个标签都有自己的<code v-pre>window</code>对象，互不影响</p>
<p>全局变量会成为window对象的属性</p>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>a <span class="token operator">===</span> a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>

    <span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>b <span class="token operator">===</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// undefined</span>

    <span class="token keyword">const</span> c <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>c <span class="token operator">===</span> c<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// undefined</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><p>内置方法普遍是window的方法</p>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>alert <span class="token operator">===</span> alert<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// true</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>prompt <span class="token operator">===</span> prompt<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// true</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>confirm <span class="token operator">===</span> confirm<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// true</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>setTimeout <span class="token operator">===</span> setTimeout<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h4 id="窗口属性" tabindex="-1"><a class="header-anchor" href="#窗口属性" aria-hidden="true">#</a> 窗口属性</h4>
<table>
<thead>
<tr>
<th>属性</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>window.innerWidth</td>
<td>浏览器内容区域宽度，包含垂直滚动条</td>
</tr>
<tr>
<td>window.innerHeight</td>
<td>浏览器内容区域高度，包含水平滚动条</td>
</tr>
<tr>
<td>window.outerWidth</td>
<td>浏览器外部宽度</td>
</tr>
<tr>
<td>window.outerHeight</td>
<td>浏览器外部高度</td>
</tr>
<tr>
<td>document.documentElement.clientWidth</td>
<td>浏览器内容区域宽度，不包含垂直滚动条</td>
</tr>
<tr>
<td>document.documentElement.clientHeight</td>
<td>浏览器内容区域高度，不包含水平滚动条</td>
</tr>
</tbody>
</table>
<p>测试代码</p>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span><span class="token operator">!</span><span class="token constant">DOCTYPE</span> html<span class="token operator">></span>
<span class="token operator">&lt;</span>html lang<span class="token operator">=</span><span class="token string">"en"</span><span class="token operator">></span>

<span class="token operator">&lt;</span>head<span class="token operator">></span>
    <span class="token operator">&lt;</span>meta charset<span class="token operator">=</span><span class="token string">"UTF-8"</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>meta name<span class="token operator">=</span><span class="token string">"viewport"</span> content<span class="token operator">=</span><span class="token string">"width=device-width, initial-scale=1.0"</span><span class="token operator">></span>
    <span class="token operator">&lt;</span>title<span class="token operator">></span><span class="token constant">BOM</span>窗口测试<span class="token operator">&lt;</span><span class="token operator">/</span>title<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>head<span class="token operator">></span>

<span class="token operator">&lt;</span>body<span class="token operator">></span>
<span class="token operator">&lt;</span>div style<span class="token operator">=</span><span class="token string">"width: 3000px; height: 2000px;"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
<span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token keyword">let</span> message <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
    innerWidth: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>window<span class="token punctuation">.</span>innerWidth<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
    innerHeight: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>window<span class="token punctuation">.</span>innerHeight<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
    outerWidth: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>window<span class="token punctuation">.</span>outerWidth<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
    outerHeight: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>window<span class="token punctuation">.</span>outerHeight<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
    document.documentElement.clientWidth: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>clientWidth<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
    document.documentElement.clientHeight: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>clientHeight<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
    水平滚动条宽度：</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>window<span class="token punctuation">.</span>innerHeight <span class="token operator">-</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>clientHeight<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
    垂直滚动条宽度：</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>window<span class="token punctuation">.</span>innerWidth <span class="token operator">-</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>clientWidth<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>

    <span class="token function">alert</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>body<span class="token operator">></span>

<span class="token operator">&lt;</span><span class="token operator">/</span>html<span class="token operator">></span>
</code></pre></div><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211019093025941.png" alt="image-20211019093025941"></p>
<h4 id="窗口事件" tabindex="-1"><a class="header-anchor" href="#窗口事件" aria-hidden="true">#</a> 窗口事件</h4>
<p>在窗口大小改变后就会触发<code v-pre>resize</code>事件</p>
<div class="language-html ext-html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>BOM窗口测试<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">width</span><span class="token punctuation">:</span> 3000px<span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> 2000px<span class="token punctuation">;</span></span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">function</span> <span class="token function">getWindow</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> message <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
            innerWidth: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>window<span class="token punctuation">.</span>innerWidth<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
            innerHeight: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>window<span class="token punctuation">.</span>innerHeight<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
            outerWidth: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>window<span class="token punctuation">.</span>outerWidth<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
            outerHeight: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>window<span class="token punctuation">.</span>outerHeight<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
            document.documentElement.clientWidth: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>clientWidth<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
            document.documentElement.clientHeight: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>clientHeight<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
            水平滚动条宽度：</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>window<span class="token punctuation">.</span>innerHeight <span class="token operator">-</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>clientHeight<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
            垂直滚动条宽度：</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>window<span class="token punctuation">.</span>innerWidth <span class="token operator">-</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>clientWidth<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
        <span class="token function">alert</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    window<span class="token punctuation">.</span><span class="token function-variable function">onresize</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">getWindow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre></div><h4 id="窗口滚动条属性和事件" tabindex="-1"><a class="header-anchor" href="#窗口滚动条属性和事件" aria-hidden="true">#</a> 窗口滚动条属性和事件</h4>
<table>
<thead>
<tr>
<th>属性</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>window.scrollX</code></td>
<td>水平滚动条已滚动像素，只读属性</td>
</tr>
<tr>
<td><code v-pre>window.scrollY</code></td>
<td>垂直滚动条已滚动像素，只读属性</td>
</tr>
<tr>
<td><code v-pre>document.documentElement.scrollLeft</code></td>
<td>水平滚动条已滚动像素，非只读属性</td>
</tr>
<tr>
<td><code v-pre>document.documentElement.scrollTop</code></td>
<td>垂直滚动条已滚动像素，非只读属性</td>
</tr>
</tbody>
</table>
<p>示例代码</p>
<div class="language-html ext-html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">doctype</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span>
          <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>X-UA-Compatible<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ie=edge<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">width</span><span class="token punctuation">:</span> 5000px<span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> 5000px<span class="token punctuation">;</span></span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> message <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">水平滚动条已滚动像素：</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>window<span class="token punctuation">.</span>scrollX<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">; 垂直滚动条已滚动像素：</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>window<span class="token punctuation">.</span>scrollY<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre></div><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211019150052132.png" alt="image-20211019150052132" style="zoom:50%;" />
<h4 id="案例-回到顶部功能" tabindex="-1"><a class="header-anchor" href="#案例-回到顶部功能" aria-hidden="true">#</a> 案例：回到顶部功能</h4>
<p><code v-pre>index.html</code></p>
<div class="language-html ext-html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>BOM窗口测试<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">height</span><span class="token punctuation">:</span> 2000px<span class="token punctuation">;</span> <span class="token property">background-color</span><span class="token punctuation">:</span> #8cc5ff<span class="token punctuation">;</span></span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>
    参考文档：https://www.cnblogs.com/alvin553819/p/7365000.html
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>top4<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>随便写点内容<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#这里是锚点<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>toTop1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>回到顶部-方法1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>toTop2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>回到顶部-方法2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>toTop3<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>回到顶部-方法3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>toTop4<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>回到顶部-方法4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token comment">/* 回到顶部方式1 */</span>
    <span class="token keyword">const</span> topBtn1 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"toTop1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    topBtn1<span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>scrollTop <span class="token operator">=</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>scrollTop <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/* 回到顶部方式2 */</span>
    <span class="token keyword">const</span> topBtn2 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"toTop2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    topBtn2<span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">scrollTo</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/* 回到顶部方式3 */</span>
    <span class="token keyword">const</span> topBtn3 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"toTop3"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    topBtn3<span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> top <span class="token operator">=</span> document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>scrollTop <span class="token operator">||</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>scrollTop
        <span class="token function">scrollBy</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span>top<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/* 回到顶部方式4 */</span>
    <span class="token keyword">const</span> topBtn4 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"toTop4"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    topBtn4<span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> top4 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"top4"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        top4<span class="token punctuation">.</span><span class="token function">scrollIntoView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre></div><h3 id="浏览器会话历史-history" tabindex="-1"><a class="header-anchor" href="#浏览器会话历史-history" aria-hidden="true">#</a> 浏览器会话历史：History</h3>
<p><code v-pre>history</code>对象提供了操作浏览器会话历史的接口，等同于<code v-pre>window.history</code></p>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>history <span class="token operator">===</span> history<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h4 id="history对象基础属性" tabindex="-1"><a class="header-anchor" href="#history对象基础属性" aria-hidden="true">#</a> history对象基础属性</h4>
<table>
<thead>
<tr>
<th>属性</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>history.back()</code></td>
<td>向后跳转，这和用户点击浏览器回退按钮的效果相同</td>
</tr>
<tr>
<td><code v-pre>history.forward()</code></td>
<td>向前跳转，这和用户点击浏览器前进按钮的效果相同</td>
</tr>
<tr>
<td><code v-pre>history.go(-1)</code></td>
<td>跳转到特定页面，<code v-pre>-1</code>代表向后跳转一个点，<br /><code v-pre>history.go(-1);</code>效果等同于<code v-pre>history.back()</code>；<br /><code v-pre>history.go(1);</code>效果等同于<code v-pre>history.forward()</code></td>
</tr>
<tr>
<td><code v-pre>history.length</code></td>
<td>历史页面数量（只包含由该页面跳转过的页面）</td>
</tr>
</tbody>
</table>
<p>测试</p>
<p><code v-pre>demo1.html</code></p>
<div class="language-html ext-html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">doctype</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span>
          <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>X-UA-Compatible<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ie=edge<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>demo2.html<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>去demo2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token special-attr"><span class="token attr-name">onclick</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value javascript language-javascript">history<span class="token punctuation">.</span><span class="token function">go</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>后退<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token special-attr"><span class="token attr-name">onclick</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value javascript language-javascript">history<span class="token punctuation">.</span><span class="token function">go</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>前进<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>history<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 初始为1</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre></div><p><code v-pre>demo2.html</code></p>
<div class="language-html ext-html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">doctype</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span>
          <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>X-UA-Compatible<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ie=edge<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>demo1.html<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>去demo1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token special-attr"><span class="token attr-name">onclick</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value javascript language-javascript">history<span class="token punctuation">.</span><span class="token function">go</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>后退<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token special-attr"><span class="token attr-name">onclick</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value javascript language-javascript">history<span class="token punctuation">.</span><span class="token function">go</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>前进<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>history<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre></div><p>测试结果分析</p>
<ul>
<li>访问<code v-pre>demo1.html</code>,<code v-pre>history.length</code>初始为1，因为访问了当前页面</li>
<li>在再页面上点击超链接跳转到<code v-pre>demo2.html</code>，<code v-pre>history.length</code>会+1，</li>
<li>再从<code v-pre>demo2.html</code>击超链接跳转到<code v-pre>demo1.html</code>，<code v-pre>history.length</code>也会+1，</li>
<li>点击回退按钮（页面上的或浏览器自带的），<code v-pre>history.length</code>不会加也不会减</li>
<li>查看浏览器历史记录（快捷键<code v-pre>Ctrl+H</code>），发现只有两条记录<code v-pre>demo1.html</code>和<code v-pre>demo2.html</code></li>
</ul>
<h4 id="history对象高级属性" tabindex="-1"><a class="header-anchor" href="#history对象高级属性" aria-hidden="true">#</a> history对象高级属性</h4>
<table>
<thead>
<tr>
<th>方法/属性</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>history.pushState(状态对象, 标题, URL)</code></td>
<td>添加并激活一条历史记录条目<br /><br />1、修改浏览器地址栏为指定的域名，但不会加载URL中的内容<br />2、在浏览器中历史记录中可以看到多出一条访问记录，正是我们新加的URL<br />注意：只能添加自己域名的历史记录</td>
</tr>
<tr>
<td><code v-pre>history.replaceState()</code></td>
<td>修改历史记录条目</td>
</tr>
<tr>
<td>history.state</td>
<td></td>
</tr>
</tbody>
</table>
<blockquote>
<p>window.onpopstate</p>
</blockquote>
<ul>
<li></li>
</ul>
<h2 id="事件循环" tabindex="-1"><a class="header-anchor" href="#事件循环" aria-hidden="true">#</a> 事件循环</h2>
<p><strong>JavaScript是一门单线程的语言</strong></p>
<p>JavaScript最初的用途就是与浏览器交互，运行在浏览器环境中，</p>
<p>为了保证了程序执行的一致性，所以采用的是单线程</p>
<p>到了今天，单线程在保证了执行顺序的同时也限制了JavaScript的效率，因此开发出了web worker技术。</p>
<p>这项技术号称让JavaScript成为一门多线程语言。</p>
<p>然而，使用web worker技术开的多线程有着诸多限制，例如 所有新线程都受主线程的完全控制，不能独立执行。</p>
<p>可以预见，未来的JavaScript也会一直是一门单线程的语言。</p>
<p><strong>JavaScript是一门非阻塞的语言</strong></p>
<p>JavaScript的另一个特点是“非阻塞”，这就涉及到了<code v-pre>event loop</code>（事件循环）</p>
<p><strong>执行栈和任务队列</strong></p>
<ul>
<li>
<p>执行栈存储同步任务</p>
</li>
<li>
<p>任务队列中存储异步任务</p>
<p>不同的异步任务被分为两类：</p>
<ul>
<li>微任务（micro task），以下事件属于微任务
<ul>
<li><code v-pre>new Promise()</code></li>
<li><code v-pre>process.nextTick</code></li>
<li><code v-pre>Object.observe</code></li>
<li><code v-pre>new MutaionObserver()</code></li>
</ul>
</li>
<li>宏任务（macro task），以下事件属于宏任务：
<ul>
<li><code v-pre>setInterval()</code></li>
<li><code v-pre>setTimeout()</code></li>
<li><code v-pre>I/O</code></li>
<li><code v-pre>UI渲染</code></li>
<li><code v-pre>script</code>标签中的整体代码</li>
</ul>
</li>
</ul>
</li>
<li>
<p>执行顺序问题</p>
<p>先执行同步任务，将同步任务执行完，</p>
<p>再执行异步任务，异步任务中先执行微任务，再执行宏任务</p>
</li>
</ul>
<p>​</p>
<ul>
<li>js事件循环总是从一个macrotask开始执行</li>
<li>一个事件循环过程中，只执行一个macrotask，但是可能执行多个microtask</li>
<li>执行栈中的任务产生的microtask会在当前事件循环内执行</li>
<li>执行栈中的任务产生的macrotask要在下一次事件循环才会执行</li>
</ul>
<p>测试1：同步任务和异步任务的执行顺序</p>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// 异步任务</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"异步任务执行"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>

    <span class="token comment">// 同步任务</span>
    <span class="token keyword">const</span> end <span class="token operator">=</span> <span class="token number">99999</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> end<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">===</span> <span class="token number">10</span> <span class="token operator">||</span> i <span class="token operator">===</span> end<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 同步任务</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"End"</span><span class="token punctuation">)</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><p>测试2：异步任务中微任务和宏任务的执行顺序</p>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token comment">// 宏任务</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 微任务</span>
    <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// 输出结果: ?</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><p>测试3：异步任务中微任务和宏任务的执行顺序</p>
<div class="language-javascript ext-js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span>
    <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    	<span class="token comment">// 宏任务</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    	<span class="token comment">// 微任务</span>
        <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">executor</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                i <span class="token operator">==</span> <span class="token number">9999</span> <span class="token operator">&amp;&amp;</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 输出结果: ?</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre></div><h2 id="websocket" tabindex="-1"><a class="header-anchor" href="#websocket" aria-hidden="true">#</a> WebSocket</h2>
<h3 id="基础语法" tabindex="-1"><a class="header-anchor" href="#基础语法" aria-hidden="true">#</a> 基础语法</h3>
<p><strong>前端代码编写</strong></p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<p><code v-pre>demo.html</code></p>
<div class="language-html ext-html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Title<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token comment">// 创建WebSocket实例，这会去连接WebSocket服务端</span>
    <span class="token keyword">var</span> ws <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WebSocket</span><span class="token punctuation">(</span><span class="token string">"ws://localhost:8080/ws"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 查看WebSocket连接状态</span>
    <span class="token comment">//  0       WebSocket.CONNECTING  正在连接</span>
    <span class="token comment">//  1       WebSocket.OPEN        连接成功，可以通信了</span>
    <span class="token comment">//  2       WebSocket.CLOSING     连接正在关闭</span>
    <span class="token comment">//  3       WebSocket.CLOSED      连接已经关闭，或者打开连接失败</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>ws<span class="token punctuation">.</span>readyState<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> WebSocket<span class="token punctuation">.</span><span class="token constant">CONNECTING</span><span class="token operator">:</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"状态: 正在连接"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> WebSocket<span class="token punctuation">.</span><span class="token constant">OPEN</span><span class="token operator">:</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"状态: 连接成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> WebSocket<span class="token punctuation">.</span><span class="token constant">CLOSING</span><span class="token operator">:</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"状态: 连接关闭中"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> WebSocket<span class="token punctuation">.</span><span class="token constant">CLOSED</span><span class="token operator">:</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"状态: 连接已关闭"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 连接成功后的回调函数</span>
    ws<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'open'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'回调: 连接成功'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// 连接关闭后的回调函数</span>
    ws<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'close'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'回调: 连接已关闭或连接失败'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// 发送消息(需要在建立连接成功以后, 否则也发不出去~~)</span>
    ws<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'open'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> s <span class="token operator">=</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">v<span class="token punctuation">,</span> k</span><span class="token punctuation">)</span> <span class="token operator">=></span> k <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">'+'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        ws<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// 收到服务器数据后的回调函数</span>
    <span class="token comment">// 服务器数据可能是文本，也可能是二进制数据（blob对象或Arraybuffer对象</span>
    ws<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'message'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'收到了服务器发来的消息: '</span><span class="token punctuation">,</span> event<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre></div></details>
<p><strong>服务端代码编写</strong></p>
<p>服务端使用Python3的<code v-pre>fastapi</code>框架，文档地址：<a href="https://fastapi.tiangolo.com/zh/advanced/websockets/" target="_blank" rel="noopener noreferrer">https://fastapi.tiangolo.com/zh/advanced/websockets/<ExternalLinkIcon/></a></p>
<ul>
<li>
<p>安装依赖</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>pip <span class="token function">install</span> fastapi uvicorn<span class="token punctuation">[</span>standard<span class="token punctuation">]</span>
</code></pre></div></li>
<li>
<p>编写示例代码</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<p><code v-pre>demo.py</code></p>
<div class="language-python ext-py"><pre v-pre class="language-python"><code><span class="token comment">#!/usr/bin/env python</span>

<span class="token keyword">from</span> fastapi <span class="token keyword">import</span> FastAPI<span class="token punctuation">,</span> WebSocket
<span class="token keyword">import</span> uvicorn
<span class="token keyword">from</span> datetime <span class="token keyword">import</span> datetime

app <span class="token operator">=</span> FastAPI<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>websocket</span><span class="token punctuation">(</span><span class="token string">"/ws"</span><span class="token punctuation">)</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">websocket_endpoint</span><span class="token punctuation">(</span>websocket<span class="token punctuation">:</span> WebSocket<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 等待客户端连接</span>
    <span class="token keyword">await</span> websocket<span class="token punctuation">.</span>accept<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"接到客户端链接"</span><span class="token punctuation">)</span>

    <span class="token comment"># 接收客户端发来的消息(这里只演示接收文本消息，约定用户发过来数学计算)</span>
    data <span class="token operator">=</span> <span class="token keyword">await</span> websocket<span class="token punctuation">.</span>receive_text<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment"># 数值计算, eval有安全隐患，这里仅演示使用</span>
    ret <span class="token operator">=</span> <span class="token builtin">eval</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>

    <span class="token comment"># 返回数据</span>
    <span class="token keyword">await</span> websocket<span class="token punctuation">.</span>send_text<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"</span><span class="token interpolation"><span class="token punctuation">{</span>data<span class="token punctuation">}</span></span><span class="token string"> = </span><span class="token interpolation"><span class="token punctuation">{</span>ret<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"返回数据给客户端"</span><span class="token punctuation">)</span>

    <span class="token comment"># 函数执行完毕，关闭连接</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"关闭客户端链接"</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">'__main__'</span><span class="token punctuation">:</span>
    uvicorn<span class="token punctuation">.</span>run<span class="token punctuation">(</span><span class="token string">"demo:app"</span><span class="token punctuation">,</span> host<span class="token operator">=</span><span class="token string">"127.0.0.1"</span><span class="token punctuation">,</span> port<span class="token operator">=</span><span class="token number">8080</span><span class="token punctuation">)</span>
</code></pre></div></details>
</li>
<li>
<p>运行结果</p>
<p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211208212721268.png" alt="image-20211208212721268"></p>
</li>
</ul>
<h3 id="服务端推送示例" tabindex="-1"><a class="header-anchor" href="#服务端推送示例" aria-hidden="true">#</a> 服务端推送示例</h3>
<p>服务端每秒推送一个随机数到客户端</p>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<p><code v-pre>demo.py</code></p>
<div class="language-python ext-py"><pre v-pre class="language-python"><code><span class="token comment">#!/usr/bin/env python</span>

<span class="token keyword">import</span> random
<span class="token keyword">import</span> time

<span class="token keyword">from</span> fastapi <span class="token keyword">import</span> FastAPI<span class="token punctuation">,</span> WebSocket
<span class="token keyword">import</span> uvicorn

app <span class="token operator">=</span> FastAPI<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>websocket</span><span class="token punctuation">(</span><span class="token string">"/ws"</span><span class="token punctuation">)</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">websocket_endpoint</span><span class="token punctuation">(</span>websocket<span class="token punctuation">:</span> WebSocket<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">await</span> websocket<span class="token punctuation">.</span>accept<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        n <span class="token operator">=</span> random<span class="token punctuation">.</span>randint<span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">999</span><span class="token punctuation">)</span>
        <span class="token keyword">await</span> websocket<span class="token punctuation">.</span>send_text<span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">)</span>
        time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">'__main__'</span><span class="token punctuation">:</span>
    uvicorn<span class="token punctuation">.</span>run<span class="token punctuation">(</span><span class="token string">"demo:app"</span><span class="token punctuation">,</span> host<span class="token operator">=</span><span class="token string">"127.0.0.1"</span><span class="token punctuation">,</span> port<span class="token operator">=</span><span class="token number">8080</span><span class="token punctuation">)</span>
</code></pre></div></details>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<p><code v-pre>demo.html</code></p>
<div class="language-html ext-html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Title<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
        <span class="token selector">*</span> <span class="token punctuation">{</span>
            <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
            <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
            <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
            <span class="token property">top</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
            <span class="token property">left</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
            <span class="token property">margin-top</span><span class="token punctuation">:</span> -100px<span class="token punctuation">;</span>
            <span class="token property">margin-left</span><span class="token punctuation">:</span> -100px<span class="token punctuation">;</span>

            <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
            <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
            <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box #msg</span> <span class="token punctuation">{</span>
            <span class="token property">color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
            <span class="token property">font-size</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
            <span class="token property">font-weight</span><span class="token punctuation">:</span> bold<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>msg<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token comment">// DOM对象</span>
    <span class="token keyword">const</span> msg <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'msg'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 创建WebSocket实例，这会去连接WebSocket服务端</span>
    <span class="token keyword">var</span> ws <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WebSocket</span><span class="token punctuation">(</span><span class="token string">"ws://localhost:8080/ws"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// ws收到消息事件</span>
    ws<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'message'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        msg<span class="token punctuation">.</span>innerText <span class="token operator">=</span> e<span class="token punctuation">.</span>data<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre></div></details>
<p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/f4cLWjbf.gif" alt=""></p>
<h3 id="表单简单交互示例" tabindex="-1"><a class="header-anchor" href="#表单简单交互示例" aria-hidden="true">#</a> 表单简单交互示例</h3>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<p><code v-pre>demo.html</code></p>
<div class="language-html ext-html"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Title<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
        <span class="token selector">.box</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span>
            <span class="token property">margin</span><span class="token punctuation">:</span> 0 auto<span class="token punctuation">;</span>
            <span class="token property">margin-top</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.box input</span> <span class="token punctuation">{</span>
            <span class="token property">outline</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>form<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>input<span class="token punctuation">"</span></span> <span class="token attr-name">autocomplete</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>off<span class="token punctuation">"</span></span> <span class="token attr-name">autofocus</span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>submit<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>submit<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>提交<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>list<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token comment">// HTML对象</span>
    <span class="token keyword">const</span> form <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"form"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 表单</span>
    <span class="token keyword">const</span> list <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'list'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 列表</span>

    <span class="token keyword">function</span> <span class="token function">createWebSocket</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">WebSocket</span><span class="token punctuation">(</span><span class="token string">"ws://localhost:8080/ws"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 创建WebSocket实例，这会去连接WebSocket服务端</span>
    <span class="token keyword">var</span> ws <span class="token operator">=</span> <span class="token function">createWebSocket</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 提交事件</span>
    form<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'submit'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        ws<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>form<span class="token punctuation">.</span>input<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// ws收到消息事件</span>
    ws<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'message'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> li <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'li'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        li<span class="token punctuation">.</span>innerText <span class="token operator">=</span> e<span class="token punctuation">.</span>data<span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>li<span class="token punctuation">)</span><span class="token punctuation">;</span>
        form<span class="token punctuation">.</span>input<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>
        form<span class="token punctuation">.</span>input<span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre></div></details>
<details class="custom-container details"><summary>点击查看完整代码</summary>
<p><code v-pre>demo.py</code></p>
<div class="language-python ext-py"><pre v-pre class="language-python"><code><span class="token comment">#!/usr/bin/env python</span>

<span class="token keyword">from</span> fastapi <span class="token keyword">import</span> FastAPI<span class="token punctuation">,</span> WebSocket
<span class="token keyword">import</span> uvicorn

app <span class="token operator">=</span> FastAPI<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>websocket</span><span class="token punctuation">(</span><span class="token string">"/ws"</span><span class="token punctuation">)</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">websocket_endpoint</span><span class="token punctuation">(</span>websocket<span class="token punctuation">:</span> WebSocket<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">await</span> websocket<span class="token punctuation">.</span>accept<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        data <span class="token operator">=</span> <span class="token keyword">await</span> websocket<span class="token punctuation">.</span>receive_text<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            ret <span class="token operator">=</span> <span class="token builtin">eval</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
        <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
            ret <span class="token operator">=</span> e
        <span class="token keyword">await</span> websocket<span class="token punctuation">.</span>send_text<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"</span><span class="token interpolation"><span class="token punctuation">{</span>data<span class="token punctuation">}</span></span><span class="token string"> = </span><span class="token interpolation"><span class="token punctuation">{</span>ret<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">'__main__'</span><span class="token punctuation">:</span>
    uvicorn<span class="token punctuation">.</span>run<span class="token punctuation">(</span><span class="token string">"demo:app"</span><span class="token punctuation">,</span> host<span class="token operator">=</span><span class="token string">"127.0.0.1"</span><span class="token punctuation">,</span> port<span class="token operator">=</span><span class="token number">8080</span><span class="token punctuation">)</span>

</code></pre></div></details>
<p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/f3cLWjbf.gif" alt=""></p>
</div></template>
