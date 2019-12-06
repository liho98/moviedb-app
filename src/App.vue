<template>
  <v-app>
    <LeftNaviDrawer />

    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid class="pa-0">
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