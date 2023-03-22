<template>
  <v-btn
    :width="60"
    :height="60"
  >
    <v-icon :size="icon.size" :style="icon.style">
      {{ icon.name }}
    </v-icon>
  </v-btn>
</template>

<script setup lang="ts">
const props = defineProps({
  icon: Object as () => PageButtonIcon,
})
</script>