<template>
  <div>
    <Modal ref="refWorkspacesEditorModal">
      <div class="content">
        <h2>Workspaces</h2>

        <div class="workspaces">
          <div class="item" v-for="wks in workspaces" :key="wks.id">
            <span>[id={{ wks.id }}]</span>
            &nbsp;
            <a href="#" @click="editWorkspaceClicked(wks)">{{ wks.name }}</a>
          </div>
          <div class="item">
            <a href="#" @click="addWorkspaceClicked()">
              <font-awesome-icon icon="fas fa-plus" fixed-width />
              Workspace
            </a>
          </div>
        </div>

        <br>
        <br>

        <div class="buttons">
          <button class="primary" @click="hide()">OK</button>
        </div>
      </div>
    </Modal>

    <Modal ref="refWorkspaceEdit">
      <div class="content-edit">
        <h2>{{ (editId === null) ? 'Add' : 'Edit' }} workspace</h2>

        <div class="field">
          <input type="text" v-model="editName">
        </div>

        <div class="buttons" v-if="editId === null">
          <button class="primary" @click="addClicked()">Add</button>
          &nbsp;
          <button class="secondary" @click="$refs['refWorkspaceEdit'].hide()">Cancel</button>
        </div>
        <div class="buttons" v-else>
          <button class="primary" @click="saveClicked()">Save</button>
          &nbsp;
          <button class="danger" @click="$refs['refConfirmDelete'].show()">Delete</button>
          &nbsp;
          <button class="secondary" @click="$refs['refWorkspaceEdit'].hide()">Cancel</button>
        </div>
      </div>
    </Modal>

    <ErrorDialog ref="refErrorMessage" message="Name is empty" />
    <ConfirmDialog ref="refConfirmDelete"
                   message="Are you sure you want to delete the workspace?
                            All related data will be removed permanently."
                   :callback="deleteClicked" />
  </div>
</template>

<script>
  import Modal from './Modal.vue'
  import ErrorDialog from './ErrorDialog.vue'
  import ConfirmDialog from './ConfirmDialog.vue'

  export default {
    components: {
      Modal,
      ErrorDialog,
      ConfirmDialog,
    },
    data() {
      return {
        workspaces: null,
        editId: null,
        editName: "",
      }
    },
    methods: {
      show() {
        this.$refs['refWorkspacesEditorModal'].show()
      },

      hide() {
        this.$refs['refWorkspacesEditorModal'].hide()
      },

      listWorkspaces() {
        const result = []
        for (const wksId of this.$appstate.workspaces()) {
          result.push({
            id: wksId,
            name: this.$appstate.workspaceName(wksId),
          })
        }
        return result.sort(
          (a, b) => (a.name > b.name) ? 1 : ((a.name == b.name) ? 0 : -1)
        )
      },

      reload() {
        if (this.$appstate.isReady()) {
          this.workspaces = this.listWorkspaces()
        }
      },

      addWorkspaceClicked() {
        this.editId = null
        this.editName = ""
        this.$refs['refWorkspaceEdit'].show()
      },

      editWorkspaceClicked(wks) {
        this.editId = wks.id
        this.editName = wks.name
        this.$refs['refWorkspaceEdit'].show()
      },

      addClicked() {
        if (this.editName == "") {
          this.$refs['refErrorMessage'].show()
        } else {
          this.$appstate.addWorkspace(this.editName)
          this.$root.$emit('workspace-changed')
          this.$root.$emit('appstate-updated')
          this.reload()
          this.$refs['refWorkspaceEdit'].hide()
        }
      },

      saveClicked() {
        if (this.editName == "") {
          this.$refs['refErrorMessage'].show()
        } else {
          this.$appstate.setWorkspaceName(this.editId, this.editName)
          this.$root.$emit('workspace-changed')
          this.$root.$emit('appstate-updated')
          this.reload()
          this.$refs['refWorkspaceEdit'].hide()
        }
      },

      deleteClicked() {
        this.$appstate.removeWorkspace(this.editId)
        this.$root.$emit('workspace-changed')
        this.$root.$emit('appstate-updated')
        this.reload()
        this.$refs['refWorkspaceEdit'].hide()
      },
    },
    mounted() {
      this.reload()

      // Listen to workspace change
      this.$root.$on('workspace-changed', () => {
        this.reload()
      })
    },
  }
</script>

<style lang="scss" scoped>
  .content {
    width: min(100vw - 2rem, 512px);
    padding: 2rem;
    text-align: center;

    h2 {
      margin-top: 0;
      text-align: center;
    }

    .workspaces {
      display: inline-block;
      text-align: left;

      .item {
        padding: 0.25rem 1rem;

        span {
          font-size: 1.125rem;
          color: $color-secondary;
        }

        a {
          font-size: 1.25rem;
          text-decoration: none;
        }

        input {
          border: none;
          outline: none;
          width: 200px;
          font-size: 1.25rem;
          font-weight: bold;

          &:focus {
            outline: 2px solid $color-muted;
          }
        }
      }
    }

    .buttons {
      text-align: center;
    }
  }

  .content-edit {
    width: min(100vw - 2rem, 384px);
    padding: 2rem;
    text-align: center;

    h2 {
      margin-top: 0;
      text-align: center;
    }

    .field {
      padding: 0 0.5rem 1rem 0.5rem;

      input {
        font-size: 1.25rem;
        font-weight: bold;
        border: 1px solid $color-muted;
        outline: none;

        &:focus {
          outline: 2px solid $color-muted;
        }
      }
    }
  }
</style>
