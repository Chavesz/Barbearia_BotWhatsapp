<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :rail="rail" permanent width="100">
      <v-list>
        <v-list-item>
          <v-img src="logo_agendamento.png" max-width="60" class="mx-auto"></v-img>
        </v-list-item>
        <v-list-item @click="abrirInicio" class="lateral-button">
          <v-icon>mdi-home</v-icon>
        </v-list-item>
        <v-list-item @click="abrirAgendamentos" class="lateral-button">
          <v-icon>mdi-calendar-check</v-icon>
        </v-list-item>
        <v-list-item @click="abrirChat" class="lateral-button">
          <v-icon>mdi-chat</v-icon>
        </v-list-item>
        <v-list-item @click="abrirDashboard" class="lateral-button">
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex justify-center">
      <v-container class="pa-0"> <v-row justify="center" class="ma-0"> <v-col cols="12" md="8">
            <v-card class="pa-4">
              <v-card-title class="justify-center">Bem-vindo, Barbeiro!</v-card-title>
              <v-card-text>
                <h3>Agendamentos de Hoje</h3>
                <v-list>
                  <v-list-item v-for="(agendamento, index) in agendamentosHoje" :key="index">
                    <v-list-item-content>
                      <v-list-item-title>{{ agendamento.nome }} - {{ agendamento.horario }}</v-list-item-title>
                      <v-list-item-subtitle>{{ agendamento.servico }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>

                <h3 class="mt-4">Serviços Mais Populares</h3>
                <v-list>
                  <v-list-item v-for="(servico, index) in servicosPopulares" :key="index">
                    <v-list-item-content>
                      <v-list-item-title>{{ servico }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      rail: true,
      agendamentosHoje: [
        { nome: 'João Silva', horario: '10:00', servico: 'Corte de Cabelo' },
        { nome: 'Maria Oliveira', horario: '11:00', servico: 'Barba' },
      ],
      servicosPopulares: ['Corte de Cabelo', 'Barba', 'Corte e Barba'],
    };
  },
  methods: {
    abrirAgendamentos() {
      this.$router.push('/AgendamentosBarbearia');
    },
    abrirChat() {
      this.$router.push('/ChatComponent');
    },
    abrirDashboard() {
      this.$router.push('/DashboardBarbearia');
    },
    abrirInicio() {
      this.$router.push('/');
    }
  },
};
</script>

<style scoped>
.lateral-button {
  background-color: #f0f0f0;
  border-radius: 4px;
  margin: 4px;
  cursor: pointer;
}

.lateral-button:hover {
  background-color: #e0e0e0;
}
</style>