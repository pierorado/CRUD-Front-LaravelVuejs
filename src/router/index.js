import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EstudianteNew from '../views/EstudianteNew.vue'
import EstudianteEdit from '../views/EstudianteEdit.vue'
import EstudianteView from '../views/EstudianteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/createE',
      name: 'createE',
      component: EstudianteNew
    },
    {
      path: '/editE/:id',
      name: 'editE',
      component: EstudianteEdit
    },
    {
      path: '/viewE/:id',
      name: 'viewE',
      component: EstudianteView
    }
  ]
})

export default router
