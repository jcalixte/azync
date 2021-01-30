<template>
  <div class="release-candidate">
    <div class="columns">
      <div class="column">
        <h4 class="subtitle is-4">Itération</h4>
        <select
          name="selected-iteration"
          id="selected-iteration"
          class="select"
          v-model="selectedIteration"
        >
          <option value=""></option>
          <option
            :value="iteration.IterationSK"
            v-for="iteration in iterations"
            :key="iteration.IterationId"
          >
            {{ iteration.IterationName }}
          </option>
        </select>
      </div>
      <div class="column">
        <h4 class="subtitle is-4" v-if="releaseCandidate">
          Release

          <span>
            {{ releaseCandidate.version }} - RC{{
              releaseCandidate.releaseCandidateNumber
            }}
          </span>
        </h4>
        <button class="button is-primary" @click="createReleaseCandidate">
          create a new release
        </button>
      </div>
    </div>
    <div class="columns" v-if="selectedIteration && workItems">
      <div class="column" v-if="workItems[WorkItemType.Feature]">
        <h4 class="subtitle is-4">Features</h4>
        <div class="columns">
          <div
            class="column"
            v-for="feature in workItems[WorkItemType.Feature]"
            :key="feature.WorkItemId"
          >
            <feature-list-item
              :feature="feature"
              class="feature-list-feature"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useGetters } from '@/store/useStore'
import { ReleaseCandidate } from '@/data/models/ReleaseCandidate'
import { Iteration } from '@/modules/azure/entities/Iteration.interface'
import { AzureService } from '@/modules/azure/service/azure.service'
import { WorkItem } from '@/modules/azure/entities/WorkItem.interface'
import { releaseCandidateService } from '@/modules/release/services/releaseCandidate.service'
import FeatureListItem from '@/modules/azure/components/FeatureListItem.vue'
import { WorkItemType } from '@/modules/azure/enums/WorkItemType.enum'

export default defineComponent({
  name: 'ReleaseCandidate',
  components: {
    FeatureListItem
  },
  setup() {
    const { azure } = useGetters(['azure'])
    const iterations = ref<Iteration[]>([])
    const selectedIteration = ref<string>('')
    const releaseCandidate = ref<ReleaseCandidate | null>(null)
    const workItems = ref<Record<WorkItemType, WorkItem[]> | null>(null)

    const getIteration = () => {
      return (
        iterations.value.find(
          (it) => it.IterationSK === selectedIteration.value
        ) ?? null
      )
    }

    const getIterations = async () => {
      const azureService = new AzureService(azure.value)
      iterations.value = await azureService.getIterations()
    }

    const createReleaseCandidate = async () => {
      const iteration = getIteration()
      if (!iteration) {
        return
      }
      const azureService = new AzureService(azure.value)
      const items = await azureService.getWorkItems(selectedIteration.value)

      releaseCandidate.value = await releaseCandidateService.new({
        iteration: selectedIteration.value,
        version: iteration.IterationName,
        endDate: iteration.EndDate,
        entityIds: items
          .map((item) => item.WorkItemId ?? 0)
          .filter((id) => id !== 0)
      })
    }

    onMounted(() => {
      getIterations()
    })

    watch(selectedIteration, async () => {
      const iteration = iterations.value.find(
        (it) => it.IterationSK === selectedIteration.value
      )
      if (iteration) {
        releaseCandidate.value = await releaseCandidateService.getLatestReleaseCandidate(
          iteration.IterationName
        )
      }

      if (releaseCandidate.value) {
        const azureService = new AzureService(azure.value)

        const items = await azureService.getWorkItems(selectedIteration.value)
        workItems.value = releaseCandidateService.groupByType(items)
      }
    })

    return {
      iterations,
      selectedIteration,
      workItems,
      createReleaseCandidate,
      releaseCandidate,
      WorkItemType
    }
  }
})
</script>

<style lang="scss" scoped>
.release-candidate {
  .feature-list-item {
    margin-top: 1rem;
  }
}
</style>
