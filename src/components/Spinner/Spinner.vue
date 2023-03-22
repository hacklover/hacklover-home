<template>
  <div :class="['hacklover-home__spinner-container', {'hacklover-home__spinner-container--active': props.active}]">
    <div class="hacklover-home__spinner__inner" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  active: Boolean
})
</script>

<style scoped lang="scss">
.hacklover-home__spinner {
  &-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: opacity 0.2s ease-in-out;
    opacity: 0;

    &--active {
      opacity: 1;
    }
  }
  &__inner {
    border: 5px solid #666;
    border-radius: 50%;
    border-top: 5px solid #333;
    width: 48px;
    height: 48px;
    animation: spin 2s linear infinite;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>