import entryTest from '../views/test/entryTest.vue'
import examineTest from '../views/test/examineTest.vue'
import maintainTest from '../views/test/maintainTest.vue'
import readTest from '../views/test/readTest.vue'
import arrangeTest from '../views/test/arrangeTest.vue'

export default
 [
    {
      path: '/entryTest',
      name: 'entryTest',
      component: entryTest
    },
	{
		path: '/examineTest',
		name: 'examineTest',
		component: examineTest
	},
	{
		path: '/maintainTest',
		name: 'maintainTest',
		component: maintainTest
	},
	{
		path: '/readTest',
		name: 'readTest',
		component: readTest
	},
	{
		path: '/arrangeTest',
		name: 'arrangeTest',
		component: arrangeTest
	}
  ]

