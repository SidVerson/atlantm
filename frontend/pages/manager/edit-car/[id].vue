<script setup>
definePageMeta({
  layout: 'manager'
})
const route = useRoute();
function getItem(item) {
  if (process.client) {
    return localStorage.getItem(item)
  } else {
    return undefined
  }
}
// 1. Добавляем обработку состояния загрузки
const { data: car, pending, error } = await useFetch(
    `http://localhost:3001/cars/${route.params.id}`,
    {
      headers: {
        Authorization: `Bearer ${getItem('token')}`
      }
    }
);

// 2. Инициализируем форму с проверкой
const formState = reactive({
  brand: car.value?.brand || '',
  model: car.value?.model || '',
  year: car.value?.year || null,
  // ... остальные поля с дефолтными значениями
});

// 3. Добавляем обработку ошибок
if (error.value) {
  console.error('Ошибка загрузки автомобиля:', error.value);
  navigateTo('/manager/cars');
}

async function handleSubmit() {
  try {
    await $fetch(`http://localhost:3001/cars/${route.params.id}`, {
      method: 'PUT',
      body: {
        ...formState,
        // Приводим числовые поля к number
        year: Number(formState.year),
        price: Number(formState.price),
        // ... остальные числовые поля
      },
      headers: {
        Authorization: `Bearer ${getItem('token')}`
      }
    });
    navigateTo('/manager/cars');
  } catch (err) {
    console.error('Ошибка обновления:', err);
  }
}
</script>

<template>
  <client-only>
    <NuxtLayout>
  <div class="container mx-auto p-4">
    <div v-if="pending" class="text-center">Загрузка данных...</div>
    <template v-else-if="car">
    <h1 class="text-2xl mb-4">Редактировать автомобиль</h1>
    <form @submit.prevent="handleSubmit" class="grid gap-4 max-w-2xl">
      <Input v-model="formState.brand" placeholder="Марка" required />
      <Input v-model="formState.model" placeholder="Модель" required />
      <Input v-model="formState.year" type="number" placeholder="Год выпуска" required />
      <Input v-model="formState.price" type="number" placeholder="Цена" required />
      <Input v-model="formState.mileage" type="number" placeholder="Пробег" required />
      <Textarea v-model="formState.description" placeholder="Описание" rows="4" />
      <Input v-model="formState.engineType" placeholder="Тип двигателя" />
      <Input v-model="formState.enginePower" type="number" placeholder="Мощность двигателя (л.с.)" />
      <Input v-model="formState.driveType" placeholder="Тип привода" />
      <Input v-model="formState.engineVolume" type="number" step="0.1" placeholder="Объем двигателя (л)" />
      <Input v-model="formState.bodyType" placeholder="Тип кузова" />
      <Input v-model="formState.seatsNumber" type="number" placeholder="Количество мест" />
      <Input v-model="formState.width" type="number" placeholder="Ширина" />
      <Input v-model="formState.doorsNumber" type="number" placeholder="Количество дверей" />
      <Input v-model="formState.length" type="number" placeholder="Длина" />
      <Input v-model="formState.height" type="number" placeholder="Высота" />
      <Input v-model="formState.transmission" type="number" placeholder="Тип трансмиссии" />
      <Input v-model="formState.curbWeight" type="number" placeholder="Снаряженная масса" />
      <Input v-model="formState.gearsNumber" type="number" placeholder="Количество передач" />
      <Input v-model="formState.grossWeight" type="number" placeholder="Полная масса" />
      <Input v-model="formState.showroomLocation" type="number" placeholder="Местонахождение" />
      <div>
        <label class="block mb-2">Фотографии:</label>
        <Input
            type="file"
            multiple
            accept="image/*"
            @change="e => formState.photos = Array.from(e.target.files)"
        />
      </div>

      <Button type="submit">Редактировать автомобиль</Button>
    </form>
</template>
    <div v-else class="text-red-500">
      Автомобиль не найден
    </div>
  </div>
    </NuxtLayout>
  </client-only>
</template>