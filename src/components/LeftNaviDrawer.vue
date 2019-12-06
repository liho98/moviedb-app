<template>
  <v-navigation-drawer
    v-model="$store.state.navigationDrawer"
    app
    width="150px"
    style="background-color:rgba(255,255,255,0.12)"
  >
    <v-row
      align="center"
      justify="center"
      no-gutters
      style="height: 150px!important;align-self: start;"
    >
      <!-- <v-col align-self="start"> -->
      <v-avatar>
        <!-- <img src="https://vuejs.org/images/logo.png" alt="vue" /> -->
        <span class="white--text headline">LH</span>
      </v-avatar>
      <!-- </v-col> -->
    </v-row>

    <v-row align="center" no-gutters style="align-self: baseline;width:100%">
      <!-- <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-icon>-->
      <v-tabs vertical background-color="rgba(0,0,0,0)" color="dark" fixed-tabs grow right>
        <v-tab
          class="py-8"
          v-for="(item) in categories"
          :key="item.title"
          @click="clickTab(item.title)"
        >{{ item.title }}</v-tab>

        <v-divider class="my-10"></v-divider>

        <v-tab
          class="py-8"
          v-for="(item) in user"
          :key="item.title"
          @click="clickTab(item.title)"
        >{{ item.title }}</v-tab>
      </v-tabs>
      <!-- <v-list-item-content>
                <v-list-item-title class="px-5 py-3">{{ item.title }}</v-list-item-title>
      </v-list-item-content>-->
    </v-row>

    <template v-slot:append>
      <v-list expand width="100%" flat>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="px-5">Dark Mode</v-list-item-title>
            <v-list-item-title class="px-5">
              <v-switch v-model="$vuetify.theme.dark"></v-switch>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
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
    ]
  }),

  methods: {
    clickTab(tab) {
      // console.log(tab)
      this.$store.commit("setSelectedTab", tab);
      if (tab == "TV Shows") {
        this.$store
          .dispatch("fetchTV")
          .then(resp => {
            // console.log(resp.data)
            // console.log(resp.data.results[0].backdrop_path)
            // this.$store.dispatch("fetchMovieDetails");
            this.$store.dispatch("fetchTvDetails");
          })
          .catch(err => {});
      }
    }
  }
};
</script>

<style>
.active-btn {
  border-right: 2px solid #ffffff;
}
.v-tabs--vertical > .v-tabs-bar {
  width: 100%;
}
.v-tabs-slider-wrapper {
  right: 0 !important;
  left: unset !important;
}
</style>