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

# 初始化vue项目, 并根据提示进行操作
# 这里使用的是 "vue": "^3.3.2"
npm init vue@latest

# 安装CSS预处理器, 不然后面写scss样式会报错
npm install sass --save-dev
```

![image-20230611203522739](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230611203522739.png)

![image-20230611203555991](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230611203555991.png)

:::

::: details （2）配置WebStorm

![image-20230611213700274](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230611213700274.png)

:::

<br />

### ESLint配置

文档：[https://eslint.org/docs/latest](https://eslint.org/docs/latest)

::: details （1）关闭组件必须使用多个单词命名（默认开启）

`.eslintrc.cjs`

```javascript
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  // 添加下面3行
  rules: {
    'vue/multi-word-component-names': 0,
  },
}
```

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

### 基本类型响应式封装 - ref

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

### 引用类型响应式封装 - reactive

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

### 响应式对象变为只读 - readonly

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

### 响应式对象解构方式 - toRefs

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

### 缓存特性的计算属性 - computed

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

### 侦听N个响应式对象 - watchxx

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

### 组件的生命周期函数 - xxx

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

### 获取原始的文档对象 - ref

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

## 指令基础

### 更新文本内容 - v-text

::: details 点击查看详情

```vue
<script setup>
import { ref } from 'vue'

const message = ref('Hello Vue')
</script>

<template>
  <!-- 以下两行代码是等价的 -->
  <div>{{ message }}</div>
  <div v-text="message"></div>
</template>

<style lang="scss" scoped></style>
```

:::

<br />

### 条件渲染指令 - v-if 

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

### 条件渲染指令 - v-show

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

### 对象循环指令 - v-for

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

### 事件绑定指令 - v-on

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

### 属性双向绑定 - v-bind

::: details 点击查看详情

```vue
<script setup>
import { ref } from "vue";

const inputValue = ref();
</script>

<template>
  <!-- 数据双向绑定 -->
  <input type="text" v-model="inputValue" autofocus />

  <!-- 属性双向绑定, 当鼠标移动到按钮上会显示输入框中的值 -->
  <!-- v-bind:title 可以简写成 :title -->
  <button v-bind:title="inputValue">我是按钮</button>
</template>

<style lang="scss" scoped></style>
```

:::

<br />

### 数据双向绑定 - v-model

::: details （1）input 数据双向绑定

```vue
<script setup>
import { ref } from 'vue'

const inputValue = ref()
const todoList = ref([])

function handlerSubmit() {
  todoList.value.push(inputValue.value)
  inputValue.value = ''
}
</script>

<template>
  <!-- v-model 数据双向绑定, @keyup.enter 绑定回车事件 -->
  <span>请输入待办事项: </span>
  <input type="text" autofocus v-model="inputValue" @keyup.enter="handlerSubmit" />

  <!-- 循环对象 -->
  <ul>
    <li v-for="(item, index) in todoList" :key="index">{{ item }}</li>
  </ul>
</template>

<style lang="scss" scoped></style>
```

:::

::: details （2）表单 数据双向绑定

```vue
<script setup>
import { ref } from 'vue'

const msg1 = ref('hello1')
const msg2 = ref('hello2')
const msg3 = ref(true)

const msg4 = ref([])
const msg5 = ref()

const msg6 = ref('2')
const msg7 = ref([])
const msg8 = ref('hello')
</script>

<template>
  <div>
    <span>input双向绑定，初始值为字符串{{ msg1 }}</span>
    <input v-model="msg1" type="text" />
  </div>

  <div>
    <span>textarea，正常写HTML要写双标签，这里只需要写单标签即可，初始值为字符串 {{ msg2 }}</span>
    <textarea v-model="msg2" />
  </div>

  <div>
    <span>checkbox复选框，初始值可以为布尔值{{ msg3 }}</span>
    <input v-model="msg3" type="checkbox" />
  </div>

  <div>
    <span>checkbox复选框，当有多个checkbox时，初始值可以为数组{{ msg4 }}</span>
    <input v-model="msg4" type="checkbox" value="box1" />
    <input v-model="msg4" type="checkbox" value="box2" />
    <input v-model="msg4" type="checkbox" value="box3" />
  </div>

  <div>
    <span>radio单选框，初始值为字符串 {{ msg5 }}</span>
    <input v-model="msg5" type="radio" value="r1" />
    <input v-model="msg5" type="radio" value="r2" />
  </div>

  <div>
    <span>select选择框-单选，初始值为字符串 {{ msg6 }}</span>
    <select v-model="msg6">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
  </div>

  <div>
    <span
      >select选择框-多选（按住Ctrl），需要在select上添加multiple属性，初始值为数组 {{ msg7 }}</span
    >
    <select v-model="msg7" multiple>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
  </div>

  <div>
    <span>checkbox选中或者不选中，自定义值 {{ msg8 }}</span>
    <input v-model="msg8" type="checkbox" true-value="hello" false-value="world" />
  </div>
