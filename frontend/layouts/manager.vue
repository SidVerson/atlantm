<template>
  <client-only>

  <div class="flex">
    <SidebarProvider>
      <ManagerSidebar />
      <main class="w-full">
        <SidebarTrigger />
        <slot />
      </main>
    </SidebarProvider>
  </div>
  </client-only>
</template>
