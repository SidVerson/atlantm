<script setup>

definePageMeta({
  layout: 'user'
})
const { data: cars, refresh } = useFetch('http://localhost:3001/cars');
refresh()
</script>

<template>
  <NuxtLayout>
    <div class="bg-white w-full p-[20px] -mt-[20px]">
      <h1 class="text-3xl font-bold mb-8"><span class="text-primary">Эксперт в выборе и обслуживании автомобиля</span></h1>
    </div>
    <div class=" w-full max-w-[90%] mx-[40px] p-4">
    <div class="rounded-[12px] p-[50px] bg-cover bg-[url(/img/bg.webp)]">
      <p class="text-xl font-semibold mb-[8px]">О компании</p>
      <p class="text-md mb-[20px]">«Атлант-М» – крупное объединение компаний в СНГ (России и Беларуси), специализирующееся на продаже, гарантийном и сервисном обслуживании автомобилей, а также на поставках запасных частей.</p>
      <p class="text-xl font-semibold">В состав компании входят более 25 автомобильных предприятий, в том числе 20 автоцентров. </p>
    </div>
      <div class="mt-[20px]">
        <p class="font-semibold text-md mb-[12px]">В портфеле 17 брендов</p>
        <div class="grid grid-cols-7 gap-[20px]">
          <img src="https://cms.atlantm.by/uploads/tmp/wu/2u/Wu2upxxngb.svg" alt="">
          <img src="https://cms.atlantm.by/uploads/tmp/fo/em/FoeM1UthmL.svg" alt="">
          <img src="https://cms.atlantm.by/uploads/tmp/qv/31/Qv31mkVZUf.svg" alt="">
          <img src="https://cms.atlantm.by/uploads/tmp/ho/yd/HOyDFW3ZE0.svg" alt="">
          <img src="https://cms.atlantm.by/uploads/tmp/3d/bt/3dbt2cv9b7.svg" alt="">
          <img src="https://cms.atlantm.by/uploads/tmp/5k/d5/5Kd5CGv7kk.svg" alt="">
          <img src="https://cms.atlantm.by/uploads/tmp/j5/av/J5aVihJT0y.svg" alt="">
          <img src="https://cms.atlantm.by/uploads/tmp/h0/pq/H0PQYLFJ4u.svg" alt="">
          <img src="https://cms.atlantm.by/uploads/tmp/ay/fd/AyFdzY3b7v.svg" alt="">
          <img src="https://cms.atlantm.by/uploads/tmp/nd/dv/ndDvOH8k9T.svg" alt="">
          <img src="https://cms.atlantm.by/uploads/tmp/ov/yq/ovyqdDXm1X.svg" alt="">
          <img src="https://cms.atlantm.by/uploads/tmp/pe/zg/pezG02uLOH.svg" alt="">
          <img src="https://cms.atlantm.by/uploads/tmp/ea/ik/eaIkiniGxI.svg" alt="">
          <img src="https://cms.atlantm.by/uploads/tmp/1z/wi/1ZwIoE3trH.svg" alt="">
          <img src="https://cms.atlantm.by/uploads/tmp/sv/mw/svmW3Dvrst.svg" alt="">
          <img src="https://cms.atlantm.by/uploads/tmp/ve/bc/vEBCJUB1QZ.svg" alt="">
          <img src="https://cms.atlantm.by/uploads/tmp/qz/ny/qZNY1mhrRQ.svg" alt="">
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>
img{
width: 155px;
  height: 70px;
}
</style>