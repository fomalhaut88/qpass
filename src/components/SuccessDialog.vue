<template>
  <Modal ref="refSuccessDialogModal" class="success-dialog">
    <div class="content">
      <h2>Success</h2>
      <p>{{ message }}</p>
      <div>
        <button class="success" @click="hide()">OK</button>
      </div>
    </div>
  </Modal>
</template>

<script>
  import Modal from './Modal.vue'

  export default {
    components: {
      Modal,
    },
    props: {
      message: {
        type: String,
        required: true,
      },
    },
    methods: {
      show() {
        this.$refs['refSuccessDialogModal'].show()
      },

      hide() {
        this.$refs['refSuccessDialogModal'].hide()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .success-dialog {
    .content {
      padding: 2rem;
      text-align: center;
      width: min(256px, 100vw);

      h2 {
        color: $color-success;
        margin: 0;
      }
    }
  }
</style>
