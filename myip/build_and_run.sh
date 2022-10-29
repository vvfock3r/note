#!/bin/bash

# 定义变量
imageName="myip:latest"
containerName="ip.jinhui.dev"

# 构建镜像
docker image build . -t ${imageName}

# 若容器存在则删除
docker container inspect ${containerName} &>/dev/null && docker container rm -f ${containerName} &>/dev/null

# 创建容器
docker container run --name ${containerName} -p 7777:7777 --restart always --cpus 0.2 --memory 200m -d ${imageName}