<template>
  <div class="feature-list">
    <button class="button is-primary" @click="getFeatures">
      fetch ongoing features
    </button>

    <section>
      <h4 class="subtitle is-4">Features</h4>
      <feature-list-item
        v-for="feature in features"
        :key="feature.WorkItemId"
        :feature="feature"
        class="feature-list-feature"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { AzureService } from '@/modules/azure/service/azure.service'
import { WorkItem } from '@/modules/azure/entities/WorkItem.interface'
import { useGetters } from '@/store/useStore'
import FeatureListItem from '@/modules/azure/components/FeatureListItem.vue'

export default defineComponent({
  name: 'FeatureList',
  components: {
    FeatureListItem
  },
  setup() {
    const { azure } = useGetters(['azure'])
    const features = ref<WorkItem[]>([])

    const getFeatures = async () => {
      const azureService = new AzureService(azure.value)
      features.value = (await azureService.getFeatureItems()) ?? []
    }

    return {
      getFeatures,
      features
    }
  }
})
</script>

<style lang="scss" scoped>
.feature-list {
  .feature-list-item {
    margin-top: 1rem;
  }
}
</style>
