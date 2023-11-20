<template>
  <h1>Settings</h1>
  <div class="mb-3 row">
    <h2>Change Password</h2>
    <label for="staticEmail" class="col-sm-2 col-form-label">OldPassword</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="old" v-model="old">
    </div>
  </div>
  <div class="mb-3 row">
    <label for="inputPassword" class="col-sm-2 col-form-label">NewPassword</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="new" v-model="newPas">
    </div>
    <div>
      <button type="button" @click="change" class="btn btn-outline-primary">Go</button>
    </div>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService';

export default {
  data() {
    return {
      user:'',
      old: '',
      newPas: '',
      error: null
    }
  },
  methods: {
    async change() {
      try {
        const response = await AuthenticationService.change({
          user: this.$store.state.user,
          oldPassword: this.old,
          newPassword: this.newPas
        }, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}` // Убедитесь, что это правильное место для получения токена
          }
        });
        console.log(response)

        // Ваш код для обработки успешного ответа
      } catch (error) {
        console.error(error); // Выведите ошибку в консоль для отладки
      }
    }

  }
}
</script>
<style scoped>


</style>