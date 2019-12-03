<template>
  <v-app>
    <!-- left navigation drawer -->
      <LeftNaviDrawer />

    <!-- right navigation drawer -->
      <RightNaviDrawer />

    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import LeftNaviDrawer from "@/components/LeftNaviDrawer.vue";
import RightNaviDrawer from "@/components/RightNaviDrawer.vue";

export default {
  name: "App",

  components: {
    LeftNaviDrawer,
    RightNaviDrawer
  },

  data: () => ({})
};
</script>

<style>
html {
  overflow-y: hidden !important;
}
</style>