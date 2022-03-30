import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas, far)
Vue.component('font-awesome-icon', FontAwesomeIcon)

import { AppState } from './appstate.js'
import { HscManager } from './hscmanager.js'
import config from './config.js'
import App from './App.vue'

Vue.config.productionTip = false
Vue.prototype.$appstate = new AppState()
Vue.prototype.$hscm = new HscManager(config.hashstorage_root, config.app_id)

new Vue({
  render: h => h(App),
  async beforeCreate() {
    // Initialize hashstorage client manager
    await this.$hscm.initialize()

    // Prepare appstate
    if (this.$hscm.isAuthorized()) {
      await this.$hscm.prepareAppstate(this.$appstate)
      this.$root.$emit('workspace-changed')
    } else {
      this.$root.$emit('show-login')
    }
  },
}).$mount('#app')
