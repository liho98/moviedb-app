<template>
  <v-container fluid class="fill-height pa-0">
    <v-row no-gutters align="start" justify="center">
      <v-col align="start" justify="center" cols="12" class="pa-0">
        <v-text-field
          append-icon="mdi-filter-variant"
          flat
          hide-details
          label="Search"
          solo-inverted
          color="pink"
          v-model="tab"
        ></v-text-field>
      </v-col>
      <v-col justify="center" cols="12" class="pa-0">
        <v-container fluid class="fill-height pa-0" style="overflow-y: scroll;height:88vh">
          <v-row no-gutters align="start" justify="center">
            <v-col
              v-for="(movie, i) in results"
              :key="i"
              align="start"
              justify="center"
              cols="4"
              md="12"
              sm="4"
              class="pa-2"
            >
              <v-card flat color="transparent">
                <v-skeleton-loader class="mx-auto my-5" type="card">
                  <v-card
                    flat
                    class="mx-auto"
                    color="transparent"
                    style="border-radius: 1px;cursor:pointer"
                    @click="setMovieId(i)"
                  >
                    <v-img :src="$store.state.api.baseImageUrl + movie.poster_path"></v-img>

                    <v-card-title
                      v-if="$store.state.selectedTab == 'Movie'"
                      class="pl-0"
                    >{{movie.title}}</v-card-title>
                    <v-card-title v-else class="pl-0">{{movie.name}}</v-card-title>
                  </v-card>
                </v-skeleton-loader>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
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