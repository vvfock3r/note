<template><div><h2 id="双指针法原理" tabindex="-1"><a class="header-anchor" href="#双指针法原理" aria-hidden="true">#</a> 双指针法原理</h2>
<h3 id="理解单指针" tabindex="-1"><a class="header-anchor" href="#理解单指针" aria-hidden="true">#</a> 理解单指针</h3>
<p>理解双指针之前，先说一下单指针。单指针就是说只有一个指针，这个指针是什么呢？</p>
<p>比如说我们遍历一个数组，那么每次遍历得到的索引或值对于这个数组来说，就是一个指针，指向已遍历的位置</p>
<div class="language-python ext-py"><pre v-pre class="language-python"><code><span class="token comment">#!/usr/bin/env python</span>
<span class="token comment"># --*--coding:utf-8--*--</span>

l <span class="token operator">=</span> <span class="token punctuation">[</span>x <span class="token keyword">for</span> x <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
<span class="token keyword">for</span> i <span class="token keyword">in</span> l<span class="token punctuation">:</span>
    <span class="token comment"># 这里的变量i，我们就可以理解为一个指针，指向遍历到列表l的位置</span>
    <span class="token comment"># 为了后面讲解，这里我们就称它为索引指针吧</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
</code></pre></div><h3 id="理解双指针" tabindex="-1"><a class="header-anchor" href="#理解双指针" aria-hidden="true">#</a> 理解双指针</h3>
<p>现在再理解双指针就容易一些了，还是以上面代码为例，双指针就是有两个指针，另一个指针指向哪里呢？</p>
<p>另一个指针也是指向列表的某个位置，具体如何操作则由我们手动通过代码来实现</p>
<p>一个数组，两个指针，看起来好像也不是很复杂嘛？</p>
<p>不是这样的，每个指针其实分为指针的索引和指针的值两种形式，这样说起来，是<span style="color: red;">1个数组和4个对象</span>，这一点非常重要！</p>
<!-- more -->
<h3 id="双指针运用方式" tabindex="-1"><a class="header-anchor" href="#双指针运用方式" aria-hidden="true">#</a> 双指针运用方式</h3>
<p>下面说一下双指针该如何运用自如</p>
<p>根据两个指针运动的方向，可以分为</p>
<ul>
<li>同向双指针，两个指针向同一个方向运动，可能是同向向右，也有可能是同向向左</li>
<li>反向双指针，两个指针分别由两端向另一端运动</li>
</ul>
<p>简图示意</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 同向双指针</span>
<span class="token punctuation">[</span> ---<span class="token operator">></span>---------<span class="token operator">></span>--------- <span class="token punctuation">]</span>  数组
   指针B      指针A
或者
<span class="token punctuation">[</span> ---<span class="token operator">&lt;</span>---------<span class="token operator">&lt;</span>--------- <span class="token punctuation">]</span>  数组
   指针A      指针B

<span class="token comment"># 反向双指针</span>
<span class="token punctuation">[</span> ---<span class="token operator">></span>--------------<span class="token operator">&lt;</span>---- <span class="token punctuation">]</span>  数组
    指针A          指针B
或者
<span class="token punctuation">[</span> --------<span class="token operator">&lt;</span>----<span class="token operator">></span>--------- <span class="token punctuation">]</span>  数组
        指针A  指针B
</code></pre></div><blockquote>
<p>本文<code v-pre>LeetCode</code>解题以<span style="color: red;">同向双指针</span>举例</p>
</blockquote>
<p>根据两个指针的遍历次数，可以分为</p>
<ul>
<li>一次遍历，一个指针遍历完成后，另一个指针不再遍历，然后程序结束</li>
<li>两次遍历，一个指针遍历完成后，另一个指针继续遍历，然后程序结束</li>
</ul>
<blockquote>
<p>一般来说一次遍历要比两次遍历性能高</p>
<p>本文<code v-pre>LeetCode</code>解题分别使用<span style="color: red;">一次遍历和两次遍历</span>举例</p>
</blockquote>
<p>根据两个指针运动的速度，可以分为</p>
<ul>
<li>快慢指针，一个运动快，一个运动慢</li>
<li>匀速指针，两个指针都以匀速运动</li>
</ul>
<blockquote>
<p>匀速指针的话，肯定不能是同向指针，否则这俩指针就重合为一个指针了，</p>
<p>或者说，<span style="color: red;">同向运动的指针 匀速运动和非匀速运动 要区分开</span>，这一点也很重要，否则就要掉坑了</p>
</blockquote>
<p>根据两个指针操作的对象，可以得到</p>
<p>​	一个指针可以只操作索引，也可以只操作数据，还可以同时操作索引和数据，</p>
<p>​	也就是说一个指针可能有3种操作方式，那么两个指针就是<span style="color: red;">9种操作方式</span>，这点很重要！！！</p>
<h2 id="leetcode-283-移动零" tabindex="-1"><a class="header-anchor" href="#leetcode-283-移动零" aria-hidden="true">#</a> LeetCode 283.移动零</h2>
<p>下面以<code v-pre>LeetCode</code>题目为例，讲解双指针的具体运用</p>
<h3 id="题目描述" tabindex="-1"><a class="header-anchor" href="#题目描述" aria-hidden="true">#</a> 题目描述</h3>
<p><strong>题目地址</strong></p>
<p>​	https://leetcode-cn.com/problems/move-zeroes/</p>
<p><strong>题目描述</strong></p>
<p>​	给定一个数组 <code v-pre>nums</code>，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。</p>
<p><strong>示例</strong></p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>输入: <span class="token punctuation">[</span><span class="token number">0,1</span>,0,3,12<span class="token punctuation">]</span>
输出: <span class="token punctuation">[</span><span class="token number">1,3</span>,12,0,0<span class="token punctuation">]</span>
</code></pre></div><p><strong>说明</strong></p>
<p>​	1、<span style="color: red;">必须在原数组上操作，不能拷贝额外的数组。</span>
​	2、尽量减少操作次数。</p>
<h3 id="暴力解题" tabindex="-1"><a class="header-anchor" href="#暴力解题" aria-hidden="true">#</a> 暴力解题</h3>
<p>先不管题目的附加要求，先把答案解出来，先降低要求，看能否解答，再提高要求解答</p>
<div class="language-python ext-py"><pre v-pre class="language-python"><code><span class="token comment">#!/usr/bin/env python</span>
<span class="token comment"># --*--coding:utf-8--*--</span>


<span class="token comment"># 暴力解法-1</span>
<span class="token keyword">def</span> <span class="token function">t1</span><span class="token punctuation">(</span>nums<span class="token punctuation">:</span> <span class="token builtin">list</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">list</span><span class="token punctuation">:</span>
    ret1<span class="token punctuation">,</span> ret2 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> nums<span class="token punctuation">:</span>
        ret1<span class="token punctuation">.</span>append<span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token keyword">if</span> i <span class="token operator">!=</span> <span class="token number">0</span> <span class="token keyword">else</span> ret2<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> ret1 <span class="token operator">+</span> ret2


<span class="token comment"># 暴力解法-2</span>
<span class="token keyword">def</span> <span class="token function">t2</span><span class="token punctuation">(</span>nums<span class="token punctuation">:</span> <span class="token builtin">list</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">list</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> <span class="token builtin">list</span><span class="token punctuation">(</span><span class="token builtin">filter</span><span class="token punctuation">(</span><span class="token keyword">lambda</span> x<span class="token punctuation">:</span> x <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">,</span> nums<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token builtin">list</span><span class="token punctuation">(</span><span class="token builtin">filter</span><span class="token punctuation">(</span><span class="token keyword">lambda</span> x<span class="token punctuation">:</span> x <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">,</span> nums<span class="token punctuation">)</span><span class="token punctuation">)</span>


<span class="token comment"># 暴力解法-3</span>
<span class="token keyword">def</span> <span class="token function">t3</span><span class="token punctuation">(</span>nums<span class="token punctuation">:</span> <span class="token builtin">list</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">list</span><span class="token punctuation">:</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> nums<span class="token punctuation">.</span>copy<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> i <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">:</span>
            nums<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
            nums<span class="token punctuation">.</span>remove<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> nums


<span class="token comment"># 暴力解法N...</span>
<span class="token comment"># ....</span>


<span class="token comment"># 验证1</span>
nums <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">]</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>t1<span class="token punctuation">(</span>nums<span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment"># [1, 3, 12, 0, 0]</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>t2<span class="token punctuation">(</span>nums<span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment"># [1, 3, 12, 0, 0]</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>t3<span class="token punctuation">(</span>nums<span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment"># [1, 3, 12, 0, 0]</span>

<span class="token comment"># 验证2</span>
l <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span>
<span class="token punctuation">]</span>
<span class="token keyword">for</span> i <span class="token keyword">in</span> l<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>t1<span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>t2<span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>t3<span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># []</span>
<span class="token comment"># []</span>
<span class="token comment"># []</span>
<span class="token comment"># [0]</span>
<span class="token comment"># [0]</span>
<span class="token comment"># [0]</span>
<span class="token comment"># [1, 1]</span>
<span class="token comment"># [1, 1]</span>
<span class="token comment"># [1, 1]</span>
<span class="token comment"># [1, 1, 1, 0, 0, 0]</span>
<span class="token comment"># [1, 1, 1, 0, 0, 0]</span>
<span class="token comment"># [1, 1, 1, 0, 0, 0]</span>
</code></pre></div><h3 id="满足题目要求解法1-两次遍历法" tabindex="-1"><a class="header-anchor" href="#满足题目要求解法1-两次遍历法" aria-hidden="true">#</a> 满足题目要求解法1 - 两次遍历法</h3>
<p>如果要满足题目，我们可以思考如何使用双指针如何来写</p>
<p><strong>确定两个指针的作用</strong></p>
<p>第一个指针肯定是索引指针，要完整的遍历完数组</p>
<p>第二个指针代表什么呢？其实我也不知道，那么我们就从其他方面反推一下</p>
<p><strong>确定两个指针运动方向</strong></p>
<p>索引指针肯定是从左向右遍历完整个数组，第二个指针呢？</p>
<p>看题目要求<span style="color: red;">同时保持非零元素的相对顺序</span>，这一点很重要！</p>
<p>如果第二个指针从右向左的话，这样一旦交换数据，元素顺序就会被打破，所以第二个指针只能从左向右</p>
<p><strong>再思考第二个指针的作用</strong></p>
<p>两个指针都是从左向右，那么第二个指针就代表 <span style="color: red;">符合题意的正确的数据</span>，题意要求的数据是</p>
<p>[非0元素1，非0元素2，....，0,0,0....]</p>
<p>一个指针不能既代表非0元素，又代表0元素，因为第二个指针和非0元素都在左边，所以第二个指针只能代表非0元素</p>
<p>完整的说法是：<span style="color: red;">第二个指针代表非0元素要插入的索引位置</span>，这里索引很重要！</p>
<p><strong>再看遍历次数</strong></p>
<p>索引指针运动完，第二个指针还要运动吗？</p>
<ul>
<li>
<p>停止运动，那么当索引指针运动完，第二个指针后面的元素肯定已经都置为0了</p>
</li>
<li>
<p>继续运动，那么可以将第二个指针后面的元素都置为0，而不管他指向的值是什么，为什么？</p>
<p>因为第二个指针操作的是索引，上面我们已经说过了</p>
</li>
</ul>
<div class="language-python ext-py"><pre v-pre class="language-python"><code><span class="token comment">#!/usr/bin/env python</span>
<span class="token comment"># --*--coding:utf-8--*--</span>

nums <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">]</span>


<span class="token keyword">def</span> <span class="token function">t1</span><span class="token punctuation">(</span>nums<span class="token punctuation">:</span> <span class="token builtin">list</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">list</span><span class="token punctuation">:</span>
    <span class="token comment">#  定义第二个指针，代表 非0元素要插入的索引位置</span>
    j <span class="token operator">=</span> <span class="token number">0</span>

    <span class="token comment"># 遍历数组</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> nums<span class="token punctuation">:</span>
        <span class="token comment"># 因为第二个指针要操作非0的数据，所以优先对非0数据进行判断</span>
        <span class="token keyword">if</span> i <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">:</span>
            nums<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> i  <span class="token comment"># 非0数据插入到第二个指针索引的位置</span>

            <span class="token comment"># 第二个指针有数据了，所以该向右移动一位了</span>
            j <span class="token operator">+=</span> <span class="token number">1</span>

            <span class="token comment"># 现在牵扯到 第二个指针要运动完 还是 第一个指针运动完 就让程序结束的问题了</span>

    <span class="token comment"># 假设先让第二个指针运动完吧，那第二个指针后面的元素值应该都置为0</span>
    <span class="token keyword">for</span> index <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>j<span class="token punctuation">,</span> <span class="token builtin">len</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        nums<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span>

    <span class="token keyword">return</span> nums


<span class="token keyword">print</span><span class="token punctuation">(</span>t1<span class="token punctuation">(</span>nums<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># [1, 3, 12, 0, 0]</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>t1<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># []</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>t1<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># [0]</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>t1<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># [1, 1]</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>t1<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># [1, 1, 1, 0, 0, 0]</span>
</code></pre></div><h3 id="双指针法流两次遍历动画演示" tabindex="-1"><a class="header-anchor" href="#双指针法流两次遍历动画演示" aria-hidden="true">#</a> 双指针法流两次遍历动画演示</h3>
<p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/9669b4ffb158eaeeee6f0cd66a70f24411575edab1ab8a037c4c9084b1c743f5-283_1.gif" alt="283_1.gif"></p>
<h3 id="满足题目要求解法2-一次遍历法" tabindex="-1"><a class="header-anchor" href="#满足题目要求解法2-一次遍历法" aria-hidden="true">#</a> 满足题目要求解法2 - 一次遍历法</h3>
<p>还是上面的代码，我们让第一个指针运动完程序就结束，第二个指针不再运动，看看能不能写出来</p>
<div class="language-python ext-py"><pre v-pre class="language-python"><code><span class="token comment">#!/usr/bin/env python</span>
<span class="token comment"># --*--coding:utf-8--*--</span>

nums <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">]</span>


<span class="token keyword">def</span> <span class="token function">t1</span><span class="token punctuation">(</span>nums<span class="token punctuation">:</span> <span class="token builtin">list</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">list</span><span class="token punctuation">:</span>
    <span class="token comment">#  定义第二个指针，代表 非0元素要插入的索引位置</span>
    j <span class="token operator">=</span> <span class="token number">0</span>

    <span class="token comment"># 遍历数组</span>
    <span class="token keyword">for</span> index<span class="token punctuation">,</span> i <span class="token keyword">in</span> <span class="token builtin">enumerate</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment"># 因为第二个指针要操作非0的数据，所以优先对非0数据进行判断</span>
        <span class="token keyword">if</span> i <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">:</span>
            nums<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> i  <span class="token comment"># 非0数据插入到第二个指针索引的位置</span>

            <span class="token comment"># 第二个指针有数据了，所以该向右移动一位了</span>
            j <span class="token operator">+=</span> <span class="token number">1</span>

            <span class="token comment"># 现在牵扯到 第二个指针要运动完 还是 第一个指针运动完 就让程序结束的问题了</span>
            <span class="token comment"># 这里让第一个指针运动完，程序就结束</span>

            <span class="token comment"># 那么就要让第一个指针遍历要的值置为0</span>
            <span class="token comment"># 所以就有如下代码</span>
            <span class="token comment"># nums[index] = 0</span>
            <span class="token comment"># 但是运行完脚本，发现问题，如果输入 [1, 1]，那么输出的是[0, 0]</span>

            <span class="token comment"># 这个也很容易理解，试想一下，如果输入数据都是非0元素，那么两个指针的运动将重合</span>
            <span class="token comment"># 也就是只有一个指针了，而且这个指针还把数据都置为0了，所以最后输出是 [0, 0]</span>
            <span class="token comment"># 怎么解决呢？</span>
            <span class="token comment"># 当他们运动不重合的时候，第一个指针指向的数据才置为0，所以代码如下</span>
            <span class="token keyword">if</span> index <span class="token operator">!=</span> j <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">:</span>
                nums<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span>
            <span class="token comment"># 这里j-1是因为j已经运动了一次，所以减去</span>
            <span class="token comment"># 不然就是让 索引指针第一次运动的初始值（本次循环完会自动+1） 和 第二个指针第二次运动的初始值 做比较了</span>

            <span class="token comment"># 总的来说，是挺绕的，需要仔细分析，加油，你就是最靓的仔!</span>

    <span class="token keyword">return</span> nums


<span class="token keyword">print</span><span class="token punctuation">(</span>t1<span class="token punctuation">(</span>nums<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># [1, 3, 12, 0, 0]</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>t1<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># []</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>t1<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># [0]</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>t1<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># [1, 1]</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>t1<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># [1, 1, 1, 0, 0, 0]</span>
</code></pre></div><blockquote>
<p>上面的代码还可以优化一下，单纯是顺序上的优化，</p>
<p>将 <code v-pre>j+=1</code>与下面的<code v-pre>if</code>换下位置，<code v-pre>if</code>语句中的j就不用-1了</p>
</blockquote>
<h3 id="双指针法一次遍历动画演示" tabindex="-1"><a class="header-anchor" href="#双指针法一次遍历动画演示" aria-hidden="true">#</a> 双指针法一次遍历动画演示</h3>
<p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/36d1ac5d689101cbf9947465e94753c626eab7fcb736ae2175f5d87ebc85fdf0-283_2.gif" alt="36d1ac5d689101cbf9947465e94753c626eab7fcb736ae2175f5d87ebc85fdf0-283_2"></p>
<h2 id="leetcode-27-移除元素" tabindex="-1"><a class="header-anchor" href="#leetcode-27-移除元素" aria-hidden="true">#</a> LeetCode 27.移除元素</h2>
<p><code v-pre>LeetCode</code>地址：https://leetcode-cn.com/problems/remove-element/</p>
<p><strong>题目描述</strong></p>
<p>给你一个数组 <code v-pre>nums </code>和一个值<code v-pre>val</code>，你需要 原地 移除所有数值等于<code v-pre>val</code> 的元素，并返回移除后数组的新长度。</p>
<p>不要使用额外的数组空间，你必须仅使用 <code v-pre>O(1)</code> 额外空间并 原地 修改输入数组。</p>
<p>元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。</p>
<p><strong>示例 1</strong></p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>输入：nums <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">3,2</span>,2,3<span class="token punctuation">]</span>, val <span class="token operator">=</span> <span class="token number">3</span>
输出：2, nums <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">2,2</span><span class="token punctuation">]</span>

解释：
函数应该返回新的长度 <span class="token number">2</span>, 并且 nums 中的前两个元素均为 <span class="token number">2</span>。
你不需要考虑数组中超出新长度后面的元素。例如，函数返回的新长度为 <span class="token number">2</span> ，而 nums <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">2,2</span>,3,3<span class="token punctuation">]</span> 或 nums <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">2,2</span>,0,0<span class="token punctuation">]</span>，也会被视作正确答案。
</code></pre></div><p><strong>示例 2</strong></p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>输入：nums <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0,1</span>,2,2,3,0,4,2<span class="token punctuation">]</span>, val <span class="token operator">=</span> <span class="token number">2</span>
输出：5, nums <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0,1</span>,4,0,3<span class="token punctuation">]</span>

解释：
函数应该返回新的长度 <span class="token number">5</span>, 并且 nums 中的前五个元素为 <span class="token number">0</span>, <span class="token number">1</span>, <span class="token number">3</span>, <span class="token number">0</span>, <span class="token number">4</span>。
注意这五个元素可为任意顺序。你不需要考虑数组中超出新长度后面的元素。
</code></pre></div><p><strong>思路</strong></p>
<p>同向双指针，使用非<code v-pre>val</code>一路覆盖过去即可，这个套路要记熟</p>
<p><strong>题解</strong></p>
<div class="language-python ext-py"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">moveEle</span><span class="token punctuation">(</span>nums<span class="token punctuation">:</span> <span class="token builtin">list</span><span class="token punctuation">,</span> val<span class="token punctuation">:</span> <span class="token builtin">int</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 指针j指向 准备要插入到列表中的索引</span>
    j <span class="token operator">=</span> <span class="token number">0</span>

    <span class="token comment"># 遍历列表，每次遇到正确的值便替换为j索引的值</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> nums<span class="token punctuation">:</span>
        <span class="token keyword">if</span> i <span class="token operator">!=</span> val<span class="token punctuation">:</span>
            <span class="token comment"># 这一步是个套路，经常会用到，要记熟</span>
            nums<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> i
            j <span class="token operator">+=</span> <span class="token number">1</span>

    <span class="token comment"># 返回j，这里并不需要+1，j索引当前值并非是正确的</span>
    <span class="token comment"># nums[:j]用来验证我们的结果到底对不对</span>
    <span class="token keyword">return</span> j<span class="token punctuation">,</span> nums<span class="token punctuation">[</span><span class="token punctuation">:</span>j<span class="token punctuation">]</span>


<span class="token keyword">print</span><span class="token punctuation">(</span>moveEle<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># (2, [2, 2])</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>moveEle<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># (5, [0, 1, 3, 0, 4])</span>
</code></pre></div><blockquote>
<p>关键点：</p>
<p>指针方向：同向双指针，如果是反向双指针还需要考虑右指针的值是不是等于val</p>
<p>指针速度：双指针可以重合，不需要考虑一次还是两次遍历</p>
<pre><code> if i != val:
 	# 这一步是个套路，经常会用到，要记熟
     nums[j] = i
</code></pre>
</blockquote>
<h2 id="leetcode-26-删除有序数组中的重复项" tabindex="-1"><a class="header-anchor" href="#leetcode-26-删除有序数组中的重复项" aria-hidden="true">#</a> LeetCode 26.删除有序数组中的重复项</h2>
<p><code v-pre>LeetCode</code>地址：https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/</p>
<p><strong>题目描述</strong></p>
<p>给你一个有序数组 <code v-pre>nums</code> ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。</p>
<p>不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成</p>
<p><strong>示例 1</strong></p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>输入：nums <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1,1</span>,2<span class="token punctuation">]</span>
输出：2, nums <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1,2</span><span class="token punctuation">]</span>

解释：
函数应该返回新的长度 <span class="token number">2</span> ，并且原数组 nums 的前两个元素被修改为 <span class="token number">1</span>, <span class="token number">2</span> 。
不需要考虑数组中超出新长度后面的元素。
</code></pre></div><p><strong>示例 2</strong></p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>输入：nums <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0,0</span>,1,1,1,2,2,3,3,4<span class="token punctuation">]</span>
输出：5, nums <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0,1</span>,2,3,4<span class="token punctuation">]</span>

解释：
函数应该返回新的长度 <span class="token number">5</span> ， 并且原数组 nums 的前五个元素被修改为 <span class="token number">0</span>, <span class="token number">1</span>, <span class="token number">2</span>, <span class="token number">3</span>, <span class="token number">4</span> 。
不需要考虑数组中超出新长度后面的元素。
</code></pre></div><p><strong>思路</strong></p>
<p><span style="color: red;">有序数组</span>是关键点，意味着我们可以使用同向双指针，可以保证第二个指针记录的值是唯一的</p>
<p>索引指针的值 与 j指针的值 做对比，不一样说明值不重复，然后 j指针向右移动一位，将索引指针的值赋值给j指针</p>
<p><strong>题解</strong></p>
<div class="language-python ext-py"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">removeEle</span><span class="token punctuation">(</span>nums<span class="token punctuation">:</span> <span class="token builtin">list</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 指针j指向 最后一次正确插入数据的索引，因为判断重复的话，要与当前值判断</span>
    <span class="token comment"># 下次插入数据要从j+1位置插入</span>
    j <span class="token operator">=</span> <span class="token number">0</span>

    <span class="token comment"># 遍历列表</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> nums<span class="token punctuation">:</span>
        <span class="token keyword">if</span> i <span class="token operator">!=</span> nums<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">:</span>
            j <span class="token operator">+=</span> <span class="token number">1</span>
            nums<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> i  <span class="token comment"># 这里的套路又用到了~</span>
    <span class="token keyword">return</span> j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> nums<span class="token punctuation">[</span><span class="token punctuation">:</span>j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span>


<span class="token keyword">print</span><span class="token punctuation">(</span>removeEle<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># (2, [1, 2])</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>removeEle<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># (5, [0, 1, 2, 3, 4])</span>
</code></pre></div><blockquote>
<p>这个去重有点意思，圈起来，下次要考</p>
</blockquote>
<h2 id="leetcode-80-删除有序数组中的重复项-ii" tabindex="-1"><a class="header-anchor" href="#leetcode-80-删除有序数组中的重复项-ii" aria-hidden="true">#</a> LeetCode 80. 删除有序数组中的重复项 II</h2>
<p>题目地址：https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array-ii/</p>
<p><strong>题目描述</strong></p>
<p>给你一个有序数组 <code v-pre>nums </code>，请你 原地 删除重复出现的元素，使每个元素 最多出现两次 ，返回删除后数组的新长度。</p>
<p>不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成</p>
<p><strong>示例 1</strong></p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>输入：nums <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1,1</span>,1,2,2,3<span class="token punctuation">]</span>
输出：5, nums <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1,1</span>,2,2,3<span class="token punctuation">]</span>

解释：函数应返回新长度 length <span class="token operator">=</span> <span class="token number">5</span>, 并且原数组的前五个元素被修改为 <span class="token number">1</span>, <span class="token number">1</span>, <span class="token number">2</span>, <span class="token number">2</span>, <span class="token number">3</span> 。 不需要考虑数组中超出新长度后面的元素。
</code></pre></div><p><strong>示例 2</strong></p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>输入：nums <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0,0</span>,1,1,1,1,2,3,3<span class="token punctuation">]</span>
输出：7, nums <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0,0</span>,1,1,2,3,3<span class="token punctuation">]</span>

