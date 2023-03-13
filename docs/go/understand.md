# 深入理解Go

<br />

## 参考资料

* [奇伢云存储](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=Mzg3NTU3OTgxOA==&action=getalbum&album_id=1749948750287978500#wechat_redirect)

<br />

## 底层初探

### 汇编基础

https://go.dev/doc/asm

<br />

### 虚拟内存

* 当我们向系统申请内存时，系统并不会直接返回物理内存的地址，而是返回一个虚拟内存地址

* 只有当进程开始使用申请到的虚拟内存时，系统才会将虚拟地址映射到物理地址上，从而让程序使用真实的物理内存
* 虚拟内存是物理内存和进程之间的中间层，虚拟地址和物理地址的转换由内存管理单元（Memory Mangament Unit）完成
* 进程持有的内存地址实际上是虚拟内存地址，不同的进程可以有相同的虚拟内存地址，制造出一种每个进程的内存都是独立的假象



<br />

### ELF 文件

::: details （1）ELF文件：格式说明

ELF 是 Executable and Linkable Format 的缩写，是一种用于Linux可执行文件、目标文件、共享库和核心转储(core dump)的标准文件格式。

ELF 文件 **通常** 是编译器之类的输出，并且是二进制格式。以 Go 编译出的可执行文件为例，我们使用 file 命令即可看到其具体类型

```bash
[root@ap-hongkang example]# file main
main: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), statically linked, with debug_info, not stripped
```

使用 ELF 文件格式的可执行文件是由 **ELF 头（ELF Header）** 开始，后跟 **程序头（Program Header）** 或 **节头（Section Header）** 或两者均有组成的

:::

::: details （2）readelf：读取ELF Header

```bash
# 显示ELF文件Header
[root@ap-hongkang example]# readelf -h main
ELF Header:
  Magic:   7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00 
  Class:                             ELF64
  Data:                              2's complement, little endian
  Version:                           1 (current)
  OS/ABI:                            UNIX - System V
  ABI Version:                       0
  Type:                              EXEC (Executable file)
  Machine:                           Advanced Micro Devices X86-64
  Version:                           0x1
  Entry point address:               0x462b80
  Start of program headers:          64 (bytes into file)
  Start of section headers:          456 (bytes into file)
  Flags:                             0x0
  Size of this header:               64 (bytes)
  Size of program headers:           56 (bytes)
  Number of program headers:         7
  Size of section headers:           64 (bytes)
  Number of section headers:         23
  Section header string table index: 3
  
# 说明
# Magic 标识了这是一个ELF文件，以16进制数字显示
        # 第1个字节7f是前缀，在Linux源码中的定义 /usr/include/linux/elf.h
            #define ELFMAG0         0x7f            /* EI_MAG */
            #define ELFMAG1         'E'
            #define ELFMAG2         'L'
            #define ELFMAG3         'F'
            #define ELFMAG          "\177ELF"
            #define SELFMAG         4
		# 第2个字节 45 = E
		# 第3个字节 4c = L
		# 第4个字节 46 = F
		# 第5个字节 02代表64位, 01则代表32位, 与Class字段相对应
		# 第6个字节 01代表LSB, 02代表MSB, 与Data字段对应
			[root@ap-hongkang example]# cat /usr/include/linux/elf.h | grep ELFDATANONE -A 3
        	#define ELFDATANONE     0               /* e_ident[EI_DATA] */
        	#define ELFDATA2LSB     1
        	#define ELFDATA2MSB     2
        # 第7个字节 01 与Version字段对应

# 程序头开始位置 64, 程序头结束位置: 64  + 7 * 56  = 456
# 节头开始位置  456, 节头结束位置:  456 + 23 * 64 = 1928
```

:::

::: details （3）readelf：读取Program Header 和 Section Header

```bash
# 读取程序头
[root@ap-hongkang example]# readelf -l main

Elf file type is EXEC (Executable file)
Entry point 0x462b80
There are 7 program headers, starting at offset 64

Program Headers:
  Type           Offset             VirtAddr           PhysAddr
                 FileSiz            MemSiz              Flags  Align
  PHDR           0x0000000000000040 0x0000000000400040 0x0000000000400040
                 0x0000000000000188 0x0000000000000188  R      0x1000
  NOTE           0x0000000000000f9c 0x0000000000400f9c 0x0000000000400f9c
                 0x0000000000000064 0x0000000000000064  R      0x4
  LOAD           0x0000000000000000 0x0000000000400000 0x0000000000400000
                 0x00000000000a6930 0x00000000000a6930  R E    0x1000
  LOAD           0x00000000000a7000 0x00000000004a7000 0x00000000004a7000
                 0x00000000000b2f30 0x00000000000b2f30  R      0x1000
  LOAD           0x000000000015a000 0x000000000055a000 0x000000000055a000
                 0x0000000000035f80 0x00000000000679d0  RW     0x1000
  GNU_STACK      0x0000000000000000 0x0000000000000000 0x0000000000000000
                 0x0000000000000000 0x0000000000000000  RW     0x8
  LOOS+0x5041580 0x0000000000000000 0x0000000000000000 0x0000000000000000
                 0x0000000000000000 0x0000000000000000         0x8

 Section to Segment mapping:
  Segment Sections...
   00     
   01     .note.go.buildid 
   02     .text .note.go.buildid 
   03     .rodata .typelink .itablink .gosymtab .gopclntab 
   04     .go.buildinfo .noptrdata .data .bss .noptrbss 
   05     
   06
   
# 读取节头
[root@ap-hongkang example]# readelf -S main
There are 23 section headers, starting at offset 0x1c8:

Section Headers:
  [Nr] Name              Type             Address           Offset
       Size              EntSize          Flags  Link  Info  Align
  [ 0]                   NULL             0000000000000000  00000000
       0000000000000000  0000000000000000           0     0     0
  [ 1] .text             PROGBITS         0000000000401000  00001000
       00000000000a5930  0000000000000000  AX       0     0     32
  [ 2] .rodata           PROGBITS         00000000004a7000  000a7000
       0000000000042bf2  0000000000000000   A       0     0     32
  [ 3] .shstrtab         STRTAB           0000000000000000  000e9c00
       000000000000016d  0000000000000000           0     0     1
  [ 4] .typelink         PROGBITS         00000000004e9d80  000e9d80
       00000000000006b0  0000000000000000   A       0     0     32
  [ 5] .itablink         PROGBITS         00000000004ea440  000ea440
       0000000000000100  0000000000000000   A       0     0     32
  [ 6] .gosymtab         PROGBITS         00000000004ea540  000ea540
       0000000000000000  0000000000000000   A       0     0     1
  [ 7] .gopclntab        PROGBITS         00000000004ea540  000ea540
       000000000006f9f0  0000000000000000   A       0     0     32
  [ 8] .go.buildinfo     PROGBITS         000000000055a000  0015a000
       0000000000000170  0000000000000000  WA       0     0     16
  [ 9] .noptrdata        PROGBITS         000000000055a180  0015a180
       000000000002dcea  0000000000000000  WA       0     0     32
  [10] .data             PROGBITS         0000000000587e80  00187e80
       00000000000080f0  0000000000000000  WA       0     0     32
  [11] .bss              NOBITS           000000000058ff80  0018ff80
       000000000002e000  0000000000000000  WA       0     0     32
  [12] .noptrbss         NOBITS           00000000005bdf80  001bdf80
       0000000000003a50  0000000000000000  WA       0     0     32
  [13] .debug_abbrev     PROGBITS         0000000000000000  00190000
       0000000000000133  0000000000000000   C       0     0     1
  [14] .debug_line       PROGBITS         0000000000000000  00190133
       0000000000024058  0000000000000000   C       0     0     1
  [15] .debug_frame      PROGBITS         0000000000000000  001b418b
       0000000000006e4e  0000000000000000   C       0     0     1
  [16] .debug_gdb_script PROGBITS         0000000000000000  001bafd9
       000000000000002f  0000000000000000           0     0     1
  [17] .debug_info       PROGBITS         0000000000000000  001bb008
       0000000000041b30  0000000000000000   C       0     0     1
  [18] .debug_loc        PROGBITS         0000000000000000  001fcb38
       0000000000024600  0000000000000000   C       0     0     1
  [19] .debug_ranges     PROGBITS         0000000000000000  00221138
       000000000000c1a5  0000000000000000   C       0     0     1
  [20] .note.go.buildid  NOTE             0000000000400f9c  00000f9c
       0000000000000064  0000000000000000   A       0     0     4
  [21] .symtab           SYMTAB           0000000000000000  0022d2e0
       000000000000ee98  0000000000000018          22   106     8
  [22] .strtab           STRTAB           0000000000000000  0023c178
       000000000000e3ad  0000000000000000           0     0     1
Key to Flags:
  W (write), A (alloc), X (execute), M (merge), S (strings), I (info),
  L (link order), O (extra OS processing required), G (group), T (TLS),
  C (compressed), x (unknown), o (OS specific), E (exclude),
  l (large), p (processor specific)
  
# 注意这里有个 .go.buildinfo 的节头
```

:::

::: details （4）Go：读取ELF文件

```go
package main

import (
	"debug/elf"
	"encoding/binary"
	"fmt"
	"os"
	"strings"

	"github.com/alexeyco/simpletable"
)

func PrintFileHeaders(f *os.File) {
	// 转为 elf.File
	e, err := elf.NewFile(f)
	if err != nil {
		panic(err)
	}

	// 判断是32位还是64位,这里为了简单只处理64位
	switch e.FileHeader.Class {
	case elf.ELFCLASS64:
		// 读取数据写入到Header64结构体中
		header64 := new(elf.Header64)
		err := binary.Read(f, e.FileHeader.ByteOrder, header64)
		if err != nil {
			panic(err)
		}

		// Magic
		var ident []string
		for _, i := range header64.Ident {
			ident = append(ident, fmt.Sprintf("%.2x", i))
		}
		magic := strings.Join(ident, " ")

		fmt.Printf("ELF Header:\n")
		fmt.Printf("%-40s %s\n", "  Magic:", magic)
		fmt.Printf("%-40s %s\n", "  Class:", e.FileHeader.Class)
		fmt.Printf("%-40s %s\n", "  Data:", e.FileHeader.Data)
		fmt.Printf("%-40s %s\n", "  Version:", e.FileHeader.Version)
		fmt.Printf("%-40s %d\n", "  OS/ABI:", e.FileHeader.ABIVersion)
		fmt.Printf("%-40s %s\n", "  Type:", e.FileHeader.Type)
		fmt.Printf("%-40s %s\n", "  Machine:", e.FileHeader.Machine)
		fmt.Printf("%-40s %#x\n", "  Version:", header64.Version)
		fmt.Printf("%-40s %#x\n", "  Entry point address:", e.FileHeader.Entry)
		fmt.Printf("%-40s %d\n", "  Start of program headers:", header64.Phoff)
		fmt.Printf("%-40s %d\n", "  Start of section headers:", header64.Shoff)
		fmt.Printf("%-40s %#v\n", "  Flags:", header64.Flags)
		fmt.Printf("%-40s %d\n", "  Size of this header:", header64.Ehsize)
		fmt.Printf("%-40s %d\n", "  Size of program headers:", header64.Phentsize)
		fmt.Printf("%-40s %d\n", "  Number of program headers:", header64.Phnum)
		fmt.Printf("%-40s %d\n", "  Size of section headers:", header64.Shentsize)
		fmt.Printf("%-40s %d\n", "  Number of section headers:", header64.Shnum)
		fmt.Printf("%-40s %d\n", "  Section header string table index:", header64.Shstrndx)
	case elf.ELFCLASSNONE:
		panic("Unknown class")
	}
}

func PrintProgramHeaders(f *os.File) {
	// 转为 elf.File
	e, err := elf.NewFile(f)
	if err != nil {
		panic(err)
	}

	// 实例化table
	table := simpletable.New()

	// 设置Header
	table.Header = &simpletable.Header{
		Cells: []*simpletable.Cell{
			{Text: "Type"},
			{Text: "Offset"},
			{Text: "VirtAddr"},
			{Text: "PhysAddr"},
			{Text: "FileSiz"},
			{Text: "MemSiz"},
			{Text: "Flags"},
			{Text: "Align"},
		},
	}

	// 读取 Program Header
	for _, p := range e.Progs {
		row := []*simpletable.Cell{
			{Text: p.Type.String()},
			{Text: fmt.Sprintf("%#.16x", p.Off)},
			{Text: fmt.Sprintf("%#.16x", p.Vaddr)},
			{Text: fmt.Sprintf("%#.16x", p.Paddr)},
			{Text: fmt.Sprintf("%#.16x", p.Filesz)},
			{Text: fmt.Sprintf("%#.16x", p.Memsz)},
			{Text: p.Flags.String()},
			{Text: fmt.Sprintf("%#x", p.Align)},
		}
		table.Body.Cells = append(table.Body.Cells, row)
	}

	fmt.Println("Program Headers:")
	fmt.Println(table.String())
}

func main() {
	// 打开文件
	f, err := os.Open("main")
	if err != nil {
		panic(err)
	}
	defer f.Close()

	// 读取文件头
	PrintFileHeaders(f)

	// 读取程序头
	fmt.Println()
	PrintProgramHeaders(f)
}
```

:::

<br />

## 调试程序

### DLV调试工具

Github：[https://github.com/go-delve/delve](https://github.com/go-delve/delve)

说明：GoLand默认的就是DLV 调试工具

::: details （1）dlv工具安装

```bash
# 安装最新版本
go install github.com/go-delve/delve/cmd/dlv@latest

# 安装指定版本
go install github.com/go-delve/delve/cmd/dlv@v1.20.1

# 查看版本信息
C:\Users\Administrator> dlv version
Delve Debugger
Version: 1.20.1
Build: $Id: 96e65b6c615845d42e0e31d903f6475b0e4ece6e $
```

:::

::: details （2）dlv调试程序命令

```bash
# 方式1：自动编译源文件并开启调试：dlv debug [package] [flags]
D:\application\GoLand\example>dlv debug .
Type 'help' for list of commands.
(dlv)

# 方式2：直接调试二进制文件：dlv exec <path/to/binary> [flags]
#       建议编译时关闭优化 -gcflags="all=-N -l"
D:\application\GoLand\example>dlv exec main.exe
Type 'help' for list of commands.
(dlv)

# 方式3：对正在运行的进程直接进行调试：dlv attach pid [executable] [flags]
D:\application\GoLand\example>dlv attach 15304
Type 'help' for list of commands.
(dlv)
```

:::

<br />

### 寻找程序入口

::: details Linux平台

```bash
# 1、调试程序
[root@node-1 example]# dlv exec main
Type 'help' for list of commands.
(dlv) list
> _rt0_amd64_linux() /usr/local/go/1.20.2/src/runtime/rt0_linux_amd64.s:8 (PC: 0x45ed80)
Warning: debugging optimized function
     3: // license that can be found in the LICENSE file.
     4:
     5: #include "textflag.h"
     6:
     7: TEXT _rt0_amd64_linux(SB),NOSPLIT,$-8
=>   8:         JMP     _rt0_amd64(SB)
     9:
    10: TEXT _rt0_amd64_linux_lib(SB),NOSPLIT,$0
    11:         JMP     _rt0_amd64_lib(SB)

# 程序入口: rt0_linux_amd64.s
# rt代表runtime

(dlv) si
> _rt0_amd64() /usr/local/go/1.20.2/src/runtime/asm_amd64.s:16 (PC: 0x4643e0)
Warning: debugging optimized function
TEXT _rt0_amd64(SB) /usr/local/go/1.20.2/src/runtime/asm_amd64.s
=>      asm_amd64.s:16  0x4643e0        488b3c24        mov rdi, qword ptr [rsp]
        asm_amd64.s:17  0x4643e4        488d742408      lea rsi, ptr [rsp+0x8]
        asm_amd64.s:18  0x4643e9        e912000000      jmp $runtime.rt0_go

```

:::

::: details Windows平台：报错

```bash
D:\application\GoLand\example>dlv exec main.exe
Type 'help' for list of commands.
(dlv) list
Stopped at: 0x7ff8faa20951
=>   1: no source available
```

:::

<br />

## 类型系统

### string

::: details （1）现象

```go
package main

import (
	"fmt"
	"unsafe"
)

func main() {
	// 定义一个字符串
	str1 := "张三"
	str2 := "中华人民共和国"

	// 如何解释以下输出?
	fmt.Println(unsafe.Sizeof(str1), unsafe.Sizeof(str2))
	fmt.Println(len(str1), len(str2))
	fmt.Println(str1[0], str2[0])
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
16 16
6 21
229 228
```

:::

::: details （2）字符串的底层结构是 runtime.stringStruct

**先上结论**

```go
// 先看一下类型
// string is the set of all strings of 8-bit bytes, conventionally but not
// necessarily representing UTF-8-encoded text. A string may be empty, but
// not nil. Values of string type are immutable.
type string string

// 底层的结构体
type stringStruct struct {
	str unsafe.Pointer
	len int
}

// 有什么依据说明字符串的底层数据结构是stringStruct呢?
// 暂时没找到

// str 是一个通用指针,指向真正存储字符串数据的虚拟内存地址, 那么底层是用什么存储的呢?
// 字节数组, 注意不是字节切片

// len 长度代表的是字符串的长度还是底层结构的长度呢?
// 字节数组的长度
```

**字符串结构体**

```go
package main

import (
	"fmt"
	"reflect"
	"unsafe"
)

func main() {
	// 定义一个字符串
	strMsg := "张三"

	// 字符串的底层结构是 stringStruct 结构体, 是非可导出的
	// 但是 reflect.StringHeader 提供了与 stringStruct 相同的数据结构,并且是可导出的
	// type StringHeader struct {
	//	 Data uintptr --> uintptr与unsafe.Pointer是可以互相转化的,所以我们可以认为两个结构体是相同的数据结构
	//	 Len  int
	// }
	// 将 stringStruct 结构体 强转为 StringHeader 结构体
	strHeader := (*reflect.StringHeader)(unsafe.Pointer(&strMsg))
	fmt.Printf("%#v\n", strHeader)
    
    // 根据 reflect.StringHeader 的思路，我们将string转为一个我们自定义的可导出的结构体，然后进行一些hack操作
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
&reflect.StringHeader{Data:0x4453a4, Len:6}
```

**string 底层数组**

```go
package main

import (
	"fmt"
	"reflect"
	"unsafe"
)

func main() {
	// 定义一个字符串
	strMsg := "张三"

	// 将 stringStruct 结构体 强转为 StringHeader 结构体
	strHeader := (*reflect.StringHeader)(unsafe.Pointer(&strMsg))

	// 将 StringHeader.Data(也就是stringStruct.str) 强转为 []byte
	fmt.Println(*(*[]byte)(unsafe.Pointer(&strHeader.Data)))

	// 按字节遍历字符串
	for _, v := range []byte(strMsg) {
		fmt.Println(v)
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
[229 188 160 228 184 137]
229
188
160
228
184
137
```

:::

::: details （3）字符串底层是可变长编码

```go
package main

import (
	"fmt"
)

func main() {
	// 定义一个字符串
	str1 := "张三"
	str2 := "张三2"

	// 每个汉字占用3个字节, 每个ASCII字符占用1个字节
	fmt.Println(len(str1), len(str2))

	// 查看底层数组
	fmt.Println([]byte(str1))
	fmt.Println([]byte(str2))

	// 如果判断底层的字节数组是解码成汉字还是ASCII?
	// utf8包可以判断
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
6 7
[229 188 160 228 184 137]
[229 188 160 228 184 137 50]
```

:::

::: details （4）使用下标获取正确的中文

```go
package main

import "fmt"

func main() {
	// 定义一个字符串
	str := "张三"

	// 我想获得第2个汉字,该如何做呢?

	// 错误的方法: 获取的是字节切片的第一个字节
	fmt.Println(str[1])

	// 转为rune切片,取值,然后再转为字符串, 此方法对ASCII同样适用
	fmt.Println(string(([]rune(str))[1]))
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
188
三
```

:::

::: details （5）底层的是只读的字节切片

```go
package main

import "fmt"

func main() {
	str := "ab"

	// string底层是字节切片，可以访问
	fmt.Println(str[0])
	
	// 编译时会报错： cannot assign to str[0] (value of type byte)
    // 那么为什么不能修改?
	// 原因是：string底层的切片是只读切片，会被分配到只读段
	str[0] = "a"
}
```

:::

::: details （6）字符串是不可变的，但是结构体中的指针是可变的

```go
package main

import (
	"fmt"
	"reflect"
	"unsafe"
)

func main() {
	// 定义两个字符串
	str1 := "abc"
	str2 := "def"

	// 下面展示如何偷梁换柱
	// 将两个字符串stringStruct结构体中的Pointer指针互换

	// 获取结构体指针
	header1 := (*reflect.StringHeader)(unsafe.Pointer(&str1))
	header2 := (*reflect.StringHeader)(unsafe.Pointer(&str2))

	// 互换值
	header1.Data, header2.Data = header2.Data, header1.Data

	// 输出
	fmt.Println(str1, len(str1))
	fmt.Println(str2, len(str2))

	// 修改一个假的长度
	// 访问的时候会把字节切片转为字符串,会用到此长度,所以不能随便修改
	header1.Len, header2.Len = 1, 2

	fmt.Println(str1, len(str1))
	fmt.Println(str2, len(str2))
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
def 3
abc 3
d 1
ab 2
```

:::

