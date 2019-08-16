<template>
  <div id="test-home">
		<el-container>
			<!-- 侧边栏 -->
			<el-aside width="auto">
			<!-- <img src="../assets/logo.png"> -->
				<!-- :default-active='$route.path' 双向绑定-->
				<el-menu class="el-menu-vertical-demo" 
				@open="handleOpen" 
				@close="handleClose" 
				:collapse="isCollapse" 
				:default-active='$route.path'
				:default-openeds="['0','1']"
				>
					<el-submenu v-for="(value,index) in asideItem" :key="index" :index="''+index"  >
						<template slot="title">
							<i :class="value.class"></i>
							<span slot="title" >{{ value.aside }}</span>
						</template>
							<el-menu-item v-for="value in value.option" 
							@click="addTab(value)" 
							:index='value.path'
							:key="value.path"
							>
								{{ value.name }}
							</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-container>
				<!-- 头部 -->
				<el-header>
					
				<el-row>
					<!-- 左 -->
				<el-tooltip class="tooltip" effect="dark" :content="isCollapse?'展开':'收起'" placement="right">
                <el-button @click="isCollapse=!isCollapse" :icon="isCollapse?'el-icon-s-fold':'el-icon-s-unfold'"
                  style="color:white;border: 0; float: left; background-color: rgb(255, 255, 255,0.4); 
				  padding: 20px;margin:4px 20px 10px 0px ;" />
				</el-tooltip>
				  <!-- 中 -->
				  <el-col :span="16"><div class="grid-content bg-purple-light">
					<el-tabs v-model="editableTabsValue" type="card" @tab-remove="removeTab" @tab-click="clinkTab">
						<el-tab-pane
							v-for="(item, index) in editableTabs"
							:key="item.name"
							:label="item.title"
							:name="item.name"
							:closable='index>0' 
						>      	
							{{item.content}}
						</el-tab-pane>
					</el-tabs>
				  </div></el-col>
				  <!-- 右 -->
				  <el-col :span="4"><div class="grid-content bg-purple">
					<el-dropdown>
						<i class="el-icon-setting" style="margin-right: 15px"></i>
						<el-dropdown-menu slot="dropdown">
						  <el-dropdown-item>查看</el-dropdown-item>
						  <el-dropdown-item>新增</el-dropdown-item>
						  <el-dropdown-item>删除</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
					<span>王小虎</span>
				  </div></el-col>
				</el-row>
					
					<!-- <div style="margin-bottom: 20px;">
						<el-button
							size="small"
							@click="addTab(editableTabsValue)"
						>
							add tab
						</el-button>
					</div> -->
					
				</el-header>
				<!-- 内容 -->
				<el-main>
					<router-view/>
				</el-main>
			</el-container>
		</el-container>
  </div>
	
</template>

<script>
export default {
    data() {
		return {
			isCollapse: false,//组件
			unique:false,		
			//tab组件
			editableTabsValue: '',
			editableTabs: [{
			  title: '首页',
			  name: '/firstMa',
			  content: ''
			}],
			tabIndex: 2,
			// 双重v-for循环格式
			asideItem:[
				{
					aside:"基础数据",
					 class: "el-icon-menu",
					option:[
						{
						name:"首页",
						path:"/firstMa"
						},
						{
						name:"班级管理",
						path:"/classMa"
						},
						{
						name:"老师管理",
						path:"/teacherMa"
						},
						{
						name:"学生管理",
						path:"/studentMa"
						},
						{
						name:"修改密码",
						path:"/changePas"
						},
						{
						name:"角色管理",
						path:"/typeMa"
						}
					]
					
				},
				{
					aside:"在线测试",
					class: "el-icon-menu",
					option:[
						{
						name:"试卷录入",
						path:"/entryTest"
						},
						{
						name:"试卷批阅",
						path:"/examineTest"
						},
						{
						name:"试卷维护",
						path:"/maintainTest"
						},
						{
						name:"成绩查看",
						path:"/readTest"
						},
						{
						name:"安排考试",
						path:"/arrangeTest"
						},
					]
					
				}
			]
		}
	},
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
	/**
	 * addTab 组件新增方法
	 * @param {string} 新增
	 */
	addTab(menu) {
		// console.log("菜单", menu)
        var exist = false;
      for (var i = 0; i < this.editableTabs.length; i++) {
        if (menu.name == this.editableTabs[i].title) {
          exist = true;
          break;
        }
      }
      if (exist == true) {
        this.editableTabsValue = menu.path;
		this.$router.push(menu.path)
        return;
      }
      this.editableTabs.push({
        title: menu.name,
        name: menu.path
      });
	  this.$router.push(menu.path)
      this.editableTabsValue = menu.path;

      },
	  //点击
	clinkTab(name){
		console.log(name)
		for (var m = 0; m < this.asideItem.length; m++) {
			for (var n = 0; n < this.asideItem[m].option.length; n++) {
			  var ser = this.asideItem[m].option;
			  // console.log(ser)
			  if (ser[n].name == name.label) {
				  this.$router.push(name.name)
				  // console.log(name.name)
				this.addTab(ser[n]);
			  }
		}
	}


	  },
	  //删除
      removeTab(targetName) {
		  
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
		// console.log(activeName)
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
				console.log(activeName)
				this.$router.push(activeName)
              }
            }
          });
        }
        this.$router.push(activeName)
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
		
      }
			
			
    }
  }

</script>

<style scoped="scoped" lang="less">
a {
	margin: 10px;
	text-decoration: none;
}

.el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
/* 菜单 */
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    // min-height: 710px;
  }
  .el-menu{
	  height: 100vh;
  }
 /* 图片 */
.el-aside[data-v-7eb2bc79]{
	line-height: 0px;
	background-color: white;
}
/* 头部 */
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  
  /deep/ .el-menu{
	  background-color: #666
  }
  .el-menu-item{
	  color: white;
  }
  /deep/ .el-submenu__title{
	  color: white;
  }
  /deep/ .el-submenu__title i{
	  color: white;
  }
 /deep/ .el-menu-item is-active{
	 background-color: red;
 }
//  .el-menu-item.is-active{
// 	 background-color: black;
//  }
 .el-menu-item:focus, .el-menu-item:hover{
	 background-color: black;
 }
/deep/ element.style{
	background-color: black;
}
/deep/ [data-v-7eb2bc79] .el-submenu__title:hover{
	background-color: black;
}
/deep/.el-submenu__title{
	background-color: rgba(0,0,0,0.4);
}

.el-header[data-v-7eb2bc79]{
	background-color: rgba(0,0,0,0.6);
}
/deep/ .el-tabs__item {
	color: white;
}
/deep/ .el-header[data-v-7eb2bc79]{
	color: white;
}
/deep/ [data-v-7eb2bc79] .el-submenu__title{
	background-color: #666;
}
</style>
