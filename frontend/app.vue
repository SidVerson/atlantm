<template>
  <Toaster />
  <div>
    <!-- Markup shared across all pages, ex: NavBar -->
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
import {Toaster} from '@/components/ui/sonner'
</script>