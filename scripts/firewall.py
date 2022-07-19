#!/usr/bin/env python
# --*--coding:utf-8--*--

"""
添加或删除防火墙规则，适用于腾讯云轻量应用服务器

SDK文档：https://cloud.tencent.com/document/product/1207/47578
"""

import sys
import json
from typing import Optional, Tuple, Union, Dict

import httpx
import click
from tencentcloud.common.credential import Credential
from tencentcloud.common.exception.tencent_cloud_sdk_exception import (
    TencentCloudSDKException,
)
from tencentcloud.lighthouse.v20200324 import lighthouse_client, models

__version__ = "v0.0.1"


def get_internet_ip() -> Union[str, None]:
    """获取当前外网出口IP"""

    urls = ["https://api-ipv4.ip.sb/ip"]
    headers = {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36"
    }
    for url in urls:
        r = httpx.get(url, headers=headers, timeout=30)
        if r.status_code == 200:
            return r.text.strip("\n")

    return None


def add_firewall_rule(
        cred: Credential,
        instance_id: str,
        protocol: str,
        port: Optional[str] = None,
        source: Optional[str] = None,
        action: Optional[str] = None,
        description: Optional[str] = None,
) -> Tuple[bool, Dict]:
    # 先执行查询,description不计数
    ok, resp = ls_firewall_rule(cred, instance_id, protocol, port, source, action, None)

    # 查询失败直接返回
    if not ok:
        return ok, resp

    # 如果规则已经存在直接返回
    rules_matched = resp["FirewallRuleSet"]
    if len(rules_matched) >= 1:
        return True, {
            "code": "ok",
            "message": "防火墙规则 `[('{protocol}', '{port}', '{source}', '{action}')]` 已经存在。".format(
                protocol=protocol, port=port, source=source, action=action
            ),
            "requestId": resp["RequestId"],
        }

    # 添加规则
    try:
        # 实例化客户端
        client = lighthouse_client.LighthouseClient(cred, "ap-hongkong")

        # 生成请求
        req = models.CreateFirewallRulesRequest()

        # 填充请求参数
        params = {
            "InstanceId": instance_id,
            "FirewallRules": [
                {
                    "Protocol": protocol,
                    "Port": port,
                    "CidrBlock": source,
                    "Action": action,
                    "FirewallRuleDescription": description,
                }
            ],
        }
        req.from_json_string(json.dumps(params))

        # 发送请求
        resp = client.CreateFirewallRules(req)

        return True, {
            "code": "ok",
            "message": "Add 1 rules",
            "requestId": resp.RequestId,
        }
    except TencentCloudSDKException as err:
        return False, {
            "code": err.code,
            "message": err.message,
            "requestId": err.requestId,
        }


def ls_firewall_rule(
        cred: Credential,
        instance_id: str,
        protocol: str,
        port: Optional[str] = None,
        source: Optional[str] = None,
        action: Optional[str] = None,
        description: Optional[str] = None,
) -> Tuple[bool, Dict]:
    try:
        # 实例化客户端
        client = lighthouse_client.LighthouseClient(cred, "ap-hongkong")

        # 生成请求
        req = models.DescribeFirewallRulesRequest()

        # 填充请求参数
        params = {"InstanceId": instance_id, "Limit": 100}
        req.from_json_string(json.dumps(params))

        # 发送请求
        resp = client.DescribeFirewallRules(req)
        resp = json.loads(resp.to_json_string())

        # 筛选
        if protocol is not None:
            resp["FirewallRuleSet"] = list(
                filter(lambda x: x.get("Protocol") == protocol, resp["FirewallRuleSet"])
            )
        if port is not None:
            resp["FirewallRuleSet"] = list(
                filter(lambda x: x.get("Port") == port, resp["FirewallRuleSet"])
            )
        if source is not None:
            resp["FirewallRuleSet"] = list(
                filter(lambda x: x.get("CidrBlock") == source, resp["FirewallRuleSet"])
            )
        if action is not None:
            resp["FirewallRuleSet"] = list(
                filter(lambda x: x.get("Action") == action, resp["FirewallRuleSet"])
            )
        if description is not None:
            resp["FirewallRuleSet"] = list(
                filter(
                    lambda x: x.get("FirewallRuleDescription") == description,
                    resp["FirewallRuleSet"],
                )
            )

        return True, resp
    except TencentCloudSDKException as err:
        return False, {
            "code": err.code,
            "message": err.message,
            "requestId": err.requestId,
        }


# 删除接口和查询接口参数一致
def remove_firewall_rule(
        cred: Credential,
        instance_id: str,
        protocol: str,
        port: Optional[str] = None,
        source: Optional[str] = None,
        action: Optional[str] = None,
        description: Optional[str] = None,
) -> Tuple[bool, Dict]:
    # 先执行查询
    ok, resp = ls_firewall_rule(
        cred, instance_id, protocol, port, source, action, description
    )

    # 查询失败直接返回
    if not ok:
        return ok, resp

    # 若没有匹配到规则
    rules_matched = resp["FirewallRuleSet"]
    if len(rules_matched) == 0:
        return ok, {
            "code": "ok",
            "message": "No rules matched",
            "requestId": resp["RequestId"],
        }

    # 再执行删除
    try:
        # 实例化客户端
        client = lighthouse_client.LighthouseClient(cred, "ap-hongkong")

        # 生成请求
        req = models.DeleteFirewallRulesRequest()

        # 填充请求参数
        params = {"InstanceId": instance_id, "FirewallRules": resp["FirewallRuleSet"]}
        req.from_json_string(json.dumps(params))

        # 发送请求
        resp = client.DeleteFirewallRules(req)

        return True, {
            "code": "ok",
            "message": "Deleted {} rules".format(len(rules_matched)),
            "requestId": resp.RequestId,
        }
    except TencentCloudSDKException as err:
        return False, {
            "code": err.code,
            "message": err.message,
            "requestId": err.requestId,
        }


