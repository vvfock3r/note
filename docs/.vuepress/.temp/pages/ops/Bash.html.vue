<template><div><h2 id="bash" tabindex="-1"><a class="header-anchor" href="#bash" aria-hidden="true">#</a> Bash</h2>
<h3 id="shell类型" tabindex="-1"><a class="header-anchor" href="#shell类型" aria-hidden="true">#</a> Shell类型</h3>
<p>Shell是一个应用程序，它是作系统与外部交互最主要的接口式。</p>
<p>Shell的实现有很多方式，这里我们主要说Bash，操作系统使用的是CentOS7</p>
<ul>
<li>
<p>查看系统中已有得Shell类型</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 方法1</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/shells </span>
/bin/sh
/bin/bash
/sbin/nologin
/usr/bin/sh
/usr/bin/bash
/usr/sbin/nologin
/bin/zsh

<span class="token comment"># 方法2</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># chsh -l</span>
/bin/sh
/bin/bash
/sbin/nologin
/usr/bin/sh
/usr/bin/bash
/usr/sbin/nologin
/bin/zsh
</code></pre></div></li>
<li>
<p>查看当当前用户所使用的默认Shell类型</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo $SHELL</span>
/bin/bash

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># bash --version</span>
<span class="token function">bash</span> --version
GNU bash, version <span class="token number">4.2</span>.46<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>-release <span class="token punctuation">(</span>x86_64-redhat-linux-gnu<span class="token punctuation">)</span>
Copyright <span class="token punctuation">(</span>C<span class="token punctuation">)</span> <span class="token number">2011</span> Free Software Foundation, Inc.
License GPLv3+: GNU GPL version <span class="token number">3</span> or later <span class="token operator">&lt;</span>http://gnu.org/licenses/gpl.html<span class="token operator">></span>

This is <span class="token function">free</span> software<span class="token punctuation">;</span> you are <span class="token function">free</span> to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
</code></pre></div><blockquote>
<p>有时候会使用sh命令，这通常是Bash的软连接</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls -l `which sh`</span>
lrwxrwxrwx. <span class="token number">1</span> root root <span class="token number">4</span> May <span class="token number">21</span>  <span class="token number">2021</span> /usr/bin/sh -<span class="token operator">></span> <span class="token function">bash</span>
</code></pre></div></blockquote>
</li>
<li>
<p>修改当前用户所使用的默认Shell为zsh</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 修改当前用户所使用的默认Shell</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># chsh -s /bin/zsh</span>
Changing shell <span class="token keyword">for</span> root.
Shell changed.

<span class="token comment"># 退出当前终端，重新连接</span>

