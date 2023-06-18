## Nightingale

官网：[https://n9e.github.io](https://n9e.github.io)

Github（后端）：[https://github.com/ccfos/nightingale](https://github.com/ccfos/nightingale)

Github（前端）：[https://github.com/n9e/fe](https://github.com/n9e/fe)

<br />

## 部署

::: details （1）先体验一下

```bash
# 注意：需要提前准备好一个MySQL和Redis

# 1.下载并解压
[root@node-1 ~]# wget -c https://download.flashcat.cloud/n9e-v6.0.0-ga.11-linux-amd64.tar.gz
[root@node-1 ~]# mkdir n9e
[root@node-1 ~]# tar zxf n9e-v6.0.0-ga.11-linux-amd64.tar.gz -C n9e
[root@node-1 ~]# cd n9e

# 2.导入MySQL建库和表语句, 这会创建n9e_v6数据库
[root@node-1 n9e]# mysql --default-character-set=utf8mb4 -h127.0.0.1 -P3307 -uroot -pt6G1LJdzOlG^u5yb < n9e.sql

# 3.修改配置文件
[root@node-1 n9e]# vim etc/config.toml

[DB]
# postgres: host=%s port=%s user=%s dbname=%s password=%s sslmode=%s
DSN="root:t6G1LJdzOlG^u5yb@tcp(127.0.0.1:3307)/n9e_v6?charset=utf8mb4&parseTime=True&loc=Local&allowNativePasswords=true"

[Redis]
# address, ip:port or ip1:port,ip2:port for cluster and sentinel(SentinelAddrs)
Address = "127.0.0.1:6379"

# 4.启动 n9e
[root@node-1 n9e]# ./n9e
runner.cwd: /root/n9e
runner.hostname: node-1
runner.fd_limits: (soft=102400, hard=102400)
runner.vm_limits: (soft=unlimited, hard=unlimited)
2023-06-18 11:18:37.441215 INFO memsto/busi_group_cache.go:108 timer: sync busi groups done, cost: 1ms, number: 1
2023-06-18 11:18:37.443161 INFO memsto/target_cache.go:166 timer: sync targets done, cost: 1ms, number: 0
2023-06-18 11:18:37.446797 INFO memsto/datasource_cache.go:107 timer: sync datasources done, cost: 3ms, number: 0
2023-06-18 11:18:37.452719 INFO memsto/alert_mute_cache.go:142 timer: sync mutes done, cost: 5ms, number: 0
2023-06-18 11:18:37.456874 INFO memsto/alert_rule_cache.go:132 timer: sync rules done, cost: 4ms, number: 0
2023-06-18 11:18:37.458030 INFO memsto/notify_config.go:86 timer: sync wbhooks done number: 0
2023-06-18 11:18:37.459235 INFO memsto/notify_config.go:100 timer: sync smtp:{Host: Port:0 User: Pass: From: InsecureSkipVerify:false Batch:0} done
2023-06-18 11:18:37.460294 INFO memsto/notify_config.go:114 timer: sync notify script done
2023-06-18 11:18:37.461824 INFO memsto/notify_config.go:133 timer: sync ibex done
2023-06-18 11:18:37.465167 INFO memsto/user_cache.go:169 timer: sync users done, cost: 3ms, number: 1
2023-06-18 11:18:37.471021 INFO memsto/user_group_cache.go:159 timer: sync user groups done, cost: 5ms, number: 1
2023-06-18 11:18:37.477003 INFO memsto/alert_subscribe_cache.go:157 timer: sync subscribes done, cost: 5ms, number: 0
2023-06-18 11:18:37.487527 INFO memsto/recording_rule_cache.go:133 timer: sync recording rules done, cost: 10ms, number: 0
2023-06-18 11:18:37.508177 DEBUG models/notify_tpl.go:216 no tpl files under /root/n9e/etc/template, use default tpl
2023-06-18 11:18:37.509976 INFO naming/hashring.go:39 hash ring 99999999 rebuild [192.168.48.133:17000]
2023-06-18 11:18:37.512634 WARNING sender/email.go:108 SMTP configurations invalid
http server listening on: 0.0.0.0:17000

# 5.浏览器访问
http://192.168.48.132:17000
默认用户: root
默认密码: root.2020
```

:::