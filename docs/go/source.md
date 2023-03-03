# 深入理解Go

<br />

## 汇编基础

## 可执行文件

PE / ELF / Mach-O

**1、Linux ELF文件格式**

::: details （1）ELF文件：格式说明

ELF 是 Executable and Linkable Format 的缩写，是一种用于可执行文件、目标文件、共享库和核心转储(core dump)的标准文件格式。

ELF 文件 **通常** 是编译器之类的输出，并且是二进制格式。以 Go 编译出的可执行文件为例，我们使用 file 命令即可看到其具体类型

```bash
[root@ap-hongkang example]# file main
main: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), statically linked, with debug_info, not stripped
```

使用 ELF 文件格式的可执行文件是由 **ELF 头（ELF Header）** 开始，后跟 **程序头（Program Header）** 或 **节头（Section Header）** 或两者均有组成的

:::

::: details （2）读取ELF Header

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
```

:::

::: details （3）读取Program Header

```bash
# 显示程序头部
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
```



:::

## 编译原理

* Go编译入口：rt0.s汇编文件 + 文件名后缀的条件编译