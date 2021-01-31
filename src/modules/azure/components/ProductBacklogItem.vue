<template>
  <div class="product-backlog-item card">
    <header class="card-header">
      <div class="card-header-title">
        <h5 class="subtitle is-5">
          <a :href="workItemUrl" target="_blank">
            #{{ item.WorkItemId }} -
            {{ item.Title }}
          </a>
          <img
            v-if="item.CompletedDate"
            src="@/assets/check.svg"
            alt="product backlog item done"
          />
        </h5>
      </div>
    </header>
    <div class="card-content" v-if="hasChildren">
      <div class="content">
        <task-item
          class="task-item"
          v-for="child in children"
          :key="child.WorkItemId"
          :task="child"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { WorkItem } from '@/modules/azure/entities/WorkItem.interface'
import { useAzure } from '@/modules/azure/hooks/useAzure.hook'
import { useReleaseCandidate } from '@/modules/release/hooks/useReleaseCandidate'
import { computed, defineComponent, PropType } from 'vue'
import TaskItem from '@/modules/azure/components/TaskItem.vue'

export default defineComponent({
  name: 'ProductBacklogItem',
  components: {
    TaskItem
  },
  props: {
    item: { type: Object as PropType<WorkItem>, required: true }
  },
  setup(props) {
    const { workItemTree } = useReleaseCandidate()
    const { workItemUrl } = useAzure(props.item.WorkItemId)

    const children = computed(() =>
      props.item.WorkItemId ? workItemTree.value[props.item.WorkItemId] : []
    )

    const hasChildren = computed(() => !!children.value?.length ?? false)

    return {
      hasChildren,
      children,
      workItemUrl
    }
  }
})
</script>

<style lang="scss" scoped>
.product-backlog-item {
  &.card {
    box-shadow: none;
    background-color: #f5f6fa;
  }

  h5 {
    display: flex;
    align-items: center;
  }

  .task-item {
    margin-bottom: 1rem;
  }
}
</style>
