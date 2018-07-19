/*
* @Author: xiaoc
* @Date:   2018-06-19 11:27:22
* @Last Modified by:   xiaoc
* @Last Modified time: 2018-07-19 10:52:59
*/
/**
 * 
 *  用户登录接口调用
 *
 * @param      {<type>}   username  The username
 * @param      {<type>}   password  The password
 * @param      {<type>}   code      The code
 * @param      {<type>}   redomStr  The redom string
 * @return     {Promise}  { description_of_the_return_value }
 */
 
 const loginByUsername = (username, password, code, redomStr) => {
    return new Promise((resolve, reject) => {
        let prefix=":";
        let params = new URLSearchParams();
        params.append('scope', 'read');
        params.append('grant_type', 'password');
        params.append('userName',username);
        params.append('password',password);
        params.append('clientId','sensor');
        params.append('clientSecret','pKcCUqAPiq82rHhagp0Z6p5XpvnMYVdt')
        let b = new Base64();
        let token=b.encode(username+prefix+password);
        console.log(token)
       
    })
}

/**
 * 获取菜单
 * Gets the menu.
 *
 * @param      {number}   parentId  The parent identifier
 * @return     {Promise}  The menu.
 */
 const getMenu = (parentId) => {
    return new Promise((resolve, reject) => {
        if (parentId != 1) parentId = 0;
        resolve({ data: menu[parentId] });
    })
}
/**
 * 获取全部菜单
 * Gets the menu all.
 *
 * @return     {Promise}  The menu all.
 */
 const getMenuAll = () => {
    return new Promise((resolve, reject) => {
      axios({
           method:'POST',
           url: API_BASE_URL+'/sysMenu/query'
      }).then ((response) => {
         resolve({data:response})
      }).catch ((error) => {
        console.log (error)
      })
    })
}




 const logout = () => {
    return new Promise((resolve, reject) => {
        resolve();
    })
}