</template>

<style lang="scss" scoped></style>
```

:::

<br />

### 使用原生模板  - v-html

文档：[https://cn.vuejs.org/api/built-in-directives.html#v-html](https://cn.vuejs.org/api/built-in-directives.html#v-html)

::: details 点击查看详情

```vue
<script setup>
import { ref } from "vue";

const item = ref("<li>Item</li>");
</script>

<template>
  <ul v-html="item"></ul>
</template>

<style lang="scss" scoped></style>
```

:::

<br />

### 仅仅渲染一次 - v-once

文档：[https://cn.vuejs.org/api/built-in-directives.html#v-once](https://cn.vuejs.org/api/built-in-directives.html#v-once)

::: details 点击查看详情

```vue
<script setup>
import { ref } from "vue";

const item = ref("Item1");

setTimeout(() => {
  item.value = "Item2";
}, 2000);
</script>

<template>
  <ul>
    <li v-once>{{ item }}</li>
    <li>{{ item }}</li>
  </ul>
</template>

<style lang="scss" scoped></style>
```

:::

<br />

## 指令进阶

### 动态名称

::: details （1）动态属性名

```vue
<script setup>
import { ref } from "vue";

const style = ref("style");
const value = ref("color: red");
</script>

<template>
  <!-- style 和 value 都是变量 -->
  <p :[style]="value">Hello</p>
</template>

<style lang="scss" scoped></style>
```

:::

::: details （2）动态事件名

```vue
<script setup>
import { ref } from "vue";

const event = ref("click");

function handler() {
  alert("Hello");
}

setTimeout(() => {
  // 修改为双击事件
  event.value = "dblclick";
}, 2000);
</script>

<template>
  <!-- event 和 handler 都是变量 -->
  <p @[event]="handler">点我</p>
</template>

<style lang="scss" scoped></style>
```

:::

<br />

### 事件方法

::: details 点击查看详情

```vue
<script setup>
import { ref } from 'vue'

const value1 = ref(0)
const value2 = ref(0)
const value3 = ref(0)
const value4 = ref(0)
const value5 = ref(0)

function add1() {
  value1.value += 1
}

function add2(event) {
  console.log(event.target)
  value2.value += 1
}

function add3(n) {
  value3.value += n
}

function add4(n, event) {
  console.log(event.target)
  value4.value += n
}

function add5() {
  console.log('add5 runing')
  value5.value += 1
}

function add6() {
  console.log('add6 runing')
  value5.value += 1
}
</script>

<template>
  <!-- 最简单的写法 -->
  <div>
    <button @click="add1">按钮</button>
    <span>{{ value1 }}</span>
  </div>

  <!-- 获取一下事件 -->
  <div>
    <button @click="add2">按钮</button>
    <span>{{ value2 }}</span>
  </div>

  <!-- 指定固定参数 -->
  <div>
    <button @click="add3(2)">按钮</button>
    <span>{{ value3 }}</span>
  </div>

  <!-- 指定固定参数,并且还携带上event -->
  <div>
    <button @click="add4(2, $event)">按钮</button>
    <span>{{ value4 }}</span>
  </div>

  <!-- 可以调用多个函数，注意：多个函数用逗号隔开，而且要加括号 -->
  <div>
    <button @click="add5(), add6()">按钮</button>
    <span>{{ value5 }}</span>
  </div>
</template>

<style lang="scss" scoped></style>
```

:::

<br />

### 各类修饰符

::: details （1）事件修饰符

```vue
<script setup>
import { ref } from 'vue'

