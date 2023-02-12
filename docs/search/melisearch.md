# meilisearch

<br />

## 文档

Github：[https://github.com/meilisearch/meilisearch](https://github.com/meilisearch/meilisearch)

文档：[https://docs.meilisearch.com/](https://docs.meilisearch.com/)

API文档：[https://docs.meilisearch.com/reference/api/overview.html](https://docs.meilisearch.com/reference/api/overview.html)

<br />

## 快速开始

文档：[https://docs.meilisearch.com/learn/getting_started/installation.html](https://docs.meilisearch.com/learn/getting_started/installation.html)

::: details （1）使用Docker部署

```bash
# 部署
# MEILI_ENV : 可选值production、development
# MASTER_KEY: 安全相关的主密钥，建议设置
[root@node-1 ~]# docker container run --name meilisearch \
    -p 7700:7700 \
    -v /opt/meili_data:/meili_data \
    -e MEILI_ENV='development' \
    -e MEILI_MASTER_KEY='ww3fMuYE2xfJyB5e'\
    --memory=1g \
    --restart=always \
    -d \
    getmeili/meilisearch:v1.0.0

# 刚启动时会写入一些初始数据
[root@node-1 ~]# du -sh /opt/meili_data/
96K     /opt/meili_data/

# 查看日志
[root@node-1 ~]# docker container logs -f meilisearch

# 进入容器
[root@node-1 ~]# docker container exec -it meilisearch sh
```

:::

::: details （2）导入官方提供的测试数据

```bash
# 下载JSON文件
[root@node-1 ~]# wget -c https://docs.meilisearch.com/movies.json 

# 导入数据,注意Authorization中填写启动服务时指定的MASTER_KEY
[root@node-1 ~]# curl \
  -X POST 'http://localhost:7700/indexes/movies/documents?primaryKey=id' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer ww3fMuYE2xfJyB5e' \
  --data-binary @movies.json ; \
echo

{"taskUid":0,"indexUid":"movies","status":"enqueued","type":"documentAdditionOrUpdate","enqueuedAt":"2023-02-11T17:04:06.739852519Z"}
```

:::

::: details （3）搜索

**基于命令行的搜索**

```bash
[root@node-1 ~]# curl \
  -s \
  -X POST 'http://localhost:7700/indexes/movies/search' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer ww3fMuYE2xfJyB5e' \
  --data-binary '{ "q": "botman", "limit": 2 }' | \
jq

{
  "hits": [
    {
      "id": 268,
      "title": "Batman",
      "overview": "Batman must face his most ruthless nemesis when a deformed madman calling himself \"The Joker\" seizes control of Gotham's criminal underworld.",
      "genres": [
        "Fantasy",
        "Action"
      ],
      "poster": "https://image.tmdb.org/t/p/w500/hztwplhxe2X9sq24CIcvkUy2DHZ.jpg",
      "release_date": 614563200
    },
    {
      "id": 272,
      "title": "Batman Begins",
      "overview": "Driven by tragedy, billionaire Bruce Wayne dedicates his life to uncovering and defeating the corruption that plagues his home, Gotham City.  Unable to work within the system, he instead creates a new identity, a symbol of fear for the criminal underworld - The Batman.",
      "genres": [
        "Action",
        "Crime",
        "Drama"
      ],
      "poster": "https://image.tmdb.org/t/p/w500/1P3ZyEq02wcTMd3iE4ebtLvncvH.jpg",
      "release_date": 1118361600
    }
  ],
  "query": "botman",
  "processingTimeMs": 1,
  "limit": 2,
  "offset": 0,
  "estimatedTotalHits": 70
}
```

**基于Web界面的查询，仅支持development模式**

![image-20230212011806644](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230212011806644.png)

:::

::: details （4）概念说明：索引、文档、主键

索引：[https://docs.meilisearch.com/learn/core_concepts/indexes.html#indexes](https://docs.meilisearch.com/learn/core_concepts/indexes.html#indexes)

结构：[https://docs.meilisearch.com/learn/core_concepts/documents.html#structure](https://docs.meilisearch.com/learn/core_concepts/documents.html#structure)

* **索引**：包含一组具有关联设置的文档。它类似于SQL中的表 或 MongoDB 中的集合

- **文档**：包含一个或多个字段形式的数据的对象
- **Primary Field** : 一个特殊的字段，在所有文档中都是强制性的。它包含主键和文档标识符

:::

<br />

## 系统管理

::: details （1）获取API密钥

文档：[https://docs.meilisearch.com/learn/getting_started/quick_start.html#securing-meilisearch](https://docs.meilisearch.com/learn/getting_started/quick_start.html#securing-meilisearch)

为了演示方便我们统一使用的主密钥，但是在生产环境切记不要这样做

```bash
[root@node-1 ~]# curl -s -H 'Authorization: Bearer ww3fMuYE2xfJyB5e' -X GET 'http://localhost:7700/keys' | jq
{
  "results": [
    {
      "name": "Default Search API Key",
      "description": "Use it to search from the frontend",
      "key": "af44b4b4ce0e86d343452260a226b0e09c0461bc0593a6a06b53f91b3cc74e02",
      "uid": "3811d230-a240-4f64-9b63-94e5572595d8",
      "actions": [
        "search"
      ],
      "indexes": [
        "*"
      ],
      "expiresAt": null,
      "createdAt": "2023-02-11T17:02:03.147696964Z",
      "updatedAt": "2023-02-11T17:02:03.147696964Z"
    },
    {
      "name": "Default Admin API Key",
      "description": "Use it for anything that is not a search operation. Caution! Do not expose it on a public frontend",
      "key": "0000fd9e04338ffa675b0c8e779313e02d3ffbb84ac8dce17f08a8d8a7d62911",
      "uid": "ca7e24b5-0dea-477b-9a57-0ff8cd70e473",
      "actions": [
        "*"
      ],
      "indexes": [
        "*"
      ],
      "expiresAt": null,
      "createdAt": "2023-02-11T17:02:03.146263969Z",
      "updatedAt": "2023-02-11T17:02:03.146263969Z"
    }
  ],
  "offset": 0,
  "limit": 20,
  "total": 2
}
```

:::

<br />

## 导入数据

文档：[https://docs.meilisearch.com/reference/api/documents.html](https://docs.meilisearch.com/reference/api/documents.html)

::: details （1）curl 导入数据

```bash
# 1、下载JSON文件
[root@node-1 ~]# wget -c https://docs.meilisearch.com/movies.json 

[root@node-1 ~]# ls -lh movies.json 
-rw-rw-rw- 1 root root 16M Feb 11 21:25 movies.json

# 2、导入数据前看一下存储目录大小
[root@node-1 ~]# du -sh /opt/meili_data/
96K     /opt/meili_data/

# 3、导入数据,注意Authorization中填写启动服务时指定的MASTER_KEY
[root@node-1 ~]# curl \
  -X POST 'http://localhost:7700/indexes/movies/documents?primaryKey=id' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer ww3fMuYE2xfJyB5e' \
  --data-binary @movies.json ; \
echo

{"taskUid":0,"indexUid":"movies","status":"enqueued","type":"documentAdditionOrUpdate","enqueuedAt":"2023-02-11T17:04:06.739852519Z"}

# 导入是异步的，status需要重点关注一下
# 如果status字段的值为enqueued或processing，您所要做的就是稍等片刻，然后再次检查
# 如果status字段的值succeeded代表导入成功
# 同一数据可以多次导入

# 4、通过taskUid查询导入结果
[root@node-1 ~]# curl -s -X GET 'http://localhost:7700/tasks/24' -H 'Authorization: Bearer ww3fMuYE2xfJyB5e'  | jq
{
  "uid": 24,
  "indexUid": "movies",
  "status": "succeeded",
  "type": "documentAdditionOrUpdate",
  "canceledBy": null,
  "details": {
    "receivedDocuments": 31944,
    "indexedDocuments": 31944
  },
  "error": null,
  "duration": "PT0.324941231S",
  "enqueuedAt": "2023-02-12T07:09:07.586970514Z",
  "startedAt": "2023-02-12T07:09:07.595216794Z",
  "finishedAt": "2023-02-12T07:09:07.920158025Z"
}

# 5、导入数据后再看一下存储目录大小
[root@node-1 ~]# du -sh /opt/meili_data/
328M    /opt/meili_data/
```

:::

<br />

## 查询数据

文档：[https://docs.meilisearch.com/reference/api/search.html](https://docs.meilisearch.com/reference/api/search.html)

::: details （1）curl GET和POST的不同格式

```bash
# GET
curl -s -H 'Authorization: Bearer ww3fMuYE2xfJyB5e' \
  -X GET 'http://localhost:7700/indexes/movies/search' \
  --data-binary '{ "q": "botman", "limit": 2 }' | \
jq

# POST
curl -s -H 'Authorization: Bearer ww3fMuYE2xfJyB5e' \
  -H 'Content-Type: application/json' \
  -X POST 'http://localhost:7700/indexes/movies/search' \
  --data-binary '{ "q": "botman", "limit": 2 }' | \
jq
```

:::

::: details （2）获取统计信息

文档：[https://docs.meilisearch.com/reference/api/stats.html](https://docs.meilisearch.com/reference/api/stats.html)

```bash
[root@node-1 ~]# curl -s -H 'Authorization: Bearer ww3fMuYE2xfJyB5e' -X GET 'http://localhost:7700/stats' | jq
{
  "databaseSize": 346734592,
  "lastUpdate": "2023-02-11T17:52:25.189209891Z",
  "indexes": {
    "movies": {
      "numberOfDocuments": 31944,
      "isIndexing": false,
      "fieldDistribution": {
        "genres": 31944,
        "id": 31944,
        "overview": 31944,
        "poster": 31944,
        "release_date": 31944,
        "title": 31944
      }
    }
  }
}
```

:::

::: details （3）查看所有索引

```bash
[root@node-1 ~]# curl -s -H 'Authorization: Bearer ww3fMuYE2xfJyB5e' -X GET 'http://localhost:7700/indexes' | jq
{
  "results": [
    {
      "uid": "movies",
      "createdAt": "2023-02-11T17:04:06.748399491Z",
      "updatedAt": "2023-02-11T17:52:25.189209891Z",
      "primaryKey": "id"
    }
  ],
  "offset": 0,
  "limit": 20,
  "total": 1
}
```

:::

::: details （4）查询某个索引下的数据

```bash
curl \
  -s \
  -X POST 'http://localhost:7700/indexes/movies/search' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer ww3fMuYE2xfJyB5e' \
  --data-binary '{ "q": "botman", "limit": 2 }' | \
jq

{
  "hits": [
    {
      "id": 268,
      "title": "Batman",
      "overview": "Batman must face his most ruthless nemesis when a deformed madman calling himself \"The Joker\" seizes control of Gotham's criminal underworld.",
      "genres": [
        "Fantasy",
        "Action"
      ],
      "poster": "https://image.tmdb.org/t/p/w500/hztwplhxe2X9sq24CIcvkUy2DHZ.jpg",
      "release_date": 614563200
    },
    {
      "id": 272,
      "title": "Batman Begins",
      "overview": "Driven by tragedy, billionaire Bruce Wayne dedicates his life to uncovering and defeating the corruption that plagues his home, Gotham City.  Unable to work within the system, he instead creates a new identity, a symbol of fear for the criminal underworld - The Batman.",
      "genres": [
        "Action",
        "Crime",
        "Drama"
      ],
      "poster": "https://image.tmdb.org/t/p/w500/1P3ZyEq02wcTMd3iE4ebtLvncvH.jpg",
      "release_date": 1118361600
    }
  ],
  "query": "botman",
  "processingTimeMs": 1,
  "limit": 2,
  "offset": 0,
  "estimatedTotalHits": 70
}
```

:::

::: details （5）限制返回指定字段

```bash
curl \
  -s \
  -X POST 'http://localhost:7700/indexes/movies/search' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer ww3fMuYE2xfJyB5e' \
  --data-binary '{ "q": "botman", "limit": 2, "attributesToRetrieve":["id", "title"] }' | \
jq

{
  "hits": [
    {
      "id": 268,
      "title": "Batman"
    },
    {
      "id": 272,
      "title": "Batman Begins"
    }
  ],
  "query": "botman",
  "processingTimeMs": 1,
  "limit": 2,
  "offset": 0,
  "estimatedTotalHits": 70
}
```

:::

<br />

## GO SDK

::: details （1）安装

```bash
D:\application\GoLand\example>go get github.com/meilisearch/meilisearch-go
go: added github.com/andybalholm/brotli v1.0.4
go: added github.com/golang-jwt/jwt/v4 v4.4.3
go: added github.com/josharian/intern v1.0.0
go: added github.com/klauspost/compress v1.15.6
go: added github.com/mailru/easyjson v0.7.7
go: added github.com/meilisearch/meilisearch-go v0.23.0
go: added github.com/valyala/bytebufferpool v1.0.0
go: added github.com/valyala/fasthttp v1.37.1-0.20220607072126-8a320890c08d
```

:::

::: details （2）导入数据

```go
package main

import (
	"encoding/json"
	"github.com/meilisearch/meilisearch-go"
	"io"
	"log"
	"os"
	"time"
)

func main() {
	// 实例化客户端
	client := meilisearch.NewClient(meilisearch.ClientConfig{
		Host:   "http://192.168.48.151:7700",
		APIKey: "ww3fMuYE2xfJyB5e",
	})

	// 打开文件
	f, err := os.Open("movies.json")
	if err != nil {
		panic(err)
	}
	defer f.Close()

	// 读取文件
	data, err := io.ReadAll(f)
	if err != nil {
		panic(err)
	}

	// JSON反序列化
	var movies []map[string]any
	err = json.Unmarshal(data, &movies)
	if err != nil {
		panic(err)
	}

	// 添加文档
	taskInfo, err := client.Index("movies").AddDocuments(movies)
	if err != nil {
		panic(err)
	}
	log.Println("文档添加成功")

	// 查询任务状态
Loop:
	for {
		// 查询任务状态,第一次其实不需要查，以后再优化
		task, err := client.GetTask(taskInfo.TaskUID)
		if err != nil {
			panic(err)
		}

		switch task.Status {
		// 如果任务正在排队或者正在处理中，则休眠几秒再进行查询
		case meilisearch.TaskStatusEnqueued, meilisearch.TaskStatusProcessing:
			log.Println("文档正在处理")
			time.Sleep(time.Second)
			continue
		case meilisearch.TaskStatusSucceeded:
			log.Println("文档处理成功")
			break Loop
		case meilisearch.TaskStatusFailed, meilisearch.TaskStatusUnknown:
			log.Println("文档处理失败")
			break Loop
		}
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
2023/02/12 15:46:19 文档添加成功
2023/02/12 15:46:19 文档正在处理
2023/02/12 15:46:20 文档处理成功
```

:::

::: details （3）全文搜索

```go
package main

import (
	"encoding/json"
	"fmt"
	"github.com/meilisearch/meilisearch-go"
)

func main() {
	// 实例化客户端
	client := meilisearch.NewClient(meilisearch.ClientConfig{
		Host:   "http://192.168.48.151:7700",
		APIKey: "ww3fMuYE2xfJyB5e",
	})

	// 查询,限制返回结果为1个
	resp, err := client.Index("movies").Search("botman", &meilisearch.SearchRequest{
		Limit: 1,
	})
	if err != nil {
		panic(err)
	}

	// JSON序列化
	data, err := json.MarshalIndent(resp, "", "  ")
	if err != nil {
		panic(err)
	}
	fmt.Println(string(data))
}
```

输出结果

```json
D:\application\GoLand\example>go run main.go
{                 
  "hits": [
    {
      "genres": [ 
        "Fantasy",
        "Action"  
      ],          
      "id": 268,  
      "overview": "Batman must face his most ruthless nemesis when a deformed madman calling himself \"The Joker\" seizes control of Gotham's criminal underworld.",
      "poster": "https://image.tmdb.org/t/p/w500/hztwplhxe2X9sq24CIcvkUy2DHZ.jpg",
      "release_date": 614563200,
      "title": "Batman"
    }
  ],
  "estimatedTotalHits": 70,
  "limit": 1,
  "processingTimeMs": 1,
  "query": "botman"
}
```

:::