#!/usr/bin/env python
# --*--coding:utf-8--*--

'''
添加或删除防火墙规则，适用于腾讯云轻量应用服务器

SDK文档：https://cloud.tencent.com/document/product/1207/47578
'''

import sys
import json
import argparse
from typing import Tuple, Union, Dict

import httpx
from tencentcloud.common.credential import Credential
from tencentcloud.common.exception.tencent_cloud_sdk_exception import TencentCloudSDKException
from tencentcloud.lighthouse.v20200324 import lighthouse_client, models


def get_internet_ip() -> Union[str, None]:
    tellers = [
        "https://api-ipv4.ip.sb/ip",

        # 仅适用于腾讯云平台主机，文档：https://cloud.tencent.com/document/product/213/17940
        # "http://metadata.tencentyun.com/meta-data/public-ipv4",
    ]

    headers = {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36"}
    for url in tellers:
        r = httpx.get(url, headers=headers, timeout=30)
        if r.status_code == 200:
            return r.text.strip("\n")

    return None


def add_firewall_rule(
        cred: Credential,
        instanceId: str,
        protocol: str,
        port: str,
        source: str,
        action: str = "ACCEPT",
        description: str = "[Created by Tencent SDK]") -> Tuple[bool, Dict]:
    try:
        # 实例化客户端
        client = lighthouse_client.LighthouseClient(cred, "ap-hongkong")

        # 生成请求
        req = models.CreateFirewallRulesRequest()

        # 填充请求参数
        params = {
            "InstanceId": instanceId,
            "FirewallRules": [
                {
                    "Protocol": protocol,
                    "Port": port,
                    "CidrBlock": source,
                    "Action": action,
                    "FirewallRuleDescription": description
                }
            ]
        }
        req.from_json_string(json.dumps(params))

        # 发送请求
        resp = client.CreateFirewallRules(req)

        return True, {"requestId": resp.RequestId}

    except TencentCloudSDKException as err:
        return False, {"code": err.code, "message": err.message, "requestId": err.requestId}


def del_firewall_rule(
        cred: Credential,
        instanceId: str,
        protocol: str,
        port: str,
        source: str,
        action: str = "ACCEPT",
        description: str = "[Created by Tencent SDK]") -> Tuple[bool, Dict]:
    try:
        # 实例化客户端
        client = lighthouse_client.LighthouseClient(cred, "ap-hongkong")

        # 生成请求
        req = models.DeleteFirewallRulesRequest()

        # 填充请求参数
        params = {
            "InstanceId": instanceId,
            "FirewallRules": [
                {
                    "Protocol": protocol,
                    "Port": port,
                    "CidrBlock": source,
                    "Action": action,
                    "FirewallRuleDescription": description
                }
            ]
        }
        req.from_json_string(json.dumps(params))

        # 发送请求
        resp = client.DeleteFirewallRules(req)

        return True, {"requestId": resp.RequestId}

    except TencentCloudSDKException as err:
        return False, {"code": err.code, "message": err.message, "requestId": err.requestId}


def main():
    # 根命令和子命令
    parser = argparse.ArgumentParser(usage="%(prog)s Command [options]")
    subparsers = parser.add_subparsers(
        title="management commands",
        metavar=None  # !
    )
    addCommand = subparsers.add_parser("add", help="add firewall rule")
    delCommand = subparsers.add_parser("del", help="delete firewall rule")

    # add子命令
    addCommand.description = "Add firewall rule"
    addCommand.usage = "{} add [options]".format(parser.format_usage().split()[1])

    addCommand.add_argument("--secretId",
                            required=True,
                            help="secret id for tencent cloud lighthouse",
                            metavar="Id")
    addCommand.add_argument("--secretKey",
                            required=True,
                            help="secret key for tencent cloud lighthouse",
                            metavar="Key")
    addCommand.add_argument("--instanceId",
                            required=True,
                            help="instance id for tencent cloud lighthouse",
                            metavar="Id")
    addCommand.add_argument("--port",
                            required=True,
                            help="port, port1,port2, port1-port3, ALL",
                            metavar="Port")
    addCommand.add_argument("--protocol",
                            default="TCP",
                            choices=["TCP", "UDP", "ICMP", "ALL"],
                            help="TCP, UDP, ICMP, ALL (default: %(default)s)",
                            metavar="Protocol")
    addCommand.add_argument("--source",
                            default="dynamic",
                            help="subnet or ip (default: %(default)s)",
                            metavar="Source")
    addCommand.add_argument("--action",
                            default="ACCEPT",
                            help="ACCEPT, DROP (default: %(default)s)",
                            metavar="Action")
    addCommand.add_argument("--description",
                            default="[Created by Tencent SDK]",
                            help="description (default: %(default)s)",
                            metavar="TXT")
    addCommand.set_defaults(func=add_firewall_rule)

    # del子命令
    delCommand.description = "Delete firewall rule"
    delCommand.usage = "{} del [options]".format(parser.format_usage().split()[1])

    delCommand.add_argument("--secretId",
                            required=True,
                            help="secret id for tencent cloud lighthouse",
                            metavar="Id")
    delCommand.add_argument("--secretKey",
                            required=True,
                            help="secret key for tencent cloud lighthouse",
                            metavar="Key")
    delCommand.add_argument("--instanceId",
                            required=True,
                            help="instance id for tencent cloud lighthouse",
                            metavar="Id")
    delCommand.add_argument("--port",
                            required=True,
                            help="port, port1,port2, port1-port3, ALL",
                            metavar="Port")
    delCommand.add_argument("--protocol",
                            default="TCP",
                            choices=["TCP", "UDP", "ICMP", "ALL"],
                            help="TCP, UDP, ICMP, ALL (default: %(default)s)",
                            metavar="Protocol")
    delCommand.add_argument("--source",
                            default="0.0.0.0/0",
                            help="subnet or ip (default: %(default)s)",
                            metavar="Source")
    delCommand.add_argument("--action",
                            default="ACCEPT",
                            help="ACCEPT, DROP (default: %(default)s)",
                            metavar="Action")
    # description参数并不会起到实际作用，仅仅是为了使del和add保持一致，使用起来更加方便
    delCommand.add_argument("--description",
                            help="just for placeholders",
                            metavar="TXT")
    delCommand.set_defaults(func=del_firewall_rule)

    # 解析参数
    args = parser.parse_args()

    # 未输入任何参数则输出帮助信息
    if len(args.__dict__) <= 0:
        parser.print_help()
        sys.exit(1)

    # 解析IPv4
    if args.__dict__["source"] == "dynamic":
        args.__dict__["source"] = get_internet_ip()

    # 创建认证对象
    cred = Credential(args.__dict__.pop("secretId"), args.__dict__.pop("secretKey"))

    # 执行函数
    ok, msg = args.__dict__.pop("func")(cred=cred, **args.__dict__)
    print(json.dumps(msg, ensure_ascii=False, indent=4))
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()