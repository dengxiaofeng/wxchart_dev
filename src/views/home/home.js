/*
* @Author: xiaoc
* @Date:   2018-06-15 22:43:09
* @Last Modified by:   xiaoc
* @Last Modified time: 2018-07-19 10:46:15
*/


var items= [
   {
     label: "首页",
     href: "/wel/index",
     parentId: 0
   }
 ]
const Home = function(resolve, reject) {
	$.get('src/views/home/index.html').then(function(res){
         resolve({
         	template: res,
         	data:function(){
               return {
                  items:items,
                  visible: false,
                  tagBodyLeft: 0,
                  lock: false,
                  startX: 0,
                  startY: 0,
                  endX: 0,
                  endY: 0,
                  top: 0,
                  left: 0,
                  selectedTag: {},
                  activeIndex: "0",
                  box: false,
                  form: {
                    passwd: ""
                  }
               }
           },
           mounted() {
              this.init()
              listenfullscreen(this.setScreen);
           },
           created() {
             this.$store.dispatch('GetMenu').then(data => {})
           },
           computed: {
                lockPasswd:function(){
                  return this.$store.getters.lockPasswd
                },
                nowTagValue: function() {
                   return setUrlPath(this.$route)
                },
                tagListNum: function() {
                  return this.tagList.length != 0
                },
                tagCurrent:function(){
                   return this.$store.getters.tagCurrent
                },
                menu:function(){
                  console.log(this.$store)
                  return this.$store.getters.menu
                },
                tagWel:function(){
                  return this.$store.getters.tagWel
                },
                tagList:function(){
                  console.log(this.$store.getters.tagList)
                  return this.$store.getters.tagList
                },
                tag:function(){
                  return this.$store.getters.tag
                },
                website:function(){
                  return this.$store.getters.website
                },
                type: function(val) {
                  return this.website.logo.indexOf("static") != -1;
                },
                userInfo:function(){
                  console.log(this.$store.getters.userInfo)
                  return this.$store.getters.userInfo
                },
                isFullScren:function(){
                  return this.$store.getters.isFullScren
                },
                isCollapse:function() {
                  return this.$store.getters.isCollapse
                }
           },
           methods:{
                handleSetLock() {
                   this.$refs["form"].validate(valid => {
                     if (valid) {
                       this.$store.commit("SET_LOCK_PASSWD", this.form.passwd);
                       this.handleLock();
                     }
                   });
               },
               handleLock() {
                  if (validatenull(this.lockPasswd)) {
                       this.box = true;
                   return;
                  }
                  this.$store.commit("SET_LOCK");
                  setTimeout(() => {
                    this.$router.push({ path: "/lock" });
                  }, 100);
               },
               handleScreen() {
                   fullscreenToggel();
               },
               showCollapse() {
                 this.$store.commit("SET_COLLAPSE");
               },
               setScreen() {
                 this.$store.commit("SET_FULLSCREN");
               },
               logout() {
                   this.$confirm("是否退出系统, 是否继续?", "提示", {
                     confirmButtonText: "确定",
                     cancelButtonText: "取消",
                     type: "warning"
                   }).then(() => {
                     this.$store.dispatch("LogOut").then(() => {
                       this.$router.push({ path: "/login" });
                     });
                   });
              },
              init() {
                this.refsTag = this.$refs.tagsPageOpened
                setTimeout(() => {
                  this.refsTag.forEach((item, index) => {
                    if (this.tag.value === item.attributes.name.value) {
                      let tag = this.refsTag[index]
                      this.moveToView(tag)
                    }
                  })
                }, 1)
              },
              moveToView(tag) {
                 if (tag.offsetLeft < -this.tagBodyLeft) {
                   this.tagBodyLeft = -tag.offsetLeft + 10
                 } else if (
                   tag.offsetLeft + 10 > -this.tagBodyLeft &&
                   tag.offsetLeft + tag.offsetWidth <
                     -this.tagBodyLeft + this.$refs.tagBox.offsetWidth
                 ) {
                 } else {
                   this.tagBodyLeft = -(  tag.offsetLeft -(this.$refs.tagBox.offsetWidth - 100 - tag.offsetWidth) +20 )
                 }
              },
              filterPath(path, index) {
                  return path == null ? index + '' : path
              },
              open(item) {
                this.$router.push({
                  path: resolveUrlPath(item.href, item.label),
                 query: item.query
                })
              },
              openMenu(item) {
                  this.$store.dispatch("GetMenu", item.parentId).then(data => {
                  let itemActive,childItemActive = 0;
                  if (item.href) {
                       itemActive = item;
                  } else {
                     if (this.menu[childItemActive].length == 0) {
                       itemActive = this.menu[childItemActive];
                     } else {
                       itemActive = this.menu[childItemActive].children[childItemActive];
                     }
                 }
                this.$router.push({
                    path: resolveUrlPath(itemActive.href, itemActive.label)
                });
              })
            },
            hadelMouseUp(e){
              this.lock = false
            },
            hadelMousestart(e) {
              this.lock = true
              if (e.clientX && e.clientY) {
                  this.startX = e.clientX
                  this.startY = e.clientY
              } else {
                this.startX = e.changedTouches[0].pageX
                this.startY = e.changedTouches[0].pageY
              }
            },
            hadelMouse(e) {
              const boundarystart = 0,
                boundaryend =
                  this.$refs.tagsList.offsetWidth - this.$refs.tagBox.offsetWidth + 100
              if (!this.lock) {
                return
              }
              //鼠标滑动
              if (e.clientX && e.clientY) {
                this.endX = e.clientX
                this.endY = e.clientY
                //触摸屏滑动
              } else {
                //获取滑动屏幕时的X,Y
                this.endX = e.changedTouches[0].pageX
                this.endY = e.changedTouches[0].pageY
              }
              //获取滑动距离
              let distanceX = this.endX - this.startX
              let distanceY = this.endY - this.startY
              //判断滑动方向——向右滑动
              distanceX = parseInt(distanceX * 0.8)
              if (distanceX > 0 && this.tagBodyLeft < boundarystart) {
                this.tagBodyLeft = this.tagBodyLeft + distanceX
                //判断滑动方向——向左滑动
              } else if (distanceX < 0 && this.tagBodyLeft >= -boundaryend) {
                this.tagBodyLeft = this.tagBodyLeft + distanceX
              }
           },
           hadelMousewheel(e) {
              const step = 0.8 * 90 //一个tag长度
              const boundarystart = 0,
              boundaryend =this.$refs.tagsList.offsetWidth - this.$refs.tagBox.offsetWidth + 100
              // Y>0向左滑动
              if (e.deltaY > 0 && this.tagBodyLeft >= -boundaryend) {
                this.tagBodyLeft = this.tagBodyLeft - step
                // Y<0向右滑动
              } else if (e.deltaY < 0 && this.tagBodyLeft < boundarystart) {
                this.tagBodyLeft = this.tagBodyLeft + step
              }
           },
           openMenu(tag, e) {
             if (this.tagList.length == 1) {
               return
             }
             this.visible = true
             this.selectedTag = tag
             this.left = e.clientX
             this.top = e.clientY
           },
           closeOthersTags() {
             this.$store.commit('DEL_TAG_OTHER')
           },
           closeMenu() {
             this.visible = false
           },
           closeAllTags() {
             this.$store.commit('DEL_ALL_TAG')
             this.$router.push({
               path: resolveUrlPath(this.tagWel.value),
               query: this.tagWel.query
             })
           },
           openUrl(item) {
             this.$router.push({
               path: resolveUrlPath(item.value, item.label),
               query: item.query
             })
           },
           eachTag(tag) {
             for (var key in this.tagList) {
               if (this.tagList[key].value == tag.value) {
                 return key
              }
             }
             return -1
           },
           closeTag(item) {
             const key = this.eachTag(item)
             let tag
             this.$store.commit('DEL_TAG', item)
             if (item.value == this.tag.value) {
               tag = this.tagList[key == 0 ? key : key - 1]
               this.openUrl(tag)
             }
           }
         },
         watch: {
             $route(to) {
                 this.init()
                 console.log(this.$route)
                 console.log(to)
             },
              visible(value) {
               if (value) {
                 document.body.addEventListener('click', this.closeMenu)
               } else {
                 document.body.removeEventListener('click', this.closeMenu)
               }
             },
             tagBodyLeft(value) {
              this.$refs.tagsList.style.left = value + 'px'
             }
         }
      })
	})
}

   