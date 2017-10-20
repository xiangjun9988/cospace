export default {
	path: '/cloud',
	//依赖部分
	component: resolve => require(['../cloud/main.vue'], resolve),
	//默认跳转
	redirect: '/cloud/zzjg/index',

	//以下部分为cloud的子模块
	children: [
		{	
			//组织机构
			path: 'zzjg',
			component: resolve => require(['../cloud/zzjg/main.vue'], resolve),
			redirect: '/cloud/zzjg/index',
			children: [
				{	
					//组织机构首页视图
					path: 'index',
					component: resolve => require(['../cloud/zzjg/index.vue'], resolve),	
				},
				{	
					//组织机构树对应的部门信息视图
					path: ':zid',
					component: resolve => require(['../cloud/zzjg/view.vue'], resolve),	
				},
				{	
					//组织机构树对应的新增部门视图
					path: 'add/index',
					component: resolve => require(['../cloud/zzjg/add.vue'], resolve),	
				},				
			]
		},
		//人员管理
		{
			path: 'personnel/list',
			component: resolve => require(['../cloud/personnel/list.vue'], resolve),			
		},		
		{
			path: 'personnel/add',
			component: resolve => require(['../cloud/personnel/add.vue'], resolve),			
		},		
		{
			path: 'personnel/edit',
			component: resolve => require(['../cloud/personnel/edit.vue'], resolve),			
		},
		//角色管理
		{
			path: 'role/list',
			component: resolve => require(['../cloud/role/list.vue'], resolve),			
		},
		{
			path: 'role/add',
			component: resolve => require(['../cloud/role/add.vue'], resolve),			
		},		
		{
			path: 'role/edit',
			component: resolve => require(['../cloud/role/edit.vue'], resolve),			
		},
		{
			path: 'role/apply/:id',
			component: resolve => require(['../cloud/role/apply.vue'], resolve),			
		},
		{
			path: 'role/apply_add/:id',
			component: resolve => require(['../cloud/role/apply_add.vue'], resolve),			
		},		
		{
			path: 'role/user/:id',
			component: resolve => require(['../cloud/role/user.vue'], resolve),			
		},
						
		//数据字典		
		{
			path: 'wordbook/list',
			component: resolve => require(['../cloud/wordbook/list.vue'], resolve),			
		},
		{
			path: 'wordbook/add',
			component: resolve => require(['../cloud/wordbook/add.vue'], resolve),			
		},
		{
			path: 'wordbook/edit/:id',
			component: resolve => require(['../cloud/wordbook/edit.vue'], resolve),			
		},				
		{
			path: 'wordbook/detail/:id',
			component: resolve => require(['../cloud/wordbook/detail.vue'], resolve),			
		},
		{
			path: 'wordbook/detail_add/:id',
			component: resolve => require(['../cloud/wordbook/detail_add.vue'], resolve),			
		},		
		{
			path: 'wordbook/detail_edit/:id',
			component: resolve => require(['../cloud/wordbook/detail_edit.vue'], resolve),			
		},
		//节假日管理						
		{
			path: 'holidays/index',
			component: resolve => require(['../cloud/holidays/index.vue'], resolve),			
		},		
		{
			path: 'holidays/classify/:id',
			component: resolve => require(['../cloud/holidays/classify.vue'], resolve),			
		},	
		{
			path: 'holidays/add',
			component: resolve => require(['../cloud/holidays/add.vue'], resolve),			
		},
		//部门人员管理					
		{
			path: 'department',
			component: resolve => require(['../cloud/department/main.vue'], resolve),
			redirect: '/cloud/department/index',
			children: [
				{	
					//部门人员管理首页视图
					path: 'index',
					component: resolve => require(['../cloud/department/index.vue'], resolve),	
				},
				{	
					//部门人员管理树对应的部门信息视图
					path: ':zid',
					component: resolve => require(['../cloud/department/view.vue'], resolve),	
				},
				{	
					//部门人员管理树对应的人员信息视图
					path: 'personnel/:id',
					component: resolve => require(['../cloud/department/personnel.vue'], resolve),	
				},				
			]	
		},
		//流程管理		
		{
			path: 'process/list',
			component: resolve => require(['../cloud/process/list.vue'], resolve),			
		},
		{
			path: 'process/add',
			component: resolve => require(['../cloud/process/add.vue'], resolve),				
		},		
		{
			path: 'process/upload',
			component: resolve => require(['../cloud/process/upload.vue'], resolve),				
		},
		{
			path: 'process/binding',
			component: resolve => require(['../cloud/process/binding.vue'], resolve),				
		},
		{
			path: 'process/edit',
			component: resolve => require(['../cloud/process/edit.vue'], resolve),				
		},
		{
			path: 'process/page_upload',
			component: resolve => require(['../cloud/process/page_upload.vue'], resolve),				
		},
		{
			path: 'process/subpage_upload',
			component: resolve => require(['../cloud/process/subpage_upload.vue'], resolve),				
		},						
		//流程配置
		{
			path: 'configuration/list',
			component: resolve => require(['../cloud/configuration/list.vue'], resolve),			
		},
		{
			path: 'configuration/add',
			component: resolve => require(['../cloud/configuration/add.vue'], resolve),			
		},		
		{
			path: 'configuration/edit/:id',
			component: resolve => require(['../cloud/configuration/edit.vue'], resolve),			
		},
		//区划管理
		{
			path: 'area/list',
			component: resolve => require(['../cloud/area/list.vue'], resolve),			
		},						
		{
			path: 'area/add',
			component: resolve => require(['../cloud/area/add.vue'], resolve),			
		},
		{
			path: 'area/edit/:id',
			component: resolve => require(['../cloud/area/edit.vue'], resolve),			
		}
	]
}
