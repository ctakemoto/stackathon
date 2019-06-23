<template>
  <b-container class="bathroom">
    <b-card class="text-center mb-2 single-bathroom" :title="bathroom.name" tag="article">
      <b-card-text>{{bathroom.address}}</b-card-text>
      <b-button :to="{ name: 'bathroom-detail', params: { id: bathroom.id }}">More Info</b-button>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: 'bathroom',
  props: ['bathroom'],
};
</script>

<style scoped>
.single-bathroom {
  max-width: 350px;
  margin: 10px 0;
  height: 300px;
}
</style>