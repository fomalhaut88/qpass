<template>
  <Modal ref="refConfirmDialogModal" class="confirm-dialog">
    <div class="content">
      <h2>Confirmation</h2>
      <p>{{ message }}</p>
      <div>
        <button class="danger" @click="clickYes()">Yes</button>
        &nbsp;
        <button class="secondary" @click="hide()">No</button>
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
      callback: {
        type: Function,
        required: true,
      },
    },
    methods: {
      show() {
        this.$refs['refConfirmDialogModal'].show()
      },

      hide() {
        this.$refs['refConfirmDialogModal'].hide()
      },

      clickYes() {
        this.callback()
        this.hide()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .confirm-dialog {
    .content {
      padding: 2rem;
      text-align: center;
      width: min(256px, 100vw);

      h2 {
        color: $color-danger;
        margin: 0;
      }
    }
  }
</style>
