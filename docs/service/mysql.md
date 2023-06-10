# MySQL

## 容器部署

（由Docker官方维护的）`Docker Hub`地址：

* MySQL：[https://hub.docker.com/_/mysql](https://hub.docker.com/_/mysql)
* Percona：[https://hub.docker.com/_/percona](https://hub.docker.com/_/percona)
* MariaDB：[https://hub.docker.com/_/mariadb](https://hub.docker.com/_/mariadb)

（由各个MySQL分支官方维护的）`Docker Hub`地址：

* MySQL：无
* Percona：[https://hub.docker.com/r/percona/percona-server](https://hub.docker.com/r/percona/percona-server)
* MariaDB：无

<br />

各个MySQL及其分支官网下载地址：

* MySQL：[https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)
* Percona：[https://www.percona.com/downloads/](https://www.percona.com/downloads/)
* MariaDB：[https://mariadb.org/download/](https://mariadb.org/download/)

<br />

::: details （1）下载镜像

```bash
# 下载镜像 - MySQL
docker image pull mysql:5.7.39
docker image pull mysql:8.0.30

# 下载镜像 - Percona
docker image pull percona:5.7.35
docker image pull percona:8.0.29-21

# 下载镜像 - MariaDB
docker image pull mariadb:10.9.2
```

:::

::: details （2）设置变量

```bash
# MySQL
Type="mysql"                                                # 类型    （不要随意修改）
Version="8.0.30"                                            # 版本    （根据实际情况修改）
AppName="demo"                                              # 应用名称 （根据实际情况修改）
ContainerName="${AppName}-${Type}-${Version}"               # 容器名称 （根据实际情况修改）
RootPassword="t6G1LJdzOlG^u5yb"                             # Root密码（根据实际情况修改）

ContainerPort=3306                                          # 容器监听端口  （不要随意修改）
LocalHostPort=3306                                          # 宿主机监听端口（根据实际情况修改）

ContainerConfPath=/etc/mysql/conf.d                         # 容器中配置文件目录（不要随意修改）
ContainerConfFile=/etc/my.cnf                               # 容器配置文件     （不要随意修改）
LocalHostConfPath=/etc/${AppName}-${Type}-${Version}/conf.d # 宿主机配置文件目录（根据实际情况修改）

ContainerDataPath=/var/lib/mysql/                           # 容器中数据目录（不要随意修改）
LocalHostDataPath=/var/lib/${AppName}-${Type}-${Version}    # 宿主机数据目录（根据实际情况修改）

# =========================================================================================

# Percona
Type="percona"                                              # 类型    （不要随意修改）
Version="8.0.29-21"                                         # 版本    （根据实际情况修改）
AppName="demo"                                              # 应用名称 （根据实际情况修改）
ContainerName="${AppName}-${Type}-${Version}"               # 容器名称 （根据实际情况修改）
RootPassword="t6G1LJdzOlG^u5yb"                             # Root密码（根据实际情况修改）

ContainerPort=3306                                          # 容器监听端口  （不要随意修改）
LocalHostPort=3307                                          # 宿主机监听端口（根据实际情况修改）

ContainerConfPath=/etc/my.cnf.d                             # 容器中配置文件目录（不要随意修改）
ContainerConfFile=/etc/my.cnf                               # 容器配置文件     （不要随意修改）
LocalHostConfPath=/etc/${AppName}-${Type}-${Version}/conf.d # 宿主机配置文件目录（根据实际情况修改）

ContainerDataPath=/var/lib/mysql/                           # 容器中数据目录（不要随意修改）
LocalHostDataPath=/var/lib/${AppName}-${Type}-${Version}    # 宿主机数据目录（根据实际情况修改）

# =========================================================================================

# MariaDB
Type="mariadb"                                              # 类型    （不要随意修改）
Version="10.9.2"                                            # 版本    （根据实际情况修改）
AppName="demo"                                              # 应用名称 （根据实际情况修改）
ContainerName="${AppName}-${Type}-${Version}"               # 容器名称 （根据实际情况修改）
RootPassword="t6G1LJdzOlG^u5yb"                             # Root密码（根据实际情况修改）

ContainerPort=3306                                          # 容器监听端口  （不要随意修改）
LocalHostPort=3308                                          # 宿主机监听端口（根据实际情况修改）

ContainerConfPath=/etc/mysql/conf.d                         # 容器中配置文件目录（不要随意修改）
ContainerConfFile=/etc/mysql/my.cnf                         # 容器配置文件     （不要随意修改）
LocalHostConfPath=/etc/${AppName}-${Type}-${Version}/conf.d # 宿主机配置文件目录（根据实际情况修改）

ContainerDataPath=/var/lib/mysql/                           # 容器中数据目录（不要随意修改）
LocalHostDataPath=/var/lib/${AppName}-${Type}-${Version}    # 宿主机数据目录（根据实际情况修改）
```

:::

::: details （3）启动MySQL

```bash
# Percona需要先创建目录并授权，否则会报Permission denied
mkdir -p ${LocalHostDataPath} && chmod -R 777 ${LocalHostDataPath} && ls -ld ${LocalHostDataPath}

# 启动容器 - MySQL
docker container run --name ${ContainerName} \
                     -v ${LocalHostConfPath}:${ContainerConfPath} \
                     -v ${LocalHostDataPath}:${ContainerDataPath} \
                     -p ${LocalHostPort}:${ContainerPort} \
                     -e MYSQL_ROOT_PASSWORD=${RootPassword} \
                     --restart=always \
                     -d \
                   ${Type}:${Version}

# 拷贝配置文件到宿主机,用于持久化, -L用于追踪软链文件源文件
docker container cp -L ${ContainerName}:${ContainerConfFile} ${LocalHostConfPath}

# 删掉下面所有的includedir配置
vim ${LocalHostConfPath}/my.cnf

!includedir /etc/mysql/conf.d/
!includedir /etc/mysql/mysql.conf.d/
```

:::

::: details （4）连接MySQL

最好使用与服务器相同版本的MySQL客户端，否则可能会出现奇怪的问题，比如使用**MySQL 5.7的客户端**连接**MySQL Server 8.x**，报错如下

`ERROR 2059 (HY000): Authentication plugin 'caching_sha2_password' cannot be loaded: /usr/lib64/mysql/plugin/caching_sha2_password.so: cannot open shared object file: No such file or directory`

```bash
docker container exec -it ${ContainerName} mysql -uroot -P${ContainerPort} -p"${RootPassword}"  # 在容器内部连接MySQL
mysql -h192.168.48.133 -P${LocalHostPort} -uroot -p"${RootPassword}"                            # 在容器外部连接MySQL
```

:::

::: details （5）删除MySQL

```bash
docker container rm -f ${ContainerName}  # 删除容器
rm -rf $(dirname ${LocalHostConfPath})   # 删除宿主机上的配置(请先确认目录是否正确)
rm -rf ${LocalHostDataPath}              # 删除宿主机上的数据目录(请先确认目录是否正确)
```

:::

<br />

## 基本配置

### 时区

::: details 点击查看详情

```bash
# 检查一下当前的时区, 使用系统时区，而系统时区是UTC
mysql> show variables like "%time_zone%";
+------------------+--------+
| Variable_name    | Value  |
+------------------+--------+
| system_time_zone | UTC    |
| time_zone        | SYSTEM |
+------------------+--------+
2 rows in set (0.01 sec)

# 通过获取当前时间验证一下
mysql> select now();
+---------------------+
| now()               |
+---------------------+
| 2023-03-31 12:47:36 |  # 当前实际时间是 2023-03-31 20:47:36
+---------------------+
1 row in set (0.00 sec)

# --------------------------------------------------------------

# 1、修改时区
vim ${LocalHostConfPath}/my.cnf
[mysqld]
default-time_zone = '+8:00'

# 重启容器，使配置文件生效
docker container restart ${ContainerName}

# 3、验证
mysql> show variables like "%time_zone%";
+------------------+--------+
| Variable_name    | Value  |
+------------------+--------+
| system_time_zone | UTC    |
| time_zone        | +08:00 |
+------------------+--------+
2 rows in set (0.00 sec)

mysql> select now();
+---------------------+
| now()               |
+---------------------+
| 2023-03-31 20:51:09 |
+---------------------+
1 row in set (0.00 sec)
```

:::

<br />

### 字符集

::: details 点击查看详情

```bash
# 修改配置
vim ${LocalHostConfPath}/my.cnf

[mysqld]
character-set-server=utf8mb4
collation-server=utf8mb4_general_ci

[client]
default-character-set=utf8mb4
...

# 重启容器，使配置文件生效
docker container restart ${ContainerName}

# 检查字符集
docker exec -it ${ContainerName} mysql -uroot -p"${RootPassword}" -e "status;" | grep -i characterset

Server characterset:    utf8mb4
Db     characterset:    utf8mb4
Client characterset:    utf8mb4
Conn.  characterset:    utf8mb4
```

:::

<br />

### 最大数据包

::: details 点击查看详情

```bash
# 先检查一下默认值
mysql> SELECT CONCAT(ROUND(@@max_allowed_packet / (1024 * 1024), 2), 'MB') AS max_allowed_packet;
+--------------------+
| max_allowed_packet |
+--------------------+
| 64.00MB            |
+--------------------+
1 row in set (0.01 sec)

# 根据实际情况调整
vim ${LocalHostConfPath}/my.cnf
[mysqld]
max_allowed_packet = 1024M

# 重启容器，使配置文件生效
docker container restart ${ContainerName}

# 验证
mysql> SELECT CONCAT(ROUND(@@max_allowed_packet / (1024 * 1024), 2), 'MB') AS max_allowed_packet;
+--------------------+
| max_allowed_packet |
+--------------------+
| 1024.00MB          |
+--------------------+
1 row in set (0.00 sec)
```

:::

<br />

### 最大连接数

::: details 点击查看详情

```bash
# 先检查一下默认值
mysql> SHOW VARIABLES LIKE 'max_connections';
+-----------------+-------+
| Variable_name   | Value |
+-----------------+-------+
| max_connections | 151   |
+-----------------+-------+
1 row in set (0.01 sec)

# 根据实际情况调整
vim ${LocalHostConfPath}/my.cnf
[mysqld]
max_connections = 5000

# 重启容器，使配置文件生效
docker container restart ${ContainerName}

# 验证
mysql> SHOW VARIABLES LIKE 'max_connections';
+-----------------+-------+
| Variable_name   | Value |
+-----------------+-------+
| max_connections | 1000  |
+-----------------+-------+
1 row in set (0.01 sec)
```

:::

<br />

### 启用独立表空间

::: details 点击查看详情

```bash
# ON代表独立表空间, OFF代表共享表空间, 高版本默认开启
# 如果是OFF可以参考后面的步骤开启独立表空间
mysql> SHOW VARIABLES LIKE 'innodb_file_per_table';
+-----------------------+-------+
| Variable_name         | Value |
+-----------------------+-------+
| innodb_file_per_table | ON    |  
+-----------------------+-------+
1 row in set (0.01 sec)

# 根据实际情况调整
vim ${LocalHostConfPath}/my.cnf
[mysqld]
innodb_file_per_table=ON

# 重启容器，使配置文件生效
docker container restart ${ContainerName}

# 验证
mysql> SHOW VARIABLES LIKE 'innodb_file_per_table';
+-----------------------+-------+
| Variable_name         | Value |
+-----------------------+-------+
| innodb_file_per_table | ON    |
+-----------------------+-------+
1 row in set (0.01 sec)
```

:::

<br />

### 调整临时表参数

::: details 点击查看详情

```bash
# 在内存中创建临时表时的最大大小限制
# 当临时表的大小超过这个值时，MySQL将使用磁盘上的临时文件来存储数据
mysql> SHOW VARIABLES LIKE 'tmp_table_size';
+----------------+----------+
| Variable_name  | Value    |
+----------------+----------+
| tmp_table_size | 16777216 |
+----------------+----------+
1 row in set (0.00 sec)

# 在内存中创建基于内存的临时表时的最大大小限制
# 当临时表的大小超过这个值时，MySQL将使用磁盘上的临时文件来存储数据
mysql> SHOW VARIABLES LIKE 'max_heap_table_size';
+---------------------+----------+
| Variable_name       | Value    |
+---------------------+----------+
| max_heap_table_size | 16777216 |
+---------------------+----------+
1 row in set (0.00 sec)

# 用于存储临时文件的目录路径
mysql> SHOW VARIABLES LIKE 'tmpdir';
+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| tmpdir        | /tmp  |
+---------------+-------+
1 row in set (0.01 sec)

# -----------------------------------------------------

# 根据实际情况调整
vim ${LocalHostConfPath}/my.cnf
[mysqld]
tmp_table_size = 256M
max_heap_table_size = 512M
tmpdir = /var/lib/mysql          # 目录必须存在, 这里的值只是举个例子

# 重启容器，使配置文件生效
docker container restart ${ContainerName}

# -----------------------------------------------------

# 验证
mysql> SHOW VARIABLES LIKE 'tmp_table_size';
+----------------+-----------+
| Variable_name  | Value     |
+----------------+-----------+
| tmp_table_size | 268435456 |
+----------------+-----------+
1 row in set (0.01 sec)

mysql> SHOW VARIABLES LIKE 'max_heap_table_size';
+---------------------+-----------+
| Variable_name       | Value     |
+---------------------+-----------+
| max_heap_table_size | 536870912 |
+---------------------+-----------+
1 row in set (0.00 sec)

mysql> SHOW VARIABLES LIKE 'tmpdir';
+---------------+----------------+
| Variable_name | Value          |
+---------------+----------------+
| tmpdir        | /var/lib/mysql |
+---------------+----------------+
1 row in set (0.00 sec)
```

:::

<br />

### 调整数据目录位置

::: details 点击查看详情

```bash
# 先检查一下默认值
mysql> SHOW VARIABLES LIKE 'datadir';
+---------------+-----------------+
| Variable_name | Value           |
+---------------+-----------------+
| datadir       | /var/lib/mysql/ |
+---------------+-----------------+
1 row in set (0.00 sec)

# 停止MySQL
# 把原来数据目录迁移到新的目录下

# 根据实际情况调整, 这里只是举个例子
vim ${LocalHostConfPath}/my.cnf
[mysqld]
datadir = /tmp

# 重启容器，使配置文件生效
docker container restart ${ContainerName}

# 验证
mysql> SHOW VARIABLES LIKE 'datadir';
```

:::

<br />

### Innodb缓冲池大小

::: details 点击查看详情

```bash
# 先检查一下默认值, 128M
mysql> SHOW VARIABLES LIKE 'innodb_buffer_pool_size';
+-------------------------+------------+
| Variable_name           | Value      |
+-------------------------+------------+
| innodb_buffer_pool_size | 134217728  |
+-------------------------+------------+
1 row in set (0.01 sec)

# 根据实际情况调整, 增大此值可以提高查询和写入性能, 代价就是会占用较多的内存
vim ${LocalHostConfPath}/my.cnf
[mysqld]
innodb_buffer_pool_size=2G

# 重启容器，使配置文件生效
docker container restart ${ContainerName}

# 验证
mysql> SHOW VARIABLES LIKE 'innodb_buffer_pool_size';
+-------------------------+------------+
| Variable_name           | Value      |
+-------------------------+------------+
| innodb_buffer_pool_size | 2147483648 |
+-------------------------+------------+
1 row in set (0.01 sec)
```

:::

<br />

### 默认身份认证插件

::: details 点击查看详情

```bash
# 先检查一下默认值
mysql> SELECT @@default_authentication_plugin;
+---------------------------------+
| @@default_authentication_plugin |
+---------------------------------+
| caching_sha2_password           |
+---------------------------------+
1 row in set, 1 warning (0.00 sec)

# 根据实际情况调整
vim ${LocalHostConfPath}/my.cnf
[mysqld]
...
default_authentication_plugin = mysql_native_password

# 重启容器，使配置文件生效
docker container restart ${ContainerName}

# 验证
mysql> SELECT @@default_authentication_plugin;
+---------------------------------+
| @@default_authentication_plugin |
+---------------------------------+
| mysql_native_password           |
+---------------------------------+
1 row in set, 1 warning (0.00 sec)

# 推荐使用 caching_sha2_password，但是为了兼容旧的MySQL客户端或者库，也可以设置成mysql_native_password
```

:::

<br />

### 二进制日志 binlog

::: details 点击查看详情

```bash
# 先检查一下默认值
mysql> show variables like 'log_%';
+----------------------------------------+----------------------------------------+
| Variable_name                          | Value                                  |
+----------------------------------------+----------------------------------------+
| log_bin                                | OFF                                    | # 这里是开关
| log_bin_basename                       |                                        |
| log_bin_index                          |                                        |
| log_bin_trust_function_creators        | OFF                                    |
| log_bin_use_v1_row_events              | OFF                                    |
| log_error                              | stderr                                 |
| log_error_services                     | log_filter_internal; log_sink_internal |
| log_error_suppression_list             |                                        |
| log_error_verbosity                    | 2                                      |
| log_output                             | FILE                                   |
| log_queries_not_using_indexes          | OFF                                    |
| log_raw                                | OFF                                    |
| log_replica_updates                    | OFF                                    |
| log_slave_updates                      | OFF                                    |
| log_slow_admin_statements              | OFF                                    |
| log_slow_extra                         | OFF                                    |
| log_slow_replica_statements            | OFF                                    |
| log_slow_slave_statements              | OFF                                    |
| log_statements_unsafe_for_binlog       | ON                                     |
| log_throttle_queries_not_using_indexes | 0                                      |
| log_timestamps                         | UTC                                    |
+----------------------------------------+----------------------------------------+
21 rows in set (0.01 sec)

# 根据实际情况调整
vim ${LocalHostConfPath}/my.cnf
[mysqld]
...
log-bin = mysql-bin # 启用binlog
disable-log-bin     # 关闭binlog, 使用 skip-log-bin 或 disable-log-bin 都可以

# 重启容器，使配置文件生效
docker container restart ${ContainerName}

# 验证
mysql> show variables like 'log_bin';
+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| log_bin       | ON    |
+---------------+-------+
1 row in set (0.00 sec)
```

:::

<br />

### 全局事物标识符 gtid

::: details 点击查看详情

```bash
# 先检查一下默认值
mysql> SHOW VARIABLES LIKE 'gtid_mode';
+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| gtid_mode     | OFF   |
+---------------+-------+
1 row in set (0.04 sec)

# 根据实际情况调整
vim ${LocalHostConfPath}/my.cnf
[mysqld]
gtid_mode=ON
enforce_gtid_consistency=ON

# 重启容器，使配置文件生效
docker container restart ${ContainerName}

# 验证
mysql> SHOW VARIABLES LIKE 'gtid_mode';
+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| gtid_mode     | ON    |
+---------------+-------+
1 row in set (0.01 sec)
```

:::

<br />

## 主从同步

### 基本配置

::: details 环境要求

环境要求

* 两台MySQL版本、基础配置保持一致

实验环境

* Docker部署的两台 MySQL 8.0.30

:::

::: details （1）基础配置：启用二进制日志和设置主从ID 

```bash
# 1、主服务器修改配置
[mysqld]
log-bin = mysql-bin    # 启用二进制日志功能
server-id = 1          # 主服务器的标识号, 默认值是1, 可以是任意非零整数

# 2、从服务器修改配置
[mysqld]
server-id = 2          # 从服务器的标识号, 需要保证和主服务器使用不同的标识号
read_only = 1          # [可选]从服务器启用只读模式, 仅限制普通用户只读, root用户和主从同步仍然是可写的
#super_read_only = 1   # [可选]从服务器启用只读模式, 限制普通用户和root用户只读，主从同步仍然是可写的

# 3、重启主和从服务器
```

:::

::: details （2）主服务器：创建从服务器的授权账号

```bash
# 1、创建账号, 需要注意认证插件是否使用了caching_sha2_password
# 查看默认的认证插件: SELECT @@default_authentication_plugin;
mysql> CREATE USER 'repl'@'%' IDENTIFIED WITH caching_sha2_password BY 'password';
Query OK, 0 rows affected (0.01 sec)

# 2、授权账号
mysql> GRANT REPLICATION SLAVE ON *.* TO 'repl'@'%';
Query OK, 0 rows affected (0.01 sec)

# 3、刷新权限
mysql> flush privileges;
Query OK, 0 rows affected (0.00 sec)
```

:::

::: details （3）从服务器：配置主从

```bash
# 1、主服务器: 查看一下状态
mysql> show master status;
+------------------+----------+--------------+------------------+-------------------+
| File             | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
+------------------+----------+--------------+------------------+-------------------+
| binlog.000001    |     157  |              |                  |                   |
+------------------+----------+--------------+------------------+-------------------+
1 row in set (0.01 sec)

# 2、从服务器: 配置主服务器信息
# get_master_public_key=1 用于从主服务器获取公钥, 否则可能会报如下错误
# Authentication plugin 'caching_sha2_password' reported error: Authentication requires secure connection
change master to
    master_host='192.168.48.131',
    master_port=3306,
    master_user='repl',
    master_password='password',
    master_log_file='binlog.000001',
    master_log_pos=157,
    get_master_public_key=1;

# 3、从服务器: 开启主从同步
mysql> start slave;
Query OK, 0 rows affected, 1 warning (0.01 sec)

# 4、从服务器: 查看主从同步状态
mysql> show slave status\G
...
 Slave_IO_Running: Yes
Slave_SQL_Running: Yes
```

:::

<br />

### 管理命令

::: details 点击查看详情

```bash
# 从服务器
show slave status\G    # 查看从服务器状态
stop slave;            # 停止复制
reset slave;           # 重置复制信息
start slave;           # 开启复制

# 主服务器
show master status;    # 查看主服务器状态
reset master;          # 清除二进制日志(binlog)并重新启动新的二进制日志文件,注意这将丢失已经写入的二进制日志文件
```

:::

<br />

### 参数解释

::: details 从服务器参数解释

```bash
mysql> show slave status\G
*************************** 1. row ***************************
               Slave_IO_State: Waiting for source to send event # 表示IO线程正在等待主服务器发送事件
                  Master_Host: 192.168.48.131                   # 
                  Master_User: repl                             #
                  Master_Port: 3306                             #
                Connect_Retry: 60                               # 如果复制连接失败，从服务器尝试重新连接到主服务器的时间间隔,单位是秒
              Master_Log_File: binlog.000001                    # 主服务器当前正在写入的二进制日志文件名
          Read_Master_Log_Pos: 157                              # 从服务器正在读取的主服务器二进制日志文件中的位置
               Relay_Log_File: 0da0bc4123ad-relay-bin.000002    # 从服务器正在写入的中继日志文件名
                Relay_Log_Pos: 323                              # 从服务器在中继日志文件中的位置
        Relay_Master_Log_File: binlog.000001                    # 从服务器当前正在复制的主服务器二进制日志文件名
             Slave_IO_Running: Yes                              # 从服务器的IO线程是否正在运行
            Slave_SQL_Running: Yes                              # 从服务器的SQL线程是否正在运行
              Replicate_Do_DB:                                  # 要复制的特定数据库
          Replicate_Ignore_DB:                                  # 要忽略复制的特定数据库
           Replicate_Do_Table:                                  # 要复制的特定表
       Replicate_Ignore_Table:                                  # 要忽略复制的特定表
      Replicate_Wild_Do_Table:                                  # 使用通配符指定要复制的表
  Replicate_Wild_Ignore_Table:                                  # 使用通配符指定要忽略复制的表
                   Last_Errno: 0                                # 最近一次复制错误的错误代码
                   Last_Error:                                  # 最近一次复制错误的错误消息
                 Skip_Counter: 0                                # 跳过的复制事件计数
          Exec_Master_Log_Pos: 157                              # 从服务器已执行的主服务器二进制日志文件中的位置
              Relay_Log_Space: 540                              # 中继日志文件占用的空间
              Until_Condition: None                             # 用于指定从服务器的复制停止条件
               Until_Log_File:                                  # 复制停止时的日志文件名
                Until_Log_Pos: 0                                # 复制停止时的日志位置
           Master_SSL_Allowed: No                               # 是否允许使用SSL连接到主服务器
           Master_SSL_CA_File:                                  # SSL连接所需的CA文件
           Master_SSL_CA_Path:                                  # SSL连接所需的CA路径
              Master_SSL_Cert:                                  # SSL连接所需的证书文件
            Master_SSL_Cipher:                                  # SSL连接所使用的加密算法
               Master_SSL_Key:                                  # SSL连接所需的私钥文件
        Seconds_Behind_Master: 0                                # 从服务器落后于主服务器的秒数
Master_SSL_Verify_Server_Cert: No                               # 是否验证主服务器的SSL证书
                Last_IO_Errno: 0                                # 最近一次IO错误的错误代码
                Last_IO_Error:                                  # 最近一次IO错误的错误消息
               Last_SQL_Errno: 0                                # 最近一次 SQL 错误的错误代码
               Last_SQL_Error:                                  # 最近一次 SQL 错误的错误消息
  Replicate_Ignore_Server_Ids:                                  # 要忽略的主服务器 ID 列表
             Master_Server_Id: 1                                # 主服务器的唯一标识符
                  Master_UUID: ea29009a-f144-11ed-ac19-0242ac110002  # 主服务器的全局唯一标识符 (UUID)
             Master_Info_File: mysql.slave_master_info               # 存储主服务器信息的文件名
                    SQL_Delay: 0                                     # 设置从服务器 SQL 线程延迟执行的时间
          SQL_Remaining_Delay: NULL                                  # SQL 线程延迟执行的剩余时间
      Slave_SQL_Running_State: Replica has read all relay log; waiting for more updates # 从服务器 SQL 线程的当前运行状态
           Master_Retry_Count: 86400                                 # 果从服务器无法连接到主服务器，则从服务器尝试重新连接的次数           
                  Master_Bind:                                       # 主服务器的绑定地址
      Last_IO_Error_Timestamp:                                       # 最近一次 IO 错误发生的时间戳
     Last_SQL_Error_Timestamp:                                       # 最近一次 SQL 错误发生的时间戳
               Master_SSL_Crl:                                       # SSL 连接所需的证书吊销列表 (CRL)
           Master_SSL_Crlpath:                                       # SSL 连接所需的证书吊销列表 (CRL) 路径
           Retrieved_Gtid_Set:                                       # 从服务器检索到的 GTID 集合
            Executed_Gtid_Set:                                       # 从服务器已执行的 GTID 集合
                Auto_Position: 0                                     # 指示从服务器是否使用自动定位复制
         Replicate_Rewrite_DB:                                       # 重写复制的数据库名称
                 Channel_Name:                                       # 复制通道的名称
           Master_TLS_Version:                                       # 主服务器所使用的 TLS 版本
       Master_public_key_path:                                       # 主服务器公钥文件的路径
        Get_master_public_key: 1                                     # 指示是否从主服务器获取公钥
            Network_Namespace:                                       # 用于指定网络命名空间的名称
1 row in set, 1 warning (0.01 sec)
```

:::

<br />

### 复制错误

::: details （1）IO 线程错误：Lost connection to MySQL server at 'reading initial communication packet', system error: 0

原因：将主服务器重启，从服务器通常会报此错误

解决：等从服务器自动重连一般会恢复，自动重连间隔时间由 Connect_Retry 参数指定，一般为60秒

:::

::: details （2）SQL 线程错误：Coordinator stopped because there were error(s) in the worker(s).

背景：主从数据不一致的情况下，执行SQL可能会出现问题

先模拟主从数据不一致：

* 主数据库创建一个数据库： `create database demo;`
* 从数据库删掉这个数据库：`drop database demo;`

模拟SQL线程错误：

* 主数据库删除数据库：`drop database demo;`
* 此时从数据库也会执行这条语句，但其实数据库并不存在，所以执行报错

:::

<br />

## SQL查询

