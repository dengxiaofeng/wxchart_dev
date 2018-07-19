/*
* @Author: xiaoc
* @Date:   2018-06-16 14:28:24
* @Last Modified by:   xiaoc
* @Last Modified time: 2018-06-19 22:04:26
*/
var Wel=function(resolve, reject) {
	$.get('src/views/wel/index.html').then(function(res) { 
        resolve({ // 这里是构造一个component
           template: res,
           data(){
             return {
             	 DATA: [],
                 text: "",
                 actor: "",
                 count: 0,
                 isText: false
             }
           },
           computed: {
           	  website:function(){
           	  	return this.$store.getters.website
           	  }
           },
           created() {
               this.DATA = this.website.wel.list;
               this.actor = this.DATA[this.count] || "";
               setTimeout(() => {
                 this.isText = true;
                 this.setData();
               }, 2000);
           },
           methods: {
           	getData() {
               if (this.count < this.DATA.length - 1) {
                 this.count++;
               } else {
                 this.count = 0;
               }
               this.isText = true;
               this.actor = this.DATA[this.count];
           },
           setData() {
               let num = 0;
               let count = 0;
               let active = false;
               let timeoutstart = 5000;
               let timeoutend = 1000;
               let timespeed = 10;
               setInterval(() => {
                  if (this.isText) {
                    if (count == this.actor.length) {
                      active = true;
                    } else {
                      active = false;
                    }
                    if (active) {
                      num--;
                      this.text = this.actor.substr(0, num);
                      if (num == 0) {
                        this.isText = false;
                        setTimeout(() => {
                          count = 0;
                          this.getData();
                        }, timeoutend);
                      }
                    } else {
                      num++;
                      this.text = this.actor.substr(0, num);
                      if (num == this.actor.length) {
                        this.isText = false;
                       setTimeout(() => {
                          this.isText = true;
                          count = this.actor.length;
                        }, timeoutstart);
                      }
                   }
                }
             }, timespeed);
           }
        }
    })
})
}