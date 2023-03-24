<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      // 实现登录逻辑
      console.log('Username:', this.username)
      console.log('Password:', this.password)
    }
  }
}
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

h1 {
  margin-bottom: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

label {
  font-weight: bold;
}

input[type="text"],
input[type="password"] {
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  width: 100%!
}
</style>