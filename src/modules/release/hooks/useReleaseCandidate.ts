import { WorkItem } from '@/modules/azure/entities/WorkItem.interface'
import { releaseCandidateService } from '@/modules/release/services/releaseCandidate.service'
import { computed, reactive } from 'vue'

const state = reactive<{ workItems: WorkItem[] }>({
  workItems: []
})

export const useReleaseCandidate = () => {
  const groupedWorkItems = computed(() => {
    return releaseCandidateService.groupByType(state.workItems) ?? null
  })
  const workItemTree = computed(
    () => releaseCandidateService.groupByParentId(state.workItems) ?? null
  )

  const updateWorkItems = (workItems: WorkItem[]) => {
    state.workItems = workItems
  }

  const clearWorkItems = () => {
    state.workItems = []
  }

  return {
    workItems: state.workItems,
    groupedWorkItems,
    workItemTree,
    updateWorkItems,
    clearWorkItems
  } as const
}
