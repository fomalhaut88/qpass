<template>
  <div class="modal" :class="{hidden: !isShown}">
    <div class="back" :class="{active: isActive}" @click="outsideClick()"></div>
    <div class="container" :class="{active: isActive}"><slot></slot></div>
  </div>
</template>

<script>
  export default {
    props: {
      closable: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        isShown: false,
        isActive: false,
      }
    },
    methods: {
      show() {
        this.isShown = true
        setTimeout(() => {
          this.isActive = true
        }, 0)
      },

      hide() {
        this.isActive = false
        setTimeout(() => {
          this.isShown = false
        }, 250)
      },

      outsideClick() {
        if (this.closable) {
          this.hide()
        }
      },
    },
    mounted() {
      document.addEventListener("keydown", (e) => {
        // Esc clicked
        if (e.keyCode == 27) {
          this.outsideClick()
        }
      })
    },
  }
</script>

<style lang="scss" scoped>
  .modal {
    position: fixed;
    display: block;
    transform: translate(0%, 0%);

    margin: auto;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    .back {
      position: absolute;
      width: 100%;
      height: 100vh;
      background-color: black;
      cursor: default;

      transition: 0.25s;
      opacity: 0.0;

      &.active {
        opacity: 0.875;
      }
    }

    .container {
      position: relative;
      transform: translateX(calc(50vw - 50%))
                 translateY(max(50vh - 50%, 0px));

      transition: 0.25s;
      opacity: 0;

      &.active {
        opacity: 1;
      }

      display: inline-block;
      background-color: white;
      border-radius: 4px;
      color: black;
      z-index: 2;
      cursor: default;
      font-size: 1rem;
    }
  }
</style>
