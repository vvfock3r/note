# 用于程序编译
FROM golang:1.19.2-alpine3.16 as builder
WORKDIR /build
COPY . .
RUN go build -o server main.go

# 用于程序运行
FROM alpine:3.16
MAINTAINER VVFock3r
WORKDIR /
COPY --from=builder /build/server .
EXPOSE 7777
CMD ["./server"]
