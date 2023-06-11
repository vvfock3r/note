Gin

官网：[https://gin-gonic.com/](https://gin-gonic.com/)

Github：[https://github.com/gin-gonic/gin](https://github.com/gin-gonic/gin)

文档：

* [https://gin-gonic.com/zh-cn/docs/](https://gin-gonic.com/zh-cn/docs/)
* [https://pkg.go.dev/github.com/gin-gonic/gin](https://pkg.go.dev/github.com/gin-gonic/gin)



## 安装Gin

```bash
go get -u github.com/gin-gonic/gin
```

<br />

## 基础示例

::: details （1）基础示例

```go
package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.GET("/", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"Methos": ctx.Request.Method,
		})
	})
	log.Fatalln(router.Run(":80"))

	// 也可以写做
	//log.Fatalln(http.ListenAndServe(":80", router))
}
```

:::

::: details （2）router.Run(addr)

```go
func (engine *Engine) Run(addr ...string) (err error) {	// addr是可以不用传的
	defer func() { debugPrintError(err) }()

	if engine.isUnsafeTrustedProxies() {
		debugPrint("[WARNING] You trusted all proxies, this is NOT safe. We recommend you to set a value.\n" +
			"Please check https://pkg.go.dev/github.com/gin-gonic/gin#readme-don-t-trust-all-proxies for details.")
	}

	address := resolveAddress(addr)	// 看一下addr处理逻辑
	debugPrint("Listening and serving HTTP on %s\n", address)
    // 可以看到，内部其实是调用了net/http的ListenAndServe
    // 这里的engine就是我们上面gin.Default()的值r，它实现了http.Handler接口
	err = http.ListenAndServe(address, engine)
	return
}

// --------------------------------------------------------------------------------------------
func resolveAddress(addr []string) string {
	switch len(addr) {
	case 0: 
		// 如果没有传addr参数的话，尝试使用环境变量PORT的值
		if port := os.Getenv("PORT"); port != "" {
			debugPrint("Environment variable PORT=\"%s\"", port)
			return ":" + port
		}
        // 若没有找到环境变量PORT，则默认使用:8080
		debugPrint("Environment variable PORT is undefined. Using port :8080 by default")
		return ":8080"
	case 1:
        // 如果传了addr参数，则默认返回
		return addr[0]
	default:
		panic("too many parameters")
	}
}
// --------------------------------------------------------------------------------------------
// 根据以上信息，我们在启动Server的时候也可以使用http.ListenAndServe
// 启动Gin Server
log.Fatalln(http.ListenAndServe(addr, r))
```

:::

::: details （3）gin.Default()

```go
func Default() *Engine {
	debugPrintWARNINGDefault()
	engine := New()
    engine.Use(Logger(), Recovery())	// 这里使用了两个中间件，Logger()和Recovery(),现在先不关心，往后看
	return engine
}

// ---------------------------------------------------------------------------------
// ServeHTTP conforms to the http.Handler interface.
func (engine *Engine) ServeHTTP(w http.ResponseWriter, req *http.Request) {
    // 往池子里取出一个Context
    // engine.pool就是sync.Pool，临时内存池
	c := engine.pool.Get().(*Context)

    // Context对象初始化
	c.writermem.reset(w)			
	c.Request = req
	c.reset()

    // 匹配URL并调用注册的Handler进行处理
	engine.handleHTTPRequest(c)

    // 处理完成后放回池子
	engine.pool.Put(c)
}

// ---------------------------------------------------------------------------------
func (engine *Engine) handleHTTPRequest(c *Context) {
	httpMethod := c.Request.Method	// 请求方法
	rPath := c.Request.URL.Path		// 请求Path
	unescape := false
	if engine.UseRawPath && len(c.Request.URL.RawPath) > 0 {
		rPath = c.Request.URL.RawPath
		unescape = engine.UnescapePathValues
	}

	if engine.RemoveExtraSlash {
		rPath = cleanPath(rPath)
	}

	// Find root of the tree for the given HTTP method
    // 从给出的HTTP方法找到root节点
    
    // 路由树，具体信息后面看
	t := engine.trees						
    
    // 使用for循环遍历,这里的for循环使用是一个小技巧
	for i, tl := 0, len(t); i < tl; i++ {	
		if t[i].method != httpMethod {
			continue
		}
		root := t[i].root
		// Find route in tree
		value := root.getValue(rPath, c.params, c.skippedNodes, unescape)
		if value.params != nil {
			c.Params = *value.params
		}
		if value.handlers != nil {
			c.handlers = value.handlers
			c.fullPath = value.fullPath
			c.Next()
			c.writermem.WriteHeaderNow()
			return
		}
        // ...
        
        
// ---------------------------------------------------------------------------------
// for循环小技巧
        
package main

import "fmt"

func main() {
	// 很多时候我们会这样遍历
	nodes := []string{"hello", "world", "!"}
	n := len(nodes)
	for i := 0; i < n; i++ {
		fmt.Println(nodes[i])
	}
	fmt.Println(n) // 遍历完成后n还可以正常使用，说明对象还没有被销毁，还在占用内存

	// 讨巧的技能
	// (1) 少写了一行获取切片长度
	for i, n := 0, len(nodes); i < n; i++ {
		fmt.Println(nodes[i])
	}
	//fmt.Println(n)	// （2）n已经不能使用了，内存已释放
	// 当外部不需要切片长度的时候，可以使用这个技巧
}   
        
// ---------------------------------------------------------------------------------
type Engine struct {
    // ...
    pool             sync.Pool
    trees            methodTrees   // 看一下tress是啥
    // ...    
}
        
var _ IRouter = &Engine{}	       // 这里又是另外一个小技巧，实例化一下，但是又什么都不做，目的在于
        						   // 在编译阶段就确保Engine实现了IRouter接口
        						   //	type IRouter interface {
								   //		IRoutes
								   //		Group(string, ...HandlerFunc) *RouterGroup
								   //	}
        
type methodTrees []methodTree	// tress是一个切片 

type methodTree struct {
	method string
	root   *node
}

type node struct {
	path      string
	indices   string
	wildChild bool
	nType     nodeType
	priority  uint32
	children  []*node // child nodes, at most 1 :param style node at the end of the array
	handlers  HandlersChain
	fullPath  string
}
        
func New() *Engine {
	debugPrintWARNINGNew()
	engine := &Engine{
		RouterGroup: RouterGroup{
			Handlers: nil,
			basePath: "/",
			root:     true,
		},
		FuncMap:                template.FuncMap{},
		RedirectTrailingSlash:  true,
		RedirectFixedPath:      false,
		HandleMethodNotAllowed: false,
		ForwardedByClientIP:    true,
		RemoteIPHeaders:        []string{"X-Forwarded-For", "X-Real-IP"},
		TrustedPlatform:        defaultPlatform,
		UseRawPath:             false,
		RemoveExtraSlash:       false,
		UnescapePathValues:     true,
		MaxMultipartMemory:     defaultMultipartMemory,
        // 容量为9，代表9个HTTP方法，包含GET, POST, PUT, PATCH, HEAD, OPTIONS, DELETE, CONNECT, TRACE
		trees:                  make(methodTrees, 0, 9),	
		delims:                 render.Delims{Left: "{{", Right: "}}"},
		secureJSONPrefix:       "while(1);",
		trustedProxies:         []string{"0.0.0.0/0"},
		trustedCIDRs:           defaultTrustedCIDRs,
	}
	engine.RouterGroup.engine = engine
	engine.pool.New = func() interface{} {
		return engine.allocateContext()
	}
	return engine
}

// ---------------------------------------------------------------------------------
// 改写一下代码，不使用gin.Default()，使用自己New()的引擎
package main

import (
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

func main() {
	// 监听地址
	addr := "127.0.0.1:80"

	// 实例化Gin路由引擎
	r := gin.New()
	r.Use(gin.Logger(), gin.Recovery())

	// 注册路由
	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "Hello Gin!\n")
	})

	// 启动Gin Server
	log.Fatalln(http.ListenAndServe(addr, r))
}

```

:::

<br />

## 路由

### 路由原理

::: details 路由原理(1)：基数树

gin框架使用的是定制版本的[httprouter](https://github.com/julienschmidt/httprouter)，使用基数树（Radix Tree）来存储和查找路由

基数树（Radix Tree）是一种更节省空间的前缀树（Trie Tree）。

对于基数树的每个节点，如果该节点是唯一的子树的话，就和父节点合并。

下图为一个基数树示例：

![radix_tree](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/radix_tree.png)

假设有以下路由注册信息

```go
router := gin.Default()

router.GET("/", func1)
router.GET("/search/", func2)
router.GET("/support/", func3)
router.GET("/blog/", func4)
router.GET("/blog/:post/", func5)
router.GET("/about-us/", func6)
router.GET("/about-us/team/", func7)
router.GET("/contact/", func8)
```

`Gin`为每种请求方法管理一棵单独的树，所以我们会得到一个`GET`方法对应的路由树：

```bash
Priority   Path             Handle
9          \                *<1>
3          ├s               nil
2          |├earch\         *<2>
1          |└upport\        *<3>
2          ├blog\           *<4>
1          |    └:post      nil
1          |         └\     *<5>
2          ├about-us\       *<6>
1          |        └team\  *<7>
1          └contact\        *<8>
```

* 基数树允许我们使用像`:post`参数这种动态部分
* 每个节点都有优先级属性，作用是可以优先匹配被大多数路由路径包含的节点

:::

::: details 路由原理(2)：相关结构体

```go
// Engine结构体
type Engine struct {
	RouterGroup
    // ...
}

// RouterGroup结构体
type RouterGroup struct {
	Handlers HandlersChain
	basePath string
	engine   *Engine
	root     bool
}
// Engine和RouterGroup类似于相互嵌套的结构

// --------------------------------------------------------------------
// 路由树节点
type node struct {
    // 节点路径,比如上面的s，earch，和upport
	path      string
    
    // 保存分裂分支的第一个字符，
    // 比如search和support, 那么s节点的indices属性就为"eu"，代表有两个分支, 分支的首字母分别是e和u
	indices   string
    
    // 节点是否是参数节点，比如上面的:post
	wildChild bool
    
    // 节点类型
    // static: 静态节点（默认），比如上面的s，earch等节点
	// root: 树的根节点
	// catchAll: 有*匹配的节点
	// param: 参数节点
	nType     nodeType
    
    // 优先级，子节点越多，优先级越高(数字越大)，该节点越优先匹配
	priority  uint32
    
    // 子节点(只包含儿子节点，不包含孙子节点)
	children  []*node // child nodes, at most 1 :param style node at the end of the array
    
    // 处理函数链条（切片）
	handlers  HandlersChain
    
    // 完整路径
	fullPath  string
}
// --------------------------------------------------------------------
// 请求方法树，每个方法对应一棵树
type methodTree struct {
	method string
	root   *node
}

type methodTrees []methodTree

func (trees methodTrees) get(method string) *node {	// 从切片中获取方法树节点
	for _, tree := range trees {
		if tree.method == method {
			return tree.root
		}
	}
	return nil
}
```

:::

::: details 路由原理(3)：路由注册逻辑：r.GET源码

```go
// GET is a shortcut for router.Handle("GET", path, handle).
func (group *RouterGroup) GET(relativePath string, handlers ...HandlerFunc) IRoutes {
	return group.handle(http.MethodGet, relativePath, handlers)
}

// ---------------------------------------------------------------------------------
func (group *RouterGroup) handle(httpMethod, relativePath string, handlers HandlersChain) IRoutes {
	absolutePath := group.calculateAbsolutePath(relativePath)	// 获取绝对路径（若没有前缀/则自动添加前缀/）
	handlers = group.combineHandlers(handlers)					// 编译handlers
	group.engine.addRoute(httpMethod, absolutePath, handlers)	// 注册路由
	return group.returnObj()
}

// ---------------------------------------------------------------------------------
func (engine *Engine) addRoute(method, path string, handlers HandlersChain) {
	assert1(path[0] == '/', "path must begin with '/'")
	assert1(method != "", "HTTP method can not be empty")
	assert1(len(handlers) > 0, "there must be at least one handler")

	debugPrintRoute(method, path, handlers)

    // 获取方法对应的根节点，trees是一个切片，get是自定义方法，内部是一个循环遍历
	root := engine.trees.get(method)	
	if root == nil {
		root = new(node)
		root.fullPath = "/"
		engine.trees = append(engine.trees, methodTree{method: method, root: root})
	}
    // 根节点注册路由
	root.addRoute(path, handlers)

	// Update maxParams
	if paramsCount := countParams(path); paramsCount > engine.maxParams {
		engine.maxParams = paramsCount
	}

	if sectionsCount := countSections(path); sectionsCount > engine.maxSections {
		engine.maxSections = sectionsCount
	}
}
```

:::

::: details 路由原理(4)：路由注册逻辑：注册逻辑

```go
// addRoute 将具有给定句柄的节点添加到路径中。
// 不是并发安全的
func (n *node) addRoute(path string, handlers HandlersChain) {
	fullPath := path
	n.priority++
	numParams := countParams(path)  // 数一下参数个数

	// 空树就直接插入当前节点
	if len(n.path) == 0 && len(n.children) == 0 {
		n.insertChild(numParams, path, fullPath, handlers)
		n.nType = root
		return
	}

	parentFullPathIndex := 0

walk:
	for {
		// 更新当前节点的最大参数个数
		if numParams > n.maxParams {
			n.maxParams = numParams
		}

		// 找到最长的通用前缀
		// 这也意味着公共前缀不包含“:”"或“*” /
		// 因为现有键不能包含这些字符。
		i := longestCommonPrefix(path, n.path)

		// 分裂边缘（此处分裂的是当前树节点）
		// 例如一开始path是search，新加入support，s是他们通用的最长前缀部分
		// 那么会将s拿出来作为parent节点，增加earch和upport作为child节点
		if i < len(n.path) {
			child := node{
				path:      n.path[i:],  // 公共前缀后的部分作为子节点
				wildChild: n.wildChild,
				indices:   n.indices,
				children:  n.children,
				handlers:  n.handlers,
				priority:  n.priority - 1, //子节点优先级-1
				fullPath:  n.fullPath,
			}

			// Update maxParams (max of all children)
			for _, v := range child.children {
				if v.maxParams > child.maxParams {
					child.maxParams = v.maxParams
				}
			}

			n.children = []*node{&child}
			// []byte for proper unicode char conversion, see #65
			n.indices = string([]byte{n.path[i]})
			n.path = path[:i]
			n.handlers = nil
			n.wildChild = false
			n.fullPath = fullPath[:parentFullPathIndex+i]
		}

		// 将新来的节点插入新的parent节点作为子节点
		if i < len(path) {
			path = path[i:]

			if n.wildChild {  // 如果是参数节点
				parentFullPathIndex += len(n.path)
				n = n.children[0]
				n.priority++

				// Update maxParams of the child node
				if numParams > n.maxParams {
					n.maxParams = numParams
				}
				numParams--

				// 检查通配符是否匹配
				if len(path) >= len(n.path) && n.path == path[:len(n.path)] {
					// 检查更长的通配符, 例如 :name and :names
					if len(n.path) >= len(path) || path[len(n.path)] == '/' {
						continue walk
					}
				}

				pathSeg := path
				if n.nType != catchAll {
					pathSeg = strings.SplitN(path, "/", 2)[0]
				}
				prefix := fullPath[:strings.Index(fullPath, pathSeg)] + n.path
				panic("'" + pathSeg +
					"' in new path '" + fullPath +
					"' conflicts with existing wildcard '" + n.path +
					"' in existing prefix '" + prefix +
					"'")
			}
			// 取path首字母，用来与indices做比较
			c := path[0]

			// 处理参数后加斜线情况
			if n.nType == param && c == '/' && len(n.children) == 1 {
				parentFullPathIndex += len(n.path)
				n = n.children[0]
				n.priority++
				continue walk
			}

			// 检查路path下一个字节的子节点是否存在
			// 比如s的子节点现在是earch和upport，indices为eu
			// 如果新加一个路由为super，那么就是和upport有匹配的部分u，将继续分列现在的upport节点
			for i, max := 0, len(n.indices); i < max; i++ {
				if c == n.indices[i] {
					parentFullPathIndex += len(n.path)
					i = n.incrementChildPrio(i)
					n = n.children[i]
					continue walk
				}
			}

			// 否则就插入
			if c != ':' && c != '*' {
				// []byte for proper unicode char conversion, see #65
				// 注意这里是直接拼接第一个字符到n.indices
				n.indices += string([]byte{c})
				child := &node{
					maxParams: numParams,
					fullPath:  fullPath,
				}
				// 追加子节点
				n.children = append(n.children, child)
				n.incrementChildPrio(len(n.indices) - 1)
				n = child
			}
			n.insertChild(numParams, path, fullPath, handlers)
			return
		}

		// 已经注册过的节点
		if n.handlers != nil {
			panic("handlers are already registered for path '" + fullPath + "'")
		}
		n.handlers = handlers
		return
	}
}
```

:::

翻译成动画大概是这样的流程：

![addroute](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/addroute.gif)

::: details 点击查看完整代码

```go
// tree.go
func (n *node) insertChild(numParams uint8, path string, fullPath string, handlers HandlersChain) {
  // 找到所有的参数
	for numParams > 0 {
		// 查找前缀直到第一个通配符
		wildcard, i, valid := findWildcard(path)
		if i < 0 { // 没有发现通配符
			break
		}

		// 通配符的名称必须包含':' 和 '*'
		if !valid {
			panic("only one wildcard per path segment is allowed, has: '" +
				wildcard + "' in path '" + fullPath + "'")
		}

		// 检查通配符是否有名称
		if len(wildcard) < 2 {
			panic("wildcards must be named with a non-empty name in path '" + fullPath + "'")
		}

		// 检查这个节点是否有已经存在的子节点
		// 如果我们在这里插入通配符，这些子节点将无法访问
		if len(n.children) > 0 {
			panic("wildcard segment '" + wildcard +
				"' conflicts with existing children in path '" + fullPath + "'")
		}

		if wildcard[0] == ':' { // param
			if i > 0 {
				// 在当前通配符之前插入前缀
				n.path = path[:i]
				path = path[i:]
			}

			n.wildChild = true
			child := &node{
				nType:     param,
				path:      wildcard,
				maxParams: numParams,
				fullPath:  fullPath,
			}
			n.children = []*node{child}
			n = child
			n.priority++
			numParams--

			// 如果路径没有以通配符结束
			// 那么将有另一个以'/'开始的非通配符子路径。
			if len(wildcard) < len(path) {
				path = path[len(wildcard):]

				child := &node{
					maxParams: numParams,
					priority:  1,
					fullPath:  fullPath,
				}
				n.children = []*node{child}
				n = child  // 继续下一轮循环
				continue
			}

			// 否则我们就完成了。将处理函数插入新叶子中
			n.handlers = handlers
			return
		}

		// catchAll
		if i+len(wildcard) != len(path) || numParams > 1 {
			panic("catch-all routes are only allowed at the end of the path in path '" + fullPath + "'")
		}

		if len(n.path) > 0 && n.path[len(n.path)-1] == '/' {
			panic("catch-all conflicts with existing handle for the path segment root in path '" + fullPath + "'")
		}

		// currently fixed width 1 for '/'
		i--
		if path[i] != '/' {
			panic("no / before catch-all in path '" + fullPath + "'")
		}

		n.path = path[:i]
		
		// 第一个节点:路径为空的catchAll节点
		child := &node{
			wildChild: true,
			nType:     catchAll,
			maxParams: 1,
			fullPath:  fullPath,
		}
		// 更新父节点的maxParams
		if n.maxParams < 1 {
			n.maxParams = 1
		}
		n.children = []*node{child}
		n.indices = string('/')
		n = child
		n.priority++

		// 第二个节点:保存变量的节点
		child = &node{
			path:      path[i:],
			nType:     catchAll,
			maxParams: 1,
			handlers:  handlers,
			priority:  1,
			fullPath:  fullPath,
		}
		n.children = []*node{child}

		return
	}

	// 如果没有找到通配符，只需插入路径和句柄
	n.path = path
	n.handlers = handlers
	n.fullPath = fullPath
}
```

:::

::: details 路由原理(5)：路由匹配逻辑

```go
Engine -> ServeHTTP方法 -> engine.handleHTTPRequest(c) -> 
// ---------------------------------------------------------------------
func (engine *Engine) handleHTTPRequest(c *Context) {
	httpMethod := c.Request.Method	// 请求方法
	rPath := c.Request.URL.Path		// 请求Path
	unescape := false
	if engine.UseRawPath && len(c.Request.URL.RawPath) > 0 {
		rPath = c.Request.URL.RawPath
		unescape = engine.UnescapePathValues
	}

	if engine.RemoveExtraSlash {
		rPath = cleanPath(rPath)
	}

	// Find root of the tree for the given HTTP method
	t := engine.trees						
	for i, tl := 0, len(t); i < tl; i++ {
		if t[i].method != httpMethod {
			continue
		}
		root := t[i].root		// 找到请求方法对应的基数树
		// Find route in tree
		value := root.getValue(rPath, c.params, c.skippedNodes, unescape)	// 根据path获取到路由节点node
		if value.params != nil {
			c.Params = *value.params
		}
// ---------------------------------------------------------------------        
func (n *node) getValue(path string, po Params, unescape bool) (value nodeValue) {
	value.params = po
walk: // Outer loop for walking the tree
	for {
		prefix := n.path
		if path == prefix {
			// 我们应该已经到达包含处理函数的节点。
			// 检查该节点是否注册有处理函数
			if value.handlers = n.handlers; value.handlers != nil {
				value.fullPath = n.fullPath
				return
			}

			if path == "/" && n.wildChild && n.nType != root {
				value.tsr = true
				return
			}

			// 没有找到处理函数 检查这个路径末尾+/ 是否存在注册函数
			indices := n.indices
			for i, max := 0, len(indices); i < max; i++ {
				if indices[i] == '/' {
					n = n.children[i]
					value.tsr = (len(n.path) == 1 && n.handlers != nil) ||
						(n.nType == catchAll && n.children[0].handlers != nil)
					return
				}
			}

			return
		}

		if len(path) > len(prefix) && path[:len(prefix)] == prefix {
			path = path[len(prefix):]
			// 如果该节点没有通配符(param或catchAll)子节点
			// 我们可以继续查找下一个子节点
			if !n.wildChild {
				c := path[0]
				indices := n.indices
				for i, max := 0, len(indices); i < max; i++ {
					if c == indices[i] {
						n = n.children[i] // 遍历树
						continue walk
					}
				}

				// 没找到
				// 如果存在一个相同的URL但没有末尾/的叶子节点
				// 我们可以建议重定向到那里
				value.tsr = path == "/" && n.handlers != nil
				return
			}

			// 根据节点类型处理通配符子节点
			n = n.children[0]
			switch n.nType {
			case param:
				// find param end (either '/' or path end)
				end := 0
				for end < len(path) && path[end] != '/' {
					end++
				}

				// 保存通配符的值
				if cap(value.params) < int(n.maxParams) {
					value.params = make(Params, 0, n.maxParams)
				}
				i := len(value.params)
				value.params = value.params[:i+1] // 在预先分配的容量内扩展slice
				value.params[i].Key = n.path[1:]
				val := path[:end]
				if unescape {
					var err error
					if value.params[i].Value, err = url.QueryUnescape(val); err != nil {
						value.params[i].Value = val // fallback, in case of error
					}
				} else {
					value.params[i].Value = val
				}

				// 继续向下查询
				if end < len(path) {
					if len(n.children) > 0 {
						path = path[end:]
						n = n.children[0]
						continue walk
					}

					// ... but we can't
					value.tsr = len(path) == end+1
					return
				}

				if value.handlers = n.handlers; value.handlers != nil {
					value.fullPath = n.fullPath
					return
				}
				if len(n.children) == 1 {
					// 没有找到处理函数. 检查此路径末尾加/的路由是否存在注册函数
					// 用于 TSR 推荐
					n = n.children[0]
					value.tsr = n.path == "/" && n.handlers != nil
				}
				return

			case catchAll:
				// 保存通配符的值
				if cap(value.params) < int(n.maxParams) {
					value.params = make(Params, 0, n.maxParams)
				}
				i := len(value.params)
				value.params = value.params[:i+1] // 在预先分配的容量内扩展slice
				value.params[i].Key = n.path[2:]
				if unescape {
					var err error
					if value.params[i].Value, err = url.QueryUnescape(path); err != nil {
						value.params[i].Value = path // fallback, in case of error
					}
				} else {
					value.params[i].Value = path
				}

				value.handlers = n.handlers
				value.fullPath = n.fullPath
				return

			default:
				panic("invalid node type")
			}
		}

		// 找不到，如果存在一个在当前路径最后添加/的路由
		// 我们会建议重定向到那里
		value.tsr = (path == "/") ||
			(len(prefix) == len(path)+1 && prefix[len(path)] == '/' &&
				path == prefix[:len(prefix)-1] && n.handlers != nil)
		return
	}
}       
```

:::

<br />

### 普通路由

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/index", func(ctx *gin.Context) {
		ctx.String(http.StatusOK, "Index\n")
	})

	router.POST("/login", func(ctx *gin.Context) {
		ctx.String(http.StatusOK, "Login\n")
	})

	// Any可以支持多种方法，具体包含：GET, POST, PUT, PATCH, HEAD, OPTIONS, DELETE, CONNECT, TRACE
	router.Any("/", func(ctx *gin.Context) {
		ctx.String(http.StatusOK, fmt.Sprintf("你请求的方法是: %s\n", ctx.Request.Method))
	})

	log.Fatalln(router.Run(":80"))
}
```

输出结果

```bash
C:\Users\Administrator\Desktop> curl http://127.0.0.1/index
Index

C:\Users\Administrator\Desktop> curl -XPOST http://127.0.0.1/login
Login

C:\Users\Administrator\Desktop> curl http://127.0.0.1
你的请求方法是: GET

C:\Users\Administrator\Desktop> curl -XPUT http://127.0.0.1
你的请求方法是: PUT

C:\Users\Administrator\Desktop> curl -XPOST http://127.0.0.1
你的请求方法是: POST
```

:::

<br />

### 分组路由

::: details 点击查看完整代码

```go
package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	apiV1 := router.Group("/api/v1")
	apiV1.GET("/", func(ctx *gin.Context) {
		ctx.String(http.StatusOK, "Hello Gin!")
	})
	apiV1.GET("/login", func(ctx *gin.Context) {
		ctx.String(http.StatusOK, "Login")
	})

	log.Fatalln(router.Run(":80"))
}
```

输出结果

```bash
C:\Users\Administrator\Desktop> curl http://127.0.0.1/api/v1/
Hello Gin!
C:\Users\Administrator\Desktop> curl http://127.0.0.1/api/v1/login
Login
```

:::

<br />

### 动态路由

::: details 点击查看完整代码

```go
package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// :id 是一个必选的命名参数, 字符串类型
	router.GET("/user/:id", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"id": ctx.Param("id")})
	})

	// :action 是一个可选的通配符, 字符串类型
	router.GET("/role/*action", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"action": ctx.Param("action")})
	})

	log.Fatalln(router.Run(":80"))
}
```

输出结果

```bash
# :变量名 是一个必选的参数
C:\Users\Administrator\Desktop> curl http://127.0.0.1/user
404 page not found