解释：函数应返回新长度 length <span class="token operator">=</span> <span class="token number">7</span>, 并且原数组的前五个元素被修改为 <span class="token number">0</span>, <span class="token number">0</span>, <span class="token number">1</span>, <span class="token number">1</span>, <span class="token number">2</span>, <span class="token number">3</span>, <span class="token number">3</span> 。 不需要考虑数组中超出新长度后面的元素。
</code></pre></div><p><strong>思路</strong></p>
<p>这个是上面题的升级版，不同的地方在于 <code v-pre>对出现次数 &gt; 2  的数据去重</code></p>
<p>还是原来的配方，在数据重复判断需要仔细想一下</p>
<p>j+1指针代表要插入的数据索引</p>
<p>对于j索引的值未重复的情况下，索引指针的值可以与j索引值重复</p>
<p>对于j索引的值已重复的情况下，索引指针的值不能与j索引值重复</p>
<p><strong>题解</strong></p>
<div class="language-python ext-py"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">removeEle</span><span class="token punctuation">(</span>nums<span class="token punctuation">:</span> <span class="token builtin">list</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 指针j指向 最后一次正确插入数据的索引,下次插入数据要从j+1位置插入</span>
    j <span class="token operator">=</span> <span class="token number">1</span>

    <span class="token comment"># 遍历列表</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> nums<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
        <span class="token comment"># j和j-1指向的值重复情况下</span>
        <span class="token comment"># 索引指针的值 与 j或j-1的值 不一致时才允许插入</span>
        <span class="token keyword">if</span> nums<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">==</span> nums<span class="token punctuation">[</span>j <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
            <span class="token keyword">if</span> i <span class="token operator">!=</span> nums<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">:</span>
                j <span class="token operator">+=</span> <span class="token number">1</span>
                nums<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> i
            <span class="token keyword">continue</span>

        <span class="token comment"># j和j-1指向的值不重复情况下</span>
        <span class="token comment"># 任意值都可以插入到j的位置</span>
        j <span class="token operator">+=</span> <span class="token number">1</span>
        nums<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> i

    <span class="token comment"># 为了严谨，这里判断一下数组元素个数</span>
    <span class="token comment"># 如果数组小于等于2，直接返回</span>
    <span class="token comment"># 这一步可以写到最前面，写到这也没事，只是多执行一步变量赋值j = 1,无影响</span>
    <span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span> <span class="token operator">&lt;=</span> <span class="token number">2</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token builtin">len</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span><span class="token punctuation">,</span> nums

    <span class="token keyword">return</span> j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> nums<span class="token punctuation">[</span><span class="token punctuation">:</span>j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>removeEle<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># (5, [1, 1, 2, 2, 3])</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>removeEle<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># (7, [0, 0, 1, 1, 2, 3, 3])</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>removeEle<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># (0, [])</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>removeEle<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># (2, [1, 1])</span>
</code></pre></div><p>也可以使用索引指针值与j和j-1进行判断，在我之前<code v-pre>LeetCode</code>的提交记录中是这样写的，可以参考一下</p>
<div class="language-python ext-py"><pre v-pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">removeDuplicates</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> nums<span class="token punctuation">:</span> List<span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">int</span><span class="token punctuation">:</span>
        <span class="token comment"># j索引指向的值 为正确数据的值</span>
        j <span class="token operator">=</span> <span class="token number">1</span>
        
        <span class="token keyword">for</span> i <span class="token keyword">in</span> nums<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">:</span> 
            <span class="token comment"># j为重复，索引指针跳过</span>
            <span class="token keyword">if</span> i <span class="token operator">==</span> nums<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token keyword">and</span> nums<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">==</span> nums<span class="token punctuation">[</span>j<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
                <span class="token keyword">continue</span>
            
            <span class="token comment"># j为不重复</span>
            <span class="token keyword">if</span> i <span class="token operator">==</span> nums<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token keyword">and</span> nums<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">!=</span> nums<span class="token punctuation">[</span>j<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
                j <span class="token operator">+=</span> <span class="token number">1</span>
                nums<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> i
                <span class="token keyword">continue</span>
                        
            j <span class="token operator">+=</span> <span class="token number">1</span>
            nums<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> i
        
        <span class="token comment"># 没有写return，大意了!!!</span>
        <span class="token keyword">return</span> j<span class="token operator">+</span><span class="token number">1</span>
</code></pre></div><h2 id="leetcode-11-盛最多水的容器" tabindex="-1"><a class="header-anchor" href="#leetcode-11-盛最多水的容器" aria-hidden="true">#</a> LeetCode 11. 盛最多水的容器</h2>
<p>题目地址：https://leetcode-cn.com/problems/container-with-most-water/</p>
<p><strong>题目描述</strong></p>
<p>给你 n 个非负整数 <code v-pre>a1</code>，<code v-pre>a2</code>，<code v-pre>...</code>，<code v-pre>an</code>，每个数代表坐标中的一个点 <code v-pre>(i, ai)</code> 。</p>
<p>在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 <code v-pre>(i, ai)</code> 和 <code v-pre>(i, 0)</code> 。</p>
<p>找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。</p>
<p>说明：你不能倾斜容器</p>
<p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20210629223117200.png" alt="image-20210629223117200"></p>
<p><strong>示例1</strong></p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>输入：<span class="token punctuation">[</span><span class="token number">1,8</span>,6,2,5,4,8,3,7<span class="token punctuation">]</span>
输出：49 

解释：图中垂直线代表输入数组 <span class="token punctuation">[</span><span class="token number">1,8</span>,6,2,5,4,8,3,7<span class="token punctuation">]</span>。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 <span class="token number">49</span>。
</code></pre></div><p><strong>示例 2</strong></p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>输入：height <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1,1</span><span class="token punctuation">]</span>
输出：1
</code></pre></div><p><strong>示例 3</strong></p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>输入：height <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">4,3</span>,2,1,4<span class="token punctuation">]</span>
输出：16
</code></pre></div><p><strong>示例 4</strong></p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>输入：height <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1,2</span>,1<span class="token punctuation">]</span>
输出：2
</code></pre></div><p><strong>思路</strong></p>
<p>先要看明白题意，最大面积的计算方法是：<code v-pre>（右边的索引 - 左边的索引）* 两个索引对应的值中最小的那一个</code></p>
<p>反向双指针向中心位置移动，移动的条件是哪个指针对应的值小就移动哪个，直到两个指针重合</p>
<p><strong>题解</strong></p>
<div class="language-python ext-py"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">maxArea</span><span class="token punctuation">(</span>height<span class="token punctuation">:</span> <span class="token builtin">list</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    i<span class="token punctuation">,</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token builtin">len</span><span class="token punctuation">(</span>height<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span>
    max_area <span class="token operator">=</span> <span class="token number">0</span>

    <span class="token keyword">while</span> i <span class="token operator">!=</span> j<span class="token punctuation">:</span>
        _length <span class="token operator">=</span> j <span class="token operator">-</span> i
        _height <span class="token operator">=</span> height<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token keyword">if</span> height<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&lt;</span> height<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token keyword">else</span> height<span class="token punctuation">[</span>j<span class="token punctuation">]</span>  <span class="token comment"># 这要注意要求最小的高，很容易求反了~</span>
        area <span class="token operator">=</span> _length <span class="token operator">*</span> _height
        max_area <span class="token operator">=</span> area <span class="token keyword">if</span> area <span class="token operator">></span> max_area <span class="token keyword">else</span> max_area

        <span class="token keyword">if</span> height<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&lt;=</span> height<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">:</span>
            i <span class="token operator">+=</span> <span class="token number">1</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            j <span class="token operator">-=</span> <span class="token number">1</span>
    <span class="token keyword">return</span> max_area


<span class="token keyword">print</span><span class="token punctuation">(</span>maxArea<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 49</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>maxArea<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 1</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>maxArea<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 16</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>maxArea<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 2</span>
</code></pre></div><p>下面这个是最开始写的带注释的，思路一样</p>
<div class="language-python ext-py"><pre v-pre class="language-python"><code><span class="token comment">#!/usr/bin/env python</span>
<span class="token comment"># --*--coding:utf-8--*--</span>

<span class="token keyword">def</span> <span class="token function">maxArea</span><span class="token punctuation">(</span>height<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 左指针和右指针</span>
    j<span class="token punctuation">,</span> k <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token builtin">len</span><span class="token punctuation">(</span>height<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span>

    <span class="token comment"># 存贮最大的面积</span>
    max_area <span class="token operator">=</span> <span class="token number">0</span>

    <span class="token keyword">while</span> j <span class="token operator">!=</span> k<span class="token punctuation">:</span>
        <span class="token comment"># 求出最小的高</span>
        <span class="token keyword">if</span> height<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">&lt;=</span> height<span class="token punctuation">[</span>k<span class="token punctuation">]</span><span class="token punctuation">:</span>
            min_height <span class="token operator">=</span> height<span class="token punctuation">[</span>j<span class="token punctuation">]</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            min_height <span class="token operator">=</span> height<span class="token punctuation">[</span>k<span class="token punctuation">]</span>

        <span class="token comment"># 求长</span>
        width <span class="token operator">=</span> k <span class="token operator">-</span> j

        <span class="token comment"># 计算面积</span>
        area <span class="token operator">=</span> min_height <span class="token operator">*</span> width
        <span class="token keyword">if</span> area <span class="token operator">></span> max_area<span class="token punctuation">:</span>
            max_area <span class="token operator">=</span> area

        <span class="token comment"># 指针移动</span>
        <span class="token keyword">if</span> height<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">&lt;=</span> height<span class="token punctuation">[</span>k<span class="token punctuation">]</span><span class="token punctuation">:</span>
            j <span class="token operator">+=</span> <span class="token number">1</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            k <span class="token operator">-=</span> <span class="token number">1</span>

    <span class="token keyword">return</span> max_area

<span class="token keyword">print</span><span class="token punctuation">(</span>maxArea<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 49</span>
</code></pre></div></div></template>
