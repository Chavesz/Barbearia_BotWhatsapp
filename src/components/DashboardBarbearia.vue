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

    <v-main class="d-flex align-center justify-center">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-card class="pa-4">
              <v-card-title>Clientes Atendidos</v-card-title>
              <v-card-text class="text-center">
                <h2 class="display-1">{{ clientesAtendidos }}</h2>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card class="pa-4">
              <v-card-title>Horários Agendados</v-card-title>
              <v-card-text class="text-center">
                <h2 class="display-1">{{ horariosAgendados }}</h2>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card class="pa-4">
              <v-card-title>Serviços Realizados</v-card-title>
              <v-card-text class="text-center">
                <h2 class="display-1">{{ servicosRealizados }}</h2>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col cols="12">
            <v-card class="pa-4">
              <v-card-title>Próximos Agendamentos</v-card-title>
              <v-list>
                <v-list-item v-for="(agendamento, index) in proximosAgendamentos" :key="index">
                  <v-list-item-content>
                    <v-list-item-title>{{ agendamento.nome }}</v-list-item-title>
                    <v-list-item-subtitle>{{ agendamento.horario }} - {{ agendamento.servico }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
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
      clientesAtendidos: 50,
      horariosAgendados: 30,
      servicosRealizados: 80,
      proximosAgendamentos: [
        { nome: 'João Silva', horario: '10:00', servico: 'Corte de Cabelo' },
        { nome: 'Maria Oliveira', horario: '11:00', servico: 'Barba' },
        { nome: 'Carlos Pereira', horario: '14:00', servico: 'Corte e Barba' },
      ],
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