C:\Users\Administrator\Desktop> curl http://127.0.0.1/user/
404 page not found

C:\Users\Administrator\Desktop> curl http://127.0.0.1/user/1
{"id":"1"}

C:\Users\Administrator\Desktop>curl http://127.0.0.1/user/1/
<a href="/user/1">Moved Permanently</a>.

C:\Users\Administrator\Desktop> curl http://127.0.0.1/user/abc
{"id":"abc"}

C:\Users\Administrator\Desktop> curl http://127.0.0.1/user/1/2
404 page not found

# *变量名 是可选的路径
C:\Users\Administrator\Desktop> curl http://127.0.0.1/role
<a href="/role/">Moved Permanently</a>.

C:\Users\Administrator\Desktop> curl http://127.0.0.1/role/    
{"action":"/"}

C:\Users\Administrator\Desktop> curl http://127.0.0.1/role/edit 
{"action":"/edit"}

C:\Users\Administrator\Desktop> curl http://127.0.0.1/role/edit/
{"action":"/edit/"}

C:\Users\Administrator\Desktop> curl http://127.0.0.1/role/edit/1
{"action":"/edit/1"}

C:\Users\Administrator\Desktop> curl http://127.0.0.1/role/edit/1/2/3
{"action":"/edit/1/2/3"}
```

:::

<br />

### 尾斜杠和重定向

::: details （1）RedirectTrailingSlash 和 RedirectFixedPath

```go
package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// 开启自动重定向(返回301状态码), 默认为ture, 建议不要修改
	//router.RedirectTrailingSlash = false

	// 开启自动修复路径(返回301状态码), 默认为false
	// 设置为true时, 比如/FOO和/..//Foo将会被重定向到/foo(前提是/foo存在)
	//router.RedirectFixedPath = true

	router.GET("/index", func(ctx *gin.Context) {
		ctx.String(http.StatusOK, "Index\n")
	})
	router.GET("/login/", func(c *gin.Context) {
		ctx.String(http.StatusOK, "Login\n")
	})

	log.Fatalln(router.Run(":80"))
}
```

输出结果 

```bash
# 注册什么就访问什么，没有问题
C:\Users\Administrator> curl http://127.0.0.1/index
Index
C:\Users\Administrator> curl http://127.0.0.1/login/
Login

