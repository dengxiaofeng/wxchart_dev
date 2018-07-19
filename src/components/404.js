/*
* @Author: xiaoc
* @Date:   2018-06-19 14:56:08
* @Last Modified by:   xiaoc
* @Last Modified time: 2018-06-19 15:12:34
*/
const errorpage_404 = function(resolve, reject) {
$.get('src/components/404.html').then(function(res) { 
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