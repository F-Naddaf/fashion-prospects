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
            <li v-for="category in categoryList" :key="category">
              <router-link :to="`/${category}`" class="drop-down-link">
                {{ category }}
              </router-link>
            </li>
          </ul>
        </ul>
        <router-link to="/About"
          ><li>About</li>
          <span> |</span></router-link
        >
        <router-link to="/"><li>Contact</li></router-link>
      </ul>
      <div class="user-container">
        <router-link to="/">
          <i class="fa-solid fa-user"></i>
          <i class="fa-solid fa-heart"></i>
          <i class="fa-solid fa-bag-shopping"></i>
        </router-link>
      </div>
    </aside>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      categoryList: [],
    };
  },
  async mounted() {
    const result = await fetch(
      'https://fakestoreapi.com/products/categories',
    ).then((res) => res.json());
    this.categoryList = result;
  },
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 70px;
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
  height: 70px;
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
  top: 70px;
  left: 52px;
  align-items: center;
  background-color: #0091dc;
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
  left: 85px;
  position: absolute;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 15px solid #0091dc;
}
.drop-down a {
  display: flex;
  justify-content: center;
  align-content: center;
  color: white;
  height: 45px;
  padding: 0 30px;
}
.drop-down-link {
  text-transform: capitalize;
}
.drop-down-link:hover {
  background-color: #ff0084;
}
.user-container {
  display: flex;
  align-items: center;
  margin-right: 20px;
}
.fa-solid {
  margin: 0 20px;
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
