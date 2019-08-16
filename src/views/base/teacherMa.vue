<template>
	<div id="base-teacherMa">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		<el-breadcrumb-item>基础数据</el-breadcrumb-item>
		<el-breadcrumb-item>老师管理</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card class="box-card">
			<!-- 单选按钮组 -->
		<div>
			<el-radio-group v-model="radio" @change="teacherData=filterData">
			  <el-radio
			    v-for="(item,index) in radioData"
			    :key="index"
			    :label="item.userTypeTypeName"
			  >{{item.userTypeTypeName}}</el-radio>
			</el-radio-group>
		</div>
			<!-- 新增 -->
			<div slot="header" class="clearfix">
				<el-button type="text" @click="addTeacher()">
				新增班级
				<i class="el-icon-circle-plus-outline"></i>
				</el-button>
     	</div>
			<!-- 数据表 -->
			<el-table
			:data="teacherData"
			style="width: 100%;"
			height="450"
			:default-sort="{prop: 'index', order: 'descending'}"
			>
				<el-table-column type="index" label="编号" width="50"></el-table-column>
				<el-table-column prop="userMobile" label="手机号码" sortable></el-table-column>
				<el-table-column prop="userName" label="老师名称" sortable></el-table-column>
				<el-table-column prop="userSex" label="性别" sortable></el-table-column>
				<el-table-column prop="userPassword" label="密码" sortable></el-table-column>
				<el-table-column prop="userTypeTypeName" label="角色" sortable></el-table-column>
				<el-table-column label="操作" width="180" fixed="right">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button
					size="mini"
					type="danger"
					@click="handleDevare(scope.$index, scope.row)"
					>删除</el-button>
				</template>
				</el-table-column>
			</el-table>
			<!-- 弹框 -->
			<el-dialog :title="dailogTitle?'增加老师':'修改老师信息'" :visible.sync="dialogFormVisible">
			  <el-form :model="form" :rules="rules" ref="form" v-if="dialogFormVisible">
			    <el-form-item label="老师名称" :label-width="formLabelWidth" prop="userName">
			      <el-input v-model="form.userName" autocompvare="off" ></el-input>
			    </el-form-item>
				<el-form-item label="手机号码" :label-width="formLabelWidth" prop="userMobile">
				  <el-input v-model="form.userMobile" autocompvare="off" ></el-input>
				</el-form-item>
			    <el-form-item label="性别" :label-width="formLabelWidth" prop="userSex">
			      <el-select v-model="form.userSex">
			        <el-option value="男"></el-option>
					<el-option value="女"></el-option>
			      </el-select>
			    </el-form-item>
				<el-form-item label="密码" :label-width="formLabelWidth" prop="userPassword">
				  <el-input v-model="form.userPassword" autocompvare="off"></el-input>
				</el-form-item>
				<el-form-item label="角色" :label-width="formLabelWidth" prop="userTypeTypeName">
				  <el-select v-model="form.userTypeTypeName" @change="selectType()">
				    <el-option
					 v-for="item in typeData"
					:key="item.userUserTypeId" 
					:value="item.userTypeTypeName"
					></el-option>
				  </el-select>
				</el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="resetForm('form')">取 消</el-button>
			    <el-button type="primary" @click="submit?submitAdd('form'):submitUpdate('form')">确 定</el-button>
			  </div>
			</el-dialog>
			
		</el-card>
</div>
</template>

