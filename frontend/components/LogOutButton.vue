<script setup>
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  navigateTo('/login');
};
</script>

<template>
  <Button @click="logout" variant="ghost" class="ml-4">
    <Icon name="material-symbols:logout" class="w-4 h-4 mr-2" />
    Выйти
  </Button>
</template>