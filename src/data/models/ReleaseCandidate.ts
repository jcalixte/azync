import { DataType } from '@/data/DataType.enum'
import { Model } from '@/data/models/Model'

export interface ReleaseCandidate extends Model<DataType.ReleaseCandidate> {
  iteration: string
  version: string
  releaseCandidateNumber: number
  buildDate: string
  entityIds: number[]
}
