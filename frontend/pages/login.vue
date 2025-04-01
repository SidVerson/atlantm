<script setup>

const state = reactive({
  username: '',
  password: '',
});

async function handleLogin() {
  try {
    const { data } = await useFetch('http://localhost:3001/auth/login', {
      method: 'POST',
      body: JSON.stringify(state),
    });

    if (data.value?.access_token) {
      localStorage.setItem('token', data.value.access_token);
      const user = await $fetch('http://localhost:3001/auth/me', {
        headers: {
          Authorization: `Bearer ${data.value.access_token}`
        }
      });
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'admin') navigateTo('/admin/users');
      else navigateTo('/manager/cars');
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
}
</script>

<template>
  <div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
    <div class="flex w-full max-w-sm flex-col gap-6">
      <a href="#" class="flex items-center gap-2 self-center font-medium">
          <img src="/img/blackLogo.svg" />
      </a>


        <div class="flex flex-col gap-6">
          <Card>
            <CardHeader class="text-center">
              <CardTitle class="text-xl">
                Добро пожаловать
              </CardTitle>
              <CardDescription>
                Войдите с данными выданными вам администратором
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div class="grid gap-6">

                  <form @submit.prevent="handleLogin">


                  <div class="grid gap-6">
                      <div class="grid gap-2">
                        <div class="flex items-center">
                          <Label html-for="username">Логин</Label>
                        </div>
                        <Input id="username" v-model="state.username" placeholder="Имя пользователя" />
                      </div>
                    <div class="grid gap-2">
                      <div class="flex items-center">
                        <Label html-for="password">Пароль</Label>
                      </div>
                      <Input id="password" v-model="state.password" type="password" placeholder="Пароль" />
                    </div>
                    <Button type="submit" class="w-full">
                      Войти
                    </Button>
                  </div>
                  </form>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

    </div>
  </div>
</template>