<script setup>
import {toast} from "vue-sonner";

definePageMeta({
  layout: 'manager'
})
function getItem(item) {
  if (process.client) {
    return localStorage.getItem(item)
  } else {
    return undefined
  }
}


const { data: requests, refresh } = useFetch('http://localhost:3001/test-drive-requests', {
  headers: {
    Authorization: `Bearer ${getItem('token')}`
  }
});

async function updateStatus(id, newStatus) {
  try {
    await $fetch(`http://localhost:3001/test-drive-requests/${id}/status`, {
      method: 'PATCH',
      body: { status: newStatus },
      headers: {
        Authorization: `Bearer ${getItem('token')}`
      }
    });
    await refresh();
  } catch (error) {
    console.error('Ошибка обновления статуса:', error);
    toast.error('Не удалось обовить статус');
  }
}
</script>

<template>
  <client-only>
  <NuxtLayout>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Заявки на тест-драйв</h1>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Автомобиль</TableHead>
          <TableHead>Клиент</TableHead>
          <TableHead>Контакты</TableHead>
          <TableHead>Дата</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead>Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="request in requests" :key="request.id">
          <TableCell><NuxtLink :to="`/cars/${request.car.id}`">{{ request.car.brand }} {{ request.car.model }}</NuxtLink></TableCell>
          <TableCell>{{ request.fullName }}</TableCell>
          <TableCell>
            <div>{{ request.phone }}</div>
            <div class="text-sm text-gray-600">{{ request.email }}</div>
          </TableCell>
          <TableCell>{{ new Date(request.preferredDate).toLocaleString() }}</TableCell>
          <TableCell>
            <Badge :variant="'secondary'">
              {{ request.status === 'pending' ? 'Новая' :
                request.status === 'confirmed' ? 'Подтверждена' : 'Отменена' }}
            </Badge>
          </TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost">Изменить статус</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem @click="updateStatus(request.id, 'confirmed')">
                  Подтвердить
                </DropdownMenuItem>
                <DropdownMenuItem @click="updateStatus(request.id, 'canceled')">
                  Отменить
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
  </NuxtLayout>
  </client-only>
</template>