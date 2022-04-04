<template>
  <div>
    <Modal class="pwd-editor" ref="refPwdEditorModal" :closable="true">
      <div class="content">
        <div class="title">
          <input type="text" placeholder="Enter title" v-model="name">
        </div>

        <br>

        <div class="field" v-for="(field, idx) in fields" :key="idx">
          <div class="field-key">
            <input type="text" placeholder="Field" v-model="field.key"
                   @blur="editFieldBlurred(idx)" ref="refFieldKey">
          </div>
          <div class="field-value">
            <input :type="field.hidden ? 'password' : 'text'"
                   placeholder="Value" v-model="field.value"
                   autocomplete="off">
            &nbsp;
            <font-awesome-icon :icon="['fas', field.hidden ? 'fa-eye-slash' : 'fa-eye']"
                               class="eye-icon"
                               fixed-width size="1x" @click="toggleHidden(field)" />
            &nbsp;
            <font-awesome-icon icon="far fa-clone"
                               class="copy-icon"
                               fixed-width
                               @click="copyToClipboard(field.value)" />
          </div>
        </div>

        <div class="field">
          <div class="field-key">
            <input type="text" placeholder="+ Field" v-model="addFieldModel"
                   @keyup.stop="addFieldChanged()">
          </div>
          <div class="field-value">
          </div>
        </div>

        <br>

        <div class="comment">
          <textarea placeholder="Comment" v-model="comment"></textarea>
        </div>

        <br>

        <div class="buttons" v-if="index !== null">
          <button class="primary" @click="saveClicked()">Save</button>
          &nbsp;
          <button class="danger" @click="$refs['refConfirmDelete'].show()">Delete</button>
          &nbsp;
          <button class="secondary" @click="close()">Close</button>
        </div>
        <div class="buttons" v-else>
          <button class="primary" @click="createClicked()">Create</button>
          &nbsp;
          <button class="secondary" @click="close()">Close</button>
        </div>
      </div>
    </Modal>

    <ConfirmDialog ref="refConfirmDelete"
                   message="Are you sure you want to delete the item?"
                   :callback="performDelete" />
    <ErrorDialog ref="refErrorMessage"
                 message="Name is empty" />
    <SuccessDialog ref="refSuccessMessage"
                   message="Updated successfully" />
  </div>
</template>

<script>
  import Modal from './Modal.vue'
  import ConfirmDialog from './ConfirmDialog.vue'
  import ErrorDialog from './ErrorDialog.vue'
  import SuccessDialog from './SuccessDialog.vue'

  export default {
    components: {
      Modal,
      ConfirmDialog,
      ErrorDialog,
      SuccessDialog,
    },
    props: {
      createItemHandler: Function,
      saveItemHandler: Function,
      deleteItemHandler: Function,
    },
    data() {
      return {
        index: null,
        name: "",
        comment: "",
        fields: [],
        addFieldModel: "",
      }
    },
    methods: {
      open(item, idx) {
        if ((idx !== null) && (idx !== undefined)) {
          this.index = idx
          this.name = item.name
          this.comment = item.comment
          this.fields = JSON.parse(JSON.stringify(item.fields))
        } else {
          this.index = null
          this.name = ""
          this.comment = ""
          this.fields = []
        }
        this.$refs['refPwdEditorModal'].show()
      },

      close() {
        this.$refs['refPwdEditorModal'].hide()
      },

      toggleHidden(field) {
        field.hidden = !field.hidden
      },

      async copyToClipboard(value) {
        await navigator.clipboard.writeText(value)
      },

      addFieldChanged() {
        if (this.addFieldModel != "") {
          const length = this.fields.push({
            key: this.addFieldModel,
            value: "",
            hidden: false,
          })

          this.$nextTick(() => {
            this.addFieldModel = ""
            this.$refs['refFieldKey'][length - 1].focus()
          })
        }
      },

      editFieldBlurred(idx) {
        if (this.fields[idx].key == "") {
          this.fields.splice(idx, 1)
          if (idx < this.fields.length) {
            this.$refs['refFieldKey'][idx].blur()
          }
        }
      },

      createClicked() {
        if (this.name == "") {
          this.$refs['refErrorMessage'].show()
        } else {
          this.performCreate()
        }
      },

      saveClicked() {
        if (this.name == "") {
          this.$refs['refErrorMessage'].show()
        } else {
          this.performSave()
        }
      },

      toItem() {
        return {
          name: this.name,
          comment: this.comment,
          fields: JSON.parse(JSON.stringify(this.fields)),
        }
      },

      performCreate() {
        this.createItemHandler(this.toItem())
        this.$refs['refSuccessMessage'].show()
        this.close()  // TODO: Or focus to the created item?
      },

      performSave() {
        this.saveItemHandler(this.toItem(), this.index)
        this.$refs['refSuccessMessage'].show()
      },

      performDelete() {
        this.deleteItemHandler(this.index)
        this.$refs['refSuccessMessage'].show()
        this.close()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .pwd-editor {
    .content {
      padding: 2rem;
      width: min(100vw - 2rem, 512px);

      input {
        border: none;
      }

      .title {
        input {
          width: 100%;
          font-size: 1.5rem;
          font-weight: bold;

          &:focus {
            outline: 2px solid $color-muted;
          }
        }
      }

      .field {
        padding: 0.5rem 0;

        & > div {
          padding: 0.125rem 0;
        }

        .field-key input {
          font-weight: bold;
        }

        @media (min-width: $media-min-width) {
          display: flex;
          justify-content: space-between;
          padding: 0;
        }

        input[type="text"], input[type="password"] {
          font-size: 1rem;
          width: 200px;

          &:focus {
            outline: 2px solid $color-muted;
          }
        }

        .copy-icon {
          color: $color-muted;
          cursor: pointer;

          &:active {
            color: black;
          }
        }

        .eye-icon {
          color: $color-muted;
          cursor: pointer;
        }
      }

      .comment {
        textarea {
          width: calc(100% - 4px);
          border: 1px solid $color-muted;
          resize: vertical;
          height: 4rem;
          outline: none;

          &:focus {
            outline: 2px solid $color-muted;
          }
        }
      }

      .buttons {
        text-align: center;
      }
    }
  }
</style>
