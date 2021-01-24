import { Module } from 'vuex'
import { AzureAuth } from '@/modules/azure/entities/AzureAuth.interface'

export interface AuthState {
  azure: AzureAuth
}

const state: AuthState = {
  azure: {
    token: null,
    organisation: null,
    project: null
  }
}

const UPDATE_AZURE = 'UPDATE_AZURE'

export const authStore: Module<AuthState, AuthState> = {
  state,
  getters: {
    azure: ({ azure }) => azure,
    azureToken: ({ azure }) => azure.token,
    azureOrganisation: ({ azure }) => azure.organisation,
    azureProject: ({ azure }) => azure.project,
    isAuthenticated: ({ azure: { token, project, organisation } }) =>
      !!token && !!project && !!organisation
  },
  actions: {
    updateAzureConfig(store, azure: Omit<AzureAuth, 'version'>) {
      store.commit(UPDATE_AZURE, azure)
    }
  },
  mutations: {
    [UPDATE_AZURE](state, azure: AzureAuth) {
      state.azure.token = azure.token
      state.azure.organisation = azure.organisation
      state.azure.project = azure.project
    }
  }
}
