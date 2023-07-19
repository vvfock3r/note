# Prometheus告警规则

## 约定

* 资源使用率低也需要添加监控，尽早发现闲置资源，尽早降低成本

<br />

## 说明

```bash
# 日志级别
severity: info		通知
severity: warning	警告
severity: error		严重
severity: critical	致命

# 自定义指标的种类
1、记录规则, 比如 mega_node_average_cpu_utilization
2、自定义Exporter规则

# 自定义指标书写规则
1、第一个字段必须以mega_开头, 也可以使用其他字符串, 但一定要统一, 方便区分Exporter内置和自定义指标
2、第二个字段代表某个领域, 比如主机层面均使用node, k8s层面均使用k8s
3、第三个字段代表某种资源，比如CPU/内存等, 这个字段可能包含多个下划线
4、最后一个字段使用high等词语

# 告警规则书写规则
1、同一领域内告警描述应该使用相同的词语开头, 比如node对应主机
```

<br />

## 主机层面

### 运行状态

::: details （1）主机宕机

```yaml
- alert: node_down
  expr: up{job=~"node-exporter.*"} != 1
  for: 1m
  labels:
    severity: critical
  annotations:
    timestamp: |-
      @{{ with query "time()" }}{{ . | first | value | humanizeTimestamp }}{{ end }}
    description: |-
      主机宕机, 主机名: {{ $labels.hostname }}, 实例: {{ $labels.instance }}
```

:::

::: details （2）主机重启

```yaml
- alert: node_reboot
  expr: time() - node_boot_time_seconds < 600
  for: 1m
  labels:
    severity: warning
  annotations:
    timestamp: |-
      @{{ with query "time()" }}{{ . | first | value | humanizeTimestamp }}{{ end }}
    description: |-
      主机自上次启动到现在, 运行时长小于600秒, 当前值: {{ $value | printf "%.0f" }}秒
      主机名: {{ $labels.hostname }}, 实例: {{ $labels.instance }}
```

:::

<br />

### 平均负载

::: details 点击查看详情

```yaml
- record: mega_node_cpu_cores_total
  expr: count(node_cpu_seconds_total{mode="idle"}) by (job, instance, hostname)

- alert: node_average_load_high
  expr: node_load1 / mega_node_cpu_cores_total > 1.0
  for: 1m
  labels:
    severity: error
  annotations:
    timestamp: |-
      @{{ with query "time()" }}{{ . | first | value | humanizeTimestamp }}{{ end }}
    description: |-
      主机1分钟内平均负载过高, 当前值是满负载的倍数: {{ $value | printf "%.1f" }}
      主机名: {{ $labels.hostname }}, 实例: {{ $labels.instance }}
      
- alert: node_average_load_high
  expr: node_load5 / mega_node_cpu_cores_total > 1.0
  for: 1m
  labels:
    severity: error
  annotations:
    timestamp: |-
      @{{ with query "time()" }}{{ . | first | value | humanizeTimestamp }}{{ end }}
    description: |-
      主机5分钟内平均负载过高, 当前值是满负载的倍数: {{ $value | printf "%.1f" }}
      主机名: {{ $labels.hostname }}, 实例: {{ $labels.instance }}
      
- alert: node_average_load_high
  expr: node_load15 / mega_node_cpu_cores_total > 1.0
  for: 1m
  labels:
    severity: error
  annotations:
    timestamp: |-
      @{{ with query "time()" }}{{ . | first | value | humanizeTimestamp }}{{ end }}
    description: |-
      主机15分钟内平均负载过高, 当前值是满负载的倍数: {{ $value | printf "%.1f" }}
      主机名: {{ $labels.hostname }}, 实例: {{ $labels.instance }}
```

:::

<br />

### CPU相关

::: details 点击查看详情

