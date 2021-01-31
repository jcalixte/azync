<template>
  <div class="task-item">
    <a :href="workItemUrl" target="_blank">{{ task.Title }}</a>
    <img v-if="task.CompletedDate" src="@/assets/check.svg" alt="task done" />
    <img
      v-if="inProgress"
      src="@/assets/calendar.svg"
      alt="task due by today"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { WorkItem } from '@/modules/azure/entities/WorkItem.interface'
import { useAzure } from '@/modules/azure/hooks/useAzure.hook'
import { WorkItemState } from '@/modules/azure/enums/WorkItemState.enum'

export default defineComponent({
  name: 'TaskItem',
  props: {
    task: { type: Object as PropType<WorkItem>, required: true }
  },
  setup(props) {
    const { workItemUrl } = useAzure(props.task.WorkItemId)
    const inProgress = computed(
      () => props.task.State === WorkItemState.InProgress
    )

    return {
      workItemUrl,
      inProgress
    }
  }
})
</script>

<style lang="scss" scoped>
.task-item {
  display: flex;
  align-items: center;
}
</style>
