/*
* @Author: xiaoc
* @Date:   2018-06-19 11:24:17
* @Last Modified by:   xiaoc
* @Last Modified time: 2018-07-19 10:39:48
*/
const user = {
    state: {
        userInfo: {},
        permission: {},
        roles: [],
        menu: [],
        menuAll: [],
        token: getStore({ name: 'token' }) || '',
    },
    actions: {
        // 登出
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                logout().then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    commit('DEL_ALL_TAG');
                    commit('CLEAR_LOCK');
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //注销session
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                commit('DEL_ALL_TAG');
                commit('CLEAR_LOCK');
                removeToken()
                resolve()
            })
        },
        //获取系统菜单
        GetMenu({ commit }, parentId) {
            return new Promise(resolve => {
                getMenu(parentId).then((res) => {
                    const data = res.data;
                    commit('SET_MENU', data);
                    resolve(data);
                })
            })
        }

    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
            setStore({ name: 'token', content: state.token, type: 'session' })
        },
        SET_USERIFNO: (state, userInfo) => {
            state.userInfo = userInfo;
        },
        SET_MENU: (state, menu) => {
            const list = menu.filter(ele => {
                if (validatenull(ele.meta)) return true;
                if (validatenull(ele.meta.roles)) return true;
                if (ele.meta.roles.indexOf(state.roles[0]) != -1) {
                    return true;
                } else {
                    return false;
                }
            });
            state.menu = list;
        },
        SET_MENU_ALL: (state, menuAll) => {
            state.menuAll = menuAll;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        SET_PERMISSION: (state, permission) => {
            state.permission = {};
            permission.forEach(ele => {
                state.permission[ele] = true;
            });
        }
    }

}