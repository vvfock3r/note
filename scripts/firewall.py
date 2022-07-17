#!/usr/bin/env python
# --*--coding:utf-8--*--

'''
添加或删除防火墙规则，适用于腾讯云轻量应用服务器

SDK文档：https://cloud.tencent.com/document/product/1207/47578
'''

import sys
import json
import argparse
from typing import Optional, Tuple, Union, Dict

import httpx
from tencentcloud.common.credential import Credential
from tencentcloud.common.exception.tencent_cloud_sdk_exception import TencentCloudSDKException
from tencentcloud.lighthouse.v20200324 import lighthouse_client, models

__version__ = "v0.0.1"


def get_internet_ip() -> Union[str, None]:
    '''获取当前外网出口IP'''

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
    # 先执行查询,description不计数
    ok, resp = ls_firewall_rule(cred, instanceId, protocol, port, source, action, None)

    # 查询失败直接返回
    if not ok:
        return ok, resp

    # 如果规则已经存在直接返回
    rules_matched = resp["FirewallRuleSet"]
    if len(rules_matched) >= 1:
        return True, {
            "code": "ok",
            "message": "防火墙规则 `[('{protocol}', '{port}', '{source}', '{action}')]` 已经存在。".format(
                protocol=protocol,
                port=port,
                source=source,
                action=action
            ),
            "requestId": resp["RequestId"]
        }

    # 添加规则
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

        return True, {"code": "ok", "message": "Add 1 rules", "requestId": resp.RequestId}
    except TencentCloudSDKException as err:
        return False, {"code": err.code, "message": err.message, "requestId": err.requestId}


def ls_firewall_rule(
        cred: Credential,
        instanceId: str,
        protocol: Optional[str] = None,
        port: Optional[str] = None,
        source: Optional[str] = None,
        action: Optional[str] = None,
        description: Optional[str] = None) -> Tuple[bool, Dict]:
    try:
        # 实例化客户端
        client = lighthouse_client.LighthouseClient(cred, "ap-hongkong")

        # 生成请求
        req = models.DescribeFirewallRulesRequest()

        # 填充请求参数
        params = {
            "InstanceId": instanceId,
            "Limit": 100
        }
        req.from_json_string(json.dumps(params))

        # 发送请求
        resp = client.DescribeFirewallRules(req)
        resp = json.loads(resp.to_json_string())

        # 筛选
        if protocol is not None:
            resp["FirewallRuleSet"] = list(filter(lambda x: x.get("Protocol") == protocol, resp["FirewallRuleSet"]))
        if port is not None:
            resp["FirewallRuleSet"] = list(filter(lambda x: x.get("Port") == port, resp["FirewallRuleSet"]))
        if source is not None:
            resp["FirewallRuleSet"] = list(filter(lambda x: x.get("CidrBlock") == source, resp["FirewallRuleSet"]))
        if action is not None:
            resp["FirewallRuleSet"] = list(filter(lambda x: x.get("Action") == action, resp["FirewallRuleSet"]))
        if description is not None:
            resp["FirewallRuleSet"] = list(
                filter(lambda x: x.get("FirewallRuleDescription") == description, resp["FirewallRuleSet"]))

        return True, resp
    except TencentCloudSDKException as err:
        return False, {"code": err.code, "message": err.message, "requestId": err.requestId}


# 删除接口和查询接口参数一致
def del_firewall_rule(
        cred: Credential,
        instanceId: str,
        protocol: Optional[str] = None,
        port: Optional[str] = None,
        source: Optional[str] = None,
        action: Optional[str] = None,
        description: Optional[str] = None) -> Tuple[bool, Dict]:
    # 先执行查询
    ok, resp = ls_firewall_rule(cred, instanceId, protocol, port, source, action, description)

    # 查询失败直接返回
    if not ok:
        return ok, resp

    # 若没有匹配到规则
    rules_matched = resp["FirewallRuleSet"]
    if len(rules_matched) == 0:
        return ok, {
            "code": "ok",
            "message": "No rules matched",
            "requestId": resp["RequestId"]
        }

    # 再执行删除
    try:
        # 实例化客户端
        client = lighthouse_client.LighthouseClient(cred, "ap-hongkong")

        # 生成请求
        req = models.DeleteFirewallRulesRequest()

        # 填充请求参数
        params = {
            "InstanceId": instanceId,
            "FirewallRules": resp["FirewallRuleSet"]
        }
        req.from_json_string(json.dumps(params))

        # 发送请求
        resp = client.DeleteFirewallRules(req)

        return True, {"code": "ok", "message": "Deleted {} rules".format(len(rules_matched)), "requestId": resp.RequestId}
    except TencentCloudSDKException as err:
        return False, {"code": err.code, "message": err.message, "requestId": err.requestId}


