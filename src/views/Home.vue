<template>
  <v-container fluid class="pa-0 fill-height">
    <div
      style="width:100%;height:100%;position: fixed;top:0;left:0;background-color:rgba(0,0,0,0.3)"
    >
      <div class="static" v-bind:class="{ active: isActive }" style="width:100%;height:100%;">
        <div style="position: absolute;width:100%;height:100%">
          <v-container class="pa-0" fill-height>
            <v-row justify="center">
              <v-btn
                @click="playVideo"
                class="ma-0"
                large
                fab
                color="rgba(100,100,100,0.5)"
                style="margin-left: 20px!important;"
              >
                <v-icon>{{mediaIcon}}</v-icon>
              </v-btn>
            </v-row>
          </v-container>

          <youtube
            style="z-index: -1;position: absolute!important;top: 0;left: 0;transform: scale(1.75);"
            width="100%"
            height="100%"
            :video-id="$store.state.selectedVideoId"
            :suggestedQuality="suggestedQuality"
            :playerVars="playerVars"
            ref="youtube"
            @playing="playing"
            @paused="paused"
            @ended="ended"
          ></youtube>
        </div>

        <v-img
          v-show="bgImage"
          v-bind:src="imgLink"
          style="width:100%;height:100%;z-index: -1;position: fixed;"
        ></v-img>
      </div>
    </div>

    <v-row no-gutters style="overflow-y: scroll;height: 100vh;">
      <v-col md="10" sm="12" cols="12" class="px-5" style="margin-top:70px!important">
        <v-container fluid class="pa-0">
          <v-row no-gutters style="height:100%;">

            <v-col md="7" sm="12" cols="12">
              <v-card
                justify="end"
                style="width:100%;height:100%;background-color:rgba(0,0,0,0);border:none"
                outlined
              >
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-row>
                      <v-col v-for="(item, i) in genres" :key="i" cols="4" md="2" sm="3">{{item.name}}</v-col>
                    </v-row>
                    <!-- <div class="overline mb-4"></div> -->
                    <v-list-item-title
                      class="mb-8 mt-1"
                      style="font-size: 40px;font-weight: bolder;"
                    >{{title}}</v-list-item-title>

                    <v-list-item-subtitle>{{subtitle}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>

            <v-col md="5" sm="12" cols="12">
              <v-card
                style="width:80%;height:100%;background-color:rgba(0,0,0,0);border:none;"
                outlined
              >
                <v-row>
                  <v-col md="12">
                    <v-card-title class="pb-0">STORYLINE</v-card-title>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="12">
                    <v-card-text class="pt-0" style="text-align: justify;">{{overview}}</v-card-text>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <v-col md="2" sm="12" cols="12"  justify="end" style="height:100%;z-index: 1;">
        <v-container
          fluid
          class="fill-height"
          style="background-color:rgba(255,255,255,0.12);justify-content: center;"
        >
          <v-row style="height: 100%;">
            <v-col align-self="start" md="12">
              <RightNaviDrawer />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import RightNaviDrawer from "@/components/RightNaviDrawer.vue";
import { mapState } from "vuex";

export default {
  name: "home",
  components: {
    RightNaviDrawer
  },
  data: () => ({
    videoId: 0,
    suggestedQuality: "highres",
    playerVars: {
      autoplay: 0,
      controls: 0,
      rel: 0,
      loop: 0,
      playsinline: 1,
      disablekb: 1,
      fs: 0,
      autohide: 1,
      modestbranding: 1,
      iv_load_policy: 3
    },
    bgImage: true,
    isActive: false,
    mediaIcon: "mdi-play",
    imgLink: "",
    movDetailsList: {},
    genres: [""],
    isPlay: false,
    title: "",
    overview: "",
    subtitle: ""
  }),
  methods: {
    async playVideo() {
      let tab = this.$store.state.selectedTab;
      if (tab == "Movie") {
        await this.$store.dispatch("fetchMovVideoList");
      }
      if (tab == "TV Shows") {
        await this.$store.dispatch("fetchTvVideoList");
      }

      // await this.$store.dispatch("fetchTvVideoList");
      this.isPlay = !this.isPlay;
      if (this.isPlay) {
        await this.player.playVideo();
      } else {
        await this.player.pauseVideo();
      }
    },
    async getMovListDetails(list) {
      // this.movDetailsList = await list;
      let id = await this.$store.state.selectedMovieId;
      this.title = await list.original_title;
      this.genres = await list.genres;
      this.overview = await list.overview;
      this.subtitle = (await list.status) + ", " + list.release_date;
      this.imgLink = this.$store.state.api.baseImageUrl + list.backdrop_path;
      // console.log(this.imgLink)
      // this.genres = await this.$store.state.movieDetailsList.genres
      // console.log(this.movieDetailsList.original_title)
      // console.log(this.$store.state.movieDetails.genres[1].name)
      // console.log(this.genres[0].name)
    },
    async getTvListDetails(list) {
      let id = await this.$store.state.selectedMovieId;
      this.title = await list.name;
      this.genres = await list.genres;
      this.overview = await list.overview;
      this.subtitle = (await list.status) + ", " + list.last_air_date;
      this.imgLink = this.$store.state.api.baseImageUrl + list.backdrop_path;
    },
    playing() {
      this.isPlay = true;
      this.bgImage = false;
      this.isActive = true;
      this.mediaIcon = "mdi-pause";
      // this.$store.commit(
      //   "setNavigationDrawer",
      //   !this.$store.state.navigationDrawer
      // );

      // console.log("o/ we are watching!!!");
    },
    paused() {
      this.bgImage = !this.bgImage;
      this.isActive = !this.isActive;
      this.mediaIcon = "mdi-play";
    },
    ended() {
      this.isPlay = false;
      this.bgImage = true;
      this.isActive = false;
      this.mediaIcon = "mdi-play";
      // this.player.nextVideo()
    },
    stop() {
      this.isPlay = false;
      this.bgImage = true;
      this.isActive = false;
      this.mediaIcon = "mdi-play";
      this.player.stopVideo();
    },
    async changeTab(tab) {
      if (tab == "Movie" && this.$store.state.movieList != null) {
        // this.getImage(this.$store.state.movieList);
        this.getMovListDetails(this.$store.state.movieDetailsList);
        // this.movDetailsList = await this.$store.state.movieList;
        // this.genres = await this.$store.state.movieList.genres;
      }
      if (tab == "TV Shows" && this.$store.state.tvList != null) {
        // this.getImage(this.$store.state.tvList);
        this.getTvListDetails(this.$store.state.tvDetailsList);
        // this.movDetailsList = await this.$store.state.tvList;
        // this.genres = await this.$store.state.tvList.genres;
      }
    }
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    },
    ...mapState([
      // "movieList",
      // "tvList",
      "selectedMovieId",
      "movieDetailsList",
      "selectedTab",
      "tvDetailsList"
    ])
  },
  watch: {
    // movieList(newList, oldList) {
    //   // this.getImage(newList);
    //   // console.log(`${newList.results[0].backdrop_path}`)
    // },
    // tvList(newList, oldList) {
    //   // this.getImage(newList);
    // },
    selectedMovieId(newId, oldId) {
      let tab = this.$store.state.selectedTab;
      // console.log(tab)
      this.changeTab(tab);
      this.stop();
    },
    selectedTab(newTab, OldTab) {
      this.changeTab(newTab);
      this.stop();
    },
    movieDetailsList(newList, oldList) {
      this.changeTab("Movie");
      // console.log("newList")
    },
    tvDetailsList(newList, oldList) {
      this.changeTab("TV Shows");
      // console.log(newList)
    }
  },
  mounted() {
    // this.$store
    //   .dispatch("fetchMovie")
    //   .then(resp => {
    //     console.log(resp.data)
    //     console.log(resp.data.results[0].backdrop_path)
    //   })
    //   .catch(err => {
    //   });
  } //
};
</script>

<style scoped>
.home {
  height: 100%;
}
.static {
  background-color: rgba(0, 0, 0, 0.5);
}
.active {
  background-color: rgba(0, 0, 0, 0);
}
</style>