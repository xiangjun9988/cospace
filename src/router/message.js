export default {
	path: '/message',
	//依赖部分
	component: resolve => require(['../message/main.vue'], resolve),
	//默认跳转
	redirect: '/message/receive',

	//以下部分为message的子模块
	children: [
		{
			path: 'send',
			component: resolve => require(['../message/send.vue'], resolve),	
		},
		{
			path: 'receive',
			component: resolve => require(['../message/receive.vue'], resolve),
			
		},
		{
			path: 'sendMessage',
			component: resolve => require(['../message/sendMessage.vue'], resolve),	
		},
		{
			path: 'messageDetail',
			component: resolve => require(['../message/messageDetail.vue'], resolve),	
		},
		
	]
}
