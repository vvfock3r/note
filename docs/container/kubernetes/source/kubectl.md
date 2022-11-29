# Kubelet源码

## 准备工作

Github：[https://github.com/kubernetes/kubernetes](https://github.com/kubernetes/kubernetes)

::: details （1）下载kubernetes源码（这里下载的是v1.25.4的zip包）

:::

::: details （2）使用Goland打开项目

**(1) 安装依赖**

```bash
D:\application\GoLand\kubernetes-1.25.4>go mod tidy
```

**（2）等待Goland右下角初始化完成**

**（3）go.mod中发现很多模块有问题**

![image-20221129183043148](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221129183043148.png)

:::

::: details （3）解决模块依赖问题

![image-20221129184137748](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221129184137748.png)

![image-20221129183538932](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221129183538932.png)

检查一下已经没问题了

![image-20221129184704234](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221129184704234.png)

:::

::: details （4）编译执行kubectl命令

```bash
# (1) 进入kubectl命令入口所在目录，如下所示
D:\application\GoLand\kubernetes-1.25.4\cmd\kubectl> 

# (2) 从kubernetes集群~/.kube/config拷贝一份放到当前目录，这里将文件改一下名字为 .kube.config
#     注意修改配置文件中的server地址，确保本机可以连接到kubernetes

# (3) 设置配置文件环境变量
D:\application\GoLand\kubernetes-1.25.4\cmd\kubectl> set KUBECONFIG=./.kube.config

# (4) 编译kubelet并执行测试
D:\application\GoLand\kubernetes-1.25.4\cmd\kubectl>go run kubectl.go get nodes
NAME     STATUS   ROLES           AGE   VERSION
node-1   Ready    control-plane   13d   v1.25.4
node-2   Ready    control-plane   13d   v1.25.4
node-3   Ready    control-plane   13d   v1.25.4
node-4   Ready    <none>          13d   v1.25.4
```

:::

