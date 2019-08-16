<template>
	<div id="base-type">
		<!-- 新增 -->
		<div slot="header" class="clearfix">
			<el-button type="text" @click="addTeacher()">
			新增角色
			<i class="el-icon-circle-plus-outline"></i>
			</el-button>
		</div>
		<!-- 数据表 -->
		<el-table
		:data="userTypeData"
		style="width: 100%;"
		height="450"
		:default-sort="{prop: 'index', order: 'descending'}"
		>
			<el-table-column type="index" label="编号" width="50"></el-table-column>
			<el-table-column prop="userTypeTypeName" label="角色名称" sortable></el-table-column>
			<el-table-column prop="userTypeId" label="角色ID" sortable></el-table-column>
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
		    <el-form-item label="角色名称" :label-width="formLabelWidth" prop="userTypeTypeName">
		      <el-input v-model="form.userTypeTypeName" autocompvare="off" ></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="resetForm('form')">取 消</el-button>
		    <el-button type="primary" @click="submit?submitAdd('form'):submitUpdate('form')">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				//验证规则
				rules: {
				  userTypeTypeName: [{ required: true, message: "请输角色名称", trigger: "blur" }],
				},
				formLabelWidth: "120px", //表单的宽度
				dailogTitle: true, // true增加班级，false修改班级信息
				dialogFormVisible: false, //弹出框隐藏
				submit: true, //为true时，提交是增加班级的表单； false时，提交的是编辑班级的表单
				index: 0, //保存编辑的信息在表格中的位置
				userTypeData:[] ,//角色数据
				form:{
					userTypeTypeName:"",//要添加的角色名称
					userTypeId:"",//要添加的角色ID
				},
			};
		},
		created(){
			this.getUserTypeData();
		},
		methods:{
			/**
			 * 得到所有用户角色的数据
			 */
			getUserTypeData() {
			  let that = this;
			  that.axios
			    .get("UserType/GetUserRoles")
			    .then(res => {
			      // console.log(res);
			      that.userTypeData = res.data;
			      console.log("角色信息",that.userTypeData)
			    })
			    .catch(err => {
			      console.log(err);
			    });
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
			  that.form.userTypeTypeName = "";//角色名称
			  that.form.userTypeId = "";//角色ID
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
			        .post("UserType/AddUserRole",null, {
			          params:{userRoleName: that.form.userTypeTypeName}
			        })
			        .then(res => {
						console.log(res)
			          // console.log("新增角色信息",res.data.data.userTypeId);
			          if (res.data.code == 1) {
						console.log("角色ID",res.data.data.userTypeId)
						that.form.userTypeTypeName=res.data.data.userTypeTypeName;
						that.form.userTypeId = res.data.data.userTypeId;
						// console.log(res.data.data)
						that.userTypeData.unshift(res.data.data); //得到数据库返回的新增班级信息，并添加到表格中
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
			 * 修改表格中的数据
			 * index 当前行在表格中的位置 row当前行对象
			 */
			handleEdit(index, row) {
			  // console.log("修改",row);
			  var that = this;
			  that.dialogFormVisible = true; //显示修改表单
			  that.dailogTitle = false; //让表单标题显示为修改班级信息
			  that.submit = false; //让提交的表单是修改信息的表单
			  that.form.userTypeTypeName = row.userTypeTypeName;
			  that.form.userTypeId = row.userTypeId;
			  that.index = index;
			},
			submitUpdate(form) {
			  var that = this;
			  that.$refs[form].validate(valid => {
			    if (valid) {
						// console.log("角色id",that.form.userTypeId)
			      that.axios
			        .post("UserType/ModifyUserRole",null,{
						params:{ id: that.form.userTypeId, //要修改的角色编号
			          userRoleName: that.form.userTypeTypeName //要修改的角色名称}
			        }
					})
			        .then(res => {
			          console.log("修改数据", res);
			          //更改的数据实时更新到表格中
			        that.userTypeData[that.index].userTypeTypeName = that.form.userTypeTypeName;
					that.userTypeData[that.index].userTypeId = that.form.userTypeId;
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
			},
			/**
			 * 删除
			 * @params {object} row 一行数据
			 */
			handleDevare(index, row) {
				console.log('表格行', row);
				var that = this;
				that.$confirm('确定要删除?', '删除提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
						that.axios.post('UserType/RemoveUserRole',null, {
								params: { userRoleId: row.userTypeId }
							}).then(res => {
								console.log("角色",res);
								if (res.data.code == 1) {
									that.userTypeData.splice(index, 1);
									that.$message({
										type: 'success',
										message: '删除成功!'
									});
								}
							})
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
		}
	}
</script>

<style>

</style>
