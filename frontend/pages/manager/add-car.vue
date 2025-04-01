<script setup>
definePageMeta({
  layout: 'manager'
})
const formState = reactive({
  brand: '',
  model: '',
  year: null,
  price: null,
  mileage: null,
  description: '',
  engineType: '',
  enginePower: '',
  driveType: '',
  engineVolume: '',
  bodyType: '',
  seatsNumber: '',
  width: '',
  doorsNumber: '',
  length: '',
  height: '',
  transmission: '',
  curbWeight: '',
  gearsNumber: '',
  grossWeight: '',
  showroomLocation: '',
});
function getItem(item) {
  if (process.client) {
    return localStorage.getItem(item)
  } else {
    return undefined
  }
}
async function handleSubmit() {
  const formData = new FormData();
  const photosInput = document.querySelector('input[type="file"]');
  const files = photosInput.files;

  // Добавляем основные поля
  Object.entries(formState).forEach(([key, value]) => {
    formData.append(key, value);
  });

  // Добавляем файлы
  for (let i = 0; i < files.length; i++) {
    formData.append('photos', files[i]);
  }

  try {
    await $fetch('http://localhost:3001/cars', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${getItem('token')}`
      }
    });
    navigateTo('/manager/dashboard');
  } catch (error) {
    console.error('Error creating car:', error);
  }
}
</script>

<template>
  <NuxtLayout>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl mb-4">Добавить автомобиль</h1>
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

      <Button type="submit">Добавить автомобиль</Button>
    </form>
  </div>
  </NuxtLayout>
</template>