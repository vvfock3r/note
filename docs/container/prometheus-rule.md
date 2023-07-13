# Prometheus告警规则

## 备注

使用率过低也要报警info



## 说明

```bash
# 日志级别
severity: info		通知
severity: warning	警告
severity: error		严重	
severity: critical	致命	电话告警

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

### 主机宕机

```yaml
- alert: node_down
  expr: up{job=~"node-exporte.*"} != 1
  for: 1m
  labels:
    severity: critical
  annotations:
    timestamp: |-
      @{{ with query "time()" }}{{ . | first | value | humanizeTimestamp }}{{ end }}
    description: |-
      主机宕机, 主机名: {{ $labels.hostname }}, 实例: {{ $labels.instance }}
```

<br />

### 平均负载

```bash
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

<br />

### CPU

```bash
- record: mega_node_cpu_utilization
  expr: 100 - ( avg by (job,hostname,instance) (irate(node_cpu_seconds_total{mode="idle"}[1m])) * 100 )

- alert: node_average_cpu_utilization_high
  expr: mega_node_cpu_utilization > 80
  for: 1h
  labels:
    severity: warning
  annotations:
    timestamp: |-
      @{{ with query "time()" }}{{ . | first | value | humanizeTimestamp }}{{ end }}
    description: |-
      主机平均CPU使用率超过80%, 已持续1小时, 当前值: {{ $value | printf "%.1f" }}%
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
```

<br />

### 内存

```bash
# 内存使用率
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

# 剩余可用内存(GB)
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
```

<br />

### 磁盘

```bash
# 磁盘剩余空间百分比
- record: mega_node_disk_available_utilization
  expr: |-
    100 -
    ( node_filesystem_size_bytes - node_filesystem_free_bytes )  /              
    ( node_filesystem_size_bytes - node_filesystem_free_bytes + node_filesystem_avail_bytes ) * 100

- alert: node_disk_available_utilization_low
  expr: mega_node_disk_available_utilization < 30
  for: 30m
  labels:
    severity: error
  annotations:
    timestamp: |-
      @{{ with query "time()" }}{{ . | first | value | humanizeTimestamp }}{{ end }}
    description: |-
      主机磁盘剩余空间不足30%, 已持续30分钟, 当前值: {{ $value | printf "%.1f" }}%
      主机名: {{ $labels.hostname }}, 实例: {{ $labels.instance }}, 挂载点: {{ $labels.mountpoint }}
```

Inodes

<br />

### 网络

### 聚合监控



