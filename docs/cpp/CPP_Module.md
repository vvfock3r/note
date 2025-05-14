# C++ Module

## random

`<random>` 的结构大致可以分为三类：

* 随机数引擎
* 分布器
* 种子源/工具

::: details （1）随机数示例

```c++
#include <iostream>
#include <random>
#include <chrono>

// 随机数平台推荐 mt19937

int main() {
    // 初始化随机数种子, 固定种子, 结果固定
    // std::mt19937 prng(42);

    // 初始化随机数种子, 运行时变化
    std::mt19937 prng(std::chrono::steady_clock::now().time_since_epoch().count());

    /*
     *  prng 是一个变量, 代表的是 mt19937实例对象
    */

    // 定义一个均匀分布器，生成 1 到 100 之间的整数, 注意是包含1和100的
    std::uniform_int_distribution<int> int_dist(1, 100);

    // 生成并输出一个随机整数: 分布器(随机数引擎)
    int number = int_dist(prng);
    std::cout << number << std::endl;

    // 生成多个随机数
    for (int i = 0; i < 9; ++i) {
        int n = int_dist(prng);
        std::cout << n << std::endl;
    }
}
```

输出结果

```bash
96
20
26
33
47
9
7
25
98
38
```

:::

::: details （2）正态分布：随机距离均值越远概率越小

![image-20250510135846538](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20250510135846538.png)

```c++
#include <iostream>
#include <random>
#include <chrono>

int main() {
    // 初始化随机数种子, 运行时变化
    std::mt19937 prng(std::chrono::steady_clock::now().time_since_epoch().count());

    /* 正态分布: 下面的代码是 均值为0，标准差为1的正态分布随机数
     * 关于范围
     *      正态分布是一个连续概率分布，其理论上没有固定的范围，因为它的值可以是任何实数（从负无穷到正无穷）
     *      然而，绝大多数的样本将会集中在均值附近，且随着距离均值的增大，生成的随机数的概率会迅速减少
     *      在实际应用中，通常可以使用68-95-99.7规则来估计正态分布的范围
     *          68%的样本会落在均值±1倍标准差范围内（即 -1 到 +1）
     *          95%的样本会落在均值±2倍标准差范围内（即 -2 到 +2
     *          99.7%的样本会落在均值±3倍标准差范围内（即 -3 到 +3）
     *          对于 normal_dist(0.0, 1.0)，大部分生成的随机数会位于 -3 到 +3 之间，但仍然有可能生成更远离均值的数值
    */
    std::normal_distribution<double> normal_dist(0.0, 1.0);


    // 生成多个随机数
    for (int i = 0; i < 9; ++i) {
        double n = normal_dist(prng);
        std::cout << n << std::endl;
    }
}
```

输出结果

```bash
0.720939
0.142195
0.0793346
-0.0617685
0.92558
0.7241
-1.08853
1.81012
0.502112
```

:::

::: details （3）伯努利分布：真假概率

```c++
#include <iostream>
#include <random>
#include <chrono>

int main() {
    // 初始化随机数种子, 运行时变化
    std::mt19937 prng(std::chrono::steady_clock::now().time_since_epoch().count());

    /* 伯努利分布: 生成二元值（0 或 1），模拟成功或失败事件的概率，适用于简单的二项式实验
     * 返回的布尔类型 ture 和 false
     * 下面的代码意思是: 1 的出现概率为 10%，0 的出现概率为 90%
     * 总结一下: 为真的概率是10%, false的概率为90%
    */
    std::bernoulli_distribution bernoulli_dist(0.1);


    // 生成多个随机数
    for (int i = 0; i < 9; ++i) {
        bool ok = bernoulli_dist(prng);
        std::cout << ok << std::endl;
    }
}
```

输出结果

```bash
0
0
0
0
0
0
1
0
0
```

:::

::: details （4）离散概率分布：每个元素有自己的权重

