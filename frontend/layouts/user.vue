<template>
  <client-only>
    <div class="flex flex-col">
      <UserNavbar/>
        <main class="w-full">
          <slot />
        </main>

    </div>
  </client-only>
</template>
<script setup lang="ts">
import UserNavbar from "~/components/UserNavbar.vue";
</script>