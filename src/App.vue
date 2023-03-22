<template>
  <Home />
</template>

<script setup>
import {onBeforeMount} from "vue";
import {useStore} from "vuex";

import configMain from 'config/main.json'
import configPage from 'config/page.json'

import Home from '@/home/Home.vue'

const store = useStore()

onBeforeMount(() => {
  // load page configuration
  store.dispatch('home/initialize', {
    config: configMain,
    page: configPage
  })
})
</script>