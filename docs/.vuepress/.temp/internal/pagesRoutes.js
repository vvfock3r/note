import { Vuepress } from '@vuepress/client'

const routeItems = [
  ["v-8daa1a0e","/",{"title":""},["/index.html","/README.md"]],
  ["v-93717982","/algorithm/double-pointer.html",{"title":"双指针算法入门"},["/algorithm/double-pointer","/algorithm/double-pointer.md"]],
  ["v-6600a83d","/backend/Go.html",{"title":""},["/backend/Go","/backend/Go.md"]],
  ["v-1f37526e","/backend/Python.html",{"title":""},["/backend/Python","/backend/Python.md"]],
  ["v-071e4a20","/backend/Web-for-Go.html",{"title":""},["/backend/Web-for-Go","/backend/Web-for-Go.md"]],
  ["v-453ef83f","/container/container.html",{"title":""},["/container/container","/container/container.md"]],
  ["v-2f283b00","/container/kubespray.html",{"title":""},["/container/kubespray","/container/kubespray.md"]],
  ["v-528d934c","/frontend/CSS.html",{"title":""},["/frontend/CSS","/frontend/CSS.md"]],
  ["v-516d007a","/frontend/Echarts.html",{"title":""},["/frontend/Echarts","/frontend/Echarts.md"]],
  ["v-0aa93d70","/frontend/JavaScript.html",{"title":""},["/frontend/JavaScript","/frontend/JavaScript.md"]],
  ["v-9c8ab692","/frontend/Vue.html",{"title":""},["/frontend/Vue","/frontend/Vue.md"]],
  ["v-5041fd10","/frontend/VuePress.html",{"title":""},["/frontend/VuePress","/frontend/VuePress.md"]],
  ["v-ed4f8456","/frontend/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%8E%9F%E7%94%9F%E7%BB%98%E5%9B%BE.html",{"title":""},["/frontend/浏览器原生绘图.html","/frontend/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%8E%9F%E7%94%9F%E7%BB%98%E5%9B%BE","/frontend/浏览器原生绘图.md","/frontend/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%8E%9F%E7%94%9F%E7%BB%98%E5%9B%BE.md"]],
  ["v-3287b622","/ops/Bash.html",{"title":""},["/ops/Bash","/ops/Bash.md"]],
  ["v-3706649a","/404.html",{"title":""},["/404"]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, meta, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta,
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: '404',
      path: '/:catchAll(.*)',
      component: Vuepress,
    }
  ]
)
