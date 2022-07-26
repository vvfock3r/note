#!/usr/bin/env python
# --*--coding:utf-8--*--

"""
添加或删除防火墙规则，适用于腾讯云轻量应用服务器

腾讯云轻量应用服务器：https://cloud.tencent.com/document/product/1207/48252
腾讯云云服务器安全组：https://cloud.tencent.com/document/product/215/15804
"""

import sys
import copy
import json
import math
import configparser
from dataclasses import dataclass
from typing import Optional, Dict, NoReturn, Union, List, Tuple, Callable

import httpx
import click
from rich.console import Console
from rich.style import Style
from tencentcloud.common.credential import Credential
from tencentcloud.common.exception.tencent_cloud_sdk_exception import (
    TencentCloudSDKException,
)
from tencentcloud.lighthouse.v20200324 import lighthouse_client, models

__version__ = "v0.0.2"
DEFAULT_CFG = "firewall.ini"


class CommandOptions:
    @staticmethod
    def load_options(options: Union[List, Tuple]):
        def wrapper(func):
            for option in reversed(options):
                func = option(func)
            return func

        return wrapper

    @staticmethod
    def secret_id():
        return click.option("--secret-id", required=True, help="Secret id")

    @staticmethod
    def secret_key():
        return click.option("--secret-key", required=True, help="Secret key")

    @staticmethod
    def instance_id():
        return click.option("--instance-id", required=True, help="Instance id")

    @staticmethod
    def region():
        return click.option("--region", required=True, help="Region, eg: ap-hongkong")

    @staticmethod
    def port():
        return click.option("--port", help="Port, supported, - and ALL")

    @staticmethod
    def protocol(default=None, show_default=None):
        return click.option(
            "--protocol",
            help="TCP, UDP, ICMP, ALL",
            default=default,
            show_default=show_default,
        )

    @staticmethod
    def source(default=None, callback=None, show_default=None):
        return click.option(
            "--source",
            help="CIDR",
            default=default,
            callback=callback,
            show_default=show_default,
        )

    @staticmethod
    def action(default=None, show_default=None):
        return click.option(
            "--action",
            type=click.Choice(["ACCEPT", "DROP"]),
            default=default,
            help="Action",
            show_default=show_default,
        )

    @staticmethod
    def description(default=None, show_default=None):
        return click.option(
            "--description",
            help="Description",
            default=default,
            show_default=show_default,
        )

    @staticmethod
    def config(default, callback, help):
        return click.option(
            "--c",
            "--config",
            type=click.Path(dir_okay=False),
            default=default,
            show_default=True,
            callback=callback,
            is_eager=True,
            expose_value=False,
            help=help,
        )

    @staticmethod
    def quiet():
        return click.option(
            "-q",
            "--quiet",
            help="Do not print response messages",
            is_flag=True,
            default=False,
        )

    @staticmethod
    def version(callback):
        return click.option(
            "-v",
            "--version",
            is_flag=True,
            expose_value=False,
            callback=callback,
            help="Show the version and exit",
        )


class CommandCallback:
    @staticmethod
    def load_config(ctx, param, filename) -> None:
        """读取配置文件"""
        cfg = configparser.ConfigParser()
        cfg.read(filename)
        try:
            options = dict(cfg["default"])
        except KeyError:
            options = {}
        ctx.default_map = options

    @staticmethod
    def print_version(ctx, param, value) -> NoReturn:
        if not value or ctx.resilient_parsing:
            return
        click.echo(__version__)
        ctx.exit()

    @staticmethod
    def get_current_ip(ctx, param, value) -> Union[str, None]:
        """获取当前外网出口IP"""
        if value == "CurrentIP":
            urls = ["https://api-ipv4.ip.sb/ip"]
            headers = {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36"
            }
            for url in urls:
                for i in range(3):
                    try:
                        r = httpx.get(url, headers=headers, timeout=10)
                        if r.status_code == 200:
                            return r.text.strip("\n")
                    except Exception:
                        continue
        return value


class CommandGroup:
    # 主组
    @staticmethod
    @click.group(context_settings=dict(help_option_names=["-h", "--help"]))
    @CommandOptions.load_options([CommandOptions.version(callback=CommandCallback.print_version)])
    def cli() -> None:
        """
        \b
        Add or remove firewall rules for tencent cloud cvm and lighthouse
        Source code: https://github.com/vvfock3r/note/blob/main/scripts/firewall.py
        """
        pass

    # 子组
    @staticmethod
    @click.group()
    def lighthouse() -> None:
        """
        \b
        Add or remove firewall rules for tencent cloud lighthouse
        """
        pass

    # 子组
    @staticmethod
    @click.group()
    def cvm() -> None:
        """
        \b
        Add or remove firewall rules for tencent cloud cvm
        """
        pass


@dataclass
class LightHouseFirewallInstance:
    id: str
    region: str


@dataclass
class LightHouseFirewallRule:
    protocol: Optional[str] = None
    port: Optional[str] = None
    source: Optional[str] = None
    action: Optional[str] = None
    description: Optional[str] = None


