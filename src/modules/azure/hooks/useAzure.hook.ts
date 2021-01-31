import { AzureService } from '@/modules/azure/service/azure.service'
import { useGetters } from '@/store/useStore'
import { computed } from 'vue'

export const useAzure = (workItemId?: number) => {
  const { azure } = useGetters(['azure'])

  const workItemUrl = computed(() => {
    const azureService = new AzureService(azure.value)
    return workItemId ? azureService.getWorkItemURL(workItemId) : null
  })

  return {
    workItemUrl
  }
}
