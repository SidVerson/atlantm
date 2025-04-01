<script setup>
import {toast} from "vue-sonner";

definePageMeta({
  layout: 'user'
})
const formState = reactive({
  brand: '',
  model: '',
  year: null,
  mileage: null,
  description: '',
  fullName: '',
  phone: '',
  email: '',
  photos: [],
});

async function submitRequest() {
  const formData = new FormData();

  // Добавляем поля
  Object.entries(formState).forEach(([key, value]) => {
    if (key !== 'photos') formData.append(key, value);
  });

  // Добавляем фото
  formState.photos.forEach(file => {
    formData.append('photos', file);
  });

  try {
    await $fetch('http://localhost:3001/buyback-requests', {
      method: 'POST',
      body: formData,
    });
    toast.success('Заявка успешно отправлена!');
    resetForm();
  } catch (error) {
    console.error('Ошибка отправки:', error);
  }
}

function resetForm() {
  formState.brand = '';
  formState.model = '';
  formState.year = null;
  formState.mileage = null;
  formState.description = '';
  formState.fullName = '';
  formState.phone = '';
  formState.email = '';
  formState.photos = [];
}
</script>

<template>
  <NuxtLayout>
  <div class="container mx-auto p-4 max-w-2xl">
    <h1 class="text-2xl font-bold mb-6">Заявка на выкуп автомобиля</h1>

    <form @submit.prevent="submitRequest" class="grid gap-4">
      <div class="grid grid-cols-2 gap-4">
        <Input v-model="formState.brand" placeholder="Марка" required />
        <Input v-model="formState.model" placeholder="Модель" required />
        <Input v-model="formState.year" type="number" placeholder="Год выпуска" required />
        <Input v-model="formState.mileage" type="number" placeholder="Пробег (км)" required />
      </div>

      <Textarea v-model="formState.description" placeholder="Описание состояния" rows="4" />

      <div class="grid grid-cols-2 gap-4">
        <Input v-model="formState.fullName" placeholder="ФИО" required />
        <Input v-model="formState.phone" type="tel" placeholder="Телефон" required />
        <Input v-model="formState.email" type="email" placeholder="Email" required />
      </div>

      <div>
        <label class="block mb-2">Фотографии автомобиля:</label>
        <Input
            type="file"
            multiple
            accept="image/*"
            @change="e => formState.photos = Array.from(e.target.files)"
        />
      </div>

      <Button type="submit" class="w-full">Отправить заявку</Button>
    </form>
  </div>
  </NuxtLayout>
</template>