<span class="token comment"># 再次查看当前所使用的Shell</span>
<span class="token punctuation">[</span>root@localhost<span class="token punctuation">]</span>~<span class="token comment"># echo $SHELL</span>
/bin/zsh
</code></pre></div><blockquote>
<p>原理其实就是修改了/etc/passwd文件</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost<span class="token punctuation">]</span>~<span class="token comment"># cat /etc/passwd | grep -E "^root"</span>
root:x:0:0:root:/root:/bin/zsh
</code></pre></div></blockquote>
</li>
</ul>
<h3 id="获取bash帮助文档" tabindex="-1"><a class="header-anchor" href="#获取bash帮助文档" aria-hidden="true">#</a> 获取Bash帮助文档</h3>
<p>可以通过<code v-pre>man bash</code>来查询详细文档，本文档中大部分信息都可以通过这种方式获取到</p>
<h3 id="变量" tabindex="-1"><a class="header-anchor" href="#变量" aria-hidden="true">#</a> 变量</h3>
<h4 id="环境变量" tabindex="-1"><a class="header-anchor" href="#环境变量" aria-hidden="true">#</a> 环境变量</h4>
<p>环境变量，或者称为全局变量，在登陆系统的时候就已经有了相应的系统定义的环境变量了，</p>
<p>环境变量具有继承性，即<code v-pre>子Shell</code>会继承<code v-pre>父Shell</code>的环境变量。</p>
<p>列举部分环境变量</p>
<table>
<thead>
<tr>
<th>变量名</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>Shell</td>
<td>当前使用的Shell</td>
</tr>
<tr>
<td>BASH_VERSION</td>
<td>Bash版本号</td>
</tr>
<tr>
<td>BASHPID</td>
<td>当前Bash进程的PID(等同于$$)</td>
</tr>
<tr>
<td>PPID</td>
<td>当前Bash进程的父进程PID</td>
</tr>
<tr>
<td>SHLVL</td>
<td>Bash嵌套层数</td>
</tr>
<tr>
<td>PATH</td>
<td>执行系统命令所搜寻的路径集合，路径之间用分号隔开</td>
</tr>
<tr>
<td>USER</td>
<td>当前用户名</td>
</tr>
<tr>
<td>HOME</td>
<td>当前用户的家目录</td>
</tr>
<tr>
<td>LANG</td>
<td>当前用户所使用的语言</td>
</tr>
<tr>
<td>HOSTNAME</td>
<td>主机名</td>
</tr>
<tr>
<td>RANDOM</td>
<td>产生一个范围在0-32767的随机数</td>
</tr>
</tbody>
</table>
<p>使用<code v-pre>env</code>命令可以查看终端所有的环境变量</p>
<p>使用<code v-pre>locale</code>命令可以输出语言相关的详细变量</p>
<p>使用<code v-pre>cat /proc/$PID/environ</code>可以查看某个进程的环境变量，示例如下：</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ps aux|grep sshd</span>
root        <span class="token number">986</span>  <span class="token number">0.0</span>  <span class="token number">0.2</span> <span class="token number">105996</span>  <span class="token number">4112</span> ?        Ss   05:30   <span class="token number">0</span>:00 /usr/sbin/sshd -D
root       <span class="token number">1542</span>  <span class="token number">0.0</span>  <span class="token number">0.2</span> <span class="token number">148316</span>  <span class="token number">5400</span> ?        Ss   05:49   <span class="token number">0</span>:00 sshd: root@pts/0
root       <span class="token number">1692</span>  <span class="token number">0.0</span>  <span class="token number">0.0</span> <span class="token number">112660</span>   <span class="token number">972</span> pts/0    R+   06:02   <span class="token number">0</span>:00 <span class="token function">grep</span> --color<span class="token operator">=</span>auto sshd

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat /proc/986/environ | tr '\0' '\n'</span>
<span class="token assign-left variable"><span class="token environment constant">LANG</span></span><span class="token operator">=</span>en_US.UTF-8
<span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span>/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin
<span class="token assign-left variable">NOTIFY_SOCKET</span><span class="token operator">=</span>/run/systemd/notify
<span class="token assign-left variable">SSH_USE_STRONG_RNG</span><span class="token operator">=</span><span class="token number">0</span>
</code></pre></div><p>使用<code v-pre>export k=v</code>可以设置环境变量，也可以单独使用<code v-pre>export</code>显示环境变量</p>
<h4 id="本地变量" tabindex="-1"><a class="header-anchor" href="#本地变量" aria-hidden="true">#</a> 本地变量</h4>
<p>本地变量，当前shell 中的变量，很显然本地变量中包含环境变量，本地变量的非环境变量不具备继承性，只在当前Shell生效。</p>
<p>使用<code v-pre>set</code>命令显示本地变量，使用<code v-pre>unset</code>可以删除本地变量</p>
<h4 id="变量继承性差异" tabindex="-1"><a class="header-anchor" href="#变量继承性差异" aria-hidden="true">#</a> 变量继承性差异</h4>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo -e "当前Shell PID为: $$ \n当前Shell层级为: $SHLVL"       # 查看当前Bash信息</span>
当前Shell PID为: <span class="token number">1951</span>
当前Shell层级为: <span class="token number">1</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># a=1        # 设置本地变量，不具有继承性</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># export b=2 # 设置环境变量，具有继承性</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># bash       # 开启一个子进程</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo -e "当前Shell PID为: $$ \n当前Shell层级为: $SHLVL"       # 再次查看当前Bash信息</span>
当前Shell PID为: <span class="token number">2080</span>
当前Shell层级为: <span class="token number">2</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo $a    # 查看本地变量</span>

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo $b    # 查看环境变量</span>
<span class="token number">2</span>

<span class="token comment"># 查看进程树</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># pstree -p | grep bash</span>
           <span class="token operator">|</span>-sshd<span class="token punctuation">(</span><span class="token number">986</span><span class="token punctuation">)</span>---sshd<span class="token punctuation">(</span><span class="token number">1542</span><span class="token punctuation">)</span>---bash<span class="token punctuation">(</span><span class="token number">1951</span><span class="token punctuation">)</span>---bash<span class="token punctuation">(</span><span class="token number">2080</span><span class="token punctuation">)</span>-+-grep<span class="token punctuation">(</span><span class="token number">2124</span><span class="token punctuation">)</span>
</code></pre></div><blockquote>
<p>pstree命令安装：yum -y install psmisc</p>
</blockquote>
<h4 id="内部域分隔符ifs" tabindex="-1"><a class="header-anchor" href="#内部域分隔符ifs" aria-hidden="true">#</a> 内部域分隔符IFS</h4>
<p>BASH 脚本中有个变量叫IFS(Internal Field Seprator) ，内部域分隔符</p>
<ul>
<li>IFS是一种set变量，当BASH处理&quot;命令替换&quot;和&quot;参数替换&quot;时,BASH根据IFS的值来拆解读入的变量，然后对特殊字符进行处理，最后重新组合赋值给该变量</li>
<li>IFS的默认值为：空白（包括：空格，tab, 和新行)，将其ASSII码用十六进制打印出来就是：20 09 0a</li>
<li>IFS对空格的空白的处理和其他字符不一样，左右两半的纯空白会被忽略，多个连续的空白被当成一个IFS处理</li>
</ul>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 直接查看IFS变量为空</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo $IFS</span>

