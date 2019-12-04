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
            :video-id="videoId"
            :suggestedQuality="suggestedQuality"
            :playerVars="playerVars"
            ref="youtube"
            @playing="playing"
          ></youtube>
        </div>

        <v-img
          v-show="bgImage"
          src="https://image.tmdb.org/t/p/original/nGJpQCAn2NKeDoEflLI5DIvsqoQ.jpg"
          class="grey lighten-2"
          style="width:100%;height:100%;z-index: -1;"
        ></v-img>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {},
  data: () => ({
    videoId: "TcMBFSGVi1c",
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
  }),
  methods: {
    playVideo() {
      this.player.playVideo();
    },
    playing() {
      this.bgImage = !this.bgImage;
      this.isActive = !this.isActive
      this.$store.commit(
        "setNavigationDrawer",
        !this.$store.state.navigationDrawer
      );
      this.mediaIcon = "mdi-pause"
      console.log("o/ we are watching!!!");
    }
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    }
  },
  created() {
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
  background-color: rgba(0, 0, 0, 0.8);
}
.active {
  background-color: rgba(0, 0, 0, 0);
}
</style>