# Note [![Github Action](https://github.com/vvfock3r/note/workflows/build/badge.svg)](https://github.com/vvfock3r/note/blob/main/.github/workflows/main.yml) [![VuePress Version](https://img.shields.io/badge/vuepress-2.0.0--beta.46-blue)](https://v2.vuepress.vuejs.org/zh/) ![GitHub repo size](https://img.shields.io/github/repo-size/vvfock3r/note)

基于 [VuePress](https://v2.vuepress.vuejs.org/zh/) 搭建的个人笔记静态站点，在线预览：https://jinhui.dev

<br />

## 本地部署

在本地部署一个最小依赖的`VuePress`，适用于开发环境

* 仅支持内网访问
* 使用内置的开发服务器

<details>
    <summary>点击查看详情</summary>
    <p>

```bash
# (1) 下载源码
# [root@localhost ~]# git clone --depth 1 git@github.com:vvfock3r/note.git
[root@localhost ~]# git clone --depth 1 https://github.com/vvfock3r/note.git
[root@localhost ~]# cd note

# (2) 安装依赖
[root@localhost note]# yarn
yarn install v1.22.17
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
warning "vuepress>vuepress-vite@2.0.0-beta.46" has unmet peer dependency "@vuepress/client@^2.0.0-beta.42"
warning "vuepress>vuepress-vite@2.0.0-beta.46" has unmet peer dependency "vue@^3.2.35"
[4/4] Building fresh packages...
Done in 2.05s.

# (3) 启动服务
[root@localhost note]# yarn docs:dev
yarn run v1.22.17
$ vuepress dev docs
info Initializing VuePress and preparing data...

  vite v2.9.9 dev server running at:

  > Local:    http://localhost:8080/
  > Network:  http://10.0.8.4:8080/
  > Network:  http://172.17.0.1:8080/
8:20:02 PM [vite] ✨ optimized dependencies changed. reloading
```

</p>
</details>

<br />

## 容器部署

使用容器正式部署一个个人笔记静态站点，适用于正式环境

* 支持`HTTPS(默认)`和`HTTP`访问
* 支持`HTTP 2(默认)`和`HTTP 1.1`协议
* 所有依赖全部打包到镜像方便管理和迁移

<details>
    <summary>点击查看详情</summary>
    <p>

```bash
# (1)下载源码
# [root@localhost ~]# git clone --depth 1 git@github.com:vvfock3r/note.git
[root@localhost ~]# git clone --depth 1 https://github.com/vvfock3r/note.git
[root@localhost ~]# cd note

# (2) 构建镜像并启动容器
[root@localhost note]# docker image build -t nginx:webserver --memory 2g .

# (3) 启动容器
[root@localhost note]# docker container run \
--name jinhui.dev \
-p80:80 -p443:443 \
--restart always \
--memory 1g \
-d \
nginx:webserver

# (4) 域名解析
#     1、公网解析需要修改 jinhui.dev和www.jinhui.dev A记录
#     2、本地解析可以使用/etc/hosts
[root@localhost note]# grep -E "[[:blank:]]jinhui.dev$" /etc/hosts \
|| sed -i '$a 127.0.0.1 jinhui.dev' /etc/hosts

[root@localhost note]# cat /etc/hosts
127.0.0.1 jinhui.dev
```

</p>
</details>

<br />

## 自动发布

* Webhook
* Github Action（推荐）

<details>
    <summary>点击查看详情</summary>
    <p>

**（1）自动发布方式对比**

| 发布方式      | 说明                                                         | 优势                                 | 劣势                                                         |
| ------------- | ------------------------------------------------------------ | ------------------------------------ | ------------------------------------------------------------ |
| Webhook       | （1）首先启动一个公网可访问的Web Server<br />（2）当有代码提交时，Github会给Web Server发送POST请求<br />（3）Server接到请求后执行发布所需要的一系列流程 | 简单                                 | 服务器需要额外开放一个端口；<br />打包等操作会占用服务器资源 |
| Github Action | 我们只需要编写一个YAML文件在Github所提供的云环境内进行各种操作完成发布 | 无额外端口开放；<br />不占用系统资源 | YAML编写略复杂；<br />通常需要开放SSH端口给云环境            |

**（2）Webhook**

**服务端配置**

```bash
# (1)下载源码到/root/下
# [root@localhost ~]# git clone --depth 1 git@github.com:vvfock3r/note.git
[root@localhost ~]# git clone --depth 1 https://github.com/vvfock3r/note.git

# 拷贝 note/scripts/github_webhook_server.py
[root@localhost ~]# cp -raf note/scripts/webhook.py .

# 修改Github_Secret，保持与Web界面配置的一样
[root@localhost ~]# vim webhook.py.py
...
Github_Secret = "1YbutGiyBDV6hlix"  # 根据实际情况修改
...

# 启动Server
[root@localhost ~]# tmux new -s webhook
[root@localhost ~]# python3 webhook.py 
 * Serving Flask app 'webhook' (lazy loading)
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on all addresses.
   WARNING: This is a development server. Do not use it in a production deployment.
 * Running on http://10.0.8.4:12345/ (Press CTRL+C to quit)
```

**Github Web配置**

![image-20220623124356891](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220623124356891.png)

**（3）Github Action（推荐）**

**编写YAML**

参考：[https://github.com/vvfock3r/note/blob/main/.github/workflows/main.yml](https://github.com/vvfock3r/note/blob/main/.github/workflows/main.yml)

**配置Github Secrets**

![image-20220623124558992](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220623124558992.png)

</p>
</details>

<br />

## VuePress 2.x

* 官网：[https://v2.vuepress.vuejs.org/zh/](https://v2.vuepress.vuejs.org/zh/)
* 参考：[https://jinhui.dev/coding/frontend/VuePress.html](https://jinhui.dev/coding/frontend/VuePress.html)

<br />

### 联系我😊

如果您有**任何问题**欢迎通过如下方式联系我

* 微信：`32C2E6AA64EF41178831`
* 邮件：`1265921100@qq.com`
