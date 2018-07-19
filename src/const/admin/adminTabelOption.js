const validatePhone = (rule, value, callback) => {
  if (isvalidatemobile(value)[0]) {
        callback(new Error(isvalidatemobile(value)[1]));
  } else {
        callback();
  }
};
const isvalidateEmail = (email)=> {
	let list = [];
    let result = true;
    let msg = '';
	if(!validatenull(email)) {
       if(!validateEmail(email)) {
           msg = '邮箱地址格式不正确';
       }else {
       	   result = false
       }
	}else {
		msg = '邮箱地址不能为空';
	}
	list.push(result);
    list.push(msg);
    return list;
}
const validateEmailCallback=(rule,value,callback)=>{
	if(isvalidateEmail(value)[0]) {
		callback(new Error(isvalidateEmail(value)[1]));
	}else{
		callback()
	}
}
const validateBank = (rule,value,callback) =>{
	if(CheckBankNo(value)[0]) {
		callback(new Error(CheckBankNo(value)[1]));
	}else {
		callback();
	}
}
function isvalidateusername(username) {
  let list = [];
  let result = true;
  let msg = '';
  if(validatenull(username)) {
  	 msg = '登录账户不能为空';
  	 list.push(result,msg);
  }
  list.push(result);
  list.push(msg);
  return list;
}
const checkUserInfo = (rule,value,callback) =>{
	console.log()
	if(!validatenull(value)) {
		if(!store.getters.isValidateForm) {
			setTimeout(()=>{
              let params = new URLSearchParams();
              params.append('userName',value);
              let _res = function(data) {
              	return data;
              }
              axios({
                  method:'POST',
                  url:API_BASE_URL+'/sysUser/query',
                  data:params
              }).then((response) => {
              	if(response.data.resultcode === 'ok') {
              		if(response.data.results.length>0) {
              			callback(new Error("登录账户已存在"))
              		}else {
              			callback();
              		}
              	}else{
              		callback(new Error("网络请求错误"))
              	}
              }).catch((error)=>{
                   callback();
              })
		},100)
	  }else {
	  	callback();
	  }
	} else {
		callback(new Error("登录账户不能为空"))
	}
}
const userOption = {
  border: true,
  index: true,
  height: 'auto',
  indexLabel: '序号',
  selection: true,
 /* dicData: DIC,*/
  editform:false,
  dic: ['STATE'],
  addBtn:false,
  refreshBtn:false,
  showClomnuBtn:false,
  searchSize:'small',
  formWidth: '60%',
  editBtn: false,
  delBtn:false,
  column: [{
      label: "登录账号",
      prop: "userName",
      width: "150",
      search: true,
      align:'left',
      editDisabled:true,
      disabled:true,
      rules: [{
        required: true,
        trigger: "blur",
        validator:checkUserInfo
      }]
    },
    {
      label: "账户名称",
      prop: "trueName",
      rules:[{
         required: true,
         message:"请输入账户名称",
         trigger:"blur"
      }]
    },
    {
      label: "账户别名",
      prop: "alias"
    },
     {
      label: "邮箱",
      prop: "email"
    },
    {
      label: "登录密码",
      prop: "password",
      type: 'password',
      hide:true,
      search:false,
      addVisdiplay:false,
      editVisdiplay:false,
      rules:[{
         required: true,
         message:"请输入登录密码",
         trigger:"blur"
      }]
    },
    {
      label: "手机号码",
      prop: "phoneNumber",
      search:false,
      rules:[{
         required:true,
         trigger:'blur',
         validator: validatePhone
      }]
    },
    {
      label: "押金",
      prop: "deposit",
      addVisdiplay:false,
      editVisdiplay:false,
      valueDefault:'0.00',
      align:'right',
      rules:[{
         required:true,
         trigger:true,
         message:"请输入押金",
      }]
    },
    {
      label: "余额",
      prop: "balanceMoney",
      valueDefault:'0.00',
      addVisdiplay:false,
      editVisdiplay:false,
      align:'right'
    },
    {
      label: "微信账号",
      prop: "wxAccount",
      hide:true,
    },
    {
      label: "Apliy账号",
      prop: "zfbAccount",
      hide:true,
    },
    {
      label: "银行账号",
      prop: "bankAccount",
      hide:true,
      rules:[{
      	required:true,
      	trigger:'blur',
      	validator:validateBank
      }]
    },
    {
      label: "状态",
      prop: "userStatus",
      valueDefault:'0',
      search:true,
      solt: true,
      type: "radio",
      dicData: 'STATE'
    }
  ]
};
const checkRoleInfo = (rule,value,callback) =>{
  console.log()
  if(!validatenull(value)) {
    if(!store.getters.isValidateForm) {
      setTimeout(()=>{
          let params = new URLSearchParams();
          params.append('roleName',value);
          axios({
              method:'POST',
              url:API_BASE_URL+'/sysRole/query',
              data:params
          }).then((response) => {
            if(response.data.resultcode === 'ok') {
                if(response.data.results.length>0) {
                  callback(new Error("角色名称已存在"))
                }else {
                  callback();
                }
            }else{
              callback(new Error("网络请求错误"))
            }
          }).catch((error)=>{
              callback();
          })
    },100)
    }else {
      callback();
    }
  } else {
    callback(new Error("角色名称不能为空"))
  }
}
 const roleOption = {
  border: true,
  index: true,
  selection: true,
  menuWidth: 300,
  addBtn:false,
  refreshBtn:false,
  showClomnuBtn:false,
  searchSize:'small',
  column: [{
      label: "角色名称",
      prop: "roleName",
      width: "150",
      search: true,
      rules: [{
        required: true,
        trigger: "blur",
        validator:checkRoleInfo
      }]
    },
    {
      label:"显示排序",
      prop:'showOrder',
      rules:[{
         required:true,
         message:"请输入排序号",
         trigger:"blur"
      }]
    }
  ]
};
