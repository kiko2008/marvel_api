<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center">
        <v-img
          alt="Marvel Logo"
          class="shrink mr-2"
          contain
          src="./assets/marvel.png"
          transition="scale-transition"
          width="35%"
        />
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
    <v-footer class="font-weight-medium">
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>Marvel buscador comics</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<style>
  @import "./assets/styles/styles.css"
</style>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  })
}
</script>
