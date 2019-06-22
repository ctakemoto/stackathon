<template>
  <b-navbar id="footer-bottom" fixed="bottom" align="center">
    <b-nav-text class="credit">
      Icons made by
      <a
        href="https://www.flaticon.com/authors/simpleicon"
        title="SimpleIcon"
      >SimpleIcon</a> from
      <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by
      <a
        href="http://creativecommons.org/licenses/by/3.0/"
        title="Creative Commons BY 3.0"
        target="_blank"
      >CC 3.0 BY</a>
    </b-nav-text>
  </b-navbar>
</template>

<script>
export default {
  name: 'footer-bottom',
};
</script>

<style scoped>
#footer-bottom {
  height: 100px;
  background-color: rgb(102, 161, 219);
}
.credit {
  font-size: 10px;
}
</style>