# 无论注册时带不带尾斜杠，使用curl -L参数自动重定向
C:\Users\Administrator> curl http://127.0.0.1/index/
<a href="/index">Moved Permanently</a>.

C:\Users\Administrator> curl http://127.0.0.1/index/ -L
Index

C:\Users\Administrator\Desktop> curl http://127.0.0.1/login   
<a href="/login/">Moved Permanently</a>.

C:\Users\Administrator> curl http://127.0.0.1/login -L
Login

# 查看响应头, Windows下使用 -i, Linux下使用 -I
C:\Users\Administrator> curl http://127.0.0.1/login -i
HTTP/1.1 301 Moved Permanently
Content-Type: text/html; charset=utf-8
Location: /login/
Date: Sun, 08 May 2022 10:31:39 GMT
Content-Length: 42

<a href="/login/">Moved Permanently</a>.

# 并不会像net/http那样，会进行前缀匹配
C:\Users\Administrator> curl http://127.0.0.1/login/a/b/c
404 page not found
```

:::

::: details （2）HTTP重定向

```go
package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

    // HTTP重定向(在Chrome等浏览器下访问地址栏会变为/login/)
	router.GET("/index", func(ctx *gin.Context) {
		ctx.Redirect(http.StatusMovedPermanently, "/login/")
	})
	router.GET("/login/", func(ctx *gin.Context) {
		ctx.String(http.StatusOK, "Login\n")
	})

	log.Fatalln(router.Run(":80"))
}
```

输出结果

![image-20230525233431563](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230525233431563.png)

```bash
C:\Users\Administrator> curl http://127.0.0.1/index
<a href="/login/">Moved Permanently</a>.