class LightHouseFirewallFunc:
    @staticmethod
    def ls(cred: Credential, instance: LightHouseFirewallInstance, rule: LightHouseFirewallRule) -> Dict:
        """函数已自动实现分页功能，可获取所有条目"""

        def request(offset: int, limit: int) -> Dict:
            """单次请求"""
            for i in range(3):
                try:
                    # 实例化客户端
                    client = lighthouse_client.LighthouseClient(cred, instance.region)

                    # 生成请求
                    req = models.DescribeFirewallRulesRequest()

                    # 填充请求参数
                    params = {"InstanceId": instance.id, "Offset": offset, "Limit": limit}
                    req.from_json_string(json.dumps(params))

                    # 发送请求
                    resp = client.DescribeFirewallRules(req)
                    resp = json.loads(resp.to_json_string())

                    # SDK不提供筛选功能，所以自己做
                    if rule.protocol is not None:
                        resp["FirewallRuleSet"] = list(
                            filter(
                                lambda x: x.get("Protocol") == rule.protocol,
                                resp["FirewallRuleSet"],
                            )
                        )
                    if rule.port is not None:
                        resp["FirewallRuleSet"] = list(
                            filter(lambda x: x.get("Port") == rule.port, resp["FirewallRuleSet"])
                        )
                    if rule.source is not None:
                        resp["FirewallRuleSet"] = list(
                            filter(
                                lambda x: x.get("CidrBlock") == rule.source,
                                resp["FirewallRuleSet"],
                            )
                        )
                    if rule.action is not None:
                        resp["FirewallRuleSet"] = list(
                            filter(
                                lambda x: x.get("Action") == rule.action,
                                resp["FirewallRuleSet"],
                            )
                        )
                    if rule.description is not None:
                        resp["FirewallRuleSet"] = list(
                            filter(
                                lambda x: x.get("FirewallRuleDescription") == rule.description,
                                resp["FirewallRuleSet"],
                            )
                        )
                    resp.update({"code": "ok"})
                    return resp
                except TencentCloudSDKException as err:
                    if i == 2:
                        return {
                            "code": err.code,
                            "message": err.message,
                            "requestId": err.requestId,
                        }

        # 定义初始变量
        offset = 0
        limit = 100  # 要求 <=100
        rules = []

        # 先发一次请求
        resp = request(offset=offset, limit=limit)
        if resp.get("code") != "ok":
            return resp

        # 无需分页则直接返回
        total = resp.get("TotalCount", 0)
        if total <= limit:
            return resp

        # 合并第一分页
        rules.extend(resp["FirewallRuleSet"])

        # 分页
        page_number = math.ceil(total / limit)
        for i in range(1, page_number + 1):
            resp = request(offset=i * limit, limit=limit)
            if resp.get("code") != "ok":
                return resp
            rules.extend(resp["FirewallRuleSet"])

        resp["FirewallRuleSet"] = rules
        return resp

    @staticmethod
    def add(cred: Credential, instance: LightHouseFirewallInstance, rule: LightHouseFirewallRule) -> Dict:
        # 先执行查询,description不计数
        rule2 = copy.deepcopy(rule)
        rule2.description = None
        resp = LightHouseFirewallFunc.ls(cred, instance, rule2)

        # 查询失败直接返回
        if resp.get("code") != "ok":
            return resp

        # 如果规则已经存在直接返回
        rules_matched = resp["FirewallRuleSet"]
        if len(rules_matched) >= 1:
            return {
                "code": "ok",
                "message": "防火墙规则 `[('{protocol}', '{port}', '{source}', '{action}')]` 已经存在。".format(
                    protocol=rule.protocol,
                    port=rule.port,
                    source=rule.source,
                    action=rule.action,
                ),
                "requestId": resp["RequestId"],
            }

        # 添加规则
        try:
            # 实例化客户端
            client = lighthouse_client.LighthouseClient(cred, instance.region)

            # 生成请求
            req = models.CreateFirewallRulesRequest()

            # 填充请求参数
            params = {
                "InstanceId": instance.id,
                "FirewallRules": [
                    {
                        "Protocol": rule.protocol,
                        "Port": rule.port,
                        "CidrBlock": rule.source,
                        "Action": rule.action,
                        "FirewallRuleDescription": rule.description,
                    }
                ],
            }
            req.from_json_string(json.dumps(params))

            # 发送请求
            resp = client.CreateFirewallRules(req)

            return {
                "code": "ok",
                "message": "Add 1 rules",
                "requestId": resp.RequestId,
            }
        except TencentCloudSDKException as err:
            return {
                "code": err.code,
                "message": err.message,
                "requestId": err.requestId,
            }

    @staticmethod
    def remove(cred: Credential, instance: LightHouseFirewallInstance, rule: LightHouseFirewallRule) -> Dict:
        # 先执行查询
        resp = LightHouseFirewallFunc.ls(cred, instance, rule)

        # 查询失败直接返回
        if resp.get("code") != "ok":
            return resp

        # 若没有匹配到规则
        rules_matched = resp["FirewallRuleSet"]
        if len(rules_matched) == 0:
            return {
                "code": "ok",
                "message": "No rules matched",
                "requestId": resp["RequestId"],
            }

        # 再执行删除
        try:
            # 实例化客户端
            client = lighthouse_client.LighthouseClient(cred, instance.region)

            # 生成请求
            req = models.DeleteFirewallRulesRequest()

            # 填充请求参数
            params = {
                "InstanceId": instance.id,
                "FirewallRules": resp["FirewallRuleSet"],
            }
            req.from_json_string(json.dumps(params))

            # 发送请求
            resp = client.DeleteFirewallRules(req)

            return {
                "code": "ok",
                "message": "Deleted {} rules".format(len(rules_matched)),
                "requestId": resp.RequestId,
            }
        except TencentCloudSDKException as err:
            return {
                "code": err.code,
                "message": err.message,
                "requestId": err.requestId,
            }


