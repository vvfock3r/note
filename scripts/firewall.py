#!/usr/bin/env python
# --*--coding:utf-8--*--

"""
添加或删除防火墙规则，适用于腾讯云轻量应用服务器

腾讯云轻量应用服务器：https://cloud.tencent.com/document/product/1207/47578
腾讯云云服务器安全组：https://cloud.tencent.com/document/product/215/15804
"""

import copy
import sys
import json
import configparser
from typing import Optional, Tuple, Union, Dict

import httpx
import click
from tencentcloud.common.credential import Credential
from tencentcloud.common.exception.tencent_cloud_sdk_exception import (
    TencentCloudSDKException,
)
from tencentcloud.lighthouse.v20200324 import lighthouse_client, models

__version__ = "v0.0.1"


class Instance:
    def __init__(self, id: str, region: str):
        self.id = id
        self.region = region


class LightHouseFirewallRule:
    def __init__(
            self,
            protocol: Optional[str] = None,
            port: Optional[str] = None,
            source: Optional[str] = None,
            action: Optional[str] = None,
            description: Optional[str] = None,
    ):
        self.protocol = protocol
        self.port = port
        self.source = source
        self.action = action
        self.description = description


def lighthouse_ls_firewall_rule(cred: Credential, instance: Instance, rule: LightHouseFirewallRule) -> Tuple[bool, Dict]:
    """注意：只能查看100条规则，本函数没有实现分页功能"""
    try:
        # 实例化客户端
        client = lighthouse_client.LighthouseClient(cred, instance.region)

        # 生成请求
        req = models.DescribeFirewallRulesRequest()

        # 填充请求参数
        params = {"InstanceId": instance.id, "Limit": 100}
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
            resp["FirewallRuleSet"] = list(filter(lambda x: x.get("Port") == rule.port, resp["FirewallRuleSet"]))
        if rule.source is not None:
            resp["FirewallRuleSet"] = list(filter(lambda x: x.get("CidrBlock") == rule.source, resp["FirewallRuleSet"]))
        if rule.action is not None:
            resp["FirewallRuleSet"] = list(filter(lambda x: x.get("Action") == rule.action, resp["FirewallRuleSet"]))
        if rule.description is not None:
            resp["FirewallRuleSet"] = list(
                filter(
                    lambda x: x.get("FirewallRuleDescription") == rule.description,
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


def lighthouse_add_firewall_rule(cred: Credential, instance: Instance, rule: LightHouseFirewallRule) -> Tuple[bool, Dict]:
    # 先执行查询,description不计数
    rule2 = copy.deepcopy(rule)
    rule2.description = None
    ok, resp = lighthouse_ls_firewall_rule(cred, instance, rule2)

    # 查询失败直接返回
    if not ok:
        return ok, resp

    # 如果规则已经存在直接返回
    rules_matched = resp["FirewallRuleSet"]
    if len(rules_matched) >= 1:
        return True, {
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


def lighthouse_remove_firewall_rule(cred: Credential, instance: Instance, rule: LightHouseFirewallRule) -> Tuple[bool, Dict]:
    # 先执行查询
    ok, resp = lighthouse_ls_firewall_rule(cred, instance, rule)

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
        client = lighthouse_client.LighthouseClient(cred, instance.region)

        # 生成请求
        req = models.DeleteFirewallRulesRequest()

        # 填充请求参数
        params = {"InstanceId": instance.id, "FirewallRules": resp["FirewallRuleSet"]}
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


class Options:
    @staticmethod
    def load_options(*options):
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
    def protocol(default=None):
        return click.option("--protocol", help="TCP, UDP, ICMP, ALL", default=default)

    @staticmethod
    def source(default=None, callback=None):
        return click.option("--source", help="CIDR", default=default, callback=callback)

    @staticmethod
    def action(default=None):
        return click.option("--action", type=click.Choice(["ACCEPT", "DROP"]), default=default, help="Action")

    @staticmethod
    def description(default=None):
        return click.option("--description", help="Description", default=default)

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


class Cli:
    # 选项的回调函数
    @staticmethod
    def load_config(ctx, param, filename):
        """读取配置文件"""
        cfg = configparser.ConfigParser()
        cfg.read(filename)
        try:
            options = dict(cfg["default"])
        except KeyError:
            options = {}
        ctx.default_map = options

    @staticmethod
    def print_version(ctx, param, value):
        if not value or ctx.resilient_parsing:
            return
        click.echo(__version__)
        ctx.exit()

    @staticmethod
    def get_current_ip(ctx, param, value) -> Union[str, None]:
        """获取当前外网出口IP"""

        if value == "current ip":
            urls = ["https://api-ipv4.ip.sb/ip"]
            headers = {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36"}
            for url in urls:
                for i in range(3):
                    r = httpx.get(url, headers=headers, timeout=10)
                    if r.status_code == 200:
                        return r.text.strip("\n")

    # 默认配置文件和默认选项
    DEFAULT_CFG = "firewall.ini"
    DEFAULT_OPTIONS = [
        Options.secret_id(),
        Options.secret_key(),
        Options.instance_id(),
        Options.region(),
        Options.port(),
        Options.protocol(),
        Options.source(callback=get_current_ip),
        Options.action(),
        Options.description(),
        Options.config(default=DEFAULT_CFG, callback=load_config, help="Read option defaults from the specified INI file"),
        Options.quiet(),
        Options.version(print_version),
    ]

    # 业务执行流程，核心函数
    @staticmethod
    def do(func, kwargs) -> None:
        """真正的运行逻辑"""

        # 实例化认证对象
        kwargs["cred"] = Credential(secret_id=kwargs.pop("secret_id"), secret_key=kwargs.pop("secret_key"))

        # 实例化Instance对象
        kwargs["instance"] = Instance(id=kwargs.pop("instance_id"), region=kwargs.pop("region"))

        # 实例化防火墙规则对象
        # if kwargs["source"] == "current ip":
        #     kwargs["source"] = Cli.get_current_ip()
        rule = LightHouseFirewallRule(
            protocol=kwargs.pop("protocol"),
            port=kwargs.pop("port"),
            source=kwargs.pop("source"),
            action=kwargs.pop("action"),
            description=kwargs.pop("description"),
        )
        kwargs["rule"] = rule

        # 删除不能直接传递给函数的key
        quiet = kwargs.pop("quiet")

        # 查询/添加/删除防火墙规则
        ok, msg = func(**kwargs)

        # 静默输出
        if not quiet:
            print(json.dumps(msg, ensure_ascii=False, indent=4))

        # 退出程序
        sys.exit(0 if ok else 1)

    # 根命令
    @click.group(context_settings=dict(help_option_names=["-h", "--help"]))
    @Options.load_options(Options.version(print_version))
    @staticmethod
    def parser():
        """
        \b
        Add or remove firewall rules for tencent cloud lighthouse
        Source code: https://github.com/vvfock3r/note/blob/main/scripts/firewall.py
        """
        pass

    # 子命令
    @staticmethod
    @parser.command()
    @Options.load_options(*DEFAULT_OPTIONS)
    def ls(**kwargs):
        """query firewall rule for tencent cloud lighthouse"""
        Cli.do(lighthouse_ls_firewall_rule, kwargs)

    # 子命令
    @staticmethod
    @parser.command()
    @Options.load_options(
        *DEFAULT_OPTIONS[:5],
        Options.protocol(default="TCP"),
        Options.source(default="current ip", callback=get_current_ip),
        Options.action(default="ACCEPT"),
        Options.description(default="[Created by Tencent SDK]"),
        *DEFAULT_OPTIONS[9:],
    )
    def add(**kwargs):
        """add firewall rule for tencent cloud lighthouse"""
        Cli.do(lighthouse_add_firewall_rule, kwargs)

    # 子命令
    @staticmethod
    @parser.command()
    @Options.load_options(*DEFAULT_OPTIONS)
    def remove(**kwargs):
        """remove firewall rule for tencent cloud lighthouse"""
        Cli.do(lighthouse_remove_firewall_rule, kwargs)


if __name__ == "__main__":
    Cli().parser()
