import { createStore } from 'vuex'
import VuexPersist from 'vuex-persist'
import { authStore } from '@/modules/auth/store/auth.store'

const localPersist = new VuexPersist({
  key: 'azync'
})

export const store = createStore({
  modules: { authStore },
  plugins: [localPersist.plugin]
})
