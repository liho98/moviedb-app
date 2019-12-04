<template>
  <div class="home">
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

          <!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
          <!-- transform: scale(1.8,2.05); -->
          <youtube
            style="z-index: -10000;position: absolute!important;top: 0;left: 0;transform: scale(1.75);"
            width="100%"
            height="100%"
            :video-id="$store.state.selectedVideoId"
            :suggestedQuality="suggestedQuality"
            :playerVars="playerVars"
            ref="youtube"
            @playing="playing"
          ></youtube>
        </div>
        <v-row justify="center" style="width:100%;height:300px;position:fixed;bottom:0">
          <v-row
            justify="center"
            style="width: 65%;height: 300px;background-color: white;margin: auto;position: fixed;left: 13.5%;"
          >
  <v-card
  justify="end"
    class="mx-auto"
    max-width="344"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">OVERLINE</div>
        <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
        <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      ></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn text>Button</v-btn>
      <v-btn text>Button</v-btn>
    </v-card-actions>
  </v-card>


          </v-row>
        </v-row>
        <v-img
          v-show="bgImage"
          v-bind:src="imgLink"
          class="grey lighten-2"
          style="width:100%;height:100%;z-index: -1;"
        ></v-img>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";

export default {
  name: "home",
  components: {},
  data: () => ({
    videoId: 0,
    suggestedQuality: "hd1080",
    playerVars: {
      autoplay: 0,
      controls: 0,
      rel: 0,
      loop: 1,
      playsinline: 1,
      autohide: 1,
      modestbranding: 0,
      disabledkb: 0,
      enablejsapi: 0,
      iv_load_policy: 3,
      frameborder: 0
    },
    bgImage: true,
    isActive: false,
    mediaIcon: "mdi-play",
    imgLink: "",
    movList: {},
  }),
  methods: {
     async getImage(){
      let movieList = await this.$store.state.movieList
      // console.log(movieList.results)
      this.movList = await movieList.results

      let backdropPath = await movieList.results[this.$store.state.selectedMovieId].backdrop_path
      this.imgLink = this.$store.state.api.baseImageUrl + backdropPath;
      // console.log(this.imgLink)
    },
    async playVideo() {
      await this.$store.dispatch("fetchVideo");
      await this.player.playVideo();
    },
    playing() {
      this.bgImage = !this.bgImage;
      this.isActive = !this.isActive;
      // this.$store.commit(
      //   "setNavigationDrawer",
      //   !this.$store.state.navigationDrawer
      // );
      this.mediaIcon = "mdi-pause";
      // console.log("o/ we are watching!!!");
    }
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    },
    ...mapState(['movieList', 'selectedMovieId'])
  },
  watch: {
    movieList (newList, oldList) {
      this.getImage();
      // console.log(`${newList.results[0].backdrop_path}`)
    },
    selectedMovieId (newId, oldId) {
      this.getImage();
      // console.log(newId)
    },    
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
.static {
  background-color: rgba(0, 0, 0, 0.5);
}
.active {
  background-color: rgba(0, 0, 0, 0);
}
</style>