<template>
  <v-navigation-drawer app :right="$store.state.navigationDrawer" style="overflow-y:hidden">
    <v-container class="pa-0" fill-height>
      <v-row
        align="center"
        justify="center"
        no-gutters
        style="position:fixed;align-self: start;z-index:1"
      >
        <v-text-field
          append-icon="mdi-filter-variant"
          flat
          hide-details
          label="Search"
          prepend-inner-icon="mdi-magnify"
          solo
          color="pink"
          style="border-bottom: 1px solid rgba(255, 255, 255, 0.12);"
        ></v-text-field>
      </v-row>

      <v-row
        align="center"
        class="ma-5"
        no-gutters
        style="align-self: baseline;margin-top: 80px!important;z-index:0"
      >
        <v-skeleton-loader class="mx-auto" width="200" type="card"></v-skeleton-loader>
        <v-skeleton-loader class="mx-auto" width="200" type="card"></v-skeleton-loader>
        <v-skeleton-loader class="mx-auto" width="200" type="card"></v-skeleton-loader>
        <v-skeleton-loader class="mx-auto" width="200" type="card"></v-skeleton-loader>
        <v-skeleton-loader class="mx-auto" width="200" type="card"></v-skeleton-loader>
      </v-row>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "LeftNaviDrawer",

  data: () => ({
    item: 0,
    categories: [
      { title: "Movie", icon: "mdi-dashboard" },
      { title: "TV Shows", icon: "mdi-account_box" },
      { title: "Sports", icon: "mdi-gavel" },
      { title: "Music", icon: "mdi-account_box" },
      { title: "MV", icon: "mdi-gavel" }
    ],
    user: [
      { title: "Profile", icon: "mdi-dashboard" },
      { title: "Logout", icon: "mdi-account_box" }
    ],
    inject: ["theme"]
  })
};
</script>

<style scoped>
.active-btn {
  border-right: 2px solid #ffffff;
}
.v-text-field--solo {
  border-radius: 0px;
}
</style>