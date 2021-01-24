<template>
  <div id="app">
    <h1 class="title is-1">Zync</h1>
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
</style>
