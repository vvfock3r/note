# diskcache

文档：[https://grantjenks.com/docs/diskcache](https://grantjenks.com/docs/diskcache)

**特性**

* 持久化存储，使用的是SQLite
* 支持TTL
* 多进程和多线程安全
* 自动淘汰旧数据（LRU、LFU 等策略）

<br />

## 安装

```python
pip install diskcache
```

<br />

## 基本使用

```python
import diskcache

# 创建缓存目录（会自动创建） ./cache/cache.db, db文件是自动创建的
cache = diskcache.Cache("./cache")

# 存储数据
cache['name'] = 'Alice'

# 读取
print(cache['name'])  # 输出：Alice

# 删除
del cache['name']

# 清空所有缓存
cache.clear()
```

<br />

## 设置TTL

```python
import time
import diskcache

# 创建缓存目录（会自动创建） ./cache/cache.db, db文件是自动创建的
cache = diskcache.Cache("./cache")

# 设置过期时间为 10 秒
cache.set('token', 'abcd1234', expire=10)
print(cache.get('token'))  # => abcd1234

# 等待过期
time.sleep(11)
print(cache.get('token'))  # => None（已过期）
```

<br />

## 缓存结果

```python
import time
import diskcache

# 创建缓存目录（会自动创建） ./cache/cache.db, db文件是自动创建的
cache = diskcache.Cache("./cache")


# 缓存结果
#   expire float or int 10秒后过期, None 表示永久有效, 0 表示不缓存结果
#   tag    str          给缓存结果打上标签，可用于批量清除（例如清除某类缓存）, 使用 cache.evict(tag='xxx') 清空某列标签缓存。
#   ignore tuple        指定哪些参数（按名称或索引）应在生成缓存键时被忽略。用于如 verbose、debug 参数等
@cache.memoize(expire=10)
def slow_function(x):
    print("running slow_function...")
    return x * 2


# 验证缓存
print(slow_function(5))  # 第一次计算
print(slow_function(5))  # 直接命中缓存
```

<br />

## 事物支持

```python
import diskcache

# 创建缓存目录（会自动创建） ./cache/cache.db, db文件是自动创建的
cache = diskcache.Cache("./cache")

# 事物支持
with cache.transact():
    cache["x"] = 1
    cache["y"] = 2

print(cache.get("x"))
print(cache.get("y"))
```

<br />

## 多进程优化

当你有多个进程同时访问同一个缓存目录时，推荐使用：

```python
import diskcache

# 当你有多个进程同时访问同一个缓存目录时，推荐使用
# 它会自动分片、减少锁冲突，性能比单个 Cache 高数倍
# shards    分片数量
# timeout   获取文件锁的超时时间（单位：秒），设置为None代表永不超时
cache = diskcache.FanoutCache('cache', shards=8, timeout=1)

cache.set('x', 10)
print(cache['x'])
```

<br />

## 双端队列

```python
from diskcache import Deque

# 创建磁盘队列, 还可以指定一个 iterable, 用于迭代数据
queue = Deque(directory="cache")

# 清空, 用于测试效果
queue.clear()

# 进队
queue.append('task1')
queue.append('task2')

# 出队（FIFO）
task = queue.popleft()
print(task)  # -> 'task1'

# 双端操作
queue.appendleft('task3')
task = queue.popleft()
print(task)
```

