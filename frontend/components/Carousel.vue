<script setup>
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from '@/components/ui/carousel'

defineProps({
  photos: Array
});
</script>

<template>
  <Carousel class="relative w-full max-w-xs">
    <CarouselContent>
      <CarouselItem v-for="(photo, index) in photos" :key="index">
        <div class="rounded-t-xl">
              <img
                  :src="`http://localhost:3001/uploads/${photo}`"
                  class="w-full h-full rounded-t-xl object-cover"
                  :alt="`Фото автомобиля ${index + 1}`"
              />
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>