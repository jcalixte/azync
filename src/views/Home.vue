<template>
  <div class="home columns">
    <div class="column">
      <feature-list />
    </div>
    <div class="column"></div>
    <div class="column"></div>
  </div>
</template>

<script lang="ts">
import FeatureList from '@/modules/azure/components/FeatureList.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  components: {
    FeatureList
  }
})
</script>
