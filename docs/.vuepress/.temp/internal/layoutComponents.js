import { defineAsyncComponent } from 'vue'

export const layoutComponents = {
  "404": defineAsyncComponent(() => import("C:/Users/Administrator/Desktop/a/note/docs/.vuepress/theme/layouts/404.vue")),
  "Layout": defineAsyncComponent(() => import("C:/Users/Administrator/Desktop/a/note/node_modules/@vuepress/theme-default/lib/client/layouts/Layout.vue")),
}
