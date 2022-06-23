#!/usr/bin/env python
# -*- coding:utf-8-*-

import os
import hmac
from flask import Flask, request, jsonify

app = Flask(__name__)

Github_Secret = "1YbutGiyBDV6hlix"


def encryption(data):
    key = Github_Secret.encode("utf-8")
    obj = hmac.new(key, msg=data, digestmod="sha1")
    return obj.hexdigest()


@app.route("/", methods=["POST"])
def post_data():
    post_data = request.data
    token = encryption(post_data)

    signature = request.headers.get("X-Hub-Signature", "").split("=")[-1]
    if signature != token:
        return "token认证无效", 401
    os.system("cd /root/note && bash deploy.sh")
    return jsonify({"status": 200})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=12345)
