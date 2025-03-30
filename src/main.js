// main.js
import Vue from 'vue';  // Vue 2.x
import App from './App.vue';
import router from './router';  // Certifique-se de que o router está correto
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false;  // Para desabilitar a dica de produção

new Vue({
  // Renderiza o componente App.vue
  render: h => h(App),

  vuetify,

  // Passa o router para a instância Vue
  router
}).$mount('#app');  // Monta a aplicação no elemento com id 'app'

