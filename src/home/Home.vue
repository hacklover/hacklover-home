<template>
  <div class="hacklover-home">

    <Background :active="backgroundActive"/>

    <EffectMonitor :active="effectOldMonitorActive"/>

    <Spinner :active="!pageEnabled" />

    <template v-if="page">
      <div
        v-if="pageAvailable"
        :class="['hacklover-home__container', {'hacklover-home__container--visible': pageEnabled}]"
      >

        <Header
          :title="page?.title ? page?.title : undefined"
          :description="page?.description ? page?.description : undefined"
          class="mb-6"
        />

        <main>

          <HomeMainFront
            v-if="!about.enabled"
            :page="page"
            @about="about.setEnabled(true)"
            @action="onHomeAction"
          />

          <HomeMainAbout
            v-else
            :page="page"
            @return="about.setEnabled(false)"
          />

        </main>

      </div>
    </template>

  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, onBeforeMount} from 'vue'
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';

import Header from "components/Header/Header.vue";
import Background from "components/Background/Background.vue";
import Spinner from "components/Spinner/Spinner.vue";

import HomeMainFront from "@/home/HomeMainFront.vue";
import HomeMainAbout from "@/home/HomeMainAbout.vue";

// effects
import EffectMonitor from "components/Effect/EffectMonitor.vue";

const router = useRouter()
const store = useStore()
const effectOldMonitorActive = ref(false)
const backgroundActive = ref(true)

const about = {
  enabled: false,
  setEnabled(value: boolean) {
    this.enabled = value
    backgroundActive.value = !value
  }
}

const page = computed(() => store.getters['home/page'])
const pageEnabled = ref(false)
const pageAvailable = computed(() => {
  const ready = store.getters['home/pageReady']

  if (ready === true) {
    setTimeout(() => pageEnabled.value = true, 400)
  }

  return ready
})

// on footer action-button click
function onHomeAction(url: any, timeout: number = 2400) {
  effectOldMonitorActive.value = true
  backgroundActive.value = true

  setTimeout(() => {
    if (url) {
      setTimeout(() => {
        if (typeof url === 'string') {
          window.location.href = url
        } else if (typeof url === 'object') {
          router.push(url)
        }
      }, timeout)
      return true
    }
  }, 400)
}

// close About section on ESC keydown
function onCloseAboutOnEscKeydown(e) {
  if (e.keyCode === 27) {
    about.setEnabled(false)
  }
}

onMounted(() => document.addEventListener('keydown', onCloseAboutOnEscKeydown))
onBeforeMount(() => document.removeEventListener('keydown', onCloseAboutOnEscKeydown))
</script>

<style lang="scss">
.hacklover-home {
  overflow: hidden;
  color: white;

  &--about {
    blockquote {
      padding: 0;
    }
  }

  &__links {
    .v-btn {
      margin: 0 5px;
    }
  }

  &__container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-height: 100%;
    padding: 36px 0;
    transition: opacity 0.5s ease-in-out;
    transition-delay: 0.25s;
    overflow-y: auto;
    user-select: none;
    opacity: 0;

    &--visible {
      opacity: 1;
    }

    main {
      width: 550px;
      max-width: 90vw;
      margin: 0 auto;
      text-align: center;

      @media(max-width: 720px) {
        width: 640px;
      }

      @media(max-width: 320px) {
        max-width: 95vw;
      }

      hr {
        height: 1px;
        border: 0;
        background: #333;
      }

      blockquote {
        margin: 0 auto;
        font-family: serif;
        font-size: 18px;
        color: #aaa;
        cursor: default;
        overflow-x: auto;

        ::-webkit-scrollbar {
          width: 0 !important;
        }

        a {
          color: #e8e8e8;
        }

        p {
          width: 550px;
          margin-bottom: 16px;

          @media(max-width: 720px) {
            width: 640px;
          }
        }
      }
    }
  }
}

.btn-info {
  i.v-icon {
    transition: color 0.4s ease-in-out;
  }

  &:hover i {
    color: white;
  }
}
</style>