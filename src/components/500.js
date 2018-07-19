/*
* @Author: xiaoc
* @Date:   2018-06-19 14:56:13
* @Last Modified by:   xiaoc
* @Last Modified time: 2018-06-19 15:01:19
*/
const errorpage_500 = function(resolve, reject) {
$.get('src/components/500.html').then(function(res) { 
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