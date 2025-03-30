<template>
  <v-app>
    <v-app-bar app color="black" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Logo CACHORRÕES"
          class="shrink mr-2"
          contain
          src="/assets/grumpy-dog-portrait-a-digital-painting-of-a-brown-free-png.png"
          transition="scale-transition"
          width="40"
        />
        <v-toolbar-title class="ml-2">CACHORRÕES</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>