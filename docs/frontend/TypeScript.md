# TypeScript

官网：[https://www.typescriptlang.org](https://www.typescriptlang.org)

Github：[https://github.com/Microsoft/TypeScript](https://github.com/Microsoft/TypeScript)

## 搭建开发环境

### 安装Nodejs

```bash
C:\Users\Administrator\WebstormProjects\typescript_learn> node -v
v16.16.0

C:\Users\Administrator\WebstormProjects\typescript_learn> npm -v
npm WARN config global `--global`, `--local` are deprecated. Use `--location=global` instead.
8.15.1
```

### 安装TypeScript

文档：[https://www.typescriptlang.org/download](https://www.typescriptlang.org/download)

```bash
# 这里仅为了学习使用，所以使用全局安装
# 在真正写项目的时候使用 npm install typescript --save-dev
C:\Users\Administrator\WebstormProjects\typescript_learn> npm install -g typescript

# 查看typescript版本
C:\Users\Administrator\WebstormProjects\typescript_learn> tsc --version
Version 4.7.4
```

### TypeScript运行方式1

（1）首先创建一个ts文件：`demo.ts`

```typescript
function add(x: number, y: number): number {
    return x + y;
}

console.log(add(1, 2));
```

（2）使用`tsc`命令编译TypeScript为JavaScript文件

```bash
# 这会在当前目录下生成demo.js文件
C:\Users\Administrator\WebstormProjects\typescript_learn> tsc demo.ts
```

（2）使用`node`命令运行JavaScript文件

```bash
C:\Users\Administrator\WebstormProjects\typescript_learn> node demo.js 
3
```

### TypeScript运行方式2

```bash
# 安装ts-node
C:\Users\Administrator\WebstormProjects\typescript_learn> npm install -g ts-node

# 查看版本
C:\Users\Administrator\WebstormProjects\typescript_learn> ts-node -v
v10.9.1

# 编译并运行ts文件
C:\Users\Administrator\WebstormProjects\typescript_learn> ts-node demo.ts
3
```

### 注意IDE Warning告警

看下面一段代码，没有明显的问题，使用tsc编译不会报错，代码也可以正常运行，一切看起来那么美好

![image-20220803114251062](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220803114251062.png)

但是，我们将视线拉长就发现问题了

![image-20220803114820912](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220803114820912.png)

然后我们使用一下这个变量，发现提醒已经消失了

![image-20220803114906175](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220803114906175.png)

### TSC实时编译

使用`tsc -w`命令

<br />

## 类型注解

### 函数常用类型注解

```typescript
// 普通类型注解
function add(x: number, y: number): number {
    return x + y;
}

console.log(add(1, 2));

// 没有返回值的类型注解
function sayHello(): void {
    console.log("Hello World!")
}

sayHello();

// 永远不会执行到最后的函数 的类型注解
function forever(): never {
    while (true) {
    }
}

forever();

// 函数内做对象解构的类型注解
function add({first, second}: { first: number, second: number }): number {
    return first + second;
}

console.log(add({first: 1, second: 2}));

// 关于箭头函数，以下两种写法是等价的
const func1 = (str: string): number => {
    return parseInt(str, 10)
}
console.log(func1('3'));

const func2: (str: string) => number = (str) => {
    return parseInt(str, 10)
}
console.log(func2('4'));
```

### 联合类型注解

```typescript
// age可能为number类型，也可能为string类型
let age: number | string;

age = 18;
age = '18';
console.log(age);
```

### 数组类型注解

```typescript
// 数组内单一数据类型
const arr1: number[] = [1, 2, 3];
console.log(arr1);

// 数组内可能有多种数据类型
const arr2: (number | string)[] = [1, 2, 'a'];
console.log(arr2);
```

### 类型别名注解

```typescript
// 定义别名
type User = { name: string, age: number };

let arr1: User[] = [{
    name: "jack",
    age: 18
}]
console.log(arr1);

// 以下这种方式也是可以的
class Teacher {
    constructor(public name: string, public age: number) {
        this.name = name;
        this.age = age;
    }
}

let arr2: Teacher[] = [{
    name: "bob",
    age: 28
}]
console.log(arr2);
```

### 元组类型注解

```typescript
// 元组类型 => 数据结构必须一一匹配
// 可以应用于比如Excel、CSV等数据格式
const userInfo: [string, string, number] = ["bob", "man", 18]

console.log(userInfo);
```

### Interface接口

:::tip

Interface和type很像，通常情况下我们都是使用Interface，只有当Interface不能满足需求的时候，才会用type，比如定义基础类型

:::

#### （1）基础用法

```typescript
// 定义Interface, User是一个对象
interface User {
    name: string,
    age: number
}

let arr1: User[] = [{
    name: "jack",
    age: 18
}]
console.log(arr1);

// 定义Interface, login是一个函数
interface Hello {
    (username: string): string
}

const sayHello1: Hello = (username: string): string => {
    return "Hello " + username;
}
console.log(sayHello1("bob"));

// 这种方式该如何指定类型呢？
function sayHello2(username: string): string {
    return "Hello " + username;
}
```

#### （2）可有可无的属性

```typescript
// 定义Interface
interface User {
    name: string,
    age?: number        // age属性可有可无
}

let arr1: User[] = [
    {
        name: "jack",
        age: 18
    },
    {
        name: "bob",
    },
]
console.log(arr1);
```

#### （3）只读属性

```typescript
// 定义Interface
interface User {
    readonly name: string, // 只读属性
    age?: number        // age属性可有可无
}

let arr1: User[] = [
    {
        name: "jack",
        age: 18
    },
    {
        name: "bob",
    },
]
console.log(arr1);
arr1[0].name = "abc"    // 不可以修改
```

#### （4）允许其他值

```typescript
// 定义Interface
interface User {
    readonly name: string, // 只读属性
    age?: number        // age属性可有可无

    // User接口还允许有其他属性，类型不限制
    // 不写这行时,arr1会报错，arr2不会报错，原因是：字面量传值是强类型校验，变量传值是若类型校验
    // 写上这行后,arr1和arr2都不会报错
    [propName: string]: any;
}

let arr1: User[] = [{
    name: "jack",
    age: 18,
    sex: "man"
}]
console.log(arr1);

const bob = {
    name: "bob",
    age: 20,
    sex: "man"
}
let arr2: User[] = [bob]
console.log(arr2);
```

#### （5）定义满足接口的类

```typescript
// 定义Interface
interface User {
    readonly name: string, // 只读属性
    age?: number        // age属性可有可无
    [propName: string]: any; // 允许其他属性
}

// Person类要满足User接口
class Person implements User {
    public name;

    constructor(name: string) {
        this.name = name;
    }
}

const bob = new Person("bob");
console.log(bob);
```

#### （6）接口之间继承

```typescript
// 定义Interface
interface User {
    readonly name: string, // 只读属性
    age?: number        // age属性可有可无
    [propName: string]: any; // 允许其他属性
}

// Teacher接口继承自User接口
interface Teacher extends User {
    teach(): string
}

// Person类要满足Teacher接口
class Person implements Teacher {
    public name;

    constructor(name: string) {
        this.name = name;
    }

    teach(): string {
        return "Hello World!"
    }
}

const bob = new Person("bob");
console.log(bob);
```

### 类

#### （1）配置修改

:::tip 

（1）报错信息：`error TS2564: Property 'name' has no initializer and is not definitely assigned in the constructor`

报错代码

```typescript
class Person {
    name: string

    getName(): string {
        return this.name;
    }
}

const bob = new Person();
bob.name = "bob";
console.log(bob.getName());
```

解决方法：将`tsconfig.json`种的`strictPropertyInitialization`设置为`false`

:::

#### （2）访问类型

| 类型        | 说明                           |
| ----------- | ------------------------------ |
| `public`    | 允许在类内和类外使用           |
| `private`   | 只允许在类内使用               |
| `protected` | 只允许在类内和继承的子类内使用 |

（1）访问类型示例

```typescript
class Person {
    // name: string;                 // 默认情况下是 public类型，允许在类内和类外使用
    // private name: string;         // 只允许在类内使用
    protected name: string;          // 只允许在类内和继承的子类内使用

    constructor(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }
}

// 子类
class Teacher extends Person {
    getName(): string {
        return "[Teacher] " + this.name;
    }
}

const bob = new Person("bob");
console.log(bob.getName());
// console.log(bob.name);

const jack = new Teacher("jack");
console.log(jack.getName());
```

（2）constructor简化写法

```typescript
// 传统写法
class Person1 {
    protected name: string;          // 只允许在类内和继承的子类内使用

    constructor(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }
}

const bob = new Person1("bob");
console.log(bob.getName());

// 简化写法
class Person2 {
    constructor(protected name: string) {
    }

    getName(): string {
        return this.name;
    }
}

const jack = new Person2("jack");
console.log(jack.getName());
```

（3）子类constructor调用父类的constructor

```typescript
// 定义一个父类
class Person {
    constructor(protected name: string) {
    }

    getName(): string {
        return this.name;
    }
}

// 定义一个子类
class Teacher extends Person {
    constructor(age: number) {
        super("jack");    // 子类如果也定义了constructor，那么必须使用super来调用父类的constructor
    }
}

const jack = new Teacher(28);
console.log(jack.getName());
```

#### （3）get、set

:::tip

get、set可以让一个方法当作属性来使用

:::

```typescript
class Person {
    constructor(private _name: string) {
    }

    // get 用来获取值
    get name() {
        return "[" + this._name + "]";
    }

    // set 用来设置值
    set name(name) {
        this._name = name;
    }
}


const jack = new Person("jack");
// console.log(jack._name);  // 因为是私有属性，所以这里访问会报错
console.log(jack.name);  // 不需要加()
jack.name = "Jack"
console.log(jack.name);  // 不需要加()
```

#### （4）静态属性和方法

```typescript
class Demo {
    // 静态属性
    static fullName: string = "full name";

    // 静态方法
    static sayHello() {
        return "Hello World!"
    }
}


console.log(Demo.fullName);
console.log(Demo.sayHello());
```

#### （5）实战：单例模式

```typescript
class Demo {
    // private constructor 可以达到 不允许使用 new Demo() 来创建实例
    private constructor() {
    }

    // instance 用来存储实例
    private static instance: Demo;

    // 定义一个静态方法
    static getInstance() {
        if (!this.instance) {
            this.instance = new Demo();
        }
        return this.instance;
    }
}

const ins1: Demo = Demo.getInstance();
const ins2: Demo = Demo.getInstance();
console.log(ins1 === ins2); // true
```

#### （6）readonly

```typescript
class Person {
    // 默认为读写
    // public name: string;

    // 设置为只读
    public readonly name: string;

    constructor(name: string) {
        this.name = name;
    }
}


const bob = new Person("bob");
// bob.name = "bob1"           // 设置为只读后不可修改
console.log(bob.name);
```

#### （7）抽象类

```typescript
// 定义Demo为抽象类，抽象类不能直接被实例化
abstract class Demo {
    sayDemo(): string {
        return "Hello Demo";
    }

    abstract sayHello(): string;
}

// Demo1实现了抽象类
class Demo1 extends Demo {
    sayHello(): string {
        return "Hello Demo1!";
    }
}

const demo = new Demo1();
console.log(demo.sayHello());
console.log(demo.sayDemo());
```

<br />

## 进阶

### 类型保护

先来看一下问题

![image-20220803130425882](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220803130425882.png)

解决问题的几种方式

```typescript
// 鸟
interface Bird {
    fly: boolean;   // 是否会飞
    sing: () => {};  // 鸟叫
}

// 狗
interface Dog {
    fly: boolean;   // 是否会飞
    bark: () => {}; // 狗叫
}

// 使用断言进行类型保护
function trainAnimal1(animal: Bird | Dog): void {
    // 通过公共属性不同的值，将对象断言为某一种类型
    if (animal.fly) {
        (animal as Bird).sing();
    } else {
        (animal as Dog).bark();
    }
}

// 使用in进行类型保护
function trainAnimal2(animal: Bird | Dog): void {
    if ('sing' in animal) {
        animal.sing();
    } else {
        animal.bark();
    }
}

// 使用typeof语法进行类型保护
function add1(first: number | string, second: number | string): number | string {
    if (typeof first === 'string' || typeof second === 'string') {
        return `${first}${second}`
    } else {
        return first + second;
    }
}
```

### 枚举类型

```typescript
// 值默认从0开始，依次递增
// 如果手动指定了值，比如 OFFLINE = 1，那么ONLINE就为2，也是依次递增的规律
enum Status {
    OFFLINE,
    ONLINE,
    DELETED,
}

function getStatus(status: number | Status): string {
    let result = '';
    switch (status) {
        case Status.OFFLINE:
            result = 'offline';
            break
        case Status.ONLINE:
            result = 'online';
            break
        case Status.DELETED:
            result = 'deleted';
            break
        default:
            result = 'unknow';
    }
    return result;
}

console.log(getStatus(Status.ONLINE));
console.log(getStatus(0));
console.log(getStatus(1));
console.log(getStatus(2));
```

输出结果

```bash
C:\Users\Administrator\WebstormProjects\typescript_learn>ts-node demo.ts
online
offline
online 
deleted
```

### 函数泛型

（1）基本使用

```typescript
function add(first: number | string, second: number | string): string {
    return `${first}${second}`
}

// 下面几种调用方式都是可以的
console.log(add(1, 2))
console.log(add('1', '2'))
console.log(add(1, '2'))    // number和string可以混合传参

// ----------------------------------------------------------------------------------

// 如果我只允许传递number或string这种单一的类型，该如何操作呢?
// 使用泛型, T指任何类型,T可以是任何字符
function add1<T>(first: T, second: T) {
    return `${first}${second}`
}

console.log(add1<number>(1, 2))         // 指定传入的类型是number
console.log(add1<string>('1', '2'))     // 指定传入的类型是string
console.log(add1('1', '2'))             // 也可以不指定类型，让ts根据第一个参数自动推断
// console.log(add1('1', 2))            // 混合参数不被允许，会报错
```

（2）使用数组

```typescript
// 定义数组 - 方式1
function add2<T>(params: T[]) {
    return `${params}`
}

// 定义数组 - 方式2
function add3<T>(params: Array<T>) {
    return `${params}`
}

console.log(add2([1, 2, 3]))
console.log(add3([1, 2, 3]))
```

### 类中泛型

（1）使用`extends`约束泛型必须含有某个属性或方法

```typescript
interface Item {
    name: string
}

// T类型要求必须实现Item接口
class DataManager<T extends Item> {
    constructor(private data: T[]) {
    }

    getItemName(index: number): string {
        return this.data[index].name;
    }
}

const data = new DataManager([
    {
        name: "jack",
    }
]);

console.log(data.getItemName(0));
```

（2）限制泛型仅可以在某几个类型中使用

```typescript
// T类型要求必须实现Item接口
class DataManager<T extends number | string> {
    constructor(private data: T[]) {
    }

    getItem(index: number): T {
        return this.data[index];
    }
}

const data = new DataManager([1, 2, 3]);
console.log(data.getItem(0));
```

### 命名空间

#### （1）环境搭建

在一个空目录下，按如下步骤执行

* 创建`src`目录，用于存放ts源代码

* 创建`dist`，用于存放ts编译后的js文件

* 使用 `tsc --init` 创建 `tsconfig.json`配置文件，并修改如下参数

  ```
  "rootDir": "./src",
  "outDir": "./dist",
  ```

* 编写TS代码：`src/page.ts`

  ```typescript
  class Header {
      constructor() {
          const elem = document.createElement('div');
          elem.innerText = 'This is Header';
          document.body.appendChild(elem);
      }
  }
  
  class Content {
      constructor() {
          const elem = document.createElement('div');
          elem.innerText = 'This is content';
          document.body.appendChild(elem);
      }
  }
  
  class Footer {
      constructor() {
          const elem = document.createElement('div');
          elem.innerText = 'This is footer';
          document.body.appendChild(elem);
      }
  }
  
  class Page {
      constructor() {
          new Header();
          new Content();
          new Footer();
      }
  }
  ```

* 编写HTML代码：`index.html`

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Title</title>
      <script src="./dist/page.js"></script>
  </head>
  <body>
  <script>
      new Page();
  </script>
  </body>
  </html>
  ```

* 使用`tsc -w`开启实时编译

* 浏览器访问`index.html`页面

  ![image-20220803184629866](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220803184629866.png)

#### （2）使用namespace进行对象隔离

* 修改`page.ts`

  ```typescript
  namespace Home {
      // 1、将page.ts中原来的代码都拷贝在这里，也就是使用namespace Home包裹一下
      
      // 2、将class Page改为export class Page，意思是将Page对象暴露出去
  }    
  ```

* 修改`index.html`

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Title</title>
      <script src="./dist/page.js"></script>
  </head>
  <body>
  <script>
      <!-- 这里修改为Home.page -->
      new Home.Page();
  </script>
  </body>
  </html>
  ```

* 再次在浏览器中访问

  ![image-20220803185303097](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220803185303097.png)

<br />

## 配置文件

文档：[https://www.typescriptlang.org/docs/handbook/tsconfig-json.html](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

### 注意事项

::: warning

（1）使用`tsc --init`生成编译配置文件，这会生成一个`tsconfig.json`的文件

（2）使用`tsc demo.ts`这样并不会使用`tsconfig.json`

（3）使用`tsc`编译整个项目会使用`tsconfig.json`（所有的子目录的`.ts`文件都会被编译）

可以通过`removeComments": true`（删除注释）来测试生成的js文件是否使用了`tsconfig.json`

（4）使用`ts-node demo.ts`会使用`tsconfig.json`（`ts-node`是第三方命令，所以这里就管他了，只需要知道会使用配置文件即可）

:::

### 根字段

#### 指定/排除编译哪些文件

文档：[https://www.typescriptlang.org/tsconfig#root-fields](https://www.typescriptlang.org/tsconfig#root-fields)

* `files`：指定要编译哪些文件，需要把文件名都写到里面
* `include`：指定要编译哪些文件，支持通配符
  * `*`匹配零个或多个字符（不包括目录分隔符）
  * `?`匹配任何一个字符（不包括目录分隔符）
  * `**/`匹配任何嵌套到任何级别的目录
* `exclude`：排除由`include`匹配的文件，对`files`匹配到的文件并不会排除

### compilerOptions

#### Type Checking（类型检查）

:::tip

推荐使用默认配置，开启最严格的模式

:::

![image-20220802171403813](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220802171403813.png)

以`noImplicitAny`举例，严格模式下，不允许使用隐式`any`

![image-20220802172137810](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220802172137810.png)

修改配置，允许使用隐式`any`，代码就不会报错了

![image-20220802172338817](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220802172338817.png)

![image-20220802172405248](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220802172405248.png)

#### 指定TS源码根目录和打包输出目录

文档：

* [https://www.typescriptlang.org/tsconfig#rootDir](https://www.typescriptlang.org/tsconfig#rootDir)
* [https://www.typescriptlang.org/tsconfig#outDir](https://www.typescriptlang.org/tsconfig#outDir)

解释：

* `Modules.rootDir`：指定TS源码根目录，默认为`"./"`
* `Emit.outDir`：指定编译后的输出目录，会根据源码目录结构进行输出

修改以上两个参数如下：

```json
"rootDir": "./src",
"outDir": "./build",
```

我们的代码结构如下，ts文件中随便写点内容即可

![image-20220803110643570](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220803110643570.png)

执行`tsc`编译，会多出一个`build`目录，代码结构和我们的`src`保持一致

![image-20220803110755805](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220803110755805.png)



#### JavaScript Support（编译JS代码）

（1）`allowJs`：允许对JavaScript代码进行编译

首先先修改以下两个参数，否则输出文件会覆盖输入文件，从而导致编译报错

```json
"rootDir": "./src",   // 这个实际上不用改也可以
"outDir": "./build",  // 主要是改这个
```

编写`src/demo.js`

```javascript
export const name = "jack";
```

执行`tsc`编译，报错了

![image-20220803112024927](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220803112024927.png)

将`"allowJs": true `注释打开，再次执行`tsc`编译，可以看到已经可以正常编译了

![image-20220803112236629](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220803112236629.png)

（2）`checkJs`：允许对JavaScript代码进行类型检查，直接上效果图

![image-20220803112629326](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220803112629326.png)
