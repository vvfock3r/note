import type {Theme} from '@vuepress/core'
import {defaultTheme} from '@vuepress/theme-default'
import type {DefaultThemeOptions} from '@vuepress/theme-default'
import {path} from '@vuepress/utils'

export const localTheme = (options: DefaultThemeOptions): Theme => {
    return {
        name: 'note',
        extends: defaultTheme(options),
        layouts: {
            404: path.resolve(__dirname, 'layouts/404.vue'),
        }
    }
}