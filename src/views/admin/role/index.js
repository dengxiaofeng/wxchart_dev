/*
* @Author: xiaoc
* @Date:   2018-06-15 22:21:12
* @Last Modified by:   xiaoc
* @Last Modified time: 2018-07-14 21:54:50
*/
const Role = function(resolve, reject) {
$.get('src/views/admin/role/index.html').then(function(res) { 
    resolve({
       template: res,
       data:function(){
          return {
             tableOption: {}, //表格设置属性
             tableData: [], //表格的数据
             tablePage: 1,
             tableLoading: false,
             tabelObj: {},
             page: {
               total: 0, //总页数
               currentPage: 1, //当前页数
               pageSize: 10 //每页显示多少条
             },
             grade: {
               box: false,
               check: []
             },
             defaultProps: {
                children: 'children',
                label: 'menuName'
             }
          }
       },
       created() {
         this.tableOption = roleOption;
         this.handleList();
         this.$store.dispatch('GetMenuAll').then(data => {})
         
       },
       watch: {},
       mounted() {},
       computed: {
       	   permission:function () {
       	   	 return this.$store.getters.permission
       	   },
       	   menuAll:function() {
       	   	 return treeMenu(this.$store.getters.menuAll)
       	   }
       },
       methods:{
           /**
            * 设置权限操作
            * { function_description }
            */
       	   handleGradeUpdate() {
              this.tabelObj.check = [].concat(this.grade.check);
              this.tabelObj = {};
              this.grade.check = [];
              this.grade.box = false;
           },
           handleGradeCheckChange(data, checked, indeterminate) {
              if (checked) {
                this.grade.check.push(data.id);
              } else {
                this.grade.check.splice(this.grade.check.indexOf(data.id), 1);
              }
           },
           handleGrade(row, index) {
               this.$store.dispatch("GetMenuAll").then(data => {
                  console.log(data)
                  this.grade.box = true;
                  this.tabelObj = row;
                  this.grade.check = this.tabelObj.check;
               });
           },
           handleAdd() {
              this.$refs.crud.rowAdd();
           },
           handleRefresh(){
              this.handleList(this.tableSearch);
           },
           handleSearchChange(form){
              this.tableSearch = form;
              this.handleList(this.tableSearch);
           },
           handleSelectionChange(val) {
             this.tableRow = val;
           },
           handleCurrentChange(val) {
             this.tablePage = val;
             his.handleList();
           },
           handleRowEdit(){
            if(validatenull(this.tableRow)) {
               this.$notify({
                  showClose: true,
                  message: "请选择一行要编辑的数据",
                  type: "error"
               });
               return false;
            } else if(this.tableRow.length > 1) {
               this.$notify({
                  showClose: true,
                  message: "请选择一行数据，不要选择多行",
                  type: "error"
               });
               return false;
            }
            this.handleEdit(this.tableRow[0], -1);
          },
           handleList(form) {
              debugger
              this.tableLoading = true;
              this.$store
                  .dispatch("GetRoleData", Object.assign({}, form, {
                      currentPage:this.page.currentPage,
                      pageSize:this.page.pageSize
                  })).then(data=>{
                       setTimeout(() => {
                         this.tableData = data.list;
                         this.page.total=data.total,
                         this.page.pageSize=data.pageSize
                         this.tableLoading = false;
                       }, 1000);
                  })
                  
            },
            handleEdit(row, index) {
              this.$store.dispatch('SET_FORM_STATE',true).then(data=>{});
              this.$refs.crud.rowEdit(row, index);
            },
            handleSave(row, done) {
                this.$store.dispatch("SaveRoleData",{role:row}).then(data=>{
                    if(data.resultcode === "ok") {
                       this.handleList();
                       this.$message({
                            showClose: true,
                            message: "添加成功",
                            type: "success"
                       });
                       done();
                    } else {
                       this.$message({
                            showClose: true,
                            message: "添加失败",
                            type: "success"
                       });
                    }
              })
               this.$store.dispatch('SET_FORM_STATE',false).then(data=>{});
            },
            handleDel(row, index) {
               console.log(row)
               this.$confirm(`是否确认删除角色名称为${row.roleName}`, "提示", {
                 confirmButtonText: "确定",
                 cancelButtonText: "取消",
                 type: "warning"
               })
               .then(() => {
                  this.tableData.splice(index, 1);
                  this.$store.dispatch('DelRoleData',{role:row}).then(data=>{
                      console.log(data)
                      if(data.resultcode === 'ok') {
                          this.tableData.splice(index, 1);
                          this.handleList()
                          this.$message({
                             showClose: true,
                             message: "删除成功",
                             type: "success"
                          });
                      }else {
                          this.$message({
                             showClose: true,
                             message: "删除失败",
                             type: "success"
                          });
                      }
                  })
               })
               .catch(err => {});
            },
            boxhandleClose(done) {
               done();
               this.$store.dispatch('SET_FORM_STATE',false).then(data=>{});
            },
            handleUpdate(row, index, done) {
               this.tableData.splice(index, 1, row);
               this.$store.dispatch('SET_FORM_STATE',true).then(data=>{});
                  this.$store.dispatch("SaveRoleData",{role:row}).then(data=>{
                      if(data.resultcode === "ok") {
                         this.tableData.splice(index, 1, row);
                         this.$message({
                              showClose: true,
                              message: "修改成功",
                              type: "success"
                         });
                         done();
                      } else {
                         this.$message({
                              showClose: true,
                              message: "修改失败",
                              type: "success"
                         });
                      }
                  })
                  this.$store.dispatch('SET_FORM_STATE',false).then(data=>{});
                  done();
            }
         } 
    })
  })
}