def format_group_order(parser: argparse.ArgumentParser, items: list):
    """调整组顺序，items数据结构为: [ (组名1,放到哪个索引上), (组名2,放到哪个索引上) ]
    索引从1开始
    """

    for group_name, index in items:
        for _index, group in enumerate(parser._action_groups.copy()):
            if group.title == group_name:
                # 删除组并重新添加
                del parser._action_groups[_index]
                parser._action_groups.insert(index, group)


def format_param_order(parser: argparse.ArgumentParser, items: list):
    """调整参数顺序，items数据结构为: [ (组名1, 参数1, 放到哪个索引上), (组名2, 参数2, 放到哪个索引上) ]"""

    for group_name, option_name, index in items:
        # 先找到组
        for group in parser._action_groups.copy():
            if group.title == group_name:
                # 在组内找到参数
                for _index, action in enumerate(group._group_actions.copy()):
                    if option_name in action.option_strings:
                        # 删除参数,并重新添加
                        del group._group_actions[_index]
                        group._group_actions.insert(index, action)


def format_help_string(parser: argparse.ArgumentParser, items: list):
    '''使用字符串替换的方式调整输出内容'''

    # 将原始的format_help函数备份一下,后面会用到
    parser._original_format_help = parser.format_help

    def wrapper():
        ret = parser._original_format_help()
        for old, new in items:
            ret = ret.replace(old, new)
        return ret

    parser.format_help = wrapper


