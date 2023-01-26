# Hyper-V 创建虚拟机 

<br />

## Windows版本

![image-20230112121228126](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230112121228126.png)

<br />

## 启用Hyper-V功能

![image-20230112121428577](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230112121428577.png)

<br />

## 打开Hyper-V管理器

![image-20230112121619832](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230112121619832.png)

<br />

## 内外部网络设置

::: details （1）外部网路设置，相当于 桥接模式，和宿主机在同一网段中

![image-20230112122055640](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230112122055640.png)

![image-20230112122218979](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230112122218979.png)

:::

::: details （2）内部网络设置，相当于 NAT模式，可自定义网段

文档：[https://learn.microsoft.com/zh-cn/virtualization/hyper-v-on-windows/user-guide/setup-nat-network](https://learn.microsoft.com/zh-cn/virtualization/hyper-v-on-windows/user-guide/setup-nat-network)

**1、删除其他的内部网络**

Windows (WinNAT) 仅支持一个内部 NAT 网络，使用管理员权限打开`PowerShell`进行如下查询或删除操作

```powershell
PS C:\Users\Administrator> Get-NetNat
Name                             : MyNATnetwork
ExternalIPInterfaceAddressPrefix :
InternalIPInterfaceAddressPrefix : 192.168.50.0/24
IcmpQueryTimeout                 : 30
TcpEstablishedConnectionTimeout  : 1800
TcpTransientConnectionTimeout    : 120
TcpFilteringBehavior             : AddressDependentFiltering
UdpFilteringBehavior             : AddressDependentFiltering
UdpIdleSessionTimeout            : 120
UdpInboundRefresh                : False
Store                            : Local
Active                           : True

# 如果已存在一个 NAT，请将其删除
PS C:\Users\Administrator> Get-NetNat | Remove-NetNat
```

**2、创建内部交换机**

这里的`NAT`交换机是我已经创建好的内部交换机

![image-20230112122429178](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230112122429178.png)

**3、设置网络共享**

![image-20230112122611723](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230112122611723.png)

**4、配置交换机**

![image-20230112122904442](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230112122904442.png)

**5、关闭Windows所有防火墙 或 配置出入站规则**

若不关闭防火墙或 配置出入站规则，虚拟机和宿主机无法通信，可根据实际情况选做这一步步骤

**6、注意事项**

如果宿主机重启以后发现虚拟机不能上网，可以重新执行3、4步骤试一下，一般能解决

:::

<br />

## 新建一台虚拟机

![image-20230112123437851](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230112123437851.png)

![image-20230112125758965](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230112125758965.png)

后面的步骤很简单就不演示了

<br />



## 命令行管理虚拟机

文档：[https://learn.microsoft.com/zh-cn/virtualization/hyper-v-on-windows/quick-start/try-hyper-v-powershell](https://learn.microsoft.com/zh-cn/virtualization/hyper-v-on-windows/quick-start/try-hyper-v-powershell)

以下`PowerShell`命令命令需要管理员权限执行

::: details （1）返回 Hyper-V 命令列表

```powershell
PS C:\Users\Administrator> Get-Command -Module hyper-v | Out-GridView
```

:::

::: details （2）查看某个命令的帮助文档

```powershell
PS C:\Users\Administrator> Get-Help Get-VM

名称
    Get-VM

摘要
    Gets the virtual machines from one or more Hyper-V hosts.


语法
    Get-VM [[-Name] <String[]>] [-CimSession <CimSession[]>] [-ComputerName <String[]>] [-Credential <PSCredential[]>]
    [<CommonParameters>]

    Get-VM [[-Id] <Guid>] [-CimSession <CimSession[]>] [-ComputerName <String[]>] [-Credential <PSCredential[]>] [<Comm
    onParameters>]

    Get-VM [-ClusterObject] <PSObject> [<CommonParameters>]


说明
    The Get-VM cmdlet gets the virtual machines from one or more Hyper-V hosts.


相关链接

备注
    若要查看示例，请键入: "get-help Get-VM -examples".
    有关详细信息，请键入: "get-help Get-VM -detailed".
    若要获取技术信息，请键入: "get-help Get-VM -full".
```

:::

::: details （3）查看虚拟机列表

```powershell
PS C:\Users\Administrator> Get-VM

Name           State CPUUsage(%) MemoryAssigned(M) Uptime   Status   Version
----           ----- ----------- ----------------- ------   ------   -------
kubeadm-node-1 Off   0           0                 00:00:00 正常运行 9.0
kubeadm-node-2 Off   0           0                 00:00:00 正常运行 9.0
kubeadm-node-3 Off   0           0                 00:00:00 正常运行 9.0
kubeadm-node-4 Off   0           0                 00:00:00 正常运行 9.0
```

:::

::: details （4）启动和关闭虚拟机

```powershell
# 启动单个虚拟机
PS C:\Users\Administrator> Start-VM -Name kubeadm-node-1

# 启动所有已经关闭的虚拟机
PS C:\Users\Administrator> Get-VM | where {$_.State -eq 'Off'} | Start-VM

# 查看虚拟机状态
PS C:\Users\Administrator> Get-VM

Name           State   CPUUsage(%) MemoryAssigned(M) Uptime           Status   Version
----           -----   ----------- ----------------- ------           ------   -------
kubeadm-node-1 Running 1           4096              00:01:35.7520000 正常运行 9.0
kubeadm-node-2 Running 8           4096              00:00:15.5470000 正常运行 9.0
kubeadm-node-3 Running 9           4096              00:00:15.2900000 正常运行 9.0
kubeadm-node-4 Running 8           4096              00:00:13.6820000 正常运行 9.0

# 关闭单个虚拟机
PS C:\Users\Administrator> Stop-VM -Name kubeadm-node-1

# 关闭所有正在运行的虚拟机
PS C:\Users\Administrator> Get-VM | where {$_.State -eq 'Running'} | Stop-VM

# 查看虚拟机状态
PS C:\Users\Administrator> Get-VM

Name           State CPUUsage(%) MemoryAssigned(M) Uptime   Status   Version
----           ----- ----------- ----------------- ------   ------   -------
kubeadm-node-1 Off   0           0                 00:00:00 正常运行 9.0
kubeadm-node-2 Off   0           0                 00:00:00 正常运行 9.0
kubeadm-node-3 Off   0           0                 00:00:00 正常运行 9.0
kubeadm-node-4 Off   0           0                 00:00:00 正常运行 9.0
```

:::

<br />

## 封装命令到脚本中

PowerShell脚本执行策略：[https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_execution_policies](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_execution_policies)

PowerShell通配符说明：[https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_wildcards](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_wildcards)

<br />

**1、在PowerShell中执行PowerShell脚本**

::: details （1）修改执行策略（根据实际情况决定是否修改）

```bash
PS C:\Users\Administrator> Set-ExecutionPolicy -ExecutionPolicy Bypass

执行策略更改
执行策略可帮助你防止执行不信任的脚本。更改执行策略可能会产生安全风险，如 https:/go.microsoft.com/fwlink/?LinkID=135170
中的 about_Execution_Policies 帮助主题所述。是否要更改执行策略?
[Y] 是(Y)  [A] 全是(A)  [N] 否(N)  [L] 全否(L)  [S] 暂停(S)  [?] 帮助 (默认值为“N”): A
```

:::

::: details （2）编写.ps1脚本并放入到环境变量中

`k8s-start.ps1`

```powershell
Get-VM | where {$_.State -eq 'Off'} | where {$_.Name -Like 'kubeadm-node-*'} | Start-VM
Get-VM | where {$_.Name -Like 'kubeadm-node-*'}
```

`k8s-stop.ps1`

```powershell
Get-VM | where {$_.State -eq 'Running'} | where {$_.Name -Like 'kubeadm-node-*'} | Stop-VM
Get-VM | where {$_.Name -Like 'kubeadm-node-*'}
```

:::

::: details （3）执行脚本

```powershell
PS C:\Users\Administrator> k8s-start
Name           State   CPUUsage(%) MemoryAssigned(M) Uptime           Status   Version
----           -----   ----------- ----------------- ------           ------   -------
kubeadm-node-1 Running 2           4096              00:00:02.0810000 正常运行 9.0
kubeadm-node-2 Running 2           4096              00:00:01.9350000 正常运行 9.0
kubeadm-node-3 Running 0           4096              00:00:01.7860000 正常运行 9.0
kubeadm-node-4 Running 0           4096              00:00:01.1080000 正常运行 9.0

PS C:\Users\Administrator> k8s-stop
Name           State CPUUsage(%) MemoryAssigned(M) Uptime   Status   Version
----           ----- ----------- ----------------- ------   ------   -------
kubeadm-node-1 Off   0           0                 00:00:00 正常运行 9.0
kubeadm-node-2 Off   0           0                 00:00:00 正常运行 9.0
kubeadm-node-3 Off   0           0                 00:00:00 正常运行 9.0
kubeadm-node-4 Off   0           0                 00:00:00 正常运行 9.0
```

:::

<br />

**2、在CMD中执行PowerShell脚本**

::: details （1）编写.bat脚本并放入到环境变量中

`k8s-start.bat`

```bash
@echo off
PowerShell -Command "& { Get-VM | where {$_.State -eq 'Off'} | where {$_.Name -Like 'kubeadm-node-*'} | Start-VM }"
PowerShell -Command "& { Get-VM | where {$_.Name -Like 'kubeadm-node-*'} }"
```

`k8s-stop.bat`

```bash
@echo off
PowerShell -Command "& { Get-VM | where {$_.State -eq 'Running'} | where {$_.Name -Like 'kubeadm-node-*'} | Stop-VM }"
PowerShell -Command "& { Get-VM | where {$_.Name -Like 'kubeadm-node-*'} }"
```

:::

::: details （2）执行脚本

```bash
C:\Users\Administrator>k8s-start
Name           State   CPUUsage(%) MemoryAssigned(M) Uptime           Status   Version
----           -----   ----------- ----------------- ------           ------   -------
kubeadm-node-1 Running 2           4096              00:00:02.0810000 正常运行 9.0
kubeadm-node-2 Running 2           4096              00:00:01.9350000 正常运行 9.0
kubeadm-node-3 Running 0           4096              00:00:01.7860000 正常运行 9.0
kubeadm-node-4 Running 0           4096              00:00:01.1080000 正常运行 9.0


C:\Users\Administrator>k8s-stop
Name           State CPUUsage(%) MemoryAssigned(M) Uptime   Status   Version
----           ----- ----------- ----------------- ------   ------   -------
kubeadm-node-1 Off   0           0                 00:00:00 正常运行 9.0
kubeadm-node-2 Off   0           0                 00:00:00 正常运行 9.0
kubeadm-node-3 Off   0           0                 00:00:00 正常运行 9.0
kubeadm-node-4 Off   0           0                 00:00:00 正常运行 9.0
```

:::

<br />

## 解决宿主机重启后网络共享问题

::: details （1）安装PowerShell模块

Github：[https://github.com/loxia01/PSInternetConnectionSharing](https://github.com/loxia01/PSInternetConnectionSharing)

```powershell
# 安装PowerShell模块
PS C:\Users\Administrator> Install-Module -Name PSInternetConnectionSharing
```

:::

::: details （2）编写脚本

`share.bat`

```bash
@echo off
::禁用所有网卡的网络共享，如果有多块网卡共享需要调整这里针对单块网卡禁用
PowerShell -Command "& { Disable-Ics } "

::设置将WLAN 2共享给vEthernet (NAT)
PowerShell -Command "& { Set-Ics -PublicConnectionName 'WLAN 2' -PrivateConnectionName 'vEthernet (NAT)' } "

::重新设置NAT网关地址，下面实际是3条命令
PowerShell -Command "& { $adapter=Get-NetAdapter | where {$_.Name -eq 'vEthernet (NAT)'} ; New-NetIPAddress -IPAddress 192.168.48.1 -PrefixLength 24 -InterfaceIndex $adapter.ifIndex ; Remove-NetIPAddress -IPAddress 192.168.137.1 -PrefixLength 24 -InterfaceIndex $adapter.ifIndex -Confirm:$false }"
```

第三条命令写上注释会报错，在下面记录一下

```bash
::1.获取网卡,主要使用网卡的ifIndex属性
::2.添加一个网关IP，在这里是 192.168.48.1
::3.删除共享网络时自动设置的IP,默认是 192.168.137.1
::4.应该可以使用Set-NetIPAddress直接修改IP，还没有测试，以后再说
```

WLAN 2和vEthernet (NAT)需要根据实际情况修改，下面看一下对应关系：

共享前：

![image-20230126122910062](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230126122910062.png)

共享后：

![image-20230126123037950](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230126123037950.png)

![image-20230126123154491](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230126123154491.png)

:::
