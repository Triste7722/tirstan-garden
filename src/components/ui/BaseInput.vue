<script setup lang="ts">
const model = defineModel<string>({ default: '' })

withDefaults(
  defineProps<{
    id?: string
    type?: string
    placeholder?: string
    disabled?: boolean
    ariaLabel?: string
    autocomplete?: string
  }>(),
  {
    type: 'text',
    disabled: false,
    autocomplete: 'off',
  },
)
</script>

<template>
  <label
    class="group flex h-11 w-full cursor-text items-center gap-3 rounded-full border border-line bg-surface/70 px-4 transition focus-within:border-accent/50 focus-within:bg-raised focus-within:shadow-glow-soft"
  >
    <slot name="prefix" />

    <input
      :id="id"
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :aria-label="ariaLabel"
      :autocomplete="autocomplete"
      class="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-subtle disabled:cursor-not-allowed disabled:opacity-60"
    />

    <slot name="suffix" />
  </label>
</template>
