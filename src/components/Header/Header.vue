<template>
  <header class="hacklover-home__header">
    <h1 class="notranslate" v-text="title" />
    <p v-text="description" />
  </header>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: "hacklover-home"
  },
  description: {
    type: String,
    default: "Your new minimal starter page"
  }
})
</script>

<style scoped lang="scss">
header {
  width: 550px;
  max-width: 90vw;
  margin: 0 auto;
  text-align: center;
  cursor: default;

  h1 {
    font-weight: 500;
    font-size: 27px;
    line-height: 24px;
  }

  p {
    font-size: 16px;
    margin-top: 10px;
  }

  ::selection {
    background: #000;
  }

  ::-moz-selection {
    background: #000;
  }
}
</style>