<template>
  <div class="hacklover-home__main hacklover-home__main--about">
    <hr class="my-8"/>

    <blockquote class="notranslate">
      <div v-html="md.render(page.about.description)" />
    </blockquote>

    <div class="mt-3">

      <v-btn
        color="#333"
        class="mx-2"
        @click="emit('return')"
        v-text="page.back?.text ?? 'Go back'"
      />

      <ButtonSmall
        v-for="(item, i) of page.about?.buttons"
        :key="`about-btn-${i}`"
        class="text-white"
        :href="item.href"
        :target="item.target"
        :color="item.color"
        :colorHover="item.colorHover"
        :class="item.class"
        :icon="item.icon"
      />

    </div>
  </div>
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it/dist/markdown-it.min.js'
import mila from 'markdown-it-link-attributes/dist/markdown-it-link-attributes.min.js'

const emit = defineEmits(['return'])

const props = defineProps({
  page: Object as () => Page
})

const md = new MarkdownIt()

md.use(mila, {
  attrs: {
    target: '_blank',
    rel: 'noopener'
  }
})
</script>

<style scoped lang="scss">

</style>