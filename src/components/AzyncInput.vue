<template>
  <div class="azync-input field">
    <label class="label">{{ label }}</label>
    <div class="control">
      <input
        class="input"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AzyncInput',
  props: {
    label: {
      type: String,
      required: true
    },
    modelValue: { type: [String, Number] },
    type: { type: String, default: 'text' }
  },
  emits: ['update:modelValue']
})
</script>

<style lang="scss" scoped>
.azync-input {
}
</style>
