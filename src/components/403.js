/*
* @Author: xiaoc
* @Date:   2018-06-15 22:21:12
* @Last Modified by:   xiaoc
* @Last Modified time: 2018-06-19 15:10:31
*/
const errorpage_403 = function(resolve, reject) {
$.get('src/components/403.html').then(function(res) { 
	   console.log(res)
       resolve({ // 这里是构造一个component
          template: res,
          methods:{
          	backPage() {
               this.$router.go(-1);
            },
            goHome() {
              this.$router.push({
                path: "/"
              });
            }
          }
       })
   })
}