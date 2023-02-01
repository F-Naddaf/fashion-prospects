<template>
  <form @submit.prevent="handelSubmit" class="login-input-form">
    <ul class="error-container">
      <li v-for="(error, index) in errors" :key="index" class="error-section">
        {{ error }}
      </li>
    </ul>
    <p v-if="store.state.userInfo" class="success-message">
      {{ this.success }}
    </p>
    <div class="form-container">
      <label>
        <p>Email *</p>
      </label>
      <input
        type="email"
        placeholder="email@example.com"
        v-model="user.email"
        required
      />
    </div>
    <div class="form-container">
      <label>
        <p>Password *</p>
      </label>
      <input
        type="password"
        placeholder="Password"
        v-model="user.password"
        required
      />
    </div>
    <button>Login</button>
    <router-link to="/">Forgot Password</router-link>
  </form>
</template>

<script>
import { onMounted, inject, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginForm',
  setup() {
    const router = useRouter();
    const user = ref({
      email: '',
      password: '',
    });
    const errors = ref([]);
    const success = ref('');
    const store = inject('store');
    onMounted(() => {
      store.methods.load();
    });
    async function handelSubmit() {
      this.errors.value = [];
      try {
        const response = await fetch(
          `https://fashion-server.onrender.com//api/users/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.user),
          },
        );
        const result = await response.json();
        if (result.success) {
          success.value = 'You have logged in successfully';
          localStorage.setItem('accessToken', result.accessToken);
          store.methods.login(result.user);
          setTimeout(() => {
            router.push('/');
          }, 2000);
        } else {
          errors.value.push(result.msg);
        }
      } catch (error) {
        errors.value.push('Sorry something went wrong');
      }
    }
    return {
      store,
      handelSubmit,
      user,
      errors,
      success,
    };
  },
};
</script>

<style scoped>
.login-input-form {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
}
.error-container {
  position: absolute;
  top: -140px;
  width: 100%;
  padding: 0;
}
.error-section {
  font-size: 14px;
  text-align: justify;
  color: red;
  padding-bottom: 15px;
  line-height: 1;
}
.success-message {
  position: absolute;
  top: -100px;
  width: 100%;
  padding: 0;
  font-size: 14px;
  color: green;
}
.form-container {
  position: relative;
  width: 100%;
}
.form-container label p {
  position: absolute;
  top: -20px;
  font-size: 12px;
  font-weight: 700;
  margin-left: 8px;
  background-color: rgba(255, 255, 255);
  padding: 0 6px;
  color: #b3005c;
}
.form-container input {
  width: 97%;
  padding: 5px;
  margin-bottom: 20px;
}
.form-container input::placeholder {
  color: rgba(80, 80, 80, 0.7);
  font-size: 12px;
}
.login-input-form button {
  width: 100%;
  padding: 6px;
  border: none;
  background-color: #ff0084;
  color: white;
  font-size: 14px;
  font-weight: 700;
}
.login-input-form button:hover {
  cursor: pointer;
  background-color: #b3005c;
}
.login-input-form a {
  margin: 8px auto auto auto;
  text-decoration: none;
  font-size: 12px;
  color: rgb(80, 80, 80);
}
.login-input-form a:hover {
  text-decoration: underline;
}
@media screen and (min-width: 1024px) {
  .login-input-form {
    width: 90%;
    margin-left: 5%;
  }
  .error-section {
    font-size: 12px;
  }
  .success-message {
    font-size: 12px;
  }
  .form-container label p {
    font-size: 10px;
    top: -16px;
  }
  .form-container input::placeholder {
    font-size: 10px;
  }
  .login-input-form button {
    font-size: 12px;
  }
  .login-input-form a {
    font-size: 10px;
  }
}
@media screen and (min-width: 1024px) {
  .error-section {
    font-size: 14px;
  }
  .success-message {
    font-size: 14px;
  }
  .form-container label p {
    font-size: 12px;
    top: -20px;
  }
  .form-container input::placeholder {
    font-size: 12px;
  }
  .login-input-form button {
    font-size: 14px;
  }
  .login-input-form a {
    font-size: 12px;
  }
}
</style>
