# Bitwarden

<br />

**Bitwarden（官方版本）**

官网：[https://bitwarden.com](https://bitwarden.com)

文档：[https://bitwarden.com/help/](https://bitwarden.com/help/)

Github：[https://github.com/bitwarden/server](https://github.com/bitwarden/server)

<br />

**Vaultwarden （民间版本，Bitwarden服务器 API 的替代实现，与Bitwarden官方没有任何关系）**

官网：[https://www.vaultwarden.net/](https://www.vaultwarden.net/)

文档：[https://github.com/dani-garcia/vaultwarden/wiki](https://github.com/dani-garcia/vaultwarden/wiki)

第三方中文版翻译：[https://rs.ppgg.in](https://rs.ppgg.in)

Github：[https://github.com/dani-garcia/vaultwarden](https://github.com/dani-garcia/vaultwarden)

<br />

## 服务端部署

**一、官方版本**

Docker Hub：[https://hub.docker.com/r/bitwarden/self-host](https://hub.docker.com/r/bitwarden/self-host)

由于占用内存会比较大，所以本文档直接忽略官方版本

<br />

**二、民间版本**

Docker Hub：[https://hub.docker.com/r/vaultwarden/server](https://hub.docker.com/r/vaultwarden/server)

环境变量设置：[https://github.com/dani-garcia/vaultwarden/blob/main/.env.template](https://github.com/dani-garcia/vaultwarden/blob/main/.env.template)

**1、参数简单说明**

```bash
# 基本参数配置
ROCKET_PORT=8888      						指定服务端口, 默认为80

# 管理界面参数
ADMIN_TOKEN=<token>							设置此参数后自动开启管理界面/admin, 推荐不设置

# 新用户注册
# 1、如果关闭, Web界面仍然会显示注册按钮, 只是注册提交时会失败
# 2、如果关闭, 需要有一种方法能为我们自己添加一个账号
SIGNUPS_ALLOWED=false 						禁止新用户注册, 默认允许, 推荐关闭
SIGNUPS_VERIFY=false						用户注册成功后需要验证邮箱才能登录
SIGNUPS_DOMAINS_WHITELIST=<email1>,<email2>	白名单, 仅允许部分用户注册

# 组织邀请
INVITATIONS_ALLOWED=false					关闭邀请功能, 默认允许, 推荐关闭

# Websocket参数
WEBSOCKET_ENABLED=true						开启Websocket功能
WEBSOCKET_ENABLED=3012						Websocket的运行端口，默认为3012

# SMTP参数
SMTP_HOST=SMTP服务器地址
SMTP_FROM=你的邮箱
SMTP_PORT=SMTP端口
SMTP_SECURITY=force_tls
SMTP_USERNAME=你的邮箱
SMTP_PASSWORD=你的密码

# ....
```

**2、服务部署**

```bash
# 创建存储目录
mkdir -p /data/vaultwarden

# 启动容器
# 1、先设置允许注册新用户
# 2、默认会使用sqlite数据库, 完全够用, 也支持其他数据库
docker container run -d --name vault.jinhui.dev \
    -p 8888:8888 \
    -v /data/vaultwarden/:/data/ \
    -e TZ=Asia/Shanghai \
    -e ROCKET_PORT=8888 \
    -e SIGNUPS_ALLOWED=true \
    -e INVITATIONS_ALLOWED=false \
    --restart=always \
    --cpus=1 \
    --memory=200mb \
    -d \
  vaultwarden/server:1.29.1-alpine
```

**3、浏览器访问**

![image-20230824205051615](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230824205051615.png)

![image-20230824205437615](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230824205437615.png)

**4、添加HTTPS后注册新用户**

* 使用公网域名申请一个免费证书
* 部署一个Nginx，反向代理到 Vaultwarden 

具体步骤就不再演示了，直接看登录后的界面，可以修改语言为英文

![image-20230824210451725](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230824210451725.png)

**5、关闭新用户注册和后端端口**

```bash
# 删除容器
docker container rm -f vault.jinhui.dev

# 新建容器
# 1、设置不允许新用户注册修
# 2、设置监听地址为127.0.0.1
docker container run -d --name vault.jinhui.dev \
    -p 127.0.0.1:8888:8888 \
    -v /data/vaultwarden/:/data/ \
    -e TZ=Asia/Shanghai \
    -e ROCKET_PORT=8888 \
    -e SIGNUPS_ALLOWED=false \
    -e INVITATIONS_ALLOWED=false \
    --restart=always \
    --cpus=1 \
    --memory=200mb \
    -d \
  vaultwarden/server:1.29.1-alpine
```

<br />

## 客户端下载

下载地址：[https://bitwarden.com/download](https://bitwarden.com/download)

<br />

## 备份和恢复

**查看数据目录**

```bash
# 我们这里使用了sqlite, 可以看一下数据目录下都包含哪些东西
# 可以看到除了数据库数据, 还有一些其他的数据, 比如附件
[root@ap-hongkang ~]# ls -lh /data/vaultwarden/
total 300K
drwxr-xr-x 2 root root 4.0K Aug 24 18:41 attachments
-rw-r--r-- 1 root root 232K Aug 24 21:10 db.sqlite3
-rw-r--r-- 1 root root  32K Aug 24 21:10 db.sqlite3-shm
-rw-r--r-- 1 root root 8.1K Aug 24 21:10 db.sqlite3-wal
drwxr-xr-x 2 root root 4.0K Aug 24 18:41 icon_cache
-rw-r--r-- 1 root root 1.7K Aug 24 18:41 rsa_key.pem
-rw-r--r-- 1 root root  451 Aug 24 18:41 rsa_key.pub.pem
drwxr-xr-x 2 root root 4.0K Aug 24 18:41 sends
drwxr-xr-x 2 root root 4.0K Aug 24 18:41 tmp
```

**编写备份脚本（简单写一下）**

```bash
#!/usr/bin/env bash
set -o nounset
set -o errexit
set -o pipefail

# ----------------------------------------------------
# 说明
# 1、valut.jinhui.dev数据备份脚本, crontab循环执行
# 2、由于数据量比较小, 可以设置每隔N小时备份一次数据目录
# 3、备份文件保留时长建议时间不要太短, 这里设置保存30天
# ----------------------------------------------------

# 定义公共变量
src=/data/vaultwarden
dst=/data/backup

# 创建备份目录
mkdir -p ${dst}

# 备份目录
tar zcf ${dst}/$(date +"%Y-%m-%d-%H%M%S")_valut.jinhui.dev.tar.gz  ${src}
chattr +i ${dst}/$(date +"%Y-%m-%d-%H%M%S")_valut.jinhui.dev.tar.gz

# 删除过期备份
for file in $(find ${dst} -maxdepth 1 -type f -name "*.tar.gz" -mtime +30)
do
  chattr -i ${file} && rm -f ${file}
done
```

**添加计划任务**

```bash
[root@ap-hongkang ~]# crontab -l
# 每小时备份一次, 备份文件保留30天
0 */1 * * * bash /usr/local/bin/vault_backup.sh
```



