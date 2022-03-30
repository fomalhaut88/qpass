<template>
  <div class="pwd-list">
    <PwdCardNew @click="$refs['refPwdEditor'].open()" />

    <PwdCard v-for="(item, idx) in items" :key="idx"
             :name="item.name" :comment="item.comment"
             :fieldsCount="item.fields.length"
             :pwdFieldsCount="item.fields.filter(f => f.hidden).length"
             @click="$refs['refPwdEditor'].open(item, idx)" />

    <PwdEditor ref="refPwdEditor"
               :createItemHandler="createItemHandler"
               :saveItemHandler="saveItemHandler"
               :deleteItemHandler="deleteItemHandler" />
  </div>
</template>

<script>
  import PwdCard from './PwdCard.vue'
  import PwdCardNew from './PwdCardNew.vue'
  import PwdEditor from './PwdEditor.vue'

  export default {
    components: {
      PwdCard,
      PwdCardNew,
      PwdEditor,
    },
    data() {
      return {
        items: null,
      }
    },
    methods: {
      createItemHandler(item) {
        this.items.push(item)
        this.$root.$emit('appstate-updated')
      },

      saveItemHandler(item, idx) {
        this.items[idx] = item
        this.$root.$emit('appstate-updated')
        this.$forceUpdate()
      },

      deleteItemHandler(idx) {
        this.items.splice(idx, 1)
        this.$root.$emit('appstate-updated')
      },

      updateItems() {
        if (this.$appstate.isReady()) {
          this.items = this.$appstate.activeItems()
        }
      },
    },
    mounted() {
      // Listen to workspace change
      this.$root.$on('workspace-changed', () => {
        this.updateItems()
      })
    },
  }
</script>
