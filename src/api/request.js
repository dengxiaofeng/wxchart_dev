/*
* @Author: xiaoc
* @Date:   2018-07-02 15:32:13
* @Last Modified by:   xiaoc
* @Last Modified time: 2018-07-19 10:52:28
*/
var API_BASE_URL ="";
function API_AXIOS(methods,url,params) {
	new Promise((resolve, reject) => {
		 axios({
            methods:methods,
            baseurl:API_BASE_URL,
            url:url,
            data:params||{}
		 }).then((response)=>{
		 	resolve({data:response})
		 }).catch((error)=>{
		 	console.log(error)
		 })
	});
}