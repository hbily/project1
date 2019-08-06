<template>
  <div id="test-home">
		<el-container>
			<!-- 侧边栏 -->
			<el-aside width="201px">
				<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
						<el-radio-button :label="false">展开</el-radio-button>
						<el-radio-button :label="true">收起</el-radio-button>
				</el-radio-group>
				<!-- :default-active='$route.path' 双向绑定-->
				<el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :default-active='$route.path'>
					<el-submenu v-for="(value,index) in asideItem" :key="index" :index="''+index"  >
						<template slot="title">
							<i :class="value.class"></i>
							<span slot="title" >{{ value.aside }}</span>
						</template>
							<el-menu-item v-for="(value,index) in value.option" @click="addTab(value)" :index='value.path'>
								{{ value.name }}
							</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-container>
				<!-- 头部 -->
				<el-header>
					<!-- <div style="margin-bottom: 20px;">
						<el-button
							size="small"
							@click="addTab(editableTabsValue)"
						>
							add tab
						</el-button>
					</div> -->
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
			//tab组件
			editableTabsValue: '/',
			editableTabs: [{
			  title: '首页',
			  name: '/',
			  content: ''
			}],
			tabIndex: 2,
			// 双重v-for循环格式
			asideItem:[
				{
					aside:"基础数据",
					 class: "el-icon-menu",
					option:[
// 						{
// 						name:"首页",
// 						path:"firstMa"
// 						},
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
					]
					
				},
				{
					aside:"在线测试",
					class: "el-icon-s-claim",
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
	 */
	addTab(menu) {
		console.log(menu)
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
		console.log("测试" , name)
		for (var m = 0; m < this.asideItem.length; m++) {
			for (var n = 0; n < this.asideItem[m].option.length; n++) {
			  var ser = this.asideItem[m].option;
			  console.log(ser)
			  if (ser[n].name == name.label) {
				  this.$router.push(name.name)
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

<style scoped="scoped">
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
    line-height: 160px;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
/* 菜单 */
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
