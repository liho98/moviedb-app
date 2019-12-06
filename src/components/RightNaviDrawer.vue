<template>
  <div>
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

    <div style="height: 900px;overflow-y: scroll;">
      <v-skeleton-loader v-for="(movie, i) in results" :key="i" class="mx-auto my-5" type="card">
        <v-card
          flat
          class="mx-auto"
          max-width="100%"
          color="transparent"
          style="border-radius: 1px;cursor:pointer"
          @click="setMovieId(i)"
        >
          <v-img :src="$store.state.api.baseImageUrl + movie.poster_path"></v-img>

          <v-card-title v-if="$store.state.selectedTab == 'Movie'" class="pl-0">{{movie.title}}</v-card-title>
          <v-card-title v-else class="pl-0">{{movie.name}}</v-card-title>
        </v-card>
      </v-skeleton-loader>
    </div>
  </div>
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