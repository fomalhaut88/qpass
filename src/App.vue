<template>
  <div id="app">
    <Header />
    <PwdList />
    <Login ref="refLogin" />
    <About ref="refAbout" />
    <WorkspacesEditor ref="refWorkspacesEditor" />
  </div>
</template>

<script>
  import Header from './components/Header.vue'
  import PwdList from './components/PwdList.vue'
  import Login from './components/Login.vue'
  import About from './components/About.vue'
  import WorkspacesEditor from './components/WorkspacesEditor.vue'

  export default {
    name: 'App',
    components: {
      Header,
      PwdList,
      Login,
      About,
      WorkspacesEditor,
    },
    mounted() {
      this.$root.$on('appstate-updated', async () => {
        // Encrypt the appstate data
        const encrypted = this.$appstate.encrypt(this.$hscm.profile.privateKey())

        // Set encrupted data bo block
        this.$hscm.block.setData(encrypted)

        // Save block
        await this.$hscm.block.save(this.$hscm.api, this.$hscm.profile)
      })

      this.$root.$on('show-about', () => {
        this.$refs['refAbout'].show()
      })

      this.$root.$on('show-workspaces-editor', () => {
        this.$refs['refWorkspacesEditor'].show()
      })

      this.$root.$on('show-login', () => {
        this.$refs['refLogin'].show()
      })
    },
  }
</script>

<style>
  body {
    margin: 0;
    font-family: Helvetica, sans-serif;
    overflow-x: hidden;
  }
</style>
