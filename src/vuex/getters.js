/*
* @Author: xiaoc
* @Date:   2018-06-19 11:10:39
* @Last Modified by:   xiaoc
* @Last Modified time: 2018-06-23 21:31:57
*/
const getters = {
  tag: state => state.tags.tag,
  website:state => state.common.website,
  userInfo: state => state.user.userInfo,
  theme: state => state.common.theme,
  isCollapse: state => state.common.isCollapse,
  isLock: state => state.common.isLock,
  isFullScren: state => state.common.isFullScren,
  lockPasswd: state => state.common.lockPasswd,
  tagList: state => state.tags.tagList,
  tagCurrent: state => state.tags.tagCurrent,
  tagWel: state => state.tags.tagWel,
  token: state => state.user.token,
  roles: state => state.user.roles,
  permission: state => state.user.permission,
  menu: state => state.user.menu,
  menuAll: state => state.user.menuAll,
  isValidateForm: state => state.admin.isValidateForm
}