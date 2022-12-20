<template>
  <nav>
    <div class="logo-container">
      <router-link to="/">
        <img alt="Vue logo" src="../assets/Logo.png" />
        <div class="logo-name">
          <h3 class="fashion">Fashion</h3>
          <h3><span class="logo-color">Pro</span>spects</h3>
        </div>
      </router-link>
    </div>
    <aside class="nav-right-container">
      <ul class="menu-container">
        <router-link to="/"
          ><li>Home</li>
          <span> |</span></router-link
        >
        <ul class="products-btn">
          <router-link to="/">
            <li>Products</li>
            <span> |</span>
          </router-link>
          <ul class="drop-down">
            <div v-if="isLoading"><LoadingSpinner /></div>
            <p class="error" v-if="error">
              Oops something went wrong!
              <span>Error 404</span>
            </p>
            <li v-for="category in categoryList" :key="category">
              <router-link :to="`/category/${category}`" class="drop-down-link">
                {{ category }}
              </router-link>
            </li>
          </ul>
        </ul>
        <router-link to="/about"
          ><li>About</li>
          <span> |</span></router-link
        >
        <router-link to="/"><li>Contact</li></router-link>
      </ul>
      <div class="user-container">
        <ul class="login-btn">
          <router-link to="/login">
            <i class="fa-solid fa-user"></i>
          </router-link>
          <ul class="login-drop-down">
            <div v-if="isLoading"><LoadingSpinner /></div>
            <p class="error" v-if="error">
              Oops something went wrong!
              <span>Error 404</span>
            </p>
            <li>
              <router-link :to="`/profile`" class="login-drop-down-link">
                Profile
              </router-link>
            </li>
            <li>
              <router-link :to="`/auth`" class="login-drop-down-link">
                Login
              </router-link>
            </li>
          </ul>
        </ul>
        <router-link to="/favorites">
          <i class="fa-solid fa-heart"></i>
        </router-link>
        <router-link to="/shoppingCart">
          <i class="fa-solid fa-bag-shopping"></i>
        </router-link>
      </div>
    </aside>
  </nav>
</template>

<script>
import LoadingSpinner from '@/components/Spinner.vue';
export default {
  name: 'NavBar',
  data() {
    return {
      categoryList: [],
      isLoading: false,
      error: false,
    };
  },
  async mounted() {
    this.isLoading = true;
    try {
      const result = await fetch(
        'https://fakestoreapi.com/products/categories',
      );
      const res = await result.json();
      this.categoryList = res;
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      this.error = true;
    }
  },
  components: {
    LoadingSpinner,
  },
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 7vh;
  background-color: black;
}
a {
  text-decoration: none;
  display: flex;
  align-items: center;
  margin-left: 20px;
}
.logo-container {
  display: flex;
  margin-left: 20px;
}
img {
  height: 60px;
  filter: #ff0084;
}
.logo-name {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: -12px;
}
.logo-color {
  color: #ff0084;
}
.fashion {
  margin-bottom: -5px;
}
h3 {
  color: #0091dc;
  margin: 0;
}
.menu-container {
  display: flex;
  align-items: center;
  position: relative;
}
.menu-container a {
  height: 7vh;
  display: flex;
  margin: 0;
  justify-content: center;
}
.menu-container li {
  list-style: none;
  justify-content: center;
  color: #0091dc;
}
.menu-container h3 {
  font-size: 16px;
}
.menu-container span {
  color: #ff0084;
  margin: 0 15px;
}
.menu-container ul {
  padding-left: 0;
}
.nav-right-container {
  display: flex;
  align-items: center;
}
.products-btn:hover .drop-down {
  display: block;
  flex-direction: column;
  justify-content: space-evenly;
  position: absolute;
  height: fit-content;
  top: 7vh;
  left: 42px;
  align-items: center;
  background-color: #0091dc;
  border-top: 4px solid #ff0084;
  z-index: 10;
}
.drop-down li {
  color: white;
}
.drop-down {
  display: none;
}
.drop-down::before {
  content: '';
  top: -15px;
  left: 95px;
  position: absolute;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 15px solid #ff0084;
}
.error {
  display: flex;
  flex-direction: column;
  color: white;
  font-weight: 600;
  font-size: 16px;
  padding: 10px;
  align-self: center;
}
.error span {
  color: white;
}
.drop-down a,
.login-drop-down a {
  display: flex;
  justify-content: center;
  align-content: center;
  color: white;
  height: 45px;
  padding: 0 40px;
  margin: 0;
}
.drop-down-link,
.login-drop-down-link {
  text-transform: capitalize;
}
.drop-down-link:hover,
.login-drop-down-link:hover {
  background-color: #ff0084;
}
.user-container {
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 20px;
}
.user-container li {
  list-style: none;
}
.login-btn:hover .login-drop-down {
  display: block;
  flex-direction: column;
  justify-content: space-evenly;
  position: absolute;
  height: fit-content;
  top: 86px;
  padding: 0;
  left: -15px;
  align-items: center;
  background-color: #0091dc;
  border-top: 4px solid #ff0084;
  z-index: 10;
}
.login-drop-down li {
  color: white;
}
.login-btn {
  padding: 0;
}
.login-drop-down {
  display: none;
}
.login-drop-down::before {
  content: '';
  top: -15px;
  left: 55px;
  position: absolute;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 15px solid #ff0084;
}
.fa-solid {
  margin: 0 20px;
  display: flex;
  height: 7vh;
  align-items: center;
}
.fa-user {
  color: #0091dc;
  font-size: 22px;
}
.fa-heart {
  color: #ff0084;
  font-size: 22px;
}
.fa-bag-shopping {
  color: #ff0084;
  font-size: 22px;
}
</style>