```yaml
- record: mega_node_cpu_utilization
  expr: 100 - ( avg by (job,hostname,instance) (irate(node_cpu_seconds_total{mode="idle"}[1m])) * 100 )

# 使用率监控
- alert: node_average_cpu_utilization_high
  expr: mega_node_cpu_utilization > 80
  for: 1h
  labels:
    severity: warning
  annotations:
    timestamp: |-
      @{{ with query "time()" }}{{ . | first | value | humanizeTimestamp }}{{ end }}
    description: |-
      主机CPU使用率超过80%, 已持续1小时, 当前值: {{ $value | printf "%.1f" }}%
      主机名: {{ $labels.hostname }}, 实例: {{ $labels.instance }}

- alert: node_average_cpu_utilization_high
  expr: mega_node_cpu_utilization > 95
  for: 5m
  labels:
    severity: error
  annotations:
    timestamp: |-
      @{{ with query "time()" }}{{ . | first | value | humanizeTimestamp }}{{ end }}
    description: |-
      主机平均CPU使用率超过95%, 已持续5分钟, 当前值: {{ $value | printf "%.1f" }}%
      主机名: {{ $labels.hostname }}, 实例: {{ $labels.instance }}
      
# 资源闲置监控: 按使用率监控
- alert: node_average_cpu_utilization_high
  expr: mega_node_cpu_utilization < 5
  for: 1d
  labels:
    severity: warning
  annotations:
    timestamp: |-
      @{{ with query "time()" }}{{ . | first | value | humanizeTimestamp }}{{ end }}
    description: |-
      主机平均CPU使用率小于5%, 已持续1天, 当前值: {{ $value | printf "%.1f" }}%
      主机名: {{ $labels.hostname }}, 实例: {{ $labels.instance }}
```

:::

<br />

### 内存相关

::: details 点击查看详情

```yaml
# 内存使用率: 按比例监控
- record: mega_node_memory_utilization
  expr: (node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / node_memory_MemTotal_bytes * 100

- alert: node_memory_utilization_high
  expr: mega_node_memory_utilization > 85
  for: 5m
  labels:
    severity: error
  annotations:
    timestamp: |-
      @{{ with query "time()" }}{{ . | first | value | humanizeTimestamp }}{{ end }}
    description: |-
      主机内存使用率超过85%, 已持续5分钟, 当前值: {{ $value | printf "%.1f" }}%
      主机名: {{ $labels.hostname }}, 实例: {{ $labels.instance }}

# 剩余可用内存(GB): 按可用数量级监控
- record: mega_node_memory_available_gb
  expr: node_memory_MemAvailable_bytes / 1024 / 1024 / 1024
  
- alert: node_memory_available_low
  expr: mega_node_memory_available_gb < 1.0
  for: 5m
  labels:
    severity: error
  annotations:
    timestamp: |-
      @{{ with query "time()" }}{{ . | first | value | humanizeTimestamp }}{{ end }}
    description: |-
      主机可用内存少于1.0GB, 已持续5分钟, 当前值: {{ $value | printf "%.2f" }}
      主机名: {{ $labels.hostname }}, 实例: {{ $labels.instance }}
      
# 总内存(GB), 暂时没用到
- record: mega_node_memory_total_gb
  expr: node_memory_MemTotal_bytes / 1024 / 1024 / 1024
  
# 资源闲置监控: 按使用率监控
- alert: node_memory_utilization_low
  expr: mega_node_memory_utilization < 20
  for: 1w
  labels:
    severity: info
  annotations:
    timestamp: |-
      @{{ with query "time()" }}{{ . | first | value | humanizeTimestamp }}{{ end }}
    description: |-
      主机内存使用率低于20%, 已持续1周, 当前值: {{ $value | printf "%.1f" }}%
      主机名: {{ $labels.hostname }}, 实例: {{ $labels.instance }}
```

:::

<br />

### 文件系统

::: details （1）文件系统空间监控

```yaml
# 文件系统剩余空间百分比
- record: mega_node_filesystem_available_utilization
  expr: |-
    100 -
    ( node_filesystem_size_bytes - node_filesystem_free_bytes )  /              
    ( node_filesystem_size_bytes - node_filesystem_free_bytes + node_filesystem_avail_bytes ) * 100

- alert: node_filesystem_available_utilization_low
  expr: mega_node_filesystem_available_utilization < 30
  for: 30m
  labels:
    severity: error
  annotations:
    timestamp: |-
      @{{ with query "time()" }}{{ . | first | value | humanizeTimestamp }}{{ end }}
    description: |-
      主机磁盘剩余空间不足30%, 已持续30分钟, 当前值: {{ $value | printf "%.1f" }}%
      主机名: {{ $labels.hostname }}, 实例: {{ $labels.instance }}, 挂载点: {{ $labels.mountpoint }}
      
# 资源闲置监控
- alert: node_filesystem_available_utilization_low
  expr: mega_node_filesystem_available_utilization > 80
  for: 1w
  labels:
    severity: info
  annotations:
    timestamp: |-
      @{{ with query "time()" }}{{ . | first | value | humanizeTimestamp }}{{ end }}
    description: |-
      主机磁盘剩余空间大于80%, 已持续1周, 当前值: {{ $value | printf "%.1f" }}%
      主机名: {{ $labels.hostname }}, 实例: {{ $labels.instance }}, 挂载点: {{ $labels.mountpoint }}
```

:::

::: details （2）文件系统只读监控

