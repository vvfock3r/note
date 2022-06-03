export const data = {
  "key": "v-93717982",
  "path": "/algorithm/double-pointer.html",
  "title": "双指针算法入门",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "双指针算法入门",
    "date": "2021-06-17T15:04:30.000Z",
    "categories": "algorithm"
  },
  "excerpt": "<h2 id=\"双指针法原理\" tabindex=\"-1\"><a class=\"header-anchor\" href=\"#双指针法原理\" aria-hidden=\"true\">#</a> 双指针法原理</h2>\n<h3 id=\"理解单指针\" tabindex=\"-1\"><a class=\"header-anchor\" href=\"#理解单指针\" aria-hidden=\"true\">#</a> 理解单指针</h3>\n<p>理解双指针之前，先说一下单指针。单指针就是说只有一个指针，这个指针是什么呢？</p>\n<p>比如说我们遍历一个数组，那么每次遍历得到的索引或值对于这个数组来说，就是一个指针，指向已遍历的位置</p>\n<div class=\"language-python ext-py\"><pre v-pre class=\"language-python\"><code><span class=\"token comment\">#!/usr/bin/env python</span>\n<span class=\"token comment\"># --*--coding:utf-8--*--</span>\n\nl <span class=\"token operator\">=</span> <span class=\"token punctuation\">[</span>x <span class=\"token keyword\">for</span> x <span class=\"token keyword\">in</span> <span class=\"token builtin\">range</span><span class=\"token punctuation\">(</span><span class=\"token number\">10</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">]</span>\n<span class=\"token keyword\">for</span> i <span class=\"token keyword\">in</span> l<span class=\"token punctuation\">:</span>\n    <span class=\"token comment\"># 这里的变量i，我们就可以理解为一个指针，指向遍历到列表l的位置</span>\n    <span class=\"token comment\"># 为了后面讲解，这里我们就称它为索引指针吧</span>\n    <span class=\"token keyword\">print</span><span class=\"token punctuation\">(</span>i<span class=\"token punctuation\">)</span>\n</code></pre></div><h3 id=\"理解双指针\" tabindex=\"-1\"><a class=\"header-anchor\" href=\"#理解双指针\" aria-hidden=\"true\">#</a> 理解双指针</h3>\n<p>现在再理解双指针就容易一些了，还是以上面代码为例，双指针就是有两个指针，另一个指针指向哪里呢？</p>\n<p>另一个指针也是指向列表的某个位置，具体如何操作则由我们手动通过代码来实现</p>\n<p>一个数组，两个指针，看起来好像也不是很复杂嘛？</p>\n<p>不是这样的，每个指针其实分为指针的索引和指针的值两种形式，这样说起来，是<span style=\"color: red;\">1个数组和4个对象</span>，这一点非常重要！</p>\n",
  "headers": [
    {
      "level": 2,
      "title": "双指针法原理",
      "slug": "双指针法原理",
      "children": [
        {
          "level": 3,
          "title": "理解单指针",
          "slug": "理解单指针",
          "children": []
        },
        {
          "level": 3,
          "title": "理解双指针",
          "slug": "理解双指针",
          "children": []
        },
        {
          "level": 3,
          "title": "双指针运用方式",
          "slug": "双指针运用方式",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "LeetCode 283.移动零",
      "slug": "leetcode-283-移动零",
      "children": [
        {
          "level": 3,
          "title": "题目描述",
          "slug": "题目描述",
          "children": []
        },
        {
          "level": 3,
          "title": "暴力解题",
          "slug": "暴力解题",
          "children": []
        },
        {
          "level": 3,
          "title": "满足题目要求解法1 - 两次遍历法",
          "slug": "满足题目要求解法1-两次遍历法",
          "children": []
        },
        {
          "level": 3,
          "title": "双指针法流两次遍历动画演示",
          "slug": "双指针法流两次遍历动画演示",
          "children": []
        },
        {
          "level": 3,
          "title": "满足题目要求解法2 - 一次遍历法",
          "slug": "满足题目要求解法2-一次遍历法",
          "children": []
        },
        {
          "level": 3,
          "title": "双指针法一次遍历动画演示",
          "slug": "双指针法一次遍历动画演示",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "LeetCode 27.移除元素",
      "slug": "leetcode-27-移除元素",
      "children": []
    },
    {
      "level": 2,
      "title": "LeetCode 26.删除有序数组中的重复项",
      "slug": "leetcode-26-删除有序数组中的重复项",
      "children": []
    },
    {
      "level": 2,
      "title": "LeetCode 80. 删除有序数组中的重复项 II",
      "slug": "leetcode-80-删除有序数组中的重复项-ii",
      "children": []
    },
    {
      "level": 2,
      "title": "LeetCode 11. 盛最多水的容器",
      "slug": "leetcode-11-盛最多水的容器",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1654251103000,
    "contributors": [
      {
        "name": "yujinhui",
        "email": "1265921100@qq.com",
        "commits": 1
      },
      {
        "name": "于金辉",
        "email": "1265921100@qq.com",
        "commits": 1
      }
    ]
  },
  "filePathRelative": "algorithm/double-pointer.md"
}
