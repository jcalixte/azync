<template>
  <div class="work-item-list">
    <button class="button is-primary" @click="getItems">
      get items
    </button>

    <section>
      <feature-list-item
        v-for="item in items"
        :key="item.id"
        :feature="item"
        class="feature-list-item"
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
  name: 'WorkItemList',
  components: {
    FeatureListItem
  },
  setup() {
    const { azure } = useGetters(['azure'])
    const items = ref<WorkItem[]>([])

    const getItems = async () => {
      const azureService = new AzureService(azure.value)
      items.value = (await azureService.getFeatureItems()) ?? []
    }

    return {
      getItems,
      items
    }
  }
})
</script>

<style lang="scss" scoped>
.work-item-list {
  .feature-list-item {
    margin-top: 1rem;
  }
}
</style>
