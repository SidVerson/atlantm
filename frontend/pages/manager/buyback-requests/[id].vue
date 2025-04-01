<script setup>
definePageMeta({
  layout: 'manager'
})
function getItem(item) {
  if (import.meta.client) {
    return localStorage.getItem(item)
  } else {
    return undefined
  }
}
const route = useRoute();
const { data: request, pending, error } = await useFetch(
    `http://localhost:3001/buyback-requests/${route.params.id}`,
    {
      headers: {
        Authorization: `Bearer ${getItem('token')}`
      }
    }
);


</script>

<template>
  <client-only>
    <NuxtLayout>

      <div v-if="pending" class="text-center p-8">
        <Spinner class="w-8 h-8 mx-auto" />

      </div>
  <div v-else-if="request" class="container mx-auto p-4">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Фотографии -->
      <div class="grid grid-cols-2 gap-4">
        <img
            v-if="request.photos"
            v-for="(photo, index) in request.photos"
            :key="index"
            :src="`http://localhost:3001/uploads/${photo}`"
            class="rounded-lg object-cover h-48 w-full"
        />
      </div>

      <!-- Информация -->
      <div class="space-y-4">
        <h1 class="text-2xl font-bold">
          {{ request.brand }} {{ request.model }} {{ request.year }}
        </h1>

        <div class="grid grid-cols-2 gap-4">
          <DetailItem label="Пробег" :value="`${request.mileage.toLocaleString()} км`" />
          <DetailItem label="Статус" :value="request.status" />
          <DetailItem label="Клиент" :value="request.fullName" />
          <DetailItem label="Телефон" :value="request.phone" />
          <DetailItem label="Email" :value="request.email" />
          <DetailItem label="Дата подачи" :value="new Date(request.createdAt).toLocaleDateString()" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Описание состояния</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="whitespace-pre-wrap">{{ request.description }}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>

      <div v-else class="text-red-500 text-center p-8">
        Заявка не найдена
      </div>
    </NuxtLayout>
  </client-only>
</template>