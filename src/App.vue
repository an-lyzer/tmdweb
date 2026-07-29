<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import HeaderWhite from './components/Header_white.vue'
import HeaderTop from './components/headertop.vue'

const route = useRoute()
const isHome = computed(() => route.name === 'home')
</script>

<template>
  <div class="app-container">
    <HeaderTop />
    <Header v-if="isHome" />
    <HeaderWhite v-else />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

main {
  width: 100%;
  flex: 1;
  margin: 0;
  padding: 0;
  overflow: visible;
}
</style>
