<template>
	<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
   <el-form-item label="旧密码" prop="oldPass">
    <el-input type="test" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="新密码" prop="newPass">
    <el-input type="test" v-model="ruleForm.newPass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form> 
</template>

<script>
	export default {
    data() {
		var validatePass = (rule, value, callback) => {
		  if (value === '') {
			callback(new Error('请输入原密码'));
		  } else {
			if (this.ruleForm.oldPass !== '') {
			  this.$refs.ruleForm.validateField('oldPass');
			}
			callback();
		  }
		};
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.newPass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
		  oldPass: '',
          newPass: '',
          checkPass: ''
        },
        rules: {
		  oldPass: [
		    { validator: validatePass, trigger: 'blur' }
		  ],
          newPass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
		var that =this
        that.$refs[formName].validate((valid) => {
          if (valid) {
			 that.axios.get("/api/User/ModifyPassword",{
				params:{
					uid:sessionStorage.getItem("uid"),
					oldPassword: that.ruleForm.oldPass,
					newPassword: that.ruleForm.newPass
					}
			 }).then((res)=>{
				 if(res.data.code == -3){
					 that.$message.error("原密码输入错误");
				 }else if(res.data.code == 1){
				 that.$message.success("修改密码成功，三秒后重新登录");
				 setTimeout(function(){
				 	that.$router.push("/")
				 },3000)
				 }else{
					  that.$message.error("系统错误");
				 }
			 }).catch((err)=>{
				 that.$message.error("失败");

			 })
          } else {
            console.log('error submit!!');
			that.$message.error('已取消退出')
            return false;
          }
        });
      },
      resetForm(formName) {
        that.$refs[formName].resetFields();
      }
    }
  }
</script>

<style>

</style>
