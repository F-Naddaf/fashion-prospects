<template>
  <main class="category-container">
    <div class="category-title">
      <h3>Categories</h3>
      <span></span>
    </div>
    <div class="category-images">
      <router-link to="/">
        <img alt="banner-image" src="../assets/men-clothing.png" />
        <h3>Men's Clothing</h3>
      </router-link>
      <router-link to="/">
        <img alt="banner-image" src="../assets/women-clothing.png" />
        <h3>Women's Clothing</h3>
      </router-link>
      <router-link to="/">
        <img alt="banner-image" src="../assets/jewelery.png" />
        <h3>Jewelery</h3>
      </router-link>
      <router-link to="/">
        <img alt="banner-image" src="../assets/electronics.png" />
        <h3>Electronics</h3>
      </router-link>
    </div>
  </main>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Category',
};
</script>

<style scoped>
.category-container {
  display: flex;
  flex-direction: column;
  margin: 5% 0;
  width: 100%;
}
.category-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 45px;
}
.category-title h3 {
  font-size: 22px;
  color: #01689c;
}
.category-title span {
  width: 50px;
  height: 3px;
  border-radius: 5px;
  margin: -18px 0 15px 0;
  background-color: #ff0084;
}
.category-images {
  display: flex;
  justify-content: space-evenly;
}
.category-images a {
  text-decoration: none;
  width: 100%;
}
.category-images h3 {
  font-size: 14px;
  margin-top: 5px;
  color: rgb(80, 80, 80);
}
.category-images a:hover {
  transition-timing-function: ease-in-out;
  transition: 0.5s;
  transform: translateY(-15px);
}
img {
  width: 70%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
