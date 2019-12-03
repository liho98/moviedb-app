<template>
  <div class="home">
    <div
      style="width:100%;height:100%;position: fixed;top:0;left:0;background-color:rgba(0,0,0,0.3)"
    >
      <div style="width:100%;height:100%;background-color: rgba(0, 0, 0, 0.3);">
        <div style="position: absolute;width:100%;height:100%">
          <v-container class="pa-0" fill-height>
            <v-row justify="center">
              <v-btn class="ma-0" large fab color="rgba(100,100,100,0.5)">
                <v-icon>mdi-play</v-icon>
              </v-btn>
            </v-row>
          </v-container>
        </div>
        <v-img
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
  data: () => ({}),
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
