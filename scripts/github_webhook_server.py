#!/usr/bin/env python
# -*- coding:utf-8-*-

import os
import hmac
from flask import Flask, request, jsonify, abort

app = Flask(__name__)

Github_Secret = "1YbutGiyBDV6hlix"  # 根据实际情况修改


def deploy() -> None:
    '''发布流程'''

    # 切换目录
    os.chdir("/root/note")

    # 拉取最新代码
    os.system("git pull")

    # 构建镜像
    os.system('''
        for i in `seq 5`
        do
            docker image build -t note:latest --cpu-period=100000 --cpu-quota=100000 --memory 2g . && break
        done        
    ''')

    # 若容器存在则删除
    os.system("docker container inspect jinhui.dev &>/dev/null && docker container rm -f jinhui.dev")

    # 启动容器
    os.system(
        "docker container run --name jinhui.dev -p80:80 -p443:443 --restart always --cpus 1.0 --memory 1g -d note:latest")


def encryption(data: bytes) -> str:
    key = Github_Secret.encode("utf-8")
    obj = hmac.new(key, msg=data, digestmod="sha1")
    return obj.hexdigest()


@app.route("/", methods=["POST"])
def post_data():
    # 获取token
    token = encryption(request.data)

    # 获取签名
    signature = request.headers.get("X-Hub-Signature", "").split("=")[-1]

    # 校验签名
    if signature != token:
        return abort(401)

    # 发布
    deploy()

    return jsonify({"status": 200})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=12345)