def main():
    # 根命令和子命令
    parser = argparse.ArgumentParser(usage="%(prog)s Command [options]")
    subparsers = parser.add_subparsers(title="management commands", metavar=None)  # 即使设置为空字符串还会占用一行，如何取消占行?
    addCommand = subparsers.add_parser("add", help="add firewall rule")
    delCommand = subparsers.add_parser("del", help="delete firewall rule")
    lsCommand = subparsers.add_parser("ls", help="query firewall rule")

    # 根命令参数
    parser.add_argument("-v", "--version", default=argparse.SUPPRESS,
                        help="show the version of %(prog)s and exit", action="store_true")
    parser.add_argument("-q", "--quiet", default=argparse.SUPPRESS,
                        help="do not print response messages", action="store_true")

    # 子命令公共参数
    addCommand.add_argument("--secretId",
                            required=True,
                            metavar="Id",
                            help="secret id for tencent cloud lighthouse")
    addCommand.add_argument("--secretKey",
                            required=True,
                            metavar="Key",
                            help="secret key for tencent cloud lighthouse")
    addCommand.add_argument("--instanceId",
                            required=True,
                            metavar="Id",
                            help="instance id for tencent cloud lighthouse")
    delCommand.add_argument("--secretId",
                            required=True,
                            metavar="Id",
                            help="secret id for tencent cloud lighthouse")

    delCommand.add_argument("--secretKey",
                            required=True,
                            metavar="Key",
                            help="secret key for tencent cloud lighthouse")
    delCommand.add_argument("--instanceId",
                            required=True,
                            metavar="Id",
                            help="instance id for tencent cloud lighthouse")

    lsCommand.add_argument("--secretId",
                           required=True,
                           metavar="Id",
                           help="secret id for tencent cloud lighthouse")
    lsCommand.add_argument("--secretKey",
                           required=True,
                           metavar="Key",
                           help="secret key for tencent cloud lighthouse")
    lsCommand.add_argument("--instanceId",
                           required=True,
                           metavar="Id",
                           help="instance id for tencent cloud lighthouse")

    # add子命令
    addCommand.description = "Add firewall rule"
    addCommand.usage = "{} add [options]".format(parser.format_usage().split()[1])

    addCommand.add_argument("--port",
                            required=True,
                            metavar="Port",
                            help="port, port1,port2, port1-port3, ALL")

    addCommand.add_argument("--protocol",
                            default="TCP",
                            metavar="Protocol",
                            choices=["TCP", "UDP", "ICMP", "ALL"],
                            help="TCP, UDP, ICMP, ALL (default: %(default)s)")
    addCommand.add_argument("--source",
                            default="dynamic",
                            metavar="Source",
                            help="subnet or ip (default: %(default)s)")
    addCommand.add_argument("--action",
                            default="ACCEPT",
                            metavar="Action",
                            help="ACCEPT, DROP (default: %(default)s)")
    addCommand.add_argument("--description",
                            default="[Tencent SDK]",
                            metavar="TXT",
                            help="description (default: %(default)s)")
    addCommand.set_defaults(func=add_firewall_rule)

    # del子命令
    delCommand.description = "Delete firewall rule"
    delCommand.usage = "{} del [options]".format(parser.format_usage().split()[1])

    delCommand.add_argument("--port",
                            metavar="Port",
                            help="port, port1,port2, port1-port3, ALL")
    delCommand.add_argument("--protocol",
                            choices=["TCP", "UDP", "ICMP", "ALL"],
                            metavar="Protocol",
                            help="TCP, UDP, ICMP, ALL (default: %(default)s)")
    delCommand.add_argument("--source",
                            metavar="Source",
                            help="subnet or ip (default: %(default)s)")
    delCommand.add_argument("--action",
                            metavar="Action",
                            help="ACCEPT, DROP (default: %(default)s)")
    delCommand.add_argument("--description",
                            metavar="TXT",
                            help="description (default: %(default)s)")
    delCommand.set_defaults(func=del_firewall_rule)

    # ls子命令
    lsCommand.description = "Query firewall rule"
    lsCommand.usage = "{} add [options]".format(parser.format_usage().split()[1])

    lsCommand.add_argument("--port",
                           metavar="Port",
                           help="port, port1,port2, port1-port3, ALL")
    lsCommand.add_argument("--protocol",
                           choices=["TCP", "UDP", "ICMP", "ALL"],
                           metavar="Protocol",
                           help="TCP, UDP, ICMP, ALL (default: %(default)s)")
    lsCommand.add_argument("--source",
                           metavar="Source",
                           help="subnet or ip (default: %(default)s)")
    lsCommand.add_argument("--action",
                           metavar="Action",
                           help="ACCEPT, DROP (default: %(default)s)")
    lsCommand.add_argument("--description",
                           metavar="TXT",
                           help="description (default: %(default)s)")
    lsCommand.set_defaults(func=ls_firewall_rule)

    # 自定义帮助信息,如果有问题这一段可以删除，不影响代码执行
    format_help_string(parser, [
        ("{add,del,ls}\n", "\r"),
        ("  add  ", "add    "),
        ("  del  ", "del    "),
        ("  ls  ", "ls    "),
    ])  # 根命令
    format_param_order(addCommand, [("optional arguments", "--help", 9)])
    format_param_order(delCommand, [("optional arguments", "--help", 9)])
    format_param_order(lsCommand, [("optional arguments", "--help", 9)])

    # 解析参数
    args = parser.parse_args()

    # 未输入任何参数则输出帮助信息
    if len(args.__dict__) <= 0:
        parser.print_help()
        sys.exit(1)

    # 查看版本
    if args.__dict__.get("version"):
        print(__version__)
        sys.exit(0)

    # 静默输出
    quiet = args.__dict__.pop("quiet", False)

    # 解析IPv4
    if args.__dict__.get("source") == "dynamic":
        args.__dict__["source"] = get_internet_ip()

    # 创建认证对象
    cred = Credential(args.__dict__.pop("secretId"), args.__dict__.pop("secretKey"))

    # 执行函数
    ok, msg = args.__dict__.pop("func")(cred=cred, **args.__dict__)

    # 非静默输出(没有指定-q)
    if not quiet:
        print(json.dumps(msg, ensure_ascii=False, indent=4))

    # 退出程序
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
