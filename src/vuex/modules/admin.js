/*
* @Author: xiaoc
* @Date:   2018-06-19 12:10:31
* @Last Modified by:   xiaoc
* @Last Modified time: 2018-07-19 10:29:21
*/
const CODE_OK = "ok";
const admin = {
    state: {
       isValidateForm:false
    },
    actions: {
        GetUserData({ commit, state, dispatch }, page) {
            console.log(page)
            return new Promise((resolve, reject) => {
                
            })
        },
        DelUserData({commit,state,dispatch},user){
            return new Promise((resolve, reject) => {
                
            });
        },
        DelBthUserData({commit,state,dispatch},users) {
            return new Promise((resolve, reject) => {
               
            });
        },
        SaveUserData({commit,state,dispatch},user) {
            return new Promise((resolve, reject) => {
               
            });
        },
        QueryUserData({commit,state,dispatch},username){
            return new Promise((resolve, reject) => {
               
            });
        },
        GetRoleData({ commit, state, dispatch }, page) {
            return new Promise((resolve, reject) => {
                
            })
        },
        SaveRoleData({commit,state,dispatch},role){
            return new Promise((resolve, reject) => {
                
            });
        },
        DelRoleData({commit,state,dispatch},role) {
           return new Promise((resolve, reject) => {
              
           });
        },
        SET_FORM_STATE({commit,state,dispatch},flag) {
            commit('SET_FORM_STATE', flag);
        }

    },
    mutations: {
       SET_FORM_STATE: (state, flag) => {
           state.isValidateForm = flag;
       },
    }

}