```c++
#include <iostream>
#include <random>
#include <chrono>

int main() {
    // 初始化随机数种子, 运行时变化
    std::mt19937 prng(std::chrono::steady_clock::now().time_since_epoch().count());

    /* 离散概率分布: 根据用户提供的每个元素的权重, 筛选出一个值(数字)
     * {70, 20, 10} 代表的意思是:
     *      第一个值的权重是 70,
     *      第二个值的权重是 20,
     *      第三个值的权重是 10,
     * 为了方便计算, 我们约定所有权重加起来是100, 方便计算
     * 返回的值是列表的索引(整数), 代表哪个权重被命中了
    */
    std::discrete_distribution<int> discrete_dist({70, 20, 10});

    // 自定义值, 对应上面的权限
    std::vector<int> values = {100, 200, 300};

    // 生成多个随机数
    for (int i = 0; i < 9; ++i) {
        int n = discrete_dist(prng);
        std::cout << n << " => " << values[n] << std::endl;
    }
}
```

输出结果

```bash
1 => 200
2 => 300
0 => 100
1 => 200
0 => 100
0 => 100
0 => 100
0 => 100
0 => 100
```

:::

::: details （5）指数分布：用于模拟事件发生的时间间隔的概率分布，短间隔常见，长间隔罕见

备注：这个到底有啥优势？

```c++
#include <iostream>
#include <random>
#include <chrono>

int main() {
    // 初始化随机数种子, 运行时变化
    std::mt19937 prng(std::chrono::steady_clock::now().time_since_epoch().count());

    /* 指数分布
     * 基础解释
     *      λ = 1, 代表的是速率，指的是单位时间内平均发生1次事件, 单位时间可以自由设定它的含义, 比如 1秒、1分钟、1小时等
     *      返回值代表多少个单位时间
     * 核心思想
     *      下一个事件会在多久之后发生, 广泛用于模拟两个事件之间的等待时间
     * 数值大小
     *      λ 越大，行为越频繁
     *      指数分布生成的值总是非负的
     *      λ参数必须为正数
     *      样本量越大，统计结果越接近理论值
    */
    std::exponential_distribution<double> exp_dist(1);

    // 生成多个随机数
    for (int i = 0; i < 9; ++i) {
        double n = exp_dist(prng);
        std::cout << n << std::endl;
    }
}
```

输出结果

```bash
0.255131
2.43
0.945206
0.578676
0.362824
0.747569
3.97356
2.45116
0.142744
```

:::

::: details （6）卡方分布：应用：检验骰子是否作弊

```c++
#include <iostream>
#include <random>
#include <vector>
#include <cmath>

// 模拟投掷骰子（n次，返回各点数出现次数）
std::vector<int> rollDice(int n, bool isCheat) {
    std::mt19937 gen(std::random_device{}());
    std::discrete_distribution<> dist;
    if (isCheat) {
        // 作弊骰子：点数6的概率是其他的两倍
        std::vector<double> weights{1, 1, 1, 1, 1, 2};
        dist = std::discrete_distribution<>(weights.begin(), weights.end());
    } else {
        // 公平骰子
        dist = std::discrete_distribution<>({1, 1, 1, 1, 1, 1});
    }

    std::vector<int> counts(6, 0);
    for (int i = 0; i < n; ++i) counts[dist(gen)]++;
    return counts;
}

// 卡方检验（返回卡方统计量）
double chiSquareTest(const std::vector<int> &observed) {
    double expected = std::accumulate(observed.begin(), observed.end(), 0.0) / observed.size();
    double chi2 = 0.0;
    for (int obs: observed) {
        chi2 += std::pow(obs - expected, 2) / expected;
    }
    return chi2;
}

int main() {
    // 模拟公平骰子和作弊骰子各600次
    auto fair_counts = rollDice(600, false);
    auto cheat_counts = rollDice(600, true);

    // 计算卡方值
    double fair_chi2 = chiSquareTest(fair_counts);
    double cheat_chi2 = chiSquareTest(cheat_counts);

    std::cout << "公平骰子的卡方值: " << fair_chi2 << "（应接近0）\n";
    std::cout << "作弊骰子的卡方值: " << cheat_chi2 << "（应明显偏大）\n";

    // 查卡方分布表（自由度=5，显著性0.05的临界值≈11.07）
    if (cheat_chi2 > 11.07) {
        std::cout << "检测到作弊！\n";
    } else {
        std::cout << "未检测到作弊。\n";
    }
    return 0;
}
```

输出结果

```bash
公平骰子的卡方值: 1.34（应接近0）
作弊骰子的卡方值: 55.12（应明显偏大）
检测到作弊！
```

:::

学生 t 分布

F 分布

魏布尔分布

<br />

## chrono

::: details （1）获取时间戳

