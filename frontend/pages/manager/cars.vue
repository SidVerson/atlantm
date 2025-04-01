<script setup>
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

const { data: cars, refresh } = useFetch('http://localhost:3001/cars', {
  headers: {
    Authorization: `Bearer ${getItem('token')}`
  }
});



async function deleteCar(id) {
  await $fetch(`http://localhost:3001/cars/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getItem('token')}`
    }
  });
  await refresh();
}
</script>

<template>
  <client-only>
    <NuxtLayout>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Управление автомобилями</h1>
      <Button as-child>
        <NuxtLink to="/manager/add-car">Добавить авто</NuxtLink>
      </Button>
    </div>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Модель</TableHead>
          <TableHead>Год</TableHead>
          <TableHead>Цена</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead>Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="car in cars" :key="car.id">
          <TableCell><NuxtLink :to="`/cars/${car.id}`">{{ car.brand }} {{ car.model }}</NuxtLink></TableCell>
          <TableCell>{{ car.year }}</TableCell>
          <TableCell>{{ car.price.toLocaleString() }} ₽</TableCell>
          <TableCell>
            <Badge :variant="car.status === 'active' ? 'default' : 'secondary'">
              {{ car.status === 'active' ? 'Активно' : 'Продано' }}
            </Badge>
          </TableCell>
          <TableCell class="flex gap-2">
            <Button variant="outline" size="sm" as-child>
              <NuxtLink :to="`/manager/edit-car/${car.id}`">Редактировать</NuxtLink>
            </Button>
            <Button variant="destructive" size="sm" @click="deleteCar(car.id)">
              Удалить
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
    </NuxtLayout>
  </client-only>
</template>