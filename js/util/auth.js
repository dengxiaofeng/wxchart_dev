/*
* @Author: xiaoc
* @Date:   2018-06-19 11:25:40
* @Last Modified by:   xiaoc
* @Last Modified time: 2018-06-19 11:25:56
*/
const TokenKey = 'x-access-token'

 function getToken() {
  return Cookies.get(TokenKey)
}

 function setToken(token) {
  return Cookies.set(TokenKey, token)
}

 function removeToken() {
  return Cookies.remove(TokenKey)
}