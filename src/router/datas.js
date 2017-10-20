export default {
	path: '/datas',
	//依赖部分
	component: resolve => require(['../datas/main.vue'], resolve),
	//默认跳转
	redirect: '/datas/source/list',

	//以下部分为datas的子模块
	children: [
		//数据源
		{
			path: 'source/list',
			component: resolve => require(['../datas/source/list.vue'], resolve),	
		},		
		{
			path: 'source/add',
			component: resolve => require(['../datas/source/add.vue'], resolve),	
		},
		{
			path: 'source/edit/:id',
			component: resolve => require(['../datas/source/edit.vue'], resolve),	
		},
		//数据表		
		{
			path: 'sheet/list',
			component: resolve => require(['../datas/sheet/list_left.vue'], resolve),	
		},
		{
			path: ':zid',
			component: resolve => require(['../datas/sheet/list_right.vue'], resolve),	
		},		
		{
			path: 'sheet/add',
			component: resolve => require(['../datas/sheet/add.vue'], resolve),	
		},		
		{
			path: 'sheet/edit/:id',
			component: resolve => require(['../datas/sheet/edit.vue'], resolve),	
		},
		{
			path: 'sheet/property/:id',
			component: resolve => require(['../datas/sheet/property.vue'], resolve),	
		},
		{
			path: 'sheet/property_add',
			component: resolve => require(['../datas/sheet/property_add.vue'], resolve),	
		},		
		{
			path: 'sheet/property_edit/:id',
			component: resolve => require(['../datas/sheet/property_edit.vue'], resolve),	
		},
		{
			path: 'sheet/synchro',
			component: resolve => require(['../datas/sheet/synchro.vue'], resolve),	
		},		
		{
			path: 'sheet/resolved',
			component: resolve => require(['../datas/sheet/resolved.vue'], resolve),	
		}													
	]
}
