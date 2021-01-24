<template>
  <div class="feature-list-item card">
    <header class="card-header">
      <p class="card-header-title" :style="{ backgroundColor, color }">
        {{ feature.WorkItemId }}
      </p>
    </header>
    <div class="card-content">
      <div class="content">
        {{ feature.Title }}
      </div>
    </div>
    <footer class="card-footer">
      <a :href="url" class="card-footer-item" target="_blank">edit</a>
    </footer>
  </div>
</template>

<script lang="ts">
import { useGetters } from '@/store/useStore'
import { computed, defineComponent, PropType } from 'vue'
import { WorkItem } from '../entities/WorkItem.interface'
import { AzureService } from '../service/azure.service'
import { getRandomColor } from '@/services/randomColor'
import { yiq } from 'yiq'

export default defineComponent({
  name: 'Home',
  props: {
    feature: { type: Object as PropType<WorkItem>, required: true }
  },
  setup(props) {
    const { azure } = useGetters(['azure'])
    const url = computed(() => {
      const azureService = new AzureService(azure.value)
      return props.feature.WorkItemId
        ? azureService.getWorkItemURL(props.feature.WorkItemId)
        : null
    })
    const backgroundColor = computed(() => {
      return props.feature.WorkItemId
        ? getRandomColor(props.feature.WorkItemId)
        : null
    })
    const color = computed(() => {
      return backgroundColor.value ? yiq(backgroundColor.value) : '#000000'
    })

    return {
      url,
      backgroundColor,
      color
    }
  }
})
</script>

<style lang="scss" scoped>
.feature-list-item {
}
</style>
