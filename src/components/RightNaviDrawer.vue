<template>
  <v-navigation-drawer
    v-model="$store.state.navigationDrawer"
    app
    right
    style="overflow-y:hidden!important;background-color:rgba(255,255,255,0.12)"
  >
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
          solo-inverted
          color="pink"
        ></v-text-field>
      </v-row>
      <v-divider style="margin-top: 48px"></v-divider>
      <div class="movieLists">
        <v-row
          align="center"
          class="mx-5"
          no-gutters
          style="align-self: baseline;important;z-index:0"
        >
          <v-skeleton-loader class="mx-auto" width="200" type="card"></v-skeleton-loader>
          <v-skeleton-loader class="mx-auto" width="200" type="card"></v-skeleton-loader>
          <v-skeleton-loader class="mx-auto" width="200" type="card"></v-skeleton-loader>
          <v-skeleton-loader class="mx-auto" width="200" type="card"></v-skeleton-loader>
          <v-skeleton-loader class="mx-auto" width="200" type="card"></v-skeleton-loader>
        </v-row>
      </div>
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

<style>
.v-navigation-drawer__border {
  z-index: 2 !important;
}
.v-navigation-drawer__content {
  overflow-y: hidden !important;
}
.v-skeleton-loader__image {
  height: 300px !important;
}
.v-skeleton-loader__heading {
  margin-left: 0 !important;
}
.active-btn {
  border-right: 2px solid #ffffff;
}
.v-text-field--solo {
  border-radius: 0px;
}
.v-skeleton-loader__card-heading {
  background-color: rgba(0, 0, 0, 0) !important;
}
.movieLists {
  margin-top: 25px;
  margin-bottom: 65px;
  overflow-y: scroll;
  height: 90%;
}
</style>