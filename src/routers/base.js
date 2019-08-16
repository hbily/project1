import classMa from '../views/base/classMa.vue'
import studentMa from '../views/base/studentMa.vue'
import teacherMa from '../views/base/teacherMa.vue'
import changePas from '../views/base/changePas.vue'
import firstMa from '../views/base/firstMa.vue'
import typeMa from '../views/base/typeMa.vue'


export default
 [
	 {
	   path: '/typeMa',
	   name: 'typeMa',
	   component: typeMa
	 },
    {
      path: '/classMa',
      name: 'classMa',
      component: classMa
    },
	{
		path: '/firstMa',
		name: 'firstMa',
		component: firstMa
	},
	{
		path: '/studentMa',
		name: 'studentMa',
		component: studentMa
	},
	{
		path: '/teacherMa',
		name: 'teacherMa',
		component: teacherMa
	},
	{
		path: '/changePas',
		name: 'changePas',
		component: changePas
	}
  ]

