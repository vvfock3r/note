# Vue3

## 文档

官网：[https://cn.vuejs.org](https://cn.vuejs.org)

<br />

## 初始化项目

安装文档：[https://cn.vuejs.org/guide/quick-start.html](https://cn.vuejs.org/guide/quick-start.html)

::: details 点击查看详情

```bash
C:\Users\Administrator\Desktop>npm init vue@latest
Need to install the following packages:
  create-vue@3.6.1
Ok to proceed? (y) y

Vue.js - The Progressive JavaScript Framework

√ Project name: ... demo
√ Add TypeScript? ... No / Yes
√ Add JSX Support? ... No / Yes
√ Add Vue Router for Single Page Application development? ... No / Yes
√ Add Pinia for state management? ... No / Yes
√ Add Vitest for Unit Testing? ... No / Yes
√ Add an End-to-End Testing Solution? » No
√ Add ESLint for code quality? ... No / Yes
√ Add Prettier for code formatting? ... No / Yes

Scaffolding project in C:\Users\Administrator\Desktop\demo...

Done. Now run:

  cd demo
  npm install
  npm run format
  npm run dev

npm notice
npm notice New major version of npm available! 8.15.1 -> 9.6.6
npm notice Changelog: https://github.com/npm/cli/releases/tag/v9.6.6
npm notice Run npm install -g npm@9.6.6 to update!
npm notice
```

:::

<br />

## 组合式API（CompositionAPI）

### Hello Vue

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

// 注释此行,因为此文件已经被我们删除
// import './assets/main.css'

createApp(App).mount('#app')
```

说明

1、`index.html`是项目入口，他会引用`src/main.js`

2、`main.js`会创建`Vue App`，并挂载到HTML中`id="app"`的div上

3、`App.vue`在这里已经是一个单文件组件

:::

<br />

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

<style lang="scss" scoped>

</style>
```

:::

::: details （2）编写一个计数器：使用 ref 封装基本数据类型为响应式

`App.vue`

```vue
<script setup>
import {ref} from "vue";

// 使用ref封装计数器，原理：
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

<style lang="scss" scoped>

</style>
```

:::

<br />

### 引用类型响应式封装 reactive

::: details 点击查看详情

`App.vue`

```vue
<script setup>
import {reactive} from "vue";

// 使用 reactive 封装引用类型为响应式对象
const person = reactive({name: "jack"})

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





### watch侦听器

`App`

```vue
<template>
    <div>
        Name: <input v-model="name" type="text">
    </div>
    <div>
        Name is {{ name }}
    </div>

</template>

<script>

import {ref, watch} from 'vue';

export default {
    name: "App",

    setup() {
        const name = ref("dell");

        // lazy，首页页面加载的时候不会执行这个函数
        // 参数可以拿到当前值和原始值
        // 如果要监听一个对象中某个kv，watch第一个参数写成箭头函数，返回要监听的 对象.key
        watch(name, (currentValue, prevValue) => {
            console.log(currentValue);
            console.log(prevValue);
        })

        return {name};
    }
}
</script>

<style scoped>
</style>
```

让watch监听器立即执行

`App.vue`

```vue
<template>
    <div>
        Name: <input v-model="name" type="text">
    </div>
    <div>
        Name is {{ name }}
    </div>

</template>

<script>

import {ref, watch} from 'vue';

export default {
    name: "App",

    setup() {
        const name = ref("dell");

        // 让watch立即执行，在第三个参数中添加 immediate: true
        watch(name, (currentValue, prevValue) => {
            console.log(currentValue);
            console.log(prevValue);
        }, {immediate: true})

        return {name};
    }
}
</script>

<style scoped>
</style>
```





同时监听多个对象

`App.vue`

```vue
<template>
    <div>
        Name: <input v-model="nameObj.name" type="text">
    </div>
    <div>
        Name is {{ nameObj.name }}
    </div>


    <div>
        englishName: <input v-model="nameObj.englishName" type="text">
    </div>
    <div>
        englishName is {{ nameObj.englishName }}
    </div>

</template>

<script>

import {reactive, watch} from 'vue';

export default {
    name: "App",

    setup() {
        const nameObj = reactive({name: "dell", englishName: "lee"});

        // 可以同时监听多个对象
        watch([() => nameObj.name, () => nameObj.englishName],
            ([currentName, currentEng], [prevName, prevEng]) => {
                console.log(currentName);
                console.log(prevName);
                console.log(currentEng);
                console.log(prevEng);
            })

        return {nameObj};
    }
}
</script>

<style scoped>
</style>
```





### watchEffect侦听器

`App.vue`

```vue
<template>
    <div>
        Name: <input v-model="name" type="text">
    </div>
    <div>
        Name is {{ name }}
    </div>


    <div>
        englishName: <input v-model="englishName" type="text">
    </div>
    <div>
        englishName is {{ englishName }}
    </div>

</template>

<script>

import {reactive, watch, toRefs, watchEffect} from 'vue';

export default {
    name: "App",

    setup() {
        const nameObj = reactive({name: "dell", englishName: "lee"});

        // 可以同时监听多个对象
        watch([() => nameObj.name, () => nameObj.englishName],
            ([currentName, currentEng], [prevName, prevEng]) => {
                console.log('watch ', currentName, prevName, '---', currentEng, prevEng);
            })

        // watchEffect和watch类似，不同在于
        //  ①watchEffect是非惰性的，一开始就执行
        //  ②watchEffect内部调用了外部变量时，当外部变量改变时才会执行这个函数，如果没有依赖，就不会执行；也就是说
        //      自动感知内部函数的依赖
        //  ③watchEffect只能获取到数据当前值，不能获取之前的值
        watchEffect(() => {
            console.log("watchEffect: abc");
            console.log("watchEffect: ", nameObj.name);
        })

        //
        const {name, englishName} = toRefs(nameObj);
        return {name, englishName}
    }
}
</script>

<style scoped>
</style>
```



### 让监听器失效

`App.vue`

```vue
<template>
    <div>
        Name: <input v-model="name" type="text">
    </div>
    <div>
        Name is {{ name }}
    </div>


    <div>
        englishName: <input v-model="englishName" type="text">
    </div>
    <div>
        englishName is {{ englishName }}
    </div>

</template>

<script>

import {reactive, watch, toRefs} from 'vue';

export default {
    name: "App",

    setup() {
        const nameObj = reactive({name: "dell", englishName: "lee"});

        // 侦听name属性
        const stop = watch(() => {
            return nameObj.name;
        }, (curValue, preValue) => {
            console.log(curValue, '---', preValue)
        });

        // 5秒后让侦听器失效
        setTimeout(() => {
            stop();
        }, 5000)

        const {name, englishName} = toRefs(nameObj);
        return {name, englishName}
    }
}
</script>

<style scoped>
</style>
```



### 生命周期函数

函数名就是多了一个on

`App.vue`

```vue
<template>
    <p>1</p>
</template>

<script>

import {onBeforeMount} from 'vue';


export default {
    name: "App",

    setup() {
        onBeforeMount(() => {
            console.log("onBeforeMount")
        })
        return {};
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



### 获取DOM节点ref

`App.vue`

```vue
<template>
    <p ref="hello">Hello World</p>
</template>

<script>


import {ref, onMounted} from 'vue';


export default {
    name: "App",
    setup() {
        // 定义一个变量，变量名要和上面模板中ref的值一样，ref(null)是固定写法
        const hello = ref(null);
        
        onMounted(() => {
            console.log(hello.value);
        })

        // 这里一定要return hello
        return {hello};
    }
}
</script>

<style scoped>
</style>
```

<br />

## 选项式API（Options API，不推荐）

### 编写一个计时器

::: details 点击查看详情

`App.vue`

```vue
<template>
    <!-- 通过使用{{ }}来引用变量  -->
    <div>{{value}}</div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            value: 1
        }
    },
    // 当页面加载完成后，会执行mounted函数
    mounted() {
        setInterval(() => {
            // this.value实际上 this.$data.value的简写
            this.$data.value += 1
        }, 1000)
    }
}
</script>

<style scoped>
</style>
```

:::

<br />

### 模板变量

`App.vue`

```vue
<template>
    <div>
        <!-- 使用{{}}可以直接引用数据 -->
        <p>{{ item }}</p>

        <!-- {{ }}内还可以写JS表达式 -->
        <p>{{ 'a' + 'b'}}</p>
        <p>{{ Math.abs(-100) }}</p>

        <!-- 注意不能写JS语句 -->
        <!-- {{ if (1<2) {console.log("1小于2")}}} -->
    </div>
</template>

<script>

export default {
    name: "App",
    data() {
        return {
            item: "Hello",
        }
    },
}
</script>

<style scoped>
</style>
```



### 样式

`App.vue`

```vue
<template>
    <!-- 使用类的时候 -->
    <!-- 直接写类名 -->
    <p class="p1">Hello World!</p>
    <!-- 动态绑定属性，写一个对象，对象的key为类名，值为true或false -->
    <p :class="p2Object">Hello World!</p>
    <!-- 动态绑定属性，写一个数组， -->
    <p :class="p3Array">Hello World!</p>


    <!-- 行内样式 -->
    <!-- 直接写样式即可，但是样式一旦多起来，写起来就会很丑，不易维护 -->
    <p style="color: aqua;">Hello World!</p>
    <!-- 属性绑定的方式 -->
    <p :style="styleObj">Hello World!</p>

</template>

<script>

export default {
    name: "App",
    data() {
        return {
            p2Object: {p1: false, p2: true},
            p3Array: ["p1", "p2", "p3", {"p4": true, "p5": false}],

            styleObj: {
                color: "red",
                fontSize: "30px",
                fontWeight: "bold",
            }
        }
    },
}
</script>

<style scoped>
    .p1 {
        color: red;
    }

    .p2 {
        color: green;
    }

    .p3 {
        color: orange;
    }
</style>
```

![image-20210830223256448](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20210830223256448.png)



### 指令

#### v-for - 循环

`App.vue`

```vue
<template>
    <ul>
        <!-- 遍历数组值 -->
        <li v-for="item in list" :key="item">{{ item }}</li>
        <!-- 遍历数组值和索引 -->
        <li v-for="(item, index) in list" :key="index">{{ index }} {{ item }}</li>

        <!-- 遍历对象值 -->
        <li v-for="(value) in obj" :key="value">{{ value }}</li>
        <!-- 遍历对象值和key -->
        <li v-for="(value, key) in obj" :key="key">{{ key }} : {{ value }}</li>
        <!-- 遍历对象值、key和索引 -->
        <li v-for="(value, key, index) in obj" :key="index">{{ index }} {{ key }} : {{ value }}</li>
    </ul>
</template>

<script>

export default {
    name: "App",
    data() {
        return {
            list: ["Hello World!", "Hello Vue"],
            obj: {
                name: 'Bob',
                age: 21,
            }
        }
    },
}
</script>

<style scoped>
</style>
```

> ①`:key`key值用来提升`Vue`渲染性能，在循环的对象发生变化时，key值相同的便不会重复渲染
>
> ②`v-for`与`v-if`不能一起使用，解决方法见下面

循环中有判断的情况下

```vue
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

<script>

export default {
    name: "App",
    data() {
        return {}
    },
}
</script>

<style scoped>
</style>
```



#### v-on - 绑定事件

`App.vue` 

```vue
<template>
    <div>
        <button v-on:click="handleClick">添加列表</button>
        <ul>
            <li v-for="(item, index) of list">{{index}} {{item}}</li>
        </ul>
    </div>
</template>

<script>
// 点击按钮，屏幕出现新的li标签，内容为数字递增
// 每次点击button，会向数组中增加数据，vue检测到数据变化，会自动渲染到新的li标签
export default {
    name: "App",
    data() {
        return {
            list: []
        }
    },

    methods: {
        handleClick() {
            this.list.push(1)
        }
    }

}
</script>

<style scoped>
</style>
```

> `v-on: click`可以简写成`@click`



#### v-model - 数据双向绑定

`App.vue` 

```vue
<template>
    <div>
        <!-- v-model="对象"，数据双向绑定,意思是：input框中的值就是inputValue对象的值 -->
        <input type="text" v-model="inputValue">
        <button v-on:click="handleClick">添加列表</button>
        <ul>
            <li v-for="(item, index) of list">{{index}} {{item}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            list: [],
            inputValue: "",
        }
    },

    methods: {
        handleClick() {
            this.list.push(this.inputValue);
            this.inputValue = "";
        }
    }
}
</script>

<style scoped>
</style>
```



和表单元素相关的绑定

`App.vue`

```vue
<template>
    <div>
        <span>input双向绑定，初始值为字符串{{msg1}}</span>
        <input v-model="msg1" type="text">
    </div>

    <div>
        <span>textarea，正常写HTML要写双标签，这里只需要写单标签即可，初始值为字符串 {{msg2}}</span>
        <textarea v-model="msg2"/>
    </div>

    <div>
        <span>checkbox复选框，初始值可以为布尔值{{msg3}}</span>
        <input v-model="msg3" type="checkbox">
    </div>

    <div>
        <span>checkbox复选框，当有多个checkbox时，初始值可以为数组{{msg4}}</span>
        <input v-model="msg4" type="checkbox" value="box1">
        <input v-model="msg4" type="checkbox" value="box2">
        <input v-model="msg4" type="checkbox" value="box3">
    </div>

    <div>
        <span>radio单选框，初始值为字符串 {{msg5}}</span>
        <input v-model="msg5" type="radio" value="r1">
        <input v-model="msg5" type="radio" value="r2">
    </div>

    <div>
        <span>select选择框-单选，初始值为字符串 {{msg6}}</span>
        <select v-model="msg6">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
    </div>

    <div>
        <span>select选择框-多选（按住Ctrl），需要在select上添加multiple属性，初始值为数组 {{msg7}}</span>
        <select v-model="msg7" multiple>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
    </div>

    <div>
        <span>checkbox选中或者不选中，自定义值 {{msg8}}</span>
        <input v-model="msg8" type="checkbox" true-value="hello" false-value="world">
    </div>
</template>

<script>

export default {
    name: "App",
    data() {
        return {
            msg1: "hello1",
            msg2: "hello2",
            msg3: true,
            msg4: [],
            msg5: '',
            msg6: '2',
            msg7: [],
            msg8: "hello",
        }
    },
}
</script>

<style scoped>
    div {
        height: 100px;
        border-bottom: 1px solid #abc;
    }
</style>
```







#### v-bind - 属性双向绑定

`App.vue` 

```vue
<template>
    <div>
        <!-- 数据双向绑定 -->
        <input v-model="inputValue" type="text">
        <!-- 属性双向绑定，当鼠标移动到按钮上时提示 input框中的内容 -->
        <button v-bind:title="inputValue">我是按钮</button>
    </div>
</template>

<script>

export default {
    name: "App",
    data() {
        return {
            inputValue: "",
        }
    },
}
</script>

<style scoped>
</style>
```

> `v-bind:title` 可以简写成 `:title`



#### v-html - 渲染HTML

`App.vue`

```vue
<template>
    <ul v-html="item">
    </ul>
</template>

<script>

export default {
    name: "App",
    data() {
        return {
            item: "<li>Hello</li>",
        }
    },
}
</script>

<style scoped>
</style>
```



#### v-once - 渲染一次后就不再渲染

`main.js`

```javascript
import {createApp} from 'vue'
import App from './App.vue'

const app = createApp(App);
const vm = app.mount("#app");
vm.$data.item = "ABC"
```

`App.vue`

```vue
<template>
    <ul>
        <li v-once>{{item}}</li>
    </ul>
</template>

<script>

export default {
    name: "App",
    data() {
        return {
            item: "Hello",
        }
    },
}
</script>

<style scoped>
</style>
```



#### v-if和v-show - 标签是否展示

`App.vue`

```vue
<template>
    <ul>
        <!-- v-if通过控制DOM存在与否来控制是否显示 -->
        <li v-if="show">{{item}}</li>

        <!-- v-show通过控制样式(display:none)来控制是否显示 -->
        <li v-show="show">{{item}}</li>

        <!-- v-if的其他用法, 如果show为true，显示if，否则显示else  -->
        <!-- 同理，还有v-else-if  -->
        <!-- 要注意这俩标签必须贴到一块来写，否则会报语法错误  -->
        <li v-if="show">if</li>
        <li v-else-if="show2">else-if</li>
        <li v-else>else</li>

    </ul>
</template>

<script>

export default {
    name: "App",
    data() {
        return {
            item: "Hello",
            show: false,
            show2: true,
        }
    },
}
</script>

<style scoped>
</style>
```



### 动态指令

#### 动态属性名

`App.vue`

```vue
<template>
	<!-- 动态属性，属性名name是一个变量 -->
    <p :[name]="value">Hello</p>
</template>

<script>

export default {
    name: "App",
    data() {
        return {
            // name: 'title',
            // value: "ABC",
            name: "style",
            value: "color: red;"
        }
    },
}
</script>

<style scoped>
</style>
```



#### 动态事件名

`App.vue`

```vue
<template>
    <p @[event]="handleClick">点我</p>
</template>

<script>

export default {
    name: "App",
    data() {
        return {
            value: 0,
            event: "click",
        }
    },
    methods: {
        handleClick() {
            this.value = this.value === 1 ? 0 : 1;
            alert(this.value);
        }
    }
}
</script>

<style scoped>
</style>
```



### 方法/属性/监听器



#### 方法

* 方法不能使用箭头函数，原因是：箭头函数中的this指向的是外层的this，一层层向上找上去，最终找到`window`对象

* 默认方法会有一个`event`对象，代表发生事件的对象

* 我们也可以自己给方法传参，但这时候event对象就没了，需要手动在模板中传递`$event`

`App.vue`

```vue
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

    <!-- 自己传参 -->
    <div>
        <button @click="add3(2)">按钮</button>
        <span>{{ value3 }}</span>
    </div>

    <!-- 自己传参,并且还想要event -->
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

<script>

export default {
    name: "App",
    data() {
        return {
            value1: 0,
            value2: 0,
            value3: 0,
            value4: 0,
            value5: 0,
        }
    },
    methods: {
        add1() {
            this.value1 += 1;
        },
        add2(event) {
            alert(event.target);
            this.value2 += 1;
        },
        add3(n) {
            this.value3 += n;
        },
        add4(n, event) {
            alert(event.target);
            this.value4 += n;
        },
        add5() {
            this.value5 += 1;
        },
        add6() {
            this.value5 += 1;
        },
    }
}
</script>

<style scoped>
</style>
```



#### 事件修饰符

`App.vue`

```vue
<template>
    <span>没有任何修饰符情况下，点击外层div,外层数字+1；点击内层div，内层div和外层div都会+1，因为</span>
    <div class="div1" @click="div1Click">
        {{ item1 }}
        <div class="div2" @click="div2Click">{{ item2 }}</div>
    </div>

    <span>要想让上面，子div执行click，不让父div执行自己的click，可以这样做(一)</span>
    <br/>
    <span>阻止冒泡阶段事件传播，等同于 e.stopPropagation()</span>
    <div class="div1" @click="div1Click">
        {{ item1 }}
        <div class="div2" @click.stop="div2Click">{{ item2 }}</div>
    </div>

    <span>要想让上面，子div执行click，不让父div执行自己的click，可以这样做(二)</span>
    <br/>
    <span>self代表只有点击的是自己才会触发</span>
    <div class="div1" @click.self="div1Click">
        {{ item1 }}
        <div class="div2" @click="div2Click">{{ item2 }}</div>
    </div>

    <span>事件捕获阶段capture</span>
    <div class="div1" @click.capture="div1Click">
        {{ item1 }}
        <div class="div2" @click="div2Click">{{ item2 }}</div>
    </div>

    <span>事件只执行一次(只给外层div加了)</span>
    <div class="div1" @click.once="div1Click">
        {{ item1 }}
        <div class="div2" @click="div2Click">{{ item2 }}</div>
    </div>

    <span>passive,和滚动相关，视频没细讲</span>
    <div class="div1" @click.passive="div1Click">
        {{ item1 }}
        <div class="div2" @click="div2Click">{{ item2 }}</div>
    </div>
</template>

<script>

export default {
    name: "App",
    data() {
        return {
            item1: 1,
            item2: 2,
        }
    },
    methods: {
        div1Click() {
            alert(this.item1);
        },
        div2Click() {
            alert(this.item2);
        }
    }

}
</script>

<style scoped>
    div {
        border: 1px solid #abc;
        margin-bottom: 10px;
    }

    .div1 {
        width: 200px;
        height: 200px;
    }

    .div2 {
        width: 100px;
        height: 100px;

    }
</style>
```

#### 按键修饰符

`App.vue`

```vue
<template>
    <div>
        <span>按键修饰符，按下任意键都会触发</span>
        <input @keydown="keydown" type="text">
    </div>

    <div>
        <span>Enter回车键</span>
        <input @keydown.enter="keydown" type="text">
    </div>

    <div>
        <span>其他按键：tab,delete,esc,up,down,left,right</span>
    </div>
</template>

<script>

export default {
    name: "App",
    data() {
        return {
        }
    },
    methods: {
        keydown(e) {
            alert(e.code);
        }
    }

}
</script>

<style scoped>
</style>
```

#### 鼠标修饰符

`App.vue`

```vue
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

<script>

export default {
    name: "App",
    data() {
        return {}
    },
    methods: {
        btnClick() {
            alert("您点下了按钮");
        }
    }

}
</script>

<style scoped>
    div {
        height: 30px;
        margin-bottom: 15px;
    }
</style>
```

#### v-model修饰符

`App.vue`

```vue
<template>
    <div>
        <span>v-model正常情况，没有修饰符{{ msg1 }}</span>
        <input v-model="msg1" type="text">
    </div>

    <div>
        <span>v-model修饰符.lazy，当input失去焦点时才会触发数据改变 {{ msg2 }}</span>
        <input v-model.lazy="msg2" type="text">
    </div>

    <div>
        <span>v-model修饰符.number，做类型转换 {{ typeof msg3 }}</span>
        <input v-model.number="msg3" type="number">
    </div>

    <div>
        <span>v-model修饰符.trim，去除值前后空格 {{ msg4 }}</span>
        <input v-model.trim="msg4" type="text">
    </div>
</template>

<script>

export default {
    name: "App",
    data() {
        return {
            msg1: "",
            msg2: "",
            msg3: "0",
            msg4: "",
        }
    },
}
</script>

<style scoped>
    div {
        height: 100px;
        border-bottom: 1px solid #abc;
    }
</style>
```





#### 计算属性

（1）下面两个`p`标签都可以输出50，

（2）当总价格依赖的两个属性`price`和`count`任意一个改变，计算属性的值就会重新渲染

`App.vue`

```vue
<template>
    <p>{{ total }}</p>
    <p>{{ getTotal() }}</p>
</template>

<script>

export default {
    name: "App",
    data() {
        return {
            count: 5,
            price: 10,
        }
    },
    methods: {
        getTotal() {
            return this.count * this.price;
        }
    },
    computed: {
        total() {
            return this.count * this.price;
        }
    }
}
</script>

<style scoped>
</style>
```



那么使用`method`和`computed`有什么区别呢？看下面示例

`App.vue`

```vue
<template>
    <p>{{ total }}</p>
    <p>{{ getTotal() }}</p>
    <p>{{ message }}</p>
</template>

<script>

export default {
    name: "App",
    data() {
        return {
            count: 5,
            price: 10,
            message: "随便写点东西"
        }
    },
    methods: {
        getTotal() {
            return Date.now();
        },
    },
    computed: {
        total() {
            return Date.now();
        }
    },
    mounted() {
        setTimeout(() => {
            this.message = "oh, 我改变了!"
        }, 3000)
    }
}
</script>

<style scoped>
</style>
```

结论：

* 计算属性computed会缓存，只有当依赖的数据发生改变属性才会改变，

* 方法是其他数据变了，方法也会重新渲染

* 当页面刷新后，两种方式都会重新渲染

再次总结：

* `method`和`computed`都能满足我们要求的话，推荐使用`computed`，因为有缓存，性能会高一些



#### 侦听器

当监听的对象发生改变时，执行相应的代码

`App.vue`

```vue
<template>
    <p>{{ total }}</p>
    <p>{{ getTotal() }}</p>
</template>

<script>

export default {
    name: "App",
    data() {
        return {
            count: 5,
            price: 10,
        }
    },

    watch: {
        price(current, prev) {
            console.log("price changed", current, prev)
        }
    },

    methods: {
        getTotal() {            
            return Date.now();
        },
    },
    computed: {
        total() {
            return Date.now();
        }
    }
}
</script>

<style scoped>
</style>
```

侦听器和计算属性很像，有什么区别呢？

`App.vue`

```vue
<template>
    <p>计算属性Total: {{ getTotal }}</p>
    <p>侦听器Total: {{ total }}</p>
</template>

<script>

export default {
    name: "App",
    data() {
        return {
            count: 2,
            price: 5,
            total: 0,
        }
    },
    computed: {
        getTotal() {
            return this.count * this.price;
        }
    },
    watch: {
        count() {
            this.total = this.count * this.price;
        },
        price() {
            this.total = this.count * this.price;
        },
    },
    mounted() {
        this.total = this.count * this.price;
        
        setTimeout(() => {
            this.count = 3;
        }, 3000)
    }
}
</script>

<style scoped>
</style>
```

> 可以看到
>
> ①计算属性写法更加简介，推荐
>
> ②页面第一次渲染或刷新时，
>
> 计算属性一开始就能获取到最新的值，而侦听器需要`count`或`price`任意一个修改过后才能获取最新值，或者得借助mounted先计算一遍total的值



### 生命周期函数

#### 简介

在`某一时刻`会`自动执行`的函数

`App.vue`

```vue
<template>
    <div>
        {{ item }}
    </div>
</template>

<script>

export default {
    name: "App",
    data() {
        return {
            item: "Hello",
        }
    },
    // 要注意生命周期函数不写在methods里面
    // 在应用实例生成之前
    beforeCreate() {
        console.log("beforeCreate")
    },
    // 在应用实例生成之后
    created() {
        console.log("created")
    }
}
</script>

<style scoped>
</style>
```

#### 生命周期示意图

[https://v3.cn.vuejs.org/guide/instance.html#生命周期图示](https://v3.cn.vuejs.org/guide/instance.html#生命周期图示)

![实例的生命周期](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/lifecycle.svg)









#### 生命周期函数汇总

| 级别     | 函数名        | 说明                                                         |
| -------- | ------------- | ------------------------------------------------------------ |
| 应用级别 | beforeCreate  | 在应用实例生成之前自动执行                                   |
| ~        | created       | 在应用实例生成之后自动执行                                   |
| ~        | beforeMount   | 在应用实例挂载之前自动执行（组件数据被渲染到页面之前自动执行的函数） |
| ~        | mounted       | 在应用实例挂载之后自动执行                                   |
| 组件级别 | beforeUpdate  | 在组件数据发生变化前自动执行的函数                           |
| 组件级别 | updated       | 在组件数据发生变化后（且页面已经渲染完成后）自动执行的函数   |
| 应用级别 | beforeUnmount | 在应用实例卸载之前自动执行的函数                             |
| ~        | unmounted     | 在应用实例卸载之后自动执行的函数                             |







### 同步组件（重难点★★★★★）

#### 第一个组件

`Counter.vue`

```javascript
<template>
    <p @click="count += 1">{{ count }}</p>
</template>

<script>
export default {
    name: "Counter",
    data() {
        return {
            count: 0,
        }
    }
}
</script>

<style scoped>
</style>
```

`App.vue`

```javascript
<template>
    <div>
        <!-- 使用子组件 -->
        <Counter/>
        <Counter/>
        <Counter/>
    </div>
</template>

<script>
// 导入子组件
import Counter from "./Counter";

export default {
    name: "App",
    // 子组件注册在vue应用实例中，作为一个局部组件，与局部组件对应的还有全局组件，性能不高，不建议使用
    components: {Counter},
}
</script>

<style scoped>
</style>
```

总结：

这里调用了子组件3次，每个子组件被点击一下，显示的数字便+1,

各个组件之间数据独立



#### 组件间传值

##### ①简单示例

`Counter.vue`

```javascript
<template>
    <p @click="start += 1">{{ start }}</p>
</template>

<script>
export default {
    name: "Counter",
    props: {
        start: {
            type: Number,
            default: 0,
        }
    },
}
</script>

<style scoped>
</style>
```

`App.vue`

```javascript
<template>
    <div>
        <!-- 静态传参，传递过去是一个字符串 -->
        <!-- 子组件规定了数据类型，所以控制台会报一个提醒，并不会报错 -->
        <Counter start=1></Counter>

        <!-- 动态传参，类型也会传递过去 -->
        <Counter :start="start"></Counter>
    </div>
</template>

<script>
// 导入子组件
import Counter from "./Counter";

export default {
    name: "App",
    // 子组件注册在vue应用实例中，作为一个局部组件，与局部组件对应的还有全局组件，性能不高，不建议使用
    components: {Counter},
    data() {
        return {
            start: 1,
        }
    },
}
</script>

<style scoped>
</style>
```

总结：

父组件向子组件传值，通过在子组件填写属性来传，比如 

静态传参：`<Counter 属性=值><Counter />`

动态传参：`<Counter :属性=变量名><Counter />`



子组件通过`props`对象接收，还可以对传递过来的值做校验，比如

```javascript
props: {
	start: {
		type: Number,
        default: 0,
    }
},
```



##### ②校验参数

| 参数      | 说明                                                         |
| --------- | ------------------------------------------------------------ |
| type      | 数据类型，Number、String、Boolean、Array、Object、Function等 |
| required  | 是否必填，值为`true`或`false`，若参数不符合要求不会报错只会提醒 |
| default   | 默认值                                                       |
| validator | 参数校验，值是一个函数，函数参数是传入的值，函数返回结果为`true`或`false，若参数不符合要求不会报错只会提醒 |



③子组件中参数通信问题



##### ③参数很多优化

`App.vue`

```vue
<template>
    <div>
        <!-- 方式一：一个参数一个参数的写，参数数量太多时不建议  -->
        <Counter :a="a" :b="b" :c="c" :d="d" :e="e"></Counter>

        <!-- 方式二：使用v-bind绑定属性 -->
        <!-- v-bind="params" 等价于 :a="params.a" :b="params.b" ... -->
        <Counter v-bind="params"></Counter>

        <!-- 子组件接收，对于以上两种方式传递都可以正常工作 -->
    </div>
</template>

<script>
// 导入子组件
import Counter from "./Counter";

export default {
    name: "App",
    // 子组件注册在vue应用实例中，作为一个局部组件，与局部组件对应的还有全局组件，性能不高，不建议使用
    components: {Counter},
    data() {
        return {
            a: 1,
            b: 2,
            c: 3,
            d: 4,
            e: 5,

            params: {
                a: 1,
                b: 2,
                c: 3,
                d: 4,
                e: 5,
            }
        }
    },
}
</script>

<style scoped>
</style>
```

`Counter.vue`

```vue
<template>
    <p>{{a}}-{{b}}-{{c}}-{{d}}-{{e}}</p>
</template>

<script>
export default {    
    name: "Counter",
    // 这里为了方便，直接写个数组，实际用的时候建议写成对象形式，参数类型、校验啥的写清楚
    props: ['a', 'b', 'c', 'd', 'e'],
}
</script>

<style scoped>

</style>
```



##### ④传参命名问题

传递的时候使用 `小写单词-小写单词`

接收时候使用驼峰命名，`小写单词-首字母大写单词`

`App.vue`

```vue
<template>
    <div>
        <!-- 方式一：一个参数一个参数的写，参数数量太多时不建议  -->
        <Counter :start-number="startNumber"></Counter>
    </div>
</template>

<script>
// 导入子组件
import Counter from "./Counter";

export default {
    name: "App",
    // 子组件注册在vue应用实例中，作为一个局部组件，与局部组件对应的还有全局组件，性能不高，不建议使用
    components: {Counter},
    data() {
        return {
            startNumber: 100,
        }
    },
}
</script>

<style scoped>
</style>
```

`Counter.vue`

```vue
<template>
    <p>{{startNumber}}</p>
</template>

<script>
export default {
    name: "Counter",
    props: {
        startNumber: {
            type: Number,
            default: 0,
        }
    },
}
</script>

<style scoped>
</style>
```





##### ⑤Non-props属性

子组件不使用props接收值（props还可以正常写，只是不接收特定的值），

子组件只有一个根标签：

​		默认情况下，父组件传递的参数会放到子组件根标签上，

​		如果子组件不想要，可以设置`inheritAttrs: false`（和`data`、`props`等同级）

子组件有多个根标签：

​		默认就不会传递了，

​		如果某个子组件想要，设置`v-bind="$attrs"`，如果所有的子组件都想要，那么就都设置即可

​		mounted函数也可以用这些值，使用`this.$attrs`

一般样式可能用的会比较多

代码只演示第二个

`App.vue`

```vue
<template>
    <div>
        <!-- 方式一：一个参数一个参数的写，参数数量太多时不建议  -->
        <Counter :start-number="startNumber" class="colorRed"></Counter>
    </div>
</template>

<script>
// 导入子组件
import Counter from "./Counter";

export default {
    name: "App",
    // 子组件注册在vue应用实例中，作为一个局部组件，与局部组件对应的还有全局组件，性能不高，不建议使用
    components: {Counter},
    data() {
        return {
            startNumber: 100,
        }
    },
}
</script>

<style scoped>
</style>
```

`Counter.vue`

```vue
<template>
    <!-- 这里使用number -->
    <p @click="addNumber">{{number}}</p>
    <p @click="addNumber" v-bind="$attrs">{{number}}</p>
    <p @click="addNumber">{{number}}</p>
</template>

<script>
export default {
    name: "Counter",
    props: {
        startNumber: {
            type: Number,
            default: 0,
        }
    },
    data() {
        return {
            // 这里使用this.startNumber来代表父组件传递的值
            // 后续都使用number，而不会再使用startNumber
            number: this.startNumber,
        }
    },
    methods: {
        addNumber: function () {
            this.number += 1;
        }
    }
}
</script>

<style scoped>
    .colorRed {
        color: red;
    }
</style>
```



##### ⑥单项数据流

子组件可以读取父组件传递的数据，但是不能修改

解决办法：子组件定义自己的数据，值是父组件传递过来的，然后修改自己的数据

`App.vue`

```vue
<template>
    <div>
        <!-- 方式一：一个参数一个参数的写，参数数量太多时不建议  -->
        <Counter :start-number="startNumber"></Counter>
    </div>
</template>

<script>
// 导入子组件
import Counter from "./Counter";

export default {
    name: "App",
    // 子组件注册在vue应用实例中，作为一个局部组件，与局部组件对应的还有全局组件，性能不高，不建议使用
    components: {Counter},
    data() {
        return {
            startNumber: 100,
        }
    },
}
</script>

<style scoped>
</style>
```

`Counter.vue`

```vue
<template>
    <!-- 这里使用number -->
    <p @click="addNumber">{{number}}</p>
</template>

<script>
export default {
    name: "Counter",
    props: {
        startNumber: {
            type: Number,
            default: 0,
        }
    },
    data() {
        return {
            // 这里使用this.startNumber来代表父组件传递的值
            // 后续都使用number，而不会再使用startNumber
            number: this.startNumber,
        }
    },
    methods: {
        addNumber: function () {
            this.number += 1;
        }
    }
}
</script>

<style scoped>
</style>
```



##### ⑦子组件改变父组件数据

子组件监听自身事件，事件中使用`emit`通知父组件，父组件执行自己事件监听，修改数据，子组件重新渲染

`App.vue`

```vue
<template>
    <div>
        <!-- 父组件监听add-number事件  -->
        <Counter :start-number="startNumber" @add-number="addNumber"></Counter>
        <Counter :start-number="startNumber" @add-number="addNumber"></Counter>
    </div>
</template>

<script>
// 导入子组件
import Counter from "./Counter";

export default {
    name: "App",
    // 子组件注册在vue应用实例中，作为一个局部组件，与局部组件对应的还有全局组件，性能不高，不建议使用
    components: {Counter},
    data() {
        return {
            startNumber: 100,
        }
    },
    methods: {
        // 加上指定数
        addNumber(n) {
            if (typeof n === "undefined") {
                n = 1;
            }
            this.startNumber += n;
        }
    }
}
</script>

<style scoped>
</style>
```

`Counter.vue`

```vue
<template>
    <!-- 子组件触发自身事件 -->
    <p @click="addNumber">{{startNumber}}</p>
</template>

<script>
export default {
    name: "Counter",
    props: {
        startNumber: {
            type: Number,
            default: 0,
        }
    },
    methods: {
        addNumber: function () {
            // 事件函数向外触发 addNumber事件
            // 父组件需要使用add-number来监听
            // 如果需要传参，写到第二个参数即可
            this.$emit("addNumber");
        }
    }
}
</script>

<style scoped>
</style>
```

> 优化点：
>
> 子组件把最终计算好的结果发给父组件
>
> `Counter.vue`
>
> ```vue
>         addNumber: function () {
>             // 事件函数向外触发 addNumber事件
>             // 父组件需要使用add-number来监听
>             this.$emit("addNumber", this.startNumber + 5);
>         }
> ```
>
> 父组件直接重新赋值
>
> `App.vue`
>
> ```vue
>     methods: {
>         // 重新赋值
>         addNumber(n) {
>             this.startNumber = n;
>         }
>     }
> ```
>
> 
>
> 这种思路的好处：
>
> 当每个组件需要有不同规则处理数据时，之前的方式需要全部写在父组件中，现在这种方式单独写在子组件自己里面即可

------

> emits属性
>
> ​	子组件中可以定义emits属性，更加灵活实现某些功能
>
> emits属性为一个数组
>
> ​	值为触发事件的名字，目的是：让开发者一目了然能看到组件都会触发哪些事件
>
> emits属性为一个对象，可以校验向外触发事件的参数，返回值是布尔值，只会提醒不会报错
>
> ​	`Counter.vue`
>
> ```vue
>     emits: {
>         addNumber(n) {
>             return n > 200;
>         }
>     },
>     methods: {
>         addNumber: function () {
>             // 事件函数向外触发 addNumber事件
>             // 父组件需要使用add-number来监听
>             this.$emit("addNumber", this.startNumber + 5);
>         }
>     }
> ```

##### ⑧父子组件双向绑定

我们可以使用`v-model`来简化⑦步骤的代码

`App.vue`

```vue
<template>
    <div>
        <!-- 使用v-model进行数据绑定  -->
        <Counter v-model="startNumber"></Counter>
    </div>
</template>

<script>
// 导入子组件
import Counter from "./Counter";

export default {
    name: "App",
    // 子组件注册在vue应用实例中，作为一个局部组件，与局部组件对应的还有全局组件，性能不高，不建议使用
    components: {Counter},
    data() {
        return {
            startNumber: 100,
        }
    },
}
</script>

<style scoped>
</style>
```

`Counter.vue`

```vue
<template>
    <!-- 子组件触发自身事件 -->
    <p @click="addNumber">{{modelValue}}</p>
    <p @click="addNumber">{{modelValue}}</p>
</template>

<script>
export default {
    name: "Counter",
    // 接收父组件传递的值，必须使用modelValue，固定写法
    props: {
        modelValue: {
            type: Number,
        }
    },

    methods: {
        addNumber: function () {
            // update:modelValue是固定写法
            this.$emit("update:modelValue", this.modelValue + 3);
        }
    }
}
</script>

<style scoped>
</style>
```

> 这时候还有一个问题，如果参数多的话，怎么办？
>
> 可以给modelValue改一个名字，这样父组件就可以多次调用v-model了
>
> 父组件修改
>
> ​	`<Counter v-model:startNumber="startNumber"></Counter>` 
>
> 子组件后袖都使用startNumber来指明这个值
>
> ```vue
> <template>
>     <!-- 子组件触发自身事件 -->
>     <p @click="addNumber">{{startNumber}}</p>
>     <p @click="addNumber">{{startNumber}}</p>
> </template>
> 
> <script>
> export default {
>     name: "Counter",
>     // 接收父组件传递的值，必须使用modelValue，固定写法
>     props: {
>         startNumber: {
>             type: Number,
>         }
>     },
> 
>     methods: {
>         addNumber: function () {
>             // update:是固定写法
>             this.$emit("update:startNumber", this.startNumber + 3);
>         }
>     }
> }
> </script>
> 
> <style scoped>
> </style>
> ```

⑨自定义`v-model`修饰符

`App.vue`

```vue
<template>
    <div>
        <!-- 自定义修饰符uppercase，使字母全部大写  -->
        <Counter v-model:msg.uppercase="msg"></Counter>
    </div>
</template>

<script>
// 导入子组件
import Counter from "./Counter";

export default {
    name: "App",
    // 子组件注册在vue应用实例中，作为一个局部组件，与局部组件对应的还有全局组件，性能不高，不建议使用
    components: {Counter},
    data() {
        return {
            msg: 'a',
        }
    },
}
</script>

<style scoped>
</style>
```

`Counter.vue`

```vue
<template>
    <!-- 子组件触发自身事件 -->
    <p @click="addMsg">{{msg}}</p>
</template>

<script>
export default {
    name: "Counter",
    // 接收父组件传递的值，重命名modelValue，固定写法
    props: {
        msg: {
            type: String,
        },
        // 通过modelModifiers来接收修饰符，固定写法
        // 因为我们给modelValue起了别名了，所以modelModifiers的名字也要改一下
        msgModifiers: {
            // 本来是 default: ( ) => return { };
            // 一行的话 return 可以省略，但是只写 { } 也不行，所以加个括号
            default: () => ({}) // 给它一个默认值
        }
    },

    methods: {
        addMsg: function () {
            let newValue = this.msg + 'b';
            // 这里判断修饰符
            console.log(this.modelModifiers);
            if (this.msgModifiers.uppercase) {
                newValue = newValue.toUpperCase();
            }
            // update:是固定写法
            this.$emit("update:msg", newValue);
        }
    }
}
</script>

<style scoped>
</style>
```

##### ⑨插槽示例

使用`<slot>`来使用插槽

`App.vue`

```vue
<template>
    <Form>
        <!-- 变量是使用父组件的 -->
        <button>{{ submitMsg }}</button>
    </Form>

    <Form>
        <!-- 变量是使用父组件的 -->
        <div>{{ submitMsg }}</div>
    </Form>
</template>

<script>
// 导入子组件
import Form from "./Form";

export default {
    name: "App",
    components: {Form},
    data() {
        return {
            "submitMsg": "提交",
        }
    }
}
</script>

<style scoped>
</style>
```

`Form.vue`

```vue
<template>
    <form>
        <input type="text">

        <!-- 插槽不可以直接绑定事件，所以在它前面包一层HTML标签 -->
        <span @click.prevent="handleClick">
            <slot></slot>
        </span>
    </form>
</template>

<script>
export default {
    name: "Form",

    methods: {
        handleClick() {
            alert("123");
        }
    }
}
</script>

<style scoped>
</style>
```

> 插槽默认值
>
> ​	直接在子组件`<slot></slot>`中编写默认值即可

##### ⑩具名插槽

父组件将模板通过插槽传递给子组件，子组件收到插槽，渲染，所有的操作插槽都是一个整体，很不灵活

我们可以给插槽的每部分命名一个名字，子组件可以灵活使用插槽每个名字

`App.vue`

```vue
<template>
    <Layout>
        <!-- 传递的插槽内容，这是一个整体，这样很不灵活 -->
        <!-- <div>header</div>-->
        <!-- <div>footer</div>-->

        <!-- 具名插槽，固定写法 -->
        <template v-slot:header>
            <div>header</div>
        </template>

        <template v-slot:footer>
            <div>footer</div>
        </template>

    </Layout>
</template>

<script>
// 导入子组件
import Layout from "./Layout";

export default {
    name: "App",
    components: {Layout},
}
</script>

<style scoped>
</style>
```

`Layout.vue`

```vue
<template>
    <!-- 接收的插槽内容，这也是一个整体，这很不灵活 -->
    <!-- <slot></slot>-->
    <!-- <div>content</div>-->

    <!-- 具名插槽，固定写法 -->
    <slot name="header"></slot>
    <div>content</div>
    <slot name="footer"></slot>
</template>

<script>
export default {
    name: "Layout"
}
</script>

<style scoped>
</style>
```

> 父组件中`v-slot:header`可以简写成`#header`



##### ⑪作用域插槽

子组件循环自己的数据放到某个标签内，但是这个标签是父组件通过插槽传递给子组件的，这时候可以这么写

`App.vue`

```vue
<template>
    <List>
        <!--  注意这里使用了 =，而不是冒号 -->
        <template v-slot="slotProps">
            <div>{{slotProps.item}}</div>
        </template>
    </List>
</template>

<script>
// 导入子组件
import List from "./List";

export default {
    name: "App",
    components: {List},
}
</script>

<style scoped>
</style>
```

`List.vue`

```vue
<template>
    <div>
        <slot v-for="item in list" :item="item"></slot>
    </div>
</template>

<script>
export default {
    name: "List",
    data() {
        return {
            list: [1, 2, 3],
        }
    },
}
</script>

<style scoped>
</style>
```

##### ⑫动态组件

先看非动态组件形式的，缺点是代码写起来比较麻烦

`App.vue`

```vue
<template>
    <!-- v-if用来判断当前要显示哪个组件 -->
    <Message v-if="currentComponent === 'Message'"></Message>

    <!-- 当组件切换之后再切换，input框的内容就消失了，这时候需要使用keep-alive来解决 -->
    <!-- keep-alive有缓存特性 -->
    <keep-alive>
        <Input v-if="currentComponent === 'Input'"></Input>
    </keep-alive>
    <div style="margin-top: 15px;">
        <button @click="handleClick">切换组件</button>
    </div>
</template>

<script>
// 导入子组件
import Input from "./Input";
import Message from "./Message";

export default {
    name: "App",
    components: {Input, Message},
    data() {
        return {
            currentComponent: "Input",
        }
    },
    methods: {
        handleClick() {
            // 组件切换
            this.currentComponent = this.currentComponent === 'Input' ? 'Message' : 'Input';
        }
    }
}
</script>

<style scoped>
</style>
```

`Input.vue`

```vue
<template>
    <input type="text">
</template>

<script>
export default {
    name: "Input"
}
</script>

<style scoped>
</style>
```

`Message.vue`

```vue
<template>
    <div>Message</div>
</template>

<script>
export default {
    name: "Message"
}
</script>

<style scoped>
</style>
```

改成动态组件，只需要改`App.vue`

`App.vue`

```vue
<template>
    <!-- 这里不再写具体的组件名称了，而是用component组件 -->
    <keep-alive>
        <component :is="currentComponent"></component>
    </keep-alive>

    <div style="margin-top: 15px;">
        <button @click="handleClick">切换组件</button>
    </div>
</template>

<script>
// 导入子组件
import Input from "./Input";
import Message from "./Message";

export default {
    name: "App",
    components: {Input, Message},
    data() {
        return {
            currentComponent: "Input",
        }
    },
    methods: {
        handleClick() {
            // 组件切换
            this.currentComponent = this.currentComponent === 'Input' ? 'Message' : 'Input';
        }
    }
}
</script>

<style scoped>
</style>
```

##### 13、多级组件变量传递

`App.vue`

```vue
<template>
    <Child :msg="hello"></Child>
</template>

<script>
import Child from './Child'

export default {
    name: "App",
    components: {Child},
    data() {
        return {
            msg: "hello",
        }
    },

    // 数据定义再provide中的方式
    // provide: {
    //     msg: "hello provide",
    // }

    // 数据定义在data中的方式，provide改为一个函数的形式
    // data中的数据一旦改变，provide里面的不会改变，解决方案后面会讲
    provide() {
        return {
            msg: this.msg,
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
    <ChildChild></ChildChild>
</template>

<script>
import ChildChild from './ChildChild'

export default {
    name: "Child",
    components: {ChildChild},
}
</script>

<style scoped>
</style>
```

`ChildChild.vue`

````vue
<template>
    <p>{{ msg }}</p>
</template>

<script>
export default {
    name: "ChildChild",
    inject: {
        msg: {
            type: String,
            default: "Hello"
        }
    },
}
</script>

<style scoped>
</style>
````





### 异步组件

这个写的有问题

```
<template>
    <p>1</p>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
    setup() {
        return new Promise((resolve, reject) => {
            console.log(reject);
            setTimeout(() => {
                resolve({
                    template: `<div>Hello, i am async component</div>`,
                })
            }, 5000)
        })
    }
})
</script>

<style scoped>

</style>
```





### 过渡和动画

这部分先不看，后面补充



### 混入和Mixin（不推荐过度使用）

* 当组件中没有数据(`data`、`methods`、自定义属性`this.$options.属性`)的时候，使用Mixin混入的数据；如果组件本身有数据的话，不会使用Mixin的数据

* 如果是生命周期函数，会先执行Mixin中的，然后执行组件本身的
* Mixin在父组件引入，子组件不能使用，如果想用的话，需要在子组件引入才行，这种是局部Mixin

`App.vue`

```vue
<template>
    <p @click="handleClick">{{ counter }}</p>
    <p>{{ $options.customAttr }}</p>
</template>

<script>
const myMixin = {
    data() {
        return {
            counter: 2,
        }
    },
    methods: {
        handleClick() {
            alert("2");
        }
    },
    // 自定义属性，名字随便起
    customAttr: "customAttr2",
    mounted() {
        alert("mounted 2");
    }
}


export default {
    name: "App",
    // 混入
    mixins: [myMixin],

    // data和methods会覆盖Mixin中对应对象
    data() {
        return {
            counter: 1,
        }
    },
    methods: {
        handleClick() {
            alert("1");
        }
    },
    // 自定义属性，名字随便起
    customAttr: "customAttr1",

    // 生命周期函数不会覆盖，而是Mixin优先级更高先执行，组件自己的后执行
    mounted() {
        alert("mounted 1");
    },

}
</script>

<style scoped>
</style>
```

> 如果想改变优先级，那么在`App.vue`中修改
>
> `App.vue`
>
> ```vue
> import {createApp} from 'vue'
> import App from './App.vue'
> 
> const app = createApp(App);
> // 修改优先级
> app.config.optionMergeStrategies.customAttr = (minxinValue, appValue) =>{
>     return minxinValue || appValue;
> }
> const vm = app.mount("#app");
> console.log(vm);
> ```



### 自定义指令

先说使用非自定义指令，让input自动聚焦focus

这有一个问题，代码不能复用

#### 非自定义指令

`App.vue`

```vue
<template>
    <div>
        <input type="text" ref="input">
    </div>
</template>

<script>

export default {
    name: "App",
    mounted() {
        this.$refs.input.focus();
    }
}
</script>

<style scoped>
</style>
```

#### 自定义指令

`App.vue`

```vue
<template>
    <div>
        <!-- 使用自定义指令  -->
        <input v-focus type="text">
    </div>
</template>

<script>

// 自定义指令
const directives = {
    focus: {
        mounted(el) {
            el.focus();
        }
    }
}


export default {
    name: "App",
    directives: directives,
}
</script>

<style scoped>
</style>
```

#### 自定义指令带值

`App.vue`

```vue
<template>
    <!-- 使用自定义指令  -->
    <div v-pos="top" style="position: absolute;">
        <input type="text">
    </div>
</template>

<script>

// 自定义指令
// const directives = {
//     pos: {
//         // 第一次渲染的时候
//         mounted(el, binding) {
//             el.style.top = binding.value + 'px';
//         },
//         // 当数据改变时执行
//         updated(el, binding) {
//             el.style.top = binding.value + 'px';
//         },
//     }
// }

// 上面那个（mounted和updated一致的时候）有个简写
const directives2 = {
    pos: (el, binding) => {
        el.style.top = binding.value + 'px';
    }
}


export default {
    name: "App",
    directives: directives2,
    data() {
        return {
            top: 100,
        }
    }
}
</script>

<style scoped>
</style>
```



#### 自定义指令带:

`App.vue`

```vue
<template>
    <!-- 使用自定义指令  -->
    <div v-pos:left="left"  v-pos:top="top" style="position: absolute;">
        <input type="text">
    </div>
</template>

<script>



// 上面那个（mounted和updated一致的时候）有个简写
const directives2 = {
    pos: (el, binding) => {
        // binding.arg就是上面left
        console.log(binding);
        el.style.[binding.arg] = binding.value + 'px';
    }
}


export default {
    name: "App",
    directives: directives2,
    data() {
        return {
            left: 100,
            top: 100,
        }
    }
}
</script>

<style scoped>
</style>
```



### Teleport传送门

`teleport`可以将标签传送到指定的DOM节点下，比如下面做一个蒙层的效果

`App.vue`

```vue
<template>
    <div class="box">
        <button @click="handleClick">按钮</button>
        <!-- 遮罩层 -->
        <!-- teleport将div传送到body标签下面 -->
        <teleport to="body">
            <div v-show="show" class="mask">
                <!-- 这个按钮用来关闭遮罩层 -->
                <button @click="handleClick">关闭</button>
            </div>
        </teleport>
    </div>
</template>

<script>


export default {
    name: "App",
    methods: {
        handleClick() {
            this.show = !this.show;
        }
    },
    data() {
        return {
            show: false,
        }
    }
}
</script>

<style scoped>
    /* 水平垂直居中 */
    .box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        width: 200px;
        height: 200px;
        background-color: green;
    }

    /* 遮罩层 */
    .mask {
        /*width: 100%;*/
        /*height: 100%;*/
        /*background-color: black;*/
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: grey;
        opacity: .5;
    }
</style>
```



### Render函数

未实验成功

`App.vue`

```vue
<template>
    <MyTitle :level="2">
        hello
    </MyTitle>
</template>

<script>

import MyTitle from './MyTitle'

export default {
    name: "App"
}
</script>

<style scoped>
</style>
```

`MyTitle.vue`

```vue
<template>
    <slot></slot>
</template>

<script>
import vue from 'vue';

export default {
    name: "MyTitle",
    props: {
        level: {
            type: Number,
        }
    },
    render() {
        const {h} = vue;
        return h('h' + this.level, {}, this.$slots.default());
    }
}
</script>

<style scoped>

</style>
```



### 插件

第一个插件

`main.js`

```javascript
import {createApp} from 'vue'
import App from './App.vue'

// 自定义一个插件
const myPlugin = {
    install(app, options) {
        console.log(app);       // app实例
        console.log(options);   // {name: "vvfock3r"}

        app.provide('age', 20);
    }
}

const app = createApp(App);

app.use(myPlugin, {name: 'vvfock3r'});

const vm = app.mount("#app");
console.log(vm);
```

`App.vue`

```vue
<template>
    <p>{{ age }}</p>
</template>

<script>
export default {
    name: "App",
    inject: ['age'],
}
</script>

<style scoped>
</style>
```
