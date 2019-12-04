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
          v-model="tab"
        ></v-text-field>
      </v-row>
      <!-- <v-divider style="margin-top: 48px"></v-divider> -->
      <div class="movieLists">
        <v-row
          align="center"
          class="mx-5"
          no-gutters
          style="align-self: baseline;important;z-index:0"
        >
          <v-skeleton-loader
            v-for="(movie, i) in results"
            :key="i"
            class="mx-auto"
            style="width:190px"
            type="card"
          >
            <v-card
              flat
              class="mx-auto"
              max-width="100%"
              color="transparent"
              style="height: 350px;border-radius: 1px;cursor:pointer"
              @click="setMovieId(i)"
            >
              <v-img :src="$store.state.api.baseImageUrl + movie.poster_path" style="height: 75%;"></v-img>

              <v-card-title v-if="$store.state.selectedTab == 'Movie'" class="pl-0">{{movie.title}}</v-card-title>
              <v-card-title v-else class="pl-0">{{movie.name}}</v-card-title>
            </v-card>
          </v-skeleton-loader>
        </v-row>
      </div>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "LeftNaviDrawer",

  data: () => ({
    results: {},
    title: "",
    tab: ""
  }),
  methods: {
    setMovieId(id) {
      // console.log(id);
      this.$store.commit("setMovieId", id);
      let tab = this.$store.state.selectedTab;
      if (tab == "Movie" && this.$store.state.movieList != null) {
        this.$store.dispatch("fetchMovieDetails");
      }
      if (tab == "TV Shows" && this.$store.state.tvList != null) {
        this.$store.dispatch("fetchTvDetails");
      }
    },
    async loadMovie() {
      this.results = await this.$store.state.movieList.results;
    },
    async changeMovieList() {
      this.results = await this.$store.state.tvList.results;
    },
    async changeTab(tab) {
      this.tab = tab;
      if (this.tab == "Movie") {
        this.results = await this.$store.state.movieList.results;
      } else {
        this.results = await this.$store.state.tvList.results;
      }
    }
  },
  computed: {
    ...mapState(["movieList", "selectedTab", "tvList"])
  },
  watch: {
    movieList(newList, oldList) {
      this.loadMovie();
      // console.log(`${newList.results[0].backdrop_path}`)
    },
    selectedTab(newTab, OldTab) {
      this.changeTab(newTab);
    },
    tvList(newList, oldList) {
      this.changeMovieList();
    }
  }
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
  width: 100%;
  margin-top: 75px;
  margin-bottom: 75px;
  overflow-y: scroll;
  height: 90%;
}
</style>