import { defineAsyncComponent } from 'vue'

export default {
  enhance: ({ app }) => {    
      app.component("Home", defineAsyncComponent(() => import("C:/Users/Administrator/Desktop/note/docs/.vuepress/components/Home.vue")))
  },
}