C:\Users\Administrator> curl http://127.0.0.1/index -i
HTTP/1.1 301 Moved Permanently
Content-Type: text/html; charset=utf-8
Location: /login/
Date: Thu, 25 May 2023 15:30:30 GMT
Content-Length: 42

<a href="/login/">Moved Permanently</a>.

C:\Users\Administrator> curl http://127.0.0.1/index -L
Login
```

:::

::: details （3）路由内重定向

```go
package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// 路由内重定向(如果在Chrome等浏览器下访问地址栏不会发生变化)
	router.GET("/index", func(ctx *gin.Context) {
		ctx.Request.URL.Path = "/login/"
		router.HandleContext(ctx)
	})
	router.GET("/login/", func(ctx *gin.Context) {
		ctx.String(http.StatusOK, "Login\n")
	})

	log.Fatalln(router.Run(":80"))
}
```

输出结果

![image-20220508183700833](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20220508183700833.png)

```bash
C:\Users\Administrator>curl http://127.0.0.1/index
Login
```

:::

::: details （4）同时支持尾斜杠和非尾斜杠的情况

```go
package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// 方式一: 使用路由内重定向
	router.GET("/index", func(ctx *gin.Context) {
		ctx.Request.URL.Path = "/index/"
		router.HandleContext(ctx)
	})
	router.GET("/index/", func(ctx *gin.Context) {
		ctx.String(http.StatusOK, "Index\n")
	})

	// 方式二: 注册多个路由
	loginHandler := func(ctx *gin.Context) {
		ctx.String(http.StatusOK, "Login\n")
	}
	router.GET("/login", loginHandler)
	router.GET("/login/", loginHandler)

	log.Fatalln(router.Run(":80"))
}
```

输出结果

```bash
C:\Users\Administrator\Desktop\note> curl http://127.0.0.1/index -i
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8
Date: Tue, 16 May 2023 15:16:50 GMT    
Content-Length: 6

Index

C:\Users\Administrator\Desktop\note> curl http://127.0.0.1/index/ -i 
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8
Date: Tue, 16 May 2023 15:16:56 GMT    
Content-Length: 6

Index

# -------------------------------------------------------------------

C:\Users\Administrator\Desktop\note> curl http://127.0.0.1/login -i 
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8
Date: Tue, 16 May 2023 15:19:49 GMT    
Content-Length: 6

Login

C:\Users\Administrator\Desktop\note> curl http://127.0.0.1/login/ -i 
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8
Date: Tue, 16 May 2023 15:19:51 GMT    
Content-Length: 6

Login
```

:::

<br />

## 请求和响应

### 请求信息

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"log"
	"net/http"
	"sort"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.Any("/", func(ctx *gin.Context) {
		// 说明: 一个HTTP请求由 请求行、请求头、请求体 三部分组成, 由换行符分隔

		// 1.请求行包含: 请求方法 请求路径 请求协议
		//   比如 GET / HTTP/1.1
		_, err := ctx.Writer.WriteString(fmt.Sprintf("%s %s %s\n",
			ctx.Request.Method,
			ctx.Request.URL.Path, // 也可以使用 ctx.Request.RequestURI
			ctx.Request.Proto,
		))
		if err != nil {
			ctx.AbortWithStatus(http.StatusInternalServerError)
		}

		// 2.请求头, map[string][]string

		// 可以直接遍历请求头然后写入响应体,但是因为Map是无序的会导致每次返回顺序都不一样
		//for key, slice := range ctx.Request.Header {
		//	_, err = ctx.Writer.WriteString(fmt.Sprintf("%-30s %s\n", key, slice))
		//	if err != nil {
		//		ctx.AbortWithStatus(http.StatusInternalServerError)
		//	}
		//}

		// 先提取到一个切片中
		var header []string
		for key, slice := range ctx.Request.Header {
			header = append(header, fmt.Sprintf("%-30s %s\n", key, slice))
		}

		// 对切片排序
		sort.Slice(header, func(i, j int) bool {
			return header[i] < header[j]
		})

		// 写入响应
		for _, line := range header {
			_, err = ctx.Writer.WriteString(line)
			if err != nil {
				ctx.AbortWithStatus(http.StatusInternalServerError)
			}
		}

		// 3.请求体, 在后面会讲到
	})

	log.Fatalln(router.Run(":80"))
}
```

输出结果

```bash
C:\Users\Administrator> curl http://127.0.0.1
GET / HTTP/1.1
Accept                         [*/*]
User-Agent                     [curl/8.0.1]
```

![image-20230526002147472](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230526002147472.png)

:::

<br />

### 媒体类型

::: details （1）Content-Type介绍

参考自：[https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)

`Content-Type`写入在HTTP请求头或响应头中，用于告知接收方资源类型

* 接收方可以是服务端（客户端发送HTTP请求设置`Content-Type`），也可以是客户端（服务端返回HTTP响应设置`Content-Type`）

* `Content-Type`参数并不是必须要设置的

语法格式如下：

```html
Content-Type: type/subtype [; charset] [; boundary]
```

* type/subtype：由类型与子类型两个字符串中间用`'/'`分隔而组成。不允许空格存在

* charset：字符编码标准

* 对于多部分实体，boundary 是必需的，其包括来自一组字符的1到70个字符， 

  已知通过电子邮件网关是非常健壮的，而不是以空白结尾

  它用于封装消息的多个部分的边界

**Content-Type类型举例**

| 类型                              | 说明                                                         | Content-Type典型示例                                         |
| --------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `text`<br />（文本类型）          | 表明文件是普通文本，理论上是人类可读                         | `text/plain`<br />`text/html`<br />`text/css`<br />`text/javascript` |
| `image`<br />（图片类型）         | 表明是某种图像。不包括视频，<br />但是动态图（比如动态gif）也使用image类型 | `image/gif`<br />`image/png`<br />`image/jpeg`<br />`image/bmp`<br />`image/webp`<br />`image/x-icon`<br />`image/vnd.microsoft.icon` |
| `audio`<br />（音频类型）         | 表明是某种音频文件                                           | `audio/midi` <br />`audio/mpeg`<br />`audio/webm`<br />`audio/ogg`<br />`audio/wav` |
| `video`<br />（视频类型）         | 表明是某种视频文件                                           | `video/webm`<br />`video/ogg`                                |
| `application`<br />（二进制类型） | 表明是某种二进制数据                                         | `  applicationx-www-form-urlencoded`<br />`application/json`<br />`application/octet-stream`<br />`application/pdf` |
| `Multipart`<br />（文件类型）     | 表示细分领域的文件类型的种类，经常对应不同的 MIME 类型。<br />这是复合文件的一种表现方式 | `multipart/form-data`<br />`multipart/byteranges`            |

:::

::: details （2）Gin响应默认的Content-Type: text/plain; charset=utf-8 和 手动设置Content-Type: application/json; charset=utf-8

```go
package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/", func(ctx *gin.Context) {
		// 获取请求的Content-Type, 有可能为空
		contentType := ctx.GetHeader("Content-Type")

		// 设置响应的Content-Type, 等于 c.Writer.Header().Set(key, value)
		//ctx.Header("Content-Type", "application/json; charset=utf-8")

		// 返回
		ctx.String(http.StatusOK, contentType)
	})

	log.Fatalln(router.Run(":80"))
}
```

输出结果

```bash
# Gin String响应默认的Content-Type
C:\Users\Administrator\Desktop> curl http://127.0.0.1/
Hello World!

C:\Users\Administrator\Desktop> curl http://127.0.0.1/ -i
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8
Date: Fri, 26 May 2023 14:52:52 GMT
Content-Length: 0

# 手动设置请求的Content-Type
C:\Users\Administrator\Desktop>curl -H "Content-type: application/json" http://127.0.0.1
application/json

# 手动设置响应的Content-Type
C:\Users\Administrator\Desktop>curl http://127.0.0.1 -i
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Fri, 26 May 2023 14:55:03 GMT
Content-Length: 0
```

:::

<br />

### 内置响应

::: details （1）String响应

```go
package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// String 返回纯文本响应信息
	router.GET("/string", func(ctx *gin.Context) {
		ctx.String(http.StatusOK, "Hello World!")
	})

	log.Fatalln(router.Run(":80"))
}
```

输出结果

```bash
C:\Users\Administrator\Desktop>curl http://127.0.0.1/string -i
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8
Date: Sun, 28 May 2023 09:50:11 GMT
Content-Length: 12

Hello World!
```

:::

::: details （2）JSON响应

```go
package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// 普通JSON
	router.GET("/json", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"code": "200",
			"data": "<h1>北京欢迎您!</h1>",
		})
	})

	// pure json
	router.GET("/pure-json", func(ctx *gin.Context) {
		ctx.PureJSON(http.StatusOK, gin.H{
			"code": "200",
			"data": "<h1>北京欢迎您!</h1>",
		})
	})

	// ascii json
	router.GET("/ascii-json", func(ctx *gin.Context) {
		ctx.AsciiJSON(http.StatusOK, gin.H{
			"code": "200",
			"data": "<h1>北京欢迎您!</h1>",
		})
	})

	// 格式化JSON
	router.GET("/indented-json", func(ctx *gin.Context) {
		ctx.IndentedJSON(http.StatusOK, gin.H{
			"code": "200",
			"data": "<h1>北京欢迎您!</h1>",
		})
	})

	log.Fatalln(router.Run(":80"))
}
```

输出结果

```bash
# 普通JSON
C:\Users\Administrator> curl http://127.0.0.1/json -i
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Sun, 11 Jun 2023 01:49:34 GMT
Content-Length: 69

{"code":"200","data":"\u003ch1\u003e北京欢迎您!\u003c/h1\u003e"}

# ----------------------------------------------------------------------------------

# pure json, 不替换html标签为实体符号
C:\Users\Administrator> curl http://127.0.0.1/pure-json -i
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Sun, 11 Jun 2023 01:50:07 GMT
Content-Length: 50

{"code":"200","data":"<h1>北京欢迎您!</h1>"}

# ----------------------------------------------------------------------------------

# ascii json, unicode转ascii
C:\Users\Administrator> curl http://127.0.0.1/ascii-json -i
HTTP/1.1 200 OK
Content-Type: application/json
Date: Sun, 11 Jun 2023 01:51:24 GMT
Content-Length: 84

{"code":"200","data":"\u003ch1\u003e\u5317\u4eac\u6b22\u8fce\u60a8!\u003c/h1\u003e"}

# ----------------------------------------------------------------------------------

# 格式化JSON
C:\Users\Administrator> curl http://127.0.0.1/indented-json -i
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Sun, 11 Jun 2023 01:51:52 GMT
Content-Length: 82

{
    "code": "200",
    "data": "\u003ch1\u003e北京欢迎您!\u003c/h1\u003e"
}
```