```c++
#include <iostream>
#include <chrono>

int main() {
    // 获取当前时间点(使用的是系统时钟), now是一个time_point类型, 不能直接打印
    // 注意: now 是UTC时间, 还要+8小时才是北京时间
    auto now = std::chrono::system_clock::now();

    // 获取秒级时间戳
    auto timestamp_s = std::chrono::duration_cast<std::chrono::seconds>(now.time_since_epoch()).count();
    std::cout << "秒级别时间戳: " << timestamp_s << std::endl;

    // 获取毫秒级时间戳
    auto timestamp_m = std::chrono::duration_cast<std::chrono::milliseconds>(now.time_since_epoch()).count();
    std::cout << "毫秒级时间戳: " << timestamp_m << std::endl;

    /* 1.now.time_since_epoch()
     * 返回的是   std::chrono::duration 对象, 代表自1970-01-01 00:00:00 到现在的时间间隔
     * 准确的说是 std::chrono::duration<long long, std::nano>, 纳秒
     *
     * 2.std::chrono::duration_cast
     * 用于转换对象到指定格式
     *
     * 3.count() 用于获取他的整数值
     */

    return 0;
}
```

输出结果

```bash
秒级别时间戳: 1747231926
毫秒级时间戳: 1747231926657
```

:::

::: details （2）格式化输出

```c++
#include <iostream>
#include <chrono>
#include <ctime>

int main() {
    // 获取当前时间点(使用的是系统时钟), now是一个time_point类型, 不能直接打印
    // 注意: now 是UTC时间, 还要+8小时才是北京时间
    auto now = std::chrono::system_clock::now();

    // 直接输出, 注意写法 {:Ymd...}
    // 因为是UTC时间, 所以与当前时间并不一致
    std::cout << std::format("{:%Y-%m-%d %H:%M:%S}", now) << std::endl;

    // --------------------------处理时区问题------------------------------------------------------
    // 将 time_point 转为 time_t 对象, 注意 time_t 对象只精确到秒, 所以会丢失毫秒部分
    std::time_t time_now = std::chrono::system_clock::to_time_t(now);

    // 将 time_t对象 转为本地时间（考虑时区）
    std::tm *local_tm = std::localtime(&time_now);

    // 格式化输出(毫秒丢失)
    std::cout << std::put_time(local_tm, "%Y-%m-%d %H:%M:%S") << std::endl;

    // --------------------------解决毫秒问题------------------------------------------------------
    auto timestamp_s = std::chrono::duration_cast<std::chrono::seconds>(now.time_since_epoch()).count();
    auto timestamp_m = std::chrono::duration_cast<std::chrono::milliseconds>(now.time_since_epoch()).count();
    int ms_part = static_cast<int>(timestamp_m - timestamp_s * 1000);  // 获取毫秒部分

    std::cout << std::put_time(local_tm, "%Y-%m-%d %H:%M:%S");
    std::cout << '.' << std::setfill('0') << std::setw(3) << ms_part << std::endl;

    return 0;
}
```

输出结果

```bash
2025-05-14 14:51:21.967651900
2025-05-14 22:51:21
2025-05-14 22:51:21.967
```

:::

::: details （3）time_point 和 time_t 对象

`std::chrono::time_point` 和 `std::time_t` 都是表示时间点的类型，但它们在设计上有所不同，属于不同的时间库和时间表示方式

**1、所属模块不同**

* `std::chrono::time_point` 属于`std::chrono` 模块
* `std::time_t` 属于 `ctime`模块

**2、精度不同**

* `std::chrono::time_point` 精度为纳秒
* `std::time_t` 精度为秒

**3、互相转换**

```c++

```

:::

::: details （4）格式化输出2

```c++
#include <iostream>
#include <chrono>
#include <format>

int main() {
    // 获取当前时间
    auto utc_now = std::chrono::system_clock::now();

    // 获取上海时区
    auto local_zone = std::chrono::locate_zone("Asia/Shanghai");

    // 构造 zoned_time: 指定时区 + 时间点
    // 等价于 std::chrono::zoned_time zt = std::chrono::zoned_time(local_zone, utc_now);
    // 这是一种简写
    std::chrono::zoned_time zt(local_zone, utc_now);

    // 格式化输出
    std::cout << std::format("{:%Y-%m-%d %H:%M:%S %Z}", zt) << std::endl;

    return 0;
}
```

输出结果

```bash
2025-05-14 23:19:05.455318100 CST
```

:::