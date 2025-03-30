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
        <v-row class="justify-center">
          <v-col cols="12" md="8">
            <v-card class="pa-4 rounded-lg elevation-2" style="max-height: 500px; overflow-y: auto;">
              <v-list>
                <v-list-item v-for="(msg, index) in messages" :key="index">
                  <v-list-item-content>
                    <v-list-item-title>{{ msg }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>

            <v-card class="pa-4 rounded-lg elevation-2 mt-4">
              <v-card-title class="justify-center">
                <v-img src="cachorrao_logo.png" max-width="150" class="mr-4"></v-img>
                Controle do Chatbot Cachorrão
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" class="text-center">
                    <v-chip :color="botStatus ? 'success' : 'error'" class="ma-2">
                      {{ botStatus ? 'Rodando' : 'Parado' }}
                    </v-chip>
                  </v-col>
                </v-row>

                <v-row class="justify-center">
                  <v-col cols="6" md="5">
                    <v-btn
                      @click="startBot"
                      :disabled="botStatus || loading"
                      color="primary"
                      :loading="loading && !botStatus"
                      prepend-icon="mdi-play"
                      class="ma-2 w-100"
                    >
                      Iniciar
                    </v-btn>
                  </v-col>
                  <v-col cols="6" md="5">
                    <v-btn
                      @click="stopBot"
                      :disabled="!botStatus || loading"
                      color="error"
                      :loading="loading && botStatus"
                      prepend-icon="mdi-stop"
                      class="ma-2 w-100"
                    >
                      Parar
                    </v-btn>
                  </v-col>
                </v-row>

                <v-row v-if="qrCode" class="justify-center">
                  <v-col cols="12" class="text-center">
                    <v-img :src="qrCode" alt="Código QR" max-width="200"></v-img>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="clientNumber"
                      label="Número do Cliente (55XXXXXXXXX)"
                      class="ma-2"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="userMessage"
                      label="Digite sua mensagem"
                      class="ma-2"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row class="justify-center">
                  <v-col cols="12" md="6">
                    <v-btn
                      @click="sendMessage"
                      color="success"
                      :loading="sending"
                      prepend-icon="mdi-send"
                      class="w-100"
                    >
                      Enviar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
      {{ snackbar.text }}
    </v-snackbar>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ChatComponent',
  data() {
    return {
      drawer: true,
      rail: true,
      userMessage: '',
      messages: [], // Correção: inicializa messages como um array vazio
      botStatus: false,
      qrCode: null,
      clientNumber: '',
      loading: false,
      sending: false,
      snackbar: {
        show: false,
        text: '',
        color: '',
      },
    };
  },
  mounted() {
    this.getBotStatus();
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
    },
    async getBotStatus() {
      try {
        const response = await axios.get('http://localhost:3000/status');
        if (this.botStatus !== response.data.isConnected) {
          this.botStatus = response.data.isConnected;
        }
        this.qrCode = response.data.qr;
      } catch (error) {
        this.showSnackbar('Erro ao obter o status do bot.', 'error');
      }
    },
    showSnackbar(text, color) {
      this.snackbar.text = text;
      this.snackbar.color = color;
      this.snackbar.show = true;
    },
    // ... (restante dos métodos do seu código)
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