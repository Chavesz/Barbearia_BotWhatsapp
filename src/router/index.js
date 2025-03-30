// src/router/index.js
import Vue from 'vue';
import Router from 'vue-router';
import InicioBarbearia from '../components/InicioBarbearia.vue'
import ChatComponent from '../components/ChatComponent.vue';
import AgendamentosBarbearia from '../components/AgendamentosBarbearia.vue'; // Caminho corrigido
import DashboardBarbearia from '../components/DashboardBarbearia.vue';
Vue.use(Router);

const routes = [
 
  {
    path: '/',
    name: 'InicioBarbearia',
    component: InicioBarbearia,
  },

  {
    path: '/AgendamentosBarbearia',
    name: 'AgendamentosBarbearia',
    component: AgendamentosBarbearia,
  },
  {
    path: '/ChatComponent',
    name: 'ChatComponent',
    component: ChatComponent,
  },

  {
    path: '/DashboardBarbearia',
    name: 'DashboardBarbearia',
    component: DashboardBarbearia,
  },
];

const router = new Router({
  routes,
  mode: 'history',
});

export default router;