:::

::: details （3）YAML响应

```go
package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/yaml", func(ctx *gin.Context) {
		ctx.YAML(http.StatusOK, gin.H{
			"name":  "John Doe",
			"age":   30,
			"email": "johndoe@example.com",
			"address": gin.H{
				"street":  "123 Main Street",
				"city":    "New York",
				"state":   "NY",
				"country": "USA",
			},
			"interests": []string{"music", "sports", "reading"},
		})
	})

	log.Fatalln(router.Run(":80"))
}
```

输出结果

```yaml
curl http://127.0.0.1/yaml
address:
    city: New York
    country: USA
    state: NY
    street: 123 Main Street
age: 30
email: johndoe@example.com
interests:
    - music
    - sports
    - reading
name: John Doe
```

:::

::: details （4）HTML响应

```go
package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// HTML 返回HTML信息, html模板文件必须要存在否则会报500错误
	router.LoadHTMLGlob("templates/*.html")
	router.GET("/html", func(ctx *gin.Context) {
		ctx.HTML(http.StatusOK, "index.html", gin.H{
			"Title": "My Website",
			"H1":    "Gin",
		})
	})

	log.Fatalln(router.Run(":80"))
}
```

输出结果

```bash
# 新建一个templates目录,并创建文件index.html
<!DOCTYPE html>
<html>
<head>
	<title>{{.Title}}</title>
</head>
<body>
<h1>{{.H1}}</h1>
<p>Welcome to my website!</p>
</body>
</html>

# 使用curl测试
C:\Users\Administrator\Desktop>curl http://127.0.0.1/html -i
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Date: Sun, 28 May 2023 09:39:33 GMT
Content-Length: 130

<!DOCTYPE html>
<html>
<head>
        <title>My Website</title>
</head>
<body>
<h1>Gin</h1>
<p>Welcome to my website!</p>
</body>
</html>
```

![image-20230528174037503](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230528174037503.png)

:::

::: details （5）XML响应

```go
package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// XML 返回XML信息
	router.GET("/xml", func(ctx *gin.Context) {
		ctx.XML(http.StatusOK, gin.H{
			"code": "200",
			"data": "Hello World!",
		})
	})

	log.Fatalln(router.Run(":80"))
}
```

输出结果

```bash
C:\Users\Administrator\Desktop>curl http://127.0.0.1/xml -i
HTTP/1.1 200 OK
Content-Type: application/xml; charset=utf-8
Date: Sun, 28 May 2023 09:48:48 GMT
Content-Length: 52

<map><code>200</code><data>Hello World!</data></map>
```

:::

::: details （6）File响应，ContentType：text/plain

```go
package main

import (
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// File 返回文件, c.Query用于获取查询字符串
	router.GET("/file", func(ctx *gin.Context) {
		ctx.File(c.Query("name"))
	})

	log.Fatalln(router.Run(":80"))
}
```

输出结果

```bash
C:\Users\Administrator\Desktop>curl http://127.0.0.1/file?name=main.go -i
HTTP/1.1 200 OK
Accept-Ranges: bytes
Content-Length: 269
Content-Type: text/plain; charset=utf-8              # 注意这里
Last-Modified: Sun, 28 May 2023 09:41:38 GMT
Date: Sun, 28 May 2023 09:42:01 GMT

package main

import (
        "log"

        "github.com/gin-gonic/gin"
)

func main() {
        router := gin.Default()

        // File 返回文件, c.Query用于获取查询字符串
        router.GET("/file", func(c *gin.Context) {
                c.File(c.Query("name"))
        })

        log.Fatalln(router.Run(":80"))
}
```

![image-20230528174352321](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230528174352321.png)

:::

::: details （7）Data响应，返回二进制数据，通过手动指定ContentType可解析为任意类型的数据：模拟 JSON

```go
package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// Data 返回二进制数据
	router.GET("/json", func(ctx *gin.Context) {
		data := gin.H{
			"status":  200,
			"message": "Hello, World!",
		}

		jsonData, err := json.MarshalIndent(data, "", " ")
		if err != nil {
			ctx.Abort()
		}

		ctx.Data(http.StatusOK, "application/json", jsonData)
	})

	log.Fatalln(router.Run(":80"))
}
```

输出结果

```bash
C:\Users\Administrator\Desktop>curl http://127.0.0.1/json -i
HTTP/1.1 200 OK
Content-Type: application/json
Date: Sun, 28 May 2023 10:00:20 GMT
Content-Length: 47

{
 "message": "Hello, World!",
 "status": 200
}
```

:::

<br />

### 中断响应

::: details （1）直接中断响应，返回响应码是200，并且没有ContentType

```go
package main

import (
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	
	router.GET("/", func(ctx *gin.Context) {
		ctx.Abort()
	})

	log.Fatalln(router.Run(":80"))
}

```

输出结果

```bash
C:\Users\Administrator\Desktop>curl http://127.0.0.1/ -i
HTTP/1.1 200 OK
Date: Sun, 28 May 2023 10:03:03 GMT
Content-Length: 0
```

:::

::: details （2）使用指定响应码中断响应，并且没有ContentType

```go
package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/", func(ctx *gin.Context) {
		ctx.AbortWithStatus(http.StatusInternalServerError)
	})

	log.Fatalln(router.Run(":80"))
}
```

输出结果

```bash
C:\Users\Administrator\Desktop>curl http://127.0.0.1/ -i
HTTP/1.1 500 Internal Server Error
Date: Sun, 28 May 2023 10:04:41 GMT
Content-Length: 0
```

:::

::: details （3）使用【指定响应码】和【JSON格式】中断响应

```go
package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/", func(ctx *gin.Context) {
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			"code":    11000,
			"message": "InternalServerError",
		})
	})

	log.Fatalln(router.Run(":80"))
}
```

输出结果

```bash
C:\Users\Administrator\Desktop>curl http://127.0.0.1/ -i
HTTP/1.1 500 Internal Server Error
Content-Type: application/json; charset=utf-8
Date: Sun, 28 May 2023 10:06:41 GMT
Content-Length: 46

{"code":11000,"message":"InternalServerError"}
```

:::

<br />

### 流式响应

::: details 点击查看详情

```go
package main

import (
	"log"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/", func(ctx *gin.Context) {
		for i := 0; i < 10; i++ {
			_, err := ctx.Writer.WriteString(strconv.Itoa(i))
			if err != nil {
				ctx.Abort()
			}
			ctx.Writer.Flush()
			time.Sleep(time.Second)
		}
	})

	log.Fatalln(router.Run(":80"))
}
```

输出结果

![20230610131006](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//20230610131006.gif)

:::

<br />

### SSE推送

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/events", func(c *gin.Context) {
		c.Header("Content-Type", "text/event-stream")
		c.Header("Cache-Control", "no-cache")
		c.Header("Connection", "keep-alive")
		c.Header("Access-Control-Allow-Origin", "*")

		ticker := time.NewTicker(1 * time.Second)
		defer ticker.Stop()

		for {
			select {
			case <-ticker.C:
				message := fmt.Sprintf("Message sent at %s", time.Now().Format("2006-01-02 15:04:05"))
				data := fmt.Sprintf("data: %s\n\n", message)
				_, _ = c.Writer.WriteString(data)
				c.Writer.Flush()
			case <-c.Writer.CloseNotify():
				return
			}
		}
	})

	router.Run(":8080")
}
```

输出结果

```bash

```

:::

<br />

### 4xx和5xx

::: details （1）4xx响应

```go
package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// 设置HTML模板
	router.LoadHTMLGlob("templates/*.html")

	// 自定义处理 401 的中间件
	router.Use(func(ctx *gin.Context) {
		ctx.Next()
		if ctx.Writer.Status() == http.StatusUnauthorized {
			ctx.HTML(http.StatusUnauthorized, "401.html", gin.H{})
			ctx.Abort()
		}
	})

	// 自定义处理 403 的中间件
	router.Use(func(ctx *gin.Context) {
		ctx.Next()
		if ctx.Writer.Status() == http.StatusForbidden {
			ctx.HTML(http.StatusForbidden, "403.html", gin.H{})
			ctx.Abort()
		}
	})

	// 自定义处理 404 的中间件
	router.NoRoute(func(ctx *gin.Context) {
		ctx.HTML(http.StatusNotFound, "404.html", gin.H{})
	})

	// 模拟 401 Unauthorized
	router.GET("/401", func(ctx *gin.Context) {
		ctx.AbortWithStatus(http.StatusUnauthorized)
	})

	// 模拟 403 Forbidden
	router.GET("/403", func(ctx *gin.Context) {
		ctx.AbortWithStatus(http.StatusForbidden)
	})

	// 启动Gin Server
	log.Fatalln(router.Run(":80"))
}
```

创建模板文件

```bash
# templates/401.html
<!DOCTYPE html>
<html>
<head>
  <title>401 Unauthorized</title>
</head>
<body>
<h1>401 Unauthorized</h1>
<p>Sorry, you are not authorized to access this page.</p>
</body>
</html>

# templates/403.html
<!DOCTYPE html>
<html>
<head>
  <title>403 Forbidden</title>
</head>
<body>
<h1>403 Forbidden</h1>
<p>Sorry, you don't have permission to access this page.</p>
</body>
</html>

# templates/404.html
<!DOCTYPE html>
<html>
<head>
  <title>404 Not Found</title>
</head>
<body>
<h1>404 Not Found</h1>
<p>Sorry, the page you are looking for could not be found.</p>
</body>
</html>
```

输出结果

```bash
# 401
C:\Users\Administrator\Desktop> curl -i http://127.0.0.1/401
HTTP/1.1 401 Unauthorized
Date: Thu, 18 May 2023 15:11:30 GMT
Content-Length: 187
Content-Type: text/html; charset=utf-8

<!DOCTYPE html>
<html>
<head>
  <title>401 Unauthorized</title>
