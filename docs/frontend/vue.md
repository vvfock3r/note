# Vue3

## 文档

官网（英）：[https://vuejs.org](https://vuejs.org)

官网（中）：[https://cn.vuejs.org](https://cn.vuejs.org)

本文档采用 **组合式API（CompositionAPI）**，旧版本文档参考：[https://jinhui.dev/frontend/deprecated/vue-option.html](https://jinhui.dev/frontend/deprecated/vue-option.html)

<br />

## 新建项目

### 初始化项目

安装文档：[https://cn.vuejs.org/guide/quick-start.html](https://cn.vuejs.org/guide/quick-start.html)

::: details （1）项目初始化

```bash
# 查看node版本
C:\Users\Administrator>node -v
v18.16.0

# 升级npm
npm install -g npm

# 初始化vue项目
npm init vue@latest
```

![image-20230611203522739](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230611203522739.png)

![image-20230611203555991](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230611203555991.png)

:::

::: details （2）配置WebStorm

![image-20230611213700274](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230611213700274.png)

:::

<br />

### 第一个示例

::: details 点击查看详情

将 `src `目录下的文件全部删除 (保留`main.js`)，然后新建文件`App.vue`

```vue
<script setup>

</script>

<template>
  <!-- 下面这行div标签是我们新增的内容，其他内容均由WebStorm工具生成 -->
  <div>Hello Vue!</div>
</template>

<style lang="scss" scoped>

</style>
```

修改`main.js`，然后重启项目

```JavaScript
import { createApp } from 'vue'
import App from './App.vue'

// 注释或删除此行,因为此文件已经被我们删除
// import './assets/main.css'

createApp(App).mount('#app')
```

输出结果

![image-20230611204930126](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230611204930126.png)

说明

1、`index.html`是项目入口，他会引用`src/main.js`

2、`main.js`会创建`Vue App`，并挂载到HTML中`id="app"`的div上

3、`App.vue`在这里已经是一个单文件组件

:::

<br />

## 基础操作

### 基本类型响应式封装 ref

::: details （1）编写一个计数器：默认情况下对象并不是响应式

`App.vue`

```vue
<script setup>
// 计数器
let count = 0

// 增加1
function add() {
  count++
}
</script>

<template>
  <!-- 通过使用{{ }}来引用变量  -->
  <div>Count is {{ count }}</div>

  <!-- 按钮绑定函数 -->
  <button @click="add">计数器加1</button>
</template>

<style lang="scss" scoped></style>
```

:::

::: details （2）编写一个计数器：使用 ref 封装基本数据类型为响应式

`App.vue`

```vue
<script setup>
import { ref } from 'vue'

// 使用 ref 封装基本类型为响应式对象
// 原理
// (1) 通过Proxy对数据进行封装，当数据发生改变时，触发模板等内容更新
// (2) 0 会变成 Proxy({value: 0})
// (3) 所以后面当我们改这个对象时，需要通过 对象.value 来改，
//     但是在模板中可以直接使用对象，vue会自动帮我们获取value值
const count = ref(0)

// 增加1
function add() {
  count.value++
}
</script>

<template>
  <!-- 通过使用{{ }}来引用变量  -->
  <div>Count is {{ count }}</div>

  <!-- 按钮绑定函数 -->
  <button @click="add">计数器加1</button>
</template>

<style lang="scss" scoped></style>
```

:::

<br />

### 引用类型响应式封装 reactive

::: details 点击查看详情

`App.vue`

```vue
<script setup>
import { reactive } from 'vue'

// 使用 reactive 封装引用类型为响应式对象
const person = reactive({ name: 'jack' })

// 设置一次性定时器
setTimeout(() => {
  person.name = 'bob'
}, 2000)
</script>

<template>
  <div>{{ person.name }}</div>
</template>

<style lang="scss" scoped></style>
```

:::

<br />

### 响应式对象变为只读 readonly

::: details 点击查看详情

`App.vue`

```vue
<script setup>
import { reactive, readonly } from 'vue'

// readonly让对象只读；打开控制台可以看到会报警，而且数据也不会改
const person = readonly(reactive({ name: 'jack' }))

// 设置一次性定时器, 此时不能再修改数据
setTimeout(() => {
  person.name = 'bob'
}, 2000)
</script>

<template>
  <div>{{ person.name }}</div>
</template>

<style lang="scss" scoped></style>
```

![image-20230611214741762](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230611214741762.png)

:::

<br />

### 响应式对象解构方式 toRefs

::: details （1）方式一：解构时使用 toRefs 封装，新对象的修改会同步源响应式对象

`App.vue`

```vue
<script setup>
import { reactive, toRefs } from "vue";

// 使用 reactive 封装引用类型为响应式对象
const person = reactive({ name: "jack" });

// 如果直接将person解构,响应式对象又变成非响应式了, 解决办法是利用toRefs
// 原理：proxy({name: 'jack'}) => {name: proxy({value: 'jack'})}
var { name } = toRefs(person);

// 设置一次性定时器
setTimeout(() => {
  name.value = "bob";
}, 2000);
</script>

<template>
  <div>{{ name }}</div>
</template>

<style lang="scss" scoped></style>
```

:::

::: details （2）方式二：创建新的 ref，新对象的修改会同步源响应式对象

`App.vue`

```vue
<script setup>
import { reactive, toRef } from 'vue'

// 使用 reactive 封装引用类型为响应式对象
const person = reactive({ name: 'jack' })

// 基于响应式对象上的一个属性，创建一个对应的 ref
// 这样创建的 ref 与其源属性保持同步
let firstName = toRef(person, 'name')

// 设置一次性定时器
setTimeout(() => {
  firstName.value = 'bob'
}, 2000)
</script>

<template>
  <div>{{ person.name }}</div>
</template>

<style lang="scss" scoped></style>
```

:::

<br />

### 缓存特性的计算属性 computed

文档：[https://cn.vuejs.org/api/reactivity-core.html#computed](https://cn.vuejs.org/api/reactivity-core.html#computed)

::: details （1）计算属性拥有缓存特性，性能会高一些

`App.vue`

```vue
<script setup>
import { computed, ref } from 'vue'

// 定义一个普通方法
function getNow() {
  return Date.now()
}

// 定义一个计算属性, 它虽然是一个方法但是我们要以一个变量来看待它
const now = computed(() => {
  return Date.now()
})

// 定义一个普通值,通过周期性计数器不断修改值
const n = ref(0)
setInterval(() => {
  n.value++
}, 1000)
</script>

<template>
  <!-- 计算属性会缓存，只有当依赖的数据发生改变才会改变 -->
  <!-- 方法取到的值是其他数据变了，方法也会重新渲染 -->
  <!-- 如果以上两种方式都能满足需求的话，推荐使用计算属性,因为有缓存，性能会高一些 -->
  <div>计数变量: {{ n }}</div>
  <div>方法取值: {{ getNow() }}</div>
  <div>计算属性: {{ now }}</div>
</template>

<style lang="scss" scoped></style>
```

![QQ截图20230611215607](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//QQ%E6%88%AA%E5%9B%BE20230611215607.gif)

:::

<br />

### 侦听N个响应式对象 watchxx

文档：

* [https://cn.vuejs.org/api/reactivity-core.html#watch](https://cn.vuejs.org/api/reactivity-core.html#watch)
* [https://cn.vuejs.org/api/reactivity-core.html#watcheffect](https://cn.vuejs.org/api/reactivity-core.html#watcheffect)

::: details （1）watch 一个 ref 对象

`App.vue`

```vue
<script setup>
import { ref, watch } from "vue";

// 使用 ref 封装基本类型为响应式对象
const name = ref("dell");

// 监听一个 ref 对象, {immediate: true} 用于表示 立即执行监听器
// prettier-ignore
watch(name, (currentValue, prevValue) => {
    console.log("当前值: ", currentValue);
    console.log("上次值: ", prevValue);
  },
  { immediate: true }
);

// 修改 name 的值
setTimeout(() => {
  name.value = "bob";
}, 2000);
</script>

<template>
  <div></div>
</template>

<style lang="scss" scoped></style>
```

![image-20230611220534372](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230611220534372.png)

:::

::: details （2）watch 一个 reactive 对象

```vue
<script setup>
import { reactive, watch } from "vue";

// 使用 reactive 封装引用类型为响应式对象
const name = reactive({ firstName: "san", lastName: "zhang" });

// 监听一个 reactive 对象, {immediate: true} 用于表示 立即执行监听器
watch(
  [() => name.firstName, () => name.lastName],
  ([currentFirstName, currentLastName], [prevFirstName, prevLastName]) => {
    console.log("当前值: ", currentFirstName);
    console.log("上次值: ", prevFirstName);
    console.log("当前值: ", currentLastName);
    console.log("上次值: ", prevLastName);
    console.log("\n");
  },
  { immediate: true }
);

// 修改 name 的值
setTimeout(() => {
  name.firstName = "si";
  name.lastName = "li";
}, 2000);
</script>

<template>
  <div></div>
</template>

<style lang="scss" scoped></style>
```

![image-20230611220756907](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230611220756907.png)

:::

::: details （3）watchEffect 监听器的使用

```vue
<script setup>
import { reactive, watchEffect } from "vue";

// 使用 reactive 封装引用类型为响应式对象
const name = reactive({ firstName: "san", lastName: "zhang" });

// 使用 watchEffect 监听对象
// 1、watchEffect是非惰性的，一开始就执行
// 2、watchEffect只能获取到数据当前值，不能获取之前的值
// 3、watchEffect内部调用了外部变量时，当外部变量改变时才会执行这个函数，如果没有依赖，就不会执行
//   也就是说 能自动感知内部函数的依赖
watchEffect(() => {
  console.log(name.firstName);
  console.log(name.lastName);
  console.log("\n");
});

// 修改 name 的值
setTimeout(() => {
  name.firstName = "si";
  name.lastName = "li";
}, 2000);
</script>

<template>
  <div></div>
</template>

<style lang="scss" scoped></style>
```

![image-20230611221039625](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230611221039625.png)

:::

<br />

### 组件的生命周期函数 xxx

文档：[https://cn.vuejs.org/guide/essentials/lifecycle.html](https://cn.vuejs.org/guide/essentials/lifecycle.html)

::: details 点击查看详情

`App.vue`

```vue
<script setup>
import {
  onActivated,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated,
  onDeactivated,
  onErrorCaptured
} from "vue";

// Vue 3 中的生命周期钩子函数与 Vue 2 中的不完全相同
// 这里还需要仔细研究

onBeforeMount(() => {
  console.log("onBeforeMount");
});
onMounted(() => {
  console.log("onMounted");
});

onBeforeUpdate(() => {
  console.log("onBeforeUpdate");
});

onUpdated(() => {
  console.log("onUpdated");
});

onBeforeUnmount(() => {
  console.log("onBeforeUnmount");
});

onUnmounted(() => {
  console.log("onUnmounted");
});

onActivated(() => {
  console.log("onActivated");
});

onDeactivated(() => {
  console.log("onDeactivated");
});

onErrorCaptured(() => {
  console.log("onErrorCaptured");
});

console.log("Setup");
</script>

<template>
  <div></div>
</template>

<style lang="scss" scoped></style>
```

:::

<br />

### 获取原始的文档对象 ref

文档：[https://cn.vuejs.org/api/built-in-special-attributes.html#ref](https://cn.vuejs.org/api/built-in-special-attributes.html#ref)

::: details 点击查看详情

`App.vue`

```vue
<script setup>
import { ref, onMounted } from "vue";

// 定义一个变量，变量名要和下面模板中ref的值一样
const input = ref();

onMounted(() => {
  input.value.focus();
  console.log(input.value);
});
</script>

<template>
  <input ref="input" placeholder="请输入您的姓名" />
</template>

<style lang="scss" scoped></style>
```

![image-20230611223429509](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230611223429509.png)

:::

<br />

## 常用指令

### 条件渲染 - v-if 

文档：[https://cn.vuejs.org/guide/essentials/conditional.html#v-if-on-template](https://cn.vuejs.org/guide/essentials/conditional.html#v-if-on-template)

::: details 点击查看详情

```vue
<script setup>
import { reactive } from "vue";

const person = reactive({
  name: "bob",
  isShow: false,
  isHidden: false
});

// 深度分析:
// 1.v-if 主要用于根据表达式的真假值来控制元素或组件的显示或隐藏
// 2.v-if 通过控制DOM存在与否来控制是否显示, 这一点区别于v-show
// 3.v-if 指令本身不直接支持对大小的判断
</script>

<template>
  <!-- 基础用法 -->
  <li v-if="person.isShow">{{ person.name }}</li>

  <!-- if else用法 -->
  <li v-if="person.isHidden">隐藏</li>
  <li v-else-if="person.isShow">{{ person.name }}</li>
  <li v-else>未知</li>
</template>

<style lang="scss" scoped></style>
```

:::

<br />

### 条件渲染 - v-show

::: details 点击查看详情

```vue
<script setup>
import { reactive } from "vue";

const person = reactive({
  name: "bob",
  isShow: false
});

// 深度分析:
// 1.v-show 主要用于根据表达式的真假值来控制元素或组件的显示或隐藏
// 2.v-show 通过控制display: none来控制是否显示, 这一点区别于v-if
// 3.v-show 不能于v-else等连用
</script>

<template>
  <li v-show="person.isShow">{{ person.name }}</li>
</template>

<style lang="scss" scoped></style>
```

![image-20230612221818086](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230612221818086.png)

:::

<br />

### 对象循环 - v-for

文档：[https://cn.vuejs.org/guide/essentials/list.html](https://cn.vuejs.org/guide/essentials/list.html)

::: details （1）v-for 基础

```vue
<script setup>
const list = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];
const obj = { name: "Bob", age: 21 };

// 分析:
// 1.v-for 可以不带:key, 但推荐带上
// 2.v-for 如果带:key, 则要求是一个基础类型的值, 且同一个父元素下的子元素key值必须唯一
// 3.v-for 不推荐使用index作为key, 在对象遍历中我们的key就存在问题, 虽然不会报错, 实际工作中不能这样用
//         如果实在没有合适的key， 可以考虑使用uuid插入到数据结构中, :key=xx不能直接调用JS方法
// 4.v-for 不推荐和v-if连用, 如果要连用推荐外面包一层 template
</script>

<template>
  <!-- 可以直接循环数字，输出1-5，注意是从1开始的 -->
  <li v-for="item in 5" :key="item">{{ item }}</li>

  <!--------------------------------------------------------------------------->

  <!-- 遍历数组值 -->
  <li v-for="item in list" :key="item.id">{{ item }}</li>

  <!-- 遍历数组值和索引 -->
  <li v-for="(item, index) in list" :key="item.id">{{ index }} {{ item }}</li>

  <!--------------------------------------------------------------------------->
  
  <!-- 遍历对象值 -->
  <li v-for="value in obj" :key="value">{{ value }}</li>

  <!-- 遍历对象值和key -->
  <li v-for="(value, key) in obj" :key="value">{{ key }}:{{ value }}</li>

  <!-- 遍历对象值、key和索引 -->
  <li v-for="(value, key, index) in obj" :key="value">{{ index }} {{ key }}:{{ value }}</li>
</template>

<style lang="scss" scoped></style>
```

:::

::: details （2）v-for 与 v-if 连用

```vue
<script setup></script>

<template>
  <ul>
    <!-- 可以直接循环数字，输出1-5，注意是从1开始的 -->
    <li v-for="item in 5" :key="item">{{ item }}</li>
  </ul>

  <!-- 如果我们不想输出3这个数字，这样做可以解决，但是li标签依然存在 -->
  <ul>
    <li v-for="item in 5" :key="item">
      <div v-if="item !== 3">{{ item }}</div>
    </li>
  </ul>

  <!-- 这样做li标签就没了，但是还是有问题，DOM结构中li外边多了一层div -->
  <ul>
    <div v-for="item in 5" :key="item">
      <li v-if="item !== 3">{{ item }}</li>
    </div>
  </ul>

  <!-- 完美解决方案是：将div修改为template， template代表占位符，并不实际渲染 -->
  <ul>
    <template v-for="item in 5" :key="item">
      <li v-if="item !== 3">{{ item }}</li>
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
```

:::

<br />

### 事件绑定 - v-on

::: details 点击查看详情

```vue
<script setup>
import { ref } from "vue";

const list = ref([]);

function handleClick() {
  list.value.push(list.value.length + 1);
}
</script>

<template>
  <!-- v-on: click可以简写成@click, 也是常用的的写法 -->
  <button v-on:click="handleClick">添加列表</button>
  <ul>
    <li v-for="(item, index) in list" :key="index">{{ item }}</li>
  </ul>
</template>

<style lang="scss" scoped></style>
```

:::

<br />

### Context参数

::: details （1）点击查看详情

`App.vue`

```vue
<template>
    <Child :title="title">
        <p>hello</p>
    </Child>
</template>

<script>

import Child from './Child'

export default {
    name: "App",
    components: {Child},
    setup() {
        return {
            title: "bob",
        }
    }
}
</script>

<style scoped>
</style>
```

`Child.vue`

```vue
<template>
    <p :title="title">123</p>
    <p @click="handleClick">122</p>
</template>

<script>
export default {
    name: "Child",
    // 表示多个根标签都不要继承No-props
    inheritAttrs: false,

    setup(props, context) {
        const {attrs, slots, emit} = context;

        console.log(slots.default()); // 这是一个虚拟DOM，可以通过h函数来搞，这里不演示了

        // 不能使用箭头函数
        function handleClick() {
            alert("abc");
        }

        return {
            // 对外暴露出属性
            title: attrs.title,
            handleClick,
        }
    }
}
</script>

<style scoped>
</style>
```

:::

<br />

### 例子 - ToDoItem

最原始的todoitem

有一个bug：提交后input框焦点就没了

```vue
<template>
    <div>
        <input :value="inputValue" @input="inputHandle" type="text" autofocus>
        <button @click="submitHandle">提交</button>
    </div>
    <ul>
        <li v-for="(item, index) of list" :key="index">{{item}}</li>
    </ul>
</template>

<script>
import {ref, reactive} from 'vue';

export default {
    name: "App",
    setup() {
        const list = reactive([]);
        const inputValue = ref('');
        const inputHandle = (e) => {
            inputValue.value = e.target.value;
        }
        const submitHandle = () => {
            list.push(inputValue.value);
            inputValue.value = '';
        }
        return {
            list,
            inputValue,
            inputHandle,
            submitHandle
        }
    }
}
</script>

<style scoped>
</style>
```

### 将list和input分开

`App.vue`

```vue
<template>
    <div>
        <input :value="inputValue" @input="inputHandle" type="text" autofocus>
        <button @click="()=>{submitHandle(inputValue); inputValue='';}">提交</button>
    </div>
    <ul>
        <li v-for="(item, index) of list" :key="index">{{item}}</li>
    </ul>
</template>

<script>
import {ref, reactive} from 'vue';

// list相关操作
function listRelativeEffect() {
    const list = reactive([]);
    const submitHandle = (item) => {
        list.push(item);
    }
    return {list, submitHandle}
}

// input相关操作
function inputRelativeEffect() {
    const inputValue = ref('');
    const inputHandle = (e) => {
        inputValue.value = e.target.value;
    }
    return {inputValue, inputHandle}
}

export default {
    name: "App",
    setup() {
        const {list, submitHandle} = listRelativeEffect();
        const {inputValue, inputHandle} = inputRelativeEffect();

        return {
            list, submitHandle,
            inputValue, inputHandle,
        }
    }
}
</script>

<style scoped>
</style>
```



### provide和inject

`App.vue`

```vue
<template>
    <Child></Child>
</template>

<script>

import Child from './Child'
import {provide, ref, readonly} from 'vue';


export default {
    name: "App",
    components: {Child},
    setup() {
        const name = ref('dell');
        const setName = (newName) => {
            name.value = newName;
        }

        // 提供数据和改数据的方法, readonly保证子组件无法修改
        provide('name', readonly(name));
        provide('setName', setName);

        return {};
    }
}
</script>

<style scoped>
</style>
```

`Child.vue`

```vue
<template>
    <div @click="handleClick">{{name}}</div>
</template>

<script>

import {inject} from 'vue';

export default {
    name: "Child",
    setup() {
        // 第二个参数代表默认值
        const name = inject('name', 'defaultName');
        const setName = inject('setName');

        const handleClick = () => {
            setName("lee");
        }

        return {name, handleClick};
    }
}
</script>

<style scoped>
</style>
```
