# Archery

官网：[https://archerydms.com](https://archerydms.com)

Github：[https://github.com/hhyo/Archery/tree/v1.9.1](https://github.com/hhyo/Archery/tree/v1.9.1)

<br />

## 部署

::: details （1）Docker Compose部署

```bash
# 下载包
wget -c https://github.com/hhyo/Archery/archive/refs/tags/v1.9.1.tar.gz
tar zxf v1.9.1.tar.gz
cd Archery-1.9.1/src/docker-compose

# 启动服务
docker compose -f docker-compose.yml up -d

# 表结构初始化
docker container exec -ti archery /bin/bash
cd /opt/archery
source /opt/venv4archery/bin/activate
python3 manage.py makemigrations sql
python3 manage.py migrate

# 数据初始化
python3 manage.py dbshell < sql/fixtures/auth_group.sql
python3 manage.py dbshell < src/init_sql/mysql_slow_query_review.sql

# 创建管理用户
python3 manage.py createsuperuser

# 重启服务
docker container restart archery

# 日志查看和问题排查
docker container logs archery -f -n 10

# 浏览器访问
# http://192.168.48.132:9123

# 
```

:::

