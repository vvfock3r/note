# Redis



## 查看信息

### INFO

```bash
info
	Server：服务器, 包含 Redis 服务器的一般信息，如版本、进程 ID、运行时间等。
	Clients（客户端）：包含与客户端连接相关的信息，如当前连接数、阻塞的客户端数等。
	Memory（内存）：包含 Redis 内存使用相关的信息，如占用的内存量、内存使用模式等。
	Persistence（持久化）：如果 Redis 启用了持久化机制，该部分包含与持久化相关的信息，如数据文件路径、RDB/AOF 文件的相关配置等
	Stats（统计）：包含一些运行时统计信息，如每秒执行的命令数、键空间的统计信息等。
	Replication（复制）：如果 Redis 配置为主从复制模式，该部分包含与复制相关的信息，如主服务器的地址、复制状态等。
	CPU（处理器）：包含与 CPU 相关的统计信息，如 CPU 使用率、Redis 在不同命令类型上的 CPU 使用情况等。
	Cluster（集群）：如果 Redis 配置为集群模式，该部分包含与集群相关的信息，如集群节点数量、集群状态等。
	Keyspace（键空间）：包含每个数据库中键的统计信息，如键的数量、过期键的数量等
```

<br />

### 连接数

```bash
# 查看当前连接数
127.0.0.1:6379> info clients
# Clients
connected_clients:372
client_recent_max_input_buffer:4
client_recent_max_output_buffer:0
blocked_clients:0

# 查看最大支持的连接数
127.0.0.1:6379> config get maxclients
1) "maxclients"
2) "10000"
```

<br />

### 持久化

```bash
# 是否开启RDB持久化
127.0.0.1:6379> config get save
1) "save"
2) "900 1 300 10 60 10000"

# 关闭RDB持久化
127.0.0.1:6379> config set save ""
OK

# 是否开启AOF持久化
127.0.0.1:6379> config get appendonly
1) "appendonly"
2) "no"

# 关闭AOF持久化
127.0.0.1:6379> config set appendonly no
OK
```

<br />

### 内存碎片

查看

```bash
# 查看内存碎片率
127.0.0.1:6379> info memory
mem_fragmentation_ratio:3.80

# 计算公式: used_memory_rss / used_memory
used_memory_rss	操作系统实际分配的内存
used_memory		Redis实际已经使用了的内存大小
```

自动清理

```bash
# 查看内存碎片自动整理是否开启
127.0.0.1:6379> config get activedefrag
1) "activedefrag"
2) "yes"

# 开启内存碎片自动整理, 不会阻塞主进程
127.0.0.1:6379> config set activedefrag yes
OK

# 关闭内存碎片自动整理
127.0.0.1:6379> config set activedefrag no
OK

# --------------------------------------------
# 触发自动清理的条件, 以下任意一个条件触发则触发自动清理
# 1、active-defrag-ignore-bytes		默认值，碎片达到100MB时，开启清理
# 2、active-defrag-threshold-lower	默认值，当碎片超过 10% 时，开启清理
# 3、active-defrag-threshold-upper	默认值，内存碎片超过 100%，则尽最大努力整理

127.0.0.1:6379> config get active-defrag-ignore-bytes
1) "active-defrag-ignore-bytes"
2) "104857600"

127.0.0.1:6379> config get active-defrag-threshold-lower
1) "active-defrag-threshold-lower"
2) "10"

127.0.0.1:6379> config get active-defrag-threshold-upper
1) "active-defrag-threshold-upper"
2) "100"

# --------------------------------------------
# 清理内存时会消耗CPU资源, 可以调整所占用的CPU资源
# active-defrag-cycle-min	默认值 5，占用资源最小百分比
# active-defrag-cycle-max   默认值75，占用资源最大百分比

127.0.0.1:6379> config get active-defrag-cycle-min
1) "active-defrag-cycle-min"
2) "5"

127.0.0.1:6379> config get active-defrag-cycle-max
1) "active-defrag-cycle-max"
2) "75"
```

手动清理

```bash
# 手动清理内存, 会阻塞主进程
127.0.0.1:6379> memory purge
OK
```

注意事项

```bash
# 1、自动清理和手动清理有可能会没有效果, 
# 2、重启可能对于内存碎片并没有效果, 因为重启后由于加载持久化数据导致内存碎片率又很高
```

