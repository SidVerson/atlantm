<template>
  <svg class="animate-spin" :class="class" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none"
            stroke-width="4" stroke-dasharray="31.415, 31.415"
            stroke-linecap="round" opacity="0.25"/>
    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
  </svg>
</template>

<script setup>
defineProps({
  class: {
    type: String,
    default: 'h-5 w-5 text-current'
  }
});
</script>