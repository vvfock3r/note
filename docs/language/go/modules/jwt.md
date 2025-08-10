# JWT

官网：[https://jwt.io/](https://jwt.io/)

Go客户端库：[https://github.com/golang-jwt/jwt](https://github.com/golang-jwt/jwt)

<br />

## 原理介绍

JWT（JSON Web Token）是一种用于在网络应用间传递声明的开放标准（RFC 7519），它以紧凑且自包含的方式传递信息，通常用于身份验证和授权



<br />

## 结构组成

JWT由三部分组成，通过点号（.）分隔开：

* Header（头部）：JWT的头部包含了关于该令牌的元数据和签名算法的信息。通常使用Base64编码表示，例如

  ```go
  // "alg"表示签名算法, "typ"表示令牌类型
  
  {
    "alg": "HS256",
    "typ": "JWT"
  }
  ```

* Payload（负载）：JWT的负载是包含有关声明和要传递的信息的部分。负载可以包含标准的声明（如身份信息、权限等）和自定义的声明。同样，负载也是Base64编码的，例如：

  ```go
  // "sub"表示主题（Subject）, "name"表示姓名, "iat"表示令牌的签发时间
  
  {
    "sub": "1234567890",
    "name": "John Doe",
    "iat": 1626352377
  }
  ```

* Signature（签名）：JWT的签名部分是使用指定的算法对头部和负载进行签名的结果，以确保数据的完整性和验证令牌的来源。签名通常使用密钥进行计算，只有持有密钥的一方才能验证和解析JWT。签名部分的形式如下：

  ```go
  // 使用HMAC-SHA256算法和密钥(secret)对头部和负载进行签名
  
  HMACSHA256(
    base64UrlEncode(header) + "." +
    base64UrlEncode(payload),
    secret
  )
  ```

<br />

## 安装模块

```bash
go get -u github.com/golang-jwt/jwt/v4
```

<br />

## 简单示例

::: details 点击查看详情

```go
package main

import (
	"fmt"

	"github.com/golang-jwt/jwt/v4"
)

func main() {
	// 填入第一段信息（Header信息）
	token := jwt.New(jwt.SigningMethodHS256)

	// 填入第二段信息（Payload信息）
	token.Claims = jwt.MapClaims{"sub": "1234567890", "name": "John Doe", "iat": 1516239022}

	// 组合第一段和第二段信息，下面3段代码是一样的，输出结果也是一样的
	{
		sig, err := token.SigningString()
		if err != nil {
			panic(err)
		}
		fmt.Printf("组合第一和第二段信息: %s\n", sig)
	}
	{
		sig, err := token.SigningString()
		if err != nil {
			panic(err)
		}
		fmt.Printf("组合第一和第二段信息: %s\n", sig)
	}
	{
		sig, err := token.SigningString()
		if err != nil {
			panic(err)
		}
		fmt.Printf("组合第一和第二段信息: %s\n", sig)
	}

	// 计算签名，下面3段代码是一样的，key一样，所以输出结果也是一样的
	fmt.Println()
	{
		t, err := token.SignedString([]byte("hello world!"))
		if err != nil {
			panic(err)
		}
		fmt.Printf("通过以上信息计算签名: %s\n", t)
	}
	{
		t, err := token.SignedString([]byte("hello world!"))
		if err != nil {
			panic(err)
		}
		fmt.Printf("通过以上信息计算签名: %s\n", t)
	}
	{
		t, err := token.SignedString([]byte("hello world!"))
		if err != nil {
			panic(err)
		}
		fmt.Printf("通过以上信息计算签名: %s\n", t)
	}

	// 查看JWT
	fmt.Println()
	fmt.Printf("查看JWT第一段: Header   : %#v\n", token.Header)
	fmt.Printf("查看JWT第二段: Payload  : %#v\n", token.Claims)
	fmt.Printf("查看JWT第三段: Signature: %#v\n", token.Signature)
}
```

输出结果

![image-20221003172743697](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221003172743697.png)

发现了什么？

* `JWT`中`Payload`在库中称为`Claims`

* `Token.SigningString()`仅仅是用来组合第一段和第二段信息的

* `Token.SignedString(key interface{})`才是签发`token`的方法，参数必须是`[]byte`，否则会报错 `key is of invalid type`

* 生成`token`以后并不会存储在`Token.Signature`中；在解析`token`时才会使用这个字段存储

* 也可以在实例化时填入`Payload`：

  ```go
  // 填入第一段和第二段信息（Header和Payload信息）
  claims := jwt.MapClaims{"sub": "1234567890", "name": "John Doe", "iat": 1516239022}
  token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
  ```

* 我们所有的参数和 https://jwt.io/ 上的保持一致，但是token却不一样，这是为什么呢？

  原因在于`payload`中的数据顺序不一致，我们修改一下官网中`payload`数据顺序

  ![image-20221003185834897](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221003185834897.png)

  

:::

<br />

## 负载详解

文档：[https://jwt.io/introduction](https://jwt.io/introduction)

这里主要说一下 [Registered claims](https://tools.ietf.org/html/rfc7519#section-4.1)，他是一组已经提前预定义好的claims，包括以下7个字段

* `iss`（Issuer）：签发人
* `sub`（Subject）：主题
* `aud`（Audience）：受众，也就是预期接收者
* `exp`（Expiration Time）：过期时间
* `nbf`（Not Before）：生效时间
* `iat`（Issued At）：签发时间
* `jti`（JWT ID）: JWT ID

我们也可以自定义字段，比如

```json
{
    "admin": true
}
```

在 `golang-jwt/jwt`库中也有相关的定义

```go
type RegisteredClaims struct {
	// the `iss` (Issuer) claim. See https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.1
	Issuer string `json:"iss,omitempty"`

	// the `sub` (Subject) claim. See https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.2
	Subject string `json:"sub,omitempty"`

	// the `aud` (Audience) claim. See https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.3
	Audience ClaimStrings `json:"aud,omitempty"`

	// the `exp` (Expiration Time) claim. See https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.4
	ExpiresAt *NumericDate `json:"exp,omitempty"`

	// the `nbf` (Not Before) claim. See https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.5
	NotBefore *NumericDate `json:"nbf,omitempty"`

	// the `iat` (Issued At) claim. See https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.6
	IssuedAt *NumericDate `json:"iat,omitempty"`

	// the `jti` (JWT ID) claim. See https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.7
	ID string `json:"jti,omitempty"`
}
```

<br />

## 签发和验证Token

::: details 点击查看详情

```go
package main

import (
	"encoding/base64"
	"errors"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

type Claims struct {
	RegisteredClaims
	PrivateClaims
}

type RegisteredClaims = jwt.RegisteredClaims

type PrivateClaims struct {
	UserName string `json:"username,omitempty"`
	NickName string `json:"nickname,omitempty"`
}

// 核心结构体
type JsonWebToken struct {
	secretKey string
}

// 签发token字符串
func (j *JsonWebToken) CreateToken(c Claims) (string, error) {
	// 实例化Token对象
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, c)

	// 签发token
	return token.SignedString([]byte(j.secretKey))
}

// 解析token字符串
func (j *JsonWebToken) ParseToken(tokenString string) (*Claims, error) {
	// 解析token字符串
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(j.secretKey), nil
	})
	if err != nil {
		return nil, err
	}

	// 验证token是否有效
	if !token.Valid {
		return nil, err
	}

	// 类型断言
	if claims, ok := token.Claims.(*Claims); ok {
		return claims, nil
	} else {
		return nil, errors.New("type Assertion error for JsonWebToken.Claims")
	}
}

// 签发token字符串（先使用base64对密钥编码）
func (j *JsonWebToken) CreateTokenWithBase64(c Claims) (string, error) {
	// 实例化Token对象
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, c)

	// secret使用base64编码
	secretKeyBase64 := base64.StdEncoding.EncodeToString([]byte(j.secretKey))

	// 签发token
	return token.SignedString([]byte(secretKeyBase64))
}

// 解析token字符串（先使用base64对密钥编码）
func (j *JsonWebToken) ParseTokenWithBase64(tokenString string) (*Claims, error) {
	// 解析token字符串
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		// secret使用base64编码
		secretKeyBase64 := base64.StdEncoding.EncodeToString([]byte(j.secretKey))
		return []byte(secretKeyBase64), nil
	})
	if err != nil {
		return nil, err
	}

	// 验证token是否有效
	if !token.Valid {
		return nil, err
	}

	// 类型断言
	if claims, ok := token.Claims.(*Claims); ok {
		return claims, nil
	} else {
		return nil, errors.New("type Assertion error for JsonWebToken.Claims")
	}
}

// 构造函数
func NewJsonWebToken(secretKey string) *JsonWebToken {
	return &JsonWebToken{secretKey}
}

func main() {
	// 实例化Jwt对象
	j := NewJsonWebToken("3E9yQqWT8F52hnIS")

	// 创建Claims对象
	claims := Claims{
		RegisteredClaims: RegisteredClaims{
			// 签发人
			Issuer: "https://jinhui.dev",
			// 主题
			Subject: "User Access Token",
			// 签发时间
			IssuedAt: jwt.NewNumericDate(time.Now()),
			// 生效时间，这里指定1秒后才会生效，若报错 token is not valid yet 说明还未生效
			NotBefore: jwt.NewNumericDate(time.Now().Add(time.Second * 1)),
			// 过期时间，这里指定生效以后2小时后就过期，若报错 token is expired by 2.9s 说明已经过期
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Second * 1).Add(time.Hour * 2)),
		},
		PrivateClaims: PrivateClaims{
			UserName: "admin",
			NickName: "自由女神跃长空【中文测试】",
		},
	}

	// 生成tokenString
	tokenString, err := j.CreateToken(claims)
	if err != nil {
		panic(err)
	}
	fmt.Println("Token   : ", tokenString)

	// 等待Token生效
	time.Sleep(time.Second)

	// 解析tokenString为Claims结构体
	c, err := j.ParseToken(tokenString)
	if err != nil {
		panic(err)
	}

	// 查看数据
	fmt.Printf("签发人  : %s\n", c.RegisteredClaims.Issuer)
	fmt.Printf("主题    : %s\n", c.RegisteredClaims.Subject)
	fmt.Printf("签发时间: %s\n", c.RegisteredClaims.IssuedAt)
	fmt.Printf("生效时间: %s\n", c.RegisteredClaims.NotBefore)
	fmt.Printf("过期时间: %s\n", c.RegisteredClaims.ExpiresAt)
}
```

输出结果

```bash
Token   :  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2ppbmh1aS5kZXYiLCJzdWIiOiJVc2VyIEFjY2VzcyBUb2tlbiIsImV4cCI6MTY2NDg3MTU0OSwibmJmIjoxNjY0ODY0MzQ5LCJpYXQiOjE2NjQ4NjQzNDgsInVzZXJuYW1lIjoiYWRtaW4iLCJuaWNrbmFtZSI6IuiH
queUseWls-elnui3g-mVv-epuuOAkOS4reaWh-a1i-ivleOAkSJ9.Euo2G2lFsPdjA-eZU26OxBIX6rbk0MHPyz_Saa2tKz0
签发人  : https://jinhui.dev
主题    : User Access Token
签发时间: 2022-10-04 14:19:08 +0800 CST
生效时间: 2022-10-04 14:19:09 +0800 CST
过期时间: 2022-10-04 16:19:09 +0800 CST
```

说明

* 这里并没有对`aud`（受众）测试
* 封装以后并没有暴露`jwt`内部对象（比如`Token`），如果有需要可以再修改一下代码

:::