</head>
<body>
<h1>401 Unauthorized</h1>
<p>Sorry, you are not authorized to access this page.</p>
</body>
</html>

# 403
C:\Users\Administrator\Desktop> curl -i http://127.0.0.1/403
HTTP/1.1 403 Forbidden
Date: Thu, 18 May 2023 15:11:43 GMT
Content-Length: 184
Content-Type: text/html; charset=utf-8

<!DOCTYPE html>
<html>
<head>
  <title>403 Forbidden</title>
</head>
<body>
<h1>403 Forbidden</h1>
<p>Sorry, you don't have permission to access this page.</p>
</body>
</html>

# 404
C:\Users\Administrator\Desktop> curl -i http://127.0.0.1/404
HTTP/1.1 404 Not Found
Content-Type: text/html; charset=utf-8
Date: Thu, 18 May 2023 15:12:03 GMT   
Content-Length: 186

<!DOCTYPE html>
<html>
<head>
  <title>404 Not Found</title>
</head>
<body>
<h1>404 Not Found</h1>
<p>Sorry, the page you are looking for could not be found.</p>
</body>
</html>
```

:::

::: details （2）5xx响应

```go
package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.New()
	router.Use(gin.Logger())

	// 设置HTML模板
	router.LoadHTMLGlob("templates/*.html")

	// 自定义处理 500 的中间件
	router.Use(func(ctx *gin.Context) {
		defer func() {
			if ctx.Writer.Status() == http.StatusInternalServerError {
				ctx.HTML(http.StatusInternalServerError, "500.html", gin.H{})
				ctx.Abort()
			}
		}()
		ctx.Next()
	})

	// 模拟 500 InternalServerError
	router.GET("/500", func(ctx *gin.Context) {
		ctx.AbortWithStatus(http.StatusInternalServerError)
	})

	// 启动Gin Server
	log.Fatalln(router.Run(":80"))
}
```

输出结果

```bash
# templates/500.html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>500 Internal Server Error</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 50px;
        }
        h1 {
            font-size: 36px;
            margin-bottom: 20px;
        }
        p {
            font-size: 18px;
        }
    </style>
</head>
<body>
<h1>500 Internal Server Error</h1>
<p>Sorry, something went wrong on the server.</p>
</body>
</html>

# 注意：5xx报错和4xx报错性质是一样的，和代码的panic并不是一回事
C:\Users\Administrator\Desktop> curl -i http://127.0.0.1/500
HTTP/1.1 500 Internal Server Error               
Date: Sat, 10 Jun 2023 13:38:48 GMT              
Content-Length: 530                              
Content-Type: text/html; charset=utf-8           
                                                 
<!DOCTYPE html>                                  
<html>                                           
<head>                                           
    <meta charset="UTF-8">                       
    <title>500 Internal Server Error</title>     
    <style>                                      
        body {                                   
            font-family: Arial, sans-serif;      
            text-align: center;                  
            padding: 50px;                       
        }                                        
        h1 {                                     
            font-size: 36px;                     
            margin-bottom: 20px;                 
        }                                        
        p {                                      
            font-size: 18px;                     
        }                                        
    </style>                                     
</head>                                          
<body>                                           
<h1>500 Internal Server Error</h1>
<p>Sorry, something went wrong on the server.</p>
</body>
</html>
```

:::

<br />

## 参数解析

#### 查询字符串

::: details 点击查看完整代码

| 方法                                                | 说明                                                         |
| --------------------------------------------------- | ------------------------------------------------------------ |
| `Query(key string) string`                          | 获取key的值，若获取不到返回空字符串，若传递多个则只获取第一个 |
| `QueryArray(key string) []string`                   | 类似`Query`，可以获取多个值                                  |
| `DefaultQuery(key, defaultValue string) string`     | 类似`Query`，可以自定义默认值                                |
| `QueryMap(key string) map[string]string`            | 获取key的值，返回 Map                                        |
| `GetQuery(key string) (string, bool)`               | 类似`Query`，返回两个值，ok代表是否获取到值                  |
| `GetQueryArray(key string) ([]string, bool)`        | 类似`QueryArray`，返回两个值，ok代表是否获取到值             |
| `GetQueryMap(key string) (map[string]string, bool)` | 类似`QueryMap`，返回两个值，ok代表是否获取到值               |

```go
package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/", func(ctx *gin.Context) {
		user := ctx.QueryMap("user")
		ctx.IndentedJSON(http.StatusOK, user)
	})

	log.Fatalln(router.Run(":80"))
}
```

输出结果

```bash
C:\Users\Administrator> curl "http://127.0.0.1/?user\[id\]=10000&user\[name\]=bob"
{
    "id": "10000",
    "name": "bob"
}
```

:::

<br />

#### 表单解析

::: details （1）提交表单示例

| 方法                                                   | 说明                                                         |
| ------------------------------------------------------ | ------------------------------------------------------------ |
| `PostForm(key string) string`                          | 解析表单，若获取不到返回空字符串，若获取到多个则只返回第一个 |
| `PostFormArray(key string) []string`                   | 类似`PostForm`，可以获取多个值                               |
| `PostFormMap(key string) map[string]string`            | 类似`PostForm`，返回 Map                                     |
| `GetPostForm(key string) (string, bool)`               | 类似`PostForm`，返回两个值，ok代表是否获取到值               |
| `GetPostFormArray(key string) ([]string, bool)`        | 类似`PostFormArray`，返回两个值，ok代表是否获取到值          |
| `GetPostFormMap(key string) (map[string]string, bool)` | 类似`PostFormMap`，返回两个值，ok代表是否获取到值            |
| `DefaultPostForm(key, defaultValue string) string`     | 类似`PostForm`，可以设置默认值                               |

```go
package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func postFormHandler(ctx *gin.Context) {
	contentType := ctx.GetHeader("Content-Type")
	username := ctx.PostForm("username")
	password := ctx.PostForm("password")
	ctx.IndentedJSON(http.StatusOK, gin.H{
		"header": gin.H{"ContentType": contentType},
		"data": gin.H{
			"username": username,
			"password": password,
		},
	})
}

func main() {
	router := gin.Default()

	router.GET("/", postFormHandler)
	router.POST("/", postFormHandler)

	log.Fatalln(router.Run(":80"))
}
```

输出结果

```bash
# -------------先使用POST方法测试------------------------------------------------------
# 什么都不传，服务端接收到空字符串
curl http://127.0.0.1/ -XPOST
{
    "data": {
        "password": "",
        "username": ""
    },
    "header": {
        "ContentType": ""
    }
}

# ⭐使用-d参数提交数据, curl会自动设置 Content-Type为application/x-www-form-urlencoded
curl http://127.0.0.1/ -XPOST -d "username=root&password=123456测试汉字"
{
    "data": {
        "password": "123456测试汉字",
        "username": "root"
    },
    "header": {
        "ContentType": "application/x-www-form-urlencoded"
    }
}

# 给curl设置一个错误的Content-Type,可以看到服务端获取不到我们提交的数据了
curl http://127.0.0.1/ -XPOST -XPOST -d "username=root&password=123456测试汉字" -H "Content-Type:abc"
{
    "data": {
        "password": "",
        "username": ""
    },
    "header": {
        "ContentType": "abc"
    }
}


# ⭐使用-f参数提交表单，curl会自动设置Content-Type为multipart/form-data
curl http://127.0.0.1/ -XPOST -XPOST --form username=root --form password=中国你好
{
    "data": {
        "password": "中国你好",
        "username": "root"
    },
    "header": {
        "ContentType": "multipart/form-data; boundary=------------------------14a01f4f04cd8866"
    }
}


# -------------再使用GET方法测试------------------------------------------------------
curl http://127.0.0.1/ -XGET -d "username=root&password=123456测试汉字"
{
    "data": {
        "password": "",
        "username": ""
    },
    "header": {
        "ContentType": "application/x-www-form-urlencoded"
    }
}


curl http://127.0.0.1/ -XGET --form username=root --form password=中国你好
{
    "data": {
        "password": "中国你好",
        "username": "root"
    },
    "header": {
        "ContentType": "multipart/form-data; boundary=------------------------875fac19a0463f4c"
    }
}
```

:::

::: details （2）HTML中的form标签默认使用application/x-www-form-urlencoded

```go
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<form action="http://127.0.0.1/" method="post">
    <!-- 默认enctype的值为application/x-www-form-urlencoded -->
    <!--<form action="http://127.0.0.1/" method="post" enctype="application/x-www-form-urlencoded">-->
    <label>
        <span>用户名</span>
        <input type="text" name="username" placeholder="请输入您的用户名" autocomplete="off" autofocus>
    </label>
    <label>
        <span>密码</span>
        <input type="password" name="password" placeholder="请输入您的密码" autocomplete="off">
    </label>
    <input type="submit" value="登录">
</form>
</body>
</html>
```

:::

<br />

#### 参数绑定

::: details （1）GET查询字符串参数绑定

```go
package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

// 第一次使用参数绑定注意事项：
// (1) 结构体字段必须可导出(首字母大写)
// (2) 绑定时必须用结构体指针(因为要给外部变量赋值嘛)

// 查询字符串参数绑定
// (3) form可选，如果不写，传递参数时必须与结构体名字一致
// (4) Content-Type有没有都无所谓

type User struct {
	Username string `form:"username"`
	Password string `form:"password"`
}

func main() {
	router := gin.Default()

	router.GET("/", func(ctx *gin.Context) {
		contentType := ctx.GetHeader("Content-Type")

		// 参数绑定
		var user User
		err := ctx.ShouldBind(&user)
		if err != nil {
			ctx.IndentedJSON(http.StatusBadRequest, gin.H{
				"Content-Type": contentType,
				"Message":      "请求参数错误" + err.Error(),
			})
			return
		}

		// 返回响应
		ctx.IndentedJSON(http.StatusOK, gin.H{
			"Content-Type": contentType,
			"Username":     user.Username,
			"Password":     user.Password,
		})
	})

	log.Fatalln(router.Run(":80"))
}
```

输出结果

```bash
curl "http://127.0.0.1/"
{
    "Content-Type": "",
    "Password": "",
    "Username": ""
}

curl "http://127.0.0.1/?username=root&password=123456"
{
    "Content-Type": "",
    "Password": "123456",
    "Username": "root"
}
```

:::

::: details （2）POST表单参数绑定

```go
package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Post表单参数绑定注意事项
// (1) form可选，如果不写，传递参数时必须与结构体名字一致
// (2) Content-Type为
//		【application/x-www-form-urlencoded】或
//		【multipart/form-data;boundary=xx】都可以

