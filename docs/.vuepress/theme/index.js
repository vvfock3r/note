const {path} = require('@vuepress/utils');

module.exports = {
	// 自定义主题
	name: 'vuepress-theme-blog',
	
	// 继承默认主题
	extends: '@vuepress/theme-default',

	// 覆盖404页面
	layouts: {
		404: path.resolve(__dirname, '../components/404/404.vue'),
	},
}