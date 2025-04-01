<script setup lang="ts">

const props = defineProps(['label', 'value'])


</script>

<template>
<div>
  <p class="text-xs font-semibold">{{props.label}}</p>
  <p>{{props.value}}</p>
</div>
</template>

<style scoped>

</style>