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
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-card class="pa-4">
              <v-card-title class="justify-center">Agendamento de Horário</v-card-title>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field v-model="nome" label="Nome" :rules="nomeRules" required></v-text-field>
                  <v-text-field v-model="telefone" label="Telefone" :rules="telefoneRules" required></v-text-field>
                  <v-select v-model="servico" :items="servicos" label="Serviço" :rules="servicoRules" required></v-select>
                  <v-select v-model="horario" :items="horariosDisponiveis" label="Horário" :rules="horarioRules" required></v-select>
                  <v-btn :disabled="!valid" color="success" class="mr-4" @click="agendar">Agendar</v-btn>
                  <v-btn color="error" @click="resetar">Limpar</v-btn>
                </v-form>
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
      valid: true,
      nome: '',
      nomeRules: [
        v => !!v || 'Nome é obrigatório',
        v => (v && v.length <= 20) || 'Nome deve ter menos de 20 caracteres',
      ],
      telefone: '',
      telefoneRules: [
        v => !!v || 'Telefone é obrigatório',
        v => /^\d{10,11}$/.test(v) || 'Telefone inválido',
      ],
      servico: '',
      servicoRules: [v => !!v || 'Serviço é obrigatório'],
      servicos: ['Corte de Cabelo (R$ 50)', 'Barba (R$ 30)', 'Corte e Barba (R$ 70)'],
      horario: '',
      horarioRules: [v => !!v || 'Horário é obrigatório'],
      horariosDisponiveis: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
    };
  },
  methods: {
    agendar() {
      if (this.$refs.form.validate()) {
        console.log('Agendamento:', this.nome, this.telefone, this.servico, this.horario);
        this.$refs.form.reset();
      }
    },
    resetar() {
      this.$refs.form.reset();
    },
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