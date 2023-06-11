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

<br />

## 常用配置

### 添加实例

::: details （1）先添加资源组，否则后面有些功能用不了

系统管理 ---> 资源组管理

![image-20230610192513523](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230610192513523.png)

:::

::: details （2）再添加数据库实例，支持MySQL、PgSQL、MongoDB、Redis等多种数据库

实例管理 ---> 实例列表

![image-20230610192403392](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230610192403392.png)

然后点击 测试，看是否可以连接成功

:::

<br />

### 审批流程

系统管理 --> 配置项管理 --> 工单审核流配置 --> 请选择审批权限组

审批流是针对资源组的，不同资源组可以包含不同的审批流

![image-20230611091202206](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230611091202206.png)

<br />

### goInception

文档：[https://archerydms.com/configuration/#goinception](https://archerydms.com/configuration/#goinception)

::: details （1）查看goInception配置文件

```bash
[root@node-1 ~]# docker exec -it goinception cat /etc/config.toml | grep -E '^port|^backup_'
port = 4000
backup_host = "mysql"
backup_port = 3306
backup_user = "root"
backup_password = "123456"
```

:::

::: details （2）配置goInception

系统管理 --> 配置项管理 ---> 系统设置

![image-20230611092456907](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230611092456907.png)

:::

 <br />

## 常用功能

### SQL查询 - 在线查询

::: details （1）插入测试数据

```sql
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(100),
  age INT,
  address VARCHAR(100),
  city VARCHAR(50),
  country VARCHAR(50),
  PRIMARY KEY (id)
);

INSERT INTO users (first_name, last_name, email, age, address, city, country)
VALUES
  ('John', 'Doe', 'johndoe@example.com', 25, '123 Main St', 'New York', 'USA'),
  ('Jane', 'Smith', 'janesmith@example.com', 30, '456 Elm St', 'Los Angeles', 'USA'),
  ('Michael', 'Johnson', 'michaeljohnson@example.com', 35, '789 Oak St', 'Chicago', 'USA'),
  ('Emily', 'Williams', 'emilywilliams@example.com', 28, '321 Pine St', 'San Francisco', 'USA'),
  ('David', 'Brown', 'davidbrown@example.com', 32, '987 Cedar St', 'Seattle', 'USA'),
  ('Sarah', 'Taylor', 'sarahtaylor@example.com', 29, '654 Maple St', 'Boston', 'USA'),
  ('Christopher', 'Miller', 'christophermiller@example.com', 31, '741 Birch St', 'Denver', 'USA'),
  ('Jessica', 'Anderson', 'jessicaanderson@example.com', 27, '852 Walnut St', 'Austin', 'USA'),
  ('Matthew', 'Thomas', 'matthewthomas@example.com', 33, '159 Spruce St', 'Miami', 'USA'),
  ('Olivia', 'Roberts', 'oliviaroberts@example.com', 26, '753 Chestnut St', 'Atlanta', 'USA'),
  ('Alice', 'Johnson', 'alicejohnson@example.com', 28, '123 Main St', 'New York', 'USA'),
  ('Bob', 'Smith', 'bobsmith@example.com', 32, '456 Elm St', 'Los Angeles', 'USA'),
  ('Charlie', 'Davis', 'charliedavis@example.com', 30, '789 Oak St', 'Chicago', 'USA');
```

:::

::: details （2）SQL查询，依赖：添加实例

![image-20230610193153567](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230610193153567.png)

:::

<br />

### SQL审核 - SQL上线

::: details （1）准备SQL语句

```sql
INSERT INTO users (first_name, last_name, email, age, address, city, country)
VALUES ('Ethan', 'Johnson', 'ethanjohnson@example.com', 24, '246 Oak St', 'San Francisco', 'USA');

INSERT INTO users (first_name, last_name, email, age, address, city, country)
VALUES ('Sophia', 'Brown', 'sophiabrown@example.com', 29, '369 Elm St', 'Los Angeles', 'USA');

INSERT INTO users (first_name, last_name, email, age, address, city, country)
VALUES ('Jacob', 'Smith', 'jacobsmith@example.com', 31, '852 Maple St', 'New York', 'USA');
```

:::

::: details （2）SQL上线，依赖：审批流程、goInception

![image-20230611092956838](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230611092956838.png)

:::
