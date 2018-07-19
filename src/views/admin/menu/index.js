/*
* @Author: xiaoc
* @Date:   2018-06-15 22:21:12
* @Last Modified by:   xiaoc
* @Last Modified time: 2018-07-15 13:40:14
*/
var option = {
    expandAll: true,
    columns: [{
      text: '菜单名称',
      value: 'menuName',
      width: 200
    },{
      text: '菜单图片地址',
      value: 'menuImage'
    },{
      text: '菜单url',
      value: 'menuUrl'
    },{
      text:"菜单显示顺序",
      value:'menuOrder'
    }
  ],
  data:[]
}


const Menu = function(resolve, reject) {
$.get('src/views/admin/menu/index.html').then(function(res) { 
    resolve({
       template: res,
       data:function(){
          return {
              option:option,
              boxVisible:false,
              boxType:0,
              text: "",
              menuItem:'',
              is_valmenu:false,
              leavl:"一级菜单",
              menuFrm:{
                 id:'',
                 menuName:'',
                 menuImage:'',
                 menuOrder:'',
                 menuUrl:'',
                 parentId:''
              },
               rules: {
                  menuName: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
                  menuUrl:[{required:true,message:'请输入菜单路径',trigger:'blur'}],
                  menuOrder:[{type:'number',required:true,message:'请输入菜单排序号',trigger:'blur'}]
               }
          }
       },
       created() {
         this.getMenuAll()
         this.text = this.value;
       },
       watch: {
          value: function(n, o) {
             this.text = this.value;
          }
       },
       mounted() {
       },
       computed: {
           permission:function () {
             return this.$store.getters.permission
           }
       },
       methods:{
          /**
           * 选择菜单事件
           *
           * @param      {string}  value   The value
           */
          handleChange(value) {
            console.log(value)
            if(value === "1") {
                this.is_valmenu = true;
                console.log(this.is_valmenu)
            }else {
                this.is_valmenu = false
            }
            this.$emit("input", value);
          },
          /**
           * 菜单刷新
           * { function_description }
           */
          handleRefresh(){
            this.getMenuAll();
          },
          /**
           * 获取所有菜单
           * Gets the menu all.
           */
          getMenuAll(){
            this.$store.dispatch('GetMenuAll').then(data => {
                  this.option.data=treeMenu(data);
                  this.menuItem = data.filter(function(val) {
                    return val.parentId==""
                  });
                  console.log(data)
            })
            console.log(this.menuItem)
          },
          /**
           *  新增操作
           * { function_description }
           */
          handleAdd(){
              this.boxType = 0
              this.boxVisible = true;
          } ,
          /**
           * 编辑操作
           * { function_description }
           *
           * @param      {<type>}  row     The row
           * @param      {<type>}  index   The index
           */
          handleEdite(row,index){
             this.menuFrm ={
                 id:row.id,
                 menuName:row.menuName,
                 menuImage:row.menuImage,
                 menuOrder:row.menuOrder,
                 menuUrl:row.menuUrl,
                 parentId:row.parentId
             };
             this.boxType = 1
             console.log(this.menuFrm)
             if(row.parentId!=="") {
                this.leavl = "下级菜单"
             }
             console.log(this.menuFrm)
             this.boxVisible = true;
          },
          /**
           * 表单重置
           * { function_description }
           */
          formReset() {
            for (let o in this.menuFrm) {
              if (this.menuFrm[o] instanceof Array) {
                this.menuFrm[o] = []
              } else if (typeof this.menuFrm[o] === 'number') {
                this.menuFrm[o] = 0
              } else {
                this.menuFrm[o] = ''
              }
            }
            this.is_valmenu=false,
            this.leavl="一级菜单";
          },
          /**
           * digao 关闭
           * { function_description }
           *
           * @param      {boolean}  cancel  The cancel
           */
          hide(cancel){
            const callback=()=>{
               if(cancel!=false) {
                  this.$nextTick(()=>{
                     this.$refs['menuFrm'].resetFields()
                     this.formReset()
                  })
                   this.leavl = "一级菜单"
                   this.is_valmenu = false
                   this.boxVisible = false
               }
            }
            callback()
          },
          /**
           * 菜单删除操作
           * 
           * { function_description }
           *
           * @param      {<type>}  row     The row
           * @param      {<type>}  index   The index
           */
           handleDel(row,index){
               console.log(row);
               if(row.parentId === "") {
                  this.$notify({
                     showClose: true,
                     message: "请先删除子菜单",
                     type: "error"
                  });
                  return;
               }
               this.$confirm(`是否确认删除菜单${row.menuName}`, "提示", {
                   confirmButtonText: "确定",
                   cancelButtonText: "取消",
                   type: "warning"
               }).then(()=>{
                   this.$store.dispatch('DeleteMenu',row).then(res=>{
                      console.log(res)
                      var _res = res.data.data;
                      if(_res.resultcode === 'ok') {
                          this.$message({
                             showClose: true,
                             message: "删除成功",
                             type: "success"
                          });
                          this.getMenuAll();
                      }else {
                          this.$message({
                              showClose: true,
                              message: "删除失败",
                              type: "success"
                          });
                      }
                   })
               })
           },
          /**
           * 表单更新操作
           * { function_description }
           */
          rowUpdate(){
             console.log(this.menuFrm)
             console.log(this.leavl)

             this.menuFrm.parentId=this.leavl === '0' ? this.menuFrm.parentId ="" : this.menuFrm.parentId === "" ? '': this.menuFrm.parentId 
             console.log(this.menuFrm)
             this.$refs['menuFrm'].validate(valid => {
                if (valid) {
                   this.$store.dispatch('SaveMenu',this.menuFrm).then(res=>{
                       var json = res.data.data;
                       if(json.resultcode === 'ok') {
                           this.$message({
                             showClose: true,
                             message: "修改成功",
                             type: "success"
                           });
                           this.boxVisible = false
                           this.getMenuAll();
                           this.$refs['menuFrm'].resetFields()
                           this.formReset()
                        }else {
                           this.$message({
                               showClose: true,
                               message: "修改失败",
                               type: "success"
                           });
                        }
                   })
                }
             })
          },
          /**
           * 菜单新增
           * { function_description }
           */
          handleSave() {
             let row = this.menuFrm;
             console.log(row)
             row = Object.assign({},row,{
                parentId:this.text === undefined ? '': this.text
             })
             console.log(row)
             delete row["id"];
             this.$store.dispatch("SaveMenu",row).then(res=>{
                  var json = res.data.data;
                  if(json.resultcode === 'ok') {
                      this.$message({
                         showClose: true,
                         message: "添加成功",
                         type: "success"
                      });
                      this.boxVisible = false
                      this.getMenuAll();
                      this.$refs['menuFrm'].resetFields()
                      this.formReset()
                  }else {
                      this.$message({
                         showClose: true,
                         message: "添加失败",
                         type: "success"
                      });
                  }
             })
         },
       }
    })
  })
}