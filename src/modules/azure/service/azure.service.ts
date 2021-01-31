import { AzureAuth } from '@/modules/azure/entities/AzureAuth.interface'
import { Iteration } from '@/modules/azure/entities/Iteration.interface'
import { WorkItem } from '@/modules/azure/entities/WorkItem.interface'
import { WorkItemType } from '@/modules/azure/enums/WorkItemType.enum'
import { query } from '@/services/api'

export class AzureService {
  private selectKeys: Array<keyof WorkItem> = [
    'WorkItemId',
    'CompletedDate',
    'WorkItemType',
    'State',
    'Title',
    'RemainingWork',
    'Effort',
    'ParentWorkItemId'
  ]

  private get token() {
    return Buffer.from(`:${this.azureAuth.token}`).toString('base64')
  }

  constructor(private readonly azureAuth: AzureAuth) {}

  baseURL(entity: string) {
    const { organisation, project } = this.azureAuth

    return new URL(
      `https://analytics.dev.azure.com/${organisation}/${project}/_odata/v2.0/${entity}`
    )
  }

  getWorkItemsURL(iterationSK: string, type?: WorkItemType) {
    const url = this.baseURL('WorkItems')
    const keys = this.selectKeys.join(',')
    url.searchParams.append('$select', keys)
    if (type) {
      url.searchParams.append(
        '$filter',
        `WorkItemType eq '${type}' and IterationSK eq ${iterationSK}`
      )
    } else {
      url.searchParams.append('$filter', `IterationSK eq ${iterationSK}`)
    }

    return url.toString()
  }

  getIterationsURL() {
    const url = this.baseURL('Iterations')

    return url.toString()
  }

  async getWorkItems(iterationSK: string, type?: WorkItemType) {
    const result = await query<{ value: WorkItem[] }>(
      this.getWorkItemsURL(iterationSK, type),
      this.token
    )

    return result?.value ?? []
  }

  async getFeatureItems(iterationSK: string) {
    return await this.getWorkItems(iterationSK, WorkItemType.Feature)
  }

  async getBacklogItems(iterationSK: string) {
    return await this.getWorkItems(iterationSK, WorkItemType.ProductBacklogItem)
  }

  async getTaskItems(iterationSK: string) {
    return await this.getWorkItems(iterationSK, WorkItemType.Task)
  }

  async getBugItems(iterationSK: string) {
    return await this.getWorkItems(iterationSK, WorkItemType.Bug)
  }

  getWorkItemURL(workItemId: number) {
    return `https://dev.azure.com/${this.azureAuth.organisation}/${this.azureAuth.project}/_workitems/edit/${workItemId}`
  }

  async getIterations() {
    const result = await query<{ value: Iteration[] }>(
      this.getIterationsURL(),
      this.token
    )

    return result?.value ?? []
  }

  groupByType(workItems: WorkItem[]) {
    const types = workItems.reduce((t, workItem) => {
      if (!workItem.WorkItemType) {
        return t
      }
      if (!t[workItem.WorkItemType]) {
        t[workItem.WorkItemType] = [workItem]
      } else {
        t[workItem.WorkItemType].push(workItem)
      }
      return t
    }, {} as Record<WorkItemType, WorkItem[]>)

    return types
  }

  groupByParentId(workItems: WorkItem[]) {
    const tree = workItems.reduce((t, workItem) => {
      if (!workItem.ParentWorkItemId) {
        return t
      }
      if (!t[workItem.ParentWorkItemId]) {
        t[workItem.ParentWorkItemId] = [workItem]
      } else {
        t[workItem.ParentWorkItemId].push(workItem)
      }
      return t
    }, {} as { [key: number]: WorkItem[] })

    return tree
  }
}
