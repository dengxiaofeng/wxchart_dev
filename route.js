/*
* @Author: xiaoc
* @Date:   2018-06-15 22:27:38
* @Last Modified by:   xiaoc
* @Last Modified time: 2018-07-19 10:44:51
*/
const routes = [ 
  {
    path: '/home', component: Home
  },
  {
	path:'/home',component:Home,
	children: [
        { path: '/main', component: Wel, name: '主页', hidden: true },
        { path: '/wel/index', component:Wel, name:"主页"},
        { path: '/dev/index' ,component:Wel,name:"设置"},
        { path: '/role/index' ,component:RoleTest,name:"权限测试"},
        { path: '/admin/menu',component:Menu,name:'菜单管理'},
        { path: '/admin/role',component:Role,name:'角色管理'},
        { path: '/admin/user',component:User,name:'用户管理'}
     ]
}, 
{
    path: '*',
    redirect: '/404',
    hidden: true
},
{
    path: '/',
    name: '主页',
    redirect: '/wel/index'
},
{
    path: '/404',
    component:errorpage_404,
    name: '404'
},
{
    path: '/403',
    component:errorpage_403,
    name: '403'
},
{
    path: '/500',
    component:errorpage_500,
    name: '500'
 }
]; 

const router = new VueRouter({ routes });