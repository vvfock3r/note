#!/usr/bin/env python
# --*--coding:utf-8--*--

"""
添加或删除防火墙规则，适用于腾讯云轻量应用服务器

SDK文档：https://cloud.tencent.com/document/product/1207/47578
"""

import sys
import json
import argparse
from typing import Optional, Tuple, Union, Dict

import httpx
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
        instanceId: str,
        protocol: str,
        port: Optional[str] = None,
        source: Optional[str] = None,
        action: Optional[str] = None,
        description: Optional[str] = None,
) -> Tuple[bool, Dict]:
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
            "InstanceId": instanceId,
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
        instanceId: str,
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
        params = {"InstanceId": instanceId, "Limit": 100}
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
def del_firewall_rule(
        cred: Credential,
        instanceId: str,
        protocol: str,
        port: Optional[str] = None,
        source: Optional[str] = None,
        action: Optional[str] = None,
        description: Optional[str] = None,
) -> Tuple[bool, Dict]:
    # 先执行查询
    ok, resp = ls_firewall_rule(
        cred, instanceId, protocol, port, source, action, description
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
        params = {"InstanceId": instanceId, "FirewallRules": resp["FirewallRuleSet"]}
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
    def make_command(self):
        self.root_command = argparse.ArgumentParser(
            usage="%(prog)s Command [options]",
            formatter_class=argparse.RawDescriptionHelpFormatter,
            description="""
                add or remove firewall rules for tencent cloud lighthouse
                source: https://github.com/vvfock3r/note/blob/main/scripts/firewall.py
            """,
        )  # 根解析器
        self.subparsers = self.root_command.add_subparsers(
            title="management commands"
        )  # 子命令解析器
        self.add_command = self.subparsers.add_parser("add", help="add firewall rule")
        self.del_command = self.subparsers.add_parser(
            "del", help="delete firewall rule"
        )
        self.ls_command = self.subparsers.add_parser("ls", help="ls firewall rule")

    def root_command_options(self):
        self.root_command.add_argument(
            "-v",
            "--version",
            help="show the version of %(prog)s and exit",
            action="version",
            version=__version__
        )

    def add_command_options(self):
        # 格式化帮助信息/绑定运行函数
        self.add_command.description = "Add firewall rule"
        self.add_command.usage = "{} add [options]".format(
            self.root_command.format_usage().split()[1]
        )
        self.add_command.set_defaults(func=add_firewall_rule)

        # 必须参数的分组
        required_group = self.add_command.add_argument_group("required arguments")
        required_group.add_argument(
            "--secretId",
            required=True,
            metavar="Id",
            help="secret id for tencent cloud lighthouse",
        )
        required_group.add_argument(
            "--secretKey",
            required=True,
            metavar="Key",
            help="secret key for tencent cloud lighthouse",
        )
        required_group.add_argument(
            "--instanceId",
            required=True,
            metavar="Id",
            help="instance id for tencent cloud lighthouse",
        )
        required_group.add_argument(
            "--port",
            required=True,
            metavar="Port",
            help="port, port1,port2, port1-port3, ALL",
        )
        # 可选参数的分组
        self.add_command.add_argument(
            "--protocol",
            default="TCP",
            metavar="Protocol",
            choices=["TCP", "UDP", "ICMP", "ALL"],
            help="TCP, UDP, ICMP, ALL (default: %(default)s)",
        )
        self.add_command.add_argument(
            "--source",
            default="dynamic",
            metavar="Source",
            help="subnet or ip (default: %(default)s)",
        )
        self.add_command.add_argument(
            "--action",
            default="ACCEPT",
            metavar="Action",
            help="ACCEPT, DROP (default: %(default)s)",
        )
        self.add_command.add_argument(
            "--description",
            default="[Created by Tencent SDK]",
            metavar="TXT",
            help="description (default: %(default)s)",
        )
        self.add_command.add_argument(
            "-q", "--quiet", help="do not print response messages", action="store_true"
        )

    def del_command_options(self):
        # 格式化帮助信息/绑定运行函数
        self.del_command.description = "Delete firewall rule"
        self.del_command.usage = "{} del [options]".format(
            self.root_command.format_usage().split()[1]
        )
        self.del_command.set_defaults(func=del_firewall_rule)

        # 必须参数的分组
        required_group = self.del_command.add_argument_group("required arguments")
        required_group.add_argument(
            "--secretId",
            required=True,
            metavar="Id",
            help="secret id for tencent cloud lighthouse",
        )
        required_group.add_argument(
            "--secretKey",
            required=True,
            metavar="Key",
            help="secret key for tencent cloud lighthouse",
        )
        required_group.add_argument(
            "--instanceId",
            required=True,
            metavar="Id",
            help="instance id for tencent cloud lighthouse",
        )

        # 可选参数的分组
        self.del_command.add_argument(
            "--port", metavar="Port", help="port, port1,port2, port1-port3, ALL"
        )
        self.del_command.add_argument(
            "--protocol",
            choices=["TCP", "UDP", "ICMP", "ALL"],
            metavar="Protocol",
            help="TCP, UDP, ICMP, ALL",
        )
        self.del_command.add_argument("--source", metavar="Source", help="subnet or ip")
        self.del_command.add_argument("--action", metavar="Action", help="ACCEPT, DROP")
        self.del_command.add_argument(
            "--description", metavar="TXT", help="description"
        )
        self.del_command.add_argument(
            "-q", "--quiet", action="store_true", help="do not print response messages"
        )

    def ls_command_options(self):
        # 格式化帮助信息/绑定运行函数
        self.ls_command.description = "Query firewall rule"
        self.ls_command.usage = "{} add [options]".format(
            self.root_command.format_usage().split()[1]
        )
        self.ls_command.set_defaults(func=ls_firewall_rule)

        # 必须参数的分组
        required_group = self.ls_command.add_argument_group("required arguments")
        required_group.add_argument(
            "--secretId",
            required=True,
            metavar="Id",
            help="secret id for tencent cloud lighthouse",
        )
        required_group.add_argument(
            "--secretKey",
            required=True,
            metavar="Key",
            help="secret key for tencent cloud lighthouse",
        )
        required_group.add_argument(
            "--instanceId",
            required=True,
            metavar="Id",
            help="instance id for tencent cloud lighthouse",
        )

        # 可选参数的分组
        self.ls_command.add_argument(
            "--port", metavar="Port", help="port, port1,port2, port1-port3, ALL"
        )
        self.ls_command.add_argument(
            "--protocol",
            choices=["TCP", "UDP", "ICMP", "ALL"],
            metavar="Protocol",
            help="TCP, UDP, ICMP, ALL",
        )
        self.ls_command.add_argument("--source", metavar="Source", help="subnet or ip")
        self.ls_command.add_argument("--action", metavar="Action", help="ACCEPT, DROP")
        self.ls_command.add_argument("--description", metavar="TXT", help="description")
        self.ls_command.add_argument(
            "-q", "--quiet", action="store_true", help="do not print response messages"
        )

    def _format_group_order(self, parser: argparse.ArgumentParser, items: list):
        """调整组顺序，items数据结构为: [ (组名1,放到哪个索引上), (组名2,放到哪个索引上) ],索引从1开始"""

        for group_name, index in items:
            for _index, group in enumerate(parser._action_groups.copy()):
                if group.title == group_name:
                    # 删除组并重新添加
                    del parser._action_groups[_index]
                    parser._action_groups.insert(index, group)

    def _format_param_order(self, parser: argparse.ArgumentParser, items: list):
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

    def _format_help_string(self, parser: argparse.ArgumentParser, items: list):
        """使用字符串替换的方式调整输出内容"""

        # 将原始的format_help函数备份一下,后面会用到
        parser._original_format_help = parser.format_help

        def wrapper():
            ret = parser._original_format_help()
            for old, new in items:
                ret = ret.replace(old, new)
            return ret

        parser.format_help = wrapper

    def format_help(self):
        """自定义帮助信息,如果有问题可以在parse函数中注释此函数调用，不影响代码执行"""

        # 根命令
        self._format_help_string(
            self.root_command,
            [
                ("{add,del,ls}\n", "\r"),
                ("  add  ", "add    "),
                ("  del  ", "del    "),
                ("  ls  ", "ls    "),
            ],
        )
        self._format_param_order(
            self.root_command, [("optional arguments", "--help", 1)]
        )
        self._format_group_order(self.root_command, [("optional arguments", 2)])

        description = list(
            map(
                lambda s: s.replace(" ", "", 16),
                self.root_command.description.split("\n"),
            )
        )
        self.root_command.description = "\n".join(description)

        # 子命令-分组顺序调整
        self._format_group_order(self.add_command, [("required arguments", 1)])
        self._format_group_order(self.del_command, [("required arguments", 1)])
        self._format_group_order(self.ls_command, [("required arguments", 1)])

        # 子命令-选项顺序调整
        self._format_param_order(
            self.add_command, [("optional arguments", "--help", 9)]
        )
        self._format_param_order(
            self.del_command, [("optional arguments", "--help", 9)]
        )
        self._format_param_order(self.ls_command, [("optional arguments", "--help", 9)])

    def parse(self):
        # 生成根命令和子命令 / 添加选项或分组现象 / 格式化信息(黑科技)/解析参数
        self.make_command()
        self.root_command_options()
        self.add_command_options()
        self.del_command_options()
        self.ls_command_options()
        self.format_help()
        args = self.root_command.parse_args()

        # 取出并删除函数执行所用不到的参数
        quiet = args.__dict__.pop("quiet", False)  # 静默输出
        func = args.__dict__.pop("func", None)  # 使用self.<command>.set_defaults设置的额外属性

        # 未输入任何参数时输出帮助信息
        if len(args.__dict__) <= 0:
            self.root_command.print_help(file=sys.stdout)
            sys.exit(1)

        # 业务逻辑
        if args.__dict__.get("source") == "dynamic":  # 是否需要动态解析IPv4地址?
            args.__dict__["source"] = get_internet_ip()
        cred = Credential(
            args.__dict__.pop("secretId"), args.__dict__.pop("secretKey")
        )  # 创建认证对象
        ok, msg = func(cred=cred, **args.__dict__)  # 执行函数

        # 是否静默输出?
        if not quiet:
            print(json.dumps(msg, ensure_ascii=False, indent=4))

        # 退出程序
        sys.exit(0 if ok else 1)


if __name__ == "__main__":
    Cli().parse()
