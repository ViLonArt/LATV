<template>
  <div>
    <h2>Login</h2>
    <div>
      <label>
        <input type="text" v-model="Login.email" placeholder="enter mail adress" required >
      </label>
    <div>
      <label>
        <input type="password" v-model="Login.password" id="password" name="password_input" placeholder="enter your password" required>
      </label>
    </div>
    </div>
    <div>
      <button @click="loginAccount(Login.email, Login.password)">Log in</button>
      <button onclick="location.href = 'http://localhost:3000/#/register'">No account? Sign in!</button>
    </div>
  </div>

</template>

<script>
module.exports = {
  props: {
  },
  data () {
    return {
        Login: {
            email:'',
            password:''
        }
    }
  },
  methods: {
    loginAccount( email, password){
      this.$emit('login-account', {email, password})
    }
  }
}
</script>

<style scoped>
.label{
    margin: auto;
    border: 5px solid lightblue;
}

article {
  display: flex;
}

.article-img {
  flex: 1;
}

.article-img div {
  width: 100px;
  height: 100px;
  background-size: cover;
}

.article-content {
  flex: 3;
}

.article-title {
  display: flex;
  justify-content: space-between;
}

textarea {
  width: 100%;
}
</style>
