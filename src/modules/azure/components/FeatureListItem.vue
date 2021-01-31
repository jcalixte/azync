<template>
  <div class="feature-list-item card">
    <header class="card-header">
      <div class="card-header-title" :style="{ backgroundColor, color }">
        {{ feature.WorkItemId }}
        <h3 class="title is-3" :style="{ color }">
          {{ feature.Title }}
        </h3>
        <img
          v-if="feature.CompletedDate"
          src="@/assets/check.svg"
          alt="feature done"
        />
      </div>
    </header>
    <div class="card-content">
      <div class="content">
        <product-backlog-item
          v-for="child in children"
          :key="child.WorkItemId"
          :item="child"
        />
      </div>
    </div>
    <footer class="card-footer">
      <a :href="workItemUrl" class="card-footer-item" target="_blank">edit</a>
    </footer>
  </div>
</template>

<script lang="ts">
import { yiq } from 'yiq'
import { computed, defineComponent, PropType } from 'vue'
import { WorkItem } from '@/modules/azure/entities/WorkItem.interface'
import { getRandomColor } from '@/services/randomColor'
import { useReleaseCandidate } from '@/modules/release/hooks/useReleaseCandidate'
import ProductBacklogItem from '@/modules/azure/components/ProductBacklogItem.vue'
import { useAzure } from '@/modules/azure/hooks/useAzure.hook'

export default defineComponent({
  name: 'Home',
  components: { ProductBacklogItem },
  props: {
    feature: { type: Object as PropType<WorkItem>, required: true }
  },
  setup(props) {
    const { workItemTree } = useReleaseCandidate()
    const { workItemUrl } = useAzure(props.feature.WorkItemId)

    const backgroundColor = computed(() => {
      return props.feature.WorkItemId
        ? getRandomColor(props.feature.WorkItemId)
        : null
    })
    const color = computed(() => {
      return backgroundColor.value ? yiq(backgroundColor.value) : '#000000'
    })

    const children = computed(() =>
      props.feature.WorkItemId
        ? workItemTree.value[props.feature.WorkItemId]
        : []
    )

    return {
      workItemUrl,
      backgroundColor,
      color,
      children
    }
  }
})
</script>

<style lang="scss" scoped>
.feature-list-item {
  .card-header-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 4rem;
    gap: 1rem;

    h3 {
      margin-bottom: 0;
    }
  }
}
</style>
