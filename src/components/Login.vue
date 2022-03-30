<template>
  <div>
    <Modal ref="refLoginModal" :closable="false">
      <div class="content-login">
        <h2>Login or register</h2>

        <div class="field">
          <input type="test" placeholder="Username" v-model="username">
        </div>

        <div class="field">
          <input type="password" placeholder="Password" v-model="password">
        </div>

        <div class="buttons">
          <button class="primary" @click="loginClicked()">Login</button>
        </div>

        <div>
          <a href="#" @click="$root.$emit('show-about');">About Qpass</a>
        </div>
      </div>
    </Modal>

    <Modal ref="refRegistrationModal">
      <div class="content-registration">
        <h2>Registration</h2>

        <p>
          User with such username and password is not found.
          Click 'Register me' to register a new user or
          'Cancel' to enter different credentials.
        </p>

        <div class="buttons">
          <button class="primary" @click="authorize()">Register me</button>
          &nbsp;
          <button class="secondary" @click="$refs['refRegistrationModal'].hide()">Cancel</button>
        </div>
      </div>
    </Modal>

    <ErrorDialog ref="refErrorDialog" message="Username or password is empty" />
  </div>
</template>

<script>
  import Modal from './Modal.vue'
  import ErrorDialog from './ErrorDialog.vue'

  export default {
    components: {
      Modal,
      ErrorDialog,
    },
    data() {
      return {
        username: "",
        password: "",
      }
    },
    methods: {
      show() {
        this.$refs['refLoginModal'].show()
      },

      async loginClicked() {
        if ((this.username != "") && (this.password != "")) {
          // Create profile object
          const profile = this.$hscm.hsc.Profile.new(
            this.$hscm.appIdString, this.username, this.password
          )

          // Request for groups
          const groups = await this.$hscm.api.getGroups(profile.publicKey())

          // If groups found
          if (groups.length) {
            // Authorize and reload the page
            this.authorize()
          } else {
            // Show register modal
            this.$refs['refRegistrationModal'].show()
          }
        } else {
          this.$refs['refErrorDialog'].show()
        }
      },

      authorize() {
        this.$hscm.authorize(this.username, this.password)
        window.location.reload()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .content-login {
    padding: 1rem;
    text-align: center;
    width: min(100vw, 512px);

    h2 {
      margin-top: 0;
    }

    .field {
      padding: 0.25rem 0;

      input {
        padding: 0.5rem;
        outline: none;
        border: 1px solid $color-primary;
        font-size: 1rem;

        &:focus {
          outline: 1px solid $color-primary;
        }
      }
    }

    .buttons {
      padding: 0.5rem 0;
    }
  }

  .content-registration {
    padding: 1rem;
    text-align: center;
    width: min(100vw, 384px);

    h2 {
      margin-top: 0;
    }

    .buttons {
      padding: 0.5rem 0;
    }
  }
</style>