class Cli:
    @click.group(context_settings=dict(help_option_names=['-h', '--help']))
    @staticmethod
    def parser():
        '''
        \b
        Add or remove firewall rules for tencent cloud lighthouse
        Source code: https://github.com/vvfock3r/note/blob/main/scripts/firewall.py
        '''
        pass

    @parser.command()
    @click.option("--secret-id", required=True, help="Secret id")
    @click.option("--secret-key", required=True, help="Secret key")
    @click.option("--instance-id", required=True, help="Instance id")
    @click.option("--port", help="Port, supported, - and ALL")
    @click.option("--protocol", help="TCP, UDP, ICMP, ALL")
    @click.option("--source", help="CIDR")
    @click.option("--action", type=click.Choice(["ACCEPT", "DROP"]), help="Action")
    @click.option("--description", help="Description")
    @click.option("-q", "--quiet", help="Do not print response messages", is_flag=True, default=False)
    @staticmethod
    def ls(**kwargs):
        '''query firewall rule for tencent cloud lighthouse'''

        # 删除不能直接传递给函数的key
        secret_id = kwargs.pop("secret_id")
        secret_key = kwargs.pop("secret_key")
        source = kwargs.pop("source")
        quiet = kwargs.pop("quiet")

        # 创建认证信息
        cred = Credential(secret_id, secret_key)
        kwargs["cred"] = cred

        # 更新源地址
        if source == "current ip":
            kwargs["source"] = get_internet_ip()

        # 添加防火墙规则
        ok, msg = ls_firewall_rule(**kwargs)

        # 静默输出
        if not quiet:
            print(json.dumps(msg, ensure_ascii=False, indent=4))

        # 退出程序
        sys.exit(0 if ok else 1)

    @parser.command()
    @click.option("--secret-id", required=True, help="Secret id")
    @click.option("--secret-key", required=True, help="Secret key")
    @click.option("--instance-id", required=True, help="Instance id")
    @click.option("--port", required=True, help="Port, supported, - and ALL")
    @click.option("--protocol", help="TCP, UDP, ICMP, ALL", default="TCP", show_default=True)
    @click.option("--source", help="CIDR", default="current ip", show_default=True)
    @click.option("--action", type=click.Choice(["ACCEPT", "DROP"]), help="Action", default="ACCEPT", show_default=True)
    @click.option("--description", help="Description", default="[Created by Tencent SDK]", show_default=True)
    @click.option("-q", "--quiet", help="Do not print response messages", is_flag=True, default=False)
    @staticmethod
    def add(**kwargs):
        '''add firewall rule for tencent cloud lighthouse'''

        # 删除不能直接传递给函数的key
        secret_id = kwargs.pop("secret_id")
        secret_key = kwargs.pop("secret_key")
        source = kwargs.pop("source")
        quiet = kwargs.pop("quiet")

        # 创建认证信息
        cred = Credential(secret_id, secret_key)
        kwargs["cred"] = cred

        # 更新源地址
        if source == "current ip":
            kwargs["source"] = get_internet_ip()

        # 添加防火墙规则
        ok, msg = add_firewall_rule(**kwargs)

        # 静默输出
        if not quiet:
            print(json.dumps(msg, ensure_ascii=False, indent=4))

        # 退出程序
        sys.exit(0 if ok else 1)

    @parser.command()
    @click.option("--secret-id", required=True, help="Secret id")
    @click.option("--secret-key", required=True, help="Secret key")
    @click.option("--instance-id", required=True, help="Instance id")
    @click.option("--port", help="Port, supported, - and ALL")
    @click.option("--protocol", help="TCP, UDP, ICMP, ALL")
    @click.option("--source", help="CIDR")
    @click.option("--action", type=click.Choice(["ACCEPT", "DROP"]), help="Action")
    @click.option("--description", help="Description")
    @click.option("-q", "--quiet", help="Do not print response messages", is_flag=True, default=False)
    @staticmethod
    def remove(**kwargs):
        '''remove firewall rule for tencent cloud lighthouse'''

        # 删除不能直接传递给函数的key
        secret_id = kwargs.pop("secret_id")
        secret_key = kwargs.pop("secret_key")
        source = kwargs.pop("source")
        quiet = kwargs.pop("quiet")

        # 创建认证信息
        cred = Credential(secret_id, secret_key)
        kwargs["cred"] = cred

        # 更新源地址
        if source == "current ip":
            kwargs["source"] = get_internet_ip()

        # 添加防火墙规则
        ok, msg = remove_firewall_rule(**kwargs)

        # 静默输出
        if not quiet:
            print(json.dumps(msg, ensure_ascii=False, indent=4))

        # 退出程序
        sys.exit(0 if ok else 1)


if __name__ == "__main__":
    Cli().parser()
