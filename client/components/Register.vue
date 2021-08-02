<template>
  <div>
    <h2>Register</h2>
    <div>
      <label>
        <input type="text" v-model="Register.name" placeholder="enter name" required >
      </label>
    <div>
      <label>
        <input type="text" v-model="Register.email" placeholder="enter mail adress" required >
      </label>
    <div>
      <label>
        <input type="password" v-model="Register.password" id="password" name="password_input" placeholder="enter your password" required>
      </label>
    </div>
    </div>
    </div>
    <div>
      <button @click="registerAccount(Register.name, Register.email, Register.password)">Sign in</button>
    </div>
  </div>

</template>

<script>
module.exports = {
  props: {
  },
  data () {
    return {
        Register: {
            name:'',
            email:'',
            password:''
        }
    }
  },
  methods: {
    registerAccount (name, email, password) {
      this.$emit('register-account', {name, email, password})
    },
  }
}
</script>
<style scoped>
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

