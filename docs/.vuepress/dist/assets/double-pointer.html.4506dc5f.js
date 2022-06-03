const e={key:"v-93717982",path:"/algorithm/double-pointer.html",title:"\u53CC\u6307\u9488\u7B97\u6CD5\u5165\u95E8",lang:"zh-CN",frontmatter:{title:"\u53CC\u6307\u9488\u7B97\u6CD5\u5165\u95E8",date:"2021-06-17T15:04:30.000Z",categories:"algorithm"},excerpt:`<h2 id="\u53CC\u6307\u9488\u6CD5\u539F\u7406" tabindex="-1"><a class="header-anchor" href="#\u53CC\u6307\u9488\u6CD5\u539F\u7406" aria-hidden="true">#</a> \u53CC\u6307\u9488\u6CD5\u539F\u7406</h2>
<h3 id="\u7406\u89E3\u5355\u6307\u9488" tabindex="-1"><a class="header-anchor" href="#\u7406\u89E3\u5355\u6307\u9488" aria-hidden="true">#</a> \u7406\u89E3\u5355\u6307\u9488</h3>
<p>\u7406\u89E3\u53CC\u6307\u9488\u4E4B\u524D\uFF0C\u5148\u8BF4\u4E00\u4E0B\u5355\u6307\u9488\u3002\u5355\u6307\u9488\u5C31\u662F\u8BF4\u53EA\u6709\u4E00\u4E2A\u6307\u9488\uFF0C\u8FD9\u4E2A\u6307\u9488\u662F\u4EC0\u4E48\u5462\uFF1F</p>
<p>\u6BD4\u5982\u8BF4\u6211\u4EEC\u904D\u5386\u4E00\u4E2A\u6570\u7EC4\uFF0C\u90A3\u4E48\u6BCF\u6B21\u904D\u5386\u5F97\u5230\u7684\u7D22\u5F15\u6216\u503C\u5BF9\u4E8E\u8FD9\u4E2A\u6570\u7EC4\u6765\u8BF4\uFF0C\u5C31\u662F\u4E00\u4E2A\u6307\u9488\uFF0C\u6307\u5411\u5DF2\u904D\u5386\u7684\u4F4D\u7F6E</p>
<div class="language-python ext-py"><pre v-pre class="language-python"><code><span class="token comment">#!/usr/bin/env python</span>
<span class="token comment"># --*--coding:utf-8--*--</span>

l <span class="token operator">=</span> <span class="token punctuation">[</span>x <span class="token keyword">for</span> x <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
<span class="token keyword">for</span> i <span class="token keyword">in</span> l<span class="token punctuation">:</span>
    <span class="token comment"># \u8FD9\u91CC\u7684\u53D8\u91CFi\uFF0C\u6211\u4EEC\u5C31\u53EF\u4EE5\u7406\u89E3\u4E3A\u4E00\u4E2A\u6307\u9488\uFF0C\u6307\u5411\u904D\u5386\u5230\u5217\u8868l\u7684\u4F4D\u7F6E</span>
    <span class="token comment"># \u4E3A\u4E86\u540E\u9762\u8BB2\u89E3\uFF0C\u8FD9\u91CC\u6211\u4EEC\u5C31\u79F0\u5B83\u4E3A\u7D22\u5F15\u6307\u9488\u5427</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
</code></pre></div><h3 id="\u7406\u89E3\u53CC\u6307\u9488" tabindex="-1"><a class="header-anchor" href="#\u7406\u89E3\u53CC\u6307\u9488" aria-hidden="true">#</a> \u7406\u89E3\u53CC\u6307\u9488</h3>
<p>\u73B0\u5728\u518D\u7406\u89E3\u53CC\u6307\u9488\u5C31\u5BB9\u6613\u4E00\u4E9B\u4E86\uFF0C\u8FD8\u662F\u4EE5\u4E0A\u9762\u4EE3\u7801\u4E3A\u4F8B\uFF0C\u53CC\u6307\u9488\u5C31\u662F\u6709\u4E24\u4E2A\u6307\u9488\uFF0C\u53E6\u4E00\u4E2A\u6307\u9488\u6307\u5411\u54EA\u91CC\u5462\uFF1F</p>
<p>\u53E6\u4E00\u4E2A\u6307\u9488\u4E5F\u662F\u6307\u5411\u5217\u8868\u7684\u67D0\u4E2A\u4F4D\u7F6E\uFF0C\u5177\u4F53\u5982\u4F55\u64CD\u4F5C\u5219\u7531\u6211\u4EEC\u624B\u52A8\u901A\u8FC7\u4EE3\u7801\u6765\u5B9E\u73B0</p>
<p>\u4E00\u4E2A\u6570\u7EC4\uFF0C\u4E24\u4E2A\u6307\u9488\uFF0C\u770B\u8D77\u6765\u597D\u50CF\u4E5F\u4E0D\u662F\u5F88\u590D\u6742\u561B\uFF1F</p>
<p>\u4E0D\u662F\u8FD9\u6837\u7684\uFF0C\u6BCF\u4E2A\u6307\u9488\u5176\u5B9E\u5206\u4E3A\u6307\u9488\u7684\u7D22\u5F15\u548C\u6307\u9488\u7684\u503C\u4E24\u79CD\u5F62\u5F0F\uFF0C\u8FD9\u6837\u8BF4\u8D77\u6765\uFF0C\u662F<span style="color: red;">1\u4E2A\u6570\u7EC4\u548C4\u4E2A\u5BF9\u8C61</span>\uFF0C\u8FD9\u4E00\u70B9\u975E\u5E38\u91CD\u8981\uFF01</p>
`,headers:[{level:2,title:"\u53CC\u6307\u9488\u6CD5\u539F\u7406",slug:"\u53CC\u6307\u9488\u6CD5\u539F\u7406",children:[{level:3,title:"\u7406\u89E3\u5355\u6307\u9488",slug:"\u7406\u89E3\u5355\u6307\u9488",children:[]},{level:3,title:"\u7406\u89E3\u53CC\u6307\u9488",slug:"\u7406\u89E3\u53CC\u6307\u9488",children:[]},{level:3,title:"\u53CC\u6307\u9488\u8FD0\u7528\u65B9\u5F0F",slug:"\u53CC\u6307\u9488\u8FD0\u7528\u65B9\u5F0F",children:[]}]},{level:2,title:"LeetCode 283.\u79FB\u52A8\u96F6",slug:"leetcode-283-\u79FB\u52A8\u96F6",children:[{level:3,title:"\u9898\u76EE\u63CF\u8FF0",slug:"\u9898\u76EE\u63CF\u8FF0",children:[]},{level:3,title:"\u66B4\u529B\u89E3\u9898",slug:"\u66B4\u529B\u89E3\u9898",children:[]},{level:3,title:"\u6EE1\u8DB3\u9898\u76EE\u8981\u6C42\u89E3\u6CD51 - \u4E24\u6B21\u904D\u5386\u6CD5",slug:"\u6EE1\u8DB3\u9898\u76EE\u8981\u6C42\u89E3\u6CD51-\u4E24\u6B21\u904D\u5386\u6CD5",children:[]},{level:3,title:"\u53CC\u6307\u9488\u6CD5\u6D41\u4E24\u6B21\u904D\u5386\u52A8\u753B\u6F14\u793A",slug:"\u53CC\u6307\u9488\u6CD5\u6D41\u4E24\u6B21\u904D\u5386\u52A8\u753B\u6F14\u793A",children:[]},{level:3,title:"\u6EE1\u8DB3\u9898\u76EE\u8981\u6C42\u89E3\u6CD52 - \u4E00\u6B21\u904D\u5386\u6CD5",slug:"\u6EE1\u8DB3\u9898\u76EE\u8981\u6C42\u89E3\u6CD52-\u4E00\u6B21\u904D\u5386\u6CD5",children:[]},{level:3,title:"\u53CC\u6307\u9488\u6CD5\u4E00\u6B21\u904D\u5386\u52A8\u753B\u6F14\u793A",slug:"\u53CC\u6307\u9488\u6CD5\u4E00\u6B21\u904D\u5386\u52A8\u753B\u6F14\u793A",children:[]}]},{level:2,title:"LeetCode 27.\u79FB\u9664\u5143\u7D20",slug:"leetcode-27-\u79FB\u9664\u5143\u7D20",children:[]},{level:2,title:"LeetCode 26.\u5220\u9664\u6709\u5E8F\u6570\u7EC4\u4E2D\u7684\u91CD\u590D\u9879",slug:"leetcode-26-\u5220\u9664\u6709\u5E8F\u6570\u7EC4\u4E2D\u7684\u91CD\u590D\u9879",children:[]},{level:2,title:"LeetCode 80. \u5220\u9664\u6709\u5E8F\u6570\u7EC4\u4E2D\u7684\u91CD\u590D\u9879 II",slug:"leetcode-80-\u5220\u9664\u6709\u5E8F\u6570\u7EC4\u4E2D\u7684\u91CD\u590D\u9879-ii",children:[]},{level:2,title:"LeetCode 11. \u76DB\u6700\u591A\u6C34\u7684\u5BB9\u5668",slug:"leetcode-11-\u76DB\u6700\u591A\u6C34\u7684\u5BB9\u5668",children:[]}],git:{updatedTime:1654251103e3,contributors:[{name:"yujinhui",email:"1265921100@qq.com",commits:1},{name:"\u4E8E\u91D1\u8F89",email:"1265921100@qq.com",commits:1}]},filePathRelative:"algorithm/double-pointer.md"};export{e as data};
