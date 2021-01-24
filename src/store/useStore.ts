import { computed } from 'vue'
import { useStore } from 'vuex'

export const useState = (keys: string[]) => {
  const store = useStore()

  for (const key of keys) {
    if (!(key in store.state)) {
      throw new Error(`${key} is not in state.`)
    }
  }

  const keypair = keys.map((s) => [s, computed(() => store.state[s])])

  return Object.fromEntries(keypair)
}

export const useGetters = (keys: string[]) => {
  const store = useStore()

  for (const key of keys) {
    if (!(key in store.getters)) {
      throw new Error(`${key} is not in getters.`)
    }
  }

  const keypair = keys.map((g) => [g, computed(() => store.getters[g])])

  return Object.fromEntries(keypair)
}

export const useActions = (keys: string[]) => {
  const store = useStore()

  const keypair = keys.map((action) => [
    action,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (input: any) => store.dispatch(action, input)
  ])

  return Object.fromEntries(keypair)
}