class LightHouseFirewallCommand:
    DEFAULT_OPTIONS = [
        CommandOptions.secret_id(),
        CommandOptions.secret_key(),
        CommandOptions.instance_id(),
        CommandOptions.region(),
        CommandOptions.port(),
        CommandOptions.protocol(),
        CommandOptions.source(callback=CommandCallback.get_current_ip),
        CommandOptions.action(),
        CommandOptions.description(),
        CommandOptions.config(
            default=DEFAULT_CFG,
            callback=CommandCallback.load_config,
            help="Read option defaults from the specified INI file",
        ),
        CommandOptions.quiet(),
        CommandOptions.version(callback=CommandCallback.print_version),
    ]

    # 业务执行流程，核心函数
    @staticmethod
    def do(func: Callable, params: Dict, callback: Callable[[Dict], Dict] = None) -> NoReturn:
        """lighthouse 真正的运行逻辑

        :param func: 要执行的函数
        :param params: func的参数
        :param callback: 输出前的回调函数
        """

        # 实例化认证对象
        params["cred"] = Credential(secret_id=params.pop("secret_id"), secret_key=params.pop("secret_key"))

        # 实例化Instance对象
        params["instance"] = LightHouseFirewallInstance(id=params.pop("instance_id"), region=params.pop("region"))

        # 实例化防火墙规则对象
        rule = LightHouseFirewallRule(
            protocol=params.pop("protocol"),
            port=params.pop("port"),
            source=params.pop("source"),
            action=params.pop("action"),
            description=params.pop("description"),
        )
        params["rule"] = rule

        # 删除不能直接传递给函数的key
        quiet = params.pop("quiet")

        # 查询/添加/删除防火墙规则
        resp = func(**params)

        # 获取退出码
        code = 0 if resp.get("code") == "ok" else 1

        # 输出前的回调函数
        if callback:
            resp = callback(resp)

        # 非静默模式
        if not quiet:
            console = Console(highlight=False)
            color_map = {0: "green", 1: "red"}
            console.print(json.dumps(resp, indent=4, ensure_ascii=False), style=Style(color=color_map[code]))

        # 退出程序
        sys.exit(code)

    # 子命令
    @staticmethod
    @click.command()
    @CommandOptions.load_options(DEFAULT_OPTIONS)
    def ls(**params) -> None:
        """query firewall rule for tencent cloud lighthouse"""

        def delete_code(resp: Dict):
            """若能正确返回则删除code"""
            if resp.get("code") == "ok":
                resp.pop("code")
            return resp

        LightHouseFirewallCommand.do(LightHouseFirewallFunc.ls, params, callback=delete_code)

    # 子命令
    @staticmethod
    @click.command()
    @CommandOptions.load_options(
        [
            *DEFAULT_OPTIONS[:5],
            CommandOptions.protocol(default="TCP", show_default=True),
            CommandOptions.source(default="CurrentIP", callback=CommandCallback.get_current_ip, show_default=True),
            CommandOptions.action(default="ACCEPT", show_default=True),
            CommandOptions.description(default="[Created by Tencent SDK]", show_default=True),
            *DEFAULT_OPTIONS[9:],
        ]
    )
    def add(**params) -> None:
        """add firewall rule for tencent cloud lighthouse"""
        LightHouseFirewallCommand.do(LightHouseFirewallFunc.add, params)

    # 子命令
    @staticmethod
    @click.command()
    @CommandOptions.load_options(DEFAULT_OPTIONS)
    def remove(**params) -> None:
        """remove firewall rule for tencent cloud lighthouse"""
        LightHouseFirewallCommand.do(LightHouseFirewallFunc.remove, params)


def main():
    # 主组内添加两个子组(子命令)
    CommandGroup.cli.add_command(CommandGroup.lighthouse)
    CommandGroup.cli.add_command(CommandGroup.cvm)

    # lighthouse添加子命令
    CommandGroup.lighthouse.add_command(LightHouseFirewallCommand.ls)
    CommandGroup.lighthouse.add_command(LightHouseFirewallCommand.add)
    CommandGroup.lighthouse.add_command(LightHouseFirewallCommand.remove)

    # 解析CLI
    CommandGroup.cli()


if __name__ == "__main__":
    main()
