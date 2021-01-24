<template>
  <div class="auth-hero" v-if="!isAuthenticated">
    <h3 class="title is-3">Authentication</h3>
    <div class="columns is-centered">
      <div class="column">
        <azync-input label="token" v-model="azureTokenInput" type="password" />
      </div>
      <div class="column">
        <azync-input label="organisation" v-model="azureOrganisationInput" />
      </div>
      <div class="column">
        <azync-input label="project" v-model="azureProjectInput" />
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column">
        <button class="button is-primary" @click="updateAzure">
          Sauvegarder
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useActions, useGetters } from '@/store/useStore'
import AzyncInput from '@/components/AzyncInput.vue'

export default defineComponent({
  name: 'AuthHero',
  components: {
    AzyncInput
  },
  setup() {
    const {
      isAuthenticated,
      azureToken,
      azureOrganisation,
      azureProject
    } = useGetters([
      'isAuthenticated',
      'azure',
      'azureToken',
      'azureOrganisation',
      'azureProject'
    ])
    const { updateAzureConfig } = useActions(['updateAzureConfig'])
    const azureTokenInput = ref(azureToken.value)
    const azureOrganisationInput = ref(azureOrganisation.value)
    const azureProjectInput = ref(azureProject.value)

    const updateAzure = () => {
      updateAzureConfig({
        token: azureTokenInput.value,
        organisation: azureOrganisationInput.value,
        project: azureProjectInput.value
      })
    }

    return {
      isAuthenticated,
      azureTokenInput,
      azureOrganisationInput,
      azureProjectInput,
      updateAzure
    }
  }
})
</script>

<style lang="scss" scoped>
.auth-hero {
}
</style>
