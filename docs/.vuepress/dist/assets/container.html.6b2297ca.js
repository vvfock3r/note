import{_ as o,r as p,o as c,c as l,d as n,a as t,b as e,e as s}from"./app.8347a01d.js";const r={},u=e('<h2 id="\u5BB9\u5668" tabindex="-1"><a class="header-anchor" href="#\u5BB9\u5668" aria-hidden="true">#</a> \u5BB9\u5668</h2><h3 id="\u5BB9\u5668\u6838\u5FC3\u6280\u672F" tabindex="-1"><a class="header-anchor" href="#\u5BB9\u5668\u6838\u5FC3\u6280\u672F" aria-hidden="true">#</a> \u5BB9\u5668\u6838\u5FC3\u6280\u672F</h3><p><strong>\u5BB9\u5668\u7684\u672C\u8D28</strong></p><p>\u5BB9\u5668\u672C\u8D28\u4E0A\u662F\u4E00\u4E2A\u7279\u6B8A\u7684\u8FDB\u7A0B\uFF0C\u4F7F\u7528Linux Namespace\u5BF9\u8D44\u6E90\u8FDB\u884C\u9694\u79BB\u3001cgroup\u5BF9\u8D44\u6E90\u8FDB\u884C\u9650\u5236\u3002</p><br><p><strong><code>OCI</code>\u7EC4\u7EC7</strong></p><p>2015\u5E746\u670822\u7531<code>Docker</code>\u3001<code>CoreOS</code>\u548C\u5176\u4ED6\u516C\u53F8\u5171\u540C\u6210\u7ACB\u4E86\u4E00\u4E2A\u53EB<code>Open Container Initiative</code>\u7684\u7EC4\u7EC7\uFF08\u7B80\u79F0<code>OCI</code>\uFF09,\u5176\u76EE\u7684\u662F\u5236\u5B9A\u5F00\u653E\u7684\u5BB9\u5668\u89C4\u8303\u3002</p>',7),k=s("\u5B98\u7F51\uFF1A"),i={href:"https://opencontainers.org/",target:"_blank",rel:"noopener noreferrer"},m=s("https://opencontainers.org/"),d=s("\uFF0CGithub\uFF1A"),b={href:"https://github.com/opencontainers",target:"_blank",rel:"noopener noreferrer"},g=s("https://github.com/opencontainers"),f=e('<p><code>OCI</code>\u76EE\u524D\u53D1\u5E03\u4E86\u4E09\u4E2A\u89C4\u8303\uFF1A\u8FD0\u884C\u65F6\u89C4\u8303\uFF08<code>Runtime spec</code>\uFF09\u3001\u955C\u50CF\u89C4\u8303\uFF08<code>Image spec</code>\uFF09\u548C\u5206\u53D1\u89C4\u8303\uFF08<code>distribution-spec</code>\uFF09</p><br><p><strong>\u8FD0\u884C\u65F6\u8BF4\u660E</strong></p><p>\uFF081\uFF09\u5BB9\u5668\u8FD0\u884C\u65F6\u89C4\u8303</p><p>\u5BB9\u5668\u8FD0\u884C\u65F6\u89C4\u8303\u63CF\u8FF0\u4E86<span style="color:red;font-weight:bold;">\u5BB9\u5668\u7684\u914D\u7F6E\u3001\u8FD0\u884C\u73AF\u5883\u548C\u751F\u547D\u5468\u671F</span></p><p>\uFF082\uFF09\u5BB9\u5668\u8FD0\u884C\u65F6</p><p>\u5BB9\u5668\u8FD0\u884C\u65F6\uFF08<code>runtime</code>\uFF09\u662F\u5BB9\u5668\u771F\u6B63\u8FD0\u884C\u7684\u5730\u65B9\uFF0C<code>lxc</code>\u3001<code>runc</code>\u3001<code>rkt</code>\u662F\u76EE\u524D\u4E3B\u6D41\u7684\u4E09\u79CD\u5BB9\u5668runtime</p><p><code>lxc</code>\u662FLinux\u4E0A\u8001\u724C\u7684\u8FD0\u884C\u65F6\u3002Docker\u6700\u521D\u4E5F\u662F\u4F7F\u7528<code>lxc</code>\u4F5C\u4E3A\u5BB9\u5668runtime</p><p><code>runc</code>\u662FDocker\u81EA\u5DF1\u5F00\u53D1\u7684\u8FD0\u884C\u65F6\uFF0C\u7B26\u5408OCI\u89C4\u8303\uFF0C\u4E5F\u662F\u73B0\u5728Docker\u9ED8\u8BA4\u7684runtime</p><p><code>rkt</code>\u662FCoreOS\u5F00\u53D1\u7684\u5BB9\u5668runtime\uFF0C\u7B26\u5408OCI\u89C4\u8303\uFF0C\u56E0\u6B64\u80FD\u591F\u8FD0\u884CDocker\u5BB9\u5668</p><p>\uFF083\uFF09\u5BB9\u5668\u8FD0\u884C\u65F6\u7BA1\u7406\u5DE5\u5177</p><p>\u5149\u6709\u8FD0\u884C\u65F6\u8FD8\u4E0D\u591F\uFF0C\u7528\u6237\u5F97\u6709\u5DE5\u5177\u7BA1\u7406\u5BB9\u5668</p><p>lxc\u7684\u7BA1\u7406\u5DE5\u5177\u662F<code>lxd</code></p><p>runc\u7684\u7BA1\u7406\u5DE5\u5177\u662F<code>docker engine</code>\uFF0C<code>docker engine</code>\u5305\u542Bdeamon\u548Ccli\u4E24\u90E8\u5206\u3002\u6211\u4EEC\u901A\u5E38\u63D0\u5230\u7684Docker\uFF0C\u4E00\u822C\u5C31\u662F\u6307<code>docker engine</code></p><p>rkt\u7684\u7BA1\u7406\u5DE5\u5177\u662F<code>rkt cli</code></p><br><p><strong>\u955C\u50CF\u8BF4\u660E</strong></p><p>\uFF081\uFF09\u5BB9\u5668\u955C\u50CF\u89C4\u8303</p><p>\u5BB9\u5668\u955C\u50CF\u89C4\u8303\u5B9A\u4E49\u4E00\u4E2AOCI\u955C\u50CF\u7531<code>a manifest</code>\u3001<code> an image index</code>\uFF08\u53EF\u9009\uFF09\u3001<code>a set of filesystem layers</code>\u548C<code>a Configuration</code>\u7EC4\u6210\u3002</p><p>\uFF082\uFF09\u5BB9\u5668\u955C\u50CF</p><p>\u5BB9\u5668\u955C\u50CF\u662F\u7528\u6765\u521B\u5EFA\u5BB9\u5668\u7684\uFF0Cruntime\u4F9D\u636E\u5BB9\u5668\u955C\u50CF\u6765\u521B\u5EFA\u5BB9\u5668</p><p>\u6700\u5E38\u7528\u7684Docker\u955C\u50CF\u662F\u7B26\u5408OCI Image\u89C4\u8303\u7684</p><p>\uFF083\uFF09\u5BB9\u5668\u955C\u50CF\u5B9A\u4E49\u5DE5\u5177</p><p>\u5BB9\u5668\u5B9A\u4E49\u5DE5\u5177\u5141\u8BB8\u7528\u6237\u81EA\u5B9A\u4E49\u5BB9\u5668\u7684\u5185\u5BB9\u548C\u5C5E\u6027\uFF0C\u8FD9\u6837\u5BB9\u5668\u5C31\u80FD\u591F\u88AB\u4FDD\u5B58\u3001\u5171\u4EAB\u548C\u521B\u5EFA</p><p>dockerfile\u662F\u5305\u542B\u82E5\u5E72\u547D\u4EE4\u7684\u6587\u672C\u6587\u4EF6\uFF0C\u53EF\u4EE5\u901A\u8FC7\u8FD9\u4E9B\u547D\u4EE4\u521B\u5EFA\u51FAdocker\u955C\u50CF</p><p>\uFF084\uFF09\u5BB9\u5668\u955C\u50CF\u5B58\u50A8\u4ED3\u5E93</p><p>\u955C\u50CF\u9700\u8981\u7EDF\u4E00\u5B58\u50A8\uFF0C\u8FD9\u4E2A\u5B58\u50A8\u7684\u5927\u7684\u4ED3\u5E93\u53EB\u505ARegistry\u3002<code>Docker Hub</code>\u548C<code>Quay.io</code>\u662F\u4E3A\u516C\u4F17\u63D0\u4F9B\u6258\u7BA1\u7684Registry\uFF0C\u6211\u4EEC\u4E00\u822C\u4F7F\u7528<code>Harbor</code>\u6765\u642D\u5EFA\u79C1\u6709\u7684Registry</p><br><h3 id="\u5BB9\u5668\u5E73\u53F0\u6280\u672F" tabindex="-1"><a class="header-anchor" href="#\u5BB9\u5668\u5E73\u53F0\u6280\u672F" aria-hidden="true">#</a> \u5BB9\u5668\u5E73\u53F0\u6280\u672F</h3><p>\u5BB9\u5668\u6838\u5FC3\u6280\u672F\u53EF\u4EE5\u8BA9\u5BB9\u5668\u8FD0\u884C\u5728\u5355\u4E2A\u4E3B\u673A\u4E0A\uFF0C\u800C\u5BB9\u5668\u5E73\u53F0\u6280\u672F\u53EF\u4EE5\u8BA9\u5BB9\u5668\u8FD0\u884C\u5728\u5206\u5E03\u5F0F\u73AF\u5883\u4E2D</p><br><p><strong>\u5BB9\u5668\u7F16\u6392\u5F15\u64CE</strong></p><p>\u6240\u8C13\u7F16\u6392\uFF0C\u901A\u5E38\u5305\u62EC\u5BB9\u5668\u7BA1\u7406\u3001\u8C03\u5EA6\u3001\u96C6\u7FA4\u5B9A\u4E49\u548C\u670D\u52A1\u53D1\u73B0\u7B49\u3002</p><p><code>docker swarm</code>\u662FDocker\u5F00\u53D1\u7684\u5BB9\u5668\u7F16\u6392\u5F15\u64CE</p><p><code>kubernetes</code>\u662FGoogle\u5F00\u53D1\u7684\u5F00\u6E90\u5BB9\u5668\u7F16\u6392\u5F15\u64CE\uFF0C\u540C\u65F6\u652F\u6301Docker\u548CCoreOS\u5BB9\u5668</p><br><p><strong>\u5BB9\u5668\u7BA1\u7406\u5E73\u53F0</strong></p><p>\u5BB9\u5668\u7BA1\u7406\u5E73\u53F0\u662F\u67B6\u6784\u5728\u5BB9\u5668\u7F16\u6392\u5F15\u64CE\u4E4B\u4E0A\u7684\u4E00\u4E2A\u66F4\u4E3A\u901A\u7528\u7684\u5E73\u53F0\uFF0C\u901A\u5E38\u5BB9\u5668\u7BA1\u7406\u5E73\u53F0\u53EF\u4EE5\u652F\u6301\u591A\u79CD\u7F16\u6392\u5F15\u64CE</p><p><code>Rancher</code>\u662F\u5BB9\u5668\u7BA1\u7406\u5E73\u53F0\u7684\u5178\u578B\u4EE3\u8868</p><br><h3 id="faq" tabindex="-1"><a class="header-anchor" href="#faq" aria-hidden="true">#</a> FAQ</h3><h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h2><h2 id="docker-engine" tabindex="-1"><a class="header-anchor" href="#docker-engine" aria-hidden="true">#</a> Docker Engine</h2>',43),h=s("\u5B98\u7F51\uFF1A"),q={href:"https://www.docker.com/",target:"_blank",rel:"noopener noreferrer"},v=s("https://www.docker.com/"),x=n("h3",{id:"\u57FA\u7840\u64CD\u4F5C",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u57FA\u7840\u64CD\u4F5C","aria-hidden":"true"},"#"),s(" \u57FA\u7840\u64CD\u4F5C")],-1),w=n("h4",{id:"\u5B89\u88C5",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u5B89\u88C5","aria-hidden":"true"},"#"),s(" \u5B89\u88C5")],-1),y=s("CentOS\u5B89\u88C5\u6587\u6863\uFF1A"),_={href:"https://docs.docker.com/engine/install/centos/",target:"_blank",rel:"noopener noreferrer"},A=s("https://docs.docker.com/engine/install/centos/"),R=e(`<details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u8BE6\u60C5</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u5378\u8F7D\u8001\u7248\u672C(\u5982\u679C\u6709)</span>
<span class="token function">sudo</span> yum remove <span class="token function">docker</span> <span class="token punctuation">\\</span>
                  docker-client <span class="token punctuation">\\</span>
                  docker-client-latest <span class="token punctuation">\\</span>
                  docker-common <span class="token punctuation">\\</span>
                  docker-latest <span class="token punctuation">\\</span>
                  docker-latest-logrotate <span class="token punctuation">\\</span>
                  docker-logrotate <span class="token punctuation">\\</span>
                  docker-engine

<span class="token comment"># \u5B89\u88C5Docker\u4ED3\u5E93</span>
<span class="token function">sudo</span> yum <span class="token function">install</span> -y yum-utils
<span class="token function">sudo</span> yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
    
<span class="token comment"># \u67E5\u770Bdocker-ce\u6240\u6709\u53EF\u5B89\u88C5\u7248\u672C\uFF08Docker CE\u662FDocker\u514D\u8D39\u7248\u4EA7\u54C1\u7684\u65B0\u540D\u79F0\uFF09</span>
yum list docker-ce --showduplicates
 * updates: mirrors.tuna.tsinghua.edu.cn
Loading mirror speeds from cached hostfile
Loaded plugins: fastestmirror
 * extras: mirrors.tuna.tsinghua.edu.cn
<span class="token punctuation">..</span>.
docker-ce.x86_64          <span class="token number">3</span>:20.10.2-3.el7           docker-ce-stable
docker-ce.x86_64          <span class="token number">3</span>:20.10.3-3.el7           docker-ce-stable
docker-ce.x86_64          <span class="token number">3</span>:20.10.4-3.el7           docker-ce-stable
docker-ce.x86_64          <span class="token number">3</span>:20.10.5-3.el7           docker-ce-stable
docker-ce.x86_64          <span class="token number">3</span>:20.10.6-3.el7           docker-ce-stable
docker-ce.x86_64          <span class="token number">3</span>:20.10.7-3.el7           docker-ce-stable
docker-ce.x86_64          <span class="token number">3</span>:20.10.8-3.el7           docker-ce-stable
docker-ce.x86_64          <span class="token number">3</span>:20.10.9-3.el7           docker-ce-stable
docker-ce.x86_64          <span class="token number">3</span>:20.10.10-3.el7          docker-ce-stable
docker-ce.x86_64          <span class="token number">3</span>:20.10.11-3.el7          docker-ce-stable
docker-ce.x86_64          <span class="token number">3</span>:20.10.12-3.el7          docker-ce-stable
docker-ce.x86_64          <span class="token number">3</span>:20.10.13-3.el7          docker-ce-stable
docker-ce.x86_64          <span class="token number">3</span>:20.10.14-3.el7          docker-ce-stable
docker-ce.x86_64          <span class="token number">3</span>:20.10.15-3.el7          docker-ce-stable	<span class="token comment"># \u8FD9\u91CC\u662F\u6700\u65B0\u7684</span>

<span class="token comment"># \u5B89\u88C5\u6700\u65B0\u7248</span>
<span class="token function">sudo</span> yum <span class="token function">install</span> docker-ce docker-ce-cli containerd.io docker-compose-plugin

<span class="token comment"># \u5B89\u88C5\u6307\u5B9A\u7248\u672C</span>
<span class="token comment"># \u8BED\u6CD5\uFF1Asudo yum install docker-ce-&lt;VERSION_STRING&gt; docker-ce-cli-&lt;VERSION_STRING&gt; containerd.io docker-compose-plugin</span>
<span class="token function">sudo</span> yum <span class="token function">install</span> docker-ce-20.10.14 docker-ce-cli-20.10.14 containerd.io docker-compose-plugin

<span class="token comment"># \u542F\u52A8Docker Engine</span>
<span class="token function">sudo</span> systemctl start docker.service
<span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> docker.service	<span class="token comment"># \u8BBE\u7F6E\u5F00\u542F\u81EA\u542F</span>

<span class="token comment"># \u6D4B\u8BD5Docker Engine</span>
<span class="token function">sudo</span> <span class="token function">docker</span> run hello-world
</code></pre></div></details><h4 id="\u8FD0\u884C\u5BB9\u5668" tabindex="-1"><a class="header-anchor" href="#\u8FD0\u884C\u5BB9\u5668" aria-hidden="true">#</a> \u8FD0\u884C\u5BB9\u5668</h4><details class="custom-container details"><summary>\u8FD0\u884C\u5BB9\u5668\u793A\u4F8B</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u8BED\u6CD5</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run --help | head -5</span>
Usage:  <span class="token function">docker</span> container run <span class="token punctuation">[</span>OPTIONS<span class="token punctuation">]</span> IMAGE <span class="token punctuation">[</span>COMMAND<span class="token punctuation">]</span> <span class="token punctuation">[</span>ARG<span class="token punctuation">..</span>.<span class="token punctuation">]</span>
Run a <span class="token builtin class-name">command</span> <span class="token keyword">in</span> a new container

<span class="token comment"># \u8FD0\u884C\u4E00\u4E2A\u5BB9\u5668</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run centos:7</span>

<span class="token comment"># \u72B6\u6001\u4E3AExited(0)\uFF0C\u610F\u601D\u662F\u5BB9\u5668\u6B63\u5E38\u8FD0\u884C\u5B8C\u540E\u5C31\u9000\u51FA\u4E86\uFF0C\u5BB9\u5668\u8FD0\u884C\u7684\u547D\u4EE4\u662F/bin/bash</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container ps -a</span>
CONTAINER ID   IMAGE      COMMAND       CREATED          STATUS                      PORTS     NAMES
e94332164c56   centos:7   <span class="token string">&quot;/bin/bash&quot;</span>   <span class="token number">41</span> seconds ago   Exited <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token number">41</span> seconds ago             vigilant_sanderson

<span class="token comment"># \u600E\u4E48\u80FD\u8BA9\u5B83\u4E0D\u9000\u51FA\u5462\uFF1F</span>
</code></pre></div></details><details class="custom-container details"><summary>\u5BB9\u5668\u4E0D\u9000\u51FA\u65B9\u5F0F\u4E00\uFF1A\u524D\u53F0\u8FDB\u7A0B</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u65B9\u5F0F\u4E00\uFF1A</span>
<span class="token comment"># \u5BB9\u5668\u672C\u8D28\u5C31\u662F\u4E00\u4E2A\u8FDB\u7A0B\uFF0C\u8FDB\u7A0B\u6267\u884C\u5B8C\u6BD5\u81EA\u7136\u5C31\u9000\u51FA\u4E86\uFF0C\u6240\u4EE5\u5BB9\u5668\u4E5F\u81EA\u7136\u5C31\u9000\u51FA\u4E86\uFF0C\u4E0D\u8BA9\u5BB9\u5668\u9000\u51FA\u7684\u529E\u6CD5\u4E4B\u4E00\u5C31\u662F\u542F\u52A8\u4E00\u4E2A\u4E0D\u4F1A\u9000\u51FA\u7684\u8FDB\u7A0B\uFF0C</span>
<span class="token comment"># \u6BD4\u5982\u50CFnginx\u7B49\u670D\u52A1\u5C31\u662F\u60F3\u529E\u6CD5\u8BA9\u4ED6\u5728\u524D\u53F0\u8FD0\u884C\u4E0D\u9000\u51FA</span>
<span class="token comment"># \u5728\u8FD9\u91CC\u6211\u4EEC\u4F7F\u7528\u4E00\u4E2A\u81EA\u5B9A\u4E49\u7684\u547D\u4EE4\u66FF\u6362\u6389/bin/bash</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run centos:7 sleep 100</span>

<span class="token comment"># \u53E6\u5916\u5F00\u4E00\u4E2A\u7EC8\u7AEF\u67E5\u770B\u5BB9\u5668\u4FE1\u606F</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container ps </span>
CONTAINER ID   IMAGE      COMMAND       CREATED          STATUS         PORTS     NAMES
2c2af2267d37   centos:7   <span class="token string">&quot;sleep 100&quot;</span>   <span class="token number">10</span> seconds ago   Up <span class="token number">8</span> seconds             recursing_ride
<span class="token comment"># ---------------------------------------------------------------------------------------------------</span>
<span class="token comment"># \u5982\u679C\u8BF4\u5BB9\u5668\u91CC\u6211\u4EEC\u8FD0\u884C\u4E00\u4E2Anginx\uFF0C\u90A3\u4E48\u5C31\u50CF\u8FD9\u6837</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run nginx:1.21.6</span>
/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
/docker-entrypoint.sh: Looking <span class="token keyword">for</span> shell scripts <span class="token keyword">in</span> /docker-entrypoint.d/
/docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
<span class="token number">10</span>-listen-on-ipv6-by-default.sh: info: Getting the checksum of /etc/nginx/conf.d/default.conf
<span class="token number">10</span>-listen-on-ipv6-by-default.sh: info: Enabled listen on IPv6 <span class="token keyword">in</span> /etc/nginx/conf.d/default.conf
/docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
/docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
/docker-entrypoint.sh: Configuration complete<span class="token punctuation">;</span> ready <span class="token keyword">for</span> start up
<span class="token number">2022</span>/05/12 05:48:15 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: using the &quot;epoll&quot; event method</span>
<span class="token number">2022</span>/05/12 05:48:15 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: nginx/1.21.6</span>
<span class="token number">2022</span>/05/12 05:48:15 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: built by gcc 10.2.1 20210110 (Debian 10.2.1-6) </span>
<span class="token number">2022</span>/05/12 05:48:15 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: OS: Linux 3.10.0-693.el7.x86_64</span>
<span class="token number">2022</span>/05/12 05:48:15 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: getrlimit(RLIMIT_NOFILE): 65536:65536</span>
<span class="token number">2022</span>/05/12 05:48:15 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: start worker processes</span>
<span class="token number">2022</span>/05/12 05:48:15 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: start worker process 31</span>
<span class="token number">2022</span>/05/12 05:48:15 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: start worker process 32</span>
<span class="token number">2022</span>/05/12 05:48:15 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: start worker process 33</span>
<span class="token number">2022</span>/05/12 05:48:15 <span class="token punctuation">[</span>notice<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: start worker process 34</span>

<span class="token comment"># \u53E6\u5916\u5F00\u4E00\u4E2A\u7EC8\u7AEF\u67E5\u770B\u5BB9\u5668\u4FE1\u606F</span>
<span class="token comment"># nginx -g &#39;daemon off;&#39;\u5C31\u662Fnginx\u5728\u524D\u53F0\u8FD0\u884C\u7684\u547D\u4EE4</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container ps --no-trunc</span>
CONTAINER ID                                                       IMAGE          COMMAND                                          CREATED              STATUS              PORTS     NAMES
864381465f51c5b88eb4c11ec78d0cf10593ea8a5f56795698fe5686129cab22   nginx:1.21.6   <span class="token string">&quot;/docker-entrypoint.sh nginx -g &#39;daemon off;&#39;&quot;</span>   <span class="token number">34</span> seconds ago       Up <span class="token number">34</span> seconds       <span class="token number">80</span>/tcp    brave_wilbur
</code></pre></div></details><details class="custom-container details"><summary>\u5BB9\u5668\u4E0D\u9000\u51FA\u65B9\u5F0F\u4E8C\uFF1A\u5F00\u542F\u6807\u51C6\u8F93\u5165hang\u4F4F\u5BB9\u5668</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u65B9\u5F0F\u4E8C\uFF1A</span>
<span class="token comment"># \u4F7F\u7528docker container run -i\u9009\u9879\uFF0C\u5F00\u542F\u6807\u51C6\u8F93\u5165\u529F\u80FD\uFF0C\u8FD9\u4F1Ahang\u4F4F\u5BB9\u5668\uFF0C\u8BA9\u5BB9\u5668\u4E0D\u9000\u51FA</span>
<span class="token comment">#\uFF08\u6CE8\u610F\u4E0D\u662F\u4EFB\u4F55\u7A0B\u5E8F\u90FD\u652F\u6301\u8F93\u5165\u529F\u80FD\uFF0C\u6BD4\u5982/bin/bash\u548Ccat\u662F\u652F\u6301\u7684\uFF0Cls\u5C31\u4E0D\u652F\u6301\uFF09</span>

<span class="token comment"># /bin/bash\u5F00\u542F\u8F93\u5165\u529F\u80FD\uFF0C\u652F\u6301</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run -i centos:7 </span>
<span class="token function">ls</span> -l			<span class="token comment"># \u8FD9\u91CC\u53EF\u4EE5\u8F93\u5165\u547D\u4EE4</span>
total <span class="token number">12</span>
-rw-r--r--.   <span class="token number">1</span> root root <span class="token number">12114</span> Nov <span class="token number">13</span>  <span class="token number">2020</span> anaconda-post.log
lrwxrwxrwx.   <span class="token number">1</span> root root     <span class="token number">7</span> Nov <span class="token number">13</span>  <span class="token number">2020</span> bin -<span class="token operator">&gt;</span> usr/bin
drwxr-xr-x.   <span class="token number">5</span> root root   <span class="token number">340</span> May <span class="token number">12</span> 05:16 dev
drwxr-xr-x.   <span class="token number">1</span> root root    <span class="token number">66</span> May <span class="token number">12</span> 05:16 etc
drwxr-xr-x.   <span class="token number">2</span> root root     <span class="token number">6</span> Apr <span class="token number">11</span>  <span class="token number">2018</span> home
lrwxrwxrwx.   <span class="token number">1</span> root root     <span class="token number">7</span> Nov <span class="token number">13</span>  <span class="token number">2020</span> lib -<span class="token operator">&gt;</span> usr/lib
lrwxrwxrwx.   <span class="token number">1</span> root root     <span class="token number">9</span> Nov <span class="token number">13</span>  <span class="token number">2020</span> lib64 -<span class="token operator">&gt;</span> usr/lib64
drwxr-xr-x.   <span class="token number">2</span> root root     <span class="token number">6</span> Apr <span class="token number">11</span>  <span class="token number">2018</span> media
drwxr-xr-x.   <span class="token number">2</span> root root     <span class="token number">6</span> Apr <span class="token number">11</span>  <span class="token number">2018</span> mnt
drwxr-xr-x.   <span class="token number">2</span> root root     <span class="token number">6</span> Apr <span class="token number">11</span>  <span class="token number">2018</span> opt
dr-xr-xr-x. <span class="token number">204</span> root root     <span class="token number">0</span> May <span class="token number">12</span> 05:16 proc
dr-xr-x---.   <span class="token number">2</span> root root   <span class="token number">114</span> Nov <span class="token number">13</span>  <span class="token number">2020</span> root
drwxr-xr-x.  <span class="token number">11</span> root root   <span class="token number">148</span> Nov <span class="token number">13</span>  <span class="token number">2020</span> run
lrwxrwxrwx.   <span class="token number">1</span> root root     <span class="token number">8</span> Nov <span class="token number">13</span>  <span class="token number">2020</span> sbin -<span class="token operator">&gt;</span> usr/sbin
drwxr-xr-x.   <span class="token number">2</span> root root     <span class="token number">6</span> Apr <span class="token number">11</span>  <span class="token number">2018</span> srv
dr-xr-xr-x.  <span class="token number">13</span> root root     <span class="token number">0</span> May <span class="token number">12</span> 00:33 sys
drwxrwxrwt.   <span class="token number">7</span> root root   <span class="token number">132</span> Nov <span class="token number">13</span>  <span class="token number">2020</span> tmp
drwxr-xr-x.  <span class="token number">13</span> root root   <span class="token number">155</span> Nov <span class="token number">13</span>  <span class="token number">2020</span> usr
drwxr-xr-x.  <span class="token number">18</span> root root   <span class="token number">238</span> Nov <span class="token number">13</span>  <span class="token number">2020</span> var
<span class="token builtin class-name">pwd</span>			<span class="token comment"># \u8FD9\u91CC\u53EF\u4EE5\u8F93\u5165\u547D\u4EE4</span>
/

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container ps</span>
CONTAINER ID   IMAGE      COMMAND       CREATED         STATUS         PORTS     NAMES
529a4f7bd34a   centos:7   <span class="token string">&quot;/bin/bash&quot;</span>   <span class="token number">4</span> seconds ago   Up <span class="token number">4</span> seconds             dreamy_euler

<span class="token comment"># cat\u5F00\u542F\u8F93\u5165\u529F\u80FD\uFF0C\u652F\u6301</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run -i centos:7 cat</span>
hello		<span class="token comment"># \u6211\u8F93\u5165\u7684</span>
hello
world<span class="token operator">!</span>		<span class="token comment"># \u6211\u8F93\u5165\u7684</span>
world<span class="token operator">!</span>

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container ps</span>
CONTAINER ID   IMAGE      COMMAND   CREATED          STATUS          PORTS     NAMES
58704e3b1ad7   centos:7   <span class="token string">&quot;cat&quot;</span>     <span class="token number">27</span> seconds ago   Up <span class="token number">26</span> seconds             thirsty_sammet

<span class="token comment"># ls\u5F00\u542F\u8F93\u5165\u529F\u80FD\uFF0C\u4E0D\u652F\u6301</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run -i centos:7 ls</span>
anaconda-post.log
bin
dev
etc
home
lib
lib64
media
mnt
opt
proc
root
run
sbin
srv
sys
tmp
usr
var
</code></pre></div></details><details class="custom-container details"><summary>\u5BB9\u5668\u4E0D\u9000\u51FA\u8F85\u52A9\u547D\u4EE4</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u4F18\u53161\uFF1A\u6DFB\u52A0-t\u53C2\u6570\uFF0C\u610F\u601D\u662F\u4E3A\u6211\u4EEC\u5206\u914D\u4E00\u4E2A\u4F2A\u7EC8\u7AEFtty,\u901A\u5E38-it\u8FD9\u4E24\u4E2A\u53C2\u6570\u4E00\u8D77\u7528</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run -it centos:7</span>
<span class="token punctuation">[</span>root@ed41df8e2e3b /<span class="token punctuation">]</span><span class="token comment"># hostname</span>
ed41df8e2e3b

<span class="token comment"># \u4F18\u53162\uFF1A\u4F7F\u7528-d\u53C2\u6570\uFF0C\u610F\u601D\u662F\u4EE5\u540E\u53F0\u65B9\u5F0F\u8FD0\u884C\u5BB9\u5668\u5E76\u8FD4\u56DE\u5BB9\u5668\u7684ID</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run -itd centos:7		# -it\u7528\u6765hang\u4F4F\u5BB9\u5668</span>
d06b76d850c934bfe02785bbd52045694b238f6d40677d1f8eebf7738c07e718

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run -d nginx:1.21.6	# nginx\u955C\u50CF\u4E0D\u9700\u8981hang\u4F4F\u5BB9\u5668\uFF0C\u6240\u4EE5\u53EF\u4EE5\u4E0D\u7528\u52A0-it</span>
00b757bf7358ea24b7b17a0f775f3aadb29d268f531d7a87c373747a07cbb3e3
</code></pre></div></details><h4 id="\u8BBE\u7F6E\u540D\u79F0" tabindex="-1"><a class="header-anchor" href="#\u8BBE\u7F6E\u540D\u79F0" aria-hidden="true">#</a> \u8BBE\u7F6E\u540D\u79F0</h4><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u9ED8\u8BA4Docker\u4F1A\u968F\u673A\u5206\u914D\u540D\u79F0\u7ED9\u65B0\u521B\u5EFA\u7684\uFF0C\u8FD9\u65F6\u5019\u6211\u4EEC\u53EF\u4EE5\u624B\u52A8\u6307\u5B9A\u4E00\u4E2A\u540D\u79F0</span>
<span class="token comment"># \u597D\u5904\u662F\u4EE5\u540E\u64CD\u4F5C\u5BB9\u5668\u65F6\u53EF\u4EE5\u4F7F\u7528\u6211\u4EEC\u6307\u5B9A\u7684\u540D\u79F0\uFF0C\u66F4\u52A0\u65B9\u4FBF\uFF0C\u800C\u4E0D\u662F\u4F7F\u7528Container ID\u6216\u968F\u673A\u540D\u79F0</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run -itd --name mycentos centos:7</span>
c873d90fc350e4218779addc24be5309948010058e397bfd2b4f3845f114d237

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container ps</span>
CONTAINER ID   IMAGE      COMMAND       CREATED              STATUS              PORTS     NAMES
c873d90fc350   centos:7   <span class="token string">&quot;/bin/bash&quot;</span>   About a minute ago   Up About a minute             mycentos <span class="token comment"># \u6211\u4EEC\u6307\u5B9A\u7684\u540D\u79F0</span>

<span class="token comment"># \u7ED9\u5BB9\u5668\u5185\u7684centos\u7CFB\u7EDF\u8BBE\u7F6E\u4E00\u4E2A\u4E3B\u673A\u540D\uFF0C\u5E76\u8FD0\u884Chostname\u547D\u4EE4\uFF08\u66FF\u6362\u9ED8\u8BA4\u7684/bin/bash\uFF09</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run -it --name webserver --hostname node1 centos:7 hostname</span>
node1
</code></pre></div><h4 id="\u8FDB\u5165\u5BB9\u5668" tabindex="-1"><a class="header-anchor" href="#\u8FDB\u5165\u5BB9\u5668" aria-hidden="true">#</a> \u8FDB\u5165\u5BB9\u5668</h4><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># exec\u5B50\u547D\u4EE4\uFF1A\u5728\u5BB9\u5668\u4E2D\u8FD0\u884C\u6307\u5B9A\u7684\u547D\u4EE4\uFF0C\u5728\u8FD9\u91CC\u6211\u4EEC\u6267\u884C\u7684\u547D\u4EE4\u662Fsh\uFF0C\u5E76\u6DFB\u52A0-it\uFF0Chang\u4F4F\u5BB9\u5668</span>
<span class="token comment"># \u5C31\u7B49\u540C\u4E8E\u53D8\u76F8\u7684\u8FDB\u5165\u4E86\u5BB9\u5668</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run -itd centos:7 </span>
7f8576596e250e160f991e38852f9350a12fc244a52563a2a39ef968f375e799
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker exec -it 7f8576 sh</span>
sh-4.2<span class="token comment"># ps aux</span>
<span class="token environment constant">USER</span>        PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root          <span class="token number">1</span>  <span class="token number">0.2</span>  <span class="token number">0.0</span>  <span class="token number">11828</span>  <span class="token number">1652</span> pts/0    Ss+  06:12   <span class="token number">0</span>:00 /bin/bash		<span class="token comment"># \u8FD9\u662Fhang\u4F4F\u5BB9\u5668\u7684\u90A3\u4E2A\u8FDB\u7A0B</span>
root         <span class="token number">14</span>  <span class="token number">0.3</span>  <span class="token number">0.0</span>  <span class="token number">11824</span>  <span class="token number">1656</span> pts/1    Ss   06:12   <span class="token number">0</span>:00 <span class="token function">sh</span>			<span class="token comment"># \u8FD9\u662F\u6211\u4EEC\u65B0\u5F00\u7684\u8FDB\u7A0Bsh</span>
root         <span class="token number">20</span>  <span class="token number">0.0</span>  <span class="token number">0.0</span>  <span class="token number">51732</span>  <span class="token number">1700</span> pts/1    R+   06:12   <span class="token number">0</span>:00 <span class="token function">ps</span> aux		<span class="token comment"># \u521A\u624D\u6267\u884C\u7684\u547D\u4EE4</span>
sh-4.2<span class="token comment"># </span>

<span class="token comment"># attach\u5B50\u547D\u4EE4\uFF1A\u76F4\u63A5\u8FDB\u5165\u542F\u52A8\u5BB9\u5668\u7684\u7EC8\u7AEF\uFF0C\u4E0D\u4F1A\u542F\u52A8\u65B0\u7684\u8FDB\u7A0B</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker attach 7f8576</span>
<span class="token punctuation">[</span>root@7f8576596e25 /<span class="token punctuation">]</span><span class="token comment"># ps aux</span>
<span class="token environment constant">USER</span>        PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root          <span class="token number">1</span>  <span class="token number">0.1</span>  <span class="token number">0.0</span>  <span class="token number">11828</span>  <span class="token number">1880</span> pts/0    Ss   06:17   <span class="token number">0</span>:00 /bin/bash		<span class="token comment"># \u76F4\u63A5\u8FDB\u5165\u5230\u8FD9\u4E2A\u7EC8\u7AEF\u4E2D</span>
root         <span class="token number">15</span>  <span class="token number">0.0</span>  <span class="token number">0.0</span>  <span class="token number">51732</span>  <span class="token number">1704</span> pts/0    R+   06:17   <span class="token number">0</span>:00 <span class="token function">ps</span> aux
<span class="token comment"># \u8FD9\u65F6\u5019\u5982\u679C\u6211\u4EEC\u4F7F\u7528Ctrl+D\u6216exit\u547D\u4EE4\u9000\u51FA\uFF0C\u4F1A\u5BFC\u81F4\u5BB9\u5668\u9000\u51FA</span>
<span class="token punctuation">[</span>root@6dc924686c87 /<span class="token punctuation">]</span><span class="token comment">#</span>
</code></pre></div><h4 id="\u91CD\u542F\u7B56\u7565" tabindex="-1"><a class="header-anchor" href="#\u91CD\u542F\u7B56\u7565" aria-hidden="true">#</a> \u91CD\u542F\u7B56\u7565</h4>`,11),N=s("\u6587\u6863\uFF1A"),E={href:"https://docs.docker.com/engine/reference/run/#restart-policies---restart",target:"_blank",rel:"noopener noreferrer"},M=s("https://docs.docker.com/engine/reference/run/#restart-policies---restart"),D=e(`<p><code>docker container run</code>\u521B\u5EFA\u5BB9\u5668\u65F6\u53EF\u4EE5\u6307\u5B9A\u5BB9\u5668\u7684\u91CD\u542F\u7B56\u7565\uFF0C\u610F\u601D\u662F\u5F53\u5BB9\u5668\u5173\u95ED\u65F6\u662F\u5426\u81EA\u52A8\u91CD\u542F</p><p><strong>\u91CD\u542F\u7B56\u7565</strong></p><table><thead><tr><th>\u7B56\u7565</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td>no</td><td>\u4E0D\u81EA\u52A8\u91CD\u542F\uFF08\u9ED8\u8BA4\u7B56\u7565\uFF09</td></tr><tr><td>always</td><td>\u9000\u51FA\u7801\u4E0D\u4E3A0\u65F6\u81EA\u52A8\u91CD\u542F\uFF1B<br>\u5F53\u91CD\u542Fdocker daemon\u540E\u82E5\u5BB9\u5668\u4E3A\u505C\u6B62\u72B6\u6001\u5219\u4F1A\u81EA\u52A8\u91CD\u542F\u5BB9\u5668</td></tr><tr><td>unless-stopped</td><td>\u9000\u51FA\u7801\u4E0D\u4E3A0\u65F6\u81EA\u52A8\u91CD\u542F\uFF1B<br>\u5F53\u91CD\u542Fdocker daemon\u540E\u82E5\u5BB9\u5668\u4E3A\u505C\u6B62\u72B6\u6001\u4E0D\u4F1A\u81EA\u52A8\u91CD\u542F\u5BB9\u5668</td></tr><tr><td>on-failure[:max-retries]</td><td>\u9000\u51FA\u7801\u4E0D\u4E3A0\u65F6\u81EA\u52A8\u91CD\u542F\uFF1Bmax-retries\u662F\u53EF\u9009\u53C2\u6570\uFF0C\u6700\u591A\u91CD\u542F\u6B21\u6570</td></tr></tbody></table><p><strong>\u9000\u51FA\u72B6\u6001\u7801</strong></p><table><thead><tr><th>\u72B6\u6001\u7801</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td>0</td><td>\u5BB9\u5668\u6B63\u5E38\u9000\u51FA</td></tr><tr><td>125</td><td>Docker daemon\u8FDB\u7A0B\u9519\u8BEF</td></tr><tr><td>126</td><td>\u5BB9\u5668\u542F\u52A8\u540E\u8981\u6267\u884C\u7684\u547D\u4EE4\u65E0\u6CD5\u8C03\u7528</td></tr><tr><td>127</td><td>\u5BB9\u5668\u542F\u52A8\u540E\u8981\u6267\u884C\u7684\u547D\u4EE4\u65E0\u6CD5\u627E\u5230</td></tr><tr><td>\u5176\u4ED6\u72B6\u6001\u7801</td><td>\u5BB9\u5668\u542F\u52A8\u540E\u6267\u884C\u7684\u547D\u4EE4\u9000\u51FA\u7801</td></tr></tbody></table><p><span style="color:red;font-weight:bold;">\u91CD\u8981\u63D0\u793A\uFF1A</span></p><ul><li><span style="color:red;font-weight:bold;">\u5F53\u9000\u51FA\u7801\u4E3A0\u65F6\uFF0C\u4EFB\u4F55\u91CD\u542F\u7B56\u7565\u90FD\u4E0D\u4F1A\u91CD\u542F\u5BB9\u5668</span></li><li><span style="color:red;font-weight:bold;">docker container stop\u5173\u95ED\u7684\u5BB9\u5668\u9000\u51FA\u7801\u4E3A0</span></li></ul><details class="custom-container details"><summary>\u67E5\u770B\u5BB9\u5668\u7684\u91CD\u542F\u7B56\u7565\u4FE1\u606F</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u968F\u4FBF\u542F\u52A8\u4E00\u4E2A\u5BB9\u5668</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run --name demo centos:7 echo $(date +&quot;%F&quot;)</span>
<span class="token number">2022</span>-05-12

<span class="token comment"># \u67E5\u770B\u72B6\u6001</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container inspect demo | grep -A 13 State</span>
        <span class="token string">&quot;State&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;Status&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;exited&quot;</span>,		<span class="token comment"># \u5BB9\u5668\u72B6\u6001</span>
            <span class="token string">&quot;Running&quot;</span><span class="token builtin class-name">:</span> false,		<span class="token comment"># \u662F\u5426\u6B63\u5728\u8FD0\u884C</span>
            <span class="token string">&quot;Paused&quot;</span><span class="token builtin class-name">:</span> false,		
            <span class="token string">&quot;Restarting&quot;</span><span class="token builtin class-name">:</span> false,
            <span class="token string">&quot;OOMKilled&quot;</span><span class="token builtin class-name">:</span> false,
            <span class="token string">&quot;Dead&quot;</span><span class="token builtin class-name">:</span> false,
            <span class="token string">&quot;Pid&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
            <span class="token string">&quot;ExitCode&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,			<span class="token comment"># \u9000\u51FA\u7801</span>
            <span class="token string">&quot;Error&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
            <span class="token string">&quot;StartedAt&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2022-05-12T07:44:42.871097747Z&quot;</span>,	<span class="token comment"># \u5BB9\u5668\u5F00\u59CB\u8FD0\u884C\u65F6\u95F4</span>
            <span class="token string">&quot;FinishedAt&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2022-05-12T07:44:42.882166096Z&quot;</span>	<span class="token comment"># \u5BB9\u5668\u7ED3\u675F\u8FD0\u884C\u65F6\u95F4</span>
        <span class="token punctuation">}</span>,
        <span class="token string">&quot;Image&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;sha256:eeb6ee3f44bd0b5103bb561b4c16bcb82328cfe5809ab675bb17ab3a16c517c9&quot;</span>,
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container inspect demo -f &quot;{{ .State.Status }}&quot;	# \u60F3\u770B\u67D0\u4E00\u4E2A\u503C\u7684\u8BDD\u53EF\u4EE5\u4F7F\u7528Go\u6A21\u677F\u8BED\u6CD5</span>
exited

<span class="token comment"># \u67E5\u770B\u91CD\u542F\u6B21\u6570</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container inspect demo -f &quot;{{ .RestartCount }}&quot;</span>
<span class="token number">0</span>
</code></pre></div></details><details class="custom-container details"><summary>always\u91CD\u542F\u7B56\u7565</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u542F\u52A8\u4E00\u4E2A\u5BB9\u5668</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run --name webserver -P -d --restart=always nginx:1.21.6</span>

<span class="token comment"># \u67E5\u770B\u5BB9\u5668</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container ps</span>
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS                                     NAMES
6d463a44eedc   nginx:1.21.6   <span class="token string">&quot;/docker-entrypoint.\u2026&quot;</span>   <span class="token number">4</span> seconds ago   Up <span class="token number">3</span> seconds   <span class="token number">0.0</span>.0.0:49153-<span class="token operator">&gt;</span><span class="token number">80</span>/tcp, :::49153-<span class="token operator">&gt;</span><span class="token number">80</span>/tcp   webserver

<span class="token comment"># -----------------------------------------------------------------------------------------------</span>

<span class="token comment"># \u505C\u6B62\u5BB9\u5668</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container stop webserver</span>
webserver

<span class="token comment"># \u67E5\u770B\u662F\u5426\u81EA\u52A8\u91CD\u542F\u4E86\uFF1A\u6CA1\u6709\u81EA\u52A8\u91CD\u542F</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container ps</span>
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
<span class="token comment"># \u67E5\u770B\u9000\u51FA\u7801</span>
<span class="token comment"># \u4F7F\u7528docker container stop\u505C\u6B62\u7684\u5BB9\u5668\uFF0C\u9000\u51FA\u7801\u4E3A0\uFF0C\u5373\u4F7F\u8BBE\u7F6Ealways\u4E5F\u4E0D\u4F1A\u81EA\u52A8\u91CD\u542F</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container inspect webserver -f &quot;{{ .State.ExitCode }}&quot;</span>
<span class="token number">0</span>

<span class="token comment"># \u91CD\u542F\u4E00\u4E0BDocker Engine</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># systemctl restart docker.service</span>

<span class="token comment"># \u67E5\u770B\u5BB9\u5668\uFF0C\u81EA\u52A8\u91CD\u542F\u4E86</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container ps</span>
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS          PORTS                                     NAMES
6d463a44eedc   nginx:1.21.6   <span class="token string">&quot;/docker-entrypoint.\u2026&quot;</span>   <span class="token number">3</span> minutes ago   Up <span class="token number">13</span> seconds   <span class="token number">0.0</span>.0.0:49153-<span class="token operator">&gt;</span><span class="token number">80</span>/tcp, :::49153-<span class="token operator">&gt;</span><span class="token number">80</span>/tcp   webserver

<span class="token comment"># \u67E5\u770B\u91CD\u542F\u6B21\u6570</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container inspect webserver -f &quot;{{ .RestartCount }}&quot;</span>
<span class="token number">0</span>

<span class="token comment"># -----------------------------------------------------------------------------------------------</span>

<span class="token comment"># \u624B\u52A8kill\u6389</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container inspect webserver -f &quot;{{ .State.Pid }}&quot;</span>
<span class="token number">35940</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># kill -15 35940</span>

<span class="token comment"># \u67E5\u770B\u5BB9\u5668\uFF0C\u81EA\u52A8\u91CD\u542F\u4E86</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container ps</span>
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS                                     NAMES
6d463a44eedc   nginx:1.21.6   <span class="token string">&quot;/docker-entrypoint.\u2026&quot;</span>   <span class="token number">5</span> minutes ago   Up <span class="token number">3</span> seconds   <span class="token number">0.0</span>.0.0:49154-<span class="token operator">&gt;</span><span class="token number">80</span>/tcp, :::49154-<span class="token operator">&gt;</span><span class="token number">80</span>/tcp   webserver

<span class="token comment"># \u67E5\u770B\u91CD\u542F\u6B21\u6570</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container inspect webserver -f &quot;{{ .RestartCount }}&quot;</span>
<span class="token number">1</span>
<span class="token comment"># \u68C0\u67E5Pid</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container inspect webserver -f &quot;{{ .State.Pid }}&quot;</span>
<span class="token number">36630</span>
</code></pre></div></details><details class="custom-container details"><summary>unless-stopped\u91CD\u542F\u7B56\u7565</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u542F\u52A8\u4E00\u4E2A\u5BB9\u5668</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run --name webserver -P -d --restart=unless-stopped nginx:1.21.6</span>

<span class="token comment"># \u67E5\u770B\u5BB9\u5668</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container ps</span>
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS                                     NAMES
cd6c29a9928c   nginx:1.21.6   <span class="token string">&quot;/docker-entrypoint.\u2026&quot;</span>   <span class="token number">5</span> seconds ago   Up <span class="token number">4</span> seconds   <span class="token number">0.0</span>.0.0:49155-<span class="token operator">&gt;</span><span class="token number">80</span>/tcp, :::49155-<span class="token operator">&gt;</span><span class="token number">80</span>/tcp   webserver

<span class="token comment"># -----------------------------------------------------------------------------------------------</span>

<span class="token comment"># \u505C\u6B62\u5BB9\u5668</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container stop webserver</span>
webserver

<span class="token comment"># \u67E5\u770B\u662F\u5426\u81EA\u52A8\u91CD\u542F\u4E86\uFF1A\u6CA1\u6709\u81EA\u52A8\u91CD\u542F</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container ps</span>
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
<span class="token comment"># \u67E5\u770B\u9000\u51FA\u7801</span>
<span class="token comment"># \u4F7F\u7528docker container stop\u505C\u6B62\u7684\u5BB9\u5668\uFF0C\u9000\u51FA\u7801\u4E3A0\uFF0C\u5373\u4F7F\u8BBE\u7F6Ealways\u4E5F\u4E0D\u4F1A\u81EA\u52A8\u91CD\u542F</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container inspect webserver -f &quot;{{ .State.ExitCode }}&quot;</span>
<span class="token number">0</span>

<span class="token comment"># \u91CD\u542F\u4E00\u4E0BDocker Engine</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># systemctl restart docker.service</span>

<span class="token comment"># \u67E5\u770B\u5BB9\u5668\uFF0C\u6CA1\u6709\u81EA\u52A8\u91CD\u542F</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container ps</span>
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS          PORTS                                     NAMES

<span class="token comment"># \u67E5\u770B\u91CD\u542F\u6B21\u6570</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container inspect webserver -f &quot;{{ .RestartCount }}&quot;</span>
<span class="token number">0</span>
<span class="token comment"># -----------------------------------------------------------------------------------------------</span>
<span class="token comment"># \u628A\u5BB9\u5668\u8D77\u8D77\u6765</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container start webserver</span>
webserver

<span class="token comment"># \u624B\u52A8kill\u6389</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container inspect webserver -f &quot;{{ .State.Pid }}&quot;</span>
<span class="token number">37428</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># kill -15 37428</span>

<span class="token comment"># \u67E5\u770B\u5BB9\u5668\uFF0C\u81EA\u52A8\u91CD\u542F\u4E86</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container ps</span>
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS                                     NAMES
458b89dd302e   nginx:1.21.6   <span class="token string">&quot;/docker-entrypoint.\u2026&quot;</span>   <span class="token number">2</span> minutes ago   Up <span class="token number">3</span> seconds   <span class="token number">0.0</span>.0.0:49154-<span class="token operator">&gt;</span><span class="token number">80</span>/tcp, :::49154-<span class="token operator">&gt;</span><span class="token number">80</span>/tcp   webserver

<span class="token comment"># \u67E5\u770B\u91CD\u542F\u6B21\u6570</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container inspect webserver -f &quot;{{ .RestartCount }}&quot;</span>
<span class="token number">1</span>
<span class="token comment"># \u68C0\u67E5Pid</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container inspect webserver -f &quot;{{ .State.Pid }}&quot;</span>
<span class="token number">37591</span>
</code></pre></div></details><details class="custom-container details"><summary>\u5176\u4ED6\uFF1A\u6784\u5EFA\u4E00\u4E2A\u81EA\u7531\u63A7\u5236\u9000\u51FA\u7801\u7684\u955C\u50CF</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># Dockerfile</span>
<span class="token comment"># \u53EF\u4EE5\u901A\u8FC7docker container run\u7684\u65F6\u5019\u4F20\u53C2\u8986\u76D6CMD\u6307\u4EE4\u6765\u63A7\u5236\u5BB9\u5668\u9000\u51FA\u7801</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat Dockerfile </span>
FROM centos:7
MAINTAINER VVFock3r
WORKDIR /

RUN <span class="token builtin class-name">echo</span> <span class="token string">&quot;#!/bin/bash&quot;</span> <span class="token operator">&gt;</span> exit.sh <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\\</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;exit \\<span class="token variable">$1</span>&quot;</span>   <span class="token operator">&gt;&gt;</span> exit.sh <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\\</span>
    <span class="token function">chmod</span> <span class="token number">755</span> exit.sh

ENTRYPOINT <span class="token punctuation">[</span><span class="token string">&quot;./exit.sh&quot;</span><span class="token punctuation">]</span>
CMD <span class="token punctuation">[</span><span class="token string">&quot;0&quot;</span><span class="token punctuation">]</span>

<span class="token comment"># \u6784\u5EFA\u955C\u50CF centos:demo</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker build -t centos:demo .</span>
Sending build context to Docker daemon     16MB
Step <span class="token number">1</span>/6 <span class="token builtin class-name">:</span> FROM centos:7
 ---<span class="token operator">&gt;</span> eeb6ee3f44bd
Step <span class="token number">2</span>/6 <span class="token builtin class-name">:</span> MAINTAINER VVFock3r
 ---<span class="token operator">&gt;</span> Using cache
 ---<span class="token operator">&gt;</span> f7cea628e420
Step <span class="token number">3</span>/6 <span class="token builtin class-name">:</span> WORKDIR /
 ---<span class="token operator">&gt;</span> Using cache
 ---<span class="token operator">&gt;</span> 07f0b2f933b5
Step <span class="token number">4</span>/6 <span class="token builtin class-name">:</span> RUN <span class="token builtin class-name">echo</span> <span class="token string">&quot;#!/bin/bash&quot;</span> <span class="token operator">&gt;</span> exit.sh <span class="token operator">&amp;&amp;</span>     <span class="token builtin class-name">echo</span> <span class="token string">&quot;exit \\<span class="token variable">$1</span>&quot;</span>   <span class="token operator">&gt;&gt;</span> exit.sh <span class="token operator">&amp;&amp;</span>     <span class="token function">chmod</span> <span class="token number">755</span> exit.sh
 ---<span class="token operator">&gt;</span> Using cache
 ---<span class="token operator">&gt;</span> 7ba25d2264cc
Step <span class="token number">5</span>/6 <span class="token builtin class-name">:</span> ENTRYPOINT <span class="token punctuation">[</span><span class="token string">&quot;./exit.sh&quot;</span><span class="token punctuation">]</span>
 ---<span class="token operator">&gt;</span> Using cache
 ---<span class="token operator">&gt;</span> b2385bbe65e4
Step <span class="token number">6</span>/6 <span class="token builtin class-name">:</span> CMD <span class="token punctuation">[</span><span class="token string">&quot;0&quot;</span><span class="token punctuation">]</span>
 ---<span class="token operator">&gt;</span> Using cache
 ---<span class="token operator">&gt;</span> 268bb0cf0753
Successfully built 268bb0cf0753
Successfully tagged centos:demo

<span class="token comment"># \u521B\u5EFA\u5BB9\u5668</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run --name demo -d --restart=always centos:demo 99 # \u8BBE\u7F6E\u9000\u51FA\u7801\u4E3A99</span>
</code></pre></div></details><h4 id="\u81EA\u52A8\u5220\u9664" tabindex="-1"><a class="header-anchor" href="#\u81EA\u52A8\u5220\u9664" aria-hidden="true">#</a> \u81EA\u52A8\u5220\u9664</h4><p>\u6211\u4EEC\u53EF\u4EE5\u63A7\u5236\u5BB9\u5668\u9000\u51FA\u540E\u81EA\u52A8\u5220\u9664\uFF0C\u6CE8\u610F\u4E0E<code>--restart</code>\u9009\u9879\u4E92\u65A5</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u542F\u52A83\u4E2A\u5BB9\u5668</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker run -itd --rm --name demo1 centos:7</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker run -itd --rm --name demo2 centos:7</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker run -itd --rm --name demo3 centos:7 ls</span>

<span class="token comment"># \u505C\u6B62\u7B2C\u4E00\u4E2A\u5BB9\u5668\uFF08\u9000\u51FA\u7801\u4E3A0\uFF09</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container stop demo1</span>

<span class="token comment"># \u505C\u6B62\u7B2C\u4E8C\u4E2A\u5BB9\u5668\uFF08\u9000\u51FA\u7801\u4E0D\u4E3A0\uFF09</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># kill -9 \`docker container inspect demo2 -f &quot;{{ .State.Pid }}&quot;\`</span>

<span class="token comment"># \u7B2C\u4E09\u4E2A\u5BB9\u5668\u8FD0\u884C\u5B8C\u6210\uFF0C\u81EA\u52A8\u4F1A\u88AB\u5220\u9664</span>

<span class="token comment"># \u67E5\u770B\u5BB9\u5668\uFF08\u5DF2\u5168\u90E8\u88AB\u5220\u9664\uFF09</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container ps -a</span>
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
</code></pre></div><h3 id="docker\u955C\u50CF" tabindex="-1"><a class="header-anchor" href="#docker\u955C\u50CF" aria-hidden="true">#</a> Docker\u955C\u50CF</h3><h4 id="\u4FEE\u6539\u955C\u50CF\u6E90" tabindex="-1"><a class="header-anchor" href="#\u4FEE\u6539\u955C\u50CF\u6E90" aria-hidden="true">#</a> \u4FEE\u6539\u955C\u50CF\u6E90</h4>`,16),O=s("\u4F7F\u7528Docker\u65F6\u9700\u8981\u9996\u5148\u4E0B\u8F7D\u4E00\u4E2A\u5B98\u65B9\u955C\u50CF\uFF0C\u4F8B\u5982"),I=n("code",null,"ubuntu",-1),T=s("\u3001"),S=n("code",null,"mysql",-1),P=s("\uFF0C\u9ED8\u8BA4\u4F1A\u4ECE"),C={href:"https://hub.docker.com/",target:"_blank",rel:"noopener noreferrer"},U=s("Docker Hub"),L=s("\u4E2D\u53BB\u4E0B\u8F7D"),G=e(`<p>\u7136\u800C\u7531\u4E8E\u7F51\u7EDC\u539F\u56E0\uFF0C\u4E0B\u8F7D\u4E00\u4E2ADocker\u5B98\u65B9\u955C\u50CF\u53EF\u80FD\u4F1A\u9700\u8981\u5F88\u957F\u7684\u65F6\u95F4\uFF0C\u751A\u81F3\u4E0B\u8F7D\u5931\u8D25\u3002\u4E3A\u6B64\uFF0C\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528\u56FD\u5185\u7684\u955C\u50CF\u6E90</p><p>\u817E\u8BAF\u4E91\u955C\u50CF\u6E90\uFF1Ahttps://mirrors.cloud.tencent.com/\uFF08\u70B9\u53F3\u4E0A\u89D2\u3010\u6587\u6863\u3011\uFF0C\u5728\u53F3\u4FA7\u627E\u5230Docker\u6E90\uFF09</p><p>\u963F\u91CC\u4E91\u955C\u50CF\u6E90\uFF1Ahttps://help.aliyun.com/document_detail/60750.html\uFF08\u6839\u636E\u6587\u6863\u53BB\u63A7\u5236\u53F0\u7533\u8BF7\u52A0\u901F\u5730\u5740\uFF09</p><h4 id="\u955C\u50CF\u7684\u5206\u5C42\u7ED3\u6784" tabindex="-1"><a class="header-anchor" href="#\u955C\u50CF\u7684\u5206\u5C42\u7ED3\u6784" aria-hidden="true">#</a> \u955C\u50CF\u7684\u5206\u5C42\u7ED3\u6784</h4><p>\u955C\u50CF\u5176\u5B9E\u5C31\u662F\u4E00\u4E2A<code>tar</code>\u6587\u4EF6\uFF0C\u5185\u90E8\u91C7\u7528\u7684\u662F\u5206\u5C42\u7ED3\u6784\uFF0C\u6BCF\u4E00\u5C42\uFF08Layer\uFF09\u5B58\u50A8\u7684\u53EA\u662F\u4E0E\u4E0A\u4E00\u5C42\u7684\u5DEE\u5F02\uFF0C\u7531<code>Storage Driver</code>\uFF08\u5B58\u50A8\u9A71\u52A8\u7A0B\u5E8F\uFF09\u8FDB\u884C\u7BA1\u7406</p><p><code>Storage Driver</code>\u4F1A\u628A\u955C\u50CF\u4E2D\u7684\u6BCF\u4E00\u5C42\u6302\u8F7D\u4E3A\u53EA\u8BFB\u6A21\u5F0F\uFF0C\u901A\u5E38\u79F0\u4E3A \u955C\u50CF\u5C42\uFF0C\u5F53\u6211\u4EEC\u521B\u5EFA\u5BB9\u5668\u65F6\uFF0C\u4F1A\u5728\u955C\u50CF\u5C42\u4E0A\u52A0\u4E00\u4E2A\u65B0\u7684\u53EF\u5199\u7684\u5206\u5C42\uFF0C\u901A\u5E38\u79F0\u4E3A\u5BB9\u5668\u5C42</p><p><strong>\u5BB9\u5668\u5C42\u64CD\u4F5C\u7EC6\u8282</strong></p><ul><li>\u6DFB\u52A0\u6587\u4EF6\uFF1A\u5728\u5BB9\u5668\u4E2D\u521B\u5EFA\u6587\u4EF6\u65F6\uFF0C\u65B0\u7684\u6587\u4EF6\u88AB\u6DFB\u52A0\u5230\u5BB9\u5668\u5C42</li><li>\u8BFB\u53D6\u6587\u4EF6\uFF1A\u5728\u5BB9\u5668\u4E2D\u8BFB\u53D6\u6587\u4EF6\u65F6\uFF0CDocker\u4F1A\u4ECE\u4E0A\u5F80\u4E0B\u4F9D\u6B21\u5728\u5404\u5C42\u4E2D\u67E5\u627E\u6B64\u6587\u4EF6\uFF0C\u4E00\u65E6\u627E\u5230\uFF0C\u6253\u5F00\u5E76\u8BFB\u5165\u5185\u5B58</li><li>\u4FEE\u6539\u6587\u4EF6\uFF1A\u5728\u5BB9\u5668\u4E2D\u4FEE\u6539\u6587\u4EF6\u65F6\uFF0CDocker\u4F1A\u4ECE\u4E0A\u5F80\u4E0B\u4F9D\u6B21\u5728\u5404\u5C42\u4E2D\u67E5\u627E\u6B64\u6587\u4EF6\uFF0C\u4E00\u65E6\u627E\u5230\uFF0C\u7ACB\u5373\u5C06\u5176\u590D\u5236\u5230\u5BB9\u5668\u5C42\uFF0C\u7136\u540E\u4FEE\u6539\u4E4B</li><li>\u5220\u9664\u6587\u4EF6\uFF1A\u5728\u5BB9\u5668\u4E2D\u5220\u9664\u6587\u4EF6\u65F6\uFF0CDocker\u4F1A\u4ECE\u4E0A\u5F80\u4E0B\u4F9D\u6B21\u5728\u5404\u5C42\u4E2D\u67E5\u627E\u6B64\u6587\u4EF6\uFF0C\u4E00\u65E6\u627E\u5230\uFF0C\u4F1A\u5728\u5BB9\u5668\u5C42\u4E2D\u6807\u8BB0\u4E3A\u5DF2\u5220\u9664</li></ul><p>\u53EA\u6709\u5F53\u4FEE\u6539\u65F6\u624D\u590D\u5236\u4E00\u4EFD\u6570\u636E\uFF0C\u8FD9\u79CD\u7279\u6027\u88AB\u79F0\u4E3A<code>Copy-on-Write</code></p><p><strong>\u67E5\u770B\u5F53\u524DDocker Engine\u6240\u4F7F\u7528\u7684Storage Driver\u7C7B\u578B</strong></p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker info | grep -i storage</span>
 Storage Driver: overlay2
</code></pre></div><p><strong>\u67E5\u770B\u955C\u50CF\u5206\u5C42\u7ED3\u6784</strong></p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u65B9\u5F0F\u4E00\uFF1A\u4E0B\u8F7D\u955C\u50CF\u65F6\u53EF\u4EE5\u770B\u5230\u8BE5\u955C\u50CF\u6709\u51E0\u4E2A\u5206\u5C42</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker image pull nginx:1.21.6</span>
Using default tag: latest
latest: Pulling from library/nginx
1fe172e4850f: Pull complete
35c195f487df: Pull complete
213b9b16f495: Pull complete
a8172d9e19b9: Pull complete
f5eee2cb2150: Pull complete
93e404ba8667: Pull complete
Digest: sha256:859ab6768a6f26a79bc42b231664111317d095a4f04e4b6fe79ce37b3d199097
Status: Downloaded newer image <span class="token keyword">for</span> nginx:latest
docker.io/library/nginx:latest

<span class="token comment"># \u65B9\u5F0F\u4E8C\uFF1A\u67E5\u770B\u5DF2\u5B58\u5728\u7684\u955C\u50CF\u5206\u5C42</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker image inspect nginx:1.21.6 | grep -i layers -A 20</span>
            <span class="token string">&quot;Type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;layers&quot;</span>,
            <span class="token string">&quot;Layers&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
                <span class="token string">&quot;sha256:9c1b6dd6c1e6be9fdd2b1987783824670d3b0dd7ae8ad6f57dc3cea5739ac71e&quot;</span>,
                <span class="token string">&quot;sha256:4b7fffa0f0a4a72b2f901c584c1d4ffb67cce7f033cc7969ee7713995c4d2610&quot;</span>,
                <span class="token string">&quot;sha256:f5ab86d69014270bcf4d5ce819b9f5c882b35527924ffdd11fecf0fc0dde81a4&quot;</span>,
                <span class="token string">&quot;sha256:c876aa251c80272eb01eec011d50650e1b8af494149696b80a606bbeccf03d68&quot;</span>,
                <span class="token string">&quot;sha256:7046505147d7f3edbf7c50c02e697d5450a2eebe5119b62b7362b10662899d85&quot;</span>,
                <span class="token string">&quot;sha256:b6812e8d56d65d296e21a639b786e7e793e8b969bd2b109fd172646ce5ebe951&quot;</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>,
        <span class="token string">&quot;Metadata&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;LastTagTime&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;0001-01-01T00:00:00Z&quot;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span> 
</code></pre></div>`,13),V=s("\u8FD8\u53EF\u4EE5\u901A\u8FC7\u7B2C\u4E09\u65B9\u5DE5\u5177"),W=n("code",null,"dive",-1),B=s("\u6765\u67E5\u770B\u66F4\u5177\u4F53\u4E00\u4E9B\u7684\u4FE1\u606F\uFF0CGithub\uFF1A"),K={href:"https://github.com/wagoodman/dive",target:"_blank",rel:"noopener noreferrer"},Y=s("https://github.com/wagoodman/dive"),F=e(`<p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220510152343911.png" alt="image-20220510152343911"></p><h4 id="\u955C\u50CF\u5BFC\u51FA\u548C\u5BFC\u5165" tabindex="-1"><a class="header-anchor" href="#\u955C\u50CF\u5BFC\u51FA\u548C\u5BFC\u5165" aria-hidden="true">#</a> \u955C\u50CF\u5BFC\u51FA\u548C\u5BFC\u5165</h4><p>\u4E3B\u8981\u6709\u4E24\u7EC4\u547D\u4EE4\uFF1A</p><ul><li>\u955C\u50CF\u5BFC\u51FA\u548C\u5BFC\u5165<code>save</code>\u548C<code>load</code><ul><li><code>docker save</code>\uFF1A\u5BFC\u51FA\u4E00\u4E2A\u6216\u591A\u4E2A\u955C\u50CF\uFF0C\u53C2\u6570\u53EF\u4EE5\u8DDF\u955C\u50CF\u540D\uFF0C\u4E5F\u53EF\u4EE5\u8DDF\u5BB9\u5668\u540D\uFF08\u4F1A\u81EA\u52A8\u5206\u6790\u6240\u4F7F\u7528\u7684\u955C\u50CF\u5E76\u5BFC\u51FA\uFF09</li><li><code>docker load</code>\uFF1A\u5BFC\u5165\u955C\u50CF</li></ul></li><li>\u5BB9\u5668\u6587\u4EF6\u7CFB\u7EDF\u5BFC\u51FA\u548C\u5BFC\u5165<code>export</code>\u548C<code>import</code><ul><li><code>docker export</code>\uFF1A\u5BFC\u51FA\u4E00\u4E2A\u5BB9\u5668\u7684\u6587\u4EF6\u7CFB\u7EDF</li><li><code>docker import</code>\uFF1A\u5BFC\u5165\u6587\u4EF6\u7CFB\u7EDF\u955C\u50CF</li></ul></li></ul><p><strong>\u955C\u50CF\u5BFC\u51FA\u548C\u5BFC</strong></p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u67E5\u770B\u672C\u5730\u955C\u50CF</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker image ls</span>
REPOSITORY    TAG       IMAGE ID       CREATED        SIZE
nginx         <span class="token number">1.21</span>.6    fa5269854a5e   <span class="token number">2</span> weeks ago    142MB

<span class="token comment"># \u5BFC\u51FA\u955C\u50CF</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker image save nginx:1.21.6 -o nginx-1.21.6.tar</span>

<span class="token comment"># \u5220\u9664\u955C\u50CF</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker image rm nginx:1.21.6</span>
Untagged: nginx:1.21.6

<span class="token comment"># \u5BFC\u5165\u955C\u50CF</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker image load -i nginx-1.21.6.tar</span>
Loaded image: nginx:1.21.6
</code></pre></div><p><strong>\u5BB9\u5668\u6587\u4EF6\u7CFB\u7EDF\u5BFC\u51FA\u548C\u5BFC\u5165</strong></p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u542F\u52A8\u4E00\u4E2A\u5BB9\u5668</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run -itd --name webserver nginx:1.21.6 </span>
3bcb02c10189d426e7892afd9fb086148956d720062cf0f42bb45b887aeb8624

<span class="token comment"># \u5199\u5165\u70B9\u6570\u636E</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container exec -it webserver sh</span>
<span class="token comment"># seq 10 &gt; 1.txt</span>
<span class="token comment"># cat 1.txt</span>
<span class="token number">1</span>
<span class="token punctuation">..</span>.
<span class="token number">10</span>

<span class="token comment"># \u67E5\u770B\u5BB9\u5668\uFF0C\u8F93\u51FA\u7ED3\u679C\u4FDD\u5B58\u4E0B\u6765\u540E\u9762\u8981\u7528\u5230</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container inspect webserver &gt; webserver.inspect.txt</span>

<span class="token comment"># \u5BFC\u51FA\u5BB9\u5668\u6587\u4EF6\u7CFB\u7EDF</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container export webserver -o webserver.tar</span>

<span class="token comment"># \u5BFC\u5165\u6587\u4EF6\u7CFB\u7EDF\u4E3A\u955C\u50CF\uFF0Cnginx:webserver\u4E3A\u5BFC\u5165\u540E\u65B0\u955C\u50CF\u7684REPOSITORY\u548CTAG\uFF0C\u53EF\u4EE5\u4E0D\u6307\u5B9A\u4F46\u6700\u597D\u6307\u5B9A\u4E00\u4E0B\uFF0C\u5426\u5219\u4F1A\u663E\u793Anone</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker image import webserver.tar nginx:webserver</span>
sha256:2ee413eebb660f37d31a6ebc696832c09b044499892f68101478182d73e9a24b

<span class="token comment"># \u67E5\u770B\u955C\u50CF</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker image ls</span>
REPOSITORY   TAG         IMAGE ID       CREATED          SIZE
nginx        webserver   2ee413eebb66   <span class="token number">12</span> seconds ago   140MB
nginx        <span class="token number">1.21</span>.6      fa5269854a5e   <span class="token number">2</span> weeks ago      142MB

<span class="token comment"># \u76F4\u63A5\u4F7F\u7528\u65B0\u955C\u50CF\u542F\u52A8\u5BB9\u5668\u4F1A\u62A5\u9519\uFF0C\u56E0\u4E3A\u5BFC\u5165\u7684\u5BB9\u5668\u9700\u8981\u91CD\u65B0\u6307\u5B9A\u5DE5\u4F5C\u76EE\u5F55\u548C\u5F00\u653E\u7684\u7AEF\u53E3\u4EE5\u53CA\u542F\u52A8\u547D\u4EE4</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run -itd --name webserver1 nginx:webserver</span>
docker: Error response from daemon: No <span class="token builtin class-name">command</span> specified.
See <span class="token string">&#39;docker run --help&#39;</span><span class="token builtin class-name">.</span>

<span class="token comment"># \u91CD\u65B0\u542F\u52A8\u955C\u50CF</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run -itd --name webserver2 -w &quot;&quot; --expose 80 --entrypoint &quot;/docker-entrypoint.sh&quot; nginx:webserver nginx -g &#39;daemon off;&#39;</span>
073eb2ac6f29f55c956329bdb12f5d4078c026217e5285a8c6a94ac76e9c4eb0

<span class="token comment"># \u67E5\u770B\u6570\u636E\u662F\u5426\u8FD8\u5B58\u5728</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container exec -it webserver2 sh</span>
<span class="token comment"># cat 1.txt</span>
<span class="token number">1</span>
<span class="token punctuation">..</span>.
<span class="token number">10</span>
</code></pre></div><h4 id="dockerfile-1-\u7B80\u4ECB\u548C\u5E38\u7528\u6307\u4EE4" tabindex="-1"><a class="header-anchor" href="#dockerfile-1-\u7B80\u4ECB\u548C\u5E38\u7528\u6307\u4EE4" aria-hidden="true">#</a> Dockerfile(1):\u7B80\u4ECB\u548C\u5E38\u7528\u6307\u4EE4</h4><p>Dockerrfile\u662F\u4E00\u4E2A\u6587\u672C\u6587\u4EF6\uFF0C\u8BB0\u5F55\u4E86\u6784\u5EFA\u955C\u50CF\u7684\u6240\u6709\u6B65\u9AA4</p>`,10),H=s("\u6587\u6863\uFF1A"),Z={href:"https://docs.docker.com/engine/reference/builder/",target:"_blank",rel:"noopener noreferrer"},z=s("https://docs.docker.com/engine/reference/builder/"),X=e(`<p><strong>\u7F13\u5B58\u7279\u6027</strong></p><p>Dockerrfile\u4E2D\u6BCF\u4E00\u4E2A\u6307\u4EE4\u90FD\u4F1A\u521B\u5EFA\u4E00\u4E2A\u955C\u50CF\u5C42\uFF0C\u4E0A\u5C42\u4F9D\u8D56\u4E8E\u4E0B\u5C42\uFF0Cdocker\u4F1A\u7F13\u5B58\u5DF2\u6709\u7684\u955C\u50CF\u5C42\uFF0C\u5F53\u67D0\u4E00\u5C42\u53D1\u751F\u53D8\u5316\uFF0C\u5176\u4E0A\u9762\u7684\u6240\u6709\u5C42\u90FD\u4F1A\u5931\u6548\uFF0C\u4E5F\u5C31\u662F\u8BF4\u5F53\u6211\u4EEC\u6539\u53D8Dockerfile\u4E2D\u6307\u4EE4\u7684\u6267\u884C\u987A\u5E8F\uFF0C\u6216\u8005\u4FEE\u6539\u6307\u4EE4\uFF0C\u90FD\u4F1A\u4F7F\u4E0A\u9762\u7684\u955C\u50CF\u5C42\u7F13\u5B58\u5931\u6548</p><p><strong>Dockerfile\u5E38\u7528\u6307\u4EE4</strong></p><table><thead><tr><th>\u6307\u4EE4</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td>FROM</td><td>\u6307\u5B9A\u57FA\u7840\u955C\u50CF</td></tr><tr><td>MATAINER</td><td>\u8BBE\u7F6E\u955C\u50CF\u4F5C\u8005\uFF0C\u53EF\u4EE5\u662F\u4EFB\u610F\u5B57\u7B26\u4E32</td></tr><tr><td>ENV</td><td>\u8BBE\u7F6E\u73AF\u5883\u53D8\u91CF</td></tr><tr><td>WORKDIR</td><td>\u4E3A\u540E\u9762\u7684COPY\u3001ADD\u3001RUN\u3001CMD\u3001ENTRYPOINT\u7B49\u8BBE\u7F6E\u5DE5\u4F5C\u76EE\u5F55</td></tr><tr><td>COPY</td><td>\u5C06\u6587\u4EF6\u590D\u5236\u5230\u955C\u50CF</td></tr><tr><td>ADD</td><td>\u5C06\u6587\u4EF6\u590D\u5236\u5230\u955C\u50CF\uFF0C\u5982\u679C\u6587\u4EF6\u662F\u5F52\u6863\u6587\u4EF6\uFF08tar/zip/tgz\u7B49\uFF09\u4F1A\u81EA\u52A8\u89E3\u538B</td></tr><tr><td>EXPOSE</td><td>\u663E\u5F0F\u5730\u6307\u5B9A\u5BB9\u5668\u4E2D\u7684\u8FDB\u7A0B\u4F1A\u76D1\u542C\u67D0\u4E2A\u7AEF\u53E3<br>\uFF081\uFF09\u5E76\u4E0D\u4F1A\u76F4\u63A5\u5C06\u7AEF\u53E3\u81EA\u52A8\u548C\u5BBF\u4E3B\u673A\u67D0\u4E2A\u7AEF\u53E3\u5EFA\u7ACB\u6620\u5C04\u5173\u7CFB<br>\uFF082\uFF09\u5982\u679Cdocker run\u6307\u5B9A-P\u53C2\u6570\uFF08\u81EA\u52A8\u6620\u5C04\uFF09\u4F1A\u5C06\u6240\u6709\u66B4\u9732\u7684\u7AEF\u53E3\u968F\u673A\u6620\u5C04\u5230\u5BBF\u4E3B\u673A\u7684\u9AD8\u9636\u7AEF\u53E3<br>\uFF083\uFF09\u5982\u679Cdocker run \u6307\u5B9A\u4E86--net=host\uFF08\u5BBF\u4E3B\u673A\u6A21\u5F0F\uFF09\uFF0C\u5BB9\u5668\u4E2D EXPOSE \u6307\u4EE4\u66B4\u9732\u7684\u7AEF\u53E3\u4F1A\u76F4\u63A5\u4F7F\u7528\u5BBF\u4E3B\u673A\u5BF9\u5E94\u7684\u7AEF\u53E3</td></tr><tr><td>VOLUME</td><td>\u5C06\u6587\u4EF6\u6216\u76EE\u5F55\u58F0\u660E\u4E3Avolume</td></tr><tr><td>RUN</td><td>\u5728\u5BB9\u5668\u4E2D\u8FD0\u884C\u6307\u5B9A\u7684\u547D\u4EE4\uFF0C\u901A\u5E38\u7528\u4E8E\u5B89\u88C5\u5E94\u7528\u548C\u8F6F\u4EF6\u5305</td></tr><tr><td>ENTRYPOINT</td><td>\u8BBE\u7F6E\u5BB9\u5668\u542F\u52A8\u65F6\u8FD0\u884C\u7684\u547D\u4EE4<br>\uFF082\uFF09CMD\u6216\u4E4B\u540E\u7684\u53C2\u6570\u4F1A\u88AB\u5F53\u505A\u53C2\u6570\u4F20\u9012\u7ED9ENTRYPOINT</td></tr><tr><td>CMD</td><td>\u8BBE\u7F6E\u5BB9\u5668\u542F\u52A8\u65F6\u8FD0\u884C\u7684\u547D\u4EE4<br>\uFF082\uFF09CMD\u547D\u4EE4\u53EF\u4EE5\u88ABdocker run\u4E4B\u540E\u7684\u53C2\u6570\u66FF\u6362</td></tr></tbody></table><h4 id="dockerfile-2-cmd\u548Centrypoint" tabindex="-1"><a class="header-anchor" href="#dockerfile-2-cmd\u548Centrypoint" aria-hidden="true">#</a> Dockerfile(2):CMD\u548CENTRYPOINT</h4><p><strong>\u76F8\u540C\u70B9</strong></p><ul><li><p>\u53EF\u4EE5\u6709\u591A\u4E2ACMD\u6216ENTRYPOINT\u547D\u4EE4\u4F46\u53EA\u6709\u6700\u540E\u4E00\u4E2A\u751F\u6548</p></li><li><p>\u90FD\u652F\u6301Exec\u548CShell\u8BED\u6CD5\u683C\u5F0F</p><details class="custom-container details"><summary>\u4EE5CMD\u6307\u4EE4\u4E3E\u4F8BExec\u548CShell\u683C\u5F0F</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># Exec\u683C\u5F0F</span>
CMD <span class="token punctuation">[</span>\u53EF\u6267\u884C\u7A0B\u5E8F, \u53C2\u65701, \u53C2\u65702, \u53C2\u6570N<span class="token punctuation">..</span>.<span class="token punctuation">]</span>

<span class="token comment"># Shell\u683C\u5F0F</span>
CMD \u53EF\u6267\u884C\u7A0B\u5E8F \u53C2\u65701 \u53C2\u65702 \u53C2\u6570N<span class="token punctuation">..</span>.
</code></pre></div></details></li><li><p><code>docker container run</code>\u65F6\u53EF\u4EE5\u8986\u76D6\u955C\u50CF\u4E2D\u7684<code>CMD</code>\u6216<code>ENTRYPOINT</code>\u547D\u4EE4</p></li></ul><p><strong>\u4E0D\u540C\u70B9</strong></p><ul><li><p><code>docker container run</code>\u65F6\u8986\u76D6\u955C\u50CF\u4E2D\u7684<code>CMD</code>\u6216<code>ENTRYPOINT</code>\u547D\u4EE4\u65F6\u7684\u8BED\u6CD5\u4E0D\u4E00\u6837</p></li><li><p>CMD\u989D\u5916\u652F\u6301\u4E00\u79CD\u683C\u5F0F\uFF0C<code>CMD [\u53C2\u65701, \u53C2\u65702]</code>\uFF0C\u6B64\u65F6\u53EF\u4EE5\u4E3AENTRYPOINT\u6307\u5B9A\u63D0\u4F9B\u53C2\u6570\uFF08\u6CE8\u610F\uFF1AENTRYPOINT\u5FC5\u987B\u4F7F\u7528Exec\u683C\u5F0F\uFF09</p><p>\u4E00\u822C\u6211\u4EEC\u7528\u4F5C\u5BB9\u5668\u542F\u52A8\u7684\u9ED8\u8BA4\u53C2\u6570\uFF0C\u5F53\u7528\u6237\u60F3\u66FF\u6362\u9ED8\u8BA4\u53C2\u6570\u65F6\u5C31\u7B49\u540C\u4E8E\u66FF\u6362CMD\u4E2D\u7684\u53C2\u6570</p></li></ul><p><strong>\u6D4B\u8BD5</strong></p><details class="custom-container details"><summary>\u76F8\u540C\u70B9\u6D4B\u8BD51\uFF1A\u53EF\u4EE5\u6709\u591A\u4E2ACMD\u6216ENTRYPOINT\u547D\u4EE4\u4F46\u53EA\u6709\u6700\u540E\u4E00\u4E2A\u751F\u6548</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u5148\u770B\u4E00\u4E0BDockerfile</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat Dockerfile </span>
FROM centos:7
MAINTAINER VVFock3r
WORKDIR /
RUN yum -y update
CMD <span class="token builtin class-name">echo</span> <span class="token string">&quot;Hello World!&quot;</span>
CMD <span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">seq</span> <span class="token number">5</span><span class="token variable">\`</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token builtin class-name">echo</span> <span class="token variable">$i</span><span class="token punctuation">;</span> <span class="token function">sleep</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token keyword">done</span>

<span class="token comment"># \u6784\u5EFA\u955C\u50CF\uFF08\u547D\u4EE4\u8F93\u51FA\u7701\u7565\uFF09</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker build -t centos:demo .</span>

<span class="token comment"># \u542F\u52A8\u5BB9\u5668</span>
<span class="token comment"># \u53EF\u4EE5\u770B\u5230Hello World!\u5E76\u6CA1\u6709\u8F93\u51FA\u51FA\u6765</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run --rm centos:demo</span>
<span class="token number">1</span>
<span class="token number">2</span>
<span class="token number">3</span>
<span class="token number">4</span>
<span class="token number">5</span>

<span class="token comment"># \u5C06Dockerfile\u4E2D\u7684CMD\u66FF\u6362\u4E3AENTRYPOINT\u6D4B\u8BD5\u4E00\u4E0B\uFF0C\u53D1\u73B0\u6548\u679C\u662F\u4E00\u6837\u7684</span>
</code></pre></div></details><details class="custom-container details"><summary>\u76F8\u540C\u70B9\u6D4B\u8BD52\uFF1A\u90FD\u652F\u6301Exec\u548CShell\u683C\u5F0F\u8BED\u6CD5</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat Dockerfile </span>
FROM centos:7
MAINTAINER VVFock3r
WORKDIR /
RUN yum -y update
<span class="token comment"># Exec\u8BED\u6CD5</span>
CMD <span class="token punctuation">[</span><span class="token string">&quot;ls&quot;</span>, <span class="token string">&quot;-l&quot;</span><span class="token punctuation">]</span>
<span class="token comment"># Shell\u8BED\u6CD5</span>
<span class="token comment"># CMD ls -l</span>

<span class="token comment"># \u6784\u5EFA\u955C\u50CF\uFF08\u547D\u4EE4\u8F93\u51FA\u7701\u7565\uFF09</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker build -t centos:demo .</span>

<span class="token comment"># \u542F\u52A8\u5BB9\u5668\uFF08\u547D\u4EE4\u8F93\u51FA\u7701\u7565\uFF09</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run --rm centos:demo</span>

<span class="token comment"># \u4F7F\u7528CMD\u4E0D\u540C\u683C\u5F0F\u3001ENTRYPOINT\u4E0D\u540C\u683C\u5F0F\u91CD\u590D\u6D4B\u8BD5\uFF0C\u53D1\u73B0\u6548\u679C\u662F\u4E00\u6837\u7684</span>
</code></pre></div></details><details class="custom-container details"><summary>\u4E0D\u540C\u70B9\u6D4B\u8BD51\uFF1A\`docker container run\`\u65F6\u8986\u76D6\u955C\u50CF\u4E2D\u7684\`CMD\`\u6216\`ENTRYPOINT\`\u547D\u4EE4\u65F6\u7684\u8BED\u6CD5\u4E0D\u4E00\u6837</summary><p>\u5148\u770B\u4E00\u4E0B<code>docker container run</code>\u7684\u8BED\u6CD5\u683C\u5F0F</p><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220511175138893.png" alt="image-20220511175138893"></p><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220511175249716.png" alt="image-20220511175249716"></p><p>\u5F00\u59CB\u6211\u4EEC\u7684\u6D4B\u8BD5</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u8986\u76D6\u955C\u50CF\u4E2DCMD\u6307\u4EE4\u7684\u8BED\u6CD5</span>
<span class="token comment"># ---------------------------------------------------------------------------------------------</span>
<span class="token comment"># \u5148\u770B\u4E00\u4E0BDockerfile</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat Dockerfile </span>
FROM centos:7
MAINTAINER VVFock3r
WORKDIR /
RUN yum -y update
CMD <span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">seq</span> <span class="token number">5</span><span class="token variable">\`</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token builtin class-name">echo</span> <span class="token variable">$i</span><span class="token punctuation">;</span> <span class="token function">sleep</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token keyword">done</span>

<span class="token comment"># \u6784\u5EFA\u955C\u50CF\uFF08\u547D\u4EE4\u8F93\u51FA\u7701\u7565\uFF09</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker build -t centos:demo .</span>

<span class="token comment"># \u542F\u52A8\u5BB9\u5668\uFF08\u547D\u4EE4\u8F93\u51FA\u7701\u7565\uFF09</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run --rm centos:demo	    # \u4F7F\u7528\u9ED8\u8BA4\u53C2\u6570\u542F\u52A8\u5BB9\u5668</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run --rm centos:demo ls -l # \u4F7F\u7528\u81EA\u5B9A\u4E49\u7684\u547D\u4EE4\u548C\u53C2\u6570\u542F\u52A8\u5BB9\u5668</span>
<span class="token comment"># ---------------------------------------------------------------------------------------------</span>

<span class="token comment"># \u8986\u76D6\u955C\u50CF\u4E2DENTRYPOINT\u6307\u4EE4\u7684\u8BED\u6CD5</span>
<span class="token comment"># \u5C06\u4E0A\u9762Dockerfile\u4E2DCMD\u66FF\u6362\u4E3AENTRYPOINT\uFF0C\u91CD\u65B0\u6784\u5EFA\u955C\u50CF\uFF0C\u7136\u540E\u7EE7\u7EED\u4E0B\u4E00\u6B65</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run --rm centos:demo						# \u4F7F\u7528\u9ED8\u8BA4\u53C2\u6570\u542F\u52A8\u5BB9\u5668</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run --rm --entrypoint ls centos:demo		# \u66FF\u6362\u9ED8\u8BA4\u7684ENTRYPOINT</span>

<span class="token comment"># \u5982\u679C\u6211\u4EEC\u60F3\u7ED9ENTRYPOINT\u52A0\u4E00\u4E2A\u53C2\u6570\uFF0C\u53EF\u80FD\u4F1A\u8FD9\u6837\u5199\uFF0C\u4F46\u662F\u62A5\u9519\u4E86</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run --rm --entrypoint ls -l centos:demo	</span>
<span class="token string">&quot;docker container run&quot;</span> requires at least <span class="token number">1</span> argument.
See <span class="token string">&#39;docker container run --help&#39;</span><span class="token builtin class-name">.</span>

Usage:  <span class="token function">docker</span> container run <span class="token punctuation">[</span>OPTIONS<span class="token punctuation">]</span> IMAGE <span class="token punctuation">[</span>COMMAND<span class="token punctuation">]</span> <span class="token punctuation">[</span>ARG<span class="token punctuation">..</span>.<span class="token punctuation">]</span>

Run a <span class="token builtin class-name">command</span> <span class="token keyword">in</span> a new container
<span class="token comment"># \u89E3\u51B3\u529E\u6CD5\u662F\u53C2\u6570\u901A\u8FC7CMD\u5F62\u5F0F\u4F20\u9012</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run --rm --entrypoint ls  centos:demo -l -h -a --color=auto</span>
total 12K
drwxr-xr-x.   <span class="token number">1</span> root root   <span class="token number">6</span> May <span class="token number">11</span> <span class="token number">10</span>:02 <span class="token builtin class-name">.</span>
drwxr-xr-x.   <span class="token number">1</span> root root   <span class="token number">6</span> May <span class="token number">11</span> <span class="token number">10</span>:02 <span class="token punctuation">..</span>
-rwxr-xr-x.   <span class="token number">1</span> root root   <span class="token number">0</span> May <span class="token number">11</span> <span class="token number">10</span>:02 .dockerenv
-rw-r--r--.   <span class="token number">1</span> root root 12K Nov <span class="token number">13</span>  <span class="token number">2020</span> anaconda-post.log
lrwxrwxrwx.   <span class="token number">1</span> root root   <span class="token number">7</span> Nov <span class="token number">13</span>  <span class="token number">2020</span> bin -<span class="token operator">&gt;</span> usr/bin
drwxr-xr-x.   <span class="token number">5</span> root root <span class="token number">340</span> May <span class="token number">11</span> <span class="token number">10</span>:02 dev
drwxr-xr-x.   <span class="token number">1</span> root root  <span class="token number">66</span> May <span class="token number">11</span> <span class="token number">10</span>:02 etc
drwxr-xr-x.   <span class="token number">2</span> root root   <span class="token number">6</span> Apr <span class="token number">11</span>  <span class="token number">2018</span> home
lrwxrwxrwx.   <span class="token number">1</span> root root   <span class="token number">7</span> Nov <span class="token number">13</span>  <span class="token number">2020</span> lib -<span class="token operator">&gt;</span> usr/lib
lrwxrwxrwx.   <span class="token number">1</span> root root   <span class="token number">9</span> Nov <span class="token number">13</span>  <span class="token number">2020</span> lib64 -<span class="token operator">&gt;</span> usr/lib64
drwxr-xr-x.   <span class="token number">2</span> root root   <span class="token number">6</span> Apr <span class="token number">11</span>  <span class="token number">2018</span> media
drwxr-xr-x.   <span class="token number">2</span> root root   <span class="token number">6</span> Apr <span class="token number">11</span>  <span class="token number">2018</span> mnt
drwxr-xr-x.   <span class="token number">2</span> root root   <span class="token number">6</span> Apr <span class="token number">11</span>  <span class="token number">2018</span> opt
dr-xr-xr-x. <span class="token number">221</span> root root   <span class="token number">0</span> May <span class="token number">11</span> <span class="token number">10</span>:02 proc
dr-xr-x---.   <span class="token number">2</span> root root <span class="token number">114</span> Nov <span class="token number">13</span>  <span class="token number">2020</span> root
drwxr-xr-x.   <span class="token number">1</span> root root  <span class="token number">19</span> May <span class="token number">11</span> 09:22 run
lrwxrwxrwx.   <span class="token number">1</span> root root   <span class="token number">8</span> Nov <span class="token number">13</span>  <span class="token number">2020</span> sbin -<span class="token operator">&gt;</span> usr/sbin
drwxr-xr-x.   <span class="token number">2</span> root root   <span class="token number">6</span> Apr <span class="token number">11</span>  <span class="token number">2018</span> srv
dr-xr-xr-x.  <span class="token number">13</span> root root   <span class="token number">0</span> May <span class="token number">11</span> 05:51 sys
drwxrwxrwt.   <span class="token number">1</span> root root   <span class="token number">6</span> May <span class="token number">11</span> 09:22 tmp
drwxr-xr-x.   <span class="token number">1</span> root root  <span class="token number">96</span> Nov <span class="token number">13</span>  <span class="token number">2020</span> usr
drwxr-xr-x.   <span class="token number">1</span> root root  <span class="token number">78</span> Nov <span class="token number">13</span>  <span class="token number">2020</span> var
</code></pre></div></details><details class="custom-container details"><summary>\u4E0D\u540C\u70B9\u6D4B\u8BD52\uFF1ACMD\u53EF\u4EE5\u4E3AENTRYPOINT\u6307\u5B9A\u63D0\u4F9B\u9ED8\u8BA4\u53C2\u6570\uFF08ENTRYPOINT\u5FC5\u987B\u4F7F\u7528Exec\u683C\u5F0F\uFF09</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u67E5\u770BDockerfile</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat Dockerfile </span>
FROM centos:7
MAINTAINER VVFock3r
WORKDIR /
RUN yum -y update
ENTRYPOINT <span class="token punctuation">[</span><span class="token string">&quot;ls&quot;</span><span class="token punctuation">]</span>
CMD <span class="token punctuation">[</span><span class="token string">&quot;-l&quot;</span>, <span class="token string">&quot;-h&quot;</span><span class="token punctuation">]</span>

<span class="token comment"># \u6784\u5EFA\u955C\u50CF\uFF08\u547D\u4EE4\u8F93\u51FA\u7701\u7565\uFF09</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker build -t centos:demo .</span>

<span class="token comment"># \u542F\u52A8\u5BB9\u5668</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run -it --rm centos:demo</span>
total 12K
-rw-r--r--.   <span class="token number">1</span> root root 12K Nov <span class="token number">13</span>  <span class="token number">2020</span> anaconda-post.log
lrwxrwxrwx.   <span class="token number">1</span> root root   <span class="token number">7</span> Nov <span class="token number">13</span>  <span class="token number">2020</span> bin -<span class="token operator">&gt;</span> usr/bin
drwxr-xr-x.   <span class="token number">5</span> root root <span class="token number">360</span> May <span class="token number">11</span> <span class="token number">10</span>:09 dev
drwxr-xr-x.   <span class="token number">1</span> root root  <span class="token number">66</span> May <span class="token number">11</span> <span class="token number">10</span>:09 etc
drwxr-xr-x.   <span class="token number">2</span> root root   <span class="token number">6</span> Apr <span class="token number">11</span>  <span class="token number">2018</span> home
lrwxrwxrwx.   <span class="token number">1</span> root root   <span class="token number">7</span> Nov <span class="token number">13</span>  <span class="token number">2020</span> lib -<span class="token operator">&gt;</span> usr/lib
lrwxrwxrwx.   <span class="token number">1</span> root root   <span class="token number">9</span> Nov <span class="token number">13</span>  <span class="token number">2020</span> lib64 -<span class="token operator">&gt;</span> usr/lib64
drwxr-xr-x.   <span class="token number">2</span> root root   <span class="token number">6</span> Apr <span class="token number">11</span>  <span class="token number">2018</span> media
drwxr-xr-x.   <span class="token number">2</span> root root   <span class="token number">6</span> Apr <span class="token number">11</span>  <span class="token number">2018</span> mnt
drwxr-xr-x.   <span class="token number">2</span> root root   <span class="token number">6</span> Apr <span class="token number">11</span>  <span class="token number">2018</span> opt
dr-xr-xr-x. <span class="token number">219</span> root root   <span class="token number">0</span> May <span class="token number">11</span> <span class="token number">10</span>:09 proc
dr-xr-x---.   <span class="token number">2</span> root root <span class="token number">114</span> Nov <span class="token number">13</span>  <span class="token number">2020</span> root
drwxr-xr-x.   <span class="token number">1</span> root root  <span class="token number">19</span> May <span class="token number">11</span> 09:22 run
lrwxrwxrwx.   <span class="token number">1</span> root root   <span class="token number">8</span> Nov <span class="token number">13</span>  <span class="token number">2020</span> sbin -<span class="token operator">&gt;</span> usr/sbin
drwxr-xr-x.   <span class="token number">2</span> root root   <span class="token number">6</span> Apr <span class="token number">11</span>  <span class="token number">2018</span> srv
dr-xr-xr-x.  <span class="token number">13</span> root root   <span class="token number">0</span> May <span class="token number">11</span> 05:51 sys
drwxrwxrwt.   <span class="token number">1</span> root root   <span class="token number">6</span> May <span class="token number">11</span> 09:22 tmp
drwxr-xr-x.   <span class="token number">1</span> root root  <span class="token number">96</span> Nov <span class="token number">13</span>  <span class="token number">2020</span> usr
drwxr-xr-x.   <span class="token number">1</span> root root  <span class="token number">78</span> Nov <span class="token number">13</span>  <span class="token number">2020</span> var

<span class="token comment"># ---------------------------------------------------------------------------------------------</span>
<span class="token comment"># \u73B0\u5728\u6211\u4EEC\u5C06 ENTRYPOINT [&quot;ls&quot;]\u66FF\u6362\u4E3A ENTRYPOINT ls\uFF0C\u6765\u9A8C\u8BC1Shell\u683C\u5F0F\u662F\u5426\u53EF\u4EE5</span>

<span class="token comment"># \u4FEE\u6539Dockerfile\uFF08\u7701\u7565\uFF09</span>
<span class="token comment"># \u6784\u5EFA\u955C\u50CF\uFF08\u547D\u4EE4\u8F93\u51FA\u7701\u7565\uFF09</span>

<span class="token comment"># \u542F\u52A8\u5BB9\u5668\uFF0C\u53EF\u4EE5\u770B\u5230CMD\u4E2D\u7684\u53C2\u6570\u5E76\u6CA1\u6709\u751F\u6548</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run -it --rm centos:demo</span>
anaconda-post.log  dev  home  lib64  mnt  proc  run   srv  tmp  var
bin                etc  lib   media  opt  root  sbin  sys  usr

<span class="token comment"># \u6211\u4EEC\u4F7F\u7528\u547D\u4EE4\u884C\u8986\u76D6CMD\u6307\u4EE4\u5462\uFF0C\u4E5F\u6CA1\u6709\u751F\u6548</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run -it --rm centos:demo -l -h </span>
anaconda-post.log  dev  home  lib64  mnt  proc  run   srv  tmp  var
bin                etc  lib   media  opt  root  sbin  sys  usr

<span class="token comment"># \u6211\u4EEC\u518D\u8986\u76D6\u4E00\u4E0BENTRYPOINT\u5462\uFF0C\u53EF\u4EE5\u770B\u5230\u751F\u6548\u4E86\uFF08\u610F\u6599\u4E4B\u4E2D\uFF09</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run --entrypoint ls -it --rm centos:demo -l -h </span>
total 12K
-rw-r--r--.   <span class="token number">1</span> root root 12K Nov <span class="token number">13</span>  <span class="token number">2020</span> anaconda-post.log
lrwxrwxrwx.   <span class="token number">1</span> root root   <span class="token number">7</span> Nov <span class="token number">13</span>  <span class="token number">2020</span> bin -<span class="token operator">&gt;</span> usr/bin
drwxr-xr-x.   <span class="token number">5</span> root root <span class="token number">360</span> May <span class="token number">11</span> <span class="token number">10</span>:12 dev
drwxr-xr-x.   <span class="token number">1</span> root root  <span class="token number">66</span> May <span class="token number">11</span> <span class="token number">10</span>:12 etc
drwxr-xr-x.   <span class="token number">2</span> root root   <span class="token number">6</span> Apr <span class="token number">11</span>  <span class="token number">2018</span> home
lrwxrwxrwx.   <span class="token number">1</span> root root   <span class="token number">7</span> Nov <span class="token number">13</span>  <span class="token number">2020</span> lib -<span class="token operator">&gt;</span> usr/lib
lrwxrwxrwx.   <span class="token number">1</span> root root   <span class="token number">9</span> Nov <span class="token number">13</span>  <span class="token number">2020</span> lib64 -<span class="token operator">&gt;</span> usr/lib64
drwxr-xr-x.   <span class="token number">2</span> root root   <span class="token number">6</span> Apr <span class="token number">11</span>  <span class="token number">2018</span> media
drwxr-xr-x.   <span class="token number">2</span> root root   <span class="token number">6</span> Apr <span class="token number">11</span>  <span class="token number">2018</span> mnt
drwxr-xr-x.   <span class="token number">2</span> root root   <span class="token number">6</span> Apr <span class="token number">11</span>  <span class="token number">2018</span> opt
dr-xr-xr-x. <span class="token number">219</span> root root   <span class="token number">0</span> May <span class="token number">11</span> <span class="token number">10</span>:12 proc
dr-xr-x---.   <span class="token number">2</span> root root <span class="token number">114</span> Nov <span class="token number">13</span>  <span class="token number">2020</span> root
drwxr-xr-x.   <span class="token number">1</span> root root  <span class="token number">19</span> May <span class="token number">11</span> 09:22 run
lrwxrwxrwx.   <span class="token number">1</span> root root   <span class="token number">8</span> Nov <span class="token number">13</span>  <span class="token number">2020</span> sbin -<span class="token operator">&gt;</span> usr/sbin
drwxr-xr-x.   <span class="token number">2</span> root root   <span class="token number">6</span> Apr <span class="token number">11</span>  <span class="token number">2018</span> srv
dr-xr-xr-x.  <span class="token number">13</span> root root   <span class="token number">0</span> May <span class="token number">11</span> 05:51 sys
drwxrwxrwt.   <span class="token number">1</span> root root   <span class="token number">6</span> May <span class="token number">11</span> 09:22 tmp
drwxr-xr-x.   <span class="token number">1</span> root root  <span class="token number">96</span> Nov <span class="token number">13</span>  <span class="token number">2020</span> usr
drwxr-xr-x.   <span class="token number">1</span> root root  <span class="token number">78</span> Nov <span class="token number">13</span>  <span class="token number">2020</span> var
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># </span>
</code></pre></div></details><h4 id="dockerfile-3-\u591A\u9636\u6BB5\u6784\u5EFA\u4F18\u5316go\u9879\u76EE" tabindex="-1"><a class="header-anchor" href="#dockerfile-3-\u591A\u9636\u6BB5\u6784\u5EFA\u4F18\u5316go\u9879\u76EE" aria-hidden="true">#</a> Dockerfile(3):\u591A\u9636\u6BB5\u6784\u5EFA\u4F18\u5316Go\u9879\u76EE</h4><p>\uFF081\uFF09\u521B\u5EFAGo\u9879\u76EE</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u8BE6\u60C5</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># mkdir webserver</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cd webserver</span>
<span class="token punctuation">[</span>root@localhost webserver<span class="token punctuation">]</span><span class="token comment"># go mod init webserver</span>
go: creating new go.mod: module webserver

<span class="token punctuation">[</span>root@localhost webserver<span class="token punctuation">]</span><span class="token comment"># cat server.go</span>
package main

<span class="token function">import</span> <span class="token punctuation">(</span>
        <span class="token string">&quot;fmt&quot;</span>
        <span class="token string">&quot;io&quot;</span>
        <span class="token string">&quot;log&quot;</span>
        <span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

// \u5904\u7406\u5668
func indexHandler<span class="token punctuation">(</span>w http.ResponseWriter, req *http.Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        io.WriteString<span class="token punctuation">(</span>w, <span class="token string">&quot;Hello, world!<span class="token entity" title="\\n">\\n</span>&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

func <span class="token function-name function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        // \u76D1\u542C\u5730\u5740
        addr :<span class="token operator">=</span> <span class="token string">&quot;0.0.0.0:80&quot;</span>

        // \u6CE8\u518C\u8DEF\u7531
        http.HandleFunc<span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span>, indexHandler<span class="token punctuation">)</span>

        // \u542F\u52A8\u670D\u52A1
        fmt.Println<span class="token punctuation">(</span><span class="token string">&quot;* Running on http://&quot;</span> + addr<span class="token punctuation">)</span>
        log.Fatal<span class="token punctuation">(</span>http.ListenAndServe<span class="token punctuation">(</span>addr, nil<span class="token punctuation">))</span>
<span class="token punctuation">}</span>
</code></pre></div></details><p>\uFF082\uFF09\u7F16\u5199Dockerfile</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u8BE6\u60C5</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost webserver<span class="token punctuation">]</span><span class="token comment"># cat Dockerfile</span>
FROM golang:1.18
MAINTAINER VVFock3r
WORKDIR /
COPY server.go <span class="token builtin class-name">.</span>
RUN go build -o server server.go
EXPOSE <span class="token number">80</span>
CMD <span class="token punctuation">[</span><span class="token string">&quot;./server&quot;</span><span class="token punctuation">]</span>
</code></pre></div></details><p>\uFF083\uFF09\u6784\u5EFA\u955C\u50CF</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u8BE6\u60C5</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost webserver<span class="token punctuation">]</span><span class="token comment"># docker build -t server:v1 .</span>
Sending build context to Docker daemon  <span class="token number">4</span>.096kB
Step <span class="token number">1</span>/6 <span class="token builtin class-name">:</span> FROM golang:1.18
<span class="token number">1.18</span>: Pulling from library/golang
6aefca2dc61d: Pull complete 
967757d56527: Pull complete 
c357e2c68cb3: Pull complete 
c766e27afb21: Pull complete 
d6a8ea6bd5f8: Pull complete 
886d528c0894: Pull complete 
ad84389257db: Pull complete 
Digest: sha256:aa0c16158472cfa9122ea7c54f3933ad79d1e860f216540750ed440bcce841c7
Status: Downloaded newer image <span class="token keyword">for</span> golang:1.18
 ---<span class="token operator">&gt;</span> 65b2f1fa535f
Step <span class="token number">2</span>/6 <span class="token builtin class-name">:</span> MAINTAINER VVFock3r
 ---<span class="token operator">&gt;</span> Running <span class="token keyword">in</span> fb57751c56ef
Removing intermediate container fb57751c56ef
 ---<span class="token operator">&gt;</span> 4c0e15145939
Step <span class="token number">3</span>/6 <span class="token builtin class-name">:</span> WORKDIR /
 ---<span class="token operator">&gt;</span> Running <span class="token keyword">in</span> 3ecd4a2870f5
Removing intermediate container 3ecd4a2870f5
 ---<span class="token operator">&gt;</span> 9dcc78ced4ad
Step <span class="token number">4</span>/6 <span class="token builtin class-name">:</span> COPY server.go <span class="token builtin class-name">.</span>
 ---<span class="token operator">&gt;</span> 34f5e234c295
Step <span class="token number">5</span>/6 <span class="token builtin class-name">:</span> RUN go build -o server server.go
 ---<span class="token operator">&gt;</span> Running <span class="token keyword">in</span> 8db00c31bc37
Removing intermediate container 8db00c31bc37
 ---<span class="token operator">&gt;</span> 58736ed6175c
Step <span class="token number">6</span>/6 <span class="token builtin class-name">:</span> CMD <span class="token punctuation">[</span><span class="token string">&quot;./server&quot;</span><span class="token punctuation">]</span>
 ---<span class="token operator">&gt;</span> Running <span class="token keyword">in</span> e58aa4c9f890
Removing intermediate container e58aa4c9f890
 ---<span class="token operator">&gt;</span> 5117b956c216
Successfully built 5117b956c216
Successfully tagged server:v1

<span class="token punctuation">[</span>root@localhost webserver<span class="token punctuation">]</span><span class="token comment"># docker image ls </span>
REPOSITORY   TAG          IMAGE ID       CREATED              SIZE
server       v1           f4c28a054488   About a minute ago   970MB		<span class="token comment"># \u6BD4\u539F\u59CB\u955C\u50CF\u591A\u4E86\u51E0M</span>
golang       <span class="token number">1.18</span>         65b2f1fa535f   <span class="token number">9</span> hours ago          964MB
</code></pre></div></details><p>\uFF084\uFF09\u542F\u52A8\u5BB9\u5668\u8BD5\u4E00\u4E0B</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u8BE6\u60C5</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u542F\u52A8\u5BB9\u5668</span>
<span class="token punctuation">[</span>root@localhost webserver<span class="token punctuation">]</span><span class="token comment"># docker container run -itd -P --name server1 server:v1</span>
b4b2c3f81fa96738b7300ee17a83c7c4803702c0038fd9020380e3bb5b05b759

<span class="token comment"># \u67E5\u770B\u5BBF\u4E3B\u673A\u6620\u5C04\u7684\u7AEF\u53E3</span>
<span class="token punctuation">[</span>root@localhost webserver<span class="token punctuation">]</span><span class="token comment"># docker container ps</span>
CONTAINER ID   IMAGE       COMMAND      CREATED          STATUS          PORTS                                     NAMES
b4b2c3f81fa9   server:v1   <span class="token string">&quot;./server&quot;</span>   <span class="token number">12</span> seconds ago   Up <span class="token number">10</span> seconds   <span class="token number">0.0</span>.0.0:49160-<span class="token operator">&gt;</span><span class="token number">80</span>/tcp, :::49160-<span class="token operator">&gt;</span><span class="token number">80</span>/tcp   server1

<span class="token comment"># \u8BBF\u95EE\u5BBF\u4E3B\u673A\u7AEF\u53E3</span>
<span class="token punctuation">[</span>root@localhost webserver<span class="token punctuation">]</span><span class="token comment"># curl http://127.0.0.1:49160</span>
Hello, world<span class="token operator">!</span>
</code></pre></div></details><p>\uFF085\uFF09\u955C\u50CF\u5927\u5C0F\u7B2C\u4E00\u6B21\u4F18\u5316\uFF1A\u5148\u7F16\u8BD1Go\u9879\u76EE\uFF0C\u7136\u540E\u5C06\u7F16\u8BD1\u597D\u7684\u4E8C\u8FDB\u5236\u62F7\u8D1D\u5230\u955C\u50CF\u4E2D</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u8BE6\u60C5</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u5173\u95EDCGO_ENABLED</span>
<span class="token comment"># \u539F\u7406\uFF1A</span>
<span class="token comment">#   (1) Go\u5728\u7F16\u8BD1\u65F6\u53EF\u4EE5\u9009\u62E9\u4F7F\u7528C\u94FE\u63A5\u5E93(C\u94FE\u63A5\u5E93\u4E0D\u6253\u5305\u8FDB\u7A0B\u5E8F)\u6216\u7EAFGo\u7F16\u8BD1(\u6253\u5305\u6240\u6709\u5185\u5BB9)\uFF0CCGO_ENABLED\u53C2\u6570\u63A7\u5236\u662F\u5426\u542F\u7528CGO</span>
<span class="token comment">#   (2) alpine\u955C\u50CF\u4E0D\u5305\u542BC\u94FE\u63A5\u5E93\uFF0C\u6240\u4EE5\u5F53\u6211\u4EEC\u542F\u7528CGO\u65F6\u540C\u65F6\u53C8\u4F7F\u7528alpine\u955C\u50CF\u65F6\uFF0C\u7A0B\u5E8F\u4F1A\u62A5\u9519not found</span>
<span class="token punctuation">[</span>root@localhost webserver<span class="token punctuation">]</span><span class="token comment"># go env CGO_ENABLED				# \u5148\u67E5\u770B\u4E00\u4E0BCGO_ENABLED\u8FD9\u4E2A\u53D8\u91CF</span>
<span class="token number">1</span>															<span class="token comment"># 1\u4EE3\u8868\u5F00\u542F</span>
<span class="token punctuation">[</span>root@localhost webserver<span class="token punctuation">]</span><span class="token comment"># go env -w CGO_ENABLED=0			# \u5173\u95ED</span>
<span class="token punctuation">[</span>root@localhost webserver<span class="token punctuation">]</span><span class="token comment"># go build -o server server.go 	# \u6253\u5305</span>
<span class="token punctuation">[</span>root@localhost webserver<span class="token punctuation">]</span><span class="token comment"># ls -lh server					# \u770B\u4E00\u4E0B\u5927\u5C0F</span>
-rwxr-xr-x. <span class="token number">1</span> root root <span class="token number">6</span>.0M May <span class="token number">11</span> <span class="token number">15</span>:08 server			<span class="token comment"># 6M</span>

<span class="token comment"># \u4FEE\u6539Dockerfile</span>
<span class="token punctuation">[</span>root@localhost webserver<span class="token punctuation">]</span><span class="token comment"># cat Dockerfile</span>
FROM alpine:3.15.4
MAINTAINER VVFock3r
WORKDIR /
COPY server <span class="token builtin class-name">.</span>
EXPOSE <span class="token number">80</span>
CMD <span class="token punctuation">[</span><span class="token string">&quot;./server&quot;</span><span class="token punctuation">]</span>

<span class="token comment"># \u91CD\u65B0\u6784\u5EFA\u955C\u50CF</span>
<span class="token punctuation">[</span>root@localhost webserver<span class="token punctuation">]</span><span class="token comment"># docker build -t server:v2 .</span>
Sending build context to Docker daemon  <span class="token number">6</span>.241MB
Step <span class="token number">1</span>/6 <span class="token builtin class-name">:</span> FROM alpine:3.15.4
<span class="token number">3.15</span>.4: Pulling from library/alpine
df9b9388f04a: Pull complete 
Digest: sha256:4edbd2beb5f78b1014028f4fbb99f3237d9561100b6881aabbf5acce2c4f9454
Status: Downloaded newer image <span class="token keyword">for</span> alpine:3.15.4
 ---<span class="token operator">&gt;</span> 0ac33e5f5afa
Step <span class="token number">2</span>/6 <span class="token builtin class-name">:</span> MAINTAINER VVFock3r
 ---<span class="token operator">&gt;</span> Running <span class="token keyword">in</span> d7a9ef482595
Removing intermediate container d7a9ef482595
 ---<span class="token operator">&gt;</span> aa47686fe08c
Step <span class="token number">3</span>/6 <span class="token builtin class-name">:</span> WORKDIR /
 ---<span class="token operator">&gt;</span> Running <span class="token keyword">in</span> b3399ac114c8
Removing intermediate container b3399ac114c8
 ---<span class="token operator">&gt;</span> 0b16c287b5e2
Step <span class="token number">4</span>/6 <span class="token builtin class-name">:</span> COPY server <span class="token builtin class-name">.</span>
 ---<span class="token operator">&gt;</span> 453e503273fd
Step <span class="token number">5</span>/6 <span class="token builtin class-name">:</span> EXPOSE <span class="token number">80</span>
 ---<span class="token operator">&gt;</span> Running <span class="token keyword">in</span> af5e153a1d41
Removing intermediate container af5e153a1d41
 ---<span class="token operator">&gt;</span> 6b7a8f1c22aa
Step <span class="token number">6</span>/6 <span class="token builtin class-name">:</span> CMD <span class="token punctuation">[</span><span class="token string">&quot;./server&quot;</span><span class="token punctuation">]</span>
 ---<span class="token operator">&gt;</span> Running <span class="token keyword">in</span> a37a4e6c84de
Removing intermediate container a37a4e6c84de
 ---<span class="token operator">&gt;</span> 523d460fc716
Successfully built 523d460fc716
Successfully tagged server:v2

<span class="token comment"># \u67E5\u770B\u955C\u50CF\u5927\u5C0F</span>
<span class="token punctuation">[</span>root@localhost webserver<span class="token punctuation">]</span><span class="token comment"># docker image ls</span>
REPOSITORY   TAG       IMAGE ID       CREATED          SIZE
server       v2        523d460fc716   <span class="token number">21</span> seconds ago   <span class="token number">11</span>.8MB	<span class="token comment"># \u4E0D\u523012M,\u5C0F\u4E86\u592A\u591A\u4E86(\u5077\u7B11zzz)</span>
server       v1        86114e9e8c94   <span class="token number">3</span> minutes ago    970MB
golang       <span class="token number">1.18</span>      65b2f1fa535f   <span class="token number">9</span> hours ago      964MB
alpine       <span class="token number">3.15</span>.4    0ac33e5f5afa   <span class="token number">5</span> weeks ago      <span class="token number">5</span>.57MB

<span class="token comment"># \u542F\u52A8\u5BB9\u5668\u6D4B\u4E00\u4E0B</span>
<span class="token punctuation">[</span>root@localhost webserver<span class="token punctuation">]</span><span class="token comment"># docker run -itd -P --name server2 server:v2</span>

<span class="token punctuation">[</span>root@localhost webserver<span class="token punctuation">]</span><span class="token comment"># docker ps</span>
CONTAINER ID   IMAGE       COMMAND      CREATED         STATUS         PORTS                                     NAMES
89c5596ec80c   server:v2   <span class="token string">&quot;./server&quot;</span>   <span class="token number">3</span> seconds ago   Up <span class="token number">3</span> seconds   <span class="token number">0.0</span>.0.0:49161-<span class="token operator">&gt;</span><span class="token number">80</span>/tcp, :::49161-<span class="token operator">&gt;</span><span class="token number">80</span>/tcp   server2
b4b2c3f81fa9   server:v1   <span class="token string">&quot;./server&quot;</span>   <span class="token number">3</span> minutes ago   Up <span class="token number">3</span> minutes   <span class="token number">0.0</span>.0.0:49160-<span class="token operator">&gt;</span><span class="token number">80</span>/tcp, :::49160-<span class="token operator">&gt;</span><span class="token number">80</span>/tcp   server1

<span class="token punctuation">[</span>root@localhost webserver<span class="token punctuation">]</span><span class="token comment"># curl http://127.0.0.1:49161</span>
Hello, world<span class="token operator">!</span>

<span class="token comment"># \u5220\u9664\u5BBF\u4E3B\u673A\u7F16\u8BD1\u51FA\u6765\u7684\u4E8C\u8FDB\u5236\u6587\u4EF6</span>
<span class="token punctuation">[</span>root@localhost webserver<span class="token punctuation">]</span><span class="token comment"># rm -vf server</span>
removed <span class="token string">&#39;server&#39;</span>
</code></pre></div></details><p>\uFF086\uFF09\u955C\u50CF\u5927\u5C0F\u7B2C\u4E8C\u6B21\u4F18\u5316\uFF1A\u4F7F\u7528\u955C\u50CF\u591A\u9636\u6BB5\u6784\u5EFA\uFF08\u63A8\u8350\uFF09</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u8BE6\u60C5</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u4FEE\u6539Dockerfile</span>
<span class="token punctuation">[</span>root@localhost webserver<span class="token punctuation">]</span><span class="token comment"># cat Dockerfile</span>
<span class="token comment"># \u7528\u4E8E\u7A0B\u5E8F\u7F16\u8BD1</span>
FROM golang:1.18.2-alpine3.15 as builder
WORKDIR /build
COPY <span class="token builtin class-name">.</span> <span class="token builtin class-name">.</span>
RUN go build -o server server.go

<span class="token comment"># \u7528\u4E8E\u7A0B\u5E8F\u8FD0\u884C</span>
FROM alpine:3.15.4
MAINTAINER VVFock3r
WORKDIR /
COPY --from<span class="token operator">=</span>builder /build/server <span class="token builtin class-name">.</span>
EXPOSE <span class="token number">80</span>
CMD <span class="token punctuation">[</span><span class="token string">&quot;./server&quot;</span><span class="token punctuation">]</span>

<span class="token comment"># \u6784\u5EFA\u955C\u50CF</span>
<span class="token punctuation">[</span>root@localhost webserver<span class="token punctuation">]</span><span class="token comment"># docker build -t server:v3 .</span>
Sending build context to Docker daemon  <span class="token number">4</span>.096kB
Step <span class="token number">1</span>/10 <span class="token builtin class-name">:</span> FROM golang:1.18.2-alpine3.15 as builder
 ---<span class="token operator">&gt;</span> 04a96eefde03
Step <span class="token number">2</span>/10 <span class="token builtin class-name">:</span> WORKDIR /build
 ---<span class="token operator">&gt;</span> Using cache
 ---<span class="token operator">&gt;</span> f8278f940644
Step <span class="token number">3</span>/10 <span class="token builtin class-name">:</span> COPY <span class="token builtin class-name">.</span> <span class="token builtin class-name">.</span>
 ---<span class="token operator">&gt;</span> 64b46b7ef7c6
Step <span class="token number">4</span>/10 <span class="token builtin class-name">:</span> RUN go build -o server server.go
 ---<span class="token operator">&gt;</span> Running <span class="token keyword">in</span> 6566bc10f3ad
Removing intermediate container 6566bc10f3ad
 ---<span class="token operator">&gt;</span> 4b196dce6953
Step <span class="token number">5</span>/10 <span class="token builtin class-name">:</span> FROM alpine:3.15.4
 ---<span class="token operator">&gt;</span> 0ac33e5f5afa
Step <span class="token number">6</span>/10 <span class="token builtin class-name">:</span> MAINTAINER VVFock3r
 ---<span class="token operator">&gt;</span> Using cache
 ---<span class="token operator">&gt;</span> aa47686fe08c
Step <span class="token number">7</span>/10 <span class="token builtin class-name">:</span> WORKDIR /
 ---<span class="token operator">&gt;</span> Using cache
 ---<span class="token operator">&gt;</span> 0b16c287b5e2
Step <span class="token number">8</span>/10 <span class="token builtin class-name">:</span> COPY --from<span class="token operator">=</span>builder /build/server <span class="token builtin class-name">.</span>
 ---<span class="token operator">&gt;</span> Using cache
 ---<span class="token operator">&gt;</span> aef7aafb227f
Step <span class="token number">9</span>/10 <span class="token builtin class-name">:</span> EXPOSE <span class="token number">80</span>
 ---<span class="token operator">&gt;</span> Running <span class="token keyword">in</span> 4f4e2181aae4
Removing intermediate container 4f4e2181aae4
 ---<span class="token operator">&gt;</span> 47d2bc51d9b0
Step <span class="token number">10</span>/10 <span class="token builtin class-name">:</span> CMD <span class="token punctuation">[</span><span class="token string">&quot;./server&quot;</span><span class="token punctuation">]</span>
 ---<span class="token operator">&gt;</span> Running <span class="token keyword">in</span> 7dbea4b80753
Removing intermediate container 7dbea4b80753
 ---<span class="token operator">&gt;</span> 24f2f7c399db
Successfully built 24f2f7c399db
Successfully tagged server:v3

<span class="token comment"># \u67E5\u770B\u955C\u50CF\u5927\u5C0F</span>
<span class="token punctuation">[</span>root@localhost webserver<span class="token punctuation">]</span><span class="token comment"># docker image ls</span>
REPOSITORY   TAG                 IMAGE ID       CREATED              SIZE
server       v3                  24f2f7c399db   <span class="token number">18</span> seconds ago       <span class="token number">11</span>.9MB		<span class="token comment"># \u548Cv2\u5927\u5C0F\u51E0\u4E4E\u4E00\u81F4</span>
server       v2                  523d460fc716   <span class="token number">12</span> minutes ago       <span class="token number">11</span>.8MB
server       v1                  86114e9e8c94   <span class="token number">15</span> minutes ago       970MB
golang       <span class="token number">1.18</span>.2-alpine3.15   04a96eefde03   <span class="token number">10</span> hours ago         328MB
golang       <span class="token number">1.18</span>                65b2f1fa535f   <span class="token number">10</span> hours ago         964MB
alpine       <span class="token number">3.15</span>.4              0ac33e5f5afa   <span class="token number">5</span> weeks ago          <span class="token number">5</span>.57MB

<span class="token comment"># \u542F\u52A8\u5BB9\u5668\u6D4B\u4E00\u4E0B</span>
<span class="token punctuation">[</span>root@localhost webserver<span class="token punctuation">]</span><span class="token comment"># docker run -itd -P --name server3 server:v3</span>

<span class="token punctuation">[</span>root@localhost webserver<span class="token punctuation">]</span><span class="token comment"># docker container ps</span>
CONTAINER ID   IMAGE       COMMAND      CREATED          STATUS          PORTS                                     NAMES
10f33df3efc1   server:v3   <span class="token string">&quot;./server&quot;</span>   <span class="token number">5</span> seconds ago    Up <span class="token number">4</span> seconds    <span class="token number">0.0</span>.0.0:49162-<span class="token operator">&gt;</span><span class="token number">80</span>/tcp, :::49162-<span class="token operator">&gt;</span><span class="token number">80</span>/tcp   server3
89c5596ec80c   server:v2   <span class="token string">&quot;./server&quot;</span>   <span class="token number">13</span> minutes ago   Up <span class="token number">13</span> minutes   <span class="token number">0.0</span>.0.0:49161-<span class="token operator">&gt;</span><span class="token number">80</span>/tcp, :::49161-<span class="token operator">&gt;</span><span class="token number">80</span>/tcp   server2
b4b2c3f81fa9   server:v1   <span class="token string">&quot;./server&quot;</span>   <span class="token number">16</span> minutes ago   Up <span class="token number">16</span> minutes   <span class="token number">0.0</span>.0.0:49160-<span class="token operator">&gt;</span><span class="token number">80</span>/tcp, :::49160-<span class="token operator">&gt;</span><span class="token number">80</span>/tcp   server1

<span class="token punctuation">[</span>root@localhost webserver<span class="token punctuation">]</span><span class="token comment"># curl http://127.0.0.1:49162</span>
Hello, world<span class="token operator">!</span>
</code></pre></div></details><h3 id="docker\u5B58\u50A8" tabindex="-1"><a class="header-anchor" href="#docker\u5B58\u50A8" aria-hidden="true">#</a> Docker\u5B58\u50A8</h3><h4 id="\u6301\u4E45\u5316\u65B9\u5F0F1-bind-mounts" tabindex="-1"><a class="header-anchor" href="#\u6301\u4E45\u5316\u65B9\u5F0F1-bind-mounts" aria-hidden="true">#</a> \u6301\u4E45\u5316\u65B9\u5F0F1\uFF1A<code>bind mounts</code></h4>`,29),j=s("\u6587\u6863\uFF1A"),$={href:"https://docs.docker.com/storage/bind-mounts/",target:"_blank",rel:"noopener noreferrer"},Q=s("https://docs.docker.com/storage/bind-mounts/"),J=e(`<p><code>bind mounts</code>\u65B9\u5F0F\u5C31\u662F\u5C06\u5BBF\u4E3B\u673A\u4E0A\u7684\u76EE\u5F55\u6620\u5C04\u5230\u5BB9\u5668\u4E2D\uFF0C\u5176\u7279\u70B9\u662F\u4EE5\u5BBF\u4E3B\u673A\u76EE\u5F55\u4E3A\u51C6\uFF0C</p><p>\u82E5\u5BBF\u4E3B\u673A\u76EE\u5F55\u4E3A\u7A7A\u800C\u5BB9\u5668\u76EE\u5F55\u4E0D\u4E3A\u7A7A\uFF0C\u90A3\u4E48\u5BB9\u5668\u76EE\u5F55\u5C06\u88AB\u6E05\u7A7A\uFF08\u4E0E\u5BBF\u4E3B\u673A\u4FDD\u6301\u4E00\u81F4\uFF09</p><p><code>bind mounts</code>\u6709\u4E24\u79CD\u4F7F\u7528\u65B9\u5F0F\uFF1A</p><br><p>\uFF081\uFF09<code>-v</code>\u9009\u9879</p><p>\u8BED\u6CD5\uFF1A<code>docker container run</code>\u65F6\u4F7F\u7528 <code>-v &quot;\u5BBF\u4E3B\u673A\u76EE\u5F55:\u5BB9\u5668\u76EE\u5F55[:\u8BFB\u5199\u6A21\u5F0F]&quot;</code></p><p>\u9009\u9879\uFF1A</p><ul><li>rw\uFF1A\u8BFB\u5199\u6A21\u5F0F\uFF08\u9ED8\u8BA4\uFF09</li><li>ro\uFF1A\u5BB9\u5668\u53EA\u8BFB\u6A21\u5F0F</li></ul><br><p>\uFF082\uFF09<code>--mount</code>\u9009\u9879</p><p>\u8BED\u6CD5\uFF1A<code>docker container run</code>\u65F6\u4F7F\u7528 <code>--mount type=bind,src=\u5BBF\u4E3B\u673A\u76EE\u5F55,dst=\u5BB9\u5668\u76EE\u5F55[,\u8BFB\u5199\u6A21\u5F0F][,bind-propagation=rprivate] </code></p><p>\u9009\u9879\uFF1A</p><ul><li><code>type=bind</code>\u662F\u56FA\u5B9A\u7684\uFF0C\u8FD8\u652F\u6301\u5176\u4ED6\u7684\u503C\uFF0C\u4F46\u5C31\u4E0D\u5C5E\u4E8E<code>bind mounts</code>\u7684\u5185\u5BB9\u4E86</li><li><code>src</code>\u4E5F\u53EF\u4EE5\u5199\u505A<code>source</code></li><li><code>dst</code>\u4E5F\u53EF\u4EE5\u5199\u4F5C<code>target</code>\u3001<code>destination</code></li><li>\u8BFB\u5199\u6A21\u5F0F\uFF1A\u9ED8\u8BA4\u4E3A\u8BFB\u5199\uFF0C\u5982\u679C\u503C\u4E3Areadonly\u5219\u5BB9\u5668\u5185\u53EA\u8BFB</li><li><code>bind-propagation</code>\u4E00\u822C\u7528\u4E0D\u5230\uFF0C\u5148\u4E0D\u8BB2</li></ul><br><p>\uFF083\uFF09<code>-v</code>\u548C<code>--mount</code>\u7684\u4E0D\u540C\u70B9</p><p>\u5728\u6620\u5C04\u65F6\u5982\u679C\u672C\u5730\u76EE\u5F55\u4E0D\u5B58\u5728\uFF0C<code>-v</code>\u9009\u9879\u4F1A\u81EA\u52A8\u521B\u5EFA\u672C\u5730\u76EE\u5F55\uFF0C<code>--mount</code>\u9009\u9879\u5219\u4F1A\u62A5\u9519</p><br><p>\u793A\u4F8B</p><details class="custom-container details"><summary>(1) \u57FA\u7840\u793A\u4F8B -v\u9009\u9879</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u542F\u52A8\u4E00\u4E2A\u5BB9\u5668\uFF0C\u5C06\u672C\u5730\u76EE\u5F55html\u6620\u5C04\u5230\u5BB9\u5668/usr/share/nginx/html\u4E2D</span>
<span class="token comment"># (1) \u5982\u679C\u672C\u5730\u76EE\u5F55\u4E0D\u5B58\u5728\u5219\u81EA\u52A8\u521B\u5EFA</span>
<span class="token comment"># (2) \u5982\u679C\u5BB9\u5668\u4E2D\u7684\u76EE\u5F55\u539F\u672C\u662F\u6709\u5185\u5BB9\u7684\u4E5F\u4F1A\u88AB\u5220\u9664\uFF0C\u8981\u4E0E\u672C\u5730\u76EE\u5F55\u4FDD\u6301\u4E00\u81F4\u7684\u6570\u636E</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run --name webserver -p 8000:80 -d -v /root/html:/usr/share/nginx/html  nginx:1.21.6</span>

<span class="token comment"># \u521B\u5EFA\u9996\u9875\u6587\u4EF6</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo &#39;hello world!&#39; &gt; /root/html/index.html</span>

<span class="token comment"># \u67E5\u770B\u5BB9\u5668</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container ps</span>
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS                                   NAMES
cb1416a20f8e   nginx:1.21.6   <span class="token string">&quot;/docker-entrypoint.\u2026&quot;</span>   <span class="token number">7</span> seconds ago   Up <span class="token number">6</span> seconds   <span class="token number">0.0</span>.0.0:8000-<span class="token operator">&gt;</span><span class="token number">80</span>/tcp, :::8000-<span class="token operator">&gt;</span><span class="token number">80</span>/tcp   webserver

<span class="token comment"># \u8BBF\u95EE\u6D4B\u8BD5</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># curl http://127.0.0.1:8000/</span>
hello world<span class="token operator">!</span>

<span class="token comment"># \u67E5\u770B\u5BB9\u5668\u8BE6\u60C5</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container inspect webserver  | grep -i -A 10 Mounts </span>
        <span class="token string">&quot;Mounts&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token string">&quot;Type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;bind&quot;</span>,								<span class="token comment"># \u7C7B\u578B</span>
                <span class="token string">&quot;Source&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/root/html&quot;</span>,						<span class="token comment"># \u5BBF\u4E3B\u673A\u76EE\u5F55</span>
                <span class="token string">&quot;Destination&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/usr/share/nginx/html&quot;</span>,		<span class="token comment"># \u5BB9\u5668\u76EE\u5F55</span>
                <span class="token string">&quot;Mode&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,									<span class="token comment"># \u6A21\u5F0F</span>
                <span class="token string">&quot;RW&quot;</span><span class="token builtin class-name">:</span> true,									<span class="token comment"># \u662F\u5426\u652F\u6301\u8BFB\u5199</span>
                <span class="token string">&quot;Propagation&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;rprivate&quot;</span>					<span class="token comment"># \u4F20\u64AD\u65B9\u5F0F</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>,
        <span class="token string">&quot;Config&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
</code></pre></div></details><details class="custom-container details"><summary>(2) \u57FA\u7840\u793A\u4F8B --mount\u9009\u9879</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u521B\u5EFA\u5BB9\u5668</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run --name webserver -p 8000:80 -d --mount type=bind,src=/root/html,dst=/usr/share/nginx/html  nginx:1.21.6</span>

<span class="token comment"># \u67E5\u770B\u5BB9\u5668</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container ps</span>
CONTAINER ID   IMAGE          COMMAND                  CREATED              STATUS              PORTS                                   NAMES
0aa307c705af   nginx:1.21.6   <span class="token string">&quot;/docker-entrypoint.\u2026&quot;</span>   About a minute ago   Up About a minute   <span class="token number">0.0</span>.0.0:8000-<span class="token operator">&gt;</span><span class="token number">80</span>/tcp, :::8000-<span class="token operator">&gt;</span><span class="token number">80</span>/tcp   webserver

<span class="token comment"># \u521B\u5EFA\u9996\u9875\u6587\u4EF6</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo &#39;hello world!&#39; &gt; /root/html/index.html</span>

<span class="token comment"># \u8BBF\u95EE\u6D4B\u8BD5</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># curl http://127.0.0.1:8000/</span>
hello world<span class="token operator">!</span>

<span class="token comment"># \u67E5\u770B\u5BB9\u5668\u8BE6\u60C5</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container inspect webserver  | grep -i -A 10 Mounts</span>
            <span class="token string">&quot;Mounts&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span>
                    <span class="token string">&quot;Type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;bind&quot;</span>,
                    <span class="token string">&quot;Source&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/root/html&quot;</span>,
                    <span class="token string">&quot;Target&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/usr/share/nginx/html&quot;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>,
            <span class="token string">&quot;MaskedPaths&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
                <span class="token string">&quot;/proc/asound&quot;</span>,
                <span class="token string">&quot;/proc/acpi&quot;</span>,
                <span class="token string">&quot;/proc/kcore&quot;</span>,
--
        <span class="token string">&quot;Mounts&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token string">&quot;Type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;bind&quot;</span>,
                <span class="token string">&quot;Source&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/root/html&quot;</span>,
                <span class="token string">&quot;Destination&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/usr/share/nginx/html&quot;</span>,
                <span class="token string">&quot;Mode&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
                <span class="token string">&quot;RW&quot;</span><span class="token builtin class-name">:</span> true,
                <span class="token string">&quot;Propagation&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;rprivate&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>,
        <span class="token string">&quot;Config&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
</code></pre></div></details><details class="custom-container details"><summary>(3)\u6620\u5C04\u591A\u4E2A\u76EE\u5F55 -v\u9009\u9879</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u76EE\u6807\uFF1A\u6211\u4EEC\u5C06nginx\u7684\u914D\u7F6E\u6587\u4EF6\u76EE\u5F55\u548C\u6570\u636E\u76EE\u5F55\u5168\u90E8\u6620\u5C04\u51FA\u6765</span>

<span class="token comment"># ---------------------------------------------------------------------------------------------------------</span>
<span class="token comment"># \u51C6\u5907\u5DE5\u4F5C</span>
<span class="token comment"># \u5148\u542F\u52A8\u4E00\u4E2Anginx\uFF0C\u5C06\u5BB9\u5668\u4E2D\u7684\u76EE\u5F55\u62F7\u8D1D\u81F3\u672C\u5730\uFF0C\u7136\u540E\u518D\u8FDB\u884C\u6620\u5C04\uFF08\u4E0D\u7136\u76F4\u63A5\u6620\u5C04\u7684\u8BDD\uFF0C\u672C\u5730\u53C8\u6CA1\u6709\u6587\u4EF6\uFF0C\u4F1A\u5BFC\u81F4\u5BB9\u5668\u6620\u5C04\u7684\u76EE\u5F55\u4F1A\u88AB\u6E05\u7A7A\uFF0C\u8FDB\u800C\u5BFC\u81F4\u5BB9\u5668\u542F\u52A8\u5931\u8D25\uFF09</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run --name webserver -d nginx:1.21.6</span>

<span class="token comment"># \u62F7\u8D1D\u6587\u4EF6\u5230\u672C\u5730\u76EE\u5F55</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># mkdir -p nginx/etc/</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># mkdir -p nginx/usr/share/</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container cp webserver:/etc/nginx/ ./nginx/etc/</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container cp webserver:/usr/share/nginx/ ./nginx/usr/share/</span>

<span class="token comment"># \u5220\u9664\u5BB9\u5668</span>
<span class="token function">docker</span> container <span class="token function">rm</span> -f webserver

<span class="token comment"># ---------------------------------------------------------------------------------------------------------</span>
<span class="token comment"># \u521B\u5EFA\u65B0\u7684\u5BB9\u5668</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run --name webserver -p 8000:80 -d -v /root/nginx/etc/nginx/:/etc/nginx/ -v /root/nginx/usr/share/nginx/:/usr/share/nginx/ nginx:1.21.6</span>

<span class="token comment"># \u8BBF\u95EE\u6D4B\u8BD5</span>
<span class="token punctuation">[</span>root@localhost conf.d<span class="token punctuation">]</span><span class="token comment"># curl http://127.0.0.1:8000/</span>
<span class="token operator">&lt;</span><span class="token operator">!</span>DOCTYPE html<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>html<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>head<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>title<span class="token operator">&gt;</span>Welcome to nginx<span class="token operator">!</span><span class="token operator">&lt;</span>/title<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>style<span class="token operator">&gt;</span>
html <span class="token punctuation">{</span> color-scheme: light dark<span class="token punctuation">;</span> <span class="token punctuation">}</span>
body <span class="token punctuation">{</span> width: 35em<span class="token punctuation">;</span> margin: <span class="token number">0</span> auto<span class="token punctuation">;</span>
font-family: Tahoma, Verdana, Arial, sans-serif<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token operator">&lt;</span>/style<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>/head<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>body<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>h<span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span>Welcome to nginx<span class="token operator">!</span><span class="token operator">&lt;</span>/h<span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span>
<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.<span class="token operator">&lt;</span>/p<span class="token operator">&gt;</span>

<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>For online documentation and support please refer to
<span class="token operator">&lt;</span>a <span class="token assign-left variable">href</span><span class="token operator">=</span><span class="token string">&quot;http://nginx.org/&quot;</span><span class="token operator">&gt;</span>nginx.org<span class="token operator">&lt;</span>/a<span class="token operator">&gt;</span>.<span class="token operator">&lt;</span>br/<span class="token operator">&gt;</span>
Commercial support is available at
<span class="token operator">&lt;</span>a <span class="token assign-left variable">href</span><span class="token operator">=</span><span class="token string">&quot;http://nginx.com/&quot;</span><span class="token operator">&gt;</span>nginx.com<span class="token operator">&lt;</span>/a<span class="token operator">&gt;</span>.<span class="token operator">&lt;</span>/p<span class="token operator">&gt;</span>

<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span><span class="token operator">&lt;</span>em<span class="token operator">&gt;</span>Thank you <span class="token keyword">for</span> using nginx.<span class="token operator">&lt;</span>/em<span class="token operator">&gt;</span><span class="token operator">&lt;</span>/p<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>/body<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>/html<span class="token operator">&gt;</span>
</code></pre></div></details><details class="custom-container details"><summary>(4) \u6620\u5C04\u76EE\u5F55\u4E3A\u53EA\u8BFB\u6A21\u5F0F -v\u9009\u9879</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u521B\u5EFA\u5BB9\u5668</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run --name webserver -P -d -v /root/readonly:/tmp/readonly:ro nginx:1.21.6</span>

<span class="token comment"># \u5728\u5BB9\u5668\u5185\u521B\u5EFA\u6587\u4EF6</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container exec -it webserver touch /tmp/readonly/a.txt</span>
touch: cannot <span class="token function">touch</span> <span class="token string">&#39;/tmp/readonly/a.txt&#39;</span><span class="token builtin class-name">:</span> Read-only <span class="token function">file</span> system
</code></pre></div></details><details class="custom-container details"><summary>(5) -v\u548C--mount\u7684\u4E0D\u540C</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># -v\u9009\u9879</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run -P -d -v /tmp/a11:/tmp/a11 nginx:1.21.6</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ls -ld /tmp/a11/</span>
drwxr-xr-x. <span class="token number">2</span> root root <span class="token number">6</span> May <span class="token number">14</span> <span class="token number">16</span>:04 /tmp/a11/

<span class="token comment"># --mount\u9009\u9879</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run -P -d --mount type=bind,src=/tmp/b11,dst=/tmp/c11 nginx:1.21.6</span>
docker: Error response from daemon: invalid <span class="token function">mount</span> config <span class="token keyword">for</span> <span class="token builtin class-name">type</span> <span class="token string">&quot;bind&quot;</span><span class="token builtin class-name">:</span> <span class="token builtin class-name">bind</span> <span class="token builtin class-name">source</span> path does not exist: /tmp/b11.
See <span class="token string">&#39;docker run --help&#39;</span><span class="token builtin class-name">.</span>
</code></pre></div></details><h4 id="\u6301\u4E45\u5316\u65B9\u5F0F2-volumes" tabindex="-1"><a class="header-anchor" href="#\u6301\u4E45\u5316\u65B9\u5F0F2-volumes" aria-hidden="true">#</a> \u6301\u4E45\u5316\u65B9\u5F0F2\uFF1A<code>volumes</code></h4>`,24),nn=s("\u6587\u6863\uFF1A"),sn={href:"https://docs.docker.com/storage/volumes/",target:"_blank",rel:"noopener noreferrer"},an=s("https://docs.docker.com/storage/volumes/"),tn=e(`<p><code>volumes</code>\u662F\u66F4\u4E3A\u63A8\u8350\u7684\u6301\u4E45\u5316\u65B9\u5F0F\uFF0C\u4E0E<code>bind mounts</code>\u76F8\u6BD4\u5177\u6709\u66F4\u597D\u7684\u79FB\u690D\u6027</p><p>volume\u7684\u4F7F\u7528\u65B9\u5F0F\u4E0E<code>bind mounts</code>\u5F88\u7C7B\u4F3C\uFF0C\u8BE6\u60C5\u53EF\u4EE5\u770B\u4E0A\u65B9\u6587\u6863</p><br><p><code>volume</code>\u7279\u70B9\uFF1A</p><ul><li>\u5982\u679C\u5377\u4E0D\u5B58\u5728\u4F1A\u81EA\u52A8\u521B\u5EFA</li><li>\u5982\u679C\u662F\u7A7A\u5377\u5219\u5BB9\u5668\u76EE\u5F55\u4F1A\u586B\u5145\u5377\u7684\u5185\u5BB9\uFF08\u8FD9\u4E00\u65B9\u9762\u4E0E<code>bind mounts</code>\u5B8C\u5168\u4E0D\u4E00\u6837\uFF09</li></ul><br><details class="custom-container details"><summary>\uFF081\uFF09docker volume\u547D\u4EE4</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u67E5\u770B\u5377</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker volume ls</span>
DRIVER    VOLUME NAME

<span class="token comment"># \u521B\u5EFA\u5377</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker volume create webserver</span>
webserver
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker volume ls</span>
DRIVER    VOLUME NAME
<span class="token builtin class-name">local</span>     webserver

<span class="token comment"># \u67E5\u770B\u5377\u8BE6\u60C5</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker volume inspect webserver</span>
<span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token string">&quot;CreatedAt&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2022-05-19T15:48:06+08:00&quot;</span>,
        <span class="token string">&quot;Driver&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;local&quot;</span>,
        <span class="token string">&quot;Labels&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>,
        <span class="token string">&quot;Mountpoint&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/var/lib/docker/volumes/webserver/_data&quot;</span>,
        <span class="token string">&quot;Name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;webserver&quot;</span>,
        <span class="token string">&quot;Options&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>,
        <span class="token string">&quot;Scope&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;local&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre></div></details><details class="custom-container details"><summary>\uFF082\uFF09\u5BB9\u5668\u4F7F\u7528volume\uFF08\u4F7F\u7528-v\u9009\u9879\u4E3E\u4F8B\uFF09</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u4F7F\u7528\u4E00\u4E2A\u5DF2\u7ECF\u5B58\u5728\u7684\u5377</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run --name webserver -v webserver:/usr/share/nginx/ -d nginx:1.21.6</span>

<span class="token comment"># \u67E5\u770B\u5BB9\u5668\u4FE1\u606F</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container inspect webserver | grep -i Mounts -A 13</span>
        <span class="token string">&quot;Mounts&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token string">&quot;Type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;volume&quot;</span>,		<span class="token comment"># \u7C7B\u578B\u4E3AVolumn</span>
                <span class="token string">&quot;Name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;webserver&quot;</span>,	<span class="token comment"># Volumn\u540D\u79F0</span>
                <span class="token string">&quot;Source&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/var/lib/docker/volumes/webserver/_data&quot;</span>,	<span class="token comment"># \u5BF9\u5E94\u7684\u672C\u5730\u6587\u4EF6\u7CFB\u7EDF\u8DEF\u5F84</span>
                <span class="token string">&quot;Destination&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/usr/share/nginx/&quot;</span>,		<span class="token comment"># \u5BF9\u5E94\u7684\u5BB9\u5668\u76EE\u5F55</span>
                <span class="token string">&quot;Driver&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;local&quot;</span>,
                <span class="token string">&quot;Mode&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;z&quot;</span>,
                <span class="token string">&quot;RW&quot;</span><span class="token builtin class-name">:</span> true,
                <span class="token string">&quot;Propagation&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>,
        <span class="token string">&quot;Config&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;Hostname&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;90f3864f6b67&quot;</span>,

<span class="token comment"># ---------------------------------------------------------------------------------------------------------</span>
<span class="token comment"># \u5F53\u5377\u4E0D\u5B58\u5728\u65F6docker\u4F1A\u4E3A\u6211\u4EEC\u81EA\u52A8\u521B\u5EFA            </span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker run --name webserver1 -v webserver1:/usr/share/nginx/ -d nginx:1.21.6 # \u5377webserver1\u5E76\u4E0D\u5B58\u5728</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container inspect webserver1 | grep -i Mounts -A 13</span>
        <span class="token string">&quot;Mounts&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token string">&quot;Type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;volume&quot;</span>,		<span class="token comment"># \u8FD9\u91CC\u4F9D\u65E7\u662Fvolume</span>
                <span class="token string">&quot;Name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;webserver1&quot;</span>,
                <span class="token string">&quot;Source&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/var/lib/docker/volumes/webserver1/_data&quot;</span>,
                <span class="token string">&quot;Destination&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/usr/share/nginx/&quot;</span>,
                <span class="token string">&quot;Driver&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;local&quot;</span>,
                <span class="token string">&quot;Mode&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;z&quot;</span>,
                <span class="token string">&quot;RW&quot;</span><span class="token builtin class-name">:</span> true,
                <span class="token string">&quot;Propagation&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>,
        <span class="token string">&quot;Config&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;Hostname&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;862e24c37fc7&quot;</span>,
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker volume ls</span>
DRIVER    VOLUME NAME
<span class="token builtin class-name">local</span>     webserver
<span class="token builtin class-name">local</span>     webserver1		<span class="token comment"># \u8FD9\u91CC\u662F\u81EA\u52A8\u521B\u5EFA\u7684volume</span>

<span class="token comment"># ---------------------------------------------------------------------------------------------------------</span>
<span class="token comment"># volume\u6570\u636E\u4E3A\u7A7A\uFF0C\u5BB9\u5668\u5185\u6709\u6570\u636E\uFF0C\u5219\u4F1A\u5C06\u5BB9\u5668\u7684\u6570\u636E\u62F7\u8D1D\u81F3volume\uFF0C\u8FD9\u4E00\u70B9\u4E0Ebind mounts\u5B8C\u5168\u4E0D\u4E00\u6837\u3002</span>
<span class="token punctuation">[</span>root@localhost html<span class="token punctuation">]</span><span class="token comment"># cd /var/lib/docker/volumes/webserver/_data</span>
<span class="token punctuation">[</span>root@localhost _data<span class="token punctuation">]</span><span class="token comment"># ll</span>
total <span class="token number">0</span>
drwxr-xr-x. <span class="token number">2</span> root root <span class="token number">40</span> May <span class="token number">19</span> <span class="token number">16</span>:01 html
</code></pre></div></details><details class="custom-container details"><summary>\uFF083\uFF09Dockerfile\u4E2D\u7684VOLUME\u6307\u4EE4</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># Dockerfile\u4E2D\u7684VOLUME\u6307\u4EE4\u4E0EEXPOSE\u7C7B\u4F3C\uFF0C\u5728\u6784\u5EFA\u955C\u50CF\u65F6\u5E76\u4E0D\u4F1A\u81EA\u52A8\u521B\u5EFAVOLUME\uFF0C\u800C\u662F\u4F5C\u4E3A\u4E00\u4E2A\u663E\u793A\u58F0\u660E</span>
<span class="token comment"># \u5F53\u6211\u4EEC\u521B\u5EFA\u5BB9\u5668\u65F6</span>
<span class="token comment"># (1) \u6CA1\u6709\u4F7F\u7528-v\u6216--mount\u65F6\u4F1A\u81EA\u52A8\u521B\u5EFA\u533F\u540D\u5377</span>
<span class="token comment"># (2) \u4F7F\u7528\u2014v\u6216--mount\u65F6\uFF0C\u76EE\u5F55\u4E0D\u4E00\u81F4\u4E5F\u4F1A\u81EA\u52A8\u521B\u5EFA\u533F\u540D\u5377\uFF0C\u6B64\u65F6\u5C31\u76F8\u5F53\u4E8E\u6307\u5B9A\u4E86\u591A\u4E2A\u5377</span>

<span class="token comment"># ---------------------------------------------------------------------------------------------------------</span>
<span class="token comment"># \u533F\u540D\u5377\u7684\u4F7F\u7528</span>

<span class="token comment"># \u5148\u67E5\u770B\u4E00\u4E0B\u7684\u5F53\u524D\u7684\u60C5\u51B5</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker image ls</span>
REPOSITORY                     TAG                 IMAGE ID       CREATED         SIZE
centos                         <span class="token number">7</span>                   eeb6ee3f44bd   <span class="token number">8</span> months ago    204MB
nginx                          <span class="token number">1.21</span>.6              7425d3a7c478   <span class="token number">8</span> days ago      142MB
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker volume ls</span>
DRIVER    VOLUME NAME

<span class="token comment"># \u67E5\u770BDockerfile</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat Dockerfile </span>
FROM centos:7
MAINTAINER VVFock3r
WORKDIR /
VOLUME <span class="token punctuation">[</span><span class="token string">&quot;/data&quot;</span><span class="token punctuation">]</span>
CMD <span class="token punctuation">[</span><span class="token string">&quot;/bin/bash&quot;</span><span class="token punctuation">]</span>

<span class="token comment"># \u6784\u5EFA\u955C\u50CF</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker build -t centos:main .</span>
Sending build context to Docker daemon  <span class="token number">16</span>.02MB
Step <span class="token number">1</span>/5 <span class="token builtin class-name">:</span> FROM centos:7
 ---<span class="token operator">&gt;</span> eeb6ee3f44bd
Step <span class="token number">2</span>/5 <span class="token builtin class-name">:</span> MAINTAINER VVFock3r
 ---<span class="token operator">&gt;</span> Using cache
 ---<span class="token operator">&gt;</span> f7cea628e420
Step <span class="token number">3</span>/5 <span class="token builtin class-name">:</span> WORKDIR /
 ---<span class="token operator">&gt;</span> Using cache
 ---<span class="token operator">&gt;</span> 07f0b2f933b5
Step <span class="token number">4</span>/5 <span class="token builtin class-name">:</span> VOLUME <span class="token punctuation">[</span><span class="token string">&quot;/data&quot;</span><span class="token punctuation">]</span>
 ---<span class="token operator">&gt;</span> Using cache
 ---<span class="token operator">&gt;</span> 73570684b51d
Step <span class="token number">5</span>/5 <span class="token builtin class-name">:</span> CMD <span class="token punctuation">[</span><span class="token string">&quot;/bin/bash&quot;</span><span class="token punctuation">]</span>
 ---<span class="token operator">&gt;</span> Using cache
 ---<span class="token operator">&gt;</span> 48ab01d4fcec
Successfully built 48ab01d4fcec
Successfully tagged centos:main
<span class="token comment"># \u518D\u67E5\u770B\u4E00\u4E0BVOLUME</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker volume ls</span>
DRIVER    VOLUME NAME

<span class="token comment"># \u542F\u52A8\u5BB9\u5668\uFF0C\u4E0D\u8FDB\u884C\u6301\u4E45\u5316</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run -d --name main centos:main</span>

<span class="token comment"># \u518D\u67E5\u770B\u4E00\u4E0BVOLUME\uFF0C\u53D1\u73B0\u5DF2\u7ECF\u81EA\u52A8\u521B\u5EFA\u4E86\u4E00\u4E2A\u533F\u540D\u5377\uFF0C\u5373\u81EA\u52A8\u8FDB\u884C\u4E86\u6301\u4E45\u5316</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker volume ls</span>
DRIVER    VOLUME NAME
<span class="token builtin class-name">local</span>     807798b92c720098345fb3d9629571bbb67c43d1712248ae45038722cca70a7c

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker volume inspect 807798b92c720098345fb3d9629571bbb67c43d1712248ae45038722cca70a7c</span>
<span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token string">&quot;CreatedAt&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2022-05-19T19:50:03+08:00&quot;</span>,
        <span class="token string">&quot;Driver&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;local&quot;</span>,
        <span class="token string">&quot;Labels&quot;</span><span class="token builtin class-name">:</span> null,
        <span class="token string">&quot;Mountpoint&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/var/lib/docker/volumes/807798b92c720098345fb3d9629571bbb67c43d1712248ae45038722cca70a7c/_data&quot;</span>,
        <span class="token string">&quot;Name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;807798b92c720098345fb3d9629571bbb67c43d1712248ae45038722cca70a7c&quot;</span>,
        <span class="token string">&quot;Options&quot;</span><span class="token builtin class-name">:</span> null,
        <span class="token string">&quot;Scope&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;local&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>

<span class="token comment"># \u67E5\u770B\u4E00\u4E0B\u5BB9\u5668\u4FE1\u606F</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container inspect main | grep -i mounts -A 13</span>
        <span class="token string">&quot;Mounts&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token string">&quot;Type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;volume&quot;</span>,
                <span class="token string">&quot;Name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;807798b92c720098345fb3d9629571bbb67c43d1712248ae45038722cca70a7c&quot;</span>,
                <span class="token string">&quot;Source&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/var/lib/docker/volumes/807798b92c720098345fb3d9629571bbb67c43d1712248ae45038722cca70a7c/_data&quot;</span>,
                <span class="token string">&quot;Destination&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/data&quot;</span>,
                <span class="token string">&quot;Driver&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;local&quot;</span>,
                <span class="token string">&quot;Mode&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
                <span class="token string">&quot;RW&quot;</span><span class="token builtin class-name">:</span> true,
                <span class="token string">&quot;Propagation&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>,
        <span class="token string">&quot;Config&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;Hostname&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;783eaeaeb92a&quot;</span>,
<span class="token comment"># ---------------------------------------------------------------------------------------------------------</span>
<span class="token comment"># \u518D\u542F\u52A8\u4E00\u4E2A\u5BB9\u5668\uFF0C\u53D1\u73B0\u533F\u540D\u5377\u53C8\u589E\u52A0\u4E86\u4E00\u4E2A</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run -d --name main2 centos:main</span>

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker volume ls</span>
DRIVER    VOLUME NAME
<span class="token builtin class-name">local</span>     0f6d8c19f62874b7e5f39653c36a67de5bbdc22f4ef516fbe00bef0d554ba05b
<span class="token builtin class-name">local</span>     807798b92c720098345fb3d9629571bbb67c43d1712248ae45038722cca70a7c

<span class="token comment"># ---------------------------------------------------------------------------------------------------------</span>
<span class="token comment"># \u4F7F\u7528-v\u53EF\u4EE5\u8986\u76D6Dockerfile\u4E2D\u7684VOLUME\u6307\u4EE4</span>

<span class="token comment"># \u542F\u52A8\u4E00\u4E2A\u5BB9\u5668\uFF0C\u6307\u5B9A\u4F7F\u7528\u5377mydata\uFF08\u4E0D\u5B58\u5728\u65F6\u4F1A\u81EA\u52A8\u521B\u5EFA\uFF09</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run -d --name main3 -v mydata:/data/ centos:main</span>

<span class="token comment"># \u67E5\u770B\u5377</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker volume ls</span>
DRIVER    VOLUME NAME
<span class="token builtin class-name">local</span>     0f6d8c19f62874b7e5f39653c36a67de5bbdc22f4ef516fbe00bef0d554ba05b
<span class="token builtin class-name">local</span>     807798b92c720098345fb3d9629571bbb67c43d1712248ae45038722cca70a7c
<span class="token builtin class-name">local</span>     mydata <span class="token comment"># \u8FD9\u4E2A\u662F\u81EA\u52A8\u521B\u5EFA\u7684\uFF0C\u533F\u540D\u5377\u4E5F\u6CA1\u6709\u589E\u52A0\uFF0C\u8BF4\u660Edockerfile\u4E2D\u7684VOLUME\u6307\u4EE4\u5E76\u6CA1\u6709\u751F\u6548</span>

<span class="token comment"># ---------------------------------------------------------------------------------------------------------</span>
<span class="token comment"># \u4F7F\u7528-v\u65F6\uFF0C\u5F53\u6301\u4E45\u5316\u5BB9\u5668\u7684\u76EE\u5F55\u4E0D\u4E00\u81F4\u65F6\uFF0C\u4E0D\u4F1A\u8FDB\u884C\u8986\u76D6</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run -d --name main4 -v mypkg:/pkg/ centos:main # /pkg/\u4E0E\u955C\u50CF\u4E2D\u7684/data/\u4E0D\u4E00\u81F4\uFF0C\u4E24\u4E2A\u5377\u90FD\u4F1A\u521B\u5EFA</span>

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker volume ls</span>
DRIVER    VOLUME NAME
<span class="token builtin class-name">local</span>     0f6d8c19f62874b7e5f39653c36a67de5bbdc22f4ef516fbe00bef0d554ba05b	
<span class="token builtin class-name">local</span>     650d74ab0215307f165e07ff39bae4dfb10b6d32561cddec65c28dff207ffda4	<span class="token comment"># \u81EA\u52A8\u521B\u5EFA\u7684\uFF0C\u7528\u4E8E\u6301\u4E45\u5316/data/</span>
<span class="token builtin class-name">local</span>     807798b92c720098345fb3d9629571bbb67c43d1712248ae45038722cca70a7c
<span class="token builtin class-name">local</span>     mydata
<span class="token builtin class-name">local</span>     mypkg	<span class="token comment"># \u81EA\u52A8\u521B\u5EFA\u7684\uFF0C\u7528\u4E8E\u6301\u4E45\u5316/pkg/</span>


<span class="token comment"># \u770B\u4E00\u4E0B\u5BB9\u5668\u6301\u4E45\u5316\u8BE6\u60C5</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container inspect main4 | grep -i mounts -A 20</span>
        <span class="token string">&quot;Mounts&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token string">&quot;Type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;volume&quot;</span>,
                <span class="token string">&quot;Name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;mypkg&quot;</span>,
                <span class="token string">&quot;Source&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/var/lib/docker/volumes/mypkg/_data&quot;</span>,
                <span class="token string">&quot;Destination&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/pkg&quot;</span>,
                <span class="token string">&quot;Driver&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;local&quot;</span>,
                <span class="token string">&quot;Mode&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;z&quot;</span>,
                <span class="token string">&quot;RW&quot;</span><span class="token builtin class-name">:</span> true,
                <span class="token string">&quot;Propagation&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>
            <span class="token punctuation">}</span>,
            <span class="token punctuation">{</span>
                <span class="token string">&quot;Type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;volume&quot;</span>,
                <span class="token string">&quot;Name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;650d74ab0215307f165e07ff39bae4dfb10b6d32561cddec65c28dff207ffda4&quot;</span>,
                <span class="token string">&quot;Source&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/var/lib/docker/volumes/650d74ab0215307f165e07ff39bae4dfb10b6d32561cddec65c28dff207ffda4/_data&quot;</span>,
                <span class="token string">&quot;Destination&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/data&quot;</span>,
                <span class="token string">&quot;Driver&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;local&quot;</span>,
                <span class="token string">&quot;Mode&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
                <span class="token string">&quot;RW&quot;</span><span class="token builtin class-name">:</span> true,
                <span class="token string">&quot;Propagation&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>
            <span class="token punctuation">}</span>
</code></pre></div></details><h4 id="\u5185\u5B58\u6587\u4EF6\u7CFB\u7EDF-tmpfs-mounts" tabindex="-1"><a class="header-anchor" href="#\u5185\u5B58\u6587\u4EF6\u7CFB\u7EDF-tmpfs-mounts" aria-hidden="true">#</a> \u5185\u5B58\u6587\u4EF6\u7CFB\u7EDF\uFF1Atmpfs mounts</h4>`,10),en=s("\u6587\u6863\uFF1A"),on={href:"https://docs.docker.com/storage/tmpfs/",target:"_blank",rel:"noopener noreferrer"},pn=s("https://docs.docker.com/storage/tmpfs/"),cn=e(`<p>\u5BB9\u5668\u7684\u6570\u636E\u4F1A\u653E\u5230\u5BBF\u4E3B\u673A\u5185\u5B58\u4E2D\uFF0C\u5F53\u5BB9\u5668\u91CD\u542F\u540E\u6570\u636E\u6E05\u7A7A</p><details class="custom-container details"><summary>tmpfs mounts\u57FA\u7840\u64CD\u4F5C</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u542F\u52A8\u4E00\u4E2A\u5BB9\u5668\uFF0C\u5BB9\u5668\u7684/data\u76EE\u5F55\u6570\u636E\u5B58\u5728\u4E8E\u5BBF\u4E3B\u673A\u5185\u5B58\u4E2D</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run --name mycentos -itd --mount type=tmpfs,dst=/data centos:7</span>

<span class="token comment"># \u67E5\u770B\u5377\uFF0C\u5E76\u6CA1\u6709\u521B\u5EFA</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker volume ls</span>
DRIVER    VOLUME NAME

<span class="token comment"># \u67E5\u770B\u5BB9\u5668\u5B58\u50A8</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container inspect mycentos | grep -i mounts -A 13</span>
            <span class="token string">&quot;Mounts&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span>
                    <span class="token string">&quot;Type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;tmpfs&quot;</span>,
                    <span class="token string">&quot;Target&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/data&quot;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>,
            <span class="token string">&quot;MaskedPaths&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
                <span class="token string">&quot;/proc/asound&quot;</span>,
                <span class="token string">&quot;/proc/acpi&quot;</span>,
                <span class="token string">&quot;/proc/kcore&quot;</span>,
                <span class="token string">&quot;/proc/keys&quot;</span>,
                <span class="token string">&quot;/proc/latency_stats&quot;</span>,
                <span class="token string">&quot;/proc/timer_list&quot;</span>,
                <span class="token string">&quot;/proc/timer_stats&quot;</span>,
--
        <span class="token string">&quot;Mounts&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token string">&quot;Type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;tmpfs&quot;</span>,
                <span class="token string">&quot;Source&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
                <span class="token string">&quot;Destination&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/data&quot;</span>,
                <span class="token string">&quot;Mode&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
                <span class="token string">&quot;RW&quot;</span><span class="token builtin class-name">:</span> true,
                <span class="token string">&quot;Propagation&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>,
        <span class="token string">&quot;Config&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;Hostname&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;99d0d321bd5f&quot;</span>,
            <span class="token string">&quot;Domainname&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
            <span class="token string">&quot;User&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
            
<span class="token comment"># \u5728\u5BB9\u5668/data\u4E2D\u5199\u70B9\u6570\u636E</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container exec -it mycentos /bin/bash</span>
<span class="token punctuation">[</span>root@99d0d321bd5f /<span class="token punctuation">]</span><span class="token comment"># cd /data</span>
<span class="token punctuation">[</span>root@99d0d321bd5f data<span class="token punctuation">]</span><span class="token comment"># seq 100 &gt; 1.txt</span>
<span class="token punctuation">[</span>root@99d0d321bd5f data<span class="token punctuation">]</span><span class="token comment"># exit</span>

<span class="token comment"># \u91CD\u542F\u5BB9\u5668\uFF0C\u68C0\u67E5\u6570\u636E\u5DF2\u7ECF\u4E0D\u5B58\u5728\u4E86</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container restart mycentos</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container exec -it mycentos /bin/bash</span>
<span class="token punctuation">[</span>root@99d0d321bd5f /<span class="token punctuation">]</span><span class="token comment"># ls /data/</span>
<span class="token punctuation">[</span>root@99d0d321bd5f /<span class="token punctuation">]</span><span class="token comment"># </span>
</code></pre></div></details><h3 id="docker\u8D44\u6E90\u9650\u5236" tabindex="-1"><a class="header-anchor" href="#docker\u8D44\u6E90\u9650\u5236" aria-hidden="true">#</a> Docker\u8D44\u6E90\u9650\u5236</h3>`,3),ln=s("\u6587\u6863\uFF1A"),rn={href:"https://docs.docker.com/config/containers/resource_constraints/",target:"_blank",rel:"noopener noreferrer"},un=s("https://docs.docker.com/config/containers/resource_constraints/"),kn=e(`<p>\u9ED8\u8BA4Docker\u662F\u4E0D\u9650\u5236\u5BB9\u5668\u6240\u4F7F\u7528\u7684\u5185\u5B58\u3001CPU\u7B49\u8D44\u6E90</p><h4 id="\u5185\u5B58\u9650\u5236" tabindex="-1"><a class="header-anchor" href="#\u5185\u5B58\u9650\u5236" aria-hidden="true">#</a> \u5185\u5B58\u9650\u5236</h4><table><thead><tr><th>\u9009\u9879</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td><code>-m</code> or <code>--memory</code></td><td>\u5BB9\u5668\u53EF\u4EE5\u4F7F\u7528\u7684\u6700\u5927\u5185\u5B58<br>\u5982\u679C\u8BBE\u7F6E\u6B64\u9009\u9879\uFF0C\u5219\u5141\u8BB8\u7684\u6700\u5C0F\u503C\u4E3A6m\uFF086 MB\uFF09\uFF0C\u4E5F\u5C31\u662F\u8BF4\uFF0C\u5FC5\u987B\u5C06\u8BE5\u503C\u8BBE\u7F6E\u4E3A\u81F3\u5C116 MB</td></tr><tr><td><code>--memory-swap</code></td><td>\u5BB9\u5668\u53EF\u4EE5\u4F7F\u7528\u7684\u6700\u5927\u4EA4\u6362\u5206\u533A</td></tr><tr><td><code>--memory-swappiness</code></td><td>\u5F53\u7269\u7406\u5185\u5B58\u5269\u4F59N\u65F6\u5C31\u5F00\u59CB\u4F7F\u7528\u4EA4\u6362\u5206\u533A\uFF0C\u53EF\u8BBE\u7F6E\u8303\u56F4\u57280\u5230100\u4E4B\u95F4\uFF0C \u5355\u4F4D\u767E\u5206\u6BD4<br>\u4E0D\u8BBE\u7F6E\u6B64\u503C\u5219\u9ED8\u8BA4\u4F7F\u7528\u7CFB\u7EDF\u8BBE\u7F6E\u7684\u503C,\u4E00\u822C\u4E3A30\uFF08\u5F53\u5269\u4F59\u7269\u7406\u5185\u5B58\u5C0F\u4E8E30%\u65F6\u5F00\u59CB\u4F7F\u7528\u4EA4\u6362\u5206\u533A\uFF09</td></tr><tr><td><code>--oom-kill-disable</code></td><td>\u7981\u7528OOM Killer</td></tr></tbody></table><h4 id="cpu\u9650\u5236" tabindex="-1"><a class="header-anchor" href="#cpu\u9650\u5236" aria-hidden="true">#</a> CPU\u9650\u5236</h4><table><thead><tr><th>\u9009\u9879</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td><code>--cpus</code></td><td>\u53EF\u4F7F\u7528\u7684CPU\u6838\u5FC3\u6570</td></tr><tr><td><code>--cpuset-cpus</code></td><td>\u9650\u5236\u5BB9\u5668\u4F7F\u7528\u7279\u5B9A\u7684CPU\u6838\u5FC3\uFF0C\u6BD4\u59820-3,1\u7B49</td></tr><tr><td><code>--cpu-shares</code></td><td>CPU\u5171\u4EAB\uFF08\u76F8\u5BF9\u6743\u91CD\uFF09</td></tr></tbody></table><h3 id="docker\u7F51\u7EDC" tabindex="-1"><a class="header-anchor" href="#docker\u7F51\u7EDC" aria-hidden="true">#</a> Docker\u7F51\u7EDC</h3><h4 id="docker\u81EA\u5E26\u76843\u79CD\u7F51\u7EDC" tabindex="-1"><a class="header-anchor" href="#docker\u81EA\u5E26\u76843\u79CD\u7F51\u7EDC" aria-hidden="true">#</a> Docker\u81EA\u5E26\u76843\u79CD\u7F51\u7EDC</h4><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u901A\u8FC7\u5982\u4E0B\u547D\u4EE4\u53EF\u4EE5\u67E5\u770BDocker\u81EA\u5E26\u76843\u79CD\u57FA\u672C\u7F51\u7EDC\uFF0C\u4F46\u5B9E\u9645\u4E0A\u6211\u4EEC\u53EF\u7528\u7684\u5E76\u4E0D\u4EC5\u4EC5\u662F\u8FD93\u79CD\uFF0C\u540E\u9762\u4F1A\u4E00\u4E00\u4ECB\u7ECD</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker network ls</span>
NETWORK ID     NAME      DRIVER    SCOPE
aece42e0e44c   bridge    bridge    <span class="token builtin class-name">local</span>
db9a2c63802b   <span class="token function">host</span>      <span class="token function">host</span>      <span class="token builtin class-name">local</span>
e05e046464f3   none      null      <span class="token builtin class-name">local</span>
</code></pre></div><h4 id="_1-none\u7F51\u7EDC" tabindex="-1"><a class="header-anchor" href="#_1-none\u7F51\u7EDC" aria-hidden="true">#</a> \uFF081\uFF09none\u7F51\u7EDC</h4>`,9),mn=s("\u6587\u6863\uFF1A"),dn={href:"https://docs.docker.com/network/none/",target:"_blank",rel:"noopener noreferrer"},bn=s("https://docs.docker.com/network/none/"),gn=e(`<p>none\u7C7B\u578B\u7684\u7F51\u7EDC\u53EA\u6709\u4E00\u4E2A\u56DE\u73AF\u63A5\u53E3lo\uFF0C\u6CA1\u6709\u529E\u6CD5\u8054\u7F51\uFF0C\u5C01\u95ED\u7684\u7F51\u7EDC\u80FD\u5F88\u597D\u7684\u4FDD\u8BC1\u5BB9\u5668\u7684\u5B89\u5168\u6027</p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u8BE6\u60C5</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u542F\u52A8\u5BB9\u5668,\u8BBE\u7F6E\u7F51\u7EDC\u7C7B\u578B\u4E3Anone</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run --name demo -itd --network=none busybox:1.34</span>

<span class="token comment"># \u67E5\u770B\u5BB9\u5668\u7F51\u7EDC\u6A21\u5F0F</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container inspect demo | grep -i network</span>
            <span class="token string">&quot;NetworkMode&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;none&quot;</span>, <span class="token comment"># \u7F51\u7EDC\u6A21\u5F0F\u4E3Anone\u7C7B\u578B</span>
        <span class="token string">&quot;NetworkSettings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;Networks&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                    <span class="token string">&quot;NetworkID&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;e05e046464f3b65349d7895ca9d365f03e5bf261a5e1e30ede561b80f8d2010e&quot;</span>,                    
                    
<span class="token comment"># \u5728\u5BB9\u5668\u4E2D\u67E5\u770B\u7F51\u7EDC\u63A5\u53E3</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container exec -it demo ip a</span>
<span class="token number">1</span>: lo: <span class="token operator">&lt;</span>LOOPBACK,UP,LOWER_UP<span class="token operator">&gt;</span> mtu <span class="token number">65536</span> qdisc noqueue qlen <span class="token number">1</span>
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet <span class="token number">127.0</span>.0.1/8 scope <span class="token function">host</span> lo
       valid_lft forever preferred_lft forever
</code></pre></div></details><h4 id="_2-host\u7F51\u7EDC" tabindex="-1"><a class="header-anchor" href="#_2-host\u7F51\u7EDC" aria-hidden="true">#</a> \uFF082\uFF09host\u7F51\u7EDC</h4>`,3),fn=s("\u6587\u6863\uFF1A"),hn={href:"https://docs.docker.com/network/host/",target:"_blank",rel:"noopener noreferrer"},qn=s("https://docs.docker.com/network/host/"),vn=e(`<p>host\u7C7B\u578B\u7684\u7F51\u7EDC\u548C\u548C\u5BBF\u4E3B\u673A\u5171\u7528\u4E00\u4E2A<code>Network Namespace</code>\uFF0C\u5373<span style="color:red;font-weight:bold;">\u5BB9\u5668\u548C\u5BBF\u4E3B\u673A\u7684IP\u548C\u7AEF\u53E3\u7B49\u662F\u5171\u7528\u7684</span></p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u8BE6\u60C5</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u542F\u52A8\u5BB9\u5668,\u8BBE\u7F6E\u7F51\u7EDC\u7C7B\u578B\u4E3Ahost</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker run --name demo -itd --network host busybox:1.34</span>

<span class="token comment"># \u67E5\u770B\u5BB9\u5668\u7F51\u7EDC\u6A21\u5F0F</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container inspect demo | grep -i network</span>
            <span class="token string">&quot;NetworkMode&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;host&quot;</span>,
        <span class="token string">&quot;NetworkSettings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;Networks&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                    <span class="token string">&quot;NetworkID&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;db9a2c63802b71ff7c22f7c789415c0dc06f111de9db4e07c4ce13a45d47eea6&quot;</span>,
                    
<span class="token comment"># \u5728\u5BB9\u5668\u4E2D\u67E5\u770B\u7F51\u7EDC\u63A5\u53E3\uFF0C\u548C\u5BBF\u4E3B\u673A\u8F93\u51FA\u4E00\u81F4</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container exec -it demo ip a</span>
<span class="token number">1</span>: lo: <span class="token operator">&lt;</span>LOOPBACK,UP,LOWER_UP<span class="token operator">&gt;</span> mtu <span class="token number">65536</span> qdisc noqueue qlen <span class="token number">1</span>
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet <span class="token number">127.0</span>.0.1/8 scope <span class="token function">host</span> lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope <span class="token function">host</span> 
       valid_lft forever preferred_lft forever
<span class="token number">2</span>: ens33: <span class="token operator">&lt;</span>BROADCAST,MULTICAST,UP,LOWER_UP<span class="token operator">&gt;</span> mtu <span class="token number">1500</span> qdisc pfifo_fast qlen <span class="token number">1000</span>
    link/ether 00:0c:29:9b:05:4a brd ff:ff:ff:ff:ff:ff
    inet <span class="token number">192.168</span>.48.133/24 brd <span class="token number">192.168</span>.48.255 scope global dynamic ens33
       valid_lft 1010sec preferred_lft 1010sec
    inet6 fe80::10b3:d204:8d1d:93f7/64 scope <span class="token function">link</span> 
       valid_lft forever preferred_lft forever
<span class="token number">3</span>: docker0: <span class="token operator">&lt;</span>NO-CARRIER,BROADCAST,MULTICAST,UP<span class="token operator">&gt;</span> mtu <span class="token number">1500</span> qdisc noqueue 
    link/ether 02:42:c2:e3:1b:d5 brd ff:ff:ff:ff:ff:ff
    inet <span class="token number">172.17</span>.0.1/16 brd <span class="token number">172.17</span>.255.255 scope global docker0
       valid_lft forever preferred_lft forever
    inet6 fe80::42:c2ff:fee3:1bd5/64 scope <span class="token function">link</span> 
       valid_lft forever preferred_lft forever

<span class="token comment"># ------------------------------------------------------------------------------------------------------------------</span>
<span class="token comment"># \u5728\u5BBF\u4E3B\u673A\u76D1\u542C\u4E00\u4E2A\u7AEF\u53E3\uFF0C\u7136\u540E\u8FDB\u5165\u5BB9\u5668\u7EE7\u7EED\u76D1\u542C\u6B64\u7AEF\u53E3\uFF0C\u53D1\u73B0\u7AEF\u53E3\u5DF2\u7ECF\u88AB\u5360\u7528\u4E86</span>

<span class="token comment"># \u5BBF\u4E3B\u673A\u76D1\u542C10000\u7AEF\u53E3</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># nc -l -v -p 10000</span>
Ncat: Version <span class="token number">7.50</span> <span class="token punctuation">(</span> https://nmap.org/ncat <span class="token punctuation">)</span>
Ncat: Listening on :::10000
Ncat: Listening on <span class="token number">0.0</span>.0.0:10000

<span class="token comment"># \u8FDB\u5165\u5BB9\u5668\uFF0C\u4E5F\u76D1\u542C10000\u7AEF\u53E3\uFF0C\u53D1\u73B0\u7AEF\u53E3\u88AB\u5360\u7528</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container exec -it demo nc -l -v -p 10000</span>
nc: bind: Address already <span class="token keyword">in</span> use
</code></pre></div></details><h4 id="_3-container\u7F51\u7EDC" tabindex="-1"><a class="header-anchor" href="#_3-container\u7F51\u7EDC" aria-hidden="true">#</a> \uFF083\uFF09container\u7F51\u7EDC</h4><p>\u6211\u4EEC\u5728\u542F\u52A8\u5BB9\u5668\u65F6\u5019\uFF0C\u53EF\u4EE5\u6307\u5B9A\u5171\u4EAB\u5DF2\u5B58\u5728\u7684\u5BB9\u5668\u7684\u7F51\u7EDC</p><details class="custom-container details"><summary>container\u7F51\u7EDC</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u542F\u52A8\u4E00\u4E2A\u5BB9\u5668</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run --name demo1 -itd busybox:1.34</span>

<span class="token comment"># \u518D\u542F\u52A8\u4E00\u4E2A\u5BB9\u5668\uFF0C\u901A\u8FC7--network container:demo1\u53C2\u6570\uFF0C\u6307\u5B9A\u5171\u4EABdemo1\u5BB9\u5668\u7684\u7F51\u7EDC</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run --name demo2 -itd --network container:demo1 busybox:1.34</span>

<span class="token comment"># \u5206\u522B\u67E5\u770B\u4E24\u4E2A\u5BB9\u5668\u7684IP\uFF0C\u53D1\u73B0\u662F\u4E00\u6837\u7684</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container exec -it demo1 ip a</span>
<span class="token number">1</span>: lo: <span class="token operator">&lt;</span>LOOPBACK,UP,LOWER_UP<span class="token operator">&gt;</span> mtu <span class="token number">65536</span> qdisc noqueue qlen <span class="token number">1</span>
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet <span class="token number">127.0</span>.0.1/8 scope <span class="token function">host</span> lo
       valid_lft forever preferred_lft forever
<span class="token number">30</span>: eth0@if31: <span class="token operator">&lt;</span>BROADCAST,MULTICAST,UP,LOWER_UP,M-DOWN<span class="token operator">&gt;</span> mtu <span class="token number">1500</span> qdisc noqueue 
    link/ether 02:42:ac:11:00:02 brd ff:ff:ff:ff:ff:ff
    inet <span class="token number">172.17</span>.0.2/16 brd <span class="token number">172.17</span>.255.255 scope global eth0  <span class="token comment"># IP\uFF1A172.17.0.2/16</span>
       valid_lft forever preferred_lft forever

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container exec -it demo2 ip a</span>
<span class="token number">1</span>: lo: <span class="token operator">&lt;</span>LOOPBACK,UP,LOWER_UP<span class="token operator">&gt;</span> mtu <span class="token number">65536</span> qdisc noqueue qlen <span class="token number">1</span>
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet <span class="token number">127.0</span>.0.1/8 scope <span class="token function">host</span> lo
       valid_lft forever preferred_lft forever
<span class="token number">30</span>: eth0@if31: <span class="token operator">&lt;</span>BROADCAST,MULTICAST,UP,LOWER_UP,M-DOWN<span class="token operator">&gt;</span> mtu <span class="token number">1500</span> qdisc noqueue 
    link/ether 02:42:ac:11:00:02 brd ff:ff:ff:ff:ff:ff
    inet <span class="token number">172.17</span>.0.2/16 brd <span class="token number">172.17</span>.255.255 scope global eth0	 <span class="token comment"># IP\uFF1A172.17.0.2/16</span>
       valid_lft forever preferred_lft forever
</code></pre></div></details><h4 id="_4-1-\u9ED8\u8BA4bridge\u7F51\u7EDC" tabindex="-1"><a class="header-anchor" href="#_4-1-\u9ED8\u8BA4bridge\u7F51\u7EDC" aria-hidden="true">#</a> \uFF084-1\uFF09\u9ED8\u8BA4bridge\u7F51\u7EDC</h4>`,6),xn=s("\u6587\u6863\uFF1A"),wn={href:"https://docs.docker.com/network/bridge/",target:"_blank",rel:"noopener noreferrer"},yn=s("https://docs.docker.com/network/bridge/"),_n=e(`<p>Docker\u8FDB\u7A0B\u542F\u52A8\u65F6\uFF0C\u4F1A\u5728\u4E3B\u673A\u4E0A\u521B\u5EFA\u4E00\u4E2A\u540D\u4E3A<code>docker0</code>\u7684\u865A\u62DF\u7F51\u6865\uFF0C\u6B64\u4E3B\u673A\u4E0A\u542F\u52A8\u7684Docker\u5BB9\u5668\u4F1A\u8FDE\u63A5\u5230\u8FD9\u4E2A\u865A\u62DF\u7F51\u6865\u4E0A\u3002 \u865A\u62DF\u7F51\u6865\u7684\u5DE5\u4F5C\u65B9\u5F0F\u548C\u7269\u7406\u4EA4\u6362\u673A\u7C7B\u4F3C\uFF0C\u8FD9\u6837\u4E3B\u673A\u4E0A\u7684\u6240\u6709\u5BB9\u5668\u5C31\u901A\u8FC7\u4EA4\u6362\u673A\u8FDE\u5728\u4E86\u4E00\u4E2A\u4E8C\u5C42\u7F51\u7EDC\u4E2D</p><br><p><code>bridge</code>\u662F\u521B\u5EFA\u5BB9\u5668\u65F6docker\u9ED8\u8BA4\u7F51\u7EDC\uFF0C\u76F8\u540Cbridge\u4E0B\u7684\u5BB9\u5668\u53EF\u4EE5\u4E92\u76F8\u901A\u4FE1\uFF0C\u4E0D\u540Cbridge\u4E0B\u7684\u5BB9\u5668\u4E0D\u80FD\u901A\u4FE1</p><br><p>\u521B\u5EFA\u5BB9\u5668bridge\u7F51\u7EDC\u7684\u6D41\u7A0B</p><ol><li><p>\u5728\u5BBF\u4E3B\u673A\u4E0A\u521B\u5EFA\u4E00\u5BF9\u865A\u62DF\u7F51\u5361veth pair\u8BBE\u5907</p></li><li><p>Docker\u5C06veth pair\u8BBE\u5907\u7684\u4E00\u7AEF\u653E\u5728\u65B0\u521B\u5EFA\u7684\u5BB9\u5668\u4E2D\uFF0C\u5E76\u547D\u540D\u4E3Aeth0\uFF1B</p><p>Docker\u5C06\u53E6\u4E00\u7AEF\u653E\u5728\u4E3B\u673A\u4E2D\uFF0C\u4EE5veth*\u8FD9\u6837\u7C7B\u4F3C\u7684\u540D\u5B57\u547D\u540D\uFF0C\u5E76\u5C06\u8FD9\u4E2A\u7F51\u7EDC\u8BBE\u5907\u52A0\u5165\u5230docker0\u7F51\u6865\u4E2D</p></li><li><p>\u4ECE<code>docker0</code>\u5B50\u7F51\u4E2D\u5206\u914D\u4E00\u4E2AIP\u7ED9\u5BB9\u5668\u4F7F\u7528\uFF0C\u5E76\u8BBE\u7F6Edocker0\u7684IP\u5730\u5740\u4E3A\u5BB9\u5668\u7684\u9ED8\u8BA4\u7F51\u5173</p></li></ol><br><details class="custom-container details"><summary>\u76F8\u5173\u547D\u4EE4\u7B80\u4ECB</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># yum install -y bridge-utils</span>

<span class="token comment"># \u67E5\u770Bdocker\u81EA\u5E26\u76843\u79CD\u7F51\u7EDC</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker network ls</span>
NETWORK ID     NAME      DRIVER    SCOPE
e47d2b8de53b   bridge    bridge    <span class="token builtin class-name">local</span>
db9a2c63802b   <span class="token function">host</span>      <span class="token function">host</span>      <span class="token builtin class-name">local</span>
e05e046464f3   none      null      <span class="token builtin class-name">local</span>

<span class="token comment"># \u67E5\u770B\u7F51\u6865\u8BE6\u60C5\uFF08\u5305\u542B\u5B50\u7F51\u548C\u94FE\u63A5\u7684\u5BB9\u5668\u7B49\uFF09</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker network inspect bridge</span>
		<span class="token comment"># \u5B50\u7F51\u4FE1\u606F</span>
        <span class="token string">&quot;IPAM&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;Driver&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;default&quot;</span>,
            <span class="token string">&quot;Options&quot;</span><span class="token builtin class-name">:</span> null,
            <span class="token string">&quot;Config&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span>
                    <span class="token string">&quot;Subnet&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;172.17.0.0/16&quot;</span>,	<span class="token comment"># \u5B50\u7F51\u5730\u5740</span>
                    <span class="token string">&quot;Gateway&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;172.17.0.1&quot;</span>		<span class="token comment"># \u9ED8\u8BA4\u7F51\u5173</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>,
        
        <span class="token comment"># \u94FE\u63A5\u7684\u5BB9\u5668</span>
        <span class="token string">&quot;Containers&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>            
        <span class="token punctuation">}</span>,
        

<span class="token comment"># \u67E5\u770B\u7CFB\u7EDF\u4E0A\u7684\u7F51\u6865\u5217\u8868</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># brctl show</span>
bridge name     bridge <span class="token function">id</span>               STP enabled     interfaces
docker0         <span class="token number">8000</span>.024259017b71       no

<span class="token comment"># \u5728\u5BBF\u4E3B\u673A\u4E0A\u548C\u5BB9\u5668\u79CD\u67E5\u770Bveth\u8BBE\u5907</span>
\u4F7F\u7528ifconfig\u3001ip a\u6216ip <span class="token function">link</span> list\u7B49\u547D\u4EE4
</code></pre></div></details><details class="custom-container details"><summary>\uFF080\uFF09\u51C6\u5907\u5DE5\u4F5C\uFF1A\u521B\u5EFA\u4E24\u4E2A\u5BB9\u5668\uFF0C\u5206\u522B\u4F7F\u7528\u9ED8\u8BA4\u7F51\u7EDC\u548C\u6307\u5B9Abridge\u7F51\u7EDC</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u521B\u5EFA\u4E24\u4E2A\u5BB9\u5668\uFF0C\u4E00\u4E2A\u4F7F\u7528\u9ED8\u8BA4\u7684\u7F51\u7EDC\uFF0C\u4E00\u4E2A\u6307\u5B9A\u4F7F\u7528bridge</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker run -itd --name demo1 busybox:1.34</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker run -itd --name demo2 --network bridge busybox:1.34</span>
</code></pre></div></details><details class="custom-container details"><summary>\uFF081\uFF09docker\u4E2D\u7684\u7F51\u6865\u548CLinux\u4E0A\u7684\u7F51\u6865\u5BF9\u5E94\u5173\u7CFB</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># Linux\u4E0A\u7684bridge\u5217\u8868</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># brctl show</span>
bridge name     		bridge <span class="token function">id</span>               STP enabled     interfaces
docker0         		<span class="token number">8000</span>.0242dad030cf       no

<span class="token comment"># Docker\u4E2D\u7684bridge\uFF0C\u5BF9\u5E94Linux bridge\u7684docker0</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker network inspect bridge | grep bridge.name</span>
            <span class="token string">&quot;com.docker.network.bridge.name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;docker0&quot;</span>,
</code></pre></div></details><details class="custom-container details"><summary>\uFF082\uFF09\u67E5\u770B\u9ED8\u8BA4\u7F51\u6865</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u6CA1\u6709\u627E\u5230\u660E\u663E\u7684\u4F9D\u636E\uFF0C\u53EA\u80FD\u68C0\u67E5\u4E00\u4E0B\u6709\u6CA1\u6709\u663E\u793A\u914D\u7F6E\u9ED8\u8BA4\u7F51\u6865\u662F\u5565\u6765\u5224\u65AD</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/docker/daemon.json</span>
<span class="token punctuation">{</span>
   <span class="token string">&quot;registry-mirrors&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;https://6xumug9e.mirror.aliyuncs.com&quot;</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div></details><details class="custom-container details"><summary>\uFF083\uFF09\u7F51\u6865\u548C\u5BB9\u5668\u7684\u5BF9\u5E94\u5173\u7CFB</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># Linux\u89D2\u5EA6\u6765\u770B\uFF0C\u7684docker0\u7F51\u6865\u4E0B\u5305\u542B2\u5BF9veth\u8BBE\u7F6E</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># brctl show</span>
bridge name     bridge <span class="token function">id</span>               STP enabled     interfaces
docker0         <span class="token number">8000</span>.024259017b71       no              veth2df3118
                                                        vethd035852
<span class="token comment"># Docker\u89D2\u5EA6\u6765\u770B\uFF0C\u7684\u9ED8\u8BA4\u7F51\u6865bridge\u4E0B\u5305\u542B2\u4E2A\u5BB9\u5668</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker network inspect bridge | grep -i containers -A 15</span>
        <span class="token string">&quot;Containers&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;6f54d26719d9e45e3a157998607994c29f09ec20a316d1d93ecc700d2fc45065&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                <span class="token string">&quot;Name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;demo1&quot;</span>,	<span class="token comment"># \u5BB9\u5668\u540D</span>
                <span class="token string">&quot;EndpointID&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;9d431e06472f77fed976acb927be1d38540fe25d114ee4e7daca7f15d527bd65&quot;</span>,
                <span class="token string">&quot;MacAddress&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;02:42:ac:11:00:02&quot;</span>,
                <span class="token string">&quot;IPv4Address&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;172.17.0.2/16&quot;</span>,
                <span class="token string">&quot;IPv6Address&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>
            <span class="token punctuation">}</span>,
            <span class="token string">&quot;be042630a0f8755c713aa29faaa74f7321246b5fd9e9cd96ce7d3a10c011238d&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                <span class="token string">&quot;Name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;demo2&quot;</span>,	<span class="token comment"># \u5BB9\u5668\u540D</span>
                <span class="token string">&quot;EndpointID&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;828bb4005aea51445d236b23a7c13df2cf900d551debb2ae1f4f32a15b9ba0d6&quot;</span>,
                <span class="token string">&quot;MacAddress&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;02:42:ac:11:00:03&quot;</span>,
                <span class="token string">&quot;IPv4Address&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;172.17.0.3/16&quot;</span>,
                <span class="token string">&quot;IPv6Address&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>,
        
<span class="token comment"># \u4ECE\u5BB9\u5668\u89D2\u5EA6\u6765\u770B\u6240\u4F7F\u7528\u7684\u7F51\u6865</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container inspect demo1 | grep -i network</span>
			<span class="token comment"># \u9ED8\u8BA4\u7F51\u6865\uFF0C\u4E00\u822C\u6765\u8BF4\u9ED8\u8BA4\u662Fbridge\uFF0C\u4F46\u4E5F\u53EF\u4EE5\u624B\u52A8\u6307\u5B9A\u9ED8\u8BA4\u7F51\u6865\uFF0C\u6240\u4EE5\u8FD9\u91CC\u5E76\u4E0D\u80FD\u8BF4\u660E\u4E00\u5B9A\u662Fbridge\uFF0C\u8FD8\u9700\u8981\u68C0\u67E5\u9ED8\u8BA4\u7F51\u6865\u5177\u4F53\u662F\u5565</span>
            <span class="token string">&quot;NetworkMode&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;default&quot;</span>,
        <span class="token string">&quot;NetworkSettings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;Networks&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                    <span class="token string">&quot;NetworkID&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;e47d2b8de53b2f7f989125a7f7362d15c4185189a6ef91900f8b08311a9676c0&quot;</span>,
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container inspect demo2 | grep -i network</span>
            <span class="token string">&quot;NetworkMode&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;bridge&quot;</span>,	<span class="token comment"># \u540D\u4E3Abridge\u7684\u7F51\u6865</span>
        <span class="token string">&quot;NetworkSettings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;Networks&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
                    <span class="token string">&quot;NetworkID&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;e47d2b8de53b2f7f989125a7f7362d15c4185189a6ef91900f8b08311a9676c0&quot;</span>,
</code></pre></div></details><details class="custom-container details"><summary>\uFF084\uFF09\u5BBF\u4E3B\u673A\u4E0A\u7684veth pair\u8BBE\u5907\u548C\u5BB9\u5668\u4E2D\u7684veth pair\u8BBE\u5907\u5BF9\u5E94\u5173\u7CFB</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u5728\u5BBF\u4E3B\u673A\u4E0A\u67E5\u770Bveth\u8BBE\u5907</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ip a</span>
<span class="token number">1</span>: lo: <span class="token operator">&lt;</span>LOOPBACK,UP,LOWER_UP<span class="token operator">&gt;</span> mtu <span class="token number">65536</span> qdisc noqueue state UNKNOWN qlen <span class="token number">1</span>
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet <span class="token number">127.0</span>.0.1/8 scope <span class="token function">host</span> lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope <span class="token function">host</span> 
       valid_lft forever preferred_lft forever
<span class="token number">2</span>: ens33: <span class="token operator">&lt;</span>BROADCAST,MULTICAST,UP,LOWER_UP<span class="token operator">&gt;</span> mtu <span class="token number">1500</span> qdisc pfifo_fast state UP qlen <span class="token number">1000</span>
    link/ether 00:0c:29:9b:05:4a brd ff:ff:ff:ff:ff:ff
    inet <span class="token number">192.168</span>.48.133/24 brd <span class="token number">192.168</span>.48.255 scope global dynamic ens33
       valid_lft 1167sec preferred_lft 1167sec
    inet6 fe80::10b3:d204:8d1d:93f7/64 scope <span class="token function">link</span> 
       valid_lft forever preferred_lft forever
<span class="token number">3</span>: docker0: <span class="token operator">&lt;</span>BROADCAST,MULTICAST,UP,LOWER_UP<span class="token operator">&gt;</span> mtu <span class="token number">1500</span> qdisc noqueue state UP 
    link/ether 02:42:59:01:7b:71 brd ff:ff:ff:ff:ff:ff
    inet <span class="token number">172.17</span>.0.1/16 brd <span class="token number">172.17</span>.255.255 scope global docker0
       valid_lft forever preferred_lft forever
    inet6 fe80::42:59ff:fe01:7b71/64 scope <span class="token function">link</span> 
       valid_lft forever preferred_lft forever

<span class="token number">9</span>: veth8041554@if8: <span class="token operator">&lt;</span>BROADCAST,MULTICAST,UP,LOWER_UP<span class="token operator">&gt;</span> mtu <span class="token number">1500</span> qdisc noqueue master docker0 state UP <span class="token comment"># \u8FD9\u91CC9\u548C8\u662F\u4E00\u5BF9veth pair\u8BBE\u5907</span>
    link/ether <span class="token number">12</span>:ca:18:5f:16:66 brd ff:ff:ff:ff:ff:ff link-netnsid <span class="token number">0</span>
    inet6 fe80::10ca:18ff:fe5f:1666/64 scope <span class="token function">link</span> 
       valid_lft forever preferred_lft forever

<span class="token number">11</span>: veth2df3118@if10: <span class="token operator">&lt;</span>BROADCAST,MULTICAST,UP,LOWER_UP<span class="token operator">&gt;</span> mtu <span class="token number">1500</span> qdisc noqueue master docker0 state UP<span class="token comment"># \u8FD9\u91CC11\u548C10\u662F\u4E00\u5BF9veth pair\u8BBE\u5907</span>
    link/ether aa:3a:c5:72:77:81 brd ff:ff:ff:ff:ff:ff link-netnsid <span class="token number">1</span>
    inet6 fe80::a83a:c5ff:fe72:7781/64 scope <span class="token function">link</span> 
       valid_lft forever preferred_lft forever
        
<span class="token comment"># \u5728\u5BB9\u5668\u4E2D\u67E5\u770Bveth\u8BBE\u5907</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container exec -it demo1 ip a</span>
<span class="token number">1</span>: lo: <span class="token operator">&lt;</span>LOOPBACK,UP,LOWER_UP<span class="token operator">&gt;</span> mtu <span class="token number">65536</span> qdisc noqueue qlen <span class="token number">1</span>
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet <span class="token number">127.0</span>.0.1/8 scope <span class="token function">host</span> lo
       valid_lft forever preferred_lft forever
<span class="token number">8</span>: eth0@if9: <span class="token operator">&lt;</span>BROADCAST,MULTICAST,UP,LOWER_UP,M-DOWN<span class="token operator">&gt;</span> mtu <span class="token number">1500</span> qdisc noqueue 	<span class="token comment"># 8\u548C9\u662F\u4E00\u5BF9veth pair\u8BBE\u5907\uFF0C\u6B63\u597D\u53EF\u4EE5\u5BF9\u5E94\u4E0A</span>
    link/ether 02:42:ac:11:00:02 brd ff:ff:ff:ff:ff:ff
    inet <span class="token number">172.17</span>.0.2/16 brd <span class="token number">172.17</span>.255.255 scope global eth0
       valid_lft forever preferred_lft forever

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container exec -it demo2 ip a</span>
<span class="token number">1</span>: lo: <span class="token operator">&lt;</span>LOOPBACK,UP,LOWER_UP<span class="token operator">&gt;</span> mtu <span class="token number">65536</span> qdisc noqueue qlen <span class="token number">1</span>
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet <span class="token number">127.0</span>.0.1/8 scope <span class="token function">host</span> lo
       valid_lft forever preferred_lft forever
<span class="token number">10</span>: eth0@if11: <span class="token operator">&lt;</span>BROADCAST,MULTICAST,UP,LOWER_UP,M-DOWN<span class="token operator">&gt;</span> mtu <span class="token number">1500</span> qdisc noqueue 	<span class="token comment"># 10\u548C11\u662F\u4E00\u5BF9veth pair\u8BBE\u5907\uFF0C\u6B63\u597D\u53EF\u4EE5\u5BF9\u5E94\u4E0A</span>
    link/ether 02:42:ac:11:00:03 brd ff:ff:ff:ff:ff:ff
    inet <span class="token number">172.17</span>.0.3/16 brd <span class="token number">172.17</span>.255.255 scope global eth0
       valid_lft forever preferred_lft forever
</code></pre></div></details><h4 id="_4-2-\u81EA\u5B9A\u4E49bridge\u7F51\u7EDC" tabindex="-1"><a class="header-anchor" href="#_4-2-\u81EA\u5B9A\u4E49bridge\u7F51\u7EDC" aria-hidden="true">#</a> \uFF084-2\uFF09\u81EA\u5B9A\u4E49bridge\u7F51\u7EDC</h4>`,14),An=s("\u6587\u6863\uFF1A"),Rn={href:"https://docs.docker.com/network/bridge/",target:"_blank",rel:"noopener noreferrer"},Nn=s("https://docs.docker.com/network/bridge/"),En=e(`<p>\u9ED8\u8BA4\u7684\u7F51\u6865\uFF08bridge\uFF09\u5E76\u4E0D\u63A8\u8350\u5728\u751F\u4EA7\u73AF\u5883\u4E2D\u4F7F\u7528\uFF0C\u56E0\u4E3A\u5B58\u5728\u4E00\u4E9B\u6280\u672F\u7F3A\u9677\uFF0C\u66F4\u597D\u7684\u65B9\u5F0F\u662F\u4F7F\u7528\u7528\u6237\u81EA\u5B9A\u4E49bridge\u7F51\u7EDC</p><details class="custom-container details"><summary>\uFF081\uFF09\u521B\u5EFA\u81EA\u5B9A\u4E49bridge\u7F51\u7EDC</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u4ECEDocker\u89D2\u5EA6\uFF0C\u770B\u4E00\u4E0B\u5F53\u524D\u7684\u7F51\u7EDC</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker network ls</span>
NETWORK ID     NAME      DRIVER    SCOPE
e47d2b8de53b   bridge    bridge    <span class="token builtin class-name">local</span>
db9a2c63802b   <span class="token function">host</span>      <span class="token function">host</span>      <span class="token builtin class-name">local</span>
e05e046464f3   none      null      <span class="token builtin class-name">local</span>

<span class="token comment"># \u4ECELinux\u89D2\u5EA6\uFF0C\u770B\u4E00\u4E0B\u5F53\u524D\u7684\u7F51\u7EDC</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># brctl show</span>
bridge name     bridge <span class="token function">id</span>               STP enabled     interfaces
docker0         <span class="token number">8000</span>.024259017b71       no

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ip a</span>
<span class="token number">1</span>: lo: <span class="token operator">&lt;</span>LOOPBACK,UP,LOWER_UP<span class="token operator">&gt;</span> mtu <span class="token number">65536</span> qdisc noqueue state UNKNOWN qlen <span class="token number">1</span>
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet <span class="token number">127.0</span>.0.1/8 scope <span class="token function">host</span> lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope <span class="token function">host</span> 
       valid_lft forever preferred_lft forever
<span class="token number">2</span>: ens33: <span class="token operator">&lt;</span>BROADCAST,MULTICAST,UP,LOWER_UP<span class="token operator">&gt;</span> mtu <span class="token number">1500</span> qdisc pfifo_fast state UP qlen <span class="token number">1000</span>
    link/ether 00:0c:29:9b:05:4a brd ff:ff:ff:ff:ff:ff
    inet <span class="token number">192.168</span>.48.133/24 brd <span class="token number">192.168</span>.48.255 scope global dynamic ens33
       valid_lft 1446sec preferred_lft 1446sec
    inet6 fe80::10b3:d204:8d1d:93f7/64 scope <span class="token function">link</span> 
       valid_lft forever preferred_lft forever
<span class="token number">3</span>: docker0: <span class="token operator">&lt;</span>NO-CARRIER,BROADCAST,MULTICAST,UP<span class="token operator">&gt;</span> mtu <span class="token number">1500</span> qdisc noqueue state DOWN 
    link/ether 02:42:59:01:7b:71 brd ff:ff:ff:ff:ff:ff
    inet <span class="token number">172.17</span>.0.1/16 brd <span class="token number">172.17</span>.255.255 scope global docker0
       valid_lft forever preferred_lft forever
    inet6 fe80::42:59ff:fe01:7b71/64 scope <span class="token function">link</span> 
       valid_lft forever preferred_lft forever

<span class="token comment"># \u521B\u5EFA\u4E00\u4E2A\u81EA\u5B9A\u4E49\u7684\u7F51\u7EDC\uFF0C\u7F51\u7EDC\u9A71\u52A8\u4E3Abridge\uFF0C\u5B50\u7F51172.20.0.0/16\uFF0C\u9ED8\u8BA4\u7F51\u5173172.20.0.1</span>
<span class="token comment"># Linux\u7F51\u6865\u540D\u5B57\u9ED8\u8BA4\u662Fbr-xx\uFF0C\u5982\u679C\u60F3\u8981\u6307\u5B9A\u7684\u8BDD\u6DFB\u52A0\u53C2\u6570 -o com.docker.network.bridge.name=\u81EA\u5B9A\u4E49Linux\u7F51\u6865\u540D</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker network create --driver bridge --subnet 172.20.0.0/16 --gateway 172.20.0.1 bridge2</span>

<span class="token comment"># \u4ECEDocker\u89D2\u5EA6\uFF0C\u770B\u4E00\u4E0B\u5F53\u524D\u7684\u7F51\u7EDC,\u53D1\u73B0\u591A\u4E86\u4E00\u4E2A</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker network ls</span>
NETWORK ID     NAME      DRIVER    SCOPE
e47d2b8de53b   bridge    bridge    <span class="token builtin class-name">local</span>
8f855e175a4a   bridge2   bridge    <span class="token builtin class-name">local</span>	<span class="token comment"># \u6211\u4EEC\u81EA\u5B9A\u4E49\u7684bridge\u7F51\u7EDC\uFF0C\u540D\u5B57\u53EB\u505Abridge2</span>
db9a2c63802b   <span class="token function">host</span>      <span class="token function">host</span>      <span class="token builtin class-name">local</span>
e05e046464f3   none      null      <span class="token builtin class-name">local</span>

<span class="token comment"># \u4ECELinux\u89D2\u5EA6\uFF0C\u770B\u4E00\u4E0B\u5F53\u524D\u7684\u7F51\u7EDC</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># brctl show</span>
bridge name     	bridge <span class="token function">id</span>               STP enabled     interfaces
br-4ead021696e6     <span class="token number">8000</span>.02422504f2ac       no		<span class="token comment"># \u6211\u4EEC\u81EA\u5B9A\u4E49\u7684bridge\u7F51\u7EDC\uFF0C\u5728Linux\u5C42\u9762\u540D\u5B57\u53EB\u505Abr-4ead021696e6</span>
docker0         	<span class="token number">8000</span>.024259017b71       no

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ip a</span>
<span class="token number">1</span>: lo: <span class="token operator">&lt;</span>LOOPBACK,UP,LOWER_UP<span class="token operator">&gt;</span> mtu <span class="token number">65536</span> qdisc noqueue state UNKNOWN qlen <span class="token number">1</span>
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet <span class="token number">127.0</span>.0.1/8 scope <span class="token function">host</span> lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope <span class="token function">host</span> 
       valid_lft forever preferred_lft forever
<span class="token number">2</span>: ens33: <span class="token operator">&lt;</span>BROADCAST,MULTICAST,UP,LOWER_UP<span class="token operator">&gt;</span> mtu <span class="token number">1500</span> qdisc pfifo_fast state UP qlen <span class="token number">1000</span>
    link/ether 00:0c:29:9b:05:4a brd ff:ff:ff:ff:ff:ff
    inet <span class="token number">192.168</span>.48.133/24 brd <span class="token number">192.168</span>.48.255 scope global dynamic ens33
       valid_lft 1192sec preferred_lft 1192sec
    inet6 fe80::10b3:d204:8d1d:93f7/64 scope <span class="token function">link</span> 
       valid_lft forever preferred_lft forever
<span class="token number">3</span>: docker0: <span class="token operator">&lt;</span>NO-CARRIER,BROADCAST,MULTICAST,UP<span class="token operator">&gt;</span> mtu <span class="token number">1500</span> qdisc noqueue state DOWN 
    link/ether 02:42:59:01:7b:71 brd ff:ff:ff:ff:ff:ff
    inet <span class="token number">172.17</span>.0.1/16 brd <span class="token number">172.17</span>.255.255 scope global docker0
       valid_lft forever preferred_lft forever
    inet6 fe80::42:59ff:fe01:7b71/64 scope <span class="token function">link</span> 
       valid_lft forever preferred_lft forever
<span class="token number">23</span>: br-4ead021696e6: <span class="token operator">&lt;</span>NO-CARRIER,BROADCAST,MULTICAST,UP<span class="token operator">&gt;</span> mtu <span class="token number">1500</span> qdisc noqueue state DOWN 	<span class="token comment"># \u6211\u4EEC\u81EA\u5B9A\u4E49\u7684bridge\u7F51\u7EDC</span>
    link/ether 02:42:25:04:f2:ac brd ff:ff:ff:ff:ff:ff
    inet <span class="token number">172.20</span>.0.1/16 brd <span class="token number">172.20</span>.255.255 scope global br-4ead021696e6
       valid_lft forever preferred_lft forever


<span class="token comment"># \u67E5\u770Bbridge2\u8BE6\u60C5</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker network inspect bridge2</span>
<span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token string">&quot;Name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;bridge2&quot;</span>,
        <span class="token string">&quot;Id&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;4ead021696e67558a4d89ee6dd1cdc0fdf96a4558a604eaaf276591fcb8951a0&quot;</span>,
        <span class="token string">&quot;Created&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2022-05-21T14:18:15.033409735+08:00&quot;</span>,
        <span class="token string">&quot;Scope&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;local&quot;</span>,
        <span class="token string">&quot;Driver&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;bridge&quot;</span>,
        <span class="token string">&quot;EnableIPv6&quot;</span><span class="token builtin class-name">:</span> false,
        <span class="token string">&quot;IPAM&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;Driver&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;default&quot;</span>,
            <span class="token string">&quot;Options&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>,
            <span class="token string">&quot;Config&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span>
                    <span class="token string">&quot;Subnet&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;172.20.0.0/16&quot;</span>,
                    <span class="token string">&quot;Gateway&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;172.20.0.1&quot;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>,
        <span class="token string">&quot;Internal&quot;</span><span class="token builtin class-name">:</span> false,
        <span class="token string">&quot;Attachable&quot;</span><span class="token builtin class-name">:</span> false,
        <span class="token string">&quot;Ingress&quot;</span><span class="token builtin class-name">:</span> false,
        <span class="token string">&quot;ConfigFrom&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;Network&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>
        <span class="token punctuation">}</span>,
        <span class="token string">&quot;ConfigOnly&quot;</span><span class="token builtin class-name">:</span> false,
        <span class="token string">&quot;Containers&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>,
        <span class="token string">&quot;Options&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>,
        <span class="token string">&quot;Labels&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre></div></details><details class="custom-container details"><summary>\uFF082\uFF09\u4F7F\u7528\u81EA\u5B9A\u4E49bridge\u7F51\u7EDC</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u521B\u5EFA\u5BB9\u5668\uFF0C\u4F7F\u7528\u81EA\u5B9A\u4E49\u7684bridge\u7F51\u7EDC\uFF1Abridge2</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run --name demo -itd --network bridge2 busybox:1.34</span>

<span class="token comment"># \u67E5\u770BIP\u548C\u9ED8\u8BA4\u7F51\u5173</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container exec -it demo ip a</span>
<span class="token number">1</span>: lo: <span class="token operator">&lt;</span>LOOPBACK,UP,LOWER_UP<span class="token operator">&gt;</span> mtu <span class="token number">65536</span> qdisc noqueue qlen <span class="token number">1</span>
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet <span class="token number">127.0</span>.0.1/8 scope <span class="token function">host</span> lo
       valid_lft forever preferred_lft forever
<span class="token number">26</span>: eth0@if27: <span class="token operator">&lt;</span>BROADCAST,MULTICAST,UP,LOWER_UP,M-DOWN<span class="token operator">&gt;</span> mtu <span class="token number">1500</span> qdisc noqueue 
    link/ether 02:42:ac:14:00:02 brd ff:ff:ff:ff:ff:ff
    inet <span class="token number">172.20</span>.0.2/16 brd <span class="token number">172.20</span>.255.255 scope global eth0		<span class="token comment"># IP\uFF1A172.20.0.2</span>
       valid_lft forever preferred_lft forever
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container exec -it demo route -n</span>
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
<span class="token number">0.0</span>.0.0         <span class="token number">172.20</span>.0.1      <span class="token number">0.0</span>.0.0         UG    <span class="token number">0</span>      <span class="token number">0</span>        <span class="token number">0</span> eth0	<span class="token comment"># \u9ED8\u8BA4\u7F51\u5173\uFF1A172.20.0.1</span>
<span class="token number">172.20</span>.0.0      <span class="token number">0.0</span>.0.0         <span class="token number">255.255</span>.0.0     U     <span class="token number">0</span>      <span class="token number">0</span>        <span class="token number">0</span> eth0
</code></pre></div></details><h4 id="_4-3-\u81EA\u5B9A\u4E49bridge\u4E0E\u9ED8\u8BA4\u7684\u533A\u522B" tabindex="-1"><a class="header-anchor" href="#_4-3-\u81EA\u5B9A\u4E49bridge\u4E0E\u9ED8\u8BA4\u7684\u533A\u522B" aria-hidden="true">#</a> \uFF084-3\uFF09\u81EA\u5B9A\u4E49bridge\u4E0E\u9ED8\u8BA4\u7684\u533A\u522B</h4>`,4),Mn=s("\u6587\u6863\uFF1A"),Dn={href:"https://docs.docker.com/network/bridge/",target:"_blank",rel:"noopener noreferrer"},On=s("https://docs.docker.com/network/bridge/"),In=e(`<details class="custom-container details"><summary>\uFF081\uFF09\u81EA\u5B9A\u4E49bridge\u7F51\u7EDC\u652F\u6301DNS\u901A\u4FE1\uFF08\u5BB9\u5668\u540D\u79F0\u6216\u7F51\u7EDC\u522B\u540D\uFF09\uFF0C\u800C\u9ED8\u8BA4bridge\u4E0D\u652F\u6301</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># ----------------------------------------------------------------------------------</span>
<span class="token comment"># \u9ED8\u8BA4bridge\u4E0D\u53EF\u4EE5\u4F7F\u7528\u5BB9\u5668\u540D\u79F0\u6765\u8FDB\u884C\u901A\u4FE1</span>

<span class="token comment"># \u542F\u52A82\u4E2A\u5BB9\u5668\uFF0C\u4F7F\u7528\u9ED8\u8BA4bridge</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run --name demo1 -itd busybox:1.34</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run --name demo2 -itd busybox:1.34</span>

<span class="token comment"># \u67E5\u770B\u4ED6\u4EEC\u7684IP</span>
<span class="token comment"># \u4E5F\u53EF\u4EE5\u4F7F\u7528\u5176\u4ED6\u65B9\u5F0F\u67E5\u770BIP\uFF0C\u9053\u7406\u662F\u4E00\u6837\u7684\uFF0C\u6BD4\u5982\uFF1Adocker container exec -it demo2 ip a</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container inspect demo1 -f &quot;{{ .NetworkSettings.IPAddress }}&quot;  </span>
<span class="token number">172.17</span>.0.2
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container inspect demo2 -f &quot;{{ .NetworkSettings.IPAddress }}&quot;</span>
<span class="token number">172.17</span>.0.3

<span class="token comment"># \u4F7F\u7528IP\u901A\u4FE1\uFF0C\u6CA1\u95EE\u9898</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container exec -it demo1 ping -c 3 172.17.0.3</span>
PING <span class="token number">172.17</span>.0.3 <span class="token punctuation">(</span><span class="token number">172.17</span>.0.3<span class="token punctuation">)</span>: <span class="token number">56</span> data bytes
<span class="token number">64</span> bytes from <span class="token number">172.17</span>.0.3: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">0</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.210</span> ms
<span class="token number">64</span> bytes from <span class="token number">172.17</span>.0.3: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">1</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.072</span> ms
<span class="token number">64</span> bytes from <span class="token number">172.17</span>.0.3: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">2</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.090</span> ms
--- <span class="token number">172.17</span>.0.3 <span class="token function">ping</span> statistics ---
<span class="token number">3</span> packets transmitted, <span class="token number">3</span> packets received, <span class="token number">0</span>% packet loss
round-trip min/avg/max <span class="token operator">=</span> <span class="token number">0.072</span>/0.124/0.210 ms

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container exec -it demo2 ping -c 3 172.17.0.2</span>
PING <span class="token number">172.17</span>.0.2 <span class="token punctuation">(</span><span class="token number">172.17</span>.0.2<span class="token punctuation">)</span>: <span class="token number">56</span> data bytes
<span class="token number">64</span> bytes from <span class="token number">172.17</span>.0.2: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">0</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.156</span> ms
<span class="token number">64</span> bytes from <span class="token number">172.17</span>.0.2: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">1</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.075</span> ms
<span class="token number">64</span> bytes from <span class="token number">172.17</span>.0.2: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">2</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.123</span> ms
--- <span class="token number">172.17</span>.0.2 <span class="token function">ping</span> statistics ---
<span class="token number">3</span> packets transmitted, <span class="token number">3</span> packets received, <span class="token number">0</span>% packet loss
round-trip min/avg/max <span class="token operator">=</span> <span class="token number">0.075</span>/0.118/0.156 ms

<span class="token comment"># \u4F7F\u7528\u5BB9\u5668\u540D\u901A\u4FE1\uFF0C\u7F51\u7EDC\u4E0D\u540C</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container exec -it demo1 ping -c 3 demo2</span>
ping: bad address <span class="token string">&#39;demo2&#39;</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container exec -it demo2 ping -c 3 demo1</span>
ping: bad address <span class="token string">&#39;demo1&#39;</span>

<span class="token comment"># ----------------------------------------------------------------------------------</span>
<span class="token comment"># \u81EA\u5B9A\u4E49bridge\u53EF\u4EE5\u4F7F\u7528\u5BB9\u5668\u540D\u79F0\u6216\u7F51\u7EDC\u522B\u540D\u6765\u8FDB\u884C\u901A\u4FE1</span>

<span class="token comment"># \u542F\u52A82\u4E2A\u5BB9\u5668\uFF0C\u6307\u5B9A\u4F7F\u7528\u81EA\u5B9A\u4E49bridge\u7F51\u7EDC\uFF0Cbridge2\u6211\u4EEC\u4E4B\u524D\u5DF2\u7ECF\u521B\u5EFA\u8FC7\u4E86</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run --name demo3 -itd --network bridge2 --network-alias demo33 busybox:1.34</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run --name demo4 -itd --network bridge2 --network-alias demo44 busybox:1.34</span>

<span class="token comment"># \u67E5\u770B\u4ED6\u4EEC\u7684IP\uFF0C\u6CE8\u610F\u8FD9\u91CC\u67E5\u770B\u7684\u5730\u65B9\u53D8\u5316\u4E86</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container inspect demo3 -f &quot;{{ .NetworkSettings.Networks.bridge2.IPAddress }}&quot;  </span>
<span class="token number">172.20</span>.0.2
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container inspect demo4 -f &quot;{{ .NetworkSettings.Networks.bridge2.IPAddress }}&quot;  </span>
<span class="token number">172.20</span>.0.3

<span class="token comment"># \u901A\u8FC7\u5BB9\u5668\u540D\u6765\u6D4B\u8BD5\u8FDE\u901A\u6027</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container exec -it demo3 ping -c 3 demo4</span>
PING demo4 <span class="token punctuation">(</span><span class="token number">172.20</span>.0.3<span class="token punctuation">)</span>: <span class="token number">56</span> data bytes
<span class="token number">64</span> bytes from <span class="token number">172.20</span>.0.3: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">0</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.058</span> ms
<span class="token number">64</span> bytes from <span class="token number">172.20</span>.0.3: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">1</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.068</span> ms
<span class="token number">64</span> bytes from <span class="token number">172.20</span>.0.3: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">2</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.083</span> ms
--- demo4 <span class="token function">ping</span> statistics ---
<span class="token number">3</span> packets transmitted, <span class="token number">3</span> packets received, <span class="token number">0</span>% packet loss
round-trip min/avg/max <span class="token operator">=</span> <span class="token number">0.058</span>/0.069/0.083 ms

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container exec -it demo4 ping -c 3 demo3</span>
PING demo3 <span class="token punctuation">(</span><span class="token number">172.20</span>.0.2<span class="token punctuation">)</span>: <span class="token number">56</span> data bytes
<span class="token number">64</span> bytes from <span class="token number">172.20</span>.0.2: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">0</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.073</span> ms
<span class="token number">64</span> bytes from <span class="token number">172.20</span>.0.2: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">1</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.085</span> ms
<span class="token number">64</span> bytes from <span class="token number">172.20</span>.0.2: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">2</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.069</span> ms
--- demo3 <span class="token function">ping</span> statistics ---
<span class="token number">3</span> packets transmitted, <span class="token number">3</span> packets received, <span class="token number">0</span>% packet loss
round-trip min/avg/max <span class="token operator">=</span> <span class="token number">0.069</span>/0.075/0.085 ms

<span class="token comment"># \u901A\u8FC7\u7F51\u7EDC\u522B\u540D\u6765\u6D4B\u8BD5\u8FDE\u901A\u6027</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container exec -it demo3 ping -c 3 demo44</span>
PING demo44 <span class="token punctuation">(</span><span class="token number">172.20</span>.0.3<span class="token punctuation">)</span>: <span class="token number">56</span> data bytes
<span class="token number">64</span> bytes from <span class="token number">172.20</span>.0.3: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">0</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.072</span> ms
<span class="token number">64</span> bytes from <span class="token number">172.20</span>.0.3: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">1</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.071</span> ms
<span class="token number">64</span> bytes from <span class="token number">172.20</span>.0.3: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">2</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.067</span> ms
--- demo44 <span class="token function">ping</span> statistics ---
<span class="token number">3</span> packets transmitted, <span class="token number">3</span> packets received, <span class="token number">0</span>% packet loss
round-trip min/avg/max <span class="token operator">=</span> <span class="token number">0.067</span>/0.070/0.072 ms

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container exec -it demo4 ping -c 3 demo33</span>
PING demo33 <span class="token punctuation">(</span><span class="token number">172.20</span>.0.2<span class="token punctuation">)</span>: <span class="token number">56</span> data bytes
<span class="token number">64</span> bytes from <span class="token number">172.20</span>.0.2: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">0</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.075</span> ms
<span class="token number">64</span> bytes from <span class="token number">172.20</span>.0.2: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">1</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.071</span> ms
<span class="token number">64</span> bytes from <span class="token number">172.20</span>.0.2: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">2</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.069</span> ms
--- demo33 <span class="token function">ping</span> statistics ---
<span class="token number">3</span> packets transmitted, <span class="token number">3</span> packets received, <span class="token number">0</span>% packet loss
round-trip min/avg/max <span class="token operator">=</span> <span class="token number">0.069</span>/0.071/0.075 ms
</code></pre></div></details><details class="custom-container details"><summary>\uFF082\uFF09\u81EA\u5B9A\u4E49bridge\u7F51\u7EDC\u652F\u6301\u8BBE\u7F6E\u5BB9\u5668\u9759\u6001IP\uFF0C\u800C\u9ED8\u8BA4bridge\u4E0D\u652F\u6301</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u67E5\u770B\u9ED8\u8BA4\u7F51\u6865bridge\u548C\u81EA\u5B9A\u4E49\u7F51\u6865bridge2\u7684\u7F51\u6BB5</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker network inspect bridge | grep -i Subnet</span>
                    <span class="token string">&quot;Subnet&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;172.17.0.0/16&quot;</span>,
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker network inspect bridge2 | grep -i Subnet</span>
                    <span class="token string">&quot;Subnet&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;172.20.0.0/16&quot;</span>,

<span class="token comment"># -----------------------------------------------------------------------------------------------------------</span>
<span class="token comment"># \u9ED8\u8BA4\u7F51\u6865\u6307\u5B9A\u9759\u6001IP</span>
<span class="token comment"># \uFF081\uFF09\u6307\u5B9Anetwork\u4E3Abridge\u65F6\u76F4\u63A5\u62A5\u9519</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run --name demo1 --network bridge --ip 172.17.0.100 -itd busybox:1.34</span>
9acc8de3a1586afbe6ccaf794f1c0361250c0c0e298f24a586e6d3e1a19717e9
docker: Error response from daemon: user specified IP address is supported on user defined networks only.

<span class="token comment"># \uFF082\uFF09\u4E0D\u6307\u5B9A\u65F6\u4E0D\u4F1A\u62A5\u9519\uFF0C\u4F46\u662F\u5E76\u6CA1\u6709\u5206\u914D\u6211\u4EEC\u6307\u5B9A\u7684\u9759\u6001IP</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run --name demo1 --ip 172.17.0.100 -itd busybox:1.34</span>
a0805b036165408cbdeabbfaa21b110df42cf994df2e19b9d3b03fe922352596

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container inspect demo1 -f &quot;{{ .NetworkSettings.Networks.bridge.IPAddress }}&quot;</span>
<span class="token number">172.17</span>.0.2

<span class="token comment"># -----------------------------------------------------------------------------------------------------------</span>
<span class="token comment"># \u81EA\u5B9A\u4E49\u7F51\u6865\u6307\u5B9A\u9759\u6001IP</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run --name demo2 --network bridge2 --ip 172.20.0.100 -itd busybox:1.34</span>
1f76c49de62a70d664d73608541689d4ad75d746f9a59e8415386e258435a7b9

<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container inspect demo2 -f &quot;{{ .NetworkSettings.Networks.bridge2.IPAddress }}&quot;</span>
<span class="token number">172.20</span>.0.100
</code></pre></div></details><h4 id="_4-4-\u4E0D\u540Cbridge\u4E0B\u7684\u5BB9\u5668\u4E92\u901A" tabindex="-1"><a class="header-anchor" href="#_4-4-\u4E0D\u540Cbridge\u4E0B\u7684\u5BB9\u5668\u4E92\u901A" aria-hidden="true">#</a> \uFF084-4\uFF09\u4E0D\u540Cbridge\u4E0B\u7684\u5BB9\u5668\u4E92\u901A</h4><details class="custom-container details"><summary>\u4E0D\u540Cbridge\u4E0B\u7684\u5BB9\u5668\u4E92\u901A</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u521B\u5EFA\u4E24\u4E2A\u5BB9\u5668\uFF0C\u5206\u522B\u5C5E\u4E8E\u4E0D\u540C\u7684\u7F51\u6865</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run --name demo1 --network bridge  -itd busybox:1.34</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container run --name demo2 --network bridge2 -itd busybox:1.34</span>

<span class="token comment"># \u67E5\u770B\u4E24\u4E2A\u5BB9\u5668\u7684IP</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container inspect demo1 -f &quot;{{ .NetworkSettings.Networks.bridge.IPAddress }}&quot;</span>
<span class="token number">172.17</span>.0.2
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container inspect demo2 -f &quot;{{ .NetworkSettings.Networks.bridge2.IPAddress }}&quot;</span>
<span class="token number">172.20</span>.0.2

<span class="token comment"># \u4E0D\u540C\u7684bridge\u4E0B\u7684\u5BB9\u5668\u662F\u4E0D\u80FD\u901A\u4FE1\u7684</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container exec demo1 ping -c 3 172.20.0.2</span>
PING <span class="token number">172.20</span>.0.2 <span class="token punctuation">(</span><span class="token number">172.20</span>.0.2<span class="token punctuation">)</span>: <span class="token number">56</span> data bytes
--- <span class="token number">172.20</span>.0.2 <span class="token function">ping</span> statistics ---
<span class="token number">3</span> packets transmitted, <span class="token number">0</span> packets received, <span class="token number">100</span>% packet loss

<span class="token comment"># \u5C06demo2\u52A0\u5165\u5230demo1\u6240\u5728\u7684\u7F51\u6865\u4E2D\uFF0C\u65B0\u7684\u7F51\u6865\u4F1A\u7ED9demo2\u5206\u914D\u4E00\u4E2A\u65B0\u7684IP</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker network connect bridge demo2</span>

<span class="token comment"># \u67E5\u770Bdemo2\u7684\u7F51\u7EDC\u4FE1\u606F</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container inspect demo2 -f &quot;{{ json .NetworkSettings.Networks }}&quot; | jq</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;bridge&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;IPAMConfig&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>,
    <span class="token string">&quot;Links&quot;</span><span class="token builtin class-name">:</span> null,
    <span class="token string">&quot;Aliases&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>,
    <span class="token string">&quot;NetworkID&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;cc4b3794a3f6c4a5a13e4230f10569e3d9c4056774f6e0eb77384b95a8a95fdf&quot;</span>,
    <span class="token string">&quot;EndpointID&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;879bd066516d7436eec9a978c350d71146795594c34916cf5d66bd9df51f78c9&quot;</span>,
    <span class="token string">&quot;Gateway&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;172.17.0.1&quot;</span>,
    <span class="token string">&quot;IPAddress&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;172.17.0.3&quot;</span>,		<span class="token comment"># bridge\u7F51\u6865\u5206\u914D\u7684IP</span>
    <span class="token string">&quot;IPPrefixLen&quot;</span><span class="token builtin class-name">:</span> <span class="token number">16</span>,
    <span class="token string">&quot;IPv6Gateway&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
    <span class="token string">&quot;GlobalIPv6Address&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
    <span class="token string">&quot;GlobalIPv6PrefixLen&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
    <span class="token string">&quot;MacAddress&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;02:42:ac:11:00:03&quot;</span>,
    <span class="token string">&quot;DriverOpts&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span>,
  <span class="token string">&quot;bridge2&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;IPAMConfig&quot;</span><span class="token builtin class-name">:</span> null,
    <span class="token string">&quot;Links&quot;</span><span class="token builtin class-name">:</span> null,
    <span class="token string">&quot;Aliases&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
      <span class="token string">&quot;2e7375c5c76a&quot;</span>
    <span class="token punctuation">]</span>,
    <span class="token string">&quot;NetworkID&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;4ead021696e67558a4d89ee6dd1cdc0fdf96a4558a604eaaf276591fcb8951a0&quot;</span>,
    <span class="token string">&quot;EndpointID&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;ee6cd43fb03ac3118cfe787a7ae8eb74166b1c4133829cb54d3d5c47310dfde3&quot;</span>,
    <span class="token string">&quot;Gateway&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;172.20.0.1&quot;</span>,
    <span class="token string">&quot;IPAddress&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;172.20.0.2&quot;</span>,
    <span class="token string">&quot;IPPrefixLen&quot;</span><span class="token builtin class-name">:</span> <span class="token number">16</span>,
    <span class="token string">&quot;IPv6Gateway&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
    <span class="token string">&quot;GlobalIPv6Address&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>,
    <span class="token string">&quot;GlobalIPv6PrefixLen&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
    <span class="token string">&quot;MacAddress&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;02:42:ac:14:00:02&quot;</span>,
    <span class="token string">&quot;DriverOpts&quot;</span><span class="token builtin class-name">:</span> null
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment"># \u901A\u4FE1\u6D4B\u8BD5</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container exec demo1 ping -c 3 172.17.0.3</span>
PING <span class="token number">172.17</span>.0.3 <span class="token punctuation">(</span><span class="token number">172.17</span>.0.3<span class="token punctuation">)</span>: <span class="token number">56</span> data bytes
<span class="token number">64</span> bytes from <span class="token number">172.17</span>.0.3: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">0</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.087</span> ms
<span class="token number">64</span> bytes from <span class="token number">172.17</span>.0.3: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">1</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.081</span> ms
<span class="token number">64</span> bytes from <span class="token number">172.17</span>.0.3: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">2</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.114</span> ms
--- <span class="token number">172.17</span>.0.3 <span class="token function">ping</span> statistics ---
<span class="token number">3</span> packets transmitted, <span class="token number">3</span> packets received, <span class="token number">0</span>% packet loss
round-trip min/avg/max <span class="token operator">=</span> <span class="token number">0.081</span>/0.094/0.114 ms

<span class="token comment"># \u67E5\u770Bdemo2\u5BB9\u5668\uFF0C\u672C\u8D28\u5C31\u662F\u5206\u914D\u4E86\u4E24\u5757\u7F51\u5361</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker container exec demo2 ip a </span>
<span class="token number">1</span>: lo: <span class="token operator">&lt;</span>LOOPBACK,UP,LOWER_UP<span class="token operator">&gt;</span> mtu <span class="token number">65536</span> qdisc noqueue qlen <span class="token number">1000</span>
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet <span class="token number">127.0</span>.0.1/8 scope <span class="token function">host</span> lo
       valid_lft forever preferred_lft forever
<span class="token number">26</span>: eth0@if27: <span class="token operator">&lt;</span>BROADCAST,MULTICAST,UP,LOWER_UP,M-DOWN<span class="token operator">&gt;</span> mtu <span class="token number">1500</span> qdisc noqueue 
    link/ether 02:42:ac:14:00:02 brd ff:ff:ff:ff:ff:ff
    inet <span class="token number">172.20</span>.0.2/16 brd <span class="token number">172.20</span>.255.255 scope global eth0
       valid_lft forever preferred_lft forever
<span class="token number">28</span>: eth1@if29: <span class="token operator">&lt;</span>BROADCAST,MULTICAST,UP,LOWER_UP,M-DOWN<span class="token operator">&gt;</span> mtu <span class="token number">1500</span> qdisc noqueue 
    link/ether 02:42:ac:11:00:03 brd ff:ff:ff:ff:ff:ff
    inet <span class="token number">172.17</span>.0.3/16 brd <span class="token number">172.17</span>.255.255 scope global eth1
       valid_lft forever preferred_lft forever
</code></pre></div></details><h4 id="_4-5-\u4FEE\u6539\u9ED8\u8BA4\u7684bridge" tabindex="-1"><a class="header-anchor" href="#_4-5-\u4FEE\u6539\u9ED8\u8BA4\u7684bridge" aria-hidden="true">#</a> \uFF084-5\uFF09\u4FEE\u6539\u9ED8\u8BA4\u7684bridge</h4>`,5),Tn=s("\u6587\u6863\uFF1A"),Sn={href:"https://docs.docker.com/network/bridge/#configure-the-default-bridge-network",target:"_blank",rel:"noopener noreferrer"},Pn=s("https://docs.docker.com/network/bridge/#configure-the-default-bridge-network"),Cn=e(`<p>\u9700\u8981\u8BF4\u660E\u7684\u662F\uFF1A</p><p>\uFF081\uFF09\u4ECEdocker\u89D2\u5EA6\u770B\u9ED8\u8BA4\u7684\u7F51\u6865\u662F<code>bridge</code>\uFF0C\u4ECELinux\u89D2\u5EA6\u770B\u9ED8\u8BA4\u7684\u7F51\u6865\u662F<code>docker0</code>\uFF0C\u4ED6\u4FE9\u662F\u4E00\u4E2A\u4E1C\u897F</p><p>\uFF082\uFF09\u5047\u8BBE\u6211\u4EEC\u6709\u4E24\u4E2A\u7F51\u6865<code>docker0</code>\u548C<code>docker1</code>\uFF0C\u6211\u4EEC\u60F3\u8BA9docker1\u4F5C\u4E3A\u9ED8\u8BA4\u7F51\u6865\uFF0C\u8FD9\u662F\u4E0D\u53EF\u4EE5\u7684\uFF0C\u9ED8\u8BA4\u7684\u7F51\u6865\u5FC5\u987B\u662F<code>docker0</code>\uFF0C\u539F\u56E0\u662F\uFF1A</p><ul><li><p><code>bridge</code>\u662F\u4E0D\u5141\u8BB8\u5220\u9664\u7684</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker network rm bridge</span>
Error response from daemon: bridge is a pre-defined network and cannot be removed
</code></pre></div></li><li><p><code>bridge</code>\u5BF9\u5E94\u7684Linux\u7F51\u6865\u662F<code>docker0</code></p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker network inspect bridge | grep bridge.name</span>
            <span class="token string">&quot;com.docker.network.bridge.name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;docker0&quot;</span>,
</code></pre></div></li><li><p><code>docker0</code>\u662F\u53EF\u4EE5\u88AB\u5220\u9664\u7684\uFF0C\u4F46\u662F\u5728\u542F\u52A8docker\u7684\u65F6\u5019\u4F1A\u91CD\u65B0\u521B\u5EFA<code>docker0</code></p><details class="custom-container details"><summary>\u70B9\u51FB\u67E5\u770B\u8BE6\u60C5</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u5220\u9664docker0\u7F51\u6865</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># ip link set dev docker0 down</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># brctl delbr docker0</span>

<span class="token comment"># \u67E5\u770B\u7F51\u6865\u5217\u8868</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># brctl show</span>
bridge name     bridge <span class="token function">id</span>               STP enabled     interfaces

<span class="token comment"># \u67E5\u770Bdocker bridge\u7F51\u6865\uFF08\u6CA1\u6709\u53D8\u5316\uFF09</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker network ls</span>
NETWORK ID     NAME      DRIVER    SCOPE
70cd27ddf376   bridge    bridge    <span class="token builtin class-name">local</span>
db9a2c63802b   <span class="token function">host</span>      <span class="token function">host</span>      <span class="token builtin class-name">local</span>
e05e046464f3   none      null      <span class="token builtin class-name">local</span>

<span class="token comment"># \u521B\u5EFA\u5BB9\u5668\u4F1A\u5931\u8D25\uFF08\u5E95\u5C42\u7F51\u6865\u90FD\u6CA1\u4E86\uFF09</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker run --rm -itd centos:7</span>
5d5bb734fa70390564b43764b22c0348a66ec9c7252ab3fff24338ee550b989f
docker: Error response from daemon: failed to create endpoint pedantic_poitras on network bridge: adding interface veth954f245 to bridge docker0 failed: could not <span class="token function">find</span> bridge docker0: route ip+net: no such network interface.

<span class="token comment"># \u91CD\u542FDocker</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># systemctl restart docker.service</span>

<span class="token comment"># \u67E5\u770BLinux\u7F51\u6865</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># brctl show</span>
bridge name     bridge <span class="token function">id</span>               STP enabled     interfaces
docker0         <span class="token number">8000</span>.02426f6d6288       no

<span class="token comment"># \u521B\u5EFA\u5BB9\u5668\u6CA1\u95EE\u9898</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker run --rm -itd centos:7</span>
284d036ab36a1ec02da91f11dda590ae72c5fabfd35cb2ecb1d792109ab02e3e
</code></pre></div></details></li></ul><p>\uFF083\uFF09\u6211\u4EEC\u4FEE\u6539\u9ED8\u8BA4\u7F51\u6865\uFF0C\u5176\u5B9E\u662F\u5BF9<code>docker0</code>\u505A\u4E00\u4E9B\u914D\u7F6E\uFF0C\u6BD4\u5982\u5B9A\u4E49\u5B50\u7F51\u7B49</p><details class="custom-container details"><summary>\u4FEE\u6539\u5B50\u7F51\u548C\u9ED8\u8BA4\u7F51\u5173</summary><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u4FEE\u6539daemon.json\u6587\u4EF6</span>
<span class="token punctuation">[</span>root@localhost _data<span class="token punctuation">]</span><span class="token comment"># vim /etc/docker/daemon.json </span>
<span class="token punctuation">{</span>
   <span class="token string">&quot;registry-mirrors&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;https://6xumug9e.mirror.aliyuncs.com&quot;</span>
  <span class="token punctuation">]</span>,						<span class="token comment"># \u8FD9\u91CC\u4F7F\u7528\u9017\u53F7\u5206\u9694\u591A\u4E2A\u5B57\u6BB5</span>
 <span class="token string">&quot;bip&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;192.168.1.1/24&quot;</span>    <span class="token comment"># \u6CE8\u610Fjson\u6587\u4EF6\u672B\u5C3E\u4E0D\u80FD\u6709\u9017\u53F7</span>
<span class="token punctuation">}</span>

<span class="token comment"># \u91CD\u542Fdocker</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># systemctl restart docker.service</span>

<span class="token comment"># \u67E5\u770B\u9ED8\u8BA4\u7F51\u6865bridge\u7684\u5B50\u7F51</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># docker network inspect bridge</span>
<span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token string">&quot;Name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;bridge&quot;</span>,
        <span class="token string">&quot;Id&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;27388f5b5aafb240f1c0a84f4017eae04a96de8af5416e8fd912e8be54866cdb&quot;</span>,
        <span class="token string">&quot;Created&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2022-05-26T15:03:20.113023733+08:00&quot;</span>,
        <span class="token string">&quot;Scope&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;local&quot;</span>,
        <span class="token string">&quot;Driver&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;bridge&quot;</span>,
        <span class="token string">&quot;EnableIPv6&quot;</span><span class="token builtin class-name">:</span> false,
        <span class="token string">&quot;IPAM&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;Driver&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;default&quot;</span>,
            <span class="token string">&quot;Options&quot;</span><span class="token builtin class-name">:</span> null,
            <span class="token string">&quot;Config&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span>
                    <span class="token string">&quot;Subnet&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;192.168.1.0/24&quot;</span>,		<span class="token comment"># \u5B50\u7F51\u5DF2\u7ECF\u4FEE\u6539</span>
                    <span class="token string">&quot;Gateway&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;192.168.1.1&quot;</span>		<span class="token comment"># \u9ED8\u8BA4\u7F51\u5173\u4E5F\u4FEE\u6539\u4E86</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>,
        <span class="token string">&quot;Internal&quot;</span><span class="token builtin class-name">:</span> false,
        <span class="token string">&quot;Attachable&quot;</span><span class="token builtin class-name">:</span> false,
        <span class="token string">&quot;Ingress&quot;</span><span class="token builtin class-name">:</span> false,
        <span class="token string">&quot;ConfigFrom&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;Network&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;&quot;</span>
        <span class="token punctuation">}</span>,
        <span class="token string">&quot;ConfigOnly&quot;</span><span class="token builtin class-name">:</span> false,
        <span class="token string">&quot;Containers&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>,
        <span class="token string">&quot;Options&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
            <span class="token string">&quot;com.docker.network.bridge.default_bridge&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;true&quot;</span>,
            <span class="token string">&quot;com.docker.network.bridge.enable_icc&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;true&quot;</span>,
            <span class="token string">&quot;com.docker.network.bridge.enable_ip_masquerade&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;true&quot;</span>,
            <span class="token string">&quot;com.docker.network.bridge.host_binding_ipv4&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;0.0.0.0&quot;</span>,
            <span class="token string">&quot;com.docker.network.bridge.name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;docker0&quot;</span>,
            <span class="token string">&quot;com.docker.network.driver.mtu&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;1500&quot;</span>
        <span class="token punctuation">}</span>,
        <span class="token string">&quot;Labels&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre></div></details>`,6);function Un(Ln,Gn){const a=p("ExternalLinkIcon");return c(),l("div",null,[u,n("p",null,[k,n("a",i,[m,t(a)]),d,n("a",b,[g,t(a)])]),f,n("p",null,[h,n("a",q,[v,t(a)])]),x,w,n("p",null,[y,n("a",_,[A,t(a)])]),R,n("p",null,[N,n("a",E,[M,t(a)])]),D,n("p",null,[O,I,T,S,P,n("a",C,[U,t(a)]),L]),G,n("p",null,[V,W,B,n("a",K,[Y,t(a)])]),F,n("p",null,[H,n("a",Z,[z,t(a)])]),X,n("p",null,[j,n("a",$,[Q,t(a)])]),J,n("p",null,[nn,n("a",sn,[an,t(a)])]),tn,n("p",null,[en,n("a",on,[pn,t(a)])]),cn,n("p",null,[ln,n("a",rn,[un,t(a)])]),kn,n("p",null,[mn,n("a",dn,[bn,t(a)])]),gn,n("p",null,[fn,n("a",hn,[qn,t(a)])]),vn,n("p",null,[xn,n("a",wn,[yn,t(a)])]),_n,n("p",null,[An,n("a",Rn,[Nn,t(a)])]),En,n("p",null,[Mn,n("a",Dn,[On,t(a)])]),In,n("p",null,[Tn,n("a",Sn,[Pn,t(a)])]),Cn])}var Wn=o(r,[["render",Un],["__file","container.html.vue"]]);export{Wn as default};
