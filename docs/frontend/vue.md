# Vue3

## 文档

官网（英）：[https://vuejs.org](https://vuejs.org)

官网（中）：[https://cn.vuejs.org](https://cn.vuejs.org)

本文档采用**组合式API（CompositionAPI）**

<br />

## 新建项目

### 初始化项目

安装文档：[https://cn.vuejs.org/guide/quick-start.html](https://cn.vuejs.org/guide/quick-start.html)

::: details （1）项目初始化

```bash
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

### 让响应式对象变为只读 readonly

::: details 点击查看详情

`App.vue`

```vue
<script setup>
import {reactive, readonly} from "vue";

// readonly让对象只读；打开控制台可以看到会报警，而且数据也不会改
const person = readonly(reactive({name: "jack"}))

// 设置一次性定时器
setTimeout(() => {
  person.name = "bob";
}, 2000)

</script>

<template>
  <div>{{ person.name }}</div>
</template>

<style lang="scss" scoped>

</style>
```

:::

<br />

### 解构响应式对象方式汇总

::: details （1）解构时使用 toRefs 封装，新对象的修改会同步源响应式对象

`App.vue`

```vue
<script setup>
import {reactive, toRefs} from "vue";

// 使用 reactive 封装引用类型为响应式对象
const person = reactive({name: "jack"})

// 如果直接将person解构,响应式对象又变成非响应式了
// 解决办法是利用toRefs
// 原理：proxy({name: 'jack'}) => {name: proxy({value: 'jack'})}
var {name} = toRefs(person)

// 设置一次性定时器
setTimeout(() => {
  name.value = "bob";
}, 2000)

</script>

<template>
  <div>{{ name }}</div>
</template>

<style lang="scss" scoped>

</style>
```

:::

::: details （2）创建新的 ref，新对象的修改会同步源响应式对象

`App.vue`

```vue
<script setup>
import {reactive, toRef} from "vue";

// 使用 reactive 封装引用类型为响应式对象
const person = reactive({name: "jack"})

// 基于响应式对象上的一个属性，创建一个对应的 ref
// 这样创建的 ref 与其源属性保持同步
let firstName = toRef(person, 'name')

// 设置一次性定时器
setTimeout(() => {
  firstName.value = "bob";
}, 2000)

</script>

<template>
  <div>{{ person.name }}</div>
</template>

<style lang="scss" scoped>

</style>
```

:::

<br />

### 高性能的计算属性

文档：[https://cn.vuejs.org/api/reactivity-core.html#computed](https://cn.vuejs.org/api/reactivity-core.html#computed)

::: details （1）计算属性拥有缓存特性，性能会高一些

`App.vue`

```vue
<script setup>
import {computed, ref} from "vue";

// 定义一个普通方法
function getNow() {
  return Date.now()
}

// 定义一个计算属性
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
  <div>计数变量: {{ n }}</div>
  <!-- 计算属性会缓存，只有当依赖的数据发生改变才会改变 -->
  <!-- 方法取到的值是其他数据变了，方法也会重新渲染 -->
  <!-- 如果以上两种方式都能满足需求的话，推荐使用计算属性,因为有缓存，性能会高一些 -->
  <div>方法取值: {{ getNow() }}</div>
  <div>计算属性: {{ now }}</div>
</template>

<style lang="scss" scoped>

</style>
```

:::

<br />

### 侦听一个或多个响应式对象

文档：

* [https://cn.vuejs.org/api/reactivity-core.html#watch](https://cn.vuejs.org/api/reactivity-core.html#watch)
* [https://cn.vuejs.org/api/reactivity-core.html#watcheffect](https://cn.vuejs.org/api/reactivity-core.html#watcheffect)

::: details （1）watch 一个 ref 对象

`App.vue`

```vue
<script setup>
import {ref, watch} from "vue";

// 使用 ref 封装基本类型为响应式对象
const name = ref("dell");

// 监听一个 ref 对象, {immediate: true} 用于表示 立即执行监听器
watch(name, (currentValue, prevValue) => {
  console.log('当前值: ', currentValue)
  console.log('上次值: ', prevValue)
}, {immediate: true})

// 修改 name 的值
setTimeout(() => {
  name.value = "bob"
}, 2000)

</script>

<template>
  <div></div>
</template>

<style lang="scss" scoped>

</style>
```

:::

::: details （2）watch 一个 reactive 对象

```vue
<script setup>
import {reactive, watch} from "vue";

// 使用 reactive 封装引用类型为响应式对象
const name = reactive({firstName: "san", lastName: "zhang"});

// 监听一个 reactive 对象, {immediate: true} 用于表示 立即执行监听器
watch([() => name.firstName, () => name.lastName],
    ([currentFirstName, currentLastName], [prevFirstName, prevLastName]) => {
      console.log("当前值: ", currentFirstName)
      console.log("上次值: ", prevFirstName)
      console.log("当前值: ", currentLastName)
      console.log("上次值: ", prevLastName)
    }, {immediate: true})

// 修改 name 的值
setTimeout(() => {
  name.firstName = "si"
  name.lastName = "li"
}, 2000)

</script>

<template>
  <div></div>
</template>

<style lang="scss" scoped>

</style>
```

:::

::: details （3）watchEffect 监听器的使用

```vue
<script setup>
import {reactive, watchEffect} from "vue";

// 使用 reactive 封装引用类型为响应式对象
const name = reactive({firstName: "san", lastName: "zhang"});

// 使用 watchEffect 监听对象
// 1、watchEffect是非惰性的，一开始就执行
// 2、watchEffect只能获取到数据当前值，不能获取之前的值
// 3、watchEffect内部调用了外部变量时，当外部变量改变时才会执行这个函数，如果没有依赖，就不会执行
//   也就是说 能自动感知内部函数的依赖
watchEffect(() => {
  console.log(name.firstName)
  console.log(name.lastName)
})

// 修改 names 的值
setTimeout(() => {
  name.firstName = "si"
  name.lastName = "li"
}, 2000)

</script>

<template>
  <div></div>
</template>

<style lang="scss" scoped>

</style>
```

:::

<br />

### 生命周期函数简单举例

::: details 点击查看详情

`App.vue`

```vue
<script setup>
import {onBeforeMount, onMounted} from "vue";

onBeforeMount(() => {
  console.log('onBeforeMount')
})
onMounted(() => {
  console.log('onMounted')
})

</script>

<template>
  <div></div>
</template>

<style lang="scss" scoped>

</style>
```

:::

<br />

### 获取原始的DOM节点

文档：[https://cn.vuejs.org/api/built-in-special-attributes.html#ref](https://cn.vuejs.org/api/built-in-special-attributes.html#ref)

::: details 点击查看详情

`App.vue`

```vue
<script setup>
import {ref, onMounted} from "vue";

// 定义一个变量，变量名要和下面模板中ref的值一样
const input = ref();

onMounted(() => {
  input.value.focus()
  console.log(input.value)
})

</script>

<template>
  <input ref="input" placeholder="请输入您的姓名"/>
</template>

<style lang="scss" scoped>

</style>
```

:::

<br />

### 常用指令



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