<span class="token comment"># 但实际上它应该是长这样的</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># IFS=$' \t\n'</span>

<span class="token comment"># 下面举个简单的例子说明IFS变量的作用</span>
<span class="token comment"># (1) 先保存一下旧的IFS变量</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># oldifs=$IFS</span>
<span class="token comment"># (2)设置一个变量msg，注意值中两个单词使用:分隔开</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># msg=hello:world </span>
<span class="token comment"># (3)设置新的IFS变量</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># IFS=':' </span>
<span class="token comment"># (4)查看变量msg的值</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo $msg</span>
hello world
<span class="token comment"># (5)恢复原先的IFS变量</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># IFS=$oldifs</span>
<span class="token comment"># (6)再次查看msg的值</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo $msg</span>
hello:world
</code></pre></div><h4 id="变量引用" tabindex="-1"><a class="header-anchor" href="#变量引用" aria-hidden="true">#</a> 变量引用</h4>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 方法一： $变量</span>
<span class="token comment"># 方法二： ${变量名}，推荐总是使用这种，举个例子</span>

<span class="token comment">#!/bin/bash</span>
<span class="token assign-left variable">year</span><span class="token operator">=</span><span class="token number">23</span>
<span class="token builtin class-name">echo</span> i am <span class="token variable">${year}</span>years old.  <span class="token comment"># 如果不加{}，它会把$yearyears当做一个整体</span>
</code></pre></div><h4 id="变量默认值" tabindex="-1"><a class="header-anchor" href="#变量默认值" aria-hidden="true">#</a> 变量默认值</h4>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 方式一：${var:-100}   如果$var没有值，则把100赋值给var,如果有值，则不做操作</span>
<span class="token comment"># 方式二：${var:=100}	如果$var没有值，则把100赋值给var，如果有值，则不做操作</span>

