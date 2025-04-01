<script setup>
import EditUserModal from "~/components/EditUserModal.vue";

function getItem(item) {
  if (process.client) {
    return localStorage.getItem(item)
  } else {
    return undefined
  }
}
const { data: users, refresh } = useFetch('http://localhost:3001/users', {
  headers: {
    Authorization: `Bearer ${getItem('token')}`
  }
});

const formState = reactive({
  username: '',
  password: ''
});

async function createUser() {
  await $fetch('http://localhost:3001/users', {
    method: 'POST',
    body: formState,
    headers: {
      Authorization: `Bearer ${getItem('token')}`
    }
  });
  await refresh();
  formState.username = '';
  formState.password = '';
}

async function deleteUser(id) {
  await $fetch(`http://localhost:3001/users/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getItem('token')}`
    }
  });
  onMounted(async () => {
 await refresh();
  })
}
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl">Управление менеджерами</h1>
      <LogOutButton />
    </div>

    <div class="mb-8">
      <h2 class="text-xl mb-2">Создать нового менеджера</h2>
      <div class="flex gap-2">
        <Input v-model="formState.username" placeholder="Логин" />
        <Input v-model="formState.password" type="password" placeholder="Пароль" />
        <Button @click="createUser">Создать</Button>
      </div>
    </div>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Логин</TableHead>
          <TableHead>Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="user in users" :key="user.id">
          <TableCell>{{ user.id }}</TableCell>
          <TableCell>{{ user.username }}</TableCell>
          <TableCell class="flex gap-[12px]">
            <EditUserModal :user="user" @updated="refresh" />
            <Button variant="destructive" @click="deleteUser(user.id)">
              Удалить
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>