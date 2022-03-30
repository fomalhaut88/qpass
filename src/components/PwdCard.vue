<template>
  <div class="pwd-card" @click="$emit('click')">
    <div class="title">{{ name }}</div>
    <div class="stat">
      <div>Fields: {{ fieldsCount }}</div>
      <div>Passwords: {{ pwdFieldsCount }}</div>
    </div>
    <div class="comment">{{ comment }}</div>
  </div>
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        required: true,
      },
      fieldsCount: {
        type: Number,
        default: 0,
      },
      pwdFieldsCount: {
        type: Number,
        default: 0,
      },
      comment: {
        type: String,
        default: "",
      },
    },
  }
</script>

<style lang="scss" scoped>
  .pwd-card {
    border: 2px solid $color-primary;
    border-radius: 0.375rem;
    display: inline-block;
    width: min(100% - 2.5rem - 4px, 384px);
    margin: 0.5rem 0.25rem 0 0.25rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    height: 4rem;
    float: left;

    &:hover {
      background-color: #f8f8f8;
    }

    &:active {
      background-color: #f0f0f0;
    }

    .title {
      font-weight: bold;
    }

    .stat {
      display: flex;
      justify-content: space-between;
      color: $color-muted;
      font-size: 0.875rem;
      line-height: 1.5;
    }

    .comment {
      line-height: 1.5;
    }
  }
</style>
