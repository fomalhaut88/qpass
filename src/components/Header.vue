<template>
  <div class="header">
    <!-- <div class="brand">Qpass</div> -->
    <div>{{ getTitle() }}</div>
    <div class="menu" @click="$refs['refMenu'].show()">
      <font-awesome-icon icon="fas fa-bars" fixed-width />
    </div>

    <Menu ref="refMenu" />
  </div>
</template>

<script>
  import Menu from './Menu.vue'

  export default {
    components: {
      Menu,
    },
    methods: {
      getTitle() {
        return (this.$appstate.isReady() ?
                this.$appstate.workspaceName(this.$appstate.activeWorkspaceId) :
                "Workspace")
      },
    },
    mounted() {
      // Listen to workspace change
      this.$root.$on('workspace-changed', () => {
        this.$forceUpdate()
      })
    },
  }
</script>

<style lang="scss" scoped>
  .header {
    background-color: $color-primary;
    padding: 1rem;
    display: flex;
    justify-content: space-between;

    div {
      display: inline-block;
      font-size: 1.5rem;
      color:  white;
    }

    .brand {
      font-style: italic;
    }

    .menu {
      cursor: pointer;
    }
  }
</style>
