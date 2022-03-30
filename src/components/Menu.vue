<template>
  <div class="menu" :class="{hidden: !isShown}">
    <div class="back" :class="{active: isActive}" @click="hide()"></div>

    <div class="container" :class="{active: isActive}">
      <div class="title">
        QPASS
      </div>

      <hr>

      <div class="item" v-for="wks in listWorkspaces()" :key="wks.id" @click="changeWorkspace(wks.id)">
        <font-awesome-icon icon="fas fa-check" fixed-width v-if="wks.isActive" />
        <div class="blank-icon" v-else></div>
        {{ wks.name }}
      </div>

      <hr>

      <div class="item" @click="$root.$emit('show-workspaces-editor'); hide();">
        <font-awesome-icon icon="fas fa-list" fixed-width />
        Workspaces
      </div>
      <!-- <div class="item">
        <font-awesome-icon icon="fas fa-upload" fixed-width />
        Export
      </div>
      <div class="item">
        <font-awesome-icon icon="fas fa-download" fixed-width />
        Import
      </div> -->
      <div class="item" @click="$root.$emit('show-about'); hide();">
        <font-awesome-icon icon="fas fa-info" fixed-width />
        About Qpass
      </div>
      <!-- <div class="item">
        <font-awesome-icon icon="fas fa-cog" fixed-width />
        Settings
      </div> -->
      <div class="item" @click="$refs['refLogoutConfirm'].show()">
        <font-awesome-icon icon="fas fa-sign-out" fixed-width />
        Log out
      </div>
    </div>

    <ConfirmDialog ref="refLogoutConfirm" message="Are you sure you want to log out?" :callback="logout" style="z-index: 3;" />
  </div>
</template>

<script>
  import ConfirmDialog from './ConfirmDialog.vue'

  export default {
    components: {
      ConfirmDialog,
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

      listWorkspaces() {
        const result = []
        if (this.$appstate.isReady()) {
          for (const wksId of this.$appstate.workspaces()) {
            result.push({
              id: wksId,
              name: this.$appstate.workspaceName(wksId),
              isActive: wksId == this.$appstate.activeWorkspaceId
            })
          }
        }
        return result
      },

      changeWorkspace(wksId) {
        // Change workspace in $appstate object
        this.$appstate.setActiveWorkspace(wksId)

        // Update active workspace in menu
        this.$forceUpdate()

        // Send event to PwdList component to update the displayed items
        this.$root.$emit('workspace-changed')
      },

      logout() {
        this.$hscm.unauthorize()
        window.location.reload()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .menu {
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;

    .back {
      position: absolute;
      width: 100%;
      height: 100vh;
      background-color: black;
      cursor: default;

      transition: 0.25s;
      opacity: 0;

      &.active {
        opacity: 0.875;
      }
    }

    .container {
      position: absolute;
      right: 0;
      width: calc(min(80%, 256px));
      height: 100vh;
      background-color: white;
      color: black;
      z-index: 2;
      cursor: default;
      font-size: 1.25rem;

      transform: translateX(100%);
      transition: 0.25s;

      &.active {
        transform: translateX(0);
      }

      .title {
        padding: 1rem 0 0.25rem 3.75rem;
        font-weight: bold;
      }

      .item {
        padding: 0.5rem 2rem;
        cursor: pointer;
        color: darken($color-link, 20%);

        &:hover {
          text-decoration: underline;
          color: darken($color-link, 10%);
        }

        .blank-icon {
          display: inline-block;
          width: 25px;
        }
      }
    }
  }
</style>
