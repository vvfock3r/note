FROM node:18-alpine3.14 as builder
WORKDIR /build
COPY . .
RUN yarn && yarn docs:build

FROM nginx:1.22-alpine as runner
MAINTAINER vvfock3r
WORKDIR /
COPY --from=builder /build/docs/.vuepress/dist/ /usr/share/nginx/note/
COPY ./nginx/ /etc/nginx/
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
