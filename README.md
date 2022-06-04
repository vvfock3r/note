# 简介

基于[VuePress v2](https://v2.vuepress.vuejs.org/zh/)搭建的个人笔记静态站点，在线预览：https://jinhui.dev



# 部署

## 容器部署

```bash
# (1)下载源码
# [root@localhost ~]# git clone git@github.com:vvfock3r/note.git
[root@localhost ~]# git clone https://github.com/vvfock3r/note.git
[root@localhost ~]# cd note

# (2) 构建镜像
[root@localhost note]# docker image build -t nginx:webserver --memory 2g .

# (3) 启动容器
[root@localhost note]# docker container run --name jinhui.dev -p80:80 -p443:443 -d nginx:webserver

# (4) /etc/hosts添加本地解析
[root@localhost note]# grep -E "[[:blank:]]jinhui.dev$" /etc/hosts \
|| sed -i '$a 127.0.0.1 jinhui.dev' /etc/hosts

[root@localhost note]# cat /etc/hosts
127.0.0.1 jinhui.dev
```



VuePress配置说明参考：[https://jinhui.dev/frontend/VuePress.html](https://jinhui.dev/frontend/VuePress.html)
