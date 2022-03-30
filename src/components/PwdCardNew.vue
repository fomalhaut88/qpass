<template>
  <div class="pwd-card-new" @click="$emit('click')">
    <div><font-awesome-icon icon="fas fa-plus" size="2x" /></div>
  </div>
</template>

<style lang="scss" scoped>
  .pwd-card-new {
    border: 2px solid $color-primary;
    border-radius: 0.375rem;
    display: inline-block;
    width: min(100% - 2.5rem - 4px, 384px);
    margin: 0.5rem 0.25rem 0 0.25rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    height: 4rem;
    float: left;

    text-align: center;
    color: $color-primary;

    &:hover {
      background-color: #f8f8f8;
    }

    &:active {
      background-color: #f0f0f0;
    }

    & > div {
      line-height: 4.75;
    }
  }
</style>
