<template>
  <Modal ref="refErrorDialogModal" class="error-dialog">
    <div class="content">
      <h2>Error</h2>
      <p>{{ message }}</p>
      <div>
        <button class="danger" @click="hide()">OK</button>
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
        this.$refs['refErrorDialogModal'].show()
      },

      hide() {
        this.$refs['refErrorDialogModal'].hide()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .error-dialog {
    .content {
      padding: 1rem;
      text-align: center;
      width: min(256px, 100vw);

      h2 {
        color: $color-danger;
        margin: 0;
      }
    }
  }
</style>
