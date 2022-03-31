<template>
  <Modal class="about" ref="refAboutModal" :closable="false">
    <div>
      <h2>About Qpass</h2>

      <p>
        Qpass is an application that helps you keep your passwords safely using
        all the advantages of cloud services: accessibility from different
        devices, that is impossible to achieve by device-based applications
        like KeePass. The core idea is that Qpass manages passwords
        on the client side only and transfers them in the encrypted way
        to the cloud where they are saved without decrypting and
        any modifications. So on the server side all the data are encrypted
        and cannot be revealed, stolen, modified or even replaced by anyone
        (because of the ECDSA signature).
      </p>

      <p>
        Qpass uses Hashstorage instance as backend that provides all the
        utilities. For details follow:
        <a href="https://github.com/fomalhaut88/hashstorage" target="blank">
          https://github.com/fomalhaut88/hashstorage
        </a>
      </p>

      <p>
        Source code of Qpass:
        <a href="https://github.com/fomalhaut88/qpass" target="blank">
          https://github.com/fomalhaut88/qpass
        </a>
      </p>

      <p>
        Copyright: Alexander Khlebushchev
        <a href="https://fomalhaut.su/" target="blank">https://fomalhaut.su/</a>
      </p>

      <br>

      <button class="primary" @click="$refs['refAboutModal'].hide()">OK</button>
    </div>
  </Modal>
</template>

<script>
  import Modal from './Modal.vue'

  export default {
    components: {
      Modal,
    },
    methods: {
      show() {
        this.$refs['refAboutModal'].show()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .about {
    div {
      padding: 2rem;
      width: calc(min(100vw - 2rem, 768px));
      text-align: justify;

      h2 {
        margin-top: 0;
        text-align: center;
      }

      p {
        text-align: left;
        line-height: 1.375;
      }

      button {
        margin: 0 auto;
        display: block;
      }
    }
  }
</style>
