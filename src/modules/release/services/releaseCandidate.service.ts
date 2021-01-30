import { data } from '@/data/data'
import { DataType } from '@/data/DataType.enum'
import { ReleaseCandidate } from '@/data/models/ReleaseCandidate'
import { WorkItem } from '@/modules/azure/entities/WorkItem.interface'
import { WorkItemType } from '@/modules/azure/enums/WorkItemType.enum'

interface NewReleaseCandidateParams {
  iteration: string
  version: string
  endDate: string
  entityIds: number[]
}

class ReleaseCandidateService {
  async new({
    iteration,
    version,
    endDate,
    entityIds
  }: NewReleaseCandidateParams) {
    const latestReleaseCandidates = await data.getAll<
      DataType.ReleaseCandidate,
      ReleaseCandidate
    >({
      prefix: `${DataType.ReleaseCandidate}-${version}`
    })
    const releaseCandidateNumber = latestReleaseCandidates.length + 1
    const id = `${DataType.ReleaseCandidate}-${version}-${data.newId()}`

    const newRelease: ReleaseCandidate = {
      _id: id,
      $type: DataType.ReleaseCandidate,
      iteration,
      buildDate: endDate,
      entityIds,
      releaseCandidateNumber,
      version
    }

    if (await data.add(newRelease)) {
      return await data.get<DataType.ReleaseCandidate, ReleaseCandidate>(id)
    }

    return null
  }

  async getLatestReleaseCandidate(version: string) {
    const [latestReleaseCandidate] = (
      await data.getAll<DataType.ReleaseCandidate, ReleaseCandidate>({
        prefix: `${DataType.ReleaseCandidate}-${version}`
      })
    ).sort((a, b) =>
      a.releaseCandidateNumber < b.releaseCandidateNumber ? 1 : -1
    )

    return latestReleaseCandidate ?? null
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

  hasIterationChanged(workItems: WorkItem[], entityIds: number[]) {
    for (const workItem of workItems) {
      if (!workItem.WorkItemId) {
        continue
      }
      if (!entityIds.includes(workItem.WorkItemId)) {
        return true
      }
    }

    const workItemIds = workItems.map((workItem) => workItem.WorkItemId)

    for (const entityId of entityIds) {
      if (!workItemIds.includes(entityId)) {
        return true
      }
    }

    return false
  }
}

export const releaseCandidateService = new ReleaseCandidateService()
