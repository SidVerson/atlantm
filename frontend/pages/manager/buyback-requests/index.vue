<script setup>
definePageMeta({
  layout: 'manager'
})
function getItem(item) {
  if (import.meta.client) {
    return localStorage.getItem(item)
  } else {
    return localStorage.getItem(item)
  }
}
const { data: requests,pending, refresh } = useFetch('http://localhost:3001/buyback-requests', {
  headers: {
    Authorization: `Bearer ${getItem('token')}`
  }
});

async function updateStatus(id, newStatus) {
  try {
    await $fetch(`http://localhost:3001/buyback-requests/${id}/status`, {
      method: 'PATCH',
      body: { status: newStatus },
      headers: {
        Authorization: `Bearer ${getItem('token')}`
      }
    });
    await refresh();
  } catch (error) {
    console.error('Оши обновления:', error);
  }
}
</script>

<template>
  <client-only>
    <NuxtLayout>
      <div v-if="pending" class="text-center p-8">
        <Spinner class="w-8 h-8 mx-auto" />
      </div>
  <div v-else-if="requests" class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Заявки на выкуп</h1>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Автомобиль</TableHead>
          <TableHead>Год</TableHead>
          <TableHead>Пробег</TableHead>
          <TableHead>Клиент</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead>Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="request in requests" :key="request.id">
          <TableCell>{{ request.brand }} {{ request.model }}</TableCell>
          <TableCell>{{ request.year }}</TableCell>
          <TableCell>{{ request.mileage.toLocaleString() }} км</TableCell>
          <TableCell>
            <div>{{ request.fullName }}</div>
            <div class="text-sm text-gray-600">{{ request.phone }}</div>
          </TableCell>
          <TableCell>
            <Badge>
              {{ request.status }}
            </Badge>
          </TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost">Изменить статус</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem @click="updateStatus(request.id, 'in_progress')">
                  В работу
                </DropdownMenuItem>
                <DropdownMenuItem @click="updateStatus(request.id, 'completed')">
                  Завершить
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="link" as-child>
              <NuxtLink :to="`/manager/buyback-requests/${request.id}`">
                Подробнее
              </NuxtLink>
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
      <div v-else class="text-red-500 text-center p-8">
        Заявка не найдена
      </div>
    </NuxtLayout>
  </client-only>
</template>