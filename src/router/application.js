export default {
	path: '/application',
	//依赖部分
	component: resolve => require(['../application/main.vue'], resolve),
	//默认跳转
	redirect: '/application/register',

	//以下部分为application的子模块
	children: [
		{
			path: 'register/',
			component: resolve => require(['../application/register.vue'], resolve),			
		},
		{
			path: 'register/add',
			component: resolve => require(['../application/register/add.vue'], resolve),			
		},
		{
			path: 'register/edit/:id',
			component: resolve => require(['../application/register/edit.vue'], resolve),			
		},
		//应用注册-角色管理
		{
			path: 'register/role/list',
			component: resolve => require(['../application/register/role/list.vue'], resolve),	
		},
		{
			path: 'register/role/add/:id',
			component: resolve => require(['../application/register/role/add.vue'], resolve),	
		},				
		{
			path: 'register/role/edit',
			component: resolve => require(['../application/register/role/edit.vue'], resolve),	
		},		
		{
			path: 'register/role/assigne',
			component: resolve => require(['../application/register/role/assigne.vue'], resolve),	
		},
		{
			path: 'register/role/jurisdiction',
			component: resolve => require(['../application/register/role/jurisdiction.vue'], resolve),	
		},
		/**数据权限和服务权限暂时先不做**/
		// {
		// 	path: 'register/role/data',
		// 	component: resolve => require(['../application/register/role/data.vue'], resolve),	
		// },
		// {
		// 	path: 'register/role/service',
		// 	component: resolve => require(['../application/register/role/service.vue'], resolve),	
		// },

		//应用注册-菜单管理
		{
			path: 'register/menu',
			component: resolve => require(['../application/register/menu/main.vue'], resolve),
			redirect: '/application/register/menu/index',
			children: [
				{	
					//菜单管理首页视图
					path: 'index',
					component: resolve => require(['../application/register/menu/index.vue'], resolve),	
				},
				{	
					//菜单管理树对应的菜单信息视图
					path: ':zid',
					component: resolve => require(['../application/register/menu/view.vue'], resolve),	
				},
				{	
					//新增菜单信息
					path: 'add/:id',
					component: resolve => require(['../application/register/menu/add.vue'], resolve),	
				},
				{	
					//新增一级菜单
					path: 'add_level/index',
					component: resolve => require(['../application/register/menu/add_level.vue'], resolve),	
				},								
			]	
		},
		//系统参数
		{
			path: 'register/parameter/list',
			component: resolve => require(['../application/register/parameter/list.vue'], resolve),	
		},
		{
			path: 'register/parameter/add',
			component: resolve => require(['../application/register/parameter/add.vue'], resolve),	
		},				
		{
			path: 'register/parameter/edit',
			component: resolve => require(['../application/register/parameter/edit.vue'], resolve),	
		},	


		{
			path: 'use',
			component: resolve => require(['../application/use.vue'], resolve),			
		},
		{
			path: 'evaluate',
			component: resolve => require(['../application/evaluate.vue'], resolve),
		},
		{
			path: 'evaluate/add',
			component: resolve => require(['../application/evaluate/add.vue'], resolve),
		},
		{
			path: 'evaluate/reply',
			component: resolve => require(['../application/evaluate/reply.vue'], resolve),
		},
		{
			path: 'icon',
			component: resolve => require(['../application/icon.vue'], resolve),
		}
	]
}
