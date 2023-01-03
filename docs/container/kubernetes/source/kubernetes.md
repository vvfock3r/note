# kubernetes 源码

Github：[https://github.com/kubernetes/kubernetes](https://github.com/kubernetes/kubernetes)

<br />

## 准备工作

::: details （1）下载源码

```bash
# 下载代码
C:\Users\Administrator\Desktop> git -c http.proxy="http://127.0.0.1:7890" clone https://github.com/kubernetes/kubernetes.git

# 切换到指定版本
C:\Users\Administrator\Desktop>cd kubernetes
C:\Users\Administrator\Desktop\kubernetes>git checkout v1.25.5
HEAD is now at 804d6167111 Release commit for Kubernetes v1.25.5

# 安装依赖
C:\Users\Administrator\Desktop\kubernetes>go mod tidy
```

:::

::: details （2）解决Windows依赖包问题

**1.`使用Goland`打开项目，打开`go.mod`文件，发现有很多飘红的包**

![image-20230103093642052](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230103093642052.png)

**2.将`kubernetes\vendor\k8s.io`下的文件删掉**

![image-20230103095033293](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230103095033293.png)

**3.将`kubernetes\staging\src\k8s.io`下的所有目录复制到`kubernetes\vendor\k8s.io`，复制完成后如下图**

![image-20230103095434932](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230103095434932.png)

**4.等待Goland索引刷新，再次查看`go.mod`发现没有错误了**

![image-20230103095605988](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230103095605988.png)



:::

<br />

## 本地编译

::: details （1）编译kubectl

```bash
# (1) 先准备一份配置文件，这里从kubernetes集群中拷贝~/.kube/config文件到D盘某个目录中并改名为.kube.config
C:\Users\Administrator\Desktop\kubernetes> set KUBECONFIG=D:/application/kubernetes/.kube.config

# (2) 进入kubectl子项目中
C:\Users\Administrator\Desktop\kubernetes> cd cmd/kubectl

# (3) 使用go run先测试一下
C:\Users\Administrator\Desktop\kubernetes\cmd\kubectl> go run kubectl.go get node
NAME     STATUS     ROLES           AGE   VERSION
node-1   Ready      control-plane   47d   v1.25.4
node-2   Ready      control-plane   47d   v1.25.4
node-3   Ready      control-plane   47d   v1.25.4
node-4   Ready      <none>          47d   v1.25.4

# (4) 编译为当前系统(Windows)的二进制文件，为了使用方便，这里将二进制文件放在D:/tools目录中，它是PATH中的一个目录
C:\Users\Administrator\Desktop\kubernetes\cmd\kubectl> go build -o D:/tools kubectl.go
C:\Users\Administrator\Desktop\kubernetes\cmd\kubectl> kubectl get node
NAME     STATUS     ROLES           AGE   VERSION
node-1   Ready      control-plane   47d   v1.25.4
node-2   Ready      control-plane   47d   v1.25.4
node-3   Ready      control-plane   47d   v1.25.4
node-4   Ready      <none>          47d   v1.25.4

# (5) 将KUBECONFIG加入到环境变量中，避免以后每次启动项目都要重新设置一遍，参考下图
```

![image-20230103140229064](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230103140229064.png)

:::

::: details （2）编译kubectl-convert

```bash
# (1) 默认没有convert子命令
C:\Users\Administrator\Desktop\kubernetes> kubectl convert
error: unknown command "convert" for "kubectl"

# (2) 进入kubectl-convert子项目中
C:\Users\Administrator\Desktop\kubernetes> cd cmd/kubectl-convert

# (3) 编译为当前系统(Windows)的二进制文件，为了使用方便，这里将二进制文件放在D:/tools目录中，它是PATH中的一个目录
C:\Users\Administrator\Desktop\kubernetes\cmd\kubectl-convert> go build -o D:/tools/ kubectl-convert.go

# (4) 测试convert子命令
C:\Users\Administrator\Desktop\kubernetes\cmd\kubectl>kubectl convert 
error: must specify one of -f and -k
Error: exit status 1
```

:::
