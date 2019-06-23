<template>
  <div class="add-comment">
    <h3>Add a Review</h3>

    <b-form>
      <b-form-group id="input-group-1" label="Subject:" label-for="input-1">
        <b-form-input
          id="input-1"
          type="text"
          name="subject"
          placeholder="subject"
          v-model="subject"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Comment:" label-for="input-2">
        <b-form-textarea
          id="input-2"
          type="text"
          name="text"
          placeholder="What do you think about this location?"
          v-model="text"
          rows="3"
          max-rows="6"
          required
        ></b-form-textarea>
      </b-form-group>

      <b-button @click.prevent="addComment">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import PlacesServices from '../services/PlacesService';
export default {
  name: 'add-comment',
  data() {
    return {
      subject: '',
      text: '',
    };
  },
  props: {
    bathroomId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    async addComment() {
      try {
        const { data } = await PlacesServices.addComment({
          title: this.subject,
          body: this.text,
          userId: this.$store.state.user.id,
          placeId: this.bathroomId,
        });

        this.$store.dispatch('addComment', data);
      } catch (error) {
        console.error(error);
        let toastConfig = {
          variant: 'danger',
          title: 'Error posting comment',
          message: error.response.data,
        };
        this.$bvToast.toast(toastConfig.message, toastConfig);
      }
    },
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