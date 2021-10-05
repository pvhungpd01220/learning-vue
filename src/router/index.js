import { createRouter, createWebHistory } from 'vue-router'
import ListFriend from '@components/friend-contact/ListFriend.vue'
import SurveyLearning from '@components/survey/SurveyLearning.vue'
import ListGoal from '@components/ListGoal.vue'
import ListTeam from '@components/team/ListTeam.vue'
import TeamDetail from '@components/team/TeamDetail.vue'
import UserDetail from '@components/team/UserDetail.vue'
import Book from '@components/books/Book.vue'
import NotFound from '@components/layouts/NotFound.vue'
import root from '@components/provide-example/root.vue'


const routes = [
  {
    path: '/friends',
    // alias: ['/friends'], // dành cho multi path
    name: 'ListFriend',
    component: ListFriend,
  },
  {
    path: '/surveys',
    name: 'SurveyLearning',
    component: SurveyLearning,
  },
  {
    path: '/listgoals',
    name: 'ListGoal',
    component: ListGoal,
  },
  {
    path: '/teams',
    name: 'Team',
    component: ListTeam,
  },
  {
    path: '/teams/:teamId',
    name: 'TeamDetail',
    component: TeamDetail,
  },
  {
    path: '/users/:userId',
    name: 'UserDetail',
    component: UserDetail,
  },
  {
    path: '/',
    alias: ['/books'],
    name: 'Book',
    component: Book,
  },
  {
    path: '/',
    alias: ['/root'],
    name: 'root',
    component: root,
  },
  {
    path: '/:catchAll(.*)', // truong hop ko tim thay url thi se nhay vao component nay
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  linkActiveClass: 'active',
})

export default router