<template>
  <div class="home">
    <b-jumbotron fluid>
      <mq-layout mq="mobile">
        <img class="pic-background" src="../assets/mobile-banner.png" alt>
      </mq-layout>
      <mq-layout mq="tablet+">
        <video
          class="video-background"
          src="../assets/NYC_OutOfFocusCarLightsLOOP_1664x936.mp4"
          preload
          autoplay
          loop
          muted
        >
          <!-- hero for those who cant see html5 -->
        </video>
      </mq-layout>

      <template slot="header">Welcome to Toilt</template>
      <template slot="lead">Find where to go when on the go.</template>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      posErr: false,
      posIsReady: false,
      address: '',
    };
  },
  methods: {},
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html {
  background-color: #222;
}
.home {
  width: 100vw;
  height: 600px;
  /* background-color: #222;
  z-index: -103; */
}
.jumbotron {
  position: relative;
  height: 100vh;
  width: 100vw;
  background-color: #222;
  z-index: -101;
  color: white;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.521);
}
.video-background,
.pic-background {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  z-index: -1;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