```yaml
- alert: node_filesystem_readonly
  expr: node_filesystem_readonly == 1
  for: 1m
  labels:
    severity: critical
  annotations:
    timestamp: |-
      @{{ with query "time()" }}{{ . | first | value | humanizeTimestamp }}{{ end }}
    description: |-
      主机文件系统为只读状态, 已持续1分钟
      主机名: {{ $labels.hostname }}, 实例: {{ $labels.instance }}, 挂载点: {{ $labels.mountpoint }}
```

:::

<br />

### 网络相关

::: details （1）内外网总流量

```yaml
# 最近5分钟内外网入口流量总和
- record: mega_node_network_receive_bytes_total
  expr: sum(rate(node_network_receive_bytes_total{device="ens33"}[5m]))

- alert: node_network_receive_bytes_high
  expr: mega_node_network_receive_bytes_total > 20 * 1024 * 1024
  for: 5m
  labels:
    severity: error
  annotations:
    timestamp: |-
      @{{ with query "time()" }}{{ . | first | value | humanizeTimestamp }}{{ end }}
    description: |-
      主机最近5分钟入口总流量大于20M/s, 已持续5分钟, 当前值: {{ $value | printf "%.1f" }}%
      主机名: {{ $labels.hostname }}, 实例: {{ $labels.instance }}

# 最近5分钟内外网出口流量总和
- record: mega_node_network_transmit_bytes_total
  expr: sum(rate(node_network_transmit_bytes_total{device="ens33"}[5m]))
  
- alert: node_network_transmit_bytes_high
  expr: mega_node_network_transmit_bytes_total > 20 * 1024 * 1024
  for: 5m
  labels:
    severity: error
  annotations:
    timestamp: |-
      @{{ with query "time()" }}{{ . | first | value | humanizeTimestamp }}{{ end }}
    description: |-
      主机最近5分钟出口总流量大于20M/s, 已持续5分钟, 当前值: {{ $value | printf "%.1f" }}%
      主机名: {{ $labels.hostname }}, 实例: {{ $labels.instance }}
```

:::

<br />

### 聚合监控

::: details （1）检查所有主机系统内核版本是否一致

```yaml
# 关键点: 对标签值进行分组, 并统计个数, 进行判断 ( 关键词 sum函数 + by分组 )
- alert: node_system_kernel_release_mismatch
  expr: count(sum by (kernel) (label_replace(node_uname_info, "kernel", "$1", "release", "([0-9]+.[0-9]+.[0-9]+).*"))) > 1
  for: 5m
  labels:
    severity: error
  annotations:
    timestamp: |-
      @{{ with query "time()" }}{{ . | first | value | humanizeTimestamp }}{{ end }}
    description: |-
      主机系统内核版本不一致, 当前内核版本种类个数: {{ $value | printf "%.0f" }}
```

如果遇到告警排查的思路

![image-20230719064953850](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230719064953850.png)

![image-20230719065025508](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230719065025508.png)

![image-20230719065204005](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230719065204005.png)

:::

::: details （2）检查所有主机系统时间是否一致

```yaml
# 关键点: 对指标值进行分组, 并统计个数, 进行判断 ( 关键词: count_values )
- alert: node_system_time_mismatch
  expr: count(count_values("timestamp", floor(node_time_seconds))) > 1
  for: 5m
  labels:
    severity: error
  annotations:
    timestamp: |-
      @{{ with query "time()" }}{{ . | first | value | humanizeTimestamp }}{{ end }}
    description: |-
      主机系统时间不一致, 当前时间种类个数: {{ $value | printf "%.0f" }}

# 注意事项
# 以上使用了 floor 来取整, 但在实际中可能会带来误差(猜想, 未实际验证), 比如
# 	1689722835.999999
# 	1689722836.000000

# 优化方式: 通过四舍五入来消除误差, 还可以指定round的第二个参数来兼容多秒内的误差
- alert: node_system_time_mismatch
  expr: count(count_values("timestamp", round(node_time_seconds))) > 1
  for: 5m
  labels:
    severity: error
  annotations:
    timestamp: |-
      @{{ with query "time()" }}{{ . | first | value | humanizeTimestamp }}{{ end }}
    description: |-
      主机系统时间不一致, 当前时间种类个数: {{ $value | printf "%.0f" }}
```

1、可以看到两台主机的时间戳并不一致

![image-20230719073706711](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230719073706711.png)

2、验证我们的告警规则

![image-20230719073731352](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230719073731352.png)

3、通过 sort 或 sort_desc 对值进行排序，找出个别有问题的主机

![image-20230719073938905](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230719073938905.png)

:::

<br />

