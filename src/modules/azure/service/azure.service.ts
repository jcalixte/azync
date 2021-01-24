import { query } from '@/services/api'
import { AzureAuth } from '../entities/AzureAuth.interface'
import { WorkItem } from '../entities/WorkItem.interface'
import { WorkItemType } from '../enums/WorkItemType.enum'

export class AzureService {
  private selectKeys: Array<keyof WorkItem> = [
    'WorkItemId',
    'CompletedDate',
    'CompletedDateSK',
    'State',
    'Title',
    'RemainingWork',
    'Effort',
    'Custom_Bacrouge',
    'IterationSK',
    'ParentWorkItemId',
    'Reason',
    'Watermark'
  ]

  constructor(private readonly azureAuth: AzureAuth) {}

  getAzureURL(type?: WorkItemType) {
    const { organisation, project } = this.azureAuth
    const keys = this.selectKeys.join(',')

    const url = new URL(
      `https://analytics.dev.azure.com/${organisation}/${project}/_odata/v2.0/WorkItems`
    )
    url.searchParams.append('$select', keys)
    if (type) {
      url.searchParams.append(
        '$filter',
        `WorkItemType eq '${type}' and State ne 'Done'`
      )
    }

    return url.toString()
  }

  async getWorkItems(type?: WorkItemType) {
    const azureAPIToken = Buffer.from(`:${this.azureAuth.token}`).toString(
      'base64'
    )

    const result = await query<{ value: WorkItem[] }>(
      this.getAzureURL(type),
      azureAPIToken
    )

    return result?.value ?? []
  }

  async getFeatureItems() {
    return await this.getWorkItems(WorkItemType.Feature)
  }

  async getBacklogItems() {
    return await this.getWorkItems(WorkItemType.ProductBacklogItem)
  }

  async getTaskItems() {
    return await this.getWorkItems(WorkItemType.Task)
  }

  async getBugItems() {
    return await this.getWorkItems(WorkItemType.Bug)
  }

  public getWorkItemURL(workItemId: number) {
    return `https://dev.azure.com/${this.azureAuth.organisation}/${this.azureAuth.project}/_workitems/edit/${workItemId}`
  }
}
