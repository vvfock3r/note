#!/bin/bash
# 容器部署和更新脚本

set -euo pipefail

# 拉取最新代码
git pull

# 构建镜像
for i in `seq 5`
do
    docker image build -t nginx:webserver --cpus 1.0 --memory 2g . && break
done

# 若容器存在则删除
docker container inspect jinhui.dev &>/dev/null && docker container rm -f jinhui.dev

# 启动容器
docker container run --name jinhui.dev -p80:80 -p443:443 --restart always --cpus 1.0 --memory 1g -d nginx:webserver
