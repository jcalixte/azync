<template>
  <div class="home">
    <release-candidate />
  </div>
</template>

<script lang="ts">
import ReleaseCandidate from '@/modules/release/components/ReleaseCandidate.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  components: {
    ReleaseCandidate
  }
})
</script>
