<template>
  <div class="hacklover-home__main hacklover-home__main--front">
    <div class="hacklover-home__links">
      <ButtonLarge
        v-for="(item, i) of page.links"
        :key="`links-btn-${i}`"
        :href="item.href"
        :target="item.target"
        :color="item.color"
        :class="item.class"
        :icon="item.icon"
      />
    </div>

    <hr class="mt-8 mb-6" />

    <div>
      <v-btn
        tile color="#333" class="mx-1 my-2 pa-0 btn-info text-grey" min-width="36"
        @click="emit('about')"
      >
        <v-icon :size="20">mdi-information-variant</v-icon>
      </v-btn>

      <ButtonSmall
        v-for="(item, i) of page.footer?.buttons"
        :key="`footer-btn-${i}`"
        class="text-grey"
        :url="item.url"
        :color="item.color"
        :class-name="item.class"
        :icon-name="item.icon.name"
        :icon-size="item.icon.size"
        :icon-style="item.icon.style"
      />

      <v-btn
        v-if="page.footer.action"
        color="#333" class="ma-2 mx-1" large
        v-text="page.footer.action.text"
        @click="emit('action', page.footer.action.href)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonLarge from "components/Button/ButtonLarge.vue";
import ButtonSmall from "components/Button/ButtonSmall.vue";

const emit = defineEmits(['about', 'action'])

const props = defineProps({
  page: Object as () => Page
})
</script>

<style scoped lang="scss">

</style>