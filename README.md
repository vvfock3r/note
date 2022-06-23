# 简介

基于 [VuePress v2](https://v2.vuepress.vuejs.org/zh/) 搭建的个人笔记静态站点，在线预览：https://jinhui.dev



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

## 容器部署自动更新

### Webhook方式

### Github Action方式

<br />

## VuePress配置参考

VuePress配置说明参考：[https://jinhui.dev/frontend/VuePress.html](https://jinhui.dev/frontend/VuePress.html)
