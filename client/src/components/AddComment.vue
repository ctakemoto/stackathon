<template>
  <div class="add-comment">
    <h3>Add a Review</h3>

    <b-form>
      <b-form-group id="input-group-1" label="Subject:" label-for="input-1">
        <b-form-input
          id="input-1"
          type="subject"
          name="subject"
          placeholder="subject"
          v-model="subject"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Comment:" label-for="input-2">
        <b-form-textarea
          id="input-2"
          type="comment"
          name="comment"
          placeholder="What do you think about this location?"
          v-model="comment"
          rows="3"
          max-rows="6"
          required
        ></b-form-textarea>
      </b-form-group>

      <b-button @click.prevent="addComment">Login</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'add-comment',
  data() {
    return {
      subject: '',
      comment: '',
    };
  },
  methods: {
    addComment() {},
  },
};
</script>

<style scoped>
.add-comment {
  width: 80%;
  margin: 10px auto;
}
.add-comment form {
  text-align: left;
  border: 1px solid #c2c2c2;
  padding: 10px;
  border-radius: 10px;
}
</style>