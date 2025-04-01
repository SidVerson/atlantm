<script setup>
import Carousel from "~/components/Carousel.vue";

definePageMeta({
  layout: 'user'
})
const { data: cars, refresh } = useFetch('http://localhost:3001/cars');
refresh()
</script>

<template>
  <NuxtLayout>
    <div class="bg-white w-full p-[20px] -mt-[20px]">

    <h1 class="text-3xl font-bold mb-8">Автомобили с пробегом в наличии в <span class="text-primary">Минске</span></h1>
    </div>
  <div class="container mx-[40px] p-4">
  <p class="mb-[12px] font-semibold" v-if="cars && cars.length">{{cars.length}} предложений</p>
    <div v-if="cars && cars.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card v-for="car in cars" :key="car.id" class="hover:shadow-lg transition-shadow">
        <Carousel :photos="car.photos" />
        <CardHeader class="py-[12px]">
          <CardTitle><NuxtLink :to="`/cars/${car.id}`">{{ car.brand }} {{ car.model }}</NuxtLink></CardTitle>
          <CardDescription>{{ car.year }} год</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-2">
            <p>Пробег: {{ car.mileage.toLocaleString() }} км</p>
            <p class="text-xl font-bold">{{ car.price.toLocaleString() }} ₽</p>
            <p class="text-gray-600">{{ car.description }}</p>
          </div>
        </CardContent>
      </Card>
    </div>
    <div v-else>В каталоге еще нет автомобилей</div>
  </div>
  </NuxtLayout>
</template>