<span class="token comment"># 这两种方式的区别是，:-是临时赋值，=对var真正的赋值，举个例子</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo ${var:-100}</span>
<span class="token number">100</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo $var</span>

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo ${var:=100}</span>
<span class="token number">100</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo $var</span>
<span class="token number">100</span>
</code></pre></div><h4 id="位置参数变量" tabindex="-1"><a class="header-anchor" href="#位置参数变量" aria-hidden="true">#</a> 位置参数变量</h4>
<table>
<thead>
<tr>
<th>变量</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>$0</td>
<td>脚本的名字</td>
</tr>
<tr>
<td>$n</td>
<td>对于脚本或者函数来说，<br />传入的第n个参数(n为大于等于1的数字，如果大于等于10，则写成${n})</td>
</tr>
<tr>
<td>$#</td>
<td>参数数量</td>
</tr>
<tr>
<td>$$</td>
<td>脚本运行进程号</td>
</tr>
<tr>
<td>$?</td>
<td>命令退出码</td>
</tr>
<tr>
<td>$!</td>
<td>最后一个放在后台的进程号</td>
</tr>
<tr>
<td>$*/$@</td>
<td>传入的所有参数</td>
</tr>
</tbody>
</table>
<p>$*和$@的区别，$@可以作为数组用：</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># demo.sh</span>
<span class="token comment">#!/bin/bash</span>
<span class="token assign-left variable">var</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token string">"<span class="token variable">$@</span>"</span>
<span class="token keyword">do</span>
    array<span class="token punctuation">[</span><span class="token variable">$var</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token variable">$i</span>  <span class="token comment"># 数组赋值</span>
    <span class="token builtin class-name">let</span> var++       <span class="token comment"># 索引+1</span>
<span class="token keyword">done</span>
<span class="token builtin class-name">echo</span> <span class="token variable">${array<span class="token punctuation">[</span>2<span class="token punctuation">]</span>}</span>

<span class="token comment"># 测试</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># bash demo.sh 10 9 8</span>
<span class="token number">9</span>
</code></pre></div><h4 id="变量操作" tabindex="-1"><a class="header-anchor" href="#变量操作" aria-hidden="true">#</a> 变量操作</h4>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 定义变量</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># var=123456 </span>

<span class="token comment"># 取得变量值长度</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo ${#var}</span>
<span class="token number">6</span>

<span class="token comment"># 从0开始，截取第3个字符及以后的字符</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo ${var:3}</span>
<span class="token number">456</span>

<span class="token comment"># 从0开始，截取第3个字符及以后的字符，并控制长度</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo ${var:3:2}</span>
<span class="token number">45</span>

<span class="token comment"># 截取后4位，:后面有空格</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo ${var: -4}</span>
<span class="token number">3456</span>
 
<span class="token comment"># 定义变量</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># var=123123</span>

<span class="token comment"># 从左到右，去掉最短匹配</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo ${var#*3}</span>
<span class="token number">123</span>

<span class="token comment"># 从左到右，去掉最长匹配</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo ${var##*1}</span>
<span class="token number">23</span>
 
<span class="token comment"># 从右到左，去掉最短匹配</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo ${var%2*}</span>
<span class="token number">1231</span>

<span class="token comment"># 从右到左，去掉最长匹配</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo ${var%%2*}</span>
<span class="token number">1</span>
 
<span class="token comment"># 从左到右，替换1次</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo ${var/12/aa}</span>
aa3123

<span class="token comment"># 只替换第二次</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo $var | sed 's/12/aa/2'</span>
123aa3

<span class="token comment"># 全部替换</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo ${var//12/aa}</span>
aa3aa3
 
<span class="token comment"># 前缀替换，前缀必须是指定的字符串才能匹配然后替换</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># abc=administrator    </span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo ${abc/#adm/ABCD}</span>
ABCDinistrator
 
<span class="token comment"># 后缀替换</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># abc=administrator  </span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo ${abc/%tor/Tor}</span>
administraTor
 
<span class="token comment"># 匹配变量 ${!var*}和${!var@}</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># var1=100</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># var2=200</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># var3=300</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo ${!var*}</span>
var1 var2 var3
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo ${!var@}</span>
var1 var2 var3
 
<span class="token comment"># 读取一个文件内容赋给一个变量，如果内容是多行，则echo的时候会去掉换行符，如下所示：</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat test.txt</span>
AA
BB
CC
DD
EE
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># var=$(cat test.txt)</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo $var</span>
AA BB CC DD EE
 
<span class="token comment"># 这在很多时候是很不方便的，如果保留换行符的话仅仅将变量括起来就可以了：</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo "$var"</span>
AA
BB
CC
DD
EE
 
<span class="token comment"># 然后可以对每一行进行操作：</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo "$var" | while read line</span>
<span class="token operator">></span> <span class="token keyword">do</span>
<span class="token operator">></span> <span class="token builtin class-name">echo</span> <span class="token punctuation">[</span><span class="token variable">$line</span><span class="token punctuation">]</span>
<span class="token operator">></span> <span class="token keyword">done</span>
<span class="token punctuation">[</span>AA<span class="token punctuation">]</span>
<span class="token punctuation">[</span>BB<span class="token punctuation">]</span>
<span class="token punctuation">[</span>CC<span class="token punctuation">]</span>
<span class="token punctuation">[</span>DD<span class="token punctuation">]</span>
<span class="token punctuation">[</span>EE<span class="token punctuation">]</span>
</code></pre></div><h4 id="巧读配置文件" tabindex="-1"><a class="header-anchor" href="#巧读配置文件" aria-hidden="true">#</a> 巧读配置文件</h4>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 配置文件</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat config.ini </span>
<span class="token comment">#注意下面的配置=号两边不能有空格</span>
<span class="token assign-left variable">HOST</span><span class="token operator">=</span><span class="token string">'0.0.0.0'</span>
<span class="token assign-left variable">PORT</span><span class="token operator">=</span><span class="token number">55555</span>

<span class="token comment"># Bash脚本</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat demo.sh </span>
<span class="token comment">#!/bin/bash</span>
<span class="token builtin class-name">source</span> config.ini
<span class="token builtin class-name">echo</span> <span class="token string">"The Host is <span class="token variable">${HOST}</span>:<span class="token variable">${PORT}</span>"</span>

<span class="token comment"># 测试</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># bash demo.sh</span>
The Host is <span class="token number">0.0</span>.0.0:55555
</code></pre></div><h4 id="变量安全性" tabindex="-1"><a class="header-anchor" href="#变量安全性" aria-hidden="true">#</a> 变量安全性</h4>
<p><strong><code v-pre>set -u</code>变量不存在则报错退出脚本</strong></p>
<p>Bash遇到不存在的变量，默认会忽略，然后继续向下执行，这有时候会给我们带来灾难性事故，</p>
<p>比如这样一行代码<code v-pre>rm -rf ${Dir}/*</code>，如果Dir变量不存在，这会将我们的系统/删掉！</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat demo.sh </span>
<span class="token comment">#!/bin/bash</span>
<span class="token builtin class-name">set</span> -u
<span class="token builtin class-name">echo</span> <span class="token variable">${Dir}</span>
<span class="token builtin class-name">echo</span> <span class="token string">"End"</span>

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># bash demo.sh </span>
demo.sh: line <span class="token number">4</span>: Dir: unbound variable
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo $?</span>
<span class="token number">1</span>
<span class="token comment"># 可以看到，脚本报错并退出了，后面的代码也不会执行</span>
</code></pre></div><p><strong><code v-pre>set -e</code>脚本一旦报错便退出</strong></p>
<p>Bash如果遇到报错，默认会忽略，还会继续往下执行，这也不符合我们的预期</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 演示错误情景</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat demo.sh </span>
<span class="token comment">#!/bin/bash</span>
<span class="token builtin class-name">set</span> -u
a
<span class="token builtin class-name">echo</span> <span class="token string">"End"</span>

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># bash demo.sh</span>
demo.sh: line <span class="token number">3</span>: a: <span class="token builtin class-name">command</span> not found  <span class="token comment"># 报错了，但是还会继续向下执行</span>
End

<span class="token comment"># 演示正确情景</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat demo.sh</span>
<span class="token comment">#!/bin/bash</span>
<span class="token builtin class-name">set</span> -u
<span class="token builtin class-name">set</span> -e  <span class="token comment"># 添加set -e</span>
a
<span class="token builtin class-name">echo</span> <span class="token string">"End"</span>

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># bash demo.sh</span>
demo.sh: line <span class="token number">4</span>: a: <span class="token builtin class-name">command</span> not found  <span class="token comment"># 报错了，不会继续向下执行</span>
</code></pre></div><p><strong><code v-pre>set -o pipefail</code>对<code v-pre>set -e</code>的补充</strong></p>
<p><code v-pre>set -e</code>有一个例外情况，就是不适用于管道命令</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat demo.sh</span>
<span class="token comment">#!/bin/bash</span>
<span class="token builtin class-name">set</span> -u
<span class="token builtin class-name">set</span> -e
a <span class="token operator">|</span> <span class="token builtin class-name">echo</span> <span class="token number">1</span>
<span class="token builtin class-name">echo</span> <span class="token string">"End"</span>

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># bash demo.sh</span>
<span class="token number">1</span>
demo.sh: line <span class="token number">4</span>: a: <span class="token builtin class-name">command</span> not found
End
</code></pre></div><p><code v-pre>set -o pipefail</code>就是用来解决这种情况，只要一个子命令失败，整个管道命令就失败，脚本就会终止执行</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat demo.sh</span>
<span class="token comment">#!/bin/bash</span>
<span class="token builtin class-name">set</span> -u
<span class="token builtin class-name">set</span> -e
<span class="token builtin class-name">set</span> -o pipefail
a <span class="token operator">|</span> <span class="token builtin class-name">echo</span> <span class="token number">1</span>
<span class="token builtin class-name">echo</span> <span class="token string">"End"</span>

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># bash demo.sh</span>
demo.sh: line <span class="token number">5</span>: a: <span class="token builtin class-name">command</span> not found
<span class="token number">1</span>
</code></pre></div><p><strong>总结</strong></p>
<p>推荐使用下面这种写法</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token builtin class-name">set</span> -euo pipefail
</code></pre></div><blockquote>
<p>还有一种方法也能达到同样的效果，<code v-pre>bash -euxo pipefail demo.sh</code>，但是你不能保证调用时永远会记得添加<code v-pre>-euxo pipefail</code>选项，所以并不推荐</p>
</blockquote>
<h3 id="语句" tabindex="-1"><a class="header-anchor" href="#语句" aria-hidden="true">#</a> 语句</h3>
<h4 id="测试语句" tabindex="-1"><a class="header-anchor" href="#测试语句" aria-hidden="true">#</a> 测试语句</h4>
<p>测试语句可以使用 [ 比较语句 ] 和 [[ 比较语句 ]]，注意语句和前后中括号都有一个空格 也可以用test</p>
<p>使用[[ ... ]]条件判断结构，而不是[ ... ]，能够防止脚本中的许多逻辑错误。比如，&amp;&amp;、||、&lt;和&gt; 操作符能够正常存在于[[ ]]条件判断结构中，但是如果出现在[ ]结构中的话，可能会报错，但有些判断使用[[ ]]会出错而使用[ ]确没问题，具体如何使用，自己测试一下就好。</p>
<p><strong>整数比较</strong></p>
<table>
<thead>
<tr>
<th>代码</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>-eq</td>
<td>等于</td>
</tr>
<tr>
<td>-ne</td>
<td>不等于</td>
</tr>
<tr>
<td>-lt</td>
<td>小于</td>
</tr>
<tr>
<td>-le</td>
<td>小于等于</td>
</tr>
<tr>
<td>-gt</td>
<td>大于</td>
</tr>
<tr>
<td>-ge</td>
<td>大于等于</td>
</tr>
</tbody>
</table>
<p><code v-pre>demo.sh</code></p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token builtin class-name">read</span> -p <span class="token string">"请输入一个整数:"</span> num
<span class="token keyword">if</span> <span class="token punctuation">[</span> -z <span class="token variable">$num</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">"输入不存在!"</span>
    <span class="token builtin class-name">exit</span> <span class="token number">1</span>
<span class="token keyword">fi</span>
<span class="token assign-left variable">nu</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">echo</span> $num <span class="token operator">|</span> <span class="token function">tr</span> -d <span class="token string">'[0-9]'</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token string">'s/^-//'</span><span class="token variable">)</span></span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> -z <span class="token variable">$nu</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">"您输入的是整数，检测通过"</span>
<span class="token keyword">else</span>
    <span class="token builtin class-name">echo</span> <span class="token string">"请您输入合法的整数"</span>
<span class="token keyword">fi</span>
</code></pre></div><p><strong>字符串比较</strong></p>
<table>
<thead>
<tr>
<th>代码</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>-n</td>
<td>检测字符串是否不为空</td>
</tr>
<tr>
<td>-z</td>
<td>检测字符串是否为空</td>
</tr>
<tr>
<td>==</td>
<td>测试两个字符串是否相等</td>
</tr>
<tr>
<td>!=</td>
<td>测试两个字符串是否不相等</td>
</tr>
<tr>
<td>=~</td>
<td>测试字符串（前者）是否包含另外一个字符串（后者）</td>
</tr>
</tbody>
</table>
<p><code v-pre>demo.sh</code></p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token string">"abc"</span> <span class="token operator">=~</span> <span class="token string">"ab"</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> ok
<span class="token keyword">else</span>
    <span class="token builtin class-name">echo</span> faile
<span class="token keyword">fi</span>
</code></pre></div><p><strong>文件操作符</strong></p>
<table>
<thead>
<tr>
<th>代码</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>-d</td>
<td>测试是否是目录</td>
</tr>
<tr>
<td>-e</td>
<td>测试文件或者目录是否存在</td>
</tr>
<tr>
<td>-f</td>
<td>测试是否是一般文件</td>
</tr>
<tr>
<td>-r</td>
<td>测试文件是否是可读</td>
</tr>
<tr>
<td>-w</td>
<td>测试文件是否可写</td>
</tr>
<tr>
<td>-x</td>
<td>测试文件是否可执行</td>
</tr>
<tr>
<td>-s</td>
<td>测试文件大小是否不为空</td>
</tr>
<tr>
<td>-L</td>
<td>测试文件是否是链接文件</td>
</tr>
</tbody>
</table>
<p><strong>逻辑运算符</strong></p>
<table>
<thead>
<tr>
<th>代码</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>!</td>
<td>非，取反</td>
</tr>
<tr>
<td>-a</td>
<td>与，同时为真则为真</td>
</tr>
<tr>
<td>-o</td>
<td>或，有一个为真则为真</td>
</tr>
</tbody>
</table>
<p>下面的两个脚本效果是一样的，注意第一个脚本不能用[[ ]]</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token number">1</span> -lt <span class="token number">2</span> -a <span class="token number">2</span> -lt <span class="token number">3</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
        <span class="token builtin class-name">echo</span> ok
<span class="token keyword">else</span>
        <span class="token builtin class-name">echo</span> no
<span class="token keyword">fi</span>
 
 
<span class="token comment">#!/bin/bash</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token number">1</span> -lt <span class="token number">2</span> <span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token number">2</span> -lt <span class="token number">3</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
        <span class="token builtin class-name">echo</span> ok
<span class="token keyword">else</span>
        <span class="token builtin class-name">echo</span> no
<span class="token keyword">fi</span>
</code></pre></div><h4 id="if语句" tabindex="-1"><a class="header-anchor" href="#if语句" aria-hidden="true">#</a> if语句</h4>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token keyword">if</span> 表达式<span class="token punctuation">;</span><span class="token keyword">then</span>
    表达式
<span class="token keyword">elif</span> 表达式<span class="token punctuation">;</span><span class="token keyword">then</span>
    表达式
<span class="token keyword">else</span>
    表达式
<span class="token keyword">fi</span>
<span class="token comment">#elif和else都不是必须的</span>
</code></pre></div><h4 id="while语句" tabindex="-1"><a class="header-anchor" href="#while语句" aria-hidden="true">#</a> while语句</h4>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token keyword">while</span> 表达式<span class="token punctuation">;</span><span class="token keyword">do</span>
    表达式
<span class="token keyword">done</span>
</code></pre></div><h4 id="for语句" tabindex="-1"><a class="header-anchor" href="#for语句" aria-hidden="true">#</a> for语句</h4>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>结构一：
<span class="token keyword">for</span><span class="token variable"><span class="token punctuation">((</span>表达式<span class="token punctuation">;</span>表达式<span class="token punctuation">;</span>表达式<span class="token punctuation">;</span><span class="token punctuation">))</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span>
    表达式
<span class="token keyword">done</span>
比如
<span class="token keyword">for</span><span class="token variable"><span class="token punctuation">((</span>i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>i<span class="token operator">&lt;=</span><span class="token number">100</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">))</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token builtin class-name">echo</span> <span class="token variable">$i</span>
<span class="token keyword">done</span>
 
结构二：
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> 表达式<span class="token punctuation">;</span> <span class="token keyword">do</span>
    表达式
<span class="token keyword">done</span>
比如
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">`</span><span class="token function">seq</span> <span class="token number">100</span><span class="token variable">`</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token builtin class-name">echo</span> <span class="token variable">$i</span>
<span class="token keyword">done</span>
 
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">..</span><span class="token number">100</span><span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token builtin class-name">echo</span> <span class="token variable">$i</span>
<span class="token keyword">done</span>
<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">..</span><span class="token number">100</span><span class="token punctuation">}</span>表示起始为1，结束位100，步长默认为1，可以指定<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">..</span><span class="token number">100</span><span class="token punctuation">..</span><span class="token number">2</span><span class="token punctuation">}</span>,比如
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># for i in {a..z..2}; do echo $i;done</span>
</code></pre></div><p>一个简单的进度条</p>
<p><code v-pre>demo.sh</code></p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>
<span class="token assign-left variable">b</span><span class="token operator">=</span><span class="token string">''</span>
<span class="token keyword">for</span> <span class="token variable"><span class="token punctuation">((</span>i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>$i<span class="token operator">&lt;=</span><span class="token number">100</span><span class="token punctuation">;</span>i<span class="token operator">+=</span><span class="token number">2</span><span class="token punctuation">))</span></span>
<span class="token keyword">do</span>
    <span class="token builtin class-name">printf</span> <span class="token string">"progress:[%-50s]%d%%<span class="token entity" title="\r">\r</span>"</span> <span class="token variable">$b</span> <span class="token variable">$i</span>
    <span class="token function">sleep</span> <span class="token number">0.1</span>
 
    <span class="token assign-left variable">b</span><span class="token operator">=</span><span class="token comment">#$b</span>
<span class="token keyword">done</span>
<span class="token builtin class-name">echo</span>
</code></pre></div><h4 id="case语句" tabindex="-1"><a class="header-anchor" href="#case语句" aria-hidden="true">#</a> case语句</h4>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token builtin class-name">echo</span> -n <span class="token string">'请输入一个数字:'</span>
<span class="token builtin class-name">read</span> number
 
<span class="token keyword">case</span> <span class="token variable">$number</span> <span class="token keyword">in</span>
 
<span class="token punctuation">(</span><span class="token number">1</span><span class="token operator">|</span><span class="token number">2</span><span class="token operator">|</span><span class="token number">3</span><span class="token punctuation">)</span>
        <span class="token builtin class-name">echo</span> <span class="token string">'1-3'</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span><span class="token number">4</span><span class="token operator">|</span><span class="token number">5</span><span class="token operator">|</span><span class="token number">6</span><span class="token punctuation">)</span>
        <span class="token builtin class-name">echo</span>  <span class="token string">'4-6'</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span><span class="token number">7</span><span class="token operator">|</span><span class="token number">8</span><span class="token operator">|</span><span class="token number">9</span><span class="token punctuation">)</span>
        <span class="token builtin class-name">echo</span> <span class="token string">'7-9'</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
*<span class="token punctuation">)</span>
        <span class="token builtin class-name">echo</span> <span class="token string">'输入的不是数字!'</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token keyword">esac</span>
</code></pre></div><h4 id="continue和break" tabindex="-1"><a class="header-anchor" href="#continue和break" aria-hidden="true">#</a> continue和break</h4>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># continue 跳过本次循环，继续下一次循环</span>

<span class="token comment">#!/bin/bash</span>
<span class="token keyword">for</span> <span class="token variable"><span class="token punctuation">((</span>i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>i<span class="token operator">&lt;=</span><span class="token number">100</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">))</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$i</span> -eq <span class="token number">50</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
        <span class="token builtin class-name">continue</span>
    <span class="token keyword">fi</span>
    <span class="token assign-left variable">sum</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$((</span>sum<span class="token operator">+</span>i<span class="token variable">))</span></span>
<span class="token keyword">done</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$sum</span>
 
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># bash test.sh</span>
<span class="token number">5000</span>

<span class="token comment"># break 直接退出整个循环</span>
<span class="token comment">#!/bin/bash</span>
<span class="token keyword">for</span> <span class="token variable"><span class="token punctuation">((</span>i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>i<span class="token operator">&lt;=</span><span class="token number">1150</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">))</span></span>； <span class="token keyword">do</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$i</span> -eq <span class="token number">101</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
        <span class="token builtin class-name">break</span>
    <span class="token keyword">fi</span>
    <span class="token assign-left variable">sum</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$((</span>sum<span class="token operator">+</span>i<span class="token variable">))</span></span>
<span class="token keyword">done</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$sum</span>
 
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># bash test.sh</span>
<span class="token number">5050</span>
</code></pre></div><h4 id="eval将字符串作为语句执行" tabindex="-1"><a class="header-anchor" href="#eval将字符串作为语句执行" aria-hidden="true">#</a> eval将字符串作为语句执行</h4>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 经典的获取最后一个参数命令</span>
<span class="token comment">#!/bin/bash</span>
<span class="token builtin class-name">echo</span> <span class="token string">"最后一个参数是:"</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">eval</span> <span class="token builtin class-name">echo</span> <span class="token string">"\<span class="token variable">$$</span>#"</span><span class="token variable">)</span></span>

<span class="token comment"># 其他举例</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># seq 10 >1.txt</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># name="cat 1.txt"</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># eval $name</span>
<span class="token number">1</span>
<span class="token number">2</span>
<span class="token number">3</span>
<span class="token number">4</span>
<span class="token number">5</span>
<span class="token number">6</span>
<span class="token number">7</span>
<span class="token number">8</span>
<span class="token number">9</span>
<span class="token number">10</span>
</code></pre></div><h4 id="exec执行命令后退出当前终端" tabindex="-1"><a class="header-anchor" href="#exec执行命令后退出当前终端" aria-hidden="true">#</a> exec执行命令后退出当前终端</h4>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 检测网络</span>
<span class="token function">ping</span> -i <span class="token number">0.1</span>  -c <span class="token number">10</span> www.baidu.com <span class="token operator">&amp;></span>/dev/null <span class="token operator">||</span> <span class="token builtin class-name">exec</span>  <span class="token builtin class-name">echo</span> <span class="token string">"Network is unreachable"</span>

<span class="token comment"># 检测用户</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable"><span class="token variable">`</span><span class="token function">id</span> -u<span class="token variable">`</span></span> -ne <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span> <span class="token builtin class-name">exec</span> <span class="token builtin class-name">echo</span> <span class="token string">"Must be root can run it"</span><span class="token punctuation">;</span> <span class="token keyword">fi</span>
</code></pre></div><h4 id="getopts命令行参数处理" tabindex="-1"><a class="header-anchor" href="#getopts命令行参数处理" aria-hidden="true">#</a> getopts命令行参数处理</h4>
<blockquote>
<p>注：只支持短选项</p>
</blockquote>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment">#取得每个选项的值</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$#</span> -lt <span class="token number">1</span> <span class="token punctuation">]</span>
<span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">"there is no option"</span><span class="token punctuation">;</span>
<span class="token keyword">else</span>
    <span class="token keyword">while</span> <span class="token builtin class-name">getopts</span> <span class="token string">":a:i:s:v:x:"</span> opt<span class="token punctuation">;</span>
    <span class="token keyword">do</span>
        <span class="token keyword">case</span> <span class="token variable">$opt</span>  <span class="token keyword">in</span>
        a<span class="token punctuation">)</span>echo <span class="token string">"option is a ,the value is <span class="token variable">$OPTARG</span>"</span> <span class="token punctuation">;</span><span class="token punctuation">;</span>
 
        i<span class="token punctuation">)</span>echo <span class="token string">"option is i ,the value is <span class="token variable">$OPTARG</span>"</span> <span class="token punctuation">;</span><span class="token punctuation">;</span>
 
        s<span class="token punctuation">)</span>echo <span class="token string">"option is s,the value is <span class="token variable">$OPTARG</span>"</span> <span class="token punctuation">;</span><span class="token punctuation">;</span>
 
    <span class="token function">v</span><span class="token punctuation">)</span>echo <span class="token string">"option is v ,the value is <span class="token variable">$OPTARG</span>"</span> <span class="token punctuation">;</span><span class="token punctuation">;</span>
 
    x<span class="token punctuation">)</span>echo <span class="token string">"option is x ,the value is <span class="token variable">$OPTARG</span>"</span> <span class="token punctuation">;</span><span class="token punctuation">;</span>
 
        <span class="token keyword">esac</span>
     <span class="token keyword">done</span>
<span class="token keyword">fi</span>
 
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># bash test.sh -a A -i I -s S -x X -v V</span>
option is a ,the value is A
option is i ,the value is I
option is s,the value is S
option is x ,the value is X
option is <span class="token function">v</span> ,the value is V
</code></pre></div></div></template>