const item1 = ref(1)
const item2 = ref(2)

function div1Click() {
  alert(item1.value)
}

function div2Click() {
  alert(item2.value)
}
</script>

<template>
  冒泡阶段事件传播说明:<br />
  没有任何修饰符情况下<br />
  点击外层div,外层事件执行<br />
  点击内层div, 内层和外层div都会执行<br />
  通过查看值可以区分出这是冒泡阶段事件传播<br />
  <div class="div1" @click="div1Click">
    {{ item1 }}
    <div class="div2" @click="div2Click">
      {{ item2 }}
    </div>
  </div>

  <!-- ----------------------------------------- -->
  方法1: 阻止冒泡阶段事件传播, click.stop 等同于 e.stopPropagation()<br />
  <div class="div1" @click="div1Click">
    {{ item1 }}
    <div class="div2" @click.stop="div2Click">
      {{ item2 }}
    </div>
  </div>

  <!-- ----------------------------------------- -->
  方法2: self代表只有点击的是自己才会触发<br />
  <div class="div1" @click.self="div1Click">
    {{ item1 }}
    <div class="div2" @click="div2Click">
      {{ item2 }}
    </div>
  </div>

  <!-- ----------------------------------------- -->
  事件捕获阶段说明<br />
  click.capture指定事件捕获阶段<br />
  先执行外层再执行内层, 这有别于事件冒泡阶段<br />
  <div class="div1" @click.capture="div1Click">
    {{ item1 }}
    <div class="div2" @click="div2Click">
      {{ item2 }}
    </div>
  </div>

  <!-- ----------------------------------------- -->
  声明事件只执行一次<br />
  在这里外层只会执行一次, 无论是捕获阶段还是冒泡阶段都不会再执行<br />
  <div class="div1" @click.once="div1Click">
    {{ item1 }}
    <div class="div2" @click="div2Click">
      {{ item2 }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
div {
  border: 1px solid #abc;
  margin-bottom: 10px;
}

.div1 {
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
}

.div2 {
  width: 100px;
  height: 100px;
}
</style>
```

:::

::: details （2）按键修饰符

```vue
<script setup>
function keydown(e) {
  alert(e.code)
}
</script>

<template>
  <div>
    <span>按键修饰符, 任意按键都会触发</span><br />
    <input type="text" @keydown="keydown" />
  </div>

  <div>
    <span>Enter回车键</span><br />
    <input @keydown.enter="keydown" type="text" />
  </div>

  <div><span>其他按键：tab,delete,esc,up,down,left,right</span><br /></div>
</template>

<style lang="scss" scoped></style>
```

:::

::: details （3）鼠标修饰符

```vue
<script setup>
function btnClick() {
  alert("您点下了按钮");
}
</script>

<template>
  <div>
    <span>默认左键、右键、中间键应该都生效，但测试只有左键生效</span>
    <button @click="btnClick">点我</button>
  </div>

  <div>
    <span>指定为左键</span>
    <button @click.left="btnClick">点我</button>
  </div>
  <div>
    <span>指定为右键</span>
    <button @click.right="btnClick">点我</button>
  </div>
  <div>
    <span>指定为中间键（滚轮）</span>
    <button @click.middle="btnClick">点我</button>
  </div>

  <div>
    <span>按住CTRL，再点击才会执行</span>
    <button @click.ctrl="btnClick">点我</button>
  </div>

  <div>
    <span>仅按住CTRL，没有按其他键，再点击才会执行</span>
    <button @click.ctrl.exact="btnClick">点我</button>
  </div>
</template>

<style lang="scss" scoped>
div {
  height: 30px;
  margin-bottom: 15px;
}
</style>
```

:::

::: details （4）数据修饰符：内置的v-model修饰符

```vue
<script setup>
import { ref } from "vue";

const msg1 = ref("");
const msg2 = ref("");
const msg3 = ref("0");
const msg4 = ref("");
</script>

<template>
  <div>
    <span>v-model正常情况，没有修饰符{{ msg1 }}</span>
    <input v-model="msg1" type="text" />
  </div>

  <div>
    <span>v-model修饰符.lazy，当input失去焦点时才会触发数据改变 {{ msg2 }}</span>
    <input v-model.lazy="msg2" type="text" />
  </div>

  <div>
    <span>v-model修饰符.number，做类型转换 {{ typeof msg3 }}</span>
    <input v-model.number="msg3" type="number" />
  </div>

  <div>
    <span>v-model修饰符.trim，去除值前后空格 {{ msg4 }}</span>
    <input v-model.trim="msg4" type="text" />
  </div>
</template>

<style lang="scss" scoped>
div {
  height: 30px;
  margin-bottom: 15px;
}
</style>
```

:::

::: details （5）数据修饰符：自定义v-model修饰符

:::

<br />

### 自定义指令

<br />

## 组件从入门到放弃

文档：[https://cn.vuejs.org/guide/essentials/component-basics.html#using-a-component](https://cn.vuejs.org/guide/essentials/component-basics.html#using-a-component)

### 第一个组件

::: details 点击查看详情

新建一个组件 `ButtonCounter.vue`

```vue
<script setup>
import { ref } from 'vue'

const count = ref(1)
</script>

<template>
  <button @click="count++">Click {{ count }}</button>
</template>

<style lang="scss" scoped></style>
```

`App.vue` 中使用此组件

```vue
<script setup>
import ButtonCounter from "./ButtonCounter.vue";
</script>

<template>
  <!-- 各个组件之间数据独立 -->
  <ButtonCounter />
  <ButtonCounter />
  <ButtonCounter />
</template>

<style lang="scss" scoped></style>
```

:::

<br />

### 父子间传值

文档：[https://cn.vuejs.org/guide/components/props.html](https://cn.vuejs.org/guide/components/props.html)

::: details （1）静态传值

`App.vue` 

```vue
<script setup>
import ButtonCounter from "./ButtonCounter.vue";
</script>

<template>
  <!-- 静态传参，传递过去是一个字符串, 即使写的是数字 -->
  <ButtonCounter start="1" />
  <ButtonCounter start="2" />
  <ButtonCounter start="3" />
</template>

<style lang="scss" scoped></style>
```

`ButtonCounter.vue`

```vue
<script setup>
import { toRefs } from 'vue'

// 子组件需要使用 defineProps 接收参数
// defineProps 在编译阶段使用, 不需要导入

// 方法1: 接一个数组
// const props = defineProps(["start"]);

// 方法2:接一个对象
// const props = defineProps({
//   start: Number
// })

// 方法3:接一个对象
const props = defineProps({
  start: {
    type: String
  }
})

// 响应式解构, 非必须
const { start } = toRefs(props)

// 看一下传递过来的是什么数据类型
console.log(typeof start.value)
</script>

<template>
  <!-- 子组件不能改变父组件的数据(单向数据流), 所以这里点击后并不会+1, 控制台会报一个提醒 -->
  <button @click="start++">Click {{ start }}</button>
</template>

<style lang="scss" scoped></style>
```

:::

::: details （2）动态传值

`App.vue` 

```vue
<script setup>
import ButtonCounter from './ButtonCounter.vue'
</script>

<template>
  <!-- 动态传参 -->
  <ButtonCounter :start="1" />
  <ButtonCounter :start="2" />
  <ButtonCounter :start="3" />
</template>

<style lang="scss" scoped></style>
```

:::

::: details （3）参数很多时优化

`App.vue`

```vue
<script setup>
import ButtonCounter from './ButtonCounter.vue'
import { reactive } from 'vue'

const params = reactive({
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5
})
</script>

<template>
  <!-- 方式一：一个参数一个参数的写，参数数量太多时不建议  -->
  <!--  <ButtonCounter :a="1" :b="2" :c="3" :d="4" :e="5" />-->

  <!-- 方式二：使用v-bind绑定属性 -->
  <ButtonCounter v-bind="params" />
</template>

<style lang="scss" scoped></style>
```

`ButtonCounter.vue`

```vue
<script setup>
import { toRefs } from 'vue'

const props = defineProps(['a', 'b', 'c', 'd', 'e'])

// 响应式解构
const { a, b, c, d, e } = toRefs(props)
</script>

<template>
  <p>{{ a }}-{{ b }}-{{ c }}-{{ d }}-{{ e }}</p>
</template>

<style lang="scss" scoped></style>
```

:::

::: details （4）运行时参数校验

| 参数      | 说明                                                         |
| --------- | ------------------------------------------------------------ |
| type      | 数据类型，Number、String、Boolean、Array、Object、Function等 |
| required  | 是否必填，值为`true`或`false`，若参数不符合要求不会报错只会提醒 |
| default   | 默认值                                                       |
| validator | 参数校验，值是一个函数，函数参数是传入的值，函数返回结果为`true`或`false，若参数不符合要求不会报错只会提醒 |

`ButtonCounter.vue`

```vue
<script setup>
import { toRefs } from "vue";

const props = defineProps({
  start: {
    type: Number,
    required: true
  }
});

// 响应式解构
const { start } = toRefs(props);

// 看一下传递过来的是什么数据类型
console.log(typeof start.value);
</script>

<template>
  <!-- 子组件不能改变父组件的数据(单向数据流), 所以这里点击后并不会+1, 控制台会报一个提醒 -->
  <button @click="start++">Click {{ start }}</button>
</template>

<style lang="scss" scoped></style>
```

:::

::: details （5）传参变量大小写问题

`App.vue`

```vue
<script setup>
import ButtonCounter from "./ButtonCounter.vue";
</script>

<template>
  <!-- 传递的时候使用 小写单词-小写单词 -->
  <ButtonCounter :start-number="11" />
</template>

<style lang="scss" scoped></style>
```

`ButtonCounter.vue`

```vue
<script setup>
import { toRefs } from "vue";

// 接收时候使用驼峰命名，小写单词-首字母大写单词
const props = defineProps(["startNumber"]);

const { startNumber } = toRefs(props);
</script>

<template>
  <p>{{ startNumber }}</p>
</template>

<style lang="scss" scoped></style>
```

:::

<br />

### 单向数据流

单向数据流指的是父组件的数据流向子组件，子组件不能流向父组件（不能修改父组件数据）

如果子组件非要做 "修改"，可以转换一下思路，有以下几种方法（不违背单向数据流规则）

::: details （1）子组件定义一个新的变量，从而子组件就可以任意修改数据

`App.vue`

```vue
<script setup>
import ButtonCounter from './ButtonCounter.vue'
</script>

<template>
  <!-- 静态传参，传递过去是一个字符串, 即使写的是数字 -->
  <ButtonCounter start="1" />
  <ButtonCounter start="2" />
  <ButtonCounter start="3" />
</template>

<style lang="scss" scoped></style>
```

`ButtonCounter.vue`

```vue
<script setup>

import { ref } from "vue";

const props = defineProps(["start"]);

console.log(props);

// 定义一个新变量
const start = ref(props.start);
</script>

<template>
  <button @click="start++">Click {{ start }}</button>
</template>

<style lang="scss" scoped></style>
```

:::

::: details （2）emit事件基础：子组件监听自身事件，事件中使用emit通知父组件，父组件执行自己事件监听，修改数据，子组件重新渲染

`App.vue`

```vue
<script setup>
import ButtonCounter from './ButtonCounter.vue'
import { ref } from 'vue'

const startNumber = ref(1)

function addNumber() {
  startNumber.value++
}
</script>

<template>
  <!-- 父组件监听add-number事件  -->
  <ButtonCounter :start="startNumber" @add-number="addNumber" />
</template>

<style lang="scss" scoped></style>
```

`ButtonCounter.vue`

```vue
<script setup>
const props = defineProps(['start'])
</script>

<template>
  <!-- 事件函数向外触发 addNumber事件, 父组件需要使用add-number来监听 -->
  <!-- 如果需要传参，写到第二个参数即可 -->
  <button @click="$emit('addNumber')">Click {{ props.start }}</button>
</template>

<style lang="scss" scoped></style>
```

:::

::: details （3）emit事件注意：两种计算思想

第一种

```vue
  <!-- 子组件触发事件, 由父组件执行计算 -->
  <button @click="$emit('addNumber')">Click {{ props.start }}</button>

<script setup>
// 父组件
const startNumber = ref(1)

function addNumber() {
  startNumber.value++
}
</script>
```

第二种

```vue
  <!-- 子组件计算好并传递给父组件, 父组件只管赋值 -->
  <button @click="$emit('setNumber', props.start+1)">Click {{ props.start }}</button>

<script setup>
// 父组件
function setNumber(n) {
  startNumber.value = n;
}
</script>

<template>
  <!-- 父组件监听add-number事件  -->
  <ButtonCounter :start="startNumber" @set-number="setNumber" />
</template>
```

:::

<br />

### 数据双向绑定

文档：[https://cn.vuejs.org/guide/components/v-model.html](https://cn.vuejs.org/guide/components/v-model.html)

::: details （1）简单用法，不够灵活，用来理解原理

`App.vue`

```vue
<script setup>
import ButtonCounter from "./ButtonCounter.vue";
import { ref } from "vue";

const startNumber = ref(1);
</script>

<template>
  <!-- 父组件使用数据双向绑定, 这相当于 -->
  <!-- :modelValue="startNumber" -->
  <!-- @update:modelValue="newValue => startNumber = newValue" -->
  <ButtonCounter v-model="startNumber" />
</template>

<style lang="scss" scoped></style>
```

`ButtonCounter.vue`

```vue
<script setup>
// 所以这里需要接收一个叫做 modelValue 的变量
const props = defineProps({
  modelValue: {
    type: Number
  }
});
</script>

<template>
  <!-- 子组件计算好并传递给父组件, 父组件只管赋值 -->
  <!-- 子组件触发 update:modelValue 事件 -->
  <button @click="$emit('update:modelValue', props.modelValue + 1)">
    Click {{ props.modelValue }}
  </button>
</template>

<style lang="scss" scoped></style>
```

:::

::: details （2）使用自定义的变量

`App.vue`

```vue
<script setup>
import ButtonCounter from './ButtonCounter.vue'
import { ref } from 'vue'

const startNumber = ref(1)
</script>

<template>
  <!-- 父组件使用数据双向绑定, 这相当于 -->
  <!-- :start="startNumber" -->
  <!-- @update:start="newValue => startNumber = newValue" -->
  <ButtonCounter v-model:start="startNumber" />
</template>

<style lang="scss" scoped></style>
```

`ButtonCounter.vue`

```vue
<script setup>
// 所以这里需要接收一个叫做 start 的变量
const props = defineProps({
  start: {
    type: Number
  }
})
</script>

<template>
  <!-- 子组件计算好并传递给父组件, 父组件只管赋值 -->
  <!-- 子组件触发 update:start 事件 -->
  <button @click="$emit('update:start', props.start + 1)">Click {{ props.start }}</button>
</template>

<style lang="scss" scoped></style>
```

:::

::: details （3）自定义v-model修饰符

`App.vue`

```vue
<script setup>
import ButtonCounter from './ButtonCounter.vue'
import { ref } from 'vue'

const message = ref('Hello Vue')
</script>

<template>
  <!-- 自定义修饰符uppercase，使字母全部大写  -->
  <!-- WebStorm这里需要优化, 不认自定义修饰符 -->
  <ButtonCounter v-model:message.uppercase="message" />
</template>

<style lang="scss" scoped></style>
```

`ButtonCounter.vue`

```vue
<script setup>
const props = defineProps({
  message: String,
  // modelModifiers用来接收修饰符, 固定写法
  // 因为我们给modelValue起了别名, 所以modelModifiers的名字需要对应改一下
  // 本来是 default: ( ) => return {};
  // 一行的话 return 可以省略，但是只写 {} 也不行，所以加个括号
  messageModifiers: { default: () => ({}) }
})

const emit = defineEmits(['update:message'])

function handleMessage() {
  let message = props.message
  // props.messageModifiers => {uppercase: true}
  if (props.messageModifiers.uppercase) {
    message = message.toUpperCase()
  }
  emit('update:message', message)
}
</script>

<template>
  <!-- 子组件计算好并传递给父组件, 父组件只管赋值 -->
  <!-- 子组件触发 update:start 事件 -->
  <button @click="handleMessage">Click {{ message }}</button>
</template>

<style lang="scss" scoped></style>
```

:::

<br />

### 插槽 Slots

文档：[https://cn.vuejs.org/guide/components/slots.html](https://cn.vuejs.org/guide/components/slots.html)

::: details （1）基础示例

`App.vue`

```vue
<script setup>
import SlotForm from './SlotForm.vue'
import { ref } from 'vue'

const message = ref('Hello Vue')
</script>

<template>
  <!-- 变量是使用父组件的 -->
  <SlotForm>
    <button>{{ message }}</button>
  </SlotForm>
</template>

<style lang="scss" scoped></style>
```

`SlotForm.vue`

```vue
<script setup>
import { ref } from 'vue'

const inputValue = ref()

function handleClick() {
  alert(inputValue.value)
}
</script>

<template>
  <form>
    <input type="text" v-model="inputValue" autofocus />
    <!-- 插槽不可以直接绑定事件，所以在它前面包一层span, 注意不能写template -->
    <span @click.prevent="handleClick">
      <slot></slot>
    </span>
  </form>
</template>

<style lang="scss" scoped></style>
```

:::

::: details （2）具名插槽

普通插槽：父组件将模板通过插槽传递给子组件，子组件收到插槽，渲染，所有的操作插槽都是一个整体，很不灵活

具名插槽：我们可以给插槽的每部分命名一个名字，子组件可以灵活使用插槽每个名字

`App.vue`

```vue
<script setup>
import ContainerLayout from './ContainerLayout.vue'
</script>

<template>
  <ContainerLayout>
    <!-- 传递的插槽内容，这是一个整体，这样很不灵活 -->
    <!-- <div>header</div>-->
    <!-- <div>footer</div>-->

    <!-- 具名插槽，固定写法; 父组件中v-slot:header 可以简写成 #header -->
    <template v-slot:header>
      <div>header</div>
    </template>

    <!-- 具名插槽，固定写法; 父组件中v-slot:footer 可以简写成 #footer -->
    <template #footer>
      <div>footer</div>
    </template>
  </ContainerLayout>
</template>

<style lang="scss" scoped></style>
```

`ContainerLayout.vue`

```vue
<script setup></script>

<template>
  <!-- 接收的插槽内容，这也是一个整体，这很不灵活 -->
  <!-- <slot></slot>-->
  <!-- <div>content</div>-->

  <!-- 具名插槽，固定写法 -->
  <slot name="header"></slot>
  <div>content</div>
  <slot name="footer"></slot>
</template>

<style lang="scss" scoped></style>
```

:::

::: details （3）作用域插槽

子组件循环自己的数据放到某个标签内，但是这个标签是父组件通过插槽传递给子组件的，这时候可以这么写

`App.vue`

```vue
<script setup>
import SlotList from './SlotList.vue'
</script>

<template>
  <SlotList>
    <!--  注意这里使用了 =，而不是冒号 -->
    <template v-slot="props">
      <div>{{ props.item }}</div>
    </template>
  </SlotList>
</template>

<style lang="scss" scoped></style>
```

`SlotList.vue`

```vue
<script setup>
import { ref } from 'vue'

const list = ref([1, 2, 3])
</script>

<template>
  <div>
    <slot v-for="item in list" :item="item"></slot>
  </div>
</template>

<style lang="scss" scoped></style>
```

:::

<br />

### 内置的组件

<br />



## 应用规模化

### 常用UI库

Element Plus：[https://element-plus.org/zh-CN](https://element-plus.org/zh-CN)

::: details （1）初始化

安装

```bash
# 安装 ElementPlus
npm install element-plus --save

# 安装 ElementPlus图标
npm install @element-plus/icons-vue
```

完整引入和全局配置：`main.js`

```javascript
// Vue 核心导入
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

// ElementPlus 核心导入
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

app.use(ElementPlus, { size: "small", zIndex: 3000 });

// ElementPlus 图标导入
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// Vue App挂载
app.mount("#app");
```

测试：`App.vue`

```vue
<script setup></script>

<template>
  <div class="common-layout">
    <el-container>
      <el-container>
        <el-aside width="200px">
          Aside
          <el-icon>
            <CaretLeft />
          </el-icon>
        </el-aside>
        <el-container>
          <el-header>
            Header
            <el-icon>
              <Setting />
            </el-icon>
          </el-header>
          <el-main>
            Main
            <el-icon>
              <IceTea />
            </el-icon>
          </el-main>
          <el-footer>
            Footer
            <el-icon>
              <Location />
            </el-icon>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.common-layout .el-header,
.common-layout .el-footer,
.common-layout .el-main,
.common-layout .el-aside {
  display: flex;
  justify-content: center;
  align-items: center;
}

.common-layout .el-header,
.common-layout .el-footer {
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
  text-align: center;
}

.common-layout .el-aside {
  background-color: var(--el-color-primary-light-8);
  color: var(--el-text-color-primary);
  text-align: center;
}

.common-layout .el-main {
  background-color: var(--el-color-primary-light-9);
  color: var(--el-text-color-primary);
  text-align: center;
  height: 150px;
}

.el-icon {
  font-size: 21px;
  margin-left: 5px;
}
</style>
```

:::

<br />

### 路由管理

Vue Router：[https://router.vuejs.org/zh](https://router.vuejs.org/zh)

::: details （1）初始化

1、安装

```bash
npm install vue-router@4
```

<br />

2、创建2个测试组件

`Home.vue`

```vue
<script setup></script>

<template>
  <p>Home</p>
</template>

<style lang="scss" scoped></style>
```

`About.vue`

```vue
<script setup></script>

<template>
  <p>About</p>
</template>

<style lang="scss" scoped></style>
```

`App.vue`

```vue
<script setup></script>

<template>
  <!-- router-link 是路由跳转的一种方式 -->
  <router-link to="/">Home</router-link>|
  <router-link to="/about">About</router-link><br />

  <!-- router-view 用于展示路由内容 -->
  <router-view></router-view>
</template>

<style lang="scss" scoped></style>
```

<br />

3、创建路由

src/router/index.js（在src目录下创建router目录，在router目录下创建index.js文件）

```javascript
import { createRouter, createWebHashHistory } from "vue-router";

// 导入组件, @在vite.config.js中默认定义, 一般代指的是项目下的src目录
import Home from "@/Home.vue";
import About from "@/About.vue";

// 定义静态路由
const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About }
];

// 创建路由
const router = createRouter({
  // 用于管理路由历史记录
  history: createWebHashHistory(),
  // 指定路由, routes: routes 的缩写
  routes
});

export default router;
```

<br />

4、加载路由

`main.js`

```javascript
// Vue Router 核心导入
import router from '@/router'
app.use(router)
```

<br />

5、访问测试

:::

::: details （2）路由跳转的几种方式

文档：[https://router.vuejs.org/zh/guide/essentials/navigation.html](https://router.vuejs.org/zh/guide/essentials/navigation.html)

1、router-link：跳转到静态路由

```vue
<script setup></script>

<template>
  <!-- router-link 是路由跳转的一种方式 -->
  <router-link to="/">Home</router-link>|
  <router-link to="/about">About</router-link><br />

  <!-- router-view 用于展示路由内容 -->
  <router-view></router-view>
</template>

<style lang="scss" scoped></style>
```

2、router.push：向history添加一个新的记录，所以支持浏览器回退

```vue
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function handleHome() {
  router.push('/')
}

function handleAbout() {
  router.push('/about')
}
</script>

<template>
  <!-- 定义导航 -->
  <span @click="handleHome">Home</span>|
  <span @click="handleAbout">About</span><br />

  <!-- router-view用于展示新路由的内容 -->
  <router-view></router-view>
</template>

<style lang="scss" scoped></style>
```

3、router.replace：替换当前路由位置，并不会向history添加新记录，所以不支持浏览器回退

```vue
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function handleHome() {
  router.replace('/')
}

function handleAbout() {
  router.replace('/about')
}
</script>

<template>
  <!-- 定义导航 -->
  <span @click="handleHome">Home</span>|
  <span @click="handleAbout">About</span><br />

  <!-- router-view用于展示新路由的内容 -->
  <router-view></router-view>
</template>

<style lang="scss" scoped></style>
```

:::

::: details （3）导航守卫

文档：[https://router.vuejs.org/zh/guide/advanced/navigation-guards.html](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)



:::

<br />

### 状态管理

Pinia：[https://pinia.vuejs.org/zh](https://pinia.vuejs.org/zh)

::: details （1）初始化

:::

<br />

### 常用模块

Axios：[https://axios-http.com](https://axios-http.com)

Apache ECharts：[https://echarts.apache.org/](https://echarts.apache.org/)

<br />

### 打包编译

<br />

## 等待整理

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