type User struct {
	Username string `form:"username"`
	Password string `form:"password"`
}

func main() {
	router := gin.Default()

	router.POST("/", func(ctx *gin.Context) {
		contentType := ctx.GetHeader("Content-Type")

		// 参数绑定
		var user User
		err := ctx.ShouldBind(&user)
		if err != nil {
			ctx.IndentedJSON(http.StatusBadRequest, gin.H{
				"Content-Type": contentType,
				"Message":      "请求参数错误" + err.Error(),
			})
			return
		}

		// 返回响应
		ctx.IndentedJSON(http.StatusOK, gin.H{
			"Content-Type": contentType,
			"Username":     user.Username,
			"Password":     user.Password,
		})
	})

	log.Fatalln(router.Run(":80"))
}
```

输出结果

```bash
C:\Users\Administrator>curl http://127.0.0.1/ -XPOST -d "username=root&password=123456测试汉字"
{
    "Content-Type": "application/x-www-form-urlencoded",
    "Password": "123456测试汉字",
    "Username": "root"
}

C:\Users\Administrator>curl http://127.0.0.1/ -XPOST --form username=root --form password=中国你好
{
    "Content-Type": "multipart/form-data; boundary=------------------------f56cfab4c132b278",
    "Password": "中国你好",
    "Username": "root"
}
```

:::

::: details （3）POST JSON参数绑定

```go
package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

// POST JSON参数绑定注意事项：
// (1) 结构体Tag中json可选，如果不写，传递参数时必须与结构体名字一致
// (2) Content-Type必须设置成application/json

type User struct {
	Username string `form:"username"`
	Password string `form:"password"`
}

func main() {
	router := gin.Default()

	router.POST("/", func(ctx *gin.Context) {
		contentType := ctx.GetHeader("Content-Type")

		// 参数绑定
		var user User
		err := ctx.ShouldBind(&user)
		if err != nil {
			ctx.IndentedJSON(http.StatusBadRequest, gin.H{
				"Content-Type": contentType,
				"Message":      "请求参数错误" + err.Error(),
			})
			return
		}

		// 返回响应
		ctx.IndentedJSON(http.StatusOK, gin.H{
			"Content-Type": contentType,
			"Username":     user.Username,
			"Password":     user.Password,
		})
	})

	log.Fatalln(router.Run(":80"))
}
```

输出结果

```bash
# Windows下需要对双引号转义, 最外层必须使用双引号
curl http://127.0.0.1/ -XPOST -H "Content-Type: application/json" -d "{\"username\":\"John\",\"password\"
{
    "Content-Type": "application/json",
    "Password": "123456",
    "Username": "John"
}

# Linux下最外层使用单引号包裹即可
[root@node-1 ~]# curl http://192.168.123.88/ -XPOST -H "Content-Type: application/json" -d '{"username":"John","password":"123456"}' ; echo
{
    "Content-Type": "application/json",
    "Password": "123456",
    "Username": "John"
}
```

:::

::: details （4）多次参数绑定问题

```go
package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
)

// 多次参数绑定注意事项：
// 问题描述：
// 		对于部分格式数据(JSON, XML, MsgPack, ProtoBuf)使用ShouldBind多次绑定会出错,
//		原因是c.Request.Body不可以重用，第二次读取就会出现EOF
//      对于其他格式（Query, Form, FormPost, FormMultipart）则可以多次调用c.ShouldBind()
// 解决办法：
// 		使用ShouldBindBodyWith绑定, JSON格式的绑定可以简写为 ctx.ShouldBindJSON(&user)

type User struct {
	Username string `form:"username"`
	Password string `form:"password"`
}

func main() {
	router := gin.Default()

	router.POST("/", func(ctx *gin.Context) {
		contentType := ctx.GetHeader("Content-Type")

		// 参数绑定-1
		var user1 User
		err := ctx.ShouldBindBodyWith(&user1, binding.JSON)
		if err != nil {
			ctx.IndentedJSON(http.StatusBadRequest, gin.H{
				"Content-Type": contentType,
				"Message":      "请求参数错误" + err.Error(),
			})
			return
		}

		// 参数绑定-2
		var user2 User
		err = ctx.ShouldBindBodyWith(&user2, binding.JSON)
		if err != nil {
			ctx.IndentedJSON(http.StatusBadRequest, gin.H{
				"Content-Type": contentType,
				"Message":      "请求参数错误" + err.Error(),
			})
			return
		}

		// 返回响应
		ctx.IndentedJSON(http.StatusOK, gin.H{
			"header": gin.H{
				"Content-Type": contentType,
			},
			"data": []gin.H{
				{
					"Username1": user1.Username,
					"Password1": user1.Password,
				},
				{
					"Username2": user2.Username,
					"Password2": user2.Password,
				},
			},
		})
	})

	log.Fatalln(router.Run(":80"))
}
```

输出结果

```bash
curl http://127.0.0.1/ -XPOST -H "Content-Type: application/json" -d "{\"username\":\"John\",\"password\":\"123456\"}"
{
    "data": [
        {
            "Password1": "123456",
            "Username1": "John"
        },
        {
            "Password2": "123456",
            "Username2": "John"
        }
    ],
    "header": {
        "Content-Type": "application/json"
    }
```

:::

<br />

#### 参数校验

`gin`参数校验使用的是`validator`库，因此具体的校验规则可以去下面的文档中查找

Github：[https://github.com/go-playground/validator](https://github.com/go-playground/validator)

文档：[https://pkg.go.dev/github.com/go-playground/validator](https://pkg.go.dev/github.com/go-playground/validator)

::: details 点击查看完整代码

```go
package main

import (
	"log"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

// 参数校验都卸载binding后面，常见的规则有：
// 		required  必选参数
//		omitempty 可选参数
//		max/min/le/lt/ge/gt/eq/ne

// User 设置密码最少是8位
type User struct {
	Id       int    `json:"id" binding:"omitempty"`
	Username string `json:"username" binding:"required,min=5,max=20"`
	Password string `json:"password" binding:"required,min=8,max=20"`
}

func main() {
	router := gin.Default()

	router.POST("/", func(ctx *gin.Context) {
		contentType := ctx.GetHeader("Content-Type")

		// 参数绑定时校验
		var user User
		err := ctx.ShouldBind(&user)

		if err != nil {
			ctx.IndentedJSON(http.StatusBadRequest, gin.H{
				"Content-Type": contentType,
				"Message":      strings.Split(err.Error(), "\n"),
			})
			return
		}

		// 返回响应
		ctx.IndentedJSON(http.StatusOK, gin.H{
			"Content-Type": contentType,
			"Username":     user.Username,
			"Password":     user.Password,
		})
	})

	log.Fatalln(router.Run(":80"))
}
```

输出结果

```bash
curl http://127.0.0.1/ -XPOST -H "Content-Type: application/json" -d "{\"username\":\"John\",\"password\":\"123456\"}"
{
    "Content-Type": "application/json",
    "Message": [
        "Key: 'User.Username' Error:Field validation for 'Username' failed on the 'min' tag",
        "Key: 'User.Password' Error:Field validation for 'Password' failed on the 'min' tag"
    ]
}
```

:::

<br />

### 文件上传下载

#### 文件上传

::: details （1）上传单文件

```go
package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// 参数调整
	//   router.MaxMultipartMemory 当读取的文件大小超过这个值就会进行刷盘, 默认内存限制为32MB
	//   router.MaxMultipartMemory = 64 << 20 // 64 MB
	router.POST("/", func(ctx *gin.Context) {
		contentType := ctx.GetHeader("Content-Type")

		// 读取文件
		f, err := ctx.FormFile("filename")
		if err != nil {
			ctx.IndentedJSON(http.StatusBadRequest, gin.H{
				"Message": err.Error(),
			})
			return
		}

		// 保存文件,如果文件已经存在则会覆盖
		err = ctx.SaveUploadedFile(f, f.Filename)
		if err != nil {
			ctx.IndentedJSON(http.StatusInternalServerError, gin.H{
				"Message": err.Error(),
			})
			return
		}

		// 返回响应
		ctx.IndentedJSON(http.StatusOK, gin.H{
			"Content-Type": contentType,
			"Message":      "ok",
		})
	})

	log.Fatalln(router.Run(":80"))
}
```

输出结果

```bash
# -F "filename=@main.go" filename字段和代码中的filename相对应
D:\application\GoLand\example> curl http://127.0.0.1/ -XPOST -F "filename=@main.go" 
{
    "Content-Type": "multipart/form-data; boundary=------------------------df62ed492254df1b",
    "Message": "ok"
}
```

:::

::: details （2）上传多文件

```go
package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// 参数调整
	//   router.MaxMultipartMemory 当读取的文件大小超过这个值就会进行刷盘, 默认内存限制为32MB
	//   router.MaxMultipartMemory = 64 << 20 // 64 MB
	router.POST("/", func(ctx *gin.Context) {
		contentType := ctx.GetHeader("Content-Type")

		// 读取文件列表
		form, err := ctx.MultipartForm()
		if err != nil {
			ctx.IndentedJSON(http.StatusBadRequest, gin.H{
				"Message": err.Error(),
			})
			return
		}

		// 返回一个切片 []*FileHeader
		files := form.File["files"]
		if len(files) <= 0 {
			ctx.IndentedJSON(http.StatusBadRequest, gin.H{
				"Message": "未上传任何文件或未指定标识符files\n",
			})
			return
		}

		// 保存文件,如果文件已经存在则会覆盖
		for _, file := range files {
			err := ctx.SaveUploadedFile(file, file.Filename)
			if err != nil {
				ctx.IndentedJSON(http.StatusInternalServerError, gin.H{
					"Message": err.Error(),
				})
				return
			}
		}

		// 返回响应
		ctx.IndentedJSON(http.StatusOK, gin.H{
			"Content-Type": contentType,
			"Message":      "ok",
		})
	})

	log.Fatalln(router.Run(":80"))
}
```

输出结果

```bash
D:\application\GoLand\example>curl http://127.0.0.1/ -XPOST -F "files=@main.go" -F "files=@go.mod"
{                                                                                            
    "Content-Type": "multipart/form-data; boundary=------------------------5ec76a8772e412fb",
    "Message": "ok"                                                                          
}
```

:::

<br />

#### 文件下载

::: details 点击查看完整代码

```go
package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// 指定单个文件下载
	// 访问 http://127.0.0.1/main.go 会下载当前目录下的main.go文件
	router.GET("/main.go", func(ctx *gin.Context) {
		ctx.File("main.go")
	})

	// 指定多个文件下载
	// 访问 http://127.0.0.1/download/go.mod会下载当前目录下的go.mod文件
	// 访问 http://127.0.0.1/download/会报404错误
	router.Static("/download/", ".")

	// 静态文件服务器
	// 访问 http://127.0.0.1/fileserver/go.mod会下载go.mod文件
	// 访问 http://127.0.0.1/fileserver/会展示出当前目录下有哪些文件，点击可以下载（同样也可以打开子目录）
	router.StaticFS("/fileserver/", http.Dir("./"))

	log.Fatalln(router.Run(":80"))
}
```

输出结果

```bash
# 直接访问
C:\Users\Administrator\Desktop\a> curl http://127.0.0.1/main.go
package main

