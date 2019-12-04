<template>
  <v-navigation-drawer v-model="$store.state.navigationDrawer" app width="150px" style="background-color:rgba(255,255,255,0.12)">
    <v-container class="pa-0" fill-height>
      <v-row
        align="center"
        justify="center"
        no-gutters
        style="height: 150px!important;align-self: start;"
      >
        <!-- <v-col align-self="start"> -->
        <v-avatar>
          <!-- <img src="https://vuejs.org/images/logo.png" alt="vue" /> -->
          <span class="white--text headline">M</span>
        </v-avatar>
        <!-- </v-col> -->
      </v-row>

      <v-row align="center" no-gutters style="align-self: baseline;">
        <v-list expand width="100%" flat>
          <v-list-item-group v-model="item" active-class="active-btn">
            <v-list-item v-for="item in categories" :key="item.title" link>
              <!-- <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>-->

              <v-list-item-content>
                <v-list-item-title class="px-5 py-3">{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="px-4" style="margin-top:100px"></v-divider>
            <v-list-item v-for="item in user" :key="item.title" link>
              <!-- <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>-->

              <v-list-item-content>
                <v-list-item-title class="px-5 py-3">{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-row>
    </v-container>
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
  })
};
</script>

<style scoped>
.active-btn {
  border-right: 2px solid #ffffff;
}
</style>