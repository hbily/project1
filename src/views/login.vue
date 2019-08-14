<template>
	<!--首先要先给一个容器-->
	<div id="test-login">
		<div class="login">
			<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
				<el-form-item label="手机号码" prop="mobile">
					<el-input type="text" v-model="ruleForm2.mobile" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
				</el-form-item>
				
				<el-checkbox v-model="checked">记住密码</el-checkbox>
				
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm2')" style="width: 300px;" :loading="loginStatu">登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import Base64 from '@/util/Base64.js';
import Cookie from '@/util/Cookie.js';
export default {
	data() {
		return {
			ruleForm2: {
				mobile: '',
				password: ''
			},
			rules2: {
				mobile: [
					{
						required: true,
						message: '请输入手机号码',
						trigger: 'blur'
					}
				],
				password: [
					{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}
				]
			},
			checked: false, //默认忘记密码未选中
			loginStatu: false, //默认登录不是加载状态
			userToken: '' //存储令牌
		};
	},
	created() {
		if (Cookie.getCookie('name') && Cookie.getCookie('pass')) {
			//当用户记住密码后cookie中有值时
			this.ruleForm2.mobile = Base64.decode(Cookie.getCookie('name')); //对用户名进行解码
			this.ruleForm2.password = Base64.decode(Cookie.getCookie('pass'));
			this.checked = true; //选中记住密码
		}
	},
	methods: {
		/**
		 * 表单提交
		 */
		submitForm(formName) {
			var that = this;
			that.loginStatu = true; //点击登录时加载状态
			that.$refs[formName].validate(valid => {
				//表单组件
				if (valid) {
					that.axios
						.get('OAuth/authenticate', {
							params: {
								//参数传值
								userMobile: that.ruleForm2.mobile,
								userPassword: that.ruleForm2.password
							}
						})
						.then(res => {
							console.log(res);
							that.loginStatu = false;
							var userToken = res.data.token_type + ' ' + res.data.access_token; //解密用户名
							sessionStorage.setItem('token', userToken);
							sessionStorage.setItem('uid', res.data.profile.userUid);
							that.$message.success('登录成功');
							Cookie.removeCookie('name');
							Cookie.removeCookie('pass');
							if (that.checked) {
								//记住密码
								let user = Base64.encode(that.ruleForm2.mobile);
								let pwd = Base64.encode(that.ruleForm2.password);
								Cookie.setCookie('name', user, { maxAge: 60 * 60 });
								Cookie.setCookie('pass', pwd, { maxAge: 60 * 60 });
							}
							that.$router.push('/home');
						})
						.catch(err => {
							console.log('登录失败');
							setTimeout(function() {
								//设置加载状态时长
								that.loginStatu = false;
							}, 1000);

							if (err.response.status == 401) {
								that.$message.error('用户名或密码不存在');
							} else {
								that.$message.error('系统错误');
								return false;
							}
						});
				} else {
					that.$message.warning('请输入账户名和密码');
				}
			});
		}
	}
};
</script>
<!--scoped="scoped"样式私有化，只能在本组件使用-->
<style scoped="scoped" lang="less">
.el-input {
	width: 300px;
}

#test-login {
	width: 100%;
	height: 100vh;
	background: url(../assets/timg.jpg) no-repeat 0px 0px;
	background-size: cover;
	display: flex;
	align-items: center;
}
.login {
	background-color: rgba(255, 255, 255, 0.2);
	width: 500px;
	height: 300px;
	margin: 0 auto;
	padding-top: 100px;
}
.el-checkbox {
	margin-left: 100px;
	margin-bottom: 20px;
}
</style>
