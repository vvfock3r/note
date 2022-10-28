FROM node:18-alpine as builder
WORKDIR /build
COPY . .
# 问题描述: yarn安装时经常报如下错误
# error An unexpected error occurred: "https://registry.npmmirror.com/zrender/-/zrender-5.3.2.tgz: connect ECONNREFUSED 8.25.82.***7:443".
# info If you think this is a bug, please open a bug report with the information provided in "/build/yarn-error.log".
# info Visit https://yarnpkg.com/en/docs/cli/install for documentation about this command.
# The command '/bin/sh -c yarn install && yarn docs:build' returned a non-zero code: 1
# 解决办法：增加重试机制
# 注意事项：
#   该镜像所属系统不支持这样的循环: for((i=0;i<9;i++)); do echo $i; done, 报错：/bin/sh: 1: Syntax error: Bad for loop variable
#   原因是使用的dash而不是bash, 所以这里使用seq命令来生成循环来规避这个问题
RUN for i in `seq 9`; do yarn install && break; done && yarn docs:build

FROM nginx:stable-alpine as runner
MAINTAINER vvfock3r
RUN set -xeuo pipefail && \
    apk update && \
    apk upgrade --no-cache && \
    apk add --no-cache tzdata && \
      cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
      echo "Asia/Shanghai" > /etc/timezone && \
      apk del tzdata
WORKDIR /
COPY --from=builder /build/docs/.vuepress/dist/ /usr/share/nginx/note/
COPY ./nginx/ /etc/nginx/

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]