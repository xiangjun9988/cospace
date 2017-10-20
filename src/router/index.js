import cloud from './cloud.js';
import datas from './datas.js';
import attendance from './attendance.js';
import application from './application.js';
import message from './message.js';
export default () => [
	{
		path: '/login',
		component: function(resolve) {
			require(['../components/login.vue'], resolve);
		}
	},
	{
		path: '/password',
		component: function(resolve) {
			require(['../components/password.vue'], resolve);
		}
	},	
	{
		path: '/',
		//默认跳转
		//redirect: '/cloud/zzjg/index',
		component: function(resolve) {
			require(['../components/index.vue'], resolve);
		}
	},
	cloud,
	// {
	// 	path: '/',
	// 	//默认跳转
	// 	redirect: '/datas/source/list',
	// 	component: function(resolve) {
	// 		require(['../components/index.vue'], resolve);
	// 	}
	// },
	datas,
	// {
	// 	path: '/',
	// 	//默认跳转
	// 	redirect: '/attendance/index',
	// 	component: function(resolve) {
	// 		require(['../components/index.vue'], resolve);
	// 	}
	// },
	attendance,	

	//应用管理中心
	application,

	//信息中心
	message	
]


