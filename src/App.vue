<template>
  <div id="app">
    <h1 class="title is-1">Zync</h1>
    <nav>
      <router-link to="/">
        <img src="./assets/bold.svg" alt="home" />
      </router-link>
    </nav>
    <auth-hero />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AuthHero from '@/modules/auth/components/AuthHero.vue'

export default defineComponent({
  name: 'App',
  components: { AuthHero }
})
</script>

<style lang="scss">
@import 'styles/app';

.app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
}

nav {
  margin-top: 1rem;
}

main {
  display: flex;
  flex: 1;
  align-items: center;
}
</style>