<script>
export default {
	data() {
		return {
			//验证规则
			rules: {
			  userName: [{ required: true, message: "请输老师名称", trigger: "blur" }],
			  userMobile: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
			  userSex: [{ required: true, message: "请选择性别", trigger: "blur" }],
			  userPassword: [
					{ required: true, message: "请输入密码", trigger: "blur" },
					 { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
					],
			  userTypeTypeName: [{ required: true, message: "请输入角色名称", trigger: "blur" }]
			},
			formLabelWidth: "120px", //表单的宽度
			teacherData: [],//所有老师信息
			typeData:[],//所有角色信息
			dailogTitle: true, // true增加班级，false修改班级信息
			dialogFormVisible: false, //弹出框隐藏
			submit: true, //为true时，提交是增加班级的表单； false时，提交的是编辑班级的表单
			index: 0, //保存编辑的信息在表格中的位置
			form:{
				userName:"",//要修改的修改名称
				userSex:"",//让表单标题显示为修改班级信息
				userMobile:"",//要修改的手机号，11位手机号
				userPassword:"",//密码
				userTypeTypeName:"",//角色
				userUserTypeId:""//角色id
			},
			filterTable: [], //过滤后的表格
			radioData: [
				//单选按钮数据
				{ userTypeTypeName: "全部" }
			],
			radio: "全部" //默认选中全部单选按钮
		};
	},
	created() {
		this.getTeacherData();//获取所有老师信息
		this.getUserType();//获取所有角色信息
	},
	methods: {
		/**
		 * 获取所有老师信息
		 */
		getTeacherData() {
			var that = this;
			that.axios.get('User/GetTeachers').then(res => {
					that.teacherData = res.data;
					that.filterTable = res.data;
					// console.log('老师信息', that.teacherData);
				}).catch(err => {
					console.log(err);
				});
		},
		/**
		 * 获取所有角色信息
		 */
		getUserType() {
			var that = this;
			that.axios.get('UserType/GetUserRoles').then(res => {
					that.typeData = res.data;
					that.radioData.push(...res.data); //把所有的角色信息存储到单选按钮数组中
					// console.log('角色信息', that.typeData);
				}).catch(err => {
					console.log(err);
				});
		},
		/**
		 * 查找所选择角色名称对应的角色编号
		 */
		selectType() {
		  var that = this;
		  var type = that.typeData.find(item => {
		    return that.form.userTypeTypeName == item.userTypeTypeName;
		  });
			 // console.log(type)
		  that.form.userUserTypeId = type.userTypeId;
			that.form.userTypeTypeName = type.userTypeTypeName;
		   // console.log(that.form.userUserTypeId);
		},
		/**
		 * 点击增加班级弹出增加班级的表单
		 */
		addTeacher() {
		  var that = this;
		  that.dialogFormVisible = true; //显示修改表单
		  that.dailogTitle = true; //让表单标题显示为增加班级
		  that.submit = true; //让提交的表单是增加班级的表单
		  //初始化表单信息
		  // that.form.classId = 0;
		  that.form.userName = "";//老师名称
		  that.form.userMobile = "";//手机号
		  that.form.userSex = "";//性别
		  that.form.userPassword = "";//密码
		  that.form.userUserTypeId = "";//角色编号
		  that.form.userTypeTypeName = "";//角色
		},
		/**
		 * 提交增加班级的表单
		 * @param {Obj} form 表单对象
		 */
		submitAdd(form) {
		  let that = this;
		  // console.log(that.form.userName);
		  that.$refs[form].validate(valid => {
		    if (valid) {
		      that.axios
		        .post("User/AddTeacher", {
		          userName: that.form.userName,
		          userMobile: that.form.userMobile,
		          userSex: that.form.userSex,
							userPassword: that.form.userPassword,
							userUserTypeId: that.form.userUserTypeId
		        })
		        .then(res => {
		          // console.log("新增信息",res.data.code);
							// console.log(res.data.data)
		          if (res.data.code == 1) {
								// console.log(that.form.userTypeTypeName)
								res.data.data.userName = that.form.userName;
								res.data.data.userMobile = that.form.userMobile;
								res.data.data.userSex = that.form.userSex;
								res.data.data.userPassword = that.form.userPassword;
								res.data.data.userTypeTypeName = that.form.userTypeTypeName;
								that.teacherData.unshift(res.data.data); //得到数据库返回的新增班级信息，并添加到表格中
		            that.$message.success(res.data.message);
								that.dialogFormVisible = false;
		          }
		        })
		        .catch(err => {
		          console.log(err);
		        });
		    } else {
		      console.log("error submit!!");
		      return false;
		    }
		  });
		},
		/**
		 * 删除
		 * @params {object} row 一行数据
		 */
		handleDevare(index, row) {
			// console.log('表格行', row);
			var that = this;
			that.$confirm('确定要删除?', '删除提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
					that.axios.post('User/RemoveTeacher', null, {
							params: { uid: row.userUid }
						}).then(res => {
							console.log(res.data.code);
							if (res.data.code == 1) {
								that.teacherData.splice(index, 1);
								that.$message({
									type: 'success',
									message: '删除成功!'
								});
							}
						});
				})
				.catch(() => {
					that.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
		},
		/**
	   * 取消时重置表单
	   * @param {Obj} form 整个表单
	   */
	  resetForm(form) {
		this.$refs[form].resetFields();
		this.dialogFormVisible = false;
	  },
	  /**
	   * 修改表格中的数据
	   * index 当前行在表格中的位置 row当前行对象
	   */
	  handleEdit(index, row) {
	    // console.log("修改",row);
	    var that = this;
	    that.dialogFormVisible = true; //显示修改表单
	    that.dailogTitle = false; //让表单标题显示为修改班级信息
	    that.submit = false; //让提交的表单是修改信息的表单
	    that.form.userName = row.userName;
	    that.form.userSex = row.userSex;
			that.form.userMobile = row.userMobile;
			that.form.userPassword = row.userPassword;
			that.form.userUserTypeId = row.userUserTypeId;
			that.form.userTypeTypeName = row.userTypeTypeName;
	    that.index = index;
	  },
	  submitUpdate(form) {
	    var that = this;
	    that.$refs[form].validate(valid => {
	      if (valid) {
					console.log(that.form.userUserTypeId)
	        that.axios
	          .post("User/ModifyTeacher", {
							userUid:that.teacherData[that.index].userUid,
	            userName: that.form.userName, //要修改的修改名称
	            userSex: that.form.userSex, //要修改的性别，男|女
							userMobile: that.form.userMobile, //要修改的手机号，11位手机号
							userUserTypeId: that.form.userUserTypeId, //角色
							userPassword: that.form.userPassword, //密码
	          })
	          .then(res => {
	            // console.log("修改数据", res);
	            //更改的数据实时更新到表格中
	            that.teacherData[that.index].userName = that.form.userName;
							that.teacherData[that.index].userSex = that.form.userSex;
							that.teacherData[that.index].userMobile = that.form.userMobile;
							that.teacherData[that.index].userPassword = that.form.userPassword;
							that.teacherData[that.index].userTypeTypeName = that.form.userTypeTypeName;
	            switch (res.data.code) {
	              case 1:
	                that.$message.success(res.data.message);
	                break;
	              case -2:
	                that.$message.error(res.data.message);
	                break;
	              case 0:
	                that.$message.info(res.data.message);
	                break;
	              default:
	                that.$message.error(res.data.message);
	            }
	          })
	          .catch(err => {
	            console.log(err);
	          });
	      } else {
	        console.log("error submit!!");
	        return false;
	      }
	    });
	    that.dialogFormVisible = false;
	  }
	},
	computed: {
	  /**
	   * 按单选按钮的值筛选老师
	   */
	  filterData() {
	    let that = this;
	    if (that.radio == "全部") {
	      return (that.teacherData = that.filterTable);
	    } else {
	      return that.filterTable.filter(item => {
	        return item.userTypeTypeName == that.radio;
	      });
	      // console.log(that.radio)
	    }
	  }
	}
};
</script>

<style lang="less" scoped>
	/deep/.el-breadcrumb {
	  margin: 20px;
	}
	/deep/ .el-card {
	  max-width: 97%;
	  max-height: 99%;
	  margin: 0 auto;
	  .el-table {
	    .cell {
	      text-align: center;
	    }
	  }
	}
	.el-select {
	  width: 100%;
	}
</style>
