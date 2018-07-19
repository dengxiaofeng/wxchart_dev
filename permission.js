/*
* @Author: xiaoc
* @Date:   2018-06-19 17:11:11
* @Last Modified by:   xiaoc
* @Last Modified time: 2018-07-18 14:29:21
*/
function hasPermission(roles, permissionRoles) {
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}
const lockPage = store.getters.website.lockPage;
router.beforeEach((to, from, next) => {
   NProgress.start() 
   let flag = true;
   const whiteList = store.getters.website.whiteList
   for (let i = 0; i < whiteList.length; i++) {
     if (new RegExp("^" + whiteList[i].toString() + ".*", "g").test(to.path)) {
       flag = false;
       break;
     }
   }
   if (flag) {
      const value = to.query.src ? to.query.src : to.path;
      const label = to.query.name ? to.query.name : to.name;
      store.commit('ADD_TAG', {
        label: label,
        value: value,
        query: to.query
      });
    }
    next()
})

//寻找子菜单的父类
function findMenuParent(tag) {
  let tagCurrent = [];
  const menu = store.getters.menu;
  tagCurrent.push(tag);
  return tagCurrent;

}
router.afterEach((to, from) => {
  NProgress.done();
  setTimeout(() => {
    const tag = store.getters.tag;
    setTitle(tag.label);
    store.commit('SET_TAG_CURRENT', findMenuParent(tag));
  }, 0);
})