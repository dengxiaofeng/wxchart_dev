/*
* @Author: xiaoc
* @Date:   2018-06-15 22:21:12
* @Last Modified by:   xiaoc
* @Last Modified time: 2018-07-05 20:51:43
*/
const User = function(resolve, reject) {
$.get('src/views/admin/user/index.html').then(function(res) { 
    resolve({
       template: res,
       data:function(){
          return {
             tableSearch:{},
             tableOption: {}, //表格设置属性
             tableData: [], //表格的数据
             tablePage: 1,
             tableLoading: false,
             tabelObj: {},
             tableRow:{},
             page: {
               total: 0, //总页数
               currentPage: 1, //当前页数
               pageSize: 10 //每页显示多少条
             },
             grade: {
               box: false,
               check: []
             }
          }
       },
       created() {
         this.tableOption = userOption;
         this.handleList();
       },
       watch: {},
       mounted() {},
       computed: {
       	   permission:function () {
       	   	 return this.$store.getters.permission
       	   },
       	   menuAll:function() {
       	   	 return this.$store.getters.menuAll
       	   }
       },
       props: [],
       methods: {
          /**
           * 有效状态字典翻译
           *
           * @param      {<type>}  dic     The dic
           * @param      {<type>}  value   The value
           * @return     {<type>}  { description_of_the_return_value }
           */
          findByvalue(dic, value) {
            return this.$refs.crud.findByvalue(dic, value);
          },
          /**
           *  用户信息录入
           */
          handleAdd() {
            this.$refs.crud.rowAdd();
          },
          handleRefresh(){
            this.handleList(this.tableSearch);
          },

          /**
           * 用户信息列表
           */
          handleList(form) {
            this.tableLoading = true;
            debugger
            this.$store
            .dispatch("GetUserData", 
                      Object.assign({}, form, {
                      currentPage:this.page.currentPage,
                      pageSize:this.page.pageSize
             }))
            .then(data => {
              console.log(data);
               setTimeout(() => {
                 this.tableData = data.list;
                 this.page.total=data.total,
                 this.page.pageSize=data.pageSize
                 this.tableLoading = false;
               }, 1000);
            });
         },
         handleSearchChange(form){
           this.tableSearch = form;
           this.handleList(this.tableSearch);
         },
         /**
          *  表格选择行
          *
          * @param      {<type>}  val     The value
          */
         handleSelectionChange(val) {
             this.tableRow = val;
         },
         handleCurrentChange(val) {
            this.tablePage = val;
            this.handleList();
         },
         /**
          * 菜单栏用户信息编辑
          *
          * @return     {boolean}  { description_of_the_return_value }
          */
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
         /**
          * 选择行用户信息编辑
          *
          * @param      {<type>}  row     The row
          * @param      {<type>}  index   The index
          */
         handleEdit(row, index) {
             debugger
            this.$store.dispatch('SET_FORM_STATE',true).then(data=>{});
            this.$refs.crud.rowEdit(row, index);
         },
         /**
          * 用户信息新增/更新
          *
          * @param      {<type>}    row     The row
          * @param      {Function}  done    The done
          */
         handleSave(row, done) {

          this.$store.dispatch("SaveUserData",{user:row}).then(data=>{
             if(data.resultcode === "ok") {
                this.tableData.push(row);
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
         /**
          * 选择行删除
          *
          * @param      {<type>}  row     The row
          * @param      {<type>}  index   The index
          */
         handleDel(row, index) {
           console.log(row)
           this.$confirm(`是否确认删除登录账号为${row.userName}`, "提示", {
             confirmButtonText: "确定",
             cancelButtonText: "取消",
             type: "warning"
           })
             .then(() => {
               this.$store.
                dispatch("DelUserData",{user:row}).
                then(data=>{
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
         /**
          * 批量删除
          *
          * @return     {boolean}  { description_of_the_return_value }
          */
         handleRowDel(){
            console.log(this.tableRow)
            if(validatenull(this.tableRow)) {
               this.$notify({
                  showClose: true,
                  message: "请选择需要删除的数据",
                  type: "error"
               })
               return false;
            }else if(this.tableRow.length>1) {
               this.$confirm(`是否确认删除`, "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
               }).then(()=>{
                  this.$store.dispatch('DelBthUserData',{users:this.tableRow})
                  .then(data=>{
                      if(data.resultcode ==='ok') {
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
            } else {
               this.handleDel(this.tableRow[0], -1);
            }
         },
         /**
          * 用户信息更新
          *
          * @param      {<type>}    row     The row
          * @param      {<type>}    index   The index
          * @param      {Function}  done    The done
          */
         handleUpdate(row, index, done) {
            debugger
            this.$store.dispatch('SET_FORM_STATE',true).then(data=>{});
            this.$store.dispatch("SaveUserData",{user:row}).then(data=>{
             console.log(data)
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
         },
         boxhandleClose(done) {
           done();
           this.$store.dispatch('SET_FORM_STATE',false).then(data=>{});
        },
        boxhandleOpen(show) {
          this.$notify({
            showClose: true,
            message: "表单打开前处理事件",
            type: "success"
          });
          show();
        }
      }
    })
  })
}