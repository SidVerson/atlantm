<script setup>
import DetailItem from "~/components/DetailItem.vue";
import Carousel from "~/components/Carousel.vue";

definePageMeta({
  layout: 'user'
})
const route = useRoute();
const { data: car } = await useFetch(`http://localhost:3001/cars/${route.params.id}`);
</script>

<template>
  <client-only>
    <NuxtLayout>
  <div class="container mx-[40px] p-4">

    <div class="flex flex-col gap-8">
      <div class="flex gap-8">

      <!-- Фото -->
      <Carousel class="max-w-full h-fit" :photos="car.photos" />

      <!-- Характеристики -->
      <div class="space-y-4">
        <h1 class="text-3xl font-bold">{{ car.brand }} {{ car.model }}</h1>
        <h1 class="text-3xl font-bold">{{ `${car.price.toLocaleString()} BYN`}}</h1>
        <div class="bg-white border rounded-md px-[20px] py-[10px]">
          <p class="text-xs text-gray-600">Продавец</p>
          <p>{{car.showroomLocation}}</p>
        </div>
        <TestDriveModal />
      </div>


      </div>
      <Card class="mt-4">
        <CardHeader>
          <CardTitle>Характеристики</CardTitle>
        </CardHeader>
        <CardContent class="grid grid-cols-2 gap-4">
          <DetailItem label="Год выпуска" :value="car.year" />
          <DetailItem label="Пробег" :value="`${car.mileage.toLocaleString()} км`" />
          <DetailItem label="Двигатель" :value="`${car.engineVolume} л / ${car.enginePower} л.с.`" />
          <DetailItem label="Коробка" :value="car.transmission" />
          <DetailItem label="Привод" :value="car.driveType" />
          <DetailItem label="Кузов" :value="car.bodyType" />
          <DetailItem label="Количество дверей" :value="car.doorsNumber" />
          <DetailItem label="Количество мест" :value="car.seatsNumber" />
          <DetailItem label="Габариты (ДxШxВ)" :value="`${car.length} x ${car.width} x ${car.height} мм`" />
          <DetailItem label="Снаряженная масса" :value="`${car.curbWeight} кг`" />
          <DetailItem label="Полная масса" :value="`${car.grossWeight} кг`" />
          <DetailItem label="Количество передач" :value="car.gearsNumber" />
        </CardContent>
      </Card>

      <div>
        <p class="text-xl font-semibold mb-[8px]">Подробнее об авто</p>
        <p>{{car.description}}</p>
      </div>
    </div>
  </div>
    </NuxtLayout>
  </client-only>
</template>