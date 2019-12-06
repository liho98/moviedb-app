<template>
  <v-app>
    <LeftNaviDrawer />

    <v-app-bar app flat class="ma-4" color="transparent" style="position: fixed;right:unset">
      <v-btn @click="toggleDrawer" small fab depressed outlined style="border: none;z-index: 1;">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content class="pt-0">
      <!-- Provides the application the proper gutter -->
      <v-container fluid class="fill-height">
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import LeftNaviDrawer from "@/components/LeftNaviDrawer.vue";
// import RightNaviDrawer from "@/components/RightNaviDrawer.vue";

export default {
  name: "App",

  components: {
    LeftNaviDrawer
    // RightNaviDrawer
  },

  data: () => ({}),
  methods: {
    toggleDrawer() {
      this.$store.commit(
        "setNavigationDrawer",
        !this.$store.state.navigationDrawer
      );
      // console.log(this.$store.state.navigationDrawer)
    }
  },
  mounted() {
    this.$store
      .dispatch("fetchMovie")
      .then(resp => {
        // console.log(resp.data)
        // console.log(resp.data.results[0].backdrop_path)
        this.$store.dispatch("fetchMovieDetails");
      })
      .catch(err => {});
  }
};
</script>

<style>
html {
  overflow-y: hidden !important;
  font-size: 13px !important;
  font-family: monospace !important;
}
::-webkit-scrollbar {
  width: 0px; /* Remove scrollbar space */
}
</style>