import (
        "log"
        "net/http"

        "github.com/gin-gonic/gin"
)

func main() {
        router := gin.Default()

        // 指定单个文件下载
        // 访问 http://127.0.0.1/main.go 会下载当前目录下的main.go文件
        router.GET("/main.go", func(ctx *gin.Context) {
                ctx.File("main.go")
        })

        // 指定多个文件下载
        // 访问 http://127.0.0.1/download/go.mod会下载当前目录下的go.mod文件
        // 访问 http://127.0.0.1/download/会报404错误
        router.Static("/download/", ".")

        // 静态文件服务器
        // 访问 http://127.0.0.1/fileserver/go.mod会下载go.mod文件
        // 访问 http://127.0.0.1/fileserver/会展示出当前目录下有哪些文件，点击可以下载（同样也可以打开子目录）
        router.StaticFS("/fileserver/", http.Dir("./"))

        log.Fatalln(router.Run(":80"))
}

# 下载
C:\Users\Administrator\Desktop\a> curl http://127.0.0.1/main.go -O
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   812  100   812    0     0  33134      0 --:--:-- --:--:-- --:--:-- 33833
```

:::

<br />

### 中间件

#### 中间件格式要求

::: details 点击查看详情

```go
func Default() *Engine {
	debugPrintWARNINGDefault()
	engine := New()
	engine.Use(Logger(), Recovery())	// 默认使用了两个中间件
	return engine
}

// 看一下Use参数要求
func (engine *Engine) Use(middleware ...HandlerFunc) IRoutes {
	engine.RouterGroup.Use(middleware...)
	engine.rebuild404Handlers()
	engine.rebuild405Handlers()
	return engine
}

type HandlerFunc func(*Context)
```

说明

* 只要符合`func(*Context)`函数定义，就可以是一个中间件
* 在中间件中调用`ctx.Next()`，可以穿透中间件，执行后面的逻辑
* 可以这样理解，`ctx.Next()`上面的代码在Handler处理之前执行，下面的代码则在Handler处理之后执行
* 在中间件中调用`c.Abort()`，可以阻止穿透中间件

:::

<br />

#### 中间件使用示例

::: details （1）注册全局中间件

```go
package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"time"
)

// 计算每次请求花费时间中间件
func RequestCostMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// 开始计时
		start := time.Now()
		fmt.Println(start)
		// 调用后续的处理逻辑，在本代码中会执行后面的Handler逻辑
		c.Next()

		// 结束计时(单位毫秒)
		timedelta := time.Since(start).Milliseconds()

		// 输出结果
		fmt.Printf("%-4s %-s: Used %d milliseconds\n", c.Request.Method, c.Request.URL, timedelta)
	}
}

func main() {
	// 监听地址
	addr := "127.0.0.1:80"

	// 实例化Gin路由引擎
	r := gin.Default()

	// 中间件使用方式一: 注册全局中间件,对所有路由有效
	r.Use(RequestCostMiddleware())

	// 注册路由
	r.GET("/", func(c *gin.Context) {
		time.Sleep(time.Millisecond * 30) // 休眠30毫秒
		c.JSON(http.StatusOK, gin.H{
			"Message": "Hello Gin!",
		})
	})

	// 启动Gin Server
	log.Fatalln(r.Run(addr))
}
```

:::

::: details （2）注册单个路由中间件

```go
package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"time"
)

// 计算每次请求花费时间中间件
func RequestCostMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// 开始计时
		start := time.Now()
		fmt.Println(start)
		// 调用后续的处理逻辑，在本代码中会执行后面的Handler逻辑
		c.Next()

		// 结束计时(单位毫秒)
		timedelta := time.Since(start).Milliseconds()

		// 输出结果
		fmt.Printf("%-4s %-s: Used %d milliseconds\n", c.Request.Method, c.Request.URL, timedelta)
	}
}

func main() {
	// 监听地址
	addr := "127.0.0.1:80"

	// 实例化Gin路由引擎
	r := gin.Default()

	// 注册路由
	// 注册单个路由中间件
	r.GET("/", RequestCostMiddleware(), func(c *gin.Context) {
		time.Sleep(time.Millisecond * 30) // 休眠30毫秒
		c.JSON(http.StatusOK, gin.H{
			"Message": "Hello Gin!",
		})
	})

	// 启动Gin Server
	log.Fatalln(r.Run(addr))
}
```

:::

::: details （3）注册路由组内全局中间件

```go
package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"time"
)

// 计算每次请求花费时间中间件
func RequestCostMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// 开始计时
		start := time.Now()
		fmt.Println(start)
		// 调用后续的处理逻辑，在本代码中会执行后面的Handler逻辑
		c.Next()

		// 结束计时(单位毫秒)
		timedelta := time.Since(start).Milliseconds()

		// 输出结果
		fmt.Printf("%-4s %-s: Used %d milliseconds\n", c.Request.Method, c.Request.URL, timedelta)
	}
}

func main() {
	// 监听地址
	addr := "127.0.0.1:80"

	// 实例化Gin路由引擎
	r := gin.Default()

	// 注册路由组
	apiV1 := r.Group("/api/v1")

	// 路由组内注册全局中间件,仅对路由内的所有路由生效
	apiV1.Use(RequestCostMiddleware())

	apiV1.GET("/", RequestCostMiddleware(), func(c *gin.Context) {
		time.Sleep(time.Millisecond * 30) // 休眠30毫秒
		c.JSON(http.StatusOK, gin.H{
			"Message": "Hello Gin!",
		})
	})

	// 启动Gin Server
	log.Fatalln(r.Run(addr))
}
```

:::

<br />

#### 执行顺序问题

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

func MyMiddleware(name string) gin.HandlerFunc {
	return func(c *gin.Context) {
		fmt.Printf("中间件%s开始执行\n", name)
		c.Next() // 调用后续的处理逻辑，在本代码中会执行后面的Handler逻辑
		fmt.Printf("中间件%s结束执行\n", name)
	}
}

func main() {
	// 监听地址
	addr := "127.0.0.1:80"

	// 实例化Gin路由引擎
	r := gin.Default()

	// 注册全局中间件
	r.Use(
		MyMiddleware("m1"),
		MyMiddleware("m2"),
		MyMiddleware("m3"),
	)

	// 注册路由组
	r.GET("/", MyMiddleware("m4"), func(c *gin.Context) {
		fmt.Println("Handler开始执行")
		c.JSON(http.StatusOK, gin.H{
			"Message": "Hello Gin!",
		})
		fmt.Println("Handler结束执行")
	})

	// 启动Gin Server
	log.Fatalln(r.Run(addr))
}
```

输出结果

```bash
# 可以看到，与我们注册的顺序保持一致
# 注意：全局中间件注册要在路由注册之前，否则不会执行到
中间件m1开始执行
中间件m2开始执行
中间件m3开始执行
中间件m4开始执行
Handler开始执行
Handler结束执行
中间件m4结束执行
中间件m3结束执行
中间件m2结束执行
中间件m1结束执行
```

:::

<br />

#### 跨中间件传值

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

func M1Middleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// 设置值
		c.Set("m1", "m1 value")

		// 调用后续的处理逻辑，在本代码中会执行后面的Handler逻辑
		c.Next()
	}
}

func M2Middleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// 设置值
		c.Set("m2", make([]int, 3))

		// 调用后续的处理逻辑，在本代码中会执行后面的Handler逻辑
		c.Next()
	}
}

func main() {
	// 监听地址
	addr := "127.0.0.1:80"

	// 实例化Gin路由引擎
	r := gin.Default()

	// 注册全局中间件
	r.Use(
		M1Middleware(),
		M2Middleware(),
	)

	// 注册路由组
	r.GET("/", func(c *gin.Context) {
		m1, ok := c.Get("m1")
		if ok {
			fmt.Printf("拿到M1中间件的值: %#v\n", m1)
		}

		m2, ok := c.Get("m2")
		if ok {
			fmt.Printf("拿到M2中间件的值: %#v\n", m2)
		}

		c.JSON(http.StatusOK, gin.H{
			"Message": "Hello Gin!",
		})
	})

	// 启动Gin Server
	log.Fatalln(r.Run(addr))
}
```

输出结果

```bash
拿到M1中间件的值: "m1 value"
拿到M2中间件的值: []int{0, 0, 0}
```

:::

<br />

#### 开启Goroutine

::: details 点击查看完整代码

```go
package main

import (
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"sync"
)

func Change(c *gin.Context, wg *sync.WaitGroup) {
	c.Request.Method = http.MethodPost
	wg.Done()
}

func M1Middleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// 当需要开启一个Goroutine时应该使用c.Copy()，而不是直接修改原始对象
		wg := new(sync.WaitGroup)
		wg.Add(1)
		//go Change(c, wg)
		go Change(c.Copy(), wg) // 应该使用c.Copy
		wg.Wait()

		// 调用后续的处理逻辑，在本代码中会执行后面的Handler逻辑
		c.Next()
	}
}

func main() {
	// 监听地址
	addr := "127.0.0.1:80"

	// 实例化Gin路由引擎
	r := gin.Default()

	// 注册全局中间件
	r.Use(M1Middleware())

	// 注册路由组
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"Method":  c.Request.Method,
			"Message": "Hello Gin!",
		})
	})

	// 启动Gin Server
	log.Fatalln(r.Run(addr))
}
```

:::

<br />

#### 中间件收集列表

内置中间件：

* `gin.BasicAuth()`、`gin.BasicAuthForRealm()`

第三方中间件：

* 官方收集：[https://github.com/gin-gonic/contrib](https://github.com/gin-gonic/contrib)
