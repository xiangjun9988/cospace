export default{
	path: '/attendance',
	//依赖部分
	component: resolve => require(['../attendance/main.vue'], resolve),	
	//默认跳转
	redirect: '/attendance/index',
	//考勤打卡
	children: [
		{
			path: 'index',
			component: resolve => require(['../attendance/index.vue'], resolve),	
		}
	]	
}