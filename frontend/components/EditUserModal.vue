<script setup>
const props = defineProps({
  user: Object,
});

const emit = defineEmits(['close', 'updated']);

const formState = reactive({
  username: props.user.username,
  password: '',
});
function getItem(item) {
  if (process.client) {
    return localStorage.getItem(item)
  } else {
    return undefined
  }
}

async function handleSubmit() {
  try {
    await $fetch(`http://localhost:3001/users/${props.user.id}`, {
      method: 'PUT',
      body: {
        username: formState.username,
        ...(formState.password && { password: formState.password }),
      },
      headers: {
        Authorization: `Bearer ${getItem('token')}`,
      },
    });
    emit('updated');
    emit('close');
  } catch (error) {
    console.error('Update failed:', error);
  }
}
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">Редактировать</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Редактирование менеджера</DialogTitle>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <Input v-model="formState.username" placeholder="Логин" />
        <Input v-model="formState.password" type="password" placeholder="Новый пароль" />
      </div>
      <DialogFooter>
        <Button @click="handleSubmit">Сохранить</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>