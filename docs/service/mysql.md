# MySQL

<br />

## Binlog

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
