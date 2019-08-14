<template>
	<div>
<el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>
<el-dialog title="收货地址" :visible.sync="dialogFormVisible">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				  <el-form-item label="活动名称" prop="name"	>
					<el-input v-model="ruleForm.name"></el-input>
				  </el-form-item>
				  <el-form-item label="活动区域" prop="region" >
					<el-select v-model="ruleForm.region" placeholder="请选择活动区域">
					  <el-option label="区域一" value="shanghai"></el-option>
					  <el-option label="区域二" value="beijing"></el-option>
					</el-select>
				  </el-form-item>
				  <el-form-item label="活动区域" prop="region2">
					<el-select v-model="ruleForm.region2" placeholder="请选择活动区域">
					  <el-option label="区域一" value="shanghai"></el-option>
					  <el-option label="区域二" value="beijing"></el-option>
					</el-select>
				  </el-form-item>
				  <el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				  </el-form-item>
			</el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
	</div>
</template>

<script>
export default {
    data() {
      return {
		dialogFormVisible: false,
			ruleForm: {
			  name: '',
			  region: '',
			  region2: '',
			},
			rules: {
			  name: [
				{ required: true, message: '请输入活动名称', trigger: 'blur' },
				{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
			  ],
			  region: [
				{ required: true, message: '请选择活动区域', trigger: 'change' }
			  ],
			 region2: [
			   { required: true, message: '请选择活动区域', trigger: 'change' }
			 ] 
			}
		 }
    },
	methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>

<style scoped="scoped" lang="less">

</style>
