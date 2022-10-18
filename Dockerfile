FROM node:18-alpine as builder
WORKDIR /build
COPY . .
RUN for ((i=0;i<9;i++)); do yarn install && break; done && yarn docs:build

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