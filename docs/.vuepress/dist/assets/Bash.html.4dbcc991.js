import{_ as n,o as s,c as a,b as t}from"./app.8347a01d.js";const o={},p=t(`<h2 id="bash" tabindex="-1"><a class="header-anchor" href="#bash" aria-hidden="true">#</a> Bash</h2><h3 id="shell\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#shell\u7C7B\u578B" aria-hidden="true">#</a> Shell\u7C7B\u578B</h3><p>Shell\u662F\u4E00\u4E2A\u5E94\u7528\u7A0B\u5E8F\uFF0C\u5B83\u662F\u4F5C\u7CFB\u7EDF\u4E0E\u5916\u90E8\u4EA4\u4E92\u6700\u4E3B\u8981\u7684\u63A5\u53E3\u5F0F\u3002</p><p>Shell\u7684\u5B9E\u73B0\u6709\u5F88\u591A\u65B9\u5F0F\uFF0C\u8FD9\u91CC\u6211\u4EEC\u4E3B\u8981\u8BF4Bash\uFF0C\u64CD\u4F5C\u7CFB\u7EDF\u4F7F\u7528\u7684\u662FCentOS7</p><ul><li><p>\u67E5\u770B\u7CFB\u7EDF\u4E2D\u5DF2\u6709\u5F97Shell\u7C7B\u578B</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u65B9\u6CD51</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/shells </span>
/bin/sh
/bin/bash
/sbin/nologin
/usr/bin/sh
/usr/bin/bash
/usr/sbin/nologin
/bin/zsh

<span class="token comment"># \u65B9\u6CD52</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># chsh -l</span>
/bin/sh
/bin/bash
/sbin/nologin
/usr/bin/sh
/usr/bin/bash
/usr/sbin/nologin
/bin/zsh
</code></pre></div></li><li><p>\u67E5\u770B\u5F53\u5F53\u524D\u7528\u6237\u6240\u4F7F\u7528\u7684\u9ED8\u8BA4Shell\u7C7B\u578B</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo $SHELL</span>
/bin/bash

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># bash --version</span>
<span class="token function">bash</span> --version
GNU bash, version <span class="token number">4.2</span>.46<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>-release <span class="token punctuation">(</span>x86_64-redhat-linux-gnu<span class="token punctuation">)</span>
Copyright <span class="token punctuation">(</span>C<span class="token punctuation">)</span> <span class="token number">2011</span> Free Software Foundation, Inc.
License GPLv3+: GNU GPL version <span class="token number">3</span> or later <span class="token operator">&lt;</span>http://gnu.org/licenses/gpl.html<span class="token operator">&gt;</span>

This is <span class="token function">free</span> software<span class="token punctuation">;</span> you are <span class="token function">free</span> to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
</code></pre></div><blockquote><p>\u6709\u65F6\u5019\u4F1A\u4F7F\u7528sh\u547D\u4EE4\uFF0C\u8FD9\u901A\u5E38\u662FBash\u7684\u8F6F\u8FDE\u63A5</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls -l \`which sh\`</span>
lrwxrwxrwx. <span class="token number">1</span> root root <span class="token number">4</span> May <span class="token number">21</span>  <span class="token number">2021</span> /usr/bin/sh -<span class="token operator">&gt;</span> <span class="token function">bash</span>
</code></pre></div></blockquote></li><li><p>\u4FEE\u6539\u5F53\u524D\u7528\u6237\u6240\u4F7F\u7528\u7684\u9ED8\u8BA4Shell\u4E3Azsh</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u4FEE\u6539\u5F53\u524D\u7528\u6237\u6240\u4F7F\u7528\u7684\u9ED8\u8BA4Shell</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># chsh -s /bin/zsh</span>
Changing shell <span class="token keyword">for</span> root.
Shell changed.

<span class="token comment"># \u9000\u51FA\u5F53\u524D\u7EC8\u7AEF\uFF0C\u91CD\u65B0\u8FDE\u63A5</span>

<span class="token comment"># \u518D\u6B21\u67E5\u770B\u5F53\u524D\u6240\u4F7F\u7528\u7684Shell</span>
<span class="token punctuation">[</span>root@localhost<span class="token punctuation">]</span>~<span class="token comment"># echo $SHELL</span>
/bin/zsh
</code></pre></div><blockquote><p>\u539F\u7406\u5176\u5B9E\u5C31\u662F\u4FEE\u6539\u4E86/etc/passwd\u6587\u4EF6</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost<span class="token punctuation">]</span>~<span class="token comment"># cat /etc/passwd | grep -E &quot;^root&quot;</span>
root:x:0:0:root:/root:/bin/zsh
</code></pre></div></blockquote></li></ul><h3 id="\u83B7\u53D6bash\u5E2E\u52A9\u6587\u6863" tabindex="-1"><a class="header-anchor" href="#\u83B7\u53D6bash\u5E2E\u52A9\u6587\u6863" aria-hidden="true">#</a> \u83B7\u53D6Bash\u5E2E\u52A9\u6587\u6863</h3><p>\u53EF\u4EE5\u901A\u8FC7<code>man bash</code>\u6765\u67E5\u8BE2\u8BE6\u7EC6\u6587\u6863\uFF0C\u672C\u6587\u6863\u4E2D\u5927\u90E8\u5206\u4FE1\u606F\u90FD\u53EF\u4EE5\u901A\u8FC7\u8FD9\u79CD\u65B9\u5F0F\u83B7\u53D6\u5230</p><h3 id="\u53D8\u91CF" tabindex="-1"><a class="header-anchor" href="#\u53D8\u91CF" aria-hidden="true">#</a> \u53D8\u91CF</h3><h4 id="\u73AF\u5883\u53D8\u91CF" tabindex="-1"><a class="header-anchor" href="#\u73AF\u5883\u53D8\u91CF" aria-hidden="true">#</a> \u73AF\u5883\u53D8\u91CF</h4><p>\u73AF\u5883\u53D8\u91CF\uFF0C\u6216\u8005\u79F0\u4E3A\u5168\u5C40\u53D8\u91CF\uFF0C\u5728\u767B\u9646\u7CFB\u7EDF\u7684\u65F6\u5019\u5C31\u5DF2\u7ECF\u6709\u4E86\u76F8\u5E94\u7684\u7CFB\u7EDF\u5B9A\u4E49\u7684\u73AF\u5883\u53D8\u91CF\u4E86\uFF0C</p><p>\u73AF\u5883\u53D8\u91CF\u5177\u6709\u7EE7\u627F\u6027\uFF0C\u5373<code>\u5B50Shell</code>\u4F1A\u7EE7\u627F<code>\u7236Shell</code>\u7684\u73AF\u5883\u53D8\u91CF\u3002</p><p>\u5217\u4E3E\u90E8\u5206\u73AF\u5883\u53D8\u91CF</p><table><thead><tr><th>\u53D8\u91CF\u540D</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td>Shell</td><td>\u5F53\u524D\u4F7F\u7528\u7684Shell</td></tr><tr><td>BASH_VERSION</td><td>Bash\u7248\u672C\u53F7</td></tr><tr><td>BASHPID</td><td>\u5F53\u524DBash\u8FDB\u7A0B\u7684PID(\u7B49\u540C\u4E8E$$)</td></tr><tr><td>PPID</td><td>\u5F53\u524DBash\u8FDB\u7A0B\u7684\u7236\u8FDB\u7A0BPID</td></tr><tr><td>SHLVL</td><td>Bash\u5D4C\u5957\u5C42\u6570</td></tr><tr><td>PATH</td><td>\u6267\u884C\u7CFB\u7EDF\u547D\u4EE4\u6240\u641C\u5BFB\u7684\u8DEF\u5F84\u96C6\u5408\uFF0C\u8DEF\u5F84\u4E4B\u95F4\u7528\u5206\u53F7\u9694\u5F00</td></tr><tr><td>USER</td><td>\u5F53\u524D\u7528\u6237\u540D</td></tr><tr><td>HOME</td><td>\u5F53\u524D\u7528\u6237\u7684\u5BB6\u76EE\u5F55</td></tr><tr><td>LANG</td><td>\u5F53\u524D\u7528\u6237\u6240\u4F7F\u7528\u7684\u8BED\u8A00</td></tr><tr><td>HOSTNAME</td><td>\u4E3B\u673A\u540D</td></tr><tr><td>RANDOM</td><td>\u4EA7\u751F\u4E00\u4E2A\u8303\u56F4\u57280-32767\u7684\u968F\u673A\u6570</td></tr></tbody></table><p>\u4F7F\u7528<code>env</code>\u547D\u4EE4\u53EF\u4EE5\u67E5\u770B\u7EC8\u7AEF\u6240\u6709\u7684\u73AF\u5883\u53D8\u91CF</p><p>\u4F7F\u7528<code>locale</code>\u547D\u4EE4\u53EF\u4EE5\u8F93\u51FA\u8BED\u8A00\u76F8\u5173\u7684\u8BE6\u7EC6\u53D8\u91CF</p><p>\u4F7F\u7528<code>cat /proc/$PID/environ</code>\u53EF\u4EE5\u67E5\u770B\u67D0\u4E2A\u8FDB\u7A0B\u7684\u73AF\u5883\u53D8\u91CF\uFF0C\u793A\u4F8B\u5982\u4E0B\uFF1A</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ps aux|grep sshd</span>
root        <span class="token number">986</span>  <span class="token number">0.0</span>  <span class="token number">0.2</span> <span class="token number">105996</span>  <span class="token number">4112</span> ?        Ss   05:30   <span class="token number">0</span>:00 /usr/sbin/sshd -D
root       <span class="token number">1542</span>  <span class="token number">0.0</span>  <span class="token number">0.2</span> <span class="token number">148316</span>  <span class="token number">5400</span> ?        Ss   05:49   <span class="token number">0</span>:00 sshd: root@pts/0
root       <span class="token number">1692</span>  <span class="token number">0.0</span>  <span class="token number">0.0</span> <span class="token number">112660</span>   <span class="token number">972</span> pts/0    R+   06:02   <span class="token number">0</span>:00 <span class="token function">grep</span> --color<span class="token operator">=</span>auto sshd

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat /proc/986/environ | tr &#39;\\0&#39; &#39;\\n&#39;</span>
<span class="token assign-left variable"><span class="token environment constant">LANG</span></span><span class="token operator">=</span>en_US.UTF-8
<span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span>/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin
<span class="token assign-left variable">NOTIFY_SOCKET</span><span class="token operator">=</span>/run/systemd/notify
<span class="token assign-left variable">SSH_USE_STRONG_RNG</span><span class="token operator">=</span><span class="token number">0</span>
</code></pre></div><p>\u4F7F\u7528<code>export k=v</code>\u53EF\u4EE5\u8BBE\u7F6E\u73AF\u5883\u53D8\u91CF\uFF0C\u4E5F\u53EF\u4EE5\u5355\u72EC\u4F7F\u7528<code>export</code>\u663E\u793A\u73AF\u5883\u53D8\u91CF</p><h4 id="\u672C\u5730\u53D8\u91CF" tabindex="-1"><a class="header-anchor" href="#\u672C\u5730\u53D8\u91CF" aria-hidden="true">#</a> \u672C\u5730\u53D8\u91CF</h4><p>\u672C\u5730\u53D8\u91CF\uFF0C\u5F53\u524Dshell \u4E2D\u7684\u53D8\u91CF\uFF0C\u5F88\u663E\u7136\u672C\u5730\u53D8\u91CF\u4E2D\u5305\u542B\u73AF\u5883\u53D8\u91CF\uFF0C\u672C\u5730\u53D8\u91CF\u7684\u975E\u73AF\u5883\u53D8\u91CF\u4E0D\u5177\u5907\u7EE7\u627F\u6027\uFF0C\u53EA\u5728\u5F53\u524DShell\u751F\u6548\u3002</p><p>\u4F7F\u7528<code>set</code>\u547D\u4EE4\u663E\u793A\u672C\u5730\u53D8\u91CF\uFF0C\u4F7F\u7528<code>unset</code>\u53EF\u4EE5\u5220\u9664\u672C\u5730\u53D8\u91CF</p><h4 id="\u53D8\u91CF\u7EE7\u627F\u6027\u5DEE\u5F02" tabindex="-1"><a class="header-anchor" href="#\u53D8\u91CF\u7EE7\u627F\u6027\u5DEE\u5F02" aria-hidden="true">#</a> \u53D8\u91CF\u7EE7\u627F\u6027\u5DEE\u5F02</h4><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo -e &quot;\u5F53\u524DShell PID\u4E3A: $$ \\n\u5F53\u524DShell\u5C42\u7EA7\u4E3A: $SHLVL&quot;       # \u67E5\u770B\u5F53\u524DBash\u4FE1\u606F</span>
\u5F53\u524DShell PID\u4E3A: <span class="token number">1951</span>
\u5F53\u524DShell\u5C42\u7EA7\u4E3A: <span class="token number">1</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># a=1        # \u8BBE\u7F6E\u672C\u5730\u53D8\u91CF\uFF0C\u4E0D\u5177\u6709\u7EE7\u627F\u6027</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># export b=2 # \u8BBE\u7F6E\u73AF\u5883\u53D8\u91CF\uFF0C\u5177\u6709\u7EE7\u627F\u6027</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># bash       # \u5F00\u542F\u4E00\u4E2A\u5B50\u8FDB\u7A0B</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo -e &quot;\u5F53\u524DShell PID\u4E3A: $$ \\n\u5F53\u524DShell\u5C42\u7EA7\u4E3A: $SHLVL&quot;       # \u518D\u6B21\u67E5\u770B\u5F53\u524DBash\u4FE1\u606F</span>
\u5F53\u524DShell PID\u4E3A: <span class="token number">2080</span>
\u5F53\u524DShell\u5C42\u7EA7\u4E3A: <span class="token number">2</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo $a    # \u67E5\u770B\u672C\u5730\u53D8\u91CF</span>

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo $b    # \u67E5\u770B\u73AF\u5883\u53D8\u91CF</span>
<span class="token number">2</span>

<span class="token comment"># \u67E5\u770B\u8FDB\u7A0B\u6811</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># pstree -p | grep bash</span>
           <span class="token operator">|</span>-sshd<span class="token punctuation">(</span><span class="token number">986</span><span class="token punctuation">)</span>---sshd<span class="token punctuation">(</span><span class="token number">1542</span><span class="token punctuation">)</span>---bash<span class="token punctuation">(</span><span class="token number">1951</span><span class="token punctuation">)</span>---bash<span class="token punctuation">(</span><span class="token number">2080</span><span class="token punctuation">)</span>-+-grep<span class="token punctuation">(</span><span class="token number">2124</span><span class="token punctuation">)</span>
</code></pre></div><blockquote><p>pstree\u547D\u4EE4\u5B89\u88C5\uFF1Ayum -y install psmisc</p></blockquote><h4 id="\u5185\u90E8\u57DF\u5206\u9694\u7B26ifs" tabindex="-1"><a class="header-anchor" href="#\u5185\u90E8\u57DF\u5206\u9694\u7B26ifs" aria-hidden="true">#</a> \u5185\u90E8\u57DF\u5206\u9694\u7B26IFS</h4><p>BASH \u811A\u672C\u4E2D\u6709\u4E2A\u53D8\u91CF\u53EBIFS(Internal Field Seprator) \uFF0C\u5185\u90E8\u57DF\u5206\u9694\u7B26</p><ul><li>IFS\u662F\u4E00\u79CDset\u53D8\u91CF\uFF0C\u5F53BASH\u5904\u7406&quot;\u547D\u4EE4\u66FF\u6362&quot;\u548C&quot;\u53C2\u6570\u66FF\u6362&quot;\u65F6,BASH\u6839\u636EIFS\u7684\u503C\u6765\u62C6\u89E3\u8BFB\u5165\u7684\u53D8\u91CF\uFF0C\u7136\u540E\u5BF9\u7279\u6B8A\u5B57\u7B26\u8FDB\u884C\u5904\u7406\uFF0C\u6700\u540E\u91CD\u65B0\u7EC4\u5408\u8D4B\u503C\u7ED9\u8BE5\u53D8\u91CF</li><li>IFS\u7684\u9ED8\u8BA4\u503C\u4E3A\uFF1A\u7A7A\u767D\uFF08\u5305\u62EC\uFF1A\u7A7A\u683C\uFF0Ctab, \u548C\u65B0\u884C)\uFF0C\u5C06\u5176ASSII\u7801\u7528\u5341\u516D\u8FDB\u5236\u6253\u5370\u51FA\u6765\u5C31\u662F\uFF1A20 09 0a</li><li>IFS\u5BF9\u7A7A\u683C\u7684\u7A7A\u767D\u7684\u5904\u7406\u548C\u5176\u4ED6\u5B57\u7B26\u4E0D\u4E00\u6837\uFF0C\u5DE6\u53F3\u4E24\u534A\u7684\u7EAF\u7A7A\u767D\u4F1A\u88AB\u5FFD\u7565\uFF0C\u591A\u4E2A\u8FDE\u7EED\u7684\u7A7A\u767D\u88AB\u5F53\u6210\u4E00\u4E2AIFS\u5904\u7406</li></ul><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u76F4\u63A5\u67E5\u770BIFS\u53D8\u91CF\u4E3A\u7A7A</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo $IFS</span>

<span class="token comment"># \u4F46\u5B9E\u9645\u4E0A\u5B83\u5E94\u8BE5\u662F\u957F\u8FD9\u6837\u7684</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># IFS=$&#39; \\t\\n&#39;</span>

<span class="token comment"># \u4E0B\u9762\u4E3E\u4E2A\u7B80\u5355\u7684\u4F8B\u5B50\u8BF4\u660EIFS\u53D8\u91CF\u7684\u4F5C\u7528</span>
<span class="token comment"># (1) \u5148\u4FDD\u5B58\u4E00\u4E0B\u65E7\u7684IFS\u53D8\u91CF</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># oldifs=$IFS</span>
<span class="token comment"># (2)\u8BBE\u7F6E\u4E00\u4E2A\u53D8\u91CFmsg\uFF0C\u6CE8\u610F\u503C\u4E2D\u4E24\u4E2A\u5355\u8BCD\u4F7F\u7528:\u5206\u9694\u5F00</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># msg=hello:world </span>
<span class="token comment"># (3)\u8BBE\u7F6E\u65B0\u7684IFS\u53D8\u91CF</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># IFS=&#39;:&#39; </span>
<span class="token comment"># (4)\u67E5\u770B\u53D8\u91CFmsg\u7684\u503C</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo $msg</span>
hello world
<span class="token comment"># (5)\u6062\u590D\u539F\u5148\u7684IFS\u53D8\u91CF</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># IFS=$oldifs</span>
<span class="token comment"># (6)\u518D\u6B21\u67E5\u770Bmsg\u7684\u503C</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo $msg</span>
hello:world
</code></pre></div><h4 id="\u53D8\u91CF\u5F15\u7528" tabindex="-1"><a class="header-anchor" href="#\u53D8\u91CF\u5F15\u7528" aria-hidden="true">#</a> \u53D8\u91CF\u5F15\u7528</h4><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u65B9\u6CD5\u4E00\uFF1A $\u53D8\u91CF</span>
<span class="token comment"># \u65B9\u6CD5\u4E8C\uFF1A \${\u53D8\u91CF\u540D}\uFF0C\u63A8\u8350\u603B\u662F\u4F7F\u7528\u8FD9\u79CD\uFF0C\u4E3E\u4E2A\u4F8B\u5B50</span>

<span class="token comment">#!/bin/bash</span>
<span class="token assign-left variable">year</span><span class="token operator">=</span><span class="token number">23</span>
<span class="token builtin class-name">echo</span> i am <span class="token variable">\${year}</span>years old.  <span class="token comment"># \u5982\u679C\u4E0D\u52A0{}\uFF0C\u5B83\u4F1A\u628A$yearyears\u5F53\u505A\u4E00\u4E2A\u6574\u4F53</span>
</code></pre></div><h4 id="\u53D8\u91CF\u9ED8\u8BA4\u503C" tabindex="-1"><a class="header-anchor" href="#\u53D8\u91CF\u9ED8\u8BA4\u503C" aria-hidden="true">#</a> \u53D8\u91CF\u9ED8\u8BA4\u503C</h4><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u65B9\u5F0F\u4E00\uFF1A\${var:-100}   \u5982\u679C$var\u6CA1\u6709\u503C\uFF0C\u5219\u628A100\u8D4B\u503C\u7ED9var,\u5982\u679C\u6709\u503C\uFF0C\u5219\u4E0D\u505A\u64CD\u4F5C</span>
<span class="token comment"># \u65B9\u5F0F\u4E8C\uFF1A\${var:=100}	\u5982\u679C$var\u6CA1\u6709\u503C\uFF0C\u5219\u628A100\u8D4B\u503C\u7ED9var\uFF0C\u5982\u679C\u6709\u503C\uFF0C\u5219\u4E0D\u505A\u64CD\u4F5C</span>

<span class="token comment"># \u8FD9\u4E24\u79CD\u65B9\u5F0F\u7684\u533A\u522B\u662F\uFF0C:-\u662F\u4E34\u65F6\u8D4B\u503C\uFF0C=\u5BF9var\u771F\u6B63\u7684\u8D4B\u503C\uFF0C\u4E3E\u4E2A\u4F8B\u5B50</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo \${var:-100}</span>
<span class="token number">100</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo $var</span>

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo \${var:=100}</span>
<span class="token number">100</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo $var</span>
<span class="token number">100</span>
</code></pre></div><h4 id="\u4F4D\u7F6E\u53C2\u6570\u53D8\u91CF" tabindex="-1"><a class="header-anchor" href="#\u4F4D\u7F6E\u53C2\u6570\u53D8\u91CF" aria-hidden="true">#</a> \u4F4D\u7F6E\u53C2\u6570\u53D8\u91CF</h4><table><thead><tr><th>\u53D8\u91CF</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td>$0</td><td>\u811A\u672C\u7684\u540D\u5B57</td></tr><tr><td>$n</td><td>\u5BF9\u4E8E\u811A\u672C\u6216\u8005\u51FD\u6570\u6765\u8BF4\uFF0C<br>\u4F20\u5165\u7684\u7B2Cn\u4E2A\u53C2\u6570(n\u4E3A\u5927\u4E8E\u7B49\u4E8E1\u7684\u6570\u5B57\uFF0C\u5982\u679C\u5927\u4E8E\u7B49\u4E8E10\uFF0C\u5219\u5199\u6210\${n})</td></tr><tr><td>$#</td><td>\u53C2\u6570\u6570\u91CF</td></tr><tr><td>$$</td><td>\u811A\u672C\u8FD0\u884C\u8FDB\u7A0B\u53F7</td></tr><tr><td>$?</td><td>\u547D\u4EE4\u9000\u51FA\u7801</td></tr><tr><td>$!</td><td>\u6700\u540E\u4E00\u4E2A\u653E\u5728\u540E\u53F0\u7684\u8FDB\u7A0B\u53F7</td></tr><tr><td>$*/$@</td><td>\u4F20\u5165\u7684\u6240\u6709\u53C2\u6570</td></tr></tbody></table><p>$*\u548C$@\u7684\u533A\u522B\uFF0C$@\u53EF\u4EE5\u4F5C\u4E3A\u6570\u7EC4\u7528\uFF1A</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># demo.sh</span>
<span class="token comment">#!/bin/bash</span>
<span class="token assign-left variable">var</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span>
<span class="token keyword">do</span>
    array<span class="token punctuation">[</span><span class="token variable">$var</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token variable">$i</span>  <span class="token comment"># \u6570\u7EC4\u8D4B\u503C</span>
    <span class="token builtin class-name">let</span> var++       <span class="token comment"># \u7D22\u5F15+1</span>
<span class="token keyword">done</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${array<span class="token punctuation">[</span>2<span class="token punctuation">]</span>}</span>

<span class="token comment"># \u6D4B\u8BD5</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># bash demo.sh 10 9 8</span>
<span class="token number">9</span>
</code></pre></div><h4 id="\u53D8\u91CF\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#\u53D8\u91CF\u64CD\u4F5C" aria-hidden="true">#</a> \u53D8\u91CF\u64CD\u4F5C</h4><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u5B9A\u4E49\u53D8\u91CF</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># var=123456 </span>

<span class="token comment"># \u53D6\u5F97\u53D8\u91CF\u503C\u957F\u5EA6</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo \${#var}</span>
<span class="token number">6</span>

<span class="token comment"># \u4ECE0\u5F00\u59CB\uFF0C\u622A\u53D6\u7B2C3\u4E2A\u5B57\u7B26\u53CA\u4EE5\u540E\u7684\u5B57\u7B26</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo \${var:3}</span>
<span class="token number">456</span>

<span class="token comment"># \u4ECE0\u5F00\u59CB\uFF0C\u622A\u53D6\u7B2C3\u4E2A\u5B57\u7B26\u53CA\u4EE5\u540E\u7684\u5B57\u7B26\uFF0C\u5E76\u63A7\u5236\u957F\u5EA6</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo \${var:3:2}</span>
<span class="token number">45</span>

<span class="token comment"># \u622A\u53D6\u540E4\u4F4D\uFF0C:\u540E\u9762\u6709\u7A7A\u683C</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo \${var: -4}</span>
<span class="token number">3456</span>
 
<span class="token comment"># \u5B9A\u4E49\u53D8\u91CF</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># var=123123</span>

<span class="token comment"># \u4ECE\u5DE6\u5230\u53F3\uFF0C\u53BB\u6389\u6700\u77ED\u5339\u914D</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo \${var#*3}</span>
<span class="token number">123</span>

<span class="token comment"># \u4ECE\u5DE6\u5230\u53F3\uFF0C\u53BB\u6389\u6700\u957F\u5339\u914D</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo \${var##*1}</span>
<span class="token number">23</span>
 
<span class="token comment"># \u4ECE\u53F3\u5230\u5DE6\uFF0C\u53BB\u6389\u6700\u77ED\u5339\u914D</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo \${var%2*}</span>
<span class="token number">1231</span>

<span class="token comment"># \u4ECE\u53F3\u5230\u5DE6\uFF0C\u53BB\u6389\u6700\u957F\u5339\u914D</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo \${var%%2*}</span>
<span class="token number">1</span>
 
<span class="token comment"># \u4ECE\u5DE6\u5230\u53F3\uFF0C\u66FF\u63621\u6B21</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo \${var/12/aa}</span>
aa3123

<span class="token comment"># \u53EA\u66FF\u6362\u7B2C\u4E8C\u6B21</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo $var | sed &#39;s/12/aa/2&#39;</span>
123aa3

<span class="token comment"># \u5168\u90E8\u66FF\u6362</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo \${var//12/aa}</span>
aa3aa3
 
<span class="token comment"># \u524D\u7F00\u66FF\u6362\uFF0C\u524D\u7F00\u5FC5\u987B\u662F\u6307\u5B9A\u7684\u5B57\u7B26\u4E32\u624D\u80FD\u5339\u914D\u7136\u540E\u66FF\u6362</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># abc=administrator    </span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo \${abc/#adm/ABCD}</span>
ABCDinistrator
 
<span class="token comment"># \u540E\u7F00\u66FF\u6362</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># abc=administrator  </span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo \${abc/%tor/Tor}</span>
administraTor
 
<span class="token comment"># \u5339\u914D\u53D8\u91CF \${!var*}\u548C\${!var@}</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># var1=100</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># var2=200</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># var3=300</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo \${!var*}</span>
var1 var2 var3
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo \${!var@}</span>
var1 var2 var3
 
<span class="token comment"># \u8BFB\u53D6\u4E00\u4E2A\u6587\u4EF6\u5185\u5BB9\u8D4B\u7ED9\u4E00\u4E2A\u53D8\u91CF\uFF0C\u5982\u679C\u5185\u5BB9\u662F\u591A\u884C\uFF0C\u5219echo\u7684\u65F6\u5019\u4F1A\u53BB\u6389\u6362\u884C\u7B26\uFF0C\u5982\u4E0B\u6240\u793A\uFF1A</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat test.txt</span>
AA
BB
CC
DD
EE
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># var=$(cat test.txt)</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo $var</span>
AA BB CC DD EE
 
<span class="token comment"># \u8FD9\u5728\u5F88\u591A\u65F6\u5019\u662F\u5F88\u4E0D\u65B9\u4FBF\u7684\uFF0C\u5982\u679C\u4FDD\u7559\u6362\u884C\u7B26\u7684\u8BDD\u4EC5\u4EC5\u5C06\u53D8\u91CF\u62EC\u8D77\u6765\u5C31\u53EF\u4EE5\u4E86\uFF1A</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo &quot;$var&quot;</span>
AA
BB
CC
DD
EE
 
<span class="token comment"># \u7136\u540E\u53EF\u4EE5\u5BF9\u6BCF\u4E00\u884C\u8FDB\u884C\u64CD\u4F5C\uFF1A</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo &quot;$var&quot; | while read line</span>
<span class="token operator">&gt;</span> <span class="token keyword">do</span>
<span class="token operator">&gt;</span> <span class="token builtin class-name">echo</span> <span class="token punctuation">[</span><span class="token variable">$line</span><span class="token punctuation">]</span>
<span class="token operator">&gt;</span> <span class="token keyword">done</span>
<span class="token punctuation">[</span>AA<span class="token punctuation">]</span>
<span class="token punctuation">[</span>BB<span class="token punctuation">]</span>
<span class="token punctuation">[</span>CC<span class="token punctuation">]</span>
<span class="token punctuation">[</span>DD<span class="token punctuation">]</span>
<span class="token punctuation">[</span>EE<span class="token punctuation">]</span>
</code></pre></div><h4 id="\u5DE7\u8BFB\u914D\u7F6E\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u5DE7\u8BFB\u914D\u7F6E\u6587\u4EF6" aria-hidden="true">#</a> \u5DE7\u8BFB\u914D\u7F6E\u6587\u4EF6</h4><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u914D\u7F6E\u6587\u4EF6</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat config.ini </span>
<span class="token comment">#\u6CE8\u610F\u4E0B\u9762\u7684\u914D\u7F6E=\u53F7\u4E24\u8FB9\u4E0D\u80FD\u6709\u7A7A\u683C</span>
<span class="token assign-left variable">HOST</span><span class="token operator">=</span><span class="token string">&#39;0.0.0.0&#39;</span>
<span class="token assign-left variable">PORT</span><span class="token operator">=</span><span class="token number">55555</span>

<span class="token comment"># Bash\u811A\u672C</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat demo.sh </span>
<span class="token comment">#!/bin/bash</span>
<span class="token builtin class-name">source</span> config.ini
<span class="token builtin class-name">echo</span> <span class="token string">&quot;The Host is <span class="token variable">\${HOST}</span>:<span class="token variable">\${PORT}</span>&quot;</span>

<span class="token comment"># \u6D4B\u8BD5</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># bash demo.sh</span>
The Host is <span class="token number">0.0</span>.0.0:55555
</code></pre></div><h4 id="\u53D8\u91CF\u5B89\u5168\u6027" tabindex="-1"><a class="header-anchor" href="#\u53D8\u91CF\u5B89\u5168\u6027" aria-hidden="true">#</a> \u53D8\u91CF\u5B89\u5168\u6027</h4><p><strong><code>set -u</code>\u53D8\u91CF\u4E0D\u5B58\u5728\u5219\u62A5\u9519\u9000\u51FA\u811A\u672C</strong></p><p>Bash\u9047\u5230\u4E0D\u5B58\u5728\u7684\u53D8\u91CF\uFF0C\u9ED8\u8BA4\u4F1A\u5FFD\u7565\uFF0C\u7136\u540E\u7EE7\u7EED\u5411\u4E0B\u6267\u884C\uFF0C\u8FD9\u6709\u65F6\u5019\u4F1A\u7ED9\u6211\u4EEC\u5E26\u6765\u707E\u96BE\u6027\u4E8B\u6545\uFF0C</p><p>\u6BD4\u5982\u8FD9\u6837\u4E00\u884C\u4EE3\u7801<code>rm -rf \${Dir}/*</code>\uFF0C\u5982\u679CDir\u53D8\u91CF\u4E0D\u5B58\u5728\uFF0C\u8FD9\u4F1A\u5C06\u6211\u4EEC\u7684\u7CFB\u7EDF/\u5220\u6389\uFF01</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat demo.sh </span>
<span class="token comment">#!/bin/bash</span>
<span class="token builtin class-name">set</span> -u
<span class="token builtin class-name">echo</span> <span class="token variable">\${Dir}</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;End&quot;</span>

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># bash demo.sh </span>
demo.sh: line <span class="token number">4</span>: Dir: unbound variable
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo $?</span>
<span class="token number">1</span>
<span class="token comment"># \u53EF\u4EE5\u770B\u5230\uFF0C\u811A\u672C\u62A5\u9519\u5E76\u9000\u51FA\u4E86\uFF0C\u540E\u9762\u7684\u4EE3\u7801\u4E5F\u4E0D\u4F1A\u6267\u884C</span>
</code></pre></div><p><strong><code>set -e</code>\u811A\u672C\u4E00\u65E6\u62A5\u9519\u4FBF\u9000\u51FA</strong></p><p>Bash\u5982\u679C\u9047\u5230\u62A5\u9519\uFF0C\u9ED8\u8BA4\u4F1A\u5FFD\u7565\uFF0C\u8FD8\u4F1A\u7EE7\u7EED\u5F80\u4E0B\u6267\u884C\uFF0C\u8FD9\u4E5F\u4E0D\u7B26\u5408\u6211\u4EEC\u7684\u9884\u671F</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u6F14\u793A\u9519\u8BEF\u60C5\u666F</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat demo.sh </span>
<span class="token comment">#!/bin/bash</span>
<span class="token builtin class-name">set</span> -u
a
<span class="token builtin class-name">echo</span> <span class="token string">&quot;End&quot;</span>

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># bash demo.sh</span>
demo.sh: line <span class="token number">3</span>: a: <span class="token builtin class-name">command</span> not found  <span class="token comment"># \u62A5\u9519\u4E86\uFF0C\u4F46\u662F\u8FD8\u4F1A\u7EE7\u7EED\u5411\u4E0B\u6267\u884C</span>
End

<span class="token comment"># \u6F14\u793A\u6B63\u786E\u60C5\u666F</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat demo.sh</span>
<span class="token comment">#!/bin/bash</span>
<span class="token builtin class-name">set</span> -u
<span class="token builtin class-name">set</span> -e  <span class="token comment"># \u6DFB\u52A0set -e</span>
a
<span class="token builtin class-name">echo</span> <span class="token string">&quot;End&quot;</span>

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># bash demo.sh</span>
demo.sh: line <span class="token number">4</span>: a: <span class="token builtin class-name">command</span> not found  <span class="token comment"># \u62A5\u9519\u4E86\uFF0C\u4E0D\u4F1A\u7EE7\u7EED\u5411\u4E0B\u6267\u884C</span>
</code></pre></div><p><strong><code>set -o pipefail</code>\u5BF9<code>set -e</code>\u7684\u8865\u5145</strong></p><p><code>set -e</code>\u6709\u4E00\u4E2A\u4F8B\u5916\u60C5\u51B5\uFF0C\u5C31\u662F\u4E0D\u9002\u7528\u4E8E\u7BA1\u9053\u547D\u4EE4</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat demo.sh</span>
<span class="token comment">#!/bin/bash</span>
<span class="token builtin class-name">set</span> -u
<span class="token builtin class-name">set</span> -e
a <span class="token operator">|</span> <span class="token builtin class-name">echo</span> <span class="token number">1</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;End&quot;</span>

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># bash demo.sh</span>
<span class="token number">1</span>
demo.sh: line <span class="token number">4</span>: a: <span class="token builtin class-name">command</span> not found
End
</code></pre></div><p><code>set -o pipefail</code>\u5C31\u662F\u7528\u6765\u89E3\u51B3\u8FD9\u79CD\u60C5\u51B5\uFF0C\u53EA\u8981\u4E00\u4E2A\u5B50\u547D\u4EE4\u5931\u8D25\uFF0C\u6574\u4E2A\u7BA1\u9053\u547D\u4EE4\u5C31\u5931\u8D25\uFF0C\u811A\u672C\u5C31\u4F1A\u7EC8\u6B62\u6267\u884C</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat demo.sh</span>
<span class="token comment">#!/bin/bash</span>
<span class="token builtin class-name">set</span> -u
<span class="token builtin class-name">set</span> -e
<span class="token builtin class-name">set</span> -o pipefail
a <span class="token operator">|</span> <span class="token builtin class-name">echo</span> <span class="token number">1</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;End&quot;</span>

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># bash demo.sh</span>
demo.sh: line <span class="token number">5</span>: a: <span class="token builtin class-name">command</span> not found
<span class="token number">1</span>
</code></pre></div><p><strong>\u603B\u7ED3</strong></p><p>\u63A8\u8350\u4F7F\u7528\u4E0B\u9762\u8FD9\u79CD\u5199\u6CD5</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token builtin class-name">set</span> -euo pipefail
</code></pre></div><blockquote><p>\u8FD8\u6709\u4E00\u79CD\u65B9\u6CD5\u4E5F\u80FD\u8FBE\u5230\u540C\u6837\u7684\u6548\u679C\uFF0C<code>bash -euxo pipefail demo.sh</code>\uFF0C\u4F46\u662F\u4F60\u4E0D\u80FD\u4FDD\u8BC1\u8C03\u7528\u65F6\u6C38\u8FDC\u4F1A\u8BB0\u5F97\u6DFB\u52A0<code>-euxo pipefail</code>\u9009\u9879\uFF0C\u6240\u4EE5\u5E76\u4E0D\u63A8\u8350</p></blockquote><h3 id="\u8BED\u53E5" tabindex="-1"><a class="header-anchor" href="#\u8BED\u53E5" aria-hidden="true">#</a> \u8BED\u53E5</h3><h4 id="\u6D4B\u8BD5\u8BED\u53E5" tabindex="-1"><a class="header-anchor" href="#\u6D4B\u8BD5\u8BED\u53E5" aria-hidden="true">#</a> \u6D4B\u8BD5\u8BED\u53E5</h4><p>\u6D4B\u8BD5\u8BED\u53E5\u53EF\u4EE5\u4F7F\u7528 [ \u6BD4\u8F83\u8BED\u53E5 ] \u548C [[ \u6BD4\u8F83\u8BED\u53E5 ]]\uFF0C\u6CE8\u610F\u8BED\u53E5\u548C\u524D\u540E\u4E2D\u62EC\u53F7\u90FD\u6709\u4E00\u4E2A\u7A7A\u683C \u4E5F\u53EF\u4EE5\u7528test</p><p>\u4F7F\u7528[[ ... ]]\u6761\u4EF6\u5224\u65AD\u7ED3\u6784\uFF0C\u800C\u4E0D\u662F[ ... ]\uFF0C\u80FD\u591F\u9632\u6B62\u811A\u672C\u4E2D\u7684\u8BB8\u591A\u903B\u8F91\u9519\u8BEF\u3002\u6BD4\u5982\uFF0C&amp;&amp;\u3001||\u3001&lt;\u548C&gt; \u64CD\u4F5C\u7B26\u80FD\u591F\u6B63\u5E38\u5B58\u5728\u4E8E[[ ]]\u6761\u4EF6\u5224\u65AD\u7ED3\u6784\u4E2D\uFF0C\u4F46\u662F\u5982\u679C\u51FA\u73B0\u5728[ ]\u7ED3\u6784\u4E2D\u7684\u8BDD\uFF0C\u53EF\u80FD\u4F1A\u62A5\u9519\uFF0C\u4F46\u6709\u4E9B\u5224\u65AD\u4F7F\u7528[[ ]]\u4F1A\u51FA\u9519\u800C\u4F7F\u7528[ ]\u786E\u6CA1\u95EE\u9898\uFF0C\u5177\u4F53\u5982\u4F55\u4F7F\u7528\uFF0C\u81EA\u5DF1\u6D4B\u8BD5\u4E00\u4E0B\u5C31\u597D\u3002</p><p><strong>\u6574\u6570\u6BD4\u8F83</strong></p><table><thead><tr><th>\u4EE3\u7801</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td>-eq</td><td>\u7B49\u4E8E</td></tr><tr><td>-ne</td><td>\u4E0D\u7B49\u4E8E</td></tr><tr><td>-lt</td><td>\u5C0F\u4E8E</td></tr><tr><td>-le</td><td>\u5C0F\u4E8E\u7B49\u4E8E</td></tr><tr><td>-gt</td><td>\u5927\u4E8E</td></tr><tr><td>-ge</td><td>\u5927\u4E8E\u7B49\u4E8E</td></tr></tbody></table><p><code>demo.sh</code></p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token builtin class-name">read</span> -p <span class="token string">&quot;\u8BF7\u8F93\u5165\u4E00\u4E2A\u6574\u6570:&quot;</span> num
<span class="token keyword">if</span> <span class="token punctuation">[</span> -z <span class="token variable">$num</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;\u8F93\u5165\u4E0D\u5B58\u5728!&quot;</span>
    <span class="token builtin class-name">exit</span> <span class="token number">1</span>
<span class="token keyword">fi</span>
<span class="token assign-left variable">nu</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">echo</span> $num <span class="token operator">|</span> <span class="token function">tr</span> -d <span class="token string">&#39;[0-9]&#39;</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token string">&#39;s/^-//&#39;</span><span class="token variable">)</span></span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> -z <span class="token variable">$nu</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;\u60A8\u8F93\u5165\u7684\u662F\u6574\u6570\uFF0C\u68C0\u6D4B\u901A\u8FC7&quot;</span>
<span class="token keyword">else</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;\u8BF7\u60A8\u8F93\u5165\u5408\u6CD5\u7684\u6574\u6570&quot;</span>
<span class="token keyword">fi</span>
</code></pre></div><p><strong>\u5B57\u7B26\u4E32\u6BD4\u8F83</strong></p><table><thead><tr><th>\u4EE3\u7801</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td>-n</td><td>\u68C0\u6D4B\u5B57\u7B26\u4E32\u662F\u5426\u4E0D\u4E3A\u7A7A</td></tr><tr><td>-z</td><td>\u68C0\u6D4B\u5B57\u7B26\u4E32\u662F\u5426\u4E3A\u7A7A</td></tr><tr><td>==</td><td>\u6D4B\u8BD5\u4E24\u4E2A\u5B57\u7B26\u4E32\u662F\u5426\u76F8\u7B49</td></tr><tr><td>!=</td><td>\u6D4B\u8BD5\u4E24\u4E2A\u5B57\u7B26\u4E32\u662F\u5426\u4E0D\u76F8\u7B49</td></tr><tr><td>=~</td><td>\u6D4B\u8BD5\u5B57\u7B26\u4E32\uFF08\u524D\u8005\uFF09\u662F\u5426\u5305\u542B\u53E6\u5916\u4E00\u4E2A\u5B57\u7B26\u4E32\uFF08\u540E\u8005\uFF09</td></tr></tbody></table><p><code>demo.sh</code></p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token string">&quot;abc&quot;</span> <span class="token operator">=~</span> <span class="token string">&quot;ab&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> ok
<span class="token keyword">else</span>
    <span class="token builtin class-name">echo</span> faile
<span class="token keyword">fi</span>
</code></pre></div><p><strong>\u6587\u4EF6\u64CD\u4F5C\u7B26</strong></p><table><thead><tr><th>\u4EE3\u7801</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td>-d</td><td>\u6D4B\u8BD5\u662F\u5426\u662F\u76EE\u5F55</td></tr><tr><td>-e</td><td>\u6D4B\u8BD5\u6587\u4EF6\u6216\u8005\u76EE\u5F55\u662F\u5426\u5B58\u5728</td></tr><tr><td>-f</td><td>\u6D4B\u8BD5\u662F\u5426\u662F\u4E00\u822C\u6587\u4EF6</td></tr><tr><td>-r</td><td>\u6D4B\u8BD5\u6587\u4EF6\u662F\u5426\u662F\u53EF\u8BFB</td></tr><tr><td>-w</td><td>\u6D4B\u8BD5\u6587\u4EF6\u662F\u5426\u53EF\u5199</td></tr><tr><td>-x</td><td>\u6D4B\u8BD5\u6587\u4EF6\u662F\u5426\u53EF\u6267\u884C</td></tr><tr><td>-s</td><td>\u6D4B\u8BD5\u6587\u4EF6\u5927\u5C0F\u662F\u5426\u4E0D\u4E3A\u7A7A</td></tr><tr><td>-L</td><td>\u6D4B\u8BD5\u6587\u4EF6\u662F\u5426\u662F\u94FE\u63A5\u6587\u4EF6</td></tr></tbody></table><p><strong>\u903B\u8F91\u8FD0\u7B97\u7B26</strong></p><table><thead><tr><th>\u4EE3\u7801</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td>!</td><td>\u975E\uFF0C\u53D6\u53CD</td></tr><tr><td>-a</td><td>\u4E0E\uFF0C\u540C\u65F6\u4E3A\u771F\u5219\u4E3A\u771F</td></tr><tr><td>-o</td><td>\u6216\uFF0C\u6709\u4E00\u4E2A\u4E3A\u771F\u5219\u4E3A\u771F</td></tr></tbody></table><p>\u4E0B\u9762\u7684\u4E24\u4E2A\u811A\u672C\u6548\u679C\u662F\u4E00\u6837\u7684\uFF0C\u6CE8\u610F\u7B2C\u4E00\u4E2A\u811A\u672C\u4E0D\u80FD\u7528[[ ]]</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
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
</code></pre></div><h4 id="if\u8BED\u53E5" tabindex="-1"><a class="header-anchor" href="#if\u8BED\u53E5" aria-hidden="true">#</a> if\u8BED\u53E5</h4><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token keyword">if</span> \u8868\u8FBE\u5F0F<span class="token punctuation">;</span><span class="token keyword">then</span>
    \u8868\u8FBE\u5F0F
<span class="token keyword">elif</span> \u8868\u8FBE\u5F0F<span class="token punctuation">;</span><span class="token keyword">then</span>
    \u8868\u8FBE\u5F0F
<span class="token keyword">else</span>
    \u8868\u8FBE\u5F0F
<span class="token keyword">fi</span>
<span class="token comment">#elif\u548Celse\u90FD\u4E0D\u662F\u5FC5\u987B\u7684</span>
</code></pre></div><h4 id="while\u8BED\u53E5" tabindex="-1"><a class="header-anchor" href="#while\u8BED\u53E5" aria-hidden="true">#</a> while\u8BED\u53E5</h4><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token keyword">while</span> \u8868\u8FBE\u5F0F<span class="token punctuation">;</span><span class="token keyword">do</span>
    \u8868\u8FBE\u5F0F
<span class="token keyword">done</span>
</code></pre></div><h4 id="for\u8BED\u53E5" tabindex="-1"><a class="header-anchor" href="#for\u8BED\u53E5" aria-hidden="true">#</a> for\u8BED\u53E5</h4><div class="language-bash ext-sh"><pre class="language-bash"><code>\u7ED3\u6784\u4E00\uFF1A
<span class="token keyword">for</span><span class="token variable"><span class="token punctuation">((</span>\u8868\u8FBE\u5F0F<span class="token punctuation">;</span>\u8868\u8FBE\u5F0F<span class="token punctuation">;</span>\u8868\u8FBE\u5F0F<span class="token punctuation">;</span><span class="token punctuation">))</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span>
    \u8868\u8FBE\u5F0F
<span class="token keyword">done</span>
\u6BD4\u5982
<span class="token keyword">for</span><span class="token variable"><span class="token punctuation">((</span>i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>i<span class="token operator">&lt;=</span><span class="token number">100</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">))</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token builtin class-name">echo</span> <span class="token variable">$i</span>
<span class="token keyword">done</span>
 
\u7ED3\u6784\u4E8C\uFF1A
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> \u8868\u8FBE\u5F0F<span class="token punctuation">;</span> <span class="token keyword">do</span>
    \u8868\u8FBE\u5F0F
<span class="token keyword">done</span>
\u6BD4\u5982
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">seq</span> <span class="token number">100</span><span class="token variable">\`</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token builtin class-name">echo</span> <span class="token variable">$i</span>
<span class="token keyword">done</span>
 
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">..</span><span class="token number">100</span><span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token builtin class-name">echo</span> <span class="token variable">$i</span>
<span class="token keyword">done</span>
<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">..</span><span class="token number">100</span><span class="token punctuation">}</span>\u8868\u793A\u8D77\u59CB\u4E3A1\uFF0C\u7ED3\u675F\u4F4D100\uFF0C\u6B65\u957F\u9ED8\u8BA4\u4E3A1\uFF0C\u53EF\u4EE5\u6307\u5B9A<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">..</span><span class="token number">100</span><span class="token punctuation">..</span><span class="token number">2</span><span class="token punctuation">}</span>,\u6BD4\u5982
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># for i in {a..z..2}; do echo $i;done</span>
</code></pre></div><p>\u4E00\u4E2A\u7B80\u5355\u7684\u8FDB\u5EA6\u6761</p><p><code>demo.sh</code></p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>
<span class="token assign-left variable">b</span><span class="token operator">=</span><span class="token string">&#39;&#39;</span>
<span class="token keyword">for</span> <span class="token variable"><span class="token punctuation">((</span>i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>$i<span class="token operator">&lt;=</span><span class="token number">100</span><span class="token punctuation">;</span>i<span class="token operator">+=</span><span class="token number">2</span><span class="token punctuation">))</span></span>
<span class="token keyword">do</span>
    <span class="token builtin class-name">printf</span> <span class="token string">&quot;progress:[%-50s]%d%%<span class="token entity" title="\\r">\\r</span>&quot;</span> <span class="token variable">$b</span> <span class="token variable">$i</span>
    <span class="token function">sleep</span> <span class="token number">0.1</span>
 
    <span class="token assign-left variable">b</span><span class="token operator">=</span><span class="token comment">#$b</span>
<span class="token keyword">done</span>
<span class="token builtin class-name">echo</span>
</code></pre></div><h4 id="case\u8BED\u53E5" tabindex="-1"><a class="header-anchor" href="#case\u8BED\u53E5" aria-hidden="true">#</a> case\u8BED\u53E5</h4><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token builtin class-name">echo</span> -n <span class="token string">&#39;\u8BF7\u8F93\u5165\u4E00\u4E2A\u6570\u5B57:&#39;</span>
<span class="token builtin class-name">read</span> number
 
<span class="token keyword">case</span> <span class="token variable">$number</span> <span class="token keyword">in</span>
 
<span class="token punctuation">(</span><span class="token number">1</span><span class="token operator">|</span><span class="token number">2</span><span class="token operator">|</span><span class="token number">3</span><span class="token punctuation">)</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&#39;1-3&#39;</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span><span class="token number">4</span><span class="token operator">|</span><span class="token number">5</span><span class="token operator">|</span><span class="token number">6</span><span class="token punctuation">)</span>
        <span class="token builtin class-name">echo</span>  <span class="token string">&#39;4-6&#39;</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span><span class="token number">7</span><span class="token operator">|</span><span class="token number">8</span><span class="token operator">|</span><span class="token number">9</span><span class="token punctuation">)</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&#39;7-9&#39;</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
*<span class="token punctuation">)</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&#39;\u8F93\u5165\u7684\u4E0D\u662F\u6570\u5B57!&#39;</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token keyword">esac</span>
</code></pre></div><h4 id="continue\u548Cbreak" tabindex="-1"><a class="header-anchor" href="#continue\u548Cbreak" aria-hidden="true">#</a> continue\u548Cbreak</h4><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># continue \u8DF3\u8FC7\u672C\u6B21\u5FAA\u73AF\uFF0C\u7EE7\u7EED\u4E0B\u4E00\u6B21\u5FAA\u73AF</span>

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

<span class="token comment"># break \u76F4\u63A5\u9000\u51FA\u6574\u4E2A\u5FAA\u73AF</span>
<span class="token comment">#!/bin/bash</span>
<span class="token keyword">for</span> <span class="token variable"><span class="token punctuation">((</span>i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>i<span class="token operator">&lt;=</span><span class="token number">1150</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">))</span></span>\uFF1B <span class="token keyword">do</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$i</span> -eq <span class="token number">101</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
        <span class="token builtin class-name">break</span>
    <span class="token keyword">fi</span>
    <span class="token assign-left variable">sum</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$((</span>sum<span class="token operator">+</span>i<span class="token variable">))</span></span>
<span class="token keyword">done</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$sum</span>
 
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># bash test.sh</span>
<span class="token number">5050</span>
</code></pre></div><h4 id="eval\u5C06\u5B57\u7B26\u4E32\u4F5C\u4E3A\u8BED\u53E5\u6267\u884C" tabindex="-1"><a class="header-anchor" href="#eval\u5C06\u5B57\u7B26\u4E32\u4F5C\u4E3A\u8BED\u53E5\u6267\u884C" aria-hidden="true">#</a> eval\u5C06\u5B57\u7B26\u4E32\u4F5C\u4E3A\u8BED\u53E5\u6267\u884C</h4><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u7ECF\u5178\u7684\u83B7\u53D6\u6700\u540E\u4E00\u4E2A\u53C2\u6570\u547D\u4EE4</span>
<span class="token comment">#!/bin/bash</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;\u6700\u540E\u4E00\u4E2A\u53C2\u6570\u662F:&quot;</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">eval</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;\\<span class="token variable">$$</span>#&quot;</span><span class="token variable">)</span></span>

<span class="token comment"># \u5176\u4ED6\u4E3E\u4F8B</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># seq 10 &gt;1.txt</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># name=&quot;cat 1.txt&quot;</span>
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
</code></pre></div><h4 id="exec\u6267\u884C\u547D\u4EE4\u540E\u9000\u51FA\u5F53\u524D\u7EC8\u7AEF" tabindex="-1"><a class="header-anchor" href="#exec\u6267\u884C\u547D\u4EE4\u540E\u9000\u51FA\u5F53\u524D\u7EC8\u7AEF" aria-hidden="true">#</a> exec\u6267\u884C\u547D\u4EE4\u540E\u9000\u51FA\u5F53\u524D\u7EC8\u7AEF</h4><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u68C0\u6D4B\u7F51\u7EDC</span>
<span class="token function">ping</span> -i <span class="token number">0.1</span>  -c <span class="token number">10</span> www.baidu.com <span class="token operator">&amp;&gt;</span>/dev/null <span class="token operator">||</span> <span class="token builtin class-name">exec</span>  <span class="token builtin class-name">echo</span> <span class="token string">&quot;Network is unreachable&quot;</span>

<span class="token comment"># \u68C0\u6D4B\u7528\u6237</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">id</span> -u<span class="token variable">\`</span></span> -ne <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span> <span class="token builtin class-name">exec</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;Must be root can run it&quot;</span><span class="token punctuation">;</span> <span class="token keyword">fi</span>
</code></pre></div><h4 id="getopts\u547D\u4EE4\u884C\u53C2\u6570\u5904\u7406" tabindex="-1"><a class="header-anchor" href="#getopts\u547D\u4EE4\u884C\u53C2\u6570\u5904\u7406" aria-hidden="true">#</a> getopts\u547D\u4EE4\u884C\u53C2\u6570\u5904\u7406</h4><blockquote><p>\u6CE8\uFF1A\u53EA\u652F\u6301\u77ED\u9009\u9879</p></blockquote><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment">#\u53D6\u5F97\u6BCF\u4E2A\u9009\u9879\u7684\u503C</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$#</span> -lt <span class="token number">1</span> <span class="token punctuation">]</span>
<span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;there is no option&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">else</span>
    <span class="token keyword">while</span> <span class="token builtin class-name">getopts</span> <span class="token string">&quot;:a:i:s:v:x:&quot;</span> opt<span class="token punctuation">;</span>
    <span class="token keyword">do</span>
        <span class="token keyword">case</span> <span class="token variable">$opt</span>  <span class="token keyword">in</span>
        a<span class="token punctuation">)</span>echo <span class="token string">&quot;option is a ,the value is <span class="token variable">$OPTARG</span>&quot;</span> <span class="token punctuation">;</span><span class="token punctuation">;</span>
 
        i<span class="token punctuation">)</span>echo <span class="token string">&quot;option is i ,the value is <span class="token variable">$OPTARG</span>&quot;</span> <span class="token punctuation">;</span><span class="token punctuation">;</span>
 
        s<span class="token punctuation">)</span>echo <span class="token string">&quot;option is s,the value is <span class="token variable">$OPTARG</span>&quot;</span> <span class="token punctuation">;</span><span class="token punctuation">;</span>
 
    <span class="token function">v</span><span class="token punctuation">)</span>echo <span class="token string">&quot;option is v ,the value is <span class="token variable">$OPTARG</span>&quot;</span> <span class="token punctuation">;</span><span class="token punctuation">;</span>
 
    x<span class="token punctuation">)</span>echo <span class="token string">&quot;option is x ,the value is <span class="token variable">$OPTARG</span>&quot;</span> <span class="token punctuation">;</span><span class="token punctuation">;</span>
 
        <span class="token keyword">esac</span>
     <span class="token keyword">done</span>
<span class="token keyword">fi</span>
 
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># bash test.sh -a A -i I -s S -x X -v V</span>
option is a ,the value is A
option is i ,the value is I
option is s,the value is S
option is x ,the value is X
option is <span class="token function">v</span> ,the value is V
</code></pre></div>`,95),e=[p];function c(l,u){return s(),a("div",null,e)}var r=n(o,[["render",c],["__file","Bash.html.vue"]]);export{r as default};
