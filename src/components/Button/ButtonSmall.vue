<template>
  <v-btn
    tile
    :min-width="36"
    class="mx-1 my-2 pa-0"
    :onmouseover="`this.style.background='${colorHover}'`"
    :onmouseout="`this.style.background='${color}'`"
  >
    <v-icon :size="icon.size" :style="icon.style">
      {{ icon.name }}
    </v-icon>
  </v-btn>
</template>

<script setup lang="ts">
const props = defineProps({
  url: String,
  color: String,
  colorHover: String,
  icon: Object as () => PageButtonIcon,
})
</script>

<style scoped lang="scss">
.v-btn {
  transition: background 0.28s ease-in-out;
}
</style>