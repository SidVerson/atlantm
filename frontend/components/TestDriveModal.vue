<script setup>
import {toast} from "vue-sonner";

const isOpen = ref(false);
const route = useRoute();

const formState = reactive({
  fullName: '',
  phone: '',
  email: '',
  preferredDate: '',
});

async function submitRequest() {
  try {
    await $fetch('http://localhost:3001/test-drive-requests', {
      method: 'POST',
      body: {
        ...formState,
        carId: route.params.id,
        preferredDate: new Date(formState.preferredDate).toISOString()
      }
    });
    isOpen.value = false;
    toast.success   ('Заявка успешно отправлена!');
    Object.assign(formState, {
      fullName: '',
      phone: '',
      email: '',
      preferredDate: ''
    });
  } catch (error) {
    console.error('Ошибка отправки заявки:', error);
  }
}
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button>Записаться на тест-драйв</Button>
    </DialogTrigger>

    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Запись на тест-драйв</DialogTitle>
      </DialogHeader>

      <div class="grid gap-4 py-4">
        <Input v-model="formState.fullName" placeholder="ФИО" required />
        <Input v-model="formState.phone" type="tel" placeholder="Телефон" required />
        <Input v-model="formState.email" type="email" placeholder="Email" required />
        <Input v-model="formState.preferredDate" type="datetime-local"
               :min="new Date().toISOString().split('T')[0]" required />
      </div>

      <DialogFooter>
        <Button type="submit" @click="submitRequest">Отправить заявку</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>