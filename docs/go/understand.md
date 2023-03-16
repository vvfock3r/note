# 深入理解Go

<br />

## 参考资料

* [奇伢云存储](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=Mzg3NTU3OTgxOA==&action=getalbum&album_id=1749948750287978500#wechat_redirect)

<br />

## 汇编语言

### 文档

NASM：

* 官网：[https://www.nasm.us/](https://www.nasm.us/)
* 文档：[https://www.nasm.us/docs.php](https://www.nasm.us/docs.php)

* Github：[https://github.com/netwide-assembler/nasm](https://github.com/netwide-assembler/nasm)

Go：

* 汇编说明：[https://go.dev/doc/asm](https://go.dev/doc/asm)

Other：

* [https://cee.github.io/NASM-Tutorial/](https://cee.github.io/NASM-Tutorial/)
* [https://nasm-tutorial.akash.website/](https://nasm-tutorial.akash.website/)
* [https://asmtutor.com/](https://asmtutor.com/)
* [https://www.tutorialspoint.com/assembly_programming/index.htm](https://www.tutorialspoint.com/assembly_programming/index.htm)

<br />

### 设置环境

::: details （1）汇编说明

汇编语言（Assembly Language）和CPU息息相关

<br />

汇编语言大致可以分为两类：

1. 基于x86架构处理器的汇编语言
   - Intel 汇编
     - DOS(8086处理器), Windows
     - Windows 派系 -> VC 编译器
   - AT&T 汇编
     - Linux, Unix, Mac OS, iOS(模拟器)
     - Unix派系 -> GCC编译器
2. 基于ARM 架构处理器的汇编语言
   - ARM 汇编

<br />

常见的汇编编译器：

* MASM：微软出品，只支持x86，用在DOS/Windows平台中
* GNU ASM：开源产品，主要用在Linux中，基本上支持大部分的CPU架构

<br />

常见的汇编文件扩展名：

* .asm
* .s

:::

::: details （2）【CentOS 7 + base源】 安装 NASM，版本较低

```bash
# 安装nasm
[root@node-1 ~]# yum -y install nasm

# 查看版本
[root@node-1 ~]# nasm -v
NASM version 2.10.07 compiled on Jun  9 2014
```

:::

::: details （3）【CentOS7 + NASM官网源】安装 NASM，版本较高，需升级glibc到较高版本

```bash
# 配置yum源
# 参考官网首页给出的地址: https://www.nasm.us/nasm.repo
[root@node-1 ~]# vim /etc/yum.repos.d/nasm.repo
[nasm]
name=The Netwide Assembler
baseurl=http://www.nasm.us/pub/nasm/stable/linux/
enabled=1
gpgcheck=0

[nasm-testing]
name=The Netwide Assembler (release candidate builds)
baseurl=http://www.nasm.us/pub/nasm/testing/linux/
enabled=0
gpgcheck=0

[nasm-snapshot]
name=The Netwide Assembler (daily snapshot builds)
baseurl=http://www.nasm.us/pub/nasm/snapshots/latest/linux/
enabled=0
gpgcheck=0

# 直接安装会报错
[root@node-1 ~]# yum -y install nasm
Loaded plugins: fastestmirror
Loading mirror speeds from cached hostfile
 * base: mirrors.nju.edu.cn
 * epel: mirror.earthlink.iq
 * extras: mirrors.nju.edu.cn
 * updates: mirrors.nju.edu.cn
Resolving Dependencies
--> Running transaction check
---> Package nasm.x86_64 0:2.10.07-7.el7 will be updated
---> Package nasm.x86_64 0:2.16.01-0.fc36 will be an update
--> Processing Dependency: libc.so.6(GLIBC_2.34)(64bit) for package: nasm-2.16.01-0.fc36.x86_64
--> Finished Dependency Resolution
Error: Package: nasm-2.16.01-0.fc36.x86_64 (nasm)
           Requires: libc.so.6(GLIBC_2.34)(64bit)
 You could try using --skip-broken to work around the problem
 You could try running: rpm -Va --nofiles --nodigest

# 原因是glibc版本太低,这里就不继续深入了
```

:::

::: details （4）编写第一个示例

```assembly
# 1、创建一个目录集中存放我们的汇编代码(非必须)
[root@node-1 ~]# mkdir -p nasm && cd nasm

# 2、编写汇编代码
[root@node-1 nasm]# vim hello.asm
; ----------------------------------------------------------------------------------------
; 说明:
;   使用系统调用来输出 "Hello, World" 到控制台
;   这个程序仅在 64 位的 Linux 下运行
; 单步操作:
;     nasm -f elf64 -o hello.o hello.asm  # 编译
;     ld -o hello hello.o                 # 链接
;     ./hello                             # 执行
; 一条命令:
;     nasm -f elf64 -o hello.o hello.asm && ld -o hello hello.o && ./hello
; ----------------------------------------------------------------------------------------

section .text                        ; text 区域用于书写代码
    global  _start                   ; global 定义程序入口

_start:
    ; write(1, message, 13)
    mov     rax, 1                   ; 1 号系统调用是写操作
    mov     rdi, 1                   ; 1 号文件系统调用是标准输出
    mov     rsi, message             ; 输出字符串的地址
    mov     rdx, 13                  ; 字符串的长度
    syscall                          ; 调用系统执行写操作

    ; exit(0)
    mov     eax, 60                  ; 60 号系统调用是退出
    xor     rdi, rdi                 ; 0 号系统调用作为退出
    syscall                          ; 调用系统执行退出

section .data                        ; data 区域用于初始化常量
    message  db  "Hello, World", 10  ; 注意到最后的换行


# 3、编译
[root@node-1 nasm]# nasm -f elf64 -o hello.o hello.asm
[root@node-1 nasm]# ls -l hello.o
-rw-r--r-- 1 root root 752 Mar 14 16:40 hello.o

# 4、链接
[root@node-1 nasm]# ld -o hello hello.o
[root@node-1 nasm]# ls -l hello
-rwxr-xr-x 1 root root 776 Mar 14 16:41 hello

# 5、执行
[root@node-1 nasm]# ./hello
Hello, world!
```

:::

<br />

### 语法格式

**汇编程序组成部分**

* 文本部分：该部分存储实际代码，使用 `section .text` 声明。这部分必须以`global _start`声明开始，它告诉内核程序执行从哪里开始
* 数据部分：该部分用于声明初始化数据或常量，其值在程序运行期间保持不变，使用 `section.data` 声明
* bss 部分：该部分代表以符号开始的块，用于声明其值可以在程序运行期间更改的变量，使用 `section.bss` 声明

所以汇编的语法一般是：

```assembly
section.text
  global _start

_start:
```

<br />

**汇编指令语法**

```assembly
[label] mnemonic [operands] [;comment]
```

<br />

### 寄存器

::: details 寄存器说明

**1、通用寄存器**

| 64位 | 低32位 | 低16位 | 低8位 | 说明                                                         |
| ---- | ------ | ------ | ----- | ------------------------------------------------------------ |
| RAX  | EAX    | AX     | AL    | 累加寄存器，一般用于函数调用的返回值或系统调用的功能编号     |
| RBX  | EBX    | BX     | BL    | 基址寄存器，一般用于存储函数调用参数                         |
| RCX  | ECX    | CX     | CL    | 计数寄存器，一般循用于环中的迭代次数或指定字符串中的字符数   |
| RDX  | EDX    | DX     | DL    | 数据寄存器，一般用于保存某些算术运算的溢出 或 输入/输出操作期间存储数据 |
|      |        |        |       |                                                              |
| RSI  | ESI    | SI     | SIL   | 来源索引寄存器，一般用于流操作中指向来源的指针               |
| RDI  | EDI    | DI     | DIL   | 目标索引寄存器，一般用于流操作中指向目标的指针               |
|      |        |        |       |                                                              |
| RSP  | ESP    | SP     | SPL   | 栈指针寄存器，指向栈顶                                       |
| RBP  | EBP    | BP     | BPL   | 栈指针寄存器，指向栈底                                       |

**2、6个16位段寄存器**

```bash
CS - 代码段寄存器指向程序实际代码或指令所在的内存代码区的起始地址。
DS - 数据段寄存器指向内存数据区的起始地址，其中包含数据、常量和工作区。
SS - 栈段寄存器指向内存栈区的起始地址

ES,FS和GS是用于存储额外数据的段寄存器
```

**3、2个32位的控制寄存器**

```bash
IP - 指令指针存储下一条要执行的指令的内存地址偏移量

Flag register - 许多指令涉及比较和数学计算并更改标志的状态，一些其他条件指令测试这些状态标志的值以将控制流带到其他位置

一些常见的标志位是
	溢出标志 (OF)
    中断标志 (IF)
    符号标志 (SF)
    零标志 (ZF)
    奇偶校验标志 (PF)
    进位标志 (CF)
    ...
```

:::

::: details （1）退出程序并指定退出码

`test.asm`

```assembly
section .text
    global  _start

_start:
    mov eax, 1
    mov ebx, 0
    int 0x80

; 第一条指令: mov eax, 1
; 1、将立即数 1 存储到 CPU 寄存器 eax 中, 这里的1是十进制数字1
; 2、立即数的意思是该数据直接嵌入到指令中，不需要从内存中读取
; 3、汇编指令的意义取决于它所处的上下文环境
; 4、在Linux中，exit系统调用的调用号是 0x01, 它对应我们的mov eax, 1中的立即数1

; 第二条指令: mov ebx, 0
; 1、将立即数 0 存储到 CPU 寄存器 ebx 中, 这里的0是十进制数字0
; 2、具体来说是设置退出状态码为0

; 第三条指令: int 0x80
; 触发一个Linux系统调用软中断，中断号为 0x80

; ------------------------------------------------------------------------------------------------
; 系统调用号
; 1、Linux系统调用号（syscall number）在头文件 unistd.h 中定义
; 2、在这个头文件中，每个系统调用都有一个以 __NR_ 开头的宏定义，后面跟着系统调用的名称，比如 #define __NR_exit 1
; 3、搜索一下这个文件
;   [root@node-1 nasm]# find / -type f -name "*.h" | xargs grep "__NR_exit 1" --color=auto
;   /usr/include/asm/unistd_32.h:#define __NR_exit 1
; 4、查看一下文件
;    [root@node-1 nasm]# head /usr/include/asm/unistd_32.h
;    #ifndef _ASM_X86_UNISTD_32_H
;    #define _ASM_X86_UNISTD_32_H 1
;
;    #define __NR_restart_syscall 0
;    #define __NR_exit 1
;    #define __NR_fork 2
;    #define __NR_read 3
;    #define __NR_write 4
;    #define __NR_open 5
;    #define __NR_close 6
```

输出结果

```bash
# 默认设置退出码为0
[root@node-1 nasm]# nasm -f elf64 -o test.o test.asm && ld -o test test.o && ./test ; echo $?
0

# 修改退出码: mov ebx, 127
[root@node-1 nasm]# nasm -f elf64 -o test.o test.asm && ld -o test test.o && ./test ; echo $?
127

# 修改退出码为16进制数字(0x80 = 128): mov ebx, 0x80
[root@node-1 nasm]# nasm -f elf64 -o test.o test.asm && ld -o test test.o && ./test ; echo $?
128
```

:::

<br />

## 底层初探

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

::: details （3）常用指令

**运行指令**

* r（restart）：重启程序
* c（continue）：继续执行到下一个断点，若没有断点会执行到程序结束
* n（next）：执行本行代码（箭头指向的行）
* s（step）：执行下一步，这会展开函数
* si（step-instruction）：执行下一行CPU指令
* so（stepout）：跳出当前执行函数

:::

<br />

### 1、寻找程序入口

::: details Linux平台

```bash
# 方式1：直接使用dlv
[root@node-1 example]# dlv exec main
Type 'help' for list of commands.
(dlv) list                              # 可以简写为l
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

# 找到程序入口: rt0_linux_amd64.s
# rt代表runtime

# --------------------------------------------------------------------------------------------

# 方式2：使用gdb
[root@node-1 example]# gdb main
...
(gdb) info files
Symbols from "/root/example/main".
Local exec file:
        `/root/example/main', file type elf64-x86-64.
        Entry point: 0x45ed80
        0x0000000000401000 - 0x00000000004810d8 is .text
        0x0000000000482000 - 0x00000000004b8f25 is .rodata
        0x00000000004b90c0 - 0x00000000004b95c8 is .typelink
        0x00000000004b95e0 - 0x00000000004b9638 is .itablink
        0x00000000004b9638 - 0x00000000004b9638 is .gosymtab
        0x00000000004b9640 - 0x0000000000513cf0 is .gopclntab
        0x0000000000514000 - 0x0000000000514130 is .go.buildinfo
        0x0000000000514140 - 0x0000000000524740 is .noptrdata
        0x0000000000524740 - 0x000000000052bed0 is .data
        0x000000000052bee0 - 0x0000000000559e60 is .bss
        0x0000000000559e60 - 0x000000000055d830 is .noptrbss
        0x0000000000400f9c - 0x0000000000401000 is .note.go.buildid
(gdb) b *0x45ed80
Breakpoint 1 at 0x45ed80
(gdb) run
Starting program: /root/example/main 
warning: skipping .debug_frame info of /root/example/main: Found an FDE when not expecting it.

Breakpoint 1, 0x000000000045ed80 in _rt0_amd64_linux ()

# 0x45ed80就是程序头的地址
[root@node-1 example]# readelf -h main
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
  Entry point address:               0x45ed80
  Start of program headers:          64 (bytes into file)
  Start of section headers:          456 (bytes into file)
  Flags:                             0x0
  Size of this header:               64 (bytes)
  Size of program headers:           56 (bytes)
  Number of program headers:         7
  Size of section headers:           64 (bytes)
  Number of section headers:         23
  Section header string table index: 3
```

:::

::: details Windows平台

```bash
# Windows下使用dlv执行list,报错
D:\application\GoLand\example>dlv exec main.exe
Type 'help' for list of commands.
(dlv) list
Stopped at: 0x7ff8faa20951
=>   1: no source available

# Linux使用gdb调试Windows二进制
[root@node-1 example]# gdb main.exe
GNU gdb (GDB) Red Hat Enterprise Linux 7.6.1-120.el7
Copyright (C) 2013 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.  Type "show copying"
and "show warranty" for details.
This GDB was configured as "x86_64-redhat-linux-gnu".
For bug reporting instructions, please see:
<http://www.gnu.org/software/gdb/bugs/>...
Reading symbols from /root/example/main.exe...done.
warning: Missing auto-load scripts referenced in section .debug_gdb_scripts
of file /root/example/main.exe
Use `info auto-load python [REGEXP]' to list them.
(gdb) info files
Symbols from "/root/example/main.exe".
Local exec file:
        `/root/example/main.exe', file type pei-x86-64.
        Entry point: 0x45f6e0
        0x0000000000401000 - 0x0000000000489727 is .text
        0x000000000048a000 - 0x0000000000524a20 is .rdata
        0x0000000000525000 - 0x000000000053fa00 is .data
        0x000000000061c000 - 0x000000000061c490 is .idata
        0x000000000061d000 - 0x000000000062009e is .reloc
(gdb) b *0x45f6e0
Breakpoint 1 at 0x45f6e0: file D:/software/go1.21/src/runtime/rt0_windows_amd64.s, line 10.
(gdb) 
```

:::

<br />

### 2、开始文件：rt0_GOOS_GOARCH.s

::: details （1）DLV查看汇编

```bash
# rt0_linux_amd64.s
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

# asm_amd64.s
(dlv) si
> _rt0_amd64() /usr/local/go/1.20.2/src/runtime/asm_amd64.s:16 (PC: 0x45b360)
Warning: debugging optimized function
TEXT _rt0_amd64(SB) /usr/local/go/1.20.2/src/runtime/asm_amd64.s
=>      asm_amd64.s:16  0x45b360        488b3c24        mov rdi, qword ptr [rsp]
        asm_amd64.s:17  0x45b364        488d742408      lea rsi, ptr [rsp+0x8]
        asm_amd64.s:18  0x45b369        e912000000      jmp $runtime.rt0_go
        
(dlv) list
> _rt0_amd64() /usr/local/go/1.20.2/src/runtime/asm_amd64.s:16 (PC: 0x45b360)
Warning: debugging optimized function
    11: // _rt0_amd64 is common startup code for most amd64 systems when using
    12: // internal linking. This is the entry point for the program from the
    13: // kernel for an ordinary -buildmode=exe program. The stack holds the
    14: // number of arguments and the C-style argv.
    15: TEXT _rt0_amd64(SB),NOSPLIT,$-8
=>  16:         MOVQ    0(SP), DI       // argc  ---> 参数个数计数,等于 用户调用程序输入的参数+1
    17:         LEAQ    8(SP), SI       // argv  ---> 参数数组, argv[0]是程序名,其余是用户输入参数
    18:         JMP     runtime·rt0_go(SB)
    19:
    20: // main is common startup code for most amd64 systems when using
    21: // external linking. The C startup code will call the symbol "main"

# 输入两次n
(dlv) n
> _rt0_amd64() /usr/local/go/1.20.2/src/runtime/asm_amd64.s:17 (PC: 0x45b364)
Warning: debugging optimized function
    12: // internal linking. This is the entry point for the program from the
    13: // kernel for an ordinary -buildmode=exe program. The stack holds the
    14: // number of arguments and the C-style argv.
    15: TEXT _rt0_amd64(SB),NOSPLIT,$-8
    16:         MOVQ    0(SP), DI       // argc
=>  17:         LEAQ    8(SP), SI       // argv
    18:         JMP     runtime·rt0_go(SB)
    19:
    20: // main is common startup code for most amd64 systems when using
    21: // external linking. The C startup code will call the symbol "main"
    22: // passing argc and argv in the usual C ABI registers DI and SI.

(dlv) n
> _rt0_amd64() /usr/local/go/1.20.2/src/runtime/asm_amd64.s:18 (PC: 0x45b369)
Warning: debugging optimized function
    13: // kernel for an ordinary -buildmode=exe program. The stack holds the
    14: // number of arguments and the C-style argv.
    15: TEXT _rt0_amd64(SB),NOSPLIT,$-8
    16:         MOVQ    0(SP), DI       // argc
    17:         LEAQ    8(SP), SI       // argv
=>  18:         JMP     runtime·rt0_go(SB)
    19:
    20: // main is common startup code for most amd64 systems when using
    21: // external linking. The C startup code will call the symbol "main"
    22: // passing argc and argv in the usual C ABI registers DI and SI.
    23: TEXT main(SB),NOSPLIT,$-8

# rt0_go 代码块
(dlv) si
> runtime.rt0_go() /usr/local/go/1.20.2/src/runtime/asm_amd64.s:161 (PC: 0x45b380)
Warning: debugging optimized function
TEXT runtime.rt0_go(SB) /usr/local/go/1.20.2/src/runtime/asm_amd64.s
=>      asm_amd64.s:161 0x45b380        4889f8          mov rax, rdi
        asm_amd64.s:162 0x45b383        4889f3          mov rbx, rsi
        asm_amd64.s:163 0x45b386        4883ec28        sub rsp, 0x28
        asm_amd64.s:164 0x45b38a        4883e4f0        and rsp, -0x10
        asm_amd64.s:165 0x45b38e        4889442418      mov qword ptr [rsp+0x18], rax
        asm_amd64.s:166 0x45b393        48895c2420      mov qword ptr [rsp+0x20], rbx

(dlv) list
> runtime.rt0_go() /usr/local/go/1.20.2/src/runtime/asm_amd64.s:161 (PC: 0x45b380)
Warning: debugging optimized function
   156:
   157: #endif
   158:
   159: TEXT runtime·rt0_go(SB),NOSPLIT|TOPFRAME,$0
   160:         // copy arguments forward on an even stack
=> 161:         MOVQ    DI, AX          // argc
   162:         MOVQ    SI, BX          // argv
   163:         SUBQ    $(5*8), SP              // 3args 2auto
   164:         ANDQ    $~15, SP
   165:         MOVQ    AX, 24(SP)
   166:         MOVQ    BX, 32(SP)
```

:::

::: details （2）GoLand查看汇编

![image-20230313210121143](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230313210121143.png)

![image-20230313210438185](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230313210438185.png)

:::

<br />

### 3、核心代码：TEXT runtime·rt0_go

::: details （1）复制参数数量和参数数组到栈上

```go
TEXT runtime·rt0_go(SB),NOSPLIT|TOPFRAME,$0
	// copy arguments forward on an even stack
	MOVQ	DI, AX		// argc
	MOVQ	SI, BX		// argv
	SUBQ	$(5*8), SP		// 3args 2auto
	ANDQ	$~15, SP
	MOVQ	AX, 24(SP)
	MOVQ	BX, 32(SP)
```

:::

::: details （2）初始化g0栈

```go
	// create istack out of the given (operating system) stack.
	// _cgo_init may update stackguard.
	MOVQ	$runtime·g0(SB), DI
	LEAQ	(-64*1024+104)(SP), BX
	MOVQ	BX, g_stackguard0(DI)
	MOVQ	BX, g_stackguard1(DI)
	MOVQ	BX, (g_stack+stack_lo)(DI)
	MOVQ	SP, (g_stack+stack_hi)(DI)

# 说明
# g0是为了调度协程而产生的协程
# g0是每个Go程序的第一个协程
```

:::

....

::: details （3）运行时检查

```go
# 汇编代码
	CALL	runtime·check(SB)

# 跳转到Go代码 runtime1.check,这里是核心代码，运行时检查
func check() {
	var (
		a     int8
		b     uint8
		c     int16
		d     uint16
		e     int32
		f     uint32
		g     int64
		h     uint64
		i, i1 float32
		j, j1 float64
		k     unsafe.Pointer
		l     *uint16
		m     [4]byte
	)
	type x1t struct {
		x uint8
	}
	type y1t struct {
		x1 x1t
		y  uint8
	}
	var x1 x1t
	var y1 y1t

	// 1、检查各种类型的长度
	if unsafe.Sizeof(a) != 1 {
		throw("bad a")
	}
	if unsafe.Sizeof(b) != 1 {
		throw("bad b")
	}
	if unsafe.Sizeof(c) != 2 {
		throw("bad c")
	}
	if unsafe.Sizeof(d) != 2 {
		throw("bad d")
	}
	if unsafe.Sizeof(e) != 4 {
		throw("bad e")
	}
	if unsafe.Sizeof(f) != 4 {
		throw("bad f")
	}
	if unsafe.Sizeof(g) != 8 {
		throw("bad g")
	}
	if unsafe.Sizeof(h) != 8 {
		throw("bad h")
	}
	if unsafe.Sizeof(i) != 4 {
		throw("bad i")
	}
	if unsafe.Sizeof(j) != 8 {
		throw("bad j")
	}
	if unsafe.Sizeof(k) != goarch.PtrSize {
		throw("bad k")
	}
	if unsafe.Sizeof(l) != goarch.PtrSize {
		throw("bad l")
	}
	if unsafe.Sizeof(x1) != 1 {
		throw("bad unsafe.Sizeof x1")
	}
    
    // 2、检查结构体, 偏移量、大小等
	if unsafe.Offsetof(y1.y) != 1 {
		throw("bad offsetof y1.y")
	}
	if unsafe.Sizeof(y1) != 2 {
		throw("bad unsafe.Sizeof y1")
	}

    // 3、检查?
	if timediv(12345*1000000000+54321, 1000000000, &e) != 12345 || e != 54321 {
		throw("bad timediv")
	}

    // 4、检查原子操作
	var z uint32
	z = 1
	if !atomic.Cas(&z, 1, 2) {
		throw("cas1")
	}
	if z != 2 {
		throw("cas2")
	}

	z = 4
	if atomic.Cas(&z, 5, 6) {
		throw("cas3")
	}
	if z != 4 {
		throw("cas4")
	}

	z = 0xffffffff
	if !atomic.Cas(&z, 0xffffffff, 0xfffffffe) {
		throw("cas5")
	}
	if z != 0xfffffffe {
		throw("cas6")
	}

	m = [4]byte{1, 1, 1, 1}
	atomic.Or8(&m[1], 0xf0)
	if m[0] != 1 || m[1] != 0xf1 || m[2] != 1 || m[3] != 1 {
		throw("atomicor8")
	}

	m = [4]byte{0xff, 0xff, 0xff, 0xff}
	atomic.And8(&m[1], 0x1)
	if m[0] != 0xff || m[1] != 0x1 || m[2] != 0xff || m[3] != 0xff {
		throw("atomicand8")
	}

    // 5、检查指针
	*(*uint64)(unsafe.Pointer(&j)) = ^uint64(0)
	if j == j {
		throw("float64nan")
	}
	if !(j != j) {
		throw("float64nan1")
	}

	*(*uint64)(unsafe.Pointer(&j1)) = ^uint64(1)
	if j == j1 {
		throw("float64nan2")
	}
	if !(j != j1) {
		throw("float64nan3")
	}

	*(*uint32)(unsafe.Pointer(&i)) = ^uint32(0)
	if i == i {
		throw("float32nan")
	}
	if i == i {
		throw("float32nan1")
	}

	*(*uint32)(unsafe.Pointer(&i1)) = ^uint32(1)
	if i == i1 {
		throw("float32nan2")
	}
	if i == i1 {
		throw("float32nan3")
	}

	testAtomic64()

    // 6、检查栈大小是否是2的幂次方
	if _FixedStack != round2(_FixedStack) {
		throw("FixedStack is not power-of-2")
	}

    // 7、检查assembly
	if !checkASM() {
		throw("assembly checks failed")
	}
}
```

:::

::: details （4）将argc和argv拷贝到Go语言中去

```go
// 汇编代码
	MOVL	24(SP), AX		// copy argc
	MOVL	AX, 0(SP)
	MOVQ	32(SP), AX		// copy argv
	MOVQ	AX, 8(SP)
	CALL	runtime·args(SB)

// Go代码
func args(c int32, v **byte) {
	argc = c
	argv = v
	sysargs(c, v)
}
```

:::

<br />

## 类型系统

### 关键字和标识符

关键字：[https://tip.golang.org/ref/spec#Keywords](https://tip.golang.org/ref/spec#Keywords)

预先声明的标识符：[https://tip.golang.org/ref/spec#Predeclared_identifiers](https://tip.golang.org/ref/spec#Predeclared_identifiers)

::: details （1）关键字总共有25个

```go
break        default      func         interface    select
case         defer        go           map          struct
chan         else         goto         package      switch
const        fallthrough  if           range        type
continue     for          import       return       var
```

:::

::: details （2）预先声明的标识符

源码在：GO SDK/src/builtin/builtin.go

```go
Types:
	any bool byte comparable
	complex64 complex128 error float32 float64
	int int8 int16 int32 int64 rune string
	uint uint8 uint16 uint32 uint64 uintptr

Constants:
	true false iota

Zero value:
	nil

Functions:
	append cap clear close complex copy delete imag len
	make new panic print println real recover
```

:::

::: details （3）标识符可以被覆盖，而关键字则不可以

覆盖标识符，代码可以正常运行

```go
package main

import "fmt"

func len(a any) int {
	return 0
}

type int int8

func main() {
	fmt.Printf("%d\n", len([]int{1, 2, 3}))
	fmt.Printf("%T\n", int(1))
	fmt.Printf("%T\n", 2)
}
```

输出结果

```bash
D:\application\GoLand\example>go run .
# 可以看到是main.int类型
0
main.int
int

# 如果使用默认的len和int的话,输出是这样的
3
int
int
```

覆盖关键字，编译出错

```go
package main

func struct() {

}

func main() {
	struct()
}
```

输出结果

```bash
D:\application\GoLand\example>go run .
# example
.\main.go:3:6: syntax error: unexpected struct, expected name or (
.\main.go:8:8: syntax error: unexpected (, expected {
```

:::

::: details （4）关键字和标识符的源码

```go
package main

import "time"

func main() {
	go func() {
		time.Sleep(time.Second)
	}()
	for i := 0; i < 3; i++ {
		time.Sleep(time.Second)
	}
}
```

输出结果

```bash
[root@node-1 example]# go build -gcflags="-S" main.go 2>&1 | grep -E 'main.go:' | grep -E ':9|:13'
        0x0018 00024 (/root/example/main.go:9)  LEAQ    main.main.func1·f(SB), AX
        0x001f 00031 (/root/example/main.go:9)  PCDATA  $1, $0
        0x001f 00031 (/root/example/main.go:9)  NOP
        0x0020 00032 (/root/example/main.go:9)  CALL    runtime.newproc(SB)
        0x0025 00037 (/root/example/main.go:13) LEAQ    type:int(SB), AX
        0x002c 00044 (/root/example/main.go:13) MOVL    $1024, BX
        0x0031 00049 (/root/example/main.go:13) MOVQ    BX, CX
        0x0034 00052 (/root/example/main.go:13) CALL    runtime.makeslice(SB)
        0x0000 00000 (/root/example/main.go:9)  TEXT    main.main.func1(SB), ABIInternal, $16-0
        0x0000 00000 (/root/example/main.go:9)  CMPQ    SP, 16(R14)
        0x0004 00004 (/root/example/main.go:9)  PCDATA  $0, $-2
        0x0004 00004 (/root/example/main.go:9)  JLS     40
        0x0006 00006 (/root/example/main.go:9)  PCDATA  $0, $-1
        0x0006 00006 (/root/example/main.go:9)  SUBQ    $16, SP
        0x000a 00010 (/root/example/main.go:9)  MOVQ    BP, 8(SP)
        0x000f 00015 (/root/example/main.go:9)  LEAQ    8(SP), BP
        0x0014 00020 (/root/example/main.go:9)  FUNCDATA        $0, gclocals·g2BeySu+wFnoycgXfElmcg==(SB)
        0x0014 00020 (/root/example/main.go:9)  FUNCDATA        $1, gclocals·g2BeySu+wFnoycgXfElmcg==(SB)
        0x0028 00040 (/root/example/main.go:9)  PCDATA  $1, $-1
        0x0028 00040 (/root/example/main.go:9)  PCDATA  $0, $-2
        0x0028 00040 (/root/example/main.go:9)  CALL    runtime.morestack_noctxt(SB)
        0x002d 00045 (/root/example/main.go:9)  PCDATA  $0, $-1
        0x002d 00045 (/root/example/main.go:9)  JMP     0

# 第9行: go func
# go关键字源码是Go函数 runtime.newproc
# func关键字则会转换为汇编的text代码段

# 第13行: make标识符
# make初始化切片的时候会转为 runtime.makeslice 函数
```

:::

<br />

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

<br />

### slice

