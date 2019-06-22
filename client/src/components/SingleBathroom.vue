<template>
  <div class="bathroom">
    <b-card class="text-center mb-2" :title="bathroom.name" tag="article">
      <b-card-text>{{bathroom.address}}</b-card-text>
      <b-button :to="{ name: 'bathroom-detail', params: { id: bathroom.id }}">More Info</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'bathroom',
  props: ['bathroom'],
};
</script>

<style scoped>
.bathroom b-card {
  max-width: 20rem;
  margin: 10px;
}
</style>