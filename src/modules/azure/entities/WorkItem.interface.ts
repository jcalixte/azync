import { WorkItemType } from '../enums/WorkItemType.enum'

export interface WorkItem {
  WorkItemId?: number
  InProgressDate?: Date
  CompletedDate?: Date
  LeadTimeDays?: number
  CycleTimeDays?: number
  InProgressDateSK?: number
  CompletedDateSK?: number
  AnalyticsUpdatedDate?: Date
  ProjectSK?: string
  WorkItemRevisionSK?: number
  AreaSK?: string
  IterationSK?: string
  AssignedToUserSK?: null
  ChangedByUserSK?: string
  CreatedByUserSK?: string
  ActivatedByUserSK?: null
  ClosedByUserSK?: string
  ResolvedByUserSK?: null
  ActivatedDateSK?: null
  ChangedDateSK?: number
  ClosedDateSK?: number
  CreatedDateSK?: number
  ResolvedDateSK?: null
  StateChangeDateSK?: number
  Revision?: number
  Watermark?: number
  Title?: string
  WorkItemType?: WorkItemType
  ChangedDate?: Date
  CreatedDate?: Date
  State?: string
  Reason?: string
  FoundIn?: null
  IntegrationBuild?: null
  ActivatedDate?: null
  Activity?: null
  BacklogPriority?: number
  BusinessValue?: null
  ClosedDate?: Date
  Issue?: null
  Priority?: number
  Rating?: null
  ResolvedDate?: null
  Severity?: null
  TimeCriticality?: null
  ValueArea?: string
  Effort?: null
  FinishDate?: null
  RemainingWork?: null
  StartDate?: null
  TargetDate?: null
  Blocked?: null
  ParentWorkItemId?: number | null
  TagNames?: null
  StateCategory?: string
  AutomatedTestId?: null
  AutomatedTestName?: null
  AutomatedTestStorage?: null
  AutomatedTestType?: null
  AutomationStatus?: null
  StateChangeDate?: Date
  Count?: number
  CommentCount?: number
  Custom_Bacrouge?: null
  Custom_Dateaction?: null
  Custom_Datedecheck?: null
  Custom_Deployedenvironnement?: null
  Custom_Environmentspecific?: null
  Custom_FoundInEnv?: null
  Custom_Releasedversion?: null
  Custom_Type?: null
  Microsoft_VSTS_CodeReview_AcceptedBySK?: null
  Microsoft_VSTS_CodeReview_AcceptedDate?: null
  Microsoft_VSTS_CodeReview_ClosedStatus?: null
  Microsoft_VSTS_CodeReview_ClosedStatusCode?: null
  Microsoft_VSTS_CodeReview_ClosingComment?: null
  Microsoft_VSTS_CodeReview_Context?: null
  Microsoft_VSTS_CodeReview_ContextCode?: null
  Microsoft_VSTS_CodeReview_ContextOwner?: null
  Microsoft_VSTS_CodeReview_ContextType?: null
  Microsoft_VSTS_Common_ReviewedBySK?: null
  Microsoft_VSTS_Common_StateCode?: null
  Microsoft_VSTS_Feedback_ApplicationType?: null
  Microsoft_VSTS_TCM_TestSuiteType?: null
  Microsoft_VSTS_TCM_TestSuiteTypeId?: null
  Children?: WorkItem[]
}
