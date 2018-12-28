export default [
	{
		path:'/login',
		name:'login',
		component: () => import('@/components/auth/TheLogin')
	},
	{
		path: '/',
		redirect: '/home'
	},
  {
    path: '/',
    component: () => import('@/components/layouts/TheMain'),
		children:[
			{
				path:'home',
				name:'home',
				component: () => import('@/components/TheHome'),
				meta:{icon:'el-icon-menu', menuName:'menu.home'}
			},
			{
				path:'users',
				name:'users',
				component: () => import('@/components/users/UsersIndex'),
				meta:{icon:'el-icon-menu', menuName:'menu.user'}
			},
			{
				path:'articles',
				name:'articles',
				component: () => import('@/components/articles/ArticlesIndex'),
				meta:{icon:'el-icon-document', menuName:'menu.article'}
			},
			{
				path:'topics',
				name:'topics',
				component: () => import('@/components/topics/TopicsIndex'),
				meta:{icon:'el-icon-edit-outline', menuName:'menu.topic'}
			},
			{
				path:'settings',
				name:'settings',
				component: () => import('@/components/settings/TheSettings'),
				meta:{icon:'el-icon-setting', menuName:'menu.setting'},
				children: [
					{
						path: 'password',
						name: 'password',
						component: () => import('@/components/settings/ChangePassword'),
						meta:{ menuName:'menu.modifyPass'}
					},
					{
						path: 'permissions',
						name: 'permissions',
						component: () => import('@/components/settings/SetPermissions'),
						meta:{ menuName:'menu.permission'}
					}
				]	
			